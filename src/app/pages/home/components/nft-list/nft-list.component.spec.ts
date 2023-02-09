import { NftListComponent } from '@home/components/nft-list/nft-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('NftListComponent', () => {
  let component: NftListComponent;
  let fixture: ComponentFixture<NftListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NftListComponent],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NftListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
