import { EntityManager, wrap } from '@mikro-orm/mysql'
import { Injectable } from '@nestjs/common'
import { Category } from '../../entities/category.entity'
import { UpdateCategoriesAdminDto } from '../dto/update-categories-admin.dto'

@Injectable()
export class UpdateService {
  constructor(private readonly em: EntityManager) {}

  async execute(id: number, updateCategoriesAdminDto: UpdateCategoriesAdminDto) {
    const data = updateCategoriesAdminDto.category

    const category = await this.em.findOneOrFail(Category, { id })

    wrap(category).assign(data)
    await this.em.persist(category).flush()

    return { category }
  }
}
