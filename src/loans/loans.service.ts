import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Loan, LoanStatus } from './entities/loan.entity';

import { User } from '../users/entities/user.entity';

@Injectable()
export class LoansService {
  constructor(
    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userId: string, amount: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const loan = this.loanRepository.create({
      amount,
      status: LoanStatus.PENDING,
      user,
    });

    await this.loanRepository.save(loan);

    return {
      message: 'Loan request submitted',
      loan,
    };
  }

  async findByUserId(userId: string) {
    return this.loanRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['user'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string) {
    const loan = await this.loanRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!loan) {
      throw new NotFoundException('Loan not found');
    }

    return loan;
  }

  async approveLoan(id: string) {
    const loan = await this.findOne(id);

    loan.status = LoanStatus.APPROVED;

    await this.loanRepository.save(loan);

    return {
      message: 'Loan approved successfully',
      loan,
    };
  }

  async rejectLoan(id: string) {
    const loan = await this.findOne(id);

    loan.status = LoanStatus.REJECTED;

    await this.loanRepository.save(loan);

    return {
      message: 'Loan rejected',
      loan,
    };
  }
}
