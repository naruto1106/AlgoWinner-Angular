agmNgModuleWrapper('agm.common')
    .defineService('commonColorGeneratorService', [], function(serviceObj) {
        /**
    * Converts an HSL color value to RGB. Conversion formula
    * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
    * Assumes h, s, and l are contained in the set [0, 1] and
    * returns r, g, and b in the set [0, 255].
    *
    * @param   Number  h       The hue
    * @param   Number  s       The saturation
    * @param   Number  l       The lightness
    * @return  Array           The RGB representation
    */
        function hslToRgb(h, s, l) {
            var r, g, b;

            h = h.toFixed(2) / 360;
            s = s.toFixed(2) / 100;
            l = l.toFixed(2) / 100;

            if (s == 0) {
                r = g = b = l; // achromatic
            } else {
                function hue2Rgb(p, q, t) {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1 / 6) return p + (q - p) * 6 * t;
                    if (t < 1 / 2) return q;
                    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                    return p;
                }

                var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                var p = 2 * l - q;
                r = hue2Rgb(p, q, h + 1 / 3);
                g = hue2Rgb(p, q, h);
                b = hue2Rgb(p, q, h - 1 / 3);
            }

            //$log.error('r' + r);
            //$log.error('g' + g);
            //$log.error('b' + b);

            return toRgb(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
        }

        function convert(integer) {
            var str = Number(integer).toString(16);
            return str.length == 1 ? "0" + str : str;
        };

        function toRgb(r, g, b) { return "#" + convert(r) + convert(g) + convert(b); }

        serviceObj.generateColors = function(dataLength) {
            var colors = [];
            for (var i = 0; i < 360; i += 360 / dataLength) {
                colors.push(hslToRgb(i, 90 + Math.random() * 10, 50 + Math.random() * 10));
            }
            return colors;
        };

        serviceObj.generateColorsByReference = function(colors, dataLength) {
            colors.splice(0, colors.length);
            for (var i = 0; i < 360; i += 360 / dataLength) {
                colors.push(hslToRgb(i, 90 + Math.random() * 10, 50 + Math.random() * 10));
            }
            return colors;
        };
    });