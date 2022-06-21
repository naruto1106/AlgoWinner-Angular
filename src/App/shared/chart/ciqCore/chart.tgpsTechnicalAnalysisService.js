agmNgModuleWrapper('agms.chart')
    .defineService("sChartTgpsTechnicalAnalysisService",
        [],
        function (serviceObj, dep, tool) {
            function Smooth(data, period ) {
                var smoothed_data = [];

                var sum = 0.0;
                for (var n = 0; n < period; n++) {
                    sum += data[n];
                    smoothed_data[n] = sum / (n + 1);
                }
                for(var n = period; n < data.length; n++) {
                    smoothed_data[n] = (smoothed_data[n - 1] * (period - 1) + data[n]) / (period);
                }
                return smoothed_data;
            }

            function TR(bars) {
                var L = bars.length;
                var tr = [];
                tr[0] = bars[0].High - bars[0].Low;
                for (var n = 1; n < L; n++) {
                    var bar = bars[n];
                    var prebar = bars[n - 1];
                    tr[n] = Math.max(bar.High - bar.Low, Math.max(Math.abs(bar.High - prebar.Close), Math.abs(bar.Low - prebar.Close)));
                }
                return tr;
            }

            function calcADX(bars, period) {
                var L = bars.length;
                var pDM = [0];
                var nDM = [0];
                for (var n = 1; n < L; n++) {
                    var bar = bars[n];
                    var upMove = bar.High - bars[n - 1].High;
                    var downMove = bars[n - 1].Low - bar.Low;

                    if (upMove > 0 && upMove > downMove) {
                        pDM[n] = upMove;
                    } else {
                        pDM[n] = 0;
                    }

                    if (downMove > 0 && downMove > upMove) {
                        nDM[n] = downMove;
                    } else {
                        nDM[n] = 0;
                    }
                }

                var pDM_smoothed = Smooth(pDM, period);
                var nDM_smoothed = Smooth(nDM, period);

                var ATR = Smooth(TR(bars), period);

                var pDI = [];
                var nDI = [];
                var DX = [];

                for (var n = 0; n < L; n++) {
                    if (ATR[n] === 0.0) {
                        pDI[n] = 100.0;
                        nDI[n] = 100.0;
                    } else {
                        pDI[n] = 100.0 * pDM_smoothed[n] / ATR[n];
                        nDI[n] = 100.0 * nDM_smoothed[n] / ATR[n];
                    }
                    if (pDI[n] + nDI[n] === 0.0) {
                        DX[n] = 0.0;
                    } else {
                        DX[n] = Math.abs(pDI[n] - nDI[n]) / (pDI[n] + nDI[n]) * 100.0;
                    }
                }
                return Smooth(DX, period);
            }


            function setTif(quotes, propName) {
                var ADX = calcADX(quotes, 14);                
                for (var i = 1; i < quotes.length; i++) {
                    quotes[i][propName] = Math.ceil(ADX[i] - ADX[i - 1] - 0.5);
                }
            }

            var alpha = 2.0 / (1.0 + 5);
            var oneAlpha = 1.0 - alpha;

            function setCom(bars, comSeriesName) {
                for (var i = 25; i < bars.length; i++) {
                    var com = (bars[i].Close - bars[i - 5].Close) / bars[i - 5].Close +
                        (bars[i].Close - bars[i - 15].Close) / bars[i - 15].Close +
                        (bars[i].Close - bars[i - 25].Close) / bars[i - 25].Close;

                    if (i === 25) {
                        bars[i][comSeriesName] = com * 100;
                    } else {
                        bars[i][comSeriesName] = com * alpha * 100 + bars[i - 1][comSeriesName] * oneAlpha;
                    }
                }
            }

            function setTrend(bars, comSeriesName) {
                setCom(bars, comSeriesName);
                for (var i = 25; i < bars.length; i++) {
                    bars[i]['Trend'] = bars[i][comSeriesName] >= 0 ? 1 : -1;
                }
            }

            function setPeakAndTrough(quotes, peakSeriesName, troughSeriesName) {
                for (var i = 4; quotes && i < quotes.length; i++) {
                    var quote = quotes[i];
                    var reference = quotes[i - 3];
                    if (reference.High >= quotes[i - 4].High &&
                        reference.High > quotes[i - 2].High &&
                        reference.High > quotes[i - 1].High &&
                        reference.High > quotes[i].High) {
                        quote[peakSeriesName] = reference.High;
                    } else {
                        quote[peakSeriesName] = quotes[i - 1][peakSeriesName];
                    }

                    if (reference.Low <= quotes[i - 4].Low &&
                        reference.Low < quotes[i - 2].Low &&
                        reference.Low < quotes[i - 1].Low &&
                        reference.Low < quotes[i].Low) {
                        quote[troughSeriesName] = reference.Low;
                    } else {
                        quote[troughSeriesName] = quotes[i - 1][troughSeriesName];
                    }
                }
            }

            function setSeries(bars, series, seriesName) {
                var dic = seriesToDict(series);
                bars.forEach(function (bar) {
                    var value = dic[bar.Date];
                    if (value || value === 0) {
                        bar[seriesName] = value;
                    }
                });
            }

            function seriesToDict(series) {
                var dict = {};
                series.forEach(function(bar) {
                    var date = moment(bar.Timestamp).format('YYYY-MM-DD');
                    dict[date] = bar.Value;

                    // Fix some bug with wrong date value
                    dict[moment(bar.Timestamp).format('YYYYMMDD000000000')] = bar.Value;
                });
                return dict;
            }

            tool.setServiceObjectProperties({
                setPeakAndTrough: setPeakAndTrough,
                setTif: setTif,
                setCom: setCom,
                setTrend: setTrend,
                setSeries: setSeries,
                seriesToDict: seriesToDict
            });
        });