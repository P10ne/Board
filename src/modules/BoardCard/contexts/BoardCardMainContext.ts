import { createContext } from 'react';
import { ICard, IColumn } from '../../../CommonTypes';

export type TBoardCardMainContext = {
    card: ICard | null;
    columnId: IColumn['id'] | null;
    submitHandler: (card: ICard) => void;
}

export const BoardCardMainContextDefaultValue: Pick<TBoardCardMainContext, 'card'> = {
    card: null
}

const BoardCardMainContext = createContext<TBoardCardMainContext>({
    ...BoardCardMainContextDefaultValue,
    submitHandler: () => { throw new Error('Method is not implemented') },
    columnId: null
});

export default BoardCardMainContext;
