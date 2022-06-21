agmNgModuleWrapper('agms.chart')
    .defineService('pChartFundamentalHelperService',
        ['pChartCmsContentLoader',
            'pChartFilterDescriptionService',
            'sDatamartFundamentalDataService',
            'pChartColoringService',
            'pChartRenderingUtilsService'],
        function (serviceObj, dep, tool) {

            var coreNotificationService = dep.coreNotificationService,
                pChartCmsContentLoader = dep.pChartCmsContentLoader,
                pChartColoringService = dep.pChartColoringService,
                sDatamartFundamentalDataService = dep.sDatamartFundamentalDataService,
                pChartFilterDescriptionService = dep.pChartFilterDescriptionService,
                pChartRenderingUtilsService = dep.pChartRenderingUtilsService;
            var filterDescription = pChartFilterDescriptionService;

            var fundamentalMapping = {};
            var pfGroupedByFundamentals = [];
            var fundamentalsKind = [];
            var fundamentalAvailabilityMessages = [];

            // --- EVENT HANDLERS 
            function renderAllFundamentals(forceRerender) {
                if (!filterDescription || !filterDescription.addedFundamentals || !filterDescription.productFundamentals) {
                    return;
                }

                filterDescription.productFundamentals.forEach(function (pf) {
                    renderFundamentals(pf, forceRerender);
                });

                var activeRenderer = [];
                filterDescription.addedFundamentals.forEach(function (fund) {
                    activeRenderer[getRendererName(fund.name)] = true;
                });

                fundamentalsKind.forEach(function (fund) {
                    var isActiveRenderer = activeRenderer[getRendererName(fund.name)] || false;
                    if (isActiveRenderer) {
                        var shouldShareYAxis = (fund.name === "FiftyTwoWeeksHigh" || fund.name === "FiftyTwoWeeksLow");
                        var renderer = pChartRenderingUtilsService.getChartLineRendererOrNew(getRendererName(fund.name), !shouldShareYAxis);
                        renderer.ready();
                    }
                });
            }

            function onBarSizeChanges() {
                if (!checkBarSize()) {
                    _.each(filterDescription.addedFundamentals, function (fund) { fund.included = false; });
                    _.each(filterDescription.productFundamentals, function (pf) { pf.included = false; });
                    syncAndRender();
                }
                tool.log("Rerender request is made");
            }

            function removeProductFundamentalIfHighlighted() {
                function removeBasedOnHighlightedSeries(renderer) {
                    var highlighted = pChartRenderingUtilsService.getHighlightedSeries(renderer);
                    if (highlighted) {
                        filterDescription.productFundamentals.forEach(function (pf) {
                            pf.included = pf.included && pf.legend !== highlighted.field;
                        });
                    }
                }

                fundamentalsKind.forEach(function (fund) {
                    var renderer = pChartRenderingUtilsService.getChartLineRendererOrNew(getRendererName(fund.name), true);
                    removeBasedOnHighlightedSeries(renderer);
                });
                var productRenderer = pChartRenderingUtilsService.getChartLineRendererOrNew('products');
                removeBasedOnHighlightedSeries(productRenderer);

                onProductFundamentalsChanged();
            }

            function resetProductFundamentals() {
                filterDescription.addedFundamentals = [];
                syncAndRender();
            }

            function onProductChanged(product) {
                //syncProductFundamentalVisibilityFromProduct();
                // Cleaning up fundamental
                if (filterDescription.myProducts.indexOf(product) === -1) {
                    filterDescription.productFundamentals.filter(function (pf) {
                        return pf.product === product;
                    })
                        .map(function (pf) {
                            pf.renderer.removeSeries(pf.legend);
                        });
                }
                syncAndRender();
            }

            // --- SCOPE FUNC
            function shouldShowFundamentalLabel(pf) {
                var matchingFundamental = filterDescription.addedFundamentals.filter(function (fund) {
                    return fund.name === pf.fundamentalName;
                });
                return matchingFundamental.length > 0 && matchingFundamental[0].included;
            }

            function getFundamentalAvailabilityMessages() {
                return fundamentalAvailabilityMessages;
            }

            function collectGarbage() {
                filterDescription.addedFundamentals = filterDescription.addedFundamentals.filter(function (fund) {
                    return !fund.removed;
                });
                filterDescription.productFundamentals = filterDescription.productFundamentals.filter(function (pf) {
                    return !pf.removed;
                });
            }

            function removeFromFundamentals(fundamentalToRemove) {
                filterDescription.addedFundamentals.forEach(function (fund) {
                    if (fund.name === fundamentalToRemove.name) {
                        fund.removed = true;
                    }
                });
                syncAndRender();
            }

            function searchFundamentals(keyword) {
                keyword = keyword.toLowerCase();
                return fundamentalsKind.filter(function (fk) {
                    return _.includes(fk.name.toLowerCase(), keyword) || _.includes(fk.displayName.toLowerCase(), keyword);
                });
            }

            function toggleFundamentalActivation(fund) {
                if (!fund.included && !checkCanIncludeNewFundamental(fund.name)) {
                    coreNotificationService.notifyError("Number of Fundamentals Exceeded", "You can plot at most 2 fundamentals");
                    return;
                }

                if (!checkBarSize()) {
                    coreNotificationService.notifyError("Fundamentals are not available", "Fundamentals are available for daily, weekly or monthly chart");
                    return;
                }

                setToggleFundamentalActivation(fund, !fund.included);
            }

            function openFundamentalPanel() {
                //if (!checkBarSize()) {
                //    coreNotificationService.notifyError("Fundamentals are not available", "Fundamentals are available for daily, weekly or monthly chart");
                //    return tool.reject();
                //}

                var modal = tool.openModalByDefinition('p.chart.FundamentalFilterPanelController', {
                    fundamentalsKind: fundamentalsKind,
                    includedFundamentals: filterDescription.addedFundamentals
                });
                return modal.result.then(function (fund) {
                    addToFundamentalWithChecks(fund);
                    return fund;
                });

            }

            function checkBarSize() {
                var barSize = filterDescription.barSize;
                if (barSize && (barSize.indexOf("Min") !== -1 || barSize.indexOf("H") !== -1)) {
                    return false;
                }
                return true;
            }

            function checkCanIncludeNewFundamental(fundamentalName) {
                var includedFundamentals = _(getIncludedFundamentals())
                    .map('name').concat(fundamentalName).uniq().value();
                return includedFundamentals.length <= 2;
            }

            function setToggleFundamentalActivation(fund, flag) {
                fund.included = flag;
                if (fund.name in pfGroupedByFundamentals) {
                    pfGroupedByFundamentals[fund.name].forEach(function (pf) {
                        pf.included = fund.included;
                        if (pf.included) {
                            pf.color = pChartColoringService.getNextColorAndReserve();
                        } else {
                            pChartColoringService.releaseReservedColor(pf.color);
                        }
                    });
                }
                renderAllFundamentals();
                onProductFundamentalsChanged();
            }

            function canFundamentalBeAdded() {
                var validBarSize = checkBarSize();
                var validNumber = getIncludedFundamentals().length < 2;
                return validBarSize && validNumber;
            }

            function addToFundamentalWithChecks(fund) {
                var isValidToAdd = checkFundamental(fund);
                if (isValidToAdd) {
                    fund.included = canFundamentalBeAdded();
                    if (fund.removed) {
                        fund.removed = false;
                    }
                    addToFundamentals(fund);
                    return true;
                } else {
                    coreNotificationService.notifyError("Fundamentals Already Added", "You have already added " + fund.displayName + ".");
                    return false;
                }

            }

            function addToFundamentals(fund) {
                filterDescription.addedFundamentals.push(fund);
                syncAndRender();
            }

            function getFriendlyName(rendererName) {
                return fundamentalMapping[rendererName];
            }

            // --- LOCAL SERVICE FUNC                    
            function getIncludedFundamentals() {
                return filterDescription.addedFundamentals.filter(function (f) {
                    return f.included;
                });
            }

            function hasBeenRenderedIn(renderer, legendString) {
                return renderer.seriesParams.filter(function (u) {
                    return u.field === legendString;
                }).length > 0;
            }

            function renderFundamentals(pf, forceRerender) {

                function renderOnRenderer(renderer) {
                    checkFundamentalValidity(pf.product.ProductId, pf.fundamentalName).then(function (isValid) {
                        onProductFundamentalsChanged({
                            ProductId: pf.product.ProductId,
                            FundamentalType: pf.fundamentalName,
                            IsConsideredInvalid: !isValid
                        });
                        if (isValid) {
                            pChartRenderingUtilsService.stxx.addSeries(pf.legend, {
                                display: pf.legend,
                                data: {
                                    useDefaultQuoteFeed: true
                                },
                                symbolObject: {
                                    fundamental: pf.fundamentalName,
                                    product: pf.product,
                                    symbol: pf.legend
                                },
                                width: 1,
                                isComparison: filterDescription.normalizeToPercentage,
                                shareYAxis: filterDescription.normalizeToPercentage || !renderer.params.yAxis
                            }, function () {
                                renderer.attachSeries(pf.legend, pf.color);
                                renderer.ready();
                            });
                            tool.log("RENDERING " + pf.legend + " on RENDERER " + renderer.params.name);
                        }
                    });
                }

                var shouldShareYAxis = (pf.fundamentalName === "FiftyTwoWeeksHigh" || pf.fundamentalName === "FiftyTwoWeeksLow");
                var productRenderer = pChartRenderingUtilsService.getChartLineRendererOrNew('products');
                var separateRenderer = pChartRenderingUtilsService.getChartLineRendererOrNew(getRendererName(pf.fundamentalName), true && !shouldShareYAxis);
                var targetRenderer = (filterDescription.normalizeToPercentage || shouldShareYAxis) ? productRenderer : separateRenderer;
                var legendString = pf.legend;
                pf.renderer = targetRenderer;

                var hasBeenRenderedInProductRenderer = hasBeenRenderedIn(productRenderer, legendString);
                var hasBeenRenderedInSeparateRenderer = hasBeenRenderedIn(separateRenderer, legendString);
                var hasBeenRenderedToTarget = hasBeenRenderedIn(targetRenderer, legendString);

                var mustBeRendered = pf.included && !pf.removed;
                var mustBeRenderedInProductRenderer = mustBeRendered && (filterDescription.normalizeToPercentage || shouldShareYAxis);
                var mustBeRenderedInSeparateRenderer = mustBeRendered && !(filterDescription.normalizeToPercentage || shouldShareYAxis);


                // removed if it's in  unwanted renderer.
                if (hasBeenRenderedInProductRenderer && !mustBeRenderedInProductRenderer) {
                    productRenderer.removeSeries(legendString, true);
                }

                if (hasBeenRenderedInSeparateRenderer && !mustBeRenderedInSeparateRenderer) {
                    separateRenderer.removeSeries(legendString, true);
                }
                // upon reaching this point, find target renderer.
                if (!hasBeenRenderedToTarget && mustBeRendered) {
                    renderOnRenderer(targetRenderer, pf);
                }

                if (hasBeenRenderedToTarget && mustBeRendered && forceRerender) {
                    targetRenderer.removeSeries(legendString, true);
                    renderOnRenderer(targetRenderer, pf);
                }
            }

            function getRendererName(fundamentalName) {
                return "fundamentals" + fundamentalName;
            }

            function checkFundamentalValidity(productId, fundamentalType) {
                var key = JSON.stringify([productId, fundamentalType]);

                var validityCache = window.fundamental_validity_cache;
                if (validityCache && key in validityCache) {
                    return tool.when(validityCache[key]);
                }

                return sDatamartFundamentalDataService.IsFundamentalValid(productId, fundamentalType)
                    .then(function (res) {
                        validityCache[key] = res.data;
                        return res.data;
                    }, function (res) {
                        validityCache[key] = false;
                        return false;
                    });
            }

            function presetFundamentalsIfNotExists() {
                if (!filterDescription.addedFundamentals) {
                    filterDescription.addedFundamentals = [];
                }

                if (!filterDescription.productFundamentals) {
                    filterDescription.productFundamentals = [];
                }
            }

            function getFundamentalLegendName(product, fundamental) {
                return product.Symbol + ' ' + fundamental.displayName;
            }

            function getExistingProductFundamental(legendString) {
                return filterDescription.productFundamentals.filter(function (pf) { return pf.legend === legendString; })[0];
            }

            function addProductFundamentalIfNotExists() {
                _.forEach(filterDescription.myProducts, function (p) {
                    _.forEach(filterDescription.addedFundamentals, function (f) {
                        var ls = getFundamentalLegendName(p, f);
                        var existingProductFundamental = getExistingProductFundamental(ls);
                        if (!existingProductFundamental) {
                            var newPf = {
                                fundamentalDisplayName: f.displayName,
                                legend: ls,
                                product: p,
                                fundamentalName: f.name,
                                color: null,
                                included: f.included
                            };
                            if (newPf.included) {
                                newPf.color = pChartColoringService.getNextColorAndReserve();
                            }
                            filterDescription.productFundamentals.push(newPf);
                        }
                    });
                });
            }

            function flagProductFundamentalToBeGarbageCollected() {
                _.forEach(filterDescription.addedFundamentals, function (fundamental) {
                    _.forEach(filterDescription.productFundamentals, function (pf) {
                        if (pf.fundamentalName === fundamental.name) {
                            pf.removed = fundamental.removed;
                            if (pf.removed) {
                                pChartColoringService.releaseReservedColor(pf.color);
                            }
                        }
                    });
                });
                var fundamentalNames = _.map(filterDescription.addedFundamentals, function (f) { return f.name; });
                var productIds = _.map(filterDescription.myProducts, function (p) { return p.ProductId; });
                _.forEach(filterDescription.productFundamentals, function (pf) {
                    if (!_.includes(fundamentalNames, pf.fundamentalName) ||
                        !_.includes(productIds, pf.product.ProductId)) {
                        pf.removed = true;
                        pChartColoringService.releaseReservedColor(pf.color);
                    }
                });
            }

            function syncAndRender() {
                addProductFundamentalIfNotExists();
                flagProductFundamentalToBeGarbageCollected();
                renderAllFundamentals();
                collectGarbage();
                onProductFundamentalsChanged();
            }

            function checkFundamental(fund) {
                if (!fund) {
                    return false;
                }
                var isFundamentalsAlreadyAdded = filterDescription.addedFundamentals.filter(function (f) {
                    return f.name === fund.name && !f.removed;
                })[0];
                return !isFundamentalsAlreadyAdded;
            }

            function constructFundamentalAvailabilityMessages() {
                var filtered = _.filter(filterDescription.productFundamentals, function (pf) {
                    return pf.IsConsideredInvalid && pf.included;
                });
                var groups = _.groupBy(filtered, function (pf) {
                    return pf.fundamentalDisplayName;
                });
                var entries = [];
                for (var key in groups) {
                    entries.push({
                        displayName: key,
                        symbols: _.map(groups[key], function (pf2) { return pf2.product.Symbol; }).join(", ")
                    });
                };
                return entries;
            }

            // used in several places, take note
            function onProductFundamentalsChanged(data) {
                if (data) {
                    var filtered = _.filter(filterDescription.productFundamentals, function (n) {
                        return n.fundamentalName === data.FundamentalType
                            && n.product.ProductId === data.ProductId;
                    });
                    if (filtered.length > 0) {
                        filtered[0].IsConsideredInvalid = data.IsConsideredInvalid;
                    }
                }
                fundamentalAvailabilityMessages = constructFundamentalAvailabilityMessages();
                pfGroupedByFundamentals = _.groupBy(filterDescription.productFundamentals, 'fundamentalName');
            }

            function priceFormatterInMillions(stxx, panel, price) {
                if (price) {
                    var absValue = Math.abs(price);
                    if (absValue >= 1000000.0)
                        return (price / 1000000.0).toFixed(2) + "T";
                    else if (absValue >= 100000.0)
                        return (price / 1000.0).toFixed(1) + "B";
                    else if (absValue >= 1000.0)
                        return (price / 1000.0).toFixed(2) + "B";
                    else {
                        if (absValue.toFixed(2).length >= 6)
                            return price.toFixed(1) + "M";
                        else
                            return (price).toFixed(2) + "M";
                    }
                }
                return "0";
            }

            function priceFormatterPercentage(stxx, panel, price) {
                if (price) {
                    return (price * 100).toFixed(2) + "%";
                }
                return "0%";
            }

            function priceFormatter(stxx, panel, price) {
                if (price < 1000)
                    return price;
                else if (price < 1000000)
                    return (price / 1000.0).toFixed(2) + "M";
                else
                    return (price / 1000000.0).toFixed(2) + "B";
            }

            function appendCreateYAxis() {
                if (parameters.yAxis) {
                    var stxx = pChartRenderingUtilsService.stxx;
                    var yAxis = parameters.yAxis;
                    for (var i in stxx.chart.seriesRenderers) {
                        var renderer = stxx.chart.seriesRenderers[i];
                        if (!yAxis.priceFormatter) {
                            if (renderer.params.yAxis === yAxis) {
                                switch (i) {
                                case "fundamentalsMarketCapitalization":
                                case "fundamentalsEnterpriseValue":
                                case "fundamentalsQuarterlyTotalAssets":
                                case "fundamentalsQuarterlyLongTermDebt":
                                case "fundamentalsQuarterlyRetainedEarnings":
                                case "fundamentalsRevenueTtm":
                                case "fundamentalsEbitda":
                                case "fundamentalsEbitTtm":
                                    yAxis.priceFormatter = priceFormatterInMillions;
                                    break;
                                case "fundamentalsSharesOutstanding":
                                case "fundamentalsDailyVolume":
                                    yAxis.priceFormatter = priceFormatter;
                                    break;
                                case "fundamentalsGrowthAtEarnings":
                                case "fundamentalsRevenueGrowth":
                                    yAxis.priceFormatter = priceFormatterPercentage;
                                    break;
                                }
                            }
                        }
                    }
                }
            }

            tool.setServiceObjectProperties({
                appendCreateYAxis: appendCreateYAxis,
                onBarSizeChanges: onBarSizeChanges,
                onProductChanged: onProductChanged,
                renderAllFundamentals: renderAllFundamentals,
                removeFromFundamentals: removeFromFundamentals,
                searchFundamentals: searchFundamentals,
                toggleFundamentalActivation: toggleFundamentalActivation,
                openFundamentalPanel: openFundamentalPanel,
                checkBarSize: checkBarSize,
                checkCanIncludeNewFundamental: checkCanIncludeNewFundamental,
                setToggleFundamentalActivation: setToggleFundamentalActivation,
                addToFundamentalWithChecks: addToFundamentalWithChecks,
                addToFundamentals: addToFundamentals,
                getFriendlyName: getFriendlyName,
                getFundamentalAvailabilityMessages: getFundamentalAvailabilityMessages,
                resetProductFundamentals: resetProductFundamentals,
                shouldShowFundamentalLabel: shouldShowFundamentalLabel
            });

            function removeHighligthedSeries(event, data) {
                var matchedSeries = filterDescription.productFundamentals.filter(function (pf) {
                    return pf.legend === data;
                });
                if (matchedSeries.length > 0) {
                    matchedSeries[0].included = !matchedSeries[0].included;
                    renderAllFundamentals();
                    return;
                }
                var matchedProductSeries = filterDescription.myProducts.filter(function (pf) {
                    return pf.symbol === data;
                });
                if (matchedProductSeries.length > 0) {
                    matchedProductSeries[0].included = !matchedProductSeries[0].included;
                    tool.broadcast('onNonPrimaryProductVisibilityChanges');
                    return;
                }
            }

            function initialize() {
                presetFundamentalsIfNotExists();
                tool.on('onStxSeriesDeleted', removeHighligthedSeries);
                tool.on('onStxDeleteHighlighted', removeProductFundamentalIfHighlighted);

                pChartCmsContentLoader.getFundamentals().then(function (res) {
                    fundamentalsKind = res;
                    _.forEach(res, function (m) {
                        fundamentalMapping['fundamentals' + m.name] = m.displayName;
                    });
                });

                tool.watch('pChartRenderingUtilsService', function () {
                    if (!pChartRenderingUtilsService) {
                        return;
                    }
                    pChartRenderingUtilsService.registerOnChartCreatedCallback("renderFundamentals", function (stxx) {
                        syncAndRender();
                    });

                    STXChart.YAxis.prototype.decimalPlaces = 3;
                });
            }

            initialize();
        });