'use strict';

describe('test chart filter security controller', function () {

    var $provide;

    beforeEach(module('agmp.chart', function (_$provide_) {
        $provide = _$provide_;

    }));

    var ctrl, filterDescription, $uibModal,
        coreConfigService, sProductService, deferred,
        pChartProductLoaderService,
        pChartRenderingUtilsService, product, renderer, pChartService,
        sMarketEntitlementService;
    
    beforeEach(inject(function ($controller, $rootScope, $q) {
        deferred = $q.defer();

        renderer = {
            seriesParams: [],
            ready: jasmine.createSpy()
        };
        
        $provide.value('sContentfulWrapper', {
            getContentful: function () {
                return {
                    createClient: jasmine.createSpy().and.returnValue({
                        getEntries:function() {
                            return $q.when();
                        }
                    })
                };
            }
        });

        $provide.value('coreConfigService', {
            ContentfulCms: {
                FaqSpaceId: "abc"
            },
            MarketScreener: {
                BasicScreenerTradeVenues: 'SG',
                CustomScreenerTradeVenues: 'SG,US'
            }
        });


        pChartRenderingUtilsService = {
            stxx: {
                addSeries: jasmine.createSpy(),
                chart: {
                    masterData: []
                },
                setTimeZone: jasmine.createSpy(),
                drawingObjects: {}
            },
            tradersGPSInPositionMode: function () {
                return false;
            },            
            refreshChart: jasmine.createSpy(),                        
            getChartLineRendererOrNew: jasmine.createSpy().and.returnValue(renderer),
            subscribeRealTimeData: jasmine.createSpy()
        };
        filterDescription = {
            myProducts: [],
            primaryProduct: {}
        };
        $uibModal = { open: jasmine.createSpy() };
        sProductService = {
            SearchPlottableProduct: jasmine.createSpy().and.returnValue(deferred.promise)
        };
        sMarketEntitlementService = {};

        pChartService = {
            initialProductRequest: null,
            filterDescription: filterDescription
        }

        pChartProductLoaderService = {
            addToProducts: jasmine.createSpy(),            
            removeFromProducts: jasmine.createSpy(),
        }

        var pChartFilterDescriptionService = filterDescription;
        product = {
            ProductId: 7160,
            ProductName: "OCBC",
            Symbol: "O39",
            included: false
        };

        ctrl = $controller('p.chart.SecurityControllerBase', {
            $uibModal: $uibModal,
            $scope: $rootScope.$new(),
            sProductService: sProductService,
            pChartService: pChartService,
            pChartRenderingUtilsService: pChartRenderingUtilsService,
            pChartProductLoaderService: pChartProductLoaderService,
            pChartFilterDescriptionService: pChartFilterDescriptionService,
            sMarketEntitlementService: sMarketEntitlementService
    });

    }));

    it('test search products', function () {
        var res = {
            data: {}
        };
        console.log('searching AAPL');
        var result = ctrl.searchProducts('AAPL');
        expect(sProductService.SearchPlottableProduct).toHaveBeenCalledWith('AAPL');
        deferred.resolve(res);
        result.then(function (data) {
            expect(data).toBe(res.data);
        });
    });



    it('test add to products', function () {
        ctrl.addToProducts(product);
        expect(pChartProductLoaderService.addToProducts).toHaveBeenCalledWith(product);
    });

    it('test remove from products', function () {
        ctrl.removeFromProducts(product);
        expect(pChartProductLoaderService.removeFromProducts).toHaveBeenCalledWith(product);

    });
    
});
