import FetchingStatus from '../FetchingStatus';
import BoardColumnStore, { IBoardColumnStore } from './BoardColumnStore';
import { action, computed, flow, makeObservable, observable } from 'mobx';
import { IBoardStore } from './BoardStore';
import BoardColumnApi from '../../api/api/BoardColumnApi';
import { isBoard, isColumn } from '../../CommonTypes';

export interface IBoardColumnsListStore {
    status: FetchingStatus;
    data: IBoardColumnStore[];
    fetch: () => void;
    addDraftColumn: () => IBoardColumnStore | undefined;
    deleteColumnFromList: (column: IBoardColumnStore) => void;
}

const boardColumnApi = new BoardColumnApi()

class BoardColumnsListStore implements IBoardColumnsListStore {
    @observable status = new FetchingStatus();
    @observable data: IBoardColumnStore[] = [];
    boardStore: IBoardStore;

    constructor(boardStore: IBoardStore) {
        makeObservable(this);
        this.boardStore = boardStore;
    }

    @flow
    * fetch() {
        const board = this.boardStore.attributes;
        if (isBoard(board)) {
            this.status.isFetching = true;
            try {
                const response: Awaited<ReturnType<typeof boardColumnApi.getList>> = yield boardColumnApi.getList(board.id);
                this.data = response.map(item => new BoardColumnStore(item, this));
            } catch (e) {
                this.status.error = 'Some error';
            } finally {
                this.status.isFetching = false;
            }
        }
    }

    @action
    addDraftColumn() {
        const board = this.boardStore.attributes;
        if (isBoard(board)) {
            const draftColumn: BoardColumnStore = new BoardColumnStore(board.id, this);
            this.data.push(draftColumn);
            return draftColumn;
        }
    }

    @action
    deleteColumnFromList(column: IBoardColumnStore) {
        this.data = this.data.filter(col => col !== column);
    }
}

export default BoardColumnsListStore;
