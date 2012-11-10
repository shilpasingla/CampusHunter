/*!
 * jQuery JavaScript Library v1.8.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: Thu Sep 20 2012 21:13:05 GMT-0400 (Eastern Daylight Time)
 */
(function (e, t) {
    function _(e) {
        var t = M[e] = {};
        return v.each(e.split(y), function (e, n) {
            t[n] = !0
        }), t
    }

    function H(e, n, r) {
        if (r === t && e.nodeType === 1) {
            var i = "data-" + n.replace(P, "-$1").toLowerCase();
            r = e.getAttribute(i);
            if (typeof r == "string") {
                try {
                    r = r === "true" ? !0 : r === "false" ? !1 : r === "null" ? null : +r + "" === r ? +r : D.test(r) ? v.parseJSON(r) : r
                } catch (s) {
                }
                v.data(e, n, r)
            } else r = t
        }
        return r
    }

    function B(e) {
        var t;
        for (t in e) {
            if (t === "data" && v.isEmptyObject(e[t]))continue;
            if (t !== "toJSON")return!1
        }
        return!0
    }

    function et() {
        return!1
    }

    function tt() {
        return!0
    }

    function ut(e) {
        return!e || !e.parentNode || e.parentNode.nodeType === 11
    }

    function at(e, t) {
        do e = e[t]; while (e && e.nodeType !== 1);
        return e
    }

    function ft(e, t, n) {
        t = t || 0;
        if (v.isFunction(t))return v.grep(e, function (e, r) {
            var i = !!t.call(e, r, e);
            return i === n
        });
        if (t.nodeType)return v.grep(e, function (e, r) {
            return e === t === n
        });
        if (typeof t == "string") {
            var r = v.grep(e, function (e) {
                return e.nodeType === 1
            });
            if (it.test(t))return v.filter(t, r, !n);
            t = v.filter(t, r)
        }
        return v.grep(e, function (e, r) {
            return v.inArray(e, t) >= 0 === n
        })
    }

    function lt(e) {
        var t = ct.split("|"), n = e.createDocumentFragment();
        if (n.createElement)while (t.length)n.createElement(t.pop());
        return n
    }

    function Lt(e, t) {
        return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t))
    }

    function At(e, t) {
        if (t.nodeType !== 1 || !v.hasData(e))return;
        var n, r, i, s = v._data(e), o = v._data(t, s), u = s.events;
        if (u) {
            delete o.handle, o.events = {};
            for (n in u)for (r = 0, i = u[n].length; r < i; r++)v.event.add(t, n, u[n][r])
        }
        o.data && (o.data = v.extend({}, o.data))
    }

    function Ot(e, t) {
        var n;
        if (t.nodeType !== 1)return;
        t.clearAttributes && t.clearAttributes(), t.mergeAttributes && t.mergeAttributes(e), n = t.nodeName.toLowerCase(), n === "object" ? (t.parentNode && (t.outerHTML = e.outerHTML), v.support.html5Clone && e.innerHTML && !v.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : n === "input" && Et.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : n === "option" ? t.selected = e.defaultSelected : n === "input" || n === "textarea" ? t.defaultValue = e.defaultValue : n === "script" && t.text !== e.text && (t.text = e.text), t.removeAttribute(v.expando)
    }

    function Mt(e) {
        return typeof e.getElementsByTagName != "undefined" ? e.getElementsByTagName("*") : typeof e.querySelectorAll != "undefined" ? e.querySelectorAll("*") : []
    }

    function _t(e) {
        Et.test(e.type) && (e.defaultChecked = e.checked)
    }

    function Qt(e, t) {
        if (t in e)return t;
        var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = Jt.length;
        while (i--) {
            t = Jt[i] + n;
            if (t in e)return t
        }
        return r
    }

    function Gt(e, t) {
        return e = t || e, v.css(e, "display") === "none" || !v.contains(e.ownerDocument, e)
    }

    function Yt(e, t) {
        var n, r, i = [], s = 0, o = e.length;
        for (; s < o; s++) {
            n = e[s];
            if (!n.style)continue;
            i[s] = v._data(n, "olddisplay"), t ? (!i[s] && n.style.display === "none" && (n.style.display = ""), n.style.display === "" && Gt(n) && (i[s] = v._data(n, "olddisplay", nn(n.nodeName)))) : (r = Dt(n, "display"), !i[s] && r !== "none" && v._data(n, "olddisplay", r))
        }
        for (s = 0; s < o; s++) {
            n = e[s];
            if (!n.style)continue;
            if (!t || n.style.display === "none" || n.style.display === "")n.style.display = t ? i[s] || "" : "none"
        }
        return e
    }

    function Zt(e, t, n) {
        var r = Rt.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }

    function en(e, t, n, r) {
        var i = n === (r ? "border" : "content") ? 4 : t === "width" ? 1 : 0, s = 0;
        for (; i < 4; i += 2)n === "margin" && (s += v.css(e, n + $t[i], !0)), r ? (n === "content" && (s -= parseFloat(Dt(e, "padding" + $t[i])) || 0), n !== "margin" && (s -= parseFloat(Dt(e, "border" + $t[i] + "Width")) || 0)) : (s += parseFloat(Dt(e, "padding" + $t[i])) || 0, n !== "padding" && (s += parseFloat(Dt(e, "border" + $t[i] + "Width")) || 0));
        return s
    }

    function tn(e, t, n) {
        var r = t === "width" ? e.offsetWidth : e.offsetHeight, i = !0, s = v.support.boxSizing && v.css(e, "boxSizing") === "border-box";
        if (r <= 0 || r == null) {
            r = Dt(e, t);
            if (r < 0 || r == null)r = e.style[t];
            if (Ut.test(r))return r;
            i = s && (v.support.boxSizingReliable || r === e.style[t]), r = parseFloat(r) || 0
        }
        return r + en(e, t, n || (s ? "border" : "content"), i) + "px"
    }

    function nn(e) {
        if (Wt[e])return Wt[e];
        var t = v("<" + e + ">").appendTo(i.body), n = t.css("display");
        t.remove();
        if (n === "none" || n === "") {
            Pt = i.body.appendChild(Pt || v.extend(i.createElement("iframe"), {frameBorder:0, width:0, height:0}));
            if (!Ht || !Pt.createElement)Ht = (Pt.contentWindow || Pt.contentDocument).document, Ht.write("<!doctype html><html><body>"), Ht.close();
            t = Ht.body.appendChild(Ht.createElement(e)), n = Dt(t, "display"), i.body.removeChild(Pt)
        }
        return Wt[e] = n, n
    }

    function fn(e, t, n, r) {
        var i;
        if (v.isArray(t))v.each(t, function (t, i) {
            n || sn.test(e) ? r(e, i) : fn(e + "[" + (typeof i == "object" ? t : "") + "]", i, n, r)
        }); else if (!n && v.type(t) === "object")for (i in t)fn(e + "[" + i + "]", t[i], n, r); else r(e, t)
    }

    function Cn(e) {
        return function (t, n) {
            typeof t != "string" && (n = t, t = "*");
            var r, i, s, o = t.toLowerCase().split(y), u = 0, a = o.length;
            if (v.isFunction(n))for (; u < a; u++)r = o[u], s = /^\+/.test(r), s && (r = r.substr(1) || "*"), i = e[r] = e[r] || [], i[s ? "unshift" : "push"](n)
        }
    }

    function kn(e, n, r, i, s, o) {
        s = s || n.dataTypes[0], o = o || {}, o[s] = !0;
        var u, a = e[s], f = 0, l = a ? a.length : 0, c = e === Sn;
        for (; f < l && (c || !u); f++)u = a[f](n, r, i), typeof u == "string" && (!c || o[u] ? u = t : (n.dataTypes.unshift(u), u = kn(e, n, r, i, u, o)));
        return(c || !u) && !o["*"] && (u = kn(e, n, r, i, "*", o)), u
    }

    function Ln(e, n) {
        var r, i, s = v.ajaxSettings.flatOptions || {};
        for (r in n)n[r] !== t && ((s[r] ? e : i || (i = {}))[r] = n[r]);
        i && v.extend(!0, e, i)
    }

    function An(e, n, r) {
        var i, s, o, u, a = e.contents, f = e.dataTypes, l = e.responseFields;
        for (s in l)s in r && (n[l[s]] = r[s]);
        while (f[0] === "*")f.shift(), i === t && (i = e.mimeType || n.getResponseHeader("content-type"));
        if (i)for (s in a)if (a[s] && a[s].test(i)) {
            f.unshift(s);
            break
        }
        if (f[0]in r)o = f[0]; else {
            for (s in r) {
                if (!f[0] || e.converters[s + " " + f[0]]) {
                    o = s;
                    break
                }
                u || (u = s)
            }
            o = o || u
        }
        if (o)return o !== f[0] && f.unshift(o), r[o]
    }

    function On(e, t) {
        var n, r, i, s, o = e.dataTypes.slice(), u = o[0], a = {}, f = 0;
        e.dataFilter && (t = e.dataFilter(t, e.dataType));
        if (o[1])for (n in e.converters)a[n.toLowerCase()] = e.converters[n];
        for (; i = o[++f];)if (i !== "*") {
            if (u !== "*" && u !== i) {
                n = a[u + " " + i] || a["* " + i];
                if (!n)for (r in a) {
                    s = r.split(" ");
                    if (s[1] === i) {
                        n = a[u + " " + s[0]] || a["* " + s[0]];
                        if (n) {
                            n === !0 ? n = a[r] : a[r] !== !0 && (i = s[0], o.splice(f--, 0, i));
                            break
                        }
                    }
                }
                if (n !== !0)if (n && e["throws"])t = n(t); else try {
                    t = n(t)
                } catch (l) {
                    return{state:"parsererror", error:n ? l : "No conversion from " + u + " to " + i}
                }
            }
            u = i
        }
        return{state:"success", data:t}
    }

    function Fn() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {
        }
    }

    function In() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {
        }
    }

    function $n() {
        return setTimeout(function () {
            qn = t
        }, 0), qn = v.now()
    }

    function Jn(e, t) {
        v.each(t, function (t, n) {
            var r = (Vn[t] || []).concat(Vn["*"]), i = 0, s = r.length;
            for (; i < s; i++)if (r[i].call(e, t, n))return
        })
    }

    function Kn(e, t, n) {
        var r, i = 0, s = 0, o = Xn.length, u = v.Deferred().always(function () {
            delete a.elem
        }), a = function () {
            var t = qn || $n(), n = Math.max(0, f.startTime + f.duration - t), r = 1 - (n / f.duration || 0), i = 0, s = f.tweens.length;
            for (; i < s; i++)f.tweens[i].run(r);
            return u.notifyWith(e, [f, r, n]), r < 1 && s ? n : (u.resolveWith(e, [f]), !1)
        }, f = u.promise({elem:e, props:v.extend({}, t), opts:v.extend(!0, {specialEasing:{}}, n), originalProperties:t, originalOptions:n, startTime:qn || $n(), duration:n.duration, tweens:[], createTween:function (t, n, r) {
            var i = v.Tween(e, f.opts, t, n, f.opts.specialEasing[t] || f.opts.easing);
            return f.tweens.push(i), i
        }, stop:function (t) {
            var n = 0, r = t ? f.tweens.length : 0;
            for (; n < r; n++)f.tweens[n].run(1);
            return t ? u.resolveWith(e, [f, t]) : u.rejectWith(e, [f, t]), this
        }}), l = f.props;
        Qn(l, f.opts.specialEasing);
        for (; i < o; i++) {
            r = Xn[i].call(f, e, l, f.opts);
            if (r)return r
        }
        return Jn(f, l), v.isFunction(f.opts.start) && f.opts.start.call(e, f), v.fx.timer(v.extend(a, {anim:f, queue:f.opts.queue, elem:e})), f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always)
    }

    function Qn(e, t) {
        var n, r, i, s, o;
        for (n in e) {
            r = v.camelCase(n), i = t[r], s = e[n], v.isArray(s) && (i = s[1], s = e[n] = s[0]), n !== r && (e[r] = s, delete e[n]), o = v.cssHooks[r];
            if (o && "expand"in o) {
                s = o.expand(s), delete e[r];
                for (n in s)n in e || (e[n] = s[n], t[n] = i)
            } else t[r] = i
        }
    }

    function Gn(e, t, n) {
        var r, i, s, o, u, a, f, l, c = this, h = e.style, p = {}, d = [], m = e.nodeType && Gt(e);
        n.queue || (f = v._queueHooks(e, "fx"), f.unqueued == null && (f.unqueued = 0, l = f.empty.fire, f.empty.fire = function () {
            f.unqueued || l()
        }), f.unqueued++, c.always(function () {
            c.always(function () {
                f.unqueued--, v.queue(e, "fx").length || f.empty.fire()
            })
        })), e.nodeType === 1 && ("height"in t || "width"in t) && (n.overflow = [h.overflow, h.overflowX, h.overflowY], v.css(e, "display") === "inline" && v.css(e, "float") === "none" && (!v.support.inlineBlockNeedsLayout || nn(e.nodeName) === "inline" ? h.display = "inline-block" : h.zoom = 1)), n.overflow && (h.overflow = "hidden", v.support.shrinkWrapBlocks || c.done(function () {
            h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
        }));
        for (r in t) {
            s = t[r];
            if (Un.exec(s)) {
                delete t[r];
                if (s === (m ? "hide" : "show"))continue;
                d.push(r)
            }
        }
        o = d.length;
        if (o) {
            u = v._data(e, "fxshow") || v._data(e, "fxshow", {}), m ? v(e).show() : c.done(function () {
                v(e).hide()
            }), c.done(function () {
                var t;
                v.removeData(e, "fxshow", !0);
                for (t in p)v.style(e, t, p[t])
            });
            for (r = 0; r < o; r++)i = d[r], a = c.createTween(i, m ? u[i] : 0), p[i] = u[i] || v.style(e, i), i in u || (u[i] = a.start, m && (a.end = a.start, a.start = i === "width" || i === "height" ? 1 : 0))
        }
    }

    function Yn(e, t, n, r, i) {
        return new Yn.prototype.init(e, t, n, r, i)
    }

    function Zn(e, t) {
        var n, r = {height:e}, i = 0;
        t = t ? 1 : 0;
        for (; i < 4; i += 2 - t)n = $t[i], r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e), r
    }

    function tr(e) {
        return v.isWindow(e) ? e : e.nodeType === 9 ? e.defaultView || e.parentWindow : !1
    }

    var n, r, i = e.document, s = e.location, o = e.navigator, u = e.jQuery, a = e.$, f = Array.prototype.push, l = Array.prototype.slice, c = Array.prototype.indexOf, h = Object.prototype.toString, p = Object.prototype.hasOwnProperty, d = String.prototype.trim, v = function (e, t) {
        return new v.fn.init(e, t, n)
    }, m = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source, g = /\S/, y = /\s+/, b = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, w = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, E = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, S = /^[\],:{}\s]*$/, x = /(?:^|:|,)(?:\s*\[)+/g, T = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, N = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g, C = /^-ms-/, k = /-([\da-z])/gi, L = function (e, t) {
        return(t + "").toUpperCase()
    }, A = function () {
        i.addEventListener ? (i.removeEventListener("DOMContentLoaded", A, !1), v.ready()) : i.readyState === "complete" && (i.detachEvent("onreadystatechange", A), v.ready())
    }, O = {};
    v.fn = v.prototype = {constructor:v, init:function (e, n, r) {
        var s, o, u, a;
        if (!e)return this;
        if (e.nodeType)return this.context = this[0] = e, this.length = 1, this;
        if (typeof e == "string") {
            e.charAt(0) === "<" && e.charAt(e.length - 1) === ">" && e.length >= 3 ? s = [null, e, null] : s = w.exec(e);
            if (s && (s[1] || !n)) {
                if (s[1])return n = n instanceof v ? n[0] : n, a = n && n.nodeType ? n.ownerDocument || n : i, e = v.parseHTML(s[1], a, !0), E.test(s[1]) && v.isPlainObject(n) && this.attr.call(e, n, !0), v.merge(this, e);
                o = i.getElementById(s[2]);
                if (o && o.parentNode) {
                    if (o.id !== s[2])return r.find(e);
                    this.length = 1, this[0] = o
                }
                return this.context = i, this.selector = e, this
            }
            return!n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e)
        }
        return v.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), v.makeArray(e, this))
    }, selector:"", jquery:"1.8.2", length:0, size:function () {
        return this.length
    }, toArray:function () {
        return l.call(this)
    }, get:function (e) {
        return e == null ? this.toArray() : e < 0 ? this[this.length + e] : this[e]
    }, pushStack:function (e, t, n) {
        var r = v.merge(this.constructor(), e);
        return r.prevObject = this, r.context = this.context, t === "find" ? r.selector = this.selector + (this.selector ? " " : "") + n : t && (r.selector = this.selector + "." + t + "(" + n + ")"), r
    }, each:function (e, t) {
        return v.each(this, e, t)
    }, ready:function (e) {
        return v.ready.promise().done(e), this
    }, eq:function (e) {
        return e = +e, e === -1 ? this.slice(e) : this.slice(e, e + 1)
    }, first:function () {
        return this.eq(0)
    }, last:function () {
        return this.eq(-1)
    }, slice:function () {
        return this.pushStack(l.apply(this, arguments), "slice", l.call(arguments).join(","))
    }, map:function (e) {
        return this.pushStack(v.map(this, function (t, n) {
            return e.call(t, n, t)
        }))
    }, end:function () {
        return this.prevObject || this.constructor(null)
    }, push:f, sort:[].sort, splice:[].splice}, v.fn.init.prototype = v.fn, v.extend = v.fn.extend = function () {
        var e, n, r, i, s, o, u = arguments[0] || {}, a = 1, f = arguments.length, l = !1;
        typeof u == "boolean" && (l = u, u = arguments[1] || {}, a = 2), typeof u != "object" && !v.isFunction(u) && (u = {}), f === a && (u = this, --a);
        for (; a < f; a++)if ((e = arguments[a]) != null)for (n in e) {
            r = u[n], i = e[n];
            if (u === i)continue;
            l && i && (v.isPlainObject(i) || (s = v.isArray(i))) ? (s ? (s = !1, o = r && v.isArray(r) ? r : []) : o = r && v.isPlainObject(r) ? r : {}, u[n] = v.extend(l, o, i)) : i !== t && (u[n] = i)
        }
        return u
    }, v.extend({noConflict:function (t) {
        return e.$ === v && (e.$ = a), t && e.jQuery === v && (e.jQuery = u), v
    }, isReady:!1, readyWait:1, holdReady:function (e) {
        e ? v.readyWait++ : v.ready(!0)
    }, ready:function (e) {
        if (e === !0 ? --v.readyWait : v.isReady)return;
        if (!i.body)return setTimeout(v.ready, 1);
        v.isReady = !0;
        if (e !== !0 && --v.readyWait > 0)return;
        r.resolveWith(i, [v]), v.fn.trigger && v(i).trigger("ready").off("ready")
    }, isFunction:function (e) {
        return v.type(e) === "function"
    }, isArray:Array.isArray || function (e) {
        return v.type(e) === "array"
    }, isWindow:function (e) {
        return e != null && e == e.window
    }, isNumeric:function (e) {
        return!isNaN(parseFloat(e)) && isFinite(e)
    }, type:function (e) {
        return e == null ? String(e) : O[h.call(e)] || "object"
    }, isPlainObject:function (e) {
        if (!e || v.type(e) !== "object" || e.nodeType || v.isWindow(e))return!1;
        try {
            if (e.constructor && !p.call(e, "constructor") && !p.call(e.constructor.prototype, "isPrototypeOf"))return!1
        } catch (n) {
            return!1
        }
        var r;
        for (r in e);
        return r === t || p.call(e, r)
    }, isEmptyObject:function (e) {
        var t;
        for (t in e)return!1;
        return!0
    }, error:function (e) {
        throw new Error(e)
    }, parseHTML:function (e, t, n) {
        var r;
        return!e || typeof e != "string" ? null : (typeof t == "boolean" && (n = t, t = 0), t = t || i, (r = E.exec(e)) ? [t.createElement(r[1])] : (r = v.buildFragment([e], t, n ? null : []), v.merge([], (r.cacheable ? v.clone(r.fragment) : r.fragment).childNodes)))
    }, parseJSON:function (t) {
        if (!t || typeof t != "string")return null;
        t = v.trim(t);
        if (e.JSON && e.JSON.parse)return e.JSON.parse(t);
        if (S.test(t.replace(T, "@").replace(N, "]").replace(x, "")))return(new Function("return " + t))();
        v.error("Invalid JSON: " + t)
    }, parseXML:function (n) {
        var r, i;
        if (!n || typeof n != "string")return null;
        try {
            e.DOMParser ? (i = new DOMParser, r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n))
        } catch (s) {
            r = t
        }
        return(!r || !r.documentElement || r.getElementsByTagName("parsererror").length) && v.error("Invalid XML: " + n), r
    }, noop:function () {
    }, globalEval:function (t) {
        t && g.test(t) && (e.execScript || function (t) {
            e.eval.call(e, t)
        })(t)
    }, camelCase:function (e) {
        return e.replace(C, "ms-").replace(k, L)
    }, nodeName:function (e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }, each:function (e, n, r) {
        var i, s = 0, o = e.length, u = o === t || v.isFunction(e);
        if (r) {
            if (u) {
                for (i in e)if (n.apply(e[i], r) === !1)break
            } else for (; s < o;)if (n.apply(e[s++], r) === !1)break
        } else if (u) {
            for (i in e)if (n.call(e[i], i, e[i]) === !1)break
        } else for (; s < o;)if (n.call(e[s], s, e[s++]) === !1)break;
        return e
    }, trim:d && !d.call("﻿ ") ? function (e) {
        return e == null ? "" : d.call(e)
    } : function (e) {
        return e == null ? "" : (e + "").replace(b, "")
    }, makeArray:function (e, t) {
        var n, r = t || [];
        return e != null && (n = v.type(e), e.length == null || n === "string" || n === "function" || n === "regexp" || v.isWindow(e) ? f.call(r, e) : v.merge(r, e)), r
    }, inArray:function (e, t, n) {
        var r;
        if (t) {
            if (c)return c.call(t, e, n);
            r = t.length, n = n ? n < 0 ? Math.max(0, r + n) : n : 0;
            for (; n < r; n++)if (n in t && t[n] === e)return n
        }
        return-1
    }, merge:function (e, n) {
        var r = n.length, i = e.length, s = 0;
        if (typeof r == "number")for (; s < r; s++)e[i++] = n[s]; else while (n[s] !== t)e[i++] = n[s++];
        return e.length = i, e
    }, grep:function (e, t, n) {
        var r, i = [], s = 0, o = e.length;
        n = !!n;
        for (; s < o; s++)r = !!t(e[s], s), n !== r && i.push(e[s]);
        return i
    }, map:function (e, n, r) {
        var i, s, o = [], u = 0, a = e.length, f = e instanceof v || a !== t && typeof a == "number" && (a > 0 && e[0] && e[a - 1] || a === 0 || v.isArray(e));
        if (f)for (; u < a; u++)i = n(e[u], u, r), i != null && (o[o.length] = i); else for (s in e)i = n(e[s], s, r), i != null && (o[o.length] = i);
        return o.concat.apply([], o)
    }, guid:1, proxy:function (e, n) {
        var r, i, s;
        return typeof n == "string" && (r = e[n], n = e, e = r), v.isFunction(e) ? (i = l.call(arguments, 2), s = function () {
            return e.apply(n, i.concat(l.call(arguments)))
        }, s.guid = e.guid = e.guid || v.guid++, s) : t
    }, access:function (e, n, r, i, s, o, u) {
        var a, f = r == null, l = 0, c = e.length;
        if (r && typeof r == "object") {
            for (l in r)v.access(e, n, l, r[l], 1, o, i);
            s = 1
        } else if (i !== t) {
            a = u === t && v.isFunction(i), f && (a ? (a = n, n = function (e, t, n) {
                return a.call(v(e), n)
            }) : (n.call(e, i), n = null));
            if (n)for (; l < c; l++)n(e[l], r, a ? i.call(e[l], l, n(e[l], r)) : i, u);
            s = 1
        }
        return s ? e : f ? n.call(e) : c ? n(e[0], r) : o
    }, now:function () {
        return(new Date).getTime()
    }}), v.ready.promise = function (t) {
        if (!r) {
            r = v.Deferred();
            if (i.readyState === "complete")setTimeout(v.ready, 1); else if (i.addEventListener)i.addEventListener("DOMContentLoaded", A, !1), e.addEventListener("load", v.ready, !1); else {
                i.attachEvent("onreadystatechange", A), e.attachEvent("onload", v.ready);
                var n = !1;
                try {
                    n = e.frameElement == null && i.documentElement
                } catch (s) {
                }
                n && n.doScroll && function o() {
                    if (!v.isReady) {
                        try {
                            n.doScroll("left")
                        } catch (e) {
                            return setTimeout(o, 50)
                        }
                        v.ready()
                    }
                }()
            }
        }
        return r.promise(t)
    }, v.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (e, t) {
        O["[object " + t + "]"] = t.toLowerCase()
    }), n = v(i);
    var M = {};
    v.Callbacks = function (e) {
        e = typeof e == "string" ? M[e] || _(e) : v.extend({}, e);
        var n, r, i, s, o, u, a = [], f = !e.once && [], l = function (t) {
            n = e.memory && t, r = !0, u = s || 0, s = 0, o = a.length, i = !0;
            for (; a && u < o; u++)if (a[u].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                n = !1;
                break
            }
            i = !1, a && (f ? f.length && l(f.shift()) : n ? a = [] : c.disable())
        }, c = {add:function () {
            if (a) {
                var t = a.length;
                (function r(t) {
                    v.each(t, function (t, n) {
                        var i = v.type(n);
                        i === "function" && (!e.unique || !c.has(n)) ? a.push(n) : n && n.length && i !== "string" && r(n)
                    })
                })(arguments), i ? o = a.length : n && (s = t, l(n))
            }
            return this
        }, remove:function () {
            return a && v.each(arguments, function (e, t) {
                var n;
                while ((n = v.inArray(t, a, n)) > -1)a.splice(n, 1), i && (n <= o && o--, n <= u && u--)
            }), this
        }, has:function (e) {
            return v.inArray(e, a) > -1
        }, empty:function () {
            return a = [], this
        }, disable:function () {
            return a = f = n = t, this
        }, disabled:function () {
            return!a
        }, lock:function () {
            return f = t, n || c.disable(), this
        }, locked:function () {
            return!f
        }, fireWith:function (e, t) {
            return t = t || [], t = [e, t.slice ? t.slice() : t], a && (!r || f) && (i ? f.push(t) : l(t)), this
        }, fire:function () {
            return c.fireWith(this, arguments), this
        }, fired:function () {
            return!!r
        }};
        return c
    }, v.extend({Deferred:function (e) {
        var t = [
            ["resolve", "done", v.Callbacks("once memory"), "resolved"],
            ["reject", "fail", v.Callbacks("once memory"), "rejected"],
            ["notify", "progress", v.Callbacks("memory")]
        ], n = "pending", r = {state:function () {
            return n
        }, always:function () {
            return i.done(arguments).fail(arguments), this
        }, then:function () {
            var e = arguments;
            return v.Deferred(function (n) {
                v.each(t, function (t, r) {
                    var s = r[0], o = e[t];
                    i[r[1]](v.isFunction(o) ? function () {
                        var e = o.apply(this, arguments);
                        e && v.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s + "With"](this === i ? n : this, [e])
                    } : n[s])
                }), e = null
            }).promise()
        }, promise:function (e) {
            return e != null ? v.extend(e, r) : r
        }}, i = {};
        return r.pipe = r.then, v.each(t, function (e, s) {
            var o = s[2], u = s[3];
            r[s[1]] = o.add, u && o.add(function () {
                n = u
            }, t[e ^ 1][2].disable, t[2][2].lock), i[s[0]] = o.fire, i[s[0] + "With"] = o.fireWith
        }), r.promise(i), e && e.call(i, i), i
    }, when:function (e) {
        var t = 0, n = l.call(arguments), r = n.length, i = r !== 1 || e && v.isFunction(e.promise) ? r : 0, s = i === 1 ? e : v.Deferred(), o = function (e, t, n) {
            return function (r) {
                t[e] = this, n[e] = arguments.length > 1 ? l.call(arguments) : r, n === u ? s.notifyWith(t, n) : --i || s.resolveWith(t, n)
            }
        }, u, a, f;
        if (r > 1) {
            u = new Array(r), a = new Array(r), f = new Array(r);
            for (; t < r; t++)n[t] && v.isFunction(n[t].promise) ? n[t].promise().done(o(t, f, n)).fail(s.reject).progress(o(t, a, u)) : --i
        }
        return i || s.resolveWith(f, n), s.promise()
    }}), v.support = function () {
        var t, n, r, s, o, u, a, f, l, c, h, p = i.createElement("div");
        p.setAttribute("className", "t"), p.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = p.getElementsByTagName("*"), r = p.getElementsByTagName("a")[0], r.style.cssText = "top:1px;float:left;opacity:.5";
        if (!n || !n.length)return{};
        s = i.createElement("select"), o = s.appendChild(i.createElement("option")), u = p.getElementsByTagName("input")[0], t = {leadingWhitespace:p.firstChild.nodeType === 3, tbody:!p.getElementsByTagName("tbody").length, htmlSerialize:!!p.getElementsByTagName("link").length, style:/top/.test(r.getAttribute("style")), hrefNormalized:r.getAttribute("href") === "/a", opacity:/^0.5/.test(r.style.opacity), cssFloat:!!r.style.cssFloat, checkOn:u.value === "on", optSelected:o.selected, getSetAttribute:p.className !== "t", enctype:!!i.createElement("form").enctype, html5Clone:i.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>", boxModel:i.compatMode === "CSS1Compat", submitBubbles:!0, changeBubbles:!0, focusinBubbles:!1, deleteExpando:!0, noCloneEvent:!0, inlineBlockNeedsLayout:!1, shrinkWrapBlocks:!1, reliableMarginRight:!0, boxSizingReliable:!0, pixelPosition:!1}, u.checked = !0, t.noCloneChecked = u.cloneNode(!0).checked, s.disabled = !0, t.optDisabled = !o.disabled;
        try {
            delete p.test
        } catch (d) {
            t.deleteExpando = !1
        }
        !p.addEventListener && p.attachEvent && p.fireEvent && (p.attachEvent("onclick", h = function () {
            t.noCloneEvent = !1
        }), p.cloneNode(!0).fireEvent("onclick"), p.detachEvent("onclick", h)), u = i.createElement("input"), u.value = "t", u.setAttribute("type", "radio"), t.radioValue = u.value === "t", u.setAttribute("checked", "checked"), u.setAttribute("name", "t"), p.appendChild(u), a = i.createDocumentFragment(), a.appendChild(p.lastChild), t.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked, t.appendChecked = u.checked, a.removeChild(u), a.appendChild(p);
        if (p.attachEvent)for (l in{submit:!0, change:!0, focusin:!0})f = "on" + l, c = f in p, c || (p.setAttribute(f, "return;"), c = typeof p[f] == "function"), t[l + "Bubbles"] = c;
        return v(function () {
            var n, r, s, o, u = "padding:0;margin:0;border:0;display:block;overflow:hidden;", a = i.getElementsByTagName("body")[0];
            if (!a)return;
            n = i.createElement("div"), n.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", a.insertBefore(n, a.firstChild), r = i.createElement("div"), n.appendChild(r), r.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", s = r.getElementsByTagName("td"), s[0].style.cssText = "padding:0;margin:0;border:0;display:none", c = s[0].offsetHeight === 0, s[0].style.display = "", s[1].style.display = "none", t.reliableHiddenOffsets = c && s[0].offsetHeight === 0, r.innerHTML = "", r.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", t.boxSizing = r.offsetWidth === 4, t.doesNotIncludeMarginInBodyOffset = a.offsetTop !== 1, e.getComputedStyle && (t.pixelPosition = (e.getComputedStyle(r, null) || {}).top !== "1%", t.boxSizingReliable = (e.getComputedStyle(r, null) || {width:"4px"}).width === "4px", o = i.createElement("div"), o.style.cssText = r.style.cssText = u, o.style.marginRight = o.style.width = "0", r.style.width = "1px", r.appendChild(o), t.reliableMarginRight = !parseFloat((e.getComputedStyle(o, null) || {}).marginRight)), typeof r.style.zoom != "undefined" && (r.innerHTML = "", r.style.cssText = u + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = r.offsetWidth === 3, r.style.display = "block", r.style.overflow = "visible", r.innerHTML = "<div></div>", r.firstChild.style.width = "5px", t.shrinkWrapBlocks = r.offsetWidth !== 3, n.style.zoom = 1), a.removeChild(n), n = r = s = o = null
        }), a.removeChild(p), n = r = s = o = u = a = p = null, t
    }();
    var D = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, P = /([A-Z])/g;
    v.extend({cache:{}, deletedIds:[], uuid:0, expando:"jQuery" + (v.fn.jquery + Math.random()).replace(/\D/g, ""), noData:{embed:!0, object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet:!0}, hasData:function (e) {
        return e = e.nodeType ? v.cache[e[v.expando]] : e[v.expando], !!e && !B(e)
    }, data:function (e, n, r, i) {
        if (!v.acceptData(e))return;
        var s, o, u = v.expando, a = typeof n == "string", f = e.nodeType, l = f ? v.cache : e, c = f ? e[u] : e[u] && u;
        if ((!c || !l[c] || !i && !l[c].data) && a && r === t)return;
        c || (f ? e[u] = c = v.deletedIds.pop() || v.guid++ : c = u), l[c] || (l[c] = {}, f || (l[c].toJSON = v.noop));
        if (typeof n == "object" || typeof n == "function")i ? l[c] = v.extend(l[c], n) : l[c].data = v.extend(l[c].data, n);
        return s = l[c], i || (s.data || (s.data = {}), s = s.data), r !== t && (s[v.camelCase(n)] = r), a ? (o = s[n], o == null && (o = s[v.camelCase(n)])) : o = s, o
    }, removeData:function (e, t, n) {
        if (!v.acceptData(e))return;
        var r, i, s, o = e.nodeType, u = o ? v.cache : e, a = o ? e[v.expando] : v.expando;
        if (!u[a])return;
        if (t) {
            r = n ? u[a] : u[a].data;
            if (r) {
                v.isArray(t) || (t in r ? t = [t] : (t = v.camelCase(t), t in r ? t = [t] : t = t.split(" ")));
                for (i = 0, s = t.length; i < s; i++)delete r[t[i]];
                if (!(n ? B : v.isEmptyObject)(r))return
            }
        }
        if (!n) {
            delete u[a].data;
            if (!B(u[a]))return
        }
        o ? v.cleanData([e], !0) : v.support.deleteExpando || u != u.window ? delete u[a] : u[a] = null
    }, _data:function (e, t, n) {
        return v.data(e, t, n, !0)
    }, acceptData:function (e) {
        var t = e.nodeName && v.noData[e.nodeName.toLowerCase()];
        return!t || t !== !0 && e.getAttribute("classid") === t
    }}), v.fn.extend({data:function (e, n) {
        var r, i, s, o, u, a = this[0], f = 0, l = null;
        if (e === t) {
            if (this.length) {
                l = v.data(a);
                if (a.nodeType === 1 && !v._data(a, "parsedAttrs")) {
                    s = a.attributes;
                    for (u = s.length; f < u; f++)o = s[f].name, o.indexOf("data-") || (o = v.camelCase(o.substring(5)), H(a, o, l[o]));
                    v._data(a, "parsedAttrs", !0)
                }
            }
            return l
        }
        return typeof e == "object" ? this.each(function () {
            v.data(this, e)
        }) : (r = e.split(".", 2), r[1] = r[1] ? "." + r[1] : "", i = r[1] + "!", v.access(this, function (n) {
            if (n === t)return l = this.triggerHandler("getData" + i, [r[0]]), l === t && a && (l = v.data(a, e), l = H(a, e, l)), l === t && r[1] ? this.data(r[0]) : l;
            r[1] = n, this.each(function () {
                var t = v(this);
                t.triggerHandler("setData" + i, r), v.data(this, e, n), t.triggerHandler("changeData" + i, r)
            })
        }, null, n, arguments.length > 1, null, !1))
    }, removeData:function (e) {
        return this.each(function () {
            v.removeData(this, e)
        })
    }}), v.extend({queue:function (e, t, n) {
        var r;
        if (e)return t = (t || "fx") + "queue", r = v._data(e, t), n && (!r || v.isArray(n) ? r = v._data(e, t, v.makeArray(n)) : r.push(n)), r || []
    }, dequeue:function (e, t) {
        t = t || "fx";
        var n = v.queue(e, t), r = n.length, i = n.shift(), s = v._queueHooks(e, t), o = function () {
            v.dequeue(e, t)
        };
        i === "inprogress" && (i = n.shift(), r--), i && (t === "fx" && n.unshift("inprogress"), delete s.stop, i.call(e, o, s)), !r && s && s.empty.fire()
    }, _queueHooks:function (e, t) {
        var n = t + "queueHooks";
        return v._data(e, n) || v._data(e, n, {empty:v.Callbacks("once memory").add(function () {
            v.removeData(e, t + "queue", !0), v.removeData(e, n, !0)
        })})
    }}), v.fn.extend({queue:function (e, n) {
        var r = 2;
        return typeof e != "string" && (n = e, e = "fx", r--), arguments.length < r ? v.queue(this[0], e) : n === t ? this : this.each(function () {
            var t = v.queue(this, e, n);
            v._queueHooks(this, e), e === "fx" && t[0] !== "inprogress" && v.dequeue(this, e)
        })
    }, dequeue:function (e) {
        return this.each(function () {
            v.dequeue(this, e)
        })
    }, delay:function (e, t) {
        return e = v.fx ? v.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
            var r = setTimeout(t, e);
            n.stop = function () {
                clearTimeout(r)
            }
        })
    }, clearQueue:function (e) {
        return this.queue(e || "fx", [])
    }, promise:function (e, n) {
        var r, i = 1, s = v.Deferred(), o = this, u = this.length, a = function () {
            --i || s.resolveWith(o, [o])
        };
        typeof e != "string" && (n = e, e = t), e = e || "fx";
        while (u--)r = v._data(o[u], e + "queueHooks"), r && r.empty && (i++, r.empty.add(a));
        return a(), s.promise(n)
    }});
    var j, F, I, q = /[\t\r\n]/g, R = /\r/g, U = /^(?:button|input)$/i, z = /^(?:button|input|object|select|textarea)$/i, W = /^a(?:rea|)$/i, X = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, V = v.support.getSetAttribute;
    v.fn.extend({attr:function (e, t) {
        return v.access(this, v.attr, e, t, arguments.length > 1)
    }, removeAttr:function (e) {
        return this.each(function () {
            v.removeAttr(this, e)
        })
    }, prop:function (e, t) {
        return v.access(this, v.prop, e, t, arguments.length > 1)
    }, removeProp:function (e) {
        return e = v.propFix[e] || e, this.each(function () {
            try {
                this[e] = t, delete this[e]
            } catch (n) {
            }
        })
    }, addClass:function (e) {
        var t, n, r, i, s, o, u;
        if (v.isFunction(e))return this.each(function (t) {
            v(this).addClass(e.call(this, t, this.className))
        });
        if (e && typeof e == "string") {
            t = e.split(y);
            for (n = 0, r = this.length; n < r; n++) {
                i = this[n];
                if (i.nodeType === 1)if (!i.className && t.length === 1)i.className = e; else {
                    s = " " + i.className + " ";
                    for (o = 0, u = t.length; o < u; o++)s.indexOf(" " + t[o] + " ") < 0 && (s += t[o] + " ");
                    i.className = v.trim(s)
                }
            }
        }
        return this
    }, removeClass:function (e) {
        var n, r, i, s, o, u, a;
        if (v.isFunction(e))return this.each(function (t) {
            v(this).removeClass(e.call(this, t, this.className))
        });
        if (e && typeof e == "string" || e === t) {
            n = (e || "").split(y);
            for (u = 0, a = this.length; u < a; u++) {
                i = this[u];
                if (i.nodeType === 1 && i.className) {
                    r = (" " + i.className + " ").replace(q, " ");
                    for (s = 0, o = n.length; s < o; s++)while (r.indexOf(" " + n[s] + " ") >= 0)r = r.replace(" " + n[s] + " ", " ");
                    i.className = e ? v.trim(r) : ""
                }
            }
        }
        return this
    }, toggleClass:function (e, t) {
        var n = typeof e, r = typeof t == "boolean";
        return v.isFunction(e) ? this.each(function (n) {
            v(this).toggleClass(e.call(this, n, this.className, t), t)
        }) : this.each(function () {
            if (n === "string") {
                var i, s = 0, o = v(this), u = t, a = e.split(y);
                while (i = a[s++])u = r ? u : !o.hasClass(i), o[u ? "addClass" : "removeClass"](i)
            } else if (n === "undefined" || n === "boolean")this.className && v._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : v._data(this, "__className__") || ""
        })
    }, hasClass:function (e) {
        var t = " " + e + " ", n = 0, r = this.length;
        for (; n < r; n++)if (this[n].nodeType === 1 && (" " + this[n].className + " ").replace(q, " ").indexOf(t) >= 0)return!0;
        return!1
    }, val:function (e) {
        var n, r, i, s = this[0];
        if (!arguments.length) {
            if (s)return n = v.valHooks[s.type] || v.valHooks[s.nodeName.toLowerCase()], n && "get"in n && (r = n.get(s, "value")) !== t ? r : (r = s.value, typeof r == "string" ? r.replace(R, "") : r == null ? "" : r);
            return
        }
        return i = v.isFunction(e), this.each(function (r) {
            var s, o = v(this);
            if (this.nodeType !== 1)return;
            i ? s = e.call(this, r, o.val()) : s = e, s == null ? s = "" : typeof s == "number" ? s += "" : v.isArray(s) && (s = v.map(s, function (e) {
                return e == null ? "" : e + ""
            })), n = v.valHooks[this.type] || v.valHooks[this.nodeName.toLowerCase()];
            if (!n || !("set"in n) || n.set(this, s, "value") === t)this.value = s
        })
    }}), v.extend({valHooks:{option:{get:function (e) {
        var t = e.attributes.value;
        return!t || t.specified ? e.value : e.text
    }}, select:{get:function (e) {
        var t, n, r, i, s = e.selectedIndex, o = [], u = e.options, a = e.type === "select-one";
        if (s < 0)return null;
        n = a ? s : 0, r = a ? s + 1 : u.length;
        for (; n < r; n++) {
            i = u[n];
            if (i.selected && (v.support.optDisabled ? !i.disabled : i.getAttribute("disabled") === null) && (!i.parentNode.disabled || !v.nodeName(i.parentNode, "optgroup"))) {
                t = v(i).val();
                if (a)return t;
                o.push(t)
            }
        }
        return a && !o.length && u.length ? v(u[s]).val() : o
    }, set:function (e, t) {
        var n = v.makeArray(t);
        return v(e).find("option").each(function () {
            this.selected = v.inArray(v(this).val(), n) >= 0
        }), n.length || (e.selectedIndex = -1), n
    }}}, attrFn:{}, attr:function (e, n, r, i) {
        var s, o, u, a = e.nodeType;
        if (!e || a === 3 || a === 8 || a === 2)return;
        if (i && v.isFunction(v.fn[n]))return v(e)[n](r);
        if (typeof e.getAttribute == "undefined")return v.prop(e, n, r);
        u = a !== 1 || !v.isXMLDoc(e), u && (n = n.toLowerCase(), o = v.attrHooks[n] || (X.test(n) ? F : j));
        if (r !== t) {
            if (r === null) {
                v.removeAttr(e, n);
                return
            }
            return o && "set"in o && u && (s = o.set(e, r, n)) !== t ? s : (e.setAttribute(n, r + ""), r)
        }
        return o && "get"in o && u && (s = o.get(e, n)) !== null ? s : (s = e.getAttribute(n), s === null ? t : s)
    }, removeAttr:function (e, t) {
        var n, r, i, s, o = 0;
        if (t && e.nodeType === 1) {
            r = t.split(y);
            for (; o < r.length; o++)i = r[o], i && (n = v.propFix[i] || i, s = X.test(i), s || v.attr(e, i, ""), e.removeAttribute(V ? i : n), s && n in e && (e[n] = !1))
        }
    }, attrHooks:{type:{set:function (e, t) {
        if (U.test(e.nodeName) && e.parentNode)v.error("type property can't be changed"); else if (!v.support.radioValue && t === "radio" && v.nodeName(e, "input")) {
            var n = e.value;
            return e.setAttribute("type", t), n && (e.value = n), t
        }
    }}, value:{get:function (e, t) {
        return j && v.nodeName(e, "button") ? j.get(e, t) : t in e ? e.value : null
    }, set:function (e, t, n) {
        if (j && v.nodeName(e, "button"))return j.set(e, t, n);
        e.value = t
    }}}, propFix:{tabindex:"tabIndex", readonly:"readOnly", "for":"htmlFor", "class":"className", maxlength:"maxLength", cellspacing:"cellSpacing", cellpadding:"cellPadding", rowspan:"rowSpan", colspan:"colSpan", usemap:"useMap", frameborder:"frameBorder", contenteditable:"contentEditable"}, prop:function (e, n, r) {
        var i, s, o, u = e.nodeType;
        if (!e || u === 3 || u === 8 || u === 2)return;
        return o = u !== 1 || !v.isXMLDoc(e), o && (n = v.propFix[n] || n, s = v.propHooks[n]), r !== t ? s && "set"in s && (i = s.set(e, r, n)) !== t ? i : e[n] = r : s && "get"in s && (i = s.get(e, n)) !== null ? i : e[n]
    }, propHooks:{tabIndex:{get:function (e) {
        var n = e.getAttributeNode("tabindex");
        return n && n.specified ? parseInt(n.value, 10) : z.test(e.nodeName) || W.test(e.nodeName) && e.href ? 0 : t
    }}}}), F = {get:function (e, n) {
        var r, i = v.prop(e, n);
        return i === !0 || typeof i != "boolean" && (r = e.getAttributeNode(n)) && r.nodeValue !== !1 ? n.toLowerCase() : t
    }, set:function (e, t, n) {
        var r;
        return t === !1 ? v.removeAttr(e, n) : (r = v.propFix[n] || n, r in e && (e[r] = !0), e.setAttribute(n, n.toLowerCase())), n
    }}, V || (I = {name:!0, id:!0, coords:!0}, j = v.valHooks.button = {get:function (e, n) {
        var r;
        return r = e.getAttributeNode(n), r && (I[n] ? r.value !== "" : r.specified) ? r.value : t
    }, set:function (e, t, n) {
        var r = e.getAttributeNode(n);
        return r || (r = i.createAttribute(n), e.setAttributeNode(r)), r.value = t + ""
    }}, v.each(["width", "height"], function (e, t) {
        v.attrHooks[t] = v.extend(v.attrHooks[t], {set:function (e, n) {
            if (n === "")return e.setAttribute(t, "auto"), n
        }})
    }), v.attrHooks.contenteditable = {get:j.get, set:function (e, t, n) {
        t === "" && (t = "false"), j.set(e, t, n)
    }}), v.support.hrefNormalized || v.each(["href", "src", "width", "height"], function (e, n) {
        v.attrHooks[n] = v.extend(v.attrHooks[n], {get:function (e) {
            var r = e.getAttribute(n, 2);
            return r === null ? t : r
        }})
    }), v.support.style || (v.attrHooks.style = {get:function (e) {
        return e.style.cssText.toLowerCase() || t
    }, set:function (e, t) {
        return e.style.cssText = t + ""
    }}), v.support.optSelected || (v.propHooks.selected = v.extend(v.propHooks.selected, {get:function (e) {
        var t = e.parentNode;
        return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
    }})), v.support.enctype || (v.propFix.enctype = "encoding"), v.support.checkOn || v.each(["radio", "checkbox"], function () {
        v.valHooks[this] = {get:function (e) {
            return e.getAttribute("value") === null ? "on" : e.value
        }}
    }), v.each(["radio", "checkbox"], function () {
        v.valHooks[this] = v.extend(v.valHooks[this], {set:function (e, t) {
            if (v.isArray(t))return e.checked = v.inArray(v(e).val(), t) >= 0
        }})
    });
    var $ = /^(?:textarea|input|select)$/i, J = /^([^\.]*|)(?:\.(.+)|)$/, K = /(?:^|\s)hover(\.\S+|)\b/, Q = /^key/, G = /^(?:mouse|contextmenu)|click/, Y = /^(?:focusinfocus|focusoutblur)$/, Z = function (e) {
        return v.event.special.hover ? e : e.replace(K, "mouseenter$1 mouseleave$1")
    };
    v.event = {add:function (e, n, r, i, s) {
        var o, u, a, f, l, c, h, p, d, m, g;
        if (e.nodeType === 3 || e.nodeType === 8 || !n || !r || !(o = v._data(e)))return;
        r.handler && (d = r, r = d.handler, s = d.selector), r.guid || (r.guid = v.guid++), a = o.events, a || (o.events = a = {}), u = o.handle, u || (o.handle = u = function (e) {
            return typeof v == "undefined" || !!e && v.event.triggered === e.type ? t : v.event.dispatch.apply(u.elem, arguments)
        }, u.elem = e), n = v.trim(Z(n)).split(" ");
        for (f = 0; f < n.length; f++) {
            l = J.exec(n[f]) || [], c = l[1], h = (l[2] || "").split(".").sort(), g = v.event.special[c] || {}, c = (s ? g.delegateType : g.bindType) || c, g = v.event.special[c] || {}, p = v.extend({type:c, origType:l[1], data:i, handler:r, guid:r.guid, selector:s, needsContext:s && v.expr.match.needsContext.test(s), namespace:h.join(".")}, d), m = a[c];
            if (!m) {
                m = a[c] = [], m.delegateCount = 0;
                if (!g.setup || g.setup.call(e, i, h, u) === !1)e.addEventListener ? e.addEventListener(c, u, !1) : e.attachEvent && e.attachEvent("on" + c, u)
            }
            g.add && (g.add.call(e, p), p.handler.guid || (p.handler.guid = r.guid)), s ? m.splice(m.delegateCount++, 0, p) : m.push(p), v.event.global[c] = !0
        }
        e = null
    }, global:{}, remove:function (e, t, n, r, i) {
        var s, o, u, a, f, l, c, h, p, d, m, g = v.hasData(e) && v._data(e);
        if (!g || !(h = g.events))return;
        t = v.trim(Z(t || "")).split(" ");
        for (s = 0; s < t.length; s++) {
            o = J.exec(t[s]) || [], u = a = o[1], f = o[2];
            if (!u) {
                for (u in h)v.event.remove(e, u + t[s], n, r, !0);
                continue
            }
            p = v.event.special[u] || {}, u = (r ? p.delegateType : p.bindType) || u, d = h[u] || [], l = d.length, f = f ? new RegExp("(^|\\.)" + f.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
            for (c = 0; c < d.length; c++)m = d[c], (i || a === m.origType) && (!n || n.guid === m.guid) && (!f || f.test(m.namespace)) && (!r || r === m.selector || r === "**" && m.selector) && (d.splice(c--, 1), m.selector && d.delegateCount--, p.remove && p.remove.call(e, m));
            d.length === 0 && l !== d.length && ((!p.teardown || p.teardown.call(e, f, g.handle) === !1) && v.removeEvent(e, u, g.handle), delete h[u])
        }
        v.isEmptyObject(h) && (delete g.handle, v.removeData(e, "events", !0))
    }, customEvent:{getData:!0, setData:!0, changeData:!0}, trigger:function (n, r, s, o) {
        if (!s || s.nodeType !== 3 && s.nodeType !== 8) {
            var u, a, f, l, c, h, p, d, m, g, y = n.type || n, b = [];
            if (Y.test(y + v.event.triggered))return;
            y.indexOf("!") >= 0 && (y = y.slice(0, -1), a = !0), y.indexOf(".") >= 0 && (b = y.split("."), y = b.shift(), b.sort());
            if ((!s || v.event.customEvent[y]) && !v.event.global[y])return;
            n = typeof n == "object" ? n[v.expando] ? n : new v.Event(y, n) : new v.Event(y), n.type = y, n.isTrigger = !0, n.exclusive = a, n.namespace = b.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + b.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, h = y.indexOf(":") < 0 ? "on" + y : "";
            if (!s) {
                u = v.cache;
                for (f in u)u[f].events && u[f].events[y] && v.event.trigger(n, r, u[f].handle.elem, !0);
                return
            }
            n.result = t, n.target || (n.target = s), r = r != null ? v.makeArray(r) : [], r.unshift(n), p = v.event.special[y] || {};
            if (p.trigger && p.trigger.apply(s, r) === !1)return;
            m = [
                [s, p.bindType || y]
            ];
            if (!o && !p.noBubble && !v.isWindow(s)) {
                g = p.delegateType || y, l = Y.test(g + y) ? s : s.parentNode;
                for (c = s; l; l = l.parentNode)m.push([l, g]), c = l;
                c === (s.ownerDocument || i) && m.push([c.defaultView || c.parentWindow || e, g])
            }
            for (f = 0; f < m.length && !n.isPropagationStopped(); f++)l = m[f][0], n.type = m[f][1], d = (v._data(l, "events") || {})[n.type] && v._data(l, "handle"), d && d.apply(l, r), d = h && l[h], d && v.acceptData(l) && d.apply && d.apply(l, r) === !1 && n.preventDefault();
            return n.type = y, !o && !n.isDefaultPrevented() && (!p._default || p._default.apply(s.ownerDocument, r) === !1) && (y !== "click" || !v.nodeName(s, "a")) && v.acceptData(s) && h && s[y] && (y !== "focus" && y !== "blur" || n.target.offsetWidth !== 0) && !v.isWindow(s) && (c = s[h], c && (s[h] = null), v.event.triggered = y, s[y](), v.event.triggered = t, c && (s[h] = c)), n.result
        }
        return
    }, dispatch:function (n) {
        n = v.event.fix(n || e.event);
        var r, i, s, o, u, a, f, c, h, p, d = (v._data(this, "events") || {})[n.type] || [], m = d.delegateCount, g = l.call(arguments), y = !n.exclusive && !n.namespace, b = v.event.special[n.type] || {}, w = [];
        g[0] = n, n.delegateTarget = this;
        if (b.preDispatch && b.preDispatch.call(this, n) === !1)return;
        if (m && (!n.button || n.type !== "click"))for (s = n.target; s != this; s = s.parentNode || this)if (s.disabled !== !0 || n.type !== "click") {
            u = {}, f = [];
            for (r = 0; r < m; r++)c = d[r], h = c.selector, u[h] === t && (u[h] = c.needsContext ? v(h, this).index(s) >= 0 : v.find(h, this, null, [s]).length), u[h] && f.push(c);
            f.length && w.push({elem:s, matches:f})
        }
        d.length > m && w.push({elem:this, matches:d.slice(m)});
        for (r = 0; r < w.length && !n.isPropagationStopped(); r++) {
            a = w[r], n.currentTarget = a.elem;
            for (i = 0; i < a.matches.length && !n.isImmediatePropagationStopped(); i++) {
                c = a.matches[i];
                if (y || !n.namespace && !c.namespace || n.namespace_re && n.namespace_re.test(c.namespace))n.data = c.data, n.handleObj = c, o = ((v.event.special[c.origType] || {}).handle || c.handler).apply(a.elem, g), o !== t && (n.result = o, o === !1 && (n.preventDefault(), n.stopPropagation()))
            }
        }
        return b.postDispatch && b.postDispatch.call(this, n), n.result
    }, props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks:{}, keyHooks:{props:"char charCode key keyCode".split(" "), filter:function (e, t) {
        return e.which == null && (e.which = t.charCode != null ? t.charCode : t.keyCode), e
    }}, mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter:function (e, n) {
        var r, s, o, u = n.button, a = n.fromElement;
        return e.pageX == null && n.clientX != null && (r = e.target.ownerDocument || i, s = r.documentElement, o = r.body, e.pageX = n.clientX + (s && s.scrollLeft || o && o.scrollLeft || 0) - (s && s.clientLeft || o && o.clientLeft || 0), e.pageY = n.clientY + (s && s.scrollTop || o && o.scrollTop || 0) - (s && s.clientTop || o && o.clientTop || 0)), !e.relatedTarget && a && (e.relatedTarget = a === e.target ? n.toElement : a), !e.which && u !== t && (e.which = u & 1 ? 1 : u & 2 ? 3 : u & 4 ? 2 : 0), e
    }}, fix:function (e) {
        if (e[v.expando])return e;
        var t, n, r = e, s = v.event.fixHooks[e.type] || {}, o = s.props ? this.props.concat(s.props) : this.props;
        e = v.Event(r);
        for (t = o.length; t;)n = o[--t], e[n] = r[n];
        return e.target || (e.target = r.srcElement || i), e.target.nodeType === 3 && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, s.filter ? s.filter(e, r) : e
    }, special:{load:{noBubble:!0}, focus:{delegateType:"focusin"}, blur:{delegateType:"focusout"}, beforeunload:{setup:function (e, t, n) {
        v.isWindow(this) && (this.onbeforeunload = n)
    }, teardown:function (e, t) {
        this.onbeforeunload === t && (this.onbeforeunload = null)
    }}}, simulate:function (e, t, n, r) {
        var i = v.extend(new v.Event, n, {type:e, isSimulated:!0, originalEvent:{}});
        r ? v.event.trigger(i, null, t) : v.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
    }}, v.event.handle = v.event.dispatch, v.removeEvent = i.removeEventListener ? function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    } : function (e, t, n) {
        var r = "on" + t;
        e.detachEvent && (typeof e[r] == "undefined" && (e[r] = null), e.detachEvent(r, n))
    }, v.Event = function (e, t) {
        if (!(this instanceof v.Event))return new v.Event(e, t);
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? tt : et) : this.type = e, t && v.extend(this, t), this.timeStamp = e && e.timeStamp || v.now(), this[v.expando] = !0
    }, v.Event.prototype = {preventDefault:function () {
        this.isDefaultPrevented = tt;
        var e = this.originalEvent;
        if (!e)return;
        e.preventDefault ? e.preventDefault() : e.returnValue = !1
    }, stopPropagation:function () {
        this.isPropagationStopped = tt;
        var e = this.originalEvent;
        if (!e)return;
        e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0
    }, stopImmediatePropagation:function () {
        this.isImmediatePropagationStopped = tt, this.stopPropagation()
    }, isDefaultPrevented:et, isPropagationStopped:et, isImmediatePropagationStopped:et}, v.each({mouseenter:"mouseover", mouseleave:"mouseout"}, function (e, t) {
        v.event.special[e] = {delegateType:t, bindType:t, handle:function (e) {
            var n, r = this, i = e.relatedTarget, s = e.handleObj, o = s.selector;
            if (!i || i !== r && !v.contains(r, i))e.type = s.origType, n = s.handler.apply(this, arguments), e.type = t;
            return n
        }}
    }), v.support.submitBubbles || (v.event.special.submit = {setup:function () {
        if (v.nodeName(this, "form"))return!1;
        v.event.add(this, "click._submit keypress._submit", function (e) {
            var n = e.target, r = v.nodeName(n, "input") || v.nodeName(n, "button") ? n.form : t;
            r && !v._data(r, "_submit_attached") && (v.event.add(r, "submit._submit", function (e) {
                e._submit_bubble = !0
            }), v._data(r, "_submit_attached", !0))
        })
    }, postDispatch:function (e) {
        e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && v.event.simulate("submit", this.parentNode, e, !0))
    }, teardown:function () {
        if (v.nodeName(this, "form"))return!1;
        v.event.remove(this, "._submit")
    }}), v.support.changeBubbles || (v.event.special.change = {setup:function () {
        if ($.test(this.nodeName)) {
            if (this.type === "checkbox" || this.type === "radio")v.event.add(this, "propertychange._change", function (e) {
                e.originalEvent.propertyName === "checked" && (this._just_changed = !0)
            }), v.event.add(this, "click._change", function (e) {
                this._just_changed && !e.isTrigger && (this._just_changed = !1), v.event.simulate("change", this, e, !0)
            });
            return!1
        }
        v.event.add(this, "beforeactivate._change", function (e) {
            var t = e.target;
            $.test(t.nodeName) && !v._data(t, "_change_attached") && (v.event.add(t, "change._change", function (e) {
                this.parentNode && !e.isSimulated && !e.isTrigger && v.event.simulate("change", this.parentNode, e, !0)
            }), v._data(t, "_change_attached", !0))
        })
    }, handle:function (e) {
        var t = e.target;
        if (this !== t || e.isSimulated || e.isTrigger || t.type !== "radio" && t.type !== "checkbox")return e.handleObj.handler.apply(this, arguments)
    }, teardown:function () {
        return v.event.remove(this, "._change"), !$.test(this.nodeName)
    }}), v.support.focusinBubbles || v.each({focus:"focusin", blur:"focusout"}, function (e, t) {
        var n = 0, r = function (e) {
            v.event.simulate(t, e.target, v.event.fix(e), !0)
        };
        v.event.special[t] = {setup:function () {
            n++ === 0 && i.addEventListener(e, r, !0)
        }, teardown:function () {
            --n === 0 && i.removeEventListener(e, r, !0)
        }}
    }), v.fn.extend({on:function (e, n, r, i, s) {
        var o, u;
        if (typeof e == "object") {
            typeof n != "string" && (r = r || n, n = t);
            for (u in e)this.on(u, n, r, e[u], s);
            return this
        }
        r == null && i == null ? (i = n, r = n = t) : i == null && (typeof n == "string" ? (i = r, r = t) : (i = r, r = n, n = t));
        if (i === !1)i = et; else if (!i)return this;
        return s === 1 && (o = i, i = function (e) {
            return v().off(e), o.apply(this, arguments)
        }, i.guid = o.guid || (o.guid = v.guid++)), this.each(function () {
            v.event.add(this, e, i, r, n)
        })
    }, one:function (e, t, n, r) {
        return this.on(e, t, n, r, 1)
    }, off:function (e, n, r) {
        var i, s;
        if (e && e.preventDefault && e.handleObj)return i = e.handleObj, v(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
        if (typeof e == "object") {
            for (s in e)this.off(s, n, e[s]);
            return this
        }
        if (n === !1 || typeof n == "function")r = n, n = t;
        return r === !1 && (r = et), this.each(function () {
            v.event.remove(this, e, r, n)
        })
    }, bind:function (e, t, n) {
        return this.on(e, null, t, n)
    }, unbind:function (e, t) {
        return this.off(e, null, t)
    }, live:function (e, t, n) {
        return v(this.context).on(e, this.selector, t, n), this
    }, die:function (e, t) {
        return v(this.context).off(e, this.selector || "**", t), this
    }, delegate:function (e, t, n, r) {
        return this.on(t, e, n, r)
    }, undelegate:function (e, t, n) {
        return arguments.length === 1 ? this.off(e, "**") : this.off(t, e || "**", n)
    }, trigger:function (e, t) {
        return this.each(function () {
            v.event.trigger(e, t, this)
        })
    }, triggerHandler:function (e, t) {
        if (this[0])return v.event.trigger(e, t, this[0], !0)
    }, toggle:function (e) {
        var t = arguments, n = e.guid || v.guid++, r = 0, i = function (n) {
            var i = (v._data(this, "lastToggle" + e.guid) || 0) % r;
            return v._data(this, "lastToggle" + e.guid, i + 1), n.preventDefault(), t[i].apply(this, arguments) || !1
        };
        i.guid = n;
        while (r < t.length)t[r++].guid = n;
        return this.click(i)
    }, hover:function (e, t) {
        return this.mouseenter(e).mouseleave(t || e)
    }}), v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
        v.fn[t] = function (e, n) {
            return n == null && (n = e, e = null), arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }, Q.test(t) && (v.event.fixHooks[t] = v.event.keyHooks), G.test(t) && (v.event.fixHooks[t] = v.event.mouseHooks)
    }), function (e, t) {
        function nt(e, t, n, r) {
            n = n || [], t = t || g;
            var i, s, a, f, l = t.nodeType;
            if (!e || typeof e != "string")return n;
            if (l !== 1 && l !== 9)return[];
            a = o(t);
            if (!a && !r)if (i = R.exec(e))if (f = i[1]) {
                if (l === 9) {
                    s = t.getElementById(f);
                    if (!s || !s.parentNode)return n;
                    if (s.id === f)return n.push(s), n
                } else if (t.ownerDocument && (s = t.ownerDocument.getElementById(f)) && u(t, s) && s.id === f)return n.push(s), n
            } else {
                if (i[2])return S.apply(n, x.call(t.getElementsByTagName(e), 0)), n;
                if ((f = i[3]) && Z && t.getElementsByClassName)return S.apply(n, x.call(t.getElementsByClassName(f), 0)), n
            }
            return vt(e.replace(j, "$1"), t, n, r, a)
        }

        function rt(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return n === "input" && t.type === e
            }
        }

        function it(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return(n === "input" || n === "button") && t.type === e
            }
        }

        function st(e) {
            return N(function (t) {
                return t = +t, N(function (n, r) {
                    var i, s = e([], n.length, t), o = s.length;
                    while (o--)n[i = s[o]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }

        function ot(e, t, n) {
            if (e === t)return n;
            var r = e.nextSibling;
            while (r) {
                if (r === t)return-1;
                r = r.nextSibling
            }
            return 1
        }

        function ut(e, t) {
            var n, r, s, o, u, a, f, l = L[d][e];
            if (l)return t ? 0 : l.slice(0);
            u = e, a = [], f = i.preFilter;
            while (u) {
                if (!n || (r = F.exec(u)))r && (u = u.slice(r[0].length)), a.push(s = []);
                n = !1;
                if (r = I.exec(u))s.push(n = new m(r.shift())), u = u.slice(n.length), n.type = r[0].replace(j, " ");
                for (o in i.filter)(r = J[o].exec(u)) && (!f[o] || (r = f[o](r, g, !0))) && (s.push(n = new m(r.shift())), u = u.slice(n.length), n.type = o, n.matches = r);
                if (!n)break
            }
            return t ? u.length : u ? nt.error(e) : L(e, a).slice(0)
        }

        function at(e, t, r) {
            var i = t.dir, s = r && t.dir === "parentNode", o = w++;
            return t.first ? function (t, n, r) {
                while (t = t[i])if (s || t.nodeType === 1)return e(t, n, r)
            } : function (t, r, u) {
                if (!u) {
                    var a, f = b + " " + o + " ", l = f + n;
                    while (t = t[i])if (s || t.nodeType === 1) {
                        if ((a = t[d]) === l)return t.sizset;
                        if (typeof a == "string" && a.indexOf(f) === 0) {
                            if (t.sizset)return t
                        } else {
                            t[d] = l;
                            if (e(t, r, u))return t.sizset = !0, t;
                            t.sizset = !1
                        }
                    }
                } else while (t = t[i])if (s || t.nodeType === 1)if (e(t, r, u))return t
            }
        }

        function ft(e) {
            return e.length > 1 ? function (t, n, r) {
                var i = e.length;
                while (i--)if (!e[i](t, n, r))return!1;
                return!0
            } : e[0]
        }

        function lt(e, t, n, r, i) {
            var s, o = [], u = 0, a = e.length, f = t != null;
            for (; u < a; u++)if (s = e[u])if (!n || n(s, r, i))o.push(s), f && t.push(u);
            return o
        }

        function ct(e, t, n, r, i, s) {
            return r && !r[d] && (r = ct(r)), i && !i[d] && (i = ct(i, s)), N(function (s, o, u, a) {
                if (s && i)return;
                var f, l, c, h = [], p = [], d = o.length, v = s || dt(t || "*", u.nodeType ? [u] : u, [], s), m = e && (s || !t) ? lt(v, h, e, u, a) : v, g = n ? i || (s ? e : d || r) ? [] : o : m;
                n && n(m, g, u, a);
                if (r) {
                    c = lt(g, p), r(c, [], u, a), f = c.length;
                    while (f--)if (l = c[f])g[p[f]] = !(m[p[f]] = l)
                }
                if (s) {
                    f = e && g.length;
                    while (f--)if (l = g[f])s[h[f]] = !(o[h[f]] = l)
                } else g = lt(g === o ? g.splice(d, g.length) : g), i ? i(null, o, g, a) : S.apply(o, g)
            })
        }

        function ht(e) {
            var t, n, r, s = e.length, o = i.relative[e[0].type], u = o || i.relative[" "], a = o ? 1 : 0, f = at(function (e) {
                return e === t
            }, u, !0), l = at(function (e) {
                return T.call(t, e) > -1
            }, u, !0), h = [function (e, n, r) {
                return!o && (r || n !== c) || ((t = n).nodeType ? f(e, n, r) : l(e, n, r))
            }];
            for (; a < s; a++)if (n = i.relative[e[a].type])h = [at(ft(h), n)]; else {
                n = i.filter[e[a].type].apply(null, e[a].matches);
                if (n[d]) {
                    r = ++a;
                    for (; r < s; r++)if (i.relative[e[r].type])break;
                    return ct(a > 1 && ft(h), a > 1 && e.slice(0, a - 1).join("").replace(j, "$1"), n, a < r && ht(e.slice(a, r)), r < s && ht(e = e.slice(r)), r < s && e.join(""))
                }
                h.push(n)
            }
            return ft(h)
        }

        function pt(e, t) {
            var r = t.length > 0, s = e.length > 0, o = function (u, a, f, l, h) {
                var p, d, v, m = [], y = 0, w = "0", x = u && [], T = h != null, N = c, C = u || s && i.find.TAG("*", h && a.parentNode || a), k = b += N == null ? 1 : Math.E;
                T && (c = a !== g && a, n = o.el);
                for (; (p = C[w]) != null; w++) {
                    if (s && p) {
                        for (d = 0; v = e[d]; d++)if (v(p, a, f)) {
                            l.push(p);
                            break
                        }
                        T && (b = k, n = ++o.el)
                    }
                    r && ((p = !v && p) && y--, u && x.push(p))
                }
                y += w;
                if (r && w !== y) {
                    for (d = 0; v = t[d]; d++)v(x, m, a, f);
                    if (u) {
                        if (y > 0)while (w--)!x[w] && !m[w] && (m[w] = E.call(l));
                        m = lt(m)
                    }
                    S.apply(l, m), T && !u && m.length > 0 && y + t.length > 1 && nt.uniqueSort(l)
                }
                return T && (b = k, c = N), x
            };
            return o.el = 0, r ? N(o) : o
        }

        function dt(e, t, n, r) {
            var i = 0, s = t.length;
            for (; i < s; i++)nt(e, t[i], n, r);
            return n
        }

        function vt(e, t, n, r, s) {
            var o, u, f, l, c, h = ut(e), p = h.length;
            if (!r && h.length === 1) {
                u = h[0] = h[0].slice(0);
                if (u.length > 2 && (f = u[0]).type === "ID" && t.nodeType === 9 && !s && i.relative[u[1].type]) {
                    t = i.find.ID(f.matches[0].replace($, ""), t, s)[0];
                    if (!t)return n;
                    e = e.slice(u.shift().length)
                }
                for (o = J.POS.test(e) ? -1 : u.length - 1; o >= 0; o--) {
                    f = u[o];
                    if (i.relative[l = f.type])break;
                    if (c = i.find[l])if (r = c(f.matches[0].replace($, ""), z.test(u[0].type) && t.parentNode || t, s)) {
                        u.splice(o, 1), e = r.length && u.join("");
                        if (!e)return S.apply(n, x.call(r, 0)), n;
                        break
                    }
                }
            }
            return a(e, h)(r, t, s, n, z.test(e)), n
        }

        function mt() {
        }

        var n, r, i, s, o, u, a, f, l, c, h = !0, p = "undefined", d = ("sizcache" + Math.random()).replace(".", ""), m = String, g = e.document, y = g.documentElement, b = 0, w = 0, E = [].pop, S = [].push, x = [].slice, T = [].indexOf || function (e) {
            var t = 0, n = this.length;
            for (; t < n; t++)if (this[t] === e)return t;
            return-1
        }, N = function (e, t) {
            return e[d] = t == null || t, e
        }, C = function () {
            var e = {}, t = [];
            return N(function (n, r) {
                return t.push(n) > i.cacheLength && delete e[t.shift()], e[n] = r
            }, e)
        }, k = C(), L = C(), A = C(), O = "[\\x20\\t\\r\\n\\f]", M = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+", _ = M.replace("w", "w#"), D = "([*^$|!~]?=)", P = "\\[" + O + "*(" + M + ")" + O + "*(?:" + D + O + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + _ + ")|)|)" + O + "*\\]", H = ":(" + M + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + P + ")|[^:]|\\\\.)*|.*))\\)|)", B = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + O + "*((?:-\\d)?\\d*)" + O + "*\\)|)(?=[^-]|$)", j = new RegExp("^" + O + "+|((?:^|[^\\\\])(?:\\\\.)*)" + O + "+$", "g"), F = new RegExp("^" + O + "*," + O + "*"), I = new RegExp("^" + O + "*([\\x20\\t\\r\\n\\f>+~])" + O + "*"), q = new RegExp(H), R = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/, U = /^:not/, z = /[\x20\t\r\n\f]*[+~]/, W = /:not\($/, X = /h\d/i, V = /input|select|textarea|button/i, $ = /\\(?!\\)/g, J = {ID:new RegExp("^#(" + M + ")"), CLASS:new RegExp("^\\.(" + M + ")"), NAME:new RegExp("^\\[name=['\"]?(" + M + ")['\"]?\\]"), TAG:new RegExp("^(" + M.replace("w", "w*") + ")"), ATTR:new RegExp("^" + P), PSEUDO:new RegExp("^" + H), POS:new RegExp(B, "i"), CHILD:new RegExp("^:(only|nth|first|last)-child(?:\\(" + O + "*(even|odd|(([+-]|)(\\d*)n|)" + O + "*(?:([+-]|)" + O + "*(\\d+)|))" + O + "*\\)|)", "i"), needsContext:new RegExp("^" + O + "*[>+~]|" + B, "i")}, K = function (e) {
            var t = g.createElement("div");
            try {
                return e(t)
            } catch (n) {
                return!1
            } finally {
                t = null
            }
        }, Q = K(function (e) {
            return e.appendChild(g.createComment("")), !e.getElementsByTagName("*").length
        }), G = K(function (e) {
            return e.innerHTML = "<a href='#'></a>", e.firstChild && typeof e.firstChild.getAttribute !== p && e.firstChild.getAttribute("href") === "#"
        }), Y = K(function (e) {
            e.innerHTML = "<select></select>";
            var t = typeof e.lastChild.getAttribute("multiple");
            return t !== "boolean" && t !== "string"
        }), Z = K(function (e) {
            return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", !e.getElementsByClassName || !e.getElementsByClassName("e").length ? !1 : (e.lastChild.className = "e", e.getElementsByClassName("e").length === 2)
        }), et = K(function (e) {
            e.id = d + 0, e.innerHTML = "<a name='" + d + "'></a><div name='" + d + "'></div>", y.insertBefore(e, y.firstChild);
            var t = g.getElementsByName && g.getElementsByName(d).length === 2 + g.getElementsByName(d + 0).length;
            return r = !g.getElementById(d), y.removeChild(e), t
        });
        try {
            x.call(y.childNodes, 0)[0].nodeType
        } catch (tt) {
            x = function (e) {
                var t, n = [];
                for (; t = this[e]; e++)n.push(t);
                return n
            }
        }
        nt.matches = function (e, t) {
            return nt(e, null, null, t)
        }, nt.matchesSelector = function (e, t) {
            return nt(t, null, null, [e]).length > 0
        }, s = nt.getText = function (e) {
            var t, n = "", r = 0, i = e.nodeType;
            if (i) {
                if (i === 1 || i === 9 || i === 11) {
                    if (typeof e.textContent == "string")return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling)n += s(e)
                } else if (i === 3 || i === 4)return e.nodeValue
            } else for (; t = e[r]; r++)n += s(t);
            return n
        }, o = nt.isXML = function (e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? t.nodeName !== "HTML" : !1
        }, u = nt.contains = y.contains ? function (e, t) {
            var n = e.nodeType === 9 ? e.documentElement : e, r = t && t.parentNode;
            return e === r || !!(r && r.nodeType === 1 && n.contains && n.contains(r))
        } : y.compareDocumentPosition ? function (e, t) {
            return t && !!(e.compareDocumentPosition(t) & 16)
        } : function (e, t) {
            while (t = t.parentNode)if (t === e)return!0;
            return!1
        }, nt.attr = function (e, t) {
            var n, r = o(e);
            return r || (t = t.toLowerCase()), (n = i.attrHandle[t]) ? n(e) : r || Y ? e.getAttribute(t) : (n = e.getAttributeNode(t), n ? typeof e[t] == "boolean" ? e[t] ? t : null : n.specified ? n.value : null : null)
        }, i = nt.selectors = {cacheLength:50, createPseudo:N, match:J, attrHandle:G ? {} : {href:function (e) {
            return e.getAttribute("href", 2)
        }, type:function (e) {
            return e.getAttribute("type")
        }}, find:{ID:r ? function (e, t, n) {
            if (typeof t.getElementById !== p && !n) {
                var r = t.getElementById(e);
                return r && r.parentNode ? [r] : []
            }
        } : function (e, n, r) {
            if (typeof n.getElementById !== p && !r) {
                var i = n.getElementById(e);
                return i ? i.id === e || typeof i.getAttributeNode !== p && i.getAttributeNode("id").value === e ? [i] : t : []
            }
        }, TAG:Q ? function (e, t) {
            if (typeof t.getElementsByTagName !== p)return t.getElementsByTagName(e)
        } : function (e, t) {
            var n = t.getElementsByTagName(e);
            if (e === "*") {
                var r, i = [], s = 0;
                for (; r = n[s]; s++)r.nodeType === 1 && i.push(r);
                return i
            }
            return n
        }, NAME:et && function (e, t) {
            if (typeof t.getElementsByName !== p)return t.getElementsByName(name)
        }, CLASS:Z && function (e, t, n) {
            if (typeof t.getElementsByClassName !== p && !n)return t.getElementsByClassName(e)
        }}, relative:{">":{dir:"parentNode", first:!0}, " ":{dir:"parentNode"}, "+":{dir:"previousSibling", first:!0}, "~":{dir:"previousSibling"}}, preFilter:{ATTR:function (e) {
            return e[1] = e[1].replace($, ""), e[3] = (e[4] || e[5] || "").replace($, ""), e[2] === "~=" && (e[3] = " " + e[3] + " "), e.slice(0, 4)
        }, CHILD:function (e) {
            return e[1] = e[1].toLowerCase(), e[1] === "nth" ? (e[2] || nt.error(e[0]), e[3] = +(e[3] ? e[4] + (e[5] || 1) : 2 * (e[2] === "even" || e[2] === "odd")), e[4] = +(e[6] + e[7] || e[2] === "odd")) : e[2] && nt.error(e[0]), e
        }, PSEUDO:function (e) {
            var t, n;
            if (J.CHILD.test(e[0]))return null;
            if (e[3])e[2] = e[3]; else if (t = e[4])q.test(t) && (n = ut(t, !0)) && (n = t.indexOf(")", t.length - n) - t.length) && (t = t.slice(0, n), e[0] = e[0].slice(0, n)), e[2] = t;
            return e.slice(0, 3)
        }}, filter:{ID:r ? function (e) {
            return e = e.replace($, ""), function (t) {
                return t.getAttribute("id") === e
            }
        } : function (e) {
            return e = e.replace($, ""), function (t) {
                var n = typeof t.getAttributeNode !== p && t.getAttributeNode("id");
                return n && n.value === e
            }
        }, TAG:function (e) {
            return e === "*" ? function () {
                return!0
            } : (e = e.replace($, "").toLowerCase(), function (t) {
                return t.nodeName && t.nodeName.toLowerCase() === e
            })
        }, CLASS:function (e) {
            var t = k[d][e];
            return t || (t = k(e, new RegExp("(^|" + O + ")" + e + "(" + O + "|$)"))), function (e) {
                return t.test(e.className || typeof e.getAttribute !== p && e.getAttribute("class") || "")
            }
        }, ATTR:function (e, t, n) {
            return function (r, i) {
                var s = nt.attr(r, e);
                return s == null ? t === "!=" : t ? (s += "", t === "=" ? s === n : t === "!=" ? s !== n : t === "^=" ? n && s.indexOf(n) === 0 : t === "*=" ? n && s.indexOf(n) > -1 : t === "$=" ? n && s.substr(s.length - n.length) === n : t === "~=" ? (" " + s + " ").indexOf(n) > -1 : t === "|=" ? s === n || s.substr(0, n.length + 1) === n + "-" : !1) : !0
            }
        }, CHILD:function (e, t, n, r) {
            return e === "nth" ? function (e) {
                var t, i, s = e.parentNode;
                if (n === 1 && r === 0)return!0;
                if (s) {
                    i = 0;
                    for (t = s.firstChild; t; t = t.nextSibling)if (t.nodeType === 1) {
                        i++;
                        if (e === t)break
                    }
                }
                return i -= r, i === n || i % n === 0 && i / n >= 0
            } : function (t) {
                var n = t;
                switch (e) {
                    case"only":
                    case"first":
                        while (n = n.previousSibling)if (n.nodeType === 1)return!1;
                        if (e === "first")return!0;
                        n = t;
                    case"last":
                        while (n = n.nextSibling)if (n.nodeType === 1)return!1;
                        return!0
                }
            }
        }, PSEUDO:function (e, t) {
            var n, r = i.pseudos[e] || i.setFilters[e.toLowerCase()] || nt.error("unsupported pseudo: " + e);
            return r[d] ? r(t) : r.length > 1 ? (n = [e, e, "", t], i.setFilters.hasOwnProperty(e.toLowerCase()) ? N(function (e, n) {
                var i, s = r(e, t), o = s.length;
                while (o--)i = T.call(e, s[o]), e[i] = !(n[i] = s[o])
            }) : function (e) {
                return r(e, 0, n)
            }) : r
        }}, pseudos:{not:N(function (e) {
            var t = [], n = [], r = a(e.replace(j, "$1"));
            return r[d] ? N(function (e, t, n, i) {
                var s, o = r(e, null, i, []), u = e.length;
                while (u--)if (s = o[u])e[u] = !(t[u] = s)
            }) : function (e, i, s) {
                return t[0] = e, r(t, null, s, n), !n.pop()
            }
        }), has:N(function (e) {
            return function (t) {
                return nt(e, t).length > 0
            }
        }), contains:N(function (e) {
            return function (t) {
                return(t.textContent || t.innerText || s(t)).indexOf(e) > -1
            }
        }), enabled:function (e) {
            return e.disabled === !1
        }, disabled:function (e) {
            return e.disabled === !0
        }, checked:function (e) {
            var t = e.nodeName.toLowerCase();
            return t === "input" && !!e.checked || t === "option" && !!e.selected
        }, selected:function (e) {
            return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
        }, parent:function (e) {
            return!i.pseudos.empty(e)
        }, empty:function (e) {
            var t;
            e = e.firstChild;
            while (e) {
                if (e.nodeName > "@" || (t = e.nodeType) === 3 || t === 4)return!1;
                e = e.nextSibling
            }
            return!0
        }, header:function (e) {
            return X.test(e.nodeName)
        }, text:function (e) {
            var t, n;
            return e.nodeName.toLowerCase() === "input" && (t = e.type) === "text" && ((n = e.getAttribute("type")) == null || n.toLowerCase() === t)
        }, radio:rt("radio"), checkbox:rt("checkbox"), file:rt("file"), password:rt("password"), image:rt("image"), submit:it("submit"), reset:it("reset"), button:function (e) {
            var t = e.nodeName.toLowerCase();
            return t === "input" && e.type === "button" || t === "button"
        }, input:function (e) {
            return V.test(e.nodeName)
        }, focus:function (e) {
            var t = e.ownerDocument;
            return e === t.activeElement && (!t.hasFocus || t.hasFocus()) && (!!e.type || !!e.href)
        }, active:function (e) {
            return e === e.ownerDocument.activeElement
        }, first:st(function (e, t, n) {
            return[0]
        }), last:st(function (e, t, n) {
            return[t - 1]
        }), eq:st(function (e, t, n) {
            return[n < 0 ? n + t : n]
        }), even:st(function (e, t, n) {
            for (var r = 0; r < t; r += 2)e.push(r);
            return e
        }), odd:st(function (e, t, n) {
            for (var r = 1; r < t; r += 2)e.push(r);
            return e
        }), lt:st(function (e, t, n) {
            for (var r = n < 0 ? n + t : n; --r >= 0;)e.push(r);
            return e
        }), gt:st(function (e, t, n) {
            for (var r = n < 0 ? n + t : n; ++r < t;)e.push(r);
            return e
        })}}, f = y.compareDocumentPosition ? function (e, t) {
            return e === t ? (l = !0, 0) : (!e.compareDocumentPosition || !t.compareDocumentPosition ? e.compareDocumentPosition : e.compareDocumentPosition(t) & 4) ? -1 : 1
        } : function (e, t) {
            if (e === t)return l = !0, 0;
            if (e.sourceIndex && t.sourceIndex)return e.sourceIndex - t.sourceIndex;
            var n, r, i = [], s = [], o = e.parentNode, u = t.parentNode, a = o;
            if (o === u)return ot(e, t);
            if (!o)return-1;
            if (!u)return 1;
            while (a)i.unshift(a), a = a.parentNode;
            a = u;
            while (a)s.unshift(a), a = a.parentNode;
            n = i.length, r = s.length;
            for (var f = 0; f < n && f < r; f++)if (i[f] !== s[f])return ot(i[f], s[f]);
            return f === n ? ot(e, s[f], -1) : ot(i[f], t, 1)
        }, [0, 0].sort(f), h = !l, nt.uniqueSort = function (e) {
            var t, n = 1;
            l = h, e.sort(f);
            if (l)for (; t = e[n]; n++)t === e[n - 1] && e.splice(n--, 1);
            return e
        }, nt.error = function (e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, a = nt.compile = function (e, t) {
            var n, r = [], i = [], s = A[d][e];
            if (!s) {
                t || (t = ut(e)), n = t.length;
                while (n--)s = ht(t[n]), s[d] ? r.push(s) : i.push(s);
                s = A(e, pt(i, r))
            }
            return s
        }, g.querySelectorAll && function () {
            var e, t = vt, n = /'|\\/g, r = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, i = [":focus"], s = [":active", ":focus"], u = y.matchesSelector || y.mozMatchesSelector || y.webkitMatchesSelector || y.oMatchesSelector || y.msMatchesSelector;
            K(function (e) {
                e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || i.push("\\[" + O + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), e.querySelectorAll(":checked").length || i.push(":checked")
            }), K(function (e) {
                e.innerHTML = "<p test=''></p>", e.querySelectorAll("[test^='']").length && i.push("[*^$]=" + O + "*(?:\"\"|'')"), e.innerHTML = "<input type='hidden'/>", e.querySelectorAll(":enabled").length || i.push(":enabled", ":disabled")
            }), i = new RegExp(i.join("|")), vt = function (e, r, s, o, u) {
                if (!o && !u && (!i || !i.test(e))) {
                    var a, f, l = !0, c = d, h = r, p = r.nodeType === 9 && e;
                    if (r.nodeType === 1 && r.nodeName.toLowerCase() !== "object") {
                        a = ut(e), (l = r.getAttribute("id")) ? c = l.replace(n, "\\$&") : r.setAttribute("id", c), c = "[id='" + c + "'] ", f = a.length;
                        while (f--)a[f] = c + a[f].join("");
                        h = z.test(e) && r.parentNode || r, p = a.join(",")
                    }
                    if (p)try {
                        return S.apply(s, x.call(h.querySelectorAll(p), 0)), s
                    } catch (v) {
                    } finally {
                        l || r.removeAttribute("id")
                    }
                }
                return t(e, r, s, o, u)
            }, u && (K(function (t) {
                e = u.call(t, "div");
                try {
                    u.call(t, "[test!='']:sizzle"), s.push("!=", H)
                } catch (n) {
                }
            }), s = new RegExp(s.join("|")), nt.matchesSelector = function (t, n) {
                n = n.replace(r, "='$1']");
                if (!o(t) && !s.test(n) && (!i || !i.test(n)))try {
                    var a = u.call(t, n);
                    if (a || e || t.document && t.document.nodeType !== 11)return a
                } catch (f) {
                }
                return nt(n, null, null, [t]).length > 0
            })
        }(), i.pseudos.nth = i.pseudos.eq, i.filters = mt.prototype = i.pseudos, i.setFilters = new mt, nt.attr = v.attr, v.find = nt, v.expr = nt.selectors, v.expr[":"] = v.expr.pseudos, v.unique = nt.uniqueSort, v.text = nt.getText, v.isXMLDoc = nt.isXML, v.contains = nt.contains
    }(e);
    var nt = /Until$/, rt = /^(?:parents|prev(?:Until|All))/, it = /^.[^:#\[\.,]*$/, st = v.expr.match.needsContext, ot = {children:!0, contents:!0, next:!0, prev:!0};
    v.fn.extend({find:function (e) {
        var t, n, r, i, s, o, u = this;
        if (typeof e != "string")return v(e).filter(function () {
            for (t = 0, n = u.length; t < n; t++)if (v.contains(u[t], this))return!0
        });
        o = this.pushStack("", "find", e);
        for (t = 0, n = this.length; t < n; t++) {
            r = o.length, v.find(e, this[t], o);
            if (t > 0)for (i = r; i < o.length; i++)for (s = 0; s < r; s++)if (o[s] === o[i]) {
                o.splice(i--, 1);
                break
            }
        }
        return o
    }, has:function (e) {
        var t, n = v(e, this), r = n.length;
        return this.filter(function () {
            for (t = 0; t < r; t++)if (v.contains(this, n[t]))return!0
        })
    }, not:function (e) {
        return this.pushStack(ft(this, e, !1), "not", e)
    }, filter:function (e) {
        return this.pushStack(ft(this, e, !0), "filter", e)
    }, is:function (e) {
        return!!e && (typeof e == "string" ? st.test(e) ? v(e, this.context).index(this[0]) >= 0 : v.filter(e, this).length > 0 : this.filter(e).length > 0)
    }, closest:function (e, t) {
        var n, r = 0, i = this.length, s = [], o = st.test(e) || typeof e != "string" ? v(e, t || this.context) : 0;
        for (; r < i; r++) {
            n = this[r];
            while (n && n.ownerDocument && n !== t && n.nodeType !== 11) {
                if (o ? o.index(n) > -1 : v.find.matchesSelector(n, e)) {
                    s.push(n);
                    break
                }
                n = n.parentNode
            }
        }
        return s = s.length > 1 ? v.unique(s) : s, this.pushStack(s, "closest", e)
    }, index:function (e) {
        return e ? typeof e == "string" ? v.inArray(this[0], v(e)) : v.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
    }, add:function (e, t) {
        var n = typeof e == "string" ? v(e, t) : v.makeArray(e && e.nodeType ? [e] : e), r = v.merge(this.get(), n);
        return this.pushStack(ut(n[0]) || ut(r[0]) ? r : v.unique(r))
    }, addBack:function (e) {
        return this.add(e == null ? this.prevObject : this.prevObject.filter(e))
    }}), v.fn.andSelf = v.fn.addBack, v.each({parent:function (e) {
        var t = e.parentNode;
        return t && t.nodeType !== 11 ? t : null
    }, parents:function (e) {
        return v.dir(e, "parentNode")
    }, parentsUntil:function (e, t, n) {
        return v.dir(e, "parentNode", n)
    }, next:function (e) {
        return at(e, "nextSibling")
    }, prev:function (e) {
        return at(e, "previousSibling")
    }, nextAll:function (e) {
        return v.dir(e, "nextSibling")
    }, prevAll:function (e) {
        return v.dir(e, "previousSibling")
    }, nextUntil:function (e, t, n) {
        return v.dir(e, "nextSibling", n)
    }, prevUntil:function (e, t, n) {
        return v.dir(e, "previousSibling", n)
    }, siblings:function (e) {
        return v.sibling((e.parentNode || {}).firstChild, e)
    }, children:function (e) {
        return v.sibling(e.firstChild)
    }, contents:function (e) {
        return v.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : v.merge([], e.childNodes)
    }}, function (e, t) {
        v.fn[e] = function (n, r) {
            var i = v.map(this, t, n);
            return nt.test(e) || (r = n), r && typeof r == "string" && (i = v.filter(r, i)), i = this.length > 1 && !ot[e] ? v.unique(i) : i, this.length > 1 && rt.test(e) && (i = i.reverse()), this.pushStack(i, e, l.call(arguments).join(","))
        }
    }), v.extend({filter:function (e, t, n) {
        return n && (e = ":not(" + e + ")"), t.length === 1 ? v.find.matchesSelector(t[0], e) ? [t[0]] : [] : v.find.matches(e, t)
    }, dir:function (e, n, r) {
        var i = [], s = e[n];
        while (s && s.nodeType !== 9 && (r === t || s.nodeType !== 1 || !v(s).is(r)))s.nodeType === 1 && i.push(s), s = s[n];
        return i
    }, sibling:function (e, t) {
        var n = [];
        for (; e; e = e.nextSibling)e.nodeType === 1 && e !== t && n.push(e);
        return n
    }});
    var ct = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", ht = / jQuery\d+="(?:null|\d+)"/g, pt = /^\s+/, dt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, vt = /<([\w:]+)/, mt = /<tbody/i, gt = /<|&#?\w+;/, yt = /<(?:script|style|link)/i, bt = /<(?:script|object|embed|option|style)/i, wt = new RegExp("<(?:" + ct + ")[\\s/>]", "i"), Et = /^(?:checkbox|radio)$/, St = /checked\s*(?:[^=]|=\s*.checked.)/i, xt = /\/(java|ecma)script/i, Tt = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g, Nt = {option:[1, "<select multiple='multiple'>", "</select>"], legend:[1, "<fieldset>", "</fieldset>"], thead:[1, "<table>", "</table>"], tr:[2, "<table><tbody>", "</tbody></table>"], td:[3, "<table><tbody><tr>", "</tr></tbody></table>"], col:[2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], area:[1, "<map>", "</map>"], _default:[0, "", ""]}, Ct = lt(i), kt = Ct.appendChild(i.createElement("div"));
    Nt.optgroup = Nt.option, Nt.tbody = Nt.tfoot = Nt.colgroup = Nt.caption =
        Nt.thead, Nt.th = Nt.td, v.support.htmlSerialize || (Nt._default = [1, "X<div>", "</div>"]), v.fn.extend({text:function (e) {
        return v.access(this, function (e) {
            return e === t ? v.text(this) : this.empty().append((this[0] && this[0].ownerDocument || i).createTextNode(e))
        }, null, e, arguments.length)
    }, wrapAll:function (e) {
        if (v.isFunction(e))return this.each(function (t) {
            v(this).wrapAll(e.call(this, t))
        });
        if (this[0]) {
            var t = v(e, this[0].ownerDocument).eq(0).clone(!0);
            this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                var e = this;
                while (e.firstChild && e.firstChild.nodeType === 1)e = e.firstChild;
                return e
            }).append(this)
        }
        return this
    }, wrapInner:function (e) {
        return v.isFunction(e) ? this.each(function (t) {
            v(this).wrapInner(e.call(this, t))
        }) : this.each(function () {
            var t = v(this), n = t.contents();
            n.length ? n.wrapAll(e) : t.append(e)
        })
    }, wrap:function (e) {
        var t = v.isFunction(e);
        return this.each(function (n) {
            v(this).wrapAll(t ? e.call(this, n) : e)
        })
    }, unwrap:function () {
        return this.parent().each(function () {
            v.nodeName(this, "body") || v(this).replaceWith(this.childNodes)
        }).end()
    }, append:function () {
        return this.domManip(arguments, !0, function (e) {
            (this.nodeType === 1 || this.nodeType === 11) && this.appendChild(e)
        })
    }, prepend:function () {
        return this.domManip(arguments, !0, function (e) {
            (this.nodeType === 1 || this.nodeType === 11) && this.insertBefore(e, this.firstChild)
        })
    }, before:function () {
        if (!ut(this[0]))return this.domManip(arguments, !1, function (e) {
            this.parentNode.insertBefore(e, this)
        });
        if (arguments.length) {
            var e = v.clean(arguments);
            return this.pushStack(v.merge(e, this), "before", this.selector)
        }
    }, after:function () {
        if (!ut(this[0]))return this.domManip(arguments, !1, function (e) {
            this.parentNode.insertBefore(e, this.nextSibling)
        });
        if (arguments.length) {
            var e = v.clean(arguments);
            return this.pushStack(v.merge(this, e), "after", this.selector)
        }
    }, remove:function (e, t) {
        var n, r = 0;
        for (; (n = this[r]) != null; r++)if (!e || v.filter(e, [n]).length)!t && n.nodeType === 1 && (v.cleanData(n.getElementsByTagName("*")), v.cleanData([n])), n.parentNode && n.parentNode.removeChild(n);
        return this
    }, empty:function () {
        var e, t = 0;
        for (; (e = this[t]) != null; t++) {
            e.nodeType === 1 && v.cleanData(e.getElementsByTagName("*"));
            while (e.firstChild)e.removeChild(e.firstChild)
        }
        return this
    }, clone:function (e, t) {
        return e = e == null ? !1 : e, t = t == null ? e : t, this.map(function () {
            return v.clone(this, e, t)
        })
    }, html:function (e) {
        return v.access(this, function (e) {
            var n = this[0] || {}, r = 0, i = this.length;
            if (e === t)return n.nodeType === 1 ? n.innerHTML.replace(ht, "") : t;
            if (typeof e == "string" && !yt.test(e) && (v.support.htmlSerialize || !wt.test(e)) && (v.support.leadingWhitespace || !pt.test(e)) && !Nt[(vt.exec(e) || ["", ""])[1].toLowerCase()]) {
                e = e.replace(dt, "<$1></$2>");
                try {
                    for (; r < i; r++)n = this[r] || {}, n.nodeType === 1 && (v.cleanData(n.getElementsByTagName("*")), n.innerHTML = e);
                    n = 0
                } catch (s) {
                }
            }
            n && this.empty().append(e)
        }, null, e, arguments.length)
    }, replaceWith:function (e) {
        return ut(this[0]) ? this.length ? this.pushStack(v(v.isFunction(e) ? e() : e), "replaceWith", e) : this : v.isFunction(e) ? this.each(function (t) {
            var n = v(this), r = n.html();
            n.replaceWith(e.call(this, t, r))
        }) : (typeof e != "string" && (e = v(e).detach()), this.each(function () {
            var t = this.nextSibling, n = this.parentNode;
            v(this).remove(), t ? v(t).before(e) : v(n).append(e)
        }))
    }, detach:function (e) {
        return this.remove(e, !0)
    }, domManip:function (e, n, r) {
        e = [].concat.apply([], e);
        var i, s, o, u, a = 0, f = e[0], l = [], c = this.length;
        if (!v.support.checkClone && c > 1 && typeof f == "string" && St.test(f))return this.each(function () {
            v(this).domManip(e, n, r)
        });
        if (v.isFunction(f))return this.each(function (i) {
            var s = v(this);
            e[0] = f.call(this, i, n ? s.html() : t), s.domManip(e, n, r)
        });
        if (this[0]) {
            i = v.buildFragment(e, this, l), o = i.fragment, s = o.firstChild, o.childNodes.length === 1 && (o = s);
            if (s) {
                n = n && v.nodeName(s, "tr");
                for (u = i.cacheable || c - 1; a < c; a++)r.call(n && v.nodeName(this[a], "table") ? Lt(this[a], "tbody") : this[a], a === u ? o : v.clone(o, !0, !0))
            }
            o = s = null, l.length && v.each(l, function (e, t) {
                t.src ? v.ajax ? v.ajax({url:t.src, type:"GET", dataType:"script", async:!1, global:!1, "throws":!0}) : v.error("no ajax") : v.globalEval((t.text || t.textContent || t.innerHTML || "").replace(Tt, "")), t.parentNode && t.parentNode.removeChild(t)
            })
        }
        return this
    }}), v.buildFragment = function (e, n, r) {
        var s, o, u, a = e[0];
        return n = n || i, n = !n.nodeType && n[0] || n, n = n.ownerDocument || n, e.length === 1 && typeof a == "string" && a.length < 512 && n === i && a.charAt(0) === "<" && !bt.test(a) && (v.support.checkClone || !St.test(a)) && (v.support.html5Clone || !wt.test(a)) && (o = !0, s = v.fragments[a], u = s !== t), s || (s = n.createDocumentFragment(), v.clean(e, n, s, r), o && (v.fragments[a] = u && s)), {fragment:s, cacheable:o}
    }, v.fragments = {}, v.each({appendTo:"append", prependTo:"prepend", insertBefore:"before", insertAfter:"after", replaceAll:"replaceWith"}, function (e, t) {
        v.fn[e] = function (n) {
            var r, i = 0, s = [], o = v(n), u = o.length, a = this.length === 1 && this[0].parentNode;
            if ((a == null || a && a.nodeType === 11 && a.childNodes.length === 1) && u === 1)return o[t](this[0]), this;
            for (; i < u; i++)r = (i > 0 ? this.clone(!0) : this).get(), v(o[i])[t](r), s = s.concat(r);
            return this.pushStack(s, e, o.selector)
        }
    }), v.extend({clone:function (e, t, n) {
        var r, i, s, o;
        v.support.html5Clone || v.isXMLDoc(e) || !wt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (kt.innerHTML = e.outerHTML, kt.removeChild(o = kt.firstChild));
        if ((!v.support.noCloneEvent || !v.support.noCloneChecked) && (e.nodeType === 1 || e.nodeType === 11) && !v.isXMLDoc(e)) {
            Ot(e, o), r = Mt(e), i = Mt(o);
            for (s = 0; r[s]; ++s)i[s] && Ot(r[s], i[s])
        }
        if (t) {
            At(e, o);
            if (n) {
                r = Mt(e), i = Mt(o);
                for (s = 0; r[s]; ++s)At(r[s], i[s])
            }
        }
        return r = i = null, o
    }, clean:function (e, t, n, r) {
        var s, o, u, a, f, l, c, h, p, d, m, g, y = t === i && Ct, b = [];
        if (!t || typeof t.createDocumentFragment == "undefined")t = i;
        for (s = 0; (u = e[s]) != null; s++) {
            typeof u == "number" && (u += "");
            if (!u)continue;
            if (typeof u == "string")if (!gt.test(u))u = t.createTextNode(u); else {
                y = y || lt(t), c = t.createElement("div"), y.appendChild(c), u = u.replace(dt, "<$1></$2>"), a = (vt.exec(u) || ["", ""])[1].toLowerCase(), f = Nt[a] || Nt._default, l = f[0], c.innerHTML = f[1] + u + f[2];
                while (l--)c = c.lastChild;
                if (!v.support.tbody) {
                    h = mt.test(u), p = a === "table" && !h ? c.firstChild && c.firstChild.childNodes : f[1] === "<table>" && !h ? c.childNodes : [];
                    for (o = p.length - 1; o >= 0; --o)v.nodeName(p[o], "tbody") && !p[o].childNodes.length && p[o].parentNode.removeChild(p[o])
                }
                !v.support.leadingWhitespace && pt.test(u) && c.insertBefore(t.createTextNode(pt.exec(u)[0]), c.firstChild), u = c.childNodes, c.parentNode.removeChild(c)
            }
            u.nodeType ? b.push(u) : v.merge(b, u)
        }
        c && (u = c = y = null);
        if (!v.support.appendChecked)for (s = 0; (u = b[s]) != null; s++)v.nodeName(u, "input") ? _t(u) : typeof u.getElementsByTagName != "undefined" && v.grep(u.getElementsByTagName("input"), _t);
        if (n) {
            m = function (e) {
                if (!e.type || xt.test(e.type))return r ? r.push(e.parentNode ? e.parentNode.removeChild(e) : e) : n.appendChild(e)
            };
            for (s = 0; (u = b[s]) != null; s++)if (!v.nodeName(u, "script") || !m(u))n.appendChild(u), typeof u.getElementsByTagName != "undefined" && (g = v.grep(v.merge([], u.getElementsByTagName("script")), m), b.splice.apply(b, [s + 1, 0].concat(g)), s += g.length)
        }
        return b
    }, cleanData:function (e, t) {
        var n, r, i, s, o = 0, u = v.expando, a = v.cache, f = v.support.deleteExpando, l = v.event.special;
        for (; (i = e[o]) != null; o++)if (t || v.acceptData(i)) {
            r = i[u], n = r && a[r];
            if (n) {
                if (n.events)for (s in n.events)l[s] ? v.event.remove(i, s) : v.removeEvent(i, s, n.handle);
                a[r] && (delete a[r], f ? delete i[u] : i.removeAttribute ? i.removeAttribute(u) : i[u] = null, v.deletedIds.push(r))
            }
        }
    }}), function () {
        var e, t;
        v.uaMatch = function (e) {
            e = e.toLowerCase();
            var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
            return{browser:t[1] || "", version:t[2] || "0"}
        }, e = v.uaMatch(o.userAgent), t = {}, e.browser && (t[e.browser] = !0, t.version = e.version), t.chrome ? t.webkit = !0 : t.webkit && (t.safari = !0), v.browser = t, v.sub = function () {
            function e(t, n) {
                return new e.fn.init(t, n)
            }

            v.extend(!0, e, this), e.superclass = this, e.fn = e.prototype = this(), e.fn.constructor = e, e.sub = this.sub, e.fn.init = function (r, i) {
                return i && i instanceof v && !(i instanceof e) && (i = e(i)), v.fn.init.call(this, r, i, t)
            }, e.fn.init.prototype = e.fn;
            var t = e(i);
            return e
        }
    }();
    var Dt, Pt, Ht, Bt = /alpha\([^)]*\)/i, jt = /opacity=([^)]*)/, Ft = /^(top|right|bottom|left)$/, It = /^(none|table(?!-c[ea]).+)/, qt = /^margin/, Rt = new RegExp("^(" + m + ")(.*)$", "i"), Ut = new RegExp("^(" + m + ")(?!px)[a-z%]+$", "i"), zt = new RegExp("^([-+])=(" + m + ")", "i"), Wt = {}, Xt = {position:"absolute", visibility:"hidden", display:"block"}, Vt = {letterSpacing:0, fontWeight:400}, $t = ["Top", "Right", "Bottom", "Left"], Jt = ["Webkit", "O", "Moz", "ms"], Kt = v.fn.toggle;
    v.fn.extend({css:function (e, n) {
        return v.access(this, function (e, n, r) {
            return r !== t ? v.style(e, n, r) : v.css(e, n)
        }, e, n, arguments.length > 1)
    }, show:function () {
        return Yt(this, !0)
    }, hide:function () {
        return Yt(this)
    }, toggle:function (e, t) {
        var n = typeof e == "boolean";
        return v.isFunction(e) && v.isFunction(t) ? Kt.apply(this, arguments) : this.each(function () {
            (n ? e : Gt(this)) ? v(this).show() : v(this).hide()
        })
    }}), v.extend({cssHooks:{opacity:{get:function (e, t) {
        if (t) {
            var n = Dt(e, "opacity");
            return n === "" ? "1" : n
        }
    }}}, cssNumber:{fillOpacity:!0, fontWeight:!0, lineHeight:!0, opacity:!0, orphans:!0, widows:!0, zIndex:!0, zoom:!0}, cssProps:{"float":v.support.cssFloat ? "cssFloat" : "styleFloat"}, style:function (e, n, r, i) {
        if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style)return;
        var s, o, u, a = v.camelCase(n), f = e.style;
        n = v.cssProps[a] || (v.cssProps[a] = Qt(f, a)), u = v.cssHooks[n] || v.cssHooks[a];
        if (r === t)return u && "get"in u && (s = u.get(e, !1, i)) !== t ? s : f[n];
        o = typeof r, o === "string" && (s = zt.exec(r)) && (r = (s[1] + 1) * s[2] + parseFloat(v.css(e, n)), o = "number");
        if (r == null || o === "number" && isNaN(r))return;
        o === "number" && !v.cssNumber[a] && (r += "px");
        if (!u || !("set"in u) || (r = u.set(e, r, i)) !== t)try {
            f[n] = r
        } catch (l) {
        }
    }, css:function (e, n, r, i) {
        var s, o, u, a = v.camelCase(n);
        return n = v.cssProps[a] || (v.cssProps[a] = Qt(e.style, a)), u = v.cssHooks[n] || v.cssHooks[a], u && "get"in u && (s = u.get(e, !0, i)), s === t && (s = Dt(e, n)), s === "normal" && n in Vt && (s = Vt[n]), r || i !== t ? (o = parseFloat(s), r || v.isNumeric(o) ? o || 0 : s) : s
    }, swap:function (e, t, n) {
        var r, i, s = {};
        for (i in t)s[i] = e.style[i], e.style[i] = t[i];
        r = n.call(e);
        for (i in t)e.style[i] = s[i];
        return r
    }}), e.getComputedStyle ? Dt = function (t, n) {
        var r, i, s, o, u = e.getComputedStyle(t, null), a = t.style;
        return u && (r = u[n], r === "" && !v.contains(t.ownerDocument, t) && (r = v.style(t, n)), Ut.test(r) && qt.test(n) && (i = a.width, s = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = r, r = u.width, a.width = i, a.minWidth = s, a.maxWidth = o)), r
    } : i.documentElement.currentStyle && (Dt = function (e, t) {
        var n, r, i = e.currentStyle && e.currentStyle[t], s = e.style;
        return i == null && s && s[t] && (i = s[t]), Ut.test(i) && !Ft.test(t) && (n = s.left, r = e.runtimeStyle && e.runtimeStyle.left, r && (e.runtimeStyle.left = e.currentStyle.left), s.left = t === "fontSize" ? "1em" : i, i = s.pixelLeft + "px", s.left = n, r && (e.runtimeStyle.left = r)), i === "" ? "auto" : i
    }), v.each(["height", "width"], function (e, t) {
        v.cssHooks[t] = {get:function (e, n, r) {
            if (n)return e.offsetWidth === 0 && It.test(Dt(e, "display")) ? v.swap(e, Xt, function () {
                return tn(e, t, r)
            }) : tn(e, t, r)
        }, set:function (e, n, r) {
            return Zt(e, n, r ? en(e, t, r, v.support.boxSizing && v.css(e, "boxSizing") === "border-box") : 0)
        }}
    }), v.support.opacity || (v.cssHooks.opacity = {get:function (e, t) {
        return jt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
    }, set:function (e, t) {
        var n = e.style, r = e.currentStyle, i = v.isNumeric(t) ? "alpha(opacity=" + t * 100 + ")" : "", s = r && r.filter || n.filter || "";
        n.zoom = 1;
        if (t >= 1 && v.trim(s.replace(Bt, "")) === "" && n.removeAttribute) {
            n.removeAttribute("filter");
            if (r && !r.filter)return
        }
        n.filter = Bt.test(s) ? s.replace(Bt, i) : s + " " + i
    }}), v(function () {
        v.support.reliableMarginRight || (v.cssHooks.marginRight = {get:function (e, t) {
            return v.swap(e, {display:"inline-block"}, function () {
                if (t)return Dt(e, "marginRight")
            })
        }}), !v.support.pixelPosition && v.fn.position && v.each(["top", "left"], function (e, t) {
            v.cssHooks[t] = {get:function (e, n) {
                if (n) {
                    var r = Dt(e, t);
                    return Ut.test(r) ? v(e).position()[t] + "px" : r
                }
            }}
        })
    }), v.expr && v.expr.filters && (v.expr.filters.hidden = function (e) {
        return e.offsetWidth === 0 && e.offsetHeight === 0 || !v.support.reliableHiddenOffsets && (e.style && e.style.display || Dt(e, "display")) === "none"
    }, v.expr.filters.visible = function (e) {
        return!v.expr.filters.hidden(e)
    }), v.each({margin:"", padding:"", border:"Width"}, function (e, t) {
        v.cssHooks[e + t] = {expand:function (n) {
            var r, i = typeof n == "string" ? n.split(" ") : [n], s = {};
            for (r = 0; r < 4; r++)s[e + $t[r] + t] = i[r] || i[r - 2] || i[0];
            return s
        }}, qt.test(e) || (v.cssHooks[e + t].set = Zt)
    });
    var rn = /%20/g, sn = /\[\]$/, on = /\r?\n/g, un = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, an = /^(?:select|textarea)/i;
    v.fn.extend({serialize:function () {
        return v.param(this.serializeArray())
    }, serializeArray:function () {
        return this.map(function () {
            return this.elements ? v.makeArray(this.elements) : this
        }).filter(function () {
            return this.name && !this.disabled && (this.checked || an.test(this.nodeName) || un.test(this.type))
        }).map(function (e, t) {
            var n = v(this).val();
            return n == null ? null : v.isArray(n) ? v.map(n, function (e, n) {
                return{name:t.name, value:e.replace(on, "\r\n")}
            }) : {name:t.name, value:n.replace(on, "\r\n")}
        }).get()
    }}), v.param = function (e, n) {
        var r, i = [], s = function (e, t) {
            t = v.isFunction(t) ? t() : t == null ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        };
        n === t && (n = v.ajaxSettings && v.ajaxSettings.traditional);
        if (v.isArray(e) || e.jquery && !v.isPlainObject(e))v.each(e, function () {
            s(this.name, this.value)
        }); else for (r in e)fn(r, e[r], n, s);
        return i.join("&").replace(rn, "+")
    };
    var ln, cn, hn = /#.*$/, pn = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, dn = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, vn = /^(?:GET|HEAD)$/, mn = /^\/\//, gn = /\?/, yn = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, bn = /([?&])_=[^&]*/, wn = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, En = v.fn.load, Sn = {}, xn = {}, Tn = ["*/"] + ["*"];
    try {
        cn = s.href
    } catch (Nn) {
        cn = i.createElement("a"), cn.href = "", cn = cn.href
    }
    ln = wn.exec(cn.toLowerCase()) || [], v.fn.load = function (e, n, r) {
        if (typeof e != "string" && En)return En.apply(this, arguments);
        if (!this.length)return this;
        var i, s, o, u = this, a = e.indexOf(" ");
        return a >= 0 && (i = e.slice(a, e.length), e = e.slice(0, a)), v.isFunction(n) ? (r = n, n = t) : n && typeof n == "object" && (s = "POST"), v.ajax({url:e, type:s, dataType:"html", data:n, complete:function (e, t) {
            r && u.each(r, o || [e.responseText, t, e])
        }}).done(function (e) {
            o = arguments, u.html(i ? v("<div>").append(e.replace(yn, "")).find(i) : e)
        }), this
    }, v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (e, t) {
        v.fn[t] = function (e) {
            return this.on(t, e)
        }
    }), v.each(["get", "post"], function (e, n) {
        v[n] = function (e, r, i, s) {
            return v.isFunction(r) && (s = s || i, i = r, r = t), v.ajax({type:n, url:e, data:r, success:i, dataType:s})
        }
    }), v.extend({getScript:function (e, n) {
        return v.get(e, t, n, "script")
    }, getJSON:function (e, t, n) {
        return v.get(e, t, n, "json")
    }, ajaxSetup:function (e, t) {
        return t ? Ln(e, v.ajaxSettings) : (t = e, e = v.ajaxSettings), Ln(e, t), e
    }, ajaxSettings:{url:cn, isLocal:dn.test(ln[1]), global:!0, type:"GET", contentType:"application/x-www-form-urlencoded; charset=UTF-8", processData:!0, async:!0, accepts:{xml:"application/xml, text/xml", html:"text/html", text:"text/plain", json:"application/json, text/javascript", "*":Tn}, contents:{xml:/xml/, html:/html/, json:/json/}, responseFields:{xml:"responseXML", text:"responseText"}, converters:{"* text":e.String, "text html":!0, "text json":v.parseJSON, "text xml":v.parseXML}, flatOptions:{context:!0, url:!0}}, ajaxPrefilter:Cn(Sn), ajaxTransport:Cn(xn), ajax:function (e, n) {
        function T(e, n, s, a) {
            var l, y, b, w, S, T = n;
            if (E === 2)return;
            E = 2, u && clearTimeout(u), o = t, i = a || "", x.readyState = e > 0 ? 4 : 0, s && (w = An(c, x, s));
            if (e >= 200 && e < 300 || e === 304)c.ifModified && (S = x.getResponseHeader("Last-Modified"), S && (v.lastModified[r] = S), S = x.getResponseHeader("Etag"), S && (v.etag[r] = S)), e === 304 ? (T = "notmodified", l = !0) : (l = On(c, w), T = l.state, y = l.data, b = l.error, l = !b); else {
                b = T;
                if (!T || e)T = "error", e < 0 && (e = 0)
            }
            x.status = e, x.statusText = (n || T) + "", l ? d.resolveWith(h, [y, T, x]) : d.rejectWith(h, [x, T, b]), x.statusCode(g), g = t, f && p.trigger("ajax" + (l ? "Success" : "Error"), [x, c, l ? y : b]), m.fireWith(h, [x, T]), f && (p.trigger("ajaxComplete", [x, c]), --v.active || v.event.trigger("ajaxStop"))
        }

        typeof e == "object" && (n = e, e = t), n = n || {};
        var r, i, s, o, u, a, f, l, c = v.ajaxSetup({}, n), h = c.context || c, p = h !== c && (h.nodeType || h instanceof v) ? v(h) : v.event, d = v.Deferred(), m = v.Callbacks("once memory"), g = c.statusCode || {}, b = {}, w = {}, E = 0, S = "canceled", x = {readyState:0, setRequestHeader:function (e, t) {
            if (!E) {
                var n = e.toLowerCase();
                e = w[n] = w[n] || e, b[e] = t
            }
            return this
        }, getAllResponseHeaders:function () {
            return E === 2 ? i : null
        }, getResponseHeader:function (e) {
            var n;
            if (E === 2) {
                if (!s) {
                    s = {};
                    while (n = pn.exec(i))s[n[1].toLowerCase()] = n[2]
                }
                n = s[e.toLowerCase()]
            }
            return n === t ? null : n
        }, overrideMimeType:function (e) {
            return E || (c.mimeType = e), this
        }, abort:function (e) {
            return e = e || S, o && o.abort(e), T(0, e), this
        }};
        d.promise(x), x.success = x.done, x.error = x.fail, x.complete = m.add, x.statusCode = function (e) {
            if (e) {
                var t;
                if (E < 2)for (t in e)g[t] = [g[t], e[t]]; else t = e[x.status], x.always(t)
            }
            return this
        }, c.url = ((e || c.url) + "").replace(hn, "").replace(mn, ln[1] + "//"), c.dataTypes = v.trim(c.dataType || "*").toLowerCase().split(y), c.crossDomain == null && (a = wn.exec(c.url.toLowerCase()) || !1, c.crossDomain = a && a.join(":") + (a[3] ? "" : a[1] === "http:" ? 80 : 443) !== ln.join(":") + (ln[3] ? "" : ln[1] === "http:" ? 80 : 443)), c.data && c.processData && typeof c.data != "string" && (c.data = v.param(c.data, c.traditional)), kn(Sn, c, n, x);
        if (E === 2)return x;
        f = c.global, c.type = c.type.toUpperCase(), c.hasContent = !vn.test(c.type), f && v.active++ === 0 && v.event.trigger("ajaxStart");
        if (!c.hasContent) {
            c.data && (c.url += (gn.test(c.url) ? "&" : "?") + c.data, delete c.data), r = c.url;
            if (c.cache === !1) {
                var N = v.now(), C = c.url.replace(bn, "$1_=" + N);
                c.url = C + (C === c.url ? (gn.test(c.url) ? "&" : "?") + "_=" + N : "")
            }
        }
        (c.data && c.hasContent && c.contentType !== !1 || n.contentType) && x.setRequestHeader("Content-Type", c.contentType), c.ifModified && (r = r || c.url, v.lastModified[r] && x.setRequestHeader("If-Modified-Since", v.lastModified[r]), v.etag[r] && x.setRequestHeader("If-None-Match", v.etag[r])), x.setRequestHeader("Accept", c.dataTypes[0] && c.accepts[c.dataTypes[0]] ? c.accepts[c.dataTypes[0]] + (c.dataTypes[0] !== "*" ? ", " + Tn + "; q=0.01" : "") : c.accepts["*"]);
        for (l in c.headers)x.setRequestHeader(l, c.headers[l]);
        if (!c.beforeSend || c.beforeSend.call(h, x, c) !== !1 && E !== 2) {
            S = "abort";
            for (l in{success:1, error:1, complete:1})x[l](c[l]);
            o = kn(xn, c, n, x);
            if (!o)T(-1, "No Transport"); else {
                x.readyState = 1, f && p.trigger("ajaxSend", [x, c]), c.async && c.timeout > 0 && (u = setTimeout(function () {
                    x.abort("timeout")
                }, c.timeout));
                try {
                    E = 1, o.send(b, T)
                } catch (k) {
                    if (!(E < 2))throw k;
                    T(-1, k)
                }
            }
            return x
        }
        return x.abort()
    }, active:0, lastModified:{}, etag:{}});
    var Mn = [], _n = /\?/, Dn = /(=)\?(?=&|$)|\?\?/, Pn = v.now();
    v.ajaxSetup({jsonp:"callback", jsonpCallback:function () {
        var e = Mn.pop() || v.expando + "_" + Pn++;
        return this[e] = !0, e
    }}), v.ajaxPrefilter("json jsonp", function (n, r, i) {
        var s, o, u, a = n.data, f = n.url, l = n.jsonp !== !1, c = l && Dn.test(f), h = l && !c && typeof a == "string" && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Dn.test(a);
        if (n.dataTypes[0] === "jsonp" || c || h)return s = n.jsonpCallback = v.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, o = e[s], c ? n.url = f.replace(Dn, "$1" + s) : h ? n.data = a.replace(Dn, "$1" + s) : l && (n.url += (_n.test(f) ? "&" : "?") + n.jsonp + "=" + s), n.converters["script json"] = function () {
            return u || v.error(s + " was not called"), u[0]
        }, n.dataTypes[0] = "json", e[s] = function () {
            u = arguments
        }, i.always(function () {
            e[s] = o, n[s] && (n.jsonpCallback = r.jsonpCallback, Mn.push(s)), u && v.isFunction(o) && o(u[0]), u = o = t
        }), "script"
    }), v.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"}, contents:{script:/javascript|ecmascript/}, converters:{"text script":function (e) {
        return v.globalEval(e), e
    }}}), v.ajaxPrefilter("script", function (e) {
        e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
    }), v.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
            var n, r = i.head || i.getElementsByTagName("head")[0] || i.documentElement;
            return{send:function (s, o) {
                n = i.createElement("script"), n.async = "async", e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function (e, i) {
                    if (i || !n.readyState || /loaded|complete/.test(n.readyState))n.onload = n.onreadystatechange = null, r && n.parentNode && r.removeChild(n), n = t, i || o(200, "success")
                }, r.insertBefore(n, r.firstChild)
            }, abort:function () {
                n && n.onload(0, 1)
            }}
        }
    });
    var Hn, Bn = e.ActiveXObject ? function () {
        for (var e in Hn)Hn[e](0, 1)
    } : !1, jn = 0;
    v.ajaxSettings.xhr = e.ActiveXObject ? function () {
        return!this.isLocal && Fn() || In()
    } : Fn, function (e) {
        v.extend(v.support, {ajax:!!e, cors:!!e && "withCredentials"in e})
    }(v.ajaxSettings.xhr()), v.support.ajax && v.ajaxTransport(function (n) {
        if (!n.crossDomain || v.support.cors) {
            var r;
            return{send:function (i, s) {
                var o, u, a = n.xhr();
                n.username ? a.open(n.type, n.url, n.async, n.username, n.password) : a.open(n.type, n.url, n.async);
                if (n.xhrFields)for (u in n.xhrFields)a[u] = n.xhrFields[u];
                n.mimeType && a.overrideMimeType && a.overrideMimeType(n.mimeType), !n.crossDomain && !i["X-Requested-With"] && (i["X-Requested-With"] = "XMLHttpRequest");
                try {
                    for (u in i)a.setRequestHeader(u, i[u])
                } catch (f) {
                }
                a.send(n.hasContent && n.data || null), r = function (e, i) {
                    var u, f, l, c, h;
                    try {
                        if (r && (i || a.readyState === 4)) {
                            r = t, o && (a.onreadystatechange = v.noop, Bn && delete Hn[o]);
                            if (i)a.readyState !== 4 && a.abort(); else {
                                u = a.status, l = a.getAllResponseHeaders(), c = {}, h = a.responseXML, h && h.documentElement && (c.xml = h);
                                try {
                                    c.text = a.responseText
                                } catch (e) {
                                }
                                try {
                                    f = a.statusText
                                } catch (p) {
                                    f = ""
                                }
                                !u && n.isLocal && !n.crossDomain ? u = c.text ? 200 : 404 : u === 1223 && (u = 204)
                            }
                        }
                    } catch (d) {
                        i || s(-1, d)
                    }
                    c && s(u, f, c, l)
                }, n.async ? a.readyState === 4 ? setTimeout(r, 0) : (o = ++jn, Bn && (Hn || (Hn = {}, v(e).unload(Bn)), Hn[o] = r), a.onreadystatechange = r) : r()
            }, abort:function () {
                r && r(0, 1)
            }}
        }
    });
    var qn, Rn, Un = /^(?:toggle|show|hide)$/, zn = new RegExp("^(?:([-+])=|)(" + m + ")([a-z%]*)$", "i"), Wn = /queueHooks$/, Xn = [Gn], Vn = {"*":[function (e, t) {
        var n, r, i = this.createTween(e, t), s = zn.exec(t), o = i.cur(), u = +o || 0, a = 1, f = 20;
        if (s) {
            n = +s[2], r = s[3] || (v.cssNumber[e] ? "" : "px");
            if (r !== "px" && u) {
                u = v.css(i.elem, e, !0) || n || 1;
                do a = a || ".5", u /= a, v.style(i.elem, e, u + r); while (a !== (a = i.cur() / o) && a !== 1 && --f)
            }
            i.unit = r, i.start = u, i.end = s[1] ? u + (s[1] + 1) * n : n
        }
        return i
    }]};
    v.Animation = v.extend(Kn, {tweener:function (e, t) {
        v.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
        var n, r = 0, i = e.length;
        for (; r < i; r++)n = e[r], Vn[n] = Vn[n] || [], Vn[n].unshift(t)
    }, prefilter:function (e, t) {
        t ? Xn.unshift(e) : Xn.push(e)
    }}), v.Tween = Yn, Yn.prototype = {constructor:Yn, init:function (e, t, n, r, i, s) {
        this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = s || (v.cssNumber[n] ? "" : "px")
    }, cur:function () {
        var e = Yn.propHooks[this.prop];
        return e && e.get ? e.get(this) : Yn.propHooks._default.get(this)
    }, run:function (e) {
        var t, n = Yn.propHooks[this.prop];
        return this.options.duration ? this.pos = t = v.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Yn.propHooks._default.set(this), this
    }}, Yn.prototype.init.prototype = Yn.prototype, Yn.propHooks = {_default:{get:function (e) {
        var t;
        return e.elem[e.prop] == null || !!e.elem.style && e.elem.style[e.prop] != null ? (t = v.css(e.elem, e.prop, !1, ""), !t || t === "auto" ? 0 : t) : e.elem[e.prop]
    }, set:function (e) {
        v.fx.step[e.prop] ? v.fx.step[e.prop](e) : e.elem.style && (e.elem.style[v.cssProps[e.prop]] != null || v.cssHooks[e.prop]) ? v.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
    }}}, Yn.propHooks.scrollTop = Yn.propHooks.scrollLeft = {set:function (e) {
        e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
    }}, v.each(["toggle", "show", "hide"], function (e, t) {
        var n = v.fn[t];
        v.fn[t] = function (r, i, s) {
            return r == null || typeof r == "boolean" || !e && v.isFunction(r) && v.isFunction(i) ? n.apply(this, arguments) : this.animate(Zn(t, !0), r, i, s)
        }
    }), v.fn.extend({fadeTo:function (e, t, n, r) {
        return this.filter(Gt).css("opacity", 0).show().end().animate({opacity:t}, e, n, r)
    }, animate:function (e, t, n, r) {
        var i = v.isEmptyObject(e), s = v.speed(t, n, r), o = function () {
            var t = Kn(this, v.extend({}, e), s);
            i && t.stop(!0)
        };
        return i || s.queue === !1 ? this.each(o) : this.queue(s.queue, o)
    }, stop:function (e, n, r) {
        var i = function (e) {
            var t = e.stop;
            delete e.stop, t(r)
        };
        return typeof e != "string" && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function () {
            var t = !0, n = e != null && e + "queueHooks", s = v.timers, o = v._data(this);
            if (n)o[n] && o[n].stop && i(o[n]); else for (n in o)o[n] && o[n].stop && Wn.test(n) && i(o[n]);
            for (n = s.length; n--;)s[n].elem === this && (e == null || s[n].queue === e) && (s[n].anim.stop(r), t = !1, s.splice(n, 1));
            (t || !r) && v.dequeue(this, e)
        })
    }}), v.each({slideDown:Zn("show"), slideUp:Zn("hide"), slideToggle:Zn("toggle"), fadeIn:{opacity:"show"}, fadeOut:{opacity:"hide"}, fadeToggle:{opacity:"toggle"}}, function (e, t) {
        v.fn[e] = function (e, n, r) {
            return this.animate(t, e, n, r)
        }
    }), v.speed = function (e, t, n) {
        var r = e && typeof e == "object" ? v.extend({}, e) : {complete:n || !n && t || v.isFunction(e) && e, duration:e, easing:n && t || t && !v.isFunction(t) && t};
        r.duration = v.fx.off ? 0 : typeof r.duration == "number" ? r.duration : r.duration in v.fx.speeds ? v.fx.speeds[r.duration] : v.fx.speeds._default;
        if (r.queue == null || r.queue === !0)r.queue = "fx";
        return r.old = r.complete, r.complete = function () {
            v.isFunction(r.old) && r.old.call(this), r.queue && v.dequeue(this, r.queue)
        }, r
    }, v.easing = {linear:function (e) {
        return e
    }, swing:function (e) {
        return.5 - Math.cos(e * Math.PI) / 2
    }}, v.timers = [], v.fx = Yn.prototype.init, v.fx.tick = function () {
        var e, t = v.timers, n = 0;
        for (; n < t.length; n++)e = t[n], !e() && t[n] === e && t.splice(n--, 1);
        t.length || v.fx.stop()
    }, v.fx.timer = function (e) {
        e() && v.timers.push(e) && !Rn && (Rn = setInterval(v.fx.tick, v.fx.interval))
    }, v.fx.interval = 13, v.fx.stop = function () {
        clearInterval(Rn), Rn = null
    }, v.fx.speeds = {slow:600, fast:200, _default:400}, v.fx.step = {}, v.expr && v.expr.filters && (v.expr.filters.animated = function (e) {
        return v.grep(v.timers,function (t) {
            return e === t.elem
        }).length
    });
    var er = /^(?:body|html)$/i;
    v.fn.offset = function (e) {
        if (arguments.length)return e === t ? this : this.each(function (t) {
            v.offset.setOffset(this, e, t)
        });
        var n, r, i, s, o, u, a, f = {top:0, left:0}, l = this[0], c = l && l.ownerDocument;
        if (!c)return;
        return(r = c.body) === l ? v.offset.bodyOffset(l) : (n = c.documentElement, v.contains(n, l) ? (typeof l.getBoundingClientRect != "undefined" && (f = l.getBoundingClientRect()), i = tr(c), s = n.clientTop || r.clientTop || 0, o = n.clientLeft || r.clientLeft || 0, u = i.pageYOffset || n.scrollTop, a = i.pageXOffset || n.scrollLeft, {top:f.top + u - s, left:f.left + a - o}) : f)
    }, v.offset = {bodyOffset:function (e) {
        var t = e.offsetTop, n = e.offsetLeft;
        return v.support.doesNotIncludeMarginInBodyOffset && (t += parseFloat(v.css(e, "marginTop")) || 0, n += parseFloat(v.css(e, "marginLeft")) || 0), {top:t, left:n}
    }, setOffset:function (e, t, n) {
        var r = v.css(e, "position");
        r === "static" && (e.style.position = "relative");
        var i = v(e), s = i.offset(), o = v.css(e, "top"), u = v.css(e, "left"), a = (r === "absolute" || r === "fixed") && v.inArray("auto", [o, u]) > -1, f = {}, l = {}, c, h;
        a ? (l = i.position(), c = l.top, h = l.left) : (c = parseFloat(o) || 0, h = parseFloat(u) || 0), v.isFunction(t) && (t = t.call(e, n, s)), t.top != null && (f.top = t.top - s.top + c), t.left != null && (f.left = t.left - s.left + h), "using"in t ? t.using.call(e, f) : i.css(f)
    }}, v.fn.extend({position:function () {
        if (!this[0])return;
        var e = this[0], t = this.offsetParent(), n = this.offset(), r = er.test(t[0].nodeName) ? {top:0, left:0} : t.offset();
        return n.top -= parseFloat(v.css(e, "marginTop")) || 0, n.left -= parseFloat(v.css(e, "marginLeft")) || 0, r.top += parseFloat(v.css(t[0], "borderTopWidth")) || 0, r.left += parseFloat(v.css(t[0], "borderLeftWidth")) || 0, {top:n.top - r.top, left:n.left - r.left}
    }, offsetParent:function () {
        return this.map(function () {
            var e = this.offsetParent || i.body;
            while (e && !er.test(e.nodeName) && v.css(e, "position") === "static")e = e.offsetParent;
            return e || i.body
        })
    }}), v.each({scrollLeft:"pageXOffset", scrollTop:"pageYOffset"}, function (e, n) {
        var r = /Y/.test(n);
        v.fn[e] = function (i) {
            return v.access(this, function (e, i, s) {
                var o = tr(e);
                if (s === t)return o ? n in o ? o[n] : o.document.documentElement[i] : e[i];
                o ? o.scrollTo(r ? v(o).scrollLeft() : s, r ? s : v(o).scrollTop()) : e[i] = s
            }, e, i, arguments.length, null)
        }
    }), v.each({Height:"height", Width:"width"}, function (e, n) {
        v.each({padding:"inner" + e, content:n, "":"outer" + e}, function (r, i) {
            v.fn[i] = function (i, s) {
                var o = arguments.length && (r || typeof i != "boolean"), u = r || (i === !0 || s === !0 ? "margin" : "border");
                return v.access(this, function (n, r, i) {
                    var s;
                    return v.isWindow(n) ? n.document.documentElement["client" + e] : n.nodeType === 9 ? (s = n.documentElement, Math.max(n.body["scroll" + e], s["scroll" + e], n.body["offset" + e], s["offset" + e], s["client" + e])) : i === t ? v.css(n, r, i, u) : v.style(n, r, i, u)
                }, n, o ? i : t, o, null)
            }
        })
    }), e.jQuery = e.$ = v, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function () {
        return v
    })
})(window), function (e, t) {
    function n(t, n) {
        var i = t.nodeName.toLowerCase();
        if ("area" === i) {
            var s = t.parentNode, o = s.name, u;
            return!t.href || !o || s.nodeName.toLowerCase() !== "map" ? !1 : (u = e("img[usemap=#" + o + "]")[0], !!u && r(u))
        }
        return(/input|select|textarea|button|object/.test(i) ? !t.disabled : "a" == i ? t.href || n : n) && r(t)
    }

    function r(t) {
        return!e(t).parents().andSelf().filter(function () {
            return e.curCSS(this, "visibility") === "hidden" || e.expr.filters.hidden(this)
        }).length
    }

    e.ui = e.ui || {};
    if (e.ui.version)return;
    e.extend(e.ui, {version:"1.8.24", keyCode:{ALT:18, BACKSPACE:8, CAPS_LOCK:20, COMMA:188, COMMAND:91, COMMAND_LEFT:91, COMMAND_RIGHT:93, CONTROL:17, DELETE:46, DOWN:40, END:35, ENTER:13, ESCAPE:27, HOME:36, INSERT:45, LEFT:37, MENU:93, NUMPAD_ADD:107, NUMPAD_DECIMAL:110, NUMPAD_DIVIDE:111, NUMPAD_ENTER:108, NUMPAD_MULTIPLY:106, NUMPAD_SUBTRACT:109, PAGE_DOWN:34, PAGE_UP:33, PERIOD:190, RIGHT:39, SHIFT:16, SPACE:32, TAB:9, UP:38, WINDOWS:91}}), e.fn.extend({propAttr:e.fn.prop || e.fn.attr, _focus:e.fn.focus, focus:function (t, n) {
        return typeof t == "number" ? this.each(function () {
            var r = this;
            setTimeout(function () {
                e(r).focus(), n && n.call(r)
            }, t)
        }) : this._focus.apply(this, arguments)
    }, scrollParent:function () {
        var t;
        return e.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? t = this.parents().filter(function () {
            return/(relative|absolute|fixed)/.test(e.curCSS(this, "position", 1)) && /(auto|scroll)/.test(e.curCSS(this, "overflow", 1) + e.curCSS(this, "overflow-y", 1) + e.curCSS(this, "overflow-x", 1))
        }).eq(0) : t = this.parents().filter(function () {
            return/(auto|scroll)/.test(e.curCSS(this, "overflow", 1) + e.curCSS(this, "overflow-y", 1) + e.curCSS(this, "overflow-x", 1))
        }).eq(0), /fixed/.test(this.css("position")) || !t.length ? e(document) : t
    }, zIndex:function (n) {
        if (n !== t)return this.css("zIndex", n);
        if (this.length) {
            var r = e(this[0]), i, s;
            while (r.length && r[0] !== document) {
                i = r.css("position");
                if (i === "absolute" || i === "relative" || i === "fixed") {
                    s = parseInt(r.css("zIndex"), 10);
                    if (!isNaN(s) && s !== 0)return s
                }
                r = r.parent()
            }
        }
        return 0
    }, disableSelection:function () {
        return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (e) {
            e.preventDefault()
        })
    }, enableSelection:function () {
        return this.unbind(".ui-disableSelection")
    }}), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function (n, r) {
        function u(t, n, r, s) {
            return e.each(i, function () {
                n -= parseFloat(e.curCSS(t, "padding" + this, !0)) || 0, r && (n -= parseFloat(e.curCSS(t, "border" + this + "Width", !0)) || 0), s && (n -= parseFloat(e.curCSS(t, "margin" + this, !0)) || 0)
            }), n
        }

        var i = r === "Width" ? ["Left", "Right"] : ["Top", "Bottom"], s = r.toLowerCase(), o = {innerWidth:e.fn.innerWidth, innerHeight:e.fn.innerHeight, outerWidth:e.fn.outerWidth, outerHeight:e.fn.outerHeight};
        e.fn["inner" + r] = function (n) {
            return n === t ? o["inner" + r].call(this) : this.each(function () {
                e(this).css(s, u(this, n) + "px")
            })
        }, e.fn["outer" + r] = function (t, n) {
            return typeof t != "number" ? o["outer" + r].call(this, t) : this.each(function () {
                e(this).css(s, u(this, t, !0, n) + "px")
            })
        }
    }), e.extend(e.expr[":"], {data:e.expr.createPseudo ? e.expr.createPseudo(function (t) {
        return function (n) {
            return!!e.data(n, t)
        }
    }) : function (t, n, r) {
        return!!e.data(t, r[3])
    }, focusable:function (t) {
        return n(t, !isNaN(e.attr(t, "tabindex")))
    }, tabbable:function (t) {
        var r = e.attr(t, "tabindex"), i = isNaN(r);
        return(i || r >= 0) && n(t, !i)
    }}), e(function () {
        var t = document.body, n = t.appendChild(n = document.createElement("div"));
        n.offsetHeight, e.extend(n.style, {minHeight:"100px", height:"auto", padding:0, borderWidth:0}), e.support.minHeight = n.offsetHeight === 100, e.support.selectstart = "onselectstart"in n, t.removeChild(n).style.display = "none"
    }), e.curCSS || (e.curCSS = e.css), e.extend(e.ui, {plugin:{add:function (t, n, r) {
        var i = e.ui[t].prototype;
        for (var s in r)i.plugins[s] = i.plugins[s] || [], i.plugins[s].push([n, r[s]])
    }, call:function (e, t, n) {
        var r = e.plugins[t];
        if (!r || !e.element[0].parentNode)return;
        for (var i = 0; i < r.length; i++)e.options[r[i][0]] && r[i][1].apply(e.element, n)
    }}, contains:function (e, t) {
        return document.compareDocumentPosition ? e.compareDocumentPosition(t) & 16 : e !== t && e.contains(t)
    }, hasScroll:function (t, n) {
        if (e(t).css("overflow") === "hidden")return!1;
        var r = n && n === "left" ? "scrollLeft" : "scrollTop", i = !1;
        return t[r] > 0 ? !0 : (t[r] = 1, i = t[r] > 0, t[r] = 0, i)
    }, isOverAxis:function (e, t, n) {
        return e > t && e < t + n
    }, isOver:function (t, n, r, i, s, o) {
        return e.ui.isOverAxis(t, r, s) && e.ui.isOverAxis(n, i, o)
    }})
}(jQuery), function (e, t) {
    if (e.cleanData) {
        var n = e.cleanData;
        e.cleanData = function (t) {
            for (var r = 0, i; (i = t[r]) != null; r++)try {
                e(i).triggerHandler("remove")
            } catch (s) {
            }
            n(t)
        }
    } else {
        var r = e.fn.remove;
        e.fn.remove = function (t, n) {
            return this.each(function () {
                return n || (!t || e.filter(t, [this]).length) && e("*", this).add([this]).each(function () {
                    try {
                        e(this).triggerHandler("remove"
                        )
                    } catch (t) {
                    }
                }), r.call(e(this), t, n)
            })
        }
    }
    e.widget = function (t, n, r) {
        var i = t.split(".")[0], s;
        t = t.split(".")[1], s = i + "-" + t, r || (r = n, n = e.Widget), e.expr[":"][s] = function (n) {
            return!!e.data(n, t)
        }, e[i] = e[i] || {}, e[i][t] = function (e, t) {
            arguments.length && this._createWidget(e, t)
        };
        var o = new n;
        o.options = e.extend(!0, {}, o.options), e[i][t].prototype = e.extend(!0, o, {namespace:i, widgetName:t, widgetEventPrefix:e[i][t].prototype.widgetEventPrefix || t, widgetBaseClass:s}, r), e.widget.bridge(t, e[i][t])
    }, e.widget.bridge = function (n, r) {
        e.fn[n] = function (i) {
            var s = typeof i == "string", o = Array.prototype.slice.call(arguments, 1), u = this;
            return i = !s && o.length ? e.extend.apply(null, [!0, i].concat(o)) : i, s && i.charAt(0) === "_" ? u : (s ? this.each(function () {
                var r = e.data(this, n), s = r && e.isFunction(r[i]) ? r[i].apply(r, o) : r;
                if (s !== r && s !== t)return u = s, !1
            }) : this.each(function () {
                var t = e.data(this, n);
                t ? t.option(i || {})._init() : e.data(this, n, new r(i, this))
            }), u)
        }
    }, e.Widget = function (e, t) {
        arguments.length && this._createWidget(e, t)
    }, e.Widget.prototype = {widgetName:"widget", widgetEventPrefix:"", options:{disabled:!1}, _createWidget:function (t, n) {
        e.data(n, this.widgetName, this), this.element = e(n), this.options = e.extend(!0, {}, this.options, this._getCreateOptions(), t);
        var r = this;
        this.element.bind("remove." + this.widgetName, function () {
            r.destroy()
        }), this._create(), this._trigger("create"), this._init()
    }, _getCreateOptions:function () {
        return e.metadata && e.metadata.get(this.element[0])[this.widgetName]
    }, _create:function () {
    }, _init:function () {
    }, destroy:function () {
        this.element.unbind("." + this.widgetName).removeData(this.widgetName), this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled " + "ui-state-disabled")
    }, widget:function () {
        return this.element
    }, option:function (n, r) {
        var i = n;
        if (arguments.length === 0)return e.extend({}, this.options);
        if (typeof n == "string") {
            if (r === t)return this.options[n];
            i = {}, i[n] = r
        }
        return this._setOptions(i), this
    }, _setOptions:function (t) {
        var n = this;
        return e.each(t, function (e, t) {
            n._setOption(e, t)
        }), this
    }, _setOption:function (e, t) {
        return this.options[e] = t, e === "disabled" && this.widget()[t ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled" + " " + "ui-state-disabled").attr("aria-disabled", t), this
    }, enable:function () {
        return this._setOption("disabled", !1)
    }, disable:function () {
        return this._setOption("disabled", !0)
    }, _trigger:function (t, n, r) {
        var i, s, o = this.options[t];
        r = r || {}, n = e.Event(n), n.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), n.target = this.element[0], s = n.originalEvent;
        if (s)for (i in s)i in n || (n[i] = s[i]);
        return this.element.trigger(n, r), !(e.isFunction(o) && o.call(this.element[0], n, r) === !1 || n.isDefaultPrevented())
    }}
}(jQuery), function (e, t) {
    e.ui = e.ui || {};
    var n = /left|center|right/, r = /top|center|bottom/, i = "center", s = {}, o = e.fn.position, u = e.fn.offset;
    e.fn.position = function (t) {
        if (!t || !t.of)return o.apply(this, arguments);
        t = e.extend({}, t);
        var u = e(t.of), a = u[0], f = (t.collision || "flip").split(" "), l = t.offset ? t.offset.split(" ") : [0, 0], c, h, p;
        return a.nodeType === 9 ? (c = u.width(), h = u.height(), p = {top:0, left:0}) : a.setTimeout ? (c = u.width(), h = u.height(), p = {top:u.scrollTop(), left:u.scrollLeft()}) : a.preventDefault ? (t.at = "left top", c = h = 0, p = {top:t.of.pageY, left:t.of.pageX}) : (c = u.outerWidth(), h = u.outerHeight(), p = u.offset()), e.each(["my", "at"], function () {
            var e = (t[this] || "").split(" ");
            e.length === 1 && (e = n.test(e[0]) ? e.concat([i]) : r.test(e[0]) ? [i].concat(e) : [i, i]), e[0] = n.test(e[0]) ? e[0] : i, e[1] = r.test(e[1]) ? e[1] : i, t[this] = e
        }), f.length === 1 && (f[1] = f[0]), l[0] = parseInt(l[0], 10) || 0, l.length === 1 && (l[1] = l[0]), l[1] = parseInt(l[1], 10) || 0, t.at[0] === "right" ? p.left += c : t.at[0] === i && (p.left += c / 2), t.at[1] === "bottom" ? p.top += h : t.at[1] === i && (p.top += h / 2), p.left += l[0], p.top += l[1], this.each(function () {
            var n = e(this), r = n.outerWidth(), o = n.outerHeight(), u = parseInt(e.curCSS(this, "marginLeft", !0)) || 0, a = parseInt(e.curCSS(this, "marginTop", !0)) || 0, d = r + u + (parseInt(e.curCSS(this, "marginRight", !0)) || 0), v = o + a + (parseInt(e.curCSS(this, "marginBottom", !0)) || 0), m = e.extend({}, p), g;
            t.my[0] === "right" ? m.left -= r : t.my[0] === i && (m.left -= r / 2), t.my[1] === "bottom" ? m.top -= o : t.my[1] === i && (m.top -= o / 2), s.fractions || (m.left = Math.round(m.left), m.top = Math.round(m.top)), g = {left:m.left - u, top:m.top - a}, e.each(["left", "top"], function (n, i) {
                e.ui.position[f[n]] && e.ui.position[f[n]][i](m, {targetWidth:c, targetHeight:h, elemWidth:r, elemHeight:o, collisionPosition:g, collisionWidth:d, collisionHeight:v, offset:l, my:t.my, at:t.at})
            }), e.fn.bgiframe && n.bgiframe(), n.offset(e.extend(m, {using:t.using}))
        })
    }, e.ui.position = {fit:{left:function (t, n) {
        var r = e(window), i = n.collisionPosition.left + n.collisionWidth - r.width() - r.scrollLeft();
        t.left = i > 0 ? t.left - i : Math.max(t.left - n.collisionPosition.left, t.left)
    }, top:function (t, n) {
        var r = e(window), i = n.collisionPosition.top + n.collisionHeight - r.height() - r.scrollTop();
        t.top = i > 0 ? t.top - i : Math.max(t.top - n.collisionPosition.top, t.top)
    }}, flip:{left:function (t, n) {
        if (n.at[0] === i)return;
        var r = e(window), s = n.collisionPosition.left + n.collisionWidth - r.width() - r.scrollLeft(), o = n.my[0] === "left" ? -n.elemWidth : n.my[0] === "right" ? n.elemWidth : 0, u = n.at[0] === "left" ? n.targetWidth : -n.targetWidth, a = -2 * n.offset[0];
        t.left += n.collisionPosition.left < 0 ? o + u + a : s > 0 ? o + u + a : 0
    }, top:function (t, n) {
        if (n.at[1] === i)return;
        var r = e(window), s = n.collisionPosition.top + n.collisionHeight - r.height() - r.scrollTop(), o = n.my[1] === "top" ? -n.elemHeight : n.my[1] === "bottom" ? n.elemHeight : 0, u = n.at[1] === "top" ? n.targetHeight : -n.targetHeight, a = -2 * n.offset[1];
        t.top += n.collisionPosition.top < 0 ? o + u + a : s > 0 ? o + u + a : 0
    }}}, e.offset.setOffset || (e.offset.setOffset = function (t, n) {
        /static/.test(e.curCSS(t, "position")) && (t.style.position = "relative");
        var r = e(t), i = r.offset(), s = parseInt(e.curCSS(t, "top", !0), 10) || 0, o = parseInt(e.curCSS(t, "left", !0), 10) || 0, u = {top:n.top - i.top + s, left:n.left - i.left + o};
        "using"in n ? n.using.call(t, u) : r.css(u)
    }, e.fn.offset = function (t) {
        var n = this[0];
        return!n || !n.ownerDocument ? null : t ? e.isFunction(t) ? this.each(function (n) {
            e(this).offset(t.call(this, n, e(this).offset()))
        }) : this.each(function () {
            e.offset.setOffset(this, t)
        }) : u.call(this)
    }), e.curCSS || (e.curCSS = e.css), function () {
        var t = document.getElementsByTagName("body")[0], n = document.createElement("div"), r, i, o, u, a;
        r = document.createElement(t ? "div" : "body"), o = {visibility:"hidden", width:0, height:0, border:0, margin:0, background:"none"}, t && e.extend(o, {position:"absolute", left:"-1000px", top:"-1000px"});
        for (var f in o)r.style[f] = o[f];
        r.appendChild(n), i = t || document.documentElement, i.insertBefore(r, i.firstChild), n.style.cssText = "position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;", u = e(n).offset(function (e, t) {
            return t
        }).offset(), r.innerHTML = "", i.removeChild(r), a = u.top + u.left + (t ? 2e3 : 0), s.fractions = a > 21 && a < 22
    }()
}(jQuery), function (e, t) {
    var n = !1;
    e(document).mouseup(function (e) {
        n = !1
    }), e.widget("ui.mouse", {options:{cancel:":input,option", distance:1, delay:0}, _mouseInit:function () {
        var t = this;
        this.element.bind("mousedown." + this.widgetName,function (e) {
            return t._mouseDown(e)
        }).bind("click." + this.widgetName, function (n) {
            if (!0 === e.data(n.target, t.widgetName + ".preventClickEvent"))return e.removeData(n.target, t.widgetName + ".preventClickEvent"), n.stopImmediatePropagation(), !1
        }), this.started = !1
    }, _mouseDestroy:function () {
        this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
    }, _mouseDown:function (t) {
        if (n)return;
        this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t;
        var r = this, i = t.which == 1, s = typeof this.options.cancel == "string" && t.target.nodeName ? e(t.target).closest(this.options.cancel).length : !1;
        if (!i || s || !this._mouseCapture(t))return!0;
        this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
            r.mouseDelayMet = !0
        }, this.options.delay));
        if (this._mouseDistanceMet(t) && this._mouseDelayMet(t)) {
            this._mouseStarted = this._mouseStart(t) !== !1;
            if (!this._mouseStarted)return t.preventDefault(), !0
        }
        return!0 === e.data(t.target, this.widgetName + ".preventClickEvent") && e.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (e) {
            return r._mouseMove(e)
        }, this._mouseUpDelegate = function (e) {
            return r._mouseUp(e)
        }, e(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), n = !0, !0
    }, _mouseMove:function (t) {
        return!e.browser.msie || document.documentMode >= 9 || !!t.button ? this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted) : this._mouseUp(t)
    }, _mouseUp:function (t) {
        return e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target == this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), !1
    }, _mouseDistanceMet:function (e) {
        return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
    }, _mouseDelayMet:function (e) {
        return this.mouseDelayMet
    }, _mouseStart:function (e) {
    }, _mouseDrag:function (e) {
    }, _mouseStop:function (e) {
    }, _mouseCapture:function (e) {
        return!0
    }})
}(jQuery), function (e, t) {
    e.widget("ui.draggable", e.ui.mouse, {widgetEventPrefix:"drag", options:{addClasses:!0, appendTo:"parent", axis:!1, connectToSortable:!1, containment:!1, cursor:"auto", cursorAt:!1, grid:!1, handle:!1, helper:"original", iframeFix:!1, opacity:!1, refreshPositions:!1, revert:!1, revertDuration:500, scope:"default", scroll:!0, scrollSensitivity:20, scrollSpeed:20, snap:!1, snapMode:"both", snapTolerance:20, stack:!1, zIndex:!1}, _create:function () {
        this.options.helper == "original" && !/^(?:r|a|f)/.test(this.element.css("position")) && (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
    }, destroy:function () {
        if (!this.element.data("draggable"))return;
        return this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy(), this
    }, _mouseCapture:function (t) {
        var n = this.options;
        return this.helper || n.disabled || e(t.target).is(".ui-resizable-handle") ? !1 : (this.handle = this._getHandle(t), this.handle ? (n.iframeFix && e(n.iframeFix === !0 ? "iframe" : n.iframeFix).each(function () {
            e('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth + "px", height:this.offsetHeight + "px", position:"absolute", opacity:"0.001", zIndex:1e3}).css(e(this).offset()).appendTo("body")
        }), !0) : !1)
    }, _mouseStart:function (t) {
        var n = this.options;
        return this.helper = this._createHelper(t), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), e.ui.ddmanager && (e.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offset = this.positionAbs = this.element.offset(), this.offset = {top:this.offset.top - this.margins.top, left:this.offset.left - this.margins.left}, e.extend(this.offset, {click:{left:t.pageX - this.offset.left, top:t.pageY - this.offset.top}, parent:this._getParentOffset(), relative:this._getRelativeOffset()}), this.originalPosition = this.position = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, n.cursorAt && this._adjustOffsetFromHelper(n.cursorAt), n.containment && this._setContainment(), this._trigger("start", t) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), e.ui.ddmanager && !n.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this._mouseDrag(t, !0), e.ui.ddmanager && e.ui.ddmanager.dragStart(this, t), !0)
    }, _mouseDrag:function (t, n) {
        this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute");
        if (!n) {
            var r = this._uiHash();
            if (this._trigger("drag", t, r) === !1)return this._mouseUp({}), !1;
            this.position = r.position
        }
        if (!this.options.axis || this.options.axis != "y")this.helper[0].style.left = this.position.left + "px";
        if (!this.options.axis || this.options.axis != "x")this.helper[0].style.top = this.position.top + "px";
        return e.ui.ddmanager && e.ui.ddmanager.drag(this, t), !1
    }, _mouseStop:function (t) {
        var n = !1;
        e.ui.ddmanager && !this.options.dropBehaviour && (n = e.ui.ddmanager.drop(this, t)), this.dropped && (n = this.dropped, this.dropped = !1);
        var r = this.element[0], i = !1;
        while (r && (r = r.parentNode))r == document && (i = !0);
        if (!i && this.options.helper === "original")return!1;
        if (this.options.revert == "invalid" && !n || this.options.revert == "valid" && n || this.options.revert === !0 || e.isFunction(this.options.revert) && this.options.revert.call(this.element, n)) {
            var s = this;
            e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
                s._trigger("stop", t) !== !1 && s._clear()
            })
        } else this._trigger("stop", t) !== !1 && this._clear();
        return!1
    }, _mouseUp:function (t) {
        return e("div.ui-draggable-iframeFix").each(function () {
            this.parentNode.removeChild(this)
        }), e.ui.ddmanager && e.ui.ddmanager.dragStop(this, t), e.ui.mouse.prototype._mouseUp.call(this, t)
    }, cancel:function () {
        return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
    }, _getHandle:function (t) {
        var n = !this.options.handle || !e(this.options.handle, this.element).length ? !0 : !1;
        return e(this.options.handle, this.element).find("*").andSelf().each(function () {
            this == t.target && (n = !0)
        }), n
    }, _createHelper:function (t) {
        var n = this.options, r = e.isFunction(n.helper) ? e(n.helper.apply(this.element[0], [t])) : n.helper == "clone" ? this.element.clone().removeAttr("id") : this.element;
        return r.parents("body").length || r.appendTo(n.appendTo == "parent" ? this.element[0].parentNode : n.appendTo), r[0] != this.element[0] && !/(fixed|absolute)/.test(r.css("position")) && r.css("position", "absolute"), r
    }, _adjustOffsetFromHelper:function (t) {
        typeof t == "string" && (t = t.split(" ")), e.isArray(t) && (t = {left:+t[0], top:+t[1] || 0}), "left"in t && (this.offset.click.left = t.left + this.margins.left), "right"in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top"in t && (this.offset.click.top = t.top + this.margins.top), "bottom"in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
    }, _getParentOffset:function () {
        this.offsetParent = this.helper.offsetParent();
        var t = this.offsetParent.offset();
        this.cssPosition == "absolute" && this.scrollParent[0] != document && e.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop());
        if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && e.browser.msie)t = {top:0, left:0};
        return{top:t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left:t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)}
    }, _getRelativeOffset:function () {
        if (this.cssPosition == "relative") {
            var e = this.element.position();
            return{top:e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(), left:e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()}
        }
        return{top:0, left:0}
    }, _cacheMargins:function () {
        this.margins = {left:parseInt(this.element.css("marginLeft"), 10) || 0, top:parseInt(this.element.css("marginTop"), 10) || 0, right:parseInt(this.element.css("marginRight"), 10) || 0, bottom:parseInt(this.element.css("marginBottom"), 10) || 0}
    }, _cacheHelperProportions:function () {
        this.helperProportions = {width:this.helper.outerWidth(), height:this.helper.outerHeight()}
    }, _setContainment:function () {
        var t = this.options;
        t.containment == "parent" && (t.containment = this.helper[0].parentNode);
        if (t.containment == "document" || t.containment == "window")this.containment = [t.containment == "document" ? 0 : e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t.containment == "document" ? 0 : e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, (t.containment == "document" ? 0 : e(window).scrollLeft()) + e(t.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (t.containment == "document" ? 0 : e(window).scrollTop()) + (e(t.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
        if (!/^(document|window|parent)$/.test(t.containment) && t.containment.constructor != Array) {
            var n = e(t.containment), r = n[0];
            if (!r)return;
            var i = n.offset(), s = e(r).css("overflow") != "hidden";
            this.containment = [(parseInt(e(r).css("borderLeftWidth"), 10) || 0) + (parseInt(e(r).css("paddingLeft"), 10) || 0), (parseInt(e(r).css("borderTopWidth"), 10) || 0) + (parseInt(e(r).css("paddingTop"), 10) || 0), (s ? Math.max(r.scrollWidth, r.offsetWidth) : r.offsetWidth) - (parseInt(e(r).css("borderLeftWidth"), 10) || 0) - (parseInt(e(r).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (s ? Math.max(r.scrollHeight, r.offsetHeight) : r.offsetHeight) - (parseInt(e(r).css("borderTopWidth"), 10) || 0) - (parseInt(e(r).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = n
        } else t.containment.constructor == Array && (this.containment = t.containment)
    }, _convertPositionTo:function (t, n) {
        n || (n = this.position);
        var r = t == "absolute" ? 1 : -1, i = this.options, s = this.cssPosition != "absolute" || this.scrollParent[0] != document && !!e.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, o = /(html|body)/i.test(s[0].tagName);
        return{top:n.top + this.offset.relative.top * r + this.offset.parent.top * r - (e.browser.safari && e.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : o ? 0 : s.scrollTop()) * r), left:n.left + this.offset.relative.left * r + this.offset.parent.left * r - (e.browser.safari && e.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : o ? 0 : s.scrollLeft()) * r)}
    }, _generatePosition:function (t) {
        var n = this.options, r = this.cssPosition != "absolute" || this.scrollParent[0] != document && !!e.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, i = /(html|body)/i.test(r[0].tagName), s = t.pageX, o = t.pageY;
        if (this.originalPosition) {
            var u;
            if (this.containment) {
                if (this.relative_container) {
                    var a = this.relative_container.offset();
                    u = [this.containment[0] + a.left, this.containment[1] + a.top, this.containment[2] + a.left, this.containment[3] + a.top]
                } else u = this.containment;
                t.pageX - this.offset.click.left < u[0] && (s = u[0] + this.offset.click.left), t.pageY - this.offset.click.top < u[1] && (o = u[1] + this.offset.click.top), t.pageX - this.offset.click.left > u[2] && (s = u[2] + this.offset.click.left), t.pageY - this.offset.click.top > u[3] && (o = u[3] + this.offset.click.top)
            }
            if (n.grid) {
                var f = n.grid[1] ? this.originalPageY + Math.round((o - this.originalPageY) / n.grid[1]) * n.grid[1] : this.originalPageY;
                o = u ? f - this.offset.click.top < u[1] || f - this.offset.click.top > u[3] ? f - this.offset.click.top < u[1] ? f + n.grid[1] : f - n.grid[1] : f : f;
                var l = n.grid[0] ? this.originalPageX + Math.round((s - this.originalPageX) / n.grid[0]) * n.grid[0] : this.originalPageX;
                s = u ? l - this.offset.click.left < u[0] || l - this.offset.click.left > u[2] ? l - this.offset.click.left < u[0] ? l + n.grid[0] : l - n.grid[0] : l : l
            }
        }
        return{top:o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (e.browser.safari && e.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : i ? 0 : r.scrollTop()), left:s - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (e.browser.safari && e.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : r.scrollLeft())}
    }, _clear:function () {
        this.helper.removeClass("ui-draggable-dragging"), this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
    }, _trigger:function (t, n, r) {
        return r = r || this._uiHash(), e.ui.plugin.call(this, t, [n, r]), t == "drag" && (this.positionAbs = this._convertPositionTo("absolute")), e.Widget.prototype._trigger.call(this, t, n, r)
    }, plugins:{}, _uiHash:function (e) {
        return{helper:this.helper, position:this.position, originalPosition:this.originalPosition, offset:this.positionAbs}
    }}), e.extend(e.ui.draggable, {version:"1.8.24"}), e.ui.plugin.add("draggable", "connectToSortable", {start:function (t, n) {
        var r = e(this).data("draggable"), i = r.options, s = e.extend({}, n, {item:r.element});
        r.sortables = [], e(i.connectToSortable).each(function () {
            var n = e.data(this, "sortable");
            n && !n.options.disabled && (r.sortables.push({instance:n, shouldRevert:n.options.revert}), n.refreshPositions(), n._trigger("activate", t, s))
        })
    }, stop:function (t, n) {
        var r = e(this).data("draggable"), i = e.extend({}, n, {item:r.element});
        e.each(r.sortables, function () {
            this.instance.isOver ? (this.instance.isOver = 0, r.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(t), this.instance.options.helper = this.instance.options._helper, r.options.helper == "original" && this.instance.currentItem.css({top:"auto", left:"auto"})) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", t, i))
        })
    }, drag:function (t, n) {
        var r = e(this).data("draggable"), i = this, s = function (t) {
            var n = this.offset.click.top, r = this.offset.click.left, i = this.positionAbs.top, s = this.positionAbs.left, o = t.height, u = t.width, a = t.top, f = t.left;
            return e.ui.isOver(i + n, s + r, a, f, o, u)
        };
        e.each(r.sortables, function (s) {
            this.instance.positionAbs = r.positionAbs, this.instance.helperProportions = r.helperProportions, this.instance.offset.click = r.offset.click, this.instance._intersectsWith(this.instance.containerCache) ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = e(i).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function () {
                return n.helper[0]
            }, t.target = this.instance.currentItem[0], this.instance._mouseCapture(t, !0), this.instance._mouseStart(t, !0, !0), this.instance.offset.click.top = r.offset.click.top, this.instance.offset.click.left = r.offset.click.left, this.instance.offset.parent.left -= r.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= r.offset.parent.top - this.instance.offset.parent.top, r._trigger("toSortable", t), r.dropped = this.instance.element, r.currentItem = r.element, this.instance.fromOutside = r), this.instance.currentItem && this.instance._mouseDrag(t)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", t, this.instance._uiHash(this.instance)), this.instance._mouseStop(t, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), r._trigger("fromSortable", t), r.dropped = !1)
        })
    }}), e.ui.plugin.add("draggable", "cursor", {start:function (t, n) {
        var r = e("body"), i = e(this).data("draggable").options;
        r.css("cursor") && (i._cursor = r.css("cursor")), r.css("cursor", i.cursor)
    }, stop:function (t, n) {
        var r = e(this).data("draggable").options;
        r._cursor && e("body").css("cursor", r._cursor)
    }}), e.ui.plugin.add("draggable", "opacity", {start:function (t, n) {
        var r = e(n.helper), i = e(this).data("draggable").options;
        r.css("opacity") && (i._opacity = r.css("opacity")), r.css("opacity", i.opacity)
    }, stop:function (t, n) {
        var r = e(this).data("draggable").options;
        r._opacity && e(n.helper).css("opacity", r._opacity)
    }}), e.ui.plugin.add("draggable", "scroll", {start:function (t, n) {
        var r = e(this).data("draggable");
        r.scrollParent[0] != document && r.scrollParent[0].tagName != "HTML" && (r.overflowOffset = r.scrollParent.offset())
    }, drag:function (t, n) {
        var r = e(this).data("draggable"), i = r.options, s = !1;
        if (r.scrollParent[0] != document && r.scrollParent[0].tagName != "HTML") {
            if (!i.axis || i.axis != "x")r.overflowOffset.top + r.scrollParent[0].offsetHeight - t.pageY < i.scrollSensitivity ? r.scrollParent[0].scrollTop = s = r.scrollParent[0].scrollTop + i.scrollSpeed : t.pageY - r.overflowOffset.top < i.scrollSensitivity && (r.scrollParent[0].scrollTop = s = r.scrollParent[0].scrollTop - i.scrollSpeed);
            if (!i.axis || i.axis != "y")r.overflowOffset.left + r.scrollParent[0].offsetWidth - t.pageX < i.scrollSensitivity ? r.scrollParent[0].scrollLeft = s = r.scrollParent[0].scrollLeft + i.scrollSpeed : t.pageX - r.overflowOffset.left < i.scrollSensitivity && (r.scrollParent[0].scrollLeft = s = r.scrollParent[0].scrollLeft - i.scrollSpeed)
        } else {
            if (!i.axis || i.axis != "x")t.pageY - e(document).scrollTop() < i.scrollSensitivity ? s = e(document).scrollTop(e(document).scrollTop() - i.scrollSpeed) : e(window).height() - (t.pageY - e(document).scrollTop()) < i.scrollSensitivity && (s = e(document).scrollTop(e(document).scrollTop() + i.scrollSpeed));
            if (!i.axis || i.axis != "y")t.pageX - e(document).scrollLeft() < i.scrollSensitivity ? s = e(document).scrollLeft(e(document).scrollLeft() - i.scrollSpeed) : e(window).width() - (t.pageX - e(document).scrollLeft()) < i.scrollSensitivity && (s = e(document).scrollLeft(e(document).scrollLeft() + i.scrollSpeed))
        }
        s !== !1 && e.ui.ddmanager && !i.dropBehaviour && e.ui.ddmanager.prepareOffsets(r, t)
    }}), e.ui.plugin.add("draggable", "snap", {start:function (t, n) {
        var r = e(this).data("draggable"), i = r.options;
        r.snapElements = [], e(i.snap.constructor != String ? i.snap.items || ":data(draggable)" : i.snap).each(function () {
            var t = e(this), n = t.offset();
            this != r.element[0] && r.snapElements.push({item:this, width:t.outerWidth(), height:t.outerHeight(), top:n.top, left:n.left})
        })
    }, drag:function (t, n) {
        var r = e(this).data("draggable"), i = r.options, s = i.snapTolerance, o = n.offset.left, u = o + r.helperProportions.width, a = n.offset.top, f = a + r.helperProportions.height;
        for (var l = r.snapElements.length - 1; l >= 0; l--) {
            var c = r.snapElements[l].left, h = c + r.snapElements[l].width, p = r.snapElements[l].top, d = p + r.snapElements[l].height;
            if (!(c - s < o && o < h + s && p - s < a && a < d + s || c - s < o && o < h + s && p - s < f && f < d + s || c - s < u && u < h + s && p - s < a && a < d + s || c - s < u && u < h + s && p - s < f && f < d + s)) {
                r.snapElements[l].snapping && r.options.snap.release && r.options.snap.release.call(r.element, t, e.extend(r._uiHash(), {snapItem:r.snapElements[l].item})), r.snapElements[l].snapping = !1;
                continue
            }
            if (i.snapMode != "inner") {
                var v = Math.abs(p - f) <= s, m = Math.abs(d - a) <= s, g = Math.abs(c - u) <= s, y = Math.abs(h - o) <= s;
                v && (n.position.top = r._convertPositionTo("relative", {top:p - r.helperProportions.height, left:0}).top - r.margins.top), m && (n.position.top = r._convertPositionTo("relative", {top:d, left:0}).top - r.margins.top), g && (n.position.left = r._convertPositionTo("relative", {top:0, left:c - r.helperProportions.width}).left - r.margins.left), y && (n.position.left = r._convertPositionTo("relative", {top:0, left:h}).left - r.margins.left)
            }
            var b = v || m || g || y;
            if (i.snapMode != "outer") {
                var v = Math.abs(p - a) <= s, m = Math.abs(d - f) <= s, g = Math.abs(c - o) <= s, y = Math.abs(h - u) <= s;
                v && (n.position.top = r._convertPositionTo("relative", {top:p, left:0}).top - r.margins.top), m && (n.position.top = r._convertPositionTo("relative", {top:d - r.helperProportions.height, left:0}).top - r.margins.top), g && (n.position.left = r._convertPositionTo("relative", {top:0, left:c}).left - r.margins.left), y && (n.position.left = r._convertPositionTo("relative", {top:0, left:h - r.helperProportions.width}).left - r.margins.left)
            }
            !r.snapElements[l].snapping && (v || m || g || y || b) && r.options.snap.snap && r.options.snap.snap.call(r.element, t, e.extend(r._uiHash(), {snapItem:r.snapElements[l].item})), r.snapElements[l].snapping = v || m || g || y || b
        }
    }}), e.ui.plugin.add("draggable", "stack", {start:function (t, n) {
        var r = e(this).data("draggable").options, i = e.makeArray(e(r.stack)).sort(function (t, n) {
            return(parseInt(e(t).css("zIndex"), 10) || 0) - (parseInt(e(n).css("zIndex"), 10) || 0)
        });
        if (!i.length)return;
        var s = parseInt(i[0].style.zIndex) || 0;
        e(i).each(function (e) {
            this.style.zIndex = s + e
        }), this[0].style.zIndex = s + i.length
    }}), e.ui.plugin.add("draggable", "zIndex", {start:function (t, n) {
        var r = e(n.helper), i = e(this).data("draggable").options;
        r.css("zIndex") && (i._zIndex = r.css("zIndex")), r.css("zIndex", i.zIndex)
    }, stop:function (t, n) {
        var r = e(this).data("draggable").options;
        r._zIndex && e(n.helper).css("zIndex", r._zIndex)
    }})
}(jQuery), function (e, t) {
    e.widget("ui.resizable", e.ui.mouse, {widgetEventPrefix:"resize", options:{alsoResize:!1, animate:!1, animateDuration:"slow", animateEasing:"swing", aspectRatio:!1, autoHide:!1, containment:!1, ghost:!1, grid:!1, handles:"e,s,se", helper:!1, maxHeight:null, maxWidth:null, minHeight:10, minWidth:10, zIndex:1e3}, _create:function () {
        var t = this, n = this.options;
        this.element.addClass("ui-resizable"), e.extend(this, {_aspectRatio:!!n.aspectRatio, aspectRatio:n.aspectRatio, originalElement:this.element, _proportionallyResizeElements:[], _helper:n.helper || n.ghost || n.animate ? n.helper || "ui-resizable-helper" : null}), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(e('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"), width:this.element.outerWidth(), height:this.element.outerHeight(), top:this.element.css("top"), left:this.element.css("left")})), this.element = this.element.parent().data("resizable", this.element.data("resizable")), this.elementIsWrapper = !0, this.element.css({marginLeft:this.originalElement.css("marginLeft"), marginTop:this.originalElement.css("marginTop"), marginRight:this.originalElement.css("marginRight"), marginBottom:this.originalElement.css("marginBottom")}), this.originalElement.css({marginLeft:0, marginTop:0, marginRight:0, marginBottom:0}), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({position:"static", zoom:1, display:"block"})), this.originalElement.css({margin:this.originalElement.css("margin")}), this._proportionallyResize()), this.handles = n.handles || (e(".ui-resizable-handle", this.element).length ? {n:".ui-resizable-n", e:".ui-resizable-e", s:".ui-resizable-s", w:".ui-resizable-w", se:".ui-resizable-se", sw:".ui-resizable-sw", ne:".ui-resizable-ne", nw:".ui-resizable-nw"} : "e,s,se");
        if (this.handles.constructor == String) {
            this.handles == "all" && (this.handles = "n,e,s,w,se,sw,ne,nw");
            var r = this.handles.split(",");
            this.handles = {};
            for (var i = 0; i < r.length; i++) {
                var s = e.trim(r[i]), o = "ui-resizable-" + s, u = e('<div class="ui-resizable-handle ' + o + '"></div>');
                u.css({zIndex:n.zIndex}), "se" == s && u.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[s] = ".ui-resizable-" + s, this.element.append(u)
            }
        }
        this._renderAxis = function (t) {
            t = t || this.element;
            for (var n in this.handles) {
                this.handles[n].constructor == String && (this.handles[n] = e(this.handles[n], this.element).show());
                if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                    var r = e(this.handles[n], this.element), i = 0;
                    i = /sw|ne|nw|se|n|s/.test(n) ? r.outerHeight() : r.outerWidth();
                    var s = ["padding", /ne|nw|n/.test(n) ? "Top" : /se|sw|s/.test(n) ? "Bottom" : /^e$/.test(n) ? "Right" : "Left"].join("");
                    t.css(s, i), this._proportionallyResize()
                }
                if (!e(this.handles[n]).length)continue
            }
        }, this._renderAxis(this.element), this._handles = e(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function () {
            if (!t.resizing) {
                if (this.className)var e = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
                t.axis = e && e[1] ? e[1] : "se"
            }
        }), n.autoHide && (this._handles.hide(), e(this.element).addClass("ui-resizable-autohide").hover(function () {
            if (n.disabled)return;
            e(this).removeClass("ui-resizable-autohide"), t._handles.show()
        }, function () {
            if (n.disabled)return;
            t.resizing || (e(this).addClass("ui-resizable-autohide"), t._handles.hide())
        })), this._mouseInit()
    }, destroy:function () {
        this._mouseDestroy();
        var t = function (t) {
            e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
        };
        if (this.elementIsWrapper) {
            t(this.element);
            var n = this.element;
            n.after(this.originalElement.css({position:n.css("position"), width:n.outerWidth(), height:n.outerHeight(), top:n.css("top"), left:n.css("left")})).remove()
        }
        return this.originalElement.css("resize", this.originalResizeStyle), t(this.originalElement), this
    }, _mouseCapture:function (t) {
        var n = !1;
        for (var r in this.handles)e(this.handles[r])[0] == t.target && (n = !0);
        return!this.options.disabled && n
    }, _mouseStart:function (t) {
        var r = this.options, i = this.element.position(), s = this.element;
        this.resizing = !0, this.documentScroll = {top:e(document).scrollTop(), left:e(document).scrollLeft()}, (s.is(".ui-draggable") || /absolute/.test(s.css("position"))) && s.css({position:"absolute", top:i.top, left:i.left}), this._renderProxy();
        var o = n(this.helper.css("left")), u = n(this.helper.css("top"));
        r.containment && (o += e(r.containment).scrollLeft() || 0, u += e(r.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {left:o, top:u}, this.size = this._helper ? {width:s.outerWidth(), height:s.outerHeight()} : {width:s.width(), height:s.height()}, this.originalSize = this._helper ? {width:s.outerWidth(), height:s.outerHeight()} : {width:s.width(), height:s.height()}, this.originalPosition = {left:o, top:u}, this.sizeDiff =
        {width:s.outerWidth() - s.width(), height:s.outerHeight() - s.height()}, this.originalMousePosition = {left:t.pageX, top:t.pageY}, this.aspectRatio = typeof r.aspectRatio == "number" ? r.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
        var a = e(".ui-resizable-" + this.axis).css("cursor");
        return e("body").css("cursor", a == "auto" ? this.axis + "-resize" : a), s.addClass("ui-resizable-resizing"), this._propagate("start", t), !0
    }, _mouseDrag:function (t) {
        var n = this.helper, r = this.options, i = {}, s = this, o = this.originalMousePosition, u = this.axis, a = t.pageX - o.left || 0, f = t.pageY - o.top || 0, l = this._change[u];
        if (!l)return!1;
        var c = l.apply(this, [t, a, f]), h = e.browser.msie && e.browser.version < 7, p = this.sizeDiff;
        this._updateVirtualBoundaries(t.shiftKey);
        if (this._aspectRatio || t.shiftKey)c = this._updateRatio(c, t);
        return c = this._respectSize(c, t), this._propagate("resize", t), n.css({top:this.position.top + "px", left:this.position.left + "px", width:this.size.width + "px", height:this.size.height + "px"}), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), this._updateCache(c), this._trigger("resize", t, this.ui()), !1
    }, _mouseStop:function (t) {
        this.resizing = !1;
        var n = this.options, r = this;
        if (this._helper) {
            var i = this._proportionallyResizeElements, s = i.length && /textarea/i.test(i[0].nodeName), o = s && e.ui.hasScroll(i[0], "left") ? 0 : r.sizeDiff.height, u = s ? 0 : r.sizeDiff.width, a = {width:r.helper.width() - u, height:r.helper.height() - o}, f = parseInt(r.element.css("left"), 10) + (r.position.left - r.originalPosition.left) || null, l = parseInt(r.element.css("top"), 10) + (r.position.top - r.originalPosition.top) || null;
            n.animate || this.element.css(e.extend(a, {top:l, left:f})), r.helper.height(r.size.height), r.helper.width(r.size.width), this._helper && !n.animate && this._proportionallyResize()
        }
        return e("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", t), this._helper && this.helper.remove(), !1
    }, _updateVirtualBoundaries:function (e) {
        var t = this.options, n, i, s, o, u;
        u = {minWidth:r(t.minWidth) ? t.minWidth : 0, maxWidth:r(t.maxWidth) ? t.maxWidth : Infinity, minHeight:r(t.minHeight) ? t.minHeight : 0, maxHeight:r(t.maxHeight) ? t.maxHeight : Infinity};
        if (this._aspectRatio || e)n = u.minHeight * this.aspectRatio, s = u.minWidth / this.aspectRatio, i = u.maxHeight * this.aspectRatio, o = u.maxWidth / this.aspectRatio, n > u.minWidth && (u.minWidth = n), s > u.minHeight && (u.minHeight = s), i < u.maxWidth && (u.maxWidth = i), o < u.maxHeight && (u.maxHeight = o);
        this._vBoundaries = u
    }, _updateCache:function (e) {
        var t = this.options;
        this.offset = this.helper.offset(), r(e.left) && (this.position.left = e.left), r(e.top) && (this.position.top = e.top), r(e.height) && (this.size.height = e.height), r(e.width) && (this.size.width = e.width)
    }, _updateRatio:function (e, t) {
        var n = this.options, i = this.position, s = this.size, o = this.axis;
        return r(e.height) ? e.width = e.height * this.aspectRatio : r(e.width) && (e.height = e.width / this.aspectRatio), o == "sw" && (e.left = i.left + (s.width - e.width), e.top = null), o == "nw" && (e.top = i.top + (s.height - e.height), e.left = i.left + (s.width - e.width)), e
    }, _respectSize:function (e, t) {
        var n = this.helper, i = this._vBoundaries, s = this._aspectRatio || t.shiftKey, o = this.axis, u = r(e.width) && i.maxWidth && i.maxWidth < e.width, a = r(e.height) && i.maxHeight && i.maxHeight < e.height, f = r(e.width) && i.minWidth && i.minWidth > e.width, l = r(e.height) && i.minHeight && i.minHeight > e.height;
        f && (e.width = i.minWidth), l && (e.height = i.minHeight), u && (e.width = i.maxWidth), a && (e.height = i.maxHeight);
        var c = this.originalPosition.left + this.originalSize.width, h = this.position.top + this.size.height, p = /sw|nw|w/.test(o), d = /nw|ne|n/.test(o);
        f && p && (e.left = c - i.minWidth), u && p && (e.left = c - i.maxWidth), l && d && (e.top = h - i.minHeight), a && d && (e.top = h - i.maxHeight);
        var v = !e.width && !e.height;
        return v && !e.left && e.top ? e.top = null : v && !e.top && e.left && (e.left = null), e
    }, _proportionallyResize:function () {
        var t = this.options;
        if (!this._proportionallyResizeElements.length)return;
        var n = this.helper || this.element;
        for (var r = 0; r < this._proportionallyResizeElements.length; r++) {
            var i = this._proportionallyResizeElements[r];
            if (!this.borderDif) {
                var s = [i.css("borderTopWidth"), i.css("borderRightWidth"), i.css("borderBottomWidth"), i.css("borderLeftWidth")], o = [i.css("paddingTop"), i.css("paddingRight"), i.css("paddingBottom"), i.css("paddingLeft")];
                this.borderDif = e.map(s, function (e, t) {
                    var n = parseInt(e, 10) || 0, r = parseInt(o[t], 10) || 0;
                    return n + r
                })
            }
            if (!(!e.browser.msie || !e(n).is(":hidden") && !e(n).parents(":hidden").length))continue;
            i.css({height:n.height() - this.borderDif[0] - this.borderDif[2] || 0, width:n.width() - this.borderDif[1] - this.borderDif[3] || 0})
        }
    }, _renderProxy:function () {
        var t = this.element, n = this.options;
        this.elementOffset = t.offset();
        if (this._helper) {
            this.helper = this.helper || e('<div style="overflow:hidden;"></div>');
            var r = e.browser.msie && e.browser.version < 7, i = r ? 1 : 0, s = r ? 2 : -1;
            this.helper.addClass(this._helper).css({width:this.element.outerWidth() + s, height:this.element.outerHeight() + s, position:"absolute", left:this.elementOffset.left - i + "px", top:this.elementOffset.top - i + "px", zIndex:++n.zIndex}), this.helper.appendTo("body").disableSelection()
        } else this.helper = this.element
    }, _change:{e:function (e, t, n) {
        return{width:this.originalSize.width + t}
    }, w:function (e, t, n) {
        var r = this.options, i = this.originalSize, s = this.originalPosition;
        return{left:s.left + t, width:i.width - t}
    }, n:function (e, t, n) {
        var r = this.options, i = this.originalSize, s = this.originalPosition;
        return{top:s.top + n, height:i.height - n}
    }, s:function (e, t, n) {
        return{height:this.originalSize.height + n}
    }, se:function (t, n, r) {
        return e.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [t, n, r]))
    }, sw:function (t, n, r) {
        return e.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [t, n, r]))
    }, ne:function (t, n, r) {
        return e.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [t, n, r]))
    }, nw:function (t, n, r) {
        return e.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [t, n, r]))
    }}, _propagate:function (t, n) {
        e.ui.plugin.call(this, t, [n, this.ui()]), t != "resize" && this._trigger(t, n, this.ui())
    }, plugins:{}, ui:function () {
        return{originalElement:this.originalElement, element:this.element, helper:this.helper, position:this.position, size:this.size, originalSize:this.originalSize, originalPosition:this.originalPosition}
    }}), e.extend(e.ui.resizable, {version:"1.8.24"}), e.ui.plugin.add("resizable", "alsoResize", {start:function (t, n) {
        var r = e(this).data("resizable"), i = r.options, s = function (t) {
            e(t).each(function () {
                var t = e(this);
                t.data("resizable-alsoresize", {width:parseInt(t.width(), 10), height:parseInt(t.height(), 10), left:parseInt(t.css("left"), 10), top:parseInt(t.css("top"), 10)})
            })
        };
        typeof i.alsoResize == "object" && !i.alsoResize.parentNode ? i.alsoResize.length ? (i.alsoResize = i.alsoResize[0], s(i.alsoResize)) : e.each(i.alsoResize, function (e) {
            s(e)
        }) : s(i.alsoResize)
    }, resize:function (t, n) {
        var r = e(this).data("resizable"), i = r.options, s = r.originalSize, o = r.originalPosition, u = {height:r.size.height - s.height || 0, width:r.size.width - s.width || 0, top:r.position.top - o.top || 0, left:r.position.left - o.left || 0}, a = function (t, r) {
            e(t).each(function () {
                var t = e(this), i = e(this).data("resizable-alsoresize"), s = {}, o = r && r.length ? r : t.parents(n.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                e.each(o, function (e, t) {
                    var n = (i[t] || 0) + (u[t] || 0);
                    n && n >= 0 && (s[t] = n || null)
                }), t.css(s)
            })
        };
        typeof i.alsoResize == "object" && !i.alsoResize.nodeType ? e.each(i.alsoResize, function (e, t) {
            a(e, t)
        }) : a(i.alsoResize)
    }, stop:function (t, n) {
        e(this).removeData("resizable-alsoresize")
    }}), e.ui.plugin.add("resizable", "animate", {stop:function (t, n) {
        var r = e(this).data("resizable"), i = r.options, s = r._proportionallyResizeElements, o = s.length && /textarea/i.test(s[0].nodeName), u = o && e.ui.hasScroll(s[0], "left") ? 0 : r.sizeDiff.height, a = o ? 0 : r.sizeDiff.width, f = {width:r.size.width - a, height:r.size.height - u}, l = parseInt(r.element.css("left"), 10) + (r.position.left - r.originalPosition.left) || null, c = parseInt(r.element.css("top"), 10) + (r.position.top - r.originalPosition.top) || null;
        r.element.animate(e.extend(f, c && l ? {top:c, left:l} : {}), {duration:i.animateDuration, easing:i.animateEasing, step:function () {
            var n = {width:parseInt(r.element.css("width"), 10), height:parseInt(r.element.css("height"), 10), top:parseInt(r.element.css("top"), 10), left:parseInt(r.element.css("left"), 10)};
            s && s.length && e(s[0]).css({width:n.width, height:n.height}), r._updateCache(n), r._propagate("resize", t)
        }})
    }}), e.ui.plugin.add("resizable", "containment", {start:function (t, r) {
        var i = e(this).data("resizable"), s = i.options, o = i.element, u = s.containment, a = u instanceof e ? u.get(0) : /parent/.test(u) ? o.parent().get(0) : u;
        if (!a)return;
        i.containerElement = e(a);
        if (/document/.test(u) || u == document)i.containerOffset = {left:0, top:0}, i.containerPosition = {left:0, top:0}, i.parentData = {element:e(document), left:0, top:0, width:e(document).width(), height:e(document).height() || document.body.parentNode.scrollHeight}; else {
            var f = e(a), l = [];
            e(["Top", "Right", "Left", "Bottom"]).each(function (e, t) {
                l[e] = n(f.css("padding" + t))
            }), i.containerOffset = f.offset(), i.containerPosition = f.position(), i.containerSize = {height:f.innerHeight() - l[3], width:f.innerWidth() - l[1]};
            var c = i.containerOffset, h = i.containerSize.height, p = i.containerSize.width, d = e.ui.hasScroll(a, "left") ? a.scrollWidth : p, v = e.ui.hasScroll(a) ? a.scrollHeight : h;
            i.parentData = {element:a, left:c.left, top:c.top, width:d, height:v}
        }
    }, resize:function (t, n) {
        var r = e(this).data("resizable"), i = r.options, s = r.containerSize, o = r.containerOffset, u = r.size, a = r.position, f = r._aspectRatio || t.shiftKey, l = {top:0, left:0}, c = r.containerElement;
        c[0] != document && /static/.test(c.css("position")) && (l = o), a.left < (r._helper ? o.left : 0) && (r.size.width = r.size.width + (r._helper ? r.position.left - o.left : r.position.left - l.left), f && (r.size.height = r.size.width / r.aspectRatio), r.position.left = i.helper ? o.left : 0), a.top < (r._helper ? o.top : 0) && (r.size.height = r.size.height + (r._helper ? r.position.top - o.top : r.position.top), f && (r.size.width = r.size.height * r.aspectRatio), r.position.top = r._helper ? o.top : 0), r.offset.left = r.parentData.left + r.position.left, r.offset.top = r.parentData.top + r.position.top;
        var h = Math.abs((r._helper ? r.offset.left - l.left : r.offset.left - l.left) + r.sizeDiff.width), p = Math.abs((r._helper ? r.offset.top - l.top : r.offset.top - o.top) + r.sizeDiff.height), d = r.containerElement.get(0) == r.element.parent().get(0), v = /relative|absolute/.test(r.containerElement.css("position"));
        d && v && (h -= r.parentData.left), h + r.size.width >= r.parentData.width && (r.size.width = r.parentData.width - h, f && (r.size.height = r.size.width / r.aspectRatio)), p + r.size.height >= r.parentData.height && (r.size.height = r.parentData.height - p, f && (r.size.width = r.size.height * r.aspectRatio))
    }, stop:function (t, n) {
        var r = e(this).data("resizable"), i = r.options, s = r.position, o = r.containerOffset, u = r.containerPosition, a = r.containerElement, f = e(r.helper), l = f.offset(), c = f.outerWidth() - r.sizeDiff.width, h = f.outerHeight() - r.sizeDiff.height;
        r._helper && !i.animate && /relative/.test(a.css("position")) && e(this).css({left:l.left - u.left - o.left, width:c, height:h}), r._helper && !i.animate && /static/.test(a.css("position")) && e(this).css({left:l.left - u.left - o.left, width:c, height:h})
    }}), e.ui.plugin.add("resizable", "ghost", {start:function (t, n) {
        var r = e(this).data("resizable"), i = r.options, s = r.size;
        r.ghost = r.originalElement.clone(), r.ghost.css({opacity:.25, display:"block", position:"relative", height:s.height, width:s.width, margin:0, left:0, top:0}).addClass("ui-resizable-ghost").addClass(typeof i.ghost == "string" ? i.ghost : ""), r.ghost.appendTo(r.helper)
    }, resize:function (t, n) {
        var r = e(this).data("resizable"), i = r.options;
        r.ghost && r.ghost.css({position:"relative", height:r.size.height, width:r.size.width})
    }, stop:function (t, n) {
        var r = e(this).data("resizable"), i = r.options;
        r.ghost && r.helper && r.helper.get(0).removeChild(r.ghost.get(0))
    }}), e.ui.plugin.add("resizable", "grid", {resize:function (t, n) {
        var r = e(this).data("resizable"), i = r.options, s = r.size, o = r.originalSize, u = r.originalPosition, a = r.axis, f = i._aspectRatio || t.shiftKey;
        i.grid = typeof i.grid == "number" ? [i.grid, i.grid] : i.grid;
        var l = Math.round((s.width - o.width) / (i.grid[0] || 1)) * (i.grid[0] || 1), c = Math.round((s.height - o.height) / (i.grid[1] || 1)) * (i.grid[1] || 1);
        /^(se|s|e)$/.test(a) ? (r.size.width = o.width + l, r.size.height = o.height + c) : /^(ne)$/.test(a) ? (r.size.width = o.width + l, r.size.height = o.height + c, r.position.top = u.top - c) : /^(sw)$/.test(a) ? (r.size.width = o.width + l, r.size.height = o.height + c, r.position.left = u.left - l) : (r.size.width = o.width + l, r.size.height = o.height + c, r.position.top = u.top - c, r.position.left = u.left - l)
    }});
    var n = function (e) {
        return parseInt(e, 10) || 0
    }, r = function (e) {
        return!isNaN(parseInt(e, 10))
    }
}(jQuery), function (e, t) {
    var n = "ui-dialog ui-widget ui-widget-content ui-corner-all ", r = {buttons:!0, height:!0, maxHeight:!0, maxWidth:!0, minHeight:!0, minWidth:!0, width:!0}, i = {maxHeight:!0, maxWidth:!0, minHeight:!0, minWidth:!0};
    e.widget("ui.dialog", {options:{autoOpen:!0, buttons:{}, closeOnEscape:!0, closeText:"close", dialogClass:"", draggable:!0, hide:null, height:"auto", maxHeight:!1, maxWidth:!1, minHeight:150, minWidth:150, modal:!1, position:{my:"center", at:"center", collision:"fit", using:function (t) {
        var n = e(this).css(t).offset().top;
        n < 0 && e(this).css("top", t.top - n)
    }}, resizable:!0, show:null, stack:!0, title:"", width:300, zIndex:1e3}, _create:function () {
        this.originalTitle = this.element.attr("title"), typeof this.originalTitle != "string" && (this.originalTitle = ""), this.options.title = this.options.title || this.originalTitle;
        var t = this, r = t.options, i = r.title || "&#160;", s = e.ui.dialog.getTitleId(t.element), o = (t.uiDialog = e("<div></div>")).appendTo(document.body).hide().addClass(n + r.dialogClass).css({zIndex:r.zIndex}).attr("tabIndex", -1).css("outline", 0).keydown(function (n) {
            r.closeOnEscape && !n.isDefaultPrevented() && n.keyCode && n.keyCode === e.ui.keyCode.ESCAPE && (t.close(n), n.preventDefault())
        }).attr({role:"dialog", "aria-labelledby":s}).mousedown(function (e) {
            t.moveToTop(!1, e)
        }), u = t.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(o), a = (t.uiDialogTitlebar = e("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(o), f = e('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(function () {
            f.addClass("ui-state-hover")
        },function () {
            f.removeClass("ui-state-hover")
        }).focus(function () {
            f.addClass("ui-state-focus")
        }).blur(function () {
            f.removeClass("ui-state-focus")
        }).click(function (e) {
            return t.close(e), !1
        }).appendTo(a), l = (t.uiDialogTitlebarCloseText = e("<span></span>")).addClass("ui-icon ui-icon-closethick").text(r.closeText).appendTo(f), c = e("<span></span>").addClass("ui-dialog-title").attr("id", s).html(i).prependTo(a);
        e.isFunction(r.beforeclose) && !e.isFunction(r.beforeClose) && (r.beforeClose = r.beforeclose), a.find("*").add(a).disableSelection(), r.draggable && e.fn.draggable && t._makeDraggable(), r.resizable && e.fn.resizable && t._makeResizable(), t._createButtons(r.buttons), t._isOpen = !1, e.fn.bgiframe && o.bgiframe()
    }, _init:function () {
        this.options.autoOpen && this.open()
    }, destroy:function () {
        var e = this;
        return e.overlay && e.overlay.destroy(), e.uiDialog.hide(), e.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"), e.uiDialog.remove(), e.originalTitle && e.element.attr("title", e.originalTitle), e
    }, widget:function () {
        return this.uiDialog
    }, close:function (t) {
        var n = this, r, i;
        if (!1 === n._trigger("beforeClose", t))return;
        return n.overlay && n.overlay.destroy(), n.uiDialog.unbind("keypress.ui-dialog"), n._isOpen = !1, n.options.hide ? n.uiDialog.hide(n.options.hide, function () {
            n._trigger("close", t)
        }) : (n.uiDialog.hide(), n._trigger("close", t)), e.ui.dialog.overlay.resize(), n.options.modal && (r = 0, e(".ui-dialog").each(function () {
            this !== n.uiDialog[0] && (i = e(this).css("z-index"), isNaN(i) || (r = Math.max(r, i)))
        }), e.ui.dialog.maxZ = r), n
    }, isOpen:function () {
        return this._isOpen
    }, moveToTop:function (t, n) {
        var r = this, i = r.options, s;
        return i.modal && !t || !i.stack && !i.modal ? r._trigger("focus", n) : (i.zIndex > e.ui.dialog.maxZ && (e.ui.dialog.maxZ = i.zIndex), r.overlay && (e.ui.dialog.maxZ += 1, r.overlay.$el.css("z-index", e.ui.dialog.overlay.maxZ = e.ui.dialog.maxZ)), s = {scrollTop:r.element.scrollTop(), scrollLeft:r.element.scrollLeft()}, e.ui.dialog.maxZ += 1, r.uiDialog.css("z-index", e.ui.dialog.maxZ), r.element.attr(s), r._trigger("focus", n), r)
    }, open:function () {
        if (this._isOpen)return;
        var t = this, n = t.options, r = t.uiDialog;
        return t.overlay = n.modal ? new e.ui.dialog.overlay(t) : null, t._size(), t._position(n.position), r.show(n.show), t.moveToTop(!0), n.modal && r.bind("keydown.ui-dialog", function (t) {
            if (t.keyCode !== e.ui.keyCode.TAB)return;
            var n = e(":tabbable", this), r = n.filter(":first"), i = n.filter(":last");
            if (t.target === i[0] && !t.shiftKey)return r.focus(1), !1;
            if (t.target === r[0] && t.shiftKey)return i.focus(1), !1
        }), e(t.element.find(":tabbable").get().concat(r.find(".ui-dialog-buttonpane :tabbable").get().concat(r.get()))).eq(0).focus(), t._isOpen = !0, t._trigger("open"), t
    }, _createButtons:function (t) {
        var n = this, r = !1, i = e("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), s = e("<div></div>").addClass("ui-dialog-buttonset").appendTo(i);
        n.uiDialog.find(".ui-dialog-buttonpane").remove(), typeof t == "object" && t !== null && e.each(t, function () {
            return!(r = !0)
        }), r && (e.each(t, function (t, r) {
            r = e.isFunction(r) ? {click:r, text:t} : r;
            var i = e('<button type="button"></button>').click(function () {
                r.click.apply(n.element[0], arguments)
            }).appendTo(s);
            e.each(r, function (e, t) {
                if (e === "click")return;
                e in i ? i[e](t) : i.attr(e, t)
            }), e.fn.button && i.button()
        }), i.appendTo(n.uiDialog))
    }, _makeDraggable:function () {
        function s(e) {
            return{position:e.position, offset:e.offset}
        }

        var t = this, n = t.options, r = e(document), i;
        t.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close", handle:".ui-dialog-titlebar", containment:"document", start:function (r, o) {
            i = n.height === "auto" ? "auto" : e(this).height(), e(this).height(e(this).height()).addClass("ui-dialog-dragging"), t._trigger("dragStart", r, s(o))
        }, drag:function (e, n) {
            t._trigger("drag", e, s(n))
        }, stop:function (o, u) {
            n.position = [u.position.left - r.scrollLeft(), u.position.top - r.scrollTop()], e(this).removeClass("ui-dialog-dragging").height(i), t._trigger("dragStop", o, s(u)), e.ui.dialog.overlay.resize()
        }})
    }, _makeResizable:function (n) {
        function u(e) {
            return{originalPosition:e.originalPosition, originalSize:e.originalSize, position:e.position, size:e.size}
        }

        n = n === t ? this.options.resizable : n;
        var r = this, i = r.options, s = r.uiDialog.css("position"), o = typeof n == "string" ? n : "n,e,s,w,se,sw,ne,nw";
        r.uiDialog.resizable({cancel:".ui-dialog-content", containment:"document", alsoResize:r.element, maxWidth:i.maxWidth, maxHeight:i.maxHeight, minWidth:i.minWidth, minHeight:r._minHeight(), handles:o, start:function (t, n) {
            e(this).addClass("ui-dialog-resizing"), r._trigger("resizeStart", t, u(n))
        }, resize:function (e, t) {
            r._trigger("resize", e, u(t))
        }, stop:function (t, n) {
            e(this).removeClass("ui-dialog-resizing"), i.height = e(this).height(), i.width = e(this).width(), r._trigger("resizeStop", t, u(n)), e.ui.dialog.overlay.resize()
        }}).css("position", s).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
    }, _minHeight:function () {
        var e = this.options;
        return e.height === "auto" ? e.minHeight : Math.min(e.minHeight, e.height)
    }, _position:function (t) {
        var n = [], r = [0, 0], i;
        if (t) {
            if (typeof t == "string" || typeof t == "object" && "0"in t)n = t.split ? t.split(" ") : [t[0], t[1]], n.length === 1 && (n[1] = n[0]), e.each(["left", "top"], function (e, t) {
                +n[e] === n[e] && (r[e] = n[e], n[e] = t)
            }), t = {my:n.join(" "), at:n.join(" "), offset:r.join(" ")};
            t = e.extend({}, e.ui.dialog.prototype.options.position, t)
        } else t = e.ui.dialog.prototype.options.position;
        i = this.uiDialog.is(":visible"), i || this.uiDialog.show(), this.uiDialog.css({top:0, left:0}).position(e.extend({of:window}, t)), i || this.uiDialog.hide()
    }, _setOptions:function (t) {
        var n = this, s = {}, o = !1;
        e.each(t, function (e, t) {
            n._setOption(e, t), e in r && (o = !0), e in i && (s[e] = t)
        }), o && this._size(), this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", s)
    }, _setOption:function (t, r) {
        var i = this, s = i.uiDialog;
        switch (t) {
            case"beforeclose":
                t = "beforeClose";
                break;
            case"buttons":
                i._createButtons(r);
                break;
            case"closeText":
                i.uiDialogTitlebarCloseText.text("" + r);
                break;
            case"dialogClass":
                s.removeClass(i.options.dialogClass).addClass(n + r);
                break;
            case"disabled":
                r ? s.addClass("ui-dialog-disabled") : s.removeClass("ui-dialog-disabled");
                break;
            case"draggable":
                var o = s.is(":data(draggable)");
                o && !r && s.draggable("destroy"), !o && r && i._makeDraggable();
                break;
            case"position":
                i._position(r);
                break;
            case"resizable":
                var u = s.is(":data(resizable)");
                u && !r && s.resizable("destroy"), u && typeof r == "string" && s.resizable("option", "handles", r), !u && r !== !1 && i._makeResizable(r);
                break;
            case"title":
                e(".ui-dialog-title", i.uiDialogTitlebar).html("" + (r || "&#160;"))
        }
        e.Widget.prototype._setOption.apply(i, arguments)
    }, _size:function () {
        var t = this.options, n, r, i = this.uiDialog.is(":visible");
        this.element.show().css({width:"auto", minHeight:0, height:0}), t.minWidth > t.width && (t.width = t.minWidth), n = this.uiDialog.css({height:"auto", width:t.width}).height(), r = Math.max(0, t.minHeight - n);
        if (t.height === "auto")if (e.support.minHeight)this.element.css({minHeight:r, height:"auto"}); else {
            this.uiDialog.show();
            var s = this.element.css("height", "auto").height();
            i || this.uiDialog.hide(), this.element.height(Math.max(s, r))
        } else this.element.height(Math.max(t.height - n, 0));
        this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
    }}), e.extend(e.ui.dialog, {version:"1.8.24", uuid:0, maxZ:0, getTitleId:function (e) {
        var t = e.attr("id");
        return t || (this.uuid += 1, t = this.uuid), "ui-dialog-title-" + t
    }, overlay:function (t) {
        this.$el = e.ui.dialog.overlay.create(t)
    }}), e.extend(e.ui.dialog.overlay, {instances:[], oldInstances:[], maxZ:0, events:e.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function (e) {
        return e + ".dialog-overlay"
    }).join(" "), create:function (t) {
        this.instances.length === 0 && (setTimeout(function () {
            e.ui.dialog.overlay.instances.length && e(document).bind(e.ui.dialog.overlay.events, function (t) {
                if (e(t.target).zIndex() < e.ui.dialog.overlay.maxZ)return!1
            })
        }, 1), e(document).bind("keydown.dialog-overlay", function (n) {
            t.options.closeOnEscape && !n.isDefaultPrevented() && n.keyCode && n.keyCode === e.ui.keyCode.ESCAPE && (t.close(n), n.preventDefault())
        }), e(window).bind("resize.dialog-overlay", e.ui.dialog.overlay.resize));
        var n = (this.oldInstances.pop() || e("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({width:this.width(), height:this.height()});
        return e.fn.bgiframe && n.bgiframe(), this.instances.push(n), n
    }, destroy:function (t) {
        var n = e.inArray(t, this.instances);
        n != -1 && this.oldInstances.push(this.instances.splice(n, 1)[0]), this.instances.length === 0 && e([document, window]).unbind(".dialog-overlay"), t.remove();
        var r = 0;
        e.each(this.instances, function () {
            r = Math.max(r, this.css("z-index"))
        }), this.maxZ = r
    }, height:function () {
        var t, n;
        return e.browser.msie && e.browser.version < 7 ? (t = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight), n = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight), t < n ? e(window).height() + "px" : t + "px") : e(document).height() + "px"
    }, width:function () {
        var t, n;
        return e.browser.msie ? (t = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth), n = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth), t < n ? e(window).width() + "px" : t + "px") : e(document).width() + "px"
    }, resize:function () {
        var t = e([]);
        e.each(e.ui.dialog.overlay.instances, function () {
            t = t.add(this)
        }), t.css({width:0, height:0}).css({width:e.ui.dialog.overlay.width(), height:e.ui.dialog.overlay.height()})
    }}), e.extend(e.ui.dialog.overlay.prototype, {destroy:function () {
        e.ui.dialog.overlay.destroy(this.$el)
    }})
}(jQuery);