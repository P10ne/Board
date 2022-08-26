import { IColumn } from './IColumn';

export interface ICard {
    id: number;
    name: string;
    body: string;
    columnId: IColumn['id'];
}

export interface ICardToCreate extends Omit<ICard, 'id'> {}
