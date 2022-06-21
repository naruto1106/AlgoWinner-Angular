agmNgModuleWrapper('agms.chart')
    .defineService("pChartThemeService", ['sChartLayoutThemeSettingsService', 'sChartService'],
        function (serviceObj, dep, tool) {
            // Theming
            // MaRa: stx_candle_shadow, stx_line_chart, stx_bar_chart must be set through the .less, 
            // otherwise it will mess up the whole scene
            var currentTheme = "Light",
                sChartLayoutThemeSettingsService = dep.sChartLayoutThemeSettingsService,
                coreUserStateService = dep.coreUserStateService,
                coreNotificationService = dep.coreNotificationService,
                sChartService = dep.sChartService,
                defaultTheme = null,
                themeConfig = {
                    "enabledTheme": currentTheme, // name of the theme to enable by default
                    "customThemes": // all the themes go here
                    {
                        "Dark": // name of the theme
                        {
                            "baseTheme": "Night", // Default - we have overriden the "White" theme to become dark.
                            "stx_bar_down": { "color": "#ff3c3c" },
                            "stx_bar_up": { "color": "#2eaeff" },
                            "stx_hollow_candle_down": { "color": "#ff3c3c" },
                            "stx_hollow_candle_up": { "color": "#2eaeff" },
                            "stx_hollow_candle_even": { "color": "#888888" },
                            "stx_candle_down": { "color": "#ff3c3c", "borderLeftColor": "#ff3c3c" },
                            "stx_candle_up": { "color": "#2eaeff", "borderLeftColor": "#2eaeff" },
                            "stx_candle_shadow_down": { "color": "#ff3c3c" },
                            "stx_candle_shadow_up": { "color": "#2eaeff" },
                            "stx_grid": { "color": "#323637", "opacity": "0.6" },
                            "stx_grid_dark": { "color": "#cccccc", "opacity": "0.9" },
                            "stx_xaxis_dark": { "color": "#ffffff" },
                            "stx_volume_down": { "color": "#9302ff" },
                            "stx_volume_up": { "color": "#9302ff" },
                            "stx_volume_profile": { "color": "#b64a96", "opacity": ".3", "border-color": "rgb(255, 255, 255)" },
                            "backgroundColor": "#202020",
                            "stx_panel_border": {
                                "color": "#FFF",
                                "width": "2px"
                            }
                        },
                        "Light": // name of the theme
                        {
                            "baseTheme": "Day", // themes must be based on a default them and then overlayed with the custom colors. 
                            "stx_bar_down": { "color": "#db282e" },
                            "stx_bar_up": { "color": "#00a651" },
                            "stx_hollow_candle_down": { "color": "#db282e" },
                            "stx_hollow_candle_up": { "color": "#00a651" },
                            "stx_hollow_candle_even": { "color": "#888888" },
                            "stx_candle_down": { "color": "#db282e", "border-left-color": "#db282e" },
                            "stx_candle_up": { "color": "#00a651", "border-left-color": "#00a651" },
                            "stx_candle_shadow_down": { "color": "#db282e" },
                            "stx_candle_shadow_up": { "color": "#00a651" },
                            "stx_grid": { "color": "rgba(0, 0, 0, 0.08)" },
                            "stx_grid_dark": { "color": "rgba(0, 0, 0, 0.08)" },
                            "stx_xaxis_dark": { "color": "#444444" },
                            "stx_volume_down": { "color": "#006da6" },
                            "stx_volume_up": { "color": "#006da6" },
                            "stx_volume_profile": { "color": "#b64a96", "opacity": ".3", "border-color": "rgb(0, 0, 0)" },
                            "backgroundColor": "#f6f6f6",
                            "stx_panel_border": {
                                "color": "#333",
                                "width": "1px"
                            }
                        }
                    }
                };


            function getVolumeColor() {
               return getVolumeColorByTheme(currentTheme);
            }

            function getVolumeColorByTheme(theme) {
                return (theme === "Dark") ? "#9302ff" : "#006da6";
            }

            function setCurrentTheme(stxx, value) {
                var oldVolumeColor = getVolumeColor();
                if (currentTheme !== value) {
                    currentTheme = value;
                    STX.ThemeManager.enableTheme(stxx, currentTheme);

                    //Set Volume colors

                    var vchart = stxx.layout.studies.vchart;
                    if (vchart) {
                        var volumeColor = getVolumeColor();

                        if (vchart.outputs &&
                            oldVolumeColor == vchart.outputs["Down Volume"] &&
                            oldVolumeColor == vchart.outputs["Up Volume"]) {
                            // retain only if there is no sign of color change by user
                            vchart.outputs["Down Volume"] = volumeColor;
                            vchart.outputs["Up Volume"] = volumeColor;
                        }

                    }
                    applyVolumeProfileTheme(stxx);
                    stxx.draw();
                }
            }

            function applyVolumeProfileTheme(stxx) {
                var volProfileStyles = themeConfig["customThemes"][currentTheme]["stx_volume_profile"];
                for (var attr in volProfileStyles) {
                    stxx.setStyle("stx_volume_profile", attr, volProfileStyles[attr]);
                }
                var panelBorderStyles = themeConfig["customThemes"][currentTheme]["stx_panel_border"];
                for (var attr in panelBorderStyles) {
                    stxx.setStyle("stx_panel_border", attr, panelBorderStyles[attr]);
                }
            }

            function setDefaultTheme(theme) {
                if (defaultTheme === theme) {
                    return tool.when(defaultTheme);
                }
                var req = {
                    ChartTheme: theme
                }
                defaultTheme = theme;
                return sChartService.setDefaultTheme(req).then(function () {
                    return theme;
                }, function () {
                    coreNotificationService.notifyError("Error", "An error occurred trying to set the default theme. Please try again later.");
                });
            }

            function getCurrentTheme() {
                return currentTheme;
            }

            function defaultThemeLoaded() {
                return sChartLayoutThemeSettingsService.initializeChartSettings().then(function (res) {
                    return defaultTheme ? defaultTheme : res.ChartTheme;
                });
            }

            function getDefaultTheme() {
                return defaultTheme;
            }

            function initTheme(stxx) {
                tool.onceAll(
               [
                   coreUserStateService.myPremiumItemSubscriptionsLoaded,
                   defaultThemeLoaded()
               ])
               .then(function (ress) {
                   if (coreUserStateService.hasAlgoChartBundle() && ress[1]) {
                       defaultTheme = ress[1];
                       currentTheme = ress[1];
                       themeConfig.enabledTheme = ress[1];
                   }
               }).finally(function () {
                   STX.ThemeManager.setThemes(themeConfig, stxx);
                   applyVolumeProfileTheme(stxx);
                   stxx.draw();
               });
            }

            tool.setServiceObjectProperties({
                getVolumeColor: getVolumeColor,
                setCurrentTheme: setCurrentTheme,
                getCurrentTheme: getCurrentTheme,
                setDefaultTheme: setDefaultTheme,
                getDefaultTheme: getDefaultTheme,
                defaultThemeLoaded: defaultThemeLoaded,
                initTheme: initTheme
            });
        }
    );