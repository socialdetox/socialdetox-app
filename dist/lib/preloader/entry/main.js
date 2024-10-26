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
var O = f((me, M) => {
    var { ipcRenderer: Y } = require("electron"),
        y,
        E;
    M.exports =
        ((E = class {
            constructor() {
                h(this, y, {});
            }
            _register(e) {
                if (typeof e == "string")
                    for (let t of Object.getOwnPropertyNames(this))
                        ["_", "#"].includes(t[0]) ||
                            typeof this[t] != "function" ||
                            (i(this, y)[t] = "main:".concat(e, ":").concat(t));
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
var W = f((ye, N) => {
    var Z = O(),
        { ipcRenderer: ee } = require("electron");
    N.exports = class extends Z {
        constructor() {
            super();
            r(this, "getOS", () => this._promise("getOS"));
            r(this, "getName", () => this._promise("getName"));
            r(this, "getUUID", () => this._promise("getUUID"));
            r(this, "getSerialNumber", () => this._promise("getSerialNumber"));
            r(this, "setFramed", t => this._promise("setFramed", !!t));
            r(this, "getFramed", () => this._promise("getFramed"));
            r(this, "testing", () => {
                window.setInterval(() => {
                    ee.send("win:main", "testing", [new Date().getTime()], { type: "req", fromWin: "" });
                }, 1500);
            });
            this._register("device");
        }
    };
});
var C = f((Pe, S) => {
    var te = O();
    S.exports = class extends te {
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
var R = f((Oe, A) => {
    var re = O();
    A.exports = class extends re {
        constructor() {
            super();
            r(this, "openExternal", t => this._promise("openExternal", "".concat(t)));
            this._register("login");
        }
    };
});
var F = f((qe, j) => {
    var se = O();
    j.exports = class extends se {
        constructor() {
            super();
            r(this, "setOnTop", t => this._promise("setOnTop", !!t));
            r(this, "getOnTop", () => this._promise("getOnTop"));
            r(this, "setDarkMode", t => this._promise("setDarkMode", !!t));
            r(this, "getDarkMode", () => this._promise("getDarkMode"));
            r(this, "openExternal", t => this._promise("openExternal", "".concat(t)));
            this._register("main");
        }
    };
});
var x = f((be, U) => {
    var u;
    U.exports =
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
var H = f((Me, B) => {
    var { ipcRenderer: k, contextBridge: ie } = require("electron"),
        ne = require("crypto"),
        oe = W(),
        ae = C(),
        ce = R(),
        le = F(),
        G = x(),
        p,
        P,
        _,
        w,
        L;
    B.exports =
        ((L = class {
            constructor(e, t = !0) {
                h(this, p, "");
                h(this, P, {});
                h(this, _, {});
                h(this, w, {});
                r(this, "target", {
                    send: (e, t, n) => {
                        this.send(G.getTargetChannelName(e), t, n);
                    },
                    invoke: async (e, t, n, o = 0) => await this.invoke(G.getTargetChannelName(e), t, n, o)
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
                    k.on(i(this, p), (o, l) => {
                        if (l.length < 3) return;
                        let [c, a, q] = l,
                            { type: d, fromWin: m, promiseId: T } = q ?? {};
                        if (d === "req")
                            (async () => {
                                let g = null;
                                try {
                                    if (typeof c != "string" || typeof i(n, P)[c] != "function")
                                        throw new Error("Method not found");
                                    Array.isArray(a) || (a = []), (g = await i(n, P)[c](...a));
                                } catch ($) {
                                    let Q = "".concat(m, " >> ").concat(i(n, p), "/").concat(c, "()");
                                    (g = new Error("".concat(Q, " ").concat($))),
                                        i(this, w).devMode && console.warn("".concat(g));
                                }
                                typeof m == "string" && typeof T == "string" && k.send(m, c, g, { type: "res", promiseId: T });
                            })();
                        else {
                            let g = typeof T == "string" ? "".concat(c, ":").concat(T) : null;
                            if (g !== null) {
                                let $ = i(n, _)[g] ?? null;
                                $ !== null && (a instanceof Error ? $.reject(a) : $.resolve(a), delete i(n, _)[g]);
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
                    Array.isArray(n) || (n = []), k.send(e, t, n, { type: "req", fromWin: i(this, p) });
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
                            m = ne.randomBytes(4).toString("hex");
                        return "".concat(d).concat(m);
                    })(),
                    q = new Promise((d, m) => {
                        i(this, _)["".concat(t, ":").concat(a)] = { resolve: d, reject: m };
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
                    k.send(e, t, n, { type: "req", fromWin: i(this, p), promiseId: a }),
                    q
                );
            }
        }),
        (p = new WeakMap()),
        (P = new WeakMap()),
        (_ = new WeakMap()),
        (w = new WeakMap()),
        L);
});
var K = f((Se, J) => {
    var pe = H(),
        de = x(),
        I,
        z;
    J.exports =
        ((z = class {
            constructor() {
                h(this, I);
                r(this, "getOnTop", async () => await i(this, I).ipc.main.getOnTop());
                r(this, "setOnTop", async e => await i(this, I).ipc.main.setOnTop(e));
                v(this, I, new pe(de.WINDOW_MAIN).getSdk());
                for (let e of Object.getOwnPropertyNames(this)) typeof this[e] == "function" && i(this, I).ibc.handle(e, this[e]);
            }
        }),
        (I = new WeakMap()),
        z);
});
var he = K();
new he();
