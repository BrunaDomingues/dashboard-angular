import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { SharedService, DashboardFilters } from '../../../services/shared.service';
import { ApiService, TrafficChannel } from '../../../services/api.service';
import { ThemeService, Theme } from '../../../services/theme.service';

@Component({
  selector: 'app-traffic-channels',
  templateUrl: './traffic-channels.component.html',
  styleUrls: ['./traffic-channels.component.scss']
})
export class TrafficChannelsComponent implements OnInit, OnDestroy {
  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Tráfego por Canal'
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        pointLabels: {
          font: {
            size: 14
          }
        }
      }
    }
  };

  public radarChartType: ChartType = 'radar';
  public radarChartData: ChartConfiguration<'radar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Visitas',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
      },
      {
        data: [],
        label: 'Conversões',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
      }
    ]
  };

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  menuOpen = false;
  isDarkMode = false;

  private subscription: Subscription = new Subscription();
  loading = false;

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
    this.apiService.getTrafficChannels(filters).subscribe({
      next: (response) => {
        this.updateChartData(response.data);
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar tráfego por canal:', error);
        this.loading = false;
      }
    });
  }

  private updateChartData(data: TrafficChannel[]): void {
    this.radarChartData.labels = data.map(item => item.channel);
    this.radarChartData.datasets[0].data = data.map(item => item.visits);
    this.radarChartData.datasets[1].data = data.map(item => item.conversions);
  }

  exportToCSV(): void {
    const headers = ['Canal', 'Visitas', 'Conversões'];
    const data = this.radarChartData.labels?.map((label, i) => [
      label,
      this.radarChartData.datasets[0].data[i],
      this.radarChartData.datasets[1].data[i]
    ]) || [];
    let csvContent = headers.join(',') + '\n';
    data.forEach(row => {
      csvContent += row.map(item => '"' + String(item).replace(/"/g, '""') + '"').join(',') + '\n';
    });
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'trafego-por-canal.csv';
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
        a.download = 'trafego-por-canal.png';
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