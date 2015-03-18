!function(root) {
    root.Parse = root.Parse || {};
    root.Parse.VERSION = "1.0.5";
}(this);

(function() {
    function eq(a, b, stack) {
        if (a === b) return 0 !== a || 1 / a == 1 / b;
        if (null == a || null == b) return a === b;
        a._chain && (a = a._wrapped);
        b._chain && (b = b._wrapped);
        if (a.isEqual && _.isFunction(a.isEqual)) return a.isEqual(b);
        if (b.isEqual && _.isFunction(b.isEqual)) return b.isEqual(a);
        var className = toString.call(a);
        if (className != toString.call(b)) return false;
        switch (className) {
          case "[object String]":
            return a == String(b);

          case "[object Number]":
            return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;

          case "[object Date]":
          case "[object Boolean]":
            return +a == +b;

          case "[object RegExp]":
            return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
        }
        if ("object" != typeof a || "object" != typeof b) return false;
        var length = stack.length;
        while (length--) if (stack[length] == a) return true;
        stack.push(a);
        var size = 0, result = true;
        if ("[object Array]" == className) {
            size = a.length;
            result = size == b.length;
            if (result) while (size--) if (!(result = size in a == size in b && eq(a[size], b[size], stack))) break;
        } else {
            if ("constructor" in a != "constructor" in b || a.constructor != b.constructor) return false;
            for (var key in a) if (_.has(a, key)) {
                size++;
                if (!(result = _.has(b, key) && eq(a[key], b[key], stack))) break;
            }
            if (result) {
                for (key in b) if (_.has(b, key) && !size--) break;
                result = !size;
            }
        }
        stack.pop();
        return result;
    }
    var root = this;
    var previousUnderscore = root._;
    var breaker = {};
    var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
    var slice = ArrayProto.slice, unshift = ArrayProto.unshift, toString = ObjProto.toString, hasOwnProperty = ObjProto.hasOwnProperty;
    var nativeForEach = ArrayProto.forEach, nativeMap = ArrayProto.map, nativeReduce = ArrayProto.reduce, nativeReduceRight = ArrayProto.reduceRight, nativeFilter = ArrayProto.filter, nativeEvery = ArrayProto.every, nativeSome = ArrayProto.some, nativeIndexOf = ArrayProto.indexOf, nativeLastIndexOf = ArrayProto.lastIndexOf, nativeIsArray = Array.isArray, nativeKeys = Object.keys, nativeBind = FuncProto.bind;
    var _ = function(obj) {
        return new wrapper(obj);
    };
    if ("undefined" != typeof exports) {
        "undefined" != typeof module && module.exports && (exports = module.exports = _);
        exports._ = _;
    } else root["_"] = _;
    _.VERSION = "1.3.3";
    var each = _.each = _.forEach = function(obj, iterator, context) {
        if (null == obj) return;
        if (nativeForEach && obj.forEach === nativeForEach) obj.forEach(iterator, context); else if (obj.length === +obj.length) {
            for (var i = 0, l = obj.length; l > i; i++) if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return;
        } else for (var key in obj) if (_.has(obj, key) && iterator.call(context, obj[key], key, obj) === breaker) return;
    };
    _.map = _.collect = function(obj, iterator, context) {
        var results = [];
        if (null == obj) return results;
        if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
        each(obj, function(value, index, list) {
            results[results.length] = iterator.call(context, value, index, list);
        });
        obj.length === +obj.length && (results.length = obj.length);
        return results;
    };
    _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
        var initial = arguments.length > 2;
        null == obj && (obj = []);
        if (nativeReduce && obj.reduce === nativeReduce) {
            context && (iterator = _.bind(iterator, context));
            return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
        }
        each(obj, function(value, index, list) {
            if (initial) memo = iterator.call(context, memo, value, index, list); else {
                memo = value;
                initial = true;
            }
        });
        if (!initial) throw new TypeError("Reduce of empty array with no initial value");
        return memo;
    };
    _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
        var initial = arguments.length > 2;
        null == obj && (obj = []);
        if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
            context && (iterator = _.bind(iterator, context));
            return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
        }
        var reversed = _.toArray(obj).reverse();
        context && !initial && (iterator = _.bind(iterator, context));
        return initial ? _.reduce(reversed, iterator, memo, context) : _.reduce(reversed, iterator);
    };
    _.find = _.detect = function(obj, iterator, context) {
        var result;
        any(obj, function(value, index, list) {
            if (iterator.call(context, value, index, list)) {
                result = value;
                return true;
            }
        });
        return result;
    };
    _.filter = _.select = function(obj, iterator, context) {
        var results = [];
        if (null == obj) return results;
        if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
        each(obj, function(value, index, list) {
            iterator.call(context, value, index, list) && (results[results.length] = value);
        });
        return results;
    };
    _.reject = function(obj, iterator, context) {
        var results = [];
        if (null == obj) return results;
        each(obj, function(value, index, list) {
            iterator.call(context, value, index, list) || (results[results.length] = value);
        });
        return results;
    };
    _.every = _.all = function(obj, iterator, context) {
        var result = true;
        if (null == obj) return result;
        if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
        each(obj, function(value, index, list) {
            if (!(result = result && iterator.call(context, value, index, list))) return breaker;
        });
        return !!result;
    };
    var any = _.some = _.any = function(obj, iterator, context) {
        iterator || (iterator = _.identity);
        var result = false;
        if (null == obj) return result;
        if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
        each(obj, function(value, index, list) {
            if (result || (result = iterator.call(context, value, index, list))) return breaker;
        });
        return !!result;
    };
    _.include = _.contains = function(obj, target) {
        var found = false;
        if (null == obj) return found;
        if (nativeIndexOf && obj.indexOf === nativeIndexOf) return -1 != obj.indexOf(target);
        found = any(obj, function(value) {
            return value === target;
        });
        return found;
    };
    _.invoke = function(obj, method) {
        var args = slice.call(arguments, 2);
        return _.map(obj, function(value) {
            return (_.isFunction(method) ? method || value : value[method]).apply(value, args);
        });
    };
    _.pluck = function(obj, key) {
        return _.map(obj, function(value) {
            return value[key];
        });
    };
    _.max = function(obj, iterator, context) {
        if (!iterator && _.isArray(obj) && obj[0] === +obj[0]) return Math.max.apply(Math, obj);
        if (!iterator && _.isEmpty(obj)) return -1/0;
        var result = {
            computed: -1/0
        };
        each(obj, function(value, index, list) {
            var computed = iterator ? iterator.call(context, value, index, list) : value;
            computed >= result.computed && (result = {
                value: value,
                computed: computed
            });
        });
        return result.value;
    };
    _.min = function(obj, iterator, context) {
        if (!iterator && _.isArray(obj) && obj[0] === +obj[0]) return Math.min.apply(Math, obj);
        if (!iterator && _.isEmpty(obj)) return 1/0;
        var result = {
            computed: 1/0
        };
        each(obj, function(value, index, list) {
            var computed = iterator ? iterator.call(context, value, index, list) : value;
            computed < result.computed && (result = {
                value: value,
                computed: computed
            });
        });
        return result.value;
    };
    _.shuffle = function(obj) {
        var rand, shuffled = [];
        each(obj, function(value, index) {
            rand = Math.floor(Math.random() * (index + 1));
            shuffled[index] = shuffled[rand];
            shuffled[rand] = value;
        });
        return shuffled;
    };
    _.sortBy = function(obj, val, context) {
        var iterator = _.isFunction(val) ? val : function(obj) {
            return obj[val];
        };
        return _.pluck(_.map(obj, function(value, index, list) {
            return {
                value: value,
                criteria: iterator.call(context, value, index, list)
            };
        }).sort(function(left, right) {
            var a = left.criteria, b = right.criteria;
            if (void 0 === a) return 1;
            if (void 0 === b) return -1;
            return b > a ? -1 : a > b ? 1 : 0;
        }), "value");
    };
    _.groupBy = function(obj, val) {
        var result = {};
        var iterator = _.isFunction(val) ? val : function(obj) {
            return obj[val];
        };
        each(obj, function(value, index) {
            var key = iterator(value, index);
            (result[key] || (result[key] = [])).push(value);
        });
        return result;
    };
    _.sortedIndex = function(array, obj, iterator) {
        iterator || (iterator = _.identity);
        var low = 0, high = array.length;
        while (high > low) {
            var mid = low + high >> 1;
            iterator(array[mid]) < iterator(obj) ? low = mid + 1 : high = mid;
        }
        return low;
    };
    _.toArray = function(obj) {
        if (!obj) return [];
        if (_.isArray(obj)) return slice.call(obj);
        if (_.isArguments(obj)) return slice.call(obj);
        if (obj.toArray && _.isFunction(obj.toArray)) return obj.toArray();
        return _.values(obj);
    };
    _.size = function(obj) {
        return _.isArray(obj) ? obj.length : _.keys(obj).length;
    };
    _.first = _.head = _.take = function(array, n, guard) {
        return null == n || guard ? array[0] : slice.call(array, 0, n);
    };
    _.initial = function(array, n, guard) {
        return slice.call(array, 0, array.length - (null == n || guard ? 1 : n));
    };
    _.last = function(array, n, guard) {
        return null == n || guard ? array[array.length - 1] : slice.call(array, Math.max(array.length - n, 0));
    };
    _.rest = _.tail = function(array, index, guard) {
        return slice.call(array, null == index || guard ? 1 : index);
    };
    _.compact = function(array) {
        return _.filter(array, function(value) {
            return !!value;
        });
    };
    _.flatten = function(array, shallow) {
        return _.reduce(array, function(memo, value) {
            if (_.isArray(value)) return memo.concat(shallow ? value : _.flatten(value));
            memo[memo.length] = value;
            return memo;
        }, []);
    };
    _.without = function(array) {
        return _.difference(array, slice.call(arguments, 1));
    };
    _.uniq = _.unique = function(array, isSorted, iterator) {
        var initial = iterator ? _.map(array, iterator) : array;
        var results = [];
        array.length < 3 && (isSorted = true);
        _.reduce(initial, function(memo, value, index) {
            if (isSorted ? _.last(memo) !== value || !memo.length : !_.include(memo, value)) {
                memo.push(value);
                results.push(array[index]);
            }
            return memo;
        }, []);
        return results;
    };
    _.union = function() {
        return _.uniq(_.flatten(arguments, true));
    };
    _.intersection = _.intersect = function(array) {
        var rest = slice.call(arguments, 1);
        return _.filter(_.uniq(array), function(item) {
            return _.every(rest, function(other) {
                return _.indexOf(other, item) >= 0;
            });
        });
    };
    _.difference = function(array) {
        var rest = _.flatten(slice.call(arguments, 1), true);
        return _.filter(array, function(value) {
            return !_.include(rest, value);
        });
    };
    _.zip = function() {
        var args = slice.call(arguments);
        var length = _.max(_.pluck(args, "length"));
        var results = new Array(length);
        for (var i = 0; length > i; i++) results[i] = _.pluck(args, "" + i);
        return results;
    };
    _.indexOf = function(array, item, isSorted) {
        if (null == array) return -1;
        var i, l;
        if (isSorted) {
            i = _.sortedIndex(array, item);
            return array[i] === item ? i : -1;
        }
        if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item);
        for (i = 0, l = array.length; l > i; i++) if (i in array && array[i] === item) return i;
        return -1;
    };
    _.lastIndexOf = function(array, item) {
        if (null == array) return -1;
        if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) return array.lastIndexOf(item);
        var i = array.length;
        while (i--) if (i in array && array[i] === item) return i;
        return -1;
    };
    _.range = function(start, stop, step) {
        if (arguments.length <= 1) {
            stop = start || 0;
            start = 0;
        }
        step = arguments[2] || 1;
        var len = Math.max(Math.ceil((stop - start) / step), 0);
        var idx = 0;
        var range = new Array(len);
        while (len > idx) {
            range[idx++] = start;
            start += step;
        }
        return range;
    };
    var ctor = function() {};
    _.bind = function(func, context) {
        var bound, args;
        if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
        if (!_.isFunction(func)) throw new TypeError();
        args = slice.call(arguments, 2);
        return bound = function() {
            if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
            ctor.prototype = func.prototype;
            var self = new ctor();
            var result = func.apply(self, args.concat(slice.call(arguments)));
            if (Object(result) === result) return result;
            return self;
        };
    };
    _.bindAll = function(obj) {
        var funcs = slice.call(arguments, 1);
        0 == funcs.length && (funcs = _.functions(obj));
        each(funcs, function(f) {
            obj[f] = _.bind(obj[f], obj);
        });
        return obj;
    };
    _.memoize = function(func, hasher) {
        var memo = {};
        hasher || (hasher = _.identity);
        return function() {
            var key = hasher.apply(this, arguments);
            return _.has(memo, key) ? memo[key] : memo[key] = func.apply(this, arguments);
        };
    };
    _.delay = function(func, wait) {
        var args = slice.call(arguments, 2);
        return setTimeout(function() {
            return func.apply(null, args);
        }, wait);
    };
    _.defer = function(func) {
        return _.delay.apply(_, [ func, 1 ].concat(slice.call(arguments, 1)));
    };
    _.throttle = function(func, wait) {
        var context, args, timeout, throttling, more, result;
        var whenDone = _.debounce(function() {
            more = throttling = false;
        }, wait);
        return function() {
            context = this;
            args = arguments;
            var later = function() {
                timeout = null;
                more && func.apply(context, args);
                whenDone();
            };
            timeout || (timeout = setTimeout(later, wait));
            throttling ? more = true : result = func.apply(context, args);
            whenDone();
            throttling = true;
            return result;
        };
    };
    _.debounce = function(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                immediate || func.apply(context, args);
            };
            immediate && !timeout && func.apply(context, args);
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };
    _.once = function(func) {
        var memo, ran = false;
        return function() {
            if (ran) return memo;
            ran = true;
            return memo = func.apply(this, arguments);
        };
    };
    _.wrap = function(func, wrapper) {
        return function() {
            var args = [ func ].concat(slice.call(arguments, 0));
            return wrapper.apply(this, args);
        };
    };
    _.compose = function() {
        var funcs = arguments;
        return function() {
            var args = arguments;
            for (var i = funcs.length - 1; i >= 0; i--) args = [ funcs[i].apply(this, args) ];
            return args[0];
        };
    };
    _.after = function(times, func) {
        if (0 >= times) return func();
        return function() {
            if (--times < 1) return func.apply(this, arguments);
        };
    };
    _.keys = nativeKeys || function(obj) {
        if (obj !== Object(obj)) throw new TypeError("Invalid object");
        var keys = [];
        for (var key in obj) _.has(obj, key) && (keys[keys.length] = key);
        return keys;
    };
    _.values = function(obj) {
        return _.map(obj, _.identity);
    };
    _.functions = _.methods = function(obj) {
        var names = [];
        for (var key in obj) _.isFunction(obj[key]) && names.push(key);
        return names.sort();
    };
    _.extend = function(obj) {
        each(slice.call(arguments, 1), function(source) {
            for (var prop in source) obj[prop] = source[prop];
        });
        return obj;
    };
    _.pick = function(obj) {
        var result = {};
        each(_.flatten(slice.call(arguments, 1)), function(key) {
            key in obj && (result[key] = obj[key]);
        });
        return result;
    };
    _.defaults = function(obj) {
        each(slice.call(arguments, 1), function(source) {
            for (var prop in source) null == obj[prop] && (obj[prop] = source[prop]);
        });
        return obj;
    };
    _.clone = function(obj) {
        if (!_.isObject(obj)) return obj;
        return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
    };
    _.tap = function(obj, interceptor) {
        interceptor(obj);
        return obj;
    };
    _.isEqual = function(a, b) {
        return eq(a, b, []);
    };
    _.isEmpty = function(obj) {
        if (null == obj) return true;
        if (_.isArray(obj) || _.isString(obj)) return 0 === obj.length;
        for (var key in obj) if (_.has(obj, key)) return false;
        return true;
    };
    _.isElement = function(obj) {
        return !!(obj && 1 == obj.nodeType);
    };
    _.isArray = nativeIsArray || function(obj) {
        return "[object Array]" == toString.call(obj);
    };
    _.isObject = function(obj) {
        return obj === Object(obj);
    };
    _.isArguments = function(obj) {
        return "[object Arguments]" == toString.call(obj);
    };
    _.isArguments(arguments) || (_.isArguments = function(obj) {
        return !!(obj && _.has(obj, "callee"));
    });
    _.isFunction = function(obj) {
        return "[object Function]" == toString.call(obj);
    };
    _.isString = function(obj) {
        return "[object String]" == toString.call(obj);
    };
    _.isNumber = function(obj) {
        return "[object Number]" == toString.call(obj);
    };
    _.isFinite = function(obj) {
        return _.isNumber(obj) && isFinite(obj);
    };
    _.isNaN = function(obj) {
        return obj !== obj;
    };
    _.isBoolean = function(obj) {
        return true === obj || false === obj || "[object Boolean]" == toString.call(obj);
    };
    _.isDate = function(obj) {
        return "[object Date]" == toString.call(obj);
    };
    _.isRegExp = function(obj) {
        return "[object RegExp]" == toString.call(obj);
    };
    _.isNull = function(obj) {
        return null === obj;
    };
    _.isUndefined = function(obj) {
        return void 0 === obj;
    };
    _.has = function(obj, key) {
        return hasOwnProperty.call(obj, key);
    };
    _.noConflict = function() {
        root._ = previousUnderscore;
        return this;
    };
    _.identity = function(value) {
        return value;
    };
    _.times = function(n, iterator, context) {
        for (var i = 0; n > i; i++) iterator.call(context, i);
    };
    _.escape = function(string) {
        return ("" + string).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
    };
    _.result = function(object, property) {
        if (null == object) return null;
        var value = object[property];
        return _.isFunction(value) ? value.call(object) : value;
    };
    _.mixin = function(obj) {
        each(_.functions(obj), function(name) {
            addToWrapper(name, _[name] = obj[name]);
        });
    };
    var idCounter = 0;
    _.uniqueId = function(prefix) {
        var id = idCounter++;
        return prefix ? prefix + id : id;
    };
    _.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var noMatch = /.^/;
    var escapes = {
        "\\": "\\",
        "'": "'",
        r: "\r",
        n: "\n",
        t: "	",
        u2028: "\u2028",
        u2029: "\u2029"
    };
    for (var p in escapes) escapes[escapes[p]] = p;
    var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    var unescaper = /\\(\\|'|r|n|t|u2028|u2029)/g;
    var unescape = function(code) {
        return code.replace(unescaper, function(match, escape) {
            return escapes[escape];
        });
    };
    _.template = function(text, data, settings) {
        settings = _.defaults(settings || {}, _.templateSettings);
        var source = "__p+='" + text.replace(escaper, function(match) {
            return "\\" + escapes[match];
        }).replace(settings.escape || noMatch, function(match, code) {
            return "'+\n_.escape(" + unescape(code) + ")+\n'";
        }).replace(settings.interpolate || noMatch, function(match, code) {
            return "'+\n(" + unescape(code) + ")+\n'";
        }).replace(settings.evaluate || noMatch, function(match, code) {
            return "';\n" + unescape(code) + "\n;__p+='";
        }) + "';\n";
        settings.variable || (source = "with(obj||{}){\n" + source + "}\n");
        source = "var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n" + source + "return __p;\n";
        var render = new Function(settings.variable || "obj", "_", source);
        if (data) return render(data, _);
        var template = function(data) {
            return render.call(this, data, _);
        };
        template.source = "function(" + (settings.variable || "obj") + "){\n" + source + "}";
        return template;
    };
    _.chain = function(obj) {
        return _(obj).chain();
    };
    var wrapper = function(obj) {
        this._wrapped = obj;
    };
    _.prototype = wrapper.prototype;
    var result = function(obj, chain) {
        return chain ? _(obj).chain() : obj;
    };
    var addToWrapper = function(name, func) {
        wrapper.prototype[name] = function() {
            var args = slice.call(arguments);
            unshift.call(args, this._wrapped);
            return result(func.apply(_, args), this._chain);
        };
    };
    _.mixin(_);
    each([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(name) {
        var method = ArrayProto[name];
        wrapper.prototype[name] = function() {
            var wrapped = this._wrapped;
            method.apply(wrapped, arguments);
            var length = wrapped.length;
            "shift" != name && "splice" != name || 0 !== length || delete wrapped[0];
            return result(wrapped, this._chain);
        };
    });
    each([ "concat", "join", "slice" ], function(name) {
        var method = ArrayProto[name];
        wrapper.prototype[name] = function() {
            return result(method.apply(this._wrapped, arguments), this._chain);
        };
    });
    wrapper.prototype.chain = function() {
        this._chain = true;
        return this;
    };
    wrapper.prototype.value = function() {
        return this._wrapped;
    };
}).call(this);

!function(root) {
    root.Parse = root.Parse || {};
    var Parse = root.Parse;
    if ("undefined" != typeof exports && exports._) {
        Parse._ = exports._.noConflict();
        exports.Parse = Parse;
    } else Parse._ = _.noConflict();
    "undefined" != typeof $ && (Parse.$ = $);
    var EmptyConstructor = function() {};
    var inherits = function(parent, protoProps, staticProps) {
        var child;
        child = protoProps && protoProps.hasOwnProperty("constructor") ? protoProps.constructor : function() {
            parent.apply(this, arguments);
        };
        Parse._.extend(child, parent);
        EmptyConstructor.prototype = parent.prototype;
        child.prototype = new EmptyConstructor();
        protoProps && Parse._.extend(child.prototype, protoProps);
        staticProps && Parse._.extend(child, staticProps);
        child.prototype.constructor = child;
        child.__super__ = parent.prototype;
        return child;
    };
    Parse.serverURL = "https://api.parse.com";
    Parse.initialize = function(applicationId, javaScriptKey) {
        Parse.applicationId = applicationId;
        Parse.javaScriptKey = javaScriptKey;
    };
    Parse._getParsePath = function(path) {
        if (!Parse.applicationId) throw "You need to call Parse.initialize before using Parse.";
        path || (path = "");
        if (!Parse._.isString(path)) throw "Tried to get a localStorage path that wasn't a String.";
        "/" === path[0] && (path = path.substring(1));
        return "Parse/" + Parse.applicationId + "/" + path;
    };
    Parse._installationId = null;
    Parse._getInstallationId = function() {
        if (Parse._installationId) return Parse._installationId;
        var path = Parse._getParsePath("installationId");
        Parse._installationId = Ti.App.Properties.getString(path);
        if (!Parse._installationId || "" === Parse._installationId) {
            var hexOctet = function() {
                return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
            };
            Parse._installationId = hexOctet() + hexOctet() + "-" + hexOctet() + "-" + hexOctet() + "-" + hexOctet() + "-" + hexOctet() + hexOctet() + hexOctet();
            Ti.App.Properties.setString(path, Parse._installationId);
        }
        return Parse._installationId;
    };
    Parse._parseDate = function(iso8601) {
        var regexp = new RegExp("^([0-9]{1,4})-([0-9]{1,2})-([0-9]{1,2})T([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})(.([0-9]+))?Z$");
        var match = regexp.exec(iso8601);
        if (!match) return null;
        var year = match[1] || 0;
        var month = (match[2] || 1) - 1;
        var day = match[3] || 0;
        var hour = match[4] || 0;
        var minute = match[5] || 0;
        var second = match[6] || 0;
        var milli = match[8] || 0;
        return new Date(Date.UTC(year, month, day, hour, minute, second, milli));
    };
    Parse._ajaxIE8 = function(method, url, data, success, error) {
        var xdr = new XDomainRequest();
        xdr.onload = function() {
            var response;
            try {
                response = JSON.parse(xdr.responseText);
            } catch (e) {
                error && error(xdr);
            }
            response && success && success(response, xdr);
        };
        xdr.onerror = xdr.ontimeout = function() {
            error(xdr);
        };
        xdr.onprogress = function() {};
        xdr.open(method, url);
        xdr.send(data);
    };
    Parse._ajax = function(method, url, data, success, error) {
        if ("undefined" != typeof XDomainRequest) return Parse._ajaxIE8(method, url, data, success, error);
        var xhr = Titanium.Network.createHTTPClient();
        xhr.onreadystatechange = function() {
            if (4 === xhr.readyState) if (xhr.status >= 200 && xhr.status < 300) {
                var response;
                try {
                    response = JSON.parse(xhr.responseText);
                } catch (e) {
                    error && error(xhr);
                }
                response && success && success(response, xhr);
            } else if (error) try {
                response = JSON.parse(xhr.responseText);
                error(response);
            } catch (e) {
                error(xhr);
            }
        };
        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-Type", "text/plain");
        xhr.send(data);
    };
    Parse._extend = function(protoProps, classProps) {
        var child = inherits(this, protoProps, classProps);
        child.extend = this.extend;
        return child;
    };
    Parse._request = function(route, className, objectId, method, dataObject, options) {
        if (!Parse.applicationId || !Parse.javaScriptKey) throw "You must specify your applicationId and javaScriptKey using Parse.initialize";
        if ("classes" !== route && "users" !== route && "login" !== route && "requestPasswordReset" !== route && "functions" !== route) throw "First argument must be one of classes, users, login, or functions not '" + route + "'.";
        var url = Parse.serverURL + "/1/" + route;
        className && (url += "/" + className);
        objectId && (url += "/" + objectId);
        dataObject = Parse._.clone(dataObject || {});
        if ("POST" !== method) {
            dataObject._method = method;
            method = "POST";
        }
        dataObject._ApplicationId = Parse.applicationId;
        dataObject._JavaScriptKey = Parse.javaScriptKey;
        dataObject._ClientVersion = "js" + Parse.VERSION;
        dataObject._InstallationId = Parse._getInstallationId();
        var currentUser = Parse.User.current();
        currentUser && currentUser._sessionToken && (dataObject._SessionToken = currentUser._sessionToken);
        var data = JSON.stringify(dataObject);
        Parse._ajax(method, url, data, options.success, options.error);
    };
    Parse._getValue = function(object, prop) {
        if (!(object && object[prop])) return null;
        return Parse._.isFunction(object[prop]) ? object[prop]() : object[prop];
    };
    Parse._encode = function(value) {
        var _ = Parse._;
        return value instanceof Parse.Object ? value._toPointer() : value instanceof Parse.ACL ? value.toJSON() : value instanceof Date ? {
            __type: "Date",
            iso: value.toJSON()
        } : _.isArray(value) ? _.map(value, Parse._encode) : _.isRegExp(value) ? value.source : value instanceof Parse.Relation ? value.toJSON() : value;
    };
    Parse._decode = function(key, value) {
        var _ = Parse._;
        if (_.isObject(value)) {
            if (_.isArray(value)) {
                _.each(value, function(v, k) {
                    value[k] = Parse._decode(k, v);
                });
                return value;
            }
            if (value instanceof Parse.Object) return value;
            if (value.objectId) {
                if ("Pointer" === value.__type) return Parse.Object._create(value.className, {
                    objectId: value.objectId
                });
                _.each(value, function(val, key) {
                    value[key] = Parse._decode(key, val);
                });
                return Parse.Object._create(value.className, value);
            }
            if ("Date" === value.__type) return Parse._parseDate(value.iso);
            if ("GeoPoint" === value.__type) return new Parse.GeoPoint({
                latitude: value.latitude,
                longitude: value.longitude
            });
            if ("ACL" === key) return value instanceof Parse.ACL ? value : new Parse.ACL(value);
            if ("Relation" === value.__type) {
                var relation = new Parse.Relation(this, key);
                relation.targetClassName = value.className;
                return relation;
            }
            return value;
        }
        return value;
    };
}(this);

!function(root) {
    root.Parse = root.Parse || {};
    var Parse = root.Parse;
    var _ = Parse._;
    Parse.Cloud = Parse.Cloud || {};
    _.extend(Parse.Cloud, {
        run: function(name, data, options) {
            Parse._request("functions", name, 0, "POST", Parse._encode(data, null, true), options);
        }
    });
}(this);

!function(root) {
    root.Parse = root.Parse || {};
    var Parse = root.Parse;
    var _ = Parse._;
    Parse.Relation = function(parent, key) {
        this.parent = parent;
        this.key = key;
        this.targetClassName = null;
        this.relationsToAdd = [];
        this.relationsToRemove = [];
    };
    Parse.Relation.prototype = {
        add: function(objects) {
            _.isArray(objects) || (objects = [ objects ]);
            this.targetClassName || (this.targetClassName = objects[0].className);
            var self = this;
            _.each(objects, function(object) {
                if (self.targetClassName !== object.className) throw "This relation is on objects of class:" + self.targetClassName + " but got object of class:" + object.className;
            });
            objects = _.map(objects, function(object) {
                return object.id;
            });
            this.relationsToAdd = _.union(this.relationsToAdd, objects);
            this.relationsToRemove = _.difference(this.relationsToRemove, objects);
        },
        remove: function(objects) {
            _.isArray(objects) || (objects = [ objects ]);
            this.targetClassName || (this.targetClassName = objects[0].className);
            var self = this;
            _.each(objects, function(object) {
                if (self.targetClassName !== object.className) throw "This relation is on objects of class:" + self.targetClassName + " but got object of class:" + object.className;
            });
            objects = _.map(objects, function(object) {
                return object.id;
            });
            this.relationsToRemove = _.union(this.relationsToRemove, objects);
            this.relationsToAdd = _.difference(this.relationsToAdd, objects);
        },
        _dirty: function() {
            return this.relationsToAdd.length > 0 || this.relationsToRemove.length > 0;
        },
        toJSON: function() {
            var adds = null;
            var removes = null;
            var self = this;
            var idToPointer = function(id) {
                return {
                    __type: "Pointer",
                    className: self.targetClassName,
                    objectId: id
                };
            };
            var pointers = null;
            if (this.relationsToAdd.length > 0) {
                pointers = _.map(this.relationsToAdd, idToPointer);
                adds = {
                    __op: "AddRelation",
                    objects: pointers
                };
            }
            if (this.relationsToRemove.length > 0) {
                pointers = _.map(this.relationsToRemove, idToPointer);
                removes = {
                    __op: "RemoveRelation",
                    objects: pointers
                };
            }
            if (adds && removes) return {
                __op: "Batch",
                ops: [ adds, removes ]
            };
            return adds || removes || {
                __type: "Relation",
                className: this.targetClassName
            };
        },
        query: function() {
            var targetClass = Parse.Object._getSubclass(this.targetClassName);
            var query = new Parse.Query(targetClass);
            query._addCondition("$relatedTo", "object", this.parent._toPointer());
            query._addCondition("$relatedTo", "key", this.key);
            return query;
        },
        _clearUpdates: function() {
            this.relationsToRemove = [];
            this.relationsToAdd = [];
        }
    };
}(this);

!function(root) {
    root.Parse = root.Parse || {};
    var Parse = root.Parse;
    var _ = Parse._;
    Parse.Error = function(code, message) {
        this.code = code;
        this.message = message;
    };
    _.extend(Parse.Error, {
        OTHER_CAUSE: -1,
        INTERNAL_SERVER_ERROR: 1,
        CONNECTION_FAILED: 100,
        OBJECT_NOT_FOUND: 101,
        INVALID_QUERY: 102,
        INVALID_CLASS_NAME: 103,
        MISSING_OBJECT_ID: 104,
        INVALID_KEY_NAME: 105,
        INVALID_POINTER: 106,
        INVALID_JSON: 107,
        COMMAND_UNAVAILABLE: 108,
        NOT_INITIALIZED: 109,
        INCORRECT_TYPE: 111,
        INVALID_CHANNEL_NAME: 112,
        PUSH_MISCONFIGURED: 115,
        OBJECT_TOO_LARGE: 116,
        OPERATION_FORBIDDEN: 119,
        CACHE_MISS: 120,
        INVALID_NESTED_KEY: 121,
        INVALID_FILE_NAME: 122,
        INVALID_ACL: 123,
        TIMEOUT: 124,
        INVALID_EMAIL_ADDRESS: 125,
        USERNAME_MISSING: 200,
        PASSWORD_MISSING: 201,
        USERNAME_TAKEN: 202,
        EMAIL_TAKEN: 203,
        EMAIL_MISSING: 204,
        EMAIL_NOT_FOUND: 205,
        SESSION_MISSING: 206,
        MUST_CREATE_USER_THROUGH_SIGNUP: 207,
        ACCOUNT_ALREADY_LINKED: 208,
        LINKED_ID_MISSING: 250,
        INVALID_LINKED_SESSION: 251,
        UNSUPPORTED_SERVICE: 252
    });
}(this);

(function() {
    var root = this;
    var Parse = root.Parse || (root.Parse = {});
    var eventSplitter = /\s+/;
    var slice = Array.prototype.slice;
    Parse.Events = {
        on: function(events, callback, context) {
            var calls, event, node, tail, list;
            if (!callback) return this;
            events = events.split(eventSplitter);
            calls = this._callbacks || (this._callbacks = {});
            event = events.shift();
            while (event) {
                list = calls[event];
                node = list ? list.tail : {};
                node.next = tail = {};
                node.context = context;
                node.callback = callback;
                calls[event] = {
                    tail: tail,
                    next: list ? list.next : node
                };
                event = events.shift();
            }
            return this;
        },
        off: function(events, callback, context) {
            var event, calls, node, tail, cb, ctx;
            if (!(calls = this._callbacks)) return;
            if (!(events || callback || context)) {
                delete this._callbacks;
                return this;
            }
            events = events ? events.split(eventSplitter) : _.keys(calls);
            event = events.shift();
            while (event) {
                node = calls[event];
                delete calls[event];
                if (!node || !(callback || context)) continue;
                tail = node.tail;
                node = node.next;
                while (node !== tail) {
                    cb = node.callback;
                    ctx = node.context;
                    (callback && cb !== callback || context && ctx !== context) && this.on(event, cb, ctx);
                    node = node.next;
                }
                event = events.shift();
            }
            return this;
        },
        trigger: function(events) {
            var event, node, calls, tail, args, all, rest;
            if (!(calls = this._callbacks)) return this;
            all = calls.all;
            events = events.split(eventSplitter);
            rest = slice.call(arguments, 1);
            event = events.shift();
            while (event) {
                node = calls[event];
                if (node) {
                    tail = node.tail;
                    while ((node = node.next) !== tail) node.callback.apply(node.context || this, rest);
                }
                node = all;
                if (node) {
                    tail = node.tail;
                    args = [ event ].concat(rest);
                    while ((node = node.next) !== tail) node.callback.apply(node.context || this, args);
                }
                event = events.shift();
            }
            return this;
        }
    };
    Parse.Events.bind = Parse.Events.on;
    Parse.Events.unbind = Parse.Events.off;
}).call(this);

!function(root) {
    root.Parse = root.Parse || {};
    var Parse = root.Parse;
    var _ = Parse._;
    Parse.GeoPoint = function(arg1, arg2) {
        if (_.isArray(arg1)) {
            Parse.GeoPoint._validate(arg1[0], arg1[1]);
            this.latitude = arg1[0];
            this.longitude = arg1[1];
        } else if (_.isObject(arg1)) {
            Parse.GeoPoint._validate(arg1.latitude, arg1.longitude);
            this.latitude = arg1.latitude;
            this.longitude = arg1.longitude;
        } else if (_.isNumber(arg1) && _.isNumber(arg2)) {
            Parse.GeoPoint._validate(arg1, arg2);
            this.latitude = arg1;
            this.longitude = arg2;
        } else {
            this.latitude = 0;
            this.longitude = 0;
        }
        var self = this;
        if (this.__defineGetter__ && this.__defineSetter__) {
            this._latitude = this.latitude;
            this._longitude = this.longitude;
            this.__defineGetter__("latitude", function() {
                return self._latitude;
            });
            this.__defineGetter__("longitude", function() {
                return self._longitude;
            });
            this.__defineSetter__("latitude", function(val) {
                Parse.GeoPoint._validate(val, self.longitude);
                self._latitude = val;
            });
            this.__defineSetter__("longitude", function(val) {
                Parse.GeoPoint._validate(self.latitude, val);
                self._longitude = val;
            });
        }
    };
    Parse.GeoPoint._validate = function(latitude, longitude) {
        if (-90 > latitude) throw "Parse.GeoPoint latitude " + latitude + " < -90.0.";
        if (latitude > 90) throw "Parse.GeoPoint latitude " + latitude + " > 90.0.";
        if (-180 > longitude) throw "Parse.GeoPoint longitude " + longitude + " < -180.0.";
        if (longitude > 180) throw "Parse.GeoPoint longitude " + longitude + " > 180.0.";
    };
    Parse.GeoPoint.current = function(options) {
        var success = function(location) {
            options.success && options.success(new Parse.GeoPoint({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }));
        };
        var error = function(e) {
            options.error && options.error(e);
        };
        navigator.geolocation.getCurrentPosition(success, error);
    };
    Parse.GeoPoint.prototype = {
        toJSON: function() {
            Parse.GeoPoint._validate(this.latitude, this.longitude);
            return {
                __type: "GeoPoint",
                latitude: this.latitude,
                longitude: this.longitude
            };
        },
        radiansTo: function(point) {
            var d2r = Math.PI / 180;
            var lat1rad = this.latitude * d2r;
            var long1rad = this.longitude * d2r;
            var lat2rad = point.latitude * d2r;
            var long2rad = point.longitude * d2r;
            var deltaLat = lat1rad - lat2rad;
            var deltaLong = long1rad - long2rad;
            var sinDeltaLatDiv2 = Math.sin(deltaLat / 2);
            var sinDeltaLongDiv2 = Math.sin(deltaLong / 2);
            var a = sinDeltaLatDiv2 * sinDeltaLatDiv2 + Math.cos(lat1rad) * Math.cos(lat2rad) * sinDeltaLongDiv2 * sinDeltaLongDiv2;
            a = Math.min(1, a);
            return 2 * Math.asin(Math.sqrt(a));
        },
        kilometersTo: function(point) {
            return 6371 * this.radiansTo(point);
        },
        milesTo: function(point) {
            return 3958.8 * this.radiansTo(point);
        }
    };
}(this);

!function(root) {
    root.Parse = root.Parse || {};
    var Parse = root.Parse;
    var _ = Parse._;
    var PUBLIC_KEY = "*";
    Parse.ACL = function(arg1) {
        var self = this;
        self.permissionsById = {};
        if (_.isObject(arg1)) if (arg1 instanceof Parse.User) {
            self.setReadAccess(arg1, true);
            self.setWriteAccess(arg1, true);
        } else {
            if (_.isFunction(arg1)) throw "Parse.ACL() called with a function.  Did you forget ()?";
            _.each(arg1, function(accessList, userId) {
                if (!_.isString(userId)) throw "Tried to create an ACL with an invalid userId.";
                self.permissionsById[userId] = {};
                _.each(accessList, function(allowed, permission) {
                    if ("read" !== permission && "write" !== permission) throw "Tried to create an ACL with an invalid permission type.";
                    if (!_.isBoolean(allowed)) throw "Tried to create an ACL with an invalid permission value.";
                    self.permissionsById[userId][permission] = allowed;
                });
            });
        }
    };
    Parse.ACL.prototype.toJSON = function() {
        return _.clone(this.permissionsById);
    };
    Parse.ACL.prototype._setAccess = function(accessType, userId, allowed) {
        userId instanceof Parse.User ? userId = userId.id : userId instanceof Parse.Role && (userId = "role:" + userId.getName());
        if (!_.isString(userId)) throw "userId must be a string.";
        if (!_.isBoolean(allowed)) throw "allowed must be either true or false.";
        var permissions = this.permissionsById[userId];
        if (!permissions) {
            if (!allowed) return;
            permissions = {};
            this.permissionsById[userId] = permissions;
        }
        if (allowed) this.permissionsById[userId][accessType] = true; else {
            delete permissions[accessType];
            _.isEmpty(permissions) && delete permissions[userId];
        }
    };
    Parse.ACL.prototype._getAccess = function(accessType, userId) {
        userId instanceof Parse.User ? userId = userId.id : userId instanceof Parse.Role && (userId = "role:" + userId.getName());
        var permissions = this.permissionsById[userId];
        if (!permissions) return false;
        return permissions[accessType] ? true : false;
    };
    Parse.ACL.prototype.setReadAccess = function(userId, allowed) {
        this._setAccess("read", userId, allowed);
    };
    Parse.ACL.prototype.getReadAccess = function(userId) {
        return this._getAccess("read", userId);
    };
    Parse.ACL.prototype.setWriteAccess = function(userId, allowed) {
        this._setAccess("write", userId, allowed);
    };
    Parse.ACL.prototype.getWriteAccess = function(userId) {
        return this._getAccess("write", userId);
    };
    Parse.ACL.prototype.setPublicReadAccess = function(allowed) {
        this.setReadAccess(PUBLIC_KEY, allowed);
    };
    Parse.ACL.prototype.getPublicReadAccess = function() {
        return this.getReadAccess(PUBLIC_KEY);
    };
    Parse.ACL.prototype.setPublicWriteAccess = function(allowed) {
        this.setWriteAccess(PUBLIC_KEY, allowed);
    };
    Parse.ACL.prototype.getPublicWriteAccess = function() {
        return this.getWriteAccess(PUBLIC_KEY);
    };
    Parse.ACL.prototype.getRoleReadAccess = function(role) {
        role instanceof Parse.Role && (role = role.getName());
        if (_.isString(role)) return this.getReadAccess("role:" + role);
        throw "role must be a Parse.Role or a String";
    };
    Parse.ACL.prototype.getRoleWriteAccess = function(role) {
        role instanceof Parse.Role && (role = role.getName());
        if (_.isString(role)) return this.getWriteAccess("role:" + role);
        throw "role must be a Parse.Role or a String";
    };
    Parse.ACL.prototype.setRoleReadAccess = function(role, allowed) {
        role instanceof Parse.Role && (role = role.getName());
        if (_.isString(role)) {
            this.setReadAccess("role:" + role, allowed);
            return;
        }
        throw "role must be a Parse.Role or a String";
    };
    Parse.ACL.prototype.setRoleWriteAccess = function(role, allowed) {
        role instanceof Parse.Role && (role = role.getName());
        if (_.isString(role)) {
            this.setWriteAccess("role:" + role, allowed);
            return;
        }
        throw "role must be a Parse.Role or a String";
    };
}(this);

!function(root) {
    root.Parse = root.Parse || {};
    var Parse = root.Parse;
    var _ = Parse._;
    var isNullOrUndefined = function(x) {
        return _.isNull(x) || _.isUndefined(x);
    };
    Parse.Object = function(attributes, options) {
        if (_.isString(attributes)) return Parse.Object._create.apply(this, arguments);
        attributes = attributes || {};
        options && options.parse && (attributes = this.parse(attributes));
        var defaults = Parse._getValue(this, "defaults");
        defaults && (attributes = _.extend({}, defaults, attributes));
        options && options.collection && (this.collection = options.collection);
        this.attributes = {};
        this._dirty = {};
        this._hashedJSON = {};
        this._escapedAttributes = {};
        this.cid = _.uniqueId("c");
        if (!this.set(attributes, {
            silent: true
        })) throw new Error("Can't create an invalid Parse.Object");
        delete this._changed;
        this._previousAttributes = _.clone(this.attributes);
        this.initialize.apply(this, arguments);
    };
    var _doAll = function(list, func, results, optionsOrCallback) {
        results = results || [];
        var options;
        if (_.isFunction(optionsOrCallback)) {
            var callback = optionsOrCallback;
            options = {
                success: function(list) {
                    callback(list, null);
                },
                error: function(e) {
                    callback(null, e);
                }
            };
        } else options = optionsOrCallback;
        if (list.length) {
            var oldOptions = options;
            var newOptions = options ? _.clone(options) : {};
            newOptions.success = function(model) {
                results.push(model);
                _doAll(list.slice(1), func, results, oldOptions);
            };
            func.call(this, list[0], newOptions);
        } else options.success && options.success(results);
    };
    Parse.Object.saveAll = function(list, optionsOrCallback) {
        _doAll(list, function(obj, options) {
            obj.save(null, options);
        }, [], optionsOrCallback);
    };
    Parse.Object._signUpAll = function(list, optionsOrCallback) {
        _doAll(list, function(obj, options) {
            obj.signUp(null, options);
        }, [], optionsOrCallback);
    };
    _.extend(Parse.Object.prototype, Parse.Events, {
        initialize: function() {},
        toJSON: function() {
            var json = _.clone(this.attributes);
            _.each([ "createdAt", "objectId", "updatedAt" ], function(key) {
                delete json[key];
            });
            _.each(json, function(val, key) {
                json[key] = Parse._encode(val);
            });
            return json;
        },
        _refreshCache: function() {
            var self = this;
            _.each(this.attributes, function(value, key) {
                if (value instanceof Parse.Object) value._refreshCache(); else if (_.isObject(value)) {
                    value.toJSON && (value = value.toJSON());
                    var json = JSON.stringify(value);
                    if (self._hashedJSON[key] !== json) {
                        self._hashedJSON[key] = json;
                        self._dirty[key] = true;
                    }
                }
            });
            _.each([ "createdAt", "objectId", "updatedAt" ], function(key) {
                delete self._dirty[key];
            });
        },
        dirty: function(attr) {
            this._refreshCache();
            if (!this.id) return true;
            if (attr) return this._dirty[attr] ? true : false;
            if (_.keys(this._dirty).length > 0) return true;
            return false;
        },
        _toPointer: function() {
            if (!this.id) throw new Error("Can't serialize an unsaved Parse.Object");
            return {
                __type: "Pointer",
                className: this.className,
                objectId: this.id
            };
        },
        get: function(attr) {
            return this.attributes[attr];
        },
        relation: function(attr) {
            var oldValue = this.get(attr);
            if (oldValue) {
                if (!(oldValue instanceof Parse.Relation)) throw attr + " does contain have a relation";
                return oldValue;
            }
            var returnValue = new Parse.Relation(this, attr);
            this.set(attr, returnValue);
            return returnValue;
        },
        escape: function(attr) {
            var html = this._escapedAttributes[attr];
            if (html) return html;
            var val = this.attributes[attr];
            var escaped;
            escaped = isNullOrUndefined(val) ? "" : _.escape(val.toString());
            this._escapedAttributes[attr] = escaped;
            return escaped;
        },
        has: function(attr) {
            return !isNullOrUndefined(this.attributes[attr]);
        },
        _mergeMagicFields: function(attrs) {
            var model = this;
            _.each([ "id", "objectId", "createdAt", "updatedAt" ], function(attr) {
                if (attrs[attr]) {
                    "objectId" === attr ? model.id = attrs[attr] : model[attr] = attrs[attr];
                    delete attrs[attr];
                }
            });
        },
        _handleSetOp: function(key, op) {
            if ("Batch" === op.__op) {
                var self = this;
                var success = true;
                _.each(op.ops, function(subOp) {
                    success = success && self._handleSetOp(key, subOp);
                });
            } else if ("Increment" === op.__op) {
                this.attributes[key] = this.attributes[key] || 0;
                this.attributes[key] += op.amount;
                this._dirty[key] = true;
            } else if ("AddRelation" === op.__op) {
                var relationForAdd = this.relation(key);
                relationForAdd.add(op.objects);
                this._dirty[key] = true;
            } else if ("RemoveRelation" === op.__op) {
                var relationForDelete = this.relation(key);
                relationForDelete.remove(op.objects);
                this._dirty[key] = true;
            } else {
                if ("Delete" !== op.__op) return false;
                this._dirty[key] = true;
                delete this.attributes[key];
            }
            return true;
        },
        set: function(key, value, options) {
            var attrs;
            if (_.isObject(key) || isNullOrUndefined(key)) {
                attrs = key;
                _.each(attrs, function(v, k) {
                    attrs[k] = Parse._decode(k, v);
                });
                options = value;
            } else {
                attrs = {};
                attrs[key] = Parse._decode(key, value);
            }
            options = options || {};
            if (!attrs) return this;
            attrs instanceof Parse.Object && (attrs = attrs.attributes);
            options.unset && _.each(attrs, function(unused_value, attr) {
                attrs[attr] = void 0;
            });
            if (!this._validate(attrs, options)) return false;
            this._mergeMagicFields(attrs);
            var now = this.attributes;
            var escaped = this._escapedAttributes;
            var prev = this._previousAttributes || {};
            var alreadySetting = this._setting;
            this._changed = this._changed || {};
            this._setting = true;
            var self = this;
            _.each(_.keys(attrs), function(attr) {
                var val = attrs[attr];
                val instanceof Parse.Relation && (val.parent = self);
                var handledOp = false;
                if (_.isObject(val) && _.has(val, "__op")) handledOp = self._handleSetOp(attr, val); else {
                    _.isEqual(now[attr], val) || delete escaped[attr];
                    if (options.unset) {
                        delete now[attr];
                        self._dirty[attr] = true;
                    } else {
                        now[attr] = val;
                        self._dirty[attr] = true;
                    }
                }
                if (self._changing && !_.isEqual(self._changed[attr], val)) {
                    self.trigger("change:" + attr, self, val, options);
                    self._moreChanges = true;
                }
                delete self._changed[attr];
                (!_.isEqual(prev[attr], val) || handledOp || _.has(now, attr) !== _.has(prev, attr)) && (self._changed[attr] = val);
            });
            if (!alreadySetting) {
                !options.silent && this.hasChanged() && this.change(options);
                this._setting = false;
            }
            return this;
        },
        unset: function(attr, options) {
            options = options || {};
            options.unset = true;
            return this.set(attr, null, options);
        },
        clear: function(options) {
            options = options || {};
            options.unset = true;
            return this.set(_.clone(this.attributes), options);
        },
        fetch: function(options) {
            options = options ? _.clone(options) : {};
            var model = this;
            var success = options.success;
            options.success = function(resp, status, xhr) {
                if (!model.set(model.parse(resp, xhr), options)) return false;
                if (success) {
                    model._refreshCache();
                    model._dirty = {};
                    success(model, resp);
                }
            };
            options.error = Parse.Object._wrapError(options.error, model, options);
            Parse._request("classes", model.className, model.id, "GET", null, options);
        },
        save: function(arg1, arg2, arg3) {
            var i, attrs, current, options;
            if (_.isObject(arg1) || isNullOrUndefined(arg1)) {
                attrs = arg1;
                options = arg2;
            } else {
                attrs = {};
                attrs[arg1] = arg2;
                options = arg3;
            }
            if (!options && attrs) {
                var extra_keys = _.reject(attrs, function(value, key) {
                    return _.include([ "success", "error", "wait" ], key);
                });
                if (0 === extra_keys.length) {
                    var all_functions = true;
                    _.has(attrs, "success") && !_.isFunction(attrs.success) && (all_functions = false);
                    _.has(attrs, "error") && !_.isFunction(attrs.error) && (all_functions = false);
                    if (all_functions) return this.save(null, attrs);
                }
            }
            options = options ? _.clone(options) : {};
            options.wait && (current = _.clone(this.attributes));
            var silentOptions = _.extend({}, options, {
                silent: true
            });
            if (attrs && !this.set(attrs, options.wait ? silentOptions : options)) return false;
            var oldOptions = options;
            var newOptions = _.clone(options);
            var model = this;
            var saveThisModel = function() {
                model.save(null, oldOptions);
            };
            model._refreshCache();
            var keys = _.keys(model.attributes);
            for (i = 0; i < keys.length; ++i) {
                var key = keys[i];
                var child = model.attributes[key];
                if (child instanceof Parse.Object) {
                    if (child.dirty()) {
                        newOptions.success = saveThisModel;
                        child.save(null, newOptions);
                        return this;
                    }
                } else child instanceof Parse.Relation && child._dirty() && (model._dirty[key] = true);
            }
            var savedData = _.clone(model.attributes);
            newOptions.success = function(resp, status, xhr) {
                var serverAttrs = model.parse(resp, xhr);
                newOptions.wait && (serverAttrs = _.extend(attrs || {}, serverAttrs));
                if (!model.set(serverAttrs, newOptions)) return false;
                _.keys(model.attributes);
                _.each(model.attributes, function(child) {
                    child instanceof Parse.Relation && child._clearUpdates();
                });
                if (oldOptions.success) {
                    model._refreshCache();
                    _.each(savedData, function(savedValue, savedKey) {
                        if (savedValue === model.get(savedKey)) {
                            var dirty = model._dirty;
                            delete dirty[savedKey];
                        }
                    });
                    oldOptions.success(model, resp);
                } else model.trigger("sync", model, resp, newOptions);
            };
            newOptions.error = Parse.Object._wrapError(oldOptions.error, model, newOptions);
            var method = this.id ? "PUT" : "POST";
            var json = this.toJSON();
            model._refreshCache();
            _.each(json, function(value, key) {
                model._dirty[key] || delete json[key];
            });
            var route = "classes";
            var className = this.className;
            if ("_User" === this.className && !this.id) {
                route = "users";
                className = null;
            }
            Parse._request(route, className, this.id, method, json, newOptions);
            newOptions.wait && this.set(current, silentOptions);
            return this;
        },
        destroy: function(options) {
            options = options ? _.clone(options) : {};
            var model = this;
            var success = options.success;
            var triggerDestroy = function() {
                model.trigger("destroy", model, model.collection, options);
            };
            if (!this.id) return triggerDestroy();
            options.success = function(resp) {
                options.wait && triggerDestroy();
                success ? success(model, resp) : model.trigger("sync", model, resp, options);
            };
            options.error = Parse.Object._wrapError(options.error, model, options);
            Parse._request("classes", this.className, this.id, "DELETE", null, options);
            options.wait || triggerDestroy();
        },
        parse: function(resp) {
            var output = _.clone(resp);
            _([ "createdAt", "updatedAt" ]).each(function(key) {
                output[key] && (output[key] = Parse._parseDate(output[key]));
            });
            output.updatedAt || (output.updatedAt = output.createdAt);
            return output;
        },
        clone: function() {
            return new this.constructor(this.attributes);
        },
        isNew: function() {
            return !this.id;
        },
        change: function(options) {
            var self = this;
            if (this._changing || !this.hasChanged()) return this;
            this._changing = true;
            this._moreChanges = true;
            _.each(this._changed, function(value, attr) {
                self.trigger("change:" + attr, self, value, options);
            });
            while (this._moreChanges) {
                this._moreChanges = false;
                this.trigger("change", this, options);
            }
            this._previousAttributes = _.clone(this.attributes);
            delete this._changed;
            this._changing = false;
            return this;
        },
        hasChanged: function(attr) {
            if (!arguments.length) return !_.isEmpty(this._changed);
            return this._changed && _.has(this._changed, attr);
        },
        changedAttributes: function(diff) {
            if (!diff) return this.hasChanged() ? _.clone(this._changed) : false;
            var changed = {};
            var old = this._previousAttributes;
            _.each(diff, function(diffVal, attr) {
                _.isEqual(old[attr], diffVal) || (changed[attr] = diffVal);
            });
            return changed;
        },
        previous: function(attr) {
            if (!arguments.length || !this._previousAttributes) return null;
            return this._previousAttributes[attr];
        },
        previousAttributes: function() {
            return _.clone(this._previousAttributes);
        },
        isValid: function() {
            return !this.validate(this.attributes);
        },
        validate: function(attrs) {
            if (_.has(attrs, "ACL") && !(attrs.ACL instanceof Parse.ACL)) return new Parse.Error(Parse.Error.OTHER_CAUSE, "ACL must be a Parse.ACL.");
            return false;
        },
        _validate: function(attrs, options) {
            if (options.silent || !this.validate) return true;
            attrs = _.extend({}, this.attributes, attrs);
            var error = this.validate(attrs, options);
            if (!error) return true;
            options && options.error ? options.error(this, error, options) : this.trigger("error", this, error, options);
            return false;
        },
        getACL: function() {
            return this.get("ACL");
        },
        setACL: function(acl, options) {
            return this.set("ACL", acl, options);
        }
    });
    Parse.Object._getSubclass = function(className) {
        if (!_.isString(className)) throw "Parse.Object._getSubclass requires a string argument.";
        var ObjectClass = Parse.Object._classMap[className];
        if (!ObjectClass) {
            ObjectClass = Parse.Object.extend(className);
            Parse.Object._classMap[className] = ObjectClass;
        }
        return ObjectClass;
    };
    Parse.Object._create = function(className, attributes, options) {
        var ObjectClass = Parse.Object._getSubclass(className);
        return new ObjectClass(attributes, options);
    };
    Parse.Object._classMap = {};
    Parse.Object._extend = Parse._extend;
    Parse.Object.extend = function(className, protoProps, classProps) {
        if (!_.isString(className)) {
            if (className && _.has(className, "className")) return Parse.Object.extend(className.className, className, protoProps);
            throw new Error("Parse.Object.extend's first argument should be the className.");
        }
        "User" === className && (className = "_User");
        var NewClassObject = null;
        if (_.has(Parse.Object._classMap, className)) {
            var OldClassObject = Parse.Object._classMap[className];
            NewClassObject = OldClassObject._extend(protoProps, classProps);
        } else {
            protoProps = protoProps || {};
            protoProps.className = className;
            NewClassObject = Parse.Object._extend(protoProps, classProps);
        }
        NewClassObject.extend = function(arg0) {
            if (_.isString(arg0) || arg0 && _.has(arg0, "className")) return Parse.Object.extend.apply(NewClassObject, arguments);
            var newArguments = [ className ].concat(Parse._.toArray(arguments));
            return Parse.Object.extend.apply(NewClassObject, newArguments);
        };
        Parse.Object._classMap[className] = NewClassObject;
        return NewClassObject;
    };
    Parse.Object._wrapError = function(onError, originalModel, options) {
        return function(model, response) {
            model !== originalModel && (response = model);
            var error = new Parse.Error(-1, response.responseText);
            if (response.responseText) try {
                var errorJSON = JSON.parse(response.responseText);
                errorJSON && (error = new Parse.Error(errorJSON.code, errorJSON.error));
            } catch (e) {}
            onError ? onError(originalModel, error, options) : originalModel.trigger("error", originalModel, error, options);
        };
    };
}(this);

!function(root) {
    root.Parse = root.Parse || {};
    var Parse = root.Parse;
    var _ = Parse._;
    Parse.Role = Parse.Object.extend("_Role", {
        constructor: function(name, acl) {
            if (_.isString(name) && acl instanceof Parse.ACL) {
                Parse.Object.prototype.constructor.call(this, null, null);
                this.setName(name);
                this.setACL(acl);
            } else Parse.Object.prototype.constructor.call(this, name, acl);
        },
        getName: function() {
            return this.get("name");
        },
        setName: function(name, options) {
            return this.set("name", name, options);
        },
        getUsers: function() {
            return this.relation("users");
        },
        getRoles: function() {
            return this.relation("roles");
        },
        validate: function(attrs, options) {
            if ("name" in attrs && attrs.name !== this.getName()) {
                var newName = attrs.name;
                if (this.id && this.id !== attrs.objectId) return new Parse.Error(Parse.Error.OTHER_CAUSE, "A role's name can only be set before it has been saved.");
                if (!_.isString(newName)) return new Parse.Error(Parse.Error.OTHER_CAUSE, "A role's name must be a String.");
                if (!/^[a-zA-Z\-_ ]+$/.test(newName)) return new Parse.Error(Parse.Error.OTHER_CAUSE, "A role's name can only contain alphanumeric characters, _, -, and spaces.");
            }
            if (Parse.Object.prototype.validate) return Parse.Object.prototype.validate.call(this, attrs, options);
            return false;
        }
    });
}(this);

!function(root) {
    root.Parse = root.Parse || {};
    var Parse = root.Parse;
    var _ = Parse._;
    var isNullOrUndefined = function(x) {
        return _.isNull(x) || _.isUndefined(x);
    };
    Parse.Collection = function(models, options) {
        options = options || {};
        options.comparator && (this.comparator = options.comparator);
        options.model && (this.model = options.model);
        options.query && (this.query = options.query);
        this._reset();
        this.initialize.apply(this, arguments);
        models && this.reset(models, {
            silent: true,
            parse: options.parse
        });
    };
    _.extend(Parse.Collection.prototype, Parse.Events, {
        model: Parse.Object,
        initialize: function() {},
        toJSON: function() {
            return this.map(function(model) {
                return model.toJSON();
            });
        },
        add: function(models, options) {
            var i, index, length, model, cid, id, cids = {}, ids = {};
            options = options || {};
            models = _.isArray(models) ? models.slice() : [ models ];
            for (i = 0, length = models.length; length > i; i++) {
                models[i] = this._prepareModel(models[i], options);
                model = models[i];
                if (!model) throw new Error("Can't add an invalid model to a collection");
                cid = model.cid;
                if (cids[cid] || this._byCid[cid]) throw new Error("Duplicate cid: can't add the same model to a collection twice");
                id = model.id;
                if (!isNullOrUndefined(id) && (ids[id] || this._byId[id])) throw new Error("Duplicate id: can't add the same model to a collection twice");
                ids[id] = model;
                cids[cid] = model;
            }
            for (i = 0; length > i; i++) {
                (model = models[i]).on("all", this._onModelEvent, this);
                this._byCid[model.cid] = model;
                model.id && (this._byId[model.id] = model);
            }
            this.length += length;
            index = options.at || this.models.length;
            this.models.splice.apply(this.models, [ index, 0 ].concat(models));
            this.comparator && this.sort({
                silent: true
            });
            if (options.silent) return this;
            for (i = 0, length = this.models.length; length > i; i++) {
                model = this.models[i];
                if (cids[model.cid]) {
                    options.index = i;
                    model.trigger("add", model, this, options);
                }
            }
            return this;
        },
        remove: function(models, options) {
            var i, l, index, model;
            options = options || {};
            models = _.isArray(models) ? models.slice() : [ models ];
            for (i = 0, l = models.length; l > i; i++) {
                model = this.getByCid(models[i]) || this.get(models[i]);
                if (!model) continue;
                delete this._byId[model.id];
                delete this._byCid[model.cid];
                index = this.indexOf(model);
                this.models.splice(index, 1);
                this.length--;
                if (!options.silent) {
                    options.index = index;
                    model.trigger("remove", model, this, options);
                }
                this._removeReference(model);
            }
            return this;
        },
        get: function(id) {
            return id && this._byId[id.id || id];
        },
        getByCid: function(cid) {
            return cid && this._byCid[cid.cid || cid];
        },
        at: function(index) {
            return this.models[index];
        },
        sort: function(options) {
            options = options || {};
            if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
            var boundComparator = _.bind(this.comparator, this);
            1 === this.comparator.length ? this.models = this.sortBy(boundComparator) : this.models.sort(boundComparator);
            options.silent || this.trigger("reset", this, options);
            return this;
        },
        pluck: function(attr) {
            return _.map(this.models, function(model) {
                return model.get(attr);
            });
        },
        reset: function(models, options) {
            var self = this;
            models = models || [];
            options = options || {};
            _.each(this.models, function(model) {
                self._removeReference(model);
            });
            this._reset();
            this.add(models, {
                silent: true,
                parse: options.parse
            });
            options.silent || this.trigger("reset", this, options);
            return this;
        },
        fetch: function(options) {
            options = options ? _.clone(options) : {};
            void 0 === options.parse && (options.parse = true);
            var collection = this;
            var success = options.success;
            options.success = function(results, resp) {
                options.add ? collection.add(results, options) : collection.reset(results, options);
                success && success(collection, resp);
            };
            options.error = Parse.Object._wrapError(options.error, collection, options);
            var query = this.query || new Parse.Query(this.model);
            query.find(options);
        },
        create: function(model, options) {
            var coll = this;
            options = options ? _.clone(options) : {};
            model = this._prepareModel(model, options);
            if (!model) return false;
            options.wait || coll.add(model, options);
            var success = options.success;
            options.success = function(nextModel, resp) {
                options.wait && coll.add(nextModel, options);
                success ? success(nextModel, resp) : nextModel.trigger("sync", model, resp, options);
            };
            model.save(null, options);
            return model;
        },
        parse: function(resp) {
            return resp;
        },
        chain: function() {
            return _(this.models).chain();
        },
        _reset: function() {
            this.length = 0;
            this.models = [];
            this._byId = {};
            this._byCid = {};
        },
        _prepareModel: function(model, options) {
            if (model instanceof Parse.Object) model.collection || (model.collection = this); else {
                var attrs = model;
                options.collection = this;
                model = new this.model(attrs, options);
                model._validate(model.attributes, options) || (model = false);
            }
            return model;
        },
        _removeReference: function(model) {
            this === model.collection && delete model.collection;
            model.off("all", this._onModelEvent, this);
        },
        _onModelEvent: function(ev, model, collection, options) {
            if (("add" === ev || "remove" === ev) && collection !== this) return;
            "destroy" === ev && this.remove(model, options);
            if (model && "change:objectId" === ev) {
                delete this._byId[model.previous("objectId")];
                this._byId[model.id] = model;
            }
            this.trigger.apply(this, arguments);
        }
    });
    var methods = [ "forEach", "each", "map", "reduce", "reduceRight", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "sortBy", "sortedIndex", "toArray", "size", "first", "initial", "rest", "last", "without", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "groupBy" ];
    _.each(methods, function(method) {
        Parse.Collection.prototype[method] = function() {
            return _[method].apply(_, [ this.models ].concat(_.toArray(arguments)));
        };
    });
    Parse.Collection.extend = Parse._extend;
}(this);

!function(root) {
    root.Parse = root.Parse || {};
    var Parse = root.Parse;
    var _ = Parse._;
    Parse.View = function(options) {
        this.cid = _.uniqueId("view");
        this._configure(options || {});
        this._ensureElement();
        this.initialize.apply(this, arguments);
        this.delegateEvents();
    };
    var eventSplitter = /^(\S+)\s*(.*)$/;
    var viewOptions = [ "model", "collection", "el", "id", "attributes", "className", "tagName" ];
    _.extend(Parse.View.prototype, Parse.Events, {
        tagName: "div",
        $: function(selector) {
            return this.$el.find(selector);
        },
        initialize: function() {},
        render: function() {
            return this;
        },
        remove: function() {
            this.$el.remove();
            return this;
        },
        make: function(tagName, attributes, content) {
            var el = document.createElement(tagName);
            attributes && Parse.$(el).attr(attributes);
            content && Parse.$(el).html(content);
            return el;
        },
        setElement: function(element, delegate) {
            this.$el = Parse.$(element);
            this.el = this.$el[0];
            false !== delegate && this.delegateEvents();
            return this;
        },
        delegateEvents: function(events) {
            events = events || Parse._getValue(this, "events");
            if (!events) return;
            this.undelegateEvents();
            var self = this;
            _.each(events, function(method, key) {
                _.isFunction(method) || (method = self[events[key]]);
                if (!method) throw new Error('Event "' + events[key] + '" does not exist');
                var match = key.match(eventSplitter);
                var eventName = match[1], selector = match[2];
                method = _.bind(method, self);
                eventName += ".delegateEvents" + self.cid;
                "" === selector ? self.$el.bind(eventName, method) : self.$el.delegate(selector, eventName, method);
            });
        },
        undelegateEvents: function() {
            this.$el.unbind(".delegateEvents" + this.cid);
        },
        _configure: function(options) {
            this.options && (options = _.extend({}, this.options, options));
            var self = this;
            _.each(viewOptions, function(attr) {
                options[attr] && (self[attr] = options[attr]);
            });
            this.options = options;
        },
        _ensureElement: function() {
            if (this.el) this.setElement(this.el, false); else {
                var attrs = Parse._getValue(this, "attributes") || {};
                this.id && (attrs.id = this.id);
                this.className && (attrs["class"] = this.className);
                this.setElement(this.make(this.tagName, attrs), false);
            }
        }
    });
    Parse.View.extend = Parse._extend;
}(this);

!function(root) {
    root.Parse = root.Parse || {};
    var Parse = root.Parse;
    var _ = Parse._;
    Parse.User = Parse.Object.extend("_User", {
        _isCurrentUser: false,
        _mergeMagicFields: function(attrs) {
            if (attrs.sessionToken) {
                this._sessionToken = attrs.sessionToken;
                delete attrs.sessionToken;
            }
            Parse.User.__super__._mergeMagicFields.call(this, attrs);
        },
        _handleSaveResult: function(makeCurrent) {
            this.unset("password");
            var dirty = this._dirty;
            delete dirty.password;
            this._refreshCache();
            (makeCurrent || this.isCurrent()) && Parse.User._saveCurrentUser(this);
        },
        signUp: function(attrs, options) {
            var error;
            var username = attrs && attrs.username || this.get("username");
            if (!username || "" === username) {
                if (options && options.error) {
                    error = new Parse.Error(Parse.Error.OTHER_CAUSE, "Cannot sign up user with an empty name.");
                    options.error(this, error);
                }
                return false;
            }
            var password = attrs && attrs.password || this.get("password");
            if (!password || "" === password) {
                if (options && options.error) {
                    error = new Parse.Error(Parse.Error.OTHER_CAUSE, "Cannot sign up user with an empty password.");
                    options.error(this, error);
                }
                return false;
            }
            var newOptions = _.clone(options);
            newOptions.success = function(model) {
                model._handleSaveResult(true);
                options.success && options.success.apply(this, arguments);
            };
            return this.save(attrs, newOptions);
        },
        logIn: function(options) {
            var model = this;
            var newOptions = _.clone(options);
            newOptions.success = function(resp, status, xhr) {
                var serverAttrs = model.parse(resp, xhr);
                if (!model.set(serverAttrs, newOptions)) return false;
                model._handleSaveResult(true);
                options.success ? options.success(model, resp) : model.trigger("sync", model, resp, newOptions);
            };
            newOptions.error = Parse.Object._wrapError(options.error, model, newOptions);
            Parse._request("login", null, null, "GET", this.toJSON(), newOptions);
        },
        save: function(arg1, arg2, arg3) {
            var attrs, options;
            if (_.isObject(arg1) || _.isNull(arg1) || _.isUndefined(arg1)) {
                attrs = arg1;
                options = arg2;
            } else {
                attrs = {};
                attrs[arg1] = arg2;
                options = arg3;
            }
            var newOptions = _.clone(options);
            newOptions.success = function(model) {
                model._handleSaveResult(false);
                options.success && options.success.apply(this, arguments);
            };
            return Parse.Object.prototype.save.call(this, attrs, newOptions);
        },
        fetch: function(options) {
            var newOptions = _.clone(options);
            newOptions.success = function(model) {
                model._handleSaveResult(false);
                options.success && options.success.apply(this, arguments);
            };
            return Parse.Object.prototype.fetch.call(this, newOptions);
        },
        isCurrent: function() {
            return this._isCurrentUser;
        },
        getUsername: function() {
            return this.get("username");
        },
        setUsername: function(username, options) {
            return this.set("username", username, options);
        },
        setPassword: function(password, options) {
            return this.set("password", password, options);
        },
        getEmail: function() {
            return this.get("email");
        },
        setEmail: function(email, options) {
            return this.set("email", email, options);
        }
    }, {
        _currentUser: null,
        _currentUserMatchesDisk: false,
        _CURRENT_USER_KEY: "currentUser",
        signUp: function(username, password, attrs, options) {
            attrs = attrs || {};
            attrs.username = username;
            attrs.password = password;
            var user = Parse.Object._create("_User");
            return user.signUp(attrs, options);
        },
        logIn: function(username, password, options) {
            var user = Parse.Object._create("_User");
            user.set("username", username);
            user.set("password", password);
            user.logIn(options);
        },
        logOut: function() {
            null !== Parse.User._currentUser && (Parse.User._currentUser._isCurrentUser = false);
            Parse.User._currentUserMatchesDisk = true;
            Parse.User._currentUser = null;
            Ti.App.Properties.removeProperty(Parse._getParsePath(Parse.User._CURRENT_USER_KEY));
        },
        requestPasswordReset: function(email, options) {
            var json = {
                email: email
            };
            options.error = Parse.Query._wrapError(options.error, options);
            Parse._request("requestPasswordReset", null, null, "POST", json, options);
        },
        current: function() {
            if (Parse.User._currentUser) return Parse.User._currentUser;
            if (Parse.User._currentUserMatchesDisk) return Parse.User._currentUser;
            Parse.User._currentUserMatchesDisk = true;
            var userData = Ti.App.Properties.getString(Parse._getParsePath(Parse.User._CURRENT_USER_KEY));
            if (!userData) return null;
            Parse.User._currentUser = new Parse.Object._create("_User");
            Parse.User._currentUser._isCurrentUser = true;
            try {
                var json = JSON.parse(userData);
                Parse.User._currentUser.id = json._id;
                delete json._id;
                Parse.User._currentUser._sessionToken = json._sessionToken;
                delete json._sessionToken;
                Parse.User._currentUser.set(json);
                Parse.User._currentUser._refreshCache();
                Parse.User._currentUser._dirty = {};
                return Parse.User._currentUser;
            } catch (e) {
                Ti.API.info(JSON.stringify(e));
                return Parse.User._currentUser;
            }
        },
        _saveCurrentUser: function(user) {
            Parse.User._currentUser !== user && Parse.User.logOut();
            user._isCurrentUser = true;
            Parse.User._currentUser = user;
            Parse.User._currentUserMatchesDisk = true;
            var json = user.toJSON();
            json._id = user.id;
            json._sessionToken = user._sessionToken;
            Ti.App.Properties.setString(Parse._getParsePath(Parse.User._CURRENT_USER_KEY), JSON.stringify(json));
        }
    });
}(this);

!function(root) {
    root.Parse = root.Parse || {};
    var Parse = root.Parse;
    var _ = Parse._;
    Parse.Query = function(objectClass) {
        _.isString(objectClass) && (objectClass = Parse.Object._getSubclass(objectClass));
        this.objectClass = objectClass;
        this.className = objectClass.prototype.className;
        this._where = {};
        this._include = [];
        this._limit = -1;
        this._skip = 0;
    };
    Parse.Query.prototype = {
        get: function(objectId, options) {
            var object = new this.objectClass({
                objectId: objectId
            });
            object.fetch(options);
        },
        toJSON: function() {
            var params = {
                where: this._where
            };
            this._include.length > 0 && (params.include = this._include.join(","));
            this._limit >= 0 && (params.limit = this._limit);
            this._skip > 0 && (params.skip = this._skip);
            void 0 !== this._order && (params.order = this._order);
            return params;
        },
        find: function(options) {
            var self = this;
            var success = options.success;
            var ajaxOptions = {
                error: options.error,
                success: function(response) {
                    success(_.map(response.results, function(json) {
                        var obj = new self.objectClass(json);
                        obj._refreshCache();
                        obj._dirty = {};
                        return obj;
                    }));
                }
            };
            var params = this.toJSON();
            ajaxOptions.error = Parse.Query._wrapError(options.error, ajaxOptions);
            Parse._request("classes", this.className, null, "GET", params, ajaxOptions);
        },
        count: function(options) {
            var success = options.success;
            var ajaxOptions = {
                error: options.error,
                success: function(response) {
                    success(response.count);
                }
            };
            var params = this.toJSON();
            params.limit = 0;
            params.count = 1;
            ajaxOptions.error = Parse.Query._wrapError(options.error, ajaxOptions);
            Parse._request("classes", this.className, null, "GET", params, ajaxOptions);
        },
        first: function(options) {
            var self = this;
            var success = options.success;
            var ajaxOptions = {
                error: options.error,
                success: function(response) {
                    success(_.map(response.results, function(json) {
                        var obj = new self.objectClass(json);
                        obj._refreshCache();
                        obj._dirty = {};
                        return obj;
                    })[0]);
                }
            };
            var params = this.toJSON();
            params.limit = 1;
            ajaxOptions.error = Parse.Query._wrapError(options.error, ajaxOptions);
            Parse._request("classes", this.className, null, "GET", params, ajaxOptions);
        },
        collection: function(items, options) {
            options = options || {};
            return new Parse.Collection(items, _.extend(options, {
                model: this.objectClass,
                query: this
            }));
        },
        skip: function(n) {
            this._skip = n;
            return this;
        },
        limit: function(n) {
            this._limit = n;
            return this;
        },
        equalTo: function(key, value) {
            this._where[key] = Parse._encode(value);
            return this;
        },
        _addCondition: function(key, condition, value) {
            this._where[key] || (this._where[key] = {});
            this._where[key][condition] = Parse._encode(value);
            return this;
        },
        notEqualTo: function(key, value) {
            this._addCondition(key, "$ne", value);
            return this;
        },
        lessThan: function(key, value) {
            this._addCondition(key, "$lt", value);
            return this;
        },
        greaterThan: function(key, value) {
            this._addCondition(key, "$gt", value);
            return this;
        },
        lessThanOrEqualTo: function(key, value) {
            this._addCondition(key, "$lte", value);
            return this;
        },
        greaterThanOrEqualTo: function(key, value) {
            this._addCondition(key, "$gte", value);
            return this;
        },
        containedIn: function(key, values) {
            this._addCondition(key, "$in", values);
            return this;
        },
        exists: function(key) {
            this._addCondition(key, "$exists", true);
            return this;
        },
        doesNotExist: function(key) {
            this._addCondition(key, "$exists", false);
            return this;
        },
        matches: function(key, regex, modifiers) {
            this._addCondition(key, "$regex", regex);
            modifiers || (modifiers = "");
            regex.ignoreCase && (modifiers += "i");
            regex.multiline && (modifiers += "m");
            modifiers && modifiers.length && this._addCondition(key, "$options", modifiers);
            return this;
        },
        matchesQuery: function(key, query) {
            Ti.API.info("query " + JSON.stringify(query));
            var queryJSON = query.toJSON();
            queryJSON.className = query.className;
            this._addCondition(key, "$inQuery", queryJSON);
            return this;
        },
        doesNotMatchQuery: function(key, query) {
            var queryJSON = query.toJSON();
            queryJSON.className = query.className;
            this._addCondition(key, "$notInQuery", queryJSON);
            return this;
        },
        matchesKeyInQuery: function(key, queryKey, query) {
            var queryJSON = query.toJSON();
            queryJSON.className = query.className;
            this._addCondition(key, "$select", {
                key: queryKey,
                query: queryJSON
            });
            return this;
        },
        _quote: function(s) {
            return "\\Q" + s.replace("\\E", "\\E\\\\E\\Q") + "\\E";
        },
        contains: function(key, value) {
            this._addCondition(key, "$regex", this._quote(value));
            return this;
        },
        startsWith: function(key, value) {
            this._addCondition(key, "$regex", "^" + this._quote(value));
            return this;
        },
        endsWith: function(key, value) {
            this._addCondition(key, "$regex", this._quote(value) + "$");
            return this;
        },
        ascending: function(key) {
            this._order = key;
            return this;
        },
        descending: function(key) {
            this._order = "-" + key;
            return this;
        },
        near: function(key, point) {
            point instanceof Parse.GeoPoint || (point = new Parse.GeoPoint(point));
            this._addCondition(key, "$nearSphere", point);
            return this;
        },
        withinRadians: function(key, point, distance) {
            this.near(key, point);
            this._addCondition(key, "$maxDistance", distance);
            return this;
        },
        withinMiles: function(key, point, distance) {
            return this.withinRadians(key, point, distance / 3958.8);
        },
        withinKilometers: function(key, point, distance) {
            return this.withinRadians(key, point, distance / 6371);
        },
        include: function(key) {
            _.isArray(key) ? this._include = this._include.concat(key) : this._include.push(key);
            return this;
        }
    };
    Parse.Query._wrapError = function(onError, options) {
        return function(response) {
            if (onError) {
                var error = new Parse.Error(-1, response.responseText);
                if (response.responseText) try {
                    var errorJSON = JSON.parse(response.responseText);
                    errorJSON && (error = new Parse.Error(errorJSON.code, errorJSON.error));
                } catch (e) {}
                onError(error, options);
            }
        };
    };
}(this);