/* File generated on Wed Nov 29 2023 20:19:28 GMT+0000 (Coordinated Universal Time) */
/* Version 2016-07-16.9 */
/* Expires on 2024/10/31 */
/* Locked to domains "[\"127.0.0.1\",\"localhost\",\"algomerchant.com\"]" */

/* Copyright © 2023 S&P Global All rights reserved */
(function () {
    var trialExpiration = "2024/10/31";
    if (trialExpiration != "undefined") {
        var expiration = new Date(trialExpiration);
        var now = new Date();
        if (now.getTime() > expiration.getTime()) {
            alert("This license has expired!");
            console.log("This license has expired!");
        } else {
            var diffDays = (expiration.getTime() - now.getTime());
            diffDays = Math.round(Math.abs(diffDays / (1000 * 60 * 60 * 24)));
            if (diffDays < 3) {
                alert("This license expires in " + diffDays + " days!");
                console.log("This license expires in " + diffDays + " days!");
            }
        }
    }
    var version = ["Version 2016-07-16.9"];
    if (version.length > 0 && window.STXChart && STXChart.version.length > 0) {
        if (version[0] != STXChart.version[0])
            console.log("Mismatched kernel version stxChart:" + STXChart.version[0] + " stxKernel:" + version[0]);
    }

    var domains = ["127.0.0.1", "localhost", "algomerchant.com"];
    if (domains.length) {
        var href = document.location.href;
        var foundOne = false;
        for (var i = 0; i < domains.length; i++) {
            var domain = domains[i];
            if (href.indexOf(domain) != -1) {
                foundOne = true;
            }
        }
        if (!foundOne) {
            console.log("!!!! Not licensed for domain " + document.location.href);
        }
    }
})();
/* eslint-disable */
/* jshint ignore:start */ /* ignore jslint start */
(function () {
    G4qTn[375678] = (function () {
        var Q = 2;
        for (; Q !== 9; ) {
            switch (Q) {
            case 2:
                Q = typeof globalThis === '\u006f\x62\u006a\x65\x63\x74' ? 1 : 5;
                break;
            case 1:
                return globalThis;
                break;
            case 5:
                var u;
                try {
                    var S = 2;
                    for (; S !== 6; ) {
                        switch (S) {
                        case 4:
                            S = typeof n0WHS === '\x75\x6e\u0064\x65\x66\x69\u006e\u0065\u0064' ? 3 : 9;
                            break;
                        case 3:
                            throw "";
                            S = 9;
                            break;
                        case 9:
                            delete u['\x6e\u0030\u0057\x48\u0053'];
                            var k = Object['\u0070\x72\x6f\u0074\x6f\x74\x79\u0070\u0065'];
                            delete k['\u0061\u0047\x41\x53\u0049'];
                            S = 6;
                            break;
                        case 2:
                            Object['\x64\u0065\u0066\x69\u006e\u0065\x50\x72\x6f\x70\x65\x72\u0074\x79'](Object['\x70\u0072\u006f\u0074\x6f\u0074\u0079\x70\u0065'], '\x61\x47\u0041\x53\u0049', {
                                '\x67\x65\x74': function () {
                                    var Z = 2;
                                    for (; Z !== 1; ) {
                                        switch (Z) {
                                        case 2:
                                            return this;
                                            break;
                                        }
                                    }
                                },
                                '\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65': true
                            });
                            u = aGASI;
                            u['\x6e\x30\u0057\x48\u0053'] = u;
                            S = 4;
                            break;
                        }
                    }
                } catch (J) {
                    u = window;
                }
                return u;
                break;
            }
        }
    })();
    B_lJur(G4qTn[375678]);
    G4qTn[406564] = (function (W$o) {
        function l8B(M17) {
            var C9r = 2;
            for (; C9r !== 25; ) {
                switch (C9r) {
                case 1:
                    C9r = !v_k-- ? 5 : 4;
                    break;
                case 7:
                    C9r = !v_k-- ? 6 : 14;
                    break;
                case 12:
                    C9r = !v_k-- ? 11 : 10;
                    break;
                case 2:
                    var n29,
                    F$T,
                    q8z,
                    g$e,
                    j1c,
                    B1u,
                    M2I;
                    C9r = 1;
                    break;
                case 14:
                    C9r = !v_k-- ? 13 : 12;
                    break;
                case 18:
                    n29 = false;
                    C9r = 17;
                    break;
                case 16:
                    return n29;
                    break;
                case 5:
                    M2I = u8h[W$o[4]];
                    C9r = 4;
                    break;
                case 6:
                    g$e = q8z && M2I(q8z, F$T);
                    C9r = 14;
                    break;
                case 19:
                    C9r = B1u >= 0 && M17 - B1u <= F$T ? 18 : 15;
                    break;
                case 20:
                    n29 = true;
                    C9r = 19;
                    break;
                case 17:
                    B4a = 'j-002-00005';
                    C9r = 16;
                    break;
                case 4:
                    C9r = !v_k-- ? 3 : 9;
                    break;
                case 27:
                    n29 = false;
                    C9r = 26;
                    break;
                case 8:
                    q8z = W$o[6];
                    C9r = 7;
                    break;
                case 15:
                    C9r = g$e >= 0 && g$e - M17 <= F$T ? 27 : 16;
                    break;
                case 3:
                    F$T = 28;
                    C9r = 9;
                    break;
                case 26:
                    B4a = 'j-002-00003';
                    C9r = 16;
                    break;
                case 9:
                    C9r = !v_k-- ? 8 : 7;
                    break;
                case 10:
                    C9r = !v_k-- ? 20 : 19;
                    break;
                case 11:
                    B1u = (j1c || j1c === 0) && M2I(j1c, F$T);
                    C9r = 10;
                    break;
                case 13:
                    j1c = W$o[7];
                    C9r = 12;
                    break;
                }
            }
        }
        var z5L = 2;
        for (; z5L !== 10; ) {
            switch (z5L) {
            case 7:
                v8O = R5S.N3LciB(new u8h[q2W]("^['-|]"), 'S');
                z5L = 6;
                break;
            case 5:
                u8h = G4qTn[375678];
                z5L = 4;
                break;
            case 2:
                var u8h,
                R5S,
                v8O,
                v_k;
                z5L = 1;
                break;
            case 13:
                z5L = !v_k-- ? 12 : 11;
                break;
            case 4:
                var x_b = 'fromCharCode',
                q2W = 'RegExp';
                z5L = 3;
                break;
            case 9:
                R5S = typeof x_b;
                z5L = 8;
                break;
            case 8:
                z5L = !v_k-- ? 7 : 6;
                break;
            case 6:
                z5L = !v_k-- ? 14 : 13;
                break;
            case 1:
                z5L = !v_k-- ? 5 : 4;
                break;
            case 14:
                W$o = W$o.D$_IDt(function (D$U) {
                    var K3h = 2;
                    for (; K3h !== 13; ) {
                        switch (K3h) {
                        case 8:
                            v2m++;
                            K3h = 3;
                            break;
                        case 9:
                            u9n += u8h[v8O][x_b](D$U[v2m] + 108);
                            K3h = 8;
                            break;
                        case 3:
                            K3h = v2m < D$U.length ? 9 : 7;
                            break;
                        case 4:
                            var v2m = 0;
                            K3h = 3;
                            break;
                        case 5:
                            u9n = '';
                            K3h = 4;
                            break;
                        case 1:
                            K3h = !v_k-- ? 5 : 4;
                            break;
                        case 2:
                            var u9n;
                            K3h = 1;
                            break;
                        case 14:
                            return u9n;
                            break;
                        case 6:
                            return;
                            break;
                        case 7:
                            K3h = !u9n ? 6 : 14;
                            break;
                        }
                    }
                });
                z5L = 13;
                break;
            case 3:
                z5L = !v_k-- ? 9 : 8;
                break;
            case 12:
                var T2H,
                I5L = 0,
                B4a;
                z5L = 11;
                break;
            case 11:
                return {
                    j6pPl2V: function (M9W) {
                        var A4X = 2;
                        for (; A4X !== 6; ) {
                            switch (A4X) {
                            case 2:
                                var c5_ = new u8h[W$o[0]]()[W$o[1]]();
                                A4X = 1;
                                break;
                            case 9:
                                I5L = c5_ + 60000;
                                A4X = 8;
                                break;
                            case 5:
                                A4X = !v_k-- ? 4 : 3;
                                break;
                            case 4:
                                T2H = l8B(c5_);
                                A4X = 3;
                                break;
                            case 1:
                                A4X = c5_ > I5L ? 5 : 8;
                                break;
                            case 8:
                                var M_U = (function (p4N, m9B) {
                                    var G6Q = 2;
                                    for (; G6Q !== 10; ) {
                                        switch (G6Q) {
                                        case 12:
                                            y6E = y6E ^ y2R;
                                            G6Q = 13;
                                            break;
                                        case 8:
                                            var X$p = u8h[m9B[4]](p4N[m9B[2]](A0q), 16)[m9B[3]](2);
                                            var y2R = X$p[m9B[2]](X$p[m9B[5]] - 1);
                                            G6Q = 6;
                                            break;
                                        case 4:
                                            m9B = W$o;
                                            G6Q = 3;
                                            break;
                                        case 11:
                                            return y6E;
                                            break;
                                        case 5:
                                            G6Q = typeof m9B === 'undefined' && typeof W$o !== 'undefined' ? 4 : 3;
                                            break;
                                        case 13:
                                            A0q++;
                                            G6Q = 9;
                                            break;
                                        case 9:
                                            G6Q = A0q < p4N[m9B[5]] ? 8 : 11;
                                            break;
                                        case 14:
                                            y6E = y2R;
                                            G6Q = 13;
                                            break;
                                        case 2:
                                            G6Q = typeof p4N === 'undefined' && typeof M9W !== 'undefined' ? 1 : 5;
                                            break;
                                        case 1:
                                            p4N = M9W;
                                            G6Q = 5;
                                            break;
                                        case 3:
                                            var y6E,
                                            A0q = 0;
                                            G6Q = 9;
                                            break;
                                        case 6:
                                            G6Q = A0q === 0 ? 14 : 12;
                                            break;
                                        }
                                    }
                                })(undefined, undefined);
                                return M_U ? T2H : !T2H;
                                break;
                            case 3:
                                A4X = !v_k-- ? 9 : 8;
                                break;
                            }
                        }
                    }
                };
                break;
            }
        }
    })([[-40, -11, 8, -7], [-5, -7, 8, -24, -3, 1, -7], [-9, -4, -11, 6, -43, 8], [8, 3, -25, 8, 6, -3, 2, -5], [4, -11, 6, 7, -7, -35, 2, 8], [0, -7, 2, -5, 8, -4], [-56, -5, -9, -58, -1, 4, -55, -52, -5], []]);
    G4qTn[342002] = 188;
    G4qTn[537667] = (function () {
        var H29 = function (c$_, A_U) {
            var u6l = A_U & 0xffff;
            var T20 = A_U - u6l;
            return (T20 * c$_ | 0) + (u6l * c$_ | 0) | 0;
        },
        q4tWxG3 = function (d8H, L3o, F3i) {
            var t74 = 0xcc9e2d51,
            v4u = 0x1b873593;
            var m1$ = F3i;
            var s3Y = L3o & ~0x3;
            for (var T3b = 0; T3b < s3Y; T3b += 4) {
                var m86 = d8H.K7alU(T3b) & 0xff | (d8H.K7alU(T3b + 1) & 0xff) << 8 | (d8H.K7alU(T3b + 2) & 0xff) << 16 | (d8H.K7alU(T3b + 3) & 0xff) << 24;
                m86 = H29(m86, t74);
                m86 = (m86 & 0x1ffff) << 15 | m86 >>> 17;
                m86 = H29(m86, v4u);
                m1$ ^= m86;
                m1$ = (m1$ & 0x7ffff) << 13 | m1$ >>> 19;
                m1$ = m1$ * 5 + 0xe6546b64 | 0;
            }
            m86 = 0;
            switch (L3o % 4) {
            case 3:
                m86 = (d8H.K7alU(s3Y + 2) & 0xff) << 16;
            case 2:
                m86 |= (d8H.K7alU(s3Y + 1) & 0xff) << 8;
            case 1:
                m86 |= d8H.K7alU(s3Y) & 0xff;
                m86 = H29(m86, t74);
                m86 = (m86 & 0x1ffff) << 15 | m86 >>> 17;
                m86 = H29(m86, v4u);
                m1$ ^= m86;
            }
            m1$ ^= L3o;
            m1$ ^= m1$ >>> 16;
            m1$ = H29(m1$, 0x85ebca6b);
            m1$ ^= m1$ >>> 13;
            m1$ = H29(m1$, 0xc2b2ae35);
            m1$ ^= m1$ >>> 16;
            return m1$;
        };
        return {
            q4tWxG3: q4tWxG3
        };
    })();
    G4qTn[134421] = G4qTn[404046];
    G4qTn.x24 = function () {
        return typeof G4qTn[274953].E4DzFJX === 'function' ? G4qTn[274953].E4DzFJX.apply(G4qTn[274953], arguments) : G4qTn[274953].E4DzFJX;
    };
    G4qTn.w4N = function () {
        return typeof G4qTn[188645].F1yyvj$ === 'function' ? G4qTn[188645].F1yyvj$.apply(G4qTn[188645], arguments) : G4qTn[188645].F1yyvj$;
    };
    function G4qTn() {}
    G4qTn.a5V = function () {
        return typeof G4qTn[537667].q4tWxG3 === 'function' ? G4qTn[537667].q4tWxG3.apply(G4qTn[537667], arguments) : G4qTn[537667].q4tWxG3;
    };
    G4qTn.H8B = function () {
        return typeof G4qTn[188645].N8bjZkv === 'function' ? G4qTn[188645].N8bjZkv.apply(G4qTn[188645], arguments) : G4qTn[188645].N8bjZkv;
    };
    G4qTn.H$V = function () {
        return typeof G4qTn[188645].F1yyvj$ === 'function' ? G4qTn[188645].F1yyvj$.apply(G4qTn[188645], arguments) : G4qTn[188645].F1yyvj$;
    };
    G4qTn[375678].K6SS = G4qTn;
    G4qTn[274953] = (function () {
        var b$z = 2;
        for (; b$z !== 9; ) {
            switch (b$z) {
            case 2:
                var l8a = [arguments];
                l8a[7] = undefined;
                l8a[2] = {};
                b$z = 4;
                break;
            case 4:
                l8a[2].E4DzFJX = function () {
                    var B_m = 2;
                    for (; B_m !== 90; ) {
                        switch (B_m) {
                        case 53:
                            W6L[5].I8B4lX(W6L[2]);
                            W6L[5].I8B4lX(W6L[6]);
                            B_m = 51;
                            break;
                        case 17:
                            W6L[4].X8y = ['s5E'];
                            W6L[4].n_8 = function () {
                                var N83 = typeof s$NRUF === 'function';
                                return N83;
                            };
                            W6L[2] = W6L[4];
                            W6L[56] = {};
                            W6L[56].X8y = ['Y4l'];
                            W6L[56].n_8 = function () {
                                var j57 = function () {
                                    return ('ab').charAt(1);
                                };
                                var F8V = !(/\x61/).j_cz7J(j57 + []);
                                return F8V;
                            };
                            B_m = 24;
                            break;
                        case 77:
                            W6L[26] = 0;
                            B_m = 76;
                            break;
                        case 1:
                            B_m = l8a[7] ? 5 : 4;
                            break;
                        case 7:
                            W6L[6] = W6L[9];
                            W6L[7] = {};
                            W6L[7].X8y = ['Y4l'];
                            W6L[7].n_8 = function () {
                                var g_8 = function () {
                                    return ('aaaa|a').substr(0, 3);
                                };
                                var f55 = !(/\174/).j_cz7J(g_8 + []);
                                return f55;
                            };
                            B_m = 12;
                            break;
                        case 59:
                            W6L[84] = 'R8j';
                            B_m = 58;
                            break;
                        case 69:
                            B_m = (function (U2y) {
                                var G4c = 2;
                                for (; G4c !== 22; ) {
                                    switch (G4c) {
                                    case 2:
                                        var f9g = [arguments];
                                        G4c = 1;
                                        break;
                                    case 15:
                                        f9g[2] = f9g[8][f9g[4]];
                                        f9g[9] = f9g[7][f9g[2]].h / f9g[7][f9g[2]].t;
                                        G4c = 26;
                                        break;
                                    case 1:
                                        G4c = f9g[0][0].length === 0 ? 5 : 4;
                                        break;
                                    case 5:
                                        return;
                                        break;
                                    case 12:
                                        f9g[8].I8B4lX(f9g[5][W6L[84]]);
                                        G4c = 11;
                                        break;
                                    case 10:
                                        G4c = f9g[5][W6L[62]] === W6L[89] ? 20 : 19;
                                        break;
                                    case 8:
                                        f9g[4] = 0;
                                        G4c = 7;
                                        break;
                                    case 20:
                                        f9g[7][f9g[5][W6L[84]]].h += true;
                                        G4c = 19;
                                        break;
                                    case 11:
                                        f9g[7][f9g[5][W6L[84]]].t += true;
                                        G4c = 10;
                                        break;
                                    case 13:
                                        f9g[7][f9g[5][W6L[84]]] = (function () {
                                            var c3h = 2;
                                            for (; c3h !== 9; ) {
                                                switch (c3h) {
                                                case 3:
                                                    return P5_[2];
                                                    break;
                                                case 2:
                                                    var P5_ = [arguments];
                                                    P5_[2] = {};
                                                    P5_[2].h = 0;
                                                    P5_[2].t = 0;
                                                    c3h = 3;
                                                    break;
                                                }
                                            }
                                        }).w_deeR(this, arguments);
                                        G4c = 12;
                                        break;
                                    case 24:
                                        f9g[4]++;
                                        G4c = 16;
                                        break;
                                    case 14:
                                        G4c = typeof f9g[7][f9g[5][W6L[84]]] === 'undefined' ? 13 : 11;
                                        break;
                                    case 4:
                                        f9g[7] = {};
                                        f9g[8] = [];
                                        f9g[4] = 0;
                                        G4c = 8;
                                        break;
                                    case 18:
                                        f9g[1] = false;
                                        G4c = 17;
                                        break;
                                    case 19:
                                        f9g[4]++;
                                        G4c = 7;
                                        break;
                                    case 7:
                                        G4c = f9g[4] < f9g[0][0].length ? 6 : 18;
                                        break;
                                    case 17:
                                        f9g[4] = 0;
                                        G4c = 16;
                                        break;
                                    case 16:
                                        G4c = f9g[4] < f9g[8].length ? 15 : 23;
                                        break;
                                    case 25:
                                        f9g[1] = true;
                                        G4c = 24;
                                        break;
                                    case 6:
                                        f9g[5] = f9g[0][0][f9g[4]];
                                        G4c = 14;
                                        break;
                                    case 26:
                                        G4c = f9g[9] >= 0.5 ? 25 : 24;
                                        break;
                                    case 23:
                                        return f9g[1];
                                        break;
                                    }
                                }
                            })(W6L[32]) ? 68 : 67;
                            break;
                        case 76:
                            B_m = W6L[26] < W6L[57][W6L[45]].length ? 75 : 70;
                            break;
                        case 2:
                            var W6L = [arguments];
                            B_m = 1;
                            break;
                        case 65:
                            W6L[32] = [];
                            W6L[89] = 'p3A';
                            W6L[76] = 'j0z';
                            W6L[45] = 'X8y';
                            W6L[62] = 'K$8';
                            W6L[50] = 'n_8';
                            B_m = 59;
                            break;
                        case 40:
                            W6L[37] = W6L[17];
                            W6L[53] = {};
                            W6L[53].X8y = ['s5E'];
                            W6L[53].n_8 = function () {
                                var T55 = typeof D$OJCO === 'function';
                                return T55;
                            };
                            W6L[79] = W6L[53];
                            W6L[5].I8B4lX(W6L[1]);
                            B_m = 53;
                            break;
                        case 5:
                            return 17;
                            break;
                        case 28:
                            W6L[36].n_8 = function () {
                                var I6Q = function () {
                                    return ('a').anchor('b');
                                };
                                var P8f = (/(\074|\076)/).j_cz7J(I6Q + []);
                                return P8f;
                            };
                            W6L[12] = W6L[36];
                            W6L[17] = {};
                            W6L[17].X8y = ['Y4l'];
                            W6L[17].n_8 = function () {
                                var l3p = function () {
                                    return ('aaa').includes('a');
                                };
                                var S8_ = (/\164\x72\165\145/).j_cz7J(l3p + []);
                                return S8_;
                            };
                            B_m = 40;
                            break;
                        case 51:
                            W6L[5].I8B4lX(W6L[8]);
                            W6L[5].I8B4lX(W6L[12]);
                            W6L[5].I8B4lX(W6L[34]);
                            W6L[5].I8B4lX(W6L[10]);
                            W6L[5].I8B4lX(W6L[48]);
                            W6L[5].I8B4lX(W6L[79]);
                            W6L[5].I8B4lX(W6L[37]);
                            B_m = 65;
                            break;
                        case 56:
                            W6L[57] = W6L[5][W6L[87]];
                            try {
                                W6L[90] = W6L[57][W6L[50]]() ? W6L[89] : W6L[76];
                            } catch (g4n) {
                                W6L[90] = W6L[76];
                            }
                            B_m = 77;
                            break;
                        case 33:
                            W6L[19].X8y = ['Y4l'];
                            W6L[19].n_8 = function () {
                                var K44 = function () {
                                    return btoa('=');
                                };
                                var h86 = !(/\x62\164\x6f\141/).j_cz7J(K44 + []);
                                return h86;
                            };
                            W6L[10] = W6L[19];
                            W6L[36] = {};
                            B_m = 29;
                            break;
                        case 57:
                            B_m = W6L[87] < W6L[5].length ? 56 : 69;
                            break;
                        case 20:
                            W6L[3].n_8 = function () {
                                var d7J = false;
                                var e85 = [];
                                try {
                                    for (var S5c in console) {
                                        e85.I8B4lX(S5c);
                                    }
                                    d7J = e85.length === 0;
                                } catch (e$p) {}
                                var x_z = d7J;
                                return x_z;
                            };
                            W6L[8] = W6L[3];
                            W6L[4] = {};
                            B_m = 17;
                            break;
                        case 68:
                            B_m = 100 ? 68 : 67;
                            break;
                        case 70:
                            W6L[87]++;
                            B_m = 57;
                            break;
                        case 12:
                            W6L[1] = W6L[7];
                            W6L[3] = {};
                            W6L[3].X8y = ['s5E'];
                            B_m = 20;
                            break;
                        case 67:
                            l8a[7] = 17;
                            return 38;
                            break;
                        case 24:
                            W6L[34] = W6L[56];
                            W6L[85] = {};
                            W6L[85].X8y = ['Y4l'];
                            W6L[85].n_8 = function () {
                                var D$E = function () {
                                    return ('aa').endsWith('a');
                                };
                                var F70 = (/\x74\162\x75\u0065/).j_cz7J(D$E + []);
                                return F70;
                            };
                            W6L[48] = W6L[85];
                            W6L[19] = {};
                            B_m = 33;
                            break;
                        case 58:
                            W6L[87] = 0;
                            B_m = 57;
                            break;
                        case 4:
                            W6L[5] = [];
                            W6L[9] = {};
                            W6L[9].X8y = ['s5E'];
                            W6L[9].n_8 = function () {
                                var q4y = typeof I8iI0Z === 'function';
                                return q4y;
                            };
                            B_m = 7;
                            break;
                        case 75:
                            W6L[43] = {};
                            W6L[43][W6L[84]] = W6L[57][W6L[45]][W6L[26]];
                            W6L[43][W6L[62]] = W6L[90];
                            W6L[32].I8B4lX(W6L[43]);
                            B_m = 71;
                            break;
                        case 29:
                            W6L[36].X8y = ['Y4l'];
                            B_m = 28;
                            break;
                        case 71:
                            W6L[26]++;
                            B_m = 76;
                            break;
                        }
                    }
                };
                return l8a[2];
                break;
            }
        }
    })();
    G4qTn[188645] = (function () {
        var t7m = 2;
        for (; t7m !== 4; ) {
            switch (t7m) {
            case 2:
                var L7_ = G4qTn[375678];
                var a1W,
                A3f;
                return {
                    F1yyvj$: function (H_9, I65, Z1E, n3T) {
                        var S4U = 2;
                        for (; S4U !== 1; ) {
                            switch (S4U) {
                            case 2:
                                return d1D(H_9, I65, Z1E, n3T);
                                break;
                            }
                        }
                    },
                    N8bjZkv: function (P8y, w_x, C0G, M0H) {
                        var s9K = 2;
                        for (; s9K !== 1; ) {
                            switch (s9K) {
                            case 2:
                                return d1D(P8y, w_x, C0G, M0H, true);
                                break;
                            }
                        }
                    }
                };
                break;
            }
        }
        function d1D(p0d, F_k, F6X, V97, p3e) {
            var h0n = 2;
            for (; h0n !== 15; ) {
                switch (h0n) {
                case 9:
                    h0n = V97 > 0 ? 8 : 19;
                    break;
                case 16:
                    return G4qTn.P2D(D7u, u2K, F6X);
                    break;
                case 13:
                    h0n = F_k && q79 > 0 && f1X.K7alU(q79 - 1) !== 46 ? 12 : 11;
                    break;
                case 14:
                    var q79 = f1X.length - p0d;
                    h0n = 13;
                    break;
                case 19:
                    h0n = p0d === null || p0d <= 0 ? 18 : 14;
                    break;
                case 8:
                    D7u = f1X.U5OB2(p0d, V97);
                    u2K = D7u.length;
                    h0n = 6;
                    break;
                case 2:
                    var D7u,
                    u2K,
                    f1X,
                    z6D;
                    z6D = L7_[C6O([-6, -3, -15, -17, 2, -9, -3, -4])];
                    !a1W && (a1W = typeof z6D !== "undefined" ? z6D[C6O([-10, -3, 1, 2, -4, -17, -5, -13])] || ' ' : "");
                    !A3f && (A3f = typeof z6D !== "undefined" ? z6D[C6O([-10, 0, -13, -12])] : "");
                    f1X = p3e ? A3f : a1W;
                    h0n = 9;
                    break;
                case 6:
                    return G4qTn.P2D(D7u, u2K, F6X);
                    break;
                case 12:
                    return false;
                    break;
                case 11:
                    D7u = f1X.U5OB2(q79, f1X.length);
                    u2K = D7u.length;
                    return G4qTn.P2D(D7u, u2K, F6X);
                    break;
                case 18:
                    D7u = f1X.U5OB2(0, f1X.length);
                    u2K = D7u.length;
                    h0n = 16;
                    break;
                }
            }
        }
        function C6O(m3s) {
            var F9H = 2;
            for (; F9H !== 7; ) {
                switch (F9H) {
                case 2:
                    var l5X = 3;
                    var P7R = '';
                    F9H = 5;
                    break;
                case 8:
                    return P7R;
                    break;
                case 5:
                    var t5F = 0;
                    F9H = 4;
                    break;
                case 4:
                    F9H = t5F < m3s.length ? 3 : 8;
                    break;
                case 3:
                    P7R += h3aS9.V5dM4(m3s[t5F] - l5X + 117);
                    F9H = 9;
                    break;
                case 9:
                    t5F++;
                    F9H = 4;
                    break;
                }
            }
        }
    })();
    G4qTn.z7A = function () {
        return typeof G4qTn[404046].A$KplLt === 'function' ? G4qTn[404046].A$KplLt.apply(G4qTn[404046], arguments) : G4qTn[404046].A$KplLt;
    };
    G4qTn.I6k = function () {
        return typeof G4qTn[406564].j6pPl2V === 'function' ? G4qTn[406564].j6pPl2V.apply(G4qTn[406564], arguments) : G4qTn[406564].j6pPl2V;
    };
    G4qTn.I1f = function () {
        return typeof G4qTn[406564].j6pPl2V === 'function' ? G4qTn[406564].j6pPl2V.apply(G4qTn[406564], arguments) : G4qTn[406564].j6pPl2V;
    };
    G4qTn.P2D = function () {
        return typeof G4qTn[537667].q4tWxG3 === 'function' ? G4qTn[537667].q4tWxG3.apply(G4qTn[537667], arguments) : G4qTn[537667].q4tWxG3;
    };
    function B_lJur(P7v) {
        function Q8l(c0C) {
            var A_J = 2;
            for (; A_J !== 5; ) {
                switch (A_J) {
                case 2:
                    var b4k = [arguments];
                    return b4k[0][0].Function;
                    break;
                }
            }
        }
        function F56(y5N) {
            var z3m = 2;
            for (; z3m !== 5; ) {
                switch (z3m) {
                case 2:
                    var A3h = [arguments];
                    return A3h[0][0].RegExp;
                    break;
                }
            }
        }
        function c$8(e6J) {
            var b3O = 2;
            for (; b3O !== 5; ) {
                switch (b3O) {
                case 2:
                    var y0b = [arguments];
                    return y0b[0][0];
                    break;
                }
            }
        }
        function G96(b15) {
            var M3t = 2;
            for (; M3t !== 5; ) {
                switch (M3t) {
                case 2:
                    var U$U = [arguments];
                    return U$U[0][0].Array;
                    break;
                }
            }
        }
        function p4P(K0P) {
            var i8A = 2;
            for (; i8A !== 5; ) {
                switch (i8A) {
                case 2:
                    var L32 = [arguments];
                    return L32[0][0].String;
                    break;
                }
            }
        }
        var Y$B = 2;
        for (; Y$B !== 146; ) {
            switch (Y$B) {
            case 26:
                W7g[48] = "3";
                W7g[28] = "";
                W7g[99] = "5";
                W7g[28] = "N";
                Y$B = 22;
                break;
            case 84:
                W7g[52] = W7g[41];
                W7g[52] += W7g[59];
                W7g[52] += W7g[24];
                W7g[21] = W7g[77];
                Y$B = 80;
                break;
            case 2:
                var W7g = [arguments];
                W7g[4] = "";
                W7g[4] = "al";
                W7g[2] = "";
                W7g[2] = "";
                Y$B = 9;
                break;
            case 29:
                W7g[80] = "";
                W7g[80] = "t";
                W7g[81] = "";
                W7g[81] = "__abstra";
                Y$B = 42;
                break;
            case 33:
                W7g[56] = "";
                W7g[84] = "U";
                W7g[56] = "D";
                W7g[80] = "";
                Y$B = 29;
                break;
            case 49:
                W7g[58] = "4lX";
                W7g[93] = "I";
                W7g[79] = "8B";
                W7g[51] = "idual";
                W7g[73] = "";
                Y$B = 65;
                break;
            case 121:
                y8B(p4P, "replace", W7g[60], W7g[35]);
                Y$B = 120;
                break;
            case 38:
                W7g[15] = "";
                W7g[15] = "c";
                W7g[47] = "";
                W7g[47] = "";
                Y$B = 53;
                break;
            case 124:
                y8B(c$8, "String", W7g[36], W7g[61]);
                Y$B = 123;
                break;
            case 53:
                W7g[47] = "j_";
                W7g[40] = "z7J";
                W7g[58] = "";
                W7g[58] = "";
                Y$B = 49;
                break;
            case 66:
                W7g[41] = "";
                W7g[41] = "w";
                W7g[60] = 6;
                W7g[60] = 1;
                W7g[36] = 9;
                W7g[36] = 1;
                W7g[36] = 0;
                Y$B = 84;
                break;
            case 42:
                W7g[89] = "";
                W7g[92] = "I0Z";
                W7g[89] = "8i";
                W7g[15] = "";
                Y$B = 38;
                break;
            case 76:
                W7g[54] = "";
                W7g[54] = "OJ";
                W7g[77] = "";
                W7g[77] = "D$";
                Y$B = 72;
                break;
            case 123:
                y8B(p4P, "fromCharCode", W7g[36], W7g[87]);
                Y$B = 122;
                break;
            case 57:
                W7g[34] = "optimi";
                W7g[72] = "__";
                W7g[16] = "";
                W7g[16] = "CO";
                Y$B = 76;
                break;
            case 114:
                W7g[42] += W7g[80];
                W7g[46] = W7g[56];
                W7g[46] += W7g[94];
                W7g[46] += W7g[98];
                W7g[35] = W7g[28];
                W7g[35] += W7g[48];
                Y$B = 108;
                break;
            case 127:
                W7g[76] += W7g[84];
                Y$B = 126;
                break;
            case 150:
                y8B(G96, "push", W7g[60], W7g[68]);
                Y$B = 149;
                break;
            case 135:
                W7g[87] = W7g[6];
                W7g[87] += W7g[3];
                W7g[87] += W7g[1];
                W7g[61] = W7g[9];
                Y$B = 131;
                break;
            case 93:
                W7g[65] = W7g[47];
                W7g[65] += W7g[15];
                W7g[65] += W7g[40];
                W7g[69] = W7g[93];
                Y$B = 118;
                break;
            case 147:
                y8B(Q8l, "apply", W7g[60], W7g[52]);
                Y$B = 146;
                break;
            case 14:
                W7g[8] = "9";
                W7g[1] = "";
                W7g[1] = "M4";
                W7g[3] = "";
                Y$B = 10;
                break;
            case 65:
                W7g[73] = "res";
                W7g[31] = "";
                W7g[31] = "RUF";
                W7g[33] = "s";
                Y$B = 61;
                break;
            case 152:
                y8B(c$8, W7g[42], W7g[36], W7g[69]);
                Y$B = 151;
                break;
            case 80:
                W7g[21] += W7g[54];
                W7g[21] += W7g[16];
                W7g[67] = W7g[72];
                W7g[67] += W7g[34];
                W7g[67] += W7g[97];
                W7g[38] = W7g[33];
                Y$B = 101;
                break;
            case 149:
                y8B(c$8, W7g[74], W7g[36], W7g[38]);
                Y$B = 148;
                break;
            case 118:
                W7g[69] += W7g[89];
                W7g[69] += W7g[92];
                W7g[42] = W7g[81];
                W7g[42] += W7g[15];
                Y$B = 114;
                break;
            case 125:
                y8B(p4P, "charCodeAt", W7g[60], W7g[76]);
                Y$B = 124;
                break;
            case 17:
                W7g[7] = "";
                W7g[7] = "OB2";
                W7g[48] = "";
                W7g[48] = "";
                Y$B = 26;
                break;
            case 108:
                W7g[35] += W7g[55];
                W7g[86] = W7g[84];
                W7g[86] += W7g[99];
                W7g[86] += W7g[7];
                Y$B = 135;
                break;
            case 72:
                W7g[24] = "";
                W7g[24] = "";
                W7g[24] = "R";
                W7g[59] = "";
                W7g[59] = "";
                W7g[59] = "_dee";
                Y$B = 66;
                break;
            case 148:
                y8B(c$8, W7g[67], W7g[36], W7g[21]);
                Y$B = 147;
                break;
            case 22:
                W7g[94] = "";
                W7g[94] = "$";
                W7g[55] = "LciB";
                W7g[98] = "_IDt";
                Y$B = 33;
                break;
            case 9:
                W7g[2] = "S";
                W7g[9] = "";
                W7g[5] = "K7";
                W7g[9] = "h3a";
                Y$B = 14;
                break;
            case 131:
                W7g[61] += W7g[2];
                W7g[61] += W7g[8];
                W7g[76] = W7g[5];
                W7g[76] += W7g[4];
                Y$B = 127;
                break;
            case 120:
                y8B(G96, "map", W7g[60], W7g[46]);
                Y$B = 152;
                break;
            case 10:
                W7g[3] = "d";
                W7g[6] = "";
                W7g[6] = "V5";
                W7g[7] = "";
                Y$B = 17;
                break;
            case 151:
                y8B(F56, "test", W7g[60], W7g[65]);
                Y$B = 150;
                break;
            case 97:
                W7g[74] += W7g[51];
                W7g[68] = W7g[93];
                W7g[68] += W7g[79];
                W7g[68] += W7g[58];
                Y$B = 93;
                break;
            case 61:
                W7g[39] = "$N";
                W7g[97] = "";
                W7g[97] = "ze";
                W7g[34] = "";
                Y$B = 57;
                break;
            case 126:
                var y8B = function (z07, Q4y, H2A, A6b) {
                    var f72 = 2;
                    for (; f72 !== 5; ) {
                        switch (f72) {
                        case 1:
                            a71(W7g[0][0], R$u[0][0], R$u[0][1], R$u[0][2], R$u[0][3]);
                            f72 = 5;
                            break;
                        case 2:
                            var R$u = [arguments];
                            f72 = 1;
                            break;
                        }
                    }
                };
                Y$B = 125;
                break;
            case 122:
                y8B(p4P, "substring", W7g[60], W7g[86]);
                Y$B = 121;
                break;
            case 101:
                W7g[38] += W7g[39];
                W7g[38] += W7g[31];
                W7g[74] = W7g[72];
                W7g[74] += W7g[73];
                Y$B = 97;
                break;
            }
        }
        function a71(Y1b, t5P, r4p, w6I, x40) {
            var b_e = 2;
            for (; b_e !== 14; ) {
                switch (b_e) {
                case 3:
                    C5_[9] = "";
                    C5_[9] = "defineP";
                    C5_[6] = true;
                    C5_[6] = false;
                    b_e = 6;
                    break;
                case 6:
                    try {
                        var z6y = 2;
                        for (; z6y !== 13; ) {
                            switch (z6y) {
                            case 2:
                                C5_[1] = {};
                                C5_[4] = (1, C5_[0][1])(C5_[0][0]);
                                C5_[7] = [C5_[4], C5_[4].prototype][C5_[0][3]];
                                z6y = 4;
                                break;
                            case 9:
                                C5_[7][C5_[0][4]] = C5_[7][C5_[0][2]];
                                C5_[1].set = function (K5Y) {
                                    var O2l = 2;
                                    for (; O2l !== 5; ) {
                                        switch (O2l) {
                                        case 2:
                                            var D0i = [arguments];
                                            C5_[7][C5_[0][2]] = D0i[0][0];
                                            O2l = 5;
                                            break;
                                        }
                                    }
                                };
                                C5_[1].get = function () {
                                    var q4x = 2;
                                    for (; q4x !== 12; ) {
                                        switch (q4x) {
                                        case 2:
                                            var N$3 = [arguments];
                                            N$3[8] = "";
                                            N$3[8] = "ned";
                                            N$3[6] = "";
                                            q4x = 3;
                                            break;
                                        case 3:
                                            N$3[6] = "fi";
                                            N$3[5] = "";
                                            N$3[5] = "unde";
                                            N$3[4] = N$3[5];
                                            q4x = 6;
                                            break;
                                        case 6:
                                            N$3[4] += N$3[6];
                                            N$3[4] += N$3[8];
                                            return typeof C5_[7][C5_[0][2]] == N$3[4] ? undefined : C5_[7][C5_[0][2]];
                                            break;
                                        }
                                    }
                                };
                                C5_[1].enumerable = C5_[6];
                                try {
                                    var f1S = 2;
                                    for (; f1S !== 3; ) {
                                        switch (f1S) {
                                        case 1:
                                            C5_[3] += C5_[8];
                                            C5_[3] += C5_[5];
                                            C5_[0][0].Object[C5_[3]](C5_[7], C5_[0][4], C5_[1]);
                                            f1S = 3;
                                            break;
                                        case 2:
                                            C5_[3] = C5_[9];
                                            f1S = 1;
                                            break;
                                        }
                                    }
                                } catch (f4f) {}
                                z6y = 13;
                                break;
                            case 3:
                                return;
                                break;
                            case 4:
                                z6y = C5_[7].hasOwnProperty(C5_[0][4]) && C5_[7][C5_[0][4]] === C5_[7][C5_[0][2]] ? 3 : 9;
                                break;
                            }
                        }
                    } catch (a96) {}
                    b_e = 14;
                    break;
                case 2:
                    var C5_ = [arguments];
                    C5_[5] = "perty";
                    C5_[8] = "ro";
                    C5_[9] = "";
                    b_e = 3;
                    break;
                }
            }
        }
    }
    G4qTn.E_X = function () {
        return typeof G4qTn[404046].G1$9_8l === 'function' ? G4qTn[404046].G1$9_8l.apply(G4qTn[404046], arguments) : G4qTn[404046].G1$9_8l;
    };
    G4qTn.v50 = function () {
        return typeof G4qTn[404046].A$KplLt === 'function' ? G4qTn[404046].A$KplLt.apply(G4qTn[404046], arguments) : G4qTn[404046].A$KplLt;
    };
    G4qTn.r9e = function () {
        return typeof G4qTn[404046].G1$9_8l === 'function' ? G4qTn[404046].G1$9_8l.apply(G4qTn[404046], arguments) : G4qTn[404046].G1$9_8l;
    };
    G4qTn.r72 = function () {
        return typeof G4qTn[274953].E4DzFJX === 'function' ? G4qTn[274953].E4DzFJX.apply(G4qTn[274953], arguments) : G4qTn[274953].E4DzFJX;
    };
    G4qTn.y_W = function () {
        return typeof G4qTn[188645].N8bjZkv === 'function' ? G4qTn[188645].N8bjZkv.apply(G4qTn[188645], arguments) : G4qTn[188645].N8bjZkv;
    };
    G4qTn[404046] = (function (p1Q) {
        return {
            A$KplLt: function () {
                var R1J,
                w5L = arguments;
                switch (p1Q) {
                case 1:
                    R1J = (w5L[1] / w5L[0] - w5L[3]) / w5L[4] + w5L[2];
                    break;
                case 61:
                    R1J = w5L[0] * w5L[1] - w5L[4] + w5L[3] - w5L[2];
                    break;
                case 97:
                    R1J = w5L[0] * -w5L[1];
                    break;
                case 138:
                    R1J = (-w5L[2] - w5L[3]) * w5L[0] - w5L[4] + w5L[1];
                    break;
                case 112:
                    R1J = w5L[2] / w5L[3] / w5L[0] - w5L[1];
                    break;
                case 130:
                    R1J = w5L[0] / w5L[2] - w5L[1] + w5L[4] + w5L[3];
                    break;
                case 43:
                    R1J = w5L[1] ^ w5L[0];
                    break;
                case 92:
                    R1J = -w5L[2] - w5L[4] + w5L[3] - w5L[0] + w5L[1];
                    break;
                case 86:
                    R1J = w5L[0] - (w5L[2] - w5L[3]) * w5L[1];
                    break;
                case 59:
                    R1J = w5L[2] / (w5L[1] ^ w5L[0]);
                    break;
                case 21:
                    R1J = w5L[1] / (w5L[2] - w5L[0]);
                    break;
                case 57:
                    R1J = w5L[1] * w5L[2] / w5L[3] - w5L[0] - w5L[4];
                    break;
                case 9:
                    R1J = (w5L[2] + w5L[3]) * w5L[0] - w5L[1];
                    break;
                case 128:
                    R1J = w5L[0] + w5L[1] + w5L[3] + w5L[4] - w5L[2];
                    break;
                case 139:
                    R1J = w5L[4] - w5L[2] + w5L[0] - w5L[1] + w5L[3];
                    break;
                case 41:
                    R1J = w5L[1] * w5L[0] - w5L[2] - w5L[3];
                    break;
                case 90:
                    R1J = w5L[0] * w5L[3] - w5L[4] - w5L[1] + w5L[2];
                    break;
                case 13:
                    R1J = w5L[0] / w5L[1] - w5L[2];
                    break;
                case 51:
                    R1J = -w5L[2] - w5L[1] + w5L[0];
                    break;
                case 65:
                    R1J = (w5L[2] + w5L[0]) / w5L[3] + w5L[1];
                    break;
                case 114:
                    R1J = (w5L[2] + w5L[4]) * w5L[3] - w5L[0] - w5L[1];
                    break;
                case 91:
                    R1J = w5L[4] + w5L[1] - w5L[3] - w5L[2] - w5L[0];
                    break;
                case 3:
                    R1J = w5L[1] * w5L[3] * w5L[2] * w5L[0] - w5L[4];
                    break;
                case 14:
                    R1J = w5L[1] < w5L[0];
                    break;
                case 19:
                    R1J = w5L[0] * w5L[1] / w5L[3] - w5L[2];
                    break;
                case 72:
                    R1J = (w5L[1] - w5L[0]) / w5L[2];
                    break;
                case 85:
                    R1J = -w5L[3] / w5L[1] - w5L[0] + w5L[4] - w5L[2];
                    break;
                case 31:
                    R1J = (w5L[0] + w5L[3]) * w5L[1] + w5L[2] - w5L[4];
                    break;
                case 18:
                    R1J = -w5L[1] / w5L[0] - w5L[3] - w5L[4] + w5L[2];
                    break;
                case 89:
                    R1J = w5L[1] != w5L[0];
                    break;
                case 11:
                    R1J = w5L[0] * +w5L[1];
                    break;
                case 118:
                    R1J = w5L[0] % w5L[1];
                    break;
                case 20:
                    R1J = w5L[1] + w5L[2] - w5L[0];
                    break;
                case 23:
                    R1J = w5L[0] / w5L[1];
                    break;
                case 75:
                    R1J = (-w5L[4] + w5L[0]) * w5L[1] - w5L[3] - w5L[2];
                    break;
                case 37:
                    R1J = w5L[1] + w5L[2] * w5L[0];
                    break;
                case 105:
                    R1J = w5L[1] * w5L[2] / w5L[0];
                    break;
                case 36:
                    R1J = -w5L[0] + w5L[1] - w5L[2] + w5L[3];
                    break;
                case 12:
                    R1J = w5L[0] << w5L[1];
                    break;
                case 100:
                    R1J = w5L[2] - w5L[0] / w5L[3] + w5L[1];
                    break;
                case 50:
                    R1J = w5L[2] + (w5L[0] ^ w5L[1]);
                    break;
                case 99:
                    R1J = (w5L[1] * w5L[0] + w5L[2]) / w5L[4] - w5L[3];
                    break;
                case 62:
                    R1J = w5L[2] - w5L[0] - w5L[3] + w5L[1];
                    break;
                case 2:
                    R1J = w5L[3] / w5L[1] / w5L[2] + w5L[0];
                    break;
                case 122:
                    R1J = -w5L[0] / w5L[3] * w5L[4] / w5L[2] + w5L[1];
                    break;
                case 83:
                    R1J = w5L[0] / w5L[4] * w5L[3] + w5L[1] - w5L[2];
                    break;
                case 63:
                    R1J = w5L[2] / w5L[0] + w5L[1] + w5L[3];
                    break;
                case 101:
                    R1J = w5L[2] - (w5L[1] | w5L[0]);
                    break;
                case 25:
                    R1J = (w5L[2] - w5L[3] + w5L[1]) / w5L[0] - w5L[4];
                    break;
                case 68:
                    R1J = w5L[1] / (w5L[2] >> w5L[0]);
                    break;
                case 49:
                    R1J = w5L[0] + w5L[2] / w5L[3] - w5L[1];
                    break;
                case 119:
                    R1J = w5L[1] * w5L[0] / (w5L[3] + w5L[2]);
                    break;
                case 66:
                    R1J = w5L[4] + w5L[2] + w5L[3] + w5L[6] + w5L[0] + w5L[5] + w5L[1];
                    break;
                case 10:
                    R1J = (w5L[2] - w5L[3]) / w5L[0] + w5L[1];
                    break;
                case 8:
                    R1J = w5L[0] * w5L[3] + w5L[1] - w5L[2] - w5L[4];
                    break;
                case 7:
                    R1J = w5L[2] - w5L[0] + w5L[3] + w5L[1];
                    break;
                case 74:
                    R1J = -w5L[2] * w5L[3] * w5L[0] + w5L[1];
                    break;
                case 40:
                    R1J = -w5L[0] + w5L[1];
                    break;
                case 116:
                    R1J = (w5L[4] + w5L[3]) / w5L[1] / w5L[2] + w5L[0];
                    break;
                case 117:
                    R1J = w5L[0] * w5L[1] + w5L[2];
                    break;
                case 5:
                    R1J = w5L[0] - w5L[1] - w5L[2] + w5L[4] + w5L[3];
                    break;
                case 98:
                    R1J = w5L[2] - w5L[1] / w5L[0];
                    break;
                case 6:
                    R1J = w5L[2] * w5L[3] * w5L[1] - w5L[0];
                    break;
                case 26:
                    R1J = w5L[2] + w5L[3] + w5L[0] - w5L[1];
                    break;
                case 80:
                    R1J = w5L[1] * w5L[0] - w5L[2];
                    break;
                case 54:
                    R1J = (w5L[3] - w5L[0] - w5L[2]) * w5L[1] + w5L[4];
                    break;
                case 15:
                    R1J = (-w5L[2] - w5L[1]) * w5L[0] + w5L[3];
                    break;
                case 73:
                    R1J = w5L[0] + w5L[2] + w5L[3] + w5L[1];
                    break;
                case 24:
                    R1J = (w5L[3] + w5L[1] - w5L[4]) / w5L[2] + w5L[0];
                    break;
                case 30:
                    R1J = w5L[1] | w5L[0];
                    break;
                case 46:
                    R1J = w5L[0] + w5L[2] - w5L[3] - w5L[1];
                    break;
                case 48:
                    R1J = w5L[0] - w5L[1] / (w5L[2] ^ w5L[4]) + w5L[3];
                    break;
                case 94:
                    R1J = (-w5L[3] / w5L[0] - w5L[1]) / w5L[4] + w5L[2];
                    break;
                case 33:
                    R1J = (w5L[4] + w5L[3]) / w5L[1] * w5L[0] - w5L[2];
                    break;
                case 0:
                    R1J = w5L[0] + w5L[1];
                    break;
                case 38:
                    R1J = w5L[1] + w5L[2] + w5L[0];
                    break;
                case 87:
                    R1J = -w5L[0] * w5L[2] - w5L[1] + w5L[3];
                    break;
                case 4:
                    R1J = w5L[0] - w5L[1];
                    break;
                case 47:
                    R1J = w5L[3] / w5L[0] * w5L[1] - w5L[2];
                    break;
                case 111:
                    R1J = -w5L[0] - w5L[1] + w5L[2] + w5L[3];
                    break;
                case 88:
                    R1J = (-w5L[2] / w5L[0] + w5L[3]) / w5L[1] - w5L[4];
                    break;
                case 32:
                    R1J = w5L[1] - w5L[0] + w5L[3] - w5L[2];
                    break;
                case 121:
                    R1J = w5L[1] / w5L[3] + w5L[2] - w5L[0];
                    break;
                case 141:
                    R1J = (w5L[1] * w5L[3] + w5L[2]) * w5L[4] - w5L[0];
                    break;
                case 95:
                    R1J = -w5L[1] / w5L[3] - w5L[0] + w5L[2] + w5L[4];
                    break;
                case 132:
                    R1J = -w5L[1] * w5L[3] / w5L[0] + w5L[2] - w5L[4];
                    break;
                case 103:
                    R1J = (w5L[1] - w5L[0] - w5L[3]) * w5L[2] - w5L[4];
                    break;
                case 109:
                    R1J = (w5L[4] - w5L[5]) * (w5L[0] - w5L[6]) + (w5L[7] - w5L[1]) * (w5L[2] - w5L[3]);
                    break;
                case 131:
                    R1J = w5L[4] * w5L[1] * w5L[3] - w5L[2] - w5L[0];
                    break;
                case 140:
                    R1J = w5L[1] * w5L[0] / w5L[2] + w5L[3];
                    break;
                case 35:
                    R1J = (-w5L[1] - w5L[2] + w5L[3]) * w5L[4] + w5L[0];
                    break;
                case 107:
                    R1J = w5L[1] == w5L[0];
                    break;
                case 39:
                    R1J = w5L[3] + w5L[2] - w5L[0] + w5L[1];
                    break;
                case 127:
                    R1J = w5L[4] * w5L[3] * w5L[1] + w5L[2] - w5L[0];
                    break;
                case 60:
                    R1J = (w5L[1] - w5L[4]) / w5L[2] + w5L[0] - w5L[3];
                    break;
                case 42:
                    R1J = -w5L[0] / w5L[1] * w5L[2] - w5L[4] + w5L[3];
                    break;
                case 125:
                    R1J = (w5L[1] + w5L[3] - w5L[4]) / w5L[0] - w5L[2];
                    break;
                case 56:
                    R1J = w5L[0] / +w5L[1];
                    break;
                case 17:
                    R1J = w5L[1] * w5L[0];
                    break;
                case 136:
                    R1J = (w5L[2] + w5L[3]) / w5L[0] - w5L[1];
                    break;
                case 108:
                    R1J = w5L[3] * w5L[1] + w5L[2] * w5L[0];
                    break;
                case 133:
                    R1J = w5L[1] / w5L[4] + w5L[0] + w5L[2] + w5L[3];
                    break;
                case 129:
                    R1J = w5L[3] / w5L[0] - w5L[1] - w5L[2];
                    break;
                case 96:
                    R1J = -w5L[0] * w5L[3] + w5L[2] + w5L[1];
                    break;
                case 52:
                    R1J = (w5L[1] - w5L[2]) / w5L[3] - w5L[0];
                    break;
                case 71:
                    R1J = -w5L[2] / w5L[0] + w5L[3] - w5L[1];
                    break;
                case 135:
                    R1J = -w5L[2] / w5L[3] * w5L[0] + w5L[1];
                    break;
                case 120:
                    R1J = -w5L[1] * w5L[0] + w5L[2];
                    break;
                case 102:
                    R1J = (-w5L[3] / w5L[1] + w5L[2]) * w5L[0] - w5L[4];
                    break;
                case 28:
                    R1J = w5L[2] - w5L[1] + w5L[0];
                    break;
                case 104:
                    R1J = w5L[0] / w5L[4] * w5L[1] * w5L[3] - w5L[2];
                    break;
                case 29:
                    R1J = w5L[1] >> w5L[0];
                    break;
                case 124:
                    R1J = w5L[0] - w5L[3] - (w5L[1] - w5L[2]);
                    break;
                case 44:
                    R1J = -w5L[1] / w5L[2] + w5L[0];
                    break;
                case 137:
                    R1J = w5L[1] * w5L[2] + w5L[3] + w5L[0];
                    break;
                case 70:
                    R1J = -w5L[2] + w5L[1] - w5L[0];
                    break;
                case 84:
                    R1J = -w5L[0] / w5L[2] + w5L[1] + w5L[3];
                    break;
                case 27:
                    R1J = (w5L[4] - w5L[1]) / w5L[3] * w5L[2] + w5L[0];
                    break;
                case 64:
                    R1J = w5L[0] / w5L[2] + w5L[1];
                    break;
                case 110:
                    R1J = (w5L[2] + w5L[0]) / w5L[4] - w5L[1] + w5L[3];
                    break;
                case 34:
                    R1J = (-w5L[1] - w5L[2]) * w5L[0] * w5L[3] + w5L[4];
                    break;
                case 81:
                    R1J = w5L[0] + (w5L[1] | w5L[2]);
                    break;
                case 76:
                    R1J = (w5L[1] - w5L[3] - w5L[0]) / w5L[4] + w5L[2];
                    break;
                case 78:
                    R1J = (w5L[3] + w5L[4]) * w5L[2] * w5L[0] - w5L[1];
                    break;
                case 113:
                    R1J = w5L[2] - w5L[1] + w5L[4] + w5L[0] - w5L[3];
                    break;
                case 115:
                    R1J = (w5L[0] - w5L[2]) * w5L[3] - w5L[1];
                    break;
                case 106:
                    R1J = w5L[1] / w5L[3] - w5L[0] + w5L[2];
                    break;
                case 77:
                    R1J = w5L[0] - +w5L[1];
                    break;
                case 53:
                    R1J = (-w5L[4] - w5L[2]) / w5L[3] * w5L[1] + w5L[0];
                    break;
                case 93:
                    R1J = w5L[0] - w5L[3] - w5L[1] - w5L[2];
                    break;
                case 69:
                    R1J = (w5L[3] / w5L[4] + w5L[2]) * w5L[1] - w5L[0];
                    break;
                case 16:
                    R1J = w5L[2] - w5L[1] - w5L[0];
                    break;
                case 79:
                    R1J = -w5L[0] + w5L[2] + w5L[1] - w5L[3];
                    break;
                case 55:
                    R1J = w5L[3] + w5L[1] - w5L[4] - w5L[0] + w5L[2];
                    break;
                case 58:
                    R1J = (w5L[1] + w5L[2]) / w5L[0];
                    break;
                case 134:
                    R1J = (w5L[0] + w5L[1] + w5L[3]) / w5L[4] + w5L[2];
                    break;
                case 123:
                    R1J = +w5L[0] - w5L[1] * w5L[2];
                    break;
                case 82:
                    R1J = w5L[2] + (w5L[0] << w5L[1]);
                    break;
                case 45:
                    R1J = w5L[3] + (w5L[4] + w5L[0] * w5L[2]) * w5L[1];
                    break;
                case 126:
                    R1J = w5L[2] - w5L[0] - w5L[4] - w5L[3] - w5L[1];
                    break;
                case 67:
                    R1J = (w5L[1] / w5L[0] + w5L[4]) / w5L[2] - w5L[3];
                    break;
                case 22:
                    R1J = (w5L[3] - w5L[0]) * w5L[4] / w5L[1] - w5L[2];
                    break;
                }
                return R1J;
            },
            G1$9_8l: function (Y6T) {
                p1Q = Y6T;
            }
        };
    })();
    G4qTn[170220] = G4qTn[375678];
    G4qTn.A4t = function (x7r) {
        G4qTn.r72();
        if (G4qTn && x7r)
            return G4qTn.I6k(x7r);
    };
    G4qTn.K2C = function (A62) {
        G4qTn.x24();
        if (G4qTn && A62)
            return G4qTn.I1f(A62);
    };
    G4qTn.H9J = function (g_4) {
        G4qTn.x24();
        if (G4qTn && g_4)
            return G4qTn.I1f(g_4);
    };
    G4qTn.r72();
    G4qTn.j7K = function (o3o) {
        G4qTn.r72();
        if (G4qTn && o3o)
            return G4qTn.I6k(o3o);
    };
    return (function () {
        var y6x = G4qTn;
        y6x.v5x = function (N9Z) {
            y6x.r72();
            if (y6x && N9Z)
                return y6x.I1f(N9Z);
        };
        y6x.r72();
        y6x.Q9v = function (y41) {
            y6x.x24();
            if (y6x && y41)
                return y6x.I6k(y41);
        };
        var T3A,
        c9o,
        x9h,
        L,
        U; {
            if (typeof define === "function" && define.amd) {
                T3A = "s";
                T3A += "t";
                T3A += "x";
                c9o = "st";
                c9o += "xThi";
                c9o += "rdParty";
                define(["stxTimeZoneData", c9o, T3A], function (q53, T3D, q48) {
                    return X(T3D, q48);
                });
            } else {
                x9h = "un";
                x9h += "defined";
                L = {};
                if (typeof window.STXThirdParty != x9h) {
                    L = window.STXThirdParty;
                }
                U = {
                    "STX": window.STX,
                    "STXChart": window.STXChart,
                    "$$": window.$$,
                    "$$$": window.$$$
                };
                X(L, U);
            }
        }
        function X(N, R) {
            y6x.f1W = function (O6H) {
                y6x.r72();
                if (y6x && O6H)
                    return y6x.I1f(O6H);
            };
            y6x.K9Q = function (F8q) {
                y6x.r72();
                if (y6x)
                    return y6x.I6k(F8q);
            };
            var M94,
            K,
            B,
            P,
            D,
            A,
            H,
            W,
            G,
            Y;
            M94 = "<div class=\"stx_crosshair stx_cross";
            M94 += "hair_x\" ";
            M94 += "style=\"display: none;\"></div>";
            K = N.plotSpline;
            B = N.plotSplinePrimitive;
            P = N.timezoneJS;
            D = R.STX;
            A = R.STXChart;
            H = R.$$;
            W = R.$$$;
            A.prototype.plugins = {};
            if (D.isSurface) {
                D.gesture = new MSGesture();
                D.gesture.target = document.body;
                D.gesturePointerId = null;
            }
            A.htmlControls = {
                "annotationSave": '<span class="stx-btn stx_annotation_save" style="display: none;">save</span>',
                "annotationCancel": '<span class="stx-btn stx_annotation_cancel" style="display: none; margin-left:10px;">cancel</span>',
                "mSticky": '<div id="mSticky"> <span id="mStickyInterior"></span> <span id="mStickyRightClick" class=""><span class="overlayEdit stx-btn" style="display:none"><span>&nbsp;</span></span> <span id="overlayTrashCan" class="stx-btn" style="display:none"><span>&nbsp;</span></span> <span id="mouseDeleteInstructions"><span>(</span><span id="mouseDeleteText">right-click to delete</span><span id="mouseManageText">right-click to manage</span><span>)</span></span></span></div>',
                "crossX": M94,
                "crossY": '<div class="stx_crosshair stx_crosshair_y" style="display: none;"></div>',
                "chartControls": '<div class="stx_chart_controls" style="display: none; bottom: 22px;"><div id="chartSize"><span id="zoomOut" class="stx-zoom-out"></span><span id="zoomIn" class="stx-zoom-in"></span></div></div>',
                "home": '<div id="home" class="stx_jump_today home" style="display:none"><span></span></div>',
                "floatDate": '<div class="stx-float-date" style="display: none;"></div>',
                "handleTemplate": '<div class="stx-ico-handle" style="display: none;"><span></span></div> ',
                "iconsTemplate": '<div class="stx-panel-control"><div class="stx-panel-title"></div><div class="stx-btn-panel"><span class="stx-ico-up"></span></div><div class="stx-btn-panel"><span class="stx-ico-focus"></span></div><div class="stx-btn-panel"><span class="stx-ico-down"></span></div><div class="stx-btn-panel"><span class="stx-ico-edit"></span></div><div class="stx-btn-panel"><span class="stx-ico-close"></span></div></div>',
                "baselineHandle": '<div class="stx-baseline-handle fa" style="display: none;"></div>'
            };
            A.prototype.registerHTMLElements = function () {
                var M,
                O,
                n8P,
                V,
                T,
                N6_,
                e6Z,
                E,
                F;
                M = this.chart.container;
                for (var C in A.htmlControls) {
                    if (typeof this.chart[C] == "undefined" && typeof this.controls[C] == "undefined") {
                        if (!this.allowZoom && C == "chartControls")
                            continue;
                        y6x.E_X(0);
                        O = W(y6x.v50("#", C), M);
                        if (O) {
                            this.chart[C] = O;
                            this.controls[C] = O;
                        } else {
                            n8P = "D";
                            n8P += "I";
                            n8P += "V";
                            V = A.htmlControls[C];
                            T = document.createElement(n8P);
                            T.innerHTML = V;
                            O = T.firstChild;
                            M.appendChild(O);
                            this.chart[C] = O;
                            this.controls[C] = O;
                            O.id = C;
                        }
                    }
                }
                if (this.controls.chartControls) {
                    N6_ = "#z";
                    N6_ += "oomOut";
                    e6Z = "#zo";
                    e6Z += "om";
                    e6Z += "In";
                    E = W(e6Z, this.controls.chartControls);
                    F = W(N6_, this.controls.chartControls);
                    D.safeClickTouch(E, (function (O4) {
                            return function (U7) {
                                O4.zoomIn();
                                U7.stopPropagation();
                            };
                        })(this));
                    D.safeClickTouch(F, (function (Y0) {
                            return function (Q2) {
                                y6x.x24();
                                Y0.zoomOut();
                                Q2.stopPropagation();
                            };
                        })(this));
                    if (!D.touchDevice) {
                        E.onmouseover = (function (H_) {
                            y6x.x24();
                            return function (p7) {
                                y6x.x24();
                                H_.modalBegin();
                            };
                        })(this);
                        E.onmouseout = (function (M4) {
                            return function (t3) {
                                M4.modalEnd();
                            };
                        })(this);
                        F.onmouseover = (function (v3) {
                            y6x.x24();
                            return function (a3) {
                                y6x.x24();
                                v3.modalBegin();
                            };
                        })(this);
                        F.onmouseout = (function (c4) {
                            y6x.r72();
                            return function (K4) {
                                y6x.r72();
                                c4.modalEnd();
                            };
                        })(this);
                    }
                }
                if (this.controls.home) {
                    D.safeClickTouch(this.controls.home, (function (t4) {
                            return function (A_) {
                                t4.home({
                                    animate: !!"1"
                                });
                                A_.stopPropagation();
                            };
                        })(this));
                    if (!D.touchDevice) {
                        this.controls.home.onmouseover = (function (o6) {
                            return function (P8) {
                                y6x.x24();
                                o6.modalBegin();
                            };
                        })(this);
                        this.controls.home.onmouseout = (function (l7) {
                            return function (r5) {
                                l7.modalEnd();
                            };
                        })(this);
                    }
                }
            };
            D.camelCaseRegExp = /-([a-z])/g;
            D.makeCamelCase = function (t$) {
                y6x.x24();
                return t$.replace(D.camelCaseRegExp, function (e1) {
                    y6x.r72();
                    return e1[1].toUpperCase();
                });
            };
            A.prototype.cloneStyle = function (x5) {
                var l5,
                q5,
                Y2,
                v2,
                W$,
                L$,
                Y5,
                W2;
                function R_(B0) {
                    y6x.r72();
                    return B0[1].toUpperCase();
                }
                l5 = {};
                q5 = !!"";
                for (var O$ in x5) {
                    Y2 = x5[O$];
                    if (O$ == "backgroundAttachment") {
                        q5 = !0;
                    }
                    if (q5) {
                        if (Y2 && Y2.constructor == String && isNaN(O$)) {
                            l5[O$] = Y2;
                        }
                    } else if (!isNaN(O$)) {
                        v2 = x5.getPropertyValue(Y2);
                        if (v2) {
                            Y2 = Y2.split("-");
                            W$ = 0;
                            L$ = Y2.length;
                            Y5 = Y2[0];
                            while (++W$ < L$) {
                                y6x.r9e(1);
                                var d5P = y6x.z7A(7, 21, 8, 10, 1);
                                Y5 += Y2[W$].charAt(0).toUpperCase() + Y2[W$].slice(d5P);
                            }
                            l5[Y5] = v2;
                        }
                    } else {
                        W2 = O$.replace(D.camelCaseRegExp, R_);
                        l5[W2] = Y2;
                    }
                }
                return l5;
            };
            A.prototype.canvasStyle = function (O3) {
                var V2,
                x8,
                X2;
                y6x.r72();
                V2 = this.styles[O3];
                if (!V2) {
                    x8 = document.createElement("div");
                    x8.className = O3;
                    document.body.appendChild(x8);
                    X2 = getComputedStyle(x8);
                    V2 = this.styles[O3] = this.cloneStyle(X2);
                    document.body.removeChild(x8);
                    if (!X2) {
                        this.styles[O3] = null;
                    }
                }
                return V2;
            };
            A.prototype.colorOrStyle = function (b7) {
                var m$7;
                m$7 = "tr";
                m$7 += "ansparen";
                m$7 += "t";
                if (b7.indexOf(6606 === ( + "880", 5650) ? (0xaee, !!0) : "#") != -1) {
                    return b7;
                }
                if (b7.indexOf("rgba(") != -1) {
                    return b7;
                }
                if (b7.indexOf("rgb(") != -1) {
                    return b7;
                }
                if (b7 == m$7) {
                    return b7;
                }
                return this.canvasStyle(b7);
            };
            A.prototype.clearStyles = function () {
                y6x.r72();
                this.styles = {};
            };
            A.prototype.setStyle = function (M8, V9, u4) {
                y6x.x24();
                if (!this.styles[M8]) {
                    this.canvasStyle(M8);
                }
                if (!this.styles[M8]) {
                    this.styles[M8] = {};
                }
                this.styles[M8][D.makeCamelCase(V9)] = u4;
            };
            A.prototype.canvasFont = function (l1, w_) {
                var D9Z,
                q_,
                D2;
                D9Z = "un";
                D9Z += "defined";
                if (!w_) {
                    w_ = this.chart.context;
                }
                q_ = this.canvasStyle(l1);
                if (!q_) {
                    return;
                }
                y6x.E_X(2);
                var a1k = y6x.z7A(11, 1, 1, 6382);
                y6x.r9e(0);
                y6x.r72();
                var M4k = y6x.z7A(0, 1);
                y6x.E_X(3);
                var D1I = y6x.z7A(20, 946, 3, 11, 616790);
                y6x.r9e(4);
                var h1T = y6x.z7A(3252, 12);
                y6x.E_X(2);
                var d53 = y6x.v50(999, 13, 1, 91);
                y6x.E_X(5);
                var s9c = y6x.v50(8, 3, 14, 55, 18);
                y6x.E_X(6);
                var M$C = y6x.v50(132592, 14, 579, 17);
                y6x.r9e(0);
                var O6V = y6x.v50(303, 5747);
                y6x.E_X(7);
                var Q65 = y6x.z7A(20, 25, 8685, 10);
                y6x.r9e(8);
                var h6v = y6x.z7A(9389, 2, 6, 6, 46948);
                y6x.E_X(6);
                var t1_ = y6x.z7A(10011, 2, 911, 6);
                D2 = q_.fontStyle + ((147.55, a1k) <= 601.07 ? ("483.8" * M4k, D1I) < (635.06, h1T) ? !1 : (d53, !1) : " ") + q_.fontWeight + " " + q_.fontSize + (("5100" << s9c, M$C) === (O6V, Q65) ? (h6v, t1_) : " ") + q_.fontFamily;
                if (D2.indexOf(D9Z) == -1) {
                    w_.font = D2;
                } else {
                    this.styles[l1] = null;
                    y6x.r9e(0);
                    console.log(y6x.v50("bad css style for class ", l1));
                }
            };
            y6x.r72();
            A.prototype.canvasColor = function (x6, Q4) {
                var F_,
                f2,
                w0;
                if (!Q4) {
                    Q4 = this.chart.context;
                }
                F_ = this.canvasStyle(x6);
                if (!F_) {
                    return;
                }
                f2 = F_.color;
                if (D.isTransparent(f2)) {
                    f2 = this.defaultColor;
                }
                Q4.globalAlpha =  + "1";
                Q4.fillStyle = f2;
                Q4.strokeStyle = f2;
                w0 = F_.opacity;
                if (typeof w0 != "undefined") {
                    Q4.globalAlpha = w0;
                }
            };
            A.prototype.getCanvasFontSize = function (I$) {
                var Z0,
                K9;
                Z0 = this.canvasStyle(I$);
                K9 = Z0.fontSize;
                if (!K9) {
                    K9 = "12";
                }
                return parseInt(D.stripPX(K9));
            };
            A.prototype.getCanvasColor = function (S7) {
                var U9;
                U9 = this.canvasStyle(S7);
                return U9.color;
            };
            A.hideDates = function () {
                y6x.r72();
                return !({});
            };
            A.prototype.runPrepend = function (f6, I3, e0) {
                var U3,
                y9;
                y6x.r9e(0);
                U3 = this[y6x.z7A("prepend", f6)];
                if (!U3) {
                    return !!0;
                }
                if (!e0) {
                    e0 = this;
                }
                for (var f9 = 0; f9 < U3.length; f9++) {
                    y9 = U3[f9].apply(e0, I3);
                    if (y9) {
                        return y9;
                    }
                }
                return !1;
            };
            A.prototype.runAppend = function (g0, y5, B_) {
                var s0,
                b3;
                y6x.r9e(0);
                s0 = this[y6x.z7A("append", g0)];
                if (!s0) {
                    return !"1";
                }
                if (!B_) {
                    B_ = this;
                }
                for (var k6 = 0; k6 < s0.length; k6++) {
                    b3 = s0[k6].apply(B_, y5);
                    if (b3) {
                        return b3;
                    }
                }
                return !!"";
            };
            A.registerDrawingTool = function (B$, L4) {
                var C3T,
                U4H,
                s9u;
                C3T = -795599453;
                U4H = 1675349832;
                s9u = 2;
                for (var C4S = 1; y6x.P2D(C4S.toString(), C4S.toString().length, 13683) !== C3T; C4S++) {
                    A.drawingTools[B$] = L4;
                    s9u += 2;
                }
                if (y6x.P2D(s9u.toString(), s9u.toString().length, "73051" << 0) !== U4H) {
                    A.drawingTools[B$] = L4;
                }
            };
            A.prototype.createBlock = function (j8, Q5, L7, c0, M$, x4) {
                if (!x4) {
                    x4 = this.chart.context;
                }
                y6x.x24();
                if (typeof c0 == "undefined") {
                    return;
                }
                this.canvasColor(M$, x4);
                x4.fillRect(j8, L7, Q5, c0);
                x4.globalAlpha = 1;
            };
            A.prototype.changeOccurred = function (e5) {
                var A7u,
                E3q;
                A7u = "l";
                A7u += "ayout";
                if (this.currentlyImporting) {
                    return;
                }
                if (this.changeCallback) {
                    this.changeCallback(this, e5);
                }
                if (e5 == A7u) {
                    E3q = "la";
                    E3q += "yo";
                    E3q += "u";
                    E3q += "t";
                    this.dispatch(E3q, {
                        stx: this,
                        symbol: this.chart.symbol,
                        symbolObject: this.chart.symbolObject,
                        layout: this.layout
                    });
                } else if (e5 == "vector") {
                    this.dispatch("drawing", {
                        stx: this,
                        symbol: this.chart.symbol,
                        symbolObject: this.chart.symbolObject,
                        drawings: this.drawingObjects
                    });
                }
            };
            A.prototype.setChartType = function (C_) {
                y6x.x24();
                this.layout.chartType = C_;
                if (this.displayInitialized) {
                    this.draw();
                }
                this.changeOccurred("layout");
            };
            A.prototype.setAggregationType = function (T7) {
                this.layout.aggregationType = T7;
                y6x.x24();
                if (this.chart.canvas) {
                    this.createDataSet();
                    this.draw();
                }
                this.changeOccurred("layout");
            };
            A.prototype.setChartScale = function (p_) {
                if (!p_) {
                    p_ = "linear";
                }
                this.layout.chartScale = p_;
                y6x.x24();
                if (this.chart.canvas) {
                    this.draw();
                }
                this.changeOccurred("layout");
            };
            A.prototype.setAdjusted = function (W3) {
                this.layout.adj = W3;
                if (this.chart.canvas) {
                    this.createDataSet();
                    this.draw();
                }
                this.changeOccurred("layout");
            };
            A.prototype.setVolumeUnderlay = function (d3) {
                var x5l;
                x5l = "lay";
                x5l += "o";
                x5l += "u";
                x5l += "t";
                this.layout.volumeUnderlay = d3;
                if (this.chart.canvas) {
                    this.draw();
                }
                this.changeOccurred(x5l);
            };
            A.prototype.serializeDrawings = function () {
                var q0;
                q0 = [];
                for (var y$ = 0; y$ < this.drawingObjects.length; y$++) {
                    q0.push(this.drawingObjects[y$].serialize());
                }
                y6x.x24();
                return q0;
            };
            A.prototype.abortDrawings = function () {
                for (var t7 = "0" ^ 0; t7 < this.drawingObjects.length; t7++) {
                    this.drawingObjects[t7].abort(!0);
                }
                y6x.r72();
                this.drawingObjects = [];
            };
            A.prototype.reconstructDrawings = function (e7) {
                var u$,
                c8,
                w9;
                for (var w7 = 0; w7 < e7.length; w7++) {
                    u$ = e7[w7];
                    if (u$.name == "fibonacci") {
                        u$.name = "retracement";
                    }
                    c8 = A.drawingTools[u$.name];
                    if (!c8) {
                        if (D.Drawing[u$.name]) {
                            c8 = D.Drawing[u$.name];
                            A.registerDrawingTool(u$.name, c8);
                        }
                    }
                    if (c8) {
                        w9 = new c8();
                        w9.reconstruct(this, u$);
                        this.drawingObjects.push(w9);
                    }
                }
            };
            A.prototype.clearDrawings = function (A2) {
                var w3;
                w3 = D.shallowClone(this.drawingObjects);
                this.abortDrawings();
                if (A2) {
                    this.undoStamps = [];
                } else {
                    this.undoStamp(w3, D.shallowClone(this.drawingObjects));
                }
                this.changeOccurred("vector");
                this.createDataSet();
                this.deleteHighlighted(); ;
            };
            A.prototype.createDrawing = function (T1, X3) {
                var X4;
                X4 = new D.Drawing[T1]();
                y6x.x24();
                X4.reconstruct(this, X3);
                this.drawingObjects.push(X4);
                this.draw();
                return X4;
            };
            A.prototype.removeDrawing = function (G7) {
                for (var H1 = 0; H1 < this.drawingObjects.length; H1++) {
                    if (this.drawingObjects[H1] == G7) {
                        this.drawingObjects.splice(H1,  + "1");
                        this.changeOccurred("vector");
                        this.draw();
                        return;
                    }
                }
            };
            A.prototype.dateFromTick = function (O6, I4, H$) {
                var A8,
                H3,
                r8,
                E3;
                if (!I4) {
                    I4 = this.chart;
                }
                A8 = I4.dataSet.length;
                E3 = 0;
                if (O6 < 0) {
                    r8 = this.standardMarketIterator(I4.dataSet[0].DT);
                    while (E3 > O6) {
                        H3 = r8.previous();
                        E3 -= 1;
                    }
                } else if (O6 >= A8) {
                    r8 = this.standardMarketIterator(I4.dataSet[A8 - 1].DT);
                    while (A8 - 1 + E3 < O6) {
                        H3 = r8.next();
                        E3 += 1;
                    }
                } else {
                    H3 = I4.dataSet[O6].DT;
                }
                if (H$) {
                    return new Date(H3.getTime());
                }
                return D.yyyymmddhhmm(H3);
            };
            A.prototype.calculateYAxisMargins = function (b0) {
                b0.zoom = b0.initialMarginTop + b0.initialMarginBottom;
                y6x.r9e(9);
                var P04 = y6x.z7A(13, 167, 0, 13);
                b0.scroll = (b0.initialMarginTop - b0.initialMarginBottom) / P04;
            };
            A.prototype.home = function (Y_) {
                var i4c,
                z1,
                p8,
                H2,
                A9,
                V4,
                u5,
                C6,
                n4,
                T8,
                a1,
                J$;
                i4c = "undef";
                i4c += "i";
                i4c += "ned";
                this.swipe.amplitude = 0;
                this.grabbingScreen = !!0;
                if (A.insideChart) {
                    D.unappendClassName(this.container, "stx-drag-chart");
                }
                if (typeof Y_ != "object") {
                    Y_ = {
                        maintainWhitespace: Y_
                    };
                }
                if (typeof Y_.maintainWhitespace == i4c) {
                    Y_.maintainWhitespace = !"";
                }
                this.cancelTouchSingleClick = !!({});
                if (!this.chart.dataSet || !this.chart.dataSet.length) {
                    this.draw();
                    return;
                }
                this.micropixels = 0;
                z1 = this.chart.width / this.layout.candleWidth;
                for (var h0 in this.charts) {
                    p8 = this.charts[h0];
                    if (Y_.chart && Y_.chart != p8)
                        continue;
                    H2 = 0;
                    if (Y_.maintainWhitespace && this.preferences.whitespace >= 0) {
                        H2 = this.preferences.whitespace;
                    }
                    if (Y_.whitespace) {
                        H2 = Y_.whitespace;
                    }
                    A9 = H2 / this.layout.candleWidth;
                    V4 = this.layout.chartType == "line" || this.layout.chartType == "colored_line" || this.layout.chartType == "mountain" || this.layout.chartType == "colored_mountain";
                    if (this.yaxisLabelStyle == "roundRectArrow" && !(V4 && this.extendLastTick && this.chart.yaxisPaddingRight !== 0)) {
                        u5 = 3;
                        y6x.E_X(10);
                        var I_2 = y6x.z7A(2, 29, 76, 6);
                        C6 = this.getCanvasFontSize("stx_yaxis") + u5 * ("2" >> I_2);
                        y6x.r9e(11);
                        n4 = y6x.v50(C6, "0.66");
                        A9 += n4 / this.layout.candleWidth;
                        if (A9 < 0) {
                            y6x.E_X(12);
                            A9 = y6x.v50("0", 64);
                        }
                    }
                    T8 = Math.min(z1, p8.dataSet.length);
                    if (this.chart.allowScrollPast) {
                        T8 = z1;
                    }
                    T8 -= A9;
                    a1 = Math.floor(T8);
                    this.micropixels = (T8 - a1) * this.layout.candleWidth;
                    if (V4) {
                        this.micropixels += this.layout.candleWidth / ("2" ^ 0);
                    }
                    if (this.micropixels > this.layout.candleWidth) {
                        a1++;
                        this.micropixels -= this.layout.candleWidth;
                    }
                    if (Y_.animate) {
                        J$ = this;
                        this.scrollTo(p8, a1, (function (T9, A1, i8) {
                                y6x.x24();
                                return function () {
                                    T9.calculateYAxisMargins(A1.panel.yAxis);
                                    y6x.r72();
                                    A1.scroll = i8;
                                    T9.draw();
                                };
                            })(J$, p8, a1));
                    } else {
                        p8.scroll = a1;
                        this.calculateYAxisMargins(p8.panel.yAxis);
                    }
                }
                this.draw();
            };
            A.prototype.isHome = function () {
                y6x.r9e(13);
                var i0Z = y6x.z7A(17, 17, 0);
                return this.chart.scroll - i0Z <= Math.ceil(this.chart.width / this.layout.candleWidth);
            };
            A.prototype.tickFromDate = function (a7, u8, u_, W8) {
                var Q_,
                S_,
                O0,
                c6,
                e2,
                y_,
                E0,
                z5,
                S5,
                B4;
                if (!u8) {
                    u8 = this.chart;
                }
                if (!u8.dataSet || !u8.dataSet.length) {
                    return 0;
                }
                if (!u_) {
                    u_ = 0;
                }
                if (!u8) {
                    u8 = this.chart;
                }
                Q_ = a7.constructor == Date ? a7 : D.strToDateTime(a7);
                if (!A.isDailyInterval(this.layout.interval)) {
                    Q_.setMinutes(Q_.getMinutes() + u_);
                }
                S_ = Q_.getTime();
                O0 = u8.tickCache[S_];
                if (O0 || O0 === 0) {
                    return O0;
                }
                c6 = u8.dataSet[ + "0"].DT;
                e2 = u8.dataSet[u8.dataSet.length - 1].DT;
                if (Q_ >= c6 && Q_ <= e2) {
                    for (var G4 = 0; G4 < u8.dataSet.length; G4++) {
                        y_ = u8.dataSet[G4].DT;
                        if (y_.getTime() == Q_.getTime()) {
                            u8.tickCache[S_] = G4;
                            return G4;
                        }
                        if (y_ > Q_) {
                            u8.tickCache[S_] = W8 ? G4 : G4 - 1;
                            return u8.tickCache[S_];
                        }
                    }
                }
                y6x.r9e(14);
                y6x.r72();
                E0 = y6x.v50(c6, Q_);
                z5 = E0 ? c6 : e2;
                S5 = this.standardMarketIterator(z5);
                B4 = S5.futureTick({
                    end: Q_
                });
                O0 = E0 ? B4 * -1 : u8.dataSet.length - 1 + B4;
                u8.tickCache[S_] = O0;
                return O0;
            };
            A.XAxisLabel = function (C8, n5, v4) {
                this.hz = C8;
                y6x.x24();
                this.grid = n5;
                this.text = v4;
            };
            A.prototype.createXAxis = function (u1) {
                var h9e,
                h1,
                T5,
                K5;
                h9e = "c";
                h9e += "reateXAxis";
                if (u1.dataSegment.length <= 0) {
                    return null;
                }
                if (A.hideDates()) {
                    return null;
                }
                h1 = [u1];
                T5 = this.runPrepend("createXAxis", h1);
                if (T5) {
                    return T5;
                }
                K5 = this.layout.interval;
                if (u1.xAxis.axisType == "numeric") {
                    return this.createNumericXAxis(u1);
                }
                T5 = this.createTickXAxisWithDates(u1);
                this.runAppend(h9e, h1);
                return T5;
            };
            A.prototype.drawXAxis = function (l2, g6) {
                var P59,
                c_c,
                g4p,
                g9A,
                X$h,
                r$8,
                M5,
                U5,
                K_,
                q6,
                f5,
                l8,
                T$,
                R0,
                H7,
                O8,
                F9,
                B8,
                P$,
                d4,
                I5,
                N6,
                T7k,
                b9,
                L8,
                h7,
                e4,
                v_y,
                Y57,
                M60;
                P59 = "le";
                P59 += "f";
                P59 += "t";
                c_c = "stx_grid_bord";
                c_c += "er";
                g4p = "stx_";
                g4p += "gri";
                g4p += "d";
                g4p += "_dark";
                g9A = "bo";
                g9A += "undary";
                X$h = " ";
                X$h += "  ";
                r$8 = "drawXA";
                r$8 += "xis";
                M5 = [l2, g6];
                if (this.runPrepend(r$8, M5)) {
                    return;
                }
                if (!g6) {
                    return;
                }
                U5 = null;
                K_ = this.chart.context;
                this.canvasFont("stx_xaxis");
                K_.textAlign = "center";
                K_.textBaseline = "middle";
                f5 = K_.measureText(X$h).width;
                for (var U4 = 0; U4 < g6.length; U4++) {
                    q6 = g6[U4];
                    l8 = K_.measureText(q6.text).width;
                    y6x.r9e(0);
                    T$ = Math.max(y6x.v50(l8, f5), l2.xAxis.minimumLabelWidth);
                    q6.hz = Math.floor(q6.hz + this.micropixels) +  + "0.5";
                    y6x.r9e(15);
                    var s03 = y6x.v50(20, 17, 15, 642);
                    q6.left = q6.hz - T$ / s03;
                    q6.right = q6.hz + T$ /  + "2";
                    y6x.r9e(16);
                    var j4I = y6x.v50(1, 9, 12);
                    q6.unpaddedRight = q6.hz + l8 / j4I;
                }
                R0 = new D.Plotter();
                R0.newSeries("line", "stroke", this.canvasStyle("stx_grid"));
                R0.newSeries(g9A, "stroke", this.canvasStyle(g4p));
                R0.newSeries("border", "stroke", this.canvasStyle(c_c));
                H7 = this.xAxisAsFooter === !![] ? this.chart.canvasHeight : l2.panel.bottom;
                y6x.r9e(4);
                O8 = this.whichPanel(y6x.z7A(H7, 1));
                if (!O8) {
                    return;
                }
                F9 = O8.yAxis;
                this.adjustYAxisHeightOffset(O8, F9);
                y6x.E_X(17);
                B8 = -y6x.z7A(1, "1");
                P$ = Math.MAX_VALUE;
                d4 = l2.xAxis.displayBorder || l2.xAxis.displayBorder === null;
                if (this.axisBorders === !!"1") {
                    d4 = !"";
                }
                if (this.axisBorders === !!"") {
                    d4 = ![];
                }
                I5 = d4 ? F9.bottom - 0.5 : F9.bottom;
                y6x.r9e(18);
                var g6I = y6x.z7A(1, 8, 45, 17, 18);
                N6 = H7 - this.xaxisHeight / g6I;
                if (d4) {
                    N6 += 3;
                }
                for (var v9 = 0; v9 < g6.length; v9++) {
                    T7k = "bou";
                    T7k += "nda";
                    T7k += "ry";
                    if (g6[v9].grid == T7k) {
                        P$ = g6[v9].left;
                        break;
                    }
                }
                b9 = 0;
                L8 = 0;
                for (var J6 = 0; J6 < g6.length; J6++) {
                    q6 = g6[J6];
                    if (J6 == v9) {
                        for (v9++; v9 < g6.length; v9++) {
                            if (g6[v9].grid == "boundary") {
                                P$ = g6[v9].left;
                                break;
                            }
                        }
                        if (v9 >= g6.length) {
                            v9 = -1;
                            P$ = Math.MAX_VALUE;
                        }
                        if (B8 > -1) {
                            if (q6.left < B8)
                                continue;
                        }
                    } else {
                        if (B8 > -1) {
                            if (q6.left < B8)
                                continue;
                        }
                        if (q6.right > P$)
                            continue;
                    }
                    B8 = q6.right;
                    if (Math.floor(q6.unpaddedRight) <= this.chart.right) {
                        L8++;
                        if (l2.xAxis.displayGridLines) {
                            R0.moveTo(q6.grid, q6.hz, this.xAxisAsFooter === !!({}) ? 0 : F9.top);
                            R0.lineTo(q6.grid, q6.hz, I5);
                        }
                        if (d4) {
                            R0.moveTo("border", q6.hz, I5 + "0.5" * 1);
                            R0.lineTo("border", q6.hz, I5 + ("6" ^ 0));
                        }
                        b9 = q6.hz;
                        this.canvasColor(q6.grid == "boundary" ? "stx_xaxis_dark" : "stx_xaxis");
                        K_.fillText(q6.text, q6.hz, N6);
                    }
                }
                if (d4) {
                    h7 = Math.round(F9.bottom) + 0.5;
                    e4 = Math.round(l2.right) + 0.5;
                    R0.moveTo("border", l2.left, h7);
                    v_y = -949662214;
                    Y57 = 1718760356;
                    M60 = 2;
                    for (var Z6t = 1; y6x.P2D(Z6t.toString(), Z6t.toString().length, 54237) !== v_y; Z6t++) {
                        R0.lineTo("", e4, h7);
                        M60 += 2;
                    }
                    if (y6x.a5V(M60.toString(), M60.toString().length, 19291) !== Y57) {
                        R0.lineTo("", e4, h7);
                    }
                    R0.lineTo("border", e4, h7);
                }
                R0.draw(K_);
                K_.textAlign = P59;
                this.runAppend("drawXAxis", M5);
            };
            A.prototype.createNumericXAxis = function (m8) {
                var Q4D,
                Y6,
                m5,
                W9,
                g2,
                C4,
                u7,
                a2,
                T_,
                j_,
                J7,
                m0,
                p1,
                m$,
                L2,
                U_;
                Q4D = "i";
                Q4D += "ndex";
                axisRepresentation = [];
                m8.xaxis = [];
                for (var i0 = 0; i0 < m8.maxTicks; i0++) {
                    if (m8.dataSegment[i0])
                        break;
                    m8.xaxis.push(null);
                }
                for (var e9 = i0; e9 < m8.maxTicks; e9++) {
                    if (!m8.dataSegment[i0])
                        break;
                }
                Y6 = (e9 - i0) / m8.maxTicks;
                m5 = m8.xAxis.idealTickSizePixels ? m8.xAxis.idealTickSizePixels : m8.xAxis.autoComputedTickSizePixels;
                W9 = Math.round(this.chart.width * Y6 / m5);
                function K6(D4, k_) {
                    var t8,
                    U1,
                    i5;
                    t8 = Math.floor(Math.log10(D4));
                    y6x.r9e(19);
                    var H$Y = y6x.v50(3, 4, 2, 1);
                    U1 = D4 / Math.pow(H$Y, t8);
                    if (k_) {
                        if (U1 <  + "1.5") {
                            i5 = 1;
                        } else if (U1 <  + "3") {
                            i5 = 2;
                        } else if (U1 < 7) {
                            i5 =  + "5";
                        } else {
                            i5 = 10;
                        }
                    } else {
                        if (U1 <= 1) {
                            i5 = 1;
                        } else if (U1 <= 2) {
                            i5 = 2;
                        } else if (U1 <= 5) {
                            i5 = 5;
                        } else {
                            i5 = 10;
                        }
                    }
                    y6x.E_X(20);
                    var A7q = y6x.v50(19, 26, 3);
                    return i5 * Math.pow(A7q, t8);
                }
                g2 = this.determineMinMax(m8.dataSegment, [Q4D]);
                C4 = g2[1];
                u7 = g2[0];
                y6x.E_X(4);
                a2 = y6x.v50(C4, u7);
                y6x.r9e(4);
                T_ = K6(y6x.v50(C4, u7), !1);
                y6x.r9e(21);
                j_ = K6(y6x.z7A(1, a2, W9), !0);
                J7 = Math.floor(u7 / j_) * j_;
                m0 = Math.ceil(C4 / j_) * j_;
                p1 = J7;
                if (J7 < u7) {
                    y6x.E_X(0);
                    p1 = y6x.z7A(J7, j_);
                }
                for (i0; i0 < m8.maxTicks; i0++) {
                    L2 = m8.dataSegment[i0];
                    if (L2) {
                        U_ = {
                            index: L2.index,
                            data: L2
                        };
                        m8.xaxis.push(U_);
                        if (L2.index < p1)
                            continue;
                        if (L2.index == p1) {
                            m$ = m8.left + i0 * this.layout.candleWidth + this.micropixels;
                        } else if (L2.index > p1) {
                            y6x.r9e(22);
                            var w7w = y6x.v50(4, 15, 1, 7, 20);
                            m$ = m8.left + i0 * this.layout.candleWidth - w7w + this.micropixels;
                        }
                        axisRepresentation.push(new A.XAxisLabel(m$, "line", p1));
                        p1 += j_;
                    } else {
                        m8.xaxis.push(null);
                    }
                }
                return axisRepresentation;
            };
            A.prototype.createTickXAxisWithDates = function (l3) {
                var f3,
                p9,
                F4,
                d9,
                B9,
                P4,
                h$,
                F6,
                W0,
                E7,
                Z3,
                Z9,
                o1,
                d_,
                w1,
                s1,
                Y9,
                E4,
                k5,
                i1,
                m7,
                W6,
                k4,
                I_,
                C9,
                e8,
                G0,
                N8,
                j1,
                J_,
                i3R,
                h6$,
                y3,
                g1,
                W3A;
                if (!l3) {
                    l3 = this.chart;
                }
                l3.xaxis = [];
                if (!this.timeIntervalMap) {
                    this.timePossibilities = [D.MILLISECOND, D.SECOND, D.MINUTE, D.HOUR, D.DAY, D.MONTH, D.YEAR];
                    this.timeIntervalMap = {};
                    this.timeIntervalMap[D.MILLISECOND] = {
                        arr: [ + "1", 2, 5, "10" ^ 0, 20, 50,  + "100", 250, 500],
                        minTimeUnit: 0,
                        maxTimeUnit: 1000
                    };
                    this.timeIntervalMap[D.SECOND] = {
                        arr: [1, 2, 5, 10, 15, 30],
                        minTimeUnit: 0,
                        maxTimeUnit: 60
                    };
                    this.timeIntervalMap[D.MINUTE] = {
                        arr: [1, 2, 5, 10, 15, "30" - 0],
                        minTimeUnit: 0,
                        maxTimeUnit: "60" - 0
                    };
                    this.timeIntervalMap[D.HOUR] = {
                        arr: [1, 2, 3, 4, 6, 12],
                        minTimeUnit: 0,
                        maxTimeUnit: 24
                    };
                    this.timeIntervalMap[D.DAY] = {
                        arr: [ + "1", 2, 7, "14" ^ 0],
                        minTimeUnit: "1" ^ 0,
                        maxTimeUnit: 32
                    };
                    this.timeIntervalMap[D.MONTH] = {
                        arr: [1, 2, 3, 6],
                        minTimeUnit:  + "1",
                        maxTimeUnit: 13
                    };
                    this.timeIntervalMap[D.YEAR] = {
                        arr: [1, 2, 3, 5],
                        minTimeUnit: 1,
                        maxTimeUnit: 20000000
                    };
                    this.timeIntervalMap[D.DECADE] = {
                        arr: [ + "10"],
                        minTimeUnit: "0" * 1,
                        maxTimeUnit: 2000000
                    };
                }
                y6x.r9e(12);
                f3 = [31, 28, 31,  + "30", 31, 30, 31, 31, y6x.z7A("30", 32), 31, 30, 31];
                p9 = this.layout.periodicity;
                function s7() {
                    var R4,
                    M_,
                    u0,
                    I6;
                    R4 = {
                        'begin': new Date(),
                        'interval': "day",
                        'periodicity': 1,
                        'inZone': this.dataZone,
                        'outZone': this.dataZone
                    };
                    M_ = l3.market.newIterator(R4);
                    M_.next();
                    u0 = M_.previous();
                    M_ = h$.standardMarketIterator(u0, null, l3);
                    I6 = M_.next();
                    return I6.getTime() - u0.getTime();
                }
                F4 = this.layout.interval;
                d9 = l3.xAxis.idealTickSizePixels ? l3.xAxis.idealTickSizePixels : l3.xAxis.autoComputedTickSizePixels;
                B9 = this.chart.width / d9;
                for (var z9 = 0; z9 < l3.dataSegment.length; z9++) {
                    if (l3.dataSegment[z9])
                        break;
                }
                if (z9 == l3.dataSegment.length) {
                    return [];
                }
                y6x.x24();
                P4 = 0;
                if (F4 === parseInt(F4, 10)) {
                    y6x.E_X(4);
                    var C64 = y6x.v50(720000, 660000);
                    P4 = F4 * p9 * C64 * l3.dataSegment.length;
                } else {
                    P4 = l3.dataSegment[l3.dataSegment.length - ("1" >> 32)].DT.getTime() - l3.dataSegment[z9].DT.getTime(); ;
                }
                h$ = this;
                if (P4 === 0) {
                    P4 = s7() * l3.maxTicks; ;
                } else {
                    P4 = P4 / l3.dataSegment.length * l3.maxTicks; ;
                }
                y6x.r9e(23);
                F6 = y6x.z7A(P4, B9);
                for (W0 = 0; W0 < this.timePossibilities.length; W0++) {
                    if (this.timePossibilities[W0] > F6)
                        break;
                }
                if (W0 === "0" - 0) {
                    console.log("createTickXAxisWithDates: Assertion error. msPerTick < 1");
                }
                if (W0 == this.timePossibilities.length) {
                    W0--;
                } else if (W0 > 0) {
                    y6x.E_X(4);
                    E7 = this.timePossibilities[y6x.v50(W0, 1)];
                    Z3 = this.timeIntervalMap[E7];
                    Z9 = Z3.arr[Z3.arr.length - ("1" - 0)];
                    if (F6 - E7 * Z9 < this.timePossibilities[W0] - F6) {
                        W0--;
                    }
                }
                o1 = this.timePossibilities[W0];
                if (l3.xAxis.timeUnit) {
                    o1 = l3.xAxis.timeUnit;
                }
                l3.xAxis.activeTimeUnit = o1;
                d_ = D.clone(this.timeIntervalMap[o1]);
                for (W0 = 0; W0 < d_.arr.length; W0++) {
                    if (d_.arr[W0] * o1 > F6)
                        break;
                }
                if (W0 == d_.arr.length) {
                    W0--;
                } else {
                    if (F6 - d_.arr[W0 - 1] * o1 < d_.arr[W0] * o1 - F6) {
                        W0--;
                    }
                }
                w1 = d_.arr[W0];
                if (l3.xAxis.timeUnitMultiplier) {
                    w1 = l3.xAxis.timeUnitMultiplier;
                }
                s1 = [];
                for (W0 = 0; W0 <= l3.maxTicks; W0++) {
                    if (l3.dataSegment[W0])
                        break;
                }
                if (W0 > 0 && W0 < l3.maxTicks) {
                    Y9 = this.standardMarketIterator(l3.dataSegment[W0].DT, l3.xAxis.adjustTimeZone ? this.displayZone : this.dataZone);
                    for (var f7 = W0; f7 > 0; f7--) {
                        E4 = Y9.previous();
                        l3.xaxis.unshift({
                            DT: E4,
                            Date: D.yyyymmddhhmmssmmm(E4)
                        });
                    }
                }
                k5 = 0;
                i1 = d_.minTimeUnit;
                m7 =  -  + "1";
                W6 = !!({});
                k4 = this.layout.candleWidth;
                I_ = this.standardMarketIterator(l3.dataSegment[l3.dataSegment.length -  + "1"].DT, l3.xAxis.adjustTimeZone ? this.displayZone : this.dataZone);
                for (W0; W0 < l3.maxTicks; W0++) {
                    if (W0 < l3.dataSegment.length) {
                        C9 = l3.dataSegment[W0];
                        if (C9.displayDate && l3.xAxis.adjustTimeZone) {
                            k5 = C9.displayDate;
                        } else {
                            k5 = C9.DT;
                        }
                        if (W0 && C9.leftOffset) {
                            y6x.E_X(24);
                            var g4_ = y6x.z7A(1, 9, 23, 20, 6);
                            k4 = (C9.leftOffset - C9.candleWidth / g4_) / W0;
                        }
                    } else {
                        if (!l3.xAxis.futureTicks)
                            break;
                        k5 = I_.next();
                    }
                    e8 = {
                        DT: k5,
                        Date: D.yyyymmddhhmmssmmm(k5)
                    };
                    if (W0 < l3.dataSegment.length) {
                        e8.data = l3.dataSegment[W0];
                    } else {
                        e8.data = null;
                    }
                    l3.xaxis.push(e8);
                    if (o1 == D.MILLISECOND) {
                        G0 = k5.getMilliseconds();
                        N8 = k5.getSeconds();
                    } else if (o1 == D.SECOND) {
                        G0 = k5.getSeconds();
                        N8 = k5.getMinutes();
                    } else if (o1 == D.MINUTE) {
                        G0 = k5.getMinutes();
                        N8 = k5.getHours();
                    } else if (o1 == D.HOUR) {
                        y6x.E_X(0);
                        var n1O = y6x.z7A(41, 19);
                        G0 = k5.getHours() + k5.getMinutes() / n1O;
                        N8 = k5.getDate();
                    } else if (o1 == D.DAY) {
                        G0 = k5.getDate();
                        y6x.E_X(25);
                        var L9V = y6x.v50(4, 13, 17, 18, 2);
                        N8 = k5.getMonth() + L9V;
                    } else if (o1 == D.MONTH) {
                        y6x.r9e(26);
                        var a8_ = y6x.z7A(18, 48, 17, 14);
                        G0 = k5.getMonth() + "1" * a8_;
                        N8 = k5.getFullYear();
                    } else if (o1 == D.YEAR) {
                        G0 = k5.getFullYear();
                        y6x.r9e(6);
                        var z1f = y6x.v50(199000, 2, 5000, 20);
                        N8 = k5.getFullYear() + z1f;
                    } else {
                        G0 = k5.getFullYear();
                        N8 = 0;
                    }
                    j1 = null;
                    if (m7 != N8) {
                        if (G0 <= i1) {
                            i1 = d_.minTimeUnit;
                        }
                        y6x.E_X(27);
                        var j3S = y6x.v50(15, 20, 7, 3, 14);
                        J_ = l3.left + W0 * k4 - j3S;
                        j1 = null;
                        if (o1 == D.HOUR || o1 == D.MINUTE && m7 > N8) {
                            if (l3.xAxis.formatter) {
                                i3R = "boundar";
                                i3R += "y";
                                j1 = l3.xAxis.formatter(k5, i3R, D.DAY,  + "1");
                            } else {
                                if (this.internationalizer) {
                                    j1 = this.internationalizer.monthDay.format(k5);
                                } else {
                                    j1 = k5.getMonth() + ("1" | 0) + "/" + k5.getDate();
                                }
                            }
                        } else if (o1 == D.DAY) {
                            if (m7 > N8) {
                                j1 = k5.getFullYear();
                            } else {
                                j1 = D.monthAsDisplay(k5.getMonth(), !!0, this);
                            }
                        } else if (o1 == D.MONTH) {
                            j1 = k5.getFullYear();
                        }
                        if (j1 && m7 != -1) {
                            h6$ = "bo";
                            h6$ += "u";
                            h6$ += "ndar";
                            h6$ += "y";
                            s1.push(new A.XAxisLabel(J_, h6$, j1));
                        }
                    }
                    if (G0 >= i1) {
                        if (i1 == d_.minTimeUnit) {
                            if (N8 == m7)
                                continue; ;
                        }
                        y3 = new Date(k5);
                        y6x.E_X(28);
                        var S4j = y6x.v50(3, 20, 18);
                        y6x.r9e(4);
                        var N1S = y6x.v50(40, 38);
                        y6x.E_X(0);
                        var U9J = y6x.v50(0, 1);
                        J_ = l3.left + (("2" >> 0) * W0 + S4j) * k4 / N1S - U9J;
                        g1 = Math.floor(G0 / w1) * w1;
                        if (g1 < G0) {
                            if (this.layout.interval == "week") {
                                g1 = G0;
                            } else {
                                y6x.E_X(23);
                                J_ -= y6x.v50(k4, 4);
                            };
                        }
                        if (o1 == D.MILLISECOND) {
                            y3.setMilliseconds(g1);
                        } else if (o1 == D.SECOND) {
                            y3.setMilliseconds(0);
                            y3.setSeconds(g1);
                        } else if (o1 == D.MINUTE) {
                            y6x.r9e(17);
                            y3.setMilliseconds(y6x.z7A(1, "0"));
                            y3.setSeconds(0);
                            y3.setMinutes(g1);
                        } else if (o1 == D.HOUR) {
                            y3.setMilliseconds(0);
                            y6x.E_X(17);
                            y3.setSeconds(y6x.v50(1, "0"));
                            y3.setMinutes(0);
                            y3.setHours(g1);
                        } else if (o1 == D.DAY) {
                            y3.setDate(Math.max(1, g1)); ;
                        } else if (o1 == D.MONTH) {
                            y3.setDate(1);
                            y6x.r9e(4);
                            y3.setMonth(y6x.z7A(g1, 1));
                        } else if (o1 == D.YEAR) {
                            y3.setDate( + "1");
                            y3.setMonth(0); ;
                        } else {
                            y3.setDate(1);
                            y3.setMonth( + "0"); ;
                        }
                        y6x.E_X(0);
                        i1 = y6x.z7A(g1, w1);
                        if (o1 == D.DAY) {
                            y6x.r9e(13);
                            var m8R = y6x.z7A(1, 1, 0);
                            d_.maxTimeUnit = f3[y3.getMonth()] + m8R;
                        }
                        if (i1 >= d_.maxTimeUnit) {
                            i1 = d_.minTimeUnit;
                        }
                        m7 = N8;
                        if (W6 && g1 < G0)
                            continue;
                        if (l3.xAxis.formatter) {
                            W3A = "l";
                            W3A += "i";
                            W3A += "n";
                            W3A += "e";
                            j1 = l3.xAxis.formatter(y3, W3A, o1, w1);
                        } else {
                            if (o1 == D.DAY) {
                                j1 = y3.getDate(); ;
                            } else if (o1 == D.MONTH) {
                                j1 = D.monthAsDisplay(k5.getMonth(), ![], this);
                            } else if (o1 == D.YEAR || o1 == D.DECADE) {
                                j1 = y3.getFullYear();
                            } else {
                                j1 = D.timeAsDisplay(y3, this, o1);
                            }
                        }
                        s1.push(new A.XAxisLabel(J_, "line", j1));
                    }
                    W6 = !!"";
                }
                return s1;
            };
            y6x.r9e(29);
            G = y6x.z7A(64, "0");
            Y = 0;
            A.prototype.createYAxis = function (B7, Q6) {
                var w2H,
                Z9Z,
                O5,
                V0,
                i7,
                V6,
                c9,
                G3,
                C1,
                P5,
                o2,
                n3,
                Z7l,
                I4_,
                a16,
                D3,
                q1k,
                X7o,
                l7m,
                b5,
                Y4,
                N1,
                K0,
                I$i,
                o0,
                y4,
                s8,
                u9,
                P3;
                w2H = "createYAxi";
                w2H += "s";
                Z9Z = "pr";
                Z9Z += "oj";
                Z9Z += "ecti";
                Z9Z += "on";
                if (this.runPrepend("createYAxis", arguments)) {
                    return;
                }
                y6x.r72();
                O5 = B7.chart;
                V0 = B7.name == O5.name;
                if (!Q6) {
                    Q6 = {};
                }
                Q6.noChange = !({});
                i7 = Q6.yAxis ? Q6.yAxis : B7.yAxis;
                if (A.enableCaching && i7.high == B7.cacheHigh && i7.low == B7.cacheLow) {
                    V6 = O5.dataSet.length - O5.scroll;
                    c9 = V6 + O5.maxTicks;
                    B7.cacheLeft = Math.min(B7.cacheLeft, V6);
                    B7.cacheRight = Math.max(B7.cacheRight, c9);
                    B7.cacheLeft = V6;
                    B7.cacheRight = c9;
                    Q6.noChange = !!"1";
                    G++;
                } else {
                    B7.cacheLeft = 1000000;
                    B7.cacheRight = -1;
                    B7.cacheHigh = i7.high;
                    B7.cacheLow = i7.low;
                    Y++;
                }
                G3 = O5.xAxis.idealTickSizePixels ? O5.xAxis.idealTickSizePixels : O5.xAxis.autoComputedTickSizePixels;
                if (i7.goldenRatioYAxis) {
                    if (i7.idealTickSizePixels != G3 / 1.618) {
                        Q6.noChange = !"1";
                    }
                }
                if (!Q6.noChange) {
                    this.adjustYAxisHeightOffset(B7, i7);
                    C1 = i7.height = i7.bottom - i7.top;
                    P5 = (i7.high - i7.low) / (C1 - i7.zoom);
                    if (Q6.ground && !i7.semiLog) {
                        i7.high = i7.high + i7.zoom * P5;
                    } else {
                        i7.high = i7.high + i7.zoom /  + "2" * P5 + i7.scroll * P5;
                        o2 = i7.low;
                        y6x.r9e(25);
                        var H00 = y6x.v50(2, 19, 0, 13, 1);
                        i7.low = i7.low - i7.zoom / H00 * P5 + i7.scroll * P5;
                        if (i7.semiLog && i7.low <= 0) {
                            i7.low = o2;
                        }
                    }
                    if (i7.min || i7.min === 0) {
                        i7.low = i7.min;
                    }
                    if (i7.max || i7.max === 0) {
                        i7.high = i7.max;
                    }
                    i7.shadow = i7.high - i7.low;
                    if (i7.semiLog && (!this.activeDrawing || this.activeDrawing.name != "projection")) {
                        i7.logHigh = Math.log(i7.high) / Math.LN10;
                        n3 = Math.max(i7.low, 0.000000001);
                        Z7l = -651888047;
                        I4_ =  -  + "912259943";
                        y6x.r9e(30);
                        a16 = y6x.v50(2, "2");
                        for (var a7S = 1; y6x.a5V(a7S.toString(), a7S.toString().length, 91939) !== Z7l; a7S++) {
                            i7.logLow = Math.log(n3) / Math.LN10;
                            a16 += 2;
                        }
                        if (y6x.a5V(a16.toString(), a16.toString().length, 56454) !== I4_) {
                            i7.logLow = Math.log(n3) * Math.LN10;
                        }
                        if (i7.low <= 0) {
                            i7.logLow = 0;
                        }
                        i7.logShadow = i7.logHigh - i7.logLow;
                    }
                    if (i7.goldenRatioYAxis && V0) {
                        y6x.E_X(23);
                        i7.idealTickSizePixels = y6x.v50(G3, 1.618);
                        if (i7.idealTickSizePixels === 0) {
                            D3 = this.getCanvasFontSize("stx_yaxis");
                            y6x.r9e(17);
                            i7.idealTickSizePixels = y6x.v50(5, D3);
                        }
                    } else {
                        if (!i7.idealTickSizePixels) {
                            D3 = this.getCanvasFontSize("stx_yaxis");
                            if (V0) {
                                q1k = -675796302;
                                X7o = -93949775;
                                l7m = 2;
                                for (var q2U = 1; y6x.P2D(q2U.toString(), q2U.toString().length, 92869) !== q1k; q2U++) {
                                    y6x.r9e(17);
                                    i7.idealTickSizePixels = y6x.z7A(5, D3);
                                    l7m += 2;
                                }
                                if (y6x.P2D(l7m.toString(), l7m.toString().length, "26023" << 32) !== X7o) {
                                    y6x.E_X(0);
                                    i7.idealTickSizePixels = y6x.v50(D3, 7);
                                }
                            } else {
                                y6x.r9e(17);
                                i7.idealTickSizePixels = y6x.z7A(2, D3);
                            }
                        }
                    }
                    b5 = Math.round(C1 / i7.idealTickSizePixels);
                    Y4 = Q6.range ? Q6.range[1] - Q6.range[0] : i7.shadow;
                    y6x.E_X(23);
                    i7.priceTick = Math.floor(y6x.v50(Y4, b5));
                    N1 = 1;
                    for (var v$ = 0; v$ < 10; v$++) {
                        if (i7.priceTick >  + "0")
                            break;
                        N1 *= 10;
                        i7.priceTick = Math.floor(Y4 / b5 * N1) / N1;
                    }
                    if (v$ == 10) {
                        i7.priceTick = 0.00000001;
                    }
                    i7.priceTick = Math.round(Y4 / b5 * N1) / N1;
                    K0 = Math.round(Y4 / i7.priceTick);
                    if (Q6.range && K0 < Y4 && !i7.noEvenDivisorTicks) {
                        while (K0 >= ("1" ^ 0)) {
                            if (Y4 % K0 === 0)
                                break;
                            K0--;
                        }
                        y6x.E_X(23);
                        i7.priceTick = y6x.z7A(Y4, K0);
                    }
                    if (i7.minimumPriceTick) {
                        I$i = "stx_y";
                        I$i += "ax";
                        I$i += "is";
                        o0 = i7.minimumPriceTick;
                        D3 = this.getCanvasFontSize(I$i);
                        for (var C0 = 0; C0 < 100; C0++) {
                            y6x.E_X(23);
                            y4 = y6x.z7A(Y4, o0);
                            if (C1 / y4 < D3 * 2) {
                                o0 += i7.minimumPriceTick;
                            } else
                                break;
                        }
                        if (C0 < "100" << 64) {
                            i7.priceTick = o0;
                        }
                    }
                    i7.multiplier = i7.height / i7.shadow;
                }
                if (!this.activeDrawing || this.activeDrawing.name != Z9Z) {
                    i7.high = this.valueFromPixel(B7.top, B7, i7);
                    if (i7.semiLog) {
                        i7.logHigh = Math.log(i7.high) / Math.LN10;
                        s8 = Math.max(i7.low, "0.00000000001" * 1);
                        i7.logLow = Math.log(s8) / Math.LN10;
                        i7.logShadow = i7.logHigh - i7.logLow;
                    }
                    i7.shadow = i7.high - i7.low;
                }
                i7.multiplier = i7.height / i7.shadow;
                if (i7.multiplier == Infinity) {
                    i7.multiplier =  + "0";
                }
                if (!i7.decimalPlaces && i7.decimalPlaces !== 0) {
                    if (V0) {
                        u9 = 0;
                        for (var L0 = 0; L0 < B7.yAxis.shadowBreaks.length; L0++) {
                            P3 = B7.yAxis.shadowBreaks[L0];
                            if (B7.yAxis.shadow < P3[0]) {
                                u9 = P3[1];
                            }
                        }
                        i7.printDecimalPlaces = u9; ;
                    } else {
                        i7.printDecimalPlaces = null;
                    };
                } else {
                    i7.printDecimalPlaces = i7.decimalPlaces;
                }
                this.runAppend(w2H, arguments);
            };
            A.prototype.adjustYAxisHeightOffset = function (R3, z4) {
                var q3u,
                F7I;
                q3u = "ch";
                y6x.x24();
                q3u += "ar";
                q3u += "t";
                z4.bottomOffset = 0;
                if (!this.xaxisHeight) {
                    F7I = "st";
                    F7I += "x";
                    F7I += "_xaxi";
                    F7I += "s";
                    y6x.r9e(4);
                    var t9k = y6x.z7A(8, 4);
                    this.xaxisHeight = this.getCanvasFontSize(F7I) + t9k;
                    if (this.chart.xAxis.displayBorder || this.axisBorders) {
                        this.xaxisHeight +=  + "3";
                    }
                }
                if (this.xAxisAsFooter === !0 && R3.bottom > this.chart.canvasHeight - this.xaxisHeight) {
                    z4.bottomOffset = this.xaxisHeight;
                } else if (this.xAxisAsFooter !== !![] && R3.name == q3u) {
                    z4.bottomOffset = this.xaxisHeight;
                }
                z4.bottom = R3.bottom - z4.bottomOffset;
            };
            A.prototype.drawYAxis = function (z2, C5) {
                var c3,
                U9w,
                s66,
                d5V,
                T8j,
                Z$,
                T0,
                P_,
                K8,
                I9,
                j2,
                d0,
                S4,
                v6,
                O9,
                A0,
                w5,
                j$,
                m6,
                W_,
                s_,
                X0,
                J8,
                A4,
                Z_,
                z0U,
                o71,
                Z4,
                B6,
                a6;
                if (!C5) {
                    C5 = {};
                }
                c3 = C5.yAxis ? C5.yAxis : z2.yAxis;
                y6x.x24();
                if (c3.fractional) {
                    if (!c3.originalPriceFormatter) {
                        c3.originalPriceFormatter = {
                            func: c3.priceFormatter
                        };
                    }
                    if (!c3.fractional.resolution) {
                        c3.fractional.resolution = c3.minimumPrice;
                    }
                    if (!c3.fractional.formatter) {
                        c3.fractional.formatter = "'";
                    }
                    if (!c3.priceFormatter) {
                        c3.priceFormatter = function (o_, E1, I0) {
                            var c_,
                            U0,
                            f$;
                            c_ = Math.floor(Math.round(I0 / c3.fractional.resolution) * c3.fractional.resolution);
                            U0 = Math.round((I0 - c_) / c3.fractional.resolution);
                            f$ = Math.floor(U0);
                            y6x.r9e(31);
                            var K0z = y6x.z7A(562, 13, 16, 10, 142);
                            y6x.E_X(32);
                            var U2W = y6x.z7A(9, 22100, 19899, 18);
                            y6x.E_X(33);
                            var j03 = y6x.v50(8, 2, 436666, 4, 110700);
                            y6x.r9e(4);
                            var c8k = y6x.v50(8727, 5818);
                            y6x.E_X(0);
                            var p8z = y6x.v50(1370, 5480);
                            y6x.E_X(4);
                            var P13 = y6x.z7A(8412, 20);
                            return c_ + c3.fractional.formatter + (f$ <  + "10" ? K0z ===  + "134" ? ("554" ^ 0, U2W) < (j03, c8k) ? p8z : (P13, "B") : "0" : "") + f$ + (U0 - f$ >= 0.5 ? "+" : "");
                        };
                    }
                } else {
                    if (c3.originalPriceFormatter) {
                        c3.priceFormatter = c3.originalPriceFormatter.func;
                        c3.originalPriceFormatter = null;
                    }
                }
                if (c3.pretty) {
                    return this.drawYAxisPretty(z2, C5);
                }
                if (this.runPrepend("drawYAxis", arguments)) {
                    return;
                }
                if (!C5.noDraw && !c3.noDraw) {
                    if (!c3.yAxisPlotter || !C5.noChange) {
                        U9w = "stx_y";
                        U9w += "a";
                        U9w += "xis";
                        s66 = "stx_grid";
                        s66 += "_border";
                        d5V = "s";
                        d5V += "tr";
                        d5V += "oke";
                        T8j = "t";
                        T8j += "e";
                        T8j += "xt";
                        Z$ = z2.chart;
                        T0 = z2.name == Z$.name && c3 === z2.yAxis;
                        if (!c3.priceTick) {
                            return;
                        }
                        P_ = c3.shadow;
                        if (C5.range) {
                            y6x.r9e(34);
                            var f5i = y6x.v50(7, 12, 18, 19, 3991);
                            P_ = C5.range[f5i] - C5.range[0];
                        }
                        K8 = P_ / c3.priceTick;
                        K8 = Math.round(K8);
                        if (c3.semiLog) {
                            I9 = Math.log(this.valueFromPixel(c3.bottom, z2)) / Math.LN10;
                            j2 = (c3.logHigh - c3.logLow) / K8;
                        }
                        d0 = c3.textStyle ? c3.textStyle : "stx_yaxis";
                        c3.yAxisPlotter = new D.Plotter();
                        c3.yAxisPlotter.newSeries("grid", "stroke", this.canvasStyle("stx_grid"));
                        c3.yAxisPlotter.newSeries(T8j, "fill", this.colorOrStyle(d0));
                        c3.yAxisPlotter.newSeries("border", d5V, this.canvasStyle(s66));
                        S4 = 0;
                        v6 = C5.range ? C5.range[1] : c3.high;
                        O9 = C5.range ? C5.range[0] : c3.low;
                        A0 = c3.displayBorder === null ? Z$.panel.yAxis.displayBorder : c3.displayBorder;
                        if (this.axisBorders === !({})) {
                            A0 = !({});
                        }
                        if (this.axisBorders === !!"1") {
                            A0 = !!({});
                        }
                        j$ = c3.position === null ? Z$.panel.yAxis.position : c3.position;
                        if (j$ == "left") {
                            w5 = c3.left + c3.width;
                        } else {
                            w5 = c3.left;
                        }
                        m6 = Math.round(w5) +  + "0.5";
                        W_ = A0 ? 3 : 0;
                        if (j$ == "left") {
                            W_ = A0 ? -3 : 0;
                        }
                        if (T0) {
                            if (c3.shadow < "1" >> 64) {
                                y6x.r9e(35);
                                var t3q = y6x.v50(154, 6, 9, 7, 18);
                                y6x.r9e(36);
                                var S$2 = y6x.z7A(8, 18, 16, 7);
                                S4 = (parseInt(O9 / c3.priceTick, t3q) + S$2) * c3.priceTick - O9;
                            } else {
                                S4 = c3.priceTick - Math.round(O9 % c3.priceTick * z2.chart.roundit) / z2.chart.roundit;
                            }
                        } else {
                            S4 = v6 % c3.priceTick;
                        }
                        s_ = this.getCanvasFontSize(U9w);
                        for (var R1 = 0; R1 < K8; R1++) {
                            if (c3.semiLog) {
                                y6x.E_X(37);
                                J8 = y6x.z7A(j2, I9, R1);
                                X0 = Math.pow( + "10", J8);
                            } else {
                                if (T0) {
                                    X0 = O9 + R1 * c3.priceTick + S4;
                                } else {
                                    X0 = v6 - R1 * c3.priceTick - S4;
                                }
                            }
                            A4 = this.pixelFromPrice(X0, z2, c3);
                            Z_ = Math.round(A4) + 0.5;
                            if (Z_ + s_ / 2 > z2.bottom)
                                continue;
                            if (Z_ - s_ / 2 < z2.top)
                                continue;
                            if (c3.displayGridLines) {
                                c3.yAxisPlotter.moveTo("grid", z2.left, Z_);
                                c3.yAxisPlotter.lineTo("grid", z2.right, Z_);
                            }
                            if (A0) {
                                z0U = "b";
                                z0U += "o";
                                z0U += "rd";
                                z0U += "er";
                                o71 = "b";
                                o71 += "or";
                                o71 += "de";
                                o71 += "r";
                                y6x.E_X(4);
                                c3.yAxisPlotter.moveTo(o71, y6x.v50(m6, 0.5), Z_);
                                y6x.r9e(0);
                                c3.yAxisPlotter.lineTo(z0U, y6x.v50(m6, W_), Z_);
                            }
                            if (c3.priceFormatter) {
                                X0 = c3.priceFormatter(this, z2, X0);
                            } else {
                                X0 = this.formatYAxisPrice(X0, z2, null, c3);
                            }
                            Z4 = c3.textBackground ? this.containerColor : null;
                            y6x.r9e(38);
                            B6 = y6x.z7A(3, w5, W_);
                            if (j$ == "left") {
                                y6x.E_X(39);
                                var L7U = y6x.z7A(17, 1, 2, 17);
                                B6 = c3.left + L7U;
                                if (c3.justifyRight) {
                                    y6x.r9e(0);
                                    var G9T = y6x.z7A(0, 3);
                                    B6 = c3.left + c3.width + W_ - G9T;
                                }
                            } else {
                                if (c3.justifyRight) {
                                    B6 = w5 + c3.width;
                                }
                            }
                            c3.yAxisPlotter.addText("text", X0, B6, Z_, Z4, null, s_);
                        }
                        if (A0) {
                            a6 = Math.round(c3.bottom) + 0.5;
                            c3.yAxisPlotter.moveTo("border", m6, c3.top);
                            c3.yAxisPlotter.lineTo("border", m6, a6);
                            c3.yAxisPlotter.draw(this.chart.context, "border");
                        }
                    }
                    this.plotYAxisGrid(z2);
                }
                this.runAppend("drawYAxis", arguments);
            };
            A.prototype.drawYAxisPretty = function (Q3, H8) {
                var v_,
                L69,
                L3Y,
                h3Q,
                s6,
                r7,
                F3,
                z0,
                K1,
                z8,
                j6,
                T2,
                Z1,
                i4,
                H0,
                R6,
                E9,
                D$,
                O1,
                P2,
                X1,
                M0,
                f0,
                J9,
                n9,
                F7,
                E5,
                F2,
                g5,
                p3,
                s2,
                g$,
                r1j,
                k9,
                k$,
                u2,
                b3k,
                d5,
                j3,
                N0l,
                i5o,
                D5;
                if (this.runPrepend("drawYAxis", arguments)) {
                    return;
                }
                if (!H8) {
                    H8 = {};
                }
                y6x.r72();
                v_ = H8.yAxis ? H8.yAxis : Q3.yAxis;
                if (!H8.noDraw && !v_.noDraw) {
                    if (!v_.yAxisPlotter || !H8.noChange) {
                        L69 = "stx";
                        L69 += "_y";
                        L69 += "ax";
                        L69 += "is";
                        L3Y = "strok";
                        L3Y += "e";
                        h3Q = "st";
                        h3Q += "x_";
                        h3Q += "g";
                        h3Q += "rid";
                        s6 = Q3.chart;
                        r7 = Q3.name == s6.name && v_ === Q3.yAxis;
                        if (!v_.priceTick) {
                            return;
                        }
                        if (isNaN(v_.high) || isNaN(v_.low)) {
                            return;
                        }
                        F3 = v_.shadow;
                        if (H8.range) {
                            y6x.r9e(40);
                            var W$I = y6x.z7A(6, 7);
                            F3 = H8.range["1" | W$I] - H8.range[0];
                        }
                        z0 = v_.height / v_.idealTickSizePixels;
                        z0 = Math.round(z0);
                        K1 = v_.textStyle ? v_.textStyle : "stx_yaxis";
                        v_.yAxisPlotter = new D.Plotter();
                        v_.yAxisPlotter.newSeries("grid", "stroke", this.canvasStyle(h3Q));
                        v_.yAxisPlotter.newSeries("text", "fill", this.colorOrStyle(K1));
                        v_.yAxisPlotter.newSeries("border", L3Y, this.canvasStyle("stx_grid_border"));
                        z8 = 0;
                        j6 = H8.range ? H8.range[1] : v_.high;
                        T2 = H8.range ? H8.range[0] : v_.low;
                        Z1 = v_.displayBorder === null ? s6.panel.yAxis.displayBorder : v_.displayBorder;
                        if (this.axisBorders === !"1") {
                            Z1 = !"1";
                        }
                        if (this.axisBorders === !!({})) {
                            Z1 = !![];
                        }
                        H0 = v_.position === null ? s6.panel.yAxis.position : v_.position;
                        if (H0 == "left") {
                            i4 = v_.left + v_.width;
                        } else {
                            i4 = v_.left;
                        }
                        R6 = Math.round(i4) + 0.5;
                        E9 = Z1 ? 3 : 0;
                        if (H0 == "left") {
                            E9 = Z1 ?  - ("3" << 32) : 0;
                        }
                        D$ = this.getCanvasFontSize(L69);
                        O1 = v_.increments;
                        P2 = O1.length;
                        X1 = 0;
                        M0 = 1;
                        f0 = 0;
                        J9 = 0;
                        n9 = 0;
                        F7 = Number.MAX_VALUE;
                        for (var R2 = 0; R2 < 100; R2++) {
                            y6x.r9e(41);
                            var b$r = y6x.v50(20, 2, 16, 14);
                            f0 = O1[X1] * Math.pow(b$r, n9);
                            y6x.E_X(23);
                            M0 = Math.floor(y6x.v50(F3, f0));
                            y6x.E_X(4);
                            E5 = Math.abs(y6x.z7A(z0, M0));
                            if (E5 > F7) {
                                break;
                            } else {
                                F7 = E5;
                            }
                            if (M0 == z0) {
                                J9 = f0;
                                break;
                            } else if (M0 > z0) {
                                X1++;
                                if (X1 >= P2) {
                                    X1 =  + "0";
                                    n9++;
                                }
                            } else {
                                X1--;
                                if (X1 < 0) {
                                    y6x.r9e(4);
                                    X1 = y6x.z7A(P2, 1);
                                    n9--;
                                }
                            }
                            J9 = f0;
                        }
                        F2 = Math.ceil(T2 / J9) * J9;
                        g5 = v_.bottom - this.pixelFromPrice(F2, Q3, v_);
                        p3 = 0;
                        if (g5 > v_.idealTickSizePixels && v_.semiLog && v_.prettySemiLog) {
                            for (s2 = Math.ceil(T2); s2 < F2 && F2 % s2 !== 0; ++s2) { ;
                            }
                            if (s2 < F2) {
                                if (F2 === J9) {
                                    J9 = s2;
                                    p3 = s2;
                                }
                                F2 = s2;
                            }
                        }
                        g$ = 0;
                        for (var G2 = 0; G2 < 100; G2++) {
                            r1j = "lef";
                            r1j += "t";
                            y6x.E_X(37);
                            k9 = y6x.v50(J9, F2, g$);
                            if (k9 > j6)
                                break;
                            J9 += p3;
                            g$++;
                            k$ = this.pixelFromPrice(k9, Q3, v_);
                            u2 = Math.round(k$) + 0.5;
                            if (u2 + D$ / 2 > Q3.bottom)
                                continue;
                            if (u2 - D$ / 2 < Q3.top)
                                continue;
                            if (v_.displayGridLines) {
                                b3k = "g";
                                b3k += "r";
                                b3k += "id";
                                v_.yAxisPlotter.moveTo(b3k, Q3.left, u2);
                                v_.yAxisPlotter.lineTo("grid", Q3.right, u2);
                            }
                            if (Z1) {
                                y6x.r9e(4);
                                v_.yAxisPlotter.moveTo("border", y6x.z7A(R6, 0.5), u2);
                                y6x.r9e(0);
                                v_.yAxisPlotter.lineTo("border", y6x.v50(R6, E9), u2);
                            }
                            if (v_.priceFormatter) {
                                k9 = v_.priceFormatter(this, Q3, k9);
                            } else {
                                k9 = this.formatYAxisPrice(k9, Q3, null, v_);
                            }
                            d5 = v_.textBackground ? this.containerColor : null;
                            y6x.r9e(38);
                            j3 = y6x.v50(3, i4, E9);
                            if (H0 == r1j) {
                                y6x.E_X(42);
                                var t38 = y6x.v50(2, 2, 7, 27, 17);
                                j3 = v_.left + t38;
                                if (v_.justifyRight) {
                                    y6x.E_X(8);
                                    var b49 = y6x.v50(18, 3, 14, 11, 184);
                                    j3 = v_.left + v_.width + E9 - b49;
                                }
                            } else {
                                if (v_.justifyRight) {
                                    j3 = i4 + v_.width;
                                }
                            }
                            v_.yAxisPlotter.addText("text", k9, j3, u2, d5, null, D$);
                        }
                        if (G2 >= "100" * 1) {
                            N0l = "drawYAxisPretty: assertion error";
                            N0l += ". zz reached 100";
                            console.log(N0l);
                        }
                        if (Z1) {
                            i5o = "b";
                            i5o += "order";
                            D5 = Math.round(v_.bottom) + 0.5;
                            v_.yAxisPlotter.moveTo("border", R6, v_.top);
                            v_.yAxisPlotter.lineTo("border", R6, D5);
                            v_.yAxisPlotter.draw(this.chart.context, i5o);
                        }
                    }
                    this.plotYAxisGrid(Q3);
                }
                this.runAppend("drawYAxis", arguments);
            };
            A.prototype.plotYAxisGrid = function (j7) {
                var S8F,
                b1;
                S8F = "p";
                S8F += "lotYAxi";
                S8F += "s";
                S8F += "Grid";
                if (this.runPrepend(S8F, arguments)) {
                    return;
                }
                b1 = this.chart.context;
                j7.yAxis.yAxisPlotter.draw(b1, "grid");
                this.runAppend("plotYAxisGrid", arguments);
            };
            A.prototype.plotYAxisText = function (z3) {
                var h53,
                p5,
                U7j,
                K17,
                K7,
                S9,
                a5;
                h53 = "p";
                h53 += "lotYAxisText";
                if (this.runPrepend("plotYAxisText", arguments)) {
                    return;
                }
                y6x.r72();
                p5 = z3.yaxisLHS.concat(z3.yaxisRHS);
                for (var Z7 = 0; Z7 < p5.length; Z7++) {
                    U7j = "alph";
                    U7j += "abetic";
                    K17 = "st";
                    K17 += "x_ya";
                    K17 += "xis";
                    K7 = p5[Z7];
                    if (!K7.yAxisPlotter)
                        continue;
                    if (K7.noDraw)
                        continue;
                    this.canvasFont("stx_yaxis");
                    this.canvasColor(K17);
                    S9 = this.chart.context;
                    S9.textBaseline = "middle";
                    if (K7.justifyRight) {
                        S9.textAlign = "right";
                    } else {
                        S9.textAlign = "left";
                    }
                    a5 = this.getCanvasFontSize("stx_yaxis");
                    K7.yAxisPlotter.draw(S9, "text");
                    S9.textBaseline = U7j;
                    S9.textAlign = "left";
                }
                this.runAppend(h53, arguments);
            };
            A.prototype.formatYAxisPrice = function (n_, G5, r6, F$) {
                var O2,
                h2,
                u0r,
                z0j,
                S5r;
                y6x.r72();
                if (n_ === null || typeof n_ == "undefined" || isNaN(n_)) {
                    return "";
                }
                O2 = F$ ? F$ : G5.yAxis;
                h2 = r6;
                if (!h2 && h2 !== 0) {
                    h2 = O2.printDecimalPlaces;
                }
                if (!h2 && h2 !== 0) {
                    if (O2.priceTick < 0.01) {
                        h2 = 4;
                    } else if (O2.priceTick < "0.1" * 1) {
                        h2 =  + "2";
                    } else if (O2.priceTick < 1) {
                        h2 = 1;
                    } else {
                        h2 = 0;
                    }
                }
                if (G5.name != G5.chart.name) {
                    if (O2.priceTick > 100) {
                        return D.condenseInt(n_);
                    }
                }
                if (this.internationalizer) {
                    if (h2 >= this.internationalizer.priceFormatters.length) {
                        y6x.r9e(4);
                        var J_z = y6x.v50(18, 17);
                        h2 = this.internationalizer.priceFormatters.length - J_z;
                    }
                    n_ = this.internationalizer.priceFormatters[h2].format(n_);
                } else {
                    u0r = -1902537938;
                    z0j = -1985969237;
                    S5r = 2;
                    for (var i6N = 1; y6x.P2D(i6N.toString(), i6N.toString().length, 77893) !== u0r; i6N++) {
                        n_ = n_.toFixed(h2); ;
                        S5r += 2;
                    }
                    if (y6x.P2D(S5r.toString(), S5r.toString().length, 68150) !== z0j) {
                        n_ = n_.toFixed(h2); ;
                    }
                }
                return n_;
            };
            A.prototype.padOutPrice = function (i_) {
                var o1x,
                j9,
                b4;
                o1x = "und";
                o1x += "e";
                y6x.r72();
                o1x += "fined";
                if (i_ !== 0 && (!i_ || typeof i_ == o1x)) {
                    return "";
                }
                y6x.E_X(0);
                j9 = y6x.v50("", i_);
                b4 = j9.substring(j9.indexOf(".")).length -  + "1";
                if (i_ >= ("1000" ^ 0)) {
                    b4 = Math.max(b4, 0);
                } else if (i_ < 2) {
                    b4 = Math.max(b4, 4);
                } else {
                    b4 = Math.max(b4,  + "2");
                }
                if (this.internationalizer) {
                    if (b4 >= this.internationalizer.priceFormatters.length) {
                        b4 = this.internationalizer.priceFormatters.length -  + "1";
                    }
                    i_ = this.internationalizer.priceFormatters[b4].format(i_);
                } else {
                    i_ = i_.toFixed(b4);
                }
                return i_;
            };
            A.prototype.formatPrice = function (E$, Y8) {
                var C$,
                U8R,
                a$Z,
                C5P;
                if (E$ !== 0 && (!E$ || typeof E$ == "undefined")) {
                    return "";
                }
                if (!Y8) {
                    Y8 = this.currentPanel;
                }
                if (!Y8) {
                    Y8 = this.chart.panel;
                }
                if (!Y8) {
                    return E$;
                }
                C$ = Y8.decimalPlaces;
                y6x.r72();
                if (!C$ && C$ !== "0" - 0) {
                    U8R = 276922945;
                    y6x.r9e(43);
                    a$Z = -y6x.v50(0, "1304870984");
                    C5P = 2;
                    for (var O1q = 1; y6x.a5V(O1q.toString(), O1q.toString().length, 62800) !== U8R; O1q++) {
                        C$ = Y8.chart.decimalPlaces;
                        C5P += 2;
                    }
                    if (y6x.P2D(C5P.toString(), C5P.toString().length, "72546" - 0) !== a$Z) {
                        C$ = Y8.chart.decimalPlaces;
                    }
                }
                if (!C$ && C$ !== 0) {
                    return E$;
                }
                if (this.internationalizer) {
                    if (C$ >= this.internationalizer.priceFormatters.length) {
                        y6x.r9e(41);
                        var w_S = y6x.z7A(16, 12, 11, 180);
                        C$ = this.internationalizer.priceFormatters.length - w_S;
                    }
                    E$ = this.internationalizer.priceFormatters[C$].format(E$);
                } else {
                    E$ = E$.toFixed(C$);
                }
                return E$;
            };
            A.prototype.createCrosshairs = function () {
                if (this.runPrepend("createCrosshairs", arguments)) {
                    return;
                }
                if (this.controls.crossX.onmousedown) {
                    return;
                }
                this.controls.crossY.onmousedown = function (Y$) {
                    y6x.r72();
                    if (!Y$) {
                        Y$ = event;
                    }
                    if (Y$.preventDefault) {
                        Y$.preventDefault();
                    }
                    return ![];
                };
                y6x.x24();
                this.controls.crossX.onmousedown = function (U2) {
                    if (!U2) {
                        U2 = event;
                    }
                    if (U2.preventDefault) {
                        U2.preventDefault();
                    }
                    y6x.r72();
                    return !!0;
                };
                this.runAppend("createCrosshairs", arguments);
            };
            A.prototype.determineMinMax = function (r3, r0, s3, M1, K$) {
                var j4,
                L1,
                l6,
                o4,
                X$,
                c5,
                D7,
                w8;
                y6x.E_X(4);
                var E5_ = y6x.v50(0, 1);
                j4 = Number.MAX_VALUE * E5_;
                L1 = Number.MAX_VALUE;
                l6 = ![];
                o4 = r3.length;
                if (K$) {
                    o4 = K$;
                }
                for (var K2 = 0; K2 < o4; K2++) {
                    X$ = r3[K2];
                    if (!X$)
                        continue;
                    if (!M1) {
                        if (X$.transform) {
                            l6 = !"";
                            X$ = X$.transform;
                        } else if (l6)
                            continue; ;
                    }
                    c5 = 0;
                    for (var Q$ = 0; Q$ < r0.length; Q$++) {
                        D7 = X$[r0[Q$]];
                        if (!D7)
                            continue;
                        if (typeof D7 == "number") {
                            D7 = [D7];
                        }
                        for (var P6 = 0; P6 < D7.length; P6++) {
                            w8 = D7[P6];
                            if (w8 || w8 === 0) {
                                if (s3) {
                                    c5 += w8;
                                    if (c5 > j4) {
                                        j4 = c5;
                                    }
                                    if (c5 < L1) {
                                        L1 = c5;
                                    }
                                } else {
                                    if (w8 > j4) {
                                        j4 = w8;
                                    }
                                    if (w8 < L1) {
                                        L1 = w8;
                                    }
                                }
                            }
                        }
                    }
                }
                if (j4 == Number.MAX_VALUE * -1) {
                    j4 = 0;
                }
                if (L1 == Number.MAX_VALUE) {
                    L1 = 0;
                }
                return [L1, j4];
            };
            A.prototype.calculateYAxisRange = function (n8, E2, s$, G1) {
                var l0,
                w$,
                D1,
                U8,
                H6,
                M47,
                P7,
                i2,
                e6;
                if (s$ == Number.MAX_VALUE) {
                    s$ = 0;
                    G1 = 0;
                }
                l0 = n8.height;
                w$ = null;
                D1 = null;
                this.adjustYAxisHeightOffset(n8, E2);
                E2.top = n8.top;
                E2.height = E2.bottom - E2.top;
                U8 = Math.round(Math.abs(l0 / 5));
                if (l0 - Math.abs(E2.scroll) < U8) {
                    y6x.r9e(44);
                    var e4g = y6x.z7A(17, 18, 1);
                    y6x.r9e(0);
                    var z3y = y6x.v50(0, 1);
                    E2.scroll = (l0 - U8) * (E2.scroll < 0 ? e4g : z3y);
                }
                H6 = (G1 - s$) / E2.height;
                if (s$ || s$ === 0) {
                    if (G1 - s$ === 0) {
                        y6x.E_X(17);
                        w$ = y6x.z7A(2, G1);
                        D1 = 0;
                    } else {
                        M47 = "l";
                        M47 += "o";
                        M47 += "g";
                        if ((this.layout.semiLog || this.layout.chartScale == M47) && w$) {
                            P7 = Math.log(s$) / Math.LN10;
                            i2 = Math.log(G1) / Math.LN10;
                            w$ = Math.pow(10, i2);
                            D1 = Math.pow( + "10", P7);
                        } else {
                            w$ = G1;
                            D1 = s$;
                        }
                    }
                    E2.high = w$;
                    E2.low = D1;
                }
                if (E2.max || E2.max === 0) {
                    E2.high = E2.max;
                }
                if (E2.min || E2.min === 0) {
                    E2.low = E2.min;
                }
                E2.shadow = E2.high - E2.low;
                if (n8.chart.name === n8.name && n8.yAxis === E2) {
                    e6 = this.layout.semiLog || this.layout.chartScale == "log";
                    if (n8.chart.isComparison) {
                        e6 = !!0;
                    }
                    if (E2.semiLog != e6) {
                        this.clearPixelCache();
                        E2.semiLog = e6;
                    }
                }
            };
            A.prototype.renderYAxis = function (h5) {
                var C3,
                D9,
                N_,
                N3,
                K3,
                w4,
                T4;
                if (this.runPrepend("renderYAxis", arguments)) {
                    return;
                }
                C3 = h5.panel;
                D9 = C3.yaxisRHS.concat(C3.yaxisLHS);
                for (N_ = 0; N_ < D9.length; N_++) {
                    N3 = D9[N_];
                    K3 = null;
                    w4 = null;
                    if (C3.yAxis === N3) {
                        K3 = h5.lowValue;
                        w4 = h5.highValue;
                    }
                    this.calculateYAxisRange(C3, N3, K3, w4);
                }
                y6x.r72();
                T4 = {};
                for (N_ = "0" | 0; N_ < D9.length; N_++) {
                    T4.yAxis = D9[N_];
                    this.createYAxis(C3, T4);
                    this.drawYAxis(C3, T4);
                }
                this.runAppend("renderYAxis", arguments);
            };
            A.prototype.initializeDisplay = function (N5) {
                var b2j,
                g_,
                D_,
                N7,
                H4,
                A3,
                o5,
                m_,
                e7Z,
                R6Y;
                b2j = "initi";
                b2j += "alizeDi";
                b2j += "splay";
                if (this.runPrepend(b2j, arguments)) {
                    return;
                }
                g_ = [];
                for (var M2 in N5.series) {
                    if (N5.series[M2].parameters.shareYAxis) {
                        g_.push(M2);
                    }
                }
                D_ = N5.panel = this.panels[N5.name];
                H4 = null;
                A3 = Math.floor((N5.width - this.micropixels) / this.layout.candleWidth);
                if (N5.scroll > N5.maxTicks && N5.maxTicks > A3 + 1) {
                    H4 = N5.dataSegment.length -  + "1";
                }
                if (!A.chartShowsHighs(this.layout.chartType)) {
                    g_.push("Close");
                    N7 = this.determineMinMax(N5.dataSegment, g_, null, null, H4);
                    if (this.layout.chartType == "baseline_delta") {
                        o5 = N5.baseline.actualLevel;
                        if (N5.transformFunc) {
                            o5 = N5.transformFunc(this, N5, o5);
                        }
                        m_ = Math.max(o5 - N7[0], N7[1] - o5);
                        if (this.repositioningBaseline) {
                            N7 = [N5.lowValue, N5.highValue];
                        } else {
                            y6x.E_X(4);
                            N7[0] = y6x.z7A(o5, m_);
                            y6x.r9e(0);
                            N7[1] = y6x.z7A(o5, m_);
                        }
                    }
                } else {
                    e7Z = "L";
                    e7Z += "o";
                    e7Z += "w";
                    R6Y = "Cl";
                    R6Y += "o";
                    R6Y += "s";
                    R6Y += "e";
                    g_.push(R6Y, "High", e7Z);
                    N7 = this.determineMinMax(N5.dataSegment, g_, null, null, H4);
                }
                N5.lowValue = N7[0];
                N5.highValue = N7[1];
                y6x.x24();
                this.runAppend("initializeDisplay", arguments);
            };
            A.prototype.computePosition = function (p4, o9) {
                var h9;
                if (typeof o9 == "undefined") {
                    o9 = 0;
                }
                y6x.x24();
                h9 = p4 * this.layout.candleWidth + o9 + this.micropixels;
                return h9;
            };
            A.prototype.computeColor = function (x7, v8) {
                var a8s,
                E1u,
                n1m,
                u1u,
                P4a;
                a8s = "stx_can";
                a8s += "dle_shado";
                y6x.r72();
                a8s += "w";
                E1u = "s";
                E1u += "tx";
                E1u += "_candle_dow";
                E1u += "n";
                if (x7 < v8) {
                    return "stx_candle_up";
                }
                if (x7 > v8) {
                    return E1u;
                }
                n1m = 1828328067;
                u1u = 148501397;
                P4a = 2;
                for (var M1E = 1; y6x.P2D(M1E.toString(), M1E.toString().length, 97359) !== n1m; M1E++) {
                    return "";
                }
                if (y6x.a5V(P4a.toString(), P4a.toString().length, "20947" << 32) !== u1u) {
                    return "";
                }
                return a8s;
            };
            A.prototype.computeLength = function (Q8, A7) {
                var o3,
                k0;
                o3 = this.pixelFromPrice(Q8);
                k0 = this.pixelFromPrice(A7);
                y6x.r9e(4);
                y6x.x24();
                return y6x.v50(k0, o3);
            };
            A.prototype.setSeriesRenderer = function (V3) {
                var E6;
                E6 = V3.params;
                if (this.chart.seriesRenderers[V3.params.name]) {
                    return this.chart.seriesRenderers[V3.params.name];
                }
                if (E6.yAxis) {
                    this.addYAxis(this.panels[E6.panel], E6.yAxis);
                }
                V3.stx = this;
                this.chart.seriesRenderers[V3.params.name] = V3;
                return V3;
            };
            A.prototype.setMarket = function (d7, i3) {
                var e5a,
                s0m,
                I0k;
                e5a = -822671091;
                y6x.r72();
                s0m = 7942237;
                I0k = 2;
                for (var S3X = 1; y6x.P2D(S3X.toString(), S3X.toString().length, 2487) !== e5a; S3X++) {
                    if (~i3) {
                        i3 = this.chart;
                    }
                    i3.market = new D.Market(d7);
                    I0k += 2;
                }
                if (y6x.a5V(I0k.toString(), I0k.toString().length, 55218) !== s0m) {
                    if (!i3) {
                        i3 = this.chart;
                    }
                    i3.market = new D.Market(d7);
                }
                for (var v5 in this.layout.marketSessions) {
                    i3.market.disableSession(v5, this.layout.marketSessions[v5]);
                }
            };
            A.prototype.setMarketFactory = function (S2) {
                y6x.r72();
                this.marketFactory = S2;
            };
            A.prototype.removeSeriesRenderer = function (t9) {
                y6x.x24();
                var d6,
                z7,
                l9;
                for (var n$ in this.chart.seriesRenderers) {
                    if (t9.params.name === this.chart.seriesRenderers[n$].params.name) {
                        d6 = this.chart.seriesRenderers[t9.params.name];
                        z7 = d6.params.yAxis;
                        l9 = this.panels[d6.params.panel];
                        delete this.chart.seriesRenderers[t9.params.name];
                        this.deleteYAxisIfUnused(l9, z7);
                        return;
                    }
                }
            };
            A.prototype.getSeriesRenderer = function (s4) {
                y6x.r72();
                return this.chart.seriesRenderers[s4];
            };
            A.prototype.drawHistogram = function (M9, N4) {
                var x_i,
                t5,
                A$,
                p$,
                G_,
                P1,
                V_,
                H9,
                a4,
                q2,
                m3,
                Q0,
                a8,
                Z3r,
                B3,
                n7,
                Z5,
                S0,
                P0,
                x_,
                h_,
                W4,
                N0,
                q5W,
                k3,
                X_;
                x_i = "D";
                x_i += "a";
                x_i += "t";
                x_i += "a";
                if (!N4 || !N4.length) {
                    return;
                }
                t5 = M9.panel;
                if (!t5) {
                    t5 = "chart";
                }
                A$ = this.panels[t5];
                if (!A$) {
                    return;
                }
                p$ = M9.yAxis ? M9.yAxis : A$.yAxis;
                G_ = M9.type;
                if (G_ == "histogram") {
                    G_ = M9.subtype;
                }
                P1 = this.chart.dataSegment;
                V_ = !!"";
                function Q1(W7, y8, R5, S8, B2, L9, s5) {
                    var C5a,
                    n6,
                    D8,
                    Z6,
                    B1,
                    f1,
                    Q7,
                    O7,
                    J2,
                    b8,
                    C2,
                    Q9,
                    W5;
                    C5a = "a";
                    C5a += "u";
                    C5a += "t";
                    C5a += "o";
                    if (!R5) {
                        R5 = 1;
                    }
                    if (D.isIE8) {
                        S0.globalAlpha = 0.5;
                    } else {
                        S0.globalAlpha = R5;
                    }
                    S0.beginPath();
                    y6x.r9e(0);
                    n6 = y6x.v50(n7, 0.5);
                    D8 = Math.floor(W4.pixelFromBar(0, A$.chart) - W4.layout.candleWidth / 2);
                    Z6 = D8;
                    for (var g9 = 0; g9 < P1.length; g9++) {
                        B1 = h_[g9];
                        if (!B1) {
                            B1 = n7;
                        }
                        if (g9 ===  + "0") {
                            n6 = B1;
                        }
                        f1 = P1[g9];
                        if (!f1 || !f1[W7]) {
                            n6 = B1;
                            Z6 += W4.layout.candleWidth;
                            continue;
                        }
                        Q7 = (f1[W7] - m3) * a4;
                        if (isNaN(Q7))
                            continue;
                        O7 = W4.layout.candleWidth;
                        if (f1.candleWidth) {
                            O7 = f1.candleWidth;
                            if (g9 === 0) {
                                D8 = Z6 = Math.floor(W4.pixelFromBar(0, A$.chart) - f1.candleWidth / 2);
                            }
                        }
                        J2 = Math.min(Math.floor(B1 - Q7) + 0.5, B1);
                        if (B2) {
                            if (f1.Close < f1.iqPrevClose) {
                                n6 = J2;
                                Z6 += O7;
                                continue;
                            }
                        } else {
                            if (f1.Close >= f1.iqPrevClose) {
                                n6 = J2;
                                Z6 += O7;
                                continue;
                            }
                        }
                        Q9 = O7 / W4.layout.candleWidth;
                        y6x.r9e(45);
                        W5 = y6x.z7A(L9, Q9, s5, Z6, P0);
                        b8 = Math.round(W5) + (S8 ? 0 : Z5);
                        y6x.E_X(46);
                        var Q6r = y6x.z7A(21, 24, 20, 16);
                        C2 = Math.round(W5 + s5 * Q9) - (S8 ? "0" * Q6r : Z5);
                        if (C2 - b8 < 2) {
                            y6x.E_X(0);
                            C2 = y6x.z7A(b8, 1);
                        }
                        if (S8) {
                            roundPixel = 0;
                        } else {
                            y6x.E_X(17);
                            roundPixel = y6x.v50(1, "0.5");
                        }
                        if (b8 % 1 == roundPixel) {
                            b8 += 0.5;
                        }
                        if (C2 % 1 == roundPixel) {
                            C2 += 0.5;
                        }
                        S0.moveTo(b8, B1);
                        if (n7 == B1) {
                            S0.lineTo(C2, B1);
                        } else {
                            S0.moveTo(C2, B1);
                            if (S8 && !P0) {
                                if (h_[g9 + 1]) {
                                    S0.moveTo(C2, Math.max(J2, Math.min(B1, h_[g9 + 1])));
                                }
                            }
                        }
                        S0.lineTo(C2, J2);
                        S0.lineTo(b8, J2);
                        if (S8 && L9) {
                            if (x_[g9] > J2 || g9 === 0) {
                                S0.lineTo(b8, Math.min(B1, x_[g9]));
                            };
                        } else if (S8 && !P0 && G_ == "clustered") {
                            if (g9 > 0 && x_[g9 - 1] && x_[g9 - 1] > J2) {
                                S0.lineTo(b8, Math.min(B1, x_[g9 - ("1" << 32)]));
                            };
                        } else if (S8 && !P0) {
                            if (n6 > J2 || g9 === 0) {
                                S0.lineTo(b8, Math.min(B1, n6));
                            };
                        } else {
                            S0.lineTo(b8, B1);
                        }
                        n6 = J2;
                        Z6 += O7;
                        if (G_ != "clustered" || S8) {
                            x_[g9] = J2;
                        }
                    }
                    if (!y8) {
                        y8 = C5a;
                    }
                    if (S8) {
                        S0.strokeStyle = y8 == "auto" ? W4.defaultColor : y8;
                        S0.stroke();
                    } else {
                        S0.fillStyle = y8 == "auto" ? W4.defaultColor : y8;
                        S0.fill();
                    }
                    S0.closePath();
                }
                this.getDefaultColor();
                for (H9 = 0; H9 < N4.length; H9++) {
                    V_ |= N4[H9].border_color_up && !D.isTransparent(N4[H9].border_color_up);
                    V_ |= N4[H9].border_color_down && !D.isTransparent(N4[H9].border_color_down);
                }
                if (!M9.name) {
                    M9.name = x_i;
                }
                a4 = p$.multiplier;
                if (!M9.heightPercentage) {
                    M9.heightPercentage = 0.7;
                }
                if (!M9.widthFactor) {
                    M9.widthFactor = 0.8;
                }
                q2 = 0;
                y6x.r72();
                m3 = 0;
                for (var k7 = "0" - 0; k7 < this.chart.maxTicks; k7++) {
                    Q0 = P1[k7];
                    if (!Q0)
                        continue;
                    a8 = 0;
                    for (H9 = 0; H9 < N4.length; H9++) {
                        if (Q0[N4[H9].field]) {
                            Z3r = "s";
                            Z3r += "tacke";
                            Z3r += "d";
                            if (M9.subtype == Z3r) {
                                a8 += Q0[N4[H9].field];
                            } else {
                                a8 = Q0[N4[H9].field];
                            }
                            if (a8 > q2) {
                                q2 = a8;
                            }
                            if (a8 < m3) {
                                m3 = a8;
                            }
                        }
                    }
                }
                B3 = Math.floor(p$.top) + 0.5;
                if (!M9.bindToYAxis) {
                    n7 = Math.floor(p$.bottom) + 0.5;
                    if (q2 === 0 && m3 === 0) {
                        this.watermark(t5, "center", "bottom", this.translateIf(M9.name + " Not Available"));
                        return;
                    }
                    a4 = (n7 - B3) * M9.heightPercentage / (q2 - m3);
                } else {
                    n7 = Math.floor(this.pixelFromPriceTransform(m3, A$, p$)) + 0.5;
                }
                Z5 = 0.5;
                if (this.layout.candleWidth <= "1" >> 0 || !V_) {
                    y6x.r9e(43);
                    Z5 = y6x.v50(0, "0");
                }
                this.startClip(t5);
                S0 = this.chart.context;
                P0 = Math.max(0, (1 - M9.widthFactor) * this.layout.candleWidth / ("2" ^ 0));
                x_ = {};
                h_ = {};
                W4 = this;
                N0 = 1;
                for (H9 = 0; H9 < N4.length; H9++) {
                    q5W = "st";
                    q5W += "ack";
                    q5W += "ed";
                    k3 = N4[H9];
                    N0 = this.layout.candleWidth * M9.widthFactor;
                    X_ = 0;
                    if (G_ == "clustered") {
                        X_ = H9;
                        N0 /= N4.length;
                    }
                    Q1(k3.field, k3.fill_color_up, k3.opacity_up, null, !0, X_, N0);
                    Q1(k3.field, k3.fill_color_down, k3.opacity_down, null, null, X_, N0);
                    if (this.layout.candleWidth >= 2 && V_) {
                        Q1(k3.field, k3.border_color_up, k3.opacity_up, !0, !0, X_, N0);
                        Q1(k3.field, k3.border_color_down, k3.opacity_down, !"", null, X_, N0);
                    }
                    if (G_ == q5W) {
                        h_ = D.shallowClone(x_);
                    }
                }
                S0.globalAlpha = 1;
                this.endClip();
            };
            A.prototype.drawHeatmap = function (o$, M6) {
                var T6,
                D6,
                y6,
                S1,
                q$,
                N$,
                N9,
                u3,
                f_,
                S3,
                f8,
                z6,
                q9;
                if (!M6 || !M6.length) {
                    return;
                }
                T6 = o$.panel;
                if (!T6) {
                    T6 = "chart";
                }
                D6 = this.panels[T6];
                if (!D6) {
                    return;
                }
                y6 = o$.yAxis ? o$.yAxis : D6.yAxis;
                S1 = Math.floor(y6.bottom) + 0.5;
                q$ = Math.floor(y6.top) + 0.5;
                N$ = this.chart.dataSegment;
                this.getDefaultColor();
                if (!o$.name) {
                    o$.name = "Data";
                }
                if (!o$.widthFactor) {
                    o$.widthFactor = 1;
                }
                N9 = 0.5;
                if (D6.chart.tmpWidth <= 1) {
                    N9 = 0;
                }
                u3 = null;
                f_ = null;
                S3 = this;
                f8 = null;
                this.startClip(T6);
                y6x.r72();
                z6 = this.chart.context;
                z6.globalAlpha = o$.opacity;
                for (var E8 = 0; E8 < M6.length; E8++) {
                    q9 = M6[E8];
                    L3(q9.field, q9.color, null, o$.widthFactor, q9.border_color ? N9 : -N9 / 4);
                    if (q9.border_color && this.layout.candleWidth >= 2) {
                        L3(q9.field, q9.border_color, !![], o$.widthFactor, N9);
                    }
                }
                z6.lineWidth = 1;
                y6x.E_X(4);
                z6.globalAlpha = y6x.z7A("1", 0);
                this.endClip();
                function L3(f4, W1, p6, r1, h8) {
                    var g8,
                    n0,
                    l$,
                    o8,
                    i9,
                    Y7,
                    I7,
                    q1,
                    X6,
                    r4,
                    J5,
                    a0;
                    z6.beginPath();
                    z6.fillStyle = W1;
                    z6.strokeStyle = W1;
                    g8 = y6.top;
                    n0 = y6.bottom;
                    l$ = S3.layout.candleWidth * r1;
                    o8 = Math.floor(S3.pixelFromBar("0" << 32, D6.chart) - S3.layout.candleWidth);
                    for (var a$ = 0; a$ < N$.length; a$++) {
                        I7 = N$[a$];
                        if (!I7)
                            continue;
                        if (I7.candleWidth) {
                            if (a$ === 0) {
                                o8 += S3.layout.candleWidth;
                            } else {
                                y6x.r9e(47);
                                var w7D = y6x.z7A(30, 18, 16, 30);
                                o8 += (I7.candleWidth + l$ / r1) / w7D;
                            }
                            l$ = I7.candleWidth * r1;
                        } else {
                            o8 += S3.layout.candleWidth;
                        }
                        y6x.E_X(48);
                        i9 = y6x.z7A(o8, l$, "2", h8, 0);
                        y6x.r9e(49);
                        Y7 = y6x.v50(o8, h8, l$, 2);
                        if (Y7 - i9 < 2) {
                            y6x.E_X(50);
                            Y7 = y6x.z7A("1", 0, i9);
                        }
                        if (I7.transform) {
                            I7 = I7.transform;
                        }
                        q1 = I7[f4];
                        if (!q1)
                            continue;
                        if (typeof q1 == "number") {
                            q1 = [q1];
                        }
                        for (var G6 = 0; G6 < q1.length; G6++) {
                            X6 = S3.pixelFromPrice(q1[G6], D6, y6);
                            if (!f8) {
                                r4 = S3.pixelFromPrice(q1[G6] - o$.height, D6, y6);
                                z6.lineWidth = 1;
                                y6x.E_X(4);
                                u3 = y6x.v50(r4, X6);
                                y6x.E_X(23);
                                f_ = y6x.v50(u3, 2);
                                f8 = z6.lineWidth;
                            }
                            if (p6) {
                                y6x.E_X(0);
                                J5 = y6x.v50(X6, f_);
                                y6x.E_X(4);
                                a0 = y6x.z7A(X6, f_);
                                z6.moveTo(i9, J5);
                                z6.lineTo(i9, a0);
                                z6.lineTo(Y7, a0);
                                z6.lineTo(Y7, J5);
                                z6.lineTo(i9, J5);
                            } else {
                                y6x.r9e(4);
                                z6.fillRect(i9, y6x.v50(X6, f_), y6x.z7A(Y7, i9), u3);
                            }
                        }
                    }
                    if (p6) {
                        z6.stroke();
                    }
                    z6.closePath();
                }
            };
            A.prototype.startClip = function (F0, X7) {
                var J4,
                X5,
                D0,
                U6;
                if (!F0) {
                    F0 = "chart";
                }
                J4 = this.panels[F0];
                y6x.x24();
                X5 = J4.yAxis;
                this.chart.context.save();
                this.chart.context.beginPath();
                D0 = J4.left;
                U6 = J4.width;
                if (X7) {
                    D0 = 0;
                    U6 = this.width;
                }
                this.chart.context.rect(D0, J4.top, U6, X5.height);
                this.chart.context.clip();
            };
            A.prototype.endClip = function () {
                this.chart.context.restore();
            };
            A.prototype.drawCandlesHighPerformance = function (M7, Y3, R9, k8) {
                var H5,
                U$,
                T3,
                l_,
                d8,
                p0,
                Z8,
                M3,
                V7,
                R7,
                q4,
                V5,
                n2,
                o7,
                b2,
                P9,
                j5,
                L_,
                J3,
                m4,
                c$,
                q8,
                r9;
                H5 = M7.chart;
                U$ = H5.dataSegment;
                T3 = this.chart.context;
                l_ = M7.yAxis.top;
                d8 = M7.yAxis.bottom;
                V7 =  + "0";
                if (R9 && !D.isTransparent(R9)) {
                    y6x.E_X(17);
                    V7 = y6x.v50(1, "0.5");
                }
                R7 = H5.dataSet.length - H5.scroll;
                q4 = R7 + H5.maxTicks;
                T3.beginPath();
                if (D.isTransparent(Y3)) {
                    Y3 = this.containerColor;
                }
                T3.fillStyle = Y3;
                V5 = M7.yAxis;
                y6x.r9e(51);
                var X9o = y6x.z7A(21, 18, 1);
                n2 = H5.tmpWidth / X9o;
                o7 = this.layout.candleWidth;
                y6x.r9e(52);
                var L$u = y6x.v50(1, 14, 8, 3);
                b2 = M7.left - 0.5 * o7 + this.micropixels - L$u;
                for (var z_ = 0; z_ <= U$.length; z_++) {
                    y6x.r9e(23);
                    b2 += y6x.v50(o7, 2);
                    o7 = this.layout.candleWidth;
                    y6x.r9e(23);
                    b2 += y6x.v50(o7, 2);
                    P9 = U$[z_];
                    if (!P9)
                        continue;
                    if (P9.projection)
                        continue;
                    if (P9.candleWidth) {
                        y6x.r9e(0);
                        var T50 = y6x.z7A(0, 2);
                        b2 += (P9.candleWidth - o7) / T50;
                        o7 = P9.candleWidth;
                        if (this.layout.chartType == "volume_candle") {
                            y6x.E_X(23);
                            n2 = y6x.z7A(o7, 2);
                        }
                    }
                    if (P9.Open == P9.Close)
                        continue;
                    if (k8 & A.CANDLEUP && P9.Open >= P9.Close)
                        continue;
                    if (k8 & A.CANDLEDOWN && P9.Open <= P9.Close)
                        continue;
                    if (k8 & A.CLOSEUP && P9.Close <= P9.iqPrevClose)
                        continue;
                    if (k8 & A.CLOSEDOWN && P9.Close >= P9.iqPrevClose)
                        continue;
                    if (k8 & A.CLOSEEVEN && P9.Close != P9.iqPrevClose)
                        continue;
                    if (P9.transform) {
                        P9 = P9.transform;
                    }
                    j5 = P9.cache;
                    y6x.r9e(0);
                    L_ = y6x.v50(R7, z_);
                    if (L_ < M7.cacheLeft || L_ > M7.cacheRight || !j5.open) {
                        J3 = V5.semiLog ? this.pixelFromPrice(P9.Open, M7) : (V5.high - P9.Open) * V5.multiplier + V5.top;
                        m4 = V5.semiLog ? this.pixelFromPrice(P9.Close, M7) : (V5.high - P9.Close) * V5.multiplier + V5.top;
                        p0 = Math.floor(Math.min(J3, m4)) + V7;
                        Z8 = Math.max(J3, m4);
                        y6x.E_X(4);
                        M3 = Math.floor(y6x.v50(Z8, p0));
                        if (p0 < l_) {
                            if (p0 + M3 < l_) {
                                j5.open = p0;
                                j5.close = p0;
                                continue;
                            }
                            y6x.r9e(4);
                            M3 -= y6x.v50(l_, p0);
                            p0 = l_;
                        }
                        if (p0 + M3 > d8) {
                            y6x.E_X(20);
                            M3 -= y6x.z7A(d8, p0, M3);
                        }
                        M3 = Math.max(M3, 2);
                        j5.open = p0;
                        j5.close = j5.open + M3;
                    }
                    if (j5.open >= d8)
                        continue;
                    if (j5.close <= l_)
                        continue;
                    c$ = Math.floor(b2) + 0.5;
                    q8 = Math.floor(c$ - n2) + V7;
                    r9 = Math.round(c$ + n2) - V7;
                    if (P9.Open != P9.Close) {
                        T3.moveTo(q8, j5.open);
                        T3.lineTo(r9, j5.open);
                        T3.lineTo(r9, j5.close);
                        T3.lineTo(q8, j5.close);
                        T3.lineTo(q8, j5.open);
                    }
                }
                T3.fill();
                if (V7) {
                    T3.lineWidth = 1;
                    T3.strokeStyle = R9;
                    T3.stroke();
                };
            };
            A.prototype.drawCandles = function (b_, b6, L6) {
                var w6,
                S$,
                v7,
                O_,
                d$,
                X8,
                G$,
                q7,
                Y1,
                x3,
                A5,
                g7,
                I8,
                L5,
                V8,
                Z2,
                r$,
                y8r,
                G8,
                P8_,
                h3,
                E_,
                c7,
                a9,
                s9,
                S6,
                g3;
                w6 = b_.chart;
                if (!w6) {
                    w6 = b_;
                    b_ = b_.chart;
                }
                S$ = w6.dataSegment;
                v7 = this.chart.context;
                O_ = b_.yAxis.top;
                d$ = b_.yAxis.bottom;
                Y1 = "tr";
                Y1 += "ansp";
                Y1 += "arent";
                x3 = "transparent";
                A5 = 0;
                // MaRa: CIQ Hack - Part 1 - TGPS Hollow Candle
                // --- Start Deletion ---
                //if (!D.isTransparent(Y1)) {
                //    A5 = 0.5;
                //}
                // --- End Deletion ---
                g7 = w6.dataSet.length - w6.scroll;
                I8 = g7 + w6.maxTicks;
                L5 = b_.yAxis;
                y6x.r9e(16);
                var k1s = y6x.v50(24, 2, 28);
                V8 = w6.tmpWidth / k1s;
                Z2 = this.layout.candleWidth;
                y6x.r72();
                y6x.E_X(53);
                var d7T = y6x.z7A(73, 9, 9, 2, 7);
                r$ = b_.left - 0.5 * Z2 + this.micropixels - d7T;
                for (var J0 = 0; J0 <= S$.length; J0++) {
                    y8r = "tra";
                    y8r += "n";
                    y8r += "sparen";
                    y8r += "t";
                    y6x.r9e(23);
                    r$ += y6x.z7A(Z2, 2);
                    Z2 = this.layout.candleWidth;
                    y6x.E_X(23);
                    r$ += y6x.z7A(Z2, 2);
                    G8 = S$[J0];
                    if (!G8)
                        continue;
                    if (G8.projection)
                        continue;
                    if (G8.candleWidth) {
                        P8_ = "vo";
                        P8_ += "lume_cand";
                        P8_ += "le";
                        y6x.r9e(0);
                        var g6Z = y6x.v50(0, 2);
                        r$ += (G8.candleWidth - Z2) / g6Z;
                        Z2 = G8.candleWidth;
                        if (this.layout.chartType == P8_) {
                            y6x.E_X(23);
                            V8 = y6x.z7A(Z2, 2);
                        }
                    }
                    if (!G8.Open && G8.Open !==  + "0")
                        continue;
                    if (G8.Open == G8.Close)
                        continue;
                    h3 = b6(this, G8, L6 ? "outline" : "solid");
                    if (!h3)
                        continue;
                    if (L6) {
                        Y1 = h3;
                    } else {
                        x3 = h3;
                    }
                    // MaRa: CIQ Hack - Part 1 - TGPS Hollow Candle
                    // --- Start ---
                    if (!D.isTransparent(Y1)) {
                        A5 = 0.5;
                    }
                    // --- End ---
                    v7.beginPath();
                    v7.fillStyle = x3;
                    if (G8.transform) {
                        G8 = G8.transform;
                    }
                    E_ = G8.cache;
                    y6x.r9e(0);
                    c7 = y6x.v50(g7, J0);
                    if (c7 < b_.cacheLeft || c7 > b_.cacheRight || !E_.open) {
                        a9 = L5.semiLog ? this.pixelFromPrice(G8.Open, b_) : (L5.high - G8.Open) * L5.multiplier + L5.top;
                        s9 = L5.semiLog ? this.pixelFromPrice(G8.Close, b_) : (L5.high - G8.Close) * L5.multiplier + L5.top;
                        X8 = Math.floor(Math.min(a9, s9)) + A5;
                        G$ = Math.max(a9, s9);
                        y6x.r9e(4);
                        q7 = Math.floor(y6x.v50(G$, X8));
                        if (X8 < O_) {
                            if (X8 + q7 < O_) {
                                E_.open = X8;
                                E_.close = X8;
                                continue;
                            }
                            y6x.r9e(4);
                            q7 -= y6x.z7A(O_, X8);
                            X8 = O_;
                        }
                        if (X8 + q7 > d$) {
                            y6x.E_X(20);
                            q7 -= y6x.z7A(d$, X8, q7);
                        }
                        q7 = Math.max(q7,  + "2");
                        E_.open = X8;
                        E_.close = E_.open + q7;
                    }
                    if (E_.open >= d$)
                        continue;
                    if (E_.close <= O_)
                        continue;
                    flr_xbase = Math.floor(r$) + 0.5;
                    S6 = Math.floor(flr_xbase - V8) + A5;
                    g3 = Math.round(flr_xbase + V8) - A5;
                    if (G8.Open != G8.Close) {
                        v7.moveTo(S6, E_.open);
                        v7.lineTo(g3, E_.open);
                        v7.lineTo(g3, E_.close);
                        v7.lineTo(S6, E_.close);
                        v7.lineTo(S6, E_.open);
                    }
                    if (x3 != y8r) {
                        v7.fill();
                    }
                    if (A5) {
                        v7.lineWidth =  + "1";
                        v7.strokeStyle = Y1;
                        v7.stroke();
                    }
                }
            };
            A.prototype.drawShadowsHighPerformance = function (x9, t6, X9) {
                var F5,
                I1,
                A6,
                h6,
                i6,
                B5,
                V1,
                g4,
                h4,
                n1,
                j0,
                G9,
                z$,
                r_,
                F8,
                N2,
                q3,
                J1,
                O9o,
                I2,
                R8,
                C7,
                x$;
                F5 = x9.chart;
                I1 = F5.dataSegment;
                A6 = this.chart.context;
                A6.lineWidth = 1;
                h6 = x9.yAxis.top;
                i6 = x9.yAxis.bottom;
                h4 = F5.dataSet.length - F5.scroll;
                y6x.x24();
                n1 = h4 + F5.maxTicks;
                A6.beginPath();
                j0 = x9.yAxis;
                G9 = this.layout.candleWidth;
                y6x.E_X(20);
                var r1r = y6x.v50(21, 13, 9);
                z$ = x9.left - 0.5 * G9 + this.micropixels - r1r;
                for (var i$ = 0; i$ <= I1.length; i$++) {
                    y6x.r9e(23);
                    z$ += y6x.z7A(G9, 2);
                    G9 = this.layout.candleWidth;
                    y6x.r9e(23);
                    z$ += y6x.z7A(G9, 2);
                    r_ = I1[i$];
                    if (!r_)
                        continue;
                    if (r_.projection)
                        continue;
                    if (r_.candleWidth) {
                        y6x.r9e(54);
                        var j_h = y6x.v50(15, 3, 3, 17, 5);
                        z$ += (r_.candleWidth - G9) / j_h;
                        G9 = r_.candleWidth;
                    }
                    if (X9) {
                        if (X9 & A.CANDLEUP && r_.Open >= r_.Close)
                            continue;
                        else if (X9 & A.CANDLEDOWN && r_.Open <= r_.Close)
                            continue;
                        else if (X9 & A.CANDLEEVEN && r_.Open != r_.Close)
                            continue;
                        else if (X9 & A.CLOSEUP && r_.Close <= r_.iqPrevClose)
                            continue;
                        else if (X9 & A.CLOSEDOWN && r_.Close >= r_.iqPrevClose)
                            continue;
                        else if (X9 & A.CLOSEEVEN && r_.Close != r_.iqPrevClose)
                            continue;
                    }
                    if (r_.transform) {
                        r_ = r_.transform;
                    }
                    F8 = r_.cache;
                    y6x.r9e(0);
                    N2 = y6x.z7A(h4, i$);
                    if (N2 < x9.cacheLeft || N2 > x9.cacheRight || !F8.top) {
                        B5 = j0.semiLog ? this.pixelFromPrice(r_.High, x9) : (j0.high - r_.High) * j0.multiplier + j0.top;
                        V1 = j0.semiLog ? this.pixelFromPrice(r_.Low, x9) : (j0.high - r_.Low) * j0.multiplier + j0.top;
                        y6x.E_X(4);
                        q3 = y6x.z7A(V1, B5);
                        if (B5 < h6) {
                            if (B5 + q3 < h6) {
                                F8.top = B5;
                                F8.bottom = B5;
                                continue;
                            }
                            y6x.r9e(4);
                            q3 -= y6x.z7A(h6, B5);
                            B5 = h6;
                        }
                        if (B5 + q3 > i6) {
                            y6x.r9e(20);
                            q3 -= y6x.v50(i6, B5, q3);
                        }
                        F8.top = B5;
                        F8.bottom = F8.top + q3;
                    }
                    if (F8.top >= i6)
                        continue;
                    if (F8.bottom <= h6)
                        continue;
                    J1 = Math.floor(z$) + 0.5;
                    A6.moveTo(J1, F8.top);
                    A6.lineTo(J1, F8.bottom);
                    if (r_.Open == r_.Close) {
                        O9o = "v";
                        O9o += "olume_candle";
                        I2 = this.offset;
                        if (this.layout.chartType == O9o) {
                            y6x.r9e(23);
                            I2 = y6x.z7A(G9, 2);
                        }
                        y6x.E_X(4);
                        R8 = y6x.z7A(J1, I2);
                        y6x.E_X(0);
                        C7 = y6x.v50(J1, I2);
                        x$ = Math.floor(j0.semiLog ? this.pixelFromPrice(r_.Open, x9) : (j0.high - r_.Open) * j0.multiplier + j0.top) + 0.5;
                        if (x$ <= i6 && x$ >= h6) {
                            A6.moveTo(R8, x$);
                            A6.lineTo(C7, x$);
                        }
                    }
                }
                this.canvasColor(t6);
                A6.stroke(); ;
            };
            A.prototype.drawShadows = function (F1, H$B) {
                var t_,
                Z6L,
                m9,
                p2,
                e_,
                y7,
                Z99,
                c0r,
                q$Y,
                B7j,
                a_,
                V$,
                b$,
                u6,
                q9b,
                l4,
                M8v,
                v0,
                e3,
                j0r,
                h_P,
                m1R,
                B3v;
                t_ = F1.chart;
                if (!t_) {
                    t_ = F1;
                    F1 = F1.chart;
                }
                Z6L = t_.dataSegment;
                m9 = this.chart.context;
                m9.lineWidth =  + "1";
                p2 = F1.yAxis.top;
                e_ = F1.yAxis.bottom;
                q$Y = t_.dataSet.length - t_.scroll;
                B7j = q$Y + t_.maxTicks;
                a_ = F1.yAxis;
                V$ = this.layout.candleWidth;
                y6x.E_X(36);
                var x1M = y6x.v50(7, 17, 12, 3);
                b$ = F1.left - 0.5 * V$ + this.micropixels - x1M;
                for (var R$ = 0; R$ <= Z6L.length; R$++) {
                    y6x.E_X(23);
                    b$ += y6x.v50(V$, 2);
                    V$ = this.layout.candleWidth;
                    y6x.r9e(23);
                    b$ += y6x.v50(V$, 2);
                    u6 = Z6L[R$];
                    if (!u6)
                        continue;
                    if (u6.projection)
                        continue;
                    if (u6.candleWidth) {
                        y6x.E_X(55);
                        var o$T = y6x.v50(16, 5, 18, 0, 5);
                        b$ += (u6.candleWidth - V$) / o$T;
                        V$ = u6.candleWidth;
                    }
                    q9b = H$B(this, u6, "shadow");
                    if (!q9b)
                        continue;
                    if (u6.transform) {
                        u6 = u6.transform;
                    }
                    l4 = u6.cache;
                    y6x.r9e(0);
                    M8v = y6x.z7A(q$Y, R$);
                    if (M8v < F1.cacheLeft || M8v > F1.cacheRight || !l4.top) {
                        y7 = a_.semiLog ? this.pixelFromPrice(u6.High, F1) : (a_.high - u6.High) * a_.multiplier + a_.top;
                        Z99 = a_.semiLog ? this.pixelFromPrice(u6.Low, F1) : (a_.high - u6.Low) * a_.multiplier + a_.top;
                        y6x.r9e(4);
                        v0 = y6x.v50(Z99, y7);
                        if (y7 < p2) {
                            if (y7 + v0 < p2) {
                                l4.top = y7;
                                l4.bottom = y7;
                                continue;
                            }
                            y6x.E_X(4);
                            v0 -= y6x.z7A(p2, y7);
                            y7 = p2;
                        }
                        if (y7 + v0 > e_) {
                            y6x.r9e(20);
                            v0 -= y6x.v50(e_, y7, v0);
                        }
                        l4.top = y7;
                        l4.bottom = l4.top + v0;
                    }
                    if (l4.top >= e_)
                        continue;
                    if (l4.bottom <= p2)
                        continue;
                    e3 = Math.floor(b$) + 0.5;
                    m9.beginPath();
                    m9.moveTo(e3, l4.top);
                    m9.lineTo(e3, l4.bottom);
                    if (u6.Open == u6.Close || !u6.Open && u6.Open !== 0) {
                        j0r = this.offset;
                        if (this.layout.chartType == "volume_candle") {
                            y6x.r9e(56);
                            j0r = y6x.v50(V$, "2");
                        }
                        y6x.r9e(4);
                        h_P = y6x.v50(e3, j0r);
                        y6x.r9e(0);
                        m1R = y6x.z7A(e3, j0r);
                        B3v = Math.floor(a_.semiLog ? this.pixelFromPrice(u6.Close, F1) : (a_.high - u6.Close) * a_.multiplier + a_.top) + 0.5;
                        if (B3v <= e_ && B3v >= p2) {
                            m9.moveTo(h_P, B3v);
                            m9.lineTo(m1R, B3v);
                        }
                    }
                    m9.strokeStyle = q9b;
                    m9.stroke();
                }
            };
            A.prototype.scatter = function (h9M) {
                var U1X,
                x6h,
                A8l,
                V$9,
                X0w,
                H3i,
                n54,
                V9S,
                B39;
                U1X = h9M.chart;
                y6x.r72();
                x6h = U1X.dataSegment;
                A8l = this.chart.context;
                A8l.beginPath();
                A8l.lineWidth = 4;
                V$9 = h9M.yAxis.top;
                X0w = h9M.yAxis.bottom;
                y6x.E_X(57);
                var j_i = y6x.z7A(4, 768, 9, 6, 1084);
                H3i = h9M.left - 0.5 * this.layout.candleWidth + this.micropixels - ("1" >> j_i);
                for (var D0d = 0; D0d <= x6h.length; D0d++) {
                    H3i += this.layout.candleWidth;
                    n54 = x6h[D0d];
                    if (!n54)
                        continue;
                    if (!n54.projection) {
                        if (n54.transform) {
                            n54 = n54.transform;
                        }
                        V9S = [n54.Close];
                        if (("Scatter" in n54)) {
                            V9S = n54.Scatter;
                        }
                        for (var e7d = 0; e7d < V9S.length; e7d++) {
                            B39 = this.pixelFromPrice(V9S[e7d], h9M);
                            if (B39 < V$9)
                                continue;
                            if (B39 > X0w)
                                continue;
                            y6x.E_X(4);
                            A8l.moveTo(y6x.v50(H3i, 2), B39);
                            y6x.r9e(0);
                            A8l.lineTo(y6x.v50(H3i, 2), B39);
                        }
                    }
                }
                this.canvasColor("stx_scatter_chart");
                A8l.stroke();
                A8l.closePath();
                A8l.lineWidth = 1;
            };
            A.prototype.drawKagiSquareWave = function (w6k, S4h, x68) {
                var z9h,
                u5Y,
                G$Y,
                i5$,
                e5n,
                J5W,
                P8K,
                r1C,
                J8i,
                L1a,
                R8F,
                g$_,
                K7N,
                q32,
                Y3Y,
                x6M,
                g7j,
                d5e,
                y3D;
                z9h = w6k.chart;
                this.startClip(w6k.name);
                u5Y = z9h.dataSegment;
                G$Y = z9h.context;
                i5$ = this.canvasStyle(S4h);
                e5n = this.canvasStyle(x68);
                this.canvasColor(S4h);
                J5W = G$Y.strokeStyle;
                this.canvasColor(x68);
                P8K = G$Y.strokeStyle;
                r1C = 1;
                if (i5$.width && parseInt(i5$.width, "10" >> 32) <= 25) {
                    r1C = Math.max(1, D.stripPX(i5$.width));
                }
                J8i =  + "1";
                if (e5n.width && parseInt(e5n.width, 10) <= 25) {
                    J8i = Math.max(1, D.stripPX(e5n.width));
                }
                G$Y.beginPath();
                L1a = z9h.dataSet.length - z9h.scroll;
                R8F = w6k.yAxis;
                g$_ = !!({});
                K7N = null;
                q32 = null;
                Y3Y = null;
                x6M = w6k.left - 0.5 * this.layout.candleWidth + this.micropixels - ("1" - 0);
                for (var h$w = 0; h$w <= u5Y.length; h$w++) {
                    x6M += this.layout.candleWidth;
                    g7j = u5Y[h$w];
                    if (!g7j)
                        continue;
                    if (g7j.projection)
                        break;
                    if (g7j.transform) {
                        g7j = g7j.transform;
                    }
                    d5e = g7j.cache;
                    y6x.E_X(0);
                    y3D = y6x.z7A(L1a, h$w);
                    if (y3D < w6k.cacheLeft || y3D > w6k.cacheRight || !d5e.open) {
                        d5e.open = R8F.semiLog ? this.pixelFromPrice(g7j.Open, w6k) : (R8F.high - g7j.Open) * R8F.multiplier + R8F.top;
                        d5e.close = R8F.semiLog ? this.pixelFromPrice(g7j.Close, w6k) : (R8F.high - g7j.Close) * R8F.multiplier + R8F.top; ;
                    }
                    q32 = d5e.close;
                    if (g$_) {
                        G$Y.moveTo(Math.floor(x6M), d5e.open);
                        K7N = d5e.open;
                        if (d5e.close > d5e.open) {
                            Y3Y = 1;
                        } else {
                            Y3Y = -1;
                        }
                        g$_ = !1;
                    }
                    if (Y3Y != -1 && d5e.close < K7N && K7N < d5e.open) {
                        G$Y.lineTo(Math.floor(x6M), K7N);
                        G$Y.strokeStyle = P8K;
                        G$Y.lineWidth = J8i;
                        G$Y.stroke();
                        G$Y.closePath();
                        G$Y.beginPath();
                        y6x.r9e(4);
                        Y3Y = -y6x.z7A("1", 0);
                        G$Y.moveTo(Math.floor(x6M), K7N);
                    } else if (Y3Y != ("1" ^ 0) && d5e.close > K7N && K7N > d5e.open) {
                        G$Y.lineTo(Math.floor(x6M), K7N);
                        G$Y.strokeStyle = J5W;
                        G$Y.lineWidth = r1C;
                        G$Y.stroke();
                        G$Y.closePath();
                        G$Y.beginPath();
                        Y3Y = 1;
                        G$Y.moveTo(Math.floor(x6M), K7N);
                    }
                    G$Y.lineTo(Math.floor(x6M), d5e.close);
                    if (h$w + 1 < u5Y.length) {
                        G$Y.lineTo(Math.floor(x6M + this.layout.candleWidth), d5e.close);
                        K7N = d5e.open;
                    }
                }
                if (Y3Y == -1 || Y3Y === null && q32 < K7N) {
                    G$Y.strokeStyle = J5W;
                    G$Y.lineWidth = r1C;
                } else {
                    G$Y.strokeStyle = P8K;
                    G$Y.lineWidth = J8i;
                }
                G$Y.stroke();
                G$Y.closePath();
                this.endClip();
                G$Y.lineWidth = 1;
            };
            A.prototype.drawPointFigureChart = function (b$5, d2S, D7o) {
                var l6a,
                X7$,
                f17,
                X0s,
                Y4i,
                D8N,
                i$I,
                C4F,
                x2H,
                C8q,
                S4b,
                Y7y,
                h3J,
                i29,
                Y21,
                A7C,
                z_5,
                F5l,
                r4t,
                z3z,
                J7R,
                i7R;
                l6a = b$5.chart;
                this.startClip(b$5.name);
                X7$ = l6a.dataSegment;
                f17 = l6a.context;
                this.canvasColor(d2S);
                X0s = this.canvasStyle(d2S);
                Y4i = parseInt(X0s.paddingTop, 10);
                D8N = parseInt(X0s.paddingBottom, 10);
                i$I = parseInt(X0s.paddingLeft, 10);
                C4F = parseInt(X0s.paddingRight, 10);
                if (X0s.width && parseInt(X0s.width, 10) <= 25) {
                    f17.lineWidth = Math.max(1, D.stripPX(X0s.width));
                } else {
                    f17.lineWidth =  + "2";
                }
                f17.beginPath();
                if (!this.chart.pandf) {
                    this.chart.pandf = {
                        "box": 1,
                        "reversal": "3" >> 32
                    };
                }
                x2H = this.chart.pandf.box;
                C8q = l6a.dataSet.length - l6a.scroll;
                S4b = b$5.yAxis;
                y6x.x24();
                Y21 = this.layout.candleWidth;
                y6x.r9e(32);
                var T1e = y6x.v50(6, 0, 2, 9);
                A7C = b$5.left - Y21 + this.micropixels - T1e;
                for (var C3y = 0; C3y < X7$.length; C3y++) {
                    A7C += Y21;
                    z_5 = X7$[C3y];
                    if (!z_5)
                        continue;
                    if (z_5.projection)
                        break;
                    if (z_5.candleWidth) {
                        Y21 = z_5.candleWidth;
                    }
                    if (z_5.transform) {
                        z_5 = z_5.transform;
                    }
                    if (D7o == (324.75 >  + "7283" ? 0x1662 : "X") && z_5.Open > z_5.Close)
                        continue;
                    else if (D7o == ((321.95, 8330) !== 469.74 ? "O" : 227.89) && z_5.Open < z_5.Close)
                        continue;
                    F5l = z_5.cache;
                    y6x.E_X(0);
                    r4t = y6x.z7A(C8q, C3y);
                    if (r4t < b$5.cacheLeft || r4t > b$5.cacheRight || !F5l.open) {
                        F5l.open = S4b.semiLog ? this.pixelFromPrice(z_5.Open, b$5) : (S4b.high - z_5.Open) * S4b.multiplier + S4b.top;
                        F5l.close = S4b.semiLog ? this.pixelFromPrice(z_5.Close, b$5) : (S4b.high - z_5.Close) * S4b.multiplier + S4b.top; ;
                    }
                    z3z = Math.round(A7C);
                    y6x.E_X(0);
                    J7R = Math.round(y6x.v50(A7C, Y21));
                    Y7y = Math.abs(Math.round((z_5.Close - z_5.Open) / x2H));
                    h3J = Math.abs((F5l.open - F5l.close) / Y7y);
                    y6x.E_X(56);
                    i7R = y6x.v50(h3J, "2");
                    i29 = F5l.open;
                    for (; Y7y >= ("0" ^ 0); Y7y--) {
                        if (D7o == "X") {
                            y6x.E_X(0);
                            f17.moveTo(y6x.v50(z3z, i$I), y6x.z7A(i7R, D8N, i29, y6x.E_X(28)));
                            y6x.E_X(4);
                            f17.lineTo(y6x.v50(J7R, C4F), y6x.v50(h3J, i7R, i29, Y4i, y6x.r9e(7)));
                            y6x.E_X(0);
                            f17.moveTo(y6x.z7A(z3z, i$I), y6x.v50(h3J, i7R, i29, Y4i, y6x.E_X(7)));
                            y6x.E_X(4);
                            f17.lineTo(y6x.z7A(J7R, C4F), y6x.v50(i7R, D8N, i29, y6x.r9e(28)));
                            i29 -= h3J;
                        } else if (D7o == "O") {
                            y6x.E_X(58);
                            f17.moveTo(y6x.z7A(2, z3z, J7R), y6x.z7A(i7R, i29, Y4i, y6x.E_X(20)));
                            y6x.E_X(0);
                            f17.bezierCurveTo(y6x.z7A(J7R, C4F), y6x.z7A(i7R, i29, Y4i, y6x.r9e(20)), y6x.z7A(J7R, C4F, y6x.r9e(0)), y6x.v50(i29, i7R, h3J, D8N, y6x.r9e(46)), y6x.v50(2, z3z, J7R, y6x.r9e(58)), y6x.v50(i29, i7R, h3J, D8N, y6x.E_X(46)));
                            y6x.r9e(4);
                            f17.bezierCurveTo(y6x.z7A(z3z, i$I), y6x.v50(i29, i7R, h3J, D8N, y6x.E_X(46)), y6x.z7A(z3z, i$I, y6x.r9e(4)), y6x.v50(i7R, i29, Y4i, y6x.E_X(20)), y6x.v50(2, z3z, J7R, y6x.r9e(58)), y6x.v50(i7R, i29, Y4i, y6x.r9e(20)));
                            i29 += h3J;
                        }
                    }
                }
                f17.stroke();
                this.endClip();
                f17.lineWidth = 1;
            };
            A.prototype.drawBarChartHighPerformance = function (W_N, f2Y, L71) {
                var n_M,
                c7v,
                l3C,
                r19,
                f9_,
                P$A,
                L0g,
                a5w,
                K61,
                M5h,
                R2a,
                Z1h,
                B_U,
                M_o,
                X4E,
                T85,
                R_Y,
                a9U,
                D2N,
                g8e,
                I2l,
                x1c;
                n_M = W_N.chart;
                c7v = n_M.dataSegment;
                l3C = n_M.context;
                r19 = this.canvasStyle(f2Y);
                if (r19.width && parseInt(r19.width, 10) <= "25" << 0) {
                    y6x.E_X(17);
                    f9_ = -y6x.z7A(1, "1643500892");
                    P$A = -719721535;
                    L0g = 2;
                    for (var n8W = 1; y6x.a5V(n8W.toString(), n8W.toString().length, 57126) !== f9_; n8W++) {
                        l3C.lineWidth = Math.max(1, D.stripPX(r19.width));
                        L0g += 2;
                    }
                    if (y6x.P2D(L0g.toString(), L0g.toString().length, 30326) !== P$A) {
                        y6x.r9e(12);
                        l3C.lineWidth = Math.max(y6x.z7A("6", 32), D.stripPX(r19.width));
                    }
                } else {
                    l3C.lineWidth = 1;
                }
                l3C.beginPath();
                a5w = W_N.yAxis.top;
                K61 = W_N.yAxis.bottom;
                B_U = n_M.dataSet.length - n_M.scroll;
                M_o = B_U + n_M.maxTicks;
                X4E = W_N.yAxis;
                y6x.r9e(4);
                var j6A = y6x.z7A(3, 2);
                y6x.r72();
                T85 = W_N.left - 0.5 * this.layout.candleWidth + this.micropixels - j6A;
                y6x.E_X(47);
                var m$J = y6x.v50(9, 6, 10, 18);
                R_Y = n_M.tmpWidth / m$J;
                y6x.E_X(4);
                var b0U = y6x.z7A(20, 18);
                a9U = l3C.lineWidth / b0U;
                for (var e38 = 0; e38 <= c7v.length; e38++) {
                    T85 += this.layout.candleWidth;
                    D2N = c7v[e38];
                    if (!D2N)
                        continue;
                    if (D2N.projection)
                        break;
                    if (L71) {
                        if (L71 & A.CLOSEUP && D2N.Close <= D2N.iqPrevClose)
                            continue;
                        else if (L71 & A.CLOSEDOWN && D2N.Close >= D2N.iqPrevClose)
                            continue;
                        else if (L71 & A.CLOSEEVEN && D2N.Close != D2N.iqPrevClose)
                            continue;
                    }
                    if (D2N.transform) {
                        D2N = D2N.transform;
                    }
                    g8e = D2N.cache;
                    y6x.r9e(0);
                    I2l = y6x.v50(B_U, e38);
                    if (I2l < W_N.cacheLeft || I2l > W_N.cacheRight || !g8e.top) {
                        M5h = X4E.semiLog ? this.pixelFromPrice(D2N.High, W_N) : (X4E.high - D2N.High) * X4E.multiplier + X4E.top;
                        R2a = X4E.semiLog ? this.pixelFromPrice(D2N.Low, W_N) : (X4E.high - D2N.Low) * X4E.multiplier + X4E.top;
                        y6x.E_X(4);
                        Z1h = y6x.v50(R2a, M5h);
                        g8e.open = X4E.semiLog ? this.pixelFromPrice(D2N.Open, W_N) : (X4E.high - D2N.Open) * X4E.multiplier + X4E.top;
                        g8e.close = X4E.semiLog ? this.pixelFromPrice(D2N.Close, W_N) : (X4E.high - D2N.Close) * X4E.multiplier + X4E.top;
                        if (M5h < a5w) {
                            if (M5h + Z1h < a5w) {
                                g8e.top = M5h;
                                g8e.bottom = M5h;
                                continue;
                            }
                            y6x.r9e(4);
                            Z1h -= y6x.z7A(a5w, M5h);
                            M5h = a5w;
                        }
                        if (M5h + Z1h > K61) {
                            y6x.r9e(20);
                            Z1h -= y6x.z7A(K61, M5h, Z1h);
                        }
                        g8e.top = M5h;
                        y6x.r9e(0);
                        g8e.bottom = y6x.v50(M5h, Z1h);
                    }
                    x1c = Math.floor(T85) + 0.5;
                    if (g8e.top < K61 && g8e.bottom > a5w) {
                        l3C.moveTo(x1c, g8e.top - a9U);
                        l3C.lineTo(x1c, g8e.bottom + a9U);
                    }
                    if (g8e.open > a5w && g8e.open < K61) {
                        l3C.moveTo(x1c, g8e.open);
                        y6x.E_X(4);
                        l3C.lineTo(y6x.v50(x1c, R_Y), g8e.open);
                    }
                    if (g8e.close > a5w && g8e.close < K61) {
                        l3C.moveTo(x1c, g8e.close);
                        y6x.E_X(0);
                        l3C.lineTo(y6x.z7A(x1c, R_Y), g8e.close);
                    }
                }
                this.canvasColor(f2Y);
                l3C.stroke();
                l3C.closePath();
                l3C.lineWidth = 1;
            };
            A.prototype.drawBarChart = function (U_P, U4F, x_p) {
                var m_W,
                E6z,
                f2x,
                e1c,
                v68,
                E8N,
                H2E,
                L4P,
                R4_,
                b6m,
                D7K,
                D34,
                m2Q,
                F3Y,
                n$_,
                P7i,
                D$T,
                r_y,
                q0f,
                r2Q,
                F86,
                l86;
                y6x.x24();
                m_W = U_P.chart;
                if (!m_W) {
                    m_W = U_P;
                    U_P = U_P.chart;
                }
                E6z = m_W.dataSegment;
                f2x = m_W.context;
                e1c = this.canvasStyle(U4F);
                if (e1c.width && parseInt(e1c.width, 10) <= 25) {
                    f2x.lineWidth = Math.max(1, D.stripPX(e1c.width));
                } else {
                    f2x.lineWidth = 1;
                }
                v68 = U_P.yAxis.top;
                E8N = U_P.yAxis.bottom;
                b6m = m_W.dataSet.length - m_W.scroll;
                D7K = b6m + m_W.maxTicks;
                D34 = U_P.yAxis;
                m2Q = {};
                F3Y = m_W.tmpWidth /  + "2";
                y6x.r9e(4);
                var H_k = y6x.z7A(20, 18);
                n$_ = f2x.lineWidth / H_k;
                P7i = this.layout.candleWidth;
                D$T = U_P.left - 0.5 * P7i + this.micropixels -  + "1";
                for (var A9E = 0; A9E <= E6z.length; A9E++) {
                    y6x.E_X(56);
                    D$T += y6x.v50(P7i, "2");
                    P7i = this.layout.candleWidth;
                    y6x.E_X(23);
                    D$T += y6x.v50(P7i, 2);
                    r_y = E6z[A9E];
                    if (!r_y)
                        continue;
                    if (r_y.projection)
                        break;
                    if (r_y.candleWidth) {
                        D$T += (r_y.candleWidth - P7i) / ("2" - 0);
                        P7i = r_y.candleWidth;
                    }
                    q0f = x_p(this, r_y);
                    if (!q0f)
                        continue;
                    m2Q[q0f] = 1;
                    f2x.strokeStyle = q0f;
                    f2x.beginPath();
                    if (r_y.transform) {
                        r_y = r_y.transform;
                    }
                    r2Q = r_y.cache;
                    y6x.r9e(0);
                    F86 = y6x.z7A(b6m, A9E);
                    if (F86 < U_P.cacheLeft || F86 > U_P.cacheRight || !r2Q.top) {
                        H2E = this.pixelFromPrice(r_y.High, U_P);
                        L4P = this.pixelFromPrice(r_y.Low, U_P);
                        y6x.E_X(4);
                        R4_ = y6x.v50(L4P, H2E);
                        r2Q.open = D34.semiLog ? this.pixelFromPrice(r_y.Open, U_P) : (D34.high - r_y.Open) * D34.multiplier + D34.top;
                        r2Q.close = D34.semiLog ? this.pixelFromPrice(r_y.Close, U_P) : (D34.high - r_y.Close) * D34.multiplier + D34.top;
                        if (H2E < v68) {
                            if (H2E + R4_ < v68) {
                                r2Q.top = H2E;
                                r2Q.bottom = H2E;
                                continue;
                            }
                            y6x.E_X(4);
                            R4_ -= y6x.v50(v68, H2E);
                            H2E = v68;
                        }
                        if (H2E + R4_ > E8N) {
                            y6x.r9e(20);
                            R4_ -= y6x.v50(E8N, H2E, R4_);
                        }
                        r2Q.top = H2E;
                        y6x.r9e(0);
                        r2Q.bottom = y6x.v50(H2E, R4_);
                    }
                    l86 = Math.floor(D$T) + 0.5;
                    if (r2Q.top < E8N && r2Q.bottom > v68) {
                        f2x.moveTo(l86, r2Q.top - n$_);
                        f2x.lineTo(l86, r2Q.bottom + n$_);
                    }
                    if (r2Q.open > v68 && r2Q.open < E8N) {
                        f2x.moveTo(l86, r2Q.open);
                        y6x.E_X(4);
                        f2x.lineTo(y6x.v50(l86, F3Y), r2Q.open);
                    }
                    if (r2Q.close > v68 && r2Q.close < E8N) {
                        f2x.moveTo(l86, r2Q.close);
                        y6x.r9e(0);
                        f2x.lineTo(y6x.z7A(l86, F3Y), r2Q.close);
                    }
                    f2x.stroke();
                }
                f2x.lineWidth = 1;
                return m2Q;
            };
            A.prototype.plotLineChart = function (D1U, X2B, t9j, v6I, N7A) {
                var w80,
                m_c,
                P$a,
                w27,
                r9j,
                K7Z,
                j3W,
                Q1m,
                m36,
                w1U,
                I1k,
                d42,
                b1Z,
                d6H,
                K1g,
                I_l,
                p5R,
                O0O,
                Q45,
                A6v,
                X_n,
                N3D,
                Y8u,
                h3c,
                V5t,
                J_o,
                P3d,
                Z8O,
                Q_W,
                B3b,
                F_o,
                P3m,
                c0S;
                w80 = !({});
                m_c = !({});
                P$a = !!"";
                w27 = 0;
                r9j = [];
                if (v6I) {
                    w80 = v6I.skipProjections;
                    m_c = v6I.skipTransform;
                    P$a = v6I.noSlopes;
                    w27 = v6I.tension;
                }
                y6x.x24();
                K7Z = D1U.chart;
                j3W = this.chart.context;
                Q1m = !![];
                m36 = D1U.yAxis;
                w1U = m36.top;
                I1k = m36.bottom;
                d42 = K7Z.dataSet.length - K7Z.scroll;
                b1Z = null;
                d6H = {};
                y6x.E_X(29);
                K1g = [0, y6x.z7A(64, "0")];
                I_l = this.layout.candleWidth;
                y6x.E_X(0);
                var u$_ = y6x.v50(0, 1);
                y6x.r9e(0);
                var R8t = y6x.v50(0, 1);
                p5R = D1U.left - (v6I.noSlopes ? u$_ : 0.5) * I_l + this.micropixels - R8t;
                this.startClip(D1U.name);
                j3W.beginPath();
                for (var N8R = 0; N8R <= X2B.length; N8R++) {
                    y6x.E_X(23);
                    p5R += y6x.z7A(I_l, 2);
                    if (v6I.noSlopes) {
                        y6x.r9e(59);
                        p5R += y6x.z7A(0, "2", I_l);
                    }
                    I_l = this.layout.candleWidth;
                    if (!v6I.noSlopes) {
                        y6x.r9e(23);
                        p5R += y6x.z7A(I_l, 2);
                    }
                    O0O = X2B[N8R];
                    if (!O0O)
                        continue;
                    if (w80 && O0O.projection)
                        break;
                    if (O0O.candleWidth) {
                        if (!v6I.noSlopes) {
                            y6x.r9e(28);
                            var b7s = y6x.v50(14, 12, 0);
                            p5R += (O0O.candleWidth - I_l) / b7s;
                        }
                        I_l = O0O.candleWidth;
                    }
                    if (!m_c && O0O.transform) {
                        O0O = O0O.transform;
                    }
                    Q45 = p5R;
                    A6v = O0O.cache;
                    y6x.E_X(0);
                    X_n = y6x.z7A(d42, N8R);
                    if (!O0O[t9j] && O0O[t9j] !== 0)
                        continue;
                    if (X_n < D1U.cacheLeft || X_n > D1U.cacheRight || !A6v[t9j]) {
                        A6v[t9j] = m36.semiLog ? this.pixelFromPrice(O0O[t9j], D1U) : (m36.high - O0O[t9j]) * m36.multiplier + m36.top; ;
                    }
                    if (Q45 <= D1U.right) {
                        b1Z = O0O;
                    }
                    if (N8R == X2B.length - 1) {
                        if (this.extendLastTick) {
                            y6x.E_X(23);
                            Q45 += y6x.z7A(I_l, 2);
                        }
                        if (v6I.lastTickOffset) {
                            Q45 += v6I.lastTickOffset;
                        };
                    }
                    N3D = A6v[t9j];
                    Y8u = null;
                    if (N7A) {
                        h3c = N7A(this, O0O);
                        if (!h3c)
                            continue;
                        if (typeof h3c == "object") {
                            Y8u = h3c.pattern;
                            h3c = h3c.color;
                        }
                        if (j3W.strokeStyle != h3c) {
                            if (!Q1m) {
                                j3W.stroke();
                                j3W.beginPath();
                                j3W.moveTo(K1g[0], K1g[1]); ;
                            }
                            j3W.strokeStyle = h3c;
                            d6H[h3c] = 1;
                        }
                    }
                    if (Q1m) {
                        Q1m = !"1";
                        if (P$a || d42 <= "0" - 0) {
                            j3W.moveTo(N8R ? Q45 : 0, N3D);
                            if (w27) {
                                r9j.push(Q45, N3D);
                            } else {
                                if (Y8u) {
                                    j3W.dashedLineTo(0, N3D, Q45, N3D, Y8u);
                                } else {
                                    j3W.lineTo(Q45, N3D);
                                }
                            }
                        } else if (d42 > 0) {
                            V5t = K7Z.dataSet[d42];
                            if (!m_c && V5t.transform) {
                                V5t = V5t.transform;
                            }
                            J_o = V5t[t9j];
                            if (!J_o || isNaN(J_o)) {
                                j3W.moveTo(N8R ? Q45 : 0, N3D);
                                if (w27) {
                                    r9j.push(Q45, N3D);
                                }
                            } else {
                                J_o = m36.semiLog ? this.pixelFromPrice(J_o, D1U) : (m36.high - J_o) * m36.multiplier + m36.top;
                                y6x.E_X(4);
                                P3d = y6x.v50(Q45, I_l);
                                if (Y8u) {
                                    j3W.dashedLineTo(P3d, J_o, Q45, N3D, Y8u);
                                } else {
                                    j3W.moveTo(P3d, J_o);
                                    if (w27) {
                                        r9j.push(P3d, J_o, Q45, N3D);
                                    } else {
                                        j3W.lineTo(Q45, N3D);
                                    }
                                }
                            }
                        }
                    } else {
                        if (P$a) {
                            y6x.E_X(4);
                            Z8O = X2B[y6x.z7A(N8R, 1)];
                            if (!Z8O)
                                continue;
                            if (!m_c && Z8O.transform) {
                                Z8O = Z8O.transform;
                            }
                            if (N8R) {
                                if (Y8u) {
                                    j3W.dashedLineTo(K1g[ + "0"], K1g[1], Q45, K1g["1" >> 0], Y8u);
                                } else {
                                    j3W.lineTo(Q45, K1g[1]);
                                }
                                j3W.moveTo(Q45, N3D); ;
                            }
                            if (N8R == X2B.length - 1) {
                                if (Y8u) {
                                    y6x.r9e(0);
                                    j3W.dashedLineTo(Q45, N3D, y6x.z7A(Q45, I_l), N3D, Y8u);
                                } else {
                                    y6x.E_X(0);
                                    j3W.lineTo(y6x.v50(Q45, I_l), N3D);
                                }
                            }
                        } else {
                            if (Y8u) {
                                j3W.dashedLineTo(K1g[0], K1g[ + "1"], Q45, N3D, Y8u);
                            } else {
                                if (w27) {
                                    r9j.push(Q45, N3D);
                                } else {
                                    j3W.lineTo(Q45, N3D);
                                }
                            }
                        }
                    }
                    K1g = [Q45, N3D];
                    if (N8R === X2B.length -  + "1" && w27) {
                        r9j.push(Q45, N3D);
                        B(r9j, w27, j3W);
                    }
                }
                j3W.stroke();
                this.endClip();
                if (v6I.label && b1Z) {
                    Q_W = "pl";
                    Q_W += "ot";
                    B3b = "n";
                    B3b += "oop";
                    if (m36.priceFormatter) {
                        F_o = m36.priceFormatter(this, D1U, b1Z[t9j], v6I.labelDecimalPlaces);
                    } else {
                        F_o = this.formatYAxisPrice(b1Z[t9j], D1U, v6I.labelDecimalPlaces);
                    }
                    P3m = this.yaxisLabelStyle;
                    if (D1U.yAxis.yaxisLabelStyle) {
                        P3m = D1U.yAxis.yaxisLabelStyle;
                    }
                    c0S = P3m == B3b ? j3W.strokeStyle : null;
                    this.yAxisLabels.push({
                        src: Q_W,
                        "args": [D1U, F_o, b1Z.cache[t9j], P3m == "noop" ? "#FFFFFF" : j3W.strokeStyle, c0S]
                    });
                }
                return d6H;
            };
            A.prototype.plotMountainChart = function (P5u, V6T, e$6, w0t) {
                var a_S,
                B2X,
                L1v,
                h1a,
                Y3D,
                E1K,
                o62,
                F8x,
                x9j,
                K8n,
                y0i,
                J3V,
                k5b,
                j3Q,
                G$t,
                v_L,
                e7D,
                V_T,
                C69,
                E$r,
                h4t;
                a_S = ![];
                B2X = !!"";
                L1v = ![];
                h1a = 0;
                Y3D = [];
                if (w0t) {
                    a_S = w0t.skipProjections;
                    B2X = w0t.skipTransform;
                    L1v = w0t.reverse;
                    h1a = w0t.tension;
                }
                E1K = P5u.chart;
                o62 = this.chart.context;
                F8x = !![];
                x9j = P5u.yAxis.top;
                K8n = P5u.yAxis.bottom;
                this.startClip(P5u.name);
                o62.beginPath();
                y0i = E1K.dataSet.length - E1K.scroll;
                J3V = null;
                k5b = null;
                j3Q = P5u.yAxis;
                G$t = 0;
                y6x.x24();
                for (var Z7f = 0; Z7f <= V6T.length; Z7f++) {
                    v_L = V6T[Z7f];
                    if (!v_L)
                        continue;
                    if (a_S && v_L.projection)
                        break;
                    if (!B2X && v_L.transform) {
                        v_L = v_L.transform;
                    }
                    e7D = v_L.cache;
                    y6x.r9e(0);
                    V_T = y6x.z7A(y0i, Z7f);
                    if (V_T < P5u.cacheLeft || V_T > P5u.cacheRight || !e7D[e$6]) {
                        if (!v_L[e$6] && v_L[e$6] !== "0" >> 0)
                            continue;
                        e7D[e$6] = j3Q.semiLog ? this.pixelFromPrice(v_L[e$6], P5u) : (j3Q.high - v_L[e$6]) * j3Q.multiplier + j3Q.top; ;
                    }
                    y6x.E_X(9);
                    var N5m = y6x.z7A(17, 441, 17, 9);
                    G$t = P5u.left + (Z7f + 0.5) * this.layout.candleWidth + this.micropixels - N5m;
                    if (Z7f == V6T.length - 1) {
                        if (this.extendLastTick) {
                            G$t += this.layout.candleWidth / ("2" ^ 0);
                        }
                        if (w0t.lastTickOffset) {
                            G$t += w0t.lastTickOffset;
                        };
                    }
                    if (J3V === null) {
                        J3V = y0i >=  + "0" ? 0 : G$t;
                    }
                    C69 = e7D[e$6];
                    if (k5b === null) {
                        k5b = C69;
                    }
                    if (F8x) {
                        F8x = !!0;
                        if (y0i <= 0) {
                            o62.moveTo(J3V, C69);
                            if (h1a) {
                                Y3D.push(J3V, C69);
                            }
                        } else {
                            E$r = E1K.dataSet[y0i];
                            if (E$r.transform) {
                                E$r = E$r.transform;
                            }
                            h4t = E$r[e$6];
                            h4t = j3Q.semiLog ? this.pixelFromPrice(h4t, P5u) : (j3Q.high - h4t) * j3Q.multiplier + j3Q.top;
                            J3V = G$t - this.layout.candleWidth;
                            o62.moveTo(J3V, h4t);
                            if (h1a) {
                                Y3D.push(J3V, h4t, G$t, C69);
                            } else {
                                o62.lineTo(G$t, C69);
                            }
                        }
                    } else {
                        if (h1a) {
                            Y3D.push(G$t, C69);
                        } else {
                            o62.lineTo(G$t, C69);
                        }
                    }
                    if (Z7f === V6T.length - 1 && h1a) {
                        Y3D.push(G$t, C69);
                        B(Y3D, h1a, o62);
                    }
                }
                o62.lineTo(G$t, L1v ? x9j : K8n);
                o62.lineTo(J3V, L1v ? x9j : K8n);
                if (L1v) {
                    if (k5b < x9j) {
                        k5b = x9j;
                    }
                } else {
                    if (k5b > K8n) {
                        k5b = K8n;
                    }
                }
                o62.lineTo(J3V, k5b);
                o62.fill();
                o62.closePath();
                this.endClip();
            };
            A.prototype.drawLineChart = function (I3T, Y5p, j1I) {
                var x4w,
                J8R,
                L6l,
                P4F;
                x4w = this.chart.context;
                J8R = this.canvasStyle(Y5p);
                if (J8R.width && parseInt(J8R.width, 10) <= 25) {
                    x4w.lineWidth = Math.max(1, D.stripPX(J8R.width));
                } else {
                    x4w.lineWidth = 1;
                }
                this.canvasColor(Y5p);
                L6l = {
                    skipProjections: !0
                };
                if (I3T.chart.tension) {
                    L6l.tension = I3T.chart.tension;
                }
                y6x.x24();
                if (I3T.chart.lastTickOffset) {
                    L6l.lastTickOffset = I3T.chart.lastTickOffset;
                }
                P4F = this.plotLineChart(I3T, I3T.chart.dataSegment, "Close", L6l, j1I);
                x4w.lineWidth = 1;
                return P4F;
            };
            A.prototype.drawMountainChart = function (j8i, T0c, f8Q) {
                var W1k,
                H3$,
                b4h,
                a_d,
                n6f,
                s$d,
                h7Q,
                Z8N,
                e$T,
                c1U,
                r6j,
                d3P;
                W1k = this.chart.context;
                if (!T0c) {
                    T0c = "stx_mountain_chart";
                }
                H3$ = this.canvasStyle(T0c);
                if (H3$.width && parseInt(H3$.width, 10) <= 25) {
                    W1k.lineWidth = Math.max(1, D.stripPX(H3$.width));
                } else {
                    W1k.lineWidth = 1;
                }
                b4h = this.pixelFromPrice(j8i.chart.highValue, j8i);
                if (isNaN(b4h)) {
                    b4h = 0;
                }
                a_d = H3$.backgroundColor;
                n6f = H3$.color;
                if (n6f && !D.isTransparent(n6f)) {
                    s$d = W1k.createLinearGradient(0, b4h, 0, j8i.yAxis.bottom);
                    s$d.addColorStop(0, a_d);
                    s$d.addColorStop(1, n6f);
                    W1k.fillStyle = s$d;
                } else {
                    W1k.fillStyle = a_d;
                }
                y6x.r72();
                h7Q = {
                    skipProjections: !!({})
                };
                if (j8i.chart.tension) {
                    h7Q.tension = j8i.chart.tension;
                }
                if (j8i.chart.lastTickOffset) {
                    h7Q.lastTickOffset = j8i.chart.lastTickOffset;
                }
                Z8N = parseInt(H3$.padding, 10);
                e$T = H3$.borderTopColor;
                c1U = null;
                if (e$T && !D.isTransparent(e$T)) {
                    if (Z8N && !D.isIE8) {
                        if (!this.scratchContext) {
                            r6j = W1k.canvas.cloneNode(!![]);
                            this.scratchContext = r6j.getContext("2d");
                            this.scratchContext.canvas = r6j;
                        }
                        this.scratchContext.canvas.height = W1k.canvas.height;
                        this.scratchContext.canvas.width = W1k.canvas.width;
                        this.scratchContext.drawImage(W1k.canvas, 0, 0);
                        W1k.clearRect(0, 0, W1k.canvas.width, W1k.canvas.height);
                    }
                }
                this.plotMountainChart(j8i, j8i.chart.dataSegment, "Close", h7Q);
                if (e$T && !D.isTransparent(e$T)) {
                    if (Z8N && !D.isIE8) {
                        d3P = "C";
                        d3P += "lose";
                        W1k.save();
                        y6x.r9e(17);
                        W1k.lineWidth += y6x.v50(Z8N, 2);
                        W1k.globalCompositeOperation = "destination-out";
                        this.plotLineChart(j8i, j8i.chart.dataSegment, d3P, h7Q);
                        W1k.globalCompositeOperation = "destination-over";
                        W1k.scale(1 / this.adjustedDisplayPixelRatio, 1 / this.adjustedDisplayPixelRatio);
                        W1k.drawImage(this.scratchContext.canvas, 0, 0);
                        W1k.restore();
                    }
                    W1k.strokeStyle = e$T;
                    c1U = this.plotLineChart(j8i, j8i.chart.dataSegment, "Close", h7Q, f8Q);
                }
                W1k.lineWidth = 1;
                return c1U;
            };
            A.prototype.drawWaveChart = function (M0F) {
                var F4k,
                P9$,
                B_t,
                s9P,
                n73,
                y59,
                u_l,
                S32,
                f5q,
                b1e,
                H3D,
                c7M,
                D2s,
                H8E,
                Z7A,
                c3C;
                F4k = "stx_l";
                F4k += "ine_char";
                F4k += "t";
                P9$ = M0F.chart;
                B_t = P9$.dataSegment;
                s9P = this.chart.context;
                this.startClip(M0F.name);
                s9P.beginPath();
                n73 = !({});
                y59 = ![];
                u_l = M0F.yAxis.top;
                S32 = M0F.yAxis.bottom;
                f5q = M0F.left + Math.floor(-0.5 * this.layout.candleWidth + this.micropixels);
                for (var x__ = 0; x__ <= B_t.length; x__++) {
                    f5q += this.layout.candleWidth;
                    b1e = B_t[x__];
                    if (!b1e)
                        continue;
                    if (b1e.projection)
                        break;
                    if (b1e.transform) {
                        b1e = b1e.transform;
                    }
                    y6x.E_X(0);
                    var d6U = y6x.v50(0, 3);
                    y6x.r9e(60);
                    var u5w = y6x.z7A(5, 27, 1, 4, 20);
                    H3D = f5q - d6U * this.layout.candleWidth / u5w;
                    c7M = this.pixelFromPrice(b1e.Open, M0F);
                    if (c7M < u_l) {
                        c7M = u_l;
                        if (y59) {
                            s9P.moveTo(H3D, c7M);
                            continue;
                        }
                        y59 = !0;
                    } else if (c7M > S32) {
                        c7M = S32;
                        if (y59) {
                            s9P.moveTo(H3D, c7M);
                            continue;
                        }
                        y59 = !0;
                    } else {
                        y59 = !({});
                    }
                    if (!n73) {
                        n73 = !"";
                        D2s = P9$.dataSet.length - P9$.scroll;
                        if (D2s <= 0) {
                            s9P.moveTo(H3D, c7M);
                        } else if (D2s > 0) {
                            y6x.E_X(4);
                            H8E = P9$.dataSet[y6x.z7A(D2s, 1)];
                            if (H8E.transform) {
                                H8E = H8E.transform;
                            }
                            Z7A = H8E.Close;
                            Z7A = M0F.yAxis.semiLog ? this.pixelFromPrice(Z7A, M0F) : (M0F.yAxis.high - Z7A) * M0F.yAxis.multiplier + u_l;
                            Z7A = Math.min(Math.max(Z7A, u_l), S32);
                            s9P.moveTo(M0F.left + (x__ - ("1" >> 32)) * this.layout.candleWidth + this.micropixels, Z7A);
                            s9P.lineTo(H3D, c7M);
                        }
                        s9P.moveTo(H3D, c7M);
                    } else {
                        s9P.lineTo(H3D, c7M);
                    }
                    y6x.r9e(61);
                    var e68 = y6x.v50(36, 3, 116, 15, 3);
                    H3D += this.layout.candleWidth / e68;
                    if (b1e.Open < b1e.Close) {
                        c7M = this.pixelFromPrice(b1e.Low, M0F);
                        if (c7M < u_l) {
                            c7M = u_l;
                        }
                        if (c7M > S32) {
                            c7M = S32;
                        }
                        s9P.lineTo(H3D, c7M);
                        H3D += this.layout.candleWidth /  + "4";
                        c7M = this.pixelFromPrice(b1e.High, M0F);
                        if (c7M < u_l) {
                            c7M = u_l;
                        }
                        if (c7M > S32) {
                            c7M = S32;
                        }
                        s9P.lineTo(H3D, c7M);
                    } else {
                        c7M = this.pixelFromPrice(b1e.High, M0F);
                        if (c7M < u_l) {
                            c7M = u_l;
                        }
                        if (c7M > S32) {
                            c7M = S32;
                        }
                        s9P.lineTo(H3D, c7M);
                        y6x.r9e(62);
                        var l8m = y6x.z7A(18, 8, 23, 9);
                        H3D += this.layout.candleWidth / l8m;
                        c7M = this.pixelFromPrice(b1e.Low, M0F);
                        if (c7M < u_l) {
                            c7M = u_l;
                        }
                        if (c7M > S32) {
                            c7M = S32;
                        }
                        s9P.lineTo(H3D, c7M);
                    }
                    y6x.r9e(41);
                    var K7S = y6x.z7A(16, 19, 8, 292);
                    H3D += this.layout.candleWidth / K7S;
                    c7M = this.pixelFromPrice(b1e.Close, M0F);
                    if (c7M < u_l) {
                        c7M = u_l;
                    }
                    if (c7M > S32) {
                        c7M = S32;
                    }
                    s9P.lineTo(H3D, c7M);
                }
                c3C = this.canvasStyle("stx_line_chart");
                if (c3C.width && parseInt(c3C.width, 10) <= ("25" ^ 0)) {
                    y6x.r9e(30);
                    s9P.lineWidth = Math.max(y6x.v50(1, "1"), D.stripPX(c3C.width));
                } else {
                    s9P.lineWidth =  + "1";
                }
                this.canvasColor(F4k);
                s9P.stroke();
                s9P.closePath();
                this.endClip();
                s9P.lineWidth = 1;
            };
            A.prototype.updateFloatHRLabel = function (U5G) {
                var F_2,
                S_7,
                u4U,
                D7s,
                R$U,
                A7g,
                S87,
                h0B,
                X4w,
                Z4G;
                F_2 = "n";
                F_2 += "o";
                F_2 += "n";
                y6x.r72();
                F_2 += "e";
                S_7 = U5G.yaxisLHS.concat(U5G.yaxisRHS);
                u4U = this.crossYActualPos ? this.crossYActualPos : this.cy;
                if (this.floatCanvas.isDirty) {
                    D.clearCanvas(this.floatCanvas, this);
                }
                if (this.controls.crossX.style.display == F_2) {
                    return;
                }
                if (this.controls.crossY) {
                    D7s = "p";
                    D7s += "x";
                    R$U = "ro";
                    R$U += "undRectArrow";
                    A7g = U5G.width;
                    if (this.yaxisLabelStyle == R$U) {
                        A7g -= 7;
                    }
                    this.controls.crossY.style.left = U5G.left + "px";
                    y6x.r9e(0);
                    this.controls.crossY.style.width = y6x.v50(A7g, D7s);
                }
                for (var N42 = 0; N42 < S_7.length; N42++) {
                    S87 = S_7[N42];
                    h0B = this.valueFromPixel(u4U, U5G, S87);
                    if (isNaN(h0B))
                        continue;
                    if ((U5G.min || U5G.min === 0) && h0B < U5G.min)
                        continue;
                    if ((U5G.max || U5G.max === 0) && h0B > U5G.max)
                        continue;
                    X4w = null;
                    if (S87 !== U5G.chart.yAxis) {
                        X4w = 0;
                        if (S87.shadow < 1000) {
                            y6x.r9e(12);
                            X4w = y6x.z7A("2", 0);
                        }
                        if (S87.shadow <  + "5") {
                            X4w = 4;
                        }
                        if (S87.decimalPlaces || S87.decimalPlaces === 0) {
                            X4w = S87.decimalPlaces;
                        }
                    }
                    if (S87.priceFormatter) {
                        h0B = S87.priceFormatter(this, U5G, h0B, S87);
                    } else {
                        h0B = this.formatYAxisPrice(h0B, U5G, X4w, S87);
                    }
                    Z4G = this.canvasStyle("stx-float-price");
                    this.createYAxisLabel(U5G, h0B, u4U, Z4G.backgroundColor, Z4G.color, this.floatCanvas.context, S87);
                    this.floatCanvas.isDirty = !!({});
                }
            };
            A.prototype.headsUpHR = function () {
                var T1C,
                o_A,
                j_O,
                D6j,
                L$o,
                x6S,
                K3Q,
                O49,
                L8X,
                z1N,
                e5m,
                X9t,
                f7c,
                H_g,
                H27,
                n$L,
                b2f,
                W2Z;
                T1C = "he";
                T1C += "adsUpH";
                T1C += "R";
                o_A = "headsU";
                o_A += "p";
                o_A += "H";
                o_A += "R";
                if (this.runPrepend(o_A, arguments)) {
                    return;
                }
                j_O = this.currentPanel;
                y6x.x24();
                if (!j_O) {
                    return;
                }
                D6j = j_O.chart;
                this.updateFloatHRLabel(j_O);
                if (this.controls.floatDate && !A.hideDates()) {
                    L$o = this.barFromPixel(this.cx);
                    x6S = D6j.xaxis[L$o];
                    if (x6S && x6S.DT) {
                        if (D6j.xAxis.formatter) {
                            K3Q = -1467885472;
                            O49 = 561378287;
                            L8X = 2;
                            for (var Z6K = 1; y6x.P2D(Z6K.toString(), Z6K.toString().length, 98055) !== K3Q; Z6K++) {
                                this.controls.floatDate.innerHTML = D6j.xAxis.formatter(x6S.DT);
                                L8X += 2;
                            }
                            if (y6x.a5V(L8X.toString(), L8X.toString().length,  + "26615") !== O49) {
                                this.controls.floatDate.innerHTML = D6j.xAxis.formatter(x6S.DT);
                            }
                        } else if (this.internationalizer) {
                            z1N = this.internationalizer.monthDay.format(x6S.DT);
                            if (!A.isDailyInterval(this.layout.interval)) {
                                y6x.r9e(0);
                                var n86 = y6x.v50(258, 2842);
                                z1N += ((922.64, 799.34) == n86 ? (30.95, 368.20) : " ") + this.internationalizer.hourMinute.format(x6S.DT);
                            } else {
                                z1N = this.internationalizer.yearMonthDay.format(x6S.DT);
                            }
                            this.controls.floatDate.innerHTML = z1N;
                        } else {
                            y6x.E_X(20);
                            var y91 = y6x.v50(38, 19, 20);
                            e5m = x6S.DT.getMonth() + y91;
                            if (e5m <  + "10") {
                                y6x.E_X(0);
                                e5m = y6x.z7A((5797, 5000) > (8143, 368.79) ? "0" : 3478 <= 141.58 ? (!0, "0x1b0b" << 32) : (!![], !!({})), e5m);
                            }
                            X9t = x6S.DT.getDate();
                            if (X9t < 10) {
                                y6x.r9e(0);
                                X9t = y6x.v50(( + "5270", 2610) === 5806 ? 0x5ed : 1967 <= 8926 ?  + "818" >= (6060, 4300) ? (3.35e+3, 38.68) : "0" : (5.47e+3, 0x172c), X9t);
                            }
                            f7c = x6S.DT.getHours();
                            if (f7c < 10) {
                                y6x.E_X(0);
                                f7c = y6x.v50(7074 < 70.29 ? ("n", "I") : "0", f7c);
                            }
                            H_g = x6S.DT.getMinutes();
                            if (H_g < 10) {
                                y6x.r9e(0);
                                H_g = y6x.z7A((36.07, 11.03) == (616,  + "9390") ? (46.70, 2.10e+3) : "0", H_g);
                            }
                            if (A.isDailyInterval(this.layout.interval)) {
                                y6x.E_X(63);
                                var w$f = y6x.v50(7323, 14, 7323, 7305);
                                y6x.E_X(0);
                                var B_w = y6x.v50(444, 6215);
                                y6x.r9e(8);
                                var p13 = y6x.z7A(9398, 2, 10, 5, 37572);
                                y6x.r9e(28);
                                var T79 = y6x.z7A(38, 19, 6863);
                                y6x.r9e(64);
                                var B9U = y6x.z7A(4617, 4097, 9);
                                y6x.E_X(65);
                                var B5A = y6x.v50(2, 7408, 397, 3);
                                this.controls.floatDate.innerHTML = e5m + "-" + X9t + (w$f <= ( + "7950", 227.17) ? B_w : (p13,  + "751.32") === (T79, B9U) ?  + "0x630" : (B5A, 392) >=  + "4200" ? "728.70" - 0 : "-") + x6S.DT.getFullYear();
                            } else {
                                y6x.r9e(66);
                                this.controls.floatDate.innerHTML = y6x.v50(f7c, H_g, (4010, 301.39) < ("633.18" - 0, 4201) ? 7895 < (7348, 4017) ? (0x4e5, 295.41) : "-" : (!![], 5.29e+3), X9t, e5m, "8978" << 32 == (9864, 8262) ? (0x1ed0, "d") : ( + "915.21", "1790" >> 32) > 8511 ? (5801, 485.43) >= ("7114" ^ 0, 1402) ? (2.15e+3, !!({})) : (5.56e+3, 0x26ea) : ":", "6890" << 64 != 2860 ? 1050 >= 259.57 ? " " : "8830" - 0 > 407.23 ? (0x25a, "f") : 0x585 : !![]);
                                H27 = D6j.xAxis.activeTimeUnit && D6j.xAxis.activeTimeUnit <= D.SECOND || this.layout.timeUnit == "second";
                                n$L = D6j.xAxis.activeTimeUnit && D6j.xAxis.activeTimeUnit <= D.MILLISECOND || this.layout.timeUnit == "millisecond";
                                if (H27 || n$L) {
                                    b2f = x6S.DT.getSeconds();
                                    if (b2f < 10) {
                                        y6x.r9e(0);
                                        b2f = y6x.v50("0", b2f);
                                    }
                                    y6x.r9e(0);
                                    this.controls.floatDate.innerHTML += y6x.z7A((2840, 38.89) > 256 ? (1912, "3140" | 64) < 7430 ? (8.43e+3, !0) : ("S", "E") : ":", b2f);
                                    if (n$L) {
                                        W2Z = x6S.DT.getMilliseconds();
                                        if (W2Z < 10) {
                                            y6x.E_X(0);
                                            W2Z = y6x.z7A("0", W2Z);
                                        }
                                        if (W2Z <  + "100") {
                                            y6x.r9e(0);
                                            W2Z = y6x.v50("0", W2Z);
                                        }
                                        y6x.E_X(0);
                                        this.controls.floatDate.innerHTML += y6x.z7A(":", W2Z);
                                    }
                                }
                            }
                        }
                    } else if (x6S && x6S.index) {
                        this.controls.floatDate.innerHTML = x6S.index;
                    } else {
                        this.controls.floatDate.innerHTML = ""; ;
                    }
                }
                this.runAppend(T1C, arguments);
            };
            A.prototype.setCrosshairColors = function () {
                return; ;
            };
            A.prototype.magnetize = function () {
                var T0n,
                A1B,
                v_8,
                r41,
                G7_,
                g1p,
                Z31,
                D$7,
                i8V,
                d$Y,
                J1$,
                e1u,
                P0F,
                h4k,
                Z1V,
                X2o,
                O9R,
                Z3$,
                v7j,
                b7C;
                T0n = "m";
                T0n += "agn";
                T0n += "etize";
                A1B = "f";
                A1B += "reeform";
                this.magnetizedPrice = null;
                if (this.runPrepend("magnetize", arguments)) {
                    return;
                }
                if ((this.currentVectorParameters.vectorType == "annotation" || this.currentVectorParameters.vectorType == "callout") && A.drawingLine) {
                    return;
                }
                if (this.currentVectorParameters.vectorType == "projection") {
                    return;
                }
                if (this.currentVectorParameters.vectorType == A1B) {
                    return;
                }
                v_8 = this.currentPanel;
                if (v_8.name == v_8.chart.name) {
                    r41 = "volume_ca";
                    r41 += "n";
                    r41 += "dle";
                    G7_ = "hollow_";
                    G7_ += "candle";
                    g1p = "co";
                    g1p += "lor";
                    g1p += "ed_b";
                    g1p += "ar";
                    Z31 = "b";
                    Z31 += "a";
                    Z31 += "r";
                    D$7 = v_8.chart;
                    i8V = this.tickFromPixel(A.crosshairX - this.left, D$7);
                    if (i8V > D$7.dataSet.length) {
                        return;
                    }
                    d$Y = D$7.dataSet[i8V];
                    if (!d$Y) {
                        return;
                    }
                    J1$ = this.valueFromPixel(this.cy, v_8);
                    this.magnetizedPrice = d$Y.Close;
                    if (this.layout.chartType == Z31 || this.layout.chartType == "candle" || this.layout.chartType == g1p || this.layout.chartType == G7_ || this.layout.chartType == r41) {
                        e1u = "H";
                        e1u += "i";
                        e1u += "g";
                        e1u += "h";
                        P0F = "O";
                        P0F += "p";
                        P0F += "e";
                        P0F += "n";
                        h4k = [P0F, e1u, "Low", "Close"];
                        Z1V = 1000000000;
                        for (var P7Y =  + "0"; P7Y < h4k.length; P7Y++) {
                            X2o = d$Y[h4k[P7Y]];
                            if (Math.abs(J1$ - X2o) < Z1V) {
                                y6x.E_X(4);
                                Z1V = Math.abs(y6x.v50(J1$, X2o));
                                this.magnetizedPrice = X2o;
                            }
                        }
                    }
                    O9R = this.pixelFromTick(i8V, D$7);
                    Z3$ = this.pixelFromPrice(this.magnetizedPrice, this.currentPanel);
                    v7j = this.chart.tempCanvas.context;
                    v7j.beginPath();
                    v7j.lineWidth = 1;
                    y6x.r9e(67);
                    var Z1s = y6x.v50(104, 104, 1, 11, 18);
                    y6x.r9e(0);
                    var x6j = y6x.v50(0, 2);
                    b7C = Math.max(this.layout.candleWidth, Z1s) / x6j;
                    v7j.arc(O9R, Z3$, b7C, 0, 2 * Math.PI, !"1");
                    v7j.fillStyle = "#FFFFFF";
                    v7j.strokeStyle = "#000000";
                    v7j.fill();
                    v7j.stroke();
                    v7j.closePath();
                }
                this.runAppend(T0n, arguments);
            };
            A.prototype.positionCrosshairsAtPointer = function () {
                var F$K,
                U26,
                i90,
                D$a,
                h2v;
                F$K = "p";
                F$K += "x";
                y6x.x24();
                U26 = "p";
                U26 += "x";
                if (!this.currentPanel) {
                    return;
                }
                i90 = this.currentPanel.chart;
                D$a = this.container.getBoundingClientRect();
                this.top = D$a.top;
                this.left = D$a.left;
                this.right = this.left + this.width;
                this.bottom = this.top + this.height;
                h2v = this.tickFromPixel(this.backOutX(A.crosshairX), i90);
                this.cy = this.crossYActualPos = this.backOutY(A.crosshairY);
                this.cx = this.backOutX(A.crosshairX);
                this.controls.crossX.style.left = this.pixelFromTick(h2v, i90) - ("0.5" - 0) + U26;
                this.controls.crossY.style.top = this.backOutY(A.crosshairY) + F$K;
                this.updateChartAccessories();
            };
            A.prototype.doDisplayCrosshairs = function () {
                var n9K;
                if (this.runPrepend("doDisplayCrosshairs", arguments)) {
                    return;
                }
                if (this.displayInitialized) {
                    if (!this.layout.crosshair && (this.currentVectorParameters.vectorType === "" || !this.currentVectorParameters.vectorType)) {
                        this.undisplayCrosshairs();
                    } else if (D.Drawing[this.currentVectorParameters.vectorType] && new D.Drawing[this.currentVectorParameters.vectorType]().dragToDraw) {
                        this.undisplayCrosshairs();
                    } else {
                        if (this.controls.crossX.style.display !== "") {
                            this.controls.crossX.style.display = "";
                            this.controls.crossY.style.display = "";
                            if (this.preferences.magnet && this.currentVectorParameters.vectorType) {
                                n9K = "stx-cr";
                                n9K += "osshair-on";
                                D.unappendClassName(this.container, n9K); ;
                            } else {
                                D.appendClassName(this.container, "stx-crosshair-on"); ;
                            }
                        }
                        if (this.controls.floatDate && !A.hideDates()) {
                            this.controls.floatDate.style.display = "block";
                        }
                    }
                }
                y6x.r72();
                this.runAppend("doDisplayCrosshairs", arguments);
            };
            A.prototype.undisplayCrosshairs = function () {
                var S_a,
                g9o,
                l4K,
                a2a;
                y6x.r72();
                S_a = "undis";
                S_a += "playCrosshairs";
                if (this.runPrepend(S_a, arguments)) {
                    return;
                }
                if (this.controls.crossX) {
                    g9o = "non";
                    g9o += "e";
                    if (this.controls.crossX.style.display != g9o) {
                        l4K = "n";
                        l4K += "one";
                        this.controls.crossX.style.display = l4K;
                        this.controls.crossY.style.display = "none";
                    }
                }
                if (this.displayInitialized && this.controls.floatDate) {
                    a2a = "n";
                    a2a += "o";
                    a2a += "n";
                    a2a += "e";
                    this.controls.floatDate.style.display = a2a;
                }
                D.unappendClassName(this.container, "stx-crosshair-on");
                if (this.floatCanvas && this.floatCanvas.isDirty) {
                    D.clearCanvas(this.floatCanvas, this);
                }
                this.runAppend("undisplayCrosshairs", arguments);
            };
            A.prototype.modalBegin = function () {
                var w99;
                w99 = "m";
                w99 += "o";
                y6x.x24();
                w99 += "d";
                w99 += "al";
                this.openDialog = w99;
                this.undisplayCrosshairs();
            };
            A.prototype.modalEnd = function () {
                this.cancelTouchSingleClick = !!({});
                this.openDialog = "";
                y6x.x24();
                this.doDisplayCrosshairs();
            };
            A.prototype.updateChartAccessories = function () {
                var i39,
                z2O,
                u0R,
                D$n,
                N9e,
                A_5;
                if (this.runPrepend("updateChartAccessories", arguments)) {
                    return;
                }
                this.accessoryTimer = null;
                this.lastAccessoryUpdate = new Date().getTime();
                i39 = this.controls.floatDate;
                if (i39) {
                    z2O = this.currentPanel;
                    if (!z2O) {
                        z2O = this.chart.panel;
                    }
                    if (z2O) {
                        u0R = z2O.chart;
                        D$n = this.tickFromPixel(this.backOutX(A.crosshairX), u0R);
                        N9e = this.xAxisAsFooter === !![] ? "0" ^ 0 : this.chart.canvasHeight - z2O.chart.bottom;
                        y6x.E_X(20);
                        var w8J = y6x.v50(0, 0, 2);
                        A_5 = this.pixelFromTick(D$n, u0R) - i39.offsetWidth / w8J - 0.5;
                        if (A_5 < 0) {
                            A_5 = 0;
                        }
                        y6x.r9e(0);
                        i39.style.left = y6x.z7A(A_5, "px");
                        y6x.r9e(0);
                        i39.style.bottom = y6x.v50(N9e, "px");
                    }
                }
                this.headsUpHR();
                y6x.r72();
                this.runAppend("updateChartAccessories", arguments);
            };
            A.prototype.mousemove = function (e9a) {
                var T64;
                T64 = e9a ? e9a : event;
                A.crosshairX = T64.clientX;
                A.crosshairY = T64.clientY;
                if (this.runPrepend("mousemove", arguments)) {
                    return;
                }
                if (!this.displayInitialized) {
                    return;
                }
                if (this.openDialog !== "") {
                    return;
                }
                this.mousemoveinner(T64.clientX, T64.clientY);
                this.runAppend("mousemove", arguments);
            };
            A.prototype.setResizeTimer = function (d4s) {
                this.resizeDetectMS = d4s;
                if (d4s) {
                    if (this.resizeTimeout) {
                        window.clearInterval(this.resizeTimeout);
                    }
                    this.resizeTimeout = window.setInterval(G_7(this), d4s);
                } else {
                    if (this.resizeTimeout) {
                        window.clearInterval(this.resizeTimeout);
                    }
                    this.resizeTimeout = null;
                }
                y6x.x24();
                function G_7(S53) {
                    y6x.x24();
                    return function () {
                        if (!S53.chart.canvas) {
                            return;
                        }
                        y6x.x24();
                        if (!D.isAndroid) {
                            if (S53.chart.canvas.height != Math.floor(S53.devicePixelRatio * S53.chart.container.clientHeight) || S53.chart.canvas.width != Math.floor(S53.devicePixelRatio * S53.chart.container.clientWidth)) {
                                S53.resizeChart();
                                return;
                            }
                        }
                    };
                }
            };
            A.prototype.whichYAxis = function (x5i, A3W) {
                var z6B,
                r9J,
                l30;
                y6x.r72();
                z6B = "undef";
                z6B += "ined";
                if (typeof A3W === z6B) {
                    A3W = this.cx;
                }
                if (x5i) {
                    r9J = x5i.yaxisLHS.concat(x5i.yaxisRHS);
                    for (var A$R =  + "0"; A$R < r9J.length; A$R++) {
                        l30 = r9J[A$R];
                        if (l30.left <= A3W && l30.left + l30.width >= A3W) {
                            return l30;
                        }
                    }
                }
                return this.chart.panel.yAxis;
            };
            A[y6x.K9Q('\u0065\u0064\u0031\x65') ? "" : '\u0070\x72\x6f\u0074\u006f\u0074\u0079\x70\u0065'][y6x.Q9v('\x32\u0034\u0038\u0035') ? '\x6d\u006f\x75\u0073\x65\x6d\x6f\x76\u0065\u0069\x6e\u006e\u0065\x72' : ""] = function (H5a, Q1B) {
                y6x.r8Y = function (b6f) {
                    y6x.r72();
                    if (y6x)
                        return y6x.I6k(b6f);
                };
                y6x.d5T = function (k1N) {
                    y6x.r72();
                    if (y6x)
                        return y6x.I6k(k1N);
                };
                y6x.H5w = function (y1R) {
                    y6x.r72();
                    if (y6x && y1R)
                        return y6x.I1f(y1R);
                };
                y6x.p1Y = function (F_O) {
                    y6x.r72();
                    if (y6x)
                        return y6x.I1f(F_O);
                };
                y6x.x24();
                y6x.t7f = function (t5m) {
                    if (y6x && t5m)
                        return y6x.I1f(t5m);
                };
                y6x.J$h = function (s0h) {
                    y6x.r72();
                    if (y6x && s0h)
                        return y6x.I1f(s0h);
                };
                var q_K =  - (y6x.j7K('\x34\u0062\u0064\x63') ? 332344575 : 778266831),
                p0A =  - (y6x.f1W('\u0064\x39\u0066\u0036') ? 1911635319 : 7305906714),
                G45 = y6x.J$h('\u0066\x65\x65\u0034') ? 1704148745 : 3518553983;
                if (y6x.H$V(y6x.t7f('\u0036\x64\u0064\u0038') ? 2 : 0, y6x.H9J('\x35\x38\x39\u0033') ? false : true, 937778) === q_K || y6x.H$V(y6x.p1Y('\u0065\x33\u0065\x61') ? 0 : 6, y6x.K2C('\u0063\x34\u0031\x31') ? true : false, y6x.H5w('\u0035\u0061\u0037\u0032') ? 365693 : 917467) === p0A || y6x.H$V(y6x.d5T('\u0063\u0065\u0066\u0066') ? 84 : 16, y6x.r8Y('\u0032\u0064\u0037\u0066') ? true : false, 852785) === G45) {
                    y6x.e8n = function (w5o) {
                        y6x.x24();
                        if (y6x)
                            return y6x.I6k(w5o);
                    };
                    var z$v,
                    Y7v,
                    l7F,
                    I8F,
                    W61,
                    u58,
                    Q04,
                    H5B,
                    o9q,
                    T9k,
                    d_b,
                    e$v,
                    h3e,
                    v_P,
                    i9Y,
                    s_P,
                    y4z,
                    V6r,
                    g$N,
                    B6n,
                    P5$,
                    m$d,
                    U3J,
                    W5z,
                    D_U,
                    M8i,
                    B64,
                    G9j,
                    X29,
                    i$Y;
                    z$v = y6x.A4t('\u0064\u0065\u0034\u0038') ? '\x70' : "";
                    z$v += y6x.v5x('\x34\u0062\u0036\u0032') ? '\x78' : "";
                    if (!this[y6x.e8n('\u0063\u0066\x65\u0036') ? '\u0063\x68\x61\x72\x74' : ""]['\x63\x61\x6e\u0076\u0061\x73']) {
                        return;
                    }
                    if (!D['\x69\u0073\x41\u006e\u0064\u0072\x6f\x69\u0064'] && !D['\u0069\x73\u0049\x4f\x53\u0037\x6f\u0072\x38']) {
                        if (this['\x63\u0068\x61\u0072\x74']['\u0063\u0061\u006e\x76\u0061\x73']['\x68\x65\u0069\u0067\x68\x74'] != Math['\x66\u006c\x6f\u006f\u0072'](this['\u0064\u0065\u0076\x69\u0063\u0065\u0050\u0069\x78\u0065\u006c\x52\u0061\u0074\x69\u006f'] * this['\u0063\u0068\u0061\x72\u0074']['\u0063\x6f\u006e\x74\x61\u0069\u006e\u0065\x72']['\x63\x6c\u0069\u0065\x6e\x74\u0048\u0065\u0069\u0067\u0068\u0074']) || this['\x63\x68\x61\u0072\x74']['\x63\x61\u006e\u0076\x61\u0073']['\x77\u0069\x64\x74\u0068'] != Math['\u0066\u006c\x6f\x6f\x72'](this['\x64\u0065\x76\u0069\x63\u0065\x50\u0069\u0078\x65\u006c\x52\x61\u0074\u0069\x6f'] * this['\u0063\u0068\u0061\x72\x74']['\u0063\x6f\x6e\u0074\x61\u0069\u006e\x65\u0072']['\u0063\u006c\u0069\u0065\x6e\x74\u0057\x69\x64\x74\u0068'])) {
                            this['\x72\x65\u0073\u0069\x7a\x65\u0043\x68\u0061\x72\u0074']();
                            return;
                        }
                    }
                    if (this['\x72\x75\x6e\u0050\u0072\u0065\x70\u0065\x6e\x64']('\x6d\u006f\u0075\x73\x65\u006d\u006f\x76\x65\u0069\u006e\u006e\u0065\x72', arguments)) {
                        return;
                    }
                    l7F = this['\u0063\x6f\u006e\u0074\x61\u0069\x6e\x65\u0072']['\x67\x65\u0074\x42\x6f\x75\u006e\x64\u0069\x6e\u0067\u0043\u006c\x69\u0065\u006e\u0074\x52\x65\u0063\x74']();
                    this['\u0074\x6f\u0070'] = l7F['\u0074\u006f\x70'];
                    this['\u006c\x65\x66\u0074'] = l7F['\u006c\x65\u0066\x74'];
                    this['\x72\u0069\u0067\u0068\u0074'] = this['\u006c\x65\x66\x74'] + this['\u0077\u0069\x64\x74\x68'];
                    this['\x62\x6f\u0074\x74\x6f\x6d'] = this['\x74\u006f\x70'] + this['\x68\u0065\x69\x67\x68\x74'];
                    this['\x63\x61\x6e\x63\x65\u006c\u004c\x6f\u006e\x67\u0048\x6f\u006c\x64'] = !!1;
                    this['\u0068\x61\x73\u0044\u0072\u0061\u0067\x67\u0065\u0064'] = !![];
                    A['\x63\u0072\x6f\x73\u0073\x68\x61\u0069\x72\x58'] = H5a;
                    A['\x63\x72\u006f\x73\u0073\x68\x61\u0069\u0072\x59'] = Q1B;
                    I8F = this['\x63\u0079'] = this['\x63\x72\x6f\u0073\x73\u0059\x41\x63\x74\x75\u0061\x6c\x50\u006f\u0073'] = this['\x62\u0061\u0063\u006b\x4f\u0075\x74\u0059'](A['\u0063\x72\x6f\x73\u0073\x68\u0061\x69\x72\u0059']);
                    W61 = this['\x63\x78'] = this['\x62\u0061\u0063\u006b\x4f\x75\u0074\x58'](A['\x63\u0072\u006f\u0073\x73\u0068\x61\u0069\u0072\u0058']);
                    this['\x63\u0075\u0072\x72\u0065\x6e\x74\x50\x61\x6e\x65\x6c'] = this['\x77\x68\x69\u0063\u0068\x50\u0061\u006e\u0065\u006c'](I8F);
                    if (!this['\x63\x75\x72\x72\x65\x6e\x74\u0050\u0061\u006e\x65\x6c']) {
                        this['\x63\u0075\x72\u0072\x65\x6e\x74\u0050\u0061\u006e\u0065\x6c'] = this['\u0063\x68\x61\u0072\x74']['\x70\u0061\u006e\u0065\u006c'];
                    }
                    if (!this['\x63\x75\u0072\x72\u0065\x6e\u0074\u0050\x61\x6e\u0065\u006c']) {
                        return;
                    }
                    u58 = this['\u0063\u0075\x72\x72\u0065\u006e\u0074\u0050\x61\u006e\u0065\u006c']['\x63\u0068\x61\u0072\x74'];
                    if (u58['\x64\u0061\u0074\x61\u0053\x65\u0074']) {
                        this['\x63\u0072\x6f\u0073\x73\u0068\u0061\u0069\u0072\u0054\u0069\u0063\u006b'] = this['\x74\x69\x63\u006b\x46\u0072\x6f\x6d\u0050\x69\x78\x65\u006c'](W61, u58);
                        Y7v = this['\u0076\u0061\x6c\x75\u0065\x46\u0072\x6f\u006d\u0050\u0069\u0078\u0065\u006c'](I8F, this['\u0063\x75\u0072\u0072\x65\u006e\u0074\x50\u0061\x6e\x65\x6c']);
                        Q04 = this['\u0063\u0075\u0072\x72\u0065\u006e\u0074\u0050\x61\x6e\u0065\u006c']['\u006e\u0061\u006d\u0065'] == '\u0063\x68\u0061\x72\u0074' ? this['\x70\x72\u0065\u0066\x65\x72\x65\x6e\u0063\u0065\x73']['\x68\x6f\u0072\x69\u007a\u006f\x6e\x74\x61\x6c\u0043\x72\x6f\u0073\u0073\x68\u0061\x69\x72\u0046\u0069\x65\x6c\x64'] : this['\u0063\u0075\u0072\x72\u0065\u006e\u0074\x50\u0061\u006e\x65\u006c']['\u0068\x6f\x72\x69\u007a\u006f\u006e\x74\u0061\u006c\x43\x72\u006f\u0073\u0073\x68\u0061\x69\x72\u0046\u0069\u0065\x6c\x64'];
                        if (Q04 && this['\u0063\x72\u006f\u0073\u0073\x68\u0061\x69\u0072\x54\u0069\x63\u006b'] < u58['\u0064\x61\x74\x61\x53\x65\x74']['\u006c\u0065\x6e\u0067\u0074\u0068'] && this['\u0063\x72\x6f\x73\x73\x68\u0061\u0069\x72\u0054\x69\x63\x6b'] > -1) {
                            Y7v = u58['\x64\x61\u0074\x61\u0053\u0065\u0074'][this['\x63\u0072\u006f\u0073\x73\x68\x61\u0069\x72\u0054\u0069\x63\x6b']][Q04];
                            this['\x63\u0072\u006f\u0073\x73\x59\u0041\u0063\u0074\u0075\x61\x6c\x50\x6f\x73'] = this['\u0070\x69\x78\u0065\x6c\x46\x72\x6f\x6d\u0050\u0072\u0069\x63\u0065\x54\x72\x61\x6e\x73\u0066\x6f\u0072\u006d'](Y7v, this['\x63\x75\x72\x72\x65\x6e\u0074\x50\u0061\u006e\x65\u006c']);
                        }
                        this['\x63\u0072\u006f\u0073\x73\x68\u0061\x69\u0072\u0056\x61\x6c\u0075\u0065'] = this['\u0061\u0064\x6a\u0075\u0073\x74\u0049\x66\x4e\x65\x63\x65\u0073\u0073\u0061\x72\u0079'](this['\u0063\u0075\u0072\x72\x65\x6e\u0074\u0050\x61\u006e\u0065\x6c'], this['\x63\u0072\u006f\x73\u0073\u0068\u0061\u0069\u0072\x54\x69\x63\u006b'], Y7v);
                    }
                    if (A['\x63\u0072\u006f\x73\u0073\u0068\x61\u0069\x72\x58'] >= this['\u006c\x65\u0066\u0074'] && A['\x63\u0072\u006f\x73\x73\x68\u0061\x69\x72\x58'] <= this['\u0072\x69\u0067\u0068\u0074'] && A['\u0063\x72\x6f\u0073\x73\u0068\x61\x69\u0072\u0059'] >= this['\u0074\x6f\u0070'] && A['\u0063\x72\u006f\x73\u0073\u0068\x61\x69\x72\x59'] <= this['\u0062\x6f\u0074\x74\x6f\u006d']) {
                        A['\x69\u006e\u0073\x69\u0064\u0065\u0043\x68\x61\x72\x74'] = !!({});
                    } else {
                        A['\u0069\x6e\x73\u0069\u0064\x65\x43\x68\u0061\u0072\x74'] = !({});
                    }
                    this['\x6f\x76\x65\x72\x58\x41\x78\u0069\x73'] = A['\u0063\u0072\x6f\u0073\u0073\u0068\u0061\u0069\u0072\u0059'] >= this['\x74\x6f\u0070'] + this['\u0063\x68\x61\x72\u0074']['\u0070\x61\x6e\u0065\x6c']['\u0079\x41\x78\u0069\x73']['\u0062\u006f\u0074\x74\u006f\x6d'] && A['\u0063\u0072\u006f\x73\x73\x68\x61\x69\x72\u0059'] <= this['\x74\u006f\u0070'] + this['\x63\u0068\u0061\x72\u0074']['\x70\x61\u006e\x65\x6c']['\x62\u006f\u0074\x74\x6f\x6d'] && A['\u0069\x6e\x73\u0069\u0064\x65\x43\x68\x61\x72\x74'];
                    this['\x6f\x76\u0065\u0072\x59\u0041\u0078\x69\u0073'] = (this['\x63\u0078'] >= this['\x63\x75\x72\x72\x65\x6e\u0074\x50\x61\x6e\x65\u006c']['\x72\x69\u0067\x68\x74'] || this['\x63\x78'] <= this['\x63\u0075\x72\x72\x65\u006e\u0074\x50\x61\x6e\x65\u006c']['\u006c\u0065\x66\u0074']) && A['\x69\u006e\u0073\x69\u0064\x65\u0043\u0068\u0061\x72\u0074'];
                    if (this['\x6f\x76\x65\x72\x58\u0041\x78\x69\u0073'] || this['\x6f\x76\x65\x72\x59\u0041\u0078\x69\u0073'] || !A['\x69\u006e\x73\u0069\x64\x65\u0043\x68\u0061\x72\x74'] && !this['\u0067\x72\x61\x62\u0062\u0069\u006e\x67\x53\x63\x72\x65\u0065\u006e']) {
                        this['\u0075\u006e\x64\u0069\u0073\u0070\x6c\u0061\u0079\x43\x72\u006f\u0073\x73\x68\x61\u0069\u0072\x73']();
                        if (!this['\x6f\u0076\u0065\u0072\u0058\u0041\x78\x69\x73'] && !this['\u006f\x76\x65\u0072\x59\u0041\u0078\u0069\x73']) {
                            return;
                        };
                    }
                    if (!this['\x64\x69\x73\x70\u006c\x61\x79\x43\x72\x6f\u0073\u0073\x68\x61\x69\u0072\x73'] && !A['\x72\u0065\x73\x69\x7a\u0069\u006e\u0067\u0050\x61\x6e\u0065\u006c']) {
                        this['\x75\x6e\u0064\u0069\u0073\u0070\x6c\x61\x79\u0043\u0072\x6f\x73\u0073\x68\x61\x69\x72\u0073']();
                        return;
                    }
                    if (this['\x72\x65\u0070\u006f\u0073\x69\x74\x69\x6f\x6e\u0069\x6e\u0067\x42\u0061\u0073\x65\u006c\x69\x6e\x65']) {
                        X29 = this['\u0070\x61\x6e\u0065\x6c\x73'][this['\x63\u0068\u0061\x72\u0074']['\u0070\x61\x6e\u0065\u006c']['\x6e\x61\u006d\u0065']];
                        this['\x63\x68\u0061\u0072\x74']['\u0062\u0061\x73\x65\x6c\x69\u006e\x65']['\x75\x73\u0065\x72\x4c\u0065\x76\x65\x6c'] = this['\u0061\x64\u006a\x75\x73\u0074\u0049\x66\x4e\x65\x63\u0065\x73\u0073\x61\x72\x79'](X29, this['\u0063\x72\u006f\u0073\u0073\u0068\u0061\x69\x72\x54\u0069\x63\x6b'], this['\u0076\u0061\u006c\x75\x65\u0046\x72\x6f\u006d\x50\u0069\x78\u0065\u006c\x55\x6e\u0074\u0072\x61\u006e\u0073\u0066\x6f\u0072\u006d'](this['\x62\x61\u0063\x6b\x4f\x75\u0074\u0059'](A['\u0063\x72\x6f\u0073\u0073\u0068\x61\u0069\u0072\u0059']), X29));
                        if (Date['\x6e\u006f\x77']() - this['\u0072\x65\u0070\x6f\x73\u0069\x74\u0069\u006f\u006e\x69\u006e\x67\x42\x61\u0073\u0065\x6c\x69\x6e\x65']['\x6c\x61\x73\u0074\u0044\x72\x61\u0077'] >  + '\u0031\x30\u0030') {
                            this['\u0064\x72\x61\u0077']();
                            this['\x72\u0065\x70\x6f\x73\x69\x74\u0069\u006f\u006e\x69\u006e\x67\u0042\u0061\x73\x65\x6c\x69\x6e\x65']['\u006c\u0061\x73\u0074\u0044\x72\x61\u0077'] = Date['\u006e\u006f\u0077']();
                        }
                        return;
                    }
                    if (this['\x67\u0072\u0061\u0062\u0062\u0069\x6e\x67\u0053\x63\u0072\u0065\u0065\u006e'] && !A['\x72\x65\x73\u0069\x7a\x69\x6e\u0067\x50\u0061\u006e\x65\u006c']) {
                        if (this['\x61\u006e\u0079\x48\u0069\u0067\u0068\x6c\x69\u0067\u0068\x74\u0065\u0064']) {
                            D['\x63\x6c\u0065\x61\x72\x43\x61\x6e\x76\x61\u0073'](this['\u0063\u0068\u0061\u0072\x74']['\u0074\x65\x6d\x70\u0043\u0061\x6e\u0076\x61\u0073'], this);
                            this['\u0061\x6e\u0079\u0048\x69\u0067\x68\x6c\u0069\x67\u0068\x74\x65\x64'] = !({});
                            for (H5B in this['\u006f\x76\u0065\x72\x6c\x61\u0079\x73']) {
                                this['\u006f\u0076\u0065\u0072\u006c\u0061\u0079\x73'][H5B]['\u0068\x69\x67\u0068\x6c\u0069\x67\u0068\u0074'] = !!0;
                            }
                            for (H5B in u58['\u0073\u0065\u0072\u0069\u0065\u0073']) {
                                u58['\u0073\u0065\u0072\x69\x65\x73'][H5B]['\x68\x69\u0067\x68\u006c\x69\u0067\x68\x74'] = !({});
                            }
                            this['\x64\u0069\u0073\x70\u006c\u0061\x79\x53\u0074\x69\u0063\u006b\u0079']();
                        }
                        if (this['\u0070\x72\u0065\x66\x65\u0072\u0065\x6e\x63\u0065\x73']['\u006d\u0061\u0067\u006e\x65\u0074'] && this['\x63\u0075\x72\x72\x65\x6e\u0074\x56\u0065\x63\u0074\x6f\u0072\u0050\x61\u0072\u0061\u006d\u0065\u0074\u0065\u0072\x73']['\u0076\u0065\u0063\x74\u006f\u0072\u0054\u0079\u0070\x65']) {
                            D['\u0063\x6c\u0065\x61\x72\u0043\u0061\u006e\x76\x61\x73'](this['\u0063\x68\u0061\x72\x74']['\u0074\u0065\x6d\u0070\u0043\x61\x6e\x76\x61\x73'], this);
                        }
                        if (this['\u0067\x72\u0061\x62\x53\x74\x61\u0072\u0074\x58'] == -1) {
                            this['\u0067\x72\x61\u0062\x53\x74\x61\x72\u0074\u0058'] = A['\u0063\u0072\x6f\u0073\x73\u0068\u0061\x69\u0072\u0058'];
                            this['\u0067\u0072\x61\x62\x53\x74\x61\x72\u0074\u0053\x63\u0072\u006f\u006c\x6c\x58'] = u58['\x73\x63\x72\u006f\x6c\u006c'];
                        }
                        if (this['\x67\u0072\u0061\u0062\u0053\u0074\u0061\x72\u0074\x59'] == -1) {
                            this['\u0067\x72\u0061\u0062\u0053\x74\x61\x72\x74\x59'] = A['\u0063\u0072\x6f\u0073\x73\x68\x61\u0069\x72\u0059'];
                            this['\x67\u0072\u0061\u0062\x53\u0074\x61\x72\u0074\u0053\u0063\u0072\x6f\x6c\x6c\x59'] = u58['\u0070\u0061\u006e\u0065\x6c']['\x79\u0041\x78\u0069\u0073']['\u0073\u0063\u0072\u006f\u006c\x6c'];
                        }
                        o9q = A['\x63\u0072\u006f\x73\u0073\x68\u0061\x69\u0072\x58'] - this['\u0067\x72\x61\u0062\x53\u0074\u0061\x72\x74\x58'];
                        T9k = A['\x63\u0072\u006f\x73\u0073\x68\x61\u0069\u0072\u0059'] - this['\x67\x72\u0061\x62\u0053\x74\x61\u0072\x74\u0059'];
                        if (o9q === 0 && T9k === 0) {
                            return;
                        }
                        if (Math['\u0061\u0062\u0073'](o9q) + Math['\x61\u0062\u0073'](T9k) > 5) {
                            this['\u0067\x72\u0061\x62\x4f\u0076\u0065\u0072\x72\u0069\u0064\x65\u0043\x6c\u0069\x63\u006b'] = !!'\u0031';
                        }
                        if (this['\u0061\u006c\u006c\u006f\u0077\x5a\x6f\x6f\u006d'] && this['\x67\x72\u0061\x62\x4d\u006f\u0064\x65'] != '\x70\x61\x6e' && (this['\x67\u0072\x61\x62\u004d\u006f\x64\x65']['\x69\u006e\x64\x65\u0078\x4f\u0066']('\x7a\x6f\x6f\x6d') === 0 || this['\x6f\x76\x65\u0072\x58\x41\u0078\u0069\u0073'] || this['\x6f\u0076\u0065\u0072\u0059\u0041\x78\u0069\x73'])) {
                            if (this['\x67\u0072\x61\x62\x4d\u006f\x64\x65'] === "") {
                                e$v = '\u007a\u006f';
                                e$v += '\x6f\u006d\x2d\u0079';
                                if (this['\x6f\u0076\u0065\u0072\x58\u0041\x78\x69\x73']) {
                                    this['\x67\u0072\u0061\x62\u004d\u006f\u0064\u0065'] = '\x7a\x6f\u006f\x6d\u002d\x78';
                                } else if (this['\u006f\x76\x65\u0072\u0059\u0041\u0078\u0069\u0073']) {
                                    this['\u0067\u0072\u0061\u0062\u004d\x6f\u0064\u0065'] = e$v;
                                }
                            }
                            if (this['\x67\x72\u0061\x62\u004d\u006f\u0064\u0065'] == '\x7a\u006f\x6f\x6d\x2d\u0078') {
                                y6x['\u0045\u005f\u0058'](12);
                                T9k = y6x['\u007a\x37\u0041']('\x30', 64);
                            } else if (this['\u0067\x72\x61\x62\u004d\u006f\u0064\u0065'] == '\u007a\x6f\x6f\x6d\u002d\u0079') {
                                o9q = 0;
                            }
                            y6x['\x72\x39\x65'](68);
                            d_b = y6x['\u007a\x37\u0041'](0, o9q, '\x32\u0035');
                            h3e = !![];
                            if (u58['\u0073\x63\u0072\u006f\x6c\x6c'] <= u58['\u006d\x61\u0078\x54\x69\u0063\x6b\u0073']) {
                                h3e = ![];
                            }
                            v_P = this['\u0067\u0072\u0061\u0062\u0053\x74\x61\u0072\x74\x43\x61\u006e\u0064\x6c\x65\u0057\u0069\u0064\x74\x68'] + d_b;
                            if (v_P < this['\u006d\u0069\u006e\u0069\u006d\u0075\u006d\u0043\x61\x6e\u0064\u006c\u0065\x57\u0069\u0064\x74\x68']) {
                                v_P = this['\x6d\x69\u006e\x69\x6d\x75\u006d\x43\x61\x6e\u0064\x6c\u0065\u0057\x69\x64\x74\x68'];
                            }
                            i9Y = (this['\u006c\x61\x79\x6f\x75\x74']['\u0063\x61\x6e\x64\x6c\x65\u0057\x69\x64\u0074\x68'] - v_P) / this['\x6c\x61\x79\u006f\x75\u0074']['\x63\u0061\x6e\u0064\u006c\u0065\x57\x69\u0064\x74\x68'];
                            if (i9Y > 0.1) {
                                v_P = this['\x6c\u0061\u0079\x6f\u0075\x74']['\x63\x61\x6e\u0064\u006c\x65\x57\x69\x64\x74\u0068'] * 0.9;
                            } else if (i9Y < -0.1) {
                                v_P = this['\u006c\x61\u0079\u006f\u0075\u0074']['\u0063\u0061\u006e\x64\x6c\u0065\u0057\u0069\u0064\x74\u0068'] * 1.1;
                            }
                            if (D['\x69\x70\x61\x64']) {
                                if (Math['\x72\u006f\u0075\x6e\u0064'](this['\u0063\u0068\u0061\u0072\u0074']['\x77\u0069\x64\u0074\u0068'] / this['\x6c\u0061\u0079\x6f\x75\u0074']['\u0063\u0061\u006e\x64\u006c\x65\u0057\x69\x64\x74\u0068'] - ('\u0030\u002e\u0034\u0039\x39' - 0)) - 1 < A['\x69\u0070\u0061\x64\x4d\u0061\u0078\u0054\x69\u0063\u006b\u0073'] && Math['\u0072\x6f\x75\u006e\x64'](this['\x63\u0068\x61\x72\u0074']['\x77\x69\u0064\u0074\u0068'] / v_P - 0.499) - 1 > A['\x69\u0070\x61\u0064\u004d\u0061\x78\x54\x69\x63\x6b\u0073']) {
                                    return;
                                }
                            }
                            if (this['\u0070\x69\u006e\x63\u0068\x69\u006e\x67\x43\u0065\u006e\u0074\u0065\x72']) {
                                y4z = this['\x62\u0061\x63\u006b\u004f\u0075\u0074\u0058'](this['\x70\x69\u006e\x63\u0068\x69\u006e\u0067\u0043\u0065\u006e\u0074\x65\u0072']);
                                V6r = this['\u0074\u0069\x63\u006b\x46\u0072\u006f\u006d\x50\x69\x78\u0065\u006c'](y4z, u58);
                                this['\u0073\x65\x74\u0043\x61\x6e\x64\x6c\x65\u0057\x69\x64\u0074\x68'](v_P, u58);
                                g$N = this['\u0074\x69\x63\u006b\u0046\x72\x6f\x6d\u0050\u0069\u0078\x65\x6c'](y4z, u58);
                                y6x['\x72\x39\x65'](4);
                                u58['\x73\x63\x72\x6f\u006c\x6c'] += Math['\x66\u006c\x6f\u006f\x72'](y6x['\x7a\x37\x41'](g$N, V6r));
                            } else if (h3e) {
                                s_P = Math['\u0072\x6f\x75\x6e\u0064'](this['\u0063\x68\x61\u0072\u0074']['\u0077\x69\u0064\u0074\x68'] / v_P - 0.499);
                                if (s_P != u58['\x6d\u0061\u0078\u0054\x69\x63\x6b\u0073']) {
                                    this['\u0073\x65\x74\x43\x61\x6e\u0064\x6c\x65\x57\u0069\u0064\x74\x68'](v_P, u58);
                                    B6n = -1124435909;
                                    P5$ = -1792873195;
                                    y6x['\u0045\x5f\x58'](43);
                                    m$d = y6x['\x7a\x37\u0041'](0, '\u0032');
                                    for (var y0m = 1; y6x['\x50\x32\u0044'](y0m['\x74\x6f\x53\x74\u0072\x69\x6e\u0067'](), y0m['\x74\x6f\x53\x74\u0072\u0069\u006e\u0067']()['\x6c\u0065\x6e\u0067\u0074\u0068'], '\x38\x30\x36\x38\x34' - 0) !== B6n; y0m++) {
                                        u58['\x73\x63\x72\x6f\x6c\u006c'] += Math['\u0072\u006f\x75\x6e\x64']((s_P - u58['\u006d\u0061\x78\u0054\x69\u0063\x6b\x73']) / 2);
                                        m$d +=  + '\u0032';
                                    }
                                    if (y6x['\u0061\x35\u0056'](m$d['\x74\x6f\x53\u0074\u0072\x69\x6e\u0067'](), m$d['\x74\u006f\u0053\u0074\x72\u0069\u006e\u0067']()['\u006c\u0065\u006e\u0067\u0074\u0068'], 22710) !== P5$) {
                                        u58['\u0073\x63\u0072\x6f\x6c\x6c'] /= Math['\u0072\u006f\x75\u006e\x64'](s_P * u58['\x6d\u0061\x78\x54\u0069\u0063\x6b\x73'] *  + '\x33');
                                    }
                                }
                            } else {
                                s_P = Math['\x72\u006f\x75\u006e\x64'](this['\u0063\x68\x61\x72\u0074']['\u0077\x69\u0064\x74\u0068'] / v_P - 0.499);
                                if (s_P != Math['\u0072\x6f\u0075\u006e\x64'](this['\u0063\x68\x61\x72\u0074']['\x77\u0069\u0064\x74\u0068'] / this['\u006c\x61\x79\u006f\u0075\x74']['\x63\u0061\x6e\u0064\x6c\u0065\x57\x69\u0064\x74\x68'] - 0.499)) {
                                    this['\x73\u0065\u0074\u0043\x61\x6e\x64\u006c\x65\x57\x69\u0064\u0074\u0068'](v_P, u58);
                                    U3J = Math['\x72\u006f\x75\x6e\u0064'](this['\u0070\x72\u0065\x66\x65\x72\u0065\x6e\x63\x65\u0073']['\x77\x68\u0069\u0074\x65\u0073\x70\u0061\x63\x65'] / this['\u006c\x61\x79\x6f\x75\x74']['\u0063\x61\u006e\u0064\u006c\u0065\u0057\x69\u0064\u0074\u0068']);
                                    u58['\x73\u0063\u0072\u006f\u006c\x6c'] = u58['\x6d\x61\x78\x54\u0069\u0063\x6b\x73'] - U3J;
                                }
                            }
                            this['\x6c\x61\x79\u006f\x75\x74']['\u0073\x70\x61\x6e'] = null;
                            W5z = this['\u0077\x68\u0069\x63\x68\u0059\u0041\x78\x69\x73'](this['\x67\x72\u0061\x62\x62\u0069\x6e\u0067\u0050\x61\x6e\x65\u006c'], this['\x63\u0078']);
                            if (this['\u006f\x76\x65\u0072\u0059\x41\x78\u0069\u0073']) {
                                W5z['\x7a\x6f\x6f\u006d'] = Math['\u0072\u006f\x75\u006e\x64'](this['\u0067\u0072\x61\u0062\x53\x74\u0061\u0072\u0074\x5a\x6f\u006f\u006d'] + T9k);
                                if (this['\u0067\u0072\x61\x62\x53\u0074\u0061\x72\x74\x5a\x6f\x6f\x6d'] < W5z['\x68\u0065\u0069\x67\u0068\u0074']) {
                                    if (W5z['\x7a\u006f\u006f\x6d'] >= W5z['\x68\x65\u0069\u0067\u0068\x74']) {
                                        y6x['\u0045\u005f\u0058'](69);
                                        var I_A = y6x['\u0076\u0035\u0030'](11, 3, 3, 4, 4);
                                        W5z['\x7a\u006f\x6f\x6d'] = W5z['\u0068\x65\x69\x67\u0068\x74'] - I_A;
                                    }
                                } else {
                                    if (W5z['\x7a\x6f\u006f\x6d'] <= W5z['\x68\u0065\u0069\u0067\u0068\u0074']) {
                                        y6x['\x45\u005f\x58'](70);
                                        var E2B = y6x['\u0076\u0035\u0030'](6, 13, 6);
                                        W5z['\x7a\x6f\x6f\u006d'] = W5z['\u0068\x65\x69\x67\x68\x74'] + E2B;
                                    }
                                }
                            }
                        } else {
                            if (this['\x61\u006c\u006c\x6f\x77\u0053\u0063\u0072\x6f\x6c\u006c']) {
                                if (Math['\x61\x62\u0073'](T9k) < this['\x79\x54\x6f\u006c\u0065\x72\u0061\u006e\x63\u0065']) {
                                    if (!this['\u0079\x54\u006f\u006c\x65\x72\u0061\x6e\x63\u0065\x42\x72\u006f\x6b\x65\x6e']) {
                                        T9k =  + '\u0030';
                                        if (o9q === 0) {
                                            return;
                                        }
                                    }
                                } else {
                                    this['\u0079\x54\x6f\x6c\u0065\x72\x61\u006e\u0063\u0065\x42\x72\u006f\u006b\x65\x6e'] = !"";
                                }
                                this['\x67\u0072\u0061\u0062\x4d\x6f\x64\x65'] = '\x70\u0061\u006e';
                                d_b = Math['\x72\u006f\u0075\x6e\x64'](o9q / this['\u006c\x61\x79\u006f\u0075\u0074']['\u0063\u0061\u006e\x64\u006c\u0065\x57\u0069\x64\x74\u0068']);
                                this['\u006d\u0069\x63\u0072\u006f\x73\x63\u0072\x6f\x6c\x6c'] = d_b - o9q / this['\x6c\u0061\u0079\x6f\u0075\u0074']['\x63\u0061\x6e\u0064\x6c\u0065\x57\u0069\x64\x74\x68'];
                                y6x['\u0072\u0039\x65'](71);
                                var C0u = y6x['\u0076\u0035\u0030'](7, 4, 7, 4);
                                this['\x6d\x69\u0063\u0072\u006f\u0070\u0069\u0078\u0065\x6c\x73'] = this['\x6c\u0061\u0079\u006f\u0075\u0074']['\x63\x61\u006e\x64\u006c\u0065\x57\u0069\x64\x74\u0068'] * this['\u006d\u0069\u0063\u0072\u006f\u0073\x63\u0072\u006f\u006c\x6c'] * C0u;
                                if (this['\u0073\u0068\x69\x66\x74']) {
                                    d_b *= 5;
                                }
                                u58['\u0073\x63\x72\x6f\u006c\u006c'] = this['\u0067\u0072\x61\u0062\u0053\u0074\u0061\x72\u0074\u0053\x63\x72\u006f\u006c\x6c\u0058'] + d_b;
                                if (u58['\u0073\x63\x72\u006f\u006c\u006c'] < 1) {
                                    u58['\u0073\x63\x72\x6f\x6c\x6c'] = 1;
                                }
                                if (u58['\u0073\u0063\u0072\x6f\x6c\x6c'] >= u58['\u006d\x61\x78\x54\u0069\u0063\u006b\x73']) {
                                    this['\u0070\u0072\u0065\x66\u0065\x72\x65\u006e\x63\u0065\u0073']['\x77\u0068\u0069\u0074\u0065\u0073\u0070\u0061\u0063\x65'] = this['\x69\u006e\u0069\u0074\u0069\u0061\u006c\x57\x68\u0069\u0074\u0065\u0073\u0070\u0061\u0063\x65'];
                                } else {
                                    this['\x70\u0072\x65\x66\u0065\u0072\u0065\x6e\x63\u0065\x73']['\x77\u0068\x69\x74\u0065\u0073\x70\x61\u0063\x65'] = (u58['\u006d\x61\x78\u0054\u0069\u0063\x6b\x73'] - u58['\x73\x63\x72\u006f\u006c\u006c']) * this['\x6c\u0061\x79\x6f\u0075\u0074']['\u0063\x61\u006e\u0064\u006c\x65\u0057\x69\u0064\u0074\u0068'];
                                }
                                if (this['\u0063\u0075\u0072\x72\u0065\u006e\x74\u0050\u0061\u006e\u0065\u006c']['\x6e\x61\u006d\x65'] == u58['\x6e\u0061\x6d\u0065']) {
                                    this['\x63\x68\u0061\x72\u0074']['\u0070\x61\u006e\u0065\u006c']['\x79\u0041\u0078\u0069\x73']['\u0073\x63\x72\x6f\x6c\u006c'] = this['\u0067\u0072\u0061\u0062\u0053\x74\u0061\u0072\u0074\u0053\x63\u0072\x6f\u006c\x6c\u0059'] + T9k;
                                }
                            }
                            D_U =  -  + '\u0031\u0036\x33\u0031\x39\x34\u0038\u0033\u0035\u0038';
                            M8i = 873730259;
                            y6x['\x72\u0039\u0065'](29);
                            B64 = y6x['\x7a\x37\u0041'](0, '\u0032');
                            for (var g1m = 1; y6x['\x50\x32\x44'](g1m['\u0074\u006f\u0053\x74\x72\x69\u006e\x67'](), g1m['\x74\x6f\x53\x74\u0072\u0069\u006e\u0067']()['\u006c\x65\u006e\x67\x74\u0068'], '\x39\x35\u0034\u0037\x38' | 16) !== D_U; g1m++) {
                                this['\x64\u0069\u0073\u0070\x61\x74\u0063\x68']('\u006d\x6f\x76\x65', {
                                    stx: this,
                                    panel: this['\x63\u0075\x72\u0072\x65\x6e\x74\x50\u0061\u006e\u0065\u006c'],
                                    x: this['\u0063\u0078'],
                                    y: this['\x63\u0079'],
                                    grab: this['\x67\u0072\u0061\u0062\x62\u0069\u006e\x67\u0053\u0063\x72\x65\x65\u006e']
                                });
                                B64 += 2;
                            }
                            if (y6x['\x50\u0032\x44'](B64['\u0074\x6f\u0053\x74\u0072\x69\u006e\u0067'](), B64['\x74\u006f\x53\x74\u0072\x69\x6e\u0067']()['\u006c\x65\x6e\u0067\u0074\x68'],  + '\x38\u0039\u0032\u0039\u0037') !== M8i) {
                                this['\u0064\u0069\u0073\u0070\u0061\u0074\x63\u0068']("", {
                                    stx: this,
                                    panel: this['\u0063\x75\u0072\x72\u0065\u006e\x74\x50\u0061\u006e\u0065\u006c'],
                                    x: this['\x63\u0078'],
                                    y: this['\u0063\u0079'],
                                    grab: this['\u0067\u0072\x61\u0062\u0062\x69\x6e\x67\u0053\u0063\x72\u0065\x65\x6e']
                                });
                            }
                        }
                        G9j = function (H7m) {
                            var e7N = -928264147,
                            h8R = 1277990518,
                            h1b = -1611636342;
                            if (!(y6x.H$V(0, false, 989777) !== e7N && y6x.w4N(0, false, 519422) !== h8R && y6x.H$V(16, true, 752242) !== h1b)) {
                                return function () {
                                    var E5M = 1413337677,
                                    Q96 = -493807103,
                                    W10 = -781745279;
                                    if (y6x.w4N(0, false, 213933) === E5M || y6x.H$V(0, false, 729433) === Q96 || y6x.H$V(16, true, 870315) === W10) {
                                        H7m['\u0064\u0072\x61\x77']();
                                    }
                                };
                            }
                        };
                        if (A['\x75\x73\u0065\u0041\x6e\u0069\u006d\u0061\x74\x69\x6f\u006e']) {
                            window['\x72\u0065\x71\x75\x65\x73\u0074\x41\x6e\x69\u006d\u0061\x74\x69\x6f\x6e\u0046\x72\u0061\x6d\u0065'](G9j(this)); ;
                        } else {
                            this['\u0064\u0072\u0061\u0077']();
                        }
                        if (this['\x61\x63\u0074\x69\x76\u0065\x44\x72\x61\x77\u0069\x6e\x67']) {
                            D['\x63\u006c\x65\x61\u0072\x43\x61\u006e\u0076\x61\u0073'](this['\u0063\x68\u0061\x72\x74']['\x74\u0065\x6d\x70\x43\u0061\x6e\x76\u0061\x73'], this);
                            this['\u0061\x63\x74\u0069\x76\x65\x44\u0072\x61\u0077\x69\u006e\u0067']['\x72\u0065\u006e\u0064\x65\x72'](this['\u0063\x68\u0061\x72\x74']['\x74\u0065\u006d\u0070\x43\u0061\x6e\u0076\x61\x73']['\u0063\x6f\u006e\x74\u0065\x78\x74']);
                            this['\x61\x63\u0074\u0069\x76\x65\x44\x72\x61\u0077\u0069\u006e\u0067']['\x6d\u0065\x61\u0073\x75\x72\u0065']();
                        }
                        this['\x75\x6e\u0064\x69\u0073\x70\u006c\u0061\x79\u0043\u0072\u006f\u0073\u0073\u0068\u0061\x69\x72\x73']();
                        return;
                    } else {
                        this['\u0067\u0072\u0061\u0062\x4d\u006f\x64\x65'] = "";
                    }
                    this['\u0067\u0072\u0061\u0062\x62\u0069\x6e\x67\u0050\x61\u006e\x65\u006c'] = this['\u0063\u0075\u0072\x72\u0065\u006e\x74\x50\x61\x6e\u0065\u006c'];
                    if (this['\u006f\u0076\u0065\x72\u0058\u0041\u0078\u0069\x73'] || this['\x6f\x76\x65\x72\x59\x41\x78\x69\x73']) {
                        return;
                    }
                    this['\u0063\x6f\u006e\u0074\u0072\x6f\x6c\u0073']['\u0063\x72\x6f\x73\x73\u0058']['\u0073\x74\x79\x6c\u0065']['\x6c\x65\u0066\u0074'] = this['\x70\x69\u0078\u0065\x6c\u0046\x72\x6f\x6d\u0054\x69\x63\x6b'](this['\x63\x72\u006f\x73\u0073\u0068\u0061\u0069\u0072\u0054\x69\u0063\x6b'], u58) - 0.5 + z$v;
                    this['\x63\u006f\x6e\x74\u0072\u006f\x6c\x73']['\x63\x72\x6f\x73\x73\u0059']['\u0073\u0074\u0079\x6c\x65']['\u0074\u006f\u0070'] = this['\x63\x72\x6f\x73\u0073\x59\x41\x63\x74\x75\u0061\x6c\u0050\u006f\u0073'] + '\x70\x78';
                    this['\x73\x65\x74\u0043\x72\x6f\x73\x73\u0068\u0061\x69\u0072\x43\x6f\x6c\x6f\u0072\u0073']();
                    if (A['\x69\x6e\u0073\u0069\u0064\x65\x43\u0068\u0061\u0072\u0074'] && !A['\x72\u0065\u0073\x69\x7a\u0069\x6e\x67\u0050\x61\u006e\u0065\u006c']) {
                        if (!D['\u0044\u0072\x61\x77\x69\u006e\u0067'][this['\x63\u0075\u0072\x72\x65\u006e\x74\u0056\x65\x63\u0074\u006f\u0072\x50\u0061\x72\x61\x6d\x65\x74\u0065\u0072\u0073']['\u0076\x65\x63\u0074\x6f\x72\x54\x79\u0070\x65']] || !new D['\x44\x72\x61\u0077\u0069\x6e\u0067'][this['\u0063\x75\x72\u0072\u0065\u006e\u0074\u0056\x65\u0063\x74\u006f\x72\x50\u0061\x72\u0061\u006d\x65\u0074\x65\u0072\u0073']['\x76\u0065\x63\u0074\u006f\x72\u0054\u0079\x70\x65']]()['\x64\u0072\x61\x67\x54\x6f\x44\u0072\u0061\x77']) {
                            this['\x64\u006f\x44\x69\x73\u0070\x6c\u0061\u0079\x43\u0072\x6f\u0073\u0073\x68\x61\u0069\u0072\u0073']();
                        }
                        if (this['\x61\x63\u0063\x65\x73\x73\u006f\u0072\u0079\x54\x69\x6d\u0065\x72'] !== null) {
                            clearTimeout(this['\u0061\u0063\x63\u0065\x73\x73\x6f\x72\x79\x54\u0069\x6d\x65\x72']);
                        }
                        if (A['\x64\u0072\x61\x77\x69\u006e\x67\u004c\u0069\x6e\x65'] || !D['\x74\u006f\x75\u0063\u0068\x44\x65\x76\u0069\x63\u0065']) {
                            this['\x75\x70\u0064\x61\u0074\u0065\x43\x68\u0061\x72\u0074\x41\x63\x63\x65\x73\u0073\u006f\x72\x69\x65\u0073']();
                        } else {
                            if (new Date()['\x67\u0065\u0074\x54\x69\u006d\x65']() - this['\u006c\x61\u0073\x74\u0041\u0063\x63\x65\u0073\u0073\u006f\x72\u0079\u0055\x70\x64\x61\x74\u0065'] > 100) {
                                this['\x75\x70\u0064\x61\x74\x65\u0043\u0068\x61\u0072\u0074\u0041\u0063\x63\x65\u0073\x73\x6f\u0072\x69\x65\u0073']();
                            }
                            this['\u0061\u0063\u0063\u0065\u0073\x73\u006f\u0072\u0079\u0054\u0069\u006d\u0065\x72'] = setTimeout((function (U4h) {
                                        var k3M = -427803753,
                                        F3y = -2123194144,
                                        b3K = 621668453;
                                        if (!(y6x.w4N(0, false, 846409) !== k3M && y6x.w4N(0, false, 563783) !== F3y && y6x.H$V(16, true, 724573) !== b3K)) {
                                            return function () {
                                                y6x.r72();
                                                var l8W = 771321087,
                                                q4J = -1382339988,
                                                b4x = 668075504;
                                                if (y6x.H$V(0, false, 716285) === l8W || y6x.H$V(0, false, 655706) === q4J || y6x.w4N(16, true, 104701) === b4x) {
                                                    U4h['\x75\x70\u0064\u0061\x74\x65\x43\x68\u0061\u0072\x74\x41\x63\u0063\u0065\x73\u0073\u006f\x72\x69\u0065\u0073']();
                                                }
                                            };
                                        }
                                    })(this), 10);
                        }
                    } else {
                        this['\u0075\x6e\x64\x69\u0073\u0070\x6c\u0061\u0079\u0043\u0072\x6f\u0073\u0073\x68\u0061\u0069\x72\u0073']();
                    }
                    if (this['\u0072\u0065\x70\x6f\x73\u0069\x74\x69\x6f\x6e\u0069\u006e\u0067\x44\u0072\u0061\x77\x69\u006e\u0067']) {
                        X29 = this['\u0070\x61\x6e\x65\x6c\u0073'][this['\u0072\u0065\x70\u006f\x73\u0069\u0074\x69\u006f\u006e\x69\x6e\x67\u0044\u0072\x61\x77\x69\x6e\u0067']['\x70\u0061\x6e\x65\u006c\x4e\u0061\u006d\x65']];
                        Y7v = this['\x61\x64\u006a\x75\x73\u0074\x49\x66\x4e\x65\x63\x65\x73\u0073\x61\x72\x79'](X29, this['\u0063\x72\x6f\x73\u0073\u0068\x61\x69\x72\u0054\u0069\x63\u006b'], this['\u0076\u0061\u006c\x75\x65\u0046\u0072\x6f\x6d\u0050\u0069\u0078\x65\x6c\x55\u006e\u0074\u0072\u0061\x6e\u0073\x66\x6f\x72\x6d'](this['\u0062\x61\u0063\u006b\x4f\u0075\x74\u0059'](A['\u0063\x72\x6f\x73\u0073\x68\u0061\x69\x72\u0059']), X29));
                        if (this['\x70\x72\u0065\u0066\x65\u0072\x65\u006e\x63\u0065\x73']['\x6d\u0061\x67\u006e\u0065\x74'] && this['\u006d\u0061\x67\u006e\x65\x74\x69\u007a\x65\x64\x50\u0072\x69\x63\u0065'] && X29['\u006e\u0061\u006d\x65'] == X29['\x63\x68\u0061\u0072\x74']['\x6e\x61\u006d\u0065']) {
                            Y7v = this['\u0061\x64\u006a\u0075\u0073\u0074\x49\x66\u004e\u0065\x63\u0065\u0073\x73\u0061\u0072\x79'](X29, this['\u0063\x72\u006f\u0073\u0073\u0068\u0061\x69\u0072\x54\x69\x63\x6b'], this['\u006d\x61\x67\u006e\x65\u0074\u0069\x7a\u0065\x64\u0050\u0072\u0069\x63\x65']);
                        }
                        D['\u0063\u006c\u0065\u0061\u0072\x43\u0061\x6e\u0076\x61\u0073'](this['\u0063\u0068\x61\x72\u0074']['\u0074\u0065\u006d\x70\u0043\u0061\x6e\u0076\u0061\u0073'], this);
                        this['\u0072\u0065\u0070\x6f\x73\x69\u0074\u0069\x6f\u006e\x69\u006e\u0067\x44\x72\u0061\x77\x69\u006e\x67']['\x72\u0065\x70\x6f\x73\u0069\x74\u0069\u006f\x6e'](this['\u0063\u0068\x61\x72\u0074']['\x74\u0065\x6d\x70\u0043\x61\x6e\u0076\x61\u0073']['\x63\x6f\x6e\x74\u0065\x78\u0074'], this['\x72\x65\x70\x6f\x73\x69\u0074\x69\x6f\x6e\x69\x6e\u0067\x44\u0072\x61\x77\x69\x6e\x67']['\x72\x65\u0070\u006f\u0073\x69\u0074\x69\x6f\u006e\u0065\u0072'], this['\x63\u0072\u006f\u0073\x73\x68\u0061\x69\u0072\u0054\x69\u0063\u006b'], Y7v);
                        if (this['\u0072\x65\x70\u006f\u0073\u0069\u0074\u0069\u006f\u006e\u0069\x6e\u0067\x44\u0072\u0061\u0077\x69\u006e\x67']['\x6d\x65\u0061\u0073\x75\x72\u0065']) {
                            this['\u0072\u0065\x70\u006f\x73\x69\u0074\x69\u006f\u006e\x69\u006e\u0067\x44\u0072\u0061\u0077\u0069\x6e\x67']['\x6d\x65\u0061\x73\u0075\u0072\u0065']();
                        }
                    } else if (A['\x64\u0072\x61\u0077\u0069\u006e\x67\x4c\x69\x6e\x65']) {
                        if (this['\u0061\u0063\x74\x69\x76\x65\u0044\u0072\x61\x77\x69\u006e\u0067']) {
                            X29 = this['\u0070\x61\u006e\x65\x6c\u0073'][this['\x61\x63\x74\x69\u0076\x65\u0044\x72\u0061\x77\x69\x6e\x67']['\x70\x61\x6e\x65\u006c\x4e\u0061\x6d\u0065']];
                            Y7v = this['\u0061\u0064\x6a\u0075\u0073\u0074\x49\u0066\u004e\u0065\u0063\u0065\x73\u0073\u0061\x72\u0079'](X29, this['\u0063\u0072\x6f\x73\u0073\u0068\x61\x69\u0072\u0054\u0069\u0063\x6b'], this['\u0076\x61\u006c\x75\x65\x46\x72\x6f\x6d\u0050\x69\x78\u0065\u006c\x55\x6e\x74\u0072\u0061\x6e\u0073\u0066\u006f\u0072\u006d'](this['\u0062\u0061\u0063\u006b\u004f\x75\u0074\u0059'](A['\u0063\u0072\x6f\x73\u0073\x68\x61\x69\u0072\u0059']), X29));
                            if (this['\x70\x72\x65\u0066\u0065\u0072\u0065\x6e\u0063\x65\u0073']['\u006d\x61\x67\x6e\u0065\u0074'] && this['\x6d\x61\u0067\x6e\u0065\u0074\u0069\u007a\x65\u0064\u0050\u0072\x69\u0063\u0065'] && X29['\u006e\x61\u006d\x65'] == X29['\u0063\x68\u0061\x72\u0074']['\u006e\x61\u006d\x65']) {
                                Y7v = this['\x61\u0064\u006a\u0075\x73\u0074\u0049\u0066\x4e\u0065\x63\x65\x73\x73\u0061\x72\x79'](X29, this['\u0063\x72\u006f\x73\x73\u0068\x61\u0069\u0072\u0054\u0069\x63\x6b'], this['\x6d\x61\x67\x6e\x65\u0074\u0069\u007a\x65\u0064\u0050\u0072\u0069\x63\x65']);
                            }
                            D['\u0063\u006c\x65\u0061\x72\x43\u0061\u006e\u0076\x61\u0073'](this['\u0063\x68\x61\u0072\u0074']['\x74\u0065\u006d\u0070\x43\u0061\u006e\x76\u0061\x73'], this);
                            this['\x61\u0063\u0074\x69\x76\u0065\x44\u0072\x61\x77\u0069\x6e\x67']['\x6d\u006f\u0076\x65'](this['\x63\x68\u0061\u0072\x74']['\u0074\u0065\x6d\x70\x43\u0061\x6e\u0076\x61\u0073']['\u0063\x6f\u006e\u0074\u0065\x78\u0074'], this['\x63\x72\x6f\x73\x73\u0068\u0061\x69\x72\x54\u0069\x63\x6b'], Y7v);
                            if (this['\u0061\u0063\x74\u0069\x76\u0065\u0044\x72\x61\x77\x69\x6e\x67']['\u006d\x65\x61\u0073\x75\x72\u0065']) {
                                this['\u0061\u0063\u0074\x69\x76\x65\u0044\u0072\u0061\u0077\u0069\u006e\x67']['\x6d\x65\x61\x73\u0075\x72\u0065']();
                            }
                        }
                    } else if (A['\x72\u0065\u0073\x69\u007a\x69\u006e\u0067\u0050\x61\x6e\u0065\x6c']) {
                        this['\u0072\u0065\u0073\x69\u007a\u0065\x50\x61\u006e\u0065\x6c\x73']();
                        this['\x64\u0072\u0061\x77\x54\x65\u006d\u0070\x6f\u0072\u0061\u0072\u0079\u0050\u0061\u006e\u0065\u006c']();
                    } else if (A['\u0069\x6e\u0073\u0069\u0064\x65\x43\u0068\u0061\x72\u0074']) {
                        this['\u0066\u0069\u006e\u0064\u0048\x69\x67\x68\u006c\u0069\x67\x68\x74\x73']();
                    }
                    if (A['\x69\x6e\u0073\x69\x64\x65\u0043\x68\u0061\u0072\u0074']) {
                        i$Y = '\u006d\u006f';
                        i$Y += '\u0076\x65';
                        this['\u0064\x69\x73\x70\u0061\u0074\x63\x68'](i$Y, {
                            stx: this,
                            panel: this['\x63\u0075\u0072\x72\u0065\x6e\x74\x50\u0061\x6e\x65\u006c'],
                            x: this['\x63\u0078'],
                            y: this['\u0063\x79'],
                            grab: this['\u0067\x72\x61\x62\u0062\u0069\u006e\u0067\x53\x63\x72\u0065\u0065\x6e']
                        });
                        this['\u0066\x69\u006e\u0064\x48\x69\u0067\x68\u006c\u0069\x67\u0068\u0074\x73']();
                    }
                    if (this['\x70\u0072\x65\x66\x65\x72\x65\x6e\u0063\x65\x73']['\x6d\x61\x67\u006e\x65\u0074'] && this['\x63\x75\x72\u0072\x65\u006e\u0074\x56\x65\x63\x74\u006f\x72\x50\x61\x72\x61\x6d\u0065\x74\u0065\u0072\x73']['\u0076\x65\x63\x74\u006f\u0072\x54\x79\u0070\u0065']) {
                        if (!A['\x64\u0072\x61\u0077\x69\x6e\x67\x4c\x69\u006e\x65'] && !this['\x61\u006e\x79\u0048\x69\u0067\u0068\x6c\u0069\x67\x68\u0074\u0065\x64']) {
                            D['\x63\u006c\u0065\u0061\x72\x43\x61\x6e\u0076\u0061\u0073'](this['\u0063\x68\u0061\u0072\x74']['\u0074\x65\x6d\u0070\x43\x61\x6e\x76\u0061\u0073']);
                        }
                        // MaRa: CIQ Hack - Part 2 - Sensitivity, required to prevent re-highlight during repositioning
                        // --- Start ---
                        if (!this.repositioningDrawing()) {
                            this['\x6d\u0061\x67\x6e\x65\u0074\x69\u007a\u0065']();
                        }
                        // --- End ---
                        // --- Start Deletion ---
                        // this['\x6d\u0061\x67\x6e\x65\u0074\x69\u007a\u0065']();
                        // --- End Deletion ---
                    }
                    this['\u0072\u0075\u006e\x41\x70\x70\u0065\u006e\u0064']('\u006d\u006f\u0075\u0073\x65\u006d\x6f\x76\x65\u0069\x6e\u006e\u0065\x72', arguments);
                }
            };
            A.prototype.findHighlights = function (y1w, Z83) {
                var T9z,
                q9j,
                V_o,
                X7J,
                k1S,
                Q5g,
                d34,
                m46,
                z3o,
                e2r,
                X1p,
                K0_,
                R1F,
                Z2j,
                p_r,
                n6i,
                g0d,
                e8f,
                w7a,
                P4b,
                p3l,
                Z_H,
                u9d,
                I0h;
                T9z = "d";
                T9z += "r";
                T9z += "awing";
                q9j = 10;
                if (y1w) {
                    q9j = 30;
                }
                V_o = this.cy;
                X7J = this.cx;
                if (!this.currentPanel) {
                    return;
                }
                if (this.activeDrawing) {
                    return;
                }
                k1S = this.currentPanel.chart;
                this.anyHighlighted = !({});
                if (this.preferences.magnet && !this.activeDrawing) {
                    D.clearCanvas(this.chart.tempCanvas, this);
                }
                Q5g = ![];
                d34 = null;
                m46 = ["", "", !!({}), null, T9z];
                z3o = {
                    // MaRa: CIQ Hack - Part 2 - Sensitivity
                    // --- Start ---
                    x0: this.floatTickFromPixel(X7J - q9j, k1S),
                    x1: this.floatTickFromPixel(X7J + q9j, k1S),
                    // --- Start Deletion ---
                    // x0: this.tickFromPixel(X7J - q9j, k1S),
                    // x1: this.tickFromPixel(X7J + q9j, k1S),
                    // --- End Deletion ---
                    y0: this.valueFromPixelUntransform(V_o - q9j, this.currentPanel),
                    y1: this.valueFromPixelUntransform(V_o + q9j, this.currentPanel)
                };
                for (var p1P =  + "0"; p1P < this.drawingObjects.length; p1P++) {
                    e2r = this.drawingObjects[p1P];
                    if (e2r.permanent)
                        continue;
                    X1p = e2r.highlighted;
                    K0_ = e2r.panelName == this.currentPanel.name;
                    e2r.repositioner = e2r.intersected(this.crosshairTick, this.crosshairValue, z3o);
                    K0_ = K0_ && e2r.repositioner;
                    if (!Z83 && K0_) {
                        if (X1p) {
                            d34 = e2r;
                        } else if (X1p != e2r.highlight(!0)) {
                            if (!d34) {
                                d34 = e2r;
                            }
                            Q5g = !!1;
                        }
                        this.anyHighlighted = !!"1";
                    } else {
                        if (X1p != e2r.highlight(!({}))) {
                            Q5g = !!1;
                        }
                    }
                }
                R1F = ![];
                for (Z2j in this.overlays) {
                    p_r = this.overlays[Z2j];
                    p_r.prev = p_r.highlight;
                    p_r.highlight = ![];
                }
                for (Z2j in k1S.seriesRenderers) {
                    g0d = k1S.seriesRenderers[Z2j];
                    for (var g0H = 0; g0H < g0d.seriesParams.length; g0H++) {
                        n6i = g0d.seriesParams[g0H];
                        n6i.prev = n6i.highlight;
                        n6i.highlight = ![];
                    }
                }
                if (!Z83) {
                    e8f = this.barFromPixel(X7J);
                    if (e8f < k1S.dataSegment.length) {
                        for (Z2j in this.overlays) {
                            p_r = this.overlays[Z2j];
                            if (p_r.panel != this.currentPanel.name)
                                continue;
                            if (p_r.libraryEntry.isHighlighted && p_r.libraryEntry.isHighlighted(this, X7J, V_o)) {
                                p_r.highlight = !"";
                                this.anyHighlighted = !!({});
                                continue;
                            }
                            P4b = k1S.dataSegment[e8f];
                            if (!P4b)
                                continue;
                            for (var q6E in this.overlays[Z2j].outputMap) {
                                p3l = P4b[q6E];
                                w7a = 0;
                                if (this.currentPanel.name == k1S.name) {
                                    w7a = this.pixelFromPriceTransform(p3l, this.currentPanel);
                                } else {
                                    w7a = this.pixelFromPrice(p3l, this.currentPanel);
                                }
                                if (V_o - q9j < w7a && V_o + q9j > w7a) {
                                    p_r.highlight = !"";
                                    this.anyHighlighted = !"";
                                    break;
                                }
                            }
                            if (p_r.highlight)
                                break; ;
                        }
                        for (Z2j in k1S.seriesRenderers) {
                            Z_H = k1S.seriesRenderers[Z2j];
                            if (!Z_H.params.highlightable)
                                continue;
                            for (var H2Q = 0; H2Q < Z_H.seriesParams.length; H2Q++) {
                                n6i = Z_H.seriesParams[H2Q];
                                w7a = Z_H.caches[n6i.field] && Z_H.caches[n6i.field][e8f];
                                if (!w7a && w7a !== 0)
                                    continue;
                                if (V_o - q9j < w7a && V_o + q9j > w7a) {
                                    n6i.highlight = !"";
                                    this.anyHighlighted = !!1;
                                } else if ((Z_H.params.subtype == "step" || n6i.type == "step") && e8f > ("0" | 0)) {
                                    u9d = Z_H.caches[n6i.field] && Z_H.caches[n6i.field][e8f - 1];
                                    if ((u9d || u9d === 0) && (V_o > w7a && V_o < u9d) || V_o < w7a && V_o > u9d) {
                                        n6i.highlight = !![];
                                        this.anyHighlighted = !"";
                                    }
                                }
                            }
                        }
                    }
                }
                for (Z2j in this.overlays) {
                    p_r = this.overlays[Z2j];
                    if (p_r.highlight) {
                        this.anyHighlighted = !!"1";
                        m46 = [p_r.inputs.display ? p_r.inputs.display : p_r.name, null, null, p_r.permanent, "study"];
                        d34 = null;
                    }
                    if (p_r.prev != p_r.highlight) {
                        Q5g = !![];
                    }
                }
                for (Z2j in k1S.seriesRenderers) {
                    I0h = k1S.seriesRenderers[Z2j];
                    if (!I0h.params.highlightable)
                        continue;
                    for (var u6E = 0; u6E < I0h.seriesParams.length; u6E++) {
                        n6i = I0h.seriesParams[u6E];
                        if (n6i.highlight) {
                            this.anyHighlighted = !!({});
                            m46 = [n6i.display, n6i.color, !({}), n6i.permanent, "series"];
                            d34 = null;
                        }
                        if (n6i.prev != n6i.highlight) {
                            Q5g = !![];
                        }
                    }
                }
                if (Q5g) {
                    this.draw();
                    this.displaySticky.apply(this, m46);
                    this.clearMeasure();
                    if (d34) {
                        d34.measure();
                    }
                }
                if (!this.anyHighlighted) {
                    this.setMeasure();
                }
            };
            A.prototype.positionSticky = function (H3p) {
                var O3D,
                C8E,
                X1I;
                O3D = "p";
                O3D += "x";
                C8E = Math.max(this.cy - H3p.offsetHeight - 60, "0" | 0);
                X1I = Math.min(this.chart.canvasWidth - (this.cx -  + "50"), this.chart.canvasWidth - H3p.offsetWidth);
                y6x.E_X(0);
                y6x.r72();
                H3p.style.top = y6x.v50(C8E, "px");
                y6x.r9e(0);
                H3p.style.right = y6x.v50(X1I, O3D);
            };
            A.prototype.displaySticky = function (O3l, q5J, Q0E, u1S, u$3) {
                var W70,
                b1T,
                p92,
                d59,
                l_p,
                v9j,
                n39,
                Y68,
                Q$d,
                K1R,
                A$N,
                p9p,
                v33;
                W70 = ".";
                W70 += "overl";
                W70 += "ayEdit";
                b1T = "#mStickyInte";
                b1T += "rior";
                p92 = this.controls.mSticky;
                if (!p92) {
                    return;
                }
                d59 = W(b1T, p92);
                if (!d59) {
                    return;
                }
                l_p = W("#overlayTrashCan", p92);
                v9j = W(W70, p92);
                n39 = W("#mouseDeleteInstructions", p92);
                if (!Q0E && !O3l) {
                    d59.innerHTML = "";
                    p92.style.display = "none";
                    if (D.touchDevice) {
                        Y68 = "no";
                        Y68 += "n";
                        Y68 += "e";
                        if (l_p) {
                            l_p.style.display = Y68;
                        }
                        if (v9j) {
                            v9j.style.display = "none";
                        }
                    } else if (!D.touchDevice) {
                        if (n39) {
                            n39.style.display = "none";
                        }
                    }
                } else {
                    if (!O3l) {
                        O3l = "";
                    }
                    if (Q0E && !O3l) {
                        d59.style.backgroundColor = "";
                        d59.style.color = "";
                        d59.style.display = "none";
                    } else if (q5J) {
                        d59.style.backgroundColor = q5J;
                        d59.style.color = D.chooseForegroundColor(q5J);
                        d59.style.display = "inline-block";
                    } else {
                        d59.style.backgroundColor = "";
                        d59.style.color = "";
                        d59.style.display = "inline-block";
                    }
                    d59.innerHTML = O3l;
                    if (u$3) {
                        W("#mStickyRightClick", p92).className = y6x.v50("rightclick_", u$3, y6x.E_X(0));
                    }
                    p92.style.display = "inline-block";
                    this.positionSticky(p92);
                    if (u1S) {
                        Q$d = "non";
                        Q$d += "e";
                        if (l_p) {
                            l_p.style.display = Q$d;
                        }
                        if (v9j) {
                            v9j.style.display = "none";
                        }
                        K1R =  + "160557013";
                        A$N = 1305787615;
                        y6x.r9e(17);
                        p9p = y6x.v50(1, "2");
                        for (var X_Q = "1" ^ 0; y6x.a5V(X_Q.toString(), X_Q.toString().length, 97931) !== K1R; X_Q++) {
                            if (n39) {
                                n39.style.display = "none";
                            }
                            p9p += 2;
                        }
                        if (y6x.P2D(p9p.toString(), p9p.toString().length, 515) !== A$N) {
                            if (n39) {
                                n39.style.display = "";
                            }
                        }
                    } else if (D.touchDevice) {
                        if (l_p) {
                            l_p.style.display = "inline-block";
                        }
                        if (v9j) {
                            v9j.style.display = "inline-block";
                        }
                        if (n39) {
                            n39.style.display = "none";
                        }
                    } else if (!D.touchDevice) {
                        v33 = "b";
                        v33 += "l";
                        v33 += "oc";
                        v33 += "k";
                        if (n39) {
                            n39.style.display = v33;
                        }
                    }
                }
            };
            A.prototype.setMeasure = function (O9J, O_g, B4R, G3Y, W2_) {
                var o4p,
                w9k,
                Y7U,
                m42,
                X4s,
                T1J,
                G1j,
                c1H;
                if (this.runPrepend("setMeasure", arguments)) {
                    return;
                }
                o4p = H("mMeasure");
                w9k = "";
                if (!O9J) {
                    if (o4p && o4p.className != "measureUnlit") {
                        o4p.className = "measureUnlit";
                    }
                    if (!this.anyHighlighted && this.currentVectorParameters.vectorType === "") {
                        this.clearMeasure();
                    }
                } else {
                    Y7U = Math.round(Math.abs(O9J - O_g) * this.chart.roundit) / this.chart.roundit;
                    if (this.internationalizer) {
                        w9k += this.internationalizer.numbers.format(Y7U);
                    } else {
                        w9k += Y7U;
                    }
                    y6x.r9e(72);
                    m42 = y6x.z7A(O9J, O_g, O9J);
                    if (Math.abs(m42) > 0.1) {
                        y6x.r9e(17);
                        m42 = Math.round(y6x.v50(100, m42));
                    } else if (Math.abs(m42) > 0.01) {
                        y6x.E_X(28);
                        var x3R = y6x.z7A(1, 4, 13);
                        m42 = Math.round(m42 * ("1000" | 0)) / x3R;
                    } else {
                        y6x.r9e(28);
                        var X5o = y6x.v50(4, 13, 10009);
                        y6x.r9e(64);
                        var u3Q = y6x.v50(1400, 92, 175);
                        m42 = Math.round(m42 * X5o) / u3Q;
                    }
                    if (this.internationalizer) {
                        y6x.E_X(23);
                        m42 = this.internationalizer.percent.format(y6x.v50(m42, 100));
                    } else {
                        y6x.r9e(0);
                        m42 = y6x.z7A(m42, ( + "915",  + "8610") >= 2200 ? "%" : (5542, 1706) == ( + "388", 723.8) ? !![] : 2810 != ("2340" | 4, 3548) ? (7.97e+3, "4.95e+3" << 64) : (!!0, 138.15));
                    }
                    y6x.E_X(38);
                    w9k += y6x.v50(( + "443.25", 3160) <= (945, 680.54) ? (!!1, "J") : ")", " (", m42);
                    y6x.r9e(4);
                    X4s = Math.abs(y6x.z7A(G3Y, B4R));
                    y6x.E_X(19);
                    var B_3 = y6x.v50(16, 9, 71, 2);
                    X4s = Math.round(X4s) + B_3;
                    T1J = this.translateIf("Bars");
                    y6x.E_X(73);
                    w9k += y6x.z7A(9623 < 7649 ?  + "499.53" !== ( + "3390", 5116) ? (!1, ![]) : (0x18c5, 0x1f5a) : " ", T1J, X4s, " ");
                    if (o4p) {
                        if (o4p.className != "measureLit") {
                            o4p.className = "measureLit";
                        }
                        o4p.innerHTML = w9k;
                    }
                }
                if (this.activeDrawing) {
                    return;
                }
                o4p = this.controls.mSticky;
                if (o4p) {
                    if (W2_) {
                        G1j = "i";
                        G1j += "nl";
                        G1j += "ine-block";
                        o4p.style.display = "inline-block";
                        o4p.children[0].style.display = G1j;
                        if (O9J) {
                            o4p.children[0].innerHTML = w9k; ;
                        }
                        this.positionSticky(o4p);
                    } else {
                        c1H = "no";
                        c1H += "n";
                        c1H += "e";
                        o4p.style.display = c1H;
                        o4p.children[ + "0"].innerHTML = "";
                    }
                }
                this.runAppend("setMeasure", arguments);
            };
            A.prototype.clearMeasure = function () {
                var t5S,
                H76;
                t5S = "mMeasu";
                t5S += "re";
                H76 = H(t5S);
                y6x.r72();
                if (H76) {
                    if (H76.className != "measureUnlit") {
                        H76.className = "measureUnlit";
                    }
                    H76.innerHTML = "";
                }
            };
            A.prototype.drawTemporaryPanel = function () {
                var a_2,
                d6x,
                T_4;
                a_2 = "p";
                a_2 += "x";
                y6x.r9e(4);
                var z3e = y6x.z7A(5, 2);
                y6x.E_X(10);
                var j50 = y6x.v50(6, 2, 0, 6);
                d6x = Math.round(A.resizingPanel.right - z3e) + "0.5" * j50;
                D.clearCanvas(this.chart.tempCanvas, this);
                T_4 = A.crosshairY - this.top;
                this.plotLine(A.resizingPanel.left, d6x, T_4, T_4, this.canvasStyle("stx_panel_drag"), "segment", this.chart.tempCanvas.context, !"1", {});
                y6x.r72();
                A.resizingPanel.handle.style.top = T_4 - A.resizingPanel.handle.offsetHeight / ("2" - 0) + a_2;
            };
            A.prototype.setTrashCan = function () {
                var H14,
                o6e,
                k88,
                O3K;
                if (D.touchDevice) {
                    H14 = this.controls.mSticky;
                    if (H14) {
                        o6e = "p";
                        o6e += "x";
                        k88 = "n";
                        k88 += "o";
                        k88 += "ne";
                        O3K = "i";
                        O3K += "nline-b";
                        O3K += "lock";
                        H14.style.display = "inline-block";
                        H14.children["0" << 0].style.display = "none";
                        H14.children[1].style.display = O3K;
                        if (H14.children[2]) {
                            H14.children[2].style.display = k88;
                        }
                        H14.style.top = this.backOutY(A.crosshairY) -  + "60" + "px";
                        H14.style.right = this.chart.canvasWidth - (this.backOutX(A.crosshairX) - ("50" - 0)) + o6e;
                    }
                }
            };
            A.prototype.pixelFromBar = function (W4P, o$X) {
                var G9K;
                if (!o$X) {
                    o$X = this.chart;
                }
                y6x.r72();
                G9K = 0;
                if (this.chart.dataSegment && this.chart.dataSegment[W4P] && this.chart.dataSegment[W4P].leftOffset) {
                    G9K = this.chart.dataSegment[W4P].leftOffset;
                } else {
                    G9K = (W4P +  + "0.5") * this.layout.candleWidth;
                }
                y6x.r9e(40);
                var C3U = y6x.z7A(14, 15);
                G9K = o$X.panel.left + Math.floor(G9K + this.micropixels) - C3U;
                return G9K;
            };
            A.prototype.barFromPixel = function (s$h, w_4) {
                var C5F,
                W88,
                w1K,
                I5z,
                I6G,
                B6s,
                u7C,
                E3i,
                L2A;
                if (!w_4) {
                    w_4 = this.chart;
                }
                if (this.layout.chartType == "volume_candle" && this.chart.dataSegment) {
                    C5F = s$h - w_4.panel.left - this.micropixels;
                    W88 = 2;
                    w1K = Math.round(this.chart.dataSegment.length / W88);
                    y6x.E_X(44);
                    var K7V = y6x.v50(6, 5, 1);
                    y6x.E_X(74);
                    var r_r = y6x.z7A(5, 71, 2, 7);
                    I5z = this.chart.dataSegment[this.chart.dataSegment.length - K7V].leftOffset + this.chart.dataSegment[this.chart.dataSegment.length - r_r].candleWidth / ("2" - 0);
                    if (C5F > I5z) {
                        return this.chart.dataSegment.length + Math.floor((s$h - I5z - w_4.panel.left - this.micropixels) / this.layout.candleWidth);
                    } else {
                        for (var U_Z = 1; U_Z < this.chart.dataSegment.length; U_Z++) {
                            W88 *= 2;
                            if (!this.chart.dataSegment[w1K])
                                break;
                            y6x.E_X(75);
                            var M8P = y6x.v50(5, 12, 40, 6, 1);
                            I6G = this.chart.dataSegment[w1K].leftOffset - this.chart.dataSegment[w1K].candleWidth / M8P;
                            y6x.E_X(76);
                            var O71 = y6x.v50(19, 32, 1, 12, 1);
                            B6s = this.chart.dataSegment[w1K].leftOffset + this.chart.dataSegment[w1K].candleWidth / O71;
                            if (w1K === "0" >> 0 || C5F >= I6G && C5F < B6s)
                                break;
                            else if (C5F < I6G) {
                                w1K -= Math.max(1, Math.round(this.chart.dataSegment.length / W88));
                            } else {
                                w1K += Math.max(1, Math.round(this.chart.dataSegment.length / W88));
                            }
                            w1K = Math.max(0, Math.min(this.chart.dataSegment.length - 1, w1K));
                        }
                        if (!this.chart.dataSegment[w1K]) {
                            for (U_Z = 0; U_Z < this.chart.dataSegment.length; U_Z++) {
                                if (!this.chart.dataSegment[U_Z])
                                    continue;
                                if (C5F < this.chart.dataSegment[U_Z].leftOffset - this.chart.dataSegment[U_Z].candleWidth / 2) {
                                    y6x.r9e(12);
                                    return Math.max(y6x.z7A("0", 0), y6x.v50(U_Z, "1", y6x.E_X(77)));
                                } else if (C5F < this.chart.dataSegment[U_Z].leftOffset + this.chart.dataSegment[U_Z].candleWidth / ("2" - 0)) {
                                    return U_Z;
                                } else if (C5F >= this.chart.dataSegment[U_Z].leftOffset + this.chart.dataSegment[U_Z].candleWidth / 2) {
                                    y6x.r9e(0);
                                    return y6x.z7A(U_Z, 1);
                                }
                            }
                        }
                    }
                    return w1K;
                } else {
                    y6x.r9e(4);
                    u7C = y6x.z7A("379697666", 0);
                    E3i = 130413553;
                    y6x.r9e(17);
                    L2A = y6x.z7A(1, "2");
                    for (var K_U = 1; y6x.a5V(K_U.toString(), K_U.toString().length, 68199) !== u7C; K_U++) {
                        return Math.floor(s$h / w_4.panel.left % this.micropixels + this.layout.candleWidth);
                    }
                    if (y6x.P2D(L2A.toString(), L2A.toString().length, 66687) !== E3i) {
                        return Math.floor((s$h - w_4.panel.left - this.micropixels) / this.layout.candleWidth);
                    }
                }
            };
            // MaRa: CIQ Hack - Part 2 - Sensitivity
            // Sensitivity, for some reason need to shift by candlewidth / 2
            // Start
            A.prototype.floatTickFromPixel = function (k2W, J2W) {
                var T2W;
                if (!J2W) {
                    J2W = this.chart;
                }
                T2W = J2W.dataSet.length - J2W.scroll + 1;
                if (this.layout.chartType == "volume_candle") {
                    T2W += this.barFromPixel(k2W, J2W);
                } else {
                    T2W += Math.floor((k2W - J2W.panel.left - this.micropixels - this.layout.candleWidth / 2 + 2) / this.layout.candleWidth);
                }
                return T2W;
            }
            // End
            A.prototype.tickFromPixel = function (M30, y6p) {
                var h60;
                if (!y6p) {
                    y6p = this.chart;
                }
                y6x.E_X(39);
                y6x.r72();
                var M$t = y6x.z7A(19, 5, 15, 0);
                h60 = y6p.dataSet.length - y6p.scroll + M$t;
                if (this.layout.chartType == "volume_candle") {
                    h60 += this.barFromPixel(M30, y6p);
                } else {
                    h60 += Math.floor((M30 - y6p.panel.left - this.micropixels) / this.layout.candleWidth);
                }
                return h60;
            };
            A.prototype.pixelFromTick = function (M0I, j4s) {
                var O0R,
                E97,
                S16,
                o5d,
                W1$,
                S7I;
                if (!j4s) {
                    j4s = this.chart;
                }
                y6x.r9e(78);
                var Q7C = y6x.z7A(16, 1007, 7, 6, 3);
                O0R = M0I - j4s.dataSet.length + j4s.scroll - Q7C;
                if (this.chart.dataSegment && this.chart.dataSegment[O0R] && this.chart.dataSegment[O0R].leftOffset) {
                    y6x.E_X(79);
                    var K8_ = y6x.z7A(12, 6, 13, 6);
                    return j4s.panel.left + Math.floor(this.chart.dataSegment[O0R].leftOffset + this.micropixels) - K8_;
                } else {
                    E97 = 0;
                    S16 = 0;
                    if (this.chart.dataSegment && this.chart.dataSegment[this.chart.dataSegment.length - 1] && this.chart.dataSegment[this.chart.dataSegment.length - 1].leftOffset) {
                        if (this.chart.dataSegment.length < M0I - j4s.dataSet.length + j4s.scroll) {
                            y6x.r9e(0);
                            var J_O = y6x.z7A(0, 1);
                            y6x.r9e(13);
                            var D6e = y6x.z7A(16, 1, 15);
                            y6x.E_X(4);
                            var X1h = y6x.v50(15, 13);
                            E97 = this.chart.dataSegment[this.chart.dataSegment.length - J_O].leftOffset - this.chart.dataSegment[this.chart.dataSegment.length - D6e].candleWidth / X1h;
                            o5d =  -  + "1913335487";
                            W1$ = -1612504007;
                            S7I = 2;
                            for (var l6K =  + "1"; y6x.P2D(l6K.toString(), l6K.toString().length, 55301) !== o5d; l6K++) {
                                S16 = this.chart.dataSegment.length;
                                S7I +=  + "2";
                            }
                            if (y6x.P2D(S7I.toString(), S7I.toString().length, 21516) !== W1$) {
                                S16 = this.chart.dataSegment.length;
                            }
                            S16 = this.chart.dataSegment.length;
                        }
                    }
                    return E97 + j4s.panel.left + Math.floor((M0I - S16 - j4s.dataSet.length + j4s.scroll -  + "0.5") * this.layout.candleWidth + this.micropixels) -  + "1";
                }
            };
            A.prototype.pixelFromDate = function (U99, R0L) {
                return this.pixelFromTick(this.tickFromDate(U99, R0L), R0L);
            };
            A.prototype.priceFromPixel = function (t_c, X3l, O0I) {
                var L9n,
                a0C,
                a54,
                B0f;
                if (!X3l) {
                    X3l = this.chart.panel;
                }
                L9n = X3l.chart;
                a0C = O0I ? O0I : X3l.yAxis;
                t_c = a0C.bottom - t_c;
                if (!a0C.multiplier) {
                    return null;
                }
                a54 = a0C.low + t_c / a0C.multiplier;
                if (a0C.semiLog) {
                    B0f = a0C.logLow + t_c * a0C.logShadow / a0C.height;
                    a54 = Math.pow(10, B0f);
                }
                return a54;
            };
            A.prototype.valueFromPixel = function (R91, y6g, U_I) {
                var s9z;
                if (!y6g) {
                    y6g = this.whichPanel(R91);
                }
                s9z = this.priceFromPixel(R91, y6g, U_I);
                return s9z;
            };
            A.prototype.valueFromPixelUntransform = function (c6C, Y4$, L4J) {
                y6x.x24();
                var f5N;
                if (!Y4$) {
                    Y4$ = this.whichPanel(c6C);
                }
                if (!Y4$) {
                    if (c6C <= 0) {
                        Y4$ = this.panels[D.first(this.panels)];
                    } else {
                        Y4$ = this.panels[D.last(this.panels)];
                    }
                }
                f5N = this.priceFromPixel(c6C, Y4$, L4J);
                if (Y4$.chart.untransformFunc && Y4$.name == Y4$.chart.name) {
                    f5N = Y4$.chart.untransformFunc(this, Y4$.chart, f5N);
                }
                return f5N;
            };
            A.prototype.pixelFromPriceTransform = function (T8J, d4g, i7H) {
                if (d4g.chart.transformFunc) {
                    T8J = d4g.chart.transformFunc(this, d4g.chart, T8J, i7H);
                }
                y6x.r72();
                return this.pixelFromPrice(T8J, d4g, i7H);
            };
            A.prototype.pixelFromPrice = function (M4h, a2B, s$E) {
                var L6b,
                y3k,
                e0s,
                L7i,
                s20,
                P_4,
                e72,
                G2A;
                if (!a2B) {
                    a2B = this.chart.panel;
                }
                L6b = s$E ? s$E : a2B.yAxis;
                y3k = (L6b.high - M4h) * L6b.multiplier;
                if (L6b.semiLog) {
                    e0s = Math.max(M4h, 0);
                    L7i = Math.log(e0s) / Math.LN10;
                    s20 = 712684965;
                    P_4 = -549630228;
                    y6x.r9e(4);
                    e72 = y6x.z7A("2", 0);
                    for (var O3y = "1" | 0; y6x.P2D(O3y.toString(), O3y.toString().length, 79646) !== s20; O3y++) {
                        G2A = L6b.height;
                        y3k = G2A % (G2A - L7i % L6b.logLow - L6b.logShadow);
                        y6x.E_X(43);
                        e72 += y6x.z7A(0, "2");
                    }
                    if (y6x.P2D(e72.toString(), e72.toString().length, 13297) !== P_4) {
                        G2A = L6b.height;
                        y3k = G2A - G2A * (L7i - L6b.logLow) / L6b.logShadow;
                    }
                }
                y3k += L6b.top;
                return y3k;
            };
            A.prototype.pixelFromValueAdjusted = function (r$t, C9T, V4Y, a9I) {
                var l8c,
                t5Z;
                if (this.layout.adj || !this.charts[r$t.name]) {
                    return this.pixelFromPriceTransform(V4Y, r$t, a9I);
                }
                l8c = Math.round(C9T);
                y6x.x24();
                if (l8c > 0 && l8c < r$t.chart.dataSet.length && (t5Z = r$t.chart.dataSet[l8c].ratio)) {
                    y6x.r9e(17);
                    return this.pixelFromPriceTransform(y6x.v50(t5Z, V4Y), r$t, a9I);
                }
                return this.pixelFromPriceTransform(V4Y, r$t, a9I);
            };
            A.prototype.adjustIfNecessary = function (N6G, j91, L_a) {
                var c8h,
                k2q;
                y6x.x24();
                if (this.layout.adj) {
                    return L_a;
                }
                if (!N6G || !this.charts[N6G.name]) {
                    return L_a;
                }
                c8h = Math.round(j91);
                if (c8h > 0 && c8h < N6G.chart.dataSet.length && (k2q = N6G.chart.dataSet[c8h].ratio)) {
                    y6x.E_X(23);
                    return y6x.z7A(L_a, k2q);
                }
                return L_a;
            };
            A.prototype.setTransform = function (w_Z, O4a, y5p) {
                w_Z.transformFunc = O4a;
                w_Z.untransformFunc = y5p;
            };
            A.prototype.unsetTransform = function (g9E) {
                delete g9E.transformFunc;
                y6x.x24();
                delete g9E.untransformFunc;
                for (var m1F = "0" - 0; m1F < g9E.dataSet.length; m1F++) {
                    g9E.dataSet[m1F].transform = null;
                }
            };
            A.prototype.undo = function () {
                var o8D,
                f45;
                o8D = "u";
                o8D += "n";
                o8D += "do";
                if (this.runPrepend("undo", arguments)) {
                    return;
                }
                if (this.activeDrawing) {
                    f45 = "stx_crosshai";
                    f45 += "r";
                    this.activeDrawing.abort();
                    this.activeDrawing = null;
                    D.clearCanvas(this.chart.tempCanvas, this);
                    this.draw();
                    D.swapClassName(this.controls.crossX, f45, "stx_crosshair_drawing");
                    D.swapClassName(this.controls.crossY, "stx_crosshair", "stx_crosshair_drawing");
                    A.drawingLine = !!"";
                }
                this.runAppend(o8D, arguments);
            };
            A.prototype.undoStamp = function (V0N, y_u) {
                this.undoStamps.push(V0N);
                this.dispatch("undoStamp", {
                    before: V0N,
                    after: y_u
                });
            };
            A.prototype.undoLast = function () {
                if (this.activeDrawing) {
                    this.undo();
                } else {
                    if (this.undoStamps.length) {
                        this.drawingObjects = this.undoStamps.pop();
                        this.changeOccurred("vector");
                        this.draw();
                    }
                }
            };
            A.prototype.addDrawing = function (P9G) {
                var F98;
                F98 = D.shallowClone(this.drawingObjects);
                this.drawingObjects.push(P9G);
                this.undoStamp(F98, D.shallowClone(this.drawingObjects));
            };
            A.prototype.plotLine = function (p8s, w9_, d_2, X9K, N91, n2Y, a8n, I8A, Q7Y) {
                var W8_,
                Q2g,
                U6_,
                B2S,
                E8g,
                z5p,
                y2Z,
                f85,
                i_f,
                D9T,
                t5o,
                p62,
                R9S,
                g7I,
                U0V,
                O6Y,
                d7U,
                S3h,
                j55,
                L$s,
                O2x,
                b_j,
                z1M,
                U0W;
                W8_ = "o";
                W8_ += "bject";
                Q2g = "horizonta";
                Q2g += "l";
                U6_ = "no";
                U6_ += "ne";
                if (!Q7Y) {
                    Q7Y = {};
                }
                if (Q7Y.pattern == U6_) {
                    return;
                }
                if (I8A === !!1) {
                    I8A = this.chart.panel;
                }
                if (a8n === null || typeof a8n == "undefined") {
                    a8n = this.chart.context;
                }
                if (isNaN(p8s) || isNaN(w9_) || isNaN(d_2) || isNaN(X9K)) {
                    return;
                }
                B2S = 0;
                E8g = this.chart.canvasHeight;
                z5p = 0;
                y2Z = this.right;
                if (I8A) {
                    E8g = I8A.yAxis.bottom;
                    B2S = I8A.yAxis.top;
                    z5p = I8A.left;
                    y2Z = I8A.right;
                }
                if (n2Y == "ray") {
                    f85 = 10000000;
                    if (w9_ < p8s) {
                        f85 = -10000000;
                    }
                    D9T = {
                        "x0": p8s,
                        "x1": w9_,
                        "y0": d_2,
                        "y1": X9K
                    };
                    i_f = D.yIntersection(D9T, f85);
                    w9_ = f85;
                    X9K = i_f;
                }
                if (n2Y == "line" || n2Y == Q2g || n2Y == "vertical") {
                    f85 = 10000000;
                    t5o = -10000000;
                    D9T = {
                        "x0": p8s,
                        "x1": w9_,
                        "y0": d_2,
                        "y1": X9K
                    };
                    i_f = D.yIntersection(D9T, f85);
                    p62 = D.yIntersection(D9T, t5o);
                    p8s = t5o;
                    w9_ = f85;
                    d_2 = p62;
                    X9K = i_f;
                }
                y6x.r9e(12);
                R9S = y6x.v50("0.0", 32);
                g7I =  + "1.0";
                y6x.E_X(4);
                U0V = y6x.v50(w9_, p8s);
                y6x.E_X(4);
                O6Y = y6x.z7A(X9K, d_2);
                for (var i2B = 0; i2B < 4; i2B++) {
                    if (i2B === "0" - 0) {
                        d7U = -U0V;
                        y6x.E_X(4);
                        S3h = -y6x.z7A(z5p, p8s);
                    }
                    if (i2B == 1) {
                        d7U = U0V;
                        y6x.E_X(4);
                        S3h = y6x.v50(y2Z, p8s);
                    }
                    if (i2B == 2) {
                        d7U = -O6Y;
                        y6x.r9e(4);
                        S3h = -y6x.z7A(B2S, d_2);
                    }
                    if (i2B == 3) {
                        d7U = O6Y;
                        y6x.r9e(4);
                        S3h = y6x.v50(E8g, d_2);
                    }
                    y6x.r9e(23);
                    j55 = y6x.z7A(S3h, d7U);
                    if ((X9K || X9K === 0) && d7U === 0 && S3h <  + "0") {
                        return !1; ;
                    }
                    if (d7U < 0) {
                        if (j55 > g7I) {
                            return ![];
                        } else if (j55 > R9S) {
                            R9S = j55;
                        };
                    } else if (d7U > 0) {
                        if (j55 < R9S) {
                            return !!"";
                        } else if (j55 < g7I) {
                            g7I = j55;
                        };
                    }
                }
                y6x.r9e(37);
                L$s = y6x.v50(U0V, p8s, R9S);
                y6x.r9e(37);
                O2x = y6x.v50(O6Y, d_2, R9S);
                y6x.E_X(37);
                b_j = y6x.z7A(U0V, p8s, g7I);
                y6x.E_X(37);
                z1M = y6x.z7A(O6Y, d_2, g7I);
                if (!X9K && X9K !== 0 && !d_2 && d_2 !== 0) {
                    O2x = B2S;
                    z1M = E8g;
                    L$s = D9T.x0;
                    b_j = D9T.x0;
                    if (D9T.x0 > y2Z) {
                        return !"1";
                    }
                    if (D9T.x0 < z5p) {
                        return !"1";
                    }
                } else if (!X9K && X9K !== "0" << 0) {
                    if (D9T.y0 < D9T.y1) {
                        z1M = E8g;
                    } else {
                        z1M = B2S;
                    }
                    L$s = D9T.x0;
                    b_j = D9T.x0;
                    if (D9T.x0 > y2Z) {
                        return !({});
                    }
                    if (D9T.x0 < z5p) {
                        return ![];
                    }
                }
                a8n.lineWidth = 1.1;
                if (typeof N91 == W8_) {
                    a8n.strokeStyle = N91.color;
                    if (N91.opacity) {
                        a8n.globalAlpha = N91.opacity;
                    } else {
                        a8n.globalAlpha = 1;
                    }
                    a8n.lineWidth = parseInt(D.stripPX(N91.width));
                } else {
                    if (!N91 || N91 == "auto" || D.isTransparent(N91)) {
                        a8n.strokeStyle = this.defaultColor;
                    } else {
                        a8n.strokeStyle = N91;
                    }
                }
                if (Q7Y.opacity) {
                    a8n.globalAlpha = Q7Y.opacity;
                }
                if (Q7Y.lineWidth) {
                    a8n.lineWidth = Q7Y.lineWidth;
                }
                if (n2Y == "zig zag") {
                    a8n.lineWidth = 5;
                }
                U0W = null;
                if (Q7Y.pattern) {
                    U0W = Q7Y.pattern;
                    if (U0W == "solid") {
                        U0W = null;
                    } else if (U0W == "dotted") {
                        U0W = [a8n.lineWidth, a8n.lineWidth];
                    } else if (U0W == "dashed") {
                        y6x.E_X(46);
                        var M0X = y6x.v50(12, 12, 15, 10);
                        y6x.r9e(80);
                        var k$U = y6x.z7A(14, 3, 37);
                        U0W = [a8n.lineWidth * M0X, a8n.lineWidth * k$U];
                    }
                }
                a8n.stxLine(L$s, O2x, b_j, z1M, a8n.strokeStyle, a8n.globalAlpha, a8n.lineWidth, U0W);
                y6x.E_X(4);
                a8n.globalAlpha = y6x.z7A("1", 0);
                y6x.r72();
                a8n.lineWidth = 1;
            };
            A.prototype.connectTheDots = function (Q6x, j2C, q$H, K0Z, G23, p0S) {
                var j43,
                J7F,
                k2y,
                Q1P,
                X2_,
                W1p,
                O5P,
                Z8j,
                N3i,
                Q5F,
                Y8V,
                l8t,
                i1L,
                K34,
                Z79,
                f3J,
                c1P,
                i3q,
                p5G,
                S21,
                M$Q,
                J5d;
                j43 = "unde";
                j43 += "fined";
                if (!p0S) {
                    p0S = {};
                }
                if (p0S.pattern == "none") {
                    return;
                }
                if (G23 === !0) {
                    G23 = this.chart.panel;
                }
                if (K0Z === null || typeof K0Z == j43) {
                    K0Z = this.chart.context;
                }
                if (Q6x.length < 4) {
                    return;
                }
                J7F = 0;
                k2y = this.chart.canvasHeight;
                Q1P = 0;
                X2_ = this.chart.width;
                if (G23) {
                    k2y = G23.yAxis.bottom;
                    J7F = G23.yAxis.top;
                }
                K0Z.lineWidth = 1.1;
                if (typeof j2C == "object") {
                    K0Z.strokeStyle = j2C.color;
                    if (j2C.opacity) {
                        K0Z.globalAlpha = j2C.opacity;
                    } else {
                        K0Z.globalAlpha = 1;
                    }
                    K0Z.lineWidth = parseInt(D.stripPX(j2C.width));
                } else {
                    if (!j2C || j2C == "auto" || D.isTransparent(j2C)) {
                        K0Z.strokeStyle = this.defaultColor;
                    } else {
                        K0Z.strokeStyle = j2C;
                    }
                }
                if (p0S.opacity) {
                    K0Z.globalAlpha = p0S.opacity;
                }
                if (p0S.lineWidth) {
                    K0Z.lineWidth = p0S.lineWidth;
                }
                W1p = null;
                if (p0S.pattern) {
                    O5P = "d";
                    O5P += "a";
                    O5P += "sh";
                    O5P += "ed";
                    W1p = p0S.pattern;
                    if (W1p == "solid") {
                        W1p = null;
                    } else if (W1p == "dotted") {
                        W1p = [K0Z.lineWidth, K0Z.lineWidth];
                    } else if (W1p == O5P) {
                        y6x.E_X(41);
                        var S1_ = y6x.z7A(12, 5, 18, 41);
                        W1p = [K0Z.lineWidth * ("5" ^ 0), K0Z.lineWidth * ("5" * S1_)];
                    }
                }
                K0Z.beginPath();
                for (var T0A = 0; T0A < Q6x.length - 2; T0A += 2) {
                    Z8j = Q6x[T0A];
                    y6x.r9e(81);
                    N3i = Q6x[y6x.z7A(T0A, "1", 0)];
                    y6x.r9e(82);
                    Q5F = Q6x[y6x.z7A("2", 64, T0A)];
                    y6x.r9e(0);
                    Y8V = Q6x[y6x.z7A(T0A, 3)];
                    if (isNaN(Z8j) || isNaN(Q5F) || isNaN(N3i) || isNaN(Y8V)) {
                        return;
                    }
                    y6x.r9e(30);
                    l8t = y6x.v50(0, "0.0");
                    i1L = 1.0;
                    y6x.E_X(4);
                    K34 = y6x.z7A(Q5F, Z8j);
                    y6x.r9e(4);
                    Z79 = y6x.z7A(Y8V, N3i);
                    for (var C5u = 0; C5u < 4; C5u++) {
                        if (C5u === 0) {
                            f3J = -K34;
                            y6x.r9e(4);
                            c1P = -y6x.v50(Q1P, Z8j);
                        }
                        if (C5u ==  + "1") {
                            f3J = K34;
                            y6x.E_X(4);
                            c1P = y6x.z7A(X2_, Z8j);
                        }
                        if (C5u == "2" >> 64) {
                            f3J = -Z79;
                            y6x.E_X(4);
                            c1P = -y6x.z7A(J7F, N3i);
                        }
                        if (C5u == "3" >> 0) {
                            f3J = Z79;
                            y6x.r9e(4);
                            c1P = y6x.v50(k2y, N3i);
                        }
                        y6x.r9e(23);
                        i3q = y6x.v50(c1P, f3J);
                        if ((Y8V || Y8V === ("0" | 0)) && f3J === 0 && c1P < 0) {
                            return !1; ;
                        }
                        if (f3J < 0) {
                            if (i3q > i1L) {
                                return !1;
                            } else if (i3q > l8t) {
                                l8t = i3q;
                            };
                        } else if (f3J > 0) {
                            if (i3q < l8t) {
                                return !1;
                            } else if (i3q < i1L) {
                                i1L = i3q;
                            };
                        }
                    }
                    y6x.E_X(37);
                    p5G = y6x.v50(K34, Z8j, l8t);
                    y6x.r9e(37);
                    S21 = y6x.z7A(Z79, N3i, l8t);
                    y6x.E_X(37);
                    M$Q = y6x.v50(K34, Z8j, i1L);
                    y6x.E_X(37);
                    J5d = y6x.z7A(Z79, N3i, i1L);
                    try {
                        if (W1p) {
                            K0Z.dashedLineTo(p5G, S21, M$Q, J5d, W1p);
                        } else {
                            K0Z.moveTo(p5G, S21);
                            K0Z.lineTo(M$Q, J5d);
                        }
                    } catch (T2W) { ;
                    }
                }
                K0Z.stroke();
                K0Z.closePath();
                K0Z.globalAlpha = 1;
                K0Z.lineWidth = 1;
            };
            A.prototype.plotSpline = function (m05, A_S, S8O, X8I, o$_, v1B, E6N) {
                var p2k,
                f0H,
                e0J,
                g6V,
                U3u,
                j2b,
                E29,
                b9G,
                s1q;
                p2k = "unde";
                p2k += "fine";
                p2k += "d";
                f0H = "n";
                f0H += "one";
                if (!E6N) {
                    E6N = {};
                }
                if (E6N.pattern == f0H) {
                    return;
                }
                if (v1B === !!({})) {
                    v1B = this.chart.panel;
                }
                if (o$_ === null || typeof o$_ == p2k) {
                    o$_ = this.chart.context;
                }
                o$_.save();
                o$_.lineWidth = 1.1;
                if (typeof S8O == "object") {
                    o$_.strokeStyle = S8O.color;
                    if (S8O.opacity) {
                        o$_.globalAlpha = S8O.opacity;
                    } else {
                        o$_.globalAlpha = 1;
                    }
                    o$_.lineWidth = parseInt(D.stripPX(S8O.width));
                } else {
                    e0J = "aut";
                    e0J += "o";
                    if (!S8O || S8O == e0J || D.isTransparent(S8O)) {
                        g6V = -1417926716;
                        U3u = -1029005402;
                        j2b = 2;
                        for (var k03 = 1; y6x.P2D(k03.toString(), k03.toString().length, 7736) !== g6V; k03++) {
                            o$_.strokeStyle = this.defaultColor;
                            j2b += 2;
                        }
                        if (y6x.P2D(j2b.toString(), j2b.toString().length, 6680) !== U3u) {
                            o$_.strokeStyle = this.defaultColor;
                        }
                    } else {
                        o$_.strokeStyle = S8O;
                    }
                }
                if (E6N.opacity) {
                    o$_.globalAlpha = E6N.opacity;
                }
                if (E6N.lineWidth) {
                    o$_.lineWidth = E6N.lineWidth;
                }
                E29 = null;
                if (E6N.pattern) {
                    b9G = "do";
                    b9G += "t";
                    b9G += "t";
                    b9G += "ed";
                    s1q = "sol";
                    s1q += "i";
                    s1q += "d";
                    E29 = E6N.pattern;
                    if (E29 == s1q) {
                        E29 = null;
                    } else if (E29 == b9G) {
                        E29 = [o$_.lineWidth, o$_.lineWidth];
                    } else if (E29 == "dashed") {
                        y6x.E_X(83);
                        var y8C = y6x.v50(14, 7, 5, 3, 14);
                        y6x.r9e(20);
                        var q1M = y6x.z7A(23, 15, 13);
                        E29 = [o$_.lineWidth * y8C, o$_.lineWidth * q1M];
                    }
                }
                if (E29 && o$_.setLineDash) {
                    o$_.setLineDash(E29);
                    o$_.lineDashOffset = 0; ;
                }
                K(m05, A_S, o$_);
                o$_.restore();
            };
            A.prototype.drawingClick = function (N3V, N1f, M7S) {
                var U0u,
                W43,
                y9c,
                u53,
                E5s,
                q3c,
                T5J,
                T32,
                R2i,
                V84,
                P1Q,
                D37,
                F3b,
                j$L;
                if (!this.activeDrawing) {
                    if (!N3V) {
                        return;
                    }
                    U0u = A.drawingTools[this.currentVectorParameters.vectorType];
                    if (!U0u) {
                        if (D.Drawing[this.currentVectorParameters.vectorType]) {
                            U0u = D.Drawing[this.currentVectorParameters.vectorType];
                            A.registerDrawingTool(this.currentVectorParameters.vectorType, U0u);
                        }
                    }
                    if (U0u) {
                        this.activeDrawing = new U0u();
                        this.activeDrawing.construct(this, N3V);
                        if (!this.charts[N3V.name]) {
                            if (this.activeDrawing.chartsOnly) {
                                this.activeDrawing = null;
                                return;
                            }
                        }
                    }
                }
                if (this.activeDrawing) {
                    if (this.userPointerDown && !this.activeDrawing.dragToDraw) {
                        W43 = -1515248526;
                        y9c =  -  + "44814867";
                        u53 =  + "2";
                        for (var t__ = 1; y6x.a5V(t__.toString(), t__.toString().length, 61061) !== W43; t__++) {
                            if (!A.drawingLine) {
                                this.activeDrawing = null;
                            }
                            u53 += 2;
                        }
                        if (y6x.P2D(u53.toString(), u53.toString().length, 75188) !== y9c) {
                            if (~A.drawingLine) {
                                this.activeDrawing = 1;
                            }
                        }
                        return;
                    }
                    E5s = this.tickFromPixel(N1f, N3V.chart);
                    q3c = this.panels[this.activeDrawing.panelName];
                    T5J = this.adjustIfNecessary(q3c, E5s, this.valueFromPixelUntransform(M7S, q3c));
                    if (this.preferences.magnet && this.magnetizedPrice) {
                        T5J = this.adjustIfNecessary(q3c, E5s, this.magnetizedPrice);
                    }
                    if (this.activeDrawing.click(this.chart.tempCanvas.context, E5s, T5J)) {
                        if (this.activeDrawing) {
                            T32 = "stx_cross";
                            T32 += "hair_dra";
                            T32 += "wing";
                            A.drawingLine = !!"";
                            D.clearCanvas(this.chart.tempCanvas, this);
                            this.addDrawing(this.activeDrawing);
                            this.activeDrawing = null;
                            this.adjustDrawings();
                            this.draw();
                            this.changeOccurred("vector");
                            D.swapClassName(this.controls.crossX, "stx_crosshair", "stx_crosshair_drawing");
                            D.swapClassName(this.controls.crossY, "stx_crosshair", T32);
                        }
                    } else {
                        R2i = 985654782;
                        V84 = 1034123139;
                        P1Q = 2;
                        for (var R4R = "1" | 1; y6x.a5V(R4R.toString(), R4R.toString().length, 13032) !== R2i; R4R++) {
                            this.changeOccurred("stx_crosshair");
                            A.drawingLine = ![];
                            D.swapClassName(this.controls.crossX, "stx_crosshair", "stx_crosshair");
                            P1Q += 2;
                        }
                        if (y6x.P2D(P1Q.toString(), P1Q.toString().length, 45101) !== V84) {
                            D37 = "stx_cro";
                            D37 += "sshair";
                            F3b = "stx_cr";
                            F3b += "ossh";
                            F3b += "air";
                            j$L = "stx";
                            j$L += "_c";
                            j$L += "rosshair";
                            this.changeOccurred(j$L);
                            A.drawingLine = !!({});
                            D.swapClassName(this.controls.crossX, F3b, D37);
                        }
                        this.changeOccurred("drawing");
                        A.drawingLine = !![];
                        D.swapClassName(this.controls.crossX, "stx_crosshair_drawing", "stx_crosshair");
                        D.swapClassName(this.controls.crossY, "stx_crosshair_drawing", "stx_crosshair");
                    }
                    return !"";
                }
                return !({});
            };
            A.prototype.whichPanel = function (f3U) {
                y6x.r72();
                var e3p;
                for (var f5l in this.panels) {
                    e3p = this.panels[f5l];
                    if (e3p.hidden)
                        continue;
                    if (f3U > e3p.top && f3U < e3p.bottom) {
                        return e3p;
                    }
                }
                return null;
            };
            A.prototype.mouseup = function (Y36) {
                var X0M,
                O8U,
                S4x,
                a1j,
                M3L,
                o6G;
                X0M = "mo";
                X0M += "use";
                X0M += "u";
                X0M += "p";
                if (this.runPrepend("mouseup", arguments)) {
                    return;
                }
                this.swipe.end = !!({});
                this.cancelLongHold = !"";
                if (this.repositioningDrawing) {
                    if (!this.currentVectorParameters.vectorType || Date.now() - this.mouseTimer > 250) {
                        this.changeOccurred("vector");
                        D.clearCanvas(this.chart.tempCanvas, this);
                        this.repositioningDrawing = null;
                        this.adjustDrawings();
                        this.draw();
                        return;
                    } else {
                        this.repositioningDrawing = !({});
                    }
                }
                if (this.repositioningBaseline) {
                    this.repositioningBaseline = null;
                    this.chart.panel.yAxis.scroll = this.pixelFromPriceTransform(this.chart.baseline.userLevel, this.chart.panel) - (this.chart.panel.yAxis.top + this.chart.panel.yAxis.bottom) / ("2" - 0);
                    this.draw();
                    return;
                }
                O8U = this.userPointerDown;
                this.userPointerDown = ![];
                if (!this.displayInitialized) {
                    return;
                }
                this.grabbingScreen = !({});
                if (this.openDialog !== "") {
                    S4x = "stx-drag-ch";
                    S4x += "art";
                    if (A.insideChart) {
                        D.unappendClassName(this.container, S4x);
                    }
                    return;
                }
                if (this.grabOverrideClick) {
                    this.swipeRelease();
                    D.unappendClassName(this.container, "stx-drag-chart");
                    this.grabOverrideClick = !"1";
                    return;
                }
                if (A.insideChart) {
                    D.unappendClassName(this.container, "stx-drag-chart");
                }
                y6x.x24();
                if (A.resizingPanel) {
                    this.releaseHandle({});
                    return;
                }
                if (!Y36) {
                    Y36 = event;
                }
                if (Y36.which && Y36.which >= 2 || Y36.button && Y36.button >= 2 || Y36.ctrlKey) {
                    if (this.anyHighlighted && !this.bypassRightClick) {
                        this.rightClickHighlighted();
                        if (Y36.preventDefault && this.captureTouchEvents) {
                            Y36.preventDefault();
                        }
                        Y36.stopPropagation();
                        return !({});
                    } else {
                        a1j = "r";
                        a1j += "ight";
                        a1j += "Cl";
                        a1j += "ick";
                        this.dispatch(a1j, {
                            stx: this,
                            panel: this.currentPanel,
                            x: o6G,
                            y: M3L
                        });
                        return !![];
                    }
                }
                if (Y36.clientX < this.left || Y36.clientX > this.right) {
                    return;
                }
                if (Y36.clientY < this.top || Y36.clientY > this.bottom) {
                    return;
                }
                M3L = this.backOutY(Y36.clientY);
                o6G = this.backOutX(Y36.clientX);
                if (O8U && (!this.longHoldTookEffect || this.activeDrawing)) {
                    this.drawingClick(this.currentPanel, o6G, M3L);
                }
                if (!this.activeDrawing && !this.longHoldTookEffect) {
                    this.dispatch("tap", {
                        stx: this,
                        panel: this.currentPanel,
                        x: o6G,
                        y: M3L
                    });
                }
                this.runAppend(X0M, arguments);
            };
            A.prototype.grabbingHand = function () {
                if (!this.allowScroll) {
                    return;
                }
                if (!this.grabbingScreen) {
                    return;
                }
                if (D.touchDevice) {
                    return;
                }
                D.appendClassName(this.container, "stx-drag-chart");
            };
            A.prototype.mousedown = function (c9N) {
                var Q1T,
                A3d,
                z0p,
                d2I,
                F8s,
                R51,
                t2L;
                if (this.runPrepend("mousedown", arguments)) {
                    return;
                }
                this.grabOverrideClick = !!"";
                if (this.openDialog !== "") {
                    return;
                }
                if (!this.displayInitialized) {
                    return;
                }
                if (!this.displayCrosshairs) {
                    return;
                }
                if (!A.insideChart) {
                    return;
                }
                if (this.manageTouchAndMouse && c9N && c9N.preventDefault && this.captureTouchEvents) {
                    c9N.preventDefault();
                }
                y6x.r72();
                this.mouseTimer = Date.now();
                this.longHoldTookEffect = !({});
                this.hasDragged = !({});
                this.userPointerDown = !0;
                if (!c9N) {
                    c9N = event;
                }
                if (c9N.which && c9N.which >= 2 || c9N.button && c9N.button >= 2) {
                    return;
                }
                Q1T = this.currentPanel.chart;
                if (c9N.clientX >= this.left && c9N.clientX < this.right && c9N.clientY >= this.top && c9N.clientY <= this.bottom) {
                    if (this.repositioningDrawing) {
                        return;
                    }
                    for (var j8H = 0; j8H < this.drawingObjects.length; j8H++) {
                        A3d = this.drawingObjects[j8H];
                        if (A3d.highlighted) {
                            if (this.cloneDrawing) {
                                z0p = A.drawingTools[A3d.name];
                                d2I = new z0p();
                                d2I.reconstruct(this, A3d.serialize());
                                this.drawingObjects.push(d2I);
                                this.repositioningDrawing = d2I;
                                d2I.repositioner = A3d.repositioner;
                                return;
                            }
                            this.repositioningDrawing = A3d;
                            return;
                        }
                    }
                    if ((this.layout.chartType == "baseline_delta" || this.layout.chartType == "baseline_delta_mountain") && Q1T.baseline.userLevel !== ![]) {
                        F8s = this.valueFromPixelUntransform(this.cy - 5, this.currentPanel);
                        R51 = this.valueFromPixelUntransform(this.cy + 5, this.currentPanel);
                        y6x.E_X(84);
                        var E5F = y6x.z7A(9, 4, 9, 7);
                        t2L = this.chart.right - parseInt(getComputedStyle(this.controls.baselineHandle).width, E5F);
                        if (Q1T.baseline.actualLevel < F8s && Q1T.baseline.actualLevel > R51 && this.cx > t2L) {
                            this.repositioningBaseline = {
                                lastDraw: Date.now()
                            };
                            return;
                        }
                    }
                    this.drawingClick(this.currentPanel, this.cx, this.cy);
                    if (this.activeDrawing && this.activeDrawing.dragToDraw) {
                        return;
                    }
                }
                this.grabbingScreen = !!({});
                this.yToleranceBroken = !!0;
                if (!c9N) {
                    c9N = event;
                }
                this.grabStartX = c9N.clientX;
                this.grabStartY = c9N.clientY;
                this.grabStartScrollX = Q1T.scroll;
                this.grabStartScrollY = Q1T.panel.yAxis.scroll;
                this.grabStartCandleWidth = this.layout.candleWidth;
                this.grabStartZoom = this.whichYAxis(this.currentPanel).zoom;
                setTimeout((function (N7W) {
                        y6x.r72();
                        return function () {
                            N7W.grabbingHand();
                        };
                    })(this), 100);
                this.swipeStart(Q1T);
                if (this.longHoldTime) {
                    this.startLongHoldTimer();
                }
                this.runAppend("mousedown", arguments);
            };
            A.prototype.startLongHoldTimer = function () {
                var o7t;
                o7t = this;
                this.cancelLongHold = !({});
                if (this.longHoldTimeout) {
                    clearTimeout(this.longHoldTimeout);
                }
                this.longHoldTimeout = setTimeout(function () {
                    var P$Z;
                    P$Z = "l";
                    P$Z += "ongh";
                    P$Z += "o";
                    P$Z += "ld";
                    if (o7t.cancelLongHold) {
                        return;
                    }
                    o7t.dispatch(P$Z, {
                        stx: o7t,
                        panel: o7t.currentPanel,
                        x: o7t.cx,
                        y: o7t.cy
                    });
                    o7t.longHoldTookEffect = !"";
                }, this.longHoldTime);
            };
            A.prototype.changeVectorType = function (n_3) {
                this.currentVectorParameters.vectorType = n_3;
                if (A.drawingLine) {
                    this.undo();
                }
                this.setCrosshairColors();
                if (A.insideChart) {
                    this.doDisplayCrosshairs();
                }
            };
            A.prototype.rightClickOverlay = function (e5$, A76) {
                var a_c;
                if (this.runPrepend("rightClickOverlay", arguments)) {
                    return;
                }
                a_c = this.overlays[e5$];
                if (a_c.editFunction) {
                    a_c.editFunction(A76);
                } else {
                    this.removeOverlay(e5$);
                }
                this.runAppend("rightClickOverlay", arguments);
            };
            A.prototype.removeOverlay = function (Q_5) {
                var o2R,
                u5O,
                h1g,
                v0B,
                c1o;
                o2R = "l";
                o2R += "ay";
                o2R += "out";
                u5O = "remov";
                u5O += "eOverlay";
                if (this.runPrepend(u5O, arguments)) {
                    return;
                }
                for (var d5N in this.overlays) {
                    v0B = this.overlays[d5N];
                    if (v0B.inputs.Field && v0B.inputs.Field.indexOf(Q_5) != -1) {
                        this.removeOverlay(v0B.name);
                    } else if (v0B.name == Q_5) {
                        h1g = v0B;
                    }
                }
                c1o = this.layout.studies[Q_5];
                D.deleteRHS(D.Studies.studyPanelMap, c1o);
                if (h1g) {
                    this.cleanupRemovedStudy(h1g);
                }
                delete this.overlays[Q_5];
                this.displaySticky();
                this.createDataSet();
                this.changeOccurred(o2R);
                this.runAppend("removeOverlay", arguments);
            };
            A.prototype.addSeries = function (z$r, X0J, z7h) {
                var h1X,
                B8J,
                h6w,
                G5M,
                e4I,
                I2f,
                p9H,
                T$j;
                h1X = "l";
                h1X += "in";
                h1X += "e";
                B8J = "li";
                B8J += "n";
                B8J += "e";
                if (this.runPrepend("addSeries", arguments)) {
                    return;
                }
                if (!X0J) {
                    X0J = {};
                }
                if (!X0J.chartName) {
                    X0J.chartName = this.chart.name;
                }
                if (!X0J.symbolObject) {
                    X0J.symbolObject = {
                        symbol: z$r
                    };
                }
                function D6c(D1g, m7W) {
                    var x_J;
                    if (m7W.parameters.color) {
                        x_J = D1g.getSeriesRenderer("_generic_series");
                        if (!x_J) {
                            x_J = D1g.setSeriesRenderer(new D.Renderer.Lines({
                                        params: {
                                            panel: m7W.parameters.panel,
                                            type: "legacy",
                                            name: "_generic_series",
                                            overChart: !!1
                                        }
                                    }));
                        }
                        x_J.attachSeries(z$r, m7W.parameters).ready();
                    }
                }
                h6w = {
                    parameters: D.clone(X0J),
                    yValueCache: [],
                    display: z$r
                };
                if (("display" in h6w.parameters)) {
                    h6w.display = h6w.parameters.display;
                }
                if (h6w.parameters.isComparison) {
                    h6w.parameters.shareYAxis = !!({});
                }
                if (!h6w.parameters.chartType && h6w.parameters.color) {
                    h6w.parameters.chartType = B8J;
                }
                if (h6w.parameters.chartType && h6w.parameters.chartType != "mountain") {
                    h6w.parameters.chartType = h1X;
                }
                if (!h6w.parameters.panel) {
                    h6w.parameters.panel = this.chart.panel.name;
                }
                function d3t(B9H) {
                    var t0C,
                    q2v,
                    K_q,
                    V6H,
                    A$W;
                    t0C =  + "0";
                    q2v = 0;
                    while (X0J.data && t0C < B9H.masterData.length && q2v < X0J.data.length) {
                        K_q = X0J.data[q2v];
                        V6H = B9H.masterData[t0C];
                        if (!K_q.DT || typeof K_q.DT == "undefined") {
                            K_q.DT = D.strToDateTime(K_q.Date);
                        }
                        if (K_q.DT.getTime() == V6H.DT.getTime()) {
                            A$W = "u";
                            A$W += "ndefi";
                            A$W += "ned";
                            if (typeof K_q.Value != "undefined") {
                                V6H[z$r] = K_q.Value;
                            } else if (B9H.layout.adj && typeof K_q.Adj_Close != A$W) {
                                V6H[z$r] = K_q.Adj_Close;
                            } else {
                                V6H[z$r] = K_q.Close;
                            }
                            q2v++;
                            t0C++;
                            continue;
                        }
                        if (K_q.DT < V6H.DT) {
                            if (X0J.forceData) {
                                B9H.masterData.splice(t0C,  + "0", {
                                    DT: K_q.DT
                                });
                                continue;
                            }
                            q2v++;
                        } else {
                            t0C++;
                        }
                    }
                    if (X0J.forceData && t0C >= B9H.masterData.length) {
                        while (X0J.data && q2v < X0J.data.length) {
                            K_q = X0J.data[q2v];
                            if (!K_q.DT || typeof K_q.DT == "undefined") {
                                K_q.DT = D.strToDateTime(K_q.Date);
                            }
                            V6H = {
                                DT: K_q.DT
                            };
                            if (typeof K_q.Value != "undefined") {
                                V6H[z$r] = K_q.Value;
                            } else if (B9H.layout.adj && typeof K_q.Adj_Close != "undefined") {
                                V6H[z$r] = K_q.Adj_Close;
                            } else {
                                V6H[z$r] = K_q.Close;
                            }
                            B9H.masterData.push(V6H);
                            q2v++;
                        }
                    }
                }
                G5M = this.charts[X0J.chartName];
                e4I = this;
                if (G5M) {
                    G5M.series[z$r] = h6w;
                }
                if (X0J.isComparison) {
                    e4I.setComparison(!![], G5M);
                }
                I2f = !1;
                if (X0J.data && !X0J.data.useDefaultQuoteFeed) {
                    if (this.masterData) {
                        d3t(this); ;
                    }
                } else {
                    if (this.quoteDriver) {
                        p9H = this.quoteDriver;
                        T$j = p9H.makeParams(z$r, X0J.symbolObject, this.chart);
                        T$j.startDate = this.chart.masterData[0].DT;
                        T$j.endDate = this.chart.masterData[this.chart.masterData.length - 1].DT;
                        if (X0J.symbolObject) {
                            T$j.symbolObject = X0J.symbolObject;
                        }
                        function e9A(P1y) {
                            var W3Z;
                            W3Z = "a";
                            W3Z += "ddS";
                            W3Z += "eries";
                            if (!P1y.error && P1y.error !== 0) {
                                X0J.data = P1y.quotes;
                                d3t(e4I);
                                D6c(e4I, h6w);
                            }
                            if (!e4I.currentlyImporting) {
                                e4I.dispatch("symbolChange", {
                                    stx: e4I,
                                    symbol: T$j.symbol,
                                    symbolObject: T$j.symbolObject
                                });
                            }
                            if (z7h) {
                                z7h(P1y.error, h6w);
                            }
                            e4I.runAppend(W3Z, arguments);
                        }
                        I2f = !!1;
                        if (T$j.stx.isEquationChart(T$j.symbol)) {
                            D.fetchEquationChart(T$j, e9A);
                        } else {
                            p9H.quoteFeed.fetch(T$j, e9A);
                        }
                    } else {
                        h6w.addSeriesData = d3t;
                    }
                }
                if (!I2f) {
                    D6c(e4I, h6w);
                    if (z7h) {
                        z7h(null, h6w);
                    }
                    this.runAppend("addSeries", arguments);
                }
                return h6w;
            };
            A.prototype.isEquationChart = function (M4$) {
                if (!this.allowEquations || !D.computeEquationChart) {
                    return !!"";
                }
                if (M4$ && M4$[ + "0"] == ((510.33, 1280) < (5000,  + "5040") ? "=" : ("d",  + "3.05e+3"))) {
                    return !!"1";
                }
                return !!0;
            };
            A.prototype.deleteSeries = function (V6N, C7c) {
                if (this.runPrepend("deleteSeries", arguments)) {
                    return;
                }
                if (!C7c) {
                    C7c = this.chart;
                }
                delete C7c.series[V6N];
                if (this.quoteDriver) {
                    this.quoteDriver.updateSubscriptions();
                }
                this.runAppend("deleteSeries", arguments);
            };
            A.prototype.removeSeries = function (r7Q, P9N) {
                var K5N,
                I5Y,
                O$M,
                Z8Z,
                b6g;
                K5N = "remove";
                K5N += "Se";
                K5N += "ries";
                if (this.runPrepend("removeSeries", arguments)) {
                    return;
                }
                if (!P9N) {
                    P9N = this.chart;
                }
                for (var O5M in P9N.seriesRenderers) {
                    O$M = P9N.seriesRenderers[O5M];
                    for (var L3x = O$M.seriesParams.length -  + "1"; L3x >= 0; L3x--) {
                        Z8Z = O$M.seriesParams[L3x];
                        if (!Z8Z.permanent && Z8Z.field === r7Q) {
                            I5Y = Z8Z.symbolObject;
                            O$M.removeSeries(r7Q);
                        }
                    }
                }
                this.deleteSeries(r7Q, P9N);
                b6g = !"1";
                for (var Y8b in P9N.series) {
                    if (P9N.series[Y8b].parameters.isComparison) {
                        b6g = !!"1";
                    }
                }
                if (!b6g) {
                    this.setComparison(!!0, P9N);
                }
                this.createDataSet();
                this.draw();
                this.dispatch("symbolChange", {
                    stx: this,
                    symbol: r7Q,
                    symbolObject: I5Y,
                    action: "remove-series"
                });
                this.runAppend(K5N, arguments);
            };
            A.prototype.rendererAction = function (c5O, v0$) {
                var G4I,
                T6N,
                N0I,
                K2T,
                M74;
                if (this.runPrepend("rendererAction", arguments)) {
                    return;
                }
                for (var c1T in c5O.seriesRenderers) {
                    G4I = "ove";
                    G4I += "rl";
                    G4I += "a";
                    G4I += "y";
                    T6N = c5O.seriesRenderers[c1T];
                    if (T6N.params.overChart && v0$ == "underlay")
                        continue;
                    if (!T6N.params.overChart && v0$ == G4I)
                        continue;
                    if (!this.panels[T6N.params.panel])
                        continue;
                    if (this.panels[T6N.params.panel].chart !== c5O)
                        continue;
                    if (v0$ == "calculate") {
                        T6N.performCalculations();
                    } else {
                        T6N.draw();
                        if (T6N.cb) {
                            T6N.cb(T6N.colors);
                        }
                    }
                }
                y6x.E_X(17);
                N0I = -y6x.z7A(1, "2006615648");
                K2T = -490108724;
                M74 = 2;
                for (var a44 = 1; y6x.a5V(a44.toString(), a44.toString().length, 55001) !== N0I; a44++) {
                    this.runAppend("rendererAction", arguments);
                    M74 += 2;
                }
                if (y6x.a5V(M74.toString(), M74.toString().length, 23224) !== K2T) {
                    this.runAppend("", arguments);
                }
            };
            A.prototype.drawSeries = function (U5z, K6H, T3L) {
                var Q1s,
                o4b,
                w5s,
                o4x,
                E4h,
                m74,
                c44,
                L7s,
                u1A,
                K_J,
                y4V,
                X47,
                I7O,
                O_z,
                n82,
                L_H,
                s2s,
                K50,
                O8Q,
                r6Q,
                Z34,
                w1s,
                T3k,
                J9J,
                g9e,
                h25,
                p7v,
                y6c,
                f8P,
                L2e,
                Q0z,
                c8Y,
                c_O,
                R8Z,
                B3Y,
                H3V,
                B0T,
                A8K,
                v7D,
                H7d,
                r4V,
                X05,
                t9u,
                t2d,
                U1l,
                R_c,
                m2C,
                x6B,
                U2l,
                B$l,
                m7I,
                q8Z,
                n5L,
                K4m,
                p8A,
                c$q,
                c5a,
                o4s,
                Y8K,
                p9j;
                if (this.runPrepend("drawSeries", arguments)) {
                    return;
                }
                Q1s = U5z.dataSegment;
                o4b = {};
                w5s = null;
                if (!K6H) {
                    K6H = U5z.series;
                }
                y6x.r72();
                for (var P9D in K6H) {
                    o4x = "l";
                    o4x += "in";
                    o4x += "e";
                    E4h = "ga";
                    E4h += "p";
                    m74 = "mou";
                    m74 += "n";
                    m74 += "t";
                    m74 += "ain";
                    c44 = "stro";
                    c44 += "ke";
                    w5s = K6H[P9D];
                    L7s = w5s.parameters;
                    if (!L7s.chartType)
                        continue;
                    u1A = U5z.panel;
                    if (L7s.panel) {
                        u1A = this.panels[L7s.panel];
                    }
                    if (!u1A)
                        continue;
                    K_J = T3L ? T3L : u1A.yAxis;
                    y4V = [L7s.minimum, L7s.maximum];
                    if (!L7s.minimum && L7s.minimum !== 0 || !L7s.maximum && L7s.maximum !== 0) {
                        X47 = D.minMax(Q1s, P9D);
                        if (!L7s.minimum && L7s.minimum !== 0) {
                            y4V[0] = X47[ + "0"];
                        }
                        if (!L7s.maximum && L7s.maximum !== 0) {
                            y4V[1] = X47[1];
                        }
                    }
                    I7O = y4V[0];
                    O_z = K_J.top;
                    n82 = K_J.bottom;
                    y6x.r9e(4);
                    L_H = y6x.z7A(n82, O_z);
                    s2s = L7s.marginTop;
                    K50 = L7s.marginBottom;
                    if (s2s) {
                        O_z = s2s > 1 ? O_z + s2s : O_z + L_H * s2s;
                    }
                    if (K50) {
                        n82 = K50 > 1 ? n82 - K50 : n82 - L_H * K50;
                    }
                    y6x.E_X(44);
                    var U$x = y6x.v50(3, 8, 4);
                    O8Q = (n82 - O_z) / (y4V[U$x] - I7O);
                    r6Q = !!0;
                    Z34 = null;
                    w1s = null;
                    T3k = null;
                    J9J = null;
                    g9e = null;
                    h25 = null;
                    p7v = this.layout.candleWidth;
                    y6c = this.chart.context;
                    f8P = L7s.type == "step" || L7s.subtype == "step";
                    L2e = L7s.color;
                    if (!L2e) {
                        L2e = this.defaultColor;
                    }
                    Q0z = L7s.width;
                    if (!Q0z || isNaN(Q0z) || Q0z < 1) {
                        Q0z = 1;
                    }
                    if (w5s.highlight || w5s.parameters.highlight) {
                        Q0z *= 2;
                    }
                    this.startClip(u1A.name);
                    seriesPlotter = new D.Plotter();
                    seriesPlotter.newSeries("line", "stroke", L2e, 1, Q0z);
                    if (L7s.gaps && L7s.gaps.color) {
                        seriesPlotter.newSeries("gap", "stroke", L7s.gaps.color, 1, Q0z);
                    } else {
                        seriesPlotter.newSeries("gap", c44, L2e, 1, Q0z);
                    }
                    w5s.yValueCache = new Array(Q1s.length);
                    c8Y = w5s.yValueCache;
                    c_O = null;
                    R8Z = null;
                    B3Y = [];
                    H3V = w5s.parameters.shareYAxis && !T3L;
                    B0T = w5s.parameters.shareYAxis || T3L;
                    y6x.E_X(85);
                    var V$C = y6x.z7A(2, 1, 16, 1, 20);
                    y6x.r9e(4);
                    var j2$ = y6x.v50(9, 8);
                    A8K = u1A.left - (f8P ? V$C : 0.5) * p7v + this.micropixels - j2$;
                    v7D = A8K;
                    for (var X2G = 0; X2G < Q1s.length; X2G++) {
                        y6x.r9e(23);
                        A8K += y6x.z7A(p7v, 2);
                        if (f8P) {
                            y6x.r9e(23);
                            A8K += y6x.z7A(p7v, 2);
                        }
                        p7v = this.layout.candleWidth;
                        if (!f8P) {
                            y6x.r9e(23);
                            A8K += y6x.v50(p7v, 2);
                        }
                        if (T3k !== null && J9J !== null) {
                            if (!R8Z || L7s.gaps) {
                                B3Y.push([T3k, J9J]);
                            }
                        }
                        H7d = Q1s[X2G];
                        if (!H7d)
                            continue;
                        if (H7d.candleWidth) {
                            if (!f8P) {
                                y6x.E_X(62);
                                var M5O = y6x.v50(12, 18, 0, 4);
                                A8K += (H7d.candleWidth - p7v) / M5O;
                            }
                            p7v = H7d.candleWidth;
                        }
                        if (H7d.transform && H3V) {
                            H7d = H7d.transform;
                        }
                        w1s = H7d[P9D];
                        if (!w1s && w1s !==  + "0") {
                            if (f8P || L7s.gaps) {
                                c8Y[X2G] = J9J; ;
                            }
                            if (R8Z === !1) {
                                if (f8P) {
                                    T3k += p7v;
                                    seriesPlotter.lineTo("line", T3k, J9J);
                                }
                                seriesPlotter.moveTo("gap", T3k, J9J);
                            }
                            R8Z = !!({});
                            if (T3k && !L7s.gaps) {
                                B3Y.push([T3k, n82]);
                            }
                            continue;
                        }
                        if (!f8P && Z34 && Z34 != X2G - 1) {
                            g9e = T3k;
                            h25 = J9J;
                        } else {
                            g9e = null;
                        }
                        T3k = A8K;
                        if (T3k <= u1A.right) {
                            c_O = H7d;
                        }
                        if (this.extendLastTick && X2G == Q1s.length -  + "1") {
                            y6x.r9e(23);
                            T3k += y6x.z7A(p7v, 2);
                        }
                        if (f8P && r6Q) {
                            if (R8Z && L7s.gaps && L7s.gaps.pattern) {
                                seriesPlotter.dashedLineTo("gap", T3k, J9J, L7s.gaps.pattern);
                            } else if (R8Z && !L7s.gaps) {
                                B3Y.push([T3k, n82]);
                                seriesPlotter.moveTo("gap", T3k, J9J);
                            } else if (!R8Z && L7s.pattern) {
                                r4V = "l";
                                r4V += "i";
                                r4V += "n";
                                r4V += "e";
                                seriesPlotter.dashedLineTo(r4V, T3k, J9J, L7s.pattern);
                            } else {
                                seriesPlotter.lineTo(R8Z ? "gap" : "line", T3k, J9J);
                            }
                            B3Y.push([T3k, J9J]);
                        }
                        if (B0T) {
                            J9J = this.pixelFromPrice(w1s, u1A, K_J);
                        } else {
                            y6x.E_X(86);
                            J9J = y6x.z7A(n82, O8Q, w1s, I7O);
                        }
                        if (g9e !== null) {
                            X05 = {
                                x0: g9e,
                                x1: T3k,
                                y0: h25,
                                y1: J9J
                            };
                            for (; Z34 != X2G; Z34++) {
                                y6x.r9e(0);
                                var e20 = y6x.v50(0, 1);
                                t9u = u1A.left + Math.floor(A8K + (Z34 - X2G + 0.5) * p7v) + this.micropixels - e20;
                                t2d = D.yIntersection(X05, t9u);
                                c8Y[Z34] = t2d;
                            }
                        }
                        c8Y[X2G] = J9J;
                        if (X2G && B3Y.length && r6Q && !c8Y[X2G - 1] && c8Y[X2G - 1] !== 0) {
                            for (var K9l = X2G - ("1" << 0); K9l >= 0; K9l--) {
                                if (c8Y[K9l])
                                    break;
                                y6x.r9e(4);
                                var P9Q = y6x.z7A(9, 8);
                                c8Y[K9l] = B3Y[B3Y.length - P9Q][1];
                            }
                        }
                        if (!r6Q) {
                            r6Q = !0;
                            U1l = U5z.dataSet.length - U5z.scroll;
                            if (U1l <= 0) {
                                R_c = "ga";
                                R_c += "p";
                                seriesPlotter.moveTo(R8Z ? R_c : "line", T3k, J9J);
                            } else {
                                m2C = U5z.dataSet[U1l];
                                if (m2C.transform && H3V) {
                                    m2C = m2C.transform;
                                }
                                x6B = m2C[P9D];
                                if (B0T) {
                                    x6B = this.pixelFromPrice(x6B, u1A, K_J);
                                } else {
                                    y6x.E_X(86);
                                    x6B = y6x.z7A(n82, O8Q, x6B, I7O);
                                }
                                x6B = Math.min(Math.max(x6B, O_z), n82);
                                if (isNaN(x6B)) {
                                    seriesPlotter.moveTo(R8Z ? "gap" : "line", T3k, J9J);
                                } else {
                                    seriesPlotter.moveTo(R8Z ? "gap" : "line", v7D, x6B);
                                    if (f8P) {
                                        if (R8Z) {
                                            U2l = "g";
                                            U2l += "a";
                                            U2l += "p";
                                            if (L7s.gaps) {
                                                seriesPlotter.lineTo("gap", T3k, x6B);
                                            } else {
                                                seriesPlotter.moveTo(U2l, T3k, x6B);
                                            }
                                        } else {
                                            seriesPlotter.lineTo("line", T3k, x6B);
                                        }
                                    }
                                    if (!R8Z || L7s.gaps) {
                                        if (f8P) {
                                            B3Y.unshift([T3k, x6B]);
                                        }
                                        B3Y.unshift([v7D, x6B]);
                                    }
                                    if (R8Z && L7s.gaps && L7s.gaps.pattern) {
                                        B$l = "ga";
                                        B$l += "p";
                                        seriesPlotter.dashedLineTo(B$l, T3k, J9J, L7s.gaps.pattern);
                                    } else if (R8Z && !L7s.gaps) {
                                        B3Y.unshift([T3k, n82]);
                                        B3Y.unshift([v7D, n82]);
                                        seriesPlotter.moveTo("gap", T3k, J9J);
                                    } else if (!R8Z && L7s.pattern) {
                                        seriesPlotter.dashedLineTo("line", T3k, J9J, L7s.pattern);
                                    } else {
                                        m7I = "g";
                                        m7I += "a";
                                        m7I += "p";
                                        seriesPlotter.lineTo(R8Z ? m7I : "line", T3k, J9J);
                                    }
                                }
                            }
                        } else {
                            if (R8Z && L7s.gaps && L7s.gaps.pattern) {
                                seriesPlotter.dashedLineTo("gap", T3k, J9J, L7s.gaps.pattern);
                            } else if (R8Z && !L7s.gaps) {
                                B3Y.push([T3k, n82]);
                                seriesPlotter.moveTo("gap", T3k, J9J);
                            } else if (!R8Z && L7s.pattern) {
                                seriesPlotter.dashedLineTo("line", T3k, J9J, L7s.pattern);
                                if (f8P && X2G == Q1s.length - 1) {
                                    y6x.r9e(0);
                                    seriesPlotter.dashedLineTo("line", y6x.v50(T3k, p7v), J9J, L7s.pattern);
                                }
                            } else {
                                q8Z = "g";
                                q8Z += "a";
                                q8Z += "p";
                                seriesPlotter.lineTo(R8Z ? q8Z : "line", T3k, J9J);
                                if (f8P && X2G == Q1s.length -  + "1" && !R8Z) {
                                    y6x.E_X(0);
                                    seriesPlotter.lineTo("line", y6x.z7A(T3k, p7v), J9J);
                                }
                            }
                        }
                        Z34 = X2G;
                        if (R8Z) {
                            seriesPlotter.moveTo("line", T3k, J9J);
                        }
                        R8Z = ![];
                    }
                    if (R8Z) {
                        y6x.r9e(87);
                        var Z2H = y6x.v50(15, 10, 15, 236);
                        T3k = u1A.left + Math.floor(A8K + p7v + this.micropixels) - Z2H;
                        if (this.extendLastTick) {
                            y6x.r9e(23);
                            T3k += y6x.z7A(p7v, 2);
                        }
                        if (L7s.gaps && L7s.gaps.pattern) {
                            if (r6Q) {
                                n5L = "g";
                                n5L += "a";
                                n5L += "p";
                                seriesPlotter.dashedLineTo(n5L, T3k, J9J, L7s.gaps.pattern);
                            }
                        } else if (L7s.gaps) {
                            K4m = "g";
                            K4m += "a";
                            K4m += "p";
                            seriesPlotter.lineTo(K4m, T3k, J9J);
                        }
                    }
                    if (w5s.parameters.chartType == m74 && B3Y.length) {
                        p8A = "m";
                        p8A += "ountain";
                        c$q = "fil";
                        c$q += "l";
                        B3Y.push([T3k, R8Z && !L7s.gaps ? n82 : J9J]);
                        if (!L7s.fillStyle) {
                            L7s.fillStyle = L2e;
                            if (!L7s.fillOpacity) {
                                L7s.fillOpacity =  + "0.3";
                            }
                        }
                        seriesPlotter.newSeries("mountain", c$q, L7s.fillStyle, L7s.fillOpacity);
                        for (var H2J = "0" ^ 0; H2J < B3Y.length; H2J++) {
                            seriesPlotter[H2J ? "lineTo" : "moveTo"]("mountain", B3Y[H2J][0], Math.min(n82, B3Y[H2J]["1" ^ 0]));
                        }
                        seriesPlotter.lineTo(p8A, T3k, n82);
                        seriesPlotter.lineTo("mountain", B3Y[0][0], n82);
                        seriesPlotter.draw(y6c, "mountain");
                    }
                    seriesPlotter.draw(y6c, E4h);
                    seriesPlotter.draw(y6c, o4x);
                    this.endClip();
                    if (B0T && c_O) {
                        if (K_J.priceFormatter) {
                            txt = K_J.priceFormatter(this, u1A, c_O[P9D], K_J);
                        } else {
                            txt = this.formatYAxisPrice(c_O[P9D], u1A, null, K_J);
                        }
                        this.yAxisLabels.push({
                            src: "series",
                            "args": [u1A, txt, this.pixelFromPrice(c_O[P9D], u1A, K_J), L2e, null, null, K_J]
                        });
                    }
                    c5a = w5s.parameters.display;
                    if (!c5a) {
                        c5a = w5s.display;
                    }
                    o4b[P9D] = {
                        color: L2e,
                        display: c5a
                    }; ;
                }
                if (U5z.legend && w5s && w5s.useChartLegend) {
                    if (U5z.legendRenderer) {
                        U5z.legendRenderer(this, {
                            "chart": U5z,
                            "legendColorMap": o4b,
                            "coordinates": {
                                x: U5z.legend.x,
                                y: U5z.legend.y + U5z.panel.yAxis.top
                            }
                        });
                    }
                }
                o4s = -101260881;
                Y8K = -299750792;
                p9j = 2;
                for (var o$r = 1; y6x.P2D(o$r.toString(), o$r.toString().length, 22349) !== o4s; o$r++) {
                    this.runAppend("", arguments);
                    y6x.r9e(30);
                    p9j += y6x.z7A(2, "2");
                }
                if (y6x.a5V(p9j.toString(), p9j.toString().length, 18727) !== Y8K) {
                    this.runAppend("drawSeries", arguments);
                }
            };
            A.prototype.isDailyInterval = function (c73) {
                var p9g;
                p9g = "m";
                p9g += "o";
                p9g += "nt";
                p9g += "h";
                if (c73 == "day") {
                    return !!"1";
                }
                if (c73 == "week") {
                    return !![];
                }
                if (c73 == p9g) {
                    return !!1;
                }
                return !({});
            };
            A.prototype.setPeriodicityV2 = function (b0C, z2j, a1c, D17) {
                var Z68,
                v4i,
                f$M,
                m4R,
                T6I,
                H9q,
                h2$,
                w1Y,
                N33,
                f2X,
                X$Z,
                Q7J,
                c$e,
                n17;
                Z68 = "t";
                Z68 += "i";
                Z68 += "c";
                Z68 += "k";
                if (this.runPrepend("setPeriodicityV2", arguments)) {
                    return;
                }
                if (typeof a1c === "function") {
                    D17 = a1c;
                    a1c = null;
                }
                v4i = !!"";
                if (!z2j) {
                    return;
                }
                if (!b0C) {
                    return;
                }
                y6x.r72();
                delete this.layout.setSpan;
                if (z2j == "year") {
                    z2j = "month";
                    if (!b0C) {
                        b0C =  + "1";
                    }
                    y6x.E_X(17);
                    b0C = y6x.z7A(12, b0C);
                }
                f$M = this.isDailyInterval(z2j);
                m4R = this.isDailyInterval(this.layout.interval);
                if (f$M) {
                    a1c = null;
                } else if (z2j == Z68) {
                    a1c = null;
                } else if (!a1c) {
                    a1c = "minute";
                }
                T6I = !({});
                if (this.chart.symbol) {
                    if (this.dontRoll || !m4R) {
                        if (this.layout.interval != z2j) {
                            T6I = !!({});
                        }
                    } else {
                        if (f$M != m4R) {
                            T6I = !![];
                        }
                    }
                    if (a1c != this.layout.timeUnit) {
                        T6I = !!1;
                    };
                }
                this.layout.periodicity = b0C;
                this.layout.interval = z2j;
                this.layout.timeUnit = a1c;
                if (T6I) {
                    this.changeOccurred("layout");
                    if (this.quoteDriver) {
                        for (var k8b in this.charts) {
                            if (this.charts[k8b].symbol) {
                                if (this.displayInitialized) {
                                    this.quoteDriver.newChart({
                                        symbol: this.charts[k8b].symbol,
                                        symbolObject: this.charts[k8b].symbolObject,
                                        chart: this.charts[k8b]
                                    }, D17);
                                } else {
                                    this.newChart(this.charts[k8b].symbol, null, this.charts[k8b], D17);
                                }
                            }
                        }
                        return;
                    } else if (this.dataCallback) {
                        this.dataCallback();
                        if (D17) {
                            D17(null);
                        }
                        return;
                    } else {
                        H9q = "cannot change periodicity because nei";
                        H9q += "ther dataCallback or quoteDriver";
                        H9q += " are set";
                        console.log(H9q);
                        return;
                    }
                }
                for (h2$ in this.charts) {
                    w1Y = this.charts[h2$];
                    f2X = Math.round(w1Y.maxTicks / 2);
                    this.setCandleWidth(this.layout.candleWidth, w1Y);
                    X$Z = !!"1";
                    Q7J = !({});
                    if (w1Y.scroll <= w1Y.maxTicks) {
                        X$Z = !!0;
                    } else if (w1Y.dataSegment && !w1Y.dataSegment[f2X]) {
                        X$Z = !({});
                        Q7J = w1Y.scroll - w1Y.dataSet.length; ;
                    }
                    if (X$Z && w1Y.dataSegment && w1Y.dataSegment.length > 0) {
                        if (w1Y.maxTicks < (Math.round(this.chart.width / this.layout.candleWidth - 0.499) - 1) / ("2" >> 64)) {
                            y6x.E_X(20);
                            var L9Y = y6x.v50(11, 0, 12);
                            f2X = w1Y.dataSegment.length - L9Y;
                        }
                        if (f2X >= w1Y.dataSegment.length) {
                            N33 = w1Y.dataSegment[w1Y.dataSegment.length - 1].DT;
                            y6x.E_X(88);
                            var R71 = y6x.z7A(2, 1, 16, 9, 0);
                            f2X = w1Y.dataSegment.length - R71;
                        } else {
                            N33 = w1Y.dataSegment[f2X].DT;
                        }
                    }
                    this.createDataSet();
                    if (X$Z) {
                        if (w1Y.dataSegment && w1Y.dataSegment.length > 0) {
                            for (var I8O = w1Y.dataSet.length - 1; I8O >= 0; I8O--) {
                                c$e = w1Y.dataSet[I8O].DT;
                                if (c$e.getTime() < N33.getTime()) {
                                    w1Y.scroll = w1Y.dataSet.length - I8O + f2X;
                                    break;
                                }
                            }
                        }
                    } else if (!Q7J) {
                        n17 = Math.round(this.preferences.whitespace / this.layout.candleWidth);
                        w1Y.scroll = w1Y.maxTicks - n17; ;
                    } else {
                        w1Y.scroll = w1Y.dataSet.length + Q7J; ;
                    }
                }
                if (this.displayInitialized) {
                    this.draw();
                }
                this.changeOccurred("layout");
                if (this.quoteDriver) {
                    for (h2$ in this.charts) {
                        w1Y = this.charts[h2$];
                        if (w1Y.symbol && w1Y.moreAvailable) {
                            this.quoteDriver.checkLoadMore(w1Y);
                        }
                    }
                }
                if (D17) {
                    D17(null);
                }
                this.runAppend("setPeriodicityV2", arguments);
            };
            A.prototype.drawVectors = function () {
                var c75,
                d1F,
                Y3Q,
                f7k,
                u0G,
                J4a;
                c75 = "dra";
                c75 += "wVec";
                c75 += "tor";
                c75 += "s";
                if (this.vectorsShowing) {
                    return;
                }
                if (this.runPrepend(c75, arguments)) {
                    return;
                }
                this.vectorsShowing = !!"1";
                if (!this.chart.hideDrawings) {
                    d1F = {};
                    for (f7k = 0; f7k < this.drawingObjects.length; f7k++) {
                        u0G = this.drawingObjects[f7k];
                        Y3Q = u0G.panelName;
                        if (!this.panels[u0G.panelName])
                            continue;
                        if (!d1F[Y3Q]) {
                            d1F[Y3Q] = [];
                        }
                        d1F[Y3Q].push(u0G);
                    }
                    for (Y3Q in d1F) {
                        this.startClip(Y3Q);
                        J4a = d1F[Y3Q];
                        for (f7k = 0; f7k < J4a.length; f7k++) {
                            J4a[f7k].render(this.chart.context);
                        }
                        this.endClip();
                    }
                }
                this.runAppend("drawVectors", arguments);
            };
            A.prototype.consolidatedQuote = function (Z6j, A7j, O_H, q4h, X1N, H6K, C79) {
                var s3o,
                V3q,
                o57,
                Z_F,
                z4F,
                T34;
                s3o = "t";
                function D0N(G28, l7o) {
                    var d3G,
                    I8Q,
                    m7r;
                    d3G = "C";
                    d3G += "l";
                    d3G += "ose";
                    I8Q = "L";
                    I8Q += "o";
                    I8Q += "w";
                    m7r = 1;
                    if (G28.layout.adj && Z6j[l7o].Adj_Close) {
                        m7r = Z6j[l7o].Adj_Close / Z6j[l7o].Close;
                    }
                    if (("High" in Z6j[l7o]))
                        if (Z6j[l7o].High * m7r > o57.High) {
                            o57.High = Z6j[l7o].High * m7r;
                        }
                    if ((I8Q in Z6j[l7o]))
                        if (Z6j[l7o].Low * m7r < o57.Low) {
                            o57.Low = Z6j[l7o].Low * m7r;
                        }
                    o57.Volume += Z6j[l7o].Volume;
                    if ((d3G in Z6j[l7o]) && Z6j[l7o].Close !== null) {
                        o57.Close = Z6j[l7o].Close * m7r;
                    }
                    o57.ratio = m7r;
                    for (var N1N in Z6j[l7o]) {
                        if (!o57[N1N]) {
                            o57[N1N] = Z6j[l7o][N1N];
                        }
                    }
                }
                s3o += "i";
                s3o += "c";
                s3o += "k";
                if (A7j < 0) {
                    return null;
                }
                V3q = [Z6j, A7j, O_H, q4h, H6K, C79];
                if (this.runPrepend("consolidatedQuote", V3q)) {
                    return null;
                }
                if (!H6K && this.dontRoll) {
                    H6K = !!"1";
                }
                o57 = Z6j[A7j];
                Z_F = A7j;
                function q7O(K_r, M7_) {
                    var r3x,
                    v_0;
                    r3x = Z6j[K_r - 1].DT;
                    v_0 = Z6j[K_r].DT;
                    if (M7_ == "week") {
                        if (v_0.getDay() < r3x.getDay()) {
                            return !"";
                        }
                    } else if (M7_ == "month") {
                        if (v_0.getMonth() != r3x.getMonth()) {
                            return !"";
                        }
                    } else {
                        if (v_0.getDay() != r3x.getDay()) {
                            return !![];
                        }
                    }
                    return !({});
                }
                if ((q4h == "week" || q4h == "month") && !H6K) {
                    for (z4F = "1" << 32; z4F <= O_H; z4F++) {
                        while (Z_F + 1 < Z6j.length && !q7O(Z_F + 1, q4h)) {
                            Z_F++;
                            D0N(this, Z_F);
                        }
                        if (z4F != O_H) {
                            Z_F++;
                            if (Z_F < Z6j.length) {
                                D0N(this, Z_F);
                            }
                        }
                    }
                } else if (!this.isDailyInterval(q4h) && q4h != s3o && O_H > 1) {
                    for (z4F = 1; z4F < O_H; z4F++) {
                        y6x.r9e(0);
                        Z_F = y6x.z7A(A7j, z4F);
                        if (Z_F < Z6j.length && A_8(A7j, Z_F, O_H, q4h, X1N)) {
                            Z_F--;
                            break;
                        }
                        if (Z_F >= 0 && Z_F < Z6j.length) {
                            D0N(this, Z_F);
                        }
                    }
                } else {
                    for (z4F = 1; z4F < O_H; z4F++) {
                        y6x.r9e(0);
                        Z_F = y6x.z7A(A7j, z4F);
                        if (Z_F >= "0" * 1 && Z_F < Z6j.length) {
                            D0N(this, Z_F);
                        }
                    }
                }
                function A_8(a2P, F$P, Q4I, S4L, q5h) {
                    var k4T,
                    E8w,
                    x5j,
                    D6l,
                    c6n;
                    k4T = "s";
                    k4T += "econd";
                    E8w = "milli";
                    E8w += "secon";
                    E8w += "d";
                    y6x.r9e(17);
                    x5j = y6x.z7A(Q4I, S4L);
                    D6l = new Date(Z6j[a2P].DT);
                    if (q5h === E8w) {
                        D6l.setMilliseconds(D6l.getMilliseconds() + x5j);
                    } else if (q5h === k4T) {
                        D6l.setSeconds(D6l.getSeconds() + x5j);
                    } else {
                        D6l.setMinutes(D6l.getMinutes() + x5j);
                    }
                    c6n = Z6j[F$P].DT;
                    if (C79) {
                        if (Z6j[a2P].DT.getMinutes() % x5j) {
                            if (c6n.getMinutes() % x5j === 0) {
                                return !![];
                            }
                        }
                    }
                    if (c6n.getTime() >= D6l.getTime()) {
                        return !"";
                    }
                    return !!"";
                }
                for (z4F in this.plugins) {
                    T34 = this.plugins[z4F];
                    if (T34.consolidate) {
                        T34.consolidate(Z6j, A7j, Z_F, o57);
                    }
                }
                this.runAppend("consolidatedQuote", V3q);
                return {
                    "quote": o57,
                    "position": Z_F + 1
                };
            };
            A.NONE = 0;
            A.CLOSEUP = 1;
            A.CLOSEDOWN = 2;
            A.CLOSEEVEN = 4;
            A.CANDLEUP =  + "8";
            A.CANDLEDOWN = 16;
            y6x.E_X(12);
            A.CANDLEEVEN = y6x.v50("32", 0);
            A.prototype.displayChart = function (T4r) {
                var w64,
                v2I,
                d3S,
                P5G,
                j5D,
                N$5,
                p6t,
                P1T,
                w2y,
                M3M,
                E5w,
                a$c,
                d8E,
                n7$,
                V3Y,
                e2f,
                j20,
                q2q,
                a4l,
                c3e,
                L4y,
                K1L,
                U90,
                R5M,
                F1C,
                K2L,
                R0E,
                W23,
                E1s,
                D0L,
                T0f,
                g7$,
                c8F,
                y3E,
                L_t,
                F0s,
                F5m,
                P8d,
                G9N,
                Q_c,
                e2y,
                O8Z,
                V7a,
                D7X,
                X9a,
                c98,
                n3p,
                B_l,
                Y5n;
                w64 = "s";
                w64 += "catterplot";
                v2I = "ca";
                v2I += "n";
                v2I += "dl";
                v2I += "e";
                d3S = "volu";
                d3S += "me";
                d3S += "_can";
                d3S += "dle";
                P5G = "k";
                P5G += "a";
                P5G += "g";
                P5G += "i";
                j5D = this.layout.candleWidth - T4r.tmpWidth < 2 && T4r.tmpWidth <= 3;
                if (this.runPrepend("displayChart", arguments)) {
                    return;
                }
                this.chart.baseLegendColors = [];
                N$5 = this.layout.chartType;
                p6t = null;
                if (T4r.customChart) {
                    if (T4r.customChart.chartType) {
                        N$5 = T4r.customChart.chartType;
                    }
                    if (T4r.customChart.colorFunction) {
                        p6t = T4r.customChart.colorFunction;
                    }
                }
                y6x.x24();
                this.controls.baselineHandle.style.display = "none";
                P1T = T4r.panel;
                if (this.layout.aggregationType == P5G) {
                    w2y = "s";
                    w2y += "tx_kag";
                    w2y += "i_down";
                    this.drawKagiSquareWave(P1T, "stx_kagi_up", w2y);
                    this.chart.baseLegendColors.push(this.getCanvasColor("stx_kagi_up"));
                    this.chart.baseLegendColors.push(this.getCanvasColor("stx_kagi_down"));
                } else if (this.layout.aggregationType == "pandf") {
                    M3M = "s";
                    M3M += "tx_pandf_up";
                    this.drawPointFigureChart(P1T, M3M, "X");
                    this.chart.baseLegendColors.push(this.getCanvasColor("stx_pandf_up"));
                    this.drawPointFigureChart(P1T, "stx_pandf_down", (3480, 179.47) !== (2490, 2910) ? (1822, 9786) >  + "478.44" ? 114.76 == (2316, "876.49" - 0) ? 0xa2 : "O" : ("g", 325.86) : ("g", "4.01e+3" >> 32));
                    this.chart.baseLegendColors.push(this.getCanvasColor("stx_pandf_down"));
                } else if (N$5 == "line") {
                    E5w = "stx_li";
                    E5w += "ne";
                    E5w += "_chart";
                    this.drawLineChart(P1T, E5w);
                } else if (N$5 == "mountain") {
                    this.startClip(P1T.name);
                    this.chart.baseLegendColors = null;
                    this.drawMountainChart(P1T);
                    this.endClip();
                } else if (N$5 == "colored_mountain") {
                    a$c = "stx_line_";
                    a$c += "cha";
                    a$c += "r";
                    a$c += "t";
                    d8E = "stx_";
                    d8E += "li";
                    d8E += "ne_u";
                    d8E += "p";
                    this.startClip(P1T.name);
                    n7$ = this.getCanvasColor(d8E);
                    V3Y = this.getCanvasColor("stx_line_down");
                    e2f = this.getCanvasColor(a$c);
                    if (!p6t) {
                        p6t = function (n84, f7f, V$5) {
                            y6x.x24();
                            if (f7f.Close > f7f.iqPrevClose) {
                                return n7$;
                            } else if (f7f.Close < f7f.iqPrevClose) {
                                return V3Y;
                            } else {
                                return e2f;
                            }
                            return null;
                        };
                    }
                    j20 = this.drawMountainChart(P1T, "stx_colored_mountain_chart", p6t);
                    for (var X1v in j20) {
                        this.chart.baseLegendColors.push(X1v);
                    }
                    this.endClip();
                } else if (N$5 == "wave") {
                    this.drawWaveChart(P1T);
                } else if (N$5 == "bar") {
                    this.startClip(P1T.name);
                    this.drawBarChartHighPerformance(P1T, "stx_bar_chart");
                    this.endClip();
                } else if (N$5 == "colored_line") {
                    this.startClip(P1T.name);
                    n7$ = this.getCanvasColor("stx_line_up");
                    V3Y = this.getCanvasColor("stx_line_down");
                    e2f = this.getCanvasColor("stx_line_chart");
                    if (!p6t) {
                        p6t = function (U8X, W_7, A$$) {
                            if (W_7.Close > W_7.iqPrevClose) {
                                return n7$;
                            } else if (W_7.Close < W_7.iqPrevClose) {
                                return V3Y;
                            } else {
                                return e2f;
                            }
                            y6x.x24();
                            return null;
                        };
                    }
                    j20 = this.drawLineChart(P1T, "stx_line_chart", p6t);
                    for (var X1v in j20) {
                        this.chart.baseLegendColors.push(X1v);
                    }
                    this.endClip();
                } else if (N$5 == "colored_bar") {
                    this.startClip(P1T.name);
                    if (p6t) {
                        q2q = this.drawBarChart(P1T, "stx_bar_chart", p6t);
                        for (var D4Q in q2q) {
                            this.chart.baseLegendColors.push(D4Q);
                        }
                    } else {
                        a4l = "stx_bar";
                        a4l += "_up";
                        c3e = "s";
                        c3e += "tx_bar_even";
                        L4y = "stx";
                        L4y += "_bar_up";
                        this.drawBarChartHighPerformance(P1T, L4y, A.CLOSEUP);
                        this.drawBarChartHighPerformance(P1T, "stx_bar_down", A.CLOSEDOWN);
                        this.drawBarChartHighPerformance(P1T, c3e, A.CLOSEEVEN);
                        this.chart.baseLegendColors.push(this.getCanvasColor(a4l));
                        this.chart.baseLegendColors.push(this.getCanvasColor("stx_bar_down"));
                    }
                    this.endClip();
                } else if (N$5 == "hollow_candle" || N$5 == d3S) {
                    this.startClip(P1T.name);
                    if (p6t) {
                        if (!this.noWicksOnCandles[this.layout.aggregationType]) {
                            this.drawShadows(P1T, p6t);
                        }
                        this.drawCandles(P1T, p6t, !!"");
                        this.drawCandles(P1T, p6t, !0); ;
                    } else {
                        K1L = "trans";
                        K1L += "pare";
                        K1L += "nt";
                        U90 = "stx_hollow_can";
                        U90 += "dle_eve";
                        U90 += "n";
                        if (!this.noWicksOnCandles[this.layout.aggregationType]) {
                            this.drawShadowsHighPerformance(P1T, "stx_hollow_candle_up", A.CLOSEUP);
                            this.drawShadowsHighPerformance(P1T, "stx_hollow_candle_down", A.CLOSEDOWN);
                            this.drawShadowsHighPerformance(P1T, "stx_hollow_candle_even", A.CLOSEEVEN);
                        }
                        R5M = this.getCanvasColor("stx_hollow_candle_up");
                        F1C = this.getCanvasColor("stx_hollow_candle_down");
                        K2L = this.getCanvasColor(U90);
                        this.drawCandlesHighPerformance(P1T, R5M, K1L, A.CLOSEUP | A.CANDLEDOWN);
                        this.drawCandlesHighPerformance(P1T, F1C, "transparent", A.CLOSEDOWN | A.CANDLEDOWN);
                        this.drawCandlesHighPerformance(P1T, K2L, "transparent", A.CLOSEEVEN | A.CANDLEDOWN);
                        this.drawCandlesHighPerformance(P1T, this.containerColor, R5M, A.CLOSEUP | A.CANDLEUP);
                        this.drawCandlesHighPerformance(P1T, this.containerColor, F1C, A.CLOSEDOWN | A.CANDLEUP);
                        this.drawCandlesHighPerformance(P1T, this.containerColor, K2L, A.CLOSEEVEN | A.CANDLEUP);
                        this.chart.baseLegendColors.push(R5M);
                        this.chart.baseLegendColors.push(F1C);
                    }
                    this.endClip();
                } else if (N$5 == v2I) {
                    this.startClip(P1T.name);
                    R0E = this.getCanvasColor("stx_candle_shadow_up");
                    W23 = this.getCanvasColor("stx_candle_shadow_down");
                    y6x.r9e(89);
                    E1s = y6x.z7A(W23, R0E);
                    if (p6t) {
                        if (!this.noWicksOnCandles[this.layout.aggregationType]) {
                            this.drawShadows(P1T, p6t);
                        }
                        this.drawCandles(P1T, p6t, !"1");
                        if (!j5D) {
                            this.drawCandles(P1T, p6t, !0);
                        };
                    } else {
                        D0L = "stx_candle_d";
                        D0L += "own";
                        T0f = "st";
                        T0f += "x_candle_down";
                        if (!this.noWicksOnCandles[this.layout.aggregationType]) {
                            if (E1s) {
                                this.drawShadowsHighPerformance(P1T, "stx_candle_shadow_up", A.CANDLEUP);
                                this.drawShadowsHighPerformance(P1T, "stx_candle_shadow_down", A.CANDLEDOWN);
                                this.drawShadowsHighPerformance(P1T, "stx_candle_shadow", A.CANDLEEVEN);
                            } else {
                                this.drawShadowsHighPerformance(P1T, "stx_candle_shadow");
                            }
                        }
                        g7$ = this.canvasStyle("stx_candle_up");
                        c8F = g7$["border-left-color"];
                        if (!c8F) {
                            c8F = g7$.borderLeftColor;
                        }
                        if (j5D) {
                            c8F = null;
                        }
                        this.drawCandlesHighPerformance(P1T, this.getCanvasColor("stx_candle_up"), c8F, A.CANDLEUP);
                        this.chart.baseLegendColors.push(g7$.color);
                        g7$ = this.canvasStyle(T0f);
                        c8F = g7$["border-left-color"];
                        if (!c8F) {
                            c8F = g7$.borderLeftColor;
                        }
                        if (j5D) {
                            c8F = null;
                        }
                        this.drawCandlesHighPerformance(P1T, this.getCanvasColor(D0L), c8F, A.CANDLEDOWN);
                        this.chart.baseLegendColors.push(g7$.color);
                    }
                    this.endClip();
                } else if (N$5 == "baseline_delta") {
                    y3E = "stx";
                    y3E += "_baseline_tra";
                    y3E += "ce";
                    L_t = "stx_baseline_";
                    L_t += "trace";
                    this.startClip(P1T.name);
                    this.setStyle(L_t, "opacity", 0);
                    this.drawLineChart(P1T, y3E);
                    F0s = T4r.baseline.actualLevel;
                    if (F0s !== null) {
                        F5m = "stx";
                        F5m += "_basel";
                        F5m += "ine";
                        F0s = this.pixelFromPriceTransform(F0s, T4r.panel);
                        P8d = {
                            "over": "stx_baseline_up",
                            "under": "stx_baseline_down"
                        };
                        for (var f8Z in P8d) {
                            G9N = {
                                panelName: "chart",
                                band: "Close",
                                threshold: T4r.baseline.actualLevel,
                                color: this.getCanvasColor(P8d[f8Z]),
                                direction: f8Z == "over" ? 1 : -1,
                                edgeHighlight: this.getCanvasColor(P8d[f8Z]),
                                edgeParameters: {
                                    pattern: "solid",
                                    lineWidth: parseInt(this.canvasStyle(P8d[f8Z]).width,  + "10") + "0.1" * 1,
                                    opacity:  + "1"
                                }
                            };
                            Q_c = G9N.color;
                            if (Q_c && Q_c != "transparent") {
                                e2y = T4r.context.createLinearGradient(0, f8Z == "over" ? 0 : 2 * F0s,  + "0", F0s);
                                y6x.r9e(29);
                                e2y.addColorStop(y6x.z7A(32, "0"), D.hexToRgba(Q_c, 60));
                                y6x.r9e(30);
                                e2y.addColorStop(y6x.z7A(1, "1"), D.hexToRgba(Q_c,  + "10"));
                                G9N.color = e2y;
                                G9N.opacity = 1;
                            }
                            D.Studies.preparePeakValleyFill(this, T4r.dataSegment, G9N);
                            this.chart.baseLegendColors.push(Q_c);
                        }
                        this.plotLine( + "0", 1, F0s, F0s, this.containerColor, "line", T4r.context, !!1, {
                            pattern: "solid",
                            lineWidth: "1.1",
                            opacity: 1
                        });
                        this.plotLine(0, 1, F0s, F0s, this.getCanvasColor(F5m), "line", T4r.context, !0, {
                            pattern: "dotted",
                            lineWidth: "2.1",
                            opacity: 0.5
                        });
                        if (this.chart.baseline.userLevel !== !1) {
                            O8Z = "p";
                            O8Z += "x";
                            y6x.r9e(63);
                            var E_t = y6x.v50(1, 8, 1, 1);
                            y6x.E_X(16);
                            var Q6t = y6x.v50(8, 16, 26);
                            this.controls.baselineHandle.style.top = F0s - parseInt(getComputedStyle(this.controls.baselineHandle).height, E_t) / Q6t + O8Z;
                            y6x.r9e(28);
                            var T1v = y6x.z7A(15, 20, 15);
                            this.controls.baselineHandle.style.left = this.chart.right - parseInt(getComputedStyle(this.controls.baselineHandle).width, T1v) + "px";
                            this.controls.baselineHandle.style.display = "block";
                        }
                    }
                    this.endClip();
                } else if (N$5 == "baseline_delta_mountain") {
                    F0s = T4r.baseline.actualLevel;
                    if (F0s !== null) {
                        V7a = "2";
                        V7a += ".";
                        V7a += "1";
                        D7X = "s";
                        D7X += "oli";
                        D7X += "d";
                        X9a = "stx_ba";
                        X9a += "seline_dow";
                        X9a += "n";
                        c98 = "stx";
                        c98 += "_baseline_up";
                        n3p = "stx";
                        n3p += "_b";
                        n3p += "aseline_trace";
                        this.startClip(P1T.name);
                        this.drawMountainChart(P1T, "stx_baseline_delta_mountain");
                        this.endClip();
                        this.startClip(P1T.name);
                        this.setStyle("stx_baseline_trace", "opacity", 0);
                        this.drawLineChart(P1T, n3p);
                        F0s = this.pixelFromPriceTransform(F0s, T4r.panel);
                        P8d = {
                            "over": c98,
                            "under": X9a
                        };
                        for (var f8Z in P8d) {
                            B_l = "so";
                            B_l += "l";
                            B_l += "i";
                            B_l += "d";
                            G9N = {
                                panelName: "chart",
                                band: "Close",
                                threshold: T4r.baseline.actualLevel,
                                color: this.getCanvasColor(P8d[f8Z]),
                                direction: f8Z == "over" ? 1 : -1,
                                edgeHighlight: this.getCanvasColor(P8d[f8Z]),
                                edgeParameters: {
                                    pattern: B_l,
                                    lineWidth: parseInt(this.canvasStyle(P8d[f8Z]).width, 10) + 0.1,
                                    opacity: 1
                                }
                            };
                            this.chart.baseLegendColors.push(G9N.color);
                            G9N.color = "transparent";
                            D.Studies.preparePeakValleyFill(this, T4r.dataSegment, G9N);
                        }
                        this.plotLine(0, 1, F0s, F0s, this.containerColor, "line", T4r.context, !0, {
                            pattern: D7X,
                            lineWidth: "1.1",
                            opacity: 1
                        });
                        this.plotLine(0, 1, F0s, F0s, this.getCanvasColor("stx_baseline"), "line", T4r.context, !0, {
                            pattern: "dotted",
                            lineWidth: V7a,
                            opacity: 0.5
                        });
                        if (this.chart.baseline.userLevel !== !({})) {
                            y6x.E_X(90);
                            var f5c = y6x.v50(1, 4, 7, 18, 11);
                            y6x.r9e(91);
                            var G3r = y6x.z7A(14, 11, 6, 9, 20);
                            this.controls.baselineHandle.style.top = F0s - parseInt(getComputedStyle(this.controls.baselineHandle).height, f5c) / G3r + "px";
                            this.controls.baselineHandle.style.left = this.chart.right - parseInt(getComputedStyle(this.controls.baselineHandle).width,  + "10") + "px";
                            this.controls.baselineHandle.style.display = "block";
                        }
                        this.endClip();
                    }
                } else if (N$5 == w64) {
                    this.startClip(P1T.name);
                    this.scatter(P1T);
                    this.endClip();
                } else if (N$5) {
                    Y5n = "\". Defa";
                    Y5n += "u";
                    Y5n += "lting to Line Chart.";
                    y6x.r9e(38);
                    console.log(y6x.v50(Y5n, 'Invalid chart layout.chartType: "', N$5));
                    this.layout.chartType = "line";
                    this.drawLineChart(P1T, "stx_line_chart");
                } else {
                    this.chart.baseLegendColors = null;
                }
                this.runAppend("displayChart", arguments);
            };
            A.prototype.calculateATR = function (j1U, j$x) {
                var B4w,
                B54,
                x1Y,
                l$U;
                if (!j$x) {
                    j$x =  + "20";
                }
                B4w = 0;
                for (var v0H =  + "1"; v0H < j1U.dataSet.length; v0H++) {
                    B54 = j1U.dataSet[v0H];
                    x1Y = j1U.dataSet[v0H - 1].Close;
                    l$U = Math.max(B54.High - B54.Low, Math.abs(B54.High - x1Y), Math.abs(B54.Low - x1Y));
                    B4w += l$U;
                    if (v0H > j$x) {
                        B4w -= j1U.dataSet[v0H - j$x].trueRange;
                    }
                    B54.trueRange = l$U;
                    y6x.E_X(23);
                    B54.atr = y6x.v50(B4w, j$x);
                }
            };
            A.prototype.calculateMedianPrice = function (W$k) {
                var N$o,
                y$c,
                B2b,
                v1z,
                A9V;
                N$o = 179489655;
                y$c = 1361358257;
                y6x.r72();
                B2b = 2;
                for (var t2X = 1; y6x.a5V(t2X.toString(), t2X.toString().length, 64489) !== N$o; t2X++) {
                    B2b +=  + "2";
                }
                if (y6x.a5V(B2b.toString(), B2b.toString().length, 51949) !== y$c) {}
                for (var z8G = 0; z8G < W$k.dataSet.length; ++z8G) {
                    A9V = "hl/";
                    A9V += "2";
                    v1z = W$k.dataSet[z8G];
                    y6x.E_X(92);
                    var I0a = y6x.v50(20, 33, 17, 15, 9);
                    v1z[A9V] = (v1z.High + v1z.Low) / I0a;
                }
            };
            A.prototype.calculateTypicalPrice = function (N2p) {
                var y$P;
                for (var P58 =  + "0"; P58 < N2p.dataSet.length; ++P58) {
                    y$P = N2p.dataSet[P58];
                    y6x.r9e(13);
                    var t$t = y6x.v50(48, 4, 9);
                    y$P["hlc/3"] = (y$P.High + y$P.Low + y$P.Close) / t$t;
                }
            };
            A.prototype.calculateWeightedClose = function (K9n) {
                var S0p,
                o3f;
                for (var G3n = 0; G3n < K9n.dataSet.length; ++G3n) {
                    o3f = "h";
                    o3f += "l";
                    o3f += "cc/4";
                    S0p = K9n.dataSet[G3n];
                    y6x.r9e(28);
                    var h1q = y6x.z7A(4, 2, 0);
                    S0p[o3f] = (S0p.High + S0p.Low + h1q * S0p.Close) /  + "4";
                }
            };
            A.prototype.calculateOHLC4 = function (r5U) {
                var Q73,
                e6X;
                for (var C$q = 0; C$q < r5U.dataSet.length; ++C$q) {
                    e6X = "o";
                    e6X += "hlc/";
                    e6X += "4";
                    Q73 = r5U.dataSet[C$q];
                    y6x.r9e(93);
                    var b2a = y6x.z7A(24, 5, 4, 11);
                    Q73[e6X] = (Q73.Open + Q73.High + Q73.Low + Q73.Close) / b2a;
                }
            };
            A.prototype.currentQuote = function () {
                var S9q;
                S9q = null;
                if (!this.chart.dataSet) {
                    return null;
                }
                for (var M7g = this.chart.dataSet.length -  + "1"; M7g >= 0; M7g--) {
                    if (this.chart.dataSet[M7g]) {
                        return this.chart.dataSet[M7g];
                    }
                }
                y6x.x24();
                return null;
            };
            A.prototype.correctIfOffEdge = function (B9F) {
                y6x.x24();
                var P2r,
                s1I,
                O$C,
                b4i;
                P2r = "cor";
                P2r += "rectIfOffEdge";
                if (this.runPrepend("correctIfOffEdge", arguments)) {
                    return;
                }
                for (var N0A in this.charts) {
                    s1I = this.charts[N0A];
                    y6x.r9e(16);
                    var w9K = y6x.z7A(9, 9, 19);
                    O$C = this.minimumLeftBars + w9K;
                    if (s1I.allowScrollPast) {
                        b4i = s1I.maxTicks - O$C;
                        if (s1I.maxTicks - b4i > s1I.dataSet.length) {
                            b4i = s1I.maxTicks - s1I.dataSet.length;
                        }
                        if (s1I.scroll - b4i > s1I.dataSet.length) {
                            s1I.scroll = s1I.dataSet.length + b4i;
                        }
                        if (s1I.scroll <= O$C) {
                            s1I.scroll = O$C;
                            this.micropixels = 0;
                        }
                    } else {
                        if (s1I.scroll < O$C) {
                            s1I.scroll = O$C;
                        }
                        if (s1I.scroll > s1I.dataSet.length) {
                            s1I.scroll = s1I.dataSet.length;
                        }
                    };
                }
                this.runAppend(P2r, arguments);
            };
            A.prototype.createDataSegment = function (s14) {
                y6x.r72();
                var q6C,
                L1w,
                a5Q,
                n5z,
                u$s;
                if (this.runPrepend("createDataSegment", arguments)) {
                    return;
                }
                for (var B5n in this.charts) {
                    q6C = this.charts[B5n];
                    if (s14) {
                        q6C = s14;
                    }
                    q6C.baseline.actualLevel = q6C.baseline.userLevel ? q6C.baseline.userLevel : q6C.baseline.defaultLevel;
                    q6C.dataSegment = [];
                    y6x.r9e(41);
                    var A$o = y6x.v50(12, 6, 14, 57);
                    L1w = q6C.dataSet.length - q6C.scroll - A$o;
                    for (var V78 = -1; V78 < q6C.scroll && V78 < q6C.maxTicks; V78++) {
                        L1w++;
                        if (V78 == -1 && !q6C.baseline.includeInDataSegment)
                            continue;
                        if (L1w < q6C.dataSet.length && L1w >= 0) {
                            if (q6C.dataSet[L1w].candleWidth) {
                                q6C.dataSet[L1w].candleWidth = null;
                                q6C.dataSet[L1w].leftOffset = null;
                            }
                            q6C.dataSegment.push(q6C.dataSet[L1w]);
                            if (q6C.baseline.actualLevel === null && V78 >=  + "0") {
                                q6C.baseline.actualLevel = q6C.dataSet[L1w].iqPrevClose;
                            }
                        } else if (L1w < 0) {
                            q6C.dataSegment.push(null);
                        }
                    }
                    if (this.layout.chartType == "volume_candle") {
                        a5Q = 0;
                        for (var e1U = 0; e1U < q6C.dataSegment.length; e1U++) {
                            if (q6C.dataSegment[e1U]) {
                                a5Q += q6C.dataSegment[e1U].Volume;
                            }
                        }
                        n5z = 0;
                        for (var B73 = 0; B73 < q6C.dataSegment.length; B73++) {
                            if (q6C.dataSegment[B73]) {
                                if (q6C.dataSegment[B73].Volume) {
                                    u$s = q6C.width;
                                    if (q6C.scroll < q6C.maxTicks) {
                                        u$s -= this.preferences.whitespace;
                                    }
                                    q6C.dataSegment[B73].candleWidth = u$s * q6C.dataSegment[B73].Volume / a5Q;
                                    y6x.E_X(28);
                                    var L$G = y6x.z7A(6, 4, 0);
                                    q6C.dataSegment[B73].leftOffset = n5z + q6C.dataSegment[B73].candleWidth / L$G;
                                    n5z += q6C.dataSegment[B73].candleWidth;
                                } else {
                                    q6C.dataSegment[B73].candleWidth = this.layout.candleWidth;
                                    y6x.r9e(4);
                                    var R9q = y6x.v50(13, 11);
                                    q6C.dataSegment[B73].leftOffset = n5z + this.layout.candleWidth / R9q;
                                    n5z += this.layout.candleWidth;
                                }
                            } else {
                                n5z += this.layout.candleWidth;
                            }
                        }
                    }
                    if (s14)
                        break;
                }
                this.runAppend("createDataSegment", arguments);
            };
            A.prototype.leftTick = function () {
                y6x.r72();
                return this.chart.dataSet.length - this.chart.scroll;
            };
            A.prototype.getStartDateOffset = function () {
                for (var I0p = 0; I0p < this.chart.dataSegment.length; I0p++) {
                    if (this.chart.dataSegment[I0p]) {
                        return I0p;
                    }
                }
                return 0;
            };
            A.prototype.setStartDate = function (W_m) {
                y6x.r72();
                var C$e;
                for (var B5U = 0; B5U < this.chart.dataSet.length; B5U++) {
                    C$e = this.chart.dataSet[B5U];
                    if (C$e.DT.getTime() == W_m.getTime()) {
                        this.chart.scroll = this.chart.dataSet.length - B5U;
                        this.draw();
                        return;
                    }
                }
            };
            A.prototype.updateListeners = function (j9N) {
                var k8S;
                for (var X34 in this.plugins) {
                    k8S = this.plugins[X34];
                    if (k8S.display && k8S.listener) {
                        k8S.listener(this, j9N);
                    }
                }
            };
            A.prototype.clearPixelCache = function () {
                var r6H,
                z8r;
                for (var w5f in this.panels) {
                    r6H = this.panels[w5f];
                    r6H.cacheHigh = null;
                    r6H.cacheLow = null;
                    r6H.cacheLeft =  + "1000000";
                    r6H.cacheRight =  -  + "1";
                }
                y6x.x24();
                for (var Q_3 in this.charts) {
                    z8r = this.charts[Q_3];
                    if (!z8r.dataSet)
                        continue;
                    for (var V2I = 0; V2I < z8r.dataSet.length; V2I++) {
                        z8r.dataSet[V2I].cache = {};
                    }
                }
            };
            A.prototype.createYAxisLabel = function (L3c, g41, F5q, C0p, J2g, j3b, x7Q) {
                var H2a,
                B1v,
                b$X,
                S3y,
                B9a,
                t_w,
                I91,
                j19,
                M$p,
                x8q,
                E53,
                G_v,
                e1T,
                Q36,
                y5a;
                if (L3c.yAxis.drawPriceLabels === !!0) {
                    return;
                }
                H2a = x7Q ? x7Q : L3c.yAxis;
                B1v = j3b ? j3b : this.chart.context;
                b$X = 3;
                y6x.r9e(70);
                var H3b = y6x.v50(5, 20, 13);
                S3y = this.getCanvasFontSize("stx_yaxis") + b$X * H3b;
                this.canvasFont("stx_yaxis", B1v);
                B9a = H2a.displayBorder;
                if (this.axisBorders === !({})) {
                    B9a = ![];
                }
                if (this.axisBorders === !0) {
                    B9a = !!1;
                }
                t_w = B9a ? 3 : 0;
                try {
                    y6x.r9e(94);
                    var q1d = y6x.v50(17, 19, 22, 17, 1);
                    I91 = B1v.measureText(g41).width + t_w + b$X * q1d;
                } catch (o0K) {
                    I91 = H2a.width;
                }
                y6x.E_X(95);
                var X4Y = y6x.v50(20, 2, 19, 2, 5);
                j19 = H2a.left - b$X + X4Y;
                y6x.E_X(38);
                M$p = y6x.z7A(t_w, j19, b$X);
                x8q =  + "3";
                E53 = H2a.position === null ? L3c.chart.yAxis.position : H2a.position;
                if (E53 === "left") {
                    y6x.r9e(96);
                    var o4Z = y6x.v50(7, 98, 17, 16);
                    j19 = H2a.left + H2a.width + b$X - o4Z;
                    y6x.E_X(97);
                    I91 = y6x.v50(I91, 1);
                    M$p = j19;
                    x8q = -3;
                    B1v.textAlign = "right";
                }
                if (F5q + S3y / 2 > H2a.bottom) {
                    F5q = H2a.bottom - S3y /  + "2";
                }
                if (F5q - S3y / 2 < H2a.top) {
                    y6x.r9e(44);
                    var k4K = y6x.z7A(3, 10, 10);
                    F5q = H2a.top + S3y / k4K;
                }
                B1v.fillStyle = C0p;
                if (typeof D[this.yaxisLabelStyle] == 'undefined') {
                    G_v = "round";
                    G_v += "Re";
                    G_v += "ctArrow";
                    this.yaxisLabelStyle = G_v; ;
                }
                e1T = this.yaxisLabelStyle;
                if (H2a.yaxisLabelStyle) {
                    e1T = H2a.yaxisLabelStyle;
                }
                y6x.r9e(98);
                D[e1T](B1v, j19, y6x.v50(2, S3y, F5q), I91, S3y, x8q, !!1, ![]);
                B1v.textBaseline = "middle";
                B1v.fillStyle = J2g ? J2g : D.chooseForegroundColor(C0p);
                if (B1v.fillStyle == C0p) {
                    Q36 = "#FFFF";
                    Q36 += "F";
                    Q36 += "F";
                    y5a = "#00000";
                    y5a += "0";
                    if (C0p.toUpperCase() == "#FFFFFF") {
                        B1v.fillStyle = y5a;
                    } else {
                        B1v.fillStyle = Q36;
                    }
                }
                y6x.E_X(0);
                B1v.fillText(g41, M$p, y6x.z7A(F5q, 1));
                B1v.textAlign = "left";
            };
            A.prototype.createXAxisLabel = function (g5J, S3w, w6h, V8u, W_k, m6Y) {
                var x0d,
                b00,
                N_I,
                C7y,
                t6I,
                m5T,
                n8T,
                Z3v,
                i1z;
                x0d = this.chart.context;
                b00 =  + "2";
                N_I = "stx-float-date";
                y6x.r9e(40);
                var m1J = y6x.v50(3, 5);
                C7y = this.getCanvasFontSize(N_I) + b00 * m1J;
                this.canvasFont(N_I, x0d);
                try {
                    y6x.E_X(99);
                    var I4v = y6x.z7A(12, 18, 3, 1, 73);
                    t6I = x0d.measureText(S3w).width + b00 * I4v;
                } catch (U1L) {
                    t6I = 0;
                }
                m5T = g5J.top + g5J.height - C7y;
                if (w6h + t6I / 2 < g5J.left || w6h - t6I / 2 > g5J.right) {
                    return;
                }
                if (!m6Y) {
                    if (w6h + t6I / 2 > g5J.right) {
                        y6x.E_X(64);
                        var o3u = y6x.z7A(1, 1, 1);
                        w6h = g5J.right - t6I / o3u;
                    }
                    if (w6h - t6I / 2 < g5J.left) {
                        y6x.r9e(0);
                        var q1m = y6x.z7A(0, 2);
                        w6h = g5J.left + t6I / q1m;
                    }
                }
                x0d.fillStyle = V8u;
                y6x.E_X(98);
                D.roundRect(x0d, y6x.z7A(2, t6I, w6h), m5T, t6I, C7y, 3, !!"1", !({}));
                if (m6Y) {
                    n8T = g5J.bottom - g5J.yAxis.bottom - C7y;
                    x0d.beginPath();
                    y6x.E_X(4);
                    x0d.moveTo(y6x.v50(w6h, n8T), m5T);
                    y6x.E_X(4);
                    x0d.lineTo(w6h, y6x.v50(m5T, n8T));
                    y6x.E_X(0);
                    x0d.lineTo(y6x.z7A(w6h, n8T), m5T);
                    x0d.closePath();
                    x0d.fill();
                }
                x0d.textBaseline = "top";
                x0d.fillStyle = W_k ? W_k : D.chooseForegroundColor(V8u);
                if (x0d.fillStyle == V8u) {
                    Z3v = "#00";
                    Z3v += "0";
                    Z3v += "0";
                    Z3v += "00";
                    i1z = "#";
                    i1z += "F";
                    i1z += "F";
                    i1z += "FFFF";
                    if (V8u.toUpperCase() == i1z) {
                        x0d.fillStyle = Z3v;
                    } else {
                        x0d.fillStyle = "#FFFFFF";
                    }
                }
                y6x.r9e(100);
                x0d.fillText(S3w, y6x.z7A(t6I, b00, w6h, 2), y6x.v50(m5T, b00, y6x.r9e(0)));
            };
            A.prototype.drawCurrentHR = function () {
                var W$U,
                z_j,
                p7j,
                y_N,
                l_M,
                X$f,
                o9U,
                q8_,
                m$n,
                s3n,
                M6b,
                v8V,
                K4$,
                Z8K,
                U6j,
                S_9,
                Q2O,
                Y1_,
                c7L;
                W$U = "draw";
                W$U += "Cur";
                y6x.r72();
                W$U += "r";
                W$U += "entHR";
                if (this.runPrepend(W$U, arguments)) {
                    return;
                }
                for (var d8X in this.charts) {
                    y_N = "dataSe";
                    y_N += "g";
                    y_N += "men";
                    y_N += "t";
                    l_M = "n";
                    l_M += "o";
                    l_M += "n";
                    l_M += "e";
                    X$f = this.charts[d8X];
                    o9U = X$f.panel;
                    q8_ = o9U.yAxis;
                    if (q8_.drawCurrentPriceLabel === !({}))
                        continue;
                    if (X$f.customChart && X$f.customChart.chartType == l_M)
                        continue;
                    m$n = q8_.whichSet;
                    if (!m$n) {
                        m$n = "dataSet";
                    }
                    s3n = X$f[m$n].length;
                    if (m$n == y_N) {
                        while (s3n > (X$f.width - this.micropixels + this.layout.candleWidth / 2 + 1) / this.layout.candleWidth) {
                            s3n--;
                        }
                    }
                    if (s3n) {
                        y6x.E_X(101);
                        M6b = X$f[m$n][y6x.v50(0, "1", s3n)];
                        v8V = M6b.Close;
                        K4$ = M6b.Close;
                        if (X$f[m$n].length >= 2) {
                            y6x.E_X(4);
                            Z8K = X$f[m$n][y6x.z7A(s3n, 2)];
                            v8V = Z8K.Close;
                        }
                        if (K4$ < v8V) {
                            U6j = "stx_curr";
                            U6j += "ent_hr_d";
                            U6j += "o";
                            U6j += "wn";
                            z_j = this.canvasStyle(U6j).backgroundColor;
                            p7j = this.canvasStyle("stx_current_hr_down").color;
                        } else {
                            z_j = this.canvasStyle("stx_current_hr_up").backgroundColor;
                            p7j = this.canvasStyle("stx_current_hr_up").color;
                        }
                        if (M6b.transform) {
                            M6b = M6b.transform;
                        }
                        Q2O = Math.max(o9U.yAxis.printDecimalPlaces, o9U.chart.decimalPlaces);
                        if (q8_.maxDecimalPlaces || q8_.maxDecimalPlaces === 0) {
                            Q2O = Math.min(Q2O, q8_.maxDecimalPlaces);
                        }
                        if (q8_.priceFormatter) {
                            S_9 = q8_.priceFormatter(this, o9U, M6b.Close, Q2O);
                        } else {
                            S_9 = this.formatYAxisPrice(M6b.Close, o9U, Q2O);
                        }
                        Y1_ = this.pixelFromPrice(M6b.Close, o9U);
                        this.createYAxisLabel(o9U, S_9, Y1_, z_j, p7j);
                        if (this.preferences.currentPriceLine === !!"1" && this.isHome()) {
                            c7L = "l";
                            c7L += "i";
                            c7L += "n";
                            c7L += "e";
                            o9U.chart.context.globalCompositeOperation = "destination-over";
                            this.plotLine(o9U.left, o9U.right, Y1_, Y1_, z_j, c7L, o9U.chart.context, o9U, {
                                pattern: "dashed",
                                lineWidth: 1,
                                opacity: 0.8
                            });
                            o9U.chart.context.globalCompositeOperation = "source-over";
                        }
                    }
                }
                this.runAppend("drawCurrentHR", arguments);
            };
            A.prototype.getDefaultColor = function () {
                var x2x,
                t0w,
                S22,
                Y0U,
                H9t,
                I7P,
                v4n,
                I2K,
                o3Y,
                W$G,
                H6n,
                o$8;
                this.defaultColor = "#000000";
                x2x = null;
                t0w = -280664785;
                S22 = -1471233930;
                Y0U = 2;
                y6x.r72();
                for (var A1j = 1; y6x.a5V(A1j.toString(), A1j.toString().length, 77928) !== t0w; A1j++) {
                    H9t = this.chart.container;
                    y6x.r9e(30);
                    Y0U += y6x.v50(2, "2");
                }
                if (y6x.a5V(Y0U.toString(), Y0U.toString().length, 62671) !== S22) {
                    H9t = this.chart.container;
                }
                while (!x2x || D.isTransparent(x2x)) {
                    I7P = getComputedStyle(H9t);
                    if (!I7P) {
                        return;
                    }
                    x2x = I7P.backgroundColor;
                    if (D.isTransparent(x2x)) {
                        x2x = "transparent";
                    }
                    H9t = H9t.parentNode;
                    if (!H9t || !H9t.tagName)
                        break;
                }
                if (x2x) {
                    if (x2x == "transparent") {
                        x2x = "#FFFFFF";
                    }
                    this.containerColor = x2x;
                    if (!D.isTransparent(x2x)) {
                        v4n = D.hsv(x2x);
                        I2K = v4n[2];
                        if (I2K > 0.65) {
                            this.defaultColor = "#000000";
                        } else {
                            this.defaultColor = "#FFFFFF";
                        }
                    } else {
                        o3Y = 1022486115;
                        y6x.r9e(17);
                        W$G = y6x.v50(1, "242830991");
                        H6n = 2;
                        for (var K39 = "1" ^ 0; y6x.a5V(K39.toString(), K39.toString().length, 30194) !== o3Y; K39++) {
                            o$8 = "#";
                            o$8 += "0";
                            o$8 += "00";
                            o$8 += "000";
                            this.defaultColor = o$8;
                            H6n += 2;
                        }
                        if (y6x.P2D(H6n.toString(), H6n.toString().length, 13967) !== W$G) {
                            this.defaultColor = "";
                        }
                    }
                } else {
                    this.containerColor = "#FFFFFF";
                }
            };
            A.prototype.startAsyncAction = function () {
                y6x.x24();
                if (!this.pendingAsyncs) {
                    this.pendingAsyncs = [];
                }
                this.pendingAsyncs.push(!!"1");
            };
            A.prototype.registerChartDrawnCallback = function (A5a) {
                if (!this.asyncCallbacks) {
                    this.asyncCallbacks = [];
                }
                y6x.x24();
                this.asyncCallbacks.push(A5a);
                return {
                    fc: A5a
                };
            };
            A.prototype.unregisterChartDrawnCallback = function (V$G) {
                for (var G$R = 0; G$R < this.asyncCallbacks.length; G$R++) {
                    if (this.asyncCallbacks[G$R] == V$G.fc) {
                        this.asyncCallbacks.splice(G$R, 1);
                        return;
                    }
                }
            };
            A.prototype.makeAsyncCallbacks = function () {
                if (!this.asyncCallbacks) {
                    return;
                }
                y6x.x24();
                if (!this.pendingAsyncs || !this.pendingAsyncs.length) {
                    for (var q6y = 0; q6y < this.asyncCallbacks.length; q6y++) {
                        this.asyncCallbacks[q6y]();
                    }
                }
            };
            A.prototype.completeAsyncAction = function () {
                this.pendingAsyncs.pop();
                this.makeAsyncCallbacks();
            };
            A.prototype.draw = function () {
                var Y5y,
                S3x,
                q0m,
                G1v,
                k3q,
                Q9c,
                X9C,
                z1R,
                a$j,
                E5d;
                Y5y = "d";
                Y5y += "r";
                Y5y += "a";
                Y5y += "w";
                this.debug();
                if (!this.chart.canvas) {
                    return;
                }
                if (!this.chart.dataSet) {
                    return;
                }
                if (!this.chart.canvasHeight) {
                    return;
                }
                y6x.E_X(102);
                var F8$ = y6x.v50(10, 5, 20, 15, 168);
                this.offset = this.layout.candleWidth * this.candleWidthPercent / F8$;
                D.clearCanvas(this.chart.canvas, this);
                if (this.runPrepend("draw", arguments)) {
                    return;
                }
                if (!this.xaxisHeight) {
                    this.xaxisHeight = this.getCanvasFontSize("stx_xaxis") +  + "4";
                    if (this.chart.xAxis.displayBorder || this.axisBorders) {
                        this.xaxisHeight += 3;
                    }
                }
                this.getDefaultColor();
                this.vectorsShowing = !1;
                this.drawPanels();
                this.yAxisLabels = [];
                for (G1v in this.charts) {
                    Q9c = "calc";
                    Q9c += "u";
                    Q9c += "late";
                    q0m = this.charts[G1v];
                    this.correctIfOffEdge();
                    this.createDataSegment();
                    X9C = this.createXAxis(q0m);
                    this.initializeDisplay(q0m);
                    this.rendererAction(q0m, Q9c);
                    this.renderYAxis(q0m);
                    this.drawXAxis(q0m, X9C);
                    q0m.tmpWidth = Math.floor(this.layout.candleWidth * this.candleWidthPercent);
                    if (q0m.tmpWidth % 2 === 0) {
                        q0m.tmpWidth += 1;
                        if (q0m.tmpWidth > this.layout.candleWidth) {
                            q0m.tmpWidth -= 2;
                        }
                    }
                    if (q0m.tmpWidth < 0.5) {
                        q0m.tmpWidth = 0.5;
                    }
                    for (S3x in this.plugins) {
                        k3q = this.plugins[S3x];
                        if (k3q.display) {
                            if (k3q.drawUnder) {
                                k3q.drawUnder(this, q0m);
                            }
                        }
                    }
                    this.rendererAction(q0m, "underlay");
                    D.Studies.displayStudies(this, q0m, !![]);
                    this.displayChart(q0m);
                    D.Studies.displayStudies(this, q0m, !!"");
                    this.rendererAction(q0m, "overlay");
                }
                for (G1v in this.charts) {
                    q0m = this.charts[G1v];
                    for (S3x in this.plugins) {
                        k3q = this.plugins[S3x];
                        if (k3q.display) {
                            if (k3q.drawOver) {
                                k3q.drawOver(this, q0m);
                            }
                        }
                    }
                }
                for (var k9_ in this.panels) {
                    if (!this.panels[k9_].hidden) {
                        this.plotYAxisText(this.panels[k9_]);
                    }
                }
                for (var n0p = 0; n0p < this.yAxisLabels.length; n0p++) {
                    this.createYAxisLabel.apply(this, this.yAxisLabels[n0p].args);
                }
                this.createCrosshairs();
                this.drawVectors();
                this.drawCurrentHR();
                this.displayInitialized = !"";
                if (this.controls.home) {
                    z1R = -1475478964;
                    a$j = -1885303295;
                    E5d = 2;
                    for (var j8T = 1; y6x.a5V(j8T.toString(), j8T.toString().length, 4075) !== z1R; j8T++) {
                        this.controls.home.style.display = this.isHome() ? "none" : "block";
                        E5d += 2;
                    }
                    if (y6x.P2D(E5d.toString(), E5d.toString().length,  + "43051") !== a$j) {
                        this.controls.home.style.display = this.isHome() ? "none" : "block";
                    }
                }
                y6x.x24();
                this.positionMarkers();
                for (G1v in this.charts) {
                    q0m = this.charts[G1v];
                    if (this.quoteDriver) {
                        this.quoteDriver.checkLoadMore(q0m);
                    }
                }
                this.runAppend(Y5y, arguments);
                this.makeAsyncCallbacks();
            };
            A.prototype.adjustBackingStore = function (j4O, Q1y) {
                var j6Q,
                x0Z,
                H9m,
                c0P,
                m6W;
                this.devicePixelRatio = window.devicePixelRatio || "1" - 0;
                if (this.devicePixelRatio <  + "1.0") {
                    y6x.r9e(4);
                    this.devicePixelRatio = y6x.v50("1.0", 0);
                }
                j6Q = Q1y.webkitBackingStorePixelRatio || Q1y.mozBackingStorePixelRatio || Q1y.msBackingStorePixelRatio || Q1y.oBackingStorePixelRatio || Q1y.backingStorePixelRatio || 1;
                x0Z = this.devicePixelRatio / j6Q;
                if (!D.isAndroid || D.is_chrome) {
                    H9m = "p";
                    H9m += "x";
                    c0P = j4O.width;
                    m6W = j4O.height;
                    y6x.r9e(17);
                    j4O.width = y6x.v50(x0Z, c0P);
                    y6x.E_X(17);
                    j4O.height = y6x.z7A(x0Z, m6W);
                    y6x.r9e(0);
                    j4O.style.width = y6x.v50(c0P, 'px');
                    y6x.E_X(0);
                    j4O.style.height = y6x.v50(m6W, H9m);
                    Q1y.scale(x0Z, x0Z);
                    this.adjustedDisplayPixelRatio = x0Z;
                }
            };
            A.prototype.resizeCanvas = function () {
                var G2w,
                x$m,
                o72,
                s8l,
                o1C,
                z5R,
                p64,
                c_s;
                if (!this.chart.panel) {
                    this.chart.panel = this.panels.chart;
                }
                G2w = this.chart.canvas;
                x$m = this.chart.context;
                if (G2w && x$m) {
                    this.chart.tempCanvas.height = G2w.height = this.chart.container.clientHeight;
                    this.chart.tempCanvas.width = G2w.width = this.chart.container.clientWidth;
                    this.adjustBackingStore(G2w, x$m);
                    this.adjustBackingStore(this.chart.tempCanvas, this.chart.tempCanvas.context);
                    this.floatCanvas.height = this.chart.container.clientHeight;
                    this.floatCanvas.width = this.chart.container.clientWidth;
                    this.adjustBackingStore(this.floatCanvas, this.floatCanvas.context);
                }
                o72 = this.container.getBoundingClientRect();
                this.top = o72.top;
                this.left = o72.left;
                this.canvasWidth = this.chart.canvasWidth = this.chart.container.clientWidth;
                this.right = this.left + this.canvasWidth;
                this.height = this.chart.container.clientHeight;
                this.width = this.right - this.left;
                if (this.width ===  + "0" && !this.container.dimensionlessCanvas) {
                    console.log("warning: zero width chart. Check CSS for chart container.");
                }
                this.bottom = this.top + this.height;
                this.calculateYAxisPositions();
                this.chart.canvasRight = this.right;
                this.chart.canvasHeight = this.height;
                y6x.x24();
                s8l = this.layout.candleWidth;
                if (typeof s8l == "undefined") {
                    y6x.E_X(30);
                    s8l = y6x.v50(8, "8");
                }
                for (var x3u in this.charts) {
                    o1C = this.charts[x3u];
                    if (this.layout.span) {
                        this.setCandleWidth(this.getSpanCandleWidth(this.layout.span), o1C);
                    } else {
                        this.setCandleWidth(s8l, o1C);
                        if (o1C.scroll < o1C.width / s8l) {
                            o1C.scroll = Math.floor(o1C.width / s8l);
                            z5R = Math.round(this.preferences.whitespace / this.layout.candleWidth);
                            o1C.scroll -= z5R;
                        }
                    }
                    p64 = 10;
                    try {
                        c_s = x$m.measureText("10:00").width *  + "2";
                    } catch (B1n) {
                        c_s = 100;
                    }
                    while (p64 > 1) {
                        if (this.chart.width / c_s > p64)
                            break;
                        p64 /= 1.5;
                    }
                    o1C.xAxis.autoComputedTickSizePixels = Math.round(this.chart.width / p64);
                    if (o1C.xAxis.autoComputedTickSizePixels < ("1" ^ 0)) {
                        o1C.xAxis.autoComputedTickSizePixels = 1;
                    }
                }
            };
            A.prototype.setCandleWidth = function (p0r, u4j) {
                if (!u4j) {
                    u4j = this.chart;
                }
                if (p0r < this.minimumCandleWidth) {
                    p0r = this.minimumCandleWidth;
                }
                this.layout.candleWidth = p0r;
                y6x.E_X(0);
                var w1w = y6x.z7A(0, 1);
                u4j.maxTicks = Math.round(this.chart.width / p0r) + w1w;
            };
            A.prototype.resizeChart = function (l4i) {
                var T2l,
                b87,
                k2C;
                T2l = "resizeC";
                T2l += "ha";
                T2l += "rt";
                b87 = "re";
                b87 += "sizeChart";
                if (this.runPrepend(b87, arguments)) {
                    return;
                }
                if (l4i !== !!0) {
                    l4i = !!({});
                }
                if (l4i) {
                    this.preAdjustScroll();
                }
                k2C = this.chart.canvasHeight;
                this.resizeCanvas();
                y6x.r72();
                if (l4i) {
                    this.postAdjustScroll();
                }
                if (this.displayInitialized) {
                    this.adjustPanelPositions();
                    this.draw(); ;
                } else if (this.chart.canvasHeight !== 0 && k2C === 0) {
                    this.adjustPanelPositions();
                    this.draw();
                }
                this.positionCrosshairsAtPointer();
                this.doDisplayCrosshairs();
                this.runAppend(T2l, arguments);
            };
            A.prototype.newChart = function (R6F, e0K, v_v, I6o, y0v) {
                var G5z,
                P$_,
                n7G,
                l$$,
                s5R,
                j3m,
                z_f,
                Y7S;
                if (!v_v) {
                    v_v = this.chart;
                }
                if (!y0v) {
                    y0v = {};
                }
                if (y0v.periodicity) {
                    if (y0v.periodicity.interval) {
                        this.layout.interval = y0v.periodicity.interval;
                    }
                    if (y0v.periodicity.period) {
                        this.layout.periodicity = y0v.periodicity.period;
                    }
                    if (y0v.periodicity.periodicity) {
                        this.layout.periodicity = y0v.periodicity.periodicity;
                    }
                    this.layout.timeUnit = y0v.periodicity.timeUnit;
                }
                G5z = v_v.symbol;
                P$_ = D.clone(v_v.symbolObject);
                n7G = v_v.market;
                y6x.r72();
                if (!R6F) {
                    v_v.symbol = null;
                    v_v.symbolObject = {
                        symbol: null
                    };
                } else if (typeof R6F == 'object') {
                    v_v.symbol = R6F.symbol;
                    v_v.symbolObject = R6F;
                } else {
                    v_v.symbol = R6F;
                    v_v.symbolObject.symbol = R6F;
                }
                if (this.marketFactory) {
                    l$$ = this.marketFactory(v_v.symbolObject);
                    this.setMarket(l$$, v_v);
                }
                s5R = this;
                if (!e0K && this.quoteDriver) {
                    j3m = function (L8$) {
                        if (L8$ && L8$ != "orphaned") {
                            v_v.symbol = G5z;
                            v_v.symbolObject = P$_;
                            v_v.market = n7G;
                        }
                        y6x.r72();
                        if (!s5R.currentlyImporting) {
                            s5R.dispatch("symbolChange", {
                                stx: s5R,
                                symbol: s5R.chart.symbol,
                                symbolObject: s5R.chart.symbolObject
                            });
                        }
                        if (I6o) {
                            I6o(L8$);
                        }
                    };
                    z_f = y0v.span;
                    if (!z_f && this.layout) {
                        z_f = this.layout.setSpan;
                    }
                    if (z_f && z_f.base) {
                        Y7S = z_f.multiplier || 1;
                        this.chart.masterData = null;
                        this.displayInitialized = !({});
                        this.setSpan({
                            maintainPeriodicity: y0v.periodicity ? !!({}) : ![],
                            multiplier: Y7S,
                            base: z_f.base,
                            symbol: v_v.symbol
                        }, j3m);
                    } else {
                        this.quoteDriver.newChart({
                            symbol: v_v.symbol,
                            symbolObject: v_v.symbolObject,
                            chart: v_v,
                            initializeChart: !!"1"
                        }, function (J3m) {
                            y6x.x24();
                            if (!J3m) {
                                s5R.adjustPanelPositions();
                                s5R.quoteDriver.updateSubscriptions();
                                if (y0v.stretchToFillScreen) {
                                    s5R.fillScreen();
                                }
                            }
                            j3m.apply(s5R, arguments);
                        });
                    }
                } else {
                    if (!e0K) {
                        console.log("Warning: No masterData specified and no QuoteFeed configured");
                    }
                    if (!v_v.symbol) {
                        v_v.symbol = "";
                    }
                    this.setMasterData(e0K, v_v);
                    this.createDataSet();
                    this.initializeChart();
                    if (y0v.span && y0v.span.multiplier && y0v.span.base) {
                        this.setSpan({
                            maintainPeriodicity: !!"1",
                            multiplier: y0v.span.multiplier,
                            base: y0v.span.base
                        });
                    } else if (y0v.stretchToFillScreen) {
                        this.fillScreen();
                    } else {
                        this.draw();
                    }
                    this.adjustPanelPositions();
                    if (I6o) {
                        I6o();
                    }
                }
            };
            A.prototype.fillScreen = function () {
                var d0G,
                J5Z,
                d9s,
                H0R;
                d0G = this.layout.candleWidth;
                J5Z = this.chart.width - this.preferences.whitespace;
                d9s = this.chart.dataSet.length;
                if (d9s * d0G >= J5Z) {
                    this.draw();
                    return;
                }
                y6x.r9e(23);
                H0R = y6x.z7A(J5Z, d9s);
                this.setCandleWidth(H0R, this.chart);
                this.home({
                    maintainWhitespace: !![]
                });
            };
            A.prototype.setMasterData = function (y2e, s5M) {
                var D0l,
                C0$,
                g3J,
                M1u,
                u9t,
                S$i,
                B5f;
                D0l = "ch";
                D0l += "ar";
                D0l += "t";
                if (!s5M) {
                    s5M = this.chart;
                }
                if (this.marketFactory) {
                    C0$ = this.marketFactory(s5M.symbolObject);
                    this.setMarket(C0$, s5M);
                }
                s5M.masterData = y2e;
                y6x.x24();
                if (s5M.name == D0l) {
                    this.masterData = y2e;
                }
                for (g3J = 0; y2e && g3J < y2e.length; g3J++) {
                    M1u = "num";
                    M1u += "ber";
                    if (this.transformMasterDataQuote) {
                        y2e[g3J] = this.transformMasterDataQuote(y2e[g3J]);
                    }
                    u9t = y2e[g3J];
                    if (u9t.DT) {
                        u9t.DT = new Date(u9t.DT);
                        u9t.Date = D.yyyymmddhhmmssmmm(u9t.DT);
                    } else if (u9t.Date) {
                        u9t.DT = D.strToDateTime(u9t.Date);
                    } else {
                        console.log('setMasterData : Missing DT and Date on masterData object');
                    }
                    if (u9t.Volume && typeof u9t.Volume !== "number") {
                        u9t.Volume = parseInt(u9t.Volume, 10);
                    }
                    if (typeof u9t.Close == M1u) { ;
                    } else {
                        console.log('setMasterData : Close is missing or not a number. Use parseFloat() if your data server provides strings. MasterData Index= ' + g3J + ' Value = ' + u9t.Close);
                    }
                    if (u9t.High === null) {
                        delete u9t.High;
                    }
                    if (u9t.Low === null) {
                        delete u9t.Low;
                    }
                    if (u9t.Open === null) {
                        delete u9t.Open;
                    }
                }
                s5M.decimalPlaces = this.callbacks.calculateTradingDecimalPlaces({
                    stx: this,
                    chart: s5M,
                    symbol: s5M.symbolObject.symbol,
                    symbolObject: s5M.symbolObject
                });
                if (!A.isDailyInterval(this.layout.interval)) {
                    this.setDisplayDates(y2e);
                }
                this.chart.roundit = Math.pow(10, s5M.decimalPlaces);
                for (g3J in this.plugins) {
                    S$i = this.plugins[g3J];
                    if (S$i.display) {
                        if (S$i.setMasterData) {
                            S$i.setMasterData(this, s5M);
                        }
                    }
                }
                for (var T9T in this.chart.series) {
                    B5f = this.chart.series[T9T];
                    if (B5f.addSeriesData) {
                        B5f.addSeriesData(this);
                    }
                }
            };
            A.prototype.getSymbols = function () {
                var S1Y,
                W4n,
                W28,
                X9Z,
                M71,
                n8i;
                S1Y = [];
                for (var R8C in this.charts) {
                    W28 = this.charts[R8C];
                    S1Y.push({
                        symbol: W28.symbol,
                        symbolObject: W28.symbolObject,
                        periodicity: this.layout.periodicity,
                        interval: this.layout.interval,
                        timeUnit: this.layout.timeUnit,
                        setSpan: this.layout.setSpan
                    });
                    for (var d$r in W28.series) {
                        X9Z = W28.series[d$r];
                        if (!X9Z.parameters.data || !X9Z.parameters.data.useDefaultQuoteFeed)
                            continue;
                        W4n = {
                            symbol: d$r,
                            symbolObject: X9Z.symbolObject,
                            periodicity: this.layout.periodicity,
                            interval: this.layout.interval,
                            timeUnit: this.layout.timeUnit,
                            setSpan: this.layout.setSpan
                        };
                        if (arguments[0] === "include-parameters") {
                            W4n.parameters = X9Z.parameters;
                        }
                        if (!W4n.symbolObject) {
                            W4n.symbolObject = X9Z.parameters.symbolObject || ({
                                symbol: d$r
                            });
                        }
                        S1Y.push(W4n);
                    }
                }
                for (var A$9 in this.panels) {
                    if (this.panels[A$9].studyQuotes) {
                        for (var X$X in this.panels[A$9].studyQuotes) {
                            W4n = {
                                symbol: X$X,
                                symbolObject: {
                                    symbol: X$X
                                },
                                periodicity: this.layout.periodicity,
                                interval: this.layout.interval,
                                timeUnit: this.layout.timeUnit,
                                setSpan: this.layout.setSpan
                            };
                            S1Y.push(W4n);
                        }
                    }
                }
                for (var x9o = S1Y.length - 1; x9o >=  + "0"; x9o--) {
                    M71 = S1Y[x9o].symbol;
                    if (this.isEquationChart(M71)) {
                        n8i = D.formatEquation(M71);
                        if (n8i) {
                            for (var K49 =  + "0"; K49 < n8i.symbols.length; K49++) {
                                W4n = {
                                    symbol: n8i.symbols[K49],
                                    symbolObject: S1Y[x9o].symbolObject,
                                    periodicity: S1Y[x9o].periodicity,
                                    interval: S1Y[x9o].interval,
                                    timeUnit: S1Y[x9o].timeUnit,
                                    setSpan: S1Y[x9o].setSpan
                                };
                                S1Y.push(W4n);
                            }
                            y6x.r9e(29);
                            S1Y.splice(x9o, y6x.v50(0, "1"));
                        }
                    }
                }
                return S1Y;
            };
            A.prototype.setDisplayDate = function (f_9) {
                var R8H,
                e1C,
                p3C;
                R8H = f_9.DT;
                y6x.r9e(4);
                var t0L = y6x.v50(87, 15);
                e1C = R8H.getSeconds() * ("1000" | t0L) + R8H.getMilliseconds();
                if (this.dataZone) {
                    p3C = new P.Date(R8H.getFullYear(), R8H.getMonth(), R8H.getDate(), R8H.getHours(), R8H.getMinutes(), this.dataZone);
                    R8H = new Date(p3C.getTime() + e1C);
                }
                if (this.displayZone) {
                    p3C = new P.Date(R8H.getTime(), this.displayZone);
                    R8H = new Date(p3C.getFullYear(), p3C.getMonth(), p3C.getDate(), p3C.getHours(), p3C.getMinutes());
                    R8H = new Date(R8H.getTime() + e1C);
                }
                y6x.x24();
                f_9.displayDate = R8H;
            };
            A.prototype.setDisplayDates = function (H95) {
                var I5D;
                if (!H95) {
                    return;
                }
                for (var Y6c = 0; Y6c < H95.length; Y6c++) {
                    I5D = H95[Y6c];
                    if (I5D.DT) {
                        this.setDisplayDate(I5D);
                    }
                }
            };
            A.prototype.streamTrade = function (d_I, j9M, X6F, P26) {
                var e9V,
                R9v,
                q_y,
                Q4h,
                M_Z,
                F0I,
                L2w,
                I7x,
                U$5,
                z$n,
                K_S,
                f2C,
                F$Y,
                r$d,
                l7T,
                v9c,
                G$d,
                r6m,
                j21,
                H32;
                e9V = this.chart;
                if (!P26) {
                    P26 = {};
                }
                if (P26.chart) {
                    e9V = P26.chart;
                }
                R9v = null;
                q_y = null;
                Q4h = null;
                y6x.E_X(30);
                M_Z = y6x.z7A(0, "0");
                if (typeof d_I == "object") {
                    R9v = d_I.last;
                    q_y = d_I.bid;
                    Q4h = d_I.ask;
                    M_Z = d_I.volume;
                    if (typeof j9M != "undefined") {
                        j9M = new Date(j9M);
                    }
                } else {
                    F0I = -1958379578;
                    L2w = 709641791;
                    y6x.E_X(12);
                    I7x = y6x.v50("2", 96);
                    for (var X3M =  + "1"; y6x.P2D(X3M.toString(), X3M.toString().length, 79469) !== F0I; X3M++) {
                        R9v = arguments[5];
                        y6x.E_X(4);
                        M_Z = arguments[y6x.v50("5", 0)];
                        if (~j9M === "") {
                            j9M = new Date(arguments[ + "7"]);
                        }
                        I7x += 2;
                    }
                    if (y6x.P2D(I7x.toString(), I7x.toString().length, 1837) !== L2w) {
                        R9v = arguments[0];
                        M_Z = arguments[1];
                        if (!j9M != "") {
                            j9M = new Date(arguments[9]);
                        }
                    }
                    R9v = arguments[0];
                    M_Z = arguments[1];
                    if (typeof j9M != "undefined") {
                        j9M = new Date(arguments[2]);
                    }
                    y6x.E_X(12);
                    X6F = arguments[y6x.v50("3", 0)];
                }
                U$5 = e9V.masterData;
                if (!j9M || j9M == 'Invalid Date') {
                    j9M = this.convertToDataZone(new Date());
                }
                if (!U$5 || !U$5.length || this.layout.interval == "tick") {
                    z$n = {
                        Date: D.yyyymmddhhmmssmmm(j9M),
                        DT: j9M,
                        Open: R9v,
                        Close: R9v,
                        High: R9v,
                        Low: R9v,
                        Volume: M_Z,
                        Bid: q_y,
                        Ask: Q4h
                    };
                    this.appendMasterData([z$n], e9V, P26);
                } else {
                    z$n = D.clone(U$5[U$5.length - 1]);
                    K_S = new D.Market({});
                    f2C = {
                        'begin': z$n.DT,
                        'interval': this.layout.interval,
                        'periodicity': this.layout.periodicity,
                        'timeUnit': this.layout.timeUnit,
                        'inZone': this.dataZone,
                        'outZone': this.dataZone
                    };
                    F$Y = K_S.newIterator(f2C);
                    r$d = F$Y.next();
                    if (j9M < r$d) {
                        if (X6F) {
                            if (R9v || R9v === 0) {
                                z$n[X6F] = R9v; ;
                            }
                        } else {
                            if (R9v || R9v === "0" >> 96) {
                                z$n.Close = R9v;
                                if (R9v > z$n.High || z$n.High === null) {
                                    z$n.High = R9v;
                                }
                                if (R9v < z$n.Low || z$n.Low === null) {
                                    z$n.Low = R9v;
                                }
                                if (z$n.Open === null) {
                                    z$n.Open = R9v;
                                };
                            }
                            if (M_Z) {
                                z$n.Volume += M_Z;
                            }
                            if (q_y || q_y === 0) {
                                z$n.Bid = q_y;
                            }
                            if (Q4h || Q4h === 0) {
                                z$n.Ask = Q4h;
                            }
                        }
                        l7T = D.clone(P26);
                        if (typeof z$n.Adj_Close != "undefined") {
                            z$n.Adj_Close = z$n.Close;
                        }
                        this.appendMasterData([z$n], e9V, l7T);
                    } else {
                        v9c = [];
                        G$d = {
                            'begin': j9M,
                            'interval': this.layout.interval,
                            'periodicity': this.layout.periodicity,
                            'timeUnit': this.layout.timeUnit,
                            'inZone': this.dataZone,
                            'outZone': this.dataZone
                        };
                        r6m = K_S.newIterator(G$d);
                        r6m.next();
                        j9M = r6m.previous();
                        while (r$d < j9M && this.streamParameters.fillGaps) {
                            j21 = {
                                Date: D.yyyymmddhhmmssmmm(r$d),
                                DT: r$d,
                                Close: z$n.Close,
                                Open: z$n.Close,
                                High: z$n.Close,
                                Low: z$n.Close,
                                Volume: 0,
                                Bid: z$n.Bid,
                                Ask: z$n.Ask
                            };
                            v9c.push(j21);
                            r$d = F$Y.next();
                        }
                        if (X6F) {
                            H32 = this.currentQuote();
                            z$n = {
                                Date: D.yyyymmddhhmmssmmm(r$d),
                                DT: r$d,
                                Close: H32.Close,
                                Volume: 0,
                                Bid: H32.Bid,
                                Ask: H32.Ask
                            };
                            z$n[X6F] = R9v;
                        } else {
                            z$n = {
                                Date: D.yyyymmddhhmmssmmm(r$d),
                                DT: r$d,
                                Open: R9v,
                                Close: R9v,
                                High: R9v,
                                Low: R9v,
                                Volume: M_Z,
                                Bid: q_y,
                                Ask: Q4h
                            };
                        }
                        v9c.push(z$n);
                        this.appendMasterData(v9c, e9V, P26);
                    }
                }
            };
            A.prototype.appendMasterData = function (F5b, I9g, T04) {
                var a9F,
                r31,
                v5E,
                b56,
                s$x,
                D7U,
                F0v,
                R94,
                B7C,
                L8N,
                b0Y;
                if (!T04) {
                    T04 = {};
                }
                if (!I9g) {
                    I9g = this.chart;
                }
                if (F5b.constructor == Object) {
                    F5b = [F5b];
                }
                if (this.runPrepend("appendMasterData", [F5b, I9g, T04])) {
                    return;
                }
                if (!F5b || !F5b.length) {
                    return;
                }
                a9F = F5b[0].DT;
                y6x.x24();
                if (!a9F) {
                    a9F = D.strToDateTime(F5b[0].Date);
                }
                r31 = I9g.masterData;
                if (!r31 || !r31.length) {
                    r31 = I9g.masterData = D.clone(F5b);
                    for (v5E = 0; v5E < r31.length; v5E++) {
                        if (r31[v5E].DT) {
                            r31[v5E].Date = D.yyyymmddhhmmssmmm(r31[v5E].DT);
                        } else {
                            r31[v5E].DT = D.strToDateTime(r31[v5E].Date);
                        }
                        if (r31[v5E].Volume && typeof r31[v5E].Volume !== "number") {
                            r31[v5E].Volume = parseInt(r31[v5E].Volume, 10);
                        }
                        if (!A.isDailyInterval(this.layout.interval)) {
                            this.setDisplayDate(r31[v5E]);
                        }
                    }
                } else {
                    y6x.E_X(41);
                    var U6I = y6x.v50(2, 10, 5, 14);
                    v5E = r31.length - U6I;
                    while (v5E >= 0) {
                        b56 = r31[v5E].DT;
                        if (!b56) {
                            b56 = D.strToDateTime(r31[v5E].Date);
                        }
                        if (b56.getTime() <= a9F.getTime()) {
                            s$x = 0;
                            if (b56.getTime() < a9F.getTime()) {
                                s$x = 1;
                            }
                            for (var w7p = 0; w7p < F5b.length; w7p++) {
                                D7U = "n";
                                D7U += "um";
                                D7U += "ber";
                                if (!s$x) {
                                    if (typeof r31[v5E + w7p] != "undefined") {
                                        if (!F5b[w7p].Volume && r31[v5E + w7p].Volume) {
                                            F5b[w7p].Volume = r31[v5E + w7p].Volume;
                                        }
                                        if (!T04.allowReplaceOHL) {
                                            if (r31[v5E + w7p].Open) {
                                                F5b[w7p].Open = r31[v5E + w7p].Open;
                                            }
                                            if (r31[v5E + w7p].High > F5b[w7p].High) {
                                                F5b[w7p].High = r31[v5E + w7p].High;
                                            }
                                            if (r31[v5E + w7p].Low && r31[v5E + w7p].Low < F5b[w7p].Low) {
                                                F5b[w7p].Low = r31[v5E + w7p].Low;
                                            }
                                        };
                                    }
                                    for (var b3w in this.chart.series) {
                                        F0v = "undefin";
                                        F0v += "ed";
                                        if (typeof F5b[w7p][b3w] == F0v && typeof r31[v5E + w7p] != "undefined") {
                                            y6x.E_X(0);
                                            F5b[w7p][b3w] = r31[y6x.z7A(v5E, w7p)][b3w];
                                        }
                                    }
                                    for (var N1i in this.panels) {
                                        if (this.panels[N1i].studyQuotes) {
                                            for (var X4f in this.panels[N1i].studyQuotes) {
                                                R94 = "unde";
                                                R94 += "fin";
                                                R94 += "e";
                                                R94 += "d";
                                                if (!this.panels[N1i].studyQuotes[X4f])
                                                    continue;
                                                if (typeof F5b[w7p][X4f] == R94 && typeof r31[v5E + w7p] != "undefined") {
                                                    y6x.r9e(0);
                                                    F5b[w7p][X4f] = r31[y6x.v50(v5E, w7p)][X4f];
                                                }
                                            }
                                        }
                                    }
                                }
                                y6x.r9e(38);
                                r31[y6x.z7A(s$x, v5E, w7p)] = F5b[w7p];
                                if (r31[v5E + w7p + s$x].DT) {
                                    r31[v5E + w7p + s$x].Date = D.yyyymmddhhmmssmmm(r31[v5E + w7p + s$x].DT);
                                } else {
                                    r31[v5E + w7p + s$x].DT = D.strToDateTime(r31[v5E + w7p + s$x].Date);
                                }
                                if (r31[v5E + w7p + s$x].Volume && typeof r31[v5E + w7p + s$x].Volume !== D7U) {
                                    r31[v5E + w7p + s$x].Volume = parseInt(r31[v5E + w7p + s$x].Volume,  + "10");
                                }
                                if (!A.isDailyInterval(this.layout.interval)) {
                                    this.setDisplayDate(this.masterData[v5E + w7p + s$x]);
                                };
                            }
                            break;
                        }
                        v5E--;
                    }
                    for (v5E in this.plugins) {
                        B7C = this.plugins[v5E];
                        if (B7C.display) {
                            if (B7C.appendMasterData) {
                                B7C.appendMasterData(this, F5b, I9g);
                            }
                        }
                    }
                }
                if (!this.masterData || !this.masterData.length) {
                    this.masterData = r31;
                }
                if (!T04.noCreateDataSet) {
                    L8N = this.streamParameters;
                    if (++L8N.count > L8N.maxTicks || T04.bypassGovernor) {
                        clearTimeout(L8N.timeout);
                        this.createDataSet();
                        this.draw();
                        this.updateChartAccessories();
                        L8N.count = 0;
                        L8N.timeout = -1; ;
                    } else {
                        b0Y = this;
                        if (L8N.timeout ==  - ("1" >> 32)) {
                            L8N.timeout = setTimeout(function () {
                                b0Y.createDataSet();
                                b0Y.draw();
                                b0Y.updateChartAccessories();
                                b0Y.streamParameters.count = 0;
                                b0Y.streamParameters.timeout =  -  + "1";
                            }, L8N.maxWait);
                        }
                    }
                }
                this.runAppend("appendMasterData", arguments);
            };
            A.prototype.displayAll = function (f93, Q_I) {
                var r0M,
                S6M;
                r0M = this.chart;
                function E0k() {
                    var J3g;
                    if (!r0M.masterData.length) {
                        return;
                    }
                    J3g = D.clone(f93);
                    J3g.dtLeft = r0M.masterData["0" ^ 0].DT;
                    y6x.r72();
                    J3g.dtRight = r0M.masterData[r0M.masterData.length - ("1" << 64)].DT;
                    if (f93.maintainPeriodicity) {
                        J3g.periodicity = {};
                        J3g.periodicity.interval = S6M.layout.interval;
                        J3g.periodicity.period = S6M.layout.periodicity;
                    }
                    S6M.setRange(J3g, function (k7j) {
                        var B$Y;
                        y6x.r72();
                        if (!f93.maintainPeriodicity) {
                            B$Y = "lay";
                            B$Y += "o";
                            B$Y += "ut";
                            S6M.layout.setSpan = {
                                base: f93.base,
                                multiplier: f93.multiplier
                            };
                            S6M.changeOccurred(B$Y);
                        }
                        if (Q_I) {
                            Q_I(k7j);
                        }
                    });
                }
                if (f93 && f93.chart) {
                    r0M = f93.chart;
                }
                function c40() {
                    y6x.r72();
                    S6M.quoteDriver.loadAll(r0M, E0k);
                }
                S6M = this;
                if (!this.quoteDriver) {
                    E0k();
                    return;
                }
                if (this.dontRoll && this.layout.interval != "month") {
                    this.setPeriodicityV2(1, "month", c40);
                } else if (!A.isDailyInterval(this.layout.interval)) {
                    this.setPeriodicityV2(1, "day", c40);
                } else {
                    if (r0M.moreAvailable) {
                        c40();
                    } else {
                        E0k();
                    }
                }
            };
            A.prototype.setRange = function (P8k, I$v) {
                var Y0G,
                T4A,
                v0x,
                e7m,
                l$V,
                Y_k,
                t5u,
                g9Q,
                I$m,
                B8E,
                c6S,
                z8L,
                B59,
                C6v,
                d9U,
                d0a,
                Z5D,
                F_3,
                I7C,
                P_t,
                i3f,
                Q3t,
                c_5,
                G$f,
                K8N,
                T9b,
                R$q,
                z1b,
                F1$,
                C40,
                B0i,
                L2u,
                x49,
                r_u,
                e6M,
                x_e,
                b4q;
                if (D.isEmpty(P8k)) {
                    P8k = {
                        dtLeft: arguments[0],
                        dtRight: arguments[1],
                        padding: arguments[2],
                        chart: arguments[3],
                        goIntoFuture: ![]
                    };
                    I$v = arguments[4];
                }
                if (!P8k.chart) {
                    P8k.chart = this.chart;
                }
                if (typeof P8k.padding == "undefined") {
                    P8k.padding = this.preferences.whitespace;
                }
                Y0G = ![];
                function K5E() {
                    var M98,
                    E6F,
                    D4k;
                    if (!T4A.dataSet || T4A.dataSet.length === 0) {
                        if (I$v) {
                            I$v();
                        }
                        return;
                    }
                    M98 = 0;
                    E6F = 0;
                    if (v0x.getTime() >= T4A.dataSet[0].DT.getTime() || P8k.goIntoPast) {
                        M98 = Y_k.tickFromDate(v0x, T4A, null, !0);
                    } else {
                        M98 = 0;
                    }
                    if (e7m.getTime() <= T4A.dataSet[T4A.dataSet.length - 1].DT.getTime() || P8k.goIntoFuture) {
                        E6F = Y_k.tickFromDate(e7m, T4A);
                    } else {
                        y6x.r9e(103);
                        var c1N = y6x.v50(19, 70, 16, 9, 608);
                        E6F = T4A.dataSet.length - ("1" >> c1N);
                    }
                    y6x.E_X(28);
                    D4k = y6x.v50(1, M98, E6F);
                    if (D4k < 1) {
                        if (I$v) {
                            I$v();
                        }
                        return;
                    }
                    Y_k.setCandleWidth((Y_k.chart.width - P8k.padding) / D4k, T4A);
                    y6x.E_X(4);
                    var T$h = y6x.v50(16, 15);
                    T4A.scroll = T4A.dataSet.length - M98 + T$h;
                    Y_k.micropixels =  + "0";
                    Y_k.draw();
                    Y_k.changeOccurred("layout");
                    if (I$v) {
                        I$v();
                    }
                }
                function l6x(A9$, W8G, e4Z, F6y, S5s) {
                    var z30,
                    J24,
                    G5q,
                    B65;
                    z30 = 0;
                    y6x.r9e(4);
                    J24 = y6x.v50(A9$, W8G);
                    if (A.isDailyInterval(e4Z)) {
                        G5q = "m";
                        G5q += "on";
                        G5q += "t";
                        G5q += "h";
                        if (e4Z == G5q) {
                            z30 = J24 / D.MONTH / F6y;
                        } else if (e4Z == "week") {
                            z30 = J24 / D.WEEK / F6y;
                        } else {
                            z30 = J24 / D.DAY / F6y;
                        }
                    } else {
                        if (!isNaN(e4Z)) {
                            z30 = J24 / (D.MINUTE * e4Z) / F6y;
                        } else {
                            B65 = "mill";
                            B65 += "isecond";
                            if (e4Z == B65) {
                                y6x.r9e(23);
                                z30 = y6x.v50(J24, F6y);
                            } else if (e4Z == "second") {
                                z30 = J24 / D.SECOND / F6y;
                            } else if (e4Z == "hour") {
                                z30 = J24 / D.HOUR / F6y;
                            } else {
                                z30 = J24 / D.MINUTE / F6y;
                            }
                        }
                    }
                    return Math.round(z30); ;
                }
                y6x.x24();
                T4A = P8k.chart;
                function e_n(r_A) {
                    y6x.x24();
                    if (r_A) {
                        Y_k.chart.scroll = F1$;
                        Y_k.layout.candleWidth = C40;
                        if (I$v) {
                            I$v(r_A);
                        }
                        return;
                    }
                    t5u++;
                    if (t5u > "10" - 0) {
                        console.log("STXChart.setRange(): Too many loads (10) from server. Stopping. Check periodicity logic.");
                        K5E();
                        return;
                    }
                    if (T4A.moreAvailable && T4A.masterData[0].DT > v0x) {
                        Y_k.quoteDriver.checkLoadMore(T4A, !0, ![], function (D2K) {
                            y6x.x24();
                            if (!D2K) {
                                e_n();
                            }
                        });
                    } else {
                        K5E();
                    }
                }
                v0x = P8k.dtLeft;
                e7m = this.convertToDataZone(new Date());
                if (P8k.dtRight) {
                    e7m = P8k.dtRight;
                }
                if (!v0x) {
                    l$V = this.standardMarketIterator(e7m, null, T4A);
                    v0x = l$V.previous(T4A.maxTicks);
                    if (!P8k.periodicity) {
                        Y0G = !!"1";
                    }
                }
                Y_k = this;
                t5u = 0;
                if (this.quoteDriver) {
                    g9Q = "millise";
                    g9Q += "conds";
                    if (Y0G) {
                        I$m = this.layout.interval;
                        c6S = this.layout.timeUnit;
                        z8L = 837508634;
                        B59 = -746794271;
                        y6x.E_X(30);
                        C6v = y6x.z7A(0, "2");
                        for (var t$g = 1; y6x.a5V(t$g.toString(), t$g.toString().length, 20033) !== z8L; t$g++) {
                            B8E = this.layout.period;
                            C6v += 2;
                        }
                        if (y6x.a5V(C6v.toString(), C6v.toString().length, "13748" >> 0) !== B59) {
                            B8E = this.layout.period;
                        }
                    } else if (P8k.periodicity) {
                        I$m = P8k.periodicity.interval;
                        c6S = P8k.periodicity.timeUnit;
                        B8E = P8k.periodicity.period;
                    } else {
                        d9U = e7m.getTime() - v0x.getTime();
                        if (P8k.rangePeriodicityMap) {
                            d0a = P8k.rangePeriodicityMap;
                            Z5D = null;
                            for (var t_K =  + "0"; t_K < d0a.length; t_K++) {
                                F_3 = d0a[t_K];
                                if (d9U <= F_3.range) {
                                    Z5D = F_3;
                                    break;
                                }
                            }
                            I$m = Z5D.interval;
                            B8E = Z5D.periodicity;
                            c6S = Z5D.timeUnit; ;
                        } else {
                            I7C = "da";
                            I7C += "y";
                            P_t = "sc";
                            P_t += "at";
                            P_t += "terplot";
                            i3f = "bas";
                            i3f += "eline_delta_mountain";
                            Q3t = "colore";
                            Q3t += "d";
                            Q3t += "_mountain";
                            c_5 = "li";
                            c_5 += "n";
                            c_5 += "e";
                            G$f = 2;
                            switch (this.layout.chartType) {
                            case c_5:
                            case "colored_line":
                            case "mountain":
                            case Q3t:
                            case "baseline_delta":
                            case i3f:
                            case "wave":
                                G$f = 2;
                                break;
                            case "candle":
                            case "bar":
                            case "colored_bar":
                            case "hollow_candle":
                            case "volume_candle":
                            case P_t:
                                G$f = 5;
                                break;
                            }
                            if (P8k.pixelsPerBar) {
                                G$f = P8k.pixelsPerBar;
                            }
                            K8N = T4A.width / G$f;
                            T9b = [{
                                    interval: 1,
                                    ms: D.MINUTE
                                }, {
                                    interval: 5,
                                    ms: D.MINUTE * 5
                                }, {
                                    interval: 30,
                                    ms: D.MINUTE * 30
                                }, {
                                    interval: I7C,
                                    ms: D.DAY
                                }, {
                                    interval: "month",
                                    ms: D.MONTH
                                }, {
                                    interval: "year",
                                    ms: Number.MAX_VALUE
                                }
                            ];
                            I$m = T9b["0" >> 64].interval;
                            B8E = 1;
                            for (var t1A = 0; t1A < T9b.length; t1A++) {
                                z1b = d9U / T9b[t1A].ms;
                                if (z1b < K8N) {
                                    if (T9b[t1A - 1]) {
                                        I$m = T9b[t1A - ("1" - 0)].interval;
                                        y6x.E_X(23);
                                        B8E = Math.ceil(y6x.z7A(R$q, K8N));
                                    } else {
                                        I$m = T9b[t1A].interval;
                                        B8E =  + "1";
                                    }
                                    break;
                                }
                                R$q = z1b;
                            }
                        }
                    }
                    F1$ = this.chart.scroll;
                    C40 = this.layout.candleWidth;
                    this.chart.scroll = this.chart.maxTicks = l6x(e7m.getTime(), v0x.getTime(), I$m, B8E, this.dontRoll);
                    this.layout.candleWidth = this.chart.width / this.chart.maxTicks;
                    B0i = this.layout.timeUnit != c6S && (c6S == "seconds" || c6S == g9Q);
                    if (!B0i && A.isDailyInterval(this.layout.interval) !== A.isDailyInterval(I$m)) {
                        B0i = !!({});
                    } else if (!A.isDailyInterval(this.layout.interval) && this.layout.interval != I$m) {
                        B0i = !!({});
                    }
                    if (!this.chart.masterData || B0i) {
                        this.layout.interval = I$m;
                        this.layout.periodicity = B8E;
                        this.layout.timeUnit = c6S;
                        if (!this.layout.timeUnit) {
                            L2u = "t";
                            L2u += "i";
                            L2u += "c";
                            L2u += "k";
                            x49 = "s";
                            x49 += "eco";
                            x49 += "n";
                            x49 += "d";
                            if (A.isDailyInterval(this.layout.interval)) {
                                this.layout.timeUnit = null;
                            } else if (this.layout.interval == "second") {
                                this.layout.timeUnit = x49;
                            } else if (this.layout.interval != L2u) {
                                this.layout.timeUnit = "minute";
                            }
                        }
                        r_u = {
                            symbol: T4A.symbol,
                            symbolObject: T4A.symbolObject,
                            chart: T4A,
                            nodraw: !0
                        };
                        if (this.layout.interval == "tick") {
                            r_u.startDate = v0x;
                            r_u.endDate = e7m;
                        }
                        if (!this.displayInitialized) {
                            r_u.initializeChart = !0;
                        }
                        this.quoteDriver.newChart(r_u, e_n);
                    } else {
                        if (this.layout.interval != I$m || this.layout.periodicity != B8E) {
                            this.layout.interval = I$m;
                            this.layout.periodicity = B8E;
                            this.createDataSet();
                        }
                        e6M = -44021506;
                        x_e = 396854195;
                        b4q =  + "2";
                        for (var i6q = "1" << 32; y6x.a5V(i6q.toString(), i6q.toString().length, 23397) !== e6M; i6q++) {
                            e_n();
                            b4q += 2;
                        }
                        if (y6x.P2D(b4q.toString(), b4q.toString().length, 78669) !== x_e) {
                            e_n();
                        }
                    }
                } else {
                    K5E();
                }
            };
            A.prototype.setSpan = function (d0c, U1O) {
                var y2f,
                J31,
                E96,
                g_s,
                f3j,
                g1M,
                w7_,
                M_$,
                p6F,
                k9s,
                Z0$,
                s8z,
                j7$,
                t92,
                r6r,
                Q26,
                O5O,
                B2Z,
                v9Z,
                I$s,
                P9g,
                G3u,
                e9Z,
                h43;
                y2f = "yea";
                y2f += "r";
                J31 = arguments[0];
                E96 = arguments[1];
                g_s = arguments[2];
                y6x.r72();
                f3j = arguments[3];
                if (typeof d0c == "object") {
                    J31 = d0c.period ? d0c.period : d0c.multiplier ? d0c.multiplier : 1;
                    E96 = d0c.interval ? d0c.interval : d0c.base ? d0c.base : d0c.span ? d0c.span : d0c.period;
                    g_s = d0c.padding;
                    f3j = d0c.chart;
                } else {
                    d0c = {
                        period: J31,
                        interval: E96,
                        padding: g_s,
                        chart: f3j
                    };
                    U1O = arguments[ + "5"];
                }
                if (!d0c.padding) {
                    d0c.padding =  + "0";
                }
                if (!f3j) {
                    f3j = this.chart;
                }
                E96 = E96.toLowerCase();
                if (E96 == "all") {
                    this.displayAll(d0c, U1O);
                    return;
                }
                g1M = E96;
                w7_ = 1;
                if (E96 == "today") {
                    g1M = "day";
                } else if (E96 == y2f) {
                    g1M = "month";
                    w7_ = 12;
                }
                M_$ = D.shallowClone(d0c);
                M_$.goIntoFuture = ![];
                p6F = {
                    'begin': new Date(),
                    'interval': g1M,
                    'period': w7_,
                    'outZone': this.dataZone
                };
                k9s = f3j.market.newIterator(p6F);
                Z0$ = this.convertToDataZone(new Date());
                if (E96 === 'ytd') {
                    Z0$ = G8V(Z0$);
                    Z0$.setMonth(0);
                    Z0$.setDate(1);
                } else if (E96 === "today") {
                    k9s.next();
                    Z0$ = k9s.previous();
                } else if (E96 === "month") {
                    Z0$ = G8V(new Date());
                    Z0$.setMonth(Z0$.getMonth() - J31);
                } else if (E96 === "year") {
                    y6x.r9e(12);
                    s8z = -y6x.v50("333186145", 0);
                    j7$ = -2050813052;
                    t92 = 2;
                    for (var e_b = 1; y6x.a5V(e_b.toString(), e_b.toString().length, 67114) !== s8z; e_b++) {
                        Z0$ = G8V(new Date());
                        Z0$.setFullYear(Z0$.getFullYear() - J31);
                        t92 += 2;
                    }
                    if (y6x.a5V(t92.toString(), t92.toString().length, 78655) !== j7$) {
                        Z0$ = G8V(new Date());
                        Z0$.setFullYear(Z0$.getFullYear() % J31);
                    }
                } else if (E96 === "week") {
                    Z0$ = G8V(new Date());
                    Z0$.setDate(Z0$.getDate() - J31 *  + "7");
                } else if (E96 === "day" && J31 == 1) {
                    r6r = Z0$.getHours();
                    Q26 = Z0$.getMinutes();
                    O5O = Z0$.getSeconds();
                    B2Z = Z0$.getMilliseconds();
                    Z0$ = k9s.previous();
                    Z0$.setHours(r6r);
                    Z0$.setMinutes(Q26);
                    Z0$.setSeconds(O5O);
                    Z0$.setMilliseconds(B2Z);
                } else {
                    v9Z = -1266516395;
                    I$s =  + "625023952";
                    P9g = 2;
                    for (var j9o = "1" | 0; y6x.P2D(j9o.toString(), j9o.toString().length, 6796) !== v9Z; j9o++) {
                        y6x.r9e(4);
                        Z0$ = k9s.previous(y6x.z7A(J31, 1));
                        P9g += 2;
                    }
                    if (y6x.P2D(P9g.toString(), P9g.toString().length, 76071) !== I$s) {
                        y6x.r9e(23);
                        Z0$ = k9s.previous(y6x.z7A(J31, 7));
                    }
                }
                M_$.dtLeft = Z0$;
                if (E96 === 'today') {
                    M_$.goIntoFuture = !0;
                    M_$.dtRight = new Date(Z0$);
                    G3u = k9s.market.zclose_hour;
                    e9Z = k9s.market.zclose_minute;
                    M_$.dtRight.setHours(G3u ? G3u : 23);
                    M_$.dtRight.setMinutes(G3u ? e9Z : 59);
                    y6x.r9e(29);
                    M_$.dtRight.setSeconds(y6x.z7A(64, "0"));
                    M_$.dtRight = f3j.market._convertFromMarketTZ(M_$.dtRight, this.dataZone);
                    M_$.dtLeft.setHours(k9s.market.zopen_hour);
                    M_$.dtLeft.setMinutes(k9s.market.zopen_minute);
                    M_$.dtLeft.setSeconds( + "0");
                    M_$.dtLeft = f3j.market._convertFromMarketTZ(M_$.dtLeft, this.dataZone);
                }
                if (M_$.maintainPeriodicity) {
                    M_$.periodicity = {};
                    M_$.periodicity.interval = this.layout.interval;
                    M_$.periodicity.period = this.layout.periodicity;
                }
                f3j.spanLock = !"1";
                h43 = this;
                this.setRange(M_$, function (M0Z) {
                    var N7h;
                    if (!d0c.maintainPeriodicity) {
                        N7h = "l";
                        N7h += "ayou";
                        N7h += "t";
                        h43.layout.setSpan = {
                            base: d0c.base,
                            multiplier: d0c.multiplier
                        };
                        h43.changeOccurred(N7h);
                    }
                    y6x.r72();
                    if (E96 === "ytd" || E96 == "today") {
                        f3j.spanLock = !![]; ;
                    }
                    if (U1O) {
                        U1O(M0Z);
                    }
                });
                function G8V(X_q) {
                    var g2v,
                    v8N,
                    n4h;
                    y6x.E_X(17);
                    X_q.setHours(y6x.v50(1, "0"));
                    y6x.E_X(12);
                    X_q.setMinutes(y6x.z7A("0", 64));
                    g2v =  + "1900428627";
                    v8N = -1436344824;
                    n4h = 2;
                    for (var L3M = "1" | 1; y6x.a5V(L3M.toString(), L3M.toString().length, "16980" ^ 0) !== g2v; L3M++) {
                        X_q.setSeconds(0);
                        X_q.setMilliseconds(0);
                        return X_q;
                    }
                    if (y6x.a5V(n4h.toString(), n4h.toString().length, 96941) !== v8N) {
                        y6x.E_X(12);
                        X_q.setSeconds(y6x.v50("7", 64));
                        X_q.setMilliseconds(2);
                        return X_q;
                    }
                }
            };
            A.prototype.getSpanCandleWidth = function (l40) {
                var j1e,
                M0R,
                A2L,
                O8O,
                R8J,
                I08,
                M61,
                q5X,
                C5H,
                c1O;
                j1e = "m";
                j1e += "on";
                j1e += "t";
                j1e += "h";
                M0R = l40.split(6810 < (951.38, 69.75) ? 7.95e+3 : 537.85 >= ("539.27" - 0, 3945) ? 0x1f00 : ",");
                if (M0R.length < 2) {
                    return;
                }
                A2L = parseFloat(M0R[0]);
                O8O = new Date();
                R8J = new Date();
                if (M0R[1] == "year") {
                    R8J.setFullYear(R8J.getFullYear() - A2L);
                } else if (M0R[1] == j1e) {
                    R8J.setMonth(R8J.getMonth() - A2L);
                } else if (M0R[1] == "day") {
                    R8J.setDate(R8J.getDate() - A2L);
                } else if (M0R["1" << 32] == "week") {
                    R8J.setDate(R8J.getDate() - 7 * A2L);
                }
                y6x.E_X(13);
                var Z6$ = y6x.z7A(1020, 1, 20);
                y6x.r9e(80);
                var v1u = y6x.v50(18, 30, 480);
                y6x.E_X(104);
                var b83 = y6x.z7A(41, 18, 5844, 8, 1);
                I08 = (O8O.getTime() - R8J.getTime()) / Z6$ / v1u / b83 / ("24" << 0);
                y6x.E_X(105);
                I08 = y6x.v50(7, I08, 5);
                M61 = this.chart.width / I08;
                q5X = -231293364;
                C5H = 1753665288;
                c1O = 2;
                for (var k_S = 1; y6x.a5V(k_S.toString(), k_S.toString().length,  + "62140") !== q5X; k_S++) {
                    return M61;
                }
                if (y6x.a5V(c1O.toString(), c1O.toString().length, 88102) !== C5H) {
                    return M61;
                }
            };
            A.prototype.setMaxTicks = function (h8m, W3r) {
                var P7Z;
                if (!W3r) {
                    W3r = {};
                }
                h8m = Math.round(h8m);
                if (h8m < 2) {
                    h8m = 2;
                }
                P7Z = W3r.padding;
                if (!P7Z) {
                    P7Z = 0;
                }
                this.layout.candleWidth = (this.chart.width - P7Z) / h8m;
                if (!this.layout.candleWidth) {
                    this.layout.candleWidth = 8;
                }
                this.chart.maxTicks = Math.round(this.chart.width / this.layout.candleWidth - 0.499);
                if (W3r.padding || W3r.padding === 0) {
                    y6x.r9e(0);
                    this.chart.scroll = y6x.v50(h8m, 1);
                }
            };
            A.prototype.construct = function () {
                var I3E;
                I3E = "c";
                I3E += "h";
                I3E += "ar";
                I3E += "t";
                this.stackPanel("chart", I3E, 1);
                this.adjustPanelPositions();
                this.chart.panel = this.panels[this.chart.name];
                this.cx = 0;
                this.cy = 0;
                this.micropixels = 0;
                this.chart.panel.subholder.appendChild(this.controls.home);
                this.callbackListeners = {};
                this.longHoldTime = 1000;
            };
            A.prototype.addEventListener = function (n74, q9M) {
                var g$5;
                if (!n74) {
                    n74 = "*";
                }
                g$5 = this.callbackListeners[n74];
                if (!g$5) {
                    this.callbackListeners[n74] = g$5 = [];
                }
                g$5.push(q9M);
                return {
                    type: n74,
                    cb: q9M
                };
            };
            A.prototype.removeEventListener = function (N0w, Q0B) {
                var F64,
                h1L;
                F64 = "obj";
                F64 += "e";
                F64 += "ct";
                if (typeof N0w != F64) {
                    N0w = {
                        type: N0w,
                        cb: Q0B
                    };
                }
                if (!N0w.type) {
                    N0w.type = 1920 === 7869 ? (281.59, 510.76) : 7389 != 4930 ? "*" : !!1;
                }
                h1L = this.callbackListeners[N0w.type];
                if (!h1L) {
                    return;
                }
                for (var F7Z = 0; F7Z < h1L.length; F7Z++) {
                    if (h1L[F7Z] === N0w.cb) {
                        h1L.splice(F7Z);
                        if (!h1L.length) {
                            N0w[N0w.type] = null;
                        }
                        return;
                    }
                }
            };
            A.prototype.dispatch = function (b1m, B7c) {
                var T6R;
                if (this.callbacks[b1m]) {
                    this.callbacks[b1m].call(this, B7c);
                }
                T6R = this.callbackListeners[b1m];
                if (T6R) {
                    for (var s6b = 0; s6b < T6R.length; s6b++) {
                        T6R[s6b].call(this, B7c);
                    }
                }
                T6R = this.callbackListeners["*"];
                if (T6R) {
                    for (var g$0 = 0; g$0 < T6R.length; g$0++) {
                        T6R[g$0].call(this, B7c);
                    }
                }
            };
            A.prototype.deleteYAxisIfUnused = function (M6S, f87) {
                var Z8S,
                B3A;
                y6x.x24();
                if (!f87) {
                    return;
                }
                if (f87 === M6S.yAxis) {
                    return;
                }
                for (var A64 in this.chart.seriesRenderers) {
                    Z8S = this.chart.seriesRenderers[A64];
                    if (Z8S.params.yAxis === f87) {
                        if (Z8S.seriesParams.length !== 0) {
                            return;
                        }
                    }
                }
                for (B3A = 0; B3A < M6S.yaxisLHS.length; B3A++) {
                    if (M6S.yaxisLHS[B3A] === f87) {
                        M6S.yaxisLHS.splice(B3A, 1);
                    }
                }
                for (B3A = 1; B3A < M6S.yaxisRHS.length; B3A++) {
                    if (M6S.yaxisRHS[B3A] === f87) {
                        M6S.yaxisRHS.splice(B3A, 1);
                    }
                }
                this.resizeCanvas();
                this.adjustPanelPositions();
            };
            A.prototype.addYAxis = function (Q6k, e_v) {
                var G8B,
                q7M,
                G_M;
                G8B = "l";
                G8B += "e";
                G8B += "f";
                G8B += "t";
                if (!e_v) {
                    return;
                }
                if (!Q6k.yaxisLHS) {
                    Q6k.yaxisLHS = [];
                    Q6k.yaxisRHS = [];
                    if (Q6k.yAxis.position == "right") {
                        Q6k.yaxisRHS.push(Q6k.yAxis);
                    } else {
                        Q6k.yaxisLHS.push(Q6k.yAxis);
                    }
                }
                q7M = Q6k.yaxisLHS.concat(Q6k.yaxisRHS);
                for (var t8$ = 0; t8$ < q7M.length; t8$++) {
                    if (q7M[t8$] === e_v) {
                        return;
                    }
                }
                if (e_v.position === G8B) {
                    Q6k.yaxisLHS.unshift(e_v);
                } else {
                    G_M = "ri";
                    G_M += "ght";
                    e_v.position = G_M;
                    Q6k.yaxisRHS.push(e_v);
                }
                this.preAdjustScroll();
                this.resizeCanvas();
                this.adjustPanelPositions();
                this.postAdjustScroll();
            };
            A.prototype.calculateYAxisPositions = function () {
                var i2S,
                Z3l,
                J4c,
                g1C,
                h_0,
                n23,
                f37,
                d7L,
                S0q;
                i2S = [];
                for (var C_q in this.charts) {
                    i2S.push(C_q);
                }
                for (var d9N in this.panels) {
                    Z3l = this.panels[d9N];
                    if (Z3l.name === Z3l.chart.name)
                        continue;
                    i2S.push(d9N);
                }
                for (var X0Q = 0; X0Q < i2S.length; X0Q++) {
                    J4c = "u";
                    J4c += "ndef";
                    J4c += "ine";
                    J4c += "d";
                    g1C = this.panels[i2S[X0Q]];
                    if (!g1C)
                        continue;
                    h_0 = g1C.name === g1C.chart.name;
                    if (!g1C.yaxisLHS) {
                        g1C.yaxisLHS = [];
                        g1C.yaxisRHS = [];
                        if (g1C.name === g1C.chart.name || g1C.yAxis.position) {
                            if (g1C.yAxis.position == "left") {
                                g1C.yaxisLHS.push(g1C.yAxis);
                            } else {
                                g1C.yaxisRHS.push(g1C.yAxis);
                            };
                        } else {
                            n23 = g1C.chart.panel.yAxis.position;
                            if (!n23 || n23 == "right") {
                                g1C.yaxisRHS.push(g1C.yAxis);
                            } else {
                                g1C.yaxisLHS.push(g1C.yAxis);
                            }
                        }
                    }
                    if (!g1C.yAxis.width) {
                        g1C.yAxis.width = this.yaxisWidth;
                    }
                    g1C.yaxisTotalWidthRight = 0;
                    g1C.yaxisTotalWidthLeft = 0;
                    for (f37 = 0; f37 < g1C.yaxisLHS.length; f37++) {
                        d7L = g1C.yaxisLHS[f37];
                        g1C.yaxisTotalWidthLeft += d7L.width;
                        d7L.justifyRight = d7L.justifyRight === null ? g1C.chart.yAxis.justifyRight : d7L.justifyRight;
                        if (d7L.justifyRight === null) {
                            d7L.justifyRight = !0;
                        }
                    }
                    for (f37 = 0; f37 < g1C.yaxisRHS.length; f37++) {
                        d7L = g1C.yaxisRHS[f37];
                        g1C.yaxisTotalWidthRight += d7L.width;
                    }
                    S0q = 0;
                    for (f37 = 0; f37 < g1C.yaxisLHS.length; f37++) {
                        d7L = g1C.yaxisLHS[f37];
                        d7L.left = S0q;
                        S0q += d7L.width;
                    }
                    S0q = this.width - g1C.yaxisTotalWidthRight;
                    for (f37 = 0; f37 < g1C.yaxisRHS.length; f37++) {
                        d7L = g1C.yaxisRHS[f37];
                        d7L.left = S0q;
                        S0q += d7L.width;
                    }
                    if (typeof this.yaxisLeft != J4c) {
                        g1C.chart.yaxisPaddingRight = this.yaxisLeft;
                    }
                    g1C.yaxisCalculatedPaddingRight = g1C.yaxisTotalWidthRight;
                    if (g1C.chart.yaxisPaddingRight || g1C.chart.yaxisPaddingRight === 0) {
                        g1C.yaxisCalculatedPaddingRight = g1C.chart.yaxisPaddingRight;
                    }
                    g1C.yaxisCalculatedPaddingLeft = g1C.yaxisTotalWidthLeft;
                    if (g1C.chart.yaxisPaddingLeft || g1C.chart.yaxisPaddingLeft === 0) {
                        g1C.yaxisCalculatedPaddingLeft = g1C.chart.yaxisPaddingLeft;
                    }
                    if (h_0) {
                        g1C.left = g1C.yaxisCalculatedPaddingLeft;
                        g1C.right = this.width - g1C.yaxisCalculatedPaddingRight;
                    } else {
                        g1C.left = g1C.chart.panel.left;
                        g1C.right = g1C.chart.panel.right;
                    }
                    g1C.width = g1C.right - g1C.left;
                    g1C.handle.style.left = g1C.left + "px";
                    g1C.handle.style.width = g1C.width + "px";
                    if (h_0) {
                        g1C.chart.left = g1C.left;
                        g1C.chart.right = g1C.right;
                        g1C.chart.width = g1C.right - g1C.left;
                    }
                }
            };
            A.prototype.initializeChart = function (i_X) {
                var J1x,
                G18,
                q$e,
                q3d,
                E3G,
                p$r,
                J_Y,
                A0g,
                s3t,
                K8B,
                N2k,
                W_T,
                e6v,
                h8O,
                B3$,
                O_7,
                n0X;
                J1x = "in";
                J1x += "it";
                J1x += "i";
                J1x += "alizeChart";
                G18 = "0";
                G18 += "px";
                q$e = "abso";
                q$e += "lute";
                q3d = "ca";
                q3d += "n";
                q3d += "vas";
                E3G = "2";
                E3G += "d";
                p$r = "0";
                p$r += "px";
                J_Y = "ab";
                J_Y += "solute";
                if (this.runPrepend("initializeChart", arguments)) {
                    return;
                }
                if (!this.chart.symbolObject.symbol) {
                    this.chart.symbolObject.symbol = this.chart.symbol;
                }
                if (this.locale) {
                    this.setLocale(this.locale);
                }
                if (!this.displayZone && A.defaultDisplayTimeZone) {
                    this.setTimeZone(null, A.defaultDisplayTimeZone);
                }
                this.calculateYAxisPositions();
                this.micropixels = 0;
                if (i_X) {
                    this.chart.container = i_X;
                }
                this.chart.container.stx = this;
                if (!this.chart.container.STXRegistered) {
                    this.chart.container.STXRegistered = !"";
                    A.registeredContainers.push(this.chart.container);
                }
                if (D.isSurface) {
                    if (!this.gesture) {
                        this.gesture = new MSGesture();
                        if (this.manageTouchAndMouse) {
                            this.gesture.target = this.chart.container;
                        } else {
                            this.gesture.target = document.body;
                        }
                        this.gesturePointerId = null;
                    }
                }
                this.registerHTMLElements();
                if (this.chart.canvas && document.createElement("canvas").getContext) {
                    if (!this.chart.canvas.id) {
                        this.chart.container.removeChild(this.chart.canvas);
                        this.chart.canvas = null;
                    }
                    if (this.chart.tempCanvas && !this.chart.tempCanvas.id) {
                        this.chart.container.removeChild(this.chart.tempCanvas);
                        this.chart.tempCanvas = null;
                    }
                    if (this.floatCanvas && !this.floatCanvas.id) {
                        this.chart.container.removeChild(this.floatCanvas);
                        this.floatCanvas = null;
                    }
                } else {
                    if (this.layout.candleWidth < this.minimumCandleWidth) {
                        this.layout.candleWidth = this.minimumCandleWidth;
                    }
                    if (this.layout.candleWidth > ("200" ^ 0)) {
                        this.layout.candleWidth = 8;
                    }
                }
                if (!this.chart.canvas) {
                    this.chart.canvas = document.createElement("canvas");
                }
                if (!this.chart.canvas.getContext) {
                    A0g = "#ie8canva";
                    A0g += "s";
                    this.chart.canvas = this.chart.container.querySelectorAll(A0g)[0];
                    if (!this.chart.canvas.getContext) {
                        if (window.G_vmlCanvasManager) {
                            G_vmlCanvasManager.initElement(this.chart.canvas);
                        }
                    }
                    this.chart.canvas.style.display = "block";
                } else {
                    this.chart.container.appendChild(this.chart.canvas);
                }
                this.chart.canvas.style.position = J_Y;
                this.chart.canvas.style.left = "0px";
                this.chart.context = this.chart.canvas.getContext("2d");
                this.chart.canvas.context = this.chart.context;
                this.chart.context.lineWidth = 1;
                if (!this.chart.tempCanvas) {
                    this.chart.tempCanvas = document.createElement("canvas");
                }
                if (!this.chart.tempCanvas.getContext) {
                    s3t = "#ie8ca";
                    s3t += "nvasTem";
                    s3t += "p";
                    this.chart.tempCanvas = this.chart.container.querySelectorAll(s3t)[0];
                    if (!this.chart.tempCanvas.getContext) {
                        if (window.G_vmlCanvasManager) {
                            G_vmlCanvasManager.initElement(this.chart.tempCanvas);
                        }
                    }
                    this.chart.tempCanvas.style.display = "block";
                } else {
                    this.chart.container.appendChild(this.chart.tempCanvas);
                }
                this.chart.tempCanvas.style.position = "absolute";
                this.chart.tempCanvas.style.left = p$r;
                this.chart.tempCanvas.context = this.chart.tempCanvas.getContext(E3G);
                this.chart.tempCanvas.context.lineWidth = 1;
                if (!this.floatCanvas) {
                    this.floatCanvas = document.createElement(q3d);
                }
                if (!this.floatCanvas.getContext) {
                    this.floatCanvas = this.chart.container.querySelectorAll("#ie8canvasFloat")[0];
                    if (!this.floatCanvas.getContext) {
                        if (window.G_vmlCanvasManager) {
                            G_vmlCanvasManager.initElement(this.chart.tempCanvas);
                        }
                    }
                    this.floatCanvas.style.display = "block";
                } else {
                    this.chart.container.appendChild(this.floatCanvas);
                }
                this.floatCanvas.style.position = q$e;
                this.floatCanvas.style.left = G18;
                this.floatCanvas.context = this.floatCanvas.getContext("2d");
                this.floatCanvas.context.lineWidth = 1;
                this.resizeCanvas();
                if (D.isAndroid) {
                    this.chart.tempCanvas.ontouchstart = function (P4U) {
                        if (P4U.preventDefault) {
                            P4U.preventDefault();
                        }
                    };
                    this.floatCanvas.ontouchstart = function (O0_) {
                        y6x.r72();
                        if (O0_.preventDefault) {
                            O0_.preventDefault();
                        }
                    };
                }
                this.panels.chart.display = this.chart.symbol;
                if (this.chart.symbolDisplay) {
                    this.panels.chart.display = this.chart.symbolDisplay;
                }
                this.adjustPanelPositions();
                this.chart.panel = this.panels[this.chart.name];
                this.calculateYAxisMargins(this.chart.panel.yAxis);
                this.initialWhitespace = this.preferences.whitespace;
                if (this.chart.dataSet && this.chart.dataSet.length > ("0" | 0)) {
                    this.chart.scroll = Math.floor(this.chart.width / this.layout.candleWidth);
                    K8B = Math.round(this.preferences.whitespace / this.layout.candleWidth);
                    this.chart.scroll -= K8B;
                }
                if (D.touchDevice) {
                    N2k = W(".overlayEdit", this.chart.container);
                    W_T = W("#overlayTrashCan", this.chart.container);
                    e6v = W("#vectorTrashCan", this.chart.container);
                    if (N2k) {
                        D.safeClickTouch(N2k, (function (g1U) {
                                return function (Z9x) {
                                    g1U.deleteHighlighted(!!"1", !!({}));
                                };
                            })(this));
                        if (W_T) {
                            D.safeClickTouch(W_T, (function (T_6) {
                                    y6x.r72();
                                    return function (I1S) {
                                        y6x.r72();
                                        T_6.deleteHighlighted(!({}));
                                    };
                                })(this));
                        }
                    } else if (W_T) {
                        D.safeClickTouch(W_T, (function (C2E) {
                                return function (d$b) {
                                    y6x.x24();
                                    C2E.deleteHighlighted(!!({}));
                                };
                            })(this));
                    }
                    if (e6v) {
                        D.safeClickTouch(e6v, (function (o55) {
                                return function (t6n) {
                                    var V0F,
                                    A84,
                                    D4T;
                                    y6x.r72();
                                    V0F = -322045199;
                                    A84 = -1955845742;
                                    D4T = 2;
                                    for (var F9w = 1; y6x.a5V(F9w.toString(), F9w.toString().length, 77815) !== V0F; F9w++) {
                                        o55.deleteHighlighted(!({}));
                                        D4T += 2;
                                    }
                                    if (y6x.P2D(D4T.toString(), D4T.toString().length,  + "46467") !== A84) {
                                        o55.deleteHighlighted(![]);
                                    }
                                    o55.deleteHighlighted(!"");
                                };
                            })(this));
                    }
                }
                if (this.manageTouchAndMouse) {
                    this.registerTouchAndMouseEvents();
                }
                this.chart.container.onmouseout = (function (Q0L) {
                    y6x.x24();
                    return function (g$n) {
                        y6x.r72();
                        Q0L.handleMouseOut(g$n);
                    };
                })(this);
                if (this.controls.chartControls) {
                    this.controls.chartControls.style.display = "block";
                }
                this.abortDrawings();
                this.undoStamps = [];
                for (var F5R in this.panels) {
                    h8O = this.panels[F5R];
                    if (h8O.markerHolder) {
                        this.chart.container.removeChild(h8O.markerHolder);
                        h8O.markerHolder = null;
                    }
                }
                for (var Q81 in this.plugins) {
                    B3$ = this.plugins[Q81];
                    if (B3$.display) {
                        if (B3$.initializeChart) {
                            B3$.initializeChart(this);
                        }
                    }
                }
                if (!this.resizeListenerInitialized) {
                    this.resizeListenerInitialized = !!"1";
                    O_7 = function (L5S) {
                        y6x.r72();
                        return function (W6k) {
                            y6x.r72();
                            L5S.resizeChart();
                        };
                    };
                    if (window.attachEvent) {
                        window.attachEvent("onresize", O_7(this));
                    } else {
                        n0X = O_7(this);
                        window.addEventListener("resize", n0X, !!({}));
                        this.eventListeners.push({
                            "element": window,
                            "event": "resize",
                            "function": n0X
                        });
                    }
                }
                if (this.chart.baseline.userLevel) {
                    this.chart.baseline.userLevel = null;
                }
                this.setResizeTimer(this.resizeDetectMS);
                this.runAppend(J1x, arguments);
            };
            A.prototype.destroy = function () {
                var A6W;
                y6x.x24();
                y6x.E_X(29);
                this.setResizeTimer(y6x.z7A(0, "0"));
                if (this.quoteDriver) {
                    this.quoteDriver.die();
                }
                this.styles = {};
                for (var f50 = 0; f50 < this.eventListeners.length; f50++) {
                    A6W = this.eventListeners[f50];
                    A6W.element.removeEventListener(A6W.event, A6W["function"]);
                }
            };
            A.prototype.handleMouseOut = function (F90) {
                var P$1,
                D8d;
                F90 = F90 || window.event;
                y6x.x24();
                if (!D.withinElement(this.chart.container, F90.pageX, F90.pageY)) {
                    if (this.runPrepend("handleMouseOut", arguments)) {
                        return;
                    }
                    this.undisplayCrosshairs();
                    this.grabbingScreen = !1;
                    this.touches = [];
                    this.touching = !({});
                    if (this.activeDrawing && this.userPointerDown) {
                        this.userPointerDown = ![];
                        this.drawingLine = !({});
                        P$1 = this.backOutY(F90.pageY);
                        D8d = this.backOutX(F90.pageX);
                        this.drawingClick(this.currentPanel, D8d, P$1);
                    }
                    A.insideChart = !!"";
                    this.displaySticky();
                    this.runAppend("handleMouseOut", arguments);
                }
            };
            A.prototype.registerTouchAndMouseEvents = function () {
                var f66,
                G5h,
                R3s,
                z$I,
                E0h,
                H$4,
                C$i,
                t2J,
                o36,
                H7v,
                R5e,
                k5D,
                O4r,
                K8F,
                l31,
                U10,
                W86,
                o85,
                H5I,
                d0b,
                M$X,
                Y3R,
                w4E;
                if (this.touchAndMouseEventsRegistered) {
                    return;
                }
                this.touchAndMouseEventsRegistered = !0;
                f66 = this.chart.container;
                G5h = W("#home", this.controls.chartControls);
                R3s = W("#zoomIn", this.controls.chartControls);
                z$I = W("#zoomOut", this.controls.chartControls);
                if (!D.touchDevice) {
                    E0h = "m";
                    E0h += "ous";
                    E0h += "emove";
                    f66.addEventListener(E0h, (function (p$F) {
                            y6x.r72();
                            return function (Y8d) {
                                p$F.mousemove(Y8d);
                            };
                        })(this), !({}));
                    f66.addEventListener("mousedown", (function (u27) {
                            return function (l4$) {
                                u27.mousedown(l4$);
                            };
                        })(this), !({}));
                    f66.addEventListener("mouseup", (function (G1u) {
                            return function (O45) {
                                G1u.mouseup(O45);
                            };
                        })(this), !({}));
                } else {
                    if (D.isSurface) {
                        f66.addEventListener("mousemove", (function (Y50) {
                                return function (R3o) {
                                    y6x.r72();
                                    Y50.msMouseMoveProxy(R3o);
                                };
                            })(this), !"1");
                        f66.addEventListener("mousedown", (function (Q8t) {
                                return function (J1i) {
                                    Q8t.msMouseDownProxy(J1i);
                                };
                            })(this), !({}));
                        f66.addEventListener("mouseup", (function (C8s) {
                                return function (c7C) {
                                    C8s.msMouseUpProxy(c7C);
                                };
                            })(this), ![]);
                        if (window.navigator.msPointerEnabled) {
                            H$4 = "MSGe";
                            H$4 += "s";
                            H$4 += "tureEnd";
                            f66.addEventListener("MSPointerDown", (function (H74) {
                                    return function (h7r) {
                                        return H74.startProxy(h7r);
                                    };
                                })(this), !({}));
                            f66.addEventListener("MSGestureStart", (function (M4J) {
                                    return function (E2P) {
                                        M4J.gestureInEffect = !"";
                                    };
                                })(this), !1);
                            f66.addEventListener("MSGestureChange", (function (c13) {
                                    y6x.x24();
                                    return function (J6F) {
                                        y6x.x24();
                                        return c13.touchmove(J6F);
                                    };
                                })(this), !!0);
                            f66.addEventListener(H$4, (function (T_M) {
                                    y6x.x24();
                                    return function (Q50) {
                                        y6x.x24();
                                        T_M.gestureInEffect = !!"";
                                        return T_M.touchend(Q50);
                                    };
                                })(this), ![]);
                            f66.addEventListener("MSPointerMove", (function (n4m) {
                                    return function (N0H) {
                                        n4m.moveProxy(N0H);
                                    };
                                })(this), !!0);
                            f66.addEventListener("MSPointerUp", (function (j9v) {
                                    y6x.r72();
                                    return function (w54) {
                                        y6x.r72();
                                        return j9v.endProxy(w54);
                                    };
                                })(this), !"1");
                        } else {
                            C$i = "point";
                            C$i += "ermove";
                            t2J = "M";
                            t2J += "SGestur";
                            t2J += "eEnd";
                            f66.addEventListener("pointerdown", (function (L14) {
                                    y6x.x24();
                                    return function (O8o) {
                                        return L14.startProxy(O8o);
                                    };
                                })(this), !({}));
                            f66.addEventListener("MSGestureStart", (function (R5A) {
                                    return function (o69) {
                                        var k3w,
                                        k$v,
                                        K5p;
                                        y6x.x24();
                                        k3w =  -  + "591875764";
                                        k$v = 2137267686;
                                        K5p = 2;
                                        for (var g2k = 1; y6x.P2D(g2k.toString(), g2k.toString().length, 80545) !== k3w; g2k++) {
                                            R5A.gestureInEffect = !!"";
                                            K5p +=  + "2";
                                        }
                                        if (y6x.a5V(K5p.toString(), K5p.toString().length, 55109) !== k$v) {
                                            R5A.gestureInEffect = !1;
                                        }
                                        R5A.gestureInEffect = !0;
                                    };
                                })(this), !!0);
                            f66.addEventListener("MSGestureChange", (function (o9b) {
                                    y6x.x24();
                                    return function (e$k) {
                                        return o9b.touchmove(e$k);
                                    };
                                })(this), !1);
                            f66.addEventListener(t2J, (function (d_6) {
                                    return function (z_Z) {
                                        d_6.gestureInEffect = !({});
                                        y6x.r72();
                                        return d_6.touchend(z_Z);
                                    };
                                })(this), ![]);
                            f66.addEventListener(C$i, (function (Y95) {
                                    return function (m_V) {
                                        Y95.moveProxy(m_V);
                                    };
                                })(this), ![]);
                            f66.addEventListener("pointerup", (function (D0z) {
                                    y6x.x24();
                                    return function (s9t) {
                                        y6x.r72();
                                        return D0z.endProxy(s9t);
                                    };
                                })(this), !1);
                        }
                    } else {
                        o36 = "touc";
                        o36 += "he";
                        o36 += "nd";
                        H7v = "touchs";
                        H7v += "tart";
                        if (!D.isAndroid && !D.ipad && !D.iphone) {
                            R5e = "mou";
                            R5e += "sed";
                            R5e += "ow";
                            R5e += "n";
                            f66.addEventListener("mousemove", (function (e1_) {
                                    y6x.x24();
                                    return function (O8f) {
                                        e1_.iosMouseMoveProxy(O8f);
                                    };
                                })(this), ![]);
                            f66.addEventListener(R5e, (function (w6C) {
                                    return function (K1C) {
                                        y6x.x24();
                                        w6C.iosMouseDownProxy(K1C);
                                    };
                                })(this), !1);
                            f66.addEventListener("mouseup", (function (m$4) {
                                    return function (O7I) {
                                        m$4.iosMouseUpProxy(O7I);
                                    };
                                })(this), !({}));
                        }
                        f66.addEventListener(H7v, (function (h32) {
                                y6x.x24();
                                return function (g8l) {
                                    y6x.r72();
                                    h32.touchstart(g8l);
                                };
                            })(this), !({}));
                        f66.addEventListener("touchmove", (function (X6q) {
                                return function (e8R) {
                                    y6x.x24();
                                    X6q.touchmove(e8R);
                                };
                            })(this), !({}));
                        f66.addEventListener(o36, (function (U1b) {
                                y6x.r72();
                                return function (c7r) {
                                    y6x.x24();
                                    U1b.touchend(c7r);
                                };
                            })(this), !!"");
                        if (R3s) {
                            k5D = "onMouseO";
                            k5D += "u";
                            k5D += "t";
                            O4r = "onMous";
                            O4r += "e";
                            O4r += "Over";
                            R3s.removeAttribute(O4r);
                            R3s.removeAttribute(k5D);
                        }
                        if (z$I) {
                            K8F = "on";
                            K8F += "MouseO";
                            K8F += "ut";
                            l31 = "o";
                            l31 += "nMo";
                            l31 += "us";
                            l31 += "eOver";
                            z$I.removeAttribute(l31);
                            z$I.removeAttribute(K8F);
                        }
                    }
                }
                U10 =  + "49272161";
                W86 = 1818540857;
                o85 =  + "2";
                y6x.r72();
                for (var J0E = 1; y6x.P2D(J0E.toString(), J0E.toString().length, 43273) !== U10; J0E++) {
                    H5I = ("onwheel" in document.createElement("onwheel")) && ("DOMMouseScroll" in document) ? "onwheel" : document.onmousewheel == undefined ? "DOMMouseScroll" : "DOMMouseScroll";
                    o85 += 2;
                }
                if (y6x.P2D(o85.toString(), o85.toString().length, 96433) !== W86) {
                    d0b = "mous";
                    d0b += "ewheel";
                    M$X = "onwh";
                    M$X += "eel";
                    Y3R = "di";
                    Y3R += "v";
                    w4E = "wh";
                    w4E += "eel";
                    H5I = (w4E in document.createElement(Y3R)) || (M$X in document) ? "wheel" : document.onmousewheel !== undefined ? d0b : "DOMMouseScroll";
                }
                f66.addEventListener(H5I, (function (f0D, Z9c) {
                        y6x.x24();
                        return function (z3j) {
                            f0D.mouseWheel(z3j, Z9c);
                        };
                    })(this, H5I), !({}));
            };
            A.prototype.rightClickHighlighted = function () {
                var U3c,
                w8r,
                A8e,
                M_d,
                z$D;
                U3c = -202793977;
                w8r = 1975550584;
                A8e = 2;
                for (var J4b = 1; y6x.P2D(J4b.toString(), J4b.toString().length, 49597) !== U3c; J4b++) {
                    M_d = "rightCl";
                    M_d += "ickHighlighted";
                    if (this.runPrepend("rightClickHighlighted", arguments)) {
                        return;
                    }
                    this.deleteHighlighted(!0);
                    this.runAppend(M_d, arguments);
                    A8e += 2;
                }
                if (y6x.a5V(A8e.toString(), A8e.toString().length, 53398) !== w8r) {
                    z$D = "rightClickHighlight";
                    z$D += "ed";
                    if (this.runPrepend("rightClickHighlighted", arguments)) {
                        return;
                    }
                    this.deleteHighlighted(![]);
                    this.runAppend(z$D, arguments);
                }
            };
            A.prototype.deleteHighlighted = function (l1P, s5u) {
                var A1w,
                Z46,
                l4P,
                T$u,
                I2m,
                v9e,
                b5b,
                h__,
                c3a,
                Z49,
                M2_,
                e4v,
                b2i,
                U9$;
                A1w = "deleteHighlighte";
                A1w += "d";
                if (this.runPrepend(A1w, arguments)) {
                    return;
                }
                this.cancelTouchSingleClick = !0;
                D.clearCanvas(this.chart.tempCanvas, this);
                for (var c1j = this.drawingObjects.length - "1" * 1; c1j >= 0; c1j--) {
                    Z46 = this.drawingObjects[c1j];
                    if (Z46.highlighted && !Z46.permanent) {
                        l4P = "ve";
                        l4P += "c";
                        l4P += "t";
                        l4P += "or";
                        T$u = Z46.abort();
                        if (!T$u) {
                            I2m = D.shallowClone(this.drawingObjects);
                            this.drawingObjects.splice(c1j, 1);
                            this.undoStamp(I2m, D.shallowClone(this.drawingObjects));
                        }
                        this.changeOccurred(l4P);
                    }
                }
                for (var F_W in this.overlays) {
                    v9e = this.overlays[F_W];
                    if (v9e.highlight && !v9e.permanent) {
                        if (l1P || s5u) {
                            this.rightClickOverlay(F_W, s5u);
                        } else {
                            this.removeOverlay(F_W);
                        }
                    }
                }
                b5b = this.currentPanel.chart;
                for (var F$b in b5b.seriesRenderers) {
                    h__ = b5b.seriesRenderers[F$b];
                    for (var x2g = h__.seriesParams.length - 1; x2g >= "0" >> 0; x2g--) {
                        c3a = h__.seriesParams[x2g];
                        if (c3a.highlight && !c3a.permanent) {
                            h__.removeSeries(c3a.field);
                        }
                    }
                }
                Z49 = !({});
                for (var S$t in b5b.series) {
                    if (b5b.series[S$t].parameters.isComparison) {
                        Z49 = !!"1";
                    }
                }
                if (!Z49) {
                    this.setComparison(![], b5b);
                }
                this.draw();
                if (this.controls.mSticky) {
                    M2_ = "no";
                    M2_ += "n";
                    M2_ += "e";
                    this.controls.mSticky.style.display = M2_;
                    e4v = -1311920926;
                    y6x.E_X(43);
                    b2i = y6x.z7A(0, "759273909");
                    U9$ = 2;
                    for (var Z2B = 1; y6x.a5V(Z2B.toString(), Z2B.toString().length, 69319) !== e4v; Z2B++) {
                        this.controls.mSticky.children[0].innerHTML = "";
                        U9$ +=  + "2";
                    }
                    if (y6x.P2D(U9$.toString(), U9$.toString().length, 68813) !== b2i) {
                        this.controls.mSticky.children[4].innerHTML = "";
                    }
                }
                this.runAppend("deleteHighlighted", arguments);
            };
            A.prototype.panelExists = function (v_i) {
                var J4H;
                for (var p5w in this.panels) {
                    J4H = this.panels[p5w];
                    if (J4H.name == v_i) {
                        return !!({});
                    }
                }
                y6x.x24();
                return !!0;
            };
            A.prototype.hideCrosshairs = function () {
                y6x.x24();
                this.displayCrosshairs = !!0;
            };
            A.prototype.showCrosshairs = function () {
                y6x.x24();
                this.displayCrosshairs = !"";
            };
            A.prototype.grabHandle = function (Q_K) {
                var T8p,
                r8Z;
                T8p = "stx-g";
                T8p += "r";
                T8p += "a";
                T8p += "b";
                r8Z = "g";
                r8Z += "rabH";
                r8Z += "an";
                r8Z += "dle";
                if (this.runPrepend(r8Z, arguments)) {
                    return;
                }
                if (!Q_K) {
                    return;
                }
                A.crosshairY = Q_K.top + this.top;
                A.resizingPanel = Q_K;
                this.drawTemporaryPanel();
                D.appendClassName(Q_K.handle, T8p);
                this.runAppend("grabHandle", arguments);
            };
            A.prototype.releaseHandle = function () {
                var I7M,
                N3X;
                I7M = "rel";
                I7M += "e";
                y6x.r72();
                I7M += "aseHan";
                I7M += "dle";
                N3X = "st";
                N3X += "x-grab";
                if (this.runPrepend("releaseHandle", arguments)) {
                    return;
                }
                D.clearCanvas(this.chart.tempCanvas, this);
                this.resizePanels();
                if (A.resizingPanel) {
                    D.unappendClassName(A.resizingPanel.handle, N3X);
                }
                A.resizingPanel = null;
                this.runAppend(I7M, arguments);
            };
            A.prototype.storePanels = function () {
                var R89,
                C8V;
                if (!this.layout) {
                    this.layout = {};
                }
                R89 = this.layout;
                R89.panels = {};
                for (var W19 in this.panels) {
                    C8V = this.panels[W19];
                    R89.panels[C8V.name] = {
                        "percent": C8V.percent,
                        "display": C8V.display
                    };
                }
            };
            A.prototype.savePanels = function (A6R) {
                this.storePanels();
                if (A6R !== ![]) {
                    this.changeOccurred("layout");
                }
            };
            A.prototype.resolveY = function (o5P) {
                y6x.r72();
                return this.top + o5P;
            };
            A.prototype.resolveX = function (j0R) {
                y6x.r72();
                return this.left + j0R;
            };
            A.prototype.backOutY = function (p8t) {
                y6x.r72();
                return p8t - this.top;
            };
            A.prototype.backOutX = function (I7W) {
                return I7W - this.left;
            };
            A.prototype.cleanupRemovedStudy = function (F75) {
                if (F75.libraryEntry) {
                    if (F75.libraryEntry.removeFN) {
                        F75.libraryEntry.removeFN(this, F75);
                    }
                    if (F75.libraryEntry.feed && F75.libraryEntry.quoteFeed) {
                        this.detachTagAlongQuoteFeed(F75.libraryEntry.feed);
                    }
                }
                for (var l6X in this.plugins) {
                    if (l6X.indexOf((2830 === 4886 ? !"" : "4960" >> 0 >= 858 ?  + "2270" <= 226.71 ?  + "6.25e+3" : "{" : (!!"1", 0x92)) + F75.id + "}") >  -  + "1") {
                        delete this.plugins[l6X];
                    }
                }
                if (this.layout.studies) {
                    delete this.layout.studies[F75.name];
                }
            };
            A.prototype.privateDeletePanel = function (R1B) {
                var m37,
                e27,
                T5l;
                if (this.layout.studies) {
                    m37 = this.layout.studies[R1B.name];
                    if (m37) {
                        this.cleanupRemovedStudy(m37);
                    }
                }
                delete this.panels[R1B.name];
                for (var T5d in D.Studies.studyPanelMap) {
                    if (D.Studies.studyPanelMap[T5d].panel == R1B.name) {
                        delete D.Studies.studyPanelMap[T5d];
                    }
                }
                for (var a83 in this.overlays) {
                    if (this.overlays[a83].panel == R1B.name) {
                        delete this.layout.studies[a83];
                        delete this.overlays[a83]; ;
                    }
                }
                y6x.x24();
                if (R1B.holder) {
                    e27 = "pane";
                    e27 += "lNa";
                    e27 += "me";
                    this.chart.container.removeChild(R1B.holder);
                    T5l = this.getMarkerArray(e27, R1B.name);
                    for (var O$N = 0; O$N < T5l.length; O$N++) {
                        this.removeFromHolder(T5l[O$N]);
                    }
                }
                R1B.handle.parentNode.removeChild(R1B.handle); ;
            };
            A.prototype.panelClose = function (O$2) {
                var c3y;
                if (!O$2) {
                    return;
                }
                if (this.runPrepend("panelClose", arguments)) {
                    return;
                }
                this.cancelTouchSingleClick = !"";
                A.drawingLine = !!0;
                if (O$2.soloing) {
                    this.panelSolo(O$2);
                }
                if (this.charts[O$2.name]) {
                    for (var I8l in this.panels) {
                        c3y = this.panels[I8l];
                        if (c3y.chart.name == O$2.name) {
                            this.privateDeletePanel(c3y);
                        }
                    }
                    delete this.charts[O$2.name];
                } else {
                    this.privateDeletePanel(O$2);
                }
                this.showCrosshairs();
                y6x.x24();
                this.createDataSet();
                this.adjustPanelPositions();
                this.draw();
                this.savePanels();
                this.runAppend("panelClose", arguments);
            };
            A.prototype.deleteAllPanels = function () {
                var p7t;
                for (var H8a in this.panels) {
                    p7t = this.panels[H8a];
                    this.privateDeletePanel(p7t);
                }
                this.layout.panels = {};
                this.panels = {};
            };
            A.prototype.panelUp = function (X9k) {
                var e99,
                J35,
                G5D,
                Y83,
                f8W,
                Y9d,
                Q_q;
                this.cancelTouchSingleClick = !!({});
                A.drawingLine = ![];
                e99 = 201484898;
                J35 =  + "1204040936";
                G5D = 2;
                for (var c_W = 1; y6x.a5V(c_W.toString(), c_W.toString().length,  + "45826") !== e99; c_W++) {
                    this.showCrosshairs();
                    Y83 = {};
                    f8W = 9;
                    G5D += 2;
                }
                if (y6x.a5V(G5D.toString(), G5D.toString().length, 14375) !== J35) {
                    this.showCrosshairs();
                    Y83 = {};
                    f8W = 0;
                }
                for (Y9d in this.panels) {
                    if (Y9d == X9k.name)
                        break;
                    f8W++;
                }
                if (!f8W) {
                    return;
                }
                Q_q = 0;
                for (Y9d in this.panels) {
                    if (Q_q == f8W - 1) {
                        Y83[X9k.name] = X9k;
                    }
                    if (Y9d == X9k.name)
                        continue;
                    Y83[Y9d] = this.panels[Y9d];
                    Q_q++;
                }
                this.panels = Y83;
                this.adjustPanelPositions();
                this.draw();
                this.savePanels();
            };
            A.prototype.panelDown = function (D_a) {
                var l3o,
                E08,
                k2s,
                Z1Q,
                X9u;
                this.cancelTouchSingleClick = !!1;
                A.drawingLine = !({});
                this.showCrosshairs();
                l3o = {};
                y6x.E_X(43);
                E08 = y6x.v50(0, "0");
                for (k2s in this.panels) {
                    if (k2s == D_a.name)
                        break;
                    E08++;
                }
                Z1Q = 0;
                for (k2s in this.panels) {
                    Z1Q++;
                }
                y6x.x24();
                if (E08 == Z1Q - 1) {
                    return;
                }
                X9u = 0;
                for (k2s in this.panels) {
                    if (k2s == D_a.name) {
                        X9u++;
                        continue;
                    }
                    l3o[k2s] = this.panels[k2s];
                    if (X9u == E08 + 1) {
                        l3o[D_a.name] = D_a;
                    }
                    X9u++;
                }
                this.panels = l3o;
                this.adjustPanelPositions();
                this.draw();
                this.savePanels();
            };
            A.prototype.panelSolo = function (r73) {
                var F0D,
                O47;
                this.cancelTouchSingleClick = !0;
                A.drawingLine = !({});
                this.showCrosshairs();
                F0D = !"";
                if (r73.soloing) {
                    O47 = "st";
                    O47 += "x_solo_l";
                    O47 += "it";
                    F0D = !!"";
                    r73.soloing = !({});
                    D.unappendClassName(r73.solo, O47);
                    r73.percent = r73.oldPercent;
                    this.panels.chart.percent = this.panels.chart.oldPercent;
                } else {
                    r73.soloing = !0;
                    D.appendClassName(r73.solo, "stx_solo_lit");
                    if (r73.name == "chart") {
                        r73.oldPercent = r73.percent;
                    } else {
                        r73.oldPercent = r73.percent;
                        this.panels.chart.oldPercent = this.panels.chart.percent;
                        y6x.r9e(40);
                        var f78 = y6x.z7A(19, 20);
                        r73.percent = f78 - this.panels.chart.percent;
                    }
                }
                for (var x38 in this.panels) {
                    this.panels[x38].hidden = F0D;
                }
                this.panels.chart.hidden = ![];
                r73.hidden = ![];
                this.adjustPanelPositions();
                this.draw();
                this.savePanels();
            };
            A.prototype.calculatePanelPercent = function (k96) {
                var z2f;
                z2f = k96.bottom - k96.top;
                y6x.x24();
                k96.percent = z2f / this.chart.canvasHeight;
            };
            A.prototype.resizePanels = function () {
                var U2X,
                B__,
                p$s,
                t6H;
                if (!A.resizingPanel) {
                    return;
                }
                y6x.x24();
                U2X = !!1;
                if (A.crosshairY > this.resolveY(A.resizingPanel.top)) {
                    U2X = !1;
                }
                if (U2X) {
                    t6H = null;
                    for (B__ in this.panels) {
                        if (this.panels[B__] == A.resizingPanel)
                            break;
                        if (this.panels[B__].hidden)
                            continue;
                        t6H = this.panels[B__];
                    }
                    p$s = this.backOutY(A.crosshairY);
                    if (p$s < t6H.top + 30) {
                        y6x.E_X(6);
                        var Z5r = y6x.v50(5970, 20, 150, 2);
                        p$s = t6H.top + Z5r;
                        A.crosshairY = this.resolveY(p$s);
                    }
                    t6H.bottom = p$s;
                    A.resizingPanel.top = p$s;
                    this.calculatePanelPercent(t6H);
                    this.calculatePanelPercent(A.resizingPanel);
                } else {
                    t6H = null;
                    for (B__ in this.panels) {
                        if (this.panels[B__] == A.resizingPanel)
                            break;
                        if (this.panels[B__].hidden)
                            continue;
                        t6H = this.panels[B__];
                    }
                    p$s = this.backOutY(A.crosshairY);
                    if (p$s > A.resizingPanel.bottom - 30) {
                        y6x.r9e(16);
                        var O13 = y6x.z7A(83, 7, 120);
                        p$s = A.resizingPanel.bottom - O13;
                        A.crosshairY = this.resolveY(p$s);
                    }
                    t6H.bottom = p$s;
                    A.resizingPanel.top = p$s;
                    this.calculatePanelPercent(t6H);
                    this.calculatePanelPercent(A.resizingPanel);
                }
                this.adjustPanelPositions();
                this.draw();
                this.savePanels();
            };
            A.prototype.adjustPanelPositions = function () {
                var q2H,
                P6q,
                S0U,
                e1o,
                Z1k,
                p2S,
                N_S,
                U8U,
                h0D,
                Z2p,
                E$9,
                b3x,
                A$H,
                b_V,
                Q8p,
                D1T,
                z9m;
                if (!this.chart.symbol) {
                    return;
                }
                if (this.runPrepend("adjustPanelPositions", arguments)) {
                    return;
                }
                q2H = 0;
                P6q = this.chart.canvasHeight;
                y6x.E_X(29);
                S0U = y6x.v50(32, "0");
                e1o = !"1";
                Z1k = 0;
                p2S = 0;
                N_S = !1;
                for (U8U in this.panels) {
                    h0D = this.panels[U8U];
                    if (isNaN(h0D.percent) || h0D.percent <=  + "0") {
                        h0D.percent = 0.05;
                    }
                    if (h0D.hidden)
                        continue;
                    Z1k += h0D.percent;
                    p2S++;
                    if (h0D.soloing) {
                        N_S = !![];
                    }
                }
                for (U8U in this.panels) {
                    Z2p = "no";
                    Z2p += "ne";
                    E$9 = 0;
                    h0D = this.panels[U8U];
                    if (h0D.hidden) {
                        if (h0D.markerHolder) {
                            h0D.markerHolder.style.display = "none";
                        }
                        continue;
                    }
                    if (!e1o) {
                        e1o = !!1;
                        h0D.up.style.display = "none";
                    } else {
                        if (this.displayIconsUpDown) {
                            h0D.up.style.display = "";
                        }
                    }
                    if (N_S) {
                        if (h0D.soloing) {
                            if (this.displayIconsSolo) {
                                h0D.solo.style.display = "";
                            }
                        } else {
                            b3x = "non";
                            b3x += "e";
                            h0D.solo.style.display = b3x;
                        }
                    } else if (p2S ==  + "1" || p2S == 2) {
                        A$H = "non";
                        A$H += "e";
                        h0D.solo.style.display = A$H;
                    } else {
                        if (this.displayIconsSolo) {
                            h0D.solo.style.display = "";
                        }
                    }
                    if (p2S == 1) {
                        b_V = "n";
                        b_V += "o";
                        b_V += "n";
                        b_V += "e";
                        h0D.down.style.display = b_V;
                    } else {
                        if (this.displayIconsUpDown) {
                            h0D.down.style.display = "";
                        }
                    }
                    if (h0D.editFunction) {
                        h0D.edit.style.display = "";
                    } else {
                        h0D.edit.style.display = Z2p;
                    }
                    h0D.percent = h0D.percent / Z1k;
                    h0D.top = q2H;
                    h0D.bottom = h0D.top + P6q * h0D.percent;
                    h0D.height = h0D.bottom - h0D.top;
                    if (h0D.chart.name == h0D.name) {
                        h0D.chart.top = h0D.top;
                        h0D.chart.bottom = h0D.bottom;
                        h0D.chart.height = h0D.height;
                    }
                    Q8p = h0D.yAxis;
                    if (Q8p.zoom && Q8p.height > 0) {
                        E$9 = Q8p.zoom / Q8p.height;
                    }
                    this.adjustYAxisHeightOffset(h0D, Q8p);
                    Q8p.top = h0D.top + Q8p.topOffset;
                    Q8p.bottom = h0D.bottom - Q8p.bottomOffset;
                    Q8p.height = Q8p.bottom - Q8p.top;
                    if (E$9) {
                        Q8p.zoom = E$9 * Q8p.height;
                        if (Q8p.zoom > Q8p.height) {
                            Q8p.zoom =  + "0";
                        };
                    }
                    q2H = h0D.bottom;
                    if (!Q8p.high && Q8p.high !== 0) {
                        Q8p.high = 100;
                        Q8p.low = 0;
                        y6x.r9e(4);
                        Q8p.shadow = y6x.z7A("100", 0);
                    }
                    Q8p.multiplier = Q8p.height / Q8p.shadow;
                    if (h0D.holder) {
                        D1T = "p";
                        D1T += "x";
                        z9m = "p";
                        z9m += "x";
                        h0D.holder.style.right = "0px";
                        h0D.holder.style.top = h0D.top + "px";
                        h0D.holder.style.left = "0px";
                        h0D.holder.style.height = h0D.height + z9m;
                        h0D.subholder.style.left = h0D.left + "px";
                        h0D.subholder.style.width = h0D.width + "px";
                        h0D.subholder.style.top = "0px";
                        if (Q8p.height >=  + "0") {
                            h0D.subholder.style.height = Q8p.height + D1T;
                        }
                    }
                }
                if (U8U) {
                    this.panels[U8U].down.style.display = "none";
                }
                if (p2S == 2 && !N_S) {
                    this.panels.chart.solo.style.display = "";
                }
                if (this.controls.chartControls && this.panels.chart) {
                    y6x.r9e(106);
                    var D9j = y6x.z7A(6, 6, 26, 3);
                    this.controls.chartControls.style.bottom = this.chart.canvasHeight - this.panels.chart.bottom + D9j + "px";
                }
                this.clearPixelCache();
                this.adjustDrawings();
                this.runAppend("adjustPanelPositions", arguments);
            };
            A.prototype.makeMarkerHelper = function () {
                y6x.r72();
                this.markerHelper = {
                    chartMap: {},
                    classMap: {}
                };
            };
            A.prototype.addToHolder = function (z7q) {
                var w5M,
                s2H,
                x4N,
                R0D;
                w5M = this.panels[z7q.params.panelName];
                if (!w5M) {
                    return;
                }
                if (D.derivedFrom(z7q.params.node, D.Marker.NodeCreator)) {
                    z7q.stxNodeCreator = z7q.params.node;
                    z7q.node = z7q.stxNodeCreator.node;
                } else {
                    z7q.node = z7q.params.node;
                }
                if (!this.markerHelper) {
                    this.makeMarkerHelper();
                }
                if (z7q.params.chartContainer) {
                    this.container.appendChild(z7q.node);
                } else if (z7q.params.includeAxis) {
                    w5M.holder.appendChild(z7q.node);
                } else {
                    w5M.subholder.appendChild(z7q.node);
                }
                s2H = z7q.params.label;
                if (!this.markers[s2H]) {
                    this.markers[s2H] = [];
                }
                this.markers[s2H].push(z7q);
                z7q.chart = w5M.chart;
                if (!this.markerHelper.chartMap[z7q.chart.name]) {
                    this.markerHelper.chartMap[z7q.chart.name] = {
                        dataSetLength: 0,
                        markers: []
                    };
                }
                this.markerHelper.chartMap[z7q.chart.name].markers.push(z7q);
                if (!z7q.className) {
                    x4N = "Marker o";
                    x4N += "bjects mus";
                    x4N += "t have a member className";
                    console.log(x4N);
                }
                R0D = this.markerHelper.classMap[z7q.className];
                if (!R0D) {
                    R0D = this.markerHelper.classMap[z7q.className] = {};
                }
                if (!R0D[z7q.params.panelName]) {
                    R0D[z7q.params.panelName] = [];
                }
                R0D[z7q.params.panelName].push(z7q);
                this.setMarkerTick(z7q);
            };
            A.prototype.getMarkerArray = function (U0g, N6n) {
                var G_0,
                r_N;
                G_0 = [];
                y6x.x24();
                for (var M0h in this.markers) {
                    for (var i1v = 0; i1v < this.markers[M0h].length; i1v++) {
                        r_N = this.markers[M0h][i1v];
                        if (U0g == "panelName") {
                            if (r_N.params.panelName == N6n) {
                                G_0.push(r_N);
                            }
                        } else if (U0g == "label") {
                            if (M0h == N6n) {
                                G_0.push(r_N);
                            }
                        } else if (U0g == "all") {
                            G_0.push(r_N);
                        }
                    }
                }
                return G_0;
            };
            A.prototype.removeFromHolder = function (r4B) {
                var q7G,
                n67,
                r_s,
                Y2T,
                F89,
                j6v;
                q7G = this.panels[r4B.params.panelName];
                if (q7G) {
                    if (r4B.node.parentNode == q7G.holder) {
                        q7G.holder.removeChild(r4B.node);
                    } else if (r4B.node.parentNode == q7G.subholder) {
                        q7G.subholder.removeChild(r4B.node);
                    } else if (r4B.node.parentNode == this.container) {
                        this.container.removeChild(r4B.node);
                    }
                }
                y6x.r72();
                n67 = this.markers[r4B.params.label];
                if (!n67) {
                    return;
                }
                for (r_s = 0; r_s < n67.length; r_s++) {
                    if (n67[r_s] === r4B) {
                        n67.splice(r_s, 1);
                        break;
                    }
                }
                Y2T = this.markerHelper.chartMap[r4B.chart.name];
                if (Y2T) {
                    for (r_s = 0; r_s < Y2T.markers.length; r_s++) {
                        if (Y2T.markers[r_s] === r4B) {
                            Y2T.markers.splice(r_s,  + "1");
                            break;
                        }
                    }
                }
                F89 = this.markerHelper.classMap[r4B.className];
                if (F89) {
                    j6v = F89[r4B.params.panelName];
                    if (j6v) {
                        for (r_s = 0; r_s < j6v.length; r_s++) {
                            if (j6v[r_s] === r4B) {
                                j6v.splice(r_s, 1);
                                break;
                            }
                        }
                    }
                }
            };
            A.prototype.establishMarkerTicks = function () {
                var s7y,
                C_O;
                if (!this.markerHelper) {
                    this.makeMarkerHelper();
                }
                s7y = this.markerHelper.chartMap;
                for (var E$k in s7y) {
                    C_O = s7y[E$k];
                    if (C_O.dataSetLength == this.charts[E$k].dataSet.length)
                        continue;
                    for (var W2Y = 0; W2Y < C_O.markers.length; W2Y++) {
                        this.setMarkerTick(C_O.markers[W2Y]);
                    }
                }
            };
            A.prototype.futureTickIfDisplayed = function (F9G) {
                var Y78,
                S5k,
                A_$,
                w58,
                e0p,
                k3h,
                k4$,
                I3L,
                V9s;
                Y78 = F9G.chart;
                if (Y78.dataSet.length < 1) {
                    return;
                }
                S5k = Y78.xaxis[Y78.xaxis.length -  + "1"].DT;
                y6x.E_X(38);
                y6x.x24();
                var z$U = y6x.v50(53993, 6000, 7);
                S5k = new Date(S5k.getTime() - this.timeZoneOffset * z$U);
                if (F9G.params.x > S5k) {
                    return;
                }
                A_$ = Y78.maxTicks - Y78.dataSegment.length;
                w58 = Y78.dataSet.length + A_$;
                k4$ = new Date(Y78.dataSet[Y78.dataSet.length - 1].DT);
                I3L = this.standardMarketIterator(k4$, null, Y78);
                V9s = F9G.params.x.getTime();
                for (var L5m = Y78.dataSet.length; L5m < w58; L5m++) {
                    e0p = k4$.getTime();
                    k4$ = I3L.next();
                    k3h = k4$.getTime();
                    if (k3h == V9s) {
                        F9G.tick = L5m;
                        return;
                    } else if (k3h > V9s && e0p < V9s) {
                        y6x.r9e(4);
                        F9G.tick = Math.max(y6x.z7A(L5m, 1), 0);
                        return;
                    }
                }
            };
            A.prototype.setMarkerTick = function (U5u) {
                var l3c,
                c1p,
                c9_,
                w91,
                e3$,
                p6_;
                l3c = U5u.chart;
                if (U5u.params.xPositioner == "master" && U5u.params.x) {
                    U5u.tick = Math.floor(U5u.params.x / this.layout.periodicity);
                    return;
                } else if (U5u.params.xPositioner == "date" && U5u.params.x) {
                    w91 = U5u.params.x.getTime();
                    for (var R8k = 0; R8k < l3c.dataSet.length; R8k++) {
                        e3$ = l3c.dataSet[R8k];
                        c9_ = e3$.DT.getTime();
                        c1p = c9_;
                        if (R8k > 0) {
                            c1p = l3c.dataSet[R8k - 1].DT.getTime();
                        }
                        if (c9_ == w91) {
                            U5u.tick = R8k;
                            return;
                        } else if (c9_ > w91 && c1p < w91) {
                            y6x.r9e(4);
                            U5u.tick = Math.max(y6x.z7A(R8k, 1), 0);
                            return;
                        } else if (w91 < c9_) {
                            U5u.tick = null;
                            return;
                        }
                    }
                    if (l3c.dataSet.length < 1) {
                        return;
                    }
                    p6_ = new Date(l3c.dataSet[R8k - 1].DT);
                    if (p6_.getTime() < w91) {
                        U5u.params.future = !![];
                    }
                    U5u.tick = null; ;
                }
            };
            A.prototype.positionMarkers = function () {
                y6x.r72();
                var r55;
                r55 = this;
                if (!r55.markerHelper) {
                    return;
                }
                if (this.markerDelay || this.markerDelay === 0) {
                    if (!this.markerTimeout) {
                        this.markerTimeout = setTimeout(k9O, this.markerDelay);
                    }
                } else {
                    k9O();
                }
                function k9O() {
                    var q_f,
                    y3$,
                    p7_,
                    W7M,
                    O6t,
                    x6p;
                    q_f = "positionMark";
                    q_f += "e";
                    q_f += "rs";
                    y3$ = "positionMa";
                    y3$ += "rkers";
                    if (r55.runPrepend(y3$, arguments)) {
                        return;
                    }
                    r55.markerTimeout = null;
                    for (var G4O in r55.markerHelper.classMap) {
                        for (var p7a in r55.markerHelper.classMap[G4O]) {
                            p7_ = r55.markerHelper.classMap[G4O][p7a];
                            W7M = r55.panels[p7a];
                            if (p7_.length) {
                                O6t = {
                                    stx: r55,
                                    arr: p7_,
                                    panel: W7M
                                };
                                O6t.firstTick = W7M.chart.dataSet.length - W7M.chart.scroll;
                                O6t.lastTick = O6t.firstTick + W7M.chart.dataSegment.length;
                                x6p = p7_[0].constructor.placementFunction;
                                if (x6p) {
                                    x6p(O6t);
                                } else {
                                    r55.defaultMarkerPlacement(O6t);
                                }
                            }
                        }
                    }
                    r55.runAppend(q_f, arguments);
                }
            };
            A.prototype.addChart = function (i_U, y$b) {
                y6x.x24();
                y$b.name = i_U;
                this.charts[i_U] = y$b;
            };
            A.prototype.createPanel = function (n_B, f$R, o$Q, y7u) {
                var I49,
                b3j,
                c7K,
                Y0x;
                y6x.x24();
                if (this.runPrepend("createPanel", arguments)) {
                    return;
                }
                if (!y7u) {
                    y7u = "chart";
                }
                I49 = this.chart.canvasHeight;
                if (!o$Q) {
                    y6x.r9e(17);
                    o$Q = y6x.v50(0.20, I49);
                }
                y6x.r9e(23);
                b3j = y6x.z7A(o$Q, I49);
                y6x.E_X(4);
                c7K = y6x.v50(1, b3j);
                for (var y6q in this.panels) {
                    Y0x = this.panels[y6q];
                    Y0x.percent *= c7K;
                }
                this.stackPanel(n_B, f$R, b3j, y7u);
                this.adjustPanelPositions();
                this.savePanels(!!"");
                this.runAppend("createPanel", arguments);
            };
            A.prototype.configurePanelControls = function (N0_) {
                var G8u,
                b1M,
                c8T,
                Q7D,
                L8a,
                e2O,
                t1d,
                X9B;
                G8u = "n";
                G8u += "o";
                G8u += "n";
                G8u += "e";
                b1M = ".stx-";
                b1M += "ico-edit";
                c8T = ".s";
                c8T += "tx-i";
                c8T += "co-focus";
                Q7D = ".s";
                Q7D += "tx";
                Q7D += "-";
                Q7D += "ico-up";
                L8a = ".stx-panel-con";
                L8a += "trol";
                e2O = N0_.name == N0_.chart.name;
                N0_.icons = W(L8a, N0_.holder);
                N0_.close = N0_.icons.children[4];
                N0_.close = W(".stx-ico-close", N0_.icons).parentNode;
                D.appendClassName(N0_.icons, "stx-show");
                N0_.title = W(".stx-panel-title", N0_.icons);
                N0_.up = W(Q7D, N0_.icons).parentNode;
                N0_.solo = W(c8T, N0_.icons).parentNode;
                N0_.down = W(".stx-ico-down", N0_.icons).parentNode;
                N0_.edit = W(b1M, N0_.icons).parentNode;
                if (!this.displayIconsUpDown) {
                    N0_.up.style.display = "none";
                }
                if (!this.displayIconsUpDown) {
                    N0_.down.style.display = G8u;
                }
                if (!this.displayIconsSolo) {
                    N0_.solo.style.display = "none";
                }
                if (!this.displayIconsClose) {
                    t1d = "n";
                    t1d += "o";
                    t1d += "n";
                    t1d += "e";
                    N0_.close.style.display = t1d;
                }
                if (!this.displayPanelResize) {
                    N0_.handle.style.display = "none";
                }
                N0_.title.innerHTML = "";
                N0_.title.appendChild(document.createTextNode(N0_.display));
                if (e2O) {
                    X9B = "stx-char";
                    X9B += "t-";
                    X9B += "pa";
                    X9B += "nel";
                    D.appendClassName(N0_.title, "chart-title");
                    D.appendClassName(N0_.icons, X9B);
                }
                if (!D.touchDevice || D.isSurface) {
                    N0_.icons.onmouseover = (function (g1b) {
                        y6x.x24();
                        return function (m68) {
                            g1b.hideCrosshairs();
                        };
                    })(this);
                }
                if (!D.touchDevice || D.isSurface) {
                    N0_.icons.onmouseout = (function (a28) {
                        return function (X7Y) {
                            y6x.x24();
                            a28.showCrosshairs();
                        };
                    })(this);
                }
                if (!D.touchDevice || D.isSurface) {
                    N0_.handle.onmouseover = (function (p85) {
                        return function () {
                            y6x.x24();
                            p85.hideCrosshairs();
                        };
                    })(this);
                }
                if (!D.touchDevice || D.isSurface) {
                    N0_.handle.onmouseout = (function (n6V) {
                        return function () {
                            n6V.showCrosshairs();
                        };
                    })(this);
                }
                if (D.touchDevice) {
                    N0_.handle.ontouchstart = (function (S2N, Y$b) {
                        y6x.r72();
                        return function (c5K) {
                            if (S2N.resizingPanel) {
                                return;
                            }
                            c5K.preventDefault();
                            y6x.x24();
                            S2N.grabHandle(Y$b);
                        };
                    })(this, N0_);
                    N0_.handle.ontouchend = (function (L50) {
                        y6x.r72();
                        return function (c3K) {
                            c3K.preventDefault();
                            L50.releaseHandle();
                        };
                    })(this);
                }
                N0_.handle.onmousedown = (function (M9M, w3N) {
                    return function (f_q) {
                        y6x.r72();
                        if (!f_q) {
                            f_q = event;
                        }
                        M9M.grabHandle(w3N);
                    };
                })(this, N0_);
                N0_.handle.onmouseup = (function (x6w) {
                    return function (a0D) {
                        if (!a0D) {
                            a0D = event;
                        }
                        y6x.r72();
                        x6w.releaseHandle();
                    };
                })(this);
                D.safeClickTouch(N0_.close, (function (b$3, G9o) {
                        y6x.x24();
                        return function () {
                            b$3.panelClose(G9o);
                        };
                    })(this, N0_));
                D.safeClickTouch(N0_.up, (function (A4U, E1M) {
                        y6x.x24();
                        return function () {
                            A4U.panelUp(E1M);
                        };
                    })(this, N0_));
                D.safeClickTouch(N0_.down, (function (q_7, l70) {
                        return function () {
                            q_7.panelDown(l70);
                        };
                    })(this, N0_));
                D.safeClickTouch(N0_.solo, (function (f77, j4P) {
                        y6x.x24();
                        return function () {
                            f77.panelSolo(j4P);
                        };
                    })(this, N0_));
                if (N0_.name == "chart") {
                    N0_.close.style.display = "none";
                };
            };
            A.prototype.stackPanel = function (U76, m6j, R7$, r9z) {
                var M$x,
                f$G,
                B5M,
                J6j,
                p6K,
                t2i,
                K37,
                B7E;
                M$x = "s";
                M$x += "tackPa";
                M$x += "n";
                M$x += "el";
                f$G = "c";
                f$G += "q-pan";
                f$G += "el";
                f$G += "-name";
                B5M = "stx-";
                B5M += "s";
                B5M += "u";
                B5M += "bholder";
                if (this.runPrepend("stackPanel", arguments)) {
                    return;
                }
                if (!r9z) {
                    r9z = "chart";
                }
                J6j = this.charts[r9z];
                y6x.E_X(107);
                p6K = y6x.v50(r9z, m6j);
                t2i = null;
                if (p6K) {
                    U76 = J6j.symbol;
                    if (J6j.symbolDisplay) {
                        U76 = J6j.symbolDisplay;
                    }
                    t2i = J6j.yAxis;
                }
                K37 = this.panels[m6j] = new A.Panel(m6j, t2i);
                if (!p6K && J6j.yAxis) {
                    K37.yAxis.width = J6j.yAxis.width; ;
                }
                K37.percent = R7$;
                K37.chart = J6j;
                K37.display = U76;
                K37.holder = D.newChild(this.container, "div", "stx-holder");
                K37.subholder = D.newChild(K37.holder, "div", B5M);
                y6x.E_X(12);
                K37.subholder.style.zIndex = y6x.v50("1", 32);
                K37.holder.setAttribute(f$G, m6j);
                K37.subholder.setAttribute("cq-panel-name", m6j);
                B7E = p6K ? "stx-panel-chart" : "stx-panel-study";
                D.appendClassName(K37.holder, B7E);
                K37.subholder.appendChild(this.controls.iconsTemplate.cloneNode(!!({})));
                K37.handle = this.controls.handleTemplate.cloneNode(!![]);
                this.container.appendChild(K37.handle);
                K37.handle.id = null;
                K37.handle.panel = K37;
                this.configurePanelControls(K37);
                this.resizeCanvas();
                this.runAppend(M$x, arguments);
            };
            A.prototype.setPanelEdit = function (Z2G, j3j) {
                Z2G.editFunction = j3j;
                D.safeClickTouch(Z2G.edit, j3j);
                this.adjustPanelPositions();
            };
            A.prototype.drawPanels = function () {
                y6x.r72();
                var d_E,
                N00,
                T$r,
                X09,
                S2F,
                H1Y,
                u0t,
                X3G;
                if (this.runPrepend("drawPanels", arguments)) {
                    return;
                }
                d_E = ![];
                for (var c_M in this.panels) {
                    N00 = "p";
                    N00 += "x";
                    T$r = "stx-sho";
                    T$r += "w";
                    X09 = this.panels[c_M];
                    X09.axisDrawn = ![];
                    if (X09.title.innerHTML != X09.display) {
                        X09.title.innerHTML = "";
                        X09.title.appendChild(document.createTextNode(X09.display));
                    }
                    D.appendClassName(X09.icons, T$r);
                    if (X09.hidden) {
                        S2F = "n";
                        S2F += "o";
                        S2F += "n";
                        S2F += "e";
                        H1Y = "s";
                        H1Y += "tx";
                        H1Y += "-sho";
                        H1Y += "w";
                        D.unappendClassName(X09.icons, H1Y);
                        X09.handle.style.display = "none";
                        X09.holder.style.display = S2F;
                        continue;
                    } else {
                        u0t = "n";
                        u0t += "one";
                        if (!this.displayIconsUpDown) {
                            X09.up.style.display = "none";
                        }
                        if (!this.displayIconsUpDown) {
                            X09.down.style.display = "none";
                        }
                        if (!this.displayIconsSolo) {
                            X09.solo.style.display = u0t;
                        }
                        X09.holder.style.display = "block";
                    }
                    if (!d_E) {
                        X09.handle.style.display = "none";
                        d_E = !!1;
                        continue;
                    }
                    X3G = X09.top;
                    X3G = Math.round(X3G) + 0.5;
                    this.plotLine(X09.left, X09.right, X3G, X3G, this.canvasStyle("stx_panel_border"), "segment", this.chart.context, ![], {});
                    if (!this.displayPanelResize) {
                        X09.handle.style.display = "none";
                    } else {
                        X09.handle.style.display = "";
                    }
                    y6x.r9e(0);
                    var J7Y = y6x.v50(0, 2);
                    X09.handle.style.top = X3G - X09.handle.offsetHeight / J7Y + N00; ;
                }
                this.runAppend("drawPanels", arguments);
            };
            A.prototype.touchSingleClick = function (m8v, G63, w4D) {
                var a1S,
                q7k;
                a1S = this;
                q7k = arguments;
                return function () {
                    y6x.x24();
                    (function () {
                        var C0d,
                        w0G,
                        c2z;
                        if (!this.cancelTouchSingleClick) {
                            if (this.runPrepend("touchSingleClick", q7k)) {
                                return;
                            }
                            if (this.editingAnnotation) {
                                return;
                            }
                            this.clicks = {
                                s1MS:  - ("1" >> 0),
                                e1MS: -1,
                                s2MS:  -  + "1",
                                e2MS: -1
                            };
                            if (!this.displayCrosshairs) {
                                return;
                            }
                            if (!this.displayInitialized) {
                                return;
                            }
                            if (this.openDialog !== "") {
                                return;
                            }
                            if (G63 < this.left || G63 > this.right || w4D < this.top || w4D > this.bottom) {
                                return;
                            }
                            C0d = this.backOutY(A.crosshairY);
                            w0G = this.backOutX(A.crosshairX);
                            this.currentPanel = this.whichPanel(C0d);
                            if (!this.currentVectorParameters.vectorType || !D.Drawing[this.currentVectorParameters.vectorType] || !new D.Drawing[this.currentVectorParameters.vectorType]().dragToDraw) {
                                if (!this.drawingClick(this.currentPanel, w0G, C0d)) {
                                    if (!this.layout.crosshair) {
                                        A.crosshairY = 0;
                                        A.crosshairX = 0;
                                        this.cx = this.backOutX(A.crosshairX);
                                        this.cy = this.backOutY(A.crosshairY);
                                        this.findHighlights();
                                        A.crosshairY = w4D;
                                        A.crosshairX = G63;
                                        c2z = this.container.getBoundingClientRect();
                                        this.top = c2z.top;
                                        this.left = c2z.left;
                                        this.right = this.left + this.width;
                                        this.bottom = this.top + this.height;
                                        this.cx = this.backOutX(A.crosshairX);
                                        this.cy = this.backOutY(A.crosshairY);
                                        if (this.currentPanel && this.currentPanel.chart.dataSet) {
                                            this.crosshairTick = this.tickFromPixel(this.cx, this.currentPanel.chart);
                                            this.crosshairValue = this.adjustIfNecessary(this.currentPanel, this.crosshairTick, this.valueFromPixel(this.cy, this.currentPanel));
                                        }
                                        this.headsUpHR();
                                        this.findHighlights(!!"1");
                                    }
                                }
                                if (!this.currentVectorParameters.vectorType) {
                                    this.dispatch("tap", {
                                        stx: this,
                                        panel: this.currentPanel,
                                        x: w0G,
                                        y: C0d
                                    });
                                }
                            }
                        }
                        a1S.cancelTouchSingleClick = ![];
                        this.runAppend("touchSingleClick", q7k);
                    }).apply(a1S, q7k);
                };
            };
            A.prototype.touchDoubleClick = function (u$A, L5$, I5l) {
                var f5j,
                O4P;
                f5j = "touchDoubleCl";
                f5j += "i";
                f5j += "ck";
                if (L5$ < this.left || L5$ > this.right || I5l < this.panels.chart.top || I5l > this.panels.chart.bottom) {
                    return;
                }
                if (this.editingAnnotation) {
                    return;
                }
                if (this.runPrepend("touchDoubleClick", arguments)) {
                    return;
                }
                if (A.drawingLine) {
                    this.undo();
                } else {
                    if (this.anyHighlighted) {
                        this.deleteHighlighted();
                    } else {
                        O4P = this.currentPanel.yAxis;
                        if (O4P.scroll == (O4P.initialMarginTop - O4P.initialMarginBottom) / 2 && O4P.zoom == O4P.initialMarginTop + O4P.initialMarginBottom) {
                            this.home();
                        } else {
                            this.calculateYAxisMargins(this.currentPanel.yAxis); ;
                        }
                        this.draw();
                    }
                }
                y6x.x24();
                this.clicks = {
                    s1MS: -1,
                    e1MS: -1,
                    s2MS: -1,
                    e2MS: -1
                };
                this.runAppend(f5j, arguments);
            };
            A.prototype.touchmove = function (q94) {
                var e3i,
                v1c,
                N24,
                o$Y,
                j$W,
                p9y,
                U9X,
                b8j,
                T8A,
                D6N,
                A4g,
                Y_T,
                E4z,
                C2b,
                D_p,
                I3h,
                O2m,
                x$e,
                A96,
                O$A,
                I1r,
                a0T,
                z8h,
                I5$,
                Q_B,
                U1N,
                L9a,
                A1y,
                a$7,
                q7x,
                j4e,
                v1V,
                E1H,
                P32,
                t1i,
                A_r,
                m6Z,
                i$K,
                X0b,
                P_H,
                n8k,
                w9m,
                r1T;
                e3i = "free";
                e3i += "fo";
                e3i += "rm";
                v1c = "n";
                v1c += "on";
                v1c += "e";
                if (!this.displayInitialized) {
                    return;
                }
                if (this.openDialog !== "") {
                    return;
                }
                if (A.ignoreTouch === !!({})) {
                    return;
                }
                N24 = [];
                if (q94 && q94.touches && q94.touches.length == 1) {
                    if (Math.pow(this.clicks.x - q94.touches[0].clientX, 2) + Math.pow(this.clicks.y - q94.touches[0].clientY, 2) <= ("16" ^ 0)) {
                        return;
                    }
                }
                if (!this.overYAxis || this.controls && this.controls.crossX && this.controls.crossX.style.display != v1c) {
                    if (q94 && q94.preventDefault && this.captureTouchEvents) {
                        q94.preventDefault();
                    }
                    if (q94) {
                        q94.stopPropagation();
                    }
                }
                o$Y = new Date().getTime();
                if (this.clicks.s2MS == -1) {
                    this.clicks.e1MS = o$Y;
                    if (this.clicks.e1MS - this.clicks.s1MS < 25) {
                        return;
                    }
                } else {
                    this.clicks.e2MS = o$Y;
                    if (this.clicks.e2MS - this.clicks.s2MS < 25) {
                        return;
                    }
                }
                if (D.isSurface) {
                    if (this.mouseMode) {
                        return;
                    }
                    if (!q94.pointerId) {
                        q94.pointerId = this.gesturePointerId;
                    }
                    if ((!this.grabbingScreen || A.resizingPanel) && !this.overrideGesture) {
                        if (q94.detail == q94.MSGESTURE_FLAG_INERTIA) {
                            this.gesture.stop();
                            return; ;
                        }
                    }
                    for (var d6A = 0; d6A < this.touches.length; d6A++) {
                        if (this.touches[d6A].pointerId == q94.pointerId) {
                            j$W = Math.abs(this.touches[d6A].pageX - q94.clientX);
                            p9y = Math.abs(this.touches[d6A].pageY - q94.clientY);
                            y6x.E_X(108);
                            U9X = Math.sqrt(y6x.v50(p9y, j$W, p9y, j$W));
                            if (!U9X) {
                                return;
                            }
                            this.clicks.e1MS = new Date().getTime();
                            if (this.clicks.e1MS - this.clicks.s1MS < 50) {
                                return;
                            }
                            if (this.touches[d6A].pageX == q94.clientX && this.touches[d6A].pageY == q94.clientY) {
                                return;
                            }
                            this.touches[d6A].pageX = q94.clientX;
                            this.touches[d6A].pageY = q94.clientY;
                            break;
                        }
                    }
                    if (d6A ===  + "0") {
                        this.movedPrimary = !0;
                    } else {
                        this.movedSecondary = !!1;
                    }
                    if (!this.gestureInEffect && d6A == this.touches.length) {
                        return;
                    }
                    this.changedTouches = [{
                            pointerId: q94.pointerId,
                            pageX: q94.clientX,
                            pageY: q94.clientY
                        }
                    ];
                    N24 = this.touches;
                    if (this.gestureInEffect && !N24.length) {
                        N24 = this.changedTouches;
                    }
                } else {
                    N24 = q94.touches;
                    this.changedTouches = q94.changedTouches;
                }
                b8j = this.crosshairXOffset;
                T8A = this.crosshairYOffset;
                if (this.activeDrawing && this.activeDrawing.name == e3i) {
                    b8j = 0;
                    T8A =  + "0";
                }
                if (this.runPrepend("touchmove", arguments)) {
                    return;
                }
                if (A.resizingPanel) {
                    Y_T = N24[0];
                    D6N = Y_T.pageX;
                    A4g = Y_T.pageY;
                    y6x.r9e(0);
                    this.mousemoveinner(y6x.v50(D6N, b8j), y6x.z7A(A4g, T8A));
                    return;
                }
                if (this.moveB !=  - ("1" >> 0)) {
                    this.touchMoveTime = new Date();
                }
                this.moveA = this.moveB;
                this.moveB = N24[0].pageX;
                if (N24.length == 1) {
                    C2b = N24[0];
                    D6N = C2b.pageX;
                    A4g = C2b.pageY;
                    this.pinchingScreen = 0;
                    y6x.E_X(0);
                    this.mousemoveinner(y6x.v50(D6N, b8j), y6x.v50(A4g, T8A));
                    D_p = this.whichPanel(A4g);
                    this.overXAxis = A4g >= this.top + this.chart.panel.yAxis.bottom && A4g <= this.top + this.chart.panel.bottom && A.insideChart;
                    if (!D_p) {
                        this.overYAxis = !!0;
                    } else {
                        this.overYAxis = (D6N >= D_p.right || D6N <= D_p.left) && A.insideChart;
                    }
                } else if (N24.length == 2 && this.allowZoom) {
                    if (!this.displayCrosshairs) {
                        return;
                    }
                    I3h = N24[0];
                    O2m = I3h.pageX;
                    x$e = I3h.pageY;
                    A96 = N24[ + "1"];
                    O$A = A96.pageX;
                    I1r = A96.pageY;
                    y6x.E_X(109);
                    E4z = Math.sqrt(y6x.v50(O$A, x$e, I1r, x$e, O$A, O2m, O2m, I1r));
                    y6x.r9e(0);
                    var G5a = y6x.z7A(0, 2);
                    this.pinchingCenter = Math.min(O2m, O$A) + (Math.max(O2m, O$A) - Math.min(O2m, O$A)) / G5a;
                    a0T = Math.round(this.gestureStartDistance - E4z);
                    z8h = !this.layout.crosshair && !this.currentVectorParameters.vectorType;
                    if (z8h) {
                        this.pinchingScreen = 5;
                    }
                    this.clearPixelCache();
                    if (this.pinchingScreen < 2) {
                        if (D.isSurface && (!this.movedPrimary || !this.movedSecondary)) {
                            return;
                        }
                        if (O2m < this.pt.x1 && O$A < this.pt.x2 || O2m > this.pt.x1 && O$A > this.pt.x2 || x$e < this.pt.y1 && I1r < this.pt.y2 || x$e > this.pt.y1 && I1r > this.pt.y2) {
                            this.pinchingScreen = 0;
                        } else {
                            this.pinchingScreen++;
                            if (this.pinchingScreen < 2) {
                                return;
                            }
                        }
                    }
                    this.pt = {
                        x1: O2m,
                        x2: O$A,
                        y1: x$e,
                        y2: I1r
                    };
                    if (this.pinchingScreen === 0) {
                        I5$ = -104355696;
                        Q_B = -1492616767;
                        U1N =  + "2";
                        for (var e3_ = 1; y6x.a5V(e3_.toString(), e3_.toString().length, 55364) !== I5$; e3_++) {
                            y6x.r9e(23);
                            this.mousemoveinner(y6x.v50(O2m, b8j), y6x.z7A(x$e, T8A, y6x.r9e(4)));
                            this.gestureStartDistance = E4z;
                            y6x.E_X(29);
                            U1N += y6x.z7A(0, "2");
                        }
                        if (y6x.P2D(U1N.toString(), U1N.toString().length, 98382) !== Q_B) {
                            y6x.r9e(0);
                            this.mousemoveinner(y6x.z7A(O2m, b8j), y6x.v50(x$e, T8A));
                            this.gestureStartDistance = E4z;
                        }
                    } else {
                        L9a = Math.asin((Math.max(I1r, x$e) - Math.min(I1r, x$e)) / E4z);
                        if (Math.abs(a0T) < 12 && !z8h) {
                            this.moveCount++;
                            if (this.moveCount == 4) {
                                this.pinchingScreen = 0;
                                y6x.r9e(17);
                                this.moveCount = y6x.v50(1, "0");
                                return;
                            }
                        } else {
                            this.moveCount =  + "0";
                        }
                        if (L9a < ("1" ^ 0) || !this.goneVertical && L9a < 1.37) {
                            if (!this.currentPanel) {
                                return;
                            }
                            A1y = this.currentPanel.chart;
                            this.goneVertical = !1;
                            E4z = this.pt.x2 - this.pt.x1;
                            a$7 = this.grabStartValues.t2 - this.grabStartValues.t1;
                            y6x.r9e(110);
                            var z8a = y6x.z7A(6, 10, 0, 10, 3);
                            q7x = this.grabStartValues.t1 + a$7 / z8a;
                            y6x.r9e(23);
                            j4e = y6x.z7A(E4z, a$7);
                            if (j4e < this.minimumCandleWidth) {
                                j4e = this.minimumCandleWidth;
                            }
                            v1V = this.layout.candleWidth;
                            this.setCandleWidth(j4e, A1y);
                            if (A1y.maxTicks < this.minimumZoomTicks) {
                                this.setCandleWidth(v1V, A1y);
                                return;
                            }
                            y6x.r9e(17);
                            this.micropixels = y6x.z7A(1, "0");
                            E1H = this.pixelFromTick(Math.round(q7x), A1y);
                            y6x.E_X(111);
                            var F5J = y6x.v50(14, 11, 5, 22);
                            P32 = this.pt.x1 - this.left + Math.round(E4z / F5J);
                            y6x.E_X(4);
                            t1i = y6x.z7A(E1H, P32);
                            y6x.r9e(23);
                            A_r = y6x.v50(t1i, j4e);
                            m6Z = Math.round(A_r);
                            A1y.scroll -= m6Z;
                            y6x.r9e(4);
                            this.microscroll = y6x.v50(m6Z, A_r);
                            this.micropixels = j4e * this.microscroll;
                            this.draw();
                        } else {
                            i$K = this.currentPanel.chart.panel.yAxis;
                            this.goneVertical = !!1;
                            i$K.zoom = this.grabStartZoom + (this.gestureStartDistance - E4z);
                            if (this.grabStartZoom < i$K.height) {
                                if (i$K.zoom >= i$K.height) {
                                    y6x.E_X(13);
                                    var X6Z = y6x.z7A(20, 20, 0);
                                    i$K.zoom = i$K.height - X6Z;
                                }
                            } else {
                                X0b = -1998206991;
                                P_H = -1504059305;
                                y6x.r9e(17);
                                n8k = y6x.v50(1, "2");
                                for (var F0l = 1; y6x.a5V(F0l.toString(), F0l.toString().length, 53422) !== X0b; F0l++) {
                                    if (i$K.zoom <= i$K.height) {
                                        y6x.r9e(112);
                                        var E6s = y6x.v50(3, 2, 18, 2);
                                        i$K.zoom = i$K.height + E6s;
                                    }
                                    n8k += 2;
                                }
                                if (y6x.a5V(n8k.toString(), n8k.toString().length, 66934) !== P_H) {
                                    if (i$K.zoom > i$K.height) {
                                        y6x.E_X(0);
                                        var Z40 = y6x.z7A(1, 7);
                                        i$K.zoom = i$K.height * Z40;
                                    }
                                }
                            }
                            this.draw(); ;
                        }
                    }
                } else if (N24.length == 3 && A.allowThreeFingerTouch) {
                    if (!this.displayCrosshairs) {
                        return;
                    }
                    w9m = N24[0];
                    r1T = w9m.pageX;
                    E4z = this.grabStartX - r1T;
                    y6x.E_X(113);
                    var k_0 = y6x.z7A(5, 15, 28, 10, 2);
                    this.grabEndPeriodicity = this.grabStartPeriodicity + Math.round(E4z / k_0);
                    if (this.grabEndPeriodicity < 1) {
                        this.grabEndPeriodicity = 1;
                    }
                    if (typeof headsUp != "undefined") {
                        y6x.E_X(114);
                        var I3l = y6x.z7A(14, 16716, 1857, 10, 2);
                        y6x.r9e(0);
                        var z4x = y6x.v50(395, 4342);
                        y6x.r9e(115);
                        var M0_ = y6x.z7A(8542, 93780, 14, 12);
                        y6x.r9e(116);
                        var T1L = y6x.v50(8239, 2059, 4, 4, 8232);
                        y6x.r9e(117);
                        var g_J = y6x.z7A(423, 7, 5508);
                        y6x.r9e(10);
                        var e3Z = y6x.z7A(584, 7019, 2341, 5);
                        headsUp.period.innerHTML = this.grabEndPeriodicity + ("5808" << 0 > (I3l,  + "7289") ? "m" : ( + "285.03", 635.22) >= z4x ? M0_ : T1L != (g_J, e3Z) ? " " : (336.54, !!({}))) + this.layout.interval;
                        if (this.grabEndPeriodicity > 1) {
                            headsUp.period.innerHTML += (7472, 7.84) !== (587.01, 3367) ? (8927, 536.67) !== ("629" | 32, 756.35) ? "s" : 0x1d7b : 2.24e+3;
                        }
                    }
                }
                this.runAppend("touchmove", arguments);
            };
            A.prototype.touchstart = function (x_B) {
                var a3N,
                n_4,
                A3p,
                x1d,
                I5C,
                d1T,
                S_0,
                R6V,
                g1w,
                k57,
                D1R,
                J9x,
                O42,
                W0v,
                P99,
                x1W,
                R81,
                T3$,
                z3A,
                T1A,
                h_4,
                t67,
                M_a,
                Y4S,
                H0z;
                if (A.ignoreTouch) {
                    return;
                }
                if (D.isSurface) {
                    this.movedPrimary = !!0;
                    this.movedSecondary = ![];
                } else {
                    if (this.touchingEvent) {
                        clearTimeout(this.touchingEvent);
                    }
                    this.touching = !![];
                    this.touches = x_B.touches;
                    this.changedTouches = x_B.changedTouches;
                }
                if (A.resizingPanel) {
                    return;
                }
                a3N = this.crosshairXOffset;
                n_4 = this.crosshairYOffset;
                if (this.runPrepend("touchstart", arguments)) {
                    return;
                }
                if (this.manageTouchAndMouse && x_B && x_B.preventDefault && this.captureTouchEvents) {
                    x_B.preventDefault();
                }
                this.hasDragged = ![];
                this.doubleFingerMoves = 0;
                y6x.E_X(43);
                this.moveCount = y6x.z7A(0, "0");
                this.twoFingerStart = !1;
                if (this.touches.length ==  + "1" || this.touches.length == 2) {
                    if (this.changedTouches.length == 1) {
                        S_0 = Date.now();
                        this.clicks.x = this.changedTouches[0].pageX;
                        this.clicks.y = this.changedTouches["0" << 32].pageY;
                        if (S_0 - this.clicks.e1MS <  + "250") {
                            this.cancelTouchSingleClick = !!1;
                            this.clicks.s2MS = S_0;
                        } else {
                            this.cancelTouchSingleClick = !!"";
                            this.clicks.s1MS = S_0;
                            this.clicks.e1MS = -1;
                            this.clicks.s2MS = -1;
                            this.clicks.e2MS = -1;
                        }
                    }
                    this.touchMoveTime = Date.now();
                    this.moveA = this.touches[0].pageX;
                    this.moveB = -1;
                    y6x.r9e(17);
                    R6V = this.touches[y6x.z7A(1, "0")];
                    I5C = R6V.pageX;
                    d1T = R6V.pageY;
                    g1w = this.container.getBoundingClientRect();
                    this.top = g1w.top;
                    this.left = g1w.left;
                    this.right = this.left + this.width;
                    this.bottom = this.top + this.height;
                    if (this.touches.length == 1) {
                        k57 = this.cy = this.backOutY(d1T);
                        this.currentPanel = this.whichPanel(k57);
                    }
                    if (!this.currentPanel) {
                        this.currentPanel = this.chart.panel;
                    }
                    if (I5C >= this.left && I5C <= this.right && d1T >= this.top && d1T <= this.bottom) {
                        A.insideChart = !!"1";
                        this.overXAxis = d1T >= this.top + this.chart.panel.yAxis.bottom && d1T <= this.top + this.chart.panel.bottom;
                        this.overYAxis = I5C >= this.currentPanel.right || I5C <= this.currentPanel.left;
                        for (var G7Q = 0; G7Q < this.drawingObjects.length; G7Q++) {
                            D1R = this.drawingObjects[G7Q];
                            if (D1R.highlighted) {
                                J9x = D1R.highlighted;
                                this.cy = this.backOutY(d1T);
                                this.cx = this.backOutX(I5C);
                                this.crosshairTick = this.tickFromPixel(this.cx, this.currentPanel.chart);
                                this.crosshairValue = this.adjustIfNecessary(this.currentPanel, this.crosshairTick, this.valueFromPixel(this.cy, this.currentPanel));
                                this.findHighlights(!!({}));
                                if (D1R.highlighted) {
                                    this.repositioningDrawing = D1R;
                                    return;
                                } else {
                                    this.anyHighlighted = !0;
                                    D1R.highlighted = J9x; ;
                                }
                            }
                        }
                        x_B.stopPropagation();
                    } else {
                        A.insideChart = ![];
                    }
                    O42 = this.currentVectorParameters.vectorType && this.currentVectorParameters.vectorType !== "";
                    if (!this.layout.crosshair && !O42 && A.insideChart && !this.touchNoPan) {
                        if ((this.layout.chartType == "baseline_delta" || this.layout.chartType == "baseline_delta_mountain") && this.chart.baseline.userLevel !== ![]) {
                            W0v = this.valueFromPixelUntransform(this.cy - 5, this.currentPanel);
                            P99 = this.valueFromPixelUntransform(this.cy + 5, this.currentPanel);
                            y6x.E_X(44);
                            var w72 = y6x.z7A(11, 8, 8);
                            x1W = this.chart.right - parseInt(getComputedStyle(this.controls.baselineHandle).width, w72);
                            if (this.chart.baseline.actualLevel < W0v && this.chart.baseline.actualLevel > P99 && this.backOutX(R6V.pageX) > x1W) {
                                this.repositioningBaseline = {
                                    lastDraw: Date.now()
                                };
                                return;
                            }
                        }
                        for (A3p in this.panels) {
                            x1d = this.panels[A3p];
                            if (x1d.highlighted) {
                                this.grabHandle(x1d);
                                return;
                            }
                        }
                        this.grabbingScreen = !!({});
                        this.yToleranceBroken = !({});
                        y6x.r9e(0);
                        this.grabStartX = y6x.v50(I5C, a3N);
                        y6x.E_X(0);
                        this.grabStartY = y6x.z7A(d1T, n_4);
                        this.grabStartScrollX = this.currentPanel.chart.scroll;
                        this.grabStartScrollY = this.currentPanel.yAxis.scroll;
                        this.swipeStart(this.currentPanel.chart);
                        setTimeout((function (B5j) {
                                return function () {
                                    B5j.grabbingHand();
                                };
                            })(this), 100);
                    } else {
                        this.grabbingScreen = !({});
                        if (A.insideChart) {
                            if (D.Drawing[this.currentVectorParameters.vectorType] && new D.Drawing[this.currentVectorParameters.vectorType]().dragToDraw) {
                                this.userPointerDown = !!({});
                                A.crosshairX = I5C;
                                A.crosshairY = d1T;
                                if (this.currentPanel && this.currentPanel.chart.dataSet) {
                                    this.crosshairTick = this.tickFromPixel(this.backOutX(A.crosshairX), this.currentPanel.chart);
                                    this.crosshairValue = this.adjustIfNecessary(this.currentPanel, this.crosshairTick, this.valueFromPixel(this.backOutY(A.crosshairY), this.currentPanel));
                                }
                                this.drawingClick(this.currentPanel, this.backOutX(I5C), this.backOutY(d1T));
                                this.headsUpHR();
                                return;
                            }
                        }
                    }
                }
                if (this.touches.length ==  + "2") {
                    this.cancelLongHold = !0;
                    this.swipe.end = !!1;
                    if (!this.displayCrosshairs && !this.touchNoPan || !A.insideChart) {
                        return;
                    }
                    R81 = this.touches[1];
                    T3$ = R81.pageX;
                    z3A = R81.pageY;
                    for (A3p in this.panels) {
                        x1d = this.panels[A3p];
                        if (x1d.highlighted) {
                            this.grabHandle(x1d);
                            return;
                        }
                    }
                    T1A = this.currentPanel.chart;
                    y6x.r9e(109);
                    this.gestureStartDistance = Math.sqrt(y6x.z7A(T3$, d1T, z3A, d1T, T3$, I5C, I5C, z3A));
                    this.pt = {
                        x1: I5C,
                        x2: T3$,
                        y1: d1T,
                        y2: z3A
                    };
                    this.grabbingScreen = !!({});
                    y6x.E_X(0);
                    this.grabStartX = y6x.z7A(I5C, a3N);
                    y6x.E_X(30);
                    h_4 = -y6x.z7A(0, "1772115696");
                    t67 = -775507687;
                    M_a = 2;
                    for (var z9z = 1; y6x.P2D(z9z.toString(), z9z.toString().length, 54879) !== h_4; z9z++) {
                        y6x.r9e(0);
                        this.grabStartY = y6x.z7A(d1T, n_4);
                        this.grabStartScrollX = this.currentPanel.chart.scroll;
                        this.grabStartScrollY = this.currentPanel.yAxis.scroll;
                        this.grabStartCandleWidth = this.layout.candleWidth;
                        this.grabStartZoom = this.whichYAxis(this.currentPanel).zoom;
                        M_a += 2;
                    }
                    if (y6x.a5V(M_a.toString(), M_a.toString().length, 41155) !== t67) {
                        y6x.E_X(118);
                        this.grabStartY = y6x.v50(d1T, n_4);
                        this.grabStartScrollX = this.currentPanel.chart.scroll;
                        this.grabStartScrollY = this.currentPanel.yAxis.scroll;
                        this.grabStartCandleWidth = this.layout.candleWidth;
                        this.grabStartZoom = this.whichYAxis(this.currentPanel).zoom;
                    }
                    this.grabStartPt = this.pt;
                    this.grabStartValues = {
                        x1: this.pt.x1,
                        x2: this.pt.x2,
                        y1: this.valueFromPixel(this.pt.y1 - this.top, this.currentPanel),
                        y2: this.valueFromPixel(this.pt.y2 - this.top, this.currentPanel),
                        t1: this.tickFromPixel(this.pt.x1 - this.left, T1A),
                        t2: this.tickFromPixel(this.pt.x2 - this.left, T1A)
                    };
                    this.twoFingerStart = !!({});
                    setTimeout((function (g97) {
                            return function () {
                                y6x.x24();
                                g97.grabbingHand();
                            };
                        })(this), 100);
                } else if (this.touches.length == 3) {
                    if (!this.displayCrosshairs) {
                        return;
                    }
                    Y4S = this.touches[ + "0"];
                    H0z = Y4S.pageX;
                    this.grabStartX = H0z;
                    this.grabStartPeriodicity = this.layout.periodicity;
                }
                if (this.touches.length == 1) {
                    this.mouseTimer = Date.now();
                    this.longHoldTookEffect = ![];
                    if (this.longHoldTime) {
                        this.startLongHoldTimer();
                    }
                }
                this.runAppend("touchstart", arguments);
            };
            A.prototype.swipeStart = function (k8X) {
                var e2l;
                if (this.swipe && this.swipe.interval) {
                    clearInterval(this.swipe.interval);
                }
                this.swipe.velocity =  + "0";
                this.swipe.amplitude = 0;
                this.swipe.frame = k8X.scroll;
                y6x.x24();
                this.swipe.micropixels = this.micropixels;
                this.swipe.timestamp = Date.now();
                this.swipe.chart = this.currentPanel.chart;
                this.swipe.end = !!0;
                y6x.r9e(4);
                this.swipe.timeConstant = y6x.z7A("325", 0);
                this.swipe.cb = null;
                e2l = this;
                requestAnimationFrame(function () {
                    e2l.swipeSample();
                });
            };
            A.prototype.swipeSample = function () {
                var E0I,
                H9o,
                b$T,
                N3$,
                g4g,
                v3G,
                W_p,
                n9R,
                o_E,
                A5c,
                a12,
                h6x;
                E0I =  + "888961686";
                H9o =  -  + "1073339605";
                b$T =  + "2";
                for (var r7G = "1" | 1; y6x.P2D(r7G.toString(), r7G.toString().length, 3135) !== E0I; r7G++) {
                    N3$ = this.swipe;
                    y6x.E_X(29);
                    b$T += y6x.z7A(32, "2");
                }
                if (y6x.a5V(b$T.toString(), b$T.toString().length, 42143) !== H9o) {
                    N3$ = this.swipe;
                }
                if (N3$.end) {
                    return;
                }
                g4g = this;
                A5c =  + "20";
                v3G = Date.now();
                W_p = v3G - N3$.timestamp;
                if (W_p < A5c) {
                    requestAnimationFrame(function () {
                        y6x.r72();
                        g4g.swipeSample();
                    });
                    return;
                }
                a12 = D.touchDevice ?  + "0.4" : 0.8;
                N3$.timestamp = v3G;
                n9R = (N3$.chart.scroll - N3$.frame) * this.layout.candleWidth + this.micropixels - N3$.micropixels;
                N3$.frame = N3$.chart.scroll;
                N3$.micropixels = this.micropixels;
                y6x.r9e(119);
                o_E = y6x.z7A(n9R, 1000, W_p, 1);
                h6x = a12 * o_E +  + "0.2" * this.swipe.velocity;
                if (Math.abs(h6x) > Math.abs(N3$.velocity)) {
                    N3$.velocity = h6x;
                }
                if (Math.abs(n9R) < 6) {
                    N3$.velocity =  + "0"; ;
                }
                requestAnimationFrame(function () {
                    y6x.r72();
                    g4g.swipeSample();
                });
            };
            A.prototype.swipeRelease = function () {
                var I1h,
                u1Y;
                I1h = this.swipe;
                if (I1h.velocity > 3000) {
                    I1h.velocity = 3000;
                }
                if (I1h.velocity < -3000) {
                    I1h.velocity = -3000;
                }
                y6x.r72();
                if (I1h.velocity > 10 || I1h.velocity <  -  + "10") {
                    y6x.E_X(4);
                    var I5G = y6x.z7A(15, 14);
                    I1h.amplitude = "0.8" * I5G * I1h.velocity;
                    I1h.scroll = I1h.chart.scroll;
                    I1h.target = I1h.amplitude;
                    I1h.timestamp = Date.now();
                    u1Y = this;
                    requestAnimationFrame(function () {
                        y6x.r72();
                        u1Y.autoscroll();
                    });
                }
            };
            A.prototype.scrollTo = function (J2T, w7k, F7$) {
                var F7W,
                q9y;
                F7W = this.swipe;
                F7W.end = !!"1";
                F7W.amplitude = F7W.target = (w7k - J2T.scroll) * this.layout.candleWidth;
                F7W.timeConstant = 100;
                F7W.timestamp = Date.now();
                F7W.scroll = J2T.scroll;
                y6x.r72();
                F7W.chart = J2T;
                F7W.cb = F7$;
                q9y = this;
                requestAnimationFrame(function () {
                    q9y.autoscroll();
                });
            };
            A.prototype.autoscroll = function () {
                var D$6,
                O$z,
                u9h,
                T4c,
                H2b;
                D$6 = this;
                O$z = this.swipe;
                if (O$z.amplitude) {
                    O$z.elapsed = Date.now() - O$z.timestamp;
                    T4c = -O$z.amplitude * Math.exp(-O$z.elapsed / O$z.timeConstant);
                    if (T4c > 0.5 || T4c < -0.5) {
                        H2b = (O$z.target + T4c) / this.layout.candleWidth;
                        O$z.chart.scroll = O$z.scroll + Math.round(H2b);
                        this.draw();
                        requestAnimationFrame(function () {
                            D$6.autoscroll();
                        });
                    } else {
                        if (O$z.cb) {
                            O$z.cb();
                        }
                    }
                }
            };
            A.prototype.touchend = function (x09) {
                var D0j,
                s_m,
                z_F,
                h7U,
                k7M,
                k_4;
                D0j = "tou";
                D0j += "c";
                D0j += "hend";
                y6x.x24();
                s_m = "t";
                s_m += "ouchend";
                if (A.ignoreTouch) {
                    return;
                }
                this.swipe.end = !![];
                if (D.isSurface) {}
                else {
                    this.touches = x09.touches;
                    this.changedTouches = x09.changedTouches;
                }
                if (this.runPrepend(s_m, arguments)) {
                    return;
                }
                this.cancelLongHold = !![];
                if (this.touches.length <= 1) {
                    if (this.layout.crosshair || this.currentVectorParameters.vectorType) {
                        if (!this.touches.length || !this.twoFingerStart) {
                            this.grabbingScreen = !1;
                        }
                    }
                }
                if (this.touches.length) {
                    this.grabStartX = -1;
                    this.grabStartY = -1;
                }
                if (!this.touches.length) {
                    this.touchingEvent = setTimeout((function (D55) {
                                return function () {
                                    D55.touching = ![];
                                };
                            })(this), 500);
                    if (A.resizingPanel) {
                        this.releaseHandle();
                        return;
                    }
                    this.pinchingScreen = null;
                    this.pinchingCenter = null;
                    this.goneVertical = !!0;
                    this.grabbingScreen = ![];
                } else {
                    if (A.resizingPanel) {
                        return;
                    }
                }
                if (this.changedTouches.length == 1) {
                    if (this.repositioningDrawing) {
                        this.changeOccurred("vector");
                        D.clearCanvas(this.chart.tempCanvas, this);
                        this.repositioningDrawing = null;
                        this.draw();
                        if (!this.layout.crosshair && !this.currentVectorParameters.vectorType) {
                            this.findHighlights(![], !"");
                        }
                        return;
                    }
                    if (this.repositioningBaseline) {
                        this.repositioningBaseline = null;
                        y6x.E_X(0);
                        var r81 = y6x.z7A(1, 1);
                        this.chart.panel.yAxis.scroll = this.pixelFromPriceTransform(this.chart.baseline.userLevel, this.chart.panel) - (this.chart.panel.yAxis.top + this.chart.panel.yAxis.bottom) / r81;
                        this.draw();
                        return;
                    }
                    z_F = Date.now();
                    y6x.E_X(20);
                    var c8e = y6x.v50(17, 0, 18);
                    h7U = this.touches.length + c8e;
                    if (this.clicks.s2MS == -1) {
                        this.clicks.e1MS = z_F;
                        if (!this.currentVectorParameters.vectorType || !D.Drawing[this.currentVectorParameters.vectorType] || !new D.Drawing[this.currentVectorParameters.vectorType]().dragToDraw) {
                            if (this.clicks.e1MS - this.clicks.s1MS <  + "750" && !this.longHoldTookEffect && !this.hasDragged) {
                                setTimeout(this.touchSingleClick(h7U, this.clicks.x, this.clicks.y), 200); ;
                            } else {
                                this.clicks = {
                                    s1MS: -1,
                                    e1MS: -1,
                                    s2MS: -1,
                                    e2MS: -1
                                };
                            }
                        }
                        this.userPointerDown = !({});
                        if (this.activeDrawing && this.activeDrawing.dragToDraw) {
                            k7M = this.backOutY(this.changedTouches[0].pageY) + this.crosshairYOffset;
                            k_4 = this.backOutX(this.changedTouches[0].pageX) + this.crosshairXOffset;
                            this.drawingClick(this.currentPanel, k_4, k7M);
                            return;
                        }
                    } else {
                        this.clicks.e2MS = z_F;
                        if (this.clicks.e2MS - this.clicks.s2MS < 250) {
                            this.touchDoubleClick(h7U, this.clicks.x, this.clicks.y);
                        } else {
                            this.clicks = {
                                s1MS: -1,
                                e1MS: -1,
                                s2MS:  -  + "1",
                                e2MS: -1
                            };
                        }
                    }
                    if (!this.layout.crosshair && !this.currentVectorParameters.vectorType && h7U == 1 || this.twoFingerStart && !this.touches.length) {
                        this.swipeRelease();
                    }
                } else {
                    if (this.grabEndPeriodicity != -1 && !isNaN(this.grabEndPeriodicity)) {
                        if (this.isDailyInterval(this.layout.interval) || this.allowIntradayNMinute) {
                            this.setPeriodicityV2(this.grabEndPeriodicity);
                        }
                        this.grabEndPeriodicity = -1;
                    }
                }
                if (!this.touches.length) {
                    this.twoFingerStart = !"1";
                }
                this.runAppend(D0j, arguments);
            };
            A.prototype.startProxy = function (c$a) {
                if (c$a.pointerType == 4 || c$a.pointerType == "mouse") {
                    this.mouseMode = !!1;
                } else {
                    this.mouseMode = ![];
                }
                if (this.mouseMode) {
                    return;
                }
                this.touches[this.touches.length] = {
                    pointerId: c$a.pointerId,
                    pageX: c$a.clientX,
                    pageY: c$a.clientY
                };
                y6x.x24();
                this.changedTouches = [{
                        pointerId: c$a.pointerId,
                        pageX: c$a.clientX,
                        pageY: c$a.clientY
                    }
                ];
                if (!this.gestureInEffect && this.touches.length == 1) {
                    this.gesturePointerId = c$a.pointerId;
                    this.overrideGesture = !!"";
                    if (!this.gesture) {
                        return;
                    }
                    this.gesture.addPointer(c$a.pointerId);
                    this.touchstart(c$a);
                } else {
                    this.gesture.stop();
                    this.touchstart(c$a);
                }
            };
            A.prototype.moveProxy = function (v$A) {
                y6x.r72();
                var L1s;
                L1s = "m";
                L1s += "ou";
                L1s += "se";
                if (v$A.pointerType == 4 || v$A.pointerType == L1s) {
                    this.mouseMode = !0;
                } else {
                    this.mouseMode = !1;
                }
                if (this.mouseMode) {
                    return;
                }
                if (!this.gestureInEffect) {
                    this.touchmove(v$A);
                }
            };
            A.prototype.endProxy = function (y2O) {
                var X9n;
                y6x.x24();
                if (this.mouseMode) {
                    return;
                }
                X9n = this.touches.length;
                for (var z41 = 0; z41 < this.touches.length; z41++) {
                    if (this.touches[z41].pointerId == y2O.pointerId) {
                        this.touches.splice(z41, 1);
                        break;
                    }
                }
                if (z41 == X9n) {
                    this.touches = [];
                    this.grabbingScreen = ![];
                    this.touching = !({});
                    return;
                }
                this.changedTouches = [{
                        pointerId: y2O.pointerId,
                        pageX: y2O.clientX,
                        pageY: y2O.clientY
                    }
                ];
                if (!this.gestureInEffect) {
                    this.touchend(y2O);
                }
            };
            A.prototype.msMouseMoveProxy = function (p2l) {
                y6x.r72();
                if (this.touches.length || !this.mouseMode) {
                    return;
                }
                this.mousemove(p2l);
            };
            A.prototype.msMouseDownProxy = function (F76) {
                if (!this.mouseMode) {
                    return;
                }
                this.mousedown(F76);
            };
            A.prototype.msMouseUpProxy = function (F8w) {
                var V$n,
                n2I,
                I9r;
                if (!this.mouseMode) {
                    return;
                }
                V$n = -485496806;
                y6x.E_X(12);
                y6x.x24();
                n2I = -y6x.z7A("1405822949", 64);
                y6x.r9e(29);
                I9r = y6x.v50(64, "2");
                for (var e2u = 1; y6x.P2D(e2u.toString(), e2u.toString().length, 460) !== V$n; e2u++) {
                    this.mouseup(F8w);
                    I9r += 2;
                }
                if (y6x.a5V(I9r.toString(), I9r.toString().length, 76509) !== n2I) {
                    this.mouseup(F8w);
                }
            };
            A.prototype.iosMouseMoveProxy = function (f5V) {
                if (this.touching) {
                    return;
                }
                this.mousemove(f5V);
            };
            A.prototype.iosMouseDownProxy = function (c1i) {
                if (this.touching) {
                    this.mouseMode = !!"";
                    return;
                }
                this.mouseMode = !!"1";
                this.mousedown(c1i);
            };
            A.prototype.iosMouseUpProxy = function (J9O) {
                y6x.x24();
                if (this.touching) {
                    return;
                }
                this.mouseup(J9O);
            };
            A.prototype.rawWatermark = function (G9h, T4K, a5G, e6p) {
                y6x.r72();
                this.canvasFont("stx_watermark", G9h);
                G9h.fillStyle = this.defaultColor;
                G9h.globalAlpha = 0.5;
                this.chart.context.textBaseline = "alphabetic";
                G9h.fillText(e6p, T4K, a5G);
                G9h.globalAlpha = 1;
            };
            A.prototype.watermark = function (h5e, D6z) {
                var r3F,
                D7g,
                z1_,
                Z55,
                g29;
                r3F = "b";
                r3F += "otto";
                r3F += "m";
                D7g = "o";
                D7g += "bje";
                D7g += "ct";
                if (D6z && typeof D6z != D7g) {
                    D6z = {
                        h: arguments[1],
                        v: arguments[2],
                        text: arguments[3]
                    };
                }
                D6z = {
                    h: D6z.h || "left",
                    v: D6z.v || r3F,
                    text: D6z.text || "",
                    hOffset: D6z.hOffset ||  + "10",
                    vOffset: D6z.vOffset || 20
                };
                if (!this.chart.context) {
                    return;
                }
                z1_ = this.panels[h5e];
                if (!z1_ || z1_.hidden) {
                    return;
                }
                Z55 = z1_.bottom - D6z.vOffset;
                if (D6z.v == "top") {
                    Z55 = z1_.top + D6z.vOffset;
                } else if (D6z.v == "middle") {
                    y6x.E_X(64);
                    var Y3q = y6x.v50(1, 1, 1);
                    Z55 = (z1_.top + z1_.bottom) / Y3q;
                }
                this.chart.context.save();
                this.canvasFont("stx_watermark");
                this.canvasColor("stx_watermark");
                this.chart.context.textBaseline = "alphabetic";
                y6x.r72();
                g29 = z1_.left + D6z.hOffset;
                if (D6z.h == "right") {
                    g29 = z1_.right - D6z.hOffset;
                } else if (D6z.h == "center") {
                    y6x.E_X(28);
                    var D7T = y6x.z7A(16, 14, 0);
                    g29 = (z1_.right + z1_.left - this.chart.context.measureText(D6z.text).width) / D7T;
                }
                this.chart.context.globalAlpha =  + "0.5";
                this.chart.context.fillText(D6z.text, g29, Z55);
                this.chart.context.globalAlpha =  + "1";
                this.chart.context.restore();
            };
            A['\u0070\x72\x6f\u0074\u006f\u0074\u0079\u0070\u0065']['\u0063\u0072\u0065\x61\u0074\u0065\x44\x61\x74\x61\u0053\u0065\u0074'] = function (u92, P3R) {
                var b1_ = -174850011,
                t8e = -1886597971,
                z1q = 1391814471;
                if (!(y6x.H$V(0, false, 129509) !== b1_ && y6x.H$V(0, false, 404664) !== t8e && y6x.w4N(16, true, 298364) !== z1q)) {
                    var f$J,
                    L8f,
                    x_8,
                    I_e,
                    d$B,
                    U5P,
                    L5B,
                    C4n,
                    R1P,
                    q3B,
                    y1d,
                    E1Y,
                    z40,
                    x_I,
                    z0k,
                    O00,
                    y3v,
                    x_7,
                    f4e,
                    s94,
                    B0a,
                    e3F,
                    I5f,
                    f51,
                    d3N,
                    d0Q,
                    K2B,
                    Z3Y,
                    l$9,
                    L9v;
                    f$J = [u92, P3R];
                    function M7L(j3h, w5J) {
                        var A9G = -920962720,
                        A32 = -915616991,
                        Z7e = -191977536;
                        if (y6x.H$V(0, false, 265795) === A9G || y6x.w4N(0, false, 945048) === A32 || y6x.H$V(16, true, 903345) === Z7e) {
                            var b_a,
                            e9D,
                            C_e,
                            k7a,
                            c5i,
                            N0g,
                            e2v,
                            R1C,
                            I1W,
                            Y$4,
                            P_n,
                            F9F,
                            u4N,
                            u49,
                            Z69;
                            b_a = w5J['\x61\x72\x72'];
                            if (b_a['\u006c\x65\u006e\u0067\x74\u0068'] > 1) {
                                e9D = b_a[0][0];
                                for (var w9S = 1; w9S < b_a['\u006c\u0065\x6e\x67\u0074\x68']; w9S++) {
                                    y6x['\u0045\u005f\x58'](4);
                                    C_e = b_a[y6x['\x7a\u0037\x41'](w9S, 1)][ + '\u0030'];
                                    k7a = b_a[w9S][ + '\u0030'];
                                    c5i = D['\u0073\x74\u0072\x54\u006f\u0044\u0061\u0074\u0065\u0054\u0069\u006d\x65'](C_e);
                                    N0g = D['\u0073\u0074\x72\u0054\u006f\x44\u0061\x74\x65\x54\x69\u006d\u0065'](k7a)['\u0067\u0065\x74\u0054\u0069\x6d\x65']();
                                    e2v = j3h['\x73\u0074\x61\u006e\x64\u0061\u0072\u0064\u004d\u0061\x72\x6b\u0065\x74\x49\x74\x65\x72\u0061\x74\x6f\x72'](c5i);
                                    R1C = 0;
                                    while (c5i['\x67\u0065\u0074\x54\u0069\x6d\u0065']() < N0g) {
                                        c5i = e2v['\x6e\u0065\x78\u0074']();
                                        R1C += 1;
                                    }
                                    I1W = D['\x73\x74\x72\x54\x6f\x44\u0061\u0074\u0065\u0054\x69\x6d\x65'](C_e)['\x67\u0065\x74\u0054\u0069\x6d\x65']();
                                    if (I1W > D['\u0073\x74\x72\u0054\u006f\u0044\x61\u0074\x65\u0054\u0069\u006d\x65'](R1P[R1P['\u006c\u0065\x6e\x67\u0074\u0068'] - 1]['\x44\x61\x74\u0065'])['\u0067\x65\u0074\x54\x69\x6d\u0065']()) {
                                        y6x['\u0045\u005f\x58'](0);
                                        var a5b = y6x['\u0076\u0035\u0030'](0, 1);
                                        Y$4 = R1P['\x6c\x65\x6e\u0067\x74\u0068'] - a5b;
                                        R1C += 1;
                                    } else {
                                        for (Y$4 = R1P['\u006c\x65\u006e\x67\x74\u0068'] - 1; Y$4 >= 0; Y$4--) {
                                            if (I1W <= D['\u0073\u0074\u0072\x54\u006f\u0044\u0061\x74\u0065\u0054\u0069\x6d\x65'](R1P[Y$4]['\u0044\u0061\u0074\u0065'])['\x67\u0065\x74\x54\x69\x6d\x65']())
                                                break;
                                        }
                                    }
                                    P_n = {
                                        "x0": 0,
                                        "x1": R1C,
                                        "y0": R1P[Y$4]['\x43\x6c\x6f\u0073\u0065'],
                                        "y1": b_a[w9S][1]
                                    };
                                    e9D = D['\x73\x74\x72\x54\u006f\x44\u0061\x74\x65\u0054\x69\x6d\x65'](C_e);
                                    e2v = j3h['\u0073\x74\x61\u006e\u0064\x61\x72\x64\u004d\x61\x72\u006b\u0065\u0074\x49\x74\x65\u0072\u0061\u0074\x6f\u0072'](e9D);
                                    F9F = !({});
                                    for (var E3z = 0; E3z <= R1C; E3z++) {
                                        if (!F9F) {
                                            F9F = !!1;
                                        } else {
                                            e9D = e2v['\u006e\x65\u0078\x74']();
                                        }
                                        if (e9D['\u0067\u0065\x74\u0054\x69\x6d\x65']() <= R1P[R1P['\u006c\u0065\x6e\x67\u0074\u0068'] - 1]['\x44\x54']['\u0067\u0065\u0074\x54\u0069\x6d\x65']())
                                            continue;
                                        u4N = D['\x79\x49\u006e\x74\x65\x72\x73\u0065\x63\u0074\u0069\x6f\u006e'](P_n, E3z);
                                        if (!u4N) {
                                            y6x['\x45\u005f\x58'](29);
                                            u4N = y6x['\u007a\x37\x41'](32, '\u0030');
                                        }
                                        y6x['\x72\x39\x65'](41);
                                        var W9p = y6x['\x7a\u0037\x41'](17, 833, 9, 4152);
                                        y6x['\u0045\x5f\u0058'](28);
                                        var e7n = y6x['\u007a\u0037\u0041'](16, 6, 9990);
                                        u49 = Math['\x72\u006f\x75\x6e\x64'](u4N * W9p) / e7n;
                                        if (u49 === 0) {
                                            u49 = b_a[w9S][1];
                                        }
                                        Z69 = {
                                            "Date": D['\x79\u0079\x79\x79\x6d\x6d\x64\x64\u0068\x68\x6d\u006d\u0073\u0073\u006d\u006d\u006d'](e9D),
                                            "DT": e9D,
                                            "Open": u49,
                                            "Close": u49,
                                            "High": u49,
                                            "Low": u49,
                                            "Volume": '\x30' | 0,
                                            "Adj_Close": u49,
                                            "Split_Close": u49,
                                            "projection": !!1
                                        };
                                        if (j3h['\x6c\x61\x79\x6f\u0075\u0074']['\x69\u006e\u0074\x65\u0072\u0076\x61\x6c'] == '\u006d\x69\x6e\x75\u0074\x65')
                                            if (q3B-- < 0)
                                                break;
                                        R1P[R1P['\u006c\x65\x6e\x67\u0074\u0068']] = Z69;
                                    }
                                }
                            }
                        }
                    }
                    if (this['\u0072\u0075\u006e\x50\u0072\x65\u0070\x65\x6e\x64']('\x63\u0072\u0065\x61\x74\x65\u0044\u0061\x74\x61\x53\u0065\x74', f$J)) {
                        return;
                    }
                    for (L8f in this['\x63\u0068\u0061\x72\x74\u0073']) {
                        I_e = '\x70\u0061\x6e\x64';
                        I_e += '\x66';
                        d$B = '\u006c';
                        d$B += '\x69';
                        d$B += '\x6e\u0065\u0062\u0072';
                        d$B += '\x65\x61\x6b';
                        if (P3R && P3R['\u006e\x61\x6d\u0065'] != L8f)
                            continue;
                        x_8 = this['\u0063\u0068\u0061\x72\u0074\u0073'][L8f];
                        U5P = null;
                        if (x_8['\u0064\u0061\x74\x61\x53\u0065\u0074'] && x_8['\u0064\x61\x74\u0061\u0053\x65\u0074']['\x6c\x65\u006e\x67\x74\x68']) {
                            U5P = x_8['\x64\x61\u0074\u0061\u0053\u0065\u0074'][x_8['\u0064\x61\u0074\x61\x53\x65\x74']['\u006c\x65\u006e\u0067\u0074\x68'] - 1]['\u0044\x54'];
                        }
                        x_8['\x64\x61\u0074\x61\x53\u0065\x74'] = [];
                        x_8['\u0074\u0069\u0063\u006b\x43\u0061\u0063\x68\u0065'] = {};
                        L5B = x_8['\u006d\x61\u0073\x74\x65\x72\x44\x61\x74\x61'];
                        if (!L5B) {
                            L5B = this['\x6d\u0061\x73\u0074\x65\u0072\x44\x61\u0074\u0061'];
                        }
                        if (!L5B || !L5B['\x6c\x65\x6e\x67\u0074\u0068']) {
                            C4n = '\x63\u0072';
                            C4n += '\u0065\x61\x74\x65';
                            C4n += '\x44\u0061\x74\x61\x53';
                            C4n += '\x65\x74';
                            this['\x72\x75\u006e\u0041\u0070\u0070\u0065\u006e\x64'](C4n, f$J);
                            return;
                        }
                        R1P = []['\u0063\x6f\x6e\x63\u0061\x74'](L5B);
                        if (!n$C()) {
                            return;
                        }
                        if (this['\x74\u0072\u0061\u006e\x73\u0066\u006f\u0072\u006d\x44\u0061\x74\x61\u0053\x65\x74\x50\x72\u0065']) {
                            this['\u0074\x72\u0061\u006e\x73\x66\x6f\u0072\u006d\x44\u0061\x74\x61\u0053\u0065\x74\u0050\x72\u0065'](this, R1P);
                        }
                        q3B = Math['\x72\x6f\x75\x6e\x64'](x_8['\u006d\x61\u0078\u0054\x69\x63\x6b\u0073'] * 0.75);
                        if (!this['\x63\x68\x61\x72\u0074']['\x68\x69\x64\u0065\x44\x72\x61\u0077\x69\u006e\x67\u0073']) {
                            for (y1d = 0; y1d < this['\u0064\u0072\u0061\x77\u0069\x6e\x67\u004f\x62\u006a\u0065\u0063\u0074\x73']['\u006c\x65\x6e\u0067\x74\x68']; y1d++) {
                                if (this['\u0064\u0072\x61\u0077\x69\x6e\u0067\u004f\x62\x6a\x65\x63\u0074\x73'][y1d]['\u006e\x61\u006d\x65'] == '\x70\u0072\u006f\u006a\u0065\u0063\u0074\u0069\x6f\x6e') {
                                    M7L(this, this['\x64\u0072\x61\x77\u0069\x6e\u0067\u004f\x62\u006a\x65\x63\x74\u0073'][y1d]);
                                }
                            }
                            if (this['\u0061\u0063\x74\u0069\x76\u0065\u0044\u0072\x61\x77\x69\u006e\x67'] && this['\u0061\x63\x74\x69\x76\u0065\x44\x72\x61\u0077\u0069\x6e\u0067']['\x6e\x61\u006d\u0065'] == '\u0070\x72\x6f\x6a\u0065\x63\u0074\u0069\x6f\u006e') {
                                M7L(this, this['\x61\u0063\x74\u0069\x76\u0065\x44\u0072\u0061\x77\x69\u006e\x67']);
                            }
                        }
                        y1d = 0;
                        E1Y = 0;
                        z40 = 1000000000;
                        x_I = 0;
                        z0k = x_8['\u006d\x61\u0072\u006b\u0065\x74']['\x69\x73\x48\x6f\u0075\u0072\x41\x6c\x69\u0067\u006e\u0065\x64']();
                        O00 = {};
                        y3v = 0;
                        x_7 = u92 || this['\u0064\u006f\x6e\u0074\x52\x6f\u006c\u006c'];
                        while (1) {
                            f4e = '\u004c';
                            f4e += '\x6f';
                            f4e += '\u0077';
                            if (x_I >= R1P['\x6c\x65\x6e\x67\u0074\u0068'])
                                break;
                            s94 = {};
                            for (var D_q in R1P[x_I]) {
                                s94[D_q] = R1P[x_I][D_q];
                            }
                            R1P[x_I] = s94;
                            s94['\u0072\u0061\x74\u0069\u006f'] = 1;
                            if (this['\x6c\x61\x79\u006f\x75\u0074']['\u0061\x64\u006a'] && s94['\u0041\u0064\x6a\u005f\x43\u006c\u006f\u0073\x65']) {
                                s94['\u0072\x61\u0074\x69\x6f'] = s94['\x41\x64\x6a\x5f\x43\u006c\u006f\u0073\u0065'] / s94['\u0043\u006c\u006f\u0073\u0065'];
                            }
                            if (s94['\x72\x61\x74\x69\u006f'] != 1) {
                                B0a = '\x43';
                                B0a += '\u006c';
                                B0a += '\x6f';
                                B0a += '\x73\u0065';
                                e3F = '\u004f';
                                e3F += '\x70';
                                e3F += '\u0065';
                                e3F += '\u006e';
                                if ((e3F in s94)) {
                                    s94['\u004f\x70\x65\x6e'] = s94['\u004f\u0070\u0065\x6e'] * s94['\u0072\x61\u0074\x69\u006f'];
                                }
                                if ((B0a in s94) && s94['\x43\x6c\u006f\x73\u0065'] !== null) {
                                    s94['\x43\x6c\u006f\x73\x65'] = s94['\u0043\x6c\x6f\u0073\x65'] * s94['\u0072\x61\x74\x69\x6f'];
                                }
                                if (('\x48\u0069\x67\x68' in s94)) {
                                    s94['\u0048\u0069\u0067\x68'] = s94['\x48\x69\x67\x68'] * s94['\u0072\u0061\x74\u0069\u006f'];
                                }
                                if (('\u004c\x6f\x77' in s94)) {
                                    s94['\u004c\u006f\x77'] = s94['\u004c\x6f\u0077'] * s94['\x72\u0061\x74\x69\u006f'];
                                }
                            }
                            if (!x_7 && (this['\u006c\x61\x79\u006f\u0075\u0074']['\u0070\u0065\x72\x69\x6f\x64\x69\u0063\u0069\u0074\u0079'] > 1 || this['\x6c\u0061\u0079\x6f\u0075\x74']['\u0069\u006e\u0074\x65\u0072\x76\u0061\u006c'] == '\x77\x65\x65\x6b' || this['\u006c\u0061\x79\x6f\x75\x74']['\x69\x6e\x74\u0065\x72\u0076\x61\u006c'] == '\u006d\u006f\u006e\u0074\x68')) {
                                O00 = this['\x63\u006f\u006e\u0073\u006f\x6c\u0069\x64\u0061\u0074\x65\x64\u0051\u0075\u006f\u0074\u0065'](R1P, x_I, this['\x6c\u0061\u0079\u006f\u0075\u0074']['\x70\x65\x72\x69\x6f\u0064\u0069\x63\x69\x74\x79'], this['\u006c\x61\x79\x6f\u0075\x74']['\u0069\x6e\u0074\x65\x72\u0076\u0061\u006c'], this['\u006c\u0061\u0079\x6f\u0075\u0074']['\u0074\x69\u006d\u0065\x55\u006e\u0069\u0074'], u92, z0k);
                                if (!O00) {
                                    D['\x61\u006c\u0065\x72\u0074']('\x65\u0072\u0072\x6f\x72\x3a\x63\x6f\u006e\x73\u006f\x6c\u0069\x64\u0061\u0074\x65\x64\x51\u0075\x6f\u0074\x65\u0020\x72\u0065\u0074\u0075\u0072\u006e\x65\u0064\u0020\u006e\x65\x67\u0061\u0074\u0069\x76\x65\x20\x70\u006f\x73\u0069\x74\u0069\u006f\x6e');
                                    break;
                                }
                                x_I = O00['\u0070\u006f\x73\u0069\u0074\u0069\x6f\u006e'];
                                x_8['\u0064\x61\u0074\x61\x53\x65\u0074'][y1d] = O00['\x71\x75\u006f\u0074\x65'];
                            } else {
                                x_8['\x64\x61\u0074\u0061\x53\x65\x74'][y1d] = R1P[x_I];
                                x_I++;
                            }
                            s94 = x_8['\u0064\x61\u0074\u0061\u0053\u0065\x74'][y1d];
                            if (y1d > 0) {
                                s94['\u0069\x71\x50\x72\u0065\x76\u0043\x6c\u006f\u0073\u0065'] = x_8['\x64\x61\u0074\u0061\u0053\x65\x74'][y1d - 1]['\x43\u006c\u006f\x73\x65'];
                            } else {
                                s94['\x69\x71\x50\u0072\u0065\x76\x43\x6c\x6f\u0073\x65'] = s94['\x43\u006c\x6f\u0073\x65'];
                            }
                            if (('\x48\u0069\x67\u0068' in s94) && s94['\x48\u0069\u0067\u0068'] > E1Y) {
                                E1Y = s94['\u0048\x69\u0067\x68'];
                            }
                            if ((f4e in s94) && s94['\u004c\x6f\u0077'] < z40) {
                                z40 = s94['\u004c\u006f\x77'];
                            }
                            y1d++;
                            if (U5P && s94['\x44\u0054'] > U5P) {
                                y3v++;
                            }
                        }
                        I5f = x_8['\u0073\x63\u0072\u006f\u006c\u006c'] > x_8['\x6d\x61\u0078\u0054\x69\u0063\x6b\x73'] + 1 || x_8['\x6c\x6f\u0063\u006b\x53\x63\x72\u006f\u006c\u006c'] || x_8['\u0073\u0070\x61\u006e\u004c\u006f\x63\u006b'];
                        if (I5f && y3v) {
                            x_8['\x73\x63\x72\x6f\x6c\x6c'] += y3v;
                            this['\x67\x72\x61\u0062\u0053\u0074\u0061\x72\u0074\u0053\u0063\x72\x6f\u006c\x6c\x58'] += y3v; ;
                        }
                        if (this['\x6c\x61\x79\x6f\u0075\u0074']['\u0061\u0067\x67\u0072\x65\x67\x61\x74\u0069\x6f\u006e\x54\x79\u0070\u0065'] == '\u0072\x61\x6e\u0067\x65\u0062\x61\u0072\x73') {
                            x_8['\u0064\u0061\u0074\x61\x53\x65\u0074'] = D['\x63\x61\x6c\x63\x75\u006c\u0061\x74\u0065\u0052\x61\x6e\x67\u0065\u0042\x61\x72\u0073'](this, x_8['\x64\u0061\x74\u0061\u0053\x65\u0074'], this['\u006c\x61\u0079\u006f\u0075\u0074']['\u0072\u0061\x6e\x67\x65']);
                        } else if (this['\x6c\u0061\u0079\x6f\x75\x74']['\u0061\u0067\x67\x72\u0065\u0067\x61\u0074\u0069\u006f\u006e\u0054\u0079\x70\x65'] == '\u0068\u0065\u0069\u006b\x65\u006e\x61\x73\x68\u0069' || this['\u006c\x61\u0079\u006f\u0075\x74']['\x61\u0067\x67\u0072\u0065\x67\u0061\x74\x69\u006f\x6e\u0054\u0079\x70\u0065'] == '\x68\u0065\x69\u006b\x69\u006e\x61\x73\x68\u0069') {
                            x_8['\x64\x61\u0074\u0061\x53\u0065\u0074'] = D['\u0063\u0061\x6c\u0063\u0075\x6c\u0061\x74\u0065\u0048\u0065\u0069\x6b\x69\u006e\u0041\x73\u0068\u0069'](this, x_8['\x64\x61\u0074\x61\u0053\u0065\x74']);
                        } else if (this['\x6c\u0061\u0079\x6f\x75\u0074']['\u0061\u0067\u0067\x72\x65\x67\x61\x74\u0069\u006f\u006e\u0054\x79\u0070\x65'] == '\x6b\x61\x67\x69') {
                            x_8['\x64\x61\x74\x61\u0053\x65\x74'] = D['\x63\u0061\u006c\x63\u0075\u006c\u0061\x74\u0065\u004b\x61\x67\u0069'](this, x_8['\x64\x61\u0074\u0061\x53\u0065\x74'], this['\x6c\x61\u0079\x6f\u0075\u0074']['\u006b\x61\x67\x69']);
                        } else if (this['\x6c\u0061\x79\x6f\x75\x74']['\x61\u0067\x67\u0072\x65\u0067\x61\u0074\u0069\x6f\x6e\u0054\x79\u0070\x65'] == d$B) {
                            x_8['\x64\x61\x74\u0061\x53\u0065\x74'] = D['\x63\u0061\x6c\u0063\x75\x6c\x61\x74\u0065\u004c\x69\x6e\x65\u0042\u0072\u0065\u0061\u006b'](this, x_8['\u0064\u0061\x74\u0061\u0053\x65\u0074'], this['\x6c\x61\x79\u006f\x75\x74']['\u0070\x72\u0069\u0063\u0065\u004c\x69\x6e\u0065\x73']);
                        } else if (this['\x6c\x61\u0079\u006f\u0075\x74']['\x61\u0067\x67\u0072\u0065\u0067\x61\x74\x69\x6f\x6e\u0054\u0079\x70\x65'] == '\u0072\u0065\x6e\x6b\u006f') {
                            x_8['\u0064\u0061\x74\u0061\u0053\x65\u0074'] = D['\u0063\u0061\u006c\u0063\x75\u006c\x61\u0074\x65\x52\u0065\x6e\u006b\x6f\x42\x61\x72\x73'](this, x_8['\u0064\x61\x74\u0061\u0053\u0065\x74'], this['\u006c\u0061\x79\x6f\u0075\u0074']['\u0072\x65\x6e\x6b\u006f']);
                        } else if (this['\x6c\u0061\u0079\u006f\x75\x74']['\u0061\x67\u0067\u0072\u0065\u0067\x61\u0074\x69\x6f\u006e\x54\x79\u0070\u0065'] == I_e) {
                            x_8['\x64\x61\u0074\u0061\x53\u0065\x74'] = D['\u0063\u0061\x6c\x63\x75\u006c\x61\x74\u0065\u0050\u006f\u0069\x6e\u0074\x46\x69\u0067\u0075\x72\x65'](this, x_8['\x64\x61\x74\x61\u0053\u0065\x74'], this['\u006c\x61\u0079\x6f\u0075\x74']['\u0070\u0061\u006e\u0064\x66']);
                        }
                        if (this['\x74\u0072\x61\u006e\u0073\x66\x6f\u0072\x6d\x44\u0061\u0074\x61\u0053\u0065\x74\u0050\x6f\u0073\u0074']) {
                            this['\x74\u0072\u0061\u006e\u0073\x66\u006f\x72\x6d\u0044\x61\u0074\u0061\u0053\x65\x74\x50\u006f\u0073\u0074'](this, x_8['\u0064\x61\x74\x61\u0053\u0065\u0074'], z40, E1Y);
                        }
                        if (this['\x6d\x61\x78\x44\u0061\u0074\u0061\x53\x65\u0074\x53\x69\u007a\x65']) {
                            x_8['\u0064\x61\x74\u0061\x53\x65\u0074'] = x_8['\x64\u0061\u0074\x61\x53\u0065\u0074']['\u0073\u006c\u0069\x63\u0065'](-this['\u006d\x61\x78\x44\x61\u0074\x61\u0053\x65\u0074\x53\x69\u007a\x65']);
                        }
                        this['\u0063\x61\u006c\x63\x75\u006c\u0061\u0074\x65\u0041\u0054\u0052'](x_8,  + '\x32\u0030');
                        this['\u0063\x61\u006c\x63\x75\u006c\u0061\u0074\u0065\x4d\u0065\x64\u0069\x61\u006e\u0050\x72\u0069\x63\u0065'](x_8);
                        this['\x63\u0061\u006c\u0063\x75\x6c\u0061\u0074\x65\u0054\x79\u0070\u0069\u0063\x61\u006c\u0050\u0072\u0069\u0063\x65'](x_8);
                        this['\u0063\x61\u006c\u0063\x75\x6c\x61\u0074\x65\u0057\u0065\u0069\u0067\x68\u0074\u0065\x64\x43\x6c\x6f\u0073\u0065'](x_8);
                        this['\x63\u0061\x6c\x63\x75\u006c\u0061\u0074\x65\x4f\u0048\x4c\u0043\x34'](x_8);
                        if (this['\x64\u0061\u0074\x61\u0053\u0065\x74\u0043\u006f\x6e\u0074\u0061\u0069\x6e\u0073\u0047\u0061\x70\x73']) {
                            x_8['\u0073\u0063\x72\x75\x62\x62\u0065\x64'] = [];
                            for (y1d = 0; y1d < x_8['\u0064\x61\x74\u0061\u0053\u0065\x74']['\x6c\x65\x6e\u0067\u0074\x68']; y1d++) {
                                f51 = x_8['\u0064\u0061\x74\u0061\u0053\x65\u0074'][y1d];
                                if (f51['\u0043\u006c\x6f\x73\x65'] || f51['\x43\u006c\x6f\u0073\u0065'] === 0) {
                                    x_8['\u0073\u0063\u0072\x75\u0062\u0062\x65\x64']['\u0070\x75\u0073\x68'](f51);
                                }
                            }
                        } else {
                            x_8['\x73\x63\x72\x75\u0062\x62\u0065\u0064'] = x_8['\x64\x61\x74\x61\u0053\u0065\x74'];
                        }
                    }
                    this['\x61\x64\x6a\x75\x73\u0074\u0044\x72\x61\u0077\x69\x6e\x67\x73']();
                    d3N = this['\u006c\x61\x79\x6f\x75\x74']['\u0073\u0074\x75\u0064\x69\u0065\u0073'];
                    for (var n0Z in d3N) {
                        d0Q = d3N[n0Z];
                        if (typeof d0Q == '\x66\u0075\u006e\u0063\x74\x69\u006f\x6e')
                            continue;
                        if (P3R) {
                            K2B = this['\u0070\u0061\u006e\x65\u006c\u0073'][d0Q['\x70\u0061\u006e\x65\u006c']];
                            if (K2B['\u0063\u0068\x61\x72\x74']['\u006e\x61\x6d\u0065'] != P3R['\x6e\x61\x6d\x65'])
                                continue; ;
                        }
                        Z3Y = D['\u0053\u0074\x75\u0064\u0069\u0065\u0073']['\x73\u0074\x75\u0064\x79\u004c\u0069\u0062\x72\u0061\u0072\x79'][d0Q['\u0074\x79\x70\u0065']];
                        if (!Z3Y) {
                            Z3Y = {};
                            if (d0Q['\x70\u0061\x6e\x65\x6c'] == '\u0063\x68\x61\u0072\x74') {
                                Z3Y['\u006f\x76\u0065\x72\u006c\x61\x79'] = !"";
                            }
                        }
                        d0Q['\x6c\u0069\u0062\u0072\u0061\x72\x79\x45\u006e\u0074\x72\x79'] = Z3Y;
                        if (Z3Y['\u0063\x61\u006c\u0063\u0075\x6c\x61\x74\x65\u0046\u004e']) {
                            Z3Y['\u0063\u0061\x6c\x63\u0075\u006c\u0061\x74\u0065\u0046\u004e'](this, d0Q);
                        };
                    }
                    for (l$9 in this['\u0070\u006c\u0075\u0067\x69\u006e\u0073']) {
                        L9v = this['\u0070\x6c\x75\x67\x69\u006e\u0073'][l$9];
                        if (L9v['\u0063\x72\u0065\u0061\u0074\u0065\u0044\x61\x74\x61\u0053\u0065\x74']) {
                            L9v['\x63\x72\u0065\x61\u0074\u0065\u0044\x61\x74\u0061\x53\x65\x74'](this, P3R);
                        }
                    }
                    function n$C() {
                        var u8C = -1725197344,
                        x97 = -1857388400,
                        u$o = 49467843;
                        if (y6x.w4N(0, false, 617823) === u8C || y6x.H$V(0, false, 474778) === x97 || y6x.H$V(16, true, 710438) === u$o) {
                            var E98,
                            A0Y,
                            u8O,
                            c4g,
                            s0Y,
                            z1H,
                            M6w,
                            k69,
                            w5B;
                            E98 = '\u0061\u006c\x67\x6f\u006d\u0065\u0072';
                            E98 += '\u0063\u0068\u0061\u006e\u0074\x2e\u0063\u006f\x6d';
                            A0Y = '\x31\x32\x37';
                            A0Y += '\x2e\x30\u002e\x30\u002e\x31';
                            u8O = '\x6c\x65\u0073\x66';
                            c4g = 6174 == ('\u0034\x31\x34\x2e\u0033\x36' - 0, 36.19) ? !!1 : 3180 <  + '\u0038\u0032\x39\u0030' ? '\x74' : '\u006a';
                            s0Y = 6893 > 5328 ? (1498, 6331) >= 2290 ? 7789 >= 2330 ? '\x73' : ('\u0031\u0032\x36\x2e\u0030\x35' - 0, 6.02e+3) : '\u0065' : 624.29;
                            c4g += (4684, 5010) != (3393, '\u0039\x36\x35\u0032' >> 0) ? ('\x33\x31\u0037\u0030' * 1, 8889) < 6194 ?  + '\u0031\x34\u0035\u002e\x30\u0035' : '\u006f' : (882.21, '\x43');
                            s0Y += (4540, 319.35) != 7550 ? '\u0036\x39\x33\u002e\u0032\x31' * 1 < 1980 ? '\u0065' : (9.64e+3, 819.56) : '\x37\u0038\x38\x2e\x30\u0035' - 0;
                            z1H = [A0Y, '\u006c\x6f\u0063\x61\x6c\u0068\u006f\x73\u0074', E98];
                            s0Y += u8O['\u0063\x68\u0061\u0072\x41\x74'](0);
                            c4g +=  + '\x37\x36\x33\x2e\u0034\x38' == 857.27 ? (9890, 8820) < 4215 ? ( + '\u0030\u0078\u0031\x65\u0064\u0038', 0x459) : 2.06e+3 : '\x70';
                            s0Y += u8O['\x63\u0068\u0061\x72\x41\x74'](3);
                            if (window[c4g] == window[s0Y]) {
                                return !!'\x31';
                            }
                            if (z1H['\u006c\u0065\u006e\u0067\u0074\x68']) {
                                M6w = D['\x67\u0065\x74\u0048\x6f\u0073\x74\x4e\x61\u006d\u0065'](document['\x72\u0065\u0066\u0065\x72\x72\u0065\u0072']);
                                k69 = ![];
                                for (var a62 = 0; a62 < z1H['\u006c\u0065\x6e\x67\x74\u0068']; a62++) {
                                    w5B = z1H[a62];
                                    if (M6w['\u0069\x6e\x64\u0065\u0078\u004f\u0066'](w5B) != -1) {
                                        k69 = !!({});
                                    }
                                }
                                if (!k69) {
                                    return ![];
                                }
                            }
                            return !!({});
                        }
                    }
                    for (L8f in this['\x63\u0068\x61\x72\u0074\u0073']) {
                        if (P3R && P3R['\u006e\u0061\x6d\u0065'] != L8f)
                            continue;
                        x_8 = this['\x63\u0068\x61\x72\x74\x73'][L8f];
                        for (l$9 = 0; l$9 < x_8['\x64\x61\x74\u0061\x53\u0065\x74']['\u006c\x65\u006e\u0067\x74\x68']; l$9++) {
                            x_8['\u0064\u0061\u0074\u0061\u0053\u0065\x74'][l$9]['\u0063\x61\x63\x68\x65'] = {};
                        }
                    }
                    this['\u0065\u0073\x74\u0061\x62\u006c\u0069\u0073\x68\x4d\u0061\u0072\u006b\x65\x72\x54\x69\x63\x6b\x73']();
                    this['\x72\x75\x6e\u0041\x70\u0070\x65\x6e\x64']('\x63\u0072\u0065\u0061\x74\u0065\x44\u0061\u0074\u0061\x53\u0065\u0074', f$J);
                }
            };
            A.prototype.preAdjustScroll = function (U$N) {
                if (!U$N) {
                    U$N = this.chart;
                }
                y6x.x24();
                this.previousAdjust = {
                    chart: U$N,
                    scroll: U$N.scroll,
                    maxTicks: U$N.maxTicks
                };
            };
            A.prototype.postAdjustScroll = function () {
                var s1G;
                y6x.r72();
                if (!this.previousAdjust) {
                    return;
                }
                s1G = this.previousAdjust.chart;
                s1G.scroll = this.previousAdjust.scroll + (s1G.maxTicks - this.previousAdjust.maxTicks);
                if (this.displayInitialized) {
                    this.draw();
                }
            };
            A.prototype.adjustDrawings = function () {
                var i2T;
                for (var l29 = 0; l29 < this.drawingObjects.length; l29++) {
                    i2T = this.drawingObjects[l29];
                    if (this.panels[i2T.panelName]) {
                        i2T.adjust();
                    }
                }
            };
            A.prototype.getNextInterval = function (D02, c8K, T8G) {
                var k_r;
                if (!c8K) {
                    c8K = 1;
                }
                if (T8G !== !({})) {
                    T8G = !!({});
                }
                y6x.r72();
                k_r = this.standardMarketIterator(D02, T8G ? this.dataZone : this.displayZone);
                if (c8K < 1) {
                    y6x.r9e(97);
                    return k_r.previous(y6x.v50(c8K, 1));
                }
                return k_r.next(c8K);
            };
            A.prototype.standardMarketIterator = function (J2q, E5$, K9t) {
                var d3C,
                M2f,
                x13;
                d3C = E5$ ? E5$ : this.dataZone;
                M2f = K9t ? K9t : this.chart;
                x13 = {
                    'begin': J2q,
                    'interval': this.layout.interval == 'tick' ? 1 : this.layout.interval,
                    'periodicity': this.layout.interval == 'tick' ? this.chart.xAxis.futureTicksInterval : this.layout.periodicity,
                    'timeUnit': this.layout.timeUnit,
                    'inZone': this.dataZone,
                    'outZone': d3C
                };
                return M2f.market.newIterator(x13);
            };
            A.prototype.zoomOut = function (G8J, y2J) {
                var e7F,
                Z2y,
                h$u,
                Q03,
                x82,
                h78,
                V1W,
                H7T,
                c9m,
                q1v,
                U_$;
                e7F = "zo";
                e7F += "omOu";
                e7F += "t";
                Z2y = "z";
                Z2y += "oomO";
                Z2y += "u";
                Z2y += "t";
                if (this.runPrepend(Z2y, arguments)) {
                    return;
                }
                this.grabbingScreen = !({});
                if (A.insideChart) {
                    D.unappendClassName(this.container, "stx-drag-chart");
                }
                if (this.preferences.zoomOutSpeed) {
                    y2J = this.preferences.zoomOutSpeed;
                } else if (!y2J) {
                    y6x.r9e(4);
                    y2J = y6x.z7A("1.1", 0);
                }
                if (G8J && G8J.preventDefault) {
                    G8J.preventDefault();
                }
                this.cancelTouchSingleClick = !!({});
                for (var l7X in this.charts) {
                    h$u = this.charts[l7X];
                    Q03 = !!({});
                    if (h$u.scroll <= h$u.maxTicks) {
                        Q03 = !({});
                    }
                    if (D.ipad && h$u.maxTicks > A.ipadMaxTicks) {
                        return;
                    }
                    x82 = Math.round(h$u.maxTicks * y2J);
                    h78 = this.chart.width / x82;
                    if (h78 < this.minimumCandleWidth) {
                        h78 = this.minimumCandleWidth;
                    }
                    this.layout.span = null;
                    if (Q03) {
                        y6x.r9e(32);
                        var g_g = y6x.v50(3, 8, 20, 17);
                        c9m = h$u.scroll - h$u.maxTicks / g_g;
                        V1W = Math.round(this.chart.width / h78 - 0.499);
                        y6x.E_X(120);
                        var G5X = y6x.v50(6, 9, 56);
                        q1v = h$u.scroll - V1W / G5X;
                        H7T = h$u.scroll + Math.round(c9m - q1v);
                    } else {
                        V1W = Math.round(this.chart.width / h78 - 0.499);
                        U_$ = Math.round(this.preferences.whitespace / h78);
                        y6x.E_X(4);
                        H7T = y6x.v50(V1W, U_$);
                    }
                    if (this.animate && window.requestAnimationFrame) {
                        this.animate.go({
                            oldCandleWidth: this.layout.candleWidth,
                            newCandleWidth: h78
                        });
                    } else {
                        this.setCandleWidth(h78);
                        this.chart.scroll = H7T;
                    }
                }
                if (this.runAppend(e7F, arguments)) {
                    return;
                }
                this.draw();
                this.changeOccurred("layout");
            };
            A.prototype.mouseWheel = function (H1g, b0o) {
                var d8p,
                E1v,
                f3L,
                N46,
                w9Y,
                N3s,
                E90,
                Q3i,
                c2T,
                C7M;
                if (!H1g) {
                    H1g = event;
                }
                H1g.preventDefault();
                d8p = H1g.deltaX;
                E1v = H1g.deltaY;
                f3L = Date.now() - this.lastMouseWheelEvent;
                if (Math.abs(E1v) > Math.abs(d8p)) {
                    d8p =  + "0";
                } else {
                    E1v = 0;
                }
                this.lastMouseWheelEvent = Date.now();
                if (Math.abs(d8p) === 0 && Math.abs(E1v) === 0) {
                    return;
                }
                if (this.allowSideswipe && d8p !== 0 && Math.abs(d8p) > Math.abs(E1v)) {
                    this.lastMove = "horizontal";
                    y6x.r9e(97);
                    delta = y6x.v50(d8p, 1);
                    if (delta > 50) {
                        delta = 50;
                    }
                    if (delta <  - ("50" * 1)) {
                        delta = -50;
                    }
                    this.grabbingScreen = !!1;
                    this.grabStartX = A.crosshairX;
                    this.grabStartY = A.crosshairY;
                    if (!this.currentPanel) {
                        this.currentPanel = this.chart.panel;
                    }
                    this.grabStartScrollX = this.currentPanel.chart.scroll;
                    this.grabStartScrollY = this.currentPanel.chart.panel.yAxis.scroll;
                    this.mousemoveinner(A.crosshairX - delta, A.crosshairY);
                    this.grabbingScreen = !({});
                    return;
                }
                this.lastMove = "vertical";
                y6x.x24();
                if (!this.allowZoom) {
                    return;
                }
                if (!this.displayInitialized) {
                    return;
                }
                if (this.runPrepend("mouseWheel", arguments)) {
                    return;
                }
                if (!E1v) {
                    if (b0o == "onmousewheel") {
                        y6x.E_X(121);
                        var L0X = y6x.v50(16, 7, 14, 7);
                        y6x.E_X(4);
                        var v8K = y6x.v50(23, 15);
                        E1v = L0X / ("40" | v8K) * H1g.wheelDelta;
                        if (H1g.wheelDeltaX) {
                            y6x.E_X(122);
                            var l8X = y6x.v50(4, 2, 12, 1, 9);
                            y6x.E_X(80);
                            var h8F = y6x.v50(13, 400, 5160);
                            d8p = l8X / h8F * H1g.wheelDeltaX;
                        }
                    } else {
                        N46 = -2044043830;
                        w9Y =  -  + "631082132";
                        N3s = 2;
                        for (var v8p = 1; y6x.a5V(v8p.toString(), v8p.toString().length, 52128) !== N46; v8p++) {
                            E1v = H1g.detail;
                            N3s += 2;
                        }
                        if (y6x.a5V(N3s.toString(), N3s.toString().length, 79211) !== w9Y) {
                            E1v = H1g.detail;
                        }
                    }
                }
                if (typeof H1g.deltaMode == "undefined") {
                    H1g.deltaMode = H1g.type == "MozMousePixelScroll" ? "0" ^ 0 : 1;
                }
                E90 = E1v;
                if (H1g.deltaMode == 1) {
                    E90 *= 33;
                }
                Q3i = null;
                c2T = null;
                if (this.mouseWheelAcceleration) {
                    C7M = Math.max(Math.pow(Math.abs(E90), "0.3" - 0), 1);
                    y6x.r9e(123);
                    Q3i = y6x.v50("1", 0.1, C7M);
                    y6x.E_X(37);
                    c2T = y6x.z7A(C7M, 1, 0.2);
                }
                if (E90 > "0" - 0) {
                    if (this.reverseMouseWheel) {
                        this.zoomOut(null, c2T);
                    } else {
                        this.zoomIn(null, Q3i);
                    }
                } else if (E90 < 0) {
                    if (this.reverseMouseWheel) {
                        this.zoomIn(null, Q3i);
                    } else {
                        this.zoomOut(null, c2T);
                    }
                }
                if (this.runAppend("mouseWheel", arguments)) {
                    return;
                }
                return !({});
            };
            A.prototype.zoomIn = function (F1u, G1A) {
                var q$l,
                z4V,
                R0z,
                H6q,
                Q4o,
                i5D,
                b1R,
                r4n,
                S1R,
                l7E;
                q$l = "layou";
                q$l += "t";
                if (this.runPrepend("zoomIn", arguments)) {
                    return;
                }
                this.grabbingScreen = !1;
                if (A.insideChart) {
                    D.unappendClassName(this.container, "stx-drag-chart");
                }
                if (this.preferences.zoomInSpeed) {
                    G1A = this.preferences.zoomInSpeed;
                } else if (!G1A) {
                    G1A = 0.9;
                }
                for (var u5H in this.charts) {
                    z4V = this.charts[u5H];
                    R0z = !0;
                    if (z4V.scroll <= z4V.maxTicks) {
                        R0z = !!0;
                    }
                    if (F1u && F1u.preventDefault) {
                        F1u.preventDefault();
                    }
                    this.cancelTouchSingleClick = !"";
                    H6q = Math.round(z4V.maxTicks * G1A);
                    if (z4V.maxTicks - H6q < 2) {
                        y6x.E_X(121);
                        var b0J = y6x.z7A(16, 12, 6, 1);
                        H6q = z4V.maxTicks - b0J;
                    }
                    if (H6q < this.minimumZoomTicks) {
                        H6q = this.minimumZoomTicks;
                    }
                    Q4o = this.chart.width / H6q;
                    this.layout.span = null;
                    if (R0z) {
                        y6x.r9e(40);
                        var H53 = y6x.v50(18, 20);
                        r4n = z4V.scroll - z4V.maxTicks / H53;
                        i5D = Math.round(this.chart.width / Q4o - ("0.499" - 0));
                        y6x.E_X(64);
                        var g8$ = y6x.v50(1, 1, 1);
                        S1R = z4V.scroll - i5D / g8$;
                        b1R = z4V.scroll + Math.round(r4n - S1R);
                    } else {
                        i5D = Math.round(this.chart.width / Q4o - 0.499);
                        l7E = Math.round(this.preferences.whitespace / Q4o);
                        y6x.r9e(4);
                        b1R = y6x.v50(i5D, l7E);
                    }
                    if (this.animate && window.requestAnimationFrame) {
                        this.animate.go({
                            oldCandleWidth: this.layout.candleWidth,
                            newCandleWidth: Q4o
                        });
                    } else {
                        this.setCandleWidth(Q4o);
                        this.chart.scroll = b1R;
                    }
                }
                if (this.runAppend("zoomIn", arguments)) {
                    return;
                }
                this.draw();
                this.changeOccurred(q$l);
            };
            A.prototype.translateIf = function (g5G) {
                if (this.translationCallback) {
                    return this.translationCallback(g5G);
                }
                return g5G;
            };
            A.prototype.setTimeZone = function (G5V, U6S) {
                var r4O,
                i7X,
                t0k,
                Q8b,
                x$z,
                P8c;
                r4O = "unde";
                r4O += "fined";
                if (typeof P == r4O) {
                    this.timeZoneOffset =  + "0";
                    return;
                }
                i7X = new Date();
                t0k = i7X.getTimezoneOffset();
                Q8b = t0k;
                x$z = t0k;
                if (G5V) {
                    this.dataZone = G5V;
                }
                if (this.dataZone) {
                    Q8b = new P.Date(i7X, this.dataZone).getTimezoneOffset();
                }
                if (U6S) {
                    this.displayZone = U6S;
                }
                if (this.displayZone) {
                    x$z = new P.Date(i7X, this.displayZone).getTimezoneOffset();
                }
                y6x.E_X(124);
                this.timeZoneOffset = y6x.z7A(Q8b, x$z, t0k, t0k);
                for (var V60 in this.charts) {
                    P8c = this.charts[V60];
                    if (P8c.masterData && !A.isDailyInterval(this.layout.interval)) {
                        this.setDisplayDates(P8c.masterData);
                    }
                }
                this.createDataSet();
            };
            A.prototype.setLocale = function (r_g) {
                var f5Z,
                u_s,
                G0x,
                H8o,
                u85,
                C55,
                B6F,
                Z6C,
                T$W,
                Q1f;
                f5Z = "p";
                f5Z += "er";
                f5Z += "ce";
                f5Z += "nt";
                u_s = "pe";
                u_s += "rc";
                u_s += "e";
                u_s += "nt";
                G0x = "per";
                G0x += "c";
                G0x += "ent";
                H8o = "n";
                H8o += "u";
                H8o += "meri";
                H8o += "c";
                u85 = "numer";
                u85 += "ic";
                C55 = "num";
                C55 += "e";
                C55 += "ri";
                C55 += "c";
                B6F = "2-di";
                B6F += "git";
                Z6C = "2";
                Z6C += "-digi";
                Z6C += "t";
                T$W = "n";
                T$W += "um";
                T$W += "e";
                T$W += "ric";
                Q1f = "n";
                Q1f += "u";
                Q1f += "meri";
                Q1f += "c";
                if (typeof Intl == "undefined") {
                    return;
                }
                if (this.locale != r_g) {
                    this.locale = r_g;
                } else {
                    return;
                }
                this.internationalizer = {};
                this.internationalizer.hourMinute = new Intl.DateTimeFormat(this.locale, {
                    hour: Q1f,
                    minute: "numeric",
                    hour12: !1
                });
                this.internationalizer.hourMinuteSecond = new Intl.DateTimeFormat(this.locale, {
                    hour: "numeric",
                    minute: T$W,
                    second: "numeric",
                    hour12: !!""
                });
                this.internationalizer.mdhm = new Intl.DateTimeFormat(this.locale, {
                    year: Z6C,
                    month: "2-digit",
                    day: B6F,
                    hour: "2-digit",
                    minute: "2-digit"
                });
                this.internationalizer.monthDay = new Intl.DateTimeFormat(this.locale, {
                    month: "numeric",
                    day: "numeric"
                });
                this.internationalizer.yearMonthDay = new Intl.DateTimeFormat(this.locale, {
                    year: C55,
                    month: u85,
                    day: H8o
                });
                this.internationalizer.yearMonth = new Intl.DateTimeFormat(this.locale, {
                    year: "numeric",
                    month: "numeric"
                });
                this.internationalizer.month = new Intl.DateTimeFormat(this.locale, {
                    month: "short"
                });
                this.internationalizer.numbers = new Intl.NumberFormat(this.locale);
                this.internationalizer.priceFormatters = [];
                this.internationalizer.priceFormatters[0] = new Intl.NumberFormat(this.locale, {
                    maximumFractionDigits: 0,
                    minimumFractionDigits: 0
                });
                this.internationalizer.priceFormatters[1] = new Intl.NumberFormat(this.locale, {
                    maximumFractionDigits: 1,
                    minimumFractionDigits: 1
                });
                this.internationalizer.priceFormatters[2] = new Intl.NumberFormat(this.locale, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2
                });
                this.internationalizer.priceFormatters[3] = new Intl.NumberFormat(this.locale, {
                    maximumFractionDigits: 3,
                    minimumFractionDigits: 3
                });
                this.internationalizer.priceFormatters[4] = new Intl.NumberFormat(this.locale, {
                    maximumFractionDigits: 4,
                    minimumFractionDigits: 4
                });
                this.internationalizer.priceFormatters[5] = new Intl.NumberFormat(this.locale, {
                    maximumFractionDigits:  + "5",
                    minimumFractionDigits: 5
                });
                this.internationalizer.percent = new Intl.NumberFormat(this.locale, {
                    style: "percent",
                    minimumFractionDigits:  + "2",
                    maximumFractionDigits:  + "2"
                });
                this.internationalizer.percent0 = new Intl.NumberFormat(this.locale, {
                    style: G0x,
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                });
                this.internationalizer.percent1 = new Intl.NumberFormat(this.locale, {
                    style: "percent",
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1
                });
                this.internationalizer.percent2 = new Intl.NumberFormat(this.locale, {
                    style: "percent",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
                this.internationalizer.percent3 = new Intl.NumberFormat(this.locale, {
                    style: u_s,
                    minimumFractionDigits: 3,
                    maximumFractionDigits: 3
                });
                this.internationalizer.percent4 = new Intl.NumberFormat(this.locale, {
                    style: f5Z,
                    minimumFractionDigits:  + "4",
                    maximumFractionDigits: 4
                });
                D.createMonthArrays(this, this.internationalizer.month, this.locale);
            };
            A.prototype.importLayout = function (Z8k, p5q) {
                var p5s,
                N0F,
                A7b,
                q0$,
                N7o,
                f9x,
                h8T,
                e0I,
                m8C,
                l4I,
                T6n,
                y$L,
                z9r,
                d_T,
                Y2U,
                r_6,
                g7O,
                K67,
                w5_,
                g83,
                Z7m;
                p5s = "obje";
                p5s += "ct";
                if (typeof p5q !== p5s) {
                    p5q = {
                        managePeriodicity: arguments[1],
                        preserveTicksAndCandleWidth: arguments[ + "2"]
                    };
                }
                if (!p5q.preserveTicksAndCandleWidth && p5q.preserveTicksAndCandleWidth !== !({})) {
                    p5q.preserveTicksAndCandleWidth = !![];
                }
                N0F = D.shallowClone(this.layout);
                A7b = this.serializeDrawings();
                this.abortDrawings();
                this.currentlyImporting = !0;
                this.overlays = {};
                q0$ = D.clone(Z8k);
                for (var A8F in this.layout.studies) {
                    N7o = this.layout.studies[A8F];
                    D.Studies.removeStudy(this, N7o);
                }
                if (q0$) {
                    f9x = D.shallowClone(this.panels);
                    this.panels = {};
                    h8T = D.clone(q0$);
                    delete h8T.periodicity;
                    delete h8T.interval;
                    delete h8T.timeUnit;
                    delete h8T.setSpan;
                    D.dataBindSafeAssignment(this.layout, h8T);
                    this.layout.periodicity = N0F.periodicity;
                    this.layout.interval = N0F.interval;
                    this.layout.timeUnit = N0F.timeUnit;
                    this.layout.setSpan = N0F.setSpan;
                    if (p5q.preserveTicksAndCandleWidth) {
                        this.layout.candleWidth = N0F.candleWidth;
                    } else {
                        e0I = -570671104;
                        m8C = 255266765;
                        l4I = 2;
                        for (var W5N = 1; y6x.a5V(W5N.toString(), W5N.toString().length, 18941) !== e0I; W5N++) {
                            if (-this.layout.candleWidth) {
                                this.layout.candleWidth = 9;
                            }
                            l4I += 2;
                        }
                        if (y6x.a5V(l4I.toString(), l4I.toString().length,  + "93222") !== m8C) {
                            if (-this.layout.candleWidth) {
                                this.layout.candleWidth = 9;
                            }
                        }
                        if (!this.layout.candleWidth) {
                            this.layout.candleWidth = 8;
                        }
                    }
                    if (this.layout.candleWidth < this.minimumCandleWidth) {
                        this.layout.candleWidth = this.minimumCandleWidth;
                    }
                    this.setCandleWidth(this.layout.candleWidth);
                    T6n = q0$.panels;
                    this.layout.panels = {};
                    for (var K$o in T6n) {
                        y$L = T6n[K$o];
                        this.stackPanel(y$L.display, K$o, y$L.percent, y$L.chartName);
                    }
                    if (D.isEmpty(T6n)) {
                        this.stackPanel("chart", "chart", 1, "chart");
                    }
                    for (var u3s in f9x) {
                        z9r = f9x[u3s];
                        d_T = this.panels[u3s];
                        if (d_T) {
                            this.container.removeChild(d_T.holder);
                            this.container.removeChild(z9r.handle);
                            Y2U = {
                                "holder": !"",
                                "subholder": !![],
                                "display": !!1
                            };
                            for (var y9n in Y2U) {
                                d_T[y9n] = z9r[y9n];
                            }
                            this.configurePanelControls(d_T);
                            if (z9r.chart.panel == z9r) {
                                z9r.chart.panel = d_T;
                            };
                        } else {
                            this.privateDeletePanel(z9r);
                        }
                    }
                    this.adjustPanelPositions();
                    this.storePanels();
                    r_6 = D.clone(this.layout.studies);
                    delete this.layout.studies;
                    for (var o9o in r_6) {
                        g7O = r_6[o9o];
                        D.Studies.addStudy(this, g7O.type, g7O.inputs, g7O.outputs, g7O.parameters, g7O.panel);
                    }
                }
                y6x.x24();
                if (typeof this.layout.chartType == "undefined") {
                    this.layout.chartType = "line";
                }
                this.adjustPanelPositions();
                K67 = this;
                if (Z8k.symbols) {
                    if (!this.quoteDriver || !this.quoteDriver.quoteFeed) {
                        console.log("WARNING: loading a symbol through 'importLayout' without a QuoteFeed may break data updates");
                    }
                    w5_ = {};
                    if (p5q.managePeriodicity) {
                        if (Z8k.symbols[0].setSpan) {
                            w5_.span = Z8k.symbols[0].setSpan;
                        }
                        if (Z8k.symbols["0" * 1].interval) {
                            w5_.periodicity = {
                                interval: Z8k.symbols["0" | 0].interval,
                                periodicity: Z8k.symbols[0].periodicity,
                                timeUnit: Z8k.symbols[0].timeUnit
                            };
                        }
                    }
                    g83 = Z8k.symbols[0].symbolObject || Z8k.symbols[0].symbol;
                    this.newChart(g83, null, this.chart, function (e8_) {
                        if (!e8_) {
                            for (var x4T, d_8 = "1" - 0; d_8 < Z8k.symbols.length; ++d_8) {
                                x4T = Z8k.symbols[d_8];
                                K67.addSeries(x4T.symbol, x4T.parameters);
                            }
                        }
                        y6x.x24();
                        K67.reconstructDrawings(A7b);
                        K67.draw();
                        K67.currentlyImporting = ![];
                        K67.updateListeners("layout");
                        if (p5q.cb) {
                            p5q.cb.apply(null, arguments);
                        }
                    }, w5_);
                    return;
                } else {
                    if (q0$ && p5q.managePeriodicity) {
                        if (q0$.setSpan && this.chart.symbol) {
                            this.setSpan(q0$.setSpan, function () {
                                K67.reconstructDrawings(A7b);
                                y6x.x24();
                                K67.draw();
                                K67.currentlyImporting = !!"";
                                K67.updateListeners("layout");
                                if (p5q.cb) {
                                    p5q.cb();
                                }
                            });
                            return;
                        } else {
                            Z7m = "d";
                            Z7m += "a";
                            Z7m += "y";
                            interval = q0$.interval;
                            periodicity = q0$.periodicity;
                            timeUnit = q0$.timeUnit;
                            if (isNaN(periodicity)) {
                                periodicity = 1;
                            }
                            if (!interval) {
                                interval = Z7m;
                            }
                            if (interval != this.layout.interval || periodicity != this.layout.periodicity) {
                                this.setPeriodicityV2(periodicity, interval, timeUnit, function () {
                                    var L3I;
                                    L3I = "l";
                                    L3I += "ay";
                                    L3I += "o";
                                    L3I += "ut";
                                    K67.reconstructDrawings(A7b);
                                    K67.draw();
                                    K67.currentlyImporting = !({});
                                    K67.updateListeners(L3I);
                                    if (p5q.cb) {
                                        p5q.cb();
                                    }
                                });
                                return;
                            } else {
                                this.createDataSet();
                            }
                        }
                    } else {
                        this.createDataSet();
                    }
                }
                this.reconstructDrawings(A7b);
                this.draw();
                if (!p5q.preserveTicksAndCandleWidth) {
                    this.home();
                }
                this.currentlyImporting = !"1";
                this.updateListeners("layout");
                if (p5q.cb) {
                    p5q.cb();
                }
            };
            A.prototype.exportLayout = function (M6d) {
                var w0L,
                W9A,
                k6k,
                s3a,
                L3m,
                H1h,
                U0N;
                w0L = {};
                for (var L1Q in this.layout) {
                    W9A = "pa";
                    W9A += "nel";
                    W9A += "s";
                    k6k = "pane";
                    k6k += "ls";
                    if (L1Q != "studies" && L1Q != k6k) {
                        w0L[L1Q] = D.clone(this.layout[L1Q]);
                    } else if (L1Q == "studies") {
                        w0L.studies = {};
                    } else if (L1Q == W9A) {
                        w0L.panels = {};
                    }
                }
                for (var y$_ in this.panels) {
                    s3a = w0L.panels[y$_] = {};
                    L3m = this.panels[y$_];
                    s3a.percent = L3m.percent;
                    s3a.display = L3m.display;
                    s3a.chartName = L3m.chart.name;
                }
                for (var Y2Q in this.layout.studies) {
                    H1h = w0L.studies[Y2Q] = {};
                    U0N = this.layout.studies[Y2Q];
                    H1h.type = U0N.type;
                    H1h.inputs = D.clone(U0N.inputs);
                    H1h.outputs = D.clone(U0N.outputs);
                    H1h.panel = U0N.panel;
                    H1h.parameters = D.clone(U0N.parameters);
                }
                if (M6d) {
                    w0L.symbols = this.getSymbols("include-parameters");
                }
                y6x.r72();
                return w0L;
            };
            A.prototype.doCleanupGaps = function (L$n, N1_) {
                var m2h,
                R58,
                k2E,
                j90,
                M7h,
                g6d,
                g6e,
                Z3p,
                P49,
                w_f;
                if (!this.cleanupGaps) {
                    return L$n;
                }
                if (this.layout.interval == "tick") {
                    return L$n;
                }
                if (L$n && !L$n.length) {
                    return L$n;
                }
                if (!N1_) {
                    N1_ = this.chart;
                }
                m2h = this.layout.interval;
                if (m2h == "month" || m2h == "week") {
                    R58 = "d";
                    R58 += "a";
                    R58 += "y";
                    if (this.dontRoll) {
                        return L$n;
                    }
                    m2h = R58;
                }
                k2E = function (f6o) {
                    y6x.x24();
                    var n0E;
                    if (f6o.DT) {
                        n0E = f6o.DT;
                    } else {
                        n0E = D.strToDateTime(f6o.Date);
                    }
                    return n0E;
                };
                j90 = [];
                M7h = L$n[0];
                j90.push(L$n[0]);
                g6d = {
                    'begin': k2E(M7h),
                    'interval': m2h,
                    'periodicity': 1,
                    'timeUnit': this.layout.timeUnit,
                    'inZone': this.dataZone,
                    'outZone': this.dataZone
                };
                g6e = N1_.market.newIterator(g6d);
                for (var E1h = 1; E1h < L$n.length; E1h++) {
                    Z3p = L$n[E1h];
                    P49 = g6e.next();
                    w_f = k2E(Z3p);
                    while (P49 < w_f) {
                        j90.push({
                            DT: P49,
                            Open: M7h.Close,
                            High: M7h.Close,
                            Low: M7h.Close,
                            Close: M7h.Close,
                            Volume: 0,
                            Adj_Close: M7h.Adj_Close
                        });
                        P49 = g6e.next();
                    }
                    j90.push(Z3p);
                    M7h = Z3p;
                }
                return j90;
            };
            A.Driver = function (U_0, t6T, k8O) {
                this.tagalongs = {};
                this.stx = U_0;
                this.quoteFeed = t6T;
                this.behavior = k8O;
                this.loadingNewChart = !!"";
                this.intervalTimer = null;
                this.updatingChart = !({});
                this.updateChartLoop();
            };
            A.Driver.prototype.die = function () {
                y6x.x24();
                if (this.intervalTimer) {
                    window.clearInterval(this.intervalTimer);
                }
            };
            A.Driver.prototype.updateSubscriptions = function () {
                if (this.quoteFeed.checkSubscriptions) {
                    this.quoteFeed.checkSubscriptions(this.stx);
                }
            };
            A.Driver.prototype.attachTagAlongQuoteFeed = function (R$W) {
                if (!this.tagalongs[R$W.label]) {
                    this.tagalongs[R$W.label] = {
                        label: R$W.label,
                        quoteFeed: R$W.quoteFeed,
                        behavior: R$W.behavior ? R$W.behavior : {},
                        count: 0
                    };
                }
                this.tagalongs[R$W.label].count++;
            };
            A.Driver.prototype.detachTagAlongQuoteFeed = function (k$W) {
                var y5o;
                y6x.x24();
                y5o = this.tagalongs[k$W.label];
                y5o.count--;
                if (!y5o.count) {
                    this.tagalongs[k$W.label] = null;
                }
            };
            A.Driver.prototype.loadDependents = function (X5n) {
                var i9G,
                C3H,
                r2z,
                y0Y,
                x_W,
                a_9;
                C3H = {};
                r2z = X5n.stx;
                y0Y = r2z.chart.series;
                for (i9G in y0Y) {
                    if (!y0Y[i9G].parameters.data || !y0Y[i9G].parameters.data.useDefaultQuoteFeed)
                        continue;
                    C3H[i9G] = !0;
                }
                for (var h7q in r2z.panels) {
                    if (r2z.panels[h7q].studyQuotes) {
                        for (var G7E in r2z.panels[h7q].studyQuotes) {
                            C3H[G7E] = !!({});
                        }
                    }
                }
                x_W = [];
                for (i9G in C3H) {
                    a_9 = D.shallowClone(X5n.originalState);
                    a_9.symbol = i9G;
                    if (y0Y[i9G] && y0Y[i9G].parameters.symbolObject) {
                        a_9.symbolObject = y0Y[i9G].parameters.symbolObject;
                    }
                    if (a_9.update) {
                        a_9.startDate = i4H(i9G);
                    } else {
                        if (!a_9.startDate && r2z.masterData[0]) {
                            a_9.startDate = r2z.masterData[0].DT;
                        }
                        if (!a_9.endDate && r2z.masterData[r2z.masterData.length - 1]) {
                            a_9.endDate = r2z.masterData[r2z.masterData.length - 1].DT;
                        }
                    }
                    x_W.push(a_9);
                }
                if (!x_W.length) {
                    r2z.createDataSet();
                    if (!X5n.nodraw) {
                        r2z.draw();
                    }
                    return;
                }
                this.quoteFeed.multiFetch(x_W, function (T1f) {
                    var P2E,
                    i8f;
                    y6x.r72();
                    for (var u6$ = 0; u6$ < T1f.length; u6$++) {
                        P2E = T1f[u6$];
                        if (!P2E.dataCallback.error && P2E.dataCallback.error !== ("0" ^ 0)) {
                            i8f = null;
                            if (r2z.chart.series[P2E.params.symbol]) {
                                i8f = r2z.chart.series[P2E.params.symbol].parameters.field;
                            }
                            D.addMemberToMasterdata(r2z, P2E.params.symbol, P2E.dataCallback.quotes, null, null, i8f);
                        }
                    }
                    r2z.createDataSet();
                    r2z.draw();
                });
                function i4H(U2c) {
                    for (var x0t = r2z.masterData.length -  + "1"; x0t >= 0; x0t--) {
                        if (r2z.masterData[x0t] && typeof r2z.masterData[x0t][U2c] != "undefined") {
                            return D.strToDateTime(r2z.masterData[x0t].Date);
                        }
                    }
                    return X5n.startDate;
                }
            };
            A.Driver.prototype.executeTagAlongs = function (F3E) {
                var r$n,
                w9y,
                X4M,
                j38;
                r$n = {
                    count: D.objLength(this.taglongs)
                };
                w9y = this;
                for (var W1F in this.tagalongs) {
                    X4M = this.tagalongs[W1F];
                    j38 = D.shallowClone(X4M.behavior);
                    D.extend(j38, F3E, !![]);
                    X4M.quoteFeed.fetch(j38, G6h(j38, X4M, r$n));
                }
                function G6h(j_A, s8V, G0C) {
                    y6x.r72();
                    return function (v24) {
                        var r4z;
                        G0C.count--;
                        y6x.x24();
                        if (!v24.error && v24.error !== 0) {
                            r4z = j_A.fields;
                            if (!r4z) {
                                r4z = null;
                            }
                            D.addMemberToMasterdata(w9y.stx, s8V.label, v24.quotes, r4z);
                        }
                        if (G0C.count == -1) {
                            w9y.render();
                        }
                    };
                }
            };
            A.Driver.prototype.render = function () {
                this.stx.createDataSet();
                this.stx.draw();
            };
            A.Driver.prototype.updateChart = function () {
                var n3_,
                S0E,
                I$J,
                n0r,
                w9u,
                X_9,
                Q3P;
                if (this.updatingChart) {
                    return;
                }
                function p4K(V0W, D4R, B$u) {
                    if (V0W.behavior.prefetchAction) {
                        V0W.behavior.prefetchAction("updateChart");
                    }
                    y6x.x24();
                    return function (y1q) {
                        var O_Y,
                        M0C,
                        g8U,
                        A4K,
                        G9V;
                        O_Y = -119660397;
                        M0C = -1309235681;
                        g8U =  + "2";
                        for (var l8r = 1; y6x.a5V(l8r.toString(), l8r.toString().length, 48608) !== O_Y; l8r++) {
                            S0E++;
                            g8U += 2;
                        }
                        if (y6x.a5V(g8U.toString(), g8U.toString().length, 6003) !== M0C) {
                            S0E--;
                        }
                        if (B$u == D4R.chart.symbol && I$J == V0W.stx.layout.interval && n0r == V0W.stx.layout.timeUnit) {
                            if (!y1q.error && y1q.error !== 0) {
                                A4K = ![];
                                if (!D4R.missingBarsCreated) {
                                    if (D4R.chart.masterData && D4R.chart.masterData.length && y1q.quotes && y1q.quotes.length > 0) {
                                        y6x.E_X(40);
                                        var m6G = y6x.z7A(17, 18);
                                        G9V = D4R.chart.masterData[D4R.chart.masterData.length - m6G];
                                        if (y1q.quotes[0].DT && G9V.DT < y1q.quotes[ + "0"].DT || y1q.quotes[0].Date && G9V.Date < y1q.quotes["0" - 0].Date) {
                                            y1q.quotes.unshift(G9V);
                                            A4K = !0; ;
                                        }
                                    }
                                    y1q.quotes = V0W.stx.doCleanupGaps(y1q.quotes, D4R.chart);
                                    if (A4K) {
                                        y1q.quotes.shift();
                                    }
                                }
                                V0W.stx.appendMasterData(y1q.quotes, D4R.chart, {
                                    noCreateDataSet: !!"1"
                                });
                                D4R.chart.attribution = y1q.attribution;
                            } else {
                                V0W.quoteFeed.announceError(D4R.originalState, y1q);
                            }
                        } else {
                            return;
                        }
                        y6x.r72();
                        if (S0E == n3_) {
                            V0W.updatingChart = !({});
                        }
                        V0W.executeTagAlongs(D4R);
                        if (V0W.behavior.callback) {
                            V0W.behavior.callback(D4R);
                        }
                        V0W.loadDependents(D4R); ;
                    };
                }
                if (this.loadingNewChart) {
                    return;
                }
                n3_ = D.objLength(this.stx.charts);
                y6x.E_X(4);
                S0E = y6x.z7A("0", 0);
                I$J = this.stx.layout.interval;
                n0r = this.stx.layout.timeUnit;
                for (var N6D in this.stx.charts) {
                    w9u = this.stx.charts[N6D];
                    if (!w9u.symbol)
                        continue;
                    X_9 = this.makeParams(w9u.symbol, w9u.symbolObject, w9u);
                    if (w9u.masterData && w9u.masterData.length) {
                        X_9.startDate = w9u.masterData[w9u.masterData.length - 1].DT;
                    }
                    X_9.update = !!1;
                    X_9.originalState = D.shallowClone(X_9);
                    this.updatingChart = !!({});
                    Q3P = p4K(this, X_9, w9u.symbol);
                    if (this.stx.isEquationChart(X_9.symbol)) {
                        D.fetchEquationChart(X_9, Q3P);
                    } else {
                        this.quoteFeed.fetch(X_9, Q3P);
                    }
                }
            };
            A.Driver.prototype.updateChartLoop = function () {
                if (this.behavior.noUpdate) {
                    return;
                }
                if (this.behavior.refreshInterval) {
                    this.intervalTimer = window.setInterval(Z8C(this), this.behavior.refreshInterval * 1000);
                }
                y6x.r72();
                function Z8C(F_r) {
                    return function () {
                        y6x.r72();
                        if (F_r.behavior.noUpdate) {
                            return;
                        }
                        F_r.updateChart();
                    };
                }
            };
            A.Driver.prototype.resetRefreshInterval = function (U$G) {
                if (this.intervalTimer) {
                    window.clearInterval(this.intervalTimer);
                }
                this.behavior.refreshInterval = U$G;
                this.updateChartLoop();
                y6x.r72(); ;
            };
            A.Driver.prototype.loadAll = function (N_e, Z17) {
                var A07,
                A91,
                A7z,
                a84,
                u39;
                A07 = 662307730;
                A91 = 1916292870;
                y6x.r9e(4);
                A7z = y6x.v50("2", 0);
                for (var U8d = 1; y6x.P2D(U8d.toString(), U8d.toString().length, 59442) !== A07; U8d++) {
                    a84 = this;
                    A7z += 2;
                }
                function D21() {
                    y6x.x24();
                    return function (Z_k) {
                        if (Z_k) {
                            Z17(Z_k);
                        } else if (!N_e.moreAvailable) {
                            Z17(null);
                        } else if (u39++ > 20) {
                            Z17("error, moreAvailable not implemented correctly in QuoteFeed");
                        } else {
                            a84.checkLoadMore(N_e, !![], !"", D21());
                        }
                    };
                }
                if (y6x.a5V(A7z.toString(), A7z.toString().length, 37812) !== A91) {
                    a84 = this;
                }
                u39 = 0;
                this.checkLoadMore(N_e, !!({}), !![], D21());
            };
            A.Driver.prototype.checkLoadMore = function (k$E, E9X, s2o, Z__, L6$) {
                var j6s,
                r7B,
                d3D,
                S1w,
                m5E,
                p$I,
                h_e,
                K8Q;
                if (!k$E.moreAvailable) {
                    if (Z__) {
                        Z__();
                    }
                    return;
                }
                j6s = this.stx.layout.interval;
                y6x.x24();
                r7B = 227598647;
                d3D =  -  + "1018393810";
                S1w = 2;
                for (var r60 = 1; y6x.P2D(r60.toString(), r60.toString().length, 55484) !== r7B; r60++) {
                    m5E = this.stx.layout.timeUnit;
                    S1w += 2;
                }
                function k3a(a81, I3m) {
                    if (a81.behavior.prefetchAction) {
                        a81.behavior.prefetchAction("checkLoadMore");
                    }
                    return function (E4e) {
                        var i5g;
                        y6x.x24();
                        if (I3m.symbol == I3m.chart.symbol && j6s == a81.stx.layout.interval && m5E == a81.stx.layout.timeUnit) {
                            if (!I3m.loadMore) {
                                I3m.chart.loadingMore = ![];
                            }
                            if (!E4e.error && E4e.error !== 0) {
                                if (!I3m.missingBarsCreated) {
                                    E4e.quotes.push(I3m.chart.masterData[0]);
                                    E4e.quotes = a81.stx.doCleanupGaps(E4e.quotes, I3m.chart);
                                    E4e.quotes.pop(); ;
                                }
                                I3m.chart.moreAvailable = E4e.moreAvailable;
                                i5g = I3m.loadMoreReplace ? E4e.quotes : E4e.quotes.concat(I3m.chart.masterData);
                                a81.stx.setMasterData(i5g, I3m.chart);
                                a81.stx.createDataSet();
                                if (!L6$) {
                                    a81.stx.draw();
                                }
                                I3m.startDate = I3m.chart.masterData[0].DT;
                                a81.executeTagAlongs(I3m);
                                if (a81.behavior.callback) {
                                    a81.behavior.callback(I3m);
                                }
                                a81.loadDependents(I3m);
                            } else {
                                a81.quoteFeed.announceError(I3m.originalState, E4e);
                            }
                            I3m.chart.loadingMore = ![];
                            if (Z__) {
                                Z__(null);
                            }
                        } else {
                            return;
                        }
                    };
                }
                if (y6x.a5V(S1w.toString(), S1w.toString().length, 48246) !== d3D) {
                    m5E = this.stx.layout.timeUnit;
                }
                p$I = k$E.loadingMore;
                if (!this.behavior.noLoadMore) {
                    if (!this.stx.maxDataSetSize || k$E.dataSet.length < this.stx.maxDataSetSize) {
                        if (k$E.dataSet.length >  + "0" && k$E.scroll >= k$E.dataSet.length || E9X) {
                            if (!k$E.loadingMore) {
                                k$E.initialScroll = k$E.scroll;
                                k$E.loadingMore = !![];
                                h_e = this.makeParams(k$E.symbol, k$E.symbolObject, k$E);
                                h_e.endDate = k$E.masterData[ + "0"].DT;
                                h_e.originalState = D.shallowClone(h_e);
                                h_e.nodraw = L6$;
                                if (this.stx.fetchMaximumBars[this.stx.layout.aggregationType]) {
                                    s2o = !!1;
                                }
                                if (s2o) {
                                    h_e.fetchMaximumBars = !![];
                                    h_e.ticks = Math.max(20000, h_e.ticks);
                                }
                                K8Q = k3a(this, h_e);
                                if (this.stx.isEquationChart(h_e.symbol)) {
                                    D.fetchEquationChart(h_e, K8Q);
                                } else {
                                    this.quoteFeed.fetch(h_e, K8Q);
                                }
                                p$I = !!1;
                            }
                        }
                    }
                }
                if (k$E.loadingMore) {
                    k$E.initialScroll = k$E.scroll;
                }
                if (!p$I && Z__) {
                    Z__(null);
                }
            };
            A.Driver.prototype.barsToFetch = function (j7c) {
                var c8a,
                r1p,
                Q8U,
                x86;
                if (j7c.isSeries) {
                    return j7c.stx.masterData.length;
                }
                c8a = this.stx.layout.interval;
                r1p = j7c.stx.layout.periodicity;
                if ((c8a == "month" || c8a == "week") && !this.stx.dontRoll) {
                    Q8U = "w";
                    Q8U += "ee";
                    Q8U += "k";
                    r1p *= c8a == Q8U ?  + "7" : 30;
                }
                x86 = j7c.stx.chart.maxTicks * r1p;
                return x86;
            };
            A.Driver.prototype.makeParams = function (Y2u, h4D, M8A) {
                var V7q,
                z5H,
                d$8,
                a6f,
                Y_c;
                V7q = "we";
                V7q += "e";
                V7q += "k";
                z5H = "m";
                z5H += "onth";
                d$8 = this.stx.layout.interval;
                a6f = this.barsToFetch({
                    stx: this.stx
                });
                if ((d$8 == z5H || d$8 == V7q) && !this.stx.dontRoll) {
                    d$8 = "day";
                }
                Y_c = D.shallowClone(this.behavior);
                D.extend(Y_c, {
                    stx: this.stx,
                    symbol: Y2u,
                    symbolObject: h4D,
                    chart: M8A,
                    interval: d$8,
                    extended: this.stx.layout.extended,
                    period: 1,
                    feed: "delayed",
                    ticks: a6f
                }, !!({}));
                y6x.x24();
                if (!Y_c.symbolObject) {
                    Y_c.symbolObject = {
                        symbol: Y2u
                    };
                }
                if (!isNaN(Y_c.interval)) {
                    Y_c.period = Y_c.interval;
                    Y_c.interval = this.stx.layout.timeUnit;
                    if (!Y_c.interval) {
                        Y_c.interval = "minute";
                    }
                }
                if (Y_c.pts) {
                    Y_c.ticks = Math.max(Y_c.ticks, 1000);
                }
                return Y_c;
            };
            A.Driver.prototype.newChart = function (M70, w1c) {
                var N3z,
                j$M,
                P0T,
                O7s,
                y8T,
                k8y,
                f7V;
                y6x.r72();
                N3z = this.stx;
                j$M = M70.symbol;
                P0T = N3z.layout.interval;
                O7s = N3z.layout.timeUnit;
                y8T = M70.chart;
                y8T.moreAvailable = !1;
                y8T.attribution = null;
                k8y = this.makeParams(j$M, M70.symbolObject, y8T);
                function m6Q(a_B, W9R) {
                    var L4l;
                    L4l = "n";
                    L4l += "e";
                    L4l += "wChart";
                    if (a_B.behavior.prefetchAction) {
                        a_B.behavior.prefetchAction(L4l);
                    }
                    return function (F5K) {
                        if (j$M == W9R.chart.symbol && P0T == N3z.layout.interval && O7s == N3z.layout.timeUnit) {
                            if (!F5K.error && F5K.error !== 0) {
                                if (!W9R.missingBarsCreated) {
                                    F5K.quotes = N3z.doCleanupGaps(F5K.quotes, M70.chart);
                                }
                                N3z.setMasterData(F5K.quotes, W9R.chart);
                                W9R.chart.moreAvailable = F5K.moreAvailable;
                                W9R.chart.attribution = F5K.attribution;
                                N3z.createDataSet();
                                if (M70.initializeChart) {
                                    N3z.initializeChart();
                                }
                                if (!W9R.nodraw) {
                                    N3z.home();
                                };
                            } else {
                                a_B.quoteFeed.announceError(W9R.originalState, F5K);
                            }
                        } else {
                            if (w1c) {
                                w1c("orphaned");
                            }
                            return;
                        }
                        a_B.loadingNewChart = !!"";
                        if (w1c) {
                            w1c(F5K.error);
                        }
                        if (W9R.chart.masterData && W9R.chart.masterData.length) {
                            W9R.startDate = W9R.chart.masterData[ + "0"].DT;
                        }
                        a_B.executeTagAlongs(W9R);
                        if (a_B.behavior.callback) {
                            a_B.behavior.callback(W9R);
                        }
                        a_B.loadDependents(W9R);
                        y6x.r72();
                        a_B.resetRefreshInterval(a_B.behavior.refreshInterval);
                    };
                }
                D.extend(k8y, M70, !![]);
                if (N3z.fetchMaximumBars[N3z.layout.aggregationType]) {
                    k8y.ticks = Math.max( + "20000", k8y.ticks);
                    k8y.fetchMaximumBars = !!1;
                }
                this.loadingNewChart = !!({});
                this.updatingChart = ![];
                k8y.originalState = D.shallowClone(k8y);
                f7V = m6Q(this, k8y);
                if (this.stx.isEquationChart(k8y.symbol)) {
                    D.fetchEquationChart(k8y, f7V);
                } else {
                    this.quoteFeed.fetch(k8y, f7V);
                }
            };
            A.prototype.attachQuoteFeed = function (N3g, U4r) {
                y6x.x24();
                if (!U4r) {
                    U4r = {};
                }
                if (this.quoteDriver) {
                    this.quoteDriver.die();
                }
                this.quoteDriver = new A.Driver(this, N3g, U4r);
            };
            A.prototype.attachTagAlongQuoteFeed = function (H0Z) {
                var e81;
                if (!H0Z.label) {
                    e81 = "Attempt to attachTagAlongQuo";
                    e81 += "teFeed without assigning a label";
                    console.log(e81);
                    return;
                }
                this.quoteDriver.attachTagAlongQuoteFeed(H0Z);
            };
            A.prototype.detachTagAlongQuoteFeed = function (R4G) {
                y6x.r72();
                this.quoteDriver.detachTagAlongQuoteFeed(R4G);
            };
            D.Comparison = function () {};
            D.Comparison.mouseHasMoved = !({});
            D.Comparison.priceToPercent = function (j0Z, l9X, x6s) {
                y6x.r9e(9);
                var B3d = y6x.z7A(17, 5136, 300, 8);
                y6x.E_X(38);
                var L7F = y6x.v50(3, 9984, 13);
                y6x.r9e(63);
                var n9u = y6x.z7A(4, 7, 10016, 7489);
                y6x.r72();
                return Math.round((x6s - D.Comparison.baseline) / D.Comparison.baseline * B3d * L7F) / n9u;
            };
            D.Comparison.percentToPrice = function (K75, G5Q, Y$p) {
                y6x.E_X(125);
                var j8S = y6x.z7A(9, 0, 0, 20, 11);
                return D.Comparison.baseline * ("1" * j8S + Y$p /  + "100");
            };
            D.Comparison.stopSort = function (r42, K8G) {
                y6x.r9e(4);
                return y6x.z7A(r42, K8G);
            };
            D.Comparison.createComparisonSegmentInner = function (W51, y3q) {
                var K69,
                n7L,
                H7M,
                g21,
                q68,
                t_l,
                u_9,
                f1z,
                r7w,
                w3l,
                X_V,
                Q56,
                R6i,
                n9$,
                M7i,
                k45,
                L0d,
                V0q,
                f4$,
                n90,
                W9w;
                K69 = [];
                for (n7L in y3q.series) {
                    if (y3q.series[n7L].parameters.isComparison) {
                        K69.push(n7L);
                    }
                }
                H7M = ["Close", "Open", "High", "Low", "iqPrevClose"];
                y3q.dataSegment = [];
                g21 = null;
                q68 = y3q.dataSet.length - y3q.scroll;
                t_l = q68 + y3q.maxTicks;
                u_9 = 0;
                f1z = [];
                for (r7w = 0; r7w < W51.drawingObjects.length; r7w++) {
                    w3l = "c";
                    w3l += "omparison_st";
                    w3l += "op";
                    X_V = W51.drawingObjects[r7w];
                    if (X_V.name == w3l)
                        if (X_V.tick > q68 && X_V.tick <= t_l) {
                            f1z.push(X_V.tick);
                        }
                }
                f1z.sort(D.Comparison.stopSort);
                y6x.r9e(104);
                var C__ = y6x.v50(12, 18, 1023, 19, 4);
                Q56 = y3q.maxTicks + C__;
                for (r7w = 0; r7w <= Q56; r7w++) {
                    if (r7w == Q56) {
                        r7w = -1;
                    }
                    y6x.r9e(0);
                    position = y6x.z7A(q68, r7w);
                    if (position < y3q.dataSet.length && position >= 0) {
                        R6i = y3q.dataSet[position];
                        if (!g21) {
                            g21 = D.clone(R6i);
                        }
                        if (!R6i.transform) {
                            R6i.transform = {
                                "cache": {},
                                "DT": R6i.DT,
                                "Date": R6i.Date
                            };
                        }
                        D.Comparison.baseline = g21.Close;
                        for (n9$ = 0; n9$ < H7M.length; n9$++) {
                            n7L = H7M[n9$];
                            if (R6i[n7L] || R6i[n7L] === 0) {
                                y6x.r9e(126);
                                var Q7c = y6x.v50(19, 1741, 1900, 20, 20);
                                y6x.r9e(0);
                                var x6J = y6x.z7A(769, 9231);
                                y6x.r9e(54);
                                var h0e = y6x.z7A(16, 2, 10, 1250, 7552);
                                R6i.transform[n7L] = Math.round((R6i[n7L] - D.Comparison.baseline) / D.Comparison.baseline * Q7c * x6J) / h0e;
                            };
                        }
                        M7i = W51.layout.studies;
                        if (M7i) {
                            for (var P2k in M7i) {
                                k45 = M7i[P2k];
                                if (!W51.panels[k45.panel] || W51.panels[k45.panel].name != k45.chart.name)
                                    continue;
                                for (n7L in k45.outputMap) {
                                    if (R6i[n7L] || R6i[n7L] === 0) {
                                        y6x.E_X(4);
                                        var Y9w = y6x.v50(118, 18);
                                        y6x.r9e(127);
                                        var f1r = y6x.v50(259470, 9, 10, 3, 9980);
                                        y6x.E_X(80);
                                        var j6E = y6x.z7A(8, 9984, 69872);
                                        R6i.transform[n7L] = Math.round((R6i[n7L] - D.Comparison.baseline) / D.Comparison.baseline * Y9w * f1r) / j6E;
                                    };
                                }
                                if (k45.referenceOutput && (R6i[k45.referenceOutput + (8335 !== 35.84 ? " " : 407.99) + k45.name] || R6i[k45.referenceOutput + (939.39 == 1890 ? (0x9e, 66.81) : " ") + k45.name] === 0)) {
                                    y6x.E_X(64);
                                    var k2Y = y6x.v50(2604, 2607, 868);
                                    y6x.E_X(128);
                                    var r7y = y6x.v50(1510, 5, 7, 7, 14);
                                    y6x.r9e(129);
                                    var v8y = y6x.z7A(4, 3, 15677, 80640);
                                    y6x.E_X(130);
                                    var X92 = y6x.z7A(933, 14, 3, 5287, 12);
                                    y6x.E_X(65);
                                    var b97 = y6x.v50(17, 47, 1000, 339);
                                    y6x.E_X(28);
                                    var h0E = y6x.v50(87, 7, 20);
                                    y6x.E_X(0);
                                    var S27 = y6x.v50(1250, 8750);
                                    y6x.E_X(121);
                                    var e58 = y6x.z7A(8, 320, 8, 10);
                                    R6i.transform[k45.referenceOutput + (k2Y < ("580" ^ 0, r7y) ? ![] : " ") + k45.name] = Math.round((R6i[k45.referenceOutput + (v8y >= (X92,  + "6756") ? ("1.53e+3" ^ 0, b97) : " ") + k45.name] - D.Comparison.baseline) / D.Comparison.baseline * h0E * S27) / ("10000" >> e58);
                                };
                            }
                        }
                        for (n9$ in W51.plugins) {
                            L0d = W51.plugins[n9$];
                            if (!L0d.transformOutputs)
                                continue;
                            for (n7L in L0d.transformOutputs) {
                                if (R6i[n7L] || R6i[n7L] === 0) {
                                    y6x.r9e(131);
                                    var d7O = y6x.v50(10442, 12, 18, 10, 88);
                                    y6x.r9e(0);
                                    var Q75 = y6x.v50(588, 9412);
                                    R6i.transform[n7L] = Math.round((R6i[n7L] - D.Comparison.baseline) / D.Comparison.baseline * d7O * Q75) / 10000;
                                };
                            }
                        }
                        V0q = ![];
                        if (f1z && u_9 < f1z.length) {
                            if (position === f1z[u_9]) {
                                V0q = !"";
                                u_9++;
                            }
                        }
                        f4$ = null;
                        if (W51.activeDrawing && W51.activeDrawing.name == "comparison_stop") {
                            f4$ = W51.activeDrawing.tick;
                        }
                        if (V0q || position == f4$) {
                            for (n9$ = 0; n9$ < K69.length; n9$++) {
                                n7L = K69[n9$];
                                n90 = R6i[n7L];
                                y6x.E_X(132);
                                var E54 = y6x.v50(3, 6, 18, 5, 7);
                                y6x.r9e(28);
                                var k3j = y6x.v50(110, 15, 5);
                                g21[n7L] = n90 / (E54 + R6i.transform.Close / k3j);
                            }
                        }
                        for (n9$ =  + "0"; n9$ < K69.length; n9$++) {
                            n7L = K69[n9$];
                            n90 = R6i[n7L];
                            if (n90 || n90 === 0) {
                                W9w = g21[n7L];
                                if (!W9w && W9w !== "0" >> 0) {
                                    y6x.E_X(20);
                                    var N7O = y6x.v50(2, 84, 18);
                                    g21[n7L] = W9w = n90 / (("1" ^ 0) + R6i.transform.Close / N7O);
                                }
                                y6x.r9e(133);
                                var q9G = y6x.z7A(7, 103, 20, 72, 103);
                                y6x.E_X(134);
                                var c8t = y6x.v50(10006, 10, 9995, 19, 2007);
                                y6x.r9e(0);
                                var Q1X = y6x.v50(1111, 8889);
                                R6i.transform[n7L] = Math.round((n90 - W9w) / W9w * q9G * c8t) / Q1X;
                            }
                        }
                        y3q.dataSegment.push(R6i);
                    } else if (position < 0) {
                        y3q.dataSegment.push(null);
                    }
                    if (r7w < 0)
                        break; ;
                }
                W51.clearPixelCache();
                return !!1;
            };
            D.Comparison.createComparisonSegment = function () {
                var l6C;
                y6x.r72();
                for (var f7q in this.charts) {
                    l6C = this.charts[f7q];
                    if (l6C.isComparison) {
                        D.Comparison.createComparisonSegmentInner(this, l6C);
                    }
                }
            };
            D.Comparison.priceFormat = function (j__, V42, b$B) {
                var Y9R,
                H2i;
                Y9R = "u";
                Y9R += "nde";
                Y9R += "f";
                Y9R += "ined";
                if (b$B === null || typeof b$B == Y9R) {
                    return "";
                }
                H2i = V42.yAxis.priceTick;
                if (j__.internationalizer) {
                    if (H2i >= 1) {
                        y6x.E_X(23);
                        b$B = j__.internationalizer.percent0.format(y6x.v50(b$B, 100));
                    } else if (H2i >= 0.1) {
                        y6x.E_X(23);
                        b$B = j__.internationalizer.percent1.format(y6x.z7A(b$B, 100));
                    } else if (H2i >= 0.01) {
                        y6x.E_X(23);
                        b$B = j__.internationalizer.percent2.format(y6x.v50(b$B, 100));
                    } else if (H2i >= 0.001) {
                        y6x.r9e(23);
                        b$B = j__.internationalizer.percent3.format(y6x.v50(b$B, 100));
                    } else {
                        b$B = j__.internationalizer.percent4.format(b$B);
                    }
                } else {
                    if (H2i >= 1) {
                        b$B = b$B.toFixed(0) + "%";
                    } else if (H2i >= 0.1) {
                        y6x.r9e(135);
                        var M22 = y6x.v50(6, 7, 3, 3);
                        y6x.r9e(136);
                        var j1H = y6x.v50(1, 96362, 104390, 2);
                        y6x.E_X(65);
                        var s5G = y6x.v50(10, 1506, 1498, 1508);
                        y6x.r9e(54);
                        var N6L = y6x.v50(5, 14, 5, 0, 141);
                        y6x.E_X(137);
                        var F1O = y6x.v50(2361, 295, 11, 3);
                        y6x.r9e(16);
                        var I2V = y6x.v50(10286, 14, 11330);
                        y6x.r9e(131);
                        var l$t = y6x.z7A(1503420, 16, 7, 11, 8591);
                        y6x.r9e(80);
                        var s62 = y6x.z7A(9, 7319, 58561);
                        y6x.r9e(32);
                        var o_h = y6x.v50(2, 120939, 111636, 2);
                        b$B = b$B.toFixed(M22) + ((933.3, j1H) == (s5G,  + "9520") ? "0xb0c" * N6L : F1O < (137.31,  + "580.29") ? ("r", 616.23) : (I2V, 4718) !== (l$t, s62) ? "%" : (o_h, !!""));
                    } else if (H2i >= "0.01" - 0) {
                        y6x.E_X(138);
                        var B0g = y6x.z7A(16, 348, 18, 3, 10);
                        b$B = b$B.toFixed(B0g) + "%";
                    } else if (H2i >= 0.001) {
                        y6x.r9e(20);
                        var o1U = y6x.v50(0, 0, 3);
                        y6x.E_X(4);
                        var l3x = y6x.z7A(109965, 102634);
                        y6x.E_X(73);
                        var p3Z = y6x.v50(524, 2602, 16, 4);
                        y6x.r9e(139);
                        var z4u = y6x.z7A(11, 14, 10, 25, 4018);
                        y6x.E_X(9);
                        var Y0s = y6x.v50(11, 78655, 7848, 17);
                        y6x.E_X(0);
                        var i8M = y6x.z7A(489, 5863);
                        y6x.E_X(0);
                        var e3k = y6x.z7A(4452, 18);
                        b$B = b$B.toFixed(o1U) + (l3x === p3Z ? (z4u, Y0s) !== ( + "6459", i8M) ? !({}) : e3k : "%");
                    } else {
                        y6x.r9e(140);
                        var C2x = y6x.v50(17, 21120, 179520, 1918);
                        y6x.r9e(0);
                        var r1v = y6x.v50(134, 1076);
                        y6x.r9e(125);
                        var x2I = y6x.v50(1, 16, 30, 20, 2);
                        y6x.r9e(73);
                        var j1m = y6x.z7A(2338, 6994, 6, 12);
                        y6x.E_X(4);
                        var Y0P = y6x.z7A(152160, 142650);
                        y6x.r9e(46);
                        var J8z = y6x.v50(3260, 2602, 4, 10);
                        b$B = b$B.toFixed( + "4") + ((C2x, 635.79) == ( + "2725", 635.98) ? (r1v, "9.06e+3" | x2I) : ("6120" ^ 0) >= (j1m, Y0P) ? J8z : "%");
                    }
                }
                if (parseFloat(b$B) === 0 && b$B.charAt(0) == ((454.11, "2060" ^ 0) != 5860 ? 8709 <= "559.61" * 1 ? (387.07, 0x1f) : 389 !== (5060, 2707) ? "-" : 254.97 : !"1")) {
                    b$B = b$B.substring( + "1");
                }
                y6x.x24();
                return b$B;
            };
            D.Comparison.correlate = function (f4Y, v3n) {
                var s12,
                C09,
                r9Y,
                l_g,
                r32,
                X8k,
                L7Y;
                if (!D.Comparison.requestCorrelation || s12 <= 0) {
                    return;
                }
                s12 = parseInt(W(".stxCorrelate .stx-input-field").value, 10);
                C09 = f4Y.panels[D.Comparison.correlationPanel + " (" + s12 + ")"];
                r9Y = {
                    "id": D.Comparison.correlationPanel + " (" + s12 + ")",
                    "Period": s12,
                    "Compare To": []
                };
                l_g = {};
                r32 = null;
                if (C09) {
                    X8k = "Compar";
                    X8k += "e To";
                    for (var y8v = 0; y8v < f4Y.layout.studies[C09.name].inputs[X8k].length; y8v++) {
                        r9Y["Compare To"].push(f4Y.layout.studies[C09.name].inputs["Compare To"][y8v]);
                    }
                    for (var H0X in f4Y.layout.studies[C09.name].outputs) {
                        l_g[H0X] = f4Y.layout.studies[C09.name].outputs[H0X];
                    }
                    r32 = C09.name;
                }
                r9Y["Compare To"].push(v3n);
                y6x.r9e(0);
                l_g[y6x.z7A("Result ", v3n)] = D.Comparison.colorSelection;
                D.Studies.addStudy(f4Y, "correl", r9Y, l_g, null, r32);
                for (var b80 in f4Y.panels) {
                    if (f4Y.panels[b80].name.indexOf(D.Comparison.correlationPanel) === 0) {
                        L7Y = f4Y.layout.studies[f4Y.panels[b80].name].inputs["Compare To"];
                        for (var a0s = 0; a0s < L7Y.length; a0s++) {
                            if (L7Y[a0s] == v3n) {
                                y6x.E_X(0);
                                f4Y.layout.studies[f4Y.panels[b80].name].outputs[y6x.z7A("Result ", v3n)] = D.Comparison.colorSelection;
                            }
                        }
                    }
                }
            };
            D.Comparison.toggleCorrelate = function (D3h) {
                var a7w,
                M_y,
                f_C,
                P86,
                L3F;
                a7w = 707255747;
                M_y = -1811516286;
                f_C = 2;
                for (var r5J = 1; y6x.P2D(r5J.toString(), r5J.toString().length, 36577) !== a7w; r5J++) {
                    D.Comparison.requestCorrelation = +D.Comparison.requestCorrelation;
                    P86 = W("");
                    f_C += 2;
                }
                y6x.x24();
                if (y6x.P2D(f_C.toString(), f_C.toString().length, 86941) !== M_y) {
                    L3F = ".stxCorrelate .stx-ch";
                    L3F += "eckbox";
                    D.Comparison.requestCorrelation = !D.Comparison.requestCorrelation;
                    P86 = W(L3F);
                }
                if (P86) {
                    D.unappendClassName(P86, (!D.Comparison.requestCorrelation).toString());
                    D.appendClassName(P86, D.Comparison.requestCorrelation.toString());
                }
            };
            A.prototype.setComparison = function (Q1j, m9o) {
                y6x.r72();
                if (!m9o) {
                    m9o = this.chart;
                }
                if (typeof m9o == "string") {
                    m9o = this.charts[m9o];
                }
                if (!m9o.isComparison && Q1j) {
                    this.setTransform(m9o, D.Comparison.priceToPercent, D.Comparison.percentToPrice);
                    m9o.panel.yAxis.priceFormatter = D.Comparison.priceFormat;
                    m9o.panel.yAxis.whichSet = "dataSegment";
                } else if (m9o.isComparison && !Q1j) {
                    this.unsetTransform(m9o);
                    m9o.panel.yAxis.priceFormatter = null;
                    m9o.panel.yAxis.whichSet = "dataSet";
                }
                m9o.isComparison = Q1j;
            };
            D.Comparison.startPlugin = function () {
                A.prototype.prepend("createDataSegment", D.Comparison.createComparisonSegment);
            };
            D.Comparison.removeSeries = function (H64, d1k) {};
            D.SearchableWordList = function (J64, K7r, T8I) {
                var P4H,
                K1l,
                Z5k,
                n1c,
                E5u,
                n2i;
                if (!J64) {
                    return;
                }
                if (!K7r) {
                    K7r = 50;
                }
                y6x.r72();
                if (!T8I) {
                    T8I = !"1";
                }
                P4H = {
                    "records": [],
                    "words": []
                };
                for (var k6g = 0; k6g < J64.length; k6g++) {
                    K1l = J64[k6g];
                    if (!K1l.name) {
                        K1l.name = K1l.id;
                    }
                    y6x.E_X(141);
                    var r9U = y6x.z7A(1196, 8, 5, 16, 9);
                    K1l.index = P4H.records.push(K1l) - r9U;
                    Z5k = K1l.name.split(9261 > (60.62, 7293) ? (8418, 1250) < (308.11,  + "749.64") ? (4.03e+3,  + "0x1098") : (6458, 2069) != (9507, 986.82) ? " " : 0x11c3 : !!({}));
                    if (K1l.keywords) {
                        Z5k = Z5k.concat(K1l.keywords.split(" "));
                    }
                    for (var O$f = 0; O$f < Z5k.length; O$f++) {
                        n1c = Z5k[O$f].toUpperCase();
                        E5u = 5530 >= 1048 ? "_" : 1.34e+3;
                        n2i = 235.75 != 7880 ? "_" : 447.91;
                        if (n1c.charCodeAt(0) >= 33 && n1c.charCodeAt( + "0") <= 126) {
                            E5u = n1c.charAt( + "0");
                        }
                        if (!P4H.words[E5u]) {
                            P4H.words[E5u] = [];
                        }
                        if (n1c.length > 1) {
                            if (n1c.charCodeAt(1) >= 33 && n1c.charCodeAt( + "1") <= 126) {
                                n2i = n1c.charAt(1);
                            }
                        } else {
                            n2i = (997.04, 2690) >= ("8220" >> 32, 257.79) ? " " : (4840, 4974) == 3720 ? (606.03, "R") : 443.62 > ("667.3" - 0,  + "6440") ? (590,  + "340.93") : 0x1a75;
                        }
                        if (!P4H.words[E5u][n2i]) {
                            P4H.words[E5u][n2i] = [];
                        }
                        P4H.words[E5u][n2i].push({
                            index: K1l.index,
                            word: n1c
                        });
                    }
                }
                this.lookup = function (G_p, C8u, o4q) {
                    y6x.r72();
                    var L_s,
                    H21,
                    B2M,
                    c_i,
                    b8Y,
                    d$x,
                    Y$i,
                    k58,
                    H1_,
                    D56,
                    y_$,
                    T16,
                    r_U,
                    q2b,
                    v5m,
                    w$d,
                    C4_,
                    S8$,
                    N1V;
                    L_s = -308398831;
                    H21 = 1031529737;
                    B2M = 2;
                    for (var V5_ = 1; y6x.a5V(V5_.toString(), V5_.toString().length, 23553) !== L_s; V5_++) {
                        c_i = [];
                        B2M += 2;
                    }
                    function Z$C(p6b, L0A) {
                        if (p6b.weight > L0A.weight) {
                            return 1;
                        } else if (p6b.weight < L0A.weight) {
                            return -1;
                        }
                        return p6b.name > L0A.name ? 1 : -1;
                    }
                    if (y6x.a5V(B2M.toString(), B2M.toString().length, 76920) !== H21) {
                        c_i = [];
                    }
                    c_i = [];
                    if (G_p && P4H) {
                        b8Y = [];
                        d$x = G_p.toUpperCase();
                        Y$i = [];
                        for (k58 =  + "0"; k58 < P4H.records.length; k58++) {
                            H1_ = P4H.records[k58];
                            if (b8Y[H1_.index])
                                continue;
                            if (C8u && H1_.category != C8u)
                                continue;
                            D56 = H1_.name.toUpperCase();
                            if (d$x == "*") {
                                Y$i.push(D.extend(P4H.records[H1_.index], {
                                        weight: 0
                                    }));
                                b8Y[H1_.index] = !![];
                            } else {
                                y_$ = D56.indexOf(d$x);
                                if (y_$ > -1) {
                                    T16 = D56.length - d$x.length;
                                    if (!T8I && y_$ > 0)
                                        continue;
                                    (T16 ? c_i : Y$i).push(D.extend(P4H.records[H1_.index], {
                                            weight: T16
                                        }));
                                    b8Y[H1_.index] = !![];
                                }
                            }
                        }
                        r_U = d$x.split(" ");
                        q2b = "_";
                        v5m = 368 <= 28.2 ? "a" : 5669 > 6230 ? (0x159a, "r") : (3797, 463) > (940.98, 6850) ? 193.34 : "_";
                        w$d = r_U[ + "0"].toUpperCase();
                        C4_ = [];
                        if (w$d.charCodeAt(0) >= 33 && w$d.charCodeAt("0" << 0) <= "126" - 0) {
                            q2b = w$d.charAt(0);
                        }
                        if (w$d.length > 1) {
                            if (w$d.charCodeAt(1) >= 33 && w$d.charCodeAt( + "1") <= 126) {
                                v5m = w$d.charAt(1);
                            }
                        } else {
                            v5m = " ";
                        }
                        if (P4H.words[q2b]) {
                            for (var c93 in P4H.words[q2b]) {
                                if (c93.length > 1)
                                    continue;
                                if (v5m != (("3810" * 1, 9240) !== (704, 2640) ? " " : (784.66, 9355) != 371.83 ? ("4190" >> 32, 6830) > ( + "3760", 8320) ? 8.86e+3 : ("k", "o") : 0x3c)) {
                                    c93 = v5m;
                                }
                                for (k58 = 0; P4H.words[q2b][c93] && k58 < P4H.words[q2b][c93].length; k58++) {
                                    H1_ = P4H.words[q2b][c93][k58];
                                    if (H1_.word.toUpperCase().indexOf(w$d) !== 0)
                                        continue;
                                    if (b8Y[H1_.index])
                                        continue;
                                    if (C8u && P4H.records[H1_.index].category != C8u)
                                        continue;
                                    C4_.push(D.clone(P4H.records[H1_.index]));
                                    b8Y[H1_.index] = !!"1";
                                }
                                if (v5m != ((2210, 1160) !== (358.84, 9686) ? (9215, 8435) >= 4340 ? " " : 6.15e+3 : (524.21, "d")))
                                    break;
                            }
                        }
                        for (var g$C = 1; g$C < r_U.length; g$C++) {
                            w$d = r_U[g$C].toUpperCase();
                            for (var J7i = C4_.length - 1; J7i >= 0; J7i--) {
                                S8$ = C4_[J7i].name.split(" ");
                                if (C4_[J7i].keywords) {
                                    S8$ = S8$.concat(C4_[J7i].keywords.split(" "));
                                }
                                N1V = !!0;
                                for (var x3v = 0; x3v < S8$.length; x3v++) {
                                    if (S8$[x3v].toUpperCase().indexOf(w$d) ===  + "0") {
                                        N1V = !![];
                                        break;
                                    }
                                }
                                if (!N1V) {
                                    C4_.splice(J7i, 1);
                                }
                            }
                        }
                        Y$i.sort(k9i);
                        Y$i = v1k(Y$i);
                        c_i.sort(k9i);
                        c_i = v1k(c_i);
                        c_i.length = Math.min(c_i.length, K7r);
                        C4_.sort(k9i);
                        C4_ = v1k(C4_);
                        c_i = Y$i.sort(Z$C).concat(c_i.sort(Z$C), C4_.sort(J6m));
                        c_i.length = Math.min(c_i.length, K7r);
                    }
                    if (o4q) {
                        o4q(c_i);
                    } else {
                        return c_i;
                    }
                    function k9i(v3k, E6H) {
                        if (v3k.id > E6H.id) {
                            return 1;
                        } else if (v3k.id < E6H.id) {
                            return -1;
                        }
                        y6x.x24();
                        return v3k.weight > E6H.weight ? 1 : -1;
                    }
                    function v1k(O6O) {
                        var u5f,
                        n5T;
                        u5f = [];
                        y6x.r72();
                        n5T = "";
                        for (var H4D =  + "0"; H4D < O6O.length; H4D++) {
                            if (n5T == O6O[H4D].id)
                                continue;
                            u5f.push(O6O[H4D]);
                            n5T = O6O[H4D].id;
                        }
                        return u5f;
                    }
                    function J6m(H2H, U2F) {
                        var k1R,
                        A05,
                        L5j;
                        H2H.weight =  + "0";
                        U2F.weight = 0;
                        for (var a7L = 0; a7L < r_U.length; a7L++) {
                            k1R = r_U[a7L].toUpperCase();
                            A05 = H2H.name.toUpperCase().indexOf(k1R);
                            L5j = U2F.name.toUpperCase().indexOf(k1R);
                            if (A05 == -1) {
                                return 1;
                            } else if (L5j == -1) {
                                return -1;
                            }
                            H2H.weight += A05;
                            U2F.weight += L5j;
                        }
                        if (H2H.weight > U2F.weight) {
                            return 1;
                        } else if (H2H.weight < U2F.weight) {
                            return -1;
                        }
                        return H2H.name > U2F.name ? 1 : -1;
                    }
                };
            };
            return R;
        }
    })();
})(); /* eslint-enable  */ /* jshint ignore:end   */ /* ignore jslint end   */
