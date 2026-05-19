import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class InitializePaymentDto {
  @ApiProperty({
    example: 'samuel@mail.com',
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 5000,
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNumber()
  amount!: number;
  @ApiProperty({
    example: 'b7e5b4b2-70d7-4a48-b4ea-0f79df6d71e',
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  loanId!: string;
}
