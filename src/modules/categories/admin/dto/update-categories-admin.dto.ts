import { CreateCategoriesAdminDto, CreateCategoriesAdminPayload } from './create-categories-admin.dto'

export class UpdateCategoriesAdminDto extends CreateCategoriesAdminDto {
  category: Partial<CreateCategoriesAdminPayload>
}
