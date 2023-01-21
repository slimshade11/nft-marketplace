import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from '@home/home.module';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: (): Promise<any> => import('@home/home.module').then(({ HomeModule }): HomeModule => HomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
