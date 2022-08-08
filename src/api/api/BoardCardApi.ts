import BaseApi from '../BaseApi';
import { TBoardCardModel, TBoardColumnModel } from '../../store';

class BoardCardApi extends BaseApi {
    async move(card: TBoardCardModel, targetColumnId: TBoardColumnModel['id']): Promise<void> {
        try {
            const updatedCardData: TBoardCardModel & { columnId: TBoardColumnModel['id'] } = {
                ...card,
                columnId: targetColumnId
            }
            await this.fetcher.put<void, TBoardCardModel>(`/cards/${card.id}`, updatedCardData);
        } catch (e) {
            throw e;
        }
    }
}

export default new BoardCardApi();
