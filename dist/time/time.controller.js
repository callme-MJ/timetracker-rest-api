"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../auth/jwt.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const time_service_1 = require("./time.service");
let TimeController = class TimeController {
    timeService;
    constructor(timeService) {
        this.timeService = timeService;
    }
    async start(req) {
        return this.timeService.startDay(req.user.userId);
    }
    async breakStart(req) {
        return this.timeService.startBreak(req.user.userId);
    }
    async breakEnd(req) {
        return this.timeService.endBreak(req.user.userId);
    }
    async end(req) {
        return this.timeService.endDay(req.user.userId);
    }
    async myWorkdays(req, from, to, page, limit) {
        return this.timeService.getWorkdaysForUser(req.user.userId, from, to, Number(page ?? 1), Number(limit ?? 20));
    }
    async workdaysForUser(userId, from, to, page, limit) {
        return this.timeService.getWorkdaysForUser(userId, from, to, Number(page ?? 1), Number(limit ?? 20));
    }
};
exports.TimeController = TimeController;
__decorate([
    (0, common_1.Post)('start'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TimeController.prototype, "start", null);
__decorate([
    (0, common_1.Post)('break/start'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TimeController.prototype, "breakStart", null);
__decorate([
    (0, common_1.Post)('break/end'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TimeController.prototype, "breakEnd", null);
__decorate([
    (0, common_1.Post)('end'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TimeController.prototype, "end", null);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('from')),
    __param(2, (0, common_1.Query)('to')),
    __param(3, (0, common_1.Query)('page')),
    __param(4, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String]),
    __metadata("design:returntype", Promise)
], TimeController.prototype, "myWorkdays", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Get)('admin/user'),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Query)('from')),
    __param(2, (0, common_1.Query)('to')),
    __param(3, (0, common_1.Query)('page')),
    __param(4, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], TimeController.prototype, "workdaysForUser", null);
exports.TimeController = TimeController = __decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('time'),
    __metadata("design:paramtypes", [time_service_1.TimeService])
], TimeController);
//# sourceMappingURL=time.controller.js.map