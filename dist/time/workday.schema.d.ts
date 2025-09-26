import { Document, Types } from 'mongoose';
export type WorkdayDocument = Workday & Document;
export declare class Workday {
    userId: Types.ObjectId;
    date: string;
    startTime?: Date;
    endTime?: Date;
    breaks: Array<{
        start: Date;
        end?: Date;
    }>;
    totalBreakTime: number;
    totalWorkTime: number;
}
export declare const WorkdaySchema: import("mongoose").Schema<Workday, import("mongoose").Model<Workday, any, any, any, Document<unknown, any, Workday, any, {}> & Workday & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Workday, Document<unknown, {}, import("mongoose").FlatRecord<Workday>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Workday> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
