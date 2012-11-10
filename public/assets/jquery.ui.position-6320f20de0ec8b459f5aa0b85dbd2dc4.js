/*!
 * jQuery UI Position 1.8.24
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Position
 */
(function (e, t) {
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
})(jQuery);