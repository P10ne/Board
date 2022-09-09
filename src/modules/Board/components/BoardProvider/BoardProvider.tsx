import { FC, ReactNode, useMemo, useState } from 'react';
import BoardMainContext, { TMainBoardContextValue } from '../../contexts/BoardMainContext';
import { IModuleProviderBaseProps } from '../../../../packages/react-module-di';
import { IBoard } from '../../../../CommonTypes';
import { TDependenciesConfig } from '../../../../packages/react-module-di/utils/registerDependencies';
import createModuleDIContainer from '../../../../packages/react-module-di/utils/createModuleDIContainer';
import BOARD_DI_TOKENS from '../../BOARD_DI_TOKENS';
import BoardStore from '../../store/BoardStore';
import BoardColumnsListStore from '../../store/BoardColumnsListStore';
import BoardColumnStore from '../../store/BoardColumnStore';
import BoardCardsListStore from '../../store/BoardCardsListStore';
import BoardCardStore from '../../store/BoardCardStore';
import BoardApi from '../../../../api/api/BoardApi';
import BoardColumnApi from '../../../../api/api/BoardColumnApi';
import BoardCardApi from '../../../../api/api/BoardCardApi';

export type TBoardProviderProps = IModuleProviderBaseProps & {
    boardId: IBoard['id'];
}

const BoardProvider: FC<TBoardProviderProps> = ({ di, boardId ,children }) => {
    const [defaultDependencies] = useState<TDependenciesConfig>(() => ([
        { token: BOARD_DI_TOKENS.Store, regFn: (c, t) => c.registerSingleton(t, BoardStore) },
        { token: BOARD_DI_TOKENS.ColumnsListStore, regFn: (c, t) => c.registerSingleton(t, BoardColumnsListStore) },
        { token: BOARD_DI_TOKENS.ColumnStore, regFn: (c, t) => c.register(t, BoardColumnStore) },
        { token: BOARD_DI_TOKENS.CardsListStore, regFn: (c, t) => c.register(t, BoardCardsListStore) },
        { token: BOARD_DI_TOKENS.CardStore, regFn: (c, t) => c.register(t, BoardCardStore) },
        { token: BOARD_DI_TOKENS.BoardApi, regFn: (c, t) => c.registerSingleton(t, BoardApi) },
        { token: BOARD_DI_TOKENS.ColumnApi, regFn: (c, t) => c.registerSingleton(t, BoardColumnApi) },
        { token: BOARD_DI_TOKENS.CardApi, regFn: (c, t) => c.registerSingleton(t, BoardCardApi) },
    ]));

    const diContainer = useMemo(() => createModuleDIContainer({
        moduleDIConfig: di,
        defaultConfig: defaultDependencies
    }), [di, defaultDependencies]);

    const contextValue: TMainBoardContextValue = useMemo(() => ({ diContainer: diContainer, boardId }), [diContainer]);

    return (
        <BoardMainContext.Provider value={contextValue}>
            { children }
        </BoardMainContext.Provider>
    )
}

export default BoardProvider;
