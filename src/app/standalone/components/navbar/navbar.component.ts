import { MenuService } from '@common/services/menu.service';
import { PRIMENG_UI } from '@common/primeng-ui/primeng-ui';
import { MenuLinks } from '@common/models/menu-links.model';
import { MenuType } from '@common/enums/menu-type.enum';
import { Component, Input, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Web3Service } from '@common/web3/services/web3.service';

@Component({
  selector: 'nftm-navbar',
  standalone: true,
  imports: [CommonModule, ...PRIMENG_UI],
  providers: [MenuService],
  template: `
    <div class="p-3">
      <p-menubar [model]="links[menuType.DASHBOARD]">
        <p-menu
          #menu
          [model]="links[menuType.PROFILE]"
          [popup]="true">
        </p-menu>
        <div class="flex items-center">
          <ng-container *ngIf="account; else connectButton">
            <div class="mr-5 cursor-pointer">
              <i
                class="pi pi-bell"
                pBadge
                severity="success">
              </i>
            </div>
            <p-avatar
              (click)="menu.toggle($event)"
              label="P"
              class="cursor-pointer">
            </p-avatar>
          </ng-container>
          <ng-template #connectButton>
            <button
              (click)="web3Service.connectWallet()"
              pButton
              label="Connect"></button>
          </ng-template>
        </div>
      </p-menubar>
    </div>
  `,
})
export class NavbarComponent {
  @Input() public account!: string;

  public links: MenuLinks = this.menuService.setMenuLinks();
  public menuType = MenuType;

  constructor(@Self() private menuService: MenuService, public web3Service: Web3Service) {}
}
