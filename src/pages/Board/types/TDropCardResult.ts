import { TBoardColumnModel } from '../../../store';

export type TDropCardResult = {
    targetColumnId: TBoardColumnModel['id'];
    position: number;
}
