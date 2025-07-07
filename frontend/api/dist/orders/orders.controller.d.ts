import { OrdersService } from './orders.service';
import { ChartFilters } from '../charts/charts.controller';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
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
