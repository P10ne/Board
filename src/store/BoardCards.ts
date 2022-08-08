import { cast, flow, onSnapshot, SnapshotOut, types } from 'mobx-state-tree';
import BoardCard, { TBoardCardModel } from './BoardCard';
import FetchableNode from './FetchableNode';
import { boardColumnApi } from '../api/api';
import { TBoardColumnModel } from './BoardColumn';

const BoardCards = types.compose(
    types.model({
        data: types.array(BoardCard)
    }),
    FetchableNode
).actions(self => {
    const fetch = flow(function* (columnId: TBoardColumnModel['id']) {
       self.isLoading = true;
       try {
           const response: TBoardCardModel[] = yield boardColumnApi.getCards(columnId);
           self.data = cast(response.map(item => BoardCard.create({ attributes: item })));
       } catch (e) {
           self.error = 'Some error';
           console.error(e);
       } finally {
           self.isLoading = false;
       }

    });

    return {
        fetch
    }
});

export default BoardCards;
