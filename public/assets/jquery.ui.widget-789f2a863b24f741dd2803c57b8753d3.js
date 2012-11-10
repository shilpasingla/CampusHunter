/*!
 * jQuery UI Widget 1.8.24
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */
(function (e, t) {
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
                        e(this).triggerHandler("remove")
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
})(jQuery);