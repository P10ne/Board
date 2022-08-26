import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import Board from './Board';
import { IColumn, IColumnToCreate } from '../../../../CommonTypes';


@Table({ timestamps: false, tableName: 'Column' })
class ColumnModel extends Model<IColumn, IColumnToCreate> implements IColumn {
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

    @ForeignKey(() => Board)
    @Column({
        type: DataType.INTEGER
    })
    boardId: Board['id']
}

export default ColumnModel;
