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
var V = Object.defineProperty;
var b = s => {
    throw TypeError(s);
};
var X = (s, e, t) => (e in s ? V(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : (s[e] = t));
var f = (s, e) => () => (e || s((e = { exports: {} }).exports, e), e.exports);
var r = (s, e, t) => X(s, typeof e != "symbol" ? e + "" : e, t),
    D = (s, e, t) => e.has(s) || b("Cannot " + t);
var i = (s, e, t) => (D(s, e, "read from private field"), t ? t.call(s) : e.get(s)),
    h = (s, e, t) =>
        e.has(s) ? b("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(s) : e.set(s, t),
    v = (s, e, t, n) => (D(s, e, "write to private field"), n ? n.call(s, t) : e.set(s, t), t);
var q = f((ge, N) => {
    var { ipcRenderer: Y } = require("electron"),
        y,
        E;
    N.exports =
        ((E = class {
            constructor() {
                h(this, y, {});
            }
            _register(e) {
                if (typeof e == "string")
                    for (let t of Object.getOwnPropertyNames(this))
                        ["_", "#"].includes(t[0]) ||
                            typeof this[t] != "function" ||
                            (i(this, y)[t] = "ipc:".concat(e, ":").concat(t));
            }
            _runner(e, ...t) {
                let n = function (o, l, c) {
                    this.run = async function () {
                        let a = null;
                        if ((typeof i(o, y)[l] == "string" && (a = await Y.invoke(i(o, y)[l], ...c)), a instanceof Error))
                            throw new Error("IPC/".concat(i(o, y)[l], " ").concat(a));
                        return a;
                    };
                };
                return new n(this, e, t);
            }
            async _promise(e, ...t) {
                return await this._runner(e, ...t).run();
            }
        }),
        (y = new WeakMap()),
        E);
});
var A = f((ye, M) => {
    var Z = q(),
        { ipcRenderer: ee } = require("electron");
    M.exports = class extends Z {
        constructor() {
            super();
            r(this, "getOS", () => this._promise("getOS"));
            r(this, "getName", () => this._promise("getName"));
            r(this, "getUUID", () => this._promise("getUUID"));
            r(this, "getSerialNumber", () => this._promise("getSerialNumber"));
            r(this, "setPostAuth", t => this._promise("setPostAuth", !!t));
            r(this, "getPostAuth", () => this._promise("getPostAuth"));
            r(this, "testing", () => {
                window.setInterval(() => {
                    ee.send("win:main", "testing", [new Date().getTime()], { type: "req", fromWin: "" });
                }, 1500);
            });
            this._register("device");
        }
    };
});
var S = f((Pe, W) => {
    var te = q();
    W.exports = class extends te {
        constructor() {
            super();
            r(this, "list", () => this._promise("list"));
            r(this, "removeAll", () => this._promise("removeAll"));
            r(this, "add", (t, n, o = !1) => this._promise("add", t, n, o));
            r(this, "remove", t => this._promise("remove", t));
            r(this, "select", t => this._promise("select", t));
            r(this, "getSelected", () => this._promise("getSelected"));
            r(this, "webContents", (t, n, o) => this._promise("webContents", t, n, o));
            this._register("target");
        }
    };
});
var R = f((qe, C) => {
    var re = q();
    C.exports = class extends re {
        constructor() {
            super();
            r(this, "openExternal", t => this._promise("openExternal", "".concat(t)));
            this._register("login");
        }
    };
});
var U = f((ke, j) => {
    var se = q();
    j.exports = class extends se {
        constructor() {
            super();
            r(this, "setOnTop", t => this._promise("setOnTop", !!t));
            r(this, "getOnTop", () => this._promise("getOnTop"));
            r(this, "setDarkMode", t => this._promise("setDarkMode", !!t));
            r(this, "getDarkMode", () => this._promise("getDarkMode"));
            r(this, "quit", () => this._promise("quit"));
            r(this, "openExternal", t => this._promise("openExternal", "".concat(t)));
            this._register("main");
        }
    };
});
var x = f((be, G) => {
    var u;
    G.exports =
        ((u = class {
            static getTargetChannelName(e) {
                return "".concat(u.WINDOW_TARGET, "/").concat(e);
            }
        }),
        r(u, "WINDOW_MAIN", "@main"),
        r(u, "WINDOW_LOGIN", "@login"),
        r(u, "WINDOW_TARGET", "@target"),
        u);
});
var z = f((Ne, H) => {
    var { ipcRenderer: T, contextBridge: ie } = require("electron"),
        ne = require("crypto"),
        oe = A(),
        ae = S(),
        ce = R(),
        le = U(),
        L = x(),
        p,
        P,
        _,
        w,
        B;
    H.exports =
        ((B = class {
            constructor(e, t = !0) {
                h(this, p, "");
                h(this, P, {});
                h(this, _, {});
                h(this, w, {});
                r(this, "target", {
                    send: (e, t, n) => {
                        this.send(L.getTargetChannelName(e), t, n);
                    },
                    invoke: async (e, t, n, o = 0) => await this.invoke(L.getTargetChannelName(e), t, n, o)
                });
                let n = this;
                v(this, p, e),
                    v(this, w, {
                        ibc: {
                            handle: (...o) => this.handle.call(this, ...o),
                            send: (...o) => this.send.call(this, ...o),
                            invoke: async (...o) => await this.invoke.call(this, ...o),
                            target: {
                                send: (...o) => this.target.send.call(this, ...o),
                                invoke: async (...o) => await this.target.invoke.call(this, ...o)
                            },
                            winName: i(this, p)
                        },
                        ipc: { device: new oe(), target: new ae(), login: new ce(), main: new le() },
                        devMode: !1
                    }),
                    T.on(i(this, p), (o, l) => {
                        if (l.length < 3) return;
                        let [c, a, k] = l,
                            { type: d, fromWin: g, promiseId: O } = k ?? {};
                        if (d === "req")
                            (async () => {
                                let m = null;
                                try {
                                    if (typeof c != "string" || typeof i(n, P)[c] != "function")
                                        throw new Error("Inter-browser communication handle not declared");
                                    Array.isArray(a) || (a = []), (m = await i(n, P)[c](...a));
                                } catch ($) {
                                    let Q = "".concat(g, " >> ").concat(i(n, p), "/").concat(c, "()");
                                    (m = new Error("".concat(Q, " ").concat($))),
                                        i(this, w).devMode && console.warn("".concat(m));
                                }
                                typeof g == "string" && typeof O == "string" && T.send(g, c, m, { type: "res", promiseId: O });
                            })();
                        else {
                            let m = typeof O == "string" ? "".concat(c, ":").concat(O) : null;
                            if (m !== null) {
                                let $ = i(n, _)[m] ?? null;
                                $ !== null && (a instanceof Error ? $.reject(a) : $.resolve(a), delete i(n, _)[m]);
                            }
                        }
                    }),
                    t && ie.exposeInMainWorld("sdk", i(this, w));
            }
            getSdk() {
                return i(this, w);
            }
            handle(e, t) {
                typeof e == "string" && typeof t == "function" && (i(this, P)[e] = t);
            }
            send(e, t, n) {
                do {
                    if (typeof e != "string" || typeof t != "string") break;
                    Array.isArray(n) || (n = []), T.send(e, t, n, { type: "req", fromWin: i(this, p) });
                } while (!1);
            }
            async invoke(e, t, n, o = 0) {
                let l = this;
                if (typeof e != "string" || typeof t != "string") return null;
                Array.isArray(n) || (n = []);
                let c = parseInt(o, 10);
                (isNaN(c) || c < 0) && (c = 0);
                let a = (() => {
                        let d = Date.now().toString(36),
                            g = ne.randomBytes(4).toString("hex");
                        return "".concat(d).concat(g);
                    })(),
                    k = new Promise((d, g) => {
                        i(this, _)["".concat(t, ":").concat(a)] = { resolve: d, reject: g };
                    });
                return (
                    c > 0 &&
                        setTimeout(() => {
                            let d = typeof a == "string" ? "".concat(t, ":").concat(a) : null;
                            if (typeof i(l, _)[d] < "u") {
                                try {
                                    i(l, _)[d].reject(
                                        new Error("".concat(i(l, p), " >> ").concat(e, "/").concat(t, "() Timed out"))
                                    );
                                } catch {}
                                delete i(l, _)[d];
                            }
                        }, c),
                    T.send(e, t, n, { type: "req", fromWin: i(this, p), promiseId: a }),
                    k
                );
            }
        }),
        (p = new WeakMap()),
        (P = new WeakMap()),
        (_ = new WeakMap()),
        (w = new WeakMap()),
        B);
});
var K = f((We, J) => {
    var pe = z(),
        de = x(),
        I,
        F;
    J.exports =
        ((F = class {
            constructor() {
                h(this, I);
                r(this, "getOnTop", async () => await i(this, I).ipc.main.getOnTop());
                r(this, "setOnTop", async e => await i(this, I).ipc.main.setOnTop(e));
                v(this, I, new pe(de.WINDOW_MAIN).getSdk());
                for (let e of Object.getOwnPropertyNames(this)) typeof this[e] == "function" && i(this, I).ibc.handle(e, this[e]);
            }
        }),
        (I = new WeakMap()),
        F);
});
var he = K();
new he();
