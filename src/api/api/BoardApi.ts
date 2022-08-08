import BaseApi from '../BaseApi';
import { TBoardModel, TBoardColumnModel } from '../../store';

type TBoard = TBoardModel;

class BoardApi extends BaseApi {
    async get(id: TBoard['id']): Promise<TBoard> {
        try {
            const response = await this.fetcher.get<TBoard>(`/boards/${id}`);
            return response.data;
        } catch (e) {
            throw e;
        }
    }

    async getColumns(boardId: TBoard['id']): Promise<TBoardColumnModel[]> {
        try {
            const response = await this.fetcher.get<TBoardColumnModel[]>(`/columns?boardId=${boardId}`);
            return response.data;
        } catch (e) {
            throw e;
        }
    }
}

export default new BoardApi();
