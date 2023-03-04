import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRoutingModule } from '@create/create-routing.module';
import { NftComponent } from '@create/components/nft/nft.component';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

const declarations: any[] = [NftComponent];
const imports: any[] = [CommonModule, CreateRoutingModule, ReactiveFormsModule, FileUploadModule, InputTextModule, InputTextareaModule];

@NgModule({ declarations, imports })
export class CreateModule {}
