jQuery.fn.dataTableExt.oApi.fnFilterOnReturn = function (e) {
    var t = this;
    return this.each(function (e) {
        $.fn.dataTableExt.iApiIndex = e;
        var n = this, r = $("input", t.fnSettings().aanFeatures.f);
        return r.unbind("keyup").bind("keypress", function (n) {
            n.which == 13 && ($.fn.dataTableExt.iApiIndex = e, t.fnFilter(r.val()))
        }), this
    }), this
};