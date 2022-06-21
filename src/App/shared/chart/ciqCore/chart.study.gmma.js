agmNgModuleWrapper('agms.chart')
    .defineService("sGmmaStudyService",
    [],
    function (serviceObj, dep, tool) {
        var terms = [3, 5, 8, 10, 12, 18, 30, 35, 40, 45, 50, 60];

        function calculateGmma(stx, sd) {
            for (var i = 0; i < terms.length; i++) {
                var term = terms[i];
                STX.Studies.MA("exponential", term, 'Close', 0, "EMA" + term, stx, sd);
            }
        };

        function displayGmma(stx, sd, quotes) {
            var panel = stx.panels[sd.panel];
            stx.startClip(sd.panel);

            for (var i = 0; i < terms.length; i++) {
                var name = "EMA" + terms[i] + " " + sd.name;
                if (terms[i] < 30) {
                    sd.outputMap[name] = 'Short Term EMA';
                } else {
                    sd.outputMap[name] = 'Long Term EMA';
                }
                STX.Studies.displayIndividualSeriesAsLine(stx, sd, panel, name, quotes);
            }
            stx.endClip();
        };


        function init() {
            STX.Studies.studyLibrary = STX.extend(STX.Studies.studyLibrary,
                {
                    "gmma": {
                        "name": "Guppy Multiple Moving Average",
                        "overlay": true,
                        "calculateFN": calculateGmma,
                        "seriesFN": displayGmma,
                        "inputs": {},
                        "outputs": { "Short Term EMA": "#FF7068", "Long Term EMA": "#92C88E" }
                    }
                });
        }

        tool.setServiceObjectProperties({
            init: init
        });
    }
    );
