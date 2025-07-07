import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService, DashboardFilters } from '../../services/shared.service';
import { ApiService, Order } from '../../services/api.service';
import { ThemeService, Theme } from '../../services/theme.service';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  loading = false;
  page = 1;
  pageSize = 5;
  total = 0;
  subscription: Subscription = new Subscription();
  public Math = Math;
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

  loadData(filters: DashboardFilters): void {
    this.loading = true;
    this.apiService.getOrders(filters).subscribe({
      next: (response) => {
        this.orders = response.data;
        this.total = response.data.length;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar pedidos:', error);
        this.loading = false;
      }
    });
  }

  get pagedOrders(): Order[] {
    const start = (this.page - 1) * this.pageSize;
    return this.orders.slice(start, start + this.pageSize);
  }

  setPage(page: number): void {
    this.page = page;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Entregue': return 'table-success-bg';
      case 'Processando': return 'table-warning-bg';
      case 'Enviado': return 'table-info-bg';
      case 'Cancelado': return 'table-danger-bg';
      default: return '';
    }
  }

  exportToCSV(): void {
    if (!this.orders.length) return;
    const headers = ['Pedido', 'Data', 'Cliente', 'Status', 'Valor (R$)', 'Itens', 'Pagamento'];
    const rows = this.orders.map(order => [
      order.orderId,
      order.date,
      order.customer,
      order.status,
      order.amount,
      order.items,
      order.payment
    ]);
    let csvContent = headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.map(item => '"' + String(item).replace(/"/g, '""') + '"').join(',') + '\n';
    });
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pedidos.csv';
    a.click();
    window.URL.revokeObjectURL(url);
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