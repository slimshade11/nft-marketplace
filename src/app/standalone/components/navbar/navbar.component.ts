import { MenuService } from '@services/menu.service';
import { Component, OnInit, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PRIMENG_UI } from '@primeng-ui/primeng-ui';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'nftm-navbar',
  standalone: true,
  imports: [CommonModule, ...PRIMENG_UI],
  providers: [MenuService],
  template: `
    <!-- Mobile -->
    <div class="py-3 md:hidden">
      <p-menu
        #menu
        [popup]="true"
        [model]="links">
      </p-menu>
      <button
        pButton
        type="button"
        icon="pi pi-list"
        label="Menu"
        class="text-gray-300"
        (click)="menu.toggle($event)"></button>
    </div>
    <!-- Desktop -->
    <p-tabMenu
      [model]="links"
      [activeItem]="links[0]"
      styleClass="hidden md:block">
    </p-tabMenu>
  `,
})
export class NavbarComponent implements OnInit {
  public links!: MenuItem[];
  private isLoggedIn = false;

  constructor(@Self() private menuService: MenuService, private router: Router) {}

  ngOnInit(): void {
    this.links = this.menuService.setMenuLinks(this.isLoggedIn);
  }
}
