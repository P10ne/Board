import { Middleware } from '@decorators/express';
import { sendErrorResponse } from '../utils/utils';
import { NextFunction, Request, Response } from 'express';

class AuthMiddleware implements Middleware {
    use(request: Request, response: Response, next: NextFunction) {
        const token = request.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            sendErrorResponse(response, 401, 'Token is not valid');
            return;
        }
        next();
    }
}

export default AuthMiddleware;
