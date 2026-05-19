import { Body, Controller, Get, Post } from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new user account',
  })
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiCreatedResponse({
    description: 'User created successfully',
  })
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto.fullName, dto.email, dto.password);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all users',
  })
  @ApiOkResponse({
    description: 'Users fetched successfully',
  })
  findAll() {
    return this.usersService.findAll();
  }
}
