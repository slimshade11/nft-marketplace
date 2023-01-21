import { CreateViewComponent } from '@create/create-view/create-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NftComponent } from '@create/components/nft/nft.component';

const routes: Routes = [
  {
    path: '',
    component: CreateViewComponent,
  },
  {
    path: 'nft',
    component: NftComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateRoutingModule {}
