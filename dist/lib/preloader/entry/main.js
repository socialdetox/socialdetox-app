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
var L = Object.defineProperty;
var x = r => {
    throw TypeError(r);
};
var Q = (r, e, t) => (e in r ? L(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : (r[e] = t));
var m = (r, e) => () => (e || r((e = { exports: {} }).exports, e), e.exports);
var n = (r, e, t) => Q(r, typeof e != "symbol" ? e + "" : e, t),
    D = (r, e, t) => e.has(r) || x("Cannot " + t);
var s = (r, e, t) => (D(r, e, "read from private field"), t ? t.call(r) : e.get(r)),
    d = (r, e, t) =>
        e.has(r) ? x("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(r) : e.set(r, t),
    P = (r, e, t, i) => (D(r, e, "write to private field"), i ? i.call(r, t) : e.set(r, t), t);
var k = m((ue, E) => {
    var { ipcRenderer: V } = require("electron"),
        y,
        M;
    E.exports =
        ((M = class {
            constructor() {
                d(this, y, {});
            }
            _register(e) {
                if (typeof e == "string")
                    for (let t of Object.getOwnPropertyNames(this))
                        ["_", "#"].includes(t[0]) ||
                            typeof this[t] != "function" ||
                            (s(this, y)[t] = "main:".concat(e, ":").concat(t));
            }
            _runner(e, ...t) {
                let i = function (o, l, c) {
                    this.run = async function () {
                        let a = null;
                        if ((typeof s(o, y)[l] == "string" && (a = await V.invoke(s(o, y)[l], ...c)), a instanceof Error))
                            throw new Error("IPC/".concat(s(o, y)[l], " ").concat(a));
                        return a;
                    };
                };
                return new i(this, e, t);
            }
            async _promise(e, ...t) {
                return await this._runner(e, ...t).run();
            }
        }),
        (y = new WeakMap()),
        M);
});
var C = m((fe, S) => {
    var X = k(),
        { ipcRenderer: Y } = require("electron");
    S.exports = class extends X {
        constructor() {
            super();
            n(this, "getOS", () => this._promise("getOS"));
            n(this, "getName", () => this._promise("getName"));
            n(this, "getUUID", () => this._promise("getUUID"));
            n(this, "getSerialNumber", () => this._promise("getSerialNumber"));
            n(this, "testing", () => {
                window.setInterval(() => {
                    Y.send("win:main", "testing", [new Date().getTime()], { type: "req", fromWin: "" });
                }, 1500);
            });
            this._register("device");
        }
    };
});
var W = m((me, N) => {
    var Z = k();
    N.exports = class extends Z {
        constructor() {
            super();
            n(this, "list", () => this._promise("list"));
            n(this, "removeAll", () => this._promise("removeAll"));
            n(this, "add", (t, i, o = !1) => this._promise("add", t, i, o));
            n(this, "remove", t => this._promise("remove", t));
            n(this, "select", t => this._promise("select", t));
            n(this, "getSelected", () => this._promise("getSelected"));
            n(this, "webContents", (t, i, o) => this._promise("webContents", t, i, o));
            this._register("target");
        }
    };
});
var R = m((Ie, A) => {
    var ee = k();
    A.exports = class extends ee {
        constructor() {
            super();
            n(this, "setOnTop", t => this._promise("setOnTop", t));
            n(this, "getOnTop", () => this._promise("setOnTop"));
            n(this, "setDarkMode", t => this._promise("setDarkMode", t));
            n(this, "getDarkMode", () => this._promise("setDarkMode"));
            n(this, "openExternal", t => this._promise("openExternal", t));
            this._register("main");
        }
    };
});
var b = m((ve, j) => {
    var g;
    j.exports =
        ((g = class {
            static getTargetChannelName(e) {
                return "".concat(g.WINDOW_TARGET, "/").concat(e);
            }
        }),
        n(g, "WINDOW_MAIN", "@main"),
        n(g, "WINDOW_TARGET", "@target"),
        g);
});
var H = m((ke, G) => {
    var { ipcRenderer: O, contextBridge: te } = require("electron"),
        re = require("crypto"),
        ne = C(),
        se = W(),
        ie = R(),
        U = b(),
        p,
        $,
        h,
        w,
        B;
    G.exports =
        ((B = class {
            constructor(e, t = !0) {
                d(this, p, "");
                d(this, $, {});
                d(this, h, {});
                d(this, w, {});
                n(this, "target", {
                    send: (e, t, i) => {
                        this.send(U.getTargetChannelName(e), t, i);
                    },
                    invoke: async (e, t, i, o = 0) => await this.invoke(U.getTargetChannelName(e), t, i, o)
                });
                let i = this;
                P(this, p, e),
                    P(this, w, {
                        ibc: {
                            handle: (...o) => this.handle.call(this, ...o),
                            send: (...o) => this.send.call(this, ...o),
                            invoke: async (...o) => await this.invoke.call(this, ...o),
                            target: {
                                send: (...o) => this.target.send.call(this, ...o),
                                invoke: async (...o) => await this.target.invoke.call(this, ...o)
                            },
                            winName: s(this, p)
                        },
                        ipc: { device: new ne(), target: new se(), main: new ie() },
                        devMode: !1
                    }),
                    O.on(s(this, p), (o, l) => {
                        if (l.length < 3) return;
                        let [c, a, q] = l,
                            { type: u, fromWin: f, promiseId: T } = q ?? {};
                        if (u === "req")
                            (async () => {
                                let _ = null;
                                try {
                                    if (typeof c != "string" || typeof s(i, $)[c] != "function")
                                        throw new Error("Method not found");
                                    Array.isArray(a) || (a = []), (_ = await s(i, $)[c](...a));
                                } catch (v) {
                                    let K = "".concat(f, " >> ").concat(s(i, p), "/").concat(c, "()");
                                    (_ = new Error("".concat(K, " ").concat(v))),
                                        s(this, w).devMode && console.warn("".concat(_));
                                }
                                typeof f == "string" && typeof T == "string" && O.send(f, c, _, { type: "res", promiseId: T });
                            })();
                        else {
                            let _ = typeof T == "string" ? "".concat(c, ":").concat(T) : null;
                            if (_ !== null) {
                                let v = s(i, h)[_] ?? null;
                                v !== null && (a instanceof Error ? v.reject(a) : v.resolve(a), delete s(i, h)[_]);
                            }
                        }
                    }),
                    t && te.exposeInMainWorld("sdk", s(this, w));
            }
            getSdk() {
                return s(this, w);
            }
            handle(e, t) {
                typeof e == "string" && typeof t == "function" && (s(this, $)[e] = t);
            }
            send(e, t, i) {
                do {
                    if (typeof e != "string" || typeof t != "string") break;
                    Array.isArray(i) || (i = []),
                        console.log("Sending to ".concat(e, ":").concat(t, "()")),
                        O.send(e, t, i, { type: "req", fromWin: s(this, p) });
                } while (!1);
            }
            async invoke(e, t, i, o = 0) {
                let l = this;
                if (typeof e != "string" || typeof t != "string") return null;
                Array.isArray(i) || (i = []);
                let c = parseInt(o, 10);
                (isNaN(c) || c < 0) && (c = 0);
                let a = (() => {
                        let u = Date.now().toString(36),
                            f = re.randomBytes(4).toString("hex");
                        return "".concat(u).concat(f);
                    })(),
                    q = new Promise((u, f) => {
                        s(this, h)["".concat(t, ":").concat(a)] = { resolve: u, reject: f };
                    });
                return (
                    c > 0 &&
                        setTimeout(() => {
                            let u = typeof a == "string" ? "".concat(t, ":").concat(a) : null;
                            if (typeof s(l, h)[u] < "u") {
                                try {
                                    s(l, h)[u].reject(
                                        new Error("".concat(s(l, p), " >> ").concat(e, "/").concat(t, "() Timed out"))
                                    );
                                } catch {}
                                delete s(l, h)[u];
                            }
                        }, c),
                    O.send(e, t, i, { type: "req", fromWin: s(this, p), promiseId: a }),
                    q
                );
            }
        }),
        (p = new WeakMap()),
        ($ = new WeakMap()),
        (h = new WeakMap()),
        (w = new WeakMap()),
        B);
});
var J = m((be, F) => {
    var oe = H(),
        ae = b(),
        I,
        z;
    F.exports =
        ((z = class {
            constructor() {
                d(this, I);
                n(this, "getOnTop", async () => await s(this, I).ipc.main.getOnTop());
                n(this, "setOnTop", async e => await s(this, I).ipc.main.setOnTop(e));
                P(this, I, new oe(ae.WINDOW_MAIN).getSdk());
                for (let e of Object.getOwnPropertyNames(this)) typeof this[e] == "function" && s(this, I).ibc.handle(e, this[e]);
            }
        }),
        (I = new WeakMap()),
        z);
});
var ce = J();
new ce();
