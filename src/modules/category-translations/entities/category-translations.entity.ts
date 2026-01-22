import { Category } from '@/modules/categories/entities/category.entity'
import { BaseEntity } from '@/shared/entities/base.entity'
import { makeSlug } from '@/shared/libs/utilities'
import { BeforeCreate, BeforeUpdate, Entity, Index, ManyToOne, Property } from '@mikro-orm/core'

@Entity({ tableName: 'category_translations' })
@Index({ properties: ['category', 'language'] })
@Index({ properties: ['slug'] })
export class CategoryTranslation extends BaseEntity<CategoryTranslation> {
  @Property({ type: 'varchar', length: 10, name: 'language' })
  language!: string

  @Property({ type: 'varchar', length: 255, name: 'name' })
  name!: string

  @Property({ type: 'text', name: 'description', nullable: true })
  description?: string | null

  @Property({ type: 'text', name: 'meta_title', nullable: true })
  meta_title?: string | null

  @Property({ type: 'text', name: 'meta_description', nullable: true })
  meta_description?: string | null

  @Property({ type: 'varchar', length: 255, name: 'slug', nullable: true })
  slug?: string | null

  // ================ Relations ==================

  @ManyToOne(() => Category, { nullable: false, fieldName: 'category_id' })
  category!: Category

  // ================== Hooks ==================

  @BeforeCreate()
  @BeforeUpdate()
  normalizeSlug() {
    this.slug = !this.slug ? makeSlug(this.name) : this.slug
  }
}
