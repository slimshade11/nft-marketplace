import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRoutingModule } from '@create/create-routing.module';
import { CreateViewComponent } from '@create/create-view/create-view.component';
import { NftComponent } from '@create/components/nft/nft.component';

const declarations: any[] = [CreateViewComponent, NftComponent];
const imports: any[] = [CommonModule, CreateRoutingModule];

@NgModule({
  declarations,
  imports,
})
export class CreateModule {}
