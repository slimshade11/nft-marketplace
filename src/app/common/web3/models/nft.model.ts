import { NftCore } from '@common/web3/models/nft-core.model';
import { NFTMeta } from '@common/web3/models/nft-meta.model';

export interface NFT extends NftCore {
  meta: NFTMeta;
}
