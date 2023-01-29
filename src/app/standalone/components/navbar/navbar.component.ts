import { Observable } from 'rxjs';
import { MenuService } from '@common/services/menu.service';
import { PRIMENG_UI } from '@common/primeng-ui/primeng-ui';
import { MenuLinks } from '@common/models/menu-links.model';
import { MenuType } from '@common/enums/menu-type.enum';
import { Component, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Web3Service } from '@common/web3/services/web3.service';
import { Store } from '@ngrx/store';
import { Web3Selectors } from '@app/store/web3';

@Component({
  selector: 'nftm-navbar',
  standalone: true,
  imports: [CommonModule, ...PRIMENG_UI],
  providers: [MenuService],
  template: `
    <div class="p-3">
      <p-menubar [model]="links[MenuType.DASHBOARD]">
        <p-menu
          #menu
          [model]="links[MenuType.PROFILE]"
          [popup]="true">
        </p-menu>
        <div class="flex items-center">
          <ng-container *ngIf="(address$ | async) !== null; else connectButton">
            <div class="mr-3 text-sm">
              {{ address$ | async }}
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
  public address$: Observable<string | null> = this.store.select(Web3Selectors.address);

  public links: MenuLinks = this.menuService.setMenuLinks();
  public MenuType = MenuType;

  constructor(@Self() private menuService: MenuService, private store: Store, public web3Service: Web3Service) {}
}
