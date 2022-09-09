import { ICard, IColumn, TPartialCard } from '../../../CommonTypes';

interface IBoardCardApi {
    getList(columnId: IColumn['id']): Promise<ICard[]>;
    create(data: TPartialCard): Promise<ICard>;
    update(data: ICard): Promise<ICard>;
    delete(id: ICard['id']): Promise<void>
}

export type {
    IBoardCardApi
}
