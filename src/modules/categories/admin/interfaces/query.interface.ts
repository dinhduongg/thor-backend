import { GlobalQueryParams } from '@/shared/interfaces/query.interface'

export interface CategoryQuery extends GlobalQueryParams {
  parent_id?: string
}
