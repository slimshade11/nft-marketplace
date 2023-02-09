import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from '@profile/profile-routing.module';
import { ProfileViewComponent } from '@profile/profile-view/profile-view.component';
import { PRIMENG_UI } from '@common/primeng-ui/primeng-ui';

const declarations: any[] = [ProfileViewComponent];
const imports: any[] = [CommonModule, ProfileRoutingModule, ...PRIMENG_UI];

@NgModule({ declarations, imports })
export class ProfileModule {}
