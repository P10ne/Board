import { Inject, Injectable } from '@decorators/di';
import Board, { IBoard } from '../sequelize/models/Board';
import { BoardModelToken } from '../InjectionTokens';

@Injectable()
class BoardService {
    constructor(
       @Inject(BoardModelToken) private boardModel: typeof Board
    ) {}

    async getById(id: IBoard['id']): Promise<Board> {
        return await this.boardModel.findByPk(id)
    }

    async create(board: Partial<IBoard>): Promise<Board> {
        return await this.boardModel.create(board);
    }

    async update(board: IBoard): Promise<Board> {
        const boardToUpdate = await this.boardModel.findByPk(board.id);
        return await boardToUpdate.update(board);
    }

    async delete(id: IBoard['id']): Promise<void> {
        const boardToDelete = await this.boardModel.findByPk(id);
        return await boardToDelete.destroy();
    }
}

export default BoardService;
