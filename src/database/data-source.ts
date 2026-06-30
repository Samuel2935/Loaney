import * as dotenv from 'dotenv';
dotenv.config();

import { DataSource } from 'typeorm';

const isProduction = process.env.NODE_ENV === 'production';

export const getTypeOrmConfig = () => ({
  type: 'postgres' as const,

  url: process.env.DATABASE_URL,

  ssl: isProduction
    ? {
        rejectUnauthorized: false,
      }
    : false,

  entities: ['dist/**/*.entity.js'],

  migrations: ['dist/database/migrations/*.js'],

  synchronize: false,
});

export const AppDataSource = new DataSource({
  type: 'postgres',

  url: process.env.DATABASE_URL,

  ssl: isProduction
    ? {
        rejectUnauthorized: false,
      }
    : false,

  entities: ['src/**/*.entity.ts'],

  migrations: ['src/database/migrations/*.ts'],

  synchronize: false,
});
