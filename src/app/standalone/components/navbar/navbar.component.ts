import { MenuService } from '@services/menu.service';
import { Component, OnInit, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PRIMENG_UI } from '@primeng-ui/primeng-ui';
import { Router } from '@angular/router';
import { MenuLinks } from '@models/menu-links.model';
import { MenuType } from '@app/common/enums/menu-type.enum';

@Component({
  selector: 'nftm-navbar',
  standalone: true,
  imports: [CommonModule, ...PRIMENG_UI],
  providers: [MenuService],
  template: `
    <div class="p-3">
      <p-menubar [model]="links[menuTypes.DASHBOARD]">
        <p-menu
          #menu
          [model]="links[menuTypes.PROFILE]"
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
  public menuTypes = MenuType;
  public notificationAmount = 12;
  private isLoggedIn = false;

  constructor(@Self() private menuService: MenuService, private router: Router) {}

  ngOnInit(): void {
    this.links = this.menuService.setMenuLinks(this.isLoggedIn);
  }
}
