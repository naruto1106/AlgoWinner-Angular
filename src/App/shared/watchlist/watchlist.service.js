agmNgModuleWrapper('agms.watchlist')
    .ngApp
    .service('sWatchlistService', [
        'coreServerCommunicationService',
        function(coreServerCommunicationService) {
            var path = '/api/Watchlist/';

            this.addNewWatchlist = coreServerCommunicationService.genPostFunction(path + 'CreateNewWatchlist');
            this.modifyWatchlist = coreServerCommunicationService.genPostFunction(path + 'ModifyWatchlist');
            this.deleteWatchlist = coreServerCommunicationService.genPostFunction(path + 'DeleteWatchlist');
            this.addProductToWatchlist = coreServerCommunicationService.genPostFunction(path + 'AddProductToWatchlist');
            this.deleteProductFromWatchlist = coreServerCommunicationService.genPostFunction(path + 'DeleteProductFromWatchlist');

            this.addOrUpdateNotesToWatchlistProduct = coreServerCommunicationService.genPostFunction(path + 'AddOrUpdateNotesToWatchlistProduct');

            this.getAllIndustryAvailabilityList = coreServerCommunicationService.genGetFunctionWithNVar(path + 'GetAllIndustryAvailabilityList');
            this.getWatchlistBySectorIndustries = coreServerCommunicationService.genGetFunctionWithNVar(path + 'GetWatchlistBySectorIndustries', function(args) {
                return { request: args[0] }
            });
            this.getWatchlistProductModelFromWatchlist = coreServerCommunicationService.genGetFunctionWithNVar(path + 'GetWatchlistProductModelFromWatchlist', function(args) {
                return { watchlistId: args[0], productId: args[1] };
            });
            this.getWatchlistsForUser = coreServerCommunicationService.genGetFunctionWithNVar(path + 'GetWatchlistsForUser');
            this.getProductIdsInWatchlist = coreServerCommunicationService.genGetFunctionWithNVar(path + 'GetProductIdsInWatchlist', function (args) {
                return { watchlistId: args[0] };
            });
        }
    ]);