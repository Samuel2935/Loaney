import 'dotenv/config';
import { DataSource } from 'typeorm';

import { User } from '../users/entities/user.entity';
import { Loan } from '../loans/entities/loan.entity';

export default new DataSource({
  type: 'postgres',

  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,

  entities: [User, Loan],

  migrations: ['src/database/migrations/*.ts'],

  synchronize: false,
});
