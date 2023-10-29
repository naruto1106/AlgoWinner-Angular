/* File generated on Thu Oct 13 2022 12:34:38 GMT+0000 (Coordinated Universal Time) */
/* Version 2016-07-16.9 */
/* Expires on 2023/10/31 */
/* Locked to domains "[\"127.0.0.1\",\"localhost\",\"algomerchant.com\"]" */

/* Copyright 2014-2019 ChartIQ LLC */
(function () {
    var trialExpiration = "2023/12/31";
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
    Z31PP[98768] = (function () {
        var L = 2;
        for (; L !== 9; ) {
            switch (L) {
            case 1:
                return globalThis;
                break;
            case 2:
                L = typeof globalThis === '\u006f\u0062\x6a\u0065\u0063\u0074' ? 1 : 5;
                break;
            case 5:
                var Z;
                try {
                    var O = 2;
                    for (; O !== 6; ) {
                        switch (O) {
                        case 9:
                            delete Z['\u0078\x34\x47\u0071\u0074'];
                            var W = Object['\u0070\x72\x6f\u0074\u006f\u0074\x79\u0070\u0065'];
                            delete W['\u0073\x42\x64\u006d\u0067'];
                            O = 6;
                            break;
                        case 3:
                            throw "";
                            O = 9;
                            break;
                        case 4:
                            O = typeof x4Gqt === '\x75\u006e\x64\x65\x66\u0069\u006e\x65\u0064' ? 3 : 9;
                            break;
                        case 2:
                            Object['\u0064\u0065\u0066\x69\x6e\x65\x50\x72\x6f\x70\u0065\x72\u0074\u0079'](Object['\u0070\u0072\u006f\u0074\u006f\u0074\u0079\x70\x65'], '\u0073\x42\u0064\u006d\x67', {
                                '\x67\x65\x74': function () {
                                    var P = 2;
                                    for (; P !== 1; ) {
                                        switch (P) {
                                        case 2:
                                            return this;
                                            break;
                                        }
                                    }
                                },
                                '\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65': true
                            });
                            Z = sBdmg;
                            Z['\u0078\u0034\x47\u0071\u0074'] = Z;
                            O = 4;
                            break;
                        }
                    }
                } catch (C) {
                    Z = window;
                }
                return Z;
                break;
            }
        }
    })();
    s4a2QF(Z31PP[98768]);
    Z31PP.n$d = function () {
        return typeof Z31PP[139217].m$puLzl === 'function' ? Z31PP[139217].m$puLzl.apply(Z31PP[139217], arguments) : Z31PP[139217].m$puLzl;
    };
    Z31PP.A6c = function () {
        return typeof Z31PP[123035].Z4bpqNU === 'function' ? Z31PP[123035].Z4bpqNU.apply(Z31PP[123035], arguments) : Z31PP[123035].Z4bpqNU;
    };
    Z31PP[139217] = (function () {
        var X2T = function (h8v, T68) {
            var O56 = T68 & 0xffff;
            var N1T = T68 - O56;
            return (N1T * h8v | 0) + (O56 * h8v | 0) | 0;
        },
        a0s = function (l5T, c1l, c3j) {
            var S8G = 0xcc9e2d51,
            o0f = 0x1b873593;
            var t$w = c3j;
            var M3a = c1l & ~0x3;
            for (var w2q = 0; w2q < M3a; w2q += 4) {
                var S$C = l5T.S6nM1(w2q) & 0xff | (l5T.S6nM1(w2q + 1) & 0xff) << 8 | (l5T.S6nM1(w2q + 2) & 0xff) << 16 | (l5T.S6nM1(w2q + 3) & 0xff) << 24;
                S$C = X2T(S$C, S8G);
                S$C = (S$C & 0x1ffff) << 15 | S$C >>> 17;
                S$C = X2T(S$C, o0f);
                t$w ^= S$C;
                t$w = (t$w & 0x7ffff) << 13 | t$w >>> 19;
                t$w = t$w * 5 + 0xe6546b64 | 0;
            }
            S$C = 0;
            switch (c1l % 4) {
            case 3:
                S$C = (l5T.S6nM1(M3a + 2) & 0xff) << 16;
            case 2:
                S$C |= (l5T.S6nM1(M3a + 1) & 0xff) << 8;
            case 1:
                S$C |= l5T.S6nM1(M3a) & 0xff;
                S$C = X2T(S$C, S8G);
                S$C = (S$C & 0x1ffff) << 15 | S$C >>> 17;
                S$C = X2T(S$C, o0f);
                t$w ^= S$C;
            }
            t$w ^= c1l;
            t$w ^= t$w >>> 16;
            t$w = X2T(t$w, 0x85ebca6b);
            t$w ^= t$w >>> 13;
            t$w = X2T(t$w, 0xc2b2ae35);
            t$w ^= t$w >>> 16;
            return t$w;
        };
        return {
            m$puLzl: a0s
        };
    })();
    function s4a2QF(C3G) {
        var C4r = 2;
        for (; C4r !== 125; ) {
            switch (C4r) {
            case 59:
                P4g[95] = "F";
                P4g[13] = "";
                P4g[13] = "y4";
                P4g[77] = "";
                C4r = 55;
                break;
            case 129:
                d_q(I$G, "test", P4g[76], P4g[19]);
                C4r = 128;
                break;
            case 30:
                P4g[70] = "";
                P4g[70] = "__opt";
                P4g[98] = "";
                P4g[46] = "W";
                C4r = 43;
                break;
            case 34:
                P4g[10] = "e7P";
                P4g[50] = "";
                P4g[50] = "mize";
                P4g[70] = "";
                C4r = 30;
                break;
            case 55:
                P4g[77] = "2m9_";
                P4g[80] = "x";
                P4g[69] = "2";
                P4g[76] = 2;
                P4g[76] = 1;
                C4r = 73;
                break;
            case 108:
                P4g[12] += P4g[89];
                C4r = 107;
                break;
            case 50:
                P4g[38] = "m";
                P4g[40] = "abstract";
                P4g[44] = "__re";
                P4g[86] = "$y";
                C4r = 46;
                break;
            case 106:
                d_q(W9j, "charCodeAt", P4g[76], P4g[12]);
                C4r = 105;
                break;
            case 133:
                d_q(W9j, "replace", P4g[76], P4g[96]);
                C4r = 132;
                break;
            case 96:
                P4g[68] = P4g[83];
                P4g[68] += P4g[2];
                P4g[68] += P4g[46];
                P4g[96] = P4g[8];
                P4g[96] += P4g[26];
                P4g[96] += P4g[1];
                P4g[21] = P4g[3];
                C4r = 118;
                break;
            case 107:
                var d_q = function (n5T, R9O, V2g, W5g) {
                    var Z9S = 2;
                    for (; Z9S !== 5; ) {
                        switch (Z9S) {
                        case 2:
                            var O6P = [arguments];
                            c1L(P4g[0][0], O6P[0][0], O6P[0][1], O6P[0][2], O6P[0][3]);
                            Z9S = 5;
                            break;
                        }
                    }
                };
                C4r = 106;
                break;
            case 23:
                P4g[82] = "";
                P4g[82] = "aB";
                P4g[83] = "Z";
                P4g[10] = "";
                C4r = 34;
                break;
            case 43:
                P4g[15] = "9";
                P4g[98] = "gK";
                P4g[97] = "";
                P4g[97] = "4aj";
                C4r = 39;
                break;
            case 90:
                P4g[93] = P4g[61];
                P4g[93] += P4g[61];
                P4g[93] += P4g[40];
                P4g[72] = P4g[38];
                C4r = 86;
                break;
            case 79:
                P4g[19] += P4g[14];
                P4g[34] = P4g[57];
                P4g[34] += P4g[97];
                P4g[34] += P4g[98];
                P4g[94] = P4g[70];
                P4g[94] += P4g[87];
                C4r = 100;
                break;
            case 100:
                P4g[94] += P4g[50];
                P4g[85] = P4g[10];
                P4g[85] += P4g[82];
                P4g[85] += P4g[15];
                C4r = 96;
                break;
            case 135:
                d_q(W9j, "fromCharCode", P4g[43], P4g[22]);
                C4r = 134;
                break;
            case 86:
                P4g[72] += P4g[86];
                P4g[72] += P4g[73];
                P4g[60] = P4g[44];
                P4g[60] += P4g[65];
                P4g[60] += P4g[35];
                P4g[19] = P4g[58];
                P4g[19] += P4g[28];
                C4r = 79;
                break;
            case 128:
                d_q(r0a, P4g[60], P4g[43], P4g[72]);
                C4r = 127;
                break;
            case 105:
                d_q(r0a, "String", P4g[43], P4g[20]);
                C4r = 135;
                break;
            case 131:
                d_q(n0h, "push", P4g[76], P4g[85]);
                C4r = 130;
                break;
            case 54:
                P4g[28] = "";
                P4g[28] = "PT";
                P4g[35] = "";
                P4g[35] = "al";
                C4r = 50;
                break;
            case 130:
                d_q(r0a, P4g[94], P4g[43], P4g[34]);
                C4r = 129;
                break;
            case 63:
                P4g[65] = "sidu";
                P4g[33] = "";
                P4g[73] = "_$F";
                P4g[33] = "Nln";
                C4r = 59;
                break;
            case 132:
                d_q(n0h, "map", P4g[76], P4g[68]);
                C4r = 131;
                break;
            case 73:
                P4g[43] = 9;
                P4g[43] = 0;
                P4g[39] = P4g[80];
                P4g[39] += P4g[69];
                C4r = 69;
                break;
            case 15:
                P4g[66] = "N4p";
                P4g[89] = "M1";
                P4g[2] = "$yfK";
                P4g[74] = "O";
                P4g[37] = "6n";
                C4r = 23;
                break;
            case 19:
                P4g[2] = "";
                P4g[9] = "R";
                P4g[18] = "a4H";
                P4g[26] = "Jw0";
                C4r = 15;
                break;
            case 118:
                P4g[21] += P4g[6];
                P4g[21] += P4g[15];
                P4g[22] = P4g[18];
                P4g[22] += P4g[9];
                C4r = 114;
                break;
            case 6:
                P4g[6] = "u";
                P4g[1] = "E";
                P4g[8] = "";
                P4g[8] = "";
                P4g[8] = "A7";
                P4g[2] = "";
                P4g[4] = "L";
                C4r = 19;
                break;
            case 127:
                d_q(r0a, P4g[93], P4g[43], P4g[54]);
                C4r = 126;
                break;
            case 3:
                P4g[7] = "";
                P4g[7] = "7";
                P4g[3] = "f2D";
                P4g[1] = "";
                C4r = 6;
                break;
            case 114:
                P4g[22] += P4g[74];
                P4g[20] = P4g[4];
                P4g[20] += P4g[7];
                P4g[20] += P4g[66];
                P4g[12] = P4g[5];
                P4g[12] += P4g[37];
                C4r = 108;
                break;
            case 2:
                var P4g = [arguments];
                P4g[5] = "";
                P4g[5] = "S";
                P4g[7] = "";
                C4r = 3;
                break;
            case 134:
                d_q(W9j, "substring", P4g[76], P4g[21]);
                C4r = 133;
                break;
            case 69:
                P4g[39] += P4g[77];
                P4g[54] = P4g[13];
                P4g[54] += P4g[33];
                P4g[54] += P4g[95];
                C4r = 90;
                break;
            case 39:
                P4g[57] = "";
                P4g[57] = "f";
                P4g[28] = "";
                P4g[87] = "i";
                C4r = 54;
                break;
            case 126:
                d_q(U65, "apply", P4g[76], P4g[39]);
                C4r = 125;
                break;
            case 46:
                P4g[58] = "J5";
                P4g[14] = "Gc";
                P4g[61] = "";
                P4g[61] = "_";
                C4r = 63;
                break;
            }
        }
        function W9j(H3p) {
            var B8F = 2;
            for (; B8F !== 5; ) {
                switch (B8F) {
                case 2:
                    var x5Z = [arguments];
                    return x5Z[0][0].String;
                    break;
                }
            }
        }
        function n0h(t1B) {
            var K4F = 2;
            for (; K4F !== 5; ) {
                switch (K4F) {
                case 2:
                    var M1X = [arguments];
                    return M1X[0][0].Array;
                    break;
                }
            }
        }
        function I$G(d14) {
            var t_u = 2;
            for (; t_u !== 5; ) {
                switch (t_u) {
                case 1:
                    return L73[0][0].RegExp;
                    break;
                case 2:
                    var L73 = [arguments];
                    t_u = 1;
                    break;
                }
            }
        }
        function r0a(Q0W) {
            var R9f = 2;
            for (; R9f !== 5; ) {
                switch (R9f) {
                case 2:
                    var T2T = [arguments];
                    return T2T[0][0];
                    break;
                }
            }
        }
        function c1L(c0Z, U_P, d$d, j3J, t6q) {
            var F2N = 2;
            for (; F2N !== 6; ) {
                switch (F2N) {
                case 2:
                    var X2b = [arguments];
                    X2b[3] = "";
                    X2b[3] = "y";
                    X2b[1] = true;
                    F2N = 3;
                    break;
                case 3:
                    X2b[2] = "finePropert";
                    X2b[1] = false;
                    X2b[5] = "de";
                    try {
                        var u1n = 2;
                        for (; u1n !== 13; ) {
                            switch (u1n) {
                            case 3:
                                return;
                                break;
                            case 9:
                                X2b[9][X2b[0][4]] = X2b[9][X2b[0][2]];
                                X2b[4].set = function (q31) {
                                    var a$t = 2;
                                    for (; a$t !== 5; ) {
                                        switch (a$t) {
                                        case 2:
                                            var V$t = [arguments];
                                            X2b[9][X2b[0][2]] = V$t[0][0];
                                            a$t = 5;
                                            break;
                                        }
                                    }
                                };
                                X2b[4].get = function () {
                                    var a$n = 2;
                                    for (; a$n !== 6; ) {
                                        switch (a$n) {
                                        case 3:
                                            k4W[3] = k4W[8];
                                            k4W[3] += X2b[5];
                                            k4W[3] += k4W[1];
                                            return typeof X2b[9][X2b[0][2]] == k4W[3] ? undefined : X2b[9][X2b[0][2]];
                                            break;
                                        case 2:
                                            var k4W = [arguments];
                                            k4W[1] = "fined";
                                            k4W[8] = "";
                                            k4W[8] = "un";
                                            a$n = 3;
                                            break;
                                        }
                                    }
                                };
                                X2b[4].enumerable = X2b[1];
                                try {
                                    var d$E = 2;
                                    for (; d$E !== 3; ) {
                                        switch (d$E) {
                                        case 2:
                                            X2b[8] = X2b[5];
                                            X2b[8] += X2b[2];
                                            X2b[8] += X2b[3];
                                            X2b[0][0].Object[X2b[8]](X2b[9], X2b[0][4], X2b[4]);
                                            d$E = 3;
                                            break;
                                        }
                                    }
                                } catch (F0p) {}
                                u1n = 13;
                                break;
                            case 2:
                                X2b[4] = {};
                                X2b[7] = (1, X2b[0][1])(X2b[0][0]);
                                X2b[9] = [X2b[7], X2b[7].prototype][X2b[0][3]];
                                u1n = 4;
                                break;
                            case 4:
                                u1n = X2b[9].hasOwnProperty(X2b[0][4]) && X2b[9][X2b[0][4]] === X2b[9][X2b[0][2]] ? 3 : 9;
                                break;
                            }
                        }
                    } catch (s3t) {}
                    F2N = 6;
                    break;
                }
            }
        }
        function U65(Q41) {
            var m5A = 2;
            for (; m5A !== 5; ) {
                switch (m5A) {
                case 2:
                    var e9R = [arguments];
                    return e9R[0][0].Function;
                    break;
                }
            }
        }
    }
    Z31PP.p86 = function () {
        return typeof Z31PP[468616].N2kDw3q === 'function' ? Z31PP[468616].N2kDw3q.apply(Z31PP[468616], arguments) : Z31PP[468616].N2kDw3q;
    };
    Z31PP.h$k = function () {
        return typeof Z31PP[123035].p9X81C1 === 'function' ? Z31PP[123035].p9X81C1.apply(Z31PP[123035], arguments) : Z31PP[123035].p9X81C1;
    };
    Z31PP[98768].T5oo = Z31PP;
    Z31PP.r3p = function () {
        return typeof Z31PP[97524].U9DfW9r === 'function' ? Z31PP[97524].U9DfW9r.apply(Z31PP[97524], arguments) : Z31PP[97524].U9DfW9r;
    };
    Z31PP.A7M = function () {
        return typeof Z31PP[106173].u2gI_Im === 'function' ? Z31PP[106173].u2gI_Im.apply(Z31PP[106173], arguments) : Z31PP[106173].u2gI_Im;
    };
    Z31PP.v7P = function () {
        return typeof Z31PP[123035].p9X81C1 === 'function' ? Z31PP[123035].p9X81C1.apply(Z31PP[123035], arguments) : Z31PP[123035].p9X81C1;
    };
    Z31PP[123812] = Z31PP[97524];
    Z31PP[123035] = (function () {
        var b3_ = 2;
        for (; b3_ !== 4; ) {
            switch (b3_) {
            case 2:
                var V9w = Z31PP[98768];
                var a3T,
                L1T;
                return {
                    Z4bpqNU: function (s$$, s5w, p25, v0K) {
                        var U3C = 2;
                        for (; U3C !== 1; ) {
                            switch (U3C) {
                            case 2:
                                return v4X(s$$, s5w, p25, v0K);
                                break;
                            }
                        }
                    },
                    p9X81C1: function (G6h, R7r, D4_, n70) {
                        var w1F = 2;
                        for (; w1F !== 1; ) {
                            switch (w1F) {
                            case 2:
                                return v4X(G6h, R7r, D4_, n70, true);
                                break;
                            }
                        }
                    }
                };
                break;
            }
        }
        function g31(C1m) {
            var v7M = 2;
            for (; v7M !== 7; ) {
                switch (v7M) {
                case 8:
                    return K5s;
                    break;
                case 9:
                    P$c++;
                    v7M = 4;
                    break;
                case 3:
                    K5s += L7N4p.a4HRO(C1m[P$c] - U53 + 99);
                    v7M = 9;
                    break;
                case 2:
                    var U53 = 9;
                    var K5s = '';
                    v7M = 5;
                    break;
                case 5:
                    var P$c = 0;
                    v7M = 4;
                    break;
                case 4:
                    v7M = P$c < C1m.length ? 3 : 8;
                    break;
                }
            }
        }
        function v4X(w8l, O74, A9f, h0j, A9T) {
            var a1f = 2;
            for (; a1f !== 15; ) {
                switch (a1f) {
                case 2:
                    var M4C,
                    E2X,
                    w_8,
                    m4x;
                    m4x = V9w[g31([18, 21, 9, 7, 26, 15, 21, 20])];
                    !a3T && (a3T = typeof m4x !== "undefined" ? m4x[g31([14, 21, 25, 26, 20, 7, 19, 11])] || ' ' : "");
                    !L1T && (L1T = typeof m4x !== "undefined" ? m4x[g31([14, 24, 11, 12])] : "");
                    w_8 = A9T ? L1T : a3T;
                    a1f = 9;
                    break;
                case 9:
                    a1f = h0j > 0 ? 8 : 19;
                    break;
                case 12:
                    return false;
                    break;
                case 16:
                    return Z31PP.n$d(M4C, E2X, A9f);
                    break;
                case 18:
                    M4C = w_8.f2Du9(0, w_8.length);
                    E2X = M4C.length;
                    a1f = 16;
                    break;
                case 8:
                    M4C = w_8.f2Du9(w8l, h0j);
                    E2X = M4C.length;
                    a1f = 6;
                    break;
                case 13:
                    a1f = O74 && r50 > 0 && w_8.S6nM1(r50 - 1) !== 46 ? 12 : 11;
                    break;
                case 11:
                    M4C = w_8.f2Du9(r50, w_8.length);
                    E2X = M4C.length;
                    return Z31PP.n$d(M4C, E2X, A9f);
                    break;
                case 6:
                    return Z31PP.n$d(M4C, E2X, A9f);
                    break;
                case 19:
                    a1f = w8l === null || w8l <= 0 ? 18 : 14;
                    break;
                case 14:
                    var r50 = w_8.length - w8l;
                    a1f = 13;
                    break;
                }
            }
        }
    })();
    Z31PP.s0K = function () {
        return typeof Z31PP[123035].Z4bpqNU === 'function' ? Z31PP[123035].Z4bpqNU.apply(Z31PP[123035], arguments) : Z31PP[123035].Z4bpqNU;
    };
    Z31PP[125651] = "Z_G";
    Z31PP.Y4l = function () {
        return typeof Z31PP[139217].m$puLzl === 'function' ? Z31PP[139217].m$puLzl.apply(Z31PP[139217], arguments) : Z31PP[139217].m$puLzl;
    };
    Z31PP[463080] = Z31PP[97524];
    function Z31PP() {}
    Z31PP[106173] = (function () {
        var B01 = 2;
        for (; B01 !== 9; ) {
            switch (B01) {
            case 4:
                b81[8].u2gI_Im = function () {
                    var o_B = 2;
                    for (; o_B !== 90; ) {
                        switch (o_B) {
                        case 68:
                            o_B = 75 ? 68 : 67;
                            break;
                        case 25:
                            l2m[75].l$B = function () {
                                var v5t = typeof y4NlnF === 'function';
                                return v5t;
                            };
                            l2m[32] = l2m[75];
                            l2m[97] = {};
                            l2m[97].E_I = ['E_a'];
                            l2m[97].l$B = function () {
                                var s22 = function () {
                                    return ('X').toLowerCase();
                                };
                                var s60 = (/\x78/).J5PTGc(s22 + []);
                                return s60;
                            };
                            l2m[85] = l2m[97];
                            o_B = 34;
                            break;
                        case 34:
                            l2m[94] = {};
                            l2m[94].E_I = ['E_a'];
                            l2m[94].l$B = function () {
                                var z63 = function () {
                                    return ('aa').charCodeAt(1);
                                };
                                var x09 = (/\u0039\u0037/).J5PTGc(z63 + []);
                                return x09;
                            };
                            l2m[47] = l2m[94];
                            l2m[60] = {};
                            o_B = 29;
                            break;
                        case 58:
                            l2m[58] = 0;
                            o_B = 57;
                            break;
                        case 19:
                            l2m[1] = l2m[6];
                            l2m[5] = {};
                            l2m[5].E_I = ['n5b'];
                            o_B = 16;
                            break;
                        case 9:
                            l2m[9].E_I = ['n5b'];
                            l2m[9].l$B = function () {
                                var i0I = false;
                                var Y3p = [];
                                try {
                                    for (var f2F in console) {
                                        Y3p.e7PaB9(f2F);
                                    }
                                    i0I = Y3p.length === 0;
                                } catch (X$v) {}
                                var B_D = i0I;
                                return B_D;
                            };
                            l2m[7] = l2m[9];
                            l2m[4] = {};
                            o_B = 14;
                            break;
                        case 44:
                            l2m[29] = l2m[60];
                            l2m[46] = {};
                            l2m[46].E_I = ['E_a'];
                            l2m[46].l$B = function () {
                                var U$S = function () {
                                    return ('x').toLocaleUpperCase();
                                };
                                var x8_ = (/\x58/).J5PTGc(U$S + []);
                                return x8_;
                            };
                            o_B = 40;
                            break;
                        case 40:
                            l2m[86] = l2m[46];
                            l2m[22] = {};
                            l2m[22].E_I = ['E_a'];
                            l2m[22].l$B = function () {
                                var w8h = function () {
                                    return escape('=');
                                };
                                var C6u = (/\x33\u0044/).J5PTGc(w8h + []);
                                return C6u;
                            };
                            o_B = 36;
                            break;
                        case 1:
                            o_B = b81[9] ? 5 : 4;
                            break;
                        case 4:
                            l2m[3] = [];
                            l2m[9] = {};
                            o_B = 9;
                            break;
                        case 75:
                            l2m[15] = {};
                            l2m[15][l2m[34]] = l2m[61][l2m[18]][l2m[56]];
                            l2m[15][l2m[63]] = l2m[73];
                            l2m[16].e7PaB9(l2m[15]);
                            o_B = 71;
                            break;
                        case 14:
                            l2m[4].E_I = ['n5b'];
                            l2m[4].l$B = function () {
                                var s0k = typeof f4ajgK === 'function';
                                return s0k;
                            };
                            l2m[8] = l2m[4];
                            o_B = 11;
                            break;
                        case 2:
                            var l2m = [arguments];
                            o_B = 1;
                            break;
                        case 70:
                            l2m[58]++;
                            o_B = 57;
                            break;
                        case 29:
                            l2m[60].E_I = ['E_a'];
                            l2m[60].l$B = function () {
                                var h4x = function () {
                                    return ('a|a').split('|');
                                };
                                var N5Y = !(/\x7c/).J5PTGc(h4x + []);
                                return N5Y;
                            };
                            o_B = 44;
                            break;
                        case 67:
                            b81[9] = 72;
                            return 47;
                            break;
                        case 57:
                            o_B = l2m[58] < l2m[3].length ? 56 : 69;
                            break;
                        case 69:
                            o_B = (function (L5h) {
                                var U9P = 2;
                                for (; U9P !== 22; ) {
                                    switch (U9P) {
                                    case 14:
                                        U9P = typeof j24[1][j24[9][l2m[34]]] === 'undefined' ? 13 : 11;
                                        break;
                                    case 11:
                                        j24[1][j24[9][l2m[34]]].t += true;
                                        U9P = 10;
                                        break;
                                    case 16:
                                        U9P = j24[3] < j24[5].length ? 15 : 23;
                                        break;
                                    case 2:
                                        var j24 = [arguments];
                                        U9P = 1;
                                        break;
                                    case 6:
                                        j24[9] = j24[0][0][j24[3]];
                                        U9P = 14;
                                        break;
                                    case 19:
                                        j24[3]++;
                                        U9P = 7;
                                        break;
                                    case 1:
                                        U9P = j24[0][0].length === 0 ? 5 : 4;
                                        break;
                                    case 26:
                                        U9P = j24[7] >= 0.5 ? 25 : 24;
                                        break;
                                    case 17:
                                        j24[3] = 0;
                                        U9P = 16;
                                        break;
                                    case 10:
                                        U9P = j24[9][l2m[63]] === l2m[83] ? 20 : 19;
                                        break;
                                    case 7:
                                        U9P = j24[3] < j24[0][0].length ? 6 : 18;
                                        break;
                                    case 5:
                                        return;
                                        break;
                                    case 25:
                                        j24[8] = true;
                                        U9P = 24;
                                        break;
                                    case 15:
                                        j24[2] = j24[5][j24[3]];
                                        j24[7] = j24[1][j24[2]].h / j24[1][j24[2]].t;
                                        U9P = 26;
                                        break;
                                    case 20:
                                        j24[1][j24[9][l2m[34]]].h += true;
                                        U9P = 19;
                                        break;
                                    case 24:
                                        j24[3]++;
                                        U9P = 16;
                                        break;
                                    case 13:
                                        j24[1][j24[9][l2m[34]]] = (function () {
                                            var h5R = 2;
                                            for (; h5R !== 9; ) {
                                                switch (h5R) {
                                                case 2:
                                                    var G8U = [arguments];
                                                    G8U[8] = {};
                                                    G8U[8].h = 0;
                                                    G8U[8].t = 0;
                                                    return G8U[8];
                                                    break;
                                                }
                                            }
                                        }).x22m9_(this, arguments);
                                        U9P = 12;
                                        break;
                                    case 4:
                                        j24[1] = {};
                                        j24[5] = [];
                                        j24[3] = 0;
                                        U9P = 8;
                                        break;
                                    case 8:
                                        j24[3] = 0;
                                        U9P = 7;
                                        break;
                                    case 12:
                                        j24[5].e7PaB9(j24[9][l2m[34]]);
                                        U9P = 11;
                                        break;
                                    case 23:
                                        return j24[8];
                                        break;
                                    case 18:
                                        j24[8] = false;
                                        U9P = 17;
                                        break;
                                    }
                                }
                            })(l2m[16]) ? 68 : 67;
                            break;
                        case 11:
                            l2m[6] = {};
                            l2m[6].E_I = ['E_a'];
                            l2m[6].l$B = function () {
                                var q2_ = function () {
                                    return ('X').toLocaleLowerCase();
                                };
                                var Y9i = (/\x78/).J5PTGc(q2_ + []);
                                return Y9i;
                            };
                            o_B = 19;
                            break;
                        case 56:
                            l2m[61] = l2m[3][l2m[58]];
                            try {
                                l2m[73] = l2m[61][l2m[81]]() ? l2m[83] : l2m[52];
                            } catch (T6t) {
                                l2m[73] = l2m[52];
                            }
                            o_B = 77;
                            break;
                        case 77:
                            l2m[56] = 0;
                            o_B = 76;
                            break;
                        case 36:
                            l2m[33] = l2m[22];
                            l2m[3].e7PaB9(l2m[8]);
                            l2m[3].e7PaB9(l2m[47]);
                            l2m[3].e7PaB9(l2m[33]);
                            l2m[3].e7PaB9(l2m[86]);
                            l2m[3].e7PaB9(l2m[1]);
                            l2m[3].e7PaB9(l2m[7]);
                            o_B = 48;
                            break;
                        case 5:
                            return 61;
                            break;
                        case 48:
                            l2m[3].e7PaB9(l2m[29]);
                            l2m[3].e7PaB9(l2m[32]);
                            l2m[3].e7PaB9(l2m[2]);
                            o_B = 45;
                            break;
                        case 62:
                            l2m[18] = 'E_I';
                            l2m[63] = 'N89';
                            l2m[81] = 'l$B';
                            l2m[34] = 'B9X';
                            o_B = 58;
                            break;
                        case 45:
                            l2m[3].e7PaB9(l2m[85]);
                            l2m[16] = [];
                            l2m[83] = 'E0T';
                            l2m[52] = 'm2u';
                            o_B = 62;
                            break;
                        case 71:
                            l2m[56]++;
                            o_B = 76;
                            break;
                        case 76:
                            o_B = l2m[56] < l2m[61][l2m[18]].length ? 75 : 70;
                            break;
                        case 16:
                            l2m[5].l$B = function () {
                                var w1o = typeof m$y_$F === 'function';
                                return w1o;
                            };
                            l2m[2] = l2m[5];
                            l2m[75] = {};
                            l2m[75].E_I = ['n5b'];
                            o_B = 25;
                            break;
                        }
                    }
                };
                return b81[8];
                break;
            case 2:
                var b81 = [arguments];
                b81[9] = undefined;
                b81[8] = {};
                B01 = 4;
                break;
            }
        }
    })();
    Z31PP[97524] = (function (N_k) {
        function W7m(u$t) {
            var Y1e = 2;
            for (; Y1e !== 15; ) {
                switch (Y1e) {
                case 14:
                    Y1e = !T6l-- ? 13 : 12;
                    break;
                case 6:
                    o1w = X2Q && U_v(X2Q, k6q);
                    Y1e = 14;
                    break;
                case 4:
                    Y1e = !T6l-- ? 3 : 9;
                    break;
                case 13:
                    O$l = N_k[7];
                    Y1e = 12;
                    break;
                case 16:
                    d_p = o1w - u$t > k6q;
                    Y1e = 19;
                    break;
                case 3:
                    k6q = 32;
                    Y1e = 9;
                    break;
                case 19:
                    return d_p;
                    break;
                case 8:
                    X2Q = N_k[6];
                    Y1e = 7;
                    break;
                case 9:
                    Y1e = !T6l-- ? 8 : 7;
                    break;
                case 11:
                    A67 = (O$l || O$l === 0) && U_v(O$l, k6q);
                    Y1e = 10;
                    break;
                case 18:
                    Y1e = A67 >= 0 ? 17 : 16;
                    break;
                case 7:
                    Y1e = !T6l-- ? 6 : 14;
                    break;
                case 17:
                    d_p = u$t - A67 > k6q;
                    Y1e = 19;
                    break;
                case 12:
                    Y1e = !T6l-- ? 11 : 10;
                    break;
                case 20:
                    d_p = u$t - A67 > k6q && o1w - u$t > k6q;
                    Y1e = 19;
                    break;
                case 5:
                    U_v = X1a[N_k[4]];
                    Y1e = 4;
                    break;
                case 10:
                    Y1e = A67 >= 0 && o1w >= 0 ? 20 : 18;
                    break;
                case 1:
                    Y1e = !T6l-- ? 5 : 4;
                    break;
                case 2:
                    var d_p,
                    k6q,
                    X2Q,
                    o1w,
                    O$l,
                    A67,
                    U_v;
                    Y1e = 1;
                    break;
                }
            }
        }
        var y3$ = 2;
        for (; y3$ !== 10; ) {
            switch (y3$) {
            case 13:
                y3$ = !T6l-- ? 12 : 11;
                break;
            case 14:
                N_k = N_k.Z$yfKW(function (C$z) {
                    var z0U = 2;
                    for (; z0U !== 13; ) {
                        switch (z0U) {
                        case 5:
                            T3x = '';
                            z0U = 4;
                            break;
                        case 9:
                            T3x += X1a[H81][N0X](C$z[k2p] + 118);
                            z0U = 8;
                            break;
                        case 6:
                            return;
                            break;
                        case 1:
                            z0U = !T6l-- ? 5 : 4;
                            break;
                        case 14:
                            return T3x;
                            break;
                        case 7:
                            z0U = !T3x ? 6 : 14;
                            break;
                        case 2:
                            var T3x;
                            z0U = 1;
                            break;
                        case 3:
                            z0U = k2p < C$z.length ? 9 : 7;
                            break;
                        case 8:
                            k2p++;
                            z0U = 3;
                            break;
                        case 4:
                            var k2p = 0;
                            z0U = 3;
                            break;
                        }
                    }
                });
                y3$ = 13;
                break;
            case 12:
                var O7w,
                D7P = 0;
                y3$ = 11;
                break;
            case 6:
                y3$ = !T6l-- ? 14 : 13;
                break;
            case 7:
                H81 = v6A.A7Jw0E(new X1a[D7U]("^['-|]"), 'S');
                y3$ = 6;
                break;
            case 11:
                return {
                    U9DfW9r: function (C5l) {
                        var A7V = 2;
                        for (; A7V !== 6; ) {
                            switch (A7V) {
                            case 9:
                                D7P = C1a + 60000;
                                A7V = 8;
                                break;
                            case 4:
                                O7w = W7m(C1a);
                                A7V = 3;
                                break;
                            case 5:
                                A7V = !T6l-- ? 4 : 3;
                                break;
                            case 2:
                                var C1a = new X1a[N_k[0]]()[N_k[1]]();
                                A7V = 1;
                                break;
                            case 3:
                                A7V = !T6l-- ? 9 : 8;
                                break;
                            case 1:
                                A7V = C1a > D7P ? 5 : 8;
                                break;
                            case 8:
                                var Q$J = (function (z2a, f7q) {
                                    var i2s = 2;
                                    for (; i2s !== 10; ) {
                                        switch (i2s) {
                                        case 6:
                                            i2s = d5E === 0 ? 14 : 12;
                                            break;
                                        case 8:
                                            var m4d = X1a[f7q[4]](z2a[f7q[2]](d5E), 16)[f7q[3]](2);
                                            var C9k = m4d[f7q[2]](m4d[f7q[5]] - 1);
                                            i2s = 6;
                                            break;
                                        case 9:
                                            i2s = d5E < z2a[f7q[5]] ? 8 : 11;
                                            break;
                                        case 3:
                                            var C6q,
                                            d5E = 0;
                                            i2s = 9;
                                            break;
                                        case 11:
                                            return C6q;
                                            break;
                                        case 4:
                                            f7q = N_k;
                                            i2s = 3;
                                            break;
                                        case 5:
                                            i2s = typeof f7q === 'undefined' && typeof N_k !== 'undefined' ? 4 : 3;
                                            break;
                                        case 13:
                                            d5E++;
                                            i2s = 9;
                                            break;
                                        case 1:
                                            z2a = C5l;
                                            i2s = 5;
                                            break;
                                        case 12:
                                            C6q = C6q ^ C9k;
                                            i2s = 13;
                                            break;
                                        case 14:
                                            C6q = C9k;
                                            i2s = 13;
                                            break;
                                        case 2:
                                            i2s = typeof z2a === 'undefined' && typeof C5l !== 'undefined' ? 1 : 5;
                                            break;
                                        }
                                    }
                                })(undefined, undefined);
                                return Q$J ? O7w : !O7w;
                                break;
                            }
                        }
                    }
                };
                break;
            case 8:
                y3$ = !T6l-- ? 7 : 6;
                break;
            case 9:
                v6A = typeof N0X;
                y3$ = 8;
                break;
            case 3:
                y3$ = !T6l-- ? 9 : 8;
                break;
            case 4:
                var N0X = 'fromCharCode',
                D7U = 'RegExp';
                y3$ = 3;
                break;
            case 5:
                X1a = Z31PP[98768];
                y3$ = 4;
                break;
            case 1:
                y3$ = !T6l-- ? 5 : 4;
                break;
            case 2:
                var X1a,
                v6A,
                H81,
                T6l;
                y3$ = 1;
                break;
            }
        }
    })([[-50, -21, -2, -17], [-15, -17, -2, -34, -13, -9, -17], [-19, -14, -21, -4, -53, -2], [-2, -7, -35, -2, -4, -13, -8, -15], [-6, -21, -4, -3, -17, -45, -8, -2], [-10, -17, -8, -15, -2, -14], [-69, -14, -15, -17, -7, -19, -2, -70, -70], []]);
    Z31PP.f21 = function () {
        return typeof Z31PP[468616].Y0RXmsr === 'function' ? Z31PP[468616].Y0RXmsr.apply(Z31PP[468616], arguments) : Z31PP[468616].Y0RXmsr;
    };
    Z31PP.N7F = function () {
        return typeof Z31PP[106173].u2gI_Im === 'function' ? Z31PP[106173].u2gI_Im.apply(Z31PP[106173], arguments) : Z31PP[106173].u2gI_Im;
    };
    Z31PP.U9a = function () {
        return typeof Z31PP[468616].Y0RXmsr === 'function' ? Z31PP[468616].Y0RXmsr.apply(Z31PP[468616], arguments) : Z31PP[468616].Y0RXmsr;
    };
    Z31PP.H4Z = function () {
        return typeof Z31PP[97524].U9DfW9r === 'function' ? Z31PP[97524].U9DfW9r.apply(Z31PP[97524], arguments) : Z31PP[97524].U9DfW9r;
    };
    Z31PP[468616] = (function (K6M) {
        return {
            Y0RXmsr: function () {
                var x2l,
                U_i = arguments;
                switch (K6M) {
                case 55:
                    x2l = (-U_i[3] - U_i[2] + U_i[1]) / U_i[4] + U_i[0];
                    break;
                case 70:
                    x2l = -U_i[0] * U_i[2] - U_i[3] + U_i[1];
                    break;
                case 76:
                    x2l = (-U_i[2] + U_i[1]) * U_i[3] - U_i[0];
                    break;
                case 104:
                    x2l = U_i[0] * U_i[2] + U_i[1] * U_i[3];
                    break;
                case 114:
                    x2l = U_i[3] - U_i[1] - U_i[2] + U_i[0] + U_i[4];
                    break;
                case 39:
                    x2l = (U_i[3] + U_i[2] - U_i[0]) / U_i[1] + U_i[4];
                    break;
                case 119:
                    x2l = (U_i[2] + U_i[1]) * U_i[0] + U_i[4] - U_i[3];
                    break;
                case 58:
                    x2l = (U_i[1] + U_i[4]) * U_i[3] - U_i[0] - U_i[2];
                    break;
                case 100:
                    x2l = U_i[2] * U_i[0] / U_i[1];
                    break;
                case 20:
                    x2l = (U_i[1] + U_i[0] + U_i[3]) * U_i[4] - U_i[2];
                    break;
                case 21:
                    x2l = U_i[3] / U_i[1] + U_i[0] + U_i[2];
                    break;
                case 67:
                    x2l = (U_i[2] - U_i[1]) / U_i[0];
                    break;
                case 8:
                    x2l = U_i[0] + U_i[2] - U_i[1];
                    break;
                case 123:
                    x2l = U_i[1] * U_i[0] + U_i[2];
                    break;
                case 19:
                    x2l = U_i[1] / (U_i[0] - U_i[2]);
                    break;
                case 1:
                    x2l = U_i[1] | U_i[0];
                    break;
                case 122:
                    x2l = U_i[1] * U_i[0] / U_i[3] - U_i[2];
                    break;
                case 86:
                    x2l = -U_i[1] * U_i[0] + U_i[2];
                    break;
                case 46:
                    x2l = U_i[2] - U_i[0] / U_i[3] + U_i[1];
                    break;
                case 129:
                    x2l = U_i[2] / U_i[3] * U_i[1] + U_i[0];
                    break;
                case 66:
                    x2l = (-U_i[1] - U_i[3]) / U_i[2] + U_i[0];
                    break;
                case 113:
                    x2l = U_i[3] - U_i[1] - (U_i[2] - U_i[0]);
                    break;
                case 54:
                    x2l = (U_i[1] * U_i[0] - U_i[3]) / U_i[4] - U_i[2];
                    break;
                case 56:
                    x2l = U_i[2] - U_i[1] - U_i[0] + U_i[3];
                    break;
                case 73:
                    x2l = (U_i[4] - U_i[2] - U_i[0]) * U_i[3] + U_i[1];
                    break;
                case 89:
                    x2l = U_i[0] / U_i[4] * U_i[2] - U_i[1] - U_i[3];
                    break;
                case 110:
                    x2l = (-U_i[3] - U_i[2]) * U_i[1] + U_i[0];
                    break;
                case 93:
                    x2l = (U_i[4] - U_i[1]) / U_i[0] * U_i[2] + U_i[3];
                    break;
                case 51:
                    x2l = (U_i[2] + U_i[1]) / +U_i[0];
                    break;
                case 11:
                    x2l = U_i[0] << U_i[1];
                    break;
                case 87:
                    x2l = U_i[0] != U_i[1];
                    break;
                case 112:
                    x2l = (U_i[3] - U_i[0]) * U_i[2] * U_i[1] + U_i[4];
                    break;
                case 36:
                    x2l = U_i[0] - U_i[1] + U_i[2];
                    break;
                case 85:
                    x2l = U_i[1] * (U_i[2] >> U_i[0]);
                    break;
                case 9:
                    x2l = U_i[3] - U_i[2] + U_i[0] - U_i[1];
                    break;
                case 118:
                    x2l = (U_i[4] + U_i[1]) / U_i[3] + U_i[0] + U_i[2];
                    break;
                case 64:
                    x2l = U_i[2] * U_i[1] - U_i[0];
                    break;
                case 68:
                    x2l = U_i[3] / U_i[1] / U_i[0] + U_i[2];
                    break;
                case 50:
                    x2l = (U_i[3] + U_i[2]) * U_i[1] - U_i[0];
                    break;
                case 102:
                    x2l = U_i[1] - (U_i[0] << U_i[2]);
                    break;
                case 6:
                    x2l = (U_i[4] - U_i[0]) * U_i[2] * U_i[3] - U_i[1];
                    break;
                case 47:
                    x2l = U_i[3] + U_i[0] / +U_i[1] - U_i[2];
                    break;
                case 135:
                    x2l = (-U_i[2] + U_i[0]) / U_i[3] + U_i[1];
                    break;
                case 108:
                    x2l = U_i[1] *  - +U_i[0];
                    break;
                case 17:
                    x2l = U_i[0] ^ U_i[1];
                    break;
                case 48:
                    x2l = U_i[1] + (U_i[2] ^ U_i[0]);
                    break;
                case 40:
                    x2l = U_i[0] * U_i[2] - U_i[3] - U_i[1];
                    break;
                case 59:
                    x2l = U_i[2] - U_i[4] + U_i[3] - U_i[1] + U_i[0];
                    break;
                case 124:
                    x2l = U_i[4] * U_i[1] / U_i[0] - U_i[3] + U_i[2];
                    break;
                case 115:
                    x2l = U_i[0] + U_i[3] - U_i[1] + U_i[2];
                    break;
                case 84:
                    x2l = U_i[1] - (U_i[0] - U_i[3]) * U_i[2];
                    break;
                case 41:
                    x2l = U_i[2] * U_i[4] * U_i[1] / U_i[3] - U_i[0];
                    break;
                case 91:
                    x2l = -U_i[3] + U_i[2] - U_i[0] + U_i[4] - U_i[1];
                    break;
                case 24:
                    x2l = U_i[1] / U_i[0];
                    break;
                case 26:
                    x2l = -U_i[1] / U_i[2] + U_i[0];
                    break;
                case 42:
                    x2l = -U_i[2] + U_i[0] + U_i[1];
                    break;
                case 2:
                    x2l = U_i[1] + U_i[0];
                    break;
                case 57:
                    x2l = (U_i[4] + U_i[2]) / U_i[0] * U_i[3] - U_i[1];
                    break;
                case 83:
                    x2l = U_i[1] / (U_i[2] ^ U_i[0]);
                    break;
                case 4:
                    x2l = U_i[0] / U_i[2] / U_i[1] + U_i[4] + U_i[3];
                    break;
                case 49:
                    x2l = (-U_i[1] * U_i[2] - U_i[3]) / U_i[0] + U_i[4];
                    break;
                case 127:
                    x2l = (U_i[3] + U_i[0]) / U_i[2] - U_i[1];
                    break;
                case 132:
                    x2l = U_i[0] * U_i[1] - U_i[2] + U_i[3];
                    break;
                case 109:
                    x2l = U_i[0] + U_i[3] - U_i[2] - U_i[1] - U_i[4];
                    break;
                case 81:
                    x2l = (U_i[1] - U_i[3]) / U_i[2] + U_i[0];
                    break;
                case 74:
                    x2l = (U_i[2] + U_i[0] - U_i[4]) * U_i[1] - U_i[3];
                    break;
                case 37:
                    x2l = U_i[3] / U_i[1] * U_i[2] / U_i[4] - U_i[0];
                    break;
                case 43:
                    x2l = (U_i[0] * U_i[1] - U_i[3]) * U_i[2] - U_i[4];
                    break;
                case 0:
                    x2l = U_i[1] * U_i[0];
                    break;
                case 10:
                    x2l = U_i[3] / U_i[2] - U_i[1] + U_i[0];
                    break;
                case 32:
                    x2l = -U_i[2] * U_i[4] / U_i[1] + U_i[0] - U_i[3];
                    break;
                case 111:
                    x2l = U_i[2] - U_i[1] * U_i[0];
                    break;
                case 14:
                    x2l = (U_i[1] + U_i[3] + U_i[4]) / U_i[2] - U_i[0];
                    break;
                case 63:
                    x2l = U_i[5] + U_i[3] + U_i[0] + U_i[6] + U_i[4] + U_i[2] + U_i[1];
                    break;
                case 88:
                    x2l = U_i[4] / U_i[1] + U_i[2] + U_i[3] - U_i[0];
                    break;
                case 7:
                    x2l = U_i[1] - U_i[0];
                    break;
                case 52:
                    x2l = U_i[1] + U_i[2] - U_i[3] - U_i[0];
                    break;
                case 121:
                    x2l = U_i[2] - U_i[4] + U_i[0] + U_i[3] - U_i[1];
                    break;
                case 116:
                    x2l = U_i[2] / U_i[0] + U_i[3] - U_i[1] + U_i[4];
                    break;
                case 120:
                    x2l = (U_i[1] * U_i[2] + U_i[4]) / U_i[0] + U_i[3];
                    break;
                case 99:
                    x2l = (U_i[3] - U_i[4]) * U_i[1] + U_i[0] + U_i[2];
                    break;
                case 125:
                    x2l = (U_i[4] - U_i[1] - U_i[2]) / U_i[3] + U_i[0];
                    break;
                case 103:
                    x2l = U_i[1] == U_i[0];
                    break;
                case 134:
                    x2l = (U_i[2] - U_i[3] - U_i[4]) * U_i[0] - U_i[1];
                    break;
                case 12:
                    x2l = (U_i[4] - U_i[2] + U_i[0]) * U_i[3] - U_i[1];
                    break;
                case 97:
                    x2l = (U_i[3] - U_i[1] + U_i[0]) / U_i[4] - U_i[2];
                    break;
                case 65:
                    x2l = U_i[2] / (U_i[1] >> U_i[0]);
                    break;
                case 98:
                    x2l = U_i[4] - U_i[1] / (U_i[2] | U_i[3]) + U_i[0];
                    break;
                case 34:
                    x2l = U_i[0] - +U_i[1];
                    break;
                case 82:
                    x2l = U_i[3] + U_i[0] + U_i[1] - U_i[2];
                    break;
                case 126:
                    x2l = U_i[1] / U_i[4] / U_i[0] / U_i[3] + U_i[2];
                    break;
                case 92:
                    x2l = U_i[1] * -U_i[0];
                    break;
                case 16:
                    x2l = U_i[0] >> U_i[1];
                    break;
                case 80:
                    x2l = U_i[3] * U_i[0] * U_i[1] / U_i[4] + U_i[2];
                    break;
                case 15:
                    x2l = U_i[0] < U_i[1];
                    break;
                case 33:
                    x2l = U_i[1] + U_i[2] * U_i[0];
                    break;
                case 106:
                    x2l = U_i[2] * U_i[1] / (U_i[0] + U_i[3]);
                    break;
                case 77:
                    x2l = -U_i[2] + U_i[3] + U_i[1] - U_i[0];
                    break;
                case 29:
                    x2l = (U_i[3] - U_i[0]) * U_i[2] / U_i[4] + U_i[1];
                    break;
                case 45:
                    x2l = -U_i[2] - U_i[1] + U_i[0];
                    break;
                case 101:
                    x2l = U_i[0] / U_i[3] - U_i[1] - U_i[2];
                    break;
                case 62:
                    x2l = U_i[4] * U_i[2] / U_i[3] + U_i[1] + U_i[0];
                    break;
                case 107:
                    x2l = U_i[1] / U_i[0] + U_i[2];
                    break;
                case 95:
                    x2l = U_i[1] - U_i[2] / U_i[0];
                    break;
                case 28:
                    x2l = U_i[1] / U_i[0] - U_i[2];
                    break;
                case 96:
                    x2l = U_i[2] + (U_i[1] - U_i[0]);
                    break;
                case 31:
                    x2l = U_i[1] * +U_i[0];
                    break;
                case 78:
                    x2l = U_i[2] * U_i[3] / U_i[1] - U_i[0] - U_i[4];
                    break;
                case 79:
                    x2l = (U_i[1] - U_i[0]) / U_i[4] / U_i[3] - U_i[2];
                    break;
                case 53:
                    x2l = (U_i[0] + U_i[2]) / U_i[1];
                    break;
                case 105:
                    x2l = (U_i[2] - U_i[3]) * (U_i[6] - U_i[0]) + (U_i[1] - U_i[5]) * (U_i[7] - U_i[4]);
                    break;
                case 30:
                    x2l = -U_i[0] + U_i[1];
                    break;
                case 22:
                    x2l = U_i[1] - U_i[2] - U_i[0];
                    break;
                case 133:
                    x2l = (U_i[2] - U_i[1]) * U_i[3] - U_i[0];
                    break;
                case 69:
                    x2l = (U_i[2] - U_i[4]) * U_i[0] + U_i[1] - U_i[3];
                    break;
                case 90:
                    x2l = -U_i[2] / U_i[0] / U_i[3] + U_i[1];
                    break;
                case 3:
                    x2l = U_i[1] * U_i[3] * U_i[2] - U_i[0];
                    break;
                case 5:
                    x2l = U_i[1] - U_i[2] + U_i[3] + U_i[0];
                    break;
                case 128:
                    x2l = U_i[2] * U_i[1] * U_i[4] * U_i[3] - U_i[0];
                    break;
                case 18:
                    x2l = U_i[1] / U_i[3] * U_i[2] - U_i[0];
                    break;
                case 25:
                    x2l = U_i[0] / U_i[2] + U_i[1] - U_i[3] - U_i[4];
                    break;
                case 44:
                    x2l = U_i[3] + (U_i[1] + U_i[2] * U_i[4]) * U_i[0];
                    break;
                case 23:
                    x2l = U_i[2] - U_i[1] - U_i[0] - U_i[3] - U_i[4];
                    break;
                case 27:
                    x2l = U_i[0] / +U_i[1];
                    break;
                case 35:
                    x2l = U_i[1] + U_i[2] + U_i[0];
                    break;
                case 130:
                    x2l = U_i[2] * U_i[4] / U_i[3] * U_i[1] - U_i[0];
                    break;
                case 13:
                    x2l = U_i[3] / U_i[0] / U_i[1] - U_i[2];
                    break;
                case 71:
                    x2l = U_i[3] + U_i[2] + U_i[0] + U_i[1];
                    break;
                case 72:
                    x2l = (U_i[0] * U_i[3] + U_i[1]) * U_i[2] - U_i[4];
                    break;
                case 131:
                    x2l = (U_i[1] / U_i[2] + U_i[4]) * U_i[0] + U_i[3];
                    break;
                case 75:
                    x2l = U_i[0] / U_i[3] / U_i[1] * U_i[4] - U_i[2];
                    break;
                case 94:
                    x2l = (U_i[1] - U_i[4] + U_i[3]) / U_i[0] + U_i[2];
                    break;
                case 38:
                    x2l = U_i[0] * U_i[3] + U_i[1] - U_i[2];
                    break;
                case 117:
                    x2l = (U_i[4] + U_i[1] - U_i[3]) / U_i[0] - U_i[2];
                    break;
                case 61:
                    x2l = (U_i[0] - U_i[2]) * U_i[1] + U_i[3];
                    break;
                case 60:
                    x2l = (U_i[0] / U_i[2] - U_i[3]) / U_i[1] + U_i[4];
                    break;
                }
                return x2l;
            },
            N2kDw3q: function (s69) {
                K6M = s69;
            }
        };
    })();
    Z31PP.B_x = function () {
        return typeof Z31PP[468616].N2kDw3q === 'function' ? Z31PP[468616].N2kDw3q.apply(Z31PP[468616], arguments) : Z31PP[468616].N2kDw3q;
    };
    Z31PP.c6X = function (D_h) {
        Z31PP.A7M();
        if (Z31PP && D_h)
            return Z31PP.r3p(D_h);
    };
    Z31PP.f5h = function (d1K) {
        Z31PP.N7F();
        if (Z31PP)
            return Z31PP.H4Z(d1K);
    };
    Z31PP.p9Z = function (k8X) {
        Z31PP.N7F();
        if (Z31PP)
            return Z31PP.r3p(k8X);
    };
    Z31PP.J2r = function (C0l) {
        Z31PP.A7M();
        if (Z31PP)
            return Z31PP.r3p(C0l);
    };
    Z31PP.A7M();
    return (function () {
        var N1O = Z31PP;
        N1O.B$o = function (b2l) {
            N1O.N7F();
            if (N1O && b2l)
                return N1O.H4Z(b2l);
        };
        N1O.N7F();
        var i9z,
        V0P,
        R0k,
        J,
        H; {
            i9z = "f";
            i9z += "uncti";
            i9z += "o";
            i9z += "n";
            if (typeof define === i9z && define.amd) {
                V0P = "s";
                V0P += "tx";
                R0k = "s";
                R0k += "txThirdP";
                R0k += "ar";
                R0k += "ty";
                define(["stxTimeZoneData", R0k, V0P], function (L$9, x8c, a43) {
                    N1O.A7M();
                    return F(x8c, a43);
                });
            } else {
                J = {};
                if (typeof window.STXThirdParty != "undefined") {
                    J = window.STXThirdParty;
                }
                H = {
                    "STX": window.STX,
                    "STXChart": window.STXChart,
                    "$$": window.$$,
                    "$$$": window.$$$
                };
                F(J, H);
            }
        }
        function F(Q, K) {
            N1O.i9f = function (x04) {
                N1O.A7M();
                if (N1O && x04)
                    return N1O.H4Z(x04);
            };
            N1O.X0D = function (C$a) {
                N1O.N7F();
                if (N1O)
                    return N1O.H4Z(C$a);
            };
            N1O.Y7b = function (j8b) {
                N1O.N7F();
                if (N1O)
                    return N1O.r3p(j8b);
            };
            N1O.R_k = function (V$g) {
                N1O.A7M();
                if (N1O)
                    return N1O.H4Z(V$g);
            };
            N1O.N1b = function (f9J) {
                N1O.N7F();
                if (N1O)
                    return N1O.H4Z(f9J);
            };
            var c2S,
            t$H,
            T,
            B,
            G,
            R,
            S,
            U,
            k,
            N,
            X;
            c2S = "<div class=\"stx_chart_controls\" style=\"display: none; bottom: 22px;\"><div id=\"chartSize\"><span id=\"zoomOut\" class=\"stx-zoom-out\"></span><span id=";
            c2S += "\"zoomI";
            c2S += "n\" class=\"stx-zoom-in\"></span></div></div>";
            t$H = "<div id=\"mSticky\"> <span id=\"mStickyInterior\"></span> <span id=\"mStickyRightClick\" class=\"\"><span class=\"overlayEdit stx-btn\" style=\"display:none\"><span>&nbsp;</span></span> <span id=\"overlayTrashCan\" class=\"stx-btn\" style=\"d";
            t$H += "isplay:none\"><span>&nbsp;</span></span> <span id=\"mouseDeleteInstructions\"><span>(</span><span id=\"mouseDeleteText\">right-click to delete</span><span id=\"mouseManageText\">right-click to manage</span><span>)</span></span></span></div>";
            T = Q.plotSpline;
            B = Q.plotSplinePrimitive;
            G = Q.timezoneJS;
            R = K.STX;
            S = K.STXChart;
            U = K.$$;
            k = K.$$$;
            S.prototype.plugins = {};
            if (R.isSurface) {
                R.gesture = new MSGesture();
                R.gesture.target = document.body;
                R.gesturePointerId = null;
            }
            S.htmlControls = {
                "annotationSave": '<span class="stx-btn stx_annotation_save" style="display: none;">save</span>',
                "annotationCancel": '<span class="stx-btn stx_annotation_cancel" style="display: none; margin-left:10px;">cancel</span>',
                "mSticky": t$H,
                "crossX": '<div class="stx_crosshair stx_crosshair_x" style="display: none;"></div>',
                "crossY": '<div class="stx_crosshair stx_crosshair_y" style="display: none;"></div>',
                "chartControls": c2S,
                "home": '<div id="home" class="stx_jump_today home" style="display:none"><span></span></div>',
                "floatDate": '<div class="stx-float-date" style="display: none;"></div>',
                "handleTemplate": '<div class="stx-ico-handle" style="display: none;"><span></span></div> ',
                "iconsTemplate": '<div class="stx-panel-control"><div class="stx-panel-title"></div><div class="stx-btn-panel"><span class="stx-ico-up"></span></div><div class="stx-btn-panel"><span class="stx-ico-focus"></span></div><div class="stx-btn-panel"><span class="stx-ico-down"></span></div><div class="stx-btn-panel"><span class="stx-ico-edit"></span></div><div class="stx-btn-panel"><span class="stx-ico-close"></span></div></div>',
                "baselineHandle": '<div class="stx-baseline-handle fa" style="display: none;"></div>'
            };
            S.prototype.registerHTMLElements = function () {
                var f53,
                h7t,
                c5C,
                E,
                C56,
                M,
                e0y,
                V,
                Y,
                u7s,
                g7x,
                D,
                u;
                N1O.p86(0);
                f53 = -N1O.f21(1, "1355039613");
                N1O.p86(1);
                h7t = N1O.U9a(1, "1746600787");
                c5C = 2;
                for (var r3j = 1; N1O.Y4l(r3j.toString(), r3j.toString().length, 73214) !== f53; r3j++) {
                    E = this.chart.container;
                    c5C += 2;
                }
                if (N1O.n$d(c5C.toString(), c5C.toString().length, 67195) !== h7t) {
                    E = this.chart.container;
                }
                for (var A in S.htmlControls) {
                    C56 = "un";
                    C56 += "de";
                    C56 += "fin";
                    C56 += "ed";
                    if (typeof this.chart[A] == "undefined" && typeof this.controls[A] == C56) {
                        if (!this.allowZoom && A == "chartControls")
                            continue;
                        N1O.p86(2);
                        M = k(N1O.f21(A, 502.97 != (8979, 1610) ? "#" : (0xde6, 6.48e+3)), E);
                        if (M) {
                            this.chart[A] = M;
                            this.controls[A] = M;
                        } else {
                            e0y = "D";
                            e0y += "IV";
                            V = S.htmlControls[A];
                            Y = document.createElement(e0y);
                            Y.innerHTML = V;
                            M = Y.firstChild;
                            E.appendChild(M);
                            this.chart[A] = M;
                            this.controls[A] = M;
                            M.id = A;
                        }
                    }
                }
                if (this.controls.chartControls) {
                    u7s = "#zoom";
                    u7s += "O";
                    u7s += "ut";
                    g7x = "#zoom";
                    g7x += "In";
                    D = k(g7x, this.controls.chartControls);
                    u = k(u7s, this.controls.chartControls);
                    R.safeClickTouch(D, (function (V9) {
                            return function (W_) {
                                V9.zoomIn();
                                W_.stopPropagation();
                            };
                        })(this));
                    R.safeClickTouch(u, (function (J_) {
                            return function (A_) {
                                J_.zoomOut();
                                N1O.A7M();
                                A_.stopPropagation();
                            };
                        })(this));
                    if (!R.touchDevice) {
                        D.onmouseover = (function (i_) {
                            return function (I$) {
                                N1O.N7F();
                                i_.modalBegin();
                            };
                        })(this);
                        D.onmouseout = (function (e8) {
                            return function (W9) {
                                N1O.A7M();
                                e8.modalEnd();
                            };
                        })(this);
                        u.onmouseover = (function (L4) {
                            N1O.A7M();
                            return function (M9) {
                                L4.modalBegin();
                            };
                        })(this);
                        u.onmouseout = (function (e7) {
                            N1O.N7F();
                            return function (e2) {
                                e7.modalEnd();
                            };
                        })(this);
                    }
                }
                if (this.controls.home) {
                    R.safeClickTouch(this.controls.home, (function (J$) {
                            return function (f4) {
                                J$.home({
                                    animate: !""
                                });
                                f4.stopPropagation();
                            };
                        })(this));
                    if (!R.touchDevice) {
                        this.controls.home.onmouseover = (function (c4) {
                            N1O.A7M();
                            return function (Q$) {
                                c4.modalBegin();
                            };
                        })(this);
                        this.controls.home.onmouseout = (function (q_) {
                            return function (F_) {
                                N1O.A7M();
                                q_.modalEnd();
                            };
                        })(this);
                    }
                }
            };
            R.camelCaseRegExp = /-([a-z])/g;
            R.makeCamelCase = function (Q4) {
                return Q4.replace(R.camelCaseRegExp, function (B4) {
                    N1O.N7F();
                    return B4[1].toUpperCase();
                });
            };
            S.prototype.cloneStyle = function (z3) {
                var z0,
                I8,
                z_,
                G8,
                d6,
                S9,
                a1,
                B1;
                function x4(x7) {
                    return x7[1].toUpperCase();
                }
                z0 = {};
                I8 = !"1";
                for (var b6 in z3) {
                    z_ = z3[b6];
                    if (b6 == "backgroundAttachment") {
                        I8 = !![];
                    }
                    if (I8) {
                        if (z_ && z_.constructor == String && isNaN(b6)) {
                            z0[b6] = z_;
                        }
                    } else if (!isNaN(b6)) {
                        G8 = z3.getPropertyValue(z_);
                        if (G8) {
                            z_ = z_.split("-");
                            d6 = 0;
                            S9 = z_.length;
                            a1 = z_[0];
                            while (++d6 < S9) {
                                a1 += z_[d6].charAt(0).toUpperCase() + z_[d6].slice("1" << 0);
                            }
                            z0[a1] = G8;
                        }
                    } else {
                        B1 = b6.replace(R.camelCaseRegExp, x4);
                        z0[B1] = z_;
                    }
                }
                N1O.A7M();
                return z0;
            };
            S.prototype.canvasStyle = function (r7) {
                N1O.N7F();
                var a2,
                t9,
                D6;
                a2 = this.styles[r7];
                if (!a2) {
                    t9 = document.createElement("div");
                    t9.className = r7;
                    document.body.appendChild(t9);
                    D6 = getComputedStyle(t9);
                    a2 = this.styles[r7] = this.cloneStyle(D6);
                    document.body.removeChild(t9);
                    if (!D6) {
                        this.styles[r7] = null;
                    }
                }
                return a2;
            };
            S.prototype.colorOrStyle = function (p8) {
                var R_5;
                R_5 = "rgb";
                R_5 += "(";
                if (p8.indexOf((4825, 570.41) === 3340 ? 1.27e+3 : "#") != -1) {
                    return p8;
                }
                if (p8.indexOf("rgba(") != -1) {
                    return p8;
                }
                if (p8.indexOf(R_5) != -1) {
                    return p8;
                }
                if (p8 == "transparent") {
                    return p8;
                }
                return this.canvasStyle(p8);
            };
            S.prototype.clearStyles = function () {
                N1O.N7F();
                this.styles = {};
            };
            S.prototype.setStyle = function (v3, G9, k6) {
                if (!this.styles[v3]) {
                    this.canvasStyle(v3);
                }
                if (!this.styles[v3]) {
                    this.styles[v3] = {};
                }
                this.styles[v3][R.makeCamelCase(G9)] = k6;
            };
            S.prototype.canvasFont = function (k5, g_) {
                var u1,
                Y2,
                Q4y;
                if (!g_) {
                    g_ = this.chart.context;
                }
                u1 = this.canvasStyle(k5);
                if (!u1) {
                    return;
                }
                N1O.p86(3);
                var b5G = N1O.f21(45695, 1692, 14, 2);
                N1O.B_x(4);
                var K9a = N1O.U9a(64, 1, 64, 11, 20);
                N1O.B_x(5);
                var p79 = N1O.f21(25, 8669, 17, 9);
                N1O.B_x(6);
                var m$7 = N1O.U9a(9, 442070, 20, 20, 1117);
                N1O.p86(7);
                var V8w = N1O.f21(512, 576);
                N1O.B_x(3);
                var C0H = N1O.f21(7118, 57, 18, 7);
                N1O.B_x(8);
                var Z8P = N1O.U9a(9833, 0, 10);
                N1O.p86(7);
                var r8q = N1O.f21(76570, 80600);
                N1O.B_x(9);
                var v4n = N1O.U9a(9, 17, 7, 2875);
                N1O.A7M();
                N1O.p86(10);
                var S09 = N1O.f21(3778, 5, 541, 3787);
                Y2 = u1.fontStyle + (b5G != "112" >> K9a ? " " : 20.92) + u1.fontWeight + ((p79, 1080) < m$7 ? "6030" >> V8w === "7659" << C0H ? Z8P : " " : (r8q, 9.80e+3)) + u1.fontSize + (532.94 == (v4n,  + "9610") ? (161.35, S09) : " ") + u1.fontFamily;
                if (Y2.indexOf("undefined") == -1) {
                    g_.font = Y2;
                } else {
                    Q4y = "bad css style for cl";
                    Q4y += "a";
                    Q4y += "ss ";
                    this.styles[k5] = null;
                    N1O.B_x(2);
                    console.log(N1O.U9a(k5, Q4y));
                }
            };
            S.prototype.canvasColor = function (Z1, a4) {
                N1O.A7M();
                var Y9,
                C$,
                s_,
                N5C,
                K3C,
                f67;
                if (!a4) {
                    a4 = this.chart.context;
                }
                Y9 = this.canvasStyle(Z1);
                if (!Y9) {
                    return;
                }
                C$ = Y9.color;
                if (R.isTransparent(C$)) {
                    C$ = this.defaultColor;
                }
                a4.globalAlpha = 1;
                a4.fillStyle = C$;
                a4.strokeStyle = C$;
                s_ = Y9.opacity;
                N1O.B_x(11);
                N5C = -N1O.f21("1750611626", 64);
                K3C = 1062579154;
                N1O.B_x(11);
                f67 = N1O.U9a("2", 64);
                for (var C1L = 1; N1O.n$d(C1L.toString(), C1L.toString().length,  + "32939") !== N5C; C1L++) {
                    if (!s_ === "") {
                        a4.globalAlpha = s_;
                    }
                    f67 += 2;
                }
                if (N1O.n$d(f67.toString(), f67.toString().length,  + "67460") !== K3C) {
                    if (typeof s_ != "undefined") {
                        a4.globalAlpha = s_;
                    }
                }
            };
            S.prototype.getCanvasFontSize = function (L$) {
                var r_8,
                o8,
                j7;
                r_8 = "1";
                r_8 += "2";
                o8 = this.canvasStyle(L$);
                j7 = o8.fontSize;
                if (!j7) {
                    j7 = r_8;
                }
                return parseInt(R.stripPX(j7));
            };
            S.prototype.getCanvasColor = function (V1) {
                var N8;
                N1O.N7F();
                N8 = this.canvasStyle(V1);
                return N8.color;
            };
            S.hideDates = function () {
                return !({});
            };
            S.prototype.runPrepend = function (l3, g7, r1) {
                var M5,
                h0;
                N1O.p86(2);
                M5 = this[N1O.U9a(l3, "prepend")];
                if (!M5) {
                    return !({});
                }
                if (!r1) {
                    r1 = this;
                }
                for (var R$ = 0; R$ < M5.length; R$++) {
                    h0 = M5[R$].apply(r1, g7);
                    if (h0) {
                        return h0;
                    }
                }
                return !1;
            };
            S.prototype.runAppend = function (f9, o0, a3) {
                var T5,
                q1;
                N1O.B_x(2);
                T5 = this[N1O.U9a(f9, "append")];
                if (!T5) {
                    return !({});
                }
                if (!a3) {
                    a3 = this;
                }
                for (var t_ = 0; t_ < T5.length; t_++) {
                    q1 = T5[t_].apply(a3, o0);
                    if (q1) {
                        return q1;
                    }
                }
                return !!0;
            };
            S.registerDrawingTool = function (v6, X3) {
                S.drawingTools[v6] = X3;
            };
            S.prototype.createBlock = function (a8, q2, L6, M8, X2, w1) {
                if (!w1) {
                    w1 = this.chart.context;
                }
                if (typeof M8 == "undefined") {
                    return;
                }
                this.canvasColor(X2, w1);
                w1.fillRect(a8, L6, q2, M8);
                w1.globalAlpha = 1;
            };
            S.prototype.changeOccurred = function (A0) {
                var w3b,
                C8i;
                N1O.N7F();
                if (this.currentlyImporting) {
                    return;
                }
                if (this.changeCallback) {
                    this.changeCallback(this, A0);
                }
                if (A0 == "layout") {
                    w3b = "la";
                    w3b += "yo";
                    w3b += "ut";
                    this.dispatch(w3b, {
                        stx: this,
                        symbol: this.chart.symbol,
                        symbolObject: this.chart.symbolObject,
                        layout: this.layout
                    });
                } else if (A0 == "vector") {
                    C8i = "dra";
                    C8i += "w";
                    C8i += "i";
                    C8i += "ng";
                    this.dispatch(C8i, {
                        stx: this,
                        symbol: this.chart.symbol,
                        symbolObject: this.chart.symbolObject,
                        drawings: this.drawingObjects
                    });
                }
            };
            S.prototype.setChartType = function (K4) {
                var r5y,
                t8C,
                j89;
                N1O.N7F();
                r5y = 1035002942;
                t8C = 6921273;
                j89 = 2;
                for (var u01 = 1; N1O.Y4l(u01.toString(), u01.toString().length, 4409) !== r5y; u01++) {
                    this.layout.chartType = K4;
                    N1O.p86(11);
                    j89 += N1O.f21("2", 32);
                }
                if (N1O.n$d(j89.toString(), j89.toString().length, 15740) !== t8C) {
                    this.layout.chartType = K4;
                }
                if (this.displayInitialized) {
                    this.draw();
                }
                this.changeOccurred("layout");
            };
            S.prototype.setAggregationType = function (p5) {
                this.layout.aggregationType = p5;
                if (this.chart.canvas) {
                    this.createDataSet();
                    this.draw();
                }
                this.changeOccurred("layout");
            };
            S.prototype.setChartScale = function (R5) {
                if (!R5) {
                    R5 = "linear";
                }
                this.layout.chartScale = R5;
                N1O.N7F();
                if (this.chart.canvas) {
                    this.draw();
                }
                this.changeOccurred("layout");
            };
            S.prototype.setAdjusted = function (n1) {
                this.layout.adj = n1;
                if (this.chart.canvas) {
                    this.createDataSet();
                    this.draw();
                }
                this.changeOccurred("layout");
            };
            S.prototype.setVolumeUnderlay = function (M7) {
                this.layout.volumeUnderlay = M7;
                if (this.chart.canvas) {
                    this.draw();
                }
                this.changeOccurred("layout");
            };
            S.prototype.serializeDrawings = function () {
                var V8;
                V8 = [];
                for (var V4 = 0; V4 < this.drawingObjects.length; V4++) {
                    V8.push(this.drawingObjects[V4].serialize());
                }
                return V8;
            };
            S.prototype.abortDrawings = function () {
                for (var e1 = 0; e1 < this.drawingObjects.length; e1++) {
                    this.drawingObjects[e1].abort(!0);
                }
                this.drawingObjects = [];
            };
            S.prototype.reconstructDrawings = function (I6) {
                var t5,
                D8,
                v8;
                for (var w5 = 0; w5 < I6.length; w5++) {
                    t5 = I6[w5];
                    if (t5.name == "fibonacci") {
                        t5.name = "retracement";
                    }
                    D8 = S.drawingTools[t5.name];
                    if (!D8) {
                        if (R.Drawing[t5.name]) {
                            D8 = R.Drawing[t5.name];
                            S.registerDrawingTool(t5.name, D8);
                        }
                    }
                    if (D8) {
                        v8 = new D8();
                        v8.reconstruct(this, t5);
                        this.drawingObjects.push(v8);
                    }
                }
            };
            S.prototype.clearDrawings = function (o6) {
                var x4l,
                Y3;
                x4l = "vec";
                x4l += "tor";
                Y3 = R.shallowClone(this.drawingObjects);
                this.abortDrawings();
                if (o6) {
                    this.undoStamps = [];
                } else {
                    this.undoStamp(Y3, R.shallowClone(this.drawingObjects));
                }
                this.changeOccurred(x4l);
                this.createDataSet();
                this.deleteHighlighted(); ;
            };
            S.prototype.createDrawing = function (i5, E7) {
                var u5;
                u5 = new R.Drawing[i5]();
                u5.reconstruct(this, E7);
                this.drawingObjects.push(u5);
                N1O.N7F();
                this.draw();
                return u5;
            };
            S.prototype.removeDrawing = function (G4) {
                N1O.N7F();
                for (var B3 = 0; B3 < this.drawingObjects.length; B3++) {
                    if (this.drawingObjects[B3] == G4) {
                        N1O.B_x(11);
                        this.drawingObjects.splice(B3, N1O.U9a("1", 0));
                        this.changeOccurred("vector");
                        this.draw();
                        return;
                    }
                }
            };
            S.prototype.dateFromTick = function (P$, U1, N2) {
                var i4,
                h4,
                q6,
                P4;
                if (!U1) {
                    U1 = this.chart;
                }
                i4 = U1.dataSet.length;
                P4 = 0;
                if (P$ < 0) {
                    q6 = this.standardMarketIterator(U1.dataSet[0].DT);
                    while (P4 > P$) {
                        h4 = q6.previous();
                        P4 -= 1;
                    }
                } else if (P$ >= i4) {
                    q6 = this.standardMarketIterator(U1.dataSet[i4 - 1].DT);
                    while (i4 - 1 + P4 < P$) {
                        h4 = q6.next();
                        P4 += 1;
                    }
                } else {
                    h4 = U1.dataSet[P$].DT;
                }
                if (N2) {
                    return new Date(h4.getTime());
                }
                return R.yyyymmddhhmm(h4);
            };
            S.prototype.calculateYAxisMargins = function (l9) {
                l9.zoom = l9.initialMarginTop + l9.initialMarginBottom;
                N1O.p86(12);
                N1O.N7F();
                var S7N = N1O.f21(18, 248, 6, 5, 38);
                l9.scroll = (l9.initialMarginTop - l9.initialMarginBottom) / S7N;
            };
            S.prototype.home = function (P6) {
                var q0E,
                E_,
                N6,
                e9,
                S5,
                o5,
                c9,
                g9,
                W0,
                U6,
                r9,
                R9;
                q0E = "o";
                q0E += "bje";
                q0E += "ct";
                this.swipe.amplitude = 0;
                this.grabbingScreen = !!"";
                if (S.insideChart) {
                    R.unappendClassName(this.container, "stx-drag-chart");
                }
                if (typeof P6 != q0E) {
                    P6 = {
                        maintainWhitespace: P6
                    };
                }
                if (typeof P6.maintainWhitespace == "undefined") {
                    P6.maintainWhitespace = !!({});
                }
                this.cancelTouchSingleClick = !![];
                if (!this.chart.dataSet || !this.chart.dataSet.length) {
                    this.draw();
                    return;
                }
                this.micropixels = 0;
                E_ = this.chart.width / this.layout.candleWidth;
                for (var g8 in this.charts) {
                    N6 = this.charts[g8];
                    if (P6.chart && P6.chart != N6)
                        continue;
                    e9 =  + "0";
                    if (P6.maintainWhitespace && this.preferences.whitespace >=  + "0") {
                        e9 = this.preferences.whitespace;
                    }
                    if (P6.whitespace) {
                        e9 = P6.whitespace;
                    }
                    S5 = e9 / this.layout.candleWidth;
                    o5 = this.layout.chartType == "line" || this.layout.chartType == "colored_line" || this.layout.chartType == "mountain" || this.layout.chartType == "colored_mountain";
                    if (this.yaxisLabelStyle == "roundRectArrow" && !(o5 && this.extendLastTick && this.chart.yaxisPaddingRight !== 0)) {
                        c9 = 3;
                        g9 = this.getCanvasFontSize("stx_yaxis") + c9 *  + "2";
                        N1O.B_x(0);
                        W0 = N1O.U9a(0.66, g9);
                        S5 += W0 / this.layout.candleWidth;
                        if (S5 < 0) {
                            S5 = 0;
                        }
                    }
                    U6 = Math.min(E_, N6.dataSet.length);
                    if (this.chart.allowScrollPast) {
                        U6 = E_;
                    }
                    U6 -= S5;
                    r9 = Math.floor(U6);
                    this.micropixels = (U6 - r9) * this.layout.candleWidth;
                    if (o5) {
                        N1O.p86(13);
                        var o4W = N1O.f21(3, 1, 4, 18);
                        this.micropixels += this.layout.candleWidth / o4W;
                    }
                    if (this.micropixels > this.layout.candleWidth) {
                        r9++;
                        this.micropixels -= this.layout.candleWidth;
                    }
                    if (P6.animate) {
                        R9 = this;
                        this.scrollTo(N6, r9, (function (g0, i8, W5) {
                                N1O.A7M();
                                return function () {
                                    g0.calculateYAxisMargins(i8.panel.yAxis);
                                    i8.scroll = W5;
                                    g0.draw();
                                };
                            })(R9, N6, r9));
                    } else {
                        N6.scroll = r9;
                        this.calculateYAxisMargins(N6.panel.yAxis);
                    }
                }
                this.draw();
            };
            S.prototype.isHome = function () {
                N1O.p86(14);
                var L9K = N1O.U9a(0, 19, 41, 14, 8);
                return this.chart.scroll - L9K <= Math.ceil(this.chart.width / this.layout.candleWidth);
            };
            S.prototype.tickFromDate = function (h9, P9, D1, c7) {
                var V$,
                m6,
                Y0,
                V0,
                l0,
                n$,
                L7,
                u7,
                O8,
                M_;
                if (!P9) {
                    P9 = this.chart;
                }
                if (!P9.dataSet || !P9.dataSet.length) {
                    return 0;
                }
                if (!D1) {
                    D1 = 0;
                }
                if (!P9) {
                    P9 = this.chart;
                }
                V$ = h9.constructor == Date ? h9 : R.strToDateTime(h9);
                if (!S.isDailyInterval(this.layout.interval)) {
                    V$.setMinutes(V$.getMinutes() + D1);
                }
                N1O.N7F();
                m6 = V$.getTime();
                Y0 = P9.tickCache[m6];
                if (Y0 || Y0 === 0) {
                    return Y0;
                }
                V0 = P9.dataSet[0].DT;
                l0 = P9.dataSet[P9.dataSet.length -  + "1"].DT;
                if (V$ >= V0 && V$ <= l0) {
                    for (var z8 = 0; z8 < P9.dataSet.length; z8++) {
                        n$ = P9.dataSet[z8].DT;
                        if (n$.getTime() == V$.getTime()) {
                            P9.tickCache[m6] = z8;
                            return z8;
                        }
                        if (n$ > V$) {
                            P9.tickCache[m6] = c7 ? z8 : z8 - 1;
                            return P9.tickCache[m6];
                        }
                    }
                }
                N1O.p86(15);
                L7 = N1O.f21(V$, V0);
                u7 = L7 ? V0 : l0;
                O8 = this.standardMarketIterator(u7);
                M_ = O8.futureTick({
                    end: V$
                });
                Y0 = L7 ? M_ * -1 : P9.dataSet.length - 1 + M_;
                P9.tickCache[m6] = Y0;
                return Y0;
            };
            S.XAxisLabel = function (P3, T3, R3) {
                this.hz = P3;
                this.grid = T3;
                N1O.N7F();
                this.text = R3;
            };
            S.prototype.createXAxis = function (N4) {
                var I6l,
                f7,
                F8,
                g$,
                z2m,
                D5H,
                r1Z,
                j2y;
                I6l = "nume";
                N1O.N7F();
                I6l += "r";
                I6l += "ic";
                if (N4.dataSegment.length <= 0) {
                    return null;
                }
                if (S.hideDates()) {
                    return null;
                }
                f7 = [N4];
                F8 = this.runPrepend("createXAxis", f7);
                if (F8) {
                    return F8;
                }
                g$ = this.layout.interval;
                if (N4.xAxis.axisType == I6l) {
                    return this.createNumericXAxis(N4);
                }
                N1O.B_x(16);
                z2m = -N1O.f21("1521458666", 64);
                N1O.p86(17);
                D5H = N1O.U9a("763816203", 0);
                r1Z = 2;
                for (var V0C = 1; N1O.Y4l(V0C.toString(), V0C.toString().length, 15724) !== z2m; V0C++) {
                    F8 = this.createTickXAxisWithDates(N4);
                    this.runAppend("", f7);
                    return F8;
                }
                if (N1O.Y4l(r1Z.toString(), r1Z.toString().length, 85402) !== D5H) {
                    j2y = "c";
                    j2y += "reateXAxis";
                    F8 = this.createTickXAxisWithDates(N4);
                    this.runAppend(j2y, f7);
                    return F8;
                }
            };
            S.prototype.drawXAxis = function (T8, i0) {
                var C$M,
                h_u,
                y0M,
                W4V,
                X4,
                E6,
                E$,
                f2,
                d3,
                A6,
                J3,
                s8,
                B2,
                O1,
                j$,
                m$,
                D$,
                C5,
                B$,
                s2,
                w35,
                O5,
                w4,
                y8,
                H5;
                C$M = "st";
                C$M += "r";
                C$M += "ok";
                C$M += "e";
                h_u = "bo";
                h_u += "undary";
                y0M = " ";
                y0M += " ";
                y0M += " ";
                W4V = "c";
                N1O.N7F();
                W4V += "e";
                W4V += "nter";
                X4 = [T8, i0];
                if (this.runPrepend("drawXAxis", X4)) {
                    return;
                }
                if (!i0) {
                    return;
                }
                E6 = null;
                E$ = this.chart.context;
                this.canvasFont("stx_xaxis");
                E$.textAlign = W4V;
                E$.textBaseline = "middle";
                d3 = E$.measureText(y0M).width;
                for (var n5 = 0; n5 < i0.length; n5++) {
                    f2 = i0[n5];
                    A6 = E$.measureText(f2.text).width;
                    N1O.B_x(2);
                    J3 = Math.max(N1O.U9a(d3, A6), T8.xAxis.minimumLabelWidth);
                    f2.hz = Math.floor(f2.hz + this.micropixels) + 0.5;
                    N1O.B_x(7);
                    var S0o = N1O.f21(4, 6);
                    f2.left = f2.hz - J3 / S0o;
                    N1O.p86(18);
                    var H$M = N1O.U9a(15, 1, 17, 1);
                    f2.right = f2.hz + J3 / H$M;
                    f2.unpaddedRight = f2.hz + A6 /  + "2";
                }
                s8 = new R.Plotter();
                s8.newSeries("line", "stroke", this.canvasStyle("stx_grid"));
                s8.newSeries(h_u, "stroke", this.canvasStyle("stx_grid_dark"));
                s8.newSeries("border", C$M, this.canvasStyle("stx_grid_border"));
                B2 = this.xAxisAsFooter === !!1 ? this.chart.canvasHeight : T8.panel.bottom;
                N1O.p86(7);
                O1 = this.whichPanel(N1O.U9a(1, B2));
                if (!O1) {
                    return;
                }
                j$ = O1.yAxis;
                this.adjustYAxisHeightOffset(O1, j$);
                m$ = -1;
                D$ = Math.MAX_VALUE;
                C5 = T8.xAxis.displayBorder || T8.xAxis.displayBorder === null;
                if (this.axisBorders === !![]) {
                    C5 = !!({});
                }
                if (this.axisBorders === !!"") {
                    C5 = !({});
                }
                B$ = C5 ? j$.bottom - 0.5 : j$.bottom;
                s2 = B2 - this.xaxisHeight / ("2" ^ 0);
                if (C5) {
                    s2 += 3;
                }
                for (var F1 = 0; F1 < i0.length; F1++) {
                    w35 = "bou";
                    w35 += "nd";
                    w35 += "ary";
                    if (i0[F1].grid == w35) {
                        D$ = i0[F1].left;
                        break;
                    }
                }
                N1O.p86(17);
                O5 = N1O.U9a("0", 0);
                w4 = 0;
                for (var X6 = 0; X6 < i0.length; X6++) {
                    f2 = i0[X6];
                    if (X6 == F1) {
                        for (F1++; F1 < i0.length; F1++) {
                            if (i0[F1].grid == "boundary") {
                                D$ = i0[F1].left;
                                break;
                            }
                        }
                        if (F1 >= i0.length) {
                            F1 = -1;
                            D$ = Math.MAX_VALUE;
                        }
                        if (m$ > -1) {
                            if (f2.left < m$)
                                continue;
                        }
                    } else {
                        if (m$ > -1) {
                            if (f2.left < m$)
                                continue;
                        }
                        if (f2.right > D$)
                            continue;
                    }
                    m$ = f2.right;
                    if (Math.floor(f2.unpaddedRight) <= this.chart.right) {
                        w4++;
                        if (T8.xAxis.displayGridLines) {
                            s8.moveTo(f2.grid, f2.hz, this.xAxisAsFooter === !!({}) ? "0" >> 32 : j$.top);
                            s8.lineTo(f2.grid, f2.hz, B$);
                        }
                        if (C5) {
                            s8.moveTo("border", f2.hz, B$ + 0.5);
                            s8.lineTo("border", f2.hz, B$ +  + "6");
                        }
                        O5 = f2.hz;
                        this.canvasColor(f2.grid == "boundary" ? "stx_xaxis_dark" : "stx_xaxis");
                        E$.fillText(f2.text, f2.hz, s2);
                    }
                }
                if (C5) {
                    y8 = Math.round(j$.bottom) + 0.5;
                    H5 = Math.round(T8.right) + 0.5;
                    s8.moveTo("border", T8.left, y8);
                    s8.lineTo("border", H5, y8);
                }
                s8.draw(E$);
                E$.textAlign = "left";
                this.runAppend("drawXAxis", X4);
            };
            S.prototype.createNumericXAxis = function (o3) {
                var s9,
                u3,
                b0,
                G5,
                T2,
                c5,
                e4,
                l4,
                b7,
                n0,
                Z6,
                n_,
                p$,
                P_,
                i$;
                axisRepresentation = [];
                o3.xaxis = [];
                for (var g5 = 0; g5 < o3.maxTicks; g5++) {
                    if (o3.dataSegment[g5])
                        break;
                    o3.xaxis.push(null);
                }
                for (var X5 = g5; X5 < o3.maxTicks; X5++) {
                    if (!o3.dataSegment[g5])
                        break;
                }
                s9 = (X5 - g5) / o3.maxTicks;
                u3 = o3.xAxis.idealTickSizePixels ? o3.xAxis.idealTickSizePixels : o3.xAxis.autoComputedTickSizePixels;
                b0 = Math.round(this.chart.width * s9 / u3);
                G5 = this.determineMinMax(o3.dataSegment, ["index"]);
                T2 = G5[1];
                N1O.B_x(1);
                c5 = G5[N1O.U9a(0, "0")];
                N1O.p86(7);
                e4 = N1O.U9a(c5, T2);
                N1O.B_x(7);
                l4 = t6(N1O.U9a(c5, T2), !"1");
                N1O.p86(19);
                b7 = t6(N1O.U9a(b0, e4, 1), !![]);
                n0 = Math.floor(c5 / b7) * b7;
                Z6 = Math.ceil(T2 / b7) * b7;
                function t6(y9, A9) {
                    var f8,
                    Y1,
                    Y7;
                    f8 = Math.floor(Math.log10(y9));
                    N1O.p86(20);
                    var v_f = N1O.U9a(13, 22, 606, 9, 14);
                    Y1 = y9 / Math.pow("10" | v_f, f8);
                    if (A9) {
                        if (Y1 < "1.5" - 0) {
                            Y7 = 1;
                        } else if (Y1 < "3" - 0) {
                            Y7 = 2;
                        } else if (Y1 < 7) {
                            Y7 =  + "5";
                        } else {
                            Y7 = 10;
                        }
                    } else {
                        if (Y1 <= 1) {
                            Y7 = 1;
                        } else if (Y1 <= ("2" | 0)) {
                            Y7 = 2;
                        } else if (Y1 <= 5) {
                            Y7 = 5;
                        } else {
                            Y7 = 10;
                        }
                    }
                    N1O.p86(21);
                    var o3x = N1O.f21(2, 3, 1, 21);
                    return Y7 * Math.pow(o3x, f8);
                }
                N1O.A7M();
                n_ = n0;
                if (n0 < c5) {
                    N1O.B_x(2);
                    n_ = N1O.U9a(b7, n0);
                }
                for (g5; g5 < o3.maxTicks; g5++) {
                    P_ = o3.dataSegment[g5];
                    if (P_) {
                        i$ = {
                            index: P_.index,
                            data: P_
                        };
                        o3.xaxis.push(i$);
                        if (P_.index < n_)
                            continue;
                        if (P_.index == n_) {
                            p$ = o3.left + g5 * this.layout.candleWidth + this.micropixels;
                        } else if (P_.index > n_) {
                            N1O.B_x(22);
                            var H1U = N1O.U9a(14, 27, 10);
                            p$ = o3.left + g5 * this.layout.candleWidth - H1U + this.micropixels;
                        }
                        axisRepresentation.push(new S.XAxisLabel(p$, "line", n_));
                        n_ += b7;
                    } else {
                        o3.xaxis.push(null);
                    }
                }
                return axisRepresentation;
            };
            S.prototype.createTickXAxisWithDates = function (Z0) {
                var H9,
                H8,
                T4,
                R_,
                Y5,
                Z7n,
                I2H,
                z$v,
                X1,
                I4,
                f5,
                C1,
                Z9,
                k0,
                c6,
                H2,
                Y4,
                s0,
                j9,
                o2,
                j0,
                Z2,
                G2,
                p1,
                s1,
                E5,
                I0,
                l1,
                E2,
                w6,
                L1,
                k9,
                Q_,
                F9,
                p0;
                if (!Z0) {
                    Z0 = this.chart;
                }
                Z0.xaxis = [];
                if (!this.timeIntervalMap) {
                    this.timePossibilities = [R.MILLISECOND, R.SECOND, R.MINUTE, R.HOUR, R.DAY, R.MONTH, R.YEAR];
                    this.timeIntervalMap = {};
                    this.timeIntervalMap[R.MILLISECOND] = {
                        arr: [1, 2, 5, 10, 20,  + "50", 100, 250, 500],
                        minTimeUnit: 0,
                        maxTimeUnit: 1000
                    };
                    this.timeIntervalMap[R.SECOND] = {
                        arr: [1, 2, 5, 10, 15, "30" - 0],
                        minTimeUnit:  + "0",
                        maxTimeUnit: 60
                    };
                    this.timeIntervalMap[R.MINUTE] = {
                        arr: [1, "2" ^ 0, 5, 10, "15" * 1, 30],
                        minTimeUnit: 0,
                        maxTimeUnit: 60
                    };
                    this.timeIntervalMap[R.HOUR] = {
                        arr: [1, 2,  + "3", 4, "6" ^ 0, 12],
                        minTimeUnit: 0,
                        maxTimeUnit: 24
                    };
                    this.timeIntervalMap[R.DAY] = {
                        arr: [ + "1", 2,  + "7", 14],
                        minTimeUnit: 1,
                        maxTimeUnit: 32
                    };
                    this.timeIntervalMap[R.MONTH] = {
                        arr: [1, 2, 3, 6],
                        minTimeUnit: 1,
                        maxTimeUnit: "13" * 1
                    };
                    this.timeIntervalMap[R.YEAR] = {
                        arr: [1, "2" | 0, 3,  + "5"],
                        minTimeUnit: 1,
                        maxTimeUnit: "20000000" * 1
                    };
                    this.timeIntervalMap[R.DECADE] = {
                        arr: [10],
                        minTimeUnit: 0,
                        maxTimeUnit:  + "2000000"
                    };
                }
                H9 = [31,  + "28", 31, 30,  + "31", 30, 31, 31, 30, 31, 30, 31];
                H8 = this.layout.periodicity;
                T4 = this.layout.interval;
                R_ = Z0.xAxis.idealTickSizePixels ? Z0.xAxis.idealTickSizePixels : Z0.xAxis.autoComputedTickSizePixels;
                Y5 = this.chart.width / R_;
                for (var O4 = 0; O4 < Z0.dataSegment.length; O4++) {
                    if (Z0.dataSegment[O4])
                        break;
                }
                Z7n = 2082406616;
                I2H = 1345593176;
                z$v =  + "2";
                for (var Z3m = 1; N1O.Y4l(Z3m.toString(), Z3m.toString().length, 15539) !== Z7n; Z3m++) {
                    if (O4 !== Z0.dataSegment.length) {
                        return [];
                    }
                    X1 = 2;
                    z$v += 2;
                }
                if (N1O.n$d(z$v.toString(), z$v.toString().length, 43582) !== I2H) {
                    if (O4 == Z0.dataSegment.length) {
                        return [];
                    }
                    X1 = 0;
                }
                if (T4 === parseInt(T4, 10)) {
                    N1O.B_x(23);
                    var C8r = N1O.f21(14, 15, 960000, 8, 899963);
                    X1 = T4 * H8 * C8r * Z0.dataSegment.length;
                } else {
                    X1 = Z0.dataSegment[Z0.dataSegment.length - ("1" >> 32)].DT.getTime() - Z0.dataSegment[O4].DT.getTime(); ;
                }
                I4 = this;
                if (X1 === 0) {
                    X1 = M2() * Z0.maxTicks; ;
                } else {
                    X1 = X1 / Z0.dataSegment.length * Z0.maxTicks; ;
                }
                N1O.B_x(24);
                f5 = N1O.U9a(Y5, X1);
                for (C1 = 0; C1 < this.timePossibilities.length; C1++) {
                    if (this.timePossibilities[C1] > f5)
                        break;
                }
                if (C1 === 0) {
                    console.log("createTickXAxisWithDates: Assertion error. msPerTick < 1");
                }
                if (C1 == this.timePossibilities.length) {
                    C1--;
                } else if (C1 > 0) {
                    N1O.B_x(7);
                    Z9 = this.timePossibilities[N1O.U9a(1, C1)];
                    k0 = this.timeIntervalMap[Z9];
                    N1O.p86(2);
                    var z$j = N1O.U9a(1, 0);
                    c6 = k0.arr[k0.arr.length - z$j];
                    if (f5 - Z9 * c6 < this.timePossibilities[C1] - f5) {
                        C1--;
                    }
                }
                H2 = this.timePossibilities[C1];
                if (Z0.xAxis.timeUnit) {
                    H2 = Z0.xAxis.timeUnit;
                }
                Z0.xAxis.activeTimeUnit = H2;
                Y4 = R.clone(this.timeIntervalMap[H2]);
                for (C1 = 0; C1 < Y4.arr.length; C1++) {
                    if (Y4.arr[C1] * H2 > f5)
                        break;
                }
                if (C1 == Y4.arr.length) {
                    C1--;
                } else {
                    if (f5 - Y4.arr[C1 - 1] * H2 < Y4.arr[C1] * H2 - f5) {
                        C1--;
                    }
                }
                s0 = Y4.arr[C1];
                if (Z0.xAxis.timeUnitMultiplier) {
                    s0 = Z0.xAxis.timeUnitMultiplier;
                }
                j9 = [];
                for (C1 = 0; C1 <= Z0.maxTicks; C1++) {
                    if (Z0.dataSegment[C1])
                        break;
                }
                if (C1 > "0" >> 32 && C1 < Z0.maxTicks) {
                    o2 = this.standardMarketIterator(Z0.dataSegment[C1].DT, Z0.xAxis.adjustTimeZone ? this.displayZone : this.dataZone);
                    for (var A2 = C1; A2 > 0; A2--) {
                        j0 = o2.previous();
                        Z0.xaxis.unshift({
                            DT: j0,
                            Date: R.yyyymmddhhmmssmmm(j0)
                        });
                    }
                }
                function M2() {
                    N1O.N7F();
                    var Z7,
                    V3,
                    v9,
                    T6;
                    Z7 = {
                        'begin': new Date(),
                        'interval': "day",
                        'periodicity': 1,
                        'inZone': this.dataZone,
                        'outZone': this.dataZone
                    };
                    V3 = Z0.market.newIterator(Z7);
                    V3.next();
                    v9 = V3.previous();
                    V3 = I4.standardMarketIterator(v9, null, Z0);
                    T6 = V3.next();
                    return T6.getTime() - v9.getTime();
                }
                Z2 = 0;
                G2 = Y4.minTimeUnit;
                p1 = -1;
                s1 = !0;
                E5 = this.layout.candleWidth;
                I0 = this.standardMarketIterator(Z0.dataSegment[Z0.dataSegment.length - 1].DT, Z0.xAxis.adjustTimeZone ? this.displayZone : this.dataZone);
                for (C1; C1 < Z0.maxTicks; C1++) {
                    if (C1 < Z0.dataSegment.length) {
                        l1 = Z0.dataSegment[C1];
                        if (l1.displayDate && Z0.xAxis.adjustTimeZone) {
                            Z2 = l1.displayDate;
                        } else {
                            Z2 = l1.DT;
                        }
                        if (C1 && l1.leftOffset) {
                            E5 = (l1.leftOffset - l1.candleWidth /  + "2") / C1;
                        }
                    } else {
                        if (!Z0.xAxis.futureTicks)
                            break;
                        Z2 = I0.next();
                    }
                    E2 = {
                        DT: Z2,
                        Date: R.yyyymmddhhmmssmmm(Z2)
                    };
                    if (C1 < Z0.dataSegment.length) {
                        E2.data = Z0.dataSegment[C1];
                    } else {
                        E2.data = null;
                    }
                    Z0.xaxis.push(E2);
                    if (H2 == R.MILLISECOND) {
                        w6 = Z2.getMilliseconds();
                        L1 = Z2.getSeconds();
                    } else if (H2 == R.SECOND) {
                        w6 = Z2.getSeconds();
                        L1 = Z2.getMinutes();
                    } else if (H2 == R.MINUTE) {
                        w6 = Z2.getMinutes();
                        L1 = Z2.getHours();
                    } else if (H2 == R.HOUR) {
                        N1O.B_x(7);
                        var m0N = N1O.f21(20, 80);
                        w6 = Z2.getHours() + Z2.getMinutes() / m0N;
                        L1 = Z2.getDate();
                    } else if (H2 == R.DAY) {
                        w6 = Z2.getDate();
                        L1 = Z2.getMonth() +  + "1";
                    } else if (H2 == R.MONTH) {
                        w6 = Z2.getMonth() + ("1" ^ 0);
                        L1 = Z2.getFullYear();
                    } else if (H2 == R.YEAR) {
                        w6 = Z2.getFullYear();
                        N1O.B_x(7);
                        var R_Y = N1O.U9a(1000, 2000);
                        L1 = Z2.getFullYear() + R_Y;
                    } else {
                        w6 = Z2.getFullYear();
                        L1 = 0;
                    }
                    k9 = null;
                    if (p1 != L1) {
                        if (w6 <= G2) {
                            G2 = Y4.minTimeUnit;
                        }
                        N1O.p86(7);
                        var E54 = N1O.f21(10, 11);
                        Q_ = Z0.left + C1 * E5 - E54;
                        k9 = null;
                        if (H2 == R.HOUR || H2 == R.MINUTE && p1 > L1) {
                            if (Z0.xAxis.formatter) {
                                k9 = Z0.xAxis.formatter(Z2, "boundary", R.DAY,  + "1");
                            } else {
                                if (this.internationalizer) {
                                    k9 = this.internationalizer.monthDay.format(Z2);
                                } else {
                                    N1O.p86(25);
                                    var C51 = N1O.f21(12, 8, 2, 13, 0);
                                    k9 = Z2.getMonth() + C51 + "/" + Z2.getDate();
                                }
                            }
                        } else if (H2 == R.DAY) {
                            if (p1 > L1) {
                                k9 = Z2.getFullYear();
                            } else {
                                k9 = R.monthAsDisplay(Z2.getMonth(), !!0, this);
                            }
                        } else if (H2 == R.MONTH) {
                            k9 = Z2.getFullYear();
                        }
                        if (k9 && p1 != -1) {
                            j9.push(new S.XAxisLabel(Q_, "boundary", k9));
                        }
                    }
                    if (w6 >= G2) {
                        if (G2 == Y4.minTimeUnit) {
                            if (L1 == p1)
                                continue; ;
                        }
                        F9 = new Date(Z2);
                        N1O.p86(26);
                        var y_Q = N1O.U9a(3, 10, 5);
                        N1O.B_x(7);
                        var k8J = N1O.U9a(20, 22);
                        N1O.B_x(8);
                        var W8r = N1O.f21(0, 11, 12);
                        Q_ = Z0.left + ( + "2" * C1 + y_Q) * E5 / k8J - W8r;
                        p0 = Math.floor(w6 / s0) * s0;
                        if (p0 < w6) {
                            if (this.layout.interval == "week") {
                                p0 = w6;
                            } else {
                                N1O.p86(27);
                                Q_ -= N1O.U9a(E5, "4");
                            };
                        }
                        if (H2 == R.MILLISECOND) {
                            F9.setMilliseconds(p0);
                        } else if (H2 == R.SECOND) {
                            F9.setMilliseconds(0);
                            F9.setSeconds(p0);
                        } else if (H2 == R.MINUTE) {
                            N1O.p86(1);
                            F9.setMilliseconds(N1O.f21(0, "0"));
                            F9.setSeconds(0);
                            F9.setMinutes(p0);
                        } else if (H2 == R.HOUR) {
                            F9.setMilliseconds(0);
                            F9.setSeconds( + "0");
                            F9.setMinutes(0);
                            F9.setHours(p0);
                        } else if (H2 == R.DAY) {
                            F9.setDate(Math.max( + "1", p0)); ;
                        } else if (H2 == R.MONTH) {
                            F9.setDate(1);
                            N1O.B_x(7);
                            F9.setMonth(N1O.f21(1, p0));
                        } else if (H2 == R.YEAR) {
                            N1O.B_x(16);
                            F9.setDate(N1O.U9a("1", 64));
                            F9.setMonth(0); ;
                        } else {
                            N1O.p86(1);
                            F9.setDate(N1O.U9a(1, "1"));
                            F9.setMonth(0); ;
                        }
                        N1O.B_x(2);
                        G2 = N1O.f21(s0, p0);
                        if (H2 == R.DAY) {
                            N1O.B_x(28);
                            var r6x = N1O.U9a(19, 19, 0);
                            Y4.maxTimeUnit = H9[F9.getMonth()] + r6x;
                        }
                        if (G2 >= Y4.maxTimeUnit) {
                            G2 = Y4.minTimeUnit;
                        }
                        p1 = L1;
                        if (s1 && p0 < w6)
                            continue;
                        if (Z0.xAxis.formatter) {
                            k9 = Z0.xAxis.formatter(F9, "line", H2, s0);
                        } else {
                            if (H2 == R.DAY) {
                                k9 = F9.getDate(); ;
                            } else if (H2 == R.MONTH) {
                                k9 = R.monthAsDisplay(Z2.getMonth(), !1, this);
                            } else if (H2 == R.YEAR || H2 == R.DECADE) {
                                k9 = F9.getFullYear();
                            } else {
                                k9 = R.timeAsDisplay(F9, this, H2);
                            }
                        }
                        j9.push(new S.XAxisLabel(Q_, "line", k9));
                    }
                    s1 = !!"";
                }
                return j9;
            };
            N =  + "0";
            X = 0;
            S.prototype.createYAxis = function (K7, o4) {
                var h2,
                X9,
                v5,
                P7,
                l8,
                y4,
                v_,
                N5,
                h_,
                l7,
                q8,
                H0,
                N$,
                q$,
                r8,
                K51,
                k5b,
                s$Y,
                u6r,
                n9,
                u0,
                A8,
                h5,
                v2;
                if (this.runPrepend("createYAxis", arguments)) {
                    return;
                }
                h2 = K7.chart;
                X9 = K7.name == h2.name;
                if (!o4) {
                    o4 = {};
                }
                o4.noChange = !1;
                v5 = o4.yAxis ? o4.yAxis : K7.yAxis;
                if (S.enableCaching && v5.high == K7.cacheHigh && v5.low == K7.cacheLow) {
                    P7 = h2.dataSet.length - h2.scroll;
                    l8 = P7 + h2.maxTicks;
                    K7.cacheLeft = Math.min(K7.cacheLeft, P7);
                    K7.cacheRight = Math.max(K7.cacheRight, l8);
                    K7.cacheLeft = P7;
                    K7.cacheRight = l8;
                    o4.noChange = !![];
                    N++;
                } else {
                    K7.cacheLeft = 1000000;
                    K7.cacheRight = -1;
                    K7.cacheHigh = v5.high;
                    K7.cacheLow = v5.low;
                    X++;
                }
                y4 = h2.xAxis.idealTickSizePixels ? h2.xAxis.idealTickSizePixels : h2.xAxis.autoComputedTickSizePixels;
                if (v5.goldenRatioYAxis) {
                    if (v5.idealTickSizePixels != y4 / 1.618) {
                        o4.noChange = ![];
                    }
                }
                if (!o4.noChange) {
                    this.adjustYAxisHeightOffset(K7, v5);
                    v_ = v5.height = v5.bottom - v5.top;
                    N5 = (v5.high - v5.low) / (v_ - v5.zoom);
                    if (o4.ground && !v5.semiLog) {
                        v5.high = v5.high + v5.zoom * N5;
                    } else {
                        N1O.p86(29);
                        var K9S = N1O.U9a(14, 90, 11, 6, 1);
                        v5.high = v5.high + v5.zoom / K9S * N5 + v5.scroll * N5;
                        h_ = v5.low;
                        N1O.B_x(30);
                        var O7S = N1O.f21(17, 19);
                        v5.low = v5.low - v5.zoom / O7S * N5 + v5.scroll * N5;
                        if (v5.semiLog && v5.low <= 0) {
                            v5.low = h_;
                        }
                    }
                    if (v5.min || v5.min === 0) {
                        v5.low = v5.min;
                    }
                    if (v5.max || v5.max === 0) {
                        v5.high = v5.max;
                    }
                    v5.shadow = v5.high - v5.low;
                    if (v5.semiLog && (!this.activeDrawing || this.activeDrawing.name != "projection")) {
                        v5.logHigh = Math.log(v5.high) / Math.LN10;
                        l7 = Math.max(v5.low, 0.000000001);
                        v5.logLow = Math.log(l7) / Math.LN10;
                        if (v5.low <= 0) {
                            v5.logLow =  + "0";
                        }
                        v5.logShadow = v5.logHigh - v5.logLow;
                    }
                    if (v5.goldenRatioYAxis && X9) {
                        N1O.B_x(24);
                        v5.idealTickSizePixels = N1O.U9a(1.618, y4);
                        if (v5.idealTickSizePixels === "0" >> 64) {
                            q8 = this.getCanvasFontSize("stx_yaxis");
                            N1O.B_x(31);
                            v5.idealTickSizePixels = N1O.U9a("5", q8);
                        }
                    } else {
                        if (!v5.idealTickSizePixels) {
                            q8 = this.getCanvasFontSize("stx_yaxis");
                            if (X9) {
                                N1O.p86(0);
                                v5.idealTickSizePixels = N1O.U9a(5, q8);
                            } else {
                                N1O.p86(0);
                                v5.idealTickSizePixels = N1O.f21(2, q8);
                            }
                        }
                    }
                    H0 = Math.round(v_ / v5.idealTickSizePixels);
                    N$ = o4.range ? o4.range[ + "1"] - o4.range[0] : v5.shadow;
                    N1O.B_x(24);
                    v5.priceTick = Math.floor(N1O.U9a(H0, N$));
                    q$ = 1;
                    for (var t8 = 0; t8 < 10; t8++) {
                        if (v5.priceTick > 0)
                            break;
                        q$ *= 10;
                        v5.priceTick = Math.floor(N$ / H0 * q$) / q$;
                    }
                    if (t8 == 10) {
                        N1O.B_x(7);
                        v5.priceTick = N1O.f21(0, "0.00000001");
                    }
                    v5.priceTick = Math.round(N$ / H0 * q$) / q$;
                    r8 = Math.round(N$ / v5.priceTick);
                    if (o4.range && r8 < N$ && !v5.noEvenDivisorTicks) {
                        while (r8 >= 1) {
                            if (N$ % r8 === 0)
                                break;
                            r8--;
                        }
                        K51 = -1099495518;
                        k5b = 1494288281;
                        s$Y = 2;
                        for (var X5N = 1; N1O.n$d(X5N.toString(), X5N.toString().length, 46469) !== K51; X5N++) {
                            N1O.B_x(24);
                            v5.priceTick = N1O.f21(r8, N$);
                            s$Y += 2;
                        }
                        if (N1O.n$d(s$Y.toString(), s$Y.toString().length, 79802) !== k5b) {
                            N1O.B_x(7);
                            v5.priceTick = N1O.U9a(r8, N$);
                        }
                    }
                    if (v5.minimumPriceTick) {
                        u6r = "stx";
                        u6r += "_";
                        u6r += "yaxis";
                        n9 = v5.minimumPriceTick;
                        q8 = this.getCanvasFontSize(u6r);
                        for (var Y6 = "0" ^ 0; Y6 < 100; Y6++) {
                            N1O.p86(24);
                            u0 = N1O.f21(n9, N$);
                            if (v_ / u0 < q8 * 2) {
                                n9 += v5.minimumPriceTick;
                            } else
                                break;
                        }
                        if (Y6 <  + "100") {
                            v5.priceTick = n9;
                        }
                    }
                    v5.multiplier = v5.height / v5.shadow;
                }
                if (!this.activeDrawing || this.activeDrawing.name != "projection") {
                    v5.high = this.valueFromPixel(K7.top, K7, v5);
                    if (v5.semiLog) {
                        v5.logHigh = Math.log(v5.high) / Math.LN10;
                        A8 = Math.max(v5.low, 0.00000000001);
                        v5.logLow = Math.log(A8) / Math.LN10;
                        v5.logShadow = v5.logHigh - v5.logLow;
                    }
                    v5.shadow = v5.high - v5.low;
                }
                v5.multiplier = v5.height / v5.shadow;
                if (v5.multiplier == Infinity) {
                    v5.multiplier = 0;
                }
                if (!v5.decimalPlaces && v5.decimalPlaces !== 0) {
                    if (X9) {
                        h5 = 0;
                        for (var C4 =  + "0"; C4 < K7.yAxis.shadowBreaks.length; C4++) {
                            v2 = K7.yAxis.shadowBreaks[C4];
                            if (K7.yAxis.shadow < v2[0]) {
                                h5 = v2[1];
                            }
                        }
                        v5.printDecimalPlaces = h5; ;
                    } else {
                        v5.printDecimalPlaces = null;
                    };
                } else {
                    v5.printDecimalPlaces = v5.decimalPlaces;
                }
                this.runAppend("createYAxis", arguments);
            };
            S.prototype.adjustYAxisHeightOffset = function (x3, F$) {
                F$.bottomOffset =  + "0";
                if (!this.xaxisHeight) {
                    N1O.p86(32);
                    var z6G = N1O.U9a(10, 7, 5, 1, 7);
                    this.xaxisHeight = this.getCanvasFontSize("stx_xaxis") + z6G;
                    if (this.chart.xAxis.displayBorder || this.axisBorders) {
                        this.xaxisHeight += 3;
                    }
                }
                if (this.xAxisAsFooter === !![] && x3.bottom > this.chart.canvasHeight - this.xaxisHeight) {
                    F$.bottomOffset = this.xaxisHeight;
                } else if (this.xAxisAsFooter !== !![] && x3.name == "chart") {
                    F$.bottomOffset = this.xaxisHeight;
                }
                F$.bottom = x3.bottom - F$.bottomOffset;
            };
            S.prototype.drawYAxis = function (m8, C0) {
                var g3P,
                O$,
                k9J,
                R9v,
                t8E,
                K1K,
                y6,
                i7,
                z7,
                G6,
                r0,
                G_,
                b3L,
                p6g,
                P4z,
                O0,
                C9,
                b$,
                Z8,
                w3,
                p4,
                S7,
                b1,
                f0,
                o9,
                K8,
                n4,
                k3,
                C_,
                f5j,
                g6,
                I5,
                Q2c,
                o0y,
                s0a,
                b3;
                g3P = "dr";
                g3P += "a";
                g3P += "wYA";
                g3P += "xis";
                if (!C0) {
                    C0 = {};
                }
                O$ = C0.yAxis ? C0.yAxis : m8.yAxis;
                N1O.A7M();
                if (O$.fractional) {
                    if (!O$.originalPriceFormatter) {
                        O$.originalPriceFormatter = {
                            func: O$.priceFormatter
                        };
                    }
                    if (!O$.fractional.resolution) {
                        O$.fractional.resolution = O$.minimumPrice;
                    }
                    if (!O$.fractional.formatter) {
                        O$.fractional.formatter = "'";
                    }
                    if (!O$.priceFormatter) {
                        O$.priceFormatter = function (E0, m_, C6) {
                            var B8,
                            x8,
                            X$;
                            B8 = Math.floor(Math.round(C6 / O$.fractional.resolution) * O$.fractional.resolution);
                            x8 = Math.round((C6 - B8) / O$.fractional.resolution);
                            X$ = Math.floor(x8);
                            N1O.B_x(8);
                            N1O.A7M();
                            var E4C = N1O.f21(100, 95, 5);
                            return B8 + O$.fractional.formatter + (X$ < E4C ? "0" : "") + X$ + (x8 - X$ >= 0.5 ? "+" : "");
                        };
                    }
                } else {
                    if (O$.originalPriceFormatter) {
                        O$.priceFormatter = O$.originalPriceFormatter.func;
                        O$.originalPriceFormatter = null;
                    }
                }
                if (O$.pretty) {
                    return this.drawYAxisPretty(m8, C0);
                }
                if (this.runPrepend(g3P, arguments)) {
                    return;
                }
                if (!C0.noDraw && !O$.noDraw) {
                    if (!O$.yAxisPlotter || !C0.noChange) {
                        k9J = "stx";
                        k9J += "_";
                        k9J += "yaxis";
                        R9v = "l";
                        R9v += "e";
                        R9v += "f";
                        R9v += "t";
                        t8E = "s";
                        t8E += "t";
                        t8E += "rok";
                        t8E += "e";
                        K1K = "stx_yaxi";
                        K1K += "s";
                        y6 = m8.chart;
                        i7 = m8.name == y6.name && O$ === m8.yAxis;
                        if (!O$.priceTick) {
                            return;
                        }
                        z7 = O$.shadow;
                        if (C0.range) {
                            z7 = C0.range[ + "1"] - C0.range[0];
                        }
                        G6 = z7 / O$.priceTick;
                        G6 = Math.round(G6);
                        if (O$.semiLog) {
                            b3L = 67295786;
                            p6g = 192165461;
                            P4z =  + "2";
                            for (var O8g = 1; N1O.n$d(O8g.toString(), O8g.toString().length, 9712) !== b3L; O8g++) {
                                r0 = Math.log(this.valueFromPixel(O$.bottom, m8)) / Math.LN10;
                                P4z +=  + "2";
                            }
                            if (N1O.Y4l(P4z.toString(), P4z.toString().length, 34830) !== p6g) {
                                r0 = Math.log(this.valueFromPixel(O$.bottom, m8)) + Math.LN10;
                            }
                            G_ = (O$.logHigh - O$.logLow) / G6;
                        }
                        O0 = O$.textStyle ? O$.textStyle : K1K;
                        O$.yAxisPlotter = new R.Plotter();
                        O$.yAxisPlotter.newSeries("grid", "stroke", this.canvasStyle("stx_grid"));
                        O$.yAxisPlotter.newSeries("text", "fill", this.colorOrStyle(O0));
                        O$.yAxisPlotter.newSeries("border", t8E, this.canvasStyle("stx_grid_border"));
                        C9 = 0;
                        b$ = C0.range ? C0.range[1] : O$.high;
                        Z8 = C0.range ? C0.range[0] : O$.low;
                        w3 = O$.displayBorder === null ? y6.panel.yAxis.displayBorder : O$.displayBorder;
                        if (this.axisBorders === !({})) {
                            w3 = !"1";
                        }
                        if (this.axisBorders === !!"1") {
                            w3 = !!1;
                        }
                        S7 = O$.position === null ? y6.panel.yAxis.position : O$.position;
                        if (S7 == R9v) {
                            p4 = O$.left + O$.width;
                        } else {
                            p4 = O$.left;
                        }
                        b1 = Math.round(p4) + ("0.5" - 0);
                        f0 = w3 ? "3" << 96 : 0;
                        if (S7 == "left") {
                            f0 = w3 ? -3 : 0;
                        }
                        if (i7) {
                            if (O$.shadow < 1) {
                                N1O.p86(22);
                                var G6i = N1O.U9a(108, 130, 12);
                                N1O.p86(26);
                                var l01 = N1O.f21(3, 8, 4);
                                C9 = (parseInt(Z8 / O$.priceTick, G6i) + l01) * O$.priceTick - Z8;
                            } else {
                                C9 = O$.priceTick - Math.round(Z8 % O$.priceTick * m8.chart.roundit) / m8.chart.roundit;
                            }
                        } else {
                            C9 = b$ % O$.priceTick;
                        }
                        o9 = this.getCanvasFontSize(k9J);
                        for (var Q8 = "0" ^ 0; Q8 < G6; Q8++) {
                            if (O$.semiLog) {
                                N1O.B_x(33);
                                n4 = N1O.f21(G_, r0, Q8);
                                K8 = Math.pow(10, n4);
                            } else {
                                if (i7) {
                                    K8 = Z8 + Q8 * O$.priceTick + C9;
                                } else {
                                    K8 = b$ - Q8 * O$.priceTick - C9;
                                }
                            }
                            k3 = this.pixelFromPrice(K8, m8, O$);
                            C_ = Math.round(k3) + 0.5;
                            if (C_ + o9 / 2 > m8.bottom)
                                continue;
                            if (C_ - o9 /  + "2" < m8.top)
                                continue;
                            if (O$.displayGridLines) {
                                f5j = "g";
                                f5j += "r";
                                f5j += "i";
                                f5j += "d";
                                O$.yAxisPlotter.moveTo("grid", m8.left, C_);
                                O$.yAxisPlotter.lineTo(f5j, m8.right, C_);
                            }
                            if (w3) {
                                N1O.p86(34);
                                O$.yAxisPlotter.moveTo("border", N1O.f21(b1, "0.5"), C_);
                                N1O.p86(2);
                                O$.yAxisPlotter.lineTo("border", N1O.U9a(f0, b1), C_);
                            }
                            if (O$.priceFormatter) {
                                K8 = O$.priceFormatter(this, m8, K8);
                            } else {
                                K8 = this.formatYAxisPrice(K8, m8, null, O$);
                            }
                            g6 = O$.textBackground ? this.containerColor : null;
                            N1O.B_x(35);
                            I5 = N1O.U9a(3, p4, f0);
                            if (S7 == "left") {
                                N1O.B_x(36);
                                var j5B = N1O.U9a(1, 3, 5);
                                I5 = O$.left + j5B;
                                if (O$.justifyRight) {
                                    N1O.B_x(36);
                                    var e5n = N1O.f21(0, 9, 12);
                                    I5 = O$.left + O$.width + f0 - e5n;
                                }
                            } else {
                                if (O$.justifyRight) {
                                    I5 = p4 + O$.width;
                                }
                            }
                            O$.yAxisPlotter.addText("text", K8, I5, C_, g6, null, o9);
                        }
                        if (w3) {
                            Q2c = "bo";
                            Q2c += "r";
                            Q2c += "de";
                            Q2c += "r";
                            o0y = "b";
                            o0y += "o";
                            o0y += "rde";
                            o0y += "r";
                            s0a = "bor";
                            s0a += "der";
                            b3 = Math.round(O$.bottom) + 0.5;
                            O$.yAxisPlotter.moveTo(s0a, b1, O$.top);
                            O$.yAxisPlotter.lineTo(o0y, b1, b3);
                            O$.yAxisPlotter.draw(this.chart.context, Q2c);
                        }
                    }
                    this.plotYAxisGrid(m8);
                }
                this.runAppend("drawYAxis", arguments);
            };
            S.prototype.drawYAxisPretty = function (J8, J9) {
                var z4,
                G8f,
                Y88,
                z8Z,
                c1H,
                g4,
                f_,
                s7,
                b8,
                P5,
                i2,
                T9,
                e3,
                L3,
                q3,
                G3,
                m5,
                a5,
                k4,
                d8,
                n6,
                d5,
                A1,
                i3,
                A5,
                d_,
                O_,
                j1,
                U_,
                S6,
                q9,
                J6,
                j2,
                y6b,
                K$,
                i1,
                u6,
                l73,
                A$,
                W7,
                J_K,
                H7i,
                O1p,
                C7;
                if (this.runPrepend("drawYAxis", arguments)) {
                    return;
                }
                if (!J9) {
                    J9 = {};
                }
                N1O.A7M();
                z4 = J9.yAxis ? J9.yAxis : J8.yAxis;
                if (!J9.noDraw && !z4.noDraw) {
                    if (!z4.yAxisPlotter || !J9.noChange) {
                        G8f = "stx_y";
                        G8f += "axis";
                        Y88 = "l";
                        Y88 += "e";
                        Y88 += "f";
                        Y88 += "t";
                        z8Z = "stx";
                        z8Z += "_grid_b";
                        z8Z += "orde";
                        z8Z += "r";
                        c1H = "te";
                        c1H += "x";
                        c1H += "t";
                        g4 = J8.chart;
                        f_ = J8.name == g4.name && z4 === J8.yAxis;
                        if (!z4.priceTick) {
                            return;
                        }
                        if (isNaN(z4.high) || isNaN(z4.low)) {
                            return;
                        }
                        s7 = z4.shadow;
                        if (J9.range) {
                            N1O.B_x(28);
                            var d_X = N1O.U9a(1, 19, 18);
                            s7 = J9.range[d_X] - J9.range[0];
                        }
                        b8 = z4.height / z4.idealTickSizePixels;
                        b8 = Math.round(b8);
                        P5 = z4.textStyle ? z4.textStyle : "stx_yaxis";
                        z4.yAxisPlotter = new R.Plotter();
                        z4.yAxisPlotter.newSeries("grid", "stroke", this.canvasStyle("stx_grid"));
                        z4.yAxisPlotter.newSeries(c1H, "fill", this.colorOrStyle(P5));
                        z4.yAxisPlotter.newSeries("border", "stroke", this.canvasStyle(z8Z));
                        i2 = 0;
                        T9 = J9.range ? J9.range["1" ^ 0] : z4.high;
                        e3 = J9.range ? J9.range["0" * 1] : z4.low;
                        L3 = z4.displayBorder === null ? g4.panel.yAxis.displayBorder : z4.displayBorder;
                        if (this.axisBorders === !({})) {
                            L3 = !!"";
                        }
                        if (this.axisBorders === !0) {
                            L3 = !![];
                        }
                        G3 = z4.position === null ? g4.panel.yAxis.position : z4.position;
                        if (G3 == "left") {
                            q3 = z4.left + z4.width;
                        } else {
                            q3 = z4.left;
                        }
                        m5 = Math.round(q3) + ("0.5" - 0);
                        a5 = L3 ? 3 :  + "0";
                        if (G3 == Y88) {
                            a5 = L3 ? -3 : 0;
                        }
                        k4 = this.getCanvasFontSize(G8f);
                        d8 = z4.increments;
                        n6 = d8.length;
                        d5 =  + "0";
                        A1 = 1;
                        i3 =  + "0";
                        A5 = 0;
                        d_ = 0;
                        O_ = Number.MAX_VALUE;
                        for (var E1 = 0; E1 <  + "100"; E1++) {
                            N1O.p86(37);
                            var Y_5 = N1O.U9a(14, 1, 3, 24, 3);
                            i3 = d8[d5] * Math.pow(Y_5, d_);
                            N1O.B_x(24);
                            A1 = Math.floor(N1O.f21(i3, s7));
                            N1O.p86(7);
                            j1 = Math.abs(N1O.f21(A1, b8));
                            if (j1 > O_) {
                                break;
                            } else {
                                O_ = j1;
                            }
                            if (A1 == b8) {
                                A5 = i3;
                                break;
                            } else if (A1 > b8) {
                                d5++;
                                if (d5 >= n6) {
                                    N1O.p86(1);
                                    d5 = N1O.U9a(0, "0");
                                    d_++;
                                }
                            } else {
                                d5--;
                                if (d5 < 0) {
                                    N1O.p86(7);
                                    d5 = N1O.f21(1, n6);
                                    d_--;
                                }
                            }
                            A5 = i3;
                        }
                        U_ = Math.ceil(e3 / A5) * A5;
                        S6 = z4.bottom - this.pixelFromPrice(U_, J8, z4);
                        q9 = 0;
                        if (S6 > z4.idealTickSizePixels && z4.semiLog && z4.prettySemiLog) {
                            for (J6 = Math.ceil(e3); J6 < U_ && U_ % J6 !== 0; ++J6) { ;
                            }
                            if (J6 < U_) {
                                if (U_ === A5) {
                                    A5 = J6;
                                    q9 = J6;
                                }
                                U_ = J6;
                            }
                        }
                        j2 = 0;
                        for (var D0 = "0" - 0; D0 < 100; D0++) {
                            y6b = "te";
                            y6b += "x";
                            y6b += "t";
                            N1O.B_x(33);
                            K$ = N1O.U9a(A5, U_, j2);
                            if (K$ > T9)
                                break;
                            A5 += q9;
                            j2++;
                            i1 = this.pixelFromPrice(K$, J8, z4);
                            u6 = Math.round(i1) + 0.5;
                            if (u6 + k4 / 2 > J8.bottom)
                                continue;
                            if (u6 - k4 / 2 < J8.top)
                                continue;
                            if (z4.displayGridLines) {
                                l73 = "g";
                                l73 += "r";
                                l73 += "i";
                                l73 += "d";
                                z4.yAxisPlotter.moveTo(l73, J8.left, u6);
                                z4.yAxisPlotter.lineTo("grid", J8.right, u6);
                            }
                            if (L3) {
                                N1O.p86(34);
                                z4.yAxisPlotter.moveTo("border", N1O.U9a(m5, "0.5"), u6);
                                N1O.p86(2);
                                z4.yAxisPlotter.lineTo("border", N1O.f21(a5, m5), u6);
                            }
                            if (z4.priceFormatter) {
                                K$ = z4.priceFormatter(this, J8, K$);
                            } else {
                                K$ = this.formatYAxisPrice(K$, J8, null, z4);
                            }
                            A$ = z4.textBackground ? this.containerColor : null;
                            N1O.p86(35);
                            W7 = N1O.f21(3, q3, a5);
                            if (G3 == "left") {
                                N1O.B_x(2);
                                var k6X = N1O.U9a(3, 0);
                                W7 = z4.left + k6X;
                                if (z4.justifyRight) {
                                    N1O.p86(30);
                                    var Y9e = N1O.f21(8, 11);
                                    W7 = z4.left + z4.width + a5 - Y9e;
                                }
                            } else {
                                if (z4.justifyRight) {
                                    W7 = q3 + z4.width;
                                }
                            }
                            z4.yAxisPlotter.addText(y6b, K$, W7, u6, A$, null, k4);
                        }
                        if (D0 >= 100) {
                            console.log("drawYAxisPretty: assertion error. zz reached 100");
                        }
                        if (L3) {
                            J_K = "b";
                            J_K += "o";
                            J_K += "rder";
                            H7i = "bor";
                            H7i += "der";
                            O1p = "bo";
                            O1p += "rder";
                            C7 = Math.round(z4.bottom) + 0.5;
                            z4.yAxisPlotter.moveTo(O1p, m5, z4.top);
                            z4.yAxisPlotter.lineTo(H7i, m5, C7);
                            z4.yAxisPlotter.draw(this.chart.context, J_K);
                        }
                    }
                    this.plotYAxisGrid(J8);
                }
                this.runAppend("drawYAxis", arguments);
            };
            S.prototype.plotYAxisGrid = function (j8) {
                N1O.A7M();
                var N0K,
                d7;
                N0K = "plotYAxi";
                N0K += "sGri";
                N0K += "d";
                if (this.runPrepend(N0K, arguments)) {
                    return;
                }
                d7 = this.chart.context;
                j8.yAxis.yAxisPlotter.draw(d7, "grid");
                this.runAppend("plotYAxisGrid", arguments);
            };
            S.prototype.plotYAxisText = function (x5) {
                var M4v,
                Y_,
                M0,
                X8,
                b_;
                M4v = "plotYAxis";
                M4v += "Text";
                if (this.runPrepend("plotYAxisText", arguments)) {
                    return;
                }
                Y_ = x5.yaxisLHS.concat(x5.yaxisRHS);
                for (var Z$ = 0; Z$ < Y_.length; Z$++) {
                    M0 = Y_[Z$];
                    if (!M0.yAxisPlotter)
                        continue;
                    if (M0.noDraw)
                        continue;
                    this.canvasFont("stx_yaxis");
                    this.canvasColor("stx_yaxis");
                    X8 = this.chart.context;
                    X8.textBaseline = "middle";
                    if (M0.justifyRight) {
                        X8.textAlign = "right";
                    } else {
                        X8.textAlign = "left";
                    }
                    b_ = this.getCanvasFontSize("stx_yaxis");
                    M0.yAxisPlotter.draw(X8, "text");
                    X8.textBaseline = "alphabetic";
                    X8.textAlign = "left";
                }
                this.runAppend(M4v, arguments);
            };
            S.prototype.formatYAxisPrice = function (s6, u8, A4, k8) {
                var Q$I,
                S$,
                n8;
                Q$I = "und";
                N1O.A7M();
                Q$I += "ef";
                Q$I += "in";
                Q$I += "ed";
                if (s6 === null || typeof s6 == Q$I || isNaN(s6)) {
                    return "";
                }
                S$ = k8 ? k8 : u8.yAxis;
                n8 = A4;
                if (!n8 && n8 !== 0) {
                    n8 = S$.printDecimalPlaces;
                }
                if (!n8 && n8 !== 0) {
                    if (S$.priceTick < 0.01) {
                        n8 = 4;
                    } else if (S$.priceTick < 0.1) {
                        n8 = 2;
                    } else if (S$.priceTick < 1) {
                        n8 = 1;
                    } else {
                        n8 = 0;
                    }
                }
                if (u8.name != u8.chart.name) {
                    if (S$.priceTick > "100" * 1) {
                        return R.condenseInt(s6);
                    }
                }
                if (this.internationalizer) {
                    if (n8 >= this.internationalizer.priceFormatters.length) {
                        N1O.B_x(38);
                        var r_D = N1O.f21(3, 4, 51, 16);
                        n8 = this.internationalizer.priceFormatters.length - r_D;
                    }
                    s6 = this.internationalizer.priceFormatters[n8].format(s6);
                } else {
                    s6 = s6.toFixed(n8); ;
                }
                return s6;
            };
            S.prototype.padOutPrice = function (Q7) {
                var h5f,
                a_,
                U9;
                h5f = "u";
                N1O.N7F();
                h5f += "ndefi";
                h5f += "ned";
                if (Q7 !== "0" >> 64 && (!Q7 || typeof Q7 == h5f)) {
                    return "";
                }
                N1O.p86(2);
                a_ = N1O.f21(Q7, "");
                N1O.p86(39);
                var O4t = N1O.U9a(3, 161351, 7, 161347, 9490);
                N1O.B_x(2);
                var H9F = N1O.f21(1, 0);
                N1O.B_x(7);
                var P3y = N1O.U9a(4, 9804);
                N1O.B_x(40);
                var m5F = N1O.U9a(1525, 7617, 6, 3);
                N1O.B_x(41);
                var z_j = N1O.U9a(20410, 12, 464, 3, 15);
                N1O.B_x(30);
                var T6j = N1O.f21(3, 4);
                U9 = a_.substring(a_.indexOf(O4t > "326.78" * H9F ? "." : (P3y, m5F) <= z_j ?  + "0x1d3d" : "t")).length - T6j;
                if (Q7 >= 1000) {
                    U9 = Math.max(U9, 0);
                } else if (Q7 < 2) {
                    U9 = Math.max(U9, 4);
                } else {
                    U9 = Math.max(U9, 2);
                }
                if (this.internationalizer) {
                    if (U9 >= this.internationalizer.priceFormatters.length) {
                        N1O.B_x(2);
                        var u53 = N1O.U9a(1, 0);
                        U9 = this.internationalizer.priceFormatters.length - u53;
                    }
                    Q7 = this.internationalizer.priceFormatters[U9].format(Q7);
                } else {
                    Q7 = Q7.toFixed(U9);
                }
                return Q7;
            };
            S.prototype.formatPrice = function (a7, A7) {
                N1O.N7F();
                var m0;
                if (a7 !== 0 && (!a7 || typeof a7 == "undefined")) {
                    return "";
                }
                if (!A7) {
                    A7 = this.currentPanel;
                }
                if (!A7) {
                    A7 = this.chart.panel;
                }
                if (!A7) {
                    return a7;
                }
                m0 = A7.decimalPlaces;
                if (!m0 && m0 !==  + "0") {
                    m0 = A7.chart.decimalPlaces;
                }
                if (!m0 && m0 !== 0) {
                    return a7;
                }
                if (this.internationalizer) {
                    if (m0 >= this.internationalizer.priceFormatters.length) {
                        m0 = this.internationalizer.priceFormatters.length -  + "1";
                    }
                    a7 = this.internationalizer.priceFormatters[m0].format(a7);
                } else {
                    a7 = a7.toFixed(m0);
                }
                return a7;
            };
            S.prototype.createCrosshairs = function () {
                N1O.A7M();
                if (this.runPrepend("createCrosshairs", arguments)) {
                    return;
                }
                if (this.controls.crossX.onmousedown) {
                    return;
                }
                this.controls.crossY.onmousedown = function (p7) {
                    if (!p7) {
                        p7 = event;
                    }
                    if (p7.preventDefault) {
                        p7.preventDefault();
                    }
                    N1O.A7M();
                    return !"1";
                };
                this.controls.crossX.onmousedown = function (F4) {
                    if (!F4) {
                        F4 = event;
                    }
                    N1O.N7F();
                    if (F4.preventDefault) {
                        F4.preventDefault();
                    }
                    return !1;
                };
                this.runAppend("createCrosshairs", arguments);
            };
            S.prototype.determineMinMax = function (A3, c8, I2, K3, j3) {
                var W3,
                K9,
                N1,
                l$,
                H6,
                b4,
                P8,
                m3;
                N1O.B_x(42);
                var y8V = N1O.U9a(3, 8, 12);
                W3 = Number.MAX_VALUE * y8V;
                K9 = Number.MAX_VALUE;
                N1 = !!"";
                l$ = A3.length;
                if (j3) {
                    l$ = j3;
                }
                for (var R4 = 0; R4 < l$; R4++) {
                    H6 = A3[R4];
                    if (!H6)
                        continue;
                    if (!K3) {
                        if (H6.transform) {
                            N1 = !!"1";
                            H6 = H6.transform;
                        } else if (N1)
                            continue; ;
                    }
                    b4 = 0;
                    for (var t$ = 0; t$ < c8.length; t$++) {
                        P8 = H6[c8[t$]];
                        if (!P8)
                            continue;
                        if (typeof P8 == "number") {
                            P8 = [P8];
                        }
                        for (var V5 = 0; V5 < P8.length; V5++) {
                            m3 = P8[V5];
                            if (m3 || m3 === 0) {
                                if (I2) {
                                    b4 += m3;
                                    if (b4 > W3) {
                                        W3 = b4;
                                    }
                                    if (b4 < K9) {
                                        K9 = b4;
                                    }
                                } else {
                                    if (m3 > W3) {
                                        W3 = m3;
                                    }
                                    if (m3 < K9) {
                                        K9 = m3;
                                    }
                                }
                            }
                        }
                    }
                }
                if (W3 == Number.MAX_VALUE * -1) {
                    W3 = 0;
                }
                if (K9 == Number.MAX_VALUE) {
                    K9 = 0;
                }
                return [K9, W3];
            };
            S.prototype.calculateYAxisRange = function (o1, U3, r$, b2) {
                var T_,
                e0,
                G0,
                T1,
                I_,
                w_M,
                P5n,
                j0q,
                U2,
                V2,
                C2;
                if (r$ == Number.MAX_VALUE) {
                    r$ = 0;
                    b2 = 0;
                }
                T_ = o1.height;
                e0 = null;
                G0 = null;
                this.adjustYAxisHeightOffset(o1, U3);
                U3.top = o1.top;
                U3.height = U3.bottom - U3.top;
                T1 = Math.round(Math.abs(T_ / 5));
                if (T_ - Math.abs(U3.scroll) < T1) {
                    N1O.B_x(43);
                    var k6y = N1O.U9a(6, 16, 3, 11, 256);
                    N1O.B_x(40);
                    var p3f = N1O.f21(19, 302, 17, 20);
                    U3.scroll = (T_ - T1) * (U3.scroll < 0 ? k6y : p3f);
                }
                I_ = (b2 - r$) / U3.height;
                if (r$ || r$ ===  + "0") {
                    if (b2 - r$ === 0) {
                        N1O.B_x(0);
                        e0 = N1O.f21(2, b2);
                        w_M = -998041041;
                        P5n = -271832782;
                        j0q = 2;
                        for (var a1o = 1; N1O.Y4l(a1o.toString(), a1o.toString().length, 36824) !== w_M; a1o++) {
                            G0 =  + "1";
                            j0q += 2;
                        }
                        if (N1O.n$d(j0q.toString(), j0q.toString().length, 84576) !== P5n) {
                            G0 = 9;
                        }
                        N1O.B_x(16);
                        G0 = N1O.f21("0", 0);
                    } else {
                        if ((this.layout.semiLog || this.layout.chartScale == "log") && e0) {
                            U2 = Math.log(r$) / Math.LN10;
                            V2 = Math.log(b2) / Math.LN10;
                            e0 = Math.pow(10, V2);
                            G0 = Math.pow(10, U2);
                        } else {
                            e0 = b2;
                            G0 = r$;
                        }
                    }
                    U3.high = e0;
                    U3.low = G0;
                }
                if (U3.max || U3.max === 0) {
                    U3.high = U3.max;
                }
                if (U3.min || U3.min === 0) {
                    U3.low = U3.min;
                }
                U3.shadow = U3.high - U3.low;
                if (o1.chart.name === o1.name && o1.yAxis === U3) {
                    C2 = this.layout.semiLog || this.layout.chartScale == "log";
                    if (o1.chart.isComparison) {
                        C2 = !!"";
                    }
                    if (U3.semiLog != C2) {
                        this.clearPixelCache();
                        U3.semiLog = C2;
                    }
                }
            };
            S.prototype.renderYAxis = function (J4) {
                var L2,
                C3,
                l2,
                z1,
                x_,
                Z4,
                t7;
                if (this.runPrepend("renderYAxis", arguments)) {
                    return;
                }
                L2 = J4.panel;
                C3 = L2.yaxisRHS.concat(L2.yaxisLHS);
                for (l2 = 0; l2 < C3.length; l2++) {
                    z1 = C3[l2];
                    x_ = null;
                    Z4 = null;
                    if (L2.yAxis === z1) {
                        x_ = J4.lowValue;
                        Z4 = J4.highValue;
                    }
                    this.calculateYAxisRange(L2, z1, x_, Z4);
                }
                t7 = {};
                for (l2 = 0; l2 < C3.length; l2++) {
                    t7.yAxis = C3[l2];
                    this.createYAxis(L2, t7);
                    this.drawYAxis(L2, t7);
                }
                this.runAppend("renderYAxis", arguments);
            };
            S.prototype.initializeDisplay = function (b5) {
                var g2,
                c0,
                Q9,
                a$,
                M6,
                W69,
                j4,
                S_,
                y1U,
                R31,
                C2M;
                N1O.A7M();
                if (this.runPrepend("initializeDisplay", arguments)) {
                    return;
                }
                g2 = [];
                for (var L_ in b5.series) {
                    if (b5.series[L_].parameters.shareYAxis) {
                        g2.push(L_);
                    }
                }
                c0 = b5.panel = this.panels[b5.name];
                a$ = null;
                M6 = Math.floor((b5.width - this.micropixels) / this.layout.candleWidth);
                if (b5.scroll > b5.maxTicks && b5.maxTicks > M6 + 1) {
                    N1O.p86(2);
                    var r9m = N1O.U9a(1, 0);
                    a$ = b5.dataSegment.length - r9m;
                }
                if (!S.chartShowsHighs(this.layout.chartType)) {
                    W69 = "baseline";
                    W69 += "_delt";
                    W69 += "a";
                    g2.push("Close");
                    Q9 = this.determineMinMax(b5.dataSegment, g2, null, null, a$);
                    if (this.layout.chartType == W69) {
                        j4 = b5.baseline.actualLevel;
                        if (b5.transformFunc) {
                            j4 = b5.transformFunc(this, b5, j4);
                        }
                        S_ = Math.max(j4 - Q9[0], Q9[1] - j4);
                        if (this.repositioningBaseline) {
                            Q9 = [b5.lowValue, b5.highValue];
                        } else {
                            N1O.p86(7);
                            Q9[0] = N1O.U9a(S_, j4);
                            N1O.B_x(11);
                            Q9[N1O.f21("1", 32)] = N1O.U9a(S_, j4, N1O.p86(2));
                        }
                    }
                } else {
                    g2.push("Close", "High", "Low");
                    y1U = -2120305243;
                    R31 = -173266844;
                    C2M =  + "2";
                    for (var X6w = 1; N1O.Y4l(X6w.toString(), X6w.toString().length, 94445) !== y1U; X6w++) {
                        Q9 = this.determineMinMax(b5.dataSegment, g2, 1, 1, a$);
                        C2M += 2;
                    }
                    if (N1O.Y4l(C2M.toString(), C2M.toString().length, 95487) !== R31) {
                        Q9 = this.determineMinMax(b5.dataSegment, g2, "9" - 0, "0" >> 0, a$);
                    }
                    Q9 = this.determineMinMax(b5.dataSegment, g2, null, null, a$);
                }
                b5.lowValue = Q9[0];
                b5.highValue = Q9[1];
                this.runAppend("initializeDisplay", arguments);
            };
            S.prototype.computePosition = function (L5, E9) {
                var J0;
                if (typeof E9 == "undefined") {
                    E9 = 0;
                }
                J0 = L5 * this.layout.candleWidth + E9 + this.micropixels;
                N1O.N7F();
                return J0;
            };
            S.prototype.computeColor = function (d0, z$) {
                if (d0 < z$) {
                    return "stx_candle_up";
                }
                if (d0 > z$) {
                    return "stx_candle_down";
                }
                return "stx_candle_shadow";
            };
            S.prototype.computeLength = function (z9, U4) {
                var u$,
                p3;
                N1O.N7F();
                u$ = this.pixelFromPrice(z9);
                p3 = this.pixelFromPrice(U4);
                N1O.B_x(7);
                return N1O.f21(u$, p3);
            };
            S.prototype.setSeriesRenderer = function (R7) {
                var V7;
                V7 = R7.params;
                if (this.chart.seriesRenderers[R7.params.name]) {
                    return this.chart.seriesRenderers[R7.params.name];
                }
                if (V7.yAxis) {
                    this.addYAxis(this.panels[V7.panel], V7.yAxis);
                }
                N1O.A7M();
                R7.stx = this;
                this.chart.seriesRenderers[R7.params.name] = R7;
                return R7;
            };
            S.prototype.setMarket = function (I3, P1) {
                if (!P1) {
                    P1 = this.chart;
                }
                P1.market = new R.Market(I3);
                N1O.A7M();
                for (var O6 in this.layout.marketSessions) {
                    P1.market.disableSession(O6, this.layout.marketSessions[O6]);
                }
            };
            S.prototype.setMarketFactory = function (p6) {
                this.marketFactory = p6;
            };
            S.prototype.removeSeriesRenderer = function (n3) {
                var i6,
                b9,
                l5;
                N1O.A7M();
                for (var c$ in this.chart.seriesRenderers) {
                    if (n3.params.name === this.chart.seriesRenderers[c$].params.name) {
                        i6 = this.chart.seriesRenderers[n3.params.name];
                        b9 = i6.params.yAxis;
                        l5 = this.panels[i6.params.panel];
                        delete this.chart.seriesRenderers[n3.params.name];
                        this.deleteYAxisIfUnused(l5, b9);
                        return;
                    }
                }
            };
            S.prototype.getSeriesRenderer = function (r3) {
                return this.chart.seriesRenderers[r3];
            };
            S.prototype.drawHistogram = function (i9, S2) {
                var J70,
                d9,
                w7,
                S1,
                J2,
                G7,
                d4,
                F6,
                F3,
                P2,
                B9,
                w_,
                N3,
                l6,
                m4,
                Y4h,
                H7,
                R6,
                u_,
                G1,
                e5,
                p_,
                G$,
                Y8,
                r4;
                J70 = "c";
                J70 += "har";
                J70 += "t";
                if (!S2 || !S2.length) {
                    return;
                }
                d9 = i9.panel;
                if (!d9) {
                    d9 = J70;
                }
                w7 = this.panels[d9];
                if (!w7) {
                    return;
                }
                S1 = i9.yAxis ? i9.yAxis : w7.yAxis;
                J2 = i9.type;
                if (J2 == "histogram") {
                    J2 = i9.subtype;
                }
                G7 = this.chart.dataSegment;
                d4 = !"1";
                this.getDefaultColor();
                for (F6 = "0" - 0; F6 < S2.length; F6++) {
                    d4 |= S2[F6].border_color_up && !R.isTransparent(S2[F6].border_color_up);
                    d4 |= S2[F6].border_color_down && !R.isTransparent(S2[F6].border_color_down);
                }
                if (!i9.name) {
                    i9.name = "Data";
                }
                function j_(y5, R1, p2, D5, E8, m9, v4) {
                    var R2,
                    S4,
                    c3,
                    X3$,
                    a_u,
                    n2,
                    c_,
                    l_,
                    r_,
                    R0,
                    D2,
                    Z3,
                    C8,
                    U0,
                    P8Q,
                    i15,
                    Q24;
                    if (!p2) {
                        p2 = 1;
                    }
                    if (R.isIE8) {
                        R6.globalAlpha = 0.5;
                    } else {
                        R6.globalAlpha = p2;
                    }
                    R6.beginPath();
                    N1O.A7M();
                    N1O.p86(2);
                    R2 = N1O.U9a(0.5, m4);
                    S4 = Math.floor(p_.pixelFromBar(0, w7.chart) - p_.layout.candleWidth / ("2" * 1));
                    c3 = S4;
                    for (var N7 = "0" << 64; N7 < G7.length; N7++) {
                        X3$ = "clus";
                        X3$ += "ter";
                        X3$ += "ed";
                        a_u = "cl";
                        a_u += "us";
                        a_u += "tered";
                        n2 = e5[N7];
                        if (!n2) {
                            n2 = m4;
                        }
                        if (N7 === 0) {
                            R2 = n2;
                        }
                        c_ = G7[N7];
                        if (!c_ || !c_[y5]) {
                            R2 = n2;
                            c3 += p_.layout.candleWidth;
                            continue;
                        }
                        l_ = (c_[y5] - B9) * F3;
                        if (isNaN(l_))
                            continue;
                        r_ = p_.layout.candleWidth;
                        if (c_.candleWidth) {
                            r_ = c_.candleWidth;
                            if (N7 === 0) {
                                S4 = c3 = Math.floor(p_.pixelFromBar(0, w7.chart) - c_.candleWidth / 2);
                            }
                        }
                        R0 = Math.min(Math.floor(n2 - l_) + 0.5, n2);
                        if (E8) {
                            if (c_.Close < c_.iqPrevClose) {
                                R2 = R0;
                                c3 += r_;
                                continue;
                            }
                        } else {
                            if (c_.Close >= c_.iqPrevClose) {
                                R2 = R0;
                                c3 += r_;
                                continue;
                            }
                        }
                        C8 = r_ / p_.layout.candleWidth;
                        N1O.B_x(44);
                        U0 = N1O.U9a(C8, u_, m9, c3, v4);
                        D2 = Math.round(U0) + (D5 ? 0 : H7);
                        Z3 = Math.round(U0 + v4 * C8) - (D5 ? 0 : H7);
                        if (Z3 - D2 < 2) {
                            N1O.B_x(2);
                            Z3 = N1O.U9a(1, D2);
                        }
                        if (D5) {
                            roundPixel =  + "0";
                        } else {
                            roundPixel = 0.5;
                        }
                        if (D2 % 1 == roundPixel) {
                            D2 += 0.5;
                        }
                        if (Z3 % 1 == roundPixel) {
                            Z3 +=  + "0.5";
                        }
                        R6.moveTo(D2, n2);
                        if (m4 == n2) {
                            R6.lineTo(Z3, n2);
                        } else {
                            R6.moveTo(Z3, n2);
                            if (D5 && !u_) {
                                if (e5[N7 + 1]) {
                                    R6.moveTo(Z3, Math.max(R0, Math.min(n2, e5[N7 + 1])));
                                }
                            }
                        }
                        R6.lineTo(Z3, R0);
                        R6.lineTo(D2, R0);
                        if (D5 && m9) {
                            if (G1[N7] > R0 || N7 === ("0" ^ 0)) {
                                R6.lineTo(D2, Math.min(n2, G1[N7]));
                            };
                        } else if (D5 && !u_ && J2 == a_u) {
                            if (N7 > 0 && G1[N7 -  + "1"] && G1[N7 - 1] > R0) {
                                R6.lineTo(D2, Math.min(n2, G1[N7 -  + "1"]));
                            };
                        } else if (D5 && !u_) {
                            if (R2 > R0 || N7 === 0) {
                                R6.lineTo(D2, Math.min(n2, R2));
                            };
                        } else {
                            R6.lineTo(D2, n2);
                        }
                        R2 = R0;
                        c3 += r_;
                        if (J2 != X3$ || D5) {
                            G1[N7] = R0;
                        }
                    }
                    if (!R1) {
                        R1 = "auto";
                    }
                    if (D5) {
                        R6.strokeStyle = R1 == "auto" ? p_.defaultColor : R1;
                        R6.stroke();
                    } else {
                        R6.fillStyle = R1 == "auto" ? p_.defaultColor : R1;
                        R6.fill();
                    }
                    P8Q = 111925806;
                    i15 = 1264189122;
                    Q24 = 2;
                    for (var Z27 = 1; N1O.Y4l(Z27.toString(), Z27.toString().length, 17628) !== P8Q; Z27++) {
                        R6.closePath();
                        N1O.B_x(11);
                        Q24 += N1O.f21("2", 0);
                    }
                    if (N1O.n$d(Q24.toString(), Q24.toString().length, 99545) !== i15) {
                        R6.closePath();
                    }
                }
                F3 = S1.multiplier;
                if (!i9.heightPercentage) {
                    i9.heightPercentage =  + "0.7";
                }
                if (!i9.widthFactor) {
                    i9.widthFactor = 0.8;
                }
                P2 =  + "0";
                B9 = 0;
                for (var K1 =  + "0"; K1 < this.chart.maxTicks; K1++) {
                    w_ = G7[K1];
                    if (!w_)
                        continue;
                    N3 = 0;
                    for (F6 = "0" >> 64; F6 < S2.length; F6++) {
                        if (w_[S2[F6].field]) {
                            if (i9.subtype == "stacked") {
                                N3 += w_[S2[F6].field];
                            } else {
                                N3 = w_[S2[F6].field];
                            }
                            if (N3 > P2) {
                                P2 = N3;
                            }
                            if (N3 < B9) {
                                B9 = N3;
                            }
                        }
                    }
                }
                l6 = Math.floor(S1.top) + 0.5;
                if (!i9.bindToYAxis) {
                    m4 = Math.floor(S1.bottom) + 0.5;
                    if (P2 === ("0" ^ 0) && B9 === 0) {
                        Y4h = " ";
                        Y4h += "Not Availabl";
                        Y4h += "e";
                        this.watermark(d9, "center", "bottom", this.translateIf(i9.name + Y4h));
                        return;
                    }
                    F3 = (m4 - l6) * i9.heightPercentage / (P2 - B9);
                } else {
                    m4 = Math.floor(this.pixelFromPriceTransform(B9, w7, S1)) +  + "0.5";
                }
                H7 = 0.5;
                if (this.layout.candleWidth <= 1 || !d4) {
                    N1O.B_x(7);
                    H7 = N1O.f21(0, "0");
                }
                this.startClip(d9);
                R6 = this.chart.context;
                u_ = Math.max(0, (1 - i9.widthFactor) * this.layout.candleWidth / 2);
                G1 = {};
                e5 = {};
                p_ = this;
                N1O.B_x(17);
                G$ = N1O.U9a("1", 0);
                for (F6 = 0; F6 < S2.length; F6++) {
                    Y8 = S2[F6];
                    G$ = this.layout.candleWidth * i9.widthFactor;
                    N1O.B_x(0);
                    r4 = N1O.U9a(1, "0");
                    if (J2 == "clustered") {
                        r4 = F6;
                        G$ /= S2.length;
                    }
                    j_(Y8.field, Y8.fill_color_up, Y8.opacity_up, null, !![], r4, G$);
                    j_(Y8.field, Y8.fill_color_down, Y8.opacity_down, null, null, r4, G$);
                    if (this.layout.candleWidth >=  + "2" && d4) {
                        j_(Y8.field, Y8.border_color_up, Y8.opacity_up, !!"1", !!"1", r4, G$);
                        j_(Y8.field, Y8.border_color_down, Y8.opacity_down, !!"1", null, r4, G$);
                    }
                    if (J2 == "stacked") {
                        e5 = R.shallowClone(G1);
                    }
                }
                R6.globalAlpha = 1;
                this.endClip();
            };
            S.prototype.drawHeatmap = function (y_, U8) {
                var T$,
                q4,
                Q5,
                L8,
                e6,
                f$,
                a6,
                u2,
                v7,
                p9,
                H1,
                o$,
                f6;
                if (!U8 || !U8.length) {
                    return;
                }
                T$ = y_.panel;
                if (!T$) {
                    T$ = "chart";
                }
                q4 = this.panels[T$];
                if (!q4) {
                    return;
                }
                Q5 = y_.yAxis ? y_.yAxis : q4.yAxis;
                L8 = Math.floor(Q5.bottom) +  + "0.5";
                e6 = Math.floor(Q5.top) + 0.5;
                f$ = this.chart.dataSegment;
                this.getDefaultColor();
                if (!y_.name) {
                    y_.name = "Data";
                }
                if (!y_.widthFactor) {
                    y_.widthFactor = 1;
                }
                a6 = 0.5;
                if (q4.chart.tmpWidth <= 1) {
                    a6 = 0;
                }
                u2 = null;
                v7 = null;
                p9 = this;
                H1 = null;
                this.startClip(T$);
                o$ = this.chart.context;
                o$.globalAlpha = y_.opacity;
                function E4(r5, X7, e_, o7, W1) {
                    var H4,
                    K0,
                    n7,
                    g1,
                    F2,
                    F5,
                    F7,
                    f1,
                    q7,
                    h7,
                    H$,
                    y3;
                    o$.beginPath();
                    o$.fillStyle = X7;
                    o$.strokeStyle = X7;
                    H4 = Q5.top;
                    K0 = Q5.bottom;
                    n7 = p9.layout.candleWidth * o7;
                    g1 = Math.floor(p9.pixelFromBar(0, q4.chart) - p9.layout.candleWidth);
                    N1O.A7M();
                    for (var y7 = 0; y7 < f$.length; y7++) {
                        F7 = f$[y7];
                        if (!F7)
                            continue;
                        if (F7.candleWidth) {
                            if (y7 === 0) {
                                g1 += p9.layout.candleWidth;
                            } else {
                                N1O.p86(45);
                                var a$6 = N1O.f21(8, 3, 3);
                                g1 += (F7.candleWidth + n7 / o7) / a$6;
                            }
                            n7 = F7.candleWidth * o7;
                        } else {
                            g1 += p9.layout.candleWidth;
                        }
                        N1O.p86(46);
                        F2 = N1O.U9a(n7, W1, g1, 2);
                        N1O.p86(47);
                        F5 = N1O.U9a(n7, "2", W1, g1);
                        if (F5 - F2 < 2) {
                            N1O.B_x(48);
                            F5 = N1O.U9a(0, F2, "1");
                        }
                        if (F7.transform) {
                            F7 = F7.transform;
                        }
                        f1 = F7[r5];
                        if (!f1)
                            continue;
                        if (typeof f1 == "number") {
                            f1 = [f1];
                        }
                        for (var J1 = 0; J1 < f1.length; J1++) {
                            q7 = p9.pixelFromPrice(f1[J1], q4, Q5);
                            if (!H1) {
                                h7 = p9.pixelFromPrice(f1[J1] - y_.height, q4, Q5);
                                o$.lineWidth = 1;
                                N1O.p86(7);
                                u2 = N1O.f21(q7, h7);
                                N1O.p86(24);
                                v7 = N1O.f21(2, u2);
                                H1 = o$.lineWidth;
                            }
                            if (e_) {
                                N1O.B_x(2);
                                H$ = N1O.f21(v7, q7);
                                N1O.p86(7);
                                y3 = N1O.U9a(v7, q7);
                                o$.moveTo(F2, H$);
                                o$.lineTo(F2, y3);
                                o$.lineTo(F5, y3);
                                o$.lineTo(F5, H$);
                                o$.lineTo(F2, H$);
                            } else {
                                N1O.p86(7);
                                o$.fillRect(F2, N1O.U9a(v7, q7), N1O.U9a(F2, F5), u2);
                            }
                        }
                    }
                    if (e_) {
                        o$.stroke();
                    }
                    o$.closePath();
                }
                for (var Z_ = 0; Z_ < U8.length; Z_++) {
                    f6 = U8[Z_];
                    E4(f6.field, f6.color, null, y_.widthFactor, f6.border_color ? a6 : -a6 / 4);
                    if (f6.border_color && this.layout.candleWidth >= 2) {
                        E4(f6.field, f6.border_color, !!"1", y_.widthFactor, a6);
                    }
                }
                o$.lineWidth = 1;
                o$.globalAlpha = 1;
                this.endClip();
            };
            S.prototype.startClip = function (d$, a0) {
                var R3G,
                r6,
                k$,
                w0,
                y$,
                E9W,
                m9t,
                l9g;
                R3G = "cha";
                R3G += "r";
                R3G += "t";
                if (!d$) {
                    d$ = R3G;
                }
                r6 = this.panels[d$];
                k$ = r6.yAxis;
                this.chart.context.save();
                this.chart.context.beginPath();
                w0 = r6.left;
                y$ = r6.width;
                if (a0) {
                    N1O.p86(7);
                    w0 = N1O.f21(0, "0");
                    y$ = this.width;
                }
                N1O.p86(7);
                E9W = -N1O.U9a(0, "1694353139");
                m9t = -2022410725;
                l9g = 2;
                for (var R2e = 1; N1O.Y4l(R2e.toString(), R2e.toString().length, 78333) !== E9W; R2e++) {
                    this.chart.context.rect(w0, r6.top, y$, k$.height);
                    l9g += 2;
                }
                if (N1O.Y4l(l9g.toString(), l9g.toString().length, 40659) !== m9t) {
                    this.chart.context.rect(w0, r6.top, y$, k$.height);
                }
                this.chart.context.clip();
            };
            S.prototype.endClip = function () {
                N1O.N7F();
                this.chart.context.restore();
            };
            S.prototype.drawCandlesHighPerformance = function (Q1, W8, Q0, I7) {
                var s$,
                O7,
                h6,
                x$,
                B0,
                Q2,
                M4,
                B5,
                g3,
                O2,
                o_,
                x9,
                z6,
                N9,
                h$,
                w$,
                t3,
                N_,
                X_,
                u9,
                h1,
                N0,
                h3;
                s$ = Q1.chart;
                O7 = s$.dataSegment;
                h6 = this.chart.context;
                N1O.A7M();
                x$ = Q1.yAxis.top;
                B0 = Q1.yAxis.bottom;
                g3 = 0;
                if (Q0 && !R.isTransparent(Q0)) {
                    g3 = 0.5;
                }
                O2 = s$.dataSet.length - s$.scroll;
                o_ = O2 + s$.maxTicks;
                h6.beginPath();
                if (R.isTransparent(W8)) {
                    W8 = this.containerColor;
                }
                h6.fillStyle = W8;
                x9 = Q1.yAxis;
                N1O.B_x(2);
                var Q5$ = N1O.U9a(2, 0);
                z6 = s$.tmpWidth / Q5$;
                N9 = this.layout.candleWidth;
                N1O.p86(13);
                var h3O = N1O.U9a(7, 1, 1, 14);
                h$ = Q1.left - 0.5 * N9 + this.micropixels - h3O;
                for (var D3 = 0; D3 <= O7.length; D3++) {
                    N1O.p86(24);
                    h$ += N1O.U9a(2, N9);
                    N9 = this.layout.candleWidth;
                    N1O.B_x(24);
                    h$ += N1O.f21(2, N9);
                    w$ = O7[D3];
                    if (!w$)
                        continue;
                    if (w$.projection)
                        continue;
                    if (w$.candleWidth) {
                        h$ += (w$.candleWidth - N9) /  + "2";
                        N9 = w$.candleWidth;
                        if (this.layout.chartType == "volume_candle") {
                            N1O.B_x(24);
                            z6 = N1O.U9a(2, N9);
                        }
                    }
                    if (w$.Open == w$.Close)
                        continue;
                    if (I7 & S.CANDLEUP && w$.Open >= w$.Close)
                        continue;
                    if (I7 & S.CANDLEDOWN && w$.Open <= w$.Close)
                        continue;
                    if (I7 & S.CLOSEUP && w$.Close <= w$.iqPrevClose)
                        continue;
                    if (I7 & S.CLOSEDOWN && w$.Close >= w$.iqPrevClose)
                        continue;
                    if (I7 & S.CLOSEEVEN && w$.Close != w$.iqPrevClose)
                        continue;
                    if (w$.transform) {
                        w$ = w$.transform;
                    }
                    t3 = w$.cache;
                    N1O.B_x(2);
                    N_ = N1O.f21(D3, O2);
                    if (N_ < Q1.cacheLeft || N_ > Q1.cacheRight || !t3.open) {
                        X_ = x9.semiLog ? this.pixelFromPrice(w$.Open, Q1) : (x9.high - w$.Open) * x9.multiplier + x9.top;
                        u9 = x9.semiLog ? this.pixelFromPrice(w$.Close, Q1) : (x9.high - w$.Close) * x9.multiplier + x9.top;
                        Q2 = Math.floor(Math.min(X_, u9)) + g3;
                        M4 = Math.max(X_, u9);
                        N1O.B_x(7);
                        B5 = Math.floor(N1O.f21(Q2, M4));
                        if (Q2 < x$) {
                            if (Q2 + B5 < x$) {
                                t3.open = Q2;
                                t3.close = Q2;
                                continue;
                            }
                            N1O.p86(7);
                            B5 -= N1O.f21(Q2, x$);
                            Q2 = x$;
                        }
                        if (Q2 + B5 > B0) {
                            N1O.p86(8);
                            B5 -= N1O.U9a(Q2, B0, B5);
                        }
                        B5 = Math.max(B5, 2);
                        t3.open = Q2;
                        t3.close = t3.open + B5;
                    }
                    if (t3.open >= B0)
                        continue;
                    if (t3.close <= x$)
                        continue;
                    h1 = Math.floor(h$) + 0.5;
                    N0 = Math.floor(h1 - z6) + g3;
                    h3 = Math.round(h1 + z6) - g3;
                    if (w$.Open != w$.Close) {
                        h6.moveTo(N0, t3.open);
                        h6.lineTo(h3, t3.open);
                        h6.lineTo(h3, t3.close);
                        h6.lineTo(N0, t3.close);
                        h6.lineTo(N0, t3.open);
                    }
                }
                h6.fill();
                if (g3) {
                    h6.lineWidth = 1;
                    h6.strokeStyle = Q0;
                    h6.stroke();
                };
            };
            S.prototype.drawCandles = function (I1, S3, V_) {
                var D_,
                Q3,
                W$,
                J5,
                X0,
                f3,
                Z5,
                W6,
                M$,
                B6,
                D4,
                h8,
                M1,
                z2,
                K_,
                s4,
                K6,
                a9i,
                D9,
                w8,
                D7,
                k7,
                P0,
                H_,
                S0,
                t4;
                D_ = I1.chart;
                if (!D_) {
                    D_ = I1;
                    I1 = I1.chart;
                }
                Q3 = D_.dataSegment;
                W$ = this.chart.context;
                J5 = I1.yAxis.top;
                X0 = I1.yAxis.bottom;
                M$ = "transparent";
                B6 = "transparent";
                D4 =  + "0";
                // MaRa: CIQ Hack - Part 1 - TGPS Hollow Candle
                // --- Start Deletion ---
                //if (!R.isTransparent(M$)) {
                //    D4 = 0.5;
                //}
                // --- End Deletion ---
                h8 = D_.dataSet.length - D_.scroll;
                M1 = h8 + D_.maxTicks;
                z2 = I1.yAxis;
                N1O.B_x(3);
                var q$_ = N1O.f21(163, 11, 5, 3);
                K_ = D_.tmpWidth / q$_;
                s4 = this.layout.candleWidth;
                K6 = I1.left - 0.5 * s4 + this.micropixels -  + "1";
                for (var M3 = "0" - 0; M3 <= Q3.length; M3++) {
                    a9i = "s";
                    a9i += "o";
                    a9i += "li";
                    a9i += "d";
                    N1O.p86(24);
                    K6 += N1O.f21(2, s4);
                    s4 = this.layout.candleWidth;
                    N1O.p86(24);
                    K6 += N1O.f21(2, s4);
                    D9 = Q3[M3];
                    if (!D9)
                        continue;
                    if (D9.projection)
                        continue;
                    if (D9.candleWidth) {
                        N1O.p86(18);
                        var B4F = N1O.f21(94, 6, 16, 1);
                        K6 += (D9.candleWidth - s4) / B4F;
                        s4 = D9.candleWidth;
                        if (this.layout.chartType == "volume_candle") {
                            N1O.B_x(24);
                            K_ = N1O.U9a(2, s4);
                        }
                    }
                    if (!D9.Open && D9.Open !== 0)
                        continue;
                    if (D9.Open == D9.Close)
                        continue;
                    w8 = S3(this, D9, V_ ? "outline" : a9i);
                    if (!w8)
                        continue;
                    if (V_) {
                        M$ = w8;
                    } else {
                        B6 = w8;
                    }
                    // MaRa: CIQ Hack - Part 1 - TGPS Hollow Candle
                    // --- Start ---
                    if (!R.isTransparent(M$)) {
                        D4 = 0.5;
                    }
                    // --- End ---
                    W$.beginPath();
                    W$.fillStyle = B6;
                    if (D9.transform) {
                        D9 = D9.transform;
                    }
                    D7 = D9.cache;
                    N1O.B_x(2);
                    k7 = N1O.f21(M3, h8);
                    if (k7 < I1.cacheLeft || k7 > I1.cacheRight || !D7.open) {
                        P0 = z2.semiLog ? this.pixelFromPrice(D9.Open, I1) : (z2.high - D9.Open) * z2.multiplier + z2.top;
                        H_ = z2.semiLog ? this.pixelFromPrice(D9.Close, I1) : (z2.high - D9.Close) * z2.multiplier + z2.top;
                        f3 = Math.floor(Math.min(P0, H_)) + D4;
                        Z5 = Math.max(P0, H_);
                        N1O.p86(7);
                        W6 = Math.floor(N1O.f21(f3, Z5));
                        if (f3 < J5) {
                            if (f3 + W6 < J5) {
                                D7.open = f3;
                                D7.close = f3;
                                continue;
                            }
                            N1O.B_x(7);
                            W6 -= N1O.f21(f3, J5);
                            f3 = J5;
                        }
                        if (f3 + W6 > X0) {
                            N1O.B_x(8);
                            W6 -= N1O.f21(f3, X0, W6);
                        }
                        W6 = Math.max(W6, 2);
                        D7.open = f3;
                        D7.close = D7.open + W6;
                    }
                    if (D7.open >= X0)
                        continue;
                    if (D7.close <= J5)
                        continue;
                    flr_xbase = Math.floor(K6) + 0.5;
                    S0 = Math.floor(flr_xbase - K_) + D4;
                    t4 = Math.round(flr_xbase + K_) - D4;
                    if (D9.Open != D9.Close) {
                        W$.moveTo(S0, D7.open);
                        W$.lineTo(t4, D7.open);
                        W$.lineTo(t4, D7.close);
                        W$.lineTo(S0, D7.close);
                        W$.lineTo(S0, D7.open);
                    }
                    if (B6 != "transparent") {
                        W$.fill();
                    }
                    if (D4) {
                        N1O.p86(7);
                        W$.lineWidth = N1O.U9a(0, "1");
                        W$.strokeStyle = M$;
                        W$.stroke();
                    }
                }
            };
            S.prototype.drawShadowsHighPerformance = function (z5, s3, v0) {
                var u4,
                v$,
                R8,
                w9,
                O9,
                B_,
                J7,
                H3,
                U7,
                F0,
                T7,
                W2,
                j6,
                s5,
                Y$,
                j5,
                U$,
                k_,
                Q6,
                V6,
                K5,
                T0;
                u4 = z5.chart;
                v$ = u4.dataSegment;
                R8 = this.chart.context;
                N1O.p86(11);
                R8.lineWidth = N1O.U9a("1", 0);
                w9 = z5.yAxis.top;
                O9 = z5.yAxis.bottom;
                U7 = u4.dataSet.length - u4.scroll;
                F0 = U7 + u4.maxTicks;
                R8.beginPath();
                T7 = z5.yAxis;
                W2 = this.layout.candleWidth;
                N1O.B_x(49);
                var H8J = N1O.U9a(8, 10, 17, 14, 24);
                j6 = z5.left -  + "0.5" * W2 + this.micropixels - H8J;
                for (var E3 = 0; E3 <= v$.length; E3++) {
                    N1O.B_x(24);
                    j6 += N1O.U9a(2, W2);
                    W2 = this.layout.candleWidth;
                    N1O.B_x(24);
                    j6 += N1O.f21(2, W2);
                    s5 = v$[E3];
                    if (!s5)
                        continue;
                    if (s5.projection)
                        continue;
                    if (s5.candleWidth) {
                        j6 += (s5.candleWidth - W2) / ("2" ^ 0);
                        W2 = s5.candleWidth;
                    }
                    if (v0) {
                        if (v0 & S.CANDLEUP && s5.Open >= s5.Close)
                            continue;
                        else if (v0 & S.CANDLEDOWN && s5.Open <= s5.Close)
                            continue;
                        else if (v0 & S.CANDLEEVEN && s5.Open != s5.Close)
                            continue;
                        else if (v0 & S.CLOSEUP && s5.Close <= s5.iqPrevClose)
                            continue;
                        else if (v0 & S.CLOSEDOWN && s5.Close >= s5.iqPrevClose)
                            continue;
                        else if (v0 & S.CLOSEEVEN && s5.Close != s5.iqPrevClose)
                            continue;
                    }
                    if (s5.transform) {
                        s5 = s5.transform;
                    }
                    Y$ = s5.cache;
                    N1O.B_x(2);
                    j5 = N1O.U9a(E3, U7);
                    if (j5 < z5.cacheLeft || j5 > z5.cacheRight || !Y$.top) {
                        B_ = T7.semiLog ? this.pixelFromPrice(s5.High, z5) : (T7.high - s5.High) * T7.multiplier + T7.top;
                        J7 = T7.semiLog ? this.pixelFromPrice(s5.Low, z5) : (T7.high - s5.Low) * T7.multiplier + T7.top;
                        N1O.B_x(7);
                        U$ = N1O.f21(B_, J7);
                        if (B_ < w9) {
                            if (B_ + U$ < w9) {
                                Y$.top = B_;
                                Y$.bottom = B_;
                                continue;
                            }
                            N1O.p86(7);
                            U$ -= N1O.U9a(B_, w9);
                            B_ = w9;
                        }
                        if (B_ + U$ > O9) {
                            N1O.B_x(8);
                            U$ -= N1O.U9a(B_, O9, U$);
                        }
                        Y$.top = B_;
                        Y$.bottom = Y$.top + U$;
                    }
                    if (Y$.top >= O9)
                        continue;
                    if (Y$.bottom <= w9)
                        continue;
                    k_ = Math.floor(j6) + 0.5;
                    R8.moveTo(k_, Y$.top);
                    R8.lineTo(k_, Y$.bottom);
                    if (s5.Open == s5.Close) {
                        Q6 = this.offset;
                        if (this.layout.chartType == "volume_candle") {
                            N1O.p86(24);
                            Q6 = N1O.U9a(2, W2);
                        }
                        N1O.B_x(7);
                        V6 = N1O.f21(Q6, k_);
                        N1O.B_x(2);
                        K5 = N1O.U9a(Q6, k_);
                        T0 = Math.floor(T7.semiLog ? this.pixelFromPrice(s5.Open, z5) : (T7.high - s5.Open) * T7.multiplier + T7.top) + 0.5;
                        if (T0 <= O9 && T0 >= w9) {
                            R8.moveTo(V6, T0);
                            R8.lineTo(K5, T0);
                        }
                    }
                }
                this.canvasColor(s3);
                R8.stroke(); ;
            };
            S.prototype.drawShadows = function (U5, c5$) {
                var q0,
                g$_,
                W4,
                K2,
                B7,
                a9,
                v5j,
                R9k,
                x3C,
                U2Z,
                S8,
                m7,
                x6,
                E1p,
                I9,
                c1j,
                L0,
                G9r,
                O3,
                L9,
                P7K,
                E2G,
                E5S,
                W$H;
                q0 = U5.chart;
                if (!q0) {
                    q0 = U5;
                    U5 = U5.chart;
                }
                g$_ = q0.dataSegment;
                W4 = this.chart.context;
                W4.lineWidth = 1;
                K2 = U5.yAxis.top;
                B7 = U5.yAxis.bottom;
                x3C = q0.dataSet.length - q0.scroll;
                U2Z = x3C + q0.maxTicks;
                S8 = U5.yAxis;
                m7 = this.layout.candleWidth;
                N1O.p86(50);
                var e6u = N1O.f21(509, 15, 17, 17);
                x6 = U5.left -  + "0.5" * m7 + this.micropixels - e6u;
                for (var q5 = 0; q5 <= g$_.length; q5++) {
                    E1p = "sha";
                    E1p += "d";
                    E1p += "ow";
                    N1O.B_x(24);
                    x6 += N1O.U9a(2, m7);
                    m7 = this.layout.candleWidth;
                    N1O.p86(24);
                    x6 += N1O.U9a(2, m7);
                    I9 = g$_[q5];
                    if (!I9)
                        continue;
                    if (I9.projection)
                        continue;
                    if (I9.candleWidth) {
                        N1O.p86(38);
                        var F1B = N1O.U9a(5, 20, 83, 13);
                        x6 += (I9.candleWidth - m7) / F1B;
                        m7 = I9.candleWidth;
                    }
                    c1j = c5$(this, I9, E1p);
                    if (!c1j)
                        continue;
                    if (I9.transform) {
                        I9 = I9.transform;
                    }
                    L0 = I9.cache;
                    N1O.B_x(2);
                    G9r = N1O.f21(q5, x3C);
                    if (G9r < U5.cacheLeft || G9r > U5.cacheRight || !L0.top) {
                        a9 = S8.semiLog ? this.pixelFromPrice(I9.High, U5) : (S8.high - I9.High) * S8.multiplier + S8.top;
                        v5j = S8.semiLog ? this.pixelFromPrice(I9.Low, U5) : (S8.high - I9.Low) * S8.multiplier + S8.top;
                        N1O.p86(7);
                        O3 = N1O.f21(a9, v5j);
                        if (a9 < K2) {
                            if (a9 + O3 < K2) {
                                L0.top = a9;
                                L0.bottom = a9;
                                continue;
                            }
                            N1O.B_x(7);
                            O3 -= N1O.U9a(a9, K2);
                            a9 = K2;
                        }
                        if (a9 + O3 > B7) {
                            N1O.B_x(8);
                            O3 -= N1O.U9a(a9, B7, O3);
                        }
                        L0.top = a9;
                        L0.bottom = L0.top + O3;
                    }
                    if (L0.top >= B7)
                        continue;
                    if (L0.bottom <= K2)
                        continue;
                    L9 = Math.floor(x6) +  + "0.5";
                    W4.beginPath();
                    W4.moveTo(L9, L0.top);
                    W4.lineTo(L9, L0.bottom);
                    if (I9.Open == I9.Close || !I9.Open && I9.Open !== 0) {
                        P7K = this.offset;
                        if (this.layout.chartType == "volume_candle") {
                            N1O.B_x(24);
                            P7K = N1O.f21(2, m7);
                        }
                        N1O.B_x(7);
                        E2G = N1O.f21(P7K, L9);
                        N1O.B_x(2);
                        E5S = N1O.f21(P7K, L9);
                        W$H = Math.floor(S8.semiLog ? this.pixelFromPrice(I9.Close, U5) : (S8.high - I9.Close) * S8.multiplier + S8.top) +  + "0.5";
                        if (W$H <= B7 && W$H >= K2) {
                            W4.moveTo(E2G, W$H);
                            W4.lineTo(E5S, W$H);
                        }
                    }
                    W4.strokeStyle = c1j;
                    W4.stroke();
                }
            };
            S.prototype.scatter = function (C34) {
                var T6G,
                S1R,
                D6A,
                h8T,
                S8A,
                F5L,
                I1y,
                H2P,
                c1o;
                T6G = C34.chart;
                S1R = T6G.dataSegment;
                N1O.A7M();
                D6A = this.chart.context;
                D6A.beginPath();
                D6A.lineWidth =  + "4";
                h8T = C34.yAxis.top;
                S8A = C34.yAxis.bottom;
                N1O.p86(8);
                var b90 = N1O.f21(7, 9, 3);
                F5L = C34.left - 0.5 * this.layout.candleWidth + this.micropixels - b90;
                for (var h7T = 0; h7T <= S1R.length; h7T++) {
                    F5L += this.layout.candleWidth;
                    I1y = S1R[h7T];
                    if (!I1y)
                        continue;
                    if (!I1y.projection) {
                        if (I1y.transform) {
                            I1y = I1y.transform;
                        }
                        H2P = [I1y.Close];
                        if (("Scatter" in I1y)) {
                            H2P = I1y.Scatter;
                        }
                        for (var l_A = 0; l_A < H2P.length; l_A++) {
                            c1o = this.pixelFromPrice(H2P[l_A], C34);
                            if (c1o < h8T)
                                continue;
                            if (c1o > S8A)
                                continue;
                            N1O.p86(7);
                            D6A.moveTo(N1O.f21(2, F5L), c1o);
                            N1O.p86(2);
                            D6A.lineTo(N1O.f21(2, F5L), c1o);
                        }
                    }
                }
                this.canvasColor("stx_scatter_chart");
                D6A.stroke();
                D6A.closePath();
                D6A.lineWidth = 1;
            };
            S.prototype.drawKagiSquareWave = function (s1e, S$H, w13) {
                var x0F,
                Y$6,
                h9H,
                i1G,
                u6B,
                f8M,
                F48,
                u1e,
                S$2,
                K4R,
                l8Q,
                K2e,
                D4M,
                B8x,
                M$j,
                G93,
                x$t,
                j$F,
                l$q;
                x0F = s1e.chart;
                this.startClip(s1e.name);
                Y$6 = x0F.dataSegment;
                h9H = x0F.context;
                i1G = this.canvasStyle(S$H);
                u6B = this.canvasStyle(w13);
                this.canvasColor(S$H);
                f8M = h9H.strokeStyle;
                this.canvasColor(w13);
                F48 = h9H.strokeStyle;
                N1O.p86(7);
                u1e = N1O.f21(0, "1");
                if (i1G.width && parseInt(i1G.width,  + "10") <= 25) {
                    u1e = Math.max(1, R.stripPX(i1G.width));
                }
                S$2 = 1;
                if (u6B.width && parseInt(u6B.width, 10) <= 25) {
                    S$2 = Math.max(1, R.stripPX(u6B.width));
                }
                h9H.beginPath();
                K4R = x0F.dataSet.length - x0F.scroll;
                l8Q = s1e.yAxis;
                K2e = !0;
                D4M = null;
                B8x = null;
                M$j = null;
                G93 = s1e.left - 0.5 * this.layout.candleWidth + this.micropixels -  + "1";
                for (var J6m =  + "0"; J6m <= Y$6.length; J6m++) {
                    G93 += this.layout.candleWidth;
                    x$t = Y$6[J6m];
                    if (!x$t)
                        continue;
                    if (x$t.projection)
                        break;
                    if (x$t.transform) {
                        x$t = x$t.transform;
                    }
                    j$F = x$t.cache;
                    N1O.B_x(2);
                    l$q = N1O.f21(J6m, K4R);
                    if (l$q < s1e.cacheLeft || l$q > s1e.cacheRight || !j$F.open) {
                        j$F.open = l8Q.semiLog ? this.pixelFromPrice(x$t.Open, s1e) : (l8Q.high - x$t.Open) * l8Q.multiplier + l8Q.top;
                        j$F.close = l8Q.semiLog ? this.pixelFromPrice(x$t.Close, s1e) : (l8Q.high - x$t.Close) * l8Q.multiplier + l8Q.top; ;
                    }
                    B8x = j$F.close;
                    if (K2e) {
                        h9H.moveTo(Math.floor(G93), j$F.open);
                        D4M = j$F.open;
                        if (j$F.close > j$F.open) {
                            M$j = 1;
                        } else {
                            M$j = -1;
                        }
                        K2e = ![];
                    }
                    if (M$j !=  - ("1" << 0) && j$F.close < D4M && D4M < j$F.open) {
                        h9H.lineTo(Math.floor(G93), D4M);
                        h9H.strokeStyle = F48;
                        h9H.lineWidth = S$2;
                        h9H.stroke();
                        h9H.closePath();
                        h9H.beginPath();
                        M$j = -1;
                        h9H.moveTo(Math.floor(G93), D4M);
                    } else if (M$j != 1 && j$F.close > D4M && D4M > j$F.open) {
                        h9H.lineTo(Math.floor(G93), D4M);
                        h9H.strokeStyle = f8M;
                        h9H.lineWidth = u1e;
                        h9H.stroke();
                        h9H.closePath();
                        h9H.beginPath();
                        M$j = 1;
                        h9H.moveTo(Math.floor(G93), D4M);
                    }
                    h9H.lineTo(Math.floor(G93), j$F.close);
                    if (J6m + 1 < Y$6.length) {
                        h9H.lineTo(Math.floor(G93 + this.layout.candleWidth), j$F.close);
                        D4M = j$F.open;
                    }
                }
                if (M$j == -1 || M$j === null && B8x < D4M) {
                    h9H.strokeStyle = f8M;
                    h9H.lineWidth = u1e;
                } else {
                    h9H.strokeStyle = F48;
                    h9H.lineWidth = S$2;
                }
                h9H.stroke();
                h9H.closePath();
                this.endClip();
                h9H.lineWidth = 1;
            };
            S.prototype.drawPointFigureChart = function (u63, K5e, t1z) {
                var c7X,
                F7G,
                q5o,
                c6c,
                t4n,
                L4A,
                A6x,
                r9K,
                l2Q,
                W$h,
                f64,
                f9b,
                e3i,
                i1E,
                q52,
                y9g,
                f1l,
                S5j,
                C4S,
                v8d,
                a_J,
                k7b;
                c7X = u63.chart;
                this.startClip(u63.name);
                F7G = c7X.dataSegment;
                q5o = c7X.context;
                this.canvasColor(K5e);
                c6c = this.canvasStyle(K5e);
                t4n = parseInt(c6c.paddingTop,  + "10");
                L4A = parseInt(c6c.paddingBottom, 10);
                A6x = parseInt(c6c.paddingLeft,  + "10");
                r9K = parseInt(c6c.paddingRight, 10);
                if (c6c.width && parseInt(c6c.width, 10) <= 25) {
                    q5o.lineWidth = Math.max(1, R.stripPX(c6c.width));
                } else {
                    q5o.lineWidth =  + "2";
                }
                q5o.beginPath();
                if (!this.chart.pandf) {
                    this.chart.pandf = {
                        "box": 1,
                        "reversal": 3
                    };
                }
                l2Q = this.chart.pandf.box;
                W$h = c7X.dataSet.length - c7X.scroll;
                f64 = u63.yAxis;
                q52 = this.layout.candleWidth;
                y9g = u63.left - q52 + this.micropixels - ("1" | 0);
                for (var G9k = "0" ^ 0; G9k < F7G.length; G9k++) {
                    y9g += q52;
                    f1l = F7G[G9k];
                    if (!f1l)
                        continue;
                    if (f1l.projection)
                        break;
                    if (f1l.candleWidth) {
                        q52 = f1l.candleWidth;
                    }
                    if (f1l.transform) {
                        f1l = f1l.transform;
                    }
                    if (t1z == "X" && f1l.Open > f1l.Close)
                        continue;
                    else if (t1z == (3120 <= (526.08, 6370) ? 133.84 <= 9586 ? "O" :  + "695.08" : 5.75e+2) && f1l.Open < f1l.Close)
                        continue;
                    S5j = f1l.cache;
                    N1O.B_x(2);
                    C4S = N1O.U9a(G9k, W$h);
                    if (C4S < u63.cacheLeft || C4S > u63.cacheRight || !S5j.open) {
                        S5j.open = f64.semiLog ? this.pixelFromPrice(f1l.Open, u63) : (f64.high - f1l.Open) * f64.multiplier + f64.top;
                        S5j.close = f64.semiLog ? this.pixelFromPrice(f1l.Close, u63) : (f64.high - f1l.Close) * f64.multiplier + f64.top; ;
                    }
                    v8d = Math.round(y9g);
                    N1O.B_x(2);
                    a_J = Math.round(N1O.f21(q52, y9g));
                    f9b = Math.abs(Math.round((f1l.Close - f1l.Open) / l2Q));
                    e3i = Math.abs((S5j.open - S5j.close) / f9b);
                    N1O.p86(24);
                    k7b = N1O.U9a(2, e3i);
                    i1E = S5j.open;
                    for (; f9b >= 0; f9b--) {
                        if (t1z == "X") {
                            N1O.p86(2);
                            q5o.moveTo(N1O.U9a(A6x, v8d), N1O.U9a(i1E, L4A, k7b, N1O.B_x(36)));
                            N1O.p86(7);
                            q5o.lineTo(N1O.f21(r9K, a_J), N1O.U9a(k7b, i1E, e3i, t4n, N1O.p86(5)));
                            N1O.p86(2);
                            q5o.moveTo(N1O.f21(A6x, v8d), N1O.f21(k7b, i1E, e3i, t4n, N1O.p86(5)));
                            N1O.B_x(7);
                            q5o.lineTo(N1O.U9a(r9K, a_J), N1O.f21(i1E, L4A, k7b, N1O.p86(36)));
                            i1E -= e3i;
                        } else if (t1z == "O") {
                            N1O.B_x(51);
                            q5o.moveTo(N1O.U9a("2", a_J, v8d), N1O.f21(i1E, k7b, t4n, N1O.B_x(8)));
                            N1O.B_x(2);
                            q5o.bezierCurveTo(N1O.f21(r9K, a_J), N1O.f21(i1E, k7b, t4n, N1O.p86(8)), N1O.U9a(r9K, a_J, N1O.p86(2)), N1O.f21(k7b, i1E, e3i, L4A, N1O.B_x(52)), N1O.f21(v8d, 2, a_J, N1O.p86(53)), N1O.f21(k7b, i1E, e3i, L4A, N1O.p86(52)));
                            N1O.B_x(7);
                            q5o.bezierCurveTo(N1O.U9a(A6x, v8d), N1O.U9a(k7b, i1E, e3i, L4A, N1O.p86(52)), N1O.f21(A6x, v8d, N1O.B_x(7)), N1O.f21(i1E, k7b, t4n, N1O.B_x(8)), N1O.U9a(v8d, 2, a_J, N1O.p86(53)), N1O.U9a(i1E, k7b, t4n, N1O.B_x(8)));
                            i1E += e3i;
                        }
                    }
                }
                q5o.stroke();
                this.endClip();
                q5o.lineWidth =  + "1";
            };
            S.prototype.drawBarChartHighPerformance = function (J1B, Q_U, q$w) {
                var U_w,
                a8V,
                h9I,
                a40,
                f05,
                B38,
                h61,
                u2P,
                D7G,
                Q7F,
                z$n,
                h7Y,
                D79,
                R4E,
                u75,
                I1m,
                W6e,
                v_m,
                H4j;
                U_w = J1B.chart;
                a8V = U_w.dataSegment;
                h9I = U_w.context;
                a40 = this.canvasStyle(Q_U);
                if (a40.width && parseInt(a40.width, "10" << 96) <= 25) {
                    h9I.lineWidth = Math.max(1, R.stripPX(a40.width));
                } else {
                    N1O.p86(7);
                    h9I.lineWidth = N1O.U9a(0, "1");
                }
                h9I.beginPath();
                f05 = J1B.yAxis.top;
                B38 = J1B.yAxis.bottom;
                Q7F = U_w.dataSet.length - U_w.scroll;
                z$n = Q7F + U_w.maxTicks;
                h7Y = J1B.yAxis;
                D79 = J1B.left - 0.5 * this.layout.candleWidth + this.micropixels -  + "1";
                N1O.B_x(7);
                var L$W = N1O.U9a(38, 40);
                N1O.N7F();
                R4E = U_w.tmpWidth / L$W;
                u75 = h9I.lineWidth /  + "2";
                for (var U1S = 0; U1S <= a8V.length; U1S++) {
                    D79 += this.layout.candleWidth;
                    I1m = a8V[U1S];
                    if (!I1m)
                        continue;
                    if (I1m.projection)
                        break;
                    if (q$w) {
                        if (q$w & S.CLOSEUP && I1m.Close <= I1m.iqPrevClose)
                            continue;
                        else if (q$w & S.CLOSEDOWN && I1m.Close >= I1m.iqPrevClose)
                            continue;
                        else if (q$w & S.CLOSEEVEN && I1m.Close != I1m.iqPrevClose)
                            continue;
                    }
                    if (I1m.transform) {
                        I1m = I1m.transform;
                    }
                    W6e = I1m.cache;
                    N1O.p86(2);
                    v_m = N1O.U9a(U1S, Q7F);
                    if (v_m < J1B.cacheLeft || v_m > J1B.cacheRight || !W6e.top) {
                        h61 = h7Y.semiLog ? this.pixelFromPrice(I1m.High, J1B) : (h7Y.high - I1m.High) * h7Y.multiplier + h7Y.top;
                        u2P = h7Y.semiLog ? this.pixelFromPrice(I1m.Low, J1B) : (h7Y.high - I1m.Low) * h7Y.multiplier + h7Y.top;
                        N1O.B_x(7);
                        D7G = N1O.f21(h61, u2P);
                        W6e.open = h7Y.semiLog ? this.pixelFromPrice(I1m.Open, J1B) : (h7Y.high - I1m.Open) * h7Y.multiplier + h7Y.top;
                        W6e.close = h7Y.semiLog ? this.pixelFromPrice(I1m.Close, J1B) : (h7Y.high - I1m.Close) * h7Y.multiplier + h7Y.top;
                        if (h61 < f05) {
                            if (h61 + D7G < f05) {
                                W6e.top = h61;
                                W6e.bottom = h61;
                                continue;
                            }
                            N1O.B_x(7);
                            D7G -= N1O.f21(h61, f05);
                            h61 = f05;
                        }
                        if (h61 + D7G > B38) {
                            N1O.B_x(8);
                            D7G -= N1O.f21(h61, B38, D7G);
                        }
                        W6e.top = h61;
                        N1O.B_x(2);
                        W6e.bottom = N1O.U9a(D7G, h61);
                    }
                    H4j = Math.floor(D79) + 0.5;
                    if (W6e.top < B38 && W6e.bottom > f05) {
                        h9I.moveTo(H4j, W6e.top - u75);
                        h9I.lineTo(H4j, W6e.bottom + u75);
                    }
                    if (W6e.open > f05 && W6e.open < B38) {
                        h9I.moveTo(H4j, W6e.open);
                        N1O.B_x(7);
                        h9I.lineTo(N1O.f21(R4E, H4j), W6e.open);
                    }
                    if (W6e.close > f05 && W6e.close < B38) {
                        h9I.moveTo(H4j, W6e.close);
                        N1O.B_x(2);
                        h9I.lineTo(N1O.U9a(R4E, H4j), W6e.close);
                    }
                }
                this.canvasColor(Q_U);
                h9I.stroke();
                h9I.closePath();
                N1O.B_x(16);
                h9I.lineWidth = N1O.f21("1", 64);
            };
            S.prototype.drawBarChart = function (n4e, y4z, N_Q) {
                var b_E,
                o2v,
                g50,
                d_0,
                a2z,
                V8R,
                X8F,
                m1W,
                j9s,
                B6H,
                r4w,
                q$0,
                Y$n,
                m$r,
                E2N,
                T7O,
                n6L,
                o4y,
                t4s,
                e1F,
                n0L,
                B7M;
                b_E = n4e.chart;
                if (!b_E) {
                    b_E = n4e;
                    n4e = n4e.chart;
                }
                o2v = b_E.dataSegment;
                g50 = b_E.context;
                d_0 = this.canvasStyle(y4z);
                if (d_0.width && parseInt(d_0.width, 10) <= 25) {
                    g50.lineWidth = Math.max(1, R.stripPX(d_0.width));
                } else {
                    g50.lineWidth = 1;
                }
                a2z = n4e.yAxis.top;
                V8R = n4e.yAxis.bottom;
                B6H = b_E.dataSet.length - b_E.scroll;
                r4w = B6H + b_E.maxTicks;
                q$0 = n4e.yAxis;
                Y$n = {};
                N1O.B_x(30);
                var L_q = N1O.U9a(14, 16);
                m$r = b_E.tmpWidth / L_q;
                N1O.p86(54);
                var I8u = N1O.f21(5, 17, 69, 14, 1);
                E2N = g50.lineWidth / I8u;
                T7O = this.layout.candleWidth;
                N1O.B_x(55);
                var l4T = N1O.f21(2, 15, 20, 18, 23);
                n6L = n4e.left - 0.5 * T7O + this.micropixels - l4T;
                for (var c6L = "0" - 0; c6L <= o2v.length; c6L++) {
                    N1O.p86(19);
                    n6L += N1O.U9a("2", T7O, 0);
                    T7O = this.layout.candleWidth;
                    N1O.p86(27);
                    n6L += N1O.f21(T7O, "2");
                    o4y = o2v[c6L];
                    if (!o4y)
                        continue;
                    if (o4y.projection)
                        break;
                    if (o4y.candleWidth) {
                        N1O.p86(56);
                        var c97 = N1O.U9a(15, 10, 11, 16);
                        n6L += (o4y.candleWidth - T7O) / c97;
                        T7O = o4y.candleWidth;
                    }
                    t4s = N_Q(this, o4y);
                    if (!t4s)
                        continue;
                    Y$n[t4s] = 1;
                    g50.strokeStyle = t4s;
                    g50.beginPath();
                    if (o4y.transform) {
                        o4y = o4y.transform;
                    }
                    e1F = o4y.cache;
                    N1O.B_x(2);
                    n0L = N1O.U9a(c6L, B6H);
                    if (n0L < n4e.cacheLeft || n0L > n4e.cacheRight || !e1F.top) {
                        X8F = this.pixelFromPrice(o4y.High, n4e);
                        m1W = this.pixelFromPrice(o4y.Low, n4e);
                        N1O.p86(7);
                        j9s = N1O.f21(X8F, m1W);
                        e1F.open = q$0.semiLog ? this.pixelFromPrice(o4y.Open, n4e) : (q$0.high - o4y.Open) * q$0.multiplier + q$0.top;
                        e1F.close = q$0.semiLog ? this.pixelFromPrice(o4y.Close, n4e) : (q$0.high - o4y.Close) * q$0.multiplier + q$0.top;
                        if (X8F < a2z) {
                            if (X8F + j9s < a2z) {
                                e1F.top = X8F;
                                e1F.bottom = X8F;
                                continue;
                            }
                            N1O.p86(7);
                            j9s -= N1O.f21(X8F, a2z);
                            X8F = a2z;
                        }
                        if (X8F + j9s > V8R) {
                            N1O.p86(8);
                            j9s -= N1O.U9a(X8F, V8R, j9s);
                        }
                        e1F.top = X8F;
                        N1O.B_x(2);
                        e1F.bottom = N1O.f21(j9s, X8F);
                    }
                    B7M = Math.floor(n6L) + 0.5;
                    if (e1F.top < V8R && e1F.bottom > a2z) {
                        g50.moveTo(B7M, e1F.top - E2N);
                        g50.lineTo(B7M, e1F.bottom + E2N);
                    }
                    if (e1F.open > a2z && e1F.open < V8R) {
                        g50.moveTo(B7M, e1F.open);
                        N1O.B_x(7);
                        g50.lineTo(N1O.f21(m$r, B7M), e1F.open);
                    }
                    if (e1F.close > a2z && e1F.close < V8R) {
                        g50.moveTo(B7M, e1F.close);
                        N1O.B_x(2);
                        g50.lineTo(N1O.U9a(m$r, B7M), e1F.close);
                    }
                    g50.stroke();
                }
                g50.lineWidth = 1;
                return Y$n;
            };
            S.prototype.plotLineChart = function (c6s, B$z, o$h, s6z, i_U) {
                var E50,
                T3h,
                F6$,
                v2I,
                N3i,
                l1j,
                x0L,
                Y09,
                H1N,
                a9$,
                R7H,
                K9o,
                c_3,
                w8b,
                O9r,
                q1B,
                E3A,
                H88,
                R7R,
                t3B,
                S7t,
                R1Y,
                C6_,
                p$g,
                x3m,
                x15,
                q46,
                Z4P,
                p81,
                m_H,
                O4_,
                Q31,
                H9b,
                q8i,
                B45;
                E50 = !!"";
                T3h = !!0;
                F6$ = !"1";
                N1O.B_x(16);
                v2I = N1O.f21("0", 0);
                N3i = [];
                if (s6z) {
                    E50 = s6z.skipProjections;
                    T3h = s6z.skipTransform;
                    F6$ = s6z.noSlopes;
                    v2I = s6z.tension;
                }
                l1j = c6s.chart;
                x0L = this.chart.context;
                Y09 = !!"1";
                H1N = c6s.yAxis;
                a9$ = H1N.top;
                R7H = H1N.bottom;
                K9o = l1j.dataSet.length - l1j.scroll;
                c_3 = null;
                w8b = {};
                O9r = [0,  + "0"];
                q1B = this.layout.candleWidth;
                N1O.p86(57);
                var h6u = N1O.U9a(5, 33, 10, 17, 0);
                N1O.p86(58);
                var H5n = N1O.f21(2, 13, 177, 10, 5);
                N1O.A7M();
                E3A = c6s.left - (s6z.noSlopes ? h6u : 0.5) * q1B + this.micropixels - H5n;
                this.startClip(c6s.name);
                x0L.beginPath();
                for (var V81 = 0; V81 <= B$z.length; V81++) {
                    N1O.B_x(27);
                    E3A += N1O.f21(q1B, "2");
                    if (s6z.noSlopes) {
                        N1O.B_x(24);
                        E3A += N1O.f21(2, q1B);
                    }
                    q1B = this.layout.candleWidth;
                    if (!s6z.noSlopes) {
                        N1O.B_x(24);
                        E3A += N1O.f21(2, q1B);
                    }
                    H88 = B$z[V81];
                    if (!H88)
                        continue;
                    if (E50 && H88.projection)
                        break;
                    if (H88.candleWidth) {
                        if (!s6z.noSlopes) {
                            N1O.p86(59);
                            var Z38 = N1O.f21(17, 17, 0, 19, 17);
                            E3A += (H88.candleWidth - q1B) / Z38;
                        }
                        q1B = H88.candleWidth;
                    }
                    if (!T3h && H88.transform) {
                        H88 = H88.transform;
                    }
                    R7R = E3A;
                    t3B = H88.cache;
                    N1O.B_x(2);
                    S7t = N1O.f21(V81, K9o);
                    if (!H88[o$h] && H88[o$h] !== 0)
                        continue;
                    if (S7t < c6s.cacheLeft || S7t > c6s.cacheRight || !t3B[o$h]) {
                        t3B[o$h] = H1N.semiLog ? this.pixelFromPrice(H88[o$h], c6s) : (H1N.high - H88[o$h]) * H1N.multiplier + H1N.top; ;
                    }
                    if (R7R <= c6s.right) {
                        c_3 = H88;
                    }
                    if (V81 == B$z.length - 1) {
                        if (this.extendLastTick) {
                            N1O.B_x(24);
                            R7R += N1O.f21(2, q1B);
                        }
                        if (s6z.lastTickOffset) {
                            R7R += s6z.lastTickOffset;
                        };
                    }
                    R1Y = t3B[o$h];
                    C6_ = null;
                    if (i_U) {
                        p$g = i_U(this, H88);
                        if (!p$g)
                            continue;
                        if (typeof p$g == "object") {
                            C6_ = p$g.pattern;
                            p$g = p$g.color;
                        }
                        if (x0L.strokeStyle != p$g) {
                            if (!Y09) {
                                x0L.stroke();
                                x0L.beginPath();
                                x0L.moveTo(O9r[0], O9r[ + "1"]); ;
                            }
                            x0L.strokeStyle = p$g;
                            w8b[p$g] = 1;
                        }
                    }
                    if (Y09) {
                        Y09 = !1;
                        if (F6$ || K9o <= 0) {
                            x0L.moveTo(V81 ? R7R :  + "0", R1Y);
                            if (v2I) {
                                N3i.push(R7R, R1Y);
                            } else {
                                if (C6_) {
                                    x0L.dashedLineTo(0, R1Y, R7R, R1Y, C6_);
                                } else {
                                    x0L.lineTo(R7R, R1Y);
                                }
                            }
                        } else if (K9o > 0) {
                            x3m = l1j.dataSet[K9o];
                            if (!T3h && x3m.transform) {
                                x3m = x3m.transform;
                            }
                            x15 = x3m[o$h];
                            if (!x15 || isNaN(x15)) {
                                x0L.moveTo(V81 ? R7R : 0, R1Y);
                                if (v2I) {
                                    N3i.push(R7R, R1Y);
                                }
                            } else {
                                x15 = H1N.semiLog ? this.pixelFromPrice(x15, c6s) : (H1N.high - x15) * H1N.multiplier + H1N.top;
                                N1O.B_x(7);
                                q46 = N1O.U9a(q1B, R7R);
                                if (C6_) {
                                    x0L.dashedLineTo(q46, x15, R7R, R1Y, C6_);
                                } else {
                                    x0L.moveTo(q46, x15);
                                    if (v2I) {
                                        N3i.push(q46, x15, R7R, R1Y);
                                    } else {
                                        x0L.lineTo(R7R, R1Y);
                                    }
                                }
                            }
                        }
                    } else {
                        if (F6$) {
                            N1O.B_x(7);
                            Z4P = B$z[N1O.U9a(1, V81)];
                            if (!Z4P)
                                continue;
                            if (!T3h && Z4P.transform) {
                                Z4P = Z4P.transform;
                            }
                            if (V81) {
                                if (C6_) {
                                    x0L.dashedLineTo(O9r[0], O9r[1], R7R, O9r[1], C6_);
                                } else {
                                    x0L.lineTo(R7R, O9r[1]);
                                }
                                x0L.moveTo(R7R, R1Y); ;
                            }
                            if (V81 == B$z.length - ("1" - 0)) {
                                if (C6_) {
                                    N1O.B_x(2);
                                    x0L.dashedLineTo(R7R, R1Y, N1O.U9a(q1B, R7R), R1Y, C6_);
                                } else {
                                    N1O.p86(2);
                                    x0L.lineTo(N1O.U9a(q1B, R7R), R1Y);
                                }
                            }
                        } else {
                            if (C6_) {
                                x0L.dashedLineTo(O9r[0], O9r[1], R7R, R1Y, C6_);
                            } else {
                                if (v2I) {
                                    N3i.push(R7R, R1Y);
                                } else {
                                    x0L.lineTo(R7R, R1Y);
                                }
                            }
                        }
                    }
                    O9r = [R7R, R1Y];
                    if (V81 === B$z.length - 1 && v2I) {
                        N3i.push(R7R, R1Y);
                        B(N3i, v2I, x0L);
                    }
                }
                x0L.stroke();
                this.endClip();
                if (s6z.label && c_3) {
                    p81 = "n";
                    p81 += "oo";
                    p81 += "p";
                    if (H1N.priceFormatter) {
                        O4_ = 529468812;
                        Q31 = 252274682;
                        H9b = 2;
                        for (var Y3i = 1; N1O.Y4l(Y3i.toString(), Y3i.toString().length, 12729) !== O4_; Y3i++) {
                            m_H = H1N.priceFormatter(this, c6s, c_3[o$h], s6z.labelDecimalPlaces);
                            H9b += 2;
                        }
                        if (N1O.Y4l(H9b.toString(), H9b.toString().length, "9759" ^ 0) !== Q31) {
                            m_H = H1N.priceFormatter(this, c6s, c_3[o$h], s6z.labelDecimalPlaces);
                        }
                    } else {
                        m_H = this.formatYAxisPrice(c_3[o$h], c6s, s6z.labelDecimalPlaces);
                    }
                    q8i = this.yaxisLabelStyle;
                    if (c6s.yAxis.yaxisLabelStyle) {
                        q8i = c6s.yAxis.yaxisLabelStyle;
                    }
                    B45 = q8i == p81 ? x0L.strokeStyle : null;
                    this.yAxisLabels.push({
                        src: "plot",
                        "args": [c6s, m_H, c_3.cache[o$h], q8i == "noop" ? "#FFFFFF" : x0L.strokeStyle, B45]
                    });
                }
                return w8b;
            };
            S.prototype.plotMountainChart = function (a7Z, p4f, s6F, z7T) {
                var E8L,
                J2v,
                W4D,
                n3l,
                I2I,
                f9V,
                A5H,
                Y62,
                z2p,
                w23,
                c8P,
                S6O,
                J4O,
                l4O,
                f6W,
                A2Y,
                Y6n,
                l9E,
                F_R,
                s_b,
                c_H;
                E8L = !"1";
                J2v = !({});
                W4D = ![];
                n3l = 0;
                I2I = [];
                if (z7T) {
                    E8L = z7T.skipProjections;
                    J2v = z7T.skipTransform;
                    W4D = z7T.reverse;
                    n3l = z7T.tension;
                }
                f9V = a7Z.chart;
                A5H = this.chart.context;
                Y62 = !!({});
                z2p = a7Z.yAxis.top;
                w23 = a7Z.yAxis.bottom;
                this.startClip(a7Z.name);
                A5H.beginPath();
                c8P = f9V.dataSet.length - f9V.scroll;
                S6O = null;
                J4O = null;
                l4O = a7Z.yAxis;
                f6W = 0;
                for (var D3b = 0; D3b <= p4f.length; D3b++) {
                    A2Y = p4f[D3b];
                    if (!A2Y)
                        continue;
                    if (E8L && A2Y.projection)
                        break;
                    if (!J2v && A2Y.transform) {
                        A2Y = A2Y.transform;
                    }
                    Y6n = A2Y.cache;
                    N1O.p86(2);
                    l9E = N1O.U9a(D3b, c8P);
                    if (l9E < a7Z.cacheLeft || l9E > a7Z.cacheRight || !Y6n[s6F]) {
                        if (!A2Y[s6F] && A2Y[s6F] !== 0)
                            continue;
                        Y6n[s6F] = l4O.semiLog ? this.pixelFromPrice(A2Y[s6F], a7Z) : (l4O.high - A2Y[s6F]) * l4O.multiplier + l4O.top; ;
                    }
                    N1O.B_x(9);
                    var x0G = N1O.U9a(18, 15, 16, 14);
                    f6W = a7Z.left + (D3b + 0.5) * this.layout.candleWidth + this.micropixels - x0G;
                    if (D3b == p4f.length -  + "1") {
                        if (this.extendLastTick) {
                            N1O.B_x(60);
                            var g2a = N1O.f21(20, 5, 20, 6, 3);
                            f6W += this.layout.candleWidth / g2a;
                        }
                        if (z7T.lastTickOffset) {
                            f6W += z7T.lastTickOffset;
                        };
                    }
                    if (S6O === null) {
                        S6O = c8P >= 0 ? "0" >> 64 : f6W;
                    }
                    F_R = Y6n[s6F];
                    if (J4O === null) {
                        J4O = F_R;
                    }
                    if (Y62) {
                        Y62 = !({});
                        if (c8P <= "0" * 1) {
                            A5H.moveTo(S6O, F_R);
                            if (n3l) {
                                I2I.push(S6O, F_R);
                            }
                        } else {
                            s_b = f9V.dataSet[c8P];
                            if (s_b.transform) {
                                s_b = s_b.transform;
                            }
                            c_H = s_b[s6F];
                            c_H = l4O.semiLog ? this.pixelFromPrice(c_H, a7Z) : (l4O.high - c_H) * l4O.multiplier + l4O.top;
                            S6O = f6W - this.layout.candleWidth;
                            A5H.moveTo(S6O, c_H);
                            if (n3l) {
                                I2I.push(S6O, c_H, f6W, F_R);
                            } else {
                                A5H.lineTo(f6W, F_R);
                            }
                        }
                    } else {
                        if (n3l) {
                            I2I.push(f6W, F_R);
                        } else {
                            A5H.lineTo(f6W, F_R);
                        }
                    }
                    if (D3b === p4f.length - 1 && n3l) {
                        I2I.push(f6W, F_R);
                        B(I2I, n3l, A5H);
                    }
                }
                A5H.lineTo(f6W, W4D ? z2p : w23);
                A5H.lineTo(S6O, W4D ? z2p : w23);
                if (W4D) {
                    if (J4O < z2p) {
                        J4O = z2p;
                    }
                } else {
                    if (J4O > w23) {
                        J4O = w23;
                    }
                }
                A5H.lineTo(S6O, J4O);
                A5H.fill();
                A5H.closePath();
                this.endClip();
            };
            S.prototype.drawLineChart = function (L9U, v$y, f41) {
                var H5E,
                k5P,
                l53,
                z1y,
                M0N;
                H5E = "Clo";
                H5E += "se";
                k5P = this.chart.context;
                l53 = this.canvasStyle(v$y);
                if (l53.width && parseInt(l53.width, 10) <= 25) {
                    N1O.p86(1);
                    k5P.lineWidth = Math.max(N1O.f21(0, "1"), R.stripPX(l53.width));
                } else {
                    k5P.lineWidth = 1;
                }
                this.canvasColor(v$y);
                z1y = {
                    skipProjections: !0
                };
                if (L9U.chart.tension) {
                    z1y.tension = L9U.chart.tension;
                }
                if (L9U.chart.lastTickOffset) {
                    z1y.lastTickOffset = L9U.chart.lastTickOffset;
                }
                M0N = this.plotLineChart(L9U, L9U.chart.dataSegment, H5E, z1y, f41);
                k5P.lineWidth = 1;
                return M0N;
            };
            S.prototype.drawMountainChart = function (Y_R, U5r, G80) {
                var U79,
                B2A,
                X2J,
                b_I,
                H9P,
                b3O,
                n56,
                n_k,
                c6z,
                R1p,
                T0X,
                I_u,
                b9g,
                A8L,
                v3z,
                x3Z,
                f7w;
                U79 = this.chart.context;
                N1O.A7M();
                if (!U5r) {
                    U5r = "stx_mountain_chart";
                }
                B2A = this.canvasStyle(U5r);
                if (B2A.width && parseInt(B2A.width,  + "10") <=  + "25") {
                    N1O.B_x(1);
                    U79.lineWidth = Math.max(N1O.U9a(0, "1"), R.stripPX(B2A.width));
                } else {
                    U79.lineWidth =  + "1";
                }
                X2J = this.pixelFromPrice(Y_R.chart.highValue, Y_R);
                if (isNaN(X2J)) {
                    X2J = 0;
                }
                b_I = B2A.backgroundColor;
                H9P = B2A.color;
                if (H9P && !R.isTransparent(H9P)) {
                    b3O = U79.createLinearGradient(0, X2J, 0, Y_R.yAxis.bottom);
                    b3O.addColorStop(0, b_I);
                    b3O.addColorStop(1, H9P);
                    n56 = -218610712;
                    n_k = 320536809;
                    c6z = 2;
                    for (var u2O = "1" ^ 0; N1O.n$d(u2O.toString(), u2O.toString().length, "69362" << 32) !== n56; u2O++) {
                        U79.fillStyle = b3O;
                        c6z += 2;
                    }
                    if (N1O.n$d(c6z.toString(), c6z.toString().length, 77111) !== n_k) {
                        U79.fillStyle = b3O;
                    }
                } else {
                    U79.fillStyle = b_I;
                }
                R1p = {
                    skipProjections: !![]
                };
                if (Y_R.chart.tension) {
                    R1p.tension = Y_R.chart.tension;
                }
                if (Y_R.chart.lastTickOffset) {
                    R1p.lastTickOffset = Y_R.chart.lastTickOffset;
                }
                T0X = parseInt(B2A.padding, "10" - 0);
                I_u = B2A.borderTopColor;
                b9g = null;
                if (I_u && !R.isTransparent(I_u)) {
                    if (T0X && !R.isIE8) {
                        if (!this.scratchContext) {
                            A8L = U79.canvas.cloneNode(!"");
                            this.scratchContext = A8L.getContext("2d");
                            this.scratchContext.canvas = A8L;
                        }
                        this.scratchContext.canvas.height = U79.canvas.height;
                        this.scratchContext.canvas.width = U79.canvas.width;
                        this.scratchContext.drawImage(U79.canvas, 0, 0);
                        U79.clearRect( + "0", 0, U79.canvas.width, U79.canvas.height);
                    }
                }
                this.plotMountainChart(Y_R, Y_R.chart.dataSegment, "Close", R1p);
                if (I_u && !R.isTransparent(I_u)) {
                    if (T0X && !R.isIE8) {
                        U79.save();
                        N1O.p86(0);
                        U79.lineWidth += N1O.f21(T0X, 2);
                        U79.globalCompositeOperation = "destination-out";
                        this.plotLineChart(Y_R, Y_R.chart.dataSegment, "Close", R1p);
                        U79.globalCompositeOperation = "destination-over";
                        U79.scale( + "1" / this.adjustedDisplayPixelRatio, 1 / this.adjustedDisplayPixelRatio);
                        U79.drawImage(this.scratchContext.canvas, 0, "0" - 0);
                        U79.restore();
                    }
                    U79.strokeStyle = I_u;
                    b9g = this.plotLineChart(Y_R, Y_R.chart.dataSegment, "Close", R1p, G80);
                }
                U79.lineWidth = 1;
                N1O.p86(1);
                v3z = -N1O.f21(0, "1407527130");
                x3Z = -1599233275;
                f7w = 2;
                for (var P8f = 1; N1O.Y4l(P8f.toString(), P8f.toString().length, 5230) !== v3z; P8f++) {
                    return b9g;
                }
                if (N1O.Y4l(f7w.toString(), f7w.toString().length, 94397) !== x3Z) {
                    return b9g;
                }
            };
            S.prototype.drawWaveChart = function (y7f) {
                var j6i,
                J2U,
                Z1g,
                c$p,
                O2D,
                o7U,
                l7i,
                V8x,
                S6f,
                A9u,
                P$l,
                v3D,
                d3i,
                X_0,
                x1B;
                j6i = y7f.chart;
                J2U = j6i.dataSegment;
                Z1g = this.chart.context;
                this.startClip(y7f.name);
                Z1g.beginPath();
                c$p = !({});
                O2D = ![];
                o7U = y7f.yAxis.top;
                l7i = y7f.yAxis.bottom;
                V8x = y7f.left + Math.floor(-0.5 * this.layout.candleWidth + this.micropixels);
                for (var y8i = 0; y8i <= J2U.length; y8i++) {
                    V8x += this.layout.candleWidth;
                    S6f = J2U[y8i];
                    if (!S6f)
                        continue;
                    if (S6f.projection)
                        break;
                    if (S6f.transform) {
                        S6f = S6f.transform;
                    }
                    N1O.p86(20);
                    var c$c = N1O.f21(18, 12, 735, 11, 18);
                    N1O.p86(2);
                    var n4W = N1O.U9a(7, 1);
                    A9u = V8x - c$c * this.layout.candleWidth / n4W;
                    P$l = this.pixelFromPrice(S6f.Open, y7f);
                    if (P$l < o7U) {
                        P$l = o7U;
                        if (O2D) {
                            Z1g.moveTo(A9u, P$l);
                            continue;
                        }
                        O2D = !!({});
                    } else if (P$l > l7i) {
                        P$l = l7i;
                        if (O2D) {
                            Z1g.moveTo(A9u, P$l);
                            continue;
                        }
                        O2D = !!({});
                    } else {
                        O2D = !!0;
                    }
                    if (!c$p) {
                        c$p = !![];
                        v3D = j6i.dataSet.length - j6i.scroll;
                        if (v3D <= 0) {
                            Z1g.moveTo(A9u, P$l);
                        } else if (v3D > 0) {
                            N1O.p86(7);
                            d3i = j6i.dataSet[N1O.f21(1, v3D)];
                            if (d3i.transform) {
                                d3i = d3i.transform;
                            }
                            X_0 = d3i.Close;
                            X_0 = y7f.yAxis.semiLog ? this.pixelFromPrice(X_0, y7f) : (y7f.yAxis.high - X_0) * y7f.yAxis.multiplier + o7U;
                            X_0 = Math.min(Math.max(X_0, o7U), l7i);
                            Z1g.moveTo(y7f.left + (y8i -  + "1") * this.layout.candleWidth + this.micropixels, X_0);
                            Z1g.lineTo(A9u, P$l);
                        }
                        Z1g.moveTo(A9u, P$l);
                    } else {
                        Z1g.lineTo(A9u, P$l);
                    }
                    N1O.B_x(8);
                    var t43 = N1O.U9a(60, 74, 18);
                    A9u += this.layout.candleWidth / t43;
                    if (S6f.Open < S6f.Close) {
                        P$l = this.pixelFromPrice(S6f.Low, y7f);
                        if (P$l < o7U) {
                            P$l = o7U;
                        }
                        if (P$l > l7i) {
                            P$l = l7i;
                        }
                        Z1g.lineTo(A9u, P$l);
                        N1O.B_x(50);
                        var O8F = N1O.f21(204, 8, 6, 20);
                        A9u += this.layout.candleWidth / O8F;
                        P$l = this.pixelFromPrice(S6f.High, y7f);
                        if (P$l < o7U) {
                            P$l = o7U;
                        }
                        if (P$l > l7i) {
                            P$l = l7i;
                        }
                        Z1g.lineTo(A9u, P$l);
                    } else {
                        P$l = this.pixelFromPrice(S6f.High, y7f);
                        if (P$l < o7U) {
                            P$l = o7U;
                        }
                        if (P$l > l7i) {
                            P$l = l7i;
                        }
                        Z1g.lineTo(A9u, P$l);
                        A9u += this.layout.candleWidth / ("4" | 0);
                        P$l = this.pixelFromPrice(S6f.Low, y7f);
                        if (P$l < o7U) {
                            P$l = o7U;
                        }
                        if (P$l > l7i) {
                            P$l = l7i;
                        }
                        Z1g.lineTo(A9u, P$l);
                    }
                    N1O.B_x(7);
                    var b5m = N1O.f21(20, 24);
                    A9u += this.layout.candleWidth / b5m;
                    P$l = this.pixelFromPrice(S6f.Close, y7f);
                    if (P$l < o7U) {
                        P$l = o7U;
                    }
                    if (P$l > l7i) {
                        P$l = l7i;
                    }
                    Z1g.lineTo(A9u, P$l);
                }
                x1B = this.canvasStyle("stx_line_chart");
                if (x1B.width && parseInt(x1B.width, 10) <= 25) {
                    Z1g.lineWidth = Math.max(1, R.stripPX(x1B.width));
                } else {
                    Z1g.lineWidth = 1;
                }
                this.canvasColor("stx_line_chart");
                Z1g.stroke();
                Z1g.closePath();
                this.endClip();
                Z1g.lineWidth = 1;
            };
            S.prototype.updateFloatHRLabel = function (p8D) {
                var K96,
                g3B,
                X6r,
                T3k,
                N$F,
                a3K,
                b$d,
                X9k,
                X4D,
                j_I;
                N1O.N7F();
                K96 = "no";
                K96 += "ne";
                g3B = p8D.yaxisLHS.concat(p8D.yaxisRHS);
                X6r = this.crossYActualPos ? this.crossYActualPos : this.cy;
                if (this.floatCanvas.isDirty) {
                    R.clearCanvas(this.floatCanvas, this);
                }
                if (this.controls.crossX.style.display == K96) {
                    return;
                }
                if (this.controls.crossY) {
                    T3k = "p";
                    T3k += "x";
                    N$F = "roundRec";
                    N$F += "t";
                    N$F += "A";
                    N$F += "rrow";
                    a3K = p8D.width;
                    if (this.yaxisLabelStyle == N$F) {
                        a3K -= 7;
                    }
                    this.controls.crossY.style.left = p8D.left + T3k;
                    N1O.B_x(2);
                    this.controls.crossY.style.width = N1O.f21("px", a3K);
                }
                for (var L0e = 0; L0e < g3B.length; L0e++) {
                    b$d = g3B[L0e];
                    X9k = this.valueFromPixel(X6r, p8D, b$d);
                    if (isNaN(X9k))
                        continue;
                    if ((p8D.min || p8D.min === 0) && X9k < p8D.min)
                        continue;
                    if ((p8D.max || p8D.max === 0) && X9k > p8D.max)
                        continue;
                    X4D = null;
                    if (b$d !== p8D.chart.yAxis) {
                        X4D = 0;
                        if (b$d.shadow < 1000) {
                            X4D = 2;
                        }
                        if (b$d.shadow < 5) {
                            X4D =  + "4";
                        }
                        if (b$d.decimalPlaces || b$d.decimalPlaces === 0) {
                            X4D = b$d.decimalPlaces;
                        }
                    }
                    if (b$d.priceFormatter) {
                        X9k = b$d.priceFormatter(this, p8D, X9k, b$d);
                    } else {
                        X9k = this.formatYAxisPrice(X9k, p8D, X4D, b$d);
                    }
                    j_I = this.canvasStyle("stx-float-price");
                    this.createYAxisLabel(p8D, X9k, X6r, j_I.backgroundColor, j_I.color, this.floatCanvas.context, b$d);
                    this.floatCanvas.isDirty = !![];
                }
            };
            S.prototype.headsUpHR = function () {
                var E_$,
                D2D,
                v5D,
                Y1C,
                Q2m,
                C$w,
                K9m,
                F42,
                O58,
                Y1L,
                I5b,
                i24,
                X9l;
                N1O.N7F();
                if (this.runPrepend("headsUpHR", arguments)) {
                    return;
                }
                E_$ = this.currentPanel;
                if (!E_$) {
                    return;
                }
                D2D = E_$.chart;
                this.updateFloatHRLabel(E_$);
                if (this.controls.floatDate && !S.hideDates()) {
                    v5D = this.barFromPixel(this.cx);
                    Y1C = D2D.xaxis[v5D];
                    if (Y1C && Y1C.DT) {
                        if (D2D.xAxis.formatter) {
                            this.controls.floatDate.innerHTML = D2D.xAxis.formatter(Y1C.DT);
                        } else if (this.internationalizer) {
                            Q2m = this.internationalizer.monthDay.format(Y1C.DT);
                            if (!S.isDailyInterval(this.layout.interval)) {
                                N1O.p86(9);
                                var G7w = N1O.U9a(5, 12, 12, 1005);
                                Q2m += ((406.21, G7w) < 490.18 ? (!({}), 64.26) : " ") + this.internationalizer.hourMinute.format(Y1C.DT);
                            } else {
                                Q2m = this.internationalizer.yearMonthDay.format(Y1C.DT);
                            }
                            this.controls.floatDate.innerHTML = Q2m;
                        } else {
                            N1O.p86(40);
                            var k$f = N1O.U9a(5, 39, 12, 20);
                            C$w = Y1C.DT.getMonth() + k$f;
                            if (C$w < 10) {
                                N1O.B_x(2);
                                C$w = N1O.U9a(C$w, (6864, 163.58) <= (149.08, 7500) ? "0" : (1194,  + "6502") < 9049 ? ("a", 0x740) : 2.21e+3);
                            }
                            K9m = Y1C.DT.getDate();
                            if (K9m < 10) {
                                N1O.B_x(2);
                                K9m = N1O.U9a(K9m, 486.78 >= (8350, 3000) ? (0x1656, "P") : (8940, 561) === (365.14, 9565) ? "D" : 2480 > 5410 ? (467.99, 598.94) : "0");
                            }
                            F42 = Y1C.DT.getHours();
                            if (F42 < 10) {
                                N1O.p86(2);
                                F42 = N1O.U9a(F42, 2720 == (7566, 759.73) ? (753.06, 307) !== ( + "886.34", 7034) ? 1760 >= 2110 ? "f" : ("7.25e+3" << 0, 0x26ae) : (2.01e+3, 5.62e+3) : "0");
                            }
                            O58 = Y1C.DT.getMinutes();
                            if (O58 < 10) {
                                N1O.p86(2);
                                O58 = N1O.f21(O58, "0");
                            }
                            if (S.isDailyInterval(this.layout.interval)) {
                                N1O.p86(61);
                                var N8D = N1O.U9a(1966, 2, 3, 3937);
                                N1O.p86(2);
                                var m0Y = N1O.f21(6536, 384);
                                N1O.p86(2);
                                var B00 = N1O.f21(4015, 2008);
                                N1O.B_x(62);
                                var j8s = N1O.U9a(9990, 9, 12, 119904, 9992);
                                N1O.B_x(8);
                                var N_v = N1O.U9a(37620, 35657, 17);
                                N1O.B_x(7);
                                var B3w = N1O.f21(2, 749);
                                this.controls.floatDate.innerHTML = C$w + (N8D < (m0Y, "4810" ^ 0) ? B00 <= (j8s, 614.26) ? N_v : (B3w, "P") : "-") + K9m + "-" + Y1C.DT.getFullYear();
                            } else {
                                N1O.p86(63);
                                this.controls.floatDate.innerHTML = N1O.U9a(K9m, O58, ":", (72.86, 3350) != 3850 ? "-" : (!1, "i"), F42, C$w, ( + "731.14", 7880) <= "910.06" - 0 ? (7.88e+3, "d") : (870.1, 7900) >= ("3620" | 32, "4860" - 0) ? " " : (7061, 8670) < 3753 ? (4.93e+3, "u") : (0x237f, 0x585));
                                Y1L = D2D.xAxis.activeTimeUnit && D2D.xAxis.activeTimeUnit <= R.SECOND || this.layout.timeUnit == "second";
                                I5b = D2D.xAxis.activeTimeUnit && D2D.xAxis.activeTimeUnit <= R.MILLISECOND || this.layout.timeUnit == "millisecond";
                                if (Y1L || I5b) {
                                    i24 = Y1C.DT.getSeconds();
                                    if (i24 < 10) {
                                        N1O.B_x(2);
                                        i24 = N1O.U9a(i24, 78.68 !== (387.02, 6247) ? (5130, 4423) < 872 ? ("H",  + "8.32e+3") : "0" :  + "0x1036");
                                    }
                                    N1O.p86(2);
                                    this.controls.floatDate.innerHTML += N1O.f21(i24,  + "4573" <=  + "8080" ? ":" : 0x19e9);
                                    if (I5b) {
                                        X9l = Y1C.DT.getMilliseconds();
                                        if (X9l < 10) {
                                            N1O.B_x(2);
                                            X9l = N1O.f21(X9l, (75.07, 9062) != 6660 ? 5871 !== (6554, 191.27) ? "0" : 2660 !== 2650 ? (0x3ac,  + "3.06e+3") : (![], 8.91e+3) : (![], !!0));
                                        }
                                        if (X9l < 100) {
                                            N1O.p86(2);
                                            X9l = N1O.f21(X9l, 738.06 == (513.74, 1704) ? !![] : "0");
                                        }
                                        N1O.p86(2);
                                        this.controls.floatDate.innerHTML += N1O.U9a(X9l, ":");
                                    }
                                }
                            }
                        }
                    } else if (Y1C && Y1C.index) {
                        this.controls.floatDate.innerHTML = Y1C.index;
                    } else {
                        this.controls.floatDate.innerHTML = ""; ;
                    }
                }
                this.runAppend("headsUpHR", arguments);
            };
            S.prototype.setCrosshairColors = function () {
                N1O.A7M();
                return; ;
            };
            S.prototype.magnetize = function () {
                var k53,
                A7T,
                v0q,
                k6_,
                P6q,
                s9H,
                E1h,
                l_g,
                L6V,
                y5n,
                x0T,
                K49,
                O8s,
                r7M,
                v15,
                I9h,
                I3e,
                P_q,
                f2N;
                k53 = "magn";
                k53 += "eti";
                k53 += "ze";
                A7T = "f";
                A7T += "reefo";
                A7T += "r";
                A7T += "m";
                v0q = "call";
                v0q += "out";
                this.magnetizedPrice = null;
                if (this.runPrepend("magnetize", arguments)) {
                    return;
                }
                if ((this.currentVectorParameters.vectorType == "annotation" || this.currentVectorParameters.vectorType == v0q) && S.drawingLine) {
                    return;
                }
                if (this.currentVectorParameters.vectorType == "projection") {
                    return;
                }
                if (this.currentVectorParameters.vectorType == A7T) {
                    return;
                }
                k6_ = this.currentPanel;
                if (k6_.name == k6_.chart.name) {
                    P6q = "#";
                    P6q += "0";
                    P6q += "0";
                    P6q += "0000";
                    s9H = "hol";
                    s9H += "lo";
                    s9H += "w_c";
                    s9H += "andle";
                    E1h = k6_.chart;
                    l_g = this.tickFromPixel(S.crosshairX - this.left, E1h);
                    if (l_g > E1h.dataSet.length) {
                        return;
                    }
                    L6V = E1h.dataSet[l_g];
                    if (!L6V) {
                        return;
                    }
                    y5n = this.valueFromPixel(this.cy, k6_);
                    this.magnetizedPrice = L6V.Close;
                    if (this.layout.chartType == "bar" || this.layout.chartType == "candle" || this.layout.chartType == "colored_bar" || this.layout.chartType == s9H || this.layout.chartType == "volume_candle") {
                        x0T = "C";
                        x0T += "lo";
                        x0T += "se";
                        K49 = "Ope";
                        K49 += "n";
                        O8s = [K49, "High", "Low", x0T];
                        r7M = 1000000000;
                        for (var J1R = 0; J1R < O8s.length; J1R++) {
                            v15 = L6V[O8s[J1R]];
                            if (Math.abs(y5n - v15) < r7M) {
                                N1O.p86(7);
                                r7M = Math.abs(N1O.f21(v15, y5n));
                                this.magnetizedPrice = v15;
                            }
                        }
                    }
                    I9h = this.pixelFromTick(l_g, E1h);
                    I3e = this.pixelFromPrice(this.magnetizedPrice, this.currentPanel);
                    P_q = this.chart.tempCanvas.context;
                    P_q.beginPath();
                    P_q.lineWidth = 1;
                    N1O.B_x(30);
                    var Z0m = N1O.U9a(8, 16);
                    N1O.p86(64);
                    var F6p = N1O.f21(16, 3, 6);
                    f2N = Math.max(this.layout.candleWidth, Z0m) / F6p;
                    N1O.B_x(11);
                    P_q.arc(I9h, I3e, f2N, N1O.f21("0", 32), 2 * Math.PI, !!"");
                    P_q.fillStyle = "#FFFFFF";
                    P_q.strokeStyle = P6q;
                    P_q.fill();
                    P_q.stroke();
                    P_q.closePath();
                }
                this.runAppend(k53, arguments);
            };
            S.prototype.positionCrosshairsAtPointer = function () {
                var V2z,
                u8h,
                C9W,
                v$c;
                V2z = "p";
                N1O.N7F();
                V2z += "x";
                if (!this.currentPanel) {
                    return;
                }
                u8h = this.currentPanel.chart;
                C9W = this.container.getBoundingClientRect();
                this.top = C9W.top;
                this.left = C9W.left;
                this.right = this.left + this.width;
                this.bottom = this.top + this.height;
                v$c = this.tickFromPixel(this.backOutX(S.crosshairX), u8h);
                this.cy = this.crossYActualPos = this.backOutY(S.crosshairY);
                this.cx = this.backOutX(S.crosshairX);
                this.controls.crossX.style.left = this.pixelFromTick(v$c, u8h) - 0.5 + "px";
                this.controls.crossY.style.top = this.backOutY(S.crosshairY) + V2z;
                this.updateChartAccessories();
            };
            S.prototype.doDisplayCrosshairs = function () {
                var y2s;
                y2s = "doDisplay";
                y2s += "Crosshai";
                y2s += "rs";
                if (this.runPrepend(y2s, arguments)) {
                    return;
                }
                if (this.displayInitialized) {
                    if (!this.layout.crosshair && (this.currentVectorParameters.vectorType === "" || !this.currentVectorParameters.vectorType)) {
                        this.undisplayCrosshairs();
                    } else if (R.Drawing[this.currentVectorParameters.vectorType] && new R.Drawing[this.currentVectorParameters.vectorType]().dragToDraw) {
                        this.undisplayCrosshairs();
                    } else {
                        if (this.controls.crossX.style.display !== "") {
                            this.controls.crossX.style.display = "";
                            this.controls.crossY.style.display = "";
                            if (this.preferences.magnet && this.currentVectorParameters.vectorType) {
                                R.unappendClassName(this.container, "stx-crosshair-on"); ;
                            } else {
                                R.appendClassName(this.container, "stx-crosshair-on"); ;
                            }
                        }
                        if (this.controls.floatDate && !S.hideDates()) {
                            this.controls.floatDate.style.display = "block";
                        }
                    }
                }
                this.runAppend("doDisplayCrosshairs", arguments);
            };
            S.prototype.undisplayCrosshairs = function () {
                var W9E,
                e8O;
                W9E = "stx-c";
                W9E += "ro";
                W9E += "s";
                W9E += "shair-on";
                e8O = "und";
                e8O += "isplayCross";
                e8O += "hairs";
                if (this.runPrepend(e8O, arguments)) {
                    return;
                }
                if (this.controls.crossX) {
                    if (this.controls.crossX.style.display != "none") {
                        this.controls.crossX.style.display = "none";
                        this.controls.crossY.style.display = "none";
                    }
                }
                if (this.displayInitialized && this.controls.floatDate) {
                    this.controls.floatDate.style.display = "none";
                }
                R.unappendClassName(this.container, W9E);
                if (this.floatCanvas && this.floatCanvas.isDirty) {
                    R.clearCanvas(this.floatCanvas, this);
                }
                this.runAppend("undisplayCrosshairs", arguments);
            };
            S.prototype.modalBegin = function () {
                this.openDialog = "modal";
                N1O.A7M();
                this.undisplayCrosshairs();
            };
            S.prototype.modalEnd = function () {
                this.cancelTouchSingleClick = !"";
                this.openDialog = "";
                this.doDisplayCrosshairs();
            };
            S.prototype.updateChartAccessories = function () {
                var F78,
                a9D,
                l4z,
                v7d,
                N7W,
                z0c,
                T5s;
                if (this.runPrepend("updateChartAccessories", arguments)) {
                    return;
                }
                this.accessoryTimer = null;
                N1O.N7F();
                this.lastAccessoryUpdate = new Date().getTime();
                F78 = this.controls.floatDate;
                if (F78) {
                    a9D = this.currentPanel;
                    if (!a9D) {
                        a9D = this.chart.panel;
                    }
                    if (a9D) {
                        l4z = "p";
                        l4z += "x";
                        v7d = a9D.chart;
                        N7W = this.tickFromPixel(this.backOutX(S.crosshairX), v7d);
                        z0c = this.xAxisAsFooter === !"" ? 0 : this.chart.canvasHeight - a9D.chart.bottom;
                        N1O.p86(2);
                        var G18 = N1O.U9a(2, 0);
                        T5s = this.pixelFromTick(N7W, v7d) - F78.offsetWidth / G18 - 0.5;
                        if (T5s <  + "0") {
                            T5s =  + "0";
                        }
                        N1O.p86(2);
                        F78.style.left = N1O.f21(l4z, T5s);
                        N1O.B_x(2);
                        F78.style.bottom = N1O.U9a("px", z0c);
                    }
                }
                this.headsUpHR();
                this.runAppend("updateChartAccessories", arguments);
            };
            S.prototype.mousemove = function (q7B) {
                var e7B,
                q4e;
                e7B = "mousem";
                e7B += "ove";
                N1O.A7M();
                q4e = q7B ? q7B : event;
                S.crosshairX = q4e.clientX;
                S.crosshairY = q4e.clientY;
                if (this.runPrepend("mousemove", arguments)) {
                    return;
                }
                if (!this.displayInitialized) {
                    return;
                }
                if (this.openDialog !== "") {
                    return;
                }
                this.mousemoveinner(q4e.clientX, q4e.clientY);
                this.runAppend(e7B, arguments);
            };
            S.prototype.setResizeTimer = function (Z$D) {
                var E3p,
                p6w,
                M0B;
                E3p = -255585655;
                p6w = -2138929854;
                M0B = 2;
                for (var L4K = 1; N1O.Y4l(L4K.toString(), L4K.toString().length, 75467) !== E3p; L4K++) {
                    this.resizeDetectMS = Z$D;
                    M0B += 2;
                }
                if (N1O.Y4l(M0B.toString(), M0B.toString().length, 37032) !== p6w) {
                    this.resizeDetectMS = Z$D;
                }
                if (Z$D) {
                    if (this.resizeTimeout) {
                        window.clearInterval(this.resizeTimeout);
                    }
                    this.resizeTimeout = window.setInterval(N_z(this), Z$D);
                } else {
                    if (this.resizeTimeout) {
                        window.clearInterval(this.resizeTimeout);
                    }
                    this.resizeTimeout = null;
                }
                function N_z(e9$) {
                    return function () {
                        N1O.N7F();
                        if (!e9$.chart.canvas) {
                            return;
                        }
                        if (!R.isAndroid) {
                            if (e9$.chart.canvas.height != Math.floor(e9$.devicePixelRatio * e9$.chart.container.clientHeight) || e9$.chart.canvas.width != Math.floor(e9$.devicePixelRatio * e9$.chart.container.clientWidth)) {
                                e9$.resizeChart();
                                return;
                            }
                        }
                    };
                }
            };
            S.prototype.whichYAxis = function (w5n, V$I) {
                var B1R,
                v6Y;
                if (typeof V$I === "undefined") {
                    V$I = this.cx;
                }
                if (w5n) {
                    B1R = w5n.yaxisLHS.concat(w5n.yaxisRHS);
                    for (var K_9 = 0; K_9 < B1R.length; K_9++) {
                        v6Y = B1R[K_9];
                        if (v6Y.left <= V$I && v6Y.left + v6Y.width >= V$I) {
                            return v6Y;
                        }
                    }
                }
                return this.chart.panel.yAxis;
            };
            S[N1O.J2r("e6bf") ? "" : "prototype"][N1O.p9Z("2494") ? "mousemoveinner" : ""] = function (t1c, J6F) {
                N1O.e8A = function (N64) {
                    N1O.A7M();
                    if (N1O)
                        return N1O.r3p(N64);
                };
                N1O.J9C = function (O37) {
                    if (N1O)
                        return N1O.r3p(O37);
                };
                N1O.z58 = function (C2c) {
                    if (N1O && C2c)
                        return N1O.H4Z(C2c);
                };
                N1O.Y3o = function (i2h) {
                    if (N1O)
                        return N1O.H4Z(i2h);
                };
                N1O.N7F();
                var v1V = N1O.B$o("27d7") ? 724277817 : 176255218,
                T05 =  - (N1O.N1b("7e2a") ? 173958656 : 858991027),
                x_H = N1O.Y3o("27ea") ? 774829378 : 537197297;
                if (!(N1O.s0K(N1O.f5h("119a") ? 0 : 2, N1O.R_k("7842") ? false : true, N1O.Y7b("828c") ? 853417 : 941404) !== v1V && N1O.s0K(0, N1O.X0D("1aef") ? true : false, N1O.z58("adb4") ? 429641 : 277913) !== T05 && N1O.s0K(N1O.i9f("da13") ? 16 : 92, N1O.J9C("67e8") ? true : false, 887688) !== x_H)) {
                    N1O.z7n = function (O2s) {
                        if (N1O && O2s)
                            return N1O.H4Z(O2s);
                    };
                    var O1g,
                    e_A,
                    P3r,
                    P0f,
                    S30,
                    s8C,
                    T7x,
                    F$7,
                    j5K,
                    s7V,
                    Z2s,
                    L4m,
                    J3f,
                    u85,
                    j0y,
                    l5i,
                    v2$,
                    t9d,
                    n$V,
                    u0E,
                    f5B,
                    S1T,
                    Y5q,
                    Q3J,
                    U7e,
                    Y59,
                    c6M,
                    Z1r,
                    Y_4,
                    o9G,
                    T0S,
                    p1v,
                    q4v,
                    R7$,
                    L4j;
                    O1g = N1O.c6X("a115") ? "p" : "";
                    O1g += N1O.z7n("75b2") ? "x" : "";
                    if (!this[N1O.e8A("98b8") ? "" : "chart"]["canvas"]) {
                        return;
                    }
                    if (!R["isAndroid"] && !R["isIOS7or8"]) {
                        if (this["chart"]["canvas"]["height"] != Math["floor"](this["devicePixelRatio"] * this["chart"]["container"]["clientHeight"]) || this["chart"]["canvas"]["width"] != Math["floor"](this["devicePixelRatio"] * this["chart"]["container"]["clientWidth"])) {
                            this["resizeChart"]();
                            return;
                        }
                    }
                    if (this["runPrepend"]("mousemoveinner", arguments)) {
                        return;
                    }
                    P3r = this["container"]["getBoundingClientRect"]();
                    this["top"] = P3r["top"];
                    this["left"] = P3r["left"];
                    this["right"] = this["left"] + this["width"];
                    this["bottom"] = this["top"] + this["height"];
                    this["cancelLongHold"] = !!({});
                    this["hasDragged"] = !!"1";
                    S["crosshairX"] = t1c;
                    S["crosshairY"] = J6F;
                    P0f = this["cy"] = this["crossYActualPos"] = this["backOutY"](S["crosshairY"]);
                    S30 = this["cx"] = this["backOutX"](S["crosshairX"]);
                    this["currentPanel"] = this["whichPanel"](P0f);
                    if (!this["currentPanel"]) {
                        this["currentPanel"] = this["chart"]["panel"];
                    }
                    if (!this["currentPanel"]) {
                        return;
                    }
                    s8C = this["currentPanel"]["chart"];
                    if (s8C["dataSet"]) {
                        this["crosshairTick"] = this["tickFromPixel"](S30, s8C);
                        e_A = this["valueFromPixel"](P0f, this["currentPanel"]);
                        T7x = this["currentPanel"]["name"] == "chart" ? this["preferences"]["horizontalCrosshairField"] : this["currentPanel"]["horizontalCrosshairField"];
                        if (T7x && this["crosshairTick"] < s8C["dataSet"]["length"] && this["crosshairTick"] > -1) {
                            e_A = s8C["dataSet"][this["crosshairTick"]][T7x];
                            this["crossYActualPos"] = this["pixelFromPriceTransform"](e_A, this["currentPanel"]);
                        }
                        this["crosshairValue"] = this["adjustIfNecessary"](this["currentPanel"], this["crosshairTick"], e_A);
                    }
                    if (S["crosshairX"] >= this["left"] && S["crosshairX"] <= this["right"] && S["crosshairY"] >= this["top"] && S["crosshairY"] <= this["bottom"]) {
                        S["insideChart"] = !![];
                    } else {
                        S["insideChart"] = !1;
                    }
                    this["overXAxis"] = S["crosshairY"] >= this["top"] + this["chart"]["panel"]["yAxis"]["bottom"] && S["crosshairY"] <= this["top"] + this["chart"]["panel"]["bottom"] && S["insideChart"];
                    this["overYAxis"] = (this["cx"] >= this["currentPanel"]["right"] || this["cx"] <= this["currentPanel"]["left"]) && S["insideChart"];
                    if (this["overXAxis"] || this["overYAxis"] || !S["insideChart"] && !this["grabbingScreen"]) {
                        this["undisplayCrosshairs"]();
                        if (!this["overXAxis"] && !this["overYAxis"]) {
                            return;
                        };
                    }
                    if (!this["displayCrosshairs"] && !S["resizingPanel"]) {
                        this["undisplayCrosshairs"]();
                        return;
                    }
                    if (this["repositioningBaseline"]) {
                        R7$ = this["panels"][this["chart"]["panel"]["name"]];
                        this["chart"]["baseline"]["userLevel"] = this["adjustIfNecessary"](R7$, this["crosshairTick"], this["valueFromPixelUntransform"](this["backOutY"](S["crosshairY"]), R7$));
                        if (Date["now"]() - this["repositioningBaseline"]["lastDraw"] >  + "100") {
                            this["draw"]();
                            this["repositioningBaseline"]["lastDraw"] = Date["now"]();
                        }
                        return;
                    }
                    if (this["grabbingScreen"] && !S["resizingPanel"]) {
                        F$7 = "p";
                        F$7 += "an";
                        if (this["anyHighlighted"]) {
                            R["clearCanvas"](this["chart"]["tempCanvas"], this);
                            this["anyHighlighted"] = !({});
                            for (j5K in this["overlays"]) {
                                this["overlays"][j5K]["highlight"] = !({});
                            }
                            for (j5K in s8C["series"]) {
                                s8C["series"][j5K]["highlight"] = !"1";
                            }
                            this["displaySticky"]();
                        }
                        if (this["preferences"]["magnet"] && this["currentVectorParameters"]["vectorType"]) {
                            R["clearCanvas"](this["chart"]["tempCanvas"], this);
                        }
                        if (this["grabStartX"] == -1) {
                            this["grabStartX"] = S["crosshairX"];
                            this["grabStartScrollX"] = s8C["scroll"];
                        }
                        if (this["grabStartY"] == -1) {
                            this["grabStartY"] = S["crosshairY"];
                            this["grabStartScrollY"] = s8C["panel"]["yAxis"]["scroll"];
                        }
                        s7V = S["crosshairX"] - this["grabStartX"];
                        Z2s = S["crosshairY"] - this["grabStartY"];
                        if (s7V === 0 && Z2s === 0) {
                            return;
                        }
                        if (Math["abs"](s7V) + Math["abs"](Z2s) > 5) {
                            this["grabOverrideClick"] = !"";
                        }
                        if (this["allowZoom"] && this["grabMode"] != F$7 && (this["grabMode"]["indexOf"]("zoom") === 0 || this["overXAxis"] || this["overYAxis"])) {
                            if (this["grabMode"] === "") {
                                J3f = "zoom-";
                                J3f += "x";
                                if (this["overXAxis"]) {
                                    this["grabMode"] = J3f;
                                } else if (this["overYAxis"]) {
                                    this["grabMode"] = "zoom-y";
                                }
                            }
                            if (this["grabMode"] == "zoom-x") {
                                Z2s = 0;
                            } else if (this["grabMode"] == "zoom-y") {
                                s7V = 0;
                            }
                            N1O["p86"](65);
                            L4m = N1O["f21"](0, "25", s7V);
                            u85 = !!"1";
                            if (s8C["scroll"] <= s8C["maxTicks"]) {
                                u85 = !"1";
                            }
                            j0y = this["grabStartCandleWidth"] + L4m;
                            if (j0y < this["minimumCandleWidth"]) {
                                j0y = this["minimumCandleWidth"];
                            }
                            l5i = (this["layout"]["candleWidth"] - j0y) / this["layout"]["candleWidth"];
                            if (l5i > 0.1) {
                                j0y = this["layout"]["candleWidth"] * 0.9;
                            } else if (l5i <  -  + "0.1") {
                                j0y = this["layout"]["candleWidth"] * 1.1;
                            }
                            if (R["ipad"]) {
                                if (Math["round"](this["chart"]["width"] / this["layout"]["candleWidth"] - 0.499) - 1 < S["ipadMaxTicks"] && Math["round"](this["chart"]["width"] / j0y -  + "0.499") - 1 > S["ipadMaxTicks"]) {
                                    return;
                                }
                            }
                            if (this["pinchingCenter"]) {
                                t9d = this["backOutX"](this["pinchingCenter"]);
                                n$V = this["tickFromPixel"](t9d, s8C);
                                this["setCandleWidth"](j0y, s8C);
                                u0E = this["tickFromPixel"](t9d, s8C);
                                N1O["B_x"](7);
                                s8C["scroll"] += Math["floor"](N1O["U9a"](n$V, u0E));
                            } else if (u85) {
                                v2$ = Math["round"](this["chart"]["width"] / j0y - 0.499);
                                if (v2$ != s8C["maxTicks"]) {
                                    this["setCandleWidth"](j0y, s8C);
                                    s8C["scroll"] += Math["round"]((v2$ - s8C["maxTicks"]) / 2);
                                }
                            } else {
                                v2$ = Math["round"](this["chart"]["width"] / j0y - 0.499);
                                if (v2$ != Math["round"](this["chart"]["width"] / this["layout"]["candleWidth"] - 0.499)) {
                                    this["setCandleWidth"](j0y, s8C);
                                    f5B = Math["round"](this["preferences"]["whitespace"] / this["layout"]["candleWidth"]);
                                    s8C["scroll"] = s8C["maxTicks"] - f5B;
                                }
                            }
                            this["layout"]["span"] = null;
                            S1T = this["whichYAxis"](this["grabbingPanel"], this["cx"]);
                            if (this["overYAxis"]) {
                                S1T["zoom"] = Math["round"](this["grabStartZoom"] + Z2s);
                                if (this["grabStartZoom"] < S1T["height"]) {
                                    Y5q = 1911395433;
                                    Q3J = 866237779;
                                    U7e = 2;
                                    for (var S9G = "1" << 0; N1O["Y4l"](S9G["toString"](), S9G["toString"]()["length"], 89289) !== Y5q; S9G++) {
                                        if (S1T["zoom"] >= S1T["height"]) {
                                            N1O["p86"](66);
                                            var N4Q = N1O["f21"](2, 2, 5, 3);
                                            S1T["zoom"] = S1T["height"] - N4Q;
                                        }
                                        U7e += 2;
                                    }
                                    if (N1O["n$d"](U7e["toString"](), U7e["toString"]()["length"], 37555) !== Q3J) {
                                        if (S1T["zoom"] < S1T["height"]) {
                                            S1T["zoom"] = S1T["height"] +  + "5";
                                        }
                                    }
                                } else {
                                    if (S1T["zoom"] <= S1T["height"]) {
                                        N1O["p86"](7);
                                        var s4a = N1O["U9a"](15, 16);
                                        S1T["zoom"] = S1T["height"] + s4a;
                                    }
                                }
                            }
                        } else {
                            Y59 = "m";
                            Y59 += "o";
                            Y59 += "ve";
                            if (this["allowScroll"]) {
                                if (Math["abs"](Z2s) < this["yTolerance"]) {
                                    if (!this["yToleranceBroken"]) {
                                        c6M = 510685537;
                                        Z1r = -7203005;
                                        Y_4 = 2;
                                        for (var d8U = 1; N1O["n$d"](d8U["toString"](), d8U["toString"]()["length"],  + "52512") !== c6M; d8U++) {
                                            Z2s = 0;
                                            Y_4 += 2;
                                        }
                                        if (N1O["n$d"](Y_4["toString"](), Y_4["toString"]()["length"], 83918) !== Z1r) {
                                            Z2s = 5;
                                        }
                                        if (s7V === 0) {
                                            return;
                                        }
                                    }
                                } else {
                                    this["yToleranceBroken"] = !0;
                                }
                                this["grabMode"] = "pan";
                                L4m = Math["round"](s7V / this["layout"]["candleWidth"]);
                                this["microscroll"] = L4m - s7V / this["layout"]["candleWidth"];
                                N1O["p86"](30);
                                var A27 = N1O["U9a"](17, 16);
                                this["micropixels"] = this["layout"]["candleWidth"] * this["microscroll"] * A27;
                                if (this["shift"]) {
                                    L4m *= 5;
                                }
                                s8C["scroll"] = this["grabStartScrollX"] + L4m;
                                if (s8C["scroll"] < 1) {
                                    s8C["scroll"] = 1;
                                }
                                if (s8C["scroll"] >= s8C["maxTicks"]) {
                                    this["preferences"]["whitespace"] = this["initialWhitespace"];
                                } else {
                                    this["preferences"]["whitespace"] = (s8C["maxTicks"] - s8C["scroll"]) * this["layout"]["candleWidth"];
                                }
                                if (this["currentPanel"]["name"] == s8C["name"]) {
                                    o9G = -938252375;
                                    T0S = 1652961235;
                                    p1v = 2;
                                    for (var H_q = 1; N1O["Y4l"](H_q["toString"](), H_q["toString"]()["length"], 39288) !== o9G; H_q++) {
                                        this["chart"]["panel"]["yAxis"]["scroll"] = this["grabStartScrollY"] - Z2s;
                                        p1v += 2;
                                    }
                                    if (N1O["Y4l"](p1v["toString"](), p1v["toString"]()["length"], 89170) !== T0S) {
                                        this["chart"]["panel"]["yAxis"]["scroll"] = this["grabStartScrollY"] - Z2s;
                                    }
                                    this["chart"]["panel"]["yAxis"]["scroll"] = this["grabStartScrollY"] + Z2s;
                                }
                            }
                            this["dispatch"](Y59, {
                                stx: this,
                                panel: this["currentPanel"],
                                x: this["cx"],
                                y: this["cy"],
                                grab: this["grabbingScreen"]
                            });
                        }
                        q4v = function (m9H) {
                            var T6g = 1194904858,
                            v7a = -1487633188,
                            H2E = -1252532736;
                            if (N1O.A6c(0, false, 760447) === T6g || N1O.s0K(0, false, 171360) === v7a || N1O.A6c(16, true, 869660) === H2E) {
                                return function () {
                                    var T2B = 1933151795,
                                    U8j = 1052327652,
                                    l1Q = -949554411;
                                    if (N1O.A6c(0, false, 541389) === T2B || N1O.s0K(0, false, 972401) === U8j || N1O.A6c(16, true, 262460) === l1Q) {
                                        m9H["draw"]();
                                    }
                                };
                            }
                        };
                        if (S["useAnimation"]) {
                            window["requestAnimationFrame"](q4v(this)); ;
                        } else {
                            this["draw"]();
                        }
                        if (this["activeDrawing"]) {
                            R["clearCanvas"](this["chart"]["tempCanvas"], this);
                            this["activeDrawing"]["render"](this["chart"]["tempCanvas"]["context"]);
                            this["activeDrawing"]["measure"]();
                        }
                        this["undisplayCrosshairs"]();
                        return;
                    } else {
                        this["grabMode"] = "";
                    }
                    this["grabbingPanel"] = this["currentPanel"];
                    if (this["overXAxis"] || this["overYAxis"]) {
                        return;
                    }
                    this["controls"]["crossX"]["style"]["left"] = this["pixelFromTick"](this["crosshairTick"], s8C) - 0.5 + O1g;
                    this["controls"]["crossY"]["style"]["top"] = this["crossYActualPos"] + "px";
                    this["setCrosshairColors"]();
                    if (S["insideChart"] && !S["resizingPanel"]) {
                        if (!R["Drawing"][this["currentVectorParameters"]["vectorType"]] || !new R["Drawing"][this["currentVectorParameters"]["vectorType"]]()["dragToDraw"]) {
                            this["doDisplayCrosshairs"]();
                        }
                        if (this["accessoryTimer"] !== null) {
                            clearTimeout(this["accessoryTimer"]);
                        }
                        if (S["drawingLine"] || !R["touchDevice"]) {
                            this["updateChartAccessories"]();
                        } else {
                            if (new Date()["getTime"]() - this["lastAccessoryUpdate"] > 100) {
                                this["updateChartAccessories"]();
                            }
                            this["accessoryTimer"] = setTimeout((function (F0f) {
                                        var x7Z = -452247686,
                                        I8e = -670377803,
                                        d4J = 29412299;
                                        if (N1O.s0K(0, false, 860368) === x7Z || N1O.s0K(0, false, 413479) === I8e || N1O.A6c(16, true, 780223) === d4J) {
                                            return function () {
                                                var n$6 = -1509688843,
                                                S4j = 1506639780,
                                                D4j = -1802973641;
                                                if (N1O.A6c(0, false, 267049) === n$6 || N1O.s0K(0, false, 669936) === S4j || N1O.A6c(16, true, 687693) === D4j) {
                                                    F0f["updateChartAccessories"]();
                                                }
                                            };
                                        }
                                    })(this), 10);
                        }
                    } else {
                        this["undisplayCrosshairs"]();
                    }
                    if (this["repositioningDrawing"]) {
                        R7$ = this["panels"][this["repositioningDrawing"]["panelName"]];
                        e_A = this["adjustIfNecessary"](R7$, this["crosshairTick"], this["valueFromPixelUntransform"](this["backOutY"](S["crosshairY"]), R7$));
                        if (this["preferences"]["magnet"] && this["magnetizedPrice"] && R7$["name"] == R7$["chart"]["name"]) {
                            e_A = this["adjustIfNecessary"](R7$, this["crosshairTick"], this["magnetizedPrice"]);
                        }
                        R["clearCanvas"](this["chart"]["tempCanvas"], this);
                        this["repositioningDrawing"]["reposition"](this["chart"]["tempCanvas"]["context"], this["repositioningDrawing"]["repositioner"], this["crosshairTick"], e_A);
                        if (this["repositioningDrawing"]["measure"]) {
                            this["repositioningDrawing"]["measure"]();
                        }
                    } else if (S["drawingLine"]) {
                        if (this["activeDrawing"]) {
                            R7$ = this["panels"][this["activeDrawing"]["panelName"]];
                            e_A = this["adjustIfNecessary"](R7$, this["crosshairTick"], this["valueFromPixelUntransform"](this["backOutY"](S["crosshairY"]), R7$));
                            if (this["preferences"]["magnet"] && this["magnetizedPrice"] && R7$["name"] == R7$["chart"]["name"]) {
                                e_A = this["adjustIfNecessary"](R7$, this["crosshairTick"], this["magnetizedPrice"]);
                            }
                            R["clearCanvas"](this["chart"]["tempCanvas"], this);
                            this["activeDrawing"]["move"](this["chart"]["tempCanvas"]["context"], this["crosshairTick"], e_A);
                            if (this["activeDrawing"]["measure"]) {
                                this["activeDrawing"]["measure"]();
                            }
                        }
                    } else if (S["resizingPanel"]) {
                        this["resizePanels"]();
                        this["drawTemporaryPanel"]();
                    } else if (S["insideChart"]) {
                        this["findHighlights"]();
                    }
                    if (S["insideChart"]) {
                        L4j = "m";
                        L4j += "o";
                        L4j += "ve";
                        this["dispatch"](L4j, {
                            stx: this,
                            panel: this["currentPanel"],
                            x: this["cx"],
                            y: this["cy"],
                            grab: this["grabbingScreen"]
                        });
                        this["findHighlights"]();
                    }
                    if (this["preferences"]["magnet"] && this["currentVectorParameters"]["vectorType"]) {
                        if (!S["drawingLine"] && !this["anyHighlighted"]) {
                            R["clearCanvas"](this["chart"]["tempCanvas"]);
                        }
                        // MaRa: CIQ Hack - Part 2 - Sensitivity, required to prevent re-highlight during repositioning
                        // --- Start ---
                        if (!this.repositioningDrawing()) {
                            this["magnetize"]();
                        }
                        // --- End ---
                        // --- Start Deletion ---
                        // this["magnetize"]();
                        // --- End Deletion ---
                    }
                    this["runAppend"]("mousemoveinner", arguments);
                }
            };
            S.prototype.findHighlights = function (z5w, X9K) {
                var i9B,
                v79,
                b8a,
                e20,
                C1K,
                g33,
                g0m,
                i$k,
                X3b,
                u8W,
                M1p,
                y7S,
                Z9J,
                c6Z,
                Q93,
                q4_,
                I6X,
                D_7,
                O6i,
                Z_2,
                M9S,
                q3l,
                M1A,
                L6M;
                i9B = 10;
                if (z5w) {
                    i9B = 30;
                }
                v79 = this.cy;
                b8a = this.cx;
                if (!this.currentPanel) {
                    return;
                }
                if (this.activeDrawing) {
                    return;
                }
                e20 = this.currentPanel.chart;
                this.anyHighlighted = !({});
                if (this.preferences.magnet && !this.activeDrawing) {
                    R.clearCanvas(this.chart.tempCanvas, this);
                }
                N1O.A7M();
                C1K = !!0;
                g33 = null;
                g0m = ["", "", !!({}), null, "drawing"];
                i$k = {
                    // MaRa: CIQ Hack - Part 2 - Sensitivity
                    // --- Start ---
                    x0: this.floatTickFromPixel(b8a - i9B, e20),
                    x1: this.floatTickFromPixel(b8a + i9B, e20),
                    // --- Start Deletion ---
                    // x0: this.tickFromPixel(b8a - i9B, e20),
                    // x1: this.tickFromPixel(b8a + i9B, e20),
                    // --- End Deletion ---
                    y0: this.valueFromPixelUntransform(v79 - i9B, this.currentPanel),
                    y1: this.valueFromPixelUntransform(v79 + i9B, this.currentPanel)
                };
                for (var X3u = "0" * 1; X3u < this.drawingObjects.length; X3u++) {
                    X3b = this.drawingObjects[X3u];
                    if (X3b.permanent)
                        continue;
                    u8W = X3b.highlighted;
                    M1p = X3b.panelName == this.currentPanel.name;
                    X3b.repositioner = X3b.intersected(this.crosshairTick, this.crosshairValue, i$k);
                    M1p = M1p && X3b.repositioner;
                    if (!X9K && M1p) {
                        if (u8W) {
                            g33 = X3b;
                        } else if (u8W != X3b.highlight(!!({}))) {
                            if (!g33) {
                                g33 = X3b;
                            }
                            C1K = !"";
                        }
                        this.anyHighlighted = !![];
                    } else {
                        if (u8W != X3b.highlight(!!0)) {
                            C1K = !!"1";
                        }
                    }
                }
                y7S = !!"";
                for (Z9J in this.overlays) {
                    c6Z = this.overlays[Z9J];
                    c6Z.prev = c6Z.highlight;
                    c6Z.highlight = !!"";
                }
                for (Z9J in e20.seriesRenderers) {
                    q4_ = e20.seriesRenderers[Z9J];
                    for (var w2n = 0; w2n < q4_.seriesParams.length; w2n++) {
                        Q93 = q4_.seriesParams[w2n];
                        Q93.prev = Q93.highlight;
                        Q93.highlight = ![];
                    }
                }
                if (!X9K) {
                    I6X = this.barFromPixel(b8a);
                    if (I6X < e20.dataSegment.length) {
                        for (Z9J in this.overlays) {
                            c6Z = this.overlays[Z9J];
                            if (c6Z.panel != this.currentPanel.name)
                                continue;
                            if (c6Z.libraryEntry.isHighlighted && c6Z.libraryEntry.isHighlighted(this, b8a, v79)) {
                                c6Z.highlight = !![];
                                this.anyHighlighted = !!({});
                                continue;
                            }
                            O6i = e20.dataSegment[I6X];
                            if (!O6i)
                                continue;
                            for (var F$d in this.overlays[Z9J].outputMap) {
                                Z_2 = O6i[F$d];
                                D_7 =  + "0";
                                if (this.currentPanel.name == e20.name) {
                                    D_7 = this.pixelFromPriceTransform(Z_2, this.currentPanel);
                                } else {
                                    D_7 = this.pixelFromPrice(Z_2, this.currentPanel);
                                }
                                if (v79 - i9B < D_7 && v79 + i9B > D_7) {
                                    c6Z.highlight = !!({});
                                    this.anyHighlighted = !![];
                                    break;
                                }
                            }
                            if (c6Z.highlight)
                                break; ;
                        }
                        for (Z9J in e20.seriesRenderers) {
                            M9S = e20.seriesRenderers[Z9J];
                            if (!M9S.params.highlightable)
                                continue;
                            for (var R_O =  + "0"; R_O < M9S.seriesParams.length; R_O++) {
                                q3l = "s";
                                q3l += "tep";
                                Q93 = M9S.seriesParams[R_O];
                                D_7 = M9S.caches[Q93.field] && M9S.caches[Q93.field][I6X];
                                if (!D_7 && D_7 !== 0)
                                    continue;
                                if (v79 - i9B < D_7 && v79 + i9B > D_7) {
                                    Q93.highlight = !!({});
                                    this.anyHighlighted = !!({});
                                } else if ((M9S.params.subtype == "step" || Q93.type == q3l) && I6X > 0) {
                                    M1A = M9S.caches[Q93.field] && M9S.caches[Q93.field][I6X - 1];
                                    if ((M1A || M1A === 0) && (v79 > D_7 && v79 < M1A) || v79 < D_7 && v79 > M1A) {
                                        Q93.highlight = !"";
                                        this.anyHighlighted = !"";
                                    }
                                }
                            }
                        }
                    }
                }
                for (Z9J in this.overlays) {
                    c6Z = this.overlays[Z9J];
                    if (c6Z.highlight) {
                        this.anyHighlighted = !!"1";
                        g0m = [c6Z.inputs.display ? c6Z.inputs.display : c6Z.name, null, null, c6Z.permanent, "study"];
                        g33 = null;
                    }
                    if (c6Z.prev != c6Z.highlight) {
                        C1K = !!({});
                    }
                }
                for (Z9J in e20.seriesRenderers) {
                    L6M = e20.seriesRenderers[Z9J];
                    if (!L6M.params.highlightable)
                        continue;
                    for (var b$K = 0; b$K < L6M.seriesParams.length; b$K++) {
                        Q93 = L6M.seriesParams[b$K];
                        if (Q93.highlight) {
                            this.anyHighlighted = !!"1";
                            g0m = [Q93.display, Q93.color, !"1", Q93.permanent, "series"];
                            g33 = null;
                        }
                        if (Q93.prev != Q93.highlight) {
                            C1K = !!"1";
                        }
                    }
                }
                if (C1K) {
                    this.draw();
                    this.displaySticky.apply(this, g0m);
                    this.clearMeasure();
                    if (g33) {
                        g33.measure();
                    }
                }
                if (!this.anyHighlighted) {
                    this.setMeasure();
                }
            };
            S.prototype.positionSticky = function (f1t) {
                var q85,
                n2K,
                L8T;
                q85 = "p";
                q85 += "x";
                n2K = Math.max(this.cy - f1t.offsetHeight -  + "60", 0);
                L8T = Math.min(this.chart.canvasWidth - (this.cx - 50), this.chart.canvasWidth - f1t.offsetWidth);
                N1O.B_x(2);
                f1t.style.top = N1O.U9a("px", n2K);
                N1O.B_x(2);
                f1t.style.right = N1O.U9a(q85, L8T);
            };
            S.prototype.displaySticky = function (V3H, L0D, f9e, j80, g8V) {
                var y0l,
                r5s,
                L6R,
                E49,
                Q4X,
                q4U,
                v0N,
                W1b,
                V4K,
                z0R,
                q0i,
                I5_,
                A1s,
                r2q,
                B2p,
                K$q,
                e0_,
                L9P,
                w6h;
                y0l = this.controls.mSticky;
                if (!y0l) {
                    return;
                }
                r5s = k("#mStickyInterior", y0l);
                if (!r5s) {
                    return;
                }
                L6R = k("#overlayTrashCan", y0l);
                E49 = k(".overlayEdit", y0l);
                Q4X = k("#mouseDeleteInstructions", y0l);
                if (!f9e && !V3H) {
                    r5s.innerHTML = "";
                    y0l.style.display = "none";
                    if (R.touchDevice) {
                        q4U = "n";
                        q4U += "o";
                        q4U += "n";
                        q4U += "e";
                        if (L6R) {
                            L6R.style.display = q4U;
                        }
                        if (E49) {
                            E49.style.display = "none";
                        }
                    } else if (!R.touchDevice) {
                        v0N = "n";
                        v0N += "o";
                        v0N += "n";
                        v0N += "e";
                        if (Q4X) {
                            Q4X.style.display = v0N;
                        }
                    }
                } else {
                    W1b = "#m";
                    W1b += "StickyRightClick";
                    if (!V3H) {
                        V3H = "";
                    }
                    if (f9e && !V3H) {
                        r5s.style.backgroundColor = "";
                        r5s.style.color = "";
                        r5s.style.display = "none";
                    } else if (L0D) {
                        r5s.style.backgroundColor = L0D;
                        N1O.B_x(16);
                        V4K = -N1O.f21("1422813749", 0);
                        z0R = -1726932913;
                        q0i = 2;
                        for (var q9O = 1; N1O.n$d(q9O.toString(), q9O.toString().length, 11168) !== V4K; q9O++) {
                            I5_ = "inlin";
                            I5_ += "e-blo";
                            I5_ += "c";
                            I5_ += "k";
                            r5s.style.color = R.chooseForegroundColor(L0D);
                            r5s.style.display = I5_;
                            q0i += 2;
                        }
                        if (N1O.n$d(q0i.toString(), q0i.toString().length, 80524) !== z0R) {
                            r5s.style.color = R.chooseForegroundColor(L0D);
                            r5s.style.display = "";
                        }
                    } else {
                        A1s = "inline-bloc";
                        A1s += "k";
                        r5s.style.backgroundColor = "";
                        r5s.style.color = "";
                        r5s.style.display = A1s;
                    }
                    r5s.innerHTML = V3H;
                    if (g8V) {
                        N1O.B_x(2);
                        k(W1b, y0l).className = N1O.f21(g8V, "rightclick_");
                    }
                    r2q = -2094717717;
                    B2p = 1331101989;
                    K$q = 2;
                    for (var Z9Y = 1; N1O.n$d(Z9Y.toString(), Z9Y.toString().length,  + "87257") !== r2q; Z9Y++) {
                        y0l.style.display = "";
                        this.positionSticky(y0l);
                        K$q += 2;
                    }
                    if (N1O.Y4l(K$q.toString(), K$q.toString().length, 95722) !== B2p) {
                        e0_ = "in";
                        e0_ += "lin";
                        e0_ += "e-bloc";
                        e0_ += "k";
                        y0l.style.display = e0_;
                        this.positionSticky(y0l);
                    }
                    if (j80) {
                        L9P = "no";
                        L9P += "n";
                        L9P += "e";
                        if (L6R) {
                            L6R.style.display = L9P;
                        }
                        if (E49) {
                            E49.style.display = "none";
                        }
                        if (Q4X) {
                            Q4X.style.display = "none";
                        }
                    } else if (R.touchDevice) {
                        if (L6R) {
                            L6R.style.display = "inline-block";
                        }
                        if (E49) {
                            E49.style.display = "inline-block";
                        }
                        if (Q4X) {
                            Q4X.style.display = "none";
                        }
                    } else if (!R.touchDevice) {
                        w6h = "blo";
                        w6h += "ck";
                        if (Q4X) {
                            Q4X.style.display = w6h;
                        }
                    }
                }
            };
            S.prototype.setMeasure = function (D7a, D8B, S0T, f_n, W35) {
                var P4i,
                s$H,
                h8b,
                Z1i,
                v$t,
                Y2w,
                F1x,
                E9c,
                l4b,
                s4$,
                V9_;
                P4i = "s";
                P4i += "etMe";
                P4i += "asure";
                if (this.runPrepend(P4i, arguments)) {
                    return;
                }
                s$H = U("mMeasure");
                h8b = "";
                if (!D7a) {
                    if (s$H && s$H.className != "measureUnlit") {
                        s$H.className = "measureUnlit";
                    }
                    if (!this.anyHighlighted && this.currentVectorParameters.vectorType === "") {
                        this.clearMeasure();
                    }
                } else {
                    Z1i = "Bar";
                    Z1i += "s";
                    v$t = Math.round(Math.abs(D7a - D8B) * this.chart.roundit) / this.chart.roundit;
                    if (this.internationalizer) {
                        h8b += this.internationalizer.numbers.format(v$t);
                    } else {
                        h8b += v$t;
                    }
                    N1O.p86(67);
                    Y2w = N1O.U9a(D7a, D7a, D8B);
                    if (Math.abs(Y2w) > 0.1) {
                        N1O.p86(0);
                        Y2w = Math.round(N1O.f21(100, Y2w));
                    } else if (Math.abs(Y2w) > 0.01) {
                        N1O.B_x(68);
                        var T96 = N1O.f21(2, 1625, 996, 13000);
                        Y2w = Math.round(Y2w * T96) / ("10" ^ 0);
                    } else {
                        N1O.B_x(69);
                        var C_k = N1O.U9a(3, 20, 92, 160, 12);
                        Y2w = Math.round(Y2w *  + "10000") / C_k;
                    }
                    if (this.internationalizer) {
                        N1O.p86(24);
                        Y2w = this.internationalizer.percent.format(N1O.U9a(100, Y2w));
                    } else {
                        N1O.p86(2);
                        Y2w = N1O.U9a((876.37, 809) !== 4140 ? (416.28,  + "3830") > (6970,  + "7570") ? ("2.40e+3" << 32, "H") : 7448 >= 6872 ? "%" : (0xa05, !!1) : (420.14, 2.21e+3), Y2w);
                    }
                    N1O.B_x(35);
                    h8b += N1O.f21(561 == 584.1 ? 5710 >= "169.96" - 0 ? (6760, 4580) <=  + "8093" ? "o" : 7.58e+3 : "Q" : ")", " (", Y2w);
                    N1O.B_x(7);
                    F1x = Math.abs(N1O.f21(S0T, f_n));
                    N1O.B_x(70);
                    var R5C = N1O.f21(11, 173, 14, 18);
                    F1x = Math.round(F1x) + R5C;
                    E9c = this.translateIf(Z1i);
                    N1O.p86(71);
                    h8b += N1O.f21(731.63 !== ( + "7516", 288.82) ? " " : (5470, "7704" << 64) != (514.93, 409.55) ? 0x10 : (!!({}), !1), E9c, F1x, " ");
                    if (s$H) {
                        l4b = "meas";
                        l4b += "ureL";
                        l4b += "i";
                        l4b += "t";
                        if (s$H.className != "measureLit") {
                            s$H.className = l4b;
                        }
                        s$H.innerHTML = h8b;
                    }
                }
                if (this.activeDrawing) {
                    return;
                }
                s$H = this.controls.mSticky;
                if (s$H) {
                    if (W35) {
                        s4$ = "inl";
                        s4$ += "ine-block";
                        s$H.style.display = s4$;
                        s$H.children[ + "0"].style.display = "inline-block";
                        if (D7a) {
                            s$H.children[0].innerHTML = h8b; ;
                        }
                        this.positionSticky(s$H);
                    } else {
                        V9_ = "n";
                        V9_ += "one";
                        s$H.style.display = V9_;
                        s$H.children[0].innerHTML = "";
                    }
                }
                this.runAppend("setMeasure", arguments);
            };
            S.prototype.clearMeasure = function () {
                N1O.A7M();
                var W1p,
                w2$;
                W1p = "mM";
                W1p += "e";
                W1p += "asure";
                w2$ = U(W1p);
                if (w2$) {
                    if (w2$.className != "measureUnlit") {
                        w2$.className = "measureUnlit";
                    }
                    w2$.innerHTML = "";
                }
            };
            S.prototype.drawTemporaryPanel = function () {
                var J50,
                S8N;
                N1O.p86(45);
                var i8j = N1O.U9a(16, 7, 6);
                J50 = Math.round(S.resizingPanel.right - i8j) + 0.5;
                R.clearCanvas(this.chart.tempCanvas, this);
                S8N = S.crosshairY - this.top;
                this.plotLine(S.resizingPanel.left, J50, S8N, S8N, this.canvasStyle("stx_panel_drag"), "segment", this.chart.tempCanvas.context, !1, {});
                N1O.p86(72);
                var G9f = N1O.U9a(30, 9, 18, 12, 6640);
                S.resizingPanel.handle.style.top = S8N - S.resizingPanel.handle.offsetHeight / G9f + "px";
            };
            S.prototype.setTrashCan = function () {
                N1O.A7M();
                var I79,
                a$_,
                j1l;
                if (R.touchDevice) {
                    I79 = this.controls.mSticky;
                    if (I79) {
                        a$_ = "n";
                        a$_ += "o";
                        a$_ += "n";
                        a$_ += "e";
                        j1l = "n";
                        j1l += "on";
                        j1l += "e";
                        I79.style.display = "inline-block";
                        I79.children[0].style.display = j1l;
                        I79.children[ + "1"].style.display = "inline-block";
                        if (I79.children["2" ^ 0]) {
                            I79.children[2].style.display = a$_;
                        }
                        N1O.p86(61);
                        var j9A = N1O.U9a(4, 20, 17, 320);
                        I79.style.top = this.backOutY(S.crosshairY) - j9A + "px";
                        N1O.p86(73);
                        var v7$ = N1O.U9a(2, 322, 17, 17, 3);
                        I79.style.right = this.chart.canvasWidth - (this.backOutX(S.crosshairX) - v7$) + "px";
                    }
                }
            };
            S.prototype.pixelFromBar = function (B6N, S5i) {
                var E0C;
                if (!S5i) {
                    S5i = this.chart;
                }
                E0C = 0;
                if (this.chart.dataSegment && this.chart.dataSegment[B6N] && this.chart.dataSegment[B6N].leftOffset) {
                    E0C = this.chart.dataSegment[B6N].leftOffset;
                } else {
                    E0C = (B6N + 0.5) * this.layout.candleWidth;
                }
                N1O.p86(36);
                var x7M = N1O.f21(0, 16, 17);
                E0C = S5i.panel.left + Math.floor(E0C + this.micropixels) - x7M;
                return E0C;
            };
            S.prototype.barFromPixel = function (V2A, E4l) {
                var i0N,
                r79,
                v7G,
                Z2N,
                z3v,
                Y6f,
                b6q,
                t1u,
                z09;
                if (!E4l) {
                    E4l = this.chart;
                }
                if (this.layout.chartType == "volume_candle" && this.chart.dataSegment) {
                    i0N = V2A - E4l.panel.left - this.micropixels;
                    r79 = 2;
                    v7G = Math.round(this.chart.dataSegment.length / r79);
                    N1O.B_x(7);
                    var P$p = N1O.U9a(9, 10);
                    N1O.p86(74);
                    var G5M = N1O.U9a(16, 10, 0, 139, 2);
                    N1O.p86(75);
                    var B2n = N1O.U9a(4, 1, 4, 4, 6);
                    Z2N = this.chart.dataSegment[this.chart.dataSegment.length - P$p].leftOffset + this.chart.dataSegment[this.chart.dataSegment.length - G5M].candleWidth / B2n;
                    if (i0N > Z2N) {
                        z3v = 72611090;
                        N1O.p86(17);
                        Y6f = -N1O.f21("1362592371", 0);
                        b6q = 2;
                        for (var w2m = 1; N1O.Y4l(w2m.toString(), w2m.toString().length, 23665) !== z3v; w2m++) {
                            return this.chart.dataSegment.length + Math.floor((V2A - Z2N - E4l.panel.left - this.micropixels) / this.layout.candleWidth);
                        }
                        if (N1O.Y4l(b6q.toString(), b6q.toString().length,  + "95536") !== Y6f) {
                            return this.chart.dataSegment.length * Math.floor(V2A * Z2N / E4l.panel.left * this.micropixels * this.layout.candleWidth);
                        }
                    } else {
                        for (var i8D = 1; i8D < this.chart.dataSegment.length; i8D++) {
                            r79 *= 2;
                            if (!this.chart.dataSegment[v7G])
                                break;
                            N1O.p86(76);
                            var o7Y = N1O.f21(58, 16, 6, 6);
                            t1u = this.chart.dataSegment[v7G].leftOffset - this.chart.dataSegment[v7G].candleWidth / o7Y;
                            z09 = this.chart.dataSegment[v7G].leftOffset + this.chart.dataSegment[v7G].candleWidth / 2;
                            if (v7G === 0 || i0N >= t1u && i0N < z09)
                                break;
                            else if (i0N < t1u) {
                                v7G -= Math.max(1, Math.round(this.chart.dataSegment.length / r79));
                            } else {
                                v7G += Math.max(1, Math.round(this.chart.dataSegment.length / r79));
                            }
                            v7G = Math.max(0, Math.min(this.chart.dataSegment.length - 1, v7G));
                        }
                        if (!this.chart.dataSegment[v7G]) {
                            for (i8D = 0; i8D < this.chart.dataSegment.length; i8D++) {
                                if (!this.chart.dataSegment[i8D])
                                    continue;
                                if (i0N < this.chart.dataSegment[i8D].leftOffset - this.chart.dataSegment[i8D].candleWidth / 2) {
                                    N1O.B_x(7);
                                    return Math.max(0, N1O.f21(1, i8D));
                                } else if (i0N < this.chart.dataSegment[i8D].leftOffset + this.chart.dataSegment[i8D].candleWidth / ("2" >> 32)) {
                                    return i8D;
                                } else if (i0N >= this.chart.dataSegment[i8D].leftOffset + this.chart.dataSegment[i8D].candleWidth / 2) {
                                    N1O.B_x(2);
                                    return N1O.U9a(1, i8D);
                                }
                            }
                        }
                    }
                    return v7G;
                } else {
                    return Math.floor((V2A - E4l.panel.left - this.micropixels) / this.layout.candleWidth);
                }
            };
            // MaRa: CIQ Hack - Part 2 - Sensitivity
            // Sensitivity, for some reason need to shift by candlewidth / 2
            // Start
            S.prototype.floatTickFromPixel = function (k2W, J2W) {
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
            S.prototype.tickFromPixel = function (O5l, Q7b) {
                var U4q,
                w8W;
                U4q = "volume_cand";
                U4q += "le";
                if (!Q7b) {
                    Q7b = this.chart;
                }
                N1O.N7F();
                N1O.p86(50);
                var o1Z = N1O.f21(309, 10, 12, 19);
                w8W = Q7b.dataSet.length - Q7b.scroll + o1Z;
                if (this.layout.chartType == U4q) {
                    w8W += this.barFromPixel(O5l, Q7b);
                } else {
                    w8W += Math.floor((O5l - Q7b.panel.left - this.micropixels) / this.layout.candleWidth);
                }
                return w8W;
            };
            S.prototype.pixelFromTick = function (J1m, E3T) {
                var M3B,
                n4H,
                L32,
                O4T,
                M0V,
                N9c;
                if (!E3T) {
                    E3T = this.chart;
                }
                M3B = 1569847360;
                n4H = -817114091;
                L32 =  + "2";
                for (var z45 =  + "1"; N1O.n$d(z45.toString(), z45.toString().length, 92014) !== M3B; z45++) {
                    N1O.p86(77);
                    var h15 = N1O.U9a(19, 19, 4, 13);
                    O4T = (J1m % E3T.dataSet.length - E3T.scroll) % h15;
                    L32 += 2;
                }
                if (N1O.n$d(L32.toString(), L32.toString().length, "57424" - 0) !== n4H) {
                    N1O.p86(38);
                    var Y0l = N1O.U9a(19, 13, 354, 18);
                    O4T = J1m - E3T.dataSet.length + E3T.scroll - Y0l;
                }
                if (this.chart.dataSegment && this.chart.dataSegment[O4T] && this.chart.dataSegment[O4T].leftOffset) {
                    N1O.p86(78);
                    var Y2D = N1O.U9a(11, 4, 8, 19, 26);
                    return E3T.panel.left + Math.floor(this.chart.dataSegment[O4T].leftOffset + this.micropixels) - Y2D;
                } else {
                    M0V = 0;
                    N9c = 0;
                    if (this.chart.dataSegment && this.chart.dataSegment[this.chart.dataSegment.length - 1] && this.chart.dataSegment[this.chart.dataSegment.length - 1].leftOffset) {
                        if (this.chart.dataSegment.length < J1m - E3T.dataSet.length + E3T.scroll) {
                            N1O.B_x(79);
                            var p_H = N1O.f21(4, 5, 0, 1, 1);
                            N1O.B_x(2);
                            var H8m = N1O.f21(1, 0);
                            N1O.p86(8);
                            var V9c = N1O.f21(6, 8, 4);
                            M0V = this.chart.dataSegment[this.chart.dataSegment.length - p_H].leftOffset - this.chart.dataSegment[this.chart.dataSegment.length - H8m].candleWidth / V9c;
                            N9c = this.chart.dataSegment.length;
                        }
                    }
                    return M0V + E3T.panel.left + Math.floor((J1m - N9c - E3T.dataSet.length + E3T.scroll - 0.5) * this.layout.candleWidth + this.micropixels) -  + "1";
                }
            };
            S.prototype.pixelFromDate = function (X97, n90) {
                return this.pixelFromTick(this.tickFromDate(X97, n90), n90);
            };
            S.prototype.priceFromPixel = function (T3_, e8e, d5S) {
                var U4u,
                f2m,
                K3M,
                a$d;
                if (!e8e) {
                    e8e = this.chart.panel;
                }
                U4u = e8e.chart;
                N1O.A7M();
                f2m = d5S ? d5S : e8e.yAxis;
                T3_ = f2m.bottom - T3_;
                if (!f2m.multiplier) {
                    return null;
                }
                K3M = f2m.low + T3_ / f2m.multiplier;
                if (f2m.semiLog) {
                    a$d = f2m.logLow + T3_ * f2m.logShadow / f2m.height;
                    K3M = Math.pow(10, a$d);
                }
                return K3M;
            };
            S.prototype.valueFromPixel = function (q5G, V1C, T$y) {
                var T71;
                if (!V1C) {
                    V1C = this.whichPanel(q5G);
                }
                T71 = this.priceFromPixel(q5G, V1C, T$y);
                return T71;
            };
            S.prototype.valueFromPixelUntransform = function (g8X, C3A, b7$) {
                var b5A;
                if (!C3A) {
                    C3A = this.whichPanel(g8X);
                }
                if (!C3A) {
                    if (g8X <= 0) {
                        C3A = this.panels[R.first(this.panels)];
                    } else {
                        C3A = this.panels[R.last(this.panels)];
                    }
                }
                b5A = this.priceFromPixel(g8X, C3A, b7$);
                if (C3A.chart.untransformFunc && C3A.name == C3A.chart.name) {
                    b5A = C3A.chart.untransformFunc(this, C3A.chart, b5A);
                }
                N1O.A7M();
                return b5A;
            };
            S.prototype.pixelFromPriceTransform = function (L_X, S9d, s$S) {
                N1O.A7M();
                if (S9d.chart.transformFunc) {
                    L_X = S9d.chart.transformFunc(this, S9d.chart, L_X, s$S);
                }
                return this.pixelFromPrice(L_X, S9d, s$S);
            };
            S.prototype.pixelFromPrice = function (D3o, h8L, y9z) {
                var R44,
                Y8a,
                a0g,
                R2l,
                A5j;
                if (!h8L) {
                    h8L = this.chart.panel;
                }
                R44 = y9z ? y9z : h8L.yAxis;
                Y8a = (R44.high - D3o) * R44.multiplier;
                N1O.A7M();
                if (R44.semiLog) {
                    a0g = Math.max(D3o,  + "0");
                    R2l = Math.log(a0g) / Math.LN10;
                    A5j = R44.height;
                    Y8a = A5j - A5j * (R2l - R44.logLow) / R44.logShadow;
                }
                Y8a += R44.top;
                return Y8a;
            };
            S.prototype.pixelFromValueAdjusted = function (i4Y, J0j, X37, m2W) {
                var P50,
                K62;
                if (this.layout.adj || !this.charts[i4Y.name]) {
                    return this.pixelFromPriceTransform(X37, i4Y, m2W);
                }
                P50 = Math.round(J0j);
                if (P50 > 0 && P50 < i4Y.chart.dataSet.length && (K62 = i4Y.chart.dataSet[P50].ratio)) {
                    N1O.B_x(0);
                    return this.pixelFromPriceTransform(N1O.U9a(K62, X37), i4Y, m2W);
                }
                return this.pixelFromPriceTransform(X37, i4Y, m2W);
            };
            S.prototype.adjustIfNecessary = function (j8k, T5G, o2h) {
                var A3Z,
                l5d;
                if (this.layout.adj) {
                    return o2h;
                }
                if (!j8k || !this.charts[j8k.name]) {
                    return o2h;
                }
                A3Z = Math.round(T5G);
                if (A3Z > 0 && A3Z < j8k.chart.dataSet.length && (l5d = j8k.chart.dataSet[A3Z].ratio)) {
                    N1O.p86(24);
                    return N1O.U9a(l5d, o2h);
                }
                return o2h;
            };
            S.prototype.setTransform = function (f9w, g6$, a$5) {
                f9w.transformFunc = g6$;
                N1O.N7F();
                f9w.untransformFunc = a$5;
            };
            S.prototype.unsetTransform = function (C8G) {
                delete C8G.transformFunc;
                delete C8G.untransformFunc;
                for (var w5J =  + "0"; w5J < C8G.dataSet.length; w5J++) {
                    C8G.dataSet[w5J].transform = null;
                }
            };
            S.prototype.undo = function () {
                var F09,
                d1M,
                a4b;
                F09 = "u";
                F09 += "ndo";
                if (this.runPrepend(F09, arguments)) {
                    return;
                }
                if (this.activeDrawing) {
                    d1M = "s";
                    d1M += "tx_cross";
                    d1M += "ha";
                    d1M += "ir";
                    a4b = "stx_crossha";
                    a4b += "ir_draw";
                    a4b += "ing";
                    this.activeDrawing.abort();
                    this.activeDrawing = null;
                    R.clearCanvas(this.chart.tempCanvas, this);
                    this.draw();
                    R.swapClassName(this.controls.crossX, "stx_crosshair", a4b);
                    R.swapClassName(this.controls.crossY, d1M, "stx_crosshair_drawing");
                    S.drawingLine = !1;
                }
                this.runAppend("undo", arguments);
            };
            S.prototype.undoStamp = function (G_n, V8n) {
                this.undoStamps.push(G_n);
                this.dispatch("undoStamp", {
                    before: G_n,
                    after: V8n
                });
            };
            S.prototype.undoLast = function () {
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
            S.prototype.addDrawing = function (R2o) {
                var R3_;
                R3_ = R.shallowClone(this.drawingObjects);
                N1O.N7F();
                this.drawingObjects.push(R2o);
                this.undoStamp(R3_, R.shallowClone(this.drawingObjects));
            };
            S.prototype.plotLine = function (c5q, I4k, N7K, T7q, D98, I65, l0p, b1p, i05) {
                var A44,
                I_H,
                K5r,
                V_N,
                y9M,
                z2J,
                m2T,
                h3z,
                E1B,
                o8B,
                X4U,
                z7P,
                L2d,
                I1f,
                Z7T,
                X5s,
                l7o,
                s8W,
                j6d,
                i3K,
                U0R,
                K5f;
                if (!i05) {
                    i05 = {};
                }
                if (i05.pattern == "none") {
                    return;
                }
                if (b1p === !"") {
                    b1p = this.chart.panel;
                }
                if (l0p === null || typeof l0p == "undefined") {
                    l0p = this.chart.context;
                }
                if (isNaN(c5q) || isNaN(I4k) || isNaN(N7K) || isNaN(T7q)) {
                    return;
                }
                A44 = 0;
                I_H = this.chart.canvasHeight;
                K5r = 0;
                V_N = this.right;
                if (b1p) {
                    I_H = b1p.yAxis.bottom;
                    A44 = b1p.yAxis.top;
                    K5r = b1p.left;
                    V_N = b1p.right;
                }
                if (I65 == "ray") {
                    y9M = 10000000;
                    if (I4k < c5q) {
                        y9M = -10000000;
                    }
                    m2T = {
                        "x0": c5q,
                        "x1": I4k,
                        "y0": N7K,
                        "y1": T7q
                    };
                    z2J = R.yIntersection(m2T, y9M);
                    I4k = y9M;
                    T7q = z2J;
                }
                if (I65 == "line" || I65 == "horizontal" || I65 == "vertical") {
                    y9M = 10000000;
                    h3z = -10000000;
                    m2T = {
                        "x0": c5q,
                        "x1": I4k,
                        "y0": N7K,
                        "y1": T7q
                    };
                    z2J = R.yIntersection(m2T, y9M);
                    E1B = R.yIntersection(m2T, h3z);
                    c5q = h3z;
                    I4k = y9M;
                    N7K = E1B;
                    T7q = z2J;
                }
                o8B =  + "0.0";
                X4U = 1.0;
                N1O.B_x(7);
                z7P = N1O.f21(c5q, I4k);
                N1O.B_x(7);
                L2d = N1O.U9a(N7K, T7q);
                for (var d1N = 0; d1N < 4; d1N++) {
                    if (d1N === "0" >> 0) {
                        I1f = -z7P;
                        N1O.B_x(7);
                        Z7T = -N1O.U9a(c5q, K5r);
                    }
                    if (d1N == 1) {
                        I1f = z7P;
                        N1O.B_x(7);
                        Z7T = N1O.f21(c5q, V_N);
                    }
                    if (d1N == 2) {
                        I1f = -L2d;
                        N1O.p86(7);
                        Z7T = -N1O.f21(N7K, A44);
                    }
                    if (d1N == 3) {
                        I1f = L2d;
                        N1O.B_x(7);
                        Z7T = N1O.U9a(N7K, I_H);
                    }
                    N1O.B_x(24);
                    X5s = N1O.U9a(I1f, Z7T);
                    if ((T7q || T7q ===  + "0") && I1f === 0 && Z7T < 0) {
                        return !1; ;
                    }
                    if (I1f < 0) {
                        if (X5s > X4U) {
                            return !({});
                        } else if (X5s > o8B) {
                            o8B = X5s;
                        };
                    } else if (I1f >  + "0") {
                        if (X5s < o8B) {
                            return !"1";
                        } else if (X5s < X4U) {
                            X4U = X5s;
                        };
                    }
                }
                N1O.B_x(33);
                l7o = N1O.f21(z7P, c5q, o8B);
                N1O.p86(33);
                s8W = N1O.f21(L2d, N7K, o8B);
                N1O.B_x(33);
                j6d = N1O.U9a(z7P, c5q, X4U);
                N1O.p86(33);
                i3K = N1O.f21(L2d, N7K, X4U);
                if (!T7q && T7q !==  + "0" && !N7K && N7K !== "0" << 32) {
                    s8W = A44;
                    i3K = I_H;
                    l7o = m2T.x0;
                    j6d = m2T.x0;
                    if (m2T.x0 > V_N) {
                        return !({});
                    }
                    if (m2T.x0 < K5r) {
                        return !!"";
                    }
                } else if (!T7q && T7q !== 0) {
                    if (m2T.y0 < m2T.y1) {
                        i3K = I_H;
                    } else {
                        i3K = A44;
                    }
                    l7o = m2T.x0;
                    j6d = m2T.x0;
                    if (m2T.x0 > V_N) {
                        return !"1";
                    }
                    if (m2T.x0 < K5r) {
                        return !!"";
                    }
                }
                l0p.lineWidth = 1.1;
                N1O.A7M();
                if (typeof D98 == "object") {
                    l0p.strokeStyle = D98.color;
                    if (D98.opacity) {
                        l0p.globalAlpha = D98.opacity;
                    } else {
                        l0p.globalAlpha = 1;
                    }
                    l0p.lineWidth = parseInt(R.stripPX(D98.width));
                } else {
                    U0R = "a";
                    U0R += "uto";
                    if (!D98 || D98 == U0R || R.isTransparent(D98)) {
                        l0p.strokeStyle = this.defaultColor;
                    } else {
                        l0p.strokeStyle = D98;
                    }
                }
                if (i05.opacity) {
                    l0p.globalAlpha = i05.opacity;
                }
                if (i05.lineWidth) {
                    l0p.lineWidth = i05.lineWidth;
                }
                if (I65 == "zig zag") {
                    l0p.lineWidth = 5;
                }
                K5f = null;
                if (i05.pattern) {
                    K5f = i05.pattern;
                    if (K5f == "solid") {
                        K5f = null;
                    } else if (K5f == "dotted") {
                        K5f = [l0p.lineWidth, l0p.lineWidth];
                    } else if (K5f == "dashed") {
                        N1O.B_x(80);
                        var k39 = N1O.f21(2, 10, 1, 65, 325);
                        N1O.p86(81);
                        var P0r = N1O.U9a(15, 0, 2, 20);
                        K5f = [l0p.lineWidth * k39, l0p.lineWidth * P0r];
                    }
                }
                l0p.stxLine(l7o, s8W, j6d, i3K, l0p.strokeStyle, l0p.globalAlpha, l0p.lineWidth, K5f);
                l0p.globalAlpha = 1;
                l0p.lineWidth = 1;
            };
            S.prototype.connectTheDots = function (p8Y, M0w, R$j, e7w, k8d, p$C) {
                var B47,
                k2b,
                G50,
                K7C,
                U1_,
                J7Z,
                n2_,
                Y8G,
                P7X,
                W8_,
                t01,
                K05,
                Y7o,
                t6l,
                u5s,
                F9_,
                V2t,
                V4B,
                I6U,
                H6f,
                N45,
                n1u,
                u6Q;
                B47 = "o";
                B47 += "bje";
                B47 += "ct";
                k2b = "und";
                k2b += "efined";
                if (!p$C) {
                    p$C = {};
                }
                if (p$C.pattern == "none") {
                    return;
                }
                if (k8d === !![]) {
                    k8d = this.chart.panel;
                }
                if (e7w === null || typeof e7w == k2b) {
                    e7w = this.chart.context;
                }
                if (p8Y.length < 4) {
                    return;
                }
                G50 = 0;
                K7C = this.chart.canvasHeight;
                U1_ =  + "0";
                J7Z = this.chart.width;
                if (k8d) {
                    K7C = k8d.yAxis.bottom;
                    G50 = k8d.yAxis.top;
                }
                e7w.lineWidth =  + "1.1";
                if (typeof M0w == B47) {
                    e7w.strokeStyle = M0w.color;
                    if (M0w.opacity) {
                        e7w.globalAlpha = M0w.opacity;
                    } else {
                        e7w.globalAlpha = 1;
                    }
                    e7w.lineWidth = parseInt(R.stripPX(M0w.width));
                } else {
                    if (!M0w || M0w == "auto" || R.isTransparent(M0w)) {
                        e7w.strokeStyle = this.defaultColor;
                    } else {
                        e7w.strokeStyle = M0w;
                    }
                }
                if (p$C.opacity) {
                    e7w.globalAlpha = p$C.opacity;
                }
                if (p$C.lineWidth) {
                    e7w.lineWidth = p$C.lineWidth;
                }
                n2_ = null;
                if (p$C.pattern) {
                    Y8G = "d";
                    Y8G += "o";
                    Y8G += "tt";
                    Y8G += "ed";
                    n2_ = p$C.pattern;
                    if (n2_ == "solid") {
                        n2_ = null;
                    } else if (n2_ == Y8G) {
                        n2_ = [e7w.lineWidth, e7w.lineWidth];
                    } else if (n2_ == "dashed") {
                        N1O.p86(7);
                        var P4x = N1O.U9a(7, 12);
                        N1O.p86(82);
                        var r5u = N1O.U9a(14, 5, 74, 60);
                        n2_ = [e7w.lineWidth * P4x, e7w.lineWidth * r5u];
                    }
                }
                e7w.beginPath();
                for (var x7N = 0; x7N < p8Y.length - 2; x7N += 2) {
                    P7X = p8Y[x7N];
                    N1O.p86(2);
                    W8_ = p8Y[N1O.f21(1, x7N)];
                    N1O.p86(2);
                    t01 = p8Y[N1O.f21(2, x7N)];
                    N1O.p86(2);
                    K05 = p8Y[N1O.U9a(3, x7N)];
                    if (isNaN(P7X) || isNaN(t01) || isNaN(W8_) || isNaN(K05)) {
                        return;
                    }
                    Y7o = 0.0;
                    t6l = 1.0;
                    N1O.B_x(7);
                    u5s = N1O.f21(P7X, t01);
                    N1O.p86(7);
                    F9_ = N1O.U9a(W8_, K05);
                    for (var J6X = 0; J6X < 4; J6X++) {
                        if (J6X ===  + "0") {
                            V2t = -u5s;
                            N1O.B_x(7);
                            V4B = -N1O.U9a(P7X, U1_);
                        }
                        if (J6X == 1) {
                            V2t = u5s;
                            N1O.B_x(7);
                            V4B = N1O.f21(P7X, J7Z);
                        }
                        if (J6X == ("2" ^ 0)) {
                            V2t = -F9_;
                            N1O.B_x(7);
                            V4B = -N1O.U9a(W8_, G50);
                        }
                        if (J6X == 3) {
                            V2t = F9_;
                            N1O.p86(7);
                            V4B = N1O.U9a(W8_, K7C);
                        }
                        N1O.B_x(24);
                        I6U = N1O.U9a(V2t, V4B);
                        if ((K05 || K05 === 0) && V2t === 0 && V4B < 0) {
                            return !!""; ;
                        }
                        if (V2t < 0) {
                            if (I6U > t6l) {
                                return ![];
                            } else if (I6U > Y7o) {
                                Y7o = I6U;
                            };
                        } else if (V2t >  + "0") {
                            if (I6U < Y7o) {
                                return ![];
                            } else if (I6U < t6l) {
                                t6l = I6U;
                            };
                        }
                    }
                    N1O.p86(33);
                    H6f = N1O.U9a(u5s, P7X, Y7o);
                    N1O.p86(33);
                    N45 = N1O.U9a(F9_, W8_, Y7o);
                    N1O.B_x(33);
                    n1u = N1O.U9a(u5s, P7X, t6l);
                    N1O.p86(33);
                    u6Q = N1O.U9a(F9_, W8_, t6l);
                    try {
                        if (n2_) {
                            e7w.dashedLineTo(H6f, N45, n1u, u6Q, n2_);
                        } else {
                            e7w.moveTo(H6f, N45);
                            e7w.lineTo(n1u, u6Q);
                        }
                    } catch (v50) { ;
                    }
                }
                e7w.stroke();
                e7w.closePath();
                e7w.globalAlpha = 1;
                e7w.lineWidth = 1;
            };
            S.prototype.plotSpline = function (t$g, o5z, I8Y, c_2, u2w, z4W, F72) {
                var V0I,
                d_K,
                s3C,
                W_F,
                d8w;
                V0I = "o";
                V0I += "bj";
                V0I += "ect";
                d_K = "undefine";
                d_K += "d";
                s3C = "n";
                s3C += "o";
                s3C += "n";
                s3C += "e";
                if (!F72) {
                    F72 = {};
                }
                if (F72.pattern == s3C) {
                    return;
                }
                if (z4W === !!"1") {
                    z4W = this.chart.panel;
                }
                if (u2w === null || typeof u2w == d_K) {
                    u2w = this.chart.context;
                }
                u2w.save();
                u2w.lineWidth = 1.1;
                if (typeof I8Y == V0I) {
                    u2w.strokeStyle = I8Y.color;
                    if (I8Y.opacity) {
                        u2w.globalAlpha = I8Y.opacity;
                    } else {
                        u2w.globalAlpha = 1;
                    }
                    u2w.lineWidth = parseInt(R.stripPX(I8Y.width));
                } else {
                    if (!I8Y || I8Y == "auto" || R.isTransparent(I8Y)) {
                        u2w.strokeStyle = this.defaultColor;
                    } else {
                        u2w.strokeStyle = I8Y;
                    }
                }
                if (F72.opacity) {
                    u2w.globalAlpha = F72.opacity;
                }
                if (F72.lineWidth) {
                    u2w.lineWidth = F72.lineWidth;
                }
                W_F = null;
                if (F72.pattern) {
                    d8w = "so";
                    d8w += "lid";
                    W_F = F72.pattern;
                    if (W_F == d8w) {
                        W_F = null;
                    } else if (W_F == "dotted") {
                        W_F = [u2w.lineWidth, u2w.lineWidth];
                    } else if (W_F == "dashed") {
                        N1O.p86(9);
                        var R4Y = N1O.f21(4, 1, 9, 11);
                        N1O.B_x(52);
                        var L1Z = N1O.f21(48, 55, 18, 20);
                        W_F = [u2w.lineWidth * R4Y, u2w.lineWidth * L1Z];
                    }
                }
                if (W_F && u2w.setLineDash) {
                    u2w.setLineDash(W_F);
                    u2w.lineDashOffset = 0; ;
                }
                T(t$g, o5z, u2w);
                u2w.restore();
            };
            S.prototype.drawingClick = function (R_I, G_t, B35) {
                var P2D,
                v6d,
                z4H,
                S7z,
                j9h,
                K7E,
                H$1;
                N1O.N7F();
                if (!this.activeDrawing) {
                    if (!R_I) {
                        return;
                    }
                    P2D = S.drawingTools[this.currentVectorParameters.vectorType];
                    if (!P2D) {
                        if (R.Drawing[this.currentVectorParameters.vectorType]) {
                            P2D = R.Drawing[this.currentVectorParameters.vectorType];
                            S.registerDrawingTool(this.currentVectorParameters.vectorType, P2D);
                        }
                    }
                    if (P2D) {
                        this.activeDrawing = new P2D();
                        this.activeDrawing.construct(this, R_I);
                        if (!this.charts[R_I.name]) {
                            if (this.activeDrawing.chartsOnly) {
                                this.activeDrawing = null;
                                return;
                            }
                        }
                    }
                }
                if (this.activeDrawing) {
                    if (this.userPointerDown && !this.activeDrawing.dragToDraw) {
                        if (!S.drawingLine) {
                            this.activeDrawing = null;
                        }
                        return;
                    }
                    v6d = this.tickFromPixel(G_t, R_I.chart);
                    z4H = this.panels[this.activeDrawing.panelName];
                    S7z = this.adjustIfNecessary(z4H, v6d, this.valueFromPixelUntransform(B35, z4H));
                    if (this.preferences.magnet && this.magnetizedPrice) {
                        S7z = this.adjustIfNecessary(z4H, v6d, this.magnetizedPrice);
                    }
                    if (this.activeDrawing.click(this.chart.tempCanvas.context, v6d, S7z)) {
                        if (this.activeDrawing) {
                            j9h = "stx_crosshair_draw";
                            j9h += "ing";
                            K7E = "ve";
                            K7E += "ctor";
                            S.drawingLine = !!0;
                            R.clearCanvas(this.chart.tempCanvas, this);
                            this.addDrawing(this.activeDrawing);
                            this.activeDrawing = null;
                            this.adjustDrawings();
                            this.draw();
                            this.changeOccurred(K7E);
                            R.swapClassName(this.controls.crossX, "stx_crosshair", j9h);
                            R.swapClassName(this.controls.crossY, "stx_crosshair", "stx_crosshair_drawing");
                        }
                    } else {
                        H$1 = "draw";
                        H$1 += "in";
                        H$1 += "g";
                        this.changeOccurred(H$1);
                        S.drawingLine = !0;
                        R.swapClassName(this.controls.crossX, "stx_crosshair_drawing", "stx_crosshair");
                        R.swapClassName(this.controls.crossY, "stx_crosshair_drawing", "stx_crosshair");
                    }
                    return !!1;
                }
                return !!0;
            };
            S.prototype.whichPanel = function (y2G) {
                N1O.A7M();
                var W2s;
                for (var f08 in this.panels) {
                    W2s = this.panels[f08];
                    if (W2s.hidden)
                        continue;
                    if (y2G > W2s.top && y2G < W2s.bottom) {
                        return W2s;
                    }
                }
                return null;
            };
            S.prototype.mouseup = function (F4A) {
                var l0E,
                W$A,
                E5r,
                h6r,
                K_A;
                l0E = "m";
                l0E += "ouse";
                l0E += "up";
                W$A = "mous";
                W$A += "eu";
                W$A += "p";
                if (this.runPrepend(W$A, arguments)) {
                    return;
                }
                this.swipe.end = !!"1";
                this.cancelLongHold = !"";
                if (this.repositioningDrawing) {
                    if (!this.currentVectorParameters.vectorType || Date.now() - this.mouseTimer > 250) {
                        this.changeOccurred("vector");
                        R.clearCanvas(this.chart.tempCanvas, this);
                        this.repositioningDrawing = null;
                        this.adjustDrawings();
                        this.draw();
                        return;
                    } else {
                        this.repositioningDrawing = !!"";
                    }
                }
                if (this.repositioningBaseline) {
                    this.repositioningBaseline = null;
                    N1O.p86(64);
                    var F23 = N1O.U9a(206, 13, 16);
                    this.chart.panel.yAxis.scroll = this.pixelFromPriceTransform(this.chart.baseline.userLevel, this.chart.panel) - (this.chart.panel.yAxis.top + this.chart.panel.yAxis.bottom) / F23;
                    this.draw();
                    return;
                }
                E5r = this.userPointerDown;
                this.userPointerDown = ![];
                if (!this.displayInitialized) {
                    return;
                }
                this.grabbingScreen = !!0;
                if (this.openDialog !== "") {
                    if (S.insideChart) {
                        R.unappendClassName(this.container, "stx-drag-chart");
                    }
                    return;
                }
                if (this.grabOverrideClick) {
                    this.swipeRelease();
                    R.unappendClassName(this.container, "stx-drag-chart");
                    this.grabOverrideClick = ![];
                    return;
                }
                if (S.insideChart) {
                    R.unappendClassName(this.container, "stx-drag-chart");
                }
                if (S.resizingPanel) {
                    this.releaseHandle({});
                    return;
                }
                if (!F4A) {
                    F4A = event;
                }
                if (F4A.which && F4A.which >= 2 || F4A.button && F4A.button >= 2 || F4A.ctrlKey) {
                    if (this.anyHighlighted && !this.bypassRightClick) {
                        this.rightClickHighlighted();
                        if (F4A.preventDefault && this.captureTouchEvents) {
                            F4A.preventDefault();
                        }
                        F4A.stopPropagation();
                        return !({});
                    } else {
                        this.dispatch("rightClick", {
                            stx: this,
                            panel: this.currentPanel,
                            x: K_A,
                            y: h6r
                        });
                        return !0;
                    }
                }
                if (F4A.clientX < this.left || F4A.clientX > this.right) {
                    return;
                }
                if (F4A.clientY < this.top || F4A.clientY > this.bottom) {
                    return;
                }
                h6r = this.backOutY(F4A.clientY);
                K_A = this.backOutX(F4A.clientX);
                if (E5r && (!this.longHoldTookEffect || this.activeDrawing)) {
                    this.drawingClick(this.currentPanel, K_A, h6r);
                }
                if (!this.activeDrawing && !this.longHoldTookEffect) {
                    this.dispatch("tap", {
                        stx: this,
                        panel: this.currentPanel,
                        x: K_A,
                        y: h6r
                    });
                }
                this.runAppend(l0E, arguments);
            };
            S.prototype.grabbingHand = function () {
                var Z8w;
                Z8w = "stx-";
                Z8w += "drag-c";
                Z8w += "hart";
                if (!this.allowScroll) {
                    return;
                }
                if (!this.grabbingScreen) {
                    return;
                }
                N1O.N7F();
                if (R.touchDevice) {
                    return;
                }
                R.appendClassName(this.container, Z8w);
            };
            S.prototype.mousedown = function (f2_) {
                var b9Y,
                B_X,
                y6_,
                j1h,
                q0y,
                a8F,
                L46,
                P9X,
                H_k;
                if (this.runPrepend("mousedown", arguments)) {
                    return;
                }
                this.grabOverrideClick = !!0;
                if (this.openDialog !== "") {
                    return;
                }
                if (!this.displayInitialized) {
                    return;
                }
                if (!this.displayCrosshairs) {
                    return;
                }
                if (!S.insideChart) {
                    return;
                }
                if (this.manageTouchAndMouse && f2_ && f2_.preventDefault && this.captureTouchEvents) {
                    f2_.preventDefault();
                }
                this.mouseTimer = Date.now();
                this.longHoldTookEffect = !!0;
                this.hasDragged = ![];
                this.userPointerDown = !![];
                if (!f2_) {
                    f2_ = event;
                }
                if (f2_.which && f2_.which >= ("2" | 2) || f2_.button && f2_.button >=  + "2") {
                    return;
                }
                b9Y = this.currentPanel.chart;
                if (f2_.clientX >= this.left && f2_.clientX < this.right && f2_.clientY >= this.top && f2_.clientY <= this.bottom) {
                    B_X = "baseline_delta_mou";
                    B_X += "ntai";
                    B_X += "n";
                    y6_ = "baseline";
                    y6_ += "_delta";
                    if (this.repositioningDrawing) {
                        return;
                    }
                    for (var M2O = 0; M2O < this.drawingObjects.length; M2O++) {
                        j1h = this.drawingObjects[M2O];
                        if (j1h.highlighted) {
                            if (this.cloneDrawing) {
                                q0y = S.drawingTools[j1h.name];
                                a8F = new q0y();
                                a8F.reconstruct(this, j1h.serialize());
                                this.drawingObjects.push(a8F);
                                this.repositioningDrawing = a8F;
                                a8F.repositioner = j1h.repositioner;
                                return;
                            }
                            this.repositioningDrawing = j1h;
                            return;
                        }
                    }
                    if ((this.layout.chartType == y6_ || this.layout.chartType == B_X) && b9Y.baseline.userLevel !== !!"") {
                        L46 = this.valueFromPixelUntransform(this.cy - ("5" | 5), this.currentPanel);
                        P9X = this.valueFromPixelUntransform(this.cy + 5, this.currentPanel);
                        N1O.B_x(2);
                        var q7O = N1O.U9a(9, 1);
                        H_k = this.chart.right - parseInt(getComputedStyle(this.controls.baselineHandle).width, q7O);
                        if (b9Y.baseline.actualLevel < L46 && b9Y.baseline.actualLevel > P9X && this.cx > H_k) {
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
                this.grabbingScreen = !![];
                this.yToleranceBroken = !"1";
                if (!f2_) {
                    f2_ = event;
                }
                this.grabStartX = f2_.clientX;
                this.grabStartY = f2_.clientY;
                this.grabStartScrollX = b9Y.scroll;
                this.grabStartScrollY = b9Y.panel.yAxis.scroll;
                this.grabStartCandleWidth = this.layout.candleWidth;
                this.grabStartZoom = this.whichYAxis(this.currentPanel).zoom;
                setTimeout((function (H_a) {
                        N1O.A7M();
                        return function () {
                            N1O.A7M();
                            H_a.grabbingHand();
                        };
                    })(this), 100);
                this.swipeStart(b9Y);
                if (this.longHoldTime) {
                    this.startLongHoldTimer();
                }
                this.runAppend("mousedown", arguments);
            };
            S.prototype.startLongHoldTimer = function () {
                var R_7,
                U6s,
                U3v,
                U9U;
                R_7 = 736756741;
                N1O.p86(1);
                U6s = -N1O.f21(2, "390844430");
                U3v = 2;
                for (var F0M = "1" * 1; N1O.n$d(F0M.toString(), F0M.toString().length, 25785) !== R_7; F0M++) {
                    U9U = this;
                    U3v +=  + "2";
                }
                if (N1O.Y4l(U3v.toString(), U3v.toString().length, 11183) !== U6s) {
                    U9U = this;
                }
                this.cancelLongHold = !"1";
                if (this.longHoldTimeout) {
                    clearTimeout(this.longHoldTimeout);
                }
                this.longHoldTimeout = setTimeout(function () {
                    if (U9U.cancelLongHold) {
                        return;
                    }
                    U9U.dispatch("longhold", {
                        stx: U9U,
                        panel: U9U.currentPanel,
                        x: U9U.cx,
                        y: U9U.cy
                    });
                    U9U.longHoldTookEffect = !!1;
                }, this.longHoldTime);
            };
            S.prototype.changeVectorType = function (h_s) {
                this.currentVectorParameters.vectorType = h_s;
                N1O.A7M();
                if (S.drawingLine) {
                    this.undo();
                }
                this.setCrosshairColors();
                if (S.insideChart) {
                    this.doDisplayCrosshairs();
                }
            };
            S.prototype.rightClickOverlay = function (B5i, M_O) {
                N1O.A7M();
                var L87,
                x_E;
                L87 = "r";
                L87 += "ig";
                L87 += "htCli";
                L87 += "ckOverlay";
                if (this.runPrepend(L87, arguments)) {
                    return;
                }
                x_E = this.overlays[B5i];
                if (x_E.editFunction) {
                    x_E.editFunction(M_O);
                } else {
                    this.removeOverlay(B5i);
                }
                this.runAppend("rightClickOverlay", arguments);
            };
            S.prototype.removeOverlay = function (j_L) {
                var y7C,
                n62,
                H5v,
                N0v;
                y7C = "remo";
                y7C += "veOverlay";
                if (this.runPrepend(y7C, arguments)) {
                    return;
                }
                N1O.A7M();
                for (var k$v in this.overlays) {
                    H5v = this.overlays[k$v];
                    if (H5v.inputs.Field && H5v.inputs.Field.indexOf(j_L) != -1) {
                        this.removeOverlay(H5v.name);
                    } else if (H5v.name == j_L) {
                        n62 = H5v;
                    }
                }
                N0v = this.layout.studies[j_L];
                R.deleteRHS(R.Studies.studyPanelMap, N0v);
                if (n62) {
                    this.cleanupRemovedStudy(n62);
                }
                delete this.overlays[j_L];
                this.displaySticky();
                this.createDataSet();
                this.changeOccurred("layout");
                this.runAppend("removeOverlay", arguments);
            };
            S.prototype.addSeries = function (O$a, u7Q, h9N) {
                var U3T,
                l0r,
                S0v,
                Z8$,
                L0n,
                z98,
                W45;
                U3T = "li";
                U3T += "ne";
                function y$w(Q1$) {
                    var V4o,
                    k5U,
                    S7V,
                    X7H,
                    x3l,
                    x_C;
                    V4o = 0;
                    k5U =  + "0";
                    while (u7Q.data && V4o < Q1$.masterData.length && k5U < u7Q.data.length) {
                        S7V = u7Q.data[k5U];
                        X7H = Q1$.masterData[V4o];
                        if (!S7V.DT || typeof S7V.DT == "undefined") {
                            S7V.DT = R.strToDateTime(S7V.Date);
                        }
                        if (S7V.DT.getTime() == X7H.DT.getTime()) {
                            if (typeof S7V.Value != "undefined") {
                                X7H[O$a] = S7V.Value;
                            } else if (Q1$.layout.adj && typeof S7V.Adj_Close != "undefined") {
                                X7H[O$a] = S7V.Adj_Close;
                            } else {
                                X7H[O$a] = S7V.Close;
                            }
                            k5U++;
                            V4o++;
                            continue;
                        }
                        if (S7V.DT < X7H.DT) {
                            if (u7Q.forceData) {
                                Q1$.masterData.splice(V4o, 0, {
                                    DT: S7V.DT
                                });
                                continue;
                            }
                            k5U++;
                        } else {
                            V4o++;
                        }
                    }
                    if (u7Q.forceData && V4o >= Q1$.masterData.length) {
                        while (u7Q.data && k5U < u7Q.data.length) {
                            x3l = "undef";
                            x3l += "i";
                            x3l += "ne";
                            x3l += "d";
                            x_C = "unde";
                            x_C += "fin";
                            x_C += "ed";
                            S7V = u7Q.data[k5U];
                            if (!S7V.DT || typeof S7V.DT == x_C) {
                                S7V.DT = R.strToDateTime(S7V.Date);
                            }
                            X7H = {
                                DT: S7V.DT
                            };
                            if (typeof S7V.Value != "undefined") {
                                X7H[O$a] = S7V.Value;
                            } else if (Q1$.layout.adj && typeof S7V.Adj_Close != x3l) {
                                X7H[O$a] = S7V.Adj_Close;
                            } else {
                                X7H[O$a] = S7V.Close;
                            }
                            Q1$.masterData.push(X7H);
                            k5U++;
                        }
                    }
                }
                if (this.runPrepend("addSeries", arguments)) {
                    return;
                }
                function U$_(y7c, Y$7) {
                    var n3P;
                    if (Y$7.parameters.color) {
                        n3P = y7c.getSeriesRenderer("_generic_series");
                        if (!n3P) {
                            n3P = y7c.setSeriesRenderer(new R.Renderer.Lines({
                                        params: {
                                            panel: Y$7.parameters.panel,
                                            type: "legacy",
                                            name: "_generic_series",
                                            overChart: !!({})
                                        }
                                    }));
                        }
                        n3P.attachSeries(O$a, Y$7.parameters).ready();
                    }
                }
                if (!u7Q) {
                    u7Q = {};
                }
                if (!u7Q.chartName) {
                    u7Q.chartName = this.chart.name;
                }
                if (!u7Q.symbolObject) {
                    u7Q.symbolObject = {
                        symbol: O$a
                    };
                }
                l0r = {
                    parameters: R.clone(u7Q),
                    yValueCache: [],
                    display: O$a
                };
                if (("display" in l0r.parameters)) {
                    l0r.display = l0r.parameters.display;
                }
                if (l0r.parameters.isComparison) {
                    l0r.parameters.shareYAxis = !![];
                }
                if (!l0r.parameters.chartType && l0r.parameters.color) {
                    l0r.parameters.chartType = U3T;
                }
                if (l0r.parameters.chartType && l0r.parameters.chartType != "mountain") {
                    l0r.parameters.chartType = "line";
                }
                if (!l0r.parameters.panel) {
                    l0r.parameters.panel = this.chart.panel.name;
                }
                S0v = this.charts[u7Q.chartName];
                Z8$ = this;
                if (S0v) {
                    S0v.series[O$a] = l0r;
                }
                if (u7Q.isComparison) {
                    Z8$.setComparison(!"", S0v);
                }
                L0n = ![];
                if (u7Q.data && !u7Q.data.useDefaultQuoteFeed) {
                    if (this.masterData) {
                        y$w(this); ;
                    }
                } else {
                    if (this.quoteDriver) {
                        z98 = this.quoteDriver;
                        function z_K(t_T) {
                            if (!t_T.error && t_T.error !== "0" << 32) {
                                u7Q.data = t_T.quotes;
                                y$w(Z8$);
                                U$_(Z8$, l0r);
                            }
                            if (!Z8$.currentlyImporting) {
                                Z8$.dispatch("symbolChange", {
                                    stx: Z8$,
                                    symbol: W45.symbol,
                                    symbolObject: W45.symbolObject
                                });
                            }
                            if (h9N) {
                                h9N(t_T.error, l0r);
                            }
                            Z8$.runAppend("addSeries", arguments);
                        }
                        W45 = z98.makeParams(O$a, u7Q.symbolObject, this.chart);
                        W45.startDate = this.chart.masterData[0].DT;
                        W45.endDate = this.chart.masterData[this.chart.masterData.length - 1].DT;
                        if (u7Q.symbolObject) {
                            W45.symbolObject = u7Q.symbolObject;
                        }
                        L0n = !!({});
                        if (W45.stx.isEquationChart(W45.symbol)) {
                            R.fetchEquationChart(W45, z_K);
                        } else {
                            z98.quoteFeed.fetch(W45, z_K);
                        }
                    } else {
                        l0r.addSeriesData = y$w;
                    }
                }
                if (!L0n) {
                    U$_(Z8$, l0r);
                    if (h9N) {
                        h9N(null, l0r);
                    }
                    this.runAppend("addSeries", arguments);
                }
                N1O.A7M();
                return l0r;
            };
            S.prototype.isEquationChart = function (O7Q) {
                if (!this.allowEquations || !R.computeEquationChart) {
                    return !"1";
                }
                N1O.A7M();
                if (O7Q && O7Q[ + "0"] == "=") {
                    return !"";
                }
                return !"1";
            };
            S.prototype.deleteSeries = function (n9o, H6L) {
                var u$k,
                Y_S;
                u$k = "del";
                N1O.N7F();
                u$k += "eteSeri";
                u$k += "es";
                Y_S = "de";
                Y_S += "leteS";
                Y_S += "eri";
                Y_S += "es";
                if (this.runPrepend(Y_S, arguments)) {
                    return;
                }
                if (!H6L) {
                    H6L = this.chart;
                }
                delete H6L.series[n9o];
                if (this.quoteDriver) {
                    this.quoteDriver.updateSubscriptions();
                }
                this.runAppend(u$k, arguments);
            };
            S.prototype.removeSeries = function (N5l, a4_) {
                var y$9,
                e3y,
                J$L,
                x9r,
                p6b;
                y$9 = "remov";
                y$9 += "e-se";
                y$9 += "r";
                y$9 += "ies";
                if (this.runPrepend("removeSeries", arguments)) {
                    return;
                }
                if (!a4_) {
                    a4_ = this.chart;
                }
                for (var H$y in a4_.seriesRenderers) {
                    J$L = a4_.seriesRenderers[H$y];
                    for (var F2w = J$L.seriesParams.length - ("1" ^ 0); F2w >= 0; F2w--) {
                        x9r = J$L.seriesParams[F2w];
                        if (!x9r.permanent && x9r.field === N5l) {
                            e3y = x9r.symbolObject;
                            J$L.removeSeries(N5l);
                        }
                    }
                }
                this.deleteSeries(N5l, a4_);
                p6b = !({});
                for (var y1b in a4_.series) {
                    if (a4_.series[y1b].parameters.isComparison) {
                        p6b = !![];
                    }
                }
                if (!p6b) {
                    this.setComparison(!"1", a4_);
                }
                this.createDataSet();
                this.draw();
                this.dispatch("symbolChange", {
                    stx: this,
                    symbol: N5l,
                    symbolObject: e3y,
                    action: y$9
                });
                this.runAppend("removeSeries", arguments);
            };
            S.prototype.rendererAction = function (t0c, x9j) {
                var u5g,
                D9U;
                N1O.A7M();
                if (this.runPrepend("rendererAction", arguments)) {
                    return;
                }
                for (var Q58 in t0c.seriesRenderers) {
                    u5g = "calc";
                    u5g += "ulate";
                    D9U = t0c.seriesRenderers[Q58];
                    if (D9U.params.overChart && x9j == "underlay")
                        continue;
                    if (!D9U.params.overChart && x9j == "overlay")
                        continue;
                    if (!this.panels[D9U.params.panel])
                        continue;
                    if (this.panels[D9U.params.panel].chart !== t0c)
                        continue;
                    if (x9j == u5g) {
                        D9U.performCalculations();
                    } else {
                        D9U.draw();
                        if (D9U.cb) {
                            D9U.cb(D9U.colors);
                        }
                    }
                }
                this.runAppend("rendererAction", arguments);
            };
            S.prototype.drawSeries = function (T7G, L0j, x1O) {
                var n3E,
                k65,
                a2$,
                V8v,
                L_w,
                Y7m,
                p$E,
                R98,
                k$S,
                p0j,
                i1v,
                e9P,
                t11,
                F5v,
                k9y,
                Q9b,
                F9P,
                l8_,
                S4i,
                V2Y,
                Y36,
                l_f,
                t$X,
                E6V,
                f6g,
                s2d,
                r9f,
                J3g,
                g2V,
                n5G,
                q_l,
                x3h,
                n$7,
                J_6,
                D2R,
                W3X,
                f4F,
                l_p,
                K5w,
                d37,
                O1D,
                U9g,
                j5D,
                J8Y,
                B10,
                X0$,
                W00,
                Q8i,
                P3p,
                o1P,
                v2y,
                b3k,
                W5y,
                K5Z,
                x1Z,
                z3h,
                i36,
                G3a;
                if (this.runPrepend("drawSeries", arguments)) {
                    return;
                }
                n3E = T7G.dataSegment;
                N1O.N7F();
                k65 = {};
                a2$ = null;
                if (!L0j) {
                    L0j = T7G.series;
                }
                for (var j85 in L0j) {
                    V8v = "g";
                    V8v += "ap";
                    L_w = "s";
                    L_w += "tro";
                    L_w += "ke";
                    Y7m = "l";
                    Y7m += "i";
                    Y7m += "n";
                    Y7m += "e";
                    a2$ = L0j[j85];
                    p$E = a2$.parameters;
                    if (!p$E.chartType)
                        continue;
                    R98 = T7G.panel;
                    if (p$E.panel) {
                        R98 = this.panels[p$E.panel];
                    }
                    if (!R98)
                        continue;
                    k$S = x1O ? x1O : R98.yAxis;
                    p0j = [p$E.minimum, p$E.maximum];
                    if (!p$E.minimum && p$E.minimum !== 0 || !p$E.maximum && p$E.maximum !== 0) {
                        i1v = R.minMax(n3E, j85);
                        if (!p$E.minimum && p$E.minimum !== "0" << 32) {
                            p0j[0] = i1v[0];
                        }
                        if (!p$E.maximum && p$E.maximum !== 0) {
                            p0j[1] = i1v[1];
                        }
                    }
                    N1O.p86(11);
                    e9P = p0j[N1O.f21("0", 64)];
                    t11 = k$S.top;
                    F5v = k$S.bottom;
                    N1O.p86(7);
                    k9y = N1O.f21(t11, F5v);
                    Q9b = p$E.marginTop;
                    F9P = p$E.marginBottom;
                    if (Q9b) {
                        t11 = Q9b > 1 ? t11 + Q9b : t11 + k9y * Q9b;
                    }
                    if (F9P) {
                        F5v = F9P >  + "1" ? F5v - F9P : F5v - k9y * F9P;
                    }
                    N1O.p86(28);
                    var C4Z = N1O.U9a(4, 16, 3);
                    l8_ = (F5v - t11) / (p0j[C4Z] - e9P);
                    S4i = !!0;
                    V2Y = null;
                    Y36 = null;
                    l_f = null;
                    t$X = null;
                    E6V = null;
                    f6g = null;
                    s2d = this.layout.candleWidth;
                    r9f = this.chart.context;
                    J3g = p$E.type == "step" || p$E.subtype == "step";
                    g2V = p$E.color;
                    if (!g2V) {
                        g2V = this.defaultColor;
                    }
                    n5G = p$E.width;
                    if (!n5G || isNaN(n5G) || n5G < 1) {
                        n5G = 1;
                    }
                    if (a2$.highlight || a2$.parameters.highlight) {
                        n5G *= 2;
                    }
                    this.startClip(R98.name);
                    seriesPlotter = new R.Plotter();
                    seriesPlotter.newSeries(Y7m, L_w, g2V,  + "1", n5G);
                    if (p$E.gaps && p$E.gaps.color) {
                        seriesPlotter.newSeries("gap", "stroke", p$E.gaps.color, 1, n5G);
                    } else {
                        seriesPlotter.newSeries("gap", "stroke", g2V,  + "1", n5G);
                    }
                    a2$.yValueCache = new Array(n3E.length);
                    q_l = a2$.yValueCache;
                    x3h = null;
                    n$7 = null;
                    J_6 = [];
                    D2R = a2$.parameters.shareYAxis && !x1O;
                    W3X = a2$.parameters.shareYAxis || x1O;
                    N1O.p86(56);
                    var W9h = N1O.U9a(20, 14, 13, 22);
                    N1O.B_x(2);
                    var D7K = N1O.f21(1, 0);
                    f4F = R98.left - (J3g ? W9h : 0.5) * s2d + this.micropixels - D7K;
                    l_p = f4F;
                    for (var T6$ = 0; T6$ < n3E.length; T6$++) {
                        N1O.B_x(83);
                        f4F += N1O.U9a(0, s2d, "2");
                        if (J3g) {
                            N1O.B_x(24);
                            f4F += N1O.U9a(2, s2d);
                        }
                        s2d = this.layout.candleWidth;
                        if (!J3g) {
                            N1O.B_x(24);
                            f4F += N1O.f21(2, s2d);
                        }
                        if (l_f !== null && t$X !== null) {
                            if (!n$7 || p$E.gaps) {
                                J_6.push([l_f, t$X]);
                            }
                        }
                        K5w = n3E[T6$];
                        if (!K5w)
                            continue;
                        if (K5w.candleWidth) {
                            if (!J3g) {
                                N1O.B_x(56);
                                var J3F = N1O.f21(9, 11, 0, 22);
                                f4F += (K5w.candleWidth - s2d) / J3F;
                            }
                            s2d = K5w.candleWidth;
                        }
                        if (K5w.transform && D2R) {
                            K5w = K5w.transform;
                        }
                        Y36 = K5w[j85];
                        if (!Y36 && Y36 !==  + "0") {
                            if (J3g || p$E.gaps) {
                                q_l[T6$] = t$X; ;
                            }
                            if (n$7 === !!"") {
                                d37 = "g";
                                d37 += "a";
                                d37 += "p";
                                if (J3g) {
                                    l_f += s2d;
                                    seriesPlotter.lineTo("line", l_f, t$X);
                                }
                                seriesPlotter.moveTo(d37, l_f, t$X);
                            }
                            n$7 = !!1;
                            if (l_f && !p$E.gaps) {
                                J_6.push([l_f, F5v]);
                            }
                            continue;
                        }
                        if (!J3g && V2Y && V2Y != T6$ - 1) {
                            E6V = l_f;
                            f6g = t$X;
                        } else {
                            E6V = null;
                        }
                        l_f = f4F;
                        if (l_f <= R98.right) {
                            x3h = K5w;
                        }
                        if (this.extendLastTick && T6$ == n3E.length -  + "1") {
                            N1O.B_x(24);
                            l_f += N1O.f21(2, s2d);
                        }
                        if (J3g && S4i) {
                            if (n$7 && p$E.gaps && p$E.gaps.pattern) {
                                seriesPlotter.dashedLineTo("gap", l_f, t$X, p$E.gaps.pattern);
                            } else if (n$7 && !p$E.gaps) {
                                J_6.push([l_f, F5v]);
                                seriesPlotter.moveTo("gap", l_f, t$X);
                            } else if (!n$7 && p$E.pattern) {
                                seriesPlotter.dashedLineTo("line", l_f, t$X, p$E.pattern);
                            } else {
                                seriesPlotter.lineTo(n$7 ? "gap" : "line", l_f, t$X);
                            }
                            J_6.push([l_f, t$X]);
                        }
                        if (W3X) {
                            t$X = this.pixelFromPrice(Y36, R98, k$S);
                        } else {
                            N1O.p86(84);
                            t$X = N1O.U9a(Y36, F5v, l8_, e9P);
                        }
                        if (E6V !== null) {
                            O1D = {
                                x0: E6V,
                                x1: l_f,
                                y0: f6g,
                                y1: t$X
                            };
                            for (; V2Y != T6$; V2Y++) {
                                N1O.p86(7);
                                var o$Z = N1O.U9a(12, 13);
                                U9g = R98.left + Math.floor(f4F + (V2Y - T6$ + 0.5) * s2d) + this.micropixels - o$Z;
                                j5D = R.yIntersection(O1D, U9g);
                                q_l[V2Y] = j5D;
                            }
                        }
                        q_l[T6$] = t$X;
                        if (T6$ && J_6.length && S4i && !q_l[T6$ - 1] && q_l[T6$ - 1] !==  + "0") {
                            for (var w9z = T6$ - 1; w9z >= 0; w9z--) {
                                if (q_l[w9z])
                                    break;
                                N1O.B_x(49);
                                var M4f = N1O.U9a(56, 17, 12, 20, 5);
                                q_l[w9z] = J_6[J_6.length - M4f][1];
                            }
                        }
                        if (!S4i) {
                            S4i = !0;
                            J8Y = T7G.dataSet.length - T7G.scroll;
                            if (J8Y <= 0) {
                                B10 = "g";
                                B10 += "ap";
                                seriesPlotter.moveTo(n$7 ? B10 : "line", l_f, t$X);
                            } else {
                                X0$ = T7G.dataSet[J8Y];
                                if (X0$.transform && D2R) {
                                    X0$ = X0$.transform;
                                }
                                W00 = X0$[j85];
                                if (W3X) {
                                    W00 = this.pixelFromPrice(W00, R98, k$S);
                                } else {
                                    N1O.B_x(84);
                                    W00 = N1O.U9a(W00, F5v, l8_, e9P);
                                }
                                W00 = Math.min(Math.max(W00, t11), F5v);
                                if (isNaN(W00)) {
                                    Q8i = "g";
                                    Q8i += "a";
                                    Q8i += "p";
                                    seriesPlotter.moveTo(n$7 ? Q8i : "line", l_f, t$X);
                                } else {
                                    P3p = "g";
                                    P3p += "a";
                                    P3p += "p";
                                    seriesPlotter.moveTo(n$7 ? P3p : "line", l_p, W00);
                                    if (J3g) {
                                        if (n$7) {
                                            if (p$E.gaps) {
                                                seriesPlotter.lineTo("gap", l_f, W00);
                                            } else {
                                                seriesPlotter.moveTo("gap", l_f, W00);
                                            }
                                        } else {
                                            seriesPlotter.lineTo("line", l_f, W00);
                                        }
                                    }
                                    if (!n$7 || p$E.gaps) {
                                        if (J3g) {
                                            J_6.unshift([l_f, W00]);
                                        }
                                        J_6.unshift([l_p, W00]);
                                    }
                                    if (n$7 && p$E.gaps && p$E.gaps.pattern) {
                                        o1P = "g";
                                        o1P += "a";
                                        o1P += "p";
                                        seriesPlotter.dashedLineTo(o1P, l_f, t$X, p$E.gaps.pattern);
                                    } else if (n$7 && !p$E.gaps) {
                                        J_6.unshift([l_f, F5v]);
                                        J_6.unshift([l_p, F5v]);
                                        seriesPlotter.moveTo("gap", l_f, t$X);
                                    } else if (!n$7 && p$E.pattern) {
                                        seriesPlotter.dashedLineTo("line", l_f, t$X, p$E.pattern);
                                    } else {
                                        v2y = "g";
                                        v2y += "a";
                                        v2y += "p";
                                        seriesPlotter.lineTo(n$7 ? v2y : "line", l_f, t$X);
                                    }
                                }
                            }
                        } else {
                            if (n$7 && p$E.gaps && p$E.gaps.pattern) {
                                seriesPlotter.dashedLineTo("gap", l_f, t$X, p$E.gaps.pattern);
                            } else if (n$7 && !p$E.gaps) {
                                J_6.push([l_f, F5v]);
                                seriesPlotter.moveTo("gap", l_f, t$X);
                            } else if (!n$7 && p$E.pattern) {
                                seriesPlotter.dashedLineTo("line", l_f, t$X, p$E.pattern);
                                if (J3g && T6$ == n3E.length - 1) {
                                    N1O.B_x(2);
                                    seriesPlotter.dashedLineTo("line", N1O.U9a(s2d, l_f), t$X, p$E.pattern);
                                }
                            } else {
                                b3k = "l";
                                b3k += "i";
                                b3k += "n";
                                b3k += "e";
                                seriesPlotter.lineTo(n$7 ? "gap" : "line", l_f, t$X);
                                if (J3g && T6$ == n3E.length - 1 && !n$7) {
                                    N1O.B_x(2);
                                    seriesPlotter.lineTo(b3k, N1O.U9a(s2d, l_f), t$X);
                                }
                            }
                        }
                        V2Y = T6$;
                        if (n$7) {
                            seriesPlotter.moveTo("line", l_f, t$X);
                        }
                        n$7 = !!"";
                    }
                    if (n$7) {
                        N1O.p86(2);
                        var S7q = N1O.U9a(1, 0);
                        l_f = R98.left + Math.floor(f4F + s2d + this.micropixels) - S7q;
                        if (this.extendLastTick) {
                            N1O.B_x(24);
                            l_f += N1O.f21(2, s2d);
                        }
                        if (p$E.gaps && p$E.gaps.pattern) {
                            if (S4i) {
                                W5y = "g";
                                W5y += "a";
                                W5y += "p";
                                seriesPlotter.dashedLineTo(W5y, l_f, t$X, p$E.gaps.pattern);
                            }
                        } else if (p$E.gaps) {
                            K5Z = "g";
                            K5Z += "a";
                            K5Z += "p";
                            seriesPlotter.lineTo(K5Z, l_f, t$X);
                        }
                    }
                    if (a2$.parameters.chartType == "mountain" && J_6.length) {
                        x1Z = "moun";
                        x1Z += "tai";
                        x1Z += "n";
                        z3h = "mou";
                        z3h += "ntain";
                        i36 = "mountai";
                        i36 += "n";
                        J_6.push([l_f, n$7 && !p$E.gaps ? F5v : t$X]);
                        if (!p$E.fillStyle) {
                            p$E.fillStyle = g2V;
                            if (!p$E.fillOpacity) {
                                p$E.fillOpacity = 0.3;
                            }
                        }
                        seriesPlotter.newSeries(i36, "fill", p$E.fillStyle, p$E.fillOpacity);
                        for (var A3n = 0; A3n < J_6.length; A3n++) {
                            seriesPlotter[A3n ? "lineTo" : "moveTo"]("mountain", J_6[A3n][ + "0"], Math.min(F5v, J_6[A3n][1]));
                        }
                        seriesPlotter.lineTo(z3h, l_f, F5v);
                        seriesPlotter.lineTo("mountain", J_6[0][0], F5v);
                        seriesPlotter.draw(r9f, x1Z);
                    }
                    seriesPlotter.draw(r9f, V8v);
                    seriesPlotter.draw(r9f, "line");
                    this.endClip();
                    if (W3X && x3h) {
                        if (k$S.priceFormatter) {
                            txt = k$S.priceFormatter(this, R98, x3h[j85], k$S);
                        } else {
                            txt = this.formatYAxisPrice(x3h[j85], R98, null, k$S);
                        }
                        this.yAxisLabels.push({
                            src: "series",
                            "args": [R98, txt, this.pixelFromPrice(x3h[j85], R98, k$S), g2V, null, null, k$S]
                        });
                    }
                    G3a = a2$.parameters.display;
                    if (!G3a) {
                        G3a = a2$.display;
                    }
                    k65[j85] = {
                        color: g2V,
                        display: G3a
                    }; ;
                }
                if (T7G.legend && a2$ && a2$.useChartLegend) {
                    if (T7G.legendRenderer) {
                        T7G.legendRenderer(this, {
                            "chart": T7G,
                            "legendColorMap": k65,
                            "coordinates": {
                                x: T7G.legend.x,
                                y: T7G.legend.y + T7G.panel.yAxis.top
                            }
                        });
                    }
                }
                this.runAppend("drawSeries", arguments);
            };
            S.prototype.isDailyInterval = function (k92) {
                if (k92 == "day") {
                    return !!({});
                }
                if (k92 == "week") {
                    return !!({});
                }
                if (k92 == "month") {
                    return !0;
                }
                N1O.N7F();
                return ![];
            };
            S.prototype.setPeriodicityV2 = function (Q3d, d0i, x2t, Z86) {
                var I_o,
                n8G,
                l0t,
                q_n,
                s1M,
                Q8H,
                q9x,
                l8O,
                c9p,
                Q9P,
                B6k,
                W1N,
                j2c,
                c7Z;
                if (this.runPrepend("setPeriodicityV2", arguments)) {
                    return;
                }
                if (typeof x2t === "function") {
                    Z86 = x2t;
                    x2t = null;
                }
                I_o = !!0;
                if (!d0i) {
                    return;
                }
                if (!Q3d) {
                    return;
                }
                delete this.layout.setSpan;
                if (d0i == "year") {
                    n8G = "m";
                    n8G += "on";
                    n8G += "th";
                    d0i = n8G;
                    if (!Q3d) {
                        Q3d = 1;
                    }
                    N1O.B_x(85);
                    Q3d = N1O.U9a(0, Q3d, "12");
                }
                N1O.A7M();
                l0t = this.isDailyInterval(d0i);
                q_n = this.isDailyInterval(this.layout.interval);
                if (l0t) {
                    x2t = null;
                } else if (d0i == "tick") {
                    x2t = null;
                } else if (!x2t) {
                    x2t = "minute";
                }
                s1M = ![];
                if (this.chart.symbol) {
                    if (this.dontRoll || !q_n) {
                        if (this.layout.interval != d0i) {
                            s1M = !!1;
                        }
                    } else {
                        if (l0t != q_n) {
                            s1M = !!"1";
                        }
                    }
                    if (x2t != this.layout.timeUnit) {
                        s1M = !!({});
                    };
                }
                this.layout.periodicity = Q3d;
                this.layout.interval = d0i;
                this.layout.timeUnit = x2t;
                if (s1M) {
                    this.changeOccurred("layout");
                    if (this.quoteDriver) {
                        for (var K5y in this.charts) {
                            if (this.charts[K5y].symbol) {
                                if (this.displayInitialized) {
                                    this.quoteDriver.newChart({
                                        symbol: this.charts[K5y].symbol,
                                        symbolObject: this.charts[K5y].symbolObject,
                                        chart: this.charts[K5y]
                                    }, Z86);
                                } else {
                                    this.newChart(this.charts[K5y].symbol, null, this.charts[K5y], Z86);
                                }
                            }
                        }
                        return;
                    } else if (this.dataCallback) {
                        this.dataCallback();
                        if (Z86) {
                            Z86(null);
                        }
                        return;
                    } else {
                        Q8H = "cannot change periodicity because neither dataC";
                        Q8H += "allback or quoteDriver are set";
                        console.log(Q8H);
                        return;
                    }
                }
                for (q9x in this.charts) {
                    l8O = this.charts[q9x];
                    Q9P = Math.round(l8O.maxTicks / 2);
                    this.setCandleWidth(this.layout.candleWidth, l8O);
                    B6k = !0;
                    W1N = ![];
                    if (l8O.scroll <= l8O.maxTicks) {
                        B6k = !1;
                    } else if (l8O.dataSegment && !l8O.dataSegment[Q9P]) {
                        B6k = !({});
                        W1N = l8O.scroll - l8O.dataSet.length; ;
                    }
                    if (B6k && l8O.dataSegment && l8O.dataSegment.length > 0) {
                        if (l8O.maxTicks < (Math.round(this.chart.width / this.layout.candleWidth - 0.499) - 1) / 2) {
                            N1O.p86(86);
                            var A7P = N1O.U9a(6, 11, 67);
                            Q9P = l8O.dataSegment.length - A7P;
                        }
                        if (Q9P >= l8O.dataSegment.length) {
                            c9p = l8O.dataSegment[l8O.dataSegment.length - 1].DT;
                            N1O.B_x(7);
                            var y4p = N1O.U9a(8, 9);
                            Q9P = l8O.dataSegment.length - y4p;
                        } else {
                            c9p = l8O.dataSegment[Q9P].DT;
                        }
                    }
                    this.createDataSet();
                    if (B6k) {
                        if (l8O.dataSegment && l8O.dataSegment.length > 0) {
                            for (var t2y = l8O.dataSet.length -  + "1"; t2y >= 0; t2y--) {
                                j2c = l8O.dataSet[t2y].DT;
                                if (j2c.getTime() < c9p.getTime()) {
                                    l8O.scroll = l8O.dataSet.length - t2y + Q9P;
                                    break;
                                }
                            }
                        }
                    } else if (!W1N) {
                        c7Z = Math.round(this.preferences.whitespace / this.layout.candleWidth);
                        l8O.scroll = l8O.maxTicks - c7Z; ;
                    } else {
                        l8O.scroll = l8O.dataSet.length + W1N; ;
                    }
                }
                if (this.displayInitialized) {
                    this.draw();
                }
                this.changeOccurred("layout");
                if (this.quoteDriver) {
                    for (q9x in this.charts) {
                        l8O = this.charts[q9x];
                        if (l8O.symbol && l8O.moreAvailable) {
                            this.quoteDriver.checkLoadMore(l8O);
                        }
                    }
                }
                if (Z86) {
                    Z86(null);
                }
                this.runAppend("setPeriodicityV2", arguments);
            };
            S.prototype.drawVectors = function () {
                N1O.N7F();
                var q2w,
                o96,
                y1Q,
                z$8,
                A_2;
                if (this.vectorsShowing) {
                    return;
                }
                if (this.runPrepend("drawVectors", arguments)) {
                    return;
                }
                this.vectorsShowing = !![];
                if (!this.chart.hideDrawings) {
                    q2w = {};
                    for (y1Q = 0; y1Q < this.drawingObjects.length; y1Q++) {
                        z$8 = this.drawingObjects[y1Q];
                        o96 = z$8.panelName;
                        if (!this.panels[z$8.panelName])
                            continue;
                        if (!q2w[o96]) {
                            q2w[o96] = [];
                        }
                        q2w[o96].push(z$8);
                    }
                    for (o96 in q2w) {
                        this.startClip(o96);
                        A_2 = q2w[o96];
                        for (y1Q = 0; y1Q < A_2.length; y1Q++) {
                            A_2[y1Q].render(this.chart.context);
                        }
                        this.endClip();
                    }
                }
                this.runAppend("drawVectors", arguments);
            };
            S.prototype.consolidatedQuote = function (l28, R4e, N_y, K5c, u4W, N5r, u9u) {
                var i9i,
                m5a,
                V3B,
                c0i,
                e7U,
                K7S;
                i9i = "mo";
                function a2d(X2x, u8O) {
                    var g2U,
                    Q47,
                    R0I,
                    U_1,
                    J2i;
                    g2U = "Hig";
                    g2U += "h";
                    Q47 = 1;
                    if (X2x.layout.adj && l28[u8O].Adj_Close) {
                        R0I =  + "748610574";
                        U_1 = -1799876226;
                        J2i = 2;
                        for (var E8B = 1; N1O.Y4l(E8B.toString(), E8B.toString().length, 60648) !== R0I; E8B++) {
                            Q47 = l28[u8O].Adj_Close / l28[u8O].Close;
                            J2i +=  + "2";
                        }
                        if (N1O.Y4l(J2i.toString(), J2i.toString().length, 14391) !== U_1) {
                            Q47 = l28[u8O].Adj_Close + l28[u8O].Close;
                        }
                    }
                    if ((g2U in l28[u8O]))
                        if (l28[u8O].High * Q47 > V3B.High) {
                            V3B.High = l28[u8O].High * Q47;
                        }
                    if (("Low" in l28[u8O]))
                        if (l28[u8O].Low * Q47 < V3B.Low) {
                            V3B.Low = l28[u8O].Low * Q47;
                        }
                    V3B.Volume += l28[u8O].Volume;
                    if (("Close" in l28[u8O]) && l28[u8O].Close !== null) {
                        V3B.Close = l28[u8O].Close * Q47;
                    }
                    V3B.ratio = Q47;
                    for (var v1S in l28[u8O]) {
                        if (!V3B[v1S]) {
                            V3B[v1S] = l28[u8O][v1S];
                        }
                    }
                }
                i9i += "nth";
                if (R4e < 0) {
                    return null;
                }
                function k0H(i1D, H4g) {
                    var g58,
                    M1I,
                    f4I,
                    u3f,
                    L1$;
                    g58 = l28[i1D - 1].DT;
                    M1I = l28[i1D].DT;
                    if (H4g == "week") {
                        f4I = 1236630669;
                        u3f = -1873246213;
                        L1$ =  + "2";
                        for (var n02 = 1; N1O.n$d(n02.toString(), n02.toString().length, 24412) !== f4I; n02++) {
                            if (M1I.getDay() > g58.getDay()) {
                                return !!"";
                            }
                            N1O.B_x(7);
                            L1$ += N1O.U9a(0, "2");
                        }
                        if (N1O.Y4l(L1$.toString(), L1$.toString().length, "98360" ^ 0) !== u3f) {
                            if (M1I.getDay() < g58.getDay()) {
                                return !!({});
                            }
                        }
                    } else if (H4g == "month") {
                        if (M1I.getMonth() != g58.getMonth()) {
                            return !![];
                        }
                    } else {
                        if (M1I.getDay() != g58.getDay()) {
                            return !![];
                        }
                    }
                    return !"1";
                }
                m5a = [l28, R4e, N_y, K5c, N5r, u9u];
                if (this.runPrepend("consolidatedQuote", m5a)) {
                    return null;
                }
                if (!N5r && this.dontRoll) {
                    N5r = !!1;
                }
                V3B = l28[R4e];
                c0i = R4e;
                if ((K5c == "week" || K5c == i9i) && !N5r) {
                    for (e7U = 1; e7U <= N_y; e7U++) {
                        while (c0i + 1 < l28.length && !k0H(c0i + 1, K5c)) {
                            c0i++;
                            a2d(this, c0i);
                        }
                        if (e7U != N_y) {
                            c0i++;
                            if (c0i < l28.length) {
                                a2d(this, c0i);
                            }
                        }
                    }
                } else if (!this.isDailyInterval(K5c) && K5c != "tick" && N_y > 1) {
                    for (e7U =  + "1"; e7U < N_y; e7U++) {
                        N1O.p86(2);
                        c0i = N1O.U9a(e7U, R4e);
                        if (c0i < l28.length && P_f(R4e, c0i, N_y, K5c, u4W)) {
                            c0i--;
                            break;
                        }
                        if (c0i >= "0" << 64 && c0i < l28.length) {
                            a2d(this, c0i);
                        }
                    }
                } else {
                    for (e7U = 1; e7U < N_y; e7U++) {
                        N1O.B_x(2);
                        c0i = N1O.f21(e7U, R4e);
                        if (c0i >=  + "0" && c0i < l28.length) {
                            a2d(this, c0i);
                        }
                    }
                }
                for (e7U in this.plugins) {
                    K7S = this.plugins[e7U];
                    if (K7S.consolidate) {
                        K7S.consolidate(l28, R4e, c0i, V3B);
                    }
                }
                this.runAppend("consolidatedQuote", m5a);
                function P_f(i47, O_b, x6W, U6w, A8w) {
                    var V6J,
                    G79,
                    x5c;
                    N1O.B_x(0);
                    V6J = N1O.f21(x6W, U6w);
                    G79 = new Date(l28[i47].DT);
                    if (A8w === "millisecond") {
                        G79.setMilliseconds(G79.getMilliseconds() + V6J);
                    } else if (A8w === "second") {
                        G79.setSeconds(G79.getSeconds() + V6J);
                    } else {
                        G79.setMinutes(G79.getMinutes() + V6J);
                    }
                    N1O.N7F();
                    x5c = l28[O_b].DT;
                    if (u9u) {
                        if (l28[i47].DT.getMinutes() % V6J) {
                            if (x5c.getMinutes() % V6J ===  + "0") {
                                return !!1;
                            }
                        }
                    }
                    if (x5c.getTime() >= G79.getTime()) {
                        return !!"1";
                    }
                    return ![];
                }
                return {
                    "quote": V3B,
                    "position": c0i + 1
                };
            };
            S.NONE = 0;
            S.CLOSEUP = 1;
            S.CLOSEDOWN = 2;
            S.CLOSEEVEN = 4;
            S.CANDLEUP = 8;
            S.CANDLEDOWN = 16;
            S.CANDLEEVEN = 32;
            S.prototype.displayChart = function (N4a) {
                var v5v,
                l8N,
                E5L,
                L5N,
                o2j,
                I2C,
                J_L,
                u$s,
                U43,
                d1p,
                C9T,
                d$F,
                u9i,
                L0a,
                l0Z,
                D_g,
                K9_,
                F8X,
                d1r,
                f9G,
                x5H,
                q0W,
                d4B,
                j7d,
                M11,
                V_l,
                I_L,
                g9G,
                N90,
                a6n,
                t3Q,
                H5u,
                U$B,
                U3L,
                T7P,
                W0J,
                y_F,
                l5S,
                X0_,
                d1V,
                g1K,
                m8Z,
                O_$,
                M8K,
                x3S,
                L9r,
                T8Q,
                Q1F,
                z5T,
                e_L,
                u3r,
                o5d,
                c43;
                v5v = "ho";
                v5v += "llow_cand";
                v5v += "le";
                l8N = "pa";
                l8N += "nd";
                l8N += "f";
                E5L = "displa";
                E5L += "yC";
                E5L += "hart";
                L5N = this.layout.candleWidth - N4a.tmpWidth < 2 && N4a.tmpWidth <= 3;
                if (this.runPrepend(E5L, arguments)) {
                    return;
                }
                this.chart.baseLegendColors = [];
                o2j = this.layout.chartType;
                I2C = null;
                if (N4a.customChart) {
                    if (N4a.customChart.chartType) {
                        o2j = N4a.customChart.chartType;
                    }
                    if (N4a.customChart.colorFunction) {
                        I2C = N4a.customChart.colorFunction;
                    }
                }
                this.controls.baselineHandle.style.display = "none";
                J_L = N4a.panel;
                if (this.layout.aggregationType == "kagi") {
                    u$s = "stx_";
                    u$s += "kagi_d";
                    u$s += "o";
                    u$s += "wn";
                    this.drawKagiSquareWave(J_L, "stx_kagi_up", "stx_kagi_down");
                    this.chart.baseLegendColors.push(this.getCanvasColor("stx_kagi_up"));
                    this.chart.baseLegendColors.push(this.getCanvasColor(u$s));
                } else if (this.layout.aggregationType == l8N) {
                    U43 = "st";
                    U43 += "x_pandf";
                    U43 += "_down";
                    d1p = "st";
                    d1p += "x_p";
                    d1p += "andf_";
                    d1p += "up";
                    this.drawPointFigureChart(J_L, d1p, 923.61 > 3941 ? (5799, 655.73) === (8323, 9280) ? (!"", 0xc30) : "B" : "X");
                    this.chart.baseLegendColors.push(this.getCanvasColor("stx_pandf_up"));
                    this.drawPointFigureChart(J_L, U43, 608 == (1040, "4200" >> 64) ? "h" : "O");
                    this.chart.baseLegendColors.push(this.getCanvasColor("stx_pandf_down"));
                } else if (o2j == "line") {
                    this.drawLineChart(J_L, "stx_line_chart");
                } else if (o2j == "mountain") {
                    this.startClip(J_L.name);
                    this.chart.baseLegendColors = null;
                    this.drawMountainChart(J_L);
                    this.endClip();
                } else if (o2j == "colored_mountain") {
                    C9T = "stx";
                    C9T += "_line_c";
                    C9T += "hart";
                    this.startClip(J_L.name);
                    d$F = this.getCanvasColor("stx_line_up");
                    u9i = this.getCanvasColor("stx_line_down");
                    L0a = this.getCanvasColor(C9T);
                    if (!I2C) {
                        I2C = function (h7d, b9K, n4A) {
                            if (b9K.Close > b9K.iqPrevClose) {
                                return d$F;
                            } else if (b9K.Close < b9K.iqPrevClose) {
                                return u9i;
                            } else {
                                return L0a;
                            }
                            N1O.N7F();
                            return null;
                        };
                    }
                    l0Z = this.drawMountainChart(J_L, "stx_colored_mountain_chart", I2C);
                    for (var g0p in l0Z) {
                        this.chart.baseLegendColors.push(g0p);
                    }
                    this.endClip();
                } else if (o2j == "wave") {
                    this.drawWaveChart(J_L);
                } else if (o2j == "bar") {
                    this.startClip(J_L.name);
                    this.drawBarChartHighPerformance(J_L, "stx_bar_chart");
                    this.endClip();
                } else if (o2j == "colored_line") {
                    this.startClip(J_L.name);
                    d$F = this.getCanvasColor("stx_line_up");
                    u9i = this.getCanvasColor("stx_line_down");
                    L0a = this.getCanvasColor("stx_line_chart");
                    if (!I2C) {
                        I2C = function (U5W, l34, F_h) {
                            if (l34.Close > l34.iqPrevClose) {
                                return d$F;
                            } else if (l34.Close < l34.iqPrevClose) {
                                return u9i;
                            } else {
                                return L0a;
                            }
                            return null;
                        };
                    }
                    l0Z = this.drawLineChart(J_L, "stx_line_chart", I2C);
                    for (var g0p in l0Z) {
                        this.chart.baseLegendColors.push(g0p);
                    }
                    this.endClip();
                } else if (o2j == "colored_bar") {
                    this.startClip(J_L.name);
                    if (I2C) {
                        D_g = this.drawBarChart(J_L, "stx_bar_chart", I2C);
                        for (var h9i in D_g) {
                            this.chart.baseLegendColors.push(h9i);
                        }
                    } else {
                        K9_ = "stx_bar_u";
                        K9_ += "p";
                        this.drawBarChartHighPerformance(J_L, "stx_bar_up", S.CLOSEUP);
                        this.drawBarChartHighPerformance(J_L, "stx_bar_down", S.CLOSEDOWN);
                        this.drawBarChartHighPerformance(J_L, "stx_bar_even", S.CLOSEEVEN);
                        this.chart.baseLegendColors.push(this.getCanvasColor(K9_));
                        this.chart.baseLegendColors.push(this.getCanvasColor("stx_bar_down"));
                    }
                    this.endClip();
                } else if (o2j == v5v || o2j == "volume_candle") {
                    this.startClip(J_L.name);
                    if (I2C) {
                        if (!this.noWicksOnCandles[this.layout.aggregationType]) {
                            this.drawShadows(J_L, I2C);
                        }
                        this.drawCandles(J_L, I2C, ![]);
                        this.drawCandles(J_L, I2C, !""); ;
                    } else {
                        F8X = "transp";
                        F8X += "a";
                        F8X += "rent";
                        d1r = "stx_hollow";
                        d1r += "_candle_even";
                        f9G = "stx_holl";
                        f9G += "ow_candle_u";
                        f9G += "p";
                        if (!this.noWicksOnCandles[this.layout.aggregationType]) {
                            x5H = "stx_";
                            x5H += "hollow_c";
                            x5H += "andle_";
                            x5H += "even";
                            q0W = "st";
                            q0W += "x_hollow_cand";
                            q0W += "le_u";
                            q0W += "p";
                            this.drawShadowsHighPerformance(J_L, q0W, S.CLOSEUP);
                            this.drawShadowsHighPerformance(J_L, "stx_hollow_candle_down", S.CLOSEDOWN);
                            this.drawShadowsHighPerformance(J_L, x5H, S.CLOSEEVEN);
                        }
                        d4B = this.getCanvasColor(f9G);
                        j7d = this.getCanvasColor("stx_hollow_candle_down");
                        M11 = this.getCanvasColor(d1r);
                        this.drawCandlesHighPerformance(J_L, d4B, "transparent", S.CLOSEUP | S.CANDLEDOWN);
                        this.drawCandlesHighPerformance(J_L, j7d, "transparent", S.CLOSEDOWN | S.CANDLEDOWN);
                        this.drawCandlesHighPerformance(J_L, M11, F8X, S.CLOSEEVEN | S.CANDLEDOWN);
                        this.drawCandlesHighPerformance(J_L, this.containerColor, d4B, S.CLOSEUP | S.CANDLEUP);
                        this.drawCandlesHighPerformance(J_L, this.containerColor, j7d, S.CLOSEDOWN | S.CANDLEUP);
                        this.drawCandlesHighPerformance(J_L, this.containerColor, M11, S.CLOSEEVEN | S.CANDLEUP);
                        this.chart.baseLegendColors.push(d4B);
                        this.chart.baseLegendColors.push(j7d);
                    }
                    this.endClip();
                } else if (o2j == "candle") {
                    this.startClip(J_L.name);
                    V_l = this.getCanvasColor("stx_candle_shadow_up");
                    I_L = this.getCanvasColor("stx_candle_shadow_down");
                    N1O.p86(87);
                    g9G = N1O.f21(V_l, I_L);
                    if (I2C) {
                        if (!this.noWicksOnCandles[this.layout.aggregationType]) {
                            this.drawShadows(J_L, I2C);
                        }
                        this.drawCandles(J_L, I2C, !"1");
                        if (!L5N) {
                            this.drawCandles(J_L, I2C, !"");
                        };
                    } else {
                        N90 = "st";
                        N90 += "x_candle_dow";
                        N90 += "n";
                        a6n = "border-left-c";
                        a6n += "ol";
                        a6n += "or";
                        t3Q = "border-";
                        t3Q += "lef";
                        t3Q += "t-color";
                        H5u = "stx_candle";
                        H5u += "_";
                        H5u += "up";
                        if (!this.noWicksOnCandles[this.layout.aggregationType]) {
                            if (g9G) {
                                U$B = "stx";
                                U$B += "_candle_shad";
                                U$B += "ow";
                                U3L = "stx";
                                U3L += "_candle_shadow_u";
                                U3L += "p";
                                this.drawShadowsHighPerformance(J_L, U3L, S.CANDLEUP);
                                this.drawShadowsHighPerformance(J_L, "stx_candle_shadow_down", S.CANDLEDOWN);
                                this.drawShadowsHighPerformance(J_L, U$B, S.CANDLEEVEN);
                            } else {
                                T7P = "stx_candle";
                                T7P += "_s";
                                T7P += "ha";
                                T7P += "dow";
                                this.drawShadowsHighPerformance(J_L, T7P);
                            }
                        }
                        W0J = this.canvasStyle(H5u);
                        y_F = W0J[t3Q];
                        if (!y_F) {
                            y_F = W0J.borderLeftColor;
                        }
                        if (L5N) {
                            y_F = null;
                        }
                        this.drawCandlesHighPerformance(J_L, this.getCanvasColor("stx_candle_up"), y_F, S.CANDLEUP);
                        this.chart.baseLegendColors.push(W0J.color);
                        W0J = this.canvasStyle("stx_candle_down");
                        y_F = W0J[a6n];
                        if (!y_F) {
                            y_F = W0J.borderLeftColor;
                        }
                        if (L5N) {
                            y_F = null;
                        }
                        this.drawCandlesHighPerformance(J_L, this.getCanvasColor(N90), y_F, S.CANDLEDOWN);
                        this.chart.baseLegendColors.push(W0J.color);
                    }
                    this.endClip();
                } else if (o2j == "baseline_delta") {
                    l5S = "stx";
                    l5S += "_base";
                    l5S += "line_t";
                    l5S += "race";
                    this.startClip(J_L.name);
                    this.setStyle(l5S, "opacity", 0);
                    this.drawLineChart(J_L, "stx_baseline_trace");
                    X0_ = N4a.baseline.actualLevel;
                    if (X0_ !== null) {
                        d1V = "2.";
                        d1V += "1";
                        g1K = "lin";
                        g1K += "e";
                        X0_ = this.pixelFromPriceTransform(X0_, N4a.panel);
                        m8Z = {
                            "over": "stx_baseline_up",
                            "under": "stx_baseline_down"
                        };
                        for (var E7Z in m8Z) {
                            O_$ = {
                                panelName: "chart",
                                band: "Close",
                                threshold: N4a.baseline.actualLevel,
                                color: this.getCanvasColor(m8Z[E7Z]),
                                direction: E7Z == "over" ? 1 :  - ("1" >> 0),
                                edgeHighlight: this.getCanvasColor(m8Z[E7Z]),
                                edgeParameters: {
                                    pattern: "solid",
                                    lineWidth: parseInt(this.canvasStyle(m8Z[E7Z]).width, 10) + 0.1,
                                    opacity: 1
                                }
                            };
                            M8K = O_$.color;
                            if (M8K && M8K != "transparent") {
                                x3S = N4a.context.createLinearGradient(0, E7Z == "over" ? 0 : "2" * 1 * X0_, 0, X0_);
                                x3S.addColorStop(0, R.hexToRgba(M8K, 60));
                                x3S.addColorStop(1, R.hexToRgba(M8K, 10));
                                O_$.color = x3S;
                                O_$.opacity = 1;
                            }
                            R.Studies.preparePeakValleyFill(this, N4a.dataSegment, O_$);
                            this.chart.baseLegendColors.push(M8K);
                        }
                        this.plotLine(0, 1, X0_, X0_, this.containerColor, "line", N4a.context, !!1, {
                            pattern: "solid",
                            lineWidth: "1.1",
                            opacity: 1
                        });
                        this.plotLine(0, 1, X0_, X0_, this.getCanvasColor("stx_baseline"), g1K, N4a.context, !!({}), {
                            pattern: "dotted",
                            lineWidth: d1V,
                            opacity: 0.5
                        });
                        if (this.chart.baseline.userLevel !== !({})) {
                            N1O.p86(7);
                            var n7d = N1O.f21(50, 60);
                            N1O.p86(36);
                            var r8Z = N1O.U9a(0, 18, 20);
                            this.controls.baselineHandle.style.top = X0_ - parseInt(getComputedStyle(this.controls.baselineHandle).height, n7d) / r8Z + "px";
                            N1O.p86(8);
                            var O9E = N1O.f21(40, 37, 7);
                            this.controls.baselineHandle.style.left = this.chart.right - parseInt(getComputedStyle(this.controls.baselineHandle).width, O9E) + "px";
                            this.controls.baselineHandle.style.display = "block";
                        }
                    }
                    this.endClip();
                } else if (o2j == "baseline_delta_mountain") {
                    X0_ = N4a.baseline.actualLevel;
                    if (X0_ !== null) {
                        L9r = "2";
                        L9r += ".";
                        L9r += "1";
                        T8Q = "1";
                        T8Q += ".";
                        T8Q += "1";
                        Q1F = "l";
                        Q1F += "ine";
                        z5T = "stx_bas";
                        z5T += "eline_down";
                        e_L = "st";
                        e_L += "x_";
                        e_L += "baseline_trace";
                        this.startClip(J_L.name);
                        this.drawMountainChart(J_L, "stx_baseline_delta_mountain");
                        this.endClip();
                        this.startClip(J_L.name);
                        this.setStyle(e_L, "opacity", 0);
                        this.drawLineChart(J_L, "stx_baseline_trace");
                        X0_ = this.pixelFromPriceTransform(X0_, N4a.panel);
                        m8Z = {
                            "over": "stx_baseline_up",
                            "under": z5T
                        };
                        for (var E7Z in m8Z) {
                            O_$ = {
                                panelName: "chart",
                                band: "Close",
                                threshold: N4a.baseline.actualLevel,
                                color: this.getCanvasColor(m8Z[E7Z]),
                                direction: E7Z == "over" ?  + "1" : -1,
                                edgeHighlight: this.getCanvasColor(m8Z[E7Z]),
                                edgeParameters: {
                                    pattern: "solid",
                                    lineWidth: parseInt(this.canvasStyle(m8Z[E7Z]).width, "10" >> 0) + 0.1,
                                    opacity: 1
                                }
                            };
                            this.chart.baseLegendColors.push(O_$.color);
                            O_$.color = "transparent";
                            R.Studies.preparePeakValleyFill(this, N4a.dataSegment, O_$);
                        }
                        this.plotLine( + "0", 1, X0_, X0_, this.containerColor, Q1F, N4a.context, !0, {
                            pattern: "solid",
                            lineWidth: T8Q,
                            opacity: 1
                        });
                        this.plotLine(0, 1, X0_, X0_, this.getCanvasColor("stx_baseline"), "line", N4a.context, !![], {
                            pattern: "dotted",
                            lineWidth: L9r,
                            opacity: 0.5
                        });
                        if (this.chart.baseline.userLevel !== !({})) {
                            N1O.p86(2);
                            var T4p = N1O.U9a(6, 4);
                            N1O.B_x(7);
                            var A$6 = N1O.f21(19, 21);
                            this.controls.baselineHandle.style.top = X0_ - parseInt(getComputedStyle(this.controls.baselineHandle).height, T4p) / A$6 + "px";
                            N1O.B_x(88);
                            var h27 = N1O.U9a(15, 25, 11, 13, 25);
                            this.controls.baselineHandle.style.left = this.chart.right - parseInt(getComputedStyle(this.controls.baselineHandle).width, h27) + "px";
                            this.controls.baselineHandle.style.display = "block";
                        }
                        this.endClip();
                    }
                } else if (o2j == "scatterplot") {
                    this.startClip(J_L.name);
                    this.scatter(J_L);
                    this.endClip();
                } else if (o2j) {
                    N1O.p86(35);
                    console.log(N1O.U9a('". Defaulting to Line Chart.', 'Invalid chart layout.chartType: "', o2j));
                    this.layout.chartType = "line";
                    this.drawLineChart(J_L, "stx_line_chart");
                } else {
                    u3r = 657854612;
                    o5d = 2466069;
                    c43 = 2;
                    for (var d7P = 1; N1O.Y4l(d7P.toString(), d7P.toString().length, "74737" >> 32) !== u3r; d7P++) {
                        this.chart.baseLegendColors = 1;
                        c43 += 2;
                    }
                    if (N1O.n$d(c43.toString(), c43.toString().length, 44966) !== o5d) {
                        this.chart.baseLegendColors = null;
                    }
                }
                this.runAppend("displayChart", arguments);
            };
            S.prototype.calculateATR = function (v6I, S6s) {
                var s$B,
                a74,
                v14,
                t$K;
                if (!S6s) {
                    S6s = 20;
                }
                N1O.p86(17);
                N1O.A7M();
                s$B = N1O.U9a("0", 0);
                for (var M_1 = 1; M_1 < v6I.dataSet.length; M_1++) {
                    a74 = v6I.dataSet[M_1];
                    v14 = v6I.dataSet[M_1 - 1].Close;
                    t$K = Math.max(a74.High - a74.Low, Math.abs(a74.High - v14), Math.abs(a74.Low - v14));
                    s$B += t$K;
                    if (M_1 > S6s) {
                        s$B -= v6I.dataSet[M_1 - S6s].trueRange;
                    }
                    a74.trueRange = t$K;
                    N1O.p86(24);
                    a74.atr = N1O.U9a(S6s, s$B);
                }
            };
            S.prototype.calculateMedianPrice = function (W1M) {
                N1O.A7M();
                var L0$;
                for (var h$c = 0; h$c < W1M.dataSet.length; ++h$c) {
                    L0$ = W1M.dataSet[h$c];
                    N1O.p86(26);
                    var v6k = N1O.f21(3, 13, 13);
                    L0$["hl/2"] = (L0$.High + L0$.Low) / v6k;
                }
            };
            S.prototype.calculateTypicalPrice = function (e98) {
                var Y2V;
                for (var R08 = 0; R08 < e98.dataSet.length; ++R08) {
                    Y2V = e98.dataSet[R08];
                    N1O.p86(35);
                    var Y4J = N1O.f21(1, 0, 2);
                    Y2V["hlc/3"] = (Y2V.High + Y2V.Low + Y2V.Close) / Y4J;
                }
            };
            S.prototype.calculateWeightedClose = function (i1I) {
                var X4e;
                N1O.N7F();
                for (var O6Y = "0" ^ 0; O6Y < i1I.dataSet.length; ++O6Y) {
                    X4e = i1I.dataSet[O6Y];
                    N1O.p86(7);
                    var M6b = N1O.U9a(36, 38);
                    N1O.p86(89);
                    var X1$ = N1O.f21(24, 2, 10, 4, 24);
                    X4e["hlcc/4"] = (X4e.High + X4e.Low + M6b * X4e.Close) / X1$;
                }
            };
            S.prototype.calculateOHLC4 = function (y0Y) {
                N1O.A7M();
                var p3Z,
                r5_;
                for (var V_D = 0; V_D < y0Y.dataSet.length; ++V_D) {
                    r5_ = "o";
                    r5_ += "hl";
                    r5_ += "c/4";
                    p3Z = y0Y.dataSet[V_D];
                    N1O.B_x(90);
                    var Z23 = N1O.f21(1, 5, 1, 1);
                    p3Z[r5_] = (p3Z.Open + p3Z.High + p3Z.Low + p3Z.Close) / Z23;
                }
            };
            S.prototype.currentQuote = function () {
                var u2h;
                u2h = null;
                if (!this.chart.dataSet) {
                    return null;
                }
                for (var v5n = this.chart.dataSet.length -  + "1"; v5n >= 0; v5n--) {
                    if (this.chart.dataSet[v5n]) {
                        return this.chart.dataSet[v5n];
                    }
                }
                return null;
            };
            S.prototype.correctIfOffEdge = function (c9t) {
                var x3s,
                G5D,
                y9u,
                q50,
                H4F;
                x3s = "corre";
                x3s += "ctIfOffEdge";
                G5D = "corr";
                G5D += "ectIfOffE";
                G5D += "dge";
                if (this.runPrepend(G5D, arguments)) {
                    return;
                }
                for (var e7a in this.charts) {
                    y9u = this.charts[e7a];
                    N1O.p86(7);
                    var Q50 = N1O.U9a(10, 11);
                    q50 = this.minimumLeftBars + Q50;
                    if (y9u.allowScrollPast) {
                        H4F = y9u.maxTicks - q50;
                        if (y9u.maxTicks - H4F > y9u.dataSet.length) {
                            H4F = y9u.maxTicks - y9u.dataSet.length;
                        }
                        if (y9u.scroll - H4F > y9u.dataSet.length) {
                            y9u.scroll = y9u.dataSet.length + H4F;
                        }
                        if (y9u.scroll <= q50) {
                            y9u.scroll = q50;
                            N1O.p86(11);
                            this.micropixels = N1O.f21("0", 32);
                        }
                    } else {
                        if (y9u.scroll < q50) {
                            y9u.scroll = q50;
                        }
                        if (y9u.scroll > y9u.dataSet.length) {
                            y9u.scroll = y9u.dataSet.length;
                        }
                    };
                }
                this.runAppend(x3s, arguments);
            };
            S.prototype.createDataSegment = function (I0b) {
                var l61,
                D0T,
                t7E,
                T3e,
                h_A;
                if (this.runPrepend("createDataSegment", arguments)) {
                    return;
                }
                for (var e01 in this.charts) {
                    l61 = this.charts[e01];
                    if (I0b) {
                        l61 = I0b;
                    }
                    l61.baseline.actualLevel = l61.baseline.userLevel ? l61.baseline.userLevel : l61.baseline.defaultLevel;
                    l61.dataSegment = [];
                    N1O.B_x(2);
                    var P8Z = N1O.U9a(1, 0);
                    D0T = l61.dataSet.length - l61.scroll - P8Z;
                    for (var j0U = -1; j0U < l61.scroll && j0U < l61.maxTicks; j0U++) {
                        D0T++;
                        if (j0U == -1 && !l61.baseline.includeInDataSegment)
                            continue;
                        if (D0T < l61.dataSet.length && D0T >= 0) {
                            if (l61.dataSet[D0T].candleWidth) {
                                l61.dataSet[D0T].candleWidth = null;
                                l61.dataSet[D0T].leftOffset = null;
                            }
                            l61.dataSegment.push(l61.dataSet[D0T]);
                            if (l61.baseline.actualLevel === null && j0U >= 0) {
                                l61.baseline.actualLevel = l61.dataSet[D0T].iqPrevClose;
                            }
                        } else if (D0T < 0) {
                            l61.dataSegment.push(null);
                        }
                    }
                    if (this.layout.chartType == "volume_candle") {
                        t7E = 0;
                        for (var e$7 = 0; e$7 < l61.dataSegment.length; e$7++) {
                            if (l61.dataSegment[e$7]) {
                                t7E += l61.dataSegment[e$7].Volume;
                            }
                        }
                        T3e =  + "0";
                        for (var w0h = 0; w0h < l61.dataSegment.length; w0h++) {
                            if (l61.dataSegment[w0h]) {
                                if (l61.dataSegment[w0h].Volume) {
                                    h_A = l61.width;
                                    if (l61.scroll < l61.maxTicks) {
                                        h_A -= this.preferences.whitespace;
                                    }
                                    l61.dataSegment[w0h].candleWidth = h_A * l61.dataSegment[w0h].Volume / t7E;
                                    N1O.B_x(91);
                                    var v8x = N1O.U9a(19, 2, 20, 1, 4);
                                    l61.dataSegment[w0h].leftOffset = T3e + l61.dataSegment[w0h].candleWidth / v8x;
                                    T3e += l61.dataSegment[w0h].candleWidth;
                                } else {
                                    l61.dataSegment[w0h].candleWidth = this.layout.candleWidth;
                                    N1O.p86(7);
                                    var q$i = N1O.f21(14, 16);
                                    l61.dataSegment[w0h].leftOffset = T3e + this.layout.candleWidth / q$i;
                                    T3e += this.layout.candleWidth;
                                }
                            } else {
                                T3e += this.layout.candleWidth;
                            }
                        }
                    }
                    if (I0b)
                        break;
                }
                N1O.N7F();
                this.runAppend("createDataSegment", arguments);
            };
            S.prototype.leftTick = function () {
                var l7b,
                f6U,
                M7s;
                l7b = 300091214;
                f6U = 866133126;
                M7s = 2;
                for (var w7V = 1; N1O.Y4l(w7V.toString(), w7V.toString().length, 27683) !== l7b; w7V++) {
                    return this.chart.dataSet.length - this.chart.scroll;
                }
                if (N1O.Y4l(M7s.toString(), M7s.toString().length, 30847) !== f6U) {
                    return this.chart.dataSet.length % this.chart.scroll;
                }
            };
            S.prototype.getStartDateOffset = function () {
                for (var B7o = 0; B7o < this.chart.dataSegment.length; B7o++) {
                    if (this.chart.dataSegment[B7o]) {
                        return B7o;
                    }
                }
                return 0;
            };
            S.prototype.setStartDate = function (m0o) {
                var T2L;
                N1O.N7F();
                for (var g0H = 0; g0H < this.chart.dataSet.length; g0H++) {
                    T2L = this.chart.dataSet[g0H];
                    if (T2L.DT.getTime() == m0o.getTime()) {
                        this.chart.scroll = this.chart.dataSet.length - g0H;
                        this.draw();
                        return;
                    }
                }
            };
            S.prototype.updateListeners = function (h9A) {
                var e3I;
                N1O.N7F();
                for (var X41 in this.plugins) {
                    e3I = this.plugins[X41];
                    if (e3I.display && e3I.listener) {
                        e3I.listener(this, h9A);
                    }
                }
            };
            S.prototype.clearPixelCache = function () {
                var A7E,
                V2w;
                for (var u71 in this.panels) {
                    A7E = this.panels[u71];
                    A7E.cacheHigh = null;
                    A7E.cacheLow = null;
                    A7E.cacheLeft = 1000000;
                    A7E.cacheRight =  -  + "1";
                }
                for (var j4Z in this.charts) {
                    V2w = this.charts[j4Z];
                    if (!V2w.dataSet)
                        continue;
                    for (var x12 = 0; x12 < V2w.dataSet.length; x12++) {
                        V2w.dataSet[x12].cache = {};
                    }
                }
            };
            S.prototype.createYAxisLabel = function (L$i, R0U, l1B, F2o, x3v, a8L, b1$) {
                var H2Q,
                a9A,
                y58,
                t_D,
                r$K,
                X8e,
                R2r,
                f0n,
                R7k,
                X5Z,
                i5h,
                f9_,
                Z6I,
                m$M,
                A7x;
                H2Q = "u";
                H2Q += "ndefined";
                if (L$i.yAxis.drawPriceLabels === !1) {
                    return;
                }
                N1O.N7F();
                a9A = b1$ ? b1$ : L$i.yAxis;
                y58 = a8L ? a8L : this.chart.context;
                t_D = 3;
                N1O.B_x(42);
                var V4v = N1O.f21(4, 14, 16);
                r$K = this.getCanvasFontSize("stx_yaxis") + t_D * V4v;
                this.canvasFont("stx_yaxis", y58);
                X8e = a9A.displayBorder;
                if (this.axisBorders === !"1") {
                    X8e = ![];
                }
                if (this.axisBorders === !!"1") {
                    X8e = !!({});
                }
                R2r = X8e ? 3 : "0" >> 32;
                try {
                    N1O.B_x(18);
                    var p__ = N1O.f21(214, 18, 12, 1);
                    f0n = y58.measureText(R0U).width + R2r + t_D * p__;
                } catch (q75) {
                    f0n = a9A.width;
                }
                N1O.B_x(86);
                var o7x = N1O.U9a(3, 5, 18);
                R7k = a9A.left - t_D + o7x;
                N1O.B_x(35);
                X5Z = N1O.U9a(R2r, R7k, t_D);
                i5h = 3;
                f9_ = a9A.position === null ? L$i.chart.yAxis.position : a9A.position;
                if (f9_ === "left") {
                    N1O.B_x(7);
                    var n9e = N1O.U9a(4, 7);
                    R7k = a9A.left + a9A.width + t_D - n9e;
                    N1O.B_x(92);
                    f0n = N1O.f21(1, f0n);
                    X5Z = R7k;
                    i5h = -3;
                    y58.textAlign = "right";
                }
                if (l1B + r$K /  + "2" > a9A.bottom) {
                    N1O.p86(93);
                    var G3I = N1O.f21(51, 8, 16, 48, 59);
                    l1B = a9A.bottom - r$K / ("2" >> G3I);
                }
                if (l1B - r$K / 2 < a9A.top) {
                    N1O.B_x(94);
                    var z$c = N1O.U9a(1, 0, 5, 15, 18);
                    l1B = a9A.top + r$K / z$c;
                }
                y58.fillStyle = F2o;
                if (typeof R[this.yaxisLabelStyle] == H2Q) {
                    this.yaxisLabelStyle = "roundRectArrow"; ;
                }
                Z6I = this.yaxisLabelStyle;
                if (a9A.yaxisLabelStyle) {
                    Z6I = a9A.yaxisLabelStyle;
                }
                N1O.B_x(95);
                R[Z6I](y58, R7k, N1O.f21(2, l1B, r$K), f0n, r$K, i5h, !![], !"1");
                y58.textBaseline = "middle";
                y58.fillStyle = x3v ? x3v : R.chooseForegroundColor(F2o);
                if (y58.fillStyle == F2o) {
                    m$M = "#";
                    m$M += "000";
                    m$M += "0";
                    m$M += "00";
                    A7x = "#F";
                    A7x += "FFFFF";
                    if (F2o.toUpperCase() == A7x) {
                        y58.fillStyle = m$M;
                    } else {
                        y58.fillStyle = "#FFFFFF";
                    }
                }
                N1O.p86(96);
                y58.fillText(R0U, X5Z, N1O.U9a(0, "1", l1B));
                y58.textAlign = "left";
            };
            S.prototype.createXAxisLabel = function (o8D, p3W, K9h, B5m, J2X, y2d) {
                var A_F,
                S57,
                S_S,
                P5f,
                a9I,
                G1S,
                F0a,
                P5x,
                n6T;
                A_F = this.chart.context;
                S57 = 2;
                S_S = "stx-float-date";
                N1O.A7M();
                N1O.p86(36);
                var w3y = N1O.U9a(10, 19, 11);
                P5f = this.getCanvasFontSize(S_S) + S57 * w3y;
                this.canvasFont(S_S, A_F);
                try {
                    N1O.p86(26);
                    var E9s = N1O.f21(3, 1, 1);
                    a9I = A_F.measureText(p3W).width + S57 * E9s;
                } catch (W$D) {
                    a9I = 0;
                }
                G1S = o8D.top + o8D.height - P5f;
                if (K9h + a9I / 2 < o8D.left || K9h - a9I / 2 > o8D.right) {
                    return;
                }
                if (!y2d) {
                    if (K9h + a9I / 2 > o8D.right) {
                        N1O.p86(97);
                        var R2F = N1O.U9a(7, 17, 9, 21, 1);
                        K9h = o8D.right - a9I / R2F;
                    }
                    if (K9h - a9I / 2 < o8D.left) {
                        N1O.p86(7);
                        var c_K = N1O.U9a(14, 16);
                        K9h = o8D.left + a9I / c_K;
                    }
                }
                A_F.fillStyle = B5m;
                N1O.B_x(95);
                R.roundRect(A_F, N1O.U9a(2, K9h, a9I), G1S, a9I, P5f, 3, !!({}), !({}));
                if (y2d) {
                    F0a = o8D.bottom - o8D.yAxis.bottom - P5f;
                    A_F.beginPath();
                    N1O.p86(7);
                    A_F.moveTo(N1O.U9a(F0a, K9h), G1S);
                    N1O.B_x(7);
                    A_F.lineTo(K9h, N1O.f21(F0a, G1S));
                    N1O.B_x(2);
                    A_F.lineTo(N1O.f21(F0a, K9h), G1S);
                    A_F.closePath();
                    A_F.fill();
                }
                A_F.textBaseline = "top";
                A_F.fillStyle = J2X ? J2X : R.chooseForegroundColor(B5m);
                if (A_F.fillStyle == B5m) {
                    P5x = "#000";
                    P5x += "000";
                    n6T = "#";
                    n6T += "FF";
                    n6T += "F";
                    n6T += "FFF";
                    if (B5m.toUpperCase() == n6T) {
                        A_F.fillStyle = P5x;
                    } else {
                        A_F.fillStyle = "#FFFFFF";
                    }
                }
                N1O.p86(98);
                A_F.fillText(p3W, N1O.U9a(S57, a9I, "2", 2, K9h), N1O.f21(S57, G1S, N1O.p86(2)));
            };
            S.prototype.drawCurrentHR = function () {
                var U3y,
                Z0l,
                J47,
                r0b,
                o4Z,
                f__,
                A7v,
                q5H,
                G76,
                Q7_,
                O7m,
                E0r,
                c8i,
                e8k,
                c81,
                G9d;
                U3y = "drawC";
                U3y += "urrentH";
                U3y += "R";
                if (this.runPrepend("drawCurrentHR", arguments)) {
                    return;
                }
                for (var A8D in this.charts) {
                    r0b = this.charts[A8D];
                    o4Z = r0b.panel;
                    f__ = o4Z.yAxis;
                    if (f__.drawCurrentPriceLabel === !({}))
                        continue;
                    if (r0b.customChart && r0b.customChart.chartType == "none")
                        continue;
                    A7v = f__.whichSet;
                    if (!A7v) {
                        A7v = "dataSet";
                    }
                    q5H = r0b[A7v].length;
                    if (A7v == "dataSegment") {
                        while (q5H > (r0b.width - this.micropixels + this.layout.candleWidth / 2 +  + "1") / this.layout.candleWidth) {
                            q5H--;
                        }
                    }
                    if (q5H) {
                        N1O.B_x(7);
                        G76 = r0b[A7v][N1O.U9a(1, q5H)];
                        Q7_ = G76.Close;
                        O7m = G76.Close;
                        if (r0b[A7v].length >= 2) {
                            N1O.p86(34);
                            E0r = r0b[A7v][N1O.U9a(q5H, "2")];
                            Q7_ = E0r.Close;
                        }
                        if (O7m < Q7_) {
                            Z0l = this.canvasStyle("stx_current_hr_down").backgroundColor;
                            J47 = this.canvasStyle("stx_current_hr_down").color;
                        } else {
                            c8i = "st";
                            c8i += "x_current_hr_up";
                            Z0l = this.canvasStyle("stx_current_hr_up").backgroundColor;
                            J47 = this.canvasStyle(c8i).color;
                        }
                        if (G76.transform) {
                            G76 = G76.transform;
                        }
                        c81 = Math.max(o4Z.yAxis.printDecimalPlaces, o4Z.chart.decimalPlaces);
                        if (f__.maxDecimalPlaces || f__.maxDecimalPlaces === 0) {
                            c81 = Math.min(c81, f__.maxDecimalPlaces);
                        }
                        if (f__.priceFormatter) {
                            e8k = f__.priceFormatter(this, o4Z, G76.Close, c81);
                        } else {
                            e8k = this.formatYAxisPrice(G76.Close, o4Z, c81);
                        }
                        G9d = this.pixelFromPrice(G76.Close, o4Z);
                        this.createYAxisLabel(o4Z, e8k, G9d, Z0l, J47);
                        if (this.preferences.currentPriceLine === !![] && this.isHome()) {
                            o4Z.chart.context.globalCompositeOperation = "destination-over";
                            this.plotLine(o4Z.left, o4Z.right, G9d, G9d, Z0l, "line", o4Z.chart.context, o4Z, {
                                pattern: "dashed",
                                lineWidth: 1,
                                opacity: 0.8
                            });
                            o4Z.chart.context.globalCompositeOperation = "source-over";
                        }
                    }
                }
                this.runAppend(U3y, arguments);
            };
            S.prototype.getDefaultColor = function () {
                var X_v,
                F4d,
                n$m,
                l1H,
                t82,
                f2r,
                s65,
                o7a;
                X_v = "#00000";
                X_v += "0";
                this.defaultColor = X_v;
                F4d = null;
                n$m = this.chart.container;
                while (!F4d || R.isTransparent(F4d)) {
                    l1H = getComputedStyle(n$m);
                    if (!l1H) {
                        return;
                    }
                    F4d = l1H.backgroundColor;
                    if (R.isTransparent(F4d)) {
                        F4d = "transparent";
                    }
                    n$m = n$m.parentNode;
                    if (!n$m || !n$m.tagName)
                        break;
                }
                if (F4d) {
                    if (F4d == "transparent") {
                        F4d = "#FFFFFF";
                    }
                    this.containerColor = F4d;
                    if (!R.isTransparent(F4d)) {
                        t82 = "#";
                        t82 += "FFFFFF";
                        f2r = R.hsv(F4d);
                        N1O.p86(11);
                        s65 = f2r[N1O.f21("2", 0)];
                        if (s65 > 0.65) {
                            this.defaultColor = "#000000";
                        } else {
                            this.defaultColor = t82;
                        }
                    } else {
                        o7a = "#00";
                        o7a += "00";
                        o7a += "00";
                        this.defaultColor = o7a;
                    }
                } else {
                    this.containerColor = "#FFFFFF";
                }
            };
            S.prototype.startAsyncAction = function () {
                var E2L,
                A89,
                x0f;
                N1O.B_x(16);
                E2L = -N1O.U9a("607127560", 32);
                A89 = 239264188;
                x0f = 2;
                for (var i$b = 1; N1O.Y4l(i$b.toString(), i$b.toString().length,  + "1817") !== E2L; i$b++) {
                    if (-this.pendingAsyncs) {
                        this.pendingAsyncs = [];
                    }
                    x0f += 2;
                }
                if (N1O.n$d(x0f.toString(), x0f.toString().length, 74171) !== A89) {
                    if (!this.pendingAsyncs) {
                        this.pendingAsyncs = [];
                    }
                }
                this.pendingAsyncs.push(!0);
            };
            S.prototype.registerChartDrawnCallback = function (n7l) {
                if (!this.asyncCallbacks) {
                    this.asyncCallbacks = [];
                }
                this.asyncCallbacks.push(n7l);
                return {
                    fc: n7l
                };
            };
            S.prototype.unregisterChartDrawnCallback = function (A3V) {
                for (var O9W = 0; O9W < this.asyncCallbacks.length; O9W++) {
                    if (this.asyncCallbacks[O9W] == A3V.fc) {
                        this.asyncCallbacks.splice(O9W, 1);
                        return;
                    }
                }
            };
            S.prototype.makeAsyncCallbacks = function () {
                if (!this.asyncCallbacks) {
                    return;
                }
                if (!this.pendingAsyncs || !this.pendingAsyncs.length) {
                    for (var F0Q = 0; F0Q < this.asyncCallbacks.length; F0Q++) {
                        this.asyncCallbacks[F0Q]();
                    }
                }
            };
            S.prototype.completeAsyncAction = function () {
                this.pendingAsyncs.pop();
                N1O.A7M();
                this.makeAsyncCallbacks();
            };
            S.prototype.draw = function () {
                var t9_,
                f6_,
                y5t,
                E61,
                K$$,
                d_Z;
                t9_ = "dr";
                t9_ += "aw";
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
                N1O.p86(2);
                var i4F = N1O.U9a(1, 1);
                this.offset = this.layout.candleWidth * this.candleWidthPercent / i4F;
                R.clearCanvas(this.chart.canvas, this);
                if (this.runPrepend("draw", arguments)) {
                    return;
                }
                if (!this.xaxisHeight) {
                    N1O.B_x(8);
                    var B7_ = N1O.f21(44, 43, 3);
                    this.xaxisHeight = this.getCanvasFontSize("stx_xaxis") + B7_;
                    if (this.chart.xAxis.displayBorder || this.axisBorders) {
                        this.xaxisHeight += 3;
                    }
                }
                this.getDefaultColor();
                this.vectorsShowing = !({});
                this.drawPanels();
                this.yAxisLabels = [];
                for (E61 in this.charts) {
                    y5t = this.charts[E61];
                    this.correctIfOffEdge();
                    this.createDataSegment();
                    d_Z = this.createXAxis(y5t);
                    this.initializeDisplay(y5t);
                    this.rendererAction(y5t, "calculate");
                    this.renderYAxis(y5t);
                    this.drawXAxis(y5t, d_Z);
                    y5t.tmpWidth = Math.floor(this.layout.candleWidth * this.candleWidthPercent);
                    if (y5t.tmpWidth % 2 === 0) {
                        y5t.tmpWidth += 1;
                        if (y5t.tmpWidth > this.layout.candleWidth) {
                            y5t.tmpWidth -= 2;
                        }
                    }
                    if (y5t.tmpWidth < 0.5) {
                        y5t.tmpWidth = 0.5;
                    }
                    for (f6_ in this.plugins) {
                        K$$ = this.plugins[f6_];
                        if (K$$.display) {
                            if (K$$.drawUnder) {
                                K$$.drawUnder(this, y5t);
                            }
                        }
                    }
                    this.rendererAction(y5t, "underlay");
                    R.Studies.displayStudies(this, y5t, !!1);
                    this.displayChart(y5t);
                    R.Studies.displayStudies(this, y5t, !({}));
                    this.rendererAction(y5t, "overlay");
                }
                for (E61 in this.charts) {
                    y5t = this.charts[E61];
                    for (f6_ in this.plugins) {
                        K$$ = this.plugins[f6_];
                        if (K$$.display) {
                            if (K$$.drawOver) {
                                K$$.drawOver(this, y5t);
                            }
                        }
                    }
                }
                for (var E9f in this.panels) {
                    if (!this.panels[E9f].hidden) {
                        this.plotYAxisText(this.panels[E9f]);
                    }
                }
                for (var r8B = 0; r8B < this.yAxisLabels.length; r8B++) {
                    this.createYAxisLabel.apply(this, this.yAxisLabels[r8B].args);
                }
                this.createCrosshairs();
                this.drawVectors();
                this.drawCurrentHR();
                this.displayInitialized = !0;
                if (this.controls.home) {
                    this.controls.home.style.display = this.isHome() ? "none" : "block";
                }
                this.positionMarkers();
                for (E61 in this.charts) {
                    y5t = this.charts[E61];
                    if (this.quoteDriver) {
                        this.quoteDriver.checkLoadMore(y5t);
                    }
                }
                this.runAppend(t9_, arguments);
                this.makeAsyncCallbacks();
            };
            S.prototype.adjustBackingStore = function (w21, U59) {
                var d1t,
                v0v,
                z8C,
                T6r,
                Z8R;
                this.devicePixelRatio = window.devicePixelRatio || 1;
                if (this.devicePixelRatio < 1.0) {
                    this.devicePixelRatio = 1.0;
                }
                d1t = U59.webkitBackingStorePixelRatio || U59.mozBackingStorePixelRatio || U59.msBackingStorePixelRatio || U59.oBackingStorePixelRatio || U59.backingStorePixelRatio || 1;
                v0v = this.devicePixelRatio / d1t;
                if (!R.isAndroid || R.is_chrome) {
                    z8C = "p";
                    z8C += "x";
                    T6r = w21.width;
                    Z8R = w21.height;
                    N1O.B_x(0);
                    w21.width = N1O.f21(v0v, T6r);
                    N1O.p86(0);
                    w21.height = N1O.f21(v0v, Z8R);
                    N1O.p86(2);
                    w21.style.width = N1O.f21('px', T6r);
                    N1O.B_x(2);
                    w21.style.height = N1O.f21(z8C, Z8R);
                    U59.scale(v0v, v0v);
                    this.adjustedDisplayPixelRatio = v0v;
                }
            };
            S.prototype.resizeCanvas = function () {
                var v9k,
                s3H,
                R2Y,
                z7o,
                I7I,
                G$v,
                x3k,
                x25;
                if (!this.chart.panel) {
                    this.chart.panel = this.panels.chart;
                }
                v9k = this.chart.canvas;
                s3H = this.chart.context;
                if (v9k && s3H) {
                    this.chart.tempCanvas.height = v9k.height = this.chart.container.clientHeight;
                    this.chart.tempCanvas.width = v9k.width = this.chart.container.clientWidth;
                    this.adjustBackingStore(v9k, s3H);
                    this.adjustBackingStore(this.chart.tempCanvas, this.chart.tempCanvas.context);
                    this.floatCanvas.height = this.chart.container.clientHeight;
                    this.floatCanvas.width = this.chart.container.clientWidth;
                    this.adjustBackingStore(this.floatCanvas, this.floatCanvas.context);
                }
                R2Y = this.container.getBoundingClientRect();
                this.top = R2Y.top;
                this.left = R2Y.left;
                this.canvasWidth = this.chart.canvasWidth = this.chart.container.clientWidth;
                this.right = this.left + this.canvasWidth;
                this.height = this.chart.container.clientHeight;
                this.width = this.right - this.left;
                if (this.width === 0 && !this.container.dimensionlessCanvas) {
                    console.log("warning: zero width chart. Check CSS for chart container.");
                }
                this.bottom = this.top + this.height;
                this.calculateYAxisPositions();
                this.chart.canvasRight = this.right;
                this.chart.canvasHeight = this.height;
                z7o = this.layout.candleWidth;
                if (typeof z7o == "undefined") {
                    z7o = 8;
                }
                N1O.A7M();
                for (var o5T in this.charts) {
                    I7I = this.charts[o5T];
                    if (this.layout.span) {
                        this.setCandleWidth(this.getSpanCandleWidth(this.layout.span), I7I);
                    } else {
                        this.setCandleWidth(z7o, I7I);
                        if (I7I.scroll < I7I.width / z7o) {
                            I7I.scroll = Math.floor(I7I.width / z7o);
                            G$v = Math.round(this.preferences.whitespace / this.layout.candleWidth);
                            I7I.scroll -= G$v;
                        }
                    }
                    x3k = 10;
                    try {
                        N1O.p86(2);
                        var r_F = N1O.f21(2, 0);
                        x25 = s3H.measureText("10:00").width * r_F;
                    } catch (B4y) {
                        N1O.B_x(1);
                        x25 = N1O.U9a(32, "100");
                    }
                    while (x3k > 1) {
                        if (this.chart.width / x25 > x3k)
                            break;
                        x3k /= 1.5;
                    }
                    I7I.xAxis.autoComputedTickSizePixels = Math.round(this.chart.width / x3k);
                    if (I7I.xAxis.autoComputedTickSizePixels < 1) {
                        N1O.p86(7);
                        I7I.xAxis.autoComputedTickSizePixels = N1O.f21(0, "1");
                    }
                }
            };
            S.prototype.setCandleWidth = function (P76, z0p) {
                if (!z0p) {
                    z0p = this.chart;
                }
                if (P76 < this.minimumCandleWidth) {
                    P76 = this.minimumCandleWidth;
                }
                this.layout.candleWidth = P76;
                N1O.B_x(8);
                var S34 = N1O.U9a(0, 13, 14);
                N1O.N7F();
                z0p.maxTicks = Math.round(this.chart.width / P76) + S34;
            };
            S.prototype.resizeChart = function (X$O) {
                var v6N;
                if (this.runPrepend("resizeChart", arguments)) {
                    return;
                }
                if (X$O !== ![]) {
                    X$O = !!1;
                }
                if (X$O) {
                    this.preAdjustScroll();
                }
                v6N = this.chart.canvasHeight;
                this.resizeCanvas();
                if (X$O) {
                    this.postAdjustScroll();
                }
                if (this.displayInitialized) {
                    this.adjustPanelPositions();
                    this.draw(); ;
                } else if (this.chart.canvasHeight !== 0 && v6N === 0) {
                    this.adjustPanelPositions();
                    this.draw();
                }
                this.positionCrosshairsAtPointer();
                this.doDisplayCrosshairs();
                this.runAppend("resizeChart", arguments);
            };
            S.prototype.newChart = function (F5q, N_a, x5y, u3_, s7q) {
                var l6K,
                E6_,
                v5a,
                b05,
                V1h,
                R_w,
                A_R,
                z9m,
                M2Y,
                a3m,
                I3h,
                u8k;
                l6K = "ob";
                l6K += "j";
                l6K += "ect";
                if (!x5y) {
                    x5y = this.chart;
                }
                if (!s7q) {
                    s7q = {};
                }
                if (s7q.periodicity) {
                    if (s7q.periodicity.interval) {
                        this.layout.interval = s7q.periodicity.interval;
                    }
                    if (s7q.periodicity.period) {
                        this.layout.periodicity = s7q.periodicity.period;
                    }
                    if (s7q.periodicity.periodicity) {
                        this.layout.periodicity = s7q.periodicity.periodicity;
                    }
                    this.layout.timeUnit = s7q.periodicity.timeUnit;
                }
                E6_ = x5y.symbol;
                v5a = R.clone(x5y.symbolObject);
                b05 = x5y.market;
                if (!F5q) {
                    x5y.symbol = null;
                    x5y.symbolObject = {
                        symbol: null
                    };
                } else if (typeof F5q == l6K) {
                    x5y.symbol = F5q.symbol;
                    x5y.symbolObject = F5q;
                } else {
                    x5y.symbol = F5q;
                    V1h = -648365849;
                    R_w = 1744479325;
                    A_R = 2;
                    for (var O_3 = 1; N1O.Y4l(O_3.toString(), O_3.toString().length,  + "62666") !== V1h; O_3++) {
                        x5y.symbolObject.symbol = F5q;
                        A_R += 2;
                    }
                    if (N1O.n$d(A_R.toString(), A_R.toString().length, 27689) !== R_w) {
                        x5y.symbolObject.symbol = F5q;
                    }
                }
                if (this.marketFactory) {
                    z9m = this.marketFactory(x5y.symbolObject);
                    this.setMarket(z9m, x5y);
                }
                M2Y = this;
                if (!N_a && this.quoteDriver) {
                    a3m = function (n5u) {
                        var C5u;
                        C5u = "orph";
                        N1O.A7M();
                        C5u += "aned";
                        if (n5u && n5u != C5u) {
                            x5y.symbol = E6_;
                            x5y.symbolObject = v5a;
                            x5y.market = b05;
                        }
                        if (!M2Y.currentlyImporting) {
                            M2Y.dispatch("symbolChange", {
                                stx: M2Y,
                                symbol: M2Y.chart.symbol,
                                symbolObject: M2Y.chart.symbolObject
                            });
                        }
                        if (u3_) {
                            u3_(n5u);
                        }
                    };
                    I3h = s7q.span;
                    if (!I3h && this.layout) {
                        I3h = this.layout.setSpan;
                    }
                    if (I3h && I3h.base) {
                        u8k = I3h.multiplier || 1;
                        this.chart.masterData = null;
                        this.displayInitialized = !({});
                        this.setSpan({
                            maintainPeriodicity: s7q.periodicity ? !!1 : !1,
                            multiplier: u8k,
                            base: I3h.base,
                            symbol: x5y.symbol
                        }, a3m);
                    } else {
                        this.quoteDriver.newChart({
                            symbol: x5y.symbol,
                            symbolObject: x5y.symbolObject,
                            chart: x5y,
                            initializeChart: !!1
                        }, function (e9L) {
                            if (!e9L) {
                                M2Y.adjustPanelPositions();
                                M2Y.quoteDriver.updateSubscriptions();
                                if (s7q.stretchToFillScreen) {
                                    M2Y.fillScreen();
                                }
                            }
                            a3m.apply(M2Y, arguments);
                        });
                    }
                } else {
                    if (!N_a) {
                        console.log("Warning: No masterData specified and no QuoteFeed configured");
                    }
                    if (!x5y.symbol) {
                        x5y.symbol = "";
                    }
                    this.setMasterData(N_a, x5y);
                    this.createDataSet();
                    this.initializeChart();
                    if (s7q.span && s7q.span.multiplier && s7q.span.base) {
                        this.setSpan({
                            maintainPeriodicity: !![],
                            multiplier: s7q.span.multiplier,
                            base: s7q.span.base
                        });
                    } else if (s7q.stretchToFillScreen) {
                        this.fillScreen();
                    } else {
                        this.draw();
                    }
                    this.adjustPanelPositions();
                    if (u3_) {
                        u3_();
                    }
                }
            };
            S.prototype.fillScreen = function () {
                var c0w,
                J1H,
                F5M,
                k2Y;
                c0w = this.layout.candleWidth;
                N1O.N7F();
                J1H = this.chart.width - this.preferences.whitespace;
                F5M = this.chart.dataSet.length;
                if (F5M * c0w >= J1H) {
                    this.draw();
                    return;
                }
                N1O.B_x(24);
                k2Y = N1O.U9a(F5M, J1H);
                this.setCandleWidth(k2Y, this.chart);
                this.home({
                    maintainWhitespace: !![]
                });
            };
            S.prototype.setMasterData = function (C7z, r7t) {
                var a4t,
                L0C,
                O4R,
                g4E,
                h3b,
                N4J,
                W0T;
                a4t = "cha";
                a4t += "r";
                N1O.A7M();
                a4t += "t";
                if (!r7t) {
                    r7t = this.chart;
                }
                if (this.marketFactory) {
                    L0C = this.marketFactory(r7t.symbolObject);
                    this.setMarket(L0C, r7t);
                }
                r7t.masterData = C7z;
                if (r7t.name == a4t) {
                    this.masterData = C7z;
                }
                for (O4R = 0; C7z && O4R < C7z.length; O4R++) {
                    g4E = "n";
                    g4E += "um";
                    g4E += "ber";
                    if (this.transformMasterDataQuote) {
                        C7z[O4R] = this.transformMasterDataQuote(C7z[O4R]);
                    }
                    h3b = C7z[O4R];
                    if (h3b.DT) {
                        h3b.DT = new Date(h3b.DT);
                        h3b.Date = R.yyyymmddhhmmssmmm(h3b.DT);
                    } else if (h3b.Date) {
                        h3b.DT = R.strToDateTime(h3b.Date);
                    } else {
                        console.log('setMasterData : Missing DT and Date on masterData object');
                    }
                    if (h3b.Volume && typeof h3b.Volume !== "number") {
                        h3b.Volume = parseInt(h3b.Volume, 10);
                    }
                    if (typeof h3b.Close == g4E) { ;
                    } else {
                        console.log('setMasterData : Close is missing or not a number. Use parseFloat() if your data server provides strings. MasterData Index= ' + O4R + ' Value = ' + h3b.Close);
                    }
                    if (h3b.High === null) {
                        delete h3b.High;
                    }
                    if (h3b.Low === null) {
                        delete h3b.Low;
                    }
                    if (h3b.Open === null) {
                        delete h3b.Open;
                    }
                }
                r7t.decimalPlaces = this.callbacks.calculateTradingDecimalPlaces({
                    stx: this,
                    chart: r7t,
                    symbol: r7t.symbolObject.symbol,
                    symbolObject: r7t.symbolObject
                });
                if (!S.isDailyInterval(this.layout.interval)) {
                    this.setDisplayDates(C7z);
                }
                this.chart.roundit = Math.pow( + "10", r7t.decimalPlaces);
                for (O4R in this.plugins) {
                    N4J = this.plugins[O4R];
                    if (N4J.display) {
                        if (N4J.setMasterData) {
                            N4J.setMasterData(this, r7t);
                        }
                    }
                }
                for (var v4_ in this.chart.series) {
                    W0T = this.chart.series[v4_];
                    if (W0T.addSeriesData) {
                        W0T.addSeriesData(this);
                    }
                }
            };
            S.prototype.getSymbols = function () {
                var r1h,
                K59,
                j6a,
                o34,
                Z$J,
                p1O;
                r1h = [];
                for (var k3O in this.charts) {
                    j6a = this.charts[k3O];
                    r1h.push({
                        symbol: j6a.symbol,
                        symbolObject: j6a.symbolObject,
                        periodicity: this.layout.periodicity,
                        interval: this.layout.interval,
                        timeUnit: this.layout.timeUnit,
                        setSpan: this.layout.setSpan
                    });
                    for (var U4E in j6a.series) {
                        o34 = j6a.series[U4E];
                        if (!o34.parameters.data || !o34.parameters.data.useDefaultQuoteFeed)
                            continue;
                        K59 = {
                            symbol: U4E,
                            symbolObject: o34.symbolObject,
                            periodicity: this.layout.periodicity,
                            interval: this.layout.interval,
                            timeUnit: this.layout.timeUnit,
                            setSpan: this.layout.setSpan
                        };
                        if (arguments[0] === "include-parameters") {
                            K59.parameters = o34.parameters;
                        }
                        if (!K59.symbolObject) {
                            K59.symbolObject = o34.parameters.symbolObject || ({
                                symbol: U4E
                            });
                        }
                        r1h.push(K59);
                    }
                }
                for (var y87 in this.panels) {
                    if (this.panels[y87].studyQuotes) {
                        for (var t5X in this.panels[y87].studyQuotes) {
                            K59 = {
                                symbol: t5X,
                                symbolObject: {
                                    symbol: t5X
                                },
                                periodicity: this.layout.periodicity,
                                interval: this.layout.interval,
                                timeUnit: this.layout.timeUnit,
                                setSpan: this.layout.setSpan
                            };
                            r1h.push(K59);
                        }
                    }
                }
                for (var r3E = r1h.length - 1; r3E >= 0; r3E--) {
                    Z$J = r1h[r3E].symbol;
                    if (this.isEquationChart(Z$J)) {
                        p1O = R.formatEquation(Z$J);
                        if (p1O) {
                            for (var F32 = 0; F32 < p1O.symbols.length; F32++) {
                                K59 = {
                                    symbol: p1O.symbols[F32],
                                    symbolObject: r1h[r3E].symbolObject,
                                    periodicity: r1h[r3E].periodicity,
                                    interval: r1h[r3E].interval,
                                    timeUnit: r1h[r3E].timeUnit,
                                    setSpan: r1h[r3E].setSpan
                                };
                                r1h.push(K59);
                            }
                            r1h.splice(r3E, 1);
                        }
                    }
                }
                return r1h;
            };
            S.prototype.setDisplayDate = function (u_9) {
                var J3a,
                v1E,
                e$j;
                J3a = u_9.DT;
                N1O.p86(2);
                var b2v = N1O.f21(10, 990);
                N1O.N7F();
                v1E = J3a.getSeconds() * b2v + J3a.getMilliseconds();
                if (this.dataZone) {
                    e$j = new G.Date(J3a.getFullYear(), J3a.getMonth(), J3a.getDate(), J3a.getHours(), J3a.getMinutes(), this.dataZone);
                    J3a = new Date(e$j.getTime() + v1E);
                }
                if (this.displayZone) {
                    e$j = new G.Date(J3a.getTime(), this.displayZone);
                    J3a = new Date(e$j.getFullYear(), e$j.getMonth(), e$j.getDate(), e$j.getHours(), e$j.getMinutes());
                    J3a = new Date(J3a.getTime() + v1E);
                }
                u_9.displayDate = J3a;
            };
            S.prototype.setDisplayDates = function (S4B) {
                var R36;
                if (!S4B) {
                    return;
                }
                N1O.N7F();
                for (var e2Q = 0; e2Q < S4B.length; e2Q++) {
                    R36 = S4B[e2Q];
                    if (R36.DT) {
                        this.setDisplayDate(R36);
                    }
                }
            };
            S.prototype.streamTrade = function (J2C, D9S, A7A, H4s) {
                var T37,
                X8p,
                K5B,
                a2V,
                X9I,
                X7i,
                R5X,
                k7E,
                i9q,
                s$U,
                W7M,
                T5R,
                o_5,
                X4H,
                l4a,
                S0l,
                e6T,
                m7R,
                R_l;
                T37 = "o";
                T37 += "bject";
                X8p = this.chart;
                if (!H4s) {
                    H4s = {};
                }
                if (H4s.chart) {
                    X8p = H4s.chart;
                }
                K5B = null;
                a2V = null;
                X9I = null;
                X7i = 0;
                if (typeof J2C == T37) {
                    K5B = J2C.last;
                    a2V = J2C.bid;
                    X9I = J2C.ask;
                    X7i = J2C.volume;
                    if (typeof D9S != "undefined") {
                        D9S = new Date(D9S);
                    }
                } else {
                    R5X = "un";
                    R5X += "d";
                    R5X += "efine";
                    R5X += "d";
                    K5B = arguments[0];
                    N1O.p86(11);
                    X7i = arguments[N1O.U9a("1", 32)];
                    if (typeof D9S != R5X) {
                        D9S = new Date(arguments[2]);
                    }
                    A7A = arguments[3];
                }
                k7E = X8p.masterData;
                if (!D9S || D9S == 'Invalid Date') {
                    D9S = this.convertToDataZone(new Date());
                }
                if (!k7E || !k7E.length || this.layout.interval == "tick") {
                    i9q = {
                        Date: R.yyyymmddhhmmssmmm(D9S),
                        DT: D9S,
                        Open: K5B,
                        Close: K5B,
                        High: K5B,
                        Low: K5B,
                        Volume: X7i,
                        Bid: a2V,
                        Ask: X9I
                    };
                    this.appendMasterData([i9q], X8p, H4s);
                } else {
                    i9q = R.clone(k7E[k7E.length - 1]);
                    s$U = new R.Market({});
                    W7M = {
                        'begin': i9q.DT,
                        'interval': this.layout.interval,
                        'periodicity': this.layout.periodicity,
                        'timeUnit': this.layout.timeUnit,
                        'inZone': this.dataZone,
                        'outZone': this.dataZone
                    };
                    T5R = s$U.newIterator(W7M);
                    o_5 = T5R.next();
                    if (D9S < o_5) {
                        if (A7A) {
                            if (K5B || K5B === 0) {
                                i9q[A7A] = K5B; ;
                            }
                        } else {
                            if (K5B || K5B === 0) {
                                i9q.Close = K5B;
                                if (K5B > i9q.High || i9q.High === null) {
                                    i9q.High = K5B;
                                }
                                if (K5B < i9q.Low || i9q.Low === null) {
                                    i9q.Low = K5B;
                                }
                                if (i9q.Open === null) {
                                    i9q.Open = K5B;
                                };
                            }
                            if (X7i) {
                                i9q.Volume += X7i;
                            }
                            if (a2V || a2V === 0) {
                                i9q.Bid = a2V;
                            }
                            if (X9I || X9I === 0) {
                                i9q.Ask = X9I;
                            }
                        }
                        X4H = R.clone(H4s);
                        if (typeof i9q.Adj_Close != "undefined") {
                            i9q.Adj_Close = i9q.Close;
                        }
                        this.appendMasterData([i9q], X8p, X4H);
                    } else {
                        l4a = [];
                        S0l = {
                            'begin': D9S,
                            'interval': this.layout.interval,
                            'periodicity': this.layout.periodicity,
                            'timeUnit': this.layout.timeUnit,
                            'inZone': this.dataZone,
                            'outZone': this.dataZone
                        };
                        e6T = s$U.newIterator(S0l);
                        e6T.next();
                        D9S = e6T.previous();
                        while (o_5 < D9S && this.streamParameters.fillGaps) {
                            m7R = {
                                Date: R.yyyymmddhhmmssmmm(o_5),
                                DT: o_5,
                                Close: i9q.Close,
                                Open: i9q.Close,
                                High: i9q.Close,
                                Low: i9q.Close,
                                Volume: 0,
                                Bid: i9q.Bid,
                                Ask: i9q.Ask
                            };
                            l4a.push(m7R);
                            o_5 = T5R.next();
                        }
                        if (A7A) {
                            R_l = this.currentQuote();
                            i9q = {
                                Date: R.yyyymmddhhmmssmmm(o_5),
                                DT: o_5,
                                Close: R_l.Close,
                                Volume: 0,
                                Bid: R_l.Bid,
                                Ask: R_l.Ask
                            };
                            i9q[A7A] = K5B;
                        } else {
                            i9q = {
                                Date: R.yyyymmddhhmmssmmm(o_5),
                                DT: o_5,
                                Open: K5B,
                                Close: K5B,
                                High: K5B,
                                Low: K5B,
                                Volume: X7i,
                                Bid: a2V,
                                Ask: X9I
                            };
                        }
                        l4a.push(i9q);
                        this.appendMasterData(l4a, X8p, H4s);
                    }
                }
            };
            S.prototype.appendMasterData = function (q14, v70, A39) {
                var d7q,
                K$v,
                z1Y,
                A4l,
                O63,
                k9P,
                g92,
                f_Z,
                G7C,
                z4s,
                v9V,
                Y5d,
                i0Z,
                K3Z,
                C6C,
                A$W,
                S0j,
                j5e;
                d7q = "app";
                d7q += "endMa";
                d7q += "sterDa";
                d7q += "ta";
                if (!A39) {
                    A39 = {};
                }
                if (!v70) {
                    v70 = this.chart;
                }
                if (q14.constructor == Object) {
                    q14 = [q14];
                }
                if (this.runPrepend("appendMasterData", [q14, v70, A39])) {
                    return;
                }
                if (!q14 || !q14.length) {
                    return;
                }
                K$v = q14[ + "0"].DT;
                if (!K$v) {
                    K$v = R.strToDateTime(q14[0].Date);
                }
                z1Y = v70.masterData;
                if (!z1Y || !z1Y.length) {
                    z1Y = v70.masterData = R.clone(q14);
                    for (A4l = 0; A4l < z1Y.length; A4l++) {
                        if (z1Y[A4l].DT) {
                            z1Y[A4l].Date = R.yyyymmddhhmmssmmm(z1Y[A4l].DT);
                        } else {
                            z1Y[A4l].DT = R.strToDateTime(z1Y[A4l].Date);
                        }
                        if (z1Y[A4l].Volume && typeof z1Y[A4l].Volume !== "number") {
                            z1Y[A4l].Volume = parseInt(z1Y[A4l].Volume,  + "10");
                        }
                        if (!S.isDailyInterval(this.layout.interval)) {
                            this.setDisplayDate(z1Y[A4l]);
                        }
                    }
                } else {
                    O63 = -902938099;
                    k9P = 841398977;
                    g92 = 2;
                    for (var o$y = 1; N1O.n$d(o$y.toString(), o$y.toString().length, 53170) !== O63; o$y++) {
                        N1O.B_x(99);
                        var R0N = N1O.f21(15, 14, 156, 0, 12);
                        A4l = z1Y.length % R0N;
                        g92 += 2;
                    }
                    if (N1O.n$d(g92.toString(), g92.toString().length, 94178) !== k9P) {
                        A4l = z1Y.length - 1;
                    }
                    while (A4l >= 0) {
                        f_Z = z1Y[A4l].DT;
                        if (!f_Z) {
                            f_Z = R.strToDateTime(z1Y[A4l].Date);
                        }
                        if (f_Z.getTime() <= K$v.getTime()) {
                            G7C = 0;
                            if (f_Z.getTime() < K$v.getTime()) {
                                G7C = 1;
                            }
                            for (var h_e = 0; h_e < q14.length; h_e++) {
                                z4s = "numb";
                                z4s += "er";
                                if (!G7C) {
                                    v9V = "un";
                                    v9V += "defined";
                                    if (typeof z1Y[A4l + h_e] != v9V) {
                                        if (!q14[h_e].Volume && z1Y[A4l + h_e].Volume) {
                                            q14[h_e].Volume = z1Y[A4l + h_e].Volume;
                                        }
                                        if (!A39.allowReplaceOHL) {
                                            if (z1Y[A4l + h_e].Open) {
                                                q14[h_e].Open = z1Y[A4l + h_e].Open;
                                            }
                                            if (z1Y[A4l + h_e].High > q14[h_e].High) {
                                                q14[h_e].High = z1Y[A4l + h_e].High;
                                            }
                                            if (z1Y[A4l + h_e].Low && z1Y[A4l + h_e].Low < q14[h_e].Low) {
                                                q14[h_e].Low = z1Y[A4l + h_e].Low;
                                            }
                                        };
                                    }
                                    for (var U33 in this.chart.series) {
                                        Y5d = "und";
                                        Y5d += "e";
                                        Y5d += "fined";
                                        if (typeof q14[h_e][U33] == Y5d && typeof z1Y[A4l + h_e] != "undefined") {
                                            N1O.p86(2);
                                            q14[h_e][U33] = z1Y[N1O.U9a(h_e, A4l)][U33];
                                        }
                                    }
                                    for (var y0A in this.panels) {
                                        if (this.panels[y0A].studyQuotes) {
                                            for (var I95 in this.panels[y0A].studyQuotes) {
                                                if (!this.panels[y0A].studyQuotes[I95])
                                                    continue;
                                                if (typeof q14[h_e][I95] == "undefined" && typeof z1Y[A4l + h_e] != "undefined") {
                                                    N1O.p86(2);
                                                    q14[h_e][I95] = z1Y[N1O.U9a(h_e, A4l)][I95];
                                                }
                                            }
                                        }
                                    }
                                }
                                N1O.p86(35);
                                z1Y[N1O.U9a(G7C, A4l, h_e)] = q14[h_e];
                                if (z1Y[A4l + h_e + G7C].DT) {
                                    z1Y[A4l + h_e + G7C].Date = R.yyyymmddhhmmssmmm(z1Y[A4l + h_e + G7C].DT);
                                } else {
                                    z1Y[A4l + h_e + G7C].DT = R.strToDateTime(z1Y[A4l + h_e + G7C].Date);
                                }
                                if (z1Y[A4l + h_e + G7C].Volume && typeof z1Y[A4l + h_e + G7C].Volume !== z4s) {
                                    z1Y[A4l + h_e + G7C].Volume = parseInt(z1Y[A4l + h_e + G7C].Volume, "10" - 0);
                                }
                                if (!S.isDailyInterval(this.layout.interval)) {
                                    this.setDisplayDate(this.masterData[A4l + h_e + G7C]);
                                };
                            }
                            break;
                        }
                        A4l--;
                    }
                    for (A4l in this.plugins) {
                        i0Z = this.plugins[A4l];
                        if (i0Z.display) {
                            if (i0Z.appendMasterData) {
                                i0Z.appendMasterData(this, q14, v70);
                            }
                        }
                    }
                }
                if (!this.masterData || !this.masterData.length) {
                    this.masterData = z1Y;
                }
                if (!A39.noCreateDataSet) {
                    K3Z = this.streamParameters;
                    if (++K3Z.count > K3Z.maxTicks || A39.bypassGovernor) {
                        clearTimeout(K3Z.timeout);
                        this.createDataSet();
                        this.draw();
                        this.updateChartAccessories();
                        K3Z.count = 0;
                        C6C =  + "1363572270";
                        A$W = 1051318888;
                        S0j = 2;
                        for (var G_N = 1; N1O.Y4l(G_N.toString(), G_N.toString().length, 64149) !== C6C; G_N++) {
                            K3Z.timeout = ~3; ;
                            S0j += 2;
                        }
                        if (N1O.Y4l(S0j.toString(), S0j.toString().length, 37023) !== A$W) {
                            K3Z.timeout = !5; ;
                        }
                        N1O.p86(7);
                        K3Z.timeout = -N1O.U9a(0, "1"); ;
                    } else {
                        j5e = this;
                        if (K3Z.timeout == -1) {
                            K3Z.timeout = setTimeout(function () {
                                j5e.createDataSet();
                                j5e.draw();
                                j5e.updateChartAccessories();
                                j5e.streamParameters.count = 0;
                                N1O.B_x(1);
                                j5e.streamParameters.timeout = -N1O.U9a(0, "1");
                            }, K3Z.maxWait);
                        }
                    }
                }
                this.runAppend(d7q, arguments);
            };
            S.prototype.displayAll = function (c9Q, r9V) {
                var v3X,
                l5O,
                R1R,
                G7q,
                t8U;
                function D06() {
                    var I_m,
                    Z5V,
                    Q$N,
                    P$Y;
                    if (!v3X.masterData.length) {
                        return;
                    }
                    I_m = R.clone(c9Q);
                    I_m.dtLeft = v3X.masterData[0].DT;
                    I_m.dtRight = v3X.masterData[v3X.masterData.length - ("1" << 0)].DT;
                    if (c9Q.maintainPeriodicity) {
                        I_m.periodicity = {};
                        N1O.p86(17);
                        Z5V = -N1O.f21("1666730025", 0);
                        Q$N = 2108564226;
                        P$Y = 2;
                        for (var N_9 = 1; N1O.Y4l(N_9.toString(), N_9.toString().length, 95550) !== Z5V; N_9++) {
                            I_m.periodicity.interval = l5O.layout.interval;
                            I_m.periodicity.period = l5O.layout.periodicity;
                            P$Y += 2;
                        }
                        if (N1O.n$d(P$Y.toString(), P$Y.toString().length, 11594) !== Q$N) {
                            I_m.periodicity.interval = l5O.layout.interval;
                            I_m.periodicity.period = l5O.layout.periodicity;
                        }
                    }
                    l5O.setRange(I_m, function (Z7l) {
                        if (!c9Q.maintainPeriodicity) {
                            l5O.layout.setSpan = {
                                base: c9Q.base,
                                multiplier: c9Q.multiplier
                            };
                            l5O.changeOccurred("layout");
                        }
                        if (r9V) {
                            r9V(Z7l);
                        }
                    });
                }
                function y8o() {
                    N1O.N7F();
                    l5O.quoteDriver.loadAll(v3X, D06);
                }
                v3X = this.chart;
                if (c9Q && c9Q.chart) {
                    v3X = c9Q.chart;
                }
                l5O = this;
                if (!this.quoteDriver) {
                    D06();
                    return;
                }
                if (this.dontRoll && this.layout.interval != "month") {
                    R1R = 420309917;
                    G7q =  + "1011177443";
                    t8U = 2;
                    for (var B1G = 1; N1O.Y4l(B1G.toString(), B1G.toString().length, 678) !== R1R; B1G++) {
                        this.setPeriodicityV2(1, "month", y8o);
                        t8U += 2;
                    }
                    if (N1O.n$d(t8U.toString(), t8U.toString().length, 53310) !== G7q) {
                        this.setPeriodicityV2(2, "", y8o);
                    }
                } else if (!S.isDailyInterval(this.layout.interval)) {
                    this.setPeriodicityV2(1, "day", y8o);
                } else {
                    if (v3X.moreAvailable) {
                        y8o();
                    } else {
                        D06();
                    }
                }
            };
            S.prototype.setRange = function (s2b, f$X) {
                var s4Q,
                O22,
                e5P,
                V9d,
                Z83,
                d0k,
                D0a,
                r9o,
                o8R,
                d8$,
                S6K,
                R04,
                g$2,
                H4d,
                Z9z,
                j9K,
                m8w,
                K78,
                r9a,
                Q0t,
                L08,
                z_B,
                O62,
                Y_9,
                k1L,
                u7f,
                b71,
                G3h,
                A5_;
                if (R.isEmpty(s2b)) {
                    s2b = {
                        dtLeft: arguments[0],
                        dtRight: arguments[ + "1"],
                        padding: arguments[2],
                        chart: arguments[3],
                        goIntoFuture: ![]
                    };
                    f$X = arguments[4];
                }
                function Z5g(O1d, x31, S4U, O_R, H9E) {
                    var M_X,
                    s9X,
                    c6r;
                    N1O.B_x(17);
                    M_X = N1O.f21("0", 0);
                    N1O.B_x(7);
                    s9X = N1O.U9a(x31, O1d);
                    if (S.isDailyInterval(S4U)) {
                        if (S4U == "month") {
                            M_X = s9X / R.MONTH / O_R;
                        } else if (S4U == "week") {
                            M_X = s9X / R.WEEK / O_R;
                        } else {
                            M_X = s9X / R.DAY / O_R;
                        }
                    } else {
                        if (!isNaN(S4U)) {
                            M_X = s9X / (R.MINUTE * S4U) / O_R;
                        } else {
                            c6r = "mi";
                            c6r += "llisecond";
                            if (S4U == c6r) {
                                N1O.B_x(24);
                                M_X = N1O.f21(O_R, s9X);
                            } else if (S4U == "second") {
                                M_X = s9X / R.SECOND / O_R;
                            } else if (S4U == "hour") {
                                M_X = s9X / R.HOUR / O_R;
                            } else {
                                M_X = s9X / R.MINUTE / O_R;
                            }
                        }
                    }
                    return Math.round(M_X); ;
                }
                if (!s2b.chart) {
                    s2b.chart = this.chart;
                }
                if (typeof s2b.padding == "undefined") {
                    s2b.padding = this.preferences.whitespace;
                }
                N1O.N7F();
                function v5Z(W8t) {
                    if (W8t) {
                        d0k.chart.scroll = Y_9;
                        d0k.layout.candleWidth = k1L;
                        if (f$X) {
                            f$X(W8t);
                        }
                        return;
                    }
                    N1O.N7F();
                    D0a++;
                    if (D0a >  + "10") {
                        console.log("STXChart.setRange(): Too many loads (10) from server. Stopping. Check periodicity logic.");
                        g4m();
                        return;
                    }
                    if (O22.moreAvailable && O22.masterData[0].DT > e5P) {
                        d0k.quoteDriver.checkLoadMore(O22, !![], !!0, function (s5L) {
                            N1O.N7F();
                            if (!s5L) {
                                v5Z();
                            }
                        });
                    } else {
                        g4m();
                    }
                }
                s4Q = ![];
                O22 = s2b.chart;
                e5P = s2b.dtLeft;
                V9d = this.convertToDataZone(new Date());
                if (s2b.dtRight) {
                    V9d = s2b.dtRight;
                }
                if (!e5P) {
                    Z83 = this.standardMarketIterator(V9d, null, O22);
                    e5P = Z83.previous(O22.maxTicks);
                    if (!s2b.periodicity) {
                        s4Q = !![];
                    }
                }
                function g4m() {
                    var J6d,
                    O8O,
                    r1g;
                    if (!O22.dataSet || O22.dataSet.length === 0) {
                        if (f$X) {
                            f$X();
                        }
                        return;
                    }
                    J6d = 0;
                    O8O = 0;
                    if (e5P.getTime() >= O22.dataSet[0].DT.getTime() || s2b.goIntoPast) {
                        J6d = d0k.tickFromDate(e5P, O22, null, !!({}));
                    } else {
                        J6d = 0;
                    }
                    if (V9d.getTime() <= O22.dataSet[O22.dataSet.length - 1].DT.getTime() || s2b.goIntoFuture) {
                        O8O = d0k.tickFromDate(V9d, O22);
                    } else {
                        N1O.p86(8);
                        var E3o = N1O.f21(0, 10, 11);
                        O8O = O22.dataSet.length - E3o;
                    }
                    N1O.B_x(36);
                    r1g = N1O.f21(O8O, J6d, 1);
                    N1O.A7M();
                    if (r1g < 1) {
                        if (f$X) {
                            f$X();
                        }
                        return;
                    }
                    d0k.setCandleWidth((d0k.chart.width - s2b.padding) / r1g, O22);
                    O22.scroll = O22.dataSet.length - J6d + ("1" ^ 0);
                    d0k.micropixels = 0;
                    d0k.draw();
                    d0k.changeOccurred("layout");
                    if (f$X) {
                        f$X();
                    }
                }
                d0k = this;
                D0a = 0;
                if (this.quoteDriver) {
                    if (s4Q) {
                        r9o = this.layout.interval;
                        d8$ = this.layout.timeUnit;
                        o8R = this.layout.period;
                    } else if (s2b.periodicity) {
                        r9o = s2b.periodicity.interval;
                        d8$ = s2b.periodicity.timeUnit;
                        o8R = s2b.periodicity.period;
                    } else {
                        S6K = V9d.getTime() - e5P.getTime();
                        if (s2b.rangePeriodicityMap) {
                            R04 = s2b.rangePeriodicityMap;
                            g$2 = null;
                            for (var B0w = 0; B0w < R04.length; B0w++) {
                                H4d = R04[B0w];
                                if (S6K <= H4d.range) {
                                    g$2 = H4d;
                                    break;
                                }
                            }
                            r9o = g$2.interval;
                            o8R = g$2.periodicity;
                            d8$ = g$2.timeUnit; ;
                        } else {
                            Z9z = "y";
                            Z9z += "e";
                            Z9z += "a";
                            Z9z += "r";
                            j9K = "baseline_de";
                            j9K += "lta";
                            m8w = "colored_mou";
                            m8w += "ntain";
                            K78 = "col";
                            K78 += "ored_l";
                            K78 += "ine";
                            r9a = 2;
                            switch (this.layout.chartType) {
                            case "line":
                            case K78:
                            case "mountain":
                            case m8w:
                            case j9K:
                            case "baseline_delta_mountain":
                            case "wave":
                                r9a = 2;
                                break;
                            case "candle":
                            case "bar":
                            case "colored_bar":
                            case "hollow_candle":
                            case "volume_candle":
                            case "scatterplot":
                                N1O.B_x(7);
                                r9a = N1O.U9a(0, "5");
                                break;
                            }
                            if (s2b.pixelsPerBar) {
                                r9a = s2b.pixelsPerBar;
                            }
                            Q0t = O22.width / r9a;
                            L08 = [{
                                    interval: 1,
                                    ms: R.MINUTE
                                }, {
                                    interval: 5,
                                    ms: R.MINUTE * 5
                                }, {
                                    interval: 30,
                                    ms: R.MINUTE * 30
                                }, {
                                    interval: "day",
                                    ms: R.DAY
                                }, {
                                    interval: "month",
                                    ms: R.MONTH
                                }, {
                                    interval: Z9z,
                                    ms: Number.MAX_VALUE
                                }
                            ];
                            r9o = L08[0].interval;
                            o8R = 1;
                            for (var r4D = 0; r4D < L08.length; r4D++) {
                                O62 = S6K / L08[r4D].ms;
                                if (O62 < Q0t) {
                                    if (L08[r4D - 1]) {
                                        r9o = L08[r4D -  + "1"].interval;
                                        N1O.B_x(24);
                                        o8R = Math.ceil(N1O.U9a(Q0t, z_B));
                                    } else {
                                        r9o = L08[r4D].interval;
                                        o8R = 1;
                                    }
                                    break;
                                }
                                z_B = O62;
                            }
                        }
                    }
                    Y_9 = this.chart.scroll;
                    k1L = this.layout.candleWidth;
                    this.chart.scroll = this.chart.maxTicks = Z5g(V9d.getTime(), e5P.getTime(), r9o, o8R, this.dontRoll);
                    this.layout.candleWidth = this.chart.width / this.chart.maxTicks;
                    u7f = this.layout.timeUnit != d8$ && (d8$ == "seconds" || d8$ == "milliseconds");
                    if (!u7f && S.isDailyInterval(this.layout.interval) !== S.isDailyInterval(r9o)) {
                        u7f = !!1;
                    } else if (!S.isDailyInterval(this.layout.interval) && this.layout.interval != r9o) {
                        u7f = !0;
                    }
                    if (!this.chart.masterData || u7f) {
                        this.layout.interval = r9o;
                        this.layout.periodicity = o8R;
                        this.layout.timeUnit = d8$;
                        if (!this.layout.timeUnit) {
                            b71 = "m";
                            b71 += "inut";
                            b71 += "e";
                            G3h = "sec";
                            G3h += "o";
                            G3h += "n";
                            G3h += "d";
                            if (S.isDailyInterval(this.layout.interval)) {
                                this.layout.timeUnit = null;
                            } else if (this.layout.interval == "second") {
                                this.layout.timeUnit = G3h;
                            } else if (this.layout.interval != "tick") {
                                this.layout.timeUnit = b71;
                            }
                        }
                        A5_ = {
                            symbol: O22.symbol,
                            symbolObject: O22.symbolObject,
                            chart: O22,
                            nodraw: !""
                        };
                        if (this.layout.interval == "tick") {
                            A5_.startDate = e5P;
                            A5_.endDate = V9d;
                        }
                        if (!this.displayInitialized) {
                            A5_.initializeChart = !0;
                        }
                        this.quoteDriver.newChart(A5_, v5Z);
                    } else {
                        if (this.layout.interval != r9o || this.layout.periodicity != o8R) {
                            this.layout.interval = r9o;
                            this.layout.periodicity = o8R;
                            this.createDataSet();
                        }
                        v5Z();
                    }
                } else {
                    g4m();
                }
            };
            S.prototype.setSpan = function (u$D, P0h) {
                var e2d,
                m_c,
                I4r,
                X00,
                G3U,
                B2e,
                Q__,
                c2B,
                P2y,
                t$f,
                G5v,
                j8g,
                v1B,
                k8l,
                F8P,
                F4r,
                I4O,
                t84,
                w$C,
                n4t,
                d7p;
                e2d = "y";
                e2d += "ea";
                function j1r(T3o) {
                    T3o.setHours(0);
                    T3o.setMinutes(0);
                    T3o.setSeconds(0);
                    T3o.setMilliseconds(0);
                    return T3o;
                }
                e2d += "r";
                m_c = "a";
                m_c += "l";
                m_c += "l";
                I4r = arguments[0];
                X00 = arguments[1];
                G3U = arguments[2];
                B2e = arguments[3];
                if (typeof u$D == "object") {
                    I4r = u$D.period ? u$D.period : u$D.multiplier ? u$D.multiplier : "1" << 0;
                    X00 = u$D.interval ? u$D.interval : u$D.base ? u$D.base : u$D.span ? u$D.span : u$D.period;
                    G3U = u$D.padding;
                    B2e = u$D.chart;
                } else {
                    u$D = {
                        period: I4r,
                        interval: X00,
                        padding: G3U,
                        chart: B2e
                    };
                    N1O.B_x(7);
                    P0h = arguments[N1O.f21(0, "5")];
                }
                if (!u$D.padding) {
                    N1O.B_x(16);
                    u$D.padding = N1O.U9a("0", 32);
                }
                if (!B2e) {
                    B2e = this.chart;
                }
                X00 = X00.toLowerCase();
                if (X00 == m_c) {
                    this.displayAll(u$D, P0h);
                    return;
                }
                N1O.A7M();
                Q__ = X00;
                c2B = 1;
                if (X00 == "today") {
                    P2y = "d";
                    P2y += "a";
                    P2y += "y";
                    Q__ = P2y;
                } else if (X00 == "year") {
                    t$f = "m";
                    t$f += "on";
                    t$f += "th";
                    Q__ = t$f;
                    c2B = 12;
                }
                G5v = R.shallowClone(u$D);
                G5v.goIntoFuture = ![];
                j8g = {
                    'begin': new Date(),
                    'interval': Q__,
                    'period': c2B,
                    'outZone': this.dataZone
                };
                v1B = B2e.market.newIterator(j8g);
                k8l = this.convertToDataZone(new Date());
                if (X00 === 'ytd') {
                    k8l = j1r(k8l);
                    k8l.setMonth(0);
                    k8l.setDate(1);
                } else if (X00 === "today") {
                    v1B.next();
                    k8l = v1B.previous();
                } else if (X00 === "month") {
                    k8l = j1r(new Date());
                    k8l.setMonth(k8l.getMonth() - I4r);
                } else if (X00 === e2d) {
                    k8l = j1r(new Date());
                    k8l.setFullYear(k8l.getFullYear() - I4r);
                } else if (X00 === "week") {
                    k8l = j1r(new Date());
                    k8l.setDate(k8l.getDate() - I4r * 7);
                } else if (X00 === "day" && I4r == 1) {
                    F8P = k8l.getHours();
                    F4r = k8l.getMinutes();
                    I4O = k8l.getSeconds();
                    t84 = k8l.getMilliseconds();
                    k8l = v1B.previous();
                    k8l.setHours(F8P);
                    k8l.setMinutes(F4r);
                    k8l.setSeconds(I4O);
                    k8l.setMilliseconds(t84);
                } else {
                    N1O.p86(7);
                    k8l = v1B.previous(N1O.U9a(1, I4r));
                }
                G5v.dtLeft = k8l;
                if (X00 === 'today') {
                    G5v.goIntoFuture = !0;
                    G5v.dtRight = new Date(k8l);
                    w$C = v1B.market.zclose_hour;
                    n4t = v1B.market.zclose_minute;
                    G5v.dtRight.setHours(w$C ? w$C : 23);
                    G5v.dtRight.setMinutes(w$C ? n4t :  + "59");
                    G5v.dtRight.setSeconds(0);
                    G5v.dtRight = B2e.market._convertFromMarketTZ(G5v.dtRight, this.dataZone);
                    G5v.dtLeft.setHours(v1B.market.zopen_hour);
                    G5v.dtLeft.setMinutes(v1B.market.zopen_minute);
                    G5v.dtLeft.setSeconds( + "0");
                    G5v.dtLeft = B2e.market._convertFromMarketTZ(G5v.dtLeft, this.dataZone);
                }
                if (G5v.maintainPeriodicity) {
                    G5v.periodicity = {};
                    G5v.periodicity.interval = this.layout.interval;
                    G5v.periodicity.period = this.layout.periodicity;
                }
                B2e.spanLock = !1;
                d7p = this;
                this.setRange(G5v, function (h0J) {
                    var s6V;
                    if (!u$D.maintainPeriodicity) {
                        s6V = "l";
                        s6V += "ayou";
                        s6V += "t";
                        d7p.layout.setSpan = {
                            base: u$D.base,
                            multiplier: u$D.multiplier
                        };
                        d7p.changeOccurred(s6V);
                    }
                    if (X00 === "ytd" || X00 == "today") {
                        B2e.spanLock = !!"1"; ;
                    }
                    if (P0h) {
                        P0h(h0J);
                    }
                });
            };
            S.prototype.getSpanCandleWidth = function (z47) {
                var J1p,
                t6x,
                i6N,
                h36,
                Q6B,
                F5C,
                I$t;
                J1p = "da";
                J1p += "y";
                t6x = z47.split((21.69, "7960" ^ 0) > ("162.36" - 0, 610) ? "," : 3690 >= (974.63, 2517) ? 407.82 != (5.09, 469) ? 6.91e+3 : (845.72, 0xa2b) : 488.48);
                if (t6x.length <  + "2") {
                    return;
                }
                i6N = parseFloat(t6x["0" ^ 0]);
                N1O.A7M();
                h36 = new Date();
                Q6B = new Date();
                if (t6x[1] == "year") {
                    Q6B.setFullYear(Q6B.getFullYear() - i6N);
                } else if (t6x[1] == "month") {
                    Q6B.setMonth(Q6B.getMonth() - i6N);
                } else if (t6x[1] == J1p) {
                    Q6B.setDate(Q6B.getDate() - i6N);
                } else if (t6x[1] == "week") {
                    Q6B.setDate(Q6B.getDate() - 7 * i6N);
                }
                N1O.B_x(4);
                var e4K = N1O.f21(333, 1, 111, 981, 16);
                F5C = (h36.getTime() - Q6B.getTime()) / e4K /  + "60" /  + "60" / ("24" - 0);
                N1O.p86(100);
                F5C = N1O.f21(5, 7, F5C);
                I$t = this.chart.width / F5C;
                return I$t;
            };
            S.prototype.setMaxTicks = function (f0E, t7T) {
                var j7I;
                if (!t7T) {
                    t7T = {};
                }
                f0E = Math.round(f0E);
                if (f0E < 2) {
                    f0E = 2;
                }
                j7I = t7T.padding;
                if (!j7I) {
                    j7I =  + "0";
                }
                this.layout.candleWidth = (this.chart.width - j7I) / f0E;
                if (!this.layout.candleWidth) {
                    this.layout.candleWidth = 8;
                }
                this.chart.maxTicks = Math.round(this.chart.width / this.layout.candleWidth - 0.499);
                if (t7T.padding || t7T.padding === 0) {
                    N1O.p86(2);
                    this.chart.scroll = N1O.U9a(1, f0E);
                }
            };
            S.prototype.construct = function () {
                N1O.A7M();
                N1O.p86(16);
                this.stackPanel("chart", "chart", N1O.U9a("1", 32));
                this.adjustPanelPositions();
                this.chart.panel = this.panels[this.chart.name];
                this.cx = 0;
                this.cy = 0;
                this.micropixels = 0;
                this.chart.panel.subholder.appendChild(this.controls.home);
                this.callbackListeners = {};
                this.longHoldTime = 1000;
            };
            S.prototype.addEventListener = function (P9T, U0P) {
                var k4T;
                if (!P9T) {
                    P9T = 4679 > 7474 ? (9.70e+3, !!({})) : "*";
                }
                N1O.N7F();
                k4T = this.callbackListeners[P9T];
                if (!k4T) {
                    this.callbackListeners[P9T] = k4T = [];
                }
                k4T.push(U0P);
                return {
                    type: P9T,
                    cb: U0P
                };
            };
            S.prototype.removeEventListener = function (E8y, Z1m) {
                var S25,
                D3G,
                F4u,
                m$R;
                if (typeof E8y != "object") {
                    S25 =  -  + "2107038982";
                    D3G = -1668172430;
                    F4u = 2;
                    for (var Z7O = 1; N1O.n$d(Z7O.toString(), Z7O.toString().length, 1646) !== S25; Z7O++) {
                        E8y = {
                            type: E8y,
                            cb: Z1m
                        };
                        N1O.p86(0);
                        F4u += N1O.U9a(1, "2");
                    }
                    if (N1O.Y4l(F4u.toString(), F4u.toString().length, 56600) !== D3G) {
                        E8y = {
                            type: E8y,
                            cb: Z1m
                        };
                    }
                    E8y = {
                        type: E8y,
                        cb: Z1m
                    };
                }
                N1O.A7M();
                if (!E8y.type) {
                    E8y.type = "*";
                }
                m$R = this.callbackListeners[E8y.type];
                if (!m$R) {
                    return;
                }
                for (var P57 = 0; P57 < m$R.length; P57++) {
                    if (m$R[P57] === E8y.cb) {
                        m$R.splice(P57);
                        if (!m$R.length) {
                            E8y[E8y.type] = null;
                        }
                        return;
                    }
                }
            };
            S.prototype.dispatch = function (K$p, A_j) {
                var A8J;
                if (this.callbacks[K$p]) {
                    this.callbacks[K$p].call(this, A_j);
                }
                A8J = this.callbackListeners[K$p];
                if (A8J) {
                    for (var O9T = 0; O9T < A8J.length; O9T++) {
                        A8J[O9T].call(this, A_j);
                    }
                }
                A8J = this.callbackListeners["*"];
                if (A8J) {
                    for (var L8h = 0; L8h < A8J.length; L8h++) {
                        A8J[L8h].call(this, A_j);
                    }
                }
            };
            S.prototype.deleteYAxisIfUnused = function (P$N, b_7) {
                var J9q,
                G5x;
                if (!b_7) {
                    return;
                }
                if (b_7 === P$N.yAxis) {
                    return;
                }
                for (var z1w in this.chart.seriesRenderers) {
                    J9q = this.chart.seriesRenderers[z1w];
                    if (J9q.params.yAxis === b_7) {
                        if (J9q.seriesParams.length !== 0) {
                            return;
                        }
                    }
                }
                N1O.A7M();
                for (G5x = 0; G5x < P$N.yaxisLHS.length; G5x++) {
                    if (P$N.yaxisLHS[G5x] === b_7) {
                        P$N.yaxisLHS.splice(G5x, 1);
                    }
                }
                for (G5x = 1; G5x < P$N.yaxisRHS.length; G5x++) {
                    if (P$N.yaxisRHS[G5x] === b_7) {
                        N1O.B_x(11);
                        P$N.yaxisRHS.splice(G5x, N1O.U9a("1", 32));
                    }
                }
                this.resizeCanvas();
                this.adjustPanelPositions();
            };
            S.prototype.addYAxis = function (c4V, h75) {
                var q5I;
                if (!h75) {
                    return;
                }
                if (!c4V.yaxisLHS) {
                    c4V.yaxisLHS = [];
                    c4V.yaxisRHS = [];
                    if (c4V.yAxis.position == "right") {
                        c4V.yaxisRHS.push(c4V.yAxis);
                    } else {
                        c4V.yaxisLHS.push(c4V.yAxis);
                    }
                }
                q5I = c4V.yaxisLHS.concat(c4V.yaxisRHS);
                for (var f4i = "0" | 0; f4i < q5I.length; f4i++) {
                    if (q5I[f4i] === h75) {
                        return;
                    }
                }
                if (h75.position === "left") {
                    c4V.yaxisLHS.unshift(h75);
                } else {
                    h75.position = "right";
                    c4V.yaxisRHS.push(h75);
                }
                this.preAdjustScroll();
                this.resizeCanvas();
                this.adjustPanelPositions();
                this.postAdjustScroll();
            };
            S.prototype.calculateYAxisPositions = function () {
                var f5N,
                z4v,
                E21,
                A4f,
                i0r,
                k5B,
                V9s,
                M5v,
                X9h,
                a9y;
                f5N = [];
                for (var U4Y in this.charts) {
                    f5N.push(U4Y);
                }
                for (var I8g in this.panels) {
                    z4v = this.panels[I8g];
                    if (z4v.name === z4v.chart.name)
                        continue;
                    f5N.push(I8g);
                }
                for (var z7A = "0" - 0; z7A < f5N.length; z7A++) {
                    E21 = this.panels[f5N[z7A]];
                    if (!E21)
                        continue;
                    A4f = E21.name === E21.chart.name;
                    if (!E21.yaxisLHS) {
                        E21.yaxisLHS = [];
                        E21.yaxisRHS = [];
                        if (E21.name === E21.chart.name || E21.yAxis.position) {
                            i0r = "l";
                            i0r += "ef";
                            i0r += "t";
                            if (E21.yAxis.position == i0r) {
                                E21.yaxisLHS.push(E21.yAxis);
                            } else {
                                E21.yaxisRHS.push(E21.yAxis);
                            };
                        } else {
                            k5B = "r";
                            k5B += "i";
                            k5B += "g";
                            k5B += "ht";
                            V9s = E21.chart.panel.yAxis.position;
                            if (!V9s || V9s == k5B) {
                                E21.yaxisRHS.push(E21.yAxis);
                            } else {
                                E21.yaxisLHS.push(E21.yAxis);
                            }
                        }
                    }
                    if (!E21.yAxis.width) {
                        E21.yAxis.width = this.yaxisWidth;
                    }
                    E21.yaxisTotalWidthRight = 0;
                    E21.yaxisTotalWidthLeft = 0;
                    for (M5v = 0; M5v < E21.yaxisLHS.length; M5v++) {
                        X9h = E21.yaxisLHS[M5v];
                        E21.yaxisTotalWidthLeft += X9h.width;
                        X9h.justifyRight = X9h.justifyRight === null ? E21.chart.yAxis.justifyRight : X9h.justifyRight;
                        if (X9h.justifyRight === null) {
                            X9h.justifyRight = !!"1";
                        }
                    }
                    for (M5v = 0; M5v < E21.yaxisRHS.length; M5v++) {
                        X9h = E21.yaxisRHS[M5v];
                        E21.yaxisTotalWidthRight += X9h.width;
                    }
                    N1O.p86(11);
                    a9y = N1O.U9a("0", 32);
                    for (M5v = 0; M5v < E21.yaxisLHS.length; M5v++) {
                        X9h = E21.yaxisLHS[M5v];
                        X9h.left = a9y;
                        a9y += X9h.width;
                    }
                    a9y = this.width - E21.yaxisTotalWidthRight;
                    for (M5v = 0; M5v < E21.yaxisRHS.length; M5v++) {
                        X9h = E21.yaxisRHS[M5v];
                        X9h.left = a9y;
                        a9y += X9h.width;
                    }
                    if (typeof this.yaxisLeft != "undefined") {
                        E21.chart.yaxisPaddingRight = this.yaxisLeft;
                    }
                    E21.yaxisCalculatedPaddingRight = E21.yaxisTotalWidthRight;
                    if (E21.chart.yaxisPaddingRight || E21.chart.yaxisPaddingRight === 0) {
                        E21.yaxisCalculatedPaddingRight = E21.chart.yaxisPaddingRight;
                    }
                    E21.yaxisCalculatedPaddingLeft = E21.yaxisTotalWidthLeft;
                    if (E21.chart.yaxisPaddingLeft || E21.chart.yaxisPaddingLeft === 0) {
                        E21.yaxisCalculatedPaddingLeft = E21.chart.yaxisPaddingLeft;
                    }
                    if (A4f) {
                        E21.left = E21.yaxisCalculatedPaddingLeft;
                        E21.right = this.width - E21.yaxisCalculatedPaddingRight;
                    } else {
                        E21.left = E21.chart.panel.left;
                        E21.right = E21.chart.panel.right;
                    }
                    E21.width = E21.right - E21.left;
                    E21.handle.style.left = E21.left + "px";
                    E21.handle.style.width = E21.width + "px";
                    if (A4f) {
                        E21.chart.left = E21.left;
                        E21.chart.right = E21.right;
                        E21.chart.width = E21.right - E21.left;
                    }
                }
            };
            S.prototype.initializeChart = function (J3i) {
                var r5A,
                D7x,
                V_1,
                S8q,
                Q3c,
                e$f,
                g8c,
                P6r,
                C4_,
                F67,
                Z53,
                I$b,
                A_$,
                P9v,
                T8q,
                J4z;
                r5A = "i";
                r5A += "niti";
                r5A += "alizeChar";
                r5A += "t";
                D7x = "2";
                D7x += "d";
                V_1 = "0p";
                V_1 += "x";
                S8q = "0";
                S8q += "p";
                S8q += "x";
                if (this.runPrepend("initializeChart", arguments)) {
                    return;
                }
                if (!this.chart.symbolObject.symbol) {
                    this.chart.symbolObject.symbol = this.chart.symbol;
                }
                if (this.locale) {
                    this.setLocale(this.locale);
                }
                if (!this.displayZone && S.defaultDisplayTimeZone) {
                    this.setTimeZone(null, S.defaultDisplayTimeZone);
                }
                this.calculateYAxisPositions();
                this.micropixels = 0;
                if (J3i) {
                    this.chart.container = J3i;
                }
                this.chart.container.stx = this;
                if (!this.chart.container.STXRegistered) {
                    this.chart.container.STXRegistered = !!({});
                    S.registeredContainers.push(this.chart.container);
                }
                if (R.isSurface) {
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
                    if (this.layout.candleWidth > 200) {
                        this.layout.candleWidth = 8;
                    }
                }
                if (!this.chart.canvas) {
                    this.chart.canvas = document.createElement("canvas");
                }
                if (!this.chart.canvas.getContext) {
                    Q3c = "b";
                    Q3c += "loc";
                    Q3c += "k";
                    this.chart.canvas = this.chart.container.querySelectorAll("#ie8canvas")[0];
                    if (!this.chart.canvas.getContext) {
                        if (window.G_vmlCanvasManager) {
                            G_vmlCanvasManager.initElement(this.chart.canvas);
                        }
                    }
                    this.chart.canvas.style.display = Q3c;
                } else {
                    this.chart.container.appendChild(this.chart.canvas);
                }
                this.chart.canvas.style.position = "absolute";
                this.chart.canvas.style.left = S8q;
                this.chart.context = this.chart.canvas.getContext("2d");
                this.chart.canvas.context = this.chart.context;
                this.chart.context.lineWidth = 1;
                if (!this.chart.tempCanvas) {
                    this.chart.tempCanvas = document.createElement("canvas");
                }
                if (!this.chart.tempCanvas.getContext) {
                    e$f = "#";
                    e$f += "ie8canva";
                    e$f += "sTem";
                    e$f += "p";
                    this.chart.tempCanvas = this.chart.container.querySelectorAll(e$f)[N1O.U9a(0, "0", N1O.p86(1))];
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
                this.chart.tempCanvas.style.left = V_1;
                this.chart.tempCanvas.context = this.chart.tempCanvas.getContext(D7x);
                N1O.p86(16);
                this.chart.tempCanvas.context.lineWidth = N1O.f21("1", 32);
                if (!this.floatCanvas) {
                    this.floatCanvas = document.createElement("canvas");
                }
                if (!this.floatCanvas.getContext) {
                    this.floatCanvas = this.chart.container.querySelectorAll("#ie8canvasFloat")[N1O.f21(0, "0", N1O.p86(1))];
                    if (!this.floatCanvas.getContext) {
                        if (window.G_vmlCanvasManager) {
                            G_vmlCanvasManager.initElement(this.chart.tempCanvas);
                        }
                    }
                    this.floatCanvas.style.display = "block";
                } else {
                    this.chart.container.appendChild(this.floatCanvas);
                }
                this.floatCanvas.style.position = "absolute";
                this.floatCanvas.style.left = "0px";
                this.floatCanvas.context = this.floatCanvas.getContext("2d");
                this.floatCanvas.context.lineWidth = 1;
                this.resizeCanvas();
                if (R.isAndroid) {
                    this.chart.tempCanvas.ontouchstart = function (L1j) {
                        if (L1j.preventDefault) {
                            L1j.preventDefault();
                        }
                    };
                    this.floatCanvas.ontouchstart = function (t6d) {
                        N1O.N7F();
                        if (t6d.preventDefault) {
                            t6d.preventDefault();
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
                if (this.chart.dataSet && this.chart.dataSet.length > "0" - 0) {
                    this.chart.scroll = Math.floor(this.chart.width / this.layout.candleWidth);
                    g8c = Math.round(this.preferences.whitespace / this.layout.candleWidth);
                    this.chart.scroll -= g8c;
                }
                if (R.touchDevice) {
                    P6r = "#";
                    P6r += "vectorTrashCan";
                    C4_ = k(".overlayEdit", this.chart.container);
                    F67 = k("#overlayTrashCan", this.chart.container);
                    Z53 = k(P6r, this.chart.container);
                    if (C4_) {
                        R.safeClickTouch(C4_, (function (c1z) {
                                N1O.N7F();
                                return function (a1D) {
                                    c1z.deleteHighlighted(!![], !"");
                                };
                            })(this));
                        if (F67) {
                            R.safeClickTouch(F67, (function (W2R) {
                                    return function (t7P) {
                                        N1O.A7M();
                                        W2R.deleteHighlighted(![]);
                                    };
                                })(this));
                        }
                    } else if (F67) {
                        R.safeClickTouch(F67, (function (C91) {
                                N1O.A7M();
                                return function (i35) {
                                    N1O.A7M();
                                    C91.deleteHighlighted(!0);
                                };
                            })(this));
                    }
                    if (Z53) {
                        R.safeClickTouch(Z53, (function (Z8t) {
                                return function (a7O) {
                                    Z8t.deleteHighlighted(!![]);
                                };
                            })(this));
                    }
                }
                if (this.manageTouchAndMouse) {
                    this.registerTouchAndMouseEvents();
                }
                this.chart.container.onmouseout = (function (J0t) {
                    N1O.A7M();
                    return function (i2t) {
                        N1O.A7M();
                        J0t.handleMouseOut(i2t);
                    };
                })(this);
                if (this.controls.chartControls) {
                    I$b = "b";
                    I$b += "l";
                    I$b += "o";
                    I$b += "ck";
                    this.controls.chartControls.style.display = I$b;
                }
                this.abortDrawings();
                this.undoStamps = [];
                for (var b6k in this.panels) {
                    A_$ = this.panels[b6k];
                    if (A_$.markerHolder) {
                        this.chart.container.removeChild(A_$.markerHolder);
                        A_$.markerHolder = null;
                    }
                }
                for (var y4L in this.plugins) {
                    P9v = this.plugins[y4L];
                    if (P9v.display) {
                        if (P9v.initializeChart) {
                            P9v.initializeChart(this);
                        }
                    }
                }
                if (!this.resizeListenerInitialized) {
                    this.resizeListenerInitialized = !!1;
                    T8q = function (l3j) {
                        N1O.A7M();
                        return function (o9_) {
                            l3j.resizeChart();
                        };
                    };
                    if (window.attachEvent) {
                        window.attachEvent("onresize", T8q(this));
                    } else {
                        J4z = T8q(this);
                        window.addEventListener("resize", J4z, !0);
                        this.eventListeners.push({
                            "element": window,
                            "event": "resize",
                            "function": J4z
                        });
                    }
                }
                if (this.chart.baseline.userLevel) {
                    this.chart.baseline.userLevel = null;
                }
                this.setResizeTimer(this.resizeDetectMS);
                this.runAppend(r5A, arguments);
            };
            S.prototype.destroy = function () {
                var d9H,
                M3j;
                N1O.A7M();
                this.setResizeTimer(0);
                if (this.quoteDriver) {
                    this.quoteDriver.die();
                }
                this.styles = {};
                for (var K7z =  + "0"; K7z < this.eventListeners.length; K7z++) {
                    d9H = "f";
                    d9H += "unction";
                    M3j = this.eventListeners[K7z];
                    M3j.element.removeEventListener(M3j.event, M3j[d9H]);
                }
            };
            S.prototype.handleMouseOut = function (S6C) {
                N1O.N7F();
                var t4P,
                h_$;
                S6C = S6C || window.event;
                if (!R.withinElement(this.chart.container, S6C.pageX, S6C.pageY)) {
                    if (this.runPrepend("handleMouseOut", arguments)) {
                        return;
                    }
                    this.undisplayCrosshairs();
                    this.grabbingScreen = !({});
                    this.touches = [];
                    this.touching = !1;
                    if (this.activeDrawing && this.userPointerDown) {
                        this.userPointerDown = !!"";
                        this.drawingLine = !1;
                        t4P = this.backOutY(S6C.pageY);
                        h_$ = this.backOutX(S6C.pageX);
                        this.drawingClick(this.currentPanel, h_$, t4P);
                    }
                    S.insideChart = !({});
                    this.displaySticky();
                    this.runAppend("handleMouseOut", arguments);
                }
            };
            S.prototype.registerTouchAndMouseEvents = function () {
                var w8L,
                p5E,
                b0A,
                H6s,
                g8I,
                j6z,
                t6w,
                z9B,
                z4O,
                Z66,
                Q8x,
                q5w,
                S4y,
                y_c,
                h1T,
                k0a,
                Z_G,
                d75;
                w8L = "whee";
                w8L += "l";
                if (this.touchAndMouseEventsRegistered) {
                    return;
                }
                this.touchAndMouseEventsRegistered = !0;
                p5E = this.chart.container;
                b0A = k("#home", this.controls.chartControls);
                H6s = k("#zoomIn", this.controls.chartControls);
                g8I = k("#zoomOut", this.controls.chartControls);
                if (!R.touchDevice) {
                    j6z = "mo";
                    j6z += "u";
                    j6z += "seup";
                    p5E.addEventListener("mousemove", (function (J3x) {
                            N1O.N7F();
                            return function (L07) {
                                N1O.N7F();
                                J3x.mousemove(L07);
                            };
                        })(this), !({}));
                    p5E.addEventListener("mousedown", (function (z5R) {
                            return function (R76) {
                                z5R.mousedown(R76);
                            };
                        })(this), !!0);
                    p5E.addEventListener(j6z, (function (G8y) {
                            N1O.N7F();
                            return function (v6L) {
                                G8y.mouseup(v6L);
                            };
                        })(this), !1);
                } else {
                    if (R.isSurface) {
                        t6w = "mo";
                        t6w += "usemove";
                        p5E.addEventListener(t6w, (function (M46) {
                                return function (r5x) {
                                    M46.msMouseMoveProxy(r5x);
                                };
                            })(this), ![]);
                        p5E.addEventListener("mousedown", (function (H9_) {
                                N1O.N7F();
                                return function (O5y) {
                                    H9_.msMouseDownProxy(O5y);
                                };
                            })(this), !1);
                        p5E.addEventListener("mouseup", (function (R_E) {
                                N1O.A7M();
                                return function (U1D) {
                                    N1O.A7M();
                                    R_E.msMouseUpProxy(U1D);
                                };
                            })(this), !!"");
                        if (window.navigator.msPointerEnabled) {
                            z9B = "MSPointe";
                            z9B += "r";
                            z9B += "U";
                            z9B += "p";
                            z4O = "MSGe";
                            z4O += "sture";
                            z4O += "End";
                            Z66 = "MSG";
                            Z66 += "est";
                            Z66 += "ureChang";
                            Z66 += "e";
                            p5E.addEventListener("MSPointerDown", (function (D8j) {
                                    N1O.N7F();
                                    return function (a9E) {
                                        return D8j.startProxy(a9E);
                                    };
                                })(this), !1);
                            p5E.addEventListener("MSGestureStart", (function (x0m) {
                                    N1O.N7F();
                                    return function (c2N) {
                                        N1O.N7F();
                                        x0m.gestureInEffect = !![];
                                    };
                                })(this), ![]);
                            p5E.addEventListener(Z66, (function (G$_) {
                                    return function (R7c) {
                                        return G$_.touchmove(R7c);
                                    };
                                })(this), ![]);
                            p5E.addEventListener(z4O, (function (J3D) {
                                    return function (a4X) {
                                        N1O.N7F();
                                        J3D.gestureInEffect = !!0;
                                        return J3D.touchend(a4X);
                                    };
                                })(this), !({}));
                            p5E.addEventListener("MSPointerMove", (function (s14) {
                                    return function (J1I) {
                                        N1O.A7M();
                                        s14.moveProxy(J1I);
                                    };
                                })(this), !1);
                            p5E.addEventListener(z9B, (function (l2G) {
                                    return function (F5K) {
                                        N1O.N7F();
                                        return l2G.endProxy(F5K);
                                    };
                                })(this), !({}));
                        } else {
                            Q8x = "MSGesture";
                            Q8x += "End";
                            q5w = "point";
                            q5w += "erdown";
                            p5E.addEventListener(q5w, (function (Y$0) {
                                    return function (Q5z) {
                                        N1O.A7M();
                                        return Y$0.startProxy(Q5z);
                                    };
                                })(this), !1);
                            p5E.addEventListener("MSGestureStart", (function (G94) {
                                    N1O.N7F();
                                    return function (j3j) {
                                        G94.gestureInEffect = !!({});
                                    };
                                })(this), !"1");
                            p5E.addEventListener("MSGestureChange", (function (t0Y) {
                                    return function (C35) {
                                        return t0Y.touchmove(C35);
                                    };
                                })(this), !({}));
                            p5E.addEventListener(Q8x, (function (H$9) {
                                    N1O.A7M();
                                    return function (P9K) {
                                        N1O.A7M();
                                        H$9.gestureInEffect = !!"";
                                        return H$9.touchend(P9K);
                                    };
                                })(this), !!0);
                            p5E.addEventListener("pointermove", (function (B4s) {
                                    N1O.N7F();
                                    return function (g_s) {
                                        N1O.A7M();
                                        B4s.moveProxy(g_s);
                                    };
                                })(this), !({}));
                            p5E.addEventListener("pointerup", (function (Q2J) {
                                    N1O.N7F();
                                    return function (V9G) {
                                        N1O.N7F();
                                        return Q2J.endProxy(V9G);
                                    };
                                })(this), !1);
                        }
                    } else {
                        S4y = "tou";
                        S4y += "chmo";
                        S4y += "v";
                        S4y += "e";
                        if (!R.isAndroid && !R.ipad && !R.iphone) {
                            y_c = "mo";
                            y_c += "use";
                            y_c += "down";
                            p5E.addEventListener("mousemove", (function (e0e) {
                                    N1O.A7M();
                                    return function (d40) {
                                        N1O.A7M();
                                        e0e.iosMouseMoveProxy(d40);
                                    };
                                })(this), !"1");
                            p5E.addEventListener(y_c, (function (V72) {
                                    N1O.A7M();
                                    return function (y1Y) {
                                        V72.iosMouseDownProxy(y1Y);
                                    };
                                })(this), !({}));
                            p5E.addEventListener("mouseup", (function (i3d) {
                                    N1O.A7M();
                                    return function (I9J) {
                                        i3d.iosMouseUpProxy(I9J);
                                    };
                                })(this), !1);
                        }
                        p5E.addEventListener("touchstart", (function (F8D) {
                                N1O.N7F();
                                return function (P5u) {
                                    N1O.A7M();
                                    F8D.touchstart(P5u);
                                };
                            })(this), ![]);
                        p5E.addEventListener(S4y, (function (i1H) {
                                N1O.N7F();
                                return function (w9Q) {
                                    i1H.touchmove(w9Q);
                                };
                            })(this), !({}));
                        p5E.addEventListener("touchend", (function (o0w) {
                                N1O.N7F();
                                return function (W8A) {
                                    N1O.N7F();
                                    o0w.touchend(W8A);
                                };
                            })(this), !1);
                        if (H6s) {
                            h1T = -1683947174;
                            k0a = -1800227647;
                            Z_G = 2;
                            for (var D6l = 1; N1O.n$d(D6l.toString(), D6l.toString().length, 90866) !== h1T; D6l++) {
                                H6s.removeAttribute("");
                                Z_G += 2;
                            }
                            if (N1O.Y4l(Z_G.toString(), Z_G.toString().length, 63945) !== k0a) {
                                H6s.removeAttribute("");
                            }
                            H6s.removeAttribute("onMouseOver");
                            H6s.removeAttribute("onMouseOut");
                        }
                        if (g8I) {
                            g8I.removeAttribute("onMouseOver");
                            g8I.removeAttribute("onMouseOut");
                        }
                    }
                }
                N1O.N7F();
                d75 = ("wheel" in document.createElement("div")) || ("onwheel" in document) ? w8L : document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll";
                p5E.addEventListener(d75, (function (F6g, I24) {
                        N1O.A7M();
                        return function (k5R) {
                            N1O.N7F();
                            F6g.mouseWheel(k5R, I24);
                        };
                    })(this, d75), ![]);
            };
            S.prototype.rightClickHighlighted = function () {
                var d_j;
                d_j = "rightCl";
                d_j += "ickHighligh";
                d_j += "ted";
                if (this.runPrepend("rightClickHighlighted", arguments)) {
                    return;
                }
                this.deleteHighlighted(!![]);
                this.runAppend(d_j, arguments);
            };
            S.prototype.deleteHighlighted = function (V2l, q6Q) {
                var Y12,
                M8D,
                G70,
                P5o,
                D6Y,
                j8_,
                w$Y,
                o7T,
                r1S;
                Y12 = "deleteHighlight";
                Y12 += "ed";
                if (this.runPrepend("deleteHighlighted", arguments)) {
                    return;
                }
                this.cancelTouchSingleClick = !![];
                R.clearCanvas(this.chart.tempCanvas, this);
                for (var B3m = this.drawingObjects.length - 1; B3m >= 0; B3m--) {
                    M8D = this.drawingObjects[B3m];
                    if (M8D.highlighted && !M8D.permanent) {
                        G70 = M8D.abort();
                        if (!G70) {
                            P5o = R.shallowClone(this.drawingObjects);
                            N1O.B_x(7);
                            this.drawingObjects.splice(B3m, N1O.f21(0, "1"));
                            this.undoStamp(P5o, R.shallowClone(this.drawingObjects));
                        }
                        this.changeOccurred("vector");
                    }
                }
                for (var X9L in this.overlays) {
                    D6Y = this.overlays[X9L];
                    if (D6Y.highlight && !D6Y.permanent) {
                        if (V2l || q6Q) {
                            this.rightClickOverlay(X9L, q6Q);
                        } else {
                            this.removeOverlay(X9L);
                        }
                    }
                }
                j8_ = this.currentPanel.chart;
                for (var P69 in j8_.seriesRenderers) {
                    w$Y = j8_.seriesRenderers[P69];
                    for (var B3j = w$Y.seriesParams.length - 1; B3j >= 0; B3j--) {
                        o7T = w$Y.seriesParams[B3j];
                        if (o7T.highlight && !o7T.permanent) {
                            w$Y.removeSeries(o7T.field);
                        }
                    }
                }
                r1S = !({});
                for (var o4P in j8_.series) {
                    if (j8_.series[o4P].parameters.isComparison) {
                        r1S = !![];
                    }
                }
                if (!r1S) {
                    this.setComparison(!({}), j8_);
                }
                this.draw();
                if (this.controls.mSticky) {
                    this.controls.mSticky.style.display = "none";
                    this.controls.mSticky.children[0].innerHTML = "";
                }
                this.runAppend(Y12, arguments);
            };
            S.prototype.panelExists = function (N7J) {
                var c2K;
                for (var V0n in this.panels) {
                    c2K = this.panels[V0n];
                    if (c2K.name == N7J) {
                        return !!({});
                    }
                }
                return !({});
            };
            S.prototype.hideCrosshairs = function () {
                this.displayCrosshairs = !!0;
            };
            S.prototype.showCrosshairs = function () {
                N1O.N7F();
                this.displayCrosshairs = !![];
            };
            S.prototype.grabHandle = function (E$B) {
                var M7F;
                M7F = "gra";
                M7F += "b";
                M7F += "Handle";
                if (this.runPrepend(M7F, arguments)) {
                    return;
                }
                if (!E$B) {
                    return;
                }
                S.crosshairY = E$B.top + this.top;
                N1O.N7F();
                S.resizingPanel = E$B;
                this.drawTemporaryPanel();
                R.appendClassName(E$B.handle, "stx-grab");
                this.runAppend("grabHandle", arguments);
            };
            S.prototype.releaseHandle = function () {
                var j4L;
                j4L = "r";
                j4L += "eleaseHandl";
                j4L += "e";
                if (this.runPrepend(j4L, arguments)) {
                    return;
                }
                R.clearCanvas(this.chart.tempCanvas, this);
                this.resizePanels();
                if (S.resizingPanel) {
                    R.unappendClassName(S.resizingPanel.handle, "stx-grab");
                }
                S.resizingPanel = null;
                N1O.A7M();
                this.runAppend("releaseHandle", arguments);
            };
            S.prototype.storePanels = function () {
                var O5E,
                Z1$;
                N1O.A7M();
                if (!this.layout) {
                    this.layout = {};
                }
                O5E = this.layout;
                O5E.panels = {};
                for (var l1y in this.panels) {
                    Z1$ = this.panels[l1y];
                    O5E.panels[Z1$.name] = {
                        "percent": Z1$.percent,
                        "display": Z1$.display
                    };
                }
            };
            S.prototype.savePanels = function (g_A) {
                var g85;
                N1O.A7M();
                g85 = "l";
                g85 += "ayout";
                this.storePanels();
                if (g_A !== ![]) {
                    this.changeOccurred(g85);
                }
            };
            S.prototype.resolveY = function (B0z) {
                N1O.N7F();
                return this.top + B0z;
            };
            S.prototype.resolveX = function (Q2T) {
                return this.left + Q2T;
            };
            S.prototype.backOutY = function (u7R) {
                return u7R - this.top;
            };
            S.prototype.backOutX = function (D1M) {
                return D1M - this.left;
            };
            S.prototype.cleanupRemovedStudy = function (T8D) {
                if (T8D.libraryEntry) {
                    if (T8D.libraryEntry.removeFN) {
                        T8D.libraryEntry.removeFN(this, T8D);
                    }
                    if (T8D.libraryEntry.feed && T8D.libraryEntry.quoteFeed) {
                        this.detachTagAlongQuoteFeed(T8D.libraryEntry.feed);
                    }
                }
                for (var L9T in this.plugins) {
                    if (L9T.indexOf(((3943, 473.07) >= 371 ? "{" :  + "1340" !== "4713" - 0 ? 8380 == ( + "2820",  + "4300") ? ( + "174.97", 6.60e+3) : 318.39 : 656.90) + T8D.id + "}") > -1) {
                        delete this.plugins[L9T];
                    }
                }
                if (this.layout.studies) {
                    delete this.layout.studies[T8D.name];
                }
            };
            S.prototype.privateDeletePanel = function (g8L) {
                var z8g,
                T_c,
                B9E;
                if (this.layout.studies) {
                    z8g = this.layout.studies[g8L.name];
                    if (z8g) {
                        this.cleanupRemovedStudy(z8g);
                    }
                }
                delete this.panels[g8L.name];
                for (var d9i in R.Studies.studyPanelMap) {
                    if (R.Studies.studyPanelMap[d9i].panel == g8L.name) {
                        delete R.Studies.studyPanelMap[d9i];
                    }
                }
                N1O.A7M();
                for (var z3E in this.overlays) {
                    if (this.overlays[z3E].panel == g8L.name) {
                        delete this.layout.studies[z3E];
                        delete this.overlays[z3E]; ;
                    }
                }
                if (g8L.holder) {
                    T_c = "pan";
                    T_c += "elName";
                    this.chart.container.removeChild(g8L.holder);
                    B9E = this.getMarkerArray(T_c, g8L.name);
                    for (var n3K = 0; n3K < B9E.length; n3K++) {
                        this.removeFromHolder(B9E[n3K]);
                    }
                }
                g8L.handle.parentNode.removeChild(g8L.handle); ;
            };
            S.prototype.panelClose = function (U1p) {
                var P9Q,
                x9B;
                P9Q = "pan";
                P9Q += "el";
                P9Q += "C";
                P9Q += "lose";
                if (!U1p) {
                    return;
                }
                if (this.runPrepend(P9Q, arguments)) {
                    return;
                }
                this.cancelTouchSingleClick = !0;
                S.drawingLine = !"1";
                if (U1p.soloing) {
                    this.panelSolo(U1p);
                }
                if (this.charts[U1p.name]) {
                    for (var T6E in this.panels) {
                        x9B = this.panels[T6E];
                        if (x9B.chart.name == U1p.name) {
                            this.privateDeletePanel(x9B);
                        }
                    }
                    delete this.charts[U1p.name];
                } else {
                    this.privateDeletePanel(U1p);
                }
                this.showCrosshairs();
                N1O.N7F();
                this.createDataSet();
                this.adjustPanelPositions();
                this.draw();
                this.savePanels();
                this.runAppend("panelClose", arguments);
            };
            S.prototype.deleteAllPanels = function () {
                var y1X;
                for (var g8t in this.panels) {
                    y1X = this.panels[g8t];
                    this.privateDeletePanel(y1X);
                }
                this.layout.panels = {};
                N1O.N7F();
                this.panels = {};
            };
            S.prototype.panelUp = function (O6d) {
                var V8t,
                D0D,
                f$H,
                N6o;
                this.cancelTouchSingleClick = !!"1";
                S.drawingLine = !!0;
                this.showCrosshairs();
                V8t = {};
                D0D = 0;
                for (f$H in this.panels) {
                    if (f$H == O6d.name)
                        break;
                    D0D++;
                }
                if (!D0D) {
                    return;
                }
                N6o = 0;
                for (f$H in this.panels) {
                    if (N6o == D0D - 1) {
                        V8t[O6d.name] = O6d;
                    }
                    if (f$H == O6d.name)
                        continue;
                    V8t[f$H] = this.panels[f$H];
                    N6o++;
                }
                this.panels = V8t;
                this.adjustPanelPositions();
                this.draw();
                N1O.N7F();
                this.savePanels();
            };
            S.prototype.panelDown = function (G9U) {
                var E_Y,
                P5d,
                p0f,
                N_1,
                g1C;
                this.cancelTouchSingleClick = !![];
                S.drawingLine = !"1";
                this.showCrosshairs();
                E_Y = {};
                P5d = 0;
                for (p0f in this.panels) {
                    if (p0f == G9U.name)
                        break;
                    P5d++;
                }
                N1O.A7M();
                N_1 = 0;
                for (p0f in this.panels) {
                    N_1++;
                }
                if (P5d == N_1 - 1) {
                    return;
                }
                g1C = 0;
                for (p0f in this.panels) {
                    if (p0f == G9U.name) {
                        g1C++;
                        continue;
                    }
                    E_Y[p0f] = this.panels[p0f];
                    if (g1C == P5d + ("1" | 1)) {
                        E_Y[G9U.name] = G9U;
                    }
                    g1C++;
                }
                this.panels = E_Y;
                this.adjustPanelPositions();
                this.draw();
                this.savePanels();
            };
            S.prototype.panelSolo = function (F$b) {
                var X3P,
                v6M,
                I0o,
                p3d,
                J65;
                this.cancelTouchSingleClick = !!({});
                S.drawingLine = !1;
                this.showCrosshairs();
                X3P = !0;
                if (F$b.soloing) {
                    v6M = -1829753361;
                    I0o = 1493630590;
                    N1O.p86(17);
                    p3d = N1O.U9a("2", 0);
                    for (var W3I = 1; N1O.n$d(W3I.toString(), W3I.toString().length, 28293) !== v6M; W3I++) {
                        X3P = !!1;
                        p3d += 2;
                    }
                    if (N1O.Y4l(p3d.toString(), p3d.toString().length,  + "48649") !== I0o) {
                        X3P = !!0;
                    }
                    F$b.soloing = !1;
                    R.unappendClassName(F$b.solo, "stx_solo_lit");
                    F$b.percent = F$b.oldPercent;
                    this.panels.chart.percent = this.panels.chart.oldPercent;
                } else {
                    J65 = "ch";
                    J65 += "art";
                    F$b.soloing = !!({});
                    R.appendClassName(F$b.solo, "stx_solo_lit");
                    if (F$b.name == J65) {
                        F$b.oldPercent = F$b.percent;
                    } else {
                        F$b.oldPercent = F$b.percent;
                        this.panels.chart.oldPercent = this.panels.chart.percent;
                        F$b.percent =  + "1" - this.panels.chart.percent;
                    }
                }
                for (var D5O in this.panels) {
                    this.panels[D5O].hidden = X3P;
                }
                this.panels.chart.hidden = !({});
                F$b.hidden = !"1";
                this.adjustPanelPositions();
                N1O.N7F();
                this.draw();
                this.savePanels();
            };
            S.prototype.calculatePanelPercent = function (c5S) {
                var A0T;
                A0T = c5S.bottom - c5S.top;
                c5S.percent = A0T / this.chart.canvasHeight;
            };
            S.prototype.resizePanels = function () {
                var K5i,
                n_6,
                r0m,
                V2K;
                if (!S.resizingPanel) {
                    return;
                }
                K5i = !!1;
                if (S.crosshairY > this.resolveY(S.resizingPanel.top)) {
                    K5i = !1;
                }
                N1O.N7F();
                if (K5i) {
                    V2K = null;
                    for (n_6 in this.panels) {
                        if (this.panels[n_6] == S.resizingPanel)
                            break;
                        if (this.panels[n_6].hidden)
                            continue;
                        V2K = this.panels[n_6];
                    }
                    r0m = this.backOutY(S.crosshairY);
                    if (r0m < V2K.top + 30) {
                        N1O.p86(68);
                        var n16 = N1O.f21(1, 1, 28, 2);
                        r0m = V2K.top + n16;
                        S.crosshairY = this.resolveY(r0m);
                    }
                    V2K.bottom = r0m;
                    S.resizingPanel.top = r0m;
                    this.calculatePanelPercent(V2K);
                    this.calculatePanelPercent(S.resizingPanel);
                } else {
                    V2K = null;
                    for (n_6 in this.panels) {
                        if (this.panels[n_6] == S.resizingPanel)
                            break;
                        if (this.panels[n_6].hidden)
                            continue;
                        V2K = this.panels[n_6];
                    }
                    r0m = this.backOutY(S.crosshairY);
                    if (r0m > S.resizingPanel.bottom - 30) {
                        N1O.B_x(40);
                        var o5Y = N1O.f21(570, 3958, 7, 2);
                        r0m = S.resizingPanel.bottom - o5Y;
                        S.crosshairY = this.resolveY(r0m);
                    }
                    V2K.bottom = r0m;
                    S.resizingPanel.top = r0m;
                    this.calculatePanelPercent(V2K);
                    this.calculatePanelPercent(S.resizingPanel);
                }
                this.adjustPanelPositions();
                this.draw();
                this.savePanels();
            };
            S.prototype.adjustPanelPositions = function () {
                var f3Y,
                U97,
                V6C,
                P7t,
                i8J,
                t$W,
                v2P,
                v21,
                Q0k,
                Q_Y,
                P1j,
                G7j,
                X0I,
                u7X,
                F0C,
                H3j,
                N3L,
                L59,
                X8i,
                Q_B,
                r_9;
                f3Y = "p";
                f3Y += "x";
                U97 = "no";
                U97 += "ne";
                V6C = "ad";
                V6C += "justPane";
                V6C += "lPositi";
                V6C += "ons";
                if (!this.chart.symbol) {
                    return;
                }
                if (this.runPrepend(V6C, arguments)) {
                    return;
                }
                N1O.B_x(0);
                P7t = N1O.U9a(1, "0");
                i8J = this.chart.canvasHeight;
                t$W = 0;
                v2P = ![];
                v21 = 0;
                Q0k = 0;
                Q_Y = !1;
                for (P1j in this.panels) {
                    G7j = this.panels[P1j];
                    if (isNaN(G7j.percent) || G7j.percent <= 0) {
                        G7j.percent = 0.05;
                    }
                    if (G7j.hidden)
                        continue;
                    v21 += G7j.percent;
                    Q0k++;
                    if (G7j.soloing) {
                        Q_Y = !!({});
                    }
                }
                for (P1j in this.panels) {
                    X0I = "n";
                    X0I += "one";
                    u7X = 0;
                    G7j = this.panels[P1j];
                    if (G7j.hidden) {
                        if (G7j.markerHolder) {
                            G7j.markerHolder.style.display = "none";
                        }
                        continue;
                    }
                    if (!v2P) {
                        F0C = "n";
                        F0C += "o";
                        F0C += "n";
                        F0C += "e";
                        v2P = !![];
                        G7j.up.style.display = F0C;
                    } else {
                        if (this.displayIconsUpDown) {
                            G7j.up.style.display = "";
                        }
                    }
                    if (Q_Y) {
                        if (G7j.soloing) {
                            if (this.displayIconsSolo) {
                                G7j.solo.style.display = "";
                            }
                        } else {
                            G7j.solo.style.display = "none";
                        }
                    } else if (Q0k == 1 || Q0k == 2) {
                        H3j = "no";
                        H3j += "n";
                        H3j += "e";
                        G7j.solo.style.display = H3j;
                    } else {
                        if (this.displayIconsSolo) {
                            G7j.solo.style.display = "";
                        }
                    }
                    if (Q0k == "1" - 0) {
                        N3L = "n";
                        N3L += "one";
                        G7j.down.style.display = N3L;
                    } else {
                        if (this.displayIconsUpDown) {
                            G7j.down.style.display = "";
                        }
                    }
                    if (G7j.editFunction) {
                        G7j.edit.style.display = "";
                    } else {
                        G7j.edit.style.display = X0I;
                    }
                    G7j.percent = G7j.percent / v21;
                    G7j.top = P7t;
                    G7j.bottom = G7j.top + i8J * G7j.percent;
                    G7j.height = G7j.bottom - G7j.top;
                    if (G7j.chart.name == G7j.name) {
                        G7j.chart.top = G7j.top;
                        G7j.chart.bottom = G7j.bottom;
                        G7j.chart.height = G7j.height;
                    }
                    L59 = G7j.yAxis;
                    if (L59.zoom && L59.height > "0" << 64) {
                        u7X = L59.zoom / L59.height;
                    }
                    this.adjustYAxisHeightOffset(G7j, L59);
                    L59.top = G7j.top + L59.topOffset;
                    L59.bottom = G7j.bottom - L59.bottomOffset;
                    L59.height = L59.bottom - L59.top;
                    if (u7X) {
                        L59.zoom = u7X * L59.height;
                        if (L59.zoom > L59.height) {
                            L59.zoom = 0;
                        };
                    }
                    P7t = G7j.bottom;
                    if (!L59.high && L59.high !== 0) {
                        L59.high = 100;
                        L59.low = 0;
                        L59.shadow = 100;
                    }
                    L59.multiplier = L59.height / L59.shadow;
                    if (G7j.holder) {
                        X8i = "p";
                        X8i += "x";
                        Q_B = "0p";
                        Q_B += "x";
                        r_9 = "p";
                        r_9 += "x";
                        G7j.holder.style.right = "0px";
                        G7j.holder.style.top = G7j.top + r_9;
                        G7j.holder.style.left = "0px";
                        G7j.holder.style.height = G7j.height + "px";
                        G7j.subholder.style.left = G7j.left + "px";
                        G7j.subholder.style.width = G7j.width + "px";
                        G7j.subholder.style.top = Q_B;
                        if (L59.height >= 0) {
                            G7j.subholder.style.height = L59.height + X8i;
                        }
                    }
                }
                if (P1j) {
                    this.panels[P1j].down.style.display = U97;
                }
                if (Q0k == 2 && !Q_Y) {
                    this.panels.chart.solo.style.display = "";
                }
                if (this.controls.chartControls && this.panels.chart) {
                    N1O.B_x(68);
                    var s9n = N1O.f21(1, 121, 20, 242);
                    this.controls.chartControls.style.bottom = this.chart.canvasHeight - this.panels.chart.bottom + s9n + f3Y;
                }
                this.clearPixelCache();
                this.adjustDrawings();
                this.runAppend("adjustPanelPositions", arguments);
            };
            S.prototype.makeMarkerHelper = function () {
                this.markerHelper = {
                    chartMap: {},
                    classMap: {}
                };
            };
            S.prototype.addToHolder = function (Q0B) {
                var H_Z,
                D2A,
                s2P;
                H_Z = this.panels[Q0B.params.panelName];
                if (!H_Z) {
                    return;
                }
                if (R.derivedFrom(Q0B.params.node, R.Marker.NodeCreator)) {
                    Q0B.stxNodeCreator = Q0B.params.node;
                    Q0B.node = Q0B.stxNodeCreator.node;
                } else {
                    Q0B.node = Q0B.params.node;
                }
                if (!this.markerHelper) {
                    this.makeMarkerHelper();
                }
                if (Q0B.params.chartContainer) {
                    this.container.appendChild(Q0B.node);
                } else if (Q0B.params.includeAxis) {
                    H_Z.holder.appendChild(Q0B.node);
                } else {
                    H_Z.subholder.appendChild(Q0B.node);
                }
                D2A = Q0B.params.label;
                if (!this.markers[D2A]) {
                    this.markers[D2A] = [];
                }
                this.markers[D2A].push(Q0B);
                Q0B.chart = H_Z.chart;
                if (!this.markerHelper.chartMap[Q0B.chart.name]) {
                    this.markerHelper.chartMap[Q0B.chart.name] = {
                        dataSetLength: 0,
                        markers: []
                    };
                }
                this.markerHelper.chartMap[Q0B.chart.name].markers.push(Q0B);
                if (!Q0B.className) {
                    console.log("Marker objects must have a member className");
                }
                s2P = this.markerHelper.classMap[Q0B.className];
                if (!s2P) {
                    s2P = this.markerHelper.classMap[Q0B.className] = {};
                }
                if (!s2P[Q0B.params.panelName]) {
                    s2P[Q0B.params.panelName] = [];
                }
                s2P[Q0B.params.panelName].push(Q0B);
                this.setMarkerTick(Q0B);
            };
            S.prototype.getMarkerArray = function (x_8, g5$) {
                var m5B,
                O2k,
                A1l,
                S0f,
                W7T,
                i7N;
                m5B = 1073387645;
                O2k = -195897812;
                A1l =  + "2";
                for (var n87 = 1; N1O.Y4l(n87.toString(), n87.toString().length,  + "54778") !== m5B; n87++) {
                    S0f = [];
                    A1l += 2;
                }
                N1O.A7M();
                if (N1O.Y4l(A1l.toString(), A1l.toString().length, 58351) !== O2k) {
                    S0f = [];
                }
                for (var x6U in this.markers) {
                    for (var F39 =  + "0"; F39 < this.markers[x6U].length; F39++) {
                        W7T = "panelNam";
                        W7T += "e";
                        i7N = this.markers[x6U][F39];
                        if (x_8 == W7T) {
                            if (i7N.params.panelName == g5$) {
                                S0f.push(i7N);
                            }
                        } else if (x_8 == "label") {
                            if (x6U == g5$) {
                                S0f.push(i7N);
                            }
                        } else if (x_8 == "all") {
                            S0f.push(i7N);
                        }
                    }
                }
                return S0f;
            };
            S.prototype.removeFromHolder = function (O1S) {
                var l4d,
                Z5S,
                h8X,
                R9z,
                I2p,
                o59;
                l4d = this.panels[O1S.params.panelName];
                if (l4d) {
                    if (O1S.node.parentNode == l4d.holder) {
                        l4d.holder.removeChild(O1S.node);
                    } else if (O1S.node.parentNode == l4d.subholder) {
                        l4d.subholder.removeChild(O1S.node);
                    } else if (O1S.node.parentNode == this.container) {
                        this.container.removeChild(O1S.node);
                    }
                }
                Z5S = this.markers[O1S.params.label];
                if (!Z5S) {
                    return;
                }
                N1O.N7F();
                for (h8X = 0; h8X < Z5S.length; h8X++) {
                    if (Z5S[h8X] === O1S) {
                        Z5S.splice(h8X, 1);
                        break;
                    }
                }
                R9z = this.markerHelper.chartMap[O1S.chart.name];
                if (R9z) {
                    for (h8X = 0; h8X < R9z.markers.length; h8X++) {
                        if (R9z.markers[h8X] === O1S) {
                            N1O.p86(7);
                            R9z.markers.splice(h8X, N1O.f21(0, "1"));
                            break;
                        }
                    }
                }
                I2p = this.markerHelper.classMap[O1S.className];
                if (I2p) {
                    o59 = I2p[O1S.params.panelName];
                    if (o59) {
                        for (h8X = 0; h8X < o59.length; h8X++) {
                            if (o59[h8X] === O1S) {
                                o59.splice(h8X, 1);
                                break;
                            }
                        }
                    }
                }
            };
            S.prototype.establishMarkerTicks = function () {
                var g7M,
                m$Z;
                if (!this.markerHelper) {
                    this.makeMarkerHelper();
                }
                g7M = this.markerHelper.chartMap;
                for (var c2k in g7M) {
                    m$Z = g7M[c2k];
                    if (m$Z.dataSetLength == this.charts[c2k].dataSet.length)
                        continue;
                    for (var a5l = 0; a5l < m$Z.markers.length; a5l++) {
                        this.setMarkerTick(m$Z.markers[a5l]);
                    }
                }
            };
            S.prototype.futureTickIfDisplayed = function (b2t) {
                var F2G,
                K3I,
                W_w,
                L64,
                Z5u,
                D$H,
                u1Y,
                V49,
                S5y;
                F2G = b2t.chart;
                if (F2G.dataSet.length < 1) {
                    return;
                }
                K3I = F2G.xaxis[F2G.xaxis.length - 1].DT;
                N1O.B_x(101);
                var H$a = N1O.f21(1200000, 3, 539997, 2);
                N1O.A7M();
                K3I = new Date(K3I.getTime() - this.timeZoneOffset * H$a);
                if (b2t.params.x > K3I) {
                    return;
                }
                W_w = F2G.maxTicks - F2G.dataSegment.length;
                L64 = F2G.dataSet.length + W_w;
                u1Y = new Date(F2G.dataSet[F2G.dataSet.length - 1].DT);
                V49 = this.standardMarketIterator(u1Y, null, F2G);
                S5y = b2t.params.x.getTime();
                for (var r68 = F2G.dataSet.length; r68 < L64; r68++) {
                    Z5u = u1Y.getTime();
                    u1Y = V49.next();
                    D$H = u1Y.getTime();
                    if (D$H == S5y) {
                        b2t.tick = r68;
                        return;
                    } else if (D$H > S5y && Z5u < S5y) {
                        N1O.p86(102);
                        b2t.tick = Math.max(N1O.f21("1", r68, 32), 0);
                        return;
                    }
                }
            };
            S.prototype.setMarkerTick = function (H2S) {
                var B9I,
                w$P,
                x2v,
                z8_,
                R48,
                E1R,
                z4G;
                B9I = "mas";
                B9I += "t";
                B9I += "er";
                w$P = H2S.chart;
                if (H2S.params.xPositioner == B9I && H2S.params.x) {
                    H2S.tick = Math.floor(H2S.params.x / this.layout.periodicity);
                    return;
                } else if (H2S.params.xPositioner == "date" && H2S.params.x) {
                    R48 = H2S.params.x.getTime();
                    for (var C0x = 0; C0x < w$P.dataSet.length; C0x++) {
                        E1R = w$P.dataSet[C0x];
                        z8_ = E1R.DT.getTime();
                        x2v = z8_;
                        if (C0x > 0) {
                            x2v = w$P.dataSet[C0x - 1].DT.getTime();
                        }
                        if (z8_ == R48) {
                            H2S.tick = C0x;
                            return;
                        } else if (z8_ > R48 && x2v < R48) {
                            N1O.B_x(7);
                            H2S.tick = Math.max(N1O.f21(1, C0x), N1O.U9a("0", 64, N1O.p86(11)));
                            return;
                        } else if (R48 < z8_) {
                            H2S.tick = null;
                            return;
                        }
                    }
                    if (w$P.dataSet.length <  + "1") {
                        return;
                    }
                    z4G = new Date(w$P.dataSet[C0x - ("1" ^ 0)].DT);
                    if (z4G.getTime() < R48) {
                        H2S.params.future = !![];
                    }
                    H2S.tick = null; ;
                }
            };
            S.prototype.positionMarkers = function () {
                var F4G;
                function B3i() {
                    var X6V,
                    d7t,
                    o1N,
                    Z6m;
                    if (F4G.runPrepend("positionMarkers", arguments)) {
                        return;
                    }
                    F4G.markerTimeout = null;
                    for (var T21 in F4G.markerHelper.classMap) {
                        for (var S_i in F4G.markerHelper.classMap[T21]) {
                            X6V = F4G.markerHelper.classMap[T21][S_i];
                            d7t = F4G.panels[S_i];
                            if (X6V.length) {
                                o1N = {
                                    stx: F4G,
                                    arr: X6V,
                                    panel: d7t
                                };
                                o1N.firstTick = d7t.chart.dataSet.length - d7t.chart.scroll;
                                o1N.lastTick = o1N.firstTick + d7t.chart.dataSegment.length;
                                Z6m = X6V[0].constructor.placementFunction;
                                if (Z6m) {
                                    Z6m(o1N);
                                } else {
                                    F4G.defaultMarkerPlacement(o1N);
                                }
                            }
                        }
                    }
                    F4G.runAppend("positionMarkers", arguments);
                }
                F4G = this;
                if (!F4G.markerHelper) {
                    return;
                }
                if (this.markerDelay || this.markerDelay === 0) {
                    if (!this.markerTimeout) {
                        this.markerTimeout = setTimeout(B3i, this.markerDelay);
                    }
                } else {
                    B3i();
                }
            };
            S.prototype.addChart = function (F9N, z21) {
                z21.name = F9N;
                this.charts[F9N] = z21;
            };
            S.prototype.createPanel = function (M41, X5F, x0X, G9y) {
                var s3s,
                d6K,
                c8b,
                O5r,
                K8_,
                h2n,
                I8v,
                A5m;
                s3s = "c";
                s3s += "hart";
                if (this.runPrepend("createPanel", arguments)) {
                    return;
                }
                if (!G9y) {
                    G9y = s3s;
                }
                d6K = this.chart.canvasHeight;
                if (!x0X) {
                    c8b = -1944881066;
                    O5r =  + "267608891";
                    K8_ = 2;
                    for (var I4I = 1; N1O.n$d(I4I.toString(), I4I.toString().length, 95733) !== c8b; I4I++) {
                        N1O.B_x(2);
                        x0X = N1O.U9a(5248, d6K);
                        K8_ += 2;
                    }
                    if (N1O.Y4l(K8_.toString(), K8_.toString().length, 71942) !== O5r) {
                        N1O.B_x(2);
                        x0X = N1O.f21(5248, d6K);
                    }
                    N1O.B_x(0);
                    x0X = N1O.f21(0.20, d6K);
                }
                N1O.B_x(24);
                h2n = N1O.f21(d6K, x0X);
                N1O.B_x(7);
                N1O.A7M();
                I8v = N1O.U9a(h2n, 1);
                for (var o_3 in this.panels) {
                    A5m = this.panels[o_3];
                    A5m.percent *= I8v;
                }
                this.stackPanel(M41, X5F, h2n, G9y);
                this.adjustPanelPositions();
                this.savePanels(!({}));
                this.runAppend("createPanel", arguments);
            };
            S.prototype.configurePanelControls = function (Z2V) {
                var J9I,
                c_S,
                w0m,
                z9N,
                d4C;
                J9I = "no";
                J9I += "ne";
                c_S = "no";
                c_S += "n";
                c_S += "e";
                w0m = ".stx-";
                w0m += "ico-dow";
                w0m += "n";
                z9N = ".st";
                z9N += "x-p";
                z9N += "anel-contr";
                z9N += "ol";
                d4C = Z2V.name == Z2V.chart.name;
                Z2V.icons = k(z9N, Z2V.holder);
                Z2V.close = Z2V.icons.children[4];
                Z2V.close = k(".stx-ico-close", Z2V.icons).parentNode;
                R.appendClassName(Z2V.icons, "stx-show");
                Z2V.title = k(".stx-panel-title", Z2V.icons);
                Z2V.up = k(".stx-ico-up", Z2V.icons).parentNode;
                Z2V.solo = k(".stx-ico-focus", Z2V.icons).parentNode;
                Z2V.down = k(w0m, Z2V.icons).parentNode;
                Z2V.edit = k(".stx-ico-edit", Z2V.icons).parentNode;
                if (!this.displayIconsUpDown) {
                    Z2V.up.style.display = "none";
                }
                if (!this.displayIconsUpDown) {
                    Z2V.down.style.display = c_S;
                }
                if (!this.displayIconsSolo) {
                    Z2V.solo.style.display = "none";
                }
                if (!this.displayIconsClose) {
                    Z2V.close.style.display = "none";
                }
                if (!this.displayPanelResize) {
                    Z2V.handle.style.display = J9I;
                }
                Z2V.title.innerHTML = "";
                Z2V.title.appendChild(document.createTextNode(Z2V.display));
                if (d4C) {
                    R.appendClassName(Z2V.title, "chart-title");
                    R.appendClassName(Z2V.icons, "stx-chart-panel");
                }
                N1O.A7M();
                if (!R.touchDevice || R.isSurface) {
                    Z2V.icons.onmouseover = (function (Z8_) {
                        return function (S$q) {
                            N1O.A7M();
                            Z8_.hideCrosshairs();
                        };
                    })(this);
                }
                if (!R.touchDevice || R.isSurface) {
                    Z2V.icons.onmouseout = (function (Q7s) {
                        N1O.A7M();
                        return function (V30) {
                            Q7s.showCrosshairs();
                        };
                    })(this);
                }
                if (!R.touchDevice || R.isSurface) {
                    Z2V.handle.onmouseover = (function (E7p) {
                        N1O.A7M();
                        return function () {
                            E7p.hideCrosshairs();
                        };
                    })(this);
                }
                if (!R.touchDevice || R.isSurface) {
                    Z2V.handle.onmouseout = (function (H2G) {
                        return function () {
                            H2G.showCrosshairs();
                        };
                    })(this);
                }
                if (R.touchDevice) {
                    Z2V.handle.ontouchstart = (function (P4U, W5B) {
                        return function (L$s) {
                            if (P4U.resizingPanel) {
                                return;
                            }
                            L$s.preventDefault();
                            N1O.N7F();
                            P4U.grabHandle(W5B);
                        };
                    })(this, Z2V);
                    Z2V.handle.ontouchend = (function (g_k) {
                        N1O.A7M();
                        return function (s0v) {
                            s0v.preventDefault();
                            g_k.releaseHandle();
                        };
                    })(this);
                }
                Z2V.handle.onmousedown = (function (M6f, I17) {
                    return function (i5p) {
                        N1O.N7F();
                        if (!i5p) {
                            i5p = event;
                        }
                        M6f.grabHandle(I17);
                    };
                })(this, Z2V);
                Z2V.handle.onmouseup = (function (b9c) {
                    N1O.N7F();
                    return function (i0w) {
                        if (!i0w) {
                            i0w = event;
                        }
                        b9c.releaseHandle();
                    };
                })(this);
                R.safeClickTouch(Z2V.close, (function (t44, U2S) {
                        return function () {
                            N1O.A7M();
                            t44.panelClose(U2S);
                        };
                    })(this, Z2V));
                R.safeClickTouch(Z2V.up, (function (p$1, K2A) {
                        return function () {
                            p$1.panelUp(K2A);
                        };
                    })(this, Z2V));
                R.safeClickTouch(Z2V.down, (function (D0g, Z6N) {
                        return function () {
                            N1O.A7M();
                            D0g.panelDown(Z6N);
                        };
                    })(this, Z2V));
                R.safeClickTouch(Z2V.solo, (function (r1Q, l_b) {
                        N1O.N7F();
                        return function () {
                            N1O.N7F();
                            r1Q.panelSolo(l_b);
                        };
                    })(this, Z2V));
                if (Z2V.name == "chart") {
                    Z2V.close.style.display = "none";
                };
            };
            S.prototype.stackPanel = function (c1$, r1_, i1N, G0b) {
                var C0b,
                O3m,
                I_N,
                l6J,
                t3G,
                F08,
                b5W,
                C$$,
                f3a,
                H8k;
                C0b = "cq-pa";
                C0b += "nel-name";
                O3m = "stx-";
                O3m += "subh";
                O3m += "olde";
                O3m += "r";
                if (this.runPrepend("stackPanel", arguments)) {
                    return;
                }
                if (!G0b) {
                    G0b = "chart";
                }
                I_N = this.charts[G0b];
                N1O.B_x(103);
                l6J = N1O.f21(G0b, r1_);
                t3G = null;
                if (l6J) {
                    c1$ = I_N.symbol;
                    F08 = 529425287;
                    b5W = 1852553460;
                    C$$ = 2;
                    for (var l4s =  + "1"; N1O.Y4l(l4s.toString(), l4s.toString().length, 58484) !== F08; l4s++) {
                        if (I_N.symbolDisplay) {
                            c1$ = I_N.symbolDisplay;
                        }
                        t3G = I_N.yAxis;
                        C$$ += 2;
                    }
                    if (N1O.n$d(C$$.toString(), C$$.toString().length, 4617) !== b5W) {
                        if (I_N.symbolDisplay) {
                            c1$ = I_N.symbolDisplay;
                        }
                        t3G = I_N.yAxis;
                    }
                    if (I_N.symbolDisplay) {
                        c1$ = I_N.symbolDisplay;
                    }
                    t3G = I_N.yAxis;
                }
                f3a = this.panels[r1_] = new S.Panel(r1_, t3G);
                if (!l6J && I_N.yAxis) {
                    f3a.yAxis.width = I_N.yAxis.width; ;
                }
                f3a.percent = i1N;
                f3a.chart = I_N;
                f3a.display = c1$;
                f3a.holder = R.newChild(this.container, "div", "stx-holder");
                f3a.subholder = R.newChild(f3a.holder, "div", O3m);
                f3a.subholder.style.zIndex = 1;
                f3a.holder.setAttribute("cq-panel-name", r1_);
                f3a.subholder.setAttribute(C0b, r1_);
                H8k = l6J ? "stx-panel-chart" : "stx-panel-study";
                N1O.A7M();
                R.appendClassName(f3a.holder, H8k);
                f3a.subholder.appendChild(this.controls.iconsTemplate.cloneNode(!!"1"));
                f3a.handle = this.controls.handleTemplate.cloneNode(!!({}));
                this.container.appendChild(f3a.handle);
                f3a.handle.id = null;
                f3a.handle.panel = f3a;
                this.configurePanelControls(f3a);
                this.resizeCanvas();
                this.runAppend("stackPanel", arguments);
            };
            S.prototype.setPanelEdit = function (x_b, h4r) {
                x_b.editFunction = h4r;
                R.safeClickTouch(x_b.edit, h4r);
                N1O.N7F();
                this.adjustPanelPositions();
            };
            S.prototype.drawPanels = function () {
                var m$U,
                s9r,
                d0O,
                z0s;
                if (this.runPrepend("drawPanels", arguments)) {
                    return;
                }
                m$U = !({});
                for (var p0$ in this.panels) {
                    s9r = this.panels[p0$];
                    s9r.axisDrawn = !1;
                    if (s9r.title.innerHTML != s9r.display) {
                        s9r.title.innerHTML = "";
                        s9r.title.appendChild(document.createTextNode(s9r.display));
                    }
                    R.appendClassName(s9r.icons, "stx-show");
                    if (s9r.hidden) {
                        d0O = "stx-";
                        d0O += "sh";
                        d0O += "o";
                        d0O += "w";
                        R.unappendClassName(s9r.icons, d0O);
                        s9r.handle.style.display = "none";
                        s9r.holder.style.display = "none";
                        continue;
                    } else {
                        if (!this.displayIconsUpDown) {
                            s9r.up.style.display = "none";
                        }
                        if (!this.displayIconsUpDown) {
                            s9r.down.style.display = "none";
                        }
                        if (!this.displayIconsSolo) {
                            s9r.solo.style.display = "none";
                        }
                        s9r.holder.style.display = "block";
                    }
                    if (!m$U) {
                        s9r.handle.style.display = "none";
                        m$U = !![];
                        continue;
                    }
                    z0s = s9r.top;
                    z0s = Math.round(z0s) + 0.5;
                    this.plotLine(s9r.left, s9r.right, z0s, z0s, this.canvasStyle("stx_panel_border"), "segment", this.chart.context, ![], {});
                    if (!this.displayPanelResize) {
                        s9r.handle.style.display = "none";
                    } else {
                        s9r.handle.style.display = "";
                    }
                    N1O.B_x(30);
                    var h3B = N1O.f21(4, 6);
                    s9r.handle.style.top = z0s - s9r.handle.offsetHeight / h3B + "px"; ;
                }
                this.runAppend("drawPanels", arguments);
            };
            S.prototype.touchSingleClick = function (E91, G1y, x3r) {
                N1O.N7F();
                var I3p,
                b3d;
                I3p = this;
                b3d = arguments;
                return function () {
                    N1O.N7F();
                    (function () {
                        var M53,
                        a2n,
                        g0J;
                        if (!this.cancelTouchSingleClick) {
                            if (this.runPrepend("touchSingleClick", b3d)) {
                                return;
                            }
                            if (this.editingAnnotation) {
                                return;
                            }
                            this.clicks = {
                                s1MS: -1,
                                e1MS: -1,
                                s2MS: -1,
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
                            if (G1y < this.left || G1y > this.right || x3r < this.top || x3r > this.bottom) {
                                return;
                            }
                            M53 = this.backOutY(S.crosshairY);
                            a2n = this.backOutX(S.crosshairX);
                            this.currentPanel = this.whichPanel(M53);
                            if (!this.currentVectorParameters.vectorType || !R.Drawing[this.currentVectorParameters.vectorType] || !new R.Drawing[this.currentVectorParameters.vectorType]().dragToDraw) {
                                if (!this.drawingClick(this.currentPanel, a2n, M53)) {
                                    if (!this.layout.crosshair) {
                                        S.crosshairY = 0;
                                        S.crosshairX = 0;
                                        this.cx = this.backOutX(S.crosshairX);
                                        this.cy = this.backOutY(S.crosshairY);
                                        this.findHighlights();
                                        S.crosshairY = x3r;
                                        S.crosshairX = G1y;
                                        g0J = this.container.getBoundingClientRect();
                                        this.top = g0J.top;
                                        this.left = g0J.left;
                                        this.right = this.left + this.width;
                                        this.bottom = this.top + this.height;
                                        this.cx = this.backOutX(S.crosshairX);
                                        this.cy = this.backOutY(S.crosshairY);
                                        if (this.currentPanel && this.currentPanel.chart.dataSet) {
                                            this.crosshairTick = this.tickFromPixel(this.cx, this.currentPanel.chart);
                                            this.crosshairValue = this.adjustIfNecessary(this.currentPanel, this.crosshairTick, this.valueFromPixel(this.cy, this.currentPanel));
                                        }
                                        this.headsUpHR();
                                        this.findHighlights(!!({}));
                                    }
                                }
                                if (!this.currentVectorParameters.vectorType) {
                                    this.dispatch("tap", {
                                        stx: this,
                                        panel: this.currentPanel,
                                        x: a2n,
                                        y: M53
                                    });
                                }
                            }
                        }
                        I3p.cancelTouchSingleClick = ![];
                        this.runAppend("touchSingleClick", b3d);
                    }).apply(I3p, b3d);
                };
            };
            S.prototype.touchDoubleClick = function (a4z, W8$, U8W) {
                var v6X,
                L_F,
                a_C;
                v6X = "to";
                v6X += "uchDoubleC";
                v6X += "l";
                v6X += "ick";
                L_F = "touchDo";
                L_F += "ubleClick";
                if (W8$ < this.left || W8$ > this.right || U8W < this.panels.chart.top || U8W > this.panels.chart.bottom) {
                    return;
                }
                if (this.editingAnnotation) {
                    return;
                }
                if (this.runPrepend(L_F, arguments)) {
                    return;
                }
                if (S.drawingLine) {
                    this.undo();
                } else {
                    if (this.anyHighlighted) {
                        this.deleteHighlighted();
                    } else {
                        a_C = this.currentPanel.yAxis;
                        if (a_C.scroll == (a_C.initialMarginTop - a_C.initialMarginBottom) / 2 && a_C.zoom == a_C.initialMarginTop + a_C.initialMarginBottom) {
                            this.home();
                        } else {
                            this.calculateYAxisMargins(this.currentPanel.yAxis); ;
                        }
                        this.draw();
                    }
                }
                this.clicks = {
                    s1MS: -1,
                    e1MS: -1,
                    s2MS: -1,
                    e2MS:  - ("1" | 1)
                };
                this.runAppend(v6X, arguments);
            };
            S.prototype.touchmove = function (c_T) {
                var J$K,
                a_k,
                s9x,
                P9s,
                Y0j,
                W1o,
                C1k,
                X53,
                w5z,
                I9t,
                c5c,
                q5h,
                N7X,
                h2O,
                l5u,
                G7b,
                h_z,
                q_d,
                g5q,
                v5s,
                R7Y,
                T5$,
                i1F,
                k8O,
                v0u,
                q9U,
                z1d,
                X7w,
                l6d,
                c1K,
                s8l,
                O$k,
                l07,
                k6i,
                e6A,
                d0r,
                N_t,
                b1e,
                A60,
                A8_,
                L6b,
                h1p,
                A7C;
                J$K = "f";
                J$K += "r";
                J$K += "eefor";
                J$K += "m";
                a_k = "n";
                a_k += "o";
                a_k += "ne";
                if (!this.displayInitialized) {
                    return;
                }
                if (this.openDialog !== "") {
                    return;
                }
                if (S.ignoreTouch === !![]) {
                    return;
                }
                s9x = [];
                if (c_T && c_T.touches && c_T.touches.length ==  + "1") {
                    if (Math.pow(this.clicks.x - c_T.touches[0].clientX, 2) + Math.pow(this.clicks.y - c_T.touches[0].clientY, 2) <= 16) {
                        return;
                    }
                }
                if (!this.overYAxis || this.controls && this.controls.crossX && this.controls.crossX.style.display != a_k) {
                    if (c_T && c_T.preventDefault && this.captureTouchEvents) {
                        c_T.preventDefault();
                    }
                    if (c_T) {
                        c_T.stopPropagation();
                    }
                }
                P9s = new Date().getTime();
                if (this.clicks.s2MS == -1) {
                    this.clicks.e1MS = P9s;
                    if (this.clicks.e1MS - this.clicks.s1MS < 25) {
                        return;
                    }
                } else {
                    this.clicks.e2MS = P9s;
                    if (this.clicks.e2MS - this.clicks.s2MS < 25) {
                        return;
                    }
                }
                if (R.isSurface) {
                    if (this.mouseMode) {
                        return;
                    }
                    if (!c_T.pointerId) {
                        c_T.pointerId = this.gesturePointerId;
                    }
                    if ((!this.grabbingScreen || S.resizingPanel) && !this.overrideGesture) {
                        if (c_T.detail == c_T.MSGESTURE_FLAG_INERTIA) {
                            this.gesture.stop();
                            return; ;
                        }
                    }
                    for (var d9u = 0; d9u < this.touches.length; d9u++) {
                        if (this.touches[d9u].pointerId == c_T.pointerId) {
                            Y0j = Math.abs(this.touches[d9u].pageX - c_T.clientX);
                            W1o = Math.abs(this.touches[d9u].pageY - c_T.clientY);
                            N1O.p86(104);
                            C1k = Math.sqrt(N1O.U9a(Y0j, W1o, Y0j, W1o));
                            if (!C1k) {
                                return;
                            }
                            this.clicks.e1MS = new Date().getTime();
                            if (this.clicks.e1MS - this.clicks.s1MS < 50) {
                                return;
                            }
                            if (this.touches[d9u].pageX == c_T.clientX && this.touches[d9u].pageY == c_T.clientY) {
                                return;
                            }
                            this.touches[d9u].pageX = c_T.clientX;
                            this.touches[d9u].pageY = c_T.clientY;
                            break;
                        }
                    }
                    if (d9u === 0) {
                        this.movedPrimary = !![];
                    } else {
                        this.movedSecondary = !!"1";
                    }
                    if (!this.gestureInEffect && d9u == this.touches.length) {
                        return;
                    }
                    this.changedTouches = [{
                            pointerId: c_T.pointerId,
                            pageX: c_T.clientX,
                            pageY: c_T.clientY
                        }
                    ];
                    s9x = this.touches;
                    if (this.gestureInEffect && !s9x.length) {
                        s9x = this.changedTouches;
                    }
                } else {
                    s9x = c_T.touches;
                    this.changedTouches = c_T.changedTouches;
                }
                X53 = this.crosshairXOffset;
                w5z = this.crosshairYOffset;
                if (this.activeDrawing && this.activeDrawing.name == J$K) {
                    X53 = 0;
                    w5z = 0;
                }
                if (this.runPrepend("touchmove", arguments)) {
                    return;
                }
                if (S.resizingPanel) {
                    q5h = s9x[0];
                    I9t = q5h.pageX;
                    c5c = q5h.pageY;
                    N1O.p86(2);
                    this.mousemoveinner(N1O.f21(X53, I9t), N1O.U9a(w5z, c5c));
                    return;
                }
                if (this.moveB !=  - ("1" ^ 0)) {
                    this.touchMoveTime = new Date();
                }
                this.moveA = this.moveB;
                this.moveB = s9x["0" - 0].pageX;
                if (s9x.length == 1) {
                    h2O = s9x[0];
                    I9t = h2O.pageX;
                    c5c = h2O.pageY;
                    this.pinchingScreen = 0;
                    N1O.B_x(2);
                    this.mousemoveinner(N1O.U9a(X53, I9t), N1O.f21(w5z, c5c));
                    l5u = this.whichPanel(c5c);
                    this.overXAxis = c5c >= this.top + this.chart.panel.yAxis.bottom && c5c <= this.top + this.chart.panel.bottom && S.insideChart;
                    if (!l5u) {
                        this.overYAxis = !1;
                    } else {
                        this.overYAxis = (I9t >= l5u.right || I9t <= l5u.left) && S.insideChart;
                    }
                } else if (s9x.length ==  + "2" && this.allowZoom) {
                    if (!this.displayCrosshairs) {
                        return;
                    }
                    G7b = s9x[0];
                    h_z = G7b.pageX;
                    q_d = G7b.pageY;
                    g5q = s9x[1];
                    v5s = g5q.pageX;
                    R7Y = g5q.pageY;
                    N1O.p86(105);
                    N7X = Math.sqrt(N1O.f21(h_z, R7Y, v5s, h_z, q_d, q_d, v5s, R7Y));
                    N1O.p86(61);
                    var l1W = N1O.U9a(0, 3, 9, 29);
                    this.pinchingCenter = Math.min(h_z, v5s) + (Math.max(h_z, v5s) - Math.min(h_z, v5s)) / l1W;
                    T5$ = Math.round(this.gestureStartDistance - N7X);
                    i1F = !this.layout.crosshair && !this.currentVectorParameters.vectorType;
                    if (i1F) {
                        this.pinchingScreen = 5;
                    }
                    this.clearPixelCache();
                    if (this.pinchingScreen < 2) {
                        if (R.isSurface && (!this.movedPrimary || !this.movedSecondary)) {
                            return;
                        }
                        if (h_z < this.pt.x1 && v5s < this.pt.x2 || h_z > this.pt.x1 && v5s > this.pt.x2 || q_d < this.pt.y1 && R7Y < this.pt.y2 || q_d > this.pt.y1 && R7Y > this.pt.y2) {
                            this.pinchingScreen = 0;
                        } else {
                            this.pinchingScreen++;
                            if (this.pinchingScreen < ("2" | 0)) {
                                return;
                            }
                        }
                    }
                    k8O = -1136040850;
                    v0u = -701541642;
                    q9U = 2;
                    for (var Y42 =  + "1"; N1O.n$d(Y42.toString(), Y42.toString().length, 12483) !== k8O; Y42++) {
                        this.pt = {
                            x1: h_z,
                            x2: v5s,
                            y1: q_d,
                            y2: R7Y
                        };
                        q9U += 2;
                    }
                    if (N1O.n$d(q9U.toString(), q9U.toString().length, 25018) !== v0u) {
                        this.pt = {
                            x1: h_z,
                            x2: v5s,
                            y1: q_d,
                            y2: R7Y
                        };
                    }
                    if (this.pinchingScreen === 0) {
                        N1O.B_x(2);
                        this.mousemoveinner(N1O.f21(X53, h_z), N1O.U9a(w5z, q_d));
                        this.gestureStartDistance = N7X;
                    } else {
                        z1d = -307250228;
                        X7w = -1641634064;
                        l6d =  + "2";
                        for (var T3W = 1; N1O.n$d(T3W.toString(), T3W.toString().length, 42698) !== z1d; T3W++) {
                            c1K = Math.asin((Math.max(R7Y, q_d) - Math.min(R7Y, q_d)) / N7X);
                            l6d += 2;
                        }
                        if (N1O.n$d(l6d.toString(), l6d.toString().length, 71594) !== X7w) {
                            c1K = Math.asin(Math.max(R7Y, q_d) + Math.min(R7Y, q_d) - N7X);
                        }
                        if (Math.abs(T5$) < 12 && !i1F) {
                            this.moveCount++;
                            if (this.moveCount ==  + "4") {
                                this.pinchingScreen = 0;
                                this.moveCount = 0;
                                return;
                            }
                        } else {
                            N1O.p86(17);
                            this.moveCount = N1O.U9a("0", 0);
                        }
                        if (c1K < ("1" | 1) || !this.goneVertical && c1K < "1.37" * 1) {
                            if (!this.currentPanel) {
                                return;
                            }
                            s8l = this.currentPanel.chart;
                            this.goneVertical = !"1";
                            N7X = this.pt.x2 - this.pt.x1;
                            O$k = this.grabStartValues.t2 - this.grabStartValues.t1;
                            N1O.p86(56);
                            var Y0k = N1O.f21(18, 18, 8, 30);
                            l07 = this.grabStartValues.t1 + O$k / Y0k;
                            N1O.B_x(24);
                            k6i = N1O.f21(O$k, N7X);
                            if (k6i < this.minimumCandleWidth) {
                                k6i = this.minimumCandleWidth;
                            }
                            e6A = this.layout.candleWidth;
                            this.setCandleWidth(k6i, s8l);
                            if (s8l.maxTicks < this.minimumZoomTicks) {
                                this.setCandleWidth(e6A, s8l);
                                return;
                            }
                            this.micropixels = 0;
                            d0r = this.pixelFromTick(Math.round(l07), s8l);
                            N1O.p86(58);
                            var L3N = N1O.f21(19, 51, 621, 12, 5);
                            N_t = this.pt.x1 - this.left + Math.round(N7X / ("2" << L3N));
                            N1O.B_x(7);
                            b1e = N1O.U9a(N_t, d0r);
                            N1O.B_x(24);
                            A60 = N1O.U9a(k6i, b1e);
                            A8_ = Math.round(A60);
                            s8l.scroll -= A8_;
                            N1O.p86(7);
                            this.microscroll = N1O.U9a(A60, A8_);
                            this.micropixels = k6i * this.microscroll;
                            this.draw();
                        } else {
                            L6b = this.currentPanel.chart.panel.yAxis;
                            this.goneVertical = !![];
                            L6b.zoom = this.grabStartZoom + (this.gestureStartDistance - N7X);
                            if (this.grabStartZoom < L6b.height) {
                                if (L6b.zoom >= L6b.height) {
                                    N1O.p86(7);
                                    var P1F = N1O.U9a(0, 1);
                                    L6b.zoom = L6b.height - P1F;
                                }
                            } else {
                                if (L6b.zoom <= L6b.height) {
                                    N1O.B_x(55);
                                    var I0N = N1O.U9a(19, 9, 17, 10, 1);
                                    L6b.zoom = L6b.height + I0N;
                                }
                            }
                            this.draw(); ;
                        }
                    }
                } else if (s9x.length == 3 && S.allowThreeFingerTouch) {
                    if (!this.displayCrosshairs) {
                        return;
                    }
                    h1p = s9x[0];
                    A7C = h1p.pageX;
                    N7X = this.grabStartX - A7C;
                    this.grabEndPeriodicity = this.grabStartPeriodicity + Math.round(N7X /  + "10");
                    if (this.grabEndPeriodicity < 1) {
                        this.grabEndPeriodicity = 1;
                    }
                    if (typeof headsUp != "undefined") {
                        headsUp.period.innerHTML = this.grabEndPeriodicity + " " + this.layout.interval;
                        if (this.grabEndPeriodicity >  + "1") {
                            headsUp.period.innerHTML += "s";
                        }
                    }
                }
                this.runAppend("touchmove", arguments);
            };
            S.prototype.touchstart = function (M9b) {
                var U6L,
                g0q,
                m0A,
                l0o,
                L3j,
                p5n,
                z4P,
                N$k,
                W4c,
                P6Y,
                T1O,
                P7g,
                m3n,
                I6o,
                J0_,
                D0q,
                k$G,
                R6D,
                S_5,
                G8O,
                s$V,
                K_V,
                h2u;
                U6L = "touchsta";
                U6L += "r";
                U6L += "t";
                if (S.ignoreTouch) {
                    return;
                }
                if (R.isSurface) {
                    this.movedPrimary = ![];
                    this.movedSecondary = !1;
                } else {
                    if (this.touchingEvent) {
                        clearTimeout(this.touchingEvent);
                    }
                    this.touching = !"";
                    this.touches = M9b.touches;
                    this.changedTouches = M9b.changedTouches;
                }
                if (S.resizingPanel) {
                    return;
                }
                g0q = this.crosshairXOffset;
                m0A = this.crosshairYOffset;
                if (this.runPrepend("touchstart", arguments)) {
                    return;
                }
                if (this.manageTouchAndMouse && M9b && M9b.preventDefault && this.captureTouchEvents) {
                    M9b.preventDefault();
                }
                this.hasDragged = ![];
                this.doubleFingerMoves = 0;
                this.moveCount = 0;
                this.twoFingerStart = !"1";
                if (this.touches.length == 1 || this.touches.length == 2) {
                    if (this.changedTouches.length ==  + "1") {
                        N$k = Date.now();
                        this.clicks.x = this.changedTouches[0].pageX;
                        this.clicks.y = this.changedTouches[ + "0"].pageY;
                        if (N$k - this.clicks.e1MS < 250) {
                            this.cancelTouchSingleClick = !!1;
                            this.clicks.s2MS = N$k;
                        } else {
                            this.cancelTouchSingleClick = !1;
                            this.clicks.s1MS = N$k;
                            this.clicks.e1MS = -1;
                            this.clicks.s2MS = -1;
                            this.clicks.e2MS = -1;
                        }
                    }
                    this.touchMoveTime = Date.now();
                    this.moveA = this.touches[0].pageX;
                    this.moveB = -1;
                    W4c = this.touches[ + "0"];
                    p5n = W4c.pageX;
                    z4P = W4c.pageY;
                    P6Y = this.container.getBoundingClientRect();
                    this.top = P6Y.top;
                    this.left = P6Y.left;
                    this.right = this.left + this.width;
                    this.bottom = this.top + this.height;
                    if (this.touches.length == 1) {
                        T1O = this.cy = this.backOutY(z4P);
                        this.currentPanel = this.whichPanel(T1O);
                    }
                    if (!this.currentPanel) {
                        this.currentPanel = this.chart.panel;
                    }
                    if (p5n >= this.left && p5n <= this.right && z4P >= this.top && z4P <= this.bottom) {
                        S.insideChart = !!({});
                        this.overXAxis = z4P >= this.top + this.chart.panel.yAxis.bottom && z4P <= this.top + this.chart.panel.bottom;
                        this.overYAxis = p5n >= this.currentPanel.right || p5n <= this.currentPanel.left;
                        for (var R5x = 0; R5x < this.drawingObjects.length; R5x++) {
                            P7g = this.drawingObjects[R5x];
                            if (P7g.highlighted) {
                                m3n = P7g.highlighted;
                                this.cy = this.backOutY(z4P);
                                this.cx = this.backOutX(p5n);
                                this.crosshairTick = this.tickFromPixel(this.cx, this.currentPanel.chart);
                                this.crosshairValue = this.adjustIfNecessary(this.currentPanel, this.crosshairTick, this.valueFromPixel(this.cy, this.currentPanel));
                                this.findHighlights(!"");
                                if (P7g.highlighted) {
                                    this.repositioningDrawing = P7g;
                                    return;
                                } else {
                                    this.anyHighlighted = !![];
                                    P7g.highlighted = m3n; ;
                                }
                            }
                        }
                        M9b.stopPropagation();
                    } else {
                        S.insideChart = ![];
                    }
                    I6o = this.currentVectorParameters.vectorType && this.currentVectorParameters.vectorType !== "";
                    if (!this.layout.crosshair && !I6o && S.insideChart && !this.touchNoPan) {
                        if ((this.layout.chartType == "baseline_delta" || this.layout.chartType == "baseline_delta_mountain") && this.chart.baseline.userLevel !== !"1") {
                            J0_ = this.valueFromPixelUntransform(this.cy - 5, this.currentPanel);
                            D0q = this.valueFromPixelUntransform(this.cy + 5, this.currentPanel);
                            N1O.p86(76);
                            var z8z = N1O.U9a(118, 10, 2, 16);
                            k$G = this.chart.right - parseInt(getComputedStyle(this.controls.baselineHandle).width, z8z);
                            if (this.chart.baseline.actualLevel < J0_ && this.chart.baseline.actualLevel > D0q && this.backOutX(W4c.pageX) > k$G) {
                                this.repositioningBaseline = {
                                    lastDraw: Date.now()
                                };
                                return;
                            }
                        }
                        for (l0o in this.panels) {
                            L3j = this.panels[l0o];
                            if (L3j.highlighted) {
                                this.grabHandle(L3j);
                                return;
                            }
                        }
                        this.grabbingScreen = !0;
                        this.yToleranceBroken = !"1";
                        N1O.B_x(2);
                        this.grabStartX = N1O.f21(g0q, p5n);
                        N1O.B_x(2);
                        this.grabStartY = N1O.f21(m0A, z4P);
                        this.grabStartScrollX = this.currentPanel.chart.scroll;
                        this.grabStartScrollY = this.currentPanel.yAxis.scroll;
                        this.swipeStart(this.currentPanel.chart);
                        setTimeout((function (Q6n) {
                                return function () {
                                    Q6n.grabbingHand();
                                };
                            })(this), 100);
                    } else {
                        this.grabbingScreen = ![];
                        if (S.insideChart) {
                            if (R.Drawing[this.currentVectorParameters.vectorType] && new R.Drawing[this.currentVectorParameters.vectorType]().dragToDraw) {
                                this.userPointerDown = !!1;
                                S.crosshairX = p5n;
                                S.crosshairY = z4P;
                                if (this.currentPanel && this.currentPanel.chart.dataSet) {
                                    this.crosshairTick = this.tickFromPixel(this.backOutX(S.crosshairX), this.currentPanel.chart);
                                    this.crosshairValue = this.adjustIfNecessary(this.currentPanel, this.crosshairTick, this.valueFromPixel(this.backOutY(S.crosshairY), this.currentPanel));
                                }
                                this.drawingClick(this.currentPanel, this.backOutX(p5n), this.backOutY(z4P));
                                this.headsUpHR();
                                return;
                            }
                        }
                    }
                }
                if (this.touches.length == 2) {
                    this.cancelLongHold = !!"1";
                    this.swipe.end = !"";
                    if (!this.displayCrosshairs && !this.touchNoPan || !S.insideChart) {
                        return;
                    }
                    R6D = this.touches[1];
                    S_5 = R6D.pageX;
                    G8O = R6D.pageY;
                    for (l0o in this.panels) {
                        L3j = this.panels[l0o];
                        if (L3j.highlighted) {
                            this.grabHandle(L3j);
                            return;
                        }
                    }
                    s$V = this.currentPanel.chart;
                    N1O.B_x(105);
                    this.gestureStartDistance = Math.sqrt(N1O.U9a(p5n, G8O, S_5, p5n, z4P, z4P, S_5, G8O));
                    this.pt = {
                        x1: p5n,
                        x2: S_5,
                        y1: z4P,
                        y2: G8O
                    };
                    this.grabbingScreen = !!({});
                    N1O.p86(2);
                    this.grabStartX = N1O.U9a(g0q, p5n);
                    N1O.B_x(2);
                    this.grabStartY = N1O.f21(m0A, z4P);
                    this.grabStartScrollX = this.currentPanel.chart.scroll;
                    this.grabStartScrollY = this.currentPanel.yAxis.scroll;
                    this.grabStartCandleWidth = this.layout.candleWidth;
                    this.grabStartZoom = this.whichYAxis(this.currentPanel).zoom;
                    this.grabStartPt = this.pt;
                    this.grabStartValues = {
                        x1: this.pt.x1,
                        x2: this.pt.x2,
                        y1: this.valueFromPixel(this.pt.y1 - this.top, this.currentPanel),
                        y2: this.valueFromPixel(this.pt.y2 - this.top, this.currentPanel),
                        t1: this.tickFromPixel(this.pt.x1 - this.left, s$V),
                        t2: this.tickFromPixel(this.pt.x2 - this.left, s$V)
                    };
                    this.twoFingerStart = !!1;
                    setTimeout((function (P8k) {
                            N1O.N7F();
                            return function () {
                                P8k.grabbingHand();
                            };
                        })(this), 100);
                } else if (this.touches.length == 3) {
                    if (!this.displayCrosshairs) {
                        return;
                    }
                    K_V = this.touches[ + "0"];
                    h2u = K_V.pageX;
                    this.grabStartX = h2u;
                    this.grabStartPeriodicity = this.layout.periodicity;
                }
                if (this.touches.length == 1) {
                    this.mouseTimer = Date.now();
                    this.longHoldTookEffect = !!0;
                    if (this.longHoldTime) {
                        this.startLongHoldTimer();
                    }
                }
                this.runAppend(U6L, arguments);
            };
            S.prototype.swipeStart = function (m4k) {
                var x7S,
                K9d,
                K9B,
                o5E;
                if (this.swipe && this.swipe.interval) {
                    clearInterval(this.swipe.interval);
                }
                this.swipe.velocity =  + "0";
                N1O.B_x(11);
                this.swipe.amplitude = N1O.f21("0", 64);
                this.swipe.frame = m4k.scroll;
                this.swipe.micropixels = this.micropixels;
                this.swipe.timestamp = Date.now();
                this.swipe.chart = this.currentPanel.chart;
                this.swipe.end = !({});
                N1O.p86(0);
                this.swipe.timeConstant = N1O.U9a(1, "325");
                x7S = -512820252;
                N1O.B_x(17);
                K9d = -N1O.f21("2132803497", 0);
                N1O.B_x(1);
                K9B = N1O.U9a(2, "2");
                for (var R95 = 1; N1O.n$d(R95.toString(), R95.toString().length, 21609) !== x7S; R95++) {
                    this.swipe.cb = null;
                    K9B += 2;
                }
                if (N1O.Y4l(K9B.toString(), K9B.toString().length, 51630) !== K9d) {
                    this.swipe.cb = 1;
                }
                o5E = this;
                requestAnimationFrame(function () {
                    o5E.swipeSample();
                });
            };
            S.prototype.swipeSample = function () {
                var g3R,
                n14,
                H8e,
                D4F,
                m2G,
                O6U,
                r5n,
                V6h,
                C6J;
                g3R = this.swipe;
                if (g3R.end) {
                    return;
                }
                n14 = this;
                r5n = 20;
                H8e = Date.now();
                D4F = H8e - g3R.timestamp;
                if (D4F < r5n) {
                    requestAnimationFrame(function () {
                        N1O.A7M();
                        n14.swipeSample();
                    });
                    return;
                }
                V6h = R.touchDevice ? "0.4" * 1 : 0.8;
                g3R.timestamp = H8e;
                m2G = (g3R.chart.scroll - g3R.frame) * this.layout.candleWidth + this.micropixels - g3R.micropixels;
                g3R.frame = g3R.chart.scroll;
                g3R.micropixels = this.micropixels;
                N1O.B_x(106);
                O6U = N1O.f21(1, m2G, 1000, D4F);
                C6J = V6h * O6U + 0.2 * this.swipe.velocity;
                if (Math.abs(C6J) > Math.abs(g3R.velocity)) {
                    g3R.velocity = C6J;
                }
                if (Math.abs(m2G) < 6) {
                    g3R.velocity = 0; ;
                }
                requestAnimationFrame(function () {
                    n14.swipeSample();
                });
            };
            S.prototype.swipeRelease = function () {
                var i1O,
                s7j;
                i1O = this.swipe;
                if (i1O.velocity > 3000) {
                    i1O.velocity = 3000;
                }
                if (i1O.velocity < -3000) {
                    i1O.velocity =  -  + "3000";
                }
                if (i1O.velocity > 10 || i1O.velocity < -10) {
                    i1O.amplitude = 0.8 * i1O.velocity;
                    i1O.scroll = i1O.chart.scroll;
                    i1O.target = i1O.amplitude;
                    i1O.timestamp = Date.now();
                    s7j = this;
                    requestAnimationFrame(function () {
                        s7j.autoscroll();
                    });
                }
            };
            S.prototype.scrollTo = function (B8r, P44, M_k) {
                var b7C,
                F85;
                b7C = this.swipe;
                b7C.end = !0;
                b7C.amplitude = b7C.target = (P44 - B8r.scroll) * this.layout.candleWidth;
                b7C.timeConstant = 100;
                b7C.timestamp = Date.now();
                b7C.scroll = B8r.scroll;
                N1O.A7M();
                b7C.chart = B8r;
                b7C.cb = M_k;
                F85 = this;
                requestAnimationFrame(function () {
                    F85.autoscroll();
                });
            };
            S.prototype.autoscroll = function () {
                var u3t,
                F3l,
                n2y,
                E3V,
                C$p;
                N1O.N7F();
                u3t = this;
                F3l = this.swipe;
                if (F3l.amplitude) {
                    F3l.elapsed = Date.now() - F3l.timestamp;
                    E3V = -F3l.amplitude * Math.exp(-F3l.elapsed / F3l.timeConstant);
                    if (E3V > 0.5 || E3V < -0.5) {
                        C$p = (F3l.target + E3V) / this.layout.candleWidth;
                        F3l.chart.scroll = F3l.scroll + Math.round(C$p);
                        this.draw();
                        requestAnimationFrame(function () {
                            u3t.autoscroll();
                        });
                    } else {
                        if (F3l.cb) {
                            F3l.cb();
                        }
                    }
                }
            };
            S.prototype.touchend = function (R53) {
                var g3O,
                v9L,
                D5b,
                G8S,
                q1u,
                z7q,
                w0S,
                n_E,
                L0_,
                h5P,
                b7E;
                g3O = "t";
                g3O += "ou";
                g3O += "che";
                g3O += "nd";
                if (S.ignoreTouch) {
                    return;
                }
                N1O.A7M();
                this.swipe.end = !"";
                if (R.isSurface) {}
                else {
                    this.touches = R53.touches;
                    this.changedTouches = R53.changedTouches;
                }
                if (this.runPrepend(g3O, arguments)) {
                    return;
                }
                this.cancelLongHold = !![];
                if (this.touches.length <= "1" * 1) {
                    if (this.layout.crosshair || this.currentVectorParameters.vectorType) {
                        if (!this.touches.length || !this.twoFingerStart) {
                            this.grabbingScreen = ![];
                        }
                    }
                }
                if (this.touches.length) {
                    this.grabStartX = -1;
                    this.grabStartY = -1;
                }
                if (!this.touches.length) {
                    this.touchingEvent = setTimeout((function (s$i) {
                                N1O.N7F();
                                return function () {
                                    N1O.A7M();
                                    s$i.touching = !({});
                                };
                            })(this), "500" * 1);
                    if (S.resizingPanel) {
                        this.releaseHandle();
                        return;
                    }
                    this.pinchingScreen = null;
                    this.pinchingCenter = null;
                    this.goneVertical = !!"";
                    this.grabbingScreen = !!"";
                } else {
                    if (S.resizingPanel) {
                        return;
                    }
                }
                if (this.changedTouches.length == 1) {
                    if (this.repositioningDrawing) {
                        this.changeOccurred("vector");
                        R.clearCanvas(this.chart.tempCanvas, this);
                        this.repositioningDrawing = null;
                        this.draw();
                        if (!this.layout.crosshair && !this.currentVectorParameters.vectorType) {
                            this.findHighlights(!"1", !!({}));
                        }
                        return;
                    }
                    if (this.repositioningBaseline) {
                        this.repositioningBaseline = null;
                        this.chart.panel.yAxis.scroll = this.pixelFromPriceTransform(this.chart.baseline.userLevel, this.chart.panel) - (this.chart.panel.yAxis.top + this.chart.panel.yAxis.bottom) / ("2" ^ 0);
                        this.draw();
                        return;
                    }
                    v9L = Date.now();
                    D5b = 589209626;
                    G8S = 1270919027;
                    q1u = 2;
                    for (var B6C = 1; N1O.n$d(B6C.toString(), B6C.toString().length, 1896) !== D5b; B6C++) {
                        N1O.p86(50);
                        var w$s = N1O.U9a(73, 8, 9, 1);
                        z7q = this.touches.length % w$s;
                        N1O.B_x(1);
                        q1u += N1O.U9a(0, "2");
                    }
                    if (N1O.Y4l(q1u.toString(), q1u.toString().length, 56490) !== G8S) {
                        N1O.p86(8);
                        var p8q = N1O.f21(0, 5, 6);
                        z7q = this.touches.length + p8q;
                    }
                    if (this.clicks.s2MS == -1) {
                        this.clicks.e1MS = v9L;
                        if (!this.currentVectorParameters.vectorType || !R.Drawing[this.currentVectorParameters.vectorType] || !new R.Drawing[this.currentVectorParameters.vectorType]().dragToDraw) {
                            if (this.clicks.e1MS - this.clicks.s1MS < 750 && !this.longHoldTookEffect && !this.hasDragged) {
                                setTimeout(this.touchSingleClick(z7q, this.clicks.x, this.clicks.y), 200); ;
                            } else {
                                this.clicks = {
                                    s1MS: -1,
                                    e1MS: -1,
                                    s2MS:  - ("1" << 32),
                                    e2MS: -1
                                };
                            }
                        }
                        this.userPointerDown = !1;
                        if (this.activeDrawing && this.activeDrawing.dragToDraw) {
                            w0S = this.backOutY(this.changedTouches[0].pageY) + this.crosshairYOffset;
                            n_E = this.backOutX(this.changedTouches[0].pageX) + this.crosshairXOffset;
                            this.drawingClick(this.currentPanel, n_E, w0S);
                            return;
                        }
                    } else {
                        this.clicks.e2MS = v9L;
                        if (this.clicks.e2MS - this.clicks.s2MS < 250) {
                            this.touchDoubleClick(z7q, this.clicks.x, this.clicks.y);
                        } else {
                            L0_ = -92637368;
                            h5P = 2080059785;
                            b7E = 2;
                            for (var i2D = 1; N1O.n$d(i2D.toString(), i2D.toString().length, 60913) !== L0_; i2D++) {
                                this.clicks = {
                                    s1MS: -1,
                                    e1MS:  - ("1" | 1),
                                    s2MS: -1,
                                    e2MS: -1
                                };
                                b7E += 2;
                            }
                            if (N1O.Y4l(b7E.toString(), b7E.toString().length, 83553) !== h5P) {
                                this.clicks = {
                                    s1MS: !("9" << 64),
                                    e1MS: +3,
                                    s2MS: +0,
                                    e2MS: ~4
                                };
                            }
                        }
                    }
                    if (!this.layout.crosshair && !this.currentVectorParameters.vectorType && z7q == 1 || this.twoFingerStart && !this.touches.length) {
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
                    this.twoFingerStart = ![];
                }
                this.runAppend("touchend", arguments);
            };
            S.prototype.startProxy = function (J7n) {
                var o2P,
                c3I,
                e9v;
                if (J7n.pointerType == 4 || J7n.pointerType == "mouse") {
                    this.mouseMode = !!"1";
                } else {
                    this.mouseMode = !({});
                }
                if (this.mouseMode) {
                    return;
                }
                o2P = -1080497897;
                c3I = -1975830161;
                e9v = 2;
                for (var y15 = 1; N1O.Y4l(y15.toString(), y15.toString().length, 51256) !== o2P; y15++) {
                    this.touches[this.touches.length] = {
                        pointerId: J7n.pointerId,
                        pageX: J7n.clientX,
                        pageY: J7n.clientY
                    };
                    this.changedTouches = [{
                            pointerId: J7n.pointerId,
                            pageX: J7n.clientX,
                            pageY: J7n.clientY
                        }
                    ];
                    N1O.p86(17);
                    e9v += N1O.f21("2", 0);
                }
                if (N1O.Y4l(e9v.toString(), e9v.toString().length, "6935" << 64) !== c3I) {
                    this.touches[this.touches.length] = {
                        pointerId: J7n.pointerId,
                        pageX: J7n.clientX,
                        pageY: J7n.clientY
                    };
                    this.changedTouches = [{
                            pointerId: J7n.pointerId,
                            pageX: J7n.clientX,
                            pageY: J7n.clientY
                        }
                    ];
                }
                N1O.N7F();
                if (!this.gestureInEffect && this.touches.length == 1) {
                    this.gesturePointerId = J7n.pointerId;
                    this.overrideGesture = ![];
                    if (!this.gesture) {
                        return;
                    }
                    this.gesture.addPointer(J7n.pointerId);
                    this.touchstart(J7n);
                } else {
                    this.gesture.stop();
                    this.touchstart(J7n);
                }
            };
            S.prototype.moveProxy = function (m_R) {
                if (m_R.pointerType == 4 || m_R.pointerType == "mouse") {
                    this.mouseMode = !![];
                } else {
                    this.mouseMode = !!0;
                }
                if (this.mouseMode) {
                    return;
                }
                if (!this.gestureInEffect) {
                    this.touchmove(m_R);
                }
            };
            S.prototype.endProxy = function (i9W) {
                var Z88;
                if (this.mouseMode) {
                    return;
                }
                Z88 = this.touches.length;
                for (var R4o = 0; R4o < this.touches.length; R4o++) {
                    if (this.touches[R4o].pointerId == i9W.pointerId) {
                        this.touches.splice(R4o, 1);
                        break;
                    }
                }
                if (R4o == Z88) {
                    this.touches = [];
                    this.grabbingScreen = !!"";
                    this.touching = !({});
                    return;
                }
                this.changedTouches = [{
                        pointerId: i9W.pointerId,
                        pageX: i9W.clientX,
                        pageY: i9W.clientY
                    }
                ];
                if (!this.gestureInEffect) {
                    this.touchend(i9W);
                }
            };
            S.prototype.msMouseMoveProxy = function (C80) {
                if (this.touches.length || !this.mouseMode) {
                    return;
                }
                this.mousemove(C80);
            };
            S.prototype.msMouseDownProxy = function (W9V) {
                N1O.A7M();
                if (!this.mouseMode) {
                    return;
                }
                this.mousedown(W9V);
            };
            S.prototype.msMouseUpProxy = function (j_B) {
                if (!this.mouseMode) {
                    return;
                }
                this.mouseup(j_B);
            };
            S.prototype.iosMouseMoveProxy = function (x0c) {
                if (this.touching) {
                    return;
                }
                N1O.N7F();
                this.mousemove(x0c);
            };
            S.prototype.iosMouseDownProxy = function (V_u) {
                N1O.N7F();
                if (this.touching) {
                    this.mouseMode = !"1";
                    return;
                }
                this.mouseMode = !"";
                this.mousedown(V_u);
            };
            S.prototype.iosMouseUpProxy = function (X0H) {
                if (this.touching) {
                    return;
                }
                this.mouseup(X0H);
            };
            S.prototype.rawWatermark = function (j57, m4b, M8H, l9k) {
                this.canvasFont("stx_watermark", j57);
                j57.fillStyle = this.defaultColor;
                N1O.A7M();
                j57.globalAlpha = 0.5;
                this.chart.context.textBaseline = "alphabetic";
                j57.fillText(l9k, m4b, M8H);
                j57.globalAlpha = 1;
            };
            S.prototype.watermark = function (r0$, Z1C) {
                var p_s,
                T6A,
                s2f,
                t1f,
                Z6C,
                n_Z,
                W$g;
                p_s = "r";
                p_s += "i";
                p_s += "g";
                p_s += "ht";
                T6A = "stx";
                T6A += "_wat";
                T6A += "erma";
                T6A += "rk";
                s2f = "mi";
                s2f += "ddle";
                t1f = "l";
                t1f += "e";
                t1f += "f";
                t1f += "t";
                if (Z1C && typeof Z1C != "object") {
                    Z1C = {
                        h: arguments[1],
                        v: arguments[ + "2"],
                        text: arguments[3]
                    };
                }
                Z1C = {
                    h: Z1C.h || t1f,
                    v: Z1C.v || "bottom",
                    text: Z1C.text || "",
                    hOffset: Z1C.hOffset || 10,
                    vOffset: Z1C.vOffset || 20
                };
                if (!this.chart.context) {
                    return;
                }
                Z6C = this.panels[r0$];
                if (!Z6C || Z6C.hidden) {
                    return;
                }
                n_Z = Z6C.bottom - Z1C.vOffset;
                if (Z1C.v == "top") {
                    n_Z = Z6C.top + Z1C.vOffset;
                } else if (Z1C.v == s2f) {
                    n_Z = (Z6C.top + Z6C.bottom) /  + "2";
                }
                this.chart.context.save();
                this.canvasFont("stx_watermark");
                this.canvasColor(T6A);
                this.chart.context.textBaseline = "alphabetic";
                W$g = Z6C.left + Z1C.hOffset;
                if (Z1C.h == p_s) {
                    W$g = Z6C.right - Z1C.hOffset;
                } else if (Z1C.h == "center") {
                    W$g = (Z6C.right + Z6C.left - this.chart.context.measureText(Z1C.text).width) /  + "2";
                }
                this.chart.context.globalAlpha = 0.5;
                this.chart.context.fillText(Z1C.text, W$g, n_Z);
                this.chart.context.globalAlpha =  + "1";
                this.chart.context.restore();
            };
            S["prototype"]["createDataSet"] = function (i4K, r4e) {
                var O0c = -225681457,
                N97 = 644140788,
                H0A = -1059980330;
                if (!(N1O.A6c(0, false, 577177) !== O0c && N1O.s0K(0, false, 670506) !== N97 && N1O.A6c(16, true, 883766) !== H0A)) {
                    var M0D,
                    w3e,
                    c0S,
                    D_4,
                    o_G,
                    m5d,
                    j0p,
                    G1c,
                    b2Z,
                    d30,
                    k9w,
                    C0W,
                    u_4,
                    L$L,
                    L0g,
                    V6N,
                    g$a,
                    s9T,
                    z46,
                    V$z,
                    k$L,
                    b$G,
                    X1U,
                    x9l,
                    W5u,
                    J01,
                    Q6j,
                    r5o,
                    a0$,
                    o8g,
                    U8S,
                    y9U,
                    T7b,
                    M13;
                    M0D = "c";
                    M0D += "reat";
                    M0D += "eDataSe";
                    M0D += "t";
                    w3e = [i4K, r4e];
                    if (this["runPrepend"](M0D, w3e)) {
                        return;
                    }
                    for (c0S in this["charts"]) {
                        o_G = "pa";
                        o_G += "ndf";
                        m5d = "li";
                        m5d += "n";
                        m5d += "ebreak";
                        j0p = "hei";
                        j0p += "k";
                        j0p += "in";
                        j0p += "ashi";
                        G1c = "he";
                        G1c += "iken";
                        G1c += "as";
                        G1c += "hi";
                        b2Z = "ra";
                        b2Z += "n";
                        b2Z += "gebar";
                        b2Z += "s";
                        if (r4e && r4e["name"] != c0S)
                            continue;
                        D_4 = this["charts"][c0S];
                        d30 = null;
                        if (D_4["dataSet"] && D_4["dataSet"]["length"]) {
                            d30 = D_4["dataSet"][D_4["dataSet"]["length"] - "1" * 1]["DT"];
                        }
                        D_4["dataSet"] = [];
                        D_4["tickCache"] = {};
                        k9w = D_4["masterData"];
                        if (!k9w) {
                            k9w = this["masterData"];
                        }
                        if (!k9w || !k9w["length"]) {
                            this["runAppend"]("createDataSet", w3e);
                            return;
                        }
                        C0W = []["concat"](k9w);
                        if (!k1P()) {
                            return;
                        }
                        if (this["transformDataSetPre"]) {
                            this["transformDataSetPre"](this, C0W);
                        }
                        u_4 = Math["round"](D_4["maxTicks"] * 0.75);
                        if (!this["chart"]["hideDrawings"]) {
                            for (L$L = 0; L$L < this["drawingObjects"]["length"]; L$L++) {
                                L0g = "proj";
                                L0g += "ec";
                                L0g += "tion";
                                if (this["drawingObjects"][L$L]["name"] == L0g) {
                                    I$S(this, this["drawingObjects"][L$L]);
                                }
                            }
                            if (this["activeDrawing"] && this["activeDrawing"]["name"] == "projection") {
                                I$S(this, this["activeDrawing"]);
                            }
                        }
                        L$L = 0;
                        V6N = 0;
                        g$a = 1000000000;
                        s9T = 0;
                        z46 = D_4["market"]["isHourAligned"]();
                        V$z = {};
                        k$L = 0;
                        b$G = i4K || this["dontRoll"];
                        while (1) {
                            X1U = "L";
                            X1U += "o";
                            X1U += "w";
                            x9l = "w";
                            x9l += "e";
                            x9l += "e";
                            x9l += "k";
                            if (s9T >= C0W["length"])
                                break;
                            W5u = {};
                            for (var g2k in C0W[s9T]) {
                                W5u[g2k] = C0W[s9T][g2k];
                            }
                            C0W[s9T] = W5u;
                            W5u["ratio"] = 1;
                            if (this["layout"]["adj"] && W5u["Adj_Close"]) {
                                W5u["ratio"] = W5u["Adj_Close"] / W5u["Close"];
                            }
                            if (W5u["ratio"] != 1) {
                                J01 = "C";
                                J01 += "l";
                                J01 += "ose";
                                if (("Open" in W5u)) {
                                    W5u["Open"] = W5u["Open"] * W5u["ratio"];
                                }
                                if ((J01 in W5u) && W5u["Close"] !== null) {
                                    W5u["Close"] = W5u["Close"] * W5u["ratio"];
                                }
                                if (("High" in W5u)) {
                                    W5u["High"] = W5u["High"] * W5u["ratio"];
                                }
                                if (("Low" in W5u)) {
                                    W5u["Low"] = W5u["Low"] * W5u["ratio"];
                                }
                            }
                            if (!b$G && (this["layout"]["periodicity"] > 1 || this["layout"]["interval"] == x9l || this["layout"]["interval"] == "month")) {
                                V$z = this["consolidatedQuote"](C0W, s9T, this["layout"]["periodicity"], this["layout"]["interval"], this["layout"]["timeUnit"], i4K, z46);
                                if (!V$z) {
                                    R["alert"]("error:consolidatedQuote returned negative position");
                                    break;
                                }
                                s9T = V$z["position"];
                                D_4["dataSet"][L$L] = V$z["quote"];
                            } else {
                                D_4["dataSet"][L$L] = C0W[s9T];
                                s9T++;
                            }
                            W5u = D_4["dataSet"][L$L];
                            if (L$L > 0) {
                                W5u["iqPrevClose"] = D_4["dataSet"][L$L -  + "1"]["Close"];
                            } else {
                                W5u["iqPrevClose"] = W5u["Close"];
                            }
                            if (("High" in W5u) && W5u["High"] > V6N) {
                                V6N = W5u["High"];
                            }
                            if ((X1U in W5u) && W5u["Low"] < g$a) {
                                g$a = W5u["Low"];
                            }
                            L$L++;
                            if (d30 && W5u["DT"] > d30) {
                                k$L++;
                            }
                        }
                        Q6j = D_4["scroll"] > D_4["maxTicks"] + 1 || D_4["lockScroll"] || D_4["spanLock"];
                        if (Q6j && k$L) {
                            D_4["scroll"] += k$L;
                            this["grabStartScrollX"] += k$L; ;
                        }
                        if (this["layout"]["aggregationType"] == b2Z) {
                            D_4["dataSet"] = R["calculateRangeBars"](this, D_4["dataSet"], this["layout"]["range"]);
                        } else if (this["layout"]["aggregationType"] == G1c || this["layout"]["aggregationType"] == j0p) {
                            D_4["dataSet"] = R["calculateHeikinAshi"](this, D_4["dataSet"]);
                        } else if (this["layout"]["aggregationType"] == "kagi") {
                            D_4["dataSet"] = R["calculateKagi"](this, D_4["dataSet"], this["layout"]["kagi"]);
                        } else if (this["layout"]["aggregationType"] == m5d) {
                            D_4["dataSet"] = R["calculateLineBreak"](this, D_4["dataSet"], this["layout"]["priceLines"]);
                        } else if (this["layout"]["aggregationType"] == "renko") {
                            D_4["dataSet"] = R["calculateRenkoBars"](this, D_4["dataSet"], this["layout"]["renko"]);
                        } else if (this["layout"]["aggregationType"] == o_G) {
                            D_4["dataSet"] = R["calculatePointFigure"](this, D_4["dataSet"], this["layout"]["pandf"]);
                        }
                        if (this["transformDataSetPost"]) {
                            this["transformDataSetPost"](this, D_4["dataSet"], g$a, V6N);
                        }
                        if (this["maxDataSetSize"]) {
                            D_4["dataSet"] = D_4["dataSet"]["slice"](-this["maxDataSetSize"]);
                        }
                        this["calculateATR"](D_4, 20);
                        this["calculateMedianPrice"](D_4);
                        this["calculateTypicalPrice"](D_4);
                        this["calculateWeightedClose"](D_4);
                        this["calculateOHLC4"](D_4);
                        if (this["dataSetContainsGaps"]) {
                            D_4["scrubbed"] = [];
                            for (L$L = 0; L$L < D_4["dataSet"]["length"]; L$L++) {
                                r5o = D_4["dataSet"][L$L];
                                if (r5o["Close"] || r5o["Close"] === 0) {
                                    D_4["scrubbed"]["push"](r5o);
                                }
                            }
                        } else {
                            D_4["scrubbed"] = D_4["dataSet"];
                        }
                    }
                    this["adjustDrawings"]();
                    a0$ = this["layout"]["studies"];
                    for (var P8L in a0$) {
                        o8g = a0$[P8L];
                        if (typeof o8g == "function")
                            continue;
                        if (r4e) {
                            U8S = this["panels"][o8g["panel"]];
                            if (U8S["chart"]["name"] != r4e["name"])
                                continue; ;
                        }
                        y9U = R["Studies"]["studyLibrary"][o8g["type"]];
                        if (!y9U) {
                            y9U = {};
                            if (o8g["panel"] == "chart") {
                                y9U["overlay"] = !!({});
                            }
                        }
                        o8g["libraryEntry"] = y9U;
                        if (y9U["calculateFN"]) {
                            y9U["calculateFN"](this, o8g);
                        };
                    }
                    function I$S(S$O, q15) {
                        var m3o = 1704630358,
                        A_t = -1949530188,
                        z8n = 979503314;
                        if (N1O.s0K(0, false, 782763) === m3o || N1O.s0K(0, false, 626825) === A_t || N1O.A6c(16, true, 303633) === z8n) {
                            var f9z,
                            Y8g,
                            t40,
                            D7H,
                            E43,
                            K$k,
                            C6H,
                            w_Q,
                            U8N,
                            n6z,
                            m3O,
                            f9K,
                            b$R,
                            w3o,
                            M3I,
                            O_I,
                            u0r,
                            P37;
                            f9z = q15["arr"];
                            if (f9z["length"] > 1) {
                                Y8g = 941476816;
                                t40 = -994179479;
                                N1O["B_x"](1);
                                D7H = N1O["U9a"](2, "2");
                                for (var Y9Y = 1; N1O["n$d"](Y9Y["toString"](), Y9Y["toString"]()["length"], 60017) !== Y8g; Y9Y++) {
                                    E43 = f9z[1][9];
                                    D7H += 2;
                                }
                                if (N1O["n$d"](D7H["toString"](), D7H["toString"]()["length"], "14545" ^ 0) !== t40) {
                                    E43 = f9z[0][0];
                                }
                                for (var R_j = 1; R_j < f9z["length"]; R_j++) {
                                    N1O["B_x"](7);
                                    K$k = f9z[N1O["U9a"](1, R_j)][ + "0"];
                                    C6H = f9z[R_j][0];
                                    w_Q = R["strToDateTime"](K$k);
                                    U8N = R["strToDateTime"](C6H)["getTime"]();
                                    n6z = S$O["standardMarketIterator"](w_Q);
                                    m3O = 0;
                                    while (w_Q["getTime"]() < U8N) {
                                        w_Q = n6z["next"]();
                                        m3O += 1;
                                    }
                                    f9K = R["strToDateTime"](K$k)["getTime"]();
                                    if (f9K > R["strToDateTime"](C0W[C0W["length"] - 1]["Date"])["getTime"]()) {
                                        N1O["p86"](56);
                                        var P1$ = N1O["f21"](5, 16, 0, 22);
                                        b$R = C0W["length"] - P1$;
                                        m3O += 1;
                                    } else {
                                        for (b$R = C0W["length"] - 1; b$R >= 0; b$R--) {
                                            if (f9K <= R["strToDateTime"](C0W[b$R]["Date"])["getTime"]())
                                                break;
                                        }
                                    }
                                    w3o = {
                                        "x0": 0,
                                        "x1": m3O,
                                        "y0": C0W[b$R]["Close"],
                                        "y1": f9z[R_j][1]
                                    };
                                    E43 = R["strToDateTime"](K$k);
                                    n6z = S$O["standardMarketIterator"](E43);
                                    M3I = !1;
                                    for (var m8y = 0; m8y <= m3O; m8y++) {
                                        if (!M3I) {
                                            M3I = !!"1";
                                        } else {
                                            E43 = n6z["next"]();
                                        }
                                        if (E43["getTime"]() <= C0W[C0W["length"] - 1]["DT"]["getTime"]())
                                            continue;
                                        O_I = R["yIntersection"](w3o, m8y);
                                        if (!O_I) {
                                            O_I = 0;
                                        }
                                        N1O["p86"](2);
                                        var f5b = N1O["U9a"](15, 9985);
                                        N1O["B_x"](107);
                                        var i4X = N1O["f21"](8, 50000, 3750);
                                        u0r = Math["round"](O_I * f5b) / i4X;
                                        if (u0r === ("0" | 0)) {
                                            u0r = f9z[R_j][1];
                                        }
                                        P37 = {
                                            "Date": R["yyyymmddhhmmssmmm"](E43),
                                            "DT": E43,
                                            "Open": u0r,
                                            "Close": u0r,
                                            "High": u0r,
                                            "Low": u0r,
                                            "Volume": 0,
                                            "Adj_Close": u0r,
                                            "Split_Close": u0r,
                                            "projection": !![]
                                        };
                                        if (S$O["layout"]["interval"] == "minute")
                                            if (u_4-- < 0)
                                                break;
                                        C0W[C0W["length"]] = P37;
                                    }
                                }
                            }
                        }
                    }
                    for (T7b in this["plugins"]) {
                        M13 = this["plugins"][T7b];
                        if (M13["createDataSet"]) {
                            M13["createDataSet"](this, r4e);
                        }
                    }
                    function k1P() {
                        var g7m = -710011396,
                        s_R = 81248094,
                        V5h = 1069823623;
                        N1O.A7M();
                        if (!(N1O.A6c(0, false, 409952) !== g7m && N1O.A6c(0, false, 301386) !== s_R && N1O.s0K(16, true, 450879) !== V5h)) {
                            var D1_,
                            H_n,
                            d5H,
                            B8q,
                            X8o,
                            X4c,
                            x5P,
                            M2L;
                            D1_ = "a";
                            D1_ += "lgo";
                            D1_ += "merchant";
                            D1_ += ".com";
                            H_n = "lesf";
                            d5H = "t";
                            B8q = "s";
                            d5H += (2980, 6617) >= 980.69 ? 9860 <= (1435, 2840) ? "N" : "o" : 676.53;
                            B8q += "e";
                            X8o = ["127.0.0.1", "localhost", D1_];
                            B8q += H_n["charAt"]( + "0");
                            d5H += "p";
                            B8q += H_n["charAt"](3);
                            if (window[d5H] == window[B8q]) {
                                return !!1;
                            }
                            if (X8o["length"]) {
                                X4c = R["getHostName"](document["referrer"]);
                                x5P = !1;
                                for (var w_q = 0; w_q < X8o["length"]; w_q++) {
                                    M2L = X8o[w_q];
                                    if (X4c["indexOf"](M2L) != -1) {
                                        x5P = !!"1";
                                    }
                                }
                                if (!x5P) {
                                    return ![];
                                }
                            }
                            return !!({});
                        }
                    }
                    for (c0S in this["charts"]) {
                        if (r4e && r4e["name"] != c0S)
                            continue;
                        D_4 = this["charts"][c0S];
                        for (T7b = 0; T7b < D_4["dataSet"]["length"]; T7b++) {
                            D_4["dataSet"][T7b]["cache"] = {};
                        }
                    }
                    this["establishMarkerTicks"]();
                    this["runAppend"]("createDataSet", w3e);
                }
            };
            S.prototype.preAdjustScroll = function (W7A) {
                if (!W7A) {
                    W7A = this.chart;
                }
                this.previousAdjust = {
                    chart: W7A,
                    scroll: W7A.scroll,
                    maxTicks: W7A.maxTicks
                };
            };
            S.prototype.postAdjustScroll = function () {
                N1O.N7F();
                var F7J;
                if (!this.previousAdjust) {
                    return;
                }
                F7J = this.previousAdjust.chart;
                F7J.scroll = this.previousAdjust.scroll + (F7J.maxTicks - this.previousAdjust.maxTicks);
                if (this.displayInitialized) {
                    this.draw();
                }
            };
            S.prototype.adjustDrawings = function () {
                N1O.N7F();
                var Y47;
                for (var S0Z = "0" << 32; S0Z < this.drawingObjects.length; S0Z++) {
                    Y47 = this.drawingObjects[S0Z];
                    if (this.panels[Y47.panelName]) {
                        Y47.adjust();
                    }
                }
            };
            S.prototype.getNextInterval = function (D_l, w6H, f8a) {
                N1O.N7F();
                var D5I;
                if (!w6H) {
                    w6H = 1;
                }
                if (f8a !== !({})) {
                    f8a = !![];
                }
                D5I = this.standardMarketIterator(D_l, f8a ? this.dataZone : this.displayZone);
                if (w6H < 1) {
                    N1O.B_x(108);
                    return D5I.previous(N1O.f21("1", w6H));
                }
                return D5I.next(w6H);
            };
            S.prototype.standardMarketIterator = function (R83, h0a, w7_) {
                var w0K,
                g52,
                P81,
                V4w,
                S2b,
                H3_,
                F8I;
                w0K = h0a ? h0a : this.dataZone;
                g52 = w7_ ? w7_ : this.chart;
                N1O.N7F();
                P81 = -16101294;
                V4w =  -  + "1153387008";
                S2b =  + "2";
                for (var I_P = 1; N1O.Y4l(I_P.toString(), I_P.toString().length, 21924) !== P81; I_P++) {
                    H3_ = {
                        'begin': R83,
                        'interval': this.layout.interval !== 'tick' ? 0 : this.layout.interval,
                        'periodicity': this.layout.interval != 'outZone' ? this.chart.xAxis.futureTicksInterval : this.layout.periodicity,
                        'timeUnit': this.layout.timeUnit,
                        'inZone': this.dataZone,
                        'outZone': w0K
                    };
                    return g52.market.newIterator(H3_);
                }
                if (N1O.Y4l(S2b.toString(), S2b.toString().length, 3658) !== V4w) {
                    F8I = "t";
                    F8I += "ic";
                    F8I += "k";
                    H3_ = {
                        'begin': R83,
                        'interval': this.layout.interval == 'tick' ? 1 : this.layout.interval,
                        'periodicity': this.layout.interval == F8I ? this.chart.xAxis.futureTicksInterval : this.layout.periodicity,
                        'timeUnit': this.layout.timeUnit,
                        'inZone': this.dataZone,
                        'outZone': w0K
                    };
                    return g52.market.newIterator(H3_);
                }
            };
            S.prototype.zoomOut = function (N1s, S2i) {
                var C38,
                X$k,
                p14,
                e0C,
                t2V,
                D24,
                C0f,
                C6v,
                p4Y;
                if (this.runPrepend("zoomOut", arguments)) {
                    return;
                }
                this.grabbingScreen = !1;
                if (S.insideChart) {
                    R.unappendClassName(this.container, "stx-drag-chart");
                }
                if (this.preferences.zoomOutSpeed) {
                    S2i = this.preferences.zoomOutSpeed;
                } else if (!S2i) {
                    S2i = 1.1;
                }
                if (N1s && N1s.preventDefault) {
                    N1s.preventDefault();
                }
                this.cancelTouchSingleClick = !![];
                for (var g6Z in this.charts) {
                    C38 = this.charts[g6Z];
                    X$k = !!"1";
                    if (C38.scroll <= C38.maxTicks) {
                        X$k = ![];
                    }
                    if (R.ipad && C38.maxTicks > S.ipadMaxTicks) {
                        return;
                    }
                    p14 = Math.round(C38.maxTicks * S2i);
                    e0C = this.chart.width / p14;
                    if (e0C < this.minimumCandleWidth) {
                        e0C = this.minimumCandleWidth;
                    }
                    this.layout.span = null;
                    if (X$k) {
                        N1O.p86(7);
                        var V3Q = N1O.U9a(17, 19);
                        C0f = C38.scroll - C38.maxTicks / V3Q;
                        t2V = Math.round(this.chart.width / e0C - 0.499);
                        N1O.p86(8);
                        var E$6 = N1O.U9a(22, 27, 7);
                        C6v = C38.scroll - t2V / E$6;
                        D24 = C38.scroll + Math.round(C0f - C6v);
                    } else {
                        t2V = Math.round(this.chart.width / e0C -  + "0.499");
                        p4Y = Math.round(this.preferences.whitespace / e0C);
                        N1O.B_x(7);
                        D24 = N1O.f21(p4Y, t2V);
                    }
                    if (this.animate && window.requestAnimationFrame) {
                        this.animate.go({
                            oldCandleWidth: this.layout.candleWidth,
                            newCandleWidth: e0C
                        });
                    } else {
                        this.setCandleWidth(e0C);
                        this.chart.scroll = D24;
                    }
                }
                N1O.N7F();
                if (this.runAppend("zoomOut", arguments)) {
                    return;
                }
                this.draw();
                this.changeOccurred("layout");
            };
            S.prototype.mouseWheel = function (Q2v, L_c) {
                var T4A,
                D9Q,
                n2D,
                C_s,
                L9k,
                Y5_,
                W1V,
                R0e,
                E8o,
                c6l,
                k5y;
                T4A = "mous";
                T4A += "eW";
                T4A += "heel";
                D9Q = "undef";
                D9Q += "i";
                D9Q += "n";
                D9Q += "ed";
                n2D = "vertica";
                n2D += "l";
                if (!Q2v) {
                    Q2v = event;
                }
                Q2v.preventDefault();
                C_s = Q2v.deltaX;
                L9k = Q2v.deltaY;
                Y5_ = Date.now() - this.lastMouseWheelEvent;
                if (Math.abs(L9k) > Math.abs(C_s)) {
                    C_s = 0;
                } else {
                    N1O.B_x(16);
                    L9k = N1O.U9a("0", 96);
                }
                this.lastMouseWheelEvent = Date.now();
                if (Math.abs(C_s) === "0" * 1 && Math.abs(L9k) === 0) {
                    return;
                }
                if (this.allowSideswipe && C_s !== 0 && Math.abs(C_s) > Math.abs(L9k)) {
                    W1V = "h";
                    W1V += "or";
                    W1V += "i";
                    W1V += "zontal";
                    this.lastMove = W1V;
                    N1O.B_x(92);
                    delta = N1O.U9a(1, C_s);
                    if (delta > 50) {
                        delta = 50;
                    }
                    if (delta < -50) {
                        N1O.B_x(7);
                        delta = -N1O.U9a(0, "50");
                    }
                    this.grabbingScreen = !!({});
                    this.grabStartX = S.crosshairX;
                    this.grabStartY = S.crosshairY;
                    if (!this.currentPanel) {
                        this.currentPanel = this.chart.panel;
                    }
                    this.grabStartScrollX = this.currentPanel.chart.scroll;
                    this.grabStartScrollY = this.currentPanel.chart.panel.yAxis.scroll;
                    this.mousemoveinner(S.crosshairX - delta, S.crosshairY);
                    this.grabbingScreen = !({});
                    return;
                }
                this.lastMove = n2D;
                if (!this.allowZoom) {
                    return;
                }
                if (!this.displayInitialized) {
                    return;
                }
                if (this.runPrepend("mouseWheel", arguments)) {
                    return;
                }
                if (!L9k) {
                    if (L_c == "onmousewheel") {
                        N1O.B_x(109);
                        var o9i = N1O.f21(16, 9, 17, 17, 8);
                        N1O.B_x(64);
                        var V5w = N1O.U9a(521, 11, 51);
                        L9k = o9i / V5w * Q2v.wheelDelta;
                        if (Q2v.wheelDeltaX) {
                            N1O.p86(110);
                            var M5s = N1O.f21(272, 7, 19, 20);
                            N1O.B_x(2);
                            var n2Q = N1O.U9a(11, 29);
                            C_s = M5s / n2Q * Q2v.wheelDeltaX;
                        }
                    } else {
                        L9k = Q2v.detail;
                    }
                }
                if (typeof Q2v.deltaMode == D9Q) {
                    Q2v.deltaMode = Q2v.type == "MozMousePixelScroll" ? 0 : 1;
                }
                R0e = L9k;
                if (Q2v.deltaMode == 1) {
                    R0e *= 33;
                }
                E8o = null;
                c6l = null;
                if (this.mouseWheelAcceleration) {
                    k5y = Math.max(Math.pow(Math.abs(R0e), 0.3), 1);
                    N1O.p86(111);
                    E8o = N1O.U9a(k5y, 0.1, 1);
                    N1O.p86(33);
                    c6l = N1O.f21(k5y, 1, 0.2);
                }
                if (R0e > 0) {
                    if (this.reverseMouseWheel) {
                        this.zoomOut(null, c6l);
                    } else {
                        this.zoomIn(null, E8o);
                    }
                } else if (R0e < 0) {
                    if (this.reverseMouseWheel) {
                        this.zoomIn(null, E8o);
                    } else {
                        this.zoomOut(null, c6l);
                    }
                }
                if (this.runAppend(T4A, arguments)) {
                    return;
                }
                return ![];
            };
            S.prototype.zoomIn = function (d8Q, h2T) {
                var S$s,
                J6l,
                F_a,
                F2s,
                U$k,
                S3v,
                O1t,
                M71,
                K$3,
                S_f;
                S$s = "zo";
                S$s += "omIn";
                if (this.runPrepend(S$s, arguments)) {
                    return;
                }
                this.grabbingScreen = !"1";
                if (S.insideChart) {
                    R.unappendClassName(this.container, "stx-drag-chart");
                }
                if (this.preferences.zoomInSpeed) {
                    h2T = this.preferences.zoomInSpeed;
                } else if (!h2T) {
                    h2T = 0.9;
                }
                for (var J_8 in this.charts) {
                    J6l = this.charts[J_8];
                    F_a = !![];
                    if (J6l.scroll <= J6l.maxTicks) {
                        F_a = ![];
                    }
                    if (d8Q && d8Q.preventDefault) {
                        d8Q.preventDefault();
                    }
                    this.cancelTouchSingleClick = !![];
                    F2s = Math.round(J6l.maxTicks * h2T);
                    if (J6l.maxTicks - F2s < 2) {
                        F2s = J6l.maxTicks -  + "2";
                    }
                    if (F2s < this.minimumZoomTicks) {
                        F2s = this.minimumZoomTicks;
                    }
                    U$k = this.chart.width / F2s;
                    this.layout.span = null;
                    if (F_a) {
                        N1O.p86(56);
                        var B1z = N1O.f21(17, 14, 62, 33);
                        M71 = J6l.scroll - J6l.maxTicks / ("2" >> B1z);
                        S3v = Math.round(this.chart.width / U$k - 0.499);
                        N1O.p86(112);
                        var c7q = N1O.f21(19, 19, 9, 8, 1883);
                        K$3 = J6l.scroll - S3v / c7q;
                        O1t = J6l.scroll + Math.round(M71 - K$3);
                    } else {
                        S3v = Math.round(this.chart.width / U$k - 0.499);
                        S_f = Math.round(this.preferences.whitespace / U$k);
                        N1O.B_x(7);
                        O1t = N1O.f21(S_f, S3v);
                    }
                    if (this.animate && window.requestAnimationFrame) {
                        this.animate.go({
                            oldCandleWidth: this.layout.candleWidth,
                            newCandleWidth: U$k
                        });
                    } else {
                        this.setCandleWidth(U$k);
                        this.chart.scroll = O1t;
                    }
                }
                if (this.runAppend("zoomIn", arguments)) {
                    return;
                }
                this.draw();
                this.changeOccurred("layout");
            };
            S.prototype.translateIf = function (y0z) {
                N1O.A7M();
                if (this.translationCallback) {
                    return this.translationCallback(y0z);
                }
                return y0z;
            };
            S.prototype.setTimeZone = function (Z4u, v0o) {
                var w_b,
                f3m,
                Z1z,
                c6G,
                G4Q;
                if (typeof G == "undefined") {
                    N1O.p86(1);
                    this.timeZoneOffset = N1O.U9a(0, "0");
                    return;
                }
                w_b = new Date();
                f3m = w_b.getTimezoneOffset();
                Z1z = f3m;
                c6G = f3m;
                if (Z4u) {
                    this.dataZone = Z4u;
                }
                if (this.dataZone) {
                    Z1z = new G.Date(w_b, this.dataZone).getTimezoneOffset();
                }
                if (v0o) {
                    this.displayZone = v0o;
                }
                if (this.displayZone) {
                    c6G = new G.Date(w_b, this.displayZone).getTimezoneOffset();
                }
                N1O.p86(113);
                this.timeZoneOffset = N1O.f21(f3m, f3m, c6G, Z1z);
                for (var U3l in this.charts) {
                    G4Q = this.charts[U3l];
                    if (G4Q.masterData && !S.isDailyInterval(this.layout.interval)) {
                        this.setDisplayDates(G4Q.masterData);
                    }
                }
                this.createDataSet();
            };
            S.prototype.setLocale = function (J7T) {
                var I82,
                u1D,
                j8p,
                v13,
                f1F,
                r5I,
                T3q,
                R6n,
                F4k;
                I82 = "perc";
                I82 += "ent";
                u1D = "shor";
                u1D += "t";
                j8p = "n";
                j8p += "ume";
                j8p += "ric";
                v13 = "n";
                v13 += "umer";
                v13 += "ic";
                f1F = "2-d";
                f1F += "i";
                f1F += "g";
                f1F += "it";
                r5I = "nu";
                r5I += "meri";
                r5I += "c";
                T3q = "nu";
                T3q += "me";
                T3q += "ri";
                T3q += "c";
                R6n = "num";
                R6n += "er";
                R6n += "ic";
                F4k = "un";
                F4k += "d";
                F4k += "efin";
                F4k += "ed";
                if (typeof Intl == F4k) {
                    return;
                }
                if (this.locale != J7T) {
                    this.locale = J7T;
                } else {
                    return;
                }
                this.internationalizer = {};
                this.internationalizer.hourMinute = new Intl.DateTimeFormat(this.locale, {
                    hour: R6n,
                    minute: T3q,
                    hour12: ![]
                });
                this.internationalizer.hourMinuteSecond = new Intl.DateTimeFormat(this.locale, {
                    hour: "numeric",
                    minute: r5I,
                    second: "numeric",
                    hour12: ![]
                });
                this.internationalizer.mdhm = new Intl.DateTimeFormat(this.locale, {
                    year: f1F,
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit"
                });
                this.internationalizer.monthDay = new Intl.DateTimeFormat(this.locale, {
                    month: "numeric",
                    day: "numeric"
                });
                this.internationalizer.yearMonthDay = new Intl.DateTimeFormat(this.locale, {
                    year: "numeric",
                    month: v13,
                    day: j8p
                });
                this.internationalizer.yearMonth = new Intl.DateTimeFormat(this.locale, {
                    year: "numeric",
                    month: "numeric"
                });
                this.internationalizer.month = new Intl.DateTimeFormat(this.locale, {
                    month: u1D
                });
                this.internationalizer.numbers = new Intl.NumberFormat(this.locale);
                this.internationalizer.priceFormatters = [];
                this.internationalizer.priceFormatters[0] = new Intl.NumberFormat(this.locale, {
                    maximumFractionDigits: 0,
                    minimumFractionDigits: 0
                });
                this.internationalizer.priceFormatters[1] = new Intl.NumberFormat(this.locale, {
                    maximumFractionDigits: 1,
                    minimumFractionDigits: "1" | 0
                });
                this.internationalizer.priceFormatters[2] = new Intl.NumberFormat(this.locale, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2
                });
                this.internationalizer.priceFormatters[ + "3"] = new Intl.NumberFormat(this.locale, {
                    maximumFractionDigits: 3,
                    minimumFractionDigits:  + "3"
                });
                this.internationalizer.priceFormatters[4] = new Intl.NumberFormat(this.locale, {
                    maximumFractionDigits: 4,
                    minimumFractionDigits: 4
                });
                this.internationalizer.priceFormatters[5] = new Intl.NumberFormat(this.locale, {
                    maximumFractionDigits: 5,
                    minimumFractionDigits: 5
                });
                this.internationalizer.percent = new Intl.NumberFormat(this.locale, {
                    style: "percent",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
                this.internationalizer.percent0 = new Intl.NumberFormat(this.locale, {
                    style: "percent",
                    minimumFractionDigits: 0,
                    maximumFractionDigits:  + "0"
                });
                this.internationalizer.percent1 = new Intl.NumberFormat(this.locale, {
                    style: "percent",
                    minimumFractionDigits: 1,
                    maximumFractionDigits: "1" >> 64
                });
                this.internationalizer.percent2 = new Intl.NumberFormat(this.locale, {
                    style: "percent",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
                this.internationalizer.percent3 = new Intl.NumberFormat(this.locale, {
                    style: I82,
                    minimumFractionDigits: 3,
                    maximumFractionDigits: 3
                });
                this.internationalizer.percent4 = new Intl.NumberFormat(this.locale, {
                    style: "percent",
                    minimumFractionDigits: 4,
                    maximumFractionDigits: 4
                });
                R.createMonthArrays(this, this.internationalizer.month, this.locale);
            };
            S.prototype.importLayout = function (X_$, w4N) {
                var j4l,
                S7W,
                E7I,
                i1n,
                k1T,
                G81,
                r1q,
                S4N,
                K26,
                D5C,
                v0z,
                u__,
                x4D,
                k2L,
                n8d,
                X4i,
                d90,
                I5S,
                t2X,
                V39,
                B6F,
                u0Y;
                j4l = "ob";
                j4l += "jec";
                j4l += "t";
                if (typeof w4N !== j4l) {
                    w4N = {
                        managePeriodicity: arguments[1],
                        preserveTicksAndCandleWidth: arguments[2]
                    };
                }
                if (!w4N.preserveTicksAndCandleWidth && w4N.preserveTicksAndCandleWidth !== !"1") {
                    w4N.preserveTicksAndCandleWidth = !!"1";
                }
                S7W = R.shallowClone(this.layout);
                E7I = this.serializeDrawings();
                this.abortDrawings();
                this.currentlyImporting = !!1;
                this.overlays = {};
                i1n = R.clone(X_$);
                for (var H5p in this.layout.studies) {
                    k1T = this.layout.studies[H5p];
                    R.Studies.removeStudy(this, k1T);
                }
                if (i1n) {
                    G81 = R.shallowClone(this.panels);
                    this.panels = {};
                    r1q = R.clone(i1n);
                    delete r1q.periodicity;
                    delete r1q.interval;
                    delete r1q.timeUnit;
                    delete r1q.setSpan;
                    R.dataBindSafeAssignment(this.layout, r1q);
                    this.layout.periodicity = S7W.periodicity;
                    this.layout.interval = S7W.interval;
                    this.layout.timeUnit = S7W.timeUnit;
                    this.layout.setSpan = S7W.setSpan;
                    if (w4N.preserveTicksAndCandleWidth) {
                        this.layout.candleWidth = S7W.candleWidth;
                    } else {
                        if (!this.layout.candleWidth) {
                            this.layout.candleWidth = 8;
                        }
                    }
                    if (this.layout.candleWidth < this.minimumCandleWidth) {
                        this.layout.candleWidth = this.minimumCandleWidth;
                    }
                    this.setCandleWidth(this.layout.candleWidth);
                    S4N = i1n.panels;
                    this.layout.panels = {};
                    for (var P8I in S4N) {
                        K26 = S4N[P8I];
                        this.stackPanel(K26.display, P8I, K26.percent, K26.chartName);
                    }
                    if (R.isEmpty(S4N)) {
                        D5C = "ch";
                        D5C += "ar";
                        D5C += "t";
                        this.stackPanel(D5C, "chart", 1, "chart");
                    }
                    for (var g8e in G81) {
                        v0z = G81[g8e];
                        u__ = this.panels[g8e];
                        if (u__) {
                            this.container.removeChild(u__.holder);
                            this.container.removeChild(v0z.handle);
                            x4D = {
                                "holder": !![],
                                "subholder": !![],
                                "display": !""
                            };
                            for (var f$w in x4D) {
                                u__[f$w] = v0z[f$w];
                            }
                            this.configurePanelControls(u__);
                            if (v0z.chart.panel == v0z) {
                                v0z.chart.panel = u__;
                            };
                        } else {
                            this.privateDeletePanel(v0z);
                        }
                    }
                    this.adjustPanelPositions();
                    this.storePanels();
                    k2L = R.clone(this.layout.studies);
                    delete this.layout.studies;
                    for (var p8k in k2L) {
                        n8d = k2L[p8k];
                        R.Studies.addStudy(this, n8d.type, n8d.inputs, n8d.outputs, n8d.parameters, n8d.panel);
                    }
                }
                if (typeof this.layout.chartType == "undefined") {
                    this.layout.chartType = "line";
                }
                this.adjustPanelPositions();
                X4i = this;
                if (X_$.symbols) {
                    if (!this.quoteDriver || !this.quoteDriver.quoteFeed) {
                        d90 = "WARNING: loading a symbol through 'importLayout' without a QuoteFeed may b";
                        d90 += "reak data updates";
                        console.log(d90);
                    }
                    I5S = {};
                    if (w4N.managePeriodicity) {
                        if (X_$.symbols["0" ^ 0].setSpan) {
                            I5S.span = X_$.symbols[0].setSpan;
                        }
                        if (X_$.symbols[0].interval) {
                            t2X = 2141375305;
                            V39 = 591144579;
                            B6F = 2;
                            for (var i3I =  + "1"; N1O.n$d(i3I.toString(), i3I.toString().length, 73444) !== t2X; i3I++) {
                                I5S.periodicity = {
                                    interval: X_$.symbols[0].interval,
                                    periodicity: X_$.symbols[0].periodicity,
                                    timeUnit: X_$.symbols[0].timeUnit
                                };
                                B6F += 2;
                            }
                            if (N1O.Y4l(B6F.toString(), B6F.toString().length, 66749) !== V39) {
                                I5S.periodicity = {
                                    interval: X_$.symbols[3].interval,
                                    periodicity: X_$.symbols[4].periodicity,
                                    timeUnit: X_$.symbols[3].timeUnit
                                };
                            }
                        }
                    }
                    u0Y = X_$.symbols[0].symbolObject || X_$.symbols[0].symbol;
                    this.newChart(u0Y, null, this.chart, function (E58) {
                        if (!E58) {
                            for (var p4V, w59 = 1; w59 < X_$.symbols.length; ++w59) {
                                p4V = X_$.symbols[w59];
                                X4i.addSeries(p4V.symbol, p4V.parameters);
                            }
                        }
                        X4i.reconstructDrawings(E7I);
                        X4i.draw();
                        X4i.currentlyImporting = ![];
                        X4i.updateListeners("layout");
                        if (w4N.cb) {
                            w4N.cb.apply(null, arguments);
                        }
                    }, I5S);
                    return;
                } else {
                    if (i1n && w4N.managePeriodicity) {
                        if (i1n.setSpan && this.chart.symbol) {
                            this.setSpan(i1n.setSpan, function () {
                                var h3E;
                                h3E = "lay";
                                h3E += "ou";
                                h3E += "t";
                                X4i.reconstructDrawings(E7I);
                                X4i.draw();
                                X4i.currentlyImporting = !({});
                                X4i.updateListeners(h3E);
                                if (w4N.cb) {
                                    w4N.cb();
                                }
                            });
                            return;
                        } else {
                            interval = i1n.interval;
                            periodicity = i1n.periodicity;
                            timeUnit = i1n.timeUnit;
                            if (isNaN(periodicity)) {
                                periodicity = 1;
                            }
                            if (!interval) {
                                interval = "day";
                            }
                            if (interval != this.layout.interval || periodicity != this.layout.periodicity) {
                                this.setPeriodicityV2(periodicity, interval, timeUnit, function () {
                                    X4i.reconstructDrawings(E7I);
                                    X4i.draw();
                                    X4i.currentlyImporting = !"1";
                                    X4i.updateListeners("layout");
                                    if (w4N.cb) {
                                        w4N.cb();
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
                this.reconstructDrawings(E7I);
                this.draw();
                if (!w4N.preserveTicksAndCandleWidth) {
                    this.home();
                }
                this.currentlyImporting = ![];
                this.updateListeners("layout");
                if (w4N.cb) {
                    w4N.cb();
                }
            };
            S.prototype.exportLayout = function (h4U) {
                var U_n,
                e8Q,
                C6O,
                C1f,
                n_N,
                z6M,
                E9U;
                U_n = {};
                for (var L21 in this.layout) {
                    e8Q = "p";
                    e8Q += "an";
                    e8Q += "el";
                    e8Q += "s";
                    C6O = "s";
                    C6O += "tud";
                    C6O += "ie";
                    C6O += "s";
                    if (L21 != C6O && L21 != "panels") {
                        U_n[L21] = R.clone(this.layout[L21]);
                    } else if (L21 == "studies") {
                        U_n.studies = {};
                    } else if (L21 == e8Q) {
                        U_n.panels = {};
                    }
                }
                for (var F4S in this.panels) {
                    C1f = U_n.panels[F4S] = {};
                    n_N = this.panels[F4S];
                    C1f.percent = n_N.percent;
                    C1f.display = n_N.display;
                    C1f.chartName = n_N.chart.name;
                }
                for (var H9$ in this.layout.studies) {
                    z6M = U_n.studies[H9$] = {};
                    E9U = this.layout.studies[H9$];
                    z6M.type = E9U.type;
                    z6M.inputs = R.clone(E9U.inputs);
                    z6M.outputs = R.clone(E9U.outputs);
                    z6M.panel = E9U.panel;
                    z6M.parameters = R.clone(E9U.parameters);
                }
                if (h4U) {
                    U_n.symbols = this.getSymbols("include-parameters");
                }
                return U_n;
            };
            S.prototype.doCleanupGaps = function (j8L, p2F) {
                var X5a,
                x48,
                D0A,
                O6c,
                J_Z,
                a27,
                m26,
                b68,
                r_T;
                if (!this.cleanupGaps) {
                    return j8L;
                }
                if (this.layout.interval == "tick") {
                    return j8L;
                }
                if (j8L && !j8L.length) {
                    return j8L;
                }
                if (!p2F) {
                    p2F = this.chart;
                }
                X5a = this.layout.interval;
                if (X5a == "month" || X5a == "week") {
                    if (this.dontRoll) {
                        return j8L;
                    }
                    X5a = "day";
                }
                x48 = function (D7w) {
                    var m45;
                    if (D7w.DT) {
                        m45 = D7w.DT;
                    } else {
                        m45 = R.strToDateTime(D7w.Date);
                    }
                    return m45;
                };
                D0A = [];
                O6c = j8L[0];
                D0A.push(j8L[0]);
                J_Z = {
                    'begin': x48(O6c),
                    'interval': X5a,
                    'periodicity': "1" * 1,
                    'timeUnit': this.layout.timeUnit,
                    'inZone': this.dataZone,
                    'outZone': this.dataZone
                };
                a27 = p2F.market.newIterator(J_Z);
                for (var l5b = 1; l5b < j8L.length; l5b++) {
                    m26 = j8L[l5b];
                    b68 = a27.next();
                    r_T = x48(m26);
                    while (b68 < r_T) {
                        D0A.push({
                            DT: b68,
                            Open: O6c.Close,
                            High: O6c.Close,
                            Low: O6c.Close,
                            Close: O6c.Close,
                            Volume: 0,
                            Adj_Close: O6c.Adj_Close
                        });
                        b68 = a27.next();
                    }
                    D0A.push(m26);
                    O6c = m26;
                }
                return D0A;
            };
            S.Driver = function (I0s, k1l, i9C) {
                this.tagalongs = {};
                N1O.A7M();
                this.stx = I0s;
                this.quoteFeed = k1l;
                this.behavior = i9C;
                this.loadingNewChart = !({});
                this.intervalTimer = null;
                this.updatingChart = !!0;
                this.updateChartLoop();
            };
            S.Driver.prototype.die = function () {
                N1O.A7M();
                if (this.intervalTimer) {
                    window.clearInterval(this.intervalTimer);
                }
            };
            S.Driver.prototype.updateSubscriptions = function () {
                N1O.N7F();
                if (this.quoteFeed.checkSubscriptions) {
                    this.quoteFeed.checkSubscriptions(this.stx);
                }
            };
            S.Driver.prototype.attachTagAlongQuoteFeed = function (F9$) {
                if (!this.tagalongs[F9$.label]) {
                    this.tagalongs[F9$.label] = {
                        label: F9$.label,
                        quoteFeed: F9$.quoteFeed,
                        behavior: F9$.behavior ? F9$.behavior : {},
                        count: 0
                    };
                }
                this.tagalongs[F9$.label].count++;
            };
            S.Driver.prototype.detachTagAlongQuoteFeed = function (U0v) {
                var w3s;
                w3s = this.tagalongs[U0v.label];
                w3s.count--;
                if (!w3s.count) {
                    this.tagalongs[U0v.label] = null;
                }
            };
            S.Driver.prototype.loadDependents = function (R0T) {
                var y3V,
                g6f,
                v0i,
                z7a,
                b$b,
                L_Y;
                g6f = {};
                v0i = R0T.stx;
                z7a = v0i.chart.series;
                for (y3V in z7a) {
                    if (!z7a[y3V].parameters.data || !z7a[y3V].parameters.data.useDefaultQuoteFeed)
                        continue;
                    g6f[y3V] = !!({});
                }
                function B4X(A2w) {
                    var M8L;
                    for (var s8v = v0i.masterData.length - 1; s8v >= 0; s8v--) {
                        M8L = "un";
                        M8L += "defined";
                        if (v0i.masterData[s8v] && typeof v0i.masterData[s8v][A2w] != M8L) {
                            return R.strToDateTime(v0i.masterData[s8v].Date);
                        }
                    }
                    return R0T.startDate;
                }
                for (var y9p in v0i.panels) {
                    if (v0i.panels[y9p].studyQuotes) {
                        for (var G8c in v0i.panels[y9p].studyQuotes) {
                            g6f[G8c] = !"";
                        }
                    }
                }
                b$b = [];
                for (y3V in g6f) {
                    L_Y = R.shallowClone(R0T.originalState);
                    L_Y.symbol = y3V;
                    if (z7a[y3V] && z7a[y3V].parameters.symbolObject) {
                        L_Y.symbolObject = z7a[y3V].parameters.symbolObject;
                    }
                    if (L_Y.update) {
                        L_Y.startDate = B4X(y3V);
                    } else {
                        if (!L_Y.startDate && v0i.masterData[0]) {
                            L_Y.startDate = v0i.masterData[0].DT;
                        }
                        if (!L_Y.endDate && v0i.masterData[v0i.masterData.length - 1]) {
                            L_Y.endDate = v0i.masterData[v0i.masterData.length - ("1" >> 32)].DT;
                        }
                    }
                    b$b.push(L_Y);
                }
                if (!b$b.length) {
                    v0i.createDataSet();
                    if (!R0T.nodraw) {
                        v0i.draw();
                    }
                    return;
                }
                this.quoteFeed.multiFetch(b$b, function (b4H) {
                    var s$p,
                    A80;
                    for (var V6g = 0; V6g < b4H.length; V6g++) {
                        s$p = b4H[V6g];
                        if (!s$p.dataCallback.error && s$p.dataCallback.error !== 0) {
                            A80 = null;
                            if (v0i.chart.series[s$p.params.symbol]) {
                                A80 = v0i.chart.series[s$p.params.symbol].parameters.field;
                            }
                            R.addMemberToMasterdata(v0i, s$p.params.symbol, s$p.dataCallback.quotes, null, null, A80);
                        }
                    }
                    v0i.createDataSet();
                    v0i.draw();
                });
            };
            S.Driver.prototype.executeTagAlongs = function (O9w) {
                var Q1e,
                C_m,
                E_w,
                Y0N;
                Q1e = {
                    count: R.objLength(this.taglongs)
                };
                C_m = this;
                for (var d8v in this.tagalongs) {
                    E_w = this.tagalongs[d8v];
                    Y0N = R.shallowClone(E_w.behavior);
                    R.extend(Y0N, O9w, !"");
                    E_w.quoteFeed.fetch(Y0N, R9q(Y0N, E_w, Q1e));
                }
                function R9q(s1D, J9y, y64) {
                    return function (b5B) {
                        N1O.N7F();
                        var j7e;
                        y64.count--;
                        if (!b5B.error && b5B.error !== 0) {
                            j7e = s1D.fields;
                            if (!j7e) {
                                j7e = null;
                            }
                            R.addMemberToMasterdata(C_m.stx, J9y.label, b5B.quotes, j7e);
                        }
                        if (y64.count == -1) {
                            C_m.render();
                        }
                    };
                }
            };
            S.Driver.prototype.render = function () {
                this.stx.createDataSet();
                this.stx.draw();
            };
            S.Driver.prototype.updateChart = function () {
                var J7Y,
                z0t,
                B8Q,
                m2v,
                Z_w,
                F_N,
                U7N;
                if (this.updatingChart) {
                    return;
                }
                function Z51(q3$, U8T, h5b) {
                    N1O.A7M();
                    if (q3$.behavior.prefetchAction) {
                        q3$.behavior.prefetchAction("updateChart");
                    }
                    return function (w1b) {
                        var A9S,
                        w_V,
                        q9I,
                        P2q,
                        M$L;
                        z0t++;
                        N1O.N7F();
                        if (h5b == U8T.chart.symbol && B8Q == q3$.stx.layout.interval && m2v == q3$.stx.layout.timeUnit) {
                            if (!w1b.error && w1b.error !== 0) {
                                A9S = !"1";
                                if (!U8T.missingBarsCreated) {
                                    if (U8T.chart.masterData && U8T.chart.masterData.length && w1b.quotes && w1b.quotes.length > 0) {
                                        N1O.B_x(114);
                                        var Q_E = N1O.f21(15, 8, 20, 6, 8);
                                        w_V = U8T.chart.masterData[U8T.chart.masterData.length - Q_E];
                                        if (w1b.quotes[0].DT && w_V.DT < w1b.quotes[ + "0"].DT || w1b.quotes[0].Date && w_V.Date < w1b.quotes[0].Date) {
                                            w1b.quotes.unshift(w_V);
                                            A9S = !!1; ;
                                        }
                                    }
                                    w1b.quotes = q3$.stx.doCleanupGaps(w1b.quotes, U8T.chart);
                                    if (A9S) {
                                        w1b.quotes.shift();
                                    }
                                }
                                q3$.stx.appendMasterData(w1b.quotes, U8T.chart, {
                                    noCreateDataSet: !""
                                });
                                U8T.chart.attribution = w1b.attribution;
                            } else {
                                q3$.quoteFeed.announceError(U8T.originalState, w1b);
                            }
                        } else {
                            return;
                        }
                        if (z0t == J7Y) {
                            q9I = 1290597248;
                            P2q = -1420026406;
                            M$L = 2;
                            for (var p7T = 1; N1O.Y4l(p7T.toString(), p7T.toString().length, 15660) !== q9I; p7T++) {
                                q3$.updatingChart = !"1";
                                M$L +=  + "2";
                            }
                            if (N1O.Y4l(M$L.toString(), M$L.toString().length, 19940) !== P2q) {
                                q3$.updatingChart = !!({});
                            }
                        }
                        q3$.executeTagAlongs(U8T);
                        if (q3$.behavior.callback) {
                            q3$.behavior.callback(U8T);
                        }
                        q3$.loadDependents(U8T); ;
                    };
                }
                if (this.loadingNewChart) {
                    return;
                }
                J7Y = R.objLength(this.stx.charts);
                z0t = 0;
                B8Q = this.stx.layout.interval;
                m2v = this.stx.layout.timeUnit;
                for (var K_o in this.stx.charts) {
                    Z_w = this.stx.charts[K_o];
                    if (!Z_w.symbol)
                        continue;
                    F_N = this.makeParams(Z_w.symbol, Z_w.symbolObject, Z_w);
                    if (Z_w.masterData && Z_w.masterData.length) {
                        F_N.startDate = Z_w.masterData[Z_w.masterData.length -  + "1"].DT;
                    }
                    F_N.update = !"";
                    F_N.originalState = R.shallowClone(F_N);
                    this.updatingChart = !!"1";
                    U7N = Z51(this, F_N, Z_w.symbol);
                    if (this.stx.isEquationChart(F_N.symbol)) {
                        R.fetchEquationChart(F_N, U7N);
                    } else {
                        this.quoteFeed.fetch(F_N, U7N);
                    }
                }
            };
            S.Driver.prototype.updateChartLoop = function () {
                if (this.behavior.noUpdate) {
                    return;
                }
                if (this.behavior.refreshInterval) {
                    this.intervalTimer = window.setInterval(e8I(this), this.behavior.refreshInterval * 1000);
                }
                function e8I(G2E) {
                    return function () {
                        if (G2E.behavior.noUpdate) {
                            return;
                        }
                        N1O.N7F();
                        G2E.updateChart();
                    };
                }
            };
            S.Driver.prototype.resetRefreshInterval = function (j4M) {
                N1O.N7F();
                if (this.intervalTimer) {
                    window.clearInterval(this.intervalTimer);
                }
                this.behavior.refreshInterval = j4M;
                this.updateChartLoop(); ;
            };
            S.Driver.prototype.loadAll = function (C_x, X6b) {
                var I$J,
                Y1V;
                function u5w() {
                    return function (d8N) {
                        var I1$;
                        if (d8N) {
                            X6b(d8N);
                        } else if (!C_x.moreAvailable) {
                            X6b(null);
                        } else if (Y1V++ > 20) {
                            I1$ = "error, moreAvailable not implemented correc";
                            I1$ += "t";
                            I1$ += "ly in Quot";
                            I1$ += "eFeed";
                            X6b(I1$);
                        } else {
                            I$J.checkLoadMore(C_x, !!({}), !!({}), u5w());
                        }
                    };
                }
                I$J = this;
                Y1V = 0;
                N1O.N7F();
                this.checkLoadMore(C_x, !!"1", !![], u5w());
            };
            S.Driver.prototype.checkLoadMore = function (w2p, I_i, X13, d80, n$i) {
                var s_9,
                j9x,
                k75,
                e8C,
                I5Z;
                if (!w2p.moreAvailable) {
                    if (d80) {
                        d80();
                    }
                    return;
                }
                s_9 = this.stx.layout.interval;
                function u9G(m7y, J6U) {
                    N1O.N7F();
                    if (m7y.behavior.prefetchAction) {
                        m7y.behavior.prefetchAction("checkLoadMore");
                    }
                    return function (y7k) {
                        N1O.A7M();
                        var N4$;
                        if (J6U.symbol == J6U.chart.symbol && s_9 == m7y.stx.layout.interval && j9x == m7y.stx.layout.timeUnit) {
                            if (!J6U.loadMore) {
                                J6U.chart.loadingMore = !({});
                            }
                            if (!y7k.error && y7k.error !== 0) {
                                if (!J6U.missingBarsCreated) {
                                    y7k.quotes.push(J6U.chart.masterData[0]);
                                    y7k.quotes = m7y.stx.doCleanupGaps(y7k.quotes, J6U.chart);
                                    y7k.quotes.pop(); ;
                                }
                                J6U.chart.moreAvailable = y7k.moreAvailable;
                                N4$ = J6U.loadMoreReplace ? y7k.quotes : y7k.quotes.concat(J6U.chart.masterData);
                                m7y.stx.setMasterData(N4$, J6U.chart);
                                m7y.stx.createDataSet();
                                if (!n$i) {
                                    m7y.stx.draw();
                                }
                                J6U.startDate = J6U.chart.masterData[0].DT;
                                m7y.executeTagAlongs(J6U);
                                if (m7y.behavior.callback) {
                                    m7y.behavior.callback(J6U);
                                }
                                m7y.loadDependents(J6U);
                            } else {
                                m7y.quoteFeed.announceError(J6U.originalState, y7k);
                            }
                            J6U.chart.loadingMore = ![];
                            if (d80) {
                                d80(null);
                            }
                        } else {
                            return;
                        }
                    };
                }
                j9x = this.stx.layout.timeUnit;
                k75 = w2p.loadingMore;
                if (!this.behavior.noLoadMore) {
                    if (!this.stx.maxDataSetSize || w2p.dataSet.length < this.stx.maxDataSetSize) {
                        if (w2p.dataSet.length > 0 && w2p.scroll >= w2p.dataSet.length || I_i) {
                            if (!w2p.loadingMore) {
                                w2p.initialScroll = w2p.scroll;
                                w2p.loadingMore = !"";
                                e8C = this.makeParams(w2p.symbol, w2p.symbolObject, w2p);
                                e8C.endDate = w2p.masterData[0].DT;
                                e8C.originalState = R.shallowClone(e8C);
                                e8C.nodraw = n$i;
                                if (this.stx.fetchMaximumBars[this.stx.layout.aggregationType]) {
                                    X13 = !"";
                                }
                                if (X13) {
                                    e8C.fetchMaximumBars = !!1;
                                    e8C.ticks = Math.max(20000, e8C.ticks);
                                }
                                I5Z = u9G(this, e8C);
                                if (this.stx.isEquationChart(e8C.symbol)) {
                                    R.fetchEquationChart(e8C, I5Z);
                                } else {
                                    this.quoteFeed.fetch(e8C, I5Z);
                                }
                                k75 = !!1;
                            }
                        }
                    }
                }
                if (w2p.loadingMore) {
                    w2p.initialScroll = w2p.scroll;
                }
                if (!k75 && d80) {
                    d80(null);
                }
            };
            S.Driver.prototype.barsToFetch = function (C9p) {
                var H4N,
                m3q,
                m_F,
                r_o,
                d7K,
                L48;
                H4N = "w";
                H4N += "eek";
                m3q = "m";
                m3q += "o";
                m3q += "nt";
                m3q += "h";
                if (C9p.isSeries) {
                    return C9p.stx.masterData.length;
                }
                m_F = this.stx.layout.interval;
                N1O.A7M();
                r_o = C9p.stx.layout.periodicity;
                if ((m_F == m3q || m_F == H4N) && !this.stx.dontRoll) {
                    d7K = "we";
                    d7K += "ek";
                    r_o *= m_F == d7K ? 7 : "30" >> 64;
                }
                L48 = C9p.stx.chart.maxTicks * r_o;
                return L48;
            };
            S.Driver.prototype.makeParams = function (C_o, p4h, U8y) {
                var a9K,
                u40,
                y26,
                w9t;
                a9K = "m";
                a9K += "o";
                a9K += "nt";
                a9K += "h";
                u40 = this.stx.layout.interval;
                y26 = this.barsToFetch({
                    stx: this.stx
                });
                if ((u40 == a9K || u40 == "week") && !this.stx.dontRoll) {
                    u40 = "day";
                }
                w9t = R.shallowClone(this.behavior);
                R.extend(w9t, {
                    stx: this.stx,
                    symbol: C_o,
                    symbolObject: p4h,
                    chart: U8y,
                    interval: u40,
                    extended: this.stx.layout.extended,
                    period:  + "1",
                    feed: "delayed",
                    ticks: y26
                }, !!1);
                if (!w9t.symbolObject) {
                    w9t.symbolObject = {
                        symbol: C_o
                    };
                }
                if (!isNaN(w9t.interval)) {
                    w9t.period = w9t.interval;
                    w9t.interval = this.stx.layout.timeUnit;
                    if (!w9t.interval) {
                        w9t.interval = "minute";
                    }
                }
                if (w9t.pts) {
                    w9t.ticks = Math.max(w9t.ticks, 1000);
                }
                return w9t;
            };
            S.Driver.prototype.newChart = function (a$9, K9I) {
                var T6o,
                h17,
                w5K,
                j1R,
                y69,
                p$n,
                A6P;
                T6o = this.stx;
                h17 = a$9.symbol;
                w5K = T6o.layout.interval;
                j1R = T6o.layout.timeUnit;
                function h4O(A5J, D6V) {
                    if (A5J.behavior.prefetchAction) {
                        A5J.behavior.prefetchAction("newChart");
                    }
                    N1O.N7F();
                    return function (R9F) {
                        var x$j;
                        if (h17 == D6V.chart.symbol && w5K == T6o.layout.interval && j1R == T6o.layout.timeUnit) {
                            if (!R9F.error && R9F.error !== 0) {
                                if (!D6V.missingBarsCreated) {
                                    R9F.quotes = T6o.doCleanupGaps(R9F.quotes, a$9.chart);
                                }
                                T6o.setMasterData(R9F.quotes, D6V.chart);
                                D6V.chart.moreAvailable = R9F.moreAvailable;
                                D6V.chart.attribution = R9F.attribution;
                                T6o.createDataSet();
                                if (a$9.initializeChart) {
                                    T6o.initializeChart();
                                }
                                if (!D6V.nodraw) {
                                    T6o.home();
                                };
                            } else {
                                A5J.quoteFeed.announceError(D6V.originalState, R9F);
                            }
                        } else {
                            x$j = "or";
                            x$j += "pha";
                            x$j += "n";
                            x$j += "ed";
                            if (K9I) {
                                K9I(x$j);
                            }
                            return;
                        }
                        A5J.loadingNewChart = ![];
                        N1O.A7M();
                        if (K9I) {
                            K9I(R9F.error);
                        }
                        if (D6V.chart.masterData && D6V.chart.masterData.length) {
                            D6V.startDate = D6V.chart.masterData[0].DT;
                        }
                        A5J.executeTagAlongs(D6V);
                        if (A5J.behavior.callback) {
                            A5J.behavior.callback(D6V);
                        }
                        A5J.loadDependents(D6V);
                        A5J.resetRefreshInterval(A5J.behavior.refreshInterval);
                    };
                }
                y69 = a$9.chart;
                y69.moreAvailable = !"1";
                y69.attribution = null;
                N1O.N7F();
                p$n = this.makeParams(h17, a$9.symbolObject, y69);
                R.extend(p$n, a$9, !![]);
                if (T6o.fetchMaximumBars[T6o.layout.aggregationType]) {
                    p$n.ticks = Math.max(20000, p$n.ticks);
                    p$n.fetchMaximumBars = !![];
                }
                this.loadingNewChart = !![];
                this.updatingChart = ![];
                p$n.originalState = R.shallowClone(p$n);
                A6P = h4O(this, p$n);
                if (this.stx.isEquationChart(p$n.symbol)) {
                    R.fetchEquationChart(p$n, A6P);
                } else {
                    this.quoteFeed.fetch(p$n, A6P);
                }
            };
            S.prototype.attachQuoteFeed = function (Q_i, q9K) {
                N1O.N7F();
                if (!q9K) {
                    q9K = {};
                }
                if (this.quoteDriver) {
                    this.quoteDriver.die();
                }
                this.quoteDriver = new S.Driver(this, Q_i, q9K);
            };
            S.prototype.attachTagAlongQuoteFeed = function (M$6) {
                if (!M$6.label) {
                    console.log("Attempt to attachTagAlongQuoteFeed without assigning a label");
                    return;
                }
                this.quoteDriver.attachTagAlongQuoteFeed(M$6);
            };
            S.prototype.detachTagAlongQuoteFeed = function (W_W) {
                N1O.N7F();
                this.quoteDriver.detachTagAlongQuoteFeed(W_W);
            };
            R.Comparison = function () {};
            R.Comparison.mouseHasMoved = ![];
            R.Comparison.priceToPercent = function (O4U, I5x, Z$s) {
                N1O.B_x(115);
                var d3h = N1O.f21(5, 12, 89, 18);
                N1O.A7M();
                N1O.B_x(36);
                var N1K = N1O.f21(556, 18, 9462);
                N1O.p86(68);
                var m3M = N1O.f21(1, 1429, 9999, 1429);
                return Math.round((Z$s - R.Comparison.baseline) / R.Comparison.baseline * d3h * N1K) / m3M;
            };
            R.Comparison.percentToPrice = function (z1I, b2C, J9S) {
                N1O.B_x(45);
                var D6j = N1O.f21(29, 9, 19);
                N1O.B_x(2);
                var m46 = N1O.f21(11, 89);
                return R.Comparison.baseline * (D6j + J9S / m46);
            };
            R.Comparison.stopSort = function (G0X, H_x) {
                N1O.A7M();
                N1O.B_x(7);
                return N1O.f21(H_x, G0X);
            };
            R.Comparison.createComparisonSegmentInner = function (R2n, k13) {
                var J4A,
                M8z,
                H1r,
                P5Z,
                B3N,
                R1P,
                u0O,
                q2g,
                a61,
                Y$L,
                i78,
                H3R,
                y$c,
                V0X,
                A9P,
                S6X,
                N71,
                S14,
                T5b,
                h57,
                n5g,
                y7$,
                z6u;
                J4A = "iqPre";
                J4A += "vClo";
                J4A += "se";
                M8z = "Lo";
                M8z += "w";
                H1r = [];
                for (P5Z in k13.series) {
                    if (k13.series[P5Z].parameters.isComparison) {
                        H1r.push(P5Z);
                    }
                }
                B3N = ["Close", "Open", "High", M8z, J4A];
                k13.dataSegment = [];
                R1P = null;
                u0O = k13.dataSet.length - k13.scroll;
                q2g = u0O + k13.maxTicks;
                a61 = 0;
                Y$L = [];
                for (i78 =  + "0"; i78 < R2n.drawingObjects.length; i78++) {
                    H3R = R2n.drawingObjects[i78];
                    if (H3R.name == "comparison_stop")
                        if (H3R.tick > u0O && H3R.tick <= q2g) {
                            Y$L.push(H3R.tick);
                        }
                }
                Y$L.sort(R.Comparison.stopSort);
                N1O.p86(2);
                var D7e = N1O.f21(3, 0);
                y$c = k13.maxTicks + D7e;
                for (i78 = 0; i78 <= y$c; i78++) {
                    if (i78 == y$c) {
                        i78 = -1;
                    }
                    N1O.B_x(2);
                    position = N1O.U9a(i78, u0O);
                    if (position < k13.dataSet.length && position >= 0) {
                        V0X = "com";
                        V0X += "pa";
                        V0X += "r";
                        V0X += "ison_stop";
                        A9P = k13.dataSet[position];
                        if (!R1P) {
                            R1P = R.clone(A9P);
                        }
                        if (!A9P.transform) {
                            A9P.transform = {
                                "cache": {},
                                "DT": A9P.DT,
                                "Date": A9P.Date
                            };
                        }
                        R.Comparison.baseline = R1P.Close;
                        for (S6X = 0; S6X < B3N.length; S6X++) {
                            P5Z = B3N[S6X];
                            if (A9P[P5Z] || A9P[P5Z] === 0) {
                                N1O.B_x(52);
                                var t4M = N1O.U9a(8, 114, 3, 9);
                                N1O.p86(116);
                                var d0e = N1O.U9a(5, 20, 1250, 20, 9750);
                                A9P.transform[P5Z] = Math.round((A9P[P5Z] - R.Comparison.baseline) / R.Comparison.baseline * t4M *  + "10000") / d0e;
                            };
                        }
                        N71 = R2n.layout.studies;
                        if (N71) {
                            for (var U9n in N71) {
                                S14 = N71[U9n];
                                if (!R2n.panels[S14.panel] || R2n.panels[S14.panel].name != S14.chart.name)
                                    continue;
                                for (P5Z in S14.outputMap) {
                                    if (A9P[P5Z] || A9P[P5Z] === "0" * 1) {
                                        N1O.B_x(117);
                                        var D87 = N1O.f21(1, 13, 3, 16, 106);
                                        N1O.p86(89);
                                        var O75 = N1O.U9a(10011, 7, 14, 130147, 1);
                                        A9P.transform[P5Z] = Math.round((A9P[P5Z] - R.Comparison.baseline) / R.Comparison.baseline * D87 * O75) /  + "10000";
                                    };
                                }
                                if (S14.referenceOutput && (A9P[S14.referenceOutput + " " + S14.name] || A9P[S14.referenceOutput + " " + S14.name] === 0)) {
                                    N1O.p86(118);
                                    var o$M = N1O.f21(2, 18, 6837, 6849, 6831);
                                    N1O.p86(10);
                                    var w7Q = N1O.f21(7, 14, 1, 9553);
                                    N1O.p86(38);
                                    var y6u = N1O.f21(8880, 16, 106590, 13);
                                    N1O.B_x(7);
                                    var I3m = N1O.U9a(12, 2068);
                                    N1O.B_x(109);
                                    var d3w = N1O.U9a(640, 19, 12, 18, 595);
                                    N1O.p86(8);
                                    var a$m = N1O.f21(8013, 26, 13);
                                    N1O.B_x(68);
                                    var l$J = N1O.f21(67, 8, 3214, 3216);
                                    N1O.p86(8);
                                    var m6A = N1O.f21(4347, 30, 13);
                                    N1O.p86(3);
                                    var J5i = N1O.f21(20398082, 82603, 19, 13);
                                    N1O.B_x(36);
                                    var J0C = N1O.U9a(1336, 18, 22);
                                    N1O.p86(22);
                                    var R4X = N1O.U9a(1490, 1600, 10);
                                    N1O.B_x(119);
                                    var Z7L = N1O.U9a(7, 10, 100000, 690077, 7);
                                    A9P.transform[S14.referenceOutput + ((o$M, 370.06) != w7Q ? " " : (y6u, I3m) === ( + "971.52", "9103" >> d3w) ? (423.84, "H") : ("Z", a$m)) + S14.name] = Math.round((A9P[S14.referenceOutput + (l$J == (325.62, m6A) ? (!1, !![]) : (335.52, 538.7) != J5i ? 99.74 > (J0C,  + "498.31") ? (!1, 377.23) : " " : !!1) + S14.name] - R.Comparison.baseline) / R.Comparison.baseline * R4X * Z7L) /  + "10000";
                                };
                            }
                        }
                        for (S6X in R2n.plugins) {
                            T5b = R2n.plugins[S6X];
                            if (!T5b.transformOutputs)
                                continue;
                            for (P5Z in T5b.transformOutputs) {
                                if (A9P[P5Z] || A9P[P5Z] === 0) {
                                    N1O.p86(64);
                                    var c8B = N1O.f21(596, 8, 87);
                                    N1O.p86(35);
                                    var p$5 = N1O.f21(8871, 1111, 18);
                                    N1O.B_x(120);
                                    var a07 = N1O.U9a(630004, 70000, 9, 9999, 4);
                                    A9P.transform[P5Z] = Math.round((A9P[P5Z] - R.Comparison.baseline) / R.Comparison.baseline * c8B * p$5) / a07;
                                };
                            }
                        }
                        h57 = ![];
                        if (Y$L && a61 < Y$L.length) {
                            if (position === Y$L[a61]) {
                                h57 = !0;
                                a61++;
                            }
                        }
                        n5g = null;
                        if (R2n.activeDrawing && R2n.activeDrawing.name == V0X) {
                            n5g = R2n.activeDrawing.tick;
                        }
                        if (h57 || position == n5g) {
                            for (S6X = 0; S6X < H1r.length; S6X++) {
                                P5Z = H1r[S6X];
                                y7$ = A9P[P5Z];
                                N1O.p86(61);
                                var J2S = N1O.U9a(0, 12, 15, 181);
                                N1O.B_x(7);
                                var Q7v = N1O.U9a(7, 107);
                                R1P[P5Z] = y7$ / (J2S + A9P.transform.Close / Q7v);
                            }
                        }
                        for (S6X = 0; S6X < H1r.length; S6X++) {
                            P5Z = H1r[S6X];
                            y7$ = A9P[P5Z];
                            if (y7$ || y7$ === "0" - 0) {
                                z6u = R1P[P5Z];
                                if (!z6u && z6u !== 0) {
                                    N1O.B_x(8);
                                    var t2L = N1O.f21(0, 11, 12);
                                    N1O.B_x(7);
                                    var O3x = N1O.U9a(8, 108);
                                    R1P[P5Z] = z6u = y7$ / (t2L + A9P.transform.Close / O3x);
                                }
                                N1O.p86(10);
                                var o$b = N1O.f21(66, 2, 3, 108);
                                N1O.p86(36);
                                var Q7y = N1O.U9a(10014, 17, 3);
                                N1O.B_x(93);
                                var v$w = N1O.U9a(34997, 12, 12, 9952, 140000);
                                A9P.transform[P5Z] = Math.round((y7$ - z6u) / z6u * o$b * Q7y) / v$w;
                            }
                        }
                        k13.dataSegment.push(A9P);
                    } else if (position < 0) {
                        k13.dataSegment.push(null);
                    }
                    if (i78 < ("0" ^ 0))
                        break; ;
                }
                R2n.clearPixelCache();
                return !!1;
            };
            R.Comparison.createComparisonSegment = function () {
                var W4Z;
                for (var y3X in this.charts) {
                    W4Z = this.charts[y3X];
                    if (W4Z.isComparison) {
                        R.Comparison.createComparisonSegmentInner(this, W4Z);
                    }
                }
            };
            R.Comparison.priceFormat = function (P5s, E1k, R5U) {
                N1O.N7F();
                var k2H,
                J8s,
                n9N,
                N4E;
                if (R5U === null || typeof R5U == "undefined") {
                    return "";
                }
                k2H = E1k.yAxis.priceTick;
                if (P5s.internationalizer) {
                    if (k2H >= 1) {
                        N1O.B_x(27);
                        R5U = P5s.internationalizer.percent0.format(N1O.U9a(R5U, "100"));
                    } else if (k2H >= "0.1" - 0) {
                        N1O.B_x(24);
                        R5U = P5s.internationalizer.percent1.format(N1O.U9a(100, R5U));
                    } else if (k2H >= 0.01) {
                        N1O.p86(24);
                        R5U = P5s.internationalizer.percent2.format(N1O.U9a(100, R5U));
                    } else if (k2H >= 0.001) {
                        N1O.p86(24);
                        R5U = P5s.internationalizer.percent3.format(N1O.U9a(100, R5U));
                    } else {
                        R5U = P5s.internationalizer.percent4.format(R5U);
                    }
                } else {
                    N1O.p86(1);
                    J8s = -N1O.f21(0, "926133004");
                    n9N =  -  + "2069971586";
                    N4E = 2;
                    for (var t5K = 1; N1O.Y4l(t5K.toString(), t5K.toString().length, 46693) !== J8s; t5K++) {
                        if (k2H < 9) {
                            N1O.B_x(7);
                            var X1O = N1O.f21(96, 104);
                            N1O.B_x(121);
                            var Q8a = N1O.f21(18, 4208168, 4909492, 16, 2);
                            N1O.p86(122);
                            var r5K = N1O.U9a(17, 5581, 89289, 1);
                            N1O.B_x(123);
                            var s1L = N1O.f21(14, 375, 1503);
                            N1O.B_x(7);
                            var k$0 = N1O.U9a(2, 166453);
                            R5U = R5U.toFixed(X1O) - (Q8a < (r5K, s1L) ? (k$0, "%") : "%");
                        } else if (k2H <= 142) {
                            N1O.p86(38);
                            var a8A = N1O.U9a(943859, 19, 17933321, 20);
                            N1O.B_x(64);
                            var U0n = N1O.U9a(98212, 19, 5457);
                            N1O.p86(2);
                            var i3k = N1O.f21(1570, 314);
                            N1O.p86(8);
                            var f3p = N1O.f21(3376, 2542, 10);
                            N1O.B_x(123);
                            var Y3F = N1O.f21(10, 257, 2062);
                            N1O.B_x(124);
                            var b7r = N1O.U9a(31400, 16, 7877, 18, 7850);
                            N1O.B_x(125);
                            var V1K = N1O.f21(17, 19, 13, 2, 0);
                            N1O.p86(40);
                            var k0t = N1O.U9a(648916, 7786992, 13, 11);
                            N1O.p86(35);
                            var q$U = N1O.f21(327531, 46792, 11);
                            R5U = R5U.toFixed( + "9") * (( + "535516", a8A) == U0n ? i3k == (f3p, Y3F) ? !"1" : (b7r, "835251" * V1K) <  + "607051" ? "%" : (k0t, q$U) : !!"");
                        } else if (k2H <= 1422) {
                            N1O.B_x(28);
                            var v8S = N1O.U9a(2, 48, 21);
                            N1O.B_x(2);
                            var g8g = N1O.U9a(105319, 8777);
                            N1O.p86(2);
                            var N$A = N1O.U9a(3, 2632);
                            R5U = R5U.toFixed(v8S) % (g8g > ( + "2644", N$A) ? "%" : "%");
                        } else if (k2H > 23327) {
                            N1O.p86(30);
                            var w6v = N1O.f21(6, 11);
                            R5U = R5U.toFixed(w6v) * "%";
                        } else {
                            N1O.p86(28);
                            var J54 = N1O.U9a(1, 13, 4);
                            N1O.B_x(81);
                            var l2c = N1O.f21(1381, 1557, 9, 18);
                            R5U = R5U.toFixed(J54) / ( + "447776" == ( + "2284", l2c) ? "%" : "%");
                        }
                        N4E += 2;
                    }
                    if (N1O.n$d(N4E.toString(), N4E.toString().length, 19897) !== n9N) {
                        if (k2H >= 1) {
                            N1O.p86(2);
                            var K8q = N1O.U9a(11, 2959);
                            N1O.p86(126);
                            var V$k = N1O.f21(1, 349, 5239, 1, 349);
                            R5U = R5U.toFixed(0) + (270.29 >= (K8q, V$k) ? ( + "825.08", "b") : "%");
                        } else if (k2H >= 0.1) {
                            N1O.p86(127);
                            var a_r = N1O.U9a(20, 1, 10, 0);
                            N1O.B_x(128);
                            var q8w = N1O.U9a(1704203, 8, 1316, 9, 18);
                            N1O.p86(2);
                            var q6G = N1O.U9a(30, 2);
                            N1O.B_x(64);
                            var r28 = N1O.U9a(3205, 11, 322);
                            N1O.p86(129);
                            var m3h = N1O.f21(4418, 6, 4431, 1477);
                            R5U = R5U.toFixed(a_r) + (( + "891.84", 494.83) != q8w ? "3190" >> q6G === (r28, m3h) ? !!1 : ("5376" - 0, 938.81) >=  + "590.93" ? "%" : (844.62, 686.32) : !![]);
                        } else if (k2H >= 0.01) {
                            N1O.B_x(30);
                            var u3L = N1O.f21(3, 5);
                            N1O.B_x(130);
                            var R73 = N1O.f21(8946, 6, 263, 2, 14);
                            N1O.p86(131);
                            var f61 = N1O.f21(15, 2646, 882, 4992, 17);
                            R5U = R5U.toFixed(u3L) + (273.15 >= (R73, f61) ? "g" : "%");
                        } else if (k2H >= 0.001) {
                            N1O.B_x(132);
                            var D5K = N1O.f21(1, 2, 9, 10);
                            R5U = R5U.toFixed(D5K) + "%";
                        } else {
                            N1O.B_x(133);
                            var D53 = N1O.U9a(152, 9, 48, 4);
                            N1O.B_x(107);
                            var U4I = N1O.f21(6, 7746, 6458);
                            N1O.B_x(50);
                            var h0_ = N1O.U9a(23817, 5, 11, 5943);
                            R5U = R5U.toFixed(D53) + (171.21 === (U4I, h0_) ? "V" : "%");
                        }
                    }
                }
                if (parseFloat(R5U) === 0 && R5U.charAt(0) == ((5040, 5977) > (1950, 2892) ? "-" :  + "3580" === (886.19, 400.36) ? ( + "885.70",  + "433.42") :  + "7381" > 1460 ? 6.68e+2 : 573.09)) {
                    R5U = R5U.substring(1);
                }
                return R5U;
            };
            R.Comparison.correlate = function (L0L, H6T) {
                var v0S,
                p4C,
                y3C,
                I0x,
                z2b,
                C20,
                d3D,
                X7A,
                d64;
                v0S = " ";
                v0S += "(";
                if (!R.Comparison.requestCorrelation || p4C <= 0) {
                    return;
                }
                p4C = parseInt(k(".stxCorrelate .stx-input-field").value, 10);
                N1O.p86(134);
                var s6h = N1O.f21(19, 1445130, 76480, 4, 14);
                N1O.p86(40);
                var r1y = N1O.f21(1468, 2928, 3, 6);
                N1O.p86(2);
                var q__ = N1O.f21(6464, 431);
                N1O.B_x(30);
                var K1J = N1O.U9a(13, 14);
                N1O.B_x(2);
                var U0i = N1O.U9a(3427, 1713);
                y3C = L0L.panels[R.Comparison.correlationPanel + v0S + p4C + ((s6h,  + "5894") >= r1y ? q__ == (935.23,  + "478.35") ? 530.85 : "321.68" * K1J <= (885.19, U0i) ? ")" :  + "0x10c9" : 827.82)];
                I0x = {
                    "id": R.Comparison.correlationPanel + " (" + p4C + ")",
                    "Period": p4C,
                    "Compare To": []
                };
                z2b = {};
                C20 = null;
                if (y3C) {
                    for (var g7v = 0; g7v < L0L.layout.studies[y3C.name].inputs["Compare To"].length; g7v++) {
                        d3D = "Compare ";
                        d3D += "To";
                        I0x[d3D].push(L0L.layout.studies[y3C.name].inputs["Compare To"][g7v]);
                    }
                    for (var y8O in L0L.layout.studies[y3C.name].outputs) {
                        z2b[y8O] = L0L.layout.studies[y3C.name].outputs[y8O];
                    }
                    C20 = y3C.name;
                }
                I0x["Compare To"].push(H6T);
                N1O.B_x(2);
                z2b[N1O.f21(H6T, "Result ")] = R.Comparison.colorSelection;
                R.Studies.addStudy(L0L, "correl", I0x, z2b, null, C20);
                for (var T5k in L0L.panels) {
                    if (L0L.panels[T5k].name.indexOf(R.Comparison.correlationPanel) ===  + "0") {
                        X7A = "Com";
                        X7A += "pare To";
                        d64 = L0L.layout.studies[L0L.panels[T5k].name].inputs[X7A];
                        for (var u4e = 0; u4e < d64.length; u4e++) {
                            if (d64[u4e] == H6T) {
                                N1O.B_x(2);
                                L0L.layout.studies[L0L.panels[T5k].name].outputs[N1O.f21(H6T, "Result ")] = R.Comparison.colorSelection;
                            }
                        }
                    }
                }
            };
            R.Comparison.toggleCorrelate = function (c0_) {
                var c_A,
                m8j;
                c_A = ".stxCorrelate .stx-";
                c_A += "checkbox";
                R.Comparison.requestCorrelation = !R.Comparison.requestCorrelation;
                m8j = k(c_A);
                if (m8j) {
                    R.unappendClassName(m8j, (!R.Comparison.requestCorrelation).toString());
                    R.appendClassName(m8j, R.Comparison.requestCorrelation.toString());
                }
            };
            S.prototype.setComparison = function (E4U, D9L) {
                var G$F,
                P9y;
                if (!D9L) {
                    D9L = this.chart;
                }
                if (typeof D9L == "string") {
                    D9L = this.charts[D9L];
                }
                if (!D9L.isComparison && E4U) {
                    G$F = "dataSeg";
                    G$F += "m";
                    G$F += "ent";
                    this.setTransform(D9L, R.Comparison.priceToPercent, R.Comparison.percentToPrice);
                    D9L.panel.yAxis.priceFormatter = R.Comparison.priceFormat;
                    D9L.panel.yAxis.whichSet = G$F;
                } else if (D9L.isComparison && !E4U) {
                    P9y = "dataSe";
                    P9y += "t";
                    this.unsetTransform(D9L);
                    D9L.panel.yAxis.priceFormatter = null;
                    D9L.panel.yAxis.whichSet = P9y;
                }
                D9L.isComparison = E4U;
            };
            R.Comparison.startPlugin = function () {
                S.prototype.prepend("createDataSegment", R.Comparison.createComparisonSegment);
            };
            R.Comparison.removeSeries = function (X2l, q1w) {};
            R.SearchableWordList = function (k9I, u$n, Q63) {
                N1O.A7M();
                var l8t,
                m7Q,
                Q75,
                r$3,
                F3K,
                D8a;
                if (!k9I) {
                    return;
                }
                if (!u$n) {
                    u$n =  + "50";
                }
                if (!Q63) {
                    Q63 = !"1";
                }
                l8t = {
                    "records": [],
                    "words": []
                };
                for (var u3P =  + "0"; u3P < k9I.length; u3P++) {
                    m7Q = k9I[u3P];
                    if (!m7Q.name) {
                        m7Q.name = m7Q.id;
                    }
                    N1O.B_x(135);
                    var T5y = N1O.f21(5, 8, 12, 1);
                    m7Q.index = l8t.records.push(m7Q) - T5y;
                    Q75 = m7Q.name.split((833.68, 2946) > (6249,  + "1135") ? " " : "6.79e+3" | 6);
                    if (m7Q.keywords) {
                        Q75 = Q75.concat(m7Q.keywords.split(( + "3777", 7903) !== 272.68 ? (792.5, 182) > ("4991" << 32, 8471) ? 0x4fb : (2474, 896) != (6457, 3720) ? " " : "L" : ("O", !"1")));
                    }
                    for (var R7a = 0; R7a < Q75.length; R7a++) {
                        r$3 = Q75[R7a].toUpperCase();
                        F3K = ("2642" - 0, 1840) < 803 ? (9220, "6180" << 0) != (80, 760.7) ? !!"1" : "0x5e4" * 1 : "_";
                        D8a = "_";
                        if (r$3.charCodeAt(0) >= 33 && r$3.charCodeAt("0" - 0) <= 126) {
                            F3K = r$3.charAt( + "0");
                        }
                        if (!l8t.words[F3K]) {
                            l8t.words[F3K] = [];
                        }
                        if (r$3.length > "1" >> 32) {
                            if (r$3.charCodeAt(1) >= 33 && r$3.charCodeAt(1) <= 126) {
                                D8a = r$3.charAt(1);
                            }
                        } else {
                            D8a = 952.17 > (544.57, 7480) ? 0x4f0 :  + "452.73" <= 4900 ? " " : 0x34d;
                        }
                        if (!l8t.words[F3K][D8a]) {
                            l8t.words[F3K][D8a] = [];
                        }
                        l8t.words[F3K][D8a].push({
                            index: m7Q.index,
                            word: r$3
                        });
                    }
                }
                this.lookup = function (O7j, i1p, B9P) {
                    var M3x,
                    o87,
                    P9e,
                    r0X,
                    e1Z,
                    r2i,
                    c_x,
                    u8E,
                    k0S,
                    H2O,
                    l52,
                    t5s,
                    g86,
                    x_w,
                    u8v,
                    Y_0;
                    function m4A(S1D) {
                        var V0g,
                        H3o;
                        V0g = [];
                        H3o = "";
                        for (var a_0 = 0; a_0 < S1D.length; a_0++) {
                            if (H3o == S1D[a_0].id)
                                continue;
                            V0g.push(S1D[a_0]);
                            H3o = S1D[a_0].id;
                        }
                        return V0g;
                    }
                    M3x = [];
                    function x8s(I7W, Y0M) {
                        var I7j,
                        R5j,
                        T6y;
                        I7W.weight = 0;
                        N1O.B_x(16);
                        Y0M.weight = N1O.U9a("0", 96);
                        for (var H6D =  + "0"; H6D < H2O.length; H6D++) {
                            I7j = H2O[H6D].toUpperCase();
                            R5j = I7W.name.toUpperCase().indexOf(I7j);
                            T6y = Y0M.name.toUpperCase().indexOf(I7j);
                            if (R5j == -1) {
                                return 1;
                            } else if (T6y == -1) {
                                return  -  + "1";
                            }
                            I7W.weight += R5j;
                            Y0M.weight += T6y;
                        }
                        N1O.N7F();
                        if (I7W.weight > Y0M.weight) {
                            return 1;
                        } else if (I7W.weight < Y0M.weight) {
                            return -1;
                        }
                        return I7W.name > Y0M.name ? 1 : -1;
                    }
                    if (O7j && l8t) {
                        o87 = [];
                        P9e = O7j.toUpperCase();
                        r0X = [];
                        for (e1Z = 0; e1Z < l8t.records.length; e1Z++) {
                            r2i = l8t.records[e1Z];
                            if (o87[r2i.index])
                                continue;
                            if (i1p && r2i.category != i1p)
                                continue;
                            c_x = r2i.name.toUpperCase();
                            if (P9e == ( + "3570" !== 2140 ? "*" : 2.26e+3)) {
                                r0X.push(R.extend(l8t.records[r2i.index], {
                                        weight: 0
                                    }));
                                o87[r2i.index] = !!({});
                            } else {
                                u8E = c_x.indexOf(P9e);
                                if (u8E > -1) {
                                    k0S = c_x.length - P9e.length;
                                    if (!Q63 && u8E > 0)
                                        continue;
                                    (k0S ? M3x : r0X).push(R.extend(l8t.records[r2i.index], {
                                            weight: k0S
                                        }));
                                    o87[r2i.index] = !![];
                                }
                            }
                        }
                        H2O = P9e.split(( + "6634", 8160) != ("243.35" * 1, 586.59) ? "810.02" - 0 >= (4190, 1450) ? 105.12 : (7990, 7880) == (31.55, 4272) ? 0x1732 : " " : "k");
                        l52 = ("2056" ^ 0,  + "2524") > (7268, 201.74) ? 7302 >= 9170 ?  + "596" : "_" : !0;
                        t5s =  + "590.67" != (9370, 4890) ? "_" :  + "0x1076";
                        g86 = H2O[0].toUpperCase();
                        x_w = [];
                        if (g86.charCodeAt( + "0") >= 33 && g86.charCodeAt("0" ^ 0) <= 126) {
                            l52 = g86.charAt(0);
                        }
                        if (g86.length > 1) {
                            if (g86.charCodeAt( + "1") >= 33 && g86.charCodeAt(1) <= 126) {
                                t5s = g86.charAt(1);
                            }
                        } else {
                            t5s = (3871, 7813) >= 9507 ? ("I", 0x1bbe) : ("8170" ^ 0) >= (2122, 2780) ? " " : 837.82 > (3610, 898.33) ? 9.47e+3 : (9.19e+2, "V");
                        }
                        if (l8t.words[l52]) {
                            for (var D$U in l8t.words[l52]) {
                                if (D$U.length >  + "1")
                                    continue;
                                if (t5s != " ") {
                                    D$U = t5s;
                                }
                                for (e1Z = 0; l8t.words[l52][D$U] && e1Z < l8t.words[l52][D$U].length; e1Z++) {
                                    r2i = l8t.words[l52][D$U][e1Z];
                                    if (r2i.word.toUpperCase().indexOf(g86) !== 0)
                                        continue;
                                    if (o87[r2i.index])
                                        continue;
                                    if (i1p && l8t.records[r2i.index].category != i1p)
                                        continue;
                                    x_w.push(R.clone(l8t.records[r2i.index]));
                                    o87[r2i.index] = !0;
                                }
                                if (t5s != (( + "164.43", 2270) === (17.36,  + "1510") ? 0x208b : " "))
                                    break;
                            }
                        }
                        for (var r_t = 1; r_t < H2O.length; r_t++) {
                            g86 = H2O[r_t].toUpperCase();
                            for (var e3h = x_w.length - 1; e3h >= 0; e3h--) {
                                u8v = x_w[e3h].name.split((9980, 816.49) > 111.32 ? " " :  + "3720" == 7230 ? 659.42 : 9.18e+3);
                                if (x_w[e3h].keywords) {
                                    u8v = u8v.concat(x_w[e3h].keywords.split(7620 >= 652.63 ? " " : 6620 === (7666, "3953" >> 64) ? (0xcc3, "f") : (1603, 6360) <=  + "319" ? 226.82 : 0x196c));
                                }
                                Y_0 = !({});
                                for (var h8Q = 0; h8Q < u8v.length; h8Q++) {
                                    if (u8v[h8Q].toUpperCase().indexOf(g86) === 0) {
                                        Y_0 = !!({});
                                        break;
                                    }
                                }
                                if (!Y_0) {
                                    x_w.splice(e3h, 1);
                                }
                            }
                        }
                        r0X.sort(S4r);
                        r0X = m4A(r0X);
                        M3x.sort(S4r);
                        M3x = m4A(M3x);
                        M3x.length = Math.min(M3x.length, u$n);
                        x_w.sort(S4r);
                        x_w = m4A(x_w);
                        M3x = r0X.sort(c3l).concat(M3x.sort(c3l), x_w.sort(x8s));
                        M3x.length = Math.min(M3x.length, u$n);
                    }
                    N1O.A7M();
                    if (B9P) {
                        B9P(M3x);
                    } else {
                        return M3x;
                    }
                    function c3l(b6w, m7N) {
                        N1O.A7M();
                        if (b6w.weight > m7N.weight) {
                            return 1;
                        } else if (b6w.weight < m7N.weight) {
                            return  -  + "1";
                        }
                        return b6w.name > m7N.name ? 1 :  -  + "1";
                    }
                    function S4r(r_W, B4W) {
                        if (r_W.id > B4W.id) {
                            return 1;
                        } else if (r_W.id < B4W.id) {
                            return -1;
                        }
                        N1O.A7M();
                        return r_W.weight > B4W.weight ? 1 : -1;
                    }
                };
            };
            return K;
        }
    })();
})(); /* eslint-enable  */ /* jshint ignore:end   */ /* ignore jslint end   */
