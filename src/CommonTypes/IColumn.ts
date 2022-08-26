import { IBoard } from './IBoard';

export interface IColumn {
    id: number;
    name: string;
    boardId: IBoard['id'];
}

export function isColumn(column: IColumn | IDraftColumn): column is IColumn {
    return 'id' in column;
}

export function isDraftColumn(column: IColumn | IDraftColumn): column is IDraftColumn {
    return 'id' ! in column;
}

export interface IDraftColumn extends Omit<IColumn, 'id'> {}
