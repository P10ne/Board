import { FC, useContext } from 'react';
import classes from './BoardColumns.module.scss';
import { observer } from 'mobx-react-lite';
import NewBoardColumn from '../NewBoardColumn/NewBoardColumn';
import BoardMainContext from '../../contexts/BoardMainContext';
import { Col, Row } from '../../../../UI';
import { DragDropColumn } from '../../../DragAndDrop';
import { useContextSelector } from '../../../../shared';
import BoardColumnItem from '../../../Board/components/BoardColumn/BoardColumn';
import { isColumn } from '../../../../CommonTypes';

type TBoardColumnsProps = {}

const BoardColumns: FC<TBoardColumnsProps> = () => {
    const columnsList = useContextSelector(BoardMainContext, v => v.board?.columnsList);
    if (!columnsList) return null;
    return (
        <div className={classes.container}>
            <Row gutter={[20, 0]} wrap={false} style={{height: '100%'}}>
                {
                    columnsList.data.map((col, index) => (
                        <Col flex='290px' key={isColumn(col.attributes) ? col.attributes.id : `draft-${index}`}>
                            {/*<DragDropColumn columnData={col} />*/}
                            <BoardColumnItem columnData={col} />
                        </Col>
                    ))
                }
                <Col flex='290px'>
                    <NewBoardColumn />
                </Col>
            </Row>

        </div>
    )
}

export default observer(BoardColumns);
