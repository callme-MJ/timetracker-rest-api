import { Model } from 'mongoose';
import { Workday, WorkdayDocument } from './workday.schema';
export declare class TimeService {
    private readonly workdayModel;
    constructor(workdayModel: Model<WorkdayDocument>);
    private toDateKey;
    startDay(userId: string, when?: Date): Promise<import("mongoose").Document<unknown, {}, WorkdayDocument, {}, {}> & Workday & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    startBreak(userId: string, when?: Date): Promise<(import("mongoose").Document<unknown, {}, WorkdayDocument, {}, {}> & Workday & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    endBreak(userId: string, when?: Date): Promise<import("mongoose").Document<unknown, {}, WorkdayDocument, {}, {}> & Workday & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    endDay(userId: string, when?: Date): Promise<import("mongoose").Document<unknown, {}, WorkdayDocument, {}, {}> & Workday & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getWorkdaysForUser(userId: string, from?: string, to?: string, page?: number, limit?: number): Promise<{
        items: (import("mongoose").Document<unknown, {}, WorkdayDocument, {}, {}> & Workday & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
}
