import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LOCALE_ID } from '@angular/core';

import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FilterComponent } from './components/filter/filter.component';
import { SalesByCategoryComponent } from './components/charts/sales-by-category/sales-by-category.component';
import { SalesTrendComponent } from './components/charts/sales-trend/sales-trend.component';
import { PerformanceMetricsComponent } from './components/charts/performance-metrics/performance-metrics.component';
import { TrafficChannelsComponent } from './components/charts/traffic-channels/traffic-channels.component';
import { OrdersTableComponent } from './components/orders-table/orders-table.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FilterComponent,
    SalesByCategoryComponent,
    SalesTrendComponent,
    PerformanceMetricsComponent,
    TrafficChannelsComponent,
    OrdersTableComponent,
    ThemeToggleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgChartsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
