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
exports.AdminExportController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../auth/jwt.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const time_service_1 = require("./time.service");
let AdminExportController = class AdminExportController {
    timeService;
    constructor(timeService) {
        this.timeService = timeService;
    }
    async exportUser(userId, from, to, res) {
        const { items } = await this.timeService.getWorkdaysForUser(userId, from, to, 1, 10000);
        const headers = ['date', 'startTime', 'endTime', 'breaks'];
        const rows = items.map((w) => {
            const breaks = (w.breaks || [])
                .map((b) => `${new Date(b.start).toISOString()}-${b.end ? new Date(b.end).toISOString() : ''}`)
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
};
exports.AdminExportController = AdminExportController;
__decorate([
    (0, common_1.Get)('user'),
    (0, common_1.Header)('Content-Type', 'text/csv'),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Query)('from')),
    __param(2, (0, common_1.Query)('to')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], AdminExportController.prototype, "exportUser", null);
exports.AdminExportController = AdminExportController = __decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Controller)('time/admin/export'),
    __metadata("design:paramtypes", [time_service_1.TimeService])
], AdminExportController);
//# sourceMappingURL=admin.export.controller.js.map