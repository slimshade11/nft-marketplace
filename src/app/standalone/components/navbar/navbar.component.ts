import { NetworkWidgetComponent } from '@standalone/components/network-widget/network-widget.component';
import { PersistanceService } from '@common/services/persistance.service';
import { WalletBarComponent } from '@standalone/components/wallet-bar/wallet-bar.component';
import { MenuService } from '@common/services/menu.service';
import { Component, OnInit, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { ThemeService } from '@common/services/theme.service';
import { FormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { Store } from '@ngrx/store';
import { Web3Selectors } from '@store/web3';
import { DestroyComponent } from '@standalone/components/destroy/destroy.component';
import { Address } from '@common/web3/models/address.model';
import { takeUntil } from 'rxjs';

const NavbarImports: any[] = [CommonModule, MenubarModule, WalletBarComponent, NetworkWidgetComponent, FormsModule, ToggleButtonModule];

@Component({
  selector: 'nft-navbar',
  standalone: true,
  imports: NavbarImports,
  providers: [MenuService, ThemeService],
  template: `
    <div class="p-3 flex items-center menu-bar">
      <p-menubar [model]="dashboardLinks" class="w-full">
        <div class="flex items-center">
          <p-toggleButton
            [(ngModel)]="isLightMode"
            (onChange)="themeService.setTheme(isLightMode)"
            class="mr-3"
            onIcon="pi pi-sun"
            offIcon="pi pi-moon">
          </p-toggleButton>

          <nft-network-widget class="mr-3"></nft-network-widget>

          <nft-wallet-bar></nft-wallet-bar>
        </div>
      </p-menubar>
    </div>
  `,
})
export class NavbarComponent extends DestroyComponent implements OnInit {
  public dashboardLinks!: MenuItem[];
  public isLightMode!: boolean;

  constructor(
    @Self() public themeService: ThemeService,
    @Self() private menuService: MenuService,
    private persistanceService: PersistanceService,
    private store: Store
  ) {
    super();
  }

  public ngOnInit(): void {
    this.checkThemeMode();

    this.store
      .select(Web3Selectors.address)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (address: Address): void => {
          this.dashboardLinks = this.menuService.setDashboardLinks(address);
        },
      });
  }

  public checkThemeMode(): void {
    this.isLightMode = this.persistanceService.get('isLightMode');
    this.themeService.setTheme(this.isLightMode);
  }
}
