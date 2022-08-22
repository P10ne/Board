import { IGoogleMe } from '../models';

const { compareSync } = require('bcrypt');
import { Inject, Injectable } from '@decorators/di';
import { User } from '../sequelize/models';
import UsersService from './Users.service';

@Injectable()
class AuthService {
    constructor(
        @Inject(UsersService) private usersService: UsersService
    ) {}

    async authenticate(email: User['email'], password: User['password']): Promise<User | null> {
        const user = await this.usersService.getUserByEmail(email);
        return user && compareSync(password, user.password)
            ? user
            : null;
    }

    async regOrLoginByGoogle(data: IGoogleMe): Promise<User> {
        const { names, emailAddresses } = data;
        let user = await this.usersService.getUserByEmail(emailAddresses[0].value);
        if (!user) {
            user = await this.usersService.add({ email: emailAddresses[0].value, fromSocial: true });
        }
        return user;
    }
}

export default AuthService;
