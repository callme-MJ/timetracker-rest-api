import { TimeService } from './time.service';
export declare class TimeController {
    private readonly timeService;
    constructor(timeService: TimeService);
    start(req: any): Promise<import("mongoose").Document<unknown, {}, import("./workday.schema").WorkdayDocument, {}, {}> & import("./workday.schema").Workday & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    breakStart(req: any): Promise<(import("mongoose").Document<unknown, {}, import("./workday.schema").WorkdayDocument, {}, {}> & import("./workday.schema").Workday & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    breakEnd(req: any): Promise<import("mongoose").Document<unknown, {}, import("./workday.schema").WorkdayDocument, {}, {}> & import("./workday.schema").Workday & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    end(req: any): Promise<import("mongoose").Document<unknown, {}, import("./workday.schema").WorkdayDocument, {}, {}> & import("./workday.schema").Workday & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    myWorkdays(req: any, from?: string, to?: string, page?: string, limit?: string): Promise<{
        items: (import("mongoose").Document<unknown, {}, import("./workday.schema").WorkdayDocument, {}, {}> & import("./workday.schema").Workday & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    workdaysForUser(userId: string, from?: string, to?: string, page?: string, limit?: string): Promise<{
        items: (import("mongoose").Document<unknown, {}, import("./workday.schema").WorkdayDocument, {}, {}> & import("./workday.schema").Workday & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
}
