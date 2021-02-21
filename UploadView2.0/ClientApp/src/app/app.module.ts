import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload/upload.component';
import { ViewComponent } from './upload/view/view.component';
import { FileAttributes } from 'src/app/upload/upload.service';



@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
