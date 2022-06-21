agmNgModuleWrapper('agms.strategyCommerce')
    .defineController("s.strategyCommerce.CircleSelectionController", [],
        function(vm, dep, tool) {

            var mySwiper = null;

            vm.resizeReady = false;

            function triggerChange(strategy) {
                tool.emit(vm.eventName, strategy);
                if (vm.onSelectedStrategy) {
                    vm.onSelectedStrategy(strategy);
                }
            }

            tool.watch('vm.strategySelections.length', function() {
                if (vm.strategySelections.length > 0) {
                    tool.onRendered(function() {
                        var element = vm._getDirectiveElement();
                        var swiperElement = $(element).find(".swiper-container")[0];
                        if (!vm.slidesPerView) {
                            vm.slidesPerView = 4;
                        }
                        mySwiper = new Swiper(swiperElement, {
                            speed: 400,
                            spaceBetween: 0,
                            slidesPerView: vm.slidesPerView,
                        });
                        tool.onRendered(function() {
                            vm.resizeReady = true;
                            mySwiper.updateSlidesSize();
                            vm.makeCurrentSlideVisible();
                        });
                    });
                }
            });

            function moveLeft() {
                mySwiper.slidePrev();
            }

            function moveRight() {
                mySwiper.slideNext();
            }

            function makeCurrentSlideVisible() {
                if (vm.selectedStrategy && vm.slidesPerView) {
                    var position = vm.strategySelections.indexOf(vm.selectedStrategy);
                    if (position > (vm.slidesPerView - 1)) {
                        for (var i = 0; i < (position + 1 - vm.slidesPerView); i++) {
                            vm.moveRight();
                        }
                    }
                }
            }

            function linkToGroup(strategy) {
                if (strategy && strategy.OverridenDisplayValues && strategy.OverridenDisplayValues.IsApproved) {
                    return strategy.OverridenDisplayValues.GuruGroupModel.GuruGroupId;
                } else {
                    return null;
                }
            }

            vm.moveLeft = moveLeft;
            vm.moveRight = moveRight;
            vm.triggerChange = triggerChange;
            vm.makeCurrentSlideVisible = makeCurrentSlideVisible;
            vm.linkToGroup = linkToGroup;
        }
    )
    .defineDirectiveForE('agms-strategy-commerce-circle-selection', [], function() {
        return {
            controller: "s.strategyCommerce.CircleSelectionController",
            templateUrl: '/App/shared/strategyCommerce/strategyCommerce.circleSelection.html',
        };
    }, {
        disableAllSelection: '=',
        strategySelections: '=',
        selectedStrategy: '=',
        onSelectedStrategy: '=',
        eventName: '@',
        orderPadOrder: '=?',
        slidesPerView: "=?",
        makeCurrentSlideVisible: "=?",
        isOrderPad: "=?"
    });
