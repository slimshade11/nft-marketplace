import { Component, OnInit } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { providers } from 'ethers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <nftm-errors [provider]="provider$ | async"></nftm-errors>

    <nftm-navbar></nftm-navbar>
    <div class="max-w-screen-xl px-3 mx-auto ">
      <router-outlet></router-outlet>
    </div>
    <nftm-footer></nftm-footer>

    <p-toast position="bottom-center"></p-toast>
  `,
})
export class AppComponent implements OnInit {
  public provider$: Observable<providers.Web3Provider | null> = this.appFacade.selectProvider$();

  constructor(private appFacade: AppFacade) {}

  ngOnInit(): void {
    this.appFacade.initPrimengConfig();
    this.appFacade.dispatchGetDefaultWeb3StateAction();
  }
}
