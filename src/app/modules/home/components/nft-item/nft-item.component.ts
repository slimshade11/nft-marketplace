import { Component, Input } from '@angular/core';
import { NFT } from '@home/models/nft.model';

@Component({
  selector: 'nftm-nft-item',
  templateUrl: './nft-item.component.html',
  styleUrls: ['./nft-item.component.scss'],
})
export class NftItemComponent {
  @Input() nft!: NFT;
}
