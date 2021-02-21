import { Component, OnInit } from '@angular/core';
import { UploadService, FileAttributes } from 'src/app/upload/upload.service';

@Component({
  selector: 'app-view',
  styleUrls: ['./view.component.css'],
  template: `
  <body>
  <div class="row">
    <button id="view_tables_button" (click)="AddTables()">View Tables</button>
  </div>

  <div id="table_div">

  </div>

  </body>`
})

export class ViewComponent implements OnInit {

  constructor(private upload_service: UploadService) { }

  //ASSIGNMENTS
  private extensions_array = this.upload_service.GetExtensionsArray();
  private table_count = this.extensions_array.length;
  private files_uploaded = this.upload_service.GetFileAttributesArray();

  //METHODS
  ngOnInit(): void {
  }

  AddTables(): void {
    this.RemoveTables();
    let table_headings = ["File Name", "File Size", "Upload Date", "Extension"];

    this.table_count = this.extensions_array.length;
    if (this.table_count > 0) {
      for (let i = 0; i < this.table_count; i++) {
        let table_name = this.extensions_array[i];
        console.log(table_name);

        // -- create table
        let table_div = document.getElementById("table_div");
        let temp_table = document.createElement('table');
        temp_table.id = table_name;
        temp_table.className = "row";        

        // -- create headers
        let thead = temp_table.createTHead();
        let row = thead.insertRow();
        for (let x = 0; x < table_headings.length; x++) {
          let th = document.createElement('th');
          let text = document.createTextNode(table_headings[x]);
          th.appendChild(text);
          row.appendChild(th);
        }

        // -- insert metadata
        // -- insert row for each file uploaded of that extension
        for (let j = 0; j < this.files_uploaded.length; j++) { //For each uploaded file
          // -- if table_name matches file extension, insert rows
          if (table_name == this.files_uploaded[j].extension) { 
            let referenced_file  = this.files_uploaded[j];
            let referenced_file_attributes = referenced_file.GetAttributes();
            let row = thead.insertRow();
            // -- for each column
            for (let x = 0; x < table_headings.length; x++) {
              let th = document.createElement('th');
              let text = document.createTextNode(referenced_file_attributes[x]);
              th.appendChild(text);
              row.appendChild(th);
            }           
          }
        }
        table_div.appendChild(temp_table);
      } 
    }
  }

  RemoveTables(): void {
    let tables = document.getElementsByTagName("TABLE");
    for (var i = tables.length - 1; i >= 0; i -= 1)
      if (tables[i]) {
        tables[i].parentNode.removeChild(tables[i]);
      }
  }
}
