import { CategoryTranslation } from '@/modules/category-translations/entities/category-translations.entity'
import { BaseTimestampEntity } from '@/shared/entities/base-timestamp.entity'
import { Cascade, Collection, Entity, Index, ManyToOne, OneToMany, Property } from '@mikro-orm/core'

@Entity({ tableName: 'categories' })
@Index({ properties: ['parent', 'sorted'] })
@Index({ properties: ['level'] })
export class Category extends BaseTimestampEntity<Category> {
  @Property({ type: 'tinyint', nullable: true, name: 'sorted' })
  sorted?: number

  @Property({ type: 'varchar', length: 255, name: 'image_id', nullable: true })
  image_id?: string | null

  @Property({ type: 'int', name: 'level', default: 1 })
  level!: number

  @Property({ type: 'varchar', length: 255, name: 'icon', nullable: true })
  icon?: string | null

  // ================ Relations ==================

  @ManyToOne(() => Category, { nullable: true, fieldName: 'parent_id' })
  parent?: Category

  @OneToMany(() => Category, (category) => category.parent, {
    orphanRemoval: true,
    cascade: [Cascade.PERSIST, Cascade.REMOVE],
  })
  childrens = new Collection<Category>(this)

  @OneToMany(() => CategoryTranslation, (translation) => translation.category, {})
  translations = new Collection<CategoryTranslation>(this)
}
