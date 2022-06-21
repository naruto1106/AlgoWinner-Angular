agmNgModuleWrapper('agm.common')
    .defineController("common.RainbowDonutController", [],
        function(vm, dep, tool) {
            var Math = dep.$window.Math;
            vm.name = Math.PI;
            vm.arcs = [];
            var originalColors = ["#F00", "#F40", "#F80", "#FA0", "#090", "#060", "#036", "#069", "#09C", "#306", "#609", "#90C"];
            vm.generateArcs = function(data, total) {
                var colors = vm.colors || originalColors;
                var i = 0;
                var sum = 0;
                var steps = [];
                for (i = 0; i < data.length; i++) {
                    steps.push(sum);
                    sum += data[i];
                }
                vm.arcs = [];
                if (!total) {
                    total = sum;
                }
                if (total == 0) {
                    return;
                }
                var radius = 100 - vm.thickness / 2;


                for (i = 0; i < data.length; i++) {
                    var angleFrom = 2 * Math.PI * steps[i] / total;

                    var diff = 2 * Math.PI * data[i] / total;
                    if (diff / (2 * Math.PI) > 0.9999) {
                        diff = 2 * Math.PI * 0.9999;
                    }
                    var angleTo = angleFrom + diff;
                    var x1 = radius * Math.sin(angleFrom);
                    var y1 = radius * -Math.cos(angleFrom);
                    var x2 = radius * Math.sin(angleTo);
                    var y2 = radius * -Math.cos(angleTo);
                    var isBig = diff > Math.PI ? "1" : "0";
                    var arc = { d: "", color: colors[i] };

                    arc.d = "M " + x1 + " " + y1;
                    arc.d += " A " + radius + " " + radius + " 0 ";
                    arc.d += isBig + " 1 " + x2 + " " + y2;
                    vm.arcs.push(arc);
                }
            };
            var generateData = function() {
                if (!vm.data || vm.data.length === 0) {
                    return;
                }
                vm.generateArcs(vm.data, vm.total);
            };

            tool.watch('vm.thickness', generateData);
            tool.watch('vm.colors', generateData, true);
            tool.watch('vm.data', generateData, true);
            tool.watch('vm.total', generateData);
        })
    .defineDirectiveForE('agmc-rainbow-donut', [],
        function() {
            return {
                controller: "common.RainbowDonutController",
                templateUrl: '/App/common/directives/common.rainbowDonut.html',
            };
        },
        {
            data: '=',
            total: '=',
            thickness: '=',
            width: '=',
            height: '=',
            colors: "="
        });