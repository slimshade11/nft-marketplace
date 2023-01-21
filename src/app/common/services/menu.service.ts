import { MenuItem } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {
  public setMenuLinks(isLoggedIn: boolean): MenuItem[] {
    const links: MenuItem[] = [
      {
        label: 'Home',
        routerLink: 'home',
        icon: 'pi pi-fw pi-home',
        visible: true,
      },
      {
        label: 'Team',
        routerLink: 'team',
        icon: 'pi pi-fw pi-user',
        visible: true,
      },
      {
        label: 'Projects',
        routerLink: 'projects',
        icon: 'pi pi-fw pi-th-large',
        visible: true,
      },
      {
        label: 'Calendar',
        routerLink: 'calendar',
        icon: 'pi pi-fw pi-calendar',
        visible: true,
      },
    ];

    return links;
  }
}
