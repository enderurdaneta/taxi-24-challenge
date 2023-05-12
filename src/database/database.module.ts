import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<any>('config.db.type'),
        host: configService.get<string>('config.db.host'),
        port: configService.get<number>('config.db.port'),
        username: configService.get<string>('config.db.username'),
        password: configService.get<string>('config.db.password'),
        database: configService.get<string>('config.db.name'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
        cli: {
          migrationsDir: 'src/database/migrations',
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
