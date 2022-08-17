import initApp from './app';
import {
    BoardModelToken,
    CardModelToken,
    ColumnModelToken,
    ConfigToken,
    MessagesToken,
    UserModelToken
} from './InjectionTokens';
import CONFIG from './CONFIG';
import { Board, Card, Column, User } from './sequelize/models';
import MESSAGES from './MESSAGES';

const init = async () => {
    const app = await initApp({
        providers: [
            { provide: MessagesToken, useValue: MESSAGES },
            { provide: ConfigToken, useValue: CONFIG },
            { provide: UserModelToken, useValue: User },
            { provide: BoardModelToken, useValue: Board },
            { provide: ColumnModelToken, useValue: Column },
            { provide: CardModelToken, useValue: Card },
        ]
    });
    app.listen(3001, () => { console.log('app') })
}

init();
