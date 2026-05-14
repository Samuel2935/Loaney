import { Injectable, BadRequestException } from '@nestjs/common';
import axios from 'axios';
import { LoansService } from '../loans/loans.service';

@Injectable()
export class PaymentsService {
  constructor(private readonly loansService: LoansService) {}

  async initialize(amount: number, email: string, loanId: string) {
    try {
      const response = await axios.post(
        'https://api.paystack.co/transaction/initialize',
        {
          amount: amount * 100,
          email,
          metadata: {
            loanId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
            'Content-Type': 'application/json',
          },
        },
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return response.data;
    } catch {
      throw new BadRequestException('Payment initialization failed');
    }
  }

  async verify(reference: string) {
    try {
      const response = await axios.get(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
          },
        },
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const paymentData = response.data.data;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (paymentData.status === 'success') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const loanId = paymentData.metadata.loanId;

        await this.loansService.markAsPaid(loanId);
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return response.data;
    } catch {
      throw new BadRequestException('Payment verification failed');
    }
  }
}
