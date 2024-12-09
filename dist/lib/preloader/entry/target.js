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
var Z = Object.defineProperty;
var C = n => {
    throw TypeError(n);
};
var ee = (n, e, t) => (e in n ? Z(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : (n[e] = t));
var w = (n, e) => () => (e || n((e = { exports: {} }).exports, e), e.exports);
var i = (n, e, t) => ee(n, typeof e != "symbol" ? e + "" : e, t),
    N = (n, e, t) => e.has(n) || C("Cannot " + t);
var r = (n, e, t) => (N(n, e, "read from private field"), t ? t.call(n) : e.get(n)),
    u = (n, e, t) =>
        e.has(n) ? C("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t),
    P = (n, e, t, s) => (N(n, e, "write to private field"), s ? s.call(n, t) : e.set(n, t), t);
var x = w((ye, A) => {
    var { ipcRenderer: te } = require("electron"),
        I,
        O;
    A.exports =
        ((O = class {
            constructor() {
                u(this, I, {});
            }
            _register(e) {
                if (typeof e == "string")
                    for (let t of Object.getOwnPropertyNames(this))
                        ["_", "#"].includes(t[0]) ||
                            typeof this[t] != "function" ||
                            (r(this, I)[t] = "ipc:".concat(e, ":").concat(t));
            }
            _runner(e, ...t) {
                let s = function (o, l, a) {
                    this.run = async function () {
                        let c = null;
                        if ((typeof r(o, I)[l] == "string" && (c = await te.invoke(r(o, I)[l], ...a)), c instanceof Error))
                            throw new Error("IPC/".concat(r(o, I)[l], " ").concat(c));
                        return c;
                    };
                };
                return new s(this, e, t);
            }
            async _promise(e, ...t) {
                return await this._runner(e, ...t).run();
            }
        }),
        (I = new WeakMap()),
        O);
});
var M = w((ve, D) => {
    var re = x(),
        { ipcRenderer: se } = require("electron");
    D.exports = class extends re {
        constructor() {
            super();
            i(this, "getOS", () => this._promise("getOS"));
            i(this, "getName", () => this._promise("getName"));
            i(this, "getUUID", () => this._promise("getUUID"));
            i(this, "getSerialNumber", () => this._promise("getSerialNumber"));
            i(this, "setPostAuth", t => this._promise("setPostAuth", !!t));
            i(this, "getPostAuth", () => this._promise("getPostAuth"));
            i(this, "testing", () => {
                window.setInterval(() => {
                    se.send("win:main", "testing", [new Date().getTime()], { type: "req", fromWin: "" });
                }, 1500);
            });
            this._register("device");
        }
    };
});
var R = w((be, W) => {
    var ie = x();
    W.exports = class extends ie {
        constructor() {
            super();
            i(this, "list", () => this._promise("list"));
            i(this, "removeAll", () => this._promise("removeAll"));
            i(this, "add", (t, s, o = !1) => this._promise("add", t, s, o));
            i(this, "remove", t => this._promise("remove", t));
            i(this, "select", t => this._promise("select", t));
            i(this, "getSelected", () => this._promise("getSelected"));
            i(this, "webContents", (t, s, o) => this._promise("webContents", t, s, o));
            this._register("target");
        }
    };
});
var L = w((Te, j) => {
    var ne = x();
    j.exports = class extends ne {
        constructor() {
            super();
            i(this, "openExternal", t => this._promise("openExternal", "".concat(t)));
            this._register("login");
        }
    };
});
var B = w((Se, U) => {
    var oe = x();
    U.exports = class extends oe {
        constructor() {
            super();
            i(this, "setOnTop", t => this._promise("setOnTop", !!t));
            i(this, "getOnTop", () => this._promise("getOnTop"));
            i(this, "setDarkMode", t => this._promise("setDarkMode", !!t));
            i(this, "getDarkMode", () => this._promise("getDarkMode"));
            i(this, "quit", () => this._promise("quit"));
            i(this, "openExternal", t => this._promise("openExternal", "".concat(t)));
            this._register("main");
        }
    };
});
var S = w((Ne, G) => {
    var f;
    G.exports =
        ((f = class {
            static getTargetChannelName(e) {
                return "".concat(f.WINDOW_TARGET, "/").concat(e);
            }
        }),
        i(f, "WINDOW_MAIN", "@main"),
        i(f, "WINDOW_LOGIN", "@login"),
        i(f, "WINDOW_TARGET", "@target"),
        f);
});
var V = w((De, Q) => {
    var { ipcRenderer: E, contextBridge: ae } = require("electron"),
        ce = require("crypto"),
        le = M(),
        pe = R(),
        he = L(),
        de = B(),
        H = S(),
        g,
        b,
        _,
        v,
        X;
    Q.exports =
        ((X = class {
            constructor(e, t = !0) {
                u(this, g, "");
                u(this, b, {});
                u(this, _, {});
                u(this, v, {});
                i(this, "target", {
                    send: (e, t, s) => {
                        this.send(H.getTargetChannelName(e), t, s);
                    },
                    invoke: async (e, t, s, o = 0) => await this.invoke(H.getTargetChannelName(e), t, s, o)
                });
                let s = this;
                P(this, g, e),
                    P(this, v, {
                        ibc: {
                            handle: (...o) => this.handle.call(this, ...o),
                            send: (...o) => this.send.call(this, ...o),
                            invoke: async (...o) => await this.invoke.call(this, ...o),
                            target: {
                                send: (...o) => this.target.send.call(this, ...o),
                                invoke: async (...o) => await this.target.invoke.call(this, ...o)
                            },
                            winName: r(this, g)
                        },
                        ipc: { device: new le(), target: new pe(), login: new he(), main: new de() },
                        devMode: !1
                    }),
                    E.on(r(this, g), (o, l) => {
                        if (l.length < 3) return;
                        let [a, c, m] = l,
                            { type: p, fromWin: d, promiseId: T } = m ?? {};
                        if (p === "req")
                            (async () => {
                                let y = null;
                                try {
                                    if (typeof a != "string" || typeof r(s, b)[a] != "function")
                                        throw new Error("Inter-browser communication handle not declared");
                                    Array.isArray(c) || (c = []), (y = await r(s, b)[a](...c));
                                } catch (q) {
                                    let K = "".concat(d, " >> ").concat(r(s, g), "/").concat(a, "()");
                                    (y = new Error("".concat(K, " ").concat(q))),
                                        r(this, v).devMode && console.warn("".concat(y));
                                }
                                typeof d == "string" && typeof T == "string" && E.send(d, a, y, { type: "res", promiseId: T });
                            })();
                        else {
                            let y = typeof T == "string" ? "".concat(a, ":").concat(T) : null;
                            if (y !== null) {
                                let q = r(s, _)[y] ?? null;
                                q !== null && (c instanceof Error ? q.reject(c) : q.resolve(c), delete r(s, _)[y]);
                            }
                        }
                    }),
                    t && ae.exposeInMainWorld("sdk", r(this, v));
            }
            getSdk() {
                return r(this, v);
            }
            handle(e, t) {
                typeof e == "string" && typeof t == "function" && (r(this, b)[e] = t);
            }
            send(e, t, s) {
                do {
                    if (typeof e != "string" || typeof t != "string") break;
                    Array.isArray(s) || (s = []), E.send(e, t, s, { type: "req", fromWin: r(this, g) });
                } while (!1);
            }
            async invoke(e, t, s, o = 0) {
                let l = this;
                if (typeof e != "string" || typeof t != "string") return null;
                Array.isArray(s) || (s = []);
                let a = parseInt(o, 10);
                (isNaN(a) || a < 0) && (a = 0);
                let c = (() => {
                        let p = Date.now().toString(36),
                            d = ce.randomBytes(4).toString("hex");
                        return "".concat(p).concat(d);
                    })(),
                    m = new Promise((p, d) => {
                        r(this, _)["".concat(t, ":").concat(c)] = { resolve: p, reject: d };
                    });
                return (
                    a > 0 &&
                        setTimeout(() => {
                            let p = typeof c == "string" ? "".concat(t, ":").concat(c) : null;
                            if (typeof r(l, _)[p] < "u") {
                                try {
                                    r(l, _)[p].reject(
                                        new Error("".concat(r(l, g), " >> ").concat(e, "/").concat(t, "() Timed out"))
                                    );
                                } catch {}
                                delete r(l, _)[p];
                            }
                        }, a),
                    E.send(e, t, s, { type: "req", fromWin: r(this, g), promiseId: c }),
                    m
                );
            }
        }),
        (g = new WeakMap()),
        (b = new WeakMap()),
        (_ = new WeakMap()),
        (v = new WeakMap()),
        X);
});
var F = w((Re, z) => {
    var ue = V(),
        ge = S(),
        $,
        h,
        k,
        Y;
    z.exports =
        ((Y = class {
            constructor(e) {
                u(this, $);
                u(this, h);
                u(this, k, (e, t = 0, s = []) => {
                    if (!(e instanceof Element)) return null;
                    if (e.id) return "#".concat(e.id);
                    let o = [];
                    for (; e; ) {
                        let l = e.nodeName.toLowerCase();
                        if (o.length === 0 && Array.isArray(s) && s.length)
                            for (let m of s) {
                                let p = e.getAttribute(m);
                                p && (l += "[".concat(m, '="').concat(p, '"]'));
                            }
                        e.className && (l += "." + e.className.trim().split(/\s+/).join("."));
                        let a = e,
                            c = 1;
                        for (; a.previousElementSibling; ) (a = a.previousElementSibling), c++;
                        (l += ":nth-child(".concat(c, ")")),
                            o.unshift(l),
                            t > 0 && e.className && o.length >= t ? (e = null) : (e = e.parentElement);
                    }
                    return o.join(" > ");
                });
                i(this, "navigate", e => {
                    r(this, h).ipc.target.webContents(r(this, $), "loadURL", [e]);
                });
                i(this, "query", async (e, t = 0, s = [], o = !1) => {
                    r(this, h).devMode &&
                        console.log(
                            "%c \u{1F50D} Query Selector (classDepth: "
                                .concat(t, ", fromScreenView: ")
                                .concat(o ? "true" : "false", ")  css=")
                                .concat(e),
                            "color:lightblue"
                        );
                    let l = [...document.querySelectorAll(e)]
                        .map(a => {
                            let { top: c, left: m, width: p, height: d } = a.getBoundingClientRect();
                            return {
                                selector: r(this, k).call(this, a, t, s),
                                top: c,
                                left: m,
                                width: p,
                                height: d,
                                visible: c < 0 ? c + d > 0 : c < window.innerHeight
                            };
                        })
                        .filter(a => (o ? a.top + a.height >= 0 : !0));
                    return r(this, h).devMode && console.log(l), l;
                });
                i(this, "scrollTo", async (e, t = 0) => {
                    r(this, h).devMode &&
                        console.log("%c \u{1F5B1}\uFE0F Scrolling to +".concat(t, "px of css=").concat(e), "color:lightblue");
                    let s = document.querySelector(e);
                    if ((r(this, h).devMode && console.log(s), s)) {
                        let o = t - parseInt(s.getBoundingClientRect().top, 10);
                        await r(this, h).ipc.target.webContents(r(this, $), "sendInputEvent", [
                            { type: "mouseWheel", x: 10, y: 15, deltaX: 0, deltaY: o }
                        ]);
                    }
                });
                i(
                    this,
                    "wheels",
                    async e => (
                        await r(this, h).ipc.target.webContents(r(this, $), "sendInputEvent", [
                            { type: "mouseWheel", x: 10, y: 15, deltaX: 0, deltaY: e }
                        ]),
                        "Wheels up!"
                    )
                );
                P(this, $, e), P(this, h, new ue(ge.getTargetChannelName(e), !1).getSdk());
                for (let t of Object.getOwnPropertyNames(this)) typeof this[t] == "function" && r(this, h).ibc.handle(t, this[t]);
            }
        }),
        ($ = new WeakMap()),
        (h = new WeakMap()),
        (k = new WeakMap()),
        Y);
});
var fe = F(),
    J = process.argv.filter(n => n.indexOf("--target-id=") >= 0).shift();
if (typeof J == "string") {
    let n = J.split("=")[1];
    n.length && new fe(n);
}
