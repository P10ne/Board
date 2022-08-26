import { FC, ReactNode } from 'react';
import BoardCardMainContext from '../../contexts/BoardCardMainContext';

type TBoardCardProviderProps = {
    contextValue: any;
    children: ReactNode;
}

const BoardCardProvider: FC<TBoardCardProviderProps> = ({ contextValue, children }) => {
    return (
        <BoardCardMainContext.Provider value={contextValue}>
            { children }
        </BoardCardMainContext.Provider>
    )
}

export default BoardCardProvider;
