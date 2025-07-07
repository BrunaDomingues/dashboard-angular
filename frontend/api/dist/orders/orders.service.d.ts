import { ChartFilters } from '../charts/charts.controller';
export declare class OrdersService {
    private orders;
    getOrders(filters: ChartFilters): {
        data: {
            orderId: string;
            date: string;
            customer: string;
            status: string;
            amount: number;
            items: number;
            payment: string;
        }[];
        timeRange: {
            start: string;
            end: string;
        };
    };
}
