import { ICard, IColumn } from '../../../CommonTypes';
import { IBoardCardStore } from '../../Board/store/BoardCardStore';

export type TDragCardItem = {
    id: ICard['id'];
    card: IBoardCardStore;
    index: number;
    sourceColumnId: IColumn['id'];
}
