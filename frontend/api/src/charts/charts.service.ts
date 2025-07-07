import { Injectable } from '@nestjs/common';
import { ChartFilters } from './charts.controller';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ChartsService {
  getSalesByCategory(filters: ChartFilters) {
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

  getSalesTrend(filters: ChartFilters) {
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

  getPerformanceMetrics(filters: ChartFilters) {
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

  getTrafficChannels(filters: ChartFilters) {
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
      } else {
        acc.push({
          channel: item.channel,
          visits: item.visits,
          conversions: item.conversions
        });
      }
      return acc;
    }, [] as Array<{channel: string, visits: number, conversions: number}>);

    return {
      data: aggregatedData,
      timeRange: {
        start: filters.startDate || 'Todos os dados',
        end: filters.endDate || 'Todos os dados'
      }
    };
  }
} 