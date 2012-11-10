/*
 * File:        ColVis.js
 * Version:     1.0.8
 * CVS:         $Id$
 * Description: Controls for column visiblity in DataTables
 * Author:      Allan Jardine (www.sprymedia.co.uk)
 * Created:     Wed Sep 15 18:23:29 BST 2010
 * Modified:    $Date$ by $Author$
 * Language:    Javascript
 * License:     GPL v2 or BSD 3 point style
 * Project:     Just a little bit of fun :-)
 * Contact:     www.sprymedia.co.uk/contact
 *
 * Copyright 2010-2011 Allan Jardine, all rights reserved.
 *
 * This source file is free software, under either the GPL v2 license or a
 * BSD style license, available at:
 *   http://datatables.net/license_gpl2
 *   http://datatables.net/license_bsd
 */
(function (e) {
    ColVis = function (e, t) {
        return(!this.CLASS || this.CLASS != "ColVis") && alert("Warning: ColVis must be initialised with the keyword 'new'"), typeof t == "undefined" && (t = {}), this.s = {dt:null, oInit:t, fnStateChange:null, activate:"click", sAlign:"left", buttonText:"Show / hide columns", hidden:!0, aiExclude:[], abOriginal:[], bShowAll:!1, sShowAll:"Show All", bRestore:!1, sRestore:"Restore original", iOverlayFade:500, fnLabel:null, sSize:"auto", bCssPosition:!1}, this.dom = {wrapper:null, button:null, collection:null, background:null, catcher:null, buttons:[], restore:null}, ColVis.aInstances.push(this), this.s.dt = e, this._fnConstruct(), this
    }, ColVis.prototype = {fnRebuild:function () {
        for (var e = this.dom.buttons.length - 1; e >= 0; e--)this.dom.buttons[e] !== null && this.dom.collection.removeChild(this.dom.buttons[e]);
        this.dom.buttons.splice(0, this.dom.buttons.length), this.dom.restore && this.dom.restore.parentNode(this.dom.restore), this._fnAddButtons(), this._fnDrawCallback()
    }, _fnConstruct:function () {
        this._fnApplyCustomisation();
        var t = this, n, r;
        this.dom.wrapper = document.createElement("div"), this.dom.wrapper.className = "ColVis TableTools", this.dom.button = this._fnDomBaseButton(this.s.buttonText), this.dom.button.className += " ColVis_MasterButton", this.dom.wrapper.appendChild(this.dom.button), this.dom.catcher = this._fnDomCatcher(), this.dom.collection = this._fnDomCollection(), this.dom.background = this._fnDomBackground(), this._fnAddButtons();
        for (n = 0, r = this.s.dt.aoColumns.length; n < r; n++)this.s.abOriginal.push(this.s.dt.aoColumns[n].bVisible);
        this.s.dt.aoDrawCallback.push({fn:function () {
            t._fnDrawCallback.call(t)
        }, sName:"ColVis"}), e(this.s.dt.oInstance).bind("column-reorder", function (e, s, o) {
            for (n = 0, r = t.s.aiExclude.length; n < r; n++)t.s.aiExclude[n] = o.aiInvertMapping[t.s.aiExclude[n]];
            var u = t.s.abOriginal.splice(o.iFrom, 1)[0];
            t.s.abOriginal.splice(o.iTo, 0, u), t.fnRebuild()
        })
    }, _fnApplyCustomisation:function () {
        var e = this.s.oInit;
        typeof e.activate != "undefined" && (this.s.activate = e.activate), typeof e.buttonText != "undefined" && (this.s.buttonText = e.buttonText), typeof e.aiExclude != "undefined" && (this.s.aiExclude = e.aiExclude), typeof e.bRestore != "undefined" && (this.s.bRestore = e.bRestore), typeof e.sRestore != "undefined" && (this.s.sRestore = e.sRestore), typeof e.bShowAll != "undefined" && (this.s.bShowAll = e.bShowAll), typeof e.sShowAll != "undefined" && (this.s.sShowAll = e.sShowAll), typeof e.sAlign != "undefined" && (this.s.sAlign = e.sAlign), typeof e.fnStateChange != "undefined" && (this.s.fnStateChange = e.fnStateChange), typeof e.iOverlayFade != "undefined" && (this.s.iOverlayFade = e.iOverlayFade), typeof e.fnLabel != "undefined" && (this.s.fnLabel = e.fnLabel), typeof e.sSize != "undefined" && (this.s.sSize = e.sSize), typeof e.bCssPosition != "undefined" && (this.s.bCssPosition = e.bCssPosition)
    }, _fnDrawCallback:function () {
        var t = this.s.dt.aoColumns;
        for (var n = 0, r = t.length; n < r; n++)this.dom.buttons[n] !== null && (t[n].bVisible ? e("input", this.dom.buttons[n]).attr("checked", "checked") : e("input", this.dom.buttons[n]).removeAttr("checked"))
    }, _fnAddButtons:function () {
        var e, t = "," + this.s.aiExclude.join(",") + ",";
        for (var n = 0, r = this.s.dt.aoColumns.length; n < r; n++)t.indexOf("," + n + ",") == -1 ? (e = this._fnDomColumnButton(n), this.dom.buttons.push(e), this.dom.collection.appendChild(e)) : this.dom.buttons.push(null);
        this.s.bRestore && (e = this._fnDomRestoreButton(), e.className += " ColVis_Restore", this.dom.buttons.push(e), this.dom.collection.appendChild(e)), this.s.bShowAll && (e = this._fnDomShowAllButton(), e.className += " ColVis_ShowAll", this.dom.buttons.push(e), this.dom.collection.appendChild(e))
    }, _fnDomRestoreButton:function () {
        var t = this, n = document.createElement("button"), r = document.createElement("span");
        return n.className = this.s.dt.bJUI ? "ColVis_Button TableTools_Button ui-button ui-state-default" : "ColVis_Button TableTools_Button", n.appendChild(r), e(r).html('<span class="ColVis_title">' + this.s.sRestore + "</span>"), e(n).click(function (e) {
            for (var n = 0, r = t.s.abOriginal.length; n < r; n++)t.s.dt.oInstance.fnSetColumnVis(n, t.s.abOriginal[n], !1);
            t._fnAdjustOpenRows(), t.s.dt.oInstance.fnAdjustColumnSizing(!1), t.s.dt.oInstance.fnDraw(!1)
        }), n
    }, _fnDomShowAllButton:function () {
        var t = this, n = document.createElement("button"), r = document.createElement("span");
        return n.className = this.s.dt.bJUI ? "ColVis_Button TableTools_Button ui-button ui-state-default" : "ColVis_Button TableTools_Button", n.appendChild(r), e(r).html('<span class="ColVis_title">' + this.s.sShowAll + "</span>"), e(n).click(function (e) {
            for (var n = 0, r = t.s.abOriginal.length; n < r; n++)t.s.aiExclude.indexOf(n) === -1 && t.s.dt.oInstance.fnSetColumnVis(n, !0, !1);
            t._fnAdjustOpenRows(), t.s.dt.oInstance.fnAdjustColumnSizing(!1), t.s.dt.oInstance.fnDraw(!1)
        }), n
    }, _fnDomColumnButton:function (t) {
        var n = this, r = this.s.dt.aoColumns[t], i = document.createElement("button"), s = document.createElement("span"), o = this.s.dt;
        i.className = o.bJUI ? "ColVis_Button TableTools_Button ui-button ui-state-default" : "ColVis_Button TableTools_Button", i.appendChild(s);
        var u = this.s.fnLabel === null ? r.sTitle : this.s.fnLabel(t, r.sTitle, r.nTh);
        return e(s).html('<span class="ColVis_radio"><input type="checkbox"/></span><span class="ColVis_title">' + u + "</span>"), e(i).click(function (r) {
            var i = !e("input", this).is(":checked");
            r.target.nodeName.toLowerCase() == "input" && (i = e("input", this).is(":checked"));
            var s = e.fn.dataTableExt.iApiIndex;
            e.fn.dataTableExt.iApiIndex = n._fnDataTablesApiIndex.call(n), !o.oFeatures.bServerSide || o.oScroll.sX === "" && o.oScroll.sY === "" ? n.s.dt.oInstance.fnSetColumnVis(t, i) : (n.s.dt.oInstance.fnSetColumnVis(t, i, !1), n.s.dt.oInstance.fnAdjustColumnSizing(!1), n.s.dt.oInstance.oApi._fnScrollDraw(n.s.dt), n._fnDrawCallback()), e.fn.dataTableExt.iApiIndex = s, n.s.fnStateChange !== null && n.s.fnStateChange.call(n, t, i)
        }), i
    }, _fnDataTablesApiIndex:function () {
        for (var e = 0, t = this.s.dt.oInstance.length; e < t; e++)if (this.s.dt.oInstance[e] == this.s.dt.nTable)return e;
        return 0
    }, _fnDomBaseButton:function (t) {
        var n = this, r = document.createElement("button"), i = document.createElement("span"), s = this.s.activate == "mouseover" ? "mouseover" : "click";
        return r.className = this.s.dt.bJUI ? "ColVis_Button TableTools_Button ui-button ui-state-default" : "ColVis_Button TableTools_Button", r.appendChild(i), i.innerHTML = t, e(r).bind(s, function (e) {
            n._fnCollectionShow(), e.preventDefault()
        }), r
    }, _fnDomCollection:function () {
        var t = this, n = document.createElement("div");
        return n.style.display = "none", n.className = this.s.dt.bJUI ? "ColVis_collection TableTools_collection ui-buttonset ui-buttonset-multi" : "ColVis_collection TableTools_collection", this.s.bCssPosition || (n.style.position = "absolute"), e(n).css("opacity", 0), n
    }, _fnDomCatcher:function () {
        var t = this, n = document.createElement("div");
        return n.className = "ColVis_catcher TableTools_catcher", e(n).click(function () {
            t._fnCollectionHide.call(t, null, null)
        }), n
    }, _fnDomBackground:function () {
        var t = this, n = document.createElement("div");
        return n.style.position = "absolute", n.style.left = "0px", n.style.top = "0px", n.className = "ColVis_collectionBackground TableTools_collectionBackground", e(n).css("opacity", 0), e(n).click(function () {
            t._fnCollectionHide.call(t, null, null)
        }), this.s.activate == "mouseover" && e(n).mouseover(function () {
            t.s.overcollection = !1, t._fnCollectionHide.call(t, null, null)
        }), n
    }, _fnCollectionShow:function () {
        var t = this, n, r, i = e(this.dom.button).offset(), s = this.dom.collection, o = this.dom.background, u = parseInt(i.left, 10), a = parseInt(i.top + e(this.dom.button).outerHeight(), 10);
        this.s.bCssPosition || (s.style.top = a + "px", s.style.left = u + "px"), s.style.display = "block", e(s).css("opacity", 0);
        var f = e(window).height(), l = e(document).height(), c = e(window).width(), h = e(document).width();
        o.style.height = (f > l ? f : l) + "px", o.style.width = (c < h ? c : h) + "px";
        var p = this.dom.catcher.style;
        p.height = e(this.dom.button).outerHeight() + "px", p.width = e(this.dom.button).outerWidth() + "px", p.top = i.top + "px", p.left = u + "px", document.body.appendChild(o), document.body.appendChild(s), document.body.appendChild(this.dom.catcher);
        if (this.s.sSize == "auto") {
            var d = [];
            this.dom.collection.style.width = "auto";
            for (n = 0, r = this.dom.buttons.length; n < r; n++)this.dom.buttons[n] !== null && (this.dom.buttons[n].style.width = "auto", d.push(e(this.dom.buttons[n]).outerWidth()));
            iMax = Math.max.apply(window, d);
            for (n = 0, r = this.dom.buttons.length; n < r; n++)this.dom.buttons[n] !== null && (this.dom.buttons[n].style.width = iMax + "px");
            this.dom.collection.style.width = iMax + "px"
        }
        if (!this.s.bCssPosition) {
            s.style.left = this.s.sAlign == "left" ? u + "px" : u - e(s).outerWidth() + e(this.dom.button).outerWidth() + "px";
            var v = e(s).outerWidth(), m = e(s).outerHeight();
            u + v > h && (s.style.left = h - v + "px")
        }
        setTimeout(function () {
            e(s).animate({opacity:1}, t.s.iOverlayFade), e(o).animate({opacity:.1}, t.s.iOverlayFade, "linear", function () {
                jQuery.browser.msie && jQuery.browser.version == "6.0" && t._fnDrawCallback()
            })
        }, 10), this.s.hidden = !1
    }, _fnCollectionHide:function () {
        var t = this;
        !this.s.hidden && this.dom.collection !== null && (this.s.hidden = !0, e(this.dom.collection).animate({opacity:0}, t.s.iOverlayFade, function (e) {
            this.style.display = "none"
        }), e(this.dom.background).animate({opacity:0}, t.s.iOverlayFade, function (e) {
            document.body.removeChild(t.dom.background), document.body.removeChild(t.dom.catcher)
        }))
    }, _fnAdjustOpenRows:function () {
        var e = this.s.dt.aoOpenRows, t = this.s.dt.oApi._fnVisbleColumns(this.s.dt);
        for (var n = 0, r = e.length; n < r; n++)e[n].nTr.getElementsByTagName("td")[0].colSpan = t
    }}, ColVis.fnRebuild = function (e) {
        var t = null;
        typeof e != "undefined" && (t = e.fnSettings().nTable);
        for (var n = 0, r = ColVis.aInstances.length; n < r; n++)(typeof e == "undefined" || t == ColVis.aInstances[n].s.dt.nTable) && ColVis.aInstances[n].fnRebuild()
    }, ColVis.aInstances = [], ColVis.prototype.CLASS = "ColVis", ColVis.VERSION = "1.0.8", ColVis.prototype.VERSION = ColVis.VERSION, typeof e.fn.dataTable == "function" && typeof e.fn.dataTableExt.fnVersionCheck == "function" && e.fn.dataTableExt.fnVersionCheck("1.7.0") ? e.fn.dataTableExt.aoFeatures.push({fnInit:function (e) {
        var t = typeof e.oInit.oColVis == "undefined" ? {} : e.oInit.oColVis, n = new ColVis(e, t);
        return n.dom.wrapper
    }, cFeature:"C", sFeature:"ColVis"}) : alert("Warning: ColVis requires DataTables 1.7 or greater - www.datatables.net/download")
})(jQuery);