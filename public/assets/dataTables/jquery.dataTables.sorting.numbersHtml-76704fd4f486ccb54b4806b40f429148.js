jQuery.fn.dataTableExt.oSort["num-html-asc"] = function (e, t) {
    var n = e.replace(/<.*?>/g, ""), r = t.replace(/<.*?>/g, "");
    return n = parseFloat(n), r = parseFloat(r), n < r ? -1 : n > r ? 1 : 0
}, jQuery.fn.dataTableExt.oSort["num-html-desc"] = function (e, t) {
    var n = e.replace(/<.*?>/g, ""), r = t.replace(/<.*?>/g, "");
    return n = parseFloat(n), r = parseFloat(r), n < r ? 1 : n > r ? -1 : 0
};