/*!
 * @architect Mark Jivko <mark@oglama.com>
 * @copyright © 2024 Oglama https://oglama.com
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Rg = Object.defineProperty;
var sl = e => {
    throw TypeError(e);
};
var Pg = (e, t, r) => (t in e ? Rg(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[t] = r));
var g = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var x = (e, t, r) => Pg(e, typeof t != "symbol" ? t + "" : t, r),
    al = (e, t, r) => t.has(e) || sl("Cannot " + r);
var C = (e, t, r) => (al(e, t, "read from private field"), r ? r.call(e) : t.get(e)),
    Q = (e, t, r) =>
        t.has(e) ? sl("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r),
    te = (e, t, r, n) => (al(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r);
var Cn = g(Wt => {
    "use strict";
    Object.defineProperty(Wt, "__esModule", { value: !0 });
    Wt.CancellationError = Wt.CancellationToken = void 0;
    var Dg = require("events"),
        co = class extends Dg.EventEmitter {
            get cancelled() {
                return this._cancelled || (this._parent != null && this._parent.cancelled);
            }
            set parent(t) {
                this.removeParentCancelHandler(),
                    (this._parent = t),
                    (this.parentCancelHandler = () => this.cancel()),
                    this._parent.onCancel(this.parentCancelHandler);
            }
            constructor(t) {
                super(),
                    (this.parentCancelHandler = null),
                    (this._parent = null),
                    (this._cancelled = !1),
                    t != null && (this.parent = t);
            }
            cancel() {
                (this._cancelled = !0), this.emit("cancel");
            }
            onCancel(t) {
                this.cancelled ? t() : this.once("cancel", t);
            }
            createPromise(t) {
                if (this.cancelled) return Promise.reject(new br());
                let r = () => {
                        if (n != null)
                            try {
                                this.removeListener("cancel", n), (n = null);
                            } catch {}
                    },
                    n = null;
                return new Promise((i, o) => {
                    let s = null;
                    if (
                        ((n = () => {
                            try {
                                s != null && (s(), (s = null));
                            } finally {
                                o(new br());
                            }
                        }),
                        this.cancelled)
                    ) {
                        n();
                        return;
                    }
                    this.onCancel(n),
                        t(i, o, a => {
                            s = a;
                        });
                })
                    .then(i => (r(), i))
                    .catch(i => {
                        throw (r(), i);
                    });
            }
            removeParentCancelHandler() {
                let t = this._parent;
                t != null &&
                    this.parentCancelHandler != null &&
                    (t.removeListener("cancel", this.parentCancelHandler), (this.parentCancelHandler = null));
            }
            dispose() {
                try {
                    this.removeParentCancelHandler();
                } finally {
                    this.removeAllListeners(), (this._parent = null);
                }
            }
        };
    Wt.CancellationToken = co;
    var br = class extends Error {
        constructor() {
            super("cancelled");
        }
    };
    Wt.CancellationError = br;
});
var ul = g((nx, ll) => {
    var Gt = 1e3,
        Vt = Gt * 60,
        Yt = Vt * 60,
        At = Yt * 24,
        Fg = At * 7,
        qg = At * 365.25;
    ll.exports = function (e, t) {
        t = t || {};
        var r = typeof e;
        if (r === "string" && e.length > 0) return Lg(e);
        if (r === "number" && isFinite(e)) return t.long ? $g(e) : Ug(e);
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e));
    };
    function Lg(e) {
        if (((e = String(e)), !(e.length > 100))) {
            var t =
                /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
                    e
                );
            if (t) {
                var r = parseFloat(t[1]),
                    n = (t[2] || "ms").toLowerCase();
                switch (n) {
                    case "years":
                    case "year":
                    case "yrs":
                    case "yr":
                    case "y":
                        return r * qg;
                    case "weeks":
                    case "week":
                    case "w":
                        return r * Fg;
                    case "days":
                    case "day":
                    case "d":
                        return r * At;
                    case "hours":
                    case "hour":
                    case "hrs":
                    case "hr":
                    case "h":
                        return r * Yt;
                    case "minutes":
                    case "minute":
                    case "mins":
                    case "min":
                    case "m":
                        return r * Vt;
                    case "seconds":
                    case "second":
                    case "secs":
                    case "sec":
                    case "s":
                        return r * Gt;
                    case "milliseconds":
                    case "millisecond":
                    case "msecs":
                    case "msec":
                    case "ms":
                        return r;
                    default:
                        return;
                }
            }
        }
    }
    function Ug(e) {
        var t = Math.abs(e);
        return t >= At
            ? Math.round(e / At) + "d"
            : t >= Yt
            ? Math.round(e / Yt) + "h"
            : t >= Vt
            ? Math.round(e / Vt) + "m"
            : t >= Gt
            ? Math.round(e / Gt) + "s"
            : e + "ms";
    }
    function $g(e) {
        var t = Math.abs(e);
        return t >= At
            ? Tn(e, t, At, "day")
            : t >= Yt
            ? Tn(e, t, Yt, "hour")
            : t >= Vt
            ? Tn(e, t, Vt, "minute")
            : t >= Gt
            ? Tn(e, t, Gt, "second")
            : e + " ms";
    }
    function Tn(e, t, r, n) {
        var i = t >= r * 1.5;
        return Math.round(e / r) + " " + n + (i ? "s" : "");
    }
});
var fo = g((ix, cl) => {
    function kg(e) {
        (r.debug = r),
            (r.default = r),
            (r.coerce = l),
            (r.disable = s),
            (r.enable = i),
            (r.enabled = a),
            (r.humanize = ul()),
            (r.destroy = h),
            Object.keys(e).forEach(c => {
                r[c] = e[c];
            }),
            (r.names = []),
            (r.skips = []),
            (r.formatters = {});
        function t(c) {
            let f = 0;
            for (let m = 0; m < c.length; m++) (f = (f << 5) - f + c.charCodeAt(m)), (f |= 0);
            return r.colors[Math.abs(f) % r.colors.length];
        }
        r.selectColor = t;
        function r(c) {
            let f,
                m = null,
                p,
                E;
            function _(...v) {
                if (!_.enabled) return;
                let T = _,
                    S = Number(new Date()),
                    N = S - (f || S);
                (T.diff = N),
                    (T.prev = f),
                    (T.curr = S),
                    (f = S),
                    (v[0] = r.coerce(v[0])),
                    typeof v[0] != "string" && v.unshift("%O");
                let L = 0;
                (v[0] = v[0].replace(/%([a-zA-Z%])/g, (V, ce) => {
                    if (V === "%%") return "%";
                    L++;
                    let y = r.formatters[ce];
                    if (typeof y == "function") {
                        let P = v[L];
                        (V = y.call(T, P)), v.splice(L, 1), L--;
                    }
                    return V;
                })),
                    r.formatArgs.call(T, v),
                    (T.log || r.log).apply(T, v);
            }
            return (
                (_.namespace = c),
                (_.useColors = r.useColors()),
                (_.color = r.selectColor(c)),
                (_.extend = n),
                (_.destroy = r.destroy),
                Object.defineProperty(_, "enabled", {
                    enumerable: !0,
                    configurable: !1,
                    get: () => (m !== null ? m : (p !== r.namespaces && ((p = r.namespaces), (E = r.enabled(c))), E)),
                    set: v => {
                        m = v;
                    }
                }),
                typeof r.init == "function" && r.init(_),
                _
            );
        }
        function n(c, f) {
            let m = r(this.namespace + (typeof f > "u" ? ":" : f) + c);
            return (m.log = this.log), m;
        }
        function i(c) {
            r.save(c), (r.namespaces = c), (r.names = []), (r.skips = []);
            let f = (typeof c == "string" ? c : "").trim().replace(" ", ",").split(",").filter(Boolean);
            for (let m of f) m[0] === "-" ? r.skips.push(m.slice(1)) : r.names.push(m);
        }
        function o(c, f) {
            let m = 0,
                p = 0,
                E = -1,
                _ = 0;
            for (; m < c.length; )
                if (p < f.length && (f[p] === c[m] || f[p] === "*")) f[p] === "*" ? ((E = p), (_ = m), p++) : (m++, p++);
                else if (E !== -1) (p = E + 1), _++, (m = _);
                else return !1;
            for (; p < f.length && f[p] === "*"; ) p++;
            return p === f.length;
        }
        function s() {
            let c = [...r.names, ...r.skips.map(f => "-" + f)].join(",");
            return r.enable(""), c;
        }
        function a(c) {
            for (let f of r.skips) if (o(c, f)) return !1;
            for (let f of r.names) if (o(c, f)) return !0;
            return !1;
        }
        function l(c) {
            return c instanceof Error ? c.stack || c.message : c;
        }
        function h() {
            console.warn(
                "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
            );
        }
        return r.enable(r.load()), r;
    }
    cl.exports = kg;
});
var fl = g((Pe, bn) => {
    Pe.formatArgs = Bg;
    Pe.save = Hg;
    Pe.load = jg;
    Pe.useColors = Mg;
    Pe.storage = Wg();
    Pe.destroy = (() => {
        let e = !1;
        return () => {
            e ||
                ((e = !0),
                console.warn(
                    "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
                ));
        };
    })();
    Pe.colors = [
        "#0000CC",
        "#0000FF",
        "#0033CC",
        "#0033FF",
        "#0066CC",
        "#0066FF",
        "#0099CC",
        "#0099FF",
        "#00CC00",
        "#00CC33",
        "#00CC66",
        "#00CC99",
        "#00CCCC",
        "#00CCFF",
        "#3300CC",
        "#3300FF",
        "#3333CC",
        "#3333FF",
        "#3366CC",
        "#3366FF",
        "#3399CC",
        "#3399FF",
        "#33CC00",
        "#33CC33",
        "#33CC66",
        "#33CC99",
        "#33CCCC",
        "#33CCFF",
        "#6600CC",
        "#6600FF",
        "#6633CC",
        "#6633FF",
        "#66CC00",
        "#66CC33",
        "#9900CC",
        "#9900FF",
        "#9933CC",
        "#9933FF",
        "#99CC00",
        "#99CC33",
        "#CC0000",
        "#CC0033",
        "#CC0066",
        "#CC0099",
        "#CC00CC",
        "#CC00FF",
        "#CC3300",
        "#CC3333",
        "#CC3366",
        "#CC3399",
        "#CC33CC",
        "#CC33FF",
        "#CC6600",
        "#CC6633",
        "#CC9900",
        "#CC9933",
        "#CCCC00",
        "#CCCC33",
        "#FF0000",
        "#FF0033",
        "#FF0066",
        "#FF0099",
        "#FF00CC",
        "#FF00FF",
        "#FF3300",
        "#FF3333",
        "#FF3366",
        "#FF3399",
        "#FF33CC",
        "#FF33FF",
        "#FF6600",
        "#FF6633",
        "#FF9900",
        "#FF9933",
        "#FFCC00",
        "#FFCC33"
    ];
    function Mg() {
        if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) return !0;
        if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
            return !1;
        let e;
        return (
            (typeof document < "u" &&
                document.documentElement &&
                document.documentElement.style &&
                document.documentElement.style.WebkitAppearance) ||
            (typeof window < "u" &&
                window.console &&
                (window.console.firebug || (window.console.exception && window.console.table))) ||
            (typeof navigator < "u" &&
                navigator.userAgent &&
                (e = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) &&
                parseInt(e[1], 10) >= 31) ||
            (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
        );
    }
    function Bg(e) {
        if (
            ((e[0] =
                (this.useColors ? "%c" : "") +
                this.namespace +
                (this.useColors ? " %c" : " ") +
                e[0] +
                (this.useColors ? "%c " : " ") +
                "+" +
                bn.exports.humanize(this.diff)),
            !this.useColors)
        )
            return;
        let t = "color: " + this.color;
        e.splice(1, 0, t, "color: inherit");
        let r = 0,
            n = 0;
        e[0].replace(/%[a-zA-Z%]/g, i => {
            i !== "%%" && (r++, i === "%c" && (n = r));
        }),
            e.splice(n, 0, t);
    }
    Pe.log = console.debug || console.log || (() => {});
    function Hg(e) {
        try {
            e ? Pe.storage.setItem("debug", e) : Pe.storage.removeItem("debug");
        } catch {}
    }
    function jg() {
        let e;
        try {
            e = Pe.storage.getItem("debug");
        } catch {}
        return !e && typeof process < "u" && "env" in process && (e = process.env.DEBUG), e;
    }
    function Wg() {
        try {
            return localStorage;
        } catch {}
    }
    bn.exports = fo()(Pe);
    var { formatters: Gg } = bn.exports;
    Gg.j = function (e) {
        try {
            return JSON.stringify(e);
        } catch (t) {
            return "[UnexpectedJSONParseError]: " + t.message;
        }
    };
});
var hl = g((ox, dl) => {
    "use strict";
    dl.exports = (e, t = process.argv) => {
        let r = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--",
            n = t.indexOf(r + e),
            i = t.indexOf("--");
        return n !== -1 && (i === -1 || n < i);
    };
});
var gl = g((sx, ml) => {
    "use strict";
    var Vg = require("os"),
        pl = require("tty"),
        Fe = hl(),
        { env: se } = process,
        nt;
    Fe("no-color") || Fe("no-colors") || Fe("color=false") || Fe("color=never")
        ? (nt = 0)
        : (Fe("color") || Fe("colors") || Fe("color=true") || Fe("color=always")) && (nt = 1);
    "FORCE_COLOR" in se &&
        (se.FORCE_COLOR === "true"
            ? (nt = 1)
            : se.FORCE_COLOR === "false"
            ? (nt = 0)
            : (nt = se.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(se.FORCE_COLOR, 10), 3)));
    function ho(e) {
        return e === 0 ? !1 : { level: e, hasBasic: !0, has256: e >= 2, has16m: e >= 3 };
    }
    function po(e, t) {
        if (nt === 0) return 0;
        if (Fe("color=16m") || Fe("color=full") || Fe("color=truecolor")) return 3;
        if (Fe("color=256")) return 2;
        if (e && !t && nt === void 0) return 0;
        let r = nt || 0;
        if (se.TERM === "dumb") return r;
        if (process.platform === "win32") {
            let n = Vg.release().split(".");
            return Number(n[0]) >= 10 && Number(n[2]) >= 10586 ? (Number(n[2]) >= 14931 ? 3 : 2) : 1;
        }
        if ("CI" in se)
            return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some(n => n in se) ||
                se.CI_NAME === "codeship"
                ? 1
                : r;
        if ("TEAMCITY_VERSION" in se) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(se.TEAMCITY_VERSION) ? 1 : 0;
        if (se.COLORTERM === "truecolor") return 3;
        if ("TERM_PROGRAM" in se) {
            let n = parseInt((se.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
            switch (se.TERM_PROGRAM) {
                case "iTerm.app":
                    return n >= 3 ? 3 : 2;
                case "Apple_Terminal":
                    return 2;
            }
        }
        return /-256(color)?$/i.test(se.TERM)
            ? 2
            : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(se.TERM) || "COLORTERM" in se
            ? 1
            : r;
    }
    function Yg(e) {
        let t = po(e, e && e.isTTY);
        return ho(t);
    }
    ml.exports = { supportsColor: Yg, stdout: ho(po(!0, pl.isatty(1))), stderr: ho(po(!0, pl.isatty(2))) };
});
var yl = g((ae, xn) => {
    var zg = require("tty"),
        On = require("util");
    ae.init = t0;
    ae.log = Qg;
    ae.formatArgs = Kg;
    ae.save = Zg;
    ae.load = e0;
    ae.useColors = Xg;
    ae.destroy = On.deprecate(() => {},
    "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    ae.colors = [6, 2, 3, 4, 5, 1];
    try {
        let e = gl();
        e &&
            (e.stderr || e).level >= 2 &&
            (ae.colors = [
                20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81,
                92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170,
                171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215,
                220, 221
            ]);
    } catch {}
    ae.inspectOpts = Object.keys(process.env)
        .filter(e => /^debug_/i.test(e))
        .reduce((e, t) => {
            let r = t
                    .substring(6)
                    .toLowerCase()
                    .replace(/_([a-z])/g, (i, o) => o.toUpperCase()),
                n = process.env[t];
            return (
                /^(yes|on|true|enabled)$/i.test(n)
                    ? (n = !0)
                    : /^(no|off|false|disabled)$/i.test(n)
                    ? (n = !1)
                    : n === "null"
                    ? (n = null)
                    : (n = Number(n)),
                (e[r] = n),
                e
            );
        }, {});
    function Xg() {
        return "colors" in ae.inspectOpts ? !!ae.inspectOpts.colors : zg.isatty(process.stderr.fd);
    }
    function Kg(e) {
        let { namespace: t, useColors: r } = this;
        if (r) {
            let n = this.color,
                i = "\x1B[3" + (n < 8 ? n : "8;5;" + n),
                o = "  ".concat(i, ";1m").concat(t, " \x1B[0m");
            (e[0] = o + e[0].split("\n").join("\n" + o)), e.push(i + "m+" + xn.exports.humanize(this.diff) + "\x1B[0m");
        } else e[0] = Jg() + t + " " + e[0];
    }
    function Jg() {
        return ae.inspectOpts.hideDate ? "" : new Date().toISOString() + " ";
    }
    function Qg(...e) {
        return process.stderr.write(On.formatWithOptions(ae.inspectOpts, ...e) + "\n");
    }
    function Zg(e) {
        e ? (process.env.DEBUG = e) : delete process.env.DEBUG;
    }
    function e0() {
        return process.env.DEBUG;
    }
    function t0(e) {
        e.inspectOpts = {};
        let t = Object.keys(ae.inspectOpts);
        for (let r = 0; r < t.length; r++) e.inspectOpts[t[r]] = ae.inspectOpts[t[r]];
    }
    xn.exports = fo()(ae);
    var { formatters: wl } = xn.exports;
    wl.o = function (e) {
        return (
            (this.inspectOpts.colors = this.useColors),
            On.inspect(e, this.inspectOpts)
                .split("\n")
                .map(t => t.trim())
                .join(" ")
        );
    };
    wl.O = function (e) {
        return (this.inspectOpts.colors = this.useColors), On.inspect(e, this.inspectOpts);
    };
});
var El = g((ax, mo) => {
    typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs
        ? (mo.exports = fl())
        : (mo.exports = yl());
});
var Or = g(go => {
    "use strict";
    Object.defineProperty(go, "__esModule", { value: !0 });
    go.newError = r0;
    function r0(e, t) {
        let r = new Error(e);
        return (r.code = t), r;
    }
});
var yo = g(In => {
    "use strict";
    Object.defineProperty(In, "__esModule", { value: !0 });
    In.ProgressCallbackTransform = void 0;
    var n0 = require("stream"),
        wo = class extends n0.Transform {
            constructor(t, r, n) {
                super(),
                    (this.total = t),
                    (this.cancellationToken = r),
                    (this.onProgress = n),
                    (this.start = Date.now()),
                    (this.transferred = 0),
                    (this.delta = 0),
                    (this.nextUpdate = this.start + 1e3);
            }
            _transform(t, r, n) {
                if (this.cancellationToken.cancelled) {
                    n(new Error("cancelled"), null);
                    return;
                }
                (this.transferred += t.length), (this.delta += t.length);
                let i = Date.now();
                i >= this.nextUpdate &&
                    this.transferred !== this.total &&
                    ((this.nextUpdate = i + 1e3),
                    this.onProgress({
                        total: this.total,
                        delta: this.delta,
                        transferred: this.transferred,
                        percent: (this.transferred / this.total) * 100,
                        bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
                    }),
                    (this.delta = 0)),
                    n(null, t);
            }
            _flush(t) {
                if (this.cancellationToken.cancelled) {
                    t(new Error("cancelled"));
                    return;
                }
                this.onProgress({
                    total: this.total,
                    delta: this.delta,
                    transferred: this.total,
                    percent: 100,
                    bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
                }),
                    (this.delta = 0),
                    t(null);
            }
        };
    In.ProgressCallbackTransform = wo;
});
var Sl = g(ye => {
    "use strict";
    Object.defineProperty(ye, "__esModule", { value: !0 });
    ye.DigestTransform = ye.HttpExecutor = ye.HttpError = void 0;
    ye.createHttpError = Eo;
    ye.parseJson = f0;
    ye.configureRequestOptionsFromUrl = Al;
    ye.configureRequestUrl = vo;
    ye.safeGetHeader = zt;
    ye.configureRequestOptions = Nn;
    ye.safeStringifyJson = Rn;
    var i0 = require("crypto"),
        o0 = El(),
        s0 = require("fs"),
        a0 = require("stream"),
        vl = require("url"),
        l0 = Cn(),
        _l = Or(),
        u0 = yo(),
        xr = (0, o0.default)("electron-builder");
    function Eo(e, t = null) {
        return new Ir(
            e.statusCode || -1,
            "".concat(e.statusCode, " ").concat(e.statusMessage) +
                (t == null ? "" : "\n" + JSON.stringify(t, null, "  ")) +
                "\nHeaders: " +
                Rn(e.headers),
            t
        );
    }
    var c0 = new Map([
            [429, "Too many requests"],
            [400, "Bad request"],
            [403, "Forbidden"],
            [404, "Not found"],
            [405, "Method not allowed"],
            [406, "Not acceptable"],
            [408, "Request timeout"],
            [413, "Request entity too large"],
            [500, "Internal server error"],
            [502, "Bad gateway"],
            [503, "Service unavailable"],
            [504, "Gateway timeout"],
            [505, "HTTP version not supported"]
        ]),
        Ir = class extends Error {
            constructor(t, r = "HTTP error: ".concat(c0.get(t) || t), n = null) {
                super(r),
                    (this.statusCode = t),
                    (this.description = n),
                    (this.name = "HttpError"),
                    (this.code = "HTTP_ERROR_".concat(t));
            }
            isServerError() {
                return this.statusCode >= 500 && this.statusCode <= 599;
            }
        };
    ye.HttpError = Ir;
    function f0(e) {
        return e.then(t => (t == null || t.length === 0 ? null : JSON.parse(t)));
    }
    var _o = class e {
        constructor() {
            this.maxRedirects = 10;
        }
        request(t, r = new l0.CancellationToken(), n) {
            Nn(t);
            let i = n == null ? void 0 : JSON.stringify(n),
                o = i ? Buffer.from(i) : void 0;
            if (o != null) {
                xr(i);
                let { headers: s, ...a } = t;
                t = { method: "post", headers: { "Content-Type": "application/json", "Content-Length": o.length, ...s }, ...a };
            }
            return this.doApiRequest(t, r, s => s.end(o));
        }
        doApiRequest(t, r, n, i = 0) {
            return (
                xr.enabled && xr("Request: ".concat(Rn(t))),
                r.createPromise((o, s, a) => {
                    let l = this.createRequest(t, h => {
                        try {
                            this.handleResponse(h, t, r, o, s, i, n);
                        } catch (c) {
                            s(c);
                        }
                    });
                    this.addErrorAndTimeoutHandlers(l, s, t.timeout),
                        this.addRedirectHandlers(l, t, s, i, h => {
                            this.doApiRequest(h, r, n, i).then(o).catch(s);
                        }),
                        n(l, s),
                        a(() => l.abort());
                })
            );
        }
        addRedirectHandlers(t, r, n, i, o) {}
        addErrorAndTimeoutHandlers(t, r, n = 60 * 1e3) {
            this.addTimeOutHandler(t, r, n),
                t.on("error", r),
                t.on("aborted", () => {
                    r(new Error("Request has been aborted by the server"));
                });
        }
        handleResponse(t, r, n, i, o, s, a) {
            var l;
            if (
                (xr.enabled &&
                    xr("Response: ".concat(t.statusCode, " ").concat(t.statusMessage, ", request options: ").concat(Rn(r))),
                t.statusCode === 404)
            ) {
                o(
                    Eo(
                        t,
                        "method: "
                            .concat(r.method || "GET", " url: ")
                            .concat(r.protocol || "https:", "//")
                            .concat(r.hostname)
                            .concat(r.port ? ":".concat(r.port) : "")
                            .concat(
                                r.path,
                                "\n\nPlease double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.\n"
                            )
                    )
                );
                return;
            } else if (t.statusCode === 204) {
                i();
                return;
            }
            let h = (l = t.statusCode) !== null && l !== void 0 ? l : 0,
                c = h >= 300 && h < 400,
                f = zt(t, "location");
            if (c && f != null) {
                if (s > this.maxRedirects) {
                    o(this.createMaxRedirectError());
                    return;
                }
                this.doApiRequest(e.prepareRedirectUrlOptions(f, r), n, a, s).then(i).catch(o);
                return;
            }
            t.setEncoding("utf8");
            let m = "";
            t.on("error", o),
                t.on("data", p => (m += p)),
                t.on("end", () => {
                    try {
                        if (t.statusCode != null && t.statusCode >= 400) {
                            let p = zt(t, "content-type"),
                                E =
                                    p != null &&
                                    (Array.isArray(p) ? p.find(_ => _.includes("json")) != null : p.includes("json"));
                            o(
                                Eo(
                                    t,
                                    "method: "
                                        .concat(r.method || "GET", " url: ")
                                        .concat(r.protocol || "https:", "//")
                                        .concat(r.hostname)
                                        .concat(r.port ? ":".concat(r.port) : "")
                                        .concat(r.path, "\n\n          Data:\n          ")
                                        .concat(E ? JSON.stringify(JSON.parse(m)) : m, "\n          ")
                                )
                            );
                        } else i(m.length === 0 ? null : m);
                    } catch (p) {
                        o(p);
                    }
                });
        }
        async downloadToBuffer(t, r) {
            return await r.cancellationToken.createPromise((n, i, o) => {
                let s = [],
                    a = { headers: r.headers || void 0, redirect: "manual" };
                vo(t, a),
                    Nn(a),
                    this.doDownload(
                        a,
                        {
                            destination: null,
                            options: r,
                            onCancel: o,
                            callback: l => {
                                l == null ? n(Buffer.concat(s)) : i(l);
                            },
                            responseHandler: (l, h) => {
                                let c = 0;
                                l.on("data", f => {
                                    if (((c += f.length), c > 524288e3)) {
                                        h(new Error("Maximum allowed size is 500 MB"));
                                        return;
                                    }
                                    s.push(f);
                                }),
                                    l.on("end", () => {
                                        h(null);
                                    });
                            }
                        },
                        0
                    );
            });
        }
        doDownload(t, r, n) {
            let i = this.createRequest(t, o => {
                if (o.statusCode >= 400) {
                    r.callback(
                        new Error(
                            'Cannot download "'
                                .concat(t.protocol || "https:", "//")
                                .concat(t.hostname)
                                .concat(t.path, '", status ')
                                .concat(o.statusCode, ": ")
                                .concat(o.statusMessage)
                        )
                    );
                    return;
                }
                o.on("error", r.callback);
                let s = zt(o, "location");
                if (s != null) {
                    n < this.maxRedirects
                        ? this.doDownload(e.prepareRedirectUrlOptions(s, t), r, n++)
                        : r.callback(this.createMaxRedirectError());
                    return;
                }
                r.responseHandler == null ? h0(r, o) : r.responseHandler(o, r.callback);
            });
            this.addErrorAndTimeoutHandlers(i, r.callback, t.timeout),
                this.addRedirectHandlers(i, t, r.callback, n, o => {
                    this.doDownload(o, r, n++);
                }),
                i.end();
        }
        createMaxRedirectError() {
            return new Error("Too many redirects (> ".concat(this.maxRedirects, ")"));
        }
        addTimeOutHandler(t, r, n) {
            t.on("socket", i => {
                i.setTimeout(n, () => {
                    t.abort(), r(new Error("Request timed out"));
                });
            });
        }
        static prepareRedirectUrlOptions(t, r) {
            let n = Al(t, { ...r }),
                i = n.headers;
            if (i?.authorization) {
                let o = new vl.URL(t);
                (o.hostname.endsWith(".amazonaws.com") || o.searchParams.has("X-Amz-Credential")) && delete i.authorization;
            }
            return n;
        }
        static retryOnServerError(t, r = 3) {
            for (let n = 0; ; n++)
                try {
                    return t();
                } catch (i) {
                    if (n < r && ((i instanceof Ir && i.isServerError()) || i.code === "EPIPE")) continue;
                    throw i;
                }
        }
    };
    ye.HttpExecutor = _o;
    function Al(e, t) {
        let r = Nn(t);
        return vo(new vl.URL(e), r), r;
    }
    function vo(e, t) {
        (t.protocol = e.protocol),
            (t.hostname = e.hostname),
            e.port ? (t.port = e.port) : t.port && delete t.port,
            (t.path = e.pathname + e.search);
    }
    var Nr = class extends a0.Transform {
        get actual() {
            return this._actual;
        }
        constructor(t, r = "sha512", n = "base64") {
            super(),
                (this.expected = t),
                (this.algorithm = r),
                (this.encoding = n),
                (this._actual = null),
                (this.isValidateOnEnd = !0),
                (this.digester = (0, i0.createHash)(r));
        }
        _transform(t, r, n) {
            this.digester.update(t), n(null, t);
        }
        _flush(t) {
            if (((this._actual = this.digester.digest(this.encoding)), this.isValidateOnEnd))
                try {
                    this.validate();
                } catch (r) {
                    t(r);
                    return;
                }
            t(null);
        }
        validate() {
            if (this._actual == null) throw (0, _l.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
            if (this._actual !== this.expected)
                throw (0, _l.newError)(
                    ""
                        .concat(this.algorithm, " checksum mismatch, expected ")
                        .concat(this.expected, ", got ")
                        .concat(this._actual),
                    "ERR_CHECKSUM_MISMATCH"
                );
            return null;
        }
    };
    ye.DigestTransform = Nr;
    function d0(e, t, r) {
        return e != null && t != null && e !== t
            ? (r(new Error("checksum mismatch: expected ".concat(t, " but got ").concat(e, " (X-Checksum-Sha2 header)"))), !1)
            : !0;
    }
    function zt(e, t) {
        let r = e.headers[t];
        return r == null ? null : Array.isArray(r) ? (r.length === 0 ? null : r[r.length - 1]) : r;
    }
    function h0(e, t) {
        if (!d0(zt(t, "X-Checksum-Sha2"), e.options.sha2, e.callback)) return;
        let r = [];
        if (e.options.onProgress != null) {
            let s = zt(t, "content-length");
            s != null &&
                r.push(new u0.ProgressCallbackTransform(parseInt(s, 10), e.options.cancellationToken, e.options.onProgress));
        }
        let n = e.options.sha512;
        n != null
            ? r.push(
                  new Nr(
                      n,
                      "sha512",
                      n.length === 128 && !n.includes("+") && !n.includes("Z") && !n.includes("=") ? "hex" : "base64"
                  )
              )
            : e.options.sha2 != null && r.push(new Nr(e.options.sha2, "sha256", "hex"));
        let i = (0, s0.createWriteStream)(e.destination);
        r.push(i);
        let o = t;
        for (let s of r)
            s.on("error", a => {
                i.close(), e.options.cancellationToken.cancelled || e.callback(a);
            }),
                (o = o.pipe(s));
        i.on("finish", () => {
            i.close(e.callback);
        });
    }
    function Nn(e, t, r) {
        r != null && (e.method = r), (e.headers = { ...e.headers });
        let n = e.headers;
        return (
            t != null && (n.authorization = t.startsWith("Basic") || t.startsWith("Bearer") ? t : "token ".concat(t)),
            n["User-Agent"] == null && (n["User-Agent"] = "electron-builder"),
            (r == null || r === "GET" || n["Cache-Control"] == null) && (n["Cache-Control"] = "no-cache"),
            e.protocol == null && process.versions.electron != null && (e.protocol = "https:"),
            e
        );
    }
    function Rn(e, t) {
        return JSON.stringify(
            e,
            (r, n) =>
                r.endsWith("Authorization") ||
                r.endsWith("authorization") ||
                r.endsWith("Password") ||
                r.endsWith("PASSWORD") ||
                r.endsWith("Token") ||
                r.includes("password") ||
                r.includes("token") ||
                (t != null && t.has(r))
                    ? "<stripped sensitive data>"
                    : n,
            2
        );
    }
});
var Tl = g(Pn => {
    "use strict";
    Object.defineProperty(Pn, "__esModule", { value: !0 });
    Pn.githubUrl = p0;
    Pn.getS3LikeProviderBaseUrl = m0;
    function p0(e, t = "github.com") {
        return "".concat(e.protocol || "https", "://").concat(e.host || t);
    }
    function m0(e) {
        let t = e.provider;
        if (t === "s3") return g0(e);
        if (t === "spaces") return w0(e);
        throw new Error("Not supported provider: ".concat(t));
    }
    function g0(e) {
        let t;
        if (e.accelerate == !0) t = "https://".concat(e.bucket, ".s3-accelerate.amazonaws.com");
        else if (e.endpoint != null) t = "".concat(e.endpoint, "/").concat(e.bucket);
        else if (e.bucket.includes(".")) {
            if (e.region == null) throw new Error('Bucket name "'.concat(e.bucket, '" includes a dot, but S3 region is missing'));
            e.region === "us-east-1"
                ? (t = "https://s3.amazonaws.com/".concat(e.bucket))
                : (t = "https://s3-".concat(e.region, ".amazonaws.com/").concat(e.bucket));
        } else
            e.region === "cn-north-1"
                ? (t = "https://".concat(e.bucket, ".s3.").concat(e.region, ".amazonaws.com.cn"))
                : (t = "https://".concat(e.bucket, ".s3.amazonaws.com"));
        return Cl(t, e.path);
    }
    function Cl(e, t) {
        return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), (e += t)), e;
    }
    function w0(e) {
        if (e.name == null) throw new Error("name is missing");
        if (e.region == null) throw new Error("region is missing");
        return Cl("https://".concat(e.name, ".").concat(e.region, ".digitaloceanspaces.com"), e.path);
    }
});
var bl = g(Ao => {
    "use strict";
    Object.defineProperty(Ao, "__esModule", { value: !0 });
    Ao.parseDn = y0;
    function y0(e) {
        let t = !1,
            r = null,
            n = "",
            i = 0;
        e = e.trim();
        let o = new Map();
        for (let s = 0; s <= e.length; s++) {
            if (s === e.length) {
                r !== null && o.set(r, n);
                break;
            }
            let a = e[s];
            if (t) {
                if (a === '"') {
                    t = !1;
                    continue;
                }
            } else {
                if (a === '"') {
                    t = !0;
                    continue;
                }
                if (a === "\\") {
                    s++;
                    let l = parseInt(e.slice(s, s + 2), 16);
                    Number.isNaN(l) ? (n += e[s]) : (s++, (n += String.fromCharCode(l)));
                    continue;
                }
                if (r === null && a === "=") {
                    (r = n), (n = "");
                    continue;
                }
                if (a === "," || a === ";" || a === "+") {
                    r !== null && o.set(r, n), (r = null), (n = "");
                    continue;
                }
            }
            if (a === " " && !t) {
                if (n.length === 0) continue;
                if (s > i) {
                    let l = s;
                    for (; e[l] === " "; ) l++;
                    i = l;
                }
                if (
                    i >= e.length ||
                    e[i] === "," ||
                    e[i] === ";" ||
                    (r === null && e[i] === "=") ||
                    (r !== null && e[i] === "+")
                ) {
                    s = i - 1;
                    continue;
                }
            }
            n += a;
        }
        return o;
    }
});
var Rl = g(Xt => {
    "use strict";
    Object.defineProperty(Xt, "__esModule", { value: !0 });
    Xt.nil = Xt.UUID = void 0;
    var Il = require("crypto"),
        Nl = Or(),
        E0 = "options.name must be either a string or a Buffer",
        Ol = (0, Il.randomBytes)(16);
    Ol[0] = Ol[0] | 1;
    var Dn = {},
        $ = [];
    for (let e = 0; e < 256; e++) {
        let t = (e + 256).toString(16).substr(1);
        (Dn[t] = e), ($[e] = t);
    }
    var St = class e {
        constructor(t) {
            (this.ascii = null), (this.binary = null);
            let r = e.check(t);
            if (!r) throw new Error("not a UUID");
            (this.version = r.version), r.format === "ascii" ? (this.ascii = t) : (this.binary = t);
        }
        static v5(t, r) {
            return _0(t, "sha1", 80, r);
        }
        toString() {
            return this.ascii == null && (this.ascii = v0(this.binary)), this.ascii;
        }
        inspect() {
            return "UUID v".concat(this.version, " ").concat(this.toString());
        }
        static check(t, r = 0) {
            if (typeof t == "string")
                return (
                    (t = t.toLowerCase()),
                    /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(t)
                        ? t === "00000000-0000-0000-0000-000000000000"
                            ? { version: void 0, variant: "nil", format: "ascii" }
                            : {
                                  version: (Dn[t[14] + t[15]] & 240) >> 4,
                                  variant: xl((Dn[t[19] + t[20]] & 224) >> 5),
                                  format: "ascii"
                              }
                        : !1
                );
            if (Buffer.isBuffer(t)) {
                if (t.length < r + 16) return !1;
                let n = 0;
                for (; n < 16 && t[r + n] === 0; n++);
                return n === 16
                    ? { version: void 0, variant: "nil", format: "binary" }
                    : { version: (t[r + 6] & 240) >> 4, variant: xl((t[r + 8] & 224) >> 5), format: "binary" };
            }
            throw (0, Nl.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
        }
        static parse(t) {
            let r = Buffer.allocUnsafe(16),
                n = 0;
            for (let i = 0; i < 16; i++) (r[i] = Dn[t[n++] + t[n++]]), (i === 3 || i === 5 || i === 7 || i === 9) && (n += 1);
            return r;
        }
    };
    Xt.UUID = St;
    St.OID = St.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
    function xl(e) {
        switch (e) {
            case 0:
            case 1:
            case 3:
                return "ncs";
            case 4:
            case 5:
                return "rfc4122";
            case 6:
                return "microsoft";
            default:
                return "future";
        }
    }
    var Rr;
    (function (e) {
        (e[(e.ASCII = 0)] = "ASCII"), (e[(e.BINARY = 1)] = "BINARY"), (e[(e.OBJECT = 2)] = "OBJECT");
    })(Rr || (Rr = {}));
    function _0(e, t, r, n, i = Rr.ASCII) {
        let o = (0, Il.createHash)(t);
        if (typeof e != "string" && !Buffer.isBuffer(e)) throw (0, Nl.newError)(E0, "ERR_INVALID_UUID_NAME");
        o.update(n), o.update(e);
        let a = o.digest(),
            l;
        switch (i) {
            case Rr.BINARY:
                (a[6] = (a[6] & 15) | r), (a[8] = (a[8] & 63) | 128), (l = a);
                break;
            case Rr.OBJECT:
                (a[6] = (a[6] & 15) | r), (a[8] = (a[8] & 63) | 128), (l = new St(a));
                break;
            default:
                l =
                    $[a[0]] +
                    $[a[1]] +
                    $[a[2]] +
                    $[a[3]] +
                    "-" +
                    $[a[4]] +
                    $[a[5]] +
                    "-" +
                    $[(a[6] & 15) | r] +
                    $[a[7]] +
                    "-" +
                    $[(a[8] & 63) | 128] +
                    $[a[9]] +
                    "-" +
                    $[a[10]] +
                    $[a[11]] +
                    $[a[12]] +
                    $[a[13]] +
                    $[a[14]] +
                    $[a[15]];
                break;
        }
        return l;
    }
    function v0(e) {
        return (
            $[e[0]] +
            $[e[1]] +
            $[e[2]] +
            $[e[3]] +
            "-" +
            $[e[4]] +
            $[e[5]] +
            "-" +
            $[e[6]] +
            $[e[7]] +
            "-" +
            $[e[8]] +
            $[e[9]] +
            "-" +
            $[e[10]] +
            $[e[11]] +
            $[e[12]] +
            $[e[13]] +
            $[e[14]] +
            $[e[15]]
        );
    }
    Xt.nil = new St("00000000-0000-0000-0000-000000000000");
});
var Pl = g(Fn => {
    (function (e) {
        (e.parser = function (d, u) {
            return new r(d, u);
        }),
            (e.SAXParser = r),
            (e.SAXStream = h),
            (e.createStream = l),
            (e.MAX_BUFFER_LENGTH = 64 * 1024);
        var t = [
            "comment",
            "sgmlDecl",
            "textNode",
            "tagName",
            "doctype",
            "procInstName",
            "procInstBody",
            "entity",
            "attribName",
            "attribValue",
            "cdata",
            "script"
        ];
        e.EVENTS = [
            "text",
            "processinginstruction",
            "sgmldeclaration",
            "doctype",
            "comment",
            "opentagstart",
            "attribute",
            "opentag",
            "closetag",
            "opencdata",
            "cdata",
            "closecdata",
            "error",
            "end",
            "ready",
            "script",
            "opennamespace",
            "closenamespace"
        ];
        function r(d, u) {
            if (!(this instanceof r)) return new r(d, u);
            var A = this;
            i(A),
                (A.q = A.c = ""),
                (A.bufferCheckPosition = e.MAX_BUFFER_LENGTH),
                (A.opt = u || {}),
                (A.opt.lowercase = A.opt.lowercase || A.opt.lowercasetags),
                (A.looseCase = A.opt.lowercase ? "toLowerCase" : "toUpperCase"),
                (A.tags = []),
                (A.closed = A.closedRoot = A.sawRoot = !1),
                (A.tag = A.error = null),
                (A.strict = !!d),
                (A.noscript = !!(d || A.opt.noscript)),
                (A.state = y.BEGIN),
                (A.strictEntities = A.opt.strictEntities),
                (A.ENTITIES = A.strictEntities ? Object.create(e.XML_ENTITIES) : Object.create(e.ENTITIES)),
                (A.attribList = []),
                A.opt.xmlns && (A.ns = Object.create(E)),
                A.opt.unquotedAttributeValues === void 0 && (A.opt.unquotedAttributeValues = !d),
                (A.trackPosition = A.opt.position !== !1),
                A.trackPosition && (A.position = A.line = A.column = 0),
                U(A, "onready");
        }
        Object.create ||
            (Object.create = function (d) {
                function u() {}
                u.prototype = d;
                var A = new u();
                return A;
            }),
            Object.keys ||
                (Object.keys = function (d) {
                    var u = [];
                    for (var A in d) d.hasOwnProperty(A) && u.push(A);
                    return u;
                });
        function n(d) {
            for (var u = Math.max(e.MAX_BUFFER_LENGTH, 10), A = 0, w = 0, B = t.length; w < B; w++) {
                var ie = d[t[w]].length;
                if (ie > u)
                    switch (t[w]) {
                        case "textNode":
                            K(d);
                            break;
                        case "cdata":
                            R(d, "oncdata", d.cdata), (d.cdata = "");
                            break;
                        case "script":
                            R(d, "onscript", d.script), (d.script = "");
                            break;
                        default:
                            X(d, "Max buffer length exceeded: " + t[w]);
                    }
                A = Math.max(A, ie);
            }
            var oe = e.MAX_BUFFER_LENGTH - A;
            d.bufferCheckPosition = oe + d.position;
        }
        function i(d) {
            for (var u = 0, A = t.length; u < A; u++) d[t[u]] = "";
        }
        function o(d) {
            K(d),
                d.cdata !== "" && (R(d, "oncdata", d.cdata), (d.cdata = "")),
                d.script !== "" && (R(d, "onscript", d.script), (d.script = ""));
        }
        r.prototype = {
            end: function () {
                G(this);
            },
            write: Ig,
            resume: function () {
                return (this.error = null), this;
            },
            close: function () {
                return this.write(null);
            },
            flush: function () {
                o(this);
            }
        };
        var s;
        try {
            s = require("stream").Stream;
        } catch {
            s = function () {};
        }
        s || (s = function () {});
        var a = e.EVENTS.filter(function (d) {
            return d !== "error" && d !== "end";
        });
        function l(d, u) {
            return new h(d, u);
        }
        function h(d, u) {
            if (!(this instanceof h)) return new h(d, u);
            s.apply(this), (this._parser = new r(d, u)), (this.writable = !0), (this.readable = !0);
            var A = this;
            (this._parser.onend = function () {
                A.emit("end");
            }),
                (this._parser.onerror = function (w) {
                    A.emit("error", w), (A._parser.error = null);
                }),
                (this._decoder = null),
                a.forEach(function (w) {
                    Object.defineProperty(A, "on" + w, {
                        get: function () {
                            return A._parser["on" + w];
                        },
                        set: function (B) {
                            if (!B) return A.removeAllListeners(w), (A._parser["on" + w] = B), B;
                            A.on(w, B);
                        },
                        enumerable: !0,
                        configurable: !1
                    });
                });
        }
        (h.prototype = Object.create(s.prototype, { constructor: { value: h } })),
            (h.prototype.write = function (d) {
                if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(d)) {
                    if (!this._decoder) {
                        var u = require("string_decoder").StringDecoder;
                        this._decoder = new u("utf8");
                    }
                    d = this._decoder.write(d);
                }
                return this._parser.write(d.toString()), this.emit("data", d), !0;
            }),
            (h.prototype.end = function (d) {
                return d && d.length && this.write(d), this._parser.end(), !0;
            }),
            (h.prototype.on = function (d, u) {
                var A = this;
                return (
                    !A._parser["on" + d] &&
                        a.indexOf(d) !== -1 &&
                        (A._parser["on" + d] = function () {
                            var w = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
                            w.splice(0, 0, d), A.emit.apply(A, w);
                        }),
                    s.prototype.on.call(A, d, u)
                );
            });
        var c = "[CDATA[",
            f = "DOCTYPE",
            m = "http://www.w3.org/XML/1998/namespace",
            p = "http://www.w3.org/2000/xmlns/",
            E = { xml: m, xmlns: p },
            _ =
                /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,
            v =
                /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/,
            T =
                /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,
            S =
                /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
        function N(d) {
            return d === " " || d === "\n" || d === "\r" || d === "	";
        }
        function L(d) {
            return d === '"' || d === "'";
        }
        function De(d) {
            return d === ">" || N(d);
        }
        function V(d, u) {
            return d.test(u);
        }
        function ce(d, u) {
            return !V(d, u);
        }
        var y = 0;
        (e.STATE = {
            BEGIN: y++,
            BEGIN_WHITESPACE: y++,
            TEXT: y++,
            TEXT_ENTITY: y++,
            OPEN_WAKA: y++,
            SGML_DECL: y++,
            SGML_DECL_QUOTED: y++,
            DOCTYPE: y++,
            DOCTYPE_QUOTED: y++,
            DOCTYPE_DTD: y++,
            DOCTYPE_DTD_QUOTED: y++,
            COMMENT_STARTING: y++,
            COMMENT: y++,
            COMMENT_ENDING: y++,
            COMMENT_ENDED: y++,
            CDATA: y++,
            CDATA_ENDING: y++,
            CDATA_ENDING_2: y++,
            PROC_INST: y++,
            PROC_INST_BODY: y++,
            PROC_INST_ENDING: y++,
            OPEN_TAG: y++,
            OPEN_TAG_SLASH: y++,
            ATTRIB: y++,
            ATTRIB_NAME: y++,
            ATTRIB_NAME_SAW_WHITE: y++,
            ATTRIB_VALUE: y++,
            ATTRIB_VALUE_QUOTED: y++,
            ATTRIB_VALUE_CLOSED: y++,
            ATTRIB_VALUE_UNQUOTED: y++,
            ATTRIB_VALUE_ENTITY_Q: y++,
            ATTRIB_VALUE_ENTITY_U: y++,
            CLOSE_TAG: y++,
            CLOSE_TAG_SAW_WHITE: y++,
            SCRIPT: y++,
            SCRIPT_ENDING: y++
        }),
            (e.XML_ENTITIES = { amp: "&", gt: ">", lt: "<", quot: '"', apos: "'" }),
            (e.ENTITIES = {
                amp: "&",
                gt: ">",
                lt: "<",
                quot: '"',
                apos: "'",
                AElig: 198,
                Aacute: 193,
                Acirc: 194,
                Agrave: 192,
                Aring: 197,
                Atilde: 195,
                Auml: 196,
                Ccedil: 199,
                ETH: 208,
                Eacute: 201,
                Ecirc: 202,
                Egrave: 200,
                Euml: 203,
                Iacute: 205,
                Icirc: 206,
                Igrave: 204,
                Iuml: 207,
                Ntilde: 209,
                Oacute: 211,
                Ocirc: 212,
                Ograve: 210,
                Oslash: 216,
                Otilde: 213,
                Ouml: 214,
                THORN: 222,
                Uacute: 218,
                Ucirc: 219,
                Ugrave: 217,
                Uuml: 220,
                Yacute: 221,
                aacute: 225,
                acirc: 226,
                aelig: 230,
                agrave: 224,
                aring: 229,
                atilde: 227,
                auml: 228,
                ccedil: 231,
                eacute: 233,
                ecirc: 234,
                egrave: 232,
                eth: 240,
                euml: 235,
                iacute: 237,
                icirc: 238,
                igrave: 236,
                iuml: 239,
                ntilde: 241,
                oacute: 243,
                ocirc: 244,
                ograve: 242,
                oslash: 248,
                otilde: 245,
                ouml: 246,
                szlig: 223,
                thorn: 254,
                uacute: 250,
                ucirc: 251,
                ugrave: 249,
                uuml: 252,
                yacute: 253,
                yuml: 255,
                copy: 169,
                reg: 174,
                nbsp: 160,
                iexcl: 161,
                cent: 162,
                pound: 163,
                curren: 164,
                yen: 165,
                brvbar: 166,
                sect: 167,
                uml: 168,
                ordf: 170,
                laquo: 171,
                not: 172,
                shy: 173,
                macr: 175,
                deg: 176,
                plusmn: 177,
                sup1: 185,
                sup2: 178,
                sup3: 179,
                acute: 180,
                micro: 181,
                para: 182,
                middot: 183,
                cedil: 184,
                ordm: 186,
                raquo: 187,
                frac14: 188,
                frac12: 189,
                frac34: 190,
                iquest: 191,
                times: 215,
                divide: 247,
                OElig: 338,
                oelig: 339,
                Scaron: 352,
                scaron: 353,
                Yuml: 376,
                fnof: 402,
                circ: 710,
                tilde: 732,
                Alpha: 913,
                Beta: 914,
                Gamma: 915,
                Delta: 916,
                Epsilon: 917,
                Zeta: 918,
                Eta: 919,
                Theta: 920,
                Iota: 921,
                Kappa: 922,
                Lambda: 923,
                Mu: 924,
                Nu: 925,
                Xi: 926,
                Omicron: 927,
                Pi: 928,
                Rho: 929,
                Sigma: 931,
                Tau: 932,
                Upsilon: 933,
                Phi: 934,
                Chi: 935,
                Psi: 936,
                Omega: 937,
                alpha: 945,
                beta: 946,
                gamma: 947,
                delta: 948,
                epsilon: 949,
                zeta: 950,
                eta: 951,
                theta: 952,
                iota: 953,
                kappa: 954,
                lambda: 955,
                mu: 956,
                nu: 957,
                xi: 958,
                omicron: 959,
                pi: 960,
                rho: 961,
                sigmaf: 962,
                sigma: 963,
                tau: 964,
                upsilon: 965,
                phi: 966,
                chi: 967,
                psi: 968,
                omega: 969,
                thetasym: 977,
                upsih: 978,
                piv: 982,
                ensp: 8194,
                emsp: 8195,
                thinsp: 8201,
                zwnj: 8204,
                zwj: 8205,
                lrm: 8206,
                rlm: 8207,
                ndash: 8211,
                mdash: 8212,
                lsquo: 8216,
                rsquo: 8217,
                sbquo: 8218,
                ldquo: 8220,
                rdquo: 8221,
                bdquo: 8222,
                dagger: 8224,
                Dagger: 8225,
                bull: 8226,
                hellip: 8230,
                permil: 8240,
                prime: 8242,
                Prime: 8243,
                lsaquo: 8249,
                rsaquo: 8250,
                oline: 8254,
                frasl: 8260,
                euro: 8364,
                image: 8465,
                weierp: 8472,
                real: 8476,
                trade: 8482,
                alefsym: 8501,
                larr: 8592,
                uarr: 8593,
                rarr: 8594,
                darr: 8595,
                harr: 8596,
                crarr: 8629,
                lArr: 8656,
                uArr: 8657,
                rArr: 8658,
                dArr: 8659,
                hArr: 8660,
                forall: 8704,
                part: 8706,
                exist: 8707,
                empty: 8709,
                nabla: 8711,
                isin: 8712,
                notin: 8713,
                ni: 8715,
                prod: 8719,
                sum: 8721,
                minus: 8722,
                lowast: 8727,
                radic: 8730,
                prop: 8733,
                infin: 8734,
                ang: 8736,
                and: 8743,
                or: 8744,
                cap: 8745,
                cup: 8746,
                int: 8747,
                there4: 8756,
                sim: 8764,
                cong: 8773,
                asymp: 8776,
                ne: 8800,
                equiv: 8801,
                le: 8804,
                ge: 8805,
                sub: 8834,
                sup: 8835,
                nsub: 8836,
                sube: 8838,
                supe: 8839,
                oplus: 8853,
                otimes: 8855,
                perp: 8869,
                sdot: 8901,
                lceil: 8968,
                rceil: 8969,
                lfloor: 8970,
                rfloor: 8971,
                lang: 9001,
                rang: 9002,
                loz: 9674,
                spades: 9824,
                clubs: 9827,
                hearts: 9829,
                diams: 9830
            }),
            Object.keys(e.ENTITIES).forEach(function (d) {
                var u = e.ENTITIES[d],
                    A = typeof u == "number" ? String.fromCharCode(u) : u;
                e.ENTITIES[d] = A;
            });
        for (var P in e.STATE) e.STATE[e.STATE[P]] = P;
        y = e.STATE;
        function U(d, u, A) {
            d[u] && d[u](A);
        }
        function R(d, u, A) {
            d.textNode && K(d), U(d, u, A);
        }
        function K(d) {
            (d.textNode = re(d.opt, d.textNode)), d.textNode && U(d, "ontext", d.textNode), (d.textNode = "");
        }
        function re(d, u) {
            return d.trim && (u = u.trim()), d.normalize && (u = u.replace(/\s+/g, " ")), u;
        }
        function X(d, u) {
            return (
                K(d),
                d.trackPosition && (u += "\nLine: " + d.line + "\nColumn: " + d.column + "\nChar: " + d.c),
                (u = new Error(u)),
                (d.error = u),
                U(d, "onerror", u),
                d
            );
        }
        function G(d) {
            return (
                d.sawRoot && !d.closedRoot && F(d, "Unclosed root tag"),
                d.state !== y.BEGIN && d.state !== y.BEGIN_WHITESPACE && d.state !== y.TEXT && X(d, "Unexpected end"),
                K(d),
                (d.c = ""),
                (d.closed = !0),
                U(d, "onend"),
                r.call(d, d.strict, d.opt),
                d
            );
        }
        function F(d, u) {
            if (typeof d != "object" || !(d instanceof r)) throw new Error("bad call to strictFail");
            d.strict && X(d, u);
        }
        function H(d) {
            d.strict || (d.tagName = d.tagName[d.looseCase]());
            var u = d.tags[d.tags.length - 1] || d,
                A = (d.tag = { name: d.tagName, attributes: {} });
            d.opt.xmlns && (A.ns = u.ns), (d.attribList.length = 0), R(d, "onopentagstart", A);
        }
        function ee(d, u) {
            var A = d.indexOf(":"),
                w = A < 0 ? ["", d] : d.split(":"),
                B = w[0],
                ie = w[1];
            return u && d === "xmlns" && ((B = "xmlns"), (ie = "")), { prefix: B, local: ie };
        }
        function j(d) {
            if (
                (d.strict || (d.attribName = d.attribName[d.looseCase]()),
                d.attribList.indexOf(d.attribName) !== -1 || d.tag.attributes.hasOwnProperty(d.attribName))
            ) {
                d.attribName = d.attribValue = "";
                return;
            }
            if (d.opt.xmlns) {
                var u = ee(d.attribName, !0),
                    A = u.prefix,
                    w = u.local;
                if (A === "xmlns")
                    if (w === "xml" && d.attribValue !== m)
                        F(d, "xml: prefix must be bound to " + m + "\nActual: " + d.attribValue);
                    else if (w === "xmlns" && d.attribValue !== p)
                        F(d, "xmlns: prefix must be bound to " + p + "\nActual: " + d.attribValue);
                    else {
                        var B = d.tag,
                            ie = d.tags[d.tags.length - 1] || d;
                        B.ns === ie.ns && (B.ns = Object.create(ie.ns)), (B.ns[w] = d.attribValue);
                    }
                d.attribList.push([d.attribName, d.attribValue]);
            } else
                (d.tag.attributes[d.attribName] = d.attribValue),
                    R(d, "onattribute", { name: d.attribName, value: d.attribValue });
            d.attribName = d.attribValue = "";
        }
        function rt(d, u) {
            if (d.opt.xmlns) {
                var A = d.tag,
                    w = ee(d.tagName);
                (A.prefix = w.prefix),
                    (A.local = w.local),
                    (A.uri = A.ns[w.prefix] || ""),
                    A.prefix && !A.uri && (F(d, "Unbound namespace prefix: " + JSON.stringify(d.tagName)), (A.uri = w.prefix));
                var B = d.tags[d.tags.length - 1] || d;
                A.ns &&
                    B.ns !== A.ns &&
                    Object.keys(A.ns).forEach(function (ol) {
                        R(d, "onopennamespace", { prefix: ol, uri: A.ns[ol] });
                    });
                for (var ie = 0, oe = d.attribList.length; ie < oe; ie++) {
                    var Te = d.attribList[ie],
                        be = Te[0],
                        jt = Te[1],
                        fe = ee(be, !0),
                        ze = fe.prefix,
                        Ng = fe.local,
                        il = ze === "" ? "" : A.ns[ze] || "",
                        uo = { name: be, value: jt, prefix: ze, local: Ng, uri: il };
                    ze && ze !== "xmlns" && !il && (F(d, "Unbound namespace prefix: " + JSON.stringify(ze)), (uo.uri = ze)),
                        (d.tag.attributes[be] = uo),
                        R(d, "onattribute", uo);
                }
                d.attribList.length = 0;
            }
            (d.tag.isSelfClosing = !!u),
                (d.sawRoot = !0),
                d.tags.push(d.tag),
                R(d, "onopentag", d.tag),
                u ||
                    (!d.noscript && d.tagName.toLowerCase() === "script" ? (d.state = y.SCRIPT) : (d.state = y.TEXT),
                    (d.tag = null),
                    (d.tagName = "")),
                (d.attribName = d.attribValue = ""),
                (d.attribList.length = 0);
        }
        function lo(d) {
            if (!d.tagName) {
                F(d, "Weird empty close tag."), (d.textNode += "</>"), (d.state = y.TEXT);
                return;
            }
            if (d.script) {
                if (d.tagName !== "script") {
                    (d.script += "</" + d.tagName + ">"), (d.tagName = ""), (d.state = y.SCRIPT);
                    return;
                }
                R(d, "onscript", d.script), (d.script = "");
            }
            var u = d.tags.length,
                A = d.tagName;
            d.strict || (A = A[d.looseCase]());
            for (var w = A; u--; ) {
                var B = d.tags[u];
                if (B.name !== w) F(d, "Unexpected close tag");
                else break;
            }
            if (u < 0) {
                F(d, "Unmatched closing tag: " + d.tagName), (d.textNode += "</" + d.tagName + ">"), (d.state = y.TEXT);
                return;
            }
            d.tagName = A;
            for (var ie = d.tags.length; ie-- > u; ) {
                var oe = (d.tag = d.tags.pop());
                (d.tagName = d.tag.name), R(d, "onclosetag", d.tagName);
                var Te = {};
                for (var be in oe.ns) Te[be] = oe.ns[be];
                var jt = d.tags[d.tags.length - 1] || d;
                d.opt.xmlns &&
                    oe.ns !== jt.ns &&
                    Object.keys(oe.ns).forEach(function (fe) {
                        var ze = oe.ns[fe];
                        R(d, "onclosenamespace", { prefix: fe, uri: ze });
                    });
            }
            u === 0 && (d.closedRoot = !0),
                (d.tagName = d.attribValue = d.attribName = ""),
                (d.attribList.length = 0),
                (d.state = y.TEXT);
        }
        function xg(d) {
            var u = d.entity,
                A = u.toLowerCase(),
                w,
                B = "";
            return d.ENTITIES[u]
                ? d.ENTITIES[u]
                : d.ENTITIES[A]
                ? d.ENTITIES[A]
                : ((u = A),
                  u.charAt(0) === "#" &&
                      (u.charAt(1) === "x"
                          ? ((u = u.slice(2)), (w = parseInt(u, 16)), (B = w.toString(16)))
                          : ((u = u.slice(1)), (w = parseInt(u, 10)), (B = w.toString(10)))),
                  (u = u.replace(/^0+/, "")),
                  isNaN(w) || B.toLowerCase() !== u
                      ? (F(d, "Invalid character entity"), "&" + d.entity + ";")
                      : String.fromCodePoint(w));
        }
        function rl(d, u) {
            u === "<"
                ? ((d.state = y.OPEN_WAKA), (d.startTagPosition = d.position))
                : N(u) || (F(d, "Non-whitespace before first tag."), (d.textNode = u), (d.state = y.TEXT));
        }
        function nl(d, u) {
            var A = "";
            return u < d.length && (A = d.charAt(u)), A;
        }
        function Ig(d) {
            var u = this;
            if (this.error) throw this.error;
            if (u.closed) return X(u, "Cannot write after close. Assign an onready handler.");
            if (d === null) return G(u);
            typeof d == "object" && (d = d.toString());
            for (var A = 0, w = ""; (w = nl(d, A++)), (u.c = w), !!w; )
                switch ((u.trackPosition && (u.position++, w === "\n" ? (u.line++, (u.column = 0)) : u.column++), u.state)) {
                    case y.BEGIN:
                        if (((u.state = y.BEGIN_WHITESPACE), w === "\uFEFF")) continue;
                        rl(u, w);
                        continue;
                    case y.BEGIN_WHITESPACE:
                        rl(u, w);
                        continue;
                    case y.TEXT:
                        if (u.sawRoot && !u.closedRoot) {
                            for (var B = A - 1; w && w !== "<" && w !== "&"; )
                                (w = nl(d, A++)),
                                    w && u.trackPosition && (u.position++, w === "\n" ? (u.line++, (u.column = 0)) : u.column++);
                            u.textNode += d.substring(B, A - 1);
                        }
                        w === "<" && !(u.sawRoot && u.closedRoot && !u.strict)
                            ? ((u.state = y.OPEN_WAKA), (u.startTagPosition = u.position))
                            : (!N(w) && (!u.sawRoot || u.closedRoot) && F(u, "Text data outside of root node."),
                              w === "&" ? (u.state = y.TEXT_ENTITY) : (u.textNode += w));
                        continue;
                    case y.SCRIPT:
                        w === "<" ? (u.state = y.SCRIPT_ENDING) : (u.script += w);
                        continue;
                    case y.SCRIPT_ENDING:
                        w === "/" ? (u.state = y.CLOSE_TAG) : ((u.script += "<" + w), (u.state = y.SCRIPT));
                        continue;
                    case y.OPEN_WAKA:
                        if (w === "!") (u.state = y.SGML_DECL), (u.sgmlDecl = "");
                        else if (!N(w))
                            if (V(_, w)) (u.state = y.OPEN_TAG), (u.tagName = w);
                            else if (w === "/") (u.state = y.CLOSE_TAG), (u.tagName = "");
                            else if (w === "?") (u.state = y.PROC_INST), (u.procInstName = u.procInstBody = "");
                            else {
                                if ((F(u, "Unencoded <"), u.startTagPosition + 1 < u.position)) {
                                    var ie = u.position - u.startTagPosition;
                                    w = new Array(ie).join(" ") + w;
                                }
                                (u.textNode += "<" + w), (u.state = y.TEXT);
                            }
                        continue;
                    case y.SGML_DECL:
                        if (u.sgmlDecl + w === "--") {
                            (u.state = y.COMMENT), (u.comment = ""), (u.sgmlDecl = "");
                            continue;
                        }
                        u.doctype && u.doctype !== !0 && u.sgmlDecl
                            ? ((u.state = y.DOCTYPE_DTD), (u.doctype += "<!" + u.sgmlDecl + w), (u.sgmlDecl = ""))
                            : (u.sgmlDecl + w).toUpperCase() === c
                            ? (R(u, "onopencdata"), (u.state = y.CDATA), (u.sgmlDecl = ""), (u.cdata = ""))
                            : (u.sgmlDecl + w).toUpperCase() === f
                            ? ((u.state = y.DOCTYPE),
                              (u.doctype || u.sawRoot) && F(u, "Inappropriately located doctype declaration"),
                              (u.doctype = ""),
                              (u.sgmlDecl = ""))
                            : w === ">"
                            ? (R(u, "onsgmldeclaration", u.sgmlDecl), (u.sgmlDecl = ""), (u.state = y.TEXT))
                            : (L(w) && (u.state = y.SGML_DECL_QUOTED), (u.sgmlDecl += w));
                        continue;
                    case y.SGML_DECL_QUOTED:
                        w === u.q && ((u.state = y.SGML_DECL), (u.q = "")), (u.sgmlDecl += w);
                        continue;
                    case y.DOCTYPE:
                        w === ">"
                            ? ((u.state = y.TEXT), R(u, "ondoctype", u.doctype), (u.doctype = !0))
                            : ((u.doctype += w),
                              w === "[" ? (u.state = y.DOCTYPE_DTD) : L(w) && ((u.state = y.DOCTYPE_QUOTED), (u.q = w)));
                        continue;
                    case y.DOCTYPE_QUOTED:
                        (u.doctype += w), w === u.q && ((u.q = ""), (u.state = y.DOCTYPE));
                        continue;
                    case y.DOCTYPE_DTD:
                        w === "]"
                            ? ((u.doctype += w), (u.state = y.DOCTYPE))
                            : w === "<"
                            ? ((u.state = y.OPEN_WAKA), (u.startTagPosition = u.position))
                            : L(w)
                            ? ((u.doctype += w), (u.state = y.DOCTYPE_DTD_QUOTED), (u.q = w))
                            : (u.doctype += w);
                        continue;
                    case y.DOCTYPE_DTD_QUOTED:
                        (u.doctype += w), w === u.q && ((u.state = y.DOCTYPE_DTD), (u.q = ""));
                        continue;
                    case y.COMMENT:
                        w === "-" ? (u.state = y.COMMENT_ENDING) : (u.comment += w);
                        continue;
                    case y.COMMENT_ENDING:
                        w === "-"
                            ? ((u.state = y.COMMENT_ENDED),
                              (u.comment = re(u.opt, u.comment)),
                              u.comment && R(u, "oncomment", u.comment),
                              (u.comment = ""))
                            : ((u.comment += "-" + w), (u.state = y.COMMENT));
                        continue;
                    case y.COMMENT_ENDED:
                        w !== ">"
                            ? (F(u, "Malformed comment"), (u.comment += "--" + w), (u.state = y.COMMENT))
                            : u.doctype && u.doctype !== !0
                            ? (u.state = y.DOCTYPE_DTD)
                            : (u.state = y.TEXT);
                        continue;
                    case y.CDATA:
                        w === "]" ? (u.state = y.CDATA_ENDING) : (u.cdata += w);
                        continue;
                    case y.CDATA_ENDING:
                        w === "]" ? (u.state = y.CDATA_ENDING_2) : ((u.cdata += "]" + w), (u.state = y.CDATA));
                        continue;
                    case y.CDATA_ENDING_2:
                        w === ">"
                            ? (u.cdata && R(u, "oncdata", u.cdata), R(u, "onclosecdata"), (u.cdata = ""), (u.state = y.TEXT))
                            : w === "]"
                            ? (u.cdata += "]")
                            : ((u.cdata += "]]" + w), (u.state = y.CDATA));
                        continue;
                    case y.PROC_INST:
                        w === "?" ? (u.state = y.PROC_INST_ENDING) : N(w) ? (u.state = y.PROC_INST_BODY) : (u.procInstName += w);
                        continue;
                    case y.PROC_INST_BODY:
                        if (!u.procInstBody && N(w)) continue;
                        w === "?" ? (u.state = y.PROC_INST_ENDING) : (u.procInstBody += w);
                        continue;
                    case y.PROC_INST_ENDING:
                        w === ">"
                            ? (R(u, "onprocessinginstruction", { name: u.procInstName, body: u.procInstBody }),
                              (u.procInstName = u.procInstBody = ""),
                              (u.state = y.TEXT))
                            : ((u.procInstBody += "?" + w), (u.state = y.PROC_INST_BODY));
                        continue;
                    case y.OPEN_TAG:
                        V(v, w)
                            ? (u.tagName += w)
                            : (H(u),
                              w === ">"
                                  ? rt(u)
                                  : w === "/"
                                  ? (u.state = y.OPEN_TAG_SLASH)
                                  : (N(w) || F(u, "Invalid character in tag name"), (u.state = y.ATTRIB)));
                        continue;
                    case y.OPEN_TAG_SLASH:
                        w === ">"
                            ? (rt(u, !0), lo(u))
                            : (F(u, "Forward-slash in opening tag not followed by >"), (u.state = y.ATTRIB));
                        continue;
                    case y.ATTRIB:
                        if (N(w)) continue;
                        w === ">"
                            ? rt(u)
                            : w === "/"
                            ? (u.state = y.OPEN_TAG_SLASH)
                            : V(_, w)
                            ? ((u.attribName = w), (u.attribValue = ""), (u.state = y.ATTRIB_NAME))
                            : F(u, "Invalid attribute name");
                        continue;
                    case y.ATTRIB_NAME:
                        w === "="
                            ? (u.state = y.ATTRIB_VALUE)
                            : w === ">"
                            ? (F(u, "Attribute without value"), (u.attribValue = u.attribName), j(u), rt(u))
                            : N(w)
                            ? (u.state = y.ATTRIB_NAME_SAW_WHITE)
                            : V(v, w)
                            ? (u.attribName += w)
                            : F(u, "Invalid attribute name");
                        continue;
                    case y.ATTRIB_NAME_SAW_WHITE:
                        if (w === "=") u.state = y.ATTRIB_VALUE;
                        else {
                            if (N(w)) continue;
                            F(u, "Attribute without value"),
                                (u.tag.attributes[u.attribName] = ""),
                                (u.attribValue = ""),
                                R(u, "onattribute", { name: u.attribName, value: "" }),
                                (u.attribName = ""),
                                w === ">"
                                    ? rt(u)
                                    : V(_, w)
                                    ? ((u.attribName = w), (u.state = y.ATTRIB_NAME))
                                    : (F(u, "Invalid attribute name"), (u.state = y.ATTRIB));
                        }
                        continue;
                    case y.ATTRIB_VALUE:
                        if (N(w)) continue;
                        L(w)
                            ? ((u.q = w), (u.state = y.ATTRIB_VALUE_QUOTED))
                            : (u.opt.unquotedAttributeValues || X(u, "Unquoted attribute value"),
                              (u.state = y.ATTRIB_VALUE_UNQUOTED),
                              (u.attribValue = w));
                        continue;
                    case y.ATTRIB_VALUE_QUOTED:
                        if (w !== u.q) {
                            w === "&" ? (u.state = y.ATTRIB_VALUE_ENTITY_Q) : (u.attribValue += w);
                            continue;
                        }
                        j(u), (u.q = ""), (u.state = y.ATTRIB_VALUE_CLOSED);
                        continue;
                    case y.ATTRIB_VALUE_CLOSED:
                        N(w)
                            ? (u.state = y.ATTRIB)
                            : w === ">"
                            ? rt(u)
                            : w === "/"
                            ? (u.state = y.OPEN_TAG_SLASH)
                            : V(_, w)
                            ? (F(u, "No whitespace between attributes"),
                              (u.attribName = w),
                              (u.attribValue = ""),
                              (u.state = y.ATTRIB_NAME))
                            : F(u, "Invalid attribute name");
                        continue;
                    case y.ATTRIB_VALUE_UNQUOTED:
                        if (!De(w)) {
                            w === "&" ? (u.state = y.ATTRIB_VALUE_ENTITY_U) : (u.attribValue += w);
                            continue;
                        }
                        j(u), w === ">" ? rt(u) : (u.state = y.ATTRIB);
                        continue;
                    case y.CLOSE_TAG:
                        if (u.tagName)
                            w === ">"
                                ? lo(u)
                                : V(v, w)
                                ? (u.tagName += w)
                                : u.script
                                ? ((u.script += "</" + u.tagName), (u.tagName = ""), (u.state = y.SCRIPT))
                                : (N(w) || F(u, "Invalid tagname in closing tag"), (u.state = y.CLOSE_TAG_SAW_WHITE));
                        else {
                            if (N(w)) continue;
                            ce(_, w)
                                ? u.script
                                    ? ((u.script += "</" + w), (u.state = y.SCRIPT))
                                    : F(u, "Invalid tagname in closing tag.")
                                : (u.tagName = w);
                        }
                        continue;
                    case y.CLOSE_TAG_SAW_WHITE:
                        if (N(w)) continue;
                        w === ">" ? lo(u) : F(u, "Invalid characters in closing tag");
                        continue;
                    case y.TEXT_ENTITY:
                    case y.ATTRIB_VALUE_ENTITY_Q:
                    case y.ATTRIB_VALUE_ENTITY_U:
                        var oe, Te;
                        switch (u.state) {
                            case y.TEXT_ENTITY:
                                (oe = y.TEXT), (Te = "textNode");
                                break;
                            case y.ATTRIB_VALUE_ENTITY_Q:
                                (oe = y.ATTRIB_VALUE_QUOTED), (Te = "attribValue");
                                break;
                            case y.ATTRIB_VALUE_ENTITY_U:
                                (oe = y.ATTRIB_VALUE_UNQUOTED), (Te = "attribValue");
                                break;
                        }
                        if (w === ";") {
                            var be = xg(u);
                            u.opt.unparsedEntities && !Object.values(e.XML_ENTITIES).includes(be)
                                ? ((u.entity = ""), (u.state = oe), u.write(be))
                                : ((u[Te] += be), (u.entity = ""), (u.state = oe));
                        } else
                            V(u.entity.length ? S : T, w)
                                ? (u.entity += w)
                                : (F(u, "Invalid character in entity name"),
                                  (u[Te] += "&" + u.entity + w),
                                  (u.entity = ""),
                                  (u.state = oe));
                        continue;
                    default:
                        throw new Error(u, "Unknown state: " + u.state);
                }
            return u.position >= u.bufferCheckPosition && n(u), u;
        }
        String.fromCodePoint ||
            (function () {
                var d = String.fromCharCode,
                    u = Math.floor,
                    A = function () {
                        var w = 16384,
                            B = [],
                            ie,
                            oe,
                            Te = -1,
                            be = arguments.length;
                        if (!be) return "";
                        for (var jt = ""; ++Te < be; ) {
                            var fe = Number(arguments[Te]);
                            if (!isFinite(fe) || fe < 0 || fe > 1114111 || u(fe) !== fe)
                                throw RangeError("Invalid code point: " + fe);
                            fe <= 65535
                                ? B.push(fe)
                                : ((fe -= 65536), (ie = (fe >> 10) + 55296), (oe = (fe % 1024) + 56320), B.push(ie, oe)),
                                (Te + 1 === be || B.length > w) && ((jt += d.apply(null, B)), (B.length = 0));
                        }
                        return jt;
                    };
                Object.defineProperty
                    ? Object.defineProperty(String, "fromCodePoint", { value: A, configurable: !0, writable: !0 })
                    : (String.fromCodePoint = A);
            })();
    })(typeof Fn > "u" ? (Fn.sax = {}) : Fn);
});
var Fl = g(Pr => {
    "use strict";
    Object.defineProperty(Pr, "__esModule", { value: !0 });
    Pr.XElement = void 0;
    Pr.parseXml = T0;
    var A0 = Pl(),
        qn = Or(),
        Ln = class {
            constructor(t) {
                if (
                    ((this.name = t),
                    (this.value = ""),
                    (this.attributes = null),
                    (this.isCData = !1),
                    (this.elements = null),
                    !t)
                )
                    throw (0, qn.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
                if (!C0(t)) throw (0, qn.newError)("Invalid element name: ".concat(t), "ERR_XML_ELEMENT_INVALID_NAME");
            }
            attribute(t) {
                let r = this.attributes === null ? null : this.attributes[t];
                if (r == null) throw (0, qn.newError)('No attribute "'.concat(t, '"'), "ERR_XML_MISSED_ATTRIBUTE");
                return r;
            }
            removeAttribute(t) {
                this.attributes !== null && delete this.attributes[t];
            }
            element(t, r = !1, n = null) {
                let i = this.elementOrNull(t, r);
                if (i === null) throw (0, qn.newError)(n || 'No element "'.concat(t, '"'), "ERR_XML_MISSED_ELEMENT");
                return i;
            }
            elementOrNull(t, r = !1) {
                if (this.elements === null) return null;
                for (let n of this.elements) if (Dl(n, t, r)) return n;
                return null;
            }
            getElements(t, r = !1) {
                return this.elements === null ? [] : this.elements.filter(n => Dl(n, t, r));
            }
            elementValueOrEmpty(t, r = !1) {
                let n = this.elementOrNull(t, r);
                return n === null ? "" : n.value;
            }
        };
    Pr.XElement = Ln;
    var S0 = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
    function C0(e) {
        return S0.test(e);
    }
    function Dl(e, t, r) {
        let n = e.name;
        return n === t || (r === !0 && n.length === t.length && n.toLowerCase() === t.toLowerCase());
    }
    function T0(e) {
        let t = null,
            r = A0.parser(!0, {}),
            n = [];
        return (
            (r.onopentag = i => {
                let o = new Ln(i.name);
                if (((o.attributes = i.attributes), t === null)) t = o;
                else {
                    let s = n[n.length - 1];
                    s.elements == null && (s.elements = []), s.elements.push(o);
                }
                n.push(o);
            }),
            (r.onclosetag = () => {
                n.pop();
            }),
            (r.ontext = i => {
                n.length > 0 && (n[n.length - 1].value = i);
            }),
            (r.oncdata = i => {
                let o = n[n.length - 1];
                (o.value = i), (o.isCData = !0);
            }),
            (r.onerror = i => {
                throw i;
            }),
            r.write(e),
            t
        );
    }
});
var Ll = g(Un => {
    "use strict";
    Object.defineProperty(Un, "__esModule", { value: !0 });
    Un.MemoLazy = void 0;
    var So = class {
        constructor(t, r) {
            (this.selector = t), (this.creator = r), (this.selected = void 0), (this._value = void 0);
        }
        get hasValue() {
            return this._value !== void 0;
        }
        get value() {
            let t = this.selector();
            if (this._value !== void 0 && ql(this.selected, t)) return this._value;
            this.selected = t;
            let r = this.creator(t);
            return (this.value = r), r;
        }
        set value(t) {
            this._value = t;
        }
    };
    Un.MemoLazy = So;
    function ql(e, t) {
        if (typeof e == "object" && e !== null && typeof t == "object" && t !== null) {
            let i = Object.keys(e),
                o = Object.keys(t);
            return i.length === o.length && i.every(s => ql(e[s], t[s]));
        }
        return e === t;
    }
});
var $l = g(Co => {
    "use strict";
    Object.defineProperty(Co, "__esModule", { value: !0 });
    Co.retry = Ul;
    var b0 = Cn();
    async function Ul(e, t, r, n = 0, i = 0, o) {
        var s;
        let a = new b0.CancellationToken();
        try {
            return await e();
        } catch (l) {
            if ((!((s = o?.(l)) !== null && s !== void 0) || s) && t > 0 && !a.cancelled)
                return await new Promise(h => setTimeout(h, r + n * i)), await Ul(e, t - 1, r, n, i + 1, o);
            throw l;
        }
    }
});
var le = g(D => {
    "use strict";
    Object.defineProperty(D, "__esModule", { value: !0 });
    D.CURRENT_APP_PACKAGE_FILE_NAME =
        D.CURRENT_APP_INSTALLER_FILE_NAME =
        D.retry =
        D.MemoLazy =
        D.newError =
        D.XElement =
        D.parseXml =
        D.ProgressCallbackTransform =
        D.UUID =
        D.parseDn =
        D.githubUrl =
        D.getS3LikeProviderBaseUrl =
        D.configureRequestUrl =
        D.parseJson =
        D.safeStringifyJson =
        D.configureRequestOptionsFromUrl =
        D.configureRequestOptions =
        D.safeGetHeader =
        D.DigestTransform =
        D.HttpExecutor =
        D.createHttpError =
        D.HttpError =
        D.CancellationError =
        D.CancellationToken =
            void 0;
    D.asArray = D0;
    var kl = Cn();
    Object.defineProperty(D, "CancellationToken", {
        enumerable: !0,
        get: function () {
            return kl.CancellationToken;
        }
    });
    Object.defineProperty(D, "CancellationError", {
        enumerable: !0,
        get: function () {
            return kl.CancellationError;
        }
    });
    var He = Sl();
    Object.defineProperty(D, "HttpError", {
        enumerable: !0,
        get: function () {
            return He.HttpError;
        }
    });
    Object.defineProperty(D, "createHttpError", {
        enumerable: !0,
        get: function () {
            return He.createHttpError;
        }
    });
    Object.defineProperty(D, "HttpExecutor", {
        enumerable: !0,
        get: function () {
            return He.HttpExecutor;
        }
    });
    Object.defineProperty(D, "DigestTransform", {
        enumerable: !0,
        get: function () {
            return He.DigestTransform;
        }
    });
    Object.defineProperty(D, "safeGetHeader", {
        enumerable: !0,
        get: function () {
            return He.safeGetHeader;
        }
    });
    Object.defineProperty(D, "configureRequestOptions", {
        enumerable: !0,
        get: function () {
            return He.configureRequestOptions;
        }
    });
    Object.defineProperty(D, "configureRequestOptionsFromUrl", {
        enumerable: !0,
        get: function () {
            return He.configureRequestOptionsFromUrl;
        }
    });
    Object.defineProperty(D, "safeStringifyJson", {
        enumerable: !0,
        get: function () {
            return He.safeStringifyJson;
        }
    });
    Object.defineProperty(D, "parseJson", {
        enumerable: !0,
        get: function () {
            return He.parseJson;
        }
    });
    Object.defineProperty(D, "configureRequestUrl", {
        enumerable: !0,
        get: function () {
            return He.configureRequestUrl;
        }
    });
    var Ml = Tl();
    Object.defineProperty(D, "getS3LikeProviderBaseUrl", {
        enumerable: !0,
        get: function () {
            return Ml.getS3LikeProviderBaseUrl;
        }
    });
    Object.defineProperty(D, "githubUrl", {
        enumerable: !0,
        get: function () {
            return Ml.githubUrl;
        }
    });
    var O0 = bl();
    Object.defineProperty(D, "parseDn", {
        enumerable: !0,
        get: function () {
            return O0.parseDn;
        }
    });
    var x0 = Rl();
    Object.defineProperty(D, "UUID", {
        enumerable: !0,
        get: function () {
            return x0.UUID;
        }
    });
    var I0 = yo();
    Object.defineProperty(D, "ProgressCallbackTransform", {
        enumerable: !0,
        get: function () {
            return I0.ProgressCallbackTransform;
        }
    });
    var Bl = Fl();
    Object.defineProperty(D, "parseXml", {
        enumerable: !0,
        get: function () {
            return Bl.parseXml;
        }
    });
    Object.defineProperty(D, "XElement", {
        enumerable: !0,
        get: function () {
            return Bl.XElement;
        }
    });
    var N0 = Or();
    Object.defineProperty(D, "newError", {
        enumerable: !0,
        get: function () {
            return N0.newError;
        }
    });
    var R0 = Ll();
    Object.defineProperty(D, "MemoLazy", {
        enumerable: !0,
        get: function () {
            return R0.MemoLazy;
        }
    });
    var P0 = $l();
    Object.defineProperty(D, "retry", {
        enumerable: !0,
        get: function () {
            return P0.retry;
        }
    });
    D.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe";
    D.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
    function D0(e) {
        return e == null ? [] : Array.isArray(e) ? e : [e];
    }
});
var Oe = g(To => {
    "use strict";
    To.fromCallback = function (e) {
        return Object.defineProperty(
            function (...t) {
                if (typeof t[t.length - 1] == "function") e.apply(this, t);
                else
                    return new Promise((r, n) => {
                        t.push((i, o) => (i != null ? n(i) : r(o))), e.apply(this, t);
                    });
            },
            "name",
            { value: e.name }
        );
    };
    To.fromPromise = function (e) {
        return Object.defineProperty(
            function (...t) {
                let r = t[t.length - 1];
                if (typeof r != "function") return e.apply(this, t);
                t.pop(), e.apply(this, t).then(n => r(null, n), r);
            },
            "name",
            { value: e.name }
        );
    };
});
var jl = g((_x, Hl) => {
    var it = require("constants"),
        F0 = process.cwd,
        $n = null,
        q0 = process.env.GRACEFUL_FS_PLATFORM || process.platform;
    process.cwd = function () {
        return $n || ($n = F0.call(process)), $n;
    };
    try {
        process.cwd();
    } catch {}
    typeof process.chdir == "function" &&
        ((bo = process.chdir),
        (process.chdir = function (e) {
            ($n = null), bo.call(process, e);
        }),
        Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, bo));
    var bo;
    Hl.exports = L0;
    function L0(e) {
        it.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e),
            e.lutimes || r(e),
            (e.chown = o(e.chown)),
            (e.fchown = o(e.fchown)),
            (e.lchown = o(e.lchown)),
            (e.chmod = n(e.chmod)),
            (e.fchmod = n(e.fchmod)),
            (e.lchmod = n(e.lchmod)),
            (e.chownSync = s(e.chownSync)),
            (e.fchownSync = s(e.fchownSync)),
            (e.lchownSync = s(e.lchownSync)),
            (e.chmodSync = i(e.chmodSync)),
            (e.fchmodSync = i(e.fchmodSync)),
            (e.lchmodSync = i(e.lchmodSync)),
            (e.stat = a(e.stat)),
            (e.fstat = a(e.fstat)),
            (e.lstat = a(e.lstat)),
            (e.statSync = l(e.statSync)),
            (e.fstatSync = l(e.fstatSync)),
            (e.lstatSync = l(e.lstatSync)),
            e.chmod &&
                !e.lchmod &&
                ((e.lchmod = function (c, f, m) {
                    m && process.nextTick(m);
                }),
                (e.lchmodSync = function () {})),
            e.chown &&
                !e.lchown &&
                ((e.lchown = function (c, f, m, p) {
                    p && process.nextTick(p);
                }),
                (e.lchownSync = function () {})),
            q0 === "win32" &&
                (e.rename =
                    typeof e.rename != "function"
                        ? e.rename
                        : (function (c) {
                              function f(m, p, E) {
                                  var _ = Date.now(),
                                      v = 0;
                                  c(m, p, function T(S) {
                                      if (
                                          S &&
                                          (S.code === "EACCES" || S.code === "EPERM" || S.code === "EBUSY") &&
                                          Date.now() - _ < 6e4
                                      ) {
                                          setTimeout(function () {
                                              e.stat(p, function (N, L) {
                                                  N && N.code === "ENOENT" ? c(m, p, T) : E(S);
                                              });
                                          }, v),
                                              v < 100 && (v += 10);
                                          return;
                                      }
                                      E && E(S);
                                  });
                              }
                              return Object.setPrototypeOf && Object.setPrototypeOf(f, c), f;
                          })(e.rename)),
            (e.read =
                typeof e.read != "function"
                    ? e.read
                    : (function (c) {
                          function f(m, p, E, _, v, T) {
                              var S;
                              if (T && typeof T == "function") {
                                  var N = 0;
                                  S = function (L, De, V) {
                                      if (L && L.code === "EAGAIN" && N < 10) return N++, c.call(e, m, p, E, _, v, S);
                                      T.apply(this, arguments);
                                  };
                              }
                              return c.call(e, m, p, E, _, v, S);
                          }
                          return Object.setPrototypeOf && Object.setPrototypeOf(f, c), f;
                      })(e.read)),
            (e.readSync =
                typeof e.readSync != "function"
                    ? e.readSync
                    : (function (c) {
                          return function (f, m, p, E, _) {
                              for (var v = 0; ; )
                                  try {
                                      return c.call(e, f, m, p, E, _);
                                  } catch (T) {
                                      if (T.code === "EAGAIN" && v < 10) {
                                          v++;
                                          continue;
                                      }
                                      throw T;
                                  }
                          };
                      })(e.readSync));
        function t(c) {
            (c.lchmod = function (f, m, p) {
                c.open(f, it.O_WRONLY | it.O_SYMLINK, m, function (E, _) {
                    if (E) {
                        p && p(E);
                        return;
                    }
                    c.fchmod(_, m, function (v) {
                        c.close(_, function (T) {
                            p && p(v || T);
                        });
                    });
                });
            }),
                (c.lchmodSync = function (f, m) {
                    var p = c.openSync(f, it.O_WRONLY | it.O_SYMLINK, m),
                        E = !0,
                        _;
                    try {
                        (_ = c.fchmodSync(p, m)), (E = !1);
                    } finally {
                        if (E)
                            try {
                                c.closeSync(p);
                            } catch {}
                        else c.closeSync(p);
                    }
                    return _;
                });
        }
        function r(c) {
            it.hasOwnProperty("O_SYMLINK") && c.futimes
                ? ((c.lutimes = function (f, m, p, E) {
                      c.open(f, it.O_SYMLINK, function (_, v) {
                          if (_) {
                              E && E(_);
                              return;
                          }
                          c.futimes(v, m, p, function (T) {
                              c.close(v, function (S) {
                                  E && E(T || S);
                              });
                          });
                      });
                  }),
                  (c.lutimesSync = function (f, m, p) {
                      var E = c.openSync(f, it.O_SYMLINK),
                          _,
                          v = !0;
                      try {
                          (_ = c.futimesSync(E, m, p)), (v = !1);
                      } finally {
                          if (v)
                              try {
                                  c.closeSync(E);
                              } catch {}
                          else c.closeSync(E);
                      }
                      return _;
                  }))
                : c.futimes &&
                  ((c.lutimes = function (f, m, p, E) {
                      E && process.nextTick(E);
                  }),
                  (c.lutimesSync = function () {}));
        }
        function n(c) {
            return (
                c &&
                function (f, m, p) {
                    return c.call(e, f, m, function (E) {
                        h(E) && (E = null), p && p.apply(this, arguments);
                    });
                }
            );
        }
        function i(c) {
            return (
                c &&
                function (f, m) {
                    try {
                        return c.call(e, f, m);
                    } catch (p) {
                        if (!h(p)) throw p;
                    }
                }
            );
        }
        function o(c) {
            return (
                c &&
                function (f, m, p, E) {
                    return c.call(e, f, m, p, function (_) {
                        h(_) && (_ = null), E && E.apply(this, arguments);
                    });
                }
            );
        }
        function s(c) {
            return (
                c &&
                function (f, m, p) {
                    try {
                        return c.call(e, f, m, p);
                    } catch (E) {
                        if (!h(E)) throw E;
                    }
                }
            );
        }
        function a(c) {
            return (
                c &&
                function (f, m, p) {
                    typeof m == "function" && ((p = m), (m = null));
                    function E(_, v) {
                        v && (v.uid < 0 && (v.uid += 4294967296), v.gid < 0 && (v.gid += 4294967296)),
                            p && p.apply(this, arguments);
                    }
                    return m ? c.call(e, f, m, E) : c.call(e, f, E);
                }
            );
        }
        function l(c) {
            return (
                c &&
                function (f, m) {
                    var p = m ? c.call(e, f, m) : c.call(e, f);
                    return p && (p.uid < 0 && (p.uid += 4294967296), p.gid < 0 && (p.gid += 4294967296)), p;
                }
            );
        }
        function h(c) {
            if (!c || c.code === "ENOSYS") return !0;
            var f = !process.getuid || process.getuid() !== 0;
            return !!(f && (c.code === "EINVAL" || c.code === "EPERM"));
        }
    }
});
var Vl = g((vx, Gl) => {
    var Wl = require("stream").Stream;
    Gl.exports = U0;
    function U0(e) {
        return { ReadStream: t, WriteStream: r };
        function t(n, i) {
            if (!(this instanceof t)) return new t(n, i);
            Wl.call(this);
            var o = this;
            (this.path = n),
                (this.fd = null),
                (this.readable = !0),
                (this.paused = !1),
                (this.flags = "r"),
                (this.mode = 438),
                (this.bufferSize = 64 * 1024),
                (i = i || {});
            for (var s = Object.keys(i), a = 0, l = s.length; a < l; a++) {
                var h = s[a];
                this[h] = i[h];
            }
            if ((this.encoding && this.setEncoding(this.encoding), this.start !== void 0)) {
                if (typeof this.start != "number") throw TypeError("start must be a Number");
                if (this.end === void 0) this.end = 1 / 0;
                else if (typeof this.end != "number") throw TypeError("end must be a Number");
                if (this.start > this.end) throw new Error("start must be <= end");
                this.pos = this.start;
            }
            if (this.fd !== null) {
                process.nextTick(function () {
                    o._read();
                });
                return;
            }
            e.open(this.path, this.flags, this.mode, function (c, f) {
                if (c) {
                    o.emit("error", c), (o.readable = !1);
                    return;
                }
                (o.fd = f), o.emit("open", f), o._read();
            });
        }
        function r(n, i) {
            if (!(this instanceof r)) return new r(n, i);
            Wl.call(this),
                (this.path = n),
                (this.fd = null),
                (this.writable = !0),
                (this.flags = "w"),
                (this.encoding = "binary"),
                (this.mode = 438),
                (this.bytesWritten = 0),
                (i = i || {});
            for (var o = Object.keys(i), s = 0, a = o.length; s < a; s++) {
                var l = o[s];
                this[l] = i[l];
            }
            if (this.start !== void 0) {
                if (typeof this.start != "number") throw TypeError("start must be a Number");
                if (this.start < 0) throw new Error("start must be >= zero");
                this.pos = this.start;
            }
            (this.busy = !1),
                (this._queue = []),
                this.fd === null &&
                    ((this._open = e.open),
                    this._queue.push([this._open, this.path, this.flags, this.mode, void 0]),
                    this.flush());
        }
    }
});
var zl = g((Ax, Yl) => {
    "use strict";
    Yl.exports = k0;
    var $0 =
        Object.getPrototypeOf ||
        function (e) {
            return e.__proto__;
        };
    function k0(e) {
        if (e === null || typeof e != "object") return e;
        if (e instanceof Object) var t = { __proto__: $0(e) };
        else var t = Object.create(null);
        return (
            Object.getOwnPropertyNames(e).forEach(function (r) {
                Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r));
            }),
            t
        );
    }
});
var Ee = g((Sx, Io) => {
    var J = require("fs"),
        M0 = jl(),
        B0 = Vl(),
        H0 = zl(),
        kn = require("util"),
        de,
        Bn;
    typeof Symbol == "function" && typeof Symbol.for == "function"
        ? ((de = Symbol.for("graceful-fs.queue")), (Bn = Symbol.for("graceful-fs.previous")))
        : ((de = "___graceful-fs.queue"), (Bn = "___graceful-fs.previous"));
    function j0() {}
    function Jl(e, t) {
        Object.defineProperty(e, de, {
            get: function () {
                return t;
            }
        });
    }
    var Ct = j0;
    kn.debuglog
        ? (Ct = kn.debuglog("gfs4"))
        : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") &&
          (Ct = function () {
              var e = kn.format.apply(kn, arguments);
              (e = "GFS4: " + e.split(/\n/).join("\nGFS4: ")), console.error(e);
          });
    J[de] ||
        ((Xl = global[de] || []),
        Jl(J, Xl),
        (J.close = (function (e) {
            function t(r, n) {
                return e.call(J, r, function (i) {
                    i || Kl(), typeof n == "function" && n.apply(this, arguments);
                });
            }
            return Object.defineProperty(t, Bn, { value: e }), t;
        })(J.close)),
        (J.closeSync = (function (e) {
            function t(r) {
                e.apply(J, arguments), Kl();
            }
            return Object.defineProperty(t, Bn, { value: e }), t;
        })(J.closeSync)),
        /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") &&
            process.on("exit", function () {
                Ct(J[de]), require("assert").equal(J[de].length, 0);
            }));
    var Xl;
    global[de] || Jl(global, J[de]);
    Io.exports = Oo(H0(J));
    process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !J.__patched && ((Io.exports = Oo(J)), (J.__patched = !0));
    function Oo(e) {
        M0(e), (e.gracefulify = Oo), (e.createReadStream = De), (e.createWriteStream = V);
        var t = e.readFile;
        e.readFile = r;
        function r(P, U, R) {
            return typeof U == "function" && ((R = U), (U = null)), K(P, U, R);
            function K(re, X, G, F) {
                return t(re, X, function (H) {
                    H && (H.code === "EMFILE" || H.code === "ENFILE")
                        ? Kt([K, [re, X, G], H, F || Date.now(), Date.now()])
                        : typeof G == "function" && G.apply(this, arguments);
                });
            }
        }
        var n = e.writeFile;
        e.writeFile = i;
        function i(P, U, R, K) {
            return typeof R == "function" && ((K = R), (R = null)), re(P, U, R, K);
            function re(X, G, F, H, ee) {
                return n(X, G, F, function (j) {
                    j && (j.code === "EMFILE" || j.code === "ENFILE")
                        ? Kt([re, [X, G, F, H], j, ee || Date.now(), Date.now()])
                        : typeof H == "function" && H.apply(this, arguments);
                });
            }
        }
        var o = e.appendFile;
        o && (e.appendFile = s);
        function s(P, U, R, K) {
            return typeof R == "function" && ((K = R), (R = null)), re(P, U, R, K);
            function re(X, G, F, H, ee) {
                return o(X, G, F, function (j) {
                    j && (j.code === "EMFILE" || j.code === "ENFILE")
                        ? Kt([re, [X, G, F, H], j, ee || Date.now(), Date.now()])
                        : typeof H == "function" && H.apply(this, arguments);
                });
            }
        }
        var a = e.copyFile;
        a && (e.copyFile = l);
        function l(P, U, R, K) {
            return typeof R == "function" && ((K = R), (R = 0)), re(P, U, R, K);
            function re(X, G, F, H, ee) {
                return a(X, G, F, function (j) {
                    j && (j.code === "EMFILE" || j.code === "ENFILE")
                        ? Kt([re, [X, G, F, H], j, ee || Date.now(), Date.now()])
                        : typeof H == "function" && H.apply(this, arguments);
                });
            }
        }
        var h = e.readdir;
        e.readdir = f;
        var c = /^v[0-5]\./;
        function f(P, U, R) {
            typeof U == "function" && ((R = U), (U = null));
            var K = c.test(process.version)
                ? function (G, F, H, ee) {
                      return h(G, re(G, F, H, ee));
                  }
                : function (G, F, H, ee) {
                      return h(G, F, re(G, F, H, ee));
                  };
            return K(P, U, R);
            function re(X, G, F, H) {
                return function (ee, j) {
                    ee && (ee.code === "EMFILE" || ee.code === "ENFILE")
                        ? Kt([K, [X, G, F], ee, H || Date.now(), Date.now()])
                        : (j && j.sort && j.sort(), typeof F == "function" && F.call(this, ee, j));
                };
            }
        }
        if (process.version.substr(0, 4) === "v0.8") {
            var m = B0(e);
            (T = m.ReadStream), (N = m.WriteStream);
        }
        var p = e.ReadStream;
        p && ((T.prototype = Object.create(p.prototype)), (T.prototype.open = S));
        var E = e.WriteStream;
        E && ((N.prototype = Object.create(E.prototype)), (N.prototype.open = L)),
            Object.defineProperty(e, "ReadStream", {
                get: function () {
                    return T;
                },
                set: function (P) {
                    T = P;
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e, "WriteStream", {
                get: function () {
                    return N;
                },
                set: function (P) {
                    N = P;
                },
                enumerable: !0,
                configurable: !0
            });
        var _ = T;
        Object.defineProperty(e, "FileReadStream", {
            get: function () {
                return _;
            },
            set: function (P) {
                _ = P;
            },
            enumerable: !0,
            configurable: !0
        });
        var v = N;
        Object.defineProperty(e, "FileWriteStream", {
            get: function () {
                return v;
            },
            set: function (P) {
                v = P;
            },
            enumerable: !0,
            configurable: !0
        });
        function T(P, U) {
            return this instanceof T ? (p.apply(this, arguments), this) : T.apply(Object.create(T.prototype), arguments);
        }
        function S() {
            var P = this;
            y(P.path, P.flags, P.mode, function (U, R) {
                U ? (P.autoClose && P.destroy(), P.emit("error", U)) : ((P.fd = R), P.emit("open", R), P.read());
            });
        }
        function N(P, U) {
            return this instanceof N ? (E.apply(this, arguments), this) : N.apply(Object.create(N.prototype), arguments);
        }
        function L() {
            var P = this;
            y(P.path, P.flags, P.mode, function (U, R) {
                U ? (P.destroy(), P.emit("error", U)) : ((P.fd = R), P.emit("open", R));
            });
        }
        function De(P, U) {
            return new e.ReadStream(P, U);
        }
        function V(P, U) {
            return new e.WriteStream(P, U);
        }
        var ce = e.open;
        e.open = y;
        function y(P, U, R, K) {
            return typeof R == "function" && ((K = R), (R = null)), re(P, U, R, K);
            function re(X, G, F, H, ee) {
                return ce(X, G, F, function (j, rt) {
                    j && (j.code === "EMFILE" || j.code === "ENFILE")
                        ? Kt([re, [X, G, F, H], j, ee || Date.now(), Date.now()])
                        : typeof H == "function" && H.apply(this, arguments);
                });
            }
        }
        return e;
    }
    function Kt(e) {
        Ct("ENQUEUE", e[0].name, e[1]), J[de].push(e), xo();
    }
    var Mn;
    function Kl() {
        for (var e = Date.now(), t = 0; t < J[de].length; ++t) J[de][t].length > 2 && ((J[de][t][3] = e), (J[de][t][4] = e));
        xo();
    }
    function xo() {
        if ((clearTimeout(Mn), (Mn = void 0), J[de].length !== 0)) {
            var e = J[de].shift(),
                t = e[0],
                r = e[1],
                n = e[2],
                i = e[3],
                o = e[4];
            if (i === void 0) Ct("RETRY", t.name, r), t.apply(null, r);
            else if (Date.now() - i >= 6e4) {
                Ct("TIMEOUT", t.name, r);
                var s = r.pop();
                typeof s == "function" && s.call(null, n);
            } else {
                var a = Date.now() - o,
                    l = Math.max(o - i, 1),
                    h = Math.min(l * 1.2, 100);
                a >= h ? (Ct("RETRY", t.name, r), t.apply(null, r.concat([i]))) : J[de].push(e);
            }
            Mn === void 0 && (Mn = setTimeout(xo, 0));
        }
    }
});
var Tt = g(ot => {
    "use strict";
    var Ql = Oe().fromCallback,
        xe = Ee(),
        W0 = [
            "access",
            "appendFile",
            "chmod",
            "chown",
            "close",
            "copyFile",
            "fchmod",
            "fchown",
            "fdatasync",
            "fstat",
            "fsync",
            "ftruncate",
            "futimes",
            "lchmod",
            "lchown",
            "link",
            "lstat",
            "mkdir",
            "mkdtemp",
            "open",
            "opendir",
            "readdir",
            "readFile",
            "readlink",
            "realpath",
            "rename",
            "rm",
            "rmdir",
            "stat",
            "symlink",
            "truncate",
            "unlink",
            "utimes",
            "writeFile"
        ].filter(e => typeof xe[e] == "function");
    Object.assign(ot, xe);
    W0.forEach(e => {
        ot[e] = Ql(xe[e]);
    });
    ot.exists = function (e, t) {
        return typeof t == "function" ? xe.exists(e, t) : new Promise(r => xe.exists(e, r));
    };
    ot.read = function (e, t, r, n, i, o) {
        return typeof o == "function"
            ? xe.read(e, t, r, n, i, o)
            : new Promise((s, a) => {
                  xe.read(e, t, r, n, i, (l, h, c) => {
                      if (l) return a(l);
                      s({ bytesRead: h, buffer: c });
                  });
              });
    };
    ot.write = function (e, t, ...r) {
        return typeof r[r.length - 1] == "function"
            ? xe.write(e, t, ...r)
            : new Promise((n, i) => {
                  xe.write(e, t, ...r, (o, s, a) => {
                      if (o) return i(o);
                      n({ bytesWritten: s, buffer: a });
                  });
              });
    };
    typeof xe.writev == "function" &&
        (ot.writev = function (e, t, ...r) {
            return typeof r[r.length - 1] == "function"
                ? xe.writev(e, t, ...r)
                : new Promise((n, i) => {
                      xe.writev(e, t, ...r, (o, s, a) => {
                          if (o) return i(o);
                          n({ bytesWritten: s, buffers: a });
                      });
                  });
        });
    typeof xe.realpath.native == "function"
        ? (ot.realpath.native = Ql(xe.realpath.native))
        : process.emitWarning(
              "fs.realpath.native is not a function. Is fs being monkey-patched?",
              "Warning",
              "fs-extra-WARN0003"
          );
});
var eu = g((Tx, Zl) => {
    "use strict";
    var G0 = require("path");
    Zl.exports.checkPath = function (t) {
        if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(G0.parse(t).root, ""))) {
            let n = new Error("Path contains invalid characters: ".concat(t));
            throw ((n.code = "EINVAL"), n);
        }
    };
});
var iu = g((bx, No) => {
    "use strict";
    var tu = Tt(),
        { checkPath: ru } = eu(),
        nu = e => {
            let t = { mode: 511 };
            return typeof e == "number" ? e : { ...t, ...e }.mode;
        };
    No.exports.makeDir = async (e, t) => (ru(e), tu.mkdir(e, { mode: nu(t), recursive: !0 }));
    No.exports.makeDirSync = (e, t) => (ru(e), tu.mkdirSync(e, { mode: nu(t), recursive: !0 }));
});
var ke = g((Ox, ou) => {
    "use strict";
    var V0 = Oe().fromPromise,
        { makeDir: Y0, makeDirSync: Ro } = iu(),
        Po = V0(Y0);
    ou.exports = { mkdirs: Po, mkdirsSync: Ro, mkdirp: Po, mkdirpSync: Ro, ensureDir: Po, ensureDirSync: Ro };
});
var st = g((xx, au) => {
    "use strict";
    var z0 = Oe().fromPromise,
        su = Tt();
    function X0(e) {
        return su
            .access(e)
            .then(() => !0)
            .catch(() => !1);
    }
    au.exports = { pathExists: z0(X0), pathExistsSync: su.existsSync };
});
var Do = g((Ix, lu) => {
    "use strict";
    var Jt = Ee();
    function K0(e, t, r, n) {
        Jt.open(e, "r+", (i, o) => {
            if (i) return n(i);
            Jt.futimes(o, t, r, s => {
                Jt.close(o, a => {
                    n && n(s || a);
                });
            });
        });
    }
    function J0(e, t, r) {
        let n = Jt.openSync(e, "r+");
        return Jt.futimesSync(n, t, r), Jt.closeSync(n);
    }
    lu.exports = { utimesMillis: K0, utimesMillisSync: J0 };
});
var bt = g((Nx, fu) => {
    "use strict";
    var Qt = Tt(),
        ue = require("path"),
        Q0 = require("util");
    function Z0(e, t, r) {
        let n = r.dereference ? i => Qt.stat(i, { bigint: !0 }) : i => Qt.lstat(i, { bigint: !0 });
        return Promise.all([
            n(e),
            n(t).catch(i => {
                if (i.code === "ENOENT") return null;
                throw i;
            })
        ]).then(([i, o]) => ({ srcStat: i, destStat: o }));
    }
    function ew(e, t, r) {
        let n,
            i = r.dereference ? s => Qt.statSync(s, { bigint: !0 }) : s => Qt.lstatSync(s, { bigint: !0 }),
            o = i(e);
        try {
            n = i(t);
        } catch (s) {
            if (s.code === "ENOENT") return { srcStat: o, destStat: null };
            throw s;
        }
        return { srcStat: o, destStat: n };
    }
    function tw(e, t, r, n, i) {
        Q0.callbackify(Z0)(e, t, n, (o, s) => {
            if (o) return i(o);
            let { srcStat: a, destStat: l } = s;
            if (l) {
                if (Dr(a, l)) {
                    let h = ue.basename(e),
                        c = ue.basename(t);
                    return r === "move" && h !== c && h.toLowerCase() === c.toLowerCase()
                        ? i(null, { srcStat: a, destStat: l, isChangingCase: !0 })
                        : i(new Error("Source and destination must not be the same."));
                }
                if (a.isDirectory() && !l.isDirectory())
                    return i(new Error("Cannot overwrite non-directory '".concat(t, "' with directory '").concat(e, "'.")));
                if (!a.isDirectory() && l.isDirectory())
                    return i(new Error("Cannot overwrite directory '".concat(t, "' with non-directory '").concat(e, "'.")));
            }
            return a.isDirectory() && Fo(e, t) ? i(new Error(Hn(e, t, r))) : i(null, { srcStat: a, destStat: l });
        });
    }
    function rw(e, t, r, n) {
        let { srcStat: i, destStat: o } = ew(e, t, n);
        if (o) {
            if (Dr(i, o)) {
                let s = ue.basename(e),
                    a = ue.basename(t);
                if (r === "move" && s !== a && s.toLowerCase() === a.toLowerCase())
                    return { srcStat: i, destStat: o, isChangingCase: !0 };
                throw new Error("Source and destination must not be the same.");
            }
            if (i.isDirectory() && !o.isDirectory())
                throw new Error("Cannot overwrite non-directory '".concat(t, "' with directory '").concat(e, "'."));
            if (!i.isDirectory() && o.isDirectory())
                throw new Error("Cannot overwrite directory '".concat(t, "' with non-directory '").concat(e, "'."));
        }
        if (i.isDirectory() && Fo(e, t)) throw new Error(Hn(e, t, r));
        return { srcStat: i, destStat: o };
    }
    function uu(e, t, r, n, i) {
        let o = ue.resolve(ue.dirname(e)),
            s = ue.resolve(ue.dirname(r));
        if (s === o || s === ue.parse(s).root) return i();
        Qt.stat(s, { bigint: !0 }, (a, l) =>
            a ? (a.code === "ENOENT" ? i() : i(a)) : Dr(t, l) ? i(new Error(Hn(e, r, n))) : uu(e, t, s, n, i)
        );
    }
    function cu(e, t, r, n) {
        let i = ue.resolve(ue.dirname(e)),
            o = ue.resolve(ue.dirname(r));
        if (o === i || o === ue.parse(o).root) return;
        let s;
        try {
            s = Qt.statSync(o, { bigint: !0 });
        } catch (a) {
            if (a.code === "ENOENT") return;
            throw a;
        }
        if (Dr(t, s)) throw new Error(Hn(e, r, n));
        return cu(e, t, o, n);
    }
    function Dr(e, t) {
        return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
    }
    function Fo(e, t) {
        let r = ue
                .resolve(e)
                .split(ue.sep)
                .filter(i => i),
            n = ue
                .resolve(t)
                .split(ue.sep)
                .filter(i => i);
        return r.reduce((i, o, s) => i && n[s] === o, !0);
    }
    function Hn(e, t, r) {
        return "Cannot ".concat(r, " '").concat(e, "' to a subdirectory of itself, '").concat(t, "'.");
    }
    fu.exports = {
        checkPaths: tw,
        checkPathsSync: rw,
        checkParentPaths: uu,
        checkParentPathsSync: cu,
        isSrcSubdir: Fo,
        areIdentical: Dr
    };
});
var Eu = g((Rx, yu) => {
    "use strict";
    var Ie = Ee(),
        Fr = require("path"),
        nw = ke().mkdirs,
        iw = st().pathExists,
        ow = Do().utimesMillis,
        qr = bt();
    function sw(e, t, r, n) {
        typeof r == "function" && !n ? ((n = r), (r = {})) : typeof r == "function" && (r = { filter: r }),
            (n = n || function () {}),
            (r = r || {}),
            (r.clobber = "clobber" in r ? !!r.clobber : !0),
            (r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber),
            r.preserveTimestamps &&
                process.arch === "ia32" &&
                process.emitWarning(
                    "Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269",
                    "Warning",
                    "fs-extra-WARN0001"
                ),
            qr.checkPaths(e, t, "copy", r, (i, o) => {
                if (i) return n(i);
                let { srcStat: s, destStat: a } = o;
                qr.checkParentPaths(e, s, t, "copy", l => (l ? n(l) : r.filter ? pu(du, a, e, t, r, n) : du(a, e, t, r, n)));
            });
    }
    function du(e, t, r, n, i) {
        let o = Fr.dirname(r);
        iw(o, (s, a) => {
            if (s) return i(s);
            if (a) return jn(e, t, r, n, i);
            nw(o, l => (l ? i(l) : jn(e, t, r, n, i)));
        });
    }
    function pu(e, t, r, n, i, o) {
        Promise.resolve(i.filter(r, n)).then(
            s => (s ? e(t, r, n, i, o) : o()),
            s => o(s)
        );
    }
    function aw(e, t, r, n, i) {
        return n.filter ? pu(jn, e, t, r, n, i) : jn(e, t, r, n, i);
    }
    function jn(e, t, r, n, i) {
        (n.dereference ? Ie.stat : Ie.lstat)(t, (s, a) =>
            s
                ? i(s)
                : a.isDirectory()
                ? pw(a, e, t, r, n, i)
                : a.isFile() || a.isCharacterDevice() || a.isBlockDevice()
                ? lw(a, e, t, r, n, i)
                : a.isSymbolicLink()
                ? ww(e, t, r, n, i)
                : a.isSocket()
                ? i(new Error("Cannot copy a socket file: ".concat(t)))
                : a.isFIFO()
                ? i(new Error("Cannot copy a FIFO pipe: ".concat(t)))
                : i(new Error("Unknown file: ".concat(t)))
        );
    }
    function lw(e, t, r, n, i, o) {
        return t ? uw(e, r, n, i, o) : mu(e, r, n, i, o);
    }
    function uw(e, t, r, n, i) {
        if (n.overwrite) Ie.unlink(r, o => (o ? i(o) : mu(e, t, r, n, i)));
        else return n.errorOnExist ? i(new Error("'".concat(r, "' already exists"))) : i();
    }
    function mu(e, t, r, n, i) {
        Ie.copyFile(t, r, o => (o ? i(o) : n.preserveTimestamps ? cw(e.mode, t, r, i) : Wn(r, e.mode, i)));
    }
    function cw(e, t, r, n) {
        return fw(e) ? dw(r, e, i => (i ? n(i) : hu(e, t, r, n))) : hu(e, t, r, n);
    }
    function fw(e) {
        return (e & 128) === 0;
    }
    function dw(e, t, r) {
        return Wn(e, t | 128, r);
    }
    function hu(e, t, r, n) {
        hw(t, r, i => (i ? n(i) : Wn(r, e, n)));
    }
    function Wn(e, t, r) {
        return Ie.chmod(e, t, r);
    }
    function hw(e, t, r) {
        Ie.stat(e, (n, i) => (n ? r(n) : ow(t, i.atime, i.mtime, r)));
    }
    function pw(e, t, r, n, i, o) {
        return t ? gu(r, n, i, o) : mw(e.mode, r, n, i, o);
    }
    function mw(e, t, r, n, i) {
        Ie.mkdir(r, o => {
            if (o) return i(o);
            gu(t, r, n, s => (s ? i(s) : Wn(r, e, i)));
        });
    }
    function gu(e, t, r, n) {
        Ie.readdir(e, (i, o) => (i ? n(i) : wu(o, e, t, r, n)));
    }
    function wu(e, t, r, n, i) {
        let o = e.pop();
        return o ? gw(e, o, t, r, n, i) : i();
    }
    function gw(e, t, r, n, i, o) {
        let s = Fr.join(r, t),
            a = Fr.join(n, t);
        qr.checkPaths(s, a, "copy", i, (l, h) => {
            if (l) return o(l);
            let { destStat: c } = h;
            aw(c, s, a, i, f => (f ? o(f) : wu(e, r, n, i, o)));
        });
    }
    function ww(e, t, r, n, i) {
        Ie.readlink(t, (o, s) => {
            if (o) return i(o);
            if ((n.dereference && (s = Fr.resolve(process.cwd(), s)), e))
                Ie.readlink(r, (a, l) =>
                    a
                        ? a.code === "EINVAL" || a.code === "UNKNOWN"
                            ? Ie.symlink(s, r, i)
                            : i(a)
                        : (n.dereference && (l = Fr.resolve(process.cwd(), l)),
                          qr.isSrcSubdir(s, l)
                              ? i(new Error("Cannot copy '".concat(s, "' to a subdirectory of itself, '").concat(l, "'.")))
                              : e.isDirectory() && qr.isSrcSubdir(l, s)
                              ? i(new Error("Cannot overwrite '".concat(l, "' with '").concat(s, "'.")))
                              : yw(s, r, i))
                );
            else return Ie.symlink(s, r, i);
        });
    }
    function yw(e, t, r) {
        Ie.unlink(t, n => (n ? r(n) : Ie.symlink(e, t, r)));
    }
    yu.exports = sw;
});
var Cu = g((Px, Su) => {
    "use strict";
    var he = Ee(),
        Lr = require("path"),
        Ew = ke().mkdirsSync,
        _w = Do().utimesMillisSync,
        Ur = bt();
    function vw(e, t, r) {
        typeof r == "function" && (r = { filter: r }),
            (r = r || {}),
            (r.clobber = "clobber" in r ? !!r.clobber : !0),
            (r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber),
            r.preserveTimestamps &&
                process.arch === "ia32" &&
                process.emitWarning(
                    "Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269",
                    "Warning",
                    "fs-extra-WARN0002"
                );
        let { srcStat: n, destStat: i } = Ur.checkPathsSync(e, t, "copy", r);
        return Ur.checkParentPathsSync(e, n, t, "copy"), Aw(i, e, t, r);
    }
    function Aw(e, t, r, n) {
        if (n.filter && !n.filter(t, r)) return;
        let i = Lr.dirname(r);
        return he.existsSync(i) || Ew(i), _u(e, t, r, n);
    }
    function Sw(e, t, r, n) {
        if (!(n.filter && !n.filter(t, r))) return _u(e, t, r, n);
    }
    function _u(e, t, r, n) {
        let o = (n.dereference ? he.statSync : he.lstatSync)(t);
        if (o.isDirectory()) return Nw(o, e, t, r, n);
        if (o.isFile() || o.isCharacterDevice() || o.isBlockDevice()) return Cw(o, e, t, r, n);
        if (o.isSymbolicLink()) return Dw(e, t, r, n);
        throw o.isSocket()
            ? new Error("Cannot copy a socket file: ".concat(t))
            : o.isFIFO()
            ? new Error("Cannot copy a FIFO pipe: ".concat(t))
            : new Error("Unknown file: ".concat(t));
    }
    function Cw(e, t, r, n, i) {
        return t ? Tw(e, r, n, i) : vu(e, r, n, i);
    }
    function Tw(e, t, r, n) {
        if (n.overwrite) return he.unlinkSync(r), vu(e, t, r, n);
        if (n.errorOnExist) throw new Error("'".concat(r, "' already exists"));
    }
    function vu(e, t, r, n) {
        return he.copyFileSync(t, r), n.preserveTimestamps && bw(e.mode, t, r), qo(r, e.mode);
    }
    function bw(e, t, r) {
        return Ow(e) && xw(r, e), Iw(t, r);
    }
    function Ow(e) {
        return (e & 128) === 0;
    }
    function xw(e, t) {
        return qo(e, t | 128);
    }
    function qo(e, t) {
        return he.chmodSync(e, t);
    }
    function Iw(e, t) {
        let r = he.statSync(e);
        return _w(t, r.atime, r.mtime);
    }
    function Nw(e, t, r, n, i) {
        return t ? Au(r, n, i) : Rw(e.mode, r, n, i);
    }
    function Rw(e, t, r, n) {
        return he.mkdirSync(r), Au(t, r, n), qo(r, e);
    }
    function Au(e, t, r) {
        he.readdirSync(e).forEach(n => Pw(n, e, t, r));
    }
    function Pw(e, t, r, n) {
        let i = Lr.join(t, e),
            o = Lr.join(r, e),
            { destStat: s } = Ur.checkPathsSync(i, o, "copy", n);
        return Sw(s, i, o, n);
    }
    function Dw(e, t, r, n) {
        let i = he.readlinkSync(t);
        if ((n.dereference && (i = Lr.resolve(process.cwd(), i)), e)) {
            let o;
            try {
                o = he.readlinkSync(r);
            } catch (s) {
                if (s.code === "EINVAL" || s.code === "UNKNOWN") return he.symlinkSync(i, r);
                throw s;
            }
            if ((n.dereference && (o = Lr.resolve(process.cwd(), o)), Ur.isSrcSubdir(i, o)))
                throw new Error("Cannot copy '".concat(i, "' to a subdirectory of itself, '").concat(o, "'."));
            if (he.statSync(r).isDirectory() && Ur.isSrcSubdir(o, i))
                throw new Error("Cannot overwrite '".concat(o, "' with '").concat(i, "'."));
            return Fw(i, r);
        } else return he.symlinkSync(i, r);
    }
    function Fw(e, t) {
        return he.unlinkSync(t), he.symlinkSync(e, t);
    }
    Su.exports = vw;
});
var Gn = g((Dx, Tu) => {
    "use strict";
    var qw = Oe().fromCallback;
    Tu.exports = { copy: qw(Eu()), copySync: Cu() };
});
var Fu = g((Fx, Du) => {
    "use strict";
    var bu = Ee(),
        Nu = require("path"),
        W = require("assert"),
        $r = process.platform === "win32";
    function Ru(e) {
        ["unlink", "chmod", "stat", "lstat", "rmdir", "readdir"].forEach(r => {
            (e[r] = e[r] || bu[r]), (r = r + "Sync"), (e[r] = e[r] || bu[r]);
        }),
            (e.maxBusyTries = e.maxBusyTries || 3);
    }
    function Lo(e, t, r) {
        let n = 0;
        typeof t == "function" && ((r = t), (t = {})),
            W(e, "rimraf: missing path"),
            W.strictEqual(typeof e, "string", "rimraf: path should be a string"),
            W.strictEqual(typeof r, "function", "rimraf: callback function required"),
            W(t, "rimraf: invalid options argument provided"),
            W.strictEqual(typeof t, "object", "rimraf: options should be object"),
            Ru(t),
            Ou(e, t, function i(o) {
                if (o) {
                    if ((o.code === "EBUSY" || o.code === "ENOTEMPTY" || o.code === "EPERM") && n < t.maxBusyTries) {
                        n++;
                        let s = n * 100;
                        return setTimeout(() => Ou(e, t, i), s);
                    }
                    o.code === "ENOENT" && (o = null);
                }
                r(o);
            });
    }
    function Ou(e, t, r) {
        W(e),
            W(t),
            W(typeof r == "function"),
            t.lstat(e, (n, i) => {
                if (n && n.code === "ENOENT") return r(null);
                if (n && n.code === "EPERM" && $r) return xu(e, t, n, r);
                if (i && i.isDirectory()) return Vn(e, t, n, r);
                t.unlink(e, o => {
                    if (o) {
                        if (o.code === "ENOENT") return r(null);
                        if (o.code === "EPERM") return $r ? xu(e, t, o, r) : Vn(e, t, o, r);
                        if (o.code === "EISDIR") return Vn(e, t, o, r);
                    }
                    return r(o);
                });
            });
    }
    function xu(e, t, r, n) {
        W(e),
            W(t),
            W(typeof n == "function"),
            t.chmod(e, 438, i => {
                i
                    ? n(i.code === "ENOENT" ? null : r)
                    : t.stat(e, (o, s) => {
                          o ? n(o.code === "ENOENT" ? null : r) : s.isDirectory() ? Vn(e, t, r, n) : t.unlink(e, n);
                      });
            });
    }
    function Iu(e, t, r) {
        let n;
        W(e), W(t);
        try {
            t.chmodSync(e, 438);
        } catch (i) {
            if (i.code === "ENOENT") return;
            throw r;
        }
        try {
            n = t.statSync(e);
        } catch (i) {
            if (i.code === "ENOENT") return;
            throw r;
        }
        n.isDirectory() ? Yn(e, t, r) : t.unlinkSync(e);
    }
    function Vn(e, t, r, n) {
        W(e),
            W(t),
            W(typeof n == "function"),
            t.rmdir(e, i => {
                i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM")
                    ? Lw(e, t, n)
                    : i && i.code === "ENOTDIR"
                    ? n(r)
                    : n(i);
            });
    }
    function Lw(e, t, r) {
        W(e),
            W(t),
            W(typeof r == "function"),
            t.readdir(e, (n, i) => {
                if (n) return r(n);
                let o = i.length,
                    s;
                if (o === 0) return t.rmdir(e, r);
                i.forEach(a => {
                    Lo(Nu.join(e, a), t, l => {
                        if (!s) {
                            if (l) return r((s = l));
                            --o === 0 && t.rmdir(e, r);
                        }
                    });
                });
            });
    }
    function Pu(e, t) {
        let r;
        (t = t || {}),
            Ru(t),
            W(e, "rimraf: missing path"),
            W.strictEqual(typeof e, "string", "rimraf: path should be a string"),
            W(t, "rimraf: missing options"),
            W.strictEqual(typeof t, "object", "rimraf: options should be object");
        try {
            r = t.lstatSync(e);
        } catch (n) {
            if (n.code === "ENOENT") return;
            n.code === "EPERM" && $r && Iu(e, t, n);
        }
        try {
            r && r.isDirectory() ? Yn(e, t, null) : t.unlinkSync(e);
        } catch (n) {
            if (n.code === "ENOENT") return;
            if (n.code === "EPERM") return $r ? Iu(e, t, n) : Yn(e, t, n);
            if (n.code !== "EISDIR") throw n;
            Yn(e, t, n);
        }
    }
    function Yn(e, t, r) {
        W(e), W(t);
        try {
            t.rmdirSync(e);
        } catch (n) {
            if (n.code === "ENOTDIR") throw r;
            if (n.code === "ENOTEMPTY" || n.code === "EEXIST" || n.code === "EPERM") Uw(e, t);
            else if (n.code !== "ENOENT") throw n;
        }
    }
    function Uw(e, t) {
        if ((W(e), W(t), t.readdirSync(e).forEach(r => Pu(Nu.join(e, r), t)), $r)) {
            let r = Date.now();
            do
                try {
                    return t.rmdirSync(e, t);
                } catch {}
            while (Date.now() - r < 500);
        } else return t.rmdirSync(e, t);
    }
    Du.exports = Lo;
    Lo.sync = Pu;
});
var kr = g((qx, Lu) => {
    "use strict";
    var zn = Ee(),
        $w = Oe().fromCallback,
        qu = Fu();
    function kw(e, t) {
        if (zn.rm) return zn.rm(e, { recursive: !0, force: !0 }, t);
        qu(e, t);
    }
    function Mw(e) {
        if (zn.rmSync) return zn.rmSync(e, { recursive: !0, force: !0 });
        qu.sync(e);
    }
    Lu.exports = { remove: $w(kw), removeSync: Mw };
});
var Wu = g((Lx, ju) => {
    "use strict";
    var Bw = Oe().fromPromise,
        ku = Tt(),
        Mu = require("path"),
        Bu = ke(),
        Hu = kr(),
        Uu = Bw(async function (t) {
            let r;
            try {
                r = await ku.readdir(t);
            } catch {
                return Bu.mkdirs(t);
            }
            return Promise.all(r.map(n => Hu.remove(Mu.join(t, n))));
        });
    function $u(e) {
        let t;
        try {
            t = ku.readdirSync(e);
        } catch {
            return Bu.mkdirsSync(e);
        }
        t.forEach(r => {
            (r = Mu.join(e, r)), Hu.removeSync(r);
        });
    }
    ju.exports = { emptyDirSync: $u, emptydirSync: $u, emptyDir: Uu, emptydir: Uu };
});
var zu = g((Ux, Yu) => {
    "use strict";
    var Hw = Oe().fromCallback,
        Gu = require("path"),
        at = Ee(),
        Vu = ke();
    function jw(e, t) {
        function r() {
            at.writeFile(e, "", n => {
                if (n) return t(n);
                t();
            });
        }
        at.stat(e, (n, i) => {
            if (!n && i.isFile()) return t();
            let o = Gu.dirname(e);
            at.stat(o, (s, a) => {
                if (s)
                    return s.code === "ENOENT"
                        ? Vu.mkdirs(o, l => {
                              if (l) return t(l);
                              r();
                          })
                        : t(s);
                a.isDirectory()
                    ? r()
                    : at.readdir(o, l => {
                          if (l) return t(l);
                      });
            });
        });
    }
    function Ww(e) {
        let t;
        try {
            t = at.statSync(e);
        } catch {}
        if (t && t.isFile()) return;
        let r = Gu.dirname(e);
        try {
            at.statSync(r).isDirectory() || at.readdirSync(r);
        } catch (n) {
            if (n && n.code === "ENOENT") Vu.mkdirsSync(r);
            else throw n;
        }
        at.writeFileSync(e, "");
    }
    Yu.exports = { createFile: Hw(jw), createFileSync: Ww };
});
var Zu = g(($x, Qu) => {
    "use strict";
    var Gw = Oe().fromCallback,
        Xu = require("path"),
        lt = Ee(),
        Ku = ke(),
        Vw = st().pathExists,
        { areIdentical: Ju } = bt();
    function Yw(e, t, r) {
        function n(i, o) {
            lt.link(i, o, s => {
                if (s) return r(s);
                r(null);
            });
        }
        lt.lstat(t, (i, o) => {
            lt.lstat(e, (s, a) => {
                if (s) return (s.message = s.message.replace("lstat", "ensureLink")), r(s);
                if (o && Ju(a, o)) return r(null);
                let l = Xu.dirname(t);
                Vw(l, (h, c) => {
                    if (h) return r(h);
                    if (c) return n(e, t);
                    Ku.mkdirs(l, f => {
                        if (f) return r(f);
                        n(e, t);
                    });
                });
            });
        });
    }
    function zw(e, t) {
        let r;
        try {
            r = lt.lstatSync(t);
        } catch {}
        try {
            let o = lt.lstatSync(e);
            if (r && Ju(o, r)) return;
        } catch (o) {
            throw ((o.message = o.message.replace("lstat", "ensureLink")), o);
        }
        let n = Xu.dirname(t);
        return lt.existsSync(n) || Ku.mkdirsSync(n), lt.linkSync(e, t);
    }
    Qu.exports = { createLink: Gw(Yw), createLinkSync: zw };
});
var tc = g((kx, ec) => {
    "use strict";
    var ut = require("path"),
        Mr = Ee(),
        Xw = st().pathExists;
    function Kw(e, t, r) {
        if (ut.isAbsolute(e))
            return Mr.lstat(e, n =>
                n ? ((n.message = n.message.replace("lstat", "ensureSymlink")), r(n)) : r(null, { toCwd: e, toDst: e })
            );
        {
            let n = ut.dirname(t),
                i = ut.join(n, e);
            return Xw(i, (o, s) =>
                o
                    ? r(o)
                    : s
                    ? r(null, { toCwd: i, toDst: e })
                    : Mr.lstat(e, a =>
                          a
                              ? ((a.message = a.message.replace("lstat", "ensureSymlink")), r(a))
                              : r(null, { toCwd: e, toDst: ut.relative(n, e) })
                      )
            );
        }
    }
    function Jw(e, t) {
        let r;
        if (ut.isAbsolute(e)) {
            if (((r = Mr.existsSync(e)), !r)) throw new Error("absolute srcpath does not exist");
            return { toCwd: e, toDst: e };
        } else {
            let n = ut.dirname(t),
                i = ut.join(n, e);
            if (((r = Mr.existsSync(i)), r)) return { toCwd: i, toDst: e };
            if (((r = Mr.existsSync(e)), !r)) throw new Error("relative srcpath does not exist");
            return { toCwd: e, toDst: ut.relative(n, e) };
        }
    }
    ec.exports = { symlinkPaths: Kw, symlinkPathsSync: Jw };
});
var ic = g((Mx, nc) => {
    "use strict";
    var rc = Ee();
    function Qw(e, t, r) {
        if (((r = typeof t == "function" ? t : r), (t = typeof t == "function" ? !1 : t), t)) return r(null, t);
        rc.lstat(e, (n, i) => {
            if (n) return r(null, "file");
            (t = i && i.isDirectory() ? "dir" : "file"), r(null, t);
        });
    }
    function Zw(e, t) {
        let r;
        if (t) return t;
        try {
            r = rc.lstatSync(e);
        } catch {
            return "file";
        }
        return r && r.isDirectory() ? "dir" : "file";
    }
    nc.exports = { symlinkType: Qw, symlinkTypeSync: Zw };
});
var dc = g((Bx, fc) => {
    "use strict";
    var ey = Oe().fromCallback,
        sc = require("path"),
        Me = Tt(),
        ac = ke(),
        ty = ac.mkdirs,
        ry = ac.mkdirsSync,
        lc = tc(),
        ny = lc.symlinkPaths,
        iy = lc.symlinkPathsSync,
        uc = ic(),
        oy = uc.symlinkType,
        sy = uc.symlinkTypeSync,
        ay = st().pathExists,
        { areIdentical: cc } = bt();
    function ly(e, t, r, n) {
        (n = typeof r == "function" ? r : n),
            (r = typeof r == "function" ? !1 : r),
            Me.lstat(t, (i, o) => {
                !i && o.isSymbolicLink()
                    ? Promise.all([Me.stat(e), Me.stat(t)]).then(([s, a]) => {
                          if (cc(s, a)) return n(null);
                          oc(e, t, r, n);
                      })
                    : oc(e, t, r, n);
            });
    }
    function oc(e, t, r, n) {
        ny(e, t, (i, o) => {
            if (i) return n(i);
            (e = o.toDst),
                oy(o.toCwd, r, (s, a) => {
                    if (s) return n(s);
                    let l = sc.dirname(t);
                    ay(l, (h, c) => {
                        if (h) return n(h);
                        if (c) return Me.symlink(e, t, a, n);
                        ty(l, f => {
                            if (f) return n(f);
                            Me.symlink(e, t, a, n);
                        });
                    });
                });
        });
    }
    function uy(e, t, r) {
        let n;
        try {
            n = Me.lstatSync(t);
        } catch {}
        if (n && n.isSymbolicLink()) {
            let a = Me.statSync(e),
                l = Me.statSync(t);
            if (cc(a, l)) return;
        }
        let i = iy(e, t);
        (e = i.toDst), (r = sy(i.toCwd, r));
        let o = sc.dirname(t);
        return Me.existsSync(o) || ry(o), Me.symlinkSync(e, t, r);
    }
    fc.exports = { createSymlink: ey(ly), createSymlinkSync: uy };
});
var _c = g((Hx, Ec) => {
    "use strict";
    var { createFile: hc, createFileSync: pc } = zu(),
        { createLink: mc, createLinkSync: gc } = Zu(),
        { createSymlink: wc, createSymlinkSync: yc } = dc();
    Ec.exports = {
        createFile: hc,
        createFileSync: pc,
        ensureFile: hc,
        ensureFileSync: pc,
        createLink: mc,
        createLinkSync: gc,
        ensureLink: mc,
        ensureLinkSync: gc,
        createSymlink: wc,
        createSymlinkSync: yc,
        ensureSymlink: wc,
        ensureSymlinkSync: yc
    };
});
var Xn = g((jx, vc) => {
    function cy(e, { EOL: t = "\n", finalEOL: r = !0, replacer: n = null, spaces: i } = {}) {
        let o = r ? t : "";
        return JSON.stringify(e, n, i).replace(/\n/g, t) + o;
    }
    function fy(e) {
        return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
    }
    vc.exports = { stringify: cy, stripBom: fy };
});
var Tc = g((Wx, Cc) => {
    var Zt;
    try {
        Zt = Ee();
    } catch {
        Zt = require("fs");
    }
    var Kn = Oe(),
        { stringify: Ac, stripBom: Sc } = Xn();
    async function dy(e, t = {}) {
        typeof t == "string" && (t = { encoding: t });
        let r = t.fs || Zt,
            n = "throws" in t ? t.throws : !0,
            i = await Kn.fromCallback(r.readFile)(e, t);
        i = Sc(i);
        let o;
        try {
            o = JSON.parse(i, t ? t.reviver : null);
        } catch (s) {
            if (n) throw ((s.message = "".concat(e, ": ").concat(s.message)), s);
            return null;
        }
        return o;
    }
    var hy = Kn.fromPromise(dy);
    function py(e, t = {}) {
        typeof t == "string" && (t = { encoding: t });
        let r = t.fs || Zt,
            n = "throws" in t ? t.throws : !0;
        try {
            let i = r.readFileSync(e, t);
            return (i = Sc(i)), JSON.parse(i, t.reviver);
        } catch (i) {
            if (n) throw ((i.message = "".concat(e, ": ").concat(i.message)), i);
            return null;
        }
    }
    async function my(e, t, r = {}) {
        let n = r.fs || Zt,
            i = Ac(t, r);
        await Kn.fromCallback(n.writeFile)(e, i, r);
    }
    var gy = Kn.fromPromise(my);
    function wy(e, t, r = {}) {
        let n = r.fs || Zt,
            i = Ac(t, r);
        return n.writeFileSync(e, i, r);
    }
    var yy = { readFile: hy, readFileSync: py, writeFile: gy, writeFileSync: wy };
    Cc.exports = yy;
});
var Oc = g((Gx, bc) => {
    "use strict";
    var Jn = Tc();
    bc.exports = {
        readJson: Jn.readFile,
        readJsonSync: Jn.readFileSync,
        writeJson: Jn.writeFile,
        writeJsonSync: Jn.writeFileSync
    };
});
var Qn = g((Vx, Nc) => {
    "use strict";
    var Ey = Oe().fromCallback,
        Br = Ee(),
        xc = require("path"),
        Ic = ke(),
        _y = st().pathExists;
    function vy(e, t, r, n) {
        typeof r == "function" && ((n = r), (r = "utf8"));
        let i = xc.dirname(e);
        _y(i, (o, s) => {
            if (o) return n(o);
            if (s) return Br.writeFile(e, t, r, n);
            Ic.mkdirs(i, a => {
                if (a) return n(a);
                Br.writeFile(e, t, r, n);
            });
        });
    }
    function Ay(e, ...t) {
        let r = xc.dirname(e);
        if (Br.existsSync(r)) return Br.writeFileSync(e, ...t);
        Ic.mkdirsSync(r), Br.writeFileSync(e, ...t);
    }
    Nc.exports = { outputFile: Ey(vy), outputFileSync: Ay };
});
var Pc = g((Yx, Rc) => {
    "use strict";
    var { stringify: Sy } = Xn(),
        { outputFile: Cy } = Qn();
    async function Ty(e, t, r = {}) {
        let n = Sy(t, r);
        await Cy(e, n, r);
    }
    Rc.exports = Ty;
});
var Fc = g((zx, Dc) => {
    "use strict";
    var { stringify: by } = Xn(),
        { outputFileSync: Oy } = Qn();
    function xy(e, t, r) {
        let n = by(t, r);
        Oy(e, n, r);
    }
    Dc.exports = xy;
});
var Lc = g((Xx, qc) => {
    "use strict";
    var Iy = Oe().fromPromise,
        _e = Oc();
    _e.outputJson = Iy(Pc());
    _e.outputJsonSync = Fc();
    _e.outputJSON = _e.outputJson;
    _e.outputJSONSync = _e.outputJsonSync;
    _e.writeJSON = _e.writeJson;
    _e.writeJSONSync = _e.writeJsonSync;
    _e.readJSON = _e.readJson;
    _e.readJSONSync = _e.readJsonSync;
    qc.exports = _e;
});
var Bc = g((Kx, Mc) => {
    "use strict";
    var Ny = Ee(),
        $o = require("path"),
        Ry = Gn().copy,
        kc = kr().remove,
        Py = ke().mkdirp,
        Dy = st().pathExists,
        Uc = bt();
    function Fy(e, t, r, n) {
        typeof r == "function" && ((n = r), (r = {})), (r = r || {});
        let i = r.overwrite || r.clobber || !1;
        Uc.checkPaths(e, t, "move", r, (o, s) => {
            if (o) return n(o);
            let { srcStat: a, isChangingCase: l = !1 } = s;
            Uc.checkParentPaths(e, a, t, "move", h => {
                if (h) return n(h);
                if (qy(t)) return $c(e, t, i, l, n);
                Py($o.dirname(t), c => (c ? n(c) : $c(e, t, i, l, n)));
            });
        });
    }
    function qy(e) {
        let t = $o.dirname(e);
        return $o.parse(t).root === t;
    }
    function $c(e, t, r, n, i) {
        if (n) return Uo(e, t, r, i);
        if (r) return kc(t, o => (o ? i(o) : Uo(e, t, r, i)));
        Dy(t, (o, s) => (o ? i(o) : s ? i(new Error("dest already exists.")) : Uo(e, t, r, i)));
    }
    function Uo(e, t, r, n) {
        Ny.rename(e, t, i => (i ? (i.code !== "EXDEV" ? n(i) : Ly(e, t, r, n)) : n()));
    }
    function Ly(e, t, r, n) {
        Ry(e, t, { overwrite: r, errorOnExist: !0 }, o => (o ? n(o) : kc(e, n)));
    }
    Mc.exports = Fy;
});
var Vc = g((Jx, Gc) => {
    "use strict";
    var jc = Ee(),
        Mo = require("path"),
        Uy = Gn().copySync,
        Wc = kr().removeSync,
        $y = ke().mkdirpSync,
        Hc = bt();
    function ky(e, t, r) {
        r = r || {};
        let n = r.overwrite || r.clobber || !1,
            { srcStat: i, isChangingCase: o = !1 } = Hc.checkPathsSync(e, t, "move", r);
        return Hc.checkParentPathsSync(e, i, t, "move"), My(t) || $y(Mo.dirname(t)), By(e, t, n, o);
    }
    function My(e) {
        let t = Mo.dirname(e);
        return Mo.parse(t).root === t;
    }
    function By(e, t, r, n) {
        if (n) return ko(e, t, r);
        if (r) return Wc(t), ko(e, t, r);
        if (jc.existsSync(t)) throw new Error("dest already exists.");
        return ko(e, t, r);
    }
    function ko(e, t, r) {
        try {
            jc.renameSync(e, t);
        } catch (n) {
            if (n.code !== "EXDEV") throw n;
            return Hy(e, t, r);
        }
    }
    function Hy(e, t, r) {
        return Uy(e, t, { overwrite: r, errorOnExist: !0 }), Wc(e);
    }
    Gc.exports = ky;
});
var zc = g((Qx, Yc) => {
    "use strict";
    var jy = Oe().fromCallback;
    Yc.exports = { move: jy(Bc()), moveSync: Vc() };
});
var Xe = g((Zx, Xc) => {
    "use strict";
    Xc.exports = { ...Tt(), ...Gn(), ...Wu(), ..._c(), ...Lc(), ...ke(), ...zc(), ...Qn(), ...st(), ...kr() };
});
var er = g((eI, Ot) => {
    "use strict";
    function Kc(e) {
        return typeof e > "u" || e === null;
    }
    function Wy(e) {
        return typeof e == "object" && e !== null;
    }
    function Gy(e) {
        return Array.isArray(e) ? e : Kc(e) ? [] : [e];
    }
    function Vy(e, t) {
        var r, n, i, o;
        if (t) for (o = Object.keys(t), r = 0, n = o.length; r < n; r += 1) (i = o[r]), (e[i] = t[i]);
        return e;
    }
    function Yy(e, t) {
        var r = "",
            n;
        for (n = 0; n < t; n += 1) r += e;
        return r;
    }
    function zy(e) {
        return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
    }
    Ot.exports.isNothing = Kc;
    Ot.exports.isObject = Wy;
    Ot.exports.toArray = Gy;
    Ot.exports.repeat = Yy;
    Ot.exports.isNegativeZero = zy;
    Ot.exports.extend = Vy;
});
var tr = g((tI, Qc) => {
    "use strict";
    function Jc(e, t) {
        var r = "",
            n = e.reason || "(unknown reason)";
        return e.mark
            ? (e.mark.name && (r += 'in "' + e.mark.name + '" '),
              (r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")"),
              !t && e.mark.snippet && (r += "\n\n" + e.mark.snippet),
              n + " " + r)
            : n;
    }
    function Hr(e, t) {
        Error.call(this),
            (this.name = "YAMLException"),
            (this.reason = e),
            (this.mark = t),
            (this.message = Jc(this, !1)),
            Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : (this.stack = new Error().stack || "");
    }
    Hr.prototype = Object.create(Error.prototype);
    Hr.prototype.constructor = Hr;
    Hr.prototype.toString = function (t) {
        return this.name + ": " + Jc(this, t);
    };
    Qc.exports = Hr;
});
var ef = g((rI, Zc) => {
    "use strict";
    var jr = er();
    function Bo(e, t, r, n, i) {
        var o = "",
            s = "",
            a = Math.floor(i / 2) - 1;
        return (
            n - t > a && ((o = " ... "), (t = n - a + o.length)),
            r - n > a && ((s = " ..."), (r = n + a - s.length)),
            { str: o + e.slice(t, r).replace(/\t/g, "\u2192") + s, pos: n - t + o.length }
        );
    }
    function Ho(e, t) {
        return jr.repeat(" ", t - e.length) + e;
    }
    function Xy(e, t) {
        if (((t = Object.create(t || null)), !e.buffer)) return null;
        t.maxLength || (t.maxLength = 79),
            typeof t.indent != "number" && (t.indent = 1),
            typeof t.linesBefore != "number" && (t.linesBefore = 3),
            typeof t.linesAfter != "number" && (t.linesAfter = 2);
        for (var r = /\r?\n|\r|\0/g, n = [0], i = [], o, s = -1; (o = r.exec(e.buffer)); )
            i.push(o.index), n.push(o.index + o[0].length), e.position <= o.index && s < 0 && (s = n.length - 2);
        s < 0 && (s = n.length - 1);
        var a = "",
            l,
            h,
            c = Math.min(e.line + t.linesAfter, i.length).toString().length,
            f = t.maxLength - (t.indent + c + 3);
        for (l = 1; l <= t.linesBefore && !(s - l < 0); l++)
            (h = Bo(e.buffer, n[s - l], i[s - l], e.position - (n[s] - n[s - l]), f)),
                (a = jr.repeat(" ", t.indent) + Ho((e.line - l + 1).toString(), c) + " | " + h.str + "\n" + a);
        for (
            h = Bo(e.buffer, n[s], i[s], e.position, f),
                a += jr.repeat(" ", t.indent) + Ho((e.line + 1).toString(), c) + " | " + h.str + "\n",
                a += jr.repeat("-", t.indent + c + 3 + h.pos) + "^\n",
                l = 1;
            l <= t.linesAfter && !(s + l >= i.length);
            l++
        )
            (h = Bo(e.buffer, n[s + l], i[s + l], e.position - (n[s] - n[s + l]), f)),
                (a += jr.repeat(" ", t.indent) + Ho((e.line + l + 1).toString(), c) + " | " + h.str + "\n");
        return a.replace(/\n$/, "");
    }
    Zc.exports = Xy;
});
var pe = g((nI, rf) => {
    "use strict";
    var tf = tr(),
        Ky = [
            "kind",
            "multi",
            "resolve",
            "construct",
            "instanceOf",
            "predicate",
            "represent",
            "representName",
            "defaultStyle",
            "styleAliases"
        ],
        Jy = ["scalar", "sequence", "mapping"];
    function Qy(e) {
        var t = {};
        return (
            e !== null &&
                Object.keys(e).forEach(function (r) {
                    e[r].forEach(function (n) {
                        t[String(n)] = r;
                    });
                }),
            t
        );
    }
    function Zy(e, t) {
        if (
            ((t = t || {}),
            Object.keys(t).forEach(function (r) {
                if (Ky.indexOf(r) === -1)
                    throw new tf('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
            }),
            (this.options = t),
            (this.tag = e),
            (this.kind = t.kind || null),
            (this.resolve =
                t.resolve ||
                function () {
                    return !0;
                }),
            (this.construct =
                t.construct ||
                function (r) {
                    return r;
                }),
            (this.instanceOf = t.instanceOf || null),
            (this.predicate = t.predicate || null),
            (this.represent = t.represent || null),
            (this.representName = t.representName || null),
            (this.defaultStyle = t.defaultStyle || null),
            (this.multi = t.multi || !1),
            (this.styleAliases = Qy(t.styleAliases || null)),
            Jy.indexOf(this.kind) === -1)
        )
            throw new tf('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
    }
    rf.exports = Zy;
});
var Go = g((iI, of) => {
    "use strict";
    var Wr = tr(),
        jo = pe();
    function nf(e, t) {
        var r = [];
        return (
            e[t].forEach(function (n) {
                var i = r.length;
                r.forEach(function (o, s) {
                    o.tag === n.tag && o.kind === n.kind && o.multi === n.multi && (i = s);
                }),
                    (r[i] = n);
            }),
            r
        );
    }
    function eE() {
        var e = {
                scalar: {},
                sequence: {},
                mapping: {},
                fallback: {},
                multi: { scalar: [], sequence: [], mapping: [], fallback: [] }
            },
            t,
            r;
        function n(i) {
            i.multi ? (e.multi[i.kind].push(i), e.multi.fallback.push(i)) : (e[i.kind][i.tag] = e.fallback[i.tag] = i);
        }
        for (t = 0, r = arguments.length; t < r; t += 1) arguments[t].forEach(n);
        return e;
    }
    function Wo(e) {
        return this.extend(e);
    }
    Wo.prototype.extend = function (t) {
        var r = [],
            n = [];
        if (t instanceof jo) n.push(t);
        else if (Array.isArray(t)) n = n.concat(t);
        else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
            t.implicit && (r = r.concat(t.implicit)), t.explicit && (n = n.concat(t.explicit));
        else
            throw new Wr(
                "Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })"
            );
        r.forEach(function (o) {
            if (!(o instanceof jo))
                throw new Wr("Specified list of YAML types (or a single Type object) contains a non-Type object.");
            if (o.loadKind && o.loadKind !== "scalar")
                throw new Wr(
                    "There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported."
                );
            if (o.multi)
                throw new Wr(
                    "There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit."
                );
        }),
            n.forEach(function (o) {
                if (!(o instanceof jo))
                    throw new Wr("Specified list of YAML types (or a single Type object) contains a non-Type object.");
            });
        var i = Object.create(Wo.prototype);
        return (
            (i.implicit = (this.implicit || []).concat(r)),
            (i.explicit = (this.explicit || []).concat(n)),
            (i.compiledImplicit = nf(i, "implicit")),
            (i.compiledExplicit = nf(i, "explicit")),
            (i.compiledTypeMap = eE(i.compiledImplicit, i.compiledExplicit)),
            i
        );
    };
    of.exports = Wo;
});
var Vo = g((oI, sf) => {
    "use strict";
    var tE = pe();
    sf.exports = new tE("tag:yaml.org,2002:str", {
        kind: "scalar",
        construct: function (e) {
            return e !== null ? e : "";
        }
    });
});
var Yo = g((sI, af) => {
    "use strict";
    var rE = pe();
    af.exports = new rE("tag:yaml.org,2002:seq", {
        kind: "sequence",
        construct: function (e) {
            return e !== null ? e : [];
        }
    });
});
var zo = g((aI, lf) => {
    "use strict";
    var nE = pe();
    lf.exports = new nE("tag:yaml.org,2002:map", {
        kind: "mapping",
        construct: function (e) {
            return e !== null ? e : {};
        }
    });
});
var Xo = g((lI, uf) => {
    "use strict";
    var iE = Go();
    uf.exports = new iE({ explicit: [Vo(), Yo(), zo()] });
});
var Ko = g((uI, cf) => {
    "use strict";
    var oE = pe();
    function sE(e) {
        if (e === null) return !0;
        var t = e.length;
        return (t === 1 && e === "~") || (t === 4 && (e === "null" || e === "Null" || e === "NULL"));
    }
    function aE() {
        return null;
    }
    function lE(e) {
        return e === null;
    }
    cf.exports = new oE("tag:yaml.org,2002:null", {
        kind: "scalar",
        resolve: sE,
        construct: aE,
        predicate: lE,
        represent: {
            canonical: function () {
                return "~";
            },
            lowercase: function () {
                return "null";
            },
            uppercase: function () {
                return "NULL";
            },
            camelcase: function () {
                return "Null";
            },
            empty: function () {
                return "";
            }
        },
        defaultStyle: "lowercase"
    });
});
var Jo = g((cI, ff) => {
    "use strict";
    var uE = pe();
    function cE(e) {
        if (e === null) return !1;
        var t = e.length;
        return (
            (t === 4 && (e === "true" || e === "True" || e === "TRUE")) ||
            (t === 5 && (e === "false" || e === "False" || e === "FALSE"))
        );
    }
    function fE(e) {
        return e === "true" || e === "True" || e === "TRUE";
    }
    function dE(e) {
        return Object.prototype.toString.call(e) === "[object Boolean]";
    }
    ff.exports = new uE("tag:yaml.org,2002:bool", {
        kind: "scalar",
        resolve: cE,
        construct: fE,
        predicate: dE,
        represent: {
            lowercase: function (e) {
                return e ? "true" : "false";
            },
            uppercase: function (e) {
                return e ? "TRUE" : "FALSE";
            },
            camelcase: function (e) {
                return e ? "True" : "False";
            }
        },
        defaultStyle: "lowercase"
    });
});
var Qo = g((fI, df) => {
    "use strict";
    var hE = er(),
        pE = pe();
    function mE(e) {
        return (48 <= e && e <= 57) || (65 <= e && e <= 70) || (97 <= e && e <= 102);
    }
    function gE(e) {
        return 48 <= e && e <= 55;
    }
    function wE(e) {
        return 48 <= e && e <= 57;
    }
    function yE(e) {
        if (e === null) return !1;
        var t = e.length,
            r = 0,
            n = !1,
            i;
        if (!t) return !1;
        if (((i = e[r]), (i === "-" || i === "+") && (i = e[++r]), i === "0")) {
            if (r + 1 === t) return !0;
            if (((i = e[++r]), i === "b")) {
                for (r++; r < t; r++)
                    if (((i = e[r]), i !== "_")) {
                        if (i !== "0" && i !== "1") return !1;
                        n = !0;
                    }
                return n && i !== "_";
            }
            if (i === "x") {
                for (r++; r < t; r++)
                    if (((i = e[r]), i !== "_")) {
                        if (!mE(e.charCodeAt(r))) return !1;
                        n = !0;
                    }
                return n && i !== "_";
            }
            if (i === "o") {
                for (r++; r < t; r++)
                    if (((i = e[r]), i !== "_")) {
                        if (!gE(e.charCodeAt(r))) return !1;
                        n = !0;
                    }
                return n && i !== "_";
            }
        }
        if (i === "_") return !1;
        for (; r < t; r++)
            if (((i = e[r]), i !== "_")) {
                if (!wE(e.charCodeAt(r))) return !1;
                n = !0;
            }
        return !(!n || i === "_");
    }
    function EE(e) {
        var t = e,
            r = 1,
            n;
        if (
            (t.indexOf("_") !== -1 && (t = t.replace(/_/g, "")),
            (n = t[0]),
            (n === "-" || n === "+") && (n === "-" && (r = -1), (t = t.slice(1)), (n = t[0])),
            t === "0")
        )
            return 0;
        if (n === "0") {
            if (t[1] === "b") return r * parseInt(t.slice(2), 2);
            if (t[1] === "x") return r * parseInt(t.slice(2), 16);
            if (t[1] === "o") return r * parseInt(t.slice(2), 8);
        }
        return r * parseInt(t, 10);
    }
    function _E(e) {
        return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !hE.isNegativeZero(e);
    }
    df.exports = new pE("tag:yaml.org,2002:int", {
        kind: "scalar",
        resolve: yE,
        construct: EE,
        predicate: _E,
        represent: {
            binary: function (e) {
                return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
            },
            octal: function (e) {
                return e >= 0 ? "0o" + e.toString(8) : "-0o" + e.toString(8).slice(1);
            },
            decimal: function (e) {
                return e.toString(10);
            },
            hexadecimal: function (e) {
                return e >= 0 ? "0x" + e.toString(16).toUpperCase() : "-0x" + e.toString(16).toUpperCase().slice(1);
            }
        },
        defaultStyle: "decimal",
        styleAliases: { binary: [2, "bin"], octal: [8, "oct"], decimal: [10, "dec"], hexadecimal: [16, "hex"] }
    });
});
var Zo = g((dI, pf) => {
    "use strict";
    var hf = er(),
        vE = pe(),
        AE = new RegExp(
            "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
        );
    function SE(e) {
        return !(e === null || !AE.test(e) || e[e.length - 1] === "_");
    }
    function CE(e) {
        var t, r;
        return (
            (t = e.replace(/_/g, "").toLowerCase()),
            (r = t[0] === "-" ? -1 : 1),
            "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)),
            t === ".inf"
                ? r === 1
                    ? Number.POSITIVE_INFINITY
                    : Number.NEGATIVE_INFINITY
                : t === ".nan"
                ? NaN
                : r * parseFloat(t, 10)
        );
    }
    var TE = /^[-+]?[0-9]+e/;
    function bE(e, t) {
        var r;
        if (isNaN(e))
            switch (t) {
                case "lowercase":
                    return ".nan";
                case "uppercase":
                    return ".NAN";
                case "camelcase":
                    return ".NaN";
            }
        else if (Number.POSITIVE_INFINITY === e)
            switch (t) {
                case "lowercase":
                    return ".inf";
                case "uppercase":
                    return ".INF";
                case "camelcase":
                    return ".Inf";
            }
        else if (Number.NEGATIVE_INFINITY === e)
            switch (t) {
                case "lowercase":
                    return "-.inf";
                case "uppercase":
                    return "-.INF";
                case "camelcase":
                    return "-.Inf";
            }
        else if (hf.isNegativeZero(e)) return "-0.0";
        return (r = e.toString(10)), TE.test(r) ? r.replace("e", ".e") : r;
    }
    function OE(e) {
        return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || hf.isNegativeZero(e));
    }
    pf.exports = new vE("tag:yaml.org,2002:float", {
        kind: "scalar",
        resolve: SE,
        construct: CE,
        predicate: OE,
        represent: bE,
        defaultStyle: "lowercase"
    });
});
var es = g((hI, mf) => {
    "use strict";
    mf.exports = Xo().extend({ implicit: [Ko(), Jo(), Qo(), Zo()] });
});
var ts = g((pI, gf) => {
    "use strict";
    gf.exports = es();
});
var rs = g((mI, Ef) => {
    "use strict";
    var xE = pe(),
        wf = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),
        yf = new RegExp(
            "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
        );
    function IE(e) {
        return e === null ? !1 : wf.exec(e) !== null || yf.exec(e) !== null;
    }
    function NE(e) {
        var t,
            r,
            n,
            i,
            o,
            s,
            a,
            l = 0,
            h = null,
            c,
            f,
            m;
        if (((t = wf.exec(e)), t === null && (t = yf.exec(e)), t === null)) throw new Error("Date resolve error");
        if (((r = +t[1]), (n = +t[2] - 1), (i = +t[3]), !t[4])) return new Date(Date.UTC(r, n, i));
        if (((o = +t[4]), (s = +t[5]), (a = +t[6]), t[7])) {
            for (l = t[7].slice(0, 3); l.length < 3; ) l += "0";
            l = +l;
        }
        return (
            t[9] && ((c = +t[10]), (f = +(t[11] || 0)), (h = (c * 60 + f) * 6e4), t[9] === "-" && (h = -h)),
            (m = new Date(Date.UTC(r, n, i, o, s, a, l))),
            h && m.setTime(m.getTime() - h),
            m
        );
    }
    function RE(e) {
        return e.toISOString();
    }
    Ef.exports = new xE("tag:yaml.org,2002:timestamp", {
        kind: "scalar",
        resolve: IE,
        construct: NE,
        instanceOf: Date,
        represent: RE
    });
});
var ns = g((gI, _f) => {
    "use strict";
    var PE = pe();
    function DE(e) {
        return e === "<<" || e === null;
    }
    _f.exports = new PE("tag:yaml.org,2002:merge", { kind: "scalar", resolve: DE });
});
var os = g((wI, vf) => {
    "use strict";
    var FE = pe(),
        is = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
    function qE(e) {
        if (e === null) return !1;
        var t,
            r,
            n = 0,
            i = e.length,
            o = is;
        for (r = 0; r < i; r++)
            if (((t = o.indexOf(e.charAt(r))), !(t > 64))) {
                if (t < 0) return !1;
                n += 6;
            }
        return n % 8 === 0;
    }
    function LE(e) {
        var t,
            r,
            n = e.replace(/[\r\n=]/g, ""),
            i = n.length,
            o = is,
            s = 0,
            a = [];
        for (t = 0; t < i; t++)
            t % 4 === 0 && t && (a.push((s >> 16) & 255), a.push((s >> 8) & 255), a.push(s & 255)),
                (s = (s << 6) | o.indexOf(n.charAt(t)));
        return (
            (r = (i % 4) * 6),
            r === 0
                ? (a.push((s >> 16) & 255), a.push((s >> 8) & 255), a.push(s & 255))
                : r === 18
                ? (a.push((s >> 10) & 255), a.push((s >> 2) & 255))
                : r === 12 && a.push((s >> 4) & 255),
            new Uint8Array(a)
        );
    }
    function UE(e) {
        var t = "",
            r = 0,
            n,
            i,
            o = e.length,
            s = is;
        for (n = 0; n < o; n++)
            n % 3 === 0 && n && ((t += s[(r >> 18) & 63]), (t += s[(r >> 12) & 63]), (t += s[(r >> 6) & 63]), (t += s[r & 63])),
                (r = (r << 8) + e[n]);
        return (
            (i = o % 3),
            i === 0
                ? ((t += s[(r >> 18) & 63]), (t += s[(r >> 12) & 63]), (t += s[(r >> 6) & 63]), (t += s[r & 63]))
                : i === 2
                ? ((t += s[(r >> 10) & 63]), (t += s[(r >> 4) & 63]), (t += s[(r << 2) & 63]), (t += s[64]))
                : i === 1 && ((t += s[(r >> 2) & 63]), (t += s[(r << 4) & 63]), (t += s[64]), (t += s[64])),
            t
        );
    }
    function $E(e) {
        return Object.prototype.toString.call(e) === "[object Uint8Array]";
    }
    vf.exports = new FE("tag:yaml.org,2002:binary", { kind: "scalar", resolve: qE, construct: LE, predicate: $E, represent: UE });
});
var ss = g((yI, Af) => {
    "use strict";
    var kE = pe(),
        ME = Object.prototype.hasOwnProperty,
        BE = Object.prototype.toString;
    function HE(e) {
        if (e === null) return !0;
        var t = [],
            r,
            n,
            i,
            o,
            s,
            a = e;
        for (r = 0, n = a.length; r < n; r += 1) {
            if (((i = a[r]), (s = !1), BE.call(i) !== "[object Object]")) return !1;
            for (o in i)
                if (ME.call(i, o))
                    if (!s) s = !0;
                    else return !1;
            if (!s) return !1;
            if (t.indexOf(o) === -1) t.push(o);
            else return !1;
        }
        return !0;
    }
    function jE(e) {
        return e !== null ? e : [];
    }
    Af.exports = new kE("tag:yaml.org,2002:omap", { kind: "sequence", resolve: HE, construct: jE });
});
var as = g((EI, Sf) => {
    "use strict";
    var WE = pe(),
        GE = Object.prototype.toString;
    function VE(e) {
        if (e === null) return !0;
        var t,
            r,
            n,
            i,
            o,
            s = e;
        for (o = new Array(s.length), t = 0, r = s.length; t < r; t += 1) {
            if (((n = s[t]), GE.call(n) !== "[object Object]" || ((i = Object.keys(n)), i.length !== 1))) return !1;
            o[t] = [i[0], n[i[0]]];
        }
        return !0;
    }
    function YE(e) {
        if (e === null) return [];
        var t,
            r,
            n,
            i,
            o,
            s = e;
        for (o = new Array(s.length), t = 0, r = s.length; t < r; t += 1)
            (n = s[t]), (i = Object.keys(n)), (o[t] = [i[0], n[i[0]]]);
        return o;
    }
    Sf.exports = new WE("tag:yaml.org,2002:pairs", { kind: "sequence", resolve: VE, construct: YE });
});
var ls = g((_I, Cf) => {
    "use strict";
    var zE = pe(),
        XE = Object.prototype.hasOwnProperty;
    function KE(e) {
        if (e === null) return !0;
        var t,
            r = e;
        for (t in r) if (XE.call(r, t) && r[t] !== null) return !1;
        return !0;
    }
    function JE(e) {
        return e !== null ? e : {};
    }
    Cf.exports = new zE("tag:yaml.org,2002:set", { kind: "mapping", resolve: KE, construct: JE });
});
var Zn = g((vI, Tf) => {
    "use strict";
    Tf.exports = ts().extend({ implicit: [rs(), ns()], explicit: [os(), ss(), as(), ls()] });
});
var Bf = g((AI, ds) => {
    "use strict";
    var It = er(),
        Pf = tr(),
        QE = ef(),
        ZE = Zn(),
        ft = Object.prototype.hasOwnProperty,
        ei = 1,
        Df = 2,
        Ff = 3,
        ti = 4,
        us = 1,
        e_ = 2,
        bf = 3,
        t_ =
            /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,
        r_ = /[\x85\u2028\u2029]/,
        n_ = /[,\[\]\{\}]/,
        qf = /^(?:!|!!|![a-z\-]+!)$/i,
        Lf = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
    function Of(e) {
        return Object.prototype.toString.call(e);
    }
    function je(e) {
        return e === 10 || e === 13;
    }
    function Nt(e) {
        return e === 9 || e === 32;
    }
    function Ne(e) {
        return e === 9 || e === 32 || e === 10 || e === 13;
    }
    function rr(e) {
        return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
    }
    function i_(e) {
        var t;
        return 48 <= e && e <= 57 ? e - 48 : ((t = e | 32), 97 <= t && t <= 102 ? t - 97 + 10 : -1);
    }
    function o_(e) {
        return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
    }
    function s_(e) {
        return 48 <= e && e <= 57 ? e - 48 : -1;
    }
    function xf(e) {
        return e === 48
            ? "\0"
            : e === 97
            ? "\x07"
            : e === 98
            ? "\b"
            : e === 116 || e === 9
            ? "	"
            : e === 110
            ? "\n"
            : e === 118
            ? "\v"
            : e === 102
            ? "\f"
            : e === 114
            ? "\r"
            : e === 101
            ? "\x1B"
            : e === 32
            ? " "
            : e === 34
            ? '"'
            : e === 47
            ? "/"
            : e === 92
            ? "\\"
            : e === 78
            ? "\x85"
            : e === 95
            ? "\xA0"
            : e === 76
            ? "\u2028"
            : e === 80
            ? "\u2029"
            : "";
    }
    function a_(e) {
        return e <= 65535
            ? String.fromCharCode(e)
            : String.fromCharCode(((e - 65536) >> 10) + 55296, ((e - 65536) & 1023) + 56320);
    }
    var Uf = new Array(256),
        $f = new Array(256);
    for (xt = 0; xt < 256; xt++) (Uf[xt] = xf(xt) ? 1 : 0), ($f[xt] = xf(xt));
    var xt;
    function l_(e, t) {
        (this.input = e),
            (this.filename = t.filename || null),
            (this.schema = t.schema || ZE),
            (this.onWarning = t.onWarning || null),
            (this.legacy = t.legacy || !1),
            (this.json = t.json || !1),
            (this.listener = t.listener || null),
            (this.implicitTypes = this.schema.compiledImplicit),
            (this.typeMap = this.schema.compiledTypeMap),
            (this.length = e.length),
            (this.position = 0),
            (this.line = 0),
            (this.lineStart = 0),
            (this.lineIndent = 0),
            (this.firstTabInLine = -1),
            (this.documents = []);
    }
    function kf(e, t) {
        var r = {
            name: e.filename,
            buffer: e.input.slice(0, -1),
            position: e.position,
            line: e.line,
            column: e.position - e.lineStart
        };
        return (r.snippet = QE(r)), new Pf(t, r);
    }
    function I(e, t) {
        throw kf(e, t);
    }
    function ri(e, t) {
        e.onWarning && e.onWarning.call(null, kf(e, t));
    }
    var If = {
        YAML: function (t, r, n) {
            var i, o, s;
            t.version !== null && I(t, "duplication of %YAML directive"),
                n.length !== 1 && I(t, "YAML directive accepts exactly one argument"),
                (i = /^([0-9]+)\.([0-9]+)$/.exec(n[0])),
                i === null && I(t, "ill-formed argument of the YAML directive"),
                (o = parseInt(i[1], 10)),
                (s = parseInt(i[2], 10)),
                o !== 1 && I(t, "unacceptable YAML version of the document"),
                (t.version = n[0]),
                (t.checkLineBreaks = s < 2),
                s !== 1 && s !== 2 && ri(t, "unsupported YAML version of the document");
        },
        TAG: function (t, r, n) {
            var i, o;
            n.length !== 2 && I(t, "TAG directive accepts exactly two arguments"),
                (i = n[0]),
                (o = n[1]),
                qf.test(i) || I(t, "ill-formed tag handle (first argument) of the TAG directive"),
                ft.call(t.tagMap, i) && I(t, 'there is a previously declared suffix for "' + i + '" tag handle'),
                Lf.test(o) || I(t, "ill-formed tag prefix (second argument) of the TAG directive");
            try {
                o = decodeURIComponent(o);
            } catch {
                I(t, "tag prefix is malformed: " + o);
            }
            t.tagMap[i] = o;
        }
    };
    function ct(e, t, r, n) {
        var i, o, s, a;
        if (t < r) {
            if (((a = e.input.slice(t, r)), n))
                for (i = 0, o = a.length; i < o; i += 1)
                    (s = a.charCodeAt(i)), s === 9 || (32 <= s && s <= 1114111) || I(e, "expected valid JSON character");
            else t_.test(a) && I(e, "the stream contains non-printable characters");
            e.result += a;
        }
    }
    function Nf(e, t, r, n) {
        var i, o, s, a;
        for (
            It.isObject(r) || I(e, "cannot merge mappings; the provided source object is unacceptable"),
                i = Object.keys(r),
                s = 0,
                a = i.length;
            s < a;
            s += 1
        )
            (o = i[s]), ft.call(t, o) || ((t[o] = r[o]), (n[o] = !0));
    }
    function nr(e, t, r, n, i, o, s, a, l) {
        var h, c;
        if (Array.isArray(i))
            for (i = Array.prototype.slice.call(i), h = 0, c = i.length; h < c; h += 1)
                Array.isArray(i[h]) && I(e, "nested arrays are not supported inside keys"),
                    typeof i == "object" && Of(i[h]) === "[object Object]" && (i[h] = "[object Object]");
        if (
            (typeof i == "object" && Of(i) === "[object Object]" && (i = "[object Object]"),
            (i = String(i)),
            t === null && (t = {}),
            n === "tag:yaml.org,2002:merge")
        )
            if (Array.isArray(o)) for (h = 0, c = o.length; h < c; h += 1) Nf(e, t, o[h], r);
            else Nf(e, t, o, r);
        else
            !e.json &&
                !ft.call(r, i) &&
                ft.call(t, i) &&
                ((e.line = s || e.line),
                (e.lineStart = a || e.lineStart),
                (e.position = l || e.position),
                I(e, "duplicated mapping key")),
                i === "__proto__"
                    ? Object.defineProperty(t, i, { configurable: !0, enumerable: !0, writable: !0, value: o })
                    : (t[i] = o),
                delete r[i];
        return t;
    }
    function cs(e) {
        var t;
        (t = e.input.charCodeAt(e.position)),
            t === 10
                ? e.position++
                : t === 13
                ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++)
                : I(e, "a line break is expected"),
            (e.line += 1),
            (e.lineStart = e.position),
            (e.firstTabInLine = -1);
    }
    function ne(e, t, r) {
        for (var n = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
            for (; Nt(i); )
                i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), (i = e.input.charCodeAt(++e.position));
            if (t && i === 35)
                do i = e.input.charCodeAt(++e.position);
                while (i !== 10 && i !== 13 && i !== 0);
            if (je(i))
                for (cs(e), i = e.input.charCodeAt(e.position), n++, e.lineIndent = 0; i === 32; )
                    e.lineIndent++, (i = e.input.charCodeAt(++e.position));
            else break;
        }
        return r !== -1 && n !== 0 && e.lineIndent < r && ri(e, "deficient indentation"), n;
    }
    function ni(e) {
        var t = e.position,
            r;
        return (
            (r = e.input.charCodeAt(t)),
            !!(
                (r === 45 || r === 46) &&
                r === e.input.charCodeAt(t + 1) &&
                r === e.input.charCodeAt(t + 2) &&
                ((t += 3), (r = e.input.charCodeAt(t)), r === 0 || Ne(r))
            )
        );
    }
    function fs(e, t) {
        t === 1 ? (e.result += " ") : t > 1 && (e.result += It.repeat("\n", t - 1));
    }
    function u_(e, t, r) {
        var n,
            i,
            o,
            s,
            a,
            l,
            h,
            c,
            f = e.kind,
            m = e.result,
            p;
        if (
            ((p = e.input.charCodeAt(e.position)),
            Ne(p) ||
                rr(p) ||
                p === 35 ||
                p === 38 ||
                p === 42 ||
                p === 33 ||
                p === 124 ||
                p === 62 ||
                p === 39 ||
                p === 34 ||
                p === 37 ||
                p === 64 ||
                p === 96 ||
                ((p === 63 || p === 45) && ((i = e.input.charCodeAt(e.position + 1)), Ne(i) || (r && rr(i)))))
        )
            return !1;
        for (e.kind = "scalar", e.result = "", o = s = e.position, a = !1; p !== 0; ) {
            if (p === 58) {
                if (((i = e.input.charCodeAt(e.position + 1)), Ne(i) || (r && rr(i)))) break;
            } else if (p === 35) {
                if (((n = e.input.charCodeAt(e.position - 1)), Ne(n))) break;
            } else {
                if ((e.position === e.lineStart && ni(e)) || (r && rr(p))) break;
                if (je(p))
                    if (((l = e.line), (h = e.lineStart), (c = e.lineIndent), ne(e, !1, -1), e.lineIndent >= t)) {
                        (a = !0), (p = e.input.charCodeAt(e.position));
                        continue;
                    } else {
                        (e.position = s), (e.line = l), (e.lineStart = h), (e.lineIndent = c);
                        break;
                    }
            }
            a && (ct(e, o, s, !1), fs(e, e.line - l), (o = s = e.position), (a = !1)),
                Nt(p) || (s = e.position + 1),
                (p = e.input.charCodeAt(++e.position));
        }
        return ct(e, o, s, !1), e.result ? !0 : ((e.kind = f), (e.result = m), !1);
    }
    function c_(e, t) {
        var r, n, i;
        if (((r = e.input.charCodeAt(e.position)), r !== 39)) return !1;
        for (e.kind = "scalar", e.result = "", e.position++, n = i = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
            if (r === 39)
                if ((ct(e, n, e.position, !0), (r = e.input.charCodeAt(++e.position)), r === 39))
                    (n = e.position), e.position++, (i = e.position);
                else return !0;
            else
                je(r)
                    ? (ct(e, n, i, !0), fs(e, ne(e, !1, t)), (n = i = e.position))
                    : e.position === e.lineStart && ni(e)
                    ? I(e, "unexpected end of the document within a single quoted scalar")
                    : (e.position++, (i = e.position));
        I(e, "unexpected end of the stream within a single quoted scalar");
    }
    function f_(e, t) {
        var r, n, i, o, s, a;
        if (((a = e.input.charCodeAt(e.position)), a !== 34)) return !1;
        for (e.kind = "scalar", e.result = "", e.position++, r = n = e.position; (a = e.input.charCodeAt(e.position)) !== 0; ) {
            if (a === 34) return ct(e, r, e.position, !0), e.position++, !0;
            if (a === 92) {
                if ((ct(e, r, e.position, !0), (a = e.input.charCodeAt(++e.position)), je(a))) ne(e, !1, t);
                else if (a < 256 && Uf[a]) (e.result += $f[a]), e.position++;
                else if ((s = o_(a)) > 0) {
                    for (i = s, o = 0; i > 0; i--)
                        (a = e.input.charCodeAt(++e.position)),
                            (s = i_(a)) >= 0 ? (o = (o << 4) + s) : I(e, "expected hexadecimal character");
                    (e.result += a_(o)), e.position++;
                } else I(e, "unknown escape sequence");
                r = n = e.position;
            } else
                je(a)
                    ? (ct(e, r, n, !0), fs(e, ne(e, !1, t)), (r = n = e.position))
                    : e.position === e.lineStart && ni(e)
                    ? I(e, "unexpected end of the document within a double quoted scalar")
                    : (e.position++, (n = e.position));
        }
        I(e, "unexpected end of the stream within a double quoted scalar");
    }
    function d_(e, t) {
        var r = !0,
            n,
            i,
            o,
            s = e.tag,
            a,
            l = e.anchor,
            h,
            c,
            f,
            m,
            p,
            E = Object.create(null),
            _,
            v,
            T,
            S;
        if (((S = e.input.charCodeAt(e.position)), S === 91)) (c = 93), (p = !1), (a = []);
        else if (S === 123) (c = 125), (p = !0), (a = {});
        else return !1;
        for (e.anchor !== null && (e.anchorMap[e.anchor] = a), S = e.input.charCodeAt(++e.position); S !== 0; ) {
            if ((ne(e, !0, t), (S = e.input.charCodeAt(e.position)), S === c))
                return e.position++, (e.tag = s), (e.anchor = l), (e.kind = p ? "mapping" : "sequence"), (e.result = a), !0;
            r
                ? S === 44 && I(e, "expected the node content, but found ','")
                : I(e, "missed comma between flow collection entries"),
                (v = _ = T = null),
                (f = m = !1),
                S === 63 && ((h = e.input.charCodeAt(e.position + 1)), Ne(h) && ((f = m = !0), e.position++, ne(e, !0, t))),
                (n = e.line),
                (i = e.lineStart),
                (o = e.position),
                ir(e, t, ei, !1, !0),
                (v = e.tag),
                (_ = e.result),
                ne(e, !0, t),
                (S = e.input.charCodeAt(e.position)),
                (m || e.line === n) &&
                    S === 58 &&
                    ((f = !0), (S = e.input.charCodeAt(++e.position)), ne(e, !0, t), ir(e, t, ei, !1, !0), (T = e.result)),
                p ? nr(e, a, E, v, _, T, n, i, o) : f ? a.push(nr(e, null, E, v, _, T, n, i, o)) : a.push(_),
                ne(e, !0, t),
                (S = e.input.charCodeAt(e.position)),
                S === 44 ? ((r = !0), (S = e.input.charCodeAt(++e.position))) : (r = !1);
        }
        I(e, "unexpected end of the stream within a flow collection");
    }
    function h_(e, t) {
        var r,
            n,
            i = us,
            o = !1,
            s = !1,
            a = t,
            l = 0,
            h = !1,
            c,
            f;
        if (((f = e.input.charCodeAt(e.position)), f === 124)) n = !1;
        else if (f === 62) n = !0;
        else return !1;
        for (e.kind = "scalar", e.result = ""; f !== 0; )
            if (((f = e.input.charCodeAt(++e.position)), f === 43 || f === 45))
                us === i ? (i = f === 43 ? bf : e_) : I(e, "repeat of a chomping mode identifier");
            else if ((c = s_(f)) >= 0)
                c === 0
                    ? I(e, "bad explicit indentation width of a block scalar; it cannot be less than one")
                    : s
                    ? I(e, "repeat of an indentation width identifier")
                    : ((a = t + c - 1), (s = !0));
            else break;
        if (Nt(f)) {
            do f = e.input.charCodeAt(++e.position);
            while (Nt(f));
            if (f === 35)
                do f = e.input.charCodeAt(++e.position);
                while (!je(f) && f !== 0);
        }
        for (; f !== 0; ) {
            for (cs(e), e.lineIndent = 0, f = e.input.charCodeAt(e.position); (!s || e.lineIndent < a) && f === 32; )
                e.lineIndent++, (f = e.input.charCodeAt(++e.position));
            if ((!s && e.lineIndent > a && (a = e.lineIndent), je(f))) {
                l++;
                continue;
            }
            if (e.lineIndent < a) {
                i === bf ? (e.result += It.repeat("\n", o ? 1 + l : l)) : i === us && o && (e.result += "\n");
                break;
            }
            for (
                n
                    ? Nt(f)
                        ? ((h = !0), (e.result += It.repeat("\n", o ? 1 + l : l)))
                        : h
                        ? ((h = !1), (e.result += It.repeat("\n", l + 1)))
                        : l === 0
                        ? o && (e.result += " ")
                        : (e.result += It.repeat("\n", l))
                    : (e.result += It.repeat("\n", o ? 1 + l : l)),
                    o = !0,
                    s = !0,
                    l = 0,
                    r = e.position;
                !je(f) && f !== 0;

            )
                f = e.input.charCodeAt(++e.position);
            ct(e, r, e.position, !1);
        }
        return !0;
    }
    function Rf(e, t) {
        var r,
            n = e.tag,
            i = e.anchor,
            o = [],
            s,
            a = !1,
            l;
        if (e.firstTabInLine !== -1) return !1;
        for (
            e.anchor !== null && (e.anchorMap[e.anchor] = o), l = e.input.charCodeAt(e.position);
            l !== 0 &&
            (e.firstTabInLine !== -1 && ((e.position = e.firstTabInLine), I(e, "tab characters must not be used in indentation")),
            !(l !== 45 || ((s = e.input.charCodeAt(e.position + 1)), !Ne(s))));

        ) {
            if (((a = !0), e.position++, ne(e, !0, -1) && e.lineIndent <= t)) {
                o.push(null), (l = e.input.charCodeAt(e.position));
                continue;
            }
            if (
                ((r = e.line),
                ir(e, t, Ff, !1, !0),
                o.push(e.result),
                ne(e, !0, -1),
                (l = e.input.charCodeAt(e.position)),
                (e.line === r || e.lineIndent > t) && l !== 0)
            )
                I(e, "bad indentation of a sequence entry");
            else if (e.lineIndent < t) break;
        }
        return a ? ((e.tag = n), (e.anchor = i), (e.kind = "sequence"), (e.result = o), !0) : !1;
    }
    function p_(e, t, r) {
        var n,
            i,
            o,
            s,
            a,
            l,
            h = e.tag,
            c = e.anchor,
            f = {},
            m = Object.create(null),
            p = null,
            E = null,
            _ = null,
            v = !1,
            T = !1,
            S;
        if (e.firstTabInLine !== -1) return !1;
        for (e.anchor !== null && (e.anchorMap[e.anchor] = f), S = e.input.charCodeAt(e.position); S !== 0; ) {
            if (
                (!v &&
                    e.firstTabInLine !== -1 &&
                    ((e.position = e.firstTabInLine), I(e, "tab characters must not be used in indentation")),
                (n = e.input.charCodeAt(e.position + 1)),
                (o = e.line),
                (S === 63 || S === 58) && Ne(n))
            )
                S === 63
                    ? (v && (nr(e, f, m, p, E, null, s, a, l), (p = E = _ = null)), (T = !0), (v = !0), (i = !0))
                    : v
                    ? ((v = !1), (i = !0))
                    : I(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),
                    (e.position += 1),
                    (S = n);
            else {
                if (((s = e.line), (a = e.lineStart), (l = e.position), !ir(e, r, Df, !1, !0))) break;
                if (e.line === o) {
                    for (S = e.input.charCodeAt(e.position); Nt(S); ) S = e.input.charCodeAt(++e.position);
                    if (S === 58)
                        (S = e.input.charCodeAt(++e.position)),
                            Ne(S) ||
                                I(e, "a whitespace character is expected after the key-value separator within a block mapping"),
                            v && (nr(e, f, m, p, E, null, s, a, l), (p = E = _ = null)),
                            (T = !0),
                            (v = !1),
                            (i = !1),
                            (p = e.tag),
                            (E = e.result);
                    else if (T) I(e, "can not read an implicit mapping pair; a colon is missed");
                    else return (e.tag = h), (e.anchor = c), !0;
                } else if (T) I(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
                else return (e.tag = h), (e.anchor = c), !0;
            }
            if (
                ((e.line === o || e.lineIndent > t) &&
                    (v && ((s = e.line), (a = e.lineStart), (l = e.position)),
                    ir(e, t, ti, !0, i) && (v ? (E = e.result) : (_ = e.result)),
                    v || (nr(e, f, m, p, E, _, s, a, l), (p = E = _ = null)),
                    ne(e, !0, -1),
                    (S = e.input.charCodeAt(e.position))),
                (e.line === o || e.lineIndent > t) && S !== 0)
            )
                I(e, "bad indentation of a mapping entry");
            else if (e.lineIndent < t) break;
        }
        return v && nr(e, f, m, p, E, null, s, a, l), T && ((e.tag = h), (e.anchor = c), (e.kind = "mapping"), (e.result = f)), T;
    }
    function m_(e) {
        var t,
            r = !1,
            n = !1,
            i,
            o,
            s;
        if (((s = e.input.charCodeAt(e.position)), s !== 33)) return !1;
        if (
            (e.tag !== null && I(e, "duplication of a tag property"),
            (s = e.input.charCodeAt(++e.position)),
            s === 60
                ? ((r = !0), (s = e.input.charCodeAt(++e.position)))
                : s === 33
                ? ((n = !0), (i = "!!"), (s = e.input.charCodeAt(++e.position)))
                : (i = "!"),
            (t = e.position),
            r)
        ) {
            do s = e.input.charCodeAt(++e.position);
            while (s !== 0 && s !== 62);
            e.position < e.length
                ? ((o = e.input.slice(t, e.position)), (s = e.input.charCodeAt(++e.position)))
                : I(e, "unexpected end of the stream within a verbatim tag");
        } else {
            for (; s !== 0 && !Ne(s); )
                s === 33 &&
                    (n
                        ? I(e, "tag suffix cannot contain exclamation marks")
                        : ((i = e.input.slice(t - 1, e.position + 1)),
                          qf.test(i) || I(e, "named tag handle cannot contain such characters"),
                          (n = !0),
                          (t = e.position + 1))),
                    (s = e.input.charCodeAt(++e.position));
            (o = e.input.slice(t, e.position)), n_.test(o) && I(e, "tag suffix cannot contain flow indicator characters");
        }
        o && !Lf.test(o) && I(e, "tag name cannot contain such characters: " + o);
        try {
            o = decodeURIComponent(o);
        } catch {
            I(e, "tag name is malformed: " + o);
        }
        return (
            r
                ? (e.tag = o)
                : ft.call(e.tagMap, i)
                ? (e.tag = e.tagMap[i] + o)
                : i === "!"
                ? (e.tag = "!" + o)
                : i === "!!"
                ? (e.tag = "tag:yaml.org,2002:" + o)
                : I(e, 'undeclared tag handle "' + i + '"'),
            !0
        );
    }
    function g_(e) {
        var t, r;
        if (((r = e.input.charCodeAt(e.position)), r !== 38)) return !1;
        for (
            e.anchor !== null && I(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), t = e.position;
            r !== 0 && !Ne(r) && !rr(r);

        )
            r = e.input.charCodeAt(++e.position);
        return (
            e.position === t && I(e, "name of an anchor node must contain at least one character"),
            (e.anchor = e.input.slice(t, e.position)),
            !0
        );
    }
    function w_(e) {
        var t, r, n;
        if (((n = e.input.charCodeAt(e.position)), n !== 42)) return !1;
        for (n = e.input.charCodeAt(++e.position), t = e.position; n !== 0 && !Ne(n) && !rr(n); )
            n = e.input.charCodeAt(++e.position);
        return (
            e.position === t && I(e, "name of an alias node must contain at least one character"),
            (r = e.input.slice(t, e.position)),
            ft.call(e.anchorMap, r) || I(e, 'unidentified alias "' + r + '"'),
            (e.result = e.anchorMap[r]),
            ne(e, !0, -1),
            !0
        );
    }
    function ir(e, t, r, n, i) {
        var o,
            s,
            a,
            l = 1,
            h = !1,
            c = !1,
            f,
            m,
            p,
            E,
            _,
            v;
        if (
            (e.listener !== null && e.listener("open", e),
            (e.tag = null),
            (e.anchor = null),
            (e.kind = null),
            (e.result = null),
            (o = s = a = ti === r || Ff === r),
            n &&
                ne(e, !0, -1) &&
                ((h = !0), e.lineIndent > t ? (l = 1) : e.lineIndent === t ? (l = 0) : e.lineIndent < t && (l = -1)),
            l === 1)
        )
            for (; m_(e) || g_(e); )
                ne(e, !0, -1)
                    ? ((h = !0),
                      (a = o),
                      e.lineIndent > t ? (l = 1) : e.lineIndent === t ? (l = 0) : e.lineIndent < t && (l = -1))
                    : (a = !1);
        if (
            (a && (a = h || i),
            (l === 1 || ti === r) &&
                (ei === r || Df === r ? (_ = t) : (_ = t + 1),
                (v = e.position - e.lineStart),
                l === 1
                    ? (a && (Rf(e, v) || p_(e, v, _))) || d_(e, _)
                        ? (c = !0)
                        : ((s && h_(e, _)) || c_(e, _) || f_(e, _)
                              ? (c = !0)
                              : w_(e)
                              ? ((c = !0),
                                (e.tag !== null || e.anchor !== null) && I(e, "alias node should not have any properties"))
                              : u_(e, _, ei === r) && ((c = !0), e.tag === null && (e.tag = "?")),
                          e.anchor !== null && (e.anchorMap[e.anchor] = e.result))
                    : l === 0 && (c = a && Rf(e, v))),
            e.tag === null)
        )
            e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        else if (e.tag === "?") {
            for (
                e.result !== null &&
                    e.kind !== "scalar" &&
                    I(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'),
                    f = 0,
                    m = e.implicitTypes.length;
                f < m;
                f += 1
            )
                if (((E = e.implicitTypes[f]), E.resolve(e.result))) {
                    (e.result = E.construct(e.result)), (e.tag = E.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
                    break;
                }
        } else if (e.tag !== "!") {
            if (ft.call(e.typeMap[e.kind || "fallback"], e.tag)) E = e.typeMap[e.kind || "fallback"][e.tag];
            else
                for (E = null, p = e.typeMap.multi[e.kind || "fallback"], f = 0, m = p.length; f < m; f += 1)
                    if (e.tag.slice(0, p[f].tag.length) === p[f].tag) {
                        E = p[f];
                        break;
                    }
            E || I(e, "unknown tag !<" + e.tag + ">"),
                e.result !== null &&
                    E.kind !== e.kind &&
                    I(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + E.kind + '", not "' + e.kind + '"'),
                E.resolve(e.result, e.tag)
                    ? ((e.result = E.construct(e.result, e.tag)), e.anchor !== null && (e.anchorMap[e.anchor] = e.result))
                    : I(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
        }
        return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || c;
    }
    function y_(e) {
        var t = e.position,
            r,
            n,
            i,
            o = !1,
            s;
        for (
            e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = Object.create(null), e.anchorMap = Object.create(null);
            (s = e.input.charCodeAt(e.position)) !== 0 &&
            (ne(e, !0, -1), (s = e.input.charCodeAt(e.position)), !(e.lineIndent > 0 || s !== 37));

        ) {
            for (o = !0, s = e.input.charCodeAt(++e.position), r = e.position; s !== 0 && !Ne(s); )
                s = e.input.charCodeAt(++e.position);
            for (
                n = e.input.slice(r, e.position),
                    i = [],
                    n.length < 1 && I(e, "directive name must not be less than one character in length");
                s !== 0;

            ) {
                for (; Nt(s); ) s = e.input.charCodeAt(++e.position);
                if (s === 35) {
                    do s = e.input.charCodeAt(++e.position);
                    while (s !== 0 && !je(s));
                    break;
                }
                if (je(s)) break;
                for (r = e.position; s !== 0 && !Ne(s); ) s = e.input.charCodeAt(++e.position);
                i.push(e.input.slice(r, e.position));
            }
            s !== 0 && cs(e), ft.call(If, n) ? If[n](e, n, i) : ri(e, 'unknown document directive "' + n + '"');
        }
        if (
            (ne(e, !0, -1),
            e.lineIndent === 0 &&
            e.input.charCodeAt(e.position) === 45 &&
            e.input.charCodeAt(e.position + 1) === 45 &&
            e.input.charCodeAt(e.position + 2) === 45
                ? ((e.position += 3), ne(e, !0, -1))
                : o && I(e, "directives end mark is expected"),
            ir(e, e.lineIndent - 1, ti, !1, !0),
            ne(e, !0, -1),
            e.checkLineBreaks &&
                r_.test(e.input.slice(t, e.position)) &&
                ri(e, "non-ASCII line breaks are interpreted as content"),
            e.documents.push(e.result),
            e.position === e.lineStart && ni(e))
        ) {
            e.input.charCodeAt(e.position) === 46 && ((e.position += 3), ne(e, !0, -1));
            return;
        }
        if (e.position < e.length - 1) I(e, "end of the stream or a document separator is expected");
        else return;
    }
    function Mf(e, t) {
        (e = String(e)),
            (t = t || {}),
            e.length !== 0 &&
                (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += "\n"),
                e.charCodeAt(0) === 65279 && (e = e.slice(1)));
        var r = new l_(e, t),
            n = e.indexOf("\0");
        for (
            n !== -1 && ((r.position = n), I(r, "null byte is not allowed in input")), r.input += "\0";
            r.input.charCodeAt(r.position) === 32;

        )
            (r.lineIndent += 1), (r.position += 1);
        for (; r.position < r.length - 1; ) y_(r);
        return r.documents;
    }
    function E_(e, t, r) {
        t !== null && typeof t == "object" && typeof r > "u" && ((r = t), (t = null));
        var n = Mf(e, r);
        if (typeof t != "function") return n;
        for (var i = 0, o = n.length; i < o; i += 1) t(n[i]);
    }
    function __(e, t) {
        var r = Mf(e, t);
        if (r.length !== 0) {
            if (r.length === 1) return r[0];
            throw new Pf("expected a single document in the stream, but found more");
        }
    }
    ds.exports.loadAll = E_;
    ds.exports.load = __;
});
var ld = g((SI, ad) => {
    "use strict";
    var si = er(),
        Xr = tr(),
        v_ = Zn(),
        Kf = Object.prototype.toString,
        Jf = Object.prototype.hasOwnProperty,
        ws = 65279,
        A_ = 9,
        Vr = 10,
        S_ = 13,
        C_ = 32,
        T_ = 33,
        b_ = 34,
        hs = 35,
        O_ = 37,
        x_ = 38,
        I_ = 39,
        N_ = 42,
        Qf = 44,
        R_ = 45,
        ii = 58,
        P_ = 61,
        D_ = 62,
        F_ = 63,
        q_ = 64,
        Zf = 91,
        ed = 93,
        L_ = 96,
        td = 123,
        U_ = 124,
        rd = 125,
        me = {};
    me[0] = "\\0";
    me[7] = "\\a";
    me[8] = "\\b";
    me[9] = "\\t";
    me[10] = "\\n";
    me[11] = "\\v";
    me[12] = "\\f";
    me[13] = "\\r";
    me[27] = "\\e";
    me[34] = '\\"';
    me[92] = "\\\\";
    me[133] = "\\N";
    me[160] = "\\_";
    me[8232] = "\\L";
    me[8233] = "\\P";
    var $_ = ["y", "Y", "yes", "Yes", "YES", "on", "On", "ON", "n", "N", "no", "No", "NO", "off", "Off", "OFF"],
        k_ = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
    function M_(e, t) {
        var r, n, i, o, s, a, l;
        if (t === null) return {};
        for (r = {}, n = Object.keys(t), i = 0, o = n.length; i < o; i += 1)
            (s = n[i]),
                (a = String(t[s])),
                s.slice(0, 2) === "!!" && (s = "tag:yaml.org,2002:" + s.slice(2)),
                (l = e.compiledTypeMap.fallback[s]),
                l && Jf.call(l.styleAliases, a) && (a = l.styleAliases[a]),
                (r[s] = a);
        return r;
    }
    function B_(e) {
        var t, r, n;
        if (((t = e.toString(16).toUpperCase()), e <= 255)) (r = "x"), (n = 2);
        else if (e <= 65535) (r = "u"), (n = 4);
        else if (e <= 4294967295) (r = "U"), (n = 8);
        else throw new Xr("code point within a string may not be greater than 0xFFFFFFFF");
        return "\\" + r + si.repeat("0", n - t.length) + t;
    }
    var H_ = 1,
        Yr = 2;
    function j_(e) {
        (this.schema = e.schema || v_),
            (this.indent = Math.max(1, e.indent || 2)),
            (this.noArrayIndent = e.noArrayIndent || !1),
            (this.skipInvalid = e.skipInvalid || !1),
            (this.flowLevel = si.isNothing(e.flowLevel) ? -1 : e.flowLevel),
            (this.styleMap = M_(this.schema, e.styles || null)),
            (this.sortKeys = e.sortKeys || !1),
            (this.lineWidth = e.lineWidth || 80),
            (this.noRefs = e.noRefs || !1),
            (this.noCompatMode = e.noCompatMode || !1),
            (this.condenseFlow = e.condenseFlow || !1),
            (this.quotingType = e.quotingType === '"' ? Yr : H_),
            (this.forceQuotes = e.forceQuotes || !1),
            (this.replacer = typeof e.replacer == "function" ? e.replacer : null),
            (this.implicitTypes = this.schema.compiledImplicit),
            (this.explicitTypes = this.schema.compiledExplicit),
            (this.tag = null),
            (this.result = ""),
            (this.duplicates = []),
            (this.usedDuplicates = null);
    }
    function Hf(e, t) {
        for (var r = si.repeat(" ", t), n = 0, i = -1, o = "", s, a = e.length; n < a; )
            (i = e.indexOf("\n", n)),
                i === -1 ? ((s = e.slice(n)), (n = a)) : ((s = e.slice(n, i + 1)), (n = i + 1)),
                s.length && s !== "\n" && (o += r),
                (o += s);
        return o;
    }
    function ps(e, t) {
        return "\n" + si.repeat(" ", e.indent * t);
    }
    function W_(e, t) {
        var r, n, i;
        for (r = 0, n = e.implicitTypes.length; r < n; r += 1) if (((i = e.implicitTypes[r]), i.resolve(t))) return !0;
        return !1;
    }
    function oi(e) {
        return e === C_ || e === A_;
    }
    function zr(e) {
        return (
            (32 <= e && e <= 126) ||
            (161 <= e && e <= 55295 && e !== 8232 && e !== 8233) ||
            (57344 <= e && e <= 65533 && e !== ws) ||
            (65536 <= e && e <= 1114111)
        );
    }
    function jf(e) {
        return zr(e) && e !== ws && e !== S_ && e !== Vr;
    }
    function Wf(e, t, r) {
        var n = jf(e),
            i = n && !oi(e);
        return (
            ((r ? n : n && e !== Qf && e !== Zf && e !== ed && e !== td && e !== rd) && e !== hs && !(t === ii && !i)) ||
            (jf(t) && !oi(t) && e === hs) ||
            (t === ii && i)
        );
    }
    function G_(e) {
        return (
            zr(e) &&
            e !== ws &&
            !oi(e) &&
            e !== R_ &&
            e !== F_ &&
            e !== ii &&
            e !== Qf &&
            e !== Zf &&
            e !== ed &&
            e !== td &&
            e !== rd &&
            e !== hs &&
            e !== x_ &&
            e !== N_ &&
            e !== T_ &&
            e !== U_ &&
            e !== P_ &&
            e !== D_ &&
            e !== I_ &&
            e !== b_ &&
            e !== O_ &&
            e !== q_ &&
            e !== L_
        );
    }
    function V_(e) {
        return !oi(e) && e !== ii;
    }
    function Gr(e, t) {
        var r = e.charCodeAt(t),
            n;
        return r >= 55296 && r <= 56319 && t + 1 < e.length && ((n = e.charCodeAt(t + 1)), n >= 56320 && n <= 57343)
            ? (r - 55296) * 1024 + n - 56320 + 65536
            : r;
    }
    function nd(e) {
        var t = /^\n* /;
        return t.test(e);
    }
    var id = 1,
        ms = 2,
        od = 3,
        sd = 4,
        or = 5;
    function Y_(e, t, r, n, i, o, s, a) {
        var l,
            h = 0,
            c = null,
            f = !1,
            m = !1,
            p = n !== -1,
            E = -1,
            _ = G_(Gr(e, 0)) && V_(Gr(e, e.length - 1));
        if (t || s)
            for (l = 0; l < e.length; h >= 65536 ? (l += 2) : l++) {
                if (((h = Gr(e, l)), !zr(h))) return or;
                (_ = _ && Wf(h, c, a)), (c = h);
            }
        else {
            for (l = 0; l < e.length; h >= 65536 ? (l += 2) : l++) {
                if (((h = Gr(e, l)), h === Vr)) (f = !0), p && ((m = m || (l - E - 1 > n && e[E + 1] !== " ")), (E = l));
                else if (!zr(h)) return or;
                (_ = _ && Wf(h, c, a)), (c = h);
            }
            m = m || (p && l - E - 1 > n && e[E + 1] !== " ");
        }
        return !f && !m
            ? _ && !s && !i(e)
                ? id
                : o === Yr
                ? or
                : ms
            : r > 9 && nd(e)
            ? or
            : s
            ? o === Yr
                ? or
                : ms
            : m
            ? sd
            : od;
    }
    function z_(e, t, r, n, i) {
        e.dump = (function () {
            if (t.length === 0) return e.quotingType === Yr ? '""' : "''";
            if (!e.noCompatMode && ($_.indexOf(t) !== -1 || k_.test(t)))
                return e.quotingType === Yr ? '"' + t + '"' : "'" + t + "'";
            var o = e.indent * Math.max(1, r),
                s = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - o),
                a = n || (e.flowLevel > -1 && r >= e.flowLevel);
            function l(h) {
                return W_(e, h);
            }
            switch (Y_(t, a, e.indent, s, l, e.quotingType, e.forceQuotes && !n, i)) {
                case id:
                    return t;
                case ms:
                    return "'" + t.replace(/'/g, "''") + "'";
                case od:
                    return "|" + Gf(t, e.indent) + Vf(Hf(t, o));
                case sd:
                    return ">" + Gf(t, e.indent) + Vf(Hf(X_(t, s), o));
                case or:
                    return '"' + K_(t, s) + '"';
                default:
                    throw new Xr("impossible error: invalid scalar style");
            }
        })();
    }
    function Gf(e, t) {
        var r = nd(e) ? String(t) : "",
            n = e[e.length - 1] === "\n",
            i = n && (e[e.length - 2] === "\n" || e === "\n"),
            o = i ? "+" : n ? "" : "-";
        return r + o + "\n";
    }
    function Vf(e) {
        return e[e.length - 1] === "\n" ? e.slice(0, -1) : e;
    }
    function X_(e, t) {
        for (
            var r = /(\n+)([^\n]*)/g,
                n = (function () {
                    var h = e.indexOf("\n");
                    return (h = h !== -1 ? h : e.length), (r.lastIndex = h), Yf(e.slice(0, h), t);
                })(),
                i = e[0] === "\n" || e[0] === " ",
                o,
                s;
            (s = r.exec(e));

        ) {
            var a = s[1],
                l = s[2];
            (o = l[0] === " "), (n += a + (!i && !o && l !== "" ? "\n" : "") + Yf(l, t)), (i = o);
        }
        return n;
    }
    function Yf(e, t) {
        if (e === "" || e[0] === " ") return e;
        for (var r = / [^ ]/g, n, i = 0, o, s = 0, a = 0, l = ""; (n = r.exec(e)); )
            (a = n.index), a - i > t && ((o = s > i ? s : a), (l += "\n" + e.slice(i, o)), (i = o + 1)), (s = a);
        return (
            (l += "\n"), e.length - i > t && s > i ? (l += e.slice(i, s) + "\n" + e.slice(s + 1)) : (l += e.slice(i)), l.slice(1)
        );
    }
    function K_(e) {
        for (var t = "", r = 0, n, i = 0; i < e.length; r >= 65536 ? (i += 2) : i++)
            (r = Gr(e, i)), (n = me[r]), !n && zr(r) ? ((t += e[i]), r >= 65536 && (t += e[i + 1])) : (t += n || B_(r));
        return t;
    }
    function J_(e, t, r) {
        var n = "",
            i = e.tag,
            o,
            s,
            a;
        for (o = 0, s = r.length; o < s; o += 1)
            (a = r[o]),
                e.replacer && (a = e.replacer.call(r, String(o), a)),
                (Ke(e, t, a, !1, !1) || (typeof a > "u" && Ke(e, t, null, !1, !1))) &&
                    (n !== "" && (n += "," + (e.condenseFlow ? "" : " ")), (n += e.dump));
        (e.tag = i), (e.dump = "[" + n + "]");
    }
    function zf(e, t, r, n) {
        var i = "",
            o = e.tag,
            s,
            a,
            l;
        for (s = 0, a = r.length; s < a; s += 1)
            (l = r[s]),
                e.replacer && (l = e.replacer.call(r, String(s), l)),
                (Ke(e, t + 1, l, !0, !0, !1, !0) || (typeof l > "u" && Ke(e, t + 1, null, !0, !0, !1, !0))) &&
                    ((!n || i !== "") && (i += ps(e, t)),
                    e.dump && Vr === e.dump.charCodeAt(0) ? (i += "-") : (i += "- "),
                    (i += e.dump));
        (e.tag = o), (e.dump = i || "[]");
    }
    function Q_(e, t, r) {
        var n = "",
            i = e.tag,
            o = Object.keys(r),
            s,
            a,
            l,
            h,
            c;
        for (s = 0, a = o.length; s < a; s += 1)
            (c = ""),
                n !== "" && (c += ", "),
                e.condenseFlow && (c += '"'),
                (l = o[s]),
                (h = r[l]),
                e.replacer && (h = e.replacer.call(r, l, h)),
                Ke(e, t, l, !1, !1) &&
                    (e.dump.length > 1024 && (c += "? "),
                    (c += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " ")),
                    Ke(e, t, h, !1, !1) && ((c += e.dump), (n += c)));
        (e.tag = i), (e.dump = "{" + n + "}");
    }
    function Z_(e, t, r, n) {
        var i = "",
            o = e.tag,
            s = Object.keys(r),
            a,
            l,
            h,
            c,
            f,
            m;
        if (e.sortKeys === !0) s.sort();
        else if (typeof e.sortKeys == "function") s.sort(e.sortKeys);
        else if (e.sortKeys) throw new Xr("sortKeys must be a boolean or a function");
        for (a = 0, l = s.length; a < l; a += 1)
            (m = ""),
                (!n || i !== "") && (m += ps(e, t)),
                (h = s[a]),
                (c = r[h]),
                e.replacer && (c = e.replacer.call(r, h, c)),
                Ke(e, t + 1, h, !0, !0, !0) &&
                    ((f = (e.tag !== null && e.tag !== "?") || (e.dump && e.dump.length > 1024)),
                    f && (e.dump && Vr === e.dump.charCodeAt(0) ? (m += "?") : (m += "? ")),
                    (m += e.dump),
                    f && (m += ps(e, t)),
                    Ke(e, t + 1, c, !0, f) &&
                        (e.dump && Vr === e.dump.charCodeAt(0) ? (m += ":") : (m += ": "), (m += e.dump), (i += m)));
        (e.tag = o), (e.dump = i || "{}");
    }
    function Xf(e, t, r) {
        var n, i, o, s, a, l;
        for (i = r ? e.explicitTypes : e.implicitTypes, o = 0, s = i.length; o < s; o += 1)
            if (
                ((a = i[o]),
                (a.instanceOf || a.predicate) &&
                    (!a.instanceOf || (typeof t == "object" && t instanceof a.instanceOf)) &&
                    (!a.predicate || a.predicate(t)))
            ) {
                if (
                    (r ? (a.multi && a.representName ? (e.tag = a.representName(t)) : (e.tag = a.tag)) : (e.tag = "?"),
                    a.represent)
                ) {
                    if (((l = e.styleMap[a.tag] || a.defaultStyle), Kf.call(a.represent) === "[object Function]"))
                        n = a.represent(t, l);
                    else if (Jf.call(a.represent, l)) n = a.represent[l](t, l);
                    else throw new Xr("!<" + a.tag + '> tag resolver accepts not "' + l + '" style');
                    e.dump = n;
                }
                return !0;
            }
        return !1;
    }
    function Ke(e, t, r, n, i, o, s) {
        (e.tag = null), (e.dump = r), Xf(e, r, !1) || Xf(e, r, !0);
        var a = Kf.call(e.dump),
            l = n,
            h;
        n && (n = e.flowLevel < 0 || e.flowLevel > t);
        var c = a === "[object Object]" || a === "[object Array]",
            f,
            m;
        if (
            (c && ((f = e.duplicates.indexOf(r)), (m = f !== -1)),
            ((e.tag !== null && e.tag !== "?") || m || (e.indent !== 2 && t > 0)) && (i = !1),
            m && e.usedDuplicates[f])
        )
            e.dump = "*ref_" + f;
        else {
            if ((c && m && !e.usedDuplicates[f] && (e.usedDuplicates[f] = !0), a === "[object Object]"))
                n && Object.keys(e.dump).length !== 0
                    ? (Z_(e, t, e.dump, i), m && (e.dump = "&ref_" + f + e.dump))
                    : (Q_(e, t, e.dump), m && (e.dump = "&ref_" + f + " " + e.dump));
            else if (a === "[object Array]")
                n && e.dump.length !== 0
                    ? (e.noArrayIndent && !s && t > 0 ? zf(e, t - 1, e.dump, i) : zf(e, t, e.dump, i),
                      m && (e.dump = "&ref_" + f + e.dump))
                    : (J_(e, t, e.dump), m && (e.dump = "&ref_" + f + " " + e.dump));
            else if (a === "[object String]") e.tag !== "?" && z_(e, e.dump, t, o, l);
            else {
                if (a === "[object Undefined]") return !1;
                if (e.skipInvalid) return !1;
                throw new Xr("unacceptable kind of an object to dump " + a);
            }
            e.tag !== null &&
                e.tag !== "?" &&
                ((h = encodeURI(e.tag[0] === "!" ? e.tag.slice(1) : e.tag).replace(/!/g, "%21")),
                e.tag[0] === "!"
                    ? (h = "!" + h)
                    : h.slice(0, 18) === "tag:yaml.org,2002:"
                    ? (h = "!!" + h.slice(18))
                    : (h = "!<" + h + ">"),
                (e.dump = h + " " + e.dump));
        }
        return !0;
    }
    function ev(e, t) {
        var r = [],
            n = [],
            i,
            o;
        for (gs(e, r, n), i = 0, o = n.length; i < o; i += 1) t.duplicates.push(r[n[i]]);
        t.usedDuplicates = new Array(o);
    }
    function gs(e, t, r) {
        var n, i, o;
        if (e !== null && typeof e == "object")
            if (((i = t.indexOf(e)), i !== -1)) r.indexOf(i) === -1 && r.push(i);
            else if ((t.push(e), Array.isArray(e))) for (i = 0, o = e.length; i < o; i += 1) gs(e[i], t, r);
            else for (n = Object.keys(e), i = 0, o = n.length; i < o; i += 1) gs(e[n[i]], t, r);
    }
    function tv(e, t) {
        t = t || {};
        var r = new j_(t);
        r.noRefs || ev(e, r);
        var n = e;
        return r.replacer && (n = r.replacer.call({ "": n }, "", n)), Ke(r, 0, n, !0, !0) ? r.dump + "\n" : "";
    }
    ad.exports.dump = tv;
});
var ai = g((CI, ve) => {
    "use strict";
    var ud = Bf(),
        rv = ld();
    function ys(e, t) {
        return function () {
            throw new Error(
                "Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default."
            );
        };
    }
    ve.exports.Type = pe();
    ve.exports.Schema = Go();
    ve.exports.FAILSAFE_SCHEMA = Xo();
    ve.exports.JSON_SCHEMA = es();
    ve.exports.CORE_SCHEMA = ts();
    ve.exports.DEFAULT_SCHEMA = Zn();
    ve.exports.load = ud.load;
    ve.exports.loadAll = ud.loadAll;
    ve.exports.dump = rv.dump;
    ve.exports.YAMLException = tr();
    ve.exports.types = {
        binary: os(),
        float: Zo(),
        map: zo(),
        null: Ko(),
        pairs: as(),
        set: ls(),
        timestamp: rs(),
        bool: Jo(),
        int: Qo(),
        merge: ns(),
        omap: ss(),
        seq: Yo(),
        str: Vo()
    };
    ve.exports.safeLoad = ys("safeLoad", "load");
    ve.exports.safeLoadAll = ys("safeLoadAll", "loadAll");
    ve.exports.safeDump = ys("safeDump", "dump");
});
var cd = g(li => {
    "use strict";
    Object.defineProperty(li, "__esModule", { value: !0 });
    li.Lazy = void 0;
    var Es = class {
        constructor(t) {
            (this._value = null), (this.creator = t);
        }
        get hasValue() {
            return this.creator == null;
        }
        get value() {
            if (this.creator == null) return this._value;
            let t = this.creator();
            return (this.value = t), t;
        }
        set value(t) {
            (this._value = t), (this.creator = null);
        }
    };
    li.Lazy = Es;
});
var Kr = g((bI, fd) => {
    var nv = "2.0.0",
        iv = Number.MAX_SAFE_INTEGER || 9007199254740991,
        ov = 16,
        sv = 250,
        av = ["major", "premajor", "minor", "preminor", "patch", "prepatch", "prerelease"];
    fd.exports = {
        MAX_LENGTH: 256,
        MAX_SAFE_COMPONENT_LENGTH: ov,
        MAX_SAFE_BUILD_LENGTH: sv,
        MAX_SAFE_INTEGER: iv,
        RELEASE_TYPES: av,
        SEMVER_SPEC_VERSION: nv,
        FLAG_INCLUDE_PRERELEASE: 1,
        FLAG_LOOSE: 2
    };
});
var Jr = g((OI, dd) => {
    var lv =
        typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG)
            ? (...e) => console.error("SEMVER", ...e)
            : () => {};
    dd.exports = lv;
});
var sr = g((Je, hd) => {
    var { MAX_SAFE_COMPONENT_LENGTH: _s, MAX_SAFE_BUILD_LENGTH: uv, MAX_LENGTH: cv } = Kr(),
        fv = Jr();
    Je = hd.exports = {};
    var dv = (Je.re = []),
        hv = (Je.safeRe = []),
        b = (Je.src = []),
        O = (Je.t = {}),
        pv = 0,
        vs = "[a-zA-Z0-9-]",
        mv = [
            ["\\s", 1],
            ["\\d", cv],
            [vs, uv]
        ],
        gv = e => {
            for (let [t, r] of mv)
                e = e
                    .split("".concat(t, "*"))
                    .join("".concat(t, "{0,").concat(r, "}"))
                    .split("".concat(t, "+"))
                    .join("".concat(t, "{1,").concat(r, "}"));
            return e;
        },
        q = (e, t, r) => {
            let n = gv(t),
                i = pv++;
            fv(e, i, t),
                (O[e] = i),
                (b[i] = t),
                (dv[i] = new RegExp(t, r ? "g" : void 0)),
                (hv[i] = new RegExp(n, r ? "g" : void 0));
        };
    q("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    q("NUMERICIDENTIFIERLOOSE", "\\d+");
    q("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-]".concat(vs, "*"));
    q(
        "MAINVERSION",
        "(".concat(b[O.NUMERICIDENTIFIER], ")\\.") +
            "(".concat(b[O.NUMERICIDENTIFIER], ")\\.") +
            "(".concat(b[O.NUMERICIDENTIFIER], ")")
    );
    q(
        "MAINVERSIONLOOSE",
        "(".concat(b[O.NUMERICIDENTIFIERLOOSE], ")\\.") +
            "(".concat(b[O.NUMERICIDENTIFIERLOOSE], ")\\.") +
            "(".concat(b[O.NUMERICIDENTIFIERLOOSE], ")")
    );
    q("PRERELEASEIDENTIFIER", "(?:".concat(b[O.NUMERICIDENTIFIER], "|").concat(b[O.NONNUMERICIDENTIFIER], ")"));
    q("PRERELEASEIDENTIFIERLOOSE", "(?:".concat(b[O.NUMERICIDENTIFIERLOOSE], "|").concat(b[O.NONNUMERICIDENTIFIER], ")"));
    q("PRERELEASE", "(?:-(".concat(b[O.PRERELEASEIDENTIFIER], "(?:\\.").concat(b[O.PRERELEASEIDENTIFIER], ")*))"));
    q(
        "PRERELEASELOOSE",
        "(?:-?(".concat(b[O.PRERELEASEIDENTIFIERLOOSE], "(?:\\.").concat(b[O.PRERELEASEIDENTIFIERLOOSE], ")*))")
    );
    q("BUILDIDENTIFIER", "".concat(vs, "+"));
    q("BUILD", "(?:\\+(".concat(b[O.BUILDIDENTIFIER], "(?:\\.").concat(b[O.BUILDIDENTIFIER], ")*))"));
    q("FULLPLAIN", "v?".concat(b[O.MAINVERSION]).concat(b[O.PRERELEASE], "?").concat(b[O.BUILD], "?"));
    q("FULL", "^".concat(b[O.FULLPLAIN], "$"));
    q("LOOSEPLAIN", "[v=\\s]*".concat(b[O.MAINVERSIONLOOSE]).concat(b[O.PRERELEASELOOSE], "?").concat(b[O.BUILD], "?"));
    q("LOOSE", "^".concat(b[O.LOOSEPLAIN], "$"));
    q("GTLT", "((?:<|>)?=?)");
    q("XRANGEIDENTIFIERLOOSE", "".concat(b[O.NUMERICIDENTIFIERLOOSE], "|x|X|\\*"));
    q("XRANGEIDENTIFIER", "".concat(b[O.NUMERICIDENTIFIER], "|x|X|\\*"));
    q(
        "XRANGEPLAIN",
        "[v=\\s]*(".concat(b[O.XRANGEIDENTIFIER], ")") +
            "(?:\\.(".concat(b[O.XRANGEIDENTIFIER], ")") +
            "(?:\\.(".concat(b[O.XRANGEIDENTIFIER], ")") +
            "(?:".concat(b[O.PRERELEASE], ")?").concat(b[O.BUILD], "?") +
            ")?)?"
    );
    q(
        "XRANGEPLAINLOOSE",
        "[v=\\s]*(".concat(b[O.XRANGEIDENTIFIERLOOSE], ")") +
            "(?:\\.(".concat(b[O.XRANGEIDENTIFIERLOOSE], ")") +
            "(?:\\.(".concat(b[O.XRANGEIDENTIFIERLOOSE], ")") +
            "(?:".concat(b[O.PRERELEASELOOSE], ")?").concat(b[O.BUILD], "?") +
            ")?)?"
    );
    q("XRANGE", "^".concat(b[O.GTLT], "\\s*").concat(b[O.XRANGEPLAIN], "$"));
    q("XRANGELOOSE", "^".concat(b[O.GTLT], "\\s*").concat(b[O.XRANGEPLAINLOOSE], "$"));
    q(
        "COERCEPLAIN",
        "(^|[^\\d])(\\d{1,".concat(_s, "})") + "(?:\\.(\\d{1,".concat(_s, "}))?") + "(?:\\.(\\d{1,".concat(_s, "}))?")
    );
    q("COERCE", "".concat(b[O.COERCEPLAIN], "(?:$|[^\\d])"));
    q("COERCEFULL", b[O.COERCEPLAIN] + "(?:".concat(b[O.PRERELEASE], ")?") + "(?:".concat(b[O.BUILD], ")?") + "(?:$|[^\\d])");
    q("COERCERTL", b[O.COERCE], !0);
    q("COERCERTLFULL", b[O.COERCEFULL], !0);
    q("LONETILDE", "(?:~>?)");
    q("TILDETRIM", "(\\s*)".concat(b[O.LONETILDE], "\\s+"), !0);
    Je.tildeTrimReplace = "$1~";
    q("TILDE", "^".concat(b[O.LONETILDE]).concat(b[O.XRANGEPLAIN], "$"));
    q("TILDELOOSE", "^".concat(b[O.LONETILDE]).concat(b[O.XRANGEPLAINLOOSE], "$"));
    q("LONECARET", "(?:\\^)");
    q("CARETTRIM", "(\\s*)".concat(b[O.LONECARET], "\\s+"), !0);
    Je.caretTrimReplace = "$1^";
    q("CARET", "^".concat(b[O.LONECARET]).concat(b[O.XRANGEPLAIN], "$"));
    q("CARETLOOSE", "^".concat(b[O.LONECARET]).concat(b[O.XRANGEPLAINLOOSE], "$"));
    q("COMPARATORLOOSE", "^".concat(b[O.GTLT], "\\s*(").concat(b[O.LOOSEPLAIN], ")$|^$"));
    q("COMPARATOR", "^".concat(b[O.GTLT], "\\s*(").concat(b[O.FULLPLAIN], ")$|^$"));
    q("COMPARATORTRIM", "(\\s*)".concat(b[O.GTLT], "\\s*(").concat(b[O.LOOSEPLAIN], "|").concat(b[O.XRANGEPLAIN], ")"), !0);
    Je.comparatorTrimReplace = "$1$2$3";
    q("HYPHENRANGE", "^\\s*(".concat(b[O.XRANGEPLAIN], ")") + "\\s+-\\s+" + "(".concat(b[O.XRANGEPLAIN], ")") + "\\s*$");
    q(
        "HYPHENRANGELOOSE",
        "^\\s*(".concat(b[O.XRANGEPLAINLOOSE], ")") + "\\s+-\\s+" + "(".concat(b[O.XRANGEPLAINLOOSE], ")") + "\\s*$"
    );
    q("STAR", "(<|>)?=?\\s*\\*");
    q("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    q("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
});
var ui = g((xI, pd) => {
    var wv = Object.freeze({ loose: !0 }),
        yv = Object.freeze({}),
        Ev = e => (e ? (typeof e != "object" ? wv : e) : yv);
    pd.exports = Ev;
});
var As = g((II, wd) => {
    var md = /^[0-9]+$/,
        gd = (e, t) => {
            let r = md.test(e),
                n = md.test(t);
            return r && n && ((e = +e), (t = +t)), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
        },
        _v = (e, t) => gd(t, e);
    wd.exports = { compareIdentifiers: gd, rcompareIdentifiers: _v };
});
var ge = g((NI, vd) => {
    var ci = Jr(),
        { MAX_LENGTH: yd, MAX_SAFE_INTEGER: fi } = Kr(),
        { safeRe: Ed, t: _d } = sr(),
        vv = ui(),
        { compareIdentifiers: ar } = As(),
        Ss = class e {
            constructor(t, r) {
                if (((r = vv(r)), t instanceof e)) {
                    if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease) return t;
                    t = t.version;
                } else if (typeof t != "string")
                    throw new TypeError('Invalid version. Must be a string. Got type "'.concat(typeof t, '".'));
                if (t.length > yd) throw new TypeError("version is longer than ".concat(yd, " characters"));
                ci("SemVer", t, r),
                    (this.options = r),
                    (this.loose = !!r.loose),
                    (this.includePrerelease = !!r.includePrerelease);
                let n = t.trim().match(r.loose ? Ed[_d.LOOSE] : Ed[_d.FULL]);
                if (!n) throw new TypeError("Invalid Version: ".concat(t));
                if (
                    ((this.raw = t),
                    (this.major = +n[1]),
                    (this.minor = +n[2]),
                    (this.patch = +n[3]),
                    this.major > fi || this.major < 0)
                )
                    throw new TypeError("Invalid major version");
                if (this.minor > fi || this.minor < 0) throw new TypeError("Invalid minor version");
                if (this.patch > fi || this.patch < 0) throw new TypeError("Invalid patch version");
                n[4]
                    ? (this.prerelease = n[4].split(".").map(i => {
                          if (/^[0-9]+$/.test(i)) {
                              let o = +i;
                              if (o >= 0 && o < fi) return o;
                          }
                          return i;
                      }))
                    : (this.prerelease = []),
                    (this.build = n[5] ? n[5].split(".") : []),
                    this.format();
            }
            format() {
                return (
                    (this.version = "".concat(this.major, ".").concat(this.minor, ".").concat(this.patch)),
                    this.prerelease.length && (this.version += "-".concat(this.prerelease.join("."))),
                    this.version
                );
            }
            toString() {
                return this.version;
            }
            compare(t) {
                if ((ci("SemVer.compare", this.version, this.options, t), !(t instanceof e))) {
                    if (typeof t == "string" && t === this.version) return 0;
                    t = new e(t, this.options);
                }
                return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
            }
            compareMain(t) {
                return (
                    t instanceof e || (t = new e(t, this.options)),
                    ar(this.major, t.major) || ar(this.minor, t.minor) || ar(this.patch, t.patch)
                );
            }
            comparePre(t) {
                if ((t instanceof e || (t = new e(t, this.options)), this.prerelease.length && !t.prerelease.length)) return -1;
                if (!this.prerelease.length && t.prerelease.length) return 1;
                if (!this.prerelease.length && !t.prerelease.length) return 0;
                let r = 0;
                do {
                    let n = this.prerelease[r],
                        i = t.prerelease[r];
                    if ((ci("prerelease compare", r, n, i), n === void 0 && i === void 0)) return 0;
                    if (i === void 0) return 1;
                    if (n === void 0) return -1;
                    if (n === i) continue;
                    return ar(n, i);
                } while (++r);
            }
            compareBuild(t) {
                t instanceof e || (t = new e(t, this.options));
                let r = 0;
                do {
                    let n = this.build[r],
                        i = t.build[r];
                    if ((ci("build compare", r, n, i), n === void 0 && i === void 0)) return 0;
                    if (i === void 0) return 1;
                    if (n === void 0) return -1;
                    if (n === i) continue;
                    return ar(n, i);
                } while (++r);
            }
            inc(t, r, n) {
                switch (t) {
                    case "premajor":
                        (this.prerelease.length = 0), (this.patch = 0), (this.minor = 0), this.major++, this.inc("pre", r, n);
                        break;
                    case "preminor":
                        (this.prerelease.length = 0), (this.patch = 0), this.minor++, this.inc("pre", r, n);
                        break;
                    case "prepatch":
                        (this.prerelease.length = 0), this.inc("patch", r, n), this.inc("pre", r, n);
                        break;
                    case "prerelease":
                        this.prerelease.length === 0 && this.inc("patch", r, n), this.inc("pre", r, n);
                        break;
                    case "major":
                        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++,
                            (this.minor = 0),
                            (this.patch = 0),
                            (this.prerelease = []);
                        break;
                    case "minor":
                        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++,
                            (this.patch = 0),
                            (this.prerelease = []);
                        break;
                    case "patch":
                        this.prerelease.length === 0 && this.patch++, (this.prerelease = []);
                        break;
                    case "pre": {
                        let i = Number(n) ? 1 : 0;
                        if (!r && n === !1) throw new Error("invalid increment argument: identifier is empty");
                        if (this.prerelease.length === 0) this.prerelease = [i];
                        else {
                            let o = this.prerelease.length;
                            for (; --o >= 0; ) typeof this.prerelease[o] == "number" && (this.prerelease[o]++, (o = -2));
                            if (o === -1) {
                                if (r === this.prerelease.join(".") && n === !1)
                                    throw new Error("invalid increment argument: identifier already exists");
                                this.prerelease.push(i);
                            }
                        }
                        if (r) {
                            let o = [r, i];
                            n === !1 && (o = [r]),
                                ar(this.prerelease[0], r) === 0
                                    ? isNaN(this.prerelease[1]) && (this.prerelease = o)
                                    : (this.prerelease = o);
                        }
                        break;
                    }
                    default:
                        throw new Error("invalid increment argument: ".concat(t));
                }
                return (this.raw = this.format()), this.build.length && (this.raw += "+".concat(this.build.join("."))), this;
            }
        };
    vd.exports = Ss;
});
var Rt = g((RI, Sd) => {
    var Ad = ge(),
        Av = (e, t, r = !1) => {
            if (e instanceof Ad) return e;
            try {
                return new Ad(e, t);
            } catch (n) {
                if (!r) return null;
                throw n;
            }
        };
    Sd.exports = Av;
});
var Td = g((PI, Cd) => {
    var Sv = Rt(),
        Cv = (e, t) => {
            let r = Sv(e, t);
            return r ? r.version : null;
        };
    Cd.exports = Cv;
});
var Od = g((DI, bd) => {
    var Tv = Rt(),
        bv = (e, t) => {
            let r = Tv(e.trim().replace(/^[=v]+/, ""), t);
            return r ? r.version : null;
        };
    bd.exports = bv;
});
var Nd = g((FI, Id) => {
    var xd = ge(),
        Ov = (e, t, r, n, i) => {
            typeof r == "string" && ((i = n), (n = r), (r = void 0));
            try {
                return new xd(e instanceof xd ? e.version : e, r).inc(t, n, i).version;
            } catch {
                return null;
            }
        };
    Id.exports = Ov;
});
var Dd = g((qI, Pd) => {
    var Rd = Rt(),
        xv = (e, t) => {
            let r = Rd(e, null, !0),
                n = Rd(t, null, !0),
                i = r.compare(n);
            if (i === 0) return null;
            let o = i > 0,
                s = o ? r : n,
                a = o ? n : r,
                l = !!s.prerelease.length;
            if (!!a.prerelease.length && !l)
                return !a.patch && !a.minor ? "major" : s.patch ? "patch" : s.minor ? "minor" : "major";
            let c = l ? "pre" : "";
            return r.major !== n.major
                ? c + "major"
                : r.minor !== n.minor
                ? c + "minor"
                : r.patch !== n.patch
                ? c + "patch"
                : "prerelease";
        };
    Pd.exports = xv;
});
var qd = g((LI, Fd) => {
    var Iv = ge(),
        Nv = (e, t) => new Iv(e, t).major;
    Fd.exports = Nv;
});
var Ud = g((UI, Ld) => {
    var Rv = ge(),
        Pv = (e, t) => new Rv(e, t).minor;
    Ld.exports = Pv;
});
var kd = g(($I, $d) => {
    var Dv = ge(),
        Fv = (e, t) => new Dv(e, t).patch;
    $d.exports = Fv;
});
var Bd = g((kI, Md) => {
    var qv = Rt(),
        Lv = (e, t) => {
            let r = qv(e, t);
            return r && r.prerelease.length ? r.prerelease : null;
        };
    Md.exports = Lv;
});
var qe = g((MI, jd) => {
    var Hd = ge(),
        Uv = (e, t, r) => new Hd(e, r).compare(new Hd(t, r));
    jd.exports = Uv;
});
var Gd = g((BI, Wd) => {
    var $v = qe(),
        kv = (e, t, r) => $v(t, e, r);
    Wd.exports = kv;
});
var Yd = g((HI, Vd) => {
    var Mv = qe(),
        Bv = (e, t) => Mv(e, t, !0);
    Vd.exports = Bv;
});
var di = g((jI, Xd) => {
    var zd = ge(),
        Hv = (e, t, r) => {
            let n = new zd(e, r),
                i = new zd(t, r);
            return n.compare(i) || n.compareBuild(i);
        };
    Xd.exports = Hv;
});
var Jd = g((WI, Kd) => {
    var jv = di(),
        Wv = (e, t) => e.sort((r, n) => jv(r, n, t));
    Kd.exports = Wv;
});
var Zd = g((GI, Qd) => {
    var Gv = di(),
        Vv = (e, t) => e.sort((r, n) => Gv(n, r, t));
    Qd.exports = Vv;
});
var Qr = g((VI, eh) => {
    var Yv = qe(),
        zv = (e, t, r) => Yv(e, t, r) > 0;
    eh.exports = zv;
});
var hi = g((YI, th) => {
    var Xv = qe(),
        Kv = (e, t, r) => Xv(e, t, r) < 0;
    th.exports = Kv;
});
var Cs = g((zI, rh) => {
    var Jv = qe(),
        Qv = (e, t, r) => Jv(e, t, r) === 0;
    rh.exports = Qv;
});
var Ts = g((XI, nh) => {
    var Zv = qe(),
        eA = (e, t, r) => Zv(e, t, r) !== 0;
    nh.exports = eA;
});
var pi = g((KI, ih) => {
    var tA = qe(),
        rA = (e, t, r) => tA(e, t, r) >= 0;
    ih.exports = rA;
});
var mi = g((JI, oh) => {
    var nA = qe(),
        iA = (e, t, r) => nA(e, t, r) <= 0;
    oh.exports = iA;
});
var bs = g((QI, sh) => {
    var oA = Cs(),
        sA = Ts(),
        aA = Qr(),
        lA = pi(),
        uA = hi(),
        cA = mi(),
        fA = (e, t, r, n) => {
            switch (t) {
                case "===":
                    return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
                case "!==":
                    return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
                case "":
                case "=":
                case "==":
                    return oA(e, r, n);
                case "!=":
                    return sA(e, r, n);
                case ">":
                    return aA(e, r, n);
                case ">=":
                    return lA(e, r, n);
                case "<":
                    return uA(e, r, n);
                case "<=":
                    return cA(e, r, n);
                default:
                    throw new TypeError("Invalid operator: ".concat(t));
            }
        };
    sh.exports = fA;
});
var lh = g((ZI, ah) => {
    var dA = ge(),
        hA = Rt(),
        { safeRe: gi, t: wi } = sr(),
        pA = (e, t) => {
            if (e instanceof dA) return e;
            if ((typeof e == "number" && (e = String(e)), typeof e != "string")) return null;
            t = t || {};
            let r = null;
            if (!t.rtl) r = e.match(t.includePrerelease ? gi[wi.COERCEFULL] : gi[wi.COERCE]);
            else {
                let l = t.includePrerelease ? gi[wi.COERCERTLFULL] : gi[wi.COERCERTL],
                    h;
                for (; (h = l.exec(e)) && (!r || r.index + r[0].length !== e.length); )
                    (!r || h.index + h[0].length !== r.index + r[0].length) && (r = h),
                        (l.lastIndex = h.index + h[1].length + h[2].length);
                l.lastIndex = -1;
            }
            if (r === null) return null;
            let n = r[2],
                i = r[3] || "0",
                o = r[4] || "0",
                s = t.includePrerelease && r[5] ? "-".concat(r[5]) : "",
                a = t.includePrerelease && r[6] ? "+".concat(r[6]) : "";
            return hA("".concat(n, ".").concat(i, ".").concat(o).concat(s).concat(a), t);
        };
    ah.exports = pA;
});
var ch = g((eN, uh) => {
    var Os = class {
        constructor() {
            (this.max = 1e3), (this.map = new Map());
        }
        get(t) {
            let r = this.map.get(t);
            if (r !== void 0) return this.map.delete(t), this.map.set(t, r), r;
        }
        delete(t) {
            return this.map.delete(t);
        }
        set(t, r) {
            if (!this.delete(t) && r !== void 0) {
                if (this.map.size >= this.max) {
                    let i = this.map.keys().next().value;
                    this.delete(i);
                }
                this.map.set(t, r);
            }
            return this;
        }
    };
    uh.exports = Os;
});
var Le = g((tN, ph) => {
    var mA = /\s+/g,
        xs = class e {
            constructor(t, r) {
                if (((r = wA(r)), t instanceof e))
                    return t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease ? t : new e(t.raw, r);
                if (t instanceof Is) return (this.raw = t.value), (this.set = [[t]]), (this.formatted = void 0), this;
                if (
                    ((this.options = r),
                    (this.loose = !!r.loose),
                    (this.includePrerelease = !!r.includePrerelease),
                    (this.raw = t.trim().replace(mA, " ")),
                    (this.set = this.raw
                        .split("||")
                        .map(n => this.parseRange(n.trim()))
                        .filter(n => n.length)),
                    !this.set.length)
                )
                    throw new TypeError("Invalid SemVer Range: ".concat(this.raw));
                if (this.set.length > 1) {
                    let n = this.set[0];
                    if (((this.set = this.set.filter(i => !dh(i[0]))), this.set.length === 0)) this.set = [n];
                    else if (this.set.length > 1) {
                        for (let i of this.set)
                            if (i.length === 1 && CA(i[0])) {
                                this.set = [i];
                                break;
                            }
                    }
                }
                this.formatted = void 0;
            }
            get range() {
                if (this.formatted === void 0) {
                    this.formatted = "";
                    for (let t = 0; t < this.set.length; t++) {
                        t > 0 && (this.formatted += "||");
                        let r = this.set[t];
                        for (let n = 0; n < r.length; n++)
                            n > 0 && (this.formatted += " "), (this.formatted += r[n].toString().trim());
                    }
                }
                return this.formatted;
            }
            format() {
                return this.range;
            }
            toString() {
                return this.range;
            }
            parseRange(t) {
                let n = ((this.options.includePrerelease && AA) | (this.options.loose && SA)) + ":" + t,
                    i = fh.get(n);
                if (i) return i;
                let o = this.options.loose,
                    s = o ? Re[Ae.HYPHENRANGELOOSE] : Re[Ae.HYPHENRANGE];
                (t = t.replace(s, FA(this.options.includePrerelease))),
                    Y("hyphen replace", t),
                    (t = t.replace(Re[Ae.COMPARATORTRIM], EA)),
                    Y("comparator trim", t),
                    (t = t.replace(Re[Ae.TILDETRIM], _A)),
                    Y("tilde trim", t),
                    (t = t.replace(Re[Ae.CARETTRIM], vA)),
                    Y("caret trim", t);
                let a = t
                    .split(" ")
                    .map(f => TA(f, this.options))
                    .join(" ")
                    .split(/\s+/)
                    .map(f => DA(f, this.options));
                o && (a = a.filter(f => (Y("loose invalid filter", f, this.options), !!f.match(Re[Ae.COMPARATORLOOSE])))),
                    Y("range list", a);
                let l = new Map(),
                    h = a.map(f => new Is(f, this.options));
                for (let f of h) {
                    if (dh(f)) return [f];
                    l.set(f.value, f);
                }
                l.size > 1 && l.has("") && l.delete("");
                let c = [...l.values()];
                return fh.set(n, c), c;
            }
            intersects(t, r) {
                if (!(t instanceof e)) throw new TypeError("a Range is required");
                return this.set.some(
                    n => hh(n, r) && t.set.some(i => hh(i, r) && n.every(o => i.every(s => o.intersects(s, r))))
                );
            }
            test(t) {
                if (!t) return !1;
                if (typeof t == "string")
                    try {
                        t = new yA(t, this.options);
                    } catch {
                        return !1;
                    }
                for (let r = 0; r < this.set.length; r++) if (qA(this.set[r], t, this.options)) return !0;
                return !1;
            }
        };
    ph.exports = xs;
    var gA = ch(),
        fh = new gA(),
        wA = ui(),
        Is = Zr(),
        Y = Jr(),
        yA = ge(),
        { safeRe: Re, t: Ae, comparatorTrimReplace: EA, tildeTrimReplace: _A, caretTrimReplace: vA } = sr(),
        { FLAG_INCLUDE_PRERELEASE: AA, FLAG_LOOSE: SA } = Kr(),
        dh = e => e.value === "<0.0.0-0",
        CA = e => e.value === "",
        hh = (e, t) => {
            let r = !0,
                n = e.slice(),
                i = n.pop();
            for (; r && n.length; ) (r = n.every(o => i.intersects(o, t))), (i = n.pop());
            return r;
        },
        TA = (e, t) => (
            Y("comp", e, t),
            (e = xA(e, t)),
            Y("caret", e),
            (e = bA(e, t)),
            Y("tildes", e),
            (e = NA(e, t)),
            Y("xrange", e),
            (e = PA(e, t)),
            Y("stars", e),
            e
        ),
        Se = e => !e || e.toLowerCase() === "x" || e === "*",
        bA = (e, t) =>
            e
                .trim()
                .split(/\s+/)
                .map(r => OA(r, t))
                .join(" "),
        OA = (e, t) => {
            let r = t.loose ? Re[Ae.TILDELOOSE] : Re[Ae.TILDE];
            return e.replace(r, (n, i, o, s, a) => {
                Y("tilde", e, n, i, o, s, a);
                let l;
                return (
                    Se(i)
                        ? (l = "")
                        : Se(o)
                        ? (l = ">=".concat(i, ".0.0 <").concat(+i + 1, ".0.0-0"))
                        : Se(s)
                        ? (l = ">="
                              .concat(i, ".")
                              .concat(o, ".0 <")
                              .concat(i, ".")
                              .concat(+o + 1, ".0-0"))
                        : a
                        ? (Y("replaceTilde pr", a),
                          (l = ">="
                              .concat(i, ".")
                              .concat(o, ".")
                              .concat(s, "-")
                              .concat(a, " <")
                              .concat(i, ".")
                              .concat(+o + 1, ".0-0")))
                        : (l = ">="
                              .concat(i, ".")
                              .concat(o, ".")
                              .concat(s, " <")
                              .concat(i, ".")
                              .concat(+o + 1, ".0-0")),
                    Y("tilde return", l),
                    l
                );
            });
        },
        xA = (e, t) =>
            e
                .trim()
                .split(/\s+/)
                .map(r => IA(r, t))
                .join(" "),
        IA = (e, t) => {
            Y("caret", e, t);
            let r = t.loose ? Re[Ae.CARETLOOSE] : Re[Ae.CARET],
                n = t.includePrerelease ? "-0" : "";
            return e.replace(r, (i, o, s, a, l) => {
                Y("caret", e, i, o, s, a, l);
                let h;
                return (
                    Se(o)
                        ? (h = "")
                        : Se(s)
                        ? (h = ">="
                              .concat(o, ".0.0")
                              .concat(n, " <")
                              .concat(+o + 1, ".0.0-0"))
                        : Se(a)
                        ? o === "0"
                            ? (h = ">="
                                  .concat(o, ".")
                                  .concat(s, ".0")
                                  .concat(n, " <")
                                  .concat(o, ".")
                                  .concat(+s + 1, ".0-0"))
                            : (h = ">="
                                  .concat(o, ".")
                                  .concat(s, ".0")
                                  .concat(n, " <")
                                  .concat(+o + 1, ".0.0-0"))
                        : l
                        ? (Y("replaceCaret pr", l),
                          o === "0"
                              ? s === "0"
                                  ? (h = ">="
                                        .concat(o, ".")
                                        .concat(s, ".")
                                        .concat(a, "-")
                                        .concat(l, " <")
                                        .concat(o, ".")
                                        .concat(s, ".")
                                        .concat(+a + 1, "-0"))
                                  : (h = ">="
                                        .concat(o, ".")
                                        .concat(s, ".")
                                        .concat(a, "-")
                                        .concat(l, " <")
                                        .concat(o, ".")
                                        .concat(+s + 1, ".0-0"))
                              : (h = ">="
                                    .concat(o, ".")
                                    .concat(s, ".")
                                    .concat(a, "-")
                                    .concat(l, " <")
                                    .concat(+o + 1, ".0.0-0")))
                        : (Y("no pr"),
                          o === "0"
                              ? s === "0"
                                  ? (h = ">="
                                        .concat(o, ".")
                                        .concat(s, ".")
                                        .concat(a)
                                        .concat(n, " <")
                                        .concat(o, ".")
                                        .concat(s, ".")
                                        .concat(+a + 1, "-0"))
                                  : (h = ">="
                                        .concat(o, ".")
                                        .concat(s, ".")
                                        .concat(a)
                                        .concat(n, " <")
                                        .concat(o, ".")
                                        .concat(+s + 1, ".0-0"))
                              : (h = ">="
                                    .concat(o, ".")
                                    .concat(s, ".")
                                    .concat(a, " <")
                                    .concat(+o + 1, ".0.0-0"))),
                    Y("caret return", h),
                    h
                );
            });
        },
        NA = (e, t) => (
            Y("replaceXRanges", e, t),
            e
                .split(/\s+/)
                .map(r => RA(r, t))
                .join(" ")
        ),
        RA = (e, t) => {
            e = e.trim();
            let r = t.loose ? Re[Ae.XRANGELOOSE] : Re[Ae.XRANGE];
            return e.replace(r, (n, i, o, s, a, l) => {
                Y("xRange", e, n, i, o, s, a, l);
                let h = Se(o),
                    c = h || Se(s),
                    f = c || Se(a),
                    m = f;
                return (
                    i === "=" && m && (i = ""),
                    (l = t.includePrerelease ? "-0" : ""),
                    h
                        ? i === ">" || i === "<"
                            ? (n = "<0.0.0-0")
                            : (n = "*")
                        : i && m
                        ? (c && (s = 0),
                          (a = 0),
                          i === ">"
                              ? ((i = ">="), c ? ((o = +o + 1), (s = 0), (a = 0)) : ((s = +s + 1), (a = 0)))
                              : i === "<=" && ((i = "<"), c ? (o = +o + 1) : (s = +s + 1)),
                          i === "<" && (l = "-0"),
                          (n = ""
                              .concat(i + o, ".")
                              .concat(s, ".")
                              .concat(a)
                              .concat(l)))
                        : c
                        ? (n = ">="
                              .concat(o, ".0.0")
                              .concat(l, " <")
                              .concat(+o + 1, ".0.0-0"))
                        : f &&
                          (n = ">="
                              .concat(o, ".")
                              .concat(s, ".0")
                              .concat(l, " <")
                              .concat(o, ".")
                              .concat(+s + 1, ".0-0")),
                    Y("xRange return", n),
                    n
                );
            });
        },
        PA = (e, t) => (Y("replaceStars", e, t), e.trim().replace(Re[Ae.STAR], "")),
        DA = (e, t) => (Y("replaceGTE0", e, t), e.trim().replace(Re[t.includePrerelease ? Ae.GTE0PRE : Ae.GTE0], "")),
        FA = e => (t, r, n, i, o, s, a, l, h, c, f, m) => (
            Se(n)
                ? (r = "")
                : Se(i)
                ? (r = ">=".concat(n, ".0.0").concat(e ? "-0" : ""))
                : Se(o)
                ? (r = ">="
                      .concat(n, ".")
                      .concat(i, ".0")
                      .concat(e ? "-0" : ""))
                : s
                ? (r = ">=".concat(r))
                : (r = ">=".concat(r).concat(e ? "-0" : "")),
            Se(h)
                ? (l = "")
                : Se(c)
                ? (l = "<".concat(+h + 1, ".0.0-0"))
                : Se(f)
                ? (l = "<".concat(h, ".").concat(+c + 1, ".0-0"))
                : m
                ? (l = "<=".concat(h, ".").concat(c, ".").concat(f, "-").concat(m))
                : e
                ? (l = "<"
                      .concat(h, ".")
                      .concat(c, ".")
                      .concat(+f + 1, "-0"))
                : (l = "<=".concat(l)),
            "".concat(r, " ").concat(l).trim()
        ),
        qA = (e, t, r) => {
            for (let n = 0; n < e.length; n++) if (!e[n].test(t)) return !1;
            if (t.prerelease.length && !r.includePrerelease) {
                for (let n = 0; n < e.length; n++)
                    if ((Y(e[n].semver), e[n].semver !== Is.ANY && e[n].semver.prerelease.length > 0)) {
                        let i = e[n].semver;
                        if (i.major === t.major && i.minor === t.minor && i.patch === t.patch) return !0;
                    }
                return !1;
            }
            return !0;
        };
});
var Zr = g((rN, _h) => {
    var en = Symbol("SemVer ANY"),
        Ps = class e {
            static get ANY() {
                return en;
            }
            constructor(t, r) {
                if (((r = mh(r)), t instanceof e)) {
                    if (t.loose === !!r.loose) return t;
                    t = t.value;
                }
                (t = t.trim().split(/\s+/).join(" ")),
                    Rs("comparator", t, r),
                    (this.options = r),
                    (this.loose = !!r.loose),
                    this.parse(t),
                    this.semver === en ? (this.value = "") : (this.value = this.operator + this.semver.version),
                    Rs("comp", this);
            }
            parse(t) {
                let r = this.options.loose ? gh[wh.COMPARATORLOOSE] : gh[wh.COMPARATOR],
                    n = t.match(r);
                if (!n) throw new TypeError("Invalid comparator: ".concat(t));
                (this.operator = n[1] !== void 0 ? n[1] : ""),
                    this.operator === "=" && (this.operator = ""),
                    n[2] ? (this.semver = new yh(n[2], this.options.loose)) : (this.semver = en);
            }
            toString() {
                return this.value;
            }
            test(t) {
                if ((Rs("Comparator.test", t, this.options.loose), this.semver === en || t === en)) return !0;
                if (typeof t == "string")
                    try {
                        t = new yh(t, this.options);
                    } catch {
                        return !1;
                    }
                return Ns(t, this.operator, this.semver, this.options);
            }
            intersects(t, r) {
                if (!(t instanceof e)) throw new TypeError("a Comparator is required");
                return this.operator === ""
                    ? this.value === ""
                        ? !0
                        : new Eh(t.value, r).test(this.value)
                    : t.operator === ""
                    ? t.value === ""
                        ? !0
                        : new Eh(this.value, r).test(t.semver)
                    : ((r = mh(r)),
                      (r.includePrerelease && (this.value === "<0.0.0-0" || t.value === "<0.0.0-0")) ||
                      (!r.includePrerelease && (this.value.startsWith("<0.0.0") || t.value.startsWith("<0.0.0")))
                          ? !1
                          : !!(
                                (this.operator.startsWith(">") && t.operator.startsWith(">")) ||
                                (this.operator.startsWith("<") && t.operator.startsWith("<")) ||
                                (this.semver.version === t.semver.version &&
                                    this.operator.includes("=") &&
                                    t.operator.includes("=")) ||
                                (Ns(this.semver, "<", t.semver, r) &&
                                    this.operator.startsWith(">") &&
                                    t.operator.startsWith("<")) ||
                                (Ns(this.semver, ">", t.semver, r) && this.operator.startsWith("<") && t.operator.startsWith(">"))
                            ));
            }
        };
    _h.exports = Ps;
    var mh = ui(),
        { safeRe: gh, t: wh } = sr(),
        Ns = bs(),
        Rs = Jr(),
        yh = ge(),
        Eh = Le();
});
var tn = g((nN, vh) => {
    var LA = Le(),
        UA = (e, t, r) => {
            try {
                t = new LA(t, r);
            } catch {
                return !1;
            }
            return t.test(e);
        };
    vh.exports = UA;
});
var Sh = g((iN, Ah) => {
    var $A = Le(),
        kA = (e, t) =>
            new $A(e, t).set.map(r =>
                r
                    .map(n => n.value)
                    .join(" ")
                    .trim()
                    .split(" ")
            );
    Ah.exports = kA;
});
var Th = g((oN, Ch) => {
    var MA = ge(),
        BA = Le(),
        HA = (e, t, r) => {
            let n = null,
                i = null,
                o = null;
            try {
                o = new BA(t, r);
            } catch {
                return null;
            }
            return (
                e.forEach(s => {
                    o.test(s) && (!n || i.compare(s) === -1) && ((n = s), (i = new MA(n, r)));
                }),
                n
            );
        };
    Ch.exports = HA;
});
var Oh = g((sN, bh) => {
    var jA = ge(),
        WA = Le(),
        GA = (e, t, r) => {
            let n = null,
                i = null,
                o = null;
            try {
                o = new WA(t, r);
            } catch {
                return null;
            }
            return (
                e.forEach(s => {
                    o.test(s) && (!n || i.compare(s) === 1) && ((n = s), (i = new jA(n, r)));
                }),
                n
            );
        };
    bh.exports = GA;
});
var Nh = g((aN, Ih) => {
    var Ds = ge(),
        VA = Le(),
        xh = Qr(),
        YA = (e, t) => {
            e = new VA(e, t);
            let r = new Ds("0.0.0");
            if (e.test(r) || ((r = new Ds("0.0.0-0")), e.test(r))) return r;
            r = null;
            for (let n = 0; n < e.set.length; ++n) {
                let i = e.set[n],
                    o = null;
                i.forEach(s => {
                    let a = new Ds(s.semver.version);
                    switch (s.operator) {
                        case ">":
                            a.prerelease.length === 0 ? a.patch++ : a.prerelease.push(0), (a.raw = a.format());
                        case "":
                        case ">=":
                            (!o || xh(a, o)) && (o = a);
                            break;
                        case "<":
                        case "<=":
                            break;
                        default:
                            throw new Error("Unexpected operation: ".concat(s.operator));
                    }
                }),
                    o && (!r || xh(r, o)) && (r = o);
            }
            return r && e.test(r) ? r : null;
        };
    Ih.exports = YA;
});
var Ph = g((lN, Rh) => {
    var zA = Le(),
        XA = (e, t) => {
            try {
                return new zA(e, t).range || "*";
            } catch {
                return null;
            }
        };
    Rh.exports = XA;
});
var yi = g((uN, Lh) => {
    var KA = ge(),
        qh = Zr(),
        { ANY: JA } = qh,
        QA = Le(),
        ZA = tn(),
        Dh = Qr(),
        Fh = hi(),
        eS = mi(),
        tS = pi(),
        rS = (e, t, r, n) => {
            (e = new KA(e, n)), (t = new QA(t, n));
            let i, o, s, a, l;
            switch (r) {
                case ">":
                    (i = Dh), (o = eS), (s = Fh), (a = ">"), (l = ">=");
                    break;
                case "<":
                    (i = Fh), (o = tS), (s = Dh), (a = "<"), (l = "<=");
                    break;
                default:
                    throw new TypeError('Must provide a hilo val of "<" or ">"');
            }
            if (ZA(e, t, n)) return !1;
            for (let h = 0; h < t.set.length; ++h) {
                let c = t.set[h],
                    f = null,
                    m = null;
                if (
                    (c.forEach(p => {
                        p.semver === JA && (p = new qh(">=0.0.0")),
                            (f = f || p),
                            (m = m || p),
                            i(p.semver, f.semver, n) ? (f = p) : s(p.semver, m.semver, n) && (m = p);
                    }),
                    f.operator === a || f.operator === l || ((!m.operator || m.operator === a) && o(e, m.semver)))
                )
                    return !1;
                if (m.operator === l && s(e, m.semver)) return !1;
            }
            return !0;
        };
    Lh.exports = rS;
});
var $h = g((cN, Uh) => {
    var nS = yi(),
        iS = (e, t, r) => nS(e, t, ">", r);
    Uh.exports = iS;
});
var Mh = g((fN, kh) => {
    var oS = yi(),
        sS = (e, t, r) => oS(e, t, "<", r);
    kh.exports = sS;
});
var jh = g((dN, Hh) => {
    var Bh = Le(),
        aS = (e, t, r) => ((e = new Bh(e, r)), (t = new Bh(t, r)), e.intersects(t, r));
    Hh.exports = aS;
});
var Gh = g((hN, Wh) => {
    var lS = tn(),
        uS = qe();
    Wh.exports = (e, t, r) => {
        let n = [],
            i = null,
            o = null,
            s = e.sort((c, f) => uS(c, f, r));
        for (let c of s) lS(c, t, r) ? ((o = c), i || (i = c)) : (o && n.push([i, o]), (o = null), (i = null));
        i && n.push([i, null]);
        let a = [];
        for (let [c, f] of n)
            c === f
                ? a.push(c)
                : !f && c === s[0]
                ? a.push("*")
                : f
                ? c === s[0]
                    ? a.push("<=".concat(f))
                    : a.push("".concat(c, " - ").concat(f))
                : a.push(">=".concat(c));
        let l = a.join(" || "),
            h = typeof t.raw == "string" ? t.raw : String(t);
        return l.length < h.length ? l : t;
    };
});
var Jh = g((pN, Kh) => {
    var Vh = Le(),
        qs = Zr(),
        { ANY: Fs } = qs,
        rn = tn(),
        Ls = qe(),
        cS = (e, t, r = {}) => {
            if (e === t) return !0;
            (e = new Vh(e, r)), (t = new Vh(t, r));
            let n = !1;
            e: for (let i of e.set) {
                for (let o of t.set) {
                    let s = dS(i, o, r);
                    if (((n = n || s !== null), s)) continue e;
                }
                if (n) return !1;
            }
            return !0;
        },
        fS = [new qs(">=0.0.0-0")],
        Yh = [new qs(">=0.0.0")],
        dS = (e, t, r) => {
            if (e === t) return !0;
            if (e.length === 1 && e[0].semver === Fs) {
                if (t.length === 1 && t[0].semver === Fs) return !0;
                r.includePrerelease ? (e = fS) : (e = Yh);
            }
            if (t.length === 1 && t[0].semver === Fs) {
                if (r.includePrerelease) return !0;
                t = Yh;
            }
            let n = new Set(),
                i,
                o;
            for (let p of e)
                p.operator === ">" || p.operator === ">="
                    ? (i = zh(i, p, r))
                    : p.operator === "<" || p.operator === "<="
                    ? (o = Xh(o, p, r))
                    : n.add(p.semver);
            if (n.size > 1) return null;
            let s;
            if (i && o) {
                if (((s = Ls(i.semver, o.semver, r)), s > 0)) return null;
                if (s === 0 && (i.operator !== ">=" || o.operator !== "<=")) return null;
            }
            for (let p of n) {
                if ((i && !rn(p, String(i), r)) || (o && !rn(p, String(o), r))) return null;
                for (let E of t) if (!rn(p, String(E), r)) return !1;
                return !0;
            }
            let a,
                l,
                h,
                c,
                f = o && !r.includePrerelease && o.semver.prerelease.length ? o.semver : !1,
                m = i && !r.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
            f && f.prerelease.length === 1 && o.operator === "<" && f.prerelease[0] === 0 && (f = !1);
            for (let p of t) {
                if (
                    ((c = c || p.operator === ">" || p.operator === ">="),
                    (h = h || p.operator === "<" || p.operator === "<="),
                    i)
                ) {
                    if (
                        (m &&
                            p.semver.prerelease &&
                            p.semver.prerelease.length &&
                            p.semver.major === m.major &&
                            p.semver.minor === m.minor &&
                            p.semver.patch === m.patch &&
                            (m = !1),
                        p.operator === ">" || p.operator === ">=")
                    ) {
                        if (((a = zh(i, p, r)), a === p && a !== i)) return !1;
                    } else if (i.operator === ">=" && !rn(i.semver, String(p), r)) return !1;
                }
                if (o) {
                    if (
                        (f &&
                            p.semver.prerelease &&
                            p.semver.prerelease.length &&
                            p.semver.major === f.major &&
                            p.semver.minor === f.minor &&
                            p.semver.patch === f.patch &&
                            (f = !1),
                        p.operator === "<" || p.operator === "<=")
                    ) {
                        if (((l = Xh(o, p, r)), l === p && l !== o)) return !1;
                    } else if (o.operator === "<=" && !rn(o.semver, String(p), r)) return !1;
                }
                if (!p.operator && (o || i) && s !== 0) return !1;
            }
            return !((i && h && !o && s !== 0) || (o && c && !i && s !== 0) || m || f);
        },
        zh = (e, t, r) => {
            if (!e) return t;
            let n = Ls(e.semver, t.semver, r);
            return n > 0 ? e : n < 0 || (t.operator === ">" && e.operator === ">=") ? t : e;
        },
        Xh = (e, t, r) => {
            if (!e) return t;
            let n = Ls(e.semver, t.semver, r);
            return n < 0 ? e : n > 0 || (t.operator === "<" && e.operator === "<=") ? t : e;
        };
    Kh.exports = cS;
});
var $s = g((mN, ep) => {
    var Us = sr(),
        Qh = Kr(),
        hS = ge(),
        Zh = As(),
        pS = Rt(),
        mS = Td(),
        gS = Od(),
        wS = Nd(),
        yS = Dd(),
        ES = qd(),
        _S = Ud(),
        vS = kd(),
        AS = Bd(),
        SS = qe(),
        CS = Gd(),
        TS = Yd(),
        bS = di(),
        OS = Jd(),
        xS = Zd(),
        IS = Qr(),
        NS = hi(),
        RS = Cs(),
        PS = Ts(),
        DS = pi(),
        FS = mi(),
        qS = bs(),
        LS = lh(),
        US = Zr(),
        $S = Le(),
        kS = tn(),
        MS = Sh(),
        BS = Th(),
        HS = Oh(),
        jS = Nh(),
        WS = Ph(),
        GS = yi(),
        VS = $h(),
        YS = Mh(),
        zS = jh(),
        XS = Gh(),
        KS = Jh();
    ep.exports = {
        parse: pS,
        valid: mS,
        clean: gS,
        inc: wS,
        diff: yS,
        major: ES,
        minor: _S,
        patch: vS,
        prerelease: AS,
        compare: SS,
        rcompare: CS,
        compareLoose: TS,
        compareBuild: bS,
        sort: OS,
        rsort: xS,
        gt: IS,
        lt: NS,
        eq: RS,
        neq: PS,
        gte: DS,
        lte: FS,
        cmp: qS,
        coerce: LS,
        Comparator: US,
        Range: $S,
        satisfies: kS,
        toComparators: MS,
        maxSatisfying: BS,
        minSatisfying: HS,
        minVersion: jS,
        validRange: WS,
        outside: GS,
        gtr: VS,
        ltr: YS,
        intersects: zS,
        simplifyRange: XS,
        subset: KS,
        SemVer: hS,
        re: Us.re,
        src: Us.src,
        tokens: Us.t,
        SEMVER_SPEC_VERSION: Qh.SEMVER_SPEC_VERSION,
        RELEASE_TYPES: Qh.RELEASE_TYPES,
        compareIdentifiers: Zh.compareIdentifiers,
        rcompareIdentifiers: Zh.rcompareIdentifiers
    };
});
var qp = g((nn, ur) => {
    var JS = 200,
        Xs = "__lodash_hash_undefined__",
        bi = 1,
        dp = 2,
        hp = 9007199254740991,
        Ei = "[object Arguments]",
        Hs = "[object Array]",
        QS = "[object AsyncFunction]",
        pp = "[object Boolean]",
        mp = "[object Date]",
        gp = "[object Error]",
        wp = "[object Function]",
        ZS = "[object GeneratorFunction]",
        _i = "[object Map]",
        yp = "[object Number]",
        eC = "[object Null]",
        lr = "[object Object]",
        tp = "[object Promise]",
        tC = "[object Proxy]",
        Ep = "[object RegExp]",
        vi = "[object Set]",
        _p = "[object String]",
        rC = "[object Symbol]",
        nC = "[object Undefined]",
        js = "[object WeakMap]",
        vp = "[object ArrayBuffer]",
        Ai = "[object DataView]",
        iC = "[object Float32Array]",
        oC = "[object Float64Array]",
        sC = "[object Int8Array]",
        aC = "[object Int16Array]",
        lC = "[object Int32Array]",
        uC = "[object Uint8Array]",
        cC = "[object Uint8ClampedArray]",
        fC = "[object Uint16Array]",
        dC = "[object Uint32Array]",
        hC = /[\\^$.*+?()[\]{}|]/g,
        pC = /^\[object .+?Constructor\]$/,
        mC = /^(?:0|[1-9]\d*)$/,
        z = {};
    z[iC] = z[oC] = z[sC] = z[aC] = z[lC] = z[uC] = z[cC] = z[fC] = z[dC] = !0;
    z[Ei] = z[Hs] = z[vp] = z[pp] = z[Ai] = z[mp] = z[gp] = z[wp] = z[_i] = z[yp] = z[lr] = z[Ep] = z[vi] = z[_p] = z[js] = !1;
    var Ap = typeof global == "object" && global && global.Object === Object && global,
        gC = typeof self == "object" && self && self.Object === Object && self,
        Qe = Ap || gC || Function("return this")(),
        Sp = typeof nn == "object" && nn && !nn.nodeType && nn,
        rp = Sp && typeof ur == "object" && ur && !ur.nodeType && ur,
        Cp = rp && rp.exports === Sp,
        ks = Cp && Ap.process,
        np = (function () {
            try {
                return ks && ks.binding && ks.binding("util");
            } catch {}
        })(),
        ip = np && np.isTypedArray;
    function wC(e, t) {
        for (var r = -1, n = e == null ? 0 : e.length, i = 0, o = []; ++r < n; ) {
            var s = e[r];
            t(s, r, e) && (o[i++] = s);
        }
        return o;
    }
    function yC(e, t) {
        for (var r = -1, n = t.length, i = e.length; ++r < n; ) e[i + r] = t[r];
        return e;
    }
    function EC(e, t) {
        for (var r = -1, n = e == null ? 0 : e.length; ++r < n; ) if (t(e[r], r, e)) return !0;
        return !1;
    }
    function _C(e, t) {
        for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
        return n;
    }
    function vC(e) {
        return function (t) {
            return e(t);
        };
    }
    function AC(e, t) {
        return e.has(t);
    }
    function SC(e, t) {
        return e?.[t];
    }
    function CC(e) {
        var t = -1,
            r = Array(e.size);
        return (
            e.forEach(function (n, i) {
                r[++t] = [i, n];
            }),
            r
        );
    }
    function TC(e, t) {
        return function (r) {
            return e(t(r));
        };
    }
    function bC(e) {
        var t = -1,
            r = Array(e.size);
        return (
            e.forEach(function (n) {
                r[++t] = n;
            }),
            r
        );
    }
    var OC = Array.prototype,
        xC = Function.prototype,
        Oi = Object.prototype,
        Ms = Qe["__core-js_shared__"],
        Tp = xC.toString,
        We = Oi.hasOwnProperty,
        op = (function () {
            var e = /[^.]+$/.exec((Ms && Ms.keys && Ms.keys.IE_PROTO) || "");
            return e ? "Symbol(src)_1." + e : "";
        })(),
        bp = Oi.toString,
        IC = RegExp(
            "^" +
                Tp.call(We)
                    .replace(hC, "\\$&")
                    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") +
                "$"
        ),
        sp = Cp ? Qe.Buffer : void 0,
        Si = Qe.Symbol,
        ap = Qe.Uint8Array,
        Op = Oi.propertyIsEnumerable,
        NC = OC.splice,
        Pt = Si ? Si.toStringTag : void 0,
        lp = Object.getOwnPropertySymbols,
        RC = sp ? sp.isBuffer : void 0,
        PC = TC(Object.keys, Object),
        Ws = cr(Qe, "DataView"),
        on = cr(Qe, "Map"),
        Gs = cr(Qe, "Promise"),
        Vs = cr(Qe, "Set"),
        Ys = cr(Qe, "WeakMap"),
        sn = cr(Object, "create"),
        DC = qt(Ws),
        FC = qt(on),
        qC = qt(Gs),
        LC = qt(Vs),
        UC = qt(Ys),
        up = Si ? Si.prototype : void 0,
        Bs = up ? up.valueOf : void 0;
    function Dt(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
            var n = e[t];
            this.set(n[0], n[1]);
        }
    }
    function $C() {
        (this.__data__ = sn ? sn(null) : {}), (this.size = 0);
    }
    function kC(e) {
        var t = this.has(e) && delete this.__data__[e];
        return (this.size -= t ? 1 : 0), t;
    }
    function MC(e) {
        var t = this.__data__;
        if (sn) {
            var r = t[e];
            return r === Xs ? void 0 : r;
        }
        return We.call(t, e) ? t[e] : void 0;
    }
    function BC(e) {
        var t = this.__data__;
        return sn ? t[e] !== void 0 : We.call(t, e);
    }
    function HC(e, t) {
        var r = this.__data__;
        return (this.size += this.has(e) ? 0 : 1), (r[e] = sn && t === void 0 ? Xs : t), this;
    }
    Dt.prototype.clear = $C;
    Dt.prototype.delete = kC;
    Dt.prototype.get = MC;
    Dt.prototype.has = BC;
    Dt.prototype.set = HC;
    function Ze(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
            var n = e[t];
            this.set(n[0], n[1]);
        }
    }
    function jC() {
        (this.__data__ = []), (this.size = 0);
    }
    function WC(e) {
        var t = this.__data__,
            r = xi(t, e);
        if (r < 0) return !1;
        var n = t.length - 1;
        return r == n ? t.pop() : NC.call(t, r, 1), --this.size, !0;
    }
    function GC(e) {
        var t = this.__data__,
            r = xi(t, e);
        return r < 0 ? void 0 : t[r][1];
    }
    function VC(e) {
        return xi(this.__data__, e) > -1;
    }
    function YC(e, t) {
        var r = this.__data__,
            n = xi(r, e);
        return n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this;
    }
    Ze.prototype.clear = jC;
    Ze.prototype.delete = WC;
    Ze.prototype.get = GC;
    Ze.prototype.has = VC;
    Ze.prototype.set = YC;
    function Ft(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
            var n = e[t];
            this.set(n[0], n[1]);
        }
    }
    function zC() {
        (this.size = 0), (this.__data__ = { hash: new Dt(), map: new (on || Ze)(), string: new Dt() });
    }
    function XC(e) {
        var t = Ii(this, e).delete(e);
        return (this.size -= t ? 1 : 0), t;
    }
    function KC(e) {
        return Ii(this, e).get(e);
    }
    function JC(e) {
        return Ii(this, e).has(e);
    }
    function QC(e, t) {
        var r = Ii(this, e),
            n = r.size;
        return r.set(e, t), (this.size += r.size == n ? 0 : 1), this;
    }
    Ft.prototype.clear = zC;
    Ft.prototype.delete = XC;
    Ft.prototype.get = KC;
    Ft.prototype.has = JC;
    Ft.prototype.set = QC;
    function Ci(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.__data__ = new Ft(); ++t < r; ) this.add(e[t]);
    }
    function ZC(e) {
        return this.__data__.set(e, Xs), this;
    }
    function eT(e) {
        return this.__data__.has(e);
    }
    Ci.prototype.add = Ci.prototype.push = ZC;
    Ci.prototype.has = eT;
    function ht(e) {
        var t = (this.__data__ = new Ze(e));
        this.size = t.size;
    }
    function tT() {
        (this.__data__ = new Ze()), (this.size = 0);
    }
    function rT(e) {
        var t = this.__data__,
            r = t.delete(e);
        return (this.size = t.size), r;
    }
    function nT(e) {
        return this.__data__.get(e);
    }
    function iT(e) {
        return this.__data__.has(e);
    }
    function oT(e, t) {
        var r = this.__data__;
        if (r instanceof Ze) {
            var n = r.__data__;
            if (!on || n.length < JS - 1) return n.push([e, t]), (this.size = ++r.size), this;
            r = this.__data__ = new Ft(n);
        }
        return r.set(e, t), (this.size = r.size), this;
    }
    ht.prototype.clear = tT;
    ht.prototype.delete = rT;
    ht.prototype.get = nT;
    ht.prototype.has = iT;
    ht.prototype.set = oT;
    function sT(e, t) {
        var r = Ti(e),
            n = !r && vT(e),
            i = !r && !n && zs(e),
            o = !r && !n && !i && Fp(e),
            s = r || n || i || o,
            a = s ? _C(e.length, String) : [],
            l = a.length;
        for (var h in e)
            (t || We.call(e, h)) &&
                !(
                    s &&
                    (h == "length" ||
                        (i && (h == "offset" || h == "parent")) ||
                        (o && (h == "buffer" || h == "byteLength" || h == "byteOffset")) ||
                        gT(h, l))
                ) &&
                a.push(h);
        return a;
    }
    function xi(e, t) {
        for (var r = e.length; r--; ) if (Np(e[r][0], t)) return r;
        return -1;
    }
    function aT(e, t, r) {
        var n = t(e);
        return Ti(e) ? n : yC(n, r(e));
    }
    function ln(e) {
        return e == null ? (e === void 0 ? nC : eC) : Pt && Pt in Object(e) ? pT(e) : _T(e);
    }
    function cp(e) {
        return an(e) && ln(e) == Ei;
    }
    function xp(e, t, r, n, i) {
        return e === t ? !0 : e == null || t == null || (!an(e) && !an(t)) ? e !== e && t !== t : lT(e, t, r, n, xp, i);
    }
    function lT(e, t, r, n, i, o) {
        var s = Ti(e),
            a = Ti(t),
            l = s ? Hs : dt(e),
            h = a ? Hs : dt(t);
        (l = l == Ei ? lr : l), (h = h == Ei ? lr : h);
        var c = l == lr,
            f = h == lr,
            m = l == h;
        if (m && zs(e)) {
            if (!zs(t)) return !1;
            (s = !0), (c = !1);
        }
        if (m && !c) return o || (o = new ht()), s || Fp(e) ? Ip(e, t, r, n, i, o) : dT(e, t, l, r, n, i, o);
        if (!(r & bi)) {
            var p = c && We.call(e, "__wrapped__"),
                E = f && We.call(t, "__wrapped__");
            if (p || E) {
                var _ = p ? e.value() : e,
                    v = E ? t.value() : t;
                return o || (o = new ht()), i(_, v, r, n, o);
            }
        }
        return m ? (o || (o = new ht()), hT(e, t, r, n, i, o)) : !1;
    }
    function uT(e) {
        if (!Dp(e) || yT(e)) return !1;
        var t = Rp(e) ? IC : pC;
        return t.test(qt(e));
    }
    function cT(e) {
        return an(e) && Pp(e.length) && !!z[ln(e)];
    }
    function fT(e) {
        if (!ET(e)) return PC(e);
        var t = [];
        for (var r in Object(e)) We.call(e, r) && r != "constructor" && t.push(r);
        return t;
    }
    function Ip(e, t, r, n, i, o) {
        var s = r & bi,
            a = e.length,
            l = t.length;
        if (a != l && !(s && l > a)) return !1;
        var h = o.get(e);
        if (h && o.get(t)) return h == t;
        var c = -1,
            f = !0,
            m = r & dp ? new Ci() : void 0;
        for (o.set(e, t), o.set(t, e); ++c < a; ) {
            var p = e[c],
                E = t[c];
            if (n) var _ = s ? n(E, p, c, t, e, o) : n(p, E, c, e, t, o);
            if (_ !== void 0) {
                if (_) continue;
                f = !1;
                break;
            }
            if (m) {
                if (
                    !EC(t, function (v, T) {
                        if (!AC(m, T) && (p === v || i(p, v, r, n, o))) return m.push(T);
                    })
                ) {
                    f = !1;
                    break;
                }
            } else if (!(p === E || i(p, E, r, n, o))) {
                f = !1;
                break;
            }
        }
        return o.delete(e), o.delete(t), f;
    }
    function dT(e, t, r, n, i, o, s) {
        switch (r) {
            case Ai:
                if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
                (e = e.buffer), (t = t.buffer);
            case vp:
                return !(e.byteLength != t.byteLength || !o(new ap(e), new ap(t)));
            case pp:
            case mp:
            case yp:
                return Np(+e, +t);
            case gp:
                return e.name == t.name && e.message == t.message;
            case Ep:
            case _p:
                return e == t + "";
            case _i:
                var a = CC;
            case vi:
                var l = n & bi;
                if ((a || (a = bC), e.size != t.size && !l)) return !1;
                var h = s.get(e);
                if (h) return h == t;
                (n |= dp), s.set(e, t);
                var c = Ip(a(e), a(t), n, i, o, s);
                return s.delete(e), c;
            case rC:
                if (Bs) return Bs.call(e) == Bs.call(t);
        }
        return !1;
    }
    function hT(e, t, r, n, i, o) {
        var s = r & bi,
            a = fp(e),
            l = a.length,
            h = fp(t),
            c = h.length;
        if (l != c && !s) return !1;
        for (var f = l; f--; ) {
            var m = a[f];
            if (!(s ? m in t : We.call(t, m))) return !1;
        }
        var p = o.get(e);
        if (p && o.get(t)) return p == t;
        var E = !0;
        o.set(e, t), o.set(t, e);
        for (var _ = s; ++f < l; ) {
            m = a[f];
            var v = e[m],
                T = t[m];
            if (n) var S = s ? n(T, v, m, t, e, o) : n(v, T, m, e, t, o);
            if (!(S === void 0 ? v === T || i(v, T, r, n, o) : S)) {
                E = !1;
                break;
            }
            _ || (_ = m == "constructor");
        }
        if (E && !_) {
            var N = e.constructor,
                L = t.constructor;
            N != L &&
                "constructor" in e &&
                "constructor" in t &&
                !(typeof N == "function" && N instanceof N && typeof L == "function" && L instanceof L) &&
                (E = !1);
        }
        return o.delete(e), o.delete(t), E;
    }
    function fp(e) {
        return aT(e, CT, mT);
    }
    function Ii(e, t) {
        var r = e.__data__;
        return wT(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
    }
    function cr(e, t) {
        var r = SC(e, t);
        return uT(r) ? r : void 0;
    }
    function pT(e) {
        var t = We.call(e, Pt),
            r = e[Pt];
        try {
            e[Pt] = void 0;
            var n = !0;
        } catch {}
        var i = bp.call(e);
        return n && (t ? (e[Pt] = r) : delete e[Pt]), i;
    }
    var mT = lp
            ? function (e) {
                  return e == null
                      ? []
                      : ((e = Object(e)),
                        wC(lp(e), function (t) {
                            return Op.call(e, t);
                        }));
              }
            : TT,
        dt = ln;
    ((Ws && dt(new Ws(new ArrayBuffer(1))) != Ai) ||
        (on && dt(new on()) != _i) ||
        (Gs && dt(Gs.resolve()) != tp) ||
        (Vs && dt(new Vs()) != vi) ||
        (Ys && dt(new Ys()) != js)) &&
        (dt = function (e) {
            var t = ln(e),
                r = t == lr ? e.constructor : void 0,
                n = r ? qt(r) : "";
            if (n)
                switch (n) {
                    case DC:
                        return Ai;
                    case FC:
                        return _i;
                    case qC:
                        return tp;
                    case LC:
                        return vi;
                    case UC:
                        return js;
                }
            return t;
        });
    function gT(e, t) {
        return (t = t ?? hp), !!t && (typeof e == "number" || mC.test(e)) && e > -1 && e % 1 == 0 && e < t;
    }
    function wT(e) {
        var t = typeof e;
        return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
    }
    function yT(e) {
        return !!op && op in e;
    }
    function ET(e) {
        var t = e && e.constructor,
            r = (typeof t == "function" && t.prototype) || Oi;
        return e === r;
    }
    function _T(e) {
        return bp.call(e);
    }
    function qt(e) {
        if (e != null) {
            try {
                return Tp.call(e);
            } catch {}
            try {
                return e + "";
            } catch {}
        }
        return "";
    }
    function Np(e, t) {
        return e === t || (e !== e && t !== t);
    }
    var vT = cp(
            (function () {
                return arguments;
            })()
        )
            ? cp
            : function (e) {
                  return an(e) && We.call(e, "callee") && !Op.call(e, "callee");
              },
        Ti = Array.isArray;
    function AT(e) {
        return e != null && Pp(e.length) && !Rp(e);
    }
    var zs = RC || bT;
    function ST(e, t) {
        return xp(e, t);
    }
    function Rp(e) {
        if (!Dp(e)) return !1;
        var t = ln(e);
        return t == wp || t == ZS || t == QS || t == tC;
    }
    function Pp(e) {
        return typeof e == "number" && e > -1 && e % 1 == 0 && e <= hp;
    }
    function Dp(e) {
        var t = typeof e;
        return e != null && (t == "object" || t == "function");
    }
    function an(e) {
        return e != null && typeof e == "object";
    }
    var Fp = ip ? vC(ip) : cT;
    function CT(e) {
        return AT(e) ? sT(e) : fT(e);
    }
    function TT() {
        return [];
    }
    function bT() {
        return !1;
    }
    ur.exports = ST;
});
var Up = g(cn => {
    "use strict";
    Object.defineProperty(cn, "__esModule", { value: !0 });
    cn.DownloadedUpdateHelper = void 0;
    cn.createTempUpdateFile = NT;
    var OT = require("crypto"),
        xT = require("fs"),
        Lp = qp(),
        Lt = Xe(),
        un = require("path"),
        Ks = class {
            constructor(t) {
                (this.cacheDir = t),
                    (this._file = null),
                    (this._packageFile = null),
                    (this.versionInfo = null),
                    (this.fileInfo = null),
                    (this._downloadedFileInfo = null);
            }
            get downloadedFileInfo() {
                return this._downloadedFileInfo;
            }
            get file() {
                return this._file;
            }
            get packageFile() {
                return this._packageFile;
            }
            get cacheDirForPendingUpdate() {
                return un.join(this.cacheDir, "pending");
            }
            async validateDownloadedPath(t, r, n, i) {
                if (this.versionInfo != null && this.file === t && this.fileInfo != null)
                    return Lp(this.versionInfo, r) && Lp(this.fileInfo.info, n.info) && (await (0, Lt.pathExists)(t)) ? t : null;
                let o = await this.getValidCachedUpdateFile(n, i);
                return o === null
                    ? null
                    : (i.info("Update has already been downloaded to ".concat(t, ").")), (this._file = o), o);
            }
            async setDownloadedFile(t, r, n, i, o, s) {
                (this._file = t),
                    (this._packageFile = r),
                    (this.versionInfo = n),
                    (this.fileInfo = i),
                    (this._downloadedFileInfo = {
                        fileName: o,
                        sha512: i.info.sha512,
                        isAdminRightsRequired: i.info.isAdminRightsRequired === !0
                    }),
                    s && (await (0, Lt.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo));
            }
            async clear() {
                (this._file = null),
                    (this._packageFile = null),
                    (this.versionInfo = null),
                    (this.fileInfo = null),
                    await this.cleanCacheDirForPendingUpdate();
            }
            async cleanCacheDirForPendingUpdate() {
                try {
                    await (0, Lt.emptyDir)(this.cacheDirForPendingUpdate);
                } catch {}
            }
            async getValidCachedUpdateFile(t, r) {
                let n = this.getUpdateInfoFile();
                if (!(await (0, Lt.pathExists)(n))) return null;
                let o;
                try {
                    o = await (0, Lt.readJson)(n);
                } catch (h) {
                    let c = "No cached update info available";
                    return (
                        h.code !== "ENOENT" &&
                            (await this.cleanCacheDirForPendingUpdate(), (c += " (error on read: ".concat(h.message, ")"))),
                        r.info(c),
                        null
                    );
                }
                if (!(o?.fileName !== null))
                    return (
                        r.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"),
                        await this.cleanCacheDirForPendingUpdate(),
                        null
                    );
                if (t.info.sha512 !== o.sha512)
                    return (
                        r.info(
                            "Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: "
                                .concat(o.sha512, ", expected: ")
                                .concat(t.info.sha512, ". Directory for cached update will be cleaned")
                        ),
                        await this.cleanCacheDirForPendingUpdate(),
                        null
                    );
                let a = un.join(this.cacheDirForPendingUpdate, o.fileName);
                if (!(await (0, Lt.pathExists)(a))) return r.info("Cached update file doesn't exist"), null;
                let l = await IT(a);
                return t.info.sha512 !== l
                    ? (r.warn(
                          "Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: "
                              .concat(l, ", expected: ")
                              .concat(t.info.sha512)
                      ),
                      await this.cleanCacheDirForPendingUpdate(),
                      null)
                    : ((this._downloadedFileInfo = o), a);
            }
            getUpdateInfoFile() {
                return un.join(this.cacheDirForPendingUpdate, "update-info.json");
            }
        };
    cn.DownloadedUpdateHelper = Ks;
    function IT(e, t = "sha512", r = "base64", n) {
        return new Promise((i, o) => {
            let s = (0, OT.createHash)(t);
            s.on("error", o).setEncoding(r),
                (0, xT.createReadStream)(e, { ...n, highWaterMark: 1024 * 1024 })
                    .on("error", o)
                    .on("end", () => {
                        s.end(), i(s.read());
                    })
                    .pipe(s, { end: !1 });
        });
    }
    async function NT(e, t, r) {
        let n = 0,
            i = un.join(t, e);
        for (let o = 0; o < 3; o++)
            try {
                return await (0, Lt.unlink)(i), i;
            } catch (s) {
                if (s.code === "ENOENT") return i;
                r.warn("Error on remove temp update file: ".concat(s)), (i = un.join(t, "".concat(n++, "-").concat(e)));
            }
        return i;
    }
});
var $p = g(Qs => {
    "use strict";
    Object.defineProperty(Qs, "__esModule", { value: !0 });
    Qs.getAppCacheDir = PT;
    var Js = require("path"),
        RT = require("os");
    function PT() {
        let e = (0, RT.homedir)(),
            t;
        return (
            process.platform === "win32"
                ? (t = process.env.LOCALAPPDATA || Js.join(e, "AppData", "Local"))
                : process.platform === "darwin"
                ? (t = Js.join(e, "Library", "Caches"))
                : (t = process.env.XDG_CACHE_HOME || Js.join(e, ".cache")),
            t
        );
    }
});
var Mp = g(Ni => {
    "use strict";
    Object.defineProperty(Ni, "__esModule", { value: !0 });
    Ni.ElectronAppAdapter = void 0;
    var kp = require("path"),
        DT = $p(),
        Zs = class {
            constructor(t = require("electron").app) {
                this.app = t;
            }
            whenReady() {
                return this.app.whenReady();
            }
            get version() {
                return this.app.getVersion();
            }
            get name() {
                return this.app.getName();
            }
            get isPackaged() {
                return this.app.isPackaged === !0;
            }
            get appUpdateConfigPath() {
                return this.isPackaged
                    ? kp.join(process.resourcesPath, "app-update.yml")
                    : kp.join(this.app.getAppPath(), "dev-app-update.yml");
            }
            get userDataPath() {
                return this.app.getPath("userData");
            }
            get baseCachePath() {
                return (0, DT.getAppCacheDir)();
            }
            quit() {
                this.app.quit();
            }
            relaunch() {
                this.app.relaunch();
            }
            onQuit(t) {
                this.app.once("quit", (r, n) => t(n));
            }
        };
    Ni.ElectronAppAdapter = Zs;
});
var Hp = g(pt => {
    "use strict";
    Object.defineProperty(pt, "__esModule", { value: !0 });
    pt.ElectronHttpExecutor = pt.NET_SESSION_NAME = void 0;
    pt.getNetSession = Bp;
    var Ri = le();
    pt.NET_SESSION_NAME = "electron-updater";
    function Bp() {
        return require("electron").session.fromPartition(pt.NET_SESSION_NAME, { cache: !1 });
    }
    var ea = class extends Ri.HttpExecutor {
        constructor(t) {
            super(), (this.proxyLoginCallback = t), (this.cachedSession = null);
        }
        async download(t, r, n) {
            return await n.cancellationToken.createPromise((i, o, s) => {
                let a = { headers: n.headers || void 0, redirect: "manual" };
                (0, Ri.configureRequestUrl)(t, a),
                    (0, Ri.configureRequestOptions)(a),
                    this.doDownload(
                        a,
                        {
                            destination: r,
                            options: n,
                            onCancel: s,
                            callback: l => {
                                l == null ? i(r) : o(l);
                            },
                            responseHandler: null
                        },
                        0
                    );
            });
        }
        createRequest(t, r) {
            t.headers && t.headers.Host && ((t.host = t.headers.Host), delete t.headers.Host),
                this.cachedSession == null && (this.cachedSession = Bp());
            let n = require("electron").net.request({ ...t, session: this.cachedSession });
            return n.on("response", r), this.proxyLoginCallback != null && n.on("login", this.proxyLoginCallback), n;
        }
        addRedirectHandlers(t, r, n, i, o) {
            t.on("redirect", (s, a, l) => {
                t.abort(),
                    i > this.maxRedirects ? n(this.createMaxRedirectError()) : o(Ri.HttpExecutor.prepareRedirectUrlOptions(l, r));
            });
        }
    };
    pt.ElectronHttpExecutor = ea;
});
var zp = g((_N, Yp) => {
    var FT = 1 / 0,
        qT = "[object Symbol]",
        Vp = /[\\^$.*+?()[\]{}|]/g,
        LT = RegExp(Vp.source),
        UT = typeof global == "object" && global && global.Object === Object && global,
        $T = typeof self == "object" && self && self.Object === Object && self,
        kT = UT || $T || Function("return this")(),
        MT = Object.prototype,
        BT = MT.toString,
        jp = kT.Symbol,
        Wp = jp ? jp.prototype : void 0,
        Gp = Wp ? Wp.toString : void 0;
    function HT(e) {
        if (typeof e == "string") return e;
        if (WT(e)) return Gp ? Gp.call(e) : "";
        var t = e + "";
        return t == "0" && 1 / e == -FT ? "-0" : t;
    }
    function jT(e) {
        return !!e && typeof e == "object";
    }
    function WT(e) {
        return typeof e == "symbol" || (jT(e) && BT.call(e) == qT);
    }
    function GT(e) {
        return e == null ? "" : HT(e);
    }
    function VT(e) {
        return (e = GT(e)), e && LT.test(e) ? e.replace(Vp, "\\$&") : e;
    }
    Yp.exports = VT;
});
var mt = g(fr => {
    "use strict";
    Object.defineProperty(fr, "__esModule", { value: !0 });
    fr.newBaseUrl = zT;
    fr.newUrlFromBase = ta;
    fr.getChannelFilename = XT;
    fr.blockmapFiles = KT;
    var Xp = require("url"),
        YT = zp();
    function zT(e) {
        let t = new Xp.URL(e);
        return t.pathname.endsWith("/") || (t.pathname += "/"), t;
    }
    function ta(e, t, r = !1) {
        let n = new Xp.URL(e, t),
            i = t.search;
        return i != null && i.length !== 0 ? (n.search = i) : r && (n.search = "noCache=".concat(Date.now().toString(32))), n;
    }
    function XT(e) {
        return "".concat(e, ".yml");
    }
    function KT(e, t, r) {
        let n = ta("".concat(e.pathname, ".blockmap"), e);
        return [ta("".concat(e.pathname.replace(new RegExp(YT(r), "g"), t), ".blockmap"), e), n];
    }
});
var Ue = g(wt => {
    "use strict";
    Object.defineProperty(wt, "__esModule", { value: !0 });
    wt.Provider = void 0;
    wt.findFile = QT;
    wt.parseUpdateInfo = ZT;
    wt.getFileList = Jp;
    wt.resolveFiles = eb;
    var gt = le(),
        JT = ai(),
        Kp = mt(),
        ra = class {
            constructor(t) {
                (this.runtimeOptions = t), (this.requestHeaders = null), (this.executor = t.executor);
            }
            get isUseMultipleRangeRequest() {
                return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
            }
            getChannelFilePrefix() {
                if (this.runtimeOptions.platform === "linux") {
                    let t = process.env.TEST_UPDATER_ARCH || process.arch;
                    return "-linux" + (t === "x64" ? "" : "-".concat(t));
                } else return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
            }
            getDefaultChannelName() {
                return this.getCustomChannelName("latest");
            }
            getCustomChannelName(t) {
                return "".concat(t).concat(this.getChannelFilePrefix());
            }
            get fileExtraDownloadHeaders() {
                return null;
            }
            setRequestHeaders(t) {
                this.requestHeaders = t;
            }
            httpRequest(t, r, n) {
                return this.executor.request(this.createRequestOptions(t, r), n);
            }
            createRequestOptions(t, r) {
                let n = {};
                return (
                    this.requestHeaders == null
                        ? r != null && (n.headers = r)
                        : (n.headers = r == null ? this.requestHeaders : { ...this.requestHeaders, ...r }),
                    (0, gt.configureRequestUrl)(t, n),
                    n
                );
            }
        };
    wt.Provider = ra;
    function QT(e, t, r) {
        if (e.length === 0) throw (0, gt.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
        let n = e.find(i => i.url.pathname.toLowerCase().endsWith(".".concat(t)));
        return n ?? (r == null ? e[0] : e.find(i => !r.some(o => i.url.pathname.toLowerCase().endsWith(".".concat(o)))));
    }
    function ZT(e, t, r) {
        if (e == null)
            throw (0, gt.newError)(
                "Cannot parse update info from ".concat(t, " in the latest release artifacts (").concat(r, "): rawData: null"),
                "ERR_UPDATER_INVALID_UPDATE_INFO"
            );
        let n;
        try {
            n = (0, JT.load)(e);
        } catch (i) {
            throw (0, gt.newError)(
                "Cannot parse update info from "
                    .concat(t, " in the latest release artifacts (")
                    .concat(r, "): ")
                    .concat(i.stack || i.message, ", rawData: ")
                    .concat(e),
                "ERR_UPDATER_INVALID_UPDATE_INFO"
            );
        }
        return n;
    }
    function Jp(e) {
        let t = e.files;
        if (t != null && t.length > 0) return t;
        if (e.path != null) return [{ url: e.path, sha2: e.sha2, sha512: e.sha512 }];
        throw (0, gt.newError)("No files provided: ".concat((0, gt.safeStringifyJson)(e)), "ERR_UPDATER_NO_FILES_PROVIDED");
    }
    function eb(e, t, r = n => n) {
        let i = Jp(e).map(a => {
                if (a.sha2 == null && a.sha512 == null)
                    throw (0, gt.newError)(
                        "Update info doesn't contain nor sha256 neither sha512 checksum: ".concat((0, gt.safeStringifyJson)(a)),
                        "ERR_UPDATER_NO_CHECKSUM"
                    );
                return { url: (0, Kp.newUrlFromBase)(r(a.url), t), info: a };
            }),
            o = e.packages,
            s = o == null ? null : o[process.arch] || o.ia32;
        return s != null && (i[0].packageInfo = { ...s, path: (0, Kp.newUrlFromBase)(r(s.path), t).href }), i;
    }
});
var sa = g(Pi => {
    "use strict";
    Object.defineProperty(Pi, "__esModule", { value: !0 });
    Pi.GenericProvider = void 0;
    var Qp = le(),
        na = mt(),
        ia = Ue(),
        oa = class extends ia.Provider {
            constructor(t, r, n) {
                super(n),
                    (this.configuration = t),
                    (this.updater = r),
                    (this.baseUrl = (0, na.newBaseUrl)(this.configuration.url));
            }
            get channel() {
                let t = this.updater.channel || this.configuration.channel;
                return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
            }
            async getLatestVersion() {
                let t = (0, na.getChannelFilename)(this.channel),
                    r = (0, na.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
                for (let n = 0; ; n++)
                    try {
                        return (0, ia.parseUpdateInfo)(await this.httpRequest(r), t, r);
                    } catch (i) {
                        if (i instanceof Qp.HttpError && i.statusCode === 404)
                            throw (0, Qp.newError)(
                                'Cannot find channel "'.concat(t, '" update info: ').concat(i.stack || i.message),
                                "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND"
                            );
                        if (i.code === "ECONNREFUSED" && n < 3) {
                            await new Promise((o, s) => {
                                try {
                                    setTimeout(o, 1e3 * n);
                                } catch (a) {
                                    s(a);
                                }
                            });
                            continue;
                        }
                        throw i;
                    }
            }
            resolveFiles(t) {
                return (0, ia.resolveFiles)(t, this.baseUrl);
            }
        };
    Pi.GenericProvider = oa;
});
var em = g(Di => {
    "use strict";
    Object.defineProperty(Di, "__esModule", { value: !0 });
    Di.BitbucketProvider = void 0;
    var Zp = le(),
        aa = mt(),
        la = Ue(),
        ua = class extends la.Provider {
            constructor(t, r, n) {
                super({ ...n, isUseMultipleRangeRequest: !1 }), (this.configuration = t), (this.updater = r);
                let { owner: i, slug: o } = t;
                this.baseUrl = (0, aa.newBaseUrl)(
                    "https://api.bitbucket.org/2.0/repositories/".concat(i, "/").concat(o, "/downloads")
                );
            }
            get channel() {
                return this.updater.channel || this.configuration.channel || "latest";
            }
            async getLatestVersion() {
                let t = new Zp.CancellationToken(),
                    r = (0, aa.getChannelFilename)(this.getCustomChannelName(this.channel)),
                    n = (0, aa.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
                try {
                    let i = await this.httpRequest(n, void 0, t);
                    return (0, la.parseUpdateInfo)(i, r, n);
                } catch (i) {
                    throw (0, Zp.newError)(
                        "Unable to find latest version on "
                            .concat(this.toString(), ", please ensure release exists: ")
                            .concat(i.stack || i.message),
                        "ERR_UPDATER_LATEST_VERSION_NOT_FOUND"
                    );
                }
            }
            resolveFiles(t) {
                return (0, la.resolveFiles)(t, this.baseUrl);
            }
            toString() {
                let { owner: t, slug: r } = this.configuration;
                return "Bitbucket (owner: ".concat(t, ", slug: ").concat(r, ", channel: ").concat(this.channel, ")");
            }
        };
    Di.BitbucketProvider = ua;
});
var ha = g(Ut => {
    "use strict";
    Object.defineProperty(Ut, "__esModule", { value: !0 });
    Ut.GitHubProvider = Ut.BaseGitHubProvider = void 0;
    Ut.computeReleaseNotes = rm;
    var et = le(),
        dr = $s(),
        tb = require("url"),
        hr = mt(),
        fa = Ue(),
        ca = /\/tag\/([^/]+)$/,
        Fi = class extends fa.Provider {
            constructor(t, r, n) {
                super({ ...n, isUseMultipleRangeRequest: !1 }),
                    (this.options = t),
                    (this.baseUrl = (0, hr.newBaseUrl)((0, et.githubUrl)(t, r)));
                let i = r === "github.com" ? "api.github.com" : r;
                this.baseApiUrl = (0, hr.newBaseUrl)((0, et.githubUrl)(t, i));
            }
            computeGithubBasePath(t) {
                let r = this.options.host;
                return r && !["github.com", "api.github.com"].includes(r) ? "/api/v3".concat(t) : t;
            }
        };
    Ut.BaseGitHubProvider = Fi;
    var da = class extends Fi {
        constructor(t, r, n) {
            super(t, "github.com", n), (this.options = t), (this.updater = r);
        }
        get channel() {
            let t = this.updater.channel || this.options.channel;
            return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
        }
        async getLatestVersion() {
            var t, r, n, i, o;
            let s = new et.CancellationToken(),
                a = await this.httpRequest(
                    (0, hr.newUrlFromBase)("".concat(this.basePath, ".atom"), this.baseUrl),
                    { accept: "application/xml, application/atom+xml, text/xml, */*" },
                    s
                ),
                l = (0, et.parseXml)(a),
                h = l.element("entry", !1, "No published versions on GitHub"),
                c = null;
            try {
                if (this.updater.allowPrerelease) {
                    let v =
                        ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) ||
                        ((r = dr.prerelease(this.updater.currentVersion)) === null || r === void 0 ? void 0 : r[0]) ||
                        null;
                    if (v === null) c = ca.exec(h.element("link").attribute("href"))[1];
                    else
                        for (let T of l.getElements("entry")) {
                            let S = ca.exec(T.element("link").attribute("href"));
                            if (S === null) continue;
                            let N = S[1],
                                L = ((n = dr.prerelease(N)) === null || n === void 0 ? void 0 : n[0]) || null,
                                De = !v || ["alpha", "beta"].includes(v),
                                V = L !== null && !["alpha", "beta"].includes(String(L));
                            if (De && !V && !(v === "beta" && L === "alpha")) {
                                c = N;
                                break;
                            }
                            if (L && L === v) {
                                c = N;
                                break;
                            }
                        }
                } else {
                    c = await this.getLatestTagName(s);
                    for (let v of l.getElements("entry"))
                        if (ca.exec(v.element("link").attribute("href"))[1] === c) {
                            h = v;
                            break;
                        }
                }
            } catch (v) {
                throw (0, et.newError)(
                    "Cannot parse releases feed: ".concat(v.stack || v.message, ",\nXML:\n").concat(a),
                    "ERR_UPDATER_INVALID_RELEASE_FEED"
                );
            }
            if (c == null) throw (0, et.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
            let f,
                m = "",
                p = "",
                E = async v => {
                    (m = (0, hr.getChannelFilename)(v)),
                        (p = (0, hr.newUrlFromBase)(this.getBaseDownloadPath(String(c), m), this.baseUrl));
                    let T = this.createRequestOptions(p);
                    try {
                        return await this.executor.request(T, s);
                    } catch (S) {
                        throw S instanceof et.HttpError && S.statusCode === 404
                            ? (0, et.newError)(
                                  "Cannot find "
                                      .concat(m, " in the latest release artifacts (")
                                      .concat(p, "): ")
                                      .concat(S.stack || S.message),
                                  "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND"
                              )
                            : S;
                    }
                };
            try {
                let v = this.channel;
                this.updater.allowPrerelease &&
                    !((i = dr.prerelease(c)) === null || i === void 0) &&
                    i[0] &&
                    (v = this.getCustomChannelName(String((o = dr.prerelease(c)) === null || o === void 0 ? void 0 : o[0]))),
                    (f = await E(v));
            } catch (v) {
                if (this.updater.allowPrerelease) f = await E(this.getDefaultChannelName());
                else throw v;
            }
            let _ = (0, fa.parseUpdateInfo)(f, m, p);
            return (
                _.releaseName == null && (_.releaseName = h.elementValueOrEmpty("title")),
                _.releaseNotes == null && (_.releaseNotes = rm(this.updater.currentVersion, this.updater.fullChangelog, l, h)),
                { tag: c, ..._ }
            );
        }
        async getLatestTagName(t) {
            let r = this.options,
                n =
                    r.host == null || r.host === "github.com"
                        ? (0, hr.newUrlFromBase)("".concat(this.basePath, "/latest"), this.baseUrl)
                        : new tb.URL(
                              "".concat(
                                  this.computeGithubBasePath("/repos/".concat(r.owner, "/").concat(r.repo, "/releases")),
                                  "/latest"
                              ),
                              this.baseApiUrl
                          );
            try {
                let i = await this.httpRequest(n, { Accept: "application/json" }, t);
                return i == null ? null : JSON.parse(i).tag_name;
            } catch (i) {
                throw (0, et.newError)(
                    "Unable to find latest version on GitHub ("
                        .concat(n, "), please ensure a production release exists: ")
                        .concat(i.stack || i.message),
                    "ERR_UPDATER_LATEST_VERSION_NOT_FOUND"
                );
            }
        }
        get basePath() {
            return "/".concat(this.options.owner, "/").concat(this.options.repo, "/releases");
        }
        resolveFiles(t) {
            return (0, fa.resolveFiles)(t, this.baseUrl, r => this.getBaseDownloadPath(t.tag, r.replace(/ /g, "-")));
        }
        getBaseDownloadPath(t, r) {
            return "".concat(this.basePath, "/download/").concat(t, "/").concat(r);
        }
    };
    Ut.GitHubProvider = da;
    function tm(e) {
        let t = e.elementValueOrEmpty("content");
        return t === "No content." ? "" : t;
    }
    function rm(e, t, r, n) {
        if (!t) return tm(n);
        let i = [];
        for (let o of r.getElements("entry")) {
            let s = /\/tag\/v?([^/]+)$/.exec(o.element("link").attribute("href"))[1];
            dr.lt(e, s) && i.push({ version: s, note: tm(o) });
        }
        return i.sort((o, s) => dr.rcompare(o.version, s.version));
    }
});
var im = g(qi => {
    "use strict";
    Object.defineProperty(qi, "__esModule", { value: !0 });
    qi.KeygenProvider = void 0;
    var nm = le(),
        pa = mt(),
        ma = Ue(),
        ga = class extends ma.Provider {
            constructor(t, r, n) {
                super({ ...n, isUseMultipleRangeRequest: !1 }),
                    (this.configuration = t),
                    (this.updater = r),
                    (this.baseUrl = (0, pa.newBaseUrl)(
                        "https://api.keygen.sh/v1/accounts/"
                            .concat(this.configuration.account, "/artifacts?product=")
                            .concat(this.configuration.product)
                    ));
            }
            get channel() {
                return this.updater.channel || this.configuration.channel || "stable";
            }
            async getLatestVersion() {
                let t = new nm.CancellationToken(),
                    r = (0, pa.getChannelFilename)(this.getCustomChannelName(this.channel)),
                    n = (0, pa.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
                try {
                    let i = await this.httpRequest(n, { "Accept": "application/vnd.api+json", "Keygen-Version": "1.1" }, t);
                    return (0, ma.parseUpdateInfo)(i, r, n);
                } catch (i) {
                    throw (0, nm.newError)(
                        "Unable to find latest version on "
                            .concat(this.toString(), ", please ensure release exists: ")
                            .concat(i.stack || i.message),
                        "ERR_UPDATER_LATEST_VERSION_NOT_FOUND"
                    );
                }
            }
            resolveFiles(t) {
                return (0, ma.resolveFiles)(t, this.baseUrl);
            }
            toString() {
                let { account: t, product: r, platform: n } = this.configuration;
                return "Keygen (account: "
                    .concat(t, ", product: ")
                    .concat(r, ", platform: ")
                    .concat(n, ", channel: ")
                    .concat(this.channel, ")");
            }
        };
    qi.KeygenProvider = ga;
});
var am = g(Li => {
    "use strict";
    Object.defineProperty(Li, "__esModule", { value: !0 });
    Li.PrivateGitHubProvider = void 0;
    var pr = le(),
        rb = ai(),
        nb = require("path"),
        om = require("url"),
        sm = mt(),
        ib = ha(),
        ob = Ue(),
        wa = class extends ib.BaseGitHubProvider {
            constructor(t, r, n, i) {
                super(t, "api.github.com", i), (this.updater = r), (this.token = n);
            }
            createRequestOptions(t, r) {
                let n = super.createRequestOptions(t, r);
                return (n.redirect = "manual"), n;
            }
            async getLatestVersion() {
                let t = new pr.CancellationToken(),
                    r = (0, sm.getChannelFilename)(this.getDefaultChannelName()),
                    n = await this.getLatestVersionInfo(t),
                    i = n.assets.find(a => a.name === r);
                if (i == null)
                    throw (0, pr.newError)(
                        "Cannot find ".concat(r, " in the release ").concat(n.html_url || n.name),
                        "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND"
                    );
                let o = new om.URL(i.url),
                    s;
                try {
                    s = (0, rb.load)(await this.httpRequest(o, this.configureHeaders("application/octet-stream"), t));
                } catch (a) {
                    throw a instanceof pr.HttpError && a.statusCode === 404
                        ? (0, pr.newError)(
                              "Cannot find "
                                  .concat(r, " in the latest release artifacts (")
                                  .concat(o, "): ")
                                  .concat(a.stack || a.message),
                              "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND"
                          )
                        : a;
                }
                return (s.assets = n.assets), s;
            }
            get fileExtraDownloadHeaders() {
                return this.configureHeaders("application/octet-stream");
            }
            configureHeaders(t) {
                return { accept: t, authorization: "token ".concat(this.token) };
            }
            async getLatestVersionInfo(t) {
                let r = this.updater.allowPrerelease,
                    n = this.basePath;
                r || (n = "".concat(n, "/latest"));
                let i = (0, sm.newUrlFromBase)(n, this.baseUrl);
                try {
                    let o = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
                    return r ? o.find(s => s.prerelease) || o[0] : o;
                } catch (o) {
                    throw (0, pr.newError)(
                        "Unable to find latest version on GitHub ("
                            .concat(i, "), please ensure a production release exists: ")
                            .concat(o.stack || o.message),
                        "ERR_UPDATER_LATEST_VERSION_NOT_FOUND"
                    );
                }
            }
            get basePath() {
                return this.computeGithubBasePath(
                    "/repos/".concat(this.options.owner, "/").concat(this.options.repo, "/releases")
                );
            }
            resolveFiles(t) {
                return (0, ob.getFileList)(t).map(r => {
                    let n = nb.posix.basename(r.url).replace(/ /g, "-"),
                        i = t.assets.find(o => o != null && o.name === n);
                    if (i == null)
                        throw (0, pr.newError)(
                            'Cannot find asset "'.concat(n, '" in: ').concat(JSON.stringify(t.assets, null, 2)),
                            "ERR_UPDATER_ASSET_NOT_FOUND"
                        );
                    return { url: new om.URL(i.url), info: r };
                });
            }
        };
    Li.PrivateGitHubProvider = wa;
});
var cm = g($i => {
    "use strict";
    Object.defineProperty($i, "__esModule", { value: !0 });
    $i.isUrlProbablySupportMultiRangeRequests = um;
    $i.createClient = cb;
    var Ui = le(),
        sb = em(),
        lm = sa(),
        ab = ha(),
        lb = im(),
        ub = am();
    function um(e) {
        return !e.includes("s3.amazonaws.com");
    }
    function cb(e, t, r) {
        if (typeof e == "string")
            throw (0, Ui.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
        let n = e.provider;
        switch (n) {
            case "github": {
                let i = e,
                    o = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
                return o == null ? new ab.GitHubProvider(i, t, r) : new ub.PrivateGitHubProvider(i, t, o, r);
            }
            case "bitbucket":
                return new sb.BitbucketProvider(e, t, r);
            case "keygen":
                return new lb.KeygenProvider(e, t, r);
            case "s3":
            case "spaces":
                return new lm.GenericProvider(
                    { provider: "generic", url: (0, Ui.getS3LikeProviderBaseUrl)(e), channel: e.channel || null },
                    t,
                    { ...r, isUseMultipleRangeRequest: !1 }
                );
            case "generic": {
                let i = e;
                return new lm.GenericProvider(i, t, {
                    ...r,
                    isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && um(i.url)
                });
            }
            case "custom": {
                let i = e,
                    o = i.updateProvider;
                if (!o) throw (0, Ui.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
                return new o(i, t, r);
            }
            default:
                throw (0, Ui.newError)("Unsupported provider: ".concat(n), "ERR_UPDATER_UNSUPPORTED_PROVIDER");
        }
    }
});
var ki = g(fn => {
    "use strict";
    Object.defineProperty(fn, "__esModule", { value: !0 });
    fn.OperationKind = void 0;
    fn.computeOperations = fb;
    var $t;
    (function (e) {
        (e[(e.COPY = 0)] = "COPY"), (e[(e.DOWNLOAD = 1)] = "DOWNLOAD");
    })($t || (fn.OperationKind = $t = {}));
    function fb(e, t, r) {
        let n = dm(e.files),
            i = dm(t.files),
            o = null,
            s = t.files[0],
            a = [],
            l = s.name,
            h = n.get(l);
        if (h == null) throw new Error("no file ".concat(l, " in old blockmap"));
        let c = i.get(l),
            f = 0,
            { checksumToOffset: m, checksumToOldSize: p } = hb(n.get(l), h.offset, r),
            E = s.offset;
        for (let _ = 0; _ < c.checksums.length; E += c.sizes[_], _++) {
            let v = c.sizes[_],
                T = c.checksums[_],
                S = m.get(T);
            S != null &&
                p.get(T) !== v &&
                (r.warn(
                    'Checksum ("'.concat(T, '") matches, but size differs (old: ').concat(p.get(T), ", new: ").concat(v, ")")
                ),
                (S = void 0)),
                S === void 0
                    ? (f++,
                      o != null && o.kind === $t.DOWNLOAD && o.end === E
                          ? (o.end += v)
                          : ((o = { kind: $t.DOWNLOAD, start: E, end: E + v }), fm(o, a, T, _)))
                    : o != null && o.kind === $t.COPY && o.end === S
                    ? (o.end += v)
                    : ((o = { kind: $t.COPY, start: S, end: S + v }), fm(o, a, T, _));
        }
        return f > 0 && r.info("File".concat(s.name === "file" ? "" : " " + s.name, " has ").concat(f, " changed blocks")), a;
    }
    var db = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
    function fm(e, t, r, n) {
        if (db && t.length !== 0) {
            let i = t[t.length - 1];
            if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
                let o = [i.start, i.end, e.start, e.end].reduce((s, a) => (s < a ? s : a));
                throw new Error(
                    "operation (block index: "
                        .concat(n, ", checksum: ")
                        .concat(r, ", kind: ")
                        .concat($t[e.kind], ") overlaps previous operation (checksum: ")
                        .concat(r, "):\n") +
                        "abs: ".concat(i.start, " until ").concat(i.end, " and ").concat(e.start, " until ").concat(e.end, "\n") +
                        "rel: "
                            .concat(i.start - o, " until ")
                            .concat(i.end - o, " and ")
                            .concat(e.start - o, " until ")
                            .concat(e.end - o)
                );
            }
        }
        t.push(e);
    }
    function hb(e, t, r) {
        let n = new Map(),
            i = new Map(),
            o = t;
        for (let s = 0; s < e.checksums.length; s++) {
            let a = e.checksums[s],
                l = e.sizes[s],
                h = i.get(a);
            if (h === void 0) n.set(a, o), i.set(a, l);
            else if (r.debug != null) {
                let c = h === l ? "(same size)" : "(size: ".concat(h, ", this size: ").concat(l, ")");
                r.debug(
                    ""
                        .concat(a, " duplicated in blockmap ")
                        .concat(
                            c,
                            ", it doesn't lead to broken differential downloader, just corresponding block will be skipped)"
                        )
                );
            }
            o += l;
        }
        return { checksumToOffset: n, checksumToOldSize: i };
    }
    function dm(e) {
        let t = new Map();
        for (let r of e) t.set(r.name, r);
        return t;
    }
});
var Ea = g(dn => {
    "use strict";
    Object.defineProperty(dn, "__esModule", { value: !0 });
    dn.DataSplitter = void 0;
    dn.copyData = pm;
    var Mi = le(),
        pb = require("fs"),
        mb = require("stream"),
        gb = ki(),
        hm = Buffer.from("\r\n\r\n"),
        yt;
    (function (e) {
        (e[(e.INIT = 0)] = "INIT"), (e[(e.HEADER = 1)] = "HEADER"), (e[(e.BODY = 2)] = "BODY");
    })(yt || (yt = {}));
    function pm(e, t, r, n, i) {
        let o = (0, pb.createReadStream)("", { fd: r, autoClose: !1, start: e.start, end: e.end - 1 });
        o.on("error", n), o.once("end", i), o.pipe(t, { end: !1 });
    }
    var ya = class extends mb.Writable {
        constructor(t, r, n, i, o, s) {
            super(),
                (this.out = t),
                (this.options = r),
                (this.partIndexToTaskIndex = n),
                (this.partIndexToLength = o),
                (this.finishHandler = s),
                (this.partIndex = -1),
                (this.headerListBuffer = null),
                (this.readState = yt.INIT),
                (this.ignoreByteCount = 0),
                (this.remainingPartDataCount = 0),
                (this.actualPartLength = 0),
                (this.boundaryLength = i.length + 4),
                (this.ignoreByteCount = this.boundaryLength - 2);
        }
        get isFinished() {
            return this.partIndex === this.partIndexToLength.length;
        }
        _write(t, r, n) {
            if (this.isFinished) {
                console.error("Trailing ignored data: ".concat(t.length, " bytes"));
                return;
            }
            this.handleData(t).then(n).catch(n);
        }
        async handleData(t) {
            let r = 0;
            if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
                throw (0, Mi.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
            if (this.ignoreByteCount > 0) {
                let n = Math.min(this.ignoreByteCount, t.length);
                (this.ignoreByteCount -= n), (r = n);
            } else if (this.remainingPartDataCount > 0) {
                let n = Math.min(this.remainingPartDataCount, t.length);
                (this.remainingPartDataCount -= n), await this.processPartData(t, 0, n), (r = n);
            }
            if (r !== t.length) {
                if (this.readState === yt.HEADER) {
                    let n = this.searchHeaderListEnd(t, r);
                    if (n === -1) return;
                    (r = n), (this.readState = yt.BODY), (this.headerListBuffer = null);
                }
                for (;;) {
                    if (this.readState === yt.BODY) this.readState = yt.INIT;
                    else {
                        this.partIndex++;
                        let s = this.partIndexToTaskIndex.get(this.partIndex);
                        if (s == null)
                            if (this.isFinished) s = this.options.end;
                            else throw (0, Mi.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
                        let a = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
                        if (a < s) await this.copyExistingData(a, s);
                        else if (a > s)
                            throw (0, Mi.newError)(
                                "prevTaskIndex must be < taskIndex",
                                "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED"
                            );
                        if (this.isFinished) {
                            this.onPartEnd(), this.finishHandler();
                            return;
                        }
                        if (((r = this.searchHeaderListEnd(t, r)), r === -1)) {
                            this.readState = yt.HEADER;
                            return;
                        }
                    }
                    let n = this.partIndexToLength[this.partIndex],
                        i = r + n,
                        o = Math.min(i, t.length);
                    if (
                        (await this.processPartStarted(t, r, o),
                        (this.remainingPartDataCount = n - (o - r)),
                        this.remainingPartDataCount > 0)
                    )
                        return;
                    if (((r = i + this.boundaryLength), r >= t.length)) {
                        this.ignoreByteCount = this.boundaryLength - (t.length - i);
                        return;
                    }
                }
            }
        }
        copyExistingData(t, r) {
            return new Promise((n, i) => {
                let o = () => {
                    if (t === r) {
                        n();
                        return;
                    }
                    let s = this.options.tasks[t];
                    if (s.kind !== gb.OperationKind.COPY) {
                        i(new Error("Task kind must be COPY"));
                        return;
                    }
                    pm(s, this.out, this.options.oldFileFd, i, () => {
                        t++, o();
                    });
                };
                o();
            });
        }
        searchHeaderListEnd(t, r) {
            let n = t.indexOf(hm, r);
            if (n !== -1) return n + hm.length;
            let i = r === 0 ? t : t.slice(r);
            return (
                this.headerListBuffer == null
                    ? (this.headerListBuffer = i)
                    : (this.headerListBuffer = Buffer.concat([this.headerListBuffer, i])),
                -1
            );
        }
        onPartEnd() {
            let t = this.partIndexToLength[this.partIndex - 1];
            if (this.actualPartLength !== t)
                throw (0, Mi.newError)(
                    "Expected length: ".concat(t, " differs from actual: ").concat(this.actualPartLength),
                    "ERR_DATA_SPLITTER_LENGTH_MISMATCH"
                );
            this.actualPartLength = 0;
        }
        processPartStarted(t, r, n) {
            return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(t, r, n);
        }
        processPartData(t, r, n) {
            this.actualPartLength += n - r;
            let i = this.out;
            return i.write(r === 0 && t.length === n ? t : t.slice(r, n))
                ? Promise.resolve()
                : new Promise((o, s) => {
                      i.on("error", s),
                          i.once("drain", () => {
                              i.removeListener("error", s), o();
                          });
                  });
        }
    };
    dn.DataSplitter = ya;
});
var wm = g(Bi => {
    "use strict";
    Object.defineProperty(Bi, "__esModule", { value: !0 });
    Bi.executeTasksUsingMultipleRangeRequests = wb;
    Bi.checkIsRangesSupported = va;
    var _a = le(),
        mm = Ea(),
        gm = ki();
    function wb(e, t, r, n, i) {
        let o = s => {
            if (s >= t.length) {
                e.fileMetadataBuffer != null && r.write(e.fileMetadataBuffer), r.end();
                return;
            }
            let a = s + 1e3;
            yb(e, { tasks: t, start: s, end: Math.min(t.length, a), oldFileFd: n }, r, () => o(a), i);
        };
        return o;
    }
    function yb(e, t, r, n, i) {
        let o = "bytes=",
            s = 0,
            a = new Map(),
            l = [];
        for (let f = t.start; f < t.end; f++) {
            let m = t.tasks[f];
            m.kind === gm.OperationKind.DOWNLOAD &&
                ((o += "".concat(m.start, "-").concat(m.end - 1, ", ")), a.set(s, f), s++, l.push(m.end - m.start));
        }
        if (s <= 1) {
            let f = m => {
                if (m >= t.end) {
                    n();
                    return;
                }
                let p = t.tasks[m++];
                if (p.kind === gm.OperationKind.COPY) (0, mm.copyData)(p, r, t.oldFileFd, i, () => f(m));
                else {
                    let E = e.createRequestOptions();
                    E.headers.Range = "bytes=".concat(p.start, "-").concat(p.end - 1);
                    let _ = e.httpExecutor.createRequest(E, v => {
                        va(v, i) && (v.pipe(r, { end: !1 }), v.once("end", () => f(m)));
                    });
                    e.httpExecutor.addErrorAndTimeoutHandlers(_, i), _.end();
                }
            };
            f(t.start);
            return;
        }
        let h = e.createRequestOptions();
        h.headers.Range = o.substring(0, o.length - 2);
        let c = e.httpExecutor.createRequest(h, f => {
            if (!va(f, i)) return;
            let m = (0, _a.safeGetHeader)(f, "content-type"),
                p = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(m);
            if (p == null) {
                i(new Error('Content-Type "multipart/byteranges" is expected, but got "'.concat(m, '"')));
                return;
            }
            let E = new mm.DataSplitter(r, t, a, p[1] || p[2], l, n);
            E.on("error", i),
                f.pipe(E),
                f.on("end", () => {
                    setTimeout(() => {
                        c.abort(), i(new Error("Response ends without calling any handlers"));
                    }, 1e4);
                });
        });
        e.httpExecutor.addErrorAndTimeoutHandlers(c, i), c.end();
    }
    function va(e, t) {
        if (e.statusCode >= 400) return t((0, _a.createHttpError)(e)), !1;
        if (e.statusCode !== 206) {
            let r = (0, _a.safeGetHeader)(e, "accept-ranges");
            if (r == null || r === "none")
                return t(new Error("Server doesn't support Accept-Ranges (response code ".concat(e.statusCode, ")"))), !1;
        }
        return !0;
    }
});
var ym = g(Hi => {
    "use strict";
    Object.defineProperty(Hi, "__esModule", { value: !0 });
    Hi.ProgressDifferentialDownloadCallbackTransform = void 0;
    var Eb = require("stream"),
        mr;
    (function (e) {
        (e[(e.COPY = 0)] = "COPY"), (e[(e.DOWNLOAD = 1)] = "DOWNLOAD");
    })(mr || (mr = {}));
    var Aa = class extends Eb.Transform {
        constructor(t, r, n) {
            super(),
                (this.progressDifferentialDownloadInfo = t),
                (this.cancellationToken = r),
                (this.onProgress = n),
                (this.start = Date.now()),
                (this.transferred = 0),
                (this.delta = 0),
                (this.expectedBytes = 0),
                (this.index = 0),
                (this.operationType = mr.COPY),
                (this.nextUpdate = this.start + 1e3);
        }
        _transform(t, r, n) {
            if (this.cancellationToken.cancelled) {
                n(new Error("cancelled"), null);
                return;
            }
            if (this.operationType == mr.COPY) {
                n(null, t);
                return;
            }
            (this.transferred += t.length), (this.delta += t.length);
            let i = Date.now();
            i >= this.nextUpdate &&
                this.transferred !== this.expectedBytes &&
                this.transferred !== this.progressDifferentialDownloadInfo.grandTotal &&
                ((this.nextUpdate = i + 1e3),
                this.onProgress({
                    total: this.progressDifferentialDownloadInfo.grandTotal,
                    delta: this.delta,
                    transferred: this.transferred,
                    percent: (this.transferred / this.progressDifferentialDownloadInfo.grandTotal) * 100,
                    bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
                }),
                (this.delta = 0)),
                n(null, t);
        }
        beginFileCopy() {
            this.operationType = mr.COPY;
        }
        beginRangeDownload() {
            (this.operationType = mr.DOWNLOAD),
                (this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++]);
        }
        endRangeDownload() {
            this.transferred !== this.progressDifferentialDownloadInfo.grandTotal &&
                this.onProgress({
                    total: this.progressDifferentialDownloadInfo.grandTotal,
                    delta: this.delta,
                    transferred: this.transferred,
                    percent: (this.transferred / this.progressDifferentialDownloadInfo.grandTotal) * 100,
                    bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
                });
        }
        _flush(t) {
            if (this.cancellationToken.cancelled) {
                t(new Error("cancelled"));
                return;
            }
            this.onProgress({
                total: this.progressDifferentialDownloadInfo.grandTotal,
                delta: this.delta,
                transferred: this.transferred,
                percent: 100,
                bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
            }),
                (this.delta = 0),
                (this.transferred = 0),
                t(null);
        }
    };
    Hi.ProgressDifferentialDownloadCallbackTransform = Aa;
});
var Ta = g(Wi => {
    "use strict";
    Object.defineProperty(Wi, "__esModule", { value: !0 });
    Wi.DifferentialDownloader = void 0;
    var hn = le(),
        Sa = Xe(),
        _b = require("fs"),
        vb = Ea(),
        Ab = require("url"),
        ji = ki(),
        Em = wm(),
        Sb = ym(),
        Ca = class {
            constructor(t, r, n) {
                (this.blockAwareFileInfo = t),
                    (this.httpExecutor = r),
                    (this.options = n),
                    (this.fileMetadataBuffer = null),
                    (this.logger = n.logger);
            }
            createRequestOptions() {
                let t = { headers: { ...this.options.requestHeaders, accept: "*/*" } };
                return (0, hn.configureRequestUrl)(this.options.newUrl, t), (0, hn.configureRequestOptions)(t), t;
            }
            doDownload(t, r) {
                if (t.version !== r.version)
                    throw new Error(
                        "version is different (".concat(t.version, " - ").concat(r.version, "), full download is required")
                    );
                let n = this.logger,
                    i = (0, ji.computeOperations)(t, r, n);
                n.debug != null && n.debug(JSON.stringify(i, null, 2));
                let o = 0,
                    s = 0;
                for (let l of i) {
                    let h = l.end - l.start;
                    l.kind === ji.OperationKind.DOWNLOAD ? (o += h) : (s += h);
                }
                let a = this.blockAwareFileInfo.size;
                if (o + s + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== a)
                    throw new Error(
                        "Internal error, size mismatch: downloadSize: "
                            .concat(o, ", copySize: ")
                            .concat(s, ", newSize: ")
                            .concat(a)
                    );
                return (
                    n.info(
                        "Full: "
                            .concat(_m(a), ", To download: ")
                            .concat(_m(o), " (")
                            .concat(Math.round(o / (a / 100)), "%)")
                    ),
                    this.downloadFile(i)
                );
            }
            downloadFile(t) {
                let r = [],
                    n = () =>
                        Promise.all(
                            r.map(i =>
                                (0, Sa.close)(i.descriptor).catch(o => {
                                    this.logger.error('cannot close file "'.concat(i.path, '": ').concat(o));
                                })
                            )
                        );
                return this.doDownloadFile(t, r)
                    .then(n)
                    .catch(i =>
                        n()
                            .catch(o => {
                                try {
                                    this.logger.error("cannot close files: ".concat(o));
                                } catch (s) {
                                    try {
                                        console.error(s);
                                    } catch {}
                                }
                                throw i;
                            })
                            .then(() => {
                                throw i;
                            })
                    );
            }
            async doDownloadFile(t, r) {
                let n = await (0, Sa.open)(this.options.oldFile, "r");
                r.push({ descriptor: n, path: this.options.oldFile });
                let i = await (0, Sa.open)(this.options.newFile, "w");
                r.push({ descriptor: i, path: this.options.newFile });
                let o = (0, _b.createWriteStream)(this.options.newFile, { fd: i });
                await new Promise((s, a) => {
                    let l = [],
                        h;
                    if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
                        let T = [],
                            S = 0;
                        for (let L of t)
                            L.kind === ji.OperationKind.DOWNLOAD && (T.push(L.end - L.start), (S += L.end - L.start));
                        let N = { expectedByteCounts: T, grandTotal: S };
                        (h = new Sb.ProgressDifferentialDownloadCallbackTransform(
                            N,
                            this.options.cancellationToken,
                            this.options.onProgress
                        )),
                            l.push(h);
                    }
                    let c = new hn.DigestTransform(this.blockAwareFileInfo.sha512);
                    (c.isValidateOnEnd = !1),
                        l.push(c),
                        o.on("finish", () => {
                            o.close(() => {
                                r.splice(1, 1);
                                try {
                                    c.validate();
                                } catch (T) {
                                    a(T);
                                    return;
                                }
                                s(void 0);
                            });
                        }),
                        l.push(o);
                    let f = null;
                    for (let T of l) T.on("error", a), f == null ? (f = T) : (f = f.pipe(T));
                    let m = l[0],
                        p;
                    if (this.options.isUseMultipleRangeRequest) {
                        (p = (0, Em.executeTasksUsingMultipleRangeRequests)(this, t, m, n, a)), p(0);
                        return;
                    }
                    let E = 0,
                        _ = null;
                    this.logger.info("Differential download: ".concat(this.options.newUrl));
                    let v = this.createRequestOptions();
                    (v.redirect = "manual"),
                        (p = T => {
                            var S, N;
                            if (T >= t.length) {
                                this.fileMetadataBuffer != null && m.write(this.fileMetadataBuffer), m.end();
                                return;
                            }
                            let L = t[T++];
                            if (L.kind === ji.OperationKind.COPY) {
                                h && h.beginFileCopy(), (0, vb.copyData)(L, m, n, a, () => p(T));
                                return;
                            }
                            let De = "bytes=".concat(L.start, "-").concat(L.end - 1);
                            (v.headers.range = De),
                                (N = (S = this.logger) === null || S === void 0 ? void 0 : S.debug) === null ||
                                    N === void 0 ||
                                    N.call(S, "download range: ".concat(De)),
                                h && h.beginRangeDownload();
                            let V = this.httpExecutor.createRequest(v, ce => {
                                ce.on("error", a),
                                    ce.on("aborted", () => {
                                        a(new Error("response has been aborted by the server"));
                                    }),
                                    ce.statusCode >= 400 && a((0, hn.createHttpError)(ce)),
                                    ce.pipe(m, { end: !1 }),
                                    ce.once("end", () => {
                                        h && h.endRangeDownload(), ++E === 100 ? ((E = 0), setTimeout(() => p(T), 1e3)) : p(T);
                                    });
                            });
                            V.on("redirect", (ce, y, P) => {
                                this.logger.info("Redirect to ".concat(Cb(P))),
                                    (_ = P),
                                    (0, hn.configureRequestUrl)(new Ab.URL(_), v),
                                    V.followRedirect();
                            }),
                                this.httpExecutor.addErrorAndTimeoutHandlers(V, a),
                                V.end();
                        }),
                        p(0);
                });
            }
            async readRemoteBytes(t, r) {
                let n = Buffer.allocUnsafe(r + 1 - t),
                    i = this.createRequestOptions();
                i.headers.range = "bytes=".concat(t, "-").concat(r);
                let o = 0;
                if (
                    (await this.request(i, s => {
                        s.copy(n, o), (o += s.length);
                    }),
                    o !== n.length)
                )
                    throw new Error("Received data length ".concat(o, " is not equal to expected ").concat(n.length));
                return n;
            }
            request(t, r) {
                return new Promise((n, i) => {
                    let o = this.httpExecutor.createRequest(t, s => {
                        (0, Em.checkIsRangesSupported)(s, i) &&
                            (s.on("error", i),
                            s.on("aborted", () => {
                                i(new Error("response has been aborted by the server"));
                            }),
                            s.on("data", r),
                            s.on("end", () => n()));
                    });
                    this.httpExecutor.addErrorAndTimeoutHandlers(o, i), o.end();
                });
            }
        };
    Wi.DifferentialDownloader = Ca;
    function _m(e, t = " KB") {
        return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
    }
    function Cb(e) {
        let t = e.indexOf("?");
        return t < 0 ? e : e.substring(0, t);
    }
});
var vm = g(Gi => {
    "use strict";
    Object.defineProperty(Gi, "__esModule", { value: !0 });
    Gi.GenericDifferentialDownloader = void 0;
    var Tb = Ta(),
        ba = class extends Tb.DifferentialDownloader {
            download(t, r) {
                return this.doDownload(t, r);
            }
        };
    Gi.GenericDifferentialDownloader = ba;
});
var Yi = g(yr => {
    "use strict";
    Object.defineProperty(yr, "__esModule", { value: !0 });
    yr.NoOpLogger = yr.AppUpdater = void 0;
    var Ce = le(),
        bb = require("crypto"),
        Ob = require("os"),
        xb = require("events"),
        gr = Xe(),
        Ib = ai(),
        Oa = cd(),
        kt = require("path"),
        Mt = $s(),
        Am = Up(),
        Nb = Mp(),
        Sm = Hp(),
        Rb = sa(),
        wr = Bt(),
        xa = cm(),
        Pb = require("zlib"),
        Db = mt(),
        Fb = vm(),
        Ia = class e extends xb.EventEmitter {
            get channel() {
                return this._channel;
            }
            set channel(t) {
                if (this._channel != null) {
                    if (typeof t != "string")
                        throw (0, Ce.newError)("Channel must be a string, but got: ".concat(t), "ERR_UPDATER_INVALID_CHANNEL");
                    if (t.length === 0)
                        throw (0, Ce.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
                }
                (this._channel = t), (this.allowDowngrade = !0);
            }
            addAuthHeader(t) {
                this.requestHeaders = Object.assign({}, this.requestHeaders, { authorization: t });
            }
            get netSession() {
                return (0, Sm.getNetSession)();
            }
            get logger() {
                return this._logger;
            }
            set logger(t) {
                this._logger = t ?? new Vi();
            }
            set updateConfigPath(t) {
                (this.clientPromise = null),
                    (this._appUpdateConfigPath = t),
                    (this.configOnDisk = new Oa.Lazy(() => this.loadUpdateConfig()));
            }
            constructor(t, r) {
                super(),
                    (this.autoDownload = !0),
                    (this.autoInstallOnAppQuit = !0),
                    (this.autoRunAppAfterInstall = !0),
                    (this.allowPrerelease = !1),
                    (this.fullChangelog = !1),
                    (this.allowDowngrade = !1),
                    (this.disableWebInstaller = !1),
                    (this.disableDifferentialDownload = !1),
                    (this.forceDevUpdateConfig = !1),
                    (this._channel = null),
                    (this.downloadedUpdateHelper = null),
                    (this.requestHeaders = null),
                    (this._logger = console),
                    (this.signals = new wr.UpdaterSignal(this)),
                    (this._appUpdateConfigPath = null),
                    (this.clientPromise = null),
                    (this.stagingUserIdPromise = new Oa.Lazy(() => this.getOrCreateStagingUserId())),
                    (this.configOnDisk = new Oa.Lazy(() => this.loadUpdateConfig())),
                    (this.checkForUpdatesPromise = null),
                    (this.downloadPromise = null),
                    (this.updateInfoAndProvider = null),
                    (this._testOnlyOptions = null),
                    this.on("error", o => {
                        this._logger.error("Error: ".concat(o.stack || o.message));
                    }),
                    r == null
                        ? ((this.app = new Nb.ElectronAppAdapter()),
                          (this.httpExecutor = new Sm.ElectronHttpExecutor((o, s) => this.emit("login", o, s))))
                        : ((this.app = r), (this.httpExecutor = null));
                let n = this.app.version,
                    i = (0, Mt.parse)(n);
                if (i == null)
                    throw (0, Ce.newError)(
                        'App version is not a valid semver version: "'.concat(n, '"'),
                        "ERR_UPDATER_INVALID_VERSION"
                    );
                (this.currentVersion = i),
                    (this.allowPrerelease = qb(i)),
                    t != null &&
                        (this.setFeedURL(t),
                        typeof t != "string" && t.requestHeaders && (this.requestHeaders = t.requestHeaders));
            }
            getFeedURL() {
                return "Deprecated. Do not use it.";
            }
            setFeedURL(t) {
                let r = this.createProviderRuntimeOptions(),
                    n;
                typeof t == "string"
                    ? (n = new Rb.GenericProvider({ provider: "generic", url: t }, this, {
                          ...r,
                          isUseMultipleRangeRequest: (0, xa.isUrlProbablySupportMultiRangeRequests)(t)
                      }))
                    : (n = (0, xa.createClient)(t, this, r)),
                    (this.clientPromise = Promise.resolve(n));
            }
            checkForUpdates() {
                if (!this.isUpdaterActive()) return Promise.resolve(null);
                let t = this.checkForUpdatesPromise;
                if (t != null) return this._logger.info("Checking for update (already in progress)"), t;
                let r = () => (this.checkForUpdatesPromise = null);
                return (
                    this._logger.info("Checking for update"),
                    (t = this.doCheckForUpdates()
                        .then(n => (r(), n))
                        .catch(n => {
                            throw (r(), this.emit("error", n, "Cannot check for updates: ".concat((n.stack || n).toString())), n);
                        })),
                    (this.checkForUpdatesPromise = t),
                    t
                );
            }
            isUpdaterActive() {
                return this.app.isPackaged || this.forceDevUpdateConfig
                    ? !0
                    : (this._logger.info(
                          "Skip checkForUpdates because application is not packed and dev update config is not forced"
                      ),
                      !1);
            }
            checkForUpdatesAndNotify(t) {
                return this.checkForUpdates().then(r =>
                    r?.downloadPromise
                        ? (r.downloadPromise.then(() => {
                              let n = e.formatDownloadNotification(r.updateInfo.version, this.app.name, t);
                              new (require("electron").Notification)(n).show();
                          }),
                          r)
                        : (this._logger.debug != null &&
                              this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"),
                          r)
                );
            }
            static formatDownloadNotification(t, r, n) {
                return (
                    n == null &&
                        (n = {
                            title: "A new update is ready to install",
                            body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
                        }),
                    (n = {
                        title: n.title.replace("{appName}", r).replace("{version}", t),
                        body: n.body.replace("{appName}", r).replace("{version}", t)
                    }),
                    n
                );
            }
            async isStagingMatch(t) {
                let r = t.stagingPercentage,
                    n = r;
                if (n == null) return !0;
                if (((n = parseInt(n, 10)), isNaN(n))) return this._logger.warn("Staging percentage is NaN: ".concat(r)), !0;
                n = n / 100;
                let i = await this.stagingUserIdPromise.value,
                    s = Ce.UUID.parse(i).readUInt32BE(12) / 4294967295;
                return (
                    this._logger.info("Staging percentage: ".concat(n, ", percentage: ").concat(s, ", user id: ").concat(i)),
                    s < n
                );
            }
            computeFinalHeaders(t) {
                return this.requestHeaders != null && Object.assign(t, this.requestHeaders), t;
            }
            async isUpdateAvailable(t) {
                let r = (0, Mt.parse)(t.version);
                if (r == null)
                    throw (0, Ce.newError)(
                        'This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "'.concat(
                            t.version,
                            '"'
                        ),
                        "ERR_UPDATER_INVALID_VERSION"
                    );
                let n = this.currentVersion;
                if ((0, Mt.eq)(r, n)) return !1;
                let i = t?.minimumSystemVersion,
                    o = (0, Ob.release)();
                if (i)
                    try {
                        if ((0, Mt.lt)(o, i))
                            return (
                                this._logger.info(
                                    "Current OS version "
                                        .concat(o, " is less than the minimum OS version required ")
                                        .concat(i, " for version ")
                                        .concat(o)
                                ),
                                !1
                            );
                    } catch (h) {
                        this._logger.warn(
                            "Failed to compare current OS version("
                                .concat(o, ") with minimum OS version(")
                                .concat(i, "): ")
                                .concat((h.message || h).toString())
                        );
                    }
                if (!(await this.isStagingMatch(t))) return !1;
                let a = (0, Mt.gt)(r, n),
                    l = (0, Mt.lt)(r, n);
                return a ? !0 : this.allowDowngrade && l;
            }
            async getUpdateInfoAndProvider() {
                await this.app.whenReady(),
                    this.clientPromise == null &&
                        (this.clientPromise = this.configOnDisk.value.then(n =>
                            (0, xa.createClient)(n, this, this.createProviderRuntimeOptions())
                        ));
                let t = await this.clientPromise,
                    r = await this.stagingUserIdPromise.value;
                return (
                    t.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": r })),
                    { info: await t.getLatestVersion(), provider: t }
                );
            }
            createProviderRuntimeOptions() {
                return {
                    isUseMultipleRangeRequest: !0,
                    platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
                    executor: this.httpExecutor
                };
            }
            async doCheckForUpdates() {
                this.emit("checking-for-update");
                let t = await this.getUpdateInfoAndProvider(),
                    r = t.info;
                if (!(await this.isUpdateAvailable(r)))
                    return (
                        this._logger.info(
                            "Update for version "
                                .concat(this.currentVersion.format(), " is not available (latest version: ")
                                .concat(r.version, ", downgrade is ")
                                .concat(this.allowDowngrade ? "allowed" : "disallowed", ").")
                        ),
                        this.emit("update-not-available", r),
                        { versionInfo: r, updateInfo: r }
                    );
                (this.updateInfoAndProvider = t), this.onUpdateAvailable(r);
                let n = new Ce.CancellationToken();
                return {
                    versionInfo: r,
                    updateInfo: r,
                    cancellationToken: n,
                    downloadPromise: this.autoDownload ? this.downloadUpdate(n) : null
                };
            }
            onUpdateAvailable(t) {
                this._logger.info(
                    "Found version ".concat(t.version, " (url: ").concat(
                        (0, Ce.asArray)(t.files)
                            .map(r => r.url)
                            .join(", "),
                        ")"
                    )
                ),
                    this.emit("update-available", t);
            }
            downloadUpdate(t = new Ce.CancellationToken()) {
                let r = this.updateInfoAndProvider;
                if (r == null) {
                    let i = new Error("Please check update first");
                    return this.dispatchError(i), Promise.reject(i);
                }
                if (this.downloadPromise != null)
                    return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
                this._logger.info(
                    "Downloading update from ".concat(
                        (0, Ce.asArray)(r.info.files)
                            .map(i => i.url)
                            .join(", ")
                    )
                );
                let n = i => {
                    if (!(i instanceof Ce.CancellationError))
                        try {
                            this.dispatchError(i);
                        } catch (o) {
                            this._logger.warn("Cannot dispatch error event: ".concat(o.stack || o));
                        }
                    return i;
                };
                return (
                    (this.downloadPromise = this.doDownloadUpdate({
                        updateInfoAndProvider: r,
                        requestHeaders: this.computeRequestHeaders(r.provider),
                        cancellationToken: t,
                        disableWebInstaller: this.disableWebInstaller,
                        disableDifferentialDownload: this.disableDifferentialDownload
                    })
                        .catch(i => {
                            throw n(i);
                        })
                        .finally(() => {
                            this.downloadPromise = null;
                        })),
                    this.downloadPromise
                );
            }
            dispatchError(t) {
                this.emit("error", t, (t.stack || t).toString());
            }
            dispatchUpdateDownloaded(t) {
                this.emit(wr.UPDATE_DOWNLOADED, t);
            }
            async loadUpdateConfig() {
                return (
                    this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath),
                    (0, Ib.load)(await (0, gr.readFile)(this._appUpdateConfigPath, "utf-8"))
                );
            }
            computeRequestHeaders(t) {
                let r = t.fileExtraDownloadHeaders;
                if (r != null) {
                    let n = this.requestHeaders;
                    return n == null ? r : { ...r, ...n };
                }
                return this.computeFinalHeaders({ accept: "*/*" });
            }
            async getOrCreateStagingUserId() {
                let t = kt.join(this.app.userDataPath, ".updaterId");
                try {
                    let n = await (0, gr.readFile)(t, "utf-8");
                    if (Ce.UUID.check(n)) return n;
                    this._logger.warn("Staging user id file exists, but content was invalid: ".concat(n));
                } catch (n) {
                    n.code !== "ENOENT" && this._logger.warn("Couldn't read staging user ID, creating a blank one: ".concat(n));
                }
                let r = Ce.UUID.v5((0, bb.randomBytes)(4096), Ce.UUID.OID);
                this._logger.info("Generated new staging user ID: ".concat(r));
                try {
                    await (0, gr.outputFile)(t, r);
                } catch (n) {
                    this._logger.warn("Couldn't write out staging user ID: ".concat(n));
                }
                return r;
            }
            get isAddNoCacheQuery() {
                let t = this.requestHeaders;
                if (t == null) return !0;
                for (let r of Object.keys(t)) {
                    let n = r.toLowerCase();
                    if (n === "authorization" || n === "private-token") return !1;
                }
                return !0;
            }
            async getOrCreateDownloadHelper() {
                let t = this.downloadedUpdateHelper;
                if (t == null) {
                    let r = (await this.configOnDisk.value).updaterCacheDirName,
                        n = this._logger;
                    r == null &&
                        n.error(
                            "updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?"
                        );
                    let i = kt.join(this.app.baseCachePath, r || this.app.name);
                    n.debug != null && n.debug("updater cache dir: ".concat(i)),
                        (t = new Am.DownloadedUpdateHelper(i)),
                        (this.downloadedUpdateHelper = t);
                }
                return t;
            }
            async executeDownload(t) {
                let r = t.fileInfo,
                    n = {
                        headers: t.downloadUpdateOptions.requestHeaders,
                        cancellationToken: t.downloadUpdateOptions.cancellationToken,
                        sha2: r.info.sha2,
                        sha512: r.info.sha512
                    };
                this.listenerCount(wr.DOWNLOAD_PROGRESS) > 0 && (n.onProgress = S => this.emit(wr.DOWNLOAD_PROGRESS, S));
                let i = t.downloadUpdateOptions.updateInfoAndProvider.info,
                    o = i.version,
                    s = r.packageInfo;
                function a() {
                    let S = decodeURIComponent(t.fileInfo.url.pathname);
                    return S.endsWith(".".concat(t.fileExtension)) ? kt.basename(S) : t.fileInfo.info.url;
                }
                let l = await this.getOrCreateDownloadHelper(),
                    h = l.cacheDirForPendingUpdate;
                await (0, gr.mkdir)(h, { recursive: !0 });
                let c = a(),
                    f = kt.join(h, c),
                    m = s == null ? null : kt.join(h, "package-".concat(o).concat(kt.extname(s.path) || ".7z")),
                    p = async S => (
                        await l.setDownloadedFile(f, m, i, r, c, S),
                        await t.done({ ...i, downloadedFile: f }),
                        m == null ? [f] : [f, m]
                    ),
                    E = this._logger,
                    _ = await l.validateDownloadedPath(f, i, r, E);
                if (_ != null) return (f = _), await p(!1);
                let v = async () => (await l.clear().catch(() => {}), await (0, gr.unlink)(f).catch(() => {})),
                    T = await (0, Am.createTempUpdateFile)("temp-".concat(c), h, E);
                try {
                    await t.task(T, n, m, v),
                        await (0, Ce.retry)(
                            () => (0, gr.rename)(T, f),
                            60,
                            500,
                            0,
                            0,
                            S => S instanceof Error && /^EBUSY:/.test(S.message)
                        );
                } catch (S) {
                    throw (
                        (await v(),
                        S instanceof Ce.CancellationError && (E.info("cancelled"), this.emit("update-cancelled", i)),
                        S)
                    );
                }
                return E.info("New version ".concat(o, " has been downloaded to ").concat(f)), await p(!0);
            }
            async differentialDownloadInstaller(t, r, n, i, o) {
                try {
                    if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload) return !0;
                    let s = (0, Db.blockmapFiles)(t.url, this.app.version, r.updateInfoAndProvider.info.version);
                    this._logger.info('Download block maps (old: "'.concat(s[0], '", new: ').concat(s[1], ")"));
                    let a = async c => {
                            let f = await this.httpExecutor.downloadToBuffer(c, {
                                headers: r.requestHeaders,
                                cancellationToken: r.cancellationToken
                            });
                            if (f == null || f.length === 0) throw new Error('Blockmap "'.concat(c.href, '" is empty'));
                            try {
                                return JSON.parse((0, Pb.gunzipSync)(f).toString());
                            } catch (m) {
                                throw new Error('Cannot parse blockmap "'.concat(c.href, '", error: ').concat(m));
                            }
                        },
                        l = {
                            newUrl: t.url,
                            oldFile: kt.join(this.downloadedUpdateHelper.cacheDir, o),
                            logger: this._logger,
                            newFile: n,
                            isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
                            requestHeaders: r.requestHeaders,
                            cancellationToken: r.cancellationToken
                        };
                    this.listenerCount(wr.DOWNLOAD_PROGRESS) > 0 && (l.onProgress = c => this.emit(wr.DOWNLOAD_PROGRESS, c));
                    let h = await Promise.all(s.map(c => a(c)));
                    return await new Fb.GenericDifferentialDownloader(t.info, this.httpExecutor, l).download(h[0], h[1]), !1;
                } catch (s) {
                    if (
                        (this._logger.error("Cannot download differentially, fallback to full download: ".concat(s.stack || s)),
                        this._testOnlyOptions != null)
                    )
                        throw s;
                    return !0;
                }
            }
        };
    yr.AppUpdater = Ia;
    function qb(e) {
        let t = (0, Mt.prerelease)(e);
        return t != null && t.length > 0;
    }
    var Vi = class {
        info(t) {}
        warn(t) {}
        error(t) {}
    };
    yr.NoOpLogger = Vi;
});
var Er = g(zi => {
    "use strict";
    Object.defineProperty(zi, "__esModule", { value: !0 });
    zi.BaseUpdater = void 0;
    var Cm = require("child_process"),
        Lb = Yi(),
        Na = class extends Lb.AppUpdater {
            constructor(t, r) {
                super(t, r), (this.quitAndInstallCalled = !1), (this.quitHandlerAdded = !1);
            }
            quitAndInstall(t = !1, r = !1) {
                this._logger.info("Install on explicit quitAndInstall"),
                    this.install(t, t ? r : this.autoRunAppAfterInstall)
                        ? setImmediate(() => {
                              require("electron").autoUpdater.emit("before-quit-for-update"), this.app.quit();
                          })
                        : (this.quitAndInstallCalled = !1);
            }
            executeDownload(t) {
                return super.executeDownload({
                    ...t,
                    done: r => (this.dispatchUpdateDownloaded(r), this.addQuitHandler(), Promise.resolve())
                });
            }
            install(t = !1, r = !1) {
                if (this.quitAndInstallCalled)
                    return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
                let n = this.downloadedUpdateHelper,
                    i = n && n.file ? (process.platform === "linux" ? n.file.replace(/ /g, "\\ ") : n.file) : null,
                    o = n == null ? null : n.downloadedFileInfo;
                if (i == null || o == null)
                    return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
                this.quitAndInstallCalled = !0;
                try {
                    return (
                        this._logger.info("Install: isSilent: ".concat(t, ", isForceRunAfter: ").concat(r)),
                        this.doInstall({
                            installerPath: i,
                            isSilent: t,
                            isForceRunAfter: r,
                            isAdminRightsRequired: o.isAdminRightsRequired
                        })
                    );
                } catch (s) {
                    return this.dispatchError(s), !1;
                }
            }
            addQuitHandler() {
                this.quitHandlerAdded ||
                    !this.autoInstallOnAppQuit ||
                    ((this.quitHandlerAdded = !0),
                    this.app.onQuit(t => {
                        if (this.quitAndInstallCalled) {
                            this._logger.info("Update installer has already been triggered. Quitting application.");
                            return;
                        }
                        if (!this.autoInstallOnAppQuit) {
                            this._logger.info(
                                "Update will not be installed on quit because autoInstallOnAppQuit is set to false."
                            );
                            return;
                        }
                        if (t !== 0) {
                            this._logger.info(
                                "Update will be not installed on quit because application is quitting with exit code ".concat(t)
                            );
                            return;
                        }
                        this._logger.info("Auto install update on quit"), this.install(!0, !1);
                    }));
            }
            wrapSudo() {
                let { name: t } = this.app,
                    r = '"'.concat(t, ' would like to update"'),
                    n = this.spawnSyncLog("which gksudo || which kdesudo || which pkexec || which beesu"),
                    i = [n];
                return (
                    /kdesudo/i.test(n)
                        ? (i.push("--comment", r), i.push("-c"))
                        : /gksudo/i.test(n)
                        ? i.push("--message", r)
                        : /pkexec/i.test(n) && i.push("--disable-internal-agent"),
                    i.join(" ")
                );
            }
            spawnSyncLog(t, r = [], n = {}) {
                return (
                    this._logger.info("Executing: ".concat(t, " with args: ").concat(r)),
                    (0, Cm.spawnSync)(t, r, { env: { ...process.env, ...n }, encoding: "utf-8", shell: !0 }).stdout.trim()
                );
            }
            async spawnLog(t, r = [], n = void 0, i = "ignore") {
                return (
                    this._logger.info("Executing: ".concat(t, " with args: ").concat(r)),
                    new Promise((o, s) => {
                        try {
                            let a = { stdio: i, env: n, detached: !0 },
                                l = (0, Cm.spawn)(t, r, a);
                            l.on("error", h => {
                                s(h);
                            }),
                                l.unref(),
                                l.pid !== void 0 && o(!0);
                        } catch (a) {
                            s(a);
                        }
                    })
                );
            }
        };
    zi.BaseUpdater = Na;
});
var Pa = g(Xi => {
    "use strict";
    Object.defineProperty(Xi, "__esModule", { value: !0 });
    Xi.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
    var _r = Xe(),
        Ub = Ta(),
        $b = require("zlib"),
        Ra = class extends Ub.DifferentialDownloader {
            async download() {
                let t = this.blockAwareFileInfo,
                    r = t.size,
                    n = r - (t.blockMapSize + 4);
                this.fileMetadataBuffer = await this.readRemoteBytes(n, r - 1);
                let i = Tm(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
                await this.doDownload(await kb(this.options.oldFile), i);
            }
        };
    Xi.FileWithEmbeddedBlockMapDifferentialDownloader = Ra;
    function Tm(e) {
        return JSON.parse((0, $b.inflateRawSync)(e).toString());
    }
    async function kb(e) {
        let t = await (0, _r.open)(e, "r");
        try {
            let r = (await (0, _r.fstat)(t)).size,
                n = Buffer.allocUnsafe(4);
            await (0, _r.read)(t, n, 0, n.length, r - n.length);
            let i = Buffer.allocUnsafe(n.readUInt32BE(0));
            return await (0, _r.read)(t, i, 0, i.length, r - n.length - i.length), await (0, _r.close)(t), Tm(i);
        } catch (r) {
            throw (await (0, _r.close)(t), r);
        }
    }
});
var Fa = g(Ki => {
    "use strict";
    Object.defineProperty(Ki, "__esModule", { value: !0 });
    Ki.AppImageUpdater = void 0;
    var bm = le(),
        Om = require("child_process"),
        Mb = Xe(),
        Bb = require("fs"),
        pn = require("path"),
        Hb = Er(),
        jb = Pa(),
        xm = Bt(),
        Wb = Ue(),
        Da = class extends Hb.BaseUpdater {
            constructor(t, r) {
                super(t, r);
            }
            isUpdaterActive() {
                return process.env.APPIMAGE == null
                    ? (process.env.SNAP == null
                          ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage")
                          : this._logger.info("SNAP env is defined, updater is disabled"),
                      !1)
                    : super.isUpdaterActive();
            }
            doDownloadUpdate(t) {
                let r = t.updateInfoAndProvider.provider,
                    n = (0, Wb.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "AppImage", ["rpm", "deb"]);
                return this.executeDownload({
                    fileExtension: "AppImage",
                    fileInfo: n,
                    downloadUpdateOptions: t,
                    task: async (i, o) => {
                        let s = process.env.APPIMAGE;
                        if (s == null) throw (0, bm.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
                        let a = !1;
                        try {
                            let l = {
                                newUrl: n.url,
                                oldFile: s,
                                logger: this._logger,
                                newFile: i,
                                isUseMultipleRangeRequest: r.isUseMultipleRangeRequest,
                                requestHeaders: t.requestHeaders,
                                cancellationToken: t.cancellationToken
                            };
                            this.listenerCount(xm.DOWNLOAD_PROGRESS) > 0 &&
                                (l.onProgress = h => this.emit(xm.DOWNLOAD_PROGRESS, h)),
                                await new jb.FileWithEmbeddedBlockMapDifferentialDownloader(
                                    n.info,
                                    this.httpExecutor,
                                    l
                                ).download();
                        } catch (l) {
                            this._logger.error(
                                "Cannot download differentially, fallback to full download: ".concat(l.stack || l)
                            ),
                                (a = process.platform === "linux");
                        }
                        a && (await this.httpExecutor.download(n.url, i, o)), await (0, Mb.chmod)(i, 493);
                    }
                });
            }
            doInstall(t) {
                let r = process.env.APPIMAGE;
                if (r == null) throw (0, bm.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
                (0, Bb.unlinkSync)(r);
                let n,
                    i = pn.basename(r);
                pn.basename(t.installerPath) === i || !/\d+\.\d+\.\d+/.test(i)
                    ? (n = r)
                    : (n = pn.join(pn.dirname(r), pn.basename(t.installerPath))),
                    (0, Om.execFileSync)("mv", ["-f", t.installerPath, n]),
                    n !== r && this.emit("appimage-filename-updated", n);
                let o = { ...process.env, APPIMAGE_SILENT_INSTALL: "true" };
                return (
                    t.isForceRunAfter
                        ? this.spawnLog(n, [], o)
                        : ((o.APPIMAGE_EXIT_AFTER_INSTALL = "true"), (0, Om.execFileSync)(n, [], { env: o })),
                    !0
                );
            }
        };
    Ki.AppImageUpdater = Da;
});
var La = g(Ji => {
    "use strict";
    Object.defineProperty(Ji, "__esModule", { value: !0 });
    Ji.DebUpdater = void 0;
    var Gb = Er(),
        Im = Bt(),
        Vb = Ue(),
        qa = class extends Gb.BaseUpdater {
            constructor(t, r) {
                super(t, r);
            }
            doDownloadUpdate(t) {
                let r = t.updateInfoAndProvider.provider,
                    n = (0, Vb.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "deb", ["AppImage", "rpm"]);
                return this.executeDownload({
                    fileExtension: "deb",
                    fileInfo: n,
                    downloadUpdateOptions: t,
                    task: async (i, o) => {
                        this.listenerCount(Im.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = s => this.emit(Im.DOWNLOAD_PROGRESS, s)),
                            await this.httpExecutor.download(n.url, i, o);
                    }
                });
            }
            doInstall(t) {
                let r = this.wrapSudo(),
                    n = /pkexec/i.test(r) ? "" : '"',
                    i = ["dpkg", "-i", t.installerPath, "||", "apt-get", "install", "-f", "-y"];
                return (
                    this.spawnSyncLog(r, ["".concat(n, "/bin/bash"), "-c", "'".concat(i.join(" "), "'").concat(n)]),
                    t.isForceRunAfter && this.app.relaunch(),
                    !0
                );
            }
        };
    Ji.DebUpdater = qa;
});
var $a = g(Qi => {
    "use strict";
    Object.defineProperty(Qi, "__esModule", { value: !0 });
    Qi.RpmUpdater = void 0;
    var Yb = Er(),
        Nm = Bt(),
        zb = Ue(),
        Ua = class extends Yb.BaseUpdater {
            constructor(t, r) {
                super(t, r);
            }
            doDownloadUpdate(t) {
                let r = t.updateInfoAndProvider.provider,
                    n = (0, zb.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "rpm", ["AppImage", "deb"]);
                return this.executeDownload({
                    fileExtension: "rpm",
                    fileInfo: n,
                    downloadUpdateOptions: t,
                    task: async (i, o) => {
                        this.listenerCount(Nm.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = s => this.emit(Nm.DOWNLOAD_PROGRESS, s)),
                            await this.httpExecutor.download(n.url, i, o);
                    }
                });
            }
            doInstall(t) {
                let r = t.installerPath,
                    n = this.wrapSudo(),
                    i = /pkexec/i.test(n) ? "" : '"',
                    o = this.spawnSyncLog("which zypper"),
                    s;
                return (
                    o
                        ? (s = [o, "--no-refresh", "install", "--allow-unsigned-rpm", "-y", "-f", r])
                        : (s = [this.spawnSyncLog("which dnf || which yum"), "-y", "install", r]),
                    this.spawnSyncLog(n, ["".concat(i, "/bin/bash"), "-c", "'".concat(s.join(" "), "'").concat(i)]),
                    t.isForceRunAfter && this.app.relaunch(),
                    !0
                );
            }
        };
    Qi.RpmUpdater = Ua;
});
var Ma = g(Zi => {
    "use strict";
    Object.defineProperty(Zi, "__esModule", { value: !0 });
    Zi.MacUpdater = void 0;
    var Rm = le(),
        Pm = Xe(),
        Dm = require("fs"),
        Fm = require("path"),
        Xb = require("http"),
        Kb = Yi(),
        Jb = Ue(),
        qm = require("child_process"),
        Lm = require("crypto"),
        ka = class extends Kb.AppUpdater {
            constructor(t, r) {
                super(t, r),
                    (this.nativeUpdater = require("electron").autoUpdater),
                    (this.squirrelDownloadedUpdate = !1),
                    this.nativeUpdater.on("error", n => {
                        this._logger.warn(n), this.emit("error", n);
                    }),
                    this.nativeUpdater.on("update-downloaded", () => {
                        (this.squirrelDownloadedUpdate = !0), this.debug("nativeUpdater.update-downloaded");
                    });
            }
            debug(t) {
                this._logger.debug != null && this._logger.debug(t);
            }
            closeServerIfExists() {
                this.server &&
                    (this.debug("Closing proxy server"),
                    this.server.close(t => {
                        t &&
                            this.debug(
                                "proxy server wasn't already open, probably attempted closing again as a safety check before quit"
                            );
                    }));
            }
            async doDownloadUpdate(t) {
                let r = t.updateInfoAndProvider.provider.resolveFiles(t.updateInfoAndProvider.info),
                    n = this._logger,
                    i = "sysctl.proc_translated",
                    o = !1;
                try {
                    this.debug("Checking for macOS Rosetta environment"),
                        (o = (0, qm.execFileSync)("sysctl", [i], { encoding: "utf8" }).includes("".concat(i, ": 1"))),
                        n.info("Checked for macOS Rosetta environment (isRosetta=".concat(o, ")"));
                } catch (f) {
                    n.warn("sysctl shell command to check for macOS Rosetta environment failed: ".concat(f));
                }
                let s = !1;
                try {
                    this.debug("Checking for arm64 in uname");
                    let m = (0, qm.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
                    n.info("Checked 'uname -a': arm64=".concat(m)), (s = s || m);
                } catch (f) {
                    n.warn("uname shell command to check for arm64 failed: ".concat(f));
                }
                s = s || process.arch === "arm64" || o;
                let a = f => {
                    var m;
                    return (
                        f.url.pathname.includes("arm64") ||
                        ((m = f.info.url) === null || m === void 0 ? void 0 : m.includes("arm64"))
                    );
                };
                s && r.some(a) ? (r = r.filter(f => s === a(f))) : (r = r.filter(f => !a(f)));
                let l = (0, Jb.findFile)(r, "zip", ["pkg", "dmg"]);
                if (l == null)
                    throw (0, Rm.newError)(
                        "ZIP file not provided: ".concat((0, Rm.safeStringifyJson)(r)),
                        "ERR_UPDATER_ZIP_FILE_NOT_FOUND"
                    );
                let h = t.updateInfoAndProvider.provider,
                    c = "update.zip";
                return this.executeDownload({
                    fileExtension: "zip",
                    fileInfo: l,
                    downloadUpdateOptions: t,
                    task: async (f, m) => {
                        let p = Fm.join(this.downloadedUpdateHelper.cacheDir, c),
                            E = () =>
                                (0, Pm.pathExistsSync)(p)
                                    ? !t.disableDifferentialDownload
                                    : (n.info(
                                          "Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"
                                      ),
                                      !1),
                            _ = !0;
                        E() && (_ = await this.differentialDownloadInstaller(l, t, f, h, c)),
                            _ && (await this.httpExecutor.download(l.url, f, m));
                    },
                    done: f => {
                        if (!t.disableDifferentialDownload)
                            try {
                                let m = Fm.join(this.downloadedUpdateHelper.cacheDir, c);
                                (0, Dm.copyFileSync)(f.downloadedFile, m);
                            } catch (m) {
                                this._logger.warn(
                                    "Unable to copy file for caching for future differential downloads: ".concat(m.message)
                                );
                            }
                        return this.updateDownloaded(l, f);
                    }
                });
            }
            async updateDownloaded(t, r) {
                var n;
                let i = r.downloadedFile,
                    o = (n = t.info.size) !== null && n !== void 0 ? n : (await (0, Pm.stat)(i)).size,
                    s = this._logger,
                    a = "fileToProxy=".concat(t.url.href);
                this.closeServerIfExists(),
                    this.debug("Creating proxy server for native Squirrel.Mac (".concat(a, ")")),
                    (this.server = (0, Xb.createServer)()),
                    this.debug("Proxy server for native Squirrel.Mac is created (".concat(a, ")")),
                    this.server.on("close", () => {
                        s.info("Proxy server for native Squirrel.Mac is closed (".concat(a, ")"));
                    });
                let l = h => {
                    let c = h.address();
                    return typeof c == "string" ? c : "http://127.0.0.1:".concat(c?.port);
                };
                return await new Promise((h, c) => {
                    let f = (0, Lm.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"),
                        m = Buffer.from("autoupdater:".concat(f), "ascii"),
                        p = "/".concat((0, Lm.randomBytes)(64).toString("hex"), ".zip");
                    this.server.on("request", (E, _) => {
                        let v = E.url;
                        if ((s.info("".concat(v, " requested")), v === "/")) {
                            if (!E.headers.authorization || E.headers.authorization.indexOf("Basic ") === -1) {
                                (_.statusCode = 401),
                                    (_.statusMessage = "Invalid Authentication Credentials"),
                                    _.end(),
                                    s.warn("No authenthication info");
                                return;
                            }
                            let N = E.headers.authorization.split(" ")[1],
                                L = Buffer.from(N, "base64").toString("ascii"),
                                [De, V] = L.split(":");
                            if (De !== "autoupdater" || V !== f) {
                                (_.statusCode = 401),
                                    (_.statusMessage = "Invalid Authentication Credentials"),
                                    _.end(),
                                    s.warn("Invalid authenthication credentials");
                                return;
                            }
                            let ce = Buffer.from('{ "url": "'.concat(l(this.server)).concat(p, '" }'));
                            _.writeHead(200, { "Content-Type": "application/json", "Content-Length": ce.length }), _.end(ce);
                            return;
                        }
                        if (!v.startsWith(p)) {
                            s.warn("".concat(v, " requested, but not supported")), _.writeHead(404), _.end();
                            return;
                        }
                        s.info("".concat(p, " requested by Squirrel.Mac, pipe ").concat(i));
                        let T = !1;
                        _.on("finish", () => {
                            T || (this.nativeUpdater.removeListener("error", c), h([]));
                        });
                        let S = (0, Dm.createReadStream)(i);
                        S.on("error", N => {
                            try {
                                _.end();
                            } catch (L) {
                                s.warn("cannot end response: ".concat(L));
                            }
                            (T = !0),
                                this.nativeUpdater.removeListener("error", c),
                                c(new Error('Cannot pipe "'.concat(i, '": ').concat(N)));
                        }),
                            _.writeHead(200, { "Content-Type": "application/zip", "Content-Length": o }),
                            S.pipe(_);
                    }),
                        this.debug("Proxy server for native Squirrel.Mac is starting to listen (".concat(a, ")")),
                        this.server.listen(0, "127.0.0.1", () => {
                            this.debug(
                                "Proxy server for native Squirrel.Mac is listening (address="
                                    .concat(l(this.server), ", ")
                                    .concat(a, ")")
                            ),
                                this.nativeUpdater.setFeedURL({
                                    url: l(this.server),
                                    headers: {
                                        "Cache-Control": "no-cache",
                                        "Authorization": "Basic ".concat(m.toString("base64"))
                                    }
                                }),
                                this.dispatchUpdateDownloaded(r),
                                this.autoInstallOnAppQuit
                                    ? (this.nativeUpdater.once("error", c), this.nativeUpdater.checkForUpdates())
                                    : h([]);
                        });
                });
            }
            quitAndInstall() {
                this.squirrelDownloadedUpdate
                    ? (this.nativeUpdater.quitAndInstall(), this.closeServerIfExists())
                    : (this.nativeUpdater.on("update-downloaded", () => {
                          this.nativeUpdater.quitAndInstall(), this.closeServerIfExists();
                      }),
                      this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
            }
        };
    Zi.MacUpdater = ka;
});
var Mm = g(Ha => {
    "use strict";
    Object.defineProperty(Ha, "__esModule", { value: !0 });
    Ha.verifySignature = Zb;
    var Um = le(),
        km = require("child_process"),
        Qb = require("os"),
        $m = require("path");
    function Zb(e, t, r) {
        return new Promise((n, i) => {
            let o = t.replace(/'/g, "''");
            r.info("Verifying signature ".concat(o)),
                (0, km.execFile)(
                    'set "PSModulePath=" & chcp 65001 >NUL & powershell.exe',
                    [
                        "-NoProfile",
                        "-NonInteractive",
                        "-InputFormat",
                        "None",
                        "-Command",
                        "\"Get-AuthenticodeSignature -LiteralPath '".concat(o, "' | ConvertTo-Json -Compress\"")
                    ],
                    { shell: !0, timeout: 20 * 1e3 },
                    (s, a, l) => {
                        var h;
                        try {
                            if (s != null || l) {
                                Ba(r, s, l, i), n(null);
                                return;
                            }
                            let c = eO(a);
                            if (c.Status === 0) {
                                try {
                                    let E = $m.normalize(c.Path),
                                        _ = $m.normalize(t);
                                    if ((r.info("LiteralPath: ".concat(E, ". Update Path: ").concat(_)), E !== _)) {
                                        Ba(r, new Error("LiteralPath of ".concat(E, " is different than ").concat(_)), l, i),
                                            n(null);
                                        return;
                                    }
                                } catch (E) {
                                    r.warn(
                                        "Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ".concat(
                                            (h = E.message) !== null && h !== void 0 ? h : E.stack
                                        )
                                    );
                                }
                                let m = (0, Um.parseDn)(c.SignerCertificate.Subject),
                                    p = !1;
                                for (let E of e) {
                                    let _ = (0, Um.parseDn)(E);
                                    if (
                                        (_.size
                                            ? (p = Array.from(_.keys()).every(T => _.get(T) === m.get(T)))
                                            : E === m.get("CN") &&
                                              (r.warn(
                                                  "Signature validated using only CN ".concat(
                                                      E,
                                                      ". Please add your full Distinguished Name (DN) to publisherNames configuration"
                                                  )
                                              ),
                                              (p = !0)),
                                        p)
                                    ) {
                                        n(null);
                                        return;
                                    }
                                }
                            }
                            let f =
                                "publisherNames: ".concat(e.join(" | "), ", raw info: ") +
                                JSON.stringify(c, (m, p) => (m === "RawData" ? void 0 : p), 2);
                            r.warn("Sign verification failed, installer signed with incorrect certificate: ".concat(f)), n(f);
                        } catch (c) {
                            Ba(r, c, null, i), n(null);
                            return;
                        }
                    }
                );
        });
    }
    function eO(e) {
        let t = JSON.parse(e);
        delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
        let r = t.SignerCertificate;
        return (
            r != null && (delete r.Archived, delete r.Extensions, delete r.Handle, delete r.HasPrivateKey, delete r.SubjectName),
            t
        );
    }
    function Ba(e, t, r, n) {
        if (tO()) {
            e.warn(
                "Cannot execute Get-AuthenticodeSignature: ".concat(
                    t || r,
                    ". Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher."
                )
            );
            return;
        }
        try {
            (0, km.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], {
                timeout: 10 * 1e3
            });
        } catch (i) {
            e.warn(
                "Cannot execute ConvertTo-Json: ".concat(
                    i.message,
                    ". Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher."
                )
            );
            return;
        }
        t != null && n(t),
            r &&
                n(
                    new Error(
                        "Cannot execute Get-AuthenticodeSignature, stderr: ".concat(
                            r,
                            ". Failing signature validation due to unknown stderr."
                        )
                    )
                );
    }
    function tO() {
        let e = Qb.release();
        return e.startsWith("6.") && !e.startsWith("6.3");
    }
});
var Wa = g(to => {
    "use strict";
    Object.defineProperty(to, "__esModule", { value: !0 });
    to.NsisUpdater = void 0;
    var eo = le(),
        Bm = require("path"),
        rO = Er(),
        nO = Pa(),
        Hm = Bt(),
        iO = Ue(),
        oO = Xe(),
        sO = Mm(),
        jm = require("url"),
        ja = class extends rO.BaseUpdater {
            constructor(t, r) {
                super(t, r), (this._verifyUpdateCodeSignature = (n, i) => (0, sO.verifySignature)(n, i, this._logger));
            }
            get verifyUpdateCodeSignature() {
                return this._verifyUpdateCodeSignature;
            }
            set verifyUpdateCodeSignature(t) {
                t && (this._verifyUpdateCodeSignature = t);
            }
            doDownloadUpdate(t) {
                let r = t.updateInfoAndProvider.provider,
                    n = (0, iO.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "exe");
                return this.executeDownload({
                    fileExtension: "exe",
                    downloadUpdateOptions: t,
                    fileInfo: n,
                    task: async (i, o, s, a) => {
                        let l = n.packageInfo,
                            h = l != null && s != null;
                        if (h && t.disableWebInstaller)
                            throw (0, eo.newError)(
                                "Unable to download new version ".concat(
                                    t.updateInfoAndProvider.info.version,
                                    ". Web Installers are disabled"
                                ),
                                "ERR_UPDATER_WEB_INSTALLER_DISABLED"
                            );
                        !h &&
                            !t.disableWebInstaller &&
                            this._logger.warn(
                                "disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."
                            ),
                            (h ||
                                t.disableDifferentialDownload ||
                                (await this.differentialDownloadInstaller(n, t, i, r, eo.CURRENT_APP_INSTALLER_FILE_NAME))) &&
                                (await this.httpExecutor.download(n.url, i, o));
                        let c = await this.verifySignature(i);
                        if (c != null)
                            throw (
                                (await a(),
                                (0, eo.newError)(
                                    "New version "
                                        .concat(t.updateInfoAndProvider.info.version, " is not signed by the application owner: ")
                                        .concat(c),
                                    "ERR_UPDATER_INVALID_SIGNATURE"
                                ))
                            );
                        if (h && (await this.differentialDownloadWebPackage(t, l, s, r)))
                            try {
                                await this.httpExecutor.download(new jm.URL(l.path), s, {
                                    headers: t.requestHeaders,
                                    cancellationToken: t.cancellationToken,
                                    sha512: l.sha512
                                });
                            } catch (f) {
                                try {
                                    await (0, oO.unlink)(s);
                                } catch {}
                                throw f;
                            }
                    }
                });
            }
            async verifySignature(t) {
                let r;
                try {
                    if (((r = (await this.configOnDisk.value).publisherName), r == null)) return null;
                } catch (n) {
                    if (n.code === "ENOENT") return null;
                    throw n;
                }
                return await this._verifyUpdateCodeSignature(Array.isArray(r) ? r : [r], t);
            }
            doInstall(t) {
                let r = ["--updated"];
                t.isSilent && r.push("/S"),
                    t.isForceRunAfter && r.push("--force-run"),
                    this.installDirectory && r.push("/D=".concat(this.installDirectory));
                let n = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
                n != null && r.push("--package-file=".concat(n));
                let i = () => {
                    this.spawnLog(Bm.join(process.resourcesPath, "elevate.exe"), [t.installerPath].concat(r)).catch(o =>
                        this.dispatchError(o)
                    );
                };
                return t.isAdminRightsRequired
                    ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), i(), !0)
                    : (this.spawnLog(t.installerPath, r).catch(o => {
                          let s = o.code;
                          this._logger.info(
                              "Cannot run installer: error code: "
                                  .concat(s, ', error message: "')
                                  .concat(
                                      o.message,
                                      '", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT'
                                  )
                          ),
                              s === "UNKNOWN" || s === "EACCES"
                                  ? i()
                                  : s === "ENOENT"
                                  ? require("electron")
                                        .shell.openPath(t.installerPath)
                                        .catch(a => this.dispatchError(a))
                                  : this.dispatchError(o);
                      }),
                      !0);
            }
            async differentialDownloadWebPackage(t, r, n, i) {
                if (r.blockMapSize == null) return !0;
                try {
                    let o = {
                        newUrl: new jm.URL(r.path),
                        oldFile: Bm.join(this.downloadedUpdateHelper.cacheDir, eo.CURRENT_APP_PACKAGE_FILE_NAME),
                        logger: this._logger,
                        newFile: n,
                        requestHeaders: this.requestHeaders,
                        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
                        cancellationToken: t.cancellationToken
                    };
                    this.listenerCount(Hm.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = s => this.emit(Hm.DOWNLOAD_PROGRESS, s)),
                        await new nO.FileWithEmbeddedBlockMapDifferentialDownloader(r, this.httpExecutor, o).download();
                } catch (o) {
                    return (
                        this._logger.error("Cannot download differentially, fallback to full download: ".concat(o.stack || o)),
                        process.platform === "win32"
                    );
                }
                return !1;
            }
        };
    to.NsisUpdater = ja;
});
var Bt = g(M => {
    "use strict";
    Object.defineProperty(M, "__esModule", { value: !0 });
    M.UpdaterSignal =
        M.UPDATE_DOWNLOADED =
        M.DOWNLOAD_PROGRESS =
        M.NsisUpdater =
        M.MacUpdater =
        M.RpmUpdater =
        M.DebUpdater =
        M.AppImageUpdater =
        M.Provider =
        M.CancellationToken =
        M.NoOpLogger =
        M.AppUpdater =
        M.BaseUpdater =
            void 0;
    var aO = le();
    Object.defineProperty(M, "CancellationToken", {
        enumerable: !0,
        get: function () {
            return aO.CancellationToken;
        }
    });
    var Wm = Xe(),
        lO = require("path"),
        uO = Er();
    Object.defineProperty(M, "BaseUpdater", {
        enumerable: !0,
        get: function () {
            return uO.BaseUpdater;
        }
    });
    var Gm = Yi();
    Object.defineProperty(M, "AppUpdater", {
        enumerable: !0,
        get: function () {
            return Gm.AppUpdater;
        }
    });
    Object.defineProperty(M, "NoOpLogger", {
        enumerable: !0,
        get: function () {
            return Gm.NoOpLogger;
        }
    });
    var cO = Ue();
    Object.defineProperty(M, "Provider", {
        enumerable: !0,
        get: function () {
            return cO.Provider;
        }
    });
    var fO = Fa();
    Object.defineProperty(M, "AppImageUpdater", {
        enumerable: !0,
        get: function () {
            return fO.AppImageUpdater;
        }
    });
    var dO = La();
    Object.defineProperty(M, "DebUpdater", {
        enumerable: !0,
        get: function () {
            return dO.DebUpdater;
        }
    });
    var hO = $a();
    Object.defineProperty(M, "RpmUpdater", {
        enumerable: !0,
        get: function () {
            return hO.RpmUpdater;
        }
    });
    var pO = Ma();
    Object.defineProperty(M, "MacUpdater", {
        enumerable: !0,
        get: function () {
            return pO.MacUpdater;
        }
    });
    var mO = Wa();
    Object.defineProperty(M, "NsisUpdater", {
        enumerable: !0,
        get: function () {
            return mO.NsisUpdater;
        }
    });
    var Et;
    function gO() {
        if (process.platform === "win32") Et = new (Wa().NsisUpdater)();
        else if (process.platform === "darwin") Et = new (Ma().MacUpdater)();
        else {
            Et = new (Fa().AppImageUpdater)();
            try {
                let e = lO.join(process.resourcesPath, "package-type");
                if (!(0, Wm.existsSync)(e)) return Et;
                console.info("Checking for beta autoupdate feature for deb/rpm distributions");
                let t = (0, Wm.readFileSync)(e).toString().trim();
                switch ((console.info("Found package-type:", t), t)) {
                    case "deb":
                        Et = new (La().DebUpdater)();
                        break;
                    case "rpm":
                        Et = new ($a().RpmUpdater)();
                        break;
                    default:
                        break;
                }
            } catch (e) {
                console.warn(
                    "Unable to detect 'package-type' for autoUpdater (beta rpm/deb support). If you'd like to expand support, please consider contributing to electron-builder",
                    e.message
                );
            }
        }
        return Et;
    }
    Object.defineProperty(M, "autoUpdater", { enumerable: !0, get: () => Et || gO() });
    M.DOWNLOAD_PROGRESS = "download-progress";
    M.UPDATE_DOWNLOADED = "update-downloaded";
    var Ga = class {
        constructor(t) {
            this.emitter = t;
        }
        login(t) {
            ro(this.emitter, "login", t);
        }
        progress(t) {
            ro(this.emitter, M.DOWNLOAD_PROGRESS, t);
        }
        updateDownloaded(t) {
            ro(this.emitter, M.UPDATE_DOWNLOADED, t);
        }
        updateCancelled(t) {
            ro(this.emitter, "update-cancelled", t);
        }
    };
    M.UpdaterSignal = Ga;
    var wO = !1;
    function ro(e, t, r) {
        wO
            ? e.on(t, (...n) => {
                  console.log("%s %s", t, n), r(...n);
              })
            : e.on(t, r);
    }
});
var no = g((VN, Vm) => {
    var mn;
    Vm.exports = ((mn = class {}), x(mn, "WINDOWS", "win32"), x(mn, "MACOS", "darwin"), x(mn, "LINUX", "linux"), mn);
});
var _t = g((XN, Ym) => {
    Ym.exports = class {
        constructor(t) {
            x(this, "_oglama");
            this._oglama = t;
        }
    };
});
var Xm = g((QN, zm) => {
    var yO = require("path"),
        EO = _t();
    zm.exports = class extends EO {
        async start() {
            let t = yO.join(this._oglama.rootPath, "res", "index.html"),
                r = { extraHeaders: "pragma: no-cache" };
            this._oglama.mainWindow().loadFile(t, r),
                this._oglama.loginWindow().loadFile(t, r),
                this._oglama.mainWindow().hide(),
                this._oglama.loginWindow().show();
        }
    };
});
var Jm = g((eR, Km) => {
    var _O = _t();
    Km.exports = class extends _O {
        getMainMinWidth() {
            return 1024;
        }
        getMainMinHeight() {
            return 580;
        }
        getLoginWidth() {
            return 512;
        }
        getLoginHeight() {
            return 512;
        }
        getPort() {
            return 7199;
        }
    };
});
var eg = g((rR, Zm) => {
    var vO = _t(),
        Qm = require("fs");
    Zm.exports = class extends vO {
        isFile(t) {
            let r = !1;
            try {
                r = Qm.statSync(t).isFile();
            } catch {}
            return r;
        }
        readJSON(t) {
            let r = null,
                n = this.readFile(t);
            return n && (r = this._oglama.utils.parseJSON(n)), r;
        }
        readFile(t) {
            let r = null;
            try {
                let n = Qm.readFileSync(t);
                r = Buffer.isBuffer(n) ? n.toString() : n;
            } catch (n) {
                this._oglama.log.error("file:readFile", t, n);
            }
            return r;
        }
    };
});
var rg = g((iR, tg) => {
    var AO = _t();
    tg.exports = class extends AO {
        error() {
            console.error("%coglama-error", "color:red", ...arguments);
        }
        info() {
            console.info("%coglama-info", "color:lightblue", ...arguments);
        }
    };
});
var ig = g((sR, ng) => {
    var SO = _t(),
        CO = require("querystring");
    ng.exports = class extends SO {
        isJSON(t) {
            return typeof t == "string" && (t.charAt(0) == "{" || t.charAt(0) == "[");
        }
        isObject(t) {
            return typeof t == "object" && t !== null;
        }
        parseJSON(t) {
            let r = null;
            if (t !== null && this.isJSON(t))
                try {
                    t.content && (t = t.content), (r = JSON.parse(t));
                } catch (n) {
                    this._oglama.log.error("utils:parseJSON", n);
                }
            return r;
        }
        formatJSON(t, r) {
            typeof r > "u" && (r = null);
            let n = null;
            if (this.isObject(t)) {
                t.content && (t = t.content);
                try {
                    n = JSON.stringify(t, null, r);
                } catch (i) {
                    this._oglama.log.error("utils:formatJSON", i);
                }
            }
            return n;
        }
        mergeObjects(...t) {
            let r = this.isObject,
                n = this.mergeObjects;
            return t.reduce(
                (i, o) => (
                    Object.keys(o).forEach(s => {
                        let a = i[s],
                            l = o[s];
                        do {
                            if (Array.isArray(a) && Array.isArray(l)) {
                                i[s] = a.concat(...l);
                                break;
                            }
                            if (r(a) && r(l)) {
                                i[s] = n(a, l);
                                break;
                            }
                        } while (!1);
                        i[s] = l;
                    }),
                    i
                ),
                {}
            );
        }
        urlFormat(t) {
            let r = null;
            do {
                if (!this.isObject(t)) break;
                let n = (t.protocol || "http") + "://";
                if (t.host) n += t.host;
                else if (t.hostname) (n += t.hostname), t.port && (n += ":" + t.port);
                else break;
                if (t.pathname) {
                    n = n.replace(/\/+$/, "");
                    let i = t.pathname.replace(/^\/+/, "");
                    n += "/" + i;
                }
                r = t.query ? n + "?" + CO.stringify(t.query) : n;
            } while (!1);
            return r;
        }
    };
});
var sg = g((lR, og) => {
    var TO = _t(),
        io = require("fs"),
        oo = require("path"),
        bO = require("http"),
        Va;
    og.exports =
        ((Va = class extends TO {
            start() {
                if (this.constructor._instance === null) {
                    let t = oo.join(this._oglama.rootPath, "ssg"),
                        r = this._oglama.config.getPort();
                    this.constructor._instance = new Promise((n, i) => {
                        if (this._oglama.devMode) {
                            n(null);
                            return;
                        }
                        try {
                            let o = bO.createServer((s, a) => {
                                let l = ".empty";
                                try {
                                    let c = new URL(s.url, "http://0.0.0.0");
                                    l = decodeURIComponent(c.pathname).replace(/^\/+|\/+$/g, "");
                                } catch {}
                                let h = oo.join(t, l);
                                io.statSync(h, { throwIfNoEntry: !1 })?.isDirectory() && (h = oo.join(h, "index.html")),
                                    io.access(h, io.constants.F_OK, c => {
                                        if (c) {
                                            a.writeHead(404, { "Content-Type": "text/plain" }), a.end("Not Found: ".concat(c));
                                            return;
                                        }
                                        io.readFile(h, (f, m) => {
                                            if (f) {
                                                a.writeHead(500, { "Content-Type": "text/plain" }),
                                                    a.end("Internal Server Error: ".concat(f));
                                                return;
                                            }
                                            let p = oo.extname(h),
                                                E =
                                                    {
                                                        ".json": "application/json",
                                                        ".woff2": "font/woff2",
                                                        ".html": "text/html",
                                                        ".js": "text/javascript",
                                                        ".txt": "text/plain",
                                                        ".css": "text/css",
                                                        ".ico": "image/x-icon",
                                                        ".jpg": "image/jpeg",
                                                        ".png": "image/png",
                                                        ".gif": "image/gif",
                                                        ".svg": "image/svg+xml"
                                                    }[p] || "application/octet-stream";
                                            a.writeHead(200, { "Content-Type": E }), a.end(m);
                                        });
                                    });
                            });
                            o.listen(r, () => {
                                this._oglama.log.info("webserver:start", "Listening on port ".concat(r)), n(o);
                            });
                        } catch (o) {
                            this._oglama.log.error("webserver:start", o), i(o);
                        }
                    });
                }
                return this.constructor._instance;
            }
        }),
        x(Va, "_instance", null),
        Va);
});
var gn = g((fR, ag) => {
    var OO = _t(),
        { ipcMain: xO } = require("electron");
    ag.exports = class extends OO {
        constructor(t) {
            super(t);
        }
        _register(t) {
            if (typeof t == "string")
                for (let r of Object.getOwnPropertyNames(this)) {
                    if (["_", "#"].includes(r[0] || typeof this[r] != "function")) continue;
                    let n = this[r];
                    xO.handle("ipc:".concat(t, ":").concat(r), async (i, ...o) => {
                        let s = null;
                        try {
                            s = typeof n == "function" ? await n(...o) : null;
                        } catch (a) {
                            this._oglama.devMode && console.debug(a), (s = a);
                        }
                        return s;
                    });
                }
        }
    };
});
var cg = g((hR, ug) => {
    var { execSync: Ya } = require("child_process"),
        IO = gn(),
        we = no(),
        vr,
        Ar,
        Sr,
        vt,
        lg;
    ug.exports =
        ((lg = class extends IO {
            constructor(r) {
                super(r);
                Q(this, vr, null);
                Q(this, Ar, null);
                Q(this, Sr, null);
                Q(this, vt, null);
                x(this, "getOS", () => {
                    if (typeof C(this, vt) != "string")
                        switch (process.platform) {
                            case we.MACOS:
                                te(this, vt, "macos");
                                break;
                            case we.WINDOWS:
                                te(this, vt, "windows");
                                break;
                            case we.LINUX:
                                te(this, vt, "linux");
                                break;
                        }
                    return C(this, vt);
                });
                x(this, "getName", () => {
                    if (typeof C(this, Ar) != "string") {
                        let r = null;
                        switch (process.platform) {
                            case we.MACOS:
                                r = "echo $(scutil --get LocalHostName).local";
                                break;
                            case we.WINDOWS:
                            case we.LINUX:
                                r = "hostname";
                                break;
                        }
                        if (r !== null)
                            try {
                                let n = Ya(r).toString();
                                te(this, Ar, n.replace(/[\r\n\s]+/g, "").toLowerCase());
                            } catch (n) {
                                this._oglama.devMode && console.warn("Device Name", "".concat(n));
                            }
                    }
                    return C(this, Ar);
                });
                x(this, "getUUID", () => {
                    if (typeof C(this, vr) != "string") {
                        let r = null,
                            n =
                                process.arch === "ia32" && process.env.hasOwnProperty("PROCESSOR_ARCHITEW6432")
                                    ? "%windir%\\sysnative\\cmd.exe /c %windir%\\System32"
                                    : "%windir%\\System32";
                        switch (process.platform) {
                            case we.MACOS:
                                r = "ioreg -rd1 -c IOPlatformExpertDevice";
                                break;
                            case we.WINDOWS:
                                r =
                                    "".concat(n, "\\REG.exe") +
                                    " QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid";
                                break;
                            case we.LINUX:
                                r = "( cat /var/lib/dbus/machine-id /etc/machine-id 2> /dev/null || hostname ) | head -n 1 || :";
                                break;
                        }
                        if (r !== null)
                            try {
                                let i = Ya(r).toString();
                                switch (process.platform) {
                                    case we.MACOS:
                                        i = i.replace(/^.*?\bIOPlatformUUID"\s*=\s*"(.*?)".*$/gs, "$1");
                                        break;
                                    case we.WINDOWS:
                                        i = i.split("REG_SZ")[1];
                                        break;
                                }
                                te(this, vr, i.replace(/[\r\n\s]+/g, "").toLowerCase());
                            } catch (i) {
                                this._oglama.devMode && console.warn("Device UUID", "".concat(i));
                            }
                    }
                    return C(this, vr);
                });
                x(this, "getSerialNumber", () => {
                    if (typeof C(this, Sr) != "string") {
                        let r = null;
                        switch (process.platform) {
                            case we.MACOS:
                                r = "ioreg -l | grep IOPlatformSerialNumber";
                                break;
                            case we.WINDOWS:
                                r = "wmic bios get SerialNumber";
                                break;
                            case we.LINUX:
                                r = 'lsblk -o UUID -n /dev/sda* | grep -v "^$" | grep -vE "^.{,20}$" | sed -n 1p';
                                break;
                        }
                        if (r !== null)
                            try {
                                let n = Ya(r).toString();
                                switch (process.platform) {
                                    case we.MACOS:
                                        n = n.replace(/^.*?\bIOPlatformSerialNumber"\s*=\s*"(.*?)".*$/gs, "$1");
                                        break;
                                    case we.WINDOWS:
                                        n = n.split("SerialNumber")[1];
                                        break;
                                }
                                te(this, Sr, n.replace(/[\r\n\s]+/g, "").toLowerCase());
                            } catch (n) {
                                this._oglama.devMode && console.warn("Device Serial Number", "".concat(n));
                            }
                    }
                    return C(this, Sr);
                });
                x(this, "setPostAuth", r => this._oglama.setPostAuth(!!r));
                x(this, "getPostAuth", () => this._oglama.getPostAuth());
                this._register("device");
            }
        }),
        (vr = new WeakMap()),
        (Ar = new WeakMap()),
        (Sr = new WeakMap()),
        (vt = new WeakMap()),
        lg);
});
var wn = g((mR, fg) => {
    var tt;
    fg.exports =
        ((tt = class {
            static getTargetChannelName(t) {
                return "".concat(tt.WINDOW_TARGET, "/").concat(t);
            }
        }),
        x(tt, "WINDOW_MAIN", "@main"),
        x(tt, "WINDOW_LOGIN", "@login"),
        x(tt, "WINDOW_TARGET", "@target"),
        tt);
});
var mg = g((yR, pg) => {
    var { ipcMain: dg, BrowserView: Cr } = require("electron"),
        hg = require("path"),
        za = no(),
        NO = gn(),
        RO = wn(),
        yn,
        En,
        _n,
        vn,
        k,
        Ge,
        Ve,
        Ht;
    pg.exports =
        ((yn = class extends NO {
            constructor(r) {
                super(r);
                Q(this, En);
                Q(this, _n);
                Q(this, vn, "");
                Q(this, k, {});
                Q(this, Ge, {});
                Q(this, Ve, "");
                x(this, "setWindowSize", (r, n) => {
                    te(this, En, r), te(this, _n, n), C(this, Ht).call(this);
                });
                x(this, "list", () => Object.keys(C(this, k)));
                x(this, "removeAll", () => {
                    let r = Object.keys(C(this, k)).length > 0;
                    for (let n of Object.keys(C(this, k))) this.remove(n);
                    return r;
                });
                x(this, "add", (r, n, i = !1) => {
                    if (typeof r != "string" || !r.length) throw new Error("Invalid target ID");
                    if (typeof n != "string" || !n.match(/^https?:\/\//gi)) throw new Error("Invalid target URL");
                    if (C(this, k)[r] instanceof Cr) return !1;
                    let o = new Cr({
                        width: this._oglama.config.getMainMinWidth() - this.constructor.MARGIN_LEFT,
                        height:
                            this._oglama.config.getMainMinHeight() -
                            (this.constructor.MARGIN_TOP + this.constructor.MARGIN_BOTTOM),
                        resizable: !1,
                        backgroundColor: "#333",
                        transparent: !0,
                        webPreferences: {
                            backgroundThrottling: !1,
                            imageAnimationPolicy: "noAnimation",
                            spellcheck: !1,
                            preload: hg.join(this._oglama.rootPath, "lib/preloader/entry/target.js"),
                            nodeIntegration: !0,
                            devTools: !0,
                            partition: "persist:target-".concat(r),
                            cache: !1,
                            additionalArguments: ["--target-id=".concat(r)]
                        }
                    });
                    (o.metadata = { targetUrl: n, loaded: !1 }),
                        o.webContents.once("ready-to-show", () => o.webContents.setZoomFactor(1)),
                        o.webContents.on("dom-ready", () => o.webContents.focus()),
                        o.webContents.setUserAgent(C(this, vn)),
                        o.webContents.setZoomLevel(0),
                        o.webContents.setAudioMuted(!0),
                        o.webContents.loadFile(hg.join(this._oglama.rootPath, "res", "index.html"), {
                            extraHeaders: "pragma: no-cache"
                        }),
                        o.webContents.on("context-menu", (a, l) => {
                            a.preventDefault(), o.webContents.openDevTools({ mode: "detach" });
                        }),
                        this._oglama.mainWindow().addBrowserView(o),
                        this._oglama.main.view instanceof Cr &&
                            (this._oglama.mainWindow().removeBrowserView(this._oglama.main.view),
                            this._oglama.mainWindow().addBrowserView(this._oglama.main.view)),
                        (C(this, k)[r] = o);
                    let s = RO.getTargetChannelName(r);
                    return (
                        (C(this, Ge)[r] = {
                            channel: s,
                            listener: (a, ...l) => {
                                this._oglama.devMode && console.log("\u{1F3AF} ".concat(s), JSON.stringify(l)),
                                    l.length >= 3 && o.webContents.send(s, l);
                            }
                        }),
                        dg.on(C(this, Ge)[r].channel, C(this, Ge)[r].listener),
                        i ? this.select(r) : C(this, Ht).call(this),
                        !0
                    );
                });
                x(this, "remove", r => {
                    if (typeof r != "string" || !r.length) throw new Error("Invalid target ID");
                    if (!(C(this, k)[r] instanceof Cr) || typeof C(this, Ge)[r] > "u") return !1;
                    dg.off(C(this, Ge)[r].channel, C(this, Ge)[r].listener), delete C(this, Ge)[r];
                    try {
                        this._oglama.mainWindow().removeBrowserView(C(this, k)[r]);
                    } catch {}
                    try {
                        C(this, k)[r].webContents.destroy();
                    } catch {}
                    return delete C(this, k)[r], r === C(this, Ve) && te(this, Ve, ""), C(this, Ht).call(this), !0;
                });
                x(this, "select", r => {
                    if (typeof r != "string" || !r.length) throw new Error("Invalid target ID");
                    if (C(this, k)[r] instanceof Cr && C(this, Ve) !== r) {
                        te(this, Ve, r),
                            C(this, k)[r].metadata.loaded ||
                                ((C(this, k)[r].metadata.loaded = !0),
                                C(this, k)[r].webContents.loadURL(C(this, k)[r].metadata.targetUrl));
                        let n = {};
                        for (let i of Object.keys(C(this, k)).filter(o => o !== r)) n[i] = C(this, k)[i];
                        return (
                            (n[r] = C(this, k)[r]),
                            te(this, k, n),
                            this._oglama.mainWindow().removeBrowserView(C(this, k)[r]),
                            this._oglama.mainWindow().removeBrowserView(this._oglama.main.view),
                            this._oglama.main.onTop
                                ? (this._oglama.mainWindow().addBrowserView(C(this, k)[r]),
                                  this._oglama.mainWindow().addBrowserView(this._oglama.main.view),
                                  this._oglama.main.view.webContents.focus())
                                : (this._oglama.mainWindow().addBrowserView(this._oglama.main.view),
                                  this._oglama.mainWindow().addBrowserView(C(this, k)[r]),
                                  C(this, k)[r].webContents.focus()),
                            C(this, Ht).call(this),
                            !0
                        );
                    }
                    return !1;
                });
                x(this, "getSelected", () => C(this, Ve));
                x(this, "getTargets", () => C(this, k));
                x(this, "webContents", async (r, n, i) => {
                    if (
                        (this._oglama.devMode &&
                            console.log("ipc.target.webContents", JSON.stringify({ targetId: r, methodName: n, methodArgs: i })),
                        typeof r != "string" || !r.length)
                    )
                        throw new Error("Invalid target ID");
                    if (!(C(this, k)[r] instanceof Cr)) throw new Error("Invalid target ID");
                    if (typeof n != "string" || typeof C(this, k)[r].webContents[n] != "function")
                        throw new Error("Invalid target webContents method: ".concat(n));
                    return (
                        n === "loadURL" && (C(this, k)[r].metadata.loaded = !0),
                        Array.isArray(i) || (i = []),
                        await C(this, k)[r].webContents[n](...i)
                    );
                });
                Q(this, Ht, () => {
                    if (!Object.keys(C(this, k)).length) return;
                    let r = C(this, En) - this.constructor.MARGIN_LEFT,
                        n = C(this, _n) - (this.constructor.MARGIN_TOP + this.constructor.MARGIN_BOTTOM);
                    for (let i of Object.keys(C(this, k))) {
                        let o = i === C(this, Ve) ? this.constructor.MARGIN_LEFT : 100 - r,
                            s = i === C(this, Ve) ? this.constructor.MARGIN_TOP : 50 - n;
                        C(this, k)[i].setBounds({ x: o, y: s, width: r, height: n });
                    }
                });
                let n = "";
                switch (process.platform) {
                    case za.MACOS:
                        n = "(Macintosh; Intel Mac OS X 13_3)";
                        break;
                    case za.WINDOWS:
                        n = "(Windows NT 10.0; Win64; x64)";
                        break;
                    case za.LINUX:
                        n = "(X11; Linux x86_64)";
                        break;
                }
                te(this, vn, "Mozilla/5.0 ".concat(n, " AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36")),
                    this._register("target");
            }
        }),
        (En = new WeakMap()),
        (_n = new WeakMap()),
        (vn = new WeakMap()),
        (k = new WeakMap()),
        (Ge = new WeakMap()),
        (Ve = new WeakMap()),
        (Ht = new WeakMap()),
        x(yn, "MARGIN_LEFT", 250),
        x(yn, "MARGIN_TOP", 50),
        x(yn, "MARGIN_BOTTOM", 50),
        yn);
});
var yg = g((vR, wg) => {
    var { session: PO, shell: DO, ipcMain: FO, BrowserView: Xa } = require("electron"),
        qO = require("path"),
        LO = gn(),
        Ka = wn(),
        so,
        gg;
    wg.exports =
        ((gg = class extends LO {
            constructor(r) {
                super(r);
                x(this, "windowWidth");
                x(this, "windowHeight");
                x(this, "view", null);
                x(this, "darkMode", !0);
                Q(this, so, () =>
                    this.view instanceof Xa
                        ? (this.view.setBounds({ x: 0, y: 0, width: this.windowWidth, height: this.windowHeight }), !0)
                        : !1
                );
                x(this, "init", () =>
                    this.view instanceof Xa
                        ? !1
                        : ((this.windowWidth = this._oglama.config.getLoginWidth()),
                          (this.windowHeight = this._oglama.config.getLoginHeight()),
                          (this.view = new Xa({
                              width: this.windowWidth,
                              height: this.windowHeight,
                              resizable: !1,
                              backgroundColor: "#00000000",
                              transparent: !0,
                              webPreferences: {
                                  backgroundThrottling: !1,
                                  imageAnimationPolicy: "noAnimation",
                                  spellcheck: !1,
                                  preload: qO.join(this._oglama.rootPath, "lib/preloader/entry/login.js"),
                                  nodeIntegration: !0,
                                  devTools: this._oglama.devMode,
                                  session: PO.defaultSession,
                                  cache: !1,
                                  webSecurity: !1,
                                  allowRunningInsecureContent: !0
                              }
                          })),
                          this.view.webContents.on("ready-to-show", () => this.view.webContents.setZoomFactor(1)),
                          this.view.webContents.setZoomLevel(0),
                          this.view.webContents.setAudioMuted(!1),
                          this.view.webContents.loadURL("http://localhost:".concat(this._oglama.config.getPort(), "/login/")),
                          this.view.webContents.on("dom-ready", () => this.view.webContents.focus()),
                          this._oglama.devMode &&
                              this.view.webContents.on("context-menu", (r, n) => {
                                  r.preventDefault(), this.view.webContents.openDevTools({ mode: "detach" });
                              }),
                          FO.on(Ka.WINDOW_LOGIN, (r, ...n) => {
                              this._oglama.devMode && console.log("\u{1F3E0} ".concat(Ka.WINDOW_LOGIN), JSON.stringify(n)),
                                  n.length >= 3 && this.view.webContents.send(Ka.WINDOW_LOGIN, n);
                          }),
                          this._oglama.loginWindow().addBrowserView(this.view),
                          C(this, so).call(this),
                          !0)
                );
                x(this, "openExternal", r => {
                    typeof r == "string" && DO.openExternal(r);
                });
                this._register("login");
            }
        }),
        (so = new WeakMap()),
        gg);
});
var vg = g((CR, _g) => {
    var { app: UO, session: $O, shell: kO, ipcMain: MO, BrowserView: ao } = require("electron"),
        BO = require("path"),
        HO = gn(),
        Ja = wn(),
        Tr,
        Eg;
    _g.exports =
        ((Eg = class extends HO {
            constructor(r) {
                super(r);
                x(this, "windowWidth");
                x(this, "windowHeight");
                x(this, "view", null);
                x(this, "onTop", !1);
                x(this, "darkMode", !0);
                Q(this, Tr, () =>
                    this.view instanceof ao
                        ? (this.view.setBounds({ x: 0, y: 0, width: this.windowWidth, height: this.windowHeight }), !0)
                        : !1
                );
                x(this, "init", () =>
                    this.view instanceof ao
                        ? !1
                        : ((this.windowWidth = this._oglama.config.getMainMinWidth()),
                          (this.windowHeight = this._oglama.config.getMainMinHeight()),
                          (this.view = new ao({
                              width: this.windowWidth,
                              height: this.windowHeight,
                              resizable: !1,
                              backgroundColor: "#00000000",
                              transparent: !0,
                              webPreferences: {
                                  backgroundThrottling: !1,
                                  imageAnimationPolicy: "noAnimation",
                                  spellcheck: !1,
                                  preload: BO.join(this._oglama.rootPath, "lib/preloader/entry/main.js"),
                                  nodeIntegration: !0,
                                  devTools: this._oglama.devMode,
                                  session: $O.defaultSession,
                                  cache: !1,
                                  webSecurity: !1,
                                  allowRunningInsecureContent: !0
                              }
                          })),
                          this.view.webContents.on("ready-to-show", () => this.view.webContents.setZoomFactor(1)),
                          this.view.webContents.setZoomLevel(0),
                          this.view.webContents.setAudioMuted(!1),
                          this.view.webContents.loadURL("http://localhost:".concat(this._oglama.config.getPort())),
                          this.view.webContents.on("dom-ready", () => this.view.webContents.focus()),
                          this._oglama.devMode &&
                              this.view.webContents.on("context-menu", (r, n) => {
                                  r.preventDefault(), this.view.webContents.openDevTools({ mode: "detach" });
                              }),
                          MO.on(Ja.WINDOW_MAIN, (r, ...n) => {
                              this._oglama.devMode && console.log("\u{1F3E0} ".concat(Ja.WINDOW_MAIN), JSON.stringify(n)),
                                  n.length >= 3 && this.view.webContents.send(Ja.WINDOW_MAIN, n);
                          }),
                          this._oglama.mainWindow().addBrowserView(this.view),
                          C(this, Tr).call(this),
                          !0)
                );
                x(this, "setWindowSize", (r, n) => {
                    (this.windowWidth = r), (this.windowHeight = n), C(this, Tr).call(this);
                });
                x(this, "setOnTop", r => {
                    let n = !1;
                    if (((r = !!r), this.getOnTop() !== r)) {
                        if (((this.onTop = r), this.onTop))
                            this._oglama.mainWindow().removeBrowserView(this.view),
                                this._oglama.mainWindow().addBrowserView(this.view),
                                this.view?.webContents?.focus();
                        else {
                            let i = this._oglama.target.getSelected();
                            if (typeof i == "string" && i.length) {
                                let o = this._oglama.target.getTargets()[i];
                                o instanceof ao &&
                                    (this._oglama.mainWindow().removeBrowserView(o),
                                    this._oglama.mainWindow().removeBrowserView(this.view),
                                    this._oglama.mainWindow().addBrowserView(this.view),
                                    this._oglama.mainWindow().addBrowserView(o),
                                    o.webContents.focus());
                            }
                        }
                        C(this, Tr).call(this), (n = !0);
                    }
                    return n;
                });
                x(this, "getOnTop", () => this.onTop);
                x(this, "setDarkMode", r => {
                    let n = !1;
                    return (
                        (r = !!r),
                        this.getDarkMode() !== r &&
                            ((this.darkMode = r), this._oglama.mainWindow().setBackgroundColor(r ? "#333" : "#fff"), (n = !0)),
                        n
                    );
                });
                x(this, "quit", () => {
                    UO.quit();
                });
                x(this, "getDarkMode", () => this.darkMode);
                x(this, "openExternal", r => {
                    typeof r == "string" && kO.openExternal(r);
                });
                this._register("main");
            }
        }),
        (Tr = new WeakMap()),
        Eg);
});
var Og = g((OR, bg) => {
    var { app: Qa, session: Ag, BrowserWindow: Sg } = require("electron"),
        Cg = require("path"),
        Za = no(),
        jO = Xm(),
        WO = Jm(),
        GO = eg(),
        VO = rg(),
        YO = ig(),
        zO = sg(),
        XO = cg(),
        KO = mg(),
        JO = yg(),
        QO = vg(),
        el = wn(),
        Z,
        An,
        Sn,
        Be,
        Tg;
    bg.exports =
        ((Tg = class {
            constructor() {
                Q(this, Z, null);
                Q(this, An, null);
                Q(this, Sn, !1);
                Q(this, Be, null);
                x(this, "rootPath", Qa.getAppPath());
                x(this, "devMode", !1);
                x(this, "log", new VO(this));
                x(this, "webserver", new zO(this));
                x(this, "activity", new jO(this));
                x(this, "device", new XO(this));
                x(this, "target", new KO(this));
                x(this, "main", new QO(this));
                x(this, "login", new JO(this));
                x(this, "config", new WO(this));
                x(this, "file", new GO(this));
                x(this, "utils", new YO(this));
            }
            mainWindow() {
                let t = this;
                if (C(t, Z) === null) {
                    te(
                        t,
                        Z,
                        new Sg({
                            show: !1,
                            minWidth: t.config.getMainMinWidth(),
                            minHeight: t.config.getMainMinHeight(),
                            width: t.config.getMainMinWidth(),
                            height: t.config.getMainMinHeight(),
                            icon: Cg.join(t.rootPath, "res/icons/icon.png"),
                            resizable: !0,
                            fullscreenable: !1,
                            titleBarStyle: "default",
                            title: "Oglama",
                            useContentSize: !0,
                            backgroundColor: "#000",
                            webPreferences: { spellcheck: !1, nodeIntegration: !0, session: Ag.defaultSession }
                        })
                    ),
                        C(t, Z).setMaxListeners(0),
                        C(t, Z).on("closed", () => {
                            te(t, Z, null), Qa.quit();
                        });
                    let r = () => {
                        let n = C(t, Z).getSize(),
                            i = [Za.WINDOWS, Za.MACOS].includes(process.platform)
                                ? Math.abs(C(t, Z).getSize()[1] - C(t, Z).getContentSize()[1])
                                : 0,
                            o = [Za.WINDOWS].includes(process.platform)
                                ? Math.abs(C(t, Z).getSize()[0] - C(t, Z).getContentSize()[0])
                                : 0;
                        t.main.setWindowSize(n[0] - o, n[1] - i), t.target.setWindowSize(n[0] - o, n[1] - i);
                    };
                    C(t, Z).on("resize", () => r()),
                        C(t, Z).once("ready-to-show", () => r()),
                        t.main.init(),
                        t.main.view.webContents.on("did-finish-load", () => {
                            t.getPostAuth() && C(t, Z).show(), r();
                        }),
                        C(t, Z).setMenu(null),
                        te(
                            t,
                            An,
                            setInterval(() => {
                                if (C(t, Z) === null) {
                                    clearInterval(C(t, An));
                                    return;
                                }
                                let n = C(t, Z).getSize();
                                C(t, Z).setSize(n[0] + 1, n[1]), setTimeout(() => C(t, Z).setSize(n[0], n[1]), 250);
                            }, 9e4)
                        );
                }
                return C(t, Z);
            }
            loginWindow() {
                let t = this;
                return (
                    C(t, Be) === null &&
                        (te(
                            t,
                            Be,
                            new Sg({
                                width: t.config.getLoginWidth(),
                                height: t.config.getLoginHeight(),
                                icon: Cg.join(t.rootPath, "res/icons/icon.png"),
                                resizable: !1,
                                fullscreenable: !1,
                                transparent: !0,
                                titleBarStyle: "hidden",
                                title: "Oglama",
                                backgroundColor: "#00000000",
                                webPreferences: { spellcheck: !1, nodeIntegration: !0, session: Ag.defaultSession }
                            })
                        ),
                        C(t, Be).setMaxListeners(0),
                        C(t, Be).on("closed", () => {
                            te(t, Be, null), Qa.quit();
                        }),
                        t.login.init(),
                        t.login.view.webContents.on("did-finish-load", () => {
                            t.getPostAuth() || C(t, Be).show();
                        }),
                        C(t, Be).setMenu(null)),
                    C(t, Be)
                );
            }
            getPostAuth() {
                return C(this, Sn);
            }
            setPostAuth(t) {
                let r = !1;
                if (((t = !!t), t !== this.getPostAuth())) {
                    te(this, Sn, t);
                    let n = ["onPostAuth", [t], { type: "req", fromWin: el.WINDOW_LOGIN }];
                    this.login?.view.webContents.send(el.WINDOW_LOGIN, n),
                        setTimeout(() => {
                            this.main?.view.webContents.send(el.WINDOW_MAIN, n);
                        }, 750),
                        t
                            ? (this.mainWindow().show(), this.loginWindow().hide())
                            : (this.mainWindow().hide(), this.loginWindow().show()),
                        (r = !0);
                }
                return r;
            }
        }),
        (Z = new WeakMap()),
        (An = new WeakMap()),
        (Sn = new WeakMap()),
        (Be = new WeakMap()),
        Tg);
});
var { app: Ye, BrowserWindow: ZO } = require("electron"),
    { autoUpdater: tl } = Bt(),
    ex = Og();
Ye.disableHardwareAcceleration();
Ye.commandLine.appendSwitch("disable-gpu");
Ye.commandLine.appendSwitch("allow-insecure-localhost");
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
process.on("uncaughtException", e => {
    process.env.NODE_ENV === "development" && console.debug(e);
});
var $e = null;
do {
    if (!Ye.requestSingleInstanceLock()) {
        Ye.quit();
        break;
    }
    Ye.on("second-instance", () => {
        $e !== null &&
            ($e.getPostAuth()
                ? ($e.mainWindow().isMinimized() && $e.mainWindow().restore(), $e.mainWindow().show())
                : ($e.loginWindow().isMinimized() && $e.loginWindow().restore(), $e.loginWindow().show()));
    }),
        Ye.on("ready", async () => {
            ($e = new ex()),
                Ye.on("activate", () => {
                    ZO.getAllWindows().length === 0 && $e.activity.start();
                }),
                await $e.webserver.start(),
                await $e.activity.start(),
                tl.checkForUpdatesAndNotify();
        }),
        tl.on("update-downloaded", () => {
            dialog
                .showMessageBox({ type: "info", title: "Update ready", message: "Install now?", buttons: ["Yes", "Later"] })
                .then(e => {
                    e.response === 0 && tl.quitAndInstall();
                });
        }),
        Ye.on("window-all-closed", () => {
            process.platform !== "darwin" && Ye.quit();
        });
} while (!1);
