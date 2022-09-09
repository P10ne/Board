import { FC, useCallback, useEffect } from 'react';
import { PageHeader, Layout } from '../../../../UI';
import { observer } from 'mobx-react-lite';
import { MoveCardContext, TMoveCardContext } from '../../../DragAndDrop/contexts';
import BoardMainContext from '../../contexts/BoardMainContext';
import BoardColumns from '../BoardColumns/BoardColumns';
import { useContextSelector } from '../../../../shared';
import useBoardStore from '../../hooks/useBoardStore';
import useBoardContext from '../../hooks/useBoardContext';

type TBoardProps = {}

const Board: FC<TBoardProps> = () => {
    const boardId = useBoardContext(v => v.boardId);
    const board = useBoardStore(v => v);

    useEffect(() => {
        board.fetch(boardId);
    }, [boardId]);

    const cardHoverHandler = useCallback<TMoveCardContext['onCardHover']>((...args) => {
        // board.moveCard(...args)
    }, []);

    const cardDropHandler = useCallback<TMoveCardContext['onCardDrop']>((...args) => {
        // board.saveMoving(...args);
    }, []);

    return (
        board?.crudStatus.fetching.isFetching
        ? <p>Loading...</p>
            : board?.crudStatus.fetching.error
                ? <p>{ board.crudStatus.fetching.error }</p>
                : board?.attributes
                    ? <>
                        <PageHeader title={ board.attributes.name } />
                        <Layout>
                            <MoveCardContext.Provider value={{ onCardHover: cardHoverHandler, onCardDrop: cardDropHandler}}>
                                <BoardColumns />
                            </MoveCardContext.Provider>
                        </Layout>
                    </>
                    : null

    )
}

export default observer(Board);
