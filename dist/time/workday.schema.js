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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkdaySchema = exports.Workday = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Workday = class Workday {
    userId;
    date;
    startTime;
    endTime;
    breaks;
    totalBreakTime;
    totalWorkTime;
};
exports.Workday = Workday;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', index: true, required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Workday.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Workday.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Workday.prototype, "startTime", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Workday.prototype, "endTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [{
                start: { type: Date, required: true },
                end: { type: Date }
            }],
        default: []
    }),
    __metadata("design:type", Array)
], Workday.prototype, "breaks", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Workday.prototype, "totalBreakTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Workday.prototype, "totalWorkTime", void 0);
exports.Workday = Workday = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Workday);
exports.WorkdaySchema = mongoose_1.SchemaFactory.createForClass(Workday);
exports.WorkdaySchema.index({ userId: 1, date: 1 }, { unique: true });
//# sourceMappingURL=workday.schema.js.map