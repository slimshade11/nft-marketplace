import { Address } from '@common/web3/models/address.model';

export interface GetMetamaskStatePayload {
  address: Address;
  isMetamaskInstalled: boolean;
}
