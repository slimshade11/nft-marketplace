import { Component, Input } from '@angular/core';
import { NFTMeta } from '@common/web3/models/nft-meta.model';

@Component({
  selector: 'nft-nft-item',
  templateUrl: './nft-item.component.html',
})
export class NftItemComponent {
  @Input() public nft!: NFTMeta;
}
