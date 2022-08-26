import FetchingStatus from './FetchingStatus';
import { makeObservable, observable } from 'mobx';

class CrudStatus {
    @observable deleting = new FetchingStatus();
    @observable updating = new FetchingStatus();
    @observable creating = new FetchingStatus();
    @observable fetching = new FetchingStatus();

    constructor() {
        makeObservable(this);
    }
}

export default CrudStatus;
