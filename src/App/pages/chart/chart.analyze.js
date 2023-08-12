agmNgModuleWrapper('agmp.chart')
    .defineController('p.chart.AnalyzeController',
    ['coreConfigService',
        'pChartService',
        'pChartFilterDescriptionService',
        'pChartViewTemplateService',        
        'pChartDatamartService'],
    function (vm, dep, tool) {
        var coreConfigService = dep.coreConfigService,            
            pChartViewTemplateService = dep.pChartViewTemplateService,
            pChartFilterDescriptionService = dep.pChartFilterDescriptionService,
            pChartService = dep.pChartService,
            pChartDatamartService = dep.pChartDatamartService;
            Duplicate_location = dep.$location.$$absUrl;

        var filterDescription = pChartFilterDescriptionService;

        function hasAlgoChartBundle() {
            return pChartService.hasAlgoChartBundle;
        }

        function isInvalidDatamartEvent(branch) {
            if (filterDescription.primaryProduct && filterDescription.primaryProduct.TradeVenueLoc) {
                var events = branch.datamartRef.Dimensions.getEventTypes({
                    Market: filterDescription.primaryProduct.TradeVenueLoc
                });

                if (events.length > 0) {
                    return null;
                }
                return "Not Available for " + filterDescription.primaryProduct.TradeVenueLoc + " Markets";
            }
            return "";
        }

        var handleDatamartInitialSelection = function () {
            if (pChartService.initialProductRequest.hasProductSpecified && pChartService.initialProductRequest.presetChartMode === "AlgoMart" && pChartService.initialProductRequest.modeParam) {
                var algoFeedEventTypeId = parseInt(pChartService.initialProductRequest.modeParam);
                pChartDatamartService.adjustDatamartTreeFromIds([algoFeedEventTypeId]);
                treeChanged();
            }
        };

        function treeChanged() {            
            pChartDatamartService.rebindDatamartEvents();
        }

        function loadDataMartSelection() {
            return pChartDatamartService.loadDataMartSelection().then(function (tree) {
                filterDescription.datamart.treeStructure = tree;
            });
        }

        function loadTemplateList($event) {
            // this is to prevent the uib-dropdown to react on the button click as "close outside"
            $event.preventDefault();
            $event.stopPropagation();
            tool.broadcast('isTemplateDropdownOpenChanged');
        }
        function Duplicate_hidden(){
            value =Duplicate_location.search('optionpi#/charts') ;
            if( value > 0){
                return false;
            } else{
                return true;
            }
        }

        tool.initialize(function () {

            tool.setVmProperties({
                hasAlgoChartBundle: hasAlgoChartBundle,
                loadTemplateList: loadTemplateList,
                coreConfigService: coreConfigService,
                pChartService: pChartService,
                filterDescription: filterDescription,
                treeChanged: treeChanged,
                saveCurrentView: pChartViewTemplateService.saveCurrentView,
                isInvalidDatamartEvent: isInvalidDatamartEvent,
                Duplicate_hidden: Duplicate_hidden,

            });

            tool.on("onBarSizeChanges", function () {
                treeChanged();
            });
            loadDataMartSelection().then(function () {
                handleDatamartInitialSelection();
            });
        });
    })
    .defineDirectiveForE('agmp-chart-analyze', [], function () {
        return {
            templateUrl: '/App/pages/chart/chart.analyze.html',
            controller: 'p.chart.AnalyzeController'
        }
    }, {

    });