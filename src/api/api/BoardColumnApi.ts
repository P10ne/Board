import BaseApi from '../BaseApi';
import { TBoardColumnModel, TBoardModel } from '../../store';
import { API_PATH } from '../constants';

class BoardColumnApi extends BaseApi {
    constructor() {
        super({ basePath: `${API_PATH}/column` });
    }

    async getList(boardId: TBoardModel['id']): Promise<TBoardColumnModel[]> {
        try {
            const response = await this.fetcher.get<TBoardColumnModel[]>(`/list/${boardId}`);
            return response.data;
        } catch (e) {
            throw e;
        }
    }

    // todo updateCardsList request
    async updateCardsList(): Promise<void> {
        return Promise.resolve();
    }
}

export default new BoardColumnApi();
