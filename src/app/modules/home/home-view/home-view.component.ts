import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { map, tap } from 'rxjs';

@Component({
  selector: 'nftm-home-view',
  templateUrl: './home-view.component.html',
})
export class HomeViewComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('/assets/meta.json').subscribe((res) => {
      console.log(res);
    });
  }
}
