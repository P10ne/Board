import { IBoard, IColumn, TPartialColumn } from '../../../CommonTypes';

interface IBoardColumnApi {
    getList(boardId: IBoard['id']): Promise<IColumn[]>;
    create(data: TPartialColumn): Promise<IColumn>;
    delete(id: IColumn['id']): Promise<void>;
    update(data: IColumn): Promise<IColumn>
}

export type {
    IBoardColumnApi
}
