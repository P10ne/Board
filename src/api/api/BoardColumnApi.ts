import BaseApi from '../BaseApi';
import { API_PATH } from '../constants';
import { IBoard, IColumn, IDraftColumn } from '../../CommonTypes';
import { IBoardStore } from '../../store/board/BoardStore';

class BoardColumnApi extends BaseApi {
    constructor() {
        super({ basePath: `${API_PATH}/column` });
    }

    async getList(boardId: IBoard['id']): Promise<IColumn[]> {
        try {
            const response = await this.fetcher.get<IColumn[]>(`/list/${boardId}`);
            return response.data;
        } catch (e) {
            throw e;
        }
    }

    // // todo updateCardsList request
    // async updateCardsList(): Promise<void> {
    //     return Promise.resolve();
    // }

    async create(data: IDraftColumn): Promise<IColumn> {
        try {
            const response = await this.fetcher.post<IColumn, IDraftColumn>('/', data);
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

    async update(data: IColumn): Promise<IColumn> {
        try {
            const response = await this.fetcher.post<IColumn, IColumn>('/', data);
            return response.data;
        } catch (e) {
            throw e;
        }
    }
}

export default BoardColumnApi;
