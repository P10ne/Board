import { Provider } from '@decorators/di/lib/src/types';

const express = require('express');
const bodyParser = require('body-parser');
import { attachControllers } from '@decorators/express';
import { Container } from '@decorators/di';
import initSequelize from './sequelize';
import { AuthController, BoardController, CardController, ColumnController } from './controllers';

import * as dotenv from 'dotenv';
dotenv.config();

export type TInitAppConfig = {
    providers: Provider[]
}

const initApp = async ({ providers }: TInitAppConfig) => {
    const app = express();
    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );

    Container.provide(providers);

    await initSequelize();

    const apiRouter = express.Router();
    attachControllers(apiRouter, [
        AuthController,
        BoardController,
        ColumnController,
        CardController
    ]);
    app.use('/api', apiRouter);
    return app;
}
export default initApp;
