import { IColumn } from './IColumn';

export interface ICard {
    id: number;
    name: string;
    body: string;
    columnId: IColumn['id'];
}

export function isCard(card: TPartialCard): card is ICard {
    return 'id' in card;
}

export type TPartialCard = Partial<ICard>;
