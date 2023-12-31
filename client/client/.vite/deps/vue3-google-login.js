import {
  createCommentVNode,
  createElementBlock,
  defineComponent,
  normalizeClass,
  onMounted,
  openBlock,
  reactive,
  ref,
  renderSlot,
  unref,
  useSlots,
  watch
} from "./chunk-OWZKEKZD.js";
import "./chunk-RSJERJUL.js";

// node_modules/vue3-google-login/dist/index.esm.js
var u = Object.freeze({ __proto__: null });
var g = { library: "https://accounts.google.com/gsi/client", defaultButtonConfig: { theme: "outline", size: "large" }, scopes: "email profile openid" };
var f = reactive({ clientId: null, popupType: "CODE", prompt: false, autoLogin: false, idConfiguration: null, buttonConfig: g.defaultButtonConfig, callback: () => {
}, error: null });
var b = reactive({ apiLoaded: false, apiLoadIntitited: false });
var w = (e) => {
  try {
    const t = e.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"), i = decodeURIComponent(atob(t).split("").map(function(e2) {
      return "%" + ("00" + e2.charCodeAt(0).toString(16)).slice(-2);
    }).join(""));
    return JSON.parse(i);
  } catch (e2) {
    throw "JWT provided is invalid";
  }
};
var m = new Promise((e) => {
  const t = "undefined" != typeof window;
  if (!b.apiLoadIntitited && t) {
    const t2 = document.createElement("script");
    b.apiLoadIntitited = true, t2.addEventListener("load", () => {
      b.apiLoaded = true, e(window.google);
    }), t2.src = g.library, t2.async = true, t2.defer = true, document.head.appendChild(t2);
  }
});
var y = (e) => {
  b.apiLoadIntitited ? b.apiLoaded ? e(window.google) : watch(() => b.apiLoaded, (t) => {
    t && e(window.google);
  }) : m.then((t) => {
    e(t);
  });
};
var I = (e, t, i, o) => {
  if (!e.client_id)
    throw new Error("Prop client id required since plugin is not initialized with a client id");
  y(() => {
    ((e2, t2, i2, o2, n) => {
      if (n) {
        const t3 = e2.callback;
        e2.callback = (e3) => {
          e3.credential ? t3 && t3(e3) : n(e3);
        };
      }
      window.google.accounts.id.initialize(e2);
      const a = t2.value;
      a && !o2 && window.google.accounts.id.renderButton(a, i2);
    })(e, t, i.buttonConfig, o, i.error), i.prompt && _({ clientId: i.clientId, callback: i.callback, error: i.error, autoLogin: i.autoLogin });
  });
};
var h = (e) => new Promise((t, i) => {
  y((o) => {
    if (!(e && e.clientId || f.clientId))
      throw new Error("clientId is required since the plugin is not initialized with a Client Id");
    o.accounts.oauth2.initCodeClient({ client_id: e && e.clientId || f.clientId || "", scope: g.scopes, ux_mode: "popup", callback: (e2) => {
      e2.code ? t(e2) : i(e2);
    }, error_callback: (e2) => {
      i(e2);
    } }).requestCode();
  });
});
var k = (e) => new Promise((t, i) => {
  y((o) => {
    if (!(e && e.clientId || f.clientId))
      throw new Error("clientId is required since the plugin is not initialized with a Client Id");
    o.accounts.oauth2.initTokenClient({ client_id: e && e.clientId || f.clientId || "", scope: g.scopes, callback: (e2) => {
      e2.access_token ? t(e2) : i(e2);
    }, error_callback: (e2) => {
      i(e2);
    } }).requestAccessToken();
  });
});
var _ = (e) => {
  if (!e && (e = {}), !e.clientId && !f.clientId)
    throw new Error("clientId is required");
  const t = {};
  return e.clientId && (t.client_id = e.clientId), !e.clientId && f.clientId && (t.client_id = f.clientId), e.context && (t.context = e.context), null != e.autoLogin && (t.auto_select = e.autoLogin), null != e.cancelOnTapOutside && (t.cancel_on_tap_outside = e.cancelOnTapOutside), new Promise((i, o) => {
    t.callback = (t2) => {
      e && e.callback && e.callback(t2), t2.credential ? i(t2) : o(t2);
    }, y((i2) => {
      i2.accounts.id.initialize(t), i2.accounts.id.prompt((t2) => {
        e && e.onNotification && e.onNotification(t2), ((e2) => {
          const t3 = e2.notification;
          let i3 = "";
          t3.isNotDisplayed() && (i3 = "suppressed_by_user" === t3.getNotDisplayedReason() ? "Prompt was suppressed by user'. Refer https://developers.google.com/identity/gsi/web/guides/features#exponential_cooldown for more info" : `Prompt was not displayed, reason for not displaying: ${t3.getNotDisplayedReason()}`), t3.isSkippedMoment() && (i3 = `Prompt was skipped, reason for skipping: ${t3.getSkippedReason()}`), i3.length && (e2.error ? e2.error(i3) : e2.reject(i3));
        })({ notification: t2, reject: o, error: e && e.error });
      });
    });
  });
};
var C = () => {
  y((e) => {
    e.accounts.id.disableAutoSelect();
  });
};
var L = defineComponent({ __name: "GoogleLogin", props: { clientId: { type: String, required: false }, prompt: { type: Boolean, required: false, default: false }, autoLogin: { type: Boolean, required: false, default: false }, popupType: { type: String, required: false }, idConfiguration: { type: Object, required: false }, buttonConfig: { type: Object, required: false }, callback: { type: Function, required: false }, error: { type: Function, required: false } }, setup(e) {
  const t = e, i = !!useSlots().default, u2 = ((e2, t2) => {
    const i2 = { ...e2 };
    for (const e3 in t2)
      void 0 !== t2[e3] && null !== t2[e3] && (i2[e3] = t2[e3]);
    return i2;
  })(f, t), g2 = { client_id: u2.clientId || null, auto_select: u2.autoLogin || false, callback: u2.callback, ...u2.idConfiguration }, w2 = ref();
  return onMounted(() => {
    I(g2, w2, u2, i), t.popupType && !i && console.warn("Option 'popupType' is ignored since a slot which act as a custom login button was not found!!!");
  }), (e2, t2) => (openBlock(), createElementBlock("div", { class: normalizeClass(["g-btn-wrapper", [!unref(b).apiLoaded && "api-loading"]]), onClick: t2[0] || (t2[0] = (e3) => unref(i) && void ("TOKEN" === unref(u2).popupType ? k({ clientId: u2.clientId }).then((e4) => {
    u2.callback && u2.callback(e4);
  }).catch((e4) => {
    u2.error && u2.error(e4);
  }) : h({ clientId: u2.clientId }).then((e4) => {
    u2.callback && u2.callback(e4);
  }).catch((e4) => {
    u2.error && u2.error(e4);
  }))) }, [unref(i) ? createCommentVNode("v-if", true) : (openBlock(), createElementBlock("span", { key: 0, ref_key: "buttonRef", ref: w2, class: "g-btn" }, null, 512)), renderSlot(e2.$slots, "default")], 2));
} });
!function(e, t) {
  void 0 === t && (t = {});
  var i = t.insertAt;
  if (e && "undefined" != typeof document) {
    var o = document.head || document.getElementsByTagName("head")[0], n = document.createElement("style");
    n.type = "text/css", "top" === i && o.firstChild ? o.insertBefore(n, o.firstChild) : o.appendChild(n), n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e));
  }
}("\n.g-btn-wrapper[data-v-5e610566] {\n  display: inline-block;\n}\n.g-btn-wrapper.api-loading[data-v-5e610566] {\n  opacity: 0.5;\n  pointer-events: none;\n}\n"), L.__scopeId = "data-v-5e610566", L.__file = "src/plugin/GoogleLogin.vue";
var v = { install: (e, t) => {
  t && ((e2) => {
    e2.clientId && (f.clientId = e2.clientId), e2.popupType && (f.popupType = e2.popupType), null != e2.prompt && (f.prompt = e2.prompt), null != e2.autoLogin && (f.autoLogin = e2.autoLogin), e2.idConfiguration && (f.idConfiguration = e2.idConfiguration), e2.buttonConfig && (f.buttonConfig = e2.buttonConfig), e2.callback && (f.callback = e2.callback);
  })(t), m.then(() => {
    if (t.clientId) {
      const e2 = { client_id: t.clientId, auto_select: true === t.autoLogin, callback: t.callback, ...t.idConfiguration };
      window.google.accounts.id.initialize(e2), t.prompt && window.google.accounts.id.prompt();
    }
  }), e.component("GoogleLogin", L);
} };
export {
  u as CallbackTypes,
  L as GoogleLogin,
  w as decodeCredential,
  v as default,
  h as googleAuthCodeLogin,
  C as googleLogout,
  _ as googleOneTap,
  y as googleSdkLoaded,
  k as googleTokenLogin
};
//# sourceMappingURL=vue3-google-login.js.map
