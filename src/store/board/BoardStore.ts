import { IBoard, IDraftBoard } from '../../CommonTypes';
import { flow, makeObservable, observable } from 'mobx';
import BoardApi from '../../api/api/BoardApi';
import BoardColumnsListStore from './BoardColumnsListStore';
import type { IBoardColumnsListStore } from './BoardColumnsListStore';
import CrudStatus from '../CrudStatus';

export interface IBoardStore {
    attributes: IBoard | IDraftBoard;
    crudStatus: CrudStatus;
    columnsList: IBoardColumnsListStore;
    fetch: (id: IBoard['id']) => void;
}

const boardApi = new BoardApi();

class BoardStore implements IBoardStore {
    @observable attributes: IBoard | IDraftBoard;
    crudStatus = new CrudStatus();
    @observable columnsList: IBoardColumnsListStore = new BoardColumnsListStore(this);

    constructor() {
        makeObservable(this);
        this.attributes = this.getDefaultBoardData();
    }

    private getDefaultBoardData(): IDraftBoard {
        return {
            name: ''
        }
    }

    @flow
    * fetch(id: IBoard['id']) {
        try {
            this.crudStatus.fetching.isFetching = true;
            const response: Awaited<ReturnType<typeof boardApi.get>> = yield boardApi.get(id);
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

