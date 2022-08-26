import { Body, Controller, Delete, Get, Params, Post, Put, Response } from '@decorators/express';
import { AuthMiddleware } from '../middlewares';
import { Inject } from '@decorators/di';
import { CardService } from '../services';
import { MessagesToken } from '../InjectionTokens';
import { TMessages } from '../MESSAGES';
import { TExpressResponse } from '../models';
import { sendErrorResponse, sendJsonResponse } from '../utils/utils';
import { ICard, IColumn } from '../../../src/CommonTypes';

@Controller('/card', [AuthMiddleware])
class CardController {
    constructor(
        @Inject(CardService) private cardService: CardService,
        @Inject(MessagesToken) private messages: TMessages
    ) {}

    @Get('/list/:columnId')
    async getListByColumnId(
        @Response() res: TExpressResponse<ICard[]>,
        @Params('columnId') columnId: string
    ): Promise<void> {
        const numberTypeColumnId: IColumn['id'] = Number(columnId);
        if (Number.isNaN(numberTypeColumnId)) sendErrorResponse(res, 400, this.messages.COMMON.INSTANCE_NOT_FOUND);
        try {
            const cards = await this.cardService.getListByColumnId(numberTypeColumnId);
            sendJsonResponse(res, 200, cards.map(card => card.toJSON()));
        } catch (e) {
            sendErrorResponse(res, 500, this.messages.COMMON.UNEXPECTED_ERROR);
        }
    }

    @Post('/')
    async create(
        @Response() res: TExpressResponse<ICard>,
        @Body() payload: Partial<ICard>
    ): Promise<void> {
        try {
            const newCard = await this.cardService.create(payload);
            sendJsonResponse(res, 200, newCard.toJSON());
        } catch {
            sendErrorResponse(res, 400, this.messages.COMMON.UNEXPECTED_ERROR);
        }
    }

    @Put('/')
    async update(
        @Body() payload: Partial<ICard>,
        @Response() res: TExpressResponse<ICard>
    ): Promise<void> {
        try {
            const updatedCard = await this.cardService.update(payload);
            sendJsonResponse(res, 200, updatedCard);
        } catch {
            sendErrorResponse(res, 400, this.messages.COMMON.UNEXPECTED_ERROR);
        }
    }

    @Delete('/:id')
    async delete(
        @Params('id') id: string,
        @Response() res: TExpressResponse
    ): Promise<void> {
        try {
            const numberTypeId = Number(id);
            if (Number.isNaN(numberTypeId)) {
                sendErrorResponse(res, 400, this.messages.COMMON.INSTANCE_NOT_FOUND);
                return;
            }
            await this.cardService.delete(numberTypeId);
            sendJsonResponse(res, 200);
        } catch {
            sendErrorResponse(res, 400, this.messages.COMMON.UNEXPECTED_ERROR);
        }
    }
}

export default CardController;
