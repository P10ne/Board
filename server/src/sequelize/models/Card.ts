import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import ColumnModel from './Column';

export interface ICard {
    id: number;
    name: string;
    body: string;
    columnId: ColumnModel['id'];
}

export interface ICardToCreate extends Omit<ICard, 'id'> {}

@Table({ timestamps: false })
class Card extends Model<ICard, ICardToCreate> implements ICard {
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

    @Column({
        type: DataType.STRING
    })
    body: string;

    @ForeignKey(() => ColumnModel)
    @Column({
        type: DataType.INTEGER
    })
    columnId: ColumnModel['id'];
}

export default Card;
