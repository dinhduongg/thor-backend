import { MySqlDriver } from '@mikro-orm/mysql'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { join } from 'path'
import { DatabaseService } from './database.service'

@Global()
@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      driver: MySqlDriver,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          driver: MySqlDriver,
          dbName: configService.get<string>('mysql.dbName'),
          host: configService.get<string>('mysql.host'),
          port: configService.get<number>('mysql.port'),
          user: configService.get<string>('mysql.user'),
          password: configService.get<string>('mysql.password'),

          entities: [join(process.cwd(), 'dist/**/*.entity.js')],
          entitiesTs: [join(process.cwd(), 'src/**/*.entity.ts')],

          charset: 'utf8mb4',
          collate: 'utf8mb4_unicode_ci',

          migrations: {
            path: join(__dirname, 'migrations'), // TS (dev)
            pathTs: join(__dirname, 'migrations'), // TS
            glob: '!(*.d).{js,ts}',
            snapshot: false,
            transactional: false,
          },

          filters: {
            softDelete: {
              cond: (args, type, meta) => (meta?.properties?.deleted_at ? { deleted_at: null } : {}),
              args: false,
              default: true,
            },
          },

          synchronize: false,
        }
      },
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
