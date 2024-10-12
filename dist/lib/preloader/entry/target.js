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
var J = Object.defineProperty;
var x = n => {
    throw TypeError(n);
};
var K = (n, e, t) => (e in n ? J(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : (n[e] = t));
var w = (n, e) => () => (e || n((e = { exports: {} }).exports, e), e.exports);
var o = (n, e, t) => K(n, typeof e != "symbol" ? e + "" : e, t),
    O = (n, e, t) => e.has(n) || x("Cannot " + t);
var r = (n, e, t) => (O(n, e, "read from private field"), t ? t.call(n) : e.get(n)),
    h = (n, e, t) =>
        e.has(n) ? x("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t),
    b = (n, e, t, s) => (O(n, e, "write to private field"), s ? s.call(n, t) : e.set(n, t), t);
var S = w((ge, M) => {
    var { ipcRenderer: Z } = require("electron"),
        v,
        N;
    M.exports =
        ((N = class {
            constructor() {
                h(this, v, {});
            }
            _register(e) {
                if (typeof e == "string")
                    for (let t of Object.getOwnPropertyNames(this))
                        ["_", "#"].includes(t[0]) || typeof this[t] != "function" || (r(this, v)[t] = `main:${e}:${t}`);
            }
            _runner(e, ...t) {
                let s = function (i, l, a) {
                    this.run = async function () {
                        let c = null;
                        if ((typeof r(i, v)[l] == "string" && (c = await Z.invoke(r(i, v)[l], ...a)), c instanceof Error))
                            throw new Error(`IPC/${r(i, v)[l]} ${c}`);
                        return c;
                    };
                };
                return new s(this, e, t);
            }
            async _promise(e, ...t) {
                return await this._runner(e, ...t).run();
            }
        }),
        (v = new WeakMap()),
        N);
});
var A = w((_e, D) => {
    var ee = S(),
        { ipcRenderer: te } = require("electron");
    D.exports = class extends ee {
        constructor() {
            super();
            o(this, "getOS", () => this._promise("getOS"));
            o(this, "getName", () => this._promise("getName"));
            o(this, "getUUID", () => this._promise("getUUID"));
            o(this, "getSerialNumber", () => this._promise("getSerialNumber"));
            o(this, "testing", () => {
                window.setInterval(() => {
                    te.send("win:main", "testing", [new Date().getTime()], { type: "req", fromWin: "" });
                }, 1500);
            });
            this._register("device");
        }
    };
});
var W = w((ve, R) => {
    var re = S();
    R.exports = class extends re {
        constructor() {
            super();
            o(this, "list", () => this._promise("list"));
            o(this, "removeAll", () => this._promise("removeAll"));
            o(this, "add", (t, s, i = !1) => this._promise("add", t, s, i));
            o(this, "remove", t => this._promise("remove", t));
            o(this, "select", t => this._promise("select", t));
            o(this, "getSelected", () => this._promise("getSelected"));
            o(this, "webContents", (t, s, i) => this._promise("webContents", t, s, i));
            this._register("target");
        }
    };
});
var U = w((be, j) => {
    var se = S();
    j.exports = class extends se {
        constructor() {
            super();
            o(this, "setOnTop", t => this._promise("setOnTop", t));
            o(this, "getOnTop", () => this._promise("setOnTop"));
            o(this, "setDarkMode", t => this._promise("setDarkMode", t));
            o(this, "getDarkMode", () => this._promise("setDarkMode"));
            this._register("main");
        }
    };
});
var C = w((qe, B) => {
    var m;
    B.exports =
        ((m = class {
            static getTargetChannelName(e) {
                return `${m.WINDOW_TARGET}/${e}`;
            }
        }),
        o(m, "WINDOW_MAIN", "@main"),
        o(m, "WINDOW_TARGET", "@target"),
        m);
});
var V = w((ke, L) => {
    var { ipcRenderer: k, contextBridge: ne } = require("electron"),
        ie = require("crypto"),
        oe = A(),
        ae = W(),
        ce = U(),
        H = C(),
        g,
        P,
        f,
        $,
        G;
    L.exports =
        ((G = class {
            constructor(e, t = !0) {
                h(this, g, "");
                h(this, P, {});
                h(this, f, {});
                h(this, $, {});
                o(this, "target", {
                    send: (e, t, s) => {
                        this.send(H.getTargetChannelName(e), t, s);
                    },
                    invoke: async (e, t, s, i = 0) => await this.invoke(H.getTargetChannelName(e), t, s, i)
                });
                let s = this;
                b(this, g, e),
                    b(this, $, {
                        ibc: {
                            handle: (...i) => this.handle.call(this, ...i),
                            send: (...i) => this.send.call(this, ...i),
                            invoke: async (...i) => await this.invoke.call(this, ...i),
                            target: {
                                send: (...i) => this.target.send.call(this, ...i),
                                invoke: async (...i) => await this.target.invoke.call(this, ...i)
                            },
                            winName: r(this, g)
                        },
                        ipc: { device: new oe(), target: new ae(), main: new ce() },
                        devMode: process.env.NODE_ENV === "development"
                    }),
                    k.on(r(this, g), (i, l) => {
                        if (l.length < 3) return;
                        let [a, c, y] = l,
                            { type: u, fromWin: p, promiseId: T } = y ?? {};
                        if (u === "req")
                            (async () => {
                                let _ = null;
                                try {
                                    if (typeof a != "string" || typeof r(s, P)[a] != "function")
                                        throw new Error("Method not found");
                                    Array.isArray(c) || (c = []), (_ = await r(s, P)[a](...c));
                                } catch (q) {
                                    let F = `${p} >> ${r(s, g)}/${a}()`;
                                    (_ = new Error(`${F} ${q}`)), r(this, $).devMode && console.warn(`${_}`);
                                }
                                typeof p == "string" && typeof T == "string" && k.send(p, a, _, { type: "res", promiseId: T });
                            })();
                        else {
                            let _ = typeof T == "string" ? `${a}:${T}` : null;
                            if (_ !== null) {
                                let q = r(s, f)[_] ?? null;
                                q !== null && (c instanceof Error ? q.reject(c) : q.resolve(c), delete r(s, f)[_]);
                            }
                        }
                    }),
                    t && ne.exposeInMainWorld("sdk", r(this, $));
            }
            getSdk() {
                return r(this, $);
            }
            handle(e, t) {
                typeof e == "string" && typeof t == "function" && (r(this, P)[e] = t);
            }
            send(e, t, s) {
                do {
                    if (typeof e != "string" || typeof t != "string") break;
                    Array.isArray(s) || (s = []),
                        console.log(`Sending to ${e}:${t}()`),
                        k.send(e, t, s, { type: "req", fromWin: r(this, g) });
                } while (!1);
            }
            async invoke(e, t, s, i = 0) {
                let l = this;
                if (typeof e != "string" || typeof t != "string") return null;
                Array.isArray(s) || (s = []);
                let a = parseInt(i, 10);
                (isNaN(a) || a < 0) && (a = 0);
                let c = (() => {
                        let u = Date.now().toString(36),
                            p = ie.randomBytes(4).toString("hex");
                        return `${u}${p}`;
                    })(),
                    y = new Promise((u, p) => {
                        r(this, f)[`${t}:${c}`] = { resolve: u, reject: p };
                    });
                return (
                    a > 0 &&
                        setTimeout(() => {
                            let u = typeof c == "string" ? `${t}:${c}` : null;
                            if (typeof r(l, f)[u] < "u") {
                                try {
                                    r(l, f)[u].reject(new Error(`${r(l, g)} >> ${e}/${t}() Timed out`));
                                } catch {}
                                delete r(l, f)[u];
                            }
                        }, a),
                    k.send(e, t, s, { type: "req", fromWin: r(this, g), promiseId: c }),
                    y
                );
            }
        }),
        (g = new WeakMap()),
        (P = new WeakMap()),
        (f = new WeakMap()),
        ($ = new WeakMap()),
        G);
});
var Y = w((xe, Q) => {
    var le = V(),
        ue = C(),
        I,
        d,
        E,
        X;
    Q.exports =
        ((X = class {
            constructor(e) {
                h(this, I);
                h(this, d);
                h(this, E, (e, t = 0, s = []) => {
                    if (!(e instanceof Element)) return null;
                    if (e.id) return `#${e.id}`;
                    let i = [];
                    for (; e; ) {
                        let l = e.nodeName.toLowerCase();
                        if (i.length === 0 && Array.isArray(s) && s.length)
                            for (let y of s) {
                                let u = e.getAttribute(y);
                                u && (l += `[${y}="${u}"]`);
                            }
                        e.className && (l += "." + e.className.trim().split(/\s+/).join("."));
                        let a = e,
                            c = 1;
                        for (; a.previousElementSibling; ) (a = a.previousElementSibling), c++;
                        (l += `:nth-child(${c})`),
                            i.unshift(l),
                            t > 0 && e.className && i.length >= t ? (e = null) : (e = e.parentElement);
                    }
                    return i.join(" > ");
                });
                o(this, "navigate", e => {
                    r(this, d).ipc.target.webContents(r(this, I), "loadURL", [e]);
                });
                o(this, "query", async (e, t = 0, s = [], i = !1) => {
                    r(this, d).devMode &&
                        console.log(
                            `%c \u{1F50D} Query Selector (classDepth: ${t}, fromScreenView: ${i ? "true" : "false"})  css=${e}`,
                            "color:lightblue"
                        );
                    let l = [...document.querySelectorAll(e)]
                        .map(a => {
                            let { top: c, left: y, width: u, height: p } = a.getBoundingClientRect();
                            return {
                                selector: r(this, E).call(this, a, t, s),
                                top: c,
                                left: y,
                                width: u,
                                height: p,
                                visible: c < 0 ? c + p > 0 : c < window.innerHeight
                            };
                        })
                        .filter(a => (i ? a.top + a.height >= 0 : !0));
                    return r(this, d).devMode && console.log(l), l;
                });
                o(this, "scrollTo", async (e, t = 0) => {
                    r(this, d).devMode && console.log(`%c \u{1F5B1}\uFE0F Scrolling to +${t}px of css=${e}`, "color:lightblue");
                    let s = document.querySelector(e);
                    if ((r(this, d).devMode && console.log(s), s)) {
                        let i = t - parseInt(s.getBoundingClientRect().top, 10);
                        await r(this, d).ipc.target.webContents(r(this, I), "sendInputEvent", [
                            { type: "mouseWheel", x: 10, y: 15, deltaX: 0, deltaY: i }
                        ]);
                    }
                });
                o(
                    this,
                    "wheels",
                    async e => (
                        await r(this, d).ipc.target.webContents(r(this, I), "sendInputEvent", [
                            { type: "mouseWheel", x: 10, y: 15, deltaX: 0, deltaY: e }
                        ]),
                        "Wheels up!"
                    )
                );
                b(this, I, e), b(this, d, new le(ue.getTargetChannelName(e), !1).getSdk());
                for (let t of Object.getOwnPropertyNames(this)) typeof this[t] == "function" && r(this, d).ibc.handle(t, this[t]);
            }
        }),
        (I = new WeakMap()),
        (d = new WeakMap()),
        (E = new WeakMap()),
        X);
});
var de = Y(),
    z = process.argv.filter(n => n.indexOf("--target-id=") >= 0).shift();
if (typeof z == "string") {
    let n = z.split("=")[1];
    n.length && new de(n);
}
