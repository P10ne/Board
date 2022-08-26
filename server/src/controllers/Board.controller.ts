import { Controller, Get, Params, Post, Response, Body, Put, Delete } from '@decorators/express';
import { TExpressResponse } from '../models';
import { sendErrorResponse, sendJsonResponse } from '../utils/utils';
import { Inject } from '@decorators/di';
import { AuthMiddleware } from '../middlewares';
import BoardService from '../services/Board.service';
import { MessagesToken } from '../InjectionTokens';
import { TMessages } from '../MESSAGES';
import { IBoard, IBoardToCreate } from '../../../CommonTypes';

@Controller('/board', [AuthMiddleware])
class BoardController {
    constructor(
        @Inject(BoardService) private boardService: BoardService,
        @Inject(MessagesToken) private messages: TMessages
    ) {}

    @Get('/:id')
    async getById(
        @Params('id') id: string,
        @Response() res: TExpressResponse<IBoard>
    ): Promise<void> {
        const numberTypeId = Number(id);
        if (Number.isNaN(numberTypeId)) {
            sendErrorResponse(res, 400, this.messages.COMMON.INSTANCE_NOT_FOUND);
            return;
        }
        try {
            const board = await this.boardService.getById(numberTypeId);
            if (board) {
                sendJsonResponse(res, 200, board.toJSON());
                return;
            }
            sendErrorResponse(res, 400, this.messages.COMMON.INSTANCE_NOT_FOUND);
        } catch (e) {
            sendErrorResponse(res, 500, this.messages.COMMON.UNEXPECTED_ERROR);
        }
    }

    @Post('/')
    async create(
        @Body() payload: IBoardToCreate,
        @Response() res: TExpressResponse<IBoard>
    ): Promise<void> {
        try {
            const newBoard = await this.boardService.create(payload);
            sendJsonResponse(res, 200, newBoard.toJSON());
        } catch {
            sendErrorResponse(res, 400, this.messages.COMMON.UNEXPECTED_ERROR);
        }
    }

    @Put('/')
    async update(
        @Body() payload: IBoard,
        @Response() res: TExpressResponse<IBoard>
    ): Promise<void> {
        try {
            const updatedBoard = await this.boardService.update(payload);
            sendJsonResponse(res, 200, updatedBoard.toJSON());
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
            await this.boardService.delete(numberTypeId);
            sendJsonResponse(res, 200);
        } catch {
            sendErrorResponse(res, 400, this.messages.COMMON.UNEXPECTED_ERROR);
        }
    }
}

export default BoardController;
