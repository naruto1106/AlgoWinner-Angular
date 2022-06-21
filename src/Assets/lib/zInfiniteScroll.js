//Copyright (C) 2015 Zam Huang.
//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var module = angular.module('zInfiniteScroll', []);

module.directive('zInfiniteScroll', ['$timeout', '$document', function ($timeout, $document) {
    return {
        scope: {
            zInfiniteScroll: '=',
            zInfiniteScrollAlternate: "=",
            hasScrolled: '=',
            inverse: '=',
            bothDirections: '=',
            scrollThreshold: '='
        },
        //restrict: 'A',
        link: function link(scope, $element, $attr) {
            var lengthThreshold = scope.scrollThreshold,
                timeThreshold = $attr.timeThreshold || 200,
                bodyScroll = scope.$eval($attr.bodyScroll) === true ? true : false,
                inverse = scope.inverse === true ? true : false,
                bothDirections = scope.bothDirections === true ? true : false,
                promise = null,
                lastScrolled = 9999,
                lastScrolledInverse = 9999,
                element = $element[0],
                scrollEvent,
                alternateScrollEvent,
                isDestorying = false;

            scope.$on('$destroy', function handleDestroyEvent() {
                isDestorying = true;
                $document.off('scroll', scrollEvent);
                if (bothDirections) $document.off('scroll', alternateScrollEvent);
            });

            lengthThreshold = parseInt(lengthThreshold, 10);
            timeThreshold = parseInt(timeThreshold, 10);

            // if user not setting the handle function, it would giving default one
            //if (!handler || !angular.isFunction(handler)) {
            //    handler = angular.noop;
            //}

            // -1 means your callback function decide when to scroll
            if (bothDirections) {
                scrollEvent = scrollBothDirections;
            } else {
                if (inverse) {
                    scrollEvent = scrollUntilDataReady;
                } else {
                    scrollEvent = scrollUntilTimeout;
                }
            }

            // if element doesn't want to set height, this would be helpful.
            if (bodyScroll) {
                $document.on('scroll', scrollEvent);
                element = $document[0].documentElement;
            } else {
                $element.on('scroll', scrollEvent);
            }

            // it will be scrolled once your data loaded
            function scrollUntilDataReady() {
                if (isDestorying) return;

                var scrolled = calculateBarScrolled();
                // if we have reached the threshold and we scroll up
                if (scrolled < lengthThreshold && (scrolled - lastScrolled) < 0 && (element.scrollHeight >= element.clientHeight)) {
                    var originalHeight = element.scrollHeight;
                    var applyPromise = scope.$apply(scope.zInfiniteScrollAlternate);
                    if (applyPromise) {
                        applyPromise.then(function () {
                            $timeout(function () {
                                element.scrollTop = element.scrollHeight - originalHeight;
                            });
                        });
                        scope.hasScrolled = true;
                    }

                }
                lastScrolled = scrolled;
            }

            function scrollUntilTimeout() {
                if (isDestorying) return;
                var scrolled = calculateBarScrolled();

                // if we have reached the threshold and we scroll down
                if (scrolled < lengthThreshold && (scrolled - lastScrolled) < 0 && (element.scrollHeight >= element.clientHeight)) {
                    // if there is already a timer running which has no expired yet we have to cancel it and restart the timer
                    if (promise !== null) {
                        $timeout.cancel(promise);
                    }
                    promise = $timeout(function () {
                        //handler();
                        scope.zInfiniteScroll();
                        promise = null;
                    }, timeThreshold);
                }
                lastScrolled = scrolled;
            }

            function scrollBothDirections() {
                if (isDestorying) return;

                var inverseScrolled = calculateBarScrolledWithDirection(true);
                var scrolled = calculateBarScrolledWithDirection(false);
                // if we have reached the threshold and we scroll up
                if (inverseScrolled < lengthThreshold && (inverseScrolled - lastScrolledInverse) < 0 && (element.scrollHeight >= element.clientHeight)) {
                    var originalHeight = element.scrollHeight;
                    var applyPromise = scope.$apply(scope.zInfiniteScrollAlternate);
                    if (applyPromise) {
                        applyPromise.then(function () {
                            $timeout(function () {
                                element.scrollTop = element.scrollHeight - originalHeight;
                            });
                        });
                        scope.hasScrolled = true;
                    }
                }else if (scrolled < lengthThreshold && (scrolled - lastScrolled) < 0 && (element.scrollHeight >= element.clientHeight)) {
                    // if there is already a timer running which has no expired yet we have to cancel it and restart the timer
                    if (promise !== null) {
                        $timeout.cancel(promise);
                    }
                    promise = $timeout(function () {
                        //handler();
                        scope.zInfiniteScroll();
                        promise = null;
                    }, timeThreshold);
                }
                lastScrolledInverse = inverseScrolled;
                lastScrolled = scrolled;

            }

            // for compatibility for all browser
            function calculateBarScrolled() {
                var scrollTop;
                if (bodyScroll) {
                    scrollTop = $document[0].documentElement.scrollTop || $document[0].body.scrollTop;
                } else {
                    scrollTop = element.scrollTop;
                }
                return inverse ? scrollTop : element.scrollHeight - (element.clientHeight + scrollTop);
            }

            function calculateBarScrolledWithDirection(inv) {
                var scrollTop;
                if (bodyScroll) {
                    scrollTop = $document[0].documentElement.scrollTop || $document[0].body.scrollTop;
                } else {
                    scrollTop = element.scrollTop;
                }
                return inv ? scrollTop : element.scrollHeight - (element.clientHeight + scrollTop);
            }
        }
    };
}]);