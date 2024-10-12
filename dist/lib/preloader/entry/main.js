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
var K = Object.defineProperty;
var D = r => {
    throw TypeError(r);
};
var L = (r, e, t) => (e in r ? K(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : (r[e] = t));
var m = (r, e) => () => (e || r((e = { exports: {} }).exports, e), e.exports);
var s = (r, e, t) => L(r, typeof e != "symbol" ? e + "" : e, t),
    M = (r, e, t) => e.has(r) || D("Cannot " + t);
var n = (r, e, t) => (M(r, e, "read from private field"), t ? t.call(r) : e.get(r)),
    d = (r, e, t) =>
        e.has(r) ? D("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(r) : e.set(r, t),
    P = (r, e, t, i) => (M(r, e, "write to private field"), i ? i.call(r, t) : e.set(r, t), t);
var k = m((ue, E) => {
    var { ipcRenderer: Q } = require("electron"),
        y,
        x;
    E.exports =
        ((x = class {
            constructor() {
                d(this, y, {});
            }
            _register(e) {
                if (typeof e == "string")
                    for (let t of Object.getOwnPropertyNames(this))
                        ["_", "#"].includes(t[0]) || typeof this[t] != "function" || (n(this, y)[t] = `main:${e}:${t}`);
            }
            _runner(e, ...t) {
                let i = function (o, l, c) {
                    this.run = async function () {
                        let a = null;
                        if ((typeof n(o, y)[l] == "string" && (a = await Q.invoke(n(o, y)[l], ...c)), a instanceof Error))
                            throw new Error(`IPC/${n(o, y)[l]} ${a}`);
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
        x);
});
var S = m((fe, N) => {
    var X = k(),
        { ipcRenderer: Y } = require("electron");
    N.exports = class extends X {
        constructor() {
            super();
            s(this, "getOS", () => this._promise("getOS"));
            s(this, "getName", () => this._promise("getName"));
            s(this, "getUUID", () => this._promise("getUUID"));
            s(this, "getSerialNumber", () => this._promise("getSerialNumber"));
            s(this, "testing", () => {
                window.setInterval(() => {
                    Y.send("win:main", "testing", [new Date().getTime()], { type: "req", fromWin: "" });
                }, 1500);
            });
            this._register("device");
        }
    };
});
var W = m((me, C) => {
    var Z = k();
    C.exports = class extends Z {
        constructor() {
            super();
            s(this, "list", () => this._promise("list"));
            s(this, "removeAll", () => this._promise("removeAll"));
            s(this, "add", (t, i, o = !1) => this._promise("add", t, i, o));
            s(this, "remove", t => this._promise("remove", t));
            s(this, "select", t => this._promise("select", t));
            s(this, "getSelected", () => this._promise("getSelected"));
            s(this, "webContents", (t, i, o) => this._promise("webContents", t, i, o));
            this._register("target");
        }
    };
});
var R = m((Ie, A) => {
    var ee = k();
    A.exports = class extends ee {
        constructor() {
            super();
            s(this, "setOnTop", t => this._promise("setOnTop", t));
            s(this, "getOnTop", () => this._promise("setOnTop"));
            s(this, "setDarkMode", t => this._promise("setDarkMode", t));
            s(this, "getDarkMode", () => this._promise("setDarkMode"));
            this._register("main");
        }
    };
});
var b = m(($e, j) => {
    var g;
    j.exports =
        ((g = class {
            static getTargetChannelName(e) {
                return `${g.WINDOW_TARGET}/${e}`;
            }
        }),
        s(g, "WINDOW_MAIN", "@main"),
        s(g, "WINDOW_TARGET", "@target"),
        g);
});
var H = m((ke, G) => {
    var { ipcRenderer: O, contextBridge: te } = require("electron"),
        re = require("crypto"),
        ne = S(),
        se = W(),
        ie = R(),
        U = b(),
        p,
        v,
        h,
        w,
        B;
    G.exports =
        ((B = class {
            constructor(e, t = !0) {
                d(this, p, "");
                d(this, v, {});
                d(this, h, {});
                d(this, w, {});
                s(this, "target", {
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
                            winName: n(this, p)
                        },
                        ipc: { device: new ne(), target: new se(), main: new ie() },
                        devMode: process.env.NODE_ENV === "development"
                    }),
                    O.on(n(this, p), (o, l) => {
                        if (l.length < 3) return;
                        let [c, a, q] = l,
                            { type: u, fromWin: f, promiseId: T } = q ?? {};
                        if (u === "req")
                            (async () => {
                                let _ = null;
                                try {
                                    if (typeof c != "string" || typeof n(i, v)[c] != "function")
                                        throw new Error("Method not found");
                                    Array.isArray(a) || (a = []), (_ = await n(i, v)[c](...a));
                                } catch ($) {
                                    let J = `${f} >> ${n(i, p)}/${c}()`;
                                    (_ = new Error(`${J} ${$}`)), n(this, w).devMode && console.warn(`${_}`);
                                }
                                typeof f == "string" && typeof T == "string" && O.send(f, c, _, { type: "res", promiseId: T });
                            })();
                        else {
                            let _ = typeof T == "string" ? `${c}:${T}` : null;
                            if (_ !== null) {
                                let $ = n(i, h)[_] ?? null;
                                $ !== null && (a instanceof Error ? $.reject(a) : $.resolve(a), delete n(i, h)[_]);
                            }
                        }
                    }),
                    t && te.exposeInMainWorld("sdk", n(this, w));
            }
            getSdk() {
                return n(this, w);
            }
            handle(e, t) {
                typeof e == "string" && typeof t == "function" && (n(this, v)[e] = t);
            }
            send(e, t, i) {
                do {
                    if (typeof e != "string" || typeof t != "string") break;
                    Array.isArray(i) || (i = []),
                        console.log(`Sending to ${e}:${t}()`),
                        O.send(e, t, i, { type: "req", fromWin: n(this, p) });
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
                        return `${u}${f}`;
                    })(),
                    q = new Promise((u, f) => {
                        n(this, h)[`${t}:${a}`] = { resolve: u, reject: f };
                    });
                return (
                    c > 0 &&
                        setTimeout(() => {
                            let u = typeof a == "string" ? `${t}:${a}` : null;
                            if (typeof n(l, h)[u] < "u") {
                                try {
                                    n(l, h)[u].reject(new Error(`${n(l, p)} >> ${e}/${t}() Timed out`));
                                } catch {}
                                delete n(l, h)[u];
                            }
                        }, c),
                    O.send(e, t, i, { type: "req", fromWin: n(this, p), promiseId: a }),
                    q
                );
            }
        }),
        (p = new WeakMap()),
        (v = new WeakMap()),
        (h = new WeakMap()),
        (w = new WeakMap()),
        B);
});
var F = m((be, z) => {
    var oe = H(),
        ae = b(),
        I,
        V;
    z.exports =
        ((V = class {
            constructor() {
                d(this, I);
                s(this, "getOnTop", async () => await n(this, I).ipc.main.getOnTop());
                s(this, "setOnTop", async e => await n(this, I).ipc.main.setOnTop(e));
                P(this, I, new oe(ae.WINDOW_MAIN).getSdk());
                for (let e of Object.getOwnPropertyNames(this)) typeof this[e] == "function" && n(this, I).ibc.handle(e, this[e]);
            }
        }),
        (I = new WeakMap()),
        V);
});
var ce = F();
new ce();
