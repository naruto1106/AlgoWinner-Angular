agmNgModuleWrapper('agmp.chart')
    .defineController("p.chart.TemplateManagerController",
        ['pChartFilterDescriptionService', 'sChartService', 'pChartViewTemplateService', 'sGuideItemManagerService', 'pChartRenderingUtilsService'],
        function (vm, dep, tool) {
            var pChartViewTemplateService = dep.pChartViewTemplateService,
                pChartFilterDescriptionService = dep.pChartFilterDescriptionService,
                sChartService = dep.sChartService,
                sGuideItemManagerService = dep.sGuideItemManagerService,
                pChartRenderingUtilsService = dep.pChartRenderingUtilsService;
                coreConfigService = dep.coreConfigService;
            var filterDescription = pChartFilterDescriptionService;

            var isCommunityHidden = true;

            function drawAlgoTrendline(symbol) {
                sChartService.GetAlgoCoordinates(symbol).then(function (res) {
                    pChartRenderingUtilsService.drawAlgoTrendline(res.data);
                });
            }

            function downloadImage() {
                pChartViewTemplateService.getImageBase64().then(function (payload) {
                    var name = vm.filterDescription.primaryProduct.Symbol;
                    //download(payload.ImageAsBytes, "screenshot_" + name + ".jpg", "image/jpeg");
                    saveAs(pChartViewTemplateService.dataURItoBlob(payload.ImageAsBytes), "screenshot_" + name + ".png");
                    //window.open(payload.ImageAsBytes, '_blank');
                });
                //window.open("data:image/gif;base64,R0lGOD lhCwAOAMQfAP////7+/vj4+Hh4eHd3d/v7+/Dw8HV1dfLy8ubm5vX19e3t7fr 6+nl5edra2nZ2dnx8fMHBwYODg/b29np6eujo6JGRkeHh4eTk5LCwsN3d3dfX 13Jycp2dnevr6////yH5BAEAAB8ALAAAAAALAA4AAAVq4NFw1DNAX/o9imAsB tKpxKRd1+YEWUoIiUoiEWEAApIDMLGoRCyWiKThenkwDgeGMiggDLEXQkDoTh CKNLpQDgjeAsY7MHgECgx8YR8oHwNHfwADBACGh4EDA4iGAYAEBAcQIg0Dk gcEIQA7", '_blank');
            }

            function loadWorkspace() {
                tool.openModalByDefinition('p.chart.LoadWorkspaceController');
            }


            function closeTemplateList() {
                vm.isOpen = false;
            }

            function saveCurrentView(flag) {
                closeTemplateList();
                pChartViewTemplateService.saveCurrentView(flag);
            }

            tool.on('isTemplateDropdownOpenChanged',
                   function () {
                       vm.isOpen = !vm.isOpen;
                       if (vm.isOpen) {
                           sGuideItemManagerService.run('guide.chart.loading');
                       }
                   });

            tool.setVmProperties({
                coreConfigService: coreConfigService,
                sorting: {
                    "Name": "none",
                    "Products": "none",
                    "Date": "d"
                },
                closeTemplateList: closeTemplateList,
                hasAlgoChartBundle: false,
                filterDescription: filterDescription,
                pChartViewTemplateService: pChartViewTemplateService,
                getOrRefreshViewTemplates: getOrRefreshViewTemplates,
                downloadImage: downloadImage,
                saveCurrentView: saveCurrentView,
                loadWorkspace: loadWorkspace,
                drawAlgoTrendline: drawAlgoTrendline
            });


            function getOrRefreshViewTemplates() {
                vm.sorting = {
                    "Name": "none",
                    "Products": "none",
                    "Date": "d"
                };
                pChartViewTemplateService.getOrRefreshViewTemplates();
            }

            tool.initialize(function () {

                pChartViewTemplateService.getOrRefreshViewTemplates();
                sChartService.getChannelsToPost()
                    .then(function (res) {
                        vm.channels = [];
                        res.data.forEach(function (item) {
                            if (isCommunityHidden && item.Identifier.Type != "Strategy Post") {
                                return;
                            }
                            vm.channels.push({
                                identifier: {
                                    id: item.Identifier.Id,
                                    type: item.Identifier.Type,
                                    AssociatedStrategyId: item.Identifier.AssociatedStrategyId,
                                    AssociatedGuruGroupId: item.Identifier.AssociatedGuruGroupId,
                                },
                                Name: item.Name,
                                canPost: item.CanPost,
                                included: item.Included
                            });
                        });
                        if (vm.channels && vm.channels.length > 0) {
                            vm.hasChannels = true;
                        }
                    });
            });
        }
    )

    .defineDirectiveForE('agmp-chart-template-manager',
        [],
        function () {
            return {
                controller: "p.chart.TemplateManagerController",
                templateUrl: '/App/pages/chart/chart.templateManager.html'
            };
        },
        {

        });