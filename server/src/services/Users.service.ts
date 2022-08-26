import { IUserToCreate } from '../../../CommonTypes';

const { hashSync } = require('bcrypt');
import { Inject, Injectable } from '@decorators/di';
import { User } from '../sequelize/models';
import { UserModelToken } from '../InjectionTokens';

@Injectable()
class UsersService {
    constructor(
        @Inject(UserModelToken) private userModel: typeof User
    ) {}

    async getUserByEmail(email: User['email']): Promise<User | null> {
        return await this.userModel.findOne({
            where: { email }
        })
    }

    async add(data: IUserToCreate): Promise<User> {
        const userDataToAdd: IUserToCreate = {
            ...data,
            password: data.fromSocial ? '' : hashSync(data.password, 10)
        }
        return await this.userModel.create(userDataToAdd);
    }
}

export default UsersService;
