import {
  Controller,
  Post,
  Body,
  Headers,
  Req,
  BadRequestException,
} from '@nestjs/common';

import * as crypto from 'crypto';

import { PaymentsService } from './payments.service';
import { InitializePaymentDto } from './dto/initialize-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('initialize')
  initialize(
    @Body()
    body: InitializePaymentDto,
  ) {
    return this.paymentsService.initialize(
      body.amount,
      body.email,
      body.loanId,
    );
  }

  @Post('webhook')
  async webhook(
    @Req() req: any,
    @Headers('x-paystack-signature')
    signature: string,
  ) {
    const secret = process.env.PAYSTACK_SECRET || '';

    const hash = crypto
      .createHmac('sha512', secret)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (hash !== signature) {
      throw new BadRequestException('Invalid webhook signature');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const event = req.body;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (event.event === 'charge.success') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const reference = event.data.reference;

      await this.paymentsService.verify(reference);
    }

    return {
      received: true,
    };
  }
}
