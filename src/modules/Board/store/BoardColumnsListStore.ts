import FetchingStatus from '../../../store/FetchingStatus';
import { action, flow, makeObservable, observable } from 'mobx';
import type { IBoardStore } from './BoardStore';
import BoardColumnApi from '../../../api/api/BoardColumnApi';
import { isBoard } from '../../../CommonTypes';
import type { TPartialColumn } from '../../../CommonTypes';
import type { IBoardColumnStore } from './BoardColumnStore';
import { inject, injectable } from '../../../packages/react-module-di';
import type { DependencyContainer } from '../../../packages/react-module-di';
import BOARD_DI_TOKENS from '../BOARD_DI_TOKENS';
import type { IBoardColumnApi } from '../api/BoardColumnApi';
import GLOBAL_DI_TOKENS from '../../../packages/react-module-di/GLOBAL_DI_TOKENS';

interface IBoardColumnsListStore {
    status: FetchingStatus;
    data: IBoardColumnStore[];
    boardStore: IBoardStore | null;
    fetch: () => void;
    addDraftColumn: (data: TPartialColumn, addToList?: boolean) => IBoardColumnStore | undefined;
    deleteColumnFromList: (column: IBoardColumnStore) => void;
}

@injectable()
class BoardColumnsListStore implements IBoardColumnsListStore {
    @observable status = new FetchingStatus();
    @observable data: IBoardColumnStore[] = [];
    boardStore: IBoardStore | null;

    constructor(
        @inject(GLOBAL_DI_TOKENS.DIContainer) private diContainer: DependencyContainer,
        @inject(BOARD_DI_TOKENS.ColumnApi) private boardColumnApi: IBoardColumnApi,
    ) {
        makeObservable(this);
    }

    @flow
    * fetch() {
        if (!this.boardStore) throw new Error('BoardStore is null');
        const board = this.boardStore.attributes;
        if (isBoard(board)) {
            this.status.isFetching = true;
            try {
                const response: Awaited<ReturnType<InstanceType<typeof BoardColumnApi>['getList']>> = yield this.boardColumnApi.getList(board.id);
                this.data = response.map(item => {
                    const columnStore = this.diContainer.resolve<IBoardColumnStore>(BOARD_DI_TOKENS.ColumnStore);
                    columnStore.attributes = item;
                    columnStore.cards.fetch();
                    return columnStore;
                });
            } catch (e) {
                this.status.error = 'Some error';
                console.error(e);
            } finally {
                this.status.isFetching = false;
            }
        }
    }

    @action
    addDraftColumn(data: TPartialColumn, addToList: boolean = true) {
        if (!this.boardStore) throw new Error('BoardStore is null');
        const board = this.boardStore.attributes;
        if (isBoard(board)) {
            const draftColumn = this.diContainer.resolve<IBoardColumnStore>(BOARD_DI_TOKENS.ColumnStore);
            draftColumn.updateDraftAttributes(data);
            if (addToList) {
                this.data.push(draftColumn);
            }
            return draftColumn;
        }
    }

    @action
    deleteColumnFromList(column: IBoardColumnStore) {
        this.data = this.data.filter(col => col !== column);
    }
}

export type  {
    IBoardColumnsListStore
}

export default BoardColumnsListStore;
