import { IsNumber, Min } from 'class-validator';

export class CreateLoanDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNumber()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Min(1000)
  amount!: number;
}
