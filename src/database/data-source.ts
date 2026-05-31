// import * as dotenv from 'dotenv';
// dotenv.config();

// import { DataSource } from 'typeorm';

// export const getTypeOrmConfig = () => ({
//   type: 'postgres' as const,

//   host: process.env.DB_HOST,

//   port: Number(process.env.DB_PORT),

//   username: process.env.DB_USER,

//   password: process.env.DB_PASS,

//   database: process.env.DB_NAME,

//   entities: ['dist/**/*.entity.js'],

//   migrations: ['dist/database/migrations/*.js'],

//   synchronize: false,
// });

// export const AppDataSource = new DataSource({
//   type: 'postgres',

//   host: process.env.DB_HOST,

//   port: Number(process.env.DB_PORT),

//   username: process.env.DB_USER,

//   password: process.env.DB_PASS,

//   database: process.env.DB_NAME,

//   entities: ['src/**/*.entity.ts'],

//   migrations: ['src/database/migrations/*.ts'],

//   synchronize: false,
// });
import * as dotenv from 'dotenv';
dotenv.config();

import { DataSource } from 'typeorm';

export const getTypeOrmConfig = () => ({
  type: 'postgres' as const,

  url: process.env.DATABASE_URL,

  ssl:
    process.env.NODE_ENV === 'production'
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

  ssl:
    process.env.NODE_ENV === 'production'
      ? {
          rejectUnauthorized: false,
        }
      : false,

  entities: ['src/**/*.entity.ts'],

  migrations: ['src/database/migrations/*.ts'],

  synchronize: false,
});
