import { ActivatedRoute, Data } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NFT } from '@app/modules/home/models/nft.model';

@Component({
  selector: 'nftm-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  public nftList$!: Observable<NFT[]>;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.nftList$ = this.activatedRoute.data.pipe(map(({ nftList }: Data): NFT[] => nftList));
  }
}
