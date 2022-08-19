import { detach, flow, getParent, getSnapshot, Instance, SnapshotIn, types } from 'mobx-state-tree';
import BoardColumns, { TBoardColumnsStore } from './BoardColumns';
import { boardApi, boardCardApi, boardColumnApi } from '../api';
import FetchableNode from './FetchableNode';
import { TBoardCardModel, TBoardCardStore } from './BoardCard';
import { TBoardColumnModel, TBoardColumnStore } from './BoardColumn';
import BoardApi from '../api/api/BoardApi';
import BoardCardApi from '../api/api/BoardCardApi';

const BoardModel = types.model('BoardModel', {
    id: types.number,
    name: types.string
});

const BoardBase = types.model({
    attributes: BoardModel,
    columns: BoardColumns
});

const Board = types.compose(
    types.model({
        data: types.maybeNull(BoardBase)
    }),
    FetchableNode
).actions(self => {
        const fetch = flow(function* (id: TBoardModel['id']) {
            try {
                self.isLoading = true;
                const response: TBoardModel = yield boardApi.get(id);
                self.data = BoardBase.create({ attributes: response, columns: BoardColumns.create() });
                fetchColumns(id);
            } catch (e) {
                self.error = 'some Error';
                console.error(e);
            } finally {
                self.isLoading = false;
            }
        });

        const fetchColumns = (boardId: TBoardModel['id']) => {
            self.data?.columns.fetch(boardId);
        }

        const moveCard = async (
            card: TBoardCardStore,
            targetColumnId: TBoardColumnModel['id'],
            position: number
        ) => {
            const sourceColumn = getParent<TBoardColumnStore>(card, 3);
            const targetColumn = self.data!.columns.data.find(col => col.attributes.id === targetColumnId);
            if (!sourceColumn || !targetColumn) throw new Error('source or target column was not found');
            const removeIndex = sourceColumn.cards.data.findIndex(c => c.attributes.id === card.attributes.id);
            const cardToMove = detach(sourceColumn.cards.data[removeIndex]);
            targetColumn.cards.data.splice(position, 0, cardToMove);
        }

        const saveMoving = flow(function* (card: TBoardCardStore, targetColumnId: TBoardColumnModel['id']) {
            try {
                // yield boardCardApi.move(getSnapshot(card.attributes), targetColumnId);
                // yield boardColumnApi.updateCardsList();
            } catch (e) {
                alert('Some error on move card');
                console.error(e);
            }
        });

        return {
            fetch,
            moveCard,
            saveMoving
        }
    }).named('Board')

export type TBoardModel = SnapshotIn<typeof BoardModel>;
export type TBoardStore = Instance<typeof Board>;

export default Board;
