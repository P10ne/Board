import { Instance, SnapshotIn, types } from 'mobx-state-tree';

const BoardCardModel = types.model('BoardCardModel', {
    id: types.identifierNumber,
    name: types.string,
    body: types.string
});

const BoardCard = types.model('BoardCard', {
    attributes: BoardCardModel
});

export type TBoardCardModel = SnapshotIn<typeof BoardCardModel>;
export type TBoardCardStore = Instance<typeof BoardCard>;

export default BoardCard;
