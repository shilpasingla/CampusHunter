(function (e) {
    e.fn.dataTableExt.oApi.fnGetColumnData = function (e, t, n, r, i) {
        if (typeof t == "undefined")return new Array;
        typeof n == "undefined" && (n = !0), typeof r == "undefined" && (r = !0), typeof i == "undefined" && (i = !0);
        var s;
        r == 1 ? s = e.aiDisplay : s = e.aiDisplayMaster;
        var o = new Array;
        for (var u = 0, a = s.length; u < a; u++) {
            iRow = s[u];
            var f = this.fnGetData(iRow, t);
            if (i == 1 && f.length == 0)continue;
            if (n == 1 && jQuery.inArray(f, o) > -1)continue;
            o.push(f)
        }
        return o
    }
})(jQuery);