import { EntityManager, EntityRepository, FilterQuery, FindOptions, EntityName } from '@mikro-orm/core'
import { Type } from 'class-transformer'
import { IsInt, IsOptional, Max, Min } from 'class-validator'

/**
 * DTO cho pagination query parameters
 */
export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10
}

/**
 * Interface cho pagination metadata
 */
export interface PaginationMeta {
  current_page: number
  total_pages: number
  total_items: number
  items_per_page: number
  has_next_page: boolean
  has_prev_page: boolean
  next_page: number | null
  prev_page: number | null
}

/**
 * Interface cho paginated response
 */
export interface PaginatedResponse<T> {
  data: T[]
  pagination: PaginationMeta
}

/**
 * Tính toán pagination metadata
 */
export function createPaginationMeta(page: number, limit: number, totalItems: number): PaginationMeta {
  const totalPages = Math.ceil(totalItems / limit)
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  return {
    current_page: page,
    total_pages: totalPages,
    total_items: totalItems,
    items_per_page: limit,
    has_next_page: hasNextPage,
    has_prev_page: hasPrevPage,
    next_page: hasNextPage ? page + 1 : null,
    prev_page: hasPrevPage ? page - 1 : null,
  }
}

/**
 * Tạo paginated response
 */
export function createPaginatedResponse<T>(data: T[], page: number, limit: number, totalItems: number): PaginatedResponse<T> {
  return {
    data,
    pagination: createPaginationMeta(page, limit, totalItems),
  }
}

/**
 * Tính offset từ page và limit
 */
export function getOffset(page: number, limit: number): number {
  return (page - 1) * limit
}

export function getPaginationOptions(paginationDto: PaginationDto) {
  const page = paginationDto.page || 1
  const limit = paginationDto.limit || 10

  return {
    limit,
    offset: getOffset(page, limit),
  }
}

/**
 * Helper để gọi data từ MikroORM Repository hoặc EntityManager với pagination tự động
 *
 * @example
 * ```typescript
 * // Với Repository
 * async findAll(query: PaginationDto) {
 *   return await paginate(
 *     this.repository,
 *     query,
 *     { name: { $ne: null } },
 *     ['translations', 'parent'],
 *     { orderBy: { createdAt: 'DESC' } }
 *   );
 * }
 *
 * // Với EntityManager
 * async findAll(query: PaginationDto) {
 *   return await paginate(
 *     this.em,
 *     CategoryEntity,
 *     query,
 *     { isActive: true },
 *     ['translations'],
 *     { orderBy: { name: 'ASC' } }
 *   );
 * }
 * ```
 */
export async function paginate<T extends object>(
  source: EntityRepository<T> | EntityManager,
  entityClassOrDto: EntityName<T> | PaginationDto,
  paginationDtoOrWhere?: PaginationDto | FilterQuery<T>,
  whereOrPopulate?: FilterQuery<T> | string[],
  populateOrOptions?: string[] | FindOptions<T>,
  optionsParam?: FindOptions<T>,
): Promise<PaginatedResponse<T>> {
  let repository: EntityRepository<T>
  let paginationDto: PaginationDto
  let where: FilterQuery<T>
  let populate: string[] | undefined
  let options: FindOptions<T> | undefined

  // Kiểm tra nếu source là EntityManager
  if (source instanceof EntityManager) {
    // paginate(em, Entity, dto, where, populate, options)
    repository = source.getRepository(entityClassOrDto as EntityName<T>)
    paginationDto = paginationDtoOrWhere as PaginationDto
    where = (whereOrPopulate as FilterQuery<T>) || ({} as FilterQuery<T>)
    populate = populateOrOptions as string[] | undefined
    options = optionsParam
  } else {
    // paginate(repository, dto, where, populate, options)
    repository = source
    paginationDto = entityClassOrDto as PaginationDto
    where = (paginationDtoOrWhere as FilterQuery<T>) || ({} as FilterQuery<T>)
    populate = whereOrPopulate as string[] | undefined
    options = populateOrOptions as FindOptions<T> | undefined
  }

  const page = paginationDto.page || 1
  const limit = paginationDto.limit || 10
  const offset = getOffset(page, limit)

  const [data, total] = await repository.findAndCount(where, {
    ...options,
    populate: populate as any,
    limit,
    offset,
  } as FindOptions<T>)

  return createPaginatedResponse(data, page, limit, total)
}
