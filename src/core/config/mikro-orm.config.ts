import { defineConfig } from '@mikro-orm/mysql'
import dotenv from 'dotenv'
import fs from 'fs'
import { join } from 'path'

function dotenvConfig() {
  const envLocal = '.env.local'
  const envDev = '.env.development'
  const envFile = '.env'

  if (fs.existsSync(envLocal)) {
    dotenv.config({ path: envLocal })
  } else if (fs.existsSync(envDev)) {
    dotenv.config({ path: envDev })
  } else if (fs.existsSync(envFile)) {
    dotenv.config({ path: envFile })
  }
}

dotenvConfig()

export default defineConfig({
  driver: require('@mikro-orm/mysql').MySqlDriver,
  dbName: process.env.MYSQL_DB_NAME || 'thor_mysql',
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',

  entities: [join(__dirname, '../../../dist/**/*.entity.js')],
  entitiesTs: [join(__dirname, '../../**/*.entity.ts')],

  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci',

  migrations: {
    path: join(__dirname, '../database/migrations'),
    pathTs: join(__dirname, '../database/migrations'),
    glob: '!(*.d).{js,ts}',
    snapshot: false,
  },

  seeder: {
    path: join(__dirname, '../database/seeders'),
    pathTs: join(__dirname, '../database/seeders'),
    defaultSeeder: 'DatabaseSeeder',
    glob: '!(*.d).{js,ts}',
  },
})
