import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Loan, LoanStatus } from './entities/loan.entity';

import { User } from '../users/entities/user.entity';
import { CreateLoanDto } from './dto/create-loan.dto';

@Injectable()
export class LoansService {
  constructor(
    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userId: string, body: CreateLoanDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) throw new NotFoundException('User not found');

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + body.durationMonths * 30);

    const loan = this.loanRepository.create({
      amount: body.amount,
      durationMonths: body.durationMonths,
      purpose: body.purpose,
      status: LoanStatus.PENDING,
      user,
      dueDate,
    });

    await this.loanRepository.save(loan);

    return {
      message: 'Loan request submitted',
      loan,
    };
  }

  //   loan overdue query
  async findOverdueLoans() {
    return this.loanRepository
      .createQueryBuilder('loan')
      .where('loan.status = :status', {
        status: LoanStatus.APPROVED,
      })
      .andWhere('loan.dueDate < :today', {
        today: new Date(),
      })
      .getMany();
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

  async markAsOverdue(id: string) {
    const loan = await this.findOne(id);

    loan.status = LoanStatus.OVERDUE;

    await this.loanRepository.save(loan);

    return loan;
  }

  async markAsPaid(id: string) {
    const loan = await this.findOne(id);

    loan.status = LoanStatus.PAID;

    await this.loanRepository.save(loan);

    return loan;
  }
}
