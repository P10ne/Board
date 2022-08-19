import BaseApi from '../BaseApi';
import { TBoardModel } from '../../store';
import { API_PATH } from '../constants';

class BoardApi extends BaseApi {
    constructor() {
        super({ basePath: `${API_PATH}/board` });
    }

    async get(id: TBoardModel['id']): Promise<TBoardModel> {
        try {
            const response = await this.fetcher.get<TBoardModel>(`/${id}`);
            return response.data;
        } catch (e) {
            throw e;
        }
    }
}

export default new BoardApi();
