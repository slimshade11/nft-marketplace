import { MenuItem } from 'primeng/api';
import { Injectable } from '@angular/core';
import { MenuLinks } from '@models/menu-links.model';

@Injectable()
export class MenuService {
  public setMenuLinks(isLoggedIn: boolean): MenuLinks {
    const links: MenuLinks = {
      dashboard: [
        {
          label: 'Marketplace',
          routerLink: '/',
          icon: 'pi pi-fw pi-home',
          visible: true,
          styleClass: 'mr-2',
          routerLinkActiveOptions: { exact: true },
        },
        {
          label: 'Create',
          routerLink: '/create/nft',
          icon: 'pi pi-fw pi-user',
          visible: true,
        },
      ],
      profile: [
        {
          label: 'Profile',
          routerLink: '/profile',
          icon: 'pi pi-fw pi-user',
          visible: true,
        },
      ],
    };

    return links;
  }
}
