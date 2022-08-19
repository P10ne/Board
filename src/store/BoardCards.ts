import { cast, flow, types } from 'mobx-state-tree';
import BoardCard, { TBoardCardModel } from './BoardCard';
import FetchableNode from './FetchableNode';
import { TBoardColumnModel } from './BoardColumn';
import BoardCardApi from '../api/api/BoardCardApi';
import { boardCardApi } from '../api';

const BoardCards = types.compose(
    types.model({
        data: types.array(BoardCard)
    }),
    FetchableNode
).actions(self => {
    const fetch = flow(function* (columnId: TBoardColumnModel['id']) {
       self.isLoading = true;
       try {
           const response: TBoardCardModel[] = yield boardCardApi.getList(columnId);
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
