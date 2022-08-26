import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { IPublicUser, IUser, IDraftUser } from '../../../../src/CommonTypes';

@Table({ timestamps: false })
class User extends Model<IUser, IDraftUser> implements IUser {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        unique: true
    })
    email: string;

    @Column({
        type: DataType.STRING
    })
    password: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    fromSocial: boolean;

    getPublicUser(): IPublicUser {
        const { id, email, fromSocial } = this.toJSON();
        return {
            id,
            email,
            fromSocial
        }
    }
}

export default User;
