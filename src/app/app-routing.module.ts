import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from '@home/home.module';
import { NftListResolver } from '@home/resolvers/nft-list.resolver';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: (): Promise<any> => import('@home/home.module').then(({ HomeModule }): HomeModule => HomeModule),
    resolve: {
      nftList: NftListResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
