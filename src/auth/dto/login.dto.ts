import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'samuel@mail.com',
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'password123',
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @MinLength(6)
  password!: string;
}
