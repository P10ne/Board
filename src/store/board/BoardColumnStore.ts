import { IBoard, IColumn, IDraftColumn, isColumn, isDraftColumn } from '../../CommonTypes';
import { IBoardCardStore } from './BoardCardStore';
import CrudStatus from '../CrudStatus';
import { action, flow, makeObservable, observable } from 'mobx';
import BoardColumnApi from '../../api/api/BoardColumnApi';
import BoardCardsListStore, { IBoardCardsListStore } from './BoardCardsListStore';
import { IBoardColumnsListStore } from './BoardColumnsListStore';

export enum EColumnStoreStatus {
    draft = 'draft',
    ready = 'ready'
}

export interface IBoardColumnStore {
    attributes: IColumn | IDraftColumn;
    crudStatus: CrudStatus;
    cards: IBoardCardsListStore;
    createFromDraft: () => void;
    update: (column: IColumn) => void;
    delete: () => void;
    deleteCardFromStore(card: IBoardCardStore): void;
}

const boardColumnApi = new BoardColumnApi();

class BoardColumnStore implements IBoardColumnStore {
    @observable attributes: IColumn | IDraftColumn;
    crudStatus = new CrudStatus();
    @observable cards: IBoardCardsListStore;
    @observable status: EColumnStoreStatus = EColumnStoreStatus.ready;
    private boardColumnsListStore: IBoardColumnsListStore;

    constructor(data: IColumn | IBoard['id'], boardColumnsListStore: IBoardColumnsListStore) {
        makeObservable(this);
        this.attributes = typeof data !== 'number' ? data : this.getDefaultColumnData(data);
        this.boardColumnsListStore = boardColumnsListStore;
        this.cards = new BoardCardsListStore(this);
    }

    private getDefaultColumnData(boardId: IBoard['id']): IDraftColumn {
        return {
            name: '',
            boardId
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
            } finally {
                this.crudStatus.creating.isFetching = false;
            }
        }
    }

    @flow
    * update(column: IColumn) {
        this.crudStatus.updating.isFetching = true;
        try {
            const updatedColumn: Awaited<ReturnType<InstanceType<typeof BoardColumnStore>['updateOnServer']>> = yield this.updateOnServer(column);
            this.attributes = updatedColumn;
        } catch (e) {
            this.crudStatus.updating.error = 'Some error';
        } finally {
            this.crudStatus.updating.isFetching = false;
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
        } finally {
            this.crudStatus.deleting.isFetching = false;
        }
    }
}

export default BoardColumnStore;
