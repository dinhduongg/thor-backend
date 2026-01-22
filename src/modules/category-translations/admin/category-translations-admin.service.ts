import { EntityManager, wrap } from '@mikro-orm/mysql'
import { Injectable } from '@nestjs/common'
import { CategoryTranslation } from '../entities/category-translations.entity'
import { CreateCategoryTranslationsAdminDto } from './dto/create-category-translations-admin.dto'
import { UpdateCategoryTranslationsAdminDto } from './dto/update-category-translations-admin.dto'

@Injectable()
export class CategoryTranslationsAdminService {
  constructor(private readonly em: EntityManager) {}

  async create(createCategoryTranslationsAdminDto: CreateCategoryTranslationsAdminDto) {
    const data = createCategoryTranslationsAdminDto.category_translation

    const categoryTranslation = this.em.create(CategoryTranslation, data)
    await this.em.persist(categoryTranslation).flush()

    return { category_translation: categoryTranslation }
  }

  async update(id: number, updateCategoryTranslationsAdminDto: UpdateCategoryTranslationsAdminDto) {
    const data = updateCategoryTranslationsAdminDto.category_translation

    const categoryTranslation = await this.em.findOneOrFail(CategoryTranslation, { id })
    wrap(categoryTranslation).assign(data)
    await this.em.persist(categoryTranslation).flush()

    return { category_translation: categoryTranslation }
  }

  async remove(id: number) {
    const categoryTranslation = await this.em.findOneOrFail(CategoryTranslation, { id })
    await this.em.remove(categoryTranslation).flush()
    return { category_translation: categoryTranslation }
  }
}
