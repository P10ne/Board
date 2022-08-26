import { FC, ReactNode } from 'react';
import BoardMainContext, { TMainBoardContext } from '../../contexts/BoardMainContext';

type TProviderProps = {
    contextValue: TMainBoardContext;
    children: ReactNode;
}

const BoardProvider: FC<TProviderProps> = ({ contextValue, children }) => {
    return (
        <BoardMainContext.Provider value={contextValue}>
            { children }
        </BoardMainContext.Provider>
    )
}

export default BoardProvider;
