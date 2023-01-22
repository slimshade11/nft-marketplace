import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from '@home/home-routing.module';
import { HomeViewComponent } from '@home/home-view/home-view.component';
import { NftListComponent } from '@home/components/nft-list/nft-list.component';
import { NftItemComponent } from '@home/components/nft-item/nft-item.component';
import { PRIMENG_UI } from '@common_primeng-ui/primeng-ui';

const declarations: any[] = [HomeViewComponent, NftListComponent, NftItemComponent];
const imports: any[] = [CommonModule, HomeRoutingModule, ...PRIMENG_UI];

@NgModule({ declarations, imports })
export class HomeModule {}
