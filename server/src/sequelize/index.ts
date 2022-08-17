import { Sequelize } from 'sequelize-typescript';
import { Container } from '@decorators/di';
import { TConfig } from '../CONFIG';
import { BoardModelToken, CardModelToken, ColumnModelToken, ConfigToken, UserModelToken } from '../InjectionTokens';
import { User, Board, Column, Card } from './models';

const initSequelize = async () => {
    const CONFIG = Container.get<TConfig>(ConfigToken);
    const UserModel = Container.get<typeof User>(UserModelToken);
    const BoardModel = Container.get<typeof Board>(BoardModelToken);
    const ColumnModel = Container.get<typeof Column>(ColumnModelToken);
    const CardModel = Container.get<typeof Card>(CardModelToken);
    const pgSequelize = new Sequelize({
        models: [UserModel, BoardModel, ColumnModel, CardModel],
        ...CONFIG.sequelize?.createOptions
    });
    await pgSequelize.sync({
        ...CONFIG.sequelize.syncOptions
    });
    await pgSequelize.sync(CONFIG.sequelize.syncOptions);
}

export default initSequelize;
