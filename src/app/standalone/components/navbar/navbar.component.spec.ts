import { NavbarComponent } from '@standalone/components/navbar/navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { MenuService } from '@app/common/services/menu.service';
import { MenuItem } from 'primeng/api';

class MockMenuService {
  setDashboardLinks(): MenuItem[] {
    return [];
  }
}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, RouterTestingModule],
      providers: [provideMockStore({ initialState }), { provide: MenuService, useClass: MockMenuService }],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
