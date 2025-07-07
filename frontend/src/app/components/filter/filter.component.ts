import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedService, DashboardFilters } from '../../services/shared.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  filterForm: FormGroup;
  isOpen = false;

  categories = ['Eletrônicos', 'Roupas', 'Alimentos', 'Livros', 'Casa'];
  statuses = ['Entregue', 'Processando', 'Enviado', 'Cancelado'];
  paymentMethods = ['Cartão', 'PIX', 'Boleto'];

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService
  ) {
    this.filterForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      startTime: [''],
      endTime: [''],
      categories: [[]],
      statuses: [[]],
      paymentMethods: [[]],
      minAmount: [null],
      maxAmount: [null]
    });
  }

  ngOnInit(): void {
    this.filterForm.patchValue({
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      categories: [],
      statuses: [],
      paymentMethods: [],
      minAmount: null,
      maxAmount: null
    });
    this.applyFilters();
  }

  ngOnDestroy(): void {
    document.body.classList.remove('modal-open');
  }

  toggleFilter(): void {
    this.isOpen = !this.isOpen;
    
    if (this.isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }

  onCategoryChange(event: any, category: string): void {
    const categories = this.filterForm.get('categories')?.value || [];
    if (event.target.checked) {
      categories.push(category);
    } else {
      const index = categories.indexOf(category);
      if (index > -1) {
        categories.splice(index, 1);
      }
    }
    this.filterForm.patchValue({ categories });
  }

  onStatusChange(event: any, status: string): void {
    const statuses = this.filterForm.get('statuses')?.value || [];
    if (event.target.checked) {
      statuses.push(status);
    } else {
      const index = statuses.indexOf(status);
      if (index > -1) {
        statuses.splice(index, 1);
      }
    }
    this.filterForm.patchValue({ statuses });
  }

  onPaymentMethodChange(event: any, method: string): void {
    this.filterForm.patchValue({ paymentMethods: [method] });
  }

  applyFilters(): void {
    if (this.filterForm.valid) {
      const filters: DashboardFilters = this.filterForm.value;
      if (filters.startDate) {
        filters.startDate = this.formatDate(filters.startDate);
      }
      if (filters.endDate) {
        filters.endDate = this.formatDate(filters.endDate);
      }
      this.sharedService.updateFilters(filters);
      this.isOpen = false;
      document.body.classList.remove('modal-open');
    }
  }

  private formatDate(date: string): string {
    if (!date) return '';

    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;

    if (/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
      const [d, m, y] = date.split('/');
      return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
    }

    if (/^\d{4}\/\d{2}\/\d{2}$/.test(date)) {
      return date.replace(/\//g, '-');
    }

    const dt = new Date(date);
    if (!isNaN(dt.getTime())) {
      return dt.toISOString().slice(0, 10);
    }

    return date;
  }

  clearFilters(): void {
    this.filterForm.reset({
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      categories: [],
      statuses: [],
      paymentMethods: [],
      minAmount: null,
      maxAmount: null
    });
    this.applyFilters();
  }
} 