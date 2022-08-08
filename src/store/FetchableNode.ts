import { types } from 'mobx-state-tree';

const FetchableNode = types.model({
    isLoading: types.optional(types.boolean, false),
    error: types.optional(types.string, '')
});

export default FetchableNode;
