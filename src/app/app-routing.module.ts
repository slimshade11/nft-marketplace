import { AuthGuard } from '@common_guards/auth.guard';
import { ProfileModule } from '@profile/profile.module';
import { CreateModule } from '@create/create.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from '@home/home.module';
import { NftListResolver } from '@home/resolvers/nft-list.resolver';

const routes: Routes = [
  {
    path: '',
    loadChildren: (): Promise<any> => import('@home/home.module').then(({ HomeModule }): HomeModule => HomeModule),
    resolve: {
      nftList: NftListResolver,
    },
  },
  {
    path: 'create',
    loadChildren: (): Promise<any> =>
      import('@create/create.module').then(({ CreateModule }): CreateModule => CreateModule),
  },
  {
    path: 'profile',
    loadChildren: (): Promise<any> =>
      import('@profile/profile.module').then(({ ProfileModule }): ProfileModule => ProfileModule),
    canMatch: [AuthGuard],
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
