import { MenuService } from '@services/menu.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PRIMENG_UI } from '@primeng-ui/primeng-ui';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'nftm-navbar',
  standalone: true,
  imports: [CommonModule, ...PRIMENG_UI],
  template: `
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

    <p-tabMenu
      [model]="links"
      [activeItem]="links[0]"
      styleClass="hidden md:block">
    </p-tabMenu>
  `,
})
export class NavbarComponent implements OnInit {
  public links!: MenuItem[];
  private logged = false;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.links = this.menuService.setMenuLinks(this.logged);
  }
}