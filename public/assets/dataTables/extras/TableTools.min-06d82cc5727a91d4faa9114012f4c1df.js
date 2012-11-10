// Simple Set Clipboard System
// Author: Joseph Huckaby
var ZeroClipboard_TableTools = {version:"1.0.4-TableTools2", clients:{}, moviePath:"", nextId:1, $:function (e) {
    return"string" == typeof e && (e = document.getElementById(e)), e.addClass || (e.hide = function () {
        this.style.display = "none"
    }, e.show = function () {
        this.style.display = ""
    }, e.addClass = function (e) {
        this.removeClass(e), this.className += " " + e
    }, e.removeClass = function (e) {
        this.className = this.className.replace(RegExp("\\s*" + e + "\\s*"), " ").replace(/^\s+/, "").replace(/\s+$/, "")
    }, e.hasClass = function (e) {
        return!!this.className.match(RegExp("\\s*" + e + "\\s*"))
    }), e
}, setMoviePath:function (e) {
    this.moviePath = e
}, dispatch:function (e, t, n) {
    (e = this.clients[e]) && e.receiveEvent(t, n)
}, register:function (e, t) {
    this.clients[e] = t
}, getDOMObjectPosition:function (e) {
    var t = {left:0, top:0, width:e.width ? e.width : e.offsetWidth, height:e.height ? e.height : e.offsetHeight};
    "" != e.style.width && (t.width = e.style.width.replace("px", "")), "" != e.style.height && (t.height = e.style.height.replace("px", ""));
    for (; e;)t.left += e.offsetLeft, t.top += e.offsetTop, e = e.offsetParent;
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
    i.position = "absolute", i.left = "0px", i.top = "0px", i.width = r.width + "px", i.height = r.height + "px", i.zIndex = n, "undefined" != typeof t && "" != t && (this.div.title = t), 0 != r.width && 0 != r.height && (this.sized = !0), this.domElement && (this.domElement.appendChild(this.div), this.div.innerHTML = this.getHTML(r.width, r.height))
}, positionElement:function () {
    var e = ZeroClipboard_TableTools.getDOMObjectPosition(this.domElement), t = this.div.style;
    t.position = "absolute", t.width = e.width + "px", t.height = e.height + "px", 0 != e.width && 0 != e.height && (this.sized = !0, t = this.div.childNodes[0], t.width = e.width, t.height = e.height)
}, getHTML:function (e, t) {
    var n = "", r = "id=" + this.id + "&width=" + e + "&height=" + t;
    if (navigator.userAgent.match(/MSIE/))var i = location.href.match(/^https/i) ? "https://" : "http://", n = n + ('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="' + i + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="' + e + '" height="' + t + '" id="' + this.movieId + '" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="' + ZeroClipboard_TableTools.moviePath + '" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="' + r + '"/><param name="wmode" value="transparent"/></object>'); else n += '<embed id="' + this.movieId + '" src="' + ZeroClipboard_TableTools.moviePath + '" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="' + e + '" height="' + t + '" name="' + this.movieId + '" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' + r + '" wmode="transparent" />';
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
        this.div = this.domElement = null
    }
}, reposition:function (e) {
    e && ((this.domElement = ZeroClipboard_TableTools.$(e)) || this.hide());
    if (this.domElement && this.div) {
        var e = ZeroClipboard_TableTools.getDOMObjectPosition(this.domElement), t = this.div.style;
        t.left = "" + e.left + "px", t.top = "" + e.top + "px"
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
                n = this, setTimeout(function () {
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
        "function" == typeof s ? s(this, t) : "object" == typeof s && 2 == s.length ? s[0][s[1]](this, t) : "string" == typeof s && window[s](this, t)
    }
}};
var TableTools;
(function (e, t, n) {
    TableTools = function (t, n) {
        return!this instanceof TableTools && alert("Warning: TableTools must be initialised with the keyword 'new'"), this.s = {that:this, dt:t.fnSettings(), print:{saveStart:-1, saveLength:-1, saveScroll:-1, funcEnd:function () {
        }}, buttonCounter:0, select:{type:"", selected:[], preRowSelect:null, postSelected:null, postDeselected:null, all:!1, selectedClass:""}, custom:{}, swfPath:"", buttonSet:[], master:!1, tags:{}}, this.dom = {container:null, table:null, print:{hidden:[], message:null}, collection:{collection:null, background:null}}, this.classes = e.extend(!0, {}, TableTools.classes), this.s.dt.bJUI && e.extend(!0, this.classes, TableTools.classes_themeroller), this.fnSettings = function () {
            return this.s
        }, "undefined" == typeof n && (n = {}), this._fnConstruct(n), this
    }, TableTools.prototype = {fnGetSelected:function () {
        var e = [], t = this.s.dt.aoData, n, r;
        n = 0;
        for (r = t.length; n < r; n++)t[n]._DTTT_selected && e.push(t[n].nTr);
        return e
    }, fnGetSelectedData:function () {
        var e = [], t = this.s.dt.aoData, n, r;
        n = 0;
        for (r = t.length; n < r; n++)t[n]._DTTT_selected && e.push(this.s.dt.oInstance.fnGetData(n));
        return e
    }, fnIsSelected:function (e) {
        return e = this.s.dt.oInstance.fnGetPosition(e), !0 === this.s.dt.aoData[e]._DTTT_selected ? !0 : !1
    }, fnSelectAll:function (e) {
        var t = this._fnGetMasterSettings();
        this._fnRowSelect(!0 === e ? t.dt.aiDisplay : t.dt.aoData)
    }, fnSelectNone:function (e) {
        var t = this._fnGetMasterSettings();
        this._fnRowDeselect(!0 === e ? t.dt.aiDisplay : t.dt.aoData)
    }, fnSelect:function (e) {
        "single" == this.s.select.type ? (this.fnSelectNone(), this._fnRowSelect(e)) : "multi" == this.s.select.type && this._fnRowSelect(e)
    }, fnDeselect:function (e) {
        this._fnRowDeselect(e)
    }, fnGetTitle:function (e) {
        var t = "";
        return"undefined" != typeof e.sTitle && "" !== e.sTitle ? t = e.sTitle : (e = n.getElementsByTagName("title"), 0 < e.length && (t = e[0].innerHTML)), 4 > "¡".toString().length ? t.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g, "") : t.replace(/[^a-zA-Z0-9_\.,\-_ !\(\)]/g, "")
    }, fnCalcColRatios:function (e) {
        var t = this.s.dt.aoColumns, e = this._fnColumnTargets(e.mColumns), n = [], r = 0, i = 0, s, o;
        s = 0;
        for (o = e.length; s < o; s++)e[s] && (r = t[s].nTh.offsetWidth, i += r, n.push(r));
        s = 0;
        for (o = n.length; s < o; s++)n[s] /= i;
        return n.join("	")
    }, fnGetTableData:function (e) {
        if (this.s.dt)return this._fnGetDataTablesData(e)
    }, fnSetText:function (e, t) {
        this._fnFlashSetText(e, t)
    }, fnResizeButtons:function () {
        for (var e in ZeroClipboard_TableTools.clients)if (e) {
            var t = ZeroClipboard_TableTools.clients[e];
            "undefined" != typeof t.domElement && t.domElement.parentNode && t.positionElement()
        }
    }, fnResizeRequired:function () {
        for (var e in ZeroClipboard_TableTools.clients)if (e) {
            var t = ZeroClipboard_TableTools.clients[e];
            if ("undefined" != typeof t.domElement && t.domElement.parentNode == this.dom.container && !1 === t.sized)return!0
        }
        return!1
    }, fnPrint:function (e, t) {
        void 0 === t && (t = {}), void 0 === e || e ? this._fnPrintStart(t) : this._fnPrintEnd()
    }, fnInfo:function (t, r) {
        var i = n.createElement("div");
        i.className = this.classes.print.info, i.innerHTML = t, n.body.appendChild(i), setTimeout(function () {
            e(i).fadeOut("normal", function () {
                n.body.removeChild(i)
            })
        }, r)
    }, _fnConstruct:function (e) {
        var t = this;
        this._fnCustomiseSettings(e), this.dom.container = n.createElement(this.s.tags.container), this.dom.container.className = this.classes.container, "none" != this.s.select.type && this._fnRowSelectConfig(), this._fnButtonDefinations(this.s.buttonSet, this.dom.container), this.s.dt.aoDestroyCallback.push({sName:"TableTools", fn:function () {
            t.dom.container.innerHTML = ""
        }})
    }, _fnCustomiseSettings:function (t) {
        "undefined" == typeof this.s.dt._TableToolsInit && (this.s.master = !0, this.s.dt._TableToolsInit = !0), this.dom.table = this.s.dt.nTable, this.s.custom = e.extend({}, TableTools.DEFAULTS, t), this.s.swfPath = this.s.custom.sSwfPath, "undefined" != typeof ZeroClipboard_TableTools && (ZeroClipboard_TableTools.moviePath = this.s.swfPath), this.s.select.type = this.s.custom.sRowSelect, this.s.select.preRowSelect = this.s.custom.fnPreRowSelect, this.s.select.postSelected = this.s.custom.fnRowSelected, this.s.select.postDeselected = this.s.custom.fnRowDeselected, this.s.custom.sSelectedClass && (this.classes.select.row = this.s.custom.sSelectedClass), this.s.tags = this.s.custom.oTags, this.s.buttonSet = this.s.custom.aButtons
    }, _fnButtonDefinations:function (t, n) {
        for (var r, i = 0, s = t.length; i < s; i++) {
            if ("string" == typeof t[i]) {
                if ("undefined" == typeof TableTools.BUTTONS[t[i]]) {
                    alert("TableTools: Warning - unknown button type: " + t[i]);
                    continue
                }
                r = e.extend({}, TableTools.BUTTONS[t[i]], !0)
            } else {
                if ("undefined" == typeof TableTools.BUTTONS[t[i].sExtends]) {
                    alert("TableTools: Warning - unknown button type: " + t[i].sExtends);
                    continue
                }
                r = e.extend({}, TableTools.BUTTONS[t[i].sExtends], !0), r = e.extend(r, t[i], !0)
            }
            n.appendChild(this._fnCreateButton(r, e(n).hasClass(this.classes.collection.container)))
        }
    }, _fnCreateButton:function (e, t) {
        var n = this._fnButtonBase(e, t);
        return e.sAction.match(/flash/) ? this._fnFlashConfig(n, e) : "text" == e.sAction ? this._fnTextConfig(n, e) : "div" == e.sAction ? this._fnTextConfig(n, e) : "collection" == e.sAction && (this._fnTextConfig(n, e), this._fnCollectionConfig(n, e)), n
    }, _fnButtonBase:function (e, t) {
        var r, i, s;
        t ? (r = "default" !== e.sTag ? e.sTag : this.s.tags.collection.button, i = "default" !== e.sLinerTag ? e.sLiner : this.s.tags.collection.liner, s = this.classes.collection.buttons.normal) : (r = "default" !== e.sTag ? e.sTag : this.s.tags.button, i = "default" !== e.sLinerTag ? e.sLiner : this.s.tags.liner, s = this.classes.buttons.normal), r = n.createElement(r), i = n.createElement(i);
        var o = this._fnGetMasterSettings();
        return r.className = s + " " + e.sButtonClass, r.setAttribute("id", "ToolTables_" + this.s.dt.sInstance + "_" + o.buttonCounter), r.appendChild(i), i.innerHTML = e.sButtonText, o.buttonCounter++, r
    }, _fnGetMasterSettings:function () {
        if (this.s.master)return this.s;
        for (var e = TableTools._aInstances, t = 0, n = e.length; t < n; t++)if (this.dom.table == e[t].s.dt.nTable)return e[t].s
    }, _fnCollectionConfig:function (e, t) {
        var r = n.createElement(this.s.tags.collection.container);
        r.style.display = "none", r.className = this.classes.collection.container, t._collection = r, n.body.appendChild(r), this._fnButtonDefinations(t.aButtons, r)
    }, _fnCollectionShow:function (r, i) {
        var s = this, o = e(r).offset(), u = i._collection, a = o.left, o = o.top + e(r).outerHeight(), l = e(t).height(), c = e(n).height(), h = e(t).width(), p = e(n).width();
        u.style.position = "absolute", u.style.left = a + "px", u.style.top = o + "px", u.style.display = "block", e(u).css("opacity", 0);
        var d = n.createElement("div");
        d.style.position = "absolute", d.style.left = "0px", d.style.top = "0px", d.style.height = (l > c ? l : c) + "px", d.style.width = (h > p ? h : p) + "px", d.className = this.classes.collection.background, e(d).css("opacity", 0), n.body.appendChild(d), n.body.appendChild(u), l = e(u).outerWidth(), h = e(u).outerHeight(), a + l > p && (u.style.left = p - l + "px"), o + h > c && (u.style.top = o - h - e(r).outerHeight() + "px"), this.dom.collection.collection = u, this.dom.collection.background = d, setTimeout(function () {
            e(u).animate({opacity:1}, 500), e(d).animate({opacity:.25}, 500)
        }, 10), this.fnResizeButtons(), e(d).click(function () {
            s._fnCollectionHide.call(s, null, null)
        })
    }, _fnCollectionHide:function (t, n) {
        (null === n || "collection" != n.sExtends) && null !== this.dom.collection.collection && (e(this.dom.collection.collection).animate({opacity:0}, 500, function () {
            this.style.display = "none"
        }), e(this.dom.collection.background).animate({opacity:0}, 500, function () {
            this.parentNode.removeChild(this)
        }), this.dom.collection.collection = null, this.dom.collection.background = null)
    }, _fnRowSelectConfig:function () {
        if (this.s.master) {
            var t = this, n = this.s.dt;
            e(n.nTable).addClass(this.classes.select.table), e("tr", n.nTBody).live("click", function (e) {
                this.parentNode == n.nTBody && null !== n.oInstance.fnGetData(this) && (null === t.s.select.preRowSelect || t.s.select.preRowSelect.call(t, e)) && (t.fnIsSelected(this) ? t._fnRowDeselect(this) : "single" == t.s.select.type ? (t.fnSelectNone(), t._fnRowSelect(this)) : "multi" == t.s.select.type && t._fnRowSelect(this))
            }), n.oApi._fnCallbackReg(n, "aoRowCreatedCallback", function (r, i, s) {
                n.aoData[s]._DTTT_selected && e(r).addClass(t.classes.select.row)
            }, "TableTools-SelectAll")
        }
    }, _fnRowSelect:function (t) {
        for (var t = this._fnSelectData(t), n = 0 === t.length ? null : t[0].nTr, r = 0, i = t.length; r < i; r++)t[r]._DTTT_selected = !0, t[r].nTr && e(t[r].nTr).addClass(this.classes.select.row);
        null !== this.s.select.postSelected && this.s.select.postSelected.call(this, n), TableTools._fnEventDispatch(this, "select", n)
    }, _fnRowDeselect:function (t) {
        for (var t = this._fnSelectData(t), n = 0 === t.length ? null : t[0].nTr, r = 0, i = t.length; r < i; r++)t[r].nTr && t[r]._DTTT_selected && e(t[r].nTr).removeClass(this.classes.select.row), t[r]._DTTT_selected = !1;
        null !== this.s.select.postDeselected && this.s.select.postDeselected.call(this, n), TableTools._fnEventDispatch(this, "select", n)
    }, _fnSelectData:function (e) {
        var t = [], n, r, i;
        if (e.nodeName)n = this.s.dt.oInstance.fnGetPosition(e), t.push(this.s.dt.aoData[n]); else if ("undefined" != typeof e.length) {
            r = 0;
            for (i = e.length; r < i; r++)e[r].nodeName ? (n = this.s.dt.oInstance.fnGetPosition(e[r]), t.push(this.s.dt.aoData[n])) : "number" == typeof e[r] ? t.push(this.s.dt.aoData[e[r]]) : t.push(e[r])
        } else t.push(e);
        return t
    }, _fnTextConfig:function (t, n) {
        var r = this;
        null !== n.fnInit && n.fnInit.call(this, t, n), "" !== n.sToolTip && (t.title = n.sToolTip), e(t).hover(function () {
            n.fnMouseover !== null && n.fnMouseover.call(this, t, n, null)
        }, function () {
            n.fnMouseout !== null && n.fnMouseout.call(this, t, n, null)
        }), null !== n.fnSelect && TableTools._fnEventListen(this, "select", function (e) {
            n.fnSelect.call(r, t, n, e)
        }), e(t).click(function () {
            n.fnClick !== null && n.fnClick.call(r, t, n, null), n.fnComplete !== null && n.fnComplete.call(r, t, n, null, null), r._fnCollectionHide(t, n)
        })
    }, _fnFlashConfig:function (e, t) {
        var n = this, r = new ZeroClipboard_TableTools.Client;
        null !== t.fnInit && t.fnInit.call(this, e, t), r.setHandCursor(!0), "flash_save" == t.sAction ? (r.setAction("save"), r.setCharSet("utf16le" == t.sCharSet ? "UTF16LE" : "UTF8"), r.setBomInc(t.bBomInc), r.setFileName(t.sFileName.replace("*", this.fnGetTitle(t)))) : "flash_pdf" == t.sAction ? (r.setAction("pdf"), r.setFileName(t.sFileName.replace("*", this.fnGetTitle(t)))) : r.setAction("copy"), r.addEventListener("mouseOver", function () {
            t.fnMouseover !== null && t.fnMouseover.call(n, e, t, r)
        }), r.addEventListener("mouseOut", function () {
            t.fnMouseout !== null && t.fnMouseout.call(n, e, t, r)
        }), r.addEventListener("mouseDown", function () {
            t.fnClick !== null && t.fnClick.call(n, e, t, r)
        }), r.addEventListener("complete", function (i, s) {
            t.fnComplete !== null && t.fnComplete.call(n, e, t, r, s), n._fnCollectionHide(e, t)
        }), this._fnFlashGlue(r, e, t.sToolTip)
    }, _fnFlashGlue:function (e, t, r) {
        var i = this, s = t.getAttribute("id");
        n.getElementById(s) ? e.glue(t, r) : setTimeout(function () {
            i._fnFlashGlue(e, t, r)
        }, 100)
    }, _fnFlashSetText:function (e, t) {
        var n = this._fnChunkData(t, 8192);
        e.clearText();
        for (var r = 0, i = n.length; r < i; r++)e.appendText(n[r])
    }, _fnColumnTargets:function (e) {
        var t = [], n = this.s.dt;
        if ("object" == typeof e) {
            i = 0;
            for (iLen = n.aoColumns.length; i < iLen; i++)t.push(!1);
            i = 0;
            for (iLen = e.length; i < iLen; i++)t[e[i]] = !0
        } else if ("visible" == e) {
            i = 0;
            for (iLen = n.aoColumns.length; i < iLen; i++)t.push(n.aoColumns[i].bVisible ? !0 : !1)
        } else if ("hidden" == e) {
            i = 0;
            for (iLen = n.aoColumns.length; i < iLen; i++)t.push(n.aoColumns[i].bVisible ? !1 : !0)
        } else if ("sortable" == e) {
            i = 0;
            for (iLen = n.aoColumns.length; i < iLen; i++)t.push(n.aoColumns[i].bSortable ? !0 : !1)
        } else {
            i = 0;
            for (iLen = n.aoColumns.length; i < iLen; i++)t.push(!0)
        }
        return t
    }, _fnNewline:function (e) {
        return"auto" == e.sNewLine ? navigator.userAgent.match(/Windows/) ? "\r\n" : "\n" : e.sNewLine
    }, _fnGetDataTablesData:function (t) {
        var n, r, i, s, o, u = [], a = "", f = this.s.dt, l, c = RegExp(t.sFieldBoundary, "g"), h = this._fnColumnTargets(t.mColumns);
        i = "undefined" != typeof t.bSelectedOnly ? t.bSelectedOnly : !1;
        if (t.bHeader) {
            o = [], n = 0;
            for (r = f.aoColumns.length; n < r; n++)h[n] && (a = f.aoColumns[n].sTitle.replace(/\n/g, " ").replace(/<.*?>/g, "").replace(/^\s+|\s+$/g, ""), a = this._fnHtmlDecode(a), o.push(this._fnBoundData(a, t.sFieldBoundary, c)));
            u.push(o.join(t.sFieldSeperator))
        }
        var p = f.aiDisplay;
        s = this.fnGetSelected();
        if ("none" !== this.s.select.type && i && 0 !== s.length) {
            p = [], n = 0;
            for (r = s.length; n < r; n++)p.push(f.oInstance.fnGetPosition(s[n]))
        }
        i = 0;
        for (s = p.length; i < s; i++) {
            l = f.aoData[p[i]].nTr, o = [], n = 0;
            for (r = f.aoColumns.length; n < r; n++)h[n] && (a = f.oApi._fnGetCellData(f, p[i], n, "display"), t.fnCellRender ? a = t.fnCellRender(a, n, l, p[i]) + "" : "string" == typeof a ? (a = a.replace(/\n/g, " "), a = a.replace(/<img.*?\s+alt\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+)).*?>/gi, "$1$2$3"), a = a.replace(/<.*?>/g, "")) : a += "", a = a.replace(/^\s+/, "").replace(/\s+$/, ""), a = this._fnHtmlDecode(a), o.push(this._fnBoundData(a, t.sFieldBoundary, c)));
            u.push(o.join(t.sFieldSeperator)), t.bOpenRows && (n = e.grep(f.aoOpenRows, function (e) {
                return e.nParent === l
            }), 1 === n.length && (a = this._fnBoundData(e("td", n[0].nTr).html(), t.sFieldBoundary, c), u.push(a)))
        }
        if (t.bFooter && null !== f.nTFoot) {
            o = [], n = 0;
            for (r = f.aoColumns.length; n < r; n++)h[n] && null !== f.aoColumns[n].nTf && (a = f.aoColumns[n].nTf.innerHTML.replace(/\n/g, " ").replace(/<.*?>/g, ""), a = this._fnHtmlDecode(a), o.push(this._fnBoundData(a, t.sFieldBoundary, c)));
            u.push(o.join(t.sFieldSeperator))
        }
        return _sLastData = u.join(this._fnNewline(t))
    }, _fnBoundData:function (e, t, n) {
        return"" === t ? e : t + e.replace(n, t + t) + t
    }, _fnChunkData:function (e, t) {
        for (var n = [], r = e.length, i = 0; i < r; i += t)i + t < r ? n.push(e.substring(i, i + t)) : n.push(e.substring(i, r));
        return n
    }, _fnHtmlDecode:function (e) {
        if (-1 == e.indexOf("&"))return e;
        var e = this._fnChunkData(e, 2048), t = n.createElement("div"), r, i, s, o = "";
        r = 0;
        for (i = e.length; r < i; r++)s = e[r].lastIndexOf("&"), -1 != s && 8 <= e[r].length && s > e[r].length - 8 && (e[r].substr(s), e[r] = e[r].substr(0, s)), t.innerHTML = e[r], o += t.childNodes[0].nodeValue;
        return o
    }, _fnPrintStart:function (r) {
        var i = this, s = this.s.dt;
        this._fnPrintHideNodes(s.nTable), this.s.print.saveStart = s._iDisplayStart, this.s.print.saveLength = s._iDisplayLength, r.bShowAll && (s._iDisplayStart = 0, s._iDisplayLength = -1, s.oApi._fnCalculateEnd(s), s.oApi._fnDraw(s)), ("" !== s.oScroll.sX || "" !== s.oScroll.sY) && this._fnPrintScrollStart(s);
        var s = s.aanFeatures, o;
        for (o in s)if ("i" != o && "t" != o && 1 == o.length)for (var u = 0, a = s[o].length; u < a; u++)this.dom.print.hidden.push({node:s[o][u], display:"block"}), s[o][u].style.display = "none";
        e(n.body).addClass(this.classes.print.body), "" !== r.sInfo && this.fnInfo(r.sInfo, 3e3), r.sMessage && (this.dom.print.message = n.createElement("div"), this.dom.print.message.className = this.classes.print.message, this.dom.print.message.innerHTML = r.sMessage, n.body.insertBefore(this.dom.print.message, n.body.childNodes[0])), this.s.print.saveScroll = e(t).scrollTop(), t.scrollTo(0, 0), e(n).bind("keydown.DTTT", function (e) {
            e.keyCode == 27 && (e.preventDefault(), i._fnPrintEnd.call(i, e))
        })
    }, _fnPrintEnd:function () {
        var r = this.s.dt, i = this.s.print, s = this.dom.print;
        this._fnPrintShowNodes(), ("" !== r.oScroll.sX || "" !== r.oScroll.sY) && this._fnPrintScrollEnd(), t.scrollTo(0, i.saveScroll), null !== s.message && (n.body.removeChild(s.message), s.message = null), e(n.body).removeClass("DTTT_Print"), r._iDisplayStart = i.saveStart, r._iDisplayLength = i.saveLength, r.oApi._fnCalculateEnd(r), r.oApi._fnDraw(r), e(n).unbind("keydown.DTTT")
    }, _fnPrintScrollStart:function () {
        var t = this.s.dt;
        t.nScrollHead.getElementsByTagName("div")[0].getElementsByTagName("table");
        var n = t.nTable.parentNode, r = t.nTable.getElementsByTagName("thead");
        0 < r.length && t.nTable.removeChild(r[0]), null !== t.nTFoot && (r = t.nTable.getElementsByTagName("tfoot"), 0 < r.length && t.nTable.removeChild(r[0])), r = t.nTHead.cloneNode(!0), t.nTable.insertBefore(r, t.nTable.childNodes[0]), null !== t.nTFoot && (r = t.nTFoot.cloneNode(!0), t.nTable.insertBefore(r, t.nTable.childNodes[1])), "" !== t.oScroll.sX && (t.nTable.style.width = e(t.nTable).outerWidth() + "px", n.style.width = e(t.nTable).outerWidth() + "px", n.style.overflow = "visible"), "" !== t.oScroll.sY && (n.style.height = e(t.nTable).outerHeight() + "px", n.style.overflow = "visible")
    }, _fnPrintScrollEnd:function () {
        var e = this.s.dt, t = e.nTable.parentNode;
        "" !== e.oScroll.sX && (t.style.width = e.oApi._fnStringToCss(e.oScroll.sX), t.style.overflow = "auto"), "" !== e.oScroll.sY && (t.style.height = e.oApi._fnStringToCss(e.oScroll.sY), t.style.overflow = "auto")
    }, _fnPrintShowNodes:function () {
        for (var e = this.dom.print.hidden, t = 0, n = e.length; t < n; t++)e[t].node.style.display = e[t].display;
        e.splice(0, e.length)
    }, _fnPrintHideNodes:function (t) {
        for (var n = this.dom.print.hidden, r = t.parentNode, i = r.childNodes, s = 0, o = i.length; s < o; s++)if (i[s] != t && 1 == i[s].nodeType) {
            var u = e(i[s]).css("display");
            "none" != u && (n.push({node:i[s], display:u}), i[s].style.display = "none")
        }
        "BODY" != r.nodeName && this._fnPrintHideNodes(r)
    }}, TableTools._aInstances = [], TableTools._aListeners = [], TableTools.fnGetMasters = function () {
        for (var e = [], t = 0, n = TableTools._aInstances.length; t < n; t++)TableTools._aInstances[t].s.master && e.push(TableTools._aInstances[t]);
        return e
    }, TableTools.fnGetInstance = function (e) {
        "object" != typeof e && (e = n.getElementById(e));
        for (var t = 0, r = TableTools._aInstances.length; t < r; t++)if (TableTools._aInstances[t].s.master && TableTools._aInstances[t].dom.table == e)return TableTools._aInstances[t];
        return null
    }, TableTools._fnEventListen = function (e, t, n) {
        TableTools._aListeners.push({that:e, type:t, fn:n})
    }, TableTools._fnEventDispatch = function (e, t, n) {
        for (var r = TableTools._aListeners, i = 0, s = r.length; i < s; i++)e.dom.table == r[i].that.dom.table && r[i].type == t && r[i].fn(n)
    }, TableTools.buttonBase = {sAction:"text", sTag:"default", sLinerTag:"default", sButtonClass:"DTTT_button_text", sButtonText:"Button text", sTitle:"", sToolTip:"", sCharSet:"utf8", bBomInc:!1, sFileName:"*.csv", sFieldBoundary:"", sFieldSeperator:"	", sNewLine:"auto", mColumns:"all", bHeader:!0, bFooter:!0, bOpenRows:!1, bSelectedOnly:!1, fnMouseover:null, fnMouseout:null, fnClick:null, fnSelect:null, fnComplete:null, fnInit:null, fnCellRender:null}, TableTools.BUTTONS = {csv:e.extend({}, TableTools.buttonBase, {sAction:"flash_save", sButtonClass:"DTTT_button_csv", sButtonText:"CSV", sFieldBoundary:'"', sFieldSeperator:",", fnClick:function (e, t, n) {
        this.fnSetText(n, this.fnGetTableData(t))
    }}), xls:e.extend({}, TableTools.buttonBase, {sAction:"flash_save", sCharSet:"utf16le", bBomInc:!0, sButtonClass:"DTTT_button_xls", sButtonText:"Excel", fnClick:function (e, t, n) {
        this.fnSetText(n, this.fnGetTableData(t))
    }}), copy:e.extend({}, TableTools.buttonBase, {sAction:"flash_copy", sButtonClass:"DTTT_button_copy", sButtonText:"Copy", fnClick:function (e, t, n) {
        this.fnSetText(n, this.fnGetTableData(t))
    }, fnComplete:function (e, t, n, r) {
        e = r.split("\n").length, e = null === this.s.dt.nTFoot ? e - 1 : e - 2, this.fnInfo("<h6>Table copied</h6><p>Copied " + e + " row" + (1 == e ? "" : "s") + " to the clipboard.</p>", 1500)
    }}), pdf:e.extend({}, TableTools.buttonBase, {sAction:"flash_pdf", sNewLine:"\n", sFileName:"*.pdf", sButtonClass:"DTTT_button_pdf", sButtonText:"PDF", sPdfOrientation:"portrait", sPdfSize:"A4", sPdfMessage:"", fnClick:function (e, t, n) {
        this.fnSetText(n, "title:" + this.fnGetTitle(t) + "\nmessage:" + t.sPdfMessage + "\ncolWidth:" + this.fnCalcColRatios(t) + "\norientation:" + t.sPdfOrientation + "\nsize:" + t.sPdfSize + "\n--/TableToolsOpts--\n" + this.fnGetTableData(t))
    }}), print:e.extend({}, TableTools.buttonBase, {sInfo:"<h6>Print view</h6><p>Please use your browser's print function to print this table. Press escape when finished.", sMessage:null, bShowAll:!0, sToolTip:"View print view", sButtonClass:"DTTT_button_print", sButtonText:"Print", fnClick:function (e, t) {
        this.fnPrint(!0, t)
    }}), text:e.extend({}, TableTools.buttonBase), select:e.extend({}, TableTools.buttonBase, {sButtonText:"Select button", fnSelect:function (t) {
        0 !== this.fnGetSelected().length ? e(t).removeClass(this.classes.buttons.disabled) : e(t).addClass(this.classes.buttons.disabled)
    }, fnInit:function (t) {
        e(t).addClass(this.classes.buttons.disabled)
    }}), select_single:e.extend({}, TableTools.buttonBase, {sButtonText:"Select button", fnSelect:function (t) {
        1 == this.fnGetSelected().length ? e(t).removeClass(this.classes.buttons.disabled) : e(t).addClass(this.classes.buttons.disabled)
    }, fnInit:function (t) {
        e(t).addClass(this.classes.buttons.disabled)
    }}), select_all:e.extend({}, TableTools.buttonBase, {sButtonText:"Select all", fnClick:function () {
        this.fnSelectAll()
    }, fnSelect:function (t) {
        this.fnGetSelected().length == this.s.dt.fnRecordsDisplay() ? e(t).addClass(this.classes.buttons.disabled) : e(t).removeClass(this.classes.buttons.disabled)
    }}), select_none:e.extend({}, TableTools.buttonBase, {sButtonText:"Deselect all", fnClick:function () {
        this.fnSelectNone()
    }, fnSelect:function (t) {
        0 !== this.fnGetSelected().length ? e(t).removeClass(this.classes.buttons.disabled) : e(t).addClass(this.classes.buttons.disabled)
    }, fnInit:function (t) {
        e(t).addClass(this.classes.buttons.disabled)
    }}), ajax:e.extend({}, TableTools.buttonBase, {sAjaxUrl:"/xhr.php", sButtonText:"Ajax button", fnClick:function (t, n) {
        var r = this.fnGetTableData(n);
        e.ajax({url:n.sAjaxUrl, data:[
            {name:"tableData", value:r}
        ], success:n.fnAjaxComplete, dataType:"json", type:"POST", cache:!1, error:function () {
            alert("Error detected when sending table data to server")
        }})
    }, fnAjaxComplete:function () {
        alert("Ajax complete")
    }}), div:e.extend({}, TableTools.buttonBase, {sAction:"div", sTag:"div", sButtonClass:"DTTT_nonbutton", sButtonText:"Text button"}), collection:e.extend({}, TableTools.buttonBase, {sAction:"collection", sButtonClass:"DTTT_button_collection", sButtonText:"Collection", fnClick:function (e, t) {
        this._fnCollectionShow(e, t)
    }})}, TableTools.classes = {container:"DTTT_container", buttons:{normal:"DTTT_button", disabled:"DTTT_disabled"}, collection:{container:"DTTT_collection", background:"DTTT_collection_background", buttons:{normal:"DTTT_button", disabled:"DTTT_disabled"}}, select:{table:"DTTT_selectable", row:"DTTT_selected"}, print:{body:"DTTT_Print", info:"DTTT_print_info", message:"DTTT_PrintMessage"}}, TableTools.classes_themeroller = {container:"DTTT_container ui-buttonset ui-buttonset-multi", buttons:{normal:"DTTT_button ui-button ui-state-default"}, collection:{container:"DTTT_collection ui-buttonset ui-buttonset-multi"}}, TableTools.DEFAULTS = {sSwfPath:"media/swf/copy_csv_xls_pdf.swf", sRowSelect:"none", sSelectedClass:null, fnPreRowSelect:null, fnRowSelected:null, fnRowDeselected:null, aButtons:["copy", "csv", "xls", "pdf", "print"], oTags:{container:"div", button:"a", liner:"span", collection:{container:"div", button:"a", liner:"span"}}}, TableTools.prototype.CLASS = "TableTools", TableTools.VERSION = "2.1.3", TableTools.prototype.VERSION = TableTools.VERSION, "function" == typeof e.fn.dataTable && "function" == typeof e.fn.dataTableExt.fnVersionCheck && e.fn.dataTableExt.fnVersionCheck("1.9.0") ? e.fn.dataTableExt.aoFeatures.push({fnInit:function (e) {
        return e = new TableTools(e.oInstance, "undefined" != typeof e.oInit.oTableTools ? e.oInit.oTableTools : {}), TableTools._aInstances.push(e), e.dom.container
    }, cFeature:"T", sFeature:"TableTools"}) : alert("Warning: TableTools 2 requires DataTables 1.9.0 or newer - www.datatables.net/download"), e.fn.DataTable.TableTools = TableTools
})(jQuery, window, document);