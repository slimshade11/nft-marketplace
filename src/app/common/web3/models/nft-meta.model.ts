import { NFTAttribute } from '@common/web3/models/nft-attribute.model';

export interface NFTMeta {
  description: string;
  image: string;
  name: string;
  attributes: NFTAttribute[];
}
