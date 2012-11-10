/*
 * File:        FixedHeader.js
 * Version:     2.0.6
 * Description: "Fix" a header at the top of the table, so it scrolls with the table
 * Author:      Allan Jardine (www.sprymedia.co.uk)
 * Created:     Wed 16 Sep 2009 19:46:30 BST
 * Language:    Javascript
 * License:     GPL v2 or BSD 3 point style
 * Project:     Just a little bit of fun - enjoy :-)
 * Contact:     www.sprymedia.co.uk/contact
 *
 * Copyright 2009-2012 Allan Jardine, all rights reserved.
 *
 * This source file is free software, under either the GPL v2 license or a
 * BSD style license, available at:
 *   http://datatables.net/license_gpl2
 *   http://datatables.net/license_bsd
 */
/*
 * Function: FixedHeader
 * Purpose:  Provide 'fixed' header, footer and columns on an HTML table
 * Returns:  object:FixedHeader - must be called with 'new'
 * Inputs:   mixed:mTable - target table
 *					   1. DataTable object - when using FixedHeader with DataTables, or
 *					   2. HTML table node - when using FixedHeader without DataTables
 *           object:oInit - initialisation settings, with the following properties (each optional)
 *             bool:top -    fix the header (default true)
 *             bool:bottom - fix the footer (default false)
 *             bool:left -   fix the left most column (default false)
 *             bool:right -  fix the right most column (default false)
 *             int:zTop -    fixed header zIndex
 *             int:zBottom - fixed footer zIndex
 *             int:zLeft -   fixed left zIndex
 *             int:zRight -  fixed right zIndex
 */
var FixedHeader = function (e, t) {
    if (typeof this.fnInit != "function") {
        alert("FixedHeader warning: FixedHeader must be initialised with the 'new' keyword.");
        return
    }
    var n = this, r = {aoCache:[], oSides:{top:!0, bottom:!1, left:!1, right:!1}, oZIndexes:{top:104, bottom:103, left:102, right:101}, oMes:{iTableWidth:0, iTableHeight:0, iTableLeft:0, iTableRight:0, iTableTop:0, iTableBottom:0}, oOffset:{top:0}, nTable:null, bUseAbsPos:!1, bFooter:!1};
    this.fnGetSettings = function () {
        return r
    }, this.fnUpdate = function () {
        this._fnUpdateClones(), this._fnUpdatePositions()
    }, this.fnPosition = function () {
        this._fnUpdatePositions()
    }, this.fnInit(e, t), typeof e.fnSettings == "function" && (e._oPluginFixedHeader = this)
};
FixedHeader.prototype = {fnInit:function (e, t) {
    var n = this.fnGetSettings(), r = this;
    this.fnInitSettings(n, t);
    if (typeof e.fnSettings == "function") {
        if (typeof e.fnVersionCheck == "functon" && e.fnVersionCheck("1.6.0") !== !0) {
            alert("FixedHeader 2 required DataTables 1.6.0 or later. Please upgrade your DataTables installation");
            return
        }
        var i = e.fnSettings();
        if (i.oScroll.sX != "" || i.oScroll.sY != "") {
            alert("FixedHeader 2 is not supported with DataTables' scrolling mode at this time");
            return
        }
        n.nTable = i.nTable, i.aoDrawCallback.push({fn:function () {
            FixedHeader.fnMeasure(), r._fnUpdateClones.call(r), r._fnUpdatePositions.call(r)
        }, sName:"FixedHeader"})
    } else n.nTable = e;
    n.bFooter = $(">tfoot", n.nTable).length > 0 ? !0 : !1, n.bUseAbsPos = jQuery.browser.msie && (jQuery.browser.version == "6.0" || jQuery.browser.version == "7.0"), n.oSides.top && n.aoCache.push(r._fnCloneTable("fixedHeader", "FixedHeader_Header", r._fnCloneThead)), n.oSides.bottom && n.aoCache.push(r._fnCloneTable("fixedFooter", "FixedHeader_Footer", r._fnCloneTfoot)), n.oSides.left && n.aoCache.push(r._fnCloneTable("fixedLeft", "FixedHeader_Left", r._fnCloneTLeft)), n.oSides.right && n.aoCache.push(r._fnCloneTable("fixedRight", "FixedHeader_Right", r._fnCloneTRight)), FixedHeader.afnScroll.push(function () {
        r._fnUpdatePositions.call(r)
    }), jQuery(window).resize(function () {
        FixedHeader.fnMeasure(), r._fnUpdateClones.call(r), r._fnUpdatePositions.call(r)
    }), FixedHeader.fnMeasure(), r._fnUpdateClones(), r._fnUpdatePositions()
}, fnInitSettings:function (e, t) {
    typeof t != "undefined" && (typeof t.top != "undefined" && (e.oSides.top = t.top), typeof t.bottom != "undefined" && (e.oSides.bottom = t.bottom), typeof t.left != "undefined" && (e.oSides.left = t.left), typeof t.right != "undefined" && (e.oSides.right = t.right), typeof t.zTop != "undefined" && (e.oZIndexes.top = t.zTop), typeof t.zBottom != "undefined" && (e.oZIndexes.bottom = t.zBottom), typeof t.zLeft != "undefined" && (e.oZIndexes.left = t.zLeft), typeof t.zRight != "undefined" && (e.oZIndexes.right = t.zRight), typeof t.offsetTop != "undefined" && (e.oOffset.top = t.offsetTop)), e.bUseAbsPos = jQuery.browser.msie && (jQuery.browser.version == "6.0" || jQuery.browser.version == "7.0")
}, _fnCloneTable:function (e, t, n) {
    var r = this.fnGetSettings(), i;
    jQuery(r.nTable.parentNode).css("position") != "absolute" && (r.nTable.parentNode.style.position = "relative"), i = r.nTable.cloneNode(!1), i.removeAttribute("id");
    var s = document.createElement("div");
    return s.style.position = "absolute", s.style.top = "0px", s.style.left = "0px", s.className += " FixedHeader_Cloned " + e + " " + t, e == "fixedHeader" && (s.style.zIndex = r.oZIndexes.top), e == "fixedFooter" && (s.style.zIndex = r.oZIndexes.bottom), e == "fixedLeft" ? s.style.zIndex = r.oZIndexes.left : e == "fixedRight" && (s.style.zIndex = r.oZIndexes.right), i.style.margin = "0", s.appendChild(i), document.body.appendChild(s), {nNode:i, nWrapper:s, sType:e, sPosition:"", sTop:"", sLeft:"", fnClone:n}
}, _fnMeasure:function () {
    var e = this.fnGetSettings(), t = e.oMes, n = jQuery(e.nTable), r = n.offset(), i = this._fnSumScroll(e.nTable.parentNode, "scrollTop"), s = this._fnSumScroll(e.nTable.parentNode, "scrollLeft");
    t.iTableWidth = n.outerWidth(), t.iTableHeight = n.outerHeight(), t.iTableLeft = r.left + e.nTable.parentNode.scrollLeft, t.iTableTop = r.top + i, t.iTableRight = t.iTableLeft + t.iTableWidth, t.iTableRight = FixedHeader.oDoc.iWidth - t.iTableLeft - t.iTableWidth, t.iTableBottom = FixedHeader.oDoc.iHeight - t.iTableTop - t.iTableHeight
}, _fnSumScroll:function (e, t) {
    var n = e[t];
    while (e = e.parentNode) {
        if (e.nodeName == "HTML" || e.nodeName == "BODY")break;
        n = e[t]
    }
    return n
}, _fnUpdatePositions:function () {
    var e = this.fnGetSettings();
    this._fnMeasure();
    for (var t = 0, n = e.aoCache.length; t < n; t++)e.aoCache[t].sType == "fixedHeader" ? this._fnScrollFixedHeader(e.aoCache[t]) : e.aoCache[t].sType == "fixedFooter" ? this._fnScrollFixedFooter(e.aoCache[t]) : e.aoCache[t].sType == "fixedLeft" ? this._fnScrollHorizontalLeft(e.aoCache[t]) : this._fnScrollHorizontalRight(e.aoCache[t])
}, _fnUpdateClones:function () {
    var e = this.fnGetSettings();
    for (var t = 0, n = e.aoCache.length; t < n; t++)e.aoCache[t].fnClone.call(this, e.aoCache[t])
}, _fnScrollHorizontalRight:function (e) {
    var t = this.fnGetSettings(), n = t.oMes, r = FixedHeader.oWin, i = FixedHeader.oDoc, s = e.nWrapper, o = jQuery(s).outerWidth();
    r.iScrollRight < n.iTableRight ? (this._fnUpdateCache(e, "sPosition", "absolute", "position", s.style), this._fnUpdateCache(e, "sTop", n.iTableTop + "px", "top", s.style), this._fnUpdateCache(e, "sLeft", n.iTableLeft + n.iTableWidth - o + "px", "left", s.style)) : n.iTableLeft < i.iWidth - r.iScrollRight - o ? t.bUseAbsPos ? (this._fnUpdateCache(e, "sPosition", "absolute", "position", s.style), this._fnUpdateCache(e, "sTop", n.iTableTop + "px", "top", s.style), this._fnUpdateCache(e, "sLeft", i.iWidth - r.iScrollRight - o + "px", "left", s.style)) : (this._fnUpdateCache(e, "sPosition", "fixed", "position", s.style), this._fnUpdateCache(e, "sTop", n.iTableTop - r.iScrollTop + "px", "top", s.style), this._fnUpdateCache(e, "sLeft", r.iWidth - o + "px", "left", s.style)) : (this._fnUpdateCache(e, "sPosition", "absolute", "position", s.style), this._fnUpdateCache(e, "sTop", n.iTableTop + "px", "top", s.style), this._fnUpdateCache(e, "sLeft", n.iTableLeft + "px", "left", s.style))
}, _fnScrollHorizontalLeft:function (e) {
    var t = this.fnGetSettings(), n = t.oMes, r = FixedHeader.oWin, i = FixedHeader.oDoc, s = e.nWrapper, o = jQuery(s).outerWidth();
    r.iScrollLeft < n.iTableLeft ? (this._fnUpdateCache(e, "sPosition", "absolute", "position", s.style), this._fnUpdateCache(e, "sTop", n.iTableTop + "px", "top", s.style), this._fnUpdateCache(e, "sLeft", n.iTableLeft + "px", "left", s.style)) : r.iScrollLeft < n.iTableLeft + n.iTableWidth - o ? t.bUseAbsPos ? (this._fnUpdateCache(e, "sPosition", "absolute", "position", s.style), this._fnUpdateCache(e, "sTop", n.iTableTop + "px", "top", s.style), this._fnUpdateCache(e, "sLeft", r.iScrollLeft + "px", "left", s.style)) : (this._fnUpdateCache(e, "sPosition", "fixed", "position", s.style), this._fnUpdateCache(e, "sTop", n.iTableTop - r.iScrollTop + "px", "top", s.style), this._fnUpdateCache(e, "sLeft", "0px", "left", s.style)) : (this._fnUpdateCache(e, "sPosition", "absolute", "position", s.style), this._fnUpdateCache(e, "sTop", n.iTableTop + "px", "top", s.style), this._fnUpdateCache(e, "sLeft", n.iTableLeft + n.iTableWidth - o + "px", "left", s.style))
}, _fnScrollFixedFooter:function (e) {
    var t = this.fnGetSettings(), n = t.oMes, r = FixedHeader.oWin, i = FixedHeader.oDoc, s = e.nWrapper, o = jQuery("thead", t.nTable).outerHeight(), u = jQuery(s).outerHeight();
    r.iScrollBottom < n.iTableBottom ? (this._fnUpdateCache(e, "sPosition", "absolute", "position", s.style), this._fnUpdateCache(e, "sTop", n.iTableTop + n.iTableHeight - u + "px", "top", s.style), this._fnUpdateCache(e, "sLeft", n.iTableLeft + "px", "left", s.style)) : r.iScrollBottom < n.iTableBottom + n.iTableHeight - u - o ? t.bUseAbsPos ? (this._fnUpdateCache(e, "sPosition", "absolute", "position", s.style), this._fnUpdateCache(e, "sTop", i.iHeight - r.iScrollBottom - u + "px", "top", s.style), this._fnUpdateCache(e, "sLeft", n.iTableLeft + "px", "left", s.style)) : (this._fnUpdateCache(e, "sPosition", "fixed", "position", s.style), this._fnUpdateCache(e, "sTop", r.iHeight - u + "px", "top", s.style), this._fnUpdateCache(e, "sLeft", n.iTableLeft - r.iScrollLeft + "px", "left", s.style)) : (this._fnUpdateCache(e, "sPosition", "absolute", "position", s.style), this._fnUpdateCache(e, "sTop", n.iTableTop + u + "px", "top", s.style), this._fnUpdateCache(e, "sLeft", n.iTableLeft + "px", "left", s.style))
}, _fnScrollFixedHeader:function (e) {
    var t = this.fnGetSettings(), n = t.oMes, r = FixedHeader.oWin, i = FixedHeader.oDoc, s = e.nWrapper, o = 0, u = t.nTable.getElementsByTagName("tbody");
    for (var a = 0; a < u.length; ++a)o += u[a].offsetHeight;
    n.iTableTop > r.iScrollTop + t.oOffset.top ? (this._fnUpdateCache(e, "sPosition", "absolute", "position", s.style), this._fnUpdateCache(e, "sTop", n.iTableTop + "px", "top", s.style), this._fnUpdateCache(e, "sLeft", n.iTableLeft + "px", "left", s.style)) : r.iScrollTop + t.oOffset.top > n.iTableTop + o ? (this._fnUpdateCache(e, "sPosition", "absolute", "position", s.style), this._fnUpdateCache(e, "sTop", n.iTableTop + o + "px", "top", s.style), this._fnUpdateCache(e, "sLeft", n.iTableLeft + "px", "left", s.style)) : t.bUseAbsPos ? (this._fnUpdateCache(e, "sPosition", "absolute", "position", s.style), this._fnUpdateCache(e, "sTop", r.iScrollTop + "px", "top", s.style), this._fnUpdateCache(e, "sLeft", n.iTableLeft + "px", "left", s.style)) : (this._fnUpdateCache(e, "sPosition", "fixed", "position", s.style), this._fnUpdateCache(e, "sTop", t.oOffset.top + "px", "top", s.style), this._fnUpdateCache(e, "sLeft", n.iTableLeft - r.iScrollLeft + "px", "left", s.style))
}, _fnUpdateCache:function (e, t, n, r, i) {
    e[t] != n && (i[r] = n, e[t] = n)
}, _fnCloneThead:function (e) {
    var t = this.fnGetSettings(), n = e.nNode;
    e.nWrapper.style.width = jQuery(t.nTable).outerWidth() + "px";
    while (n.childNodes.length > 0)jQuery("thead th", n).unbind("click"), n.removeChild(n.childNodes[0]);
    var r = jQuery("thead", t.nTable).clone(!0)[0];
    n.appendChild(r), jQuery("thead>tr th", t.nTable).each(function (e) {
        jQuery("thead>tr th:eq(" + e + ")", n).width(jQuery(this).width())
    }), jQuery("thead>tr td", t.nTable).each(function (e) {
        jQuery("thead>tr td:eq(" + e + ")", n).width(jQuery(this).width())
    })
}, _fnCloneTfoot:function (e) {
    var t = this.fnGetSettings(), n = e.nNode;
    e.nWrapper.style.width = jQuery(t.nTable).outerWidth() + "px";
    while (n.childNodes.length > 0)n.removeChild(n.childNodes[0]);
    var r = jQuery("tfoot", t.nTable).clone(!0)[0];
    n.appendChild(r), jQuery("tfoot:eq(0)>tr th", t.nTable).each(function (e) {
        jQuery("tfoot:eq(0)>tr th:eq(" + e + ")", n).width(jQuery(this).width())
    }), jQuery("tfoot:eq(0)>tr td", t.nTable).each(function (e) {
        jQuery("tfoot:eq(0)>tr th:eq(" + e + ")", n)[0].style.width(jQuery(this).width())
    })
}, _fnCloneTLeft:function (e) {
    var t = this.fnGetSettings(), n = e.nNode, r = $("tbody", t.nTable)[0], i = $("tbody tr:eq(0) td", t.nTable).length, s = $.browser.msie && ($.browser.version == "6.0" || $.browser.version == "7.0");
    while (n.childNodes.length > 0)n.removeChild(n.childNodes[0]);
    n.appendChild(jQuery("thead", t.nTable).clone(!0)[0]), n.appendChild(jQuery("tbody", t.nTable).clone(!0)[0]), t.bFooter && n.appendChild(jQuery("tfoot", t.nTable).clone(!0)[0]), $("thead tr", n).each(function (e) {
        $("th:gt(0)", this).remove()
    }), $("tfoot tr", n).each(function (e) {
        $("th:gt(0)", this).remove()
    }), $("tbody tr", n).each(function (e) {
        $("td:gt(0)", this).remove()
    }), this.fnEqualiseHeights("tbody", r.parentNode, n);
    var o = jQuery("thead tr th:eq(0)", t.nTable).outerWidth();
    n.style.width = o + "px", e.nWrapper.style.width = o + "px"
}, _fnCloneTRight:function (e) {
    var t = this.fnGetSettings(), n = $("tbody", t.nTable)[0], r = e.nNode, i = jQuery("tbody tr:eq(0) td", t.nTable).length, s = $.browser.msie && ($.browser.version == "6.0" || $.browser.version == "7.0");
    while (r.childNodes.length > 0)r.removeChild(r.childNodes[0]);
    r.appendChild(jQuery("thead", t.nTable).clone(!0)[0]), r.appendChild(jQuery("tbody", t.nTable).clone(!0)[0]), t.bFooter && r.appendChild(jQuery("tfoot", t.nTable).clone(!0)[0]), jQuery("thead tr th:not(:nth-child(" + i + "n))", r).remove(), jQuery("tfoot tr th:not(:nth-child(" + i + "n))", r).remove(), $("tbody tr", r).each(function (e) {
        $("td:lt(" + (i - 1) + ")", this).remove()
    }), this.fnEqualiseHeights("tbody", n.parentNode, r);
    var o = jQuery("thead tr th:eq(" + (i - 1) + ")", t.nTable).outerWidth();
    r.style.width = o + "px", e.nWrapper.style.width = o + "px"
}, fnEqualiseHeights:function (e, t, n) {
    var r = this, i = $(e + " tr:eq(0)", t).children(":eq(0)"), s = i.outerHeight() - i.height(), o = $.browser.msie && ($.browser.version == "6.0" || $.browser.version == "7.0");
    $(e + " tr", n).each(function (n) {
        $.browser.mozilla || $.browser.opera ? $(this).children().height($(e + " tr:eq(" + n + ")", t).outerHeight()) : $(this).children().height($(e + " tr:eq(" + n + ")", t).outerHeight() - s), o || $(e + " tr:eq(" + n + ")", t).height($(e + " tr:eq(" + n + ")", t).outerHeight())
    })
}}, FixedHeader.oWin = {iScrollTop:0, iScrollRight:0, iScrollBottom:0, iScrollLeft:0, iHeight:0, iWidth:0}, FixedHeader.oDoc = {iHeight:0, iWidth:0}, FixedHeader.afnScroll = [], FixedHeader.fnMeasure = function () {
    var e = jQuery(window), t = jQuery(document), n = FixedHeader.oWin, r = FixedHeader.oDoc;
    r.iHeight = t.height(), r.iWidth = t.width(), n.iHeight = e.height(), n.iWidth = e.width(), n.iScrollTop = e.scrollTop(), n.iScrollLeft = e.scrollLeft(), n.iScrollRight = r.iWidth - n.iScrollLeft - n.iWidth, n.iScrollBottom = r.iHeight - n.iScrollTop - n.iHeight
}, FixedHeader.VERSION = "2.0.6", FixedHeader.prototype.VERSION = FixedHeader.VERSION, jQuery(window).scroll(function () {
    FixedHeader.fnMeasure();
    for (var e = 0, t = FixedHeader.afnScroll.length; e < t; e++)FixedHeader.afnScroll[e]()
});