import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletBarComponent } from './wallet-bar.component';

describe('WalletButtonComponent', () => {
  let component: WalletBarComponent;
  let fixture: ComponentFixture<WalletBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WalletBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
