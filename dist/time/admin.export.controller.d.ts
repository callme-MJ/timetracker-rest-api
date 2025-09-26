import { Response } from 'express';
import { TimeService } from './time.service';
export declare class AdminExportController {
    private readonly timeService;
    constructor(timeService: TimeService);
    exportUser(userId: string, from: string, to: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
