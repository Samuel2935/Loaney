import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';

import { Request } from 'express';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { LoansService } from './loans.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateLoanDto } from './dto/create-loan.dto';

@ApiTags('Loans')
@ApiBearerAuth()
@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  // User requests loan
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({
    summary: 'Request a loan',
    description: 'Authenticated users can create a new loan request',
  })
  @ApiBody({
    type: CreateLoanDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Loan request created successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  requestLoan(@Req() req, @Body() body: CreateLoanDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.loansService.create(req.user.id, body);
  }

  // User gets all personal loans
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({
    summary: 'Get my loans',
    description: 'Returns all loans belonging to authenticated user',
  })
  @ApiResponse({
    status: 200,
    description: 'Loans retrieved successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  getMyLoans(@Req() req: Request & { user: { id: string } }) {
    return this.loansService.findByUserId(req.user.id);
  }

  // Get one loan
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({
    summary: 'Get loan by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Loan ID',
    example: 'uuid-here',
  })
  @ApiResponse({
    status: 200,
    description: 'Loan retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Loan not found',
  })
  getLoan(
    @Param('id')
    id: string,
  ) {
    return this.loansService.findOne(id);
  }

  // Admin approve loan
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id/approve')
  @ApiOperation({
    summary: 'Approve loan',
    description: 'Admin endpoint for approving loan requests',
  })
  @ApiParam({
    name: 'id',
    description: 'Loan ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Loan approved successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  approveLoan(
    @Param('id')
    id: string,
  ) {
    return this.loansService.approveLoan(id);
  }

  // Admin reject loan
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id/reject')
  @ApiOperation({
    summary: 'Reject loan',
    description: 'Admin endpoint for rejecting loan requests',
  })
  @ApiParam({
    name: 'id',
    description: 'Loan ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Loan rejected successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  rejectLoan(
    @Param('id')
    id: string,
  ) {
    return this.loansService.rejectLoan(id);
  }
}
