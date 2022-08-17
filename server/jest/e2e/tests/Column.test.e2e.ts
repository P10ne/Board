import { Express } from 'express';
import { Container } from '@decorators/di';
import * as request from 'supertest';
import { TConfig } from '../../../src/CONFIG';
import { TMessages } from '../../../src/MESSAGES';
import { Column, IBoard, IColumn, IColumnToCreate } from '../../../src/sequelize/models';
import { generateAccessToken, getInitializedApp } from '../utils';
import { ColumnModelToken, ConfigToken, MessagesToken } from '../../../src/InjectionTokens';

describe('/Board', () => {
    let app: Express;
    let config: TConfig;
    let messages: TMessages;
    let columnModel: typeof Column;
    let insertedColumns: Column[];
    let boardIdForGetList: number;

    beforeAll(async () => {
        app = await getInitializedApp();

        config = Container.get<TConfig>(ConfigToken);
        messages = Container.get<TMessages>(MessagesToken);
        columnModel = Container.get<typeof Column>(ColumnModelToken);

        boardIdForGetList = 1;
        const PREPARED_COLUMNS: IColumnToCreate[] = [
            { name: 'column1', boardId: boardIdForGetList },
            { name: 'column2', boardId: boardIdForGetList },
            { name: 'column3', boardId: boardIdForGetList + 1 }
        ];

        insertedColumns = await columnModel.bulkCreate(PREPARED_COLUMNS); // Prepare data in DB
    })

    afterAll(async () => {
        await columnModel.destroy({ where: { id: insertedColumns.map(col => col.id) } });
    })

    describe('GET /list/:boardId', () => {
        it('should return columns by boardId', async () => {
            const columnsToExpect = insertedColumns.filter(col => col.boardId === boardIdForGetList).map(col => col.toJSON());
            const { status, body } = await request(app)
                .get(`/api/column/list/${boardIdForGetList}`)
                .auth(generateAccessToken(config), { type: 'bearer' })
            expect(status).toBe(200);
            expect(body).toEqual<IColumn[]>(columnsToExpect);
        })
    })

    describe('POST /', () => {
        it('should add instance to DB and return it in response', async () => {
            const newColumnPayload: IColumnToCreate = {
                name: 'new column',
                boardId: 1
            }
            const payloadForExpect: IColumn = {
                id: expect.any(Number),
                ...newColumnPayload
            }
            const { status, body } = await request(app)
                .post('/api/column')
                .auth(generateAccessToken(config), { type: 'bearer' })
                .send(newColumnPayload)
            expect(status).toBe(200);
            expect(body).toEqual<IBoard>(payloadForExpect);
            const createdBoardFromDB = await columnModel.findByPk(body.id);
            expect(createdBoardFromDB.toJSON()).toEqual<IColumn>(payloadForExpect);
        })
    })

    describe('PUT /:id', () => {
        it('should update instance and return it in response', async () => {
            const columnToUpdate = insertedColumns[0];
            const columnWithUpdatedData: IColumn = {
                ...columnToUpdate.toJSON(),
                name: 'updatedColumnName'
            }
            const { status, body } = await request(app)
                .put(`/api/column`)
                .auth(generateAccessToken(config), { type: 'bearer' })
                .send(columnWithUpdatedData)

            expect(status).toBe(200);
            expect(body).toEqual<IColumn>(columnWithUpdatedData);
        })
    })

    describe('DELETE /:id', () => {
        it('should delete instance from db', async () => {
            const columnToDelete = insertedColumns[1];
            const { status } = await request(app)
                .delete(`/api/column/${columnToDelete.id}`)
                .auth(generateAccessToken(config), { type: 'bearer' })

            expect(status).toBe(200);
        })
    })
})
