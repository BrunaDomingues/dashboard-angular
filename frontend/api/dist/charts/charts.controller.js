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
exports.ChartsController = void 0;
const common_1 = require("@nestjs/common");
const charts_service_1 = require("./charts.service");
let ChartsController = class ChartsController {
    chartsService;
    constructor(chartsService) {
        this.chartsService = chartsService;
    }
    getSalesByCategory(filters) {
        return this.chartsService.getSalesByCategory(filters);
    }
    getSalesTrend(filters) {
        return this.chartsService.getSalesTrend(filters);
    }
    getPerformanceMetrics(filters) {
        return this.chartsService.getPerformanceMetrics(filters);
    }
    getTrafficChannels(filters) {
        return this.chartsService.getTrafficChannels(filters);
    }
};
exports.ChartsController = ChartsController;
__decorate([
    (0, common_1.Get)('sales-by-category'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChartsController.prototype, "getSalesByCategory", null);
__decorate([
    (0, common_1.Get)('sales-trend'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChartsController.prototype, "getSalesTrend", null);
__decorate([
    (0, common_1.Get)('performance-metrics'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChartsController.prototype, "getPerformanceMetrics", null);
__decorate([
    (0, common_1.Get)('traffic-channels'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChartsController.prototype, "getTrafficChannels", null);
exports.ChartsController = ChartsController = __decorate([
    (0, common_1.Controller)('api/charts'),
    __metadata("design:paramtypes", [charts_service_1.ChartsService])
], ChartsController);
//# sourceMappingURL=charts.controller.js.map