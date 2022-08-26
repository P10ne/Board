import { FC, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Content, Header, Menu } from '../../UI';
import classes from './BoardPage.module.scss';
import { StoreContext } from '../../index';
import { observer } from 'mobx-react-lite';
import { TMainBoardContext } from '../../modules/Board';
import BoardProvider from '../../modules/Board/components/BoardProvider/BoardProvider';
import { Board } from '../../modules/Board';
import { useContextSelector } from '../../shared';

const BoardPage: FC = () => {
    console.log('render boardpage');
    const { id: boardId } = useParams<{id: string}>();
    const board = useContextSelector(StoreContext, v => v.board);

    useEffect(() => {
        if (!boardId) return;
        board?.fetch(Number(boardId));
    }, [boardId]);

    const contextValue: TMainBoardContext = {
        board
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
