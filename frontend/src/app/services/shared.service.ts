import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface DashboardFilters {
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

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private filtersSubject = new BehaviorSubject<DashboardFilters>({
    startDate: '',
    endDate: ''
  });

  public filters$ = this.filtersSubject.asObservable();

  constructor() { }

  updateFilters(filters: DashboardFilters): void {
    this.filtersSubject.next(filters);
  }

  getCurrentFilters(): DashboardFilters {
    return this.filtersSubject.value;
  }
} 