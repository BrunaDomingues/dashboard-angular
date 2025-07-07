import { ChartFilters } from './charts.controller';
export declare class ChartsService {
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
