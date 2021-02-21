import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload/upload.component';
import { ViewComponent } from './view/view.component';
import { FileAttributes } from './upload.service';



@NgModule({
  declarations: [UploadComponent, ViewComponent],
  imports: [
    CommonModule,
    FileAttributes
  ]
})
export class UploadModule { }
