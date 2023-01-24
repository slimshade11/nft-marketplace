import { MessageService } from 'primeng/api';
import { AppFacade } from '@app/app.facade';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '@app/app.component';
import { Observable, of } from 'rxjs';
import { providers } from 'ethers';
import { ErrorsComponent } from '@standalone/components/errors/errors.component';
import { NavbarComponent } from '@standalone/components/navbar/navbar.component';
import { FooterComponent } from '@standalone/components/footer/footer.component';
import { ToastModule } from 'primeng/toast';
import { Component, OnDestroy } from '@angular/core';

@Component({ template: '' })
class TestComponentErrorOnDestroy implements OnDestroy {
  ngOnDestroy() {}
}

class MockAppFacade {
  dispatchGetDefaultWeb3StateAction(): void {}

  initPrimengConfig(): void {}

  selectProvider$(): Observable<providers.Web3Provider | null> {
    return of();
  }
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ErrorsComponent, NavbarComponent, FooterComponent, ToastModule],
      declarations: [AppComponent],
      providers: [{ provide: AppFacade, useClass: MockAppFacade }, MessageService],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
