import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { TimeService } from './time.service';

@UseGuards(JwtAuthGuard)
@Controller('time')
export class TimeController {
  constructor(private readonly timeService: TimeService) {}

  @Post('start')
  async start(@Req() req: any) {
    return this.timeService.startDay(req.user.userId);
  }

  @Post('break/start')
  async breakStart(@Req() req: any) {
    return this.timeService.startBreak(req.user.userId);
  }

  @Post('break/end')
  async breakEnd(@Req() req: any) {
    return this.timeService.endBreak(req.user.userId);
  }

  @Post('end')
  async end(@Req() req: any) {
    return this.timeService.endDay(req.user.userId);
  }

  @Get('me')
  async myWorkdays(
    @Req() req: any,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.timeService.getWorkdaysForUser(req.user.userId, from, to, Number(page ?? 1), Number(limit ?? 20));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('admin/user')
  async workdaysForUser(
    @Query('userId') userId: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.timeService.getWorkdaysForUser(userId, from, to, Number(page ?? 1), Number(limit ?? 20));
  }
}
