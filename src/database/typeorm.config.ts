import { TypeOrmModuleOptions } from '@nestjs/typeorm';

console.log('DB DEBUG:', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Coldpath@2935',
  database: 'users',
  autoLoadEntities: true,
  synchronize: true,
};
