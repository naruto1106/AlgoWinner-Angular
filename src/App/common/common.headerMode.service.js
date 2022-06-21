agmNgModuleWrapper('agm.common')
.defineService('commonHeaderModeService', [],
	function(serviceObj, dep, tool) {
		var headerVisibilityMode = 1;
		serviceObj.setHeaderVisibilityMode = function (mode) {
			headerVisibilityMode = mode;
		}
		serviceObj.hasNoHeader=function() {
		    return headerVisibilityMode == 2 || headerVisibilityMode == 3;
		}

		serviceObj.hasFixedFloatingHeader = function () {
            return headerVisibilityMode == 4;
        }

		serviceObj.getHeaderVisibilityMode=function() {
			return headerVisibilityMode;
		}
	})