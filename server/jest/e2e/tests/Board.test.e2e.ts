import { Express } from 'express';
import * as request from 'supertest';
import { TConfig } from '../../../src/CONFIG';
import { TMessages } from '../../../src/MESSAGES';
import { generateAccessToken, getInitializedApp } from '../utils';
import { Container } from '@decorators/di';
import { BoardModelToken, ConfigToken, MessagesToken } from '../../../src/InjectionTokens';
import { Board, IBoard, IBoardToCreate } from '../../../src/sequelize/models';

describe('/Board', () => {
    let app: Express;
    let config: TConfig;
    let messages: TMessages;
    let boardModel: typeof Board;
    let insertedBoards: Board[];

    beforeAll(async () => {
        app = await getInitializedApp();

        config = Container.get<TConfig>(ConfigToken);
        messages = Container.get<TMessages>(MessagesToken);
        boardModel = Container.get<typeof Board>(BoardModelToken);

        const PREPARED_BOARDS: IBoardToCreate[] = [
            { name: 'board1' },
            { name: 'board2' }
        ];
        insertedBoards = await boardModel.bulkCreate(PREPARED_BOARDS); // Prepare data in DB
    })

    afterAll(async () => {
        await boardModel.destroy({ where: { id: insertedBoards.map(board => board.id) } })
    })

    describe('GET /:id', () => {
        it('should return instance in response', async () => {
            const boardToReturn = insertedBoards[0];
            const { status, body } = await request(app)
                .get(`/api/board/${boardToReturn.id}`)
                .auth(generateAccessToken(config), { type: 'bearer' })
            expect(status).toBe(200);
            expect(body).toEqual<IBoard>(boardToReturn.toJSON());
        })
    })

    describe('POST /', () => {
        it('should add instance to DB and return it in response', async () => {
            const newBoardPayload: IBoardToCreate = {
                name: 'new board'
            }
            const payloadForExpect: IBoard = {
                id: expect.any(Number),
                ...newBoardPayload
            }
            const { status, body } = await request(app)
                .post('/api/board')
                .auth(generateAccessToken(config), { type: 'bearer' })
                .send(newBoardPayload)
            expect(status).toBe(200);
            expect(body).toEqual<IBoard>(payloadForExpect);
            const createdBoardFromDB = await boardModel.findByPk(body.id);
            expect(createdBoardFromDB.toJSON()).toEqual<IBoard>(payloadForExpect);
        })
    })

    describe('PUT /:id', () => {
        it('should update instance and return it in response', async () => {
            const boardToUpdate = insertedBoards[0];
            const boardWithUpdatedData: IBoard = {
                ...boardToUpdate.toJSON(),
                name: 'updatedBoardName'
            }
            const { status, body } = await request(app)
                .put(`/api/board`)
                .auth(generateAccessToken(config), { type: 'bearer' })
                .send(boardWithUpdatedData)

            expect(status).toBe(200);
            expect(body).toEqual(boardWithUpdatedData);
        })
    })

    describe('DELETE /:id', () => {
        it('should delete instance from db', async () => {
            const boardToDelete = insertedBoards[1];
            const { status } = await request(app)
                .delete(`/api/board/${boardToDelete.id}`)
                .auth(generateAccessToken(config), { type: 'bearer' })

            expect(status).toBe(200);
        })
    })
})
