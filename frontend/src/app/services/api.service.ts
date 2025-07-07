import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardFilters } from './shared.service';

export interface SalesByCategory {
  category: string;
  sales: number;
  items: number;
}

export interface SalesTrend {
  date: string;
  sales: number;
  orders: number;
}

export interface PerformanceMetric {
  metric: string;
  value: number;
  target: number;
}

export interface TrafficChannel {
  channel: string;
  visits: number;
  conversions: number;
}

export interface Order {
  orderId: string;
  date: string;
  customer: string;
  status: string;
  amount: number;
  items: number;
  payment: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3001/api';

  constructor(private http: HttpClient) { }

  private buildParams(filters: DashboardFilters): HttpParams {
    let params = new HttpParams();
    if (filters.startDate) {
      params = params.set('startDate', filters.startDate);
    }
    if (filters.endDate) {
      params = params.set('endDate', filters.endDate);
    }
    if (filters.startTime) {
      params = params.set('startTime', filters.startTime);
    }
    if (filters.endTime) {
      params = params.set('endTime', filters.endTime);
    }
    if (filters.categories && filters.categories.length > 0) {
      filters.categories.forEach(category => {
        params = params.append('categories', category);
      });
    }
    if (filters.statuses && filters.statuses.length > 0) {
      filters.statuses.forEach(status => {
        params = params.append('statuses', status);
      });
    }
    if (filters.paymentMethods && filters.paymentMethods.length > 0) {
      filters.paymentMethods.forEach(method => {
        params = params.append('paymentMethods', method);
      });
    }
    if (filters.minAmount) {
      params = params.set('minAmount', filters.minAmount.toString());
    }
    if (filters.maxAmount) {
      params = params.set('maxAmount', filters.maxAmount.toString());
    }
    return params;
  }

  getSalesByCategory(filters: DashboardFilters): Observable<{data: SalesByCategory[], timeRange: any}> {
    const params = this.buildParams(filters);
    return this.http.get<{data: SalesByCategory[], timeRange: any}>(`${this.baseUrl}/charts/sales-by-category`, { params });
  }

  getSalesTrend(filters: DashboardFilters): Observable<{data: SalesTrend[], timeRange: any}> {
    const params = this.buildParams(filters);
    return this.http.get<{data: SalesTrend[], timeRange: any}>(`${this.baseUrl}/charts/sales-trend`, { params });
  }

  getPerformanceMetrics(filters: DashboardFilters): Observable<{data: PerformanceMetric[], timeRange: any}> {
    const params = this.buildParams(filters);
    return this.http.get<{data: PerformanceMetric[], timeRange: any}>(`${this.baseUrl}/charts/performance-metrics`, { params });
  }

  getTrafficChannels(filters: DashboardFilters): Observable<{data: TrafficChannel[], timeRange: any}> {
    const params = this.buildParams(filters);
    return this.http.get<{data: TrafficChannel[], timeRange: any}>(`${this.baseUrl}/charts/traffic-channels`, { params });
  }

  getOrders(filters: DashboardFilters): Observable<{data: Order[], timeRange: any}> {
    const params = this.buildParams(filters);
    return this.http.get<{data: Order[], timeRange: any}>(`${this.baseUrl}/orders`, { params });
  }
} 