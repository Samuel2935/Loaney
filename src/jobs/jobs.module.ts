import { Module } from '@nestjs/common';

import { JobsService } from './jobs.service';
import { LoansModule } from '../loans/loans.module';

@Module({
  imports: [LoansModule],
  providers: [JobsService],
})
export class JobsModule {}
