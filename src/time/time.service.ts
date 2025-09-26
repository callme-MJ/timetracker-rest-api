import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Workday, WorkdayDocument } from './workday.schema';

@Injectable()
export class TimeService {
  constructor(
    @InjectModel(Workday.name) private readonly workdayModel: Model<WorkdayDocument>,
  ) {}

  private toDateKey(date: Date): string {
    return date.toISOString().slice(0, 10);
  }

  async startDay(userId: string, when: Date = new Date()) {
    const uid = new Types.ObjectId(userId);
    const dateKey = this.toDateKey(when);
    const existing = await this.workdayModel.findOne({ userId: uid, date: dateKey });
    if (existing && existing.startTime) throw new BadRequestException('Workday already started');
    if (existing) {
      existing.startTime = when;
      return existing.save();
    }
    const workday = new this.workdayModel({ userId: uid, date: dateKey, startTime: when, breaks: [] });
    return workday.save();
  }

  // async startBreak(userId: string, when: Date = new Date()) {
  //   const uid = new Types.ObjectId(userId);
  //   const dateKey = this.toDateKey(when);
  //   const wd = await this.workdayModel.findOne({ userId: uid, date: dateKey });
    
  //   if (!wd || !wd.startTime) throw new BadRequestException('Workday not started');
  //   console.log('All breaks:', wd.breaks);
    
  //   // More explicit check for open breaks
  //   const openBreak = wd.breaks.find(b => b.end === undefined || b.end === null);
  //   console.log('Open break found:', openBreak);
    
    
  //   if (openBreak) throw new BadRequestException('Break already in progress');
    
  //   wd.breaks.push({ start: when });
  //   wd.markModified('breaks');
    
  //   return wd.save();
  // }

  async startBreak(userId: string, when: Date = new Date()) {
    const uid = new Types.ObjectId(userId);
    const dateKey = this.toDateKey(when);
    
    const wd = await this.workdayModel.findOne({ userId: uid, date: dateKey });
    if (!wd || !wd.startTime) throw new BadRequestException('Workday not started');
    
    const openBreak = wd.breaks.find(b => b.end === undefined || b.end === null);
    if (openBreak) throw new BadRequestException('Break already in progress');
    
    // Use MongoDB $push operator instead
    return this.workdayModel.findOneAndUpdate(
        { userId: uid, date: dateKey },
        { $push: { breaks: { start: when } } },
        { new: true }
    );
}

  async endBreak(userId: string, when: Date = new Date()) {
    const uid = new Types.ObjectId(userId);
    const dateKey = this.toDateKey(when);
    const wd = await this.workdayModel.findOne({ userId: uid, date: dateKey });
    
    if (!wd) throw new BadRequestException('Workday not started');
    const openBreak = wd.breaks.find(b => b.end === undefined || b.end === null);
    
    if (!openBreak) throw new BadRequestException('No break in progress');
    
    // Prevent ending break immediately after starting
    const breakDuration = when.getTime() - new Date(openBreak.start).getTime();
    if (breakDuration < 1000) { // Less than 1 second
      throw new BadRequestException('Break must last at least 1 second');
    }
    
    openBreak.end = when;
    wd.markModified('breaks');
    
    // Update total break time
    wd.totalBreakTime += breakDuration;
    
    return wd.save();
  }

  async endDay(userId: string, when: Date = new Date()) {
    const uid = new Types.ObjectId(userId);
    const dateKey = this.toDateKey(when);
    const wd = await this.workdayModel.findOne({ userId: uid, date: dateKey });
    if (!wd || !wd.startTime) throw new BadRequestException('Workday not started');
    if (wd.endTime) throw new BadRequestException('Workday already ended');
    if (wd.breaks.some(b => b.end === undefined || b.end === null)) throw new BadRequestException('A break is still in progress');
    
    wd.endTime = when;
    
    // Calculate total work time (from start to end, including break time)
    wd.totalWorkTime = when.getTime() - new Date(wd.startTime).getTime();
    
    return wd.save();
  }

  async getWorkdaysForUser(
    userId: string,
    from?: string,
    to?: string,
    page: number = 1,
    limit: number = 20,
  ) {
    const uid = new Types.ObjectId(userId);
    const query: any = { userId: uid };
    if (from || to) {
      query.date = {};
      if (from) query.date.$gte = from;
      if (to) query.date.$lte = to;
    }
    const skip = Math.max(0, (Number(page) - 1) * Number(limit));
    const [items, total] = await Promise.all([
      this.workdayModel
        .find(query)
        .sort({ date: -1 })
        .skip(skip)
        .limit(Number(limit))
        .exec(),
      this.workdayModel.countDocuments(query).exec(),
    ]);
    return { items, total, page: Number(page), limit: Number(limit) };
  }
}
