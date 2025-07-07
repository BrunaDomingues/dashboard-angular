import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { SharedService, DashboardFilters } from '../../../services/shared.service';
import { ApiService, PerformanceMetric } from '../../../services/api.service';
import { ThemeService, Theme } from '../../../services/theme.service';

@Component({
  selector: 'app-performance-metrics',
  templateUrl: './performance-metrics.component.html',
  styleUrls: ['./performance-metrics.component.scss']
})
export class PerformanceMetricsComponent implements OnInit, OnDestroy {
  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Métricas de Desempenho'
      }
    }
  };

  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Valor Atual',
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  private subscription: Subscription = new Subscription();
  loading = false;
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  menuOpen = false;
  isDarkMode = false;

  constructor(
    private sharedService: SharedService,
    private apiService: ApiService,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.sharedService.filters$.subscribe(filters => {
        this.loadData(filters);
      })
    );

    this.subscription.add(
      this.themeService.theme$.subscribe(theme => {
        this.isDarkMode = theme === 'dark';
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadData(filters: DashboardFilters): void {
    this.loading = true;
    this.apiService.getPerformanceMetrics(filters).subscribe({
      next: (response) => {
        this.updateChartData(response.data);
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar métricas de desempenho:', error);
        this.loading = false;
      }
    });
  }

  private updateChartData(data: PerformanceMetric[]): void {
    this.doughnutChartData.labels = data.map(item => item.metric);
    this.doughnutChartData.datasets[0].data = data.map(item => item.value);
  }

  exportToCSV(): void {
    const headers = ['Métrica', 'Valor Atual', 'Meta'];
    const data = this.doughnutChartData.labels?.map((label, i) => [
      label,
      this.doughnutChartData.datasets[0].data[i],
      (this.doughnutChartData.datasets[0] as any).target ? (this.doughnutChartData.datasets[0] as any).target[i] : ''
    ]) || [];
    let csvContent = headers.join(',') + '\n';
    data.forEach(row => {
      csvContent += row.map(item => '"' + String(item).replace(/"/g, '""') + '"').join(',') + '\n';
    });
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'metricas-de-desempenho.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  exportChartAsImage(): void {
    if (this.chart && this.chart.chart) {
      const chart = this.chart.chart;
      const canvas = chart.canvas as HTMLCanvasElement;
      const w = canvas.width;
      const h = canvas.height;
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = w;
      tempCanvas.height = h;
      const ctx = tempCanvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(canvas, 0, 0);
        const url = tempCanvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;
        a.download = 'metricas-de-desempenho.png';
        a.click();
      }
    }
  }

  toggleMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      setTimeout(() => {
        window.addEventListener('click', this.closeMenuOnOutsideClick, { once: true });
      });
    }
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  private closeMenuOnOutsideClick = () => {
    this.menuOpen = false;
  };
} 