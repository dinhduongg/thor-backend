import { paginate } from '@/shared/libs/pagination'
import { EntityManager, FilterQuery } from '@mikro-orm/mysql'
import { Injectable } from '@nestjs/common'
import { Category } from '../../entities/category.entity'
import { CategoryQuery } from '../interfaces/query.interface'

@Injectable()
export class FindAllService {
  constructor(private readonly em: EntityManager) {}

  async execute(query: CategoryQuery) {
    const { parent_id, q, page = 1, limit = 40 } = query

    const where: FilterQuery<Category> = {}

    if (q?.trim()) {
      where['translations'] = { name: { $like: `%${q.trim()}%` } }
    }

    where['parent_id'] = parent_id ?? null

    const categories = await paginate(this.em, Category, { page: Number(page), limit: Number(limit) }, where, ['translations'], { orderBy: { sorted: 'ASC' } })

    return { categories }
  }
}
