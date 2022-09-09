import { createContext } from 'react';
import { IBoard } from '../../../CommonTypes';
import { IModuleContextWithDIValue } from '../../../packages/react-module-di/types/TModuleContextWithDI';
import { DependencyContainer } from '../../../packages/react-module-di';

export type TMainBoardContextValue = IModuleContextWithDIValue & {
    boardId: IBoard['id'];
}

const BoardMainContext = createContext<TMainBoardContextValue>({
    boardId: 0,
    diContainer: {} as DependencyContainer
});

export default BoardMainContext;
