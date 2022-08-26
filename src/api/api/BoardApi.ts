import BaseApi from '../BaseApi';
import { API_PATH } from '../constants';
import { IBoard } from '../../CommonTypes';

class BoardApi extends BaseApi {
    constructor() {
        super({ basePath: `${API_PATH}/board` });
    }

    async get(id: IBoard['id']): Promise<IBoard> {
        try {
            const response = await this.fetcher.get<IBoard>(`/${id}`);
            return response.data;
        } catch (e) {
            throw e;
        }
    }
}

export default BoardApi;
