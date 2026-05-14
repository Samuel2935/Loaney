import { IsEmail, IsNumber, Min } from 'class-validator';

export class InitializePaymentDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNumber()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Min(100)
  amount!: number;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsEmail()
  email!: string;

  loanId!: string;
}
