import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Content, Header, Menu } from '../../UI';
import classes from './BoardPage.module.scss';
import { observer } from 'mobx-react-lite';
import BoardProvider, { TBoardProviderProps } from '../../modules/Board/components/BoardProvider/BoardProvider';
import { Board } from '../../modules/Board';

const BoardPage: FC = () => {
    const { id: boardId } = useParams<{id: string}>();

    if (typeof boardId === 'undefined') return <p>BoardId is wrong</p>;

    const boardProviderProps: Omit<TBoardProviderProps, 'children'> = {
        boardId: Number(boardId),
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
                <BoardProvider {...boardProviderProps}>
                    <Board />
                </BoardProvider>
            </Content>
        </>
    )
}

export default observer(BoardPage);
