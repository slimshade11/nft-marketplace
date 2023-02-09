import { Component, Input } from '@angular/core';
import { NFT } from '@home/models/nft.model';

@Component({
  selector: 'nft-nft-item',
  templateUrl: './nft-item.component.html',
})
export class NftItemComponent {
  @Input() nft!: NFT;
}
