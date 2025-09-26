import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeService } from './time/time.service';
import { TimeController } from './time/time.controller';
import { AdminExportController } from './time/admin.export.controller';
import { Workday, WorkdaySchema } from './time/workday.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Workday.name, schema: WorkdaySchema },
    ]),
  ],
  controllers: [TimeController, AdminExportController],
  providers: [TimeService],
  exports: [TimeService],
})
export class TimeModule {}
