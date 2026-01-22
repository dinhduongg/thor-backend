import { Module } from '@nestjs/common'
import { CategoriesAdminController } from './categories-admin.controller'
import { CreateService, FindAllService, FindOneService, RemoveService, UpdateService } from './services'

@Module({
  controllers: [CategoriesAdminController],
  providers: [CreateService, FindAllService, FindOneService, UpdateService, RemoveService],
})
export class CategoriesAdminModule {}
