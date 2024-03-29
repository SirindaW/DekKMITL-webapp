(function (e, t) {
  if (typeof define === "function" && define.amd) {
    define([], t);
  } else {
    e.htmx = t();
  }
})(typeof self !== "undefined" ? self : this, function () {
  return (function () {
    "use strict";
    var U = {
      onLoad: t,
      process: ct,
      on: M,
      off: D,
      trigger: $,
      ajax: er,
      find: C,
      findAll: R,
      closest: H,
      values: function (e, t) {
        var r = Mt(e, t || "post");
        return r.values;
      },
      remove: O,
      addClass: L,
      removeClass: q,
      toggleClass: A,
      takeClass: T,
      defineExtension: or,
      removeExtension: ar,
      logAll: E,
      logger: null,
      config: {
        historyEnabled: true,
        historyCacheSize: 10,
        refreshOnHistoryMiss: false,
        defaultSwapStyle: "innerHTML",
        defaultSwapDelay: 0,
        defaultSettleDelay: 20,
        includeIndicatorStyles: true,
        indicatorClass: "htmx-indicator",
        requestClass: "htmx-request",
        addedClass: "htmx-added",
        settlingClass: "htmx-settling",
        swappingClass: "htmx-swapping",
        allowEval: true,
        inlineScriptNonce: "",
        attributesToSettle: ["class", "style", "width", "height"],
        withCredentials: false,
        timeout: 0,
        wsReconnectDelay: "full-jitter",
        disableSelector: "[hx-disable], [data-hx-disable]",
        useTemplateFragments: false,
        scrollBehavior: "smooth",
        defaultFocusScroll: false,
      },
      parseInterval: v,
      _: e,
      createEventSource: function (e) {
        return new EventSource(e, { withCredentials: true });
      },
      createWebSocket: function (e) {
        return new WebSocket(e, []);
      },
      version: "1.7.0",
    };
    var r = {
      bodyContains: Y,
      filterValues: jt,
      hasAttribute: s,
      getAttributeValue: V,
      getClosestMatch: h,
      getExpressionVars: Gt,
      getHeaders: Xt,
      getInputValues: Mt,
      getInternalData: _,
      getSwapSpecification: Ut,
      getTriggerSpecs: ke,
      getTarget: ne,
      makeFragment: g,
      mergeObjects: Q,
      makeSettleInfo: zt,
      oobSwap: B,
      selectAndSwap: we,
      settleImmediately: Ct,
      shouldCancel: Pe,
      triggerEvent: $,
      triggerErrorEvent: J,
      withExtensions: gt,
    };
    var n = ["get", "post", "put", "delete", "patch"];
    var i = n
      .map(function (e) {
        return "[hx-" + e + "], [data-hx-" + e + "]";
      })
      .join(", ");
    function v(e) {
      if (e == undefined) {
        return undefined;
      }
      if (e.slice(-2) == "ms") {
        return parseFloat(e.slice(0, -2)) || undefined;
      }
      if (e.slice(-1) == "s") {
        return parseFloat(e.slice(0, -1)) * 1e3 || undefined;
      }
      return parseFloat(e) || undefined;
    }
    function f(e, t) {
      return e.getAttribute && e.getAttribute(t);
    }
    function s(e, t) {
      return (
        e.hasAttribute && (e.hasAttribute(t) || e.hasAttribute("data-" + t))
      );
    }
    function V(e, t) {
      return f(e, t) || f(e, "data-" + t);
    }
    function u(e) {
      return e.parentElement;
    }
    function z() {
      return document;
    }
    function h(e, t) {
      if (t(e)) {
        return e;
      } else if (u(e)) {
        return h(u(e), t);
      } else {
        return null;
      }
    }
    function o(e, t, r) {
      var n = V(t, r);
      var i = V(t, "hx-disinherit");
      if (e !== t && i && (i === "*" || i.split(" ").indexOf(r) >= 0)) {
        return "unset";
      } else {
        return n;
      }
    }
    function G(t, r) {
      var n = null;
      h(t, function (e) {
        return (n = o(t, e, r));
      });
      if (n !== "unset") {
        return n;
      }
    }
    function d(e, t) {
      var r =
        e.matches ||
        e.matchesSelector ||
        e.msMatchesSelector ||
        e.mozMatchesSelector ||
        e.webkitMatchesSelector ||
        e.oMatchesSelector;
      return r && r.call(e, t);
    }
    function a(e) {
      var t = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
      var r = t.exec(e);
      if (r) {
        return r[1].toLowerCase();
      } else {
        return "";
      }
    }
    function l(e, t) {
      var r = new DOMParser();
      var n = r.parseFromString(e, "text/html");
      var i = n.body;
      while (t > 0) {
        t--;
        i = i.firstChild;
      }
      if (i == null) {
        i = z().createDocumentFragment();
      }
      return i;
    }
    function g(e) {
      if (U.config.useTemplateFragments) {
        var t = l("<body><template>" + e + "</template></body>", 0);
        return t.querySelector("template").content;
      } else {
        var r = a(e);
        switch (r) {
          case "thead":
          case "tbody":
          case "tfoot":
          case "colgroup":
          case "caption":
            return l("<table>" + e + "</table>", 1);
          case "col":
            return l("<table><colgroup>" + e + "</colgroup></table>", 2);
          case "tr":
            return l("<table><tbody>" + e + "</tbody></table>", 2);
          case "td":
          case "th":
            return l("<table><tbody><tr>" + e + "</tr></tbody></table>", 3);
          case "script":
            return l("<div>" + e + "</div>", 1);
          default:
            return l(e, 0);
        }
      }
    }
    function K(e) {
      if (e) {
        e();
      }
    }
    function p(e, t) {
      return Object.prototype.toString.call(e) === "[object " + t + "]";
    }
    function m(e) {
      return p(e, "Function");
    }
    function x(e) {
      return p(e, "Object");
    }
    function _(e) {
      var t = "htmx-internal-data";
      var r = e[t];
      if (!r) {
        r = e[t] = {};
      }
      return r;
    }
    function y(e) {
      var t = [];
      if (e) {
        for (var r = 0; r < e.length; r++) {
          t.push(e[r]);
        }
      }
      return t;
    }
    function W(e, t) {
      if (e) {
        for (var r = 0; r < e.length; r++) {
          t(e[r]);
        }
      }
    }
    function b(e) {
      var t = e.getBoundingClientRect();
      var r = t.top;
      var n = t.bottom;
      return r < window.innerHeight && n >= 0;
    }
    function Y(e) {
      if (e.getRootNode() instanceof ShadowRoot) {
        return z().body.contains(e.getRootNode().host);
      } else {
        return z().body.contains(e);
      }
    }
    function w(e) {
      return e.trim().split(/\s+/);
    }
    function Q(e, t) {
      for (var r in t) {
        if (t.hasOwnProperty(r)) {
          e[r] = t[r];
        }
      }
      return e;
    }
    function S(e) {
      try {
        return JSON.parse(e);
      } catch (e) {
        pt(e);
        return null;
      }
    }
    function e(e) {
      return Jt(z().body, function () {
        return eval(e);
      });
    }
    function t(t) {
      var e = U.on("htmx:load", function (e) {
        t(e.detail.elt);
      });
      return e;
    }
    function E() {
      U.logger = function (e, t, r) {
        if (console) {
          console.log(t, e, r);
        }
      };
    }
    function C(e, t) {
      if (t) {
        return e.querySelector(t);
      } else {
        return C(z(), e);
      }
    }
    function R(e, t) {
      if (t) {
        return e.querySelectorAll(t);
      } else {
        return R(z(), e);
      }
    }
    function O(e, t) {
      e = k(e);
      if (t) {
        setTimeout(function () {
          O(e);
        }, t);
      } else {
        e.parentElement.removeChild(e);
      }
    }
    function L(e, t, r) {
      e = k(e);
      if (r) {
        setTimeout(function () {
          L(e, t);
        }, r);
      } else {
        e.classList && e.classList.add(t);
      }
    }
    function q(e, t, r) {
      e = k(e);
      if (r) {
        setTimeout(function () {
          q(e, t);
        }, r);
      } else {
        if (e.classList) {
          e.classList.remove(t);
          if (e.classList.length === 0) {
            e.removeAttribute("class");
          }
        }
      }
    }
    function A(e, t) {
      e = k(e);
      e.classList.toggle(t);
    }
    function T(e, t) {
      e = k(e);
      W(e.parentElement.children, function (e) {
        q(e, t);
      });
      L(e, t);
    }
    function H(e, t) {
      e = k(e);
      if (e.closest) {
        return e.closest(t);
      } else {
        do {
          if (e == null || d(e, t)) {
            return e;
          }
        } while ((e = e && u(e)));
      }
    }
    function N(e, t) {
      if (t.indexOf("closest ") === 0) {
        return [H(e, t.substr(8))];
      } else if (t.indexOf("find ") === 0) {
        return [C(e, t.substr(5))];
      } else if (t === "document") {
        return [document];
      } else if (t === "window") {
        return [window];
      } else {
        return z().querySelectorAll(t);
      }
    }
    function ee(e, t) {
      if (t) {
        return N(e, t)[0];
      } else {
        return N(z().body, e)[0];
      }
    }
    function k(e) {
      if (p(e, "String")) {
        return C(e);
      } else {
        return e;
      }
    }
    function I(e, t, r) {
      if (m(t)) {
        return { target: z().body, event: e, listener: t };
      } else {
        return { target: k(e), event: t, listener: r };
      }
    }
    function M(t, r, n) {
      lr(function () {
        var e = I(t, r, n);
        e.target.addEventListener(e.event, e.listener);
      });
      var e = m(r);
      return e ? r : n;
    }
    function D(t, r, n) {
      lr(function () {
        var e = I(t, r, n);
        e.target.removeEventListener(e.event, e.listener);
      });
      return m(r) ? r : n;
    }
    var te = z().createElement("output");
    function F(e, t) {
      var r = G(e, t);
      if (r) {
        if (r === "this") {
          return [re(e, t)];
        } else {
          var n = N(e, r);
          if (n.length === 0) {
            pt('The selector "' + r + '" on ' + t + " returned no matches!");
            return [te];
          } else {
            return n;
          }
        }
      }
    }
    function re(e, t) {
      return h(e, function (e) {
        return V(e, t) != null;
      });
    }
    function ne(e) {
      var t = G(e, "hx-target");
      if (t) {
        if (t === "this") {
          return re(e, "hx-target");
        } else {
          return ee(e, t);
        }
      } else {
        var r = _(e);
        if (r.boosted) {
          return z().body;
        } else {
          return e;
        }
      }
    }
    function P(e) {
      var t = U.config.attributesToSettle;
      for (var r = 0; r < t.length; r++) {
        if (e === t[r]) {
          return true;
        }
      }
      return false;
    }
    function X(t, r) {
      W(t.attributes, function (e) {
        if (!r.hasAttribute(e.name) && P(e.name)) {
          t.removeAttribute(e.name);
        }
      });
      W(r.attributes, function (e) {
        if (P(e.name)) {
          t.setAttribute(e.name, e.value);
        }
      });
    }
    function j(e, t) {
      var r = sr(t);
      for (var n = 0; n < r.length; n++) {
        var i = r[n];
        try {
          if (i.isInlineSwap(e)) {
            return true;
          }
        } catch (e) {
          pt(e);
        }
      }
      return e === "outerHTML";
    }
    function B(e, i, o) {
      var t = "#" + i.id;
      var a = "outerHTML";
      if (e === "true") {
      } else if (e.indexOf(":") > 0) {
        a = e.substr(0, e.indexOf(":"));
        t = e.substr(e.indexOf(":") + 1, e.length);
      } else {
        a = e;
      }
      var r = z().querySelectorAll(t);
      if (r) {
        W(r, function (e) {
          var t;
          var r = i.cloneNode(true);
          t = z().createDocumentFragment();
          t.appendChild(r);
          if (!j(a, e)) {
            t = r;
          }
          var n = { shouldSwap: true, target: e, fragment: t };
          if (!$(e, "htmx:oobBeforeSwap", n)) return;
          e = n.target;
          if (n["shouldSwap"]) {
            ye(a, e, e, t, o);
          }
          W(o.elts, function (e) {
            $(e, "htmx:oobAfterSwap", n);
          });
        });
        i.parentNode.removeChild(i);
      } else {
        i.parentNode.removeChild(i);
        J(z().body, "htmx:oobErrorNoTarget", { content: i });
      }
      return e;
    }
    function ie(e, r) {
      W(R(e, "[hx-swap-oob], [data-hx-swap-oob]"), function (e) {
        var t = V(e, "hx-swap-oob");
        if (t != null) {
          B(t, e, r);
        }
      });
    }
    function oe(e) {
      W(R(e, "[hx-preserve], [data-hx-preserve]"), function (e) {
        var t = V(e, "id");
        var r = z().getElementById(t);
        if (r != null) {
          e.parentNode.replaceChild(r, e);
        }
      });
    }
    function ae(n, e, i) {
      W(e.querySelectorAll("[id]"), function (e) {
        if (e.id && e.id.length > 0) {
          var t = n.querySelector(e.tagName + "[id='" + e.id + "']");
          if (t && t !== n) {
            var r = e.cloneNode();
            X(e, t);
            i.tasks.push(function () {
              X(e, r);
            });
          }
        }
      });
    }
    function se(e) {
      return function () {
        q(e, U.config.addedClass);
        ct(e);
        at(e);
        le(e);
        $(e, "htmx:load");
      };
    }
    function le(e) {
      var t = "[autofocus]";
      var r = d(e, t) ? e : e.querySelector(t);
      if (r != null) {
        r.focus();
      }
    }
    function ue(e, t, r, n) {
      ae(e, r, n);
      while (r.childNodes.length > 0) {
        var i = r.firstChild;
        L(i, U.config.addedClass);
        e.insertBefore(i, t);
        if (i.nodeType !== Node.TEXT_NODE && i.nodeType !== Node.COMMENT_NODE) {
          n.tasks.push(se(i));
        }
      }
    }
    function fe(t) {
      var e = _(t);
      if (e.webSocket) {
        e.webSocket.close();
      }
      if (e.sseEventSource) {
        e.sseEventSource.close();
      }
      $(t, "htmx:beforeCleanupElement");
      if (e.listenerInfos) {
        W(e.listenerInfos, function (e) {
          if (t !== e.on) {
            e.on.removeEventListener(e.trigger, e.listener);
          }
        });
      }
      if (t.children) {
        W(t.children, function (e) {
          fe(e);
        });
      }
    }
    function ce(e, t, r) {
      if (e.tagName === "BODY") {
        return me(e, t, r);
      } else {
        var n;
        var i = e.previousSibling;
        ue(u(e), e, t, r);
        if (i == null) {
          n = u(e).firstChild;
        } else {
          n = i.nextSibling;
        }
        _(e).replacedWith = n;
        r.elts = [];
        while (n && n !== e) {
          if (n.nodeType === Node.ELEMENT_NODE) {
            r.elts.push(n);
          }
          n = n.nextElementSibling;
        }
        fe(e);
        u(e).removeChild(e);
      }
    }
    function he(e, t, r) {
      return ue(e, e.firstChild, t, r);
    }
    function de(e, t, r) {
      return ue(u(e), e, t, r);
    }
    function ve(e, t, r) {
      return ue(e, null, t, r);
    }
    function ge(e, t, r) {
      return ue(u(e), e.nextSibling, t, r);
    }
    function pe(e, t, r) {
      fe(e);
      return u(e).removeChild(e);
    }
    function me(e, t, r) {
      var n = e.firstChild;
      ue(e, n, t, r);
      if (n) {
        while (n.nextSibling) {
          fe(n.nextSibling);
          e.removeChild(n.nextSibling);
        }
        fe(n);
        e.removeChild(n);
      }
    }
    function xe(e, t) {
      var r = G(e, "hx-select");
      if (r) {
        var n = z().createDocumentFragment();
        W(t.querySelectorAll(r), function (e) {
          n.appendChild(e);
        });
        t = n;
      }
      return t;
    }
    function ye(e, t, r, n, i) {
      switch (e) {
        case "none":
          return;
        case "outerHTML":
          ce(r, n, i);
          return;
        case "afterbegin":
          he(r, n, i);
          return;
        case "beforebegin":
          de(r, n, i);
          return;
        case "beforeend":
          ve(r, n, i);
          return;
        case "afterend":
          ge(r, n, i);
          return;
        case "delete":
          pe(r, n, i);
          return;
        default:
          var o = sr(t);
          for (var a = 0; a < o.length; a++) {
            var f = o[a];
            try {
              var s = f.handleSwap(e, r, n, i);
              if (s) {
                if (typeof s.length !== "undefined") {
                  for (var l = 0; l < s.length; l++) {
                    var u = s[l];
                    if (
                      u.nodeType !== Node.TEXT_NODE &&
                      u.nodeType !== Node.COMMENT_NODE
                    ) {
                      i.tasks.push(se(u));
                    }
                  }
                }
                return;
              }
            } catch (e) {
              pt(e);
            }
          }
          if (e === "innerHTML") {
            me(r, n, i);
          } else {
            ye(U.config.defaultSwapStyle, t, r, n, i);
          }
      }
    }
    function be(e) {
      if (e.indexOf("<title") > -1) {
        var t = e.replace(/<svg(\s[^>]*>|>)([\s\S]*?)<\/svg>/gim, "");
        var r = t.match(/<title(\s[^>]*>|>)([\s\S]*?)<\/title>/im);
        if (r) {
          return r[2];
        }
      }
    }
    function we(e, t, r, n, i) {
      i.title = be(n);
      var o = g(n);
      if (o) {
        ie(o, i);
        o = xe(r, o);
        oe(o);
        return ye(e, r, t, o, i);
      }
    }
    function Se(e, t, r) {
      var n = e.getResponseHeader(t);
      if (n.indexOf("{") === 0) {
        var i = S(n);
        for (var o in i) {
          if (i.hasOwnProperty(o)) {
            var a = i[o];
            if (!x(a)) {
              a = { value: a };
            }
            $(r, o, a);
          }
        }
      } else {
        $(r, n, []);
      }
    }
    var Ee = /\s/;
    var Ce = /[\s,]/;
    var Re = /[_$a-zA-Z]/;
    var Oe = /[_$a-zA-Z0-9]/;
    var Le = ['"', "'", "/"];
    var qe = /[^\s]/;
    function Ae(e) {
      var t = [];
      var r = 0;
      while (r < e.length) {
        if (Re.exec(e.charAt(r))) {
          var n = r;
          while (Oe.exec(e.charAt(r + 1))) {
            r++;
          }
          t.push(e.substr(n, r - n + 1));
        } else if (Le.indexOf(e.charAt(r)) !== -1) {
          var i = e.charAt(r);
          var n = r;
          r++;
          while (r < e.length && e.charAt(r) !== i) {
            if (e.charAt(r) === "\\") {
              r++;
            }
            r++;
          }
          t.push(e.substr(n, r - n + 1));
        } else {
          var o = e.charAt(r);
          t.push(o);
        }
        r++;
      }
      return t;
    }
    function Te(e, t, r) {
      return (
        Re.exec(e.charAt(0)) &&
        e !== "true" &&
        e !== "false" &&
        e !== "this" &&
        e !== r &&
        t !== "."
      );
    }
    function He(e, t, r) {
      if (t[0] === "[") {
        t.shift();
        var n = 1;
        var i = " return (function(" + r + "){ return (";
        var o = null;
        while (t.length > 0) {
          var a = t[0];
          if (a === "]") {
            n--;
            if (n === 0) {
              if (o === null) {
                i = i + "true";
              }
              t.shift();
              i += ")})";
              try {
                var s = Jt(
                  e,
                  function () {
                    return Function(i)();
                  },
                  function () {
                    return true;
                  }
                );
                s.source = i;
                return s;
              } catch (e) {
                J(z().body, "htmx:syntax:error", { error: e, source: i });
                return null;
              }
            }
          } else if (a === "[") {
            n++;
          }
          if (Te(a, o, r)) {
            i +=
              "((" +
              r +
              "." +
              a +
              ") ? (" +
              r +
              "." +
              a +
              ") : (window." +
              a +
              "))";
          } else {
            i = i + a;
          }
          o = t.shift();
        }
      }
    }
    function c(e, t) {
      var r = "";
      while (e.length > 0 && !e[0].match(t)) {
        r += e.shift();
      }
      return r;
    }
    var Ne = "input, textarea, select";
    function ke(e) {
      var t = V(e, "hx-trigger");
      var r = [];
      if (t) {
        var n = Ae(t);
        do {
          c(n, qe);
          var f = n.length;
          var i = c(n, /[,\[\s]/);
          if (i !== "") {
            if (i === "every") {
              var o = { trigger: "every" };
              c(n, qe);
              o.pollInterval = v(c(n, /[,\[\s]/));
              c(n, qe);
              var a = He(e, n, "event");
              if (a) {
                o.eventFilter = a;
              }
              r.push(o);
            } else if (i.indexOf("sse:") === 0) {
              r.push({ trigger: "sse", sseEvent: i.substr(4) });
            } else {
              var s = { trigger: i };
              var a = He(e, n, "event");
              if (a) {
                s.eventFilter = a;
              }
              while (n.length > 0 && n[0] !== ",") {
                c(n, qe);
                var l = n.shift();
                if (l === "changed") {
                  s.changed = true;
                } else if (l === "once") {
                  s.once = true;
                } else if (l === "consume") {
                  s.consume = true;
                } else if (l === "delay" && n[0] === ":") {
                  n.shift();
                  s.delay = v(c(n, Ce));
                } else if (l === "from" && n[0] === ":") {
                  n.shift();
                  var u = c(n, Ce);
                  if (u === "closest" || u === "find") {
                    n.shift();
                    u += " " + c(n, Ce);
                  }
                  s.from = u;
                } else if (l === "target" && n[0] === ":") {
                  n.shift();
                  s.target = c(n, Ce);
                } else if (l === "throttle" && n[0] === ":") {
                  n.shift();
                  s.throttle = v(c(n, Ce));
                } else if (l === "queue" && n[0] === ":") {
                  n.shift();
                  s.queue = c(n, Ce);
                } else if (
                  (l === "root" || l === "threshold") &&
                  n[0] === ":"
                ) {
                  n.shift();
                  s[l] = c(n, Ce);
                } else {
                  J(e, "htmx:syntax:error", { token: n.shift() });
                }
              }
              r.push(s);
            }
          }
          if (n.length === f) {
            J(e, "htmx:syntax:error", { token: n.shift() });
          }
          c(n, qe);
        } while (n[0] === "," && n.shift());
      }
      if (r.length > 0) {
        return r;
      } else if (d(e, "form")) {
        return [{ trigger: "submit" }];
      } else if (d(e, Ne)) {
        return [{ trigger: "change" }];
      } else {
        return [{ trigger: "click" }];
      }
    }
    function Ie(e) {
      _(e).cancelled = true;
    }
    function Me(e, t, r, n) {
      var i = _(e);
      i.timeout = setTimeout(function () {
        if (Y(e) && i.cancelled !== true) {
          if (!je(n, dt("hx:poll:trigger", { triggerSpec: n, target: e }))) {
            Z(t, r, e);
          }
          Me(e, t, V(e, "hx-" + t), n);
        }
      }, n.pollInterval);
    }
    function De(e) {
      return (
        location.hostname === e.hostname &&
        f(e, "href") &&
        f(e, "href").indexOf("#") !== 0
      );
    }
    function Fe(t, r, e) {
      if (
        (t.tagName === "A" && De(t) && t.target === "") ||
        t.tagName === "FORM"
      ) {
        r.boosted = true;
        var n, i;
        if (t.tagName === "A") {
          n = "get";
          i = f(t, "href");
          r.pushURL = true;
        } else {
          var o = f(t, "method");
          n = o ? o.toLowerCase() : "get";
          if (n === "get") {
            r.pushURL = true;
          }
          i = f(t, "action");
        }
        e.forEach(function (e) {
          Be(t, n, i, r, e, true);
        });
      }
    }
    function Pe(e, t) {
      if (e.type === "submit" || e.type === "click") {
        if (t.tagName === "FORM") {
          return true;
        }
        if (d(t, 'input[type="submit"], button') && H(t, "form") !== null) {
          return true;
        }
        if (
          t.tagName === "A" &&
          t.href &&
          (t.getAttribute("href") === "#" ||
            t.getAttribute("href").indexOf("#") !== 0)
        ) {
          return true;
        }
      }
      return false;
    }
    function Xe(e, t) {
      return (
        _(e).boosted &&
        e.tagName === "A" &&
        t.type === "click" &&
        (t.ctrlKey || t.metaKey)
      );
    }
    function je(e, t) {
      var r = e.eventFilter;
      if (r) {
        try {
          return r(t) !== true;
        } catch (e) {
          J(z().body, "htmx:eventFilter:error", { error: e, source: r.source });
          return true;
        }
      }
      return false;
    }
    function Be(o, a, s, e, l, u) {
      var t;
      if (l.from) {
        t = N(o, l.from);
      } else {
        t = [o];
      }
      W(t, function (n) {
        var i = function (e) {
          if (!Y(o)) {
            n.removeEventListener(l.trigger, i);
            return;
          }
          if (Xe(o, e)) {
            return;
          }
          if (u || Pe(e, o)) {
            e.preventDefault();
          }
          if (je(l, e)) {
            return;
          }
          var t = _(e);
          t.triggerSpec = l;
          if (t.handledFor == null) {
            t.handledFor = [];
          }
          var r = _(o);
          if (t.handledFor.indexOf(o) < 0) {
            t.handledFor.push(o);
            if (l.consume) {
              e.stopPropagation();
            }
            if (l.target && e.target) {
              if (!d(e.target, l.target)) {
                return;
              }
            }
            if (l.once) {
              if (r.triggeredOnce) {
                return;
              } else {
                r.triggeredOnce = true;
              }
            }
            if (l.changed) {
              if (r.lastValue === o.value) {
                return;
              } else {
                r.lastValue = o.value;
              }
            }
            if (r.delayed) {
              clearTimeout(r.delayed);
            }
            if (r.throttle) {
              return;
            }
            if (l.throttle) {
              if (!r.throttle) {
                Z(a, s, o, e);
                r.throttle = setTimeout(function () {
                  r.throttle = null;
                }, l.throttle);
              }
            } else if (l.delay) {
              r.delayed = setTimeout(function () {
                Z(a, s, o, e);
              }, l.delay);
            } else {
              Z(a, s, o, e);
            }
          }
        };
        if (e.listenerInfos == null) {
          e.listenerInfos = [];
        }
        e.listenerInfos.push({ trigger: l.trigger, listener: i, on: n });
        n.addEventListener(l.trigger, i);
      });
    }
    var Ue = false;
    var Ve = null;
    function ze() {
      if (!Ve) {
        Ve = function () {
          Ue = true;
        };
        window.addEventListener("scroll", Ve);
        setInterval(function () {
          if (Ue) {
            Ue = false;
            W(
              z().querySelectorAll(
                "[hx-trigger='revealed'],[data-hx-trigger='revealed']"
              ),
              function (e) {
                _e(e);
              }
            );
          }
        }, 200);
      }
    }
    function _e(e) {
      if (!s(e, "data-hx-revealed") && b(e)) {
        e.setAttribute("data-hx-revealed", "true");
        var t = _(e);
        if (t.initialized) {
          Z(t.verb, t.path, e);
        } else {
          e.addEventListener(
            "htmx:afterProcessNode",
            function () {
              Z(t.verb, t.path, e);
            },
            { once: true }
          );
        }
      }
    }
    function We(e, t, r) {
      var n = w(r);
      for (var i = 0; i < n.length; i++) {
        var o = n[i].split(/:(.+)/);
        if (o[0] === "connect") {
          Je(e, o[1], 0);
        }
        if (o[0] === "send") {
          Ze(e);
        }
      }
    }
    function Je(s, r, n) {
      if (!Y(s)) {
        return;
      }
      if (r.indexOf("/") == 0) {
        var e = location.hostname + (location.port ? ":" + location.port : "");
        if (location.protocol == "https:") {
          r = "wss://" + e + r;
        } else if (location.protocol == "http:") {
          r = "ws://" + e + r;
        }
      }
      var t = U.createWebSocket(r);
      t.onerror = function (e) {
        J(s, "htmx:wsError", { error: e, socket: t });
        $e(s);
      };
      t.onclose = function (e) {
        if ([1006, 1012, 1013].indexOf(e.code) >= 0) {
          var t = Ge(n);
          setTimeout(function () {
            Je(s, r, n + 1);
          }, t);
        }
      };
      t.onopen = function (e) {
        n = 0;
      };
      _(s).webSocket = t;
      t.addEventListener("message", function (e) {
        if ($e(s)) {
          return;
        }
        var t = e.data;
        gt(s, function (e) {
          t = e.transformResponse(t, null, s);
        });
        var r = zt(s);
        var n = g(t);
        var i = y(n.children);
        for (var o = 0; o < i.length; o++) {
          var a = i[o];
          B(V(a, "hx-swap-oob") || "true", a, r);
        }
        Ct(r.tasks);
      });
    }
    function $e(e) {
      if (!Y(e)) {
        _(e).webSocket.close();
        return true;
      }
    }
    function Ze(u) {
      var f = h(u, function (e) {
        return _(e).webSocket != null;
      });
      if (f) {
        u.addEventListener(ke(u)[0].trigger, function (e) {
          var t = _(f).webSocket;
          var r = Xt(u, f);
          var n = Mt(u, "post");
          var i = n.errors;
          var o = n.values;
          var a = Gt(u);
          var s = Q(o, a);
          var l = jt(s, u);
          l["HEADERS"] = r;
          if (i && i.length > 0) {
            $(u, "htmx:validation:halted", i);
            return;
          }
          t.send(JSON.stringify(l));
          if (Pe(e, u)) {
            e.preventDefault();
          }
        });
      } else {
        J(u, "htmx:noWebSocketSourceError");
      }
    }
    function Ge(e) {
      var t = U.config.wsReconnectDelay;
      if (typeof t === "function") {
        return t(e);
      }
      if (t === "full-jitter") {
        var r = Math.min(e, 6);
        var n = 1e3 * Math.pow(2, r);
        return n * Math.random();
      }
      pt(
        'htmx.config.wsReconnectDelay must either be a function or the string "full-jitter"'
      );
    }
    function Ke(e, t, r) {
      var n = w(r);
      for (var i = 0; i < n.length; i++) {
        var o = n[i].split(/:(.+)/);
        if (o[0] === "connect") {
          Ye(e, o[1]);
        }
        if (o[0] === "swap") {
          Qe(e, o[1]);
        }
      }
    }
    function Ye(t, e) {
      var r = U.createEventSource(e);
      r.onerror = function (e) {
        J(t, "htmx:sseError", { error: e, source: r });
        tt(t);
      };
      _(t).sseEventSource = r;
    }
    function Qe(o, a) {
      var s = h(o, rt);
      if (s) {
        var l = _(s).sseEventSource;
        var u = function (e) {
          if (tt(s)) {
            l.removeEventListener(a, u);
            return;
          }
          var t = e.data;
          gt(o, function (e) {
            t = e.transformResponse(t, null, o);
          });
          var r = Ut(o);
          var n = ne(o);
          var i = zt(o);
          we(r.swapStyle, o, n, t, i);
          Ct(i.tasks);
          $(o, "htmx:sseMessage", e);
        };
        _(o).sseListener = u;
        l.addEventListener(a, u);
      } else {
        J(o, "htmx:noSSESourceError");
      }
    }
    function et(e, t, r, n) {
      var i = h(e, rt);
      if (i) {
        var o = _(i).sseEventSource;
        var a = function () {
          if (!tt(i)) {
            if (Y(e)) {
              Z(t, r, e);
            } else {
              o.removeEventListener(n, a);
            }
          }
        };
        _(e).sseListener = a;
        o.addEventListener(n, a);
      } else {
        J(e, "htmx:noSSESourceError");
      }
    }
    function tt(e) {
      if (!Y(e)) {
        _(e).sseEventSource.close();
        return true;
      }
    }
    function rt(e) {
      return _(e).sseEventSource != null;
    }
    function nt(e, t, r, n, i) {
      var o = function () {
        if (!n.loaded) {
          n.loaded = true;
          Z(t, r, e);
        }
      };
      if (i) {
        setTimeout(o, i);
      } else {
        o();
      }
    }
    function it(o, a, e) {
      var t = false;
      W(n, function (n) {
        if (s(o, "hx-" + n)) {
          var i = V(o, "hx-" + n);
          t = true;
          a.path = i;
          a.verb = n;
          e.forEach(function (e) {
            if (e.sseEvent) {
              et(o, n, i, e.sseEvent);
            } else if (e.trigger === "revealed") {
              ze();
              _e(o);
            } else if (e.trigger === "intersect") {
              var t = {};
              if (e.root) {
                t.root = ee(o, e.root);
              }
              if (e.threshold) {
                t.threshold = parseFloat(e.threshold);
              }
              var r = new IntersectionObserver(function (e) {
                for (var t = 0; t < e.length; t++) {
                  var r = e[t];
                  if (r.isIntersecting) {
                    $(o, "intersect");
                    break;
                  }
                }
              }, t);
              r.observe(o);
              Be(o, n, i, a, e);
            } else if (e.trigger === "load") {
              nt(o, n, i, a, e.delay);
            } else if (e.pollInterval) {
              a.polling = true;
              Me(o, n, i, e);
            } else {
              Be(o, n, i, a, e);
            }
          });
        }
      });
      return t;
    }
    function ot(e) {
      if (
        e.type === "text/javascript" ||
        e.type === "module" ||
        e.type === ""
      ) {
        var t = z().createElement("script");
        W(e.attributes, function (e) {
          t.setAttribute(e.name, e.value);
        });
        t.textContent = e.textContent;
        t.async = false;
        if (U.config.inlineScriptNonce) {
          t.nonce = U.config.inlineScriptNonce;
        }
        var r = e.parentElement;
        try {
          r.insertBefore(t, e);
        } catch (e) {
          pt(e);
        } finally {
          r.removeChild(e);
        }
      }
    }
    function at(e) {
      if (d(e, "script")) {
        ot(e);
      }
      W(R(e, "script"), function (e) {
        ot(e);
      });
    }
    function st() {
      return document.querySelector("[hx-boost], [data-hx-boost]");
    }
    function lt(e) {
      if (e.querySelectorAll) {
        var t = st() ? ", a, form" : "";
        var r = e.querySelectorAll(
          i +
            t +
            ", [hx-sse], [data-hx-sse], [hx-ws]," +
            " [data-hx-ws], [hx-ext], [hx-data-ext]"
        );
        return r;
      } else {
        return [];
      }
    }
    function ut(r) {
      var e = function (e) {
        if (d(e.target, "button, input[type='submit']")) {
          var t = _(r);
          t.lastButtonClicked = e.target;
        }
      };
      r.addEventListener("click", e);
      r.addEventListener("focusin", e);
      r.addEventListener("focusout", function (e) {
        var t = _(r);
        t.lastButtonClicked = null;
      });
    }
    function ft(e) {
      if (e.closest && e.closest(U.config.disableSelector)) {
        return;
      }
      var t = _(e);
      if (!t.initialized) {
        t.initialized = true;
        $(e, "htmx:beforeProcessNode");
        if (e.value) {
          t.lastValue = e.value;
        }
        var r = ke(e);
        var n = it(e, t, r);
        if (!n && G(e, "hx-boost") === "true") {
          Fe(e, t, r);
        }
        if (e.tagName === "FORM") {
          ut(e);
        }
        var i = V(e, "hx-sse");
        if (i) {
          Ke(e, t, i);
        }
        var o = V(e, "hx-ws");
        if (o) {
          We(e, t, o);
        }
        $(e, "htmx:afterProcessNode");
      }
    }
    function ct(e) {
      e = k(e);
      ft(e);
      W(lt(e), function (e) {
        ft(e);
      });
    }
    function ht(e) {
      return e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
    }
    function dt(e, t) {
      var r;
      if (window.CustomEvent && typeof window.CustomEvent === "function") {
        r = new CustomEvent(e, { bubbles: true, cancelable: true, detail: t });
      } else {
        r = z().createEvent("CustomEvent");
        r.initCustomEvent(e, true, true, t);
      }
      return r;
    }
    function J(e, t, r) {
      $(e, t, Q({ error: t }, r));
    }
    function vt(e) {
      return e === "htmx:afterProcessNode";
    }
    function gt(e, t) {
      W(sr(e), function (e) {
        try {
          t(e);
        } catch (e) {
          pt(e);
        }
      });
    }
    function pt(e) {
      if (console.error) {
        console.error(e);
      } else if (console.log) {
        console.log("ERROR: ", e);
      }
    }
    function $(e, t, r) {
      e = k(e);
      if (r == null) {
        r = {};
      }
      r["elt"] = e;
      var n = dt(t, r);
      if (U.logger && !vt(t)) {
        U.logger(e, t, r);
      }
      if (r.error) {
        pt(r.error);
        $(e, "htmx:error", { errorInfo: r });
      }
      var i = e.dispatchEvent(n);
      var o = ht(t);
      if (i && o !== t) {
        var a = dt(o, n.detail);
        i = i && e.dispatchEvent(a);
      }
      gt(e, function (e) {
        i = i && e.onEvent(t, n) !== false;
      });
      return i;
    }
    var mt = location.pathname + location.search;
    function xt() {
      var e = z().querySelector("[hx-history-elt],[data-hx-history-elt]");
      return e || z().body;
    }
    function yt(e, t, r, n) {
      var i = S(localStorage.getItem("htmx-history-cache")) || [];
      for (var o = 0; o < i.length; o++) {
        if (i[o].url === e) {
          i.splice(o, 1);
          break;
        }
      }
      i.push({ url: e, content: t, title: r, scroll: n });
      while (i.length > U.config.historyCacheSize) {
        i.shift();
      }
      while (i.length > 0) {
        try {
          localStorage.setItem("htmx-history-cache", JSON.stringify(i));
          break;
        } catch (e) {
          J(z().body, "htmx:historyCacheError", { cause: e, cache: i });
          i.shift();
        }
      }
    }
    function bt(e) {
      var t = S(localStorage.getItem("htmx-history-cache")) || [];
      for (var r = 0; r < t.length; r++) {
        if (t[r].url === e) {
          return t[r];
        }
      }
      return null;
    }
    function wt(e) {
      var t = U.config.requestClass;
      var r = e.cloneNode(true);
      W(R(r, "." + t), function (e) {
        q(e, t);
      });
      return r.innerHTML;
    }
    function St() {
      var e = xt();
      var t = mt || location.pathname + location.search;
      $(z().body, "htmx:beforeHistorySave", { path: t, historyElt: e });
      if (U.config.historyEnabled)
        history.replaceState({ htmx: true }, z().title, window.location.href);
      yt(t, wt(e), z().title, window.scrollY);
    }
    function Et(e) {
      if (U.config.historyEnabled) history.pushState({ htmx: true }, "", e);
      mt = e;
    }
    function Ct(e) {
      W(e, function (e) {
        e.call();
      });
    }
    function Rt(n) {
      var e = new XMLHttpRequest();
      var i = { path: n, xhr: e };
      $(z().body, "htmx:historyCacheMiss", i);
      e.open("GET", n, true);
      e.setRequestHeader("HX-History-Restore-Request", "true");
      e.onload = function () {
        if (this.status >= 200 && this.status < 400) {
          $(z().body, "htmx:historyCacheMissLoad", i);
          var e = g(this.response);
          e = e.querySelector("[hx-history-elt],[data-hx-history-elt]") || e;
          var t = xt();
          var r = zt(t);
          me(t, e, r);
          Ct(r.tasks);
          mt = n;
          $(z().body, "htmx:historyRestore", { path: n });
        } else {
          J(z().body, "htmx:historyCacheMissLoadError", i);
        }
      };
      e.send();
    }
    function Ot(e) {
      St();
      e = e || location.pathname + location.search;
      var t = bt(e);
      if (t) {
        var r = g(t.content);
        var n = xt();
        var i = zt(n);
        me(n, r, i);
        Ct(i.tasks);
        document.title = t.title;
        window.scrollTo(0, t.scroll);
        mt = e;
        $(z().body, "htmx:historyRestore", { path: e });
      } else {
        if (U.config.refreshOnHistoryMiss) {
          window.location.reload(true);
        } else {
          Rt(e);
        }
      }
    }
    function Lt(e) {
      var t = G(e, "hx-push-url");
      return (t && t !== "false") || (_(e).boosted && _(e).pushURL);
    }
    function qt(e) {
      var t = G(e, "hx-push-url");
      return t === "true" || t === "false" ? null : t;
    }
    function At(e) {
      var t = F(e, "hx-indicator");
      if (t == null) {
        t = [e];
      }
      W(t, function (e) {
        e.classList["add"].call(e.classList, U.config.requestClass);
      });
      return t;
    }
    function Tt(e) {
      W(e, function (e) {
        e.classList["remove"].call(e.classList, U.config.requestClass);
      });
    }
    function Ht(e, t) {
      for (var r = 0; r < e.length; r++) {
        var n = e[r];
        if (n.isSameNode(t)) {
          return true;
        }
      }
      return false;
    }
    function Nt(e) {
      if (e.name === "" || e.name == null || e.disabled) {
        return false;
      }
      if (
        e.type === "button" ||
        e.type === "submit" ||
        e.tagName === "image" ||
        e.tagName === "reset" ||
        e.tagName === "file"
      ) {
        return false;
      }
      if (e.type === "checkbox" || e.type === "radio") {
        return e.checked;
      }
      return true;
    }
    function kt(t, r, n, e, i) {
      if (e == null || Ht(t, e)) {
        return;
      } else {
        t.push(e);
      }
      if (Nt(e)) {
        var o = f(e, "name");
        var a = e.value;
        if (e.multiple) {
          a = y(e.querySelectorAll("option:checked")).map(function (e) {
            return e.value;
          });
        }
        if (e.files) {
          a = y(e.files);
        }
        if (o != null && a != null) {
          var s = r[o];
          if (s) {
            if (Array.isArray(s)) {
              if (Array.isArray(a)) {
                r[o] = s.concat(a);
              } else {
                s.push(a);
              }
            } else {
              if (Array.isArray(a)) {
                r[o] = [s].concat(a);
              } else {
                r[o] = [s, a];
              }
            }
          } else {
            r[o] = a;
          }
        }
        if (i) {
          It(e, n);
        }
      }
      if (d(e, "form")) {
        var l = e.elements;
        W(l, function (e) {
          kt(t, r, n, e, i);
        });
      }
    }
    function It(e, t) {
      if (e.willValidate) {
        $(e, "htmx:validation:validate");
        if (!e.checkValidity()) {
          t.push({
            elt: e,
            message: e.validationMessage,
            validity: e.validity,
          });
          $(e, "htmx:validation:failed", {
            message: e.validationMessage,
            validity: e.validity,
          });
        }
      }
    }
    function Mt(e, t) {
      var r = [];
      var n = {};
      var i = {};
      var o = [];
      var a = _(e);
      var s = d(e, "form") && e.noValidate !== true;
      if (a.lastButtonClicked) {
        s = s && a.lastButtonClicked.formNoValidate !== true;
      }
      if (t !== "get") {
        kt(r, i, o, H(e, "form"), s);
      }
      kt(r, n, o, e, s);
      if (a.lastButtonClicked) {
        var l = f(a.lastButtonClicked, "name");
        if (l) {
          n[l] = a.lastButtonClicked.value;
        }
      }
      var u = F(e, "hx-include");
      W(u, function (e) {
        kt(r, n, o, e, s);
        if (!d(e, "form")) {
          W(e.querySelectorAll(Ne), function (e) {
            kt(r, n, o, e, s);
          });
        }
      });
      n = Q(n, i);
      return { errors: o, values: n };
    }
    function Dt(e, t, r) {
      if (e !== "") {
        e += "&";
      }
      if (String(r) === "[object Object]") {
        r = JSON.stringify(r);
      }
      var n = encodeURIComponent(r);
      e += encodeURIComponent(t) + "=" + n;
      return e;
    }
    function Ft(e) {
      var t = "";
      for (var r in e) {
        if (e.hasOwnProperty(r)) {
          var n = e[r];
          if (Array.isArray(n)) {
            W(n, function (e) {
              t = Dt(t, r, e);
            });
          } else {
            t = Dt(t, r, n);
          }
        }
      }
      return t;
    }
    function Pt(e) {
      var t = new FormData();
      for (var r in e) {
        if (e.hasOwnProperty(r)) {
          var n = e[r];
          if (Array.isArray(n)) {
            W(n, function (e) {
              t.append(r, e);
            });
          } else {
            t.append(r, n);
          }
        }
      }
      return t;
    }
    function Xt(e, t, r) {
      var n = {
        "HX-Request": "true",
        "HX-Trigger": f(e, "id"),
        "HX-Trigger-Name": f(e, "name"),
        "HX-Target": V(t, "id"),
        "HX-Current-URL": z().location.href,
      };
      Wt(e, "hx-headers", false, n);
      if (r !== undefined) {
        n["HX-Prompt"] = r;
      }
      if (_(e).boosted) {
        n["HX-Boosted"] = "true";
      }
      return n;
    }
    function jt(t, e) {
      var r = G(e, "hx-params");
      if (r) {
        if (r === "none") {
          return {};
        } else if (r === "*") {
          return t;
        } else if (r.indexOf("not ") === 0) {
          W(r.substr(4).split(","), function (e) {
            e = e.trim();
            delete t[e];
          });
          return t;
        } else {
          var n = {};
          W(r.split(","), function (e) {
            e = e.trim();
            n[e] = t[e];
          });
          return n;
        }
      } else {
        return t;
      }
    }
    function Bt(e) {
      return f(e, "href") && f(e, "href").indexOf("#") >= 0;
    }
    function Ut(e, t) {
      var r = t ? t : G(e, "hx-swap");
      var n = {
        swapStyle: _(e).boosted ? "innerHTML" : U.config.defaultSwapStyle,
        swapDelay: U.config.defaultSwapDelay,
        settleDelay: U.config.defaultSettleDelay,
      };
      if (_(e).boosted && !Bt(e)) {
        n["show"] = "top";
      }
      if (r) {
        var i = w(r);
        if (i.length > 0) {
          n["swapStyle"] = i[0];
          for (var o = 1; o < i.length; o++) {
            var a = i[o];
            if (a.indexOf("swap:") === 0) {
              n["swapDelay"] = v(a.substr(5));
            }
            if (a.indexOf("settle:") === 0) {
              n["settleDelay"] = v(a.substr(7));
            }
            if (a.indexOf("scroll:") === 0) {
              var s = a.substr(7);
              var l = s.split(":");
              var f = l.pop();
              var u = l.length > 0 ? l.join(":") : null;
              n["scroll"] = f;
              n["scrollTarget"] = u;
            }
            if (a.indexOf("show:") === 0) {
              var c = a.substr(5);
              var l = c.split(":");
              var h = l.pop();
              var u = l.length > 0 ? l.join(":") : null;
              n["show"] = h;
              n["showTarget"] = u;
            }
            if (a.indexOf("focus-scroll:") === 0) {
              var d = a.substr("focus-scroll:".length);
              n["focusScroll"] = d == "true";
            }
          }
        }
      }
      return n;
    }
    function Vt(t, r, n) {
      var i = null;
      gt(r, function (e) {
        if (i == null) {
          i = e.encodeParameters(t, n, r);
        }
      });
      if (i != null) {
        return i;
      } else {
        if (
          G(r, "hx-encoding") === "multipart/form-data" ||
          (d(r, "form") && f(r, "enctype") === "multipart/form-data")
        ) {
          return Pt(n);
        } else {
          return Ft(n);
        }
      }
    }
    function zt(e) {
      return { tasks: [], elts: [e] };
    }
    function _t(e, t) {
      var r = e[0];
      var n = e[e.length - 1];
      if (t.scroll) {
        var i = null;
        if (t.scrollTarget) {
          i = ee(r, t.scrollTarget);
        }
        if (t.scroll === "top" && (r || i)) {
          i = i || r;
          i.scrollTop = 0;
        }
        if (t.scroll === "bottom" && (n || i)) {
          i = i || n;
          i.scrollTop = i.scrollHeight;
        }
      }
      if (t.show) {
        var i = null;
        if (t.showTarget) {
          var o = t.showTarget;
          if (t.showTarget === "window") {
            o = "body";
          }
          i = ee(r, o);
        }
        if (t.show === "top" && (r || i)) {
          i = i || r;
          i.scrollIntoView({
            block: "start",
            behavior: U.config.scrollBehavior,
          });
        }
        if (t.show === "bottom" && (n || i)) {
          i = i || n;
          i.scrollIntoView({ block: "end", behavior: U.config.scrollBehavior });
        }
      }
    }
    function Wt(e, t, r, n) {
      if (n == null) {
        n = {};
      }
      if (e == null) {
        return n;
      }
      var i = V(e, t);
      if (i) {
        var o = i.trim();
        var a = r;
        if (o.indexOf("javascript:") === 0) {
          o = o.substr(11);
          a = true;
        } else if (o.indexOf("js:") === 0) {
          o = o.substr(3);
          a = true;
        }
        if (o.indexOf("{") !== 0) {
          o = "{" + o + "}";
        }
        var s;
        if (a) {
          s = Jt(
            e,
            function () {
              return Function("return (" + o + ")")();
            },
            {}
          );
        } else {
          s = S(o);
        }
        for (var l in s) {
          if (s.hasOwnProperty(l)) {
            if (n[l] == null) {
              n[l] = s[l];
            }
          }
        }
      }
      return Wt(u(e), t, r, n);
    }
    function Jt(e, t, r) {
      if (U.config.allowEval) {
        return t();
      } else {
        J(e, "htmx:evalDisallowedError");
        return r;
      }
    }
    function $t(e, t) {
      return Wt(e, "hx-vars", true, t);
    }
    function Zt(e, t) {
      return Wt(e, "hx-vals", false, t);
    }
    function Gt(e) {
      return Q($t(e), Zt(e));
    }
    function Kt(t, r, n) {
      if (n !== null) {
        try {
          t.setRequestHeader(r, n);
        } catch (e) {
          t.setRequestHeader(r, encodeURIComponent(n));
          t.setRequestHeader(r + "-URI-AutoEncoded", "true");
        }
      }
    }
    function Yt(t) {
      if (t.responseURL && typeof URL !== "undefined") {
        try {
          var e = new URL(t.responseURL);
          return e.pathname + e.search;
        } catch (e) {
          J(z().body, "htmx:badResponseUrl", { url: t.responseURL });
        }
      }
    }
    function Qt(e, t) {
      return e.getAllResponseHeaders().match(t);
    }
    function er(e, t, r) {
      e = e.toLowerCase();
      if (r) {
        if (r instanceof Element || p(r, "String")) {
          return Z(e, t, null, null, {
            targetOverride: k(r),
            returnPromise: true,
          });
        } else {
          return Z(e, t, k(r.source), r.event, {
            handler: r.handler,
            headers: r.headers,
            values: r.values,
            targetOverride: k(r.target),
            swapOverride: r.swap,
            returnPromise: true,
          });
        }
      } else {
        return Z(e, t, null, null, { returnPromise: true });
      }
    }
    function tr(e) {
      var t = [];
      while (e) {
        t.push(e);
        e = e.parentElement;
      }
      return t;
    }
    function Z(e, t, n, f, r) {
      var c = null;
      var h = null;
      r = r != null ? r : {};
      if (r.returnPromise && typeof Promise !== "undefined") {
        var d = new Promise(function (e, t) {
          c = e;
          h = t;
        });
      }
      if (n == null) {
        n = z().body;
      }
      var v = r.handler || rr;
      if (!Y(n)) {
        return;
      }
      var g = r.targetOverride || ne(n);
      if (g == null || g == te) {
        J(n, "htmx:targetError", { target: V(n, "hx-target") });
        return;
      }
      var p = n;
      var i = _(n);
      var o = G(n, "hx-sync");
      var m = null;
      var x = false;
      if (o) {
        var y = o.split(":");
        var b = y[0].trim();
        if (b === "this") {
          p = re(n, "hx-sync");
        } else {
          p = ee(n, b);
        }
        o = (y[1] || "drop").trim();
        i = _(p);
        if (o === "drop" && i.xhr && i.abortable !== true) {
          return;
        } else if (o === "abort") {
          if (i.xhr) {
            return;
          } else {
            x = true;
          }
        } else if (o === "replace") {
          $(p, "htmx:abort");
        } else if (o.indexOf("queue") === 0) {
          var w = o.split(" ");
          m = (w[1] || "last").trim();
        }
      }
      if (i.xhr) {
        if (i.abortable) {
          $(p, "htmx:abort");
        } else {
          if (m == null) {
            if (f) {
              var S = _(f);
              if (S && S.triggerSpec && S.triggerSpec.queue) {
                m = S.triggerSpec.queue;
              }
            }
            if (m == null) {
              m = "last";
            }
          }
          if (i.queuedRequests == null) {
            i.queuedRequests = [];
          }
          if (m === "first" && i.queuedRequests.length === 0) {
            i.queuedRequests.push(function () {
              Z(e, t, n, f, r);
            });
          } else if (m === "all") {
            i.queuedRequests.push(function () {
              Z(e, t, n, f, r);
            });
          } else if (m === "last") {
            i.queuedRequests = [];
            i.queuedRequests.push(function () {
              Z(e, t, n, f, r);
            });
          }
          return;
        }
      }
      var a = new XMLHttpRequest();
      i.xhr = a;
      i.abortable = x;
      var s = function () {
        i.xhr = null;
        i.abortable = false;
        if (i.queuedRequests != null && i.queuedRequests.length > 0) {
          var e = i.queuedRequests.shift();
          e();
        }
      };
      var E = G(n, "hx-prompt");
      if (E) {
        var C = prompt(E);
        if (C === null || !$(n, "htmx:prompt", { prompt: C, target: g })) {
          K(c);
          s();
          return d;
        }
      }
      var R = G(n, "hx-confirm");
      if (R) {
        if (!confirm(R)) {
          K(c);
          s();
          return d;
        }
      }
      var O = Xt(n, g, C);
      if (r.headers) {
        O = Q(O, r.headers);
      }
      var L = Mt(n, e);
      var q = L.errors;
      var A = L.values;
      if (r.values) {
        A = Q(A, r.values);
      }
      var T = Gt(n);
      var H = Q(A, T);
      var N = jt(H, n);
      if (e !== "get" && G(n, "hx-encoding") == null) {
        O["Content-Type"] = "application/x-www-form-urlencoded";
      }
      if (t == null || t === "") {
        t = z().location.href;
      }
      var k = Wt(n, "hx-request");
      var l = {
        parameters: N,
        unfilteredParameters: H,
        headers: O,
        target: g,
        verb: e,
        errors: q,
        withCredentials:
          r.credentials || k.credentials || U.config.withCredentials,
        timeout: r.timeout || k.timeout || U.config.timeout,
        path: t,
        triggeringEvent: f,
      };
      if (!$(n, "htmx:configRequest", l)) {
        K(c);
        s();
        return d;
      }
      t = l.path;
      e = l.verb;
      O = l.headers;
      N = l.parameters;
      q = l.errors;
      if (q && q.length > 0) {
        $(n, "htmx:validation:halted", l);
        K(c);
        s();
        return d;
      }
      var I = t.split("#");
      var M = I[0];
      var D = I[1];
      if (e === "get") {
        var F = M;
        var P = Object.keys(N).length !== 0;
        if (P) {
          if (F.indexOf("?") < 0) {
            F += "?";
          } else {
            F += "&";
          }
          F += Ft(N);
          if (D) {
            F += "#" + D;
          }
        }
        a.open("GET", F, true);
      } else {
        a.open(e.toUpperCase(), t, true);
      }
      a.overrideMimeType("text/html");
      a.withCredentials = l.withCredentials;
      a.timeout = l.timeout;
      if (k.noHeaders) {
      } else {
        for (var X in O) {
          if (O.hasOwnProperty(X)) {
            var j = O[X];
            Kt(a, X, j);
          }
        }
      }
      var u = {
        xhr: a,
        target: g,
        requestConfig: l,
        etc: r,
        pathInfo: { path: t, finalPath: F, anchor: D },
      };
      a.onload = function () {
        try {
          var e = tr(n);
          v(n, u);
          Tt(B);
          $(n, "htmx:afterRequest", u);
          $(n, "htmx:afterOnLoad", u);
          if (!Y(n)) {
            var t = null;
            while (e.length > 0 && t == null) {
              var r = e.shift();
              if (Y(r)) {
                t = r;
              }
            }
            if (t) {
              $(t, "htmx:afterRequest", u);
              $(t, "htmx:afterOnLoad", u);
            }
          }
          K(c);
          s();
        } catch (e) {
          J(n, "htmx:onLoadError", Q({ error: e }, u));
          throw e;
        }
      };
      a.onerror = function () {
        Tt(B);
        J(n, "htmx:afterRequest", u);
        J(n, "htmx:sendError", u);
        K(h);
        s();
      };
      a.onabort = function () {
        Tt(B);
        J(n, "htmx:afterRequest", u);
        J(n, "htmx:sendAbort", u);
        K(h);
        s();
      };
      a.ontimeout = function () {
        Tt(B);
        J(n, "htmx:afterRequest", u);
        J(n, "htmx:timeout", u);
        K(h);
        s();
      };
      if (!$(n, "htmx:beforeRequest", u)) {
        K(c);
        s();
        return d;
      }
      var B = At(n);
      W(["loadstart", "loadend", "progress", "abort"], function (t) {
        W([a, a.upload], function (e) {
          e.addEventListener(t, function (e) {
            $(n, "htmx:xhr:" + t, {
              lengthComputable: e.lengthComputable,
              loaded: e.loaded,
              total: e.total,
            });
          });
        });
      });
      $(n, "htmx:beforeSend", u);
      a.send(e === "get" ? null : Vt(a, n, N));
      return d;
    }
    function rr(s, l) {
      var u = l.xhr;
      var f = l.target;
      var r = l.etc;
      if (!$(s, "htmx:beforeOnLoad", l)) return;
      if (Qt(u, /HX-Trigger:/i)) {
        Se(u, "HX-Trigger", s);
      }
      if (Qt(u, /HX-Push:/i)) {
        var c = u.getResponseHeader("HX-Push");
      }
      if (Qt(u, /HX-Redirect:/i)) {
        window.location.href = u.getResponseHeader("HX-Redirect");
        return;
      }
      if (Qt(u, /HX-Refresh:/i)) {
        if ("true" === u.getResponseHeader("HX-Refresh")) {
          location.reload();
          return;
        }
      }
      if (Qt(u, /HX-Retarget:/i)) {
        l.target = z().querySelector(u.getResponseHeader("HX-Retarget"));
      }
      var h;
      if (c == "false") {
        h = false;
      } else {
        h = Lt(s) || c;
      }
      var n = u.status >= 200 && u.status < 400 && u.status !== 204;
      var d = u.response;
      var e = u.status >= 400;
      var t = Q({ shouldSwap: n, serverResponse: d, isError: e }, l);
      if (!$(f, "htmx:beforeSwap", t)) return;
      f = t.target;
      d = t.serverResponse;
      e = t.isError;
      l.failed = e;
      l.successful = !e;
      if (t.shouldSwap) {
        if (u.status === 286) {
          Ie(s);
        }
        gt(s, function (e) {
          d = e.transformResponse(d, u, s);
        });
        if (h) {
          St();
        }
        var i = r.swapOverride;
        var v = Ut(s, i);
        f.classList.add(U.config.swappingClass);
        var o = function () {
          try {
            var e = document.activeElement;
            var t = {};
            try {
              t = {
                elt: e,
                start: e ? e.selectionStart : null,
                end: e ? e.selectionEnd : null,
              };
            } catch (e) {}
            var n = zt(f);
            we(v.swapStyle, f, s, d, n);
            if (t.elt && !Y(t.elt) && t.elt.id) {
              var r = document.getElementById(t.elt.id);
              var i = {
                preventScroll:
                  v.focusScroll !== undefined
                    ? !v.focusScroll
                    : !U.config.defaultFocusScroll,
              };
              if (r) {
                if (t.start && r.setSelectionRange) {
                  r.setSelectionRange(t.start, t.end);
                }
                r.focus(i);
              }
            }
            f.classList.remove(U.config.swappingClass);
            W(n.elts, function (e) {
              if (e.classList) {
                e.classList.add(U.config.settlingClass);
              }
              $(e, "htmx:afterSwap", l);
            });
            if (l.pathInfo.anchor) {
              location.hash = l.pathInfo.anchor;
            }
            if (Qt(u, /HX-Trigger-After-Swap:/i)) {
              var o = s;
              if (!Y(s)) {
                o = z().body;
              }
              Se(u, "HX-Trigger-After-Swap", o);
            }
            var a = function () {
              W(n.tasks, function (e) {
                e.call();
              });
              W(n.elts, function (e) {
                if (e.classList) {
                  e.classList.remove(U.config.settlingClass);
                }
                $(e, "htmx:afterSettle", l);
              });
              if (h) {
                var e =
                  c ||
                  qt(s) ||
                  Yt(u) ||
                  l.pathInfo.finalPath ||
                  l.pathInfo.path;
                Et(e);
                $(z().body, "htmx:pushedIntoHistory", { path: e });
              }
              if (n.title) {
                var t = C("title");
                if (t) {
                  t.innerHTML = n.title;
                } else {
                  window.document.title = n.title;
                }
              }
              _t(n.elts, v);
              if (Qt(u, /HX-Trigger-After-Settle:/i)) {
                var r = s;
                if (!Y(s)) {
                  r = z().body;
                }
                Se(u, "HX-Trigger-After-Settle", r);
              }
            };
            if (v.settleDelay > 0) {
              setTimeout(a, v.settleDelay);
            } else {
              a();
            }
          } catch (e) {
            J(s, "htmx:swapError", l);
            throw e;
          }
        };
        if (v.swapDelay > 0) {
          setTimeout(o, v.swapDelay);
        } else {
          o();
        }
      }
      if (e) {
        J(
          s,
          "htmx:responseError",
          Q(
            {
              error:
                "Response Status Error Code " +
                u.status +
                " from " +
                l.pathInfo.path,
            },
            l
          )
        );
      }
    }
    var nr = {};
    function ir() {
      return {
        init: function (e) {
          return null;
        },
        onEvent: function (e, t) {
          return true;
        },
        transformResponse: function (e, t, r) {
          return e;
        },
        isInlineSwap: function (e) {
          return false;
        },
        handleSwap: function (e, t, r, n) {
          return false;
        },
        encodeParameters: function (e, t, r) {
          return null;
        },
      };
    }
    function or(e, t) {
      if (t.init) {
        t.init(r);
      }
      nr[e] = Q(ir(), t);
    }
    function ar(e) {
      delete nr[e];
    }
    function sr(e, r, n) {
      if (e == undefined) {
        return r;
      }
      if (r == undefined) {
        r = [];
      }
      if (n == undefined) {
        n = [];
      }
      var t = V(e, "hx-ext");
      if (t) {
        W(t.split(","), function (e) {
          e = e.replace(/ /g, "");
          if (e.slice(0, 7) == "ignore:") {
            n.push(e.slice(7));
            return;
          }
          if (n.indexOf(e) < 0) {
            var t = nr[e];
            if (t && r.indexOf(t) < 0) {
              r.push(t);
            }
          }
        });
      }
      return sr(u(e), r, n);
    }
    function lr(e) {
      if (z().readyState !== "loading") {
        e();
      } else {
        z().addEventListener("DOMContentLoaded", e);
      }
    }
    function ur() {
      if (U.config.includeIndicatorStyles !== false) {
        z().head.insertAdjacentHTML(
          "beforeend",
          "<style>                      ." +
            U.config.indicatorClass +
            "{opacity:0;transition: opacity 200ms ease-in;}                      ." +
            U.config.requestClass +
            " ." +
            U.config.indicatorClass +
            "{opacity:1}                      ." +
            U.config.requestClass +
            "." +
            U.config.indicatorClass +
            "{opacity:1}                    </style>"
        );
      }
    }
    function fr() {
      var e = z().querySelector('meta[name="htmx-config"]');
      if (e) {
        return S(e.content);
      } else {
        return null;
      }
    }
    function cr() {
      var e = fr();
      if (e) {
        U.config = Q(U.config, e);
      }
    }
    lr(function () {
      cr();
      ur();
      var e = z().body;
      ct(e);
      var t = z().querySelectorAll(
        "[hx-trigger='restored'],[data-hx-trigger='restored']"
      );
      e.addEventListener("htmx:abort", function (e) {
        var t = e.target;
        var r = _(t);
        if (r && r.xhr) {
          r.xhr.abort();
        }
      });
      window.onpopstate = function (e) {
        if (e.state && e.state.htmx) {
          Ot();
          W(t, function (e) {
            $(e, "htmx:restored", { document: z(), triggerEvent: $ });
          });
        }
      };
      setTimeout(function () {
        $(e, "htmx:load", {});
      }, 0);
    });
    return U;
  })();
});
