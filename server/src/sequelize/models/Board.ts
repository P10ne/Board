import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { IBoard, IDraftBoard } from '../../../../src/CommonTypes';

@Table({ timestamps: false })
class Board extends Model<IBoard, IDraftBoard> implements IBoard {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @Column({
        type: DataType.STRING
    })
    name: string;
}

export default Board;
