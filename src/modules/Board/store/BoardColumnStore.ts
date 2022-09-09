import { isColumn } from '../../../CommonTypes';
import CrudStatus from '../../../store/CrudStatus';
import { action, flow, makeObservable, observable } from 'mobx';
import type { IBoardColumnsListStore } from './BoardColumnsListStore';
import type { TPartialColumn, IColumn } from '../../../CommonTypes';
import type { IBoardCardsListStore } from './BoardCardsListStore'
import type { IBoardCardStore } from './BoardCardStore';
import type { DependencyContainer } from '../../../packages/react-module-di';
import { inject, injectable } from '../../../packages/react-module-di';
import BOARD_DI_TOKENS from '../BOARD_DI_TOKENS';
import type { IBoardColumnApi } from '../api/BoardColumnApi';
import GLOBAL_DI_TOKENS from '../../../packages/react-module-di/GLOBAL_DI_TOKENS';

export interface IBoardColumnStore {
    attributes: TPartialColumn;
    crudStatus: CrudStatus;
    cards: IBoardCardsListStore;
    createFromDraft: () => void;
    updateDraftAttributes: (data: IBoardColumnStore['attributes']) => void;
    update: (column: IBoardColumnStore['attributes']) => void;
    delete: () => void;
    deleteCardFromStore(card: IBoardCardStore): void;
}

@injectable()
class BoardColumnStore implements IBoardColumnStore {
    @observable attributes: TPartialColumn;
    crudStatus = new CrudStatus();
    @observable cards: IBoardCardsListStore;

    constructor(
        @inject(GLOBAL_DI_TOKENS.DIContainer) private diContainer: DependencyContainer,
        @inject(BOARD_DI_TOKENS.ColumnsListStore) private boardColumnsListStore: IBoardColumnsListStore,
        @inject(BOARD_DI_TOKENS.ColumnApi) private boardColumnApi: IBoardColumnApi
    ) {
        makeObservable(this);
        this.attributes = {};
        this.cards = this.diContainer.resolve<IBoardCardsListStore>(BOARD_DI_TOKENS.CardsListStore);
        this.cards.columnStore = this;
        this.cards.fetch();
    }

    updateDraftAttributes(data: TPartialColumn) {
        if (!isColumn(this.attributes)) {
            this.attributes = {...{ boardId: this.boardColumnsListStore.boardStore?.attributes.id }, ...this.attributes, ...data};
        } else {
            throw new Error('You can only change attributes of a draft column');
        }
    }

    @action
    * deleteCardFromStore(card: IBoardCardStore) {
        this.cards.data = this.cards.data.filter(c => c !== card);
    }

    private async updateOnServer(data: IColumn): Promise<IColumn> {
        return this.boardColumnApi.update(data);
    }

    private async createOnServer(data: TPartialColumn): Promise<IColumn> {
        return this.boardColumnApi.create(data);
    }

    @flow
    * createFromDraft() {
        const column = this.attributes;
        if (!isColumn(column)) {
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
            await this.boardColumnApi.delete(column.id);
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
