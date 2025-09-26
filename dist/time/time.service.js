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
exports.TimeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const workday_schema_1 = require("./workday.schema");
let TimeService = class TimeService {
    workdayModel;
    constructor(workdayModel) {
        this.workdayModel = workdayModel;
    }
    toDateKey(date) {
        return date.toISOString().slice(0, 10);
    }
    async startDay(userId, when = new Date()) {
        const uid = new mongoose_2.Types.ObjectId(userId);
        const dateKey = this.toDateKey(when);
        const existing = await this.workdayModel.findOne({ userId: uid, date: dateKey });
        if (existing && existing.startTime)
            throw new common_1.BadRequestException('Workday already started');
        if (existing) {
            existing.startTime = when;
            return existing.save();
        }
        const workday = new this.workdayModel({ userId: uid, date: dateKey, startTime: when, breaks: [] });
        return workday.save();
    }
    async startBreak(userId, when = new Date()) {
        const uid = new mongoose_2.Types.ObjectId(userId);
        const dateKey = this.toDateKey(when);
        const wd = await this.workdayModel.findOne({ userId: uid, date: dateKey });
        if (!wd || !wd.startTime)
            throw new common_1.BadRequestException('Workday not started');
        const openBreak = wd.breaks.find(b => b.end === undefined || b.end === null);
        if (openBreak)
            throw new common_1.BadRequestException('Break already in progress');
        return this.workdayModel.findOneAndUpdate({ userId: uid, date: dateKey }, { $push: { breaks: { start: when } } }, { new: true });
    }
    async endBreak(userId, when = new Date()) {
        const uid = new mongoose_2.Types.ObjectId(userId);
        const dateKey = this.toDateKey(when);
        const wd = await this.workdayModel.findOne({ userId: uid, date: dateKey });
        if (!wd)
            throw new common_1.BadRequestException('Workday not started');
        const openBreak = wd.breaks.find(b => b.end === undefined || b.end === null);
        if (!openBreak)
            throw new common_1.BadRequestException('No break in progress');
        const breakDuration = when.getTime() - new Date(openBreak.start).getTime();
        if (breakDuration < 1000) {
            throw new common_1.BadRequestException('Break must last at least 1 second');
        }
        openBreak.end = when;
        wd.markModified('breaks');
        wd.totalBreakTime += breakDuration;
        return wd.save();
    }
    async endDay(userId, when = new Date()) {
        const uid = new mongoose_2.Types.ObjectId(userId);
        const dateKey = this.toDateKey(when);
        const wd = await this.workdayModel.findOne({ userId: uid, date: dateKey });
        if (!wd || !wd.startTime)
            throw new common_1.BadRequestException('Workday not started');
        if (wd.endTime)
            throw new common_1.BadRequestException('Workday already ended');
        if (wd.breaks.some(b => b.end === undefined || b.end === null))
            throw new common_1.BadRequestException('A break is still in progress');
        wd.endTime = when;
        wd.totalWorkTime = when.getTime() - new Date(wd.startTime).getTime();
        return wd.save();
    }
    async getWorkdaysForUser(userId, from, to, page = 1, limit = 20) {
        const uid = new mongoose_2.Types.ObjectId(userId);
        const query = { userId: uid };
        if (from || to) {
            query.date = {};
            if (from)
                query.date.$gte = from;
            if (to)
                query.date.$lte = to;
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
};
exports.TimeService = TimeService;
exports.TimeService = TimeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(workday_schema_1.Workday.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TimeService);
//# sourceMappingURL=time.service.js.map