agmNgModuleWrapper('agmp.datamart')
	.defineService('pDatamartStatesService', ["coreConfigService"],
		function (serviceObj, dep, tool) {

			var coreConfigService = dep.coreConfigService;

			function getAssetClasses() {
				if (serviceObj.dataMartFilter && serviceObj.dataMartFilter.selectedTradeVenue === "SG") {
					return coreConfigService.MarketScreener.AssetClasses.split(',');
				} else {
					return ["Stocks & ETFs"];
				}
			}

			function getDefaultPriceRanges() {
				return [
					{
						from: null,
						to: 0.1,
						checked: true
					}, {
						from: 0.1,
						to: 0.5,
						checked: true
					},
					{
						from: 0.5,
						to: 2,
						checked: true
					},
					{
						from: 2,
						to: 10,
						checked: true
					}, {
						from: 10,
						to: 50,
						checked: true
					}, {
						from: 50,
						to: null,
						checked: true
					}
				];
			}

			function getDefaultPeRatios() {
				return [
					{
						from: null,
						to: 0,
						checked: true
					},
					{
						from: 0,
						to: 1,
						checked: true
					}, {
						from: 1,
						to: 5,
						checked: true
					},
					{
						from: 5,
						to: 10,
						checked: true
					},
					{
						from: 10,
						to: 20,
						checked: true
					},
					{
						from: 20,
						to: 50,
						checked: true
					},
					{
						from: 50,
						to: null,
						checked: true
					}
				];
			}

			function getDefaultEarningGrowths() {
				return [
					{
						from: null,
						to: 0,
						checked: true
					},
					{
						from: 0,
						to: 1,
						checked: true
					}, {
						from: 1,
						to: 5,
						checked: true
					},
					{
						from: 5,
						to: 10,
						checked: true
					},
					{
						from: 10,
						to: 20,
						checked: true
					},
					{
						from: 20,
						to: 50,
						checked: true
					},
					{
						from: 50,
						to: null,
						checked: true
					}
				];
			}

			function getDefaultMarketCaps() {
				return [
					{
						name: 'Small',
						checked: true
					}, {
						name: 'Medium',
						checked: true
					}, {
						name: 'Large',
						checked: true
					}
				];
			}

			function getDefaultVolumeCondition() {
				return [
					{
						toLabel: "500 K",
						to: 500000,
						checked: true
					},
					{
						fromLabel: "500 K",
						toLabel: "1 M",
						from: 500000,
						to: 1000000,
						checked: true
					},
					{
						fromLabel: "1 M",
						from: 1000000,
						checked: true
					}
				];
			}

			function getDefaultFundamentalSelections() {
				return {
					peRatios: getDefaultPeRatios(),
					earningGrowths: getDefaultEarningGrowths(),
					priceRanges: getDefaultPriceRanges(),
					marketCaps: getDefaultMarketCaps()
				}
			}

			function getDefaultFundamentalWithVolumeSelections() {
				return {
					peRatios: getDefaultPeRatios(),
					earningGrowths: getDefaultEarningGrowths(),
					priceRanges: getDefaultPriceRanges(),
					marketCaps: getDefaultMarketCaps(),
					volumeConditions: getDefaultVolumeCondition()
				}
			}

			function getPriceAndVolumeFilterContent() {
				return {
					peRatios: [],
					marketCaps: [],
					earningGrowths: [],
					priceRanges: getDefaultPriceRanges(),
					volumeConditions: getDefaultVolumeCondition()
				}
			}

			//this service is for sorting objects for data mart only, don't share this globally
			tool.setServiceObjectProperties({
				getDefaultFundamentalWithVolumeSelections: getDefaultFundamentalWithVolumeSelections,
				getPriceAndVolumeFilterContent: getPriceAndVolumeFilterContent,
				dataMartFilter: {
					selectedSector: "",
					selectedDateRange: "Latest Trading Day",
					mode: 'Custom',
					datamartSelections: [],
					allIndustriesChecked: true,
					toDate: new Date(moment().endOf('day').toDate()),
					fromDate: new Date(moment().startOf('day').toDate()),
					minDate: null, // moment(new Date(2016, 0, 1)).format(),
					treeStructure: [],
					selectedTradeVenue: "SG",
					selectedAssetClass: "Stocks & ETFs",
					assetClasses: getAssetClasses(),
					customScreenerTradeVenues: coreConfigService.MarketScreener.CustomScreenerTradeVenues.split(','),
					fundamental: getDefaultFundamentalSelections(),
					usePredefinedList: false,
					predefinedCategory: null
				}
			});
		});