import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from '@profile/profile-routing.module';
import { ProfileViewComponent } from '@profile/profile-view/profile-view.component';

const declarations: any[] = [ProfileViewComponent];
const imports: any[] = [CommonModule, ProfileRoutingModule];

@NgModule({ declarations, imports })
export class ProfileModule {}
