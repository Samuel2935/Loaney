import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({
    example: 'Samuel Dev',
    description: 'Full name of the user',
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  fullName!: string;

  @ApiProperty({
    example: 'samuel@mail.com',
    description: 'Unique email address',
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'password123',
    description: 'Minimum 6 characters',
    minLength: 6,
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @MinLength(6)
  password!: string;

  @ApiProperty({
    enum: UserRole,
    required: false,
    example: UserRole.USER,
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsEnum(UserRole)
  role?: UserRole;
}
