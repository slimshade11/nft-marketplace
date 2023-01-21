import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { NFT } from '@home/models/nft.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  public getNftList$(): Observable<NFT[]> {
    return this.http.get<NFT[]>('/assets/meta.json');
  }
}
