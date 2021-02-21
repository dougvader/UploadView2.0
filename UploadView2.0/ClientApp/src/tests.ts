import { UploadService } from 'src/app/upload/upload.service';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';

// -- Please note, I spent time trying to figure out how to test HTTP Events and Requests
// -- but I became incredibly confused.  I am still new to Angular and .Net so getting 
// -- this far was tricky for me. Unit testing is something I need to spend more time on, 
// -- as I haven't practiced it since university. Apologies for not being able to provide a
// -- complete solution. 


let mock_file = 'src\assets\dougbrennanlogo.jpg';

/*describe('Upload', function () {
  it('should upload a file', function () {
    const result = UploadService.Upload(mock_file);
    expect(result).toBe(HttpRequest);
  });

});*/



