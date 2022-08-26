import { makeObservable, observable } from 'mobx';
import AuthStore, { IAuthStore } from './auth/AuthStore';
import BoardStore, { IBoardStore } from './board/BoardStore';

export interface IRootStore {
    board: IBoardStore;
    auth: IAuthStore;
}

class RootStore implements IRootStore {
    @observable board = new BoardStore();
    @observable auth = new AuthStore();

    constructor() {
        makeObservable(this);
    }
}

const rootStore = new RootStore();

export default rootStore;
