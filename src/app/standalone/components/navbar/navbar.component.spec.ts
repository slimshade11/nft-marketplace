import { NavbarComponent } from '@standalone/components/navbar/navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { MenuService } from '@app/common/services/menu.service';
import { MenuItem } from 'primeng/api';
import { PersistanceService } from '@common/services/persistance.service';
import { Web3Service } from '@common/web3/services/web3.service';
import { APP_CONFIG, APP_CONFIG_TOKEN } from '@common/config/app.config';
import { HttpClient, HttpHandler } from '@angular/common/http';

class MockMenuService {
  setDashboardLinks(): MenuItem[] {
    return [];
  }
}

class MockPersistanceService {
  get(): any {}
}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, RouterTestingModule],
      providers: [
        provideMockStore({ initialState }),
        { provide: MenuService, useClass: MockMenuService },
        { provide: PersistanceService, useClass: MockPersistanceService },
        { provide: APP_CONFIG_TOKEN, useValue: APP_CONFIG },
        HttpClient,
        HttpHandler,
        Web3Service,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
