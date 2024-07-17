const D = console;
class Pe {
  constructor(s, n, t, o = 2e3, i = !0) {
    this._callback = s, this._client_id = n, this._url = t, this._interval = o || 2e3, this._stopOnError = i;
    const r = t.indexOf("/", t.indexOf("//") + 2);
    this._frame_origin = t.substr(0, r), this._frame = window.document.createElement("iframe"), this._frame.style.visibility = "hidden", this._frame.style.position = "absolute", this._frame.style.display = "none", this._frame.width = 0, this._frame.height = 0, this._frame.src = t;
  }
  load() {
    return new Promise((s) => {
      this._frame.onload = () => {
        s();
      }, window.document.body.appendChild(this._frame), this._boundMessageEvent = this._message.bind(this), window.addEventListener("message", this._boundMessageEvent, !1);
    });
  }
  _message(s) {
    s.origin === this._frame_origin && s.source === this._frame.contentWindow && (s.data === "error" ? (D.error("CheckSessionIFrame: error message from check session op iframe"), this._stopOnError && this.stop()) : s.data === "changed" ? (D.debug(s), D.debug("CheckSessionIFrame: changed message from check session op iframe"), this.stop(), this._callback()) : D.debug("CheckSessionIFrame: " + s.data + " message from check session op iframe"));
  }
  start(s) {
    D.debug("CheckSessionIFrame.start :" + s), this.stop();
    const n = () => {
      this._frame.contentWindow.postMessage(this._client_id + " " + s, this._frame_origin);
    };
    n(), this._timer = window.setInterval(n, this._interval);
  }
  stop() {
    this._timer && (D.debug("CheckSessionIFrame.stop"), window.clearInterval(this._timer), this._timer = null);
  }
}
const m = {
  service_worker_not_supported_by_browser: "service_worker_not_supported_by_browser",
  token_aquired: "token_aquired",
  logout_from_another_tab: "logout_from_another_tab",
  logout_from_same_tab: "logout_from_same_tab",
  token_renewed: "token_renewed",
  token_timer: "token_timer",
  loginAsync_begin: "loginAsync_begin",
  loginAsync_error: "loginAsync_error",
  loginCallbackAsync_begin: "loginCallbackAsync_begin",
  loginCallbackAsync_end: "loginCallbackAsync_end",
  loginCallbackAsync_error: "loginCallbackAsync_error",
  refreshTokensAsync_begin: "refreshTokensAsync_begin",
  refreshTokensAsync: "refreshTokensAsync",
  refreshTokensAsync_end: "refreshTokensAsync_end",
  refreshTokensAsync_error: "refreshTokensAsync_error",
  refreshTokensAsync_silent_error: "refreshTokensAsync_silent_error",
  tryKeepExistingSessionAsync_begin: "tryKeepExistingSessionAsync_begin",
  tryKeepExistingSessionAsync_end: "tryKeepExistingSessionAsync_end",
  tryKeepExistingSessionAsync_error: "tryKeepExistingSessionAsync_error",
  silentLoginAsync_begin: "silentLoginAsync_begin",
  silentLoginAsync: "silentLoginAsync",
  silentLoginAsync_end: "silentLoginAsync_end",
  silentLoginAsync_error: "silentLoginAsync_error",
  syncTokensAsync_begin: "syncTokensAsync_begin",
  syncTokensAsync_lock_not_available: "syncTokensAsync_lock_not_available",
  syncTokensAsync_end: "syncTokensAsync_end",
  syncTokensAsync_error: "syncTokensAsync_error",
  tokensInvalidAndWaitingActionsToRefresh: "tokensInvalidAndWaitingActionsToRefresh"
}, O = (e, s = sessionStorage) => {
  const n = (h) => (s[`oidc.${e}`] = JSON.stringify({ tokens: null, status: h }), Promise.resolve()), t = async () => {
    if (!s[`oidc.${e}`])
      return s[`oidc.${e}`] = JSON.stringify({ tokens: null, status: null }), { tokens: null, status: null };
    const h = JSON.parse(s[`oidc.${e}`]);
    return Promise.resolve({ tokens: h.tokens, status: h.status });
  }, o = (h) => {
    s[`oidc.${e}`] = JSON.stringify({ tokens: h });
  }, i = async (h) => {
    s[`oidc.session_state.${e}`] = h;
  }, r = async () => s[`oidc.session_state.${e}`], a = (h) => {
    s[`oidc.nonce.${e}`] = h.nonce;
  }, l = (h) => {
    s[`oidc.jwk.${e}`] = JSON.stringify(h);
  }, f = () => JSON.parse(s[`oidc.jwk.${e}`]), u = async () => ({ nonce: s[`oidc.nonce.${e}`] }), c = async (h) => {
    s[`oidc.dpop_nonce.${e}`] = h;
  }, _ = () => s[`oidc.dpop_nonce.${e}`], y = () => s[`oidc.${e}`] ? JSON.stringify({ tokens: JSON.parse(s[`oidc.${e}`]).tokens }) : null;
  let g = {};
  return {
    clearAsync: n,
    initAsync: t,
    setTokens: o,
    getTokens: y,
    setSessionStateAsync: i,
    getSessionStateAsync: r,
    setNonceAsync: a,
    getNonceAsync: u,
    setLoginParams: (h) => {
      g[e] = h, s[`oidc.login.${e}`] = JSON.stringify(h);
    },
    getLoginParams: () => {
      const h = s[`oidc.login.${e}`];
      return h ? (g[e] || (g[e] = JSON.parse(h)), g[e]) : (console.warn(`storage[oidc.login.${e}] is empty, you should have an bad OIDC or code configuration somewhere.`), null);
    },
    getStateAsync: async () => s[`oidc.state.${e}`],
    setStateAsync: async (h) => {
      s[`oidc.state.${e}`] = h;
    },
    getCodeVerifierAsync: async () => s[`oidc.code_verifier.${e}`],
    setCodeVerifierAsync: async (h) => {
      s[`oidc.code_verifier.${e}`] = h;
    },
    setDemonstratingProofOfPossessionNonce: c,
    getDemonstratingProofOfPossessionNonce: _,
    setDemonstratingProofOfPossessionJwkAsync: l,
    getDemonstratingProofOfPossessionJwkAsync: f
  };
};
var V = /* @__PURE__ */ ((e) => (e.AutomaticBeforeTokenExpiration = "AutomaticBeforeTokensExpiration", e.AutomaticOnlyWhenFetchExecuted = "AutomaticOnlyWhenFetchExecuted", e))(V || {});
const Oe = (e) => decodeURIComponent(Array.prototype.map.call(atob(e), (s) => "%" + ("00" + s.charCodeAt(0).toString(16)).slice(-2)).join("")), Ie = (e) => JSON.parse(Oe(e.replaceAll(/-/g, "+").replaceAll(/_/g, "/"))), ae = (e) => {
  try {
    return e && Ce(e, ".") === 2 ? Ie(e.split(".")[1]) : null;
  } catch (s) {
    console.warn(s);
  }
  return null;
}, Ce = (e, s) => e.split(s).length - 1, Z = {
  access_token_or_id_token_invalid: "access_token_or_id_token_invalid",
  access_token_invalid: "access_token_invalid",
  id_token_invalid: "id_token_invalid"
};
function Ne(e, s, n) {
  if (e.issuedAt) {
    if (typeof e.issuedAt == "string")
      return parseInt(e.issuedAt, 10);
  } else
    return s && s.iat ? s.iat : n && n.iat ? n.iat : (/* @__PURE__ */ new Date()).getTime() / 1e3;
  return e.issuedAt;
}
const X = (e, s = null, n) => {
  if (!e)
    return null;
  let t;
  const o = typeof e.expiresIn == "string" ? parseInt(e.expiresIn, 10) : e.expiresIn;
  e.accessTokenPayload !== void 0 ? t = e.accessTokenPayload : t = ae(e.accessToken);
  let i;
  s != null && "idToken" in s && !("idToken" in e) ? i = s.idToken : i = e.idToken;
  const r = e.idTokenPayload ? e.idTokenPayload : ae(i), a = r && r.exp ? r.exp : Number.MAX_VALUE, l = t && t.exp ? t.exp : e.issuedAt + o;
  e.issuedAt = Ne(e, t, r);
  let f;
  e.expiresAt ? f = e.expiresAt : n === Z.access_token_invalid ? f = l : n === Z.id_token_invalid ? f = a : f = a < l ? a : l;
  const u = { ...e, idTokenPayload: r, accessTokenPayload: t, expiresAt: f, idToken: i };
  if (s != null && "refreshToken" in s && !("refreshToken" in e)) {
    const c = s.refreshToken;
    return { ...u, refreshToken: c };
  }
  return u;
}, oe = (e, s, n) => {
  if (!e)
    return null;
  if (!e.issued_at) {
    const o = (/* @__PURE__ */ new Date()).getTime() / 1e3;
    e.issued_at = o;
  }
  const t = {
    accessToken: e.access_token,
    expiresIn: e.expires_in,
    idToken: e.id_token,
    scope: e.scope,
    tokenType: e.token_type,
    issuedAt: e.issued_at
  };
  return "refresh_token" in e && (t.refreshToken = e.refresh_token), e.accessTokenPayload !== void 0 && (t.accessTokenPayload = e.accessTokenPayload), e.idTokenPayload !== void 0 && (t.idTokenPayload = e.idTokenPayload), X(t, s, n);
}, U = (e, s) => {
  const n = (/* @__PURE__ */ new Date()).getTime() / 1e3, t = s - n;
  return Math.round(t - e);
}, ce = (e) => e ? U(0, e.expiresAt) > 0 : !1, ge = async (e, s = 200, n = 50) => {
  let t = n;
  if (!e.tokens)
    return null;
  for (; !ce(e.tokens) && t > 0; ) {
    if (e.configuration.token_automatic_renew_mode == V.AutomaticOnlyWhenFetchExecuted) {
      await e.renewTokensAsync({});
      break;
    } else
      await z({ milliseconds: s });
    t = t - 1;
  }
  return {
    isTokensValid: ce(e.tokens),
    tokens: e.tokens,
    numberWaited: t - n
  };
}, ke = (e, s, n) => {
  if (e.idTokenPayload) {
    const t = e.idTokenPayload;
    if (n.issuer !== t.iss)
      return { isValid: !1, reason: `Issuer does not match (oidcServerConfiguration issuer) ${n.issuer} !== (idTokenPayload issuer) ${t.iss}` };
    const o = (/* @__PURE__ */ new Date()).getTime() / 1e3;
    if (t.exp && t.exp < o)
      return { isValid: !1, reason: `Token expired (idTokenPayload exp) ${t.exp} < (currentTimeUnixSecond) ${o}` };
    const i = 60 * 60 * 24 * 7;
    if (t.iat && t.iat + i < o)
      return { isValid: !1, reason: `Token is used from too long time (idTokenPayload iat + timeInSevenDays) ${t.iat + i} < (currentTimeUnixSecond) ${o}` };
    if (t.nonce && t.nonce !== s)
      return { isValid: !1, reason: `Nonce does not match (idTokenPayload nonce) ${t.nonce} !== (nonce) ${s}` };
  }
  return { isValid: !0, reason: "" };
}, M = function() {
  const e = typeof window > "u" ? global : window;
  return {
    setTimeout: setTimeout.bind(e),
    clearTimeout: clearTimeout.bind(e),
    setInterval: setInterval.bind(e),
    clearInterval: clearInterval.bind(e)
  };
}(), le = "7.22.17";
let ue = null, q;
const z = ({ milliseconds: e }) => new Promise((s) => M.setTimeout(s, e)), me = (e = "/") => {
  try {
    q = new AbortController(), fetch(`${e}OidcKeepAliveServiceWorker.json?minSleepSeconds=150`, { signal: q.signal }).catch((t) => {
      console.log(t);
    }), z({ milliseconds: 150 * 1e3 }).then(me);
  } catch (s) {
    console.log(s);
  }
}, xe = () => {
  q && q.abort();
}, We = (e = "/") => fetch(`${e}OidcKeepAliveServiceWorker.json`, {
  headers: {
    "oidc-vanilla": "true"
  }
}).then((s) => s.statusText === "oidc-service-worker").catch((s) => {
  console.log(s);
}), Le = (e) => async (s, n) => {
  n(), await s.update();
  const t = await s.unregister();
  console.log(`Service worker unregistering ${t}`), await z({ milliseconds: 2e3 }), e.reload();
}, P = (e) => (s) => new Promise(function(n, t) {
  const o = new MessageChannel();
  o.port1.onmessage = function(i) {
    i.data && i.data.error ? t(i.data.error) : n(i.data), o.port1.close(), o.port2.close();
  }, e.active.postMessage(s, [o.port2]);
}), I = async (e, s) => {
  const n = e.service_worker_relative_url;
  if (typeof window > "u" || typeof navigator > "u" || !navigator.serviceWorker || !n || e.service_worker_activate() === !1)
    return null;
  let t = null;
  e.register ? t = await e.service_worker_register(n) : t = await navigator.serviceWorker.register(n);
  try {
    await navigator.serviceWorker.ready, navigator.serviceWorker.controller || await P(t)({ type: "claim" });
  } catch {
    return null;
  }
  const o = async (d) => P(t)({ type: "clear", data: { status: d }, configurationName: s }), i = async (d, A, v) => {
    const W = await P(t)({
      type: "init",
      data: {
        oidcServerConfiguration: d,
        where: A,
        oidcConfiguration: {
          token_renew_mode: v.token_renew_mode,
          service_worker_convert_all_requests_to_cors: v.service_worker_convert_all_requests_to_cors
        }
      },
      configurationName: s
    }), L = W.version;
    return L !== le && (console.warn(`Service worker ${L} version mismatch with js client version ${le}, unregistering and reloading`), await v.service_worker_update_require_callback(t, xe)), { tokens: oe(W.tokens, null, v.token_renew_mode), status: W.status };
  }, r = (d = "/") => {
    ue == null && (ue = "not_null", me(d));
  }, a = (d) => P(t)({ type: "setSessionState", data: { sessionState: d }, configurationName: s }), l = async () => (await P(t)({ type: "getSessionState", data: null, configurationName: s })).sessionState, f = (d) => (sessionStorage[`oidc.nonce.${s}`] = d.nonce, P(t)({ type: "setNonce", data: { nonce: d }, configurationName: s })), u = async () => {
    let A = (await P(t)({ type: "getNonce", data: null, configurationName: s })).nonce;
    return A || (A = sessionStorage[`oidc.nonce.${s}`], console.warn("nonce not found in service worker, using sessionStorage")), { nonce: A };
  };
  let c = {};
  return {
    clearAsync: o,
    initAsync: i,
    startKeepAliveServiceWorker: () => r(e.service_worker_keep_alive_path),
    isServiceWorkerProxyActiveAsync: () => We(e.service_worker_keep_alive_path),
    setSessionStateAsync: a,
    getSessionStateAsync: l,
    setNonceAsync: f,
    getNonceAsync: u,
    setLoginParams: (d) => {
      c[s] = d, localStorage[`oidc.login.${s}`] = JSON.stringify(d);
    },
    getLoginParams: () => {
      const d = localStorage[`oidc.login.${s}`];
      return c[s] || (c[s] = JSON.parse(d)), c[s];
    },
    getStateAsync: async () => {
      let A = (await P(t)({ type: "getState", data: null, configurationName: s })).state;
      return A || (A = sessionStorage[`oidc.state.${s}`], console.warn("state not found in service worker, using sessionStorage")), A;
    },
    setStateAsync: async (d) => (sessionStorage[`oidc.state.${s}`] = d, P(t)({ type: "setState", data: { state: d }, configurationName: s })),
    getCodeVerifierAsync: async () => {
      let A = (await P(t)({ type: "getCodeVerifier", data: null, configurationName: s })).codeVerifier;
      return A || (A = sessionStorage[`oidc.code_verifier.${s}`], console.warn("codeVerifier not found in service worker, using sessionStorage")), A;
    },
    setCodeVerifierAsync: async (d) => (sessionStorage[`oidc.code_verifier.${s}`] = d, P(t)({ type: "setCodeVerifier", data: { codeVerifier: d }, configurationName: s })),
    setDemonstratingProofOfPossessionNonce: async (d) => {
      await P(t)({ type: "setDemonstratingProofOfPossessionNonce", data: { demonstratingProofOfPossessionNonce: d }, configurationName: s });
    },
    getDemonstratingProofOfPossessionNonce: async () => (await P(t)({ type: "getDemonstratingProofOfPossessionNonce", data: null, configurationName: s })).demonstratingProofOfPossessionNonce,
    setDemonstratingProofOfPossessionJwkAsync: async (d) => {
      const A = JSON.stringify(d);
      await P(t)({ type: "setDemonstratingProofOfPossessionJwk", data: { demonstratingProofOfPossessionJwkJson: A }, configurationName: s });
    },
    getDemonstratingProofOfPossessionJwkAsync: async () => {
      const d = await P(t)({ type: "getDemonstratingProofOfPossessionJwk", data: null, configurationName: s });
      return d.demonstratingProofOfPossessionJwkJson ? JSON.parse(d.demonstratingProofOfPossessionJwkJson) : null;
    }
  };
}, R = {}, De = (e, s = window.sessionStorage, n) => {
  if (!R[e] && s) {
    const o = s.getItem(e);
    o && (R[e] = JSON.parse(o));
  }
  const t = 1e3 * n;
  return R[e] && R[e].timestamp + t > Date.now() ? R[e].result : null;
}, Re = (e, s, n = window.sessionStorage) => {
  const t = Date.now();
  R[e] = { result: s, timestamp: t }, n && n.setItem(e, JSON.stringify({ result: s, timestamp: t }));
};
function pe(e) {
  return new TextEncoder().encode(e);
}
function we(e) {
  return btoa(e).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+/g, "");
}
function $e(e) {
  return encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function(n, t) {
    return String.fromCharCode(parseInt(t, 16));
  });
}
const ie = (e) => {
  let s = "";
  return e.forEach(function(n) {
    s += String.fromCharCode(n);
  }), we(s);
};
function _e(e) {
  return we($e(e));
}
const Ke = {
  importKeyAlgorithm: {
    name: "ECDSA",
    namedCurve: "P-256",
    hash: { name: "ES256" }
  },
  signAlgorithm: { name: "ECDSA", hash: { name: "SHA-256" } },
  generateKeyAlgorithm: {
    name: "ECDSA",
    namedCurve: "P-256"
  },
  digestAlgorithm: { name: "SHA-256" },
  jwtHeaderAlgorithm: "ES256"
}, Ue = (e) => async (s, n, t, o, i = "dpop+jwt") => {
  switch (s = Object.assign({}, s), n.typ = i, n.alg = o.jwtHeaderAlgorithm, n.alg) {
    case "ES256":
      n.jwk = { kty: s.kty, crv: s.crv, x: s.x, y: s.y };
      break;
    case "RS256":
      n.jwk = { kty: s.kty, n: s.n, e: s.e, kid: n.kid };
      break;
    default:
      throw new Error("Unknown or not implemented JWS algorithm");
  }
  const r = {
    // @ts-ignore
    // JWT "headers" really means JWS "protected headers"
    protected: _e(JSON.stringify(n)),
    // @ts-ignore
    // JWT "claims" are really a JSON-defined JWS "payload"
    payload: _e(JSON.stringify(t))
  }, a = o.importKeyAlgorithm, l = !0, f = ["sign"], u = await e.crypto.subtle.importKey("jwk", s, a, l, f), c = pe(`${r.protected}.${r.payload}`), _ = o.signAlgorithm, y = await e.crypto.subtle.sign(_, u, c);
  return r.signature = ie(new Uint8Array(y)), `${r.protected}.${r.payload}.${r.signature}`;
};
var Fe = { sign: Ue };
const Ve = (e) => async (s) => {
  const n = s, t = !0, o = ["sign", "verify"], i = await e.crypto.subtle.generateKey(n, t, o);
  return await e.crypto.subtle.exportKey("jwk", i.privateKey);
}, Je = (e) => {
  const s = Object.assign({}, e);
  return delete s.d, s.key_ops = ["verify"], s;
}, Me = {
  generate: Ve,
  neuter: Je
}, Be = (e) => async (s, n) => {
  let t;
  switch (s.kty) {
    case "EC":
      t = '{"crv":"CRV","kty":"EC","x":"X","y":"Y"}'.replace("CRV", s.crv).replace("X", s.x).replace("Y", s.y);
      break;
    case "RSA":
      t = '{"e":"E","kty":"RSA","n":"N"}'.replace("E", s.e).replace("N", s.n);
      break;
    default:
      throw new Error("Unknown or not implemented JWK type");
  }
  const o = await e.crypto.subtle.digest(n, pe(t));
  return ie(new Uint8Array(o));
};
var He = { thumbprint: Be };
const qe = (e) => async (s) => await Me.generate(e)(s), Ae = (e) => (s) => async (n, t = "POST", o, i = {}) => {
  const r = {
    // https://www.rfc-editor.org/rfc/rfc9449.html#name-concept
    jti: btoa(je()),
    htm: t,
    htu: o,
    iat: Math.round(Date.now() / 1e3),
    ...i
  }, a = await He.thumbprint(e)(n, s.digestAlgorithm);
  return await Fe.sign(e)(n, { kid: a }, r, s);
}, je = () => {
  const e = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx", s = "0123456789abcdef";
  let n = 0, t = "";
  for (let o = 0; o < 36; o++)
    e[o] !== "-" && e[o] !== "4" && (n = Math.random() * 16 | 0), e[o] === "x" ? t += s[n] : e[o] === "y" ? (n &= 3, n |= 8, t += s[n]) : t += e[o];
  return t;
}, Se = () => {
  const e = typeof window < "u" && !!window.crypto, s = e && !!window.crypto.subtle;
  return { hasCrypto: e, hasSubtleCrypto: s };
}, ee = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", Ge = (e) => {
  const s = [];
  for (let n = 0; n < e.byteLength; n += 1) {
    const t = e[n] % ee.length;
    s.push(ee[t]);
  }
  return s.join("");
}, se = (e) => {
  const s = new Uint8Array(e), { hasCrypto: n } = Se();
  if (n)
    window.crypto.getRandomValues(s);
  else
    for (let t = 0; t < e; t += 1)
      s[t] = Math.random() * ee.length | 0;
  return Ge(s);
};
function Ye(e) {
  const s = new ArrayBuffer(e.length), n = new Uint8Array(s);
  for (let t = 0; t < e.length; t++)
    n[t] = e.charCodeAt(t);
  return n;
}
function ve(e) {
  return new Promise((s, n) => {
    crypto.subtle.digest("SHA-256", Ye(e)).then((t) => s(ie(new Uint8Array(t))), (t) => n(t));
  });
}
const Xe = (e) => {
  if (e.length < 43 || e.length > 128)
    return Promise.reject(new Error("Invalid code length."));
  const { hasSubtleCrypto: s } = Se();
  return s ? ve(e) : Promise.reject(new Error("window.crypto.subtle is unavailable."));
}, ze = 60 * 60, Qe = (e) => async (s, n = ze, t = window.sessionStorage, o = 1e4) => {
  const i = `${s}/.well-known/openid-configuration`, r = `oidc.server:${s}`, a = De(r, t, n);
  if (a)
    return new te(a);
  const l = await B(e)(i, {}, o);
  if (l.status !== 200)
    return null;
  const f = await l.json();
  return Re(r, f, t), new te(f);
}, B = (e) => async (s, n = {}, t = 1e4, o = 0) => {
  let i;
  try {
    const r = new AbortController();
    setTimeout(() => r.abort(), t), i = await e(s, { ...n, signal: r.signal });
  } catch (r) {
    if (r.name === "AbortError" || r.message === "Network request failed") {
      if (o <= 1)
        return await B(e)(s, n, t, o + 1);
      throw r;
    } else
      throw console.error(r.message), r;
  }
  return i;
}, ne = {
  refresh_token: "refresh_token",
  access_token: "access_token"
}, fe = (e) => async (s, n, t = ne.refresh_token, o, i = {}, r = 1e4) => {
  const a = {
    token: n,
    token_type_hint: t,
    client_id: o
  };
  for (const [c, _] of Object.entries(i))
    a[c] === void 0 && (a[c] = _);
  const l = [];
  for (const c in a) {
    const _ = encodeURIComponent(c), y = encodeURIComponent(a[c]);
    l.push(`${_}=${y}`);
  }
  const f = l.join("&");
  return (await B(e)(s, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: f
  }, r)).status !== 200 ? { success: !1 } : {
    success: !0
  };
}, Ze = (e) => async (s, n, t, o, i = {}, r, a = 1e4) => {
  for (const [y, g] of Object.entries(t))
    n[y] === void 0 && (n[y] = g);
  const l = [];
  for (const y in n) {
    const g = encodeURIComponent(y), p = encodeURIComponent(n[y]);
    l.push(`${g}=${p}`);
  }
  const f = l.join("&"), u = await B(e)(s, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      ...i
    },
    body: f
  }, a);
  if (u.status !== 200)
    return {
      success: !1,
      status: u.status,
      demonstratingProofOfPossessionNonce: null
    };
  const c = await u.json();
  let _ = null;
  return u.headers.has(j) && (_ = u.headers.get(j)), {
    success: !0,
    status: u.status,
    data: oe(c, o, r),
    demonstratingProofOfPossessionNonce: _
  };
}, es = (e, s) => async (n, t) => {
  t = t ? { ...t } : {};
  const o = se(128), i = await Xe(o);
  await e.setCodeVerifierAsync(o), await e.setStateAsync(t.state), t.code_challenge = i, t.code_challenge_method = "S256";
  let r = "";
  if (t)
    for (const [a, l] of Object.entries(t))
      r === "" ? r += "?" : r += "&", r += `${a}=${encodeURIComponent(l)}`;
  s.open(`${n}${r}`);
}, j = "DPoP-Nonce", ss = (e) => async (s, n, t, o, i = 1e4) => {
  n = n ? { ...n } : {}, n.code_verifier = await e.getCodeVerifierAsync();
  const r = [];
  for (const c in n) {
    const _ = encodeURIComponent(c), y = encodeURIComponent(n[c]);
    r.push(`${_}=${y}`);
  }
  const a = r.join("&"), l = await B(fetch)(s, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      ...t
    },
    body: a
  }, i);
  if (await Promise.all([e.setCodeVerifierAsync(null), e.setStateAsync(null)]), l.status !== 200)
    return { success: !1, status: l.status };
  let f = null;
  l.headers.has(j) && (f = l.headers.get(j));
  const u = await l.json();
  return {
    success: !0,
    data: {
      state: n.state,
      tokens: oe(u, null, o),
      demonstratingProofOfPossessionNonce: f
    }
  };
};
async function de(e, s, n) {
  const t = (a) => {
    e.tokens = a;
  }, { tokens: o, status: i } = await H(e)(0, s, n, t);
  return await I(e.configuration, e.configurationName) || await O(e.configurationName, e.configuration.storage).setTokens(e.tokens), e.tokens ? o : (await e.destroyAsync(i), null);
}
const ns = async (e, s) => {
  const n = await I(s, e.configurationName);
  if (n) {
    const t = await e.initAsync(s.authority, s.authority_configuration), { tokens: o } = await n.initAsync(t, "tryKeepExistingSessionAsync", s);
    return o;
  } else {
    const t = O(e.configurationName, s.storage ?? sessionStorage);
    let { tokens: o } = await t.initAsync();
    return o = X(o, e.tokens, s.token_renew_mode), o;
  }
};
async function Te(e, s = !1, n = null) {
  const t = e.configuration, o = `${t.client_id}_${e.configurationName}_${t.authority}`;
  let i;
  const r = await I(e.configuration, e.configurationName);
  return (t == null ? void 0 : t.storage) === (window == null ? void 0 : window.sessionStorage) && !r ? i = await de(e, s, n) : i = await navigator.locks.request(o, { ifAvailable: !0 }, async (a) => a ? await de(e, s, n) : (e.publishEvent(C.eventNames.syncTokensAsync_lock_not_available, { lock: "lock not available" }), await ns(e, t))), i ? (e.timeoutId && (e.timeoutId = J(e, e.tokens.expiresAt, n)), e.tokens) : null;
}
const J = (e, s, n = null) => {
  const t = e.configuration.refresh_time_before_tokens_expiration_in_second;
  return M.setTimeout(async () => {
    const i = { timeLeft: U(t, s) };
    e.publishEvent(C.eventNames.token_timer, i), await Te(e, !1, n);
  }, 1e3);
}, N = {
  FORCE_REFRESH: "FORCE_REFRESH",
  SESSION_LOST: "SESSION_LOST",
  NOT_CONNECTED: "NOT_CONNECTED",
  TOKENS_VALID: "TOKENS_VALID",
  TOKEN_UPDATED_BY_ANOTHER_TAB_TOKENS_VALID: "TOKEN_UPDATED_BY_ANOTHER_TAB_TOKENS_VALID",
  LOGOUT_FROM_ANOTHER_TAB: "LOGOUT_FROM_ANOTHER_TAB",
  REQUIRE_SYNC_TOKENS: "REQUIRE_SYNC_TOKENS"
}, ts = (e) => async (s, n, t, o = !1) => {
  const i = { nonce: null };
  if (!t)
    return { tokens: null, status: "NOT_CONNECTED", nonce: i };
  let r = i;
  const a = await e.initAsync(s.authority, s.authority_configuration), l = await I(s, n);
  if (l) {
    const { status: c, tokens: _ } = await l.initAsync(a, "syncTokensAsync", s);
    if (c === "LOGGED_OUT")
      return { tokens: null, status: "LOGOUT_FROM_ANOTHER_TAB", nonce: i };
    if (c === "SESSIONS_LOST")
      return { tokens: null, status: "SESSIONS_LOST", nonce: i };
    if (!c || !_)
      return { tokens: null, status: "REQUIRE_SYNC_TOKENS", nonce: i };
    if (_.issuedAt !== t.issuedAt) {
      const g = U(s.refresh_time_before_tokens_expiration_in_second, _.expiresAt) > 0 ? "TOKEN_UPDATED_BY_ANOTHER_TAB_TOKENS_VALID" : "TOKEN_UPDATED_BY_ANOTHER_TAB_TOKENS_INVALID", p = await l.getNonceAsync();
      return { tokens: _, status: g, nonce: p };
    }
    r = await l.getNonceAsync();
  } else {
    const c = O(n, s.storage ?? sessionStorage);
    let { tokens: _, status: y } = await c.initAsync();
    if (_ && (_ = X(_, e.tokens, s.token_renew_mode)), _) {
      if (y === "SESSIONS_LOST")
        return { tokens: null, status: "SESSIONS_LOST", nonce: i };
      if (_.issuedAt !== t.issuedAt) {
        const p = U(s.refresh_time_before_tokens_expiration_in_second, _.expiresAt) > 0 ? "TOKEN_UPDATED_BY_ANOTHER_TAB_TOKENS_VALID" : "TOKEN_UPDATED_BY_ANOTHER_TAB_TOKENS_INVALID", k = await c.getNonceAsync();
        return { tokens: _, status: p, nonce: k };
      }
    } else
      return { tokens: null, status: "LOGOUT_FROM_ANOTHER_TAB", nonce: i };
    r = await c.getNonceAsync();
  }
  const u = U(s.refresh_time_before_tokens_expiration_in_second, t.expiresAt) > 0 ? "TOKENS_VALID" : "TOKENS_INVALID";
  return o ? { tokens: t, status: "FORCE_REFRESH", nonce: r } : { tokens: t, status: u, nonce: r };
}, H = (e) => async (s = 0, n = !1, t = null, o) => {
  if (!navigator.onLine && document.hidden)
    return { tokens: e.tokens, status: "GIVE_UP" };
  let i = 6;
  for (; !navigator.onLine && i > 0; )
    await z({ milliseconds: 1e3 }), i--, e.publishEvent(m.refreshTokensAsync, { message: `wait because navigator is offline try ${i}` });
  const r = s + 1;
  t || (t = {});
  const a = e.configuration, l = (u, c = null, _ = null) => re(e.configurationName, e.configuration, e.publishEvent.bind(e))(u, c, _), f = async () => {
    try {
      let u;
      const c = await I(a, e.configurationName);
      c ? u = c.getLoginParams() : u = O(e.configurationName, a.storage).getLoginParams();
      const _ = await l({
        ...u.extras,
        ...t,
        prompt: "none"
      });
      return _ ? _.error ? (o(null), e.publishEvent(m.refreshTokensAsync_error, { message: "refresh token silent" }), { tokens: null, status: "SESSION_LOST" }) : (o(_.tokens), e.publishEvent(C.eventNames.token_renewed, {}), { tokens: _.tokens, status: "LOGGED" }) : (o(null), e.publishEvent(m.refreshTokensAsync_error, { message: "refresh token silent not active" }), { tokens: null, status: "SESSION_LOST" });
    } catch (u) {
      return console.error(u), e.publishEvent(m.refreshTokensAsync_silent_error, { message: "exceptionSilent", exception: u.message }), await H(e)(r, n, t, o);
    }
  };
  try {
    const { status: u, tokens: c, nonce: _ } = await ts(e)(a, e.configurationName, e.tokens, n);
    switch (u) {
      case N.SESSION_LOST:
        return o(null), e.publishEvent(m.refreshTokensAsync_error, { message: "refresh token session lost" }), { tokens: null, status: "SESSION_LOST" };
      case N.NOT_CONNECTED:
        return o(null), { tokens: null, status: null };
      case N.TOKENS_VALID:
        return o(c), { tokens: c, status: "LOGGED_IN" };
      case N.TOKEN_UPDATED_BY_ANOTHER_TAB_TOKENS_VALID:
        return o(c), e.publishEvent(C.eventNames.token_renewed, { reason: "TOKEN_UPDATED_BY_ANOTHER_TAB_TOKENS_VALID" }), { tokens: c, status: "LOGGED_IN" };
      case N.LOGOUT_FROM_ANOTHER_TAB:
        return o(null), e.publishEvent(m.logout_from_another_tab, { status: "session syncTokensAsync" }), { tokens: null, status: "LOGGED_OUT" };
      case N.REQUIRE_SYNC_TOKENS:
        return a.token_automatic_renew_mode == V.AutomaticOnlyWhenFetchExecuted && N.FORCE_REFRESH !== u ? (e.publishEvent(m.tokensInvalidAndWaitingActionsToRefresh, {}), { tokens: e.tokens, status: "GIVE_UP" }) : (e.publishEvent(m.refreshTokensAsync_begin, { tryNumber: s }), await f());
      default: {
        if (a.token_automatic_renew_mode == V.AutomaticOnlyWhenFetchExecuted && N.FORCE_REFRESH !== u)
          return e.publishEvent(m.tokensInvalidAndWaitingActionsToRefresh, {}), { tokens: e.tokens, status: "GIVE_UP" };
        if (e.publishEvent(m.refreshTokensAsync_begin, { refreshToken: c.refreshToken, status: u, tryNumber: s }), !c.refreshToken)
          return await f();
        const y = a.client_id, g = a.redirect_uri, p = a.authority, w = { ...a.token_request_extras ? a.token_request_extras : {} };
        for (const [S, E] of Object.entries(t))
          S.endsWith(":token_request") && (w[S.replace(":token_request", "")] = E);
        return await (async () => {
          const S = {
            client_id: y,
            redirect_uri: g,
            grant_type: "refresh_token",
            refresh_token: c.refreshToken
          }, E = await e.initAsync(p, a.authority_configuration), h = document.hidden ? 1e4 : 3e4 * 10, d = E.tokenEndpoint, A = {};
          a.demonstrating_proof_of_possession && (A.DPoP = await e.generateDemonstrationOfProofOfPossessionAsync(c.accessToken, d, "POST"));
          const v = await Ze(e.getFetch())(
            d,
            S,
            w,
            c,
            A,
            a.token_renew_mode,
            h
          );
          if (v.success) {
            const { isValid: W, reason: L } = ke(v.data, _.nonce, E);
            if (!W)
              return o(null), e.publishEvent(m.refreshTokensAsync_error, { message: `refresh token return not valid tokens, reason: ${L}` }), { tokens: null, status: "SESSION_LOST" };
            if (o(v.data), v.demonstratingProofOfPossessionNonce) {
              const b = await I(a, e.configurationName);
              b ? await b.setDemonstratingProofOfPossessionNonce(v.demonstratingProofOfPossessionNonce) : await O(e.configurationName, a.storage).setDemonstratingProofOfPossessionNonce(v.demonstratingProofOfPossessionNonce);
            }
            return e.publishEvent(m.refreshTokensAsync_end, { success: v.success }), e.publishEvent(C.eventNames.token_renewed, { reason: "REFRESH_TOKEN" }), { tokens: v.data, status: "LOGGED_IN" };
          } else
            return e.publishEvent(m.refreshTokensAsync_silent_error, {
              message: "bad request",
              tokenResponse: v
            }), v.status >= 400 && v.status < 500 ? (o(null), e.publishEvent(m.refreshTokensAsync_error, { message: `session lost: ${v.status}` }), { tokens: null, status: "SESSION_LOST" }) : await H(e)(r, n, t, o);
        })();
      }
    }
  } catch (u) {
    return console.error(u), e.publishEvent(m.refreshTokensAsync_silent_error, {
      message: "exception",
      exception: u.message
    }), new Promise((c, _) => {
      setTimeout(() => {
        H(e)(r, n, t, o).then(c).catch(_);
      }, 1e3);
    });
  }
}, re = (e, s, n) => (t = null, o = null, i = null) => {
  if (!s.silent_redirect_uri || !s.silent_login_uri)
    return Promise.resolve(null);
  try {
    n(m.silentLoginAsync_begin, {});
    let r = "";
    if (o && (t == null && (t = {}), t.state = o), i && (t == null && (t = {}), t.scope = i), t != null)
      for (const [c, _] of Object.entries(t))
        r === "" ? r = `?${encodeURIComponent(c)}=${encodeURIComponent(_)}` : r += `&${encodeURIComponent(c)}=${encodeURIComponent(_)}`;
    const a = s.silent_login_uri + r, l = a.indexOf("/", a.indexOf("//") + 2), f = a.substring(0, l), u = document.createElement("iframe");
    return u.width = "0px", u.height = "0px", u.id = `${e}_oidc_iframe`, u.setAttribute("src", a), document.body.appendChild(u), new Promise((c, _) => {
      let y = !1;
      const g = () => {
        window.removeEventListener("message", p), u.remove(), y = !0;
      }, p = (k) => {
        if (k.origin === f && k.source === u.contentWindow) {
          const w = `${e}_oidc_tokens:`, T = `${e}_oidc_error:`, S = `${e}_oidc_exception:`, E = k.data;
          if (E && typeof E == "string" && !y) {
            if (E.startsWith(w)) {
              const h = JSON.parse(k.data.replace(w, ""));
              n(m.silentLoginAsync_end, {}), c(h), g();
            } else if (E.startsWith(T)) {
              const h = JSON.parse(k.data.replace(T, ""));
              n(m.silentLoginAsync_error, h), c({ error: "oidc_" + h.error, tokens: null, sessionState: null }), g();
            } else if (E.startsWith(S)) {
              const h = JSON.parse(k.data.replace(S, ""));
              n(m.silentLoginAsync_error, h), _(new Error(h.error)), g();
            }
          }
        }
      };
      try {
        window.addEventListener("message", p);
        const k = s.silent_login_timeout;
        setTimeout(() => {
          y || (g(), n(m.silentLoginAsync_error, { reason: "timeout" }), _(new Error("timeout")));
        }, k);
      } catch (k) {
        g(), n(m.silentLoginAsync_error, k), _(k);
      }
    });
  } catch (r) {
    throw n(m.silentLoginAsync_error, r), r;
  }
}, os = (e, s, n, t, o) => (i = null, r = void 0) => {
  i = { ...i };
  const a = (f, u, c) => re(s, n, t.bind(o))(f, u, c);
  return (async () => {
    o.timeoutId && M.clearTimeout(o.timeoutId);
    let f;
    i && "state" in i && (f = i.state, delete i.state);
    try {
      const u = n.extras ? { ...n.extras, ...i } : i, c = await a({
        ...u,
        prompt: "none"
      }, f, r);
      if (c)
        return o.tokens = c.tokens, t(m.token_aquired, {}), o.timeoutId = J(o, o.tokens.expiresAt, i), {};
    } catch (u) {
      return u;
    }
  })();
}, is = (e, s, n) => (t, o, i, r = !1) => {
  const a = (l, f = void 0, u = void 0) => re(e.configurationName, n, e.publishEvent.bind(e))(l, f, u);
  return new Promise((l, f) => {
    if (n.silent_login_uri && n.silent_redirect_uri && n.monitor_session && t && i && !r) {
      const u = () => {
        e.checkSessionIFrame.stop();
        const c = e.tokens;
        if (c === null)
          return;
        const _ = c.idToken, y = c.idTokenPayload;
        return a({
          prompt: "none",
          id_token_hint: _,
          scope: n.scope || "openid"
        }).then((g) => {
          if (g.error)
            throw new Error(g.error);
          const p = g.tokens.idTokenPayload;
          if (y.sub === p.sub) {
            const k = g.sessionState;
            e.checkSessionIFrame.start(g.sessionState), y.sid === p.sid ? console.debug("SessionMonitor._callback: Same sub still logged in at OP, restarting check session iframe; session_state:", k) : console.debug("SessionMonitor._callback: Same sub still logged in at OP, session state has changed, restarting check session iframe; session_state:", k);
          } else
            console.debug("SessionMonitor._callback: Different subject signed into OP:", p.sub);
        }).catch(async (g) => {
          console.warn("SessionMonitor._callback: Silent login failed, logging out other tabs:", g);
          for (const [p, k] of Object.entries(s))
            await k.logoutOtherTabAsync(n.client_id, y.sub);
        });
      };
      e.checkSessionIFrame = new Pe(u, o, t), e.checkSessionIFrame.load().then(() => {
        e.checkSessionIFrame.start(i), l(e.checkSessionIFrame);
      }).catch((c) => {
        f(c);
      });
    } else
      l(null);
  });
}, Ee = (e) => {
  const s = e.match(
    // eslint-disable-next-line no-useless-escape
    /^([a-z][\w-]+\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/
  );
  if (!s)
    throw new Error("Invalid URL");
  let n = s[6], t = s[7];
  if (t) {
    const o = t.split("?");
    o.length === 2 && (t = o[0], n = o[1]);
  }
  return n.startsWith("?") && (n = n.slice(1)), s && {
    href: e,
    protocol: s[1],
    host: s[2],
    hostname: s[3],
    port: s[4],
    path: s[5],
    search: n,
    hash: t
  };
}, Ss = (e) => {
  const s = Ee(e);
  let { path: n } = s;
  n.endsWith("/") && (n = n.slice(0, -1));
  let { hash: t } = s;
  return t === "#_=_" && (t = ""), t && (n += t), n;
}, G = (e) => {
  const s = Ee(e), { search: n } = s;
  return rs(n);
}, rs = (e) => {
  const s = {};
  let n, t, o;
  const i = e.split("&");
  for (t = 0, o = i.length; t < o; t++)
    n = i[t].split("="), s[decodeURIComponent(n[0])] = decodeURIComponent(n[1]);
  return s;
}, as = (e, s, n, t, o) => (i = void 0, r = null, a = !1, l = void 0) => {
  const f = r;
  return r = { ...r }, (async () => {
    const c = i || o.getPath();
    if ("state" in r || (r.state = se(16)), n(m.loginAsync_begin, {}), r)
      for (const _ of Object.keys(r))
        _.endsWith(":token_request") && delete r[_];
    try {
      const _ = a ? s.silent_redirect_uri : s.redirect_uri;
      l || (l = s.scope);
      const y = s.extras ? { ...s.extras, ...r } : r;
      y.nonce || (y.nonce = se(12));
      const g = { nonce: y.nonce }, p = await I(s, e), k = await t(s.authority, s.authority_configuration);
      let w;
      if (p)
        p.setLoginParams({ callbackPath: c, extras: f }), await p.initAsync(k, "loginAsync", s), await p.setNonceAsync(g), p.startKeepAliveServiceWorker(), w = p;
      else {
        const S = O(e, s.storage ?? sessionStorage);
        S.setLoginParams({ callbackPath: c, extras: f }), await S.setNonceAsync(g), w = S;
      }
      const T = {
        client_id: s.client_id,
        redirect_uri: _,
        scope: l,
        response_type: "code",
        ...y
      };
      await es(w, o)(k.authorizationEndpoint, T);
    } catch (_) {
      throw n(m.loginAsync_error, _), _;
    }
  })();
}, cs = (e) => async (s = !1) => {
  try {
    e.publishEvent(m.loginCallbackAsync_begin, {});
    const n = e.configuration, t = n.client_id, o = s ? n.silent_redirect_uri : n.redirect_uri, i = n.authority, r = n.token_request_timeout, a = await e.initAsync(i, n.authority_configuration), l = e.location.getCurrentHref(), u = G(l).session_state, c = await I(n, e.configurationName);
    let _, y, g, p;
    if (c)
      await c.initAsync(a, "loginCallbackAsync", n), await c.setSessionStateAsync(u), y = await c.getNonceAsync(), g = c.getLoginParams(), p = await c.getStateAsync(), c.startKeepAliveServiceWorker(), _ = c;
    else {
      const b = O(e.configurationName, n.storage ?? sessionStorage);
      await b.setSessionStateAsync(u), y = await b.getNonceAsync(), g = b.getLoginParams(), p = await b.getStateAsync(), _ = b;
    }
    const k = G(l);
    if (k.error || k.error_description)
      throw new Error(`Error from OIDC server: ${k.error} - ${k.error_description}`);
    if (k.iss && k.iss !== a.issuer)
      throw console.error(), new Error(`Issuer not valid (expected: ${a.issuer}, received: ${k.iss})`);
    if (k.state && k.state !== p)
      throw new Error(`State not valid (expected: ${p}, received: ${k.state})`);
    const w = {
      code: k.code,
      grant_type: "authorization_code",
      client_id: n.client_id,
      redirect_uri: o
    }, T = {};
    if (n.token_request_extras)
      for (const [b, K] of Object.entries(n.token_request_extras))
        T[b] = K;
    if (g && g.extras)
      for (const [b, K] of Object.entries(g.extras))
        b.endsWith(":token_request") && (T[b.replace(":token_request", "")] = K);
    const S = a.tokenEndpoint, E = {};
    if (n.demonstrating_proof_of_possession)
      if (c)
        E.DPoP = `DPOP_SECURED_BY_OIDC_SERVICE_WORKER_${e.configurationName}`;
      else {
        const b = await qe(window)(n.demonstrating_proof_of_possession_configuration.generateKeyAlgorithm);
        await O(e.configurationName, n.storage).setDemonstratingProofOfPossessionJwkAsync(b), E.DPoP = await Ae(window)(n.demonstrating_proof_of_possession_configuration)(b, "POST", S);
      }
    const h = await ss(_)(
      S,
      { ...w, ...T },
      E,
      e.configuration.token_renew_mode,
      r
    );
    if (!h.success)
      throw new Error("Token request failed");
    let d;
    const A = h.data.tokens, v = h.data.demonstratingProofOfPossessionNonce;
    if (h.data.state !== T.state)
      throw new Error("state is not valid");
    const { isValid: W, reason: L } = ke(A, y.nonce, a);
    if (!W)
      throw new Error(`Tokens are not OpenID valid, reason: ${L}`);
    if (c) {
      if (A.refreshToken && !A.refreshToken.includes("SECURED_BY_OIDC_SERVICE_WORKER"))
        throw new Error("Refresh token should be hidden by service worker");
      if (v && A.accessToken && A.accessToken.includes("SECURED_BY_OIDC_SERVICE_WORKER"))
        throw new Error("Demonstration of proof of possession require Access token not hidden by service worker");
    }
    if (c)
      await c.initAsync(a, "syncTokensAsync", n), d = c.getLoginParams(), v && await c.setDemonstratingProofOfPossessionNonce(v);
    else {
      const b = O(e.configurationName, n.storage);
      d = b.getLoginParams(), v && await b.setDemonstratingProofOfPossessionNonce(v);
    }
    return await e.startCheckSessionAsync(a.checkSessionIframe, t, u, s), e.publishEvent(m.loginCallbackAsync_end, {}), {
      tokens: A,
      state: "request.state",
      callbackPath: d.callbackPath
    };
  } catch (n) {
    throw console.error(n), e.publishEvent(m.loginCallbackAsync_error, n), n;
  }
}, he = {
  access_token: "access_token",
  refresh_token: "refresh_token"
}, Q = (e, s) => {
  const n = {};
  if (e) {
    for (const [t, o] of Object.entries(e))
      if (t.endsWith(s)) {
        const i = t.replace(s, "");
        n[i] = o;
      }
    return n;
  }
  return n;
}, ls = (e) => {
  const s = {};
  if (e) {
    for (const [n, t] of Object.entries(e))
      n.includes(":") || (s[n] = t);
    return s;
  }
  return s;
}, us = (e) => async (s) => {
  M.clearTimeout(e.timeoutId), e.timeoutId = null, e.checkSessionIFrame && e.checkSessionIFrame.stop();
  const n = await I(e.configuration, e.configurationName);
  n ? await n.clearAsync(s) : await O(e.configurationName, e.configuration.storage).clearAsync(s), e.tokens = null, e.userInfo = null;
}, _s = (e, s, n, t, o) => async (i = void 0, r = null) => {
  const a = e.configuration, l = await e.initAsync(a.authority, a.authority_configuration);
  i && typeof i != "string" && (i = void 0, t.warn("callbackPathOrUrl path is not a string"));
  const f = i ?? o.getPath();
  let u = !1;
  i && (u = i.includes("https://") || i.includes("http://"));
  const c = u ? i : o.getOrigin() + f, _ = e.tokens ? e.tokens.idToken : "";
  try {
    const w = l.revocationEndpoint;
    if (w) {
      const T = [], S = e.tokens ? e.tokens.accessToken : null;
      if (S && a.logout_tokens_to_invalidate.includes(he.access_token)) {
        const h = Q(r, ":revoke_access_token"), d = fe(n)(
          w,
          S,
          ne.access_token,
          a.client_id,
          h
        );
        T.push(d);
      }
      const E = e.tokens ? e.tokens.refreshToken : null;
      if (E && a.logout_tokens_to_invalidate.includes(he.refresh_token)) {
        const h = Q(r, ":revoke_refresh_token"), d = fe(n)(
          w,
          E,
          ne.refresh_token,
          a.client_id,
          h
        );
        T.push(d);
      }
      T.length > 0 && await Promise.all(T);
    }
  } catch (w) {
    t.warn("logoutAsync: error when revoking tokens, if the error persist, you ay configure property logout_tokens_to_invalidate from configuration to avoid this error"), t.warn(w);
  }
  const y = e.tokens && e.tokens.idTokenPayload ? e.tokens.idTokenPayload.sub : null;
  await e.destroyAsync("LOGGED_OUT");
  for (const [w, T] of Object.entries(s))
    T !== e ? await e.logoutSameTabAsync(e.configuration.client_id, y) : e.publishEvent(m.logout_from_same_tab, {});
  const g = Q(r, ":oidc");
  if (g && g.no_reload === "true")
    return;
  const k = ls(r);
  if (l.endSessionEndpoint) {
    "id_token_hint" in k || (k.id_token_hint = _), !("post_logout_redirect_uri" in k) && i !== null && (k.post_logout_redirect_uri = c);
    let w = "";
    for (const [T, S] of Object.entries(k))
      S != null && (w === "" ? w += "?" : w += "&", w += `${T}=${encodeURIComponent(S)}`);
    o.open(`${l.endSessionEndpoint}${w}`);
  } else
    o.reload();
}, be = (e, s, n = !1) => async (...t) => {
  var y;
  const [o, i, ...r] = t, a = i ? { ...i } : { method: "GET" };
  let l = new Headers();
  a.headers && (l = a.headers instanceof Headers ? a.headers : new Headers(a.headers));
  const f = s, u = await ge(f), c = (y = u == null ? void 0 : u.tokens) == null ? void 0 : y.accessToken;
  if (l.has("Accept") || l.set("Accept", "application/json"), c) {
    if (f.configuration.demonstrating_proof_of_possession && n) {
      const g = await f.generateDemonstrationOfProofOfPossessionAsync(c, o.toString(), a.method);
      l.set("Authorization", `PoP ${c}`), l.set("DPoP", g);
    } else
      l.set("Authorization", `Bearer ${c}`);
    a.credentials || (a.credentials = "same-origin");
  }
  const _ = { ...a, headers: l };
  return await e(o, _, ...r);
}, fs = (e) => async (s = !1, n = !1) => {
  if (e.userInfo != null && !s)
    return e.userInfo;
  const t = e.configuration, i = (await e.initAsync(t.authority, t.authority_configuration)).userInfoEndpoint, a = await (async () => {
    const f = await be(fetch, e, n)(i);
    return f.status !== 200 ? null : f.json();
  })();
  return e.userInfo = a, a;
};
class Y {
  open(s) {
    window.location.href = s;
  }
  reload() {
    window.location.reload();
  }
  getCurrentHref() {
    return window.location.href;
  }
  getPath() {
    const s = window.location;
    return s.pathname + (s.search || "") + (s.hash || "");
  }
  getOrigin() {
    return window.origin;
  }
}
const ds = (e) => !!(e.os === "iOS" && e.osVersion.startsWith("12") || e.os === "Mac OS X" && e.osVersion.startsWith("10_15_6")), hs = (e) => {
  const s = e.appVersion, n = e.userAgent, t = "-";
  let o = t;
  const i = [
    { s: "Windows 10", r: /(Windows 10.0|Windows NT 10.0)/ },
    { s: "Windows 8.1", r: /(Windows 8.1|Windows NT 6.3)/ },
    { s: "Windows 8", r: /(Windows 8|Windows NT 6.2)/ },
    { s: "Windows 7", r: /(Windows 7|Windows NT 6.1)/ },
    { s: "Windows Vista", r: /Windows NT 6.0/ },
    { s: "Windows Server 2003", r: /Windows NT 5.2/ },
    { s: "Windows XP", r: /(Windows NT 5.1|Windows XP)/ },
    { s: "Windows 2000", r: /(Windows NT 5.0|Windows 2000)/ },
    { s: "Windows ME", r: /(Win 9x 4.90|Windows ME)/ },
    { s: "Windows 98", r: /(Windows 98|Win98)/ },
    { s: "Windows 95", r: /(Windows 95|Win95|Windows_95)/ },
    { s: "Windows NT 4.0", r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
    { s: "Windows CE", r: /Windows CE/ },
    { s: "Windows 3.11", r: /Win16/ },
    { s: "Android", r: /Android/ },
    { s: "Open BSD", r: /OpenBSD/ },
    { s: "Sun OS", r: /SunOS/ },
    { s: "Chrome OS", r: /CrOS/ },
    { s: "Linux", r: /(Linux|X11(?!.*CrOS))/ },
    { s: "iOS", r: /(iPhone|iPad|iPod)/ },
    { s: "Mac OS X", r: /Mac OS X/ },
    { s: "Mac OS", r: /(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
    { s: "QNX", r: /QNX/ },
    { s: "UNIX", r: /UNIX/ },
    { s: "BeOS", r: /BeOS/ },
    { s: "OS/2", r: /OS\/2/ },
    { s: "Search Bot", r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }
  ];
  for (const a in i) {
    const l = i[a];
    if (l.r.test(n)) {
      o = l.s;
      break;
    }
  }
  let r = t;
  switch (/Windows/.test(o) && (r = /Windows (.*)/.exec(o)[1], o = "Windows"), o) {
    case "Mac OS":
    case "Mac OS X":
    case "Android":
      r = /(?:Android|Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh) ([._\d]+)/.exec(n)[1];
      break;
    case "iOS": {
      const a = /OS (\d+)_(\d+)_?(\d+)?/.exec(s);
      a != null && a.length > 2 && (r = a[1] + "." + a[2] + "." + (parseInt(a[3]) | 0));
      break;
    }
  }
  return {
    os: o,
    osVersion: r
  };
};
function ys() {
  const e = navigator.userAgent;
  let s, n = e.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if (/trident/i.test(n[1]))
    return s = /\brv[ :]+(\d+)/g.exec(e) || [], { name: "ie", version: s[1] || "" };
  if (n[1] === "Chrome" && (s = e.match(/\bOPR|Edge\/(\d+)/), s != null)) {
    let t = s[1];
    if (!t) {
      const o = e.split(s[0] + "/");
      o.length > 1 && (t = o[1]);
    }
    return { name: "opera", version: t };
  }
  return n = n[2] ? [n[1], n[2]] : [navigator.appName, navigator.appVersion, "-?"], (s = e.match(/version\/(\d+)/i)) != null && n.splice(1, 1, s[1]), {
    name: n[0].toLowerCase(),
    version: n[1]
  };
}
const gs = () => {
  const { name: e, version: s } = ys();
  if (e === "chrome" && parseInt(s) <= 70 || e === "opera" && (!s || parseInt(s.split(".")[0]) < 80) || e === "ie")
    return !1;
  const n = hs(navigator);
  return !ds(n);
}, ks = async (e) => {
  let s;
  if (e.tokens != null)
    return !1;
  e.publishEvent(m.tryKeepExistingSessionAsync_begin, {});
  try {
    const n = e.configuration, t = await e.initAsync(n.authority, n.authority_configuration);
    if (s = await I(n, e.configurationName), s) {
      const { tokens: o } = await s.initAsync(t, "tryKeepExistingSessionAsync", n);
      if (o) {
        s.startKeepAliveServiceWorker(), e.tokens = o;
        const i = s.getLoginParams(e.configurationName);
        e.timeoutId = J(e, e.tokens.expiresAt, i.extras);
        const r = await s.getSessionStateAsync();
        return await e.startCheckSessionAsync(t.check_session_iframe, n.client_id, r), n.preload_user_info && await e.userInfoAsync(), e.publishEvent(m.tryKeepExistingSessionAsync_end, {
          success: !0,
          message: "tokens inside ServiceWorker are valid"
        }), !0;
      }
      e.publishEvent(m.tryKeepExistingSessionAsync_end, {
        success: !1,
        message: "no exiting session found"
      });
    } else {
      n.service_worker_relative_url && e.publishEvent(m.service_worker_not_supported_by_browser, {
        message: "service worker is not supported by this browser"
      });
      const o = O(e.configurationName, n.storage ?? sessionStorage), { tokens: i } = await o.initAsync();
      if (i) {
        e.tokens = X(i, null, n.token_renew_mode);
        const r = o.getLoginParams();
        e.timeoutId = J(e, e.tokens.expiresAt, r.extras);
        const a = await o.getSessionStateAsync();
        return await e.startCheckSessionAsync(t.check_session_iframe, n.client_id, a), n.preload_user_info && await e.userInfoAsync(), e.publishEvent(m.tryKeepExistingSessionAsync_end, {
          success: !0,
          message: "tokens inside storage are valid"
        }), !0;
      }
    }
    return e.publishEvent(m.tryKeepExistingSessionAsync_end, {
      success: !1,
      message: s ? "service worker sessions not retrieved" : "session storage sessions not retrieved"
    }), !1;
  } catch (n) {
    return console.error(n), s && await s.clearAsync(), e.publishEvent(m.tryKeepExistingSessionAsync_error, "tokens inside ServiceWorker are invalid"), !1;
  }
}, ms = () => fetch;
class te {
  constructor(s) {
    this.authorizationEndpoint = s.authorization_endpoint, this.tokenEndpoint = s.token_endpoint, this.revocationEndpoint = s.revocation_endpoint, this.userInfoEndpoint = s.userinfo_endpoint, this.checkSessionIframe = s.check_session_iframe, this.issuer = s.issuer, this.endSessionEndpoint = s.end_session_endpoint;
  }
}
const x = {}, ps = (e, s = new Y()) => (n, t = "default") => (x[t] || (x[t] = new C(n, t, e, s)), x[t]), ws = async (e) => {
  const { parsedTokens: s, callbackPath: n } = await e.loginCallbackAsync();
  return e.timeoutId = J(e, s.expiresAt), { callbackPath: n };
}, As = (e) => Math.floor(Math.random() * e), F = class F {
  constructor(s, n = "default", t, o = new Y()) {
    this.initPromise = null, this.tryKeepExistingSessionPromise = null, this.loginPromise = null, this.loginCallbackPromise = null, this.loginCallbackWithAutoTokensRenewPromise = null, this.userInfoPromise = null, this.renewTokensPromise = null, this.logoutPromise = null;
    let i = s.silent_login_uri;
    s.silent_redirect_uri && !s.silent_login_uri && (i = `${s.silent_redirect_uri.replace("-callback", "").replace("callback", "")}-login`);
    let r = s.refresh_time_before_tokens_expiration_in_second ?? 120;
    r > 60 && (r = r - Math.floor(Math.random() * 40)), this.location = o ?? new Y();
    const a = s.service_worker_update_require_callback ?? Le(this.location);
    this.configuration = {
      ...s,
      silent_login_uri: i,
      token_automatic_renew_mode: s.token_automatic_renew_mode ?? V.AutomaticBeforeTokenExpiration,
      monitor_session: s.monitor_session ?? !1,
      refresh_time_before_tokens_expiration_in_second: r,
      silent_login_timeout: s.silent_login_timeout ?? 12e3,
      token_renew_mode: s.token_renew_mode ?? Z.access_token_or_id_token_invalid,
      demonstrating_proof_of_possession: s.demonstrating_proof_of_possession ?? !1,
      authority_timeout_wellknowurl_in_millisecond: s.authority_timeout_wellknowurl_in_millisecond ?? 1e4,
      logout_tokens_to_invalidate: s.logout_tokens_to_invalidate ?? ["access_token", "refresh_token"],
      service_worker_update_require_callback: a,
      service_worker_activate: s.service_worker_activate ?? gs,
      demonstrating_proof_of_possession_configuration: s.demonstrating_proof_of_possession_configuration ?? Ke,
      preload_user_info: s.preload_user_info ?? !1
    }, this.getFetch = t ?? ms, this.configurationName = n, this.tokens = null, this.userInfo = null, this.events = [], this.timeoutId = null, this.loginCallbackWithAutoTokensRenewAsync.bind(this), this.initAsync.bind(this), this.loginCallbackAsync.bind(this), this.subscribeEvents.bind(this), this.removeEventSubscription.bind(this), this.publishEvent.bind(this), this.destroyAsync.bind(this), this.logoutAsync.bind(this), this.renewTokensAsync.bind(this), this.initAsync(this.configuration.authority, this.configuration.authority_configuration);
  }
  subscribeEvents(s) {
    const n = As(9999999999999).toString();
    return this.events.push({ id: n, func: s }), n;
  }
  removeEventSubscription(s) {
    const n = this.events.filter((t) => t.id !== s);
    this.events = n;
  }
  publishEvent(s, n) {
    this.events.forEach((t) => {
      t.func(s, n);
    });
  }
  static get(s = "default") {
    const n = typeof process > "u";
    if (!Object.prototype.hasOwnProperty.call(x, s) && n)
      throw Error(`OIDC library does seem initialized.
Please checkout that you are using OIDC hook inside a <OidcProvider configurationName="${s}"></OidcProvider> component.`);
    return x[s];
  }
  _silentLoginCallbackFromIFrame() {
    if (this.configuration.silent_redirect_uri && this.configuration.silent_login_uri) {
      const s = this.location, n = G(s.getCurrentHref());
      window.parent.postMessage(`${this.configurationName}_oidc_tokens:${JSON.stringify({ tokens: this.tokens, sessionState: n.session_state })}`, s.getOrigin());
    }
  }
  _silentLoginErrorCallbackFromIFrame(s = null) {
    if (this.configuration.silent_redirect_uri && this.configuration.silent_login_uri) {
      const n = this.location, t = G(n.getCurrentHref());
      t.error ? window.parent.postMessage(`${this.configurationName}_oidc_error:${JSON.stringify({ error: t.error })}`, n.getOrigin()) : window.parent.postMessage(`${this.configurationName}_oidc_exception:${JSON.stringify({ error: s == null ? "" : s.toString() })}`, n.getOrigin());
    }
  }
  async silentLoginCallbackAsync() {
    try {
      await this.loginCallbackAsync(!0), this._silentLoginCallbackFromIFrame();
    } catch (s) {
      console.error(s), this._silentLoginErrorCallbackFromIFrame(s);
    }
  }
  async initAsync(s, n) {
    if (this.initPromise !== null)
      return this.initPromise;
    const t = async () => {
      if (n != null)
        return new te({
          authorization_endpoint: n.authorization_endpoint,
          end_session_endpoint: n.end_session_endpoint,
          revocation_endpoint: n.revocation_endpoint,
          token_endpoint: n.token_endpoint,
          userinfo_endpoint: n.userinfo_endpoint,
          check_session_iframe: n.check_session_iframe,
          issuer: n.issuer
        });
      const i = await I(this.configuration, this.configurationName) ? window.localStorage : null;
      return await Qe(this.getFetch())(s, this.configuration.authority_time_cache_wellknowurl_in_second ?? 60 * 60, i, this.configuration.authority_timeout_wellknowurl_in_millisecond);
    };
    return this.initPromise = t(), this.initPromise.finally(() => {
      this.initPromise = null;
    });
  }
  async tryKeepExistingSessionAsync() {
    return this.tryKeepExistingSessionPromise !== null ? this.tryKeepExistingSessionPromise : (this.tryKeepExistingSessionPromise = ks(this), this.tryKeepExistingSessionPromise.finally(() => {
      this.tryKeepExistingSessionPromise = null;
    }));
  }
  async startCheckSessionAsync(s, n, t, o = !1) {
    await is(this, x, this.configuration)(s, n, t, o);
  }
  async loginAsync(s = void 0, n = null, t = !1, o = void 0, i = !1) {
    return this.logoutPromise && await this.logoutPromise, this.loginPromise !== null ? this.loginPromise : i ? os(window, this.configurationName, this.configuration, this.publishEvent.bind(this), this)(n, o) : (this.loginPromise = as(this.configurationName, this.configuration, this.publishEvent.bind(this), this.initAsync.bind(this), this.location)(s, n, t, o), this.loginPromise.finally(() => {
      this.loginPromise = null;
    }));
  }
  async loginCallbackAsync(s = !1) {
    if (this.loginCallbackPromise !== null)
      return this.loginCallbackPromise;
    const n = async () => {
      const t = await cs(this)(s), o = t.tokens;
      return this.tokens = o, await I(this.configuration, this.configurationName) || O(this.configurationName, this.configuration.storage).setTokens(o), this.publishEvent(F.eventNames.token_aquired, o), this.configuration.preload_user_info && await this.userInfoAsync(), { parsedTokens: o, state: t.state, callbackPath: t.callbackPath };
    };
    return this.loginCallbackPromise = n(), this.loginCallbackPromise.finally(() => {
      this.loginCallbackPromise = null;
    });
  }
  async generateDemonstrationOfProofOfPossessionAsync(s, n, t, o = {}) {
    const i = this.configuration, r = {
      ath: await ve(s),
      ...o
    }, a = await I(i, this.configurationName);
    let l;
    if (a)
      return `DPOP_SECURED_BY_OIDC_SERVICE_WORKER_${this.configurationName}`;
    const f = O(this.configurationName, i.storage);
    let u = await f.getDemonstratingProofOfPossessionJwkAsync();
    return l = await f.getDemonstratingProofOfPossessionNonce(), l && (r.nonce = l), await Ae(window)(i.demonstrating_proof_of_possession_configuration)(u, t, n, r);
  }
  loginCallbackWithAutoTokensRenewAsync() {
    return this.loginCallbackWithAutoTokensRenewPromise !== null ? this.loginCallbackWithAutoTokensRenewPromise : (this.loginCallbackWithAutoTokensRenewPromise = ws(this), this.loginCallbackWithAutoTokensRenewPromise.finally(() => {
      this.loginCallbackWithAutoTokensRenewPromise = null;
    }));
  }
  userInfoAsync(s = !1, n = !1) {
    return this.userInfoPromise !== null ? this.userInfoPromise : (this.userInfoPromise = fs(this)(s, n), this.userInfoPromise.finally(() => {
      this.userInfoPromise = null;
    }));
  }
  async renewTokensAsync(s = null) {
    if (this.renewTokensPromise !== null)
      return this.renewTokensPromise;
    if (this.timeoutId)
      return M.clearTimeout(this.timeoutId), this.renewTokensPromise = Te(this, !0, s), this.renewTokensPromise.finally(() => {
        this.renewTokensPromise = null;
      });
  }
  async destroyAsync(s) {
    return await us(this)(s);
  }
  async logoutSameTabAsync(s, n) {
    this.configuration.monitor_session && this.configuration.client_id === s && n && this.tokens && this.tokens.idTokenPayload && this.tokens.idTokenPayload.sub === n && (await this.destroyAsync("LOGGED_OUT"), this.publishEvent(m.logout_from_same_tab, { mmessage: "SessionMonitor", sub: n }));
  }
  async logoutOtherTabAsync(s, n) {
    this.configuration.monitor_session && this.configuration.client_id === s && n && this.tokens && this.tokens.idTokenPayload && this.tokens.idTokenPayload.sub === n && (await this.destroyAsync("LOGGED_OUT"), this.publishEvent(m.logout_from_another_tab, { message: "SessionMonitor", sub: n }));
  }
  async logoutAsync(s = void 0, n = null) {
    return this.logoutPromise ? this.logoutPromise : (this.logoutPromise = _s(this, x, this.getFetch(), console, this.location)(s, n), this.logoutPromise.finally(() => {
      this.logoutPromise = null;
    }));
  }
};
F.getOrCreate = (s, n) => (t, o = "default") => ps(s, n)(t, o), F.eventNames = m;
let C = F;
const $ = class $ {
  constructor(s) {
    this._oidc = s;
  }
  subscribeEvents(s) {
    return this._oidc.subscribeEvents(s);
  }
  removeEventSubscription(s) {
    this._oidc.removeEventSubscription(s);
  }
  publishEvent(s, n) {
    this._oidc.publishEvent(s, n);
  }
  static get(s = "default") {
    return new $(C.get(s));
  }
  tryKeepExistingSessionAsync() {
    return this._oidc.tryKeepExistingSessionAsync();
  }
  loginAsync(s = void 0, n = null, t = !1, o = void 0, i = !1) {
    return this._oidc.loginAsync(s, n, t, o, i);
  }
  logoutAsync(s = void 0, n = null) {
    return this._oidc.logoutAsync(s, n);
  }
  silentLoginCallbackAsync() {
    return this._oidc.silentLoginCallbackAsync();
  }
  renewTokensAsync(s = null) {
    return this._oidc.renewTokensAsync(s);
  }
  loginCallbackAsync() {
    return this._oidc.loginCallbackWithAutoTokensRenewAsync();
  }
  get tokens() {
    return this._oidc.tokens;
  }
  get configuration() {
    return this._oidc.configuration;
  }
  async generateDemonstrationOfProofOfPossessionAsync(s, n, t, o = {}) {
    return this._oidc.generateDemonstrationOfProofOfPossessionAsync(s, n, t, o);
  }
  async getValidTokenAsync(s = 200, n = 50) {
    return ge(this._oidc, s, n);
  }
  fetchWithTokens(s, n = !1) {
    return be(s, this, n);
  }
  async userInfoAsync(s = !1, n = !1) {
    return this._oidc.userInfoAsync(s, n);
  }
  userInfo() {
    return this._oidc.userInfo;
  }
};
$.getOrCreate = (s, n = new Y()) => (t, o = "default") => new $(C.getOrCreate(s, n)(t, o)), $.eventNames = C.eventNames;
let ye = $;
export {
  ye as OidcClient,
  Y as OidcLocation,
  V as TokenAutomaticRenewMode,
  Z as TokenRenewMode,
  ms as getFetchDefault,
  G as getParseQueryStringFromLocation,
  Ss as getPath
};
