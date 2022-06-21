agmNgModuleWrapper('agm.common')
	.defineService('commonEnumResolverService', [],
	function (serviceObj, dep, tool) {
	    function getAssetTypeId(type) {
	        switch (type) {
	            case "Stocks & ETFs":
	                return 1;
	            case "Forex":
	                return 2;
	            case "Tradeable Indices":
	                return 3;
	            case "Commodities":
	                return 4;
	            case "Indices":
	                return 5;
	            case "Undefined":
	                return 0;
	        }
	        return 1;
	    }

	    function getTradeVenueLocId(venue) {
	        switch (venue) {
	            case "US":
	                return 1;
	            case "SG":
	                return 2;
	            case "UK":
	                return 3;
	            case "AU":
	                return 4;
	            case "ID":
	                return 5;
	            case "HK":
	                return 6;
	            case "CHN":
                    return 7;
	            case "MY":
	                return 8;
	            case "OTC (Oanda)":
	                return 20;
	            case "Undefined":
	                return 0;
	        }
	        return 2;
	    }

	    tool.setServiceObjectProperties({
	        getAssetTypeId: getAssetTypeId,
	        getTradeVenueLocId: getTradeVenueLocId
	    });
	})