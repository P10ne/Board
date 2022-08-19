import BaseApi from '../BaseApi';
import { TBoardCardModel, TBoardColumnModel } from '../../store';
import { API_PATH } from '../constants';

class BoardCardApi extends BaseApi {
    constructor() {
        super({ basePath: `${API_PATH}/card` });
    }

    async getList(columnId: TBoardColumnModel['id']): Promise<TBoardCardModel[]> {
        try {
            const response = await this.fetcher.get<TBoardCardModel[]>(`/list/${columnId}`);
            return response.data;
        } catch (e) {
            throw e;
        }
    }

    async move(card: TBoardCardModel, targetColumnId: TBoardColumnModel['id']): Promise<void> {
        try {
            const updatedCardData: TBoardCardModel & { columnId: TBoardColumnModel['id'] } = {
                ...card,
                columnId: targetColumnId
            }
            await this.fetcher.put<void, TBoardCardModel>(`/card/${card.id}`, updatedCardData);
        } catch (e) {
            throw e;
        }
    }
}

export default new BoardCardApi();
