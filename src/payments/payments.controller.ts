import {
  Controller,
  Post,
  Body,
  Headers,
  Req,
  BadRequestException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import type { Request } from 'express';
import * as crypto from 'crypto';

import { PaymentsService } from './payments.service';
import { InitializePaymentDto } from './dto/initialize-payment.dto';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiHeader,
} from '@nestjs/swagger';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('initialize')
  @ApiOperation({
    summary: 'Initialize Paystack payment',
    description:
      'Creates a Paystack payment transaction and returns authorization URL',
  })
  @ApiBody({
    type: InitializePaymentDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Payment initialized successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request payload',
  })
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
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Paystack webhook endpoint',
    description: 'Receives webhook events from Paystack',
  })
  @ApiHeader({
    name: 'x-paystack-signature',
    required: true,
    description: 'Paystack signature hash',
  })
  @ApiResponse({
    status: 200,
    description: 'Webhook received successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid webhook signature',
  })
  async webhook(
    @Req() req: Request,
    @Headers('x-paystack-signature')
    signature: string,
  ) {
    const secret = process.env.PAYSTACK_SECRET || '';

    const hash = crypto
      .createHmac('sha512', secret)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (hash !== signature) {
      throw new BadRequestException('Invalid webhook signature');
    }

    const event = req.body as {
      event: string;
      data: {
        reference: string;
      };
    };

    if (event.event === 'charge.success') {
      await this.paymentsService.verify(event.data.reference);
    }

    return {
      received: true,
    };
  }
}
