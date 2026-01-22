import { EntityManager } from '@mikro-orm/mysql'
import { Injectable } from '@nestjs/common'
import { Category } from '../../entities/category.entity'

@Injectable()
export class FindOneService {
  constructor(private readonly em: EntityManager) {}

  async execute(id: number) {
    const category = await this.em.findOneOrFail(Category, { id }, { populate: ['translations'], strategy: 'joined' })
    return { category }
  }
}
