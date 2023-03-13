import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { NFTMeta } from '@common/web3/models/nft-meta.model';

@Injectable({ providedIn: 'root' })
export class HomeService {
  constructor(private http: HttpClient) {}

  public getNftList$(): Observable<NFTMeta[]> {
    return this.http.get<NFTMeta[]>('/assets/content/meta.json');
  }
}
