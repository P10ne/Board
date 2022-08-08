import classes from './BoardColumns.module.scss';
import { FC } from 'react';
import { Col, Row } from '../../../../UI'
import BoardCard from '../BoardCard/BoardCard';
import BoardColumnItem from '../BoardColumnItem/BoardColumnItem';
import { useStore } from '../../../../hooks';
import { observer } from 'mobx-react-lite';
import { TBoardColumnsStore } from '../../../../store';
import DragDropColumn from '../DragDropColumn/DragDropColumn';

type TBoardColumnsProps = {
    columnsData: TBoardColumnsStore
}

const BoardColumns: FC<TBoardColumnsProps> = ({ columnsData }) => {
    return (
        <div className={classes.container}>
            <Row gutter={[20, 0]} wrap={false} style={{height: '100%'}}>
                {
                    columnsData.data.map(col => (
                        <Col flex='290px' key={col.attributes.id}>
                            <DragDropColumn columnData={col} />
                        </Col>
                    ))
                }
            </Row>

        </div>
    )
}

export default observer(BoardColumns);
