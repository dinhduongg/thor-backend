import { EntityManager } from '@mikro-orm/mysql'
import { Injectable } from '@nestjs/common'
import { Category } from '../../entities/category.entity'
import { CreateCategoriesAdminDto } from '../dto/create-categories-admin.dto'

@Injectable()
export class CreateService {
  constructor(private readonly em: EntityManager) {}

  async execute(createCategoriesAdminDto: CreateCategoriesAdminDto) {
    const data = createCategoriesAdminDto.category

    const category = this.em.create(Category, data)
    await this.em.persist(category).flush()

    return { category }
  }
}
