import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class CreateLoanDto {
  @ApiProperty({
    example: 5000,
    description: 'Requested loan amount',
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNumber()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsPositive()
  amount!: number;

  @ApiProperty({
    example: 12,
    description: 'Loan duration in months',
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNumber()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Min(6)
  durationMonths!: number;

  @ApiProperty({
    example: 'Business expansion',
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  purpose!: string;
}
