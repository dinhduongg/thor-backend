import { Migration } from '@mikro-orm/migrations'

export class Migration20260122042814_create_categories_and_category_translations_table extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table \`categories\` (\`id\` int unsigned not null auto_increment primary key, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`sorted\` tinyint null, \`image_id\` varchar(255) null, \`level\` int not null default 1, \`icon\` varchar(255) null, \`parent_id\` int unsigned null) default character set utf8mb4 collate utf8mb4_unicode_ci engine = InnoDB;`,
    )
    this.addSql(`alter table \`categories\` add index \`categories_parent_id_index\`(\`parent_id\`);`)
    this.addSql(`alter table \`categories\` add index \`categories_created_at_index\`(\`created_at\`);`)
    this.addSql(`alter table \`categories\` add index \`categories_level_index\`(\`level\`);`)
    this.addSql(`alter table \`categories\` add index \`categories_parent_id_sorted_index\`(\`parent_id\`, \`sorted\`);`)

    this.addSql(
      `create table \`category_translations\` (\`id\` int unsigned not null auto_increment primary key, \`language\` varchar(10) not null, \`name\` varchar(255) not null, \`description\` text null, \`meta_title\` text null, \`meta_description\` text null, \`slug\` varchar(255) null, \`category_id\` int unsigned not null) default character set utf8mb4 collate utf8mb4_unicode_ci engine = InnoDB;`,
    )
    this.addSql(`alter table \`category_translations\` add index \`category_translations_category_id_index\`(\`category_id\`);`)
    this.addSql(`alter table \`category_translations\` add index \`category_translations_slug_index\`(\`slug\`);`)
    this.addSql(`alter table \`category_translations\` add index \`category_translations_category_id_language_index\`(\`category_id\`, \`language\`);`)

    this.addSql(
      `alter table \`categories\` add constraint \`categories_parent_id_foreign\` foreign key (\`parent_id\`) references \`categories\` (\`id\`) on update cascade on delete set null;`,
    )

    this.addSql(
      `alter table \`category_translations\` add constraint \`category_translations_category_id_foreign\` foreign key (\`category_id\`) references \`categories\` (\`id\`) on update cascade;`,
    )
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`categories\` drop foreign key \`categories_parent_id_foreign\`;`)

    this.addSql(`alter table \`category_translations\` drop foreign key \`category_translations_category_id_foreign\`;`)

    this.addSql(`drop table if exists \`categories\`;`)

    this.addSql(`drop table if exists \`category_translations\`;`)
  }
}
