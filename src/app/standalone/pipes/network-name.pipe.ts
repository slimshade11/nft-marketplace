import { NETWORKS } from '@common/web3/constants/networks';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'networkName',
  standalone: true,
})
export class NetworkNamePipe implements PipeTransform {
  public transform(value: number | null): string {
    return value ? NETWORKS[value] : 'No network detected';
  }
}
