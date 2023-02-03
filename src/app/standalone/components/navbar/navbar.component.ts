import { WalletBarComponent } from '@standalone/components/wallet-bar/wallet-bar.component';
import { MenuService } from '@common/services/menu.service';
import { PRIMENG_UI } from '@common/primeng-ui/primeng-ui';
import { Component, OnInit, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkWidgetComponent } from '@standalone/components/network-widget/network-widget.component';
import { MenuItem } from 'primeng/api';
import { ThemeService } from '@common/services/theme.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'nft-navbar',
  standalone: true,
  imports: [CommonModule, ...PRIMENG_UI, WalletBarComponent, NetworkWidgetComponent, FormsModule],
  providers: [MenuService],
  template: `
    <div class="p-3 flex items-center menu-bar">
      <p-menubar
        [model]="dashboardLinks"
        class="w-full">
        <div class="flex">
          <p-toggleButton
            [(ngModel)]="isLightMode"
            (onChange)="themeService.setTheme(isLightMode)"
            class="mr-3"
            onIcon="pi pi-sun"
            offIcon="pi pi-moon"></p-toggleButton>
          <div class="flex items-center">
            <nft-network-widget class="mr-3"></nft-network-widget>
            <nft-wallet-bar></nft-wallet-bar>
          </div>
        </div>
      </p-menubar>
    </div>
  `,
})
export class NavbarComponent implements OnInit {
  public dashboardLinks: MenuItem[] = this.menuService.setDashboardLinks();
  public isLightMode!: boolean;

  constructor(@Self() private menuService: MenuService, public themeService: ThemeService) {}

  public ngOnInit(): void {
    this.themeService.handleThemeMode(this.isLightMode);
  }
}
