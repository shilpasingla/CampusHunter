/*
 * File:        AutoFill.js
 * Version:     1.1.2
 * CVS:         $Id$
 * Description: AutoFill for DataTables
 * Author:      Allan Jardine (www.sprymedia.co.uk)
 * Created:     Mon  6 Sep 2010 16:54:41 BST
 * Modified:    $Date$ by $Author$
 * Language:    Javascript
 * License:     GPL v2 or BSD 3 point
 * Project:     DataTables
 * Contact:     www.sprymedia.co.uk/contact
 *
 * Copyright 2010-2011 Allan Jardine, all rights reserved.
 *
 * This source file is free software, under either the GPL v2 license or a
 * BSD style license, available at:
 *   http://datatables.net/license_gpl2
 *   http://datatables.net/license_bsd
 *
 */
/* Global scope for AutoFill */
var AutoFill;
(function (e) {
    AutoFill = function (t, n) {
        if (!this.CLASS || this.CLASS != "AutoFill") {
            alert("Warning: AutoFill must be initialised with the keyword 'new'");
            return
        }
        if (!e.fn.dataTableExt.fnVersionCheck("1.7.0")) {
            alert("Warning: AutoFill requires DataTables 1.7 or greater - www.datatables.net/download");
            return
        }
        return this.s = {filler:{height:0, width:0}, border:{width:2}, drag:{startX:-1, startY:-1, startTd:null, endTd:null, dragging:!1}, screen:{interval:null, y:0, height:0, scrollTop:0}, scroller:{top:0, bottom:0}, columns:[]}, this.dom = {table:null, filler:null, borderTop:null, borderRight:null, borderBottom:null, borderLeft:null, currentTarget:null}, this.fnSettings = function () {
            return this.s
        }, this._fnInit(t, n), this
    }, AutoFill.prototype = {_fnInit:function (t, n) {
        var r = this, i, s;
        this.s.dt = t.fnSettings(), this.dom.table = this.s.dt.nTable;
        for (i = 0, s = this.s.dt.aoColumns.length; i < s; i++)this._fnAddColumn(i);
        typeof n != "undefined" && typeof n.aoColumnDefs != "undefined" && this._fnColumnDefs(n.aoColumnDefs), typeof n != "undefined" && typeof n.aoColumns != "undefined" && this._fnColumnsAll(n.aoColumns);
        var o = document.createElement("div");
        o.className = "AutoFill_filler", document.body.appendChild(o), this.dom.filler = o, o.style.display = "block", this.s.filler.height = e(o).height(), this.s.filler.width = e(o).width(), o.style.display = "none";
        var u, a = document.body;
        r.s.dt.oScroll.sY !== "" && (r.s.dt.nTable.parentNode.style.position = "relative", a = r.s.dt.nTable.parentNode), u = document.createElement("div"), u.className = "AutoFill_border", a.appendChild(u), this.dom.borderTop = u, u = document.createElement("div"), u.className = "AutoFill_border", a.appendChild(u), this.dom.borderRight = u, u = document.createElement("div"), u.className = "AutoFill_border", a.appendChild(u), this.dom.borderBottom = u, u = document.createElement("div"), u.className = "AutoFill_border", a.appendChild(u), this.dom.borderLeft = u, e(o).mousedown(function (e) {
            return this.onselectstart = function () {
                return!1
            }, r._fnFillerDragStart.call(r, e), !1
        }), e("tbody>tr>td", this.dom.table).live("mouseover mouseout", function (e) {
            r._fnFillerDisplay.call(r, e)
        })
    }, _fnColumnDefs:function (e) {
        var t, n, r, i, s, o, u;
        for (t = e.length - 1; t >= 0; t--) {
            u = e[t].aTargets;
            for (n = 0, s = u.length; n < s; n++)if (typeof u[n] == "number" && u[n] >= 0)this._fnColumnOptions(u[n], e[t]); else if (typeof u[n] == "number" && u[n] < 0)this._fnColumnOptions(this.s.dt.aoColumns.length + u[n], e[t]); else if (typeof u[n] == "string")for (r = 0, o = this.s.dt.aoColumns.length; r < o; r++)(u[n] == "_all" || this.s.dt.aoColumns[r].nTh.className.indexOf(u[n]) != -1) && this._fnColumnOptions(r, e[t])
        }
    }, _fnColumnsAll:function (e) {
        for (var t = 0, n = this.s.dt.aoColumns.length; t < n; t++)this._fnColumnOptions(t, e[t])
    }, _fnAddColumn:function (e) {
        this.s.columns[e] = {enable:!0, read:this._fnReadCell, write:this._fnWriteCell, step:this._fnStep, complete:null}
    }, _fnColumnOptions:function (e, t) {
        typeof t.bEnable != "undefined" && (this.s.columns[e].enable = t.bEnable), typeof t.fnRead != "undefined" && (this.s.columns[e].read = t.fnRead), typeof t.fnWrite != "undefined" && (this.s.columns[e].write = t.fnWrite), typeof t.fnStep != "undefined" && (this.s.columns[e].step = t.fnStep), typeof t.fnCallback != "undefined" && (this.s.columns[e].complete = t.fnCallback)
    }, _fnTargetCoords:function (t) {
        var n = e(t).parents("tr")[0];
        return{x:e("td", n).index(t), y:e("tr", n.parentNode).index(n)}
    }, _fnUpdateBorder:function (t, n) {
        var r = this.s.border.width, i = e(t).offset(), s = e(n).offset(), o = i.left - r, u = s.left + e(n).outerWidth(), a = i.top - r, f = s.top + e(n).outerHeight(), l = s.left + e(n).outerWidth() - i.left + 2 * r, c = s.top + e(n).outerHeight() - i.top + 2 * r, h;
        if (this.s.dt.oScroll.sY !== "") {
            var p = e(this.s.dt.nTable.parentNode).offset(), d = e(this.s.dt.nTable.parentNode).scrollTop(), v = e(this.s.dt.nTable.parentNode).scrollLeft();
            o -= p.left - v, u -= p.left - v, a -= p.top - d, f -= p.top - d
        }
        h = this.dom.borderTop.style, h.top = a + "px", h.left = o + "px", h.height = this.s.border.width + "px", h.width = l + "px", h = this.dom.borderBottom.style, h.top = f + "px", h.left = o + "px", h.height = this.s.border.width + "px", h.width = l + "px", h = this.dom.borderLeft.style, h.top = a + "px", h.left = o + "px", h.height = c + "px", h.width = this.s.border.width + "px", h = this.dom.borderRight.style, h.top = a + "px", h.left = u + "px", h.height = c + "px", h.width = this.s.border.width + "px"
    }, _fnFillerDragStart:function (t) {
        var n = this, r = this.dom.currentTarget;
        this.s.drag.dragging = !0, n.dom.borderTop.style.display = "block", n.dom.borderRight.style.display = "block", n.dom.borderBottom.style.display = "block", n.dom.borderLeft.style.display = "block";
        var i = this._fnTargetCoords(r);
        this.s.drag.startX = i.x, this.s.drag.startY = i.y, this.s.drag.startTd = r, this.s.drag.endTd = r, this._fnUpdateBorder(r, r), e(document).bind("mousemove.AutoFill", function (e) {
            n._fnFillerDragMove.call(n, e)
        }), e(document).bind("mouseup.AutoFill", function (e) {
            n._fnFillerFinish.call(n, e)
        }), this.s.screen.y = t.pageY, this.s.screen.height = e(window).height(), this.s.screen.scrollTop = e(document).scrollTop(), this.s.dt.oScroll.sY !== "" && (this.s.scroller.top = e(this.s.dt.nTable.parentNode).offset().top, this.s.scroller.bottom = this.s.scroller.top + e(this.s.dt.nTable.parentNode).height()), this.s.screen.interval = setInterval(function () {
            var t = e(document).scrollTop(), r = t - n.s.screen.scrollTop;
            n.s.screen.y += r, n.s.screen.height - n.s.screen.y + t < 50 ? e("html, body").animate({scrollTop:t + 50}, 240, "linear") : n.s.screen.y - t < 50 && e("html, body").animate({scrollTop:t - 50}, 240, "linear"), n.s.dt.oScroll.sY !== "" && (n.s.screen.y > n.s.scroller.bottom - 50 ? e(n.s.dt.nTable.parentNode).animate({scrollTop:e(n.s.dt.nTable.parentNode).scrollTop() + 50}, 240, "linear") : n.s.screen.y < n.s.scroller.top + 50 && e(n.s.dt.nTable.parentNode).animate({scrollTop:e(n.s.dt.nTable.parentNode).scrollTop() - 50}, 240, "linear"))
        }, 250)
    }, _fnFillerDragMove:function (t) {
        if (t.target && t.target.nodeName.toUpperCase() == "TD" && t.target != this.s.drag.endTd) {
            var n = this._fnTargetCoords(t.target);
            n.x != this.s.drag.startX && (t.target = e("tbody>tr:eq(" + n.y + ")>td:eq(" + this.s.drag.startX + ")", this.dom.table)[0], n = this._fnTargetCoords(t.target));
            if (n.x == this.s.drag.startX) {
                var r = this.s.drag;
                r.endTd = t.target, n.y >= this.s.drag.startY ? this._fnUpdateBorder(r.startTd, r.endTd) : this._fnUpdateBorder(r.endTd, r.startTd), this._fnFillerPosition(t.target)
            }
        }
        this.s.screen.y = t.pageY, this.s.screen.scrollTop = e(document).scrollTop(), this.s.dt.oScroll.sY !== "" && (this.s.scroller.scrollTop = e(this.s.dt.nTable.parentNode).scrollTop(), this.s.scroller.top = e(this.s.dt.nTable.parentNode).offset().top, this.s.scroller.bottom = this.s.scroller.top + e(this.s.dt.nTable.parentNode).height())
    }, _fnFillerFinish:function (t) {
        var n = this;
        e(document).unbind("mousemove.AutoFill"), e(document).unbind("mouseup.AutoFill"), this.dom.borderTop.style.display = "none", this.dom.borderRight.style.display = "none", this.dom.borderBottom.style.display = "none", this.dom.borderLeft.style.display = "none", this.s.drag.dragging = !1, clearInterval(this.s.screen.interval);
        var r = this._fnTargetCoords(this.s.drag.startTd), s = this._fnTargetCoords(this.s.drag.endTd), o = [], u;
        if (r.y <= s.y) {
            u = !0;
            for (i = r.y; i <= s.y; i++)o.push(e("tbody>tr:eq(" + i + ")>td:eq(" + r.x + ")", this.dom.table)[0])
        } else {
            u = !1;
            for (i = r.y; i >= s.y; i--)o.push(e("tbody>tr:eq(" + i + ")>td:eq(" + r.x + ")", this.dom.table)[0])
        }
        var a = r.x, f = !1, l = [], c = this.s.columns[a].read.call(this, this.s.drag.startTd), h = this._fnPrep(c);
        for (i = 0, iLen = o.length; i < iLen; i++) {
            i == iLen - 1 && (f = !0);
            var p = this.s.columns[a].read.call(this, o[i]), d = this.s.columns[a].step.call(this, o[i], h, i, u, "SPRYMEDIA_AUTOFILL_STEPPER");
            this.s.columns[a].write.call(this, o[i], d, f), l.push({td:o[i], newValue:d, oldValue:p})
        }
        this.s.columns[a].complete !== null && this.s.columns[a].complete.call(this, l)
    }, _fnPrep:function (e) {
        var t = e.match(/[\d\.]+/g);
        if (!t || t.length === 0)return{iStart:0, sStr:e, sPostFix:""};
        var n = t[t.length - 1], r = parseInt(n, 10), i = new RegExp("^(.*)" + n + "(.*?)$"), s = n.match(/\./) ? "." + n.split(".")[1] : "";
        return{iStart:r, sStr:e.replace(i, "$1SPRYMEDIA_AUTOFILL_STEPPER$2"), sPostFix:s}
    }, _fnStep:function (e, t, n, r, i) {
        var s = r ? t.iStart + n : t.iStart - n;
        return isNaN(s) && (s = ""), t.sStr.replace(i, s + t.sPostFix)
    }, _fnReadCell:function (t) {
        var n = e("input", t);
        return n.length > 0 ? e(n).val() : (n = e("select", t), n.length > 0 ? e(n).val() : t.innerHTML)
    }, _fnWriteCell:function (t, n, r) {
        var i = e("input", t);
        if (i.length > 0) {
            e(i).val(n);
            return
        }
        i = e("select", t);
        if (i.length > 0) {
            e(i).val(n);
            return
        }
        var s = this.s.dt.oInstance.fnGetPosition(t);
        this.s.dt.oInstance.fnUpdate(n, s[0], s[2], r)
    }, _fnFillerDisplay:function (t) {
        if (this.s.drag.dragging)return;
        var n = t.target.nodeName.toLowerCase() == "td" ? t.target : e(t.target).parents("td")[0], r = this._fnTargetCoords(n).x;
        if (!this.s.columns[r].enable)return;
        var i = this.dom.filler;
        if (t.type == "mouseover")this.dom.currentTarget = n, this._fnFillerPosition(n), i.style.display = "block"; else if (!t.relatedTarget || !t.relatedTarget.className.match(/AutoFill/))i.style.display = "none"
    }, _fnFillerPosition:function (t) {
        var n = e(t).offset(), r = this.dom.filler;
        r.style.top = n.top - this.s.filler.height / 2 - 1 + e(t).outerHeight() + "px", r.style.left = n.left - this.s.filler.width / 2 - 1 + e(t).outerWidth() + "px"
    }}, AutoFill.prototype.CLASS = "AutoFill", AutoFill.VERSION = "1.1.2", AutoFill.prototype.VERSION = AutoFill.VERSION
})(jQuery);