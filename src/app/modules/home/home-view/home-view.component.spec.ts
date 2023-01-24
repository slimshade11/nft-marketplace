import { RouterTestingModule } from '@angular/router/testing';
import { NftListComponent } from '@home/components/nft-list/nft-list.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeViewComponent } from '@home/home-view/home-view.component';

describe('HomeViewComponent', () => {
  let component: HomeViewComponent;
  let fixture: ComponentFixture<HomeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeViewComponent, NftListComponent],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
