/**
 * @summary     FixedColumns
 * @description Freeze columns in place on a scrolling DataTable
 * @file        FixedColumns.js
 * @version     2.0.4.dev
 * @author      Allan Jardine (www.sprymedia.co.uk)
 * @license     GPL v2 or BSD 3 point style
 * @contact     www.sprymedia.co.uk/contact
 *
 * @copyright Copyright 2010-2011 Allan Jardine, all rights reserved.
 *
 * This source file is free software, under either the GPL v2 license or a
 * BSD style license, available at:
 *   http://datatables.net/license_gpl2
 *   http://datatables.net/license_bsd
 */
/* Global scope for FixedColumns */
var FixedColumns;
(function (e, t, n) {
    FixedColumns = function (t, n) {
        if (!this instanceof FixedColumns) {
            alert("FixedColumns warning: FixedColumns must be initialised with the 'new' keyword.");
            return
        }
        typeof n == "undefined" && (n = {}), this.s = {dt:t.fnSettings(), iTableColumns:t.fnSettings().aoColumns.length, aiOuterWidths:[], aiInnerWidths:[], bOldIE:e.browser.msie && (e.browser.version == "6.0" || e.browser.version == "7.0")}, this.dom = {scroller:null, header:null, body:null, footer:null, grid:{wrapper:null, dt:null, left:{wrapper:null, head:null, body:null, foot:null}, right:{wrapper:null, head:null, body:null, foot:null}}, clone:{left:{header:null, body:null, footer:null}, right:{header:null, body:null, footer:null}}}, this.s.dt.oFixedColumns = this, this._fnConstruct(n)
    }, FixedColumns.prototype = {fnUpdate:function () {
        this._fnDraw(!0)
    }, fnRedrawLayout:function () {
        this._fnGridLayout()
    }, fnRecalculateHeight:function (e) {
        e._DTTC_iHeight = null, e.style.height = "auto"
    }, fnSetRowHeight:function (t, n) {
        var r = e(t).children(":first"), i = r.outerHeight() - r.height();
        e.browser.mozilla || e.browser.opera ? t.style.height = n + "px" : e(t).children().height(n - i)
    }, _fnConstruct:function (n) {
        var r, i, s, o = this;
        if (typeof this.s.dt.oInstance.fnVersionCheck != "function" || this.s.dt.oInstance.fnVersionCheck("1.8.0") !== !0) {
            alert("FixedColumns " + FixedColumns.VERSION + " required DataTables 1.8.0 or later. " + "Please upgrade your DataTables installation");
            return
        }
        if (this.s.dt.oScroll.sX === "") {
            this.s.dt.oInstance.oApi._fnLog(this.s.dt, 1, "FixedColumns is not needed (no x-scrolling in DataTables enabled), so no action will be taken. Use 'FixedHeader' for column fixing when scrolling is not enabled");
            return
        }
        this.s = e.extend(!0, this.s, FixedColumns.defaults, n), this.dom.grid.dt = e(this.s.dt.nTable).parents("div.dataTables_scroll")[0], this.dom.scroller = e("div.dataTables_scrollBody", this.dom.grid.dt)[0];
        var u = e(this.dom.grid.dt).width(), a = 0, f = 0;
        e("tbody>tr:eq(0)>td, tbody>tr:eq(0)>th", this.s.dt.nTable).each(function (t) {
            o.s.aiInnerWidths.push(e(this).width()), s = e(this).outerWidth(), o.s.aiOuterWidths.push(s), t < o.s.iLeftColumns && (a += s), o.s.iTableColumns - o.s.iRightColumns <= t && (f += s)
        }), this.s.iLeftWidth === null && (this.s.iLeftWidth = this.s.sLeftWidth == "fixed" ? a : a / u * 100), this.s.iRightWidth === null && (this.s.iRightWidth = this.s.sRightWidth == "fixed" ? f : f / u * 100), this._fnGridSetup();
        for (r = 0; r < this.s.iLeftColumns; r++)this.s.dt.oInstance.fnSetColumnVis(r, !1);
        for (r = this.s.iTableColumns - this.s.iRightColumns; r < this.s.iTableColumns; r++)this.s.dt.oInstance.fnSetColumnVis(r, !1);
        e(this.dom.scroller).scroll(function () {
            o.dom.grid.left.body.scrollTop = o.dom.scroller.scrollTop, o.s.iRightColumns > 0 && (o.dom.grid.right.body.scrollTop = o.dom.scroller.scrollTop)
        }), e(t).resize(function () {
            o._fnGridLayout.call(o)
        });
        var l = !0;
        this.s.dt.aoDrawCallback = [
            {fn:function () {
                o._fnDraw.call(o, l), o._fnGridHeight(o), l = !1
            }, sName:"FixedColumns"}
        ].concat(this.s.dt.aoDrawCallback), this._fnGridLayout(), this._fnGridHeight(), this.s.dt.oInstance.fnDraw(!1)
    }, _fnGridSetup:function () {
        var t = this;
        this.dom.body = this.s.dt.nTable, this.dom.header = this.s.dt.nTHead.parentNode, this.dom.header.parentNode.parentNode.style.position = "relative";
        var n = e('<div class="DTFC_ScrollWrapper" style="position:relative; clear:both;"><div class="DTFC_LeftWrapper" style="position:absolute; top:0; left:0;"><div class="DTFC_LeftHeadWrapper" style="position:relative; top:0; left:0; overflow:hidden;"></div><div class="DTFC_LeftBodyWrapper" style="position:relative; top:0; left:0; overflow:hidden;"></div><div class="DTFC_LeftFootWrapper" style="position:relative; top:0; left:0; overflow:hidden;"></div></div><div class="DTFC_RightWrapper" style="position:absolute; top:0; left:0;"><div class="DTFC_RightHeadWrapper" style="position:relative; top:0; left:0; overflow:hidden;"></div><div class="DTFC_RightBodyWrapper" style="position:relative; top:0; left:0; overflow:hidden;"></div><div class="DTFC_RightFootWrapper" style="position:relative; top:0; left:0; overflow:hidden;"></div></div></div>')[0];
        nLeft = n.childNodes[0], nRight = n.childNodes[1], this.dom.grid.wrapper = n, this.dom.grid.left.wrapper = nLeft, this.dom.grid.left.head = nLeft.childNodes[0], this.dom.grid.left.body = nLeft.childNodes[1], this.s.iRightColumns > 0 && (this.dom.grid.right.wrapper = nRight, this.dom.grid.right.head = nRight.childNodes[0], this.dom.grid.right.body = nRight.childNodes[1]), this.s.dt.nTFoot && (this.dom.footer = this.s.dt.nTFoot.parentNode, this.dom.grid.left.foot = nLeft.childNodes[2], this.s.iRightColumns > 0 && (this.dom.grid.right.foot = nRight.childNodes[2])), n.appendChild(nLeft), this.dom.grid.dt.parentNode.insertBefore(n, this.dom.grid.dt), n.appendChild(this.dom.grid.dt), this.dom.grid.dt.style.position = "absolute", this.dom.grid.dt.style.top = "0px", this.dom.grid.dt.style.left = this.s.iLeftWidth + "px", this.dom.grid.dt.style.width = e(this.dom.grid.dt).width() - this.s.iLeftWidth - this.s.iRightWidth + "px"
    }, _fnGridLayout:function () {
        var t = this.dom.grid, n = e(t.wrapper).width(), r = 0, i = 0, s = 0;
        this.s.sLeftWidth == "fixed" ? r = this.s.iLeftWidth : r = this.s.iLeftWidth / 100 * n, this.s.sRightWidth == "fixed" ? i = this.s.iRightWidth : i = this.s.iRightWidth / 100 * n, s = n - r - i, t.left.wrapper.style.width = r + "px", t.dt.style.width = s + "px", t.dt.style.left = r + "px", this.s.iRightColumns > 0 && (t.right.wrapper.style.width = i + "px", t.right.wrapper.style.left = n - i + "px")
    }, _fnGridHeight:function () {
        var t = this.dom.grid, n = e(this.dom.grid.dt).height();
        t.wrapper.style.height = n + "px", t.left.body.style.height = e(this.dom.scroller).height() + "px", t.left.wrapper.style.height = n + "px", this.s.iRightColumns > 0 && (t.right.wrapper.style.height = n + "px", t.right.body.style.height = e(this.dom.scroller).height() + "px")
    }, _fnDraw:function (t) {
        this._fnCloneLeft(t), this._fnCloneRight(t), this.s.fnDrawCallback !== null && this.s.fnDrawCallback.call(this, this.dom.clone.left, this.dom.clone.right), e(this).trigger("draw", {leftClone:this.dom.clone.left, rightClone:this.dom.clone.right})
    }, _fnCloneRight:function (e) {
        if (this.s.iRightColumns <= 0)return;
        var t = this, n, r, i = [];
        for (n = this.s.iTableColumns - this.s.iRightColumns; n < this.s.iTableColumns; n++)i.push(n);
        this._fnClone(this.dom.clone.right, this.dom.grid.right, i, e)
    }, _fnCloneLeft:function (e) {
        if (this.s.iLeftColumns <= 0)return;
        var t = this, n, r, i = [];
        for (n = 0; n < this.s.iLeftColumns; n++)i.push(n);
        this._fnClone(this.dom.clone.left, this.dom.grid.left, i, e)
    }, _fnCopyLayout:function (t, n) {
        var r = [], i = [], s = [];
        for (var o = 0, u = t.length; o < u; o++) {
            var a = [];
            a.nTr = e(t[o].nTr).clone(!0)[0];
            for (var f = 0, l = this.s.iTableColumns; f < l; f++) {
                if (e.inArray(f, n) === -1)continue;
                var c = e.inArray(t[o][f].cell, s);
                if (c === -1) {
                    var h = e(t[o][f].cell).clone(!0)[0];
                    i.push(h), s.push(t[o][f].cell), a.push({cell:h, unique:t[o][f].unique})
                } else a.push({cell:i[c], unique:t[o][f].unique})
            }
            r.push(a)
        }
        return r
    }, _fnClone:function (t, n, r, i) {
        var s = this, o, u, a, f, l, c, h, p, d;
        if (i) {
            t.header !== null && t.header.parentNode.removeChild(t.header), t.header = e(this.dom.header).clone(!0)[0], t.header.className += " DTFC_Cloned", t.header.style.width = "100%", n.head.appendChild(t.header);
            var v = this._fnCopyLayout(this.s.dt.aoHeader, r), m = e(">thead", t.header);
            m.empty();
            for (o = 0, u = v.length; o < u; o++)m[0].appendChild(v[o].nTr);
            this.s.dt.oApi._fnDrawHead(this.s.dt, v, !0)
        } else {
            var v = this._fnCopyLayout(this.s.dt.aoHeader, r), g = [];
            this.s.dt.oApi._fnDetectHeader(g, e(">thead", t.header)[0]);
            for (o = 0, u = v.length; o < u; o++)for (a = 0, f = v[o].length; a < f; a++)g[o][a].cell.className = v[o][a].cell.className, e("span.DataTables_sort_icon", g[o][a].cell).each(function () {
                this.className = e("span.DataTables_sort_icon", v[o][a].cell)[0].className
            })
        }
        this._fnEqualiseHeights("thead", this.dom.header, t.header), this.s.sHeightMatch == "auto" && e(">tbody>tr", s.dom.body).css("height", "auto"), t.body !== null && (t.body.parentNode.removeChild(t.body), t.body = null), t.body = e(this.dom.body).clone(!0)[0], t.body.className += " DTFC_Cloned", t.body.style.paddingBottom = this.s.dt.oScroll.iBarWidth + "px", t.body.style.marginBottom = this.s.dt.oScroll.iBarWidth * 2 + "px", t.body.getAttribute("id") !== null && t.body.removeAttribute("id"), e(">thead>tr", t.body).empty(), e(">tfoot", t.body).remove();
        var y = e("tbody", t.body)[0];
        e(y).empty();
        if (this.s.dt.aiDisplay.length > 0) {
            var b = e(">thead>tr", t.body)[0];
            for (d = 0; d < r.length; d++)h = r[d], p = e(this.s.dt.aoColumns[h].nTh).clone(!0)[0], p.innerHTML = "", oStyle = p.style, oStyle.paddingTop = "0", oStyle.paddingBottom = "0", oStyle.borderTopWidth = "0", oStyle.borderBottomWidth = "0", oStyle.height = 0, oStyle.width = s.s.aiInnerWidths[h] + "px", b.appendChild(p);
            e(">tbody>tr", s.dom.body).each(function (t) {
                var n = this.cloneNode(!1), i = s.s.dt.oFeatures.bServerSide === !1 ? s.s.dt.aiDisplay[s.s.dt._iDisplayStart + t] : t;
                for (d = 0; d < r.length; d++)h = r[d], typeof s.s.dt.aoData[i]._anHidden[h] != "undefined" && (p = e(s.s.dt.aoData[i]._anHidden[h]).clone(!0)[0], n.appendChild(p));
                y.appendChild(n)
            })
        } else e(">tbody>tr", s.dom.body).each(function (t) {
            p = this.cloneNode(!0), p.className += " DTFC_NoData", e("td", p).html(""), y.appendChild(p)
        });
        t.body.style.width = "100%", n.body.appendChild(t.body), this._fnEqualiseHeights("tbody", s.dom.body, t.body);
        if (this.s.dt.nTFoot !== null) {
            if (i) {
                t.footer !== null && t.footer.parentNode.removeChild(t.footer), t.footer = e(this.dom.footer).clone(!0)[0], t.footer.className += " DTFC_Cloned", t.footer.style.width = "100%", n.foot.appendChild(t.footer);
                var v = this._fnCopyLayout(this.s.dt.aoFooter, r), w = e(">tfoot", t.footer);
                w.empty();
                for (o = 0, u = v.length; o < u; o++)w[0].appendChild(v[o].nTr);
                this.s.dt.oApi._fnDrawHead(this.s.dt, v, !0)
            } else {
                var v = this._fnCopyLayout(this.s.dt.aoFooter, r), E = [];
                this.s.dt.oApi._fnDetectHeader(E, e(">tfoot", t.footer)[0]);
                for (o = 0, u = v.length; o < u; o++)for (a = 0, f = v[o].length; a < f; a++)E[o][a].cell.className = v[o][a].cell.className
            }
            this._fnEqualiseHeights("tfoot", this.dom.footer, t.footer)
        }
        var S = this.s.dt.oApi._fnGetUniqueThs(this.s.dt, e(">thead", t.header)[0]);
        e(S).each(function (e) {
            h = r[e], this.style.width = s.s.aiInnerWidths[h] + "px"
        }), s.s.dt.nTFoot !== null && (S = this.s.dt.oApi._fnGetUniqueThs(this.s.dt, e(">tfoot", t.footer)[0]), e(S).each(function (e) {
            h = r[e], this.style.width = s.s.aiInnerWidths[h] + "px"
        }))
    }, _fnGetTrNodes:function (e) {
        var t = [];
        for (var n = 0, r = e.childNodes.length; n < r; n++)e.childNodes[n].nodeName.toUpperCase() == "TR" && t.push(e.childNodes[n]);
        return t
    }, _fnEqualiseHeights:function (t, n, r) {
        if (this.s.sHeightMatch == "none" && t !== "thead" && t !== "tfoot")return;
        var i = this, s, o, u, a, f, l, c = n.getElementsByTagName(t)[0], h = r.getElementsByTagName(t)[0], p = e(">" + t + ">tr:eq(0)", n).children(":first"), d = p.outerHeight() - p.height(), v = this._fnGetTrNodes(c), m = this._fnGetTrNodes(h);
        for (s = 0, o = m.length; s < o; s++) {
            if (this.s.sHeightMatch == "semiauto" && typeof v[s]._DTTC_iHeight != "undefined" && v[s]._DTTC_iHeight !== null) {
                e.browser.msie && e(m[s]).children().height(v[s]._DTTC_iHeight - d);
                continue
            }
            f = v[s].offsetHeight, l = m[s].offsetHeight, u = l > f ? l : f, this.s.sHeightMatch == "semiauto" && (v[s]._DTTC_iHeight = u), e.browser.msie && e.browser.version < 8 ? (e(m[s]).children().height(u - d), e(v[s]).children().height(u - d)) : (m[s].style.height = u + "px", v[s].style.height = u + "px")
        }
    }}, FixedColumns.defaults = {iLeftColumns:1, iRightColumns:0, fnDrawCallback:null, sLeftWidth:"fixed", iLeftWidth:null, sRightWidth:"fixed", iRightWidth:null, sHeightMatch:"semiauto"}, FixedColumns.prototype.CLASS = "FixedColumns", FixedColumns.VERSION = "2.0.4.dev"
})(jQuery, window, document);