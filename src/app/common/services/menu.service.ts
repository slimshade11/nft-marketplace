import { MenuItem } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {
  public setDashboardLinks(): MenuItem[] {
    return [
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
    ];
  }

  public setProfileLinks(address: string): MenuItem[] {
    return [
      {
        label: this.getAddressLinkLabel(address),
        disabled: true,
      },
      {
        label: 'Profile',
        routerLink: '/profile',
        icon: 'pi pi-fw pi-user',
      },
    ];
  }

  private getAddressLinkLabel(address: string | undefined): string {
    if (!address) return '';
    return `0x...${address?.slice(-6)}`;
  }
}
