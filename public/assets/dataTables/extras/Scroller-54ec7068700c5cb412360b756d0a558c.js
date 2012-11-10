/**
 * @summary     Scroller
 * @description Virtual rendering for DataTables
 * @file        Scroller.js
 * @version     1.1.0
 * @author      Allan Jardine (www.sprymedia.co.uk)
 * @license     GPL v2 or BSD 3 point style
 * @contact     www.sprymedia.co.uk/contact
 *
 * @copyright Copyright 2011-2012 Allan Jardine, all rights reserved.
 *
 * This source file is free software, under either the GPL v2 license or a
 * BSD style license, available at:
 *   http://datatables.net/license_gpl2
 *   http://datatables.net/license_bsd
 */
(function (e, t, n) {
    var r = function (t, i) {
        if (!this instanceof r) {
            alert("Scroller warning: Scroller must be initialised with the 'new' keyword.");
            return
        }
        typeof i == "undefined" && (i = {}), this.s = {dt:t, tableTop:0, tableBottom:0, redrawTop:0, redrawBottom:0, rowHeight:null, autoHeight:!0, viewportHeight:0, viewportRows:0, stateTO:null, drawTO:null}, this.s = e.extend(this.s, r.oDefaults, i), this.dom = {force:n.createElement("div"), scroller:null, table:null}, this.s.dt.oScroller = this, this._fnConstruct()
    };
    r.prototype = {fnRowToPixels:function (e) {
        return e * this.s.rowHeight
    }, fnPixelsToRow:function (e) {
        return parseInt(e / this.s.rowHeight, 10)
    }, fnScrollToRow:function (t, n) {
        var r = this.fnRowToPixels(t);
        typeof n == "undefined" || n ? e(this.dom.scroller).animate({scrollTop:r}) : e(this.dom.scroller).scrollTop(r)
    }, fnMeasure:function (t) {
        this.s.autoHeight && this._fnCalcRowHeight(), this.s.viewportHeight = e(this.dom.scroller).height(), this.s.viewportRows = parseInt(this.s.viewportHeight / this.s.rowHeight, 10) + 1, this.s.dt._iDisplayLength = this.s.viewportRows * this.s.displayBuffer, this.s.trace && console.log("Row height: " + this.s.rowHeight + " " + "Viewport height: " + this.s.viewportHeight + " " + "Viewport rows: " + this.s.viewportRows + " " + "Display rows: " + this.s.dt._iDisplayLength), (typeof t == "undefined" || t) && this.s.dt.oInstance.fnDraw()
    }, _fnConstruct:function () {
        var t = this;
        this.dom.force.style.position = "absolute", this.dom.force.style.top = "0px", this.dom.force.style.left = "0px", this.dom.force.style.width = "1px", this.dom.scroller = e("div." + this.s.dt.oClasses.sScrollBody, this.s.dt.nTableWrapper)[0], this.dom.scroller.appendChild(this.dom.force), this.dom.scroller.style.position = "relative", this.dom.table = e(">table", this.dom.scroller)[0], this.dom.table.style.position = "absolute", this.dom.table.style.top = "0px", this.dom.table.style.left = "0px", e(this.s.dt.nTableWrapper).addClass("DTS"), this.s.loadingIndicator && e(this.dom.scroller.parentNode).css("position", "relative").append('<div class="DTS_Loading">' + this.s.dt.oLanguage.sLoadingRecords + "</div>"), this.s.rowHeight && this.s.rowHeight != "auto" && (this.s.autoHeight = !1), this.fnMeasure(!1), e(this.dom.scroller).scroll(function () {
            t._fnScroll.call(t)
        }), e(this.dom.scroller).bind("touchstart", function () {
            t._fnScroll.call(t)
        }), this.s.dt.aoDrawCallback.push({fn:function () {
            t.s.dt.bInitialised && t._fnDrawCallback.call(t)
        }, sName:"Scroller"}), this.s.dt.oApi._fnCallbackReg(this.s.dt, "aoStateSaveParams", function (e, n) {
            n.iScroller = t.dom.scroller.scrollTop
        }, "Scroller_State")
    }, _fnScroll:function () {
        var t = this, n = this.dom.scroller.scrollTop, r;
        if (this.s.dt.bFiltered || this.s.dt.bSorted)return;
        this.s.trace && console.log("Scroll: " + n + "px - boundaries: " + this.s.redrawTop + " / " + this.s.redrawBottom + ". " + " Showing rows " + this.fnPixelsToRow(n) + " to " + this.fnPixelsToRow(n + e(this.dom.scroller).height()) + " in the viewport, with rows " + this.s.dt._iDisplayStart + " to " + this.s.dt._iDisplayEnd + " rendered by the DataTable"), this._fnInfo(), clearTimeout(this.s.stateTO), this.s.stateTO = setTimeout(function () {
            t.s.dt.oApi._fnSaveState(t.s.dt)
        }, 250);
        if (n < this.s.redrawTop || n > this.s.redrawBottom) {
            var i = (this.s.displayBuffer - 1) / 2 * this.s.viewportRows;
            r = parseInt(n / this.s.rowHeight, 10) - i, r < 0 ? r = 0 : r + this.s.dt._iDisplayLength > this.s.dt.fnRecordsDisplay() ? (r = this.s.dt.fnRecordsDisplay() - this.s.dt._iDisplayLength, r < 0 && (r = 0)) : r % 2 !== 0 && r++, r != this.s.dt._iDisplayStart && (this.s.tableTop = e(this.s.dt.nTable).offset().top, this.s.tableBottom = e(this.s.dt.nTable).height() + this.s.tableTop, this.s.dt.oFeatures.bServerSide ? (clearTimeout(this.s.drawTO), this.s.drawTO = setTimeout(function () {
                t.s.dt._iDisplayStart = r, t.s.dt.oApi._fnCalculateEnd(t.s.dt), t.s.dt.oApi._fnDraw(t.s.dt)
            }, this.s.serverWait)) : (this.s.dt._iDisplayStart = r, this.s.dt.oApi._fnCalculateEnd(this.s.dt), this.s.dt.oApi._fnDraw(this.s.dt)), this.s.trace && console.log("Scroll forcing redraw - top DT render row: " + r))
        }
    }, _fnDrawCallback:function () {
        var t = this, n = this.dom.scroller.scrollTop, r = n + this.s.viewportHeight;
        this.dom.force.style.height = this.s.rowHeight * this.s.dt.fnRecordsDisplay() + "px";
        var i = this.s.rowHeight * this.s.dt._iDisplayStart;
        this.s.dt._iDisplayStart === 0 ? i = 0 : this.s.dt._iDisplayStart === this.s.dt.fnRecordsDisplay() - this.s.dt._iDisplayLength && (i = this.s.rowHeight * this.s.dt._iDisplayStart), this.dom.table.style.top = i + "px", this.s.tableTop = i, this.s.tableBottom = e(this.s.dt.nTable).height() + this.s.tableTop, this.s.redrawTop = n - (n - this.s.tableTop) * this.s.boundaryScale, this.s.redrawBottom = n + (this.s.tableBottom - r) * this.s.boundaryScale, this.s.trace && console.log("Table redraw. Table top: " + i + "px " + "Table bottom: " + this.s.tableBottom + " " + "Scroll boundary top: " + this.s.redrawTop + " " + "Scroll boundary bottom: " + this.s.redrawBottom + " " + "Rows drawn: " + this.s.dt._iDisplayLength), setTimeout(function () {
            t._fnInfo.call(t)
        }, 0), this.s.dt.oFeatures.bStateSave && this.s.dt.oLoadedState !== null && typeof this.s.dt.oLoadedState.iScroller != "undefined" && (this.s.dt.sAjaxSource !== null && this.s.dt.iDraw == 2 || this.s.dt.sAjaxSource === null && this.s.dt.iDraw == 1) && setTimeout(function () {
            e(t.dom.scroller).scrollTop(t.s.dt.oLoadedState.iScroller), t.s.redrawTop = t.s.dt.oLoadedState.iScroller - t.s.viewportHeight / 2
        }, 0)
    }, _fnCalcRowHeight:function () {
        var t = this.s.dt.nTable.cloneNode(!1), r = e('<div class="' + this.s.dt.oClasses.sWrapper + ' DTS">' + '<div class="' + this.s.dt.oClasses.sScrollWrapper + '">' + '<div class="' + this.s.dt.oClasses.sScrollBody + '"></div>' + "</div>" + "</div>")[0];
        e(t).append("<tbody><tr><td>&nbsp;</td></tr></tbody>"), e("div." + this.s.dt.oClasses.sScrollBody, r).append(t), n.body.appendChild(r), this.s.rowHeight = e("tbody tr", t).outerHeight(), n.body.removeChild(r)
    }, _fnInfo:function () {
        if (!this.s.dt.oFeatures.bInfo)return;
        var t = this.s.dt, n = this.dom.scroller.scrollTop, r = this.fnPixelsToRow(n) + 1, i = t.fnRecordsTotal(), s = t.fnRecordsDisplay(), o = this.fnPixelsToRow(n + e(this.dom.scroller).height()), u = s < o ? s : o, a = t.fnFormatNumber(r), f = t.fnFormatNumber(u), l = t.fnFormatNumber(i), c = t.fnFormatNumber(s), h;
        t.fnRecordsDisplay() === 0 && t.fnRecordsDisplay() == t.fnRecordsTotal() ? h = t.oLanguage.sInfoEmpty + t.oLanguage.sInfoPostFix : t.fnRecordsDisplay() === 0 ? h = t.oLanguage.sInfoEmpty + " " + t.oLanguage.sInfoFiltered.replace("_MAX_", l) + t.oLanguage.sInfoPostFix : t.fnRecordsDisplay() == t.fnRecordsTotal() ? h = t.oLanguage.sInfo.replace("_START_", a).replace("_END_", f).replace("_TOTAL_", c) + t.oLanguage.sInfoPostFix : h = t.oLanguage.sInfo.replace("_START_", a).replace("_END_", f).replace("_TOTAL_", c) + " " + t.oLanguage.sInfoFiltered.replace("_MAX_", t.fnFormatNumber(t.fnRecordsTotal())) + t.oLanguage.sInfoPostFix;
        var p = t.aanFeatures.i;
        if (typeof p != "undefined")for (var d = 0, v = p.length; d < v; d++)e(p[d]).html(h)
    }}, r.oDefaults = {trace:!1, rowHeight:"auto", serverWait:200, displayBuffer:9, boundaryScale:.5, loadingIndicator:!1}, r.prototype.CLASS = "Scroller", r.VERSION = "1.1.0", r.prototype.VERSION = r.VERSION, typeof e.fn.dataTable == "function" && typeof e.fn.dataTableExt.fnVersionCheck == "function" && e.fn.dataTableExt.fnVersionCheck("1.9.0") ? e.fn.dataTableExt.aoFeatures.push({fnInit:function (e) {
        var t = typeof e.oInit.oScroller == "undefined" ? {} : e.oInit.oScroller, n = new r(e, t);
        return n.dom.wrapper
    }, cFeature:"S", sFeature:"Scroller"}) : alert("Warning: Scroller requires DataTables 1.9.0 or greater - www.datatables.net/download"), e.fn.dataTable.Scroller = r
})(jQuery, window, document);