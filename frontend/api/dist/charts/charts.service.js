"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartsService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
let ChartsService = class ChartsService {
    getSalesByCategory(filters) {
        const filePath = path.join(process.cwd(), 'src/charts/sales-by-category.mock.json');
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(rawData);
        return {
            data,
            timeRange: {
                start: filters.startDate,
                end: filters.endDate
            }
        };
    }
    getSalesTrend(filters) {
        const filePath = path.join(process.cwd(), 'src/charts/sales-trend.mock.json');
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(rawData);
        return {
            data,
            timeRange: {
                start: filters.startDate,
                end: filters.endDate
            }
        };
    }
    getPerformanceMetrics(filters) {
        const filePath = path.join(process.cwd(), 'src/charts/performance-metrics.mock.json');
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(rawData);
        return {
            data,
            timeRange: {
                start: filters.startDate,
                end: filters.endDate
            }
        };
    }
    getTrafficChannels(filters) {
        const filePath = path.join(process.cwd(), 'src/charts/traffic-channels.mock.json');
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const dailyData = JSON.parse(rawData);
        let filteredData = dailyData;
        if (filters.startDate && filters.endDate) {
            filteredData = dailyData.filter(item => {
                const itemDate = new Date(item.date);
                const startDate = new Date(filters.startDate);
                const endDate = new Date(filters.endDate);
                return itemDate >= startDate && itemDate <= endDate;
            });
        }
        const aggregatedData = filteredData.reduce((acc, item) => {
            const existing = acc.find(d => d.channel === item.channel);
            if (existing) {
                existing.visits += item.visits;
                existing.conversions += item.conversions;
            }
            else {
                acc.push({
                    channel: item.channel,
                    visits: item.visits,
                    conversions: item.conversions
                });
            }
            return acc;
        }, []);
        return {
            data: aggregatedData,
            timeRange: {
                start: filters.startDate || 'Todos os dados',
                end: filters.endDate || 'Todos os dados'
            }
        };
    }
};
exports.ChartsService = ChartsService;
exports.ChartsService = ChartsService = __decorate([
    (0, common_1.Injectable)()
], ChartsService);
//# sourceMappingURL=charts.service.js.map