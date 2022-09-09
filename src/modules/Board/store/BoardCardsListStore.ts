import FetchingStatus from '../../../store/FetchingStatus';
import { action, flow, makeObservable, observable } from 'mobx';
import { isCard, isColumn } from '../../../CommonTypes';
import type { TPartialCard } from '../../../CommonTypes';
import type { IBoardColumnStore } from './BoardColumnStore';
import type { IBoardCardStore } from './BoardCardStore';
import { inject, injectable } from '../../../packages/react-module-di';
import type { DependencyContainer } from '../../../packages/react-module-di';
import GLOBAL_DI_TOKENS from '../../../packages/react-module-di/GLOBAL_DI_TOKENS';
import BOARD_DI_TOKENS from '../BOARD_DI_TOKENS';
import type { IBoardCardApi } from '../api/BoardCardApi';

export interface IBoardCardsListStore {
    status: FetchingStatus;
    data: IBoardCardStore[];
    columnStore: IBoardColumnStore | null;
    fetch: () => void;
    addDraftCardToList: (data: IBoardCardStore) => void;
    createDraftCard: (data: TPartialCard, addToList?: boolean) => IBoardCardStore | undefined;
    deleteCardFromList: (card: IBoardCardStore) => void;
}

@injectable()
class BoardCardsListStore implements IBoardCardsListStore {
    @observable status = new FetchingStatus();
    @observable data: IBoardCardStore[] = [];
    columnStore: IBoardColumnStore | null;

    constructor(
        @inject(GLOBAL_DI_TOKENS.DIContainer) private diContainer: DependencyContainer,
        @inject(BOARD_DI_TOKENS.CardApi) private boardCardApi: IBoardCardApi
    ) {
        makeObservable(this);
        this.columnStore = null;
    }

    @flow
    * fetch() {
        if (!this.columnStore) {
            throw new Error('ColumnStore is null');
        }
        const column = this.columnStore.attributes;
        if (isColumn(column)) {
            this.status.isFetching = true;
            try {
                const response: Awaited<ReturnType<IBoardCardApi['getList']>> = yield this.boardCardApi.getList(column.id);
                this.data = response.map(item => {
                    const cardStore = this.diContainer.resolve<IBoardCardStore>(BOARD_DI_TOKENS.CardStore);
                    cardStore.attributes = item;
                    cardStore.boardCardsListStore = this;
                    return cardStore;
                });
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
        if (!isCard(data.attributes)) {
            this.data.push(data);
        }
    }

    @action
    createDraftCard(data: TPartialCard, addToList: boolean = true) {
        if (!this.columnStore) {
            throw new Error('ColumnsStore is null');
        }
        const column = this.columnStore.attributes;
        if (isColumn(column)) {
            const draftCard: IBoardCardStore = this.diContainer.resolve<IBoardCardStore>(BOARD_DI_TOKENS.CardStore);
            draftCard.boardCardsListStore = this;
            draftCard.updateDraftAttributes(data);
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
