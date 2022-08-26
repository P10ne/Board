import { FC, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Content, Header, Menu } from '../../UI';
import classes from './BoardPage.module.scss';
import { observer } from 'mobx-react-lite';
import { TMainBoardContext } from '../../modules/Board';
import BoardProvider from '../../modules/Board/components/BoardProvider/BoardProvider';
import { Board } from '../../modules/Board';
import { useStore } from '../../shared';

const BoardPage: FC = () => {
    const { id: boardId } = useParams<{id: string}>();
    const boardStore = useStore(v => v.board);

    if (typeof boardId === 'undefined') return <p>BoardId is wrong</p>;

    const contextValue: TMainBoardContext = {
        board: boardStore,
        boardId: Number(boardId)
    }

    return (
        <>
            <Header>
                <Menu
                    theme="dark"
                    mode="horizontal"
                />
            </Header>
            <Content className={classes.Board__content}>
                <BoardProvider contextValue={contextValue}>
                    <Board />
                </BoardProvider>
            </Content>
        </>
    )
}

export default observer(BoardPage);
