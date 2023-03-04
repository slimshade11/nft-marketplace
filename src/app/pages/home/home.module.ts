import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from '@home/home-routing.module';
import { HomeViewComponent } from '@home/home-view/home-view.component';
import { NftListComponent } from '@home/components/nft-list/nft-list.component';
import { NftItemComponent } from '@home/components/nft-item/nft-item.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

const declarations: any[] = [HomeViewComponent, NftListComponent, NftItemComponent];
const imports: any[] = [CommonModule, HomeRoutingModule, CardModule, ButtonModule];

@NgModule({ declarations, imports })
export class HomeModule {}
