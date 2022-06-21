agmNgModuleWrapper('agms.droidHelper')
    .defineController("s.droidHelper.MainAvatarController",
    ['sDroidHelperService', 'sDroidHelperSbsFrameworkService', "pAlgoOracleService", "commonBrowserDetectorService"],
        function (vm, dep, tool) {
            var iconElement = null;
            var sDroidHelperService = dep.sDroidHelperService,
                sDroidHelperSbsFrameworkService = dep.sDroidHelperSbsFrameworkService,
                pAlgoOracleService = dep.pAlgoOracleService;

            tool.onRendered(function () {
                iconElement = vm._getDirectiveElement().find('.main-avatar-container');

                var popupElement = vm._getDirectiveElement().find('[droid-popup-element]');

                $(iconElement).addClass('left-side');

                var disableDrag = false;
                $(document).on('scroll', function () {
                    disableDrag = true;
                });

                $(iconElement).draggable({
                    start: function () {
                        disableDrag = false;
                        $(iconElement).addClass('dragging');
                    },

                    drag: function () {
                        if (disableDrag) {
                            return false;
                        }

                        var position = $(iconElement).position();

                        $(iconElement).addClass('dragging');
                        if (position.left < window.innerWidth / 2) {
                            $(iconElement).addClass('left-side');
                            $(iconElement).removeClass('right-side');
                        } else {
                            $(iconElement).removeClass('left-side');
                            $(iconElement).addClass('right-side');
                        }
                    },

                    stop: function (event, args) {
                        $(iconElement).removeClass('dragging');
                    },
                    containment: 'window',
                    scroll: false
                });

                if (sDroidHelperService.isChartPage) {
                    $(iconElement).css('left', 'inherit');
                    $(iconElement).css('right', '30px');
                } else {
                    $(iconElement).css('right', '450px');
                    $(iconElement).css('top', '45px');
                    $(iconElement).css('left', 'inherit');
                }

                $(iconElement).css('display', 'block');

                sDroidHelperService.setDroid({
                    popupPlaceholderElement: $(popupElement),
                    iconElement:$(iconElement)
                });
            });

            function setUpDroidOnShowDetail() {
                if (!topValue) {
                    topValue = $(iconElement).css('top');
                }

                $(iconElement).css('top', '');

                if (sDroidHelperService.isChartPage) {
                    $(iconElement).css('left', 'inherit');
                    $(iconElement).css('right', '400px');
                } else {
                    $(iconElement).css('left', '');
                    $(iconElement).css('right', '');
                }
            }

            function setUpDroidOnHideDetail() {
                if (topValue) {
                    $(iconElement).css('top', topValue);
                }
                topValue = null;
                if (sDroidHelperService.isChartPage) {
                    $(iconElement).css('left', 'inherit');
                    $(iconElement).css('right', '400px');
                } else {
                    $(iconElement).css('left', 'calc(50vw - 50px)');
                    $(iconElement).css('top', '40px');
                    $(iconElement).css('right', 'inherit');
                }
            }

            function showDetail() {
                sDroidHelperService.hideSmallMessageBox();
                sDroidHelperService.showDefaultModal();
            }

            function hideDetail() {
                vm.sDroidHelperService.hideModal();
            }

            var topValue = null;

            function enlargeView() {
                sDroidHelperService.showModalVisualOnly();
            }

            function endTour() {
                sDroidHelperSbsFrameworkService.endTour();
            }

            tool.initialize(function () {
                tool.on('droidShowDetail', setUpDroidOnShowDetail);
                tool.on('droidHideDetail', setUpDroidOnHideDetail);
                tool.setVmProperties({
                    commonBrowserDetectorService: dep.commonBrowserDetectorService,
                    sDroidHelperService: sDroidHelperService,
                    pAlgoOracleService: pAlgoOracleService,
                    showDetail: showDetail,
                    endTour:endTour,
                    enlargeView: enlargeView,
                    hideDetail: hideDetail
                });
            });

        })
    .defineDirectiveForE("agms-droid-helper-main-avatar", [],
        function () {
            return {
                controller: "s.droidHelper.MainAvatarController",
                templateUrl: '/App/shared/droidHelper/droidHelper.mainAvatar.html'
            };
        },
        {});