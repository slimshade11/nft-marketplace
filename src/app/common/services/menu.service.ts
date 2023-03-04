import { MenuItem } from 'primeng/api';
import { Injectable } from '@angular/core';
import { Address } from '@common/web3/models/address.model';

@Injectable()
export class MenuService {
  public setDashboardLinks(address: Address): MenuItem[] {
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
        styleClass: address === null ? 'hidden' : '',
      },
    ];
  }

  public setProfileLinks(address: Address): MenuItem[] {
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

  private getAddressLinkLabel(address: Address): string {
    return address ? `0x...${address?.slice(-6).toLowerCase()}` : '';
  }
}
