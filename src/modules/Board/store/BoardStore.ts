import { IBoard } from '../../../CommonTypes';
import { flow, makeObservable, observable } from 'mobx';
import BoardApi from '../../../api/api/BoardApi';
import type { IBoardColumnsListStore } from './BoardColumnsListStore';
import CrudStatus from '../../../store/CrudStatus';
import { inject, injectable } from '../../../packages/react-module-di';
import BOARD_DI_TOKENS from '../BOARD_DI_TOKENS';
import type { IBoardApi } from '../api/BoardApi';
import type { TPartialBoard } from '../../../CommonTypes/IBoard';

export interface IBoardStore {
    attributes: TPartialBoard;
    crudStatus: CrudStatus;
    columnsList: IBoardColumnsListStore;
    fetch: (id: IBoard['id']) => void;
}

@injectable()
class BoardStore implements IBoardStore {
    @observable attributes: TPartialBoard;
    crudStatus = new CrudStatus();
    @observable columnsList: IBoardColumnsListStore;

    constructor(
        @inject(BOARD_DI_TOKENS.BoardApi) private boardApi: IBoardApi,
        @inject(BOARD_DI_TOKENS.ColumnsListStore) columnsList: IBoardColumnsListStore
    ) {
        makeObservable(this);
        this.attributes = {};
        this.columnsList = columnsList;
        this.columnsList.boardStore = this;
    }

    @flow
    * fetch(id: IBoard['id']) {
        try {
            this.crudStatus.fetching.isFetching = true;
            const response: Awaited<ReturnType<InstanceType<typeof BoardApi>['get']>> = yield this.boardApi.get(id);
            this.attributes = response;
            this.columnsList.fetch();
        } catch (e) {
            this.crudStatus.fetching.error = 'some Error';
            console.error(e);
        } finally {
            this.crudStatus.fetching.isFetching = false;
        }
    }
}

export default BoardStore;
