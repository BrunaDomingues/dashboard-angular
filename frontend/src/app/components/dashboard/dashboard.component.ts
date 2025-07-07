import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.updateFilters({
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      categories: [],
      statuses: [],
      paymentMethods: [],
      minAmount: undefined,
      maxAmount: undefined
    });
  }
} 