import * as dotenv from 'dotenv';
dotenv.config();

import { DataSource } from 'typeorm';

export const getTypeOrmConfig = () => ({
  type: 'postgres' as const,

  host: process.env.DB_HOST,

  port: Number(process.env.DB_PORT),

  username: process.env.DB_USER,

  password: process.env.DB_PASS,

  database: process.env.DB_NAME,

  entities: ['dist/**/*.entity.js'],

  migrations: ['dist/database/migrations/*.js'],

  synchronize: true,
});

export const AppDataSource = new DataSource({
  type: 'postgres',

  host: process.env.DB_HOST,

  port: Number(process.env.DB_PORT),

  username: process.env.DB_USER,

  password: process.env.DB_PASS,

  database: process.env.DB_NAME,

  entities: ['src/**/*.entity.ts'],

  migrations: ['src/database/migrations/*.ts'],

  synchronize: true,
});
