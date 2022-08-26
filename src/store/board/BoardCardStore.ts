import { ICard, IDraftCard, IColumn } from '../../CommonTypes';
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
}

const boardCardApi = new BoardCardApi();

export function isCardToCreate(card: ICard | IDraftCard): card is IDraftCard {
    return typeof (card as ICard).id === 'undefined';
}

class BoardCardStore implements IBoardCardStore {
    @observable attributes: ICard | IDraftCard;
    crudStatus = new CrudStatus();
    private boardCardsListStore: IBoardCardsListStore;

    constructor(data: ICard | IColumn['id'] , boardCardsListStore: IBoardCardsListStore) {
        makeObservable(this);
        this.attributes = typeof data !== 'number' ? data : this.getDefaultCardData(data);
        this.boardCardsListStore = boardCardsListStore;
    }

    private getDefaultCardData(columnId: IColumn['id']): IDraftCard {
        return {
            body: '',
            name: '',
            columnId
        }
    }

    private async updateOnServer(data: ICard): Promise<ICard> {
        return await boardCardApi.update(data);
    }

    @flow
    * update(data: ICard) {
        this.crudStatus.updating.isFetching = true;
        try {
            const updatedCard: Awaited<ReturnType<InstanceType<typeof BoardCardStore>['updateOnServer']>> = yield this.updateOnServer(data);
            this.attributes = updatedCard;
        } catch (e) {
            this.crudStatus.updating.error = 'Some error';
        } finally {
            this.crudStatus.updating.isFetching = false;
        }

    }

    private async deleteFromServerOrResolve(): Promise<void> {
        const card = this.attributes;
        if (isCardToCreate(card)) return;
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
        } finally {
            this.crudStatus.deleting.isFetching = false;
        }
    }
}

export default BoardCardStore;
