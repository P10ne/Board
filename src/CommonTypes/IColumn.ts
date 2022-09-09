import { IBoard } from './IBoard';

export interface IColumn {
    id: number;
    name: string;
    boardId: IBoard['id'];
}

export function isColumn(column: TPartialColumn): column is IColumn {
    return !!column && 'id' in column;
}

export type TPartialColumn = Partial<IColumn>;
