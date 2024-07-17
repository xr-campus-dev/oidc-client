import { jsx as i, jsxs as E, Fragment as b } from "react/jsx-runtime";
import { OidcClient as r, getParseQueryStringFromLocation as V, getPath as O, OidcLocation as M, getFetchDefault as X } from "@axa-fr/oidc-client";
import { OidcClient as Me, OidcLocation as De, TokenAutomaticRenewMode as xe, TokenRenewMode as We } from "@axa-fr/oidc-client";
import Z, { useCallback as ee, useState as f, useEffect as v } from "react";
const x = "default", te = (t, s, e = !1) => async (...n) => await s().fetchWithTokens(t, e)(...n), Oe = (t = null, s = x, e = !1) => (n) => (o) => {
  const { fetch: c } = ne(t || o.fetch, s, e);
  return /* @__PURE__ */ i(n, { ...o, fetch: c });
}, ne = (t = null, s = x, e = !1) => {
  const n = t || window.fetch, o = r.get;
  return { fetch: ee(
    (l, a) => te(n, () => o(s), e)(l, a),
    [n, s]
  ) };
}, W = () => /* @__PURE__ */ i("div", { className: "oidc-authenticating", children: /* @__PURE__ */ E("div", { className: "oidc-authenticating__container", children: [
  /* @__PURE__ */ i("h1", { className: "oidc-authenticating__title", children: "Error authentication" }),
  /* @__PURE__ */ i("p", { className: "oidc-authenticating__content", children: "An error occurred during authentication." })
] }) }), se = () => /* @__PURE__ */ i("div", { className: "oidc-authenticating", children: /* @__PURE__ */ E("div", { className: "oidc-authenticating__container", children: [
  /* @__PURE__ */ i("h1", { className: "oidc-authenticating__title", children: "Authentication in progress" }),
  /* @__PURE__ */ i("p", { className: "oidc-authenticating__content", children: "You will be redirected to the login page." })
] }) }), oe = () => Math.random().toString(36).substr(2, 6), ce = (t, s) => (e, n) => {
  if (typeof t.CustomEvent == "function")
    return new t.CustomEvent(e, n);
  const o = n || { bubbles: !1, cancelable: !1, detail: void 0 }, c = s.createEvent("CustomEvent");
  return c.initCustomEvent(e, o.bubbles, o.cancelable, o.detail), c.prototype = t.Event.prototype, c;
}, re = (t, s, e) => ({
  replaceState: (n, o) => {
    const c = e(), l = o || t.history.state;
    t.history.replaceState({ key: c, state: l }, null, n), t.dispatchEvent(s("popstate"));
  }
}), ie = () => re(window, ce(window, document), oe), R = () => /* @__PURE__ */ i("div", { className: "oidc-callback", children: /* @__PURE__ */ E("div", { className: "oidc-callback__container", children: [
  /* @__PURE__ */ i("h1", { className: "oidc-callback__title", children: "Authentication complete" }),
  /* @__PURE__ */ i("p", { className: "oidc-callback__content", children: "You will be redirected to your application." })
] }) }), ae = ({ callBackError: t, callBackSuccess: s, configurationName: e, withCustomHistory: n }) => {
  const [o, c] = f(!1);
  v(() => {
    let d = !0;
    return (async () => {
      const _ = r.get;
      try {
        const { callbackPath: h } = await _(e).loginCallbackAsync();
        (n ? n() : ie()).replaceState(h || "/");
      } catch (h) {
        d && (console.warn(h), c(!0));
      }
    })(), () => {
      d = !1;
    };
  }, []);
  const l = t || W, a = s || R;
  return o ? /* @__PURE__ */ i(l, { configurationName: e }) : /* @__PURE__ */ i(a, { configurationName: e });
}, le = () => /* @__PURE__ */ i("span", { className: "oidc-loading", children: "Loading" }), de = () => /* @__PURE__ */ i("div", { className: "oidc-serviceworker", children: /* @__PURE__ */ E("div", { className: "oidc-serviceworker__container", children: [
  /* @__PURE__ */ i("h1", { className: "oidc-serviceworker__title", children: "Unable to authenticate on this browser" }),
  /* @__PURE__ */ i("p", { className: "oidc-serviceworker__content", children: "Your browser is not secure enough to make authentication work. Try updating your browser or use a newer browser." })
] }) }), ue = () => /* @__PURE__ */ i("div", { className: "oidc-session-lost", children: /* @__PURE__ */ E("div", { className: "oidc-session-lost__container", children: [
  /* @__PURE__ */ i("h1", { className: "oidc-session-lost__title", children: "Session timed out" }),
  /* @__PURE__ */ i("p", { className: "oidc-session-lost__content", children: "Your session has expired. Please re-authenticate." })
] }) }), ke = ({ configurationName: t }) => (v(() => {
  (async () => {
    const e = r.get;
    e(t).silentLoginCallbackAsync();
  })();
}, []), /* @__PURE__ */ i(b, {})), he = ({ configurationName: t }) => {
  const s = V(window.location.href), e = r.get, n = e(t);
  let o = null;
  for (const [c, l] of Object.entries(s))
    c === "state" || c === "scope" || (o === null && (o = {}), o[c] = l);
  return v(() => {
    n.tokens || n.loginAsync(null, o, !0, s.scope);
  }, []), /* @__PURE__ */ i(b, {});
}, _e = ({
  callbackErrorComponent: t,
  callbackSuccessComponent: s,
  redirect_uri: e,
  silent_redirect_uri: n,
  silent_login_uri: o,
  children: c,
  configurationName: l,
  withCustomHistory: a = null,
  location: d
}) => {
  const u = window ? O(window.location.href) : "", [_, h] = f(u);
  v(() => {
    const g = () => h(O(window.location.href));
    return g(), window.addEventListener("popstate", g, !1), () => window.removeEventListener("popstate", g, !1);
  }, []);
  const p = O(e);
  if (n && _ === O(n))
    return /* @__PURE__ */ i(ke, { configurationName: l });
  if (o && _ === O(o))
    return /* @__PURE__ */ i(he, { configurationName: l });
  switch (_) {
    case p:
      return /* @__PURE__ */ i(ae, { callBackError: t, callBackSuccess: s, configurationName: l, withCustomHistory: a });
    default:
      return /* @__PURE__ */ i(b, { children: c });
  }
}, fe = Z.memo(_e), D = { name: "", data: null }, ve = ({ loadingComponent: t, children: s, configurationName: e }) => {
  const [n, o] = f(!0), c = r.get, l = c(e);
  return v(() => {
    let d = !0;
    return l && l.tryKeepExistingSessionAsync().then(() => {
      d && o(!1);
    }), () => {
      d = !1;
    };
  }, [e]), /* @__PURE__ */ i(b, { children: n ? /* @__PURE__ */ i(t, { configurationName: e }) : /* @__PURE__ */ i(b, { children: s }) });
}, P = ({ isLoading: t, loadingComponent: s, children: e, configurationName: n }) => {
  const o = s;
  return t ? /* @__PURE__ */ i(o, { configurationName: n, children: e }) : /* @__PURE__ */ i(b, { children: e });
}, Pe = ({
  children: t,
  configuration: s,
  configurationName: e = "default",
  callbackSuccessComponent: n = R,
  authenticatingComponent: o = se,
  loadingComponent: c = le,
  serviceWorkerNotSupportedComponent: l = de,
  authenticatingErrorComponent: a = W,
  sessionLostComponent: d = ue,
  onSessionLost: u = null,
  onLogoutFromAnotherTab: _ = null,
  onLogoutFromSameTab: h = null,
  withCustomHistory: p = null,
  onEvent: g = null,
  getFetch: y = null,
  location: S = null
}) => {
  const w = (L = "default") => r.getOrCreate(y ?? X, S ?? new M())(s, L), [j, B] = f(!0), [z, C] = f(D), [K, $] = f("default");
  v(() => {
    const I = w(e).subscribeEvents((k, T) => {
      g && g(e, k, T);
    });
    return () => {
      w(e).removeEventSubscription(I);
    };
  }, [e, g]), v(() => {
    const I = w(e).subscribeEvents((k, T) => {
      if (k === r.eventNames.refreshTokensAsync_error || k === r.eventNames.syncTokensAsync_error) {
        if (u != null) {
          u();
          return;
        }
        C({ name: k, data: T });
      } else if (k === r.eventNames.logout_from_another_tab) {
        if (_ != null) {
          _();
          return;
        }
        C({ name: k, data: T });
      } else
        k === r.eventNames.logout_from_same_tab ? h != null && h() : k === r.eventNames.loginAsync_begin || k === r.eventNames.loginCallbackAsync_end || k === r.eventNames.loginAsync_error || k === r.eventNames.loginCallbackAsync_error ? C({ name: k, data: T }) : k === r.eventNames.service_worker_not_supported_by_browser && s.service_worker_only === !0 && C({ name: k, data: T });
    });
    return $(e), B(!1), () => {
      w(e).removeEventSubscription(I), C(D);
    };
  }, [s, e]);
  const G = d, H = o, m = c, Q = l, J = a, A = j || K !== e, N = w(e);
  switch (z.name) {
    case r.eventNames.service_worker_not_supported_by_browser:
      return /* @__PURE__ */ i(P, { loadingComponent: m, isLoading: A, configurationName: e, children: /* @__PURE__ */ i(Q, { configurationName: e }) });
    case r.eventNames.loginAsync_begin:
      return /* @__PURE__ */ i(P, { loadingComponent: m, isLoading: A, configurationName: e, children: /* @__PURE__ */ i(H, { configurationName: e }) });
    case r.eventNames.loginAsync_error:
    case r.eventNames.loginCallbackAsync_error:
      return /* @__PURE__ */ i(P, { loadingComponent: m, isLoading: A, configurationName: e, children: /* @__PURE__ */ i(J, { configurationName: e }) });
    case r.eventNames.refreshTokensAsync_error:
    case r.eventNames.syncTokensAsync_error:
    case r.eventNames.logout_from_another_tab:
      return /* @__PURE__ */ i(P, { loadingComponent: m, isLoading: A, configurationName: e, children: /* @__PURE__ */ i(G, { configurationName: e }) });
    default:
      return /* @__PURE__ */ i(P, { loadingComponent: m, isLoading: A, configurationName: e, children: /* @__PURE__ */ i(
        fe,
        {
          redirect_uri: N.configuration.redirect_uri,
          silent_redirect_uri: N.configuration.silent_redirect_uri,
          silent_login_uri: N.configuration.silent_login_uri,
          callbackSuccessComponent: n,
          callbackErrorComponent: a,
          authenticatingComponent: o,
          configurationName: e,
          withCustomHistory: p,
          location: S ?? new M(),
          children: /* @__PURE__ */ i(ve, { loadingComponent: m, configurationName: e, children: t })
        }
      ) });
  }
}, ge = ({ children: t, callbackPath: s = null, extras: e = null, configurationName: n = "default" }) => {
  const o = r.get, c = o(n);
  return v(() => {
    c.tokens || c.loginAsync(s, e);
  }, [n, s, e]), c.tokens ? /* @__PURE__ */ i(b, { children: t }) : null;
}, Ee = (t, s = null, e = null, n = "default") => (o) => /* @__PURE__ */ i(ge, { callbackPath: s, extras: e, configurationName: n, children: /* @__PURE__ */ i(t, { ...o }) }), F = "default", U = (t, s) => {
  let e = !1;
  return t(s) && (e = t(s).tokens != null), e;
}, Se = (t = F) => {
  const s = r.get, [e, n] = f(U(s, t));
  return v(() => {
    let a = !0;
    const d = s(t);
    n(U(s, t));
    const u = d.subscribeEvents((_, h) => {
      (_ === r.eventNames.logout_from_another_tab || _ === r.eventNames.logout_from_same_tab || _ === r.eventNames.token_aquired) && a && n(U(s, t));
    });
    return () => {
      a = !1, d.removeEventSubscription(u);
    };
  }, [t]), { login: (a = void 0, d = null, u = !1) => s(t).loginAsync(a, d, !1, void 0, u), logout: (a = void 0, d = null) => s(t).logoutAsync(a, d), renewTokens: async (a = null) => {
    const d = await s(t).renewTokensAsync(a);
    return {
      // @ts-ignore
      accessToken: d.accessToken,
      // @ts-ignore
      accessTokenPayload: d.accessTokenPayload,
      // @ts-ignore
      idToken: d.idToken,
      // @ts-ignore
      idTokenPayload: d.idTokenPayload
    };
  }, isAuthenticated: e };
}, q = { accessToken: null, accessTokenPayload: null }, pe = (t) => {
  const s = r.get, e = s(t);
  if (e.tokens) {
    const n = e.tokens;
    return {
      accessToken: n.accessToken,
      accessTokenPayload: n.accessTokenPayload,
      generateDemonstrationOfProofOfPossessionAsync: e.configuration.demonstrating_proof_of_possession ? (o, c) => e.generateDemonstrationOfProofOfPossessionAsync(n.accessToken, o, c) : null
    };
  }
  return q;
};
function ye(t, s) {
  return t.configuration.demonstrating_proof_of_possession ? (e, n, o = {}) => t.generateDemonstrationOfProofOfPossessionAsync(s.accessToken, e, n, o) : null;
}
const Ne = (t = F) => {
  const s = r.get, [e, n] = f(pe(t));
  return v(() => {
    let o = !0;
    const c = s(t);
    if (c.tokens) {
      const a = c.tokens;
      n({ accessToken: a.accessToken, accessTokenPayload: a.accessTokenPayload });
    }
    const l = c.subscribeEvents((a, d) => {
      if ((a === r.eventNames.token_renewed || a === r.eventNames.token_aquired || a === r.eventNames.logout_from_another_tab || a === r.eventNames.logout_from_same_tab || a === r.eventNames.refreshTokensAsync_error || a === r.eventNames.syncTokensAsync_error) && o) {
        const u = c.tokens;
        n(u != null ? {
          accessToken: u.accessToken,
          accessTokenPayload: u.accessTokenPayload,
          generateDemonstrationOfProofOfPossessionAsync: ye(c, u)
        } : q);
      }
    });
    return () => {
      o = !1, c.removeEventSubscription(l);
    };
  }, [t]), e;
}, Y = { idToken: null, idTokenPayload: null }, be = (t) => {
  const s = r.get, e = s(t);
  if (e.tokens) {
    const n = e.tokens;
    return { idToken: n.idToken, idTokenPayload: n.idTokenPayload };
  }
  return Y;
}, Le = (t = F) => {
  const s = r.get, [e, n] = f(be(t));
  return v(() => {
    let o = !0;
    const c = s(t);
    if (c.tokens) {
      const a = c.tokens;
      n({ idToken: a.idToken, idTokenPayload: a.idTokenPayload });
    }
    const l = c.subscribeEvents((a, d) => {
      if ((a === r.eventNames.token_renewed || a === r.eventNames.token_aquired || a === r.eventNames.logout_from_another_tab || a === r.eventNames.logout_from_same_tab || a === r.eventNames.refreshTokensAsync_error || a === r.eventNames.syncTokensAsync_error) && o) {
        const u = c.tokens;
        n(u != null ? { idToken: u.idToken, idTokenPayload: u.idTokenPayload } : Y);
      }
    });
    return () => {
      o = !1, c.removeEventSubscription(l);
    };
  }, [t]), e;
};
var me = /* @__PURE__ */ ((t) => (t.Unauthenticated = "Unauthenticated", t.Loading = "Loading user", t.Loaded = "User loaded", t.LoadingError = "Error loading user", t))(me || {});
const Ie = (t = "default", s = !1) => {
  const n = r.get(t).userInfo(), [o, c] = f({
    user: n,
    status: n ? "User loaded" : "Unauthenticated"
    /* Unauthenticated */
  }), [l, a] = f(n ? 1 : 0), [d, u] = f(n ? 1 : 0);
  v(() => {
    const h = r.get(t);
    let p = !0;
    if (h && h.tokens) {
      const y = l === d;
      if (y && h.userInfo())
        return;
      c({
        ...o,
        status: "Loading user"
        /* Loading */
      }), h.userInfoAsync(!y, s).then((S) => {
        p && c({
          user: S,
          status: "User loaded"
          /* Loaded */
        });
      }).catch(() => c({
        ...o,
        status: "Error loading user"
        /* LoadingError */
      })), u(l);
    } else
      c({
        user: null,
        status: "Unauthenticated"
        /* Unauthenticated */
      });
    const g = h.subscribeEvents((y) => {
      (y === r.eventNames.logout_from_another_tab || y === r.eventNames.logout_from_same_tab) && p && c({
        user: null,
        status: "Unauthenticated"
        /* Unauthenticated */
      });
    });
    return () => {
      p = !1, h.removeEventSubscription(g);
    };
  }, [l]);
  const _ = () => {
    a(l + 1);
  };
  return { oidcUser: o.user, oidcUserLoadingState: o.status, reloadOidcUser: _ };
};
export {
  Me as OidcClient,
  De as OidcLocation,
  Pe as OidcProvider,
  ge as OidcSecure,
  me as OidcUserStatus,
  xe as TokenAutomaticRenewMode,
  We as TokenRenewMode,
  Se as useOidc,
  Ne as useOidcAccessToken,
  ne as useOidcFetch,
  Le as useOidcIdToken,
  Ie as useOidcUser,
  Oe as withOidcFetch,
  Ee as withOidcSecure
};
