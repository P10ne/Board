import { Body, Controller, Delete, Get, Params, Post, Put, Response } from '@decorators/express';
import { AuthMiddleware } from '../middlewares';
import { Inject } from '@decorators/di';
import { ColumnService } from '../services';
import { TExpressResponse } from '../models';
import { sendErrorResponse, sendJsonResponse } from '../utils/utils';
import { MessagesToken } from '../InjectionTokens';
import { TMessages } from '../MESSAGES';
import { IColumn, IColumnToCreate } from '../../../CommonTypes';

@Controller('/column', [AuthMiddleware])
class ColumnController {
    constructor(
       @Inject(ColumnService) private columnService: ColumnService,
       @Inject(MessagesToken) private messages: TMessages
    ) {}

    @Get('/list/:boardId')
    async getListByBoardId(
        @Response() res: TExpressResponse<IColumn[]>,
        @Params('boardId') boardId: string
    ) {
        const numberTypeBoardId = Number(boardId);
        if (Number.isNaN(numberTypeBoardId)) sendErrorResponse(res, 400, this.messages.COMMON.INSTANCE_NOT_FOUND);
        try {
            const columns = await this.columnService.getListByBoardId(numberTypeBoardId);
            sendJsonResponse(res, 200, columns.map(col => col.toJSON()));
        } catch (e) {
            sendErrorResponse(res, 500, this.messages.COMMON.UNEXPECTED_ERROR);
        }
    }

    @Post('/')
    async create(
        @Response() res: TExpressResponse<IColumn>,
        @Body() payload: IColumnToCreate
    ): Promise<void> {
        try {
            const newColumn = await this.columnService.create(payload);
            sendJsonResponse(res, 200, newColumn.toJSON());
        } catch {
            sendErrorResponse(res, 400, this.messages.COMMON.UNEXPECTED_ERROR);
        }
    }

    @Put('/')
    async update(
        @Body() payload: Partial<IColumn>,
        @Response() res: TExpressResponse<IColumn>
    ): Promise<void> {
        try {
            const updatedColumn = await this.columnService.update(payload);
            sendJsonResponse(res, 200, updatedColumn);
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
            if (typeof numberTypeId !== 'number') {
                sendErrorResponse(res, 400, this.messages.COMMON.INSTANCE_NOT_FOUND);
                return;
            }
            await this.columnService.delete(numberTypeId);
            sendJsonResponse(res, 200);
        } catch {
            sendErrorResponse(res, 400, this.messages.COMMON.UNEXPECTED_ERROR);
        }
    }
}

export default ColumnController;
