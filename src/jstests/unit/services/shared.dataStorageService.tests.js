'use strict';

function checkContentRecursively(testObject, expectedObject) {
    if (expectedObject instanceof Object || expectedObject instanceof Array) {
        for (var param in expectedObject) {
            checkContentRecursively(testObject[param], expectedObject[param]);
        }
    } else if (!testObject && !expectedObject) {
        expect(1).toBe(1);
    } else {
        expect(testObject).toBe(expectedObject);
    }
}

function checkLatestSetBroadcastArgs(expectedVariable, expectedNewValue, expectedOldValue, rs) {
    var args = getLatestBroadcastCall("dataStorageSet", rs);
    expect(args.key).toBe(expectedVariable);
    checkContentRecursively(args.newValue, expectedNewValue);
    checkContentRecursively(args.oldValue, expectedOldValue);
}

function checkLatestSessionSetBroadcastArgs(expectedVariable, expectedNewValue, expectedOldValue, rs) {
    var args = getLatestBroadcastCall("dataStorageSessionSet", rs);
    expect(args.key).toBe(expectedVariable);
    checkContentRecursively(args.newValue, expectedNewValue);
    checkContentRecursively(args.oldValue, expectedOldValue);
}
function checkLatestClearedBroadcastArgs(expectedVariable, rs) {
    getLatestBroadcastCall("dataStorageCleared", rs);
}
function checkLatestSessionClearedBroadcastArgs(expectedVariable, rs) {
    getLatestBroadcastCall("dataStorageSessionCleared", rs);
}
function getLatestBroadcastCall(broadcastName, rs) {
    var args = rs.$broadcast.calls.mostRecent().args;
    expect(args[0]).toBe(broadcastName);
    return args[1];
}

function checkLatestCall(value, spiedMethod) {
    var args = spiedMethod.calls.mostRecent().args;
    checkContentRecursively(args, value); 
}


describe('data storage tests COMMON TEST', function () {

    var $cookies, $rootScope, $window, coreDataStorageService, fakeRootScope;

    beforeEach(module("agm.core", function ($provide) {
        fakeRootScope = {
            $broadcast: jasmine.createSpy(),
            $on: jasmine.createSpy(),
            $watch: jasmine.createSpy(),
        };; 
        $provide.value('$rootScope', fakeRootScope);
    }));

    beforeEach(inject(function (_coreDataStorageService_, _$window_, _$cookies_) {
        coreDataStorageService = _coreDataStorageService_;
        $window = _$window_;
        $cookies = _$cookies_;

        coreDataStorageService.clear("abc");
        coreDataStorageService.clear("def");
        coreDataStorageService.clearSession("abc");
        coreDataStorageService.clearSession("def");

    }));

    it('should be able to use session storage and local storage', function () {
        coreDataStorageService.getAvailableStorage();
        coreDataStorageService.getAvailableSessionStorage();
        expect(coreDataStorageService.testingResult.hasCookies).toBe(true);
        expect(coreDataStorageService.testingResult.hasSessionStorage).toBe(true);
        expect(coreDataStorageService.testingResult.hasInMemoryStorage).toBe(true);
        expect(coreDataStorageService.testingResult.hasLocalStorage).toBe(true);
    });



    it('should be able to save something to local storage', function () {
        coreDataStorageService.set("abc", { a: 1, b: "TWO" });
        checkLatestSetBroadcastArgs("abc", { a: 1, b: "TWO" }, null, fakeRootScope);

        coreDataStorageService.set("def", "Just a string");
        checkLatestSetBroadcastArgs("def", "Just a string", null, fakeRootScope);

        var abc = coreDataStorageService.get("abc");
        var def = coreDataStorageService.get("def");

        checkContentRecursively(abc, { a: 1, b: "TWO" });
        expect(def).toBe("Just a string");

        coreDataStorageService.set("abc", { a: "ONE", b: 2 });
        checkLatestSetBroadcastArgs("abc", { a: "ONE", b: 2 }, { a: 1, b: "TWO" }, fakeRootScope);

        abc = coreDataStorageService.get("abc");
        checkContentRecursively(abc, { a: "ONE", b: 2 });

        coreDataStorageService.clear("abc");
        checkLatestClearedBroadcastArgs("abc", fakeRootScope);
        coreDataStorageService.clear("def");
        checkLatestClearedBroadcastArgs("def", fakeRootScope);
        abc = coreDataStorageService.get("abc");
        def = coreDataStorageService.get("def");
        expect(abc).toBe(undefined);
        expect(def).toBe(undefined);
    });

    it('should be able to save something to session storage', function () {
        var args = null;
        var broadcastMessage = 0;

        coreDataStorageService.setSession("abc", { a: 1, b: "TWO" });
        checkLatestSessionSetBroadcastArgs("abc", { a: 1, b: "TWO" }, null, fakeRootScope);

        coreDataStorageService.setSession("def", "Just a string");
        checkLatestSessionSetBroadcastArgs("def", "Just a string", null, fakeRootScope);

        var abc = coreDataStorageService.getSession("abc");
        var def = coreDataStorageService.getSession("def");
        checkContentRecursively(abc, { a: 1, b: "TWO" });
        expect(def).toBe("Just a string");

        coreDataStorageService.setSession("abc", { a: "ONE", b: 2 });
        checkLatestSessionSetBroadcastArgs("abc", { a: "ONE", b: 2 }, { a: 1, b: "TWO" }, fakeRootScope);

        abc = coreDataStorageService.getSession("abc");
        checkContentRecursively(abc, { a: "ONE", b: 2 });

        coreDataStorageService.clearSession("abc");
        checkLatestSessionClearedBroadcastArgs("abc", fakeRootScope);
        abc = coreDataStorageService.getSession("abc");
        def = coreDataStorageService.get("def");
        expect(abc).toBe(undefined);
        expect(def).toBe(undefined);
    });

    it('session storage is not a local storage', function () {
        coreDataStorageService.set("abc", { a: 1, b: "TWO" });
        coreDataStorageService.setSession("abc", { a: "ONE", b: 2 });

        var abc1 = coreDataStorageService.get("abc");
        var abc2 = coreDataStorageService.getSession("abc");
        checkContentRecursively(abc1, { a: 1, b: "TWO" });
        checkContentRecursively(abc2, { a: "ONE", b: 2 });
        coreDataStorageService.clearSession("abc");
        checkLatestSessionClearedBroadcastArgs("abc", fakeRootScope);

        abc1 = coreDataStorageService.get("abc");
        abc2 = coreDataStorageService.getSession("abc");
        checkContentRecursively(abc1, { a: 1, b: "TWO" });
        expect(abc2).toBe(undefined);

        coreDataStorageService.clear("abc");
        checkLatestClearedBroadcastArgs("abc", fakeRootScope);
        abc1 = coreDataStorageService.get("abc");
        expect(abc1).toBe(undefined);
    });
});


describe('data storage tests NO LOCAL AND SESSION STORAGE', function () {

    var $cookies, $rootScope, $window, coreDataStorageService, fakeRootScope, fakeCookies;

    var tempCookieData = {};

    beforeEach(module("agm.core", function($provide) {
        fakeRootScope = {
            $broadcast: jasmine.createSpy(),
            $on: jasmine.createSpy(),
            $watch: jasmine.createSpy()
        };
        fakeCookies = {
            getObject: jasmine.createSpy().and.callFake(function(key) {
                return tempCookieData[key];
            }),
            putObject: jasmine.createSpy().and.callFake(function(key, value) {
                tempCookieData[key] = value;
            }),
            remove: jasmine.createSpy().and.callFake(function(key) {
                delete tempCookieData[key];
            }),
        }

        $provide.value('$cookies', fakeCookies);
        $provide.value('$rootScope', fakeRootScope);
        $provide.value('$window', {});
    }));

    beforeEach(inject(function (_coreDataStorageService_, _$rootScope_) {
        coreDataStorageService = _coreDataStorageService_;
        $rootScope = _$rootScope_;
    }));


    it('should choose cookies as second alternative', function () {
        coreDataStorageService.getAvailableStorage();
        coreDataStorageService.getAvailableSessionStorage();
        expect(coreDataStorageService.testingResult.hasCookies).toBe(true);
        expect(coreDataStorageService.testingResult.hasSessionStorage).toBe(false);
        expect(coreDataStorageService.testingResult.hasInMemoryStorage).toBe(true);
        expect(coreDataStorageService.testingResult.hasLocalStorage).toBe(false);
    });

    it('should be able to save something to COOKIES as local storage', function () {
        coreDataStorageService.set("abc", { a: 1, b: "TWO" });
        checkLatestSetBroadcastArgs("abc", { a: 1, b: "TWO" }, null, fakeRootScope);
        checkLatestCall(["abc", { a: 1, b: "TWO" }], fakeCookies.putObject); 


        coreDataStorageService.set("def", "Just a string");
        checkLatestSetBroadcastArgs("def", "Just a string", null, fakeRootScope);
        checkLatestCall(["def", "Just a string"], fakeCookies.putObject);


        var abc = coreDataStorageService.get("abc");
        checkLatestCall(["abc"], fakeCookies.getObject);
        var def = coreDataStorageService.get("def");
        checkLatestCall(["def"], fakeCookies.getObject);

        checkContentRecursively(abc, { a: 1, b: "TWO" });
        expect(def).toBe("Just a string");

        coreDataStorageService.clear("abc");
        checkLatestCall(["abc"], fakeCookies.remove);
        checkLatestClearedBroadcastArgs("abc", fakeRootScope);

        coreDataStorageService.clear("def");
        checkLatestCall(["def"], fakeCookies.remove);
        checkLatestClearedBroadcastArgs("def", fakeRootScope);
        abc = coreDataStorageService.get("abc");
        def = coreDataStorageService.get("def");
        expect(abc).toBe(undefined);
        expect(def).toBe(undefined);
    });
});

