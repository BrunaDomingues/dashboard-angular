import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { SharedService, DashboardFilters } from '../../../services/shared.service';
import { ApiService, SalesByCategory } from '../../../services/api.service';
import { ThemeService, Theme } from '../../../services/theme.service';

@Component({
  selector: 'app-sales-by-category',
  templateUrl: './sales-by-category.component.html',
  styleUrls: ['./sales-by-category.component.scss']
})
export class SalesByCategoryComponent implements OnInit, OnDestroy {
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#212529'
        }
      },
      title: {
        display: true,
        text: 'Vendas por Categoria',
        color: '#212529'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Vendas (R$)',
          color: '#212529'
        },
        ticks: {
          color: '#212529'
        },
        grid: {
          color: '#dee2e6'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Categorias',
          color: '#212529'
        },
        ticks: {
          color: '#212529'
        },
        grid: {
          color: '#dee2e6'
        }
      }
    }
  };

  public barChartType: ChartType = 'bar';
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Vendas',
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
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
        this.updateChartTheme(theme);
        this.isDarkMode = theme === 'dark';
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private updateChartTheme(theme: Theme): void {
    const isDark = theme === 'dark';
    const textColor = isDark ? '#fff' : '#222';
    const gridColor = isDark ? '#404040' : '#dee2e6';

    this.barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: textColor
          }
        },
        title: {
          display: true,
          text: 'Vendas por Categoria',
          color: textColor
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Vendas (R$)',
            color: textColor
          },
          ticks: {
            color: textColor
          },
          grid: {
            color: gridColor
          }
        },
        x: {
          title: {
            display: true,
            text: 'Categorias',
            color: textColor
          },
          ticks: {
            color: textColor
          },
          grid: {
            color: gridColor
          }
        }
      }
    };
  }

  private loadData(filters: DashboardFilters): void {
    this.loading = true;
    this.apiService.getSalesByCategory(filters).subscribe({
      next: (response) => {
        this.updateChartData(response.data);
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar dados de vendas por categoria:', error);
        this.loading = false;
      }
    });
  }

  private updateChartData(data: SalesByCategory[]): void {
    this.barChartData.labels = data.map(item => item.category);
    this.barChartData.datasets[0].data = data.map(item => item.sales);
  }

  exportToCSV(): void {
    const headers = ['Categoria', 'Vendas', 'Itens'];
    const data = this.barChartData.labels?.map((label, i) => [
      label,
      this.barChartData.datasets[0].data[i],
      (this.barChartData.datasets[0] as any).items ? (this.barChartData.datasets[0] as any).items[i] : ''
    ]) || [];
    let csvContent = headers.join(',') + '\n';
    data.forEach(row => {
      csvContent += row.map(item => '"' + String(item).replace(/"/g, '""') + '"').join(',') + '\n';
    });
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vendas-por-categoria.csv';
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
        a.download = 'vendas-por-categoria.png';
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