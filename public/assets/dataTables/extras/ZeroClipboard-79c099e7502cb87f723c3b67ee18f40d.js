// Simple Set Clipboard System
// Author: Joseph Huckaby
var ZeroClipboard_TableTools = {version:"1.0.4-TableTools2", clients:{}, moviePath:"", nextId:1, $:function (e) {
    return typeof e == "string" && (e = document.getElementById(e)), e.addClass || (e.hide = function () {
        this.style.display = "none"
    }, e.show = function () {
        this.style.display = ""
    }, e.addClass = function (e) {
        this.removeClass(e), this.className += " " + e
    }, e.removeClass = function (e) {
        this.className = this.className.replace(new RegExp("\\s*" + e + "\\s*"), " ").replace(/^\s+/, "").replace(/\s+$/, "")
    }, e.hasClass = function (e) {
        return!!this.className.match(new RegExp("\\s*" + e + "\\s*"))
    }), e
}, setMoviePath:function (e) {
    this.moviePath = e
}, dispatch:function (e, t, n) {
    var r = this.clients[e];
    r && r.receiveEvent(t, n)
}, register:function (e, t) {
    this.clients[e] = t
}, getDOMObjectPosition:function (e) {
    var t = {left:0, top:0, width:e.width ? e.width : e.offsetWidth, height:e.height ? e.height : e.offsetHeight};
    e.style.width != "" && (t.width = e.style.width.replace("px", "")), e.style.height != "" && (t.height = e.style.height.replace("px", ""));
    while (e)t.left += e.offsetLeft, t.top += e.offsetTop, e = e.offsetParent;
    return t
}, Client:function (e) {
    this.handlers = {}, this.id = ZeroClipboard_TableTools.nextId++, this.movieId = "ZeroClipboard_TableToolsMovie_" + this.id, ZeroClipboard_TableTools.register(this.id, this), e && this.glue(e)
}};
ZeroClipboard_TableTools.Client.prototype = {id:0, ready:!1, movie:null, clipText:"", fileName:"", action:"copy", handCursorEnabled:!0, cssEffects:!0, handlers:null, sized:!1, glue:function (e, t) {
    this.domElement = ZeroClipboard_TableTools.$(e);
    var n = 99;
    this.domElement.style.zIndex && (n = parseInt(this.domElement.style.zIndex) + 1);
    var r = ZeroClipboard_TableTools.getDOMObjectPosition(this.domElement);
    this.div = document.createElement("div");
    var i = this.div.style;
    i.position = "absolute", i.left = "0px", i.top = "0px", i.width = r.width + "px", i.height = r.height + "px", i.zIndex = n, typeof t != "undefined" && t != "" && (this.div.title = t), r.width != 0 && r.height != 0 && (this.sized = !0), this.domElement && (this.domElement.appendChild(this.div), this.div.innerHTML = this.getHTML(r.width, r.height))
}, positionElement:function () {
    var e = ZeroClipboard_TableTools.getDOMObjectPosition(this.domElement), t = this.div.style;
    t.position = "absolute", t.width = e.width + "px", t.height = e.height + "px";
    if (e.width == 0 || e.height == 0)return;
    this.sized = !0;
    var n = this.div.childNodes[0];
    n.width = e.width, n.height = e.height
}, getHTML:function (e, t) {
    var n = "", r = "id=" + this.id + "&width=" + e + "&height=" + t;
    if (navigator.userAgent.match(/MSIE/)) {
        var i = location.href.match(/^https/i) ? "https://" : "http://";
        n += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="' + i + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="' + e + '" height="' + t + '" id="' + this.movieId + '" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="' + ZeroClipboard_TableTools.moviePath + '" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="' + r + '"/><param name="wmode" value="transparent"/></object>'
    } else n += '<embed id="' + this.movieId + '" src="' + ZeroClipboard_TableTools.moviePath + '" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="' + e + '" height="' + t + '" name="' + this.movieId + '" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' + r + '" wmode="transparent" />';
    return n
}, hide:function () {
    this.div && (this.div.style.left = "-2000px")
}, show:function () {
    this.reposition()
}, destroy:function () {
    if (this.domElement && this.div) {
        this.hide(), this.div.innerHTML = "";
        var e = document.getElementsByTagName("body")[0];
        try {
            e.removeChild(this.div)
        } catch (t) {
        }
        this.domElement = null, this.div = null
    }
}, reposition:function (e) {
    e && (this.domElement = ZeroClipboard_TableTools.$(e), this.domElement || this.hide());
    if (this.domElement && this.div) {
        var t = ZeroClipboard_TableTools.getDOMObjectPosition(this.domElement), n = this.div.style;
        n.left = "" + t.left + "px", n.top = "" + t.top + "px"
    }
}, clearText:function () {
    this.clipText = "", this.ready && this.movie.clearText()
}, appendText:function (e) {
    this.clipText += e, this.ready && this.movie.appendText(e)
}, setText:function (e) {
    this.clipText = e, this.ready && this.movie.setText(e)
}, setCharSet:function (e) {
    this.charSet = e, this.ready && this.movie.setCharSet(e)
}, setBomInc:function (e) {
    this.incBom = e, this.ready && this.movie.setBomInc(e)
}, setFileName:function (e) {
    this.fileName = e, this.ready && this.movie.setFileName(e)
}, setAction:function (e) {
    this.action = e, this.ready && this.movie.setAction(e)
}, addEventListener:function (e, t) {
    e = e.toString().toLowerCase().replace(/^on/, ""), this.handlers[e] || (this.handlers[e] = []), this.handlers[e].push(t)
}, setHandCursor:function (e) {
    this.handCursorEnabled = e, this.ready && this.movie.setHandCursor(e)
}, setCSSEffects:function (e) {
    this.cssEffects = !!e
}, receiveEvent:function (e, t) {
    e = e.toString().toLowerCase().replace(/^on/, "");
    switch (e) {
        case"load":
            this.movie = document.getElementById(this.movieId);
            if (!this.movie) {
                var n = this;
                setTimeout(function () {
                    n.receiveEvent("load", null)
                }, 1);
                return
            }
            if (!this.ready && navigator.userAgent.match(/Firefox/) && navigator.userAgent.match(/Windows/)) {
                var n = this;
                setTimeout(function () {
                    n.receiveEvent("load", null)
                }, 100), this.ready = !0;
                return
            }
            this.ready = !0, this.movie.clearText(), this.movie.appendText(this.clipText), this.movie.setFileName(this.fileName), this.movie.setAction(this.action), this.movie.setCharSet(this.charSet), this.movie.setBomInc(this.incBom), this.movie.setHandCursor(this.handCursorEnabled);
            break;
        case"mouseover":
            this.domElement && this.cssEffects && this.recoverActive && this.domElement.addClass("active");
            break;
        case"mouseout":
            this.domElement && this.cssEffects && (this.recoverActive = !1, this.domElement.hasClass("active") && (this.domElement.removeClass("active"), this.recoverActive = !0));
            break;
        case"mousedown":
            this.domElement && this.cssEffects && this.domElement.addClass("active");
            break;
        case"mouseup":
            this.domElement && this.cssEffects && (this.domElement.removeClass("active"), this.recoverActive = !1)
    }
    if (this.handlers[e])for (var r = 0, i = this.handlers[e].length; r < i; r++) {
        var s = this.handlers[e][r];
        typeof s == "function" ? s(this, t) : typeof s == "object" && s.length == 2 ? s[0][s[1]](this, t) : typeof s == "string" && window[s](this, t)
    }
}};