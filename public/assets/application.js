/*!
 * jQuery JavaScript Library v1.8.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: Thu Sep 20 2012 21:13:05 GMT-0400 (Eastern Daylight Time)
 */

(function (window, undefined) {
    var
    // A central reference to the root jQuery(document)
        rootjQuery,

    // The deferred used on DOM ready
        readyList,

    // Use the correct document accordingly with window argument (sandbox)
        document = window.document,
        location = window.location,
        navigator = window.navigator,

    // Map over jQuery in case of overwrite
        _jQuery = window.jQuery,

    // Map over the $ in case of overwrite
        _$ = window.$,

    // Save a reference to some core methods
        core_push = Array.prototype.push,
        core_slice = Array.prototype.slice,
        core_indexOf = Array.prototype.indexOf,
        core_toString = Object.prototype.toString,
        core_hasOwn = Object.prototype.hasOwnProperty,
        core_trim = String.prototype.trim,

    // Define a local copy of jQuery
        jQuery = function (selector, context) {
            // The jQuery object is actually just the init constructor 'enhanced'
            return new jQuery.fn.init(selector, context, rootjQuery);
        },

    // Used for matching numbers
        core_pnum = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,

    // Used for detecting and trimming whitespace
        core_rnotwhite = /\S/,
        core_rspace = /\s+/,

    // Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

    // A simple way to check for HTML strings
    // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
        rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,

    // Match a standalone tag
        rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

    // JSON RegExp
        rvalidchars = /^[\],:{}\s]*$/,
        rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
        rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,

    // Matches dashed string for camelizing
        rmsPrefix = /^-ms-/,
        rdashAlpha = /-([\da-z])/gi,

    // Used by jQuery.camelCase as callback to replace()
        fcamelCase = function (all, letter) {
            return ( letter + "" ).toUpperCase();
        },

    // The ready event handler and self cleanup method
        DOMContentLoaded = function () {
            if (document.addEventListener) {
                document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
                jQuery.ready();
            } else if (document.readyState === "complete") {
                // we're here because readyState === "complete" in oldIE
                // which is good enough for us to call the dom ready!
                document.detachEvent("onreadystatechange", DOMContentLoaded);
                jQuery.ready();
            }
        },

    // [[Class]] -> type pairs
        class2type = {};

    jQuery.fn = jQuery.prototype = {
        constructor:jQuery,
        init:function (selector, context, rootjQuery) {
            var match, elem, ret, doc;

            // Handle $(""), $(null), $(undefined), $(false)
            if (!selector) {
                return this;
            }

            // Handle $(DOMElement)
            if (selector.nodeType) {
                this.context = this[0] = selector;
                this.length = 1;
                return this;
            }

            // Handle HTML strings
            if (typeof selector === "string") {
                if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
                    // Assume that strings that start and end with <> are HTML and skip the regex check
                    match = [ null, selector, null ];

                } else {
                    match = rquickExpr.exec(selector);
                }

                // Match html or make sure no context is specified for #id
                if (match && (match[1] || !context)) {

                    // HANDLE: $(html) -> $(array)
                    if (match[1]) {
                        context = context instanceof jQuery ? context[0] : context;
                        doc = ( context && context.nodeType ? context.ownerDocument || context : document );

                        // scripts is true for back-compat
                        selector = jQuery.parseHTML(match[1], doc, true);
                        if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                            this.attr.call(selector, context, true);
                        }

                        return jQuery.merge(this, selector);

                        // HANDLE: $(#id)
                    } else {
                        elem = document.getElementById(match[2]);

                        // Check parentNode to catch when Blackberry 4.6 returns
                        // nodes that are no longer in the document #6963
                        if (elem && elem.parentNode) {
                            // Handle the case where IE and Opera return items
                            // by name instead of ID
                            if (elem.id !== match[2]) {
                                return rootjQuery.find(selector);
                            }

                            // Otherwise, we inject the element directly into the jQuery object
                            this.length = 1;
                            this[0] = elem;
                        }

                        this.context = document;
                        this.selector = selector;
                        return this;
                    }

                    // HANDLE: $(expr, $(...))
                } else if (!context || context.jquery) {
                    return ( context || rootjQuery ).find(selector);

                    // HANDLE: $(expr, context)
                    // (which is just equivalent to: $(context).find(expr)
                } else {
                    return this.constructor(context).find(selector);
                }

                // HANDLE: $(function)
                // Shortcut for document ready
            } else if (jQuery.isFunction(selector)) {
                return rootjQuery.ready(selector);
            }

            if (selector.selector !== undefined) {
                this.selector = selector.selector;
                this.context = selector.context;
            }

            return jQuery.makeArray(selector, this);
        },

        // Start with an empty selector
        selector:"",

        // The current version of jQuery being used
        jquery:"1.8.2",

        // The default length of a jQuery object is 0
        length:0,

        // The number of elements contained in the matched element set
        size:function () {
            return this.length;
        },

        toArray:function () {
            return core_slice.call(this);
        },

        // Get the Nth element in the matched element set OR
        // Get the whole matched element set as a clean array
        get:function (num) {
            return num == null ?

                // Return a 'clean' array
                this.toArray() :

                // Return just the object
                ( num < 0 ? this[ this.length + num ] : this[ num ] );
        },

        // Take an array of elements and push it onto the stack
        // (returning the new matched element set)
        pushStack:function (elems, name, selector) {

            // Build a new jQuery matched element set
            var ret = jQuery.merge(this.constructor(), elems);

            // Add the old object onto the stack (as a reference)
            ret.prevObject = this;

            ret.context = this.context;

            if (name === "find") {
                ret.selector = this.selector + ( this.selector ? " " : "" ) + selector;
            } else if (name) {
                ret.selector = this.selector + "." + name + "(" + selector + ")";
            }

            // Return the newly-formed element set
            return ret;
        },

        // Execute a callback for every element in the matched set.
        // (You can seed the arguments with an array of args, but this is
        // only used internally.)
        each:function (callback, args) {
            return jQuery.each(this, callback, args);
        },

        ready:function (fn) {
            // Add the callback
            jQuery.ready.promise().done(fn);

            return this;
        },

        eq:function (i) {
            i = +i;
            return i === -1 ?
                this.slice(i) :
                this.slice(i, i + 1);
        },

        first:function () {
            return this.eq(0);
        },

        last:function () {
            return this.eq(-1);
        },

        slice:function () {
            return this.pushStack(core_slice.apply(this, arguments),
                "slice", core_slice.call(arguments).join(","));
        },

        map:function (callback) {
            return this.pushStack(jQuery.map(this, function (elem, i) {
                return callback.call(elem, i, elem);
            }));
        },

        end:function () {
            return this.prevObject || this.constructor(null);
        },

        // For internal use only.
        // Behaves like an Array's method, not like a jQuery method.
        push:core_push,
        sort:[].sort,
        splice:[].splice
    };

// Give the init function the jQuery prototype for later instantiation
    jQuery.fn.init.prototype = jQuery.fn;

    jQuery.extend = jQuery.fn.extend = function () {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[1] || {};
            // skip the boolean and the target
            i = 2;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && !jQuery.isFunction(target)) {
            target = {};
        }

        // extend jQuery itself if only one argument is passed
        if (length === i) {
            target = this;
            --i;
        }

        for (; i < length; i++) {
            // Only deal with non-null/undefined values
            if ((options = arguments[ i ]) != null) {
                // Extend the base object
                for (name in options) {
                    src = target[ name ];
                    copy = options[ name ];

                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) )) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : [];

                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[ name ] = jQuery.extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[ name ] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };

    jQuery.extend({
        noConflict:function (deep) {
            if (window.$ === jQuery) {
                window.$ = _$;
            }

            if (deep && window.jQuery === jQuery) {
                window.jQuery = _jQuery;
            }

            return jQuery;
        },

        // Is the DOM ready to be used? Set to true once it occurs.
        isReady:false,

        // A counter to track how many items to wait for before
        // the ready event fires. See #6781
        readyWait:1,

        // Hold (or release) the ready event
        holdReady:function (hold) {
            if (hold) {
                jQuery.readyWait++;
            } else {
                jQuery.ready(true);
            }
        },

        // Handle when the DOM is ready
        ready:function (wait) {

            // Abort if there are pending holds or we're already ready
            if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
                return;
            }

            // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
            if (!document.body) {
                return setTimeout(jQuery.ready, 1);
            }

            // Remember that the DOM is ready
            jQuery.isReady = true;

            // If a normal DOM Ready event fired, decrement, and wait if need be
            if (wait !== true && --jQuery.readyWait > 0) {
                return;
            }

            // If there are functions bound, to execute
            readyList.resolveWith(document, [ jQuery ]);

            // Trigger any bound ready events
            if (jQuery.fn.trigger) {
                jQuery(document).trigger("ready").off("ready");
            }
        },

        // See test/unit/core.js for details concerning isFunction.
        // Since version 1.3, DOM methods and functions like alert
        // aren't supported. They return false on IE (#2968).
        isFunction:function (obj) {
            return jQuery.type(obj) === "function";
        },

        isArray:Array.isArray || function (obj) {
            return jQuery.type(obj) === "array";
        },

        isWindow:function (obj) {
            return obj != null && obj == obj.window;
        },

        isNumeric:function (obj) {
            return !isNaN(parseFloat(obj)) && isFinite(obj);
        },

        type:function (obj) {
            return obj == null ?
                String(obj) :
                class2type[ core_toString.call(obj) ] || "object";
        },

        isPlainObject:function (obj) {
            // Must be an Object.
            // Because of IE, we also have to check the presence of the constructor property.
            // Make sure that DOM nodes and window objects don't pass through, as well
            if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
                return false;
            }

            try {
                // Not own constructor property must be Object
                if (obj.constructor &&
                    !core_hasOwn.call(obj, "constructor") &&
                    !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                    return false;
                }
            } catch (e) {
                // IE8,9 Will throw exceptions on certain host objects #9897
                return false;
            }

            // Own properties are enumerated firstly, so to speed up,
            // if last one is own, then all properties are own.

            var key;
            for (key in obj) {
            }

            return key === undefined || core_hasOwn.call(obj, key);
        },

        isEmptyObject:function (obj) {
            var name;
            for (name in obj) {
                return false;
            }
            return true;
        },

        error:function (msg) {
            throw new Error(msg);
        },

        // data: string of html
        // context (optional): If specified, the fragment will be created in this context, defaults to document
        // scripts (optional): If true, will include scripts passed in the html string
        parseHTML:function (data, context, scripts) {
            var parsed;
            if (!data || typeof data !== "string") {
                return null;
            }
            if (typeof context === "boolean") {
                scripts = context;
                context = 0;
            }
            context = context || document;

            // Single tag
            if ((parsed = rsingleTag.exec(data))) {
                return [ context.createElement(parsed[1]) ];
            }

            parsed = jQuery.buildFragment([ data ], context, scripts ? null : []);
            return jQuery.merge([],
                (parsed.cacheable ? jQuery.clone(parsed.fragment) : parsed.fragment).childNodes);
        },

        parseJSON:function (data) {
            if (!data || typeof data !== "string") {
                return null;
            }

            // Make sure leading/trailing whitespace is removed (IE can't handle it)
            data = jQuery.trim(data);

            // Attempt to parse using the native JSON parser first
            if (window.JSON && window.JSON.parse) {
                return window.JSON.parse(data);
            }

            // Make sure the incoming data is actual JSON
            // Logic borrowed from http://json.org/json2.js
            if (rvalidchars.test(data.replace(rvalidescape, "@")
                .replace(rvalidtokens, "]")
                .replace(rvalidbraces, ""))) {

                return ( new Function("return " + data) )();

            }
            jQuery.error("Invalid JSON: " + data);
        },

        // Cross-browser xml parsing
        parseXML:function (data) {
            var xml, tmp;
            if (!data || typeof data !== "string") {
                return null;
            }
            try {
                if (window.DOMParser) { // Standard
                    tmp = new DOMParser();
                    xml = tmp.parseFromString(data, "text/xml");
                } else { // IE
                    xml = new ActiveXObject("Microsoft.XMLDOM");
                    xml.async = "false";
                    xml.loadXML(data);
                }
            } catch (e) {
                xml = undefined;
            }
            if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
                jQuery.error("Invalid XML: " + data);
            }
            return xml;
        },

        noop:function () {
        },

        // Evaluates a script in a global context
        // Workarounds based on findings by Jim Driscoll
        // http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
        globalEval:function (data) {
            if (data && core_rnotwhite.test(data)) {
                // We use execScript on Internet Explorer
                // We use an anonymous function so that context is window
                // rather than jQuery in Firefox
                ( window.execScript || function (data) {
                    window[ "eval" ].call(window, data);
                } )(data);
            }
        },

        // Convert dashed to camelCase; used by the css and data modules
        // Microsoft forgot to hump their vendor prefix (#9572)
        camelCase:function (string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },

        nodeName:function (elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },

        // args is for internal usage only
        each:function (obj, callback, args) {
            var name,
                i = 0,
                length = obj.length,
                isObj = length === undefined || jQuery.isFunction(obj);

            if (args) {
                if (isObj) {
                    for (name in obj) {
                        if (callback.apply(obj[ name ], args) === false) {
                            break;
                        }
                    }
                } else {
                    for (; i < length;) {
                        if (callback.apply(obj[ i++ ], args) === false) {
                            break;
                        }
                    }
                }

                // A special, fast, case for the most common use of each
            } else {
                if (isObj) {
                    for (name in obj) {
                        if (callback.call(obj[ name ], name, obj[ name ]) === false) {
                            break;
                        }
                    }
                } else {
                    for (; i < length;) {
                        if (callback.call(obj[ i ], i, obj[ i++ ]) === false) {
                            break;
                        }
                    }
                }
            }

            return obj;
        },

        // Use native String.trim function wherever possible
        trim:core_trim && !core_trim.call("\uFEFF\xA0") ?
            function (text) {
                return text == null ?
                    "" :
                    core_trim.call(text);
            } :

            // Otherwise use our own trimming functionality
            function (text) {
                return text == null ?
                    "" :
                    ( text + "" ).replace(rtrim, "");
            },

        // results is for internal usage only
        makeArray:function (arr, results) {
            var type,
                ret = results || [];

            if (arr != null) {
                // The window, strings (and functions) also have 'length'
                // Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
                type = jQuery.type(arr);

                if (arr.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow(arr)) {
                    core_push.call(ret, arr);
                } else {
                    jQuery.merge(ret, arr);
                }
            }

            return ret;
        },

        inArray:function (elem, arr, i) {
            var len;

            if (arr) {
                if (core_indexOf) {
                    return core_indexOf.call(arr, elem, i);
                }

                len = arr.length;
                i = i ? i < 0 ? Math.max(0, len + i) : i : 0;

                for (; i < len; i++) {
                    // Skip accessing in sparse arrays
                    if (i in arr && arr[ i ] === elem) {
                        return i;
                    }
                }
            }

            return -1;
        },

        merge:function (first, second) {
            var l = second.length,
                i = first.length,
                j = 0;

            if (typeof l === "number") {
                for (; j < l; j++) {
                    first[ i++ ] = second[ j ];
                }

            } else {
                while (second[j] !== undefined) {
                    first[ i++ ] = second[ j++ ];
                }
            }

            first.length = i;

            return first;
        },

        grep:function (elems, callback, inv) {
            var retVal,
                ret = [],
                i = 0,
                length = elems.length;
            inv = !!inv;

            // Go through the array, only saving the items
            // that pass the validator function
            for (; i < length; i++) {
                retVal = !!callback(elems[ i ], i);
                if (inv !== retVal) {
                    ret.push(elems[ i ]);
                }
            }

            return ret;
        },

        // arg is for internal usage only
        map:function (elems, callback, arg) {
            var value, key,
                ret = [],
                i = 0,
                length = elems.length,
            // jquery objects are treated as arrays
                isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ( ( length > 0 && elems[ 0 ] && elems[ length - 1 ] ) || length === 0 || jQuery.isArray(elems) );

            // Go through the array, translating each of the items to their
            if (isArray) {
                for (; i < length; i++) {
                    value = callback(elems[ i ], i, arg);

                    if (value != null) {
                        ret[ ret.length ] = value;
                    }
                }

                // Go through every key on the object,
            } else {
                for (key in elems) {
                    value = callback(elems[ key ], key, arg);

                    if (value != null) {
                        ret[ ret.length ] = value;
                    }
                }
            }

            // Flatten any nested arrays
            return ret.concat.apply([], ret);
        },

        // A global GUID counter for objects
        guid:1,

        // Bind a function to a context, optionally partially applying any
        // arguments.
        proxy:function (fn, context) {
            var tmp, args, proxy;

            if (typeof context === "string") {
                tmp = fn[ context ];
                context = fn;
                fn = tmp;
            }

            // Quick check to determine if target is callable, in the spec
            // this throws a TypeError, but we will just return undefined.
            if (!jQuery.isFunction(fn)) {
                return undefined;
            }

            // Simulated bind
            args = core_slice.call(arguments, 2);
            proxy = function () {
                return fn.apply(context, args.concat(core_slice.call(arguments)));
            };

            // Set the guid of unique handler to the same of original handler, so it can be removed
            proxy.guid = fn.guid = fn.guid || jQuery.guid++;

            return proxy;
        },

        // Multifunctional method to get and set values of a collection
        // The value/s can optionally be executed if it's a function
        access:function (elems, fn, key, value, chainable, emptyGet, pass) {
            var exec,
                bulk = key == null,
                i = 0,
                length = elems.length;

            // Sets many values
            if (key && typeof key === "object") {
                for (i in key) {
                    jQuery.access(elems, fn, i, key[i], 1, emptyGet, value);
                }
                chainable = 1;

                // Sets one value
            } else if (value !== undefined) {
                // Optionally, function values get executed if exec is true
                exec = pass === undefined && jQuery.isFunction(value);

                if (bulk) {
                    // Bulk operations only iterate when executing function values
                    if (exec) {
                        exec = fn;
                        fn = function (elem, key, value) {
                            return exec.call(jQuery(elem), value);
                        };

                        // Otherwise they run against the entire set
                    } else {
                        fn.call(elems, value);
                        fn = null;
                    }
                }

                if (fn) {
                    for (; i < length; i++) {
                        fn(elems[i], key, exec ? value.call(elems[i], i, fn(elems[i], key)) : value, pass);
                    }
                }

                chainable = 1;
            }

            return chainable ?
                elems :

                // Gets
                bulk ?
                    fn.call(elems) :
                    length ? fn(elems[0], key) : emptyGet;
        },

        now:function () {
            return ( new Date() ).getTime();
        }
    });

    jQuery.ready.promise = function (obj) {
        if (!readyList) {

            readyList = jQuery.Deferred();

            // Catch cases where $(document).ready() is called after the browser event has already occurred.
            // we once tried to use readyState "interactive" here, but it caused issues like the one
            // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
            if (document.readyState === "complete") {
                // Handle it asynchronously to allow scripts the opportunity to delay ready
                setTimeout(jQuery.ready, 1);

                // Standards-based browsers support DOMContentLoaded
            } else if (document.addEventListener) {
                // Use the handy event callback
                document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);

                // A fallback to window.onload, that will always work
                window.addEventListener("load", jQuery.ready, false);

                // If IE event model is used
            } else {
                // Ensure firing before onload, maybe late but safe also for iframes
                document.attachEvent("onreadystatechange", DOMContentLoaded);

                // A fallback to window.onload, that will always work
                window.attachEvent("onload", jQuery.ready);

                // If IE and not a frame
                // continually check to see if the document is ready
                var top = false;

                try {
                    top = window.frameElement == null && document.documentElement;
                } catch (e) {
                }

                if (top && top.doScroll) {
                    (function doScrollCheck() {
                        if (!jQuery.isReady) {

                            try {
                                // Use the trick by Diego Perini
                                // http://javascript.nwbox.com/IEContentLoaded/
                                top.doScroll("left");
                            } catch (e) {
                                return setTimeout(doScrollCheck, 50);
                            }

                            // and execute any waiting functions
                            jQuery.ready();
                        }
                    })();
                }
            }
        }
        return readyList.promise(obj);
    };

// Populate the class2type map
    jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (i, name) {
        class2type[ "[object " + name + "]" ] = name.toLowerCase();
    });

// All jQuery objects should point back to these
    rootjQuery = jQuery(document);
// String to Object options format cache
    var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
    function createOptions(options) {
        var object = optionsCache[ options ] = {};
        jQuery.each(options.split(core_rspace), function (_, flag) {
            object[ flag ] = true;
        });
        return object;
    }

    /*
     * Create a callback list using the following parameters:
     *
     *	options: an optional list of space-separated options that will change how
     *			the callback list behaves or a more traditional option object
     *
     * By default a callback list will act like an event callback list and can be
     * "fired" multiple times.
     *
     * Possible options:
     *
     *	once:			will ensure the callback list can only be fired once (like a Deferred)
     *
     *	memory:			will keep track of previous values and will call any callback added
     *					after the list has been fired right away with the latest "memorized"
     *					values (like a Deferred)
     *
     *	unique:			will ensure a callback can only be added once (no duplicate in the list)
     *
     *	stopOnFalse:	interrupt callings when a callback returns false
     *
     */
    jQuery.Callbacks = function (options) {

        // Convert options from String-formatted to Object-formatted if needed
        // (we check in cache first)
        options = typeof options === "string" ?
            ( optionsCache[ options ] || createOptions(options) ) :
            jQuery.extend({}, options);

        var // Last fire value (for non-forgettable lists)
            memory,
        // Flag to know if list was already fired
            fired,
        // Flag to know if list is currently firing
            firing,
        // First callback to fire (used internally by add and fireWith)
            firingStart,
        // End of the loop when firing
            firingLength,
        // Index of currently firing callback (modified by remove if needed)
            firingIndex,
        // Actual callback list
            list = [],
        // Stack of fire calls for repeatable lists
            stack = !options.once && [],
        // Fire callbacks
            fire = function (data) {
                memory = options.memory && data;
                fired = true;
                firingIndex = firingStart || 0;
                firingStart = 0;
                firingLength = list.length;
                firing = true;
                for (; list && firingIndex < firingLength; firingIndex++) {
                    if (list[ firingIndex ].apply(data[ 0 ], data[ 1 ]) === false && options.stopOnFalse) {
                        memory = false; // To prevent further calls using add
                        break;
                    }
                }
                firing = false;
                if (list) {
                    if (stack) {
                        if (stack.length) {
                            fire(stack.shift());
                        }
                    } else if (memory) {
                        list = [];
                    } else {
                        self.disable();
                    }
                }
            },
        // Actual Callbacks object
            self = {
                // Add a callback or a collection of callbacks to the list
                add:function () {
                    if (list) {
                        // First, we save the current length
                        var start = list.length;
                        (function add(args) {
                            jQuery.each(args, function (_, arg) {
                                var type = jQuery.type(arg);
                                if (type === "function" && ( !options.unique || !self.has(arg) )) {
                                    list.push(arg);
                                } else if (arg && arg.length && type !== "string") {
                                    // Inspect recursively
                                    add(arg);
                                }
                            });
                        })(arguments);
                        // Do we need to add the callbacks to the
                        // current firing batch?
                        if (firing) {
                            firingLength = list.length;
                            // With memory, if we're not firing then
                            // we should call right away
                        } else if (memory) {
                            firingStart = start;
                            fire(memory);
                        }
                    }
                    return this;
                },
                // Remove a callback from the list
                remove:function () {
                    if (list) {
                        jQuery.each(arguments, function (_, arg) {
                            var index;
                            while (( index = jQuery.inArray(arg, list, index) ) > -1) {
                                list.splice(index, 1);
                                // Handle firing indexes
                                if (firing) {
                                    if (index <= firingLength) {
                                        firingLength--;
                                    }
                                    if (index <= firingIndex) {
                                        firingIndex--;
                                    }
                                }
                            }
                        });
                    }
                    return this;
                },
                // Control if a given callback is in the list
                has:function (fn) {
                    return jQuery.inArray(fn, list) > -1;
                },
                // Remove all callbacks from the list
                empty:function () {
                    list = [];
                    return this;
                },
                // Have the list do nothing anymore
                disable:function () {
                    list = stack = memory = undefined;
                    return this;
                },
                // Is it disabled?
                disabled:function () {
                    return !list;
                },
                // Lock the list in its current state
                lock:function () {
                    stack = undefined;
                    if (!memory) {
                        self.disable();
                    }
                    return this;
                },
                // Is it locked?
                locked:function () {
                    return !stack;
                },
                // Call all callbacks with the given context and arguments
                fireWith:function (context, args) {
                    args = args || [];
                    args = [ context, args.slice ? args.slice() : args ];
                    if (list && ( !fired || stack )) {
                        if (firing) {
                            stack.push(args);
                        } else {
                            fire(args);
                        }
                    }
                    return this;
                },
                // Call all the callbacks with the given arguments
                fire:function () {
                    self.fireWith(this, arguments);
                    return this;
                },
                // To know if the callbacks have already been called at least once
                fired:function () {
                    return !!fired;
                }
            };

        return self;
    };
    jQuery.extend({

        Deferred:function (func) {
            var tuples = [
                    // action, add listener, listener list, final state
                    [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
                    [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
                    [ "notify", "progress", jQuery.Callbacks("memory") ]
                ],
                state = "pending",
                promise = {
                    state:function () {
                        return state;
                    },
                    always:function () {
                        deferred.done(arguments).fail(arguments);
                        return this;
                    },
                    then:function (/* fnDone, fnFail, fnProgress */) {
                        var fns = arguments;
                        return jQuery.Deferred(function (newDefer) {
                            jQuery.each(tuples, function (i, tuple) {
                                var action = tuple[ 0 ],
                                    fn = fns[ i ];
                                // deferred[ done | fail | progress ] for forwarding actions to newDefer
                                deferred[ tuple[1] ](jQuery.isFunction(fn) ?
                                    function () {
                                        var returned = fn.apply(this, arguments);
                                        if (returned && jQuery.isFunction(returned.promise)) {
                                            returned.promise()
                                                .done(newDefer.resolve)
                                                .fail(newDefer.reject)
                                                .progress(newDefer.notify);
                                        } else {
                                            newDefer[ action + "With" ](this === deferred ? newDefer : this, [ returned ]);
                                        }
                                    } :
                                    newDefer[ action ]
                                );
                            });
                            fns = null;
                        }).promise();
                    },
                    // Get a promise for this deferred
                    // If obj is provided, the promise aspect is added to the object
                    promise:function (obj) {
                        return obj != null ? jQuery.extend(obj, promise) : promise;
                    }
                },
                deferred = {};

            // Keep pipe for back-compat
            promise.pipe = promise.then;

            // Add list-specific methods
            jQuery.each(tuples, function (i, tuple) {
                var list = tuple[ 2 ],
                    stateString = tuple[ 3 ];

                // promise[ done | fail | progress ] = list.add
                promise[ tuple[1] ] = list.add;

                // Handle state
                if (stateString) {
                    list.add(function () {
                        // state = [ resolved | rejected ]
                        state = stateString;

                        // [ reject_list | resolve_list ].disable; progress_list.lock
                    }, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock);
                }

                // deferred[ resolve | reject | notify ] = list.fire
                deferred[ tuple[0] ] = list.fire;
                deferred[ tuple[0] + "With" ] = list.fireWith;
            });

            // Make the deferred a promise
            promise.promise(deferred);

            // Call given func if any
            if (func) {
                func.call(deferred, deferred);
            }

            // All done!
            return deferred;
        },

        // Deferred helper
        when:function (subordinate /* , ..., subordinateN */) {
            var i = 0,
                resolveValues = core_slice.call(arguments),
                length = resolveValues.length,

            // the count of uncompleted subordinates
                remaining = length !== 1 || ( subordinate && jQuery.isFunction(subordinate.promise) ) ? length : 0,

            // the master Deferred. If resolveValues consist of only a single Deferred, just use that.
                deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

            // Update function for both resolve and progress values
                updateFunc = function (i, contexts, values) {
                    return function (value) {
                        contexts[ i ] = this;
                        values[ i ] = arguments.length > 1 ? core_slice.call(arguments) : value;
                        if (values === progressValues) {
                            deferred.notifyWith(contexts, values);
                        } else if (!( --remaining )) {
                            deferred.resolveWith(contexts, values);
                        }
                    };
                },

                progressValues, progressContexts, resolveContexts;

            // add listeners to Deferred subordinates; treat others as resolved
            if (length > 1) {
                progressValues = new Array(length);
                progressContexts = new Array(length);
                resolveContexts = new Array(length);
                for (; i < length; i++) {
                    if (resolveValues[ i ] && jQuery.isFunction(resolveValues[ i ].promise)) {
                        resolveValues[ i ].promise()
                            .done(updateFunc(i, resolveContexts, resolveValues))
                            .fail(deferred.reject)
                            .progress(updateFunc(i, progressContexts, progressValues));
                    } else {
                        --remaining;
                    }
                }
            }

            // if we're not waiting on anything, resolve the master
            if (!remaining) {
                deferred.resolveWith(resolveContexts, resolveValues);
            }

            return deferred.promise();
        }
    });
    jQuery.support = (function () {

        var support,
            all,
            a,
            select,
            opt,
            input,
            fragment,
            eventName,
            i,
            isSupported,
            clickFn,
            div = document.createElement("div");

        // Preliminary tests
        div.setAttribute("className", "t");
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

        all = div.getElementsByTagName("*");
        a = div.getElementsByTagName("a")[ 0 ];
        a.style.cssText = "top:1px;float:left;opacity:.5";

        // Can't get basic test support
        if (!all || !all.length) {
            return {};
        }

        // First batch of supports tests
        select = document.createElement("select");
        opt = select.appendChild(document.createElement("option"));
        input = div.getElementsByTagName("input")[ 0 ];

        support = {
            // IE strips leading whitespace when .innerHTML is used
            leadingWhitespace:( div.firstChild.nodeType === 3 ),

            // Make sure that tbody elements aren't automatically inserted
            // IE will insert them into empty tables
            tbody:!div.getElementsByTagName("tbody").length,

            // Make sure that link elements get serialized correctly by innerHTML
            // This requires a wrapper element in IE
            htmlSerialize:!!div.getElementsByTagName("link").length,

            // Get the style information from getAttribute
            // (IE uses .cssText instead)
            style:/top/.test(a.getAttribute("style")),

            // Make sure that URLs aren't manipulated
            // (IE normalizes it by default)
            hrefNormalized:( a.getAttribute("href") === "/a" ),

            // Make sure that element opacity exists
            // (IE uses filter instead)
            // Use a regex to work around a WebKit issue. See #5145
            opacity:/^0.5/.test(a.style.opacity),

            // Verify style float existence
            // (IE uses styleFloat instead of cssFloat)
            cssFloat:!!a.style.cssFloat,

            // Make sure that if no value is specified for a checkbox
            // that it defaults to "on".
            // (WebKit defaults to "" instead)
            checkOn:( input.value === "on" ),

            // Make sure that a selected-by-default option has a working selected property.
            // (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
            optSelected:opt.selected,

            // Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
            getSetAttribute:div.className !== "t",

            // Tests for enctype support on a form(#6743)
            enctype:!!document.createElement("form").enctype,

            // Makes sure cloning an html5 element does not cause problems
            // Where outerHTML is undefined, this still works
            html5Clone:document.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>",

            // jQuery.support.boxModel DEPRECATED in 1.8 since we don't support Quirks Mode
            boxModel:( document.compatMode === "CSS1Compat" ),

            // Will be defined later
            submitBubbles:true,
            changeBubbles:true,
            focusinBubbles:false,
            deleteExpando:true,
            noCloneEvent:true,
            inlineBlockNeedsLayout:false,
            shrinkWrapBlocks:false,
            reliableMarginRight:true,
            boxSizingReliable:true,
            pixelPosition:false
        };

        // Make sure checked status is properly cloned
        input.checked = true;
        support.noCloneChecked = input.cloneNode(true).checked;

        // Make sure that the options inside disabled selects aren't marked as disabled
        // (WebKit marks them as disabled)
        select.disabled = true;
        support.optDisabled = !opt.disabled;

        // Test to see if it's possible to delete an expando from an element
        // Fails in Internet Explorer
        try {
            delete div.test;
        } catch (e) {
            support.deleteExpando = false;
        }

        if (!div.addEventListener && div.attachEvent && div.fireEvent) {
            div.attachEvent("onclick", clickFn = function () {
                // Cloning a node shouldn't copy over any
                // bound event handlers (IE does this)
                support.noCloneEvent = false;
            });
            div.cloneNode(true).fireEvent("onclick");
            div.detachEvent("onclick", clickFn);
        }

        // Check if a radio maintains its value
        // after being appended to the DOM
        input = document.createElement("input");
        input.value = "t";
        input.setAttribute("type", "radio");
        support.radioValue = input.value === "t";

        input.setAttribute("checked", "checked");

        // #11217 - WebKit loses check when the name is after the checked attribute
        input.setAttribute("name", "t");

        div.appendChild(input);
        fragment = document.createDocumentFragment();
        fragment.appendChild(div.lastChild);

        // WebKit doesn't clone checked state correctly in fragments
        support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;

        // Check if a disconnected checkbox will retain its checked
        // value of true after appended to the DOM (IE6/7)
        support.appendChecked = input.checked;

        fragment.removeChild(input);
        fragment.appendChild(div);

        // Technique from Juriy Zaytsev
        // http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
        // We only care about the case where non-standard event systems
        // are used, namely in IE. Short-circuiting here helps us to
        // avoid an eval call (in setAttribute) which can cause CSP
        // to go haywire. See: https://developer.mozilla.org/en/Security/CSP
        if (div.attachEvent) {
            for (i in {
                submit:true,
                change:true,
                focusin:true
            }) {
                eventName = "on" + i;
                isSupported = ( eventName in div );
                if (!isSupported) {
                    div.setAttribute(eventName, "return;");
                    isSupported = ( typeof div[ eventName ] === "function" );
                }
                support[ i + "Bubbles" ] = isSupported;
            }
        }

        // Run tests that need a body at doc ready
        jQuery(function () {
            var container, div, tds, marginDiv,
                divReset = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
                body = document.getElementsByTagName("body")[0];

            if (!body) {
                // Return for frameset docs that don't have a body
                return;
            }

            container = document.createElement("div");
            container.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px";
            body.insertBefore(container, body.firstChild);

            // Construct the test element
            div = document.createElement("div");
            container.appendChild(div);

            // Check if table cells still have offsetWidth/Height when they are set
            // to display:none and there are still other visible table cells in a
            // table row; if so, offsetWidth/Height are not reliable for use when
            // determining if an element has been hidden directly using
            // display:none (it is still safe to use offsets if a parent element is
            // hidden; don safety goggles and see bug #4512 for more information).
            // (only IE 8 fails this test)
            div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
            tds = div.getElementsByTagName("td");
            tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
            isSupported = ( tds[ 0 ].offsetHeight === 0 );

            tds[ 0 ].style.display = "";
            tds[ 1 ].style.display = "none";

            // Check if empty table cells still have offsetWidth/Height
            // (IE <= 8 fail this test)
            support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

            // Check box-sizing and margin behavior
            div.innerHTML = "";
            div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
            support.boxSizing = ( div.offsetWidth === 4 );
            support.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== 1 );

            // NOTE: To any future maintainer, we've window.getComputedStyle
            // because jsdom on node.js will break without it.
            if (window.getComputedStyle) {
                support.pixelPosition = ( window.getComputedStyle(div, null) || {} ).top !== "1%";
                support.boxSizingReliable = ( window.getComputedStyle(div, null) || { width:"4px" } ).width === "4px";

                // Check if div with explicit width and no margin-right incorrectly
                // gets computed margin-right based on width of container. For more
                // info see bug #3333
                // Fails in WebKit before Feb 2011 nightlies
                // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
                marginDiv = document.createElement("div");
                marginDiv.style.cssText = div.style.cssText = divReset;
                marginDiv.style.marginRight = marginDiv.style.width = "0";
                div.style.width = "1px";
                div.appendChild(marginDiv);
                support.reliableMarginRight =
                    !parseFloat(( window.getComputedStyle(marginDiv, null) || {} ).marginRight);
            }

            if (typeof div.style.zoom !== "undefined") {
                // Check if natively block-level elements act like inline-block
                // elements when setting their display to 'inline' and giving
                // them layout
                // (IE < 8 does this)
                div.innerHTML = "";
                div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
                support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

                // Check if elements with layout shrink-wrap their children
                // (IE 6 does this)
                div.style.display = "block";
                div.style.overflow = "visible";
                div.innerHTML = "<div></div>";
                div.firstChild.style.width = "5px";
                support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );

                container.style.zoom = 1;
            }

            // Null elements to avoid leaks in IE
            body.removeChild(container);
            container = div = tds = marginDiv = null;
        });

        // Null elements to avoid leaks in IE
        fragment.removeChild(div);
        all = a = select = opt = input = fragment = div = null;

        return support;
    })();
    var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        rmultiDash = /([A-Z])/g;

    jQuery.extend({
        cache:{},

        deletedIds:[],

        // Remove at next major release (1.9/2.0)
        uuid:0,

        // Unique for each copy of jQuery on the page
        // Non-digits removed to match rinlinejQuery
        expando:"jQuery" + ( jQuery.fn.jquery + Math.random() ).replace(/\D/g, ""),

        // The following elements throw uncatchable exceptions if you
        // attempt to add expando properties to them.
        noData:{
            "embed":true,
            // Ban all objects except for Flash (which handle expandos)
            "object":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            "applet":true
        },

        hasData:function (elem) {
            elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
            return !!elem && !isEmptyDataObject(elem);
        },

        data:function (elem, name, data, pvt /* Internal Use Only */) {
            if (!jQuery.acceptData(elem)) {
                return;
            }

            var thisCache, ret,
                internalKey = jQuery.expando,
                getByName = typeof name === "string",

            // We have to handle DOM nodes and JS objects differently because IE6-7
            // can't GC object references properly across the DOM-JS boundary
                isNode = elem.nodeType,

            // Only DOM nodes need the global jQuery cache; JS object data is
            // attached directly to the object so GC can occur automatically
                cache = isNode ? jQuery.cache : elem,

            // Only defining an ID for JS objects if its cache already exists allows
            // the code to shortcut on the same path as a DOM node with no cache
                id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

            // Avoid doing any more work than we need to when trying to get data on an
            // object that has no data at all
            if ((!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined) {
                return;
            }

            if (!id) {
                // Only DOM nodes need a new unique ID for each element since their data
                // ends up in the global cache
                if (isNode) {
                    elem[ internalKey ] = id = jQuery.deletedIds.pop() || jQuery.guid++;
                } else {
                    id = internalKey;
                }
            }

            if (!cache[ id ]) {
                cache[ id ] = {};

                // Avoids exposing jQuery metadata on plain JS objects when the object
                // is serialized using JSON.stringify
                if (!isNode) {
                    cache[ id ].toJSON = jQuery.noop;
                }
            }

            // An object can be passed to jQuery.data instead of a key/value pair; this gets
            // shallow copied over onto the existing cache
            if (typeof name === "object" || typeof name === "function") {
                if (pvt) {
                    cache[ id ] = jQuery.extend(cache[ id ], name);
                } else {
                    cache[ id ].data = jQuery.extend(cache[ id ].data, name);
                }
            }

            thisCache = cache[ id ];

            // jQuery data() is stored in a separate object inside the object's internal data
            // cache in order to avoid key collisions between internal data and user-defined
            // data.
            if (!pvt) {
                if (!thisCache.data) {
                    thisCache.data = {};
                }

                thisCache = thisCache.data;
            }

            if (data !== undefined) {
                thisCache[ jQuery.camelCase(name) ] = data;
            }

            // Check for both converted-to-camel and non-converted data property names
            // If a data property was specified
            if (getByName) {

                // First Try to find as-is property data
                ret = thisCache[ name ];

                // Test for null|undefined property data
                if (ret == null) {

                    // Try to find the camelCased property
                    ret = thisCache[ jQuery.camelCase(name) ];
                }
            } else {
                ret = thisCache;
            }

            return ret;
        },

        removeData:function (elem, name, pvt /* Internal Use Only */) {
            if (!jQuery.acceptData(elem)) {
                return;
            }

            var thisCache, i, l,

                isNode = elem.nodeType,

            // See jQuery.data for more information
                cache = isNode ? jQuery.cache : elem,
                id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

            // If there is already no cache entry for this object, there is no
            // purpose in continuing
            if (!cache[ id ]) {
                return;
            }

            if (name) {

                thisCache = pvt ? cache[ id ] : cache[ id ].data;

                if (thisCache) {

                    // Support array or space separated string names for data keys
                    if (!jQuery.isArray(name)) {

                        // try the string as a key before any manipulation
                        if (name in thisCache) {
                            name = [ name ];
                        } else {

                            // split the camel cased version by spaces unless a key with the spaces exists
                            name = jQuery.camelCase(name);
                            if (name in thisCache) {
                                name = [ name ];
                            } else {
                                name = name.split(" ");
                            }
                        }
                    }

                    for (i = 0, l = name.length; i < l; i++) {
                        delete thisCache[ name[i] ];
                    }

                    // If there is no data left in the cache, we want to continue
                    // and let the cache object itself get destroyed
                    if (!( pvt ? isEmptyDataObject : jQuery.isEmptyObject )(thisCache)) {
                        return;
                    }
                }
            }

            // See jQuery.data for more information
            if (!pvt) {
                delete cache[ id ].data;

                // Don't destroy the parent cache unless the internal data object
                // had been the only thing left in it
                if (!isEmptyDataObject(cache[ id ])) {
                    return;
                }
            }

            // Destroy the cache
            if (isNode) {
                jQuery.cleanData([ elem ], true);

                // Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
            } else if (jQuery.support.deleteExpando || cache != cache.window) {
                delete cache[ id ];

                // When all else fails, null
            } else {
                cache[ id ] = null;
            }
        },

        // For internal use only.
        _data:function (elem, name, data) {
            return jQuery.data(elem, name, data, true);
        },

        // A method for determining if a DOM node can handle the data expando
        acceptData:function (elem) {
            var noData = elem.nodeName && jQuery.noData[ elem.nodeName.toLowerCase() ];

            // nodes accept data unless otherwise specified; rejection can be conditional
            return !noData || noData !== true && elem.getAttribute("classid") === noData;
        }
    });

    jQuery.fn.extend({
        data:function (key, value) {
            var parts, part, attr, name, l,
                elem = this[0],
                i = 0,
                data = null;

            // Gets all values
            if (key === undefined) {
                if (this.length) {
                    data = jQuery.data(elem);

                    if (elem.nodeType === 1 && !jQuery._data(elem, "parsedAttrs")) {
                        attr = elem.attributes;
                        for (l = attr.length; i < l; i++) {
                            name = attr[i].name;

                            if (!name.indexOf("data-")) {
                                name = jQuery.camelCase(name.substring(5));

                                dataAttr(elem, name, data[ name ]);
                            }
                        }
                        jQuery._data(elem, "parsedAttrs", true);
                    }
                }

                return data;
            }

            // Sets multiple values
            if (typeof key === "object") {
                return this.each(function () {
                    jQuery.data(this, key);
                });
            }

            parts = key.split(".", 2);
            parts[1] = parts[1] ? "." + parts[1] : "";
            part = parts[1] + "!";

            return jQuery.access(this, function (value) {

                if (value === undefined) {
                    data = this.triggerHandler("getData" + part, [ parts[0] ]);

                    // Try to fetch any internally stored data first
                    if (data === undefined && elem) {
                        data = jQuery.data(elem, key);
                        data = dataAttr(elem, key, data);
                    }

                    return data === undefined && parts[1] ?
                        this.data(parts[0]) :
                        data;
                }

                parts[1] = value;
                this.each(function () {
                    var self = jQuery(this);

                    self.triggerHandler("setData" + part, parts);
                    jQuery.data(this, key, value);
                    self.triggerHandler("changeData" + part, parts);
                });
            }, null, value, arguments.length > 1, null, false);
        },

        removeData:function (key) {
            return this.each(function () {
                jQuery.removeData(this, key);
            });
        }
    });

    function dataAttr(elem, key, data) {
        // If nothing was found internally, try to fetch any
        // data from the HTML5 data-* attribute
        if (data === undefined && elem.nodeType === 1) {

            var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();

            data = elem.getAttribute(name);

            if (typeof data === "string") {
                try {
                    data = data === "true" ? true :
                        data === "false" ? false :
                            data === "null" ? null :
                                // Only convert to a number if it doesn't change the string
                                +data + "" === data ? +data :
                                    rbrace.test(data) ? jQuery.parseJSON(data) :
                                        data;
                } catch (e) {
                }

                // Make sure we set the data so it isn't changed later
                jQuery.data(elem, key, data);

            } else {
                data = undefined;
            }
        }

        return data;
    }

// checks a cache object for emptiness
    function isEmptyDataObject(obj) {
        var name;
        for (name in obj) {

            // if the public data object is empty, the private is still empty
            if (name === "data" && jQuery.isEmptyObject(obj[name])) {
                continue;
            }
            if (name !== "toJSON") {
                return false;
            }
        }

        return true;
    }

    jQuery.extend({
        queue:function (elem, type, data) {
            var queue;

            if (elem) {
                type = ( type || "fx" ) + "queue";
                queue = jQuery._data(elem, type);

                // Speed up dequeue by getting out quickly if this is just a lookup
                if (data) {
                    if (!queue || jQuery.isArray(data)) {
                        queue = jQuery._data(elem, type, jQuery.makeArray(data));
                    } else {
                        queue.push(data);
                    }
                }
                return queue || [];
            }
        },

        dequeue:function (elem, type) {
            type = type || "fx";

            var queue = jQuery.queue(elem, type),
                startLength = queue.length,
                fn = queue.shift(),
                hooks = jQuery._queueHooks(elem, type),
                next = function () {
                    jQuery.dequeue(elem, type);
                };

            // If the fx queue is dequeued, always remove the progress sentinel
            if (fn === "inprogress") {
                fn = queue.shift();
                startLength--;
            }

            if (fn) {

                // Add a progress sentinel to prevent the fx queue from being
                // automatically dequeued
                if (type === "fx") {
                    queue.unshift("inprogress");
                }

                // clear up the last queue stop function
                delete hooks.stop;
                fn.call(elem, next, hooks);
            }

            if (!startLength && hooks) {
                hooks.empty.fire();
            }
        },

        // not intended for public consumption - generates a queueHooks object, or returns the current one
        _queueHooks:function (elem, type) {
            var key = type + "queueHooks";
            return jQuery._data(elem, key) || jQuery._data(elem, key, {
                empty:jQuery.Callbacks("once memory").add(function () {
                    jQuery.removeData(elem, type + "queue", true);
                    jQuery.removeData(elem, key, true);
                })
            });
        }
    });

    jQuery.fn.extend({
        queue:function (type, data) {
            var setter = 2;

            if (typeof type !== "string") {
                data = type;
                type = "fx";
                setter--;
            }

            if (arguments.length < setter) {
                return jQuery.queue(this[0], type);
            }

            return data === undefined ?
                this :
                this.each(function () {
                    var queue = jQuery.queue(this, type, data);

                    // ensure a hooks for this queue
                    jQuery._queueHooks(this, type);

                    if (type === "fx" && queue[0] !== "inprogress") {
                        jQuery.dequeue(this, type);
                    }
                });
        },
        dequeue:function (type) {
            return this.each(function () {
                jQuery.dequeue(this, type);
            });
        },
        // Based off of the plugin by Clint Helfers, with permission.
        // http://blindsignals.com/index.php/2009/07/jquery-delay/
        delay:function (time, type) {
            time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
            type = type || "fx";

            return this.queue(type, function (next, hooks) {
                var timeout = setTimeout(next, time);
                hooks.stop = function () {
                    clearTimeout(timeout);
                };
            });
        },
        clearQueue:function (type) {
            return this.queue(type || "fx", []);
        },
        // Get a promise resolved when queues of a certain type
        // are emptied (fx is the type by default)
        promise:function (type, obj) {
            var tmp,
                count = 1,
                defer = jQuery.Deferred(),
                elements = this,
                i = this.length,
                resolve = function () {
                    if (!( --count )) {
                        defer.resolveWith(elements, [ elements ]);
                    }
                };

            if (typeof type !== "string") {
                obj = type;
                type = undefined;
            }
            type = type || "fx";

            while (i--) {
                tmp = jQuery._data(elements[ i ], type + "queueHooks");
                if (tmp && tmp.empty) {
                    count++;
                    tmp.empty.add(resolve);
                }
            }
            resolve();
            return defer.promise(obj);
        }
    });
    var nodeHook, boolHook, fixSpecified,
        rclass = /[\t\r\n]/g,
        rreturn = /\r/g,
        rtype = /^(?:button|input)$/i,
        rfocusable = /^(?:button|input|object|select|textarea)$/i,
        rclickable = /^a(?:rea|)$/i,
        rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        getSetAttribute = jQuery.support.getSetAttribute;

    jQuery.fn.extend({
        attr:function (name, value) {
            return jQuery.access(this, jQuery.attr, name, value, arguments.length > 1);
        },

        removeAttr:function (name) {
            return this.each(function () {
                jQuery.removeAttr(this, name);
            });
        },

        prop:function (name, value) {
            return jQuery.access(this, jQuery.prop, name, value, arguments.length > 1);
        },

        removeProp:function (name) {
            name = jQuery.propFix[ name ] || name;
            return this.each(function () {
                // try/catch handles cases where IE balks (such as removing a property on window)
                try {
                    this[ name ] = undefined;
                    delete this[ name ];
                } catch (e) {
                }
            });
        },

        addClass:function (value) {
            var classNames, i, l, elem,
                setClass, c, cl;

            if (jQuery.isFunction(value)) {
                return this.each(function (j) {
                    jQuery(this).addClass(value.call(this, j, this.className));
                });
            }

            if (value && typeof value === "string") {
                classNames = value.split(core_rspace);

                for (i = 0, l = this.length; i < l; i++) {
                    elem = this[ i ];

                    if (elem.nodeType === 1) {
                        if (!elem.className && classNames.length === 1) {
                            elem.className = value;

                        } else {
                            setClass = " " + elem.className + " ";

                            for (c = 0, cl = classNames.length; c < cl; c++) {
                                if (setClass.indexOf(" " + classNames[ c ] + " ") < 0) {
                                    setClass += classNames[ c ] + " ";
                                }
                            }
                            elem.className = jQuery.trim(setClass);
                        }
                    }
                }
            }

            return this;
        },

        removeClass:function (value) {
            var removes, className, elem, c, cl, i, l;

            if (jQuery.isFunction(value)) {
                return this.each(function (j) {
                    jQuery(this).removeClass(value.call(this, j, this.className));
                });
            }
            if ((value && typeof value === "string") || value === undefined) {
                removes = ( value || "" ).split(core_rspace);

                for (i = 0, l = this.length; i < l; i++) {
                    elem = this[ i ];
                    if (elem.nodeType === 1 && elem.className) {

                        className = (" " + elem.className + " ").replace(rclass, " ");

                        // loop over each item in the removal list
                        for (c = 0, cl = removes.length; c < cl; c++) {
                            // Remove until there is nothing to remove,
                            while (className.indexOf(" " + removes[ c ] + " ") >= 0) {
                                className = className.replace(" " + removes[ c ] + " ", " ");
                            }
                        }
                        elem.className = value ? jQuery.trim(className) : "";
                    }
                }
            }

            return this;
        },

        toggleClass:function (value, stateVal) {
            var type = typeof value,
                isBool = typeof stateVal === "boolean";

            if (jQuery.isFunction(value)) {
                return this.each(function (i) {
                    jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
                });
            }

            return this.each(function () {
                if (type === "string") {
                    // toggle individual class names
                    var className,
                        i = 0,
                        self = jQuery(this),
                        state = stateVal,
                        classNames = value.split(core_rspace);

                    while ((className = classNames[ i++ ])) {
                        // check each className given, space separated list
                        state = isBool ? state : !self.hasClass(className);
                        self[ state ? "addClass" : "removeClass" ](className);
                    }

                } else if (type === "undefined" || type === "boolean") {
                    if (this.className) {
                        // store className if set
                        jQuery._data(this, "__className__", this.className);
                    }

                    // toggle whole className
                    this.className = this.className || value === false ? "" : jQuery._data(this, "__className__") || "";
                }
            });
        },

        hasClass:function (selector) {
            var className = " " + selector + " ",
                i = 0,
                l = this.length;
            for (; i < l; i++) {
                if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) {
                    return true;
                }
            }

            return false;
        },

        val:function (value) {
            var hooks, ret, isFunction,
                elem = this[0];

            if (!arguments.length) {
                if (elem) {
                    hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

                    if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
                        return ret;
                    }

                    ret = elem.value;

                    return typeof ret === "string" ?
                        // handle most common string cases
                        ret.replace(rreturn, "") :
                        // handle cases where value is null/undef or number
                        ret == null ? "" : ret;
                }

                return;
            }

            isFunction = jQuery.isFunction(value);

            return this.each(function (i) {
                var val,
                    self = jQuery(this);

                if (this.nodeType !== 1) {
                    return;
                }

                if (isFunction) {
                    val = value.call(this, i, self.val());
                } else {
                    val = value;
                }

                // Treat null/undefined as ""; convert numbers to string
                if (val == null) {
                    val = "";
                } else if (typeof val === "number") {
                    val += "";
                } else if (jQuery.isArray(val)) {
                    val = jQuery.map(val, function (value) {
                        return value == null ? "" : value + "";
                    });
                }

                hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

                // If set returns undefined, fall back to normal setting
                if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
                    this.value = val;
                }
            });
        }
    });

    jQuery.extend({
        valHooks:{
            option:{
                get:function (elem) {
                    // attributes.value is undefined in Blackberry 4.7 but
                    // uses .value. See #6932
                    var val = elem.attributes.value;
                    return !val || val.specified ? elem.value : elem.text;
                }
            },
            select:{
                get:function (elem) {
                    var value, i, max, option,
                        index = elem.selectedIndex,
                        values = [],
                        options = elem.options,
                        one = elem.type === "select-one";

                    // Nothing was selected
                    if (index < 0) {
                        return null;
                    }

                    // Loop through all the selected options
                    i = one ? index : 0;
                    max = one ? index + 1 : options.length;
                    for (; i < max; i++) {
                        option = options[ i ];

                        // Don't return options that are disabled or in a disabled optgroup
                        if (option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) &&
                            (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {

                            // Get the specific value for the option
                            value = jQuery(option).val();

                            // We don't need an array for one selects
                            if (one) {
                                return value;
                            }

                            // Multi-Selects return an array
                            values.push(value);
                        }
                    }

                    // Fixes Bug #2551 -- select.val() broken in IE after form.reset()
                    if (one && !values.length && options.length) {
                        return jQuery(options[ index ]).val();
                    }

                    return values;
                },

                set:function (elem, value) {
                    var values = jQuery.makeArray(value);

                    jQuery(elem).find("option").each(function () {
                        this.selected = jQuery.inArray(jQuery(this).val(), values) >= 0;
                    });

                    if (!values.length) {
                        elem.selectedIndex = -1;
                    }
                    return values;
                }
            }
        },

        // Unused in 1.8, left in so attrFn-stabbers won't die; remove in 1.9
        attrFn:{},

        attr:function (elem, name, value, pass) {
            var ret, hooks, notxml,
                nType = elem.nodeType;

            // don't get/set attributes on text, comment and attribute nodes
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return;
            }

            if (pass && jQuery.isFunction(jQuery.fn[ name ])) {
                return jQuery(elem)[ name ](value);
            }

            // Fallback to prop when attributes are not supported
            if (typeof elem.getAttribute === "undefined") {
                return jQuery.prop(elem, name, value);
            }

            notxml = nType !== 1 || !jQuery.isXMLDoc(elem);

            // All attributes are lowercase
            // Grab necessary hook if one is defined
            if (notxml) {
                name = name.toLowerCase();
                hooks = jQuery.attrHooks[ name ] || ( rboolean.test(name) ? boolHook : nodeHook );
            }

            if (value !== undefined) {

                if (value === null) {
                    jQuery.removeAttr(elem, name);
                    return;

                } else if (hooks && "set" in hooks && notxml && (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret;

                } else {
                    elem.setAttribute(name, value + "");
                    return value;
                }

            } else if (hooks && "get" in hooks && notxml && (ret = hooks.get(elem, name)) !== null) {
                return ret;

            } else {

                ret = elem.getAttribute(name);

                // Non-existent attributes return null, we normalize to undefined
                return ret === null ?
                    undefined :
                    ret;
            }
        },

        removeAttr:function (elem, value) {
            var propName, attrNames, name, isBool,
                i = 0;

            if (value && elem.nodeType === 1) {

                attrNames = value.split(core_rspace);

                for (; i < attrNames.length; i++) {
                    name = attrNames[ i ];

                    if (name) {
                        propName = jQuery.propFix[ name ] || name;
                        isBool = rboolean.test(name);

                        // See #9699 for explanation of this approach (setting first, then removal)
                        // Do not do this for boolean attributes (see #10870)
                        if (!isBool) {
                            jQuery.attr(elem, name, "");
                        }
                        elem.removeAttribute(getSetAttribute ? name : propName);

                        // Set corresponding property to false for boolean attributes
                        if (isBool && propName in elem) {
                            elem[ propName ] = false;
                        }
                    }
                }
            }
        },

        attrHooks:{
            type:{
                set:function (elem, value) {
                    // We can't allow the type property to be changed (since it causes problems in IE)
                    if (rtype.test(elem.nodeName) && elem.parentNode) {
                        jQuery.error("type property can't be changed");
                    } else if (!jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
                        // Setting the type on a radio button after the value resets the value in IE6-9
                        // Reset value to it's default in case type is set after value
                        // This is for element creation
                        var val = elem.value;
                        elem.setAttribute("type", value);
                        if (val) {
                            elem.value = val;
                        }
                        return value;
                    }
                }
            },
            // Use the value property for back compat
            // Use the nodeHook for button elements in IE6/7 (#1954)
            value:{
                get:function (elem, name) {
                    if (nodeHook && jQuery.nodeName(elem, "button")) {
                        return nodeHook.get(elem, name);
                    }
                    return name in elem ?
                        elem.value :
                        null;
                },
                set:function (elem, value, name) {
                    if (nodeHook && jQuery.nodeName(elem, "button")) {
                        return nodeHook.set(elem, value, name);
                    }
                    // Does not return so that setAttribute is also used
                    elem.value = value;
                }
            }
        },

        propFix:{
            tabindex:"tabIndex",
            readonly:"readOnly",
            "for":"htmlFor",
            "class":"className",
            maxlength:"maxLength",
            cellspacing:"cellSpacing",
            cellpadding:"cellPadding",
            rowspan:"rowSpan",
            colspan:"colSpan",
            usemap:"useMap",
            frameborder:"frameBorder",
            contenteditable:"contentEditable"
        },

        prop:function (elem, name, value) {
            var ret, hooks, notxml,
                nType = elem.nodeType;

            // don't get/set properties on text, comment and attribute nodes
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return;
            }

            notxml = nType !== 1 || !jQuery.isXMLDoc(elem);

            if (notxml) {
                // Fix name and attach hooks
                name = jQuery.propFix[ name ] || name;
                hooks = jQuery.propHooks[ name ];
            }

            if (value !== undefined) {
                if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret;

                } else {
                    return ( elem[ name ] = value );
                }

            } else {
                if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                    return ret;

                } else {
                    return elem[ name ];
                }
            }
        },

        propHooks:{
            tabIndex:{
                get:function (elem) {
                    // elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
                    // http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
                    var attributeNode = elem.getAttributeNode("tabindex");

                    return attributeNode && attributeNode.specified ?
                        parseInt(attributeNode.value, 10) :
                        rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ?
                            0 :
                            undefined;
                }
            }
        }
    });

// Hook for boolean attributes
    boolHook = {
        get:function (elem, name) {
            // Align boolean attributes with corresponding properties
            // Fall back to attribute presence where some booleans are not supported
            var attrNode,
                property = jQuery.prop(elem, name);
            return property === true || typeof property !== "boolean" && ( attrNode = elem.getAttributeNode(name) ) && attrNode.nodeValue !== false ?
                name.toLowerCase() :
                undefined;
        },
        set:function (elem, value, name) {
            var propName;
            if (value === false) {
                // Remove boolean attributes when set to false
                jQuery.removeAttr(elem, name);
            } else {
                // value is true since we know at this point it's type boolean and not false
                // Set boolean attributes to the same name and set the DOM property
                propName = jQuery.propFix[ name ] || name;
                if (propName in elem) {
                    // Only set the IDL specifically if it already exists on the element
                    elem[ propName ] = true;
                }

                elem.setAttribute(name, name.toLowerCase());
            }
            return name;
        }
    };

// IE6/7 do not support getting/setting some attributes with get/setAttribute
    if (!getSetAttribute) {

        fixSpecified = {
            name:true,
            id:true,
            coords:true
        };

        // Use this for any attribute in IE6/7
        // This fixes almost every IE6/7 issue
        nodeHook = jQuery.valHooks.button = {
            get:function (elem, name) {
                var ret;
                ret = elem.getAttributeNode(name);
                return ret && ( fixSpecified[ name ] ? ret.value !== "" : ret.specified ) ?
                    ret.value :
                    undefined;
            },
            set:function (elem, value, name) {
                // Set the existing or create a new attribute node
                var ret = elem.getAttributeNode(name);
                if (!ret) {
                    ret = document.createAttribute(name);
                    elem.setAttributeNode(ret);
                }
                return ( ret.value = value + "" );
            }
        };

        // Set width and height to auto instead of 0 on empty string( Bug #8150 )
        // This is for removals
        jQuery.each([ "width", "height" ], function (i, name) {
            jQuery.attrHooks[ name ] = jQuery.extend(jQuery.attrHooks[ name ], {
                set:function (elem, value) {
                    if (value === "") {
                        elem.setAttribute(name, "auto");
                        return value;
                    }
                }
            });
        });

        // Set contenteditable to false on removals(#10429)
        // Setting to empty string throws an error as an invalid value
        jQuery.attrHooks.contenteditable = {
            get:nodeHook.get,
            set:function (elem, value, name) {
                if (value === "") {
                    value = "false";
                }
                nodeHook.set(elem, value, name);
            }
        };
    }


// Some attributes require a special call on IE
    if (!jQuery.support.hrefNormalized) {
        jQuery.each([ "href", "src", "width", "height" ], function (i, name) {
            jQuery.attrHooks[ name ] = jQuery.extend(jQuery.attrHooks[ name ], {
                get:function (elem) {
                    var ret = elem.getAttribute(name, 2);
                    return ret === null ? undefined : ret;
                }
            });
        });
    }

    if (!jQuery.support.style) {
        jQuery.attrHooks.style = {
            get:function (elem) {
                // Return undefined in the case of empty string
                // Normalize to lowercase since IE uppercases css property names
                return elem.style.cssText.toLowerCase() || undefined;
            },
            set:function (elem, value) {
                return ( elem.style.cssText = value + "" );
            }
        };
    }

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
    if (!jQuery.support.optSelected) {
        jQuery.propHooks.selected = jQuery.extend(jQuery.propHooks.selected, {
            get:function (elem) {
                var parent = elem.parentNode;

                if (parent) {
                    parent.selectedIndex;

                    // Make sure that it also works with optgroups, see #5701
                    if (parent.parentNode) {
                        parent.parentNode.selectedIndex;
                    }
                }
                return null;
            }
        });
    }

// IE6/7 call enctype encoding
    if (!jQuery.support.enctype) {
        jQuery.propFix.enctype = "encoding";
    }

// Radios and checkboxes getter/setter
    if (!jQuery.support.checkOn) {
        jQuery.each([ "radio", "checkbox" ], function () {
            jQuery.valHooks[ this ] = {
                get:function (elem) {
                    // Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
                    return elem.getAttribute("value") === null ? "on" : elem.value;
                }
            };
        });
    }
    jQuery.each([ "radio", "checkbox" ], function () {
        jQuery.valHooks[ this ] = jQuery.extend(jQuery.valHooks[ this ], {
            set:function (elem, value) {
                if (jQuery.isArray(value)) {
                    return ( elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0 );
                }
            }
        });
    });
    var rformElems = /^(?:textarea|input|select)$/i,
        rtypenamespace = /^([^\.]*|)(?:\.(.+)|)$/,
        rhoverHack = /(?:^|\s)hover(\.\S+|)\b/,
        rkeyEvent = /^key/,
        rmouseEvent = /^(?:mouse|contextmenu)|click/,
        rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
        hoverHack = function (events) {
            return jQuery.event.special.hover ? events : events.replace(rhoverHack, "mouseenter$1 mouseleave$1");
        };

    /*
     * Helper functions for managing events -- not part of the public interface.
     * Props to Dean Edwards' addEvent library for many of the ideas.
     */
    jQuery.event = {

        add:function (elem, types, handler, data, selector) {

            var elemData, eventHandle, events,
                t, tns, type, namespaces, handleObj,
                handleObjIn, handlers, special;

            // Don't attach events to noData or text/comment nodes (allow plain objects tho)
            if (elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = jQuery._data(elem))) {
                return;
            }

            // Caller can pass in an object of custom data in lieu of the handler
            if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector;
            }

            // Make sure that the handler has a unique ID, used to find/remove it later
            if (!handler.guid) {
                handler.guid = jQuery.guid++;
            }

            // Init the element's event structure and main handler, if this is the first
            events = elemData.events;
            if (!events) {
                elemData.events = events = {};
            }
            eventHandle = elemData.handle;
            if (!eventHandle) {
                elemData.handle = eventHandle = function (e) {
                    // Discard the second event of a jQuery.event.trigger() and
                    // when an event is called after a page has unloaded
                    return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ?
                        jQuery.event.dispatch.apply(eventHandle.elem, arguments) :
                        undefined;
                };
                // Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
                eventHandle.elem = elem;
            }

            // Handle multiple events separated by a space
            // jQuery(...).bind("mouseover mouseout", fn);
            types = jQuery.trim(hoverHack(types)).split(" ");
            for (t = 0; t < types.length; t++) {

                tns = rtypenamespace.exec(types[t]) || [];
                type = tns[1];
                namespaces = ( tns[2] || "" ).split(".").sort();

                // If event changes its type, use the special event handlers for the changed type
                special = jQuery.event.special[ type ] || {};

                // If selector defined, determine special event api type, otherwise given type
                type = ( selector ? special.delegateType : special.bindType ) || type;

                // Update special based on newly reset type
                special = jQuery.event.special[ type ] || {};

                // handleObj is passed to all event handlers
                handleObj = jQuery.extend({
                    type:type,
                    origType:tns[1],
                    data:data,
                    handler:handler,
                    guid:handler.guid,
                    selector:selector,
                    needsContext:selector && jQuery.expr.match.needsContext.test(selector),
                    namespace:namespaces.join(".")
                }, handleObjIn);

                // Init the event handler queue if we're the first
                handlers = events[ type ];
                if (!handlers) {
                    handlers = events[ type ] = [];
                    handlers.delegateCount = 0;

                    // Only use addEventListener/attachEvent if the special events handler returns false
                    if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                        // Bind the global event handler to the element
                        if (elem.addEventListener) {
                            elem.addEventListener(type, eventHandle, false);

                        } else if (elem.attachEvent) {
                            elem.attachEvent("on" + type, eventHandle);
                        }
                    }
                }

                if (special.add) {
                    special.add.call(elem, handleObj);

                    if (!handleObj.handler.guid) {
                        handleObj.handler.guid = handler.guid;
                    }
                }

                // Add to the element's handler list, delegates in front
                if (selector) {
                    handlers.splice(handlers.delegateCount++, 0, handleObj);
                } else {
                    handlers.push(handleObj);
                }

                // Keep track of which events have ever been used, for event optimization
                jQuery.event.global[ type ] = true;
            }

            // Nullify elem to prevent memory leaks in IE
            elem = null;
        },

        global:{},

        // Detach an event or set of events from an element
        remove:function (elem, types, handler, selector, mappedTypes) {

            var t, tns, type, origType, namespaces, origCount,
                j, events, special, eventType, handleObj,
                elemData = jQuery.hasData(elem) && jQuery._data(elem);

            if (!elemData || !(events = elemData.events)) {
                return;
            }

            // Once for each type.namespace in types; type may be omitted
            types = jQuery.trim(hoverHack(types || "")).split(" ");
            for (t = 0; t < types.length; t++) {
                tns = rtypenamespace.exec(types[t]) || [];
                type = origType = tns[1];
                namespaces = tns[2];

                // Unbind all events (on this namespace, if provided) for the element
                if (!type) {
                    for (type in events) {
                        jQuery.event.remove(elem, type + types[ t ], handler, selector, true);
                    }
                    continue;
                }

                special = jQuery.event.special[ type ] || {};
                type = ( selector ? special.delegateType : special.bindType ) || type;
                eventType = events[ type ] || [];
                origCount = eventType.length;
                namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

                // Remove matching events
                for (j = 0; j < eventType.length; j++) {
                    handleObj = eventType[ j ];

                    if (( mappedTypes || origType === handleObj.origType ) &&
                        ( !handler || handler.guid === handleObj.guid ) &&
                        ( !namespaces || namespaces.test(handleObj.namespace) ) &&
                        ( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector )) {
                        eventType.splice(j--, 1);

                        if (handleObj.selector) {
                            eventType.delegateCount--;
                        }
                        if (special.remove) {
                            special.remove.call(elem, handleObj);
                        }
                    }
                }

                // Remove generic event handler if we removed something and no more handlers exist
                // (avoids potential for endless recursion during removal of special event handlers)
                if (eventType.length === 0 && origCount !== eventType.length) {
                    if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                        jQuery.removeEvent(elem, type, elemData.handle);
                    }

                    delete events[ type ];
                }
            }

            // Remove the expando if it's no longer used
            if (jQuery.isEmptyObject(events)) {
                delete elemData.handle;

                // removeData also checks for emptiness and clears the expando if empty
                // so use it instead of delete
                jQuery.removeData(elem, "events", true);
            }
        },

        // Events that are safe to short-circuit if no handlers are attached.
        // Native DOM events should not be added, they may have inline handlers.
        customEvent:{
            "getData":true,
            "setData":true,
            "changeData":true
        },

        trigger:function (event, data, elem, onlyHandlers) {
            // Don't do events on text and comment nodes
            if (elem && (elem.nodeType === 3 || elem.nodeType === 8)) {
                return;
            }

            // Event object or event type
            var cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType,
                type = event.type || event,
                namespaces = [];

            // focus/blur morphs to focusin/out; ensure we're not firing them right now
            if (rfocusMorph.test(type + jQuery.event.triggered)) {
                return;
            }

            if (type.indexOf("!") >= 0) {
                // Exclusive events trigger only for the exact event (no namespaces)
                type = type.slice(0, -1);
                exclusive = true;
            }

            if (type.indexOf(".") >= 0) {
                // Namespaced trigger; create a regexp to match event type in handle()
                namespaces = type.split(".");
                type = namespaces.shift();
                namespaces.sort();
            }

            if ((!elem || jQuery.event.customEvent[ type ]) && !jQuery.event.global[ type ]) {
                // No jQuery handlers for this event type, and it can't have inline handlers
                return;
            }

            // Caller can pass in an Event, Object, or just an event type string
            event = typeof event === "object" ?
                // jQuery.Event object
                event[ jQuery.expando ] ? event :
                    // Object literal
                    new jQuery.Event(type, event) :
                // Just the event type (string)
                new jQuery.Event(type);

            event.type = type;
            event.isTrigger = true;
            event.exclusive = exclusive;
            event.namespace = namespaces.join(".");
            event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
            ontype = type.indexOf(":") < 0 ? "on" + type : "";

            // Handle a global trigger
            if (!elem) {

                // TODO: Stop taunting the data cache; remove global events and always attach to document
                cache = jQuery.cache;
                for (i in cache) {
                    if (cache[ i ].events && cache[ i ].events[ type ]) {
                        jQuery.event.trigger(event, data, cache[ i ].handle.elem, true);
                    }
                }
                return;
            }

            // Clean up the event in case it is being reused
            event.result = undefined;
            if (!event.target) {
                event.target = elem;
            }

            // Clone any incoming data and prepend the event, creating the handler arg list
            data = data != null ? jQuery.makeArray(data) : [];
            data.unshift(event);

            // Allow special events to draw outside the lines
            special = jQuery.event.special[ type ] || {};
            if (special.trigger && special.trigger.apply(elem, data) === false) {
                return;
            }

            // Determine event propagation path in advance, per W3C events spec (#9951)
            // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
            eventPath = [
                [ elem, special.bindType || type ]
            ];
            if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {

                bubbleType = special.delegateType || type;
                cur = rfocusMorph.test(bubbleType + type) ? elem : elem.parentNode;
                for (old = elem; cur; cur = cur.parentNode) {
                    eventPath.push([ cur, bubbleType ]);
                    old = cur;
                }

                // Only add window if we got to document (e.g., not plain obj or detached DOM)
                if (old === (elem.ownerDocument || document)) {
                    eventPath.push([ old.defaultView || old.parentWindow || window, bubbleType ]);
                }
            }

            // Fire handlers on the event path
            for (i = 0; i < eventPath.length && !event.isPropagationStopped(); i++) {

                cur = eventPath[i][0];
                event.type = eventPath[i][1];

                handle = ( jQuery._data(cur, "events") || {} )[ event.type ] && jQuery._data(cur, "handle");
                if (handle) {
                    handle.apply(cur, data);
                }
                // Note that this is a bare JS function and not a jQuery handler
                handle = ontype && cur[ ontype ];
                if (handle && jQuery.acceptData(cur) && handle.apply && handle.apply(cur, data) === false) {
                    event.preventDefault();
                }
            }
            event.type = type;

            // If nobody prevented the default action, do it now
            if (!onlyHandlers && !event.isDefaultPrevented()) {

                if ((!special._default || special._default.apply(elem.ownerDocument, data) === false) &&
                    !(type === "click" && jQuery.nodeName(elem, "a")) && jQuery.acceptData(elem)) {

                    // Call a native DOM method on the target with the same name name as the event.
                    // Can't use an .isFunction() check here because IE6/7 fails that test.
                    // Don't do default actions on window, that's where global variables be (#6170)
                    // IE<9 dies on focus/blur to hidden element (#1486)
                    if (ontype && elem[ type ] && ((type !== "focus" && type !== "blur") || event.target.offsetWidth !== 0) && !jQuery.isWindow(elem)) {

                        // Don't re-trigger an onFOO event when we call its FOO() method
                        old = elem[ ontype ];

                        if (old) {
                            elem[ ontype ] = null;
                        }

                        // Prevent re-triggering of the same event, since we already bubbled it above
                        jQuery.event.triggered = type;
                        elem[ type ]();
                        jQuery.event.triggered = undefined;

                        if (old) {
                            elem[ ontype ] = old;
                        }
                    }
                }
            }

            return event.result;
        },

        dispatch:function (event) {

            // Make a writable jQuery.Event from the native event object
            event = jQuery.event.fix(event || window.event);

            var i, j, cur, ret, selMatch, matched, matches, handleObj, sel, related,
                handlers = ( (jQuery._data(this, "events") || {} )[ event.type ] || []),
                delegateCount = handlers.delegateCount,
                args = core_slice.call(arguments),
                run_all = !event.exclusive && !event.namespace,
                special = jQuery.event.special[ event.type ] || {},
                handlerQueue = [];

            // Use the fix-ed jQuery.Event rather than the (read-only) native event
            args[0] = event;
            event.delegateTarget = this;

            // Call the preDispatch hook for the mapped type, and let it bail if desired
            if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                return;
            }

            // Determine handlers that should run if there are delegated events
            // Avoid non-left-click bubbling in Firefox (#3861)
            if (delegateCount && !(event.button && event.type === "click")) {

                for (cur = event.target; cur != this; cur = cur.parentNode || this) {

                    // Don't process clicks (ONLY) on disabled elements (#6911, #8165, #11382, #11764)
                    if (cur.disabled !== true || event.type !== "click") {
                        selMatch = {};
                        matches = [];
                        for (i = 0; i < delegateCount; i++) {
                            handleObj = handlers[ i ];
                            sel = handleObj.selector;

                            if (selMatch[ sel ] === undefined) {
                                selMatch[ sel ] = handleObj.needsContext ?
                                    jQuery(sel, this).index(cur) >= 0 :
                                    jQuery.find(sel, this, null, [ cur ]).length;
                            }
                            if (selMatch[ sel ]) {
                                matches.push(handleObj);
                            }
                        }
                        if (matches.length) {
                            handlerQueue.push({ elem:cur, matches:matches });
                        }
                    }
                }
            }

            // Add the remaining (directly-bound) handlers
            if (handlers.length > delegateCount) {
                handlerQueue.push({ elem:this, matches:handlers.slice(delegateCount) });
            }

            // Run delegates first; they may want to stop propagation beneath us
            for (i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++) {
                matched = handlerQueue[ i ];
                event.currentTarget = matched.elem;

                for (j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++) {
                    handleObj = matched.matches[ j ];

                    // Triggered event must either 1) be non-exclusive and have no namespace, or
                    // 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
                    if (run_all || (!event.namespace && !handleObj.namespace) || event.namespace_re && event.namespace_re.test(handleObj.namespace)) {

                        event.data = handleObj.data;
                        event.handleObj = handleObj;

                        ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
                            .apply(matched.elem, args);

                        if (ret !== undefined) {
                            event.result = ret;
                            if (ret === false) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                    }
                }
            }

            // Call the postDispatch hook for the mapped type
            if (special.postDispatch) {
                special.postDispatch.call(this, event);
            }

            return event.result;
        },

        // Includes some event props shared by KeyEvent and MouseEvent
        // *** attrChange attrName relatedNode srcElement  are not normalized, non-W3C, deprecated, will be removed in 1.8 ***
        props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

        fixHooks:{},

        keyHooks:{
            props:"char charCode key keyCode".split(" "),
            filter:function (event, original) {

                // Add which for key events
                if (event.which == null) {
                    event.which = original.charCode != null ? original.charCode : original.keyCode;
                }

                return event;
            }
        },

        mouseHooks:{
            props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter:function (event, original) {
                var eventDoc, doc, body,
                    button = original.button,
                    fromElement = original.fromElement;

                // Calculate pageX/Y if missing and clientX/Y available
                if (event.pageX == null && original.clientX != null) {
                    eventDoc = event.target.ownerDocument || document;
                    doc = eventDoc.documentElement;
                    body = eventDoc.body;

                    event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
                    event.pageY = original.clientY + ( doc && doc.scrollTop || body && body.scrollTop || 0 ) - ( doc && doc.clientTop || body && body.clientTop || 0 );
                }

                // Add relatedTarget, if necessary
                if (!event.relatedTarget && fromElement) {
                    event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
                }

                // Add which for click: 1 === left; 2 === middle; 3 === right
                // Note: button is not normalized, so don't use it
                if (!event.which && button !== undefined) {
                    event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
                }

                return event;
            }
        },

        fix:function (event) {
            if (event[ jQuery.expando ]) {
                return event;
            }

            // Create a writable copy of the event object and normalize some properties
            var i, prop,
                originalEvent = event,
                fixHook = jQuery.event.fixHooks[ event.type ] || {},
                copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;

            event = jQuery.Event(originalEvent);

            for (i = copy.length; i;) {
                prop = copy[ --i ];
                event[ prop ] = originalEvent[ prop ];
            }

            // Fix target property, if necessary (#1925, IE 6/7/8 & Safari2)
            if (!event.target) {
                event.target = originalEvent.srcElement || document;
            }

            // Target should not be a text node (#504, Safari)
            if (event.target.nodeType === 3) {
                event.target = event.target.parentNode;
            }

            // For mouse/key events, metaKey==false if it's undefined (#3368, #11328; IE6/7/8)
            event.metaKey = !!event.metaKey;

            return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
        },

        special:{
            load:{
                // Prevent triggered image.load events from bubbling to window.load
                noBubble:true
            },

            focus:{
                delegateType:"focusin"
            },
            blur:{
                delegateType:"focusout"
            },

            beforeunload:{
                setup:function (data, namespaces, eventHandle) {
                    // We only want to do this special case on windows
                    if (jQuery.isWindow(this)) {
                        this.onbeforeunload = eventHandle;
                    }
                },

                teardown:function (namespaces, eventHandle) {
                    if (this.onbeforeunload === eventHandle) {
                        this.onbeforeunload = null;
                    }
                }
            }
        },

        simulate:function (type, elem, event, bubble) {
            // Piggyback on a donor event to simulate a different one.
            // Fake originalEvent to avoid donor's stopPropagation, but if the
            // simulated event prevents default then we do the same on the donor.
            var e = jQuery.extend(
                new jQuery.Event(),
                event,
                { type:type,
                    isSimulated:true,
                    originalEvent:{}
                }
            );
            if (bubble) {
                jQuery.event.trigger(e, null, elem);
            } else {
                jQuery.event.dispatch.call(elem, e);
            }
            if (e.isDefaultPrevented()) {
                event.preventDefault();
            }
        }
    };

// Some plugins are using, but it's undocumented/deprecated and will be removed.
// The 1.7 special event interface should provide all the hooks needed now.
    jQuery.event.handle = jQuery.event.dispatch;

    jQuery.removeEvent = document.removeEventListener ?
        function (elem, type, handle) {
            if (elem.removeEventListener) {
                elem.removeEventListener(type, handle, false);
            }
        } :
        function (elem, type, handle) {
            var name = "on" + type;

            if (elem.detachEvent) {

                // #8545, #7054, preventing memory leaks for custom events in IE6-8 –
                // detachEvent needed property on element, by name of that event, to properly expose it to GC
                if (typeof elem[ name ] === "undefined") {
                    elem[ name ] = null;
                }

                elem.detachEvent(name, handle);
            }
        };

    jQuery.Event = function (src, props) {
        // Allow instantiation without the 'new' keyword
        if (!(this instanceof jQuery.Event)) {
            return new jQuery.Event(src, props);
        }

        // Event object
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;

            // Events bubbling up the document may have been marked as prevented
            // by a handler lower down the tree; reflect the correct value.
            this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
                src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

            // Event type
        } else {
            this.type = src;
        }

        // Put explicitly provided properties onto the event object
        if (props) {
            jQuery.extend(this, props);
        }

        // Create a timestamp if incoming event doesn't have one
        this.timeStamp = src && src.timeStamp || jQuery.now();

        // Mark it as fixed
        this[ jQuery.expando ] = true;
    };

    function returnFalse() {
        return false;
    }

    function returnTrue() {
        return true;
    }

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
    jQuery.Event.prototype = {
        preventDefault:function () {
            this.isDefaultPrevented = returnTrue;

            var e = this.originalEvent;
            if (!e) {
                return;
            }

            // if preventDefault exists run it on the original event
            if (e.preventDefault) {
                e.preventDefault();

                // otherwise set the returnValue property of the original event to false (IE)
            } else {
                e.returnValue = false;
            }
        },
        stopPropagation:function () {
            this.isPropagationStopped = returnTrue;

            var e = this.originalEvent;
            if (!e) {
                return;
            }
            // if stopPropagation exists run it on the original event
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            // otherwise set the cancelBubble property of the original event to true (IE)
            e.cancelBubble = true;
        },
        stopImmediatePropagation:function () {
            this.isImmediatePropagationStopped = returnTrue;
            this.stopPropagation();
        },
        isDefaultPrevented:returnFalse,
        isPropagationStopped:returnFalse,
        isImmediatePropagationStopped:returnFalse
    };

// Create mouseenter/leave events using mouseover/out and event-time checks
    jQuery.each({
        mouseenter:"mouseover",
        mouseleave:"mouseout"
    }, function (orig, fix) {
        jQuery.event.special[ orig ] = {
            delegateType:fix,
            bindType:fix,

            handle:function (event) {
                var ret,
                    target = this,
                    related = event.relatedTarget,
                    handleObj = event.handleObj,
                    selector = handleObj.selector;

                // For mousenter/leave call the handler if related is outside the target.
                // NB: No relatedTarget if the mouse left/entered the browser window
                if (!related || (related !== target && !jQuery.contains(target, related))) {
                    event.type = handleObj.origType;
                    ret = handleObj.handler.apply(this, arguments);
                    event.type = fix;
                }
                return ret;
            }
        };
    });

// IE submit delegation
    if (!jQuery.support.submitBubbles) {

        jQuery.event.special.submit = {
            setup:function () {
                // Only need this for delegated form submit events
                if (jQuery.nodeName(this, "form")) {
                    return false;
                }

                // Lazy-add a submit handler when a descendant form may potentially be submitted
                jQuery.event.add(this, "click._submit keypress._submit", function (e) {
                    // Node name check avoids a VML-related crash in IE (#9807)
                    var elem = e.target,
                        form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : undefined;
                    if (form && !jQuery._data(form, "_submit_attached")) {
                        jQuery.event.add(form, "submit._submit", function (event) {
                            event._submit_bubble = true;
                        });
                        jQuery._data(form, "_submit_attached", true);
                    }
                });
                // return undefined since we don't need an event listener
            },

            postDispatch:function (event) {
                // If form was submitted by the user, bubble the event up the tree
                if (event._submit_bubble) {
                    delete event._submit_bubble;
                    if (this.parentNode && !event.isTrigger) {
                        jQuery.event.simulate("submit", this.parentNode, event, true);
                    }
                }
            },

            teardown:function () {
                // Only need this for delegated form submit events
                if (jQuery.nodeName(this, "form")) {
                    return false;
                }

                // Remove delegated handlers; cleanData eventually reaps submit handlers attached above
                jQuery.event.remove(this, "._submit");
            }
        };
    }

// IE change delegation and checkbox/radio fix
    if (!jQuery.support.changeBubbles) {

        jQuery.event.special.change = {

            setup:function () {

                if (rformElems.test(this.nodeName)) {
                    // IE doesn't fire change on a check/radio until blur; trigger it on click
                    // after a propertychange. Eat the blur-change in special.change.handle.
                    // This still fires onchange a second time for check/radio after blur.
                    if (this.type === "checkbox" || this.type === "radio") {
                        jQuery.event.add(this, "propertychange._change", function (event) {
                            if (event.originalEvent.propertyName === "checked") {
                                this._just_changed = true;
                            }
                        });
                        jQuery.event.add(this, "click._change", function (event) {
                            if (this._just_changed && !event.isTrigger) {
                                this._just_changed = false;
                            }
                            // Allow triggered, simulated change events (#11500)
                            jQuery.event.simulate("change", this, event, true);
                        });
                    }
                    return false;
                }
                // Delegated event; lazy-add a change handler on descendant inputs
                jQuery.event.add(this, "beforeactivate._change", function (e) {
                    var elem = e.target;

                    if (rformElems.test(elem.nodeName) && !jQuery._data(elem, "_change_attached")) {
                        jQuery.event.add(elem, "change._change", function (event) {
                            if (this.parentNode && !event.isSimulated && !event.isTrigger) {
                                jQuery.event.simulate("change", this.parentNode, event, true);
                            }
                        });
                        jQuery._data(elem, "_change_attached", true);
                    }
                });
            },

            handle:function (event) {
                var elem = event.target;

                // Swallow native change events from checkbox/radio, we already triggered them above
                if (this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox")) {
                    return event.handleObj.handler.apply(this, arguments);
                }
            },

            teardown:function () {
                jQuery.event.remove(this, "._change");

                return !rformElems.test(this.nodeName);
            }
        };
    }

// Create "bubbling" focus and blur events
    if (!jQuery.support.focusinBubbles) {
        jQuery.each({ focus:"focusin", blur:"focusout" }, function (orig, fix) {

            // Attach a single capturing handler while someone wants focusin/focusout
            var attaches = 0,
                handler = function (event) {
                    jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
                };

            jQuery.event.special[ fix ] = {
                setup:function () {
                    if (attaches++ === 0) {
                        document.addEventListener(orig, handler, true);
                    }
                },
                teardown:function () {
                    if (--attaches === 0) {
                        document.removeEventListener(orig, handler, true);
                    }
                }
            };
        });
    }

    jQuery.fn.extend({

        on:function (types, selector, data, fn, /*INTERNAL*/ one) {
            var origFn, type;

            // Types can be a map of types/handlers
            if (typeof types === "object") {
                // ( types-Object, selector, data )
                if (typeof selector !== "string") { // && selector != null
                    // ( types-Object, data )
                    data = data || selector;
                    selector = undefined;
                }
                for (type in types) {
                    this.on(type, selector, data, types[ type ], one);
                }
                return this;
            }

            if (data == null && fn == null) {
                // ( types, fn )
                fn = selector;
                data = selector = undefined;
            } else if (fn == null) {
                if (typeof selector === "string") {
                    // ( types, selector, fn )
                    fn = data;
                    data = undefined;
                } else {
                    // ( types, data, fn )
                    fn = data;
                    data = selector;
                    selector = undefined;
                }
            }
            if (fn === false) {
                fn = returnFalse;
            } else if (!fn) {
                return this;
            }

            if (one === 1) {
                origFn = fn;
                fn = function (event) {
                    // Can use an empty set, since event contains the info
                    jQuery().off(event);
                    return origFn.apply(this, arguments);
                };
                // Use same guid so caller can remove using origFn
                fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
            }
            return this.each(function () {
                jQuery.event.add(this, types, fn, data, selector);
            });
        },
        one:function (types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1);
        },
        off:function (types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) {
                // ( event )  dispatched jQuery.Event
                handleObj = types.handleObj;
                jQuery(types.delegateTarget).off(
                    handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
                    handleObj.selector,
                    handleObj.handler
                );
                return this;
            }
            if (typeof types === "object") {
                // ( types-object [, selector] )
                for (type in types) {
                    this.off(type, selector, types[ type ]);
                }
                return this;
            }
            if (selector === false || typeof selector === "function") {
                // ( types [, fn] )
                fn = selector;
                selector = undefined;
            }
            if (fn === false) {
                fn = returnFalse;
            }
            return this.each(function () {
                jQuery.event.remove(this, types, fn, selector);
            });
        },

        bind:function (types, data, fn) {
            return this.on(types, null, data, fn);
        },
        unbind:function (types, fn) {
            return this.off(types, null, fn);
        },

        live:function (types, data, fn) {
            jQuery(this.context).on(types, this.selector, data, fn);
            return this;
        },
        die:function (types, fn) {
            jQuery(this.context).off(types, this.selector || "**", fn);
            return this;
        },

        delegate:function (selector, types, data, fn) {
            return this.on(types, selector, data, fn);
        },
        undelegate:function (selector, types, fn) {
            // ( namespace ) or ( selector, types [, fn] )
            return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
        },

        trigger:function (type, data) {
            return this.each(function () {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler:function (type, data) {
            if (this[0]) {
                return jQuery.event.trigger(type, data, this[0], true);
            }
        },

        toggle:function (fn) {
            // Save reference to arguments for access in closure
            var args = arguments,
                guid = fn.guid || jQuery.guid++,
                i = 0,
                toggler = function (event) {
                    // Figure out which function to execute
                    var lastToggle = ( jQuery._data(this, "lastToggle" + fn.guid) || 0 ) % i;
                    jQuery._data(this, "lastToggle" + fn.guid, lastToggle + 1);

                    // Make sure that clicks stop
                    event.preventDefault();

                    // and execute the function
                    return args[ lastToggle ].apply(this, arguments) || false;
                };

            // link all the functions, so any of them can unbind this click handler
            toggler.guid = guid;
            while (i < args.length) {
                args[ i++ ].guid = guid;
            }

            return this.click(toggler);
        },

        hover:function (fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        }
    });

    jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " +
        "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
        "change select submit keydown keypress keyup error contextmenu").split(" "), function (i, name) {

        // Handle event binding
        jQuery.fn[ name ] = function (data, fn) {
            if (fn == null) {
                fn = data;
                data = null;
            }

            return arguments.length > 0 ?
                this.on(name, null, data, fn) :
                this.trigger(name);
        };

        if (rkeyEvent.test(name)) {
            jQuery.event.fixHooks[ name ] = jQuery.event.keyHooks;
        }

        if (rmouseEvent.test(name)) {
            jQuery.event.fixHooks[ name ] = jQuery.event.mouseHooks;
        }
    });
    /*!
     * Sizzle CSS Selector Engine
     * Copyright 2012 jQuery Foundation and other contributors
     * Released under the MIT license
     * http://sizzlejs.com/
     */
    (function (window, undefined) {

        var cachedruns,
            assertGetIdNotName,
            Expr,
            getText,
            isXML,
            contains,
            compile,
            sortOrder,
            hasDuplicate,
            outermostContext,

            baseHasDuplicate = true,
            strundefined = "undefined",

            expando = ( "sizcache" + Math.random() ).replace(".", ""),

            Token = String,
            document = window.document,
            docElem = document.documentElement,
            dirruns = 0,
            done = 0,
            pop = [].pop,
            push = [].push,
            slice = [].slice,
        // Use a stripped-down indexOf if a native one is unavailable
            indexOf = [].indexOf || function (elem) {
                var i = 0,
                    len = this.length;
                for (; i < len; i++) {
                    if (this[i] === elem) {
                        return i;
                    }
                }
                return -1;
            },

        // Augment a function for special use by Sizzle
            markFunction = function (fn, value) {
                fn[ expando ] = value == null || value;
                return fn;
            },

            createCache = function () {
                var cache = {},
                    keys = [];

                return markFunction(function (key, value) {
                    // Only keep the most recent entries
                    if (keys.push(key) > Expr.cacheLength) {
                        delete cache[ keys.shift() ];
                    }

                    return (cache[ key ] = value);
                }, cache);
            },

            classCache = createCache(),
            tokenCache = createCache(),
            compilerCache = createCache(),

        // Regex

        // Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
            whitespace = "[\\x20\\t\\r\\n\\f]",
        // http://www.w3.org/TR/css3-syntax/#characters
            characterEncoding = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",

        // Loosely modeled on CSS identifier characters
        // An unquoted value should be a CSS identifier (http://www.w3.org/TR/css3-selectors/#attribute-selectors)
        // Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
            identifier = characterEncoding.replace("w", "w#"),

        // Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
            operators = "([*^$|!~]?=)",
            attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
                "*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

        // Prefer arguments not in parens/brackets,
        //   then attribute selectors and non-pseudos (denoted by :),
        //   then anything else
        // These preferences are here to reduce the number of selectors
        //   needing tokenize in the PSEUDO preFilter
            pseudos = ":(" + characterEncoding + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + attributes + ")|[^:]|\\\\.)*|.*))\\)|)",

        // For matchExpr.POS and matchExpr.needsContext
            pos = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
                "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)",

        // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
            rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),

            rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
            rcombinators = new RegExp("^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*"),
            rpseudo = new RegExp(pseudos),

        // Easily-parseable/retrievable ID or TAG or CLASS selectors
            rquickExpr = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,

            rnot = /^:not/,
            rsibling = /[\x20\t\r\n\f]*[+~]/,
            rendsWithNot = /:not\($/,

            rheader = /h\d/i,
            rinputs = /input|select|textarea|button/i,

            rbackslash = /\\(?!\\)/g,

            matchExpr = {
                "ID":new RegExp("^#(" + characterEncoding + ")"),
                "CLASS":new RegExp("^\\.(" + characterEncoding + ")"),
                "NAME":new RegExp("^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]"),
                "TAG":new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
                "ATTR":new RegExp("^" + attributes),
                "PSEUDO":new RegExp("^" + pseudos),
                "POS":new RegExp(pos, "i"),
                "CHILD":new RegExp("^:(only|nth|first|last)-child(?:\\(" + whitespace +
                    "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
                    "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                // For use in libraries implementing .is()
                "needsContext":new RegExp("^" + whitespace + "*[>+~]|" + pos, "i")
            },

        // Support

        // Used for testing something on an element
            assert = function (fn) {
                var div = document.createElement("div");

                try {
                    return fn(div);
                } catch (e) {
                    return false;
                } finally {
                    // release memory in IE
                    div = null;
                }
            },

        // Check if getElementsByTagName("*") returns only elements
            assertTagNameNoComments = assert(function (div) {
                div.appendChild(document.createComment(""));
                return !div.getElementsByTagName("*").length;
            }),

        // Check if getAttribute returns normalized href attributes
            assertHrefNotNormalized = assert(function (div) {
                div.innerHTML = "<a href='#'></a>";
                return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
                    div.firstChild.getAttribute("href") === "#";
            }),

        // Check if attributes should be retrieved by attribute nodes
            assertAttributes = assert(function (div) {
                div.innerHTML = "<select></select>";
                var type = typeof div.lastChild.getAttribute("multiple");
                // IE8 returns a string for some attributes even when not present
                return type !== "boolean" && type !== "string";
            }),

        // Check if getElementsByClassName can be trusted
            assertUsableClassName = assert(function (div) {
                // Opera can't find a second classname (in 9.6)
                div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
                if (!div.getElementsByClassName || !div.getElementsByClassName("e").length) {
                    return false;
                }

                // Safari 3.2 caches class attributes and doesn't catch changes
                div.lastChild.className = "e";
                return div.getElementsByClassName("e").length === 2;
            }),

        // Check if getElementById returns elements by name
        // Check if getElementsByName privileges form controls or returns elements by ID
            assertUsableName = assert(function (div) {
                // Inject content
                div.id = expando + 0;
                div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
                docElem.insertBefore(div, docElem.firstChild);

                // Test
                var pass = document.getElementsByName &&
                    // buggy browsers will return fewer than the correct 2
                    document.getElementsByName(expando).length === 2 +
                        // buggy browsers will return more than the correct 0
                        document.getElementsByName(expando + 0).length;
                assertGetIdNotName = !document.getElementById(expando);

                // Cleanup
                docElem.removeChild(div);

                return pass;
            });

// If slice is not available, provide a backup
        try {
            slice.call(docElem.childNodes, 0)[0].nodeType;
        } catch (e) {
            slice = function (i) {
                var elem,
                    results = [];
                for (; (elem = this[i]); i++) {
                    results.push(elem);
                }
                return results;
            };
        }

        function Sizzle(selector, context, results, seed) {
            results = results || [];
            context = context || document;
            var match, elem, xml, m,
                nodeType = context.nodeType;

            if (!selector || typeof selector !== "string") {
                return results;
            }

            if (nodeType !== 1 && nodeType !== 9) {
                return [];
            }

            xml = isXML(context);

            if (!xml && !seed) {
                if ((match = rquickExpr.exec(selector))) {
                    // Speed-up: Sizzle("#ID")
                    if ((m = match[1])) {
                        if (nodeType === 9) {
                            elem = context.getElementById(m);
                            // Check parentNode to catch when Blackberry 4.6 returns
                            // nodes that are no longer in the document #6963
                            if (elem && elem.parentNode) {
                                // Handle the case where IE, Opera, and Webkit return items
                                // by name instead of ID
                                if (elem.id === m) {
                                    results.push(elem);
                                    return results;
                                }
                            } else {
                                return results;
                            }
                        } else {
                            // Context is not a document
                            if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) &&
                                contains(context, elem) && elem.id === m) {
                                results.push(elem);
                                return results;
                            }
                        }

                        // Speed-up: Sizzle("TAG")
                    } else if (match[2]) {
                        push.apply(results, slice.call(context.getElementsByTagName(selector), 0));
                        return results;

                        // Speed-up: Sizzle(".CLASS")
                    } else if ((m = match[3]) && assertUsableClassName && context.getElementsByClassName) {
                        push.apply(results, slice.call(context.getElementsByClassName(m), 0));
                        return results;
                    }
                }
            }

            // All others
            return select(selector.replace(rtrim, "$1"), context, results, seed, xml);
        }

        Sizzle.matches = function (expr, elements) {
            return Sizzle(expr, null, null, elements);
        };

        Sizzle.matchesSelector = function (elem, expr) {
            return Sizzle(expr, null, null, [ elem ]).length > 0;
        };

// Returns a function to use in pseudos for input types
        function createInputPseudo(type) {
            return function (elem) {
                var name = elem.nodeName.toLowerCase();
                return name === "input" && elem.type === type;
            };
        }

// Returns a function to use in pseudos for buttons
        function createButtonPseudo(type) {
            return function (elem) {
                var name = elem.nodeName.toLowerCase();
                return (name === "input" || name === "button") && elem.type === type;
            };
        }

// Returns a function to use in pseudos for positionals
        function createPositionalPseudo(fn) {
            return markFunction(function (argument) {
                argument = +argument;
                return markFunction(function (seed, matches) {
                    var j,
                        matchIndexes = fn([], seed.length, argument),
                        i = matchIndexes.length;

                    // Match elements found at the specified indexes
                    while (i--) {
                        if (seed[ (j = matchIndexes[i]) ]) {
                            seed[j] = !(matches[j] = seed[j]);
                        }
                    }
                });
            });
        }

        /**
         * Utility function for retrieving the text value of an array of DOM nodes
         * @param {Array|Element} elem
         */
        getText = Sizzle.getText = function (elem) {
            var node,
                ret = "",
                i = 0,
                nodeType = elem.nodeType;

            if (nodeType) {
                if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                    // Use textContent for elements
                    // innerText usage removed for consistency of new lines (see #11153)
                    if (typeof elem.textContent === "string") {
                        return elem.textContent;
                    } else {
                        // Traverse its children
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                            ret += getText(elem);
                        }
                    }
                } else if (nodeType === 3 || nodeType === 4) {
                    return elem.nodeValue;
                }
                // Do not include comment or processing instruction nodes
            } else {

                // If no nodeType, this is expected to be an array
                for (; (node = elem[i]); i++) {
                    // Do not traverse comment nodes
                    ret += getText(node);
                }
            }
            return ret;
        };

        isXML = Sizzle.isXML = function (elem) {
            // documentElement is verified for cases where it doesn't yet exist
            // (such as loading iframes in IE - #4833)
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return documentElement ? documentElement.nodeName !== "HTML" : false;
        };

// Element contains another
        contains = Sizzle.contains = docElem.contains ?
            function (a, b) {
                var adown = a.nodeType === 9 ? a.documentElement : a,
                    bup = b && b.parentNode;
                return a === bup || !!( bup && bup.nodeType === 1 && adown.contains && adown.contains(bup) );
            } :
            docElem.compareDocumentPosition ?
                function (a, b) {
                    return b && !!( a.compareDocumentPosition(b) & 16 );
                } :
                function (a, b) {
                    while ((b = b.parentNode)) {
                        if (b === a) {
                            return true;
                        }
                    }
                    return false;
                };

        Sizzle.attr = function (elem, name) {
            var val,
                xml = isXML(elem);

            if (!xml) {
                name = name.toLowerCase();
            }
            if ((val = Expr.attrHandle[ name ])) {
                return val(elem);
            }
            if (xml || assertAttributes) {
                return elem.getAttribute(name);
            }
            val = elem.getAttributeNode(name);
            return val ?
                typeof elem[ name ] === "boolean" ?
                    elem[ name ] ? name : null :
                    val.specified ? val.value : null :
                null;
        };

        Expr = Sizzle.selectors = {

            // Can be adjusted by the user
            cacheLength:50,

            createPseudo:markFunction,

            match:matchExpr,

            // IE6/7 return a modified href
            attrHandle:assertHrefNotNormalized ?
            {} :
            {
                "href":function (elem) {
                    return elem.getAttribute("href", 2);
                },
                "type":function (elem) {
                    return elem.getAttribute("type");
                }
            },

            find:{
                "ID":assertGetIdNotName ?
                    function (id, context, xml) {
                        if (typeof context.getElementById !== strundefined && !xml) {
                            var m = context.getElementById(id);
                            // Check parentNode to catch when Blackberry 4.6 returns
                            // nodes that are no longer in the document #6963
                            return m && m.parentNode ? [m] : [];
                        }
                    } :
                    function (id, context, xml) {
                        if (typeof context.getElementById !== strundefined && !xml) {
                            var m = context.getElementById(id);

                            return m ?
                                m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ?
                                    [m] :
                                    undefined :
                                [];
                        }
                    },

                "TAG":assertTagNameNoComments ?
                    function (tag, context) {
                        if (typeof context.getElementsByTagName !== strundefined) {
                            return context.getElementsByTagName(tag);
                        }
                    } :
                    function (tag, context) {
                        var results = context.getElementsByTagName(tag);

                        // Filter out possible comments
                        if (tag === "*") {
                            var elem,
                                tmp = [],
                                i = 0;

                            for (; (elem = results[i]); i++) {
                                if (elem.nodeType === 1) {
                                    tmp.push(elem);
                                }
                            }

                            return tmp;
                        }
                        return results;
                    },

                "NAME":assertUsableName && function (tag, context) {
                    if (typeof context.getElementsByName !== strundefined) {
                        return context.getElementsByName(name);
                    }
                },

                "CLASS":assertUsableClassName && function (className, context, xml) {
                    if (typeof context.getElementsByClassName !== strundefined && !xml) {
                        return context.getElementsByClassName(className);
                    }
                }
            },

            relative:{
                ">":{ dir:"parentNode", first:true },
                " ":{ dir:"parentNode" },
                "+":{ dir:"previousSibling", first:true },
                "~":{ dir:"previousSibling" }
            },

            preFilter:{
                "ATTR":function (match) {
                    match[1] = match[1].replace(rbackslash, "");

                    // Move the given value to match[3] whether quoted or unquoted
                    match[3] = ( match[4] || match[5] || "" ).replace(rbackslash, "");

                    if (match[2] === "~=") {
                        match[3] = " " + match[3] + " ";
                    }

                    return match.slice(0, 4);
                },

                "CHILD":function (match) {
                    /* matches from matchExpr["CHILD"]
                     1 type (only|nth|...)
                     2 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
                     3 xn-component of xn+y argument ([+-]?\d*n|)
                     4 sign of xn-component
                     5 x of xn-component
                     6 sign of y-component
                     7 y of y-component
                     */
                    match[1] = match[1].toLowerCase();

                    if (match[1] === "nth") {
                        // nth-child requires argument
                        if (!match[2]) {
                            Sizzle.error(match[0]);
                        }

                        // numeric x and y parameters for Expr.filter.CHILD
                        // remember that false/true cast respectively to 0/1
                        match[3] = +( match[3] ? match[4] + (match[5] || 1) : 2 * ( match[2] === "even" || match[2] === "odd" ) );
                        match[4] = +( ( match[6] + match[7] ) || match[2] === "odd" );

                        // other types prohibit arguments
                    } else if (match[2]) {
                        Sizzle.error(match[0]);
                    }

                    return match;
                },

                "PSEUDO":function (match) {
                    var unquoted, excess;
                    if (matchExpr["CHILD"].test(match[0])) {
                        return null;
                    }

                    if (match[3]) {
                        match[2] = match[3];
                    } else if ((unquoted = match[4])) {
                        // Only check arguments that contain a pseudo
                        if (rpseudo.test(unquoted) &&
                            // Get excess from tokenize (recursively)
                            (excess = tokenize(unquoted, true)) &&
                            // advance to the next closing parenthesis
                            (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

                            // excess is a negative index
                            unquoted = unquoted.slice(0, excess);
                            match[0] = match[0].slice(0, excess);
                        }
                        match[2] = unquoted;
                    }

                    // Return only captures needed by the pseudo filter method (type and argument)
                    return match.slice(0, 3);
                }
            },

            filter:{
                "ID":assertGetIdNotName ?
                    function (id) {
                        id = id.replace(rbackslash, "");
                        return function (elem) {
                            return elem.getAttribute("id") === id;
                        };
                    } :
                    function (id) {
                        id = id.replace(rbackslash, "");
                        return function (elem) {
                            var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                            return node && node.value === id;
                        };
                    },

                "TAG":function (nodeName) {
                    if (nodeName === "*") {
                        return function () {
                            return true;
                        };
                    }
                    nodeName = nodeName.replace(rbackslash, "").toLowerCase();

                    return function (elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                    };
                },

                "CLASS":function (className) {
                    var pattern = classCache[ expando ][ className ];
                    if (!pattern) {
                        pattern = classCache(className, new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)"));
                    }
                    return function (elem) {
                        return pattern.test(elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "");
                    };
                },

                "ATTR":function (name, operator, check) {
                    return function (elem, context) {
                        var result = Sizzle.attr(elem, name);

                        if (result == null) {
                            return operator === "!=";
                        }
                        if (!operator) {
                            return true;
                        }

                        result += "";

                        return operator === "=" ? result === check :
                            operator === "!=" ? result !== check :
                                operator === "^=" ? check && result.indexOf(check) === 0 :
                                    operator === "*=" ? check && result.indexOf(check) > -1 :
                                        operator === "$=" ? check && result.substr(result.length - check.length) === check :
                                            operator === "~=" ? ( " " + result + " " ).indexOf(check) > -1 :
                                                operator === "|=" ? result === check || result.substr(0, check.length + 1) === check + "-" :
                                                    false;
                    };
                },

                "CHILD":function (type, argument, first, last) {

                    if (type === "nth") {
                        return function (elem) {
                            var node, diff,
                                parent = elem.parentNode;

                            if (first === 1 && last === 0) {
                                return true;
                            }

                            if (parent) {
                                diff = 0;
                                for (node = parent.firstChild; node; node = node.nextSibling) {
                                    if (node.nodeType === 1) {
                                        diff++;
                                        if (elem === node) {
                                            break;
                                        }
                                    }
                                }
                            }

                            // Incorporate the offset (or cast to NaN), then check against cycle size
                            diff -= last;
                            return diff === first || ( diff % first === 0 && diff / first >= 0 );
                        };
                    }

                    return function (elem) {
                        var node = elem;

                        switch (type) {
                            case "only":
                            case "first":
                                while ((node = node.previousSibling)) {
                                    if (node.nodeType === 1) {
                                        return false;
                                    }
                                }

                                if (type === "first") {
                                    return true;
                                }

                                node = elem;

                            /* falls through */
                            case "last":
                                while ((node = node.nextSibling)) {
                                    if (node.nodeType === 1) {
                                        return false;
                                    }
                                }

                                return true;
                        }
                    };
                },

                "PSEUDO":function (pseudo, argument) {
                    // pseudo-class names are case-insensitive
                    // http://www.w3.org/TR/selectors/#pseudo-classes
                    // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
                    // Remember that setFilters inherits from pseudos
                    var args,
                        fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
                            Sizzle.error("unsupported pseudo: " + pseudo);

                    // The user may use createPseudo to indicate that
                    // arguments are needed to create the filter function
                    // just as Sizzle does
                    if (fn[ expando ]) {
                        return fn(argument);
                    }

                    // But maintain support for old signatures
                    if (fn.length > 1) {
                        args = [ pseudo, pseudo, "", argument ];
                        return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ?
                            markFunction(function (seed, matches) {
                                var idx,
                                    matched = fn(seed, argument),
                                    i = matched.length;
                                while (i--) {
                                    idx = indexOf.call(seed, matched[i]);
                                    seed[ idx ] = !( matches[ idx ] = matched[i] );
                                }
                            }) :
                            function (elem) {
                                return fn(elem, 0, args);
                            };
                    }

                    return fn;
                }
            },

            pseudos:{
                "not":markFunction(function (selector) {
                    // Trim the selector passed to compile
                    // to avoid treating leading and trailing
                    // spaces as combinators
                    var input = [],
                        results = [],
                        matcher = compile(selector.replace(rtrim, "$1"));

                    return matcher[ expando ] ?
                        markFunction(function (seed, matches, context, xml) {
                            var elem,
                                unmatched = matcher(seed, null, xml, []),
                                i = seed.length;

                            // Match elements unmatched by `matcher`
                            while (i--) {
                                if ((elem = unmatched[i])) {
                                    seed[i] = !(matches[i] = elem);
                                }
                            }
                        }) :
                        function (elem, context, xml) {
                            input[0] = elem;
                            matcher(input, null, xml, results);
                            return !results.pop();
                        };
                }),

                "has":markFunction(function (selector) {
                    return function (elem) {
                        return Sizzle(selector, elem).length > 0;
                    };
                }),

                "contains":markFunction(function (text) {
                    return function (elem) {
                        return ( elem.textContent || elem.innerText || getText(elem) ).indexOf(text) > -1;
                    };
                }),

                "enabled":function (elem) {
                    return elem.disabled === false;
                },

                "disabled":function (elem) {
                    return elem.disabled === true;
                },

                "checked":function (elem) {
                    // In CSS3, :checked should return both checked and selected elements
                    // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                    var nodeName = elem.nodeName.toLowerCase();
                    return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
                },

                "selected":function (elem) {
                    // Accessing this property makes selected-by-default
                    // options in Safari work properly
                    if (elem.parentNode) {
                        elem.parentNode.selectedIndex;
                    }

                    return elem.selected === true;
                },

                "parent":function (elem) {
                    return !Expr.pseudos["empty"](elem);
                },

                "empty":function (elem) {
                    // http://www.w3.org/TR/selectors/#empty-pseudo
                    // :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
                    //   not comment, processing instructions, or others
                    // Thanks to Diego Perini for the nodeName shortcut
                    //   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
                    var nodeType;
                    elem = elem.firstChild;
                    while (elem) {
                        if (elem.nodeName > "@" || (nodeType = elem.nodeType) === 3 || nodeType === 4) {
                            return false;
                        }
                        elem = elem.nextSibling;
                    }
                    return true;
                },

                "header":function (elem) {
                    return rheader.test(elem.nodeName);
                },

                "text":function (elem) {
                    var type, attr;
                    // IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
                    // use getAttribute instead to test this case
                    return elem.nodeName.toLowerCase() === "input" &&
                        (type = elem.type) === "text" &&
                        ( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === type );
                },

                // Input types
                "radio":createInputPseudo("radio"),
                "checkbox":createInputPseudo("checkbox"),
                "file":createInputPseudo("file"),
                "password":createInputPseudo("password"),
                "image":createInputPseudo("image"),

                "submit":createButtonPseudo("submit"),
                "reset":createButtonPseudo("reset"),

                "button":function (elem) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && elem.type === "button" || name === "button";
                },

                "input":function (elem) {
                    return rinputs.test(elem.nodeName);
                },

                "focus":function (elem) {
                    var doc = elem.ownerDocument;
                    return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !!(elem.type || elem.href);
                },

                "active":function (elem) {
                    return elem === elem.ownerDocument.activeElement;
                },

                // Positional types
                "first":createPositionalPseudo(function (matchIndexes, length, argument) {
                    return [ 0 ];
                }),

                "last":createPositionalPseudo(function (matchIndexes, length, argument) {
                    return [ length - 1 ];
                }),

                "eq":createPositionalPseudo(function (matchIndexes, length, argument) {
                    return [ argument < 0 ? argument + length : argument ];
                }),

                "even":createPositionalPseudo(function (matchIndexes, length, argument) {
                    for (var i = 0; i < length; i += 2) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),

                "odd":createPositionalPseudo(function (matchIndexes, length, argument) {
                    for (var i = 1; i < length; i += 2) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),

                "lt":createPositionalPseudo(function (matchIndexes, length, argument) {
                    for (var i = argument < 0 ? argument + length : argument; --i >= 0;) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),

                "gt":createPositionalPseudo(function (matchIndexes, length, argument) {
                    for (var i = argument < 0 ? argument + length : argument; ++i < length;) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                })
            }
        };

        function siblingCheck(a, b, ret) {
            if (a === b) {
                return ret;
            }

            var cur = a.nextSibling;

            while (cur) {
                if (cur === b) {
                    return -1;
                }

                cur = cur.nextSibling;
            }

            return 1;
        }

        sortOrder = docElem.compareDocumentPosition ?
            function (a, b) {
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                }

                return ( !a.compareDocumentPosition || !b.compareDocumentPosition ?
                    a.compareDocumentPosition :
                    a.compareDocumentPosition(b) & 4
                    ) ? -1 : 1;
            } :
            function (a, b) {
                // The nodes are identical, we can exit early
                if (a === b) {
                    hasDuplicate = true;
                    return 0;

                    // Fallback to using sourceIndex (in IE) if it's available on both nodes
                } else if (a.sourceIndex && b.sourceIndex) {
                    return a.sourceIndex - b.sourceIndex;
                }

                var al, bl,
                    ap = [],
                    bp = [],
                    aup = a.parentNode,
                    bup = b.parentNode,
                    cur = aup;

                // If the nodes are siblings (or identical) we can do a quick check
                if (aup === bup) {
                    return siblingCheck(a, b);

                    // If no parents were found then the nodes are disconnected
                } else if (!aup) {
                    return -1;

                } else if (!bup) {
                    return 1;
                }

                // Otherwise they're somewhere else in the tree so we need
                // to build up a full list of the parentNodes for comparison
                while (cur) {
                    ap.unshift(cur);
                    cur = cur.parentNode;
                }

                cur = bup;

                while (cur) {
                    bp.unshift(cur);
                    cur = cur.parentNode;
                }

                al = ap.length;
                bl = bp.length;

                // Start walking down the tree looking for a discrepancy
                for (var i = 0; i < al && i < bl; i++) {
                    if (ap[i] !== bp[i]) {
                        return siblingCheck(ap[i], bp[i]);
                    }
                }

                // We ended someplace up the tree so do a sibling check
                return i === al ?
                    siblingCheck(a, bp[i], -1) :
                    siblingCheck(ap[i], b, 1);
            };

// Always assume the presence of duplicates if sort doesn't
// pass them to our comparison function (as in Google Chrome).
        [0, 0].sort(sortOrder);
        baseHasDuplicate = !hasDuplicate;

// Document sorting and removing duplicates
        Sizzle.uniqueSort = function (results) {
            var elem,
                i = 1;

            hasDuplicate = baseHasDuplicate;
            results.sort(sortOrder);

            if (hasDuplicate) {
                for (; (elem = results[i]); i++) {
                    if (elem === results[ i - 1 ]) {
                        results.splice(i--, 1);
                    }
                }
            }

            return results;
        };

        Sizzle.error = function (msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
        };

        function tokenize(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters,
                cached = tokenCache[ expando ][ selector ];

            if (cached) {
                return parseOnly ? 0 : cached.slice(0);
            }

            soFar = selector;
            groups = [];
            preFilters = Expr.preFilter;

            while (soFar) {

                // Comma and first run
                if (!matched || (match = rcomma.exec(soFar))) {
                    if (match) {
                        soFar = soFar.slice(match[0].length);
                    }
                    groups.push(tokens = []);
                }

                matched = false;

                // Combinators
                if ((match = rcombinators.exec(soFar))) {
                    tokens.push(matched = new Token(match.shift()));
                    soFar = soFar.slice(matched.length);

                    // Cast descendant combinators to space
                    matched.type = match[0].replace(rtrim, " ");
                }

                // Filters
                for (type in Expr.filter) {
                    if ((match = matchExpr[ type ].exec(soFar)) && (!preFilters[ type ] ||
                        // The last two arguments here are (context, xml) for backCompat
                        (match = preFilters[ type ](match, document, true)))) {

                        tokens.push(matched = new Token(match.shift()));
                        soFar = soFar.slice(matched.length);
                        matched.type = type;
                        matched.matches = match;
                    }
                }

                if (!matched) {
                    break;
                }
            }

            // Return the length of the invalid excess
            // if we're just parsing
            // Otherwise, throw an error or return tokens
            return parseOnly ?
                soFar.length :
                soFar ?
                    Sizzle.error(selector) :
                    // Cache the tokens
                    tokenCache(selector, groups).slice(0);
        }

        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir,
                checkNonElements = base && combinator.dir === "parentNode",
                doneName = done++;

            return combinator.first ?
                // Check against closest ancestor/preceding element
                function (elem, context, xml) {
                    while ((elem = elem[ dir ])) {
                        if (checkNonElements || elem.nodeType === 1) {
                            return matcher(elem, context, xml);
                        }
                    }
                } :

                // Check against all ancestor/preceding elements
                function (elem, context, xml) {
                    // We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
                    if (!xml) {
                        var cache,
                            dirkey = dirruns + " " + doneName + " ",
                            cachedkey = dirkey + cachedruns;
                        while ((elem = elem[ dir ])) {
                            if (checkNonElements || elem.nodeType === 1) {
                                if ((cache = elem[ expando ]) === cachedkey) {
                                    return elem.sizset;
                                } else if (typeof cache === "string" && cache.indexOf(dirkey) === 0) {
                                    if (elem.sizset) {
                                        return elem;
                                    }
                                } else {
                                    elem[ expando ] = cachedkey;
                                    if (matcher(elem, context, xml)) {
                                        elem.sizset = true;
                                        return elem;
                                    }
                                    elem.sizset = false;
                                }
                            }
                        }
                    } else {
                        while ((elem = elem[ dir ])) {
                            if (checkNonElements || elem.nodeType === 1) {
                                if (matcher(elem, context, xml)) {
                                    return elem;
                                }
                            }
                        }
                    }
                };
        }

        function elementMatcher(matchers) {
            return matchers.length > 1 ?
                function (elem, context, xml) {
                    var i = matchers.length;
                    while (i--) {
                        if (!matchers[i](elem, context, xml)) {
                            return false;
                        }
                    }
                    return true;
                } :
                matchers[0];
        }

        function condense(unmatched, map, filter, context, xml) {
            var elem,
                newUnmatched = [],
                i = 0,
                len = unmatched.length,
                mapped = map != null;

            for (; i < len; i++) {
                if ((elem = unmatched[i])) {
                    if (!filter || filter(elem, context, xml)) {
                        newUnmatched.push(elem);
                        if (mapped) {
                            map.push(i);
                        }
                    }
                }
            }

            return newUnmatched;
        }

        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            if (postFilter && !postFilter[ expando ]) {
                postFilter = setMatcher(postFilter);
            }
            if (postFinder && !postFinder[ expando ]) {
                postFinder = setMatcher(postFinder, postSelector);
            }
            return markFunction(function (seed, results, context, xml) {
                // Positional selectors apply to seed elements, so it is invalid to follow them with relative ones
                if (seed && postFinder) {
                    return;
                }

                var i, elem, postFilterIn,
                    preMap = [],
                    postMap = [],
                    preexisting = results.length,

                // Get initial elements from seed or context
                    elems = seed || multipleContexts(selector || "*", context.nodeType ? [ context ] : context, [], seed),

                // Prefilter to get matcher input, preserving a map for seed-results synchronization
                    matcherIn = preFilter && ( seed || !selector ) ?
                        condense(elems, preMap, preFilter, context, xml) :
                        elems,

                    matcherOut = matcher ?
                        // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                        postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

                            // ...intermediate processing is necessary
                            [] :

                            // ...otherwise use results directly
                            results :
                        matcherIn;

                // Find primary matches
                if (matcher) {
                    matcher(matcherIn, matcherOut, context, xml);
                }

                // Apply postFilter
                if (postFilter) {
                    postFilterIn = condense(matcherOut, postMap);
                    postFilter(postFilterIn, [], context, xml);

                    // Un-match failing elements by moving them back to matcherIn
                    i = postFilterIn.length;
                    while (i--) {
                        if ((elem = postFilterIn[i])) {
                            matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
                        }
                    }
                }

                // Keep seed and results synchronized
                if (seed) {
                    // Ignore postFinder because it can't coexist with seed
                    i = preFilter && matcherOut.length;
                    while (i--) {
                        if ((elem = matcherOut[i])) {
                            seed[ preMap[i] ] = !(results[ preMap[i] ] = elem);
                        }
                    }
                } else {
                    matcherOut = condense(
                        matcherOut === results ?
                            matcherOut.splice(preexisting, matcherOut.length) :
                            matcherOut
                    );
                    if (postFinder) {
                        postFinder(null, results, matcherOut, xml);
                    } else {
                        push.apply(results, matcherOut);
                    }
                }
            });
        }

        function matcherFromTokens(tokens) {
            var checkContext, matcher, j,
                len = tokens.length,
                leadingRelative = Expr.relative[ tokens[0].type ],
                implicitRelative = leadingRelative || Expr.relative[" "],
                i = leadingRelative ? 1 : 0,

            // The foundational matcher ensures that elements are reachable from top-level context(s)
                matchContext = addCombinator(function (elem) {
                    return elem === checkContext;
                }, implicitRelative, true),
                matchAnyContext = addCombinator(function (elem) {
                    return indexOf.call(checkContext, elem) > -1;
                }, implicitRelative, true),
                matchers = [ function (elem, context, xml) {
                    return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
                        (checkContext = context).nodeType ?
                            matchContext(elem, context, xml) :
                            matchAnyContext(elem, context, xml) );
                } ];

            for (; i < len; i++) {
                if ((matcher = Expr.relative[ tokens[i].type ])) {
                    matchers = [ addCombinator(elementMatcher(matchers), matcher) ];
                } else {
                    // The concatenated values are (context, xml) for backCompat
                    matcher = Expr.filter[ tokens[i].type ].apply(null, tokens[i].matches);

                    // Return special upon seeing a positional matcher
                    if (matcher[ expando ]) {
                        // Find the next relative operator (if any) for proper handling
                        j = ++i;
                        for (; j < len; j++) {
                            if (Expr.relative[ tokens[j].type ]) {
                                break;
                            }
                        }
                        return setMatcher(
                            i > 1 && elementMatcher(matchers),
                            i > 1 && tokens.slice(0, i - 1).join("").replace(rtrim, "$1"),
                            matcher,
                            i < j && matcherFromTokens(tokens.slice(i, j)),
                            j < len && matcherFromTokens((tokens = tokens.slice(j))),
                            j < len && tokens.join("")
                        );
                    }
                    matchers.push(matcher);
                }
            }

            return elementMatcher(matchers);
        }

        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0,
                byElement = elementMatchers.length > 0,
                superMatcher = function (seed, context, xml, results, expandContext) {
                    var elem, j, matcher,
                        setMatched = [],
                        matchedCount = 0,
                        i = "0",
                        unmatched = seed && [],
                        outermost = expandContext != null,
                        contextBackup = outermostContext,
                    // We must always have either seed elements or context
                        elems = seed || byElement && Expr.find["TAG"]("*", expandContext && context.parentNode || context),
                    // Nested matchers should use non-integer dirruns
                        dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.E);

                    if (outermost) {
                        outermostContext = context !== document && context;
                        cachedruns = superMatcher.el;
                    }

                    // Add elements passing elementMatchers directly to results
                    for (; (elem = elems[i]) != null; i++) {
                        if (byElement && elem) {
                            for (j = 0; (matcher = elementMatchers[j]); j++) {
                                if (matcher(elem, context, xml)) {
                                    results.push(elem);
                                    break;
                                }
                            }
                            if (outermost) {
                                dirruns = dirrunsUnique;
                                cachedruns = ++superMatcher.el;
                            }
                        }

                        // Track unmatched elements for set filters
                        if (bySet) {
                            // They will have gone through all possible matchers
                            if ((elem = !matcher && elem)) {
                                matchedCount--;
                            }

                            // Lengthen the array for every element, matched or not
                            if (seed) {
                                unmatched.push(elem);
                            }
                        }
                    }

                    // Apply set filters to unmatched elements
                    matchedCount += i;
                    if (bySet && i !== matchedCount) {
                        for (j = 0; (matcher = setMatchers[j]); j++) {
                            matcher(unmatched, setMatched, context, xml);
                        }

                        if (seed) {
                            // Reintegrate element matches to eliminate the need for sorting
                            if (matchedCount > 0) {
                                while (i--) {
                                    if (!(unmatched[i] || setMatched[i])) {
                                        setMatched[i] = pop.call(results);
                                    }
                                }
                            }

                            // Discard index placeholder values to get only actual matches
                            setMatched = condense(setMatched);
                        }

                        // Add matches to results
                        push.apply(results, setMatched);

                        // Seedless set matches succeeding multiple successful matchers stipulate sorting
                        if (outermost && !seed && setMatched.length > 0 &&
                            ( matchedCount + setMatchers.length ) > 1) {

                            Sizzle.uniqueSort(results);
                        }
                    }

                    // Override manipulation of globals by nested matchers
                    if (outermost) {
                        dirruns = dirrunsUnique;
                        outermostContext = contextBackup;
                    }

                    return unmatched;
                };

            superMatcher.el = 0;
            return bySet ?
                markFunction(superMatcher) :
                superMatcher;
        }

        compile = Sizzle.compile = function (selector, group /* Internal Use Only */) {
            var i,
                setMatchers = [],
                elementMatchers = [],
                cached = compilerCache[ expando ][ selector ];

            if (!cached) {
                // Generate a function of recursive functions that can be used to check each element
                if (!group) {
                    group = tokenize(selector);
                }
                i = group.length;
                while (i--) {
                    cached = matcherFromTokens(group[i]);
                    if (cached[ expando ]) {
                        setMatchers.push(cached);
                    } else {
                        elementMatchers.push(cached);
                    }
                }

                // Cache the compiled function
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
            }
            return cached;
        };

        function multipleContexts(selector, contexts, results, seed) {
            var i = 0,
                len = contexts.length;
            for (; i < len; i++) {
                Sizzle(selector, contexts[i], results, seed);
            }
            return results;
        }

        function select(selector, context, results, seed, xml) {
            var i, tokens, token, type, find,
                match = tokenize(selector),
                j = match.length;

            if (!seed) {
                // Try to minimize operations if there is only one group
                if (match.length === 1) {

                    // Take a shortcut and set the context if the root selector is an ID
                    tokens = match[0] = match[0].slice(0);
                    if (tokens.length > 2 && (token = tokens[0]).type === "ID" &&
                        context.nodeType === 9 && !xml &&
                        Expr.relative[ tokens[1].type ]) {

                        context = Expr.find["ID"](token.matches[0].replace(rbackslash, ""), context, xml)[0];
                        if (!context) {
                            return results;
                        }

                        selector = selector.slice(tokens.shift().length);
                    }

                    // Fetch a seed set for right-to-left matching
                    for (i = matchExpr["POS"].test(selector) ? -1 : tokens.length - 1; i >= 0; i--) {
                        token = tokens[i];

                        // Abort if we hit a combinator
                        if (Expr.relative[ (type = token.type) ]) {
                            break;
                        }
                        if ((find = Expr.find[ type ])) {
                            // Search, expanding context for leading sibling combinators
                            if ((seed = find(
                                token.matches[0].replace(rbackslash, ""),
                                rsibling.test(tokens[0].type) && context.parentNode || context,
                                xml
                            ))) {

                                // If seed is empty or no tokens remain, we can return early
                                tokens.splice(i, 1);
                                selector = seed.length && tokens.join("");
                                if (!selector) {
                                    push.apply(results, slice.call(seed, 0));
                                    return results;
                                }

                                break;
                            }
                        }
                    }
                }
            }

            // Compile and execute a filtering function
            // Provide `match` to avoid retokenization if we modified the selector above
            compile(selector, match)(
                seed,
                context,
                xml,
                results,
                rsibling.test(selector)
            );
            return results;
        }

        if (document.querySelectorAll) {
            (function () {
                var disconnectedMatch,
                    oldSelect = select,
                    rescape = /'|\\/g,
                    rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,

                // qSa(:focus) reports false when true (Chrome 21),
                // A support test would require too much code (would include document ready)
                    rbuggyQSA = [":focus"],

                // matchesSelector(:focus) reports false when true (Chrome 21),
                // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
                // A support test would require too much code (would include document ready)
                // just skip matchesSelector for :active
                    rbuggyMatches = [ ":active", ":focus" ],
                    matches = docElem.matchesSelector ||
                        docElem.mozMatchesSelector ||
                        docElem.webkitMatchesSelector ||
                        docElem.oMatchesSelector ||
                        docElem.msMatchesSelector;

                // Build QSA regex
                // Regex strategy adopted from Diego Perini
                assert(function (div) {
                    // Select is set to empty string on purpose
                    // This is to test IE's treatment of not explictly
                    // setting a boolean content attribute,
                    // since its presence should be enough
                    // http://bugs.jquery.com/ticket/12359
                    div.innerHTML = "<select><option selected=''></option></select>";

                    // IE8 - Some boolean attributes are not treated correctly
                    if (!div.querySelectorAll("[selected]").length) {
                        rbuggyQSA.push("\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)");
                    }

                    // Webkit/Opera - :checked should return selected option elements
                    // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                    // IE8 throws error here (do not put tests after this one)
                    if (!div.querySelectorAll(":checked").length) {
                        rbuggyQSA.push(":checked");
                    }
                });

                assert(function (div) {

                    // Opera 10-12/IE9 - ^= $= *= and empty values
                    // Should not select anything
                    div.innerHTML = "<p test=''></p>";
                    if (div.querySelectorAll("[test^='']").length) {
                        rbuggyQSA.push("[*^$]=" + whitespace + "*(?:\"\"|'')");
                    }

                    // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
                    // IE8 throws error here (do not put tests after this one)
                    div.innerHTML = "<input type='hidden'/>";
                    if (!div.querySelectorAll(":enabled").length) {
                        rbuggyQSA.push(":enabled", ":disabled");
                    }
                });

                // rbuggyQSA always contains :focus, so no need for a length check
                rbuggyQSA = /* rbuggyQSA.length && */ new RegExp(rbuggyQSA.join("|"));

                select = function (selector, context, results, seed, xml) {
                    // Only use querySelectorAll when not filtering,
                    // when this is not xml,
                    // and when no QSA bugs apply
                    if (!seed && !xml && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                        var groups, i,
                            old = true,
                            nid = expando,
                            newContext = context,
                            newSelector = context.nodeType === 9 && selector;

                        // qSA works strangely on Element-rooted queries
                        // We can work around this by specifying an extra ID on the root
                        // and working up from there (Thanks to Andrew Dupont for the technique)
                        // IE 8 doesn't work on object elements
                        if (context.nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                            groups = tokenize(selector);

                            if ((old = context.getAttribute("id"))) {
                                nid = old.replace(rescape, "\\$&");
                            } else {
                                context.setAttribute("id", nid);
                            }
                            nid = "[id='" + nid + "'] ";

                            i = groups.length;
                            while (i--) {
                                groups[i] = nid + groups[i].join("");
                            }
                            newContext = rsibling.test(selector) && context.parentNode || context;
                            newSelector = groups.join(",");
                        }

                        if (newSelector) {
                            try {
                                push.apply(results, slice.call(newContext.querySelectorAll(
                                    newSelector
                                ), 0));
                                return results;
                            } catch (qsaError) {
                            } finally {
                                if (!old) {
                                    context.removeAttribute("id");
                                }
                            }
                        }
                    }

                    return oldSelect(selector, context, results, seed, xml);
                };

                if (matches) {
                    assert(function (div) {
                        // Check to see if it's possible to do matchesSelector
                        // on a disconnected node (IE 9)
                        disconnectedMatch = matches.call(div, "div");

                        // This should fail with an exception
                        // Gecko does not error, returns false instead
                        try {
                            matches.call(div, "[test!='']:sizzle");
                            rbuggyMatches.push("!=", pseudos);
                        } catch (e) {
                        }
                    });

                    // rbuggyMatches always contains :active and :focus, so no need for a length check
                    rbuggyMatches = /* rbuggyMatches.length && */ new RegExp(rbuggyMatches.join("|"));

                    Sizzle.matchesSelector = function (elem, expr) {
                        // Make sure that attribute selectors are quoted
                        expr = expr.replace(rattributeQuotes, "='$1']");

                        // rbuggyMatches always contains :active, so no need for an existence check
                        if (!isXML(elem) && !rbuggyMatches.test(expr) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
                            try {
                                var ret = matches.call(elem, expr);

                                // IE 9's matchesSelector returns false on disconnected nodes
                                if (ret || disconnectedMatch ||
                                    // As well, disconnected nodes are said to be in a document
                                    // fragment in IE 9
                                    elem.document && elem.document.nodeType !== 11) {
                                    return ret;
                                }
                            } catch (e) {
                            }
                        }

                        return Sizzle(expr, null, null, [ elem ]).length > 0;
                    };
                }
            })();
        }

// Deprecated
        Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Back-compat
        function setFilters() {
        }

        Expr.filters = setFilters.prototype = Expr.pseudos;
        Expr.setFilters = new setFilters();

// Override sizzle attribute retrieval
        Sizzle.attr = jQuery.attr;
        jQuery.find = Sizzle;
        jQuery.expr = Sizzle.selectors;
        jQuery.expr[":"] = jQuery.expr.pseudos;
        jQuery.unique = Sizzle.uniqueSort;
        jQuery.text = Sizzle.getText;
        jQuery.isXMLDoc = Sizzle.isXML;
        jQuery.contains = Sizzle.contains;


    })(window);
    var runtil = /Until$/,
        rparentsprev = /^(?:parents|prev(?:Until|All))/,
        isSimple = /^.[^:#\[\.,]*$/,
        rneedsContext = jQuery.expr.match.needsContext,
    // methods guaranteed to produce a unique set when starting from a unique set
        guaranteedUnique = {
            children:true,
            contents:true,
            next:true,
            prev:true
        };

    jQuery.fn.extend({
        find:function (selector) {
            var i, l, length, n, r, ret,
                self = this;

            if (typeof selector !== "string") {
                return jQuery(selector).filter(function () {
                    for (i = 0, l = self.length; i < l; i++) {
                        if (jQuery.contains(self[ i ], this)) {
                            return true;
                        }
                    }
                });
            }

            ret = this.pushStack("", "find", selector);

            for (i = 0, l = this.length; i < l; i++) {
                length = ret.length;
                jQuery.find(selector, this[i], ret);

                if (i > 0) {
                    // Make sure that the results are unique
                    for (n = length; n < ret.length; n++) {
                        for (r = 0; r < length; r++) {
                            if (ret[r] === ret[n]) {
                                ret.splice(n--, 1);
                                break;
                            }
                        }
                    }
                }
            }

            return ret;
        },

        has:function (target) {
            var i,
                targets = jQuery(target, this),
                len = targets.length;

            return this.filter(function () {
                for (i = 0; i < len; i++) {
                    if (jQuery.contains(this, targets[i])) {
                        return true;
                    }
                }
            });
        },

        not:function (selector) {
            return this.pushStack(winnow(this, selector, false), "not", selector);
        },

        filter:function (selector) {
            return this.pushStack(winnow(this, selector, true), "filter", selector);
        },

        is:function (selector) {
            return !!selector && (
                typeof selector === "string" ?
                    // If this is a positional/relative selector, check membership in the returned set
                    // so $("p:first").is("p:last") won't return true for a doc with two "p".
                    rneedsContext.test(selector) ?
                        jQuery(selector, this.context).index(this[0]) >= 0 :
                        jQuery.filter(selector, this).length > 0 :
                    this.filter(selector).length > 0 );
        },

        closest:function (selectors, context) {
            var cur,
                i = 0,
                l = this.length,
                ret = [],
                pos = rneedsContext.test(selectors) || typeof selectors !== "string" ?
                    jQuery(selectors, context || this.context) :
                    0;

            for (; i < l; i++) {
                cur = this[i];

                while (cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11) {
                    if (pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors)) {
                        ret.push(cur);
                        break;
                    }
                    cur = cur.parentNode;
                }
            }

            ret = ret.length > 1 ? jQuery.unique(ret) : ret;

            return this.pushStack(ret, "closest", selectors);
        },

        // Determine the position of an element within
        // the matched set of elements
        index:function (elem) {

            // No argument, return index in parent
            if (!elem) {
                return ( this[0] && this[0].parentNode ) ? this.prevAll().length : -1;
            }

            // index in selector
            if (typeof elem === "string") {
                return jQuery.inArray(this[0], jQuery(elem));
            }

            // Locate the position of the desired element
            return jQuery.inArray(
                // If it receives a jQuery object, the first element is used
                elem.jquery ? elem[0] : elem, this);
        },

        add:function (selector, context) {
            var set = typeof selector === "string" ?
                    jQuery(selector, context) :
                    jQuery.makeArray(selector && selector.nodeType ? [ selector ] : selector),
                all = jQuery.merge(this.get(), set);

            return this.pushStack(isDisconnected(set[0]) || isDisconnected(all[0]) ?
                all :
                jQuery.unique(all));
        },

        addBack:function (selector) {
            return this.add(selector == null ?
                this.prevObject : this.prevObject.filter(selector)
            );
        }
    });

    jQuery.fn.andSelf = jQuery.fn.addBack;

// A painfully simple check to see if an element is disconnected
// from a document (should be improved, where feasible).
    function isDisconnected(node) {
        return !node || !node.parentNode || node.parentNode.nodeType === 11;
    }

    function sibling(cur, dir) {
        do {
            cur = cur[ dir ];
        } while (cur && cur.nodeType !== 1);

        return cur;
    }

    jQuery.each({
        parent:function (elem) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents:function (elem) {
            return jQuery.dir(elem, "parentNode");
        },
        parentsUntil:function (elem, i, until) {
            return jQuery.dir(elem, "parentNode", until);
        },
        next:function (elem) {
            return sibling(elem, "nextSibling");
        },
        prev:function (elem) {
            return sibling(elem, "previousSibling");
        },
        nextAll:function (elem) {
            return jQuery.dir(elem, "nextSibling");
        },
        prevAll:function (elem) {
            return jQuery.dir(elem, "previousSibling");
        },
        nextUntil:function (elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until);
        },
        prevUntil:function (elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until);
        },
        siblings:function (elem) {
            return jQuery.sibling(( elem.parentNode || {} ).firstChild, elem);
        },
        children:function (elem) {
            return jQuery.sibling(elem.firstChild);
        },
        contents:function (elem) {
            return jQuery.nodeName(elem, "iframe") ?
                elem.contentDocument || elem.contentWindow.document :
                jQuery.merge([], elem.childNodes);
        }
    }, function (name, fn) {
        jQuery.fn[ name ] = function (until, selector) {
            var ret = jQuery.map(this, fn, until);

            if (!runtil.test(name)) {
                selector = until;
            }

            if (selector && typeof selector === "string") {
                ret = jQuery.filter(selector, ret);
            }

            ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique(ret) : ret;

            if (this.length > 1 && rparentsprev.test(name)) {
                ret = ret.reverse();
            }

            return this.pushStack(ret, name, core_slice.call(arguments).join(","));
        };
    });

    jQuery.extend({
        filter:function (expr, elems, not) {
            if (not) {
                expr = ":not(" + expr + ")";
            }

            return elems.length === 1 ?
                jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
                jQuery.find.matches(expr, elems);
        },

        dir:function (elem, dir, until) {
            var matched = [],
                cur = elem[ dir ];

            while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery(cur).is(until))) {
                if (cur.nodeType === 1) {
                    matched.push(cur);
                }
                cur = cur[dir];
            }
            return matched;
        },

        sibling:function (n, elem) {
            var r = [];

            for (; n; n = n.nextSibling) {
                if (n.nodeType === 1 && n !== elem) {
                    r.push(n);
                }
            }

            return r;
        }
    });

// Implement the identical functionality for filter and not
    function winnow(elements, qualifier, keep) {

        // Can't pass null or undefined to indexOf in Firefox 4
        // Set to 0 to skip string check
        qualifier = qualifier || 0;

        if (jQuery.isFunction(qualifier)) {
            return jQuery.grep(elements, function (elem, i) {
                var retVal = !!qualifier.call(elem, i, elem);
                return retVal === keep;
            });

        } else if (qualifier.nodeType) {
            return jQuery.grep(elements, function (elem, i) {
                return ( elem === qualifier ) === keep;
            });

        } else if (typeof qualifier === "string") {
            var filtered = jQuery.grep(elements, function (elem) {
                return elem.nodeType === 1;
            });

            if (isSimple.test(qualifier)) {
                return jQuery.filter(qualifier, filtered, !keep);
            } else {
                qualifier = jQuery.filter(qualifier, filtered);
            }
        }

        return jQuery.grep(elements, function (elem, i) {
            return ( jQuery.inArray(elem, qualifier) >= 0 ) === keep;
        });
    }

    function createSafeFragment(document) {
        var list = nodeNames.split("|"),
            safeFrag = document.createDocumentFragment();

        if (safeFrag.createElement) {
            while (list.length) {
                safeFrag.createElement(
                    list.pop()
                );
            }
        }
        return safeFrag;
    }

    var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
            "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
        rleadingWhitespace = /^\s+/,
        rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        rtagName = /<([\w:]+)/,
        rtbody = /<tbody/i,
        rhtml = /<|&#?\w+;/,
        rnoInnerhtml = /<(?:script|style|link)/i,
        rnocache = /<(?:script|object|embed|option|style)/i,
        rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
        rcheckableType = /^(?:checkbox|radio)$/,
    // checked="checked" or checked
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rscriptType = /\/(java|ecma)script/i,
        rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
        wrapMap = {
            option:[ 1, "<select multiple='multiple'>", "</select>" ],
            legend:[ 1, "<fieldset>", "</fieldset>" ],
            thead:[ 1, "<table>", "</table>" ],
            tr:[ 2, "<table><tbody>", "</tbody></table>" ],
            td:[ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
            col:[ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
            area:[ 1, "<map>", "</map>" ],
            _default:[ 0, "", "" ]
        },
        safeFragment = createSafeFragment(document),
        fragmentDiv = safeFragment.appendChild(document.createElement("div"));

    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;

// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
// unless wrapped in a div with non-breaking characters in front of it.
    if (!jQuery.support.htmlSerialize) {
        wrapMap._default = [ 1, "X<div>", "</div>" ];
    }

    jQuery.fn.extend({
        text:function (value) {
            return jQuery.access(this, function (value) {
                return value === undefined ?
                    jQuery.text(this) :
                    this.empty().append(( this[0] && this[0].ownerDocument || document ).createTextNode(value));
            }, null, value, arguments.length);
        },

        wrapAll:function (html) {
            if (jQuery.isFunction(html)) {
                return this.each(function (i) {
                    jQuery(this).wrapAll(html.call(this, i));
                });
            }

            if (this[0]) {
                // The elements to wrap the target around
                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

                if (this[0].parentNode) {
                    wrap.insertBefore(this[0]);
                }

                wrap.map(function () {
                    var elem = this;

                    while (elem.firstChild && elem.firstChild.nodeType === 1) {
                        elem = elem.firstChild;
                    }

                    return elem;
                }).append(this);
            }

            return this;
        },

        wrapInner:function (html) {
            if (jQuery.isFunction(html)) {
                return this.each(function (i) {
                    jQuery(this).wrapInner(html.call(this, i));
                });
            }

            return this.each(function () {
                var self = jQuery(this),
                    contents = self.contents();

                if (contents.length) {
                    contents.wrapAll(html);

                } else {
                    self.append(html);
                }
            });
        },

        wrap:function (html) {
            var isFunction = jQuery.isFunction(html);

            return this.each(function (i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
            });
        },

        unwrap:function () {
            return this.parent().each(function () {
                if (!jQuery.nodeName(this, "body")) {
                    jQuery(this).replaceWith(this.childNodes);
                }
            }).end();
        },

        append:function () {
            return this.domManip(arguments, true, function (elem) {
                if (this.nodeType === 1 || this.nodeType === 11) {
                    this.appendChild(elem);
                }
            });
        },

        prepend:function () {
            return this.domManip(arguments, true, function (elem) {
                if (this.nodeType === 1 || this.nodeType === 11) {
                    this.insertBefore(elem, this.firstChild);
                }
            });
        },

        before:function () {
            if (!isDisconnected(this[0])) {
                return this.domManip(arguments, false, function (elem) {
                    this.parentNode.insertBefore(elem, this);
                });
            }

            if (arguments.length) {
                var set = jQuery.clean(arguments);
                return this.pushStack(jQuery.merge(set, this), "before", this.selector);
            }
        },

        after:function () {
            if (!isDisconnected(this[0])) {
                return this.domManip(arguments, false, function (elem) {
                    this.parentNode.insertBefore(elem, this.nextSibling);
                });
            }

            if (arguments.length) {
                var set = jQuery.clean(arguments);
                return this.pushStack(jQuery.merge(this, set), "after", this.selector);
            }
        },

        // keepData is for internal use only--do not document
        remove:function (selector, keepData) {
            var elem,
                i = 0;

            for (; (elem = this[i]) != null; i++) {
                if (!selector || jQuery.filter(selector, [ elem ]).length) {
                    if (!keepData && elem.nodeType === 1) {
                        jQuery.cleanData(elem.getElementsByTagName("*"));
                        jQuery.cleanData([ elem ]);
                    }

                    if (elem.parentNode) {
                        elem.parentNode.removeChild(elem);
                    }
                }
            }

            return this;
        },

        empty:function () {
            var elem,
                i = 0;

            for (; (elem = this[i]) != null; i++) {
                // Remove element nodes and prevent memory leaks
                if (elem.nodeType === 1) {
                    jQuery.cleanData(elem.getElementsByTagName("*"));
                }

                // Remove any remaining nodes
                while (elem.firstChild) {
                    elem.removeChild(elem.firstChild);
                }
            }

            return this;
        },

        clone:function (dataAndEvents, deepDataAndEvents) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

            return this.map(function () {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },

        html:function (value) {
            return jQuery.access(this, function (value) {
                var elem = this[0] || {},
                    i = 0,
                    l = this.length;

                if (value === undefined) {
                    return elem.nodeType === 1 ?
                        elem.innerHTML.replace(rinlinejQuery, "") :
                        undefined;
                }

                // See if we can take a shortcut and just use innerHTML
                if (typeof value === "string" && !rnoInnerhtml.test(value) &&
                    ( jQuery.support.htmlSerialize || !rnoshimcache.test(value)  ) &&
                    ( jQuery.support.leadingWhitespace || !rleadingWhitespace.test(value) ) &&
                    !wrapMap[ ( rtagName.exec(value) || ["", ""] )[1].toLowerCase() ]) {

                    value = value.replace(rxhtmlTag, "<$1></$2>");

                    try {
                        for (; i < l; i++) {
                            // Remove element nodes and prevent memory leaks
                            elem = this[i] || {};
                            if (elem.nodeType === 1) {
                                jQuery.cleanData(elem.getElementsByTagName("*"));
                                elem.innerHTML = value;
                            }
                        }

                        elem = 0;

                        // If using innerHTML throws an exception, use the fallback method
                    } catch (e) {
                    }
                }

                if (elem) {
                    this.empty().append(value);
                }
            }, null, value, arguments.length);
        },

        replaceWith:function (value) {
            if (!isDisconnected(this[0])) {
                // Make sure that the elements are removed from the DOM before they are inserted
                // this can help fix replacing a parent with child elements
                if (jQuery.isFunction(value)) {
                    return this.each(function (i) {
                        var self = jQuery(this), old = self.html();
                        self.replaceWith(value.call(this, i, old));
                    });
                }

                if (typeof value !== "string") {
                    value = jQuery(value).detach();
                }

                return this.each(function () {
                    var next = this.nextSibling,
                        parent = this.parentNode;

                    jQuery(this).remove();

                    if (next) {
                        jQuery(next).before(value);
                    } else {
                        jQuery(parent).append(value);
                    }
                });
            }

            return this.length ?
                this.pushStack(jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value) :
                this;
        },

        detach:function (selector) {
            return this.remove(selector, true);
        },

        domManip:function (args, table, callback) {

            // Flatten any nested arrays
            args = [].concat.apply([], args);

            var results, first, fragment, iNoClone,
                i = 0,
                value = args[0],
                scripts = [],
                l = this.length;

            // We can't cloneNode fragments that contain checked, in WebKit
            if (!jQuery.support.checkClone && l > 1 && typeof value === "string" && rchecked.test(value)) {
                return this.each(function () {
                    jQuery(this).domManip(args, table, callback);
                });
            }

            if (jQuery.isFunction(value)) {
                return this.each(function (i) {
                    var self = jQuery(this);
                    args[0] = value.call(this, i, table ? self.html() : undefined);
                    self.domManip(args, table, callback);
                });
            }

            if (this[0]) {
                results = jQuery.buildFragment(args, this, scripts);
                fragment = results.fragment;
                first = fragment.firstChild;

                if (fragment.childNodes.length === 1) {
                    fragment = first;
                }

                if (first) {
                    table = table && jQuery.nodeName(first, "tr");

                    // Use the original fragment for the last item instead of the first because it can end up
                    // being emptied incorrectly in certain situations (#8070).
                    // Fragments from the fragment cache must always be cloned and never used in place.
                    for (iNoClone = results.cacheable || l - 1; i < l; i++) {
                        callback.call(
                            table && jQuery.nodeName(this[i], "table") ?
                                findOrAppend(this[i], "tbody") :
                                this[i],
                            i === iNoClone ?
                                fragment :
                                jQuery.clone(fragment, true, true)
                        );
                    }
                }

                // Fix #11809: Avoid leaking memory
                fragment = first = null;

                if (scripts.length) {
                    jQuery.each(scripts, function (i, elem) {
                        if (elem.src) {
                            if (jQuery.ajax) {
                                jQuery.ajax({
                                    url:elem.src,
                                    type:"GET",
                                    dataType:"script",
                                    async:false,
                                    global:false,
                                    "throws":true
                                });
                            } else {
                                jQuery.error("no ajax");
                            }
                        } else {
                            jQuery.globalEval(( elem.text || elem.textContent || elem.innerHTML || "" ).replace(rcleanScript, ""));
                        }

                        if (elem.parentNode) {
                            elem.parentNode.removeChild(elem);
                        }
                    });
                }
            }

            return this;
        }
    });

    function findOrAppend(elem, tag) {
        return elem.getElementsByTagName(tag)[0] || elem.appendChild(elem.ownerDocument.createElement(tag));
    }

    function cloneCopyEvent(src, dest) {

        if (dest.nodeType !== 1 || !jQuery.hasData(src)) {
            return;
        }

        var type, i, l,
            oldData = jQuery._data(src),
            curData = jQuery._data(dest, oldData),
            events = oldData.events;

        if (events) {
            delete curData.handle;
            curData.events = {};

            for (type in events) {
                for (i = 0, l = events[ type ].length; i < l; i++) {
                    jQuery.event.add(dest, type, events[ type ][ i ]);
                }
            }
        }

        // make the cloned public data object a copy from the original
        if (curData.data) {
            curData.data = jQuery.extend({}, curData.data);
        }
    }

    function cloneFixAttributes(src, dest) {
        var nodeName;

        // We do not need to do anything for non-Elements
        if (dest.nodeType !== 1) {
            return;
        }

        // clearAttributes removes the attributes, which we don't want,
        // but also removes the attachEvent events, which we *do* want
        if (dest.clearAttributes) {
            dest.clearAttributes();
        }

        // mergeAttributes, in contrast, only merges back on the
        // original attributes, not the events
        if (dest.mergeAttributes) {
            dest.mergeAttributes(src);
        }

        nodeName = dest.nodeName.toLowerCase();

        if (nodeName === "object") {
            // IE6-10 improperly clones children of object elements using classid.
            // IE10 throws NoModificationAllowedError if parent is null, #12132.
            if (dest.parentNode) {
                dest.outerHTML = src.outerHTML;
            }

            // This path appears unavoidable for IE9. When cloning an object
            // element in IE9, the outerHTML strategy above is not sufficient.
            // If the src has innerHTML and the destination does not,
            // copy the src.innerHTML into the dest.innerHTML. #10324
            if (jQuery.support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML))) {
                dest.innerHTML = src.innerHTML;
            }

        } else if (nodeName === "input" && rcheckableType.test(src.type)) {
            // IE6-8 fails to persist the checked state of a cloned checkbox
            // or radio button. Worse, IE6-7 fail to give the cloned element
            // a checked appearance if the defaultChecked value isn't also set

            dest.defaultChecked = dest.checked = src.checked;

            // IE6-7 get confused and end up setting the value of a cloned
            // checkbox/radio button to an empty string instead of "on"
            if (dest.value !== src.value) {
                dest.value = src.value;
            }

            // IE6-8 fails to return the selected option to the default selected
            // state when cloning options
        } else if (nodeName === "option") {
            dest.selected = src.defaultSelected;

            // IE6-8 fails to set the defaultValue to the correct value when
            // cloning other types of input fields
        } else if (nodeName === "input" || nodeName === "textarea") {
            dest.defaultValue = src.defaultValue;

            // IE blanks contents when cloning scripts
        } else if (nodeName === "script" && dest.text !== src.text) {
            dest.text = src.text;
        }

        // Event data gets referenced instead of copied if the expando
        // gets copied too
        dest.removeAttribute(jQuery.expando);
    }

    jQuery.buildFragment = function (args, context, scripts) {
        var fragment, cacheable, cachehit,
            first = args[ 0 ];

        // Set context from what may come in as undefined or a jQuery collection or a node
        // Updated to fix #12266 where accessing context[0] could throw an exception in IE9/10 &
        // also doubles as fix for #8950 where plain objects caused createDocumentFragment exception
        context = context || document;
        context = !context.nodeType && context[0] || context;
        context = context.ownerDocument || context;

        // Only cache "small" (1/2 KB) HTML strings that are associated with the main document
        // Cloning options loses the selected state, so don't cache them
        // IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
        // Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
        // Lastly, IE6,7,8 will not correctly reuse cached fragments that were created from unknown elems #10501
        if (args.length === 1 && typeof first === "string" && first.length < 512 && context === document &&
            first.charAt(0) === "<" && !rnocache.test(first) &&
            (jQuery.support.checkClone || !rchecked.test(first)) &&
            (jQuery.support.html5Clone || !rnoshimcache.test(first))) {

            // Mark cacheable and look for a hit
            cacheable = true;
            fragment = jQuery.fragments[ first ];
            cachehit = fragment !== undefined;
        }

        if (!fragment) {
            fragment = context.createDocumentFragment();
            jQuery.clean(args, context, fragment, scripts);

            // Update the cache, but only store false
            // unless this is a second parsing of the same content
            if (cacheable) {
                jQuery.fragments[ first ] = cachehit && fragment;
            }
        }

        return { fragment:fragment, cacheable:cacheable };
    };

    jQuery.fragments = {};

    jQuery.each({
        appendTo:"append",
        prependTo:"prepend",
        insertBefore:"before",
        insertAfter:"after",
        replaceAll:"replaceWith"
    }, function (name, original) {
        jQuery.fn[ name ] = function (selector) {
            var elems,
                i = 0,
                ret = [],
                insert = jQuery(selector),
                l = insert.length,
                parent = this.length === 1 && this[0].parentNode;

            if ((parent == null || parent && parent.nodeType === 11 && parent.childNodes.length === 1) && l === 1) {
                insert[ original ](this[0]);
                return this;
            } else {
                for (; i < l; i++) {
                    elems = ( i > 0 ? this.clone(true) : this ).get();
                    jQuery(insert[i])[ original ](elems);
                    ret = ret.concat(elems);
                }

                return this.pushStack(ret, name, insert.selector);
            }
        };
    });

    function getAll(elem) {
        if (typeof elem.getElementsByTagName !== "undefined") {
            return elem.getElementsByTagName("*");

        } else if (typeof elem.querySelectorAll !== "undefined") {
            return elem.querySelectorAll("*");

        } else {
            return [];
        }
    }

// Used in clean, fixes the defaultChecked property
    function fixDefaultChecked(elem) {
        if (rcheckableType.test(elem.type)) {
            elem.defaultChecked = elem.checked;
        }
    }

    jQuery.extend({
        clone:function (elem, dataAndEvents, deepDataAndEvents) {
            var srcElements,
                destElements,
                i,
                clone;

            if (jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">")) {
                clone = elem.cloneNode(true);

                // IE<=8 does not properly clone detached, unknown element nodes
            } else {
                fragmentDiv.innerHTML = elem.outerHTML;
                fragmentDiv.removeChild(clone = fragmentDiv.firstChild);
            }

            if ((!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
                (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
                // IE copies events bound via attachEvent when using cloneNode.
                // Calling detachEvent on the clone will also remove the events
                // from the original. In order to get around this, we use some
                // proprietary methods to clear the events. Thanks to MooTools
                // guys for this hotness.

                cloneFixAttributes(elem, clone);

                // Using Sizzle here is crazy slow, so we use getElementsByTagName instead
                srcElements = getAll(elem);
                destElements = getAll(clone);

                // Weird iteration because IE will replace the length property
                // with an element if you are cloning the body and one of the
                // elements on the page has a name or id of "length"
                for (i = 0; srcElements[i]; ++i) {
                    // Ensure that the destination node is not null; Fixes #9587
                    if (destElements[i]) {
                        cloneFixAttributes(srcElements[i], destElements[i]);
                    }
                }
            }

            // Copy the events from the original to the clone
            if (dataAndEvents) {
                cloneCopyEvent(elem, clone);

                if (deepDataAndEvents) {
                    srcElements = getAll(elem);
                    destElements = getAll(clone);

                    for (i = 0; srcElements[i]; ++i) {
                        cloneCopyEvent(srcElements[i], destElements[i]);
                    }
                }
            }

            srcElements = destElements = null;

            // Return the cloned set
            return clone;
        },

        clean:function (elems, context, fragment, scripts) {
            var i, j, elem, tag, wrap, depth, div, hasBody, tbody, len, handleScript, jsTags,
                safe = context === document && safeFragment,
                ret = [];

            // Ensure that context is a document
            if (!context || typeof context.createDocumentFragment === "undefined") {
                context = document;
            }

            // Use the already-created safe fragment if context permits
            for (i = 0; (elem = elems[i]) != null; i++) {
                if (typeof elem === "number") {
                    elem += "";
                }

                if (!elem) {
                    continue;
                }

                // Convert html string into DOM nodes
                if (typeof elem === "string") {
                    if (!rhtml.test(elem)) {
                        elem = context.createTextNode(elem);
                    } else {
                        // Ensure a safe container in which to render the html
                        safe = safe || createSafeFragment(context);
                        div = context.createElement("div");
                        safe.appendChild(div);

                        // Fix "XHTML"-style tags in all browsers
                        elem = elem.replace(rxhtmlTag, "<$1></$2>");

                        // Go to html and back, then peel off extra wrappers
                        tag = ( rtagName.exec(elem) || ["", ""] )[1].toLowerCase();
                        wrap = wrapMap[ tag ] || wrapMap._default;
                        depth = wrap[0];
                        div.innerHTML = wrap[1] + elem + wrap[2];

                        // Move to the right depth
                        while (depth--) {
                            div = div.lastChild;
                        }

                        // Remove IE's autoinserted <tbody> from table fragments
                        if (!jQuery.support.tbody) {

                            // String was a <table>, *may* have spurious <tbody>
                            hasBody = rtbody.test(elem);
                            tbody = tag === "table" && !hasBody ?
                                div.firstChild && div.firstChild.childNodes :

                                // String was a bare <thead> or <tfoot>
                                wrap[1] === "<table>" && !hasBody ?
                                    div.childNodes :
                                    [];

                            for (j = tbody.length - 1; j >= 0; --j) {
                                if (jQuery.nodeName(tbody[ j ], "tbody") && !tbody[ j ].childNodes.length) {
                                    tbody[ j ].parentNode.removeChild(tbody[ j ]);
                                }
                            }
                        }

                        // IE completely kills leading whitespace when innerHTML is used
                        if (!jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem)) {
                            div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]), div.firstChild);
                        }

                        elem = div.childNodes;

                        // Take out of fragment container (we need a fresh div each time)
                        div.parentNode.removeChild(div);
                    }
                }

                if (elem.nodeType) {
                    ret.push(elem);
                } else {
                    jQuery.merge(ret, elem);
                }
            }

            // Fix #11356: Clear elements from safeFragment
            if (div) {
                elem = div = safe = null;
            }

            // Reset defaultChecked for any radios and checkboxes
            // about to be appended to the DOM in IE 6/7 (#8060)
            if (!jQuery.support.appendChecked) {
                for (i = 0; (elem = ret[i]) != null; i++) {
                    if (jQuery.nodeName(elem, "input")) {
                        fixDefaultChecked(elem);
                    } else if (typeof elem.getElementsByTagName !== "undefined") {
                        jQuery.grep(elem.getElementsByTagName("input"), fixDefaultChecked);
                    }
                }
            }

            // Append elements to a provided document fragment
            if (fragment) {
                // Special handling of each script element
                handleScript = function (elem) {
                    // Check if we consider it executable
                    if (!elem.type || rscriptType.test(elem.type)) {
                        // Detach the script and store it in the scripts array (if provided) or the fragment
                        // Return truthy to indicate that it has been handled
                        return scripts ?
                            scripts.push(elem.parentNode ? elem.parentNode.removeChild(elem) : elem) :
                            fragment.appendChild(elem);
                    }
                };

                for (i = 0; (elem = ret[i]) != null; i++) {
                    // Check if we're done after handling an executable script
                    if (!( jQuery.nodeName(elem, "script") && handleScript(elem) )) {
                        // Append to fragment and handle embedded scripts
                        fragment.appendChild(elem);
                        if (typeof elem.getElementsByTagName !== "undefined") {
                            // handleScript alters the DOM, so use jQuery.merge to ensure snapshot iteration
                            jsTags = jQuery.grep(jQuery.merge([], elem.getElementsByTagName("script")), handleScript);

                            // Splice the scripts into ret after their former ancestor and advance our index beyond them
                            ret.splice.apply(ret, [i + 1, 0].concat(jsTags));
                            i += jsTags.length;
                        }
                    }
                }
            }

            return ret;
        },

        cleanData:function (elems, /* internal */ acceptData) {
            var data, id, elem, type,
                i = 0,
                internalKey = jQuery.expando,
                cache = jQuery.cache,
                deleteExpando = jQuery.support.deleteExpando,
                special = jQuery.event.special;

            for (; (elem = elems[i]) != null; i++) {

                if (acceptData || jQuery.acceptData(elem)) {

                    id = elem[ internalKey ];
                    data = id && cache[ id ];

                    if (data) {
                        if (data.events) {
                            for (type in data.events) {
                                if (special[ type ]) {
                                    jQuery.event.remove(elem, type);

                                    // This is a shortcut to avoid jQuery.event.remove's overhead
                                } else {
                                    jQuery.removeEvent(elem, type, data.handle);
                                }
                            }
                        }

                        // Remove cache only if it was not already removed by jQuery.event.remove
                        if (cache[ id ]) {

                            delete cache[ id ];

                            // IE does not allow us to delete expando properties from nodes,
                            // nor does it have a removeAttribute function on Document nodes;
                            // we must handle all of these cases
                            if (deleteExpando) {
                                delete elem[ internalKey ];

                            } else if (elem.removeAttribute) {
                                elem.removeAttribute(internalKey);

                            } else {
                                elem[ internalKey ] = null;
                            }

                            jQuery.deletedIds.push(id);
                        }
                    }
                }
            }
        }
    });
// Limit scope pollution from any deprecated API
    (function () {

        var matched, browser;

// Use of jQuery.browser is frowned upon.
// More details: http://api.jquery.com/jQuery.browser
// jQuery.uaMatch maintained for back-compat
        jQuery.uaMatch = function (ua) {
            ua = ua.toLowerCase();

            var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
                /(webkit)[ \/]([\w.]+)/.exec(ua) ||
                /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
                /(msie) ([\w.]+)/.exec(ua) ||
                ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
                [];

            return {
                browser:match[ 1 ] || "",
                version:match[ 2 ] || "0"
            };
        };

        matched = jQuery.uaMatch(navigator.userAgent);
        browser = {};

        if (matched.browser) {
            browser[ matched.browser ] = true;
            browser.version = matched.version;
        }

// Chrome is Webkit, but Webkit is also Safari.
        if (browser.chrome) {
            browser.webkit = true;
        } else if (browser.webkit) {
            browser.safari = true;
        }

        jQuery.browser = browser;

        jQuery.sub = function () {
            function jQuerySub(selector, context) {
                return new jQuerySub.fn.init(selector, context);
            }

            jQuery.extend(true, jQuerySub, this);
            jQuerySub.superclass = this;
            jQuerySub.fn = jQuerySub.prototype = this();
            jQuerySub.fn.constructor = jQuerySub;
            jQuerySub.sub = this.sub;
            jQuerySub.fn.init = function init(selector, context) {
                if (context && context instanceof jQuery && !(context instanceof jQuerySub)) {
                    context = jQuerySub(context);
                }

                return jQuery.fn.init.call(this, selector, context, rootjQuerySub);
            };
            jQuerySub.fn.init.prototype = jQuerySub.fn;
            var rootjQuerySub = jQuerySub(document);
            return jQuerySub;
        };

    })();
    var curCSS, iframe, iframeDoc,
        ralpha = /alpha\([^)]*\)/i,
        ropacity = /opacity=([^)]*)/,
        rposition = /^(top|right|bottom|left)$/,
    // swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
    // see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
        rdisplayswap = /^(none|table(?!-c[ea]).+)/,
        rmargin = /^margin/,
        rnumsplit = new RegExp("^(" + core_pnum + ")(.*)$", "i"),
        rnumnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i"),
        rrelNum = new RegExp("^([-+])=(" + core_pnum + ")", "i"),
        elemdisplay = {},

        cssShow = { position:"absolute", visibility:"hidden", display:"block" },
        cssNormalTransform = {
            letterSpacing:0,
            fontWeight:400
        },

        cssExpand = [ "Top", "Right", "Bottom", "Left" ],
        cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],

        eventsToggle = jQuery.fn.toggle;

// return a css property mapped to a potentially vendor prefixed property
    function vendorPropName(style, name) {

        // shortcut for names that are not vendor prefixed
        if (name in style) {
            return name;
        }

        // check for vendor prefixed names
        var capName = name.charAt(0).toUpperCase() + name.slice(1),
            origName = name,
            i = cssPrefixes.length;

        while (i--) {
            name = cssPrefixes[ i ] + capName;
            if (name in style) {
                return name;
            }
        }

        return origName;
    }

    function isHidden(elem, el) {
        elem = el || elem;
        return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
    }

    function showHide(elements, show) {
        var elem, display,
            values = [],
            index = 0,
            length = elements.length;

        for (; index < length; index++) {
            elem = elements[ index ];
            if (!elem.style) {
                continue;
            }
            values[ index ] = jQuery._data(elem, "olddisplay");
            if (show) {
                // Reset the inline display of this element to learn if it is
                // being hidden by cascaded rules or not
                if (!values[ index ] && elem.style.display === "none") {
                    elem.style.display = "";
                }

                // Set elements which have been overridden with display: none
                // in a stylesheet to whatever the default browser style is
                // for such an element
                if (elem.style.display === "" && isHidden(elem)) {
                    values[ index ] = jQuery._data(elem, "olddisplay", css_defaultDisplay(elem.nodeName));
                }
            } else {
                display = curCSS(elem, "display");

                if (!values[ index ] && display !== "none") {
                    jQuery._data(elem, "olddisplay", display);
                }
            }
        }

        // Set the display of most of the elements in a second loop
        // to avoid the constant reflow
        for (index = 0; index < length; index++) {
            elem = elements[ index ];
            if (!elem.style) {
                continue;
            }
            if (!show || elem.style.display === "none" || elem.style.display === "") {
                elem.style.display = show ? values[ index ] || "" : "none";
            }
        }

        return elements;
    }

    jQuery.fn.extend({
        css:function (name, value) {
            return jQuery.access(this, function (elem, name, value) {
                return value !== undefined ?
                    jQuery.style(elem, name, value) :
                    jQuery.css(elem, name);
            }, name, value, arguments.length > 1);
        },
        show:function () {
            return showHide(this, true);
        },
        hide:function () {
            return showHide(this);
        },
        toggle:function (state, fn2) {
            var bool = typeof state === "boolean";

            if (jQuery.isFunction(state) && jQuery.isFunction(fn2)) {
                return eventsToggle.apply(this, arguments);
            }

            return this.each(function () {
                if (bool ? state : isHidden(this)) {
                    jQuery(this).show();
                } else {
                    jQuery(this).hide();
                }
            });
        }
    });

    jQuery.extend({
        // Add in style property hooks for overriding the default
        // behavior of getting and setting a style property
        cssHooks:{
            opacity:{
                get:function (elem, computed) {
                    if (computed) {
                        // We should always get a number back from opacity
                        var ret = curCSS(elem, "opacity");
                        return ret === "" ? "1" : ret;

                    }
                }
            }
        },

        // Exclude the following css properties to add px
        cssNumber:{
            "fillOpacity":true,
            "fontWeight":true,
            "lineHeight":true,
            "opacity":true,
            "orphans":true,
            "widows":true,
            "zIndex":true,
            "zoom":true
        },

        // Add in properties whose names you wish to fix before
        // setting or getting the value
        cssProps:{
            // normalize float css property
            "float":jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
        },

        // Get and set the style property on a DOM Node
        style:function (elem, name, value, extra) {
            // Don't set styles on text and comment nodes
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                return;
            }

            // Make sure that we're working with the right name
            var ret, type, hooks,
                origName = jQuery.camelCase(name),
                style = elem.style;

            name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName(style, origName) );

            // gets hook for the prefixed version
            // followed by the unprefixed version
            hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

            // Check if we're setting a value
            if (value !== undefined) {
                type = typeof value;

                // convert relative number strings (+= or -=) to relative numbers. #7345
                if (type === "string" && (ret = rrelNum.exec(value))) {
                    value = ( ret[1] + 1 ) * ret[2] + parseFloat(jQuery.css(elem, name));
                    // Fixes bug #9237
                    type = "number";
                }

                // Make sure that NaN and null values aren't set. See: #7116
                if (value == null || type === "number" && isNaN(value)) {
                    return;
                }

                // If a number was passed in, add 'px' to the (except for certain CSS properties)
                if (type === "number" && !jQuery.cssNumber[ origName ]) {
                    value += "px";
                }

                // If a hook was provided, use that value, otherwise just set the specified value
                if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
                    // Wrapped to prevent IE from throwing errors when 'invalid' values are provided
                    // Fixes bug #5509
                    try {
                        style[ name ] = value;
                    } catch (e) {
                    }
                }

            } else {
                // If a hook was provided get the non-computed value from there
                if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
                    return ret;
                }

                // Otherwise just get the value from the style object
                return style[ name ];
            }
        },

        css:function (elem, name, numeric, extra) {
            var val, num, hooks,
                origName = jQuery.camelCase(name);

            // Make sure that we're working with the right name
            name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName(elem.style, origName) );

            // gets hook for the prefixed version
            // followed by the unprefixed version
            hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

            // If a hook was provided get the computed value from there
            if (hooks && "get" in hooks) {
                val = hooks.get(elem, true, extra);
            }

            // Otherwise, if a way to get the computed value exists, use that
            if (val === undefined) {
                val = curCSS(elem, name);
            }

            //convert "normal" to computed value
            if (val === "normal" && name in cssNormalTransform) {
                val = cssNormalTransform[ name ];
            }

            // Return, converting to number if forced or a qualifier was provided and val looks numeric
            if (numeric || extra !== undefined) {
                num = parseFloat(val);
                return numeric || jQuery.isNumeric(num) ? num || 0 : val;
            }
            return val;
        },

        // A method for quickly swapping in/out CSS properties to get correct calculations
        swap:function (elem, options, callback) {
            var ret, name,
                old = {};

            // Remember the old values, and insert the new ones
            for (name in options) {
                old[ name ] = elem.style[ name ];
                elem.style[ name ] = options[ name ];
            }

            ret = callback.call(elem);

            // Revert the old values
            for (name in options) {
                elem.style[ name ] = old[ name ];
            }

            return ret;
        }
    });

// NOTE: To any future maintainer, we've window.getComputedStyle
// because jsdom on node.js will break without it.
    if (window.getComputedStyle) {
        curCSS = function (elem, name) {
            var ret, width, minWidth, maxWidth,
                computed = window.getComputedStyle(elem, null),
                style = elem.style;

            if (computed) {

                ret = computed[ name ];
                if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
                    ret = jQuery.style(elem, name);
                }

                // A tribute to the "awesome hack by Dean Edwards"
                // Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
                // Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
                // this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
                if (rnumnonpx.test(ret) && rmargin.test(name)) {
                    width = style.width;
                    minWidth = style.minWidth;
                    maxWidth = style.maxWidth;

                    style.minWidth = style.maxWidth = style.width = ret;
                    ret = computed.width;

                    style.width = width;
                    style.minWidth = minWidth;
                    style.maxWidth = maxWidth;
                }
            }

            return ret;
        };
    } else if (document.documentElement.currentStyle) {
        curCSS = function (elem, name) {
            var left, rsLeft,
                ret = elem.currentStyle && elem.currentStyle[ name ],
                style = elem.style;

            // Avoid setting ret to empty string here
            // so we don't default to auto
            if (ret == null && style && style[ name ]) {
                ret = style[ name ];
            }

            // From the awesome hack by Dean Edwards
            // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

            // If we're not dealing with a regular pixel number
            // but a number that has a weird ending, we need to convert it to pixels
            // but not position css attributes, as those are proportional to the parent element instead
            // and we can't measure the parent instead because it might trigger a "stacking dolls" problem
            if (rnumnonpx.test(ret) && !rposition.test(name)) {

                // Remember the original values
                left = style.left;
                rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;

                // Put in the new values to get a computed value out
                if (rsLeft) {
                    elem.runtimeStyle.left = elem.currentStyle.left;
                }
                style.left = name === "fontSize" ? "1em" : ret;
                ret = style.pixelLeft + "px";

                // Revert the changed values
                style.left = left;
                if (rsLeft) {
                    elem.runtimeStyle.left = rsLeft;
                }
            }

            return ret === "" ? "auto" : ret;
        };
    }

    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ?
            Math.max(0, matches[ 1 ] - ( subtract || 0 )) + ( matches[ 2 ] || "px" ) :
            value;
    }

    function augmentWidthOrHeight(elem, name, extra, isBorderBox) {
        var i = extra === ( isBorderBox ? "border" : "content" ) ?
                // If we already have the right measurement, avoid augmentation
                4 :
                // Otherwise initialize for horizontal or vertical properties
                name === "width" ? 1 : 0,

            val = 0;

        for (; i < 4; i += 2) {
            // both box models exclude margin, so add it if we want it
            if (extra === "margin") {
                // we use jQuery.css instead of curCSS here
                // because of the reliableMarginRight CSS hook!
                val += jQuery.css(elem, extra + cssExpand[ i ], true);
            }

            // From this point on we use curCSS for maximum performance (relevant in animations)
            if (isBorderBox) {
                // border-box includes padding, so remove it if we want content
                if (extra === "content") {
                    val -= parseFloat(curCSS(elem, "padding" + cssExpand[ i ])) || 0;
                }

                // at this point, extra isn't border nor margin, so remove border
                if (extra !== "margin") {
                    val -= parseFloat(curCSS(elem, "border" + cssExpand[ i ] + "Width")) || 0;
                }
            } else {
                // at this point, extra isn't content, so add padding
                val += parseFloat(curCSS(elem, "padding" + cssExpand[ i ])) || 0;

                // at this point, extra isn't content nor padding, so add border
                if (extra !== "padding") {
                    val += parseFloat(curCSS(elem, "border" + cssExpand[ i ] + "Width")) || 0;
                }
            }
        }

        return val;
    }

    function getWidthOrHeight(elem, name, extra) {

        // Start with offset property, which is equivalent to the border-box value
        var val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
            valueIsBorderBox = true,
            isBorderBox = jQuery.support.boxSizing && jQuery.css(elem, "boxSizing") === "border-box";

        // some non-html elements return undefined for offsetWidth, so check for null/undefined
        // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
        // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
        if (val <= 0 || val == null) {
            // Fall back to computed then uncomputed css if necessary
            val = curCSS(elem, name);
            if (val < 0 || val == null) {
                val = elem.style[ name ];
            }

            // Computed unit is not pixels. Stop here and return.
            if (rnumnonpx.test(val)) {
                return val;
            }

            // we need the check for style in case a browser which returns unreliable values
            // for getComputedStyle silently falls back to the reliable elem.style
            valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

            // Normalize "", auto, and prepare for extra
            val = parseFloat(val) || 0;
        }

        // use the active box-sizing model to add/subtract irrelevant styles
        return ( val +
            augmentWidthOrHeight(
                elem,
                name,
                extra || ( isBorderBox ? "border" : "content" ),
                valueIsBorderBox
            )
            ) + "px";
    }


// Try to determine the default display value of an element
    function css_defaultDisplay(nodeName) {
        if (elemdisplay[ nodeName ]) {
            return elemdisplay[ nodeName ];
        }

        var elem = jQuery("<" + nodeName + ">").appendTo(document.body),
            display = elem.css("display");
        elem.remove();

        // If the simple way fails,
        // get element's real default display by attaching it to a temp iframe
        if (display === "none" || display === "") {
            // Use the already-created iframe if possible
            iframe = document.body.appendChild(
                iframe || jQuery.extend(document.createElement("iframe"), {
                    frameBorder:0,
                    width:0,
                    height:0
                })
            );

            // Create a cacheable copy of the iframe document on first call.
            // IE and Opera will allow us to reuse the iframeDoc without re-writing the fake HTML
            // document to it; WebKit & Firefox won't allow reusing the iframe document.
            if (!iframeDoc || !iframe.createElement) {
                iframeDoc = ( iframe.contentWindow || iframe.contentDocument ).document;
                iframeDoc.write("<!doctype html><html><body>");
                iframeDoc.close();
            }

            elem = iframeDoc.body.appendChild(iframeDoc.createElement(nodeName));

            display = curCSS(elem, "display");
            document.body.removeChild(iframe);
        }

        // Store the correct default display
        elemdisplay[ nodeName ] = display;

        return display;
    }

    jQuery.each([ "height", "width" ], function (i, name) {
        jQuery.cssHooks[ name ] = {
            get:function (elem, computed, extra) {
                if (computed) {
                    // certain elements can have dimension info if we invisibly show them
                    // however, it must have a current display style that would benefit from this
                    if (elem.offsetWidth === 0 && rdisplayswap.test(curCSS(elem, "display"))) {
                        return jQuery.swap(elem, cssShow, function () {
                            return getWidthOrHeight(elem, name, extra);
                        });
                    } else {
                        return getWidthOrHeight(elem, name, extra);
                    }
                }
            },

            set:function (elem, value, extra) {
                return setPositiveNumber(elem, value, extra ?
                    augmentWidthOrHeight(
                        elem,
                        name,
                        extra,
                        jQuery.support.boxSizing && jQuery.css(elem, "boxSizing") === "border-box"
                    ) : 0
                );
            }
        };
    });

    if (!jQuery.support.opacity) {
        jQuery.cssHooks.opacity = {
            get:function (elem, computed) {
                // IE uses filters for opacity
                return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ?
                    ( 0.01 * parseFloat(RegExp.$1) ) + "" :
                    computed ? "1" : "";
            },

            set:function (elem, value) {
                var style = elem.style,
                    currentStyle = elem.currentStyle,
                    opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + value * 100 + ")" : "",
                    filter = currentStyle && currentStyle.filter || style.filter || "";

                // IE has trouble with opacity if it does not have layout
                // Force it by setting the zoom level
                style.zoom = 1;

                // if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
                if (value >= 1 && jQuery.trim(filter.replace(ralpha, "")) === "" &&
                    style.removeAttribute) {

                    // Setting style.filter to null, "" & " " still leave "filter:" in the cssText
                    // if "filter:" is present at all, clearType is disabled, we want to avoid this
                    // style.removeAttribute is IE Only, but so apparently is this code path...
                    style.removeAttribute("filter");

                    // if there there is no filter style applied in a css rule, we are done
                    if (currentStyle && !currentStyle.filter) {
                        return;
                    }
                }

                // otherwise, set new filter values
                style.filter = ralpha.test(filter) ?
                    filter.replace(ralpha, opacity) :
                    filter + " " + opacity;
            }
        };
    }

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
    jQuery(function () {
        if (!jQuery.support.reliableMarginRight) {
            jQuery.cssHooks.marginRight = {
                get:function (elem, computed) {
                    // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
                    // Work around by temporarily setting element display to inline-block
                    return jQuery.swap(elem, { "display":"inline-block" }, function () {
                        if (computed) {
                            return curCSS(elem, "marginRight");
                        }
                    });
                }
            };
        }

        // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
        // getComputedStyle returns percent when specified for top/left/bottom/right
        // rather than make the css module depend on the offset module, we just check for it here
        if (!jQuery.support.pixelPosition && jQuery.fn.position) {
            jQuery.each([ "top", "left" ], function (i, prop) {
                jQuery.cssHooks[ prop ] = {
                    get:function (elem, computed) {
                        if (computed) {
                            var ret = curCSS(elem, prop);
                            // if curCSS returns percentage, fallback to offset
                            return rnumnonpx.test(ret) ? jQuery(elem).position()[ prop ] + "px" : ret;
                        }
                    }
                };
            });
        }

    });

    if (jQuery.expr && jQuery.expr.filters) {
        jQuery.expr.filters.hidden = function (elem) {
            return ( elem.offsetWidth === 0 && elem.offsetHeight === 0 ) || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || curCSS(elem, "display")) === "none");
        };

        jQuery.expr.filters.visible = function (elem) {
            return !jQuery.expr.filters.hidden(elem);
        };
    }

// These hooks are used by animate to expand properties
    jQuery.each({
        margin:"",
        padding:"",
        border:"Width"
    }, function (prefix, suffix) {
        jQuery.cssHooks[ prefix + suffix ] = {
            expand:function (value) {
                var i,

                // assumes a single number if not a string
                    parts = typeof value === "string" ? value.split(" ") : [ value ],
                    expanded = {};

                for (i = 0; i < 4; i++) {
                    expanded[ prefix + cssExpand[ i ] + suffix ] =
                        parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
                }

                return expanded;
            }
        };

        if (!rmargin.test(prefix)) {
            jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
        }
    });
    var r20 = /%20/g,
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        rselectTextarea = /^(?:select|textarea)/i;

    jQuery.fn.extend({
        serialize:function () {
            return jQuery.param(this.serializeArray());
        },
        serializeArray:function () {
            return this.map(function () {
                return this.elements ? jQuery.makeArray(this.elements) : this;
            })
                .filter(function () {
                    return this.name && !this.disabled &&
                        ( this.checked || rselectTextarea.test(this.nodeName) ||
                            rinput.test(this.type) );
                })
                .map(function (i, elem) {
                    var val = jQuery(this).val();

                    return val == null ?
                        null :
                        jQuery.isArray(val) ?
                            jQuery.map(val, function (val, i) {
                                return { name:elem.name, value:val.replace(rCRLF, "\r\n") };
                            }) :
                        { name:elem.name, value:val.replace(rCRLF, "\r\n") };
                }).get();
        }
    });

//Serialize an array of form elements or a set of
//key/values into a query string
    jQuery.param = function (a, traditional) {
        var prefix,
            s = [],
            add = function (key, value) {
                // If value is a function, invoke it and return its value
                value = jQuery.isFunction(value) ? value() : ( value == null ? "" : value );
                s[ s.length ] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
            };

        // Set traditional to true for jQuery <= 1.3.2 behavior.
        if (traditional === undefined) {
            traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
        }

        // If an array was passed in, assume that it is an array of form elements.
        if (jQuery.isArray(a) || ( a.jquery && !jQuery.isPlainObject(a) )) {
            // Serialize the form elements
            jQuery.each(a, function () {
                add(this.name, this.value);
            });

        } else {
            // If traditional, encode the "old" way (the way 1.3.2 or older
            // did it), otherwise encode params recursively.
            for (prefix in a) {
                buildParams(prefix, a[ prefix ], traditional, add);
            }
        }

        // Return the resulting serialization
        return s.join("&").replace(r20, "+");
    };

    function buildParams(prefix, obj, traditional, add) {
        var name;

        if (jQuery.isArray(obj)) {
            // Serialize array item.
            jQuery.each(obj, function (i, v) {
                if (traditional || rbracket.test(prefix)) {
                    // Treat each array item as a scalar.
                    add(prefix, v);

                } else {
                    // If array item is non-scalar (array or object), encode its
                    // numeric index to resolve deserialization ambiguity issues.
                    // Note that rack (as of 1.0.0) can't currently deserialize
                    // nested arrays properly, and attempting to do so may cause
                    // a server error. Possible fixes are to modify rack's
                    // deserialization algorithm or to provide an option or flag
                    // to force array serialization to be shallow.
                    buildParams(prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add);
                }
            });

        } else if (!traditional && jQuery.type(obj) === "object") {
            // Serialize object item.
            for (name in obj) {
                buildParams(prefix + "[" + name + "]", obj[ name ], traditional, add);
            }

        } else {
            // Serialize scalar item.
            add(prefix, obj);
        }
    }

    var
    // Document location
        ajaxLocParts,
        ajaxLocation,

        rhash = /#.*$/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
    // #7653, #8125, #8152: local protocol detection
        rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,
        rquery = /\?/,
        rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        rts = /([?&])_=[^&]*/,
        rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

    // Keep a copy of the old load method
        _load = jQuery.fn.load,

    /* Prefilters
     * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
     * 2) These are called:
     *    - BEFORE asking for a transport
     *    - AFTER param serialization (s.data is a string if s.processData is true)
     * 3) key is the dataType
     * 4) the catchall symbol "*" can be used
     * 5) execution will start with transport dataType and THEN continue down to "*" if needed
     */
        prefilters = {},

    /* Transports bindings
     * 1) key is the dataType
     * 2) the catchall symbol "*" can be used
     * 3) selection will start with transport dataType and THEN go to "*" if needed
     */
        transports = {},

    // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
        allTypes = ["*/"] + ["*"];

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
    try {
        ajaxLocation = location.href;
    } catch (e) {
        // Use the href attribute of an A element
        // since IE will modify it given document.location
        ajaxLocation = document.createElement("a");
        ajaxLocation.href = "";
        ajaxLocation = ajaxLocation.href;
    }

// Segment location into parts
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
    function addToPrefiltersOrTransports(structure) {

        // dataTypeExpression is optional and defaults to "*"
        return function (dataTypeExpression, func) {

            if (typeof dataTypeExpression !== "string") {
                func = dataTypeExpression;
                dataTypeExpression = "*";
            }

            var dataType, list, placeBefore,
                dataTypes = dataTypeExpression.toLowerCase().split(core_rspace),
                i = 0,
                length = dataTypes.length;

            if (jQuery.isFunction(func)) {
                // For each dataType in the dataTypeExpression
                for (; i < length; i++) {
                    dataType = dataTypes[ i ];
                    // We control if we're asked to add before
                    // any existing element
                    placeBefore = /^\+/.test(dataType);
                    if (placeBefore) {
                        dataType = dataType.substr(1) || "*";
                    }
                    list = structure[ dataType ] = structure[ dataType ] || [];
                    // then we add to the structure accordingly
                    list[ placeBefore ? "unshift" : "push" ](func);
                }
            }
        };
    }

// Base inspection function for prefilters and transports
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, dataType /* internal */, inspected /* internal */) {

        dataType = dataType || options.dataTypes[ 0 ];
        inspected = inspected || {};

        inspected[ dataType ] = true;

        var selection,
            list = structure[ dataType ],
            i = 0,
            length = list ? list.length : 0,
            executeOnly = ( structure === prefilters );

        for (; i < length && ( executeOnly || !selection ); i++) {
            selection = list[ i ](options, originalOptions, jqXHR);
            // If we got redirected to another dataType
            // we try there if executing only and not done already
            if (typeof selection === "string") {
                if (!executeOnly || inspected[ selection ]) {
                    selection = undefined;
                } else {
                    options.dataTypes.unshift(selection);
                    selection = inspectPrefiltersOrTransports(
                        structure, options, originalOptions, jqXHR, selection, inspected);
                }
            }
        }
        // If we're only executing or nothing was selected
        // we try the catchall dataType if not done already
        if (( executeOnly || !selection ) && !inspected[ "*" ]) {
            selection = inspectPrefiltersOrTransports(
                structure, options, originalOptions, jqXHR, "*", inspected);
        }
        // unnecessary when only executing (prefilters)
        // but it'll be ignored by the caller in that case
        return selection;
    }

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
    function ajaxExtend(target, src) {
        var key, deep,
            flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) {
            if (src[ key ] !== undefined) {
                ( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
            }
        }
        if (deep) {
            jQuery.extend(true, target, deep);
        }
    }

    jQuery.fn.load = function (url, params, callback) {
        if (typeof url !== "string" && _load) {
            return _load.apply(this, arguments);
        }

        // Don't do a request if no elements are being requested
        if (!this.length) {
            return this;
        }

        var selector, type, response,
            self = this,
            off = url.indexOf(" ");

        if (off >= 0) {
            selector = url.slice(off, url.length);
            url = url.slice(0, off);
        }

        // If it's a function
        if (jQuery.isFunction(params)) {

            // We assume that it's the callback
            callback = params;
            params = undefined;

            // Otherwise, build a param string
        } else if (params && typeof params === "object") {
            type = "POST";
        }

        // Request the remote document
        jQuery.ajax({
            url:url,

            // if "type" variable is undefined, then "GET" method will be used
            type:type,
            dataType:"html",
            data:params,
            complete:function (jqXHR, status) {
                if (callback) {
                    self.each(callback, response || [ jqXHR.responseText, status, jqXHR ]);
                }
            }
        }).done(function (responseText) {

                // Save response for use in complete callback
                response = arguments;

                // See if a selector was specified
                self.html(selector ?

                    // Create a dummy div to hold the results
                    jQuery("<div>")

                        // inject the contents of the document in, removing the scripts
                        // to avoid any 'Permission Denied' errors in IE
                        .append(responseText.replace(rscript, ""))

                        // Locate the specified elements
                        .find(selector) :

                    // If not, just inject the full result
                    responseText);

            });

        return this;
    };

// Attach a bunch of functions for handling common AJAX events
    jQuery.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (i, o) {
        jQuery.fn[ o ] = function (f) {
            return this.on(o, f);
        };
    });

    jQuery.each([ "get", "post" ], function (i, method) {
        jQuery[ method ] = function (url, data, callback, type) {
            // shift arguments if data argument was omitted
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
            }

            return jQuery.ajax({
                type:method,
                url:url,
                data:data,
                success:callback,
                dataType:type
            });
        };
    });

    jQuery.extend({

        getScript:function (url, callback) {
            return jQuery.get(url, undefined, callback, "script");
        },

        getJSON:function (url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },

        // Creates a full fledged settings object into target
        // with both ajaxSettings and settings fields.
        // If target is omitted, writes into ajaxSettings.
        ajaxSetup:function (target, settings) {
            if (settings) {
                // Building a settings object
                ajaxExtend(target, jQuery.ajaxSettings);
            } else {
                // Extending ajaxSettings
                settings = target;
                target = jQuery.ajaxSettings;
            }
            ajaxExtend(target, settings);
            return target;
        },

        ajaxSettings:{
            url:ajaxLocation,
            isLocal:rlocalProtocol.test(ajaxLocParts[ 1 ]),
            global:true,
            type:"GET",
            contentType:"application/x-www-form-urlencoded; charset=UTF-8",
            processData:true,
            async:true,
            /*
             timeout: 0,
             data: null,
             dataType: null,
             username: null,
             password: null,
             cache: null,
             throws: false,
             traditional: false,
             headers: {},
             */

            accepts:{
                xml:"application/xml, text/xml",
                html:"text/html",
                text:"text/plain",
                json:"application/json, text/javascript",
                "*":allTypes
            },

            contents:{
                xml:/xml/,
                html:/html/,
                json:/json/
            },

            responseFields:{
                xml:"responseXML",
                text:"responseText"
            },

            // List of data converters
            // 1) key format is "source_type destination_type" (a single space in-between)
            // 2) the catchall symbol "*" can be used for source_type
            converters:{

                // Convert anything to text
                "* text":window.String,

                // Text to html (true = no transformation)
                "text html":true,

                // Evaluate text as a json expression
                "text json":jQuery.parseJSON,

                // Parse text as xml
                "text xml":jQuery.parseXML
            },

            // For options that shouldn't be deep extended:
            // you can add your own custom options here if
            // and when you create one that shouldn't be
            // deep extended (see ajaxExtend)
            flatOptions:{
                context:true,
                url:true
            }
        },

        ajaxPrefilter:addToPrefiltersOrTransports(prefilters),
        ajaxTransport:addToPrefiltersOrTransports(transports),

        // Main method
        ajax:function (url, options) {

            // If url is an object, simulate pre-1.5 signature
            if (typeof url === "object") {
                options = url;
                url = undefined;
            }

            // Force options to be an object
            options = options || {};

            var // ifModified key
                ifModifiedKey,
            // Response headers
                responseHeadersString,
                responseHeaders,
            // transport
                transport,
            // timeout handle
                timeoutTimer,
            // Cross-domain detection vars
                parts,
            // To know if global events are to be dispatched
                fireGlobals,
            // Loop variable
                i,
            // Create the final options object
                s = jQuery.ajaxSetup({}, options),
            // Callbacks context
                callbackContext = s.context || s,
            // Context for global events
            // It's the callbackContext if one was provided in the options
            // and if it's a DOM node or a jQuery collection
                globalEventContext = callbackContext !== s &&
                    ( callbackContext.nodeType || callbackContext instanceof jQuery ) ?
                    jQuery(callbackContext) : jQuery.event,
            // Deferreds
                deferred = jQuery.Deferred(),
                completeDeferred = jQuery.Callbacks("once memory"),
            // Status-dependent callbacks
                statusCode = s.statusCode || {},
            // Headers (they are sent all at once)
                requestHeaders = {},
                requestHeadersNames = {},
            // The jqXHR state
                state = 0,
            // Default abort message
                strAbort = "canceled",
            // Fake xhr
                jqXHR = {

                    readyState:0,

                    // Caches the header
                    setRequestHeader:function (name, value) {
                        if (!state) {
                            var lname = name.toLowerCase();
                            name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
                            requestHeaders[ name ] = value;
                        }
                        return this;
                    },

                    // Raw string
                    getAllResponseHeaders:function () {
                        return state === 2 ? responseHeadersString : null;
                    },

                    // Builds headers hashtable if needed
                    getResponseHeader:function (key) {
                        var match;
                        if (state === 2) {
                            if (!responseHeaders) {
                                responseHeaders = {};
                                while (( match = rheaders.exec(responseHeadersString) )) {
                                    responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
                                }
                            }
                            match = responseHeaders[ key.toLowerCase() ];
                        }
                        return match === undefined ? null : match;
                    },

                    // Overrides response content-type header
                    overrideMimeType:function (type) {
                        if (!state) {
                            s.mimeType = type;
                        }
                        return this;
                    },

                    // Cancel the request
                    abort:function (statusText) {
                        statusText = statusText || strAbort;
                        if (transport) {
                            transport.abort(statusText);
                        }
                        done(0, statusText);
                        return this;
                    }
                };

            // Callback for when everything is done
            // It is defined here because jslint complains if it is declared
            // at the end of the function (which would be more logical and readable)
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified,
                    statusText = nativeStatusText;

                // Called once
                if (state === 2) {
                    return;
                }

                // State is "done" now
                state = 2;

                // Clear timeout if it exists
                if (timeoutTimer) {
                    clearTimeout(timeoutTimer);
                }

                // Dereference transport for early garbage collection
                // (no matter how long the jqXHR object will be used)
                transport = undefined;

                // Cache response headers
                responseHeadersString = headers || "";

                // Set readyState
                jqXHR.readyState = status > 0 ? 4 : 0;

                // Get response data
                if (responses) {
                    response = ajaxHandleResponses(s, jqXHR, responses);
                }

                // If successful, handle type chaining
                if (status >= 200 && status < 300 || status === 304) {

                    // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                    if (s.ifModified) {

                        modified = jqXHR.getResponseHeader("Last-Modified");
                        if (modified) {
                            jQuery.lastModified[ ifModifiedKey ] = modified;
                        }
                        modified = jqXHR.getResponseHeader("Etag");
                        if (modified) {
                            jQuery.etag[ ifModifiedKey ] = modified;
                        }
                    }

                    // If not modified
                    if (status === 304) {

                        statusText = "notmodified";
                        isSuccess = true;

                        // If we have data
                    } else {

                        isSuccess = ajaxConvert(s, response);
                        statusText = isSuccess.state;
                        success = isSuccess.data;
                        error = isSuccess.error;
                        isSuccess = !error;
                    }
                } else {
                    // We extract error from statusText
                    // then normalize statusText and status for non-aborts
                    error = statusText;
                    if (!statusText || status) {
                        statusText = "error";
                        if (status < 0) {
                            status = 0;
                        }
                    }
                }

                // Set data for the fake xhr object
                jqXHR.status = status;
                jqXHR.statusText = ( nativeStatusText || statusText ) + "";

                // Success/Error
                if (isSuccess) {
                    deferred.resolveWith(callbackContext, [ success, statusText, jqXHR ]);
                } else {
                    deferred.rejectWith(callbackContext, [ jqXHR, statusText, error ]);
                }

                // Status-dependent callbacks
                jqXHR.statusCode(statusCode);
                statusCode = undefined;

                if (fireGlobals) {
                    globalEventContext.trigger("ajax" + ( isSuccess ? "Success" : "Error" ),
                        [ jqXHR, s, isSuccess ? success : error ]);
                }

                // Complete
                completeDeferred.fireWith(callbackContext, [ jqXHR, statusText ]);

                if (fireGlobals) {
                    globalEventContext.trigger("ajaxComplete", [ jqXHR, s ]);
                    // Handle the global AJAX counter
                    if (!( --jQuery.active )) {
                        jQuery.event.trigger("ajaxStop");
                    }
                }
            }

            // Attach deferreds
            deferred.promise(jqXHR);
            jqXHR.success = jqXHR.done;
            jqXHR.error = jqXHR.fail;
            jqXHR.complete = completeDeferred.add;

            // Status-dependent callbacks
            jqXHR.statusCode = function (map) {
                if (map) {
                    var tmp;
                    if (state < 2) {
                        for (tmp in map) {
                            statusCode[ tmp ] = [ statusCode[tmp], map[tmp] ];
                        }
                    } else {
                        tmp = map[ jqXHR.status ];
                        jqXHR.always(tmp);
                    }
                }
                return this;
            };

            // Remove hash character (#7531: and string promotion)
            // Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
            // We also use the url parameter if available
            s.url = ( ( url || s.url ) + "" ).replace(rhash, "").replace(rprotocol, ajaxLocParts[ 1 ] + "//");

            // Extract dataTypes list
            s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().split(core_rspace);

            // A cross-domain request is in order when we have a protocol:host:port mismatch
            if (s.crossDomain == null) {
                parts = rurl.exec(s.url.toLowerCase()) || false;
                s.crossDomain = parts && ( parts.join(":") + ( parts[ 3 ] ? "" : parts[ 1 ] === "http:" ? 80 : 443 ) ) !==
                    ( ajaxLocParts.join(":") + ( ajaxLocParts[ 3 ] ? "" : ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) );
            }

            // Convert data if not already a string
            if (s.data && s.processData && typeof s.data !== "string") {
                s.data = jQuery.param(s.data, s.traditional);
            }

            // Apply prefilters
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

            // If request was aborted inside a prefilter, stop there
            if (state === 2) {
                return jqXHR;
            }

            // We can fire global events as of now if asked to
            fireGlobals = s.global;

            // Uppercase the type
            s.type = s.type.toUpperCase();

            // Determine if request has content
            s.hasContent = !rnoContent.test(s.type);

            // Watch for a new set of requests
            if (fireGlobals && jQuery.active++ === 0) {
                jQuery.event.trigger("ajaxStart");
            }

            // More options handling for requests with no content
            if (!s.hasContent) {

                // If data is available, append data to url
                if (s.data) {
                    s.url += ( rquery.test(s.url) ? "&" : "?" ) + s.data;
                    // #9682: remove data so that it's not used in an eventual retry
                    delete s.data;
                }

                // Get ifModifiedKey before adding the anti-cache parameter
                ifModifiedKey = s.url;

                // Add anti-cache in url if needed
                if (s.cache === false) {

                    var ts = jQuery.now(),
                    // try replacing _= if it is there
                        ret = s.url.replace(rts, "$1_=" + ts);

                    // if nothing was replaced, add timestamp to the end
                    s.url = ret + ( ( ret === s.url ) ? ( rquery.test(s.url) ? "&" : "?" ) + "_=" + ts : "" );
                }
            }

            // Set the correct header, if data is being sent
            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                jqXHR.setRequestHeader("Content-Type", s.contentType);
            }

            // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
            if (s.ifModified) {
                ifModifiedKey = ifModifiedKey || s.url;
                if (jQuery.lastModified[ ifModifiedKey ]) {
                    jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[ ifModifiedKey ]);
                }
                if (jQuery.etag[ ifModifiedKey ]) {
                    jqXHR.setRequestHeader("If-None-Match", jQuery.etag[ ifModifiedKey ]);
                }
            }

            // Set the Accepts header for the server, depending on the dataType
            jqXHR.setRequestHeader(
                "Accept",
                s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
                    s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
                    s.accepts[ "*" ]
            );

            // Check for headers option
            for (i in s.headers) {
                jqXHR.setRequestHeader(i, s.headers[ i ]);
            }

            // Allow custom headers/mimetypes and early abort
            if (s.beforeSend && ( s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2 )) {
                // Abort if not done already and return
                return jqXHR.abort();

            }

            // aborting is no longer a cancellation
            strAbort = "abort";

            // Install callbacks on deferreds
            for (i in { success:1, error:1, complete:1 }) {
                jqXHR[ i ](s[ i ]);
            }

            // Get transport
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

            // If no transport, we auto-abort
            if (!transport) {
                done(-1, "No Transport");
            } else {
                jqXHR.readyState = 1;
                // Send global event
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxSend", [ jqXHR, s ]);
                }
                // Timeout
                if (s.async && s.timeout > 0) {
                    timeoutTimer = setTimeout(function () {
                        jqXHR.abort("timeout");
                    }, s.timeout);
                }

                try {
                    state = 1;
                    transport.send(requestHeaders, done);
                } catch (e) {
                    // Propagate exception as error if not done
                    if (state < 2) {
                        done(-1, e);
                        // Simply rethrow otherwise
                    } else {
                        throw e;
                    }
                }
            }

            return jqXHR;
        },

        // Counter for holding the number of active queries
        active:0,

        // Last-Modified header cache for next request
        lastModified:{},
        etag:{}

    });

    /* Handles responses to an ajax request:
     * - sets all responseXXX fields accordingly
     * - finds the right dataType (mediates between content-type and expected dataType)
     * - returns the corresponding response
     */
    function ajaxHandleResponses(s, jqXHR, responses) {

        var ct, type, finalDataType, firstDataType,
            contents = s.contents,
            dataTypes = s.dataTypes,
            responseFields = s.responseFields;

        // Fill responseXXX fields
        for (type in responseFields) {
            if (type in responses) {
                jqXHR[ responseFields[type] ] = responses[ type ];
            }
        }

        // Remove auto dataType and get content-type in the process
        while (dataTypes[ 0 ] === "*") {
            dataTypes.shift();
            if (ct === undefined) {
                ct = s.mimeType || jqXHR.getResponseHeader("content-type");
            }
        }

        // Check if we're dealing with a known content-type
        if (ct) {
            for (type in contents) {
                if (contents[ type ] && contents[ type ].test(ct)) {
                    dataTypes.unshift(type);
                    break;
                }
            }
        }

        // Check to see if we have a response for the expected dataType
        if (dataTypes[ 0 ] in responses) {
            finalDataType = dataTypes[ 0 ];
        } else {
            // Try convertible dataTypes
            for (type in responses) {
                if (!dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ]) {
                    finalDataType = type;
                    break;
                }
                if (!firstDataType) {
                    firstDataType = type;
                }
            }
            // Or just use first one
            finalDataType = finalDataType || firstDataType;
        }

        // If we found a dataType
        // We add the dataType to the list if needed
        // and return the corresponding response
        if (finalDataType) {
            if (finalDataType !== dataTypes[ 0 ]) {
                dataTypes.unshift(finalDataType);
            }
            return responses[ finalDataType ];
        }
    }

// Chain conversions given the request and the original response
    function ajaxConvert(s, response) {

        var conv, conv2, current, tmp,
        // Work with a copy of dataTypes in case we need to modify it for conversion
            dataTypes = s.dataTypes.slice(),
            prev = dataTypes[ 0 ],
            converters = {},
            i = 0;

        // Apply the dataFilter if provided
        if (s.dataFilter) {
            response = s.dataFilter(response, s.dataType);
        }

        // Create converters map with lowercased keys
        if (dataTypes[ 1 ]) {
            for (conv in s.converters) {
                converters[ conv.toLowerCase() ] = s.converters[ conv ];
            }
        }

        // Convert to each sequential dataType, tolerating list modification
        for (; (current = dataTypes[++i]);) {

            // There's only work to do if current dataType is non-auto
            if (current !== "*") {

                // Convert response if prev dataType is non-auto and differs from current
                if (prev !== "*" && prev !== current) {

                    // Seek a direct converter
                    conv = converters[ prev + " " + current ] || converters[ "* " + current ];

                    // If none found, seek a pair
                    if (!conv) {
                        for (conv2 in converters) {

                            // If conv2 outputs current
                            tmp = conv2.split(" ");
                            if (tmp[ 1 ] === current) {

                                // If prev can be converted to accepted input
                                conv = converters[ prev + " " + tmp[ 0 ] ] ||
                                    converters[ "* " + tmp[ 0 ] ];
                                if (conv) {
                                    // Condense equivalence converters
                                    if (conv === true) {
                                        conv = converters[ conv2 ];

                                        // Otherwise, insert the intermediate dataType
                                    } else if (converters[ conv2 ] !== true) {
                                        current = tmp[ 0 ];
                                        dataTypes.splice(i--, 0, current);
                                    }

                                    break;
                                }
                            }
                        }
                    }

                    // Apply converter (if not an equivalence)
                    if (conv !== true) {

                        // Unless errors are allowed to bubble, catch and return them
                        if (conv && s["throws"]) {
                            response = conv(response);
                        } else {
                            try {
                                response = conv(response);
                            } catch (e) {
                                return { state:"parsererror", error:conv ? e : "No conversion from " + prev + " to " + current };
                            }
                        }
                    }
                }

                // Update prev for next iteration
                prev = current;
            }
        }

        return { state:"success", data:response };
    }

    var oldCallbacks = [],
        rquestion = /\?/,
        rjsonp = /(=)\?(?=&|$)|\?\?/,
        nonce = jQuery.now();

// Default jsonp settings
    jQuery.ajaxSetup({
        jsonp:"callback",
        jsonpCallback:function () {
            var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
            this[ callback ] = true;
            return callback;
        }
    });

// Detect, normalize options and install callbacks for jsonp requests
    jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {

        var callbackName, overwritten, responseContainer,
            data = s.data,
            url = s.url,
            hasCallback = s.jsonp !== false,
            replaceInUrl = hasCallback && rjsonp.test(url),
            replaceInData = hasCallback && !replaceInUrl && typeof data === "string" &&
                !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") &&
                rjsonp.test(data);

        // Handle iff the expected data type is "jsonp" or we have a parameter to set
        if (s.dataTypes[ 0 ] === "jsonp" || replaceInUrl || replaceInData) {

            // Get callback name, remembering preexisting value associated with it
            callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ?
                s.jsonpCallback() :
                s.jsonpCallback;
            overwritten = window[ callbackName ];

            // Insert callback into url or form data
            if (replaceInUrl) {
                s.url = url.replace(rjsonp, "$1" + callbackName);
            } else if (replaceInData) {
                s.data = data.replace(rjsonp, "$1" + callbackName);
            } else if (hasCallback) {
                s.url += ( rquestion.test(url) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
            }

            // Use data converter to retrieve json after script execution
            s.converters["script json"] = function () {
                if (!responseContainer) {
                    jQuery.error(callbackName + " was not called");
                }
                return responseContainer[ 0 ];
            };

            // force json dataType
            s.dataTypes[ 0 ] = "json";

            // Install callback
            window[ callbackName ] = function () {
                responseContainer = arguments;
            };

            // Clean-up function (fires after converters)
            jqXHR.always(function () {
                // Restore preexisting value
                window[ callbackName ] = overwritten;

                // Save back as free
                if (s[ callbackName ]) {
                    // make sure that re-using the options doesn't screw things around
                    s.jsonpCallback = originalSettings.jsonpCallback;

                    // save the callback name for future use
                    oldCallbacks.push(callbackName);
                }

                // Call if it was a function and we have a response
                if (responseContainer && jQuery.isFunction(overwritten)) {
                    overwritten(responseContainer[ 0 ]);
                }

                responseContainer = overwritten = undefined;
            });

            // Delegate to script
            return "script";
        }
    });
// Install script dataType
    jQuery.ajaxSetup({
        accepts:{
            script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents:{
            script:/javascript|ecmascript/
        },
        converters:{
            "text script":function (text) {
                jQuery.globalEval(text);
                return text;
            }
        }
    });

// Handle cache's special case and global
    jQuery.ajaxPrefilter("script", function (s) {
        if (s.cache === undefined) {
            s.cache = false;
        }
        if (s.crossDomain) {
            s.type = "GET";
            s.global = false;
        }
    });

// Bind script tag hack transport
    jQuery.ajaxTransport("script", function (s) {

        // This transport only deals with cross domain requests
        if (s.crossDomain) {

            var script,
                head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;

            return {

                send:function (_, callback) {

                    script = document.createElement("script");

                    script.async = "async";

                    if (s.scriptCharset) {
                        script.charset = s.scriptCharset;
                    }

                    script.src = s.url;

                    // Attach handlers for all browsers
                    script.onload = script.onreadystatechange = function (_, isAbort) {

                        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {

                            // Handle memory leak in IE
                            script.onload = script.onreadystatechange = null;

                            // Remove the script
                            if (head && script.parentNode) {
                                head.removeChild(script);
                            }

                            // Dereference the script
                            script = undefined;

                            // Callback if not abort
                            if (!isAbort) {
                                callback(200, "success");
                            }
                        }
                    };
                    // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
                    // This arises when a base node is used (#2709 and #4378).
                    head.insertBefore(script, head.firstChild);
                },

                abort:function () {
                    if (script) {
                        script.onload(0, 1);
                    }
                }
            };
        }
    });
    var xhrCallbacks,
    // #5280: Internet Explorer will keep connections alive if we don't abort on unload
        xhrOnUnloadAbort = window.ActiveXObject ? function () {
            // Abort all pending requests
            for (var key in xhrCallbacks) {
                xhrCallbacks[ key ](0, 1);
            }
        } : false,
        xhrId = 0;

// Functions to create xhrs
    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest();
        } catch (e) {
        }
    }

    function createActiveXHR() {
        try {
            return new window.ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
        }
    }

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
    jQuery.ajaxSettings.xhr = window.ActiveXObject ?
        /* Microsoft failed to properly
         * implement the XMLHttpRequest in IE7 (can't request local files),
         * so we use the ActiveXObject when it is available
         * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
         * we need a fallback.
         */
        function () {
            return !this.isLocal && createStandardXHR() || createActiveXHR();
        } :
        // For all other browsers, use the standard XMLHttpRequest object
        createStandardXHR;

// Determine support properties
    (function (xhr) {
        jQuery.extend(jQuery.support, {
            ajax:!!xhr,
            cors:!!xhr && ( "withCredentials" in xhr )
        });
    })(jQuery.ajaxSettings.xhr());

// Create transport if the browser can provide an xhr
    if (jQuery.support.ajax) {

        jQuery.ajaxTransport(function (s) {
            // Cross domain only allowed if supported through XMLHttpRequest
            if (!s.crossDomain || jQuery.support.cors) {

                var callback;

                return {
                    send:function (headers, complete) {

                        // Get a new xhr
                        var handle, i,
                            xhr = s.xhr();

                        // Open the socket
                        // Passing null username, generates a login popup on Opera (#2865)
                        if (s.username) {
                            xhr.open(s.type, s.url, s.async, s.username, s.password);
                        } else {
                            xhr.open(s.type, s.url, s.async);
                        }

                        // Apply custom fields if provided
                        if (s.xhrFields) {
                            for (i in s.xhrFields) {
                                xhr[ i ] = s.xhrFields[ i ];
                            }
                        }

                        // Override mime type if needed
                        if (s.mimeType && xhr.overrideMimeType) {
                            xhr.overrideMimeType(s.mimeType);
                        }

                        // X-Requested-With header
                        // For cross-domain requests, seeing as conditions for a preflight are
                        // akin to a jigsaw puzzle, we simply never set it to be sure.
                        // (it can always be set on a per-request basis or even using ajaxSetup)
                        // For same-domain requests, won't change header if already provided.
                        if (!s.crossDomain && !headers["X-Requested-With"]) {
                            headers[ "X-Requested-With" ] = "XMLHttpRequest";
                        }

                        // Need an extra try/catch for cross domain requests in Firefox 3
                        try {
                            for (i in headers) {
                                xhr.setRequestHeader(i, headers[ i ]);
                            }
                        } catch (_) {
                        }

                        // Do send the request
                        // This may raise an exception which is actually
                        // handled in jQuery.ajax (so no try/catch here)
                        xhr.send(( s.hasContent && s.data ) || null);

                        // Listener
                        callback = function (_, isAbort) {

                            var status,
                                statusText,
                                responseHeaders,
                                responses,
                                xml;

                            // Firefox throws exceptions when accessing properties
                            // of an xhr when a network error occurred
                            // http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
                            try {

                                // Was never called and is aborted or complete
                                if (callback && ( isAbort || xhr.readyState === 4 )) {

                                    // Only called once
                                    callback = undefined;

                                    // Do not keep as active anymore
                                    if (handle) {
                                        xhr.onreadystatechange = jQuery.noop;
                                        if (xhrOnUnloadAbort) {
                                            delete xhrCallbacks[ handle ];
                                        }
                                    }

                                    // If it's an abort
                                    if (isAbort) {
                                        // Abort it manually if needed
                                        if (xhr.readyState !== 4) {
                                            xhr.abort();
                                        }
                                    } else {
                                        status = xhr.status;
                                        responseHeaders = xhr.getAllResponseHeaders();
                                        responses = {};
                                        xml = xhr.responseXML;

                                        // Construct response list
                                        if (xml && xml.documentElement /* #4958 */) {
                                            responses.xml = xml;
                                        }

                                        // When requesting binary data, IE6-9 will throw an exception
                                        // on any attempt to access responseText (#11426)
                                        try {
                                            responses.text = xhr.responseText;
                                        } catch (_) {
                                        }

                                        // Firefox throws an exception when accessing
                                        // statusText for faulty cross-domain requests
                                        try {
                                            statusText = xhr.statusText;
                                        } catch (e) {
                                            // We normalize with Webkit giving an empty statusText
                                            statusText = "";
                                        }

                                        // Filter status for non standard behaviors

                                        // If the request is local and we have data: assume a success
                                        // (success with no data won't get notified, that's the best we
                                        // can do given current implementations)
                                        if (!status && s.isLocal && !s.crossDomain) {
                                            status = responses.text ? 200 : 404;
                                            // IE - #1450: sometimes returns 1223 when it should be 204
                                        } else if (status === 1223) {
                                            status = 204;
                                        }
                                    }
                                }
                            } catch (firefoxAccessException) {
                                if (!isAbort) {
                                    complete(-1, firefoxAccessException);
                                }
                            }

                            // Call complete if needed
                            if (responses) {
                                complete(status, statusText, responses, responseHeaders);
                            }
                        };

                        if (!s.async) {
                            // if we're in sync mode we fire the callback
                            callback();
                        } else if (xhr.readyState === 4) {
                            // (IE6 & IE7) if it's in cache and has been
                            // retrieved directly we need to fire the callback
                            setTimeout(callback, 0);
                        } else {
                            handle = ++xhrId;
                            if (xhrOnUnloadAbort) {
                                // Create the active xhrs callbacks list if needed
                                // and attach the unload handler
                                if (!xhrCallbacks) {
                                    xhrCallbacks = {};
                                    jQuery(window).unload(xhrOnUnloadAbort);
                                }
                                // Add to list of active xhrs callbacks
                                xhrCallbacks[ handle ] = callback;
                            }
                            xhr.onreadystatechange = callback;
                        }
                    },

                    abort:function () {
                        if (callback) {
                            callback(0, 1);
                        }
                    }
                };
            }
        });
    }
    var fxNow, timerId,
        rfxtypes = /^(?:toggle|show|hide)$/,
        rfxnum = new RegExp("^(?:([-+])=|)(" + core_pnum + ")([a-z%]*)$", "i"),
        rrun = /queueHooks$/,
        animationPrefilters = [ defaultPrefilter ],
        tweeners = {
            "*":[function (prop, value) {
                var end, unit,
                    tween = this.createTween(prop, value),
                    parts = rfxnum.exec(value),
                    target = tween.cur(),
                    start = +target || 0,
                    scale = 1,
                    maxIterations = 20;

                if (parts) {
                    end = +parts[2];
                    unit = parts[3] || ( jQuery.cssNumber[ prop ] ? "" : "px" );

                    // We need to compute starting value
                    if (unit !== "px" && start) {
                        // Iteratively approximate from a nonzero starting point
                        // Prefer the current property, because this process will be trivial if it uses the same units
                        // Fallback to end or a simple constant
                        start = jQuery.css(tween.elem, prop, true) || end || 1;

                        do {
                            // If previous iteration zeroed out, double until we get *something*
                            // Use a string for doubling factor so we don't accidentally see scale as unchanged below
                            scale = scale || ".5";

                            // Adjust and apply
                            start = start / scale;
                            jQuery.style(tween.elem, prop, start + unit);

                            // Update scale, tolerating zero or NaN from tween.cur()
                            // And breaking the loop if scale is unchanged or perfect, or if we've just had enough
                        } while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations);
                    }

                    tween.unit = unit;
                    tween.start = start;
                    // If a +=/-= token was provided, we're doing a relative animation
                    tween.end = parts[1] ? start + ( parts[1] + 1 ) * end : end;
                }
                return tween;
            }]
        };

// Animations created synchronously will run synchronously
    function createFxNow() {
        setTimeout(function () {
            fxNow = undefined;
        }, 0);
        return ( fxNow = jQuery.now() );
    }

    function createTweens(animation, props) {
        jQuery.each(props, function (prop, value) {
            var collection = ( tweeners[ prop ] || [] ).concat(tweeners[ "*" ]),
                index = 0,
                length = collection.length;
            for (; index < length; index++) {
                if (collection[ index ].call(animation, prop, value)) {

                    // we're done with this property
                    return;
                }
            }
        });
    }

    function Animation(elem, properties, options) {
        var result,
            index = 0,
            tweenerIndex = 0,
            length = animationPrefilters.length,
            deferred = jQuery.Deferred().always(function () {
                // don't match elem in the :animated selector
                delete tick.elem;
            }),
            tick = function () {
                var currentTime = fxNow || createFxNow(),
                    remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
                    percent = 1 - ( remaining / animation.duration || 0 ),
                    index = 0,
                    length = animation.tweens.length;

                for (; index < length; index++) {
                    animation.tweens[ index ].run(percent);
                }

                deferred.notifyWith(elem, [ animation, percent, remaining ]);

                if (percent < 1 && length) {
                    return remaining;
                } else {
                    deferred.resolveWith(elem, [ animation ]);
                    return false;
                }
            },
            animation = deferred.promise({
                elem:elem,
                props:jQuery.extend({}, properties),
                opts:jQuery.extend(true, { specialEasing:{} }, options),
                originalProperties:properties,
                originalOptions:options,
                startTime:fxNow || createFxNow(),
                duration:options.duration,
                tweens:[],
                createTween:function (prop, end, easing) {
                    var tween = jQuery.Tween(elem, animation.opts, prop, end,
                        animation.opts.specialEasing[ prop ] || animation.opts.easing);
                    animation.tweens.push(tween);
                    return tween;
                },
                stop:function (gotoEnd) {
                    var index = 0,
                    // if we are going to the end, we want to run all the tweens
                    // otherwise we skip this part
                        length = gotoEnd ? animation.tweens.length : 0;

                    for (; index < length; index++) {
                        animation.tweens[ index ].run(1);
                    }

                    // resolve when we played the last frame
                    // otherwise, reject
                    if (gotoEnd) {
                        deferred.resolveWith(elem, [ animation, gotoEnd ]);
                    } else {
                        deferred.rejectWith(elem, [ animation, gotoEnd ]);
                    }
                    return this;
                }
            }),
            props = animation.props;

        propFilter(props, animation.opts.specialEasing);

        for (; index < length; index++) {
            result = animationPrefilters[ index ].call(animation, elem, props, animation.opts);
            if (result) {
                return result;
            }
        }

        createTweens(animation, props);

        if (jQuery.isFunction(animation.opts.start)) {
            animation.opts.start.call(elem, animation);
        }

        jQuery.fx.timer(
            jQuery.extend(tick, {
                anim:animation,
                queue:animation.opts.queue,
                elem:elem
            })
        );

        // attach callbacks from options
        return animation.progress(animation.opts.progress)
            .done(animation.opts.done, animation.opts.complete)
            .fail(animation.opts.fail)
            .always(animation.opts.always);
    }

    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;

        // camelCase, specialEasing and expand cssHook pass
        for (index in props) {
            name = jQuery.camelCase(index);
            easing = specialEasing[ name ];
            value = props[ index ];
            if (jQuery.isArray(value)) {
                easing = value[ 1 ];
                value = props[ index ] = value[ 0 ];
            }

            if (index !== name) {
                props[ name ] = value;
                delete props[ index ];
            }

            hooks = jQuery.cssHooks[ name ];
            if (hooks && "expand" in hooks) {
                value = hooks.expand(value);
                delete props[ name ];

                // not quite $.extend, this wont overwrite keys already present.
                // also - reusing 'index' from above because we have the correct "name"
                for (index in value) {
                    if (!( index in props )) {
                        props[ index ] = value[ index ];
                        specialEasing[ index ] = easing;
                    }
                }
            } else {
                specialEasing[ name ] = easing;
            }
        }
    }

    jQuery.Animation = jQuery.extend(Animation, {

        tweener:function (props, callback) {
            if (jQuery.isFunction(props)) {
                callback = props;
                props = [ "*" ];
            } else {
                props = props.split(" ");
            }

            var prop,
                index = 0,
                length = props.length;

            for (; index < length; index++) {
                prop = props[ index ];
                tweeners[ prop ] = tweeners[ prop ] || [];
                tweeners[ prop ].unshift(callback);
            }
        },

        prefilter:function (callback, prepend) {
            if (prepend) {
                animationPrefilters.unshift(callback);
            } else {
                animationPrefilters.push(callback);
            }
        }
    });

    function defaultPrefilter(elem, props, opts) {
        var index, prop, value, length, dataShow, tween, hooks, oldfire,
            anim = this,
            style = elem.style,
            orig = {},
            handled = [],
            hidden = elem.nodeType && isHidden(elem);

        // handle queue: false promises
        if (!opts.queue) {
            hooks = jQuery._queueHooks(elem, "fx");
            if (hooks.unqueued == null) {
                hooks.unqueued = 0;
                oldfire = hooks.empty.fire;
                hooks.empty.fire = function () {
                    if (!hooks.unqueued) {
                        oldfire();
                    }
                };
            }
            hooks.unqueued++;

            anim.always(function () {
                // doing this makes sure that the complete handler will be called
                // before this completes
                anim.always(function () {
                    hooks.unqueued--;
                    if (!jQuery.queue(elem, "fx").length) {
                        hooks.empty.fire();
                    }
                });
            });
        }

        // height/width overflow pass
        if (elem.nodeType === 1 && ( "height" in props || "width" in props )) {
            // Make sure that nothing sneaks out
            // Record all 3 overflow attributes because IE does not
            // change the overflow attribute when overflowX and
            // overflowY are set to the same value
            opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

            // Set display property to inline-block for height/width
            // animations on inline elements that are having width/height animated
            if (jQuery.css(elem, "display") === "inline" &&
                jQuery.css(elem, "float") === "none") {

                // inline-level elements accept inline-block;
                // block-level elements need to be inline with layout
                if (!jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay(elem.nodeName) === "inline") {
                    style.display = "inline-block";

                } else {
                    style.zoom = 1;
                }
            }
        }

        if (opts.overflow) {
            style.overflow = "hidden";
            if (!jQuery.support.shrinkWrapBlocks) {
                anim.done(function () {
                    style.overflow = opts.overflow[ 0 ];
                    style.overflowX = opts.overflow[ 1 ];
                    style.overflowY = opts.overflow[ 2 ];
                });
            }
        }


        // show/hide pass
        for (index in props) {
            value = props[ index ];
            if (rfxtypes.exec(value)) {
                delete props[ index ];
                if (value === ( hidden ? "hide" : "show" )) {
                    continue;
                }
                handled.push(index);
            }
        }

        length = handled.length;
        if (length) {
            dataShow = jQuery._data(elem, "fxshow") || jQuery._data(elem, "fxshow", {});
            if (hidden) {
                jQuery(elem).show();
            } else {
                anim.done(function () {
                    jQuery(elem).hide();
                });
            }
            anim.done(function () {
                var prop;
                jQuery.removeData(elem, "fxshow", true);
                for (prop in orig) {
                    jQuery.style(elem, prop, orig[ prop ]);
                }
            });
            for (index = 0; index < length; index++) {
                prop = handled[ index ];
                tween = anim.createTween(prop, hidden ? dataShow[ prop ] : 0);
                orig[ prop ] = dataShow[ prop ] || jQuery.style(elem, prop);

                if (!( prop in dataShow )) {
                    dataShow[ prop ] = tween.start;
                    if (hidden) {
                        tween.end = tween.start;
                        tween.start = prop === "width" || prop === "height" ? 1 : 0;
                    }
                }
            }
        }
    }

    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
    }

    jQuery.Tween = Tween;

    Tween.prototype = {
        constructor:Tween,
        init:function (elem, options, prop, end, easing, unit) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || "swing";
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
        },
        cur:function () {
            var hooks = Tween.propHooks[ this.prop ];

            return hooks && hooks.get ?
                hooks.get(this) :
                Tween.propHooks._default.get(this);
        },
        run:function (percent) {
            var eased,
                hooks = Tween.propHooks[ this.prop ];

            if (this.options.duration) {
                this.pos = eased = jQuery.easing[ this.easing ](
                    percent, this.options.duration * percent, 0, 1, this.options.duration
                );
            } else {
                this.pos = eased = percent;
            }
            this.now = ( this.end - this.start ) * eased + this.start;

            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this);
            }

            if (hooks && hooks.set) {
                hooks.set(this);
            } else {
                Tween.propHooks._default.set(this);
            }
            return this;
        }
    };

    Tween.prototype.init.prototype = Tween.prototype;

    Tween.propHooks = {
        _default:{
            get:function (tween) {
                var result;

                if (tween.elem[ tween.prop ] != null &&
                    (!tween.elem.style || tween.elem.style[ tween.prop ] == null)) {
                    return tween.elem[ tween.prop ];
                }

                // passing any value as a 4th parameter to .css will automatically
                // attempt a parseFloat and fallback to a string if the parse fails
                // so, simple values such as "10px" are parsed to Float.
                // complex values such as "rotate(1rad)" are returned as is.
                result = jQuery.css(tween.elem, tween.prop, false, "");
                // Empty strings, null, undefined and "auto" are converted to 0.
                return !result || result === "auto" ? 0 : result;
            },
            set:function (tween) {
                // use step hook for back compat - use cssHook if its there - use .style if its
                // available and use plain properties where available
                if (jQuery.fx.step[ tween.prop ]) {
                    jQuery.fx.step[ tween.prop ](tween);
                } else if (tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] )) {
                    jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
                } else {
                    tween.elem[ tween.prop ] = tween.now;
                }
            }
        }
    };

// Remove in 2.0 - this supports IE8's panic based approach
// to setting things on disconnected nodes

    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set:function (tween) {
            if (tween.elem.nodeType && tween.elem.parentNode) {
                tween.elem[ tween.prop ] = tween.now;
            }
        }
    };

    jQuery.each([ "toggle", "show", "hide" ], function (i, name) {
        var cssFn = jQuery.fn[ name ];
        jQuery.fn[ name ] = function (speed, easing, callback) {
            return speed == null || typeof speed === "boolean" ||
                // special check for .toggle( handler, handler, ... )
                ( !i && jQuery.isFunction(speed) && jQuery.isFunction(easing) ) ?
                cssFn.apply(this, arguments) :
                this.animate(genFx(name, true), speed, easing, callback);
        };
    });

    jQuery.fn.extend({
        fadeTo:function (speed, to, easing, callback) {

            // show any hidden elements after setting opacity to 0
            return this.filter(isHidden).css("opacity", 0).show()

                // animate to the value specified
                .end().animate({ opacity:to }, speed, easing, callback);
        },
        animate:function (prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop),
                optall = jQuery.speed(speed, easing, callback),
                doAnimation = function () {
                    // Operate on a copy of prop so per-property easing won't be lost
                    var anim = Animation(this, jQuery.extend({}, prop), optall);

                    // Empty animations resolve immediately
                    if (empty) {
                        anim.stop(true);
                    }
                };

            return empty || optall.queue === false ?
                this.each(doAnimation) :
                this.queue(optall.queue, doAnimation);
        },
        stop:function (type, clearQueue, gotoEnd) {
            var stopQueue = function (hooks) {
                var stop = hooks.stop;
                delete hooks.stop;
                stop(gotoEnd);
            };

            if (typeof type !== "string") {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined;
            }
            if (clearQueue && type !== false) {
                this.queue(type || "fx", []);
            }

            return this.each(function () {
                var dequeue = true,
                    index = type != null && type + "queueHooks",
                    timers = jQuery.timers,
                    data = jQuery._data(this);

                if (index) {
                    if (data[ index ] && data[ index ].stop) {
                        stopQueue(data[ index ]);
                    }
                } else {
                    for (index in data) {
                        if (data[ index ] && data[ index ].stop && rrun.test(index)) {
                            stopQueue(data[ index ]);
                        }
                    }
                }

                for (index = timers.length; index--;) {
                    if (timers[ index ].elem === this && (type == null || timers[ index ].queue === type)) {
                        timers[ index ].anim.stop(gotoEnd);
                        dequeue = false;
                        timers.splice(index, 1);
                    }
                }

                // start the next in the queue if the last step wasn't forced
                // timers currently will call their complete callbacks, which will dequeue
                // but only if they were gotoEnd
                if (dequeue || !gotoEnd) {
                    jQuery.dequeue(this, type);
                }
            });
        }
    });

// Generate parameters to create a standard animation
    function genFx(type, includeWidth) {
        var which,
            attrs = { height:type },
            i = 0;

        // if we include width, step value is 1 to do all cssExpand values,
        // if we don't include width, step value is 2 to skip over Left and Right
        includeWidth = includeWidth ? 1 : 0;
        for (; i < 4; i += 2 - includeWidth) {
            which = cssExpand[ i ];
            attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
        }

        if (includeWidth) {
            attrs.opacity = attrs.width = type;
        }

        return attrs;
    }

// Generate shortcuts for custom animations
    jQuery.each({
        slideDown:genFx("show"),
        slideUp:genFx("hide"),
        slideToggle:genFx("toggle"),
        fadeIn:{ opacity:"show" },
        fadeOut:{ opacity:"hide" },
        fadeToggle:{ opacity:"toggle" }
    }, function (name, props) {
        jQuery.fn[ name ] = function (speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    });

    jQuery.speed = function (speed, easing, fn) {
        var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
            complete:fn || !fn && easing ||
                jQuery.isFunction(speed) && speed,
            duration:speed,
            easing:fn && easing || easing && !jQuery.isFunction(easing) && easing
        };

        opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
            opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

        // normalize opt.queue - true/undefined/null -> "fx"
        if (opt.queue == null || opt.queue === true) {
            opt.queue = "fx";
        }

        // Queueing
        opt.old = opt.complete;

        opt.complete = function () {
            if (jQuery.isFunction(opt.old)) {
                opt.old.call(this);
            }

            if (opt.queue) {
                jQuery.dequeue(this, opt.queue);
            }
        };

        return opt;
    };

    jQuery.easing = {
        linear:function (p) {
            return p;
        },
        swing:function (p) {
            return 0.5 - Math.cos(p * Math.PI) / 2;
        }
    };

    jQuery.timers = [];
    jQuery.fx = Tween.prototype.init;
    jQuery.fx.tick = function () {
        var timer,
            timers = jQuery.timers,
            i = 0;

        for (; i < timers.length; i++) {
            timer = timers[ i ];
            // Checks the timer has not already been removed
            if (!timer() && timers[ i ] === timer) {
                timers.splice(i--, 1);
            }
        }

        if (!timers.length) {
            jQuery.fx.stop();
        }
    };

    jQuery.fx.timer = function (timer) {
        if (timer() && jQuery.timers.push(timer) && !timerId) {
            timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval);
        }
    };

    jQuery.fx.interval = 13;

    jQuery.fx.stop = function () {
        clearInterval(timerId);
        timerId = null;
    };

    jQuery.fx.speeds = {
        slow:600,
        fast:200,
        // Default speed
        _default:400
    };

// Back Compat <1.8 extension point
    jQuery.fx.step = {};

    if (jQuery.expr && jQuery.expr.filters) {
        jQuery.expr.filters.animated = function (elem) {
            return jQuery.grep(jQuery.timers,function (fn) {
                return elem === fn.elem;
            }).length;
        };
    }
    var rroot = /^(?:body|html)$/i;

    jQuery.fn.offset = function (options) {
        if (arguments.length) {
            return options === undefined ?
                this :
                this.each(function (i) {
                    jQuery.offset.setOffset(this, options, i);
                });
        }

        var docElem, body, win, clientTop, clientLeft, scrollTop, scrollLeft,
            box = { top:0, left:0 },
            elem = this[ 0 ],
            doc = elem && elem.ownerDocument;

        if (!doc) {
            return;
        }

        if ((body = doc.body) === elem) {
            return jQuery.offset.bodyOffset(elem);
        }

        docElem = doc.documentElement;

        // Make sure it's not a disconnected DOM node
        if (!jQuery.contains(docElem, elem)) {
            return box;
        }

        // If we don't have gBCR, just use 0,0 rather than error
        // BlackBerry 5, iOS 3 (original iPhone)
        if (typeof elem.getBoundingClientRect !== "undefined") {
            box = elem.getBoundingClientRect();
        }
        win = getWindow(doc);
        clientTop = docElem.clientTop || body.clientTop || 0;
        clientLeft = docElem.clientLeft || body.clientLeft || 0;
        scrollTop = win.pageYOffset || docElem.scrollTop;
        scrollLeft = win.pageXOffset || docElem.scrollLeft;
        return {
            top:box.top + scrollTop - clientTop,
            left:box.left + scrollLeft - clientLeft
        };
    };

    jQuery.offset = {

        bodyOffset:function (body) {
            var top = body.offsetTop,
                left = body.offsetLeft;

            if (jQuery.support.doesNotIncludeMarginInBodyOffset) {
                top += parseFloat(jQuery.css(body, "marginTop")) || 0;
                left += parseFloat(jQuery.css(body, "marginLeft")) || 0;
            }

            return { top:top, left:left };
        },

        setOffset:function (elem, options, i) {
            var position = jQuery.css(elem, "position");

            // set position first, in-case top/left are set even on static elem
            if (position === "static") {
                elem.style.position = "relative";
            }

            var curElem = jQuery(elem),
                curOffset = curElem.offset(),
                curCSSTop = jQuery.css(elem, "top"),
                curCSSLeft = jQuery.css(elem, "left"),
                calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
                props = {}, curPosition = {}, curTop, curLeft;

            // need to be able to calculate position if either top or left is auto and position is either absolute or fixed
            if (calculatePosition) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left;
            } else {
                curTop = parseFloat(curCSSTop) || 0;
                curLeft = parseFloat(curCSSLeft) || 0;
            }

            if (jQuery.isFunction(options)) {
                options = options.call(elem, i, curOffset);
            }

            if (options.top != null) {
                props.top = ( options.top - curOffset.top ) + curTop;
            }
            if (options.left != null) {
                props.left = ( options.left - curOffset.left ) + curLeft;
            }

            if ("using" in options) {
                options.using.call(elem, props);
            } else {
                curElem.css(props);
            }
        }
    };


    jQuery.fn.extend({

        position:function () {
            if (!this[0]) {
                return;
            }

            var elem = this[0],

            // Get *real* offsetParent
                offsetParent = this.offsetParent(),

            // Get correct offsets
                offset = this.offset(),
                parentOffset = rroot.test(offsetParent[0].nodeName) ? { top:0, left:0 } : offsetParent.offset();

            // Subtract element margins
            // note: when an element has margin: auto the offsetLeft and marginLeft
            // are the same in Safari causing offset.left to incorrectly be 0
            offset.top -= parseFloat(jQuery.css(elem, "marginTop")) || 0;
            offset.left -= parseFloat(jQuery.css(elem, "marginLeft")) || 0;

            // Add offsetParent borders
            parentOffset.top += parseFloat(jQuery.css(offsetParent[0], "borderTopWidth")) || 0;
            parentOffset.left += parseFloat(jQuery.css(offsetParent[0], "borderLeftWidth")) || 0;

            // Subtract the two offsets
            return {
                top:offset.top - parentOffset.top,
                left:offset.left - parentOffset.left
            };
        },

        offsetParent:function () {
            return this.map(function () {
                var offsetParent = this.offsetParent || document.body;
                while (offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static")) {
                    offsetParent = offsetParent.offsetParent;
                }
                return offsetParent || document.body;
            });
        }
    });


// Create scrollLeft and scrollTop methods
    jQuery.each({scrollLeft:"pageXOffset", scrollTop:"pageYOffset"}, function (method, prop) {
        var top = /Y/.test(prop);

        jQuery.fn[ method ] = function (val) {
            return jQuery.access(this, function (elem, method, val) {
                var win = getWindow(elem);

                if (val === undefined) {
                    return win ? (prop in win) ? win[ prop ] :
                        win.document.documentElement[ method ] :
                        elem[ method ];
                }

                if (win) {
                    win.scrollTo(
                        !top ? val : jQuery(win).scrollLeft(),
                        top ? val : jQuery(win).scrollTop()
                    );

                } else {
                    elem[ method ] = val;
                }
            }, method, val, arguments.length, null);
        };
    });

    function getWindow(elem) {
        return jQuery.isWindow(elem) ?
            elem :
            elem.nodeType === 9 ?
                elem.defaultView || elem.parentWindow :
                false;
    }

// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
    jQuery.each({ Height:"height", Width:"width" }, function (name, type) {
        jQuery.each({ padding:"inner" + name, content:type, "":"outer" + name }, function (defaultExtra, funcName) {
            // margin is only for outerHeight, outerWidth
            jQuery.fn[ funcName ] = function (margin, value) {
                var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
                    extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

                return jQuery.access(this, function (elem, type, value) {
                    var doc;

                    if (jQuery.isWindow(elem)) {
                        // As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
                        // isn't a whole lot we can do. See pull request at this URL for discussion:
                        // https://github.com/jquery/jquery/pull/764
                        return elem.document.documentElement[ "client" + name ];
                    }

                    // Get document width or height
                    if (elem.nodeType === 9) {
                        doc = elem.documentElement;

                        // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
                        // unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
                        return Math.max(
                            elem.body[ "scroll" + name ], doc[ "scroll" + name ],
                            elem.body[ "offset" + name ], doc[ "offset" + name ],
                            doc[ "client" + name ]
                        );
                    }

                    return value === undefined ?
                        // Get width or height on the element, requesting but not forcing parseFloat
                        jQuery.css(elem, type, value, extra) :

                        // Set width or height on the element
                        jQuery.style(elem, type, value, extra);
                }, type, chainable ? margin : undefined, chainable, null);
            };
        });
    });
// Expose jQuery to the global object
    window.jQuery = window.$ = jQuery;

// Expose jQuery as an AMD module, but only for AMD loaders that
// understand the issues with loading multiple versions of jQuery
// in a page that all might call define(). The loader will indicate
// they have special allowances for multiple jQuery versions by
// specifying define.amd.jQuery = true. Register as a named module,
// since jQuery can be concatenated with other files that may use define,
// but not use a proper concatenation script that understands anonymous
// AMD modules. A named AMD is safest and most robust way to register.
// Lowercase jquery is used because AMD module names are derived from
// file names, and jQuery is normally delivered in a lowercase file name.
// Do this after creating the global so that if an AMD module wants to call
// noConflict to hide this version of jQuery, it will work.
    if (typeof define === "function" && define.amd && define.amd.jQuery) {
        define("jquery", [], function () {
            return jQuery;
        });
    }

})(window);
(function ($, undefined) {

    /**
     * Unobtrusive scripting adapter for jQuery
     *
     * Requires jQuery 1.6.0 or later.
     * https://github.com/rails/jquery-ujs

     * Uploading file using rails.js
     * =============================
     *
     * By default, browsers do not allow files to be uploaded via AJAX. As a result, if there are any non-blank file fields
     * in the remote form, this adapter aborts the AJAX submission and allows the form to submit through standard means.
     *
     * The `ajax:aborted:file` event allows you to bind your own handler to process the form submission however you wish.
     *
     * Ex:
     *     $('form').live('ajax:aborted:file', function(event, elements){
     *       // Implement own remote file-transfer handler here for non-blank file inputs passed in `elements`.
     *       // Returning false in this handler tells rails.js to disallow standard form submission
     *       return false;
     *     });
     *
     * The `ajax:aborted:file` event is fired when a file-type input is detected with a non-blank value.
     *
     * Third-party tools can use this hook to detect when an AJAX file upload is attempted, and then use
     * techniques like the iframe method to upload the file instead.
     *
     * Required fields in rails.js
     * ===========================
     *
     * If any blank required inputs (required="required") are detected in the remote form, the whole form submission
     * is canceled. Note that this is unlike file inputs, which still allow standard (non-AJAX) form submission.
     *
     * The `ajax:aborted:required` event allows you to bind your own handler to inform the user of blank required inputs.
     *
     * !! Note that Opera does not fire the form's submit event if there are blank required inputs, so this event may never
     *    get fired in Opera. This event is what causes other browsers to exhibit the same submit-aborting behavior.
     *
     * Ex:
     *     $('form').live('ajax:aborted:required', function(event, elements){
     *       // Returning false in this handler tells rails.js to submit the form anyway.
     *       // The blank required inputs are passed to this function in `elements`.
     *       return ! confirm("Would you like to submit the form with missing info?");
     *     });
     */

    // Cut down on the number if issues from people inadvertently including jquery_ujs twice
    // by detecting and raising an error when it happens.
    var alreadyInitialized = function () {
        var events = $._data(document, 'events');
        return events && events.click && $.grep(events.click,function (e) {
            return e.namespace === 'rails';
        }).length;
    }

    if (alreadyInitialized()) {
        $.error('jquery-ujs has already been loaded!');
    }

    // Shorthand to make it a little easier to call public rails functions from within rails.js
    var rails;

    $.rails = rails = {
        // Link elements bound by jquery-ujs
        linkClickSelector:'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]',

        // Select elements bound by jquery-ujs
        inputChangeSelector:'select[data-remote], input[data-remote], textarea[data-remote]',

        // Form elements bound by jquery-ujs
        formSubmitSelector:'form',

        // Form input elements bound by jquery-ujs
        formInputClickSelector:'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])',

        // Form input elements disabled during form submission
        disableSelector:'input[data-disable-with], button[data-disable-with], textarea[data-disable-with]',

        // Form input elements re-enabled after form submission
        enableSelector:'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled',

        // Form required input elements
        requiredInputSelector:'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

        // Form file input elements
        fileInputSelector:'input:file',

        // Link onClick disable selector with possible reenable after remote submission
        linkDisableSelector:'a[data-disable-with]',

        // Make sure that every Ajax request sends the CSRF token
        CSRFProtection:function (xhr) {
            var token = $('meta[name="csrf-token"]').attr('content');
            if (token) xhr.setRequestHeader('X-CSRF-Token', token);
        },

        // Triggers an event on an element and returns false if the event result is false
        fire:function (obj, name, data) {
            var event = $.Event(name);
            obj.trigger(event, data);
            return event.result !== false;
        },

        // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
        confirm:function (message) {
            return confirm(message);
        },

        // Default ajax function, may be overridden with custom function in $.rails.ajax
        ajax:function (options) {
            return $.ajax(options);
        },

        // Default way to get an element's href. May be overridden at $.rails.href.
        href:function (element) {
            return element.attr('href');
        },

        // Submits "remote" forms and links with ajax
        handleRemote:function (element) {
            var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

            if (rails.fire(element, 'ajax:before')) {
                elCrossDomain = element.data('cross-domain');
                crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
                withCredentials = element.data('with-credentials') || null;
                dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

                if (element.is('form')) {
                    method = element.attr('method');
                    url = element.attr('action');
                    data = element.serializeArray();
                    // memoized value from clicked submit button
                    var button = element.data('ujs:submit-button');
                    if (button) {
                        data.push(button);
                        element.data('ujs:submit-button', null);
                    }
                } else if (element.is(rails.inputChangeSelector)) {
                    method = element.data('method');
                    url = element.data('url');
                    data = element.serialize();
                    if (element.data('params')) data = data + "&" + element.data('params');
                } else {
                    method = element.data('method');
                    url = rails.href(element);
                    data = element.data('params') || null;
                }

                options = {
                    type:method || 'GET', data:data, dataType:dataType,
                    // stopping the "ajax:beforeSend" event will cancel the ajax request
                    beforeSend:function (xhr, settings) {
                        if (settings.dataType === undefined) {
                            xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
                        }
                        return rails.fire(element, 'ajax:beforeSend', [xhr, settings]);
                    },
                    success:function (data, status, xhr) {
                        element.trigger('ajax:success', [data, status, xhr]);
                    },
                    complete:function (xhr, status) {
                        element.trigger('ajax:complete', [xhr, status]);
                    },
                    error:function (xhr, status, error) {
                        element.trigger('ajax:error', [xhr, status, error]);
                    },
                    xhrFields:{
                        withCredentials:withCredentials
                    },
                    crossDomain:crossDomain
                };
                // Only pass url to `ajax` options if not blank
                if (url) {
                    options.url = url;
                }

                var jqxhr = rails.ajax(options);
                element.trigger('ajax:send', jqxhr);
                return jqxhr;
            } else {
                return false;
            }
        },

        // Handles "data-method" on links such as:
        // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
        handleMethod:function (link) {
            var href = rails.href(link),
                method = link.data('method'),
                target = link.attr('target'),
                csrf_token = $('meta[name=csrf-token]').attr('content'),
                csrf_param = $('meta[name=csrf-param]').attr('content'),
                form = $('<form method="post" action="' + href + '"></form>'),
                metadata_input = '<input name="_method" value="' + method + '" type="hidden" />';

            if (csrf_param !== undefined && csrf_token !== undefined) {
                metadata_input += '<input name="' + csrf_param + '" value="' + csrf_token + '" type="hidden" />';
            }

            if (target) {
                form.attr('target', target);
            }

            form.hide().append(metadata_input).appendTo('body');
            form.submit();
        },

        /* Disables form elements:
         - Caches element value in 'ujs:enable-with' data store
         - Replaces element text with value of 'data-disable-with' attribute
         - Sets disabled property to true
         */
        disableFormElements:function (form) {
            form.find(rails.disableSelector).each(function () {
                var element = $(this), method = element.is('button') ? 'html' : 'val';
                element.data('ujs:enable-with', element[method]());
                element[method](element.data('disable-with'));
                element.prop('disabled', true);
            });
        },

        /* Re-enables disabled form elements:
         - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
         - Sets disabled property to false
         */
        enableFormElements:function (form) {
            form.find(rails.enableSelector).each(function () {
                var element = $(this), method = element.is('button') ? 'html' : 'val';
                if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
                element.prop('disabled', false);
            });
        },

        /* For 'data-confirm' attribute:
         - Fires `confirm` event
         - Shows the confirmation dialog
         - Fires the `confirm:complete` event

         Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
         Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
         Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
         return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
         */
        allowAction:function (element) {
            var message = element.data('confirm'),
                answer = false, callback;
            if (!message) {
                return true;
            }

            if (rails.fire(element, 'confirm')) {
                answer = rails.confirm(message);
                callback = rails.fire(element, 'confirm:complete', [answer]);
            }
            return answer && callback;
        },

        // Helper function which checks for blank inputs in a form that match the specified CSS selector
        blankInputs:function (form, specifiedSelector, nonBlank) {
            var inputs = $(), input, valueToCheck,
                selector = specifiedSelector || 'input,textarea',
                allInputs = form.find(selector);

            allInputs.each(function () {
                input = $(this);
                valueToCheck = input.is(':checkbox,:radio') ? input.is(':checked') : input.val();
                // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
                if (!valueToCheck === !nonBlank) {

                    // Don't count unchecked required radio if other radio with same name is checked
                    if (input.is(':radio') && allInputs.filter('input:radio:checked[name="' + input.attr('name') + '"]').length) {
                        return true; // Skip to next input
                    }

                    inputs = inputs.add(input);
                }
            });
            return inputs.length ? inputs : false;
        },

        // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
        nonBlankInputs:function (form, specifiedSelector) {
            return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
        },

        // Helper function, needed to provide consistent behavior in IE
        stopEverything:function (e) {
            $(e.target).trigger('ujs:everythingStopped');
            e.stopImmediatePropagation();
            return false;
        },

        // find all the submit events directly bound to the form and
        // manually invoke them. If anyone returns false then stop the loop
        callFormSubmitBindings:function (form, event) {
            var events = form.data('events'), continuePropagation = true;
            if (events !== undefined && events['submit'] !== undefined) {
                $.each(events['submit'], function (i, obj) {
                    if (typeof obj.handler === 'function') return continuePropagation = obj.handler(event);
                });
            }
            return continuePropagation;
        },

        //  replace element's html with the 'data-disable-with' after storing original html
        //  and prevent clicking on it
        disableElement:function (element) {
            element.data('ujs:enable-with', element.html()); // store enabled state
            element.html(element.data('disable-with')); // set to disabled state
            element.bind('click.railsDisable', function (e) { // prevent further clicking
                return rails.stopEverything(e);
            });
        },

        // restore element to its original state which was disabled by 'disableElement' above
        enableElement:function (element) {
            if (element.data('ujs:enable-with') !== undefined) {
                element.html(element.data('ujs:enable-with')); // set to old enabled state
                // this should be element.removeData('ujs:enable-with')
                // but, there is currently a bug in jquery which makes hyphenated data attributes not get removed
                element.data('ujs:enable-with', false); // clean up cache
            }
            element.unbind('click.railsDisable'); // enable element
        }

    };

    if (rails.fire($(document), 'rails:attachBindings')) {

        $.ajaxPrefilter(function (options, originalOptions, xhr) {
            if (!options.crossDomain) {
                rails.CSRFProtection(xhr);
            }
        });

        $(document).delegate(rails.linkDisableSelector, 'ajax:complete', function () {
            rails.enableElement($(this));
        });

        $(document).delegate(rails.linkClickSelector, 'click.rails', function (e) {
            var link = $(this), method = link.data('method'), data = link.data('params');
            if (!rails.allowAction(link)) return rails.stopEverything(e);

            if (link.is(rails.linkDisableSelector)) rails.disableElement(link);

            if (link.data('remote') !== undefined) {
                if ((e.metaKey || e.ctrlKey) && (!method || method === 'GET') && !data) {
                    return true;
                }

                var handleRemote = rails.handleRemote(link);
                // response from rails.handleRemote() will either be false or a deferred object promise.
                if (handleRemote === false) {
                    rails.enableElement(link);
                } else {
                    handleRemote.error(function () {
                        rails.enableElement(link);
                    });
                }
                return false;

            } else if (link.data('method')) {
                rails.handleMethod(link);
                return false;
            }
        });

        $(document).delegate(rails.inputChangeSelector, 'change.rails', function (e) {
            var link = $(this);
            if (!rails.allowAction(link)) return rails.stopEverything(e);

            rails.handleRemote(link);
            return false;
        });

        $(document).delegate(rails.formSubmitSelector, 'submit.rails', function (e) {
            var form = $(this),
                remote = form.data('remote') !== undefined,
                blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector),
                nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);

            if (!rails.allowAction(form)) return rails.stopEverything(e);

            // skip other logic when required values are missing or file upload is present
            if (blankRequiredInputs && form.attr("novalidate") == undefined && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
                return rails.stopEverything(e);
            }

            if (remote) {
                if (nonBlankFileInputs) {
                    // slight timeout so that the submit button gets properly serialized
                    // (make it easy for event handler to serialize form without disabled values)
                    setTimeout(function () {
                        rails.disableFormElements(form);
                    }, 13);
                    var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

                    // re-enable form elements if event bindings return false (canceling normal form submission)
                    if (!aborted) {
                        setTimeout(function () {
                            rails.enableFormElements(form);
                        }, 13);
                    }

                    return aborted;
                }

                // If browser does not support submit bubbling, then this live-binding will be called before direct
                // bindings. Therefore, we should directly call any direct bindings before remotely submitting form.
                if (!$.support.submitBubbles && $().jquery < '1.7' && rails.callFormSubmitBindings(form, e) === false) return rails.stopEverything(e);

                rails.handleRemote(form);
                return false;

            } else {
                // slight timeout so that the submit button gets properly serialized
                setTimeout(function () {
                    rails.disableFormElements(form);
                }, 13);
            }
        });

        $(document).delegate(rails.formInputClickSelector, 'click.rails', function (event) {
            var button = $(this);

            if (!rails.allowAction(button)) return rails.stopEverything(event);

            // register the pressed submit button
            var name = button.attr('name'),
                data = name ? {name:name, value:button.val()} : null;

            button.closest('form').data('ujs:submit-button', data);
        });

        $(document).delegate(rails.formSubmitSelector, 'ajax:beforeSend.rails', function (event) {
            if (this == event.target) rails.disableFormElements($(this));
        });

        $(document).delegate(rails.formSubmitSelector, 'ajax:complete.rails', function (event) {
            if (this == event.target) rails.enableFormElements($(this));
        });

        $(function () {
            // making sure that all forms have actual up-to-date token(cached forms contain old one)
            csrf_token = $('meta[name=csrf-token]').attr('content');
            csrf_param = $('meta[name=csrf-param]').attr('content');
            $('form input[name="' + csrf_param + '"]').val(csrf_token);
        });
    }

})(jQuery);
$(document).ready(function () {

    $('#cutoff').keyup(function (data) {
        $.get("/applicant/show_selected", {cutoff:$(this).val(), college_name:$('#collegename').val(), partial:$('#search').attr("partial") }, null, "script");
        return false;
    });

    $('#search').keyup(function () {
        $.get("/applicant/search", {search_name:$(this).val(), collegename:$('#search').attr("collegename"), partial:$('#search').attr("partial"), Logic_Pursued:$('#search').attr("LogicPursued"), Pairing_Pursued:$('#search').attr("ParingPursued"), First_Tech_Pursued:$('#search').attr("FirstTechPursued"), Final_Pursued:$('#search').attr("FinalPursued")}, null, "script");
        return false;
    });

});


function autoSave(object) {
    var value = object.value;
    var id = object.id;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/applicant/auto_save", true);
    var attribute = object.className;
    if (attribute == "PairingStatus") {
        object.checked = true;
        //alert(object.checked);
    }
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("score=" + value + "&" + "id=" + id + "&" + "attribute=" + attribute);
}


;
/*!
 * jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 *
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Sat Feb 13 22:33:48 2010 -0500
 */

(function (A, w) {
    function ma() {
        if (!c.isReady) {
            try {
                s.documentElement.doScroll("left")
            } catch (a) {
                setTimeout(ma, 1);
                return
            }
            c.ready()
        }
    }

    function Qa(a, b) {
        b.src ? c.ajax({url:b.src, async:false, dataType:"script"}) : c.globalEval(b.text || b.textContent || b.innerHTML || "");
        b.parentNode && b.parentNode.removeChild(b)
    }

    function X(a, b, d, f, e, j) {
        var i = a.length;
        if (typeof b === "object") {
            for (var o in b)X(a, o, b[o], f, e, d);
            return a
        }
        if (d !== w) {
            f = !j && f && c.isFunction(d);
            for (o = 0; o < i; o++)e(a[o], b, f ? d.call(a[o], o, e(a[o], b)) : d, j);
            return a
        }
        return i ?
            e(a[0], b) : w
    }

    function J() {
        return(new Date).getTime()
    }

    function Y() {
        return false
    }

    function Z() {
        return true
    }

    function na(a, b, d) {
        d[0].type = a;
        return c.event.handle.apply(b, d)
    }

    function oa(a) {
        var b, d = [], f = [], e = arguments, j, i, o, k, n, r;
        i = c.data(this, "events");
        if (!(a.liveFired === this || !i || !i.live || a.button && a.type === "click")) {
            a.liveFired = this;
            var u = i.live.slice(0);
            for (k = 0; k < u.length; k++) {
                i = u[k];
                i.origType.replace(O, "") === a.type ? f.push(i.selector) : u.splice(k--, 1)
            }
            j = c(a.target).closest(f, a.currentTarget);
            n = 0;
            for (r =
                     j.length; n < r; n++)for (k = 0; k < u.length; k++) {
                i = u[k];
                if (j[n].selector === i.selector) {
                    o = j[n].elem;
                    f = null;
                    if (i.preType === "mouseenter" || i.preType === "mouseleave")f = c(a.relatedTarget).closest(i.selector)[0];
                    if (!f || f !== o)d.push({elem:o, handleObj:i})
                }
            }
            n = 0;
            for (r = d.length; n < r; n++) {
                j = d[n];
                a.currentTarget = j.elem;
                a.data = j.handleObj.data;
                a.handleObj = j.handleObj;
                if (j.handleObj.origHandler.apply(j.elem, e) === false) {
                    b = false;
                    break
                }
            }
            return b
        }
    }

    function pa(a, b) {
        return"live." + (a && a !== "*" ? a + "." : "") + b.replace(/\./g, "`").replace(/ /g,
            "&")
    }

    function qa(a) {
        return!a || !a.parentNode || a.parentNode.nodeType === 11
    }

    function ra(a, b) {
        var d = 0;
        b.each(function () {
            if (this.nodeName === (a[d] && a[d].nodeName)) {
                var f = c.data(a[d++]), e = c.data(this, f);
                if (f = f && f.events) {
                    delete e.handle;
                    e.events = {};
                    for (var j in f)for (var i in f[j])c.event.add(this, j, f[j][i], f[j][i].data)
                }
            }
        })
    }

    function sa(a, b, d) {
        var f, e, j;
        b = b && b[0] ? b[0].ownerDocument || b[0] : s;
        if (a.length === 1 && typeof a[0] === "string" && a[0].length < 512 && b === s && !ta.test(a[0]) && (c.support.checkClone || !ua.test(a[0]))) {
            e =
                true;
            if (j = c.fragments[a[0]])if (j !== 1)f = j
        }
        if (!f) {
            f = b.createDocumentFragment();
            c.clean(a, b, f, d)
        }
        if (e)c.fragments[a[0]] = j ? f : 1;
        return{fragment:f, cacheable:e}
    }

    function K(a, b) {
        var d = {};
        c.each(va.concat.apply([], va.slice(0, b)), function () {
            d[this] = a
        });
        return d
    }

    function wa(a) {
        return"scrollTo"in a && a.document ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : false
    }

    var c = function (a, b) {
            return new c.fn.init(a, b)
        }, Ra = A.jQuery, Sa = A.$, s = A.document, T, Ta = /^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/, Ua = /^.[^:#\[\.,]*$/, Va = /\S/,
        Wa = /^(\s|\u00A0)+|(\s|\u00A0)+$/g, Xa = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, P = navigator.userAgent, xa = false, Q = [], L, $ = Object.prototype.toString, aa = Object.prototype.hasOwnProperty, ba = Array.prototype.push, R = Array.prototype.slice, ya = Array.prototype.indexOf;
    c.fn = c.prototype = {init:function (a, b) {
        var d, f;
        if (!a)return this;
        if (a.nodeType) {
            this.context = this[0] = a;
            this.length = 1;
            return this
        }
        if (a === "body" && !b) {
            this.context = s;
            this[0] = s.body;
            this.selector = "body";
            this.length = 1;
            return this
        }
        if (typeof a === "string")if ((d = Ta.exec(a)) &&
            (d[1] || !b))if (d[1]) {
            f = b ? b.ownerDocument || b : s;
            if (a = Xa.exec(a))if (c.isPlainObject(b)) {
                a = [s.createElement(a[1])];
                c.fn.attr.call(a, b, true)
            } else a = [f.createElement(a[1])]; else {
                a = sa([d[1]], [f]);
                a = (a.cacheable ? a.fragment.cloneNode(true) : a.fragment).childNodes
            }
            return c.merge(this, a)
        } else {
            if (b = s.getElementById(d[2])) {
                if (b.id !== d[2])return T.find(a);
                this.length = 1;
                this[0] = b
            }
            this.context = s;
            this.selector = a;
            return this
        } else if (!b && /^\w+$/.test(a)) {
            this.selector = a;
            this.context = s;
            a = s.getElementsByTagName(a);
            return c.merge(this,
                a)
        } else return!b || b.jquery ? (b || T).find(a) : c(b).find(a); else if (c.isFunction(a))return T.ready(a);
        if (a.selector !== w) {
            this.selector = a.selector;
            this.context = a.context
        }
        return c.makeArray(a, this)
    }, selector:"", jquery:"1.4.2", length:0, size:function () {
        return this.length
    }, toArray:function () {
        return R.call(this, 0)
    }, get:function (a) {
        return a == null ? this.toArray() : a < 0 ? this.slice(a)[0] : this[a]
    }, pushStack:function (a, b, d) {
        var f = c();
        c.isArray(a) ? ba.apply(f, a) : c.merge(f, a);
        f.prevObject = this;
        f.context = this.context;
        if (b ===
            "find")f.selector = this.selector + (this.selector ? " " : "") + d; else if (b)f.selector = this.selector + "." + b + "(" + d + ")";
        return f
    }, each:function (a, b) {
        return c.each(this, a, b)
    }, ready:function (a) {
        c.bindReady();
        if (c.isReady)a.call(s, c); else Q && Q.push(a);
        return this
    }, eq:function (a) {
        return a === -1 ? this.slice(a) : this.slice(a, +a + 1)
    }, first:function () {
        return this.eq(0)
    }, last:function () {
        return this.eq(-1)
    }, slice:function () {
        return this.pushStack(R.apply(this, arguments), "slice", R.call(arguments).join(","))
    }, map:function (a) {
        return this.pushStack(c.map(this,
            function (b, d) {
                return a.call(b, d, b)
            }))
    }, end:function () {
        return this.prevObject || c(null)
    }, push:ba, sort:[].sort, splice:[].splice};
    c.fn.init.prototype = c.fn;
    c.extend = c.fn.extend = function () {
        var a = arguments[0] || {}, b = 1, d = arguments.length, f = false, e, j, i, o;
        if (typeof a === "boolean") {
            f = a;
            a = arguments[1] || {};
            b = 2
        }
        if (typeof a !== "object" && !c.isFunction(a))a = {};
        if (d === b) {
            a = this;
            --b
        }
        for (; b < d; b++)if ((e = arguments[b]) != null)for (j in e) {
            i = a[j];
            o = e[j];
            if (a !== o)if (f && o && (c.isPlainObject(o) || c.isArray(o))) {
                i = i && (c.isPlainObject(i) ||
                    c.isArray(i)) ? i : c.isArray(o) ? [] : {};
                a[j] = c.extend(f, i, o)
            } else if (o !== w)a[j] = o
        }
        return a
    };
    c.extend({noConflict:function (a) {
        A.$ = Sa;
        if (a)A.jQuery = Ra;
        return c
    }, isReady:false, ready:function () {
        if (!c.isReady) {
            if (!s.body)return setTimeout(c.ready, 13);
            c.isReady = true;
            if (Q) {
                for (var a, b = 0; a = Q[b++];)a.call(s, c);
                Q = null
            }
            c.fn.triggerHandler && c(s).triggerHandler("ready")
        }
    }, bindReady:function () {
        if (!xa) {
            xa = true;
            if (s.readyState === "complete")return c.ready();
            if (s.addEventListener) {
                s.addEventListener("DOMContentLoaded",
                    L, false);
                A.addEventListener("load", c.ready, false)
            } else if (s.attachEvent) {
                s.attachEvent("onreadystatechange", L);
                A.attachEvent("onload", c.ready);
                var a = false;
                try {
                    a = A.frameElement == null
                } catch (b) {
                }
                s.documentElement.doScroll && a && ma()
            }
        }
    }, isFunction:function (a) {
        return $.call(a) === "[object Function]"
    }, isArray:function (a) {
        return $.call(a) === "[object Array]"
    }, isPlainObject:function (a) {
        if (!a || $.call(a) !== "[object Object]" || a.nodeType || a.setInterval)return false;
        if (a.constructor && !aa.call(a, "constructor") && !aa.call(a.constructor.prototype,
            "isPrototypeOf"))return false;
        var b;
        for (b in a);
        return b === w || aa.call(a, b)
    }, isEmptyObject:function (a) {
        for (var b in a)return false;
        return true
    }, error:function (a) {
        throw a;
    }, parseJSON:function (a) {
        if (typeof a !== "string" || !a)return null;
        a = c.trim(a);
        if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))return A.JSON && A.JSON.parse ? A.JSON.parse(a) : (new Function("return " +
            a))(); else c.error("Invalid JSON: " + a)
    }, noop:function () {
    }, globalEval:function (a) {
        if (a && Va.test(a)) {
            var b = s.getElementsByTagName("head")[0] || s.documentElement, d = s.createElement("script");
            d.type = "text/javascript";
            if (c.support.scriptEval)d.appendChild(s.createTextNode(a)); else d.text = a;
            b.insertBefore(d, b.firstChild);
            b.removeChild(d)
        }
    }, nodeName:function (a, b) {
        return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
    }, each:function (a, b, d) {
        var f, e = 0, j = a.length, i = j === w || c.isFunction(a);
        if (d)if (i)for (f in a) {
            if (b.apply(a[f],
                d) === false)break
        } else for (; e < j;) {
            if (b.apply(a[e++], d) === false)break
        } else if (i)for (f in a) {
            if (b.call(a[f], f, a[f]) === false)break
        } else for (d = a[0]; e < j && b.call(d, e, d) !== false; d = a[++e]);
        return a
    }, trim:function (a) {
        return(a || "").replace(Wa, "")
    }, makeArray:function (a, b) {
        b = b || [];
        if (a != null)a.length == null || typeof a === "string" || c.isFunction(a) || typeof a !== "function" && a.setInterval ? ba.call(b, a) : c.merge(b, a);
        return b
    }, inArray:function (a, b) {
        if (b.indexOf)return b.indexOf(a);
        for (var d = 0, f = b.length; d < f; d++)if (b[d] ===
            a)return d;
        return-1
    }, merge:function (a, b) {
        var d = a.length, f = 0;
        if (typeof b.length === "number")for (var e = b.length; f < e; f++)a[d++] = b[f]; else for (; b[f] !== w;)a[d++] = b[f++];
        a.length = d;
        return a
    }, grep:function (a, b, d) {
        for (var f = [], e = 0, j = a.length; e < j; e++)!d !== !b(a[e], e) && f.push(a[e]);
        return f
    }, map:function (a, b, d) {
        for (var f = [], e, j = 0, i = a.length; j < i; j++) {
            e = b(a[j], j, d);
            if (e != null)f[f.length] = e
        }
        return f.concat.apply([], f)
    }, guid:1, proxy:function (a, b, d) {
        if (arguments.length === 2)if (typeof b === "string") {
            d = a;
            a = d[b];
            b = w
        } else if (b &&
            !c.isFunction(b)) {
            d = b;
            b = w
        }
        if (!b && a)b = function () {
            return a.apply(d || this, arguments)
        };
        if (a)b.guid = a.guid = a.guid || b.guid || c.guid++;
        return b
    }, uaMatch:function (a) {
        a = a.toLowerCase();
        a = /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || !/compatible/.test(a) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(a) || [];
        return{browser:a[1] || "", version:a[2] || "0"}
    }, browser:{}});
    P = c.uaMatch(P);
    if (P.browser) {
        c.browser[P.browser] = true;
        c.browser.version = P.version
    }
    if (c.browser.webkit)c.browser.safari =
        true;
    if (ya)c.inArray = function (a, b) {
        return ya.call(b, a)
    };
    T = c(s);
    if (s.addEventListener)L = function () {
        s.removeEventListener("DOMContentLoaded", L, false);
        c.ready()
    }; else if (s.attachEvent)L = function () {
        if (s.readyState === "complete") {
            s.detachEvent("onreadystatechange", L);
            c.ready()
        }
    };
    (function () {
        c.support = {};
        var a = s.documentElement, b = s.createElement("script"), d = s.createElement("div"), f = "script" + J();
        d.style.display = "none";
        d.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
        var e = d.getElementsByTagName("*"), j = d.getElementsByTagName("a")[0];
        if (!(!e || !e.length || !j)) {
            c.support = {leadingWhitespace:d.firstChild.nodeType === 3, tbody:!d.getElementsByTagName("tbody").length, htmlSerialize:!!d.getElementsByTagName("link").length, style:/red/.test(j.getAttribute("style")), hrefNormalized:j.getAttribute("href") === "/a", opacity:/^0.55$/.test(j.style.opacity), cssFloat:!!j.style.cssFloat, checkOn:d.getElementsByTagName("input")[0].value === "on", optSelected:s.createElement("select").appendChild(s.createElement("option")).selected,
                parentNode:d.removeChild(d.appendChild(s.createElement("div"))).parentNode === null, deleteExpando:true, checkClone:false, scriptEval:false, noCloneEvent:true, boxModel:null};
            b.type = "text/javascript";
            try {
                b.appendChild(s.createTextNode("window." + f + "=1;"))
            } catch (i) {
            }
            a.insertBefore(b, a.firstChild);
            if (A[f]) {
                c.support.scriptEval = true;
                delete A[f]
            }
            try {
                delete b.test
            } catch (o) {
                c.support.deleteExpando = false
            }
            a.removeChild(b);
            if (d.attachEvent && d.fireEvent) {
                d.attachEvent("onclick", function k() {
                    c.support.noCloneEvent =
                        false;
                    d.detachEvent("onclick", k)
                });
                d.cloneNode(true).fireEvent("onclick")
            }
            d = s.createElement("div");
            d.innerHTML = "<input type='radio' name='radiotest' checked='checked'/>";
            a = s.createDocumentFragment();
            a.appendChild(d.firstChild);
            c.support.checkClone = a.cloneNode(true).cloneNode(true).lastChild.checked;
            c(function () {
                var k = s.createElement("div");
                k.style.width = k.style.paddingLeft = "1px";
                s.body.appendChild(k);
                c.boxModel = c.support.boxModel = k.offsetWidth === 2;
                s.body.removeChild(k).style.display = "none"
            });
            a = function (k) {
                var n =
                    s.createElement("div");
                k = "on" + k;
                var r = k in n;
                if (!r) {
                    n.setAttribute(k, "return;");
                    r = typeof n[k] === "function"
                }
                return r
            };
            c.support.submitBubbles = a("submit");
            c.support.changeBubbles = a("change");
            a = b = d = e = j = null
        }
    })();
    c.props = {"for":"htmlFor", "class":"className", readonly:"readOnly", maxlength:"maxLength", cellspacing:"cellSpacing", rowspan:"rowSpan", colspan:"colSpan", tabindex:"tabIndex", usemap:"useMap", frameborder:"frameBorder"};
    var G = "jQuery" + J(), Ya = 0, za = {};
    c.extend({cache:{}, expando:G, noData:{embed:true, object:true,
        applet:true}, data:function (a, b, d) {
        if (!(a.nodeName && c.noData[a.nodeName.toLowerCase()])) {
            a = a == A ? za : a;
            var f = a[G], e = c.cache;
            if (!f && typeof b === "string" && d === w)return null;
            f || (f = ++Ya);
            if (typeof b === "object") {
                a[G] = f;
                e[f] = c.extend(true, {}, b)
            } else if (!e[f]) {
                a[G] = f;
                e[f] = {}
            }
            a = e[f];
            if (d !== w)a[b] = d;
            return typeof b === "string" ? a[b] : a
        }
    }, removeData:function (a, b) {
        if (!(a.nodeName && c.noData[a.nodeName.toLowerCase()])) {
            a = a == A ? za : a;
            var d = a[G], f = c.cache, e = f[d];
            if (b) {
                if (e) {
                    delete e[b];
                    c.isEmptyObject(e) && c.removeData(a)
                }
            } else {
                if (c.support.deleteExpando)delete a[c.expando];
                else a.removeAttribute && a.removeAttribute(c.expando);
                delete f[d]
            }
        }
    }});
    c.fn.extend({data:function (a, b) {
        if (typeof a === "undefined" && this.length)return c.data(this[0]); else if (typeof a === "object")return this.each(function () {
            c.data(this, a)
        });
        var d = a.split(".");
        d[1] = d[1] ? "." + d[1] : "";
        if (b === w) {
            var f = this.triggerHandler("getData" + d[1] + "!", [d[0]]);
            if (f === w && this.length)f = c.data(this[0], a);
            return f === w && d[1] ? this.data(d[0]) : f
        } else return this.trigger("setData" + d[1] + "!", [d[0], b]).each(function () {
            c.data(this,
                a, b)
        })
    }, removeData:function (a) {
        return this.each(function () {
            c.removeData(this, a)
        })
    }});
    c.extend({queue:function (a, b, d) {
        if (a) {
            b = (b || "fx") + "queue";
            var f = c.data(a, b);
            if (!d)return f || [];
            if (!f || c.isArray(d))f = c.data(a, b, c.makeArray(d)); else f.push(d);
            return f
        }
    }, dequeue:function (a, b) {
        b = b || "fx";
        var d = c.queue(a, b), f = d.shift();
        if (f === "inprogress")f = d.shift();
        if (f) {
            b === "fx" && d.unshift("inprogress");
            f.call(a, function () {
                c.dequeue(a, b)
            })
        }
    }});
    c.fn.extend({queue:function (a, b) {
        if (typeof a !== "string") {
            b = a;
            a = "fx"
        }
        if (b ===
            w)return c.queue(this[0], a);
        return this.each(function () {
            var d = c.queue(this, a, b);
            a === "fx" && d[0] !== "inprogress" && c.dequeue(this, a)
        })
    }, dequeue:function (a) {
        return this.each(function () {
            c.dequeue(this, a)
        })
    }, delay:function (a, b) {
        a = c.fx ? c.fx.speeds[a] || a : a;
        b = b || "fx";
        return this.queue(b, function () {
            var d = this;
            setTimeout(function () {
                c.dequeue(d, b)
            }, a)
        })
    }, clearQueue:function (a) {
        return this.queue(a || "fx", [])
    }});
    var Aa = /[\n\t]/g, ca = /\s+/, Za = /\r/g, $a = /href|src|style/, ab = /(button|input)/i, bb = /(button|input|object|select|textarea)/i,
        cb = /^(a|area)$/i, Ba = /radio|checkbox/;
    c.fn.extend({attr:function (a, b) {
        return X(this, a, b, true, c.attr)
    }, removeAttr:function (a) {
        return this.each(function () {
            c.attr(this, a, "");
            this.nodeType === 1 && this.removeAttribute(a)
        })
    }, addClass:function (a) {
        if (c.isFunction(a))return this.each(function (n) {
            var r = c(this);
            r.addClass(a.call(this, n, r.attr("class")))
        });
        if (a && typeof a === "string")for (var b = (a || "").split(ca), d = 0, f = this.length; d < f; d++) {
            var e = this[d];
            if (e.nodeType === 1)if (e.className) {
                for (var j = " " + e.className + " ",
                         i = e.className, o = 0, k = b.length; o < k; o++)if (j.indexOf(" " + b[o] + " ") < 0)i += " " + b[o];
                e.className = c.trim(i)
            } else e.className = a
        }
        return this
    }, removeClass:function (a) {
        if (c.isFunction(a))return this.each(function (k) {
            var n = c(this);
            n.removeClass(a.call(this, k, n.attr("class")))
        });
        if (a && typeof a === "string" || a === w)for (var b = (a || "").split(ca), d = 0, f = this.length; d < f; d++) {
            var e = this[d];
            if (e.nodeType === 1 && e.className)if (a) {
                for (var j = (" " + e.className + " ").replace(Aa, " "), i = 0, o = b.length; i < o; i++)j = j.replace(" " + b[i] + " ",
                    " ");
                e.className = c.trim(j)
            } else e.className = ""
        }
        return this
    }, toggleClass:function (a, b) {
        var d = typeof a, f = typeof b === "boolean";
        if (c.isFunction(a))return this.each(function (e) {
            var j = c(this);
            j.toggleClass(a.call(this, e, j.attr("class"), b), b)
        });
        return this.each(function () {
            if (d === "string")for (var e, j = 0, i = c(this), o = b, k = a.split(ca); e = k[j++];) {
                o = f ? o : !i.hasClass(e);
                i[o ? "addClass" : "removeClass"](e)
            } else if (d === "undefined" || d === "boolean") {
                this.className && c.data(this, "__className__", this.className);
                this.className =
                    this.className || a === false ? "" : c.data(this, "__className__") || ""
            }
        })
    }, hasClass:function (a) {
        a = " " + a + " ";
        for (var b = 0, d = this.length; b < d; b++)if ((" " + this[b].className + " ").replace(Aa, " ").indexOf(a) > -1)return true;
        return false
    }, val:function (a) {
        if (a === w) {
            var b = this[0];
            if (b) {
                if (c.nodeName(b, "option"))return(b.attributes.value || {}).specified ? b.value : b.text;
                if (c.nodeName(b, "select")) {
                    var d = b.selectedIndex, f = [], e = b.options;
                    b = b.type === "select-one";
                    if (d < 0)return null;
                    var j = b ? d : 0;
                    for (d = b ? d + 1 : e.length; j < d; j++) {
                        var i =
                            e[j];
                        if (i.selected) {
                            a = c(i).val();
                            if (b)return a;
                            f.push(a)
                        }
                    }
                    return f
                }
                if (Ba.test(b.type) && !c.support.checkOn)return b.getAttribute("value") === null ? "on" : b.value;
                return(b.value || "").replace(Za, "")
            }
            return w
        }
        var o = c.isFunction(a);
        return this.each(function (k) {
            var n = c(this), r = a;
            if (this.nodeType === 1) {
                if (o)r = a.call(this, k, n.val());
                if (typeof r === "number")r += "";
                if (c.isArray(r) && Ba.test(this.type))this.checked = c.inArray(n.val(), r) >= 0; else if (c.nodeName(this, "select")) {
                    var u = c.makeArray(r);
                    c("option", this).each(function () {
                        this.selected =
                            c.inArray(c(this).val(), u) >= 0
                    });
                    if (!u.length)this.selectedIndex = -1
                } else this.value = r
            }
        })
    }});
    c.extend({attrFn:{val:true, css:true, html:true, text:true, data:true, width:true, height:true, offset:true}, attr:function (a, b, d, f) {
        if (!a || a.nodeType === 3 || a.nodeType === 8)return w;
        if (f && b in c.attrFn)return c(a)[b](d);
        f = a.nodeType !== 1 || !c.isXMLDoc(a);
        var e = d !== w;
        b = f && c.props[b] || b;
        if (a.nodeType === 1) {
            var j = $a.test(b);
            if (b in a && f && !j) {
                if (e) {
                    b === "type" && ab.test(a.nodeName) && a.parentNode && c.error("type property can't be changed");
                    a[b] = d
                }
                if (c.nodeName(a, "form") && a.getAttributeNode(b))return a.getAttributeNode(b).nodeValue;
                if (b === "tabIndex")return(b = a.getAttributeNode("tabIndex")) && b.specified ? b.value : bb.test(a.nodeName) || cb.test(a.nodeName) && a.href ? 0 : w;
                return a[b]
            }
            if (!c.support.style && f && b === "style") {
                if (e)a.style.cssText = "" + d;
                return a.style.cssText
            }
            e && a.setAttribute(b, "" + d);
            a = !c.support.hrefNormalized && f && j ? a.getAttribute(b, 2) : a.getAttribute(b);
            return a === null ? w : a
        }
        return c.style(a, b, d)
    }});
    var O = /\.(.*)$/, db = function (a) {
        return a.replace(/[^\w\s\.\|`]/g,
            function (b) {
                return"\\" + b
            })
    };
    c.event = {add:function (a, b, d, f) {
        if (!(a.nodeType === 3 || a.nodeType === 8)) {
            if (a.setInterval && a !== A && !a.frameElement)a = A;
            var e, j;
            if (d.handler) {
                e = d;
                d = e.handler
            }
            if (!d.guid)d.guid = c.guid++;
            if (j = c.data(a)) {
                var i = j.events = j.events || {}, o = j.handle;
                if (!o)j.handle = o = function () {
                    return typeof c !== "undefined" && !c.event.triggered ? c.event.handle.apply(o.elem, arguments) : w
                };
                o.elem = a;
                b = b.split(" ");
                for (var k, n = 0, r; k = b[n++];) {
                    j = e ? c.extend({}, e) : {handler:d, data:f};
                    if (k.indexOf(".") > -1) {
                        r = k.split(".");
                        k = r.shift();
                        j.namespace = r.slice(0).sort().join(".")
                    } else {
                        r = [];
                        j.namespace = ""
                    }
                    j.type = k;
                    j.guid = d.guid;
                    var u = i[k], z = c.event.special[k] || {};
                    if (!u) {
                        u = i[k] = [];
                        if (!z.setup || z.setup.call(a, f, r, o) === false)if (a.addEventListener)a.addEventListener(k, o, false); else a.attachEvent && a.attachEvent("on" + k, o)
                    }
                    if (z.add) {
                        z.add.call(a, j);
                        if (!j.handler.guid)j.handler.guid = d.guid
                    }
                    u.push(j);
                    c.event.global[k] = true
                }
                a = null
            }
        }
    }, global:{}, remove:function (a, b, d, f) {
        if (!(a.nodeType === 3 || a.nodeType === 8)) {
            var e, j = 0, i, o, k, n, r, u, z = c.data(a),
                C = z && z.events;
            if (z && C) {
                if (b && b.type) {
                    d = b.handler;
                    b = b.type
                }
                if (!b || typeof b === "string" && b.charAt(0) === ".") {
                    b = b || "";
                    for (e in C)c.event.remove(a, e + b)
                } else {
                    for (b = b.split(" "); e = b[j++];) {
                        n = e;
                        i = e.indexOf(".") < 0;
                        o = [];
                        if (!i) {
                            o = e.split(".");
                            e = o.shift();
                            k = new RegExp("(^|\\.)" + c.map(o.slice(0).sort(), db).join("\\.(?:.*\\.)?") + "(\\.|$)")
                        }
                        if (r = C[e])if (d) {
                            n = c.event.special[e] || {};
                            for (B = f || 0; B < r.length; B++) {
                                u = r[B];
                                if (d.guid === u.guid) {
                                    if (i || k.test(u.namespace)) {
                                        f == null && r.splice(B--, 1);
                                        n.remove && n.remove.call(a, u)
                                    }
                                    if (f !=
                                        null)break
                                }
                            }
                            if (r.length === 0 || f != null && r.length === 1) {
                                if (!n.teardown || n.teardown.call(a, o) === false)Ca(a, e, z.handle);
                                delete C[e]
                            }
                        } else for (var B = 0; B < r.length; B++) {
                            u = r[B];
                            if (i || k.test(u.namespace)) {
                                c.event.remove(a, n, u.handler, B);
                                r.splice(B--, 1)
                            }
                        }
                    }
                    if (c.isEmptyObject(C)) {
                        if (b = z.handle)b.elem = null;
                        delete z.events;
                        delete z.handle;
                        c.isEmptyObject(z) && c.removeData(a)
                    }
                }
            }
        }
    }, trigger:function (a, b, d, f) {
        var e = a.type || a;
        if (!f) {
            a = typeof a === "object" ? a[G] ? a : c.extend(c.Event(e), a) : c.Event(e);
            if (e.indexOf("!") >= 0) {
                a.type =
                    e = e.slice(0, -1);
                a.exclusive = true
            }
            if (!d) {
                a.stopPropagation();
                c.event.global[e] && c.each(c.cache, function () {
                    this.events && this.events[e] && c.event.trigger(a, b, this.handle.elem)
                })
            }
            if (!d || d.nodeType === 3 || d.nodeType === 8)return w;
            a.result = w;
            a.target = d;
            b = c.makeArray(b);
            b.unshift(a)
        }
        a.currentTarget = d;
        (f = c.data(d, "handle")) && f.apply(d, b);
        f = d.parentNode || d.ownerDocument;
        try {
            if (!(d && d.nodeName && c.noData[d.nodeName.toLowerCase()]))if (d["on" + e] && d["on" + e].apply(d, b) === false)a.result = false
        } catch (j) {
        }
        if (!a.isPropagationStopped() &&
            f)c.event.trigger(a, b, f, true); else if (!a.isDefaultPrevented()) {
            f = a.target;
            var i, o = c.nodeName(f, "a") && e === "click", k = c.event.special[e] || {};
            if ((!k._default || k._default.call(d, a) === false) && !o && !(f && f.nodeName && c.noData[f.nodeName.toLowerCase()])) {
                try {
                    if (f[e]) {
                        if (i = f["on" + e])f["on" + e] = null;
                        c.event.triggered = true;
                        f[e]()
                    }
                } catch (n) {
                }
                if (i)f["on" + e] = i;
                c.event.triggered = false
            }
        }
    }, handle:function (a) {
        var b, d, f, e;
        a = arguments[0] = c.event.fix(a || A.event);
        a.currentTarget = this;
        b = a.type.indexOf(".") < 0 && !a.exclusive;
        if (!b) {
            d = a.type.split(".");
            a.type = d.shift();
            f = new RegExp("(^|\\.)" + d.slice(0).sort().join("\\.(?:.*\\.)?") + "(\\.|$)")
        }
        e = c.data(this, "events");
        d = e[a.type];
        if (e && d) {
            d = d.slice(0);
            e = 0;
            for (var j = d.length; e < j; e++) {
                var i = d[e];
                if (b || f.test(i.namespace)) {
                    a.handler = i.handler;
                    a.data = i.data;
                    a.handleObj = i;
                    i = i.handler.apply(this, arguments);
                    if (i !== w) {
                        a.result = i;
                        if (i === false) {
                            a.preventDefault();
                            a.stopPropagation()
                        }
                    }
                    if (a.isImmediatePropagationStopped())break
                }
            }
        }
        return a.result
    }, props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
        fix:function (a) {
            if (a[G])return a;
            var b = a;
            a = c.Event(b);
            for (var d = this.props.length, f; d;) {
                f = this.props[--d];
                a[f] = b[f]
            }
            if (!a.target)a.target = a.srcElement || s;
            if (a.target.nodeType === 3)a.target = a.target.parentNode;
            if (!a.relatedTarget && a.fromElement)a.relatedTarget = a.fromElement === a.target ? a.toElement : a.fromElement;
            if (a.pageX == null && a.clientX != null) {
                b = s.documentElement;
                d = s.body;
                a.pageX = a.clientX + (b && b.scrollLeft || d && d.scrollLeft || 0) - (b && b.clientLeft || d && d.clientLeft || 0);
                a.pageY = a.clientY + (b && b.scrollTop ||
                    d && d.scrollTop || 0) - (b && b.clientTop || d && d.clientTop || 0)
            }
            if (!a.which && (a.charCode || a.charCode === 0 ? a.charCode : a.keyCode))a.which = a.charCode || a.keyCode;
            if (!a.metaKey && a.ctrlKey)a.metaKey = a.ctrlKey;
            if (!a.which && a.button !== w)a.which = a.button & 1 ? 1 : a.button & 2 ? 3 : a.button & 4 ? 2 : 0;
            return a
        }, guid:1E8, proxy:c.proxy, special:{ready:{setup:c.bindReady, teardown:c.noop}, live:{add:function (a) {
            c.event.add(this, a.origType, c.extend({}, a, {handler:oa}))
        }, remove:function (a) {
            var b = true, d = a.origType.replace(O, "");
            c.each(c.data(this,
                "events").live || [], function () {
                if (d === this.origType.replace(O, ""))return b = false
            });
            b && c.event.remove(this, a.origType, oa)
        }}, beforeunload:{setup:function (a, b, d) {
            if (this.setInterval)this.onbeforeunload = d;
            return false
        }, teardown:function (a, b) {
            if (this.onbeforeunload === b)this.onbeforeunload = null
        }}}};
    var Ca = s.removeEventListener ? function (a, b, d) {
        a.removeEventListener(b, d, false)
    } : function (a, b, d) {
        a.detachEvent("on" + b, d)
    };
    c.Event = function (a) {
        if (!this.preventDefault)return new c.Event(a);
        if (a && a.type) {
            this.originalEvent =
                a;
            this.type = a.type
        } else this.type = a;
        this.timeStamp = J();
        this[G] = true
    };
    c.Event.prototype = {preventDefault:function () {
        this.isDefaultPrevented = Z;
        var a = this.originalEvent;
        if (a) {
            a.preventDefault && a.preventDefault();
            a.returnValue = false
        }
    }, stopPropagation:function () {
        this.isPropagationStopped = Z;
        var a = this.originalEvent;
        if (a) {
            a.stopPropagation && a.stopPropagation();
            a.cancelBubble = true
        }
    }, stopImmediatePropagation:function () {
        this.isImmediatePropagationStopped = Z;
        this.stopPropagation()
    }, isDefaultPrevented:Y, isPropagationStopped:Y,
        isImmediatePropagationStopped:Y};
    var Da = function (a) {
        var b = a.relatedTarget;
        try {
            for (; b && b !== this;)b = b.parentNode;
            if (b !== this) {
                a.type = a.data;
                c.event.handle.apply(this, arguments)
            }
        } catch (d) {
        }
    }, Ea = function (a) {
        a.type = a.data;
        c.event.handle.apply(this, arguments)
    };
    c.each({mouseenter:"mouseover", mouseleave:"mouseout"}, function (a, b) {
        c.event.special[a] = {setup:function (d) {
            c.event.add(this, b, d && d.selector ? Ea : Da, a)
        }, teardown:function (d) {
            c.event.remove(this, b, d && d.selector ? Ea : Da)
        }}
    });
    if (!c.support.submitBubbles)c.event.special.submit =
    {setup:function () {
        if (this.nodeName.toLowerCase() !== "form") {
            c.event.add(this, "click.specialSubmit", function (a) {
                var b = a.target, d = b.type;
                if ((d === "submit" || d === "image") && c(b).closest("form").length)return na("submit", this, arguments)
            });
            c.event.add(this, "keypress.specialSubmit", function (a) {
                var b = a.target, d = b.type;
                if ((d === "text" || d === "password") && c(b).closest("form").length && a.keyCode === 13)return na("submit", this, arguments)
            })
        } else return false
    }, teardown:function () {
        c.event.remove(this, ".specialSubmit")
    }};
    if (!c.support.changeBubbles) {
        var da = /textarea|input|select/i, ea, Fa = function (a) {
            var b = a.type, d = a.value;
            if (b === "radio" || b === "checkbox")d = a.checked; else if (b === "select-multiple")d = a.selectedIndex > -1 ? c.map(a.options,function (f) {
                return f.selected
            }).join("-") : ""; else if (a.nodeName.toLowerCase() === "select")d = a.selectedIndex;
            return d
        }, fa = function (a, b) {
            var d = a.target, f, e;
            if (!(!da.test(d.nodeName) || d.readOnly)) {
                f = c.data(d, "_change_data");
                e = Fa(d);
                if (a.type !== "focusout" || d.type !== "radio")c.data(d, "_change_data",
                    e);
                if (!(f === w || e === f))if (f != null || e) {
                    a.type = "change";
                    return c.event.trigger(a, b, d)
                }
            }
        };
        c.event.special.change = {filters:{focusout:fa, click:function (a) {
            var b = a.target, d = b.type;
            if (d === "radio" || d === "checkbox" || b.nodeName.toLowerCase() === "select")return fa.call(this, a)
        }, keydown:function (a) {
            var b = a.target, d = b.type;
            if (a.keyCode === 13 && b.nodeName.toLowerCase() !== "textarea" || a.keyCode === 32 && (d === "checkbox" || d === "radio") || d === "select-multiple")return fa.call(this, a)
        }, beforeactivate:function (a) {
            a = a.target;
            c.data(a,
                "_change_data", Fa(a))
        }}, setup:function () {
            if (this.type === "file")return false;
            for (var a in ea)c.event.add(this, a + ".specialChange", ea[a]);
            return da.test(this.nodeName)
        }, teardown:function () {
            c.event.remove(this, ".specialChange");
            return da.test(this.nodeName)
        }};
        ea = c.event.special.change.filters
    }
    s.addEventListener && c.each({focus:"focusin", blur:"focusout"}, function (a, b) {
        function d(f) {
            f = c.event.fix(f);
            f.type = b;
            return c.event.handle.call(this, f)
        }

        c.event.special[b] = {setup:function () {
            this.addEventListener(a,
                d, true)
        }, teardown:function () {
            this.removeEventListener(a, d, true)
        }}
    });
    c.each(["bind", "one"], function (a, b) {
        c.fn[b] = function (d, f, e) {
            if (typeof d === "object") {
                for (var j in d)this[b](j, f, d[j], e);
                return this
            }
            if (c.isFunction(f)) {
                e = f;
                f = w
            }
            var i = b === "one" ? c.proxy(e, function (k) {
                c(this).unbind(k, i);
                return e.apply(this, arguments)
            }) : e;
            if (d === "unload" && b !== "one")this.one(d, f, e); else {
                j = 0;
                for (var o = this.length; j < o; j++)c.event.add(this[j], d, i, f)
            }
            return this
        }
    });
    c.fn.extend({unbind:function (a, b) {
        if (typeof a === "object" &&
            !a.preventDefault)for (var d in a)this.unbind(d, a[d]); else {
            d = 0;
            for (var f = this.length; d < f; d++)c.event.remove(this[d], a, b)
        }
        return this
    }, delegate:function (a, b, d, f) {
        return this.live(b, d, f, a)
    }, undelegate:function (a, b, d) {
        return arguments.length === 0 ? this.unbind("live") : this.die(b, null, d, a)
    }, trigger:function (a, b) {
        return this.each(function () {
            c.event.trigger(a, b, this)
        })
    }, triggerHandler:function (a, b) {
        if (this[0]) {
            a = c.Event(a);
            a.preventDefault();
            a.stopPropagation();
            c.event.trigger(a, b, this[0]);
            return a.result
        }
    },
        toggle:function (a) {
            for (var b = arguments, d = 1; d < b.length;)c.proxy(a, b[d++]);
            return this.click(c.proxy(a, function (f) {
                var e = (c.data(this, "lastToggle" + a.guid) || 0) % d;
                c.data(this, "lastToggle" + a.guid, e + 1);
                f.preventDefault();
                return b[e].apply(this, arguments) || false
            }))
        }, hover:function (a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }});
    var Ga = {focus:"focusin", blur:"focusout", mouseenter:"mouseover", mouseleave:"mouseout"};
    c.each(["live", "die"], function (a, b) {
        c.fn[b] = function (d, f, e, j) {
            var i, o = 0, k, n, r = j || this.selector,
                u = j ? this : c(this.context);
            if (c.isFunction(f)) {
                e = f;
                f = w
            }
            for (d = (d || "").split(" "); (i = d[o++]) != null;) {
                j = O.exec(i);
                k = "";
                if (j) {
                    k = j[0];
                    i = i.replace(O, "")
                }
                if (i === "hover")d.push("mouseenter" + k, "mouseleave" + k); else {
                    n = i;
                    if (i === "focus" || i === "blur") {
                        d.push(Ga[i] + k);
                        i += k
                    } else i = (Ga[i] || i) + k;
                    b === "live" ? u.each(function () {
                        c.event.add(this, pa(i, r), {data:f, selector:r, handler:e, origType:i, origHandler:e, preType:n})
                    }) : u.unbind(pa(i, r), e)
                }
            }
            return this
        }
    });
    c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),
        function (a, b) {
            c.fn[b] = function (d) {
                return d ? this.bind(b, d) : this.trigger(b)
            };
            if (c.attrFn)c.attrFn[b] = true
        });
    A.attachEvent && !A.addEventListener && A.attachEvent("onunload", function () {
        for (var a in c.cache)if (c.cache[a].handle)try {
            c.event.remove(c.cache[a].handle.elem)
        } catch (b) {
        }
    });
    (function () {
        function a(g) {
            for (var h = "", l, m = 0; g[m]; m++) {
                l = g[m];
                if (l.nodeType === 3 || l.nodeType === 4)h += l.nodeValue; else if (l.nodeType !== 8)h += a(l.childNodes)
            }
            return h
        }

        function b(g, h, l, m, q, p) {
            q = 0;
            for (var v = m.length; q < v; q++) {
                var t = m[q];
                if (t) {
                    t = t[g];
                    for (var y = false; t;) {
                        if (t.sizcache === l) {
                            y = m[t.sizset];
                            break
                        }
                        if (t.nodeType === 1 && !p) {
                            t.sizcache = l;
                            t.sizset = q
                        }
                        if (t.nodeName.toLowerCase() === h) {
                            y = t;
                            break
                        }
                        t = t[g]
                    }
                    m[q] = y
                }
            }
        }

        function d(g, h, l, m, q, p) {
            q = 0;
            for (var v = m.length; q < v; q++) {
                var t = m[q];
                if (t) {
                    t = t[g];
                    for (var y = false; t;) {
                        if (t.sizcache === l) {
                            y = m[t.sizset];
                            break
                        }
                        if (t.nodeType === 1) {
                            if (!p) {
                                t.sizcache = l;
                                t.sizset = q
                            }
                            if (typeof h !== "string") {
                                if (t === h) {
                                    y = true;
                                    break
                                }
                            } else if (k.filter(h, [t]).length > 0) {
                                y = t;
                                break
                            }
                        }
                        t = t[g]
                    }
                    m[q] = y
                }
            }
        }

        var f = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
            e = 0, j = Object.prototype.toString, i = false, o = true;
        [0, 0].sort(function () {
            o = false;
            return 0
        });
        var k = function (g, h, l, m) {
            l = l || [];
            var q = h = h || s;
            if (h.nodeType !== 1 && h.nodeType !== 9)return[];
            if (!g || typeof g !== "string")return l;
            for (var p = [], v, t, y, S, H = true, M = x(h), I = g; (f.exec(""), v = f.exec(I)) !== null;) {
                I = v[3];
                p.push(v[1]);
                if (v[2]) {
                    S = v[3];
                    break
                }
            }
            if (p.length > 1 && r.exec(g))if (p.length === 2 && n.relative[p[0]])t = ga(p[0] + p[1], h); else for (t = n.relative[p[0]] ? [h] : k(p.shift(), h); p.length;) {
                g = p.shift();
                if (n.relative[g])g += p.shift();
                t = ga(g, t)
            } else {
                if (!m && p.length > 1 && h.nodeType === 9 && !M && n.match.ID.test(p[0]) && !n.match.ID.test(p[p.length - 1])) {
                    v = k.find(p.shift(), h, M);
                    h = v.expr ? k.filter(v.expr, v.set)[0] : v.set[0]
                }
                if (h) {
                    v = m ? {expr:p.pop(), set:z(m)} : k.find(p.pop(), p.length === 1 && (p[0] === "~" || p[0] === "+") && h.parentNode ? h.parentNode : h, M);
                    t = v.expr ? k.filter(v.expr, v.set) : v.set;
                    if (p.length > 0)y = z(t); else H = false;
                    for (; p.length;) {
                        var D = p.pop();
                        v = D;
                        if (n.relative[D])v = p.pop(); else D = "";
                        if (v == null)v = h;
                        n.relative[D](y, v, M)
                    }
                } else y = []
            }
            y || (y = t);
            y || k.error(D ||
                g);
            if (j.call(y) === "[object Array]")if (H)if (h && h.nodeType === 1)for (g = 0; y[g] != null; g++) {
                if (y[g] && (y[g] === true || y[g].nodeType === 1 && E(h, y[g])))l.push(t[g])
            } else for (g = 0; y[g] != null; g++)y[g] && y[g].nodeType === 1 && l.push(t[g]); else l.push.apply(l, y); else z(y, l);
            if (S) {
                k(S, q, l, m);
                k.uniqueSort(l)
            }
            return l
        };
        k.uniqueSort = function (g) {
            if (B) {
                i = o;
                g.sort(B);
                if (i)for (var h = 1; h < g.length; h++)g[h] === g[h - 1] && g.splice(h--, 1)
            }
            return g
        };
        k.matches = function (g, h) {
            return k(g, null, null, h)
        };
        k.find = function (g, h, l) {
            var m, q;
            if (!g)return[];
            for (var p = 0, v = n.order.length; p < v; p++) {
                var t = n.order[p];
                if (q = n.leftMatch[t].exec(g)) {
                    var y = q[1];
                    q.splice(1, 1);
                    if (y.substr(y.length - 1) !== "\\") {
                        q[1] = (q[1] || "").replace(/\\/g, "");
                        m = n.find[t](q, h, l);
                        if (m != null) {
                            g = g.replace(n.match[t], "");
                            break
                        }
                    }
                }
            }
            m || (m = h.getElementsByTagName("*"));
            return{set:m, expr:g}
        };
        k.filter = function (g, h, l, m) {
            for (var q = g, p = [], v = h, t, y, S = h && h[0] && x(h[0]); g && h.length;) {
                for (var H in n.filter)if ((t = n.leftMatch[H].exec(g)) != null && t[2]) {
                    var M = n.filter[H], I, D;
                    D = t[1];
                    y = false;
                    t.splice(1, 1);
                    if (D.substr(D.length -
                        1) !== "\\") {
                        if (v === p)p = [];
                        if (n.preFilter[H])if (t = n.preFilter[H](t, v, l, p, m, S)) {
                            if (t === true)continue
                        } else y = I = true;
                        if (t)for (var U = 0; (D = v[U]) != null; U++)if (D) {
                            I = M(D, t, U, v);
                            var Ha = m ^ !!I;
                            if (l && I != null)if (Ha)y = true; else v[U] = false; else if (Ha) {
                                p.push(D);
                                y = true
                            }
                        }
                        if (I !== w) {
                            l || (v = p);
                            g = g.replace(n.match[H], "");
                            if (!y)return[];
                            break
                        }
                    }
                }
                if (g === q)if (y == null)k.error(g); else break;
                q = g
            }
            return v
        };
        k.error = function (g) {
            throw"Syntax error, unrecognized expression: " + g;
        };
        var n = k.selectors = {order:["ID", "NAME", "TAG"], match:{ID:/#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
            CLASS:/\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/, NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/, ATTR:/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/, TAG:/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/, CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/, POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/, PSEUDO:/:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/}, leftMatch:{}, attrMap:{"class":"className", "for":"htmlFor"}, attrHandle:{href:function (g) {
            return g.getAttribute("href")
        }},
            relative:{"+":function (g, h) {
                var l = typeof h === "string", m = l && !/\W/.test(h);
                l = l && !m;
                if (m)h = h.toLowerCase();
                m = 0;
                for (var q = g.length, p; m < q; m++)if (p = g[m]) {
                    for (; (p = p.previousSibling) && p.nodeType !== 1;);
                    g[m] = l || p && p.nodeName.toLowerCase() === h ? p || false : p === h
                }
                l && k.filter(h, g, true)
            }, ">":function (g, h) {
                var l = typeof h === "string";
                if (l && !/\W/.test(h)) {
                    h = h.toLowerCase();
                    for (var m = 0, q = g.length; m < q; m++) {
                        var p = g[m];
                        if (p) {
                            l = p.parentNode;
                            g[m] = l.nodeName.toLowerCase() === h ? l : false
                        }
                    }
                } else {
                    m = 0;
                    for (q = g.length; m < q; m++)if (p = g[m])g[m] =
                        l ? p.parentNode : p.parentNode === h;
                    l && k.filter(h, g, true)
                }
            }, "":function (g, h, l) {
                var m = e++, q = d;
                if (typeof h === "string" && !/\W/.test(h)) {
                    var p = h = h.toLowerCase();
                    q = b
                }
                q("parentNode", h, m, g, p, l)
            }, "~":function (g, h, l) {
                var m = e++, q = d;
                if (typeof h === "string" && !/\W/.test(h)) {
                    var p = h = h.toLowerCase();
                    q = b
                }
                q("previousSibling", h, m, g, p, l)
            }}, find:{ID:function (g, h, l) {
                if (typeof h.getElementById !== "undefined" && !l)return(g = h.getElementById(g[1])) ? [g] : []
            }, NAME:function (g, h) {
                if (typeof h.getElementsByName !== "undefined") {
                    var l = [];
                    h = h.getElementsByName(g[1]);
                    for (var m = 0, q = h.length; m < q; m++)h[m].getAttribute("name") === g[1] && l.push(h[m]);
                    return l.length === 0 ? null : l
                }
            }, TAG:function (g, h) {
                return h.getElementsByTagName(g[1])
            }}, preFilter:{CLASS:function (g, h, l, m, q, p) {
                g = " " + g[1].replace(/\\/g, "") + " ";
                if (p)return g;
                p = 0;
                for (var v; (v = h[p]) != null; p++)if (v)if (q ^ (v.className && (" " + v.className + " ").replace(/[\t\n]/g, " ").indexOf(g) >= 0))l || m.push(v); else if (l)h[p] = false;
                return false
            }, ID:function (g) {
                return g[1].replace(/\\/g, "")
            }, TAG:function (g) {
                return g[1].toLowerCase()
            },
                CHILD:function (g) {
                    if (g[1] === "nth") {
                        var h = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(g[2] === "even" && "2n" || g[2] === "odd" && "2n+1" || !/\D/.test(g[2]) && "0n+" + g[2] || g[2]);
                        g[2] = h[1] + (h[2] || 1) - 0;
                        g[3] = h[3] - 0
                    }
                    g[0] = e++;
                    return g
                }, ATTR:function (g, h, l, m, q, p) {
                    h = g[1].replace(/\\/g, "");
                    if (!p && n.attrMap[h])g[1] = n.attrMap[h];
                    if (g[2] === "~=")g[4] = " " + g[4] + " ";
                    return g
                }, PSEUDO:function (g, h, l, m, q) {
                    if (g[1] === "not")if ((f.exec(g[3]) || "").length > 1 || /^\w/.test(g[3]))g[3] = k(g[3], null, null, h); else {
                        g = k.filter(g[3], h, l, true ^ q);
                        l || m.push.apply(m,
                            g);
                        return false
                    } else if (n.match.POS.test(g[0]) || n.match.CHILD.test(g[0]))return true;
                    return g
                }, POS:function (g) {
                    g.unshift(true);
                    return g
                }}, filters:{enabled:function (g) {
                return g.disabled === false && g.type !== "hidden"
            }, disabled:function (g) {
                return g.disabled === true
            }, checked:function (g) {
                return g.checked === true
            }, selected:function (g) {
                return g.selected === true
            }, parent:function (g) {
                return!!g.firstChild
            }, empty:function (g) {
                return!g.firstChild
            }, has:function (g, h, l) {
                return!!k(l[3], g).length
            }, header:function (g) {
                return/h\d/i.test(g.nodeName)
            },
                text:function (g) {
                    return"text" === g.type
                }, radio:function (g) {
                    return"radio" === g.type
                }, checkbox:function (g) {
                    return"checkbox" === g.type
                }, file:function (g) {
                    return"file" === g.type
                }, password:function (g) {
                    return"password" === g.type
                }, submit:function (g) {
                    return"submit" === g.type
                }, image:function (g) {
                    return"image" === g.type
                }, reset:function (g) {
                    return"reset" === g.type
                }, button:function (g) {
                    return"button" === g.type || g.nodeName.toLowerCase() === "button"
                }, input:function (g) {
                    return/input|select|textarea|button/i.test(g.nodeName)
                }},
            setFilters:{first:function (g, h) {
                return h === 0
            }, last:function (g, h, l, m) {
                return h === m.length - 1
            }, even:function (g, h) {
                return h % 2 === 0
            }, odd:function (g, h) {
                return h % 2 === 1
            }, lt:function (g, h, l) {
                return h < l[3] - 0
            }, gt:function (g, h, l) {
                return h > l[3] - 0
            }, nth:function (g, h, l) {
                return l[3] - 0 === h
            }, eq:function (g, h, l) {
                return l[3] - 0 === h
            }}, filter:{PSEUDO:function (g, h, l, m) {
                var q = h[1], p = n.filters[q];
                if (p)return p(g, l, h, m); else if (q === "contains")return(g.textContent || g.innerText || a([g]) || "").indexOf(h[3]) >= 0; else if (q === "not") {
                    h =
                        h[3];
                    l = 0;
                    for (m = h.length; l < m; l++)if (h[l] === g)return false;
                    return true
                } else k.error("Syntax error, unrecognized expression: " + q)
            }, CHILD:function (g, h) {
                var l = h[1], m = g;
                switch (l) {
                    case "only":
                    case "first":
                        for (; m = m.previousSibling;)if (m.nodeType === 1)return false;
                        if (l === "first")return true;
                        m = g;
                    case "last":
                        for (; m = m.nextSibling;)if (m.nodeType === 1)return false;
                        return true;
                    case "nth":
                        l = h[2];
                        var q = h[3];
                        if (l === 1 && q === 0)return true;
                        h = h[0];
                        var p = g.parentNode;
                        if (p && (p.sizcache !== h || !g.nodeIndex)) {
                            var v = 0;
                            for (m = p.firstChild; m; m =
                                m.nextSibling)if (m.nodeType === 1)m.nodeIndex = ++v;
                            p.sizcache = h
                        }
                        g = g.nodeIndex - q;
                        return l === 0 ? g === 0 : g % l === 0 && g / l >= 0
                }
            }, ID:function (g, h) {
                return g.nodeType === 1 && g.getAttribute("id") === h
            }, TAG:function (g, h) {
                return h === "*" && g.nodeType === 1 || g.nodeName.toLowerCase() === h
            }, CLASS:function (g, h) {
                return(" " + (g.className || g.getAttribute("class")) + " ").indexOf(h) > -1
            }, ATTR:function (g, h) {
                var l = h[1];
                g = n.attrHandle[l] ? n.attrHandle[l](g) : g[l] != null ? g[l] : g.getAttribute(l);
                l = g + "";
                var m = h[2];
                h = h[4];
                return g == null ? m === "!=" : m ===
                    "=" ? l === h : m === "*=" ? l.indexOf(h) >= 0 : m === "~=" ? (" " + l + " ").indexOf(h) >= 0 : !h ? l && g !== false : m === "!=" ? l !== h : m === "^=" ? l.indexOf(h) === 0 : m === "$=" ? l.substr(l.length - h.length) === h : m === "|=" ? l === h || l.substr(0, h.length + 1) === h + "-" : false
            }, POS:function (g, h, l, m) {
                var q = n.setFilters[h[2]];
                if (q)return q(g, l, h, m)
            }}}, r = n.match.POS;
        for (var u in n.match) {
            n.match[u] = new RegExp(n.match[u].source + /(?![^\[]*\])(?![^\(]*\))/.source);
            n.leftMatch[u] = new RegExp(/(^(?:.|\r|\n)*?)/.source + n.match[u].source.replace(/\\(\d+)/g, function (g, h) {
                return"\\" + (h - 0 + 1)
            }))
        }
        var z = function (g, h) {
            g = Array.prototype.slice.call(g, 0);
            if (h) {
                h.push.apply(h, g);
                return h
            }
            return g
        };
        try {
            Array.prototype.slice.call(s.documentElement.childNodes, 0)
        } catch (C) {
            z = function (g, h) {
                h = h || [];
                if (j.call(g) === "[object Array]")Array.prototype.push.apply(h, g); else if (typeof g.length === "number")for (var l = 0, m = g.length; l < m; l++)h.push(g[l]); else for (l = 0; g[l]; l++)h.push(g[l]);
                return h
            }
        }
        var B;
        if (s.documentElement.compareDocumentPosition)B = function (g, h) {
            if (!g.compareDocumentPosition ||
                !h.compareDocumentPosition) {
                if (g == h)i = true;
                return g.compareDocumentPosition ? -1 : 1
            }
            g = g.compareDocumentPosition(h) & 4 ? -1 : g === h ? 0 : 1;
            if (g === 0)i = true;
            return g
        }; else if ("sourceIndex"in s.documentElement)B = function (g, h) {
            if (!g.sourceIndex || !h.sourceIndex) {
                if (g == h)i = true;
                return g.sourceIndex ? -1 : 1
            }
            g = g.sourceIndex - h.sourceIndex;
            if (g === 0)i = true;
            return g
        }; else if (s.createRange)B = function (g, h) {
            if (!g.ownerDocument || !h.ownerDocument) {
                if (g == h)i = true;
                return g.ownerDocument ? -1 : 1
            }
            var l = g.ownerDocument.createRange(), m =
                h.ownerDocument.createRange();
            l.setStart(g, 0);
            l.setEnd(g, 0);
            m.setStart(h, 0);
            m.setEnd(h, 0);
            g = l.compareBoundaryPoints(Range.START_TO_END, m);
            if (g === 0)i = true;
            return g
        };
        (function () {
            var g = s.createElement("div"), h = "script" + (new Date).getTime();
            g.innerHTML = "<a name='" + h + "'/>";
            var l = s.documentElement;
            l.insertBefore(g, l.firstChild);
            if (s.getElementById(h)) {
                n.find.ID = function (m, q, p) {
                    if (typeof q.getElementById !== "undefined" && !p)return(q = q.getElementById(m[1])) ? q.id === m[1] || typeof q.getAttributeNode !== "undefined" &&
                        q.getAttributeNode("id").nodeValue === m[1] ? [q] : w : []
                };
                n.filter.ID = function (m, q) {
                    var p = typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id");
                    return m.nodeType === 1 && p && p.nodeValue === q
                }
            }
            l.removeChild(g);
            l = g = null
        })();
        (function () {
            var g = s.createElement("div");
            g.appendChild(s.createComment(""));
            if (g.getElementsByTagName("*").length > 0)n.find.TAG = function (h, l) {
                l = l.getElementsByTagName(h[1]);
                if (h[1] === "*") {
                    h = [];
                    for (var m = 0; l[m]; m++)l[m].nodeType === 1 && h.push(l[m]);
                    l = h
                }
                return l
            };
            g.innerHTML = "<a href='#'></a>";
            if (g.firstChild && typeof g.firstChild.getAttribute !== "undefined" && g.firstChild.getAttribute("href") !== "#")n.attrHandle.href = function (h) {
                return h.getAttribute("href", 2)
            };
            g = null
        })();
        s.querySelectorAll && function () {
            var g = k, h = s.createElement("div");
            h.innerHTML = "<p class='TEST'></p>";
            if (!(h.querySelectorAll && h.querySelectorAll(".TEST").length === 0)) {
                k = function (m, q, p, v) {
                    q = q || s;
                    if (!v && q.nodeType === 9 && !x(q))try {
                        return z(q.querySelectorAll(m), p)
                    } catch (t) {
                    }
                    return g(m, q, p, v)
                };
                for (var l in g)k[l] = g[l];
                h = null
            }
        }();
        (function () {
            var g = s.createElement("div");
            g.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!(!g.getElementsByClassName || g.getElementsByClassName("e").length === 0)) {
                g.lastChild.className = "e";
                if (g.getElementsByClassName("e").length !== 1) {
                    n.order.splice(1, 0, "CLASS");
                    n.find.CLASS = function (h, l, m) {
                        if (typeof l.getElementsByClassName !== "undefined" && !m)return l.getElementsByClassName(h[1])
                    };
                    g = null
                }
            }
        })();
        var E = s.compareDocumentPosition ? function (g, h) {
            return!!(g.compareDocumentPosition(h) & 16)
        } :
            function (g, h) {
                return g !== h && (g.contains ? g.contains(h) : true)
            }, x = function (g) {
            return(g = (g ? g.ownerDocument || g : 0).documentElement) ? g.nodeName !== "HTML" : false
        }, ga = function (g, h) {
            var l = [], m = "", q;
            for (h = h.nodeType ? [h] : h; q = n.match.PSEUDO.exec(g);) {
                m += q[0];
                g = g.replace(n.match.PSEUDO, "")
            }
            g = n.relative[g] ? g + "*" : g;
            q = 0;
            for (var p = h.length; q < p; q++)k(g, h[q], l);
            return k.filter(m, l)
        };
        c.find = k;
        c.expr = k.selectors;
        c.expr[":"] = c.expr.filters;
        c.unique = k.uniqueSort;
        c.text = a;
        c.isXMLDoc = x;
        c.contains = E
    })();
    var eb = /Until$/, fb = /^(?:parents|prevUntil|prevAll)/,
        gb = /,/;
    R = Array.prototype.slice;
    var Ia = function (a, b, d) {
        if (c.isFunction(b))return c.grep(a, function (e, j) {
            return!!b.call(e, j, e) === d
        }); else if (b.nodeType)return c.grep(a, function (e) {
            return e === b === d
        }); else if (typeof b === "string") {
            var f = c.grep(a, function (e) {
                return e.nodeType === 1
            });
            if (Ua.test(b))return c.filter(b, f, !d); else b = c.filter(b, f)
        }
        return c.grep(a, function (e) {
            return c.inArray(e, b) >= 0 === d
        })
    };
    c.fn.extend({find:function (a) {
        for (var b = this.pushStack("", "find", a), d = 0, f = 0, e = this.length; f < e; f++) {
            d = b.length;
            c.find(a, this[f], b);
            if (f > 0)for (var j = d; j < b.length; j++)for (var i = 0; i < d; i++)if (b[i] === b[j]) {
                b.splice(j--, 1);
                break
            }
        }
        return b
    }, has:function (a) {
        var b = c(a);
        return this.filter(function () {
            for (var d = 0, f = b.length; d < f; d++)if (c.contains(this, b[d]))return true
        })
    }, not:function (a) {
        return this.pushStack(Ia(this, a, false), "not", a)
    }, filter:function (a) {
        return this.pushStack(Ia(this, a, true), "filter", a)
    }, is:function (a) {
        return!!a && c.filter(a, this).length > 0
    }, closest:function (a, b) {
        if (c.isArray(a)) {
            var d = [], f = this[0], e, j =
            {}, i;
            if (f && a.length) {
                e = 0;
                for (var o = a.length; e < o; e++) {
                    i = a[e];
                    j[i] || (j[i] = c.expr.match.POS.test(i) ? c(i, b || this.context) : i)
                }
                for (; f && f.ownerDocument && f !== b;) {
                    for (i in j) {
                        e = j[i];
                        if (e.jquery ? e.index(f) > -1 : c(f).is(e)) {
                            d.push({selector:i, elem:f});
                            delete j[i]
                        }
                    }
                    f = f.parentNode
                }
            }
            return d
        }
        var k = c.expr.match.POS.test(a) ? c(a, b || this.context) : null;
        return this.map(function (n, r) {
            for (; r && r.ownerDocument && r !== b;) {
                if (k ? k.index(r) > -1 : c(r).is(a))return r;
                r = r.parentNode
            }
            return null
        })
    }, index:function (a) {
        if (!a || typeof a ===
            "string")return c.inArray(this[0], a ? c(a) : this.parent().children());
        return c.inArray(a.jquery ? a[0] : a, this)
    }, add:function (a, b) {
        a = typeof a === "string" ? c(a, b || this.context) : c.makeArray(a);
        b = c.merge(this.get(), a);
        return this.pushStack(qa(a[0]) || qa(b[0]) ? b : c.unique(b))
    }, andSelf:function () {
        return this.add(this.prevObject)
    }});
    c.each({parent:function (a) {
        return(a = a.parentNode) && a.nodeType !== 11 ? a : null
    }, parents:function (a) {
        return c.dir(a, "parentNode")
    }, parentsUntil:function (a, b, d) {
        return c.dir(a, "parentNode",
            d)
    }, next:function (a) {
        return c.nth(a, 2, "nextSibling")
    }, prev:function (a) {
        return c.nth(a, 2, "previousSibling")
    }, nextAll:function (a) {
        return c.dir(a, "nextSibling")
    }, prevAll:function (a) {
        return c.dir(a, "previousSibling")
    }, nextUntil:function (a, b, d) {
        return c.dir(a, "nextSibling", d)
    }, prevUntil:function (a, b, d) {
        return c.dir(a, "previousSibling", d)
    }, siblings:function (a) {
        return c.sibling(a.parentNode.firstChild, a)
    }, children:function (a) {
        return c.sibling(a.firstChild)
    }, contents:function (a) {
        return c.nodeName(a, "iframe") ?
            a.contentDocument || a.contentWindow.document : c.makeArray(a.childNodes)
    }}, function (a, b) {
        c.fn[a] = function (d, f) {
            var e = c.map(this, b, d);
            eb.test(a) || (f = d);
            if (f && typeof f === "string")e = c.filter(f, e);
            e = this.length > 1 ? c.unique(e) : e;
            if ((this.length > 1 || gb.test(f)) && fb.test(a))e = e.reverse();
            return this.pushStack(e, a, R.call(arguments).join(","))
        }
    });
    c.extend({filter:function (a, b, d) {
        if (d)a = ":not(" + a + ")";
        return c.find.matches(a, b)
    }, dir:function (a, b, d) {
        var f = [];
        for (a = a[b]; a && a.nodeType !== 9 && (d === w || a.nodeType !== 1 || !c(a).is(d));) {
            a.nodeType ===
                1 && f.push(a);
            a = a[b]
        }
        return f
    }, nth:function (a, b, d) {
        b = b || 1;
        for (var f = 0; a; a = a[d])if (a.nodeType === 1 && ++f === b)break;
        return a
    }, sibling:function (a, b) {
        for (var d = []; a; a = a.nextSibling)a.nodeType === 1 && a !== b && d.push(a);
        return d
    }});
    var Ja = / jQuery\d+="(?:\d+|null)"/g, V = /^\s+/, Ka = /(<([\w:]+)[^>]*?)\/>/g, hb = /^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i, La = /<([\w:]+)/, ib = /<tbody/i, jb = /<|&#?\w+;/, ta = /<script|<object|<embed|<option|<style/i, ua = /checked\s*(?:[^=]|=\s*.checked.)/i, Ma = function (a, b, d) {
        return hb.test(d) ?
            a : b + "></" + d + ">"
    }, F = {option:[1, "<select multiple='multiple'>", "</select>"], legend:[1, "<fieldset>", "</fieldset>"], thead:[1, "<table>", "</table>"], tr:[2, "<table><tbody>", "</tbody></table>"], td:[3, "<table><tbody><tr>", "</tr></tbody></table>"], col:[2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], area:[1, "<map>", "</map>"], _default:[0, "", ""]};
    F.optgroup = F.option;
    F.tbody = F.tfoot = F.colgroup = F.caption = F.thead;
    F.th = F.td;
    if (!c.support.htmlSerialize)F._default = [1, "div<div>", "</div>"];
    c.fn.extend({text:function (a) {
        if (c.isFunction(a))return this.each(function (b) {
            var d =
                c(this);
            d.text(a.call(this, b, d.text()))
        });
        if (typeof a !== "object" && a !== w)return this.empty().append((this[0] && this[0].ownerDocument || s).createTextNode(a));
        return c.text(this)
    }, wrapAll:function (a) {
        if (c.isFunction(a))return this.each(function (d) {
            c(this).wrapAll(a.call(this, d))
        });
        if (this[0]) {
            var b = c(a, this[0].ownerDocument).eq(0).clone(true);
            this[0].parentNode && b.insertBefore(this[0]);
            b.map(function () {
                for (var d = this; d.firstChild && d.firstChild.nodeType === 1;)d = d.firstChild;
                return d
            }).append(this)
        }
        return this
    },
        wrapInner:function (a) {
            if (c.isFunction(a))return this.each(function (b) {
                c(this).wrapInner(a.call(this, b))
            });
            return this.each(function () {
                var b = c(this), d = b.contents();
                d.length ? d.wrapAll(a) : b.append(a)
            })
        }, wrap:function (a) {
            return this.each(function () {
                c(this).wrapAll(a)
            })
        }, unwrap:function () {
            return this.parent().each(function () {
                c.nodeName(this, "body") || c(this).replaceWith(this.childNodes)
            }).end()
        }, append:function () {
            return this.domManip(arguments, true, function (a) {
                this.nodeType === 1 && this.appendChild(a)
            })
        },
        prepend:function () {
            return this.domManip(arguments, true, function (a) {
                this.nodeType === 1 && this.insertBefore(a, this.firstChild)
            })
        }, before:function () {
            if (this[0] && this[0].parentNode)return this.domManip(arguments, false, function (b) {
                this.parentNode.insertBefore(b, this)
            }); else if (arguments.length) {
                var a = c(arguments[0]);
                a.push.apply(a, this.toArray());
                return this.pushStack(a, "before", arguments)
            }
        }, after:function () {
            if (this[0] && this[0].parentNode)return this.domManip(arguments, false, function (b) {
                this.parentNode.insertBefore(b,
                    this.nextSibling)
            }); else if (arguments.length) {
                var a = this.pushStack(this, "after", arguments);
                a.push.apply(a, c(arguments[0]).toArray());
                return a
            }
        }, remove:function (a, b) {
            for (var d = 0, f; (f = this[d]) != null; d++)if (!a || c.filter(a, [f]).length) {
                if (!b && f.nodeType === 1) {
                    c.cleanData(f.getElementsByTagName("*"));
                    c.cleanData([f])
                }
                f.parentNode && f.parentNode.removeChild(f)
            }
            return this
        }, empty:function () {
            for (var a = 0, b; (b = this[a]) != null; a++)for (b.nodeType === 1 && c.cleanData(b.getElementsByTagName("*")); b.firstChild;)b.removeChild(b.firstChild);
            return this
        }, clone:function (a) {
            var b = this.map(function () {
                if (!c.support.noCloneEvent && !c.isXMLDoc(this)) {
                    var d = this.outerHTML, f = this.ownerDocument;
                    if (!d) {
                        d = f.createElement("div");
                        d.appendChild(this.cloneNode(true));
                        d = d.innerHTML
                    }
                    return c.clean([d.replace(Ja, "").replace(/=([^="'>\s]+\/)>/g, '="$1">').replace(V, "")], f)[0]
                } else return this.cloneNode(true)
            });
            if (a === true) {
                ra(this, b);
                ra(this.find("*"), b.find("*"))
            }
            return b
        }, html:function (a) {
            if (a === w)return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(Ja,
                "") : null; else if (typeof a === "string" && !ta.test(a) && (c.support.leadingWhitespace || !V.test(a)) && !F[(La.exec(a) || ["", ""])[1].toLowerCase()]) {
                a = a.replace(Ka, Ma);
                try {
                    for (var b = 0, d = this.length; b < d; b++)if (this[b].nodeType === 1) {
                        c.cleanData(this[b].getElementsByTagName("*"));
                        this[b].innerHTML = a
                    }
                } catch (f) {
                    this.empty().append(a)
                }
            } else c.isFunction(a) ? this.each(function (e) {
                var j = c(this), i = j.html();
                j.empty().append(function () {
                    return a.call(this, e, i)
                })
            }) : this.empty().append(a);
            return this
        }, replaceWith:function (a) {
            if (this[0] &&
                this[0].parentNode) {
                if (c.isFunction(a))return this.each(function (b) {
                    var d = c(this), f = d.html();
                    d.replaceWith(a.call(this, b, f))
                });
                if (typeof a !== "string")a = c(a).detach();
                return this.each(function () {
                    var b = this.nextSibling, d = this.parentNode;
                    c(this).remove();
                    b ? c(b).before(a) : c(d).append(a)
                })
            } else return this.pushStack(c(c.isFunction(a) ? a() : a), "replaceWith", a)
        }, detach:function (a) {
            return this.remove(a, true)
        }, domManip:function (a, b, d) {
            function f(u) {
                return c.nodeName(u, "table") ? u.getElementsByTagName("tbody")[0] ||
                    u.appendChild(u.ownerDocument.createElement("tbody")) : u
            }

            var e, j, i = a[0], o = [], k;
            if (!c.support.checkClone && arguments.length === 3 && typeof i === "string" && ua.test(i))return this.each(function () {
                c(this).domManip(a, b, d, true)
            });
            if (c.isFunction(i))return this.each(function (u) {
                var z = c(this);
                a[0] = i.call(this, u, b ? z.html() : w);
                z.domManip(a, b, d)
            });
            if (this[0]) {
                e = i && i.parentNode;
                e = c.support.parentNode && e && e.nodeType === 11 && e.childNodes.length === this.length ? {fragment:e} : sa(a, this, o);
                k = e.fragment;
                if (j = k.childNodes.length ===
                    1 ? (k = k.firstChild) : k.firstChild) {
                    b = b && c.nodeName(j, "tr");
                    for (var n = 0, r = this.length; n < r; n++)d.call(b ? f(this[n], j) : this[n], n > 0 || e.cacheable || this.length > 1 ? k.cloneNode(true) : k)
                }
                o.length && c.each(o, Qa)
            }
            return this
        }});
    c.fragments = {};
    c.each({appendTo:"append", prependTo:"prepend", insertBefore:"before", insertAfter:"after", replaceAll:"replaceWith"}, function (a, b) {
        c.fn[a] = function (d) {
            var f = [];
            d = c(d);
            var e = this.length === 1 && this[0].parentNode;
            if (e && e.nodeType === 11 && e.childNodes.length === 1 && d.length === 1) {
                d[b](this[0]);
                return this
            } else {
                e = 0;
                for (var j = d.length; e < j; e++) {
                    var i = (e > 0 ? this.clone(true) : this).get();
                    c.fn[b].apply(c(d[e]), i);
                    f = f.concat(i)
                }
                return this.pushStack(f, a, d.selector)
            }
        }
    });
    c.extend({clean:function (a, b, d, f) {
        b = b || s;
        if (typeof b.createElement === "undefined")b = b.ownerDocument || b[0] && b[0].ownerDocument || s;
        for (var e = [], j = 0, i; (i = a[j]) != null; j++) {
            if (typeof i === "number")i += "";
            if (i) {
                if (typeof i === "string" && !jb.test(i))i = b.createTextNode(i); else if (typeof i === "string") {
                    i = i.replace(Ka, Ma);
                    var o = (La.exec(i) || ["",
                        ""])[1].toLowerCase(), k = F[o] || F._default, n = k[0], r = b.createElement("div");
                    for (r.innerHTML = k[1] + i + k[2]; n--;)r = r.lastChild;
                    if (!c.support.tbody) {
                        n = ib.test(i);
                        o = o === "table" && !n ? r.firstChild && r.firstChild.childNodes : k[1] === "<table>" && !n ? r.childNodes : [];
                        for (k = o.length - 1; k >= 0; --k)c.nodeName(o[k], "tbody") && !o[k].childNodes.length && o[k].parentNode.removeChild(o[k])
                    }
                    !c.support.leadingWhitespace && V.test(i) && r.insertBefore(b.createTextNode(V.exec(i)[0]), r.firstChild);
                    i = r.childNodes
                }
                if (i.nodeType)e.push(i); else e =
                    c.merge(e, i)
            }
        }
        if (d)for (j = 0; e[j]; j++)if (f && c.nodeName(e[j], "script") && (!e[j].type || e[j].type.toLowerCase() === "text/javascript"))f.push(e[j].parentNode ? e[j].parentNode.removeChild(e[j]) : e[j]); else {
            e[j].nodeType === 1 && e.splice.apply(e, [j + 1, 0].concat(c.makeArray(e[j].getElementsByTagName("script"))));
            d.appendChild(e[j])
        }
        return e
    }, cleanData:function (a) {
        for (var b, d, f = c.cache, e = c.event.special, j = c.support.deleteExpando, i = 0, o; (o = a[i]) != null; i++)if (d = o[c.expando]) {
            b = f[d];
            if (b.events)for (var k in b.events)e[k] ?
                c.event.remove(o, k) : Ca(o, k, b.handle);
            if (j)delete o[c.expando]; else o.removeAttribute && o.removeAttribute(c.expando);
            delete f[d]
        }
    }});
    var kb = /z-?index|font-?weight|opacity|zoom|line-?height/i, Na = /alpha\([^)]*\)/, Oa = /opacity=([^)]*)/, ha = /float/i, ia = /-([a-z])/ig, lb = /([A-Z])/g, mb = /^-?\d+(?:px)?$/i, nb = /^-?\d/, ob = {position:"absolute", visibility:"hidden", display:"block"}, pb = ["Left", "Right"], qb = ["Top", "Bottom"], rb = s.defaultView && s.defaultView.getComputedStyle, Pa = c.support.cssFloat ? "cssFloat" : "styleFloat", ja =
        function (a, b) {
            return b.toUpperCase()
        };
    c.fn.css = function (a, b) {
        return X(this, a, b, true, function (d, f, e) {
            if (e === w)return c.curCSS(d, f);
            if (typeof e === "number" && !kb.test(f))e += "px";
            c.style(d, f, e)
        })
    };
    c.extend({style:function (a, b, d) {
        if (!a || a.nodeType === 3 || a.nodeType === 8)return w;
        if ((b === "width" || b === "height") && parseFloat(d) < 0)d = w;
        var f = a.style || a, e = d !== w;
        if (!c.support.opacity && b === "opacity") {
            if (e) {
                f.zoom = 1;
                b = parseInt(d, 10) + "" === "NaN" ? "" : "alpha(opacity=" + d * 100 + ")";
                a = f.filter || c.curCSS(a, "filter") || "";
                f.filter =
                    Na.test(a) ? a.replace(Na, b) : b
            }
            return f.filter && f.filter.indexOf("opacity=") >= 0 ? parseFloat(Oa.exec(f.filter)[1]) / 100 + "" : ""
        }
        if (ha.test(b))b = Pa;
        b = b.replace(ia, ja);
        if (e)f[b] = d;
        return f[b]
    }, css:function (a, b, d, f) {
        if (b === "width" || b === "height") {
            var e, j = b === "width" ? pb : qb;

            function i() {
                e = b === "width" ? a.offsetWidth : a.offsetHeight;
                f !== "border" && c.each(j, function () {
                    f || (e -= parseFloat(c.curCSS(a, "padding" + this, true)) || 0);
                    if (f === "margin")e += parseFloat(c.curCSS(a, "margin" + this, true)) || 0; else e -= parseFloat(c.curCSS(a,
                        "border" + this + "Width", true)) || 0
                })
            }

            a.offsetWidth !== 0 ? i() : c.swap(a, ob, i);
            return Math.max(0, Math.round(e))
        }
        return c.curCSS(a, b, d)
    }, curCSS:function (a, b, d) {
        var f, e = a.style;
        if (!c.support.opacity && b === "opacity" && a.currentStyle) {
            f = Oa.test(a.currentStyle.filter || "") ? parseFloat(RegExp.$1) / 100 + "" : "";
            return f === "" ? "1" : f
        }
        if (ha.test(b))b = Pa;
        if (!d && e && e[b])f = e[b]; else if (rb) {
            if (ha.test(b))b = "float";
            b = b.replace(lb, "-$1").toLowerCase();
            e = a.ownerDocument.defaultView;
            if (!e)return null;
            if (a = e.getComputedStyle(a, null))f =
                a.getPropertyValue(b);
            if (b === "opacity" && f === "")f = "1"
        } else if (a.currentStyle) {
            d = b.replace(ia, ja);
            f = a.currentStyle[b] || a.currentStyle[d];
            if (!mb.test(f) && nb.test(f)) {
                b = e.left;
                var j = a.runtimeStyle.left;
                a.runtimeStyle.left = a.currentStyle.left;
                e.left = d === "fontSize" ? "1em" : f || 0;
                f = e.pixelLeft + "px";
                e.left = b;
                a.runtimeStyle.left = j
            }
        }
        return f
    }, swap:function (a, b, d) {
        var f = {};
        for (var e in b) {
            f[e] = a.style[e];
            a.style[e] = b[e]
        }
        d.call(a);
        for (e in b)a.style[e] = f[e]
    }});
    if (c.expr && c.expr.filters) {
        c.expr.filters.hidden = function (a) {
            var b =
                a.offsetWidth, d = a.offsetHeight, f = a.nodeName.toLowerCase() === "tr";
            return b === 0 && d === 0 && !f ? true : b > 0 && d > 0 && !f ? false : c.curCSS(a, "display") === "none"
        };
        c.expr.filters.visible = function (a) {
            return!c.expr.filters.hidden(a)
        }
    }
    var sb = J(), tb = /<script(.|\s)*?\/script>/gi, ub = /select|textarea/i, vb = /color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i, N = /=\?(&|$)/, ka = /\?/, wb = /(\?|&)_=.*?(&|$)/, xb = /^(\w+:)?\/\/([^\/?#]+)/, yb = /%20/g, zb = c.fn.load;
    c.fn.extend({load:function (a, b, d) {
        if (typeof a !==
            "string")return zb.call(this, a); else if (!this.length)return this;
        var f = a.indexOf(" ");
        if (f >= 0) {
            var e = a.slice(f, a.length);
            a = a.slice(0, f)
        }
        f = "GET";
        if (b)if (c.isFunction(b)) {
            d = b;
            b = null
        } else if (typeof b === "object") {
            b = c.param(b, c.ajaxSettings.traditional);
            f = "POST"
        }
        var j = this;
        c.ajax({url:a, type:f, dataType:"html", data:b, complete:function (i, o) {
            if (o === "success" || o === "notmodified")j.html(e ? c("<div />").append(i.responseText.replace(tb, "")).find(e) : i.responseText);
            d && j.each(d, [i.responseText, o, i])
        }});
        return this
    },
        serialize:function () {
            return c.param(this.serializeArray())
        }, serializeArray:function () {
            return this.map(function () {
                return this.elements ? c.makeArray(this.elements) : this
            }).filter(function () {
                return this.name && !this.disabled && (this.checked || ub.test(this.nodeName) || vb.test(this.type))
            }).map(function (a, b) {
                a = c(this).val();
                return a == null ? null : c.isArray(a) ? c.map(a, function (d) {
                    return{name:b.name, value:d}
                }) : {name:b.name, value:a}
            }).get()
        }});
    c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),
        function (a, b) {
            c.fn[b] = function (d) {
                return this.bind(b, d)
            }
        });
    c.extend({get:function (a, b, d, f) {
        if (c.isFunction(b)) {
            f = f || d;
            d = b;
            b = null
        }
        return c.ajax({type:"GET", url:a, data:b, success:d, dataType:f})
    }, getScript:function (a, b) {
        return c.get(a, null, b, "script")
    }, getJSON:function (a, b, d) {
        return c.get(a, b, d, "json")
    }, post:function (a, b, d, f) {
        if (c.isFunction(b)) {
            f = f || d;
            d = b;
            b = {}
        }
        return c.ajax({type:"POST", url:a, data:b, success:d, dataType:f})
    }, ajaxSetup:function (a) {
        c.extend(c.ajaxSettings, a)
    }, ajaxSettings:{url:location.href,
        global:true, type:"GET", contentType:"application/x-www-form-urlencoded", processData:true, async:true, xhr:A.XMLHttpRequest && (A.location.protocol !== "file:" || !A.ActiveXObject) ? function () {
            return new A.XMLHttpRequest
        } : function () {
            try {
                return new A.ActiveXObject("Microsoft.XMLHTTP")
            } catch (a) {
            }
        }, accepts:{xml:"application/xml, text/xml", html:"text/html", script:"text/javascript, application/javascript", json:"application/json, text/javascript", text:"text/plain", _default:"*/*"}}, lastModified:{}, etag:{}, ajax:function (a) {
        function b() {
            e.success &&
            e.success.call(k, o, i, x);
            e.global && f("ajaxSuccess", [x, e])
        }

        function d() {
            e.complete && e.complete.call(k, x, i);
            e.global && f("ajaxComplete", [x, e]);
            e.global && !--c.active && c.event.trigger("ajaxStop")
        }

        function f(q, p) {
            (e.context ? c(e.context) : c.event).trigger(q, p)
        }

        var e = c.extend(true, {}, c.ajaxSettings, a), j, i, o, k = a && a.context || e, n = e.type.toUpperCase();
        if (e.data && e.processData && typeof e.data !== "string")e.data = c.param(e.data, e.traditional);
        if (e.dataType === "jsonp") {
            if (n === "GET")N.test(e.url) || (e.url += (ka.test(e.url) ?
                "&" : "?") + (e.jsonp || "callback") + "=?"); else if (!e.data || !N.test(e.data))e.data = (e.data ? e.data + "&" : "") + (e.jsonp || "callback") + "=?";
            e.dataType = "json"
        }
        if (e.dataType === "json" && (e.data && N.test(e.data) || N.test(e.url))) {
            j = e.jsonpCallback || "jsonp" + sb++;
            if (e.data)e.data = (e.data + "").replace(N, "=" + j + "$1");
            e.url = e.url.replace(N, "=" + j + "$1");
            e.dataType = "script";
            A[j] = A[j] || function (q) {
                o = q;
                b();
                d();
                A[j] = w;
                try {
                    delete A[j]
                } catch (p) {
                }
                z && z.removeChild(C)
            }
        }
        if (e.dataType === "script" && e.cache === null)e.cache = false;
        if (e.cache ===
            false && n === "GET") {
            var r = J(), u = e.url.replace(wb, "$1_=" + r + "$2");
            e.url = u + (u === e.url ? (ka.test(e.url) ? "&" : "?") + "_=" + r : "")
        }
        if (e.data && n === "GET")e.url += (ka.test(e.url) ? "&" : "?") + e.data;
        e.global && !c.active++ && c.event.trigger("ajaxStart");
        r = (r = xb.exec(e.url)) && (r[1] && r[1] !== location.protocol || r[2] !== location.host);
        if (e.dataType === "script" && n === "GET" && r) {
            var z = s.getElementsByTagName("head")[0] || s.documentElement, C = s.createElement("script");
            C.src = e.url;
            if (e.scriptCharset)C.charset = e.scriptCharset;
            if (!j) {
                var B =
                    false;
                C.onload = C.onreadystatechange = function () {
                    if (!B && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                        B = true;
                        b();
                        d();
                        C.onload = C.onreadystatechange = null;
                        z && C.parentNode && z.removeChild(C)
                    }
                }
            }
            z.insertBefore(C, z.firstChild);
            return w
        }
        var E = false, x = e.xhr();
        if (x) {
            e.username ? x.open(n, e.url, e.async, e.username, e.password) : x.open(n, e.url, e.async);
            try {
                if (e.data || a && a.contentType)x.setRequestHeader("Content-Type", e.contentType);
                if (e.ifModified) {
                    c.lastModified[e.url] && x.setRequestHeader("If-Modified-Since",
                        c.lastModified[e.url]);
                    c.etag[e.url] && x.setRequestHeader("If-None-Match", c.etag[e.url])
                }
                r || x.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                x.setRequestHeader("Accept", e.dataType && e.accepts[e.dataType] ? e.accepts[e.dataType] + ", */*" : e.accepts._default)
            } catch (ga) {
            }
            if (e.beforeSend && e.beforeSend.call(k, x, e) === false) {
                e.global && !--c.active && c.event.trigger("ajaxStop");
                x.abort();
                return false
            }
            e.global && f("ajaxSend", [x, e]);
            var g = x.onreadystatechange = function (q) {
                if (!x || x.readyState === 0 || q === "abort") {
                    E ||
                    d();
                    E = true;
                    if (x)x.onreadystatechange = c.noop
                } else if (!E && x && (x.readyState === 4 || q === "timeout")) {
                    E = true;
                    x.onreadystatechange = c.noop;
                    i = q === "timeout" ? "timeout" : !c.httpSuccess(x) ? "error" : e.ifModified && c.httpNotModified(x, e.url) ? "notmodified" : "success";
                    var p;
                    if (i === "success")try {
                        o = c.httpData(x, e.dataType, e)
                    } catch (v) {
                        i = "parsererror";
                        p = v
                    }
                    if (i === "success" || i === "notmodified")j || b(); else c.handleError(e, x, i, p);
                    d();
                    q === "timeout" && x.abort();
                    if (e.async)x = null
                }
            };
            try {
                var h = x.abort;
                x.abort = function () {
                    x && h.call(x);
                    g("abort")
                }
            } catch (l) {
            }
            e.async && e.timeout > 0 && setTimeout(function () {
                x && !E && g("timeout")
            }, e.timeout);
            try {
                x.send(n === "POST" || n === "PUT" || n === "DELETE" ? e.data : null)
            } catch (m) {
                c.handleError(e, x, null, m);
                d()
            }
            e.async || g();
            return x
        }
    }, handleError:function (a, b, d, f) {
        if (a.error)a.error.call(a.context || a, b, d, f);
        if (a.global)(a.context ? c(a.context) : c.event).trigger("ajaxError", [b, a, f])
    }, active:0, httpSuccess:function (a) {
        try {
            return!a.status && location.protocol === "file:" || a.status >= 200 && a.status < 300 || a.status === 304 || a.status ===
                1223 || a.status === 0
        } catch (b) {
        }
        return false
    }, httpNotModified:function (a, b) {
        var d = a.getResponseHeader("Last-Modified"), f = a.getResponseHeader("Etag");
        if (d)c.lastModified[b] = d;
        if (f)c.etag[b] = f;
        return a.status === 304 || a.status === 0
    }, httpData:function (a, b, d) {
        var f = a.getResponseHeader("content-type") || "", e = b === "xml" || !b && f.indexOf("xml") >= 0;
        a = e ? a.responseXML : a.responseText;
        e && a.documentElement.nodeName === "parsererror" && c.error("parsererror");
        if (d && d.dataFilter)a = d.dataFilter(a, b);
        if (typeof a === "string")if (b ===
            "json" || !b && f.indexOf("json") >= 0)a = c.parseJSON(a); else if (b === "script" || !b && f.indexOf("javascript") >= 0)c.globalEval(a);
        return a
    }, param:function (a, b) {
        function d(i, o) {
            if (c.isArray(o))c.each(o, function (k, n) {
                b || /\[\]$/.test(i) ? f(i, n) : d(i + "[" + (typeof n === "object" || c.isArray(n) ? k : "") + "]", n)
            }); else!b && o != null && typeof o === "object" ? c.each(o, function (k, n) {
                d(i + "[" + k + "]", n)
            }) : f(i, o)
        }

        function f(i, o) {
            o = c.isFunction(o) ? o() : o;
            e[e.length] = encodeURIComponent(i) + "=" + encodeURIComponent(o)
        }

        var e = [];
        if (b === w)b = c.ajaxSettings.traditional;
        if (c.isArray(a) || a.jquery)c.each(a, function () {
            f(this.name, this.value)
        }); else for (var j in a)d(j, a[j]);
        return e.join("&").replace(yb, "+")
    }});
    var la = {}, Ab = /toggle|show|hide/, Bb = /^([+-]=)?([\d+-.]+)(.*)$/, W, va = [
        ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
        ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
        ["opacity"]
    ];
    c.fn.extend({show:function (a, b) {
        if (a || a === 0)return this.animate(K("show", 3), a, b); else {
            a = 0;
            for (b = this.length; a < b; a++) {
                var d = c.data(this[a], "olddisplay");
                this[a].style.display = d || "";
                if (c.css(this[a], "display") === "none") {
                    d = this[a].nodeName;
                    var f;
                    if (la[d])f = la[d]; else {
                        var e = c("<" + d + " />").appendTo("body");
                        f = e.css("display");
                        if (f === "none")f = "block";
                        e.remove();
                        la[d] = f
                    }
                    c.data(this[a], "olddisplay", f)
                }
            }
            a = 0;
            for (b = this.length; a < b; a++)this[a].style.display = c.data(this[a], "olddisplay") || "";
            return this
        }
    }, hide:function (a, b) {
        if (a || a === 0)return this.animate(K("hide", 3), a, b); else {
            a = 0;
            for (b = this.length; a < b; a++) {
                var d = c.data(this[a], "olddisplay");
                !d && d !== "none" && c.data(this[a],
                    "olddisplay", c.css(this[a], "display"))
            }
            a = 0;
            for (b = this.length; a < b; a++)this[a].style.display = "none";
            return this
        }
    }, _toggle:c.fn.toggle, toggle:function (a, b) {
        var d = typeof a === "boolean";
        if (c.isFunction(a) && c.isFunction(b))this._toggle.apply(this, arguments); else a == null || d ? this.each(function () {
            var f = d ? a : c(this).is(":hidden");
            c(this)[f ? "show" : "hide"]()
        }) : this.animate(K("toggle", 3), a, b);
        return this
    }, fadeTo:function (a, b, d) {
        return this.filter(":hidden").css("opacity", 0).show().end().animate({opacity:b}, a, d)
    },
        animate:function (a, b, d, f) {
            var e = c.speed(b, d, f);
            if (c.isEmptyObject(a))return this.each(e.complete);
            return this[e.queue === false ? "each" : "queue"](function () {
                var j = c.extend({}, e), i, o = this.nodeType === 1 && c(this).is(":hidden"), k = this;
                for (i in a) {
                    var n = i.replace(ia, ja);
                    if (i !== n) {
                        a[n] = a[i];
                        delete a[i];
                        i = n
                    }
                    if (a[i] === "hide" && o || a[i] === "show" && !o)return j.complete.call(this);
                    if ((i === "height" || i === "width") && this.style) {
                        j.display = c.css(this, "display");
                        j.overflow = this.style.overflow
                    }
                    if (c.isArray(a[i])) {
                        (j.specialEasing =
                            j.specialEasing || {})[i] = a[i][1];
                        a[i] = a[i][0]
                    }
                }
                if (j.overflow != null)this.style.overflow = "hidden";
                j.curAnim = c.extend({}, a);
                c.each(a, function (r, u) {
                    var z = new c.fx(k, j, r);
                    if (Ab.test(u))z[u === "toggle" ? o ? "show" : "hide" : u](a); else {
                        var C = Bb.exec(u), B = z.cur(true) || 0;
                        if (C) {
                            u = parseFloat(C[2]);
                            var E = C[3] || "px";
                            if (E !== "px") {
                                k.style[r] = (u || 1) + E;
                                B = (u || 1) / z.cur(true) * B;
                                k.style[r] = B + E
                            }
                            if (C[1])u = (C[1] === "-=" ? -1 : 1) * u + B;
                            z.custom(B, u, E)
                        } else z.custom(B, u, "")
                    }
                });
                return true
            })
        }, stop:function (a, b) {
            var d = c.timers;
            a && this.queue([]);
            this.each(function () {
                for (var f = d.length - 1; f >= 0; f--)if (d[f].elem === this) {
                    b && d[f](true);
                    d.splice(f, 1)
                }
            });
            b || this.dequeue();
            return this
        }});
    c.each({slideDown:K("show", 1), slideUp:K("hide", 1), slideToggle:K("toggle", 1), fadeIn:{opacity:"show"}, fadeOut:{opacity:"hide"}}, function (a, b) {
        c.fn[a] = function (d, f) {
            return this.animate(b, d, f)
        }
    });
    c.extend({speed:function (a, b, d) {
        var f = a && typeof a === "object" ? a : {complete:d || !d && b || c.isFunction(a) && a, duration:a, easing:d && b || b && !c.isFunction(b) && b};
        f.duration = c.fx.off ? 0 : typeof f.duration ===
            "number" ? f.duration : c.fx.speeds[f.duration] || c.fx.speeds._default;
        f.old = f.complete;
        f.complete = function () {
            f.queue !== false && c(this).dequeue();
            c.isFunction(f.old) && f.old.call(this)
        };
        return f
    }, easing:{linear:function (a, b, d, f) {
        return d + f * a
    }, swing:function (a, b, d, f) {
        return(-Math.cos(a * Math.PI) / 2 + 0.5) * f + d
    }}, timers:[], fx:function (a, b, d) {
        this.options = b;
        this.elem = a;
        this.prop = d;
        if (!b.orig)b.orig = {}
    }});
    c.fx.prototype = {update:function () {
        this.options.step && this.options.step.call(this.elem, this.now, this);
        (c.fx.step[this.prop] ||
            c.fx.step._default)(this);
        if ((this.prop === "height" || this.prop === "width") && this.elem.style)this.elem.style.display = "block"
    }, cur:function (a) {
        if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null))return this.elem[this.prop];
        return(a = parseFloat(c.css(this.elem, this.prop, a))) && a > -10000 ? a : parseFloat(c.curCSS(this.elem, this.prop)) || 0
    }, custom:function (a, b, d) {
        function f(j) {
            return e.step(j)
        }

        this.startTime = J();
        this.start = a;
        this.end = b;
        this.unit = d || this.unit || "px";
        this.now = this.start;
        this.pos = this.state = 0;
        var e = this;
        f.elem = this.elem;
        if (f() && c.timers.push(f) && !W)W = setInterval(c.fx.tick, 13)
    }, show:function () {
        this.options.orig[this.prop] = c.style(this.elem, this.prop);
        this.options.show = true;
        this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());
        c(this.elem).show()
    }, hide:function () {
        this.options.orig[this.prop] = c.style(this.elem, this.prop);
        this.options.hide = true;
        this.custom(this.cur(), 0)
    }, step:function (a) {
        var b = J(), d = true;
        if (a || b >= this.options.duration + this.startTime) {
            this.now =
                this.end;
            this.pos = this.state = 1;
            this.update();
            this.options.curAnim[this.prop] = true;
            for (var f in this.options.curAnim)if (this.options.curAnim[f] !== true)d = false;
            if (d) {
                if (this.options.display != null) {
                    this.elem.style.overflow = this.options.overflow;
                    a = c.data(this.elem, "olddisplay");
                    this.elem.style.display = a ? a : this.options.display;
                    if (c.css(this.elem, "display") === "none")this.elem.style.display = "block"
                }
                this.options.hide && c(this.elem).hide();
                if (this.options.hide || this.options.show)for (var e in this.options.curAnim)c.style(this.elem,
                    e, this.options.orig[e]);
                this.options.complete.call(this.elem)
            }
            return false
        } else {
            e = b - this.startTime;
            this.state = e / this.options.duration;
            a = this.options.easing || (c.easing.swing ? "swing" : "linear");
            this.pos = c.easing[this.options.specialEasing && this.options.specialEasing[this.prop] || a](this.state, e, 0, 1, this.options.duration);
            this.now = this.start + (this.end - this.start) * this.pos;
            this.update()
        }
        return true
    }};
    c.extend(c.fx, {tick:function () {
        for (var a = c.timers, b = 0; b < a.length; b++)a[b]() || a.splice(b--, 1);
        a.length ||
        c.fx.stop()
    }, stop:function () {
        clearInterval(W);
        W = null
    }, speeds:{slow:600, fast:200, _default:400}, step:{opacity:function (a) {
        c.style(a.elem, "opacity", a.now)
    }, _default:function (a) {
        if (a.elem.style && a.elem.style[a.prop] != null)a.elem.style[a.prop] = (a.prop === "width" || a.prop === "height" ? Math.max(0, a.now) : a.now) + a.unit; else a.elem[a.prop] = a.now
    }}});
    if (c.expr && c.expr.filters)c.expr.filters.animated = function (a) {
        return c.grep(c.timers,function (b) {
            return a === b.elem
        }).length
    };
    c.fn.offset = "getBoundingClientRect"in s.documentElement ?
        function (a) {
            var b = this[0];
            if (a)return this.each(function (e) {
                c.offset.setOffset(this, a, e)
            });
            if (!b || !b.ownerDocument)return null;
            if (b === b.ownerDocument.body)return c.offset.bodyOffset(b);
            var d = b.getBoundingClientRect(), f = b.ownerDocument;
            b = f.body;
            f = f.documentElement;
            return{top:d.top + (self.pageYOffset || c.support.boxModel && f.scrollTop || b.scrollTop) - (f.clientTop || b.clientTop || 0), left:d.left + (self.pageXOffset || c.support.boxModel && f.scrollLeft || b.scrollLeft) - (f.clientLeft || b.clientLeft || 0)}
        } : function (a) {
        var b =
            this[0];
        if (a)return this.each(function (r) {
            c.offset.setOffset(this, a, r)
        });
        if (!b || !b.ownerDocument)return null;
        if (b === b.ownerDocument.body)return c.offset.bodyOffset(b);
        c.offset.initialize();
        var d = b.offsetParent, f = b, e = b.ownerDocument, j, i = e.documentElement, o = e.body;
        f = (e = e.defaultView) ? e.getComputedStyle(b, null) : b.currentStyle;
        for (var k = b.offsetTop, n = b.offsetLeft; (b = b.parentNode) && b !== o && b !== i;) {
            if (c.offset.supportsFixedPosition && f.position === "fixed")break;
            j = e ? e.getComputedStyle(b, null) : b.currentStyle;
            k -= b.scrollTop;
            n -= b.scrollLeft;
            if (b === d) {
                k += b.offsetTop;
                n += b.offsetLeft;
                if (c.offset.doesNotAddBorder && !(c.offset.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(b.nodeName))) {
                    k += parseFloat(j.borderTopWidth) || 0;
                    n += parseFloat(j.borderLeftWidth) || 0
                }
                f = d;
                d = b.offsetParent
            }
            if (c.offset.subtractsBorderForOverflowNotVisible && j.overflow !== "visible") {
                k += parseFloat(j.borderTopWidth) || 0;
                n += parseFloat(j.borderLeftWidth) || 0
            }
            f = j
        }
        if (f.position === "relative" || f.position === "static") {
            k += o.offsetTop;
            n += o.offsetLeft
        }
        if (c.offset.supportsFixedPosition &&
            f.position === "fixed") {
            k += Math.max(i.scrollTop, o.scrollTop);
            n += Math.max(i.scrollLeft, o.scrollLeft)
        }
        return{top:k, left:n}
    };
    c.offset = {initialize:function () {
        var a = s.body, b = s.createElement("div"), d, f, e, j = parseFloat(c.curCSS(a, "marginTop", true)) || 0;
        c.extend(b.style, {position:"absolute", top:0, left:0, margin:0, border:0, width:"1px", height:"1px", visibility:"hidden"});
        b.innerHTML = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
        a.insertBefore(b, a.firstChild);
        d = b.firstChild;
        f = d.firstChild;
        e = d.nextSibling.firstChild.firstChild;
        this.doesNotAddBorder = f.offsetTop !== 5;
        this.doesAddBorderForTableAndCells = e.offsetTop === 5;
        f.style.position = "fixed";
        f.style.top = "20px";
        this.supportsFixedPosition = f.offsetTop === 20 || f.offsetTop === 15;
        f.style.position = f.style.top = "";
        d.style.overflow = "hidden";
        d.style.position = "relative";
        this.subtractsBorderForOverflowNotVisible = f.offsetTop === -5;
        this.doesNotIncludeMarginInBodyOffset = a.offsetTop !== j;
        a.removeChild(b);
        c.offset.initialize = c.noop
    }, bodyOffset:function (a) {
        var b = a.offsetTop, d = a.offsetLeft;
        c.offset.initialize();
        if (c.offset.doesNotIncludeMarginInBodyOffset) {
            b += parseFloat(c.curCSS(a, "marginTop", true)) || 0;
            d += parseFloat(c.curCSS(a, "marginLeft", true)) || 0
        }
        return{top:b, left:d}
    }, setOffset:function (a, b, d) {
        if (/static/.test(c.curCSS(a, "position")))a.style.position = "relative";
        var f = c(a), e = f.offset(), j = parseInt(c.curCSS(a, "top", true), 10) || 0, i = parseInt(c.curCSS(a, "left", true), 10) || 0;
        if (c.isFunction(b))b = b.call(a,
            d, e);
        d = {top:b.top - e.top + j, left:b.left - e.left + i};
        "using"in b ? b.using.call(a, d) : f.css(d)
    }};
    c.fn.extend({position:function () {
        if (!this[0])return null;
        var a = this[0], b = this.offsetParent(), d = this.offset(), f = /^body|html$/i.test(b[0].nodeName) ? {top:0, left:0} : b.offset();
        d.top -= parseFloat(c.curCSS(a, "marginTop", true)) || 0;
        d.left -= parseFloat(c.curCSS(a, "marginLeft", true)) || 0;
        f.top += parseFloat(c.curCSS(b[0], "borderTopWidth", true)) || 0;
        f.left += parseFloat(c.curCSS(b[0], "borderLeftWidth", true)) || 0;
        return{top:d.top -
            f.top, left:d.left - f.left}
    }, offsetParent:function () {
        return this.map(function () {
            for (var a = this.offsetParent || s.body; a && !/^body|html$/i.test(a.nodeName) && c.css(a, "position") === "static";)a = a.offsetParent;
            return a
        })
    }});
    c.each(["Left", "Top"], function (a, b) {
        var d = "scroll" + b;
        c.fn[d] = function (f) {
            var e = this[0], j;
            if (!e)return null;
            if (f !== w)return this.each(function () {
                if (j = wa(this))j.scrollTo(!a ? f : c(j).scrollLeft(), a ? f : c(j).scrollTop()); else this[d] = f
            }); else return(j = wa(e)) ? "pageXOffset"in j ? j[a ? "pageYOffset" :
                "pageXOffset"] : c.support.boxModel && j.document.documentElement[d] || j.document.body[d] : e[d]
        }
    });
    c.each(["Height", "Width"], function (a, b) {
        var d = b.toLowerCase();
        c.fn["inner" + b] = function () {
            return this[0] ? c.css(this[0], d, false, "padding") : null
        };
        c.fn["outer" + b] = function (f) {
            return this[0] ? c.css(this[0], d, false, f ? "margin" : "border") : null
        };
        c.fn[d] = function (f) {
            var e = this[0];
            if (!e)return f == null ? null : this;
            if (c.isFunction(f))return this.each(function (j) {
                var i = c(this);
                i[d](f.call(this, j, i[d]()))
            });
            return"scrollTo"in
                e && e.document ? e.document.compatMode === "CSS1Compat" && e.document.documentElement["client" + b] || e.document.body["client" + b] : e.nodeType === 9 ? Math.max(e.documentElement["client" + b], e.body["scroll" + b], e.documentElement["scroll" + b], e.body["offset" + b], e.documentElement["offset" + b]) : f === w ? c.css(e, d) : this.css(d, typeof f === "string" ? f : f + "px")
        }
    });
    A.jQuery = A.$ = c
})(window);
/*
 * jQuery selectbox plugin
 *
 * Copyright (c) 2007 Sadri Sahraoui (brainfault.com)
 * Licensed under the GPL license and MIT:
 *   http://www.opensource.org/licenses/GPL-license.php
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * The code is inspired from Autocomplete plugin (http://www.dyve.net/jquery/?autocomplete)
 *
 * Revision: $Id$
 * Version: 0.5
 * 
 * Changelog :
 *  Version 0.5 
 *  - separate css style for current selected element and hover element which solve the highlight issue 
 *  Version 0.4
 *  - Fix width when the select is in a hidden div   @Pawel Maziarz
 *  - Add a unique id for generated li to avoid conflict with other selects and empty values @Pawel Maziarz
 */

jQuery.fn.extend({
    selectbox:function (options) {
        return this.each(function () {
            new jQuery.SelectBox(this, options);
        });
    }
});


/* pawel maziarz: work around for ie logging */
if (!window.console) {
    var console = {
        log:function (msg) {
        }
    }
}
/* */

jQuery.SelectBox = function (selectobj, options) {

    var opt = options || {};
    opt.inputClass = opt.inputClass || "selectbox";
    opt.containerClass = opt.containerClass || "selectbox-wrapper";
    opt.hoverClass = opt.hoverClass || "current";
    opt.currentClass = opt.selectedClass || "selected"
    opt.debug = opt.debug || false;

    var elm_id = selectobj.id;
    var active = -1;
    var inFocus = false;
    var hasfocus = 0;
    //jquery object for select element
    var $select = $(selectobj);
    // jquery container object
    var $container = setupContainer(opt);
    //jquery input object 
    var $input = setupInput(opt);
    // hide select and append newly created elements
    $select.hide().before($input).before($container);


    init();

    $input
        .click(function () {
            if (!inFocus) {
                $container.toggle();
            }
        })
        .focus(function () {
            if ($container.not(':visible')) {
                inFocus = true;
                $container.show();
            }
        })
        .keydown(function (event) {
            switch (event.keyCode) {
                case 38: // up
                    event.preventDefault();
                    moveSelect(-1);
                    break;
                case 40: // down
                    event.preventDefault();
                    moveSelect(1);
                    break;
                //case 9:  // tab 
                case 13: // return
                    event.preventDefault(); // seems not working in mac !
                    $('li.' + opt.hoverClass).trigger('click');
                    break;
                case 27: //escape
                    hideMe();
                    break;
            }
        })
        .blur(function () {
            if ($container.is(':visible') && hasfocus > 0) {
                if (opt.debug) console.log('container visible and has focus')
            } else {
                hideMe();
            }
        });


    function hideMe() {
        hasfocus = 0;
        $container.hide();
    }

    function init() {
        $container.append(getSelectOptions($input.attr('id'))).hide();
        var width = $input.css('width');
        $container.width(width);
    }

    function setupContainer(options) {
        var container = document.createElement("div");
        $container = $(container);
        $container.attr('id', elm_id + '_container');
        $container.addClass(options.containerClass);

        return $container;
    }

    function setupInput(options) {
        var input = document.createElement("input");
        var $input = $(input);
        $input.attr("id", elm_id + "_input");
        $input.attr("type", "text");
        $input.addClass(options.inputClass);
        $input.attr("autocomplete", "off");
        $input.attr("readonly", "readonly");
        $input.attr("tabIndex", $select.attr("tabindex")); // "I" capital is important for ie

        return $input;
    }

    function moveSelect(step) {
        var lis = $("li", $container);
        if (!lis) return;

        active += step;

        if (active < 0) {
            active = 0;
        } else if (active >= lis.size()) {
            active = lis.size() - 1;
        }

        lis.removeClass(opt.hoverClass);

        $(lis[active]).addClass(opt.hoverClass);
    }

    function setCurrent() {
        var li = $("li." + opt.currentClass, $container).get(0);
        var ar = ('' + li.id).split('_');
        var el = ar[ar.length - 1];
        $select.val(el);
        $input.val($(li).html());
        return true;
    }

    // select value
    function getCurrentSelected() {
        return $select.val();
    }

    // input value
    function getCurrentValue() {
        return $input.val();
    }

    function getSelectOptions(parentid) {
        var select_options = new Array();
        var ul = document.createElement('ul');
        $select.children('option').each(function () {
            var li = document.createElement('li');
            li.setAttribute('id', parentid + '_' + $(this).val());
            li.innerHTML = $(this).html();
            if ($(this).is(':selected')) {
                $input.val($(this).html());
                $(li).addClass(opt.currentClass);
            }
            ul.appendChild(li);
            $(li)
                .mouseover(function (event) {
                    hasfocus = 1;
                    if (opt.debug) console.log('over on : ' + this.id);
                    jQuery(event.target, $container).addClass(opt.hoverClass);
                })
                .mouseout(function (event) {
                    hasfocus = -1;
                    if (opt.debug) console.log('out on : ' + this.id);
                    jQuery(event.target, $container).removeClass(opt.hoverClass);
                })
                .click(function (event) {
                    var fl = $('li.' + opt.hoverClass, $container).get(0);
                    if (opt.debug) console.log('click on :' + this.id);
                    $('li.' + opt.currentClass).removeClass(opt.currentClass);
                    $(this).addClass(opt.currentClass);
                    setCurrent();
                    hideMe();
                });
        });
        return ul;
    }

};
/*
 * 
 * TableSorter 2.0 - Client-side table sorting with ease!
 * Version 2.0.5b
 * @requires jQuery v1.2.3
 * 
 * Copyright (c) 2007 Christian Bach
 * Examples and docs at: http://tablesorter.com
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * 
 */
/**
 *
 * @description Create a sortable table with multi-column sorting capabilitys
 *
 * @example $('table').tablesorter();
 * @desc Create a simple tablesorter interface.
 *
 * @example $('table').tablesorter({ sortList:[[0,0],[1,0]] });
 * @desc Create a tablesorter interface and sort on the first and secound column column headers.
 *
 * @example $('table').tablesorter({ headers: { 0: { sorter: false}, 1: {sorter: false} } });
 *
 * @desc Create a tablesorter interface and disableing the first and second  column headers.
 *
 *
 * @example $('table').tablesorter({ headers: { 0: {sorter:"integer"}, 1: {sorter:"currency"} } });
 *
 * @desc Create a tablesorter interface and set a column parser for the first
 *       and second column.
 *
 *
 * @param Object
 *            settings An object literal containing key/value pairs to provide
 *            optional settings.
 *
 *
 * @option String cssHeader (optional) A string of the class name to be appended
 *         to sortable tr elements in the thead of the table. Default value:
 *         "header"
 *
 * @option String cssAsc (optional) A string of the class name to be appended to
 *         sortable tr elements in the thead on a ascending sort. Default value:
 *         "headerSortUp"
 *
 * @option String cssDesc (optional) A string of the class name to be appended
 *         to sortable tr elements in the thead on a descending sort. Default
 *         value: "headerSortDown"
 *
 * @option String sortInitialOrder (optional) A string of the inital sorting
 *         order can be asc or desc. Default value: "asc"
 *
 * @option String sortMultisortKey (optional) A string of the multi-column sort
 *         key. Default value: "shiftKey"
 *
 * @option String textExtraction (optional) A string of the text-extraction
 *         method to use. For complex html structures inside td cell set this
 *         option to "complex", on large tables the complex option can be slow.
 *         Default value: "simple"
 *
 * @option Object headers (optional) An array containing the forces sorting
 *         rules. This option let's you specify a default sorting rule. Default
 *         value: null
 *
 * @option Array sortList (optional) An array containing the forces sorting
 *         rules. This option let's you specify a default sorting rule. Default
 *         value: null
 *
 * @option Array sortForce (optional) An array containing forced sorting rules.
 *         This option let's you specify a default sorting rule, which is
 *         prepended to user-selected rules. Default value: null
 *
 * @option Boolean sortLocaleCompare (optional) Boolean flag indicating whatever
 *         to use String.localeCampare method or not. Default set to true.
 *
 *
 * @option Array sortAppend (optional) An array containing forced sorting rules.
 *         This option let's you specify a default sorting rule, which is
 *         appended to user-selected rules. Default value: null
 *
 * @option Boolean widthFixed (optional) Boolean flag indicating if tablesorter
 *         should apply fixed widths to the table columns. This is usefull when
 *         using the pager companion plugin. This options requires the dimension
 *         jquery plugin. Default value: false
 *
 * @option Boolean cancelSelection (optional) Boolean flag indicating if
 *         tablesorter should cancel selection of the table headers text.
 *         Default value: true
 *
 * @option Boolean debug (optional) Boolean flag indicating if tablesorter
 *         should display debuging information usefull for development.
 *
 * @type jQuery
 *
 * @name tablesorter
 *
 * @cat Plugins/Tablesorter
 *
 * @author Christian Bach/christian.bach@polyester.se
 */


(function ($) {
    $.extend({
        tablesorter:new
            function () {

                var parsers = [],
                    widgets = [];

                this.defaults = {
                    cssHeader:"header",
                    cssAsc:"headerSortUp",
                    cssDesc:"headerSortDown",
                    cssChildRow:"expand-child",
                    sortInitialOrder:"asc",
                    sortMultiSortKey:"shiftKey",
                    sortForce:null,
                    sortAppend:null,
                    sortLocaleCompare:true,
                    textExtraction:"simple",
                    parsers:{}, widgets:[],
                    widgetZebra:{
                        css:["even", "odd"]
                    }, headers:{}, widthFixed:false,
                    cancelSelection:true,
                    sortList:[],
                    headerList:[],
                    dateFormat:"us",
                    decimal:'/\.|\,/g',
                    onRenderHeader:null,
                    selectorHeaders:'thead th',
                    debug:false
                };

                /* debuging utils */

                function benchmark(s, d) {
                    log(s + "," + (new Date().getTime() - d.getTime()) + "ms");
                }

                this.benchmark = benchmark;

                function log(s) {
                    if (typeof console != "undefined" && typeof console.debug != "undefined") {
                        console.log(s);
                    } else {
                        alert(s);
                    }
                }

                /* parsers utils */

                function buildParserCache(table, $headers) {

                    if (table.config.debug) {
                        var parsersDebug = "";
                    }

                    if (table.tBodies.length == 0) return; // In the case of empty tables
                    var rows = table.tBodies[0].rows;

                    if (rows[0]) {

                        var list = [],
                            cells = rows[0].cells,
                            l = cells.length;

                        for (var i = 0; i < l; i++) {

                            var p = false;

                            if ($.metadata && ($($headers[i]).metadata() && $($headers[i]).metadata().sorter)) {

                                p = getParserById($($headers[i]).metadata().sorter);

                            } else if ((table.config.headers[i] && table.config.headers[i].sorter)) {

                                p = getParserById(table.config.headers[i].sorter);
                            }
                            if (!p) {

                                p = detectParserForColumn(table, rows, -1, i);
                            }

                            if (table.config.debug) {
                                parsersDebug += "column:" + i + " parser:" + p.id + "\n";
                            }

                            list.push(p);
                        }
                    }

                    if (table.config.debug) {
                        log(parsersDebug);
                    }

                    return list;
                }

                ;

                function detectParserForColumn(table, rows, rowIndex, cellIndex) {
                    var l = parsers.length,
                        node = false,
                        nodeValue = false,
                        keepLooking = true;
                    while (nodeValue == '' && keepLooking) {
                        rowIndex++;
                        if (rows[rowIndex]) {
                            node = getNodeFromRowAndCellIndex(rows, rowIndex, cellIndex);
                            nodeValue = trimAndGetNodeText(table.config, node);
                            if (table.config.debug) {
                                log('Checking if value was empty on row:' + rowIndex);
                            }
                        } else {
                            keepLooking = false;
                        }
                    }
                    for (var i = 1; i < l; i++) {
                        if (parsers[i].is(nodeValue, table, node)) {
                            return parsers[i];
                        }
                    }
                    // 0 is always the generic parser (text)
                    return parsers[0];
                }

                function getNodeFromRowAndCellIndex(rows, rowIndex, cellIndex) {
                    return rows[rowIndex].cells[cellIndex];
                }

                function trimAndGetNodeText(config, node) {
                    return $.trim(getElementText(config, node));
                }

                function getParserById(name) {
                    var l = parsers.length;
                    for (var i = 0; i < l; i++) {
                        if (parsers[i].id.toLowerCase() == name.toLowerCase()) {
                            return parsers[i];
                        }
                    }
                    return false;
                }

                /* utils */

                function buildCache(table) {

                    if (table.config.debug) {
                        var cacheTime = new Date();
                    }

                    var totalRows = (table.tBodies[0] && table.tBodies[0].rows.length) || 0,
                        totalCells = (table.tBodies[0].rows[0] && table.tBodies[0].rows[0].cells.length) || 0,
                        parsers = table.config.parsers,
                        cache = {
                            row:[],
                            normalized:[]
                        };

                    for (var i = 0; i < totalRows; ++i) {

                        /** Add the table data to main data array */
                        var c = $(table.tBodies[0].rows[i]),
                            cols = [];

                        // if this is a child row, add it to the last row's children and
                        // continue to the next row
                        if (c.hasClass(table.config.cssChildRow)) {
                            cache.row[cache.row.length - 1] = cache.row[cache.row.length - 1].add(c);
                            // go to the next for loop
                            continue;
                        }

                        cache.row.push(c);

                        for (var j = 0; j < totalCells; ++j) {
                            cols.push(parsers[j].format(getElementText(table.config, c[0].cells[j]), table, c[0].cells[j]));
                        }

                        cols.push(cache.normalized.length); // add position for rowCache
                        cache.normalized.push(cols);
                        cols = null;
                    }
                    ;

                    if (table.config.debug) {
                        benchmark("Building cache for " + totalRows + " rows:", cacheTime);
                    }

                    return cache;
                }

                ;

                function getElementText(config, node) {

                    var text = "";

                    if (!node) return "";

                    if (!config.supportsTextContent) config.supportsTextContent = node.textContent || false;

                    if (config.textExtraction == "simple") {
                        if (config.supportsTextContent) {
                            text = node.textContent;
                        } else {
                            if (node.childNodes[0] && node.childNodes[0].hasChildNodes()) {
                                text = node.childNodes[0].innerHTML;
                            } else {
                                text = node.innerHTML;
                            }
                        }
                    } else {
                        if (typeof(config.textExtraction) == "function") {
                            text = config.textExtraction(node);
                        } else {
                            text = $(node).text();
                        }
                    }
                    return text;
                }

                function appendToTable(table, cache) {

                    if (table.config.debug) {
                        var appendTime = new Date()
                    }

                    var c = cache,
                        r = c.row,
                        n = c.normalized,
                        totalRows = n.length,
                        checkCell = (n[0].length - 1),
                        tableBody = $(table.tBodies[0]),
                        rows = [];


                    for (var i = 0; i < totalRows; i++) {
                        var pos = n[i][checkCell];

                        rows.push(r[pos]);

                        if (!table.config.appender) {

                            //var o = ;
                            var l = r[pos].length;
                            for (var j = 0; j < l; j++) {
                                tableBody[0].appendChild(r[pos][j]);
                            }

                            // 
                        }
                    }


                    if (table.config.appender) {

                        table.config.appender(table, rows);
                    }

                    rows = null;

                    if (table.config.debug) {
                        benchmark("Rebuilt table:", appendTime);
                    }

                    // apply table widgets
                    applyWidget(table);

                    // trigger sortend
                    setTimeout(function () {
                        $(table).trigger("sortEnd");
                    }, 0);

                }

                ;

                function buildHeaders(table) {

                    if (table.config.debug) {
                        var time = new Date();
                    }

                    var meta = ($.metadata) ? true : false;

                    var header_index = computeTableHeaderCellIndexes(table);

                    $tableHeaders = $(table.config.selectorHeaders, table).each(function (index) {

                        this.column = header_index[this.parentNode.rowIndex + "-" + this.cellIndex];
                        // this.column = index;
                        this.order = formatSortingOrder(table.config.sortInitialOrder);


                        this.count = this.order;

                        if (checkHeaderMetadata(this) || checkHeaderOptions(table, index)) this.sortDisabled = true;
                        if (checkHeaderOptionsSortingLocked(table, index)) this.order = this.lockedOrder = checkHeaderOptionsSortingLocked(table, index);

                        if (!this.sortDisabled) {
                            var $th = $(this).addClass(table.config.cssHeader);
                            if (table.config.onRenderHeader) table.config.onRenderHeader.apply($th);
                        }

                        // add cell to headerList
                        table.config.headerList[index] = this;
                    });

                    if (table.config.debug) {
                        benchmark("Built headers:", time);
                        log($tableHeaders);
                    }

                    return $tableHeaders;

                }

                ;

                // from:
                // http://www.javascripttoolbox.com/lib/table/examples.php
                // http://www.javascripttoolbox.com/temp/table_cellindex.html


                function computeTableHeaderCellIndexes(t) {
                    var matrix = [];
                    var lookup = {};
                    var thead = t.getElementsByTagName('THEAD')[0];
                    var trs = thead.getElementsByTagName('TR');

                    for (var i = 0; i < trs.length; i++) {
                        var cells = trs[i].cells;
                        for (var j = 0; j < cells.length; j++) {
                            var c = cells[j];

                            var rowIndex = c.parentNode.rowIndex;
                            var cellId = rowIndex + "-" + c.cellIndex;
                            var rowSpan = c.rowSpan || 1;
                            var colSpan = c.colSpan || 1
                            var firstAvailCol;
                            if (typeof(matrix[rowIndex]) == "undefined") {
                                matrix[rowIndex] = [];
                            }
                            // Find first available column in the first row
                            for (var k = 0; k < matrix[rowIndex].length + 1; k++) {
                                if (typeof(matrix[rowIndex][k]) == "undefined") {
                                    firstAvailCol = k;
                                    break;
                                }
                            }
                            lookup[cellId] = firstAvailCol;
                            for (var k = rowIndex; k < rowIndex + rowSpan; k++) {
                                if (typeof(matrix[k]) == "undefined") {
                                    matrix[k] = [];
                                }
                                var matrixrow = matrix[k];
                                for (var l = firstAvailCol; l < firstAvailCol + colSpan; l++) {
                                    matrixrow[l] = "x";
                                }
                            }
                        }
                    }
                    return lookup;
                }

                function checkCellColSpan(table, rows, row) {
                    var arr = [],
                        r = table.tHead.rows,
                        c = r[row].cells;

                    for (var i = 0; i < c.length; i++) {
                        var cell = c[i];

                        if (cell.colSpan > 1) {
                            arr = arr.concat(checkCellColSpan(table, headerArr, row++));
                        } else {
                            if (table.tHead.length == 1 || (cell.rowSpan > 1 || !r[row + 1])) {
                                arr.push(cell);
                            }
                            // headerArr[row] = (i+row);
                        }
                    }
                    return arr;
                }

                ;

                function checkHeaderMetadata(cell) {
                    if (($.metadata) && ($(cell).metadata().sorter === false)) {
                        return true;
                    }
                    ;
                    return false;
                }

                function checkHeaderOptions(table, i) {
                    if ((table.config.headers[i]) && (table.config.headers[i].sorter === false)) {
                        return true;
                    }
                    ;
                    return false;
                }

                function checkHeaderOptionsSortingLocked(table, i) {
                    if ((table.config.headers[i]) && (table.config.headers[i].lockedOrder)) return table.config.headers[i].lockedOrder;
                    return false;
                }

                function applyWidget(table) {
                    var c = table.config.widgets;
                    var l = c.length;
                    for (var i = 0; i < l; i++) {

                        getWidgetById(c[i]).format(table);
                    }

                }

                function getWidgetById(name) {
                    var l = widgets.length;
                    for (var i = 0; i < l; i++) {
                        if (widgets[i].id.toLowerCase() == name.toLowerCase()) {
                            return widgets[i];
                        }
                    }
                }

                ;

                function formatSortingOrder(v) {
                    if (typeof(v) != "Number") {
                        return (v.toLowerCase() == "desc") ? 1 : 0;
                    } else {
                        return (v == 1) ? 1 : 0;
                    }
                }

                function isValueInArray(v, a) {
                    var l = a.length;
                    for (var i = 0; i < l; i++) {
                        if (a[i][0] == v) {
                            return true;
                        }
                    }
                    return false;
                }

                function setHeadersCss(table, $headers, list, css) {
                    // remove all header information
                    $headers.removeClass(css[0]).removeClass(css[1]);

                    var h = [];
                    $headers.each(function (offset) {
                        if (!this.sortDisabled) {
                            h[this.column] = $(this);
                        }
                    });

                    var l = list.length;
                    for (var i = 0; i < l; i++) {
                        h[list[i][0]].addClass(css[list[i][1]]);
                    }
                }

                function fixColumnWidth(table, $headers) {
                    var c = table.config;
                    if (c.widthFixed) {
                        var colgroup = $('<colgroup>');
                        $("tr:first td", table.tBodies[0]).each(function () {
                            colgroup.append($('<col>').css('width', $(this).width()));
                        });
                        $(table).prepend(colgroup);
                    }
                    ;
                }

                function updateHeaderSortCount(table, sortList) {
                    var c = table.config,
                        l = sortList.length;
                    for (var i = 0; i < l; i++) {
                        var s = sortList[i],
                            o = c.headerList[s[0]];
                        o.count = s[1];
                        o.count++;
                    }
                }

                /* sorting methods */

                function multisort(table, sortList, cache) {

                    if (table.config.debug) {
                        var sortTime = new Date();
                    }

                    var dynamicExp = "var sortWrapper = function(a,b) {",
                        l = sortList.length;

                    // TODO: inline functions.
                    for (var i = 0; i < l; i++) {

                        var c = sortList[i][0];
                        var order = sortList[i][1];
                        // var s = (getCachedSortType(table.config.parsers,c) == "text") ?
                        // ((order == 0) ? "sortText" : "sortTextDesc") : ((order == 0) ?
                        // "sortNumeric" : "sortNumericDesc");
                        // var s = (table.config.parsers[c].type == "text") ? ((order == 0)
                        // ? makeSortText(c) : makeSortTextDesc(c)) : ((order == 0) ?
                        // makeSortNumeric(c) : makeSortNumericDesc(c));
                        var s = (table.config.parsers[c].type == "text") ? ((order == 0) ? makeSortFunction("text", "asc", c) : makeSortFunction("text", "desc", c)) : ((order == 0) ? makeSortFunction("numeric", "asc", c) : makeSortFunction("numeric", "desc", c));
                        var e = "e" + i;

                        dynamicExp += "var " + e + " = " + s; // + "(a[" + c + "],b[" + c
                        // + "]); ";
                        dynamicExp += "if(" + e + ") { return " + e + "; } ";
                        dynamicExp += "else { ";

                    }

                    // if value is the same keep orignal order
                    var orgOrderCol = cache.normalized[0].length - 1;
                    dynamicExp += "return a[" + orgOrderCol + "]-b[" + orgOrderCol + "];";

                    for (var i = 0; i < l; i++) {
                        dynamicExp += "}; ";
                    }

                    dynamicExp += "return 0; ";
                    dynamicExp += "}; ";

                    if (table.config.debug) {
                        benchmark("Evaling expression:" + dynamicExp, new Date());
                    }

                    eval(dynamicExp);

                    cache.normalized.sort(sortWrapper);

                    if (table.config.debug) {
                        benchmark("Sorting on " + sortList.toString() + " and dir " + order + " time:", sortTime);
                    }

                    return cache;
                }

                ;

                function makeSortFunction(type, direction, index) {
                    var a = "a[" + index + "]",
                        b = "b[" + index + "]";
                    if (type == 'text' && direction == 'asc') {
                        return "(" + a + " == " + b + " ? 0 : (" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : (" + a + " < " + b + ") ? -1 : 1 )));";
                    } else if (type == 'text' && direction == 'desc') {
                        return "(" + a + " == " + b + " ? 0 : (" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : (" + b + " < " + a + ") ? -1 : 1 )));";
                    } else if (type == 'numeric' && direction == 'asc') {
                        return "(" + a + " === null && " + b + " === null) ? 0 :(" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : " + a + " - " + b + "));";
                    } else if (type == 'numeric' && direction == 'desc') {
                        return "(" + a + " === null && " + b + " === null) ? 0 :(" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : " + b + " - " + a + "));";
                    }
                }

                ;

                function makeSortText(i) {
                    return "((a[" + i + "] < b[" + i + "]) ? -1 : ((a[" + i + "] > b[" + i + "]) ? 1 : 0));";
                }

                ;

                function makeSortTextDesc(i) {
                    return "((b[" + i + "] < a[" + i + "]) ? -1 : ((b[" + i + "] > a[" + i + "]) ? 1 : 0));";
                }

                ;

                function makeSortNumeric(i) {
                    return "a[" + i + "]-b[" + i + "];";
                }

                ;

                function makeSortNumericDesc(i) {
                    return "b[" + i + "]-a[" + i + "];";
                }

                ;

                function sortText(a, b) {
                    if (table.config.sortLocaleCompare) return a.localeCompare(b);
                    return ((a < b) ? -1 : ((a > b) ? 1 : 0));
                }

                ;

                function sortTextDesc(a, b) {
                    if (table.config.sortLocaleCompare) return b.localeCompare(a);
                    return ((b < a) ? -1 : ((b > a) ? 1 : 0));
                }

                ;

                function sortNumeric(a, b) {
                    return a - b;
                }

                ;

                function sortNumericDesc(a, b) {
                    return b - a;
                }

                ;

                function getCachedSortType(parsers, i) {
                    return parsers[i].type;
                }

                ;
                /* public methods */
                this.construct = function (settings) {
                    return this.each(function () {
                        // if no thead or tbody quit.
                        if (!this.tHead || !this.tBodies) return;
                        // declare
                        var $this, $document, $headers, cache, config, shiftDown = 0,
                            sortOrder;
                        // new blank config object
                        this.config = {};
                        // merge and extend.
                        config = $.extend(this.config, $.tablesorter.defaults, settings);
                        // store common expression for speed
                        $this = $(this);
                        // save the settings where they read
                        $.data(this, "tablesorter", config);
                        // build headers
                        $headers = buildHeaders(this);
                        // try to auto detect column type, and store in tables config
                        this.config.parsers = buildParserCache(this, $headers);
                        // build the cache for the tbody cells
                        cache = buildCache(this);
                        // get the css class names, could be done else where.
                        var sortCSS = [config.cssDesc, config.cssAsc];
                        // fixate columns if the users supplies the fixedWidth option
                        fixColumnWidth(this);
                        // apply event handling to headers
                        // this is to big, perhaps break it out?
                        $headers.click(

                            function (e) {
                                var totalRows = ($this[0].tBodies[0] && $this[0].tBodies[0].rows.length) || 0;
                                if (!this.sortDisabled && totalRows > 0) {
                                    // Only call sortStart if sorting is
                                    // enabled.
                                    $this.trigger("sortStart");
                                    // store exp, for speed
                                    var $cell = $(this);
                                    // get current column index
                                    var i = this.column;
                                    // get current column sort order
                                    this.order = this.count++ % 2;
                                    // always sort on the locked order.
                                    if (this.lockedOrder) this.order = this.lockedOrder;

                                    // user only whants to sort on one
                                    // column
                                    if (!e[config.sortMultiSortKey]) {
                                        // flush the sort list
                                        config.sortList = [];
                                        if (config.sortForce != null) {
                                            var a = config.sortForce;
                                            for (var j = 0; j < a.length; j++) {
                                                if (a[j][0] != i) {
                                                    config.sortList.push(a[j]);
                                                }
                                            }
                                        }
                                        // add column to sort list
                                        config.sortList.push([i, this.order]);
                                        // multi column sorting
                                    } else {
                                        // the user has clicked on an all
                                        // ready sortet column.
                                        if (isValueInArray(i, config.sortList)) {
                                            // revers the sorting direction
                                            // for all tables.
                                            for (var j = 0; j < config.sortList.length; j++) {
                                                var s = config.sortList[j],
                                                    o = config.headerList[s[0]];
                                                if (s[0] == i) {
                                                    o.count = s[1];
                                                    o.count++;
                                                    s[1] = o.count % 2;
                                                }
                                            }
                                        } else {
                                            // add column to sort list array
                                            config.sortList.push([i, this.order]);
                                        }
                                    }
                                    ;
                                    setTimeout(function () {
                                        // set css for headers
                                        setHeadersCss($this[0], $headers, config.sortList, sortCSS);
                                        appendToTable(
                                            $this[0], multisort(
                                                $this[0], config.sortList, cache)
                                        );
                                    }, 1);
                                    // stop normal event by returning false
                                    return false;
                                }
                                // cancel selection
                            }).mousedown(function () {
                                if (config.cancelSelection) {
                                    this.onselectstart = function () {
                                        return false
                                    };
                                    return false;
                                }
                            });
                        // apply easy methods that trigger binded events
                        $this.bind("update",function () {
                            var me = this;
                            setTimeout(function () {
                                // rebuild parsers.
                                me.config.parsers = buildParserCache(
                                    me, $headers);
                                // rebuild the cache map
                                cache = buildCache(me);
                            }, 1);
                        }).bind("updateCell",function (e, cell) {
                                var config = this.config;
                                // get position from the dom.
                                var pos = [(cell.parentNode.rowIndex - 1), cell.cellIndex];
                                // update cache
                                cache.normalized[pos[0]][pos[1]] = config.parsers[pos[1]].format(
                                    getElementText(config, cell), cell);
                            }).bind("sorton",function (e, list) {
                                $(this).trigger("sortStart");
                                config.sortList = list;
                                // update and store the sortlist
                                var sortList = config.sortList;
                                // update header count index
                                updateHeaderSortCount(this, sortList);
                                // set css for headers
                                setHeadersCss(this, $headers, sortList, sortCSS);
                                // sort the table and append it to the dom
                                appendToTable(this, multisort(this, sortList, cache));
                            }).bind("appendCache",function () {
                                appendToTable(this, cache);
                            }).bind("applyWidgetId",function (e, id) {
                                getWidgetById(id).format(this);
                            }).bind("applyWidgets", function () {
                                // apply widgets
                                applyWidget(this);
                            });
                        if ($.metadata && ($(this).metadata() && $(this).metadata().sortlist)) {
                            config.sortList = $(this).metadata().sortlist;
                        }
                        // if user has supplied a sort list to constructor.
                        if (config.sortList.length > 0) {
                            $this.trigger("sorton", [config.sortList]);
                        }
                        // apply widgets
                        applyWidget(this);
                    });
                };
                this.addParser = function (parser) {
                    var l = parsers.length,
                        a = true;
                    for (var i = 0; i < l; i++) {
                        if (parsers[i].id.toLowerCase() == parser.id.toLowerCase()) {
                            a = false;
                        }
                    }
                    if (a) {
                        parsers.push(parser);
                    }
                    ;
                };
                this.addWidget = function (widget) {
                    widgets.push(widget);
                };
                this.formatFloat = function (s) {
                    var i = parseFloat(s);
                    return (isNaN(i)) ? 0 : i;
                };
                this.formatInt = function (s) {
                    var i = parseInt(s);
                    return (isNaN(i)) ? 0 : i;
                };
                this.isDigit = function (s, config) {
                    // replace all an wanted chars and match.
                    return /^[-+]?\d*$/.test($.trim(s.replace(/[,.']/g, '')));
                };
                this.clearTableBody = function (table) {
                    if ($.browser.msie) {
                        function empty() {
                            while (this.firstChild)
                                this.removeChild(this.firstChild);
                        }

                        empty.apply(table.tBodies[0]);
                    } else {
                        table.tBodies[0].innerHTML = "";
                    }
                };
            }
    });

    // extend plugin scope
    $.fn.extend({
        tablesorter:$.tablesorter.construct
    });

    // make shortcut
    var ts = $.tablesorter;

    // add default parsers
    ts.addParser({
        id:"text",
        is:function (s) {
            return true;
        }, format:function (s) {
            return $.trim(s.toLocaleLowerCase());
        }, type:"text"
    });

    ts.addParser({
        id:"digit",
        is:function (s, table) {
            var c = table.config;
            return $.tablesorter.isDigit(s, c);
        }, format:function (s) {
            return $.tablesorter.formatFloat(s);
        }, type:"numeric"
    });

    ts.addParser({
        id:"currency",
        is:function (s) {
            return /^[£$€?.]/.test(s);
        }, format:function (s) {
            return $.tablesorter.formatFloat(s.replace(new RegExp(/[£$€]/g), ""));
        }, type:"numeric"
    });

    ts.addParser({
        id:"ipAddress",
        is:function (s) {
            return /^\d{2,3}[\.]\d{2,3}[\.]\d{2,3}[\.]\d{2,3}$/.test(s);
        }, format:function (s) {
            var a = s.split("."),
                r = "",
                l = a.length;
            for (var i = 0; i < l; i++) {
                var item = a[i];
                if (item.length == 2) {
                    r += "0" + item;
                } else {
                    r += item;
                }
            }
            return $.tablesorter.formatFloat(r);
        }, type:"numeric"
    });

    ts.addParser({
        id:"url",
        is:function (s) {
            return /^(https?|ftp|file):\/\/$/.test(s);
        }, format:function (s) {
            return jQuery.trim(s.replace(new RegExp(/(https?|ftp|file):\/\//), ''));
        }, type:"text"
    });

    ts.addParser({
        id:"isoDate",
        is:function (s) {
            return /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(s);
        }, format:function (s) {
            return $.tablesorter.formatFloat((s != "") ? new Date(s.replace(
                new RegExp(/-/g), "/")).getTime() : "0");
        }, type:"numeric"
    });

    ts.addParser({
        id:"percent",
        is:function (s) {
            return /\%$/.test($.trim(s));
        }, format:function (s) {
            return $.tablesorter.formatFloat(s.replace(new RegExp(/%/g), ""));
        }, type:"numeric"
    });

    ts.addParser({
        id:"usLongDate",
        is:function (s) {
            return s.match(new RegExp(/^[A-Za-z]{3,10}\.? [0-9]{1,2}, ([0-9]{4}|'?[0-9]{2}) (([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(AM|PM)))$/));
        }, format:function (s) {
            return $.tablesorter.formatFloat(new Date(s).getTime());
        }, type:"numeric"
    });

    ts.addParser({
        id:"shortDate",
        is:function (s) {
            return /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/.test(s);
        }, format:function (s, table) {
            var c = table.config;
            s = s.replace(/\-/g, "/");
            if (c.dateFormat == "us") {
                // reformat the string in ISO format
                s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$1/$2");
            } else if (c.dateFormat == "uk") {
                // reformat the string in ISO format
                s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$2/$1");
            } else if (c.dateFormat == "dd/mm/yy" || c.dateFormat == "dd-mm-yy") {
                s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/, "$1/$2/$3");
            }
            return $.tablesorter.formatFloat(new Date(s).getTime());
        }, type:"numeric"
    });
    ts.addParser({
        id:"time",
        is:function (s) {
            return /^(([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(am|pm)))$/.test(s);
        }, format:function (s) {
            return $.tablesorter.formatFloat(new Date("2000/01/01 " + s).getTime());
        }, type:"numeric"
    });
    ts.addParser({
        id:"metadata",
        is:function (s) {
            return false;
        }, format:function (s, table, cell) {
            var c = table.config,
                p = (!c.parserMetadataName) ? 'sortValue' : c.parserMetadataName;
            return $(cell).metadata()[p];
        }, type:"numeric"
    });
    // add default widgets
    ts.addWidget({
        id:"zebra",
        format:function (table) {
            if (table.config.debug) {
                var time = new Date();
            }
            var $tr, row = -1,
                odd;
            // loop through the visible rows
            $("tr:visible", table.tBodies[0]).each(function (i) {
                $tr = $(this);
                // style children rows the same way the parent
                // row was styled
                if (!$tr.hasClass(table.config.cssChildRow)) row++;
                odd = (row % 2 == 0);
                $tr.removeClass(
                    table.config.widgetZebra.css[odd ? 0 : 1]).addClass(
                    table.config.widgetZebra.css[odd ? 1 : 0])
            });
            if (table.config.debug) {
                $.tablesorter.benchmark("Applying Zebra widget", time);
            }
        }
    });
})(jQuery);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//


;
