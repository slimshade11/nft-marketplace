import { MenuService } from '@common_services/menu.service';
import { PRIMENG_UI } from '@common_primeng-ui/primeng-ui';
import { MenuLinks } from '@common_models/menu-links.model';
import { MenuType } from '@common_enums/menu-type.enum';
import { Component, OnInit, Self } from '@angular/core';
import { CommonModule } from '@angular/common';

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
          <div class="mr-5 cursor-pointer">
            <i
              class="pi pi-bell"
              pBadge
              severity="success"></i>
          </div>
          <p-avatar
            (click)="menu.toggle($event)"
            label="P"
            class="cursor-pointer"></p-avatar>
        </div>
      </p-menubar>
    </div>
  `,
})
export class NavbarComponent implements OnInit {
  public links!: MenuLinks;
  public menuType = MenuType;
  private isLoggedIn = true;

  constructor(@Self() private menuService: MenuService) {}

  ngOnInit(): void {
    this.links = this.menuService.setMenuLinks(this.isLoggedIn);
  }
}
