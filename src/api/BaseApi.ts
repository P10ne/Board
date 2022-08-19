import Fetcher from './Fetcher';
import RootStore from '../store';
import { store } from '../index';

type TBaseApiOptions = {
    basePath: string;
}

abstract class BaseApi {
    protected basePath: string;
    protected fetcher: Fetcher;

    constructor({ basePath }: TBaseApiOptions) {
        this.basePath = basePath;
        this.fetcher = new Fetcher({ basePath })
    }
}

export default BaseApi;
