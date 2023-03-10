import { ToastMessage } from '@common/models/toast-message.model';

export const GetMetamaskStateError: ToastMessage = {
  severity: 'Error!',
  details: 'Something went wrong during fetching initial web3 data',
};
