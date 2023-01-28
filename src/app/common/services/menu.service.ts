import { Injectable } from '@angular/core';
import { MenuLinks } from '@common/models/menu-links.model';

@Injectable()
export class MenuService {
  public setMenuLinks(): MenuLinks {
    const links: MenuLinks = {
      dashboard: [
        {
          label: 'Marketplace',
          routerLink: '/',
          icon: 'pi pi-fw pi-home',
          styleClass: 'lg:mr-2',
          routerLinkActiveOptions: { exact: true },
        },
        {
          label: 'Create',
          routerLink: '/create/nft',
          icon: 'pi pi-fw pi-user',
        },
      ],
      profile: [
        {
          label: 'Profile',
          routerLink: '/profile',
          icon: 'pi pi-fw pi-user',
        },
      ],
    };

    return links;
  }
}
