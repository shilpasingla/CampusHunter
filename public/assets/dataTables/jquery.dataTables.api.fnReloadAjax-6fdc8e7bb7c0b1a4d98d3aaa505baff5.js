$.fn.dataTableExt.oApi.fnReloadAjax = function (e, t, n, r) {
    typeof t != "undefined" && t != null && (e.sAjaxSource = t), this.oApi._fnProcessingDisplay(e, !0);
    var i = this, s = e._iDisplayStart, o = [];
    this.oApi._fnServerParams(e, o), e.fnServerData(e.sAjaxSource, o, function (t) {
        i.oApi._fnClearTable(e);
        var o = e.sAjaxDataProp !== "" ? i.oApi._fnGetObjectDataFn(e.sAjaxDataProp)(t) : t;
        for (var u = 0; u < o.length; u++)i.oApi._fnAddData(e, o[u]);
        e.aiDisplay = e.aiDisplayMaster.slice(), i.fnDraw(), typeof r != "undefined" && r === !0 && (e._iDisplayStart = s, i.fnDraw(!1)), i.oApi._fnProcessingDisplay(e, !1), typeof n == "function" && n != null && n(e)
    }, e)
};