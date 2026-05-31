// import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

console.log('DB DEBUG:', {
  databaseUrlExists: !!process.env.DATABASE_URL,
  nodeEnv: process.env.NODE_ENV,
});

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',

  url: process.env.DATABASE_URL,

  ssl:
    process.env.NODE_ENV === 'production'
      ? {
          rejectUnauthorized: false,
        }
      : false,

  autoLoadEntities: true,

  synchronize: false,
};
