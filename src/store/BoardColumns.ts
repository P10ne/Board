import { cast, flow, Instance, types } from 'mobx-state-tree';
import BoardColumn, { TBoardColumnModel } from './BoardColumn';
import BoardCards from './BoardCards';
import FetchableNode from './FetchableNode';
import BoardColumnApi from '../api/api/BoardColumnApi';
import { boardColumnApi } from '../api';

const BoardColumns = types.compose('BoardColumns',
    types.model({
        data: types.array(BoardColumn)
    }),
    FetchableNode
).actions(self => {
    const fetch = flow(function* (boardId) {
        self.isLoading = true;
        try {
            const response: TBoardColumnModel[] = yield boardColumnApi.getList(boardId);
            self.data = cast(response.map(item => BoardColumn.create({ attributes: item, cards: BoardCards.create() })));
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
})

export type TBoardColumnsStore = Instance<typeof BoardColumns>;

export default BoardColumns;
