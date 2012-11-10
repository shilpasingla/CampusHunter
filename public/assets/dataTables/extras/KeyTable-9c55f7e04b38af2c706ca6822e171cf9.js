/*
 * File:        KeyTable.js
 * Version:     1.1.7
 * CVS:         $Idj$
 * Description: Keyboard navigation for HTML tables
 * Author:      Allan Jardine (www.sprymedia.co.uk)
 * Created:     Fri Mar 13 21:24:02 GMT 2009
 * Modified:    $Date$ by $Author$
 * Language:    Javascript
 * License:     GPL v2 or BSD 3 point style
 * Project:     Just a little bit of fun :-)
 * Contact:     www.sprymedia.co.uk/contact
 *
 * Copyright 2009-2011 Allan Jardine, all rights reserved.
 *
 * This source file is free software, under either the GPL v2 license or a
 * BSD style license, available at:
 *   http://datatables.net/license_gpl2
 *   http://datatables.net/license_bsd
 */
function KeyTable(e) {
    function p(e) {
        return function (t, n, r) {
            if (t !== null && typeof t != "number" || n !== null && typeof n != "number" || typeof r != "function")if (typeof t == "object" && typeof n == "function") {
                var i = k(t);
                m(e, i[0], i[1], n)
            } else alert("Unhandable event type was added: x" + t + "  y:" + n + "  z:" + r); else m(e, t, n, r)
        }
    }

    function d(e) {
        return function (t, n, r) {
            if (t !== null && typeof arguments[0] != "number" || n !== null && typeof arguments[1] != "number")if (typeof arguments[0] == "object") {
                var i = k(t);
                typeof arguments[1] == "function" ? g(e, i[0], i[1], n) : g(e, i[0], i[1])
            } else alert("Unhandable event type was removed: x" + t + "  y:" + n + "  z:" + r); else typeof arguments[2] == "function" ? g(e, t, n, r) : g(e, t, n)
        }
    }

    function m(e, t, n, r) {
        a[e].push({x:t, y:n, fn:r})
    }

    function g(e, t, n, r) {
        var i = 0;
        for (var s = 0, o = a[e].length; s < o - i; s++)if (typeof r != "undefined")a[e][s - i].x == t && a[e][s - i].y == n && a[e][s - i].fn == r && (a[e].splice(s - i, 1), i++); else if (a[e][s - i].x == t && a[e][s - i].y == n)return a[e].splice(s, 1), 1;
        return i
    }

    function y(e, t, n) {
        var r = 0, i = a[e];
        for (var s = 0; s < i.length; s++)if (i[s].x == t && i[s].y == n || i[s].x === null && i[s].y == n || i[s].x == t && i[s].y === null || i[s].x === null && i[s].y === null)i[s].fn(C(t, n), t, n), r++;
        return r
    }

    function b(e, t) {
        if (n == e)return;
        typeof t == "undefined" && (t = !0), n !== null && E(n), jQuery(e).addClass(o), jQuery(e).parent().addClass(o);
        var s;
        if (f) {
            s = f.fnSettings();
            var a = M(e)[1], l = u;
            while (a >= s.fnDisplayEnd())s._iDisplayLength >= 0 ? s._iDisplayStart + s._iDisplayLength < s.fnRecordsDisplay() && (s._iDisplayStart += s._iDisplayLength) : s._iDisplayStart = 0, f.oApi._fnCalculateEnd(s);
            while (a < s._iDisplayStart)s._iDisplayStart = s._iDisplayLength >= 0 ? s._iDisplayStart - s._iDisplayLength : 0, s._iDisplayStart < 0 && (s._iDisplayStart = 0), f.oApi._fnCalculateEnd(s);
            f.oApi._fnDraw(s), u = l
        }
        var c = k(e);
        n = e, r = c[0], i = c[1];
        var h, p, d, v, m, g, b;
        t && (h = document.documentElement.clientHeight, p = document.documentElement.clientWidth, d = document.body.scrollTop || document.documentElement.scrollTop, v = document.body.scrollLeft || document.documentElement.scrollLeft, m = e.offsetHeight, g = e.offsetWidth, b = O(e), f && typeof s.oScroll != "undefined" && (s.oScroll.sX !== "" || s.oScroll.sY !== "") && (b[1] -= $(s.nTable.parentNode).scrollTop(), b[0] -= $(s.nTable.parentNode).scrollLeft()), b[1] + m > d + h ? L(b[1] + m - h) : b[1] < d && L(b[1]), b[0] + g > v + p ? A(b[0] + g - p) : b[0] < v && A(b[0]));
        if (f && typeof s.oScroll != "undefined" && (s.oScroll.sX !== "" || s.oScroll.sY !== "")) {
            var w = s.nTable.parentNode;
            h = w.clientHeight, p = w.clientWidth, d = w.scrollTop, v = w.scrollLeft, m = e.offsetHeight, g = e.offsetWidth, e.offsetTop + m > h + d ? w.scrollTop = e.offsetTop + m - h : e.offsetTop < d && (w.scrollTop = e.offsetTop), e.offsetLeft + g > p + v ? w.scrollLeft = e.offsetLeft + g - p : e.offsetLeft < v && (w.scrollLeft = e.offsetLeft)
        }
        T(), y("focus", r, i)
    }

    function w() {
        E(n), r = null, i = null, n = null, N()
    }

    function E(e) {
        jQuery(e).removeClass(o), jQuery(e).parent().removeClass(o), y("blur", r, i)
    }

    function S(e) {
        var t = this;
        while (t.nodeName != "TD")t = t.parentNode;
        b(t), T()
    }

    function x(e) {
        if (s.block || !u)return!0;
        if (e.metaKey || e.altKey || e.ctrlKey)return!0;
        var o, a, p = t.getElementsByTagName("tr")[0].getElementsByTagName("td").length, d;
        if (f) {
            var v = f.fnSettings();
            d = v.aiDisplay.length;
            var m = M(n);
            if (m === null)return;
            r = m[0], i = m[1]
        } else d = t.getElementsByTagName("tr").length;
        var g = e.keyCode == 9 && e.shiftKey ? -1 : e.keyCode;
        switch (g) {
            case 13:
                return e.preventDefault(), e.stopPropagation(), y("action", r, i), !0;
            case 27:
                if (!y("esc", r, i)) {
                    w();
                    return
                }
                o = r, a = i;
                break;
            case-1:
            case 37:
                if (r > 0)o = r - 1, a = i; else {
                    if (!(i > 0))return g == -1 && l ? (h = !0, c.focus(), setTimeout(function () {
                        h = !1
                    }, 0), u = !1, w(), !0) : !1;
                    o = p - 1, a = i - 1
                }
                break;
            case 38:
                if (!(i > 0))return!1;
                o = r, a = i - 1;
                break;
            case 9:
            case 39:
                if (r < p - 1)o = r + 1, a = i; else {
                    if (!(i < d - 1))return g == 9 && l ? (h = !0, c.focus(), setTimeout(function () {
                        h = !1
                    }, 0), u = !1, w(), !0) : !1;
                    o = 0, a = i + 1
                }
                break;
            case 40:
                if (!(i < d - 1))return!1;
                o = r, a = i + 1;
                break;
            default:
                return!0
        }
        return b(C(o, a)), !1
    }

    function T() {
        u || (u = !0)
    }

    function N() {
        u = !1
    }

    function C(e, n) {
        if (f) {
            var r = f.fnSettings();
            return typeof r.aoData[r.aiDisplay[n]] != "undefined" ? r.aoData[r.aiDisplay[n]].nTr.getElementsByTagName("td")[e] : null
        }
        return jQuery("tr:eq(" + n + ")>td:eq(" + e + ")", t)[0]
    }

    function k(e) {
        if (f) {
            var t = f.fnSettings();
            return[jQuery("td", e.parentNode).index(e), jQuery("tr", e.parentNode.parentNode).index(e.parentNode) + t._iDisplayStart]
        }
        return[jQuery("td", e.parentNode).index(e), jQuery("tr", e.parentNode.parentNode).index(e.parentNode)]
    }

    function L(e) {
        document.documentElement.scrollTop = e, document.body.scrollTop = e
    }

    function A(e) {
        document.documentElement.scrollLeft = e, document.body.scrollLeft = e
    }

    function O(e) {
        var t = 0, n = 0;
        if (e.offsetParent) {
            t = e.offsetLeft, n = e.offsetTop, e = e.offsetParent;
            while (e)t += e.offsetLeft, n += e.offsetTop, e = e.offsetParent
        }
        return[t, n]
    }

    function M(e) {
        var t = f.fnSettings();
        for (var n = 0, r = t.aiDisplay.length; n < r; n++) {
            var i = t.aoData[t.aiDisplay[n]].nTr, s = i.getElementsByTagName("td");
            for (var o = 0, u = s.length; o < u; o++)if (s[o] == e)return[o, n]
        }
        return null
    }

    function _(e, n) {
        s = n, typeof e == "undefined" && (e = {}), typeof e.focus == "undefined" && (e.focus = [0, 0]), typeof e.table == "undefined" ? e.table = jQuery("table.KeyTable")[0] : $(e.table).addClass("KeyTable"), typeof e.focusClass != "undefined" && (o = e.focusClass), typeof e.datatable != "undefined" && (f = e.datatable), typeof e.initScroll == "undefined" && (e.initScroll = !0), typeof e.form == "undefined" && (e.form = !1), l = e.form, t = e.table.getElementsByTagName("tbody")[0];
        if (l) {
            var r = document.createElement("div");
            c = document.createElement("input"), r.style.height = "1px", r.style.width = "0px", r.style.overflow = "hidden", typeof e.tabIndex != "undefined" && (c.tabIndex = e.tabIndex), r.appendChild(c), e.table.parentNode.insertBefore(r, e.table.nextSibling), jQuery(c).focus(function () {
                h || (u = !0, h = !1, typeof e.focus.nodeName != "undefined" ? b(e.focus, e.initScroll) : b(C(e.focus[0], e.focus[1]), e.initScroll), setTimeout(function () {
                    c.blur()
                }, 0))
            }), u = !1
        } else typeof e.focus.nodeName != "undefined" ? b(e.focus, e.initScroll) : b(C(e.focus[0], e.focus[1]), e.initScroll), T();
        jQuery.browser.mozilla || jQuery.browser.opera ? jQuery(document).bind("keypress", x) : jQuery(document).bind("keydown", x), f ? jQuery("tbody td", f.fnSettings().nTable).live("click", S) : jQuery("td", t).live("click", S), jQuery(document).click(function (t) {
            var n = t.target, r = !1;
            while (n) {
                if (n == e.table) {
                    r = !0;
                    break
                }
                n = n.parentNode
            }
            r || w()
        })
    }

    this.block = !1, this.event = {remove:{}}, this.fnGetCurrentPosition = function () {
        return[r, i]
    }, this.fnGetCurrentData = function () {
        return n.innerHTML
    }, this.fnGetCurrentTD = function () {
        return n
    }, this.fnSetPosition = function (e, t) {
        typeof e == "object" && e.nodeName ? b(e) : b(C(e, t))
    };
    var t = null, n = null, r = null, i = null, s = null, o = "focus", u = !1, a = {action:[], esc:[], focus:[], blur:[]}, f = null, l, c, h = !1;
    for (var v in a)v && (this.event[v] = p(v), this.event.remove[v] = d(v));
    _(e, this)
}
;