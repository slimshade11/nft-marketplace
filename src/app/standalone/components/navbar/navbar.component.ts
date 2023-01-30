import { WalletBarComponent } from '@standalone/components/wallet-bar/wallet-bar.component';
import { MenuService } from '@common/services/menu.service';
import { PRIMENG_UI } from '@common/primeng-ui/primeng-ui';
import { MenuLinks } from '@common/models/menu-links.model';
import { MenuType } from '@common/enums/menu-type.enum';
import { Component, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkWidgetComponent } from '@standalone/components/network-widget/network-widget.component';

@Component({
  selector: 'nftm-navbar',
  standalone: true,
  imports: [CommonModule, ...PRIMENG_UI, WalletBarComponent, NetworkWidgetComponent],
  providers: [MenuService],
  template: `
    <div class="p-3">
      <p-menubar [model]="links[MenuType.DASHBOARD]">
        <div class="flex items-center">
          <nftm-network-widget class="mr-3"></nftm-network-widget>
          <nftm-wallet-bar [links]="links[MenuType.PROFILE]"></nftm-wallet-bar>
        </div>
      </p-menubar>
    </div>
  `,
})
export class NavbarComponent {
  public links: MenuLinks = this.menuService.setMenuLinks();
  public MenuType = MenuType;

  constructor(@Self() private menuService: MenuService) {}
}
