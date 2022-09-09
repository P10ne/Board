import { isCard } from '../../../CommonTypes';
import type { TPartialCard } from '../../../CommonTypes';
import type { ICard } from '../../../CommonTypes';
import CrudStatus from '../../../store/CrudStatus';
import { flow, makeObservable, observable } from 'mobx';
import type { IBoardCardsListStore } from './BoardCardsListStore';
import { inject, injectable } from '../../../packages/react-module-di';
import BOARD_DI_TOKENS from '../BOARD_DI_TOKENS';
import type { IBoardCardApi } from '../api/BoardCardApi';

export interface IBoardCardStore {
    attributes: TPartialCard;
    crudStatus: CrudStatus;
    boardCardsListStore: IBoardCardsListStore | null;
    update: (card: ICard) => void;
    delete: () => void;
    createFromDraft: () => void;
    updateDraftAttributes: (data: TPartialCard) => void;
}

@injectable()
class BoardCardStore implements IBoardCardStore {
    @observable attributes: TPartialCard;
    crudStatus = new CrudStatus();
    boardCardsListStore: IBoardCardsListStore | null;

    constructor(
        @inject(BOARD_DI_TOKENS.CardApi) private boardCardApi: IBoardCardApi
    ) {
        makeObservable(this);
        this.attributes = {};
        this.boardCardsListStore = null;
    }

    private async updateOnServer(data: ICard): Promise<ICard> {
        return await this.boardCardApi.update(data);
    }

    private async createOnServer(data: TPartialCard): Promise<ICard> {
        return await this.boardCardApi.create(data);
    }

    updateDraftAttributes(data: TPartialCard) {
        if (!isCard(this.attributes)) {
            this.attributes = { ...{ columnId: this.boardCardsListStore?.columnStore?.attributes.id }, ...this.attributes, ...data };
        } else {
            throw new Error('You can only change attributes of a draft card');
        }
    }

    @flow
    * createFromDraft() {
        const card = this.attributes;
        if (!isCard(card)) {
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
        if (!isCard(card)) return;
        await this.boardCardApi.delete(card.id);
    }

    @flow
    * delete() {
        if (!this.boardCardsListStore) {
            throw new Error('BoardCardsListStore is null');
        }
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
