agmNgModuleWrapper('agms.chart')
    .ngApp
    .service('smartchartGroup', [
        function(smartchartHorizontalRuler) {
            return {
                generate: function() {
                    return {
                        subItems: [],
                        onViewChanged: function(info) {
                            this.subItems.forEach(function(subItem) {
                                if (subItem.onViewChanged) {
                                    subItem.onViewChanged(info);
                                }
                            });
                        },
                        init: function(info) {
                            this.subItems.forEach(function(subItem) {
                                if (subItem.init) {
                                    subItem.init(info);
                                }
                            });
                        },
                        onMouseleave: function(info, event) {
                            this.subItems.forEach(function(subItem) {
                                if (subItem.onMouseleave) {
                                    subItem.onMouseleave(info, event);
                                }
                            });
                        },
                        onMousemove: function(info, event) {
                            this.subItems.forEach(function(subItem) {
                                if (subItem.onMousemove) {
                                    subItem.onMousemove(info, event);
                                }
                            });
                        },
                        onMousedown: function(info, event) {
                            this.subItems.forEach(function(subItem) {
                                if (subItem.onMousedown) {
                                    subItem.onMousedown(info, event);
                                }
                            });
                        },
                        onMouseup: function(info, event) {
                            this.subItems.forEach(function(subItem) {
                                if (subItem.onMouseup) {
                                    subItem.onMouseup(info, event);
                                }
                            });
                        },
                        onMousewheel: function(info, event) {
                            this.subItems.forEach(function(subItem) {
                                if (subItem.onMousewheel) {
                                    subItem.onMousewheel(info, event);
                                }
                            });
                        },
                        template: 'smartchartGroup'
                    };
                }
            };
        }
    ])
    .run([
        '$templateCache', function($templateCache) {
            $templateCache.put('smartchartGroup',
                '<div class="full-screen">' +
                '<agms-chart-smartchart-boundary class="full-screen" ng-repeat="item in localItem.subItems" local-item="item">' +
                '</agms-chart-smartchart-boundary>' +
                '</div>');
        }
    ]);
