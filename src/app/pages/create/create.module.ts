import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRoutingModule } from '@create/create-routing.module';
import { NftComponent } from '@create/components/nft/nft.component';
import { PRIMENG_UI } from '@app/common/primeng-ui/primeng-ui';

const declarations: any[] = [NftComponent];
const imports: any[] = [CommonModule, CreateRoutingModule, ReactiveFormsModule, ...PRIMENG_UI];

@NgModule({
  declarations,
  imports,
})
export class CreateModule {}
