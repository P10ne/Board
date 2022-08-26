import { IBoard } from './IBoard';

export interface IColumn {
    id: number;
    name: string;
    boardId: IBoard['id'];
}

export interface IColumnToCreate extends Omit<IColumn, 'id'> {}
