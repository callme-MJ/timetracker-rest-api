import { Controller, Get, Header, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { TimeService } from './time.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('time/admin/export')
export class AdminExportController {
  constructor(private readonly timeService: TimeService) {}

  @Get('user')
  @Header('Content-Type', 'text/csv')
  async exportUser(
    @Query('userId') userId: string,
    @Query('from') from: string,
    @Query('to') to: string,
    @Res() res: Response,
  ) {
    const { items } = await this.timeService.getWorkdaysForUser(userId, from, to, 1, 10000);
    const headers = ['date', 'startTime', 'endTime', 'breaks'];
    const rows = items.map((w: any) => {
      const breaks = (w.breaks || [])
        .map((b: any) => `${new Date(b.start).toISOString()}-${b.end ? new Date(b.end).toISOString() : ''}`)
        .join('|');
      return [
        w.date,
        w.startTime ? new Date(w.startTime).toISOString() : '',
        w.endTime ? new Date(w.endTime).toISOString() : '',
        breaks,
      ];
    });
    const csv = [headers.join(','), ...rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','))].join('\n');
    res.setHeader('Content-Disposition', `attachment; filename="workdays_${userId}.csv"`);
    return res.send(csv);
  }
}


