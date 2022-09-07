import { Token } from 'typedi';

const DI_TOKENS = {
    Store: new Token('store'),
    Api: new Token('api')
}

export default DI_TOKENS;
