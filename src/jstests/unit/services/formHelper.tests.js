'use strict';

describe('form helper tests', function () {
    beforeEach(module('agm.common'));

    var encoder;
    beforeEach(inject(function (_commonFormUrlEncoderFactory_) {
        encoder = _commonFormUrlEncoderFactory_;
    }));

    it('should encode login model', function() {
        var result = encoder({ username: 'theUserName', password: 'thePassword', grant_type: 'password' });
        expect(result).toBe('username=theUserName&password=thePassword&grant_type=password');
    });
});
