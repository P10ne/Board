import { flow, Instance, SnapshotIn, types } from 'mobx-state-tree';
import BoardCards from './BoardCards';
import ColumnModel from '../../server/src/sequelize/models/Column';
import { boardColumnApi } from '../api';
import { ICard } from '../../CommonTypes';
import BoardCard from './BoardCard';

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

    const addCard = (data: ICard) => {
        self.cards.data.push(BoardCard.create({ attributes: data }))
    }

    const afterCreate = () => {
        fetchCards(self.attributes.id);
    }
    return {
        afterCreate,
        addCard
    }
}).named('BoardColumn');

export type TBoardColumnModel = SnapshotIn<typeof BoardColumnModel>;
export type TBoardColumnStore = Instance<typeof BoardColumn>;
export default BoardColumn;
