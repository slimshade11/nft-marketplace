import { DestroyComponent } from '@standalone/components/destroy/destroy.component';
import { Component, OnInit } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <nftm-navbar [account]="(address$ | async)!"> </nftm-navbar>

    {{ address$ | async }}
    <div class="max-w-screen-xl px-3 mx-auto ">
      <router-outlet></router-outlet>
    </div>
    <nftm-footer></nftm-footer>

    <p-toast position="bottom-center"></p-toast>
  `,
})
export class AppComponent extends DestroyComponent implements OnInit {
  public isMetamaskInstalled$: Observable<boolean> = this.appFacade.selectIsMetamaskInstalled$();
  public address$: Observable<string> = this.appFacade.selectConnectedAddress$();

  constructor(private appFacade: AppFacade) {
    super();
    this.appFacade.handleAccountsChanged().subscribe();
  }

  ngOnInit(): void {
    this.appFacade.initPrimengConfig();
    this.appFacade.dispatchGetDefaultWeb3StateAction();
  }
}
