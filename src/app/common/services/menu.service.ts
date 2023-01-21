import { MenuItem } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  public setMenuLinks(logged: boolean): MenuItem[] {
    const links: MenuItem[] = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        visible: true,
      },
      {
        label: 'Team',
        icon: 'pi pi-fw pi-user',
        visible: true,
      },
      {
        label: 'Projects',
        icon: 'pi pi-fw pi-th-large',
        visible: true,
      },
      {
        label: 'Calendar',
        icon: 'pi pi-fw pi-calendar',
        visible: true,
      },
    ];

    return links;
  }
}
