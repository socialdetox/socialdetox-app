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
var Z = Object.defineProperty;
var C = i => {
    throw TypeError(i);
};
var ee = (i, e, t) => (e in i ? Z(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : (i[e] = t));
var w = (i, e) => () => (e || i((e = { exports: {} }).exports, e), e.exports);
var n = (i, e, t) => ee(i, typeof e != "symbol" ? e + "" : e, t),
    O = (i, e, t) => e.has(i) || C("Cannot " + t);
var r = (i, e, t) => (O(i, e, "read from private field"), t ? t.call(i) : e.get(i)),
    u = (i, e, t) =>
        e.has(i) ? C("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(i) : e.set(i, t),
    P = (i, e, t, s) => (O(i, e, "write to private field"), s ? s.call(i, t) : e.set(i, t), t);
var x = w((ye, M) => {
    var { ipcRenderer: te } = require("electron"),
        I,
        N;
    M.exports =
        ((N = class {
            constructor() {
                u(this, I, {});
            }
            _register(e) {
                if (typeof e == "string")
                    for (let t of Object.getOwnPropertyNames(this))
                        ["_", "#"].includes(t[0]) ||
                            typeof this[t] != "function" ||
                            (r(this, I)[t] = "main:".concat(e, ":").concat(t));
            }
            _runner(e, ...t) {
                let s = function (o, c, a) {
                    this.run = async function () {
                        let l = null;
                        if ((typeof r(o, I)[c] == "string" && (l = await te.invoke(r(o, I)[c], ...a)), l instanceof Error))
                            throw new Error("IPC/".concat(r(o, I)[c], " ").concat(l));
                        return l;
                    };
                };
                return new s(this, e, t);
            }
            async _promise(e, ...t) {
                return await this._runner(e, ...t).run();
            }
        }),
        (I = new WeakMap()),
        N);
});
var W = w(($e, D) => {
    var re = x(),
        { ipcRenderer: se } = require("electron");
    D.exports = class extends re {
        constructor() {
            super();
            n(this, "getOS", () => this._promise("getOS"));
            n(this, "getName", () => this._promise("getName"));
            n(this, "getUUID", () => this._promise("getUUID"));
            n(this, "getSerialNumber", () => this._promise("getSerialNumber"));
            n(this, "setFramed", t => this._promise("setFramed", !!t));
            n(this, "getFramed", () => this._promise("getFramed"));
            n(this, "testing", () => {
                window.setInterval(() => {
                    se.send("win:main", "testing", [new Date().getTime()], { type: "req", fromWin: "" });
                }, 1500);
            });
            this._register("device");
        }
    };
});
var R = w((be, A) => {
    var ie = x();
    A.exports = class extends ie {
        constructor() {
            super();
            n(this, "list", () => this._promise("list"));
            n(this, "removeAll", () => this._promise("removeAll"));
            n(this, "add", (t, s, o = !1) => this._promise("add", t, s, o));
            n(this, "remove", t => this._promise("remove", t));
            n(this, "select", t => this._promise("select", t));
            n(this, "getSelected", () => this._promise("getSelected"));
            n(this, "webContents", (t, s, o) => this._promise("webContents", t, s, o));
            this._register("target");
        }
    };
});
var L = w((Te, j) => {
    var ne = x();
    j.exports = class extends ne {
        constructor() {
            super();
            n(this, "openExternal", t => this._promise("openExternal", "".concat(t)));
            this._register("login");
        }
    };
});
var B = w((ke, U) => {
    var oe = x();
    U.exports = class extends oe {
        constructor() {
            super();
            n(this, "setOnTop", t => this._promise("setOnTop", !!t));
            n(this, "getOnTop", () => this._promise("getOnTop"));
            n(this, "setDarkMode", t => this._promise("setDarkMode", !!t));
            n(this, "getDarkMode", () => this._promise("getDarkMode"));
            n(this, "openExternal", t => this._promise("openExternal", "".concat(t)));
            this._register("main");
        }
    };
});
var k = w((Oe, F) => {
    var f;
    F.exports =
        ((f = class {
            static getTargetChannelName(e) {
                return "".concat(f.WINDOW_TARGET, "/").concat(e);
            }
        }),
        n(f, "WINDOW_MAIN", "@main"),
        n(f, "WINDOW_LOGIN", "@login"),
        n(f, "WINDOW_TARGET", "@target"),
        f);
});
var Q = w((De, X) => {
    var { ipcRenderer: E, contextBridge: ae } = require("electron"),
        le = require("crypto"),
        ce = W(),
        pe = R(),
        de = L(),
        he = B(),
        G = k(),
        g,
        b,
        _,
        $,
        H;
    X.exports =
        ((H = class {
            constructor(e, t = !0) {
                u(this, g, "");
                u(this, b, {});
                u(this, _, {});
                u(this, $, {});
                n(this, "target", {
                    send: (e, t, s) => {
                        this.send(G.getTargetChannelName(e), t, s);
                    },
                    invoke: async (e, t, s, o = 0) => await this.invoke(G.getTargetChannelName(e), t, s, o)
                });
                let s = this;
                P(this, g, e),
                    P(this, $, {
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
                        ipc: { device: new ce(), target: new pe(), login: new de(), main: new he() },
                        devMode: !1
                    }),
                    E.on(r(this, g), (o, c) => {
                        if (c.length < 3) return;
                        let [a, l, m] = c,
                            { type: p, fromWin: h, promiseId: T } = m ?? {};
                        if (p === "req")
                            (async () => {
                                let y = null;
                                try {
                                    if (typeof a != "string" || typeof r(s, b)[a] != "function")
                                        throw new Error("Method not found");
                                    Array.isArray(l) || (l = []), (y = await r(s, b)[a](...l));
                                } catch (q) {
                                    let K = "".concat(h, " >> ").concat(r(s, g), "/").concat(a, "()");
                                    (y = new Error("".concat(K, " ").concat(q))),
                                        r(this, $).devMode && console.warn("".concat(y));
                                }
                                typeof h == "string" && typeof T == "string" && E.send(h, a, y, { type: "res", promiseId: T });
                            })();
                        else {
                            let y = typeof T == "string" ? "".concat(a, ":").concat(T) : null;
                            if (y !== null) {
                                let q = r(s, _)[y] ?? null;
                                q !== null && (l instanceof Error ? q.reject(l) : q.resolve(l), delete r(s, _)[y]);
                            }
                        }
                    }),
                    t && ae.exposeInMainWorld("sdk", r(this, $));
            }
            getSdk() {
                return r(this, $);
            }
            handle(e, t) {
                typeof e == "string" && typeof t == "function" && (r(this, b)[e] = t);
            }
            send(e, t, s) {
                do {
                    if (typeof e != "string" || typeof t != "string") break;
                    Array.isArray(s) || (s = []),
                        console.log("Sending to ".concat(e, ":").concat(t, "()")),
                        E.send(e, t, s, { type: "req", fromWin: r(this, g) });
                } while (!1);
            }
            async invoke(e, t, s, o = 0) {
                let c = this;
                if (typeof e != "string" || typeof t != "string") return null;
                Array.isArray(s) || (s = []);
                let a = parseInt(o, 10);
                (isNaN(a) || a < 0) && (a = 0);
                let l = (() => {
                        let p = Date.now().toString(36),
                            h = le.randomBytes(4).toString("hex");
                        return "".concat(p).concat(h);
                    })(),
                    m = new Promise((p, h) => {
                        r(this, _)["".concat(t, ":").concat(l)] = { resolve: p, reject: h };
                    });
                return (
                    a > 0 &&
                        setTimeout(() => {
                            let p = typeof l == "string" ? "".concat(t, ":").concat(l) : null;
                            if (typeof r(c, _)[p] < "u") {
                                try {
                                    r(c, _)[p].reject(
                                        new Error("".concat(r(c, g), " >> ").concat(e, "/").concat(t, "() Timed out"))
                                    );
                                } catch {}
                                delete r(c, _)[p];
                            }
                        }, a),
                    E.send(e, t, s, { type: "req", fromWin: r(this, g), promiseId: l }),
                    m
                );
            }
        }),
        (g = new WeakMap()),
        (b = new WeakMap()),
        (_ = new WeakMap()),
        ($ = new WeakMap()),
        H);
});
var z = w((Re, Y) => {
    var ue = Q(),
        ge = k(),
        v,
        d,
        S,
        V;
    Y.exports =
        ((V = class {
            constructor(e) {
                u(this, v);
                u(this, d);
                u(this, S, (e, t = 0, s = []) => {
                    if (!(e instanceof Element)) return null;
                    if (e.id) return "#".concat(e.id);
                    let o = [];
                    for (; e; ) {
                        let c = e.nodeName.toLowerCase();
                        if (o.length === 0 && Array.isArray(s) && s.length)
                            for (let m of s) {
                                let p = e.getAttribute(m);
                                p && (c += "[".concat(m, '="').concat(p, '"]'));
                            }
                        e.className && (c += "." + e.className.trim().split(/\s+/).join("."));
                        let a = e,
                            l = 1;
                        for (; a.previousElementSibling; ) (a = a.previousElementSibling), l++;
                        (c += ":nth-child(".concat(l, ")")),
                            o.unshift(c),
                            t > 0 && e.className && o.length >= t ? (e = null) : (e = e.parentElement);
                    }
                    return o.join(" > ");
                });
                n(this, "navigate", e => {
                    r(this, d).ipc.target.webContents(r(this, v), "loadURL", [e]);
                });
                n(this, "query", async (e, t = 0, s = [], o = !1) => {
                    r(this, d).devMode &&
                        console.log(
                            "%c \u{1F50D} Query Selector (classDepth: "
                                .concat(t, ", fromScreenView: ")
                                .concat(o ? "true" : "false", ")  css=")
                                .concat(e),
                            "color:lightblue"
                        );
                    let c = [...document.querySelectorAll(e)]
                        .map(a => {
                            let { top: l, left: m, width: p, height: h } = a.getBoundingClientRect();
                            return {
                                selector: r(this, S).call(this, a, t, s),
                                top: l,
                                left: m,
                                width: p,
                                height: h,
                                visible: l < 0 ? l + h > 0 : l < window.innerHeight
                            };
                        })
                        .filter(a => (o ? a.top + a.height >= 0 : !0));
                    return r(this, d).devMode && console.log(c), c;
                });
                n(this, "scrollTo", async (e, t = 0) => {
                    r(this, d).devMode &&
                        console.log("%c \u{1F5B1}\uFE0F Scrolling to +".concat(t, "px of css=").concat(e), "color:lightblue");
                    let s = document.querySelector(e);
                    if ((r(this, d).devMode && console.log(s), s)) {
                        let o = t - parseInt(s.getBoundingClientRect().top, 10);
                        await r(this, d).ipc.target.webContents(r(this, v), "sendInputEvent", [
                            { type: "mouseWheel", x: 10, y: 15, deltaX: 0, deltaY: o }
                        ]);
                    }
                });
                n(
                    this,
                    "wheels",
                    async e => (
                        await r(this, d).ipc.target.webContents(r(this, v), "sendInputEvent", [
                            { type: "mouseWheel", x: 10, y: 15, deltaX: 0, deltaY: e }
                        ]),
                        "Wheels up!"
                    )
                );
                P(this, v, e), P(this, d, new ue(ge.getTargetChannelName(e), !1).getSdk());
                for (let t of Object.getOwnPropertyNames(this)) typeof this[t] == "function" && r(this, d).ibc.handle(t, this[t]);
            }
        }),
        (v = new WeakMap()),
        (d = new WeakMap()),
        (S = new WeakMap()),
        V);
});
var fe = z(),
    J = process.argv.filter(i => i.indexOf("--target-id=") >= 0).shift();
if (typeof J == "string") {
    let i = J.split("=")[1];
    i.length && new fe(i);
}
