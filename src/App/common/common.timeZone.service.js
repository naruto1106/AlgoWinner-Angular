agmNgModuleWrapper('agm.common')
	.defineService('commonTimeZoneService', [],
	function (serviceObj, dep, tool) {

	    function getTimeZoneOffset(tradeVenue) {
	        var utcOffset = '+0800';

	        switch (tradeVenue) {
	            case 'US':
	                utcOffset = '-0500';
	                break;
	            case 'SG':
	                utcOffset = '+0800';
	                break;
	        }

	        return utcOffset;
	    }

	    function getTimeZoneMapping(tradeVenue) {
	        switch (tradeVenue) {
                case 'SG':
                case 'MY':
	                return "Asia/Singapore";
	            case 'HK':
	                return "Asia/Hong_Kong";
	            case 'CHN':
	                return "Asia/Shanghai";
	            case 'US':
	                return "America/New_York";
	        }
	        return "Europe/London";
	    }

	    function getMarketTimeZoneTime(time, market) {
	        var timezone = getTimeZoneMapping(market);
	        var convertedTime = moment(time).tz(timezone).format('LLLL z');
	        return convertedTime;
	    }

	    function getMarketTimeZoneMoment(time, market) {
	        var timezone = getTimeZoneMapping(market);
	        return moment(time).tz(timezone);
        }

	    function getDateWithZoneChanges(date, countryCode, extraBeforeFormatFunc) {
	        var m = moment(date);
	        var m2 = extraBeforeFormatFunc ? extraBeforeFormatFunc(m) : m;
	        var timezone = getTimeZoneMapping(countryCode);
	        return m2.format('YYYY-MM-DDTHH:mm:ss') + moment.tz(timezone).format('ZZ');
	    }
        
	    tool.setServiceObjectProperties({
	        getTimeZoneMapping: getTimeZoneMapping,
	        getMarketTimeZoneTime: getMarketTimeZoneTime,
	        getMarketTimeZoneMoment: getMarketTimeZoneMoment,
            getTimeZoneOffset: getTimeZoneOffset,
            getDateWithZoneChanges: getDateWithZoneChanges
	    });
	})