import { AuthGuard } from '@common/guards/auth.guard';
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
    resolve: { nftList: NftListResolver },
  },
  {
    path: 'create',
    canMatch: [AuthGuard],
    loadChildren: (): Promise<any> => import('@create/create.module').then(({ CreateModule }): CreateModule => CreateModule),
  },
  {
    path: 'profile',
    canMatch: [AuthGuard],
    loadChildren: (): Promise<any> => import('@profile/profile.module').then(({ ProfileModule }): ProfileModule => ProfileModule),
    resolve: { nftList: NftListResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
