import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { UploadService } from 'src/app/upload/upload.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  //VARIABLES
  progress = 0;
  output = '';
  files_selected : FileList;
  working_file: File;
  file_dump: Observable<any>;

  //ASSIGNMENTS
  constructor(private upload_service : UploadService) { }

  //METHODS
  ngOnInit(): void {
  }

  // -- stores file selected
  FileSelect(event: any): void {
    this.files_selected = event.target.files;
  }

  // -- begin file upload
  Upload(): void {
    this.progress = 0;

    if (this.files_selected) {
      const file: File | null = this.files_selected.item(0);

      if (file) {
        this.working_file = file;

        this.upload_service.Upload(this.working_file).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.output = event.body.message;
              this.file_dump = this.upload_service.RetrieveFiles();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.output = err.error.message;
            } else {
              this.output = 'Could not upload the file!';
            }

            this.working_file = undefined;
          });
        this.Success(file.name);
      }

      this.files_selected = undefined;
    }
  }

  // -- Display that file was successfully uploaded
  Success(file_name: string): void {
    let div = document.getElementById("main");
    let label = document.createElement('label');
    label.className = "col-8";
    label.textContent = "File " + file_name + " successfully uploaded";
    div.appendChild(label);
  }
}
