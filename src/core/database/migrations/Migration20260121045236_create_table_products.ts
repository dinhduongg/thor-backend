import { Migration } from '@mikro-orm/migrations';

export class Migration20260121045236_create_table_products extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table \`products\` (\`id\` int unsigned not null auto_increment primary key, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`deleted_at\` datetime null, \`sku\` varchar(100) not null, \`type\` varchar(50) not null, \`status\` tinyint not null, \`name\` varchar(255) not null) default character set utf8mb4 collate utf8mb4_unicode_ci engine = InnoDB;`,
    );
    this.addSql(
      `alter table \`products\` add index \`products_created_at_index\`(\`created_at\`);`,
    );
    this.addSql(
      `alter table \`products\` add index \`products_deleted_at_index\`(\`deleted_at\`);`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists \`products\`;`);
  }
}
