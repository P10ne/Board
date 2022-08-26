import { IColumn } from '../../../../CommonTypes';
import { boardColumnApi } from '../../../api';
import { useFetching } from '../../../hooks';

const useColumnDelete = () => {
    const deleteColumn: (id: IColumn['id']) => Promise<void> = async id => {
        try {
            await boardColumnApi.delete(id);
        } catch (e) {
            throw e;
        }
    }

    const { isLoading, error, fetch } = useFetching(deleteColumn);

    return {
        isLoading,
        error,
        deleteFn: fetch
    }
}

export default useColumnDelete;
