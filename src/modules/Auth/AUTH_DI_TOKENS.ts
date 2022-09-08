import AuthStore from './store/AuthStore';

const AUTH_DI_TOKENS = {
    Store: Symbol('store'),
    Api: Symbol('api')
}

export default AUTH_DI_TOKENS;
