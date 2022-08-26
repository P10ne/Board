import FetchingStatus from '../FetchingStatus';
import { action, computed, flow, makeObservable, observable } from 'mobx';
import BoardCardStore, { IBoardCardStore, isCardToCreate } from './BoardCardStore';
import BoardCardApi from '../../api/api/BoardCardApi';
import col from '../../UI/Col/Col';
import { IColumn, IDraftColumn, isColumn, isDraftColumn } from '../../CommonTypes';
import { IBoardColumnStore } from './BoardColumnStore';

export interface IBoardCardsListStore {
    status: FetchingStatus;
    data: IBoardCardStore[];
    fetch: () => void;
    addDraftCard: () => IBoardCardStore | undefined;
    deleteCardFromList: (card: IBoardCardStore) => void;
}

const boardCardApi = new BoardCardApi();

class BoardCardsListStore implements IBoardCardsListStore {
    @observable status = new FetchingStatus();
    @observable data: IBoardCardStore[] = [];
    columnStore: IBoardColumnStore;

    constructor(columnStore: IBoardColumnStore) {
        makeObservable(this);
        this.columnStore = columnStore;
        this.fetch();
    }

    @flow
    * fetch() {
        const column = this.columnStore.attributes;
        if (isColumn(column)) {
            this.status.isFetching = true;
            try {
                const response: Awaited<ReturnType<typeof boardCardApi.getList>> = yield boardCardApi.getList(column.id);
                this.data = response.map(item => new BoardCardStore(item, this));
            } catch (e) {
                this.status.error = 'Some error';
            } finally {
                this.status.isFetching = false;
            }
        }

    }

    @action
    addDraftCard() {
        const column = this.columnStore.attributes;
        if (isColumn(column)) {
            const draftCard: IBoardCardStore = new BoardCardStore(column.id, this);
            this.data.push(draftCard);
            return draftCard;
        }
    }

    @action
    deleteCardFromList(card: IBoardCardStore) {
        this.data = this.data.filter(c => c !== card);
    }
}

export default BoardCardsListStore;
