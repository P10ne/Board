import { isBoard, isColumn, isDraftColumn } from '../../CommonTypes';
import CrudStatus from '../CrudStatus';
import { action, flow, makeObservable, observable } from 'mobx';
import BoardColumnApi from '../../api/api/BoardColumnApi';
import type { IBoardColumnsListStore } from './BoardColumnsListStore';
import type { TPartialDraftColumn, IColumn, IDraftColumn } from '../../CommonTypes';
import BoardCardsListStore from './BoardCardsListStore';
import type { IBoardCardsListStore } from './BoardCardsListStore'
import type { IBoardCardStore } from './BoardCardStore';

export interface IBoardColumnStore {
    attributes: IColumn | IDraftColumn;
    crudStatus: CrudStatus;
    cards: IBoardCardsListStore;
    createFromDraft: () => void;
    updateDraftAttributes: (data: IDraftColumn) => void;
    update: (column: IBoardColumnStore['attributes']) => void;
    delete: () => void;

    deleteCardFromStore(card: IBoardCardStore): void;
}

const boardColumnApi = new BoardColumnApi();

class BoardColumnStore implements IBoardColumnStore {
    @observable attributes: IColumn | IDraftColumn;
    crudStatus = new CrudStatus();
    @observable cards: IBoardCardsListStore;
    private boardColumnsListStore: IBoardColumnsListStore;

    constructor(data: IColumn | TPartialDraftColumn | null, boardColumnsListStore: IBoardColumnsListStore) {
        makeObservable(this);
        this.boardColumnsListStore = boardColumnsListStore;
        this.attributes = this.getDraftColumnAttributes(data);
        this.cards = new BoardCardsListStore(this);
    }

    private getDraftColumnAttributes(data: IColumn | TPartialDraftColumn | null): IColumn | IDraftColumn {
        const board = this.boardColumnsListStore.boardStore.attributes;
        if (isBoard(board)) {
            const defaultColumnAttributes: IDraftColumn = {
                name: '',
                boardId: board.id
            };
            return {...defaultColumnAttributes, ...data};
        } else {
            throw new Error('Board must not be draft');
        }
    }

    updateDraftAttributes(data: TPartialDraftColumn) {
        if (isDraftColumn(this.attributes)) {
            this.attributes = {...this.attributes, ...data};
        } else {
            throw new Error('You can only change attributes of a draft column');
        }
    }

    @action
    * deleteCardFromStore(card: IBoardCardStore) {
        this.cards.data = this.cards.data.filter(c => c !== card);
    }

    private async updateOnServer(data: IColumn): Promise<IColumn> {
        return boardColumnApi.update(data);
    }

    private async createOnServer(data: IDraftColumn): Promise<IColumn> {
        return boardColumnApi.create(data);
    }

    @flow
    * createFromDraft() {
        const column = this.attributes;
        if (isDraftColumn(column)) {
            try {
                this.crudStatus.creating.isFetching = true;
                const createdColumn: Awaited<ReturnType<InstanceType<typeof BoardColumnStore>['createOnServer']>> = yield this.createOnServer(column);
                this.attributes = createdColumn;
            } catch (e) {
                this.crudStatus.creating.error = 'Some error';
                console.error(e);
            } finally {
                this.crudStatus.creating.isFetching = false;
            }
        }
    }

    @flow
    * update(column: IBoardColumnStore['attributes']) {
        if (isColumn(column)) {
            this.crudStatus.updating.isFetching = true;
            try {
                this.attributes = column;
                yield this.updateOnServer(column);
            } catch (e) {
                this.crudStatus.updating.error = 'Some error';
                console.error(e);
            } finally {
                this.crudStatus.updating.isFetching = false;
            }
        }
    }

    private async deleteFromServer(): Promise<void> {
        const column = this.attributes;
        if (isColumn(column)) {
            await boardColumnApi.delete(column.id);
        }
    }

    @flow
    * delete() {
        this.crudStatus.deleting.isFetching = true;
        try {
            yield this.deleteFromServer();
            this.boardColumnsListStore.deleteColumnFromList(this);
        } catch (e) {
            this.crudStatus.deleting.error = 'Some error';
            console.error(e);
        } finally {
            this.crudStatus.deleting.isFetching = false;
        }
    }
}

export default BoardColumnStore;
