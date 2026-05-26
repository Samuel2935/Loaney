import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../users/entities/user.entity';

export enum LoanStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  OVERDUE = 'OVERDUE',
  PAID = 'PAID',
}

@Entity()
export class Loan {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    example: 50000,
  })
  @Column('decimal')
  amount!: number;

  @ApiProperty({
    example: 12,
  })
  @Column()
  durationMonths!: number;

  @ApiProperty({
    example: 'Business expansion',
  })
  @Column()
  purpose!: string;

  @ApiProperty({
    enum: LoanStatus,
    example: LoanStatus.PENDING,
  })
  @Column({
    type: 'enum',
    enum: LoanStatus,
    default: LoanStatus.PENDING,
  })
  status!: LoanStatus;

  @ManyToOne(() => User)
  user!: User;

  @ApiProperty()
  @CreateDateColumn()
  createdAt!: Date;
  @ApiProperty()
  @Column()
  dueDate!: Date;
}
