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
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { LoansService } from './loans.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateLoanDto } from './dto/create-loan.dto';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  // User requests loan
  @UseGuards(JwtAuthGuard)
  @Post()
  requestLoan(@Req() req: any, @Body() body: CreateLoanDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.loansService.create(req.user.id, body.amount);
  }

  // User gets all personal loans
  @UseGuards(JwtAuthGuard)
  @Get()
  getMyLoans(@Req() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.loansService.findByUserId(req.user.id);
  }

  // Get one loan
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getLoan(@Param('id') id: string) {
    return this.loansService.findOne(id);
  }

  // Admin approve loan
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id/approve')
  approveLoan(@Param('id') id: string) {
    return this.loansService.approveLoan(id);
  }

  // Admin reject loan
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id/reject')
  rejectLoan(@Param('id') id: string) {
    return this.loansService.rejectLoan(id);
  }
}
