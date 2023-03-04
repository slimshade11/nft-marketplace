import { Component, OnInit, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Web3Service } from '@common/web3/services/web3.service';
import { Web3Selectors } from '@store/web3';
import { Store } from '@ngrx/store';
import { Observable, takeUntil } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { MenuService } from '@common/services/menu.service';
import { DestroyComponent } from '@standalone/components/destroy/destroy.component';
import { Address } from '@common/web3/models/address.model';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

const WalletBarImports: any[] = [CommonModule, MenuModule, AvatarModule, ButtonModule];
@Component({
  selector: 'nft-wallet-bar',
  standalone: true,
  imports: WalletBarImports,
  providers: [MenuService],
  templateUrl: './wallet-bar.component.html',
})
export class WalletBarComponent extends DestroyComponent implements OnInit {
  public isMetamaskPerforming$: Observable<boolean> = this.store.select(Web3Selectors.isPerforming);

  public profileLinks!: MenuItem[];
  public address: Address = null;

  constructor(@Self() private menuService: MenuService, public web3: Web3Service, private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.initializeValues();
  }

  private initializeValues(): void {
    this.store
      .select(Web3Selectors.address)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (address: Address): void => {
          this.address = address;

          if (this.address) {
            this.profileLinks = this.menuService.setProfileLinks(this.address);
          }
        },
      });
  }
}
