import { Controller, Get, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ChartFilters } from '../charts/charts.controller';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getOrders(@Query() filters: ChartFilters) {
    return this.ordersService.getOrders(filters);
  }
} 