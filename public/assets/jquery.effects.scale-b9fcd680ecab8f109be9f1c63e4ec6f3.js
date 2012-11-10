/*!
 * jQuery UI Effects 1.8.24
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/
 */
jQuery.effects || function (e, t) {
    function n(t) {
        var n;
        return t && t.constructor == Array && t.length == 3 ? t : (n = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(t)) ? [parseInt(n[1], 10), parseInt(n[2], 10), parseInt(n[3], 10)] : (n = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(t)) ? [parseFloat(n[1]) * 2.55, parseFloat(n[2]) * 2.55, parseFloat(n[3]) * 2.55] : (n = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(t)) ? [parseInt(n[1], 16), parseInt(n[2], 16), parseInt(n[3], 16)] : (n = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(t)) ? [parseInt(n[1] + n[1], 16), parseInt(n[2] + n[2], 16), parseInt(n[3] + n[3], 16)] : (n = /rgba\(0, 0, 0, 0\)/.exec(t)) ? i.transparent : i[e.trim(t).toLowerCase()]
    }

    function r(t, r) {
        var i;
        do {
            i = (e.curCSS || e.css)(t, r);
            if (i != "" && i != "transparent" || e.nodeName(t, "body"))break;
            r = "backgroundColor"
        } while (t = t.parentNode);
        return n(i)
    }

    function u() {
        var e = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle, t = {}, n, r;
        if (e && e.length && e[0] && e[e[0]]) {
            var i = e.length;
            while (i--)n = e[i], typeof e[n] == "string" && (r = n.replace(/\-(\w)/g, function (e, t) {
                return t.toUpperCase()
            }), t[r] = e[n])
        } else for (n in e)typeof e[n] == "string" && (t[n] = e[n]);
        return t
    }

    function a(t) {
        var n, r;
        for (n in t)r = t[n], (r == null || e.isFunction(r) || n in o || /scrollbar/.test(n) || !/color/i.test(n) && isNaN(parseFloat(r))) && delete t[n];
        return t
    }

    function f(e, t) {
        var n = {_:0}, r;
        for (r in t)e[r] != t[r] && (n[r] = t[r]);
        return n
    }

    function l(t, n, r, i) {
        typeof t == "object" && (i = n, r = null, n = t, t = n.effect), e.isFunction(n) && (i = n, r = null, n = {});
        if (typeof n == "number" || e.fx.speeds[n])i = r, r = n, n = {};
        return e.isFunction(r) && (i = r, r = null), n = n || {}, r = r || n.duration, r = e.fx.off ? 0 : typeof r == "number" ? r : r in e.fx.speeds ? e.fx.speeds[r] : e.fx.speeds._default, i = i || n.complete, [t, n, r, i]
    }

    function c(t) {
        return!t || typeof t == "number" || e.fx.speeds[t] ? !0 : typeof t == "string" && !e.effects[t] ? !0 : !1
    }

    e.effects = {}, e.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderColor", "color", "outlineColor"], function (t, i) {
        e.fx.step[i] = function (e) {
            e.colorInit || (e.start = r(e.elem, i), e.end = n(e.end), e.colorInit = !0), e.elem.style[i] = "rgb(" + Math.max(Math.min(parseInt(e.pos * (e.end[0] - e.start[0]) + e.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt(e.pos * (e.end[1] - e.start[1]) + e.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt(e.pos * (e.end[2] - e.start[2]) + e.start[2], 10), 255), 0) + ")"
        }
    });
    var i = {aqua:[0, 255, 255], azure:[240, 255, 255], beige:[245, 245, 220], black:[0, 0, 0], blue:[0, 0, 255], brown:[165, 42, 42], cyan:[0, 255, 255], darkblue:[0, 0, 139], darkcyan:[0, 139, 139], darkgrey:[169, 169, 169], darkgreen:[0, 100, 0], darkkhaki:[189, 183, 107], darkmagenta:[139, 0, 139], darkolivegreen:[85, 107, 47], darkorange:[255, 140, 0], darkorchid:[153, 50, 204], darkred:[139, 0, 0], darksalmon:[233, 150, 122], darkviolet:[148, 0, 211], fuchsia:[255, 0, 255], gold:[255, 215, 0], green:[0, 128, 0], indigo:[75, 0, 130], khaki:[240, 230, 140], lightblue:[173, 216, 230], lightcyan:[224, 255, 255], lightgreen:[144, 238, 144], lightgrey:[211, 211, 211], lightpink:[255, 182, 193], lightyellow:[255, 255, 224], lime:[0, 255, 0], magenta:[255, 0, 255], maroon:[128, 0, 0], navy:[0, 0, 128], olive:[128, 128, 0], orange:[255, 165, 0], pink:[255, 192, 203], purple:[128, 0, 128], violet:[128, 0, 128], red:[255, 0, 0], silver:[192, 192, 192], white:[255, 255, 255], yellow:[255, 255, 0], transparent:[255, 255, 255]}, s = ["add", "remove", "toggle"], o = {border:1, borderBottom:1, borderColor:1, borderLeft:1, borderRight:1, borderTop:1, borderWidth:1, margin:1, padding:1};
    e.effects.animateClass = function (t, n, r, i) {
        return e.isFunction(r) && (i = r, r = null), this.queue(function () {
            var o = e(this), l = o.attr("style") || " ", c = a(u.call(this)), h, p = o.attr("class") || "";
            e.each(s, function (e, n) {
                t[n] && o[n + "Class"](t[n])
            }), h = a(u.call(this)), o.attr("class", p), o.animate(f(c, h), {queue:!1, duration:n, easing:r, complete:function () {
                e.each(s, function (e, n) {
                    t[n] && o[n + "Class"](t[n])
                }), typeof o.attr("style") == "object" ? (o.attr("style").cssText = "", o.attr("style").cssText = l) : o.attr("style", l), i && i.apply(this, arguments), e.dequeue(this)
            }})
        })
    }, e.fn.extend({_addClass:e.fn.addClass, addClass:function (t, n, r, i) {
        return n ? e.effects.animateClass.apply(this, [
            {add:t},
            n,
            r,
            i
        ]) : this._addClass(t)
    }, _removeClass:e.fn.removeClass, removeClass:function (t, n, r, i) {
        return n ? e.effects.animateClass.apply(this, [
            {remove:t},
            n,
            r,
            i
        ]) : this._removeClass(t)
    }, _toggleClass:e.fn.toggleClass, toggleClass:function (n, r, i, s, o) {
        return typeof r == "boolean" || r === t ? i ? e.effects.animateClass.apply(this, [r ? {add:n} : {remove:n}, i, s, o]) : this._toggleClass(n, r) : e.effects.animateClass.apply(this, [
            {toggle:n},
            r,
            i,
            s
        ])
    }, switchClass:function (t, n, r, i, s) {
        return e.effects.animateClass.apply(this, [
            {add:n, remove:t},
            r,
            i,
            s
        ])
    }}), e.extend(e.effects, {version:"1.8.24", save:function (e, t) {
        for (var n = 0; n < t.length; n++)t[n] !== null && e.data("ec.storage." + t[n], e[0].style[t[n]])
    }, restore:function (e, t) {
        for (var n = 0; n < t.length; n++)t[n] !== null && e.css(t[n], e.data("ec.storage." + t[n]))
    }, setMode:function (e, t) {
        return t == "toggle" && (t = e.is(":hidden") ? "show" : "hide"), t
    }, getBaseline:function (e, t) {
        var n, r;
        switch (e[0]) {
            case"top":
                n = 0;
                break;
            case"middle":
                n = .5;
                break;
            case"bottom":
                n = 1;
                break;
            default:
                n = e[0] / t.height
        }
        switch (e[1]) {
            case"left":
                r = 0;
                break;
            case"center":
                r = .5;
                break;
            case"right":
                r = 1;
                break;
            default:
                r = e[1] / t.width
        }
        return{x:r, y:n}
    }, createWrapper:function (t) {
        if (t.parent().is(".ui-effects-wrapper"))return t.parent();
        var n = {width:t.outerWidth(!0), height:t.outerHeight(!0), "float":t.css("float")}, r = e("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%", background:"transparent", border:"none", margin:0, padding:0}), i = document.activeElement;
        try {
            i.id
        } catch (s) {
            i = document.body
        }
        return t.wrap(r), (t[0] === i || e.contains(t[0], i)) && e(i).focus(), r = t.parent(), t.css("position") == "static" ? (r.css({position:"relative"}), t.css({position:"relative"})) : (e.extend(n, {position:t.css("position"), zIndex:t.css("z-index")}), e.each(["top", "left", "bottom", "right"], function (e, r) {
            n[r] = t.css(r), isNaN(parseInt(n[r], 10)) && (n[r] = "auto")
        }), t.css({position:"relative", top:0, left:0, right:"auto", bottom:"auto"})), r.css(n).show()
    }, removeWrapper:function (t) {
        var n, r = document.activeElement;
        return t.parent().is(".ui-effects-wrapper") ? (n = t.parent().replaceWith(t), (t[0] === r || e.contains(t[0], r)) && e(r).focus(), n) : t
    }, setTransition:function (t, n, r, i) {
        return i = i || {}, e.each(n, function (e, n) {
            var s = t.cssUnit(n);
            s[0] > 0 && (i[n] = s[0] * r + s[1])
        }), i
    }}), e.fn.extend({effect:function (t, n, r, i) {
        var s = l.apply(this, arguments), o = {options:s[1], duration:s[2], callback:s[3]}, u = o.options.mode, a = e.effects[t];
        return e.fx.off || !a ? u ? this[u](o.duration, o.callback) : this.each(function () {
            o.callback && o.callback.call(this)
        }) : a.call(this, o)
    }, _show:e.fn.show, show:function (e) {
        if (c(e))return this._show.apply(this, arguments);
        var t = l.apply(this, arguments);
        return t[1].mode = "show", this.effect.apply(this, t)
    }, _hide:e.fn.hide, hide:function (e) {
        if (c(e))return this._hide.apply(this, arguments);
        var t = l.apply(this, arguments);
        return t[1].mode = "hide", this.effect.apply(this, t)
    }, __toggle:e.fn.toggle, toggle:function (t) {
        if (c(t) || typeof t == "boolean" || e.isFunction(t))return this.__toggle.apply(this, arguments);
        var n = l.apply(this, arguments);
        return n[1].mode = "toggle", this.effect.apply(this, n)
    }, cssUnit:function (t) {
        var n = this.css(t), r = [];
        return e.each(["em", "px", "%", "pt"], function (e, t) {
            n.indexOf(t) > 0 && (r = [parseFloat(n), t])
        }), r
    }});
    var h = {};
    e.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (e, t) {
        h[t] = function (t) {
            return Math.pow(t, e + 2)
        }
    }), e.extend(h, {Sine:function (e) {
        return 1 - Math.cos(e * Math.PI / 2)
    }, Circ:function (e) {
        return 1 - Math.sqrt(1 - e * e)
    }, Elastic:function (e) {
        return e === 0 || e === 1 ? e : -Math.pow(2, 8 * (e - 1)) * Math.sin(((e - 1) * 80 - 7.5) * Math.PI / 15)
    }, Back:function (e) {
        return e * e * (3 * e - 2)
    }, Bounce:function (e) {
        var t, n = 4;
        while (e < ((t = Math.pow(2, --n)) - 1) / 11);
        return 1 / Math.pow(4, 3 - n) - 7.5625 * Math.pow((t * 3 - 2) / 22 - e, 2)
    }}), e.each(h, function (t, n) {
        e.easing["easeIn" + t] = n, e.easing["easeOut" + t] = function (e) {
            return 1 - n(1 - e)
        }, e.easing["easeInOut" + t] = function (e) {
            return e < .5 ? n(e * 2) / 2 : n(e * -2 + 2) / -2 + 1
        }
    })
}(jQuery), function (e, t) {
    e.effects.puff = function (t) {
        return this.queue(function () {
            var n = e(this), r = e.effects.setMode(n, t.options.mode || "hide"), i = parseInt(t.options.percent, 10) || 150, s = i / 100, u = {height:n.height(), width:n.width()};
            e.extend(t.options, {fade:!0, mode:r, percent:r == "hide" ? i : 100, from:r == "hide" ? u : {height:u.height * s, width:u.width * s}}), n.effect("scale", t.options, t.duration, t.callback), n.dequeue()
        })
    }, e.effects.scale = function (t) {
        return this.queue(function () {
            var n = e(this), r = e.extend(!0, {}, t.options), i = e.effects.setMode(n, t.options.mode || "effect"), s = parseInt(t.options.percent, 10) || (parseInt(t.options.percent, 10) == 0 ? 0 : i == "hide" ? 0 : 100), u = t.options.direction || "both", a = t.options.origin;
            i != "effect" && (r.origin = a || ["middle", "center"], r.restore = !0);
            var f = {height:n.height(), width:n.width()};
            n.from = t.options.from || (i == "show" ? {height:0, width:0} : f);
            var l = {y:u != "horizontal" ? s / 100 : 1, x:u != "vertical" ? s / 100 : 1};
            n.to = {height:f.height * l.y, width:f.width * l.x}, t.options.fade && (i == "show" && (n.from.opacity = 0, n.to.opacity = 1), i == "hide" && (n.from.opacity = 1, n.to.opacity = 0)), r.from = n.from, r.to = n.to, r.mode = i, n.effect("size", r, t.duration, t.callback), n.dequeue()
        })
    }, e.effects.size = function (t) {
        return this.queue(function () {
            var n = e(this), r = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"], i = ["position", "top", "bottom", "left", "right", "overflow", "opacity"], s = ["width", "height", "overflow"], u = ["fontSize"], a = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"], f = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"], l = e.effects.setMode(n, t.options.mode || "effect"), c = t.options.restore || !1, h = t.options.scale || "both", p = t.options.origin, d = {height:n.height(), width:n.width()};
            n.from = t.options.from || d, n.to = t.options.to || d;
            if (p) {
                var v = e.effects.getBaseline(p, d);
                n.from.top = (d.height - n.from.height) * v.y, n.from.left = (d.width - n.from.width) * v.x, n.to.top = (d.height - n.to.height) * v.y, n.to.left = (d.width - n.to.width) * v.x
            }
            var m = {from:{y:n.from.height / d.height, x:n.from.width / d.width}, to:{y:n.to.height / d.height, x:n.to.width / d.width}};
            if (h == "box" || h == "both")m.from.y != m.to.y && (r = r.concat(a), n.from = e.effects.setTransition(n, a, m.from.y, n.from), n.to = e.effects.setTransition(n, a, m.to.y, n.to)), m.from.x != m.to.x && (r = r.concat(f), n.from = e.effects.setTransition(n, f, m.from.x, n.from), n.to = e.effects.setTransition(n, f, m.to.x, n.to));
            (h == "content" || h == "both") && m.from.y != m.to.y && (r = r.concat(u), n.from = e.effects.setTransition(n, u, m.from.y, n.from), n.to = e.effects.setTransition(n, u, m.to.y, n.to)), e.effects.save(n, c ? r : i), n.show(), e.effects.createWrapper(n), n.css("overflow", "hidden").css(n.from);
            if (h == "content" || h == "both")a = a.concat(["marginTop", "marginBottom"]).concat(u), f = f.concat(["marginLeft", "marginRight"]), s = r.concat(a).concat(f), n.find("*[width]").each(function () {
                var n = e(this);
                c && e.effects.save(n, s);
                var r = {height:n.height(), width:n.width()};
                n.from = {height:r.height * m.from.y, width:r.width * m.from.x}, n.to = {height:r.height * m.to.y, width:r.width * m.to.x}, m.from.y != m.to.y && (n.from = e.effects.setTransition(n, a, m.from.y, n.from), n.to = e.effects.setTransition(n, a, m.to.y, n.to)), m.from.x != m.to.x && (n.from = e.effects.setTransition(n, f, m.from.x, n.from), n.to = e.effects.setTransition(n, f, m.to.x, n.to)), n.css(n.from), n.animate(n.to, t.duration, t.options.easing, function () {
                    c && e.effects.restore(n, s)
                })
            });
            n.animate(n.to, {queue:!1, duration:t.duration, easing:t.options.easing, complete:function () {
                n.to.opacity === 0 && n.css("opacity", n.from.opacity), l == "hide" && n.hide(), e.effects.restore(n, c ? r : i), e.effects.removeWrapper(n), t.callback && t.callback.apply(this, arguments), n.dequeue()
            }})
        })
    }
}(jQuery);