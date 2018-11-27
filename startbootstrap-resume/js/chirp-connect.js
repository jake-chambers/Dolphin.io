var ChirpConnectSDK = function(e) {
    "use strict";
    var t, T = void 0 !== T ? T : {},
        n = {};
    for (t in T) T.hasOwnProperty(t) && (n[t] = T[t]);
    T.arguments = [], T.thisProgram = "./this.program", T.quit = function(e, t) {
        throw t
    }, T.preRun = [];
    var i, r, f = !(T.postRun = []),
        d = !1,
        a = !1,
        o = !1;
    if (T.ENVIRONMENT)
        if ("WEB" === T.ENVIRONMENT) f = !0;
        else if ("WORKER" === T.ENVIRONMENT) d = !0;
    else if ("NODE" === T.ENVIRONMENT) a = !0;
    else {
        if ("SHELL" !== T.ENVIRONMENT) throw new Error("Module['ENVIRONMENT'] value is not valid. must be one of: WEB|WORKER|NODE|SHELL.");
        o = !0
    } else f = "object" == typeof window, d = "function" == typeof importScripts, a = "object" == typeof process && "function" == typeof require && !f && !d, o = !f && !a && !d;
    if (a) T.read = function(e, t) {
        var n;
        return i || (i = require("fs")), r || (r = require("path")), e = r.normalize(e), n = i.readFileSync(e), t ? n : n.toString()
    }, T.readBinary = function(e) {
        var t = T.read(e, !0);
        return t.buffer || (t = new Uint8Array(t)), v(t.buffer), t
    }, 1 < process.argv.length && (T.thisProgram = process.argv[1].replace(/\\/g, "/")), T.arguments = process.argv.slice(2), "undefined" != typeof module && (module.exports = T), process.on("uncaughtException", function(e) {
        if (!(e instanceof tn)) throw e
    }), process.on("unhandledRejection", function(e, t) {
        T.printErr("node.js exiting due to unhandled promise rejection"), process.exit(1)
    }), T.inspect = function() {
        return "[Emscripten Module object]"
    };
    else if (o) "undefined" != typeof read && (T.read = function(e) {
        return read(e)
    }), T.readBinary = function(e) {
        var t;
        return "function" == typeof readbuffer ? new Uint8Array(readbuffer(e)) : (v("object" == typeof(t = read(e, "binary"))), t)
    }, "undefined" != typeof scriptArgs ? T.arguments = scriptArgs : void 0 !== arguments && (T.arguments = arguments), "function" == typeof quit && (T.quit = function(e, t) {
        quit(e)
    });
    else {
        if (!f && !d) throw new Error("unknown runtime environment");
        T.read = function(e) {
            var t = new XMLHttpRequest;
            return t.open("GET", e, !1), t.send(null), t.responseText
        }, d && (T.readBinary = function(e) {
            var t = new XMLHttpRequest;
            return t.open("GET", e, !1), t.responseType = "arraybuffer", t.send(null), new Uint8Array(t.response)
        }), T.readAsync = function(e, t, n) {
            var i = new XMLHttpRequest;
            i.open("GET", e, !0), i.responseType = "arraybuffer", i.onload = function() {
                200 == i.status || 0 == i.status && i.response ? t(i.response) : n()
            }, i.onerror = n, i.send(null)
        }, T.setWindowTitle = function(e) {
            document.title = e
        }
    }
    for (t in T.print = "undefined" != typeof console ? console.log.bind(console) : "undefined" != typeof print ? print : null, T.printErr = "undefined" != typeof printErr ? printErr : "undefined" != typeof console && console.warn.bind(console) || T.print, T.print = T.print, T.printErr = T.printErr, n) n.hasOwnProperty(t) && (T[t] = n[t]);
    n = void 0;

    function p(e) {
        v(!G);
        var t = K;
        return K = K + e + 15 & -16, t
    }

    function m(e) {
        v(te);
        var t = Y[te >> 2],
            n = t + e + 15 & -16;
        if ((Y[te >> 2] = n, ce <= n) && !oe()) return Y[te >> 2] = t, 0;
        return t
    }

    function s(e, t) {
        return t || (t = 16), e = Math.ceil(e / t) * t
    }

    function h(e) {
        switch (e) {
            case "i1":
            case "i8":
                return 1;
            case "i16":
                return 2;
            case "i32":
                return 4;
            case "i64":
                return 8;
            case "float":
                return 4;
            case "double":
                return 8;
            default:
                if ("*" === e[e.length - 1]) return 4;
                if ("i" === e[0]) {
                    var t = parseInt(e.substr(1));
                    return v(t % 8 == 0), t / 8
                }
                return 0
        }
    }

    function c(e) {
        c.shown || (c.shown = {}), c.shown[e] || (c.shown[e] = 1, T.printErr(e))
    }
    en = $t = Zt = function() {
        an("cannot use the stack before compiled code is ready to run, and has provided stack access")
    };
    var _ = new Array(20);

    function u(e, t) {
        switch (e) {
            case 1:
                return "i8";
            case 2:
                return "i16";
            case 4:
                return t ? "float" : "i32";
            case 8:
                return "double";
            default:
                v(0)
        }
    }

    function l(e, t, n, i) {
        e <= 0 && an("segmentation fault storing " + n + " bytes to address " + e), e % n != 0 && an("alignment error storing to address " + e + ", which was expected to be aligned to a multiple of " + n), G ? (e + n > Y[te >> 2] && an("segmentation fault, exceeded the top of the available dynamic heap when storing " + n + " bytes to address " + e + ". STATICTOP=" + K + ", DYNAMICTOP=" + Y[te >> 2]), v(te), v(Y[te >> 2] <= ce)) : K < e + n && an("segmentation fault, exceeded the top of the available static heap when storing " + n + " bytes to address " + e + ". STATICTOP=" + K), O(e, t, u(n, i), 1)
    }

    function y(e, t, n) {
        l(e, t, n, !0)
    }

    function E(e, t, n, i) {
        e <= 0 && an("segmentation fault loading " + t + " bytes from address " + e), e % t != 0 && an("alignment error loading from address " + e + ", which was expected to be aligned to a multiple of " + t), G ? (e + t > Y[te >> 2] && an("segmentation fault, exceeded the top of the available dynamic heap when loading " + t + " bytes from address " + e + ". STATICTOP=" + K + ", DYNAMICTOP=" + Y[te >> 2]), v(te), v(Y[te >> 2] <= ce)) : K < e + t && an("segmentation fault, exceeded the top of the available static heap when loading " + t + " bytes from address " + e + ". STATICTOP=" + K);
        var r = u(t, i),
            a = x(e, r, 1);
        return n && (a = function(e, t, n) {
            if (0 <= e) return e;
            return t <= 32 ? 2 * Math.abs(1 << t - 1) + e : Math.pow(2, t) + e
        }(a, parseInt(r.substr(1)))), a
    }

    function w(e, t, n) {
        return E(e, t, n, !0)
    }
    var g = 0;

    function v(e, t) {
        e || an("Assertion failed: " + t)
    }

    function b(e) {
        var t = T["_" + e];
        return v(t, "Cannot call unknown function " + e + ", make sure it is exported"), t
    }
    var R = {
            stackSave: function() {
                en()
            },
            stackRestore: function() {
                $t()
            },
            arrayToC: function(e) {
                var t, n, i = Zt(e.length);
                return n = i, v(0 <= (t = e).length, "writeArrayToMemory array must have a length (should be an array or typed array)"), H.set(t, n), i
            },
            stringToC: function(e) {
                var t = 0;
                if (null != e && 0 !== e) {
                    var n = 1 + (e.length << 2);
                    X(e, t = Zt(n), n)
                }
                return t
            }
        },
        I = {
            string: R.stringToC,
            array: R.arrayToC
        };

    function M(e, t, n, i, r) {
        var a = b(e),
            o = [],
            s = 0;
        if (v("array" !== t, 'Return type should not be "array".'), i)
            for (var c = 0; c < i.length; c++) {
                var _ = I[n[c]];
                _ ? (0 === s && (s = en()), o[c] = _(i[c])) : o[c] = i[c]
            }
        var u = a.apply(null, o);
        return "string" === t ? u = F(u) : "boolean" === t && (u = Boolean(u)), 0 !== s && $t(s), u
    }

    function O(e, t, n, i) {
        if ("*" === (n = n || "i8").charAt(n.length - 1) && (n = "i32"), i) switch (n) {
            case "i1":
            case "i8":
                H[e >> 0] = t;
                break;
            case "i16":
                Q[e >> 1] = t;
                break;
            case "i32":
                Y[e >> 2] = t;
                break;
            case "i64":
                tempI64 = [t >>> 0, (tempDouble = t, 1 <= +ye(tempDouble) ? 0 < tempDouble ? (0 | ve(+Te(tempDouble / 4294967296), 4294967295)) >>> 0 : ~~+Ee((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], Y[e >> 2] = tempI64[0], Y[e + 4 >> 2] = tempI64[1];
                break;
            case "float":
                V[e >> 2] = t;
                break;
            case "double":
                q[e >> 3] = t;
                break;
            default:
                an("invalid type for setValue: " + n)
        } else switch (n) {
            case "i1":
            case "i8":
                l(0 | e, 0 | t, 1);
                break;
            case "i16":
                l(0 | e, 0 | t, 2);
                break;
            case "i32":
                l(0 | e, 0 | t, 4);
                break;
            case "i64":
                tempI64 = [t >>> 0, (tempDouble = t, 1 <= +ye(tempDouble) ? 0 < tempDouble ? (0 | ve(+Te(tempDouble / 4294967296), 4294967295)) >>> 0 : ~~+Ee((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], l(0 | e, 0 | tempI64[0], 4), l(e + 4 | 0, 0 | tempI64[1], 4);
                break;
            case "float":
                y(0 | e, ge(t), 4);
                break;
            case "double":
                y(0 | e, +t, 8);
                break;
            default:
                an("invalid type for setValue: " + n)
        }
    }

    function x(e, t, n) {
        if ("*" === (t = t || "i8").charAt(t.length - 1) && (t = "i32"), n) switch (t) {
            case "i1":
            case "i8":
                return H[e >> 0];
            case "i16":
                return Q[e >> 1];
            case "i32":
            case "i64":
                return Y[e >> 2];
            case "float":
                return V[e >> 2];
            case "double":
                return q[e >> 3];
            default:
                an("invalid type for getValue: " + t)
        } else switch (t) {
            case "i1":
            case "i8":
                return 0 | E(0 | e, 1, 0);
            case "i16":
                return 0 | E(0 | e, 2, 0);
            case "i32":
                return 0 | E(0 | e, 4, 0);
            case "i64":
                return 0 | E(0 | e, 8, 0);
            case "float":
                return ge(w(0 | e, 4, 0));
            case "double":
                return +w(0 | e, 8, 0);
            default:
                an("invalid type for getValue: " + t)
        }
        return null
    }
    var A = 0,
        N = 2,
        S = 4;

    function C(e, t, n, i) {
        var r, a;
        "number" == typeof e ? (r = !0, a = e) : (r = !1, a = e.length);
        var o, s = "string" == typeof t ? t : null;
        if (o = n == S ? i : ["function" == typeof Jt ? Jt : p, Zt, p, m][void 0 === n ? N : n](Math.max(a, s ? 1 : t.length)), r) {
            var c;
            for (v(0 == (3 & (i = o))), c = o + (-4 & a); i < c; i += 4) Y[i >> 2] = 0;
            for (c = o + a; i < c;) H[i++ >> 0] = 0;
            return o
        }
        if ("i8" === s) return e.subarray || e.slice ? B.set(e, o) : B.set(new Uint8Array(e), o), o;
        for (var _, u, l, f = 0; f < a;) {
            var d = e[f];
            0 !== (_ = s || t[f]) ? (v(_, "Must know what type to store in allocate!"), "i64" == _ && (_ = "i32"), O(o + f, d, _), l !== _ && (u = h(_), l = _), f += u) : f++
        }
        return o
    }

    function F(e, t) {
        if (0 === t || !e) return "";
        for (var n, i = 0, r = 0; v(e + r < ce), i |= n = 0 | E(e + r | 0, 1, 1), (0 != n || t) && (r++, !t || r != t););
        t || (t = r);
        var a = "";
        if (i < 128) {
            for (var o; 0 < t;) o = String.fromCharCode.apply(String, B.subarray(e, e + Math.min(t, 1024))), a = a ? a + o : o, e += 1024, t -= 1024;
            return a
        }
        return D(B, e)
    }
    var k = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;

    function D(e, t) {
        for (var n = t; e[n];) ++n;
        if (16 < n - t && e.subarray && k) return k.decode(e.subarray(t, n));
        for (var i, r, a, o, s, c = "";;) {
            if (!(i = e[t++])) return c;
            if (128 & i)
                if (r = 63 & e[t++], 192 != (224 & i))
                    if (a = 63 & e[t++], 224 == (240 & i) ? i = (15 & i) << 12 | r << 6 | a : (o = 63 & e[t++], 240 == (248 & i) ? i = (7 & i) << 18 | r << 12 | a << 6 | o : (s = 63 & e[t++], i = 248 == (252 & i) ? (3 & i) << 24 | r << 18 | a << 12 | o << 6 | s : (1 & i) << 30 | r << 24 | a << 18 | o << 12 | s << 6 | 63 & e[t++])), i < 65536) c += String.fromCharCode(i);
                    else {
                        var _ = i - 65536;
                        c += String.fromCharCode(55296 | _ >> 10, 56320 | 1023 & _)
                    } else c += String.fromCharCode((31 & i) << 6 | r);
            else c += String.fromCharCode(i)
        }
    }

    function U(e, t, n, i) {
        if (!(0 < i)) return 0;
        for (var r = n, a = n + i - 1, o = 0; o < e.length; ++o) {
            var s = e.charCodeAt(o);
            if (55296 <= s && s <= 57343 && (s = 65536 + ((1023 & s) << 10) | 1023 & e.charCodeAt(++o)), s <= 127) {
                if (a <= n) break;
                t[n++] = s
            } else if (s <= 2047) {
                if (a <= n + 1) break;
                t[n++] = 192 | s >> 6, t[n++] = 128 | 63 & s
            } else if (s <= 65535) {
                if (a <= n + 2) break;
                t[n++] = 224 | s >> 12, t[n++] = 128 | s >> 6 & 63, t[n++] = 128 | 63 & s
            } else if (s <= 2097151) {
                if (a <= n + 3) break;
                t[n++] = 240 | s >> 18, t[n++] = 128 | s >> 12 & 63, t[n++] = 128 | s >> 6 & 63, t[n++] = 128 | 63 & s
            } else if (s <= 67108863) {
                if (a <= n + 4) break;
                t[n++] = 248 | s >> 24, t[n++] = 128 | s >> 18 & 63, t[n++] = 128 | s >> 12 & 63, t[n++] = 128 | s >> 6 & 63, t[n++] = 128 | 63 & s
            } else {
                if (a <= n + 5) break;
                t[n++] = 252 | s >> 30, t[n++] = 128 | s >> 24 & 63, t[n++] = 128 | s >> 18 & 63, t[n++] = 128 | s >> 12 & 63, t[n++] = 128 | s >> 6 & 63, t[n++] = 128 | 63 & s
            }
        }
        return t[n] = 0, n - r
    }

    function X(e, t, n) {
        return v("number" == typeof n, "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!"), U(e, B, t, n)
    }
    "undefined" != typeof TextDecoder && new TextDecoder("utf-16le");

    function P(e) {
        return e.replace(/__Z[\w\d_]+/g, function(e) {
            var t, n = (t = e, c("warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling"), t);
            return e === n ? e : e + " [" + n + "]"
        })
    }

    function j() {
        var e = function() {
            var t = new Error;
            if (!t.stack) {
                try {
                    throw new Error(0)
                } catch (e) {
                    t = e
                }
                if (!t.stack) return "(no stack trace available)"
            }
            return t.stack.toString()
        }();
        return T.extraStackTrace && (e += "\n" + T.extraStackTrace()), P(e)
    }
    var L, H, B, Q, W, Y, z, V, q, K, G, J, Z, $, ee, te, ne = 65536;

    function ie() {
        T.HEAP8 = H = new Int8Array(L), T.HEAP16 = Q = new Int16Array(L), T.HEAP32 = Y = new Int32Array(L), T.HEAPU8 = B = new Uint8Array(L), T.HEAPU16 = W = new Uint16Array(L), T.HEAPU32 = z = new Uint32Array(L), T.HEAPF32 = V = new Float32Array(L), T.HEAPF64 = q = new Float64Array(L)
    }

    function re() {
        if (34821223 == z[($ >> 2) - 1] && 2310721022 == z[($ >> 2) - 2] || an("Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x02135467, but received 0x" + z[($ >> 2) - 2].toString(16) + " " + z[($ >> 2) - 1].toString(16)), 1668509029 !== Y[0]) throw "Runtime error: The application has corrupted its heap memory area (address zero)!"
    }

    function ae() {
        an("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " + ce + ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ")
    }

    function oe() {
        ae()
    }
    K = Z = $ = te = 0, G = !1;
    var se = T.TOTAL_STACK || 5242880,
        ce = T.TOTAL_MEMORY || 16777216;
    if (ce < se && T.printErr("TOTAL_MEMORY should be larger than TOTAL_STACK, was " + ce + "! (TOTAL_STACK=" + se + ")"), v("undefined" != typeof Int32Array && "undefined" != typeof Float64Array && void 0 !== Int32Array.prototype.subarray && void 0 !== Int32Array.prototype.set, "JS engine does not provide full typed array support"), T.buffer ? v((L = T.buffer).byteLength === ce, "provided buffer should be " + ce + " bytes, but it is " + L.byteLength) : ("object" == typeof WebAssembly && "function" == typeof WebAssembly.Memory ? (v(ce % ne == 0), T.wasmMemory = new WebAssembly.Memory({
            initial: ce / ne,
            maximum: ce / ne
        }), L = T.wasmMemory.buffer) : L = new ArrayBuffer(ce), v(L.byteLength === ce), T.buffer = L), ie(), Y[0] = 1668509029, Q[1] = 25459, 115 !== B[2] || 99 !== B[3]) throw "Runtime error: expected the system to be little-endian!";

    function _e(e) {
        for (; 0 < e.length;) {
            var t = e.shift();
            if ("function" != typeof t) {
                var n = t.func;
                "number" == typeof n ? void 0 === t.arg ? T.dynCall_v(n) : T.dynCall_vi(n, t.arg) : n(void 0 === t.arg ? null : t.arg)
            } else t()
        }
    }
    var ue = [],
        le = [],
        fe = [],
        de = [],
        pe = [],
        me = !1,
        he = !1;
    v(Math.imul && Math.fround && Math.clz32 && Math.trunc, "this is a legacy browser, build with LEGACY_VM_SUPPORT");
    var ye = Math.abs,
        Ee = Math.ceil,
        Te = Math.floor,
        we = Math.pow,
        ge = Math.fround,
        ve = Math.min,
        be = 0,
        Re = null,
        Ie = null,
        Me = {};

    function Oe(e) {
        be++, T.monitorRunDependencies && T.monitorRunDependencies(be), e ? (v(!Me[e]), Me[e] = 1, null === Re && "undefined" != typeof setInterval && (Re = setInterval(function() {
            if (g) return clearInterval(Re), void(Re = null);
            var e = !1;
            for (var t in Me) e || (e = !0, T.printErr("still waiting on run dependencies:")), T.printErr("dependency: " + t);
            e && T.printErr("(end of list)")
        }, 1e4))) : T.printErr("warning: run dependency added without ID")
    }

    function xe(e) {
        if (be--, T.monitorRunDependencies && T.monitorRunDependencies(be), e ? (v(Me[e]), delete Me[e]) : T.printErr("warning: run dependency removed without ID"), 0 == be && (null !== Re && (clearInterval(Re), Re = null), Ie)) {
            var t = Ie;
            Ie = null, t()
        }
    }
    T.preloadedImages = {}, T.preloadedAudios = {};
    var Ae = {
        error: function() {
            an("Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with  -s FORCE_FILESYSTEM=1")
        },
        init: function() {
            Ae.error()
        },
        createDataFile: function() {
            Ae.error()
        },
        createPreloadedFile: function() {
            Ae.error()
        },
        createLazyFile: function() {
            Ae.error()
        },
        open: function() {
            Ae.error()
        },
        mkdev: function() {
            Ae.error()
        },
        registerDevice: function() {
            Ae.error()
        },
        analyzePath: function() {
            Ae.error()
        },
        loadFilesFromDB: function() {
            Ae.error()
        },
        ErrnoError: function() {
            Ae.error()
        }
    };
    T.FS_createDataFile = Ae.createDataFile, T.FS_createPreloadedFile = Ae.createPreloadedFile;
    var Ne = "data:application/octet-stream;base64,";

    function Se(e) {
        return String.prototype.startsWith ? e.startsWith(Ne) : 0 === e.indexOf(Ne)
    }! function() {
        var e = "chirp-connect.wast",
            s = "https://public.chirp.io/wasm/3.0.0/chirp-connect.wasm",
            t = "chirp-connect.temp.asm.js";
        "function" == typeof T.locateFile && (Se(e) || (e = T.locateFile(e)), Se(s) || (s = T.locateFile(s)), Se(t) || (t = T.locateFile(t)));
        var c = {
                global: null,
                env: null,
                asm2wasm: {
                    "f64-rem": function(e, t) {
                        return e % t
                    },
                    debugger: function() {}
                },
                parent: T
            },
            _ = null;

        function u(e) {
            var t = T.buffer;
            e.byteLength < t.byteLength && T.printErr("the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here");
            var n, i = new Int8Array(t);
            new Int8Array(e).set(i), n = e, T.buffer = L = n, ie()
        }

        function l() {
            try {
                if (T.wasmBinary) return new Uint8Array(T.wasmBinary);
                if (T.readBinary) return T.readBinary(s);
                throw "on the web, we need the wasm binary to be preloaded and set on Module['wasmBinary']. emcc.py will do that for you when generating HTML (but not JS)"
            } catch (e) {
                an(e)
            }
        }

        function o(e, t, n) {
            if ("object" != typeof WebAssembly) return T.printErr("no native wasm support detected"), !1;
            if (!(T.wasmMemory instanceof WebAssembly.Memory)) return T.printErr("no native wasm Memory in use"), !1;

            function i(e, t) {
                (_ = e.exports).memory && u(_.memory), T.asm = _, T.usingWasm = !0, xe("wasm-instantiate")
            }
            if (t.memory = T.wasmMemory, c.global = {
                    NaN: NaN,
                    Infinity: 1 / 0
                }, c["global.Math"] = Math, c.env = t, Oe("wasm-instantiate"), T.instantiateWasm) try {
                return T.instantiateWasm(c, i)
            } catch (e) {
                return T.printErr("Module.instantiateWasm callback failed with error: " + e), !1
            }
            var r = T;

            function a(e) {
                v(T === r, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?"), r = null, i(e.instance, e.module)
            }

            function o(e) {
                (T.wasmBinary || !f && !d || "function" != typeof fetch ? new Promise(function(e, t) {
                    e(l())
                }) : fetch(s, {
                    credentials: "same-origin"
                }).then(function(e) {
                    if (!e.ok) throw "failed to load wasm binary file at '" + s + "'";
                    return e.arrayBuffer()
                }).catch(function() {
                    return l()
                })).then(function(e) {
                    return WebAssembly.instantiate(e, c)
                }).then(e).catch(function(e) {
                    T.printErr("failed to asynchronously prepare wasm: " + e), an(e)
                })
            }
            return T.wasmBinary || "function" != typeof WebAssembly.instantiateStreaming || Se(s) || "function" != typeof fetch ? o(a) : WebAssembly.instantiateStreaming(fetch(s, {
                credentials: "same-origin"
            }), c).then(a).catch(function(e) {
                T.printErr("wasm streaming compile failed: " + e), T.printErr("falling back to ArrayBuffer instantiation"), o(a)
            }), {}
        }
        T.asmPreload = T.asm, T.reallocBuffer = function(e) {
            return function(t) {
                var e, n, i = T.usingWasm ? ne : 16777216;
                0 < (e = t) % (n = i) && (e += n - e % n), t = e;
                var r = T.buffer.byteLength;
                if (T.usingWasm) try {
                    return -1 !== T.wasmMemory.grow((t - r) / 65536) ? T.buffer = T.wasmMemory.buffer : null
                } catch (e) {
                    return console.error("Module.reallocBuffer: Attempted to grow from " + r + " bytes to " + t + " bytes, but got error: " + e), null
                }
            }(e)
        }, T.asm = function(e, t, n) {
            var i;
            if (!(t = t).table) {
                var r = T.wasmTableSize;
                void 0 === r && (r = 1024);
                var a = T.wasmMaxTableSize;
                "object" == typeof WebAssembly && "function" == typeof WebAssembly.Table ? t.table = void 0 !== a ? new WebAssembly.Table({
                    initial: r,
                    maximum: a,
                    element: "anyfunc"
                }) : new WebAssembly.Table({
                    initial: r,
                    element: "anyfunc"
                }) : t.table = new Array(r), T.wasmTable = t.table
            }
            return t.memoryBase || (t.memoryBase = T.STATIC_BASE), t.tableBase || (t.tableBase = 0), (i = o(0, t)) || an("no binaryen method succeeded. consider enabling more options, like interpreting, if you want that: https://github.com/kripken/emscripten/wiki/WebAssembly#binaryen-methods"), i
        }
    }();
    var Ce = [function() {
        return navigator.onLine
    }, function() {
        T.onAuthenticationError()
    }, function(e) {
        T.printErr('emscripten_fetch("' + F(e) + '") failed! Synchronous blocking XHRs and IndexedDB operations are not supported on the main browser thread. Try dropping the EMSCRIPTEN_FETCH_SYNCHRONOUS flag, or run with the linker flag --proxy-to-worker to decouple main C runtime thread from the main browser thread.')
    }];
    K = 18144, le.push();
    T.STATIC_BASE = 1024, T.STATIC_BUMP = 17120;
    var Fe = K;
    K += 16, v(Fe % 8 == 0);
    var ke = {
        varargs: 0,
        get: function(e) {
            return ke.varargs += 4, 0 | E(ke.varargs - 4 | 0, 4, 0)
        },
        getStr: function() {
            return F(ke.get())
        },
        get64: function() {
            var e = ke.get(),
                t = ke.get();
            return v(0 <= e ? 0 === t : -1 === t), e
        },
        getZero: function() {
            v(0 === ke.get())
        }
    };

    function De() {
        var e = T._fflush;
        e && e(0);
        var t = Ue.printChar;
        if (t) {
            var n = Ue.buffers;
            n[1].length && t(1, 10), n[2].length && t(2, 10)
        }
    }

    function Ue(e, t) {
        ke.varargs = t;
        try {
            var n = ke.get(),
                i = ke.get(),
                r = ke.get(),
                a = 0;
            Ue.buffers || (Ue.buffers = [null, [],
                []
            ], Ue.printChar = function(e, t) {
                var n = Ue.buffers[e];
                v(n), 0 === t || 10 === t ? ((1 === e ? T.print : T.printErr)(D(n, 0)), n.length = 0) : n.push(t)
            });
            for (var o = 0; o < r; o++) {
                for (var s = 0 | E(i + 8 * o | 0, 4, 0), c = 0 | E(i + (8 * o + 4) | 0, 4, 0), _ = 0; _ < c; _++) Ue.printChar(n, B[s + _]);
                a += c
            }
            return a
        } catch (e) {
            return void 0 !== Ae && e instanceof Ae.ErrnoError || an(e), -e.errno
        }
    }

    function Xe() {
        an()
    }

    function Pe() {
        return a || "undefined" != typeof dateNow || (f || d) && self.performance && self.performance.now
    }
    var je = 22;

    function Le(e) {
        return T.___errno_location ? l(0 | T.___errno_location(), 0 | e, 4) : T.printErr("failed to set errno from JS"), e
    }
    var He = K;
    K += 48;
    C(rt("GMT"), "i8", N);
    var Be = K,
        Qe = K += 16,
        We = K += 16;

    function Ye() {
        if (!Ye.called) {
            Ye.called = !0, l(0 | We, 60 * (new Date).getTimezoneOffset() | 0, 4);
            var e = new Date(2e3, 0, 1),
                t = new Date(2e3, 6, 1);
            l(0 | Qe, 0 | Number(e.getTimezoneOffset() != t.getTimezoneOffset()), 4);
            var n = o(e),
                i = o(t),
                r = C(rt(n), "i8", A),
                a = C(rt(i), "i8", A);
            t.getTimezoneOffset() < e.getTimezoneOffset() ? (l(0 | Be, 0 | r, 4), l(Be + 4 | 0, 0 | a, 4)) : (l(0 | Be, 0 | a, 4), l(Be + 4 | 0, 0 | r, 4))
        }

        function o(e) {
            var t = e.toTimeString().match(/\(([A-Za-z ]+)\)$/);
            return t ? t[1] : "GMT"
        }
    }

    function ze(e, t) {
        Ye();
        var n = new Date(1e3 * (0 | E(0 | e, 4, 0)));
        l(0 | t, 0 | n.getSeconds(), 4), l(t + 4 | 0, 0 | n.getMinutes(), 4), l(t + 8 | 0, 0 | n.getHours(), 4), l(t + 12 | 0, 0 | n.getDate(), 4), l(t + 16 | 0, 0 | n.getMonth(), 4), l(t + 20 | 0, n.getFullYear() - 1900 | 0, 4), l(t + 24 | 0, 0 | n.getDay(), 4);
        var i = new Date(n.getFullYear(), 0, 1);
        l(t + 28 | 0, 0 | ((n.getTime() - i.getTime()) / 864e5 | 0), 4), l(t + 36 | 0, -60 * n.getTimezoneOffset() | 0, 4);
        var r = new Date(2e3, 6, 1).getTimezoneOffset(),
            a = i.getTimezoneOffset(),
            o = 0 | (r != a && n.getTimezoneOffset() == Math.min(a, r));
        return l(t + 32 | 0, 0 | o, 4), l(t + 40 | 0, 0 | (0 | E(Be + (o ? 4 : 0) | 0, 4, 0)), 4), t
    }

    function Ve(e, t) {
        var n = 0 | E(0 | e, 4, 0),
            i = 0 | E(e + 4 | 0, 4, 0),
            r = 0 | E(e + 8 | 0, 4, 0),
            a = 0 | E(e + 12 | 0, 4, 0),
            o = 0 | E(e + 16 | 0, 4, 0),
            s = 0 | E(e + 20 | 0, 4, 0);
        return X(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][0 | E(e + 24 | 0, 4, 0)] + " " + ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][o] + (a < 10 ? "  " : " ") + a + (r < 10 ? " 0" : " ") + r + (i < 10 ? ":0" : ":") + i + (n < 10 ? ":0" : ":") + n + " " + (1900 + s) + "\n", t, 26), t
    }

    function qe(e, t) {
        var n = en(),
            i = Ve(ze(e, Zt(44)), t);
        return $t(n), i
    }
    K += 16, K += 48;
    var Ke = {
        attr_t_offset_requestMethod: 0,
        attr_t_offset_userData: 32,
        attr_t_offset_onsuccess: 36,
        attr_t_offset_onerror: 40,
        attr_t_offset_onprogress: 44,
        attr_t_offset_attributes: 48,
        attr_t_offset_timeoutMSecs: 52,
        attr_t_offset_withCredentials: 56,
        attr_t_offset_destinationPath: 60,
        attr_t_offset_userName: 64,
        attr_t_offset_password: 68,
        attr_t_offset_requestHeaders: 72,
        attr_t_offset_overriddenMimeType: 76,
        attr_t_offset_requestData: 80,
        attr_t_offset_requestDataSize: 84,
        fetch_t_offset_id: 0,
        fetch_t_offset_userData: 4,
        fetch_t_offset_url: 8,
        fetch_t_offset_data: 12,
        fetch_t_offset_numBytes: 16,
        fetch_t_offset_dataOffset: 24,
        fetch_t_offset_totalBytes: 32,
        fetch_t_offset_readyState: 40,
        fetch_t_offset_status: 42,
        fetch_t_offset_statusText: 44,
        fetch_t_offset___proxyState: 108,
        fetch_t_offset___attributes: 112,
        xhrs: [],
        worker: void 0,
        dbInstance: void 0,
        setu64: function(e, t) {
            z[e >> 2] = t, z[e + 4 >> 2] = t / 4294967296 | 0
        },
        openDatabase: function(e, t, n, i) {
            try {
                var r = indexedDB.open(e, t)
            } catch (e) {
                return i(e)
            }
            r.onupgradeneeded = function(e) {
                var t = e.target.result;
                t.objectStoreNames.contains("FILES") && t.deleteObjectStore("FILES"), t.createObjectStore("FILES")
            }, r.onsuccess = function(e) {
                n(e.target.result)
            }, r.onerror = function(e) {
                i(e)
            }
        },
        initFetchWorker: function() {
            var e = C(32768, "i32*", 3);
            Ke.worker.postMessage({
                cmd: "init",
                TOTAL_MEMORY: ce,
                DYNAMICTOP_PTR: te,
                STACKTOP: e,
                STACK_MAX: e + 131072,
                queuePtr: et,
                buffer: B.buffer
            })
        },
        staticInit: function() {
            Ke.openDatabase("emscripten_filesystem", 1, function(e) {
                Ke.dbInstance = e, "undefined" != typeof ENVIRONMENT_IS_FETCH_WORKER && ENVIRONMENT_IS_FETCH_WORKER || xe("library_fetch_init")
            }, function() {
                Ke.dbInstance = !1
            }), "undefined" != typeof ENVIRONMENT_IS_FETCH_WORKER && ENVIRONMENT_IS_FETCH_WORKER || Oe("library_fetch_init")
        }
    };

    function Ge(r, a, o, i) {
        var e = z[r + Ke.fetch_t_offset_url >> 2];
        if (e) {
            var t = F(e),
                n = r + Ke.fetch_t_offset___attributes,
                s = F(n);
            s || (s = "GET");
            z[n + Ke.attr_t_offset_userData >> 2];
            var c = z[n + Ke.attr_t_offset_attributes >> 2],
                _ = z[n + Ke.attr_t_offset_timeoutMSecs >> 2],
                u = !!z[n + Ke.attr_t_offset_withCredentials >> 2],
                l = (z[n + Ke.attr_t_offset_destinationPath >> 2], z[n + Ke.attr_t_offset_userName >> 2]),
                f = z[n + Ke.attr_t_offset_password >> 2],
                d = z[n + Ke.attr_t_offset_requestHeaders >> 2],
                p = z[n + Ke.attr_t_offset_overriddenMimeType >> 2],
                m = z[n + Ke.attr_t_offset_requestData >> 2],
                h = z[n + Ke.attr_t_offset_requestDataSize >> 2],
                y = !!(1 & c),
                E = !!(2 & c),
                T = !!(64 & c),
                w = l ? F(l) : void 0,
                g = f ? F(f) : void 0,
                v = p ? F(p) : void 0,
                b = new XMLHttpRequest;
            if (b.withCredentials = u, b.open(s, t, !T, w, g), T || (b.timeout = _), b.url_ = t, b.responseType = E ? "moz-chunked-arraybuffer" : "arraybuffer", p && b.overrideMimeType(v), d)
                for (;;) {
                    var R = z[d >> 2];
                    if (!R) break;
                    var I = z[d + 4 >> 2];
                    if (!I) break;
                    d += 8;
                    var M = F(R),
                        O = F(I);
                    b.setRequestHeader(M, O)
                }
            Ke.xhrs.push(b);
            var x = Ke.xhrs.length;
            z[r + Ke.fetch_t_offset_id >> 2] = x;
            var A = m && h ? B.slice(m, m + h) : null;
            b.onload = function(e) {
                var t = b.response ? b.response.byteLength : 0,
                    n = 0,
                    i = 0;
                y && !E && (n = Jt(i = t), B.set(new Uint8Array(b.response), n)), z[r + Ke.fetch_t_offset_data >> 2] = n, Ke.setu64(r + Ke.fetch_t_offset_numBytes, i), Ke.setu64(r + Ke.fetch_t_offset_dataOffset, 0), t && Ke.setu64(r + Ke.fetch_t_offset_totalBytes, t), W[r + Ke.fetch_t_offset_readyState >> 1] = b.readyState, 4 === b.readyState && 0 === b.status && (b.status = 0 < t ? 200 : 404), W[r + Ke.fetch_t_offset_status >> 1] = b.status, b.statusText && X(b.statusText, r + Ke.fetch_t_offset_statusText, 64), 200 == b.status ? a && a(r, b, e) : o && o(r, b, e)
            }, b.onerror = function(e) {
                var t = b.status;
                4 == b.readyState && 0 == t && (t = 404), z[r + Ke.fetch_t_offset_data >> 2] = 0, Ke.setu64(r + Ke.fetch_t_offset_numBytes, 0), Ke.setu64(r + Ke.fetch_t_offset_dataOffset, 0), Ke.setu64(r + Ke.fetch_t_offset_totalBytes, 0), W[r + Ke.fetch_t_offset_readyState >> 1] = b.readyState, W[r + Ke.fetch_t_offset_status >> 1] = t, o && o(r, b, e)
            }, b.ontimeout = function(e) {
                o && o(r, b, e)
            }, b.onprogress = function(e) {
                var t = y && E && b.response ? b.response.byteLength : 0,
                    n = 0;
                y && E && (n = Jt(t), B.set(new Uint8Array(b.response), n)), z[r + Ke.fetch_t_offset_data >> 2] = n, Ke.setu64(r + Ke.fetch_t_offset_numBytes, t), Ke.setu64(r + Ke.fetch_t_offset_dataOffset, e.loaded - t), Ke.setu64(r + Ke.fetch_t_offset_totalBytes, e.total), W[r + Ke.fetch_t_offset_readyState >> 1] = b.readyState, 3 <= b.readyState && 0 === b.status && 0 < e.loaded && (b.status = 200), W[r + Ke.fetch_t_offset_status >> 1] = b.status, b.statusText && X(b.statusText, r + Ke.fetch_t_offset_statusText, 64), i && i(r, b, e)
            };
            try {
                b.send(A)
            } catch (e) {
                o && o(r, b, e)
            }
        } else o(r, 0, "no url specified!")
    }

    function Je(e, t, n, i, r) {
        if (e) {
            var a = t + Ke.fetch_t_offset___attributes,
                o = z[a + Ke.attr_t_offset_destinationPath >> 2];
            o || (o = z[t + Ke.fetch_t_offset_url >> 2]);
            var s = F(o);
            try {
                var c = e.transaction(["FILES"], "readwrite").objectStore("FILES").put(n, s);
                c.onsuccess = function(e) {
                    W[t + Ke.fetch_t_offset_readyState >> 1] = 4, W[t + Ke.fetch_t_offset_status >> 1] = 200, X("OK", t + Ke.fetch_t_offset_statusText, 64), i(t, 0, s)
                }, c.onerror = function(e) {
                    W[t + Ke.fetch_t_offset_readyState >> 1] = 4, W[t + Ke.fetch_t_offset_status >> 1] = 413, X("Payload Too Large", t + Ke.fetch_t_offset_statusText, 64), r(t, 0, e)
                }
            } catch (e) {
                r(t, 0, e)
            }
        } else r(t, 0, "IndexedDB not available!")
    }

    function Ze(e, r, a, o) {
        if (e) {
            var t = r + Ke.fetch_t_offset___attributes,
                n = z[t + Ke.attr_t_offset_destinationPath >> 2];
            n || (n = z[r + Ke.fetch_t_offset_url >> 2]);
            var i = F(n);
            try {
                var s = e.transaction(["FILES"], "readonly").objectStore("FILES").get(i);
                s.onsuccess = function(e) {
                    if (e.target.result) {
                        var t = e.target.result,
                            n = t.byteLength || t.length,
                            i = Jt(n);
                        B.set(new Uint8Array(t), i), z[r + Ke.fetch_t_offset_data >> 2] = i, Ke.setu64(r + Ke.fetch_t_offset_numBytes, n), Ke.setu64(r + Ke.fetch_t_offset_dataOffset, 0), Ke.setu64(r + Ke.fetch_t_offset_totalBytes, n), W[r + Ke.fetch_t_offset_readyState >> 1] = 4, W[r + Ke.fetch_t_offset_status >> 1] = 200, X("OK", r + Ke.fetch_t_offset_statusText, 64), a(r, 0, t)
                    } else W[r + Ke.fetch_t_offset_readyState >> 1] = 4, W[r + Ke.fetch_t_offset_status >> 1] = 404, X("Not Found", r + Ke.fetch_t_offset_statusText, 64), o(r, 0, "no data")
                }, s.onerror = function(e) {
                    W[r + Ke.fetch_t_offset_readyState >> 1] = 4, W[r + Ke.fetch_t_offset_status >> 1] = 404, X("Not Found", r + Ke.fetch_t_offset_statusText, 64), o(r, 0, e)
                }
            } catch (e) {
                o(r, 0, e)
            }
        } else o(r, 0, "IndexedDB not available!")
    }

    function $e(e, n, i, t) {
        if (e) {
            var r = n + Ke.fetch_t_offset___attributes,
                a = z[r + Ke.attr_t_offset_destinationPath >> 2];
            a || (a = z[n + Ke.fetch_t_offset_url >> 2]);
            var o = F(a);
            try {
                var s = e.transaction(["FILES"], "readwrite").objectStore("FILES").delete(o);
                s.onsuccess = function(e) {
                    var t = e.target.result;
                    z[n + Ke.fetch_t_offset_data >> 2] = 0, Ke.setu64(n + Ke.fetch_t_offset_numBytes, 0), Ke.setu64(n + Ke.fetch_t_offset_dataOffset, 0), Ke.setu64(n + Ke.fetch_t_offset_dataOffset, 0), W[n + Ke.fetch_t_offset_readyState >> 1] = 4, W[n + Ke.fetch_t_offset_status >> 1] = 200, X("OK", n + Ke.fetch_t_offset_statusText, 64), i(n, 0, t)
                }, s.onerror = function(e) {
                    W[n + Ke.fetch_t_offset_readyState >> 1] = 4, W[n + Ke.fetch_t_offset_status >> 1] = 404, X("Not Found", n + Ke.fetch_t_offset_statusText, 64), t(n, 0, e)
                }
            } catch (e) {
                t(n, 0, e)
            }
        } else t(n, 0, "IndexedDB not available!")
    }
    var et = C(12, "i32*", N);
    var tt = Ee;
    var nt = ye,
        it = we;

    function rt(e, t, n) {
        var i = 0 < n ? n : function(e) {
                for (var t = 0, n = 0; n < e.length; ++n) {
                    var i = e.charCodeAt(n);
                    55296 <= i && i <= 57343 && (i = 65536 + ((1023 & i) << 10) | 1023 & e.charCodeAt(++n)), i <= 127 ? ++t : t += i <= 2047 ? 2 : i <= 65535 ? 3 : i <= 2097151 ? 4 : i <= 67108863 ? 5 : 6
                }
                return t
            }(e) + 1,
            r = new Array(i),
            a = U(e, r, 0, r.length);
        return t && (r.length = a), r
    }
    Xe = a ? function() {
        var e = process.hrtime();
        return 1e3 * e[0] + e[1] / 1e6
    } : "undefined" != typeof dateNow ? dateNow : "object" == typeof self && self.performance && "function" == typeof self.performance.now ? function() {
        return self.performance.now()
    } : "object" == typeof performance && "function" == typeof performance.now ? function() {
        return performance.now()
    } : Date.now, Ke.staticInit(), te = p(4), J = Z = s(K), ee = s($ = J + se), Y[te >> 2] = ee, G = !0, v(ee < ce, "TOTAL_MEMORY not big enough for stack");
    var at = ["0", "jsCall_ii_0", "jsCall_ii_1", "jsCall_ii_2", "jsCall_ii_3", "jsCall_ii_4", "jsCall_ii_5", "jsCall_ii_6", "jsCall_ii_7", "jsCall_ii_8", "jsCall_ii_9", "jsCall_ii_10", "jsCall_ii_11", "jsCall_ii_12", "jsCall_ii_13", "jsCall_ii_14", "jsCall_ii_15", "jsCall_ii_16", "jsCall_ii_17", "jsCall_ii_18", "jsCall_ii_19", "___stdio_close", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ot = ["0", "jsCall_iii_0", "jsCall_iii_1", "jsCall_iii_2", "jsCall_iii_3", "jsCall_iii_4", "jsCall_iii_5", "jsCall_iii_6", "jsCall_iii_7", "jsCall_iii_8", "jsCall_iii_9", "jsCall_iii_10", "jsCall_iii_11", "jsCall_iii_12", "jsCall_iii_13", "jsCall_iii_14", "jsCall_iii_15", "jsCall_iii_16", "jsCall_iii_17", "jsCall_iii_18", "jsCall_iii_19", "_sort_uint8_array", "_chirp_peak_cmp", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        st = ["0", "jsCall_iiii_0", "jsCall_iiii_1", "jsCall_iiii_2", "jsCall_iiii_3", "jsCall_iiii_4", "jsCall_iiii_5", "jsCall_iiii_6", "jsCall_iiii_7", "jsCall_iiii_8", "jsCall_iiii_9", "jsCall_iiii_10", "jsCall_iiii_11", "jsCall_iiii_12", "jsCall_iiii_13", "jsCall_iiii_14", "jsCall_iiii_15", "jsCall_iiii_16", "jsCall_iiii_17", "jsCall_iiii_18", "jsCall_iiii_19", "___stdio_write", "___stdio_seek", "___stdout_write", "_sn_write", "0", "0", "0", "0", "0", "0", "0"],
        ct = ["0", "jsCall_vi_0", "jsCall_vi_1", "jsCall_vi_2", "jsCall_vi_3", "jsCall_vi_4", "jsCall_vi_5", "jsCall_vi_6", "jsCall_vi_7", "jsCall_vi_8", "jsCall_vi_9", "jsCall_vi_10", "jsCall_vi_11", "jsCall_vi_12", "jsCall_vi_13", "jsCall_vi_14", "jsCall_vi_15", "jsCall_vi_16", "jsCall_vi_17", "jsCall_vi_18", "jsCall_vi_19", "_validate_success_callback", "_validate_failure_callback", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        _t = ["0", "jsCall_viii_0", "jsCall_viii_1", "jsCall_viii_2", "jsCall_viii_3", "jsCall_viii_4", "jsCall_viii_5", "jsCall_viii_6", "jsCall_viii_7", "jsCall_viii_8", "jsCall_viii_9", "jsCall_viii_10", "jsCall_viii_11", "jsCall_viii_12", "jsCall_viii_13", "jsCall_viii_14", "jsCall_viii_15", "jsCall_viii_16", "jsCall_viii_17", "jsCall_viii_18", "jsCall_viii_19", "__chirp_encode_started_callback", "__chirp_encode_finished_callback", "__chirp_decode_started_callback", "__chirp_decode_finished_callback", "0", "0", "0", "0", "0", "0", "0"],
        ut = ["0", "jsCall_viiii_0", "jsCall_viiii_1", "jsCall_viiii_2", "jsCall_viiii_3", "jsCall_viiii_4", "jsCall_viiii_5", "jsCall_viiii_6", "jsCall_viiii_7", "jsCall_viiii_8", "jsCall_viiii_9", "jsCall_viiii_10", "jsCall_viiii_11", "jsCall_viiii_12", "jsCall_viiii_13", "jsCall_viiii_14", "jsCall_viiii_15", "jsCall_viiii_16", "jsCall_viiii_17", "jsCall_viiii_18", "jsCall_viiii_19", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
    T.wasmTableSize = 192, T.wasmMaxTableSize = 192, T.asmGlobalArg = {}, T.asmLibraryArg = {
        abort: an,
        assert: v,
        enlargeMemory: oe,
        getTotalMemory: function() {
            return ce
        },
        abortOnCannotGrowMemory: ae,
        abortStackOverflow: function(e) {
            an("Stack overflow! Attempted to allocate " + e + " bytes on the stack, but stack has only " + ($ - en() + e) + " bytes available!")
        },
        segfault: function() {
            an("segmentation fault")
        },
        alignfault: function() {
            an("alignment fault")
        },
        ftfault: function() {
            an("Function table mask error")
        },
        nullFunc_ii: function(e) {
            T.printErr("Invalid function pointer '" + e + "' called with signature 'ii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)"), T.printErr("This pointer might make sense in another type signature: iii: " + ot[e] + "  iiii: " + st[e] + "  vi: " + ct[e] + "  viii: " + _t[e] + "  viiii: " + ut[e] + "  "), an(e)
        },
        nullFunc_iii: function(e) {
            T.printErr("Invalid function pointer '" + e + "' called with signature 'iii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)"), T.printErr("This pointer might make sense in another type signature: ii: " + at[e] + "  iiii: " + st[e] + "  viii: " + _t[e] + "  vi: " + ct[e] + "  viiii: " + ut[e] + "  "), an(e)
        },
        nullFunc_iiii: function(e) {
            T.printErr("Invalid function pointer '" + e + "' called with signature 'iiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)"), T.printErr("This pointer might make sense in another type signature: iii: " + ot[e] + "  ii: " + at[e] + "  viii: " + _t[e] + "  viiii: " + ut[e] + "  vi: " + ct[e] + "  "), an(e)
        },
        nullFunc_vi: function(e) {
            T.printErr("Invalid function pointer '" + e + "' called with signature 'vi'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)"), T.printErr("This pointer might make sense in another type signature: viii: " + _t[e] + "  viiii: " + ut[e] + "  ii: " + at[e] + "  iii: " + ot[e] + "  iiii: " + st[e] + "  "), an(e)
        },
        nullFunc_viii: function(e) {
            T.printErr("Invalid function pointer '" + e + "' called with signature 'viii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)"), T.printErr("This pointer might make sense in another type signature: vi: " + ct[e] + "  viiii: " + ut[e] + "  iii: " + ot[e] + "  ii: " + at[e] + "  iiii: " + st[e] + "  "), an(e)
        },
        nullFunc_viiii: function(e) {
            T.printErr("Invalid function pointer '" + e + "' called with signature 'viiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)"), T.printErr("This pointer might make sense in another type signature: viii: " + _t[e] + "  vi: " + ct[e] + "  iiii: " + st[e] + "  iii: " + ot[e] + "  ii: " + at[e] + "  "), an(e)
        },
        invoke_ii: function(e, t) {
            try {
                return T.dynCall_ii(e, t)
            } catch (e) {
                if ("number" != typeof e && "longjmp" !== e) throw e;
                T.setThrew(1, 0)
            }
        },
        jsCall_ii: function(e, t) {
            return _[e](t)
        },
        invoke_iii: function(e, t, n) {
            try {
                return T.dynCall_iii(e, t, n)
            } catch (e) {
                if ("number" != typeof e && "longjmp" !== e) throw e;
                T.setThrew(1, 0)
            }
        },
        jsCall_iii: function(e, t, n) {
            return _[e](t, n)
        },
        invoke_iiii: function(e, t, n, i) {
            try {
                return T.dynCall_iiii(e, t, n, i)
            } catch (e) {
                if ("number" != typeof e && "longjmp" !== e) throw e;
                T.setThrew(1, 0)
            }
        },
        jsCall_iiii: function(e, t, n, i) {
            return _[e](t, n, i)
        },
        invoke_vi: function(e, t) {
            try {
                T.dynCall_vi(e, t)
            } catch (e) {
                if ("number" != typeof e && "longjmp" !== e) throw e;
                T.setThrew(1, 0)
            }
        },
        jsCall_vi: function(e, t) {
            _[e](t)
        },
        invoke_viii: function(e, t, n, i) {
            try {
                T.dynCall_viii(e, t, n, i)
            } catch (e) {
                if ("number" != typeof e && "longjmp" !== e) throw e;
                T.setThrew(1, 0)
            }
        },
        jsCall_viii: function(e, t, n, i) {
            _[e](t, n, i)
        },
        invoke_viiii: function(e, t, n, i, r) {
            try {
                T.dynCall_viiii(e, t, n, i, r)
            } catch (e) {
                if ("number" != typeof e && "longjmp" !== e) throw e;
                T.setThrew(1, 0)
            }
        },
        jsCall_viiii: function(e, t, n, i, r) {
            _[e](t, n, i, r)
        },
        ___setErrNo: Le,
        ___syscall140: function(e, t) {
            ke.varargs = t;
            try {
                var n = ke.getStreamFromFD(),
                    i = (ke.get(), ke.get()),
                    r = ke.get(),
                    a = ke.get(),
                    o = i;
                return Ae.llseek(n, o, a), l(0 | r, 0 | n.position, 4), n.getdents && 0 === o && 0 === a && (n.getdents = null), 0
            } catch (e) {
                return void 0 !== Ae && e instanceof Ae.ErrnoError || an(e), -e.errno
            }
        },
        ___syscall146: Ue,
        ___syscall54: function(e, t) {
            ke.varargs = t;
            try {
                return 0
            } catch (e) {
                return void 0 !== Ae && e instanceof Ae.ErrnoError || an(e), -e.errno
            }
        },
        ___syscall6: function(e, t) {
            ke.varargs = t;
            try {
                var n = ke.getStreamFromFD();
                return Ae.close(n), 0
            } catch (e) {
                return void 0 !== Ae && e instanceof Ae.ErrnoError || an(e), -e.errno
            }
        },
        __emscripten_fetch_cache_data: Je,
        __emscripten_fetch_delete_cached_data: $e,
        __emscripten_fetch_load_cached_data: Ze,
        __emscripten_fetch_xhr: Ge,
        __emscripten_get_fetch_work_queue: function() {
            return et
        },
        _asctime_r: Ve,
        _clock_gettime: function(e, t) {
            var n;
            if (0 === e) n = Date.now();
            else {
                if (1 !== e || !Pe()) return Le(je), -1;
                n = Xe()
            }
            return l(0 | t, 0 | n / 1e3, 4), l(t + 4 | 0, 0 | n % 1e3 * 1e3 * 1e3, 4), 0
        },
        _ctime: function(e) {
            return qe(e, He)
        },
        _ctime_r: qe,
        _emscripten_asm_const_i: function(e) {
            return Ce[e]()
        },
        _emscripten_asm_const_ii: function(e, t) {
            return Ce[e](t)
        },
        _emscripten_get_now: Xe,
        _emscripten_get_now_is_monotonic: Pe,
        _emscripten_is_main_browser_thread: function() {
            return !d
        },
        _emscripten_is_main_runtime_thread: function() {
            return 1
        },
        _emscripten_memcpy_big: function(e, t, n) {
            return B.set(B.subarray(t, t + n), e), e
        },
        _emscripten_start_fetch: function(e, i, r, a) {
            void 0 !== T && (T.noExitRuntime = !0);
            var t = e + Ke.fetch_t_offset___attributes,
                n = F(t),
                o = z[t + Ke.attr_t_offset_onsuccess >> 2],
                s = z[t + Ke.attr_t_offset_onerror >> 2],
                c = z[t + Ke.attr_t_offset_onprogress >> 2],
                _ = z[t + Ke.attr_t_offset_attributes >> 2],
                u = !!(4 & _),
                l = !!(32 & _),
                f = function(e, t, n) {
                    o ? T.dynCall_vi(o, e) : i && i(e)
                },
                d = function(e, t, n) {
                    Je(Ke.dbInstance, e, t.response, function(e, t, n) {
                        o ? T.dynCall_vi(o, e) : i && i(e)
                    }, function(e, t, n) {
                        o ? T.dynCall_vi(o, e) : i && i(e)
                    })
                },
                p = function(e, t, n) {
                    c ? T.dynCall_vi(c, e) : a && a(e)
                },
                m = function(e, t, n) {
                    s ? T.dynCall_vi(s, e) : r && r(e)
                };
            if (16 & _ && "EM_IDB_STORE" !== n && "EM_IDB_DELETE" !== n) {
                if (l) return 0;
                Ge(e, u ? d : f, m, p)
            } else {
                if (!Ke.dbInstance) return m(e), 0;
                if ("EM_IDB_STORE" === n) {
                    var h = z[t + Ke.attr_t_offset_requestData >> 2],
                        y = z[t + Ke.attr_t_offset_requestDataSize >> 2],
                        E = B.slice(h, h + y);
                    Je(Ke.dbInstance, e, E, f, m)
                } else "EM_IDB_DELETE" === n ? $e(Ke.dbInstance, e, f, m) : Ze(Ke.dbInstance, e, f, l ? m : u ? function(e, t, n) {
                    Ge(e, d, m, p)
                } : function(e, t, n) {
                    Ge(e, f, m, p)
                })
            }
            return e
        },
        _gettimeofday: function(e) {
            var t = Date.now();
            return l(0 | e, 0 | t / 1e3, 4), l(e + 4 | 0, 0 | t % 1e3 * 1e3, 4), 0
        },
        _llvm_ceil_f64: tt,
        _llvm_exp2_f32: function(e) {
            return Math.pow(2, e)
        },
        _llvm_fabs_f32: nt,
        _llvm_pow_f32: it,
        _localtime_r: ze,
        _mktime: function(e) {
            Ye();
            var t = new Date(1900 + (0 | E(e + 20 | 0, 4, 0)), 0 | E(e + 16 | 0, 4, 0), 0 | E(e + 12 | 0, 4, 0), 0 | E(e + 8 | 0, 4, 0), 0 | E(e + 4 | 0, 4, 0), 0 | E(0 | e, 4, 0), 0),
                n = 0 | E(e + 32 | 0, 4, 0),
                i = t.getTimezoneOffset(),
                r = new Date(t.getFullYear(), 0, 1),
                a = new Date(2e3, 6, 1).getTimezoneOffset(),
                o = r.getTimezoneOffset(),
                s = Math.min(o, a);
            if (n < 0) l(e + 32 | 0, 0 | Number(a != o && s == i), 4);
            else if (0 < n != (s == i)) {
                var c = Math.max(o, a),
                    _ = 0 < n ? s : c;
                t.setTime(t.getTime() + 6e4 * (_ - i))
            }
            return l(e + 24 | 0, 0 | t.getDay(), 4), l(e + 28 | 0, 0 | (t.getTime() - r.getTime()) / 864e5, 4), t.getTime() / 1e3 | 0
        },
        _tzset: Ye,
        flush_NO_FILESYSTEM: De,
        DYNAMICTOP_PTR: te,
        tempDoublePtr: Fe,
        ABORT: g,
        STACKTOP: Z,
        STACK_MAX: $
    };
    var lt = T.asm(T.asmGlobalArg, T.asmLibraryArg, L),
        ft = lt._chirp_connect_as_string;
    lt._chirp_connect_as_string = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), ft.apply(null, arguments)
    };
    var dt = lt._chirp_connect_error_code_to_string;
    lt._chirp_connect_error_code_to_string = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), dt.apply(null, arguments)
    };
    var pt = lt._chirp_connect_get_duration_for_payload_length;
    lt._chirp_connect_get_duration_for_payload_length = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), pt.apply(null, arguments)
    };
    var mt = lt._chirp_connect_get_info;
    lt._chirp_connect_get_info = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), mt.apply(null, arguments)
    };
    var ht = lt._chirp_connect_get_max_payload_length;
    lt._chirp_connect_get_max_payload_length = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), ht.apply(null, arguments)
    };
    var yt = lt._chirp_connect_get_protocol_name;
    lt._chirp_connect_get_protocol_name = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), yt.apply(null, arguments)
    };
    var Et = lt._chirp_connect_get_protocol_version;
    lt._chirp_connect_get_protocol_version = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Et.apply(null, arguments)
    };
    var Tt = lt._chirp_connect_get_sample_rate;
    lt._chirp_connect_get_sample_rate = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Tt.apply(null, arguments)
    };
    var wt = lt._chirp_connect_get_state;
    lt._chirp_connect_get_state = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), wt.apply(null, arguments)
    };
    var gt = lt._chirp_connect_get_volume;
    lt._chirp_connect_get_volume = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), gt.apply(null, arguments)
    };
    var vt = lt._chirp_connect_process_input;
    lt._chirp_connect_process_input = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), vt.apply(null, arguments)
    };
    var bt = lt._chirp_connect_process_output;
    lt._chirp_connect_process_output = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), bt.apply(null, arguments)
    };
    var Rt = lt._chirp_connect_random_payload;
    lt._chirp_connect_random_payload = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Rt.apply(null, arguments)
    };
    var It = lt._chirp_connect_send;
    lt._chirp_connect_send = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), It.apply(null, arguments)
    };
    var Mt = lt._chirp_connect_set_callbacks;
    lt._chirp_connect_set_callbacks = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Mt.apply(null, arguments)
    };
    var Ot = lt._chirp_connect_set_random_seed;
    lt._chirp_connect_set_random_seed = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Ot.apply(null, arguments)
    };
    var xt = lt._chirp_connect_set_sample_rate;
    lt._chirp_connect_set_sample_rate = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), xt.apply(null, arguments)
    };
    var At = lt._chirp_connect_set_volume;
    lt._chirp_connect_set_volume = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), At.apply(null, arguments)
    };
    var Nt = lt._chirp_connect_start;
    lt._chirp_connect_start = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Nt.apply(null, arguments)
    };
    var St = lt._chirp_connect_stop;
    lt._chirp_connect_stop = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), St.apply(null, arguments)
    };
    var Ct = lt._chirp_connect_wasm_process;
    lt._chirp_connect_wasm_process = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Ct.apply(null, arguments)
    };
    var Ft = lt._del_chirp_connect_wasm;
    lt._del_chirp_connect_wasm = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Ft.apply(null, arguments)
    };
    var kt = lt._free;
    lt._free = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), kt.apply(null, arguments)
    };
    var Dt = lt._llvm_bswap_i32;
    lt._llvm_bswap_i32 = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Dt.apply(null, arguments)
    };
    var Ut = lt._malloc;
    lt._malloc = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Ut.apply(null, arguments)
    };
    var Xt = lt._memmove;
    lt._memmove = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Xt.apply(null, arguments)
    };
    var Pt = lt._new_chirp_connect_wasm;
    lt._new_chirp_connect_wasm = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Pt.apply(null, arguments)
    };
    var jt = lt._pthread_mutex_lock;
    lt._pthread_mutex_lock = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), jt.apply(null, arguments)
    };
    var Lt = lt._pthread_mutex_unlock;
    lt._pthread_mutex_unlock = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Lt.apply(null, arguments)
    };
    var Ht = lt._roundf;
    lt._roundf = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Ht.apply(null, arguments)
    };
    var Bt = lt._sbrk;
    lt._sbrk = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Bt.apply(null, arguments)
    };
    var Qt = lt.establishStackSpace;
    lt.establishStackSpace = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Qt.apply(null, arguments)
    };
    var Wt = lt.getTempRet0;
    lt.getTempRet0 = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Wt.apply(null, arguments)
    };
    var Yt = lt.setDynamicTop;
    lt.setDynamicTop = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Yt.apply(null, arguments)
    };
    var zt = lt.setTempRet0;
    lt.setTempRet0 = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), zt.apply(null, arguments)
    };
    var Vt = lt.setThrew;
    lt.setThrew = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Vt.apply(null, arguments)
    };
    var qt = lt.stackAlloc;
    lt.stackAlloc = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), qt.apply(null, arguments)
    };
    var Kt = lt.stackRestore;
    lt.stackRestore = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Kt.apply(null, arguments)
    };
    var Gt = lt.stackSave;
    lt.stackSave = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Gt.apply(null, arguments)
    }, T.asm = lt;
    T._chirp_connect_as_string = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm._chirp_connect_as_string.apply(null, arguments)
    }, T._chirp_connect_error_code_to_string = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm._chirp_connect_error_code_to_string.apply(null, arguments)
    }, T._chirp_connect_get_duration_for_payload_length = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm._chirp_connect_get_duration_for_payload_length.apply(null, arguments)
    }, T._chirp_connect_get_info = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm._chirp_connect_get_info.apply(null, arguments)
    }, T._chirp_connect_get_max_payload_length = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm._chirp_connect_get_max_payload_length.apply(null, arguments)
    }, T._chirp_connect_get_protocol_name = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm._chirp_connect_get_protocol_name.apply(null, arguments)
    }, T._chirp_connect_get_protocol_version = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm._chirp_connect_get_protocol_version.apply(null, arguments)
    }, T._chirp_connect_get_sample_rate = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm._chirp_connect_get_sample_rate.apply(null, arguments)
    }, T._chirp_connect_get_state = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm._chirp_connect_get_state.apply(null, arguments)
    }, T._chirp_connect_get_volume = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm._chirp_connect_get_volume.apply(null, arguments)
    }, T._chirp_connect_process_input = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm._chirp_connect_process_input.apply(null, arguments)
    }, T._chirp_connect_process_output = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm._chirp_connect_process_output.apply(null, arguments)
    }, T._chirp_connect_random_payload = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm._chirp_connect_random_payload.apply(null, arguments)
    }, T._chirp_connect_send = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm._chirp_connect_send.apply(null, arguments)
    }, T._chirp_connect_set_callbacks = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm._chirp_connect_set_callbacks.apply(null, arguments)
    }, T._chirp_connect_set_random_seed = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm._chirp_connect_set_random_seed.apply(null, arguments)
    }, T._chirp_connect_set_sample_rate = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm._chirp_connect_set_sample_rate.apply(null, arguments)
    }, T._chirp_connect_set_volume = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm._chirp_connect_set_volume.apply(null, arguments)
    }, T._chirp_connect_start = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm._chirp_connect_start.apply(null, arguments)
    }, T._chirp_connect_stop = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm._chirp_connect_stop.apply(null, arguments)
    }, T._chirp_connect_wasm_process = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm._chirp_connect_wasm_process.apply(null, arguments)
    }, T._del_chirp_connect_wasm = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm._del_chirp_connect_wasm.apply(null, arguments)
    }, T._free = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm._free.apply(null, arguments)
    }, T._llvm_bswap_i32 = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm._llvm_bswap_i32.apply(null, arguments)
    };
    var Jt = T._malloc = function() {
            return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm._malloc.apply(null, arguments)
        },
        Zt = (T._memcpy = function() {
            return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm._memcpy.apply(null, arguments)
        }, T._memmove = function() {
            return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm._memmove.apply(null, arguments)
        }, T._memset = function() {
            return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm._memset.apply(null, arguments)
        }, T._new_chirp_connect_wasm = function() {
            return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm._new_chirp_connect_wasm.apply(null, arguments)
        }, T._pthread_mutex_lock = function() {
            return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm._pthread_mutex_lock.apply(null, arguments)
        }, T._pthread_mutex_unlock = function() {
            return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm._pthread_mutex_unlock.apply(null, arguments)
        }, T._roundf = function() {
            return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm._roundf.apply(null, arguments)
        }, T._sbrk = function() {
            return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm._sbrk.apply(null, arguments)
        }, T.establishStackSpace = function() {
            return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm.establishStackSpace.apply(null, arguments)
        }, T.getTempRet0 = function() {
            return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm.getTempRet0.apply(null, arguments)
        }, T.runPostSets = function() {
            return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm.runPostSets.apply(null, arguments)
        }, T.setDynamicTop = function() {
            return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm.setDynamicTop.apply(null, arguments)
        }, T.setTempRet0 = function() {
            return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm.setTempRet0.apply(null, arguments)
        }, T.setThrew = function() {
            return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm.setThrew.apply(null, arguments)
        }, T.stackAlloc = function() {
            return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm.stackAlloc.apply(null, arguments)
        }),
        $t = T.stackRestore = function() {
            return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm.stackRestore.apply(null, arguments)
        },
        en = T.stackSave = function() {
            return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm.stackSave.apply(null, arguments)
        };
    T.dynCall_ii = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm.dynCall_ii.apply(null, arguments)
    }, T.dynCall_iii = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm.dynCall_iii.apply(null, arguments)
    }, T.dynCall_iiii = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm.dynCall_iiii.apply(null, arguments)
    }, T.dynCall_vi = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm.dynCall_vi.apply(null, arguments)
    }, T.dynCall_viii = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm.dynCall_viii.apply(null, arguments)
    }, T.dynCall_viiii = function() {
        return v(me, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), v(!he, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), T.asm.dynCall_viiii.apply(null, arguments)
    };

    function tn(e) {
        this.name = "ExitStatus", this.message = "Program terminated with exit(" + e + ")", this.status = e
    }

    function nn(e) {
        function t() {
            T.calledRun || (T.calledRun = !0, g || (re(), me || (me = !0, _e(le)), re(), _e(fe), T.onRuntimeInitialized && T.onRuntimeInitialized(), v(!T._main, 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]'), function() {
                if (re(), T.postRun)
                    for ("function" == typeof T.postRun && (T.postRun = [T.postRun]); T.postRun.length;) e = T.postRun.shift(), pe.unshift(e);
                var e;
                _e(pe)
            }()))
        }
        e = e || T.arguments, 0 < be || (v(0 == (3 & $)), z[($ >> 2) - 1] = 34821223, z[($ >> 2) - 2] = 2310721022, function() {
            if (T.preRun)
                for ("function" == typeof T.preRun && (T.preRun = [T.preRun]); T.preRun.length;) e = T.preRun.shift(), ue.unshift(e);
            var e;
            _e(ue)
        }(), 0 < be || T.calledRun || (T.setStatus ? (T.setStatus("Running..."), setTimeout(function() {
            setTimeout(function() {
                T.setStatus("")
            }, 1), t()
        }, 1)) : t(), re()))
    }
    T.asm = lt, T.intArrayFromString = rt, T.intArrayToString = function(e) {
        for (var t = [], n = 0; n < e.length; n++) {
            var i = e[n];
            255 < i && (v(!1, "Character code " + i + " (" + String.fromCharCode(i) + ")  at offset " + n + " not in 0x00-0xFF."), i &= 255), t.push(String.fromCharCode(i))
        }
        return t.join("")
    }, T.ccall = M, T.cwrap = function(e, t, n) {
        n = n || [];
        var i = b(e),
            r = n.every(function(e) {
                return "number" === e
            });
        return "string" !== t && r ? i : function() {
            return M(e, t, n, arguments)
        }
    }, T.setValue || (T.setValue = function() {
        an("'setValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.getValue = x, T.allocate = C, T.getMemory || (T.getMemory = function() {
        an("'getMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
    }), T.Pointer_stringify = F, T.AsciiToString || (T.AsciiToString = function() {
        an("'AsciiToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.stringToAscii || (T.stringToAscii = function() {
        an("'stringToAscii' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.UTF8ArrayToString || (T.UTF8ArrayToString = function() {
        an("'UTF8ArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.UTF8ToString || (T.UTF8ToString = function() {
        an("'UTF8ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.stringToUTF8Array || (T.stringToUTF8Array = function() {
        an("'stringToUTF8Array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.stringToUTF8 || (T.stringToUTF8 = function() {
        an("'stringToUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.lengthBytesUTF8 || (T.lengthBytesUTF8 = function() {
        an("'lengthBytesUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.UTF16ToString || (T.UTF16ToString = function() {
        an("'UTF16ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.stringToUTF16 || (T.stringToUTF16 = function() {
        an("'stringToUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.lengthBytesUTF16 || (T.lengthBytesUTF16 = function() {
        an("'lengthBytesUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.UTF32ToString || (T.UTF32ToString = function() {
        an("'UTF32ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.stringToUTF32 || (T.stringToUTF32 = function() {
        an("'stringToUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.lengthBytesUTF32 || (T.lengthBytesUTF32 = function() {
        an("'lengthBytesUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.allocateUTF8 || (T.allocateUTF8 = function() {
        an("'allocateUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.stackTrace || (T.stackTrace = function() {
        an("'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.addOnPreRun || (T.addOnPreRun = function() {
        an("'addOnPreRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.addOnInit || (T.addOnInit = function() {
        an("'addOnInit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.addOnPreMain || (T.addOnPreMain = function() {
        an("'addOnPreMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.addOnExit || (T.addOnExit = function() {
        an("'addOnExit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.addOnPostRun || (T.addOnPostRun = function() {
        an("'addOnPostRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.writeStringToMemory || (T.writeStringToMemory = function() {
        an("'writeStringToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.writeArrayToMemory || (T.writeArrayToMemory = function() {
        an("'writeArrayToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.writeAsciiToMemory || (T.writeAsciiToMemory = function() {
        an("'writeAsciiToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.addRunDependency || (T.addRunDependency = function() {
        an("'addRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
    }), T.removeRunDependency || (T.removeRunDependency = function() {
        an("'removeRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
    }), T.FS || (T.FS = function() {
        an("'FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.FS_createFolder || (T.FS_createFolder = function() {
        an("'FS_createFolder' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
    }), T.FS_createPath || (T.FS_createPath = function() {
        an("'FS_createPath' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
    }), T.FS_createDataFile || (T.FS_createDataFile = function() {
        an("'FS_createDataFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
    }), T.FS_createPreloadedFile || (T.FS_createPreloadedFile = function() {
        an("'FS_createPreloadedFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
    }), T.FS_createLazyFile || (T.FS_createLazyFile = function() {
        an("'FS_createLazyFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
    }), T.FS_createLink || (T.FS_createLink = function() {
        an("'FS_createLink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
    }), T.FS_createDevice || (T.FS_createDevice = function() {
        an("'FS_createDevice' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
    }), T.FS_unlink || (T.FS_unlink = function() {
        an("'FS_unlink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
    }), T.GL || (T.GL = function() {
        an("'GL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.staticAlloc || (T.staticAlloc = function() {
        an("'staticAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.dynamicAlloc || (T.dynamicAlloc = function() {
        an("'dynamicAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.warnOnce || (T.warnOnce = function() {
        an("'warnOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.loadDynamicLibrary || (T.loadDynamicLibrary = function() {
        an("'loadDynamicLibrary' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.loadWebAssemblyModule || (T.loadWebAssemblyModule = function() {
        an("'loadWebAssemblyModule' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.getLEB || (T.getLEB = function() {
        an("'getLEB' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.getFunctionTables || (T.getFunctionTables = function() {
        an("'getFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.alignFunctionTables || (T.alignFunctionTables = function() {
        an("'alignFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.registerFunctions || (T.registerFunctions = function() {
        an("'registerFunctions' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.addFunction = function(e, t) {
        void 0 === t && T.printErr("Warning: addFunction: Provide a wasm function signature string as a second argument");
        for (var n = 0; n < 20; n++)
            if (!_[n]) return _[n] = e, 1 + n;
        throw "Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS."
    }, T.removeFunction || (T.removeFunction = function() {
        an("'removeFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.getFuncWrapper || (T.getFuncWrapper = function() {
        an("'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.prettyPrint || (T.prettyPrint = function() {
        an("'prettyPrint' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.makeBigInt || (T.makeBigInt = function() {
        an("'makeBigInt' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.dynCall || (T.dynCall = function() {
        an("'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.getCompilerSetting || (T.getCompilerSetting = function() {
        an("'getCompilerSetting' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.stackSave || (T.stackSave = function() {
        an("'stackSave' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.stackRestore || (T.stackRestore = function() {
        an("'stackRestore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.stackAlloc || (T.stackAlloc = function() {
        an("'stackAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), T.ALLOC_NORMAL = A, T.ALLOC_STACK || Object.defineProperty(T, "ALLOC_STACK", {
        get: function() {
            an("'ALLOC_STACK' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
        }
    }), T.ALLOC_STATIC || Object.defineProperty(T, "ALLOC_STATIC", {
        get: function() {
            an("'ALLOC_STATIC' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
        }
    }), T.ALLOC_DYNAMIC || Object.defineProperty(T, "ALLOC_DYNAMIC", {
        get: function() {
            an("'ALLOC_DYNAMIC' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
        }
    }), T.ALLOC_NONE || Object.defineProperty(T, "ALLOC_NONE", {
        get: function() {
            an("'ALLOC_NONE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
        }
    }), (tn.prototype = new Error).constructor = tn, Ie = function e() {
        T.calledRun || nn(), T.calledRun || (Ie = e)
    }, T.run = nn, T.exit = function(e, t) {
        ! function() {
            var e = T.print,
                t = T.printErr,
                n = !1;
            T.print = T.printErr = function(e) {
                n = !0
            };
            try {
                De()
            } catch (e) {}
            T.print = e, T.printErr = t, n && c("stdio streams had content in them that was not flushed. you should set NO_EXIT_RUNTIME to 0 (see the FAQ), or make sure to emit a newline when you printf etc.")
        }(), t && T.noExitRuntime && 0 === e || (T.noExitRuntime ? t || T.printErr("exit(" + e + ") called, but NO_EXIT_RUNTIME is set, so halting execution but not exiting the runtime or preventing further async execution (build with NO_EXIT_RUNTIME=0, if you want a true shutdown)") : (g = !0, Z = void 0, re(), _e(de), he = !0, T.onExit && T.onExit(e)), a && process.exit(e), T.quit(e, new tn(e)))
    };
    var rn = [];

    function an(t) {
        T.onAbort && T.onAbort(t), void 0 !== t ? (T.print(t), T.printErr(t), t = JSON.stringify(t)) : t = "", g = !0;
        var n = "abort(" + t + ") at " + j();
        throw rn && rn.forEach(function(e) {
            n = e(n, t)
        }), n
    }
    if (T.abort = an, T.preInit)
        for ("function" == typeof T.preInit && (T.preInit = [T.preInit]); 0 < T.preInit.length;) T.preInit.pop()();
    T.noExitRuntime = !0, nn();
    var on = new(window.AudioContext || window.webkitAudioContext),
        sn = {
            autoGainControl: !1,
            echoCancellation: !1,
            noiseSuppression: !1
        },
        cn = !1,
        _n = null,
        un = function(e) {
            cn = e, _n && _n.getAudioTracks().forEach(function(e) {
                e.enabled = cn
            })
        },
        ln = "3.0.0",
        fn = "wasm",
        dn = function() {
            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
        },
        pn = "CHIRP_WASM_SDK_UUID",
        mn = localStorage.getItem(pn);
    mn || (mn = dn() + dn() + "-" + dn() + "-" + dn() + "-" + dn() + "-" + dn() + dn() + dn(), localStorage.setItem(pn, mn));
    var hn = function(e, t, n) {
            var i = "https://analytics.chirp.io/" + t,
                r = JSON.stringify(n),
                a = new XMLHttpRequest;
            a.open("POST", i, !0), a.setRequestHeader("Content-Type", "application/json; charset=utf-8"), a.setRequestHeader("Authorization", "Basic " + btoa(e + ":")), a.send(r)
        },
        yn = function(e) {
            for (var t = [], n = 0; n < e.length; n += 2) t.push(String.fromCharCode(parseInt(e.substr(n, 2), 16)).charCodeAt(0));
            return Uint8Array.from(t)
        },
        En = null;
    T.onRuntimeInitialized = function() {
        return En = !0
    }, T.onAbort = function() {
        return En = !1
    }, T.onAuthenticationError = function() {
        un(!1), console.error("\nChirp authentication failed, please check your origins are set correctly.\nSee https://developers.chirp.io/applications.\n  "), _n && _n.getAudioTracks().forEach(function(e) {
            return e.stop()
        }), on.close()
    };
    var Tn = function(m) {
        return {
            init: function(e) {
                if (m.key = e, m.maxPayloadLength = 0, m.status = ["Not Created", "Stopped", "Paused", "Running", "Sending", "Receiving"], m.onStateChanged = function(e, t) {}, m.onSending = function(e) {}, m.onSent = function(e) {}, m.onReceiving = function() {}, m.onReceived = function(e) {}, m.connect = m.new_chirp_connect_wasm(e), !m.connect) throw "Error initialising Chirp Connect";
                return m.connect
            },
            configure: function() {
                var e, t, n = T.addFunction(function(e, t, n) {
                        m.onStateChanged(m.status[t], m.status[n])
                    }, "viii"),
                    i = T.addFunction(function(e, t, n, i) {
                        var r = m.chirp_connect_as_string(m.connect, t, n);
                        m.onSending(yn(r))
                    }, "viiii"),
                    r = T.addFunction(function(e, t, n, i) {
                        var r = m.chirp_connect_as_string(m.connect, t, n);
                        m.onSent(yn(r))
                    }, "viiii"),
                    a = T.addFunction(function(e, t, n, i) {
                        m.onReceiving()
                    }, "viiii"),
                    o = T.addFunction(function(e, t, n, i) {
                        if (0 < n) {
                            var r = m.chirp_connect_as_string(m.connect, t, n);
                            m.onReceived(yn(r))
                        } else m.onReceived(new Uint8Array([]));
                        var a, o, s, c, _;
                        a = m.key, o = n, s = m.protocolName, c = m.protocolVersion, _ = {
                            client_id: mn,
                            timestamp: (new Date).toISOString(),
                            success: 0 !== o,
                            payload_length: o,
                            protocol_name: s,
                            protocol_version: c,
                            platform: fn,
                            sdk_version: ln
                        }, hn(a, "v3/connect/receive", _)
                    }, "viiii"),
                    s = T._malloc(40);
                T.HEAPU32[s / 4 + 0] = n, T.HEAPU32[s / 4 + 1] = i, T.HEAPU32[s / 4 + 2] = r, T.HEAPU32[s / 4 + 3] = a, T.HEAPU32[s / 4 + 4] = o, m.chirp_connect_set_callbacks(m.connect, s), m.chirp_connect_set_random_seed(m.connect, parseInt(Math.random() * Math.pow(2, 32))), m.maxPayloadLength = m.chirp_connect_get_max_payload_length(m.connect), m.protocolName = m.chirp_connect_get_protocol_name(m.connect), m.protocolVersion = m.chirp_connect_get_protocol_version(m.connect), e = m.key, t = {
                    client_id: mn,
                    timestamp: (new Date).toISOString(),
                    platform: fn,
                    sdk_version: ln
                }, hn(e, "v3/connect/instantiate", t)
            },
            processInput: function(e, t) {
                for (var n = T._malloc(t * Float32Array.BYTES_PER_ELEMENT), i = 0; i < t; i++) T.HEAPF32[n / Float32Array.BYTES_PER_ELEMENT + i] = e[i];
                m.chirp_connect_process_input(m.connect, n, t);
                T._free(n)
            },
            processOutput: function(e, t) {
                for (var n = T._malloc(t * Float32Array.BYTES_PER_ELEMENT), i = (m.chirp_connect_process_output(m.connect, n, t), 0); i < t; i++) e[i] = T.HEAPF32[n / Float32Array.BYTES_PER_ELEMENT + i];
                T._free(n)
            },
            send: function(e) {
                if (e.length > m.maxPayloadLength) throw "Payload too long, maximum = " + m.maxPayloadLength + " bytes";
                var t = m.status[m.chirp_connect_get_state(m.connect)];
                if ("Running" !== t) throw "Cannot send data when the SDK is " + t.toLowerCase();
                var n, i, r, a, o, s = "string" == typeof e ? T.intArrayFromString(e) : e,
                    c = T.allocate(s, "i8", T.ALLOC_NORMAL),
                    _ = m.chirp_connect_get_duration_for_payload_length(m.connect, e.length),
                    u = m.chirp_connect_get_sample_rate(m.connect) * _,
                    l = new Float32Array(u),
                    f = T._malloc(u * Float32Array.BYTES_PER_ELEMENT),
                    d = m.chirp_connect_wasm_process(m.connect, c, e.length, f, u);
                if (d) throw m.chirp_connect_error_code_to_string(d);
                for (var p = 0; p < u; p++) l[p] = T.HEAPF32[f / Float32Array.BYTES_PER_ELEMENT + p];
                m.chirp_connect_send(m.connect, c, e.length),
                    function(e, t) {
                        "suspended" === on.state && (console.warn("AudioContext is suspended."), on.resume());
                        for (var n = t * on.sampleRate, i = on.createBuffer(1, n, on.sampleRate), r = i.getChannelData(0), a = 0; a < n; a++) r[a] = e[a];
                        var o = on.createBufferSource();
                        o.buffer = i, o.connect(on.destination), o.start(0)
                    }(l, _), n = m.key, i = e.length, r = m.protocolName, a = m.protocolVersion, o = {
                        client_id: mn,
                        timestamp: (new Date).toISOString(),
                        payload_length: i,
                        protocol_name: r,
                        protocol_version: a,
                        platform: fn,
                        sdk_version: ln
                    }, hn(n, "v3/connect/send", o), T._free(f), T._free(c)
            },
            randomPayload: function(e) {
                var t = T._malloc(Uint32Array.BYTES_PER_ELEMENT);
                T.HEAPU32[t / Uint32Array.BYTES_PER_ELEMENT] = e || 0;
                var n = m.chirp_connect_random_payload(m.connect, t),
                    i = m.chirp_connect_as_string(m.connect, n, T.getValue(t, "i32"));
                return T._free(t), yn(i)
            },
            setRandomSeed: function(e) {
                return m.chirp_connect_set_random_seed(m.connect, e)
            },
            setCallbacks: function(e, t, n, i, r) {
                m.onStateChanged = e || m.onStateChanged, m.onSending = t || m.onSending, m.onSent = n || m.onSent, m.onReceiving = i || m.onReceiving, m.onReceived = r || m.onReceived
            },
            start: function() {
                un(!0), m.chirp_connect_start(m.connect)
            },
            stop: function() {
                un(!1), m.chirp_connect_stop(m.connect)
            },
            getInfo: function() {
                return m.chirp_connect_get_info(m.connect)
            },
            getState: function() {
                return m.chirp_connect_get_state(m.connect)
            },
            getSampleRate: function() {
                return m.chirp_connect_get_sample_rate(m.connect)
            },
            setSampleRate: function(e) {
                return m.chirp_connect_set_sample_rate(m.connect, e)
            },
            getVolume: function() {
                return m.chirp_connect_get_volume(m.connect)
            },
            setVolume: function(e) {
                return m.chirp_connect_set_volume(m.connect, e)
            },
            getDuration: function(e) {
                return m.chirp_connect_get_duration_for_payload_length(m.connect, e)
            },
            getProtocolName: function() {
                return m.chirp_connect_get_protocol_name(m.connect)
            },
            getProtocolVersion: function() {
                return m.chirp_connect_get_protocol_version(m.connect)
            },
            isValid: function(e) {
                var t = "string" == typeof e ? T.intArrayFromString(e) : e,
                    n = T.allocate(t, "i8", T.ALLOC_NORMAL),
                    i = m.chirp_connect_is_valid(m.connect, n, e.length);
                return T._free(n), 0 === i
            },
            asString: function(e) {
                var t = "string" == typeof e ? T.intArrayFromString(e) : e,
                    n = T.allocate(t, "i8", T.ALLOC_NORMAL),
                    i = m.chirp_connect_as_string(m.connect, n, e.length);
                return T._free(n), i
            }
        }
    };
    return e.SDK = Tn, e.Chirp = function(e) {
        var a = e.key,
            o = e.onStateChanged,
            s = e.onSending,
            c = e.onSent,
            _ = e.onReceiving,
            u = e.onReceived;
        return new Promise(function(t, n) {
            var r = setInterval(function() {
                if (null === En);
                else if (En) {
                    clearInterval(r);
                    var e = Tn({
                        new_chirp_connect_wasm: T.cwrap("new_chirp_connect_wasm", "number", ["string"]),
                        del_chirp_connect_wasm: T.cwrap("del_chirp_connect_wasm", "number", ["number"]),
                        chirp_connect_wasm_process: T.cwrap("chirp_connect_wasm_process", "number", ["number", "number", "number", "number", "number"]),
                        chirp_connect_start: T.cwrap("chirp_connect_start", "number", ["number"]),
                        chirp_connect_stop: T.cwrap("chirp_connect_stop", "number", ["number"]),
                        chirp_connect_random_payload: T.cwrap("chirp_connect_random_payload", "number", ["number", "number"]),
                        chirp_connect_send: T.cwrap("chirp_connect_send", "number", ["number", "number", "number"]),
                        chirp_connect_process_input: T.cwrap("chirp_connect_process_input", "number", ["number", "number", "number"]),
                        chirp_connect_process_output: T.cwrap("chirp_connect_process_output", "number", ["number", "number", "number"]),
                        chirp_connect_as_string: T.cwrap("chirp_connect_as_string", "string", ["number", "number", "number"]),
                        chirp_connect_get_sample_rate: T.cwrap("chirp_connect_get_sample_rate", "number", ["number"]),
                        chirp_connect_set_sample_rate: T.cwrap("chirp_connect_set_sample_rate", "number", ["number", "number"]),
                        chirp_connect_get_max_payload_length: T.cwrap("chirp_connect_get_max_payload_length", "number", ["number"]),
                        chirp_connect_set_callbacks: T.cwrap("chirp_connect_set_callbacks", "number", ["number", "number"]),
                        chirp_connect_set_random_seed: T.cwrap("chirp_connect_set_random_seed", "null", ["number", "number"]),
                        chirp_connect_get_volume: T.cwrap("chirp_connect_get_volume", "number", ["number"]),
                        chirp_connect_set_volume: T.cwrap("chirp_connect_set_volume", "number", ["number", "number"]),
                        chirp_connect_get_state: T.cwrap("chirp_connect_get_state", "number", ["number"]),
                        chirp_connect_get_protocol_name: T.cwrap("chirp_connect_get_protocol_name", "string", ["number"]),
                        chirp_connect_get_protocol_version: T.cwrap("chirp_connect_get_protocol_version", "number", ["number"]),
                        chirp_connect_get_info: T.cwrap("chirp_connect_get_info", "string", ["number"]),
                        chirp_connect_get_duration_for_payload_length: T.cwrap("chirp_connect_get_duration_for_payload_length", "number", ["number", "number"]),
                        chirp_connect_error_code_to_string: T.cwrap("chirp_connect_error_code_to_string", "string", ["number"])
                    });
                    try {
                        e.init(a), (i = e, navigator.mediaDevices.getUserMedia({
                            audio: sn,
                            video: !1
                        }).then(function(e) {
                            _n = e;
                            var t = on.createMediaStreamSource(_n),
                                n = on.createScriptProcessor(0, 1, 1);
                            t.connect(n), n.connect(on.destination), i.setSampleRate(on.sampleRate), n.onaudioprocess = function(e) {
                                cn && (i.processInput(e.inputBuffer.getChannelData(0), e.inputBuffer.length), i.processOutput(new Float32Array(e.outputBuffer.length), e.outputBuffer.length))
                            }
                        })).then(function() {
                            e.configure(), e.setCallbacks(o, s, c, _, u), e.start(), t(e)
                        }).catch(n)
                    } catch (e) {
                        n(e)
                    }
                } else clearInterval(r), n("WebAssembly initialisation aborted");
                var i
            }, 10)
        })
    }, e.hexToArray = yn, e.toAscii = function(e) {
        for (var t = "", n = 0; n < e.length; n++) t += String.fromCharCode(e[n]);
        return t
    }, e
}({});