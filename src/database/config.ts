import { DataSource, DataSourceOptions } from 'typeorm';
import { cwd, env } from 'process';
import { config } from 'dotenv';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: env.DATABASE_TYPE as any,
  host: env.DATABASE_HOST,
  port: +env.DATABASE_PORT,
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  logging: env.DATABASE_LOG === 'true',
  timezone: 'Z',
  synchronize: false,
  entities: [cwd() + '/**/*.entity.ts'],
  migrations: [cwd() + '/migrations/*.ts'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
