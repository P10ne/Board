import BaseApi from '../BaseApi';
import { API_PATH } from '../constants';
import { ICard, IColumn, IDraftCard } from '../../CommonTypes';

class BoardCardApi extends BaseApi {
    constructor() {
        super({ basePath: `${API_PATH}/card` });
    }

    async getList(columnId: IColumn['id']): Promise<ICard[]> {
        try {
            const response = await this.fetcher.get<ICard[]>(`/list/${columnId}`);
            return response.data;
        } catch (e) {
            throw e;
        }
    }

    // async move(card: TBoardCardModel, targetColumnId: TBoardColumnModel['id']): Promise<void> {
    //     try {
    //         const updatedCardData: TBoardCardModel & { columnId: TBoardColumnModel['id'] } = {
    //             ...card,
    //             columnId: targetColumnId
    //         }
    //         await this.fetcher.put<void, TBoardCardModel>(`/card/${card.id}`, updatedCardData);
    //     } catch (e) {
    //         throw e;
    //     }
    // }

    async create(data: IDraftCard): Promise<ICard> {
        try {
            const response = await this.fetcher.post<ICard, IDraftCard>('/', data);
            return response.data;
        } catch (e) {
            throw e;
        }
    }

    async update(data: ICard): Promise<ICard> {
        try {
            const response = await this.fetcher.put<ICard, ICard>('/', data);
            return response.data;
        } catch (e) {
            throw e;
        }
    }

    async delete(id: ICard['id']): Promise<void> {
        try {
            await this.fetcher.delete(`/${id}`);
        } catch (e) {
            throw e;
        }
    }
}

export default BoardCardApi;
