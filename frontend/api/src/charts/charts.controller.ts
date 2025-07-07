import { Controller, Get, Query } from '@nestjs/common';
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

@Controller('api/charts')
export class ChartsController {
  constructor(private readonly chartsService: ChartsService) {}

  @Get('sales-by-category')
  getSalesByCategory(@Query() filters: ChartFilters) {
    return this.chartsService.getSalesByCategory(filters);
  }

  @Get('sales-trend')
  getSalesTrend(@Query() filters: ChartFilters) {
    return this.chartsService.getSalesTrend(filters);
  }

  @Get('performance-metrics')
  getPerformanceMetrics(@Query() filters: ChartFilters) {
    return this.chartsService.getPerformanceMetrics(filters);
  }

  @Get('traffic-channels')
  getTrafficChannels(@Query() filters: ChartFilters) {
    return this.chartsService.getTrafficChannels(filters);
  }
} 