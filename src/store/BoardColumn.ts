import { Instance, SnapshotIn, types } from 'mobx-state-tree';
import BoardCards from './BoardCards';

const BoardColumnModel = types.model('BoardColumnModel', {
    id: types.identifierNumber,
    name: types.string,
});

const BoardColumn = types.model({
    attributes: BoardColumnModel,
    cards: BoardCards
}).actions(self => {
    const fetchCards = (id: TBoardColumnModel['id']) => {
        self.cards.fetch(id);
    }

    const afterCreate = () => {
        fetchCards(self.attributes.id);
    }
    return {
        afterCreate
    }
}).named('BoardColumn');

export type TBoardColumnModel = SnapshotIn<typeof BoardColumnModel>;
export type TBoardColumnStore = Instance<typeof BoardColumn>;
export default BoardColumn;
