import { TBoardCardModel, TBoardCardStore, TBoardColumnModel } from '../../../store';

export type TDragCardItem = {
    id: TBoardCardModel['id'];
    card: TBoardCardStore;
    index: number;
    sourceColumnId: TBoardColumnModel['id'];
}
