import { NFTAttribute } from '@home/models/nft-attribute.model';

export interface NFT {
  description: string;
  image: string;
  name: string;
  attributes: NFTAttribute[];
}
