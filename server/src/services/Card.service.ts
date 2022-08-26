import { Inject, Injectable } from '@decorators/di';
import { CardModelToken } from '../InjectionTokens';
import { Card } from '../sequelize/models';
import { ICard, IColumn } from '../../../CommonTypes';

@Injectable()
class CardService {
    constructor(
        @Inject(CardModelToken) private cardModel: typeof Card
    ) {}

    async getListByColumnId(columnId: IColumn['id']): Promise<Card[]> {
        return await this.cardModel.findAll({
            where: { columnId }
        });
    }

    async create(column: Partial<ICard>): Promise<Card> {
        return await this.cardModel.create(column);
    }

    async update(column: Partial<IColumn>): Promise<Card> {
        const cardToUpdate = await this.cardModel.findByPk(column.id);
        return await cardToUpdate.update(column);
    }

    async delete(id: IColumn['id']): Promise<void> {
        const cardToDelete = await this.cardModel.findByPk(id);
        return await cardToDelete.destroy();
    }
}

export default CardService;
