import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { LoansService } from '../loans/loans.service';

@Injectable()
export class JobsService {
  constructor(private readonly loansService: LoansService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleLatePayments() {
    const overdueLoans = await this.loansService.findOverdueLoans();

    for (const loan of overdueLoans) {
      await this.loansService.markAsOverdue(loan.id);
    }

    console.log(`Marked ${overdueLoans.length} loans as overdue`);
  }
}
