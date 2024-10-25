/*!
 * @architect Mark Jivko <mark@socialdetox.ai>
 * @copyright © 2024 SocialDetox.ai https://socialdetox.ai
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
var ol = e => {
    throw TypeError(e);
};
var Pg = (e, t, r) => (t in e ? Rg(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[t] = r));
var g = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var O = (e, t, r) => Pg(e, typeof t != "symbol" ? t + "" : t, r),
    sl = (e, t, r) => t.has(e) || ol("Cannot " + r);
var A = (e, t, r) => (sl(e, t, "read from private field"), r ? r.call(e) : t.get(e)),
    Q = (e, t, r) =>
        t.has(e) ? ol("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r),
    te = (e, t, r, n) => (sl(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r);
var An = g(Wt => {
    "use strict";
    Object.defineProperty(Wt, "__esModule", { value: !0 });
    Wt.CancellationError = Wt.CancellationToken = void 0;
    var Fg = require("events"),
        lo = class extends Fg.EventEmitter {
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
                if (this.cancelled) return Promise.reject(new Tr());
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
                                o(new Tr());
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
    Wt.CancellationToken = lo;
    var Tr = class extends Error {
        constructor() {
            super("cancelled");
        }
    };
    Wt.CancellationError = Tr;
});
var ll = g((rO, al) => {
    var Gt = 1e3,
        Vt = Gt * 60,
        Yt = Vt * 60,
        St = Yt * 24,
        qg = St * 7,
        Lg = St * 365.25;
    al.exports = function (e, t) {
        t = t || {};
        var r = typeof e;
        if (r === "string" && e.length > 0) return Ug(e);
        if (r === "number" && isFinite(e)) return t.long ? kg(e) : $g(e);
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e));
    };
    function Ug(e) {
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
                        return r * Lg;
                    case "weeks":
                    case "week":
                    case "w":
                        return r * qg;
                    case "days":
                    case "day":
                    case "d":
                        return r * St;
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
    function $g(e) {
        var t = Math.abs(e);
        return t >= St
            ? Math.round(e / St) + "d"
            : t >= Yt
            ? Math.round(e / Yt) + "h"
            : t >= Vt
            ? Math.round(e / Vt) + "m"
            : t >= Gt
            ? Math.round(e / Gt) + "s"
            : e + "ms";
    }
    function kg(e) {
        var t = Math.abs(e);
        return t >= St
            ? Cn(e, t, St, "day")
            : t >= Yt
            ? Cn(e, t, Yt, "hour")
            : t >= Vt
            ? Cn(e, t, Vt, "minute")
            : t >= Gt
            ? Cn(e, t, Gt, "second")
            : e + " ms";
    }
    function Cn(e, t, r, n) {
        var i = t >= r * 1.5;
        return Math.round(e / r) + " " + n + (i ? "s" : "");
    }
});
var uo = g((nO, ul) => {
    function Mg(e) {
        (r.debug = r),
            (r.default = r),
            (r.coerce = l),
            (r.disable = o),
            (r.enable = i),
            (r.enabled = s),
            (r.humanize = ll()),
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
                y;
            function _(...v) {
                if (!_.enabled) return;
                let C = _,
                    x = Number(new Date()),
                    N = x - (f || x);
                (C.diff = N),
                    (C.prev = f),
                    (C.curr = x),
                    (f = x),
                    (v[0] = r.coerce(v[0])),
                    typeof v[0] != "string" && v.unshift("%O");
                let L = 0;
                (v[0] = v[0].replace(/%([a-zA-Z%])/g, (V, ce) => {
                    if (V === "%%") return "%";
                    L++;
                    let E = r.formatters[ce];
                    if (typeof E == "function") {
                        let R = v[L];
                        (V = E.call(C, R)), v.splice(L, 1), L--;
                    }
                    return V;
                })),
                    r.formatArgs.call(C, v),
                    (C.log || r.log).apply(C, v);
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
                    get: () => (m !== null ? m : (p !== r.namespaces && ((p = r.namespaces), (y = r.enabled(c))), y)),
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
            let f,
                m = (typeof c == "string" ? c : "").split(/[\s,]+/),
                p = m.length;
            for (f = 0; f < p; f++)
                m[f] &&
                    ((c = m[f].replace(/\*/g, ".*?")),
                    c[0] === "-" ? r.skips.push(new RegExp("^" + c.slice(1) + "$")) : r.names.push(new RegExp("^" + c + "$")));
        }
        function o() {
            let c = [...r.names.map(a), ...r.skips.map(a).map(f => "-" + f)].join(",");
            return r.enable(""), c;
        }
        function s(c) {
            if (c[c.length - 1] === "*") return !0;
            let f, m;
            for (f = 0, m = r.skips.length; f < m; f++) if (r.skips[f].test(c)) return !1;
            for (f = 0, m = r.names.length; f < m; f++) if (r.names[f].test(c)) return !0;
            return !1;
        }
        function a(c) {
            return c
                .toString()
                .substring(2, c.toString().length - 2)
                .replace(/\.\*\?$/, "*");
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
    ul.exports = Mg;
});
var cl = g((Re, Tn) => {
    Re.formatArgs = Hg;
    Re.save = jg;
    Re.load = Wg;
    Re.useColors = Bg;
    Re.storage = Gg();
    Re.destroy = (() => {
        let e = !1;
        return () => {
            e ||
                ((e = !0),
                console.warn(
                    "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
                ));
        };
    })();
    Re.colors = [
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
    function Bg() {
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
    function Hg(e) {
        if (
            ((e[0] =
                (this.useColors ? "%c" : "") +
                this.namespace +
                (this.useColors ? " %c" : " ") +
                e[0] +
                (this.useColors ? "%c " : " ") +
                "+" +
                Tn.exports.humanize(this.diff)),
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
    Re.log = console.debug || console.log || (() => {});
    function jg(e) {
        try {
            e ? Re.storage.setItem("debug", e) : Re.storage.removeItem("debug");
        } catch {}
    }
    function Wg() {
        let e;
        try {
            e = Re.storage.getItem("debug");
        } catch {}
        return !e && typeof process < "u" && "env" in process && (e = process.env.DEBUG), e;
    }
    function Gg() {
        try {
            return localStorage;
        } catch {}
    }
    Tn.exports = uo()(Re);
    var { formatters: Vg } = Tn.exports;
    Vg.j = function (e) {
        try {
            return JSON.stringify(e);
        } catch (t) {
            return "[UnexpectedJSONParseError]: " + t.message;
        }
    };
});
var dl = g((iO, fl) => {
    "use strict";
    fl.exports = (e, t = process.argv) => {
        let r = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--",
            n = t.indexOf(r + e),
            i = t.indexOf("--");
        return n !== -1 && (i === -1 || n < i);
    };
});
var ml = g((oO, pl) => {
    "use strict";
    var Yg = require("os"),
        hl = require("tty"),
        Fe = dl(),
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
    function co(e) {
        return e === 0 ? !1 : { level: e, hasBasic: !0, has256: e >= 2, has16m: e >= 3 };
    }
    function fo(e, t) {
        if (nt === 0) return 0;
        if (Fe("color=16m") || Fe("color=full") || Fe("color=truecolor")) return 3;
        if (Fe("color=256")) return 2;
        if (e && !t && nt === void 0) return 0;
        let r = nt || 0;
        if (se.TERM === "dumb") return r;
        if (process.platform === "win32") {
            let n = Yg.release().split(".");
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
    function zg(e) {
        let t = fo(e, e && e.isTTY);
        return co(t);
    }
    pl.exports = { supportsColor: zg, stdout: co(fo(!0, hl.isatty(1))), stderr: co(fo(!0, hl.isatty(2))) };
});
var wl = g((ae, On) => {
    var Xg = require("tty"),
        bn = require("util");
    ae.init = r0;
    ae.log = Zg;
    ae.formatArgs = Jg;
    ae.save = e0;
    ae.load = t0;
    ae.useColors = Kg;
    ae.destroy = bn.deprecate(() => {},
    "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    ae.colors = [6, 2, 3, 4, 5, 1];
    try {
        let e = ml();
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
    function Kg() {
        return "colors" in ae.inspectOpts ? !!ae.inspectOpts.colors : Xg.isatty(process.stderr.fd);
    }
    function Jg(e) {
        let { namespace: t, useColors: r } = this;
        if (r) {
            let n = this.color,
                i = "\x1B[3" + (n < 8 ? n : "8;5;" + n),
                o = "  ".concat(i, ";1m").concat(t, " \x1B[0m");
            (e[0] = o + e[0].split("\n").join("\n" + o)), e.push(i + "m+" + On.exports.humanize(this.diff) + "\x1B[0m");
        } else e[0] = Qg() + t + " " + e[0];
    }
    function Qg() {
        return ae.inspectOpts.hideDate ? "" : new Date().toISOString() + " ";
    }
    function Zg(...e) {
        return process.stderr.write(bn.formatWithOptions(ae.inspectOpts, ...e) + "\n");
    }
    function e0(e) {
        e ? (process.env.DEBUG = e) : delete process.env.DEBUG;
    }
    function t0() {
        return process.env.DEBUG;
    }
    function r0(e) {
        e.inspectOpts = {};
        let t = Object.keys(ae.inspectOpts);
        for (let r = 0; r < t.length; r++) e.inspectOpts[t[r]] = ae.inspectOpts[t[r]];
    }
    On.exports = uo()(ae);
    var { formatters: gl } = On.exports;
    gl.o = function (e) {
        return (
            (this.inspectOpts.colors = this.useColors),
            bn
                .inspect(e, this.inspectOpts)
                .split("\n")
                .map(t => t.trim())
                .join(" ")
        );
    };
    gl.O = function (e) {
        return (this.inspectOpts.colors = this.useColors), bn.inspect(e, this.inspectOpts);
    };
});
var El = g((sO, ho) => {
    typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs
        ? (ho.exports = cl())
        : (ho.exports = wl());
});
var br = g(po => {
    "use strict";
    Object.defineProperty(po, "__esModule", { value: !0 });
    po.newError = n0;
    function n0(e, t) {
        let r = new Error(e);
        return (r.code = t), r;
    }
});
var go = g(In => {
    "use strict";
    Object.defineProperty(In, "__esModule", { value: !0 });
    In.ProgressCallbackTransform = void 0;
    var i0 = require("stream"),
        mo = class extends i0.Transform {
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
    In.ProgressCallbackTransform = mo;
});
var Sl = g(Ee => {
    "use strict";
    Object.defineProperty(Ee, "__esModule", { value: !0 });
    Ee.DigestTransform = Ee.HttpExecutor = Ee.HttpError = void 0;
    Ee.createHttpError = wo;
    Ee.parseJson = d0;
    Ee.configureRequestOptionsFromUrl = vl;
    Ee.configureRequestUrl = yo;
    Ee.safeGetHeader = zt;
    Ee.configureRequestOptions = Nn;
    Ee.safeStringifyJson = Dn;
    var o0 = require("crypto"),
        s0 = El(),
        a0 = require("fs"),
        l0 = require("stream"),
        _l = require("url"),
        u0 = An(),
        yl = br(),
        c0 = go(),
        Or = (0, s0.default)("electron-builder");
    function wo(e, t = null) {
        return new Ir(
            e.statusCode || -1,
            "".concat(e.statusCode, " ").concat(e.statusMessage) +
                (t == null ? "" : "\n" + JSON.stringify(t, null, "  ")) +
                "\nHeaders: " +
                Dn(e.headers),
            t
        );
    }
    var f0 = new Map([
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
            constructor(t, r = "HTTP error: ".concat(f0.get(t) || t), n = null) {
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
    Ee.HttpError = Ir;
    function d0(e) {
        return e.then(t => (t == null || t.length === 0 ? null : JSON.parse(t)));
    }
    var Eo = class e {
        constructor() {
            this.maxRedirects = 10;
        }
        request(t, r = new u0.CancellationToken(), n) {
            Nn(t);
            let i = n == null ? void 0 : JSON.stringify(n),
                o = i ? Buffer.from(i) : void 0;
            if (o != null) {
                Or(i);
                let { headers: s, ...a } = t;
                t = { method: "post", headers: { "Content-Type": "application/json", "Content-Length": o.length, ...s }, ...a };
            }
            return this.doApiRequest(t, r, s => s.end(o));
        }
        doApiRequest(t, r, n, i = 0) {
            return (
                Or.enabled && Or("Request: ".concat(Dn(t))),
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
                (Or.enabled &&
                    Or("Response: ".concat(t.statusCode, " ").concat(t.statusMessage, ", request options: ").concat(Dn(r))),
                t.statusCode === 404)
            ) {
                o(
                    wo(
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
                                y =
                                    p != null &&
                                    (Array.isArray(p) ? p.find(_ => _.includes("json")) != null : p.includes("json"));
                            o(
                                wo(
                                    t,
                                    "method: "
                                        .concat(r.method || "GET", " url: ")
                                        .concat(r.protocol || "https:", "//")
                                        .concat(r.hostname)
                                        .concat(r.port ? ":".concat(r.port) : "")
                                        .concat(r.path, "\n\n          Data:\n          ")
                                        .concat(y ? JSON.stringify(JSON.parse(m)) : m, "\n          ")
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
                yo(t, a),
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
                r.responseHandler == null ? p0(r, o) : r.responseHandler(o, r.callback);
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
            let n = vl(t, { ...r }),
                i = n.headers;
            if (i?.authorization) {
                let o = new _l.URL(t);
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
    Ee.HttpExecutor = Eo;
    function vl(e, t) {
        let r = Nn(t);
        return yo(new _l.URL(e), r), r;
    }
    function yo(e, t) {
        (t.protocol = e.protocol),
            (t.hostname = e.hostname),
            e.port ? (t.port = e.port) : t.port && delete t.port,
            (t.path = e.pathname + e.search);
    }
    var Nr = class extends l0.Transform {
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
                (this.digester = (0, o0.createHash)(r));
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
            if (this._actual == null) throw (0, yl.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
            if (this._actual !== this.expected)
                throw (0, yl.newError)(
                    ""
                        .concat(this.algorithm, " checksum mismatch, expected ")
                        .concat(this.expected, ", got ")
                        .concat(this._actual),
                    "ERR_CHECKSUM_MISMATCH"
                );
            return null;
        }
    };
    Ee.DigestTransform = Nr;
    function h0(e, t, r) {
        return e != null && t != null && e !== t
            ? (r(new Error("checksum mismatch: expected ".concat(t, " but got ").concat(e, " (X-Checksum-Sha2 header)"))), !1)
            : !0;
    }
    function zt(e, t) {
        let r = e.headers[t];
        return r == null ? null : Array.isArray(r) ? (r.length === 0 ? null : r[r.length - 1]) : r;
    }
    function p0(e, t) {
        if (!h0(zt(t, "X-Checksum-Sha2"), e.options.sha2, e.callback)) return;
        let r = [];
        if (e.options.onProgress != null) {
            let s = zt(t, "content-length");
            s != null &&
                r.push(new c0.ProgressCallbackTransform(parseInt(s, 10), e.options.cancellationToken, e.options.onProgress));
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
        let i = (0, a0.createWriteStream)(e.destination);
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
    function Dn(e, t) {
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
var Al = g(Rn => {
    "use strict";
    Object.defineProperty(Rn, "__esModule", { value: !0 });
    Rn.githubUrl = m0;
    Rn.getS3LikeProviderBaseUrl = g0;
    function m0(e, t = "github.com") {
        return "".concat(e.protocol || "https", "://").concat(e.host || t);
    }
    function g0(e) {
        let t = e.provider;
        if (t === "s3") return w0(e);
        if (t === "spaces") return E0(e);
        throw new Error("Not supported provider: ".concat(t));
    }
    function w0(e) {
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
        return xl(t, e.path);
    }
    function xl(e, t) {
        return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), (e += t)), e;
    }
    function E0(e) {
        if (e.name == null) throw new Error("name is missing");
        if (e.region == null) throw new Error("region is missing");
        return xl("https://".concat(e.name, ".").concat(e.region, ".digitaloceanspaces.com"), e.path);
    }
});
var Cl = g(_o => {
    "use strict";
    Object.defineProperty(_o, "__esModule", { value: !0 });
    _o.parseDn = y0;
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
var Nl = g(Xt => {
    "use strict";
    Object.defineProperty(Xt, "__esModule", { value: !0 });
    Xt.nil = Xt.UUID = void 0;
    var Ol = require("crypto"),
        Il = br(),
        _0 = "options.name must be either a string or a Buffer",
        Tl = (0, Ol.randomBytes)(16);
    Tl[0] = Tl[0] | 1;
    var Pn = {},
        $ = [];
    for (let e = 0; e < 256; e++) {
        let t = (e + 256).toString(16).substr(1);
        (Pn[t] = e), ($[e] = t);
    }
    var xt = class e {
        constructor(t) {
            (this.ascii = null), (this.binary = null);
            let r = e.check(t);
            if (!r) throw new Error("not a UUID");
            (this.version = r.version), r.format === "ascii" ? (this.ascii = t) : (this.binary = t);
        }
        static v5(t, r) {
            return v0(t, "sha1", 80, r);
        }
        toString() {
            return this.ascii == null && (this.ascii = S0(this.binary)), this.ascii;
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
                                  version: (Pn[t[14] + t[15]] & 240) >> 4,
                                  variant: bl((Pn[t[19] + t[20]] & 224) >> 5),
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
                    : { version: (t[r + 6] & 240) >> 4, variant: bl((t[r + 8] & 224) >> 5), format: "binary" };
            }
            throw (0, Il.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
        }
        static parse(t) {
            let r = Buffer.allocUnsafe(16),
                n = 0;
            for (let i = 0; i < 16; i++) (r[i] = Pn[t[n++] + t[n++]]), (i === 3 || i === 5 || i === 7 || i === 9) && (n += 1);
            return r;
        }
    };
    Xt.UUID = xt;
    xt.OID = xt.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
    function bl(e) {
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
    var Dr;
    (function (e) {
        (e[(e.ASCII = 0)] = "ASCII"), (e[(e.BINARY = 1)] = "BINARY"), (e[(e.OBJECT = 2)] = "OBJECT");
    })(Dr || (Dr = {}));
    function v0(e, t, r, n, i = Dr.ASCII) {
        let o = (0, Ol.createHash)(t);
        if (typeof e != "string" && !Buffer.isBuffer(e)) throw (0, Il.newError)(_0, "ERR_INVALID_UUID_NAME");
        o.update(n), o.update(e);
        let a = o.digest(),
            l;
        switch (i) {
            case Dr.BINARY:
                (a[6] = (a[6] & 15) | r), (a[8] = (a[8] & 63) | 128), (l = a);
                break;
            case Dr.OBJECT:
                (a[6] = (a[6] & 15) | r), (a[8] = (a[8] & 63) | 128), (l = new xt(a));
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
    function S0(e) {
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
    Xt.nil = new xt("00000000-0000-0000-0000-000000000000");
});
var Dl = g(Fn => {
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
            var S = this;
            i(S),
                (S.q = S.c = ""),
                (S.bufferCheckPosition = e.MAX_BUFFER_LENGTH),
                (S.opt = u || {}),
                (S.opt.lowercase = S.opt.lowercase || S.opt.lowercasetags),
                (S.looseCase = S.opt.lowercase ? "toLowerCase" : "toUpperCase"),
                (S.tags = []),
                (S.closed = S.closedRoot = S.sawRoot = !1),
                (S.tag = S.error = null),
                (S.strict = !!d),
                (S.noscript = !!(d || S.opt.noscript)),
                (S.state = E.BEGIN),
                (S.strictEntities = S.opt.strictEntities),
                (S.ENTITIES = S.strictEntities ? Object.create(e.XML_ENTITIES) : Object.create(e.ENTITIES)),
                (S.attribList = []),
                S.opt.xmlns && (S.ns = Object.create(y)),
                S.opt.unquotedAttributeValues === void 0 && (S.opt.unquotedAttributeValues = !d),
                (S.trackPosition = S.opt.position !== !1),
                S.trackPosition && (S.position = S.line = S.column = 0),
                U(S, "onready");
        }
        Object.create ||
            (Object.create = function (d) {
                function u() {}
                u.prototype = d;
                var S = new u();
                return S;
            }),
            Object.keys ||
                (Object.keys = function (d) {
                    var u = [];
                    for (var S in d) d.hasOwnProperty(S) && u.push(S);
                    return u;
                });
        function n(d) {
            for (var u = Math.max(e.MAX_BUFFER_LENGTH, 10), S = 0, w = 0, B = t.length; w < B; w++) {
                var ie = d[t[w]].length;
                if (ie > u)
                    switch (t[w]) {
                        case "textNode":
                            K(d);
                            break;
                        case "cdata":
                            D(d, "oncdata", d.cdata), (d.cdata = "");
                            break;
                        case "script":
                            D(d, "onscript", d.script), (d.script = "");
                            break;
                        default:
                            X(d, "Max buffer length exceeded: " + t[w]);
                    }
                S = Math.max(S, ie);
            }
            var oe = e.MAX_BUFFER_LENGTH - S;
            d.bufferCheckPosition = oe + d.position;
        }
        function i(d) {
            for (var u = 0, S = t.length; u < S; u++) d[t[u]] = "";
        }
        function o(d) {
            K(d),
                d.cdata !== "" && (D(d, "oncdata", d.cdata), (d.cdata = "")),
                d.script !== "" && (D(d, "onscript", d.script), (d.script = ""));
        }
        r.prototype = {
            end: function () {
                G(this);
            },
            write: Ng,
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
            var S = this;
            (this._parser.onend = function () {
                S.emit("end");
            }),
                (this._parser.onerror = function (w) {
                    S.emit("error", w), (S._parser.error = null);
                }),
                (this._decoder = null),
                a.forEach(function (w) {
                    Object.defineProperty(S, "on" + w, {
                        get: function () {
                            return S._parser["on" + w];
                        },
                        set: function (B) {
                            if (!B) return S.removeAllListeners(w), (S._parser["on" + w] = B), B;
                            S.on(w, B);
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
                var S = this;
                return (
                    !S._parser["on" + d] &&
                        a.indexOf(d) !== -1 &&
                        (S._parser["on" + d] = function () {
                            var w = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
                            w.splice(0, 0, d), S.emit.apply(S, w);
                        }),
                    s.prototype.on.call(S, d, u)
                );
            });
        var c = "[CDATA[",
            f = "DOCTYPE",
            m = "http://www.w3.org/XML/1998/namespace",
            p = "http://www.w3.org/2000/xmlns/",
            y = { xml: m, xmlns: p },
            _ =
                /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,
            v =
                /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/,
            C =
                /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,
            x =
                /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
        function N(d) {
            return d === " " || d === "\n" || d === "\r" || d === "	";
        }
        function L(d) {
            return d === '"' || d === "'";
        }
        function Pe(d) {
            return d === ">" || N(d);
        }
        function V(d, u) {
            return d.test(u);
        }
        function ce(d, u) {
            return !V(d, u);
        }
        var E = 0;
        (e.STATE = {
            BEGIN: E++,
            BEGIN_WHITESPACE: E++,
            TEXT: E++,
            TEXT_ENTITY: E++,
            OPEN_WAKA: E++,
            SGML_DECL: E++,
            SGML_DECL_QUOTED: E++,
            DOCTYPE: E++,
            DOCTYPE_QUOTED: E++,
            DOCTYPE_DTD: E++,
            DOCTYPE_DTD_QUOTED: E++,
            COMMENT_STARTING: E++,
            COMMENT: E++,
            COMMENT_ENDING: E++,
            COMMENT_ENDED: E++,
            CDATA: E++,
            CDATA_ENDING: E++,
            CDATA_ENDING_2: E++,
            PROC_INST: E++,
            PROC_INST_BODY: E++,
            PROC_INST_ENDING: E++,
            OPEN_TAG: E++,
            OPEN_TAG_SLASH: E++,
            ATTRIB: E++,
            ATTRIB_NAME: E++,
            ATTRIB_NAME_SAW_WHITE: E++,
            ATTRIB_VALUE: E++,
            ATTRIB_VALUE_QUOTED: E++,
            ATTRIB_VALUE_CLOSED: E++,
            ATTRIB_VALUE_UNQUOTED: E++,
            ATTRIB_VALUE_ENTITY_Q: E++,
            ATTRIB_VALUE_ENTITY_U: E++,
            CLOSE_TAG: E++,
            CLOSE_TAG_SAW_WHITE: E++,
            SCRIPT: E++,
            SCRIPT_ENDING: E++
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
                    S = typeof u == "number" ? String.fromCharCode(u) : u;
                e.ENTITIES[d] = S;
            });
        for (var R in e.STATE) e.STATE[e.STATE[R]] = R;
        E = e.STATE;
        function U(d, u, S) {
            d[u] && d[u](S);
        }
        function D(d, u, S) {
            d.textNode && K(d), U(d, u, S);
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
                d.state !== E.BEGIN && d.state !== E.BEGIN_WHITESPACE && d.state !== E.TEXT && X(d, "Unexpected end"),
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
                S = (d.tag = { name: d.tagName, attributes: {} });
            d.opt.xmlns && (S.ns = u.ns), (d.attribList.length = 0), D(d, "onopentagstart", S);
        }
        function ee(d, u) {
            var S = d.indexOf(":"),
                w = S < 0 ? ["", d] : d.split(":"),
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
                    S = u.prefix,
                    w = u.local;
                if (S === "xmlns")
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
                    D(d, "onattribute", { name: d.attribName, value: d.attribValue });
            d.attribName = d.attribValue = "";
        }
        function rt(d, u) {
            if (d.opt.xmlns) {
                var S = d.tag,
                    w = ee(d.tagName);
                (S.prefix = w.prefix),
                    (S.local = w.local),
                    (S.uri = S.ns[w.prefix] || ""),
                    S.prefix && !S.uri && (F(d, "Unbound namespace prefix: " + JSON.stringify(d.tagName)), (S.uri = w.prefix));
                var B = d.tags[d.tags.length - 1] || d;
                S.ns &&
                    B.ns !== S.ns &&
                    Object.keys(S.ns).forEach(function (il) {
                        D(d, "onopennamespace", { prefix: il, uri: S.ns[il] });
                    });
                for (var ie = 0, oe = d.attribList.length; ie < oe; ie++) {
                    var Ce = d.attribList[ie],
                        Te = Ce[0],
                        jt = Ce[1],
                        fe = ee(Te, !0),
                        ze = fe.prefix,
                        Dg = fe.local,
                        nl = ze === "" ? "" : S.ns[ze] || "",
                        ao = { name: Te, value: jt, prefix: ze, local: Dg, uri: nl };
                    ze && ze !== "xmlns" && !nl && (F(d, "Unbound namespace prefix: " + JSON.stringify(ze)), (ao.uri = ze)),
                        (d.tag.attributes[Te] = ao),
                        D(d, "onattribute", ao);
                }
                d.attribList.length = 0;
            }
            (d.tag.isSelfClosing = !!u),
                (d.sawRoot = !0),
                d.tags.push(d.tag),
                D(d, "onopentag", d.tag),
                u ||
                    (!d.noscript && d.tagName.toLowerCase() === "script" ? (d.state = E.SCRIPT) : (d.state = E.TEXT),
                    (d.tag = null),
                    (d.tagName = "")),
                (d.attribName = d.attribValue = ""),
                (d.attribList.length = 0);
        }
        function so(d) {
            if (!d.tagName) {
                F(d, "Weird empty close tag."), (d.textNode += "</>"), (d.state = E.TEXT);
                return;
            }
            if (d.script) {
                if (d.tagName !== "script") {
                    (d.script += "</" + d.tagName + ">"), (d.tagName = ""), (d.state = E.SCRIPT);
                    return;
                }
                D(d, "onscript", d.script), (d.script = "");
            }
            var u = d.tags.length,
                S = d.tagName;
            d.strict || (S = S[d.looseCase]());
            for (var w = S; u--; ) {
                var B = d.tags[u];
                if (B.name !== w) F(d, "Unexpected close tag");
                else break;
            }
            if (u < 0) {
                F(d, "Unmatched closing tag: " + d.tagName), (d.textNode += "</" + d.tagName + ">"), (d.state = E.TEXT);
                return;
            }
            d.tagName = S;
            for (var ie = d.tags.length; ie-- > u; ) {
                var oe = (d.tag = d.tags.pop());
                (d.tagName = d.tag.name), D(d, "onclosetag", d.tagName);
                var Ce = {};
                for (var Te in oe.ns) Ce[Te] = oe.ns[Te];
                var jt = d.tags[d.tags.length - 1] || d;
                d.opt.xmlns &&
                    oe.ns !== jt.ns &&
                    Object.keys(oe.ns).forEach(function (fe) {
                        var ze = oe.ns[fe];
                        D(d, "onclosenamespace", { prefix: fe, uri: ze });
                    });
            }
            u === 0 && (d.closedRoot = !0),
                (d.tagName = d.attribValue = d.attribName = ""),
                (d.attribList.length = 0),
                (d.state = E.TEXT);
        }
        function Ig(d) {
            var u = d.entity,
                S = u.toLowerCase(),
                w,
                B = "";
            return d.ENTITIES[u]
                ? d.ENTITIES[u]
                : d.ENTITIES[S]
                ? d.ENTITIES[S]
                : ((u = S),
                  u.charAt(0) === "#" &&
                      (u.charAt(1) === "x"
                          ? ((u = u.slice(2)), (w = parseInt(u, 16)), (B = w.toString(16)))
                          : ((u = u.slice(1)), (w = parseInt(u, 10)), (B = w.toString(10)))),
                  (u = u.replace(/^0+/, "")),
                  isNaN(w) || B.toLowerCase() !== u
                      ? (F(d, "Invalid character entity"), "&" + d.entity + ";")
                      : String.fromCodePoint(w));
        }
        function tl(d, u) {
            u === "<"
                ? ((d.state = E.OPEN_WAKA), (d.startTagPosition = d.position))
                : N(u) || (F(d, "Non-whitespace before first tag."), (d.textNode = u), (d.state = E.TEXT));
        }
        function rl(d, u) {
            var S = "";
            return u < d.length && (S = d.charAt(u)), S;
        }
        function Ng(d) {
            var u = this;
            if (this.error) throw this.error;
            if (u.closed) return X(u, "Cannot write after close. Assign an onready handler.");
            if (d === null) return G(u);
            typeof d == "object" && (d = d.toString());
            for (var S = 0, w = ""; (w = rl(d, S++)), (u.c = w), !!w; )
                switch ((u.trackPosition && (u.position++, w === "\n" ? (u.line++, (u.column = 0)) : u.column++), u.state)) {
                    case E.BEGIN:
                        if (((u.state = E.BEGIN_WHITESPACE), w === "\uFEFF")) continue;
                        tl(u, w);
                        continue;
                    case E.BEGIN_WHITESPACE:
                        tl(u, w);
                        continue;
                    case E.TEXT:
                        if (u.sawRoot && !u.closedRoot) {
                            for (var B = S - 1; w && w !== "<" && w !== "&"; )
                                (w = rl(d, S++)),
                                    w && u.trackPosition && (u.position++, w === "\n" ? (u.line++, (u.column = 0)) : u.column++);
                            u.textNode += d.substring(B, S - 1);
                        }
                        w === "<" && !(u.sawRoot && u.closedRoot && !u.strict)
                            ? ((u.state = E.OPEN_WAKA), (u.startTagPosition = u.position))
                            : (!N(w) && (!u.sawRoot || u.closedRoot) && F(u, "Text data outside of root node."),
                              w === "&" ? (u.state = E.TEXT_ENTITY) : (u.textNode += w));
                        continue;
                    case E.SCRIPT:
                        w === "<" ? (u.state = E.SCRIPT_ENDING) : (u.script += w);
                        continue;
                    case E.SCRIPT_ENDING:
                        w === "/" ? (u.state = E.CLOSE_TAG) : ((u.script += "<" + w), (u.state = E.SCRIPT));
                        continue;
                    case E.OPEN_WAKA:
                        if (w === "!") (u.state = E.SGML_DECL), (u.sgmlDecl = "");
                        else if (!N(w))
                            if (V(_, w)) (u.state = E.OPEN_TAG), (u.tagName = w);
                            else if (w === "/") (u.state = E.CLOSE_TAG), (u.tagName = "");
                            else if (w === "?") (u.state = E.PROC_INST), (u.procInstName = u.procInstBody = "");
                            else {
                                if ((F(u, "Unencoded <"), u.startTagPosition + 1 < u.position)) {
                                    var ie = u.position - u.startTagPosition;
                                    w = new Array(ie).join(" ") + w;
                                }
                                (u.textNode += "<" + w), (u.state = E.TEXT);
                            }
                        continue;
                    case E.SGML_DECL:
                        if (u.sgmlDecl + w === "--") {
                            (u.state = E.COMMENT), (u.comment = ""), (u.sgmlDecl = "");
                            continue;
                        }
                        u.doctype && u.doctype !== !0 && u.sgmlDecl
                            ? ((u.state = E.DOCTYPE_DTD), (u.doctype += "<!" + u.sgmlDecl + w), (u.sgmlDecl = ""))
                            : (u.sgmlDecl + w).toUpperCase() === c
                            ? (D(u, "onopencdata"), (u.state = E.CDATA), (u.sgmlDecl = ""), (u.cdata = ""))
                            : (u.sgmlDecl + w).toUpperCase() === f
                            ? ((u.state = E.DOCTYPE),
                              (u.doctype || u.sawRoot) && F(u, "Inappropriately located doctype declaration"),
                              (u.doctype = ""),
                              (u.sgmlDecl = ""))
                            : w === ">"
                            ? (D(u, "onsgmldeclaration", u.sgmlDecl), (u.sgmlDecl = ""), (u.state = E.TEXT))
                            : (L(w) && (u.state = E.SGML_DECL_QUOTED), (u.sgmlDecl += w));
                        continue;
                    case E.SGML_DECL_QUOTED:
                        w === u.q && ((u.state = E.SGML_DECL), (u.q = "")), (u.sgmlDecl += w);
                        continue;
                    case E.DOCTYPE:
                        w === ">"
                            ? ((u.state = E.TEXT), D(u, "ondoctype", u.doctype), (u.doctype = !0))
                            : ((u.doctype += w),
                              w === "[" ? (u.state = E.DOCTYPE_DTD) : L(w) && ((u.state = E.DOCTYPE_QUOTED), (u.q = w)));
                        continue;
                    case E.DOCTYPE_QUOTED:
                        (u.doctype += w), w === u.q && ((u.q = ""), (u.state = E.DOCTYPE));
                        continue;
                    case E.DOCTYPE_DTD:
                        w === "]"
                            ? ((u.doctype += w), (u.state = E.DOCTYPE))
                            : w === "<"
                            ? ((u.state = E.OPEN_WAKA), (u.startTagPosition = u.position))
                            : L(w)
                            ? ((u.doctype += w), (u.state = E.DOCTYPE_DTD_QUOTED), (u.q = w))
                            : (u.doctype += w);
                        continue;
                    case E.DOCTYPE_DTD_QUOTED:
                        (u.doctype += w), w === u.q && ((u.state = E.DOCTYPE_DTD), (u.q = ""));
                        continue;
                    case E.COMMENT:
                        w === "-" ? (u.state = E.COMMENT_ENDING) : (u.comment += w);
                        continue;
                    case E.COMMENT_ENDING:
                        w === "-"
                            ? ((u.state = E.COMMENT_ENDED),
                              (u.comment = re(u.opt, u.comment)),
                              u.comment && D(u, "oncomment", u.comment),
                              (u.comment = ""))
                            : ((u.comment += "-" + w), (u.state = E.COMMENT));
                        continue;
                    case E.COMMENT_ENDED:
                        w !== ">"
                            ? (F(u, "Malformed comment"), (u.comment += "--" + w), (u.state = E.COMMENT))
                            : u.doctype && u.doctype !== !0
                            ? (u.state = E.DOCTYPE_DTD)
                            : (u.state = E.TEXT);
                        continue;
                    case E.CDATA:
                        w === "]" ? (u.state = E.CDATA_ENDING) : (u.cdata += w);
                        continue;
                    case E.CDATA_ENDING:
                        w === "]" ? (u.state = E.CDATA_ENDING_2) : ((u.cdata += "]" + w), (u.state = E.CDATA));
                        continue;
                    case E.CDATA_ENDING_2:
                        w === ">"
                            ? (u.cdata && D(u, "oncdata", u.cdata), D(u, "onclosecdata"), (u.cdata = ""), (u.state = E.TEXT))
                            : w === "]"
                            ? (u.cdata += "]")
                            : ((u.cdata += "]]" + w), (u.state = E.CDATA));
                        continue;
                    case E.PROC_INST:
                        w === "?" ? (u.state = E.PROC_INST_ENDING) : N(w) ? (u.state = E.PROC_INST_BODY) : (u.procInstName += w);
                        continue;
                    case E.PROC_INST_BODY:
                        if (!u.procInstBody && N(w)) continue;
                        w === "?" ? (u.state = E.PROC_INST_ENDING) : (u.procInstBody += w);
                        continue;
                    case E.PROC_INST_ENDING:
                        w === ">"
                            ? (D(u, "onprocessinginstruction", { name: u.procInstName, body: u.procInstBody }),
                              (u.procInstName = u.procInstBody = ""),
                              (u.state = E.TEXT))
                            : ((u.procInstBody += "?" + w), (u.state = E.PROC_INST_BODY));
                        continue;
                    case E.OPEN_TAG:
                        V(v, w)
                            ? (u.tagName += w)
                            : (H(u),
                              w === ">"
                                  ? rt(u)
                                  : w === "/"
                                  ? (u.state = E.OPEN_TAG_SLASH)
                                  : (N(w) || F(u, "Invalid character in tag name"), (u.state = E.ATTRIB)));
                        continue;
                    case E.OPEN_TAG_SLASH:
                        w === ">"
                            ? (rt(u, !0), so(u))
                            : (F(u, "Forward-slash in opening tag not followed by >"), (u.state = E.ATTRIB));
                        continue;
                    case E.ATTRIB:
                        if (N(w)) continue;
                        w === ">"
                            ? rt(u)
                            : w === "/"
                            ? (u.state = E.OPEN_TAG_SLASH)
                            : V(_, w)
                            ? ((u.attribName = w), (u.attribValue = ""), (u.state = E.ATTRIB_NAME))
                            : F(u, "Invalid attribute name");
                        continue;
                    case E.ATTRIB_NAME:
                        w === "="
                            ? (u.state = E.ATTRIB_VALUE)
                            : w === ">"
                            ? (F(u, "Attribute without value"), (u.attribValue = u.attribName), j(u), rt(u))
                            : N(w)
                            ? (u.state = E.ATTRIB_NAME_SAW_WHITE)
                            : V(v, w)
                            ? (u.attribName += w)
                            : F(u, "Invalid attribute name");
                        continue;
                    case E.ATTRIB_NAME_SAW_WHITE:
                        if (w === "=") u.state = E.ATTRIB_VALUE;
                        else {
                            if (N(w)) continue;
                            F(u, "Attribute without value"),
                                (u.tag.attributes[u.attribName] = ""),
                                (u.attribValue = ""),
                                D(u, "onattribute", { name: u.attribName, value: "" }),
                                (u.attribName = ""),
                                w === ">"
                                    ? rt(u)
                                    : V(_, w)
                                    ? ((u.attribName = w), (u.state = E.ATTRIB_NAME))
                                    : (F(u, "Invalid attribute name"), (u.state = E.ATTRIB));
                        }
                        continue;
                    case E.ATTRIB_VALUE:
                        if (N(w)) continue;
                        L(w)
                            ? ((u.q = w), (u.state = E.ATTRIB_VALUE_QUOTED))
                            : (u.opt.unquotedAttributeValues || X(u, "Unquoted attribute value"),
                              (u.state = E.ATTRIB_VALUE_UNQUOTED),
                              (u.attribValue = w));
                        continue;
                    case E.ATTRIB_VALUE_QUOTED:
                        if (w !== u.q) {
                            w === "&" ? (u.state = E.ATTRIB_VALUE_ENTITY_Q) : (u.attribValue += w);
                            continue;
                        }
                        j(u), (u.q = ""), (u.state = E.ATTRIB_VALUE_CLOSED);
                        continue;
                    case E.ATTRIB_VALUE_CLOSED:
                        N(w)
                            ? (u.state = E.ATTRIB)
                            : w === ">"
                            ? rt(u)
                            : w === "/"
                            ? (u.state = E.OPEN_TAG_SLASH)
                            : V(_, w)
                            ? (F(u, "No whitespace between attributes"),
                              (u.attribName = w),
                              (u.attribValue = ""),
                              (u.state = E.ATTRIB_NAME))
                            : F(u, "Invalid attribute name");
                        continue;
                    case E.ATTRIB_VALUE_UNQUOTED:
                        if (!Pe(w)) {
                            w === "&" ? (u.state = E.ATTRIB_VALUE_ENTITY_U) : (u.attribValue += w);
                            continue;
                        }
                        j(u), w === ">" ? rt(u) : (u.state = E.ATTRIB);
                        continue;
                    case E.CLOSE_TAG:
                        if (u.tagName)
                            w === ">"
                                ? so(u)
                                : V(v, w)
                                ? (u.tagName += w)
                                : u.script
                                ? ((u.script += "</" + u.tagName), (u.tagName = ""), (u.state = E.SCRIPT))
                                : (N(w) || F(u, "Invalid tagname in closing tag"), (u.state = E.CLOSE_TAG_SAW_WHITE));
                        else {
                            if (N(w)) continue;
                            ce(_, w)
                                ? u.script
                                    ? ((u.script += "</" + w), (u.state = E.SCRIPT))
                                    : F(u, "Invalid tagname in closing tag.")
                                : (u.tagName = w);
                        }
                        continue;
                    case E.CLOSE_TAG_SAW_WHITE:
                        if (N(w)) continue;
                        w === ">" ? so(u) : F(u, "Invalid characters in closing tag");
                        continue;
                    case E.TEXT_ENTITY:
                    case E.ATTRIB_VALUE_ENTITY_Q:
                    case E.ATTRIB_VALUE_ENTITY_U:
                        var oe, Ce;
                        switch (u.state) {
                            case E.TEXT_ENTITY:
                                (oe = E.TEXT), (Ce = "textNode");
                                break;
                            case E.ATTRIB_VALUE_ENTITY_Q:
                                (oe = E.ATTRIB_VALUE_QUOTED), (Ce = "attribValue");
                                break;
                            case E.ATTRIB_VALUE_ENTITY_U:
                                (oe = E.ATTRIB_VALUE_UNQUOTED), (Ce = "attribValue");
                                break;
                        }
                        if (w === ";") {
                            var Te = Ig(u);
                            u.opt.unparsedEntities && !Object.values(e.XML_ENTITIES).includes(Te)
                                ? ((u.entity = ""), (u.state = oe), u.write(Te))
                                : ((u[Ce] += Te), (u.entity = ""), (u.state = oe));
                        } else
                            V(u.entity.length ? x : C, w)
                                ? (u.entity += w)
                                : (F(u, "Invalid character in entity name"),
                                  (u[Ce] += "&" + u.entity + w),
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
                    S = function () {
                        var w = 16384,
                            B = [],
                            ie,
                            oe,
                            Ce = -1,
                            Te = arguments.length;
                        if (!Te) return "";
                        for (var jt = ""; ++Ce < Te; ) {
                            var fe = Number(arguments[Ce]);
                            if (!isFinite(fe) || fe < 0 || fe > 1114111 || u(fe) !== fe)
                                throw RangeError("Invalid code point: " + fe);
                            fe <= 65535
                                ? B.push(fe)
                                : ((fe -= 65536), (ie = (fe >> 10) + 55296), (oe = (fe % 1024) + 56320), B.push(ie, oe)),
                                (Ce + 1 === Te || B.length > w) && ((jt += d.apply(null, B)), (B.length = 0));
                        }
                        return jt;
                    };
                Object.defineProperty
                    ? Object.defineProperty(String, "fromCodePoint", { value: S, configurable: !0, writable: !0 })
                    : (String.fromCodePoint = S);
            })();
    })(typeof Fn > "u" ? (Fn.sax = {}) : Fn);
});
var Pl = g(Rr => {
    "use strict";
    Object.defineProperty(Rr, "__esModule", { value: !0 });
    Rr.XElement = void 0;
    Rr.parseXml = T0;
    var x0 = Dl(),
        qn = br(),
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
                for (let n of this.elements) if (Rl(n, t, r)) return n;
                return null;
            }
            getElements(t, r = !1) {
                return this.elements === null ? [] : this.elements.filter(n => Rl(n, t, r));
            }
            elementValueOrEmpty(t, r = !1) {
                let n = this.elementOrNull(t, r);
                return n === null ? "" : n.value;
            }
        };
    Rr.XElement = Ln;
    var A0 = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
    function C0(e) {
        return A0.test(e);
    }
    function Rl(e, t, r) {
        let n = e.name;
        return n === t || (r === !0 && n.length === t.length && n.toLowerCase() === t.toLowerCase());
    }
    function T0(e) {
        let t = null,
            r = x0.parser(!0, {}),
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
var ql = g(Un => {
    "use strict";
    Object.defineProperty(Un, "__esModule", { value: !0 });
    Un.MemoLazy = void 0;
    var vo = class {
        constructor(t, r) {
            (this.selector = t), (this.creator = r), (this.selected = void 0), (this._value = void 0);
        }
        get hasValue() {
            return this._value !== void 0;
        }
        get value() {
            let t = this.selector();
            if (this._value !== void 0 && Fl(this.selected, t)) return this._value;
            this.selected = t;
            let r = this.creator(t);
            return (this.value = r), r;
        }
        set value(t) {
            this._value = t;
        }
    };
    Un.MemoLazy = vo;
    function Fl(e, t) {
        if (typeof e == "object" && e !== null && typeof t == "object" && t !== null) {
            let i = Object.keys(e),
                o = Object.keys(t);
            return i.length === o.length && i.every(s => Fl(e[s], t[s]));
        }
        return e === t;
    }
});
var Ul = g(So => {
    "use strict";
    Object.defineProperty(So, "__esModule", { value: !0 });
    So.retry = Ll;
    var b0 = An();
    async function Ll(e, t, r, n = 0, i = 0, o) {
        var s;
        let a = new b0.CancellationToken();
        try {
            return await e();
        } catch (l) {
            if ((!((s = o?.(l)) !== null && s !== void 0) || s) && t > 0 && !a.cancelled)
                return await new Promise(h => setTimeout(h, r + n * i)), await Ll(e, t - 1, r, n, i + 1, o);
            throw l;
        }
    }
});
var le = g(P => {
    "use strict";
    Object.defineProperty(P, "__esModule", { value: !0 });
    P.CURRENT_APP_PACKAGE_FILE_NAME =
        P.CURRENT_APP_INSTALLER_FILE_NAME =
        P.retry =
        P.MemoLazy =
        P.newError =
        P.XElement =
        P.parseXml =
        P.ProgressCallbackTransform =
        P.UUID =
        P.parseDn =
        P.githubUrl =
        P.getS3LikeProviderBaseUrl =
        P.configureRequestUrl =
        P.parseJson =
        P.safeStringifyJson =
        P.configureRequestOptionsFromUrl =
        P.configureRequestOptions =
        P.safeGetHeader =
        P.DigestTransform =
        P.HttpExecutor =
        P.createHttpError =
        P.HttpError =
        P.CancellationError =
        P.CancellationToken =
            void 0;
    P.asArray = F0;
    var $l = An();
    Object.defineProperty(P, "CancellationToken", {
        enumerable: !0,
        get: function () {
            return $l.CancellationToken;
        }
    });
    Object.defineProperty(P, "CancellationError", {
        enumerable: !0,
        get: function () {
            return $l.CancellationError;
        }
    });
    var He = Sl();
    Object.defineProperty(P, "HttpError", {
        enumerable: !0,
        get: function () {
            return He.HttpError;
        }
    });
    Object.defineProperty(P, "createHttpError", {
        enumerable: !0,
        get: function () {
            return He.createHttpError;
        }
    });
    Object.defineProperty(P, "HttpExecutor", {
        enumerable: !0,
        get: function () {
            return He.HttpExecutor;
        }
    });
    Object.defineProperty(P, "DigestTransform", {
        enumerable: !0,
        get: function () {
            return He.DigestTransform;
        }
    });
    Object.defineProperty(P, "safeGetHeader", {
        enumerable: !0,
        get: function () {
            return He.safeGetHeader;
        }
    });
    Object.defineProperty(P, "configureRequestOptions", {
        enumerable: !0,
        get: function () {
            return He.configureRequestOptions;
        }
    });
    Object.defineProperty(P, "configureRequestOptionsFromUrl", {
        enumerable: !0,
        get: function () {
            return He.configureRequestOptionsFromUrl;
        }
    });
    Object.defineProperty(P, "safeStringifyJson", {
        enumerable: !0,
        get: function () {
            return He.safeStringifyJson;
        }
    });
    Object.defineProperty(P, "parseJson", {
        enumerable: !0,
        get: function () {
            return He.parseJson;
        }
    });
    Object.defineProperty(P, "configureRequestUrl", {
        enumerable: !0,
        get: function () {
            return He.configureRequestUrl;
        }
    });
    var kl = Al();
    Object.defineProperty(P, "getS3LikeProviderBaseUrl", {
        enumerable: !0,
        get: function () {
            return kl.getS3LikeProviderBaseUrl;
        }
    });
    Object.defineProperty(P, "githubUrl", {
        enumerable: !0,
        get: function () {
            return kl.githubUrl;
        }
    });
    var O0 = Cl();
    Object.defineProperty(P, "parseDn", {
        enumerable: !0,
        get: function () {
            return O0.parseDn;
        }
    });
    var I0 = Nl();
    Object.defineProperty(P, "UUID", {
        enumerable: !0,
        get: function () {
            return I0.UUID;
        }
    });
    var N0 = go();
    Object.defineProperty(P, "ProgressCallbackTransform", {
        enumerable: !0,
        get: function () {
            return N0.ProgressCallbackTransform;
        }
    });
    var Ml = Pl();
    Object.defineProperty(P, "parseXml", {
        enumerable: !0,
        get: function () {
            return Ml.parseXml;
        }
    });
    Object.defineProperty(P, "XElement", {
        enumerable: !0,
        get: function () {
            return Ml.XElement;
        }
    });
    var D0 = br();
    Object.defineProperty(P, "newError", {
        enumerable: !0,
        get: function () {
            return D0.newError;
        }
    });
    var R0 = ql();
    Object.defineProperty(P, "MemoLazy", {
        enumerable: !0,
        get: function () {
            return R0.MemoLazy;
        }
    });
    var P0 = Ul();
    Object.defineProperty(P, "retry", {
        enumerable: !0,
        get: function () {
            return P0.retry;
        }
    });
    P.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe";
    P.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
    function F0(e) {
        return e == null ? [] : Array.isArray(e) ? e : [e];
    }
});
var be = g(xo => {
    "use strict";
    xo.fromCallback = function (e) {
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
    xo.fromPromise = function (e) {
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
var Hl = g((yO, Bl) => {
    var it = require("constants"),
        q0 = process.cwd,
        $n = null,
        L0 = process.env.GRACEFUL_FS_PLATFORM || process.platform;
    process.cwd = function () {
        return $n || ($n = q0.call(process)), $n;
    };
    try {
        process.cwd();
    } catch {}
    typeof process.chdir == "function" &&
        ((Ao = process.chdir),
        (process.chdir = function (e) {
            ($n = null), Ao.call(process, e);
        }),
        Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, Ao));
    var Ao;
    Bl.exports = U0;
    function U0(e) {
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
            L0 === "win32" &&
                (e.rename =
                    typeof e.rename != "function"
                        ? e.rename
                        : (function (c) {
                              function f(m, p, y) {
                                  var _ = Date.now(),
                                      v = 0;
                                  c(m, p, function C(x) {
                                      if (
                                          x &&
                                          (x.code === "EACCES" || x.code === "EPERM" || x.code === "EBUSY") &&
                                          Date.now() - _ < 6e4
                                      ) {
                                          setTimeout(function () {
                                              e.stat(p, function (N, L) {
                                                  N && N.code === "ENOENT" ? c(m, p, C) : y(x);
                                              });
                                          }, v),
                                              v < 100 && (v += 10);
                                          return;
                                      }
                                      y && y(x);
                                  });
                              }
                              return Object.setPrototypeOf && Object.setPrototypeOf(f, c), f;
                          })(e.rename)),
            (e.read =
                typeof e.read != "function"
                    ? e.read
                    : (function (c) {
                          function f(m, p, y, _, v, C) {
                              var x;
                              if (C && typeof C == "function") {
                                  var N = 0;
                                  x = function (L, Pe, V) {
                                      if (L && L.code === "EAGAIN" && N < 10) return N++, c.call(e, m, p, y, _, v, x);
                                      C.apply(this, arguments);
                                  };
                              }
                              return c.call(e, m, p, y, _, v, x);
                          }
                          return Object.setPrototypeOf && Object.setPrototypeOf(f, c), f;
                      })(e.read)),
            (e.readSync =
                typeof e.readSync != "function"
                    ? e.readSync
                    : (function (c) {
                          return function (f, m, p, y, _) {
                              for (var v = 0; ; )
                                  try {
                                      return c.call(e, f, m, p, y, _);
                                  } catch (C) {
                                      if (C.code === "EAGAIN" && v < 10) {
                                          v++;
                                          continue;
                                      }
                                      throw C;
                                  }
                          };
                      })(e.readSync));
        function t(c) {
            (c.lchmod = function (f, m, p) {
                c.open(f, it.O_WRONLY | it.O_SYMLINK, m, function (y, _) {
                    if (y) {
                        p && p(y);
                        return;
                    }
                    c.fchmod(_, m, function (v) {
                        c.close(_, function (C) {
                            p && p(v || C);
                        });
                    });
                });
            }),
                (c.lchmodSync = function (f, m) {
                    var p = c.openSync(f, it.O_WRONLY | it.O_SYMLINK, m),
                        y = !0,
                        _;
                    try {
                        (_ = c.fchmodSync(p, m)), (y = !1);
                    } finally {
                        if (y)
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
                ? ((c.lutimes = function (f, m, p, y) {
                      c.open(f, it.O_SYMLINK, function (_, v) {
                          if (_) {
                              y && y(_);
                              return;
                          }
                          c.futimes(v, m, p, function (C) {
                              c.close(v, function (x) {
                                  y && y(C || x);
                              });
                          });
                      });
                  }),
                  (c.lutimesSync = function (f, m, p) {
                      var y = c.openSync(f, it.O_SYMLINK),
                          _,
                          v = !0;
                      try {
                          (_ = c.futimesSync(y, m, p)), (v = !1);
                      } finally {
                          if (v)
                              try {
                                  c.closeSync(y);
                              } catch {}
                          else c.closeSync(y);
                      }
                      return _;
                  }))
                : c.futimes &&
                  ((c.lutimes = function (f, m, p, y) {
                      y && process.nextTick(y);
                  }),
                  (c.lutimesSync = function () {}));
        }
        function n(c) {
            return (
                c &&
                function (f, m, p) {
                    return c.call(e, f, m, function (y) {
                        h(y) && (y = null), p && p.apply(this, arguments);
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
                function (f, m, p, y) {
                    return c.call(e, f, m, p, function (_) {
                        h(_) && (_ = null), y && y.apply(this, arguments);
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
                    } catch (y) {
                        if (!h(y)) throw y;
                    }
                }
            );
        }
        function a(c) {
            return (
                c &&
                function (f, m, p) {
                    typeof m == "function" && ((p = m), (m = null));
                    function y(_, v) {
                        v && (v.uid < 0 && (v.uid += 4294967296), v.gid < 0 && (v.gid += 4294967296)),
                            p && p.apply(this, arguments);
                    }
                    return m ? c.call(e, f, m, y) : c.call(e, f, y);
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
var Gl = g((_O, Wl) => {
    var jl = require("stream").Stream;
    Wl.exports = $0;
    function $0(e) {
        return { ReadStream: t, WriteStream: r };
        function t(n, i) {
            if (!(this instanceof t)) return new t(n, i);
            jl.call(this);
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
            jl.call(this),
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
var Yl = g((vO, Vl) => {
    "use strict";
    Vl.exports = M0;
    var k0 =
        Object.getPrototypeOf ||
        function (e) {
            return e.__proto__;
        };
    function M0(e) {
        if (e === null || typeof e != "object") return e;
        if (e instanceof Object) var t = { __proto__: k0(e) };
        else var t = Object.create(null);
        return (
            Object.getOwnPropertyNames(e).forEach(function (r) {
                Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r));
            }),
            t
        );
    }
});
var ye = g((SO, bo) => {
    var J = require("fs"),
        B0 = Hl(),
        H0 = Gl(),
        j0 = Yl(),
        kn = require("util"),
        de,
        Bn;
    typeof Symbol == "function" && typeof Symbol.for == "function"
        ? ((de = Symbol.for("graceful-fs.queue")), (Bn = Symbol.for("graceful-fs.previous")))
        : ((de = "___graceful-fs.queue"), (Bn = "___graceful-fs.previous"));
    function W0() {}
    function Kl(e, t) {
        Object.defineProperty(e, de, {
            get: function () {
                return t;
            }
        });
    }
    var At = W0;
    kn.debuglog
        ? (At = kn.debuglog("gfs4"))
        : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") &&
          (At = function () {
              var e = kn.format.apply(kn, arguments);
              (e = "GFS4: " + e.split(/\n/).join("\nGFS4: ")), console.error(e);
          });
    J[de] ||
        ((zl = global[de] || []),
        Kl(J, zl),
        (J.close = (function (e) {
            function t(r, n) {
                return e.call(J, r, function (i) {
                    i || Xl(), typeof n == "function" && n.apply(this, arguments);
                });
            }
            return Object.defineProperty(t, Bn, { value: e }), t;
        })(J.close)),
        (J.closeSync = (function (e) {
            function t(r) {
                e.apply(J, arguments), Xl();
            }
            return Object.defineProperty(t, Bn, { value: e }), t;
        })(J.closeSync)),
        /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") &&
            process.on("exit", function () {
                At(J[de]), require("assert").equal(J[de].length, 0);
            }));
    var zl;
    global[de] || Kl(global, J[de]);
    bo.exports = Co(j0(J));
    process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !J.__patched && ((bo.exports = Co(J)), (J.__patched = !0));
    function Co(e) {
        B0(e), (e.gracefulify = Co), (e.createReadStream = Pe), (e.createWriteStream = V);
        var t = e.readFile;
        e.readFile = r;
        function r(R, U, D) {
            return typeof U == "function" && ((D = U), (U = null)), K(R, U, D);
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
        function i(R, U, D, K) {
            return typeof D == "function" && ((K = D), (D = null)), re(R, U, D, K);
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
        function s(R, U, D, K) {
            return typeof D == "function" && ((K = D), (D = null)), re(R, U, D, K);
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
        function l(R, U, D, K) {
            return typeof D == "function" && ((K = D), (D = 0)), re(R, U, D, K);
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
        function f(R, U, D) {
            typeof U == "function" && ((D = U), (U = null));
            var K = c.test(process.version)
                ? function (G, F, H, ee) {
                      return h(G, re(G, F, H, ee));
                  }
                : function (G, F, H, ee) {
                      return h(G, F, re(G, F, H, ee));
                  };
            return K(R, U, D);
            function re(X, G, F, H) {
                return function (ee, j) {
                    ee && (ee.code === "EMFILE" || ee.code === "ENFILE")
                        ? Kt([K, [X, G, F], ee, H || Date.now(), Date.now()])
                        : (j && j.sort && j.sort(), typeof F == "function" && F.call(this, ee, j));
                };
            }
        }
        if (process.version.substr(0, 4) === "v0.8") {
            var m = H0(e);
            (C = m.ReadStream), (N = m.WriteStream);
        }
        var p = e.ReadStream;
        p && ((C.prototype = Object.create(p.prototype)), (C.prototype.open = x));
        var y = e.WriteStream;
        y && ((N.prototype = Object.create(y.prototype)), (N.prototype.open = L)),
            Object.defineProperty(e, "ReadStream", {
                get: function () {
                    return C;
                },
                set: function (R) {
                    C = R;
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e, "WriteStream", {
                get: function () {
                    return N;
                },
                set: function (R) {
                    N = R;
                },
                enumerable: !0,
                configurable: !0
            });
        var _ = C;
        Object.defineProperty(e, "FileReadStream", {
            get: function () {
                return _;
            },
            set: function (R) {
                _ = R;
            },
            enumerable: !0,
            configurable: !0
        });
        var v = N;
        Object.defineProperty(e, "FileWriteStream", {
            get: function () {
                return v;
            },
            set: function (R) {
                v = R;
            },
            enumerable: !0,
            configurable: !0
        });
        function C(R, U) {
            return this instanceof C ? (p.apply(this, arguments), this) : C.apply(Object.create(C.prototype), arguments);
        }
        function x() {
            var R = this;
            E(R.path, R.flags, R.mode, function (U, D) {
                U ? (R.autoClose && R.destroy(), R.emit("error", U)) : ((R.fd = D), R.emit("open", D), R.read());
            });
        }
        function N(R, U) {
            return this instanceof N ? (y.apply(this, arguments), this) : N.apply(Object.create(N.prototype), arguments);
        }
        function L() {
            var R = this;
            E(R.path, R.flags, R.mode, function (U, D) {
                U ? (R.destroy(), R.emit("error", U)) : ((R.fd = D), R.emit("open", D));
            });
        }
        function Pe(R, U) {
            return new e.ReadStream(R, U);
        }
        function V(R, U) {
            return new e.WriteStream(R, U);
        }
        var ce = e.open;
        e.open = E;
        function E(R, U, D, K) {
            return typeof D == "function" && ((K = D), (D = null)), re(R, U, D, K);
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
        At("ENQUEUE", e[0].name, e[1]), J[de].push(e), To();
    }
    var Mn;
    function Xl() {
        for (var e = Date.now(), t = 0; t < J[de].length; ++t) J[de][t].length > 2 && ((J[de][t][3] = e), (J[de][t][4] = e));
        To();
    }
    function To() {
        if ((clearTimeout(Mn), (Mn = void 0), J[de].length !== 0)) {
            var e = J[de].shift(),
                t = e[0],
                r = e[1],
                n = e[2],
                i = e[3],
                o = e[4];
            if (i === void 0) At("RETRY", t.name, r), t.apply(null, r);
            else if (Date.now() - i >= 6e4) {
                At("TIMEOUT", t.name, r);
                var s = r.pop();
                typeof s == "function" && s.call(null, n);
            } else {
                var a = Date.now() - o,
                    l = Math.max(o - i, 1),
                    h = Math.min(l * 1.2, 100);
                a >= h ? (At("RETRY", t.name, r), t.apply(null, r.concat([i]))) : J[de].push(e);
            }
            Mn === void 0 && (Mn = setTimeout(To, 0));
        }
    }
});
var Ct = g(ot => {
    "use strict";
    var Jl = be().fromCallback,
        Oe = ye(),
        G0 = [
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
        ].filter(e => typeof Oe[e] == "function");
    Object.assign(ot, Oe);
    G0.forEach(e => {
        ot[e] = Jl(Oe[e]);
    });
    ot.exists = function (e, t) {
        return typeof t == "function" ? Oe.exists(e, t) : new Promise(r => Oe.exists(e, r));
    };
    ot.read = function (e, t, r, n, i, o) {
        return typeof o == "function"
            ? Oe.read(e, t, r, n, i, o)
            : new Promise((s, a) => {
                  Oe.read(e, t, r, n, i, (l, h, c) => {
                      if (l) return a(l);
                      s({ bytesRead: h, buffer: c });
                  });
              });
    };
    ot.write = function (e, t, ...r) {
        return typeof r[r.length - 1] == "function"
            ? Oe.write(e, t, ...r)
            : new Promise((n, i) => {
                  Oe.write(e, t, ...r, (o, s, a) => {
                      if (o) return i(o);
                      n({ bytesWritten: s, buffer: a });
                  });
              });
    };
    typeof Oe.writev == "function" &&
        (ot.writev = function (e, t, ...r) {
            return typeof r[r.length - 1] == "function"
                ? Oe.writev(e, t, ...r)
                : new Promise((n, i) => {
                      Oe.writev(e, t, ...r, (o, s, a) => {
                          if (o) return i(o);
                          n({ bytesWritten: s, buffers: a });
                      });
                  });
        });
    typeof Oe.realpath.native == "function"
        ? (ot.realpath.native = Jl(Oe.realpath.native))
        : process.emitWarning(
              "fs.realpath.native is not a function. Is fs being monkey-patched?",
              "Warning",
              "fs-extra-WARN0003"
          );
});
var Zl = g((AO, Ql) => {
    "use strict";
    var V0 = require("path");
    Ql.exports.checkPath = function (t) {
        if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(V0.parse(t).root, ""))) {
            let n = new Error("Path contains invalid characters: ".concat(t));
            throw ((n.code = "EINVAL"), n);
        }
    };
});
var nu = g((CO, Oo) => {
    "use strict";
    var eu = Ct(),
        { checkPath: tu } = Zl(),
        ru = e => {
            let t = { mode: 511 };
            return typeof e == "number" ? e : { ...t, ...e }.mode;
        };
    Oo.exports.makeDir = async (e, t) => (tu(e), eu.mkdir(e, { mode: ru(t), recursive: !0 }));
    Oo.exports.makeDirSync = (e, t) => (tu(e), eu.mkdirSync(e, { mode: ru(t), recursive: !0 }));
});
var ke = g((TO, iu) => {
    "use strict";
    var Y0 = be().fromPromise,
        { makeDir: z0, makeDirSync: Io } = nu(),
        No = Y0(z0);
    iu.exports = { mkdirs: No, mkdirsSync: Io, mkdirp: No, mkdirpSync: Io, ensureDir: No, ensureDirSync: Io };
});
var st = g((bO, su) => {
    "use strict";
    var X0 = be().fromPromise,
        ou = Ct();
    function K0(e) {
        return ou
            .access(e)
            .then(() => !0)
            .catch(() => !1);
    }
    su.exports = { pathExists: X0(K0), pathExistsSync: ou.existsSync };
});
var Do = g((OO, au) => {
    "use strict";
    var Jt = ye();
    function J0(e, t, r, n) {
        Jt.open(e, "r+", (i, o) => {
            if (i) return n(i);
            Jt.futimes(o, t, r, s => {
                Jt.close(o, a => {
                    n && n(s || a);
                });
            });
        });
    }
    function Q0(e, t, r) {
        let n = Jt.openSync(e, "r+");
        return Jt.futimesSync(n, t, r), Jt.closeSync(n);
    }
    au.exports = { utimesMillis: J0, utimesMillisSync: Q0 };
});
var Tt = g((IO, cu) => {
    "use strict";
    var Qt = Ct(),
        ue = require("path"),
        Z0 = require("util");
    function ew(e, t, r) {
        let n = r.dereference ? i => Qt.stat(i, { bigint: !0 }) : i => Qt.lstat(i, { bigint: !0 });
        return Promise.all([
            n(e),
            n(t).catch(i => {
                if (i.code === "ENOENT") return null;
                throw i;
            })
        ]).then(([i, o]) => ({ srcStat: i, destStat: o }));
    }
    function tw(e, t, r) {
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
    function rw(e, t, r, n, i) {
        Z0.callbackify(ew)(e, t, n, (o, s) => {
            if (o) return i(o);
            let { srcStat: a, destStat: l } = s;
            if (l) {
                if (Pr(a, l)) {
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
            return a.isDirectory() && Ro(e, t) ? i(new Error(Hn(e, t, r))) : i(null, { srcStat: a, destStat: l });
        });
    }
    function nw(e, t, r, n) {
        let { srcStat: i, destStat: o } = tw(e, t, n);
        if (o) {
            if (Pr(i, o)) {
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
        if (i.isDirectory() && Ro(e, t)) throw new Error(Hn(e, t, r));
        return { srcStat: i, destStat: o };
    }
    function lu(e, t, r, n, i) {
        let o = ue.resolve(ue.dirname(e)),
            s = ue.resolve(ue.dirname(r));
        if (s === o || s === ue.parse(s).root) return i();
        Qt.stat(s, { bigint: !0 }, (a, l) =>
            a ? (a.code === "ENOENT" ? i() : i(a)) : Pr(t, l) ? i(new Error(Hn(e, r, n))) : lu(e, t, s, n, i)
        );
    }
    function uu(e, t, r, n) {
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
        if (Pr(t, s)) throw new Error(Hn(e, r, n));
        return uu(e, t, o, n);
    }
    function Pr(e, t) {
        return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
    }
    function Ro(e, t) {
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
    cu.exports = {
        checkPaths: rw,
        checkPathsSync: nw,
        checkParentPaths: lu,
        checkParentPathsSync: uu,
        isSrcSubdir: Ro,
        areIdentical: Pr
    };
});
var Eu = g((NO, wu) => {
    "use strict";
    var Ie = ye(),
        Fr = require("path"),
        iw = ke().mkdirs,
        ow = st().pathExists,
        sw = Do().utimesMillis,
        qr = Tt();
    function aw(e, t, r, n) {
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
                qr.checkParentPaths(e, s, t, "copy", l => (l ? n(l) : r.filter ? hu(fu, a, e, t, r, n) : fu(a, e, t, r, n)));
            });
    }
    function fu(e, t, r, n, i) {
        let o = Fr.dirname(r);
        ow(o, (s, a) => {
            if (s) return i(s);
            if (a) return jn(e, t, r, n, i);
            iw(o, l => (l ? i(l) : jn(e, t, r, n, i)));
        });
    }
    function hu(e, t, r, n, i, o) {
        Promise.resolve(i.filter(r, n)).then(
            s => (s ? e(t, r, n, i, o) : o()),
            s => o(s)
        );
    }
    function lw(e, t, r, n, i) {
        return n.filter ? hu(jn, e, t, r, n, i) : jn(e, t, r, n, i);
    }
    function jn(e, t, r, n, i) {
        (n.dereference ? Ie.stat : Ie.lstat)(t, (s, a) =>
            s
                ? i(s)
                : a.isDirectory()
                ? mw(a, e, t, r, n, i)
                : a.isFile() || a.isCharacterDevice() || a.isBlockDevice()
                ? uw(a, e, t, r, n, i)
                : a.isSymbolicLink()
                ? Ew(e, t, r, n, i)
                : a.isSocket()
                ? i(new Error("Cannot copy a socket file: ".concat(t)))
                : a.isFIFO()
                ? i(new Error("Cannot copy a FIFO pipe: ".concat(t)))
                : i(new Error("Unknown file: ".concat(t)))
        );
    }
    function uw(e, t, r, n, i, o) {
        return t ? cw(e, r, n, i, o) : pu(e, r, n, i, o);
    }
    function cw(e, t, r, n, i) {
        if (n.overwrite) Ie.unlink(r, o => (o ? i(o) : pu(e, t, r, n, i)));
        else return n.errorOnExist ? i(new Error("'".concat(r, "' already exists"))) : i();
    }
    function pu(e, t, r, n, i) {
        Ie.copyFile(t, r, o => (o ? i(o) : n.preserveTimestamps ? fw(e.mode, t, r, i) : Wn(r, e.mode, i)));
    }
    function fw(e, t, r, n) {
        return dw(e) ? hw(r, e, i => (i ? n(i) : du(e, t, r, n))) : du(e, t, r, n);
    }
    function dw(e) {
        return (e & 128) === 0;
    }
    function hw(e, t, r) {
        return Wn(e, t | 128, r);
    }
    function du(e, t, r, n) {
        pw(t, r, i => (i ? n(i) : Wn(r, e, n)));
    }
    function Wn(e, t, r) {
        return Ie.chmod(e, t, r);
    }
    function pw(e, t, r) {
        Ie.stat(e, (n, i) => (n ? r(n) : sw(t, i.atime, i.mtime, r)));
    }
    function mw(e, t, r, n, i, o) {
        return t ? mu(r, n, i, o) : gw(e.mode, r, n, i, o);
    }
    function gw(e, t, r, n, i) {
        Ie.mkdir(r, o => {
            if (o) return i(o);
            mu(t, r, n, s => (s ? i(s) : Wn(r, e, i)));
        });
    }
    function mu(e, t, r, n) {
        Ie.readdir(e, (i, o) => (i ? n(i) : gu(o, e, t, r, n)));
    }
    function gu(e, t, r, n, i) {
        let o = e.pop();
        return o ? ww(e, o, t, r, n, i) : i();
    }
    function ww(e, t, r, n, i, o) {
        let s = Fr.join(r, t),
            a = Fr.join(n, t);
        qr.checkPaths(s, a, "copy", i, (l, h) => {
            if (l) return o(l);
            let { destStat: c } = h;
            lw(c, s, a, i, f => (f ? o(f) : gu(e, r, n, i, o)));
        });
    }
    function Ew(e, t, r, n, i) {
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
    wu.exports = aw;
});
var xu = g((DO, Su) => {
    "use strict";
    var he = ye(),
        Lr = require("path"),
        _w = ke().mkdirsSync,
        vw = Do().utimesMillisSync,
        Ur = Tt();
    function Sw(e, t, r) {
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
        return Ur.checkParentPathsSync(e, n, t, "copy"), xw(i, e, t, r);
    }
    function xw(e, t, r, n) {
        if (n.filter && !n.filter(t, r)) return;
        let i = Lr.dirname(r);
        return he.existsSync(i) || _w(i), yu(e, t, r, n);
    }
    function Aw(e, t, r, n) {
        if (!(n.filter && !n.filter(t, r))) return yu(e, t, r, n);
    }
    function yu(e, t, r, n) {
        let o = (n.dereference ? he.statSync : he.lstatSync)(t);
        if (o.isDirectory()) return Dw(o, e, t, r, n);
        if (o.isFile() || o.isCharacterDevice() || o.isBlockDevice()) return Cw(o, e, t, r, n);
        if (o.isSymbolicLink()) return Fw(e, t, r, n);
        throw o.isSocket()
            ? new Error("Cannot copy a socket file: ".concat(t))
            : o.isFIFO()
            ? new Error("Cannot copy a FIFO pipe: ".concat(t))
            : new Error("Unknown file: ".concat(t));
    }
    function Cw(e, t, r, n, i) {
        return t ? Tw(e, r, n, i) : _u(e, r, n, i);
    }
    function Tw(e, t, r, n) {
        if (n.overwrite) return he.unlinkSync(r), _u(e, t, r, n);
        if (n.errorOnExist) throw new Error("'".concat(r, "' already exists"));
    }
    function _u(e, t, r, n) {
        return he.copyFileSync(t, r), n.preserveTimestamps && bw(e.mode, t, r), Po(r, e.mode);
    }
    function bw(e, t, r) {
        return Ow(e) && Iw(r, e), Nw(t, r);
    }
    function Ow(e) {
        return (e & 128) === 0;
    }
    function Iw(e, t) {
        return Po(e, t | 128);
    }
    function Po(e, t) {
        return he.chmodSync(e, t);
    }
    function Nw(e, t) {
        let r = he.statSync(e);
        return vw(t, r.atime, r.mtime);
    }
    function Dw(e, t, r, n, i) {
        return t ? vu(r, n, i) : Rw(e.mode, r, n, i);
    }
    function Rw(e, t, r, n) {
        return he.mkdirSync(r), vu(t, r, n), Po(r, e);
    }
    function vu(e, t, r) {
        he.readdirSync(e).forEach(n => Pw(n, e, t, r));
    }
    function Pw(e, t, r, n) {
        let i = Lr.join(t, e),
            o = Lr.join(r, e),
            { destStat: s } = Ur.checkPathsSync(i, o, "copy", n);
        return Aw(s, i, o, n);
    }
    function Fw(e, t, r, n) {
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
            return qw(i, r);
        } else return he.symlinkSync(i, r);
    }
    function qw(e, t) {
        return he.unlinkSync(t), he.symlinkSync(e, t);
    }
    Su.exports = Sw;
});
var Gn = g((RO, Au) => {
    "use strict";
    var Lw = be().fromCallback;
    Au.exports = { copy: Lw(Eu()), copySync: xu() };
});
var Pu = g((PO, Ru) => {
    "use strict";
    var Cu = ye(),
        Iu = require("path"),
        W = require("assert"),
        $r = process.platform === "win32";
    function Nu(e) {
        ["unlink", "chmod", "stat", "lstat", "rmdir", "readdir"].forEach(r => {
            (e[r] = e[r] || Cu[r]), (r = r + "Sync"), (e[r] = e[r] || Cu[r]);
        }),
            (e.maxBusyTries = e.maxBusyTries || 3);
    }
    function Fo(e, t, r) {
        let n = 0;
        typeof t == "function" && ((r = t), (t = {})),
            W(e, "rimraf: missing path"),
            W.strictEqual(typeof e, "string", "rimraf: path should be a string"),
            W.strictEqual(typeof r, "function", "rimraf: callback function required"),
            W(t, "rimraf: invalid options argument provided"),
            W.strictEqual(typeof t, "object", "rimraf: options should be object"),
            Nu(t),
            Tu(e, t, function i(o) {
                if (o) {
                    if ((o.code === "EBUSY" || o.code === "ENOTEMPTY" || o.code === "EPERM") && n < t.maxBusyTries) {
                        n++;
                        let s = n * 100;
                        return setTimeout(() => Tu(e, t, i), s);
                    }
                    o.code === "ENOENT" && (o = null);
                }
                r(o);
            });
    }
    function Tu(e, t, r) {
        W(e),
            W(t),
            W(typeof r == "function"),
            t.lstat(e, (n, i) => {
                if (n && n.code === "ENOENT") return r(null);
                if (n && n.code === "EPERM" && $r) return bu(e, t, n, r);
                if (i && i.isDirectory()) return Vn(e, t, n, r);
                t.unlink(e, o => {
                    if (o) {
                        if (o.code === "ENOENT") return r(null);
                        if (o.code === "EPERM") return $r ? bu(e, t, o, r) : Vn(e, t, o, r);
                        if (o.code === "EISDIR") return Vn(e, t, o, r);
                    }
                    return r(o);
                });
            });
    }
    function bu(e, t, r, n) {
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
    function Ou(e, t, r) {
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
                    ? Uw(e, t, n)
                    : i && i.code === "ENOTDIR"
                    ? n(r)
                    : n(i);
            });
    }
    function Uw(e, t, r) {
        W(e),
            W(t),
            W(typeof r == "function"),
            t.readdir(e, (n, i) => {
                if (n) return r(n);
                let o = i.length,
                    s;
                if (o === 0) return t.rmdir(e, r);
                i.forEach(a => {
                    Fo(Iu.join(e, a), t, l => {
                        if (!s) {
                            if (l) return r((s = l));
                            --o === 0 && t.rmdir(e, r);
                        }
                    });
                });
            });
    }
    function Du(e, t) {
        let r;
        (t = t || {}),
            Nu(t),
            W(e, "rimraf: missing path"),
            W.strictEqual(typeof e, "string", "rimraf: path should be a string"),
            W(t, "rimraf: missing options"),
            W.strictEqual(typeof t, "object", "rimraf: options should be object");
        try {
            r = t.lstatSync(e);
        } catch (n) {
            if (n.code === "ENOENT") return;
            n.code === "EPERM" && $r && Ou(e, t, n);
        }
        try {
            r && r.isDirectory() ? Yn(e, t, null) : t.unlinkSync(e);
        } catch (n) {
            if (n.code === "ENOENT") return;
            if (n.code === "EPERM") return $r ? Ou(e, t, n) : Yn(e, t, n);
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
            if (n.code === "ENOTEMPTY" || n.code === "EEXIST" || n.code === "EPERM") $w(e, t);
            else if (n.code !== "ENOENT") throw n;
        }
    }
    function $w(e, t) {
        if ((W(e), W(t), t.readdirSync(e).forEach(r => Du(Iu.join(e, r), t)), $r)) {
            let r = Date.now();
            do
                try {
                    return t.rmdirSync(e, t);
                } catch {}
            while (Date.now() - r < 500);
        } else return t.rmdirSync(e, t);
    }
    Ru.exports = Fo;
    Fo.sync = Du;
});
var kr = g((FO, qu) => {
    "use strict";
    var zn = ye(),
        kw = be().fromCallback,
        Fu = Pu();
    function Mw(e, t) {
        if (zn.rm) return zn.rm(e, { recursive: !0, force: !0 }, t);
        Fu(e, t);
    }
    function Bw(e) {
        if (zn.rmSync) return zn.rmSync(e, { recursive: !0, force: !0 });
        Fu.sync(e);
    }
    qu.exports = { remove: kw(Mw), removeSync: Bw };
});
var ju = g((qO, Hu) => {
    "use strict";
    var Hw = be().fromPromise,
        $u = Ct(),
        ku = require("path"),
        Mu = ke(),
        Bu = kr(),
        Lu = Hw(async function (t) {
            let r;
            try {
                r = await $u.readdir(t);
            } catch {
                return Mu.mkdirs(t);
            }
            return Promise.all(r.map(n => Bu.remove(ku.join(t, n))));
        });
    function Uu(e) {
        let t;
        try {
            t = $u.readdirSync(e);
        } catch {
            return Mu.mkdirsSync(e);
        }
        t.forEach(r => {
            (r = ku.join(e, r)), Bu.removeSync(r);
        });
    }
    Hu.exports = { emptyDirSync: Uu, emptydirSync: Uu, emptyDir: Lu, emptydir: Lu };
});
var Yu = g((LO, Vu) => {
    "use strict";
    var jw = be().fromCallback,
        Wu = require("path"),
        at = ye(),
        Gu = ke();
    function Ww(e, t) {
        function r() {
            at.writeFile(e, "", n => {
                if (n) return t(n);
                t();
            });
        }
        at.stat(e, (n, i) => {
            if (!n && i.isFile()) return t();
            let o = Wu.dirname(e);
            at.stat(o, (s, a) => {
                if (s)
                    return s.code === "ENOENT"
                        ? Gu.mkdirs(o, l => {
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
    function Gw(e) {
        let t;
        try {
            t = at.statSync(e);
        } catch {}
        if (t && t.isFile()) return;
        let r = Wu.dirname(e);
        try {
            at.statSync(r).isDirectory() || at.readdirSync(r);
        } catch (n) {
            if (n && n.code === "ENOENT") Gu.mkdirsSync(r);
            else throw n;
        }
        at.writeFileSync(e, "");
    }
    Vu.exports = { createFile: jw(Ww), createFileSync: Gw };
});
var Qu = g((UO, Ju) => {
    "use strict";
    var Vw = be().fromCallback,
        zu = require("path"),
        lt = ye(),
        Xu = ke(),
        Yw = st().pathExists,
        { areIdentical: Ku } = Tt();
    function zw(e, t, r) {
        function n(i, o) {
            lt.link(i, o, s => {
                if (s) return r(s);
                r(null);
            });
        }
        lt.lstat(t, (i, o) => {
            lt.lstat(e, (s, a) => {
                if (s) return (s.message = s.message.replace("lstat", "ensureLink")), r(s);
                if (o && Ku(a, o)) return r(null);
                let l = zu.dirname(t);
                Yw(l, (h, c) => {
                    if (h) return r(h);
                    if (c) return n(e, t);
                    Xu.mkdirs(l, f => {
                        if (f) return r(f);
                        n(e, t);
                    });
                });
            });
        });
    }
    function Xw(e, t) {
        let r;
        try {
            r = lt.lstatSync(t);
        } catch {}
        try {
            let o = lt.lstatSync(e);
            if (r && Ku(o, r)) return;
        } catch (o) {
            throw ((o.message = o.message.replace("lstat", "ensureLink")), o);
        }
        let n = zu.dirname(t);
        return lt.existsSync(n) || Xu.mkdirsSync(n), lt.linkSync(e, t);
    }
    Ju.exports = { createLink: Vw(zw), createLinkSync: Xw };
});
var ec = g(($O, Zu) => {
    "use strict";
    var ut = require("path"),
        Mr = ye(),
        Kw = st().pathExists;
    function Jw(e, t, r) {
        if (ut.isAbsolute(e))
            return Mr.lstat(e, n =>
                n ? ((n.message = n.message.replace("lstat", "ensureSymlink")), r(n)) : r(null, { toCwd: e, toDst: e })
            );
        {
            let n = ut.dirname(t),
                i = ut.join(n, e);
            return Kw(i, (o, s) =>
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
    function Qw(e, t) {
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
    Zu.exports = { symlinkPaths: Jw, symlinkPathsSync: Qw };
});
var nc = g((kO, rc) => {
    "use strict";
    var tc = ye();
    function Zw(e, t, r) {
        if (((r = typeof t == "function" ? t : r), (t = typeof t == "function" ? !1 : t), t)) return r(null, t);
        tc.lstat(e, (n, i) => {
            if (n) return r(null, "file");
            (t = i && i.isDirectory() ? "dir" : "file"), r(null, t);
        });
    }
    function eE(e, t) {
        let r;
        if (t) return t;
        try {
            r = tc.lstatSync(e);
        } catch {
            return "file";
        }
        return r && r.isDirectory() ? "dir" : "file";
    }
    rc.exports = { symlinkType: Zw, symlinkTypeSync: eE };
});
var fc = g((MO, cc) => {
    "use strict";
    var tE = be().fromCallback,
        oc = require("path"),
        Me = Ct(),
        sc = ke(),
        rE = sc.mkdirs,
        nE = sc.mkdirsSync,
        ac = ec(),
        iE = ac.symlinkPaths,
        oE = ac.symlinkPathsSync,
        lc = nc(),
        sE = lc.symlinkType,
        aE = lc.symlinkTypeSync,
        lE = st().pathExists,
        { areIdentical: uc } = Tt();
    function uE(e, t, r, n) {
        (n = typeof r == "function" ? r : n),
            (r = typeof r == "function" ? !1 : r),
            Me.lstat(t, (i, o) => {
                !i && o.isSymbolicLink()
                    ? Promise.all([Me.stat(e), Me.stat(t)]).then(([s, a]) => {
                          if (uc(s, a)) return n(null);
                          ic(e, t, r, n);
                      })
                    : ic(e, t, r, n);
            });
    }
    function ic(e, t, r, n) {
        iE(e, t, (i, o) => {
            if (i) return n(i);
            (e = o.toDst),
                sE(o.toCwd, r, (s, a) => {
                    if (s) return n(s);
                    let l = oc.dirname(t);
                    lE(l, (h, c) => {
                        if (h) return n(h);
                        if (c) return Me.symlink(e, t, a, n);
                        rE(l, f => {
                            if (f) return n(f);
                            Me.symlink(e, t, a, n);
                        });
                    });
                });
        });
    }
    function cE(e, t, r) {
        let n;
        try {
            n = Me.lstatSync(t);
        } catch {}
        if (n && n.isSymbolicLink()) {
            let a = Me.statSync(e),
                l = Me.statSync(t);
            if (uc(a, l)) return;
        }
        let i = oE(e, t);
        (e = i.toDst), (r = aE(i.toCwd, r));
        let o = oc.dirname(t);
        return Me.existsSync(o) || nE(o), Me.symlinkSync(e, t, r);
    }
    cc.exports = { createSymlink: tE(uE), createSymlinkSync: cE };
});
var yc = g((BO, Ec) => {
    "use strict";
    var { createFile: dc, createFileSync: hc } = Yu(),
        { createLink: pc, createLinkSync: mc } = Qu(),
        { createSymlink: gc, createSymlinkSync: wc } = fc();
    Ec.exports = {
        createFile: dc,
        createFileSync: hc,
        ensureFile: dc,
        ensureFileSync: hc,
        createLink: pc,
        createLinkSync: mc,
        ensureLink: pc,
        ensureLinkSync: mc,
        createSymlink: gc,
        createSymlinkSync: wc,
        ensureSymlink: gc,
        ensureSymlinkSync: wc
    };
});
var Xn = g((HO, _c) => {
    function fE(e, { EOL: t = "\n", finalEOL: r = !0, replacer: n = null, spaces: i } = {}) {
        let o = r ? t : "";
        return JSON.stringify(e, n, i).replace(/\n/g, t) + o;
    }
    function dE(e) {
        return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
    }
    _c.exports = { stringify: fE, stripBom: dE };
});
var Ac = g((jO, xc) => {
    var Zt;
    try {
        Zt = ye();
    } catch {
        Zt = require("fs");
    }
    var Kn = be(),
        { stringify: vc, stripBom: Sc } = Xn();
    async function hE(e, t = {}) {
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
    var pE = Kn.fromPromise(hE);
    function mE(e, t = {}) {
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
    async function gE(e, t, r = {}) {
        let n = r.fs || Zt,
            i = vc(t, r);
        await Kn.fromCallback(n.writeFile)(e, i, r);
    }
    var wE = Kn.fromPromise(gE);
    function EE(e, t, r = {}) {
        let n = r.fs || Zt,
            i = vc(t, r);
        return n.writeFileSync(e, i, r);
    }
    var yE = { readFile: pE, readFileSync: mE, writeFile: wE, writeFileSync: EE };
    xc.exports = yE;
});
var Tc = g((WO, Cc) => {
    "use strict";
    var Jn = Ac();
    Cc.exports = {
        readJson: Jn.readFile,
        readJsonSync: Jn.readFileSync,
        writeJson: Jn.writeFile,
        writeJsonSync: Jn.writeFileSync
    };
});
var Qn = g((GO, Ic) => {
    "use strict";
    var _E = be().fromCallback,
        Br = ye(),
        bc = require("path"),
        Oc = ke(),
        vE = st().pathExists;
    function SE(e, t, r, n) {
        typeof r == "function" && ((n = r), (r = "utf8"));
        let i = bc.dirname(e);
        vE(i, (o, s) => {
            if (o) return n(o);
            if (s) return Br.writeFile(e, t, r, n);
            Oc.mkdirs(i, a => {
                if (a) return n(a);
                Br.writeFile(e, t, r, n);
            });
        });
    }
    function xE(e, ...t) {
        let r = bc.dirname(e);
        if (Br.existsSync(r)) return Br.writeFileSync(e, ...t);
        Oc.mkdirsSync(r), Br.writeFileSync(e, ...t);
    }
    Ic.exports = { outputFile: _E(SE), outputFileSync: xE };
});
var Dc = g((VO, Nc) => {
    "use strict";
    var { stringify: AE } = Xn(),
        { outputFile: CE } = Qn();
    async function TE(e, t, r = {}) {
        let n = AE(t, r);
        await CE(e, n, r);
    }
    Nc.exports = TE;
});
var Pc = g((YO, Rc) => {
    "use strict";
    var { stringify: bE } = Xn(),
        { outputFileSync: OE } = Qn();
    function IE(e, t, r) {
        let n = bE(t, r);
        OE(e, n, r);
    }
    Rc.exports = IE;
});
var qc = g((zO, Fc) => {
    "use strict";
    var NE = be().fromPromise,
        _e = Tc();
    _e.outputJson = NE(Dc());
    _e.outputJsonSync = Pc();
    _e.outputJSON = _e.outputJson;
    _e.outputJSONSync = _e.outputJsonSync;
    _e.writeJSON = _e.writeJson;
    _e.writeJSONSync = _e.writeJsonSync;
    _e.readJSON = _e.readJson;
    _e.readJSONSync = _e.readJsonSync;
    Fc.exports = _e;
});
var Mc = g((XO, kc) => {
    "use strict";
    var DE = ye(),
        Lo = require("path"),
        RE = Gn().copy,
        $c = kr().remove,
        PE = ke().mkdirp,
        FE = st().pathExists,
        Lc = Tt();
    function qE(e, t, r, n) {
        typeof r == "function" && ((n = r), (r = {})), (r = r || {});
        let i = r.overwrite || r.clobber || !1;
        Lc.checkPaths(e, t, "move", r, (o, s) => {
            if (o) return n(o);
            let { srcStat: a, isChangingCase: l = !1 } = s;
            Lc.checkParentPaths(e, a, t, "move", h => {
                if (h) return n(h);
                if (LE(t)) return Uc(e, t, i, l, n);
                PE(Lo.dirname(t), c => (c ? n(c) : Uc(e, t, i, l, n)));
            });
        });
    }
    function LE(e) {
        let t = Lo.dirname(e);
        return Lo.parse(t).root === t;
    }
    function Uc(e, t, r, n, i) {
        if (n) return qo(e, t, r, i);
        if (r) return $c(t, o => (o ? i(o) : qo(e, t, r, i)));
        FE(t, (o, s) => (o ? i(o) : s ? i(new Error("dest already exists.")) : qo(e, t, r, i)));
    }
    function qo(e, t, r, n) {
        DE.rename(e, t, i => (i ? (i.code !== "EXDEV" ? n(i) : UE(e, t, r, n)) : n()));
    }
    function UE(e, t, r, n) {
        RE(e, t, { overwrite: r, errorOnExist: !0 }, o => (o ? n(o) : $c(e, n)));
    }
    kc.exports = qE;
});
var Gc = g((KO, Wc) => {
    "use strict";
    var Hc = ye(),
        $o = require("path"),
        $E = Gn().copySync,
        jc = kr().removeSync,
        kE = ke().mkdirpSync,
        Bc = Tt();
    function ME(e, t, r) {
        r = r || {};
        let n = r.overwrite || r.clobber || !1,
            { srcStat: i, isChangingCase: o = !1 } = Bc.checkPathsSync(e, t, "move", r);
        return Bc.checkParentPathsSync(e, i, t, "move"), BE(t) || kE($o.dirname(t)), HE(e, t, n, o);
    }
    function BE(e) {
        let t = $o.dirname(e);
        return $o.parse(t).root === t;
    }
    function HE(e, t, r, n) {
        if (n) return Uo(e, t, r);
        if (r) return jc(t), Uo(e, t, r);
        if (Hc.existsSync(t)) throw new Error("dest already exists.");
        return Uo(e, t, r);
    }
    function Uo(e, t, r) {
        try {
            Hc.renameSync(e, t);
        } catch (n) {
            if (n.code !== "EXDEV") throw n;
            return jE(e, t, r);
        }
    }
    function jE(e, t, r) {
        return $E(e, t, { overwrite: r, errorOnExist: !0 }), jc(e);
    }
    Wc.exports = ME;
});
var Yc = g((JO, Vc) => {
    "use strict";
    var WE = be().fromCallback;
    Vc.exports = { move: WE(Mc()), moveSync: Gc() };
});
var Xe = g((QO, zc) => {
    "use strict";
    zc.exports = { ...Ct(), ...Gn(), ...ju(), ...yc(), ...qc(), ...ke(), ...Yc(), ...Qn(), ...st(), ...kr() };
});
var er = g((ZO, bt) => {
    "use strict";
    function Xc(e) {
        return typeof e > "u" || e === null;
    }
    function GE(e) {
        return typeof e == "object" && e !== null;
    }
    function VE(e) {
        return Array.isArray(e) ? e : Xc(e) ? [] : [e];
    }
    function YE(e, t) {
        var r, n, i, o;
        if (t) for (o = Object.keys(t), r = 0, n = o.length; r < n; r += 1) (i = o[r]), (e[i] = t[i]);
        return e;
    }
    function zE(e, t) {
        var r = "",
            n;
        for (n = 0; n < t; n += 1) r += e;
        return r;
    }
    function XE(e) {
        return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
    }
    bt.exports.isNothing = Xc;
    bt.exports.isObject = GE;
    bt.exports.toArray = VE;
    bt.exports.repeat = zE;
    bt.exports.isNegativeZero = XE;
    bt.exports.extend = YE;
});
var tr = g((eI, Jc) => {
    "use strict";
    function Kc(e, t) {
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
            (this.message = Kc(this, !1)),
            Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : (this.stack = new Error().stack || "");
    }
    Hr.prototype = Object.create(Error.prototype);
    Hr.prototype.constructor = Hr;
    Hr.prototype.toString = function (t) {
        return this.name + ": " + Kc(this, t);
    };
    Jc.exports = Hr;
});
var Zc = g((tI, Qc) => {
    "use strict";
    var jr = er();
    function ko(e, t, r, n, i) {
        var o = "",
            s = "",
            a = Math.floor(i / 2) - 1;
        return (
            n - t > a && ((o = " ... "), (t = n - a + o.length)),
            r - n > a && ((s = " ..."), (r = n + a - s.length)),
            { str: o + e.slice(t, r).replace(/\t/g, "\u2192") + s, pos: n - t + o.length }
        );
    }
    function Mo(e, t) {
        return jr.repeat(" ", t - e.length) + e;
    }
    function KE(e, t) {
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
            (h = ko(e.buffer, n[s - l], i[s - l], e.position - (n[s] - n[s - l]), f)),
                (a = jr.repeat(" ", t.indent) + Mo((e.line - l + 1).toString(), c) + " | " + h.str + "\n" + a);
        for (
            h = ko(e.buffer, n[s], i[s], e.position, f),
                a += jr.repeat(" ", t.indent) + Mo((e.line + 1).toString(), c) + " | " + h.str + "\n",
                a += jr.repeat("-", t.indent + c + 3 + h.pos) + "^\n",
                l = 1;
            l <= t.linesAfter && !(s + l >= i.length);
            l++
        )
            (h = ko(e.buffer, n[s + l], i[s + l], e.position - (n[s] - n[s + l]), f)),
                (a += jr.repeat(" ", t.indent) + Mo((e.line + l + 1).toString(), c) + " | " + h.str + "\n");
        return a.replace(/\n$/, "");
    }
    Qc.exports = KE;
});
var pe = g((rI, tf) => {
    "use strict";
    var ef = tr(),
        JE = [
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
        QE = ["scalar", "sequence", "mapping"];
    function ZE(e) {
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
    function ey(e, t) {
        if (
            ((t = t || {}),
            Object.keys(t).forEach(function (r) {
                if (JE.indexOf(r) === -1)
                    throw new ef('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
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
            (this.styleAliases = ZE(t.styleAliases || null)),
            QE.indexOf(this.kind) === -1)
        )
            throw new ef('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
    }
    tf.exports = ey;
});
var jo = g((nI, nf) => {
    "use strict";
    var Wr = tr(),
        Bo = pe();
    function rf(e, t) {
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
    function ty() {
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
    function Ho(e) {
        return this.extend(e);
    }
    Ho.prototype.extend = function (t) {
        var r = [],
            n = [];
        if (t instanceof Bo) n.push(t);
        else if (Array.isArray(t)) n = n.concat(t);
        else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
            t.implicit && (r = r.concat(t.implicit)), t.explicit && (n = n.concat(t.explicit));
        else
            throw new Wr(
                "Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })"
            );
        r.forEach(function (o) {
            if (!(o instanceof Bo))
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
                if (!(o instanceof Bo))
                    throw new Wr("Specified list of YAML types (or a single Type object) contains a non-Type object.");
            });
        var i = Object.create(Ho.prototype);
        return (
            (i.implicit = (this.implicit || []).concat(r)),
            (i.explicit = (this.explicit || []).concat(n)),
            (i.compiledImplicit = rf(i, "implicit")),
            (i.compiledExplicit = rf(i, "explicit")),
            (i.compiledTypeMap = ty(i.compiledImplicit, i.compiledExplicit)),
            i
        );
    };
    nf.exports = Ho;
});
var Wo = g((iI, of) => {
    "use strict";
    var ry = pe();
    of.exports = new ry("tag:yaml.org,2002:str", {
        kind: "scalar",
        construct: function (e) {
            return e !== null ? e : "";
        }
    });
});
var Go = g((oI, sf) => {
    "use strict";
    var ny = pe();
    sf.exports = new ny("tag:yaml.org,2002:seq", {
        kind: "sequence",
        construct: function (e) {
            return e !== null ? e : [];
        }
    });
});
var Vo = g((sI, af) => {
    "use strict";
    var iy = pe();
    af.exports = new iy("tag:yaml.org,2002:map", {
        kind: "mapping",
        construct: function (e) {
            return e !== null ? e : {};
        }
    });
});
var Yo = g((aI, lf) => {
    "use strict";
    var oy = jo();
    lf.exports = new oy({ explicit: [Wo(), Go(), Vo()] });
});
var zo = g((lI, uf) => {
    "use strict";
    var sy = pe();
    function ay(e) {
        if (e === null) return !0;
        var t = e.length;
        return (t === 1 && e === "~") || (t === 4 && (e === "null" || e === "Null" || e === "NULL"));
    }
    function ly() {
        return null;
    }
    function uy(e) {
        return e === null;
    }
    uf.exports = new sy("tag:yaml.org,2002:null", {
        kind: "scalar",
        resolve: ay,
        construct: ly,
        predicate: uy,
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
var Xo = g((uI, cf) => {
    "use strict";
    var cy = pe();
    function fy(e) {
        if (e === null) return !1;
        var t = e.length;
        return (
            (t === 4 && (e === "true" || e === "True" || e === "TRUE")) ||
            (t === 5 && (e === "false" || e === "False" || e === "FALSE"))
        );
    }
    function dy(e) {
        return e === "true" || e === "True" || e === "TRUE";
    }
    function hy(e) {
        return Object.prototype.toString.call(e) === "[object Boolean]";
    }
    cf.exports = new cy("tag:yaml.org,2002:bool", {
        kind: "scalar",
        resolve: fy,
        construct: dy,
        predicate: hy,
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
var Ko = g((cI, ff) => {
    "use strict";
    var py = er(),
        my = pe();
    function gy(e) {
        return (48 <= e && e <= 57) || (65 <= e && e <= 70) || (97 <= e && e <= 102);
    }
    function wy(e) {
        return 48 <= e && e <= 55;
    }
    function Ey(e) {
        return 48 <= e && e <= 57;
    }
    function yy(e) {
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
                        if (!gy(e.charCodeAt(r))) return !1;
                        n = !0;
                    }
                return n && i !== "_";
            }
            if (i === "o") {
                for (r++; r < t; r++)
                    if (((i = e[r]), i !== "_")) {
                        if (!wy(e.charCodeAt(r))) return !1;
                        n = !0;
                    }
                return n && i !== "_";
            }
        }
        if (i === "_") return !1;
        for (; r < t; r++)
            if (((i = e[r]), i !== "_")) {
                if (!Ey(e.charCodeAt(r))) return !1;
                n = !0;
            }
        return !(!n || i === "_");
    }
    function _y(e) {
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
    function vy(e) {
        return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !py.isNegativeZero(e);
    }
    ff.exports = new my("tag:yaml.org,2002:int", {
        kind: "scalar",
        resolve: yy,
        construct: _y,
        predicate: vy,
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
var Jo = g((fI, hf) => {
    "use strict";
    var df = er(),
        Sy = pe(),
        xy = new RegExp(
            "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
        );
    function Ay(e) {
        return !(e === null || !xy.test(e) || e[e.length - 1] === "_");
    }
    function Cy(e) {
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
    var Ty = /^[-+]?[0-9]+e/;
    function by(e, t) {
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
        else if (df.isNegativeZero(e)) return "-0.0";
        return (r = e.toString(10)), Ty.test(r) ? r.replace("e", ".e") : r;
    }
    function Oy(e) {
        return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || df.isNegativeZero(e));
    }
    hf.exports = new Sy("tag:yaml.org,2002:float", {
        kind: "scalar",
        resolve: Ay,
        construct: Cy,
        predicate: Oy,
        represent: by,
        defaultStyle: "lowercase"
    });
});
var Qo = g((dI, pf) => {
    "use strict";
    pf.exports = Yo().extend({ implicit: [zo(), Xo(), Ko(), Jo()] });
});
var Zo = g((hI, mf) => {
    "use strict";
    mf.exports = Qo();
});
var es = g((pI, Ef) => {
    "use strict";
    var Iy = pe(),
        gf = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),
        wf = new RegExp(
            "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
        );
    function Ny(e) {
        return e === null ? !1 : gf.exec(e) !== null || wf.exec(e) !== null;
    }
    function Dy(e) {
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
        if (((t = gf.exec(e)), t === null && (t = wf.exec(e)), t === null)) throw new Error("Date resolve error");
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
    function Ry(e) {
        return e.toISOString();
    }
    Ef.exports = new Iy("tag:yaml.org,2002:timestamp", {
        kind: "scalar",
        resolve: Ny,
        construct: Dy,
        instanceOf: Date,
        represent: Ry
    });
});
var ts = g((mI, yf) => {
    "use strict";
    var Py = pe();
    function Fy(e) {
        return e === "<<" || e === null;
    }
    yf.exports = new Py("tag:yaml.org,2002:merge", { kind: "scalar", resolve: Fy });
});
var ns = g((gI, _f) => {
    "use strict";
    var qy = pe(),
        rs = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
    function Ly(e) {
        if (e === null) return !1;
        var t,
            r,
            n = 0,
            i = e.length,
            o = rs;
        for (r = 0; r < i; r++)
            if (((t = o.indexOf(e.charAt(r))), !(t > 64))) {
                if (t < 0) return !1;
                n += 6;
            }
        return n % 8 === 0;
    }
    function Uy(e) {
        var t,
            r,
            n = e.replace(/[\r\n=]/g, ""),
            i = n.length,
            o = rs,
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
    function $y(e) {
        var t = "",
            r = 0,
            n,
            i,
            o = e.length,
            s = rs;
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
    function ky(e) {
        return Object.prototype.toString.call(e) === "[object Uint8Array]";
    }
    _f.exports = new qy("tag:yaml.org,2002:binary", { kind: "scalar", resolve: Ly, construct: Uy, predicate: ky, represent: $y });
});
var is = g((wI, vf) => {
    "use strict";
    var My = pe(),
        By = Object.prototype.hasOwnProperty,
        Hy = Object.prototype.toString;
    function jy(e) {
        if (e === null) return !0;
        var t = [],
            r,
            n,
            i,
            o,
            s,
            a = e;
        for (r = 0, n = a.length; r < n; r += 1) {
            if (((i = a[r]), (s = !1), Hy.call(i) !== "[object Object]")) return !1;
            for (o in i)
                if (By.call(i, o))
                    if (!s) s = !0;
                    else return !1;
            if (!s) return !1;
            if (t.indexOf(o) === -1) t.push(o);
            else return !1;
        }
        return !0;
    }
    function Wy(e) {
        return e !== null ? e : [];
    }
    vf.exports = new My("tag:yaml.org,2002:omap", { kind: "sequence", resolve: jy, construct: Wy });
});
var os = g((EI, Sf) => {
    "use strict";
    var Gy = pe(),
        Vy = Object.prototype.toString;
    function Yy(e) {
        if (e === null) return !0;
        var t,
            r,
            n,
            i,
            o,
            s = e;
        for (o = new Array(s.length), t = 0, r = s.length; t < r; t += 1) {
            if (((n = s[t]), Vy.call(n) !== "[object Object]" || ((i = Object.keys(n)), i.length !== 1))) return !1;
            o[t] = [i[0], n[i[0]]];
        }
        return !0;
    }
    function zy(e) {
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
    Sf.exports = new Gy("tag:yaml.org,2002:pairs", { kind: "sequence", resolve: Yy, construct: zy });
});
var ss = g((yI, xf) => {
    "use strict";
    var Xy = pe(),
        Ky = Object.prototype.hasOwnProperty;
    function Jy(e) {
        if (e === null) return !0;
        var t,
            r = e;
        for (t in r) if (Ky.call(r, t) && r[t] !== null) return !1;
        return !0;
    }
    function Qy(e) {
        return e !== null ? e : {};
    }
    xf.exports = new Xy("tag:yaml.org,2002:set", { kind: "mapping", resolve: Jy, construct: Qy });
});
var Zn = g((_I, Af) => {
    "use strict";
    Af.exports = Zo().extend({ implicit: [es(), ts()], explicit: [ns(), is(), os(), ss()] });
});
var Mf = g((vI, cs) => {
    "use strict";
    var It = er(),
        Df = tr(),
        Zy = Zc(),
        e_ = Zn(),
        ft = Object.prototype.hasOwnProperty,
        ei = 1,
        Rf = 2,
        Pf = 3,
        ti = 4,
        as = 1,
        t_ = 2,
        Cf = 3,
        r_ =
            /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,
        n_ = /[\x85\u2028\u2029]/,
        i_ = /[,\[\]\{\}]/,
        Ff = /^(?:!|!!|![a-z\-]+!)$/i,
        qf = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
    function Tf(e) {
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
    function o_(e) {
        var t;
        return 48 <= e && e <= 57 ? e - 48 : ((t = e | 32), 97 <= t && t <= 102 ? t - 97 + 10 : -1);
    }
    function s_(e) {
        return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
    }
    function a_(e) {
        return 48 <= e && e <= 57 ? e - 48 : -1;
    }
    function bf(e) {
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
    function l_(e) {
        return e <= 65535
            ? String.fromCharCode(e)
            : String.fromCharCode(((e - 65536) >> 10) + 55296, ((e - 65536) & 1023) + 56320);
    }
    var Lf = new Array(256),
        Uf = new Array(256);
    for (Ot = 0; Ot < 256; Ot++) (Lf[Ot] = bf(Ot) ? 1 : 0), (Uf[Ot] = bf(Ot));
    var Ot;
    function u_(e, t) {
        (this.input = e),
            (this.filename = t.filename || null),
            (this.schema = t.schema || e_),
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
    function $f(e, t) {
        var r = {
            name: e.filename,
            buffer: e.input.slice(0, -1),
            position: e.position,
            line: e.line,
            column: e.position - e.lineStart
        };
        return (r.snippet = Zy(r)), new Df(t, r);
    }
    function I(e, t) {
        throw $f(e, t);
    }
    function ri(e, t) {
        e.onWarning && e.onWarning.call(null, $f(e, t));
    }
    var Of = {
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
                Ff.test(i) || I(t, "ill-formed tag handle (first argument) of the TAG directive"),
                ft.call(t.tagMap, i) && I(t, 'there is a previously declared suffix for "' + i + '" tag handle'),
                qf.test(o) || I(t, "ill-formed tag prefix (second argument) of the TAG directive");
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
            else r_.test(a) && I(e, "the stream contains non-printable characters");
            e.result += a;
        }
    }
    function If(e, t, r, n) {
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
                    typeof i == "object" && Tf(i[h]) === "[object Object]" && (i[h] = "[object Object]");
        if (
            (typeof i == "object" && Tf(i) === "[object Object]" && (i = "[object Object]"),
            (i = String(i)),
            t === null && (t = {}),
            n === "tag:yaml.org,2002:merge")
        )
            if (Array.isArray(o)) for (h = 0, c = o.length; h < c; h += 1) If(e, t, o[h], r);
            else If(e, t, o, r);
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
    function ls(e) {
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
                for (ls(e), i = e.input.charCodeAt(e.position), n++, e.lineIndent = 0; i === 32; )
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
    function us(e, t) {
        t === 1 ? (e.result += " ") : t > 1 && (e.result += It.repeat("\n", t - 1));
    }
    function c_(e, t, r) {
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
            a && (ct(e, o, s, !1), us(e, e.line - l), (o = s = e.position), (a = !1)),
                Nt(p) || (s = e.position + 1),
                (p = e.input.charCodeAt(++e.position));
        }
        return ct(e, o, s, !1), e.result ? !0 : ((e.kind = f), (e.result = m), !1);
    }
    function f_(e, t) {
        var r, n, i;
        if (((r = e.input.charCodeAt(e.position)), r !== 39)) return !1;
        for (e.kind = "scalar", e.result = "", e.position++, n = i = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
            if (r === 39)
                if ((ct(e, n, e.position, !0), (r = e.input.charCodeAt(++e.position)), r === 39))
                    (n = e.position), e.position++, (i = e.position);
                else return !0;
            else
                je(r)
                    ? (ct(e, n, i, !0), us(e, ne(e, !1, t)), (n = i = e.position))
                    : e.position === e.lineStart && ni(e)
                    ? I(e, "unexpected end of the document within a single quoted scalar")
                    : (e.position++, (i = e.position));
        I(e, "unexpected end of the stream within a single quoted scalar");
    }
    function d_(e, t) {
        var r, n, i, o, s, a;
        if (((a = e.input.charCodeAt(e.position)), a !== 34)) return !1;
        for (e.kind = "scalar", e.result = "", e.position++, r = n = e.position; (a = e.input.charCodeAt(e.position)) !== 0; ) {
            if (a === 34) return ct(e, r, e.position, !0), e.position++, !0;
            if (a === 92) {
                if ((ct(e, r, e.position, !0), (a = e.input.charCodeAt(++e.position)), je(a))) ne(e, !1, t);
                else if (a < 256 && Lf[a]) (e.result += Uf[a]), e.position++;
                else if ((s = s_(a)) > 0) {
                    for (i = s, o = 0; i > 0; i--)
                        (a = e.input.charCodeAt(++e.position)),
                            (s = o_(a)) >= 0 ? (o = (o << 4) + s) : I(e, "expected hexadecimal character");
                    (e.result += l_(o)), e.position++;
                } else I(e, "unknown escape sequence");
                r = n = e.position;
            } else
                je(a)
                    ? (ct(e, r, n, !0), us(e, ne(e, !1, t)), (r = n = e.position))
                    : e.position === e.lineStart && ni(e)
                    ? I(e, "unexpected end of the document within a double quoted scalar")
                    : (e.position++, (n = e.position));
        }
        I(e, "unexpected end of the stream within a double quoted scalar");
    }
    function h_(e, t) {
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
            y = Object.create(null),
            _,
            v,
            C,
            x;
        if (((x = e.input.charCodeAt(e.position)), x === 91)) (c = 93), (p = !1), (a = []);
        else if (x === 123) (c = 125), (p = !0), (a = {});
        else return !1;
        for (e.anchor !== null && (e.anchorMap[e.anchor] = a), x = e.input.charCodeAt(++e.position); x !== 0; ) {
            if ((ne(e, !0, t), (x = e.input.charCodeAt(e.position)), x === c))
                return e.position++, (e.tag = s), (e.anchor = l), (e.kind = p ? "mapping" : "sequence"), (e.result = a), !0;
            r
                ? x === 44 && I(e, "expected the node content, but found ','")
                : I(e, "missed comma between flow collection entries"),
                (v = _ = C = null),
                (f = m = !1),
                x === 63 && ((h = e.input.charCodeAt(e.position + 1)), Ne(h) && ((f = m = !0), e.position++, ne(e, !0, t))),
                (n = e.line),
                (i = e.lineStart),
                (o = e.position),
                ir(e, t, ei, !1, !0),
                (v = e.tag),
                (_ = e.result),
                ne(e, !0, t),
                (x = e.input.charCodeAt(e.position)),
                (m || e.line === n) &&
                    x === 58 &&
                    ((f = !0), (x = e.input.charCodeAt(++e.position)), ne(e, !0, t), ir(e, t, ei, !1, !0), (C = e.result)),
                p ? nr(e, a, y, v, _, C, n, i, o) : f ? a.push(nr(e, null, y, v, _, C, n, i, o)) : a.push(_),
                ne(e, !0, t),
                (x = e.input.charCodeAt(e.position)),
                x === 44 ? ((r = !0), (x = e.input.charCodeAt(++e.position))) : (r = !1);
        }
        I(e, "unexpected end of the stream within a flow collection");
    }
    function p_(e, t) {
        var r,
            n,
            i = as,
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
                as === i ? (i = f === 43 ? Cf : t_) : I(e, "repeat of a chomping mode identifier");
            else if ((c = a_(f)) >= 0)
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
            for (ls(e), e.lineIndent = 0, f = e.input.charCodeAt(e.position); (!s || e.lineIndent < a) && f === 32; )
                e.lineIndent++, (f = e.input.charCodeAt(++e.position));
            if ((!s && e.lineIndent > a && (a = e.lineIndent), je(f))) {
                l++;
                continue;
            }
            if (e.lineIndent < a) {
                i === Cf ? (e.result += It.repeat("\n", o ? 1 + l : l)) : i === as && o && (e.result += "\n");
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
    function Nf(e, t) {
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
                ir(e, t, Pf, !1, !0),
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
    function m_(e, t, r) {
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
            y = null,
            _ = null,
            v = !1,
            C = !1,
            x;
        if (e.firstTabInLine !== -1) return !1;
        for (e.anchor !== null && (e.anchorMap[e.anchor] = f), x = e.input.charCodeAt(e.position); x !== 0; ) {
            if (
                (!v &&
                    e.firstTabInLine !== -1 &&
                    ((e.position = e.firstTabInLine), I(e, "tab characters must not be used in indentation")),
                (n = e.input.charCodeAt(e.position + 1)),
                (o = e.line),
                (x === 63 || x === 58) && Ne(n))
            )
                x === 63
                    ? (v && (nr(e, f, m, p, y, null, s, a, l), (p = y = _ = null)), (C = !0), (v = !0), (i = !0))
                    : v
                    ? ((v = !1), (i = !0))
                    : I(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),
                    (e.position += 1),
                    (x = n);
            else {
                if (((s = e.line), (a = e.lineStart), (l = e.position), !ir(e, r, Rf, !1, !0))) break;
                if (e.line === o) {
                    for (x = e.input.charCodeAt(e.position); Nt(x); ) x = e.input.charCodeAt(++e.position);
                    if (x === 58)
                        (x = e.input.charCodeAt(++e.position)),
                            Ne(x) ||
                                I(e, "a whitespace character is expected after the key-value separator within a block mapping"),
                            v && (nr(e, f, m, p, y, null, s, a, l), (p = y = _ = null)),
                            (C = !0),
                            (v = !1),
                            (i = !1),
                            (p = e.tag),
                            (y = e.result);
                    else if (C) I(e, "can not read an implicit mapping pair; a colon is missed");
                    else return (e.tag = h), (e.anchor = c), !0;
                } else if (C) I(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
                else return (e.tag = h), (e.anchor = c), !0;
            }
            if (
                ((e.line === o || e.lineIndent > t) &&
                    (v && ((s = e.line), (a = e.lineStart), (l = e.position)),
                    ir(e, t, ti, !0, i) && (v ? (y = e.result) : (_ = e.result)),
                    v || (nr(e, f, m, p, y, _, s, a, l), (p = y = _ = null)),
                    ne(e, !0, -1),
                    (x = e.input.charCodeAt(e.position))),
                (e.line === o || e.lineIndent > t) && x !== 0)
            )
                I(e, "bad indentation of a mapping entry");
            else if (e.lineIndent < t) break;
        }
        return v && nr(e, f, m, p, y, null, s, a, l), C && ((e.tag = h), (e.anchor = c), (e.kind = "mapping"), (e.result = f)), C;
    }
    function g_(e) {
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
                          Ff.test(i) || I(e, "named tag handle cannot contain such characters"),
                          (n = !0),
                          (t = e.position + 1))),
                    (s = e.input.charCodeAt(++e.position));
            (o = e.input.slice(t, e.position)), i_.test(o) && I(e, "tag suffix cannot contain flow indicator characters");
        }
        o && !qf.test(o) && I(e, "tag name cannot contain such characters: " + o);
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
    function w_(e) {
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
    function E_(e) {
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
            y,
            _,
            v;
        if (
            (e.listener !== null && e.listener("open", e),
            (e.tag = null),
            (e.anchor = null),
            (e.kind = null),
            (e.result = null),
            (o = s = a = ti === r || Pf === r),
            n &&
                ne(e, !0, -1) &&
                ((h = !0), e.lineIndent > t ? (l = 1) : e.lineIndent === t ? (l = 0) : e.lineIndent < t && (l = -1)),
            l === 1)
        )
            for (; g_(e) || w_(e); )
                ne(e, !0, -1)
                    ? ((h = !0),
                      (a = o),
                      e.lineIndent > t ? (l = 1) : e.lineIndent === t ? (l = 0) : e.lineIndent < t && (l = -1))
                    : (a = !1);
        if (
            (a && (a = h || i),
            (l === 1 || ti === r) &&
                (ei === r || Rf === r ? (_ = t) : (_ = t + 1),
                (v = e.position - e.lineStart),
                l === 1
                    ? (a && (Nf(e, v) || m_(e, v, _))) || h_(e, _)
                        ? (c = !0)
                        : ((s && p_(e, _)) || f_(e, _) || d_(e, _)
                              ? (c = !0)
                              : E_(e)
                              ? ((c = !0),
                                (e.tag !== null || e.anchor !== null) && I(e, "alias node should not have any properties"))
                              : c_(e, _, ei === r) && ((c = !0), e.tag === null && (e.tag = "?")),
                          e.anchor !== null && (e.anchorMap[e.anchor] = e.result))
                    : l === 0 && (c = a && Nf(e, v))),
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
                if (((y = e.implicitTypes[f]), y.resolve(e.result))) {
                    (e.result = y.construct(e.result)), (e.tag = y.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
                    break;
                }
        } else if (e.tag !== "!") {
            if (ft.call(e.typeMap[e.kind || "fallback"], e.tag)) y = e.typeMap[e.kind || "fallback"][e.tag];
            else
                for (y = null, p = e.typeMap.multi[e.kind || "fallback"], f = 0, m = p.length; f < m; f += 1)
                    if (e.tag.slice(0, p[f].tag.length) === p[f].tag) {
                        y = p[f];
                        break;
                    }
            y || I(e, "unknown tag !<" + e.tag + ">"),
                e.result !== null &&
                    y.kind !== e.kind &&
                    I(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + y.kind + '", not "' + e.kind + '"'),
                y.resolve(e.result, e.tag)
                    ? ((e.result = y.construct(e.result, e.tag)), e.anchor !== null && (e.anchorMap[e.anchor] = e.result))
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
            s !== 0 && ls(e), ft.call(Of, n) ? Of[n](e, n, i) : ri(e, 'unknown document directive "' + n + '"');
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
                n_.test(e.input.slice(t, e.position)) &&
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
    function kf(e, t) {
        (e = String(e)),
            (t = t || {}),
            e.length !== 0 &&
                (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += "\n"),
                e.charCodeAt(0) === 65279 && (e = e.slice(1)));
        var r = new u_(e, t),
            n = e.indexOf("\0");
        for (
            n !== -1 && ((r.position = n), I(r, "null byte is not allowed in input")), r.input += "\0";
            r.input.charCodeAt(r.position) === 32;

        )
            (r.lineIndent += 1), (r.position += 1);
        for (; r.position < r.length - 1; ) y_(r);
        return r.documents;
    }
    function __(e, t, r) {
        t !== null && typeof t == "object" && typeof r > "u" && ((r = t), (t = null));
        var n = kf(e, r);
        if (typeof t != "function") return n;
        for (var i = 0, o = n.length; i < o; i += 1) t(n[i]);
    }
    function v_(e, t) {
        var r = kf(e, t);
        if (r.length !== 0) {
            if (r.length === 1) return r[0];
            throw new Df("expected a single document in the stream, but found more");
        }
    }
    cs.exports.loadAll = __;
    cs.exports.load = v_;
});
var ad = g((SI, sd) => {
    "use strict";
    var si = er(),
        Xr = tr(),
        S_ = Zn(),
        Xf = Object.prototype.toString,
        Kf = Object.prototype.hasOwnProperty,
        ms = 65279,
        x_ = 9,
        Vr = 10,
        A_ = 13,
        C_ = 32,
        T_ = 33,
        b_ = 34,
        fs = 35,
        O_ = 37,
        I_ = 38,
        N_ = 39,
        D_ = 42,
        Jf = 44,
        R_ = 45,
        ii = 58,
        P_ = 61,
        F_ = 62,
        q_ = 63,
        L_ = 64,
        Qf = 91,
        Zf = 93,
        U_ = 96,
        ed = 123,
        $_ = 124,
        td = 125,
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
    var k_ = ["y", "Y", "yes", "Yes", "YES", "on", "On", "ON", "n", "N", "no", "No", "NO", "off", "Off", "OFF"],
        M_ = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
    function B_(e, t) {
        var r, n, i, o, s, a, l;
        if (t === null) return {};
        for (r = {}, n = Object.keys(t), i = 0, o = n.length; i < o; i += 1)
            (s = n[i]),
                (a = String(t[s])),
                s.slice(0, 2) === "!!" && (s = "tag:yaml.org,2002:" + s.slice(2)),
                (l = e.compiledTypeMap.fallback[s]),
                l && Kf.call(l.styleAliases, a) && (a = l.styleAliases[a]),
                (r[s] = a);
        return r;
    }
    function H_(e) {
        var t, r, n;
        if (((t = e.toString(16).toUpperCase()), e <= 255)) (r = "x"), (n = 2);
        else if (e <= 65535) (r = "u"), (n = 4);
        else if (e <= 4294967295) (r = "U"), (n = 8);
        else throw new Xr("code point within a string may not be greater than 0xFFFFFFFF");
        return "\\" + r + si.repeat("0", n - t.length) + t;
    }
    var j_ = 1,
        Yr = 2;
    function W_(e) {
        (this.schema = e.schema || S_),
            (this.indent = Math.max(1, e.indent || 2)),
            (this.noArrayIndent = e.noArrayIndent || !1),
            (this.skipInvalid = e.skipInvalid || !1),
            (this.flowLevel = si.isNothing(e.flowLevel) ? -1 : e.flowLevel),
            (this.styleMap = B_(this.schema, e.styles || null)),
            (this.sortKeys = e.sortKeys || !1),
            (this.lineWidth = e.lineWidth || 80),
            (this.noRefs = e.noRefs || !1),
            (this.noCompatMode = e.noCompatMode || !1),
            (this.condenseFlow = e.condenseFlow || !1),
            (this.quotingType = e.quotingType === '"' ? Yr : j_),
            (this.forceQuotes = e.forceQuotes || !1),
            (this.replacer = typeof e.replacer == "function" ? e.replacer : null),
            (this.implicitTypes = this.schema.compiledImplicit),
            (this.explicitTypes = this.schema.compiledExplicit),
            (this.tag = null),
            (this.result = ""),
            (this.duplicates = []),
            (this.usedDuplicates = null);
    }
    function Bf(e, t) {
        for (var r = si.repeat(" ", t), n = 0, i = -1, o = "", s, a = e.length; n < a; )
            (i = e.indexOf("\n", n)),
                i === -1 ? ((s = e.slice(n)), (n = a)) : ((s = e.slice(n, i + 1)), (n = i + 1)),
                s.length && s !== "\n" && (o += r),
                (o += s);
        return o;
    }
    function ds(e, t) {
        return "\n" + si.repeat(" ", e.indent * t);
    }
    function G_(e, t) {
        var r, n, i;
        for (r = 0, n = e.implicitTypes.length; r < n; r += 1) if (((i = e.implicitTypes[r]), i.resolve(t))) return !0;
        return !1;
    }
    function oi(e) {
        return e === C_ || e === x_;
    }
    function zr(e) {
        return (
            (32 <= e && e <= 126) ||
            (161 <= e && e <= 55295 && e !== 8232 && e !== 8233) ||
            (57344 <= e && e <= 65533 && e !== ms) ||
            (65536 <= e && e <= 1114111)
        );
    }
    function Hf(e) {
        return zr(e) && e !== ms && e !== A_ && e !== Vr;
    }
    function jf(e, t, r) {
        var n = Hf(e),
            i = n && !oi(e);
        return (
            ((r ? n : n && e !== Jf && e !== Qf && e !== Zf && e !== ed && e !== td) && e !== fs && !(t === ii && !i)) ||
            (Hf(t) && !oi(t) && e === fs) ||
            (t === ii && i)
        );
    }
    function V_(e) {
        return (
            zr(e) &&
            e !== ms &&
            !oi(e) &&
            e !== R_ &&
            e !== q_ &&
            e !== ii &&
            e !== Jf &&
            e !== Qf &&
            e !== Zf &&
            e !== ed &&
            e !== td &&
            e !== fs &&
            e !== I_ &&
            e !== D_ &&
            e !== T_ &&
            e !== $_ &&
            e !== P_ &&
            e !== F_ &&
            e !== N_ &&
            e !== b_ &&
            e !== O_ &&
            e !== L_ &&
            e !== U_
        );
    }
    function Y_(e) {
        return !oi(e) && e !== ii;
    }
    function Gr(e, t) {
        var r = e.charCodeAt(t),
            n;
        return r >= 55296 && r <= 56319 && t + 1 < e.length && ((n = e.charCodeAt(t + 1)), n >= 56320 && n <= 57343)
            ? (r - 55296) * 1024 + n - 56320 + 65536
            : r;
    }
    function rd(e) {
        var t = /^\n* /;
        return t.test(e);
    }
    var nd = 1,
        hs = 2,
        id = 3,
        od = 4,
        or = 5;
    function z_(e, t, r, n, i, o, s, a) {
        var l,
            h = 0,
            c = null,
            f = !1,
            m = !1,
            p = n !== -1,
            y = -1,
            _ = V_(Gr(e, 0)) && Y_(Gr(e, e.length - 1));
        if (t || s)
            for (l = 0; l < e.length; h >= 65536 ? (l += 2) : l++) {
                if (((h = Gr(e, l)), !zr(h))) return or;
                (_ = _ && jf(h, c, a)), (c = h);
            }
        else {
            for (l = 0; l < e.length; h >= 65536 ? (l += 2) : l++) {
                if (((h = Gr(e, l)), h === Vr)) (f = !0), p && ((m = m || (l - y - 1 > n && e[y + 1] !== " ")), (y = l));
                else if (!zr(h)) return or;
                (_ = _ && jf(h, c, a)), (c = h);
            }
            m = m || (p && l - y - 1 > n && e[y + 1] !== " ");
        }
        return !f && !m
            ? _ && !s && !i(e)
                ? nd
                : o === Yr
                ? or
                : hs
            : r > 9 && rd(e)
            ? or
            : s
            ? o === Yr
                ? or
                : hs
            : m
            ? od
            : id;
    }
    function X_(e, t, r, n, i) {
        e.dump = (function () {
            if (t.length === 0) return e.quotingType === Yr ? '""' : "''";
            if (!e.noCompatMode && (k_.indexOf(t) !== -1 || M_.test(t)))
                return e.quotingType === Yr ? '"' + t + '"' : "'" + t + "'";
            var o = e.indent * Math.max(1, r),
                s = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - o),
                a = n || (e.flowLevel > -1 && r >= e.flowLevel);
            function l(h) {
                return G_(e, h);
            }
            switch (z_(t, a, e.indent, s, l, e.quotingType, e.forceQuotes && !n, i)) {
                case nd:
                    return t;
                case hs:
                    return "'" + t.replace(/'/g, "''") + "'";
                case id:
                    return "|" + Wf(t, e.indent) + Gf(Bf(t, o));
                case od:
                    return ">" + Wf(t, e.indent) + Gf(Bf(K_(t, s), o));
                case or:
                    return '"' + J_(t, s) + '"';
                default:
                    throw new Xr("impossible error: invalid scalar style");
            }
        })();
    }
    function Wf(e, t) {
        var r = rd(e) ? String(t) : "",
            n = e[e.length - 1] === "\n",
            i = n && (e[e.length - 2] === "\n" || e === "\n"),
            o = i ? "+" : n ? "" : "-";
        return r + o + "\n";
    }
    function Gf(e) {
        return e[e.length - 1] === "\n" ? e.slice(0, -1) : e;
    }
    function K_(e, t) {
        for (
            var r = /(\n+)([^\n]*)/g,
                n = (function () {
                    var h = e.indexOf("\n");
                    return (h = h !== -1 ? h : e.length), (r.lastIndex = h), Vf(e.slice(0, h), t);
                })(),
                i = e[0] === "\n" || e[0] === " ",
                o,
                s;
            (s = r.exec(e));

        ) {
            var a = s[1],
                l = s[2];
            (o = l[0] === " "), (n += a + (!i && !o && l !== "" ? "\n" : "") + Vf(l, t)), (i = o);
        }
        return n;
    }
    function Vf(e, t) {
        if (e === "" || e[0] === " ") return e;
        for (var r = / [^ ]/g, n, i = 0, o, s = 0, a = 0, l = ""; (n = r.exec(e)); )
            (a = n.index), a - i > t && ((o = s > i ? s : a), (l += "\n" + e.slice(i, o)), (i = o + 1)), (s = a);
        return (
            (l += "\n"), e.length - i > t && s > i ? (l += e.slice(i, s) + "\n" + e.slice(s + 1)) : (l += e.slice(i)), l.slice(1)
        );
    }
    function J_(e) {
        for (var t = "", r = 0, n, i = 0; i < e.length; r >= 65536 ? (i += 2) : i++)
            (r = Gr(e, i)), (n = me[r]), !n && zr(r) ? ((t += e[i]), r >= 65536 && (t += e[i + 1])) : (t += n || H_(r));
        return t;
    }
    function Q_(e, t, r) {
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
    function Yf(e, t, r, n) {
        var i = "",
            o = e.tag,
            s,
            a,
            l;
        for (s = 0, a = r.length; s < a; s += 1)
            (l = r[s]),
                e.replacer && (l = e.replacer.call(r, String(s), l)),
                (Ke(e, t + 1, l, !0, !0, !1, !0) || (typeof l > "u" && Ke(e, t + 1, null, !0, !0, !1, !0))) &&
                    ((!n || i !== "") && (i += ds(e, t)),
                    e.dump && Vr === e.dump.charCodeAt(0) ? (i += "-") : (i += "- "),
                    (i += e.dump));
        (e.tag = o), (e.dump = i || "[]");
    }
    function Z_(e, t, r) {
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
    function ev(e, t, r, n) {
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
                (!n || i !== "") && (m += ds(e, t)),
                (h = s[a]),
                (c = r[h]),
                e.replacer && (c = e.replacer.call(r, h, c)),
                Ke(e, t + 1, h, !0, !0, !0) &&
                    ((f = (e.tag !== null && e.tag !== "?") || (e.dump && e.dump.length > 1024)),
                    f && (e.dump && Vr === e.dump.charCodeAt(0) ? (m += "?") : (m += "? ")),
                    (m += e.dump),
                    f && (m += ds(e, t)),
                    Ke(e, t + 1, c, !0, f) &&
                        (e.dump && Vr === e.dump.charCodeAt(0) ? (m += ":") : (m += ": "), (m += e.dump), (i += m)));
        (e.tag = o), (e.dump = i || "{}");
    }
    function zf(e, t, r) {
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
                    if (((l = e.styleMap[a.tag] || a.defaultStyle), Xf.call(a.represent) === "[object Function]"))
                        n = a.represent(t, l);
                    else if (Kf.call(a.represent, l)) n = a.represent[l](t, l);
                    else throw new Xr("!<" + a.tag + '> tag resolver accepts not "' + l + '" style');
                    e.dump = n;
                }
                return !0;
            }
        return !1;
    }
    function Ke(e, t, r, n, i, o, s) {
        (e.tag = null), (e.dump = r), zf(e, r, !1) || zf(e, r, !0);
        var a = Xf.call(e.dump),
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
                    ? (ev(e, t, e.dump, i), m && (e.dump = "&ref_" + f + e.dump))
                    : (Z_(e, t, e.dump), m && (e.dump = "&ref_" + f + " " + e.dump));
            else if (a === "[object Array]")
                n && e.dump.length !== 0
                    ? (e.noArrayIndent && !s && t > 0 ? Yf(e, t - 1, e.dump, i) : Yf(e, t, e.dump, i),
                      m && (e.dump = "&ref_" + f + e.dump))
                    : (Q_(e, t, e.dump), m && (e.dump = "&ref_" + f + " " + e.dump));
            else if (a === "[object String]") e.tag !== "?" && X_(e, e.dump, t, o, l);
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
    function tv(e, t) {
        var r = [],
            n = [],
            i,
            o;
        for (ps(e, r, n), i = 0, o = n.length; i < o; i += 1) t.duplicates.push(r[n[i]]);
        t.usedDuplicates = new Array(o);
    }
    function ps(e, t, r) {
        var n, i, o;
        if (e !== null && typeof e == "object")
            if (((i = t.indexOf(e)), i !== -1)) r.indexOf(i) === -1 && r.push(i);
            else if ((t.push(e), Array.isArray(e))) for (i = 0, o = e.length; i < o; i += 1) ps(e[i], t, r);
            else for (n = Object.keys(e), i = 0, o = n.length; i < o; i += 1) ps(e[n[i]], t, r);
    }
    function rv(e, t) {
        t = t || {};
        var r = new W_(t);
        r.noRefs || tv(e, r);
        var n = e;
        return r.replacer && (n = r.replacer.call({ "": n }, "", n)), Ke(r, 0, n, !0, !0) ? r.dump + "\n" : "";
    }
    sd.exports.dump = rv;
});
var ai = g((xI, ve) => {
    "use strict";
    var ld = Mf(),
        nv = ad();
    function gs(e, t) {
        return function () {
            throw new Error(
                "Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default."
            );
        };
    }
    ve.exports.Type = pe();
    ve.exports.Schema = jo();
    ve.exports.FAILSAFE_SCHEMA = Yo();
    ve.exports.JSON_SCHEMA = Qo();
    ve.exports.CORE_SCHEMA = Zo();
    ve.exports.DEFAULT_SCHEMA = Zn();
    ve.exports.load = ld.load;
    ve.exports.loadAll = ld.loadAll;
    ve.exports.dump = nv.dump;
    ve.exports.YAMLException = tr();
    ve.exports.types = {
        binary: ns(),
        float: Jo(),
        map: Vo(),
        null: zo(),
        pairs: os(),
        set: ss(),
        timestamp: es(),
        bool: Xo(),
        int: Ko(),
        merge: ts(),
        omap: is(),
        seq: Go(),
        str: Wo()
    };
    ve.exports.safeLoad = gs("safeLoad", "load");
    ve.exports.safeLoadAll = gs("safeLoadAll", "loadAll");
    ve.exports.safeDump = gs("safeDump", "dump");
});
var ud = g(li => {
    "use strict";
    Object.defineProperty(li, "__esModule", { value: !0 });
    li.Lazy = void 0;
    var ws = class {
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
    li.Lazy = ws;
});
var Kr = g((CI, cd) => {
    var iv = "2.0.0",
        ov = Number.MAX_SAFE_INTEGER || 9007199254740991,
        sv = 16,
        av = 250,
        lv = ["major", "premajor", "minor", "preminor", "patch", "prepatch", "prerelease"];
    cd.exports = {
        MAX_LENGTH: 256,
        MAX_SAFE_COMPONENT_LENGTH: sv,
        MAX_SAFE_BUILD_LENGTH: av,
        MAX_SAFE_INTEGER: ov,
        RELEASE_TYPES: lv,
        SEMVER_SPEC_VERSION: iv,
        FLAG_INCLUDE_PRERELEASE: 1,
        FLAG_LOOSE: 2
    };
});
var Jr = g((TI, fd) => {
    var uv =
        typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG)
            ? (...e) => console.error("SEMVER", ...e)
            : () => {};
    fd.exports = uv;
});
var sr = g((Je, dd) => {
    var { MAX_SAFE_COMPONENT_LENGTH: Es, MAX_SAFE_BUILD_LENGTH: cv, MAX_LENGTH: fv } = Kr(),
        dv = Jr();
    Je = dd.exports = {};
    var hv = (Je.re = []),
        pv = (Je.safeRe = []),
        T = (Je.src = []),
        b = (Je.t = {}),
        mv = 0,
        ys = "[a-zA-Z0-9-]",
        gv = [
            ["\\s", 1],
            ["\\d", fv],
            [ys, cv]
        ],
        wv = e => {
            for (let [t, r] of gv)
                e = e
                    .split("".concat(t, "*"))
                    .join("".concat(t, "{0,").concat(r, "}"))
                    .split("".concat(t, "+"))
                    .join("".concat(t, "{1,").concat(r, "}"));
            return e;
        },
        q = (e, t, r) => {
            let n = wv(t),
                i = mv++;
            dv(e, i, t),
                (b[e] = i),
                (T[i] = t),
                (hv[i] = new RegExp(t, r ? "g" : void 0)),
                (pv[i] = new RegExp(n, r ? "g" : void 0));
        };
    q("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    q("NUMERICIDENTIFIERLOOSE", "\\d+");
    q("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-]".concat(ys, "*"));
    q(
        "MAINVERSION",
        "(".concat(T[b.NUMERICIDENTIFIER], ")\\.") +
            "(".concat(T[b.NUMERICIDENTIFIER], ")\\.") +
            "(".concat(T[b.NUMERICIDENTIFIER], ")")
    );
    q(
        "MAINVERSIONLOOSE",
        "(".concat(T[b.NUMERICIDENTIFIERLOOSE], ")\\.") +
            "(".concat(T[b.NUMERICIDENTIFIERLOOSE], ")\\.") +
            "(".concat(T[b.NUMERICIDENTIFIERLOOSE], ")")
    );
    q("PRERELEASEIDENTIFIER", "(?:".concat(T[b.NUMERICIDENTIFIER], "|").concat(T[b.NONNUMERICIDENTIFIER], ")"));
    q("PRERELEASEIDENTIFIERLOOSE", "(?:".concat(T[b.NUMERICIDENTIFIERLOOSE], "|").concat(T[b.NONNUMERICIDENTIFIER], ")"));
    q("PRERELEASE", "(?:-(".concat(T[b.PRERELEASEIDENTIFIER], "(?:\\.").concat(T[b.PRERELEASEIDENTIFIER], ")*))"));
    q(
        "PRERELEASELOOSE",
        "(?:-?(".concat(T[b.PRERELEASEIDENTIFIERLOOSE], "(?:\\.").concat(T[b.PRERELEASEIDENTIFIERLOOSE], ")*))")
    );
    q("BUILDIDENTIFIER", "".concat(ys, "+"));
    q("BUILD", "(?:\\+(".concat(T[b.BUILDIDENTIFIER], "(?:\\.").concat(T[b.BUILDIDENTIFIER], ")*))"));
    q("FULLPLAIN", "v?".concat(T[b.MAINVERSION]).concat(T[b.PRERELEASE], "?").concat(T[b.BUILD], "?"));
    q("FULL", "^".concat(T[b.FULLPLAIN], "$"));
    q("LOOSEPLAIN", "[v=\\s]*".concat(T[b.MAINVERSIONLOOSE]).concat(T[b.PRERELEASELOOSE], "?").concat(T[b.BUILD], "?"));
    q("LOOSE", "^".concat(T[b.LOOSEPLAIN], "$"));
    q("GTLT", "((?:<|>)?=?)");
    q("XRANGEIDENTIFIERLOOSE", "".concat(T[b.NUMERICIDENTIFIERLOOSE], "|x|X|\\*"));
    q("XRANGEIDENTIFIER", "".concat(T[b.NUMERICIDENTIFIER], "|x|X|\\*"));
    q(
        "XRANGEPLAIN",
        "[v=\\s]*(".concat(T[b.XRANGEIDENTIFIER], ")") +
            "(?:\\.(".concat(T[b.XRANGEIDENTIFIER], ")") +
            "(?:\\.(".concat(T[b.XRANGEIDENTIFIER], ")") +
            "(?:".concat(T[b.PRERELEASE], ")?").concat(T[b.BUILD], "?") +
            ")?)?"
    );
    q(
        "XRANGEPLAINLOOSE",
        "[v=\\s]*(".concat(T[b.XRANGEIDENTIFIERLOOSE], ")") +
            "(?:\\.(".concat(T[b.XRANGEIDENTIFIERLOOSE], ")") +
            "(?:\\.(".concat(T[b.XRANGEIDENTIFIERLOOSE], ")") +
            "(?:".concat(T[b.PRERELEASELOOSE], ")?").concat(T[b.BUILD], "?") +
            ")?)?"
    );
    q("XRANGE", "^".concat(T[b.GTLT], "\\s*").concat(T[b.XRANGEPLAIN], "$"));
    q("XRANGELOOSE", "^".concat(T[b.GTLT], "\\s*").concat(T[b.XRANGEPLAINLOOSE], "$"));
    q(
        "COERCEPLAIN",
        "(^|[^\\d])(\\d{1,".concat(Es, "})") + "(?:\\.(\\d{1,".concat(Es, "}))?") + "(?:\\.(\\d{1,".concat(Es, "}))?")
    );
    q("COERCE", "".concat(T[b.COERCEPLAIN], "(?:$|[^\\d])"));
    q("COERCEFULL", T[b.COERCEPLAIN] + "(?:".concat(T[b.PRERELEASE], ")?") + "(?:".concat(T[b.BUILD], ")?") + "(?:$|[^\\d])");
    q("COERCERTL", T[b.COERCE], !0);
    q("COERCERTLFULL", T[b.COERCEFULL], !0);
    q("LONETILDE", "(?:~>?)");
    q("TILDETRIM", "(\\s*)".concat(T[b.LONETILDE], "\\s+"), !0);
    Je.tildeTrimReplace = "$1~";
    q("TILDE", "^".concat(T[b.LONETILDE]).concat(T[b.XRANGEPLAIN], "$"));
    q("TILDELOOSE", "^".concat(T[b.LONETILDE]).concat(T[b.XRANGEPLAINLOOSE], "$"));
    q("LONECARET", "(?:\\^)");
    q("CARETTRIM", "(\\s*)".concat(T[b.LONECARET], "\\s+"), !0);
    Je.caretTrimReplace = "$1^";
    q("CARET", "^".concat(T[b.LONECARET]).concat(T[b.XRANGEPLAIN], "$"));
    q("CARETLOOSE", "^".concat(T[b.LONECARET]).concat(T[b.XRANGEPLAINLOOSE], "$"));
    q("COMPARATORLOOSE", "^".concat(T[b.GTLT], "\\s*(").concat(T[b.LOOSEPLAIN], ")$|^$"));
    q("COMPARATOR", "^".concat(T[b.GTLT], "\\s*(").concat(T[b.FULLPLAIN], ")$|^$"));
    q("COMPARATORTRIM", "(\\s*)".concat(T[b.GTLT], "\\s*(").concat(T[b.LOOSEPLAIN], "|").concat(T[b.XRANGEPLAIN], ")"), !0);
    Je.comparatorTrimReplace = "$1$2$3";
    q("HYPHENRANGE", "^\\s*(".concat(T[b.XRANGEPLAIN], ")") + "\\s+-\\s+" + "(".concat(T[b.XRANGEPLAIN], ")") + "\\s*$");
    q(
        "HYPHENRANGELOOSE",
        "^\\s*(".concat(T[b.XRANGEPLAINLOOSE], ")") + "\\s+-\\s+" + "(".concat(T[b.XRANGEPLAINLOOSE], ")") + "\\s*$"
    );
    q("STAR", "(<|>)?=?\\s*\\*");
    q("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    q("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
});
var ui = g((bI, hd) => {
    var Ev = Object.freeze({ loose: !0 }),
        yv = Object.freeze({}),
        _v = e => (e ? (typeof e != "object" ? Ev : e) : yv);
    hd.exports = _v;
});
var _s = g((OI, gd) => {
    var pd = /^[0-9]+$/,
        md = (e, t) => {
            let r = pd.test(e),
                n = pd.test(t);
            return r && n && ((e = +e), (t = +t)), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
        },
        vv = (e, t) => md(t, e);
    gd.exports = { compareIdentifiers: md, rcompareIdentifiers: vv };
});
var ge = g((II, _d) => {
    var ci = Jr(),
        { MAX_LENGTH: wd, MAX_SAFE_INTEGER: fi } = Kr(),
        { safeRe: Ed, t: yd } = sr(),
        Sv = ui(),
        { compareIdentifiers: ar } = _s(),
        vs = class e {
            constructor(t, r) {
                if (((r = Sv(r)), t instanceof e)) {
                    if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease) return t;
                    t = t.version;
                } else if (typeof t != "string")
                    throw new TypeError('Invalid version. Must be a string. Got type "'.concat(typeof t, '".'));
                if (t.length > wd) throw new TypeError("version is longer than ".concat(wd, " characters"));
                ci("SemVer", t, r),
                    (this.options = r),
                    (this.loose = !!r.loose),
                    (this.includePrerelease = !!r.includePrerelease);
                let n = t.trim().match(r.loose ? Ed[yd.LOOSE] : Ed[yd.FULL]);
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
    _d.exports = vs;
});
var Dt = g((NI, Sd) => {
    var vd = ge(),
        xv = (e, t, r = !1) => {
            if (e instanceof vd) return e;
            try {
                return new vd(e, t);
            } catch (n) {
                if (!r) return null;
                throw n;
            }
        };
    Sd.exports = xv;
});
var Ad = g((DI, xd) => {
    var Av = Dt(),
        Cv = (e, t) => {
            let r = Av(e, t);
            return r ? r.version : null;
        };
    xd.exports = Cv;
});
var Td = g((RI, Cd) => {
    var Tv = Dt(),
        bv = (e, t) => {
            let r = Tv(e.trim().replace(/^[=v]+/, ""), t);
            return r ? r.version : null;
        };
    Cd.exports = bv;
});
var Id = g((PI, Od) => {
    var bd = ge(),
        Ov = (e, t, r, n, i) => {
            typeof r == "string" && ((i = n), (n = r), (r = void 0));
            try {
                return new bd(e instanceof bd ? e.version : e, r).inc(t, n, i).version;
            } catch {
                return null;
            }
        };
    Od.exports = Ov;
});
var Rd = g((FI, Dd) => {
    var Nd = Dt(),
        Iv = (e, t) => {
            let r = Nd(e, null, !0),
                n = Nd(t, null, !0),
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
    Dd.exports = Iv;
});
var Fd = g((qI, Pd) => {
    var Nv = ge(),
        Dv = (e, t) => new Nv(e, t).major;
    Pd.exports = Dv;
});
var Ld = g((LI, qd) => {
    var Rv = ge(),
        Pv = (e, t) => new Rv(e, t).minor;
    qd.exports = Pv;
});
var $d = g((UI, Ud) => {
    var Fv = ge(),
        qv = (e, t) => new Fv(e, t).patch;
    Ud.exports = qv;
});
var Md = g(($I, kd) => {
    var Lv = Dt(),
        Uv = (e, t) => {
            let r = Lv(e, t);
            return r && r.prerelease.length ? r.prerelease : null;
        };
    kd.exports = Uv;
});
var qe = g((kI, Hd) => {
    var Bd = ge(),
        $v = (e, t, r) => new Bd(e, r).compare(new Bd(t, r));
    Hd.exports = $v;
});
var Wd = g((MI, jd) => {
    var kv = qe(),
        Mv = (e, t, r) => kv(t, e, r);
    jd.exports = Mv;
});
var Vd = g((BI, Gd) => {
    var Bv = qe(),
        Hv = (e, t) => Bv(e, t, !0);
    Gd.exports = Hv;
});
var di = g((HI, zd) => {
    var Yd = ge(),
        jv = (e, t, r) => {
            let n = new Yd(e, r),
                i = new Yd(t, r);
            return n.compare(i) || n.compareBuild(i);
        };
    zd.exports = jv;
});
var Kd = g((jI, Xd) => {
    var Wv = di(),
        Gv = (e, t) => e.sort((r, n) => Wv(r, n, t));
    Xd.exports = Gv;
});
var Qd = g((WI, Jd) => {
    var Vv = di(),
        Yv = (e, t) => e.sort((r, n) => Vv(n, r, t));
    Jd.exports = Yv;
});
var Qr = g((GI, Zd) => {
    var zv = qe(),
        Xv = (e, t, r) => zv(e, t, r) > 0;
    Zd.exports = Xv;
});
var hi = g((VI, eh) => {
    var Kv = qe(),
        Jv = (e, t, r) => Kv(e, t, r) < 0;
    eh.exports = Jv;
});
var Ss = g((YI, th) => {
    var Qv = qe(),
        Zv = (e, t, r) => Qv(e, t, r) === 0;
    th.exports = Zv;
});
var xs = g((zI, rh) => {
    var eS = qe(),
        tS = (e, t, r) => eS(e, t, r) !== 0;
    rh.exports = tS;
});
var pi = g((XI, nh) => {
    var rS = qe(),
        nS = (e, t, r) => rS(e, t, r) >= 0;
    nh.exports = nS;
});
var mi = g((KI, ih) => {
    var iS = qe(),
        oS = (e, t, r) => iS(e, t, r) <= 0;
    ih.exports = oS;
});
var As = g((JI, oh) => {
    var sS = Ss(),
        aS = xs(),
        lS = Qr(),
        uS = pi(),
        cS = hi(),
        fS = mi(),
        dS = (e, t, r, n) => {
            switch (t) {
                case "===":
                    return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
                case "!==":
                    return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
                case "":
                case "=":
                case "==":
                    return sS(e, r, n);
                case "!=":
                    return aS(e, r, n);
                case ">":
                    return lS(e, r, n);
                case ">=":
                    return uS(e, r, n);
                case "<":
                    return cS(e, r, n);
                case "<=":
                    return fS(e, r, n);
                default:
                    throw new TypeError("Invalid operator: ".concat(t));
            }
        };
    oh.exports = dS;
});
var ah = g((QI, sh) => {
    var hS = ge(),
        pS = Dt(),
        { safeRe: gi, t: wi } = sr(),
        mS = (e, t) => {
            if (e instanceof hS) return e;
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
            return pS("".concat(n, ".").concat(i, ".").concat(o).concat(s).concat(a), t);
        };
    sh.exports = mS;
});
var uh = g((ZI, lh) => {
    var Cs = class {
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
    lh.exports = Cs;
});
var Le = g((eN, hh) => {
    var gS = /\s+/g,
        Ts = class e {
            constructor(t, r) {
                if (((r = ES(r)), t instanceof e))
                    return t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease ? t : new e(t.raw, r);
                if (t instanceof bs) return (this.raw = t.value), (this.set = [[t]]), (this.formatted = void 0), this;
                if (
                    ((this.options = r),
                    (this.loose = !!r.loose),
                    (this.includePrerelease = !!r.includePrerelease),
                    (this.raw = t.trim().replace(gS, " ")),
                    (this.set = this.raw
                        .split("||")
                        .map(n => this.parseRange(n.trim()))
                        .filter(n => n.length)),
                    !this.set.length)
                )
                    throw new TypeError("Invalid SemVer Range: ".concat(this.raw));
                if (this.set.length > 1) {
                    let n = this.set[0];
                    if (((this.set = this.set.filter(i => !fh(i[0]))), this.set.length === 0)) this.set = [n];
                    else if (this.set.length > 1) {
                        for (let i of this.set)
                            if (i.length === 1 && CS(i[0])) {
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
                let n = ((this.options.includePrerelease && xS) | (this.options.loose && AS)) + ":" + t,
                    i = ch.get(n);
                if (i) return i;
                let o = this.options.loose,
                    s = o ? De[Se.HYPHENRANGELOOSE] : De[Se.HYPHENRANGE];
                (t = t.replace(s, qS(this.options.includePrerelease))),
                    Y("hyphen replace", t),
                    (t = t.replace(De[Se.COMPARATORTRIM], _S)),
                    Y("comparator trim", t),
                    (t = t.replace(De[Se.TILDETRIM], vS)),
                    Y("tilde trim", t),
                    (t = t.replace(De[Se.CARETTRIM], SS)),
                    Y("caret trim", t);
                let a = t
                    .split(" ")
                    .map(f => TS(f, this.options))
                    .join(" ")
                    .split(/\s+/)
                    .map(f => FS(f, this.options));
                o && (a = a.filter(f => (Y("loose invalid filter", f, this.options), !!f.match(De[Se.COMPARATORLOOSE])))),
                    Y("range list", a);
                let l = new Map(),
                    h = a.map(f => new bs(f, this.options));
                for (let f of h) {
                    if (fh(f)) return [f];
                    l.set(f.value, f);
                }
                l.size > 1 && l.has("") && l.delete("");
                let c = [...l.values()];
                return ch.set(n, c), c;
            }
            intersects(t, r) {
                if (!(t instanceof e)) throw new TypeError("a Range is required");
                return this.set.some(
                    n => dh(n, r) && t.set.some(i => dh(i, r) && n.every(o => i.every(s => o.intersects(s, r))))
                );
            }
            test(t) {
                if (!t) return !1;
                if (typeof t == "string")
                    try {
                        t = new yS(t, this.options);
                    } catch {
                        return !1;
                    }
                for (let r = 0; r < this.set.length; r++) if (LS(this.set[r], t, this.options)) return !0;
                return !1;
            }
        };
    hh.exports = Ts;
    var wS = uh(),
        ch = new wS(),
        ES = ui(),
        bs = Zr(),
        Y = Jr(),
        yS = ge(),
        { safeRe: De, t: Se, comparatorTrimReplace: _S, tildeTrimReplace: vS, caretTrimReplace: SS } = sr(),
        { FLAG_INCLUDE_PRERELEASE: xS, FLAG_LOOSE: AS } = Kr(),
        fh = e => e.value === "<0.0.0-0",
        CS = e => e.value === "",
        dh = (e, t) => {
            let r = !0,
                n = e.slice(),
                i = n.pop();
            for (; r && n.length; ) (r = n.every(o => i.intersects(o, t))), (i = n.pop());
            return r;
        },
        TS = (e, t) => (
            Y("comp", e, t),
            (e = IS(e, t)),
            Y("caret", e),
            (e = bS(e, t)),
            Y("tildes", e),
            (e = DS(e, t)),
            Y("xrange", e),
            (e = PS(e, t)),
            Y("stars", e),
            e
        ),
        xe = e => !e || e.toLowerCase() === "x" || e === "*",
        bS = (e, t) =>
            e
                .trim()
                .split(/\s+/)
                .map(r => OS(r, t))
                .join(" "),
        OS = (e, t) => {
            let r = t.loose ? De[Se.TILDELOOSE] : De[Se.TILDE];
            return e.replace(r, (n, i, o, s, a) => {
                Y("tilde", e, n, i, o, s, a);
                let l;
                return (
                    xe(i)
                        ? (l = "")
                        : xe(o)
                        ? (l = ">=".concat(i, ".0.0 <").concat(+i + 1, ".0.0-0"))
                        : xe(s)
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
        IS = (e, t) =>
            e
                .trim()
                .split(/\s+/)
                .map(r => NS(r, t))
                .join(" "),
        NS = (e, t) => {
            Y("caret", e, t);
            let r = t.loose ? De[Se.CARETLOOSE] : De[Se.CARET],
                n = t.includePrerelease ? "-0" : "";
            return e.replace(r, (i, o, s, a, l) => {
                Y("caret", e, i, o, s, a, l);
                let h;
                return (
                    xe(o)
                        ? (h = "")
                        : xe(s)
                        ? (h = ">="
                              .concat(o, ".0.0")
                              .concat(n, " <")
                              .concat(+o + 1, ".0.0-0"))
                        : xe(a)
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
        DS = (e, t) => (
            Y("replaceXRanges", e, t),
            e
                .split(/\s+/)
                .map(r => RS(r, t))
                .join(" ")
        ),
        RS = (e, t) => {
            e = e.trim();
            let r = t.loose ? De[Se.XRANGELOOSE] : De[Se.XRANGE];
            return e.replace(r, (n, i, o, s, a, l) => {
                Y("xRange", e, n, i, o, s, a, l);
                let h = xe(o),
                    c = h || xe(s),
                    f = c || xe(a),
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
        PS = (e, t) => (Y("replaceStars", e, t), e.trim().replace(De[Se.STAR], "")),
        FS = (e, t) => (Y("replaceGTE0", e, t), e.trim().replace(De[t.includePrerelease ? Se.GTE0PRE : Se.GTE0], "")),
        qS = e => (t, r, n, i, o, s, a, l, h, c, f, m) => (
            xe(n)
                ? (r = "")
                : xe(i)
                ? (r = ">=".concat(n, ".0.0").concat(e ? "-0" : ""))
                : xe(o)
                ? (r = ">="
                      .concat(n, ".")
                      .concat(i, ".0")
                      .concat(e ? "-0" : ""))
                : s
                ? (r = ">=".concat(r))
                : (r = ">=".concat(r).concat(e ? "-0" : "")),
            xe(h)
                ? (l = "")
                : xe(c)
                ? (l = "<".concat(+h + 1, ".0.0-0"))
                : xe(f)
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
        LS = (e, t, r) => {
            for (let n = 0; n < e.length; n++) if (!e[n].test(t)) return !1;
            if (t.prerelease.length && !r.includePrerelease) {
                for (let n = 0; n < e.length; n++)
                    if ((Y(e[n].semver), e[n].semver !== bs.ANY && e[n].semver.prerelease.length > 0)) {
                        let i = e[n].semver;
                        if (i.major === t.major && i.minor === t.minor && i.patch === t.patch) return !0;
                    }
                return !1;
            }
            return !0;
        };
});
var Zr = g((tN, yh) => {
    var en = Symbol("SemVer ANY"),
        Ns = class e {
            static get ANY() {
                return en;
            }
            constructor(t, r) {
                if (((r = ph(r)), t instanceof e)) {
                    if (t.loose === !!r.loose) return t;
                    t = t.value;
                }
                (t = t.trim().split(/\s+/).join(" ")),
                    Is("comparator", t, r),
                    (this.options = r),
                    (this.loose = !!r.loose),
                    this.parse(t),
                    this.semver === en ? (this.value = "") : (this.value = this.operator + this.semver.version),
                    Is("comp", this);
            }
            parse(t) {
                let r = this.options.loose ? mh[gh.COMPARATORLOOSE] : mh[gh.COMPARATOR],
                    n = t.match(r);
                if (!n) throw new TypeError("Invalid comparator: ".concat(t));
                (this.operator = n[1] !== void 0 ? n[1] : ""),
                    this.operator === "=" && (this.operator = ""),
                    n[2] ? (this.semver = new wh(n[2], this.options.loose)) : (this.semver = en);
            }
            toString() {
                return this.value;
            }
            test(t) {
                if ((Is("Comparator.test", t, this.options.loose), this.semver === en || t === en)) return !0;
                if (typeof t == "string")
                    try {
                        t = new wh(t, this.options);
                    } catch {
                        return !1;
                    }
                return Os(t, this.operator, this.semver, this.options);
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
                    : ((r = ph(r)),
                      (r.includePrerelease && (this.value === "<0.0.0-0" || t.value === "<0.0.0-0")) ||
                      (!r.includePrerelease && (this.value.startsWith("<0.0.0") || t.value.startsWith("<0.0.0")))
                          ? !1
                          : !!(
                                (this.operator.startsWith(">") && t.operator.startsWith(">")) ||
                                (this.operator.startsWith("<") && t.operator.startsWith("<")) ||
                                (this.semver.version === t.semver.version &&
                                    this.operator.includes("=") &&
                                    t.operator.includes("=")) ||
                                (Os(this.semver, "<", t.semver, r) &&
                                    this.operator.startsWith(">") &&
                                    t.operator.startsWith("<")) ||
                                (Os(this.semver, ">", t.semver, r) && this.operator.startsWith("<") && t.operator.startsWith(">"))
                            ));
            }
        };
    yh.exports = Ns;
    var ph = ui(),
        { safeRe: mh, t: gh } = sr(),
        Os = As(),
        Is = Jr(),
        wh = ge(),
        Eh = Le();
});
var tn = g((rN, _h) => {
    var US = Le(),
        $S = (e, t, r) => {
            try {
                t = new US(t, r);
            } catch {
                return !1;
            }
            return t.test(e);
        };
    _h.exports = $S;
});
var Sh = g((nN, vh) => {
    var kS = Le(),
        MS = (e, t) =>
            new kS(e, t).set.map(r =>
                r
                    .map(n => n.value)
                    .join(" ")
                    .trim()
                    .split(" ")
            );
    vh.exports = MS;
});
var Ah = g((iN, xh) => {
    var BS = ge(),
        HS = Le(),
        jS = (e, t, r) => {
            let n = null,
                i = null,
                o = null;
            try {
                o = new HS(t, r);
            } catch {
                return null;
            }
            return (
                e.forEach(s => {
                    o.test(s) && (!n || i.compare(s) === -1) && ((n = s), (i = new BS(n, r)));
                }),
                n
            );
        };
    xh.exports = jS;
});
var Th = g((oN, Ch) => {
    var WS = ge(),
        GS = Le(),
        VS = (e, t, r) => {
            let n = null,
                i = null,
                o = null;
            try {
                o = new GS(t, r);
            } catch {
                return null;
            }
            return (
                e.forEach(s => {
                    o.test(s) && (!n || i.compare(s) === 1) && ((n = s), (i = new WS(n, r)));
                }),
                n
            );
        };
    Ch.exports = VS;
});
var Ih = g((sN, Oh) => {
    var Ds = ge(),
        YS = Le(),
        bh = Qr(),
        zS = (e, t) => {
            e = new YS(e, t);
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
                            (!o || bh(a, o)) && (o = a);
                            break;
                        case "<":
                        case "<=":
                            break;
                        default:
                            throw new Error("Unexpected operation: ".concat(s.operator));
                    }
                }),
                    o && (!r || bh(r, o)) && (r = o);
            }
            return r && e.test(r) ? r : null;
        };
    Oh.exports = zS;
});
var Dh = g((aN, Nh) => {
    var XS = Le(),
        KS = (e, t) => {
            try {
                return new XS(e, t).range || "*";
            } catch {
                return null;
            }
        };
    Nh.exports = KS;
});
var Ei = g((lN, qh) => {
    var JS = ge(),
        Fh = Zr(),
        { ANY: QS } = Fh,
        ZS = Le(),
        ex = tn(),
        Rh = Qr(),
        Ph = hi(),
        tx = mi(),
        rx = pi(),
        nx = (e, t, r, n) => {
            (e = new JS(e, n)), (t = new ZS(t, n));
            let i, o, s, a, l;
            switch (r) {
                case ">":
                    (i = Rh), (o = tx), (s = Ph), (a = ">"), (l = ">=");
                    break;
                case "<":
                    (i = Ph), (o = rx), (s = Rh), (a = "<"), (l = "<=");
                    break;
                default:
                    throw new TypeError('Must provide a hilo val of "<" or ">"');
            }
            if (ex(e, t, n)) return !1;
            for (let h = 0; h < t.set.length; ++h) {
                let c = t.set[h],
                    f = null,
                    m = null;
                if (
                    (c.forEach(p => {
                        p.semver === QS && (p = new Fh(">=0.0.0")),
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
    qh.exports = nx;
});
var Uh = g((uN, Lh) => {
    var ix = Ei(),
        ox = (e, t, r) => ix(e, t, ">", r);
    Lh.exports = ox;
});
var kh = g((cN, $h) => {
    var sx = Ei(),
        ax = (e, t, r) => sx(e, t, "<", r);
    $h.exports = ax;
});
var Hh = g((fN, Bh) => {
    var Mh = Le(),
        lx = (e, t, r) => ((e = new Mh(e, r)), (t = new Mh(t, r)), e.intersects(t, r));
    Bh.exports = lx;
});
var Wh = g((dN, jh) => {
    var ux = tn(),
        cx = qe();
    jh.exports = (e, t, r) => {
        let n = [],
            i = null,
            o = null,
            s = e.sort((c, f) => cx(c, f, r));
        for (let c of s) ux(c, t, r) ? ((o = c), i || (i = c)) : (o && n.push([i, o]), (o = null), (i = null));
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
var Kh = g((hN, Xh) => {
    var Gh = Le(),
        Ps = Zr(),
        { ANY: Rs } = Ps,
        rn = tn(),
        Fs = qe(),
        fx = (e, t, r = {}) => {
            if (e === t) return !0;
            (e = new Gh(e, r)), (t = new Gh(t, r));
            let n = !1;
            e: for (let i of e.set) {
                for (let o of t.set) {
                    let s = hx(i, o, r);
                    if (((n = n || s !== null), s)) continue e;
                }
                if (n) return !1;
            }
            return !0;
        },
        dx = [new Ps(">=0.0.0-0")],
        Vh = [new Ps(">=0.0.0")],
        hx = (e, t, r) => {
            if (e === t) return !0;
            if (e.length === 1 && e[0].semver === Rs) {
                if (t.length === 1 && t[0].semver === Rs) return !0;
                r.includePrerelease ? (e = dx) : (e = Vh);
            }
            if (t.length === 1 && t[0].semver === Rs) {
                if (r.includePrerelease) return !0;
                t = Vh;
            }
            let n = new Set(),
                i,
                o;
            for (let p of e)
                p.operator === ">" || p.operator === ">="
                    ? (i = Yh(i, p, r))
                    : p.operator === "<" || p.operator === "<="
                    ? (o = zh(o, p, r))
                    : n.add(p.semver);
            if (n.size > 1) return null;
            let s;
            if (i && o) {
                if (((s = Fs(i.semver, o.semver, r)), s > 0)) return null;
                if (s === 0 && (i.operator !== ">=" || o.operator !== "<=")) return null;
            }
            for (let p of n) {
                if ((i && !rn(p, String(i), r)) || (o && !rn(p, String(o), r))) return null;
                for (let y of t) if (!rn(p, String(y), r)) return !1;
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
                        if (((a = Yh(i, p, r)), a === p && a !== i)) return !1;
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
                        if (((l = zh(o, p, r)), l === p && l !== o)) return !1;
                    } else if (o.operator === "<=" && !rn(o.semver, String(p), r)) return !1;
                }
                if (!p.operator && (o || i) && s !== 0) return !1;
            }
            return !((i && h && !o && s !== 0) || (o && c && !i && s !== 0) || m || f);
        },
        Yh = (e, t, r) => {
            if (!e) return t;
            let n = Fs(e.semver, t.semver, r);
            return n > 0 ? e : n < 0 || (t.operator === ">" && e.operator === ">=") ? t : e;
        },
        zh = (e, t, r) => {
            if (!e) return t;
            let n = Fs(e.semver, t.semver, r);
            return n < 0 ? e : n > 0 || (t.operator === "<" && e.operator === "<=") ? t : e;
        };
    Xh.exports = fx;
});
var Ls = g((pN, Zh) => {
    var qs = sr(),
        Jh = Kr(),
        px = ge(),
        Qh = _s(),
        mx = Dt(),
        gx = Ad(),
        wx = Td(),
        Ex = Id(),
        yx = Rd(),
        _x = Fd(),
        vx = Ld(),
        Sx = $d(),
        xx = Md(),
        Ax = qe(),
        Cx = Wd(),
        Tx = Vd(),
        bx = di(),
        Ox = Kd(),
        Ix = Qd(),
        Nx = Qr(),
        Dx = hi(),
        Rx = Ss(),
        Px = xs(),
        Fx = pi(),
        qx = mi(),
        Lx = As(),
        Ux = ah(),
        $x = Zr(),
        kx = Le(),
        Mx = tn(),
        Bx = Sh(),
        Hx = Ah(),
        jx = Th(),
        Wx = Ih(),
        Gx = Dh(),
        Vx = Ei(),
        Yx = Uh(),
        zx = kh(),
        Xx = Hh(),
        Kx = Wh(),
        Jx = Kh();
    Zh.exports = {
        parse: mx,
        valid: gx,
        clean: wx,
        inc: Ex,
        diff: yx,
        major: _x,
        minor: vx,
        patch: Sx,
        prerelease: xx,
        compare: Ax,
        rcompare: Cx,
        compareLoose: Tx,
        compareBuild: bx,
        sort: Ox,
        rsort: Ix,
        gt: Nx,
        lt: Dx,
        eq: Rx,
        neq: Px,
        gte: Fx,
        lte: qx,
        cmp: Lx,
        coerce: Ux,
        Comparator: $x,
        Range: kx,
        satisfies: Mx,
        toComparators: Bx,
        maxSatisfying: Hx,
        minSatisfying: jx,
        minVersion: Wx,
        validRange: Gx,
        outside: Vx,
        gtr: Yx,
        ltr: zx,
        intersects: Xx,
        simplifyRange: Kx,
        subset: Jx,
        SemVer: px,
        re: qs.re,
        src: qs.src,
        tokens: qs.t,
        SEMVER_SPEC_VERSION: Jh.SEMVER_SPEC_VERSION,
        RELEASE_TYPES: Jh.RELEASE_TYPES,
        compareIdentifiers: Qh.compareIdentifiers,
        rcompareIdentifiers: Qh.rcompareIdentifiers
    };
});
var Fp = g((nn, ur) => {
    var Qx = 200,
        Ys = "__lodash_hash_undefined__",
        Ti = 1,
        fp = 2,
        dp = 9007199254740991,
        yi = "[object Arguments]",
        Ms = "[object Array]",
        Zx = "[object AsyncFunction]",
        hp = "[object Boolean]",
        pp = "[object Date]",
        mp = "[object Error]",
        gp = "[object Function]",
        eA = "[object GeneratorFunction]",
        _i = "[object Map]",
        wp = "[object Number]",
        tA = "[object Null]",
        lr = "[object Object]",
        ep = "[object Promise]",
        rA = "[object Proxy]",
        Ep = "[object RegExp]",
        vi = "[object Set]",
        yp = "[object String]",
        nA = "[object Symbol]",
        iA = "[object Undefined]",
        Bs = "[object WeakMap]",
        _p = "[object ArrayBuffer]",
        Si = "[object DataView]",
        oA = "[object Float32Array]",
        sA = "[object Float64Array]",
        aA = "[object Int8Array]",
        lA = "[object Int16Array]",
        uA = "[object Int32Array]",
        cA = "[object Uint8Array]",
        fA = "[object Uint8ClampedArray]",
        dA = "[object Uint16Array]",
        hA = "[object Uint32Array]",
        pA = /[\\^$.*+?()[\]{}|]/g,
        mA = /^\[object .+?Constructor\]$/,
        gA = /^(?:0|[1-9]\d*)$/,
        z = {};
    z[oA] = z[sA] = z[aA] = z[lA] = z[uA] = z[cA] = z[fA] = z[dA] = z[hA] = !0;
    z[yi] = z[Ms] = z[_p] = z[hp] = z[Si] = z[pp] = z[mp] = z[gp] = z[_i] = z[wp] = z[lr] = z[Ep] = z[vi] = z[yp] = z[Bs] = !1;
    var vp = typeof global == "object" && global && global.Object === Object && global,
        wA = typeof self == "object" && self && self.Object === Object && self,
        Qe = vp || wA || Function("return this")(),
        Sp = typeof nn == "object" && nn && !nn.nodeType && nn,
        tp = Sp && typeof ur == "object" && ur && !ur.nodeType && ur,
        xp = tp && tp.exports === Sp,
        Us = xp && vp.process,
        rp = (function () {
            try {
                return Us && Us.binding && Us.binding("util");
            } catch {}
        })(),
        np = rp && rp.isTypedArray;
    function EA(e, t) {
        for (var r = -1, n = e == null ? 0 : e.length, i = 0, o = []; ++r < n; ) {
            var s = e[r];
            t(s, r, e) && (o[i++] = s);
        }
        return o;
    }
    function yA(e, t) {
        for (var r = -1, n = t.length, i = e.length; ++r < n; ) e[i + r] = t[r];
        return e;
    }
    function _A(e, t) {
        for (var r = -1, n = e == null ? 0 : e.length; ++r < n; ) if (t(e[r], r, e)) return !0;
        return !1;
    }
    function vA(e, t) {
        for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
        return n;
    }
    function SA(e) {
        return function (t) {
            return e(t);
        };
    }
    function xA(e, t) {
        return e.has(t);
    }
    function AA(e, t) {
        return e?.[t];
    }
    function CA(e) {
        var t = -1,
            r = Array(e.size);
        return (
            e.forEach(function (n, i) {
                r[++t] = [i, n];
            }),
            r
        );
    }
    function TA(e, t) {
        return function (r) {
            return e(t(r));
        };
    }
    function bA(e) {
        var t = -1,
            r = Array(e.size);
        return (
            e.forEach(function (n) {
                r[++t] = n;
            }),
            r
        );
    }
    var OA = Array.prototype,
        IA = Function.prototype,
        bi = Object.prototype,
        $s = Qe["__core-js_shared__"],
        Ap = IA.toString,
        We = bi.hasOwnProperty,
        ip = (function () {
            var e = /[^.]+$/.exec(($s && $s.keys && $s.keys.IE_PROTO) || "");
            return e ? "Symbol(src)_1." + e : "";
        })(),
        Cp = bi.toString,
        NA = RegExp(
            "^" +
                Ap.call(We)
                    .replace(pA, "\\$&")
                    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") +
                "$"
        ),
        op = xp ? Qe.Buffer : void 0,
        xi = Qe.Symbol,
        sp = Qe.Uint8Array,
        Tp = bi.propertyIsEnumerable,
        DA = OA.splice,
        Rt = xi ? xi.toStringTag : void 0,
        ap = Object.getOwnPropertySymbols,
        RA = op ? op.isBuffer : void 0,
        PA = TA(Object.keys, Object),
        Hs = cr(Qe, "DataView"),
        on = cr(Qe, "Map"),
        js = cr(Qe, "Promise"),
        Ws = cr(Qe, "Set"),
        Gs = cr(Qe, "WeakMap"),
        sn = cr(Object, "create"),
        FA = qt(Hs),
        qA = qt(on),
        LA = qt(js),
        UA = qt(Ws),
        $A = qt(Gs),
        lp = xi ? xi.prototype : void 0,
        ks = lp ? lp.valueOf : void 0;
    function Pt(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
            var n = e[t];
            this.set(n[0], n[1]);
        }
    }
    function kA() {
        (this.__data__ = sn ? sn(null) : {}), (this.size = 0);
    }
    function MA(e) {
        var t = this.has(e) && delete this.__data__[e];
        return (this.size -= t ? 1 : 0), t;
    }
    function BA(e) {
        var t = this.__data__;
        if (sn) {
            var r = t[e];
            return r === Ys ? void 0 : r;
        }
        return We.call(t, e) ? t[e] : void 0;
    }
    function HA(e) {
        var t = this.__data__;
        return sn ? t[e] !== void 0 : We.call(t, e);
    }
    function jA(e, t) {
        var r = this.__data__;
        return (this.size += this.has(e) ? 0 : 1), (r[e] = sn && t === void 0 ? Ys : t), this;
    }
    Pt.prototype.clear = kA;
    Pt.prototype.delete = MA;
    Pt.prototype.get = BA;
    Pt.prototype.has = HA;
    Pt.prototype.set = jA;
    function Ze(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
            var n = e[t];
            this.set(n[0], n[1]);
        }
    }
    function WA() {
        (this.__data__ = []), (this.size = 0);
    }
    function GA(e) {
        var t = this.__data__,
            r = Oi(t, e);
        if (r < 0) return !1;
        var n = t.length - 1;
        return r == n ? t.pop() : DA.call(t, r, 1), --this.size, !0;
    }
    function VA(e) {
        var t = this.__data__,
            r = Oi(t, e);
        return r < 0 ? void 0 : t[r][1];
    }
    function YA(e) {
        return Oi(this.__data__, e) > -1;
    }
    function zA(e, t) {
        var r = this.__data__,
            n = Oi(r, e);
        return n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this;
    }
    Ze.prototype.clear = WA;
    Ze.prototype.delete = GA;
    Ze.prototype.get = VA;
    Ze.prototype.has = YA;
    Ze.prototype.set = zA;
    function Ft(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
            var n = e[t];
            this.set(n[0], n[1]);
        }
    }
    function XA() {
        (this.size = 0), (this.__data__ = { hash: new Pt(), map: new (on || Ze)(), string: new Pt() });
    }
    function KA(e) {
        var t = Ii(this, e).delete(e);
        return (this.size -= t ? 1 : 0), t;
    }
    function JA(e) {
        return Ii(this, e).get(e);
    }
    function QA(e) {
        return Ii(this, e).has(e);
    }
    function ZA(e, t) {
        var r = Ii(this, e),
            n = r.size;
        return r.set(e, t), (this.size += r.size == n ? 0 : 1), this;
    }
    Ft.prototype.clear = XA;
    Ft.prototype.delete = KA;
    Ft.prototype.get = JA;
    Ft.prototype.has = QA;
    Ft.prototype.set = ZA;
    function Ai(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.__data__ = new Ft(); ++t < r; ) this.add(e[t]);
    }
    function eC(e) {
        return this.__data__.set(e, Ys), this;
    }
    function tC(e) {
        return this.__data__.has(e);
    }
    Ai.prototype.add = Ai.prototype.push = eC;
    Ai.prototype.has = tC;
    function ht(e) {
        var t = (this.__data__ = new Ze(e));
        this.size = t.size;
    }
    function rC() {
        (this.__data__ = new Ze()), (this.size = 0);
    }
    function nC(e) {
        var t = this.__data__,
            r = t.delete(e);
        return (this.size = t.size), r;
    }
    function iC(e) {
        return this.__data__.get(e);
    }
    function oC(e) {
        return this.__data__.has(e);
    }
    function sC(e, t) {
        var r = this.__data__;
        if (r instanceof Ze) {
            var n = r.__data__;
            if (!on || n.length < Qx - 1) return n.push([e, t]), (this.size = ++r.size), this;
            r = this.__data__ = new Ft(n);
        }
        return r.set(e, t), (this.size = r.size), this;
    }
    ht.prototype.clear = rC;
    ht.prototype.delete = nC;
    ht.prototype.get = iC;
    ht.prototype.has = oC;
    ht.prototype.set = sC;
    function aC(e, t) {
        var r = Ci(e),
            n = !r && SC(e),
            i = !r && !n && Vs(e),
            o = !r && !n && !i && Pp(e),
            s = r || n || i || o,
            a = s ? vA(e.length, String) : [],
            l = a.length;
        for (var h in e)
            (t || We.call(e, h)) &&
                !(
                    s &&
                    (h == "length" ||
                        (i && (h == "offset" || h == "parent")) ||
                        (o && (h == "buffer" || h == "byteLength" || h == "byteOffset")) ||
                        wC(h, l))
                ) &&
                a.push(h);
        return a;
    }
    function Oi(e, t) {
        for (var r = e.length; r--; ) if (Ip(e[r][0], t)) return r;
        return -1;
    }
    function lC(e, t, r) {
        var n = t(e);
        return Ci(e) ? n : yA(n, r(e));
    }
    function ln(e) {
        return e == null ? (e === void 0 ? iA : tA) : Rt && Rt in Object(e) ? mC(e) : vC(e);
    }
    function up(e) {
        return an(e) && ln(e) == yi;
    }
    function bp(e, t, r, n, i) {
        return e === t ? !0 : e == null || t == null || (!an(e) && !an(t)) ? e !== e && t !== t : uC(e, t, r, n, bp, i);
    }
    function uC(e, t, r, n, i, o) {
        var s = Ci(e),
            a = Ci(t),
            l = s ? Ms : dt(e),
            h = a ? Ms : dt(t);
        (l = l == yi ? lr : l), (h = h == yi ? lr : h);
        var c = l == lr,
            f = h == lr,
            m = l == h;
        if (m && Vs(e)) {
            if (!Vs(t)) return !1;
            (s = !0), (c = !1);
        }
        if (m && !c) return o || (o = new ht()), s || Pp(e) ? Op(e, t, r, n, i, o) : hC(e, t, l, r, n, i, o);
        if (!(r & Ti)) {
            var p = c && We.call(e, "__wrapped__"),
                y = f && We.call(t, "__wrapped__");
            if (p || y) {
                var _ = p ? e.value() : e,
                    v = y ? t.value() : t;
                return o || (o = new ht()), i(_, v, r, n, o);
            }
        }
        return m ? (o || (o = new ht()), pC(e, t, r, n, i, o)) : !1;
    }
    function cC(e) {
        if (!Rp(e) || yC(e)) return !1;
        var t = Np(e) ? NA : mA;
        return t.test(qt(e));
    }
    function fC(e) {
        return an(e) && Dp(e.length) && !!z[ln(e)];
    }
    function dC(e) {
        if (!_C(e)) return PA(e);
        var t = [];
        for (var r in Object(e)) We.call(e, r) && r != "constructor" && t.push(r);
        return t;
    }
    function Op(e, t, r, n, i, o) {
        var s = r & Ti,
            a = e.length,
            l = t.length;
        if (a != l && !(s && l > a)) return !1;
        var h = o.get(e);
        if (h && o.get(t)) return h == t;
        var c = -1,
            f = !0,
            m = r & fp ? new Ai() : void 0;
        for (o.set(e, t), o.set(t, e); ++c < a; ) {
            var p = e[c],
                y = t[c];
            if (n) var _ = s ? n(y, p, c, t, e, o) : n(p, y, c, e, t, o);
            if (_ !== void 0) {
                if (_) continue;
                f = !1;
                break;
            }
            if (m) {
                if (
                    !_A(t, function (v, C) {
                        if (!xA(m, C) && (p === v || i(p, v, r, n, o))) return m.push(C);
                    })
                ) {
                    f = !1;
                    break;
                }
            } else if (!(p === y || i(p, y, r, n, o))) {
                f = !1;
                break;
            }
        }
        return o.delete(e), o.delete(t), f;
    }
    function hC(e, t, r, n, i, o, s) {
        switch (r) {
            case Si:
                if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
                (e = e.buffer), (t = t.buffer);
            case _p:
                return !(e.byteLength != t.byteLength || !o(new sp(e), new sp(t)));
            case hp:
            case pp:
            case wp:
                return Ip(+e, +t);
            case mp:
                return e.name == t.name && e.message == t.message;
            case Ep:
            case yp:
                return e == t + "";
            case _i:
                var a = CA;
            case vi:
                var l = n & Ti;
                if ((a || (a = bA), e.size != t.size && !l)) return !1;
                var h = s.get(e);
                if (h) return h == t;
                (n |= fp), s.set(e, t);
                var c = Op(a(e), a(t), n, i, o, s);
                return s.delete(e), c;
            case nA:
                if (ks) return ks.call(e) == ks.call(t);
        }
        return !1;
    }
    function pC(e, t, r, n, i, o) {
        var s = r & Ti,
            a = cp(e),
            l = a.length,
            h = cp(t),
            c = h.length;
        if (l != c && !s) return !1;
        for (var f = l; f--; ) {
            var m = a[f];
            if (!(s ? m in t : We.call(t, m))) return !1;
        }
        var p = o.get(e);
        if (p && o.get(t)) return p == t;
        var y = !0;
        o.set(e, t), o.set(t, e);
        for (var _ = s; ++f < l; ) {
            m = a[f];
            var v = e[m],
                C = t[m];
            if (n) var x = s ? n(C, v, m, t, e, o) : n(v, C, m, e, t, o);
            if (!(x === void 0 ? v === C || i(v, C, r, n, o) : x)) {
                y = !1;
                break;
            }
            _ || (_ = m == "constructor");
        }
        if (y && !_) {
            var N = e.constructor,
                L = t.constructor;
            N != L &&
                "constructor" in e &&
                "constructor" in t &&
                !(typeof N == "function" && N instanceof N && typeof L == "function" && L instanceof L) &&
                (y = !1);
        }
        return o.delete(e), o.delete(t), y;
    }
    function cp(e) {
        return lC(e, CC, gC);
    }
    function Ii(e, t) {
        var r = e.__data__;
        return EC(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
    }
    function cr(e, t) {
        var r = AA(e, t);
        return cC(r) ? r : void 0;
    }
    function mC(e) {
        var t = We.call(e, Rt),
            r = e[Rt];
        try {
            e[Rt] = void 0;
            var n = !0;
        } catch {}
        var i = Cp.call(e);
        return n && (t ? (e[Rt] = r) : delete e[Rt]), i;
    }
    var gC = ap
            ? function (e) {
                  return e == null
                      ? []
                      : ((e = Object(e)),
                        EA(ap(e), function (t) {
                            return Tp.call(e, t);
                        }));
              }
            : TC,
        dt = ln;
    ((Hs && dt(new Hs(new ArrayBuffer(1))) != Si) ||
        (on && dt(new on()) != _i) ||
        (js && dt(js.resolve()) != ep) ||
        (Ws && dt(new Ws()) != vi) ||
        (Gs && dt(new Gs()) != Bs)) &&
        (dt = function (e) {
            var t = ln(e),
                r = t == lr ? e.constructor : void 0,
                n = r ? qt(r) : "";
            if (n)
                switch (n) {
                    case FA:
                        return Si;
                    case qA:
                        return _i;
                    case LA:
                        return ep;
                    case UA:
                        return vi;
                    case $A:
                        return Bs;
                }
            return t;
        });
    function wC(e, t) {
        return (t = t ?? dp), !!t && (typeof e == "number" || gA.test(e)) && e > -1 && e % 1 == 0 && e < t;
    }
    function EC(e) {
        var t = typeof e;
        return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
    }
    function yC(e) {
        return !!ip && ip in e;
    }
    function _C(e) {
        var t = e && e.constructor,
            r = (typeof t == "function" && t.prototype) || bi;
        return e === r;
    }
    function vC(e) {
        return Cp.call(e);
    }
    function qt(e) {
        if (e != null) {
            try {
                return Ap.call(e);
            } catch {}
            try {
                return e + "";
            } catch {}
        }
        return "";
    }
    function Ip(e, t) {
        return e === t || (e !== e && t !== t);
    }
    var SC = up(
            (function () {
                return arguments;
            })()
        )
            ? up
            : function (e) {
                  return an(e) && We.call(e, "callee") && !Tp.call(e, "callee");
              },
        Ci = Array.isArray;
    function xC(e) {
        return e != null && Dp(e.length) && !Np(e);
    }
    var Vs = RA || bC;
    function AC(e, t) {
        return bp(e, t);
    }
    function Np(e) {
        if (!Rp(e)) return !1;
        var t = ln(e);
        return t == gp || t == eA || t == Zx || t == rA;
    }
    function Dp(e) {
        return typeof e == "number" && e > -1 && e % 1 == 0 && e <= dp;
    }
    function Rp(e) {
        var t = typeof e;
        return e != null && (t == "object" || t == "function");
    }
    function an(e) {
        return e != null && typeof e == "object";
    }
    var Pp = np ? SA(np) : fC;
    function CC(e) {
        return xC(e) ? aC(e) : dC(e);
    }
    function TC() {
        return [];
    }
    function bC() {
        return !1;
    }
    ur.exports = AC;
});
var Lp = g(cn => {
    "use strict";
    Object.defineProperty(cn, "__esModule", { value: !0 });
    cn.DownloadedUpdateHelper = void 0;
    cn.createTempUpdateFile = DC;
    var OC = require("crypto"),
        IC = require("fs"),
        qp = Fp(),
        Lt = Xe(),
        un = require("path"),
        zs = class {
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
                    return qp(this.versionInfo, r) && qp(this.fileInfo.info, n.info) && (await (0, Lt.pathExists)(t)) ? t : null;
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
                let l = await NC(a);
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
    cn.DownloadedUpdateHelper = zs;
    function NC(e, t = "sha512", r = "base64", n) {
        return new Promise((i, o) => {
            let s = (0, OC.createHash)(t);
            s.on("error", o).setEncoding(r),
                (0, IC.createReadStream)(e, { ...n, highWaterMark: 1024 * 1024 })
                    .on("error", o)
                    .on("end", () => {
                        s.end(), i(s.read());
                    })
                    .pipe(s, { end: !1 });
        });
    }
    async function DC(e, t, r) {
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
var Up = g(Ks => {
    "use strict";
    Object.defineProperty(Ks, "__esModule", { value: !0 });
    Ks.getAppCacheDir = PC;
    var Xs = require("path"),
        RC = require("os");
    function PC() {
        let e = (0, RC.homedir)(),
            t;
        return (
            process.platform === "win32"
                ? (t = process.env.LOCALAPPDATA || Xs.join(e, "AppData", "Local"))
                : process.platform === "darwin"
                ? (t = Xs.join(e, "Library", "Caches"))
                : (t = process.env.XDG_CACHE_HOME || Xs.join(e, ".cache")),
            t
        );
    }
});
var kp = g(Ni => {
    "use strict";
    Object.defineProperty(Ni, "__esModule", { value: !0 });
    Ni.ElectronAppAdapter = void 0;
    var $p = require("path"),
        FC = Up(),
        Js = class {
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
                    ? $p.join(process.resourcesPath, "app-update.yml")
                    : $p.join(this.app.getAppPath(), "dev-app-update.yml");
            }
            get userDataPath() {
                return this.app.getPath("userData");
            }
            get baseCachePath() {
                return (0, FC.getAppCacheDir)();
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
    Ni.ElectronAppAdapter = Js;
});
var Bp = g(pt => {
    "use strict";
    Object.defineProperty(pt, "__esModule", { value: !0 });
    pt.ElectronHttpExecutor = pt.NET_SESSION_NAME = void 0;
    pt.getNetSession = Mp;
    var Di = le();
    pt.NET_SESSION_NAME = "electron-updater";
    function Mp() {
        return require("electron").session.fromPartition(pt.NET_SESSION_NAME, { cache: !1 });
    }
    var Qs = class extends Di.HttpExecutor {
        constructor(t) {
            super(), (this.proxyLoginCallback = t), (this.cachedSession = null);
        }
        async download(t, r, n) {
            return await n.cancellationToken.createPromise((i, o, s) => {
                let a = { headers: n.headers || void 0, redirect: "manual" };
                (0, Di.configureRequestUrl)(t, a),
                    (0, Di.configureRequestOptions)(a),
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
                this.cachedSession == null && (this.cachedSession = Mp());
            let n = require("electron").net.request({ ...t, session: this.cachedSession });
            return n.on("response", r), this.proxyLoginCallback != null && n.on("login", this.proxyLoginCallback), n;
        }
        addRedirectHandlers(t, r, n, i, o) {
            t.on("redirect", (s, a, l) => {
                t.abort(),
                    i > this.maxRedirects ? n(this.createMaxRedirectError()) : o(Di.HttpExecutor.prepareRedirectUrlOptions(l, r));
            });
        }
    };
    pt.ElectronHttpExecutor = Qs;
});
var Yp = g((yN, Vp) => {
    var qC = 1 / 0,
        LC = "[object Symbol]",
        Gp = /[\\^$.*+?()[\]{}|]/g,
        UC = RegExp(Gp.source),
        $C = typeof global == "object" && global && global.Object === Object && global,
        kC = typeof self == "object" && self && self.Object === Object && self,
        MC = $C || kC || Function("return this")(),
        BC = Object.prototype,
        HC = BC.toString,
        Hp = MC.Symbol,
        jp = Hp ? Hp.prototype : void 0,
        Wp = jp ? jp.toString : void 0;
    function jC(e) {
        if (typeof e == "string") return e;
        if (GC(e)) return Wp ? Wp.call(e) : "";
        var t = e + "";
        return t == "0" && 1 / e == -qC ? "-0" : t;
    }
    function WC(e) {
        return !!e && typeof e == "object";
    }
    function GC(e) {
        return typeof e == "symbol" || (WC(e) && HC.call(e) == LC);
    }
    function VC(e) {
        return e == null ? "" : jC(e);
    }
    function YC(e) {
        return (e = VC(e)), e && UC.test(e) ? e.replace(Gp, "\\$&") : e;
    }
    Vp.exports = YC;
});
var mt = g(fr => {
    "use strict";
    Object.defineProperty(fr, "__esModule", { value: !0 });
    fr.newBaseUrl = XC;
    fr.newUrlFromBase = Zs;
    fr.getChannelFilename = KC;
    fr.blockmapFiles = JC;
    var zp = require("url"),
        zC = Yp();
    function XC(e) {
        let t = new zp.URL(e);
        return t.pathname.endsWith("/") || (t.pathname += "/"), t;
    }
    function Zs(e, t, r = !1) {
        let n = new zp.URL(e, t),
            i = t.search;
        return i != null && i.length !== 0 ? (n.search = i) : r && (n.search = "noCache=".concat(Date.now().toString(32))), n;
    }
    function KC(e) {
        return "".concat(e, ".yml");
    }
    function JC(e, t, r) {
        let n = Zs("".concat(e.pathname, ".blockmap"), e);
        return [Zs("".concat(e.pathname.replace(new RegExp(zC(r), "g"), t), ".blockmap"), e), n];
    }
});
var Ue = g(wt => {
    "use strict";
    Object.defineProperty(wt, "__esModule", { value: !0 });
    wt.Provider = void 0;
    wt.findFile = ZC;
    wt.parseUpdateInfo = eT;
    wt.getFileList = Kp;
    wt.resolveFiles = tT;
    var gt = le(),
        QC = ai(),
        Xp = mt(),
        ea = class {
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
    wt.Provider = ea;
    function ZC(e, t, r) {
        if (e.length === 0) throw (0, gt.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
        let n = e.find(i => i.url.pathname.toLowerCase().endsWith(".".concat(t)));
        return n ?? (r == null ? e[0] : e.find(i => !r.some(o => i.url.pathname.toLowerCase().endsWith(".".concat(o)))));
    }
    function eT(e, t, r) {
        if (e == null)
            throw (0, gt.newError)(
                "Cannot parse update info from ".concat(t, " in the latest release artifacts (").concat(r, "): rawData: null"),
                "ERR_UPDATER_INVALID_UPDATE_INFO"
            );
        let n;
        try {
            n = (0, QC.load)(e);
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
    function Kp(e) {
        let t = e.files;
        if (t != null && t.length > 0) return t;
        if (e.path != null) return [{ url: e.path, sha2: e.sha2, sha512: e.sha512 }];
        throw (0, gt.newError)("No files provided: ".concat((0, gt.safeStringifyJson)(e)), "ERR_UPDATER_NO_FILES_PROVIDED");
    }
    function tT(e, t, r = n => n) {
        let i = Kp(e).map(a => {
                if (a.sha2 == null && a.sha512 == null)
                    throw (0, gt.newError)(
                        "Update info doesn't contain nor sha256 neither sha512 checksum: ".concat((0, gt.safeStringifyJson)(a)),
                        "ERR_UPDATER_NO_CHECKSUM"
                    );
                return { url: (0, Xp.newUrlFromBase)(r(a.url), t), info: a };
            }),
            o = e.packages,
            s = o == null ? null : o[process.arch] || o.ia32;
        return s != null && (i[0].packageInfo = { ...s, path: (0, Xp.newUrlFromBase)(r(s.path), t).href }), i;
    }
});
var ia = g(Ri => {
    "use strict";
    Object.defineProperty(Ri, "__esModule", { value: !0 });
    Ri.GenericProvider = void 0;
    var Jp = le(),
        ta = mt(),
        ra = Ue(),
        na = class extends ra.Provider {
            constructor(t, r, n) {
                super(n),
                    (this.configuration = t),
                    (this.updater = r),
                    (this.baseUrl = (0, ta.newBaseUrl)(this.configuration.url));
            }
            get channel() {
                let t = this.updater.channel || this.configuration.channel;
                return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
            }
            async getLatestVersion() {
                let t = (0, ta.getChannelFilename)(this.channel),
                    r = (0, ta.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
                for (let n = 0; ; n++)
                    try {
                        return (0, ra.parseUpdateInfo)(await this.httpRequest(r), t, r);
                    } catch (i) {
                        if (i instanceof Jp.HttpError && i.statusCode === 404)
                            throw (0, Jp.newError)(
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
                return (0, ra.resolveFiles)(t, this.baseUrl);
            }
        };
    Ri.GenericProvider = na;
});
var Zp = g(Pi => {
    "use strict";
    Object.defineProperty(Pi, "__esModule", { value: !0 });
    Pi.BitbucketProvider = void 0;
    var Qp = le(),
        oa = mt(),
        sa = Ue(),
        aa = class extends sa.Provider {
            constructor(t, r, n) {
                super({ ...n, isUseMultipleRangeRequest: !1 }), (this.configuration = t), (this.updater = r);
                let { owner: i, slug: o } = t;
                this.baseUrl = (0, oa.newBaseUrl)(
                    "https://api.bitbucket.org/2.0/repositories/".concat(i, "/").concat(o, "/downloads")
                );
            }
            get channel() {
                return this.updater.channel || this.configuration.channel || "latest";
            }
            async getLatestVersion() {
                let t = new Qp.CancellationToken(),
                    r = (0, oa.getChannelFilename)(this.getCustomChannelName(this.channel)),
                    n = (0, oa.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
                try {
                    let i = await this.httpRequest(n, void 0, t);
                    return (0, sa.parseUpdateInfo)(i, r, n);
                } catch (i) {
                    throw (0, Qp.newError)(
                        "Unable to find latest version on "
                            .concat(this.toString(), ", please ensure release exists: ")
                            .concat(i.stack || i.message),
                        "ERR_UPDATER_LATEST_VERSION_NOT_FOUND"
                    );
                }
            }
            resolveFiles(t) {
                return (0, sa.resolveFiles)(t, this.baseUrl);
            }
            toString() {
                let { owner: t, slug: r } = this.configuration;
                return "Bitbucket (owner: ".concat(t, ", slug: ").concat(r, ", channel: ").concat(this.channel, ")");
            }
        };
    Pi.BitbucketProvider = aa;
});
var fa = g(Ut => {
    "use strict";
    Object.defineProperty(Ut, "__esModule", { value: !0 });
    Ut.GitHubProvider = Ut.BaseGitHubProvider = void 0;
    Ut.computeReleaseNotes = tm;
    var et = le(),
        dr = Ls(),
        rT = require("url"),
        hr = mt(),
        ua = Ue(),
        la = /\/tag\/([^/]+)$/,
        Fi = class extends ua.Provider {
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
    var ca = class extends Fi {
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
                    if (v === null) c = la.exec(h.element("link").attribute("href"))[1];
                    else
                        for (let C of l.getElements("entry")) {
                            let x = la.exec(C.element("link").attribute("href"));
                            if (x === null) continue;
                            let N = x[1],
                                L = ((n = dr.prerelease(N)) === null || n === void 0 ? void 0 : n[0]) || null,
                                Pe = !v || ["alpha", "beta"].includes(v),
                                V = L !== null && !["alpha", "beta"].includes(String(L));
                            if (Pe && !V && !(v === "beta" && L === "alpha")) {
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
                        if (la.exec(v.element("link").attribute("href"))[1] === c) {
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
                y = async v => {
                    (m = (0, hr.getChannelFilename)(v)),
                        (p = (0, hr.newUrlFromBase)(this.getBaseDownloadPath(String(c), m), this.baseUrl));
                    let C = this.createRequestOptions(p);
                    try {
                        return await this.executor.request(C, s);
                    } catch (x) {
                        throw x instanceof et.HttpError && x.statusCode === 404
                            ? (0, et.newError)(
                                  "Cannot find "
                                      .concat(m, " in the latest release artifacts (")
                                      .concat(p, "): ")
                                      .concat(x.stack || x.message),
                                  "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND"
                              )
                            : x;
                    }
                };
            try {
                let v = this.channel;
                this.updater.allowPrerelease &&
                    !((i = dr.prerelease(c)) === null || i === void 0) &&
                    i[0] &&
                    (v = this.getCustomChannelName(String((o = dr.prerelease(c)) === null || o === void 0 ? void 0 : o[0]))),
                    (f = await y(v));
            } catch (v) {
                if (this.updater.allowPrerelease) f = await y(this.getDefaultChannelName());
                else throw v;
            }
            let _ = (0, ua.parseUpdateInfo)(f, m, p);
            return (
                _.releaseName == null && (_.releaseName = h.elementValueOrEmpty("title")),
                _.releaseNotes == null && (_.releaseNotes = tm(this.updater.currentVersion, this.updater.fullChangelog, l, h)),
                { tag: c, ..._ }
            );
        }
        async getLatestTagName(t) {
            let r = this.options,
                n =
                    r.host == null || r.host === "github.com"
                        ? (0, hr.newUrlFromBase)("".concat(this.basePath, "/latest"), this.baseUrl)
                        : new rT.URL(
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
            return (0, ua.resolveFiles)(t, this.baseUrl, r => this.getBaseDownloadPath(t.tag, r.replace(/ /g, "-")));
        }
        getBaseDownloadPath(t, r) {
            return "".concat(this.basePath, "/download/").concat(t, "/").concat(r);
        }
    };
    Ut.GitHubProvider = ca;
    function em(e) {
        let t = e.elementValueOrEmpty("content");
        return t === "No content." ? "" : t;
    }
    function tm(e, t, r, n) {
        if (!t) return em(n);
        let i = [];
        for (let o of r.getElements("entry")) {
            let s = /\/tag\/v?([^/]+)$/.exec(o.element("link").attribute("href"))[1];
            dr.lt(e, s) && i.push({ version: s, note: em(o) });
        }
        return i.sort((o, s) => dr.rcompare(o.version, s.version));
    }
});
var nm = g(qi => {
    "use strict";
    Object.defineProperty(qi, "__esModule", { value: !0 });
    qi.KeygenProvider = void 0;
    var rm = le(),
        da = mt(),
        ha = Ue(),
        pa = class extends ha.Provider {
            constructor(t, r, n) {
                super({ ...n, isUseMultipleRangeRequest: !1 }),
                    (this.configuration = t),
                    (this.updater = r),
                    (this.baseUrl = (0, da.newBaseUrl)(
                        "https://api.keygen.sh/v1/accounts/"
                            .concat(this.configuration.account, "/artifacts?product=")
                            .concat(this.configuration.product)
                    ));
            }
            get channel() {
                return this.updater.channel || this.configuration.channel || "stable";
            }
            async getLatestVersion() {
                let t = new rm.CancellationToken(),
                    r = (0, da.getChannelFilename)(this.getCustomChannelName(this.channel)),
                    n = (0, da.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
                try {
                    let i = await this.httpRequest(n, { "Accept": "application/vnd.api+json", "Keygen-Version": "1.1" }, t);
                    return (0, ha.parseUpdateInfo)(i, r, n);
                } catch (i) {
                    throw (0, rm.newError)(
                        "Unable to find latest version on "
                            .concat(this.toString(), ", please ensure release exists: ")
                            .concat(i.stack || i.message),
                        "ERR_UPDATER_LATEST_VERSION_NOT_FOUND"
                    );
                }
            }
            resolveFiles(t) {
                return (0, ha.resolveFiles)(t, this.baseUrl);
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
    qi.KeygenProvider = pa;
});
var sm = g(Li => {
    "use strict";
    Object.defineProperty(Li, "__esModule", { value: !0 });
    Li.PrivateGitHubProvider = void 0;
    var pr = le(),
        nT = ai(),
        iT = require("path"),
        im = require("url"),
        om = mt(),
        oT = fa(),
        sT = Ue(),
        ma = class extends oT.BaseGitHubProvider {
            constructor(t, r, n, i) {
                super(t, "api.github.com", i), (this.updater = r), (this.token = n);
            }
            createRequestOptions(t, r) {
                let n = super.createRequestOptions(t, r);
                return (n.redirect = "manual"), n;
            }
            async getLatestVersion() {
                let t = new pr.CancellationToken(),
                    r = (0, om.getChannelFilename)(this.getDefaultChannelName()),
                    n = await this.getLatestVersionInfo(t),
                    i = n.assets.find(a => a.name === r);
                if (i == null)
                    throw (0, pr.newError)(
                        "Cannot find ".concat(r, " in the release ").concat(n.html_url || n.name),
                        "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND"
                    );
                let o = new im.URL(i.url),
                    s;
                try {
                    s = (0, nT.load)(await this.httpRequest(o, this.configureHeaders("application/octet-stream"), t));
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
                let i = (0, om.newUrlFromBase)(n, this.baseUrl);
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
                return (0, sT.getFileList)(t).map(r => {
                    let n = iT.posix.basename(r.url).replace(/ /g, "-"),
                        i = t.assets.find(o => o != null && o.name === n);
                    if (i == null)
                        throw (0, pr.newError)(
                            'Cannot find asset "'.concat(n, '" in: ').concat(JSON.stringify(t.assets, null, 2)),
                            "ERR_UPDATER_ASSET_NOT_FOUND"
                        );
                    return { url: new im.URL(i.url), info: r };
                });
            }
        };
    Li.PrivateGitHubProvider = ma;
});
var um = g($i => {
    "use strict";
    Object.defineProperty($i, "__esModule", { value: !0 });
    $i.isUrlProbablySupportMultiRangeRequests = lm;
    $i.createClient = fT;
    var Ui = le(),
        aT = Zp(),
        am = ia(),
        lT = fa(),
        uT = nm(),
        cT = sm();
    function lm(e) {
        return !e.includes("s3.amazonaws.com");
    }
    function fT(e, t, r) {
        if (typeof e == "string")
            throw (0, Ui.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
        let n = e.provider;
        switch (n) {
            case "github": {
                let i = e,
                    o = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
                return o == null ? new lT.GitHubProvider(i, t, r) : new cT.PrivateGitHubProvider(i, t, o, r);
            }
            case "bitbucket":
                return new aT.BitbucketProvider(e, t, r);
            case "keygen":
                return new uT.KeygenProvider(e, t, r);
            case "s3":
            case "spaces":
                return new am.GenericProvider(
                    { provider: "generic", url: (0, Ui.getS3LikeProviderBaseUrl)(e), channel: e.channel || null },
                    t,
                    { ...r, isUseMultipleRangeRequest: !1 }
                );
            case "generic": {
                let i = e;
                return new am.GenericProvider(i, t, {
                    ...r,
                    isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && lm(i.url)
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
    fn.computeOperations = dT;
    var $t;
    (function (e) {
        (e[(e.COPY = 0)] = "COPY"), (e[(e.DOWNLOAD = 1)] = "DOWNLOAD");
    })($t || (fn.OperationKind = $t = {}));
    function dT(e, t, r) {
        let n = fm(e.files),
            i = fm(t.files),
            o = null,
            s = t.files[0],
            a = [],
            l = s.name,
            h = n.get(l);
        if (h == null) throw new Error("no file ".concat(l, " in old blockmap"));
        let c = i.get(l),
            f = 0,
            { checksumToOffset: m, checksumToOldSize: p } = pT(n.get(l), h.offset, r),
            y = s.offset;
        for (let _ = 0; _ < c.checksums.length; y += c.sizes[_], _++) {
            let v = c.sizes[_],
                C = c.checksums[_],
                x = m.get(C);
            x != null &&
                p.get(C) !== v &&
                (r.warn(
                    'Checksum ("'.concat(C, '") matches, but size differs (old: ').concat(p.get(C), ", new: ").concat(v, ")")
                ),
                (x = void 0)),
                x === void 0
                    ? (f++,
                      o != null && o.kind === $t.DOWNLOAD && o.end === y
                          ? (o.end += v)
                          : ((o = { kind: $t.DOWNLOAD, start: y, end: y + v }), cm(o, a, C, _)))
                    : o != null && o.kind === $t.COPY && o.end === x
                    ? (o.end += v)
                    : ((o = { kind: $t.COPY, start: x, end: x + v }), cm(o, a, C, _));
        }
        return f > 0 && r.info("File".concat(s.name === "file" ? "" : " " + s.name, " has ").concat(f, " changed blocks")), a;
    }
    var hT = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
    function cm(e, t, r, n) {
        if (hT && t.length !== 0) {
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
    function pT(e, t, r) {
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
    function fm(e) {
        let t = new Map();
        for (let r of e) t.set(r.name, r);
        return t;
    }
});
var wa = g(dn => {
    "use strict";
    Object.defineProperty(dn, "__esModule", { value: !0 });
    dn.DataSplitter = void 0;
    dn.copyData = hm;
    var Mi = le(),
        mT = require("fs"),
        gT = require("stream"),
        wT = ki(),
        dm = Buffer.from("\r\n\r\n"),
        Et;
    (function (e) {
        (e[(e.INIT = 0)] = "INIT"), (e[(e.HEADER = 1)] = "HEADER"), (e[(e.BODY = 2)] = "BODY");
    })(Et || (Et = {}));
    function hm(e, t, r, n, i) {
        let o = (0, mT.createReadStream)("", { fd: r, autoClose: !1, start: e.start, end: e.end - 1 });
        o.on("error", n), o.once("end", i), o.pipe(t, { end: !1 });
    }
    var ga = class extends gT.Writable {
        constructor(t, r, n, i, o, s) {
            super(),
                (this.out = t),
                (this.options = r),
                (this.partIndexToTaskIndex = n),
                (this.partIndexToLength = o),
                (this.finishHandler = s),
                (this.partIndex = -1),
                (this.headerListBuffer = null),
                (this.readState = Et.INIT),
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
                if (this.readState === Et.HEADER) {
                    let n = this.searchHeaderListEnd(t, r);
                    if (n === -1) return;
                    (r = n), (this.readState = Et.BODY), (this.headerListBuffer = null);
                }
                for (;;) {
                    if (this.readState === Et.BODY) this.readState = Et.INIT;
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
                            this.readState = Et.HEADER;
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
                    if (s.kind !== wT.OperationKind.COPY) {
                        i(new Error("Task kind must be COPY"));
                        return;
                    }
                    hm(s, this.out, this.options.oldFileFd, i, () => {
                        t++, o();
                    });
                };
                o();
            });
        }
        searchHeaderListEnd(t, r) {
            let n = t.indexOf(dm, r);
            if (n !== -1) return n + dm.length;
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
    dn.DataSplitter = ga;
});
var gm = g(Bi => {
    "use strict";
    Object.defineProperty(Bi, "__esModule", { value: !0 });
    Bi.executeTasksUsingMultipleRangeRequests = ET;
    Bi.checkIsRangesSupported = ya;
    var Ea = le(),
        pm = wa(),
        mm = ki();
    function ET(e, t, r, n, i) {
        let o = s => {
            if (s >= t.length) {
                e.fileMetadataBuffer != null && r.write(e.fileMetadataBuffer), r.end();
                return;
            }
            let a = s + 1e3;
            yT(e, { tasks: t, start: s, end: Math.min(t.length, a), oldFileFd: n }, r, () => o(a), i);
        };
        return o;
    }
    function yT(e, t, r, n, i) {
        let o = "bytes=",
            s = 0,
            a = new Map(),
            l = [];
        for (let f = t.start; f < t.end; f++) {
            let m = t.tasks[f];
            m.kind === mm.OperationKind.DOWNLOAD &&
                ((o += "".concat(m.start, "-").concat(m.end - 1, ", ")), a.set(s, f), s++, l.push(m.end - m.start));
        }
        if (s <= 1) {
            let f = m => {
                if (m >= t.end) {
                    n();
                    return;
                }
                let p = t.tasks[m++];
                if (p.kind === mm.OperationKind.COPY) (0, pm.copyData)(p, r, t.oldFileFd, i, () => f(m));
                else {
                    let y = e.createRequestOptions();
                    y.headers.Range = "bytes=".concat(p.start, "-").concat(p.end - 1);
                    let _ = e.httpExecutor.createRequest(y, v => {
                        ya(v, i) && (v.pipe(r, { end: !1 }), v.once("end", () => f(m)));
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
            if (!ya(f, i)) return;
            let m = (0, Ea.safeGetHeader)(f, "content-type"),
                p = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(m);
            if (p == null) {
                i(new Error('Content-Type "multipart/byteranges" is expected, but got "'.concat(m, '"')));
                return;
            }
            let y = new pm.DataSplitter(r, t, a, p[1] || p[2], l, n);
            y.on("error", i),
                f.pipe(y),
                f.on("end", () => {
                    setTimeout(() => {
                        c.abort(), i(new Error("Response ends without calling any handlers"));
                    }, 1e4);
                });
        });
        e.httpExecutor.addErrorAndTimeoutHandlers(c, i), c.end();
    }
    function ya(e, t) {
        if (e.statusCode >= 400) return t((0, Ea.createHttpError)(e)), !1;
        if (e.statusCode !== 206) {
            let r = (0, Ea.safeGetHeader)(e, "accept-ranges");
            if (r == null || r === "none")
                return t(new Error("Server doesn't support Accept-Ranges (response code ".concat(e.statusCode, ")"))), !1;
        }
        return !0;
    }
});
var wm = g(Hi => {
    "use strict";
    Object.defineProperty(Hi, "__esModule", { value: !0 });
    Hi.ProgressDifferentialDownloadCallbackTransform = void 0;
    var _T = require("stream"),
        mr;
    (function (e) {
        (e[(e.COPY = 0)] = "COPY"), (e[(e.DOWNLOAD = 1)] = "DOWNLOAD");
    })(mr || (mr = {}));
    var _a = class extends _T.Transform {
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
    Hi.ProgressDifferentialDownloadCallbackTransform = _a;
});
var xa = g(Wi => {
    "use strict";
    Object.defineProperty(Wi, "__esModule", { value: !0 });
    Wi.DifferentialDownloader = void 0;
    var hn = le(),
        va = Xe(),
        vT = require("fs"),
        ST = wa(),
        xT = require("url"),
        ji = ki(),
        Em = gm(),
        AT = wm(),
        Sa = class {
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
                            .concat(ym(a), ", To download: ")
                            .concat(ym(o), " (")
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
                                (0, va.close)(i.descriptor).catch(o => {
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
                let n = await (0, va.open)(this.options.oldFile, "r");
                r.push({ descriptor: n, path: this.options.oldFile });
                let i = await (0, va.open)(this.options.newFile, "w");
                r.push({ descriptor: i, path: this.options.newFile });
                let o = (0, vT.createWriteStream)(this.options.newFile, { fd: i });
                await new Promise((s, a) => {
                    let l = [],
                        h;
                    if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
                        let C = [],
                            x = 0;
                        for (let L of t)
                            L.kind === ji.OperationKind.DOWNLOAD && (C.push(L.end - L.start), (x += L.end - L.start));
                        let N = { expectedByteCounts: C, grandTotal: x };
                        (h = new AT.ProgressDifferentialDownloadCallbackTransform(
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
                                } catch (C) {
                                    a(C);
                                    return;
                                }
                                s(void 0);
                            });
                        }),
                        l.push(o);
                    let f = null;
                    for (let C of l) C.on("error", a), f == null ? (f = C) : (f = f.pipe(C));
                    let m = l[0],
                        p;
                    if (this.options.isUseMultipleRangeRequest) {
                        (p = (0, Em.executeTasksUsingMultipleRangeRequests)(this, t, m, n, a)), p(0);
                        return;
                    }
                    let y = 0,
                        _ = null;
                    this.logger.info("Differential download: ".concat(this.options.newUrl));
                    let v = this.createRequestOptions();
                    (v.redirect = "manual"),
                        (p = C => {
                            var x, N;
                            if (C >= t.length) {
                                this.fileMetadataBuffer != null && m.write(this.fileMetadataBuffer), m.end();
                                return;
                            }
                            let L = t[C++];
                            if (L.kind === ji.OperationKind.COPY) {
                                h && h.beginFileCopy(), (0, ST.copyData)(L, m, n, a, () => p(C));
                                return;
                            }
                            let Pe = "bytes=".concat(L.start, "-").concat(L.end - 1);
                            (v.headers.range = Pe),
                                (N = (x = this.logger) === null || x === void 0 ? void 0 : x.debug) === null ||
                                    N === void 0 ||
                                    N.call(x, "download range: ".concat(Pe)),
                                h && h.beginRangeDownload();
                            let V = this.httpExecutor.createRequest(v, ce => {
                                ce.on("error", a),
                                    ce.on("aborted", () => {
                                        a(new Error("response has been aborted by the server"));
                                    }),
                                    ce.statusCode >= 400 && a((0, hn.createHttpError)(ce)),
                                    ce.pipe(m, { end: !1 }),
                                    ce.once("end", () => {
                                        h && h.endRangeDownload(), ++y === 100 ? ((y = 0), setTimeout(() => p(C), 1e3)) : p(C);
                                    });
                            });
                            V.on("redirect", (ce, E, R) => {
                                this.logger.info("Redirect to ".concat(CT(R))),
                                    (_ = R),
                                    (0, hn.configureRequestUrl)(new xT.URL(_), v),
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
    Wi.DifferentialDownloader = Sa;
    function ym(e, t = " KB") {
        return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
    }
    function CT(e) {
        let t = e.indexOf("?");
        return t < 0 ? e : e.substring(0, t);
    }
});
var _m = g(Gi => {
    "use strict";
    Object.defineProperty(Gi, "__esModule", { value: !0 });
    Gi.GenericDifferentialDownloader = void 0;
    var TT = xa(),
        Aa = class extends TT.DifferentialDownloader {
            download(t, r) {
                return this.doDownload(t, r);
            }
        };
    Gi.GenericDifferentialDownloader = Aa;
});
var Yi = g(Er => {
    "use strict";
    Object.defineProperty(Er, "__esModule", { value: !0 });
    Er.NoOpLogger = Er.AppUpdater = void 0;
    var Ae = le(),
        bT = require("crypto"),
        OT = require("os"),
        IT = require("events"),
        gr = Xe(),
        NT = ai(),
        Ca = ud(),
        kt = require("path"),
        Mt = Ls(),
        vm = Lp(),
        DT = kp(),
        Sm = Bp(),
        RT = ia(),
        wr = Bt(),
        Ta = um(),
        PT = require("zlib"),
        FT = mt(),
        qT = _m(),
        ba = class e extends IT.EventEmitter {
            get channel() {
                return this._channel;
            }
            set channel(t) {
                if (this._channel != null) {
                    if (typeof t != "string")
                        throw (0, Ae.newError)("Channel must be a string, but got: ".concat(t), "ERR_UPDATER_INVALID_CHANNEL");
                    if (t.length === 0)
                        throw (0, Ae.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
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
                    (this.configOnDisk = new Ca.Lazy(() => this.loadUpdateConfig()));
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
                    (this.stagingUserIdPromise = new Ca.Lazy(() => this.getOrCreateStagingUserId())),
                    (this.configOnDisk = new Ca.Lazy(() => this.loadUpdateConfig())),
                    (this.checkForUpdatesPromise = null),
                    (this.downloadPromise = null),
                    (this.updateInfoAndProvider = null),
                    (this._testOnlyOptions = null),
                    this.on("error", o => {
                        this._logger.error("Error: ".concat(o.stack || o.message));
                    }),
                    r == null
                        ? ((this.app = new DT.ElectronAppAdapter()),
                          (this.httpExecutor = new Sm.ElectronHttpExecutor((o, s) => this.emit("login", o, s))))
                        : ((this.app = r), (this.httpExecutor = null));
                let n = this.app.version,
                    i = (0, Mt.parse)(n);
                if (i == null)
                    throw (0, Ae.newError)(
                        'App version is not a valid semver version: "'.concat(n, '"'),
                        "ERR_UPDATER_INVALID_VERSION"
                    );
                (this.currentVersion = i),
                    (this.allowPrerelease = LT(i)),
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
                    ? (n = new RT.GenericProvider({ provider: "generic", url: t }, this, {
                          ...r,
                          isUseMultipleRangeRequest: (0, Ta.isUrlProbablySupportMultiRangeRequests)(t)
                      }))
                    : (n = (0, Ta.createClient)(t, this, r)),
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
                    s = Ae.UUID.parse(i).readUInt32BE(12) / 4294967295;
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
                    throw (0, Ae.newError)(
                        'This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "'.concat(
                            t.version,
                            '"'
                        ),
                        "ERR_UPDATER_INVALID_VERSION"
                    );
                let n = this.currentVersion;
                if ((0, Mt.eq)(r, n)) return !1;
                let i = t?.minimumSystemVersion,
                    o = (0, OT.release)();
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
                            (0, Ta.createClient)(n, this, this.createProviderRuntimeOptions())
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
                let n = new Ae.CancellationToken();
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
                        (0, Ae.asArray)(t.files)
                            .map(r => r.url)
                            .join(", "),
                        ")"
                    )
                ),
                    this.emit("update-available", t);
            }
            downloadUpdate(t = new Ae.CancellationToken()) {
                let r = this.updateInfoAndProvider;
                if (r == null) {
                    let i = new Error("Please check update first");
                    return this.dispatchError(i), Promise.reject(i);
                }
                if (this.downloadPromise != null)
                    return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
                this._logger.info(
                    "Downloading update from ".concat(
                        (0, Ae.asArray)(r.info.files)
                            .map(i => i.url)
                            .join(", ")
                    )
                );
                let n = i => {
                    if (!(i instanceof Ae.CancellationError))
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
                    (0, NT.load)(await (0, gr.readFile)(this._appUpdateConfigPath, "utf-8"))
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
                    if (Ae.UUID.check(n)) return n;
                    this._logger.warn("Staging user id file exists, but content was invalid: ".concat(n));
                } catch (n) {
                    n.code !== "ENOENT" && this._logger.warn("Couldn't read staging user ID, creating a blank one: ".concat(n));
                }
                let r = Ae.UUID.v5((0, bT.randomBytes)(4096), Ae.UUID.OID);
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
                        (t = new vm.DownloadedUpdateHelper(i)),
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
                this.listenerCount(wr.DOWNLOAD_PROGRESS) > 0 && (n.onProgress = x => this.emit(wr.DOWNLOAD_PROGRESS, x));
                let i = t.downloadUpdateOptions.updateInfoAndProvider.info,
                    o = i.version,
                    s = r.packageInfo;
                function a() {
                    let x = decodeURIComponent(t.fileInfo.url.pathname);
                    return x.endsWith(".".concat(t.fileExtension)) ? kt.basename(x) : t.fileInfo.info.url;
                }
                let l = await this.getOrCreateDownloadHelper(),
                    h = l.cacheDirForPendingUpdate;
                await (0, gr.mkdir)(h, { recursive: !0 });
                let c = a(),
                    f = kt.join(h, c),
                    m = s == null ? null : kt.join(h, "package-".concat(o).concat(kt.extname(s.path) || ".7z")),
                    p = async x => (
                        await l.setDownloadedFile(f, m, i, r, c, x),
                        await t.done({ ...i, downloadedFile: f }),
                        m == null ? [f] : [f, m]
                    ),
                    y = this._logger,
                    _ = await l.validateDownloadedPath(f, i, r, y);
                if (_ != null) return (f = _), await p(!1);
                let v = async () => (await l.clear().catch(() => {}), await (0, gr.unlink)(f).catch(() => {})),
                    C = await (0, vm.createTempUpdateFile)("temp-".concat(c), h, y);
                try {
                    await t.task(C, n, m, v),
                        await (0, Ae.retry)(
                            () => (0, gr.rename)(C, f),
                            60,
                            500,
                            0,
                            0,
                            x => x instanceof Error && /^EBUSY:/.test(x.message)
                        );
                } catch (x) {
                    throw (
                        (await v(),
                        x instanceof Ae.CancellationError && (y.info("cancelled"), this.emit("update-cancelled", i)),
                        x)
                    );
                }
                return y.info("New version ".concat(o, " has been downloaded to ").concat(f)), await p(!0);
            }
            async differentialDownloadInstaller(t, r, n, i, o) {
                try {
                    if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload) return !0;
                    let s = (0, FT.blockmapFiles)(t.url, this.app.version, r.updateInfoAndProvider.info.version);
                    this._logger.info('Download block maps (old: "'.concat(s[0], '", new: ').concat(s[1], ")"));
                    let a = async c => {
                            let f = await this.httpExecutor.downloadToBuffer(c, {
                                headers: r.requestHeaders,
                                cancellationToken: r.cancellationToken
                            });
                            if (f == null || f.length === 0) throw new Error('Blockmap "'.concat(c.href, '" is empty'));
                            try {
                                return JSON.parse((0, PT.gunzipSync)(f).toString());
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
                    return await new qT.GenericDifferentialDownloader(t.info, this.httpExecutor, l).download(h[0], h[1]), !1;
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
    Er.AppUpdater = ba;
    function LT(e) {
        let t = (0, Mt.prerelease)(e);
        return t != null && t.length > 0;
    }
    var Vi = class {
        info(t) {}
        warn(t) {}
        error(t) {}
    };
    Er.NoOpLogger = Vi;
});
var yr = g(zi => {
    "use strict";
    Object.defineProperty(zi, "__esModule", { value: !0 });
    zi.BaseUpdater = void 0;
    var xm = require("child_process"),
        UT = Yi(),
        Oa = class extends UT.AppUpdater {
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
                    (0, xm.spawnSync)(t, r, { env: { ...process.env, ...n }, encoding: "utf-8", shell: !0 }).stdout.trim()
                );
            }
            async spawnLog(t, r = [], n = void 0, i = "ignore") {
                return (
                    this._logger.info("Executing: ".concat(t, " with args: ").concat(r)),
                    new Promise((o, s) => {
                        try {
                            let a = { stdio: i, env: n, detached: !0 },
                                l = (0, xm.spawn)(t, r, a);
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
    zi.BaseUpdater = Oa;
});
var Na = g(Xi => {
    "use strict";
    Object.defineProperty(Xi, "__esModule", { value: !0 });
    Xi.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
    var _r = Xe(),
        $T = xa(),
        kT = require("zlib"),
        Ia = class extends $T.DifferentialDownloader {
            async download() {
                let t = this.blockAwareFileInfo,
                    r = t.size,
                    n = r - (t.blockMapSize + 4);
                this.fileMetadataBuffer = await this.readRemoteBytes(n, r - 1);
                let i = Am(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
                await this.doDownload(await MT(this.options.oldFile), i);
            }
        };
    Xi.FileWithEmbeddedBlockMapDifferentialDownloader = Ia;
    function Am(e) {
        return JSON.parse((0, kT.inflateRawSync)(e).toString());
    }
    async function MT(e) {
        let t = await (0, _r.open)(e, "r");
        try {
            let r = (await (0, _r.fstat)(t)).size,
                n = Buffer.allocUnsafe(4);
            await (0, _r.read)(t, n, 0, n.length, r - n.length);
            let i = Buffer.allocUnsafe(n.readUInt32BE(0));
            return await (0, _r.read)(t, i, 0, i.length, r - n.length - i.length), await (0, _r.close)(t), Am(i);
        } catch (r) {
            throw (await (0, _r.close)(t), r);
        }
    }
});
var Ra = g(Ki => {
    "use strict";
    Object.defineProperty(Ki, "__esModule", { value: !0 });
    Ki.AppImageUpdater = void 0;
    var Cm = le(),
        Tm = require("child_process"),
        BT = Xe(),
        HT = require("fs"),
        pn = require("path"),
        jT = yr(),
        WT = Na(),
        bm = Bt(),
        GT = Ue(),
        Da = class extends jT.BaseUpdater {
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
                    n = (0, GT.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "AppImage", ["rpm", "deb"]);
                return this.executeDownload({
                    fileExtension: "AppImage",
                    fileInfo: n,
                    downloadUpdateOptions: t,
                    task: async (i, o) => {
                        let s = process.env.APPIMAGE;
                        if (s == null) throw (0, Cm.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
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
                            this.listenerCount(bm.DOWNLOAD_PROGRESS) > 0 &&
                                (l.onProgress = h => this.emit(bm.DOWNLOAD_PROGRESS, h)),
                                await new WT.FileWithEmbeddedBlockMapDifferentialDownloader(
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
                        a && (await this.httpExecutor.download(n.url, i, o)), await (0, BT.chmod)(i, 493);
                    }
                });
            }
            doInstall(t) {
                let r = process.env.APPIMAGE;
                if (r == null) throw (0, Cm.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
                (0, HT.unlinkSync)(r);
                let n,
                    i = pn.basename(r);
                pn.basename(t.installerPath) === i || !/\d+\.\d+\.\d+/.test(i)
                    ? (n = r)
                    : (n = pn.join(pn.dirname(r), pn.basename(t.installerPath))),
                    (0, Tm.execFileSync)("mv", ["-f", t.installerPath, n]),
                    n !== r && this.emit("appimage-filename-updated", n);
                let o = { ...process.env, APPIMAGE_SILENT_INSTALL: "true" };
                return (
                    t.isForceRunAfter
                        ? this.spawnLog(n, [], o)
                        : ((o.APPIMAGE_EXIT_AFTER_INSTALL = "true"), (0, Tm.execFileSync)(n, [], { env: o })),
                    !0
                );
            }
        };
    Ki.AppImageUpdater = Da;
});
var Fa = g(Ji => {
    "use strict";
    Object.defineProperty(Ji, "__esModule", { value: !0 });
    Ji.DebUpdater = void 0;
    var VT = yr(),
        Om = Bt(),
        YT = Ue(),
        Pa = class extends VT.BaseUpdater {
            constructor(t, r) {
                super(t, r);
            }
            doDownloadUpdate(t) {
                let r = t.updateInfoAndProvider.provider,
                    n = (0, YT.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "deb", ["AppImage", "rpm"]);
                return this.executeDownload({
                    fileExtension: "deb",
                    fileInfo: n,
                    downloadUpdateOptions: t,
                    task: async (i, o) => {
                        this.listenerCount(Om.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = s => this.emit(Om.DOWNLOAD_PROGRESS, s)),
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
    Ji.DebUpdater = Pa;
});
var La = g(Qi => {
    "use strict";
    Object.defineProperty(Qi, "__esModule", { value: !0 });
    Qi.RpmUpdater = void 0;
    var zT = yr(),
        Im = Bt(),
        XT = Ue(),
        qa = class extends zT.BaseUpdater {
            constructor(t, r) {
                super(t, r);
            }
            doDownloadUpdate(t) {
                let r = t.updateInfoAndProvider.provider,
                    n = (0, XT.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "rpm", ["AppImage", "deb"]);
                return this.executeDownload({
                    fileExtension: "rpm",
                    fileInfo: n,
                    downloadUpdateOptions: t,
                    task: async (i, o) => {
                        this.listenerCount(Im.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = s => this.emit(Im.DOWNLOAD_PROGRESS, s)),
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
    Qi.RpmUpdater = qa;
});
var $a = g(Zi => {
    "use strict";
    Object.defineProperty(Zi, "__esModule", { value: !0 });
    Zi.MacUpdater = void 0;
    var Nm = le(),
        Dm = Xe(),
        Rm = require("fs"),
        Pm = require("path"),
        KT = require("http"),
        JT = Yi(),
        QT = Ue(),
        Fm = require("child_process"),
        qm = require("crypto"),
        Ua = class extends JT.AppUpdater {
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
                        (o = (0, Fm.execFileSync)("sysctl", [i], { encoding: "utf8" }).includes("".concat(i, ": 1"))),
                        n.info("Checked for macOS Rosetta environment (isRosetta=".concat(o, ")"));
                } catch (f) {
                    n.warn("sysctl shell command to check for macOS Rosetta environment failed: ".concat(f));
                }
                let s = !1;
                try {
                    this.debug("Checking for arm64 in uname");
                    let m = (0, Fm.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
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
                let l = (0, QT.findFile)(r, "zip", ["pkg", "dmg"]);
                if (l == null)
                    throw (0, Nm.newError)(
                        "ZIP file not provided: ".concat((0, Nm.safeStringifyJson)(r)),
                        "ERR_UPDATER_ZIP_FILE_NOT_FOUND"
                    );
                let h = t.updateInfoAndProvider.provider,
                    c = "update.zip";
                return this.executeDownload({
                    fileExtension: "zip",
                    fileInfo: l,
                    downloadUpdateOptions: t,
                    task: async (f, m) => {
                        let p = Pm.join(this.downloadedUpdateHelper.cacheDir, c),
                            y = () =>
                                (0, Dm.pathExistsSync)(p)
                                    ? !t.disableDifferentialDownload
                                    : (n.info(
                                          "Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"
                                      ),
                                      !1),
                            _ = !0;
                        y() && (_ = await this.differentialDownloadInstaller(l, t, f, h, c)),
                            _ && (await this.httpExecutor.download(l.url, f, m));
                    },
                    done: f => {
                        if (!t.disableDifferentialDownload)
                            try {
                                let m = Pm.join(this.downloadedUpdateHelper.cacheDir, c);
                                (0, Rm.copyFileSync)(f.downloadedFile, m);
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
                    o = (n = t.info.size) !== null && n !== void 0 ? n : (await (0, Dm.stat)(i)).size,
                    s = this._logger,
                    a = "fileToProxy=".concat(t.url.href);
                this.closeServerIfExists(),
                    this.debug("Creating proxy server for native Squirrel.Mac (".concat(a, ")")),
                    (this.server = (0, KT.createServer)()),
                    this.debug("Proxy server for native Squirrel.Mac is created (".concat(a, ")")),
                    this.server.on("close", () => {
                        s.info("Proxy server for native Squirrel.Mac is closed (".concat(a, ")"));
                    });
                let l = h => {
                    let c = h.address();
                    return typeof c == "string" ? c : "http://127.0.0.1:".concat(c?.port);
                };
                return await new Promise((h, c) => {
                    let f = (0, qm.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"),
                        m = Buffer.from("autoupdater:".concat(f), "ascii"),
                        p = "/".concat((0, qm.randomBytes)(64).toString("hex"), ".zip");
                    this.server.on("request", (y, _) => {
                        let v = y.url;
                        if ((s.info("".concat(v, " requested")), v === "/")) {
                            if (!y.headers.authorization || y.headers.authorization.indexOf("Basic ") === -1) {
                                (_.statusCode = 401),
                                    (_.statusMessage = "Invalid Authentication Credentials"),
                                    _.end(),
                                    s.warn("No authenthication info");
                                return;
                            }
                            let N = y.headers.authorization.split(" ")[1],
                                L = Buffer.from(N, "base64").toString("ascii"),
                                [Pe, V] = L.split(":");
                            if (Pe !== "autoupdater" || V !== f) {
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
                        let C = !1;
                        _.on("finish", () => {
                            C || (this.nativeUpdater.removeListener("error", c), h([]));
                        });
                        let x = (0, Rm.createReadStream)(i);
                        x.on("error", N => {
                            try {
                                _.end();
                            } catch (L) {
                                s.warn("cannot end response: ".concat(L));
                            }
                            (C = !0),
                                this.nativeUpdater.removeListener("error", c),
                                c(new Error('Cannot pipe "'.concat(i, '": ').concat(N)));
                        }),
                            _.writeHead(200, { "Content-Type": "application/zip", "Content-Length": o }),
                            x.pipe(_);
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
    Zi.MacUpdater = Ua;
});
var km = g(Ma => {
    "use strict";
    Object.defineProperty(Ma, "__esModule", { value: !0 });
    Ma.verifySignature = eb;
    var Lm = le(),
        $m = require("child_process"),
        ZT = require("os"),
        Um = require("path");
    function eb(e, t, r) {
        return new Promise((n, i) => {
            let o = t.replace(/'/g, "''");
            r.info("Verifying signature ".concat(o)),
                (0, $m.execFile)(
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
                                ka(r, s, l, i), n(null);
                                return;
                            }
                            let c = tb(a);
                            if (c.Status === 0) {
                                try {
                                    let y = Um.normalize(c.Path),
                                        _ = Um.normalize(t);
                                    if ((r.info("LiteralPath: ".concat(y, ". Update Path: ").concat(_)), y !== _)) {
                                        ka(r, new Error("LiteralPath of ".concat(y, " is different than ").concat(_)), l, i),
                                            n(null);
                                        return;
                                    }
                                } catch (y) {
                                    r.warn(
                                        "Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ".concat(
                                            (h = y.message) !== null && h !== void 0 ? h : y.stack
                                        )
                                    );
                                }
                                let m = (0, Lm.parseDn)(c.SignerCertificate.Subject),
                                    p = !1;
                                for (let y of e) {
                                    let _ = (0, Lm.parseDn)(y);
                                    if (
                                        (_.size
                                            ? (p = Array.from(_.keys()).every(C => _.get(C) === m.get(C)))
                                            : y === m.get("CN") &&
                                              (r.warn(
                                                  "Signature validated using only CN ".concat(
                                                      y,
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
                            ka(r, c, null, i), n(null);
                            return;
                        }
                    }
                );
        });
    }
    function tb(e) {
        let t = JSON.parse(e);
        delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
        let r = t.SignerCertificate;
        return (
            r != null && (delete r.Archived, delete r.Extensions, delete r.Handle, delete r.HasPrivateKey, delete r.SubjectName),
            t
        );
    }
    function ka(e, t, r, n) {
        if (rb()) {
            e.warn(
                "Cannot execute Get-AuthenticodeSignature: ".concat(
                    t || r,
                    ". Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher."
                )
            );
            return;
        }
        try {
            (0, $m.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], {
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
    function rb() {
        let e = ZT.release();
        return e.startsWith("6.") && !e.startsWith("6.3");
    }
});
var Ha = g(to => {
    "use strict";
    Object.defineProperty(to, "__esModule", { value: !0 });
    to.NsisUpdater = void 0;
    var eo = le(),
        Mm = require("path"),
        nb = yr(),
        ib = Na(),
        Bm = Bt(),
        ob = Ue(),
        sb = Xe(),
        ab = km(),
        Hm = require("url"),
        Ba = class extends nb.BaseUpdater {
            constructor(t, r) {
                super(t, r), (this._verifyUpdateCodeSignature = (n, i) => (0, ab.verifySignature)(n, i, this._logger));
            }
            get verifyUpdateCodeSignature() {
                return this._verifyUpdateCodeSignature;
            }
            set verifyUpdateCodeSignature(t) {
                t && (this._verifyUpdateCodeSignature = t);
            }
            doDownloadUpdate(t) {
                let r = t.updateInfoAndProvider.provider,
                    n = (0, ob.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "exe");
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
                                await this.httpExecutor.download(new Hm.URL(l.path), s, {
                                    headers: t.requestHeaders,
                                    cancellationToken: t.cancellationToken,
                                    sha512: l.sha512
                                });
                            } catch (f) {
                                try {
                                    await (0, sb.unlink)(s);
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
                    this.spawnLog(Mm.join(process.resourcesPath, "elevate.exe"), [t.installerPath].concat(r)).catch(o =>
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
                        newUrl: new Hm.URL(r.path),
                        oldFile: Mm.join(this.downloadedUpdateHelper.cacheDir, eo.CURRENT_APP_PACKAGE_FILE_NAME),
                        logger: this._logger,
                        newFile: n,
                        requestHeaders: this.requestHeaders,
                        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
                        cancellationToken: t.cancellationToken
                    };
                    this.listenerCount(Bm.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = s => this.emit(Bm.DOWNLOAD_PROGRESS, s)),
                        await new ib.FileWithEmbeddedBlockMapDifferentialDownloader(r, this.httpExecutor, o).download();
                } catch (o) {
                    return (
                        this._logger.error("Cannot download differentially, fallback to full download: ".concat(o.stack || o)),
                        process.platform === "win32"
                    );
                }
                return !1;
            }
        };
    to.NsisUpdater = Ba;
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
    var lb = le();
    Object.defineProperty(M, "CancellationToken", {
        enumerable: !0,
        get: function () {
            return lb.CancellationToken;
        }
    });
    var jm = Xe(),
        ub = require("path"),
        cb = yr();
    Object.defineProperty(M, "BaseUpdater", {
        enumerable: !0,
        get: function () {
            return cb.BaseUpdater;
        }
    });
    var Wm = Yi();
    Object.defineProperty(M, "AppUpdater", {
        enumerable: !0,
        get: function () {
            return Wm.AppUpdater;
        }
    });
    Object.defineProperty(M, "NoOpLogger", {
        enumerable: !0,
        get: function () {
            return Wm.NoOpLogger;
        }
    });
    var fb = Ue();
    Object.defineProperty(M, "Provider", {
        enumerable: !0,
        get: function () {
            return fb.Provider;
        }
    });
    var db = Ra();
    Object.defineProperty(M, "AppImageUpdater", {
        enumerable: !0,
        get: function () {
            return db.AppImageUpdater;
        }
    });
    var hb = Fa();
    Object.defineProperty(M, "DebUpdater", {
        enumerable: !0,
        get: function () {
            return hb.DebUpdater;
        }
    });
    var pb = La();
    Object.defineProperty(M, "RpmUpdater", {
        enumerable: !0,
        get: function () {
            return pb.RpmUpdater;
        }
    });
    var mb = $a();
    Object.defineProperty(M, "MacUpdater", {
        enumerable: !0,
        get: function () {
            return mb.MacUpdater;
        }
    });
    var gb = Ha();
    Object.defineProperty(M, "NsisUpdater", {
        enumerable: !0,
        get: function () {
            return gb.NsisUpdater;
        }
    });
    var yt;
    function wb() {
        if (process.platform === "win32") yt = new (Ha().NsisUpdater)();
        else if (process.platform === "darwin") yt = new ($a().MacUpdater)();
        else {
            yt = new (Ra().AppImageUpdater)();
            try {
                let e = ub.join(process.resourcesPath, "package-type");
                if (!(0, jm.existsSync)(e)) return yt;
                console.info("Checking for beta autoupdate feature for deb/rpm distributions");
                let t = (0, jm.readFileSync)(e).toString().trim();
                switch ((console.info("Found package-type:", t), t)) {
                    case "deb":
                        yt = new (Fa().DebUpdater)();
                        break;
                    case "rpm":
                        yt = new (La().RpmUpdater)();
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
        return yt;
    }
    Object.defineProperty(M, "autoUpdater", { enumerable: !0, get: () => yt || wb() });
    M.DOWNLOAD_PROGRESS = "download-progress";
    M.UPDATE_DOWNLOADED = "update-downloaded";
    var ja = class {
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
    M.UpdaterSignal = ja;
    var Eb = !1;
    function ro(e, t, r) {
        Eb
            ? e.on(t, (...n) => {
                  console.log("%s %s", t, n), r(...n);
              })
            : e.on(t, r);
    }
});
var no = g((GN, Gm) => {
    var mn;
    Gm.exports = ((mn = class {}), O(mn, "WINDOWS", "win32"), O(mn, "MACOS", "darwin"), O(mn, "LINUX", "linux"), mn);
});
var _t = g((zN, Vm) => {
    Vm.exports = class {
        constructor(t) {
            O(this, "_socialdetox");
            this._socialdetox = t;
        }
    };
});
var Xm = g((JN, zm) => {
    var Ym = require("path"),
        yb = _t();
    zm.exports = class extends yb {
        start() {
            this._socialdetox
                .mainWindow()
                .loadFile(Ym.join(this._socialdetox.rootPath, "res", "index.html"), { extraHeaders: "pragma: no-cache" }),
                this._socialdetox
                    .loginWindow()
                    .loadFile(Ym.join(this._socialdetox.rootPath, "res", "index.html"), { extraHeaders: "pragma: no-cache" }),
                this._socialdetox.getFramed()
                    ? (this._socialdetox.mainWindow().show(), this._socialdetox.loginWindow().hide())
                    : (this._socialdetox.loginWindow().show(), this._socialdetox.mainWindow().hide());
        }
    };
});
var Jm = g((ZN, Km) => {
    var _b = _t();
    Km.exports = class extends _b {
        getMainMinWidth() {
            return 1024;
        }
        getMainMinHeight() {
            return 768;
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
var eg = g((tD, Zm) => {
    var vb = _t(),
        Qm = require("fs");
    Zm.exports = class extends vb {
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
            return n && (r = this._socialdetox.utils.parseJSON(n)), r;
        }
        readFile(t) {
            let r = null;
            try {
                let n = Qm.readFileSync(t);
                r = Buffer.isBuffer(n) ? n.toString() : n;
            } catch (n) {
                this._socialdetox.log.error("file:readFile", t, n);
            }
            return r;
        }
    };
});
var rg = g((nD, tg) => {
    var Sb = _t();
    tg.exports = class extends Sb {
        error() {
            console.error("%csocialdetox-error", "color:red", ...arguments);
        }
        info() {
            console.info("%csocialdetox-info", "color:lightblue", ...arguments);
        }
    };
});
var ig = g((oD, ng) => {
    var xb = _t(),
        Ab = require("querystring");
    ng.exports = class extends xb {
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
                    this._socialdetox.log.error("utils:parseJSON", n);
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
                    this._socialdetox.log.error("utils:formatJSON", i);
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
                r = t.query ? n + "?" + Ab.stringify(t.query) : n;
            } while (!1);
            return r;
        }
    };
});
var sg = g((aD, og) => {
    var Cb = _t(),
        Wa = require("fs"),
        Ga = require("path"),
        Tb = require("http"),
        Va;
    og.exports =
        ((Va = class extends Cb {
            start() {
                if (this.constructor._instance === null) {
                    let t = Ga.join(this._socialdetox.rootPath, "ssg"),
                        r = this._socialdetox.config.getPort();
                    this.constructor._instance = new Promise((n, i) => {
                        if (this._socialdetox.devMode) {
                            n(null);
                            return;
                        }
                        try {
                            let o = Tb.createServer((s, a) => {
                                let l = Ga.join(t, s.url === "/" ? "/index.html" : s.url);
                                Wa.access(l, Wa.constants.F_OK, h => {
                                    h
                                        ? (a.writeHead(404, { "Content-Type": "text/plain" }), a.end("404 Not Found"))
                                        : Wa.readFile(l, (c, f) => {
                                              if (c)
                                                  a.writeHead(500, { "Content-Type": "text/plain" }),
                                                      a.end("500 Internal Server Error");
                                              else {
                                                  let m = Ga.extname(l),
                                                      p =
                                                          {
                                                              ".html": "text/html",
                                                              ".css": "text/css",
                                                              ".js": "text/javascript",
                                                              ".jpg": "image/jpeg",
                                                              ".png": "image/png",
                                                              ".gif": "image/gif",
                                                              ".svg": "image/svg+xml"
                                                          }[m] || "application/octet-stream";
                                                  a.writeHead(200, { "Content-Type": p }), a.end(f);
                                              }
                                          });
                                });
                            });
                            o.listen(r, () => {
                                this._socialdetox.log.info("webserver:start", "Listening on port ".concat(r)), n(o);
                            });
                        } catch (o) {
                            this._socialdetox.log.error("webserver:start", o), i(o);
                        }
                    });
                }
                return this.constructor._instance;
            }
        }),
        O(Va, "_instance", null),
        Va);
});
var gn = g((cD, ag) => {
    var bb = _t(),
        { ipcMain: Ob } = require("electron");
    ag.exports = class extends bb {
        constructor(t) {
            super(t);
        }
        _register(t) {
            if (typeof t == "string")
                for (let r of Object.getOwnPropertyNames(this)) {
                    if (["_", "#"].includes(r[0] || typeof this[r] != "function")) continue;
                    let n = this[r];
                    Ob.handle("main:".concat(t, ":").concat(r), async (i, ...o) => {
                        let s = null;
                        try {
                            s = typeof n == "function" ? await n(...o) : null;
                        } catch (a) {
                            this._socialdetox.devMode && console.debug(a), (s = a);
                        }
                        return s;
                    });
                }
        }
    };
});
var cg = g((dD, ug) => {
    var { execSync: Ya } = require("child_process"),
        Ib = gn(),
        we = no(),
        vr,
        Sr,
        xr,
        vt,
        lg;
    ug.exports =
        ((lg = class extends Ib {
            constructor(r) {
                super(r);
                Q(this, vr);
                Q(this, Sr);
                Q(this, xr);
                Q(this, vt);
                O(this, "getOS", () => {
                    if (typeof A(this, vt) > "u")
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
                    return A(this, vt);
                });
                O(this, "getName", () => {
                    if (typeof A(this, Sr) > "u") {
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
                                te(this, Sr, n.replace(/[\r\n\s]+/g, "").toLowerCase());
                            } catch (n) {
                                this._socialdetox.devMode && console.warn("Device Name", "".concat(n));
                            }
                    }
                    return A(this, Sr);
                });
                O(this, "getUUID", () => {
                    if (typeof A(this, vr) > "u") {
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
                                this._socialdetox.devMode && console.warn("Device UUID", "".concat(i));
                            }
                    }
                    return A(this, vr);
                });
                O(this, "getSerialNumber", () => {
                    if (typeof A(this, xr) > "u") {
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
                                te(this, xr, n.replace(/[\r\n\s]+/g, "").toLowerCase());
                            } catch (n) {
                                this._socialdetox.devMode && console.warn("Device Serial Number", "".concat(n));
                            }
                    }
                    return A(this, xr);
                });
                O(this, "setFramed", r => this._socialdetox.setFramed(!!r));
                O(this, "getFramed", () => this._socialdetox.getFramed());
                this._register("device");
            }
        }),
        (vr = new WeakMap()),
        (Sr = new WeakMap()),
        (xr = new WeakMap()),
        (vt = new WeakMap()),
        lg);
});
var wn = g((pD, fg) => {
    var tt;
    fg.exports =
        ((tt = class {
            static getTargetChannelName(t) {
                return "".concat(tt.WINDOW_TARGET, "/").concat(t);
            }
        }),
        O(tt, "WINDOW_MAIN", "@main"),
        O(tt, "WINDOW_LOGIN", "@login"),
        O(tt, "WINDOW_TARGET", "@target"),
        tt);
});
var mg = g((wD, pg) => {
    var { ipcMain: dg, BrowserView: Ar } = require("electron"),
        hg = require("path"),
        za = no(),
        Nb = gn(),
        Db = wn(),
        En,
        yn,
        _n,
        vn,
        k,
        Ge,
        Ve,
        Ht;
    pg.exports =
        ((En = class extends Nb {
            constructor(r) {
                super(r);
                Q(this, yn);
                Q(this, _n);
                Q(this, vn, "");
                Q(this, k, {});
                Q(this, Ge, {});
                Q(this, Ve, "");
                O(this, "setWindowSize", (r, n) => {
                    te(this, yn, r), te(this, _n, n), A(this, Ht).call(this);
                });
                O(this, "list", () => Object.keys(A(this, k)));
                O(this, "removeAll", () => {
                    let r = Object.keys(A(this, k)).length > 0;
                    for (let n of Object.keys(A(this, k))) this.remove(n);
                    return r;
                });
                O(this, "add", (r, n, i = !1) => {
                    if (typeof r != "string" || !r.length) throw new Error("Invalid target ID");
                    if (typeof n != "string" || !n.match(/^https?:\/\//gi)) throw new Error("Invalid target URL");
                    if (A(this, k)[r] instanceof Ar) return !1;
                    let o = new Ar({
                        width: this._socialdetox.config.getMainMinWidth() - this.constructor.MARGIN_LEFT,
                        height:
                            this._socialdetox.config.getMainMinHeight() -
                            (this.constructor.MARGIN_TOP + this.constructor.MARGIN_BOTTOM),
                        resizable: !1,
                        backgroundColor: "#333",
                        transparent: !0,
                        webPreferences: {
                            backgroundThrottling: !1,
                            imageAnimationPolicy: "noAnimation",
                            spellcheck: !1,
                            preload: hg.join(this._socialdetox.rootPath, "lib/preloader/entry/target.js"),
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
                        o.webContents.setUserAgent(A(this, vn)),
                        o.webContents.setZoomLevel(0),
                        o.webContents.setAudioMuted(!0),
                        o.webContents.loadFile(hg.join(this._socialdetox.rootPath, "res", "index.html"), {
                            extraHeaders: "pragma: no-cache"
                        }),
                        o.webContents.on("context-menu", (a, l) => {
                            a.preventDefault(), o.webContents.openDevTools({ mode: "detach" });
                        }),
                        this._socialdetox.mainWindow().addBrowserView(o),
                        this._socialdetox.main.view instanceof Ar &&
                            (this._socialdetox.mainWindow().removeBrowserView(this._socialdetox.main.view),
                            this._socialdetox.mainWindow().addBrowserView(this._socialdetox.main.view)),
                        (A(this, k)[r] = o);
                    let s = Db.getTargetChannelName(r);
                    return (
                        (A(this, Ge)[r] = {
                            channel: s,
                            listener: (a, ...l) => {
                                this._socialdetox.devMode && console.log("\u{1F3AF} ".concat(s), JSON.stringify(l)),
                                    l.length >= 3 && o.webContents.send(s, l);
                            }
                        }),
                        dg.on(A(this, Ge)[r].channel, A(this, Ge)[r].listener),
                        i ? this.select(r) : A(this, Ht).call(this),
                        !0
                    );
                });
                O(this, "remove", r => {
                    if (typeof r != "string" || !r.length) throw new Error("Invalid target ID");
                    if (!(A(this, k)[r] instanceof Ar) || typeof A(this, Ge)[r] > "u") return !1;
                    dg.off(A(this, Ge)[r].channel, A(this, Ge)[r].listener), delete A(this, Ge)[r];
                    try {
                        this._socialdetox.mainWindow().removeBrowserView(A(this, k)[r]);
                    } catch {}
                    try {
                        A(this, k)[r].webContents.destroy();
                    } catch {}
                    return delete A(this, k)[r], r === A(this, Ve) && te(this, Ve, ""), A(this, Ht).call(this), !0;
                });
                O(this, "select", r => {
                    if (typeof r != "string" || !r.length) throw new Error("Invalid target ID");
                    if (A(this, k)[r] instanceof Ar && A(this, Ve) !== r) {
                        te(this, Ve, r),
                            A(this, k)[r].metadata.loaded ||
                                ((A(this, k)[r].metadata.loaded = !0),
                                A(this, k)[r].webContents.loadURL(A(this, k)[r].metadata.targetUrl));
                        let n = {};
                        for (let i of Object.keys(A(this, k)).filter(o => o !== r)) n[i] = A(this, k)[i];
                        return (
                            (n[r] = A(this, k)[r]),
                            te(this, k, n),
                            this._socialdetox.mainWindow().removeBrowserView(A(this, k)[r]),
                            this._socialdetox.mainWindow().removeBrowserView(this._socialdetox.main.view),
                            this._socialdetox.main.onTop
                                ? (this._socialdetox.mainWindow().addBrowserView(A(this, k)[r]),
                                  this._socialdetox.mainWindow().addBrowserView(this._socialdetox.main.view),
                                  this._socialdetox.main.view.webContents.focus())
                                : (this._socialdetox.mainWindow().addBrowserView(this._socialdetox.main.view),
                                  this._socialdetox.mainWindow().addBrowserView(A(this, k)[r]),
                                  A(this, k)[r].webContents.focus()),
                            A(this, Ht).call(this),
                            !0
                        );
                    }
                    return !1;
                });
                O(this, "getSelected", () => A(this, Ve));
                O(this, "getTargets", () => A(this, k));
                O(this, "webContents", async (r, n, i) => {
                    if (
                        (this._socialdetox.devMode &&
                            console.log("ipc.target.webContents", JSON.stringify({ targetId: r, methodName: n, methodArgs: i })),
                        typeof r != "string" || !r.length)
                    )
                        throw new Error("Invalid target ID");
                    if (!(A(this, k)[r] instanceof Ar)) throw new Error("Invalid target ID");
                    if (typeof n != "string" || typeof A(this, k)[r].webContents[n] != "function")
                        throw new Error("Invalid target webContents method: ".concat(n));
                    return (
                        n === "loadURL" && (A(this, k)[r].metadata.loaded = !0),
                        Array.isArray(i) || (i = []),
                        await A(this, k)[r].webContents[n](...i)
                    );
                });
                Q(this, Ht, () => {
                    if (!Object.keys(A(this, k)).length) return;
                    let r = A(this, yn) - this.constructor.MARGIN_LEFT,
                        n = A(this, _n) - (this.constructor.MARGIN_TOP + this.constructor.MARGIN_BOTTOM);
                    for (let i of Object.keys(A(this, k))) {
                        let o = i === A(this, Ve) ? this.constructor.MARGIN_LEFT : 100 - r,
                            s = i === A(this, Ve) ? this.constructor.MARGIN_TOP : 50 - n;
                        A(this, k)[i].setBounds({ x: o, y: s, width: r, height: n });
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
        (yn = new WeakMap()),
        (_n = new WeakMap()),
        (vn = new WeakMap()),
        (k = new WeakMap()),
        (Ge = new WeakMap()),
        (Ve = new WeakMap()),
        (Ht = new WeakMap()),
        O(En, "MARGIN_LEFT", 300),
        O(En, "MARGIN_TOP", 50),
        O(En, "MARGIN_BOTTOM", 50),
        En);
});
var Eg = g((_D, wg) => {
    var { session: Rb, shell: Pb, ipcMain: Fb, BrowserView: Xa } = require("electron"),
        qb = require("path"),
        Lb = gn(),
        Ka = wn(),
        io,
        gg;
    wg.exports =
        ((gg = class extends Lb {
            constructor(r) {
                super(r);
                O(this, "windowWidth");
                O(this, "windowHeight");
                O(this, "view", null);
                O(this, "darkMode", !0);
                Q(this, io, () =>
                    this.view instanceof Xa
                        ? (this.view.setBounds({ x: 0, y: 0, width: this.windowWidth, height: this.windowHeight }), !0)
                        : !1
                );
                O(this, "init", () => {
                    if (this.view instanceof Xa) return !1;
                    (this.windowWidth = this._socialdetox.config.getLoginWidth()),
                        (this.windowHeight = this._socialdetox.config.getLoginHeight());
                    let r = new Xa({
                        width: this.windowWidth,
                        height: this.windowHeight,
                        resizable: !1,
                        backgroundColor: "#00000000",
                        transparent: !0,
                        webPreferences: {
                            backgroundThrottling: !1,
                            imageAnimationPolicy: "noAnimation",
                            spellcheck: !1,
                            preload: qb.join(this._socialdetox.rootPath, "lib/preloader/entry/login.js"),
                            nodeIntegration: !0,
                            devTools: this._socialdetox.devMode,
                            session: Rb.defaultSession,
                            cache: !1,
                            webSecurity: !1,
                            allowRunningInsecureContent: !0
                        }
                    });
                    return (
                        r.webContents.on("ready-to-show", () => r.webContents.setZoomFactor(1)),
                        r.webContents.setZoomLevel(0),
                        r.webContents.setAudioMuted(!1),
                        r.webContents.loadURL("http://localhost:".concat(this._socialdetox.config.getPort(), "/profile/")),
                        r.webContents.on("dom-ready", () => r.webContents.focus()),
                        this._socialdetox.devMode &&
                            r.webContents.on("context-menu", (n, i) => {
                                n.preventDefault(), r.webContents.openDevTools({ mode: "detach" });
                            }),
                        (this.view = r),
                        Fb.on(Ka.WINDOW_LOGIN, (n, ...i) => {
                            this._socialdetox.devMode && console.log("\u{1F3E0} ".concat(Ka.WINDOW_LOGIN), JSON.stringify(i)),
                                i.length >= 3 && r.webContents.send(Ka.WINDOW_LOGIN, i);
                        }),
                        this._socialdetox.loginWindow().addBrowserView(r),
                        A(this, io).call(this),
                        !0
                    );
                });
                O(this, "openExternal", r => {
                    typeof r == "string" && Pb.openExternal(r);
                });
                this._register("login");
            }
        }),
        (io = new WeakMap()),
        gg);
});
var vg = g((xD, _g) => {
    var { session: Ub, shell: $b, ipcMain: kb, BrowserView: oo } = require("electron"),
        Mb = require("path"),
        Bb = gn(),
        Ja = wn(),
        Cr,
        yg;
    _g.exports =
        ((yg = class extends Bb {
            constructor(r) {
                super(r);
                O(this, "windowWidth");
                O(this, "windowHeight");
                O(this, "view", null);
                O(this, "onTop", !1);
                O(this, "darkMode", !0);
                Q(this, Cr, () =>
                    this.view instanceof oo
                        ? (this.view.setBounds({ x: 0, y: 0, width: this.windowWidth, height: this.windowHeight }), !0)
                        : !1
                );
                O(this, "init", () => {
                    if (this.view instanceof oo) return !1;
                    (this.windowWidth = this._socialdetox.config.getMainMinWidth()),
                        (this.windowHeight = this._socialdetox.config.getMainMinHeight());
                    let r = new oo({
                        width: this.windowWidth,
                        height: this.windowHeight,
                        resizable: !1,
                        backgroundColor: "#00000000",
                        transparent: !0,
                        webPreferences: {
                            backgroundThrottling: !1,
                            imageAnimationPolicy: "noAnimation",
                            spellcheck: !1,
                            preload: Mb.join(this._socialdetox.rootPath, "lib/preloader/entry/main.js"),
                            nodeIntegration: !0,
                            devTools: this._socialdetox.devMode,
                            session: Ub.defaultSession,
                            cache: !1,
                            webSecurity: !1,
                            allowRunningInsecureContent: !0
                        }
                    });
                    return (
                        r.webContents.on("ready-to-show", () => r.webContents.setZoomFactor(1)),
                        r.webContents.setZoomLevel(0),
                        r.webContents.setAudioMuted(!1),
                        r.webContents.loadURL("http://localhost:".concat(this._socialdetox.config.getPort())),
                        r.webContents.on("dom-ready", () => r.webContents.focus()),
                        this._socialdetox.devMode &&
                            r.webContents.on("context-menu", (n, i) => {
                                n.preventDefault(), r.webContents.openDevTools({ mode: "detach" });
                            }),
                        (this.view = r),
                        kb.on(Ja.WINDOW_MAIN, (n, ...i) => {
                            this._socialdetox.devMode && console.log("\u{1F3E0} ".concat(Ja.WINDOW_MAIN), JSON.stringify(i)),
                                i.length >= 3 && r.webContents.send(Ja.WINDOW_MAIN, i);
                        }),
                        this._socialdetox.mainWindow().addBrowserView(r),
                        A(this, Cr).call(this),
                        !0
                    );
                });
                O(this, "setWindowSize", (r, n) => {
                    (this.windowWidth = r), (this.windowHeight = n), A(this, Cr).call(this);
                });
                O(this, "setOnTop", r => {
                    let n = !1;
                    if (((r = !!r), this.getOnTop() !== r)) {
                        if (((this.onTop = r), this.onTop))
                            this._socialdetox.mainWindow().removeBrowserView(this.view),
                                this._socialdetox.mainWindow().addBrowserView(this.view),
                                this.view?.webContents?.focus();
                        else {
                            let i = this._socialdetox.target.getSelected();
                            if (typeof i == "string" && i.length) {
                                let o = this._socialdetox.target.getTargets()[i];
                                o instanceof oo &&
                                    (this._socialdetox.mainWindow().removeBrowserView(o),
                                    this._socialdetox.mainWindow().removeBrowserView(this.view),
                                    this._socialdetox.mainWindow().addBrowserView(this.view),
                                    this._socialdetox.mainWindow().addBrowserView(o),
                                    o.webContents.focus());
                            }
                        }
                        A(this, Cr).call(this), (n = !0);
                    }
                    return n;
                });
                O(this, "getOnTop", () => this.onTop);
                O(this, "setDarkMode", r => {
                    let n = !1;
                    return (
                        (r = !!r),
                        this.getDarkMode() !== r &&
                            ((this.darkMode = r),
                            this._socialdetox.mainWindow().setBackgroundColor(r ? "#333" : "#fff"),
                            (n = !0)),
                        n
                    );
                });
                O(this, "getDarkMode", () => this.darkMode);
                O(this, "openExternal", r => {
                    typeof r == "string" && $b.openExternal(r);
                });
                this._register("main");
            }
        }),
        (Cr = new WeakMap()),
        yg);
});
var Og = g((TD, bg) => {
    var { app: Qa, session: Sg, BrowserWindow: xg } = require("electron"),
        Ag = require("path"),
        Za = no(),
        Hb = Xm(),
        jb = Jm(),
        Wb = eg(),
        Gb = rg(),
        Vb = ig(),
        Yb = sg(),
        zb = cg(),
        Xb = mg(),
        Kb = Eg(),
        Jb = vg(),
        Cg = wn(),
        Z,
        Sn,
        xn,
        Be,
        Tg;
    bg.exports =
        ((Tg = class {
            constructor() {
                Q(this, Z, null);
                Q(this, Sn, null);
                Q(this, xn, !1);
                Q(this, Be, null);
                O(this, "rootPath", Qa.getAppPath());
                O(this, "devMode", !1);
                O(this, "log", new Gb(this));
                O(this, "webserver", new Yb(this));
                O(this, "activity", new Hb(this));
                O(this, "device", new zb(this));
                O(this, "target", new Xb(this));
                O(this, "main", new Jb(this));
                O(this, "login", new Kb(this));
                O(this, "config", new jb(this));
                O(this, "file", new Wb(this));
                O(this, "utils", new Vb(this));
            }
            mainWindow() {
                let t = this;
                if (A(t, Z) === null) {
                    te(
                        t,
                        Z,
                        new xg({
                            minWidth: t.config.getMainMinWidth(),
                            minHeight: t.config.getMainMinHeight(),
                            width: t.config.getMainMinWidth(),
                            height: t.config.getMainMinHeight(),
                            icon: Ag.join(t.rootPath, "res/icons/icon.png"),
                            resizable: !0,
                            fullscreenable: !1,
                            titleBarStyle: "default",
                            title: "SocialDetox",
                            useContentSize: !0,
                            backgroundColor: "#000",
                            webPreferences: { spellcheck: !1, nodeIntegration: !0, session: Sg.defaultSession }
                        })
                    ),
                        A(t, Z).setMaxListeners(0),
                        A(t, Z).on("closed", () => {
                            te(t, Z, null), Qa.quit();
                        });
                    let r = () => {
                        let n = A(t, Z).getSize(),
                            i = [Za.WINDOWS, Za.MACOS].includes(process.platform)
                                ? Math.abs(A(t, Z).getSize()[1] - A(t, Z).getContentSize()[1])
                                : 0,
                            o = [Za.WINDOWS].includes(process.platform)
                                ? Math.abs(A(t, Z).getSize()[0] - A(t, Z).getContentSize()[0])
                                : 0;
                        t.main.setWindowSize(n[0] - o, n[1] - i), t.target.setWindowSize(n[0] - o, n[1] - i);
                    };
                    A(t, Z).on("resize", () => r()),
                        A(t, Z).once("ready-to-show", () => r()),
                        t.main.init(),
                        t.main.view.webContents.on("did-finish-load", () => {
                            t.getFramed() && A(t, Z).show(), r();
                        }),
                        A(t, Z).setMenu(null),
                        te(
                            t,
                            Sn,
                            setInterval(() => {
                                if (A(t, Z) === null) {
                                    clearInterval(A(t, Sn));
                                    return;
                                }
                                let n = A(t, Z).getSize();
                                A(t, Z).setSize(n[0] + 1, n[1]), setTimeout(() => A(t, Z).setSize(n[0], n[1]), 250);
                            }, 9e4)
                        );
                }
                return A(t, Z);
            }
            loginWindow() {
                let t = this;
                return (
                    A(t, Be) === null &&
                        (te(
                            t,
                            Be,
                            new xg({
                                width: t.config.getLoginWidth(),
                                height: t.config.getLoginHeight(),
                                icon: Ag.join(t.rootPath, "res/icons/icon.png"),
                                resizable: !1,
                                fullscreenable: !1,
                                transparent: !0,
                                titleBarStyle: "hidden",
                                title: "SocialDetox",
                                backgroundColor: "#00000000",
                                webPreferences: { spellcheck: !1, nodeIntegration: !0, session: Sg.defaultSession }
                            })
                        ),
                        A(t, Be).setMaxListeners(0),
                        A(t, Be).on("closed", () => {
                            te(t, Be, null), Qa.quit();
                        }),
                        t.login.init(),
                        t.login.view.webContents.on("did-finish-load", () => {
                            t.getFramed() || A(t, Be).show();
                        }),
                        A(t, Be).setMenu(null)),
                    A(t, Be)
                );
            }
            getFramed() {
                return A(this, xn);
            }
            setFramed(t) {
                let r = !1;
                return (
                    (t = !!t),
                    t !== this.getFramed() &&
                        (te(this, xn, t),
                        t
                            ? (this.main?.view.webContents.send(Cg.WINDOW_MAIN, ["frameChanged", [t], { type: "req" }]),
                              this.loginWindow().hide(),
                              this.mainWindow().show())
                            : (this.login?.view.webContents.send(Cg.WINDOW_LOGIN, ["frameChanged", [t], { type: "req" }]),
                              this.loginWindow().show(),
                              this.mainWindow().hide()),
                        (r = !0)),
                    r
                );
            }
        }),
        (Z = new WeakMap()),
        (Sn = new WeakMap()),
        (xn = new WeakMap()),
        (Be = new WeakMap()),
        Tg);
});
var { app: Ye, BrowserWindow: Qb } = require("electron"),
    { autoUpdater: el } = Bt(),
    Zb = Og();
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
            ($e.getFramed()
                ? ($e.mainWindow().isMinimized() && $e.mainWindow().restore(), $e.mainWindow().show())
                : ($e.loginWindow().isMinimized() && $e.loginWindow().restore(), $e.loginWindow().show()));
    }),
        Ye.on("ready", async () => {
            ($e = new Zb()),
                await $e.webserver.start(),
                $e.activity.start(),
                Ye.on("activate", () => {
                    Qb.getAllWindows().length === 0 && $e.activity.main();
                }),
                el.checkForUpdatesAndNotify();
        }),
        el.on("update-downloaded", () => {
            dialog
                .showMessageBox({ type: "info", title: "Update ready", message: "Install now?", buttons: ["Yes", "Later"] })
                .then(e => {
                    e.response === 0 && el.quitAndInstall();
                });
        }),
        Ye.on("window-all-closed", () => {
            process.platform !== "darwin" && Ye.quit();
        });
} while (!1);
