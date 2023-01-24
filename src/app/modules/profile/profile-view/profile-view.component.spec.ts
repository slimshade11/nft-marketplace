import { ProfileFacade } from '@profile/profile.facade';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileViewComponent } from '@profile/profile-view/profile-view.component';
import { providers } from 'ethers';
import { Observable, of } from 'rxjs';

class MockProfileFacade {
  selectProvider$(): Observable<providers.Web3Provider | null> {
    return of();
  }
}

describe('ProfileViewComponent', () => {
  let component: ProfileViewComponent;
  let fixture: ComponentFixture<ProfileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileViewComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: ProfileFacade, useClass: MockProfileFacade }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
