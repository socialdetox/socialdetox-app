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
var C = n => {
    throw TypeError(n);
};
var K = (n, e, t) => (e in n ? J(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : (n[e] = t));
var w = (n, e) => () => (e || n((e = { exports: {} }).exports, e), e.exports);
var o = (n, e, t) => K(n, typeof e != "symbol" ? e + "" : e, t),
    O = (n, e, t) => e.has(n) || C("Cannot " + t);
var r = (n, e, t) => (O(n, e, "read from private field"), t ? t.call(n) : e.get(n)),
    h = (n, e, t) =>
        e.has(n) ? C("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t),
    b = (n, e, t, s) => (O(n, e, "write to private field"), s ? s.call(n, t) : e.set(n, t), t);
var S = w((ge, N) => {
    var { ipcRenderer: Z } = require("electron"),
        v,
        M;
    N.exports =
        ((M = class {
            constructor() {
                h(this, v, {});
            }
            _register(e) {
                if (typeof e == "string")
                    for (let t of Object.getOwnPropertyNames(this))
                        ["_", "#"].includes(t[0]) ||
                            typeof this[t] != "function" ||
                            (r(this, v)[t] = "main:".concat(e, ":").concat(t));
            }
            _runner(e, ...t) {
                let s = function (i, c, a) {
                    this.run = async function () {
                        let l = null;
                        if ((typeof r(i, v)[c] == "string" && (l = await Z.invoke(r(i, v)[c], ...a)), l instanceof Error))
                            throw new Error("IPC/".concat(r(i, v)[c], " ").concat(l));
                        return l;
                    };
                };
                return new s(this, e, t);
            }
            async _promise(e, ...t) {
                return await this._runner(e, ...t).run();
            }
        }),
        (v = new WeakMap()),
        M);
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
            o(this, "openExternal", t => this._promise("openExternal", t));
            this._register("main");
        }
    };
});
var E = w((qe, B) => {
    var m;
    B.exports =
        ((m = class {
            static getTargetChannelName(e) {
                return "".concat(m.WINDOW_TARGET, "/").concat(e);
            }
        }),
        o(m, "WINDOW_MAIN", "@main"),
        o(m, "WINDOW_TARGET", "@target"),
        m);
});
var X = w((ke, L) => {
    var { ipcRenderer: k, contextBridge: ne } = require("electron"),
        ie = require("crypto"),
        oe = A(),
        ae = W(),
        le = U(),
        H = E(),
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
                        ipc: { device: new oe(), target: new ae(), main: new le() },
                        devMode: !1
                    }),
                    k.on(r(this, g), (i, c) => {
                        if (c.length < 3) return;
                        let [a, l, y] = c,
                            { type: u, fromWin: d, promiseId: T } = y ?? {};
                        if (u === "req")
                            (async () => {
                                let _ = null;
                                try {
                                    if (typeof a != "string" || typeof r(s, P)[a] != "function")
                                        throw new Error("Method not found");
                                    Array.isArray(l) || (l = []), (_ = await r(s, P)[a](...l));
                                } catch (q) {
                                    let F = "".concat(d, " >> ").concat(r(s, g), "/").concat(a, "()");
                                    (_ = new Error("".concat(F, " ").concat(q))),
                                        r(this, $).devMode && console.warn("".concat(_));
                                }
                                typeof d == "string" && typeof T == "string" && k.send(d, a, _, { type: "res", promiseId: T });
                            })();
                        else {
                            let _ = typeof T == "string" ? "".concat(a, ":").concat(T) : null;
                            if (_ !== null) {
                                let q = r(s, f)[_] ?? null;
                                q !== null && (l instanceof Error ? q.reject(l) : q.resolve(l), delete r(s, f)[_]);
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
                        console.log("Sending to ".concat(e, ":").concat(t, "()")),
                        k.send(e, t, s, { type: "req", fromWin: r(this, g) });
                } while (!1);
            }
            async invoke(e, t, s, i = 0) {
                let c = this;
                if (typeof e != "string" || typeof t != "string") return null;
                Array.isArray(s) || (s = []);
                let a = parseInt(i, 10);
                (isNaN(a) || a < 0) && (a = 0);
                let l = (() => {
                        let u = Date.now().toString(36),
                            d = ie.randomBytes(4).toString("hex");
                        return "".concat(u).concat(d);
                    })(),
                    y = new Promise((u, d) => {
                        r(this, f)["".concat(t, ":").concat(l)] = { resolve: u, reject: d };
                    });
                return (
                    a > 0 &&
                        setTimeout(() => {
                            let u = typeof l == "string" ? "".concat(t, ":").concat(l) : null;
                            if (typeof r(c, f)[u] < "u") {
                                try {
                                    r(c, f)[u].reject(
                                        new Error("".concat(r(c, g), " >> ").concat(e, "/").concat(t, "() Timed out"))
                                    );
                                } catch {}
                                delete r(c, f)[u];
                            }
                        }, a),
                    k.send(e, t, s, { type: "req", fromWin: r(this, g), promiseId: l }),
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
var Y = w((Ce, V) => {
    var ce = X(),
        ue = E(),
        I,
        p,
        x,
        Q;
    V.exports =
        ((Q = class {
            constructor(e) {
                h(this, I);
                h(this, p);
                h(this, x, (e, t = 0, s = []) => {
                    if (!(e instanceof Element)) return null;
                    if (e.id) return "#".concat(e.id);
                    let i = [];
                    for (; e; ) {
                        let c = e.nodeName.toLowerCase();
                        if (i.length === 0 && Array.isArray(s) && s.length)
                            for (let y of s) {
                                let u = e.getAttribute(y);
                                u && (c += "[".concat(y, '="').concat(u, '"]'));
                            }
                        e.className && (c += "." + e.className.trim().split(/\s+/).join("."));
                        let a = e,
                            l = 1;
                        for (; a.previousElementSibling; ) (a = a.previousElementSibling), l++;
                        (c += ":nth-child(".concat(l, ")")),
                            i.unshift(c),
                            t > 0 && e.className && i.length >= t ? (e = null) : (e = e.parentElement);
                    }
                    return i.join(" > ");
                });
                o(this, "navigate", e => {
                    r(this, p).ipc.target.webContents(r(this, I), "loadURL", [e]);
                });
                o(this, "query", async (e, t = 0, s = [], i = !1) => {
                    r(this, p).devMode &&
                        console.log(
                            "%c \u{1F50D} Query Selector (classDepth: "
                                .concat(t, ", fromScreenView: ")
                                .concat(i ? "true" : "false", ")  css=")
                                .concat(e),
                            "color:lightblue"
                        );
                    let c = [...document.querySelectorAll(e)]
                        .map(a => {
                            let { top: l, left: y, width: u, height: d } = a.getBoundingClientRect();
                            return {
                                selector: r(this, x).call(this, a, t, s),
                                top: l,
                                left: y,
                                width: u,
                                height: d,
                                visible: l < 0 ? l + d > 0 : l < window.innerHeight
                            };
                        })
                        .filter(a => (i ? a.top + a.height >= 0 : !0));
                    return r(this, p).devMode && console.log(c), c;
                });
                o(this, "scrollTo", async (e, t = 0) => {
                    r(this, p).devMode &&
                        console.log("%c \u{1F5B1}\uFE0F Scrolling to +".concat(t, "px of css=").concat(e), "color:lightblue");
                    let s = document.querySelector(e);
                    if ((r(this, p).devMode && console.log(s), s)) {
                        let i = t - parseInt(s.getBoundingClientRect().top, 10);
                        await r(this, p).ipc.target.webContents(r(this, I), "sendInputEvent", [
                            { type: "mouseWheel", x: 10, y: 15, deltaX: 0, deltaY: i }
                        ]);
                    }
                });
                o(
                    this,
                    "wheels",
                    async e => (
                        await r(this, p).ipc.target.webContents(r(this, I), "sendInputEvent", [
                            { type: "mouseWheel", x: 10, y: 15, deltaX: 0, deltaY: e }
                        ]),
                        "Wheels up!"
                    )
                );
                b(this, I, e), b(this, p, new ce(ue.getTargetChannelName(e), !1).getSdk());
                for (let t of Object.getOwnPropertyNames(this)) typeof this[t] == "function" && r(this, p).ibc.handle(t, this[t]);
            }
        }),
        (I = new WeakMap()),
        (p = new WeakMap()),
        (x = new WeakMap()),
        Q);
});
var pe = Y(),
    z = process.argv.filter(n => n.indexOf("--target-id=") >= 0).shift();
if (typeof z == "string") {
    let n = z.split("=")[1];
    n.length && new pe(n);
}
