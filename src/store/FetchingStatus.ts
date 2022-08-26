import { makeObservable, observable } from 'mobx';

class FetchingStatus {
    @observable isFetching = false;
    @observable error = '';

    constructor() {
        makeObservable(this);
    }
}

export default FetchingStatus;
