import { UsersService } from './users.service';
import { UserRole } from './user.schema';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(body: {
        email: string;
        name: string;
        password: string;
        role?: UserRole;
    }): Promise<import("mongoose").Document<unknown, {}, import("./user.schema").UserDocument, {}, {}> & import("./user.schema").User & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    list(): Promise<(import("mongoose").Document<unknown, {}, import("./user.schema").UserDocument, {}, {}> & import("./user.schema").User & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    resetPassword(body: {
        userId: string;
        newPassword: string;
    }): Promise<{
        ok: boolean;
    }>;
    delete(id: string): Promise<{
        ok: boolean;
    }>;
}
