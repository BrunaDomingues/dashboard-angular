import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService, Theme } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent implements OnInit, OnDestroy {
  currentTheme: Theme = 'light';
  private subscription: Subscription = new Subscription();

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.themeService.theme$.subscribe(theme => {
        this.currentTheme = theme;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleTheme(): void {
    console.log('Alternando tema de:', this.currentTheme);
    this.themeService.toggleTheme();
  }

  getIconClass(): string {
    return this.currentTheme === 'light' ? 'bi-moon-fill' : 'bi-sun-fill';
  }

  getTooltipText(): string {
    return this.currentTheme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro';
  }
} 