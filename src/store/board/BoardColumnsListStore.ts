import FetchingStatus from '../FetchingStatus';
import { action, computed, flow, makeObservable, observable } from 'mobx';
import { IBoardStore } from './BoardStore';
import BoardColumnApi from '../../api/api/BoardColumnApi';
import { isBoard } from '../../CommonTypes';
import type { TPartialDraftColumn } from '../../CommonTypes';
import BoardColumnStore from './BoardColumnStore';
import type { IBoardColumnStore } from './BoardColumnStore';

interface IBoardColumnsListStore {
    status: FetchingStatus;
    data: IBoardColumnStore[];
    boardStore: IBoardStore;
    fetch: () => void;
    addDraftColumn: (data: TPartialDraftColumn | null, addToList?: boolean) => IBoardColumnStore | undefined;
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
                console.error(e);
            } finally {
                this.status.isFetching = false;
            }
        }
    }

    @action
    addDraftColumn(data: TPartialDraftColumn | null, addToList: boolean = true) {
        const board = this.boardStore.attributes;
        if (isBoard(board)) {
            const draftColumn: BoardColumnStore = new BoardColumnStore(data, this);
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
