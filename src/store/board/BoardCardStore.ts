import {
    ICard,
    IDraftCard,
    IColumn,
    isColumn,
    isDraftCard,
    IDraftColumn,
    isDraftColumn,
    TPartialDraftCard
} from '../../CommonTypes';
import CrudStatus from '../CrudStatus';
import { flow, makeObservable, observable } from 'mobx';
import BoardCardApi from '../../api/api/BoardCardApi';
import BoardColumnStore, { IBoardColumnStore } from './BoardColumnStore';
import { IBoardCardsListStore } from './BoardCardsListStore';

export interface IBoardCardStore {
    attributes: ICard | IDraftCard;
    crudStatus: CrudStatus;
    update: (card: ICard) => void;
    delete: () => void;
    createFromDraft: () => void;
    updateDraftAttributes: (data: IDraftCard) => void;
}

const boardCardApi = new BoardCardApi();

class BoardCardStore implements IBoardCardStore {
    @observable attributes: ICard | IDraftCard;
    crudStatus = new CrudStatus();
    private boardCardsListStore: IBoardCardsListStore;

    constructor(data: ICard | TPartialDraftCard | null, boardCardsListStore: IBoardCardsListStore) {
        makeObservable(this);
        this.boardCardsListStore = boardCardsListStore;
        this.attributes = this.getDraftCardAttributes(data);
    }

    private getDraftCardAttributes(data: ICard | TPartialDraftCard | null): ICard | IDraftCard {
        const column = this.boardCardsListStore.columnStore.attributes;
        if (isColumn(column)) {
            const defaultCardAttributes: IDraftCard = {
                name: '',
                body: '',
                columnId: column.id
            };
            return { ...defaultCardAttributes, ...data };
        } else {
            throw new Error('Column must not be draft');
        }
    }

    private async updateOnServer(data: ICard): Promise<ICard> {
        return await boardCardApi.update(data);
    }

    private async createOnServer(data: IDraftCard): Promise<ICard> {
        return await boardCardApi.create(data);
    }

    updateDraftAttributes(data: IDraftCard) {
        if (isDraftCard(this.attributes)) {
            this.attributes = data;
        } else {
            throw new Error('You can only change attributes of a draft card');
        }
    }

    @flow
    * createFromDraft() {
        const card = this.attributes;
        if (isDraftCard(card)) {
            try {
                this.crudStatus.creating.isFetching = true;
                const createdCard: Awaited<ReturnType<InstanceType<typeof BoardCardStore>['createOnServer']>> = yield this.createOnServer(card);
                this.attributes = createdCard;
            } catch (e) {
                this.crudStatus.creating.error = 'Some error';
                console.error(e);
            } finally {
                this.crudStatus.creating.isFetching = false;
            }
        }
    }

    @flow
    * update(data: ICard) {
        this.crudStatus.updating.isFetching = true;
        try {
            const updatedCard: Awaited<ReturnType<InstanceType<typeof BoardCardStore>['updateOnServer']>> = yield this.updateOnServer(data);
            this.attributes = updatedCard;
        } catch (e) {
            this.crudStatus.updating.error = 'Some error';
            console.error(e);
        } finally {
            this.crudStatus.updating.isFetching = false;
        }

    }

    private async deleteFromServerOrResolve(): Promise<void> {
        const card = this.attributes;
        if (isDraftCard(card)) return;
        await boardCardApi.delete(card);
    }

    @flow
    * delete() {
        try {
            this.crudStatus.deleting.isFetching = true;
            yield this.deleteFromServerOrResolve();
            this.boardCardsListStore.deleteCardFromList(this);
        } catch (e) {
            this.crudStatus.deleting.error = 'Some error';
            console.error(e);
        } finally {
            this.crudStatus.deleting.isFetching = false;
        }
    }
}

export default BoardCardStore;
