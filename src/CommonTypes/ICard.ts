import { IColumn } from './IColumn';

export interface ICard {
    id: number;
    name: string;
    body: string;
    columnId: IColumn['id'];
}

export function isCard(card: ICard | IDraftCard): card is ICard {
    return 'id' in card;
}

export function isDraftCard(card: ICard | IDraftCard): card is IDraftCard {
    return 'id' ! in card;
}

export interface IDraftCard extends Omit<ICard, 'id'> {}
