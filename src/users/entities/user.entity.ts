import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Entity()
export class User {
  @ApiProperty({
    example: 'b7e5b4b2-70d7-4a48-b4ea-0f79df6d71e',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    example: 'Samuel Dev',
  })
  @Column()
  fullName!: string;

  @ApiProperty({
    example: 'samuel@mail.com',
  })
  @Column({ unique: true })
  email!: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Exclude()
  @Column()
  password!: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.USER,
  })
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role!: UserRole;

  @ApiProperty()
  @CreateDateColumn()
  createdAt!: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt!: Date;
}
