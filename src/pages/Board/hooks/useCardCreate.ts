import { useFetching } from '../../../hooks';
import { ICard, ICardToCreate } from '../../../../CommonTypes';
import { boardCardApi } from '../../../api';

const useCardCreate = () => {
    const createCard: (data: ICardToCreate) => Promise<ICard> = async data => {
        try {
            return await boardCardApi.create(data);
        } catch (e) {
            throw e;
        }
    }
    const { isLoading, error, fetch } = useFetching(createCard);

    return {
        isLoading,
        error,
        create: fetch
    }
}

export default useCardCreate;
