agmNgModuleWrapper('agm.common')
    .defineService('commonAnimatorService', [], function (serviceObj, dep, tool) {
        var $window = dep.$window;
        tool.setServiceObjectProperties({
            linearTweeningMethod: function(percentage) {
                return percentage;
            },
            animatorDictionary: [],
            generateBrakeTweeningMethod: function(smoothness) {
                if (smoothness > 0.8) {
                    smoothness = 0.8;
                }
                var startingPoint = Math.sin(smoothness * Math.PI / 2);
                var divider = 1 - startingPoint;
                return function(percentage) {
                    var output = (Math.sin((smoothness + percentage * (1 - smoothness)) * Math.PI / 2) - startingPoint) / divider;
                    return output;
                }
            },
            smoothTweening: function(percentage) {
                return 0.5 - 0.5 * Math.cos(percentage * Math.PI);
            },
            animateIndefinitely: function(scope, id, updateFunc, terminationPredicate, fps, speed) {
                speed = speed || 0.1;
                var interpolateFunc = function(current, to) {
                    return current + (to - current) * speed;
                };
                var finalFunc = function(current, to) {
                    return to;
                };
                var terminated = false;
                serviceObj.killAnimation(id);
                serviceObj.animatorDictionary[id] = $window.setInterval(function () {
                    if (terminationPredicate()) {
                        serviceObj.killAnimation(id);
                        terminated = true;
                    }
                    scope.$apply(function() {
                        updateFunc(terminated ? finalFunc : interpolateFunc);
                    });
                }, 1000 / fps);
            },
            killAnimation: function(id) {
                if (serviceObj.animatorDictionary[id]) {
                    $window.clearInterval(serviceObj.animatorDictionary[id]);
                }
            },
            animateFinitely: function(scope, id, updateFunc, time, fps, tweeningMethod, onTerminated) {
                tweeningMethod = tweeningMethod || serviceObj.linearTweeningMethod;
                var progress = 0;
                var interpolateFunc = function(from, to) {
                    return from * (1 - progress) + to * progress;
                };
                var frameCount = time * fps;
                var i = 0;
                serviceObj.killAnimation(id);
                onTerminated = onTerminated || function() {
                    return false;
                };
                serviceObj.animatorDictionary[id] = $window.setInterval(function () {
                    if (i > frameCount) {
                        i = frameCount;
                        var repeat = onTerminated();
                        if (!repeat) {
                            serviceObj.killAnimation(id);
                        } else {
                            i = 0;
                        }
                    };
                    progress = tweeningMethod(i / frameCount);
                    scope.$apply(function() {
                        updateFunc(interpolateFunc);
                    });
                    i++;
                }, 1000 / fps);
            }
        });
    }
    );

