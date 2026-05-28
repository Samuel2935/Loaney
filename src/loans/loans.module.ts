import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';

import { Loan } from './entities/loan.entity';
import { Users } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Loan, Users])],
  controllers: [LoansController],
  providers: [LoansService],
  exports: [LoansService],
})
export class LoansModule {}
