import { MessageService } from 'primeng/api';
import { AppFacade } from '@app/app.facade';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '@app/app.component';
import { Observable, of } from 'rxjs';
import { providers } from 'ethers';
import { NavbarComponent } from '@standalone/components/navbar/navbar.component';
import { FooterComponent } from '@standalone/components/footer/footer.component';
import { ToastModule } from 'primeng/toast';
import { Component, OnDestroy } from '@angular/core';
import { ResolveLoaderService } from '@common/services/resolve-loader.service';
import { provideMockStore } from '@ngrx/store/testing';
import { Web3Service } from '@common/web3/services/web3.service';

@Component({ template: '' })
class TestComponentErrorOnDestroy implements OnDestroy {
  ngOnDestroy() {}
}

class MockResolveLoaderService {
  handleResolveProgressBarVisibility$(): Observable<boolean> {
    return of();
  }
}

class MockWeb3Service {}

class MockAppFacade {
  dispatchGetDefaultWeb3StateAction(): void {}

  initPrimengConfig(): void {}

  selectProvider$(): Observable<providers.Web3Provider | null> {
    return of();
  }
}

describe('AppComponent', () => {
  let initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, NavbarComponent, FooterComponent, ToastModule],
      declarations: [AppComponent],
      providers: [
        { provide: AppFacade, useClass: MockAppFacade },
        { provide: ResolveLoaderService, useClass: MockResolveLoaderService },
        { provide: Web3Service, useClass: MockWeb3Service },
        provideMockStore({ initialState }),
        MessageService,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
