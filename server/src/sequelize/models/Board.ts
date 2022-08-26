import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { IBoard, IBoardToCreate } from '../../../../CommonTypes';

@Table({ timestamps: false })
class Board extends Model<IBoard, IBoardToCreate> implements IBoard {
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
