agmNgModuleWrapper('agm.common')
    .defineService('commonCoordinateComputerService', [], function(serviceObj, dep, tool) {
        
        serviceObj.generateComputer = function(getHorizontalRange, getVerticalRange, getSvgSize) {
            var computer = {};
            computer.getHorizontalRange = getHorizontalRange;
            computer.getVerticalRange = getVerticalRange;
            computer.getSvgSize = getSvgSize;
            computer.toX = function(x) {
                return computer.toW(x - getHorizontalRange().from);
            };
            computer.toY = function(y) {
                return computer.toH(getVerticalRange().to - y);
            };
            computer.toW = function(w) {
                var horizontalRange = getHorizontalRange();
                var range = horizontalRange.to - horizontalRange.from;
                return Math.round(computer.toXPercentage(w / range));
            };
            computer.toH = function(h) {
                var verticalRange = getVerticalRange();
                var range = verticalRange.to - verticalRange.from;
                return Math.round(computer.toYPercentage(h / range));
            };
            computer.toXPercentage = function(x) {
                return Math.round(x * getSvgSize().width);
            };
            computer.toYPercentage = function(y) {
                return Math.round(y * getSvgSize().height);
            };
            return computer;
        }
    })
    .defineController('common.CoordinateController',[],function(vm,dep,tool) {
        
    })
    .defineDirectiveForE('agmc-coordinate', ["commonCoordinateComputerService"], function (dep, tool) {


            return {
                controller:'common.CoordinateController',
                template:
                    '<svg  class="ng-coordinate" width="100%" height="100%">' +
                        '<g ng-repeat="item in vm.ngItemsSource track by $index" ng-include="item.templateId"></g>' +
                        '</svg>'
            };
        },
        {
            ngHorizontalRange: '=',
            ngVerticalRange: '=',
            ngItemsSource: '=',
            onViewChanged: '&'
        }, function(scope, element, attrs, controller, transcludeFn, dep, tool) {
            var $window = dep.$window,
                commonCoordinateComputerService = dep.commonCoordinateComputerService;
            var vm = scope.vm;
            vm.Math = $window.Math;
            vm.svgSize = {
                width: 1,
                height: 1
            };
            tool.watch('vm.ngHorizontalRange', function() {
                tool.emit('horizontalRangeChanged', vm.ngHorizontalRange);
            });
            tool.on('horizontalRangeChanged', function(arg) {

            });
            vm.coordinateComputer = commonCoordinateComputerService.generateComputer(
                function() {
                    return vm.ngHorizontalRange;
                },
                function() {
                    return vm.ngVerticalRange;
                },
                function() {
                    return vm.svgSize;
                });
            var window = angular.element($window);
            var svgElement = angular.element(element);

            var getSvgSize = function() {
                return {
                    width: svgElement.width(),
                    height: svgElement.height()
                };
            };
            window.on('resize', function() {
                tool.timeout(function() {
                    vm.svgSize = getSvgSize();
                    if (vm.onViewChanged) {
                        vm.onViewChanged({ svgSize: vm.svgSize });
                    }
                }, 100);
            });
            $window.setInterval(function() {
                var svgSize = getSvgSize();
                if (svgSize.width != vm.svgSize.width || svgSize.height != vm.svgSize.height) {
                    tool.timeout(function() {
                        if (vm.onViewChanged) {
                            vm.onViewChanged({ svgSize: vm.svgSize });
                        }
                        vm.svgSize = svgSize;
                    }, 100);
                }
            }, 200);

        }
    )
    .ngApp
    .run([
        "$templateCache", function($templateCache) {
            $templateCache.put('genericPath',
                '<path ng-attr-d="{{item.drawPath(vm.coordinateComputer)}}"  style="shape-rendering: crispEdges;" ng-attr-fill="{{item.style.fill}}" ng-attr-stroke="{{item.style.stroke}}" />');
        }
    ]);