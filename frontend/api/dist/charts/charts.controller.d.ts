import { ChartsService } from './charts.service';
export interface ChartFilters {
    startDate: string;
    endDate: string;
    startTime?: string;
    endTime?: string;
    categories?: string[];
    statuses?: string[];
    paymentMethods?: string[];
    minAmount?: number;
    maxAmount?: number;
}
export declare class ChartsController {
    private readonly chartsService;
    constructor(chartsService: ChartsService);
    getSalesByCategory(filters: ChartFilters): {
        data: any;
        timeRange: {
            start: string;
            end: string;
        };
    };
    getSalesTrend(filters: ChartFilters): {
        data: any;
        timeRange: {
            start: string;
            end: string;
        };
    };
    getPerformanceMetrics(filters: ChartFilters): {
        data: any;
        timeRange: {
            start: string;
            end: string;
        };
    };
    getTrafficChannels(filters: ChartFilters): {
        data: any;
        timeRange: {
            start: string;
            end: string;
        };
    };
}
