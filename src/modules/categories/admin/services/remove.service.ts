import { EntityManager } from '@mikro-orm/mysql'
import { Injectable } from '@nestjs/common'
import { Category } from '../../entities/category.entity'

@Injectable()
export class RemoveService {
  constructor(private readonly em: EntityManager) {}

  async execute(id: number) {
    const category = await this.em.findOneOrFail(Category, { id })
    await this.em.remove(category).flush()
    return { category }
  }
}
