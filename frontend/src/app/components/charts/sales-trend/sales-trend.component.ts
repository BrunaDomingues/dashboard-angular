import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { SharedService, DashboardFilters } from '../../../services/shared.service';
import { ApiService, SalesTrend } from '../../../services/api.service';
import { ThemeService, Theme } from '../../../services/theme.service';

@Component({
  selector: 'app-sales-trend',
  templateUrl: './sales-trend.component.html',
  styleUrls: ['./sales-trend.component.scss']
})
export class SalesTrendComponent implements OnInit, OnDestroy {
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Vendas ao Longo do Tempo'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Vendas (R$)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Data'
        }
      }
    }
  };

  public lineChartType: ChartType = 'line';
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Vendas',
        fill: false,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.3
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
    this.apiService.getSalesTrend(filters).subscribe({
      next: (response) => {
        this.updateChartData(response.data);
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar dados de vendas ao longo do tempo:', error);
        this.loading = false;
      }
    });
  }

  private updateChartData(data: SalesTrend[]): void {
    this.lineChartData.labels = data.map(item => item.date);
    this.lineChartData.datasets[0].data = data.map(item => item.sales);
  }

  exportToCSV(): void {
    const headers = ['Data', 'Vendas', 'Pedidos'];
    const data = this.lineChartData.labels?.map((label, i) => [
      label,
      this.lineChartData.datasets[0].data[i],
      (this.lineChartData.datasets[0] as any).orders ? (this.lineChartData.datasets[0] as any).orders[i] : ''
    ]) || [];
    let csvContent = headers.join(',') + '\n';
    data.forEach(row => {
      csvContent += row.map(item => '"' + String(item).replace(/"/g, '""') + '"').join(',') + '\n';
    });
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vendas-ao-longo-do-tempo.csv';
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
        a.download = 'vendas-ao-longo-do-tempo.png';
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