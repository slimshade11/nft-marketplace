import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { HomeFacade } from '@home/home.facade';
import { CreateNftForm } from '@home/models/create-nft-form.model';
import { NftComponent } from '@create/components/nft/nft.component';
import { Observable, of } from 'rxjs';

class MockHomeFacade {
  getCreateNftForm$(): Observable<FormGroup<CreateNftForm>> {
    return of();
  }
}

describe('NftComponent', () => {
  let component: NftComponent;
  let fixture: ComponentFixture<NftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NftComponent],
      providers: [{ provide: HomeFacade, useClass: MockHomeFacade }],
    }).compileComponents();

    fixture = TestBed.createComponent(NftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
