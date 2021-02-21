import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, using } from 'rxjs';

export class FileAttributes {
  private file_name: string;
  private file_size: number;
  private upload_date: Date;
  private extension: string

  constructor(file_name: string, file_size: number, upload_date: Date, extension: string) {
    this.file_name = file_name;
    this.file_size = file_size;
    this.upload_date = upload_date;
    this.extension = extension;
  }

  GetAttributes(): string[] {
    let date = new Date(this.upload_date);
    return [this.file_name, this.FormatBytes(this.file_size, 2), date.toString() , this.extension];
  }

  //sourced from the net https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript 
  FormatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}


@Injectable({
  providedIn: 'root'
})
export class UploadService {
  //VARIABLES
  private base_url = 'http://localhost:44360';
  private added_extensions = [];
  private added_files = []; 

  //ASSIGNMENTS
  constructor(private http: HttpClient) { }


  //METHODS
  // -- upload file 
  Upload(file: File): Observable<HttpEvent<any>> {
    const form_data: FormData = new FormData();
    form_data.append('file', file);
    let file_extension = file.type;

    // -- upload file to extension folder
    const request = new HttpRequest('POST', `${this.base_url}/` + file_extension, form_data, {
      reportProgress: true,
      responseType: 'json'
    });

    // -- add extension to array if the extension does not already exist in the array
    if (!this.added_extensions.includes(file_extension)) {
      this.added_extensions.push(file_extension);
    }
 
    // -- store file data
    let file_name = file.name;
    let file_size = file.size;
    let upload_date = new Date();

    let temp_file_attributes = new FileAttributes(file_name, file_size, upload_date, file_extension);
    this.added_files.push(temp_file_attributes);

    return this.http.request(request);
  }

  // -- get extensions array
  GetExtensionsArray() {
    return this.added_extensions;
  }

  // -- get attributes array
  GetFileAttributesArray() {
    return this.added_files;
  }

  // -- retrieve files
  RetrieveFiles(): Observable<any> {
    return this.http.get(`${this.base_url}/files`);
  }
}
