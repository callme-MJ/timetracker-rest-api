import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type WorkdayDocument = Workday & Document;

@Schema({ timestamps: true })
export class Workday {
  @Prop({ type: Types.ObjectId, ref: 'User', index: true, required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  date: string;

  @Prop()
  startTime?: Date;

  @Prop()
  endTime?: Date;

  @Prop({
    type: [{
      start: { type: Date, required: true },
      end: { type: Date }
    }],
    default: []
  })
  breaks: Array<{
    start: Date;
    end?: Date;
  }>;

  @Prop({ default: 0 })
  totalBreakTime: number; // in milliseconds

  @Prop({ default: 0 })
  totalWorkTime: number; // in milliseconds
}

export const WorkdaySchema = SchemaFactory.createForClass(Workday);
WorkdaySchema.index({ userId: 1, date: 1 }, { unique: true });