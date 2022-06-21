agmNgModuleWrapper('agms.chart')
    .defineService("pChartColoringService", [],
        function (serviceObj, dep, tool) {
            var colorIndex = 0;

            // this color palette suits both dark and light theme. Test it out here: https://jsfiddle.net/1aay903n/
            var colorPalette = [
               "#8bc24b", // green-ish        
                "#4458ee", //blue-ish
                "#febf07", // mustard
                "#af8f69", //brown-ish
                "#9b32be", //lilac
                "#32b3b3", // aqua-ish
                "#2097f3", // blue-ish
                "#e31f66" // red-ish, maroon            
            ];

            var backupColors = [
                "#a0887e",
                "#f9ea3e",
                "#9e26b0",
                "#e31f1f",
                "#8bc24b",
                "#2ea0b1",
                "#00f59c",
                "#ff4c4e",
                "#87BFA8",
                "#4ab151",
                "#e31f66",
                "#775545",
                "#a1af1e",
                "#2097f3",
                "#1af937",
                "#af8f69",
                "#683ab9",
                "#febf07",
                "#43c4ff",
                "#607e8d",
                "#3f51b6",
                "#0519f7",
                "#01958a",
                "#fd7a58"
            ];

            var reservedColors = angular.copy(colorPalette);

            function getNextColor() {
                colorIndex = colorIndex || 0;
                colorIndex++;
                colorIndex %= colorPalette.length;
                return colorPalette[colorIndex];
            }

            function getNextColorAndReserve() {
                if (reservedColors.length === 0) {
                    // this situation should not happen. This means we either does not release the color correctly, or the requirement changes and we need more than 9 colors
                    reservedColors = backupColors.concat(colorPalette);
                }
                return reservedColors.shift();
            }

            function releaseReservedColor(color) {
                if (color &&
                    !_.includes(reservedColors, color) &&
                     _.includes(colorPalette, color)) {
                    reservedColors.push(color);
                }
            }

            function resetReservedColors() {
                reservedColors = angular.copy(colorPalette);
            }

            tool.setServiceObjectProperties({
                getNextColor: getNextColor,
                getNextColorAndReserve: getNextColorAndReserve,
                releaseReservedColor: releaseReservedColor,
                resetReservedColors: resetReservedColors
            });
        });