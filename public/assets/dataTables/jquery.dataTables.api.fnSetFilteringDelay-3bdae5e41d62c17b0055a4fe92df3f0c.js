jQuery.fn.dataTableExt.oApi.fnSetFilteringDelay = function (e, t) {
    var n = this;
    return t === undefined && (t = 250), this.each(function (e) {
        $.fn.dataTableExt.iApiIndex = e;
        var r = this, i = null, s = null, o = $("input", n.fnSettings().aanFeatures.f);
        return o.unbind("keyup").bind("keyup", function () {
            var u = r;
            if (s === null || s != o.val())window.clearTimeout(i), s = o.val(), i = window.setTimeout(function () {
                $.fn.dataTableExt.iApiIndex = e, n.fnFilter(o.val())
            }, t)
        }), this
    }), this
};