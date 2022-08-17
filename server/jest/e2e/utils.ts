import initApp from '../../src/app';
import {
    BoardModelToken, CardModelToken,
    ColumnModelToken,
    ConfigToken,
    MessagesToken,
    UserModelToken
} from '../../src/InjectionTokens';
import CONFIG, { TConfig } from '../../src/CONFIG';
import { Provider } from '@decorators/di/lib/src/types';
import { Board, User, Column, Card } from '../../src/sequelize/models';
import MESSAGES from '../../src/MESSAGES';
const jwt = require('jsonwebtoken');

const TEST_CONFIG: TConfig = {
    ...CONFIG,
    sequelize: {
        createOptions: {
            dialect: 'sqlite',
            storage: ':memory:'
        },
        syncOptions: { force: true }
    }
}

const TEST_PROVIDERS: Provider[] = [
    { provide: ConfigToken, useValue: TEST_CONFIG },
    { provide: MessagesToken, useValue: MESSAGES },
    { provide: UserModelToken, useValue: User },
    { provide: BoardModelToken, useValue: Board },
    { provide: ColumnModelToken, useValue: Column },
    { provide: CardModelToken, useValue: Card },
]

export const getInitializedApp = async () => {
    return await initApp({
        providers: TEST_PROVIDERS
    });
}

type TAdditionalTokenPayload<T> = {
    iat: number;
    exp: number;
    payload: T;
}

export const verifyToken: <T>(token: string, secret: string) => Promise<TAdditionalTokenPayload<T> | null> = async <T>(token: string, secret: string) => {
    return new Promise(resolve => {
        jwt.verify(token, secret, { complete: true }, (error, decoded) => {
            if (error) resolve(null);
            resolve(decoded.payload);
        });
    })
}

export const generateAccessToken = <T>(config: TConfig, payload?: T) => {
    const options = {
        expiresIn: config.tokens.refresh.expiresIn
    };
    return jwt.sign(payload ?? {}, config.tokenSecret, options);
}
