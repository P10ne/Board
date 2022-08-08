import classes from './Board.module.scss';
import { FC, useCallback, useEffect } from 'react';
import { Header, Content, Menu, PageHeader, Layout } from '../../UI';
import { BoardColumns } from './components';
import { useStore } from '../../hooks';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import MoveCardContext, { TMoveCardContext } from './Contexts/MoveCardContext';

const Board: FC = () => {
    const { id: boardId } = useParams<{id: string}>();
    const board = useStore(store => store.board);

    useEffect(() => {
        if (!boardId) return;
        board.fetch(Number(boardId));
    }, [boardId, board]);

    const cardHoverHandler = useCallback<TMoveCardContext['onCardHover']>((...args) => {
        board.moveCard(...args)
    }, []);

    const cardDropHandler = useCallback<TMoveCardContext['onCardDrop']>((...args) => {
        board.saveMoving(...args);
    }, []);

    return (
        <>
            <Header>
                <Menu
                    theme="dark"
                    mode="horizontal"
                />
            </Header>
            <Content className={classes.Board__content}>
                {
                    board.isLoading
                        ? <p>Loading...</p>
                        : board.data
                            ? <>
                                <PageHeader title={ board.data?.attributes.name } />
                                <Layout>
                                    <MoveCardContext.Provider value={{ onCardHover: cardHoverHandler, onCardDrop: cardDropHandler}}>
                                        <BoardColumns columnsData={board.data.columns} />
                                    </MoveCardContext.Provider>
                                </Layout>
                              </>
                            : board.error
                                ? <p>{ board.error }</p>
                                : ''
                }
            </Content>
        </>
    )
}

export default observer(Board);
