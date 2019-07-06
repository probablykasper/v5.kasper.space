// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/core-js/library/modules/_global.js":[function(require,module,exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],"../node_modules/core-js/library/modules/_core.js":[function(require,module,exports) {
var core = module.exports = { version: '2.6.9' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],"../node_modules/core-js/library/modules/_a-function.js":[function(require,module,exports) {
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],"../node_modules/core-js/library/modules/_ctx.js":[function(require,module,exports) {
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":"../node_modules/core-js/library/modules/_a-function.js"}],"../node_modules/core-js/library/modules/_is-object.js":[function(require,module,exports) {
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],"../node_modules/core-js/library/modules/_an-object.js":[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":"../node_modules/core-js/library/modules/_is-object.js"}],"../node_modules/core-js/library/modules/_fails.js":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],"../node_modules/core-js/library/modules/_descriptors.js":[function(require,module,exports) {
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":"../node_modules/core-js/library/modules/_fails.js"}],"../node_modules/core-js/library/modules/_dom-create.js":[function(require,module,exports) {
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_is-object":"../node_modules/core-js/library/modules/_is-object.js","./_global":"../node_modules/core-js/library/modules/_global.js"}],"../node_modules/core-js/library/modules/_ie8-dom-define.js":[function(require,module,exports) {
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js","./_fails":"../node_modules/core-js/library/modules/_fails.js","./_dom-create":"../node_modules/core-js/library/modules/_dom-create.js"}],"../node_modules/core-js/library/modules/_to-primitive.js":[function(require,module,exports) {
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":"../node_modules/core-js/library/modules/_is-object.js"}],"../node_modules/core-js/library/modules/_object-dp.js":[function(require,module,exports) {
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":"../node_modules/core-js/library/modules/_an-object.js","./_ie8-dom-define":"../node_modules/core-js/library/modules/_ie8-dom-define.js","./_to-primitive":"../node_modules/core-js/library/modules/_to-primitive.js","./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js"}],"../node_modules/core-js/library/modules/_property-desc.js":[function(require,module,exports) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],"../node_modules/core-js/library/modules/_hide.js":[function(require,module,exports) {
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_object-dp":"../node_modules/core-js/library/modules/_object-dp.js","./_property-desc":"../node_modules/core-js/library/modules/_property-desc.js","./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js"}],"../node_modules/core-js/library/modules/_has.js":[function(require,module,exports) {
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],"../node_modules/core-js/library/modules/_export.js":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var ctx = require('./_ctx');
var hide = require('./_hide');
var has = require('./_has');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_global":"../node_modules/core-js/library/modules/_global.js","./_core":"../node_modules/core-js/library/modules/_core.js","./_ctx":"../node_modules/core-js/library/modules/_ctx.js","./_hide":"../node_modules/core-js/library/modules/_hide.js","./_has":"../node_modules/core-js/library/modules/_has.js"}],"../node_modules/core-js/library/modules/_cof.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],"../node_modules/core-js/library/modules/_is-array.js":[function(require,module,exports) {
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":"../node_modules/core-js/library/modules/_cof.js"}],"../node_modules/core-js/library/modules/es6.array.is-array.js":[function(require,module,exports) {
// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = require('./_export');

$export($export.S, 'Array', { isArray: require('./_is-array') });

},{"./_export":"../node_modules/core-js/library/modules/_export.js","./_is-array":"../node_modules/core-js/library/modules/_is-array.js"}],"../node_modules/core-js/library/fn/array/is-array.js":[function(require,module,exports) {
require('../../modules/es6.array.is-array');
module.exports = require('../../modules/_core').Array.isArray;

},{"../../modules/es6.array.is-array":"../node_modules/core-js/library/modules/es6.array.is-array.js","../../modules/_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/@babel/runtime-corejs2/core-js/array/is-array.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/array/is-array");
},{"core-js/library/fn/array/is-array":"../node_modules/core-js/library/fn/array/is-array.js"}],"../node_modules/core-js/library/modules/_iobject.js":[function(require,module,exports) {
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":"../node_modules/core-js/library/modules/_cof.js"}],"../node_modules/core-js/library/modules/_defined.js":[function(require,module,exports) {
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],"../node_modules/core-js/library/modules/_to-iobject.js":[function(require,module,exports) {
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_iobject":"../node_modules/core-js/library/modules/_iobject.js","./_defined":"../node_modules/core-js/library/modules/_defined.js"}],"../node_modules/core-js/library/modules/_to-integer.js":[function(require,module,exports) {
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],"../node_modules/core-js/library/modules/_to-length.js":[function(require,module,exports) {
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":"../node_modules/core-js/library/modules/_to-integer.js"}],"../node_modules/core-js/library/modules/_to-absolute-index.js":[function(require,module,exports) {
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":"../node_modules/core-js/library/modules/_to-integer.js"}],"../node_modules/core-js/library/modules/_array-includes.js":[function(require,module,exports) {
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-iobject":"../node_modules/core-js/library/modules/_to-iobject.js","./_to-length":"../node_modules/core-js/library/modules/_to-length.js","./_to-absolute-index":"../node_modules/core-js/library/modules/_to-absolute-index.js"}],"../node_modules/core-js/library/modules/_library.js":[function(require,module,exports) {
module.exports = true;

},{}],"../node_modules/core-js/library/modules/_shared.js":[function(require,module,exports) {

var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":"../node_modules/core-js/library/modules/_core.js","./_global":"../node_modules/core-js/library/modules/_global.js","./_library":"../node_modules/core-js/library/modules/_library.js"}],"../node_modules/core-js/library/modules/_uid.js":[function(require,module,exports) {
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],"../node_modules/core-js/library/modules/_shared-key.js":[function(require,module,exports) {
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":"../node_modules/core-js/library/modules/_shared.js","./_uid":"../node_modules/core-js/library/modules/_uid.js"}],"../node_modules/core-js/library/modules/_object-keys-internal.js":[function(require,module,exports) {
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_has":"../node_modules/core-js/library/modules/_has.js","./_to-iobject":"../node_modules/core-js/library/modules/_to-iobject.js","./_array-includes":"../node_modules/core-js/library/modules/_array-includes.js","./_shared-key":"../node_modules/core-js/library/modules/_shared-key.js"}],"../node_modules/core-js/library/modules/_enum-bug-keys.js":[function(require,module,exports) {
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],"../node_modules/core-js/library/modules/_object-keys.js":[function(require,module,exports) {
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_object-keys-internal":"../node_modules/core-js/library/modules/_object-keys-internal.js","./_enum-bug-keys":"../node_modules/core-js/library/modules/_enum-bug-keys.js"}],"../node_modules/core-js/library/modules/_object-dps.js":[function(require,module,exports) {
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_object-dp":"../node_modules/core-js/library/modules/_object-dp.js","./_an-object":"../node_modules/core-js/library/modules/_an-object.js","./_object-keys":"../node_modules/core-js/library/modules/_object-keys.js","./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js"}],"../node_modules/core-js/library/modules/_html.js":[function(require,module,exports) {
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":"../node_modules/core-js/library/modules/_global.js"}],"../node_modules/core-js/library/modules/_object-create.js":[function(require,module,exports) {
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":"../node_modules/core-js/library/modules/_an-object.js","./_object-dps":"../node_modules/core-js/library/modules/_object-dps.js","./_enum-bug-keys":"../node_modules/core-js/library/modules/_enum-bug-keys.js","./_shared-key":"../node_modules/core-js/library/modules/_shared-key.js","./_dom-create":"../node_modules/core-js/library/modules/_dom-create.js","./_html":"../node_modules/core-js/library/modules/_html.js"}],"../node_modules/core-js/library/modules/es6.object.create.js":[function(require,module,exports) {
var $export = require('./_export');
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: require('./_object-create') });

},{"./_export":"../node_modules/core-js/library/modules/_export.js","./_object-create":"../node_modules/core-js/library/modules/_object-create.js"}],"../node_modules/core-js/library/fn/object/create.js":[function(require,module,exports) {
require('../../modules/es6.object.create');
var $Object = require('../../modules/_core').Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};

},{"../../modules/es6.object.create":"../node_modules/core-js/library/modules/es6.object.create.js","../../modules/_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/@babel/runtime-corejs2/core-js/object/create.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/object/create");
},{"core-js/library/fn/object/create":"../node_modules/core-js/library/fn/object/create.js"}],"js/canvas-renderer-and-projector.js":[function(require,module,exports) {
"use strict";

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

var _create = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/create"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// minOnSave: true, minifier: uglify-js
var bgColor = 0xffffff;
/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.SpriteCanvasMaterial = function (parameters) {
  THREE.Material.call(this);
  this.type = 'SpriteCanvasMaterial';
  this.color = new THREE.Color(0xffffff);

  this.program = function () {};

  this.setValues(parameters);
};

THREE.SpriteCanvasMaterial.prototype = (0, _create.default)(THREE.Material.prototype);
THREE.SpriteCanvasMaterial.prototype.constructor = THREE.SpriteCanvasMaterial;
THREE.SpriteCanvasMaterial.prototype.isSpriteCanvasMaterial = true;

THREE.SpriteCanvasMaterial.prototype.clone = function () {
  var material = new THREE.SpriteCanvasMaterial();
  material.copy(this);
  material.color.copy(this.color);
  material.program = this.program;
  return material;
}; //


THREE.CanvasRenderer = function (parameters) {
  console.log('THREE.CanvasRenderer', THREE.REVISION);
  parameters = parameters || {};

  var _this = this,
      _renderData,
      _elements,
      _lights,
      _projector = new THREE.Projector(),
      _canvas = parameters.canvas !== undefined ? parameters.canvas : document.createElement('canvas'),
      _canvasWidth = _canvas.width,
      _canvasHeight = _canvas.height,
      _canvasWidthHalf = Math.floor(_canvasWidth / 2),
      _canvasHeightHalf = Math.floor(_canvasHeight / 2),
      _viewportX = 0,
      _viewportY = 0,
      _viewportWidth = _canvasWidth,
      _viewportHeight = _canvasHeight,
      _pixelRatio = 1,
      _context = _canvas.getContext('2d', {
    alpha: parameters.alpha === true
  }),
      _clearColor = new THREE.Color(bgColor),
      _clearAlpha = parameters.alpha === true ? 0 : 1,
      _contextGlobalAlpha = 1,
      _contextGlobalCompositeOperation = 0,
      _contextStrokeStyle = null,
      _contextFillStyle = null,
      _contextLineWidth = null,
      _contextLineCap = null,
      _contextLineJoin = null,
      _contextLineDash = [],
      _v1,
      _v2,
      _v3,
      _v1x,
      _v1y,
      _v2x,
      _v2y,
      _v3x,
      _v3y,
      _color = new THREE.Color(),
      _diffuseColor = new THREE.Color(),
      _emissiveColor = new THREE.Color(),
      _lightColor = new THREE.Color(),
      _patterns = {},
      _uvs,
      _uv1x,
      _uv1y,
      _uv2x,
      _uv2y,
      _uv3x,
      _uv3y,
      _clipBox = new THREE.Box2(),
      _clearBox = new THREE.Box2(),
      _elemBox = new THREE.Box2(),
      _ambientLight = new THREE.Color(),
      _directionalLights = new THREE.Color(),
      _pointLights = new THREE.Color(),
      _vector3 = new THREE.Vector3(),
      // Needed for PointLight
  _centroid = new THREE.Vector3(),
      _normal = new THREE.Vector3(),
      _normalViewMatrix = new THREE.Matrix3();
  /* TODO
  _canvas.mozImageSmoothingEnabled = false;
  _canvas.webkitImageSmoothingEnabled = false;
  _canvas.msImageSmoothingEnabled = false;
  _canvas.imageSmoothingEnabled = false;
  */
  // dash+gap fallbacks for Firefox and everything else


  if (_context.setLineDash === undefined) {
    _context.setLineDash = function () {};
  }

  this.domElement = _canvas;
  this.autoClear = true;
  this.sortObjects = true;
  this.sortElements = true;
  this.info = {
    render: {
      vertices: 0,
      faces: 0
    }
  }; // API

  this.getContext = function () {
    return _context;
  };

  this.getContextAttributes = function () {
    return _context.getContextAttributes();
  };

  this.getPixelRatio = function () {
    return _pixelRatio;
  };

  this.setPixelRatio = function (value) {
    if (value !== undefined) _pixelRatio = value;
  };

  this.setSize = function (width, height, updateStyle) {
    _canvasWidth = width * _pixelRatio;
    _canvasHeight = height * _pixelRatio;
    _canvas.width = _canvasWidth;
    _canvas.height = _canvasHeight;
    _canvasWidthHalf = Math.floor(_canvasWidth / 2);
    _canvasHeightHalf = Math.floor(_canvasHeight / 2);

    if (updateStyle !== false) {
      _canvas.style.width = width + 'px';
      _canvas.style.height = height + 'px';
    }

    _clipBox.min.set(-_canvasWidthHalf, -_canvasHeightHalf);

    _clipBox.max.set(_canvasWidthHalf, _canvasHeightHalf);

    _clearBox.min.set(-_canvasWidthHalf, -_canvasHeightHalf);

    _clearBox.max.set(_canvasWidthHalf, _canvasHeightHalf);

    _contextGlobalAlpha = 1;
    _contextGlobalCompositeOperation = 0;
    _contextStrokeStyle = null;
    _contextFillStyle = null;
    _contextLineWidth = null;
    _contextLineCap = null;
    _contextLineJoin = null;
    this.setViewport(0, 0, width, height);
  };

  this.setViewport = function (x, y, width, height) {
    _viewportX = x * _pixelRatio;
    _viewportY = y * _pixelRatio;
    _viewportWidth = width * _pixelRatio;
    _viewportHeight = height * _pixelRatio;
  };

  this.setScissor = function () {};

  this.setScissorTest = function () {};

  this.setClearColor = function (color, alpha) {
    _clearColor.set(color);

    _clearAlpha = alpha !== undefined ? alpha : 1;

    _clearBox.min.set(-_canvasWidthHalf, -_canvasHeightHalf);

    _clearBox.max.set(_canvasWidthHalf, _canvasHeightHalf);
  };

  this.setClearColorHex = function (hex, alpha) {
    console.warn('THREE.CanvasRenderer: .setClearColorHex() is being removed. Use .setClearColor() instead.');
    this.setClearColor(hex, alpha);
  };

  this.getClearColor = function () {
    return _clearColor;
  };

  this.getClearAlpha = function () {
    return _clearAlpha;
  };

  this.getMaxAnisotropy = function () {
    return 0;
  };

  this.clear = function () {
    if (_clearBox.isEmpty() === false) {
      _clearBox.intersect(_clipBox);

      _clearBox.expandByScalar(2);

      _clearBox.min.x = _clearBox.min.x + _canvasWidthHalf;
      _clearBox.min.y = -_clearBox.min.y + _canvasHeightHalf; // higher y value !

      _clearBox.max.x = _clearBox.max.x + _canvasWidthHalf;
      _clearBox.max.y = -_clearBox.max.y + _canvasHeightHalf; // lower y value !

      if (_clearAlpha < 1) {
        _context.clearRect(_clearBox.min.x | 0, _clearBox.max.y | 0, _clearBox.max.x - _clearBox.min.x | 0, _clearBox.min.y - _clearBox.max.y | 0);
      }

      if (_clearAlpha > 0) {
        setOpacity(1);
        setBlending(THREE.NormalBlending);
        setFillStyle('rgba(' + Math.floor(_clearColor.r * 255) + ',' + Math.floor(_clearColor.g * 255) + ',' + Math.floor(_clearColor.b * 255) + ',' + _clearAlpha + ')');

        _context.fillRect(_clearBox.min.x | 0, _clearBox.max.y | 0, _clearBox.max.x - _clearBox.min.x | 0, _clearBox.min.y - _clearBox.max.y | 0);
      }

      _clearBox.makeEmpty();
    }
  }; // compatibility


  this.clearColor = function () {};

  this.clearDepth = function () {};

  this.clearStencil = function () {};

  this.render = function (scene, camera) {
    if (camera.isCamera === undefined) {
      console.error('THREE.CanvasRenderer.render: camera is not an instance of THREE.Camera.');
      return;
    }

    var background = scene.background;

    if (background && background.isColor) {
      setOpacity(1);
      setBlending(THREE.NormalBlending);
      setFillStyle(background.getStyle());

      _context.fillRect(0, 0, _canvasWidth, _canvasHeight);
    } else if (this.autoClear === true) {
      this.clear();
    }

    _this.info.render.vertices = 0;
    _this.info.render.faces = 0;

    _context.setTransform(_viewportWidth / _canvasWidth, 0, 0, -_viewportHeight / _canvasHeight, _viewportX, _canvasHeight - _viewportY);

    _context.translate(_canvasWidthHalf, _canvasHeightHalf);

    _renderData = _projector.projectScene(scene, camera, this.sortObjects, this.sortElements);
    _elements = _renderData.elements;
    _lights = _renderData.lights;

    _normalViewMatrix.getNormalMatrix(camera.matrixWorldInverse);
    /* DEBUG
    setFillStyle( 'rgba( 0, 255, 255, 0.5 )' );
    _context.fillRect( _clipBox.min.x, _clipBox.min.y, _clipBox.max.x - _clipBox.min.x, _clipBox.max.y - _clipBox.min.y );
    */


    calculateLights();

    for (var e = 0, el = _elements.length; e < el; e++) {
      var element = _elements[e];
      var material = element.material;
      if (material === undefined || material.opacity === 0) continue;

      _elemBox.makeEmpty();

      if (element instanceof THREE.RenderableSprite) {
        _v1 = element;
        _v1.x *= _canvasWidthHalf;
        _v1.y *= _canvasHeightHalf;
        renderSprite(_v1, element, material);
      } else if (element instanceof THREE.RenderableLine) {
        _v1 = element.v1;
        _v2 = element.v2;
        _v1.positionScreen.x *= _canvasWidthHalf;
        _v1.positionScreen.y *= _canvasHeightHalf;
        _v2.positionScreen.x *= _canvasWidthHalf;
        _v2.positionScreen.y *= _canvasHeightHalf;

        _elemBox.setFromPoints([_v1.positionScreen, _v2.positionScreen]);

        if (_clipBox.intersectsBox(_elemBox) === true) {
          renderLine(_v1, _v2, element, material);
        }
      } else if (element instanceof THREE.RenderableFace) {
        _v1 = element.v1;
        _v2 = element.v2;
        _v3 = element.v3;
        if (_v1.positionScreen.z < -1 || _v1.positionScreen.z > 1) continue;
        if (_v2.positionScreen.z < -1 || _v2.positionScreen.z > 1) continue;
        if (_v3.positionScreen.z < -1 || _v3.positionScreen.z > 1) continue;
        _v1.positionScreen.x *= _canvasWidthHalf;
        _v1.positionScreen.y *= _canvasHeightHalf;
        _v2.positionScreen.x *= _canvasWidthHalf;
        _v2.positionScreen.y *= _canvasHeightHalf;
        _v3.positionScreen.x *= _canvasWidthHalf;
        _v3.positionScreen.y *= _canvasHeightHalf;

        if (material.overdraw > 0) {
          expand(_v1.positionScreen, _v2.positionScreen, material.overdraw);
          expand(_v2.positionScreen, _v3.positionScreen, material.overdraw);
          expand(_v3.positionScreen, _v1.positionScreen, material.overdraw);
        }

        _elemBox.setFromPoints([_v1.positionScreen, _v2.positionScreen, _v3.positionScreen]);

        if (_clipBox.intersectsBox(_elemBox) === true) {
          renderFace3(_v1, _v2, _v3, 0, 1, 2, element, material);
        }
      }
      /* DEBUG
      setLineWidth( 1 );
      setStrokeStyle( 'rgba( 0, 255, 0, 0.5 )' );
      _context.strokeRect( _elemBox.min.x, _elemBox.min.y, _elemBox.max.x - _elemBox.min.x, _elemBox.max.y - _elemBox.min.y );
      */


      _clearBox.union(_elemBox);
    }
    /* DEBUG
    setLineWidth( 1 );
    setStrokeStyle( 'rgba( 255, 0, 0, 0.5 )' );
    _context.strokeRect( _clearBox.min.x, _clearBox.min.y, _clearBox.max.x - _clearBox.min.x, _clearBox.max.y - _clearBox.min.y );
    */


    _context.setTransform(1, 0, 0, 1, 0, 0);
  }; //


  function calculateLights() {
    _ambientLight.setRGB(0, 0, 0);

    _directionalLights.setRGB(0, 0, 0);

    _pointLights.setRGB(0, 0, 0);

    for (var l = 0, ll = _lights.length; l < ll; l++) {
      var light = _lights[l];
      var lightColor = light.color;

      if (light.isAmbientLight) {
        _ambientLight.add(lightColor);
      } else if (light.isDirectionalLight) {
        // for sprites
        _directionalLights.add(lightColor);
      } else if (light.isPointLight) {
        // for sprites
        _pointLights.add(lightColor);
      }
    }
  }

  function calculateLight(position, normal, color) {
    for (var l = 0, ll = _lights.length; l < ll; l++) {
      var light = _lights[l];

      _lightColor.copy(light.color);

      if (light.isDirectionalLight) {
        var lightPosition = _vector3.setFromMatrixPosition(light.matrixWorld).normalize();

        var amount = normal.dot(lightPosition);
        if (amount <= 0) continue;
        amount *= light.intensity;
        color.add(_lightColor.multiplyScalar(amount));
      } else if (light.isPointLight) {
        var lightPosition = _vector3.setFromMatrixPosition(light.matrixWorld);

        var amount = normal.dot(_vector3.subVectors(lightPosition, position).normalize());
        if (amount <= 0) continue;
        amount *= light.distance == 0 ? 1 : 1 - Math.min(position.distanceTo(lightPosition) / light.distance, 1);
        if (amount == 0) continue;
        amount *= light.intensity;
        color.add(_lightColor.multiplyScalar(amount));
      }
    }
  }

  function renderSprite(v1, element, material) {
    setOpacity(material.opacity);
    setBlending(material.blending);
    var scaleX = element.scale.x * _canvasWidthHalf;
    var scaleY = element.scale.y * _canvasHeightHalf;
    var dist = Math.sqrt(scaleX * scaleX + scaleY * scaleY); // allow for rotated sprite

    _elemBox.min.set(v1.x - dist, v1.y - dist);

    _elemBox.max.set(v1.x + dist, v1.y + dist);

    if (material.isSpriteMaterial) {
      var texture = material.map;

      if (texture !== null) {
        var pattern = _patterns[texture.id];

        if (pattern === undefined || pattern.version !== texture.version) {
          pattern = textureToPattern(texture);
          _patterns[texture.id] = pattern;
        }

        if (pattern.canvas !== undefined) {
          setFillStyle(pattern.canvas);
          var bitmap = texture.image;
          var ox = bitmap.width * texture.offset.x;
          var oy = bitmap.height * texture.offset.y;
          var sx = bitmap.width * texture.repeat.x;
          var sy = bitmap.height * texture.repeat.y;
          var cx = scaleX / sx;
          var cy = scaleY / sy;

          _context.save();

          _context.translate(v1.x, v1.y);

          if (material.rotation !== 0) _context.rotate(material.rotation);

          _context.translate(-scaleX / 2, -scaleY / 2);

          _context.scale(cx, cy);

          _context.translate(-ox, -oy);

          _context.fillRect(ox, oy, sx, sy);

          _context.restore();
        }
      } else {
        // no texture
        setFillStyle(material.color.getStyle());

        _context.save();

        _context.translate(v1.x, v1.y);

        if (material.rotation !== 0) _context.rotate(material.rotation);

        _context.scale(scaleX, -scaleY);

        _context.fillRect(-0.5, -0.5, 1, 1);

        _context.restore();
      }
    } else if (material.isSpriteCanvasMaterial) {
      setStrokeStyle(material.color.getStyle());
      setFillStyle(material.color.getStyle());

      _context.save();

      _context.translate(v1.x, v1.y);

      if (material.rotation !== 0) _context.rotate(material.rotation);

      _context.scale(scaleX, scaleY);

      material.program(_context);

      _context.restore();
    } else if (material.isPointsMaterial) {
      setFillStyle(material.color.getStyle());

      _context.save();

      _context.translate(v1.x, v1.y);

      if (material.rotation !== 0) _context.rotate(material.rotation);

      _context.scale(scaleX * material.size, -scaleY * material.size);

      _context.fillRect(-0.5, -0.5, 1, 1);

      _context.restore();
    }
    /* DEBUG
    setStrokeStyle( 'rgb(255,255,0)' );
    _context.beginPath();
    _context.moveTo( v1.x - 10, v1.y );
    _context.lineTo( v1.x + 10, v1.y );
    _context.moveTo( v1.x, v1.y - 10 );
    _context.lineTo( v1.x, v1.y + 10 );
    _context.stroke();
    */

  }

  function renderLine(v1, v2, element, material) {
    setOpacity(material.opacity);
    setBlending(material.blending);

    _context.beginPath();

    _context.moveTo(v1.positionScreen.x, v1.positionScreen.y);

    _context.lineTo(v2.positionScreen.x, v2.positionScreen.y);

    if (material.isLineBasicMaterial) {
      setLineWidth(material.linewidth);
      setLineCap(material.linecap);
      setLineJoin(material.linejoin);

      if (material.vertexColors !== THREE.VertexColors) {
        setStrokeStyle(material.color.getStyle());
      } else {
        var colorStyle1 = element.vertexColors[0].getStyle();
        var colorStyle2 = element.vertexColors[1].getStyle();

        if (colorStyle1 === colorStyle2) {
          setStrokeStyle(colorStyle1);
        } else {
          try {
            var grad = _context.createLinearGradient(v1.positionScreen.x, v1.positionScreen.y, v2.positionScreen.x, v2.positionScreen.y);

            grad.addColorStop(0, colorStyle1);
            grad.addColorStop(1, colorStyle2);
          } catch (exception) {
            grad = colorStyle1;
          }

          setStrokeStyle(grad);
        }
      }

      if (material.isLineDashedMaterial) {
        setLineDash([material.dashSize, material.gapSize]);
      }

      _context.stroke();

      _elemBox.expandByScalar(material.linewidth * 2);

      if (material.isLineDashedMaterial) {
        setLineDash([]);
      }
    }
  }

  function renderFace3(v1, v2, v3, uv1, uv2, uv3, element, material) {
    _this.info.render.vertices += 3;
    _this.info.render.faces++;
    setOpacity(material.opacity);
    setBlending(material.blending);
    _v1x = v1.positionScreen.x;
    _v1y = v1.positionScreen.y;
    _v2x = v2.positionScreen.x;
    _v2y = v2.positionScreen.y;
    _v3x = v3.positionScreen.x;
    _v3y = v3.positionScreen.y;
    drawTriangle(_v1x, _v1y, _v2x, _v2y, _v3x, _v3y);

    if ((material.isMeshLambertMaterial || material.isMeshPhongMaterial || material.isMeshStandardMaterial) && material.map === null) {
      _diffuseColor.copy(material.color);

      _emissiveColor.copy(material.emissive);

      if (material.vertexColors === THREE.FaceColors) {
        _diffuseColor.multiply(element.color);
      }

      _color.copy(_ambientLight);

      _centroid.copy(v1.positionWorld).add(v2.positionWorld).add(v3.positionWorld).divideScalar(3);

      calculateLight(_centroid, element.normalModel, _color);

      _color.multiply(_diffuseColor).add(_emissiveColor);

      material.wireframe === true ? strokePath(_color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin) : fillPath(_color);
    } else if (material.isMeshBasicMaterial || material.isMeshLambertMaterial || material.isMeshPhongMaterial || material.isMeshStandardMaterial) {
      if (material.map !== null) {
        var mapping = material.map.mapping;

        if (mapping === THREE.UVMapping) {
          _uvs = element.uvs;
          patternPath(_v1x, _v1y, _v2x, _v2y, _v3x, _v3y, _uvs[uv1].x, _uvs[uv1].y, _uvs[uv2].x, _uvs[uv2].y, _uvs[uv3].x, _uvs[uv3].y, material.map);
        }
      } else if (material.envMap !== null) {
        if (material.envMap.mapping === THREE.SphericalReflectionMapping) {
          _normal.copy(element.vertexNormalsModel[uv1]).applyMatrix3(_normalViewMatrix);

          _uv1x = 0.5 * _normal.x + 0.5;
          _uv1y = 0.5 * _normal.y + 0.5;

          _normal.copy(element.vertexNormalsModel[uv2]).applyMatrix3(_normalViewMatrix);

          _uv2x = 0.5 * _normal.x + 0.5;
          _uv2y = 0.5 * _normal.y + 0.5;

          _normal.copy(element.vertexNormalsModel[uv3]).applyMatrix3(_normalViewMatrix);

          _uv3x = 0.5 * _normal.x + 0.5;
          _uv3y = 0.5 * _normal.y + 0.5;
          patternPath(_v1x, _v1y, _v2x, _v2y, _v3x, _v3y, _uv1x, _uv1y, _uv2x, _uv2y, _uv3x, _uv3y, material.envMap);
        }
      } else {
        _color.copy(material.color);

        if (material.vertexColors === THREE.FaceColors) {
          _color.multiply(element.color);
        }

        material.wireframe === true ? strokePath(_color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin) : fillPath(_color);
      }
    } else if (material.isMeshNormalMaterial) {
      _normal.copy(element.normalModel).applyMatrix3(_normalViewMatrix);

      _color.setRGB(_normal.x, _normal.y, _normal.z).multiplyScalar(0.5).addScalar(0.5);

      material.wireframe === true ? strokePath(_color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin) : fillPath(_color);
    } else {
      _color.setRGB(1, 1, 1);

      material.wireframe === true ? strokePath(_color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin) : fillPath(_color);
    }
  } //


  function drawTriangle(x0, y0, x1, y1, x2, y2) {
    _context.beginPath();

    _context.moveTo(x0, y0);

    _context.lineTo(x1, y1);

    _context.lineTo(x2, y2);

    _context.closePath();
  }

  function strokePath(color, linewidth, linecap, linejoin) {
    setLineWidth(linewidth);
    setLineCap(linecap);
    setLineJoin(linejoin);
    setStrokeStyle(color.getStyle());

    _context.stroke();

    _elemBox.expandByScalar(linewidth * 2);
  }

  function fillPath(color) {
    setFillStyle(color.getStyle());

    _context.fill();
  }

  function textureToPattern(texture) {
    if (texture.version === 0 || texture instanceof THREE.CompressedTexture || texture instanceof THREE.DataTexture) {
      return {
        canvas: undefined,
        version: texture.version
      };
    }

    var image = texture.image;

    if (image.complete === false) {
      return {
        canvas: undefined,
        version: 0
      };
    }

    var repeatX = texture.wrapS === THREE.RepeatWrapping || texture.wrapS === THREE.MirroredRepeatWrapping;
    var repeatY = texture.wrapT === THREE.RepeatWrapping || texture.wrapT === THREE.MirroredRepeatWrapping;
    var mirrorX = texture.wrapS === THREE.MirroredRepeatWrapping;
    var mirrorY = texture.wrapT === THREE.MirroredRepeatWrapping; //

    var canvas = document.createElement('canvas');
    canvas.width = image.width * (mirrorX ? 2 : 1);
    canvas.height = image.height * (mirrorY ? 2 : 1);
    var context = canvas.getContext('2d');
    context.setTransform(1, 0, 0, -1, 0, image.height);
    context.drawImage(image, 0, 0);

    if (mirrorX === true) {
      context.setTransform(-1, 0, 0, -1, image.width, image.height);
      context.drawImage(image, -image.width, 0);
    }

    if (mirrorY === true) {
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.drawImage(image, 0, image.height);
    }

    if (mirrorX === true && mirrorY === true) {
      context.setTransform(-1, 0, 0, 1, image.width, 0);
      context.drawImage(image, -image.width, image.height);
    }

    var repeat = 'no-repeat';

    if (repeatX === true && repeatY === true) {
      repeat = 'repeat';
    } else if (repeatX === true) {
      repeat = 'repeat-x';
    } else if (repeatY === true) {
      repeat = 'repeat-y';
    }

    var pattern = _context.createPattern(canvas, repeat);

    if (texture.onUpdate) texture.onUpdate(texture);
    return {
      canvas: pattern,
      version: texture.version
    };
  }

  function patternPath(x0, y0, x1, y1, x2, y2, u0, v0, u1, v1, u2, v2, texture) {
    var pattern = _patterns[texture.id];

    if (pattern === undefined || pattern.version !== texture.version) {
      pattern = textureToPattern(texture);
      _patterns[texture.id] = pattern;
    }

    if (pattern.canvas !== undefined) {
      setFillStyle(pattern.canvas);
    } else {
      setFillStyle('rgba( 0, 0, 0, 1)');

      _context.fill();

      return;
    } // http://extremelysatisfactorytotalitarianism.com/blog/?p=2120


    var a,
        b,
        c,
        d,
        e,
        f,
        det,
        idet,
        offsetX = texture.offset.x / texture.repeat.x,
        offsetY = texture.offset.y / texture.repeat.y,
        width = texture.image.width * texture.repeat.x,
        height = texture.image.height * texture.repeat.y;
    u0 = (u0 + offsetX) * width;
    v0 = (v0 + offsetY) * height;
    u1 = (u1 + offsetX) * width;
    v1 = (v1 + offsetY) * height;
    u2 = (u2 + offsetX) * width;
    v2 = (v2 + offsetY) * height;
    x1 -= x0;
    y1 -= y0;
    x2 -= x0;
    y2 -= y0;
    u1 -= u0;
    v1 -= v0;
    u2 -= u0;
    v2 -= v0;
    det = u1 * v2 - u2 * v1;
    if (det === 0) return;
    idet = 1 / det;
    a = (v2 * x1 - v1 * x2) * idet;
    b = (v2 * y1 - v1 * y2) * idet;
    c = (u1 * x2 - u2 * x1) * idet;
    d = (u1 * y2 - u2 * y1) * idet;
    e = x0 - a * u0 - c * v0;
    f = y0 - b * u0 - d * v0;

    _context.save();

    _context.transform(a, b, c, d, e, f);

    _context.fill();

    _context.restore();
  }
  /*
  function clipImage( x0, y0, x1, y1, x2, y2, u0, v0, u1, v1, u2, v2, image ) {
  		// http://extremelysatisfactorytotalitarianism.com/blog/?p=2120
  		var a, b, c, d, e, f, det, idet,
  	width = image.width - 1,
  	height = image.height - 1;
  		u0 *= width; v0 *= height;
  	u1 *= width; v1 *= height;
  	u2 *= width; v2 *= height;
  		x1 -= x0; y1 -= y0;
  	x2 -= x0; y2 -= y0;
  		u1 -= u0; v1 -= v0;
  	u2 -= u0; v2 -= v0;
  		det = u1 * v2 - u2 * v1;
  		idet = 1 / det;
  		a = ( v2 * x1 - v1 * x2 ) * idet;
  	b = ( v2 * y1 - v1 * y2 ) * idet;
  	c = ( u1 * x2 - u2 * x1 ) * idet;
  	d = ( u1 * y2 - u2 * y1 ) * idet;
  		e = x0 - a * u0 - c * v0;
  	f = y0 - b * u0 - d * v0;
  		_context.save();
  	_context.transform( a, b, c, d, e, f );
  	_context.clip();
  	_context.drawImage( image, 0, 0 );
  	_context.restore();
  	}
  */
  // Hide anti-alias gaps


  function expand(v1, v2, pixels) {
    var x = v2.x - v1.x,
        y = v2.y - v1.y,
        det = x * x + y * y,
        idet;
    if (det === 0) return;
    idet = pixels / Math.sqrt(det);
    x *= idet;
    y *= idet;
    v2.x += x;
    v2.y += y;
    v1.x -= x;
    v1.y -= y;
  } // Context cached methods.


  function setOpacity(value) {
    if (_contextGlobalAlpha !== value) {
      _context.globalAlpha = value;
      _contextGlobalAlpha = value;
    }
  }

  function setBlending(value) {
    if (_contextGlobalCompositeOperation !== value) {
      if (value === THREE.NormalBlending) {
        _context.globalCompositeOperation = 'source-over';
      } else if (value === THREE.AdditiveBlending) {
        _context.globalCompositeOperation = 'lighter';
      } else if (value === THREE.SubtractiveBlending) {
        _context.globalCompositeOperation = 'darker';
      } else if (value === THREE.MultiplyBlending) {
        _context.globalCompositeOperation = 'multiply';
      }

      _contextGlobalCompositeOperation = value;
    }
  }

  function setLineWidth(value) {
    if (_contextLineWidth !== value) {
      _context.lineWidth = value;
      _contextLineWidth = value;
    }
  }

  function setLineCap(value) {
    // "butt", "round", "square"
    if (_contextLineCap !== value) {
      _context.lineCap = value;
      _contextLineCap = value;
    }
  }

  function setLineJoin(value) {
    // "round", "bevel", "miter"
    if (_contextLineJoin !== value) {
      _context.lineJoin = value;
      _contextLineJoin = value;
    }
  }

  function setStrokeStyle(value) {
    if (_contextStrokeStyle !== value) {
      _context.strokeStyle = value;
      _contextStrokeStyle = value;
    }
  }

  function setFillStyle(value) {
    if (_contextFillStyle !== value) {
      _context.fillStyle = value;
      _contextFillStyle = value;
    }
  }

  function setLineDash(value) {
    if (_contextLineDash.length !== value.length) {
      _context.setLineDash(value);

      _contextLineDash = value;
    }
  }
};
/**
 * @author mrdoob / http://mrdoob.com/
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author julianwa / https://github.com/julianwa
 */


THREE.RenderableObject = function () {
  this.id = 0;
  this.object = null;
  this.z = 0;
  this.renderOrder = 0;
}; //


THREE.RenderableFace = function () {
  this.id = 0;
  this.v1 = new THREE.RenderableVertex();
  this.v2 = new THREE.RenderableVertex();
  this.v3 = new THREE.RenderableVertex();
  this.normalModel = new THREE.Vector3();
  this.vertexNormalsModel = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];
  this.vertexNormalsLength = 0;
  this.color = new THREE.Color();
  this.material = null;
  this.uvs = [new THREE.Vector2(), new THREE.Vector2(), new THREE.Vector2()];
  this.z = 0;
  this.renderOrder = 0;
}; //


THREE.RenderableVertex = function () {
  this.position = new THREE.Vector3();
  this.positionWorld = new THREE.Vector3();
  this.positionScreen = new THREE.Vector4();
  this.visible = true;
};

THREE.RenderableVertex.prototype.copy = function (vertex) {
  this.positionWorld.copy(vertex.positionWorld);
  this.positionScreen.copy(vertex.positionScreen);
}; //


THREE.RenderableLine = function () {
  this.id = 0;
  this.v1 = new THREE.RenderableVertex();
  this.v2 = new THREE.RenderableVertex();
  this.vertexColors = [new THREE.Color(), new THREE.Color()];
  this.material = null;
  this.z = 0;
  this.renderOrder = 0;
}; //


THREE.RenderableSprite = function () {
  this.id = 0;
  this.object = null;
  this.x = 0;
  this.y = 0;
  this.z = 0;
  this.rotation = 0;
  this.scale = new THREE.Vector2();
  this.material = null;
  this.renderOrder = 0;
}; //


THREE.Projector = function () {
  var _object,
      _objectCount,
      _objectPool = [],
      _objectPoolLength = 0,
      _vertex,
      _vertexCount,
      _vertexPool = [],
      _vertexPoolLength = 0,
      _face,
      _faceCount,
      _facePool = [],
      _facePoolLength = 0,
      _line,
      _lineCount,
      _linePool = [],
      _linePoolLength = 0,
      _sprite,
      _spriteCount,
      _spritePool = [],
      _spritePoolLength = 0,
      _renderData = {
    objects: [],
    lights: [],
    elements: []
  },
      _vector3 = new THREE.Vector3(),
      _vector4 = new THREE.Vector4(),
      _clipBox = new THREE.Box3(new THREE.Vector3(-1, -1, -1), new THREE.Vector3(1, 1, 1)),
      _boundingBox = new THREE.Box3(),
      _points3 = new Array(3),
      _viewMatrix = new THREE.Matrix4(),
      _viewProjectionMatrix = new THREE.Matrix4(),
      _modelMatrix,
      _modelViewProjectionMatrix = new THREE.Matrix4(),
      _normalMatrix = new THREE.Matrix3(),
      _frustum = new THREE.Frustum(),
      _clippedVertex1PositionScreen = new THREE.Vector4(),
      _clippedVertex2PositionScreen = new THREE.Vector4(); //


  this.projectVector = function (vector, camera) {
    console.warn('THREE.Projector: .projectVector() is now vector.project().');
    vector.project(camera);
  };

  this.unprojectVector = function (vector, camera) {
    console.warn('THREE.Projector: .unprojectVector() is now vector.unproject().');
    vector.unproject(camera);
  };

  this.pickingRay = function () {
    console.error('THREE.Projector: .pickingRay() is now raycaster.setFromCamera().');
  }; //


  var RenderList = function RenderList() {
    var normals = [];
    var colors = [];
    var uvs = [];
    var object = null;
    var material = null;
    var normalMatrix = new THREE.Matrix3();

    function setObject(value) {
      object = value;
      material = object.material;
      normalMatrix.getNormalMatrix(object.matrixWorld);
      normals.length = 0;
      colors.length = 0;
      uvs.length = 0;
    }

    function projectVertex(vertex) {
      var position = vertex.position;
      var positionWorld = vertex.positionWorld;
      var positionScreen = vertex.positionScreen;
      positionWorld.copy(position).applyMatrix4(_modelMatrix);
      positionScreen.copy(positionWorld).applyMatrix4(_viewProjectionMatrix);
      var invW = 1 / positionScreen.w;
      positionScreen.x *= invW;
      positionScreen.y *= invW;
      positionScreen.z *= invW;
      vertex.visible = positionScreen.x >= -1 && positionScreen.x <= 1 && positionScreen.y >= -1 && positionScreen.y <= 1 && positionScreen.z >= -1 && positionScreen.z <= 1;
    }

    function pushVertex(x, y, z) {
      _vertex = getNextVertexInPool();

      _vertex.position.set(x, y, z);

      projectVertex(_vertex);
    }

    function pushNormal(x, y, z) {
      normals.push(x, y, z);
    }

    function pushColor(r, g, b) {
      colors.push(r, g, b);
    }

    function pushUv(x, y) {
      uvs.push(x, y);
    }

    function checkTriangleVisibility(v1, v2, v3) {
      if (v1.visible === true || v2.visible === true || v3.visible === true) return true;
      _points3[0] = v1.positionScreen;
      _points3[1] = v2.positionScreen;
      _points3[2] = v3.positionScreen;
      return _clipBox.intersectsBox(_boundingBox.setFromPoints(_points3));
    }

    function checkBackfaceCulling(v1, v2, v3) {
      return (v3.positionScreen.x - v1.positionScreen.x) * (v2.positionScreen.y - v1.positionScreen.y) - (v3.positionScreen.y - v1.positionScreen.y) * (v2.positionScreen.x - v1.positionScreen.x) < 0;
    }

    function pushLine(a, b) {
      var v1 = _vertexPool[a];
      var v2 = _vertexPool[b]; // Clip

      v1.positionScreen.copy(v1.position).applyMatrix4(_modelViewProjectionMatrix);
      v2.positionScreen.copy(v2.position).applyMatrix4(_modelViewProjectionMatrix);

      if (clipLine(v1.positionScreen, v2.positionScreen) === true) {
        // Perform the perspective divide
        v1.positionScreen.multiplyScalar(1 / v1.positionScreen.w);
        v2.positionScreen.multiplyScalar(1 / v2.positionScreen.w);
        _line = getNextLineInPool();
        _line.id = object.id;

        _line.v1.copy(v1);

        _line.v2.copy(v2);

        _line.z = Math.max(v1.positionScreen.z, v2.positionScreen.z);
        _line.renderOrder = object.renderOrder;
        _line.material = object.material;

        if (object.material.vertexColors === THREE.VertexColors) {
          _line.vertexColors[0].fromArray(colors, a * 3);

          _line.vertexColors[1].fromArray(colors, b * 3);
        }

        _renderData.elements.push(_line);
      }
    }

    function pushTriangle(a, b, c) {
      var v1 = _vertexPool[a];
      var v2 = _vertexPool[b];
      var v3 = _vertexPool[c];
      if (checkTriangleVisibility(v1, v2, v3) === false) return;

      if (material.side === THREE.DoubleSide || checkBackfaceCulling(v1, v2, v3) === true) {
        _face = getNextFaceInPool();
        _face.id = object.id;

        _face.v1.copy(v1);

        _face.v2.copy(v2);

        _face.v3.copy(v3);

        _face.z = (v1.positionScreen.z + v2.positionScreen.z + v3.positionScreen.z) / 3;
        _face.renderOrder = object.renderOrder; // use first vertex normal as face normal

        _face.normalModel.fromArray(normals, a * 3);

        _face.normalModel.applyMatrix3(normalMatrix).normalize();

        for (var i = 0; i < 3; i++) {
          var normal = _face.vertexNormalsModel[i];
          normal.fromArray(normals, arguments[i] * 3);
          normal.applyMatrix3(normalMatrix).normalize();
          var uv = _face.uvs[i];
          uv.fromArray(uvs, arguments[i] * 2);
        }

        _face.vertexNormalsLength = 3;
        _face.material = object.material;

        _renderData.elements.push(_face);
      }
    }

    return {
      setObject: setObject,
      projectVertex: projectVertex,
      checkTriangleVisibility: checkTriangleVisibility,
      checkBackfaceCulling: checkBackfaceCulling,
      pushVertex: pushVertex,
      pushNormal: pushNormal,
      pushColor: pushColor,
      pushUv: pushUv,
      pushLine: pushLine,
      pushTriangle: pushTriangle
    };
  };

  var renderList = new RenderList();

  function projectObject(object) {
    if (object.visible === false) return;

    if (object instanceof THREE.Light) {
      _renderData.lights.push(object);
    } else if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Points) {
      if (object.material.visible === false) return;
      if (object.frustumCulled === true && _frustum.intersectsObject(object) === false) return;
      addObject(object);
    } else if (object instanceof THREE.Sprite) {
      if (object.material.visible === false) return;
      if (object.frustumCulled === true && _frustum.intersectsSprite(object) === false) return;
      addObject(object);
    }

    var children = object.children;

    for (var i = 0, l = children.length; i < l; i++) {
      projectObject(children[i]);
    }
  }

  function addObject(object) {
    _object = getNextObjectInPool();
    _object.id = object.id;
    _object.object = object;

    _vector3.setFromMatrixPosition(object.matrixWorld);

    _vector3.applyMatrix4(_viewProjectionMatrix);

    _object.z = _vector3.z;
    _object.renderOrder = object.renderOrder;

    _renderData.objects.push(_object);
  }

  this.projectScene = function (scene, camera, sortObjects, sortElements) {
    _faceCount = 0;
    _lineCount = 0;
    _spriteCount = 0;
    _renderData.elements.length = 0;
    if (scene.autoUpdate === true) scene.updateMatrixWorld();
    if (camera.parent === null) camera.updateMatrixWorld();

    _viewMatrix.copy(camera.matrixWorldInverse);

    _viewProjectionMatrix.multiplyMatrices(camera.projectionMatrix, _viewMatrix);

    _frustum.setFromMatrix(_viewProjectionMatrix); //


    _objectCount = 0;
    _renderData.objects.length = 0;
    _renderData.lights.length = 0;
    projectObject(scene);

    if (sortObjects === true) {
      _renderData.objects.sort(painterSort);
    } //


    var objects = _renderData.objects;

    for (var o = 0, ol = objects.length; o < ol; o++) {
      var object = objects[o].object;
      var geometry = object.geometry;
      renderList.setObject(object);
      _modelMatrix = object.matrixWorld;
      _vertexCount = 0;

      if (object instanceof THREE.Mesh) {
        if (geometry instanceof THREE.BufferGeometry) {
          var attributes = geometry.attributes;
          var groups = geometry.groups;
          if (attributes.position === undefined) continue;
          var positions = attributes.position.array;

          for (var i = 0, l = positions.length; i < l; i += 3) {
            renderList.pushVertex(positions[i], positions[i + 1], positions[i + 2]);
          }

          if (attributes.normal !== undefined) {
            var normals = attributes.normal.array;

            for (var i = 0, l = normals.length; i < l; i += 3) {
              renderList.pushNormal(normals[i], normals[i + 1], normals[i + 2]);
            }
          }

          if (attributes.uv !== undefined) {
            var uvs = attributes.uv.array;

            for (var i = 0, l = uvs.length; i < l; i += 2) {
              renderList.pushUv(uvs[i], uvs[i + 1]);
            }
          }

          if (geometry.index !== null) {
            var indices = geometry.index.array;

            if (groups.length > 0) {
              for (var g = 0; g < groups.length; g++) {
                var group = groups[g];

                for (var i = group.start, l = group.start + group.count; i < l; i += 3) {
                  renderList.pushTriangle(indices[i], indices[i + 1], indices[i + 2]);
                }
              }
            } else {
              for (var i = 0, l = indices.length; i < l; i += 3) {
                renderList.pushTriangle(indices[i], indices[i + 1], indices[i + 2]);
              }
            }
          } else {
            for (var i = 0, l = positions.length / 3; i < l; i += 3) {
              renderList.pushTriangle(i, i + 1, i + 2);
            }
          }
        } else if (geometry instanceof THREE.Geometry) {
          var vertices = geometry.vertices;
          var faces = geometry.faces;
          var faceVertexUvs = geometry.faceVertexUvs[0];

          _normalMatrix.getNormalMatrix(_modelMatrix);

          var material = object.material;
          var isMultiMaterial = (0, _isArray.default)(material);

          for (var v = 0, vl = vertices.length; v < vl; v++) {
            var vertex = vertices[v];

            _vector3.copy(vertex);

            if (material.morphTargets === true) {
              var morphTargets = geometry.morphTargets;
              var morphInfluences = object.morphTargetInfluences;

              for (var t = 0, tl = morphTargets.length; t < tl; t++) {
                var influence = morphInfluences[t];
                if (influence === 0) continue;
                var target = morphTargets[t];
                var targetVertex = target.vertices[v];
                _vector3.x += (targetVertex.x - vertex.x) * influence;
                _vector3.y += (targetVertex.y - vertex.y) * influence;
                _vector3.z += (targetVertex.z - vertex.z) * influence;
              }
            }

            renderList.pushVertex(_vector3.x, _vector3.y, _vector3.z);
          }

          for (var f = 0, fl = faces.length; f < fl; f++) {
            var face = faces[f];
            material = isMultiMaterial === true ? object.material[face.materialIndex] : object.material;
            if (material === undefined) continue;
            var side = material.side;
            var v1 = _vertexPool[face.a];
            var v2 = _vertexPool[face.b];
            var v3 = _vertexPool[face.c];
            if (renderList.checkTriangleVisibility(v1, v2, v3) === false) continue;
            var visible = renderList.checkBackfaceCulling(v1, v2, v3);

            if (side !== THREE.DoubleSide) {
              if (side === THREE.FrontSide && visible === false) continue;
              if (side === THREE.BackSide && visible === true) continue;
            }

            _face = getNextFaceInPool();
            _face.id = object.id;

            _face.v1.copy(v1);

            _face.v2.copy(v2);

            _face.v3.copy(v3);

            _face.normalModel.copy(face.normal);

            if (visible === false && (side === THREE.BackSide || side === THREE.DoubleSide)) {
              _face.normalModel.negate();
            }

            _face.normalModel.applyMatrix3(_normalMatrix).normalize();

            var faceVertexNormals = face.vertexNormals;

            for (var n = 0, nl = Math.min(faceVertexNormals.length, 3); n < nl; n++) {
              var normalModel = _face.vertexNormalsModel[n];
              normalModel.copy(faceVertexNormals[n]);

              if (visible === false && (side === THREE.BackSide || side === THREE.DoubleSide)) {
                normalModel.negate();
              }

              normalModel.applyMatrix3(_normalMatrix).normalize();
            }

            _face.vertexNormalsLength = faceVertexNormals.length;
            var vertexUvs = faceVertexUvs[f];

            if (vertexUvs !== undefined) {
              for (var u = 0; u < 3; u++) {
                _face.uvs[u].copy(vertexUvs[u]);
              }
            }

            _face.color = face.color;
            _face.material = material;
            _face.z = (v1.positionScreen.z + v2.positionScreen.z + v3.positionScreen.z) / 3;
            _face.renderOrder = object.renderOrder;

            _renderData.elements.push(_face);
          }
        }
      } else if (object instanceof THREE.Line) {
        _modelViewProjectionMatrix.multiplyMatrices(_viewProjectionMatrix, _modelMatrix);

        if (geometry instanceof THREE.BufferGeometry) {
          var attributes = geometry.attributes;

          if (attributes.position !== undefined) {
            var positions = attributes.position.array;

            for (var i = 0, l = positions.length; i < l; i += 3) {
              renderList.pushVertex(positions[i], positions[i + 1], positions[i + 2]);
            }

            if (attributes.color !== undefined) {
              var colors = attributes.color.array;

              for (var i = 0, l = colors.length; i < l; i += 3) {
                renderList.pushColor(colors[i], colors[i + 1], colors[i + 2]);
              }
            }

            if (geometry.index !== null) {
              var indices = geometry.index.array;

              for (var i = 0, l = indices.length; i < l; i += 2) {
                renderList.pushLine(indices[i], indices[i + 1]);
              }
            } else {
              var step = object instanceof THREE.LineSegments ? 2 : 1;

              for (var i = 0, l = positions.length / 3 - 1; i < l; i += step) {
                renderList.pushLine(i, i + 1);
              }
            }
          }
        } else if (geometry instanceof THREE.Geometry) {
          var vertices = object.geometry.vertices;
          if (vertices.length === 0) continue;
          v1 = getNextVertexInPool();
          v1.positionScreen.copy(vertices[0]).applyMatrix4(_modelViewProjectionMatrix);
          var step = object instanceof THREE.LineSegments ? 2 : 1;

          for (var v = 1, vl = vertices.length; v < vl; v++) {
            v1 = getNextVertexInPool();
            v1.positionScreen.copy(vertices[v]).applyMatrix4(_modelViewProjectionMatrix);
            if ((v + 1) % step > 0) continue;
            v2 = _vertexPool[_vertexCount - 2];

            _clippedVertex1PositionScreen.copy(v1.positionScreen);

            _clippedVertex2PositionScreen.copy(v2.positionScreen);

            if (clipLine(_clippedVertex1PositionScreen, _clippedVertex2PositionScreen) === true) {
              // Perform the perspective divide
              _clippedVertex1PositionScreen.multiplyScalar(1 / _clippedVertex1PositionScreen.w);

              _clippedVertex2PositionScreen.multiplyScalar(1 / _clippedVertex2PositionScreen.w);

              _line = getNextLineInPool();
              _line.id = object.id;

              _line.v1.positionScreen.copy(_clippedVertex1PositionScreen);

              _line.v2.positionScreen.copy(_clippedVertex2PositionScreen);

              _line.z = Math.max(_clippedVertex1PositionScreen.z, _clippedVertex2PositionScreen.z);
              _line.renderOrder = object.renderOrder;
              _line.material = object.material;

              if (object.material.vertexColors === THREE.VertexColors) {
                _line.vertexColors[0].copy(object.geometry.colors[v]);

                _line.vertexColors[1].copy(object.geometry.colors[v - 1]);
              }

              _renderData.elements.push(_line);
            }
          }
        }
      } else if (object instanceof THREE.Points) {
        _modelViewProjectionMatrix.multiplyMatrices(_viewProjectionMatrix, _modelMatrix);

        if (geometry instanceof THREE.Geometry) {
          var vertices = object.geometry.vertices;

          for (var v = 0, vl = vertices.length; v < vl; v++) {
            var vertex = vertices[v];

            _vector4.set(vertex.x, vertex.y, vertex.z, 1);

            _vector4.applyMatrix4(_modelViewProjectionMatrix);

            pushPoint(_vector4, object, camera);
          }
        } else if (geometry instanceof THREE.BufferGeometry) {
          var attributes = geometry.attributes;

          if (attributes.position !== undefined) {
            var positions = attributes.position.array;

            for (var i = 0, l = positions.length; i < l; i += 3) {
              _vector4.set(positions[i], positions[i + 1], positions[i + 2], 1);

              _vector4.applyMatrix4(_modelViewProjectionMatrix);

              pushPoint(_vector4, object, camera);
            }
          }
        }
      } else if (object instanceof THREE.Sprite) {
        _vector4.set(_modelMatrix.elements[12], _modelMatrix.elements[13], _modelMatrix.elements[14], 1);

        _vector4.applyMatrix4(_viewProjectionMatrix);

        pushPoint(_vector4, object, camera);
      }
    }

    if (sortElements === true) {
      _renderData.elements.sort(painterSort);
    }

    return _renderData;
  };

  function pushPoint(_vector4, object, camera) {
    var invW = 1 / _vector4.w;
    _vector4.z *= invW;

    if (_vector4.z >= -1 && _vector4.z <= 1) {
      _sprite = getNextSpriteInPool();
      _sprite.id = object.id;
      _sprite.x = _vector4.x * invW;
      _sprite.y = _vector4.y * invW;
      _sprite.z = _vector4.z;
      _sprite.renderOrder = object.renderOrder;
      _sprite.object = object;
      _sprite.rotation = object.rotation;
      _sprite.scale.x = object.scale.x * Math.abs(_sprite.x - (_vector4.x + camera.projectionMatrix.elements[0]) / (_vector4.w + camera.projectionMatrix.elements[12]));
      _sprite.scale.y = object.scale.y * Math.abs(_sprite.y - (_vector4.y + camera.projectionMatrix.elements[5]) / (_vector4.w + camera.projectionMatrix.elements[13]));
      _sprite.material = object.material;

      _renderData.elements.push(_sprite);
    }
  } // Pools


  function getNextObjectInPool() {
    if (_objectCount === _objectPoolLength) {
      var object = new THREE.RenderableObject();

      _objectPool.push(object);

      _objectPoolLength++;
      _objectCount++;
      return object;
    }

    return _objectPool[_objectCount++];
  }

  function getNextVertexInPool() {
    if (_vertexCount === _vertexPoolLength) {
      var vertex = new THREE.RenderableVertex();

      _vertexPool.push(vertex);

      _vertexPoolLength++;
      _vertexCount++;
      return vertex;
    }

    return _vertexPool[_vertexCount++];
  }

  function getNextFaceInPool() {
    if (_faceCount === _facePoolLength) {
      var face = new THREE.RenderableFace();

      _facePool.push(face);

      _facePoolLength++;
      _faceCount++;
      return face;
    }

    return _facePool[_faceCount++];
  }

  function getNextLineInPool() {
    if (_lineCount === _linePoolLength) {
      var line = new THREE.RenderableLine();

      _linePool.push(line);

      _linePoolLength++;
      _lineCount++;
      return line;
    }

    return _linePool[_lineCount++];
  }

  function getNextSpriteInPool() {
    if (_spriteCount === _spritePoolLength) {
      var sprite = new THREE.RenderableSprite();

      _spritePool.push(sprite);

      _spritePoolLength++;
      _spriteCount++;
      return sprite;
    }

    return _spritePool[_spriteCount++];
  } //


  function painterSort(a, b) {
    if (a.renderOrder !== b.renderOrder) {
      return a.renderOrder - b.renderOrder;
    } else if (a.z !== b.z) {
      return b.z - a.z;
    } else if (a.id !== b.id) {
      return a.id - b.id;
    } else {
      return 0;
    }
  }

  function clipLine(s1, s2) {
    var alpha1 = 0,
        alpha2 = 1,
        // Calculate the boundary coordinate of each vertex for the near and far clip planes,
    // Z = -1 and Z = +1, respectively.
    bc1near = s1.z + s1.w,
        bc2near = s2.z + s2.w,
        bc1far = -s1.z + s1.w,
        bc2far = -s2.z + s2.w;

    if (bc1near >= 0 && bc2near >= 0 && bc1far >= 0 && bc2far >= 0) {
      // Both vertices lie entirely within all clip planes.
      return true;
    } else if (bc1near < 0 && bc2near < 0 || bc1far < 0 && bc2far < 0) {
      // Both vertices lie entirely outside one of the clip planes.
      return false;
    } else {
      // The line segment spans at least one clip plane.
      if (bc1near < 0) {
        // v1 lies outside the near plane, v2 inside
        alpha1 = Math.max(alpha1, bc1near / (bc1near - bc2near));
      } else if (bc2near < 0) {
        // v2 lies outside the near plane, v1 inside
        alpha2 = Math.min(alpha2, bc1near / (bc1near - bc2near));
      }

      if (bc1far < 0) {
        // v1 lies outside the far plane, v2 inside
        alpha1 = Math.max(alpha1, bc1far / (bc1far - bc2far));
      } else if (bc2far < 0) {
        // v2 lies outside the far plane, v2 inside
        alpha2 = Math.min(alpha2, bc1far / (bc1far - bc2far));
      }

      if (alpha2 < alpha1) {
        // The line segment spans two boundaries, but is outside both of them.
        // (This can't happen when we're only clipping against just near/far but good
        //  to leave the check here for future usage if other clip planes are added.)
        return false;
      } else {
        // Update the s1 and s2 vertices to match the clipped line segment.
        s1.lerp(s2, alpha1);
        s2.lerp(s1, 1 - alpha2);
        return true;
      }
    }
  }
};
},{"@babel/runtime-corejs2/core-js/array/is-array":"../node_modules/@babel/runtime-corejs2/core-js/array/is-array.js","@babel/runtime-corejs2/core-js/object/create":"../node_modules/@babel/runtime-corejs2/core-js/object/create.js"}]},{},["js/canvas-renderer-and-projector.js"], null)
//# sourceMappingURL=/js/canvas-renderer-and-projector.js.map