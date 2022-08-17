import { Express } from 'express';
import * as request from 'supertest';
import { Container } from '@decorators/di';
import { TConfig } from '../../../src/CONFIG';
import { TMessages } from '../../../src/MESSAGES';
import { Card, ICard, ICardToCreate } from '../../../src/sequelize/models';
import { generateAccessToken, getInitializedApp } from '../utils';
import { CardModelToken, ConfigToken, MessagesToken } from '../../../src/InjectionTokens';


describe('/Card', () => {
    let app: Express;
    let config: TConfig;
    let messages: TMessages;
    let cardModel: typeof Card;
    let insertedCards: Card[];
    let columnIdForGetList: number;

    beforeAll(async () => {
        app = await getInitializedApp();

        config = Container.get<TConfig>(ConfigToken);
        messages = Container.get<TMessages>(MessagesToken);
        cardModel = Container.get<typeof Card>(CardModelToken);

        columnIdForGetList = 1;
        const PREPARED_CARDS: ICardToCreate[] = [
            { name: 'card1', body: '', columnId: columnIdForGetList },
            { name: 'card2', body: '', columnId: columnIdForGetList },
            { name: 'card3', body: '', columnId: columnIdForGetList + 1 },
        ]

        insertedCards = await cardModel.bulkCreate(PREPARED_CARDS); // Prepare data in DB
    })

    afterAll(async () => {
        await cardModel.destroy({ where: { id: insertedCards.map(card => card.id) } });
    })

    describe('GET /list/:columnId', () => {
        it('should return cards by columnId', async () => {
            const cardsToExpect = insertedCards.filter(card => card.columnId === columnIdForGetList).map(card => card.toJSON());
            const { status, body } = await request(app)
                .get(`/api/card/list/${columnIdForGetList}`)
                .auth(generateAccessToken(config), { type: 'bearer' })
            expect(status).toBe(200);
            expect(body).toEqual<ICard[]>(cardsToExpect);
        })
    })

    describe('POST /', () => {
        it('should add instance to DB and return it in response', async () => {
            const newCardPayload: ICardToCreate = {
                name: 'new column',
                body: '',
                columnId: 1
            }
            const payloadForExpect: ICard = {
                id: expect.any(Number),
                ...newCardPayload
            }
            const { status, body } = await request(app)
                .post('/api/card')
                .auth(generateAccessToken(config), { type: 'bearer' })
                .send(newCardPayload)
            expect(status).toBe(200);
            expect(body).toEqual<ICard>(payloadForExpect);
            const createdBoardFromDB = await cardModel.findByPk(body.id);
            expect(createdBoardFromDB.toJSON()).toEqual<ICard>(payloadForExpect);
        })
    })

    describe('PUT /', () => {
        it('should update instance and return it in response', async () => {
            const cardToUpdate = insertedCards[0];
            const cardWithUpdatedData: ICard = {
                ...cardToUpdate.toJSON(),
                name: 'updatedCardName'
            }
            const { status, body } = await request(app)
                .put(`/api/card`)
                .auth(generateAccessToken(config), { type: 'bearer' })
                .send(cardWithUpdatedData)

            expect(status).toBe(200);
            expect(body).toEqual<ICard>(cardWithUpdatedData);
        })
    })

    describe('DELETE /:id', () => {
        it('should delete instance from db', async () => {
            const cardToDelete = insertedCards[1];
            const { status } = await request(app)
                .delete(`/api/card/${cardToDelete.id}`)
                .auth(generateAccessToken(config), { type: 'bearer' })

            expect(status).toBe(200);
        })
    })
})
