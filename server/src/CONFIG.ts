import { SyncOptions } from 'sequelize';
import { SequelizeOptions } from 'sequelize-typescript/dist/sequelize/sequelize/sequelize-options';

export type TConfig = {
    tokenSecret: string;
    tokens: {
        access: {
            expiresIn: number;
        },
        refresh: {
            expiresIn: number;
        }
    },
    sequelize: {
        createOptions: SequelizeOptions;
        syncOptions: SyncOptions;
    }
};

const CONFIG: TConfig = {
    tokenSecret: 'SECRET_KEY',
    tokens: {
        access: {
            expiresIn: 15 * 60
        },
        refresh: {
            expiresIn: 30 * 24 * 60 * 60
        }
    },
    sequelize: {
        createOptions: { storage: 'src/db/db.db', dialect: 'sqlite' },
        syncOptions: { alter: true }
    }
};

export default CONFIG;
