import { Body, Controller, Get, Post, Query, Response } from '@decorators/express';
import { Inject } from '@decorators/di';
import { google } from 'googleapis';
import { sendJsonResponse, sendErrorResponse } from '../utils/utils';
import { AuthService, TokenService, UsersService } from '../services';
import { IPublicUser, IUser } from '../models/IUser';
import { IGoogleMe, TExpressRequest, TExpressResponse } from '../models';
import { MessagesToken } from '../InjectionTokens';
import { TMessages } from '../MESSAGES';
import { User } from '../sequelize/models';

type TLoginRequestBody = {
    email: string;
    password: string;
    fingerPrint: string;
}
type TLoginResponseBody = {
    accessToken: string;
    refreshToken: string;
    user: IPublicUser;
}

type TRefreshRequestBody = {
    refreshToken: string;
    fingerPrint: string;
}
type TRefreshResponseBody = {
    accessToken: string;
    refreshToken: string;
}

type TGoogleLoginBody = {
    fingerPrint: string;
    code: string;
}

type TRegRequestBody = Partial<IUser>;
type TRegResponseBody = IPublicUser;

@Controller('/auth')
class AuthController {
    constructor(
        @Inject(AuthService) private authService: AuthService,
        @Inject(UsersService) private usersService: UsersService,
        @Inject(TokenService) private tokenService: TokenService,
        @Inject(MessagesToken) private messages: TMessages
    ) {}

    @Post('/google-login')
    async googleLogin(
        @Response() res: TExpressResponse<any>,
            @Body() data: TGoogleLoginBody
    ): Promise<void> {
        const authClient = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URI
        );
        const response = await authClient.getToken(data.code);
        authClient.setCredentials(response.tokens);
        try {
            const meResponse = await authClient.request<IGoogleMe>({ url: 'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos' });
            const user = await this.authService.regOrLoginByGoogle(meResponse.data);

            this.sendLoginResponse(res, { user,  fingerPrint: data.fingerPrint})
        } catch (e) {
            console.log(e);
            sendErrorResponse(res, 400, this.messages.COMMON.UNEXPECTED_ERROR);
        }
    }

    @Post('/login')
    async login(req: TExpressRequest<TLoginRequestBody>, res: TExpressResponse<TLoginResponseBody>) {
        const { email, password, fingerPrint } = req.body;
        const user = await this.authService.authenticate(email, password);
        if (!user || user.fromSocial) {
            sendErrorResponse(res, 403, this.messages.AUTH.INPUT_IS_INCORRECT);
            return;
        }
        this.sendLoginResponse(res, { user, fingerPrint });
    }

    private sendLoginResponse(res, { user, fingerPrint }: { user: User, fingerPrint: string}): void {
        const publicUser = user.getPublicUser();
        const accessToken = this.tokenService.generateAccessToken({ user: publicUser });
        const refreshToken = this.tokenService.generateRefreshToken({
            user: publicUser,
            fingerPrint
        });
        sendJsonResponse(res, 200, {
            accessToken,
            refreshToken,
            user: publicUser
        });
    }

    @Post('/logout')
    async logout(req: TExpressRequest, res: TExpressResponse) {
        sendJsonResponse(res, 200);
    }

    @Post('/refresh')
    async refreshToken(req: TExpressRequest<TRefreshRequestBody>, res: TExpressResponse<TRefreshResponseBody>) {
        const {refreshToken, fingerPrint} = req.body;
        try {
            const { user } = await this.tokenService.verifyRefreshToken(refreshToken, fingerPrint);
            const newAccessToken = this.tokenService.generateAccessToken({ user });
            const newRefreshToken = this.tokenService.generateRefreshToken({ user, fingerPrint });
            sendJsonResponse(res, 200,
            {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken
            });
        } catch (e) {
            console.log('error message: ', e.message);
            sendErrorResponse(res, 401, e.message);
        }
    }

    @Post('/reg')
    async reg(req: TExpressRequest<TRegRequestBody>, res: TExpressResponse<TRegResponseBody>) {
        const { email, password } = req.body;
        if (!email || !password) {
            sendErrorResponse(res, 400, this.messages.AUTH.INPUT_IS_INCORRECT);
            return;
        }
        try {
            const user = await this.usersService.add(req.body);
            sendJsonResponse(res, 200, user.getPublicUser());
        } catch {
            sendErrorResponse(res, 400, this.messages.COMMON.UNEXPECTED_ERROR);
        }
    }
}

export default AuthController;
