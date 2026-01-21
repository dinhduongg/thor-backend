import { MySqlDriver } from '@mikro-orm/mysql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

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
            snapshot: true,
            transactional: true,
          },

          filters: {
            softDelete: {
              cond: (args, type, meta) => {
                // chỉ áp dụng nếu entity có trường deleted_at
                if (meta && meta.properties['deleted_at']) {
                  return { deleted_at: null };
                }
                return {};
              },
              default: true,
            },
          },

          synchronize: false,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
