import { Component, OnInit } from '@angular/core';
import { AppFacade } from '@app/app.facade';

@Component({
  selector: 'app-root',
  template: `
    <nftm-navbar></nftm-navbar>
    <div class="max-w-screen-xl px-3 mx-auto ">
      <router-outlet></router-outlet>
    </div>
    <nftm-footer></nftm-footer>
  `,
})
export class AppComponent implements OnInit {
  constructor(private appFacade: AppFacade) {}

  ngOnInit(): void {
    this.appFacade.initPrimengConfig();
    this.appFacade.dispatchGetDefaultWeb3StateAction();
  }
}
