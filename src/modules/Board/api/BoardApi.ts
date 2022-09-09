import { IBoard } from '../../../CommonTypes';

interface IBoardApi {
    get(id: IBoard['id']): Promise<IBoard>;
}

export type {
    IBoardApi
}
