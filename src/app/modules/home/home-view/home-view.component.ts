import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NFT } from '@home/models/nft.model';
import { HomeFacade } from '@home/home.facade';

@Component({
  selector: 'nftm-home-view',
  templateUrl: './home-view.component.html',
})
export class HomeViewComponent implements OnInit {
  constructor(private homeFacade: HomeFacade) {}

  ngOnInit(): void {}
}
