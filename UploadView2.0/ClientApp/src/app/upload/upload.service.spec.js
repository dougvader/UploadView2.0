"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var upload_service_1 = require("./upload.service");
describe('UploadService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(upload_service_1.UploadService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=upload.service.spec.js.map