'use strict';

describe('sProductService tests', function () {
    describe('test google finance URL', function () {
        var sProductService, $window, $sce;
        beforeEach(module('agms.product', function ($provide) {
            $window = { open: jasmine.createSpy() };
            $sce = { trustAsHtml: jasmine.createSpy() };
            $provide.value('$window', $window);
            $provide.value('$sce', $sce);
        }));

        beforeEach(inject(function (_sProductService_) {
            sProductService = _sProductService_;            
        }));
    });

});
