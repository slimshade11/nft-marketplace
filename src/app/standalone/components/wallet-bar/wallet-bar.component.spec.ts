import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Web3Service } from '@common/web3/services/web3.service';
import { MenuService } from '@common/services/menu.service';
import { MenuItem } from 'primeng/api';
import { WalletBarComponent } from '@standalone/components/wallet-bar/wallet-bar.component';
import { provideMockStore } from '@ngrx/store/testing';

class MockMenuService {
  setProfileLinks(): MenuItem[] {
    return [];
  }
}

class MockWeb3Service {
  connectWallet(): void {}
}

describe('WalletButtonComponent', () => {
  let component: WalletBarComponent;
  let fixture: ComponentFixture<WalletBarComponent>;
  let initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletBarComponent],
      providers: [
        { provide: MenuService, useClass: MockMenuService },
        { provide: Web3Service, useClass: MockWeb3Service },
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WalletBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
