import BaseApi from '../BaseApi';
import { TBoardCardModel, TBoardColumnModel } from '../../store';

type TColumn = TBoardColumnModel;

class BoardColumnApi extends BaseApi {
    async getCards(columnId: TColumn['id']): Promise<TBoardCardModel[]> {
        try {
            const response = await this.fetcher.get<TBoardCardModel[]>(`/cards?columnId=${columnId}`);
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
