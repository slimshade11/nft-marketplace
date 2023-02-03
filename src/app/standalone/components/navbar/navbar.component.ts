import { WalletBarComponent } from '@standalone/components/wallet-bar/wallet-bar.component';
import { MenuService } from '@common/services/menu.service';
import { PRIMENG_UI } from '@common/primeng-ui/primeng-ui';
import { Component, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkWidgetComponent } from '@standalone/components/network-widget/network-widget.component';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'nft-navbar',
  standalone: true,
  imports: [CommonModule, ...PRIMENG_UI, WalletBarComponent, NetworkWidgetComponent],
  providers: [MenuService],
  template: `
    <div class="p-3 flex items-center menu-bar">
      <p-menubar
        [model]="dashboardLinks"
        class="w-full">
        <div class="flex items-center">
          <nft-network-widget class="mr-3"></nft-network-widget>
          <nft-wallet-bar></nft-wallet-bar>
        </div>
      </p-menubar>
    </div>
  `,
})
export class NavbarComponent {
  public dashboardLinks: MenuItem[] = this.menuService.setDashboardLinks();

  constructor(@Self() private menuService: MenuService) {}
}
