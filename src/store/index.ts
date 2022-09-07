import { makeObservable, observable } from 'mobx';
import AuthStore, { IAuthStore } from '../modules/Auth/store/AuthStore';
import BoardStore, { IBoardStore } from './board/BoardStore';

export interface IRootStore {
    board: IBoardStore;
}

class RootStore implements IRootStore {
    @observable board = new BoardStore();

    constructor() {
        makeObservable(this);
    }
}

const rootStore = new RootStore();

export default rootStore;
