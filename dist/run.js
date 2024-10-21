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
var dg = Object.defineProperty;
var Xa = e => {
    throw TypeError(e);
};
var hg = (e, t, r) => (t in e ? dg(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[t] = r));
var g = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var I = (e, t, r) => hg(e, typeof t != "symbol" ? t + "" : t, r),
    Ka = (e, t, r) => t.has(e) || Xa("Cannot " + r);
var b = (e, t, r) => (Ka(e, t, "read from private field"), r ? r.call(e) : t.get(e)),
    me = (e, t, r) =>
        t.has(e) ? Xa("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r),
    Te = (e, t, r, n) => (Ka(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r);
var wn = g(Mt => {
    "use strict";
    Object.defineProperty(Mt, "__esModule", { value: !0 });
    Mt.CancellationError = Mt.CancellationToken = void 0;
    var pg = require("events"),
        to = class extends pg.EventEmitter {
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
                if (this.cancelled) return Promise.reject(new Ar());
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
                                o(new Ar());
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
    Mt.CancellationToken = to;
    var Ar = class extends Error {
        constructor() {
            super("cancelled");
        }
    };
    Mt.CancellationError = Ar;
});
var Qa = g((Lb, Ja) => {
    var Bt = 1e3,
        Ht = Bt * 60,
        jt = Ht * 60,
        Et = jt * 24,
        mg = Et * 7,
        gg = Et * 365.25;
    Ja.exports = function (e, t) {
        t = t || {};
        var r = typeof e;
        if (r === "string" && e.length > 0) return wg(e);
        if (r === "number" && isFinite(e)) return t.long ? yg(e) : Eg(e);
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e));
    };
    function wg(e) {
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
                        return r * gg;
                    case "weeks":
                    case "week":
                    case "w":
                        return r * mg;
                    case "days":
                    case "day":
                    case "d":
                        return r * Et;
                    case "hours":
                    case "hour":
                    case "hrs":
                    case "hr":
                    case "h":
                        return r * jt;
                    case "minutes":
                    case "minute":
                    case "mins":
                    case "min":
                    case "m":
                        return r * Ht;
                    case "seconds":
                    case "second":
                    case "secs":
                    case "sec":
                    case "s":
                        return r * Bt;
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
    function Eg(e) {
        var t = Math.abs(e);
        return t >= Et
            ? Math.round(e / Et) + "d"
            : t >= jt
            ? Math.round(e / jt) + "h"
            : t >= Ht
            ? Math.round(e / Ht) + "m"
            : t >= Bt
            ? Math.round(e / Bt) + "s"
            : e + "ms";
    }
    function yg(e) {
        var t = Math.abs(e);
        return t >= Et
            ? En(e, t, Et, "day")
            : t >= jt
            ? En(e, t, jt, "hour")
            : t >= Ht
            ? En(e, t, Ht, "minute")
            : t >= Bt
            ? En(e, t, Bt, "second")
            : e + " ms";
    }
    function En(e, t, r, n) {
        var i = t >= r * 1.5;
        return Math.round(e / r) + " " + n + (i ? "s" : "");
    }
});
var ro = g((Ub, Za) => {
    function _g(e) {
        (r.debug = r),
            (r.default = r),
            (r.coerce = l),
            (r.disable = o),
            (r.enable = i),
            (r.enabled = s),
            (r.humanize = Qa()),
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
                let x = _,
                    A = Number(new Date()),
                    N = A - (f || A);
                (x.diff = N),
                    (x.prev = f),
                    (x.curr = A),
                    (f = A),
                    (v[0] = r.coerce(v[0])),
                    typeof v[0] != "string" && v.unshift("%O");
                let L = 0;
                (v[0] = v[0].replace(/%([a-zA-Z%])/g, (V, se) => {
                    if (V === "%%") return "%";
                    L++;
                    let E = r.formatters[se];
                    if (typeof E == "function") {
                        let D = v[L];
                        (V = E.call(x, D)), v.splice(L, 1), L--;
                    }
                    return V;
                })),
                    r.formatArgs.call(x, v),
                    (x.log || r.log).apply(x, v);
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
    Za.exports = _g;
});
var el = g((Re, yn) => {
    Re.formatArgs = Sg;
    Re.save = Ag;
    Re.load = xg;
    Re.useColors = vg;
    Re.storage = Tg();
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
    function vg() {
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
    function Sg(e) {
        if (
            ((e[0] =
                (this.useColors ? "%c" : "") +
                this.namespace +
                (this.useColors ? " %c" : " ") +
                e[0] +
                (this.useColors ? "%c " : " ") +
                "+" +
                yn.exports.humanize(this.diff)),
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
    function Ag(e) {
        try {
            e ? Re.storage.setItem("debug", e) : Re.storage.removeItem("debug");
        } catch {}
    }
    function xg() {
        let e;
        try {
            e = Re.storage.getItem("debug");
        } catch {}
        return !e && typeof process < "u" && "env" in process && (e = process.env.DEBUG), e;
    }
    function Tg() {
        try {
            return localStorage;
        } catch {}
    }
    yn.exports = ro()(Re);
    var { formatters: Cg } = yn.exports;
    Cg.j = function (e) {
        try {
            return JSON.stringify(e);
        } catch (t) {
            return "[UnexpectedJSONParseError]: " + t.message;
        }
    };
});
var rl = g(($b, tl) => {
    "use strict";
    tl.exports = (e, t) => {
        t = t || process.argv;
        let r = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--",
            n = t.indexOf(r + e),
            i = t.indexOf("--");
        return n !== -1 && (i === -1 ? !0 : n < i);
    };
});
var il = g((kb, nl) => {
    "use strict";
    var bg = require("os"),
        Le = rl(),
        ue = process.env,
        Wt;
    Le("no-color") || Le("no-colors") || Le("color=false")
        ? (Wt = !1)
        : (Le("color") || Le("colors") || Le("color=true") || Le("color=always")) && (Wt = !0);
    "FORCE_COLOR" in ue && (Wt = ue.FORCE_COLOR.length === 0 || parseInt(ue.FORCE_COLOR, 10) !== 0);
    function Og(e) {
        return e === 0 ? !1 : { level: e, hasBasic: !0, has256: e >= 2, has16m: e >= 3 };
    }
    function Ig(e) {
        if (Wt === !1) return 0;
        if (Le("color=16m") || Le("color=full") || Le("color=truecolor")) return 3;
        if (Le("color=256")) return 2;
        if (e && !e.isTTY && Wt !== !0) return 0;
        let t = Wt ? 1 : 0;
        if (process.platform === "win32") {
            let r = bg.release().split(".");
            return Number(process.versions.node.split(".")[0]) >= 8 && Number(r[0]) >= 10 && Number(r[2]) >= 10586
                ? Number(r[2]) >= 14931
                    ? 3
                    : 2
                : 1;
        }
        if ("CI" in ue)
            return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some(r => r in ue) || ue.CI_NAME === "codeship" ? 1 : t;
        if ("TEAMCITY_VERSION" in ue) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(ue.TEAMCITY_VERSION) ? 1 : 0;
        if (ue.COLORTERM === "truecolor") return 3;
        if ("TERM_PROGRAM" in ue) {
            let r = parseInt((ue.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
            switch (ue.TERM_PROGRAM) {
                case "iTerm.app":
                    return r >= 3 ? 3 : 2;
                case "Apple_Terminal":
                    return 2;
            }
        }
        return /-256(color)?$/i.test(ue.TERM)
            ? 2
            : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(ue.TERM) || "COLORTERM" in ue
            ? 1
            : (ue.TERM === "dumb", t);
    }
    function no(e) {
        let t = Ig(e);
        return Og(t);
    }
    nl.exports = { supportsColor: no, stdout: no(process.stdout), stderr: no(process.stderr) };
});
var sl = g((ne, vn) => {
    var Ng = require("tty"),
        _n = require("util");
    ne.init = Ug;
    ne.log = Fg;
    ne.formatArgs = Dg;
    ne.save = qg;
    ne.load = Lg;
    ne.useColors = Rg;
    ne.destroy = _n.deprecate(() => {},
    "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    ne.colors = [6, 2, 3, 4, 5, 1];
    try {
        let e = il();
        e &&
            (e.stderr || e).level >= 2 &&
            (ne.colors = [
                20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81,
                92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170,
                171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215,
                220, 221
            ]);
    } catch {}
    ne.inspectOpts = Object.keys(process.env)
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
    function Rg() {
        return "colors" in ne.inspectOpts ? !!ne.inspectOpts.colors : Ng.isatty(process.stderr.fd);
    }
    function Dg(e) {
        let { namespace: t, useColors: r } = this;
        if (r) {
            let n = this.color,
                i = "\x1B[3" + (n < 8 ? n : "8;5;" + n),
                o = "  ".concat(i, ";1m").concat(t, " \x1B[0m");
            (e[0] = o + e[0].split("\n").join("\n" + o)), e.push(i + "m+" + vn.exports.humanize(this.diff) + "\x1B[0m");
        } else e[0] = Pg() + t + " " + e[0];
    }
    function Pg() {
        return ne.inspectOpts.hideDate ? "" : new Date().toISOString() + " ";
    }
    function Fg(...e) {
        return process.stderr.write(_n.formatWithOptions(ne.inspectOpts, ...e) + "\n");
    }
    function qg(e) {
        e ? (process.env.DEBUG = e) : delete process.env.DEBUG;
    }
    function Lg() {
        return process.env.DEBUG;
    }
    function Ug(e) {
        e.inspectOpts = {};
        let t = Object.keys(ne.inspectOpts);
        for (let r = 0; r < t.length; r++) e.inspectOpts[t[r]] = ne.inspectOpts[t[r]];
    }
    vn.exports = ro()(ne);
    var { formatters: ol } = vn.exports;
    ol.o = function (e) {
        return (
            (this.inspectOpts.colors = this.useColors),
            _n
                .inspect(e, this.inspectOpts)
                .split("\n")
                .map(t => t.trim())
                .join(" ")
        );
    };
    ol.O = function (e) {
        return (this.inspectOpts.colors = this.useColors), _n.inspect(e, this.inspectOpts);
    };
});
var al = g((Mb, io) => {
    typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs
        ? (io.exports = el())
        : (io.exports = sl());
});
var xr = g(oo => {
    "use strict";
    Object.defineProperty(oo, "__esModule", { value: !0 });
    oo.newError = $g;
    function $g(e, t) {
        let r = new Error(e);
        return (r.code = t), r;
    }
});
var ao = g(Sn => {
    "use strict";
    Object.defineProperty(Sn, "__esModule", { value: !0 });
    Sn.ProgressCallbackTransform = void 0;
    var kg = require("stream"),
        so = class extends kg.Transform {
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
    Sn.ProgressCallbackTransform = so;
});
var fl = g(ge => {
    "use strict";
    Object.defineProperty(ge, "__esModule", { value: !0 });
    ge.DigestTransform = ge.HttpExecutor = ge.HttpError = void 0;
    ge.createHttpError = lo;
    ge.parseJson = Yg;
    ge.configureRequestOptionsFromUrl = cl;
    ge.configureRequestUrl = co;
    ge.safeGetHeader = Gt;
    ge.configureRequestOptions = An;
    ge.safeStringifyJson = xn;
    var Mg = require("crypto"),
        Bg = al(),
        Hg = require("fs"),
        jg = require("stream"),
        ul = require("url"),
        Wg = wn(),
        ll = xr(),
        Gg = ao(),
        Tr = (0, Bg.default)("electron-builder");
    function lo(e, t = null) {
        return new Cr(
            e.statusCode || -1,
            "".concat(e.statusCode, " ").concat(e.statusMessage) +
                (t == null ? "" : "\n" + JSON.stringify(t, null, "  ")) +
                "\nHeaders: " +
                xn(e.headers),
            t
        );
    }
    var Vg = new Map([
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
        Cr = class extends Error {
            constructor(t, r = "HTTP error: ".concat(Vg.get(t) || t), n = null) {
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
    ge.HttpError = Cr;
    function Yg(e) {
        return e.then(t => (t == null || t.length === 0 ? null : JSON.parse(t)));
    }
    var uo = class e {
        constructor() {
            this.maxRedirects = 10;
        }
        request(t, r = new Wg.CancellationToken(), n) {
            An(t);
            let i = n == null ? void 0 : JSON.stringify(n),
                o = i ? Buffer.from(i) : void 0;
            if (o != null) {
                Tr(i);
                let { headers: s, ...a } = t;
                t = { method: "post", headers: { "Content-Type": "application/json", "Content-Length": o.length, ...s }, ...a };
            }
            return this.doApiRequest(t, r, s => s.end(o));
        }
        doApiRequest(t, r, n, i = 0) {
            return (
                Tr.enabled && Tr("Request: ".concat(xn(t))),
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
                (Tr.enabled &&
                    Tr("Response: ".concat(t.statusCode, " ").concat(t.statusMessage, ", request options: ").concat(xn(r))),
                t.statusCode === 404)
            ) {
                o(
                    lo(
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
                f = Gt(t, "location");
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
                            let p = Gt(t, "content-type"),
                                y =
                                    p != null &&
                                    (Array.isArray(p) ? p.find(_ => _.includes("json")) != null : p.includes("json"));
                            o(
                                lo(
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
                co(t, a),
                    An(a),
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
                let s = Gt(o, "location");
                if (s != null) {
                    n < this.maxRedirects
                        ? this.doDownload(e.prepareRedirectUrlOptions(s, t), r, n++)
                        : r.callback(this.createMaxRedirectError());
                    return;
                }
                r.responseHandler == null ? Xg(r, o) : r.responseHandler(o, r.callback);
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
            let n = cl(t, { ...r }),
                i = n.headers;
            if (i?.authorization) {
                let o = new ul.URL(t);
                (o.hostname.endsWith(".amazonaws.com") || o.searchParams.has("X-Amz-Credential")) && delete i.authorization;
            }
            return n;
        }
        static retryOnServerError(t, r = 3) {
            for (let n = 0; ; n++)
                try {
                    return t();
                } catch (i) {
                    if (n < r && ((i instanceof Cr && i.isServerError()) || i.code === "EPIPE")) continue;
                    throw i;
                }
        }
    };
    ge.HttpExecutor = uo;
    function cl(e, t) {
        let r = An(t);
        return co(new ul.URL(e), r), r;
    }
    function co(e, t) {
        (t.protocol = e.protocol),
            (t.hostname = e.hostname),
            e.port ? (t.port = e.port) : t.port && delete t.port,
            (t.path = e.pathname + e.search);
    }
    var br = class extends jg.Transform {
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
                (this.digester = (0, Mg.createHash)(r));
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
            if (this._actual == null) throw (0, ll.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
            if (this._actual !== this.expected)
                throw (0, ll.newError)(
                    ""
                        .concat(this.algorithm, " checksum mismatch, expected ")
                        .concat(this.expected, ", got ")
                        .concat(this._actual),
                    "ERR_CHECKSUM_MISMATCH"
                );
            return null;
        }
    };
    ge.DigestTransform = br;
    function zg(e, t, r) {
        return e != null && t != null && e !== t
            ? (r(new Error("checksum mismatch: expected ".concat(t, " but got ").concat(e, " (X-Checksum-Sha2 header)"))), !1)
            : !0;
    }
    function Gt(e, t) {
        let r = e.headers[t];
        return r == null ? null : Array.isArray(r) ? (r.length === 0 ? null : r[r.length - 1]) : r;
    }
    function Xg(e, t) {
        if (!zg(Gt(t, "X-Checksum-Sha2"), e.options.sha2, e.callback)) return;
        let r = [];
        if (e.options.onProgress != null) {
            let s = Gt(t, "content-length");
            s != null &&
                r.push(new Gg.ProgressCallbackTransform(parseInt(s, 10), e.options.cancellationToken, e.options.onProgress));
        }
        let n = e.options.sha512;
        n != null
            ? r.push(
                  new br(
                      n,
                      "sha512",
                      n.length === 128 && !n.includes("+") && !n.includes("Z") && !n.includes("=") ? "hex" : "base64"
                  )
              )
            : e.options.sha2 != null && r.push(new br(e.options.sha2, "sha256", "hex"));
        let i = (0, Hg.createWriteStream)(e.destination);
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
    function An(e, t, r) {
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
    function xn(e, t) {
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
var hl = g(Tn => {
    "use strict";
    Object.defineProperty(Tn, "__esModule", { value: !0 });
    Tn.githubUrl = Kg;
    Tn.getS3LikeProviderBaseUrl = Jg;
    function Kg(e, t = "github.com") {
        return "".concat(e.protocol || "https", "://").concat(e.host || t);
    }
    function Jg(e) {
        let t = e.provider;
        if (t === "s3") return Qg(e);
        if (t === "spaces") return Zg(e);
        throw new Error("Not supported provider: ".concat(t));
    }
    function Qg(e) {
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
        return dl(t, e.path);
    }
    function dl(e, t) {
        return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), (e += t)), e;
    }
    function Zg(e) {
        if (e.name == null) throw new Error("name is missing");
        if (e.region == null) throw new Error("region is missing");
        return dl("https://".concat(e.name, ".").concat(e.region, ".digitaloceanspaces.com"), e.path);
    }
});
var pl = g(fo => {
    "use strict";
    Object.defineProperty(fo, "__esModule", { value: !0 });
    fo.parseDn = e0;
    function e0(e) {
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
var yl = g(Vt => {
    "use strict";
    Object.defineProperty(Vt, "__esModule", { value: !0 });
    Vt.nil = Vt.UUID = void 0;
    var wl = require("crypto"),
        El = xr(),
        t0 = "options.name must be either a string or a Buffer",
        ml = (0, wl.randomBytes)(16);
    ml[0] = ml[0] | 1;
    var Cn = {},
        $ = [];
    for (let e = 0; e < 256; e++) {
        let t = (e + 256).toString(16).substr(1);
        (Cn[t] = e), ($[e] = t);
    }
    var yt = class e {
        constructor(t) {
            (this.ascii = null), (this.binary = null);
            let r = e.check(t);
            if (!r) throw new Error("not a UUID");
            (this.version = r.version), r.format === "ascii" ? (this.ascii = t) : (this.binary = t);
        }
        static v5(t, r) {
            return r0(t, "sha1", 80, r);
        }
        toString() {
            return this.ascii == null && (this.ascii = n0(this.binary)), this.ascii;
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
                                  version: (Cn[t[14] + t[15]] & 240) >> 4,
                                  variant: gl((Cn[t[19] + t[20]] & 224) >> 5),
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
                    : { version: (t[r + 6] & 240) >> 4, variant: gl((t[r + 8] & 224) >> 5), format: "binary" };
            }
            throw (0, El.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
        }
        static parse(t) {
            let r = Buffer.allocUnsafe(16),
                n = 0;
            for (let i = 0; i < 16; i++) (r[i] = Cn[t[n++] + t[n++]]), (i === 3 || i === 5 || i === 7 || i === 9) && (n += 1);
            return r;
        }
    };
    Vt.UUID = yt;
    yt.OID = yt.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
    function gl(e) {
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
    var Or;
    (function (e) {
        (e[(e.ASCII = 0)] = "ASCII"), (e[(e.BINARY = 1)] = "BINARY"), (e[(e.OBJECT = 2)] = "OBJECT");
    })(Or || (Or = {}));
    function r0(e, t, r, n, i = Or.ASCII) {
        let o = (0, wl.createHash)(t);
        if (typeof e != "string" && !Buffer.isBuffer(e)) throw (0, El.newError)(t0, "ERR_INVALID_UUID_NAME");
        o.update(n), o.update(e);
        let a = o.digest(),
            l;
        switch (i) {
            case Or.BINARY:
                (a[6] = (a[6] & 15) | r), (a[8] = (a[8] & 63) | 128), (l = a);
                break;
            case Or.OBJECT:
                (a[6] = (a[6] & 15) | r), (a[8] = (a[8] & 63) | 128), (l = new yt(a));
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
    function n0(e) {
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
    Vt.nil = new yt("00000000-0000-0000-0000-000000000000");
});
var _l = g(bn => {
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
                var te = d[t[w]].length;
                if (te > u)
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
                S = Math.max(S, te);
            }
            var re = e.MAX_BUFFER_LENGTH - S;
            d.bufferCheckPosition = re + d.position;
        }
        function i(d) {
            for (var u = 0, S = t.length; u < S; u++) d[t[u]] = "";
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
            write: cg,
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
            x =
                /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,
            A =
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
        function se(d, u) {
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
        for (var D in e.STATE) e.STATE[e.STATE[D]] = D;
        E = e.STATE;
        function U(d, u, S) {
            d[u] && d[u](S);
        }
        function R(d, u, S) {
            d.textNode && K(d), U(d, u, S);
        }
        function K(d) {
            (d.textNode = Z(d.opt, d.textNode)), d.textNode && U(d, "ontext", d.textNode), (d.textNode = "");
        }
        function Z(d, u) {
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
            d.opt.xmlns && (S.ns = u.ns), (d.attribList.length = 0), R(d, "onopentagstart", S);
        }
        function Q(d, u) {
            var S = d.indexOf(":"),
                w = S < 0 ? ["", d] : d.split(":"),
                B = w[0],
                te = w[1];
            return u && d === "xmlns" && ((B = "xmlns"), (te = "")), { prefix: B, local: te };
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
                var u = Q(d.attribName, !0),
                    S = u.prefix,
                    w = u.local;
                if (S === "xmlns")
                    if (w === "xml" && d.attribValue !== m)
                        F(d, "xml: prefix must be bound to " + m + "\nActual: " + d.attribValue);
                    else if (w === "xmlns" && d.attribValue !== p)
                        F(d, "xmlns: prefix must be bound to " + p + "\nActual: " + d.attribValue);
                    else {
                        var B = d.tag,
                            te = d.tags[d.tags.length - 1] || d;
                        B.ns === te.ns && (B.ns = Object.create(te.ns)), (B.ns[w] = d.attribValue);
                    }
                d.attribList.push([d.attribName, d.attribValue]);
            } else
                (d.tag.attributes[d.attribName] = d.attribValue),
                    R(d, "onattribute", { name: d.attribName, value: d.attribValue });
            d.attribName = d.attribValue = "";
        }
        function Qe(d, u) {
            if (d.opt.xmlns) {
                var S = d.tag,
                    w = Q(d.tagName);
                (S.prefix = w.prefix),
                    (S.local = w.local),
                    (S.uri = S.ns[w.prefix] || ""),
                    S.prefix && !S.uri && (F(d, "Unbound namespace prefix: " + JSON.stringify(d.tagName)), (S.uri = w.prefix));
                var B = d.tags[d.tags.length - 1] || d;
                S.ns &&
                    B.ns !== S.ns &&
                    Object.keys(S.ns).forEach(function (za) {
                        R(d, "onopennamespace", { prefix: za, uri: S.ns[za] });
                    });
                for (var te = 0, re = d.attribList.length; te < re; te++) {
                    var Ae = d.attribList[te],
                        xe = Ae[0],
                        kt = Ae[1],
                        ae = Q(xe, !0),
                        Ge = ae.prefix,
                        fg = ae.local,
                        Ya = Ge === "" ? "" : S.ns[Ge] || "",
                        eo = { name: xe, value: kt, prefix: Ge, local: fg, uri: Ya };
                    Ge && Ge !== "xmlns" && !Ya && (F(d, "Unbound namespace prefix: " + JSON.stringify(Ge)), (eo.uri = Ge)),
                        (d.tag.attributes[xe] = eo),
                        R(d, "onattribute", eo);
                }
                d.attribList.length = 0;
            }
            (d.tag.isSelfClosing = !!u),
                (d.sawRoot = !0),
                d.tags.push(d.tag),
                R(d, "onopentag", d.tag),
                u ||
                    (!d.noscript && d.tagName.toLowerCase() === "script" ? (d.state = E.SCRIPT) : (d.state = E.TEXT),
                    (d.tag = null),
                    (d.tagName = "")),
                (d.attribName = d.attribValue = ""),
                (d.attribList.length = 0);
        }
        function Zi(d) {
            if (!d.tagName) {
                F(d, "Weird empty close tag."), (d.textNode += "</>"), (d.state = E.TEXT);
                return;
            }
            if (d.script) {
                if (d.tagName !== "script") {
                    (d.script += "</" + d.tagName + ">"), (d.tagName = ""), (d.state = E.SCRIPT);
                    return;
                }
                R(d, "onscript", d.script), (d.script = "");
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
            for (var te = d.tags.length; te-- > u; ) {
                var re = (d.tag = d.tags.pop());
                (d.tagName = d.tag.name), R(d, "onclosetag", d.tagName);
                var Ae = {};
                for (var xe in re.ns) Ae[xe] = re.ns[xe];
                var kt = d.tags[d.tags.length - 1] || d;
                d.opt.xmlns &&
                    re.ns !== kt.ns &&
                    Object.keys(re.ns).forEach(function (ae) {
                        var Ge = re.ns[ae];
                        R(d, "onclosenamespace", { prefix: ae, uri: Ge });
                    });
            }
            u === 0 && (d.closedRoot = !0),
                (d.tagName = d.attribValue = d.attribName = ""),
                (d.attribList.length = 0),
                (d.state = E.TEXT);
        }
        function ug(d) {
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
        function Ga(d, u) {
            u === "<"
                ? ((d.state = E.OPEN_WAKA), (d.startTagPosition = d.position))
                : N(u) || (F(d, "Non-whitespace before first tag."), (d.textNode = u), (d.state = E.TEXT));
        }
        function Va(d, u) {
            var S = "";
            return u < d.length && (S = d.charAt(u)), S;
        }
        function cg(d) {
            var u = this;
            if (this.error) throw this.error;
            if (u.closed) return X(u, "Cannot write after close. Assign an onready handler.");
            if (d === null) return G(u);
            typeof d == "object" && (d = d.toString());
            for (var S = 0, w = ""; (w = Va(d, S++)), (u.c = w), !!w; )
                switch ((u.trackPosition && (u.position++, w === "\n" ? (u.line++, (u.column = 0)) : u.column++), u.state)) {
                    case E.BEGIN:
                        if (((u.state = E.BEGIN_WHITESPACE), w === "\uFEFF")) continue;
                        Ga(u, w);
                        continue;
                    case E.BEGIN_WHITESPACE:
                        Ga(u, w);
                        continue;
                    case E.TEXT:
                        if (u.sawRoot && !u.closedRoot) {
                            for (var B = S - 1; w && w !== "<" && w !== "&"; )
                                (w = Va(d, S++)),
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
                                    var te = u.position - u.startTagPosition;
                                    w = new Array(te).join(" ") + w;
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
                            ? (R(u, "onopencdata"), (u.state = E.CDATA), (u.sgmlDecl = ""), (u.cdata = ""))
                            : (u.sgmlDecl + w).toUpperCase() === f
                            ? ((u.state = E.DOCTYPE),
                              (u.doctype || u.sawRoot) && F(u, "Inappropriately located doctype declaration"),
                              (u.doctype = ""),
                              (u.sgmlDecl = ""))
                            : w === ">"
                            ? (R(u, "onsgmldeclaration", u.sgmlDecl), (u.sgmlDecl = ""), (u.state = E.TEXT))
                            : (L(w) && (u.state = E.SGML_DECL_QUOTED), (u.sgmlDecl += w));
                        continue;
                    case E.SGML_DECL_QUOTED:
                        w === u.q && ((u.state = E.SGML_DECL), (u.q = "")), (u.sgmlDecl += w);
                        continue;
                    case E.DOCTYPE:
                        w === ">"
                            ? ((u.state = E.TEXT), R(u, "ondoctype", u.doctype), (u.doctype = !0))
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
                              (u.comment = Z(u.opt, u.comment)),
                              u.comment && R(u, "oncomment", u.comment),
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
                            ? (u.cdata && R(u, "oncdata", u.cdata), R(u, "onclosecdata"), (u.cdata = ""), (u.state = E.TEXT))
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
                            ? (R(u, "onprocessinginstruction", { name: u.procInstName, body: u.procInstBody }),
                              (u.procInstName = u.procInstBody = ""),
                              (u.state = E.TEXT))
                            : ((u.procInstBody += "?" + w), (u.state = E.PROC_INST_BODY));
                        continue;
                    case E.OPEN_TAG:
                        V(v, w)
                            ? (u.tagName += w)
                            : (H(u),
                              w === ">"
                                  ? Qe(u)
                                  : w === "/"
                                  ? (u.state = E.OPEN_TAG_SLASH)
                                  : (N(w) || F(u, "Invalid character in tag name"), (u.state = E.ATTRIB)));
                        continue;
                    case E.OPEN_TAG_SLASH:
                        w === ">"
                            ? (Qe(u, !0), Zi(u))
                            : (F(u, "Forward-slash in opening tag not followed by >"), (u.state = E.ATTRIB));
                        continue;
                    case E.ATTRIB:
                        if (N(w)) continue;
                        w === ">"
                            ? Qe(u)
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
                            ? (F(u, "Attribute without value"), (u.attribValue = u.attribName), j(u), Qe(u))
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
                                R(u, "onattribute", { name: u.attribName, value: "" }),
                                (u.attribName = ""),
                                w === ">"
                                    ? Qe(u)
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
                            ? Qe(u)
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
                        if (!De(w)) {
                            w === "&" ? (u.state = E.ATTRIB_VALUE_ENTITY_U) : (u.attribValue += w);
                            continue;
                        }
                        j(u), w === ">" ? Qe(u) : (u.state = E.ATTRIB);
                        continue;
                    case E.CLOSE_TAG:
                        if (u.tagName)
                            w === ">"
                                ? Zi(u)
                                : V(v, w)
                                ? (u.tagName += w)
                                : u.script
                                ? ((u.script += "</" + u.tagName), (u.tagName = ""), (u.state = E.SCRIPT))
                                : (N(w) || F(u, "Invalid tagname in closing tag"), (u.state = E.CLOSE_TAG_SAW_WHITE));
                        else {
                            if (N(w)) continue;
                            se(_, w)
                                ? u.script
                                    ? ((u.script += "</" + w), (u.state = E.SCRIPT))
                                    : F(u, "Invalid tagname in closing tag.")
                                : (u.tagName = w);
                        }
                        continue;
                    case E.CLOSE_TAG_SAW_WHITE:
                        if (N(w)) continue;
                        w === ">" ? Zi(u) : F(u, "Invalid characters in closing tag");
                        continue;
                    case E.TEXT_ENTITY:
                    case E.ATTRIB_VALUE_ENTITY_Q:
                    case E.ATTRIB_VALUE_ENTITY_U:
                        var re, Ae;
                        switch (u.state) {
                            case E.TEXT_ENTITY:
                                (re = E.TEXT), (Ae = "textNode");
                                break;
                            case E.ATTRIB_VALUE_ENTITY_Q:
                                (re = E.ATTRIB_VALUE_QUOTED), (Ae = "attribValue");
                                break;
                            case E.ATTRIB_VALUE_ENTITY_U:
                                (re = E.ATTRIB_VALUE_UNQUOTED), (Ae = "attribValue");
                                break;
                        }
                        if (w === ";") {
                            var xe = ug(u);
                            u.opt.unparsedEntities && !Object.values(e.XML_ENTITIES).includes(xe)
                                ? ((u.entity = ""), (u.state = re), u.write(xe))
                                : ((u[Ae] += xe), (u.entity = ""), (u.state = re));
                        } else
                            V(u.entity.length ? A : x, w)
                                ? (u.entity += w)
                                : (F(u, "Invalid character in entity name"),
                                  (u[Ae] += "&" + u.entity + w),
                                  (u.entity = ""),
                                  (u.state = re));
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
                            te,
                            re,
                            Ae = -1,
                            xe = arguments.length;
                        if (!xe) return "";
                        for (var kt = ""; ++Ae < xe; ) {
                            var ae = Number(arguments[Ae]);
                            if (!isFinite(ae) || ae < 0 || ae > 1114111 || u(ae) !== ae)
                                throw RangeError("Invalid code point: " + ae);
                            ae <= 65535
                                ? B.push(ae)
                                : ((ae -= 65536), (te = (ae >> 10) + 55296), (re = (ae % 1024) + 56320), B.push(te, re)),
                                (Ae + 1 === xe || B.length > w) && ((kt += d.apply(null, B)), (B.length = 0));
                        }
                        return kt;
                    };
                Object.defineProperty
                    ? Object.defineProperty(String, "fromCodePoint", { value: S, configurable: !0, writable: !0 })
                    : (String.fromCodePoint = S);
            })();
    })(typeof bn > "u" ? (bn.sax = {}) : bn);
});
var Sl = g(Ir => {
    "use strict";
    Object.defineProperty(Ir, "__esModule", { value: !0 });
    Ir.XElement = void 0;
    Ir.parseXml = a0;
    var i0 = _l(),
        On = xr(),
        In = class {
            constructor(t) {
                if (
                    ((this.name = t),
                    (this.value = ""),
                    (this.attributes = null),
                    (this.isCData = !1),
                    (this.elements = null),
                    !t)
                )
                    throw (0, On.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
                if (!s0(t)) throw (0, On.newError)("Invalid element name: ".concat(t), "ERR_XML_ELEMENT_INVALID_NAME");
            }
            attribute(t) {
                let r = this.attributes === null ? null : this.attributes[t];
                if (r == null) throw (0, On.newError)('No attribute "'.concat(t, '"'), "ERR_XML_MISSED_ATTRIBUTE");
                return r;
            }
            removeAttribute(t) {
                this.attributes !== null && delete this.attributes[t];
            }
            element(t, r = !1, n = null) {
                let i = this.elementOrNull(t, r);
                if (i === null) throw (0, On.newError)(n || 'No element "'.concat(t, '"'), "ERR_XML_MISSED_ELEMENT");
                return i;
            }
            elementOrNull(t, r = !1) {
                if (this.elements === null) return null;
                for (let n of this.elements) if (vl(n, t, r)) return n;
                return null;
            }
            getElements(t, r = !1) {
                return this.elements === null ? [] : this.elements.filter(n => vl(n, t, r));
            }
            elementValueOrEmpty(t, r = !1) {
                let n = this.elementOrNull(t, r);
                return n === null ? "" : n.value;
            }
        };
    Ir.XElement = In;
    var o0 = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
    function s0(e) {
        return o0.test(e);
    }
    function vl(e, t, r) {
        let n = e.name;
        return n === t || (r === !0 && n.length === t.length && n.toLowerCase() === t.toLowerCase());
    }
    function a0(e) {
        let t = null,
            r = i0.parser(!0, {}),
            n = [];
        return (
            (r.onopentag = i => {
                let o = new In(i.name);
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
var xl = g(Nn => {
    "use strict";
    Object.defineProperty(Nn, "__esModule", { value: !0 });
    Nn.MemoLazy = void 0;
    var ho = class {
        constructor(t, r) {
            (this.selector = t), (this.creator = r), (this.selected = void 0), (this._value = void 0);
        }
        get hasValue() {
            return this._value !== void 0;
        }
        get value() {
            let t = this.selector();
            if (this._value !== void 0 && Al(this.selected, t)) return this._value;
            this.selected = t;
            let r = this.creator(t);
            return (this.value = r), r;
        }
        set value(t) {
            this._value = t;
        }
    };
    Nn.MemoLazy = ho;
    function Al(e, t) {
        if (typeof e == "object" && e !== null && typeof t == "object" && t !== null) {
            let i = Object.keys(e),
                o = Object.keys(t);
            return i.length === o.length && i.every(s => Al(e[s], t[s]));
        }
        return e === t;
    }
});
var Cl = g(po => {
    "use strict";
    Object.defineProperty(po, "__esModule", { value: !0 });
    po.retry = Tl;
    var l0 = wn();
    async function Tl(e, t, r, n = 0, i = 0, o) {
        var s;
        let a = new l0.CancellationToken();
        try {
            return await e();
        } catch (l) {
            if ((!((s = o?.(l)) !== null && s !== void 0) || s) && t > 0 && !a.cancelled)
                return await new Promise(h => setTimeout(h, r + n * i)), await Tl(e, t - 1, r, n, i + 1, o);
            throw l;
        }
    }
});
var ie = g(P => {
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
    P.asArray = m0;
    var bl = wn();
    Object.defineProperty(P, "CancellationToken", {
        enumerable: !0,
        get: function () {
            return bl.CancellationToken;
        }
    });
    Object.defineProperty(P, "CancellationError", {
        enumerable: !0,
        get: function () {
            return bl.CancellationError;
        }
    });
    var ke = fl();
    Object.defineProperty(P, "HttpError", {
        enumerable: !0,
        get: function () {
            return ke.HttpError;
        }
    });
    Object.defineProperty(P, "createHttpError", {
        enumerable: !0,
        get: function () {
            return ke.createHttpError;
        }
    });
    Object.defineProperty(P, "HttpExecutor", {
        enumerable: !0,
        get: function () {
            return ke.HttpExecutor;
        }
    });
    Object.defineProperty(P, "DigestTransform", {
        enumerable: !0,
        get: function () {
            return ke.DigestTransform;
        }
    });
    Object.defineProperty(P, "safeGetHeader", {
        enumerable: !0,
        get: function () {
            return ke.safeGetHeader;
        }
    });
    Object.defineProperty(P, "configureRequestOptions", {
        enumerable: !0,
        get: function () {
            return ke.configureRequestOptions;
        }
    });
    Object.defineProperty(P, "configureRequestOptionsFromUrl", {
        enumerable: !0,
        get: function () {
            return ke.configureRequestOptionsFromUrl;
        }
    });
    Object.defineProperty(P, "safeStringifyJson", {
        enumerable: !0,
        get: function () {
            return ke.safeStringifyJson;
        }
    });
    Object.defineProperty(P, "parseJson", {
        enumerable: !0,
        get: function () {
            return ke.parseJson;
        }
    });
    Object.defineProperty(P, "configureRequestUrl", {
        enumerable: !0,
        get: function () {
            return ke.configureRequestUrl;
        }
    });
    var Ol = hl();
    Object.defineProperty(P, "getS3LikeProviderBaseUrl", {
        enumerable: !0,
        get: function () {
            return Ol.getS3LikeProviderBaseUrl;
        }
    });
    Object.defineProperty(P, "githubUrl", {
        enumerable: !0,
        get: function () {
            return Ol.githubUrl;
        }
    });
    var u0 = pl();
    Object.defineProperty(P, "parseDn", {
        enumerable: !0,
        get: function () {
            return u0.parseDn;
        }
    });
    var c0 = yl();
    Object.defineProperty(P, "UUID", {
        enumerable: !0,
        get: function () {
            return c0.UUID;
        }
    });
    var f0 = ao();
    Object.defineProperty(P, "ProgressCallbackTransform", {
        enumerable: !0,
        get: function () {
            return f0.ProgressCallbackTransform;
        }
    });
    var Il = Sl();
    Object.defineProperty(P, "parseXml", {
        enumerable: !0,
        get: function () {
            return Il.parseXml;
        }
    });
    Object.defineProperty(P, "XElement", {
        enumerable: !0,
        get: function () {
            return Il.XElement;
        }
    });
    var d0 = xr();
    Object.defineProperty(P, "newError", {
        enumerable: !0,
        get: function () {
            return d0.newError;
        }
    });
    var h0 = xl();
    Object.defineProperty(P, "MemoLazy", {
        enumerable: !0,
        get: function () {
            return h0.MemoLazy;
        }
    });
    var p0 = Cl();
    Object.defineProperty(P, "retry", {
        enumerable: !0,
        get: function () {
            return p0.retry;
        }
    });
    P.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe";
    P.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
    function m0(e) {
        return e == null ? [] : Array.isArray(e) ? e : [e];
    }
});
var Ce = g(mo => {
    "use strict";
    mo.fromCallback = function (e) {
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
    mo.fromPromise = function (e) {
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
var Rl = g((Zb, Nl) => {
    var Ze = require("constants"),
        g0 = process.cwd,
        Rn = null,
        w0 = process.env.GRACEFUL_FS_PLATFORM || process.platform;
    process.cwd = function () {
        return Rn || (Rn = g0.call(process)), Rn;
    };
    try {
        process.cwd();
    } catch {}
    typeof process.chdir == "function" &&
        ((go = process.chdir),
        (process.chdir = function (e) {
            (Rn = null), go.call(process, e);
        }),
        Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, go));
    var go;
    Nl.exports = E0;
    function E0(e) {
        Ze.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e),
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
            w0 === "win32" &&
                (e.rename =
                    typeof e.rename != "function"
                        ? e.rename
                        : (function (c) {
                              function f(m, p, y) {
                                  var _ = Date.now(),
                                      v = 0;
                                  c(m, p, function x(A) {
                                      if (
                                          A &&
                                          (A.code === "EACCES" || A.code === "EPERM" || A.code === "EBUSY") &&
                                          Date.now() - _ < 6e4
                                      ) {
                                          setTimeout(function () {
                                              e.stat(p, function (N, L) {
                                                  N && N.code === "ENOENT" ? c(m, p, x) : y(A);
                                              });
                                          }, v),
                                              v < 100 && (v += 10);
                                          return;
                                      }
                                      y && y(A);
                                  });
                              }
                              return Object.setPrototypeOf && Object.setPrototypeOf(f, c), f;
                          })(e.rename)),
            (e.read =
                typeof e.read != "function"
                    ? e.read
                    : (function (c) {
                          function f(m, p, y, _, v, x) {
                              var A;
                              if (x && typeof x == "function") {
                                  var N = 0;
                                  A = function (L, De, V) {
                                      if (L && L.code === "EAGAIN" && N < 10) return N++, c.call(e, m, p, y, _, v, A);
                                      x.apply(this, arguments);
                                  };
                              }
                              return c.call(e, m, p, y, _, v, A);
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
                                  } catch (x) {
                                      if (x.code === "EAGAIN" && v < 10) {
                                          v++;
                                          continue;
                                      }
                                      throw x;
                                  }
                          };
                      })(e.readSync));
        function t(c) {
            (c.lchmod = function (f, m, p) {
                c.open(f, Ze.O_WRONLY | Ze.O_SYMLINK, m, function (y, _) {
                    if (y) {
                        p && p(y);
                        return;
                    }
                    c.fchmod(_, m, function (v) {
                        c.close(_, function (x) {
                            p && p(v || x);
                        });
                    });
                });
            }),
                (c.lchmodSync = function (f, m) {
                    var p = c.openSync(f, Ze.O_WRONLY | Ze.O_SYMLINK, m),
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
            Ze.hasOwnProperty("O_SYMLINK") && c.futimes
                ? ((c.lutimes = function (f, m, p, y) {
                      c.open(f, Ze.O_SYMLINK, function (_, v) {
                          if (_) {
                              y && y(_);
                              return;
                          }
                          c.futimes(v, m, p, function (x) {
                              c.close(v, function (A) {
                                  y && y(x || A);
                              });
                          });
                      });
                  }),
                  (c.lutimesSync = function (f, m, p) {
                      var y = c.openSync(f, Ze.O_SYMLINK),
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
var Fl = g((eO, Pl) => {
    var Dl = require("stream").Stream;
    Pl.exports = y0;
    function y0(e) {
        return { ReadStream: t, WriteStream: r };
        function t(n, i) {
            if (!(this instanceof t)) return new t(n, i);
            Dl.call(this);
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
            Dl.call(this),
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
var Ll = g((tO, ql) => {
    "use strict";
    ql.exports = v0;
    var _0 =
        Object.getPrototypeOf ||
        function (e) {
            return e.__proto__;
        };
    function v0(e) {
        if (e === null || typeof e != "object") return e;
        if (e instanceof Object) var t = { __proto__: _0(e) };
        else var t = Object.create(null);
        return (
            Object.getOwnPropertyNames(e).forEach(function (r) {
                Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r));
            }),
            t
        );
    }
});
var we = g((rO, yo) => {
    var J = require("fs"),
        S0 = Rl(),
        A0 = Fl(),
        x0 = Ll(),
        Dn = require("util"),
        le,
        Fn;
    typeof Symbol == "function" && typeof Symbol.for == "function"
        ? ((le = Symbol.for("graceful-fs.queue")), (Fn = Symbol.for("graceful-fs.previous")))
        : ((le = "___graceful-fs.queue"), (Fn = "___graceful-fs.previous"));
    function T0() {}
    function kl(e, t) {
        Object.defineProperty(e, le, {
            get: function () {
                return t;
            }
        });
    }
    var _t = T0;
    Dn.debuglog
        ? (_t = Dn.debuglog("gfs4"))
        : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") &&
          (_t = function () {
              var e = Dn.format.apply(Dn, arguments);
              (e = "GFS4: " + e.split(/\n/).join("\nGFS4: ")), console.error(e);
          });
    J[le] ||
        ((Ul = global[le] || []),
        kl(J, Ul),
        (J.close = (function (e) {
            function t(r, n) {
                return e.call(J, r, function (i) {
                    i || $l(), typeof n == "function" && n.apply(this, arguments);
                });
            }
            return Object.defineProperty(t, Fn, { value: e }), t;
        })(J.close)),
        (J.closeSync = (function (e) {
            function t(r) {
                e.apply(J, arguments), $l();
            }
            return Object.defineProperty(t, Fn, { value: e }), t;
        })(J.closeSync)),
        /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") &&
            process.on("exit", function () {
                _t(J[le]), require("assert").equal(J[le].length, 0);
            }));
    var Ul;
    global[le] || kl(global, J[le]);
    yo.exports = wo(x0(J));
    process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !J.__patched && ((yo.exports = wo(J)), (J.__patched = !0));
    function wo(e) {
        S0(e), (e.gracefulify = wo), (e.createReadStream = De), (e.createWriteStream = V);
        var t = e.readFile;
        e.readFile = r;
        function r(D, U, R) {
            return typeof U == "function" && ((R = U), (U = null)), K(D, U, R);
            function K(Z, X, G, F) {
                return t(Z, X, function (H) {
                    H && (H.code === "EMFILE" || H.code === "ENFILE")
                        ? Yt([K, [Z, X, G], H, F || Date.now(), Date.now()])
                        : typeof G == "function" && G.apply(this, arguments);
                });
            }
        }
        var n = e.writeFile;
        e.writeFile = i;
        function i(D, U, R, K) {
            return typeof R == "function" && ((K = R), (R = null)), Z(D, U, R, K);
            function Z(X, G, F, H, Q) {
                return n(X, G, F, function (j) {
                    j && (j.code === "EMFILE" || j.code === "ENFILE")
                        ? Yt([Z, [X, G, F, H], j, Q || Date.now(), Date.now()])
                        : typeof H == "function" && H.apply(this, arguments);
                });
            }
        }
        var o = e.appendFile;
        o && (e.appendFile = s);
        function s(D, U, R, K) {
            return typeof R == "function" && ((K = R), (R = null)), Z(D, U, R, K);
            function Z(X, G, F, H, Q) {
                return o(X, G, F, function (j) {
                    j && (j.code === "EMFILE" || j.code === "ENFILE")
                        ? Yt([Z, [X, G, F, H], j, Q || Date.now(), Date.now()])
                        : typeof H == "function" && H.apply(this, arguments);
                });
            }
        }
        var a = e.copyFile;
        a && (e.copyFile = l);
        function l(D, U, R, K) {
            return typeof R == "function" && ((K = R), (R = 0)), Z(D, U, R, K);
            function Z(X, G, F, H, Q) {
                return a(X, G, F, function (j) {
                    j && (j.code === "EMFILE" || j.code === "ENFILE")
                        ? Yt([Z, [X, G, F, H], j, Q || Date.now(), Date.now()])
                        : typeof H == "function" && H.apply(this, arguments);
                });
            }
        }
        var h = e.readdir;
        e.readdir = f;
        var c = /^v[0-5]\./;
        function f(D, U, R) {
            typeof U == "function" && ((R = U), (U = null));
            var K = c.test(process.version)
                ? function (G, F, H, Q) {
                      return h(G, Z(G, F, H, Q));
                  }
                : function (G, F, H, Q) {
                      return h(G, F, Z(G, F, H, Q));
                  };
            return K(D, U, R);
            function Z(X, G, F, H) {
                return function (Q, j) {
                    Q && (Q.code === "EMFILE" || Q.code === "ENFILE")
                        ? Yt([K, [X, G, F], Q, H || Date.now(), Date.now()])
                        : (j && j.sort && j.sort(), typeof F == "function" && F.call(this, Q, j));
                };
            }
        }
        if (process.version.substr(0, 4) === "v0.8") {
            var m = A0(e);
            (x = m.ReadStream), (N = m.WriteStream);
        }
        var p = e.ReadStream;
        p && ((x.prototype = Object.create(p.prototype)), (x.prototype.open = A));
        var y = e.WriteStream;
        y && ((N.prototype = Object.create(y.prototype)), (N.prototype.open = L)),
            Object.defineProperty(e, "ReadStream", {
                get: function () {
                    return x;
                },
                set: function (D) {
                    x = D;
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e, "WriteStream", {
                get: function () {
                    return N;
                },
                set: function (D) {
                    N = D;
                },
                enumerable: !0,
                configurable: !0
            });
        var _ = x;
        Object.defineProperty(e, "FileReadStream", {
            get: function () {
                return _;
            },
            set: function (D) {
                _ = D;
            },
            enumerable: !0,
            configurable: !0
        });
        var v = N;
        Object.defineProperty(e, "FileWriteStream", {
            get: function () {
                return v;
            },
            set: function (D) {
                v = D;
            },
            enumerable: !0,
            configurable: !0
        });
        function x(D, U) {
            return this instanceof x ? (p.apply(this, arguments), this) : x.apply(Object.create(x.prototype), arguments);
        }
        function A() {
            var D = this;
            E(D.path, D.flags, D.mode, function (U, R) {
                U ? (D.autoClose && D.destroy(), D.emit("error", U)) : ((D.fd = R), D.emit("open", R), D.read());
            });
        }
        function N(D, U) {
            return this instanceof N ? (y.apply(this, arguments), this) : N.apply(Object.create(N.prototype), arguments);
        }
        function L() {
            var D = this;
            E(D.path, D.flags, D.mode, function (U, R) {
                U ? (D.destroy(), D.emit("error", U)) : ((D.fd = R), D.emit("open", R));
            });
        }
        function De(D, U) {
            return new e.ReadStream(D, U);
        }
        function V(D, U) {
            return new e.WriteStream(D, U);
        }
        var se = e.open;
        e.open = E;
        function E(D, U, R, K) {
            return typeof R == "function" && ((K = R), (R = null)), Z(D, U, R, K);
            function Z(X, G, F, H, Q) {
                return se(X, G, F, function (j, Qe) {
                    j && (j.code === "EMFILE" || j.code === "ENFILE")
                        ? Yt([Z, [X, G, F, H], j, Q || Date.now(), Date.now()])
                        : typeof H == "function" && H.apply(this, arguments);
                });
            }
        }
        return e;
    }
    function Yt(e) {
        _t("ENQUEUE", e[0].name, e[1]), J[le].push(e), Eo();
    }
    var Pn;
    function $l() {
        for (var e = Date.now(), t = 0; t < J[le].length; ++t) J[le][t].length > 2 && ((J[le][t][3] = e), (J[le][t][4] = e));
        Eo();
    }
    function Eo() {
        if ((clearTimeout(Pn), (Pn = void 0), J[le].length !== 0)) {
            var e = J[le].shift(),
                t = e[0],
                r = e[1],
                n = e[2],
                i = e[3],
                o = e[4];
            if (i === void 0) _t("RETRY", t.name, r), t.apply(null, r);
            else if (Date.now() - i >= 6e4) {
                _t("TIMEOUT", t.name, r);
                var s = r.pop();
                typeof s == "function" && s.call(null, n);
            } else {
                var a = Date.now() - o,
                    l = Math.max(o - i, 1),
                    h = Math.min(l * 1.2, 100);
                a >= h ? (_t("RETRY", t.name, r), t.apply(null, r.concat([i]))) : J[le].push(e);
            }
            Pn === void 0 && (Pn = setTimeout(Eo, 0));
        }
    }
});
var vt = g(et => {
    "use strict";
    var Ml = Ce().fromCallback,
        be = we(),
        C0 = [
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
        ].filter(e => typeof be[e] == "function");
    Object.assign(et, be);
    C0.forEach(e => {
        et[e] = Ml(be[e]);
    });
    et.exists = function (e, t) {
        return typeof t == "function" ? be.exists(e, t) : new Promise(r => be.exists(e, r));
    };
    et.read = function (e, t, r, n, i, o) {
        return typeof o == "function"
            ? be.read(e, t, r, n, i, o)
            : new Promise((s, a) => {
                  be.read(e, t, r, n, i, (l, h, c) => {
                      if (l) return a(l);
                      s({ bytesRead: h, buffer: c });
                  });
              });
    };
    et.write = function (e, t, ...r) {
        return typeof r[r.length - 1] == "function"
            ? be.write(e, t, ...r)
            : new Promise((n, i) => {
                  be.write(e, t, ...r, (o, s, a) => {
                      if (o) return i(o);
                      n({ bytesWritten: s, buffer: a });
                  });
              });
    };
    typeof be.writev == "function" &&
        (et.writev = function (e, t, ...r) {
            return typeof r[r.length - 1] == "function"
                ? be.writev(e, t, ...r)
                : new Promise((n, i) => {
                      be.writev(e, t, ...r, (o, s, a) => {
                          if (o) return i(o);
                          n({ bytesWritten: s, buffers: a });
                      });
                  });
        });
    typeof be.realpath.native == "function"
        ? (et.realpath.native = Ml(be.realpath.native))
        : process.emitWarning(
              "fs.realpath.native is not a function. Is fs being monkey-patched?",
              "Warning",
              "fs-extra-WARN0003"
          );
});
var Hl = g((iO, Bl) => {
    "use strict";
    var b0 = require("path");
    Bl.exports.checkPath = function (t) {
        if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(b0.parse(t).root, ""))) {
            let n = new Error("Path contains invalid characters: ".concat(t));
            throw ((n.code = "EINVAL"), n);
        }
    };
});
var Vl = g((oO, _o) => {
    "use strict";
    var jl = vt(),
        { checkPath: Wl } = Hl(),
        Gl = e => {
            let t = { mode: 511 };
            return typeof e == "number" ? e : { ...t, ...e }.mode;
        };
    _o.exports.makeDir = async (e, t) => (Wl(e), jl.mkdir(e, { mode: Gl(t), recursive: !0 }));
    _o.exports.makeDirSync = (e, t) => (Wl(e), jl.mkdirSync(e, { mode: Gl(t), recursive: !0 }));
});
var Ue = g((sO, Yl) => {
    "use strict";
    var O0 = Ce().fromPromise,
        { makeDir: I0, makeDirSync: vo } = Vl(),
        So = O0(I0);
    Yl.exports = { mkdirs: So, mkdirsSync: vo, mkdirp: So, mkdirpSync: vo, ensureDir: So, ensureDirSync: vo };
});
var tt = g((aO, Xl) => {
    "use strict";
    var N0 = Ce().fromPromise,
        zl = vt();
    function R0(e) {
        return zl
            .access(e)
            .then(() => !0)
            .catch(() => !1);
    }
    Xl.exports = { pathExists: N0(R0), pathExistsSync: zl.existsSync };
});
var Ao = g((lO, Kl) => {
    "use strict";
    var zt = we();
    function D0(e, t, r, n) {
        zt.open(e, "r+", (i, o) => {
            if (i) return n(i);
            zt.futimes(o, t, r, s => {
                zt.close(o, a => {
                    n && n(s || a);
                });
            });
        });
    }
    function P0(e, t, r) {
        let n = zt.openSync(e, "r+");
        return zt.futimesSync(n, t, r), zt.closeSync(n);
    }
    Kl.exports = { utimesMillis: D0, utimesMillisSync: P0 };
});
var St = g((uO, Zl) => {
    "use strict";
    var Xt = vt(),
        oe = require("path"),
        F0 = require("util");
    function q0(e, t, r) {
        let n = r.dereference ? i => Xt.stat(i, { bigint: !0 }) : i => Xt.lstat(i, { bigint: !0 });
        return Promise.all([
            n(e),
            n(t).catch(i => {
                if (i.code === "ENOENT") return null;
                throw i;
            })
        ]).then(([i, o]) => ({ srcStat: i, destStat: o }));
    }
    function L0(e, t, r) {
        let n,
            i = r.dereference ? s => Xt.statSync(s, { bigint: !0 }) : s => Xt.lstatSync(s, { bigint: !0 }),
            o = i(e);
        try {
            n = i(t);
        } catch (s) {
            if (s.code === "ENOENT") return { srcStat: o, destStat: null };
            throw s;
        }
        return { srcStat: o, destStat: n };
    }
    function U0(e, t, r, n, i) {
        F0.callbackify(q0)(e, t, n, (o, s) => {
            if (o) return i(o);
            let { srcStat: a, destStat: l } = s;
            if (l) {
                if (Nr(a, l)) {
                    let h = oe.basename(e),
                        c = oe.basename(t);
                    return r === "move" && h !== c && h.toLowerCase() === c.toLowerCase()
                        ? i(null, { srcStat: a, destStat: l, isChangingCase: !0 })
                        : i(new Error("Source and destination must not be the same."));
                }
                if (a.isDirectory() && !l.isDirectory())
                    return i(new Error("Cannot overwrite non-directory '".concat(t, "' with directory '").concat(e, "'.")));
                if (!a.isDirectory() && l.isDirectory())
                    return i(new Error("Cannot overwrite directory '".concat(t, "' with non-directory '").concat(e, "'.")));
            }
            return a.isDirectory() && xo(e, t) ? i(new Error(qn(e, t, r))) : i(null, { srcStat: a, destStat: l });
        });
    }
    function $0(e, t, r, n) {
        let { srcStat: i, destStat: o } = L0(e, t, n);
        if (o) {
            if (Nr(i, o)) {
                let s = oe.basename(e),
                    a = oe.basename(t);
                if (r === "move" && s !== a && s.toLowerCase() === a.toLowerCase())
                    return { srcStat: i, destStat: o, isChangingCase: !0 };
                throw new Error("Source and destination must not be the same.");
            }
            if (i.isDirectory() && !o.isDirectory())
                throw new Error("Cannot overwrite non-directory '".concat(t, "' with directory '").concat(e, "'."));
            if (!i.isDirectory() && o.isDirectory())
                throw new Error("Cannot overwrite directory '".concat(t, "' with non-directory '").concat(e, "'."));
        }
        if (i.isDirectory() && xo(e, t)) throw new Error(qn(e, t, r));
        return { srcStat: i, destStat: o };
    }
    function Jl(e, t, r, n, i) {
        let o = oe.resolve(oe.dirname(e)),
            s = oe.resolve(oe.dirname(r));
        if (s === o || s === oe.parse(s).root) return i();
        Xt.stat(s, { bigint: !0 }, (a, l) =>
            a ? (a.code === "ENOENT" ? i() : i(a)) : Nr(t, l) ? i(new Error(qn(e, r, n))) : Jl(e, t, s, n, i)
        );
    }
    function Ql(e, t, r, n) {
        let i = oe.resolve(oe.dirname(e)),
            o = oe.resolve(oe.dirname(r));
        if (o === i || o === oe.parse(o).root) return;
        let s;
        try {
            s = Xt.statSync(o, { bigint: !0 });
        } catch (a) {
            if (a.code === "ENOENT") return;
            throw a;
        }
        if (Nr(t, s)) throw new Error(qn(e, r, n));
        return Ql(e, t, o, n);
    }
    function Nr(e, t) {
        return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
    }
    function xo(e, t) {
        let r = oe
                .resolve(e)
                .split(oe.sep)
                .filter(i => i),
            n = oe
                .resolve(t)
                .split(oe.sep)
                .filter(i => i);
        return r.reduce((i, o, s) => i && n[s] === o, !0);
    }
    function qn(e, t, r) {
        return "Cannot ".concat(r, " '").concat(e, "' to a subdirectory of itself, '").concat(t, "'.");
    }
    Zl.exports = {
        checkPaths: U0,
        checkPathsSync: $0,
        checkParentPaths: Jl,
        checkParentPathsSync: Ql,
        isSrcSubdir: xo,
        areIdentical: Nr
    };
});
var au = g((cO, su) => {
    "use strict";
    var Oe = we(),
        Rr = require("path"),
        k0 = Ue().mkdirs,
        M0 = tt().pathExists,
        B0 = Ao().utimesMillis,
        Dr = St();
    function H0(e, t, r, n) {
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
            Dr.checkPaths(e, t, "copy", r, (i, o) => {
                if (i) return n(i);
                let { srcStat: s, destStat: a } = o;
                Dr.checkParentPaths(e, s, t, "copy", l => (l ? n(l) : r.filter ? ru(eu, a, e, t, r, n) : eu(a, e, t, r, n)));
            });
    }
    function eu(e, t, r, n, i) {
        let o = Rr.dirname(r);
        M0(o, (s, a) => {
            if (s) return i(s);
            if (a) return Ln(e, t, r, n, i);
            k0(o, l => (l ? i(l) : Ln(e, t, r, n, i)));
        });
    }
    function ru(e, t, r, n, i, o) {
        Promise.resolve(i.filter(r, n)).then(
            s => (s ? e(t, r, n, i, o) : o()),
            s => o(s)
        );
    }
    function j0(e, t, r, n, i) {
        return n.filter ? ru(Ln, e, t, r, n, i) : Ln(e, t, r, n, i);
    }
    function Ln(e, t, r, n, i) {
        (n.dereference ? Oe.stat : Oe.lstat)(t, (s, a) =>
            s
                ? i(s)
                : a.isDirectory()
                ? K0(a, e, t, r, n, i)
                : a.isFile() || a.isCharacterDevice() || a.isBlockDevice()
                ? W0(a, e, t, r, n, i)
                : a.isSymbolicLink()
                ? Z0(e, t, r, n, i)
                : a.isSocket()
                ? i(new Error("Cannot copy a socket file: ".concat(t)))
                : a.isFIFO()
                ? i(new Error("Cannot copy a FIFO pipe: ".concat(t)))
                : i(new Error("Unknown file: ".concat(t)))
        );
    }
    function W0(e, t, r, n, i, o) {
        return t ? G0(e, r, n, i, o) : nu(e, r, n, i, o);
    }
    function G0(e, t, r, n, i) {
        if (n.overwrite) Oe.unlink(r, o => (o ? i(o) : nu(e, t, r, n, i)));
        else return n.errorOnExist ? i(new Error("'".concat(r, "' already exists"))) : i();
    }
    function nu(e, t, r, n, i) {
        Oe.copyFile(t, r, o => (o ? i(o) : n.preserveTimestamps ? V0(e.mode, t, r, i) : Un(r, e.mode, i)));
    }
    function V0(e, t, r, n) {
        return Y0(e) ? z0(r, e, i => (i ? n(i) : tu(e, t, r, n))) : tu(e, t, r, n);
    }
    function Y0(e) {
        return (e & 128) === 0;
    }
    function z0(e, t, r) {
        return Un(e, t | 128, r);
    }
    function tu(e, t, r, n) {
        X0(t, r, i => (i ? n(i) : Un(r, e, n)));
    }
    function Un(e, t, r) {
        return Oe.chmod(e, t, r);
    }
    function X0(e, t, r) {
        Oe.stat(e, (n, i) => (n ? r(n) : B0(t, i.atime, i.mtime, r)));
    }
    function K0(e, t, r, n, i, o) {
        return t ? iu(r, n, i, o) : J0(e.mode, r, n, i, o);
    }
    function J0(e, t, r, n, i) {
        Oe.mkdir(r, o => {
            if (o) return i(o);
            iu(t, r, n, s => (s ? i(s) : Un(r, e, i)));
        });
    }
    function iu(e, t, r, n) {
        Oe.readdir(e, (i, o) => (i ? n(i) : ou(o, e, t, r, n)));
    }
    function ou(e, t, r, n, i) {
        let o = e.pop();
        return o ? Q0(e, o, t, r, n, i) : i();
    }
    function Q0(e, t, r, n, i, o) {
        let s = Rr.join(r, t),
            a = Rr.join(n, t);
        Dr.checkPaths(s, a, "copy", i, (l, h) => {
            if (l) return o(l);
            let { destStat: c } = h;
            j0(c, s, a, i, f => (f ? o(f) : ou(e, r, n, i, o)));
        });
    }
    function Z0(e, t, r, n, i) {
        Oe.readlink(t, (o, s) => {
            if (o) return i(o);
            if ((n.dereference && (s = Rr.resolve(process.cwd(), s)), e))
                Oe.readlink(r, (a, l) =>
                    a
                        ? a.code === "EINVAL" || a.code === "UNKNOWN"
                            ? Oe.symlink(s, r, i)
                            : i(a)
                        : (n.dereference && (l = Rr.resolve(process.cwd(), l)),
                          Dr.isSrcSubdir(s, l)
                              ? i(new Error("Cannot copy '".concat(s, "' to a subdirectory of itself, '").concat(l, "'.")))
                              : e.isDirectory() && Dr.isSrcSubdir(l, s)
                              ? i(new Error("Cannot overwrite '".concat(l, "' with '").concat(s, "'.")))
                              : ew(s, r, i))
                );
            else return Oe.symlink(s, r, i);
        });
    }
    function ew(e, t, r) {
        Oe.unlink(t, n => (n ? r(n) : Oe.symlink(e, t, r)));
    }
    su.exports = H0;
});
var du = g((fO, fu) => {
    "use strict";
    var ce = we(),
        Pr = require("path"),
        tw = Ue().mkdirsSync,
        rw = Ao().utimesMillisSync,
        Fr = St();
    function nw(e, t, r) {
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
        let { srcStat: n, destStat: i } = Fr.checkPathsSync(e, t, "copy", r);
        return Fr.checkParentPathsSync(e, n, t, "copy"), iw(i, e, t, r);
    }
    function iw(e, t, r, n) {
        if (n.filter && !n.filter(t, r)) return;
        let i = Pr.dirname(r);
        return ce.existsSync(i) || tw(i), lu(e, t, r, n);
    }
    function ow(e, t, r, n) {
        if (!(n.filter && !n.filter(t, r))) return lu(e, t, r, n);
    }
    function lu(e, t, r, n) {
        let o = (n.dereference ? ce.statSync : ce.lstatSync)(t);
        if (o.isDirectory()) return dw(o, e, t, r, n);
        if (o.isFile() || o.isCharacterDevice() || o.isBlockDevice()) return sw(o, e, t, r, n);
        if (o.isSymbolicLink()) return mw(e, t, r, n);
        throw o.isSocket()
            ? new Error("Cannot copy a socket file: ".concat(t))
            : o.isFIFO()
            ? new Error("Cannot copy a FIFO pipe: ".concat(t))
            : new Error("Unknown file: ".concat(t));
    }
    function sw(e, t, r, n, i) {
        return t ? aw(e, r, n, i) : uu(e, r, n, i);
    }
    function aw(e, t, r, n) {
        if (n.overwrite) return ce.unlinkSync(r), uu(e, t, r, n);
        if (n.errorOnExist) throw new Error("'".concat(r, "' already exists"));
    }
    function uu(e, t, r, n) {
        return ce.copyFileSync(t, r), n.preserveTimestamps && lw(e.mode, t, r), To(r, e.mode);
    }
    function lw(e, t, r) {
        return uw(e) && cw(r, e), fw(t, r);
    }
    function uw(e) {
        return (e & 128) === 0;
    }
    function cw(e, t) {
        return To(e, t | 128);
    }
    function To(e, t) {
        return ce.chmodSync(e, t);
    }
    function fw(e, t) {
        let r = ce.statSync(e);
        return rw(t, r.atime, r.mtime);
    }
    function dw(e, t, r, n, i) {
        return t ? cu(r, n, i) : hw(e.mode, r, n, i);
    }
    function hw(e, t, r, n) {
        return ce.mkdirSync(r), cu(t, r, n), To(r, e);
    }
    function cu(e, t, r) {
        ce.readdirSync(e).forEach(n => pw(n, e, t, r));
    }
    function pw(e, t, r, n) {
        let i = Pr.join(t, e),
            o = Pr.join(r, e),
            { destStat: s } = Fr.checkPathsSync(i, o, "copy", n);
        return ow(s, i, o, n);
    }
    function mw(e, t, r, n) {
        let i = ce.readlinkSync(t);
        if ((n.dereference && (i = Pr.resolve(process.cwd(), i)), e)) {
            let o;
            try {
                o = ce.readlinkSync(r);
            } catch (s) {
                if (s.code === "EINVAL" || s.code === "UNKNOWN") return ce.symlinkSync(i, r);
                throw s;
            }
            if ((n.dereference && (o = Pr.resolve(process.cwd(), o)), Fr.isSrcSubdir(i, o)))
                throw new Error("Cannot copy '".concat(i, "' to a subdirectory of itself, '").concat(o, "'."));
            if (ce.statSync(r).isDirectory() && Fr.isSrcSubdir(o, i))
                throw new Error("Cannot overwrite '".concat(o, "' with '").concat(i, "'."));
            return gw(i, r);
        } else return ce.symlinkSync(i, r);
    }
    function gw(e, t) {
        return ce.unlinkSync(t), ce.symlinkSync(e, t);
    }
    fu.exports = nw;
});
var $n = g((dO, hu) => {
    "use strict";
    var ww = Ce().fromCallback;
    hu.exports = { copy: ww(au()), copySync: du() };
});
var Su = g((hO, vu) => {
    "use strict";
    var pu = we(),
        Eu = require("path"),
        W = require("assert"),
        qr = process.platform === "win32";
    function yu(e) {
        ["unlink", "chmod", "stat", "lstat", "rmdir", "readdir"].forEach(r => {
            (e[r] = e[r] || pu[r]), (r = r + "Sync"), (e[r] = e[r] || pu[r]);
        }),
            (e.maxBusyTries = e.maxBusyTries || 3);
    }
    function Co(e, t, r) {
        let n = 0;
        typeof t == "function" && ((r = t), (t = {})),
            W(e, "rimraf: missing path"),
            W.strictEqual(typeof e, "string", "rimraf: path should be a string"),
            W.strictEqual(typeof r, "function", "rimraf: callback function required"),
            W(t, "rimraf: invalid options argument provided"),
            W.strictEqual(typeof t, "object", "rimraf: options should be object"),
            yu(t),
            mu(e, t, function i(o) {
                if (o) {
                    if ((o.code === "EBUSY" || o.code === "ENOTEMPTY" || o.code === "EPERM") && n < t.maxBusyTries) {
                        n++;
                        let s = n * 100;
                        return setTimeout(() => mu(e, t, i), s);
                    }
                    o.code === "ENOENT" && (o = null);
                }
                r(o);
            });
    }
    function mu(e, t, r) {
        W(e),
            W(t),
            W(typeof r == "function"),
            t.lstat(e, (n, i) => {
                if (n && n.code === "ENOENT") return r(null);
                if (n && n.code === "EPERM" && qr) return gu(e, t, n, r);
                if (i && i.isDirectory()) return kn(e, t, n, r);
                t.unlink(e, o => {
                    if (o) {
                        if (o.code === "ENOENT") return r(null);
                        if (o.code === "EPERM") return qr ? gu(e, t, o, r) : kn(e, t, o, r);
                        if (o.code === "EISDIR") return kn(e, t, o, r);
                    }
                    return r(o);
                });
            });
    }
    function gu(e, t, r, n) {
        W(e),
            W(t),
            W(typeof n == "function"),
            t.chmod(e, 438, i => {
                i
                    ? n(i.code === "ENOENT" ? null : r)
                    : t.stat(e, (o, s) => {
                          o ? n(o.code === "ENOENT" ? null : r) : s.isDirectory() ? kn(e, t, r, n) : t.unlink(e, n);
                      });
            });
    }
    function wu(e, t, r) {
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
        n.isDirectory() ? Mn(e, t, r) : t.unlinkSync(e);
    }
    function kn(e, t, r, n) {
        W(e),
            W(t),
            W(typeof n == "function"),
            t.rmdir(e, i => {
                i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM")
                    ? Ew(e, t, n)
                    : i && i.code === "ENOTDIR"
                    ? n(r)
                    : n(i);
            });
    }
    function Ew(e, t, r) {
        W(e),
            W(t),
            W(typeof r == "function"),
            t.readdir(e, (n, i) => {
                if (n) return r(n);
                let o = i.length,
                    s;
                if (o === 0) return t.rmdir(e, r);
                i.forEach(a => {
                    Co(Eu.join(e, a), t, l => {
                        if (!s) {
                            if (l) return r((s = l));
                            --o === 0 && t.rmdir(e, r);
                        }
                    });
                });
            });
    }
    function _u(e, t) {
        let r;
        (t = t || {}),
            yu(t),
            W(e, "rimraf: missing path"),
            W.strictEqual(typeof e, "string", "rimraf: path should be a string"),
            W(t, "rimraf: missing options"),
            W.strictEqual(typeof t, "object", "rimraf: options should be object");
        try {
            r = t.lstatSync(e);
        } catch (n) {
            if (n.code === "ENOENT") return;
            n.code === "EPERM" && qr && wu(e, t, n);
        }
        try {
            r && r.isDirectory() ? Mn(e, t, null) : t.unlinkSync(e);
        } catch (n) {
            if (n.code === "ENOENT") return;
            if (n.code === "EPERM") return qr ? wu(e, t, n) : Mn(e, t, n);
            if (n.code !== "EISDIR") throw n;
            Mn(e, t, n);
        }
    }
    function Mn(e, t, r) {
        W(e), W(t);
        try {
            t.rmdirSync(e);
        } catch (n) {
            if (n.code === "ENOTDIR") throw r;
            if (n.code === "ENOTEMPTY" || n.code === "EEXIST" || n.code === "EPERM") yw(e, t);
            else if (n.code !== "ENOENT") throw n;
        }
    }
    function yw(e, t) {
        if ((W(e), W(t), t.readdirSync(e).forEach(r => _u(Eu.join(e, r), t)), qr)) {
            let r = Date.now();
            do
                try {
                    return t.rmdirSync(e, t);
                } catch {}
            while (Date.now() - r < 500);
        } else return t.rmdirSync(e, t);
    }
    vu.exports = Co;
    Co.sync = _u;
});
var Lr = g((pO, xu) => {
    "use strict";
    var Bn = we(),
        _w = Ce().fromCallback,
        Au = Su();
    function vw(e, t) {
        if (Bn.rm) return Bn.rm(e, { recursive: !0, force: !0 }, t);
        Au(e, t);
    }
    function Sw(e) {
        if (Bn.rmSync) return Bn.rmSync(e, { recursive: !0, force: !0 });
        Au.sync(e);
    }
    xu.exports = { remove: _w(vw), removeSync: Sw };
});
var Du = g((mO, Ru) => {
    "use strict";
    var Aw = Ce().fromPromise,
        bu = vt(),
        Ou = require("path"),
        Iu = Ue(),
        Nu = Lr(),
        Tu = Aw(async function (t) {
            let r;
            try {
                r = await bu.readdir(t);
            } catch {
                return Iu.mkdirs(t);
            }
            return Promise.all(r.map(n => Nu.remove(Ou.join(t, n))));
        });
    function Cu(e) {
        let t;
        try {
            t = bu.readdirSync(e);
        } catch {
            return Iu.mkdirsSync(e);
        }
        t.forEach(r => {
            (r = Ou.join(e, r)), Nu.removeSync(r);
        });
    }
    Ru.exports = { emptyDirSync: Cu, emptydirSync: Cu, emptyDir: Tu, emptydir: Tu };
});
var Lu = g((gO, qu) => {
    "use strict";
    var xw = Ce().fromCallback,
        Pu = require("path"),
        rt = we(),
        Fu = Ue();
    function Tw(e, t) {
        function r() {
            rt.writeFile(e, "", n => {
                if (n) return t(n);
                t();
            });
        }
        rt.stat(e, (n, i) => {
            if (!n && i.isFile()) return t();
            let o = Pu.dirname(e);
            rt.stat(o, (s, a) => {
                if (s)
                    return s.code === "ENOENT"
                        ? Fu.mkdirs(o, l => {
                              if (l) return t(l);
                              r();
                          })
                        : t(s);
                a.isDirectory()
                    ? r()
                    : rt.readdir(o, l => {
                          if (l) return t(l);
                      });
            });
        });
    }
    function Cw(e) {
        let t;
        try {
            t = rt.statSync(e);
        } catch {}
        if (t && t.isFile()) return;
        let r = Pu.dirname(e);
        try {
            rt.statSync(r).isDirectory() || rt.readdirSync(r);
        } catch (n) {
            if (n && n.code === "ENOENT") Fu.mkdirsSync(r);
            else throw n;
        }
        rt.writeFileSync(e, "");
    }
    qu.exports = { createFile: xw(Tw), createFileSync: Cw };
});
var Bu = g((wO, Mu) => {
    "use strict";
    var bw = Ce().fromCallback,
        Uu = require("path"),
        nt = we(),
        $u = Ue(),
        Ow = tt().pathExists,
        { areIdentical: ku } = St();
    function Iw(e, t, r) {
        function n(i, o) {
            nt.link(i, o, s => {
                if (s) return r(s);
                r(null);
            });
        }
        nt.lstat(t, (i, o) => {
            nt.lstat(e, (s, a) => {
                if (s) return (s.message = s.message.replace("lstat", "ensureLink")), r(s);
                if (o && ku(a, o)) return r(null);
                let l = Uu.dirname(t);
                Ow(l, (h, c) => {
                    if (h) return r(h);
                    if (c) return n(e, t);
                    $u.mkdirs(l, f => {
                        if (f) return r(f);
                        n(e, t);
                    });
                });
            });
        });
    }
    function Nw(e, t) {
        let r;
        try {
            r = nt.lstatSync(t);
        } catch {}
        try {
            let o = nt.lstatSync(e);
            if (r && ku(o, r)) return;
        } catch (o) {
            throw ((o.message = o.message.replace("lstat", "ensureLink")), o);
        }
        let n = Uu.dirname(t);
        return nt.existsSync(n) || $u.mkdirsSync(n), nt.linkSync(e, t);
    }
    Mu.exports = { createLink: bw(Iw), createLinkSync: Nw };
});
var ju = g((EO, Hu) => {
    "use strict";
    var it = require("path"),
        Ur = we(),
        Rw = tt().pathExists;
    function Dw(e, t, r) {
        if (it.isAbsolute(e))
            return Ur.lstat(e, n =>
                n ? ((n.message = n.message.replace("lstat", "ensureSymlink")), r(n)) : r(null, { toCwd: e, toDst: e })
            );
        {
            let n = it.dirname(t),
                i = it.join(n, e);
            return Rw(i, (o, s) =>
                o
                    ? r(o)
                    : s
                    ? r(null, { toCwd: i, toDst: e })
                    : Ur.lstat(e, a =>
                          a
                              ? ((a.message = a.message.replace("lstat", "ensureSymlink")), r(a))
                              : r(null, { toCwd: e, toDst: it.relative(n, e) })
                      )
            );
        }
    }
    function Pw(e, t) {
        let r;
        if (it.isAbsolute(e)) {
            if (((r = Ur.existsSync(e)), !r)) throw new Error("absolute srcpath does not exist");
            return { toCwd: e, toDst: e };
        } else {
            let n = it.dirname(t),
                i = it.join(n, e);
            if (((r = Ur.existsSync(i)), r)) return { toCwd: i, toDst: e };
            if (((r = Ur.existsSync(e)), !r)) throw new Error("relative srcpath does not exist");
            return { toCwd: e, toDst: it.relative(n, e) };
        }
    }
    Hu.exports = { symlinkPaths: Dw, symlinkPathsSync: Pw };
});
var Vu = g((yO, Gu) => {
    "use strict";
    var Wu = we();
    function Fw(e, t, r) {
        if (((r = typeof t == "function" ? t : r), (t = typeof t == "function" ? !1 : t), t)) return r(null, t);
        Wu.lstat(e, (n, i) => {
            if (n) return r(null, "file");
            (t = i && i.isDirectory() ? "dir" : "file"), r(null, t);
        });
    }
    function qw(e, t) {
        let r;
        if (t) return t;
        try {
            r = Wu.lstatSync(e);
        } catch {
            return "file";
        }
        return r && r.isDirectory() ? "dir" : "file";
    }
    Gu.exports = { symlinkType: Fw, symlinkTypeSync: qw };
});
var ec = g((_O, Zu) => {
    "use strict";
    var Lw = Ce().fromCallback,
        zu = require("path"),
        $e = vt(),
        Xu = Ue(),
        Uw = Xu.mkdirs,
        $w = Xu.mkdirsSync,
        Ku = ju(),
        kw = Ku.symlinkPaths,
        Mw = Ku.symlinkPathsSync,
        Ju = Vu(),
        Bw = Ju.symlinkType,
        Hw = Ju.symlinkTypeSync,
        jw = tt().pathExists,
        { areIdentical: Qu } = St();
    function Ww(e, t, r, n) {
        (n = typeof r == "function" ? r : n),
            (r = typeof r == "function" ? !1 : r),
            $e.lstat(t, (i, o) => {
                !i && o.isSymbolicLink()
                    ? Promise.all([$e.stat(e), $e.stat(t)]).then(([s, a]) => {
                          if (Qu(s, a)) return n(null);
                          Yu(e, t, r, n);
                      })
                    : Yu(e, t, r, n);
            });
    }
    function Yu(e, t, r, n) {
        kw(e, t, (i, o) => {
            if (i) return n(i);
            (e = o.toDst),
                Bw(o.toCwd, r, (s, a) => {
                    if (s) return n(s);
                    let l = zu.dirname(t);
                    jw(l, (h, c) => {
                        if (h) return n(h);
                        if (c) return $e.symlink(e, t, a, n);
                        Uw(l, f => {
                            if (f) return n(f);
                            $e.symlink(e, t, a, n);
                        });
                    });
                });
        });
    }
    function Gw(e, t, r) {
        let n;
        try {
            n = $e.lstatSync(t);
        } catch {}
        if (n && n.isSymbolicLink()) {
            let a = $e.statSync(e),
                l = $e.statSync(t);
            if (Qu(a, l)) return;
        }
        let i = Mw(e, t);
        (e = i.toDst), (r = Hw(i.toCwd, r));
        let o = zu.dirname(t);
        return $e.existsSync(o) || $w(o), $e.symlinkSync(e, t, r);
    }
    Zu.exports = { createSymlink: Lw(Ww), createSymlinkSync: Gw };
});
var lc = g((vO, ac) => {
    "use strict";
    var { createFile: tc, createFileSync: rc } = Lu(),
        { createLink: nc, createLinkSync: ic } = Bu(),
        { createSymlink: oc, createSymlinkSync: sc } = ec();
    ac.exports = {
        createFile: tc,
        createFileSync: rc,
        ensureFile: tc,
        ensureFileSync: rc,
        createLink: nc,
        createLinkSync: ic,
        ensureLink: nc,
        ensureLinkSync: ic,
        createSymlink: oc,
        createSymlinkSync: sc,
        ensureSymlink: oc,
        ensureSymlinkSync: sc
    };
});
var Hn = g((SO, uc) => {
    function Vw(e, { EOL: t = "\n", finalEOL: r = !0, replacer: n = null, spaces: i } = {}) {
        let o = r ? t : "";
        return JSON.stringify(e, n, i).replace(/\n/g, t) + o;
    }
    function Yw(e) {
        return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
    }
    uc.exports = { stringify: Vw, stripBom: Yw };
});
var hc = g((AO, dc) => {
    var Kt;
    try {
        Kt = we();
    } catch {
        Kt = require("fs");
    }
    var jn = Ce(),
        { stringify: cc, stripBom: fc } = Hn();
    async function zw(e, t = {}) {
        typeof t == "string" && (t = { encoding: t });
        let r = t.fs || Kt,
            n = "throws" in t ? t.throws : !0,
            i = await jn.fromCallback(r.readFile)(e, t);
        i = fc(i);
        let o;
        try {
            o = JSON.parse(i, t ? t.reviver : null);
        } catch (s) {
            if (n) throw ((s.message = "".concat(e, ": ").concat(s.message)), s);
            return null;
        }
        return o;
    }
    var Xw = jn.fromPromise(zw);
    function Kw(e, t = {}) {
        typeof t == "string" && (t = { encoding: t });
        let r = t.fs || Kt,
            n = "throws" in t ? t.throws : !0;
        try {
            let i = r.readFileSync(e, t);
            return (i = fc(i)), JSON.parse(i, t.reviver);
        } catch (i) {
            if (n) throw ((i.message = "".concat(e, ": ").concat(i.message)), i);
            return null;
        }
    }
    async function Jw(e, t, r = {}) {
        let n = r.fs || Kt,
            i = cc(t, r);
        await jn.fromCallback(n.writeFile)(e, i, r);
    }
    var Qw = jn.fromPromise(Jw);
    function Zw(e, t, r = {}) {
        let n = r.fs || Kt,
            i = cc(t, r);
        return n.writeFileSync(e, i, r);
    }
    var eE = { readFile: Xw, readFileSync: Kw, writeFile: Qw, writeFileSync: Zw };
    dc.exports = eE;
});
var mc = g((xO, pc) => {
    "use strict";
    var Wn = hc();
    pc.exports = {
        readJson: Wn.readFile,
        readJsonSync: Wn.readFileSync,
        writeJson: Wn.writeFile,
        writeJsonSync: Wn.writeFileSync
    };
});
var Gn = g((TO, Ec) => {
    "use strict";
    var tE = Ce().fromCallback,
        $r = we(),
        gc = require("path"),
        wc = Ue(),
        rE = tt().pathExists;
    function nE(e, t, r, n) {
        typeof r == "function" && ((n = r), (r = "utf8"));
        let i = gc.dirname(e);
        rE(i, (o, s) => {
            if (o) return n(o);
            if (s) return $r.writeFile(e, t, r, n);
            wc.mkdirs(i, a => {
                if (a) return n(a);
                $r.writeFile(e, t, r, n);
            });
        });
    }
    function iE(e, ...t) {
        let r = gc.dirname(e);
        if ($r.existsSync(r)) return $r.writeFileSync(e, ...t);
        wc.mkdirsSync(r), $r.writeFileSync(e, ...t);
    }
    Ec.exports = { outputFile: tE(nE), outputFileSync: iE };
});
var _c = g((CO, yc) => {
    "use strict";
    var { stringify: oE } = Hn(),
        { outputFile: sE } = Gn();
    async function aE(e, t, r = {}) {
        let n = oE(t, r);
        await sE(e, n, r);
    }
    yc.exports = aE;
});
var Sc = g((bO, vc) => {
    "use strict";
    var { stringify: lE } = Hn(),
        { outputFileSync: uE } = Gn();
    function cE(e, t, r) {
        let n = lE(t, r);
        uE(e, n, r);
    }
    vc.exports = cE;
});
var xc = g((OO, Ac) => {
    "use strict";
    var fE = Ce().fromPromise,
        Ee = mc();
    Ee.outputJson = fE(_c());
    Ee.outputJsonSync = Sc();
    Ee.outputJSON = Ee.outputJson;
    Ee.outputJSONSync = Ee.outputJsonSync;
    Ee.writeJSON = Ee.writeJson;
    Ee.writeJSONSync = Ee.writeJsonSync;
    Ee.readJSON = Ee.readJson;
    Ee.readJSONSync = Ee.readJsonSync;
    Ac.exports = Ee;
});
var Ic = g((IO, Oc) => {
    "use strict";
    var dE = we(),
        Oo = require("path"),
        hE = $n().copy,
        bc = Lr().remove,
        pE = Ue().mkdirp,
        mE = tt().pathExists,
        Tc = St();
    function gE(e, t, r, n) {
        typeof r == "function" && ((n = r), (r = {})), (r = r || {});
        let i = r.overwrite || r.clobber || !1;
        Tc.checkPaths(e, t, "move", r, (o, s) => {
            if (o) return n(o);
            let { srcStat: a, isChangingCase: l = !1 } = s;
            Tc.checkParentPaths(e, a, t, "move", h => {
                if (h) return n(h);
                if (wE(t)) return Cc(e, t, i, l, n);
                pE(Oo.dirname(t), c => (c ? n(c) : Cc(e, t, i, l, n)));
            });
        });
    }
    function wE(e) {
        let t = Oo.dirname(e);
        return Oo.parse(t).root === t;
    }
    function Cc(e, t, r, n, i) {
        if (n) return bo(e, t, r, i);
        if (r) return bc(t, o => (o ? i(o) : bo(e, t, r, i)));
        mE(t, (o, s) => (o ? i(o) : s ? i(new Error("dest already exists.")) : bo(e, t, r, i)));
    }
    function bo(e, t, r, n) {
        dE.rename(e, t, i => (i ? (i.code !== "EXDEV" ? n(i) : EE(e, t, r, n)) : n()));
    }
    function EE(e, t, r, n) {
        hE(e, t, { overwrite: r, errorOnExist: !0 }, o => (o ? n(o) : bc(e, n)));
    }
    Oc.exports = gE;
});
var Fc = g((NO, Pc) => {
    "use strict";
    var Rc = we(),
        No = require("path"),
        yE = $n().copySync,
        Dc = Lr().removeSync,
        _E = Ue().mkdirpSync,
        Nc = St();
    function vE(e, t, r) {
        r = r || {};
        let n = r.overwrite || r.clobber || !1,
            { srcStat: i, isChangingCase: o = !1 } = Nc.checkPathsSync(e, t, "move", r);
        return Nc.checkParentPathsSync(e, i, t, "move"), SE(t) || _E(No.dirname(t)), AE(e, t, n, o);
    }
    function SE(e) {
        let t = No.dirname(e);
        return No.parse(t).root === t;
    }
    function AE(e, t, r, n) {
        if (n) return Io(e, t, r);
        if (r) return Dc(t), Io(e, t, r);
        if (Rc.existsSync(t)) throw new Error("dest already exists.");
        return Io(e, t, r);
    }
    function Io(e, t, r) {
        try {
            Rc.renameSync(e, t);
        } catch (n) {
            if (n.code !== "EXDEV") throw n;
            return xE(e, t, r);
        }
    }
    function xE(e, t, r) {
        return yE(e, t, { overwrite: r, errorOnExist: !0 }), Dc(e);
    }
    Pc.exports = vE;
});
var Lc = g((RO, qc) => {
    "use strict";
    var TE = Ce().fromCallback;
    qc.exports = { move: TE(Ic()), moveSync: Fc() };
});
var Ve = g((DO, Uc) => {
    "use strict";
    Uc.exports = { ...vt(), ...$n(), ...Du(), ...lc(), ...xc(), ...Ue(), ...Lc(), ...Gn(), ...tt(), ...Lr() };
});
var Jt = g((PO, At) => {
    "use strict";
    function $c(e) {
        return typeof e > "u" || e === null;
    }
    function CE(e) {
        return typeof e == "object" && e !== null;
    }
    function bE(e) {
        return Array.isArray(e) ? e : $c(e) ? [] : [e];
    }
    function OE(e, t) {
        var r, n, i, o;
        if (t) for (o = Object.keys(t), r = 0, n = o.length; r < n; r += 1) (i = o[r]), (e[i] = t[i]);
        return e;
    }
    function IE(e, t) {
        var r = "",
            n;
        for (n = 0; n < t; n += 1) r += e;
        return r;
    }
    function NE(e) {
        return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
    }
    At.exports.isNothing = $c;
    At.exports.isObject = CE;
    At.exports.toArray = bE;
    At.exports.repeat = IE;
    At.exports.isNegativeZero = NE;
    At.exports.extend = OE;
});
var Qt = g((FO, Mc) => {
    "use strict";
    function kc(e, t) {
        var r = "",
            n = e.reason || "(unknown reason)";
        return e.mark
            ? (e.mark.name && (r += 'in "' + e.mark.name + '" '),
              (r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")"),
              !t && e.mark.snippet && (r += "\n\n" + e.mark.snippet),
              n + " " + r)
            : n;
    }
    function kr(e, t) {
        Error.call(this),
            (this.name = "YAMLException"),
            (this.reason = e),
            (this.mark = t),
            (this.message = kc(this, !1)),
            Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : (this.stack = new Error().stack || "");
    }
    kr.prototype = Object.create(Error.prototype);
    kr.prototype.constructor = kr;
    kr.prototype.toString = function (t) {
        return this.name + ": " + kc(this, t);
    };
    Mc.exports = kr;
});
var Hc = g((qO, Bc) => {
    "use strict";
    var Mr = Jt();
    function Ro(e, t, r, n, i) {
        var o = "",
            s = "",
            a = Math.floor(i / 2) - 1;
        return (
            n - t > a && ((o = " ... "), (t = n - a + o.length)),
            r - n > a && ((s = " ..."), (r = n + a - s.length)),
            { str: o + e.slice(t, r).replace(/\t/g, "\u2192") + s, pos: n - t + o.length }
        );
    }
    function Do(e, t) {
        return Mr.repeat(" ", t - e.length) + e;
    }
    function RE(e, t) {
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
            (h = Ro(e.buffer, n[s - l], i[s - l], e.position - (n[s] - n[s - l]), f)),
                (a = Mr.repeat(" ", t.indent) + Do((e.line - l + 1).toString(), c) + " | " + h.str + "\n" + a);
        for (
            h = Ro(e.buffer, n[s], i[s], e.position, f),
                a += Mr.repeat(" ", t.indent) + Do((e.line + 1).toString(), c) + " | " + h.str + "\n",
                a += Mr.repeat("-", t.indent + c + 3 + h.pos) + "^\n",
                l = 1;
            l <= t.linesAfter && !(s + l >= i.length);
            l++
        )
            (h = Ro(e.buffer, n[s + l], i[s + l], e.position - (n[s] - n[s + l]), f)),
                (a += Mr.repeat(" ", t.indent) + Do((e.line + l + 1).toString(), c) + " | " + h.str + "\n");
        return a.replace(/\n$/, "");
    }
    Bc.exports = RE;
});
var fe = g((LO, Wc) => {
    "use strict";
    var jc = Qt(),
        DE = [
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
        PE = ["scalar", "sequence", "mapping"];
    function FE(e) {
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
    function qE(e, t) {
        if (
            ((t = t || {}),
            Object.keys(t).forEach(function (r) {
                if (DE.indexOf(r) === -1)
                    throw new jc('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
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
            (this.styleAliases = FE(t.styleAliases || null)),
            PE.indexOf(this.kind) === -1)
        )
            throw new jc('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
    }
    Wc.exports = qE;
});
var qo = g((UO, Vc) => {
    "use strict";
    var Br = Qt(),
        Po = fe();
    function Gc(e, t) {
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
    function LE() {
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
    function Fo(e) {
        return this.extend(e);
    }
    Fo.prototype.extend = function (t) {
        var r = [],
            n = [];
        if (t instanceof Po) n.push(t);
        else if (Array.isArray(t)) n = n.concat(t);
        else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
            t.implicit && (r = r.concat(t.implicit)), t.explicit && (n = n.concat(t.explicit));
        else
            throw new Br(
                "Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })"
            );
        r.forEach(function (o) {
            if (!(o instanceof Po))
                throw new Br("Specified list of YAML types (or a single Type object) contains a non-Type object.");
            if (o.loadKind && o.loadKind !== "scalar")
                throw new Br(
                    "There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported."
                );
            if (o.multi)
                throw new Br(
                    "There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit."
                );
        }),
            n.forEach(function (o) {
                if (!(o instanceof Po))
                    throw new Br("Specified list of YAML types (or a single Type object) contains a non-Type object.");
            });
        var i = Object.create(Fo.prototype);
        return (
            (i.implicit = (this.implicit || []).concat(r)),
            (i.explicit = (this.explicit || []).concat(n)),
            (i.compiledImplicit = Gc(i, "implicit")),
            (i.compiledExplicit = Gc(i, "explicit")),
            (i.compiledTypeMap = LE(i.compiledImplicit, i.compiledExplicit)),
            i
        );
    };
    Vc.exports = Fo;
});
var Lo = g(($O, Yc) => {
    "use strict";
    var UE = fe();
    Yc.exports = new UE("tag:yaml.org,2002:str", {
        kind: "scalar",
        construct: function (e) {
            return e !== null ? e : "";
        }
    });
});
var Uo = g((kO, zc) => {
    "use strict";
    var $E = fe();
    zc.exports = new $E("tag:yaml.org,2002:seq", {
        kind: "sequence",
        construct: function (e) {
            return e !== null ? e : [];
        }
    });
});
var $o = g((MO, Xc) => {
    "use strict";
    var kE = fe();
    Xc.exports = new kE("tag:yaml.org,2002:map", {
        kind: "mapping",
        construct: function (e) {
            return e !== null ? e : {};
        }
    });
});
var ko = g((BO, Kc) => {
    "use strict";
    var ME = qo();
    Kc.exports = new ME({ explicit: [Lo(), Uo(), $o()] });
});
var Mo = g((HO, Jc) => {
    "use strict";
    var BE = fe();
    function HE(e) {
        if (e === null) return !0;
        var t = e.length;
        return (t === 1 && e === "~") || (t === 4 && (e === "null" || e === "Null" || e === "NULL"));
    }
    function jE() {
        return null;
    }
    function WE(e) {
        return e === null;
    }
    Jc.exports = new BE("tag:yaml.org,2002:null", {
        kind: "scalar",
        resolve: HE,
        construct: jE,
        predicate: WE,
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
var Bo = g((jO, Qc) => {
    "use strict";
    var GE = fe();
    function VE(e) {
        if (e === null) return !1;
        var t = e.length;
        return (
            (t === 4 && (e === "true" || e === "True" || e === "TRUE")) ||
            (t === 5 && (e === "false" || e === "False" || e === "FALSE"))
        );
    }
    function YE(e) {
        return e === "true" || e === "True" || e === "TRUE";
    }
    function zE(e) {
        return Object.prototype.toString.call(e) === "[object Boolean]";
    }
    Qc.exports = new GE("tag:yaml.org,2002:bool", {
        kind: "scalar",
        resolve: VE,
        construct: YE,
        predicate: zE,
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
var Ho = g((WO, Zc) => {
    "use strict";
    var XE = Jt(),
        KE = fe();
    function JE(e) {
        return (48 <= e && e <= 57) || (65 <= e && e <= 70) || (97 <= e && e <= 102);
    }
    function QE(e) {
        return 48 <= e && e <= 55;
    }
    function ZE(e) {
        return 48 <= e && e <= 57;
    }
    function ey(e) {
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
                        if (!JE(e.charCodeAt(r))) return !1;
                        n = !0;
                    }
                return n && i !== "_";
            }
            if (i === "o") {
                for (r++; r < t; r++)
                    if (((i = e[r]), i !== "_")) {
                        if (!QE(e.charCodeAt(r))) return !1;
                        n = !0;
                    }
                return n && i !== "_";
            }
        }
        if (i === "_") return !1;
        for (; r < t; r++)
            if (((i = e[r]), i !== "_")) {
                if (!ZE(e.charCodeAt(r))) return !1;
                n = !0;
            }
        return !(!n || i === "_");
    }
    function ty(e) {
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
    function ry(e) {
        return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !XE.isNegativeZero(e);
    }
    Zc.exports = new KE("tag:yaml.org,2002:int", {
        kind: "scalar",
        resolve: ey,
        construct: ty,
        predicate: ry,
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
var jo = g((GO, tf) => {
    "use strict";
    var ef = Jt(),
        ny = fe(),
        iy = new RegExp(
            "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
        );
    function oy(e) {
        return !(e === null || !iy.test(e) || e[e.length - 1] === "_");
    }
    function sy(e) {
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
    var ay = /^[-+]?[0-9]+e/;
    function ly(e, t) {
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
        else if (ef.isNegativeZero(e)) return "-0.0";
        return (r = e.toString(10)), ay.test(r) ? r.replace("e", ".e") : r;
    }
    function uy(e) {
        return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || ef.isNegativeZero(e));
    }
    tf.exports = new ny("tag:yaml.org,2002:float", {
        kind: "scalar",
        resolve: oy,
        construct: sy,
        predicate: uy,
        represent: ly,
        defaultStyle: "lowercase"
    });
});
var Wo = g((VO, rf) => {
    "use strict";
    rf.exports = ko().extend({ implicit: [Mo(), Bo(), Ho(), jo()] });
});
var Go = g((YO, nf) => {
    "use strict";
    nf.exports = Wo();
});
var Vo = g((zO, af) => {
    "use strict";
    var cy = fe(),
        of = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),
        sf = new RegExp(
            "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
        );
    function fy(e) {
        return e === null ? !1 : of.exec(e) !== null || sf.exec(e) !== null;
    }
    function dy(e) {
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
        if (((t = of.exec(e)), t === null && (t = sf.exec(e)), t === null)) throw new Error("Date resolve error");
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
    function hy(e) {
        return e.toISOString();
    }
    af.exports = new cy("tag:yaml.org,2002:timestamp", {
        kind: "scalar",
        resolve: fy,
        construct: dy,
        instanceOf: Date,
        represent: hy
    });
});
var Yo = g((XO, lf) => {
    "use strict";
    var py = fe();
    function my(e) {
        return e === "<<" || e === null;
    }
    lf.exports = new py("tag:yaml.org,2002:merge", { kind: "scalar", resolve: my });
});
var Xo = g((KO, uf) => {
    "use strict";
    var gy = fe(),
        zo = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
    function wy(e) {
        if (e === null) return !1;
        var t,
            r,
            n = 0,
            i = e.length,
            o = zo;
        for (r = 0; r < i; r++)
            if (((t = o.indexOf(e.charAt(r))), !(t > 64))) {
                if (t < 0) return !1;
                n += 6;
            }
        return n % 8 === 0;
    }
    function Ey(e) {
        var t,
            r,
            n = e.replace(/[\r\n=]/g, ""),
            i = n.length,
            o = zo,
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
    function yy(e) {
        var t = "",
            r = 0,
            n,
            i,
            o = e.length,
            s = zo;
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
    function _y(e) {
        return Object.prototype.toString.call(e) === "[object Uint8Array]";
    }
    uf.exports = new gy("tag:yaml.org,2002:binary", { kind: "scalar", resolve: wy, construct: Ey, predicate: _y, represent: yy });
});
var Ko = g((JO, cf) => {
    "use strict";
    var vy = fe(),
        Sy = Object.prototype.hasOwnProperty,
        Ay = Object.prototype.toString;
    function xy(e) {
        if (e === null) return !0;
        var t = [],
            r,
            n,
            i,
            o,
            s,
            a = e;
        for (r = 0, n = a.length; r < n; r += 1) {
            if (((i = a[r]), (s = !1), Ay.call(i) !== "[object Object]")) return !1;
            for (o in i)
                if (Sy.call(i, o))
                    if (!s) s = !0;
                    else return !1;
            if (!s) return !1;
            if (t.indexOf(o) === -1) t.push(o);
            else return !1;
        }
        return !0;
    }
    function Ty(e) {
        return e !== null ? e : [];
    }
    cf.exports = new vy("tag:yaml.org,2002:omap", { kind: "sequence", resolve: xy, construct: Ty });
});
var Jo = g((QO, ff) => {
    "use strict";
    var Cy = fe(),
        by = Object.prototype.toString;
    function Oy(e) {
        if (e === null) return !0;
        var t,
            r,
            n,
            i,
            o,
            s = e;
        for (o = new Array(s.length), t = 0, r = s.length; t < r; t += 1) {
            if (((n = s[t]), by.call(n) !== "[object Object]" || ((i = Object.keys(n)), i.length !== 1))) return !1;
            o[t] = [i[0], n[i[0]]];
        }
        return !0;
    }
    function Iy(e) {
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
    ff.exports = new Cy("tag:yaml.org,2002:pairs", { kind: "sequence", resolve: Oy, construct: Iy });
});
var Qo = g((ZO, df) => {
    "use strict";
    var Ny = fe(),
        Ry = Object.prototype.hasOwnProperty;
    function Dy(e) {
        if (e === null) return !0;
        var t,
            r = e;
        for (t in r) if (Ry.call(r, t) && r[t] !== null) return !1;
        return !0;
    }
    function Py(e) {
        return e !== null ? e : {};
    }
    df.exports = new Ny("tag:yaml.org,2002:set", { kind: "mapping", resolve: Dy, construct: Py });
});
var Vn = g((eI, hf) => {
    "use strict";
    hf.exports = Go().extend({ implicit: [Vo(), Yo()], explicit: [Xo(), Ko(), Jo(), Qo()] });
});
var If = g((tI, rs) => {
    "use strict";
    var Tt = Jt(),
        _f = Qt(),
        Fy = Hc(),
        qy = Vn(),
        st = Object.prototype.hasOwnProperty,
        Yn = 1,
        vf = 2,
        Sf = 3,
        zn = 4,
        Zo = 1,
        Ly = 2,
        pf = 3,
        Uy =
            /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,
        $y = /[\x85\u2028\u2029]/,
        ky = /[,\[\]\{\}]/,
        Af = /^(?:!|!!|![a-z\-]+!)$/i,
        xf = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
    function mf(e) {
        return Object.prototype.toString.call(e);
    }
    function Me(e) {
        return e === 10 || e === 13;
    }
    function Ct(e) {
        return e === 9 || e === 32;
    }
    function Ie(e) {
        return e === 9 || e === 32 || e === 10 || e === 13;
    }
    function Zt(e) {
        return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
    }
    function My(e) {
        var t;
        return 48 <= e && e <= 57 ? e - 48 : ((t = e | 32), 97 <= t && t <= 102 ? t - 97 + 10 : -1);
    }
    function By(e) {
        return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
    }
    function Hy(e) {
        return 48 <= e && e <= 57 ? e - 48 : -1;
    }
    function gf(e) {
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
    function jy(e) {
        return e <= 65535
            ? String.fromCharCode(e)
            : String.fromCharCode(((e - 65536) >> 10) + 55296, ((e - 65536) & 1023) + 56320);
    }
    var Tf = new Array(256),
        Cf = new Array(256);
    for (xt = 0; xt < 256; xt++) (Tf[xt] = gf(xt) ? 1 : 0), (Cf[xt] = gf(xt));
    var xt;
    function Wy(e, t) {
        (this.input = e),
            (this.filename = t.filename || null),
            (this.schema = t.schema || qy),
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
    function bf(e, t) {
        var r = {
            name: e.filename,
            buffer: e.input.slice(0, -1),
            position: e.position,
            line: e.line,
            column: e.position - e.lineStart
        };
        return (r.snippet = Fy(r)), new _f(t, r);
    }
    function O(e, t) {
        throw bf(e, t);
    }
    function Xn(e, t) {
        e.onWarning && e.onWarning.call(null, bf(e, t));
    }
    var wf = {
        YAML: function (t, r, n) {
            var i, o, s;
            t.version !== null && O(t, "duplication of %YAML directive"),
                n.length !== 1 && O(t, "YAML directive accepts exactly one argument"),
                (i = /^([0-9]+)\.([0-9]+)$/.exec(n[0])),
                i === null && O(t, "ill-formed argument of the YAML directive"),
                (o = parseInt(i[1], 10)),
                (s = parseInt(i[2], 10)),
                o !== 1 && O(t, "unacceptable YAML version of the document"),
                (t.version = n[0]),
                (t.checkLineBreaks = s < 2),
                s !== 1 && s !== 2 && Xn(t, "unsupported YAML version of the document");
        },
        TAG: function (t, r, n) {
            var i, o;
            n.length !== 2 && O(t, "TAG directive accepts exactly two arguments"),
                (i = n[0]),
                (o = n[1]),
                Af.test(i) || O(t, "ill-formed tag handle (first argument) of the TAG directive"),
                st.call(t.tagMap, i) && O(t, 'there is a previously declared suffix for "' + i + '" tag handle'),
                xf.test(o) || O(t, "ill-formed tag prefix (second argument) of the TAG directive");
            try {
                o = decodeURIComponent(o);
            } catch {
                O(t, "tag prefix is malformed: " + o);
            }
            t.tagMap[i] = o;
        }
    };
    function ot(e, t, r, n) {
        var i, o, s, a;
        if (t < r) {
            if (((a = e.input.slice(t, r)), n))
                for (i = 0, o = a.length; i < o; i += 1)
                    (s = a.charCodeAt(i)), s === 9 || (32 <= s && s <= 1114111) || O(e, "expected valid JSON character");
            else Uy.test(a) && O(e, "the stream contains non-printable characters");
            e.result += a;
        }
    }
    function Ef(e, t, r, n) {
        var i, o, s, a;
        for (
            Tt.isObject(r) || O(e, "cannot merge mappings; the provided source object is unacceptable"),
                i = Object.keys(r),
                s = 0,
                a = i.length;
            s < a;
            s += 1
        )
            (o = i[s]), st.call(t, o) || ((t[o] = r[o]), (n[o] = !0));
    }
    function er(e, t, r, n, i, o, s, a, l) {
        var h, c;
        if (Array.isArray(i))
            for (i = Array.prototype.slice.call(i), h = 0, c = i.length; h < c; h += 1)
                Array.isArray(i[h]) && O(e, "nested arrays are not supported inside keys"),
                    typeof i == "object" && mf(i[h]) === "[object Object]" && (i[h] = "[object Object]");
        if (
            (typeof i == "object" && mf(i) === "[object Object]" && (i = "[object Object]"),
            (i = String(i)),
            t === null && (t = {}),
            n === "tag:yaml.org,2002:merge")
        )
            if (Array.isArray(o)) for (h = 0, c = o.length; h < c; h += 1) Ef(e, t, o[h], r);
            else Ef(e, t, o, r);
        else
            !e.json &&
                !st.call(r, i) &&
                st.call(t, i) &&
                ((e.line = s || e.line),
                (e.lineStart = a || e.lineStart),
                (e.position = l || e.position),
                O(e, "duplicated mapping key")),
                i === "__proto__"
                    ? Object.defineProperty(t, i, { configurable: !0, enumerable: !0, writable: !0, value: o })
                    : (t[i] = o),
                delete r[i];
        return t;
    }
    function es(e) {
        var t;
        (t = e.input.charCodeAt(e.position)),
            t === 10
                ? e.position++
                : t === 13
                ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++)
                : O(e, "a line break is expected"),
            (e.line += 1),
            (e.lineStart = e.position),
            (e.firstTabInLine = -1);
    }
    function ee(e, t, r) {
        for (var n = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
            for (; Ct(i); )
                i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), (i = e.input.charCodeAt(++e.position));
            if (t && i === 35)
                do i = e.input.charCodeAt(++e.position);
                while (i !== 10 && i !== 13 && i !== 0);
            if (Me(i))
                for (es(e), i = e.input.charCodeAt(e.position), n++, e.lineIndent = 0; i === 32; )
                    e.lineIndent++, (i = e.input.charCodeAt(++e.position));
            else break;
        }
        return r !== -1 && n !== 0 && e.lineIndent < r && Xn(e, "deficient indentation"), n;
    }
    function Kn(e) {
        var t = e.position,
            r;
        return (
            (r = e.input.charCodeAt(t)),
            !!(
                (r === 45 || r === 46) &&
                r === e.input.charCodeAt(t + 1) &&
                r === e.input.charCodeAt(t + 2) &&
                ((t += 3), (r = e.input.charCodeAt(t)), r === 0 || Ie(r))
            )
        );
    }
    function ts(e, t) {
        t === 1 ? (e.result += " ") : t > 1 && (e.result += Tt.repeat("\n", t - 1));
    }
    function Gy(e, t, r) {
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
            Ie(p) ||
                Zt(p) ||
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
                ((p === 63 || p === 45) && ((i = e.input.charCodeAt(e.position + 1)), Ie(i) || (r && Zt(i)))))
        )
            return !1;
        for (e.kind = "scalar", e.result = "", o = s = e.position, a = !1; p !== 0; ) {
            if (p === 58) {
                if (((i = e.input.charCodeAt(e.position + 1)), Ie(i) || (r && Zt(i)))) break;
            } else if (p === 35) {
                if (((n = e.input.charCodeAt(e.position - 1)), Ie(n))) break;
            } else {
                if ((e.position === e.lineStart && Kn(e)) || (r && Zt(p))) break;
                if (Me(p))
                    if (((l = e.line), (h = e.lineStart), (c = e.lineIndent), ee(e, !1, -1), e.lineIndent >= t)) {
                        (a = !0), (p = e.input.charCodeAt(e.position));
                        continue;
                    } else {
                        (e.position = s), (e.line = l), (e.lineStart = h), (e.lineIndent = c);
                        break;
                    }
            }
            a && (ot(e, o, s, !1), ts(e, e.line - l), (o = s = e.position), (a = !1)),
                Ct(p) || (s = e.position + 1),
                (p = e.input.charCodeAt(++e.position));
        }
        return ot(e, o, s, !1), e.result ? !0 : ((e.kind = f), (e.result = m), !1);
    }
    function Vy(e, t) {
        var r, n, i;
        if (((r = e.input.charCodeAt(e.position)), r !== 39)) return !1;
        for (e.kind = "scalar", e.result = "", e.position++, n = i = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
            if (r === 39)
                if ((ot(e, n, e.position, !0), (r = e.input.charCodeAt(++e.position)), r === 39))
                    (n = e.position), e.position++, (i = e.position);
                else return !0;
            else
                Me(r)
                    ? (ot(e, n, i, !0), ts(e, ee(e, !1, t)), (n = i = e.position))
                    : e.position === e.lineStart && Kn(e)
                    ? O(e, "unexpected end of the document within a single quoted scalar")
                    : (e.position++, (i = e.position));
        O(e, "unexpected end of the stream within a single quoted scalar");
    }
    function Yy(e, t) {
        var r, n, i, o, s, a;
        if (((a = e.input.charCodeAt(e.position)), a !== 34)) return !1;
        for (e.kind = "scalar", e.result = "", e.position++, r = n = e.position; (a = e.input.charCodeAt(e.position)) !== 0; ) {
            if (a === 34) return ot(e, r, e.position, !0), e.position++, !0;
            if (a === 92) {
                if ((ot(e, r, e.position, !0), (a = e.input.charCodeAt(++e.position)), Me(a))) ee(e, !1, t);
                else if (a < 256 && Tf[a]) (e.result += Cf[a]), e.position++;
                else if ((s = By(a)) > 0) {
                    for (i = s, o = 0; i > 0; i--)
                        (a = e.input.charCodeAt(++e.position)),
                            (s = My(a)) >= 0 ? (o = (o << 4) + s) : O(e, "expected hexadecimal character");
                    (e.result += jy(o)), e.position++;
                } else O(e, "unknown escape sequence");
                r = n = e.position;
            } else
                Me(a)
                    ? (ot(e, r, n, !0), ts(e, ee(e, !1, t)), (r = n = e.position))
                    : e.position === e.lineStart && Kn(e)
                    ? O(e, "unexpected end of the document within a double quoted scalar")
                    : (e.position++, (n = e.position));
        }
        O(e, "unexpected end of the stream within a double quoted scalar");
    }
    function zy(e, t) {
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
            x,
            A;
        if (((A = e.input.charCodeAt(e.position)), A === 91)) (c = 93), (p = !1), (a = []);
        else if (A === 123) (c = 125), (p = !0), (a = {});
        else return !1;
        for (e.anchor !== null && (e.anchorMap[e.anchor] = a), A = e.input.charCodeAt(++e.position); A !== 0; ) {
            if ((ee(e, !0, t), (A = e.input.charCodeAt(e.position)), A === c))
                return e.position++, (e.tag = s), (e.anchor = l), (e.kind = p ? "mapping" : "sequence"), (e.result = a), !0;
            r
                ? A === 44 && O(e, "expected the node content, but found ','")
                : O(e, "missed comma between flow collection entries"),
                (v = _ = x = null),
                (f = m = !1),
                A === 63 && ((h = e.input.charCodeAt(e.position + 1)), Ie(h) && ((f = m = !0), e.position++, ee(e, !0, t))),
                (n = e.line),
                (i = e.lineStart),
                (o = e.position),
                tr(e, t, Yn, !1, !0),
                (v = e.tag),
                (_ = e.result),
                ee(e, !0, t),
                (A = e.input.charCodeAt(e.position)),
                (m || e.line === n) &&
                    A === 58 &&
                    ((f = !0), (A = e.input.charCodeAt(++e.position)), ee(e, !0, t), tr(e, t, Yn, !1, !0), (x = e.result)),
                p ? er(e, a, y, v, _, x, n, i, o) : f ? a.push(er(e, null, y, v, _, x, n, i, o)) : a.push(_),
                ee(e, !0, t),
                (A = e.input.charCodeAt(e.position)),
                A === 44 ? ((r = !0), (A = e.input.charCodeAt(++e.position))) : (r = !1);
        }
        O(e, "unexpected end of the stream within a flow collection");
    }
    function Xy(e, t) {
        var r,
            n,
            i = Zo,
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
                Zo === i ? (i = f === 43 ? pf : Ly) : O(e, "repeat of a chomping mode identifier");
            else if ((c = Hy(f)) >= 0)
                c === 0
                    ? O(e, "bad explicit indentation width of a block scalar; it cannot be less than one")
                    : s
                    ? O(e, "repeat of an indentation width identifier")
                    : ((a = t + c - 1), (s = !0));
            else break;
        if (Ct(f)) {
            do f = e.input.charCodeAt(++e.position);
            while (Ct(f));
            if (f === 35)
                do f = e.input.charCodeAt(++e.position);
                while (!Me(f) && f !== 0);
        }
        for (; f !== 0; ) {
            for (es(e), e.lineIndent = 0, f = e.input.charCodeAt(e.position); (!s || e.lineIndent < a) && f === 32; )
                e.lineIndent++, (f = e.input.charCodeAt(++e.position));
            if ((!s && e.lineIndent > a && (a = e.lineIndent), Me(f))) {
                l++;
                continue;
            }
            if (e.lineIndent < a) {
                i === pf ? (e.result += Tt.repeat("\n", o ? 1 + l : l)) : i === Zo && o && (e.result += "\n");
                break;
            }
            for (
                n
                    ? Ct(f)
                        ? ((h = !0), (e.result += Tt.repeat("\n", o ? 1 + l : l)))
                        : h
                        ? ((h = !1), (e.result += Tt.repeat("\n", l + 1)))
                        : l === 0
                        ? o && (e.result += " ")
                        : (e.result += Tt.repeat("\n", l))
                    : (e.result += Tt.repeat("\n", o ? 1 + l : l)),
                    o = !0,
                    s = !0,
                    l = 0,
                    r = e.position;
                !Me(f) && f !== 0;

            )
                f = e.input.charCodeAt(++e.position);
            ot(e, r, e.position, !1);
        }
        return !0;
    }
    function yf(e, t) {
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
            (e.firstTabInLine !== -1 && ((e.position = e.firstTabInLine), O(e, "tab characters must not be used in indentation")),
            !(l !== 45 || ((s = e.input.charCodeAt(e.position + 1)), !Ie(s))));

        ) {
            if (((a = !0), e.position++, ee(e, !0, -1) && e.lineIndent <= t)) {
                o.push(null), (l = e.input.charCodeAt(e.position));
                continue;
            }
            if (
                ((r = e.line),
                tr(e, t, Sf, !1, !0),
                o.push(e.result),
                ee(e, !0, -1),
                (l = e.input.charCodeAt(e.position)),
                (e.line === r || e.lineIndent > t) && l !== 0)
            )
                O(e, "bad indentation of a sequence entry");
            else if (e.lineIndent < t) break;
        }
        return a ? ((e.tag = n), (e.anchor = i), (e.kind = "sequence"), (e.result = o), !0) : !1;
    }
    function Ky(e, t, r) {
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
            x = !1,
            A;
        if (e.firstTabInLine !== -1) return !1;
        for (e.anchor !== null && (e.anchorMap[e.anchor] = f), A = e.input.charCodeAt(e.position); A !== 0; ) {
            if (
                (!v &&
                    e.firstTabInLine !== -1 &&
                    ((e.position = e.firstTabInLine), O(e, "tab characters must not be used in indentation")),
                (n = e.input.charCodeAt(e.position + 1)),
                (o = e.line),
                (A === 63 || A === 58) && Ie(n))
            )
                A === 63
                    ? (v && (er(e, f, m, p, y, null, s, a, l), (p = y = _ = null)), (x = !0), (v = !0), (i = !0))
                    : v
                    ? ((v = !1), (i = !0))
                    : O(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),
                    (e.position += 1),
                    (A = n);
            else {
                if (((s = e.line), (a = e.lineStart), (l = e.position), !tr(e, r, vf, !1, !0))) break;
                if (e.line === o) {
                    for (A = e.input.charCodeAt(e.position); Ct(A); ) A = e.input.charCodeAt(++e.position);
                    if (A === 58)
                        (A = e.input.charCodeAt(++e.position)),
                            Ie(A) ||
                                O(e, "a whitespace character is expected after the key-value separator within a block mapping"),
                            v && (er(e, f, m, p, y, null, s, a, l), (p = y = _ = null)),
                            (x = !0),
                            (v = !1),
                            (i = !1),
                            (p = e.tag),
                            (y = e.result);
                    else if (x) O(e, "can not read an implicit mapping pair; a colon is missed");
                    else return (e.tag = h), (e.anchor = c), !0;
                } else if (x) O(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
                else return (e.tag = h), (e.anchor = c), !0;
            }
            if (
                ((e.line === o || e.lineIndent > t) &&
                    (v && ((s = e.line), (a = e.lineStart), (l = e.position)),
                    tr(e, t, zn, !0, i) && (v ? (y = e.result) : (_ = e.result)),
                    v || (er(e, f, m, p, y, _, s, a, l), (p = y = _ = null)),
                    ee(e, !0, -1),
                    (A = e.input.charCodeAt(e.position))),
                (e.line === o || e.lineIndent > t) && A !== 0)
            )
                O(e, "bad indentation of a mapping entry");
            else if (e.lineIndent < t) break;
        }
        return v && er(e, f, m, p, y, null, s, a, l), x && ((e.tag = h), (e.anchor = c), (e.kind = "mapping"), (e.result = f)), x;
    }
    function Jy(e) {
        var t,
            r = !1,
            n = !1,
            i,
            o,
            s;
        if (((s = e.input.charCodeAt(e.position)), s !== 33)) return !1;
        if (
            (e.tag !== null && O(e, "duplication of a tag property"),
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
                : O(e, "unexpected end of the stream within a verbatim tag");
        } else {
            for (; s !== 0 && !Ie(s); )
                s === 33 &&
                    (n
                        ? O(e, "tag suffix cannot contain exclamation marks")
                        : ((i = e.input.slice(t - 1, e.position + 1)),
                          Af.test(i) || O(e, "named tag handle cannot contain such characters"),
                          (n = !0),
                          (t = e.position + 1))),
                    (s = e.input.charCodeAt(++e.position));
            (o = e.input.slice(t, e.position)), ky.test(o) && O(e, "tag suffix cannot contain flow indicator characters");
        }
        o && !xf.test(o) && O(e, "tag name cannot contain such characters: " + o);
        try {
            o = decodeURIComponent(o);
        } catch {
            O(e, "tag name is malformed: " + o);
        }
        return (
            r
                ? (e.tag = o)
                : st.call(e.tagMap, i)
                ? (e.tag = e.tagMap[i] + o)
                : i === "!"
                ? (e.tag = "!" + o)
                : i === "!!"
                ? (e.tag = "tag:yaml.org,2002:" + o)
                : O(e, 'undeclared tag handle "' + i + '"'),
            !0
        );
    }
    function Qy(e) {
        var t, r;
        if (((r = e.input.charCodeAt(e.position)), r !== 38)) return !1;
        for (
            e.anchor !== null && O(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), t = e.position;
            r !== 0 && !Ie(r) && !Zt(r);

        )
            r = e.input.charCodeAt(++e.position);
        return (
            e.position === t && O(e, "name of an anchor node must contain at least one character"),
            (e.anchor = e.input.slice(t, e.position)),
            !0
        );
    }
    function Zy(e) {
        var t, r, n;
        if (((n = e.input.charCodeAt(e.position)), n !== 42)) return !1;
        for (n = e.input.charCodeAt(++e.position), t = e.position; n !== 0 && !Ie(n) && !Zt(n); )
            n = e.input.charCodeAt(++e.position);
        return (
            e.position === t && O(e, "name of an alias node must contain at least one character"),
            (r = e.input.slice(t, e.position)),
            st.call(e.anchorMap, r) || O(e, 'unidentified alias "' + r + '"'),
            (e.result = e.anchorMap[r]),
            ee(e, !0, -1),
            !0
        );
    }
    function tr(e, t, r, n, i) {
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
            (o = s = a = zn === r || Sf === r),
            n &&
                ee(e, !0, -1) &&
                ((h = !0), e.lineIndent > t ? (l = 1) : e.lineIndent === t ? (l = 0) : e.lineIndent < t && (l = -1)),
            l === 1)
        )
            for (; Jy(e) || Qy(e); )
                ee(e, !0, -1)
                    ? ((h = !0),
                      (a = o),
                      e.lineIndent > t ? (l = 1) : e.lineIndent === t ? (l = 0) : e.lineIndent < t && (l = -1))
                    : (a = !1);
        if (
            (a && (a = h || i),
            (l === 1 || zn === r) &&
                (Yn === r || vf === r ? (_ = t) : (_ = t + 1),
                (v = e.position - e.lineStart),
                l === 1
                    ? (a && (yf(e, v) || Ky(e, v, _))) || zy(e, _)
                        ? (c = !0)
                        : ((s && Xy(e, _)) || Vy(e, _) || Yy(e, _)
                              ? (c = !0)
                              : Zy(e)
                              ? ((c = !0),
                                (e.tag !== null || e.anchor !== null) && O(e, "alias node should not have any properties"))
                              : Gy(e, _, Yn === r) && ((c = !0), e.tag === null && (e.tag = "?")),
                          e.anchor !== null && (e.anchorMap[e.anchor] = e.result))
                    : l === 0 && (c = a && yf(e, v))),
            e.tag === null)
        )
            e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        else if (e.tag === "?") {
            for (
                e.result !== null &&
                    e.kind !== "scalar" &&
                    O(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'),
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
            if (st.call(e.typeMap[e.kind || "fallback"], e.tag)) y = e.typeMap[e.kind || "fallback"][e.tag];
            else
                for (y = null, p = e.typeMap.multi[e.kind || "fallback"], f = 0, m = p.length; f < m; f += 1)
                    if (e.tag.slice(0, p[f].tag.length) === p[f].tag) {
                        y = p[f];
                        break;
                    }
            y || O(e, "unknown tag !<" + e.tag + ">"),
                e.result !== null &&
                    y.kind !== e.kind &&
                    O(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + y.kind + '", not "' + e.kind + '"'),
                y.resolve(e.result, e.tag)
                    ? ((e.result = y.construct(e.result, e.tag)), e.anchor !== null && (e.anchorMap[e.anchor] = e.result))
                    : O(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
        }
        return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || c;
    }
    function e_(e) {
        var t = e.position,
            r,
            n,
            i,
            o = !1,
            s;
        for (
            e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = Object.create(null), e.anchorMap = Object.create(null);
            (s = e.input.charCodeAt(e.position)) !== 0 &&
            (ee(e, !0, -1), (s = e.input.charCodeAt(e.position)), !(e.lineIndent > 0 || s !== 37));

        ) {
            for (o = !0, s = e.input.charCodeAt(++e.position), r = e.position; s !== 0 && !Ie(s); )
                s = e.input.charCodeAt(++e.position);
            for (
                n = e.input.slice(r, e.position),
                    i = [],
                    n.length < 1 && O(e, "directive name must not be less than one character in length");
                s !== 0;

            ) {
                for (; Ct(s); ) s = e.input.charCodeAt(++e.position);
                if (s === 35) {
                    do s = e.input.charCodeAt(++e.position);
                    while (s !== 0 && !Me(s));
                    break;
                }
                if (Me(s)) break;
                for (r = e.position; s !== 0 && !Ie(s); ) s = e.input.charCodeAt(++e.position);
                i.push(e.input.slice(r, e.position));
            }
            s !== 0 && es(e), st.call(wf, n) ? wf[n](e, n, i) : Xn(e, 'unknown document directive "' + n + '"');
        }
        if (
            (ee(e, !0, -1),
            e.lineIndent === 0 &&
            e.input.charCodeAt(e.position) === 45 &&
            e.input.charCodeAt(e.position + 1) === 45 &&
            e.input.charCodeAt(e.position + 2) === 45
                ? ((e.position += 3), ee(e, !0, -1))
                : o && O(e, "directives end mark is expected"),
            tr(e, e.lineIndent - 1, zn, !1, !0),
            ee(e, !0, -1),
            e.checkLineBreaks &&
                $y.test(e.input.slice(t, e.position)) &&
                Xn(e, "non-ASCII line breaks are interpreted as content"),
            e.documents.push(e.result),
            e.position === e.lineStart && Kn(e))
        ) {
            e.input.charCodeAt(e.position) === 46 && ((e.position += 3), ee(e, !0, -1));
            return;
        }
        if (e.position < e.length - 1) O(e, "end of the stream or a document separator is expected");
        else return;
    }
    function Of(e, t) {
        (e = String(e)),
            (t = t || {}),
            e.length !== 0 &&
                (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += "\n"),
                e.charCodeAt(0) === 65279 && (e = e.slice(1)));
        var r = new Wy(e, t),
            n = e.indexOf("\0");
        for (
            n !== -1 && ((r.position = n), O(r, "null byte is not allowed in input")), r.input += "\0";
            r.input.charCodeAt(r.position) === 32;

        )
            (r.lineIndent += 1), (r.position += 1);
        for (; r.position < r.length - 1; ) e_(r);
        return r.documents;
    }
    function t_(e, t, r) {
        t !== null && typeof t == "object" && typeof r > "u" && ((r = t), (t = null));
        var n = Of(e, r);
        if (typeof t != "function") return n;
        for (var i = 0, o = n.length; i < o; i += 1) t(n[i]);
    }
    function r_(e, t) {
        var r = Of(e, t);
        if (r.length !== 0) {
            if (r.length === 1) return r[0];
            throw new _f("expected a single document in the stream, but found more");
        }
    }
    rs.exports.loadAll = t_;
    rs.exports.load = r_;
});
var Kf = g((rI, Xf) => {
    "use strict";
    var Zn = Jt(),
        Vr = Qt(),
        n_ = Vn(),
        $f = Object.prototype.toString,
        kf = Object.prototype.hasOwnProperty,
        as = 65279,
        i_ = 9,
        jr = 10,
        o_ = 13,
        s_ = 32,
        a_ = 33,
        l_ = 34,
        ns = 35,
        u_ = 37,
        c_ = 38,
        f_ = 39,
        d_ = 42,
        Mf = 44,
        h_ = 45,
        Jn = 58,
        p_ = 61,
        m_ = 62,
        g_ = 63,
        w_ = 64,
        Bf = 91,
        Hf = 93,
        E_ = 96,
        jf = 123,
        y_ = 124,
        Wf = 125,
        de = {};
    de[0] = "\\0";
    de[7] = "\\a";
    de[8] = "\\b";
    de[9] = "\\t";
    de[10] = "\\n";
    de[11] = "\\v";
    de[12] = "\\f";
    de[13] = "\\r";
    de[27] = "\\e";
    de[34] = '\\"';
    de[92] = "\\\\";
    de[133] = "\\N";
    de[160] = "\\_";
    de[8232] = "\\L";
    de[8233] = "\\P";
    var __ = ["y", "Y", "yes", "Yes", "YES", "on", "On", "ON", "n", "N", "no", "No", "NO", "off", "Off", "OFF"],
        v_ = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
    function S_(e, t) {
        var r, n, i, o, s, a, l;
        if (t === null) return {};
        for (r = {}, n = Object.keys(t), i = 0, o = n.length; i < o; i += 1)
            (s = n[i]),
                (a = String(t[s])),
                s.slice(0, 2) === "!!" && (s = "tag:yaml.org,2002:" + s.slice(2)),
                (l = e.compiledTypeMap.fallback[s]),
                l && kf.call(l.styleAliases, a) && (a = l.styleAliases[a]),
                (r[s] = a);
        return r;
    }
    function A_(e) {
        var t, r, n;
        if (((t = e.toString(16).toUpperCase()), e <= 255)) (r = "x"), (n = 2);
        else if (e <= 65535) (r = "u"), (n = 4);
        else if (e <= 4294967295) (r = "U"), (n = 8);
        else throw new Vr("code point within a string may not be greater than 0xFFFFFFFF");
        return "\\" + r + Zn.repeat("0", n - t.length) + t;
    }
    var x_ = 1,
        Wr = 2;
    function T_(e) {
        (this.schema = e.schema || n_),
            (this.indent = Math.max(1, e.indent || 2)),
            (this.noArrayIndent = e.noArrayIndent || !1),
            (this.skipInvalid = e.skipInvalid || !1),
            (this.flowLevel = Zn.isNothing(e.flowLevel) ? -1 : e.flowLevel),
            (this.styleMap = S_(this.schema, e.styles || null)),
            (this.sortKeys = e.sortKeys || !1),
            (this.lineWidth = e.lineWidth || 80),
            (this.noRefs = e.noRefs || !1),
            (this.noCompatMode = e.noCompatMode || !1),
            (this.condenseFlow = e.condenseFlow || !1),
            (this.quotingType = e.quotingType === '"' ? Wr : x_),
            (this.forceQuotes = e.forceQuotes || !1),
            (this.replacer = typeof e.replacer == "function" ? e.replacer : null),
            (this.implicitTypes = this.schema.compiledImplicit),
            (this.explicitTypes = this.schema.compiledExplicit),
            (this.tag = null),
            (this.result = ""),
            (this.duplicates = []),
            (this.usedDuplicates = null);
    }
    function Nf(e, t) {
        for (var r = Zn.repeat(" ", t), n = 0, i = -1, o = "", s, a = e.length; n < a; )
            (i = e.indexOf("\n", n)),
                i === -1 ? ((s = e.slice(n)), (n = a)) : ((s = e.slice(n, i + 1)), (n = i + 1)),
                s.length && s !== "\n" && (o += r),
                (o += s);
        return o;
    }
    function is(e, t) {
        return "\n" + Zn.repeat(" ", e.indent * t);
    }
    function C_(e, t) {
        var r, n, i;
        for (r = 0, n = e.implicitTypes.length; r < n; r += 1) if (((i = e.implicitTypes[r]), i.resolve(t))) return !0;
        return !1;
    }
    function Qn(e) {
        return e === s_ || e === i_;
    }
    function Gr(e) {
        return (
            (32 <= e && e <= 126) ||
            (161 <= e && e <= 55295 && e !== 8232 && e !== 8233) ||
            (57344 <= e && e <= 65533 && e !== as) ||
            (65536 <= e && e <= 1114111)
        );
    }
    function Rf(e) {
        return Gr(e) && e !== as && e !== o_ && e !== jr;
    }
    function Df(e, t, r) {
        var n = Rf(e),
            i = n && !Qn(e);
        return (
            ((r ? n : n && e !== Mf && e !== Bf && e !== Hf && e !== jf && e !== Wf) && e !== ns && !(t === Jn && !i)) ||
            (Rf(t) && !Qn(t) && e === ns) ||
            (t === Jn && i)
        );
    }
    function b_(e) {
        return (
            Gr(e) &&
            e !== as &&
            !Qn(e) &&
            e !== h_ &&
            e !== g_ &&
            e !== Jn &&
            e !== Mf &&
            e !== Bf &&
            e !== Hf &&
            e !== jf &&
            e !== Wf &&
            e !== ns &&
            e !== c_ &&
            e !== d_ &&
            e !== a_ &&
            e !== y_ &&
            e !== p_ &&
            e !== m_ &&
            e !== f_ &&
            e !== l_ &&
            e !== u_ &&
            e !== w_ &&
            e !== E_
        );
    }
    function O_(e) {
        return !Qn(e) && e !== Jn;
    }
    function Hr(e, t) {
        var r = e.charCodeAt(t),
            n;
        return r >= 55296 && r <= 56319 && t + 1 < e.length && ((n = e.charCodeAt(t + 1)), n >= 56320 && n <= 57343)
            ? (r - 55296) * 1024 + n - 56320 + 65536
            : r;
    }
    function Gf(e) {
        var t = /^\n* /;
        return t.test(e);
    }
    var Vf = 1,
        os = 2,
        Yf = 3,
        zf = 4,
        rr = 5;
    function I_(e, t, r, n, i, o, s, a) {
        var l,
            h = 0,
            c = null,
            f = !1,
            m = !1,
            p = n !== -1,
            y = -1,
            _ = b_(Hr(e, 0)) && O_(Hr(e, e.length - 1));
        if (t || s)
            for (l = 0; l < e.length; h >= 65536 ? (l += 2) : l++) {
                if (((h = Hr(e, l)), !Gr(h))) return rr;
                (_ = _ && Df(h, c, a)), (c = h);
            }
        else {
            for (l = 0; l < e.length; h >= 65536 ? (l += 2) : l++) {
                if (((h = Hr(e, l)), h === jr)) (f = !0), p && ((m = m || (l - y - 1 > n && e[y + 1] !== " ")), (y = l));
                else if (!Gr(h)) return rr;
                (_ = _ && Df(h, c, a)), (c = h);
            }
            m = m || (p && l - y - 1 > n && e[y + 1] !== " ");
        }
        return !f && !m
            ? _ && !s && !i(e)
                ? Vf
                : o === Wr
                ? rr
                : os
            : r > 9 && Gf(e)
            ? rr
            : s
            ? o === Wr
                ? rr
                : os
            : m
            ? zf
            : Yf;
    }
    function N_(e, t, r, n, i) {
        e.dump = (function () {
            if (t.length === 0) return e.quotingType === Wr ? '""' : "''";
            if (!e.noCompatMode && (__.indexOf(t) !== -1 || v_.test(t)))
                return e.quotingType === Wr ? '"' + t + '"' : "'" + t + "'";
            var o = e.indent * Math.max(1, r),
                s = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - o),
                a = n || (e.flowLevel > -1 && r >= e.flowLevel);
            function l(h) {
                return C_(e, h);
            }
            switch (I_(t, a, e.indent, s, l, e.quotingType, e.forceQuotes && !n, i)) {
                case Vf:
                    return t;
                case os:
                    return "'" + t.replace(/'/g, "''") + "'";
                case Yf:
                    return "|" + Pf(t, e.indent) + Ff(Nf(t, o));
                case zf:
                    return ">" + Pf(t, e.indent) + Ff(Nf(R_(t, s), o));
                case rr:
                    return '"' + D_(t, s) + '"';
                default:
                    throw new Vr("impossible error: invalid scalar style");
            }
        })();
    }
    function Pf(e, t) {
        var r = Gf(e) ? String(t) : "",
            n = e[e.length - 1] === "\n",
            i = n && (e[e.length - 2] === "\n" || e === "\n"),
            o = i ? "+" : n ? "" : "-";
        return r + o + "\n";
    }
    function Ff(e) {
        return e[e.length - 1] === "\n" ? e.slice(0, -1) : e;
    }
    function R_(e, t) {
        for (
            var r = /(\n+)([^\n]*)/g,
                n = (function () {
                    var h = e.indexOf("\n");
                    return (h = h !== -1 ? h : e.length), (r.lastIndex = h), qf(e.slice(0, h), t);
                })(),
                i = e[0] === "\n" || e[0] === " ",
                o,
                s;
            (s = r.exec(e));

        ) {
            var a = s[1],
                l = s[2];
            (o = l[0] === " "), (n += a + (!i && !o && l !== "" ? "\n" : "") + qf(l, t)), (i = o);
        }
        return n;
    }
    function qf(e, t) {
        if (e === "" || e[0] === " ") return e;
        for (var r = / [^ ]/g, n, i = 0, o, s = 0, a = 0, l = ""; (n = r.exec(e)); )
            (a = n.index), a - i > t && ((o = s > i ? s : a), (l += "\n" + e.slice(i, o)), (i = o + 1)), (s = a);
        return (
            (l += "\n"), e.length - i > t && s > i ? (l += e.slice(i, s) + "\n" + e.slice(s + 1)) : (l += e.slice(i)), l.slice(1)
        );
    }
    function D_(e) {
        for (var t = "", r = 0, n, i = 0; i < e.length; r >= 65536 ? (i += 2) : i++)
            (r = Hr(e, i)), (n = de[r]), !n && Gr(r) ? ((t += e[i]), r >= 65536 && (t += e[i + 1])) : (t += n || A_(r));
        return t;
    }
    function P_(e, t, r) {
        var n = "",
            i = e.tag,
            o,
            s,
            a;
        for (o = 0, s = r.length; o < s; o += 1)
            (a = r[o]),
                e.replacer && (a = e.replacer.call(r, String(o), a)),
                (Ye(e, t, a, !1, !1) || (typeof a > "u" && Ye(e, t, null, !1, !1))) &&
                    (n !== "" && (n += "," + (e.condenseFlow ? "" : " ")), (n += e.dump));
        (e.tag = i), (e.dump = "[" + n + "]");
    }
    function Lf(e, t, r, n) {
        var i = "",
            o = e.tag,
            s,
            a,
            l;
        for (s = 0, a = r.length; s < a; s += 1)
            (l = r[s]),
                e.replacer && (l = e.replacer.call(r, String(s), l)),
                (Ye(e, t + 1, l, !0, !0, !1, !0) || (typeof l > "u" && Ye(e, t + 1, null, !0, !0, !1, !0))) &&
                    ((!n || i !== "") && (i += is(e, t)),
                    e.dump && jr === e.dump.charCodeAt(0) ? (i += "-") : (i += "- "),
                    (i += e.dump));
        (e.tag = o), (e.dump = i || "[]");
    }
    function F_(e, t, r) {
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
                Ye(e, t, l, !1, !1) &&
                    (e.dump.length > 1024 && (c += "? "),
                    (c += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " ")),
                    Ye(e, t, h, !1, !1) && ((c += e.dump), (n += c)));
        (e.tag = i), (e.dump = "{" + n + "}");
    }
    function q_(e, t, r, n) {
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
        else if (e.sortKeys) throw new Vr("sortKeys must be a boolean or a function");
        for (a = 0, l = s.length; a < l; a += 1)
            (m = ""),
                (!n || i !== "") && (m += is(e, t)),
                (h = s[a]),
                (c = r[h]),
                e.replacer && (c = e.replacer.call(r, h, c)),
                Ye(e, t + 1, h, !0, !0, !0) &&
                    ((f = (e.tag !== null && e.tag !== "?") || (e.dump && e.dump.length > 1024)),
                    f && (e.dump && jr === e.dump.charCodeAt(0) ? (m += "?") : (m += "? ")),
                    (m += e.dump),
                    f && (m += is(e, t)),
                    Ye(e, t + 1, c, !0, f) &&
                        (e.dump && jr === e.dump.charCodeAt(0) ? (m += ":") : (m += ": "), (m += e.dump), (i += m)));
        (e.tag = o), (e.dump = i || "{}");
    }
    function Uf(e, t, r) {
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
                    if (((l = e.styleMap[a.tag] || a.defaultStyle), $f.call(a.represent) === "[object Function]"))
                        n = a.represent(t, l);
                    else if (kf.call(a.represent, l)) n = a.represent[l](t, l);
                    else throw new Vr("!<" + a.tag + '> tag resolver accepts not "' + l + '" style');
                    e.dump = n;
                }
                return !0;
            }
        return !1;
    }
    function Ye(e, t, r, n, i, o, s) {
        (e.tag = null), (e.dump = r), Uf(e, r, !1) || Uf(e, r, !0);
        var a = $f.call(e.dump),
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
                    ? (q_(e, t, e.dump, i), m && (e.dump = "&ref_" + f + e.dump))
                    : (F_(e, t, e.dump), m && (e.dump = "&ref_" + f + " " + e.dump));
            else if (a === "[object Array]")
                n && e.dump.length !== 0
                    ? (e.noArrayIndent && !s && t > 0 ? Lf(e, t - 1, e.dump, i) : Lf(e, t, e.dump, i),
                      m && (e.dump = "&ref_" + f + e.dump))
                    : (P_(e, t, e.dump), m && (e.dump = "&ref_" + f + " " + e.dump));
            else if (a === "[object String]") e.tag !== "?" && N_(e, e.dump, t, o, l);
            else {
                if (a === "[object Undefined]") return !1;
                if (e.skipInvalid) return !1;
                throw new Vr("unacceptable kind of an object to dump " + a);
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
    function L_(e, t) {
        var r = [],
            n = [],
            i,
            o;
        for (ss(e, r, n), i = 0, o = n.length; i < o; i += 1) t.duplicates.push(r[n[i]]);
        t.usedDuplicates = new Array(o);
    }
    function ss(e, t, r) {
        var n, i, o;
        if (e !== null && typeof e == "object")
            if (((i = t.indexOf(e)), i !== -1)) r.indexOf(i) === -1 && r.push(i);
            else if ((t.push(e), Array.isArray(e))) for (i = 0, o = e.length; i < o; i += 1) ss(e[i], t, r);
            else for (n = Object.keys(e), i = 0, o = n.length; i < o; i += 1) ss(e[n[i]], t, r);
    }
    function U_(e, t) {
        t = t || {};
        var r = new T_(t);
        r.noRefs || L_(e, r);
        var n = e;
        return r.replacer && (n = r.replacer.call({ "": n }, "", n)), Ye(r, 0, n, !0, !0) ? r.dump + "\n" : "";
    }
    Xf.exports.dump = U_;
});
var ei = g((nI, ye) => {
    "use strict";
    var Jf = If(),
        $_ = Kf();
    function ls(e, t) {
        return function () {
            throw new Error(
                "Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default."
            );
        };
    }
    ye.exports.Type = fe();
    ye.exports.Schema = qo();
    ye.exports.FAILSAFE_SCHEMA = ko();
    ye.exports.JSON_SCHEMA = Wo();
    ye.exports.CORE_SCHEMA = Go();
    ye.exports.DEFAULT_SCHEMA = Vn();
    ye.exports.load = Jf.load;
    ye.exports.loadAll = Jf.loadAll;
    ye.exports.dump = $_.dump;
    ye.exports.YAMLException = Qt();
    ye.exports.types = {
        binary: Xo(),
        float: jo(),
        map: $o(),
        null: Mo(),
        pairs: Jo(),
        set: Qo(),
        timestamp: Vo(),
        bool: Bo(),
        int: Ho(),
        merge: Yo(),
        omap: Ko(),
        seq: Uo(),
        str: Lo()
    };
    ye.exports.safeLoad = ls("safeLoad", "load");
    ye.exports.safeLoadAll = ls("safeLoadAll", "loadAll");
    ye.exports.safeDump = ls("safeDump", "dump");
});
var Qf = g(ti => {
    "use strict";
    Object.defineProperty(ti, "__esModule", { value: !0 });
    ti.Lazy = void 0;
    var us = class {
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
    ti.Lazy = us;
});
var Yr = g((oI, Zf) => {
    var k_ = "2.0.0",
        M_ = Number.MAX_SAFE_INTEGER || 9007199254740991,
        B_ = 16,
        H_ = 250,
        j_ = ["major", "premajor", "minor", "preminor", "patch", "prepatch", "prerelease"];
    Zf.exports = {
        MAX_LENGTH: 256,
        MAX_SAFE_COMPONENT_LENGTH: B_,
        MAX_SAFE_BUILD_LENGTH: H_,
        MAX_SAFE_INTEGER: M_,
        RELEASE_TYPES: j_,
        SEMVER_SPEC_VERSION: k_,
        FLAG_INCLUDE_PRERELEASE: 1,
        FLAG_LOOSE: 2
    };
});
var zr = g((sI, ed) => {
    var W_ =
        typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG)
            ? (...e) => console.error("SEMVER", ...e)
            : () => {};
    ed.exports = W_;
});
var nr = g((ze, td) => {
    var { MAX_SAFE_COMPONENT_LENGTH: cs, MAX_SAFE_BUILD_LENGTH: G_, MAX_LENGTH: V_ } = Yr(),
        Y_ = zr();
    ze = td.exports = {};
    var z_ = (ze.re = []),
        X_ = (ze.safeRe = []),
        T = (ze.src = []),
        C = (ze.t = {}),
        K_ = 0,
        fs = "[a-zA-Z0-9-]",
        J_ = [
            ["\\s", 1],
            ["\\d", V_],
            [fs, G_]
        ],
        Q_ = e => {
            for (let [t, r] of J_)
                e = e
                    .split("".concat(t, "*"))
                    .join("".concat(t, "{0,").concat(r, "}"))
                    .split("".concat(t, "+"))
                    .join("".concat(t, "{1,").concat(r, "}"));
            return e;
        },
        q = (e, t, r) => {
            let n = Q_(t),
                i = K_++;
            Y_(e, i, t),
                (C[e] = i),
                (T[i] = t),
                (z_[i] = new RegExp(t, r ? "g" : void 0)),
                (X_[i] = new RegExp(n, r ? "g" : void 0));
        };
    q("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    q("NUMERICIDENTIFIERLOOSE", "\\d+");
    q("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-]".concat(fs, "*"));
    q(
        "MAINVERSION",
        "(".concat(T[C.NUMERICIDENTIFIER], ")\\.") +
            "(".concat(T[C.NUMERICIDENTIFIER], ")\\.") +
            "(".concat(T[C.NUMERICIDENTIFIER], ")")
    );
    q(
        "MAINVERSIONLOOSE",
        "(".concat(T[C.NUMERICIDENTIFIERLOOSE], ")\\.") +
            "(".concat(T[C.NUMERICIDENTIFIERLOOSE], ")\\.") +
            "(".concat(T[C.NUMERICIDENTIFIERLOOSE], ")")
    );
    q("PRERELEASEIDENTIFIER", "(?:".concat(T[C.NUMERICIDENTIFIER], "|").concat(T[C.NONNUMERICIDENTIFIER], ")"));
    q("PRERELEASEIDENTIFIERLOOSE", "(?:".concat(T[C.NUMERICIDENTIFIERLOOSE], "|").concat(T[C.NONNUMERICIDENTIFIER], ")"));
    q("PRERELEASE", "(?:-(".concat(T[C.PRERELEASEIDENTIFIER], "(?:\\.").concat(T[C.PRERELEASEIDENTIFIER], ")*))"));
    q(
        "PRERELEASELOOSE",
        "(?:-?(".concat(T[C.PRERELEASEIDENTIFIERLOOSE], "(?:\\.").concat(T[C.PRERELEASEIDENTIFIERLOOSE], ")*))")
    );
    q("BUILDIDENTIFIER", "".concat(fs, "+"));
    q("BUILD", "(?:\\+(".concat(T[C.BUILDIDENTIFIER], "(?:\\.").concat(T[C.BUILDIDENTIFIER], ")*))"));
    q("FULLPLAIN", "v?".concat(T[C.MAINVERSION]).concat(T[C.PRERELEASE], "?").concat(T[C.BUILD], "?"));
    q("FULL", "^".concat(T[C.FULLPLAIN], "$"));
    q("LOOSEPLAIN", "[v=\\s]*".concat(T[C.MAINVERSIONLOOSE]).concat(T[C.PRERELEASELOOSE], "?").concat(T[C.BUILD], "?"));
    q("LOOSE", "^".concat(T[C.LOOSEPLAIN], "$"));
    q("GTLT", "((?:<|>)?=?)");
    q("XRANGEIDENTIFIERLOOSE", "".concat(T[C.NUMERICIDENTIFIERLOOSE], "|x|X|\\*"));
    q("XRANGEIDENTIFIER", "".concat(T[C.NUMERICIDENTIFIER], "|x|X|\\*"));
    q(
        "XRANGEPLAIN",
        "[v=\\s]*(".concat(T[C.XRANGEIDENTIFIER], ")") +
            "(?:\\.(".concat(T[C.XRANGEIDENTIFIER], ")") +
            "(?:\\.(".concat(T[C.XRANGEIDENTIFIER], ")") +
            "(?:".concat(T[C.PRERELEASE], ")?").concat(T[C.BUILD], "?") +
            ")?)?"
    );
    q(
        "XRANGEPLAINLOOSE",
        "[v=\\s]*(".concat(T[C.XRANGEIDENTIFIERLOOSE], ")") +
            "(?:\\.(".concat(T[C.XRANGEIDENTIFIERLOOSE], ")") +
            "(?:\\.(".concat(T[C.XRANGEIDENTIFIERLOOSE], ")") +
            "(?:".concat(T[C.PRERELEASELOOSE], ")?").concat(T[C.BUILD], "?") +
            ")?)?"
    );
    q("XRANGE", "^".concat(T[C.GTLT], "\\s*").concat(T[C.XRANGEPLAIN], "$"));
    q("XRANGELOOSE", "^".concat(T[C.GTLT], "\\s*").concat(T[C.XRANGEPLAINLOOSE], "$"));
    q(
        "COERCEPLAIN",
        "(^|[^\\d])(\\d{1,".concat(cs, "})") + "(?:\\.(\\d{1,".concat(cs, "}))?") + "(?:\\.(\\d{1,".concat(cs, "}))?")
    );
    q("COERCE", "".concat(T[C.COERCEPLAIN], "(?:$|[^\\d])"));
    q("COERCEFULL", T[C.COERCEPLAIN] + "(?:".concat(T[C.PRERELEASE], ")?") + "(?:".concat(T[C.BUILD], ")?") + "(?:$|[^\\d])");
    q("COERCERTL", T[C.COERCE], !0);
    q("COERCERTLFULL", T[C.COERCEFULL], !0);
    q("LONETILDE", "(?:~>?)");
    q("TILDETRIM", "(\\s*)".concat(T[C.LONETILDE], "\\s+"), !0);
    ze.tildeTrimReplace = "$1~";
    q("TILDE", "^".concat(T[C.LONETILDE]).concat(T[C.XRANGEPLAIN], "$"));
    q("TILDELOOSE", "^".concat(T[C.LONETILDE]).concat(T[C.XRANGEPLAINLOOSE], "$"));
    q("LONECARET", "(?:\\^)");
    q("CARETTRIM", "(\\s*)".concat(T[C.LONECARET], "\\s+"), !0);
    ze.caretTrimReplace = "$1^";
    q("CARET", "^".concat(T[C.LONECARET]).concat(T[C.XRANGEPLAIN], "$"));
    q("CARETLOOSE", "^".concat(T[C.LONECARET]).concat(T[C.XRANGEPLAINLOOSE], "$"));
    q("COMPARATORLOOSE", "^".concat(T[C.GTLT], "\\s*(").concat(T[C.LOOSEPLAIN], ")$|^$"));
    q("COMPARATOR", "^".concat(T[C.GTLT], "\\s*(").concat(T[C.FULLPLAIN], ")$|^$"));
    q("COMPARATORTRIM", "(\\s*)".concat(T[C.GTLT], "\\s*(").concat(T[C.LOOSEPLAIN], "|").concat(T[C.XRANGEPLAIN], ")"), !0);
    ze.comparatorTrimReplace = "$1$2$3";
    q("HYPHENRANGE", "^\\s*(".concat(T[C.XRANGEPLAIN], ")") + "\\s+-\\s+" + "(".concat(T[C.XRANGEPLAIN], ")") + "\\s*$");
    q(
        "HYPHENRANGELOOSE",
        "^\\s*(".concat(T[C.XRANGEPLAINLOOSE], ")") + "\\s+-\\s+" + "(".concat(T[C.XRANGEPLAINLOOSE], ")") + "\\s*$"
    );
    q("STAR", "(<|>)?=?\\s*\\*");
    q("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    q("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
});
var ri = g((aI, rd) => {
    var Z_ = Object.freeze({ loose: !0 }),
        ev = Object.freeze({}),
        tv = e => (e ? (typeof e != "object" ? Z_ : e) : ev);
    rd.exports = tv;
});
var ds = g((lI, od) => {
    var nd = /^[0-9]+$/,
        id = (e, t) => {
            let r = nd.test(e),
                n = nd.test(t);
            return r && n && ((e = +e), (t = +t)), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
        },
        rv = (e, t) => id(t, e);
    od.exports = { compareIdentifiers: id, rcompareIdentifiers: rv };
});
var he = g((uI, ud) => {
    var ni = zr(),
        { MAX_LENGTH: sd, MAX_SAFE_INTEGER: ii } = Yr(),
        { safeRe: ad, t: ld } = nr(),
        nv = ri(),
        { compareIdentifiers: ir } = ds(),
        hs = class e {
            constructor(t, r) {
                if (((r = nv(r)), t instanceof e)) {
                    if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease) return t;
                    t = t.version;
                } else if (typeof t != "string")
                    throw new TypeError('Invalid version. Must be a string. Got type "'.concat(typeof t, '".'));
                if (t.length > sd) throw new TypeError("version is longer than ".concat(sd, " characters"));
                ni("SemVer", t, r),
                    (this.options = r),
                    (this.loose = !!r.loose),
                    (this.includePrerelease = !!r.includePrerelease);
                let n = t.trim().match(r.loose ? ad[ld.LOOSE] : ad[ld.FULL]);
                if (!n) throw new TypeError("Invalid Version: ".concat(t));
                if (
                    ((this.raw = t),
                    (this.major = +n[1]),
                    (this.minor = +n[2]),
                    (this.patch = +n[3]),
                    this.major > ii || this.major < 0)
                )
                    throw new TypeError("Invalid major version");
                if (this.minor > ii || this.minor < 0) throw new TypeError("Invalid minor version");
                if (this.patch > ii || this.patch < 0) throw new TypeError("Invalid patch version");
                n[4]
                    ? (this.prerelease = n[4].split(".").map(i => {
                          if (/^[0-9]+$/.test(i)) {
                              let o = +i;
                              if (o >= 0 && o < ii) return o;
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
                if ((ni("SemVer.compare", this.version, this.options, t), !(t instanceof e))) {
                    if (typeof t == "string" && t === this.version) return 0;
                    t = new e(t, this.options);
                }
                return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
            }
            compareMain(t) {
                return (
                    t instanceof e || (t = new e(t, this.options)),
                    ir(this.major, t.major) || ir(this.minor, t.minor) || ir(this.patch, t.patch)
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
                    if ((ni("prerelease compare", r, n, i), n === void 0 && i === void 0)) return 0;
                    if (i === void 0) return 1;
                    if (n === void 0) return -1;
                    if (n === i) continue;
                    return ir(n, i);
                } while (++r);
            }
            compareBuild(t) {
                t instanceof e || (t = new e(t, this.options));
                let r = 0;
                do {
                    let n = this.build[r],
                        i = t.build[r];
                    if ((ni("build compare", r, n, i), n === void 0 && i === void 0)) return 0;
                    if (i === void 0) return 1;
                    if (n === void 0) return -1;
                    if (n === i) continue;
                    return ir(n, i);
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
                                ir(this.prerelease[0], r) === 0
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
    ud.exports = hs;
});
var bt = g((cI, fd) => {
    var cd = he(),
        iv = (e, t, r = !1) => {
            if (e instanceof cd) return e;
            try {
                return new cd(e, t);
            } catch (n) {
                if (!r) return null;
                throw n;
            }
        };
    fd.exports = iv;
});
var hd = g((fI, dd) => {
    var ov = bt(),
        sv = (e, t) => {
            let r = ov(e, t);
            return r ? r.version : null;
        };
    dd.exports = sv;
});
var md = g((dI, pd) => {
    var av = bt(),
        lv = (e, t) => {
            let r = av(e.trim().replace(/^[=v]+/, ""), t);
            return r ? r.version : null;
        };
    pd.exports = lv;
});
var Ed = g((hI, wd) => {
    var gd = he(),
        uv = (e, t, r, n, i) => {
            typeof r == "string" && ((i = n), (n = r), (r = void 0));
            try {
                return new gd(e instanceof gd ? e.version : e, r).inc(t, n, i).version;
            } catch {
                return null;
            }
        };
    wd.exports = uv;
});
var vd = g((pI, _d) => {
    var yd = bt(),
        cv = (e, t) => {
            let r = yd(e, null, !0),
                n = yd(t, null, !0),
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
    _d.exports = cv;
});
var Ad = g((mI, Sd) => {
    var fv = he(),
        dv = (e, t) => new fv(e, t).major;
    Sd.exports = dv;
});
var Td = g((gI, xd) => {
    var hv = he(),
        pv = (e, t) => new hv(e, t).minor;
    xd.exports = pv;
});
var bd = g((wI, Cd) => {
    var mv = he(),
        gv = (e, t) => new mv(e, t).patch;
    Cd.exports = gv;
});
var Id = g((EI, Od) => {
    var wv = bt(),
        Ev = (e, t) => {
            let r = wv(e, t);
            return r && r.prerelease.length ? r.prerelease : null;
        };
    Od.exports = Ev;
});
var Pe = g((yI, Rd) => {
    var Nd = he(),
        yv = (e, t, r) => new Nd(e, r).compare(new Nd(t, r));
    Rd.exports = yv;
});
var Pd = g((_I, Dd) => {
    var _v = Pe(),
        vv = (e, t, r) => _v(t, e, r);
    Dd.exports = vv;
});
var qd = g((vI, Fd) => {
    var Sv = Pe(),
        Av = (e, t) => Sv(e, t, !0);
    Fd.exports = Av;
});
var oi = g((SI, Ud) => {
    var Ld = he(),
        xv = (e, t, r) => {
            let n = new Ld(e, r),
                i = new Ld(t, r);
            return n.compare(i) || n.compareBuild(i);
        };
    Ud.exports = xv;
});
var kd = g((AI, $d) => {
    var Tv = oi(),
        Cv = (e, t) => e.sort((r, n) => Tv(r, n, t));
    $d.exports = Cv;
});
var Bd = g((xI, Md) => {
    var bv = oi(),
        Ov = (e, t) => e.sort((r, n) => bv(n, r, t));
    Md.exports = Ov;
});
var Xr = g((TI, Hd) => {
    var Iv = Pe(),
        Nv = (e, t, r) => Iv(e, t, r) > 0;
    Hd.exports = Nv;
});
var si = g((CI, jd) => {
    var Rv = Pe(),
        Dv = (e, t, r) => Rv(e, t, r) < 0;
    jd.exports = Dv;
});
var ps = g((bI, Wd) => {
    var Pv = Pe(),
        Fv = (e, t, r) => Pv(e, t, r) === 0;
    Wd.exports = Fv;
});
var ms = g((OI, Gd) => {
    var qv = Pe(),
        Lv = (e, t, r) => qv(e, t, r) !== 0;
    Gd.exports = Lv;
});
var ai = g((II, Vd) => {
    var Uv = Pe(),
        $v = (e, t, r) => Uv(e, t, r) >= 0;
    Vd.exports = $v;
});
var li = g((NI, Yd) => {
    var kv = Pe(),
        Mv = (e, t, r) => kv(e, t, r) <= 0;
    Yd.exports = Mv;
});
var gs = g((RI, zd) => {
    var Bv = ps(),
        Hv = ms(),
        jv = Xr(),
        Wv = ai(),
        Gv = si(),
        Vv = li(),
        Yv = (e, t, r, n) => {
            switch (t) {
                case "===":
                    return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
                case "!==":
                    return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
                case "":
                case "=":
                case "==":
                    return Bv(e, r, n);
                case "!=":
                    return Hv(e, r, n);
                case ">":
                    return jv(e, r, n);
                case ">=":
                    return Wv(e, r, n);
                case "<":
                    return Gv(e, r, n);
                case "<=":
                    return Vv(e, r, n);
                default:
                    throw new TypeError("Invalid operator: ".concat(t));
            }
        };
    zd.exports = Yv;
});
var Kd = g((DI, Xd) => {
    var zv = he(),
        Xv = bt(),
        { safeRe: ui, t: ci } = nr(),
        Kv = (e, t) => {
            if (e instanceof zv) return e;
            if ((typeof e == "number" && (e = String(e)), typeof e != "string")) return null;
            t = t || {};
            let r = null;
            if (!t.rtl) r = e.match(t.includePrerelease ? ui[ci.COERCEFULL] : ui[ci.COERCE]);
            else {
                let l = t.includePrerelease ? ui[ci.COERCERTLFULL] : ui[ci.COERCERTL],
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
            return Xv("".concat(n, ".").concat(i, ".").concat(o).concat(s).concat(a), t);
        };
    Xd.exports = Kv;
});
var Qd = g((PI, Jd) => {
    var ws = class {
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
    Jd.exports = ws;
});
var Fe = g((FI, rh) => {
    var Jv = /\s+/g,
        Es = class e {
            constructor(t, r) {
                if (((r = Zv(r)), t instanceof e))
                    return t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease ? t : new e(t.raw, r);
                if (t instanceof ys) return (this.raw = t.value), (this.set = [[t]]), (this.formatted = void 0), this;
                if (
                    ((this.options = r),
                    (this.loose = !!r.loose),
                    (this.includePrerelease = !!r.includePrerelease),
                    (this.raw = t.trim().replace(Jv, " ")),
                    (this.set = this.raw
                        .split("||")
                        .map(n => this.parseRange(n.trim()))
                        .filter(n => n.length)),
                    !this.set.length)
                )
                    throw new TypeError("Invalid SemVer Range: ".concat(this.raw));
                if (this.set.length > 1) {
                    let n = this.set[0];
                    if (((this.set = this.set.filter(i => !eh(i[0]))), this.set.length === 0)) this.set = [n];
                    else if (this.set.length > 1) {
                        for (let i of this.set)
                            if (i.length === 1 && sS(i[0])) {
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
                let n = ((this.options.includePrerelease && iS) | (this.options.loose && oS)) + ":" + t,
                    i = Zd.get(n);
                if (i) return i;
                let o = this.options.loose,
                    s = o ? Ne[_e.HYPHENRANGELOOSE] : Ne[_e.HYPHENRANGE];
                (t = t.replace(s, gS(this.options.includePrerelease))),
                    Y("hyphen replace", t),
                    (t = t.replace(Ne[_e.COMPARATORTRIM], tS)),
                    Y("comparator trim", t),
                    (t = t.replace(Ne[_e.TILDETRIM], rS)),
                    Y("tilde trim", t),
                    (t = t.replace(Ne[_e.CARETTRIM], nS)),
                    Y("caret trim", t);
                let a = t
                    .split(" ")
                    .map(f => aS(f, this.options))
                    .join(" ")
                    .split(/\s+/)
                    .map(f => mS(f, this.options));
                o && (a = a.filter(f => (Y("loose invalid filter", f, this.options), !!f.match(Ne[_e.COMPARATORLOOSE])))),
                    Y("range list", a);
                let l = new Map(),
                    h = a.map(f => new ys(f, this.options));
                for (let f of h) {
                    if (eh(f)) return [f];
                    l.set(f.value, f);
                }
                l.size > 1 && l.has("") && l.delete("");
                let c = [...l.values()];
                return Zd.set(n, c), c;
            }
            intersects(t, r) {
                if (!(t instanceof e)) throw new TypeError("a Range is required");
                return this.set.some(
                    n => th(n, r) && t.set.some(i => th(i, r) && n.every(o => i.every(s => o.intersects(s, r))))
                );
            }
            test(t) {
                if (!t) return !1;
                if (typeof t == "string")
                    try {
                        t = new eS(t, this.options);
                    } catch {
                        return !1;
                    }
                for (let r = 0; r < this.set.length; r++) if (wS(this.set[r], t, this.options)) return !0;
                return !1;
            }
        };
    rh.exports = Es;
    var Qv = Qd(),
        Zd = new Qv(),
        Zv = ri(),
        ys = Kr(),
        Y = zr(),
        eS = he(),
        { safeRe: Ne, t: _e, comparatorTrimReplace: tS, tildeTrimReplace: rS, caretTrimReplace: nS } = nr(),
        { FLAG_INCLUDE_PRERELEASE: iS, FLAG_LOOSE: oS } = Yr(),
        eh = e => e.value === "<0.0.0-0",
        sS = e => e.value === "",
        th = (e, t) => {
            let r = !0,
                n = e.slice(),
                i = n.pop();
            for (; r && n.length; ) (r = n.every(o => i.intersects(o, t))), (i = n.pop());
            return r;
        },
        aS = (e, t) => (
            Y("comp", e, t),
            (e = cS(e, t)),
            Y("caret", e),
            (e = lS(e, t)),
            Y("tildes", e),
            (e = dS(e, t)),
            Y("xrange", e),
            (e = pS(e, t)),
            Y("stars", e),
            e
        ),
        ve = e => !e || e.toLowerCase() === "x" || e === "*",
        lS = (e, t) =>
            e
                .trim()
                .split(/\s+/)
                .map(r => uS(r, t))
                .join(" "),
        uS = (e, t) => {
            let r = t.loose ? Ne[_e.TILDELOOSE] : Ne[_e.TILDE];
            return e.replace(r, (n, i, o, s, a) => {
                Y("tilde", e, n, i, o, s, a);
                let l;
                return (
                    ve(i)
                        ? (l = "")
                        : ve(o)
                        ? (l = ">=".concat(i, ".0.0 <").concat(+i + 1, ".0.0-0"))
                        : ve(s)
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
        cS = (e, t) =>
            e
                .trim()
                .split(/\s+/)
                .map(r => fS(r, t))
                .join(" "),
        fS = (e, t) => {
            Y("caret", e, t);
            let r = t.loose ? Ne[_e.CARETLOOSE] : Ne[_e.CARET],
                n = t.includePrerelease ? "-0" : "";
            return e.replace(r, (i, o, s, a, l) => {
                Y("caret", e, i, o, s, a, l);
                let h;
                return (
                    ve(o)
                        ? (h = "")
                        : ve(s)
                        ? (h = ">="
                              .concat(o, ".0.0")
                              .concat(n, " <")
                              .concat(+o + 1, ".0.0-0"))
                        : ve(a)
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
        dS = (e, t) => (
            Y("replaceXRanges", e, t),
            e
                .split(/\s+/)
                .map(r => hS(r, t))
                .join(" ")
        ),
        hS = (e, t) => {
            e = e.trim();
            let r = t.loose ? Ne[_e.XRANGELOOSE] : Ne[_e.XRANGE];
            return e.replace(r, (n, i, o, s, a, l) => {
                Y("xRange", e, n, i, o, s, a, l);
                let h = ve(o),
                    c = h || ve(s),
                    f = c || ve(a),
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
        pS = (e, t) => (Y("replaceStars", e, t), e.trim().replace(Ne[_e.STAR], "")),
        mS = (e, t) => (Y("replaceGTE0", e, t), e.trim().replace(Ne[t.includePrerelease ? _e.GTE0PRE : _e.GTE0], "")),
        gS = e => (t, r, n, i, o, s, a, l, h, c, f, m) => (
            ve(n)
                ? (r = "")
                : ve(i)
                ? (r = ">=".concat(n, ".0.0").concat(e ? "-0" : ""))
                : ve(o)
                ? (r = ">="
                      .concat(n, ".")
                      .concat(i, ".0")
                      .concat(e ? "-0" : ""))
                : s
                ? (r = ">=".concat(r))
                : (r = ">=".concat(r).concat(e ? "-0" : "")),
            ve(h)
                ? (l = "")
                : ve(c)
                ? (l = "<".concat(+h + 1, ".0.0-0"))
                : ve(f)
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
        wS = (e, t, r) => {
            for (let n = 0; n < e.length; n++) if (!e[n].test(t)) return !1;
            if (t.prerelease.length && !r.includePrerelease) {
                for (let n = 0; n < e.length; n++)
                    if ((Y(e[n].semver), e[n].semver !== ys.ANY && e[n].semver.prerelease.length > 0)) {
                        let i = e[n].semver;
                        if (i.major === t.major && i.minor === t.minor && i.patch === t.patch) return !0;
                    }
                return !1;
            }
            return !0;
        };
});
var Kr = g((qI, lh) => {
    var Jr = Symbol("SemVer ANY"),
        Ss = class e {
            static get ANY() {
                return Jr;
            }
            constructor(t, r) {
                if (((r = nh(r)), t instanceof e)) {
                    if (t.loose === !!r.loose) return t;
                    t = t.value;
                }
                (t = t.trim().split(/\s+/).join(" ")),
                    vs("comparator", t, r),
                    (this.options = r),
                    (this.loose = !!r.loose),
                    this.parse(t),
                    this.semver === Jr ? (this.value = "") : (this.value = this.operator + this.semver.version),
                    vs("comp", this);
            }
            parse(t) {
                let r = this.options.loose ? ih[oh.COMPARATORLOOSE] : ih[oh.COMPARATOR],
                    n = t.match(r);
                if (!n) throw new TypeError("Invalid comparator: ".concat(t));
                (this.operator = n[1] !== void 0 ? n[1] : ""),
                    this.operator === "=" && (this.operator = ""),
                    n[2] ? (this.semver = new sh(n[2], this.options.loose)) : (this.semver = Jr);
            }
            toString() {
                return this.value;
            }
            test(t) {
                if ((vs("Comparator.test", t, this.options.loose), this.semver === Jr || t === Jr)) return !0;
                if (typeof t == "string")
                    try {
                        t = new sh(t, this.options);
                    } catch {
                        return !1;
                    }
                return _s(t, this.operator, this.semver, this.options);
            }
            intersects(t, r) {
                if (!(t instanceof e)) throw new TypeError("a Comparator is required");
                return this.operator === ""
                    ? this.value === ""
                        ? !0
                        : new ah(t.value, r).test(this.value)
                    : t.operator === ""
                    ? t.value === ""
                        ? !0
                        : new ah(this.value, r).test(t.semver)
                    : ((r = nh(r)),
                      (r.includePrerelease && (this.value === "<0.0.0-0" || t.value === "<0.0.0-0")) ||
                      (!r.includePrerelease && (this.value.startsWith("<0.0.0") || t.value.startsWith("<0.0.0")))
                          ? !1
                          : !!(
                                (this.operator.startsWith(">") && t.operator.startsWith(">")) ||
                                (this.operator.startsWith("<") && t.operator.startsWith("<")) ||
                                (this.semver.version === t.semver.version &&
                                    this.operator.includes("=") &&
                                    t.operator.includes("=")) ||
                                (_s(this.semver, "<", t.semver, r) &&
                                    this.operator.startsWith(">") &&
                                    t.operator.startsWith("<")) ||
                                (_s(this.semver, ">", t.semver, r) && this.operator.startsWith("<") && t.operator.startsWith(">"))
                            ));
            }
        };
    lh.exports = Ss;
    var nh = ri(),
        { safeRe: ih, t: oh } = nr(),
        _s = gs(),
        vs = zr(),
        sh = he(),
        ah = Fe();
});
var Qr = g((LI, uh) => {
    var ES = Fe(),
        yS = (e, t, r) => {
            try {
                t = new ES(t, r);
            } catch {
                return !1;
            }
            return t.test(e);
        };
    uh.exports = yS;
});
var fh = g((UI, ch) => {
    var _S = Fe(),
        vS = (e, t) =>
            new _S(e, t).set.map(r =>
                r
                    .map(n => n.value)
                    .join(" ")
                    .trim()
                    .split(" ")
            );
    ch.exports = vS;
});
var hh = g(($I, dh) => {
    var SS = he(),
        AS = Fe(),
        xS = (e, t, r) => {
            let n = null,
                i = null,
                o = null;
            try {
                o = new AS(t, r);
            } catch {
                return null;
            }
            return (
                e.forEach(s => {
                    o.test(s) && (!n || i.compare(s) === -1) && ((n = s), (i = new SS(n, r)));
                }),
                n
            );
        };
    dh.exports = xS;
});
var mh = g((kI, ph) => {
    var TS = he(),
        CS = Fe(),
        bS = (e, t, r) => {
            let n = null,
                i = null,
                o = null;
            try {
                o = new CS(t, r);
            } catch {
                return null;
            }
            return (
                e.forEach(s => {
                    o.test(s) && (!n || i.compare(s) === 1) && ((n = s), (i = new TS(n, r)));
                }),
                n
            );
        };
    ph.exports = bS;
});
var Eh = g((MI, wh) => {
    var As = he(),
        OS = Fe(),
        gh = Xr(),
        IS = (e, t) => {
            e = new OS(e, t);
            let r = new As("0.0.0");
            if (e.test(r) || ((r = new As("0.0.0-0")), e.test(r))) return r;
            r = null;
            for (let n = 0; n < e.set.length; ++n) {
                let i = e.set[n],
                    o = null;
                i.forEach(s => {
                    let a = new As(s.semver.version);
                    switch (s.operator) {
                        case ">":
                            a.prerelease.length === 0 ? a.patch++ : a.prerelease.push(0), (a.raw = a.format());
                        case "":
                        case ">=":
                            (!o || gh(a, o)) && (o = a);
                            break;
                        case "<":
                        case "<=":
                            break;
                        default:
                            throw new Error("Unexpected operation: ".concat(s.operator));
                    }
                }),
                    o && (!r || gh(r, o)) && (r = o);
            }
            return r && e.test(r) ? r : null;
        };
    wh.exports = IS;
});
var _h = g((BI, yh) => {
    var NS = Fe(),
        RS = (e, t) => {
            try {
                return new NS(e, t).range || "*";
            } catch {
                return null;
            }
        };
    yh.exports = RS;
});
var fi = g((HI, xh) => {
    var DS = he(),
        Ah = Kr(),
        { ANY: PS } = Ah,
        FS = Fe(),
        qS = Qr(),
        vh = Xr(),
        Sh = si(),
        LS = li(),
        US = ai(),
        $S = (e, t, r, n) => {
            (e = new DS(e, n)), (t = new FS(t, n));
            let i, o, s, a, l;
            switch (r) {
                case ">":
                    (i = vh), (o = LS), (s = Sh), (a = ">"), (l = ">=");
                    break;
                case "<":
                    (i = Sh), (o = US), (s = vh), (a = "<"), (l = "<=");
                    break;
                default:
                    throw new TypeError('Must provide a hilo val of "<" or ">"');
            }
            if (qS(e, t, n)) return !1;
            for (let h = 0; h < t.set.length; ++h) {
                let c = t.set[h],
                    f = null,
                    m = null;
                if (
                    (c.forEach(p => {
                        p.semver === PS && (p = new Ah(">=0.0.0")),
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
    xh.exports = $S;
});
var Ch = g((jI, Th) => {
    var kS = fi(),
        MS = (e, t, r) => kS(e, t, ">", r);
    Th.exports = MS;
});
var Oh = g((WI, bh) => {
    var BS = fi(),
        HS = (e, t, r) => BS(e, t, "<", r);
    bh.exports = HS;
});
var Rh = g((GI, Nh) => {
    var Ih = Fe(),
        jS = (e, t, r) => ((e = new Ih(e, r)), (t = new Ih(t, r)), e.intersects(t, r));
    Nh.exports = jS;
});
var Ph = g((VI, Dh) => {
    var WS = Qr(),
        GS = Pe();
    Dh.exports = (e, t, r) => {
        let n = [],
            i = null,
            o = null,
            s = e.sort((c, f) => GS(c, f, r));
        for (let c of s) WS(c, t, r) ? ((o = c), i || (i = c)) : (o && n.push([i, o]), (o = null), (i = null));
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
var kh = g((YI, $h) => {
    var Fh = Fe(),
        Ts = Kr(),
        { ANY: xs } = Ts,
        Zr = Qr(),
        Cs = Pe(),
        VS = (e, t, r = {}) => {
            if (e === t) return !0;
            (e = new Fh(e, r)), (t = new Fh(t, r));
            let n = !1;
            e: for (let i of e.set) {
                for (let o of t.set) {
                    let s = zS(i, o, r);
                    if (((n = n || s !== null), s)) continue e;
                }
                if (n) return !1;
            }
            return !0;
        },
        YS = [new Ts(">=0.0.0-0")],
        qh = [new Ts(">=0.0.0")],
        zS = (e, t, r) => {
            if (e === t) return !0;
            if (e.length === 1 && e[0].semver === xs) {
                if (t.length === 1 && t[0].semver === xs) return !0;
                r.includePrerelease ? (e = YS) : (e = qh);
            }
            if (t.length === 1 && t[0].semver === xs) {
                if (r.includePrerelease) return !0;
                t = qh;
            }
            let n = new Set(),
                i,
                o;
            for (let p of e)
                p.operator === ">" || p.operator === ">="
                    ? (i = Lh(i, p, r))
                    : p.operator === "<" || p.operator === "<="
                    ? (o = Uh(o, p, r))
                    : n.add(p.semver);
            if (n.size > 1) return null;
            let s;
            if (i && o) {
                if (((s = Cs(i.semver, o.semver, r)), s > 0)) return null;
                if (s === 0 && (i.operator !== ">=" || o.operator !== "<=")) return null;
            }
            for (let p of n) {
                if ((i && !Zr(p, String(i), r)) || (o && !Zr(p, String(o), r))) return null;
                for (let y of t) if (!Zr(p, String(y), r)) return !1;
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
                        if (((a = Lh(i, p, r)), a === p && a !== i)) return !1;
                    } else if (i.operator === ">=" && !Zr(i.semver, String(p), r)) return !1;
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
                        if (((l = Uh(o, p, r)), l === p && l !== o)) return !1;
                    } else if (o.operator === "<=" && !Zr(o.semver, String(p), r)) return !1;
                }
                if (!p.operator && (o || i) && s !== 0) return !1;
            }
            return !((i && h && !o && s !== 0) || (o && c && !i && s !== 0) || m || f);
        },
        Lh = (e, t, r) => {
            if (!e) return t;
            let n = Cs(e.semver, t.semver, r);
            return n > 0 ? e : n < 0 || (t.operator === ">" && e.operator === ">=") ? t : e;
        },
        Uh = (e, t, r) => {
            if (!e) return t;
            let n = Cs(e.semver, t.semver, r);
            return n < 0 ? e : n > 0 || (t.operator === "<" && e.operator === "<=") ? t : e;
        };
    $h.exports = VS;
});
var Os = g((zI, Hh) => {
    var bs = nr(),
        Mh = Yr(),
        XS = he(),
        Bh = ds(),
        KS = bt(),
        JS = hd(),
        QS = md(),
        ZS = Ed(),
        eA = vd(),
        tA = Ad(),
        rA = Td(),
        nA = bd(),
        iA = Id(),
        oA = Pe(),
        sA = Pd(),
        aA = qd(),
        lA = oi(),
        uA = kd(),
        cA = Bd(),
        fA = Xr(),
        dA = si(),
        hA = ps(),
        pA = ms(),
        mA = ai(),
        gA = li(),
        wA = gs(),
        EA = Kd(),
        yA = Kr(),
        _A = Fe(),
        vA = Qr(),
        SA = fh(),
        AA = hh(),
        xA = mh(),
        TA = Eh(),
        CA = _h(),
        bA = fi(),
        OA = Ch(),
        IA = Oh(),
        NA = Rh(),
        RA = Ph(),
        DA = kh();
    Hh.exports = {
        parse: KS,
        valid: JS,
        clean: QS,
        inc: ZS,
        diff: eA,
        major: tA,
        minor: rA,
        patch: nA,
        prerelease: iA,
        compare: oA,
        rcompare: sA,
        compareLoose: aA,
        compareBuild: lA,
        sort: uA,
        rsort: cA,
        gt: fA,
        lt: dA,
        eq: hA,
        neq: pA,
        gte: mA,
        lte: gA,
        cmp: wA,
        coerce: EA,
        Comparator: yA,
        Range: _A,
        satisfies: vA,
        toComparators: SA,
        maxSatisfying: AA,
        minSatisfying: xA,
        minVersion: TA,
        validRange: CA,
        outside: bA,
        gtr: OA,
        ltr: IA,
        intersects: NA,
        simplifyRange: RA,
        subset: DA,
        SemVer: XS,
        re: bs.re,
        src: bs.src,
        tokens: bs.t,
        SEMVER_SPEC_VERSION: Mh.SEMVER_SPEC_VERSION,
        RELEASE_TYPES: Mh.RELEASE_TYPES,
        compareIdentifiers: Bh.compareIdentifiers,
        rcompareIdentifiers: Bh.rcompareIdentifiers
    };
});
var Ap = g((en, sr) => {
    var PA = 200,
        ks = "__lodash_hash_undefined__",
        yi = 1,
        ep = 2,
        tp = 9007199254740991,
        di = "[object Arguments]",
        Ds = "[object Array]",
        FA = "[object AsyncFunction]",
        rp = "[object Boolean]",
        np = "[object Date]",
        ip = "[object Error]",
        op = "[object Function]",
        qA = "[object GeneratorFunction]",
        hi = "[object Map]",
        sp = "[object Number]",
        LA = "[object Null]",
        or = "[object Object]",
        jh = "[object Promise]",
        UA = "[object Proxy]",
        ap = "[object RegExp]",
        pi = "[object Set]",
        lp = "[object String]",
        $A = "[object Symbol]",
        kA = "[object Undefined]",
        Ps = "[object WeakMap]",
        up = "[object ArrayBuffer]",
        mi = "[object DataView]",
        MA = "[object Float32Array]",
        BA = "[object Float64Array]",
        HA = "[object Int8Array]",
        jA = "[object Int16Array]",
        WA = "[object Int32Array]",
        GA = "[object Uint8Array]",
        VA = "[object Uint8ClampedArray]",
        YA = "[object Uint16Array]",
        zA = "[object Uint32Array]",
        XA = /[\\^$.*+?()[\]{}|]/g,
        KA = /^\[object .+?Constructor\]$/,
        JA = /^(?:0|[1-9]\d*)$/,
        z = {};
    z[MA] = z[BA] = z[HA] = z[jA] = z[WA] = z[GA] = z[VA] = z[YA] = z[zA] = !0;
    z[di] = z[Ds] = z[up] = z[rp] = z[mi] = z[np] = z[ip] = z[op] = z[hi] = z[sp] = z[or] = z[ap] = z[pi] = z[lp] = z[Ps] = !1;
    var cp = typeof global == "object" && global && global.Object === Object && global,
        QA = typeof self == "object" && self && self.Object === Object && self,
        Xe = cp || QA || Function("return this")(),
        fp = typeof en == "object" && en && !en.nodeType && en,
        Wh = fp && typeof sr == "object" && sr && !sr.nodeType && sr,
        dp = Wh && Wh.exports === fp,
        Is = dp && cp.process,
        Gh = (function () {
            try {
                return Is && Is.binding && Is.binding("util");
            } catch {}
        })(),
        Vh = Gh && Gh.isTypedArray;
    function ZA(e, t) {
        for (var r = -1, n = e == null ? 0 : e.length, i = 0, o = []; ++r < n; ) {
            var s = e[r];
            t(s, r, e) && (o[i++] = s);
        }
        return o;
    }
    function ex(e, t) {
        for (var r = -1, n = t.length, i = e.length; ++r < n; ) e[i + r] = t[r];
        return e;
    }
    function tx(e, t) {
        for (var r = -1, n = e == null ? 0 : e.length; ++r < n; ) if (t(e[r], r, e)) return !0;
        return !1;
    }
    function rx(e, t) {
        for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
        return n;
    }
    function nx(e) {
        return function (t) {
            return e(t);
        };
    }
    function ix(e, t) {
        return e.has(t);
    }
    function ox(e, t) {
        return e?.[t];
    }
    function sx(e) {
        var t = -1,
            r = Array(e.size);
        return (
            e.forEach(function (n, i) {
                r[++t] = [i, n];
            }),
            r
        );
    }
    function ax(e, t) {
        return function (r) {
            return e(t(r));
        };
    }
    function lx(e) {
        var t = -1,
            r = Array(e.size);
        return (
            e.forEach(function (n) {
                r[++t] = n;
            }),
            r
        );
    }
    var ux = Array.prototype,
        cx = Function.prototype,
        _i = Object.prototype,
        Ns = Xe["__core-js_shared__"],
        hp = cx.toString,
        Be = _i.hasOwnProperty,
        Yh = (function () {
            var e = /[^.]+$/.exec((Ns && Ns.keys && Ns.keys.IE_PROTO) || "");
            return e ? "Symbol(src)_1." + e : "";
        })(),
        pp = _i.toString,
        fx = RegExp(
            "^" +
                hp
                    .call(Be)
                    .replace(XA, "\\$&")
                    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") +
                "$"
        ),
        zh = dp ? Xe.Buffer : void 0,
        gi = Xe.Symbol,
        Xh = Xe.Uint8Array,
        mp = _i.propertyIsEnumerable,
        dx = ux.splice,
        Ot = gi ? gi.toStringTag : void 0,
        Kh = Object.getOwnPropertySymbols,
        hx = zh ? zh.isBuffer : void 0,
        px = ax(Object.keys, Object),
        Fs = ar(Xe, "DataView"),
        tn = ar(Xe, "Map"),
        qs = ar(Xe, "Promise"),
        Ls = ar(Xe, "Set"),
        Us = ar(Xe, "WeakMap"),
        rn = ar(Object, "create"),
        mx = Rt(Fs),
        gx = Rt(tn),
        wx = Rt(qs),
        Ex = Rt(Ls),
        yx = Rt(Us),
        Jh = gi ? gi.prototype : void 0,
        Rs = Jh ? Jh.valueOf : void 0;
    function It(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
            var n = e[t];
            this.set(n[0], n[1]);
        }
    }
    function _x() {
        (this.__data__ = rn ? rn(null) : {}), (this.size = 0);
    }
    function vx(e) {
        var t = this.has(e) && delete this.__data__[e];
        return (this.size -= t ? 1 : 0), t;
    }
    function Sx(e) {
        var t = this.__data__;
        if (rn) {
            var r = t[e];
            return r === ks ? void 0 : r;
        }
        return Be.call(t, e) ? t[e] : void 0;
    }
    function Ax(e) {
        var t = this.__data__;
        return rn ? t[e] !== void 0 : Be.call(t, e);
    }
    function xx(e, t) {
        var r = this.__data__;
        return (this.size += this.has(e) ? 0 : 1), (r[e] = rn && t === void 0 ? ks : t), this;
    }
    It.prototype.clear = _x;
    It.prototype.delete = vx;
    It.prototype.get = Sx;
    It.prototype.has = Ax;
    It.prototype.set = xx;
    function Ke(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
            var n = e[t];
            this.set(n[0], n[1]);
        }
    }
    function Tx() {
        (this.__data__ = []), (this.size = 0);
    }
    function Cx(e) {
        var t = this.__data__,
            r = vi(t, e);
        if (r < 0) return !1;
        var n = t.length - 1;
        return r == n ? t.pop() : dx.call(t, r, 1), --this.size, !0;
    }
    function bx(e) {
        var t = this.__data__,
            r = vi(t, e);
        return r < 0 ? void 0 : t[r][1];
    }
    function Ox(e) {
        return vi(this.__data__, e) > -1;
    }
    function Ix(e, t) {
        var r = this.__data__,
            n = vi(r, e);
        return n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this;
    }
    Ke.prototype.clear = Tx;
    Ke.prototype.delete = Cx;
    Ke.prototype.get = bx;
    Ke.prototype.has = Ox;
    Ke.prototype.set = Ix;
    function Nt(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
            var n = e[t];
            this.set(n[0], n[1]);
        }
    }
    function Nx() {
        (this.size = 0), (this.__data__ = { hash: new It(), map: new (tn || Ke)(), string: new It() });
    }
    function Rx(e) {
        var t = Si(this, e).delete(e);
        return (this.size -= t ? 1 : 0), t;
    }
    function Dx(e) {
        return Si(this, e).get(e);
    }
    function Px(e) {
        return Si(this, e).has(e);
    }
    function Fx(e, t) {
        var r = Si(this, e),
            n = r.size;
        return r.set(e, t), (this.size += r.size == n ? 0 : 1), this;
    }
    Nt.prototype.clear = Nx;
    Nt.prototype.delete = Rx;
    Nt.prototype.get = Dx;
    Nt.prototype.has = Px;
    Nt.prototype.set = Fx;
    function wi(e) {
        var t = -1,
            r = e == null ? 0 : e.length;
        for (this.__data__ = new Nt(); ++t < r; ) this.add(e[t]);
    }
    function qx(e) {
        return this.__data__.set(e, ks), this;
    }
    function Lx(e) {
        return this.__data__.has(e);
    }
    wi.prototype.add = wi.prototype.push = qx;
    wi.prototype.has = Lx;
    function lt(e) {
        var t = (this.__data__ = new Ke(e));
        this.size = t.size;
    }
    function Ux() {
        (this.__data__ = new Ke()), (this.size = 0);
    }
    function $x(e) {
        var t = this.__data__,
            r = t.delete(e);
        return (this.size = t.size), r;
    }
    function kx(e) {
        return this.__data__.get(e);
    }
    function Mx(e) {
        return this.__data__.has(e);
    }
    function Bx(e, t) {
        var r = this.__data__;
        if (r instanceof Ke) {
            var n = r.__data__;
            if (!tn || n.length < PA - 1) return n.push([e, t]), (this.size = ++r.size), this;
            r = this.__data__ = new Nt(n);
        }
        return r.set(e, t), (this.size = r.size), this;
    }
    lt.prototype.clear = Ux;
    lt.prototype.delete = $x;
    lt.prototype.get = kx;
    lt.prototype.has = Mx;
    lt.prototype.set = Bx;
    function Hx(e, t) {
        var r = Ei(e),
            n = !r && nT(e),
            i = !r && !n && $s(e),
            o = !r && !n && !i && Sp(e),
            s = r || n || i || o,
            a = s ? rx(e.length, String) : [],
            l = a.length;
        for (var h in e)
            (t || Be.call(e, h)) &&
                !(
                    s &&
                    (h == "length" ||
                        (i && (h == "offset" || h == "parent")) ||
                        (o && (h == "buffer" || h == "byteLength" || h == "byteOffset")) ||
                        Qx(h, l))
                ) &&
                a.push(h);
        return a;
    }
    function vi(e, t) {
        for (var r = e.length; r--; ) if (Ep(e[r][0], t)) return r;
        return -1;
    }
    function jx(e, t, r) {
        var n = t(e);
        return Ei(e) ? n : ex(n, r(e));
    }
    function on(e) {
        return e == null ? (e === void 0 ? kA : LA) : Ot && Ot in Object(e) ? Kx(e) : rT(e);
    }
    function Qh(e) {
        return nn(e) && on(e) == di;
    }
    function gp(e, t, r, n, i) {
        return e === t ? !0 : e == null || t == null || (!nn(e) && !nn(t)) ? e !== e && t !== t : Wx(e, t, r, n, gp, i);
    }
    function Wx(e, t, r, n, i, o) {
        var s = Ei(e),
            a = Ei(t),
            l = s ? Ds : at(e),
            h = a ? Ds : at(t);
        (l = l == di ? or : l), (h = h == di ? or : h);
        var c = l == or,
            f = h == or,
            m = l == h;
        if (m && $s(e)) {
            if (!$s(t)) return !1;
            (s = !0), (c = !1);
        }
        if (m && !c) return o || (o = new lt()), s || Sp(e) ? wp(e, t, r, n, i, o) : zx(e, t, l, r, n, i, o);
        if (!(r & yi)) {
            var p = c && Be.call(e, "__wrapped__"),
                y = f && Be.call(t, "__wrapped__");
            if (p || y) {
                var _ = p ? e.value() : e,
                    v = y ? t.value() : t;
                return o || (o = new lt()), i(_, v, r, n, o);
            }
        }
        return m ? (o || (o = new lt()), Xx(e, t, r, n, i, o)) : !1;
    }
    function Gx(e) {
        if (!vp(e) || eT(e)) return !1;
        var t = yp(e) ? fx : KA;
        return t.test(Rt(e));
    }
    function Vx(e) {
        return nn(e) && _p(e.length) && !!z[on(e)];
    }
    function Yx(e) {
        if (!tT(e)) return px(e);
        var t = [];
        for (var r in Object(e)) Be.call(e, r) && r != "constructor" && t.push(r);
        return t;
    }
    function wp(e, t, r, n, i, o) {
        var s = r & yi,
            a = e.length,
            l = t.length;
        if (a != l && !(s && l > a)) return !1;
        var h = o.get(e);
        if (h && o.get(t)) return h == t;
        var c = -1,
            f = !0,
            m = r & ep ? new wi() : void 0;
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
                    !tx(t, function (v, x) {
                        if (!ix(m, x) && (p === v || i(p, v, r, n, o))) return m.push(x);
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
    function zx(e, t, r, n, i, o, s) {
        switch (r) {
            case mi:
                if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
                (e = e.buffer), (t = t.buffer);
            case up:
                return !(e.byteLength != t.byteLength || !o(new Xh(e), new Xh(t)));
            case rp:
            case np:
            case sp:
                return Ep(+e, +t);
            case ip:
                return e.name == t.name && e.message == t.message;
            case ap:
            case lp:
                return e == t + "";
            case hi:
                var a = sx;
            case pi:
                var l = n & yi;
                if ((a || (a = lx), e.size != t.size && !l)) return !1;
                var h = s.get(e);
                if (h) return h == t;
                (n |= ep), s.set(e, t);
                var c = wp(a(e), a(t), n, i, o, s);
                return s.delete(e), c;
            case $A:
                if (Rs) return Rs.call(e) == Rs.call(t);
        }
        return !1;
    }
    function Xx(e, t, r, n, i, o) {
        var s = r & yi,
            a = Zh(e),
            l = a.length,
            h = Zh(t),
            c = h.length;
        if (l != c && !s) return !1;
        for (var f = l; f--; ) {
            var m = a[f];
            if (!(s ? m in t : Be.call(t, m))) return !1;
        }
        var p = o.get(e);
        if (p && o.get(t)) return p == t;
        var y = !0;
        o.set(e, t), o.set(t, e);
        for (var _ = s; ++f < l; ) {
            m = a[f];
            var v = e[m],
                x = t[m];
            if (n) var A = s ? n(x, v, m, t, e, o) : n(v, x, m, e, t, o);
            if (!(A === void 0 ? v === x || i(v, x, r, n, o) : A)) {
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
    function Zh(e) {
        return jx(e, sT, Jx);
    }
    function Si(e, t) {
        var r = e.__data__;
        return Zx(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
    }
    function ar(e, t) {
        var r = ox(e, t);
        return Gx(r) ? r : void 0;
    }
    function Kx(e) {
        var t = Be.call(e, Ot),
            r = e[Ot];
        try {
            e[Ot] = void 0;
            var n = !0;
        } catch {}
        var i = pp.call(e);
        return n && (t ? (e[Ot] = r) : delete e[Ot]), i;
    }
    var Jx = Kh
            ? function (e) {
                  return e == null
                      ? []
                      : ((e = Object(e)),
                        ZA(Kh(e), function (t) {
                            return mp.call(e, t);
                        }));
              }
            : aT,
        at = on;
    ((Fs && at(new Fs(new ArrayBuffer(1))) != mi) ||
        (tn && at(new tn()) != hi) ||
        (qs && at(qs.resolve()) != jh) ||
        (Ls && at(new Ls()) != pi) ||
        (Us && at(new Us()) != Ps)) &&
        (at = function (e) {
            var t = on(e),
                r = t == or ? e.constructor : void 0,
                n = r ? Rt(r) : "";
            if (n)
                switch (n) {
                    case mx:
                        return mi;
                    case gx:
                        return hi;
                    case wx:
                        return jh;
                    case Ex:
                        return pi;
                    case yx:
                        return Ps;
                }
            return t;
        });
    function Qx(e, t) {
        return (t = t ?? tp), !!t && (typeof e == "number" || JA.test(e)) && e > -1 && e % 1 == 0 && e < t;
    }
    function Zx(e) {
        var t = typeof e;
        return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
    }
    function eT(e) {
        return !!Yh && Yh in e;
    }
    function tT(e) {
        var t = e && e.constructor,
            r = (typeof t == "function" && t.prototype) || _i;
        return e === r;
    }
    function rT(e) {
        return pp.call(e);
    }
    function Rt(e) {
        if (e != null) {
            try {
                return hp.call(e);
            } catch {}
            try {
                return e + "";
            } catch {}
        }
        return "";
    }
    function Ep(e, t) {
        return e === t || (e !== e && t !== t);
    }
    var nT = Qh(
            (function () {
                return arguments;
            })()
        )
            ? Qh
            : function (e) {
                  return nn(e) && Be.call(e, "callee") && !mp.call(e, "callee");
              },
        Ei = Array.isArray;
    function iT(e) {
        return e != null && _p(e.length) && !yp(e);
    }
    var $s = hx || lT;
    function oT(e, t) {
        return gp(e, t);
    }
    function yp(e) {
        if (!vp(e)) return !1;
        var t = on(e);
        return t == op || t == qA || t == FA || t == UA;
    }
    function _p(e) {
        return typeof e == "number" && e > -1 && e % 1 == 0 && e <= tp;
    }
    function vp(e) {
        var t = typeof e;
        return e != null && (t == "object" || t == "function");
    }
    function nn(e) {
        return e != null && typeof e == "object";
    }
    var Sp = Vh ? nx(Vh) : Vx;
    function sT(e) {
        return iT(e) ? Hx(e) : Yx(e);
    }
    function aT() {
        return [];
    }
    function lT() {
        return !1;
    }
    sr.exports = oT;
});
var Tp = g(an => {
    "use strict";
    Object.defineProperty(an, "__esModule", { value: !0 });
    an.DownloadedUpdateHelper = void 0;
    an.createTempUpdateFile = dT;
    var uT = require("crypto"),
        cT = require("fs"),
        xp = Ap(),
        Dt = Ve(),
        sn = require("path"),
        Ms = class {
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
                return sn.join(this.cacheDir, "pending");
            }
            async validateDownloadedPath(t, r, n, i) {
                if (this.versionInfo != null && this.file === t && this.fileInfo != null)
                    return xp(this.versionInfo, r) && xp(this.fileInfo.info, n.info) && (await (0, Dt.pathExists)(t)) ? t : null;
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
                    s && (await (0, Dt.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo));
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
                    await (0, Dt.emptyDir)(this.cacheDirForPendingUpdate);
                } catch {}
            }
            async getValidCachedUpdateFile(t, r) {
                let n = this.getUpdateInfoFile();
                if (!(await (0, Dt.pathExists)(n))) return null;
                let o;
                try {
                    o = await (0, Dt.readJson)(n);
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
                let a = sn.join(this.cacheDirForPendingUpdate, o.fileName);
                if (!(await (0, Dt.pathExists)(a))) return r.info("Cached update file doesn't exist"), null;
                let l = await fT(a);
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
                return sn.join(this.cacheDirForPendingUpdate, "update-info.json");
            }
        };
    an.DownloadedUpdateHelper = Ms;
    function fT(e, t = "sha512", r = "base64", n) {
        return new Promise((i, o) => {
            let s = (0, uT.createHash)(t);
            s.on("error", o).setEncoding(r),
                (0, cT.createReadStream)(e, { ...n, highWaterMark: 1024 * 1024 })
                    .on("error", o)
                    .on("end", () => {
                        s.end(), i(s.read());
                    })
                    .pipe(s, { end: !1 });
        });
    }
    async function dT(e, t, r) {
        let n = 0,
            i = sn.join(t, e);
        for (let o = 0; o < 3; o++)
            try {
                return await (0, Dt.unlink)(i), i;
            } catch (s) {
                if (s.code === "ENOENT") return i;
                r.warn("Error on remove temp update file: ".concat(s)), (i = sn.join(t, "".concat(n++, "-").concat(e)));
            }
        return i;
    }
});
var Cp = g(Hs => {
    "use strict";
    Object.defineProperty(Hs, "__esModule", { value: !0 });
    Hs.getAppCacheDir = pT;
    var Bs = require("path"),
        hT = require("os");
    function pT() {
        let e = (0, hT.homedir)(),
            t;
        return (
            process.platform === "win32"
                ? (t = process.env.LOCALAPPDATA || Bs.join(e, "AppData", "Local"))
                : process.platform === "darwin"
                ? (t = Bs.join(e, "Library", "Caches"))
                : (t = process.env.XDG_CACHE_HOME || Bs.join(e, ".cache")),
            t
        );
    }
});
var Op = g(Ai => {
    "use strict";
    Object.defineProperty(Ai, "__esModule", { value: !0 });
    Ai.ElectronAppAdapter = void 0;
    var bp = require("path"),
        mT = Cp(),
        js = class {
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
                    ? bp.join(process.resourcesPath, "app-update.yml")
                    : bp.join(this.app.getAppPath(), "dev-app-update.yml");
            }
            get userDataPath() {
                return this.app.getPath("userData");
            }
            get baseCachePath() {
                return (0, mT.getAppCacheDir)();
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
    Ai.ElectronAppAdapter = js;
});
var Np = g(ut => {
    "use strict";
    Object.defineProperty(ut, "__esModule", { value: !0 });
    ut.ElectronHttpExecutor = ut.NET_SESSION_NAME = void 0;
    ut.getNetSession = Ip;
    var xi = ie();
    ut.NET_SESSION_NAME = "electron-updater";
    function Ip() {
        return require("electron").session.fromPartition(ut.NET_SESSION_NAME, { cache: !1 });
    }
    var Ws = class extends xi.HttpExecutor {
        constructor(t) {
            super(), (this.proxyLoginCallback = t), (this.cachedSession = null);
        }
        async download(t, r, n) {
            return await n.cancellationToken.createPromise((i, o, s) => {
                let a = { headers: n.headers || void 0, redirect: "manual" };
                (0, xi.configureRequestUrl)(t, a),
                    (0, xi.configureRequestOptions)(a),
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
                this.cachedSession == null && (this.cachedSession = Ip());
            let n = require("electron").net.request({ ...t, session: this.cachedSession });
            return n.on("response", r), this.proxyLoginCallback != null && n.on("login", this.proxyLoginCallback), n;
        }
        addRedirectHandlers(t, r, n, i, o) {
            t.on("redirect", (s, a, l) => {
                t.abort(),
                    i > this.maxRedirects ? n(this.createMaxRedirectError()) : o(xi.HttpExecutor.prepareRedirectUrlOptions(l, r));
            });
        }
    };
    ut.ElectronHttpExecutor = Ws;
});
var Lp = g((ZI, qp) => {
    var gT = 1 / 0,
        wT = "[object Symbol]",
        Fp = /[\\^$.*+?()[\]{}|]/g,
        ET = RegExp(Fp.source),
        yT = typeof global == "object" && global && global.Object === Object && global,
        _T = typeof self == "object" && self && self.Object === Object && self,
        vT = yT || _T || Function("return this")(),
        ST = Object.prototype,
        AT = ST.toString,
        Rp = vT.Symbol,
        Dp = Rp ? Rp.prototype : void 0,
        Pp = Dp ? Dp.toString : void 0;
    function xT(e) {
        if (typeof e == "string") return e;
        if (CT(e)) return Pp ? Pp.call(e) : "";
        var t = e + "";
        return t == "0" && 1 / e == -gT ? "-0" : t;
    }
    function TT(e) {
        return !!e && typeof e == "object";
    }
    function CT(e) {
        return typeof e == "symbol" || (TT(e) && AT.call(e) == wT);
    }
    function bT(e) {
        return e == null ? "" : xT(e);
    }
    function OT(e) {
        return (e = bT(e)), e && ET.test(e) ? e.replace(Fp, "\\$&") : e;
    }
    qp.exports = OT;
});
var ct = g(lr => {
    "use strict";
    Object.defineProperty(lr, "__esModule", { value: !0 });
    lr.newBaseUrl = NT;
    lr.newUrlFromBase = Gs;
    lr.getChannelFilename = RT;
    lr.blockmapFiles = DT;
    var Up = require("url"),
        IT = Lp();
    function NT(e) {
        let t = new Up.URL(e);
        return t.pathname.endsWith("/") || (t.pathname += "/"), t;
    }
    function Gs(e, t, r = !1) {
        let n = new Up.URL(e, t),
            i = t.search;
        return i != null && i.length !== 0 ? (n.search = i) : r && (n.search = "noCache=".concat(Date.now().toString(32))), n;
    }
    function RT(e) {
        return "".concat(e, ".yml");
    }
    function DT(e, t, r) {
        let n = Gs("".concat(e.pathname, ".blockmap"), e);
        return [Gs("".concat(e.pathname.replace(new RegExp(IT(r), "g"), t), ".blockmap"), e), n];
    }
});
var qe = g(dt => {
    "use strict";
    Object.defineProperty(dt, "__esModule", { value: !0 });
    dt.Provider = void 0;
    dt.findFile = FT;
    dt.parseUpdateInfo = qT;
    dt.getFileList = kp;
    dt.resolveFiles = LT;
    var ft = ie(),
        PT = ei(),
        $p = ct(),
        Vs = class {
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
                    (0, ft.configureRequestUrl)(t, n),
                    n
                );
            }
        };
    dt.Provider = Vs;
    function FT(e, t, r) {
        if (e.length === 0) throw (0, ft.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
        let n = e.find(i => i.url.pathname.toLowerCase().endsWith(".".concat(t)));
        return n ?? (r == null ? e[0] : e.find(i => !r.some(o => i.url.pathname.toLowerCase().endsWith(".".concat(o)))));
    }
    function qT(e, t, r) {
        if (e == null)
            throw (0, ft.newError)(
                "Cannot parse update info from ".concat(t, " in the latest release artifacts (").concat(r, "): rawData: null"),
                "ERR_UPDATER_INVALID_UPDATE_INFO"
            );
        let n;
        try {
            n = (0, PT.load)(e);
        } catch (i) {
            throw (0, ft.newError)(
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
    function kp(e) {
        let t = e.files;
        if (t != null && t.length > 0) return t;
        if (e.path != null) return [{ url: e.path, sha2: e.sha2, sha512: e.sha512 }];
        throw (0, ft.newError)("No files provided: ".concat((0, ft.safeStringifyJson)(e)), "ERR_UPDATER_NO_FILES_PROVIDED");
    }
    function LT(e, t, r = n => n) {
        let i = kp(e).map(a => {
                if (a.sha2 == null && a.sha512 == null)
                    throw (0, ft.newError)(
                        "Update info doesn't contain nor sha256 neither sha512 checksum: ".concat((0, ft.safeStringifyJson)(a)),
                        "ERR_UPDATER_NO_CHECKSUM"
                    );
                return { url: (0, $p.newUrlFromBase)(r(a.url), t), info: a };
            }),
            o = e.packages,
            s = o == null ? null : o[process.arch] || o.ia32;
        return s != null && (i[0].packageInfo = { ...s, path: (0, $p.newUrlFromBase)(r(s.path), t).href }), i;
    }
});
var Ks = g(Ti => {
    "use strict";
    Object.defineProperty(Ti, "__esModule", { value: !0 });
    Ti.GenericProvider = void 0;
    var Mp = ie(),
        Ys = ct(),
        zs = qe(),
        Xs = class extends zs.Provider {
            constructor(t, r, n) {
                super(n),
                    (this.configuration = t),
                    (this.updater = r),
                    (this.baseUrl = (0, Ys.newBaseUrl)(this.configuration.url));
            }
            get channel() {
                let t = this.updater.channel || this.configuration.channel;
                return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
            }
            async getLatestVersion() {
                let t = (0, Ys.getChannelFilename)(this.channel),
                    r = (0, Ys.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
                for (let n = 0; ; n++)
                    try {
                        return (0, zs.parseUpdateInfo)(await this.httpRequest(r), t, r);
                    } catch (i) {
                        if (i instanceof Mp.HttpError && i.statusCode === 404)
                            throw (0, Mp.newError)(
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
                return (0, zs.resolveFiles)(t, this.baseUrl);
            }
        };
    Ti.GenericProvider = Xs;
});
var Hp = g(Ci => {
    "use strict";
    Object.defineProperty(Ci, "__esModule", { value: !0 });
    Ci.BitbucketProvider = void 0;
    var Bp = ie(),
        Js = ct(),
        Qs = qe(),
        Zs = class extends Qs.Provider {
            constructor(t, r, n) {
                super({ ...n, isUseMultipleRangeRequest: !1 }), (this.configuration = t), (this.updater = r);
                let { owner: i, slug: o } = t;
                this.baseUrl = (0, Js.newBaseUrl)(
                    "https://api.bitbucket.org/2.0/repositories/".concat(i, "/").concat(o, "/downloads")
                );
            }
            get channel() {
                return this.updater.channel || this.configuration.channel || "latest";
            }
            async getLatestVersion() {
                let t = new Bp.CancellationToken(),
                    r = (0, Js.getChannelFilename)(this.getCustomChannelName(this.channel)),
                    n = (0, Js.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
                try {
                    let i = await this.httpRequest(n, void 0, t);
                    return (0, Qs.parseUpdateInfo)(i, r, n);
                } catch (i) {
                    throw (0, Bp.newError)(
                        "Unable to find latest version on "
                            .concat(this.toString(), ", please ensure release exists: ")
                            .concat(i.stack || i.message),
                        "ERR_UPDATER_LATEST_VERSION_NOT_FOUND"
                    );
                }
            }
            resolveFiles(t) {
                return (0, Qs.resolveFiles)(t, this.baseUrl);
            }
            toString() {
                let { owner: t, slug: r } = this.configuration;
                return "Bitbucket (owner: ".concat(t, ", slug: ").concat(r, ", channel: ").concat(this.channel, ")");
            }
        };
    Ci.BitbucketProvider = Zs;
});
var na = g(Pt => {
    "use strict";
    Object.defineProperty(Pt, "__esModule", { value: !0 });
    Pt.GitHubProvider = Pt.BaseGitHubProvider = void 0;
    Pt.computeReleaseNotes = Wp;
    var Je = ie(),
        ur = Os(),
        UT = require("url"),
        cr = ct(),
        ta = qe(),
        ea = /\/tag\/([^/]+)$/,
        bi = class extends ta.Provider {
            constructor(t, r, n) {
                super({ ...n, isUseMultipleRangeRequest: !1 }),
                    (this.options = t),
                    (this.baseUrl = (0, cr.newBaseUrl)((0, Je.githubUrl)(t, r)));
                let i = r === "github.com" ? "api.github.com" : r;
                this.baseApiUrl = (0, cr.newBaseUrl)((0, Je.githubUrl)(t, i));
            }
            computeGithubBasePath(t) {
                let r = this.options.host;
                return r && !["github.com", "api.github.com"].includes(r) ? "/api/v3".concat(t) : t;
            }
        };
    Pt.BaseGitHubProvider = bi;
    var ra = class extends bi {
        constructor(t, r, n) {
            super(t, "github.com", n), (this.options = t), (this.updater = r);
        }
        get channel() {
            let t = this.updater.channel || this.options.channel;
            return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
        }
        async getLatestVersion() {
            var t, r, n, i, o;
            let s = new Je.CancellationToken(),
                a = await this.httpRequest(
                    (0, cr.newUrlFromBase)("".concat(this.basePath, ".atom"), this.baseUrl),
                    { accept: "application/xml, application/atom+xml, text/xml, */*" },
                    s
                ),
                l = (0, Je.parseXml)(a),
                h = l.element("entry", !1, "No published versions on GitHub"),
                c = null;
            try {
                if (this.updater.allowPrerelease) {
                    let v =
                        ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) ||
                        ((r = ur.prerelease(this.updater.currentVersion)) === null || r === void 0 ? void 0 : r[0]) ||
                        null;
                    if (v === null) c = ea.exec(h.element("link").attribute("href"))[1];
                    else
                        for (let x of l.getElements("entry")) {
                            let A = ea.exec(x.element("link").attribute("href"));
                            if (A === null) continue;
                            let N = A[1],
                                L = ((n = ur.prerelease(N)) === null || n === void 0 ? void 0 : n[0]) || null,
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
                        if (ea.exec(v.element("link").attribute("href"))[1] === c) {
                            h = v;
                            break;
                        }
                }
            } catch (v) {
                throw (0, Je.newError)(
                    "Cannot parse releases feed: ".concat(v.stack || v.message, ",\nXML:\n").concat(a),
                    "ERR_UPDATER_INVALID_RELEASE_FEED"
                );
            }
            if (c == null) throw (0, Je.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
            let f,
                m = "",
                p = "",
                y = async v => {
                    (m = (0, cr.getChannelFilename)(v)),
                        (p = (0, cr.newUrlFromBase)(this.getBaseDownloadPath(String(c), m), this.baseUrl));
                    let x = this.createRequestOptions(p);
                    try {
                        return await this.executor.request(x, s);
                    } catch (A) {
                        throw A instanceof Je.HttpError && A.statusCode === 404
                            ? (0, Je.newError)(
                                  "Cannot find "
                                      .concat(m, " in the latest release artifacts (")
                                      .concat(p, "): ")
                                      .concat(A.stack || A.message),
                                  "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND"
                              )
                            : A;
                    }
                };
            try {
                let v = this.channel;
                this.updater.allowPrerelease &&
                    !((i = ur.prerelease(c)) === null || i === void 0) &&
                    i[0] &&
                    (v = this.getCustomChannelName(String((o = ur.prerelease(c)) === null || o === void 0 ? void 0 : o[0]))),
                    (f = await y(v));
            } catch (v) {
                if (this.updater.allowPrerelease) f = await y(this.getDefaultChannelName());
                else throw v;
            }
            let _ = (0, ta.parseUpdateInfo)(f, m, p);
            return (
                _.releaseName == null && (_.releaseName = h.elementValueOrEmpty("title")),
                _.releaseNotes == null && (_.releaseNotes = Wp(this.updater.currentVersion, this.updater.fullChangelog, l, h)),
                { tag: c, ..._ }
            );
        }
        async getLatestTagName(t) {
            let r = this.options,
                n =
                    r.host == null || r.host === "github.com"
                        ? (0, cr.newUrlFromBase)("".concat(this.basePath, "/latest"), this.baseUrl)
                        : new UT.URL(
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
                throw (0, Je.newError)(
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
            return (0, ta.resolveFiles)(t, this.baseUrl, r => this.getBaseDownloadPath(t.tag, r.replace(/ /g, "-")));
        }
        getBaseDownloadPath(t, r) {
            return "".concat(this.basePath, "/download/").concat(t, "/").concat(r);
        }
    };
    Pt.GitHubProvider = ra;
    function jp(e) {
        let t = e.elementValueOrEmpty("content");
        return t === "No content." ? "" : t;
    }
    function Wp(e, t, r, n) {
        if (!t) return jp(n);
        let i = [];
        for (let o of r.getElements("entry")) {
            let s = /\/tag\/v?([^/]+)$/.exec(o.element("link").attribute("href"))[1];
            ur.lt(e, s) && i.push({ version: s, note: jp(o) });
        }
        return i.sort((o, s) => ur.rcompare(o.version, s.version));
    }
});
var Vp = g(Oi => {
    "use strict";
    Object.defineProperty(Oi, "__esModule", { value: !0 });
    Oi.KeygenProvider = void 0;
    var Gp = ie(),
        ia = ct(),
        oa = qe(),
        sa = class extends oa.Provider {
            constructor(t, r, n) {
                super({ ...n, isUseMultipleRangeRequest: !1 }),
                    (this.configuration = t),
                    (this.updater = r),
                    (this.baseUrl = (0, ia.newBaseUrl)(
                        "https://api.keygen.sh/v1/accounts/"
                            .concat(this.configuration.account, "/artifacts?product=")
                            .concat(this.configuration.product)
                    ));
            }
            get channel() {
                return this.updater.channel || this.configuration.channel || "stable";
            }
            async getLatestVersion() {
                let t = new Gp.CancellationToken(),
                    r = (0, ia.getChannelFilename)(this.getCustomChannelName(this.channel)),
                    n = (0, ia.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
                try {
                    let i = await this.httpRequest(n, { "Accept": "application/vnd.api+json", "Keygen-Version": "1.1" }, t);
                    return (0, oa.parseUpdateInfo)(i, r, n);
                } catch (i) {
                    throw (0, Gp.newError)(
                        "Unable to find latest version on "
                            .concat(this.toString(), ", please ensure release exists: ")
                            .concat(i.stack || i.message),
                        "ERR_UPDATER_LATEST_VERSION_NOT_FOUND"
                    );
                }
            }
            resolveFiles(t) {
                return (0, oa.resolveFiles)(t, this.baseUrl);
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
    Oi.KeygenProvider = sa;
});
var Xp = g(Ii => {
    "use strict";
    Object.defineProperty(Ii, "__esModule", { value: !0 });
    Ii.PrivateGitHubProvider = void 0;
    var fr = ie(),
        $T = ei(),
        kT = require("path"),
        Yp = require("url"),
        zp = ct(),
        MT = na(),
        BT = qe(),
        aa = class extends MT.BaseGitHubProvider {
            constructor(t, r, n, i) {
                super(t, "api.github.com", i), (this.updater = r), (this.token = n);
            }
            createRequestOptions(t, r) {
                let n = super.createRequestOptions(t, r);
                return (n.redirect = "manual"), n;
            }
            async getLatestVersion() {
                let t = new fr.CancellationToken(),
                    r = (0, zp.getChannelFilename)(this.getDefaultChannelName()),
                    n = await this.getLatestVersionInfo(t),
                    i = n.assets.find(a => a.name === r);
                if (i == null)
                    throw (0, fr.newError)(
                        "Cannot find ".concat(r, " in the release ").concat(n.html_url || n.name),
                        "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND"
                    );
                let o = new Yp.URL(i.url),
                    s;
                try {
                    s = (0, $T.load)(await this.httpRequest(o, this.configureHeaders("application/octet-stream"), t));
                } catch (a) {
                    throw a instanceof fr.HttpError && a.statusCode === 404
                        ? (0, fr.newError)(
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
                let i = (0, zp.newUrlFromBase)(n, this.baseUrl);
                try {
                    let o = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
                    return r ? o.find(s => s.prerelease) || o[0] : o;
                } catch (o) {
                    throw (0, fr.newError)(
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
                return (0, BT.getFileList)(t).map(r => {
                    let n = kT.posix.basename(r.url).replace(/ /g, "-"),
                        i = t.assets.find(o => o != null && o.name === n);
                    if (i == null)
                        throw (0, fr.newError)(
                            'Cannot find asset "'.concat(n, '" in: ').concat(JSON.stringify(t.assets, null, 2)),
                            "ERR_UPDATER_ASSET_NOT_FOUND"
                        );
                    return { url: new Yp.URL(i.url), info: r };
                });
            }
        };
    Ii.PrivateGitHubProvider = aa;
});
var Qp = g(Ri => {
    "use strict";
    Object.defineProperty(Ri, "__esModule", { value: !0 });
    Ri.isUrlProbablySupportMultiRangeRequests = Jp;
    Ri.createClient = VT;
    var Ni = ie(),
        HT = Hp(),
        Kp = Ks(),
        jT = na(),
        WT = Vp(),
        GT = Xp();
    function Jp(e) {
        return !e.includes("s3.amazonaws.com");
    }
    function VT(e, t, r) {
        if (typeof e == "string")
            throw (0, Ni.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
        let n = e.provider;
        switch (n) {
            case "github": {
                let i = e,
                    o = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
                return o == null ? new jT.GitHubProvider(i, t, r) : new GT.PrivateGitHubProvider(i, t, o, r);
            }
            case "bitbucket":
                return new HT.BitbucketProvider(e, t, r);
            case "keygen":
                return new WT.KeygenProvider(e, t, r);
            case "s3":
            case "spaces":
                return new Kp.GenericProvider(
                    { provider: "generic", url: (0, Ni.getS3LikeProviderBaseUrl)(e), channel: e.channel || null },
                    t,
                    { ...r, isUseMultipleRangeRequest: !1 }
                );
            case "generic": {
                let i = e;
                return new Kp.GenericProvider(i, t, {
                    ...r,
                    isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && Jp(i.url)
                });
            }
            case "custom": {
                let i = e,
                    o = i.updateProvider;
                if (!o) throw (0, Ni.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
                return new o(i, t, r);
            }
            default:
                throw (0, Ni.newError)("Unsupported provider: ".concat(n), "ERR_UPDATER_UNSUPPORTED_PROVIDER");
        }
    }
});
var Di = g(ln => {
    "use strict";
    Object.defineProperty(ln, "__esModule", { value: !0 });
    ln.OperationKind = void 0;
    ln.computeOperations = YT;
    var Ft;
    (function (e) {
        (e[(e.COPY = 0)] = "COPY"), (e[(e.DOWNLOAD = 1)] = "DOWNLOAD");
    })(Ft || (ln.OperationKind = Ft = {}));
    function YT(e, t, r) {
        let n = em(e.files),
            i = em(t.files),
            o = null,
            s = t.files[0],
            a = [],
            l = s.name,
            h = n.get(l);
        if (h == null) throw new Error("no file ".concat(l, " in old blockmap"));
        let c = i.get(l),
            f = 0,
            { checksumToOffset: m, checksumToOldSize: p } = XT(n.get(l), h.offset, r),
            y = s.offset;
        for (let _ = 0; _ < c.checksums.length; y += c.sizes[_], _++) {
            let v = c.sizes[_],
                x = c.checksums[_],
                A = m.get(x);
            A != null &&
                p.get(x) !== v &&
                (r.warn(
                    'Checksum ("'.concat(x, '") matches, but size differs (old: ').concat(p.get(x), ", new: ").concat(v, ")")
                ),
                (A = void 0)),
                A === void 0
                    ? (f++,
                      o != null && o.kind === Ft.DOWNLOAD && o.end === y
                          ? (o.end += v)
                          : ((o = { kind: Ft.DOWNLOAD, start: y, end: y + v }), Zp(o, a, x, _)))
                    : o != null && o.kind === Ft.COPY && o.end === A
                    ? (o.end += v)
                    : ((o = { kind: Ft.COPY, start: A, end: A + v }), Zp(o, a, x, _));
        }
        return f > 0 && r.info("File".concat(s.name === "file" ? "" : " " + s.name, " has ").concat(f, " changed blocks")), a;
    }
    var zT = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
    function Zp(e, t, r, n) {
        if (zT && t.length !== 0) {
            let i = t[t.length - 1];
            if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
                let o = [i.start, i.end, e.start, e.end].reduce((s, a) => (s < a ? s : a));
                throw new Error(
                    "operation (block index: "
                        .concat(n, ", checksum: ")
                        .concat(r, ", kind: ")
                        .concat(Ft[e.kind], ") overlaps previous operation (checksum: ")
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
    function XT(e, t, r) {
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
    function em(e) {
        let t = new Map();
        for (let r of e) t.set(r.name, r);
        return t;
    }
});
var ua = g(un => {
    "use strict";
    Object.defineProperty(un, "__esModule", { value: !0 });
    un.DataSplitter = void 0;
    un.copyData = rm;
    var Pi = ie(),
        KT = require("fs"),
        JT = require("stream"),
        QT = Di(),
        tm = Buffer.from("\r\n\r\n"),
        ht;
    (function (e) {
        (e[(e.INIT = 0)] = "INIT"), (e[(e.HEADER = 1)] = "HEADER"), (e[(e.BODY = 2)] = "BODY");
    })(ht || (ht = {}));
    function rm(e, t, r, n, i) {
        let o = (0, KT.createReadStream)("", { fd: r, autoClose: !1, start: e.start, end: e.end - 1 });
        o.on("error", n), o.once("end", i), o.pipe(t, { end: !1 });
    }
    var la = class extends JT.Writable {
        constructor(t, r, n, i, o, s) {
            super(),
                (this.out = t),
                (this.options = r),
                (this.partIndexToTaskIndex = n),
                (this.partIndexToLength = o),
                (this.finishHandler = s),
                (this.partIndex = -1),
                (this.headerListBuffer = null),
                (this.readState = ht.INIT),
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
                throw (0, Pi.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
            if (this.ignoreByteCount > 0) {
                let n = Math.min(this.ignoreByteCount, t.length);
                (this.ignoreByteCount -= n), (r = n);
            } else if (this.remainingPartDataCount > 0) {
                let n = Math.min(this.remainingPartDataCount, t.length);
                (this.remainingPartDataCount -= n), await this.processPartData(t, 0, n), (r = n);
            }
            if (r !== t.length) {
                if (this.readState === ht.HEADER) {
                    let n = this.searchHeaderListEnd(t, r);
                    if (n === -1) return;
                    (r = n), (this.readState = ht.BODY), (this.headerListBuffer = null);
                }
                for (;;) {
                    if (this.readState === ht.BODY) this.readState = ht.INIT;
                    else {
                        this.partIndex++;
                        let s = this.partIndexToTaskIndex.get(this.partIndex);
                        if (s == null)
                            if (this.isFinished) s = this.options.end;
                            else throw (0, Pi.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
                        let a = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
                        if (a < s) await this.copyExistingData(a, s);
                        else if (a > s)
                            throw (0, Pi.newError)(
                                "prevTaskIndex must be < taskIndex",
                                "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED"
                            );
                        if (this.isFinished) {
                            this.onPartEnd(), this.finishHandler();
                            return;
                        }
                        if (((r = this.searchHeaderListEnd(t, r)), r === -1)) {
                            this.readState = ht.HEADER;
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
                    if (s.kind !== QT.OperationKind.COPY) {
                        i(new Error("Task kind must be COPY"));
                        return;
                    }
                    rm(s, this.out, this.options.oldFileFd, i, () => {
                        t++, o();
                    });
                };
                o();
            });
        }
        searchHeaderListEnd(t, r) {
            let n = t.indexOf(tm, r);
            if (n !== -1) return n + tm.length;
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
                throw (0, Pi.newError)(
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
    un.DataSplitter = la;
});
var om = g(Fi => {
    "use strict";
    Object.defineProperty(Fi, "__esModule", { value: !0 });
    Fi.executeTasksUsingMultipleRangeRequests = ZT;
    Fi.checkIsRangesSupported = fa;
    var ca = ie(),
        nm = ua(),
        im = Di();
    function ZT(e, t, r, n, i) {
        let o = s => {
            if (s >= t.length) {
                e.fileMetadataBuffer != null && r.write(e.fileMetadataBuffer), r.end();
                return;
            }
            let a = s + 1e3;
            eC(e, { tasks: t, start: s, end: Math.min(t.length, a), oldFileFd: n }, r, () => o(a), i);
        };
        return o;
    }
    function eC(e, t, r, n, i) {
        let o = "bytes=",
            s = 0,
            a = new Map(),
            l = [];
        for (let f = t.start; f < t.end; f++) {
            let m = t.tasks[f];
            m.kind === im.OperationKind.DOWNLOAD &&
                ((o += "".concat(m.start, "-").concat(m.end - 1, ", ")), a.set(s, f), s++, l.push(m.end - m.start));
        }
        if (s <= 1) {
            let f = m => {
                if (m >= t.end) {
                    n();
                    return;
                }
                let p = t.tasks[m++];
                if (p.kind === im.OperationKind.COPY) (0, nm.copyData)(p, r, t.oldFileFd, i, () => f(m));
                else {
                    let y = e.createRequestOptions();
                    y.headers.Range = "bytes=".concat(p.start, "-").concat(p.end - 1);
                    let _ = e.httpExecutor.createRequest(y, v => {
                        fa(v, i) && (v.pipe(r, { end: !1 }), v.once("end", () => f(m)));
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
            if (!fa(f, i)) return;
            let m = (0, ca.safeGetHeader)(f, "content-type"),
                p = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(m);
            if (p == null) {
                i(new Error('Content-Type "multipart/byteranges" is expected, but got "'.concat(m, '"')));
                return;
            }
            let y = new nm.DataSplitter(r, t, a, p[1] || p[2], l, n);
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
    function fa(e, t) {
        if (e.statusCode >= 400) return t((0, ca.createHttpError)(e)), !1;
        if (e.statusCode !== 206) {
            let r = (0, ca.safeGetHeader)(e, "accept-ranges");
            if (r == null || r === "none")
                return t(new Error("Server doesn't support Accept-Ranges (response code ".concat(e.statusCode, ")"))), !1;
        }
        return !0;
    }
});
var sm = g(qi => {
    "use strict";
    Object.defineProperty(qi, "__esModule", { value: !0 });
    qi.ProgressDifferentialDownloadCallbackTransform = void 0;
    var tC = require("stream"),
        dr;
    (function (e) {
        (e[(e.COPY = 0)] = "COPY"), (e[(e.DOWNLOAD = 1)] = "DOWNLOAD");
    })(dr || (dr = {}));
    var da = class extends tC.Transform {
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
                (this.operationType = dr.COPY),
                (this.nextUpdate = this.start + 1e3);
        }
        _transform(t, r, n) {
            if (this.cancellationToken.cancelled) {
                n(new Error("cancelled"), null);
                return;
            }
            if (this.operationType == dr.COPY) {
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
            this.operationType = dr.COPY;
        }
        beginRangeDownload() {
            (this.operationType = dr.DOWNLOAD),
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
    qi.ProgressDifferentialDownloadCallbackTransform = da;
});
var ma = g(Ui => {
    "use strict";
    Object.defineProperty(Ui, "__esModule", { value: !0 });
    Ui.DifferentialDownloader = void 0;
    var cn = ie(),
        ha = Ve(),
        rC = require("fs"),
        nC = ua(),
        iC = require("url"),
        Li = Di(),
        am = om(),
        oC = sm(),
        pa = class {
            constructor(t, r, n) {
                (this.blockAwareFileInfo = t),
                    (this.httpExecutor = r),
                    (this.options = n),
                    (this.fileMetadataBuffer = null),
                    (this.logger = n.logger);
            }
            createRequestOptions() {
                let t = { headers: { ...this.options.requestHeaders, accept: "*/*" } };
                return (0, cn.configureRequestUrl)(this.options.newUrl, t), (0, cn.configureRequestOptions)(t), t;
            }
            doDownload(t, r) {
                if (t.version !== r.version)
                    throw new Error(
                        "version is different (".concat(t.version, " - ").concat(r.version, "), full download is required")
                    );
                let n = this.logger,
                    i = (0, Li.computeOperations)(t, r, n);
                n.debug != null && n.debug(JSON.stringify(i, null, 2));
                let o = 0,
                    s = 0;
                for (let l of i) {
                    let h = l.end - l.start;
                    l.kind === Li.OperationKind.DOWNLOAD ? (o += h) : (s += h);
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
                            .concat(lm(a), ", To download: ")
                            .concat(lm(o), " (")
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
                                (0, ha.close)(i.descriptor).catch(o => {
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
                let n = await (0, ha.open)(this.options.oldFile, "r");
                r.push({ descriptor: n, path: this.options.oldFile });
                let i = await (0, ha.open)(this.options.newFile, "w");
                r.push({ descriptor: i, path: this.options.newFile });
                let o = (0, rC.createWriteStream)(this.options.newFile, { fd: i });
                await new Promise((s, a) => {
                    let l = [],
                        h;
                    if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
                        let x = [],
                            A = 0;
                        for (let L of t)
                            L.kind === Li.OperationKind.DOWNLOAD && (x.push(L.end - L.start), (A += L.end - L.start));
                        let N = { expectedByteCounts: x, grandTotal: A };
                        (h = new oC.ProgressDifferentialDownloadCallbackTransform(
                            N,
                            this.options.cancellationToken,
                            this.options.onProgress
                        )),
                            l.push(h);
                    }
                    let c = new cn.DigestTransform(this.blockAwareFileInfo.sha512);
                    (c.isValidateOnEnd = !1),
                        l.push(c),
                        o.on("finish", () => {
                            o.close(() => {
                                r.splice(1, 1);
                                try {
                                    c.validate();
                                } catch (x) {
                                    a(x);
                                    return;
                                }
                                s(void 0);
                            });
                        }),
                        l.push(o);
                    let f = null;
                    for (let x of l) x.on("error", a), f == null ? (f = x) : (f = f.pipe(x));
                    let m = l[0],
                        p;
                    if (this.options.isUseMultipleRangeRequest) {
                        (p = (0, am.executeTasksUsingMultipleRangeRequests)(this, t, m, n, a)), p(0);
                        return;
                    }
                    let y = 0,
                        _ = null;
                    this.logger.info("Differential download: ".concat(this.options.newUrl));
                    let v = this.createRequestOptions();
                    (v.redirect = "manual"),
                        (p = x => {
                            var A, N;
                            if (x >= t.length) {
                                this.fileMetadataBuffer != null && m.write(this.fileMetadataBuffer), m.end();
                                return;
                            }
                            let L = t[x++];
                            if (L.kind === Li.OperationKind.COPY) {
                                h && h.beginFileCopy(), (0, nC.copyData)(L, m, n, a, () => p(x));
                                return;
                            }
                            let De = "bytes=".concat(L.start, "-").concat(L.end - 1);
                            (v.headers.range = De),
                                (N = (A = this.logger) === null || A === void 0 ? void 0 : A.debug) === null ||
                                    N === void 0 ||
                                    N.call(A, "download range: ".concat(De)),
                                h && h.beginRangeDownload();
                            let V = this.httpExecutor.createRequest(v, se => {
                                se.on("error", a),
                                    se.on("aborted", () => {
                                        a(new Error("response has been aborted by the server"));
                                    }),
                                    se.statusCode >= 400 && a((0, cn.createHttpError)(se)),
                                    se.pipe(m, { end: !1 }),
                                    se.once("end", () => {
                                        h && h.endRangeDownload(), ++y === 100 ? ((y = 0), setTimeout(() => p(x), 1e3)) : p(x);
                                    });
                            });
                            V.on("redirect", (se, E, D) => {
                                this.logger.info("Redirect to ".concat(sC(D))),
                                    (_ = D),
                                    (0, cn.configureRequestUrl)(new iC.URL(_), v),
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
                        (0, am.checkIsRangesSupported)(s, i) &&
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
    Ui.DifferentialDownloader = pa;
    function lm(e, t = " KB") {
        return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
    }
    function sC(e) {
        let t = e.indexOf("?");
        return t < 0 ? e : e.substring(0, t);
    }
});
var um = g($i => {
    "use strict";
    Object.defineProperty($i, "__esModule", { value: !0 });
    $i.GenericDifferentialDownloader = void 0;
    var aC = ma(),
        ga = class extends aC.DifferentialDownloader {
            download(t, r) {
                return this.doDownload(t, r);
            }
        };
    $i.GenericDifferentialDownloader = ga;
});
var Mi = g(mr => {
    "use strict";
    Object.defineProperty(mr, "__esModule", { value: !0 });
    mr.NoOpLogger = mr.AppUpdater = void 0;
    var Se = ie(),
        lC = require("crypto"),
        uC = require("os"),
        cC = require("events"),
        hr = Ve(),
        fC = ei(),
        wa = Qf(),
        qt = require("path"),
        Lt = Os(),
        cm = Tp(),
        dC = Op(),
        fm = Np(),
        hC = Ks(),
        pr = Ut(),
        Ea = Qp(),
        pC = require("zlib"),
        mC = ct(),
        gC = um(),
        ya = class e extends cC.EventEmitter {
            get channel() {
                return this._channel;
            }
            set channel(t) {
                if (this._channel != null) {
                    if (typeof t != "string")
                        throw (0, Se.newError)("Channel must be a string, but got: ".concat(t), "ERR_UPDATER_INVALID_CHANNEL");
                    if (t.length === 0)
                        throw (0, Se.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
                }
                (this._channel = t), (this.allowDowngrade = !0);
            }
            addAuthHeader(t) {
                this.requestHeaders = Object.assign({}, this.requestHeaders, { authorization: t });
            }
            get netSession() {
                return (0, fm.getNetSession)();
            }
            get logger() {
                return this._logger;
            }
            set logger(t) {
                this._logger = t ?? new ki();
            }
            set updateConfigPath(t) {
                (this.clientPromise = null),
                    (this._appUpdateConfigPath = t),
                    (this.configOnDisk = new wa.Lazy(() => this.loadUpdateConfig()));
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
                    (this.signals = new pr.UpdaterSignal(this)),
                    (this._appUpdateConfigPath = null),
                    (this.clientPromise = null),
                    (this.stagingUserIdPromise = new wa.Lazy(() => this.getOrCreateStagingUserId())),
                    (this.configOnDisk = new wa.Lazy(() => this.loadUpdateConfig())),
                    (this.checkForUpdatesPromise = null),
                    (this.downloadPromise = null),
                    (this.updateInfoAndProvider = null),
                    (this._testOnlyOptions = null),
                    this.on("error", o => {
                        this._logger.error("Error: ".concat(o.stack || o.message));
                    }),
                    r == null
                        ? ((this.app = new dC.ElectronAppAdapter()),
                          (this.httpExecutor = new fm.ElectronHttpExecutor((o, s) => this.emit("login", o, s))))
                        : ((this.app = r), (this.httpExecutor = null));
                let n = this.app.version,
                    i = (0, Lt.parse)(n);
                if (i == null)
                    throw (0, Se.newError)(
                        'App version is not a valid semver version: "'.concat(n, '"'),
                        "ERR_UPDATER_INVALID_VERSION"
                    );
                (this.currentVersion = i),
                    (this.allowPrerelease = wC(i)),
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
                    ? (n = new hC.GenericProvider({ provider: "generic", url: t }, this, {
                          ...r,
                          isUseMultipleRangeRequest: (0, Ea.isUrlProbablySupportMultiRangeRequests)(t)
                      }))
                    : (n = (0, Ea.createClient)(t, this, r)),
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
                    s = Se.UUID.parse(i).readUInt32BE(12) / 4294967295;
                return (
                    this._logger.info("Staging percentage: ".concat(n, ", percentage: ").concat(s, ", user id: ").concat(i)),
                    s < n
                );
            }
            computeFinalHeaders(t) {
                return this.requestHeaders != null && Object.assign(t, this.requestHeaders), t;
            }
            async isUpdateAvailable(t) {
                let r = (0, Lt.parse)(t.version);
                if (r == null)
                    throw (0, Se.newError)(
                        'This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "'.concat(
                            t.version,
                            '"'
                        ),
                        "ERR_UPDATER_INVALID_VERSION"
                    );
                let n = this.currentVersion;
                if ((0, Lt.eq)(r, n)) return !1;
                let i = t?.minimumSystemVersion,
                    o = (0, uC.release)();
                if (i)
                    try {
                        if ((0, Lt.lt)(o, i))
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
                let a = (0, Lt.gt)(r, n),
                    l = (0, Lt.lt)(r, n);
                return a ? !0 : this.allowDowngrade && l;
            }
            async getUpdateInfoAndProvider() {
                await this.app.whenReady(),
                    this.clientPromise == null &&
                        (this.clientPromise = this.configOnDisk.value.then(n =>
                            (0, Ea.createClient)(n, this, this.createProviderRuntimeOptions())
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
                let n = new Se.CancellationToken();
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
                        (0, Se.asArray)(t.files)
                            .map(r => r.url)
                            .join(", "),
                        ")"
                    )
                ),
                    this.emit("update-available", t);
            }
            downloadUpdate(t = new Se.CancellationToken()) {
                let r = this.updateInfoAndProvider;
                if (r == null) {
                    let i = new Error("Please check update first");
                    return this.dispatchError(i), Promise.reject(i);
                }
                if (this.downloadPromise != null)
                    return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
                this._logger.info(
                    "Downloading update from ".concat(
                        (0, Se.asArray)(r.info.files)
                            .map(i => i.url)
                            .join(", ")
                    )
                );
                let n = i => {
                    if (!(i instanceof Se.CancellationError))
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
                this.emit(pr.UPDATE_DOWNLOADED, t);
            }
            async loadUpdateConfig() {
                return (
                    this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath),
                    (0, fC.load)(await (0, hr.readFile)(this._appUpdateConfigPath, "utf-8"))
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
                let t = qt.join(this.app.userDataPath, ".updaterId");
                try {
                    let n = await (0, hr.readFile)(t, "utf-8");
                    if (Se.UUID.check(n)) return n;
                    this._logger.warn("Staging user id file exists, but content was invalid: ".concat(n));
                } catch (n) {
                    n.code !== "ENOENT" && this._logger.warn("Couldn't read staging user ID, creating a blank one: ".concat(n));
                }
                let r = Se.UUID.v5((0, lC.randomBytes)(4096), Se.UUID.OID);
                this._logger.info("Generated new staging user ID: ".concat(r));
                try {
                    await (0, hr.outputFile)(t, r);
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
                    let i = qt.join(this.app.baseCachePath, r || this.app.name);
                    n.debug != null && n.debug("updater cache dir: ".concat(i)),
                        (t = new cm.DownloadedUpdateHelper(i)),
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
                this.listenerCount(pr.DOWNLOAD_PROGRESS) > 0 && (n.onProgress = A => this.emit(pr.DOWNLOAD_PROGRESS, A));
                let i = t.downloadUpdateOptions.updateInfoAndProvider.info,
                    o = i.version,
                    s = r.packageInfo;
                function a() {
                    let A = decodeURIComponent(t.fileInfo.url.pathname);
                    return A.endsWith(".".concat(t.fileExtension)) ? qt.basename(A) : t.fileInfo.info.url;
                }
                let l = await this.getOrCreateDownloadHelper(),
                    h = l.cacheDirForPendingUpdate;
                await (0, hr.mkdir)(h, { recursive: !0 });
                let c = a(),
                    f = qt.join(h, c),
                    m = s == null ? null : qt.join(h, "package-".concat(o).concat(qt.extname(s.path) || ".7z")),
                    p = async A => (
                        await l.setDownloadedFile(f, m, i, r, c, A),
                        await t.done({ ...i, downloadedFile: f }),
                        m == null ? [f] : [f, m]
                    ),
                    y = this._logger,
                    _ = await l.validateDownloadedPath(f, i, r, y);
                if (_ != null) return (f = _), await p(!1);
                let v = async () => (await l.clear().catch(() => {}), await (0, hr.unlink)(f).catch(() => {})),
                    x = await (0, cm.createTempUpdateFile)("temp-".concat(c), h, y);
                try {
                    await t.task(x, n, m, v),
                        await (0, Se.retry)(
                            () => (0, hr.rename)(x, f),
                            60,
                            500,
                            0,
                            0,
                            A => A instanceof Error && /^EBUSY:/.test(A.message)
                        );
                } catch (A) {
                    throw (
                        (await v(),
                        A instanceof Se.CancellationError && (y.info("cancelled"), this.emit("update-cancelled", i)),
                        A)
                    );
                }
                return y.info("New version ".concat(o, " has been downloaded to ").concat(f)), await p(!0);
            }
            async differentialDownloadInstaller(t, r, n, i, o) {
                try {
                    if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload) return !0;
                    let s = (0, mC.blockmapFiles)(t.url, this.app.version, r.updateInfoAndProvider.info.version);
                    this._logger.info('Download block maps (old: "'.concat(s[0], '", new: ').concat(s[1], ")"));
                    let a = async c => {
                            let f = await this.httpExecutor.downloadToBuffer(c, {
                                headers: r.requestHeaders,
                                cancellationToken: r.cancellationToken
                            });
                            if (f == null || f.length === 0) throw new Error('Blockmap "'.concat(c.href, '" is empty'));
                            try {
                                return JSON.parse((0, pC.gunzipSync)(f).toString());
                            } catch (m) {
                                throw new Error('Cannot parse blockmap "'.concat(c.href, '", error: ').concat(m));
                            }
                        },
                        l = {
                            newUrl: t.url,
                            oldFile: qt.join(this.downloadedUpdateHelper.cacheDir, o),
                            logger: this._logger,
                            newFile: n,
                            isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
                            requestHeaders: r.requestHeaders,
                            cancellationToken: r.cancellationToken
                        };
                    this.listenerCount(pr.DOWNLOAD_PROGRESS) > 0 && (l.onProgress = c => this.emit(pr.DOWNLOAD_PROGRESS, c));
                    let h = await Promise.all(s.map(c => a(c)));
                    return await new gC.GenericDifferentialDownloader(t.info, this.httpExecutor, l).download(h[0], h[1]), !1;
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
    mr.AppUpdater = ya;
    function wC(e) {
        let t = (0, Lt.prerelease)(e);
        return t != null && t.length > 0;
    }
    var ki = class {
        info(t) {}
        warn(t) {}
        error(t) {}
    };
    mr.NoOpLogger = ki;
});
var gr = g(Bi => {
    "use strict";
    Object.defineProperty(Bi, "__esModule", { value: !0 });
    Bi.BaseUpdater = void 0;
    var dm = require("child_process"),
        EC = Mi(),
        _a = class extends EC.AppUpdater {
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
                    (0, dm.spawnSync)(t, r, { env: { ...process.env, ...n }, encoding: "utf-8", shell: !0 }).stdout.trim()
                );
            }
            async spawnLog(t, r = [], n = void 0, i = "ignore") {
                return (
                    this._logger.info("Executing: ".concat(t, " with args: ").concat(r)),
                    new Promise((o, s) => {
                        try {
                            let a = { stdio: i, env: n, detached: !0 },
                                l = (0, dm.spawn)(t, r, a);
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
    Bi.BaseUpdater = _a;
});
var Sa = g(Hi => {
    "use strict";
    Object.defineProperty(Hi, "__esModule", { value: !0 });
    Hi.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
    var wr = Ve(),
        yC = ma(),
        _C = require("zlib"),
        va = class extends yC.DifferentialDownloader {
            async download() {
                let t = this.blockAwareFileInfo,
                    r = t.size,
                    n = r - (t.blockMapSize + 4);
                this.fileMetadataBuffer = await this.readRemoteBytes(n, r - 1);
                let i = hm(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
                await this.doDownload(await vC(this.options.oldFile), i);
            }
        };
    Hi.FileWithEmbeddedBlockMapDifferentialDownloader = va;
    function hm(e) {
        return JSON.parse((0, _C.inflateRawSync)(e).toString());
    }
    async function vC(e) {
        let t = await (0, wr.open)(e, "r");
        try {
            let r = (await (0, wr.fstat)(t)).size,
                n = Buffer.allocUnsafe(4);
            await (0, wr.read)(t, n, 0, n.length, r - n.length);
            let i = Buffer.allocUnsafe(n.readUInt32BE(0));
            return await (0, wr.read)(t, i, 0, i.length, r - n.length - i.length), await (0, wr.close)(t), hm(i);
        } catch (r) {
            throw (await (0, wr.close)(t), r);
        }
    }
});
var xa = g(ji => {
    "use strict";
    Object.defineProperty(ji, "__esModule", { value: !0 });
    ji.AppImageUpdater = void 0;
    var pm = ie(),
        mm = require("child_process"),
        SC = Ve(),
        AC = require("fs"),
        fn = require("path"),
        xC = gr(),
        TC = Sa(),
        gm = Ut(),
        CC = qe(),
        Aa = class extends xC.BaseUpdater {
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
                    n = (0, CC.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "AppImage", ["rpm", "deb"]);
                return this.executeDownload({
                    fileExtension: "AppImage",
                    fileInfo: n,
                    downloadUpdateOptions: t,
                    task: async (i, o) => {
                        let s = process.env.APPIMAGE;
                        if (s == null) throw (0, pm.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
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
                            this.listenerCount(gm.DOWNLOAD_PROGRESS) > 0 &&
                                (l.onProgress = h => this.emit(gm.DOWNLOAD_PROGRESS, h)),
                                await new TC.FileWithEmbeddedBlockMapDifferentialDownloader(
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
                        a && (await this.httpExecutor.download(n.url, i, o)), await (0, SC.chmod)(i, 493);
                    }
                });
            }
            doInstall(t) {
                let r = process.env.APPIMAGE;
                if (r == null) throw (0, pm.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
                (0, AC.unlinkSync)(r);
                let n,
                    i = fn.basename(r);
                fn.basename(t.installerPath) === i || !/\d+\.\d+\.\d+/.test(i)
                    ? (n = r)
                    : (n = fn.join(fn.dirname(r), fn.basename(t.installerPath))),
                    (0, mm.execFileSync)("mv", ["-f", t.installerPath, n]),
                    n !== r && this.emit("appimage-filename-updated", n);
                let o = { ...process.env, APPIMAGE_SILENT_INSTALL: "true" };
                return (
                    t.isForceRunAfter
                        ? this.spawnLog(n, [], o)
                        : ((o.APPIMAGE_EXIT_AFTER_INSTALL = "true"), (0, mm.execFileSync)(n, [], { env: o })),
                    !0
                );
            }
        };
    ji.AppImageUpdater = Aa;
});
var Ca = g(Wi => {
    "use strict";
    Object.defineProperty(Wi, "__esModule", { value: !0 });
    Wi.DebUpdater = void 0;
    var bC = gr(),
        wm = Ut(),
        OC = qe(),
        Ta = class extends bC.BaseUpdater {
            constructor(t, r) {
                super(t, r);
            }
            doDownloadUpdate(t) {
                let r = t.updateInfoAndProvider.provider,
                    n = (0, OC.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "deb", ["AppImage", "rpm"]);
                return this.executeDownload({
                    fileExtension: "deb",
                    fileInfo: n,
                    downloadUpdateOptions: t,
                    task: async (i, o) => {
                        this.listenerCount(wm.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = s => this.emit(wm.DOWNLOAD_PROGRESS, s)),
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
    Wi.DebUpdater = Ta;
});
var Oa = g(Gi => {
    "use strict";
    Object.defineProperty(Gi, "__esModule", { value: !0 });
    Gi.RpmUpdater = void 0;
    var IC = gr(),
        Em = Ut(),
        NC = qe(),
        ba = class extends IC.BaseUpdater {
            constructor(t, r) {
                super(t, r);
            }
            doDownloadUpdate(t) {
                let r = t.updateInfoAndProvider.provider,
                    n = (0, NC.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "rpm", ["AppImage", "deb"]);
                return this.executeDownload({
                    fileExtension: "rpm",
                    fileInfo: n,
                    downloadUpdateOptions: t,
                    task: async (i, o) => {
                        this.listenerCount(Em.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = s => this.emit(Em.DOWNLOAD_PROGRESS, s)),
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
    Gi.RpmUpdater = ba;
});
var Na = g(Vi => {
    "use strict";
    Object.defineProperty(Vi, "__esModule", { value: !0 });
    Vi.MacUpdater = void 0;
    var ym = ie(),
        _m = Ve(),
        vm = require("fs"),
        Sm = require("path"),
        RC = require("http"),
        DC = Mi(),
        PC = qe(),
        Am = require("child_process"),
        xm = require("crypto"),
        Ia = class extends DC.AppUpdater {
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
                        (o = (0, Am.execFileSync)("sysctl", [i], { encoding: "utf8" }).includes("".concat(i, ": 1"))),
                        n.info("Checked for macOS Rosetta environment (isRosetta=".concat(o, ")"));
                } catch (f) {
                    n.warn("sysctl shell command to check for macOS Rosetta environment failed: ".concat(f));
                }
                let s = !1;
                try {
                    this.debug("Checking for arm64 in uname");
                    let m = (0, Am.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
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
                let l = (0, PC.findFile)(r, "zip", ["pkg", "dmg"]);
                if (l == null)
                    throw (0, ym.newError)(
                        "ZIP file not provided: ".concat((0, ym.safeStringifyJson)(r)),
                        "ERR_UPDATER_ZIP_FILE_NOT_FOUND"
                    );
                let h = t.updateInfoAndProvider.provider,
                    c = "update.zip";
                return this.executeDownload({
                    fileExtension: "zip",
                    fileInfo: l,
                    downloadUpdateOptions: t,
                    task: async (f, m) => {
                        let p = Sm.join(this.downloadedUpdateHelper.cacheDir, c),
                            y = () =>
                                (0, _m.pathExistsSync)(p)
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
                                let m = Sm.join(this.downloadedUpdateHelper.cacheDir, c);
                                (0, vm.copyFileSync)(f.downloadedFile, m);
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
                    o = (n = t.info.size) !== null && n !== void 0 ? n : (await (0, _m.stat)(i)).size,
                    s = this._logger,
                    a = "fileToProxy=".concat(t.url.href);
                this.closeServerIfExists(),
                    this.debug("Creating proxy server for native Squirrel.Mac (".concat(a, ")")),
                    (this.server = (0, RC.createServer)()),
                    this.debug("Proxy server for native Squirrel.Mac is created (".concat(a, ")")),
                    this.server.on("close", () => {
                        s.info("Proxy server for native Squirrel.Mac is closed (".concat(a, ")"));
                    });
                let l = h => {
                    let c = h.address();
                    return typeof c == "string" ? c : "http://127.0.0.1:".concat(c?.port);
                };
                return await new Promise((h, c) => {
                    let f = (0, xm.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"),
                        m = Buffer.from("autoupdater:".concat(f), "ascii"),
                        p = "/".concat((0, xm.randomBytes)(64).toString("hex"), ".zip");
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
                                [De, V] = L.split(":");
                            if (De !== "autoupdater" || V !== f) {
                                (_.statusCode = 401),
                                    (_.statusMessage = "Invalid Authentication Credentials"),
                                    _.end(),
                                    s.warn("Invalid authenthication credentials");
                                return;
                            }
                            let se = Buffer.from('{ "url": "'.concat(l(this.server)).concat(p, '" }'));
                            _.writeHead(200, { "Content-Type": "application/json", "Content-Length": se.length }), _.end(se);
                            return;
                        }
                        if (!v.startsWith(p)) {
                            s.warn("".concat(v, " requested, but not supported")), _.writeHead(404), _.end();
                            return;
                        }
                        s.info("".concat(p, " requested by Squirrel.Mac, pipe ").concat(i));
                        let x = !1;
                        _.on("finish", () => {
                            x || (this.nativeUpdater.removeListener("error", c), h([]));
                        });
                        let A = (0, vm.createReadStream)(i);
                        A.on("error", N => {
                            try {
                                _.end();
                            } catch (L) {
                                s.warn("cannot end response: ".concat(L));
                            }
                            (x = !0),
                                this.nativeUpdater.removeListener("error", c),
                                c(new Error('Cannot pipe "'.concat(i, '": ').concat(N)));
                        }),
                            _.writeHead(200, { "Content-Type": "application/zip", "Content-Length": o }),
                            A.pipe(_);
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
    Vi.MacUpdater = Ia;
});
var Om = g(Da => {
    "use strict";
    Object.defineProperty(Da, "__esModule", { value: !0 });
    Da.verifySignature = qC;
    var Tm = ie(),
        bm = require("child_process"),
        FC = require("os"),
        Cm = require("path");
    function qC(e, t, r) {
        return new Promise((n, i) => {
            let o = t.replace(/'/g, "''");
            r.info("Verifying signature ".concat(o)),
                (0, bm.execFile)(
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
                                Ra(r, s, l, i), n(null);
                                return;
                            }
                            let c = LC(a);
                            if (c.Status === 0) {
                                try {
                                    let y = Cm.normalize(c.Path),
                                        _ = Cm.normalize(t);
                                    if ((r.info("LiteralPath: ".concat(y, ". Update Path: ").concat(_)), y !== _)) {
                                        Ra(r, new Error("LiteralPath of ".concat(y, " is different than ").concat(_)), l, i),
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
                                let m = (0, Tm.parseDn)(c.SignerCertificate.Subject),
                                    p = !1;
                                for (let y of e) {
                                    let _ = (0, Tm.parseDn)(y);
                                    if (
                                        (_.size
                                            ? (p = Array.from(_.keys()).every(x => _.get(x) === m.get(x)))
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
                            Ra(r, c, null, i), n(null);
                            return;
                        }
                    }
                );
        });
    }
    function LC(e) {
        let t = JSON.parse(e);
        delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
        let r = t.SignerCertificate;
        return (
            r != null && (delete r.Archived, delete r.Extensions, delete r.Handle, delete r.HasPrivateKey, delete r.SubjectName),
            t
        );
    }
    function Ra(e, t, r, n) {
        if (UC()) {
            e.warn(
                "Cannot execute Get-AuthenticodeSignature: ".concat(
                    t || r,
                    ". Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher."
                )
            );
            return;
        }
        try {
            (0, bm.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], {
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
    function UC() {
        let e = FC.release();
        return e.startsWith("6.") && !e.startsWith("6.3");
    }
});
var Fa = g(zi => {
    "use strict";
    Object.defineProperty(zi, "__esModule", { value: !0 });
    zi.NsisUpdater = void 0;
    var Yi = ie(),
        Im = require("path"),
        $C = gr(),
        kC = Sa(),
        Nm = Ut(),
        MC = qe(),
        BC = Ve(),
        HC = Om(),
        Rm = require("url"),
        Pa = class extends $C.BaseUpdater {
            constructor(t, r) {
                super(t, r), (this._verifyUpdateCodeSignature = (n, i) => (0, HC.verifySignature)(n, i, this._logger));
            }
            get verifyUpdateCodeSignature() {
                return this._verifyUpdateCodeSignature;
            }
            set verifyUpdateCodeSignature(t) {
                t && (this._verifyUpdateCodeSignature = t);
            }
            doDownloadUpdate(t) {
                let r = t.updateInfoAndProvider.provider,
                    n = (0, MC.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "exe");
                return this.executeDownload({
                    fileExtension: "exe",
                    downloadUpdateOptions: t,
                    fileInfo: n,
                    task: async (i, o, s, a) => {
                        let l = n.packageInfo,
                            h = l != null && s != null;
                        if (h && t.disableWebInstaller)
                            throw (0, Yi.newError)(
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
                                (await this.differentialDownloadInstaller(n, t, i, r, Yi.CURRENT_APP_INSTALLER_FILE_NAME))) &&
                                (await this.httpExecutor.download(n.url, i, o));
                        let c = await this.verifySignature(i);
                        if (c != null)
                            throw (
                                (await a(),
                                (0, Yi.newError)(
                                    "New version "
                                        .concat(t.updateInfoAndProvider.info.version, " is not signed by the application owner: ")
                                        .concat(c),
                                    "ERR_UPDATER_INVALID_SIGNATURE"
                                ))
                            );
                        if (h && (await this.differentialDownloadWebPackage(t, l, s, r)))
                            try {
                                await this.httpExecutor.download(new Rm.URL(l.path), s, {
                                    headers: t.requestHeaders,
                                    cancellationToken: t.cancellationToken,
                                    sha512: l.sha512
                                });
                            } catch (f) {
                                try {
                                    await (0, BC.unlink)(s);
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
                    this.spawnLog(Im.join(process.resourcesPath, "elevate.exe"), [t.installerPath].concat(r)).catch(o =>
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
                        newUrl: new Rm.URL(r.path),
                        oldFile: Im.join(this.downloadedUpdateHelper.cacheDir, Yi.CURRENT_APP_PACKAGE_FILE_NAME),
                        logger: this._logger,
                        newFile: n,
                        requestHeaders: this.requestHeaders,
                        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
                        cancellationToken: t.cancellationToken
                    };
                    this.listenerCount(Nm.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = s => this.emit(Nm.DOWNLOAD_PROGRESS, s)),
                        await new kC.FileWithEmbeddedBlockMapDifferentialDownloader(r, this.httpExecutor, o).download();
                } catch (o) {
                    return (
                        this._logger.error("Cannot download differentially, fallback to full download: ".concat(o.stack || o)),
                        process.platform === "win32"
                    );
                }
                return !1;
            }
        };
    zi.NsisUpdater = Pa;
});
var Ut = g(M => {
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
    var jC = ie();
    Object.defineProperty(M, "CancellationToken", {
        enumerable: !0,
        get: function () {
            return jC.CancellationToken;
        }
    });
    var Dm = Ve(),
        WC = require("path"),
        GC = gr();
    Object.defineProperty(M, "BaseUpdater", {
        enumerable: !0,
        get: function () {
            return GC.BaseUpdater;
        }
    });
    var Pm = Mi();
    Object.defineProperty(M, "AppUpdater", {
        enumerable: !0,
        get: function () {
            return Pm.AppUpdater;
        }
    });
    Object.defineProperty(M, "NoOpLogger", {
        enumerable: !0,
        get: function () {
            return Pm.NoOpLogger;
        }
    });
    var VC = qe();
    Object.defineProperty(M, "Provider", {
        enumerable: !0,
        get: function () {
            return VC.Provider;
        }
    });
    var YC = xa();
    Object.defineProperty(M, "AppImageUpdater", {
        enumerable: !0,
        get: function () {
            return YC.AppImageUpdater;
        }
    });
    var zC = Ca();
    Object.defineProperty(M, "DebUpdater", {
        enumerable: !0,
        get: function () {
            return zC.DebUpdater;
        }
    });
    var XC = Oa();
    Object.defineProperty(M, "RpmUpdater", {
        enumerable: !0,
        get: function () {
            return XC.RpmUpdater;
        }
    });
    var KC = Na();
    Object.defineProperty(M, "MacUpdater", {
        enumerable: !0,
        get: function () {
            return KC.MacUpdater;
        }
    });
    var JC = Fa();
    Object.defineProperty(M, "NsisUpdater", {
        enumerable: !0,
        get: function () {
            return JC.NsisUpdater;
        }
    });
    var pt;
    function QC() {
        if (process.platform === "win32") pt = new (Fa().NsisUpdater)();
        else if (process.platform === "darwin") pt = new (Na().MacUpdater)();
        else {
            pt = new (xa().AppImageUpdater)();
            try {
                let e = WC.join(process.resourcesPath, "package-type");
                if (!(0, Dm.existsSync)(e)) return pt;
                console.info("Checking for beta autoupdate feature for deb/rpm distributions");
                let t = (0, Dm.readFileSync)(e).toString().trim();
                switch ((console.info("Found package-type:", t), t)) {
                    case "deb":
                        pt = new (Ca().DebUpdater)();
                        break;
                    case "rpm":
                        pt = new (Oa().RpmUpdater)();
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
        return pt;
    }
    Object.defineProperty(M, "autoUpdater", { enumerable: !0, get: () => pt || QC() });
    M.DOWNLOAD_PROGRESS = "download-progress";
    M.UPDATE_DOWNLOADED = "update-downloaded";
    var qa = class {
        constructor(t) {
            this.emitter = t;
        }
        login(t) {
            Xi(this.emitter, "login", t);
        }
        progress(t) {
            Xi(this.emitter, M.DOWNLOAD_PROGRESS, t);
        }
        updateDownloaded(t) {
            Xi(this.emitter, M.UPDATE_DOWNLOADED, t);
        }
        updateCancelled(t) {
            Xi(this.emitter, "update-cancelled", t);
        }
    };
    M.UpdaterSignal = qa;
    var ZC = !1;
    function Xi(e, t, r) {
        ZC
            ? e.on(t, (...n) => {
                  console.log("%s %s", t, n), r(...n);
              })
            : e.on(t, r);
    }
});
var Ki = g((TN, Fm) => {
    var dn;
    Fm.exports = ((dn = class {}), I(dn, "WINDOWS", "win32"), I(dn, "MACOS", "darwin"), I(dn, "LINUX", "linux"), dn);
});
var mt = g((ON, qm) => {
    qm.exports = class {
        constructor(t) {
            I(this, "_socialdetox");
            this._socialdetox = t;
        }
    };
});
var Um = g((RN, Lm) => {
    var eb = require("path"),
        tb = mt();
    Lm.exports = class extends tb {
        main() {
            this._socialdetox
                .window()
                .loadFile(eb.join(this._socialdetox.rootPath, "res", "index.html"), { extraHeaders: "pragma: no-cache" }),
                this._socialdetox.window().focus();
        }
    };
});
var km = g((PN, $m) => {
    var rb = mt();
    $m.exports = class extends rb {
        getWindowWidth() {
            return 1200;
        }
        getWindowHeight() {
            return 800;
        }
        getPort() {
            return 7199;
        }
    };
});
var Hm = g((qN, Bm) => {
    var nb = mt(),
        Mm = require("fs");
    Bm.exports = class extends nb {
        isFile(t) {
            let r = !1;
            try {
                r = Mm.statSync(t).isFile();
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
                let n = Mm.readFileSync(t);
                r = Buffer.isBuffer(n) ? n.toString() : n;
            } catch (n) {
                this._socialdetox.log.error("file:readFile", t, n);
            }
            return r;
        }
    };
});
var Wm = g((UN, jm) => {
    var ib = mt();
    jm.exports = class extends ib {
        error() {
            console.error("%csocialdetox-error", "color:red", ...arguments);
        }
        info() {
            console.info("%csocialdetox-info", "color:lightblue", ...arguments);
        }
    };
});
var Vm = g((kN, Gm) => {
    var ob = mt(),
        sb = require("querystring");
    Gm.exports = class extends ob {
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
                r = t.query ? n + "?" + sb.stringify(t.query) : n;
            } while (!1);
            return r;
        }
    };
});
var zm = g((BN, Ym) => {
    var ab = mt(),
        La = require("fs"),
        Ua = require("path"),
        lb = require("http"),
        $a;
    Ym.exports =
        (($a = class extends ab {
            start() {
                if (this.constructor._instance === null) {
                    let t = Ua.join(this._socialdetox.rootPath, "ssg"),
                        r = this._socialdetox.config.getPort();
                    this.constructor._instance = new Promise((n, i) => {
                        if (this._socialdetox.devMode) {
                            n(null);
                            return;
                        }
                        try {
                            let o = lb.createServer((s, a) => {
                                let l = Ua.join(t, s.url === "/" ? "/index.html" : s.url);
                                La.access(l, La.constants.F_OK, h => {
                                    h
                                        ? (a.writeHead(404, { "Content-Type": "text/plain" }), a.end("404 Not Found"))
                                        : La.readFile(l, (c, f) => {
                                              if (c)
                                                  a.writeHead(500, { "Content-Type": "text/plain" }),
                                                      a.end("500 Internal Server Error");
                                              else {
                                                  let m = Ua.extname(l),
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
        I($a, "_instance", null),
        $a);
});
var Ji = g((WN, Xm) => {
    var ub = mt(),
        { ipcMain: cb } = require("electron");
    Xm.exports = class extends ub {
        constructor(t) {
            super(t);
        }
        _register(t) {
            if (typeof t == "string")
                for (let r of Object.getOwnPropertyNames(this)) {
                    if (["_", "#"].includes(r[0] || typeof this[r] != "function")) continue;
                    let n = this[r];
                    cb.handle("main:".concat(t, ":").concat(r), async (i, ...o) => {
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
var Qm = g((VN, Jm) => {
    var { execSync: ka } = require("child_process"),
        fb = Ji(),
        pe = Ki(),
        Er,
        yr,
        _r,
        gt,
        Km;
    Jm.exports =
        ((Km = class extends fb {
            constructor(r) {
                super(r);
                me(this, Er);
                me(this, yr);
                me(this, _r);
                me(this, gt);
                I(this, "getOS", () => {
                    if (typeof b(this, gt) > "u")
                        switch (process.platform) {
                            case pe.MACOS:
                                Te(this, gt, "macos");
                                break;
                            case pe.WINDOWS:
                                Te(this, gt, "windows");
                                break;
                            case pe.LINUX:
                                Te(this, gt, "linux");
                                break;
                        }
                    return b(this, gt);
                });
                I(this, "getName", () => {
                    if (typeof b(this, yr) > "u") {
                        let r = null;
                        switch (process.platform) {
                            case pe.MACOS:
                                r = "echo $(scutil --get LocalHostName).local";
                                break;
                            case pe.WINDOWS:
                            case pe.LINUX:
                                r = "hostname";
                                break;
                        }
                        if (r !== null)
                            try {
                                let n = ka(r).toString();
                                Te(this, yr, n.replace(/[\r\n\s]+/g, "").toLowerCase());
                            } catch (n) {
                                this._socialdetox.devMode && console.warn("Device Name", "".concat(n));
                            }
                    }
                    return b(this, yr);
                });
                I(this, "getUUID", () => {
                    if (typeof b(this, Er) > "u") {
                        let r = null,
                            n =
                                process.arch === "ia32" && process.env.hasOwnProperty("PROCESSOR_ARCHITEW6432")
                                    ? "%windir%\\sysnative\\cmd.exe /c %windir%\\System32"
                                    : "%windir%\\System32";
                        switch (process.platform) {
                            case pe.MACOS:
                                r = "ioreg -rd1 -c IOPlatformExpertDevice";
                                break;
                            case pe.WINDOWS:
                                r =
                                    "".concat(n, "\\REG.exe") +
                                    " QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid";
                                break;
                            case pe.LINUX:
                                r = "( cat /var/lib/dbus/machine-id /etc/machine-id 2> /dev/null || hostname ) | head -n 1 || :";
                                break;
                        }
                        if (r !== null)
                            try {
                                let i = ka(r).toString();
                                switch (process.platform) {
                                    case pe.MACOS:
                                        i = i.replace(/^.*?\bIOPlatformUUID"\s*=\s*"(.*?)".*$/gs, "$1");
                                        break;
                                    case pe.WINDOWS:
                                        i = i.split("REG_SZ")[1];
                                        break;
                                }
                                Te(this, Er, i.replace(/[\r\n\s]+/g, "").toLowerCase());
                            } catch (i) {
                                this._socialdetox.devMode && console.warn("Device UUID", "".concat(i));
                            }
                    }
                    return b(this, Er);
                });
                I(this, "getSerialNumber", () => {
                    if (typeof b(this, _r) > "u") {
                        let r = null;
                        switch (process.platform) {
                            case pe.MACOS:
                                r = "ioreg -l | grep IOPlatformSerialNumber";
                                break;
                            case pe.WINDOWS:
                                r = "wmic bios get SerialNumber";
                                break;
                            case pe.LINUX:
                                r = 'lsblk -o UUID -n /dev/sda* | grep -v "^$" | grep -vE "^.{,20}$" | sed -n 1p';
                                break;
                        }
                        if (r !== null)
                            try {
                                let n = ka(r).toString();
                                switch (process.platform) {
                                    case pe.MACOS:
                                        n = n.replace(/^.*?\bIOPlatformSerialNumber"\s*=\s*"(.*?)".*$/gs, "$1");
                                        break;
                                    case pe.WINDOWS:
                                        n = n.split("SerialNumber")[1];
                                        break;
                                }
                                Te(this, _r, n.replace(/[\r\n\s]+/g, "").toLowerCase());
                            } catch (n) {
                                this._socialdetox.devMode && console.warn("Device Serial Number", "".concat(n));
                            }
                    }
                    return b(this, _r);
                });
                this._register("device");
            }
        }),
        (Er = new WeakMap()),
        (yr = new WeakMap()),
        (_r = new WeakMap()),
        (gt = new WeakMap()),
        Km);
});
var Ma = g((zN, Zm) => {
    var wt;
    Zm.exports =
        ((wt = class {
            static getTargetChannelName(t) {
                return "".concat(wt.WINDOW_TARGET, "/").concat(t);
            }
        }),
        I(wt, "WINDOW_MAIN", "@main"),
        I(wt, "WINDOW_TARGET", "@target"),
        wt);
});
var ng = g((JN, rg) => {
    var { ipcMain: eg, BrowserView: vr } = require("electron"),
        tg = require("path"),
        Ba = Ki(),
        db = Ji(),
        hb = Ma(),
        hn,
        pn,
        mn,
        gn,
        k,
        He,
        je,
        $t;
    rg.exports =
        ((hn = class extends db {
            constructor(r) {
                super(r);
                me(this, pn);
                me(this, mn);
                me(this, gn, "");
                me(this, k, {});
                me(this, He, {});
                me(this, je, "");
                I(this, "setWindowSize", (r, n) => {
                    Te(this, pn, r), Te(this, mn, n), b(this, $t).call(this);
                });
                I(this, "list", () => Object.keys(b(this, k)));
                I(this, "removeAll", () => {
                    let r = Object.keys(b(this, k)).length > 0;
                    for (let n of Object.keys(b(this, k))) this.remove(n);
                    return r;
                });
                I(this, "add", (r, n, i = !1) => {
                    if (typeof r != "string" || !r.length) throw new Error("Invalid target ID");
                    if (typeof n != "string" || !n.match(/^https?:\/\//gi)) throw new Error("Invalid target URL");
                    if (b(this, k)[r] instanceof vr) return !1;
                    let o = new vr({
                        width: this._socialdetox.config.getWindowWidth() - this.constructor.MARGIN_LEFT,
                        height:
                            this._socialdetox.config.getWindowHeight() -
                            (this.constructor.MARGIN_TOP + this.constructor.MARGIN_BOTTOM),
                        resizable: !1,
                        backgroundColor: "#000",
                        transparent: !0,
                        webPreferences: {
                            backgroundThrottling: !1,
                            imageAnimationPolicy: "noAnimation",
                            spellcheck: !1,
                            preload: tg.join(this._socialdetox.rootPath, "lib/preloader/entry/target.js"),
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
                        o.webContents.setUserAgent(b(this, gn)),
                        o.webContents.setZoomLevel(0),
                        o.webContents.setAudioMuted(!0),
                        o.webContents.loadFile(tg.join(this._socialdetox.rootPath, "res", "index.html"), {
                            extraHeaders: "pragma: no-cache"
                        }),
                        o.webContents.on("context-menu", (a, l) => {
                            a.preventDefault(), o.webContents.openDevTools({ mode: "detach" });
                        }),
                        this._socialdetox.mainWindow.addBrowserView(o),
                        this._socialdetox.main.view instanceof vr &&
                            (this._socialdetox.mainWindow.removeBrowserView(this._socialdetox.main.view),
                            this._socialdetox.mainWindow.addBrowserView(this._socialdetox.main.view)),
                        (b(this, k)[r] = o);
                    let s = hb.getTargetChannelName(r);
                    return (
                        (b(this, He)[r] = {
                            channel: s,
                            listener: (a, ...l) => {
                                this._socialdetox.devMode && console.log("\u{1F3AF} ".concat(s), JSON.stringify(l)),
                                    l.length >= 3 && o.webContents.send(s, l);
                            }
                        }),
                        eg.on(b(this, He)[r].channel, b(this, He)[r].listener),
                        i ? this.select(r) : b(this, $t).call(this),
                        !0
                    );
                });
                I(this, "remove", r => {
                    if (typeof r != "string" || !r.length) throw new Error("Invalid target ID");
                    if (!(b(this, k)[r] instanceof vr) || typeof b(this, He)[r] > "u") return !1;
                    eg.off(b(this, He)[r].channel, b(this, He)[r].listener), delete b(this, He)[r];
                    try {
                        this._socialdetox.mainWindow.removeBrowserView(b(this, k)[r]);
                    } catch {}
                    try {
                        b(this, k)[r].webContents.destroy();
                    } catch {}
                    return delete b(this, k)[r], r === b(this, je) && Te(this, je, ""), b(this, $t).call(this), !0;
                });
                I(this, "select", r => {
                    if (typeof r != "string" || !r.length) throw new Error("Invalid target ID");
                    if (b(this, k)[r] instanceof vr && b(this, je) !== r) {
                        Te(this, je, r),
                            b(this, k)[r].metadata.loaded ||
                                ((b(this, k)[r].metadata.loaded = !0),
                                b(this, k)[r].webContents.loadURL(b(this, k)[r].metadata.targetUrl));
                        let n = {};
                        for (let i of Object.keys(b(this, k)).filter(o => o !== r)) n[i] = b(this, k)[i];
                        return (
                            (n[r] = b(this, k)[r]),
                            Te(this, k, n),
                            this._socialdetox.mainWindow.removeBrowserView(b(this, k)[r]),
                            this._socialdetox.mainWindow.removeBrowserView(this._socialdetox.main.view),
                            this._socialdetox.main.onTop
                                ? (this._socialdetox.mainWindow.addBrowserView(b(this, k)[r]),
                                  this._socialdetox.mainWindow.addBrowserView(this._socialdetox.main.view),
                                  this._socialdetox.main.view.webContents.focus())
                                : (this._socialdetox.mainWindow.addBrowserView(this._socialdetox.main.view),
                                  this._socialdetox.mainWindow.addBrowserView(b(this, k)[r]),
                                  b(this, k)[r].webContents.focus()),
                            b(this, $t).call(this),
                            !0
                        );
                    }
                    return !1;
                });
                I(this, "getSelected", () => b(this, je));
                I(this, "getTargets", () => b(this, k));
                I(this, "webContents", async (r, n, i) => {
                    if (
                        (this._socialdetox.devMode &&
                            console.log("ipc.target.webContents", JSON.stringify({ targetId: r, methodName: n, methodArgs: i })),
                        typeof r != "string" || !r.length)
                    )
                        throw new Error("Invalid target ID");
                    if (!(b(this, k)[r] instanceof vr)) throw new Error("Invalid target ID");
                    if (typeof n != "string" || typeof b(this, k)[r].webContents[n] != "function")
                        throw new Error("Invalid target webContents method: ".concat(n));
                    return (
                        n === "loadURL" && (b(this, k)[r].metadata.loaded = !0),
                        Array.isArray(i) || (i = []),
                        await b(this, k)[r].webContents[n](...i)
                    );
                });
                me(this, $t, () => {
                    if (!Object.keys(b(this, k)).length) return;
                    let r = b(this, pn) - this.constructor.MARGIN_LEFT,
                        n = b(this, mn) - (this.constructor.MARGIN_TOP + this.constructor.MARGIN_BOTTOM);
                    for (let i of Object.keys(b(this, k))) {
                        let o = i === b(this, je) ? this.constructor.MARGIN_LEFT : 100 - r,
                            s = i === b(this, je) ? this.constructor.MARGIN_TOP : 50 - n;
                        b(this, k)[i].setBounds({ x: o, y: s, width: r, height: n });
                    }
                });
                let n = "";
                switch (process.platform) {
                    case Ba.MACOS:
                        n = "(Macintosh; Intel Mac OS X 13_3)";
                        break;
                    case Ba.WINDOWS:
                        n = "(Windows NT 10.0; Win64; x64)";
                        break;
                    case Ba.LINUX:
                        n = "(X11; Linux x86_64)";
                        break;
                }
                Te(this, gn, "Mozilla/5.0 ".concat(n, " AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36")),
                    this._register("target");
            }
        }),
        (pn = new WeakMap()),
        (mn = new WeakMap()),
        (gn = new WeakMap()),
        (k = new WeakMap()),
        (He = new WeakMap()),
        (je = new WeakMap()),
        ($t = new WeakMap()),
        I(hn, "MARGIN_LEFT", 300),
        I(hn, "MARGIN_TOP", 50),
        I(hn, "MARGIN_BOTTOM", 50),
        hn);
});
var sg = g((eR, og) => {
    var { session: pb, shell: mb, ipcMain: gb, BrowserView: Qi } = require("electron"),
        wb = require("path"),
        Eb = Ji(),
        Ha = Ma(),
        Sr,
        ig;
    og.exports =
        ((ig = class extends Eb {
            constructor(r) {
                super(r);
                I(this, "windowWidth");
                I(this, "windowHeight");
                I(this, "view", null);
                I(this, "onTop", !1);
                I(this, "darkMode", !0);
                me(this, Sr, () =>
                    this.view instanceof Qi
                        ? (this.view.setBounds({ x: 0, y: 0, width: this.windowWidth, height: this.windowHeight }), !0)
                        : !1
                );
                I(this, "init", () => {
                    if (this.view instanceof Qi) return !1;
                    (this.windowWidth = this._socialdetox.config.getWindowWidth()),
                        (this.windowHeight = this._socialdetox.config.getWindowHeight());
                    let r = new Qi({
                        width: this.windowWidth,
                        height: this.windowHeight,
                        resizable: !1,
                        backgroundColor: "#00000000",
                        transparent: !0,
                        webPreferences: {
                            backgroundThrottling: !1,
                            imageAnimationPolicy: "noAnimation",
                            spellcheck: !1,
                            preload: wb.join(this._socialdetox.rootPath, "lib/preloader/entry/main.js"),
                            nodeIntegration: !0,
                            devTools: this._socialdetox.devMode,
                            session: pb.defaultSession,
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
                        gb.on(Ha.WINDOW_MAIN, (n, ...i) => {
                            this._socialdetox.devMode && console.log("\u{1F3E0} ".concat(Ha.WINDOW_MAIN), JSON.stringify(i)),
                                i.length >= 3 && r.webContents.send(Ha.WINDOW_MAIN, i);
                        }),
                        this._socialdetox.mainWindow.addBrowserView(r),
                        b(this, Sr).call(this),
                        !0
                    );
                });
                I(this, "setWindowSize", (r, n) => {
                    (this.windowWidth = r), (this.windowHeight = n), b(this, Sr).call(this);
                });
                I(this, "setOnTop", r => {
                    let n = !1;
                    if (((r = !!r), this.onTop !== r)) {
                        if (((this.onTop = r), this.onTop))
                            this._socialdetox.mainWindow?.removeBrowserView(this.view),
                                this._socialdetox.mainWindow?.addBrowserView(this.view),
                                this.view?.webContents?.focus();
                        else {
                            let i = this._socialdetox.target.getSelected();
                            if (typeof i == "string" && i.length) {
                                let o = this._socialdetox.target.getTargets()[i];
                                o instanceof Qi &&
                                    (this._socialdetox.mainWindow.removeBrowserView(o),
                                    this._socialdetox.mainWindow.removeBrowserView(this.view),
                                    this._socialdetox.mainWindow.addBrowserView(this.view),
                                    this._socialdetox.mainWindow.addBrowserView(o),
                                    o.webContents.focus());
                            }
                        }
                        b(this, Sr).call(this), (n = !0);
                    }
                    return n;
                });
                I(this, "getOnTop", () => this.onTop);
                I(this, "setDarkMode", r => {
                    let n = !1;
                    return (
                        (r = !!r),
                        this.darkMode !== r &&
                            ((this.darkMode = r), this._socialdetox.window().setBackgroundColor(r ? "#000" : "#fff"), (n = !0)),
                        n
                    );
                });
                I(this, "getDarkMode", () => this.darkMode);
                I(this, "openExternal", r => {
                    typeof r == "string" && mb.openExternal(r);
                });
                this._register("main");
            }
        }),
        (Sr = new WeakMap()),
        ig);
});
var lg = g((nR, ag) => {
    var { app: yb, session: _b, BrowserWindow: vb } = require("electron"),
        Sb = require("path"),
        ja = Ki(),
        Ab = Um(),
        xb = km(),
        Tb = Hm(),
        Cb = Wm(),
        bb = Vm(),
        Ob = zm(),
        Ib = Qm(),
        Nb = ng(),
        Rb = sg();
    ag.exports = class {
        constructor() {
            I(this, "mainWindow", null);
            I(this, "rootPath", yb.getAppPath());
            I(this, "devMode", !1);
            I(this, "log", new Cb(this));
            I(this, "webserver", new Ob(this));
            I(this, "activity", new Ab(this));
            I(this, "device", new Ib(this));
            I(this, "target", new Nb(this));
            I(this, "main", new Rb(this));
            I(this, "config", new xb(this));
            I(this, "file", new Tb(this));
            I(this, "utils", new bb(this));
        }
        window() {
            let t = this;
            if (t.mainWindow === null) {
                (t.mainWindow = new vb({
                    minWidth: t.config.getWindowWidth(),
                    minHeight: t.config.getWindowHeight(),
                    width: t.config.getWindowWidth(),
                    height: t.config.getWindowHeight(),
                    icon: Sb.join(t.rootPath, "res/icons/icon.png"),
                    resizable: !0,
                    fullscreenable: !1,
                    titleBarStyle: "default",
                    title: "SocialDetox",
                    useContentSize: !0,
                    show: !1,
                    backgroundColor: "#000",
                    webPreferences: { spellcheck: !1, nodeIntegration: !0, session: _b.defaultSession }
                })),
                    t.mainWindow.setMaxListeners(0),
                    t.mainWindow.once("closed", () => (t.mainWindow = null));
                let r = () => {
                    let n = t.mainWindow.getSize(),
                        i = [ja.WINDOWS, ja.MACOS].includes(process.platform)
                            ? Math.abs(t.mainWindow.getSize()[1] - t.mainWindow.getContentSize()[1])
                            : 0,
                        o = [ja.WINDOWS].includes(process.platform)
                            ? Math.abs(t.mainWindow.getSize()[0] - t.mainWindow.getContentSize()[0])
                            : 0;
                    t.main.setWindowSize(n[0] - o, n[1] - i), t.target.setWindowSize(n[0] - o, n[1] - i);
                };
                t.mainWindow.on("resize", () => r()),
                    t.mainWindow.once("ready-to-show", () => r()),
                    t.main.init(),
                    t.main.view.webContents.on("did-finish-load", () => (t.mainWindow.show(), r())),
                    t.mainWindow.setMenu(null),
                    setInterval(() => {
                        let n = t.mainWindow.getSize();
                        t.mainWindow.setSize(n[0] + 1, n[1]), setTimeout(() => t.mainWindow.setSize(n[0], n[1]), 250);
                    }, 9e4);
            }
            return t.mainWindow;
        }
    };
});
var { app: We, BrowserWindow: Db } = require("electron"),
    { autoUpdater: Wa } = Ut(),
    Pb = lg();
We.disableHardwareAcceleration();
We.commandLine.appendSwitch("disable-gpu");
We.commandLine.appendSwitch("allow-insecure-localhost");
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
process.on("uncaughtException", e => {
    process.env.NODE_ENV === "development" && console.debug(e);
});
do {
    if (!We.requestSingleInstanceLock()) {
        We.quit();
        break;
    }
    let e = null;
    We.on("second-instance", () => {
        e !== null && (e.isMinimized() && e.restore(), e.focus());
    }),
        We.on("ready", async () => {
            let t = new Pb();
            await t.webserver.start(),
                (e = t.window()),
                t.activity.main(),
                We.on("activate", () => {
                    Db.getAllWindows().length === 0 && t.activity.main();
                }),
                Wa.checkForUpdatesAndNotify();
        }),
        Wa.on("update-downloaded", () => {
            dialog
                .showMessageBox({ type: "info", title: "Update ready", message: "Install now?", buttons: ["Yes", "Later"] })
                .then(t => {
                    t.response === 0 && Wa.quitAndInstall();
                });
        }),
        We.on("window-all-closed", () => {
            We.quit();
        });
} while (!1);
