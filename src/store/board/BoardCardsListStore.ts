import FetchingStatus from '../FetchingStatus';
import { action, flow, makeObservable, observable } from 'mobx';
import BoardCardApi from '../../api/api/BoardCardApi';
import { isCard, isColumn, isDraftCard } from '../../CommonTypes';
import type { TPartialDraftCard } from '../../CommonTypes';
import { IBoardColumnStore } from './BoardColumnStore';
import BoardCardStore  from './BoardCardStore';
import type { IBoardCardStore } from './BoardCardStore';

export interface IBoardCardsListStore {
    status: FetchingStatus;
    data: IBoardCardStore[];
    columnStore: IBoardColumnStore;
    fetch: () => void;
    addDraftCardToList: (data: IBoardCardStore) => void;
    createDraftCard: (data: TPartialDraftCard | null, addToList?: boolean) => IBoardCardStore | undefined;
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
                console.error(e);
            } finally {
                this.status.isFetching = false;
            }
        }
    }

    @action
    addDraftCardToList(data: IBoardCardStore) {
        if (isDraftCard(data.attributes)) {
            this.data.push(data);
        }
    }

    @action
    createDraftCard(data: TPartialDraftCard | null, addToList: boolean = true) {
        const column = this.columnStore.attributes;
        if (isColumn(column)) {
            const draftCard: IBoardCardStore = new BoardCardStore(data, this);
            if (addToList) {
                this.addDraftCardToList(draftCard);
            }
            return draftCard;
        }
    }

    @action
    deleteCardFromList(card: IBoardCardStore) {
        this.data = this.data.filter(c => c !== card);
    }
}

export default BoardCardsListStore;
