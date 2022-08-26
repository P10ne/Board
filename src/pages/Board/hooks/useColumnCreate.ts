import { useFetching } from '../../../hooks';
import { boardColumnApi } from '../../../api';
import { IBoard, IColumn, IColumnToCreate } from '../../../../CommonTypes';

const useColumnCreate = () => {
    const createColumn: (data: IColumnToCreate) => Promise<IColumn> = async data => {
        try {
            return await boardColumnApi.create(data);
        } catch (e) {
            throw e;
        }
    }

    const { isLoading, error, fetch } = useFetching(createColumn);

    return {
        isLoading,
        error,
        create: fetch
    }
}

export default useColumnCreate;
