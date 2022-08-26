import BaseApi from '../BaseApi';
import { TBoardColumnModel, TBoardModel } from '../../store';
import { API_PATH } from '../constants';
import { IBoard, IColumn, IColumnToCreate } from '../../../CommonTypes';

class BoardColumnApi extends BaseApi {
    constructor() {
        super({ basePath: `${API_PATH}/column` });
    }

    async getList(boardId: TBoardModel['id']): Promise<IColumn[]> {
        try {
            const response = await this.fetcher.get<IColumn[]>(`/list/${boardId}`);
            return response.data;
        } catch (e) {
            throw e;
        }
    }

    // todo updateCardsList request
    async updateCardsList(): Promise<void> {
        return Promise.resolve();
    }

    async create(data: IColumnToCreate): Promise<IColumn> {
        try {
            const response = await this.fetcher.post<IColumn, IColumnToCreate>('/', data);
            return response.data;
        } catch (e) {
            throw e;
        }
    }

    async delete(id: IColumn['id']): Promise<void> {
        try {
            await this.fetcher.delete(`/${id}`);
        } catch (e) {
            throw e;
        }
    }
}

export default new BoardColumnApi();
