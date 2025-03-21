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
})({"../node_modules/core-js/library/modules/_is-object.js":[function(require,module,exports) {
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],"../node_modules/core-js/library/modules/_uid.js":[function(require,module,exports) {
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],"../node_modules/core-js/library/modules/_has.js":[function(require,module,exports) {
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
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

},{"./_fails":"../node_modules/core-js/library/modules/_fails.js"}],"../node_modules/core-js/library/modules/_global.js":[function(require,module,exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],"../node_modules/core-js/library/modules/_dom-create.js":[function(require,module,exports) {
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

},{"./_an-object":"../node_modules/core-js/library/modules/_an-object.js","./_ie8-dom-define":"../node_modules/core-js/library/modules/_ie8-dom-define.js","./_to-primitive":"../node_modules/core-js/library/modules/_to-primitive.js","./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js"}],"../node_modules/core-js/library/modules/_meta.js":[function(require,module,exports) {
var META = require('./_uid')('meta');
var isObject = require('./_is-object');
var has = require('./_has');
var setDesc = require('./_object-dp').f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !require('./_fails')(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

},{"./_uid":"../node_modules/core-js/library/modules/_uid.js","./_is-object":"../node_modules/core-js/library/modules/_is-object.js","./_has":"../node_modules/core-js/library/modules/_has.js","./_object-dp":"../node_modules/core-js/library/modules/_object-dp.js","./_fails":"../node_modules/core-js/library/modules/_fails.js"}],"../node_modules/core-js/library/modules/_core.js":[function(require,module,exports) {
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

},{"./_a-function":"../node_modules/core-js/library/modules/_a-function.js"}],"../node_modules/core-js/library/modules/_property-desc.js":[function(require,module,exports) {
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

},{"./_object-dp":"../node_modules/core-js/library/modules/_object-dp.js","./_property-desc":"../node_modules/core-js/library/modules/_property-desc.js","./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js"}],"../node_modules/core-js/library/modules/_export.js":[function(require,module,exports) {

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

},{"./_global":"../node_modules/core-js/library/modules/_global.js","./_core":"../node_modules/core-js/library/modules/_core.js","./_ctx":"../node_modules/core-js/library/modules/_ctx.js","./_hide":"../node_modules/core-js/library/modules/_hide.js","./_has":"../node_modules/core-js/library/modules/_has.js"}],"../node_modules/core-js/library/modules/_object-sap.js":[function(require,module,exports) {
// most Object methods by ES6 should accept primitives
var $export = require('./_export');
var core = require('./_core');
var fails = require('./_fails');
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};

},{"./_export":"../node_modules/core-js/library/modules/_export.js","./_core":"../node_modules/core-js/library/modules/_core.js","./_fails":"../node_modules/core-js/library/modules/_fails.js"}],"../node_modules/core-js/library/modules/es6.object.freeze.js":[function(require,module,exports) {
// 19.1.2.5 Object.freeze(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});

},{"./_is-object":"../node_modules/core-js/library/modules/_is-object.js","./_meta":"../node_modules/core-js/library/modules/_meta.js","./_object-sap":"../node_modules/core-js/library/modules/_object-sap.js"}],"../node_modules/core-js/library/fn/object/freeze.js":[function(require,module,exports) {
require('../../modules/es6.object.freeze');
module.exports = require('../../modules/_core').Object.freeze;

},{"../../modules/es6.object.freeze":"../node_modules/core-js/library/modules/es6.object.freeze.js","../../modules/_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/@babel/runtime-corejs2/core-js/object/freeze.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/object/freeze");
},{"core-js/library/fn/object/freeze":"../node_modules/core-js/library/fn/object/freeze.js"}],"../node_modules/core-js/library/modules/_defined.js":[function(require,module,exports) {
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],"../node_modules/core-js/library/modules/_to-object.js":[function(require,module,exports) {
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":"../node_modules/core-js/library/modules/_defined.js"}],"../node_modules/core-js/library/modules/_cof.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],"../node_modules/core-js/library/modules/_iobject.js":[function(require,module,exports) {
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":"../node_modules/core-js/library/modules/_cof.js"}],"../node_modules/core-js/library/modules/_to-iobject.js":[function(require,module,exports) {
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

},{"./_core":"../node_modules/core-js/library/modules/_core.js","./_global":"../node_modules/core-js/library/modules/_global.js","./_library":"../node_modules/core-js/library/modules/_library.js"}],"../node_modules/core-js/library/modules/_shared-key.js":[function(require,module,exports) {
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

},{"./_object-keys-internal":"../node_modules/core-js/library/modules/_object-keys-internal.js","./_enum-bug-keys":"../node_modules/core-js/library/modules/_enum-bug-keys.js"}],"../node_modules/core-js/library/modules/es6.object.keys.js":[function(require,module,exports) {
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object');
var $keys = require('./_object-keys');

require('./_object-sap')('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

},{"./_to-object":"../node_modules/core-js/library/modules/_to-object.js","./_object-keys":"../node_modules/core-js/library/modules/_object-keys.js","./_object-sap":"../node_modules/core-js/library/modules/_object-sap.js"}],"../node_modules/core-js/library/fn/object/keys.js":[function(require,module,exports) {
require('../../modules/es6.object.keys');
module.exports = require('../../modules/_core').Object.keys;

},{"../../modules/es6.object.keys":"../node_modules/core-js/library/modules/es6.object.keys.js","../../modules/_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/@babel/runtime-corejs2/core-js/object/keys.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/object/keys");
},{"core-js/library/fn/object/keys":"../node_modules/core-js/library/fn/object/keys.js"}],"../node_modules/core-js/library/fn/json/stringify.js":[function(require,module,exports) {
var core = require('../../modules/_core');
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

},{"../../modules/_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/@babel/runtime-corejs2/core-js/json/stringify.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/json/stringify");
},{"core-js/library/fn/json/stringify":"../node_modules/core-js/library/fn/json/stringify.js"}],"../node_modules/core-js/library/modules/_object-dps.js":[function(require,module,exports) {
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
},{"core-js/library/fn/object/create":"../node_modules/core-js/library/fn/object/create.js"}],"../node_modules/core-js/library/modules/_object-gops.js":[function(require,module,exports) {
exports.f = Object.getOwnPropertySymbols;

},{}],"../node_modules/core-js/library/modules/_object-pie.js":[function(require,module,exports) {
exports.f = {}.propertyIsEnumerable;

},{}],"../node_modules/core-js/library/modules/_object-assign.js":[function(require,module,exports) {
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = require('./_descriptors');
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;

},{"./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js","./_object-keys":"../node_modules/core-js/library/modules/_object-keys.js","./_object-gops":"../node_modules/core-js/library/modules/_object-gops.js","./_object-pie":"../node_modules/core-js/library/modules/_object-pie.js","./_to-object":"../node_modules/core-js/library/modules/_to-object.js","./_iobject":"../node_modules/core-js/library/modules/_iobject.js","./_fails":"../node_modules/core-js/library/modules/_fails.js"}],"../node_modules/core-js/library/modules/es6.object.assign.js":[function(require,module,exports) {
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

},{"./_export":"../node_modules/core-js/library/modules/_export.js","./_object-assign":"../node_modules/core-js/library/modules/_object-assign.js"}],"../node_modules/core-js/library/fn/object/assign.js":[function(require,module,exports) {
require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;

},{"../../modules/es6.object.assign":"../node_modules/core-js/library/modules/es6.object.assign.js","../../modules/_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/@babel/runtime-corejs2/core-js/object/assign.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/object/assign");
},{"core-js/library/fn/object/assign":"../node_modules/core-js/library/fn/object/assign.js"}],"../node_modules/core-js/library/modules/_is-integer.js":[function(require,module,exports) {
// 20.1.2.3 Number.isInteger(number)
var isObject = require('./_is-object');
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

},{"./_is-object":"../node_modules/core-js/library/modules/_is-object.js"}],"../node_modules/core-js/library/modules/es6.number.is-integer.js":[function(require,module,exports) {
// 20.1.2.3 Number.isInteger(number)
var $export = require('./_export');

$export($export.S, 'Number', { isInteger: require('./_is-integer') });

},{"./_export":"../node_modules/core-js/library/modules/_export.js","./_is-integer":"../node_modules/core-js/library/modules/_is-integer.js"}],"../node_modules/core-js/library/fn/number/is-integer.js":[function(require,module,exports) {
require('../../modules/es6.number.is-integer');
module.exports = require('../../modules/_core').Number.isInteger;

},{"../../modules/es6.number.is-integer":"../node_modules/core-js/library/modules/es6.number.is-integer.js","../../modules/_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/@babel/runtime-corejs2/core-js/number/is-integer.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/number/is-integer");
},{"core-js/library/fn/number/is-integer":"../node_modules/core-js/library/fn/number/is-integer.js"}],"../node_modules/core-js/library/modules/es6.number.epsilon.js":[function(require,module,exports) {
// 20.1.2.1 Number.EPSILON
var $export = require('./_export');

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });

},{"./_export":"../node_modules/core-js/library/modules/_export.js"}],"../node_modules/core-js/library/fn/number/epsilon.js":[function(require,module,exports) {
require('../../modules/es6.number.epsilon');
module.exports = Math.pow(2, -52);

},{"../../modules/es6.number.epsilon":"../node_modules/core-js/library/modules/es6.number.epsilon.js"}],"../node_modules/@babel/runtime-corejs2/core-js/number/epsilon.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/number/epsilon");
},{"core-js/library/fn/number/epsilon":"../node_modules/core-js/library/fn/number/epsilon.js"}],"../node_modules/core-js/library/modules/_string-ws.js":[function(require,module,exports) {
module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

},{}],"../node_modules/core-js/library/modules/_string-trim.js":[function(require,module,exports) {
var $export = require('./_export');
var defined = require('./_defined');
var fails = require('./_fails');
var spaces = require('./_string-ws');
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

},{"./_export":"../node_modules/core-js/library/modules/_export.js","./_defined":"../node_modules/core-js/library/modules/_defined.js","./_fails":"../node_modules/core-js/library/modules/_fails.js","./_string-ws":"../node_modules/core-js/library/modules/_string-ws.js"}],"../node_modules/core-js/library/modules/_parse-float.js":[function(require,module,exports) {
var $parseFloat = require('./_global').parseFloat;
var $trim = require('./_string-trim').trim;

module.exports = 1 / $parseFloat(require('./_string-ws') + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

},{"./_global":"../node_modules/core-js/library/modules/_global.js","./_string-trim":"../node_modules/core-js/library/modules/_string-trim.js","./_string-ws":"../node_modules/core-js/library/modules/_string-ws.js"}],"../node_modules/core-js/library/modules/es6.parse-float.js":[function(require,module,exports) {
var $export = require('./_export');
var $parseFloat = require('./_parse-float');
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });

},{"./_export":"../node_modules/core-js/library/modules/_export.js","./_parse-float":"../node_modules/core-js/library/modules/_parse-float.js"}],"../node_modules/core-js/library/fn/parse-float.js":[function(require,module,exports) {
require('../modules/es6.parse-float');
module.exports = require('../modules/_core').parseFloat;

},{"../modules/es6.parse-float":"../node_modules/core-js/library/modules/es6.parse-float.js","../modules/_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/@babel/runtime-corejs2/core-js/parse-float.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/parse-float");
},{"core-js/library/fn/parse-float":"../node_modules/core-js/library/fn/parse-float.js"}],"../node_modules/core-js/library/modules/_parse-int.js":[function(require,module,exports) {
var $parseInt = require('./_global').parseInt;
var $trim = require('./_string-trim').trim;
var ws = require('./_string-ws');
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;

},{"./_global":"../node_modules/core-js/library/modules/_global.js","./_string-trim":"../node_modules/core-js/library/modules/_string-trim.js","./_string-ws":"../node_modules/core-js/library/modules/_string-ws.js"}],"../node_modules/core-js/library/modules/es6.parse-int.js":[function(require,module,exports) {
var $export = require('./_export');
var $parseInt = require('./_parse-int');
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });

},{"./_export":"../node_modules/core-js/library/modules/_export.js","./_parse-int":"../node_modules/core-js/library/modules/_parse-int.js"}],"../node_modules/core-js/library/fn/parse-int.js":[function(require,module,exports) {
require('../modules/es6.parse-int');
module.exports = require('../modules/_core').parseInt;

},{"../modules/es6.parse-int":"../node_modules/core-js/library/modules/es6.parse-int.js","../modules/_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/@babel/runtime-corejs2/core-js/parse-int.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/parse-int");
},{"core-js/library/fn/parse-int":"../node_modules/core-js/library/fn/parse-int.js"}],"../node_modules/core-js/library/modules/_is-array.js":[function(require,module,exports) {
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
},{"core-js/library/fn/array/is-array":"../node_modules/core-js/library/fn/array/is-array.js"}],"../node_modules/core-js/library/modules/es6.object.define-properties.js":[function(require,module,exports) {
var $export = require('./_export');
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperties: require('./_object-dps') });

},{"./_export":"../node_modules/core-js/library/modules/_export.js","./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js","./_object-dps":"../node_modules/core-js/library/modules/_object-dps.js"}],"../node_modules/core-js/library/fn/object/define-properties.js":[function(require,module,exports) {
require('../../modules/es6.object.define-properties');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperties(T, D) {
  return $Object.defineProperties(T, D);
};

},{"../../modules/es6.object.define-properties":"../node_modules/core-js/library/modules/es6.object.define-properties.js","../../modules/_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/@babel/runtime-corejs2/core-js/object/define-properties.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/object/define-properties");
},{"core-js/library/fn/object/define-properties":"../node_modules/core-js/library/fn/object/define-properties.js"}],"../node_modules/core-js/library/modules/es6.object.to-string.js":[function(require,module,exports) {

},{}],"../node_modules/core-js/library/modules/_add-to-unscopables.js":[function(require,module,exports) {
module.exports = function () { /* empty */ };

},{}],"../node_modules/core-js/library/modules/_iter-step.js":[function(require,module,exports) {
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],"../node_modules/core-js/library/modules/_iterators.js":[function(require,module,exports) {
module.exports = {};

},{}],"../node_modules/core-js/library/modules/_redefine.js":[function(require,module,exports) {
module.exports = require('./_hide');

},{"./_hide":"../node_modules/core-js/library/modules/_hide.js"}],"../node_modules/core-js/library/modules/_wks.js":[function(require,module,exports) {
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_shared":"../node_modules/core-js/library/modules/_shared.js","./_uid":"../node_modules/core-js/library/modules/_uid.js","./_global":"../node_modules/core-js/library/modules/_global.js"}],"../node_modules/core-js/library/modules/_set-to-string-tag.js":[function(require,module,exports) {
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_object-dp":"../node_modules/core-js/library/modules/_object-dp.js","./_has":"../node_modules/core-js/library/modules/_has.js","./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/_iter-create.js":[function(require,module,exports) {
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_object-create":"../node_modules/core-js/library/modules/_object-create.js","./_property-desc":"../node_modules/core-js/library/modules/_property-desc.js","./_set-to-string-tag":"../node_modules/core-js/library/modules/_set-to-string-tag.js","./_hide":"../node_modules/core-js/library/modules/_hide.js","./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/_object-gpo.js":[function(require,module,exports) {
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":"../node_modules/core-js/library/modules/_has.js","./_to-object":"../node_modules/core-js/library/modules/_to-object.js","./_shared-key":"../node_modules/core-js/library/modules/_shared-key.js"}],"../node_modules/core-js/library/modules/_iter-define.js":[function(require,module,exports) {
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_library":"../node_modules/core-js/library/modules/_library.js","./_export":"../node_modules/core-js/library/modules/_export.js","./_redefine":"../node_modules/core-js/library/modules/_redefine.js","./_hide":"../node_modules/core-js/library/modules/_hide.js","./_iterators":"../node_modules/core-js/library/modules/_iterators.js","./_iter-create":"../node_modules/core-js/library/modules/_iter-create.js","./_set-to-string-tag":"../node_modules/core-js/library/modules/_set-to-string-tag.js","./_object-gpo":"../node_modules/core-js/library/modules/_object-gpo.js","./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/es6.array.iterator.js":[function(require,module,exports) {
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":"../node_modules/core-js/library/modules/_add-to-unscopables.js","./_iter-step":"../node_modules/core-js/library/modules/_iter-step.js","./_iterators":"../node_modules/core-js/library/modules/_iterators.js","./_to-iobject":"../node_modules/core-js/library/modules/_to-iobject.js","./_iter-define":"../node_modules/core-js/library/modules/_iter-define.js"}],"../node_modules/core-js/library/modules/web.dom.iterable.js":[function(require,module,exports) {

require('./es6.array.iterator');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var TO_STRING_TAG = require('./_wks')('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

},{"./es6.array.iterator":"../node_modules/core-js/library/modules/es6.array.iterator.js","./_global":"../node_modules/core-js/library/modules/_global.js","./_hide":"../node_modules/core-js/library/modules/_hide.js","./_iterators":"../node_modules/core-js/library/modules/_iterators.js","./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/_array-species-constructor.js":[function(require,module,exports) {
var isObject = require('./_is-object');
var isArray = require('./_is-array');
var SPECIES = require('./_wks')('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

},{"./_is-object":"../node_modules/core-js/library/modules/_is-object.js","./_is-array":"../node_modules/core-js/library/modules/_is-array.js","./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/_array-species-create.js":[function(require,module,exports) {
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = require('./_array-species-constructor');

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};

},{"./_array-species-constructor":"../node_modules/core-js/library/modules/_array-species-constructor.js"}],"../node_modules/core-js/library/modules/_array-methods.js":[function(require,module,exports) {
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = require('./_ctx');
var IObject = require('./_iobject');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var asc = require('./_array-species-create');
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

},{"./_ctx":"../node_modules/core-js/library/modules/_ctx.js","./_iobject":"../node_modules/core-js/library/modules/_iobject.js","./_to-object":"../node_modules/core-js/library/modules/_to-object.js","./_to-length":"../node_modules/core-js/library/modules/_to-length.js","./_array-species-create":"../node_modules/core-js/library/modules/_array-species-create.js"}],"../node_modules/core-js/library/modules/_redefine-all.js":[function(require,module,exports) {
var hide = require('./_hide');
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};

},{"./_hide":"../node_modules/core-js/library/modules/_hide.js"}],"../node_modules/core-js/library/modules/_an-instance.js":[function(require,module,exports) {
module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

},{}],"../node_modules/core-js/library/modules/_iter-call.js":[function(require,module,exports) {
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./_an-object":"../node_modules/core-js/library/modules/_an-object.js"}],"../node_modules/core-js/library/modules/_is-array-iter.js":[function(require,module,exports) {
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":"../node_modules/core-js/library/modules/_iterators.js","./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/_classof.js":[function(require,module,exports) {
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":"../node_modules/core-js/library/modules/_cof.js","./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/core.get-iterator-method.js":[function(require,module,exports) {
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":"../node_modules/core-js/library/modules/_classof.js","./_wks":"../node_modules/core-js/library/modules/_wks.js","./_iterators":"../node_modules/core-js/library/modules/_iterators.js","./_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/core-js/library/modules/_for-of.js":[function(require,module,exports) {
var ctx = require('./_ctx');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var anObject = require('./_an-object');
var toLength = require('./_to-length');
var getIterFn = require('./core.get-iterator-method');
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;

},{"./_ctx":"../node_modules/core-js/library/modules/_ctx.js","./_iter-call":"../node_modules/core-js/library/modules/_iter-call.js","./_is-array-iter":"../node_modules/core-js/library/modules/_is-array-iter.js","./_an-object":"../node_modules/core-js/library/modules/_an-object.js","./_to-length":"../node_modules/core-js/library/modules/_to-length.js","./core.get-iterator-method":"../node_modules/core-js/library/modules/core.get-iterator-method.js"}],"../node_modules/core-js/library/modules/_validate-collection.js":[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

},{"./_is-object":"../node_modules/core-js/library/modules/_is-object.js"}],"../node_modules/core-js/library/modules/_collection-weak.js":[function(require,module,exports) {
'use strict';
var redefineAll = require('./_redefine-all');
var getWeak = require('./_meta').getWeak;
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var createArrayMethod = require('./_array-methods');
var $has = require('./_has');
var validate = require('./_validate-collection');
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

},{"./_redefine-all":"../node_modules/core-js/library/modules/_redefine-all.js","./_meta":"../node_modules/core-js/library/modules/_meta.js","./_an-object":"../node_modules/core-js/library/modules/_an-object.js","./_is-object":"../node_modules/core-js/library/modules/_is-object.js","./_an-instance":"../node_modules/core-js/library/modules/_an-instance.js","./_for-of":"../node_modules/core-js/library/modules/_for-of.js","./_array-methods":"../node_modules/core-js/library/modules/_array-methods.js","./_has":"../node_modules/core-js/library/modules/_has.js","./_validate-collection":"../node_modules/core-js/library/modules/_validate-collection.js"}],"../node_modules/core-js/library/modules/_collection.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var $export = require('./_export');
var meta = require('./_meta');
var fails = require('./_fails');
var hide = require('./_hide');
var redefineAll = require('./_redefine-all');
var forOf = require('./_for-of');
var anInstance = require('./_an-instance');
var isObject = require('./_is-object');
var setToStringTag = require('./_set-to-string-tag');
var dP = require('./_object-dp').f;
var each = require('./_array-methods')(0);
var DESCRIPTORS = require('./_descriptors');

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
        anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};

},{"./_global":"../node_modules/core-js/library/modules/_global.js","./_export":"../node_modules/core-js/library/modules/_export.js","./_meta":"../node_modules/core-js/library/modules/_meta.js","./_fails":"../node_modules/core-js/library/modules/_fails.js","./_hide":"../node_modules/core-js/library/modules/_hide.js","./_redefine-all":"../node_modules/core-js/library/modules/_redefine-all.js","./_for-of":"../node_modules/core-js/library/modules/_for-of.js","./_an-instance":"../node_modules/core-js/library/modules/_an-instance.js","./_is-object":"../node_modules/core-js/library/modules/_is-object.js","./_set-to-string-tag":"../node_modules/core-js/library/modules/_set-to-string-tag.js","./_object-dp":"../node_modules/core-js/library/modules/_object-dp.js","./_array-methods":"../node_modules/core-js/library/modules/_array-methods.js","./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js"}],"../node_modules/core-js/library/modules/es6.weak-map.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var each = require('./_array-methods')(0);
var redefine = require('./_redefine');
var meta = require('./_meta');
var assign = require('./_object-assign');
var weak = require('./_collection-weak');
var isObject = require('./_is-object');
var validate = require('./_validate-collection');
var NATIVE_WEAK_MAP = require('./_validate-collection');
var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = require('./_collection')(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}

},{"./_global":"../node_modules/core-js/library/modules/_global.js","./_array-methods":"../node_modules/core-js/library/modules/_array-methods.js","./_redefine":"../node_modules/core-js/library/modules/_redefine.js","./_meta":"../node_modules/core-js/library/modules/_meta.js","./_object-assign":"../node_modules/core-js/library/modules/_object-assign.js","./_collection-weak":"../node_modules/core-js/library/modules/_collection-weak.js","./_is-object":"../node_modules/core-js/library/modules/_is-object.js","./_validate-collection":"../node_modules/core-js/library/modules/_validate-collection.js","./_collection":"../node_modules/core-js/library/modules/_collection.js"}],"../node_modules/core-js/library/modules/_set-collection-of.js":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-setmap-offrom/
var $export = require('./_export');

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};

},{"./_export":"../node_modules/core-js/library/modules/_export.js"}],"../node_modules/core-js/library/modules/es7.weak-map.of.js":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
require('./_set-collection-of')('WeakMap');

},{"./_set-collection-of":"../node_modules/core-js/library/modules/_set-collection-of.js"}],"../node_modules/core-js/library/modules/_set-collection-from.js":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-setmap-offrom/
var $export = require('./_export');
var aFunction = require('./_a-function');
var ctx = require('./_ctx');
var forOf = require('./_for-of');

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};

},{"./_export":"../node_modules/core-js/library/modules/_export.js","./_a-function":"../node_modules/core-js/library/modules/_a-function.js","./_ctx":"../node_modules/core-js/library/modules/_ctx.js","./_for-of":"../node_modules/core-js/library/modules/_for-of.js"}],"../node_modules/core-js/library/modules/es7.weak-map.from.js":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
require('./_set-collection-from')('WeakMap');

},{"./_set-collection-from":"../node_modules/core-js/library/modules/_set-collection-from.js"}],"../node_modules/core-js/library/fn/weak-map.js":[function(require,module,exports) {
require('../modules/es6.object.to-string');
require('../modules/web.dom.iterable');
require('../modules/es6.weak-map');
require('../modules/es7.weak-map.of');
require('../modules/es7.weak-map.from');
module.exports = require('../modules/_core').WeakMap;

},{"../modules/es6.object.to-string":"../node_modules/core-js/library/modules/es6.object.to-string.js","../modules/web.dom.iterable":"../node_modules/core-js/library/modules/web.dom.iterable.js","../modules/es6.weak-map":"../node_modules/core-js/library/modules/es6.weak-map.js","../modules/es7.weak-map.of":"../node_modules/core-js/library/modules/es7.weak-map.of.js","../modules/es7.weak-map.from":"../node_modules/core-js/library/modules/es7.weak-map.from.js","../modules/_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/@babel/runtime-corejs2/core-js/weak-map.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/weak-map");
},{"core-js/library/fn/weak-map":"../node_modules/core-js/library/fn/weak-map.js"}],"../node_modules/core-js/library/modules/es6.object.define-property.js":[function(require,module,exports) {
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperty: require('./_object-dp').f });

},{"./_export":"../node_modules/core-js/library/modules/_export.js","./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js","./_object-dp":"../node_modules/core-js/library/modules/_object-dp.js"}],"../node_modules/core-js/library/fn/object/define-property.js":[function(require,module,exports) {
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

},{"../../modules/es6.object.define-property":"../node_modules/core-js/library/modules/es6.object.define-property.js","../../modules/_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/@babel/runtime-corejs2/core-js/object/define-property.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/object/define-property");
},{"core-js/library/fn/object/define-property":"../node_modules/core-js/library/fn/object/define-property.js"}],"../node_modules/core-js/library/modules/_string-at.js":[function(require,module,exports) {
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_to-integer":"../node_modules/core-js/library/modules/_to-integer.js","./_defined":"../node_modules/core-js/library/modules/_defined.js"}],"../node_modules/core-js/library/modules/es6.string.iterator.js":[function(require,module,exports) {
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_string-at":"../node_modules/core-js/library/modules/_string-at.js","./_iter-define":"../node_modules/core-js/library/modules/_iter-define.js"}],"../node_modules/core-js/library/modules/_wks-ext.js":[function(require,module,exports) {
exports.f = require('./_wks');

},{"./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/fn/symbol/iterator.js":[function(require,module,exports) {
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/_wks-ext').f('iterator');

},{"../../modules/es6.string.iterator":"../node_modules/core-js/library/modules/es6.string.iterator.js","../../modules/web.dom.iterable":"../node_modules/core-js/library/modules/web.dom.iterable.js","../../modules/_wks-ext":"../node_modules/core-js/library/modules/_wks-ext.js"}],"../node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/symbol/iterator");
},{"core-js/library/fn/symbol/iterator":"../node_modules/core-js/library/fn/symbol/iterator.js"}],"../node_modules/core-js/library/modules/_wks-define.js":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"./_global":"../node_modules/core-js/library/modules/_global.js","./_core":"../node_modules/core-js/library/modules/_core.js","./_library":"../node_modules/core-js/library/modules/_library.js","./_wks-ext":"../node_modules/core-js/library/modules/_wks-ext.js","./_object-dp":"../node_modules/core-js/library/modules/_object-dp.js"}],"../node_modules/core-js/library/modules/_enum-keys.js":[function(require,module,exports) {
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

},{"./_object-keys":"../node_modules/core-js/library/modules/_object-keys.js","./_object-gops":"../node_modules/core-js/library/modules/_object-gops.js","./_object-pie":"../node_modules/core-js/library/modules/_object-pie.js"}],"../node_modules/core-js/library/modules/_object-gopn.js":[function(require,module,exports) {
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_object-keys-internal":"../node_modules/core-js/library/modules/_object-keys-internal.js","./_enum-bug-keys":"../node_modules/core-js/library/modules/_enum-bug-keys.js"}],"../node_modules/core-js/library/modules/_object-gopn-ext.js":[function(require,module,exports) {
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject');
var gOPN = require('./_object-gopn').f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_to-iobject":"../node_modules/core-js/library/modules/_to-iobject.js","./_object-gopn":"../node_modules/core-js/library/modules/_object-gopn.js"}],"../node_modules/core-js/library/modules/_object-gopd.js":[function(require,module,exports) {
var pIE = require('./_object-pie');
var createDesc = require('./_property-desc');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var has = require('./_has');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

},{"./_object-pie":"../node_modules/core-js/library/modules/_object-pie.js","./_property-desc":"../node_modules/core-js/library/modules/_property-desc.js","./_to-iobject":"../node_modules/core-js/library/modules/_to-iobject.js","./_to-primitive":"../node_modules/core-js/library/modules/_to-primitive.js","./_has":"../node_modules/core-js/library/modules/_has.js","./_ie8-dom-define":"../node_modules/core-js/library/modules/_ie8-dom-define.js","./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js"}],"../node_modules/core-js/library/modules/es6.symbol.js":[function(require,module,exports) {

'use strict';
// ECMAScript 6 symbols shim
var global = require('./_global');
var has = require('./_has');
var DESCRIPTORS = require('./_descriptors');
var $export = require('./_export');
var redefine = require('./_redefine');
var META = require('./_meta').KEY;
var $fails = require('./_fails');
var shared = require('./_shared');
var setToStringTag = require('./_set-to-string-tag');
var uid = require('./_uid');
var wks = require('./_wks');
var wksExt = require('./_wks-ext');
var wksDefine = require('./_wks-define');
var enumKeys = require('./_enum-keys');
var isArray = require('./_is-array');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var toObject = require('./_to-object');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var createDesc = require('./_property-desc');
var _create = require('./_object-create');
var gOPNExt = require('./_object-gopn-ext');
var $GOPD = require('./_object-gopd');
var $GOPS = require('./_object-gops');
var $DP = require('./_object-dp');
var $keys = require('./_object-keys');
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !require('./_library')) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

},{"./_global":"../node_modules/core-js/library/modules/_global.js","./_has":"../node_modules/core-js/library/modules/_has.js","./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js","./_export":"../node_modules/core-js/library/modules/_export.js","./_redefine":"../node_modules/core-js/library/modules/_redefine.js","./_meta":"../node_modules/core-js/library/modules/_meta.js","./_fails":"../node_modules/core-js/library/modules/_fails.js","./_shared":"../node_modules/core-js/library/modules/_shared.js","./_set-to-string-tag":"../node_modules/core-js/library/modules/_set-to-string-tag.js","./_uid":"../node_modules/core-js/library/modules/_uid.js","./_wks":"../node_modules/core-js/library/modules/_wks.js","./_wks-ext":"../node_modules/core-js/library/modules/_wks-ext.js","./_wks-define":"../node_modules/core-js/library/modules/_wks-define.js","./_enum-keys":"../node_modules/core-js/library/modules/_enum-keys.js","./_is-array":"../node_modules/core-js/library/modules/_is-array.js","./_an-object":"../node_modules/core-js/library/modules/_an-object.js","./_is-object":"../node_modules/core-js/library/modules/_is-object.js","./_to-object":"../node_modules/core-js/library/modules/_to-object.js","./_to-iobject":"../node_modules/core-js/library/modules/_to-iobject.js","./_to-primitive":"../node_modules/core-js/library/modules/_to-primitive.js","./_property-desc":"../node_modules/core-js/library/modules/_property-desc.js","./_object-create":"../node_modules/core-js/library/modules/_object-create.js","./_object-gopn-ext":"../node_modules/core-js/library/modules/_object-gopn-ext.js","./_object-gopd":"../node_modules/core-js/library/modules/_object-gopd.js","./_object-gops":"../node_modules/core-js/library/modules/_object-gops.js","./_object-dp":"../node_modules/core-js/library/modules/_object-dp.js","./_object-keys":"../node_modules/core-js/library/modules/_object-keys.js","./_object-gopn":"../node_modules/core-js/library/modules/_object-gopn.js","./_object-pie":"../node_modules/core-js/library/modules/_object-pie.js","./_library":"../node_modules/core-js/library/modules/_library.js","./_hide":"../node_modules/core-js/library/modules/_hide.js"}],"../node_modules/core-js/library/modules/es7.symbol.async-iterator.js":[function(require,module,exports) {
require('./_wks-define')('asyncIterator');

},{"./_wks-define":"../node_modules/core-js/library/modules/_wks-define.js"}],"../node_modules/core-js/library/modules/es7.symbol.observable.js":[function(require,module,exports) {
require('./_wks-define')('observable');

},{"./_wks-define":"../node_modules/core-js/library/modules/_wks-define.js"}],"../node_modules/core-js/library/fn/symbol/index.js":[function(require,module,exports) {
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
require('../../modules/es7.symbol.async-iterator');
require('../../modules/es7.symbol.observable');
module.exports = require('../../modules/_core').Symbol;

},{"../../modules/es6.symbol":"../node_modules/core-js/library/modules/es6.symbol.js","../../modules/es6.object.to-string":"../node_modules/core-js/library/modules/es6.object.to-string.js","../../modules/es7.symbol.async-iterator":"../node_modules/core-js/library/modules/es7.symbol.async-iterator.js","../../modules/es7.symbol.observable":"../node_modules/core-js/library/modules/es7.symbol.observable.js","../../modules/_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/@babel/runtime-corejs2/core-js/symbol.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/symbol");
},{"core-js/library/fn/symbol":"../node_modules/core-js/library/fn/symbol/index.js"}],"../node_modules/@babel/runtime-corejs2/helpers/typeof.js":[function(require,module,exports) {
var _Symbol$iterator = require("../core-js/symbol/iterator");

var _Symbol = require("../core-js/symbol");

function _typeof2(obj) { if (typeof _Symbol === "function" && typeof _Symbol$iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof _Symbol === "function" && obj.constructor === _Symbol && obj !== _Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof _Symbol === "function" && _typeof2(_Symbol$iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof _Symbol === "function" && obj.constructor === _Symbol && obj !== _Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
},{"../core-js/symbol/iterator":"../node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js","../core-js/symbol":"../node_modules/@babel/runtime-corejs2/core-js/symbol.js"}],"js/three.min.js":[function(require,module,exports) {
var define;
"use strict";

var _freeze = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/freeze"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _create = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/create"));

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _isInteger = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/number/is-integer"));

var _epsilon = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/number/epsilon"));

var _parseFloat2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/parse-float"));

var _parseInt2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/parse-int"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-properties"));

var _weakMap = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/weak-map"));

var _defineProperty = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/typeof"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// threejs.org/license
(function (k, xa) {
  "object" === (typeof exports === "undefined" ? "undefined" : (0, _typeof2.default)(exports)) && "undefined" !== typeof module ? xa(exports) : "function" === typeof define && define.amd ? define(["exports"], xa) : xa(k.THREE = {});
})(void 0, function (k) {
  function xa() {}

  function C(a, b) {
    this.x = a || 0;
    this.y = b || 0;
  }

  function M() {
    this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    0 < arguments.length && console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.");
  }

  function ja(a, b, c, d) {
    this._x = a || 0;
    this._y = b || 0;
    this._z = c || 0;
    this._w = void 0 !== d ? d : 1;
  }

  function p(a, b, c) {
    this.x = a || 0;
    this.y = b || 0;
    this.z = c || 0;
  }

  function sa() {
    this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    0 < arguments.length && console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.");
  }

  function Y(a, b, c, d, e, f, g, h, l, m) {
    (0, _defineProperty.default)(this, "id", {
      value: xf++
    });
    this.uuid = S.generateUUID();
    this.name = "";
    this.image = void 0 !== a ? a : Y.DEFAULT_IMAGE;
    this.mipmaps = [];
    this.mapping = void 0 !== b ? b : Y.DEFAULT_MAPPING;
    this.wrapS = void 0 !== c ? c : 1001;
    this.wrapT = void 0 !== d ? d : 1001;
    this.magFilter = void 0 !== e ? e : 1006;
    this.minFilter = void 0 !== f ? f : 1008;
    this.anisotropy = void 0 !== l ? l : 1;
    this.format = void 0 !== g ? g : 1023;
    this.type = void 0 !== h ? h : 1009;
    this.offset = new C(0, 0);
    this.repeat = new C(1, 1);
    this.center = new C(0, 0);
    this.rotation = 0;
    this.matrixAutoUpdate = !0;
    this.matrix = new sa();
    this.generateMipmaps = !0;
    this.premultiplyAlpha = !1;
    this.flipY = !0;
    this.unpackAlignment = 4;
    this.encoding = void 0 !== m ? m : 3E3;
    this.version = 0;
    this.onUpdate = null;
  }

  function ea(a, b, c, d) {
    this.x = a || 0;
    this.y = b || 0;
    this.z = c || 0;
    this.w = void 0 !== d ? d : 1;
  }

  function hb(a, b, c) {
    this.width = a;
    this.height = b;
    this.scissor = new ea(0, 0, a, b);
    this.scissorTest = !1;
    this.viewport = new ea(0, 0, a, b);
    c = c || {};
    void 0 === c.minFilter && (c.minFilter = 1006);
    this.texture = new Y(void 0, void 0, c.wrapS, c.wrapT, c.magFilter, c.minFilter, c.format, c.type, c.anisotropy, c.encoding);
    this.depthBuffer = void 0 !== c.depthBuffer ? c.depthBuffer : !0;
    this.stencilBuffer = void 0 !== c.stencilBuffer ? c.stencilBuffer : !0;
    this.depthTexture = void 0 !== c.depthTexture ? c.depthTexture : null;
  }

  function Ib(a, b, c) {
    hb.call(this, a, b, c);
    this.activeMipMapLevel = this.activeCubeFace = 0;
  }

  function ib(a, b, c, d, e, f, g, h, l, m, u, n) {
    Y.call(this, null, f, g, h, l, m, d, e, u, n);
    this.image = {
      data: a,
      width: b,
      height: c
    };
    this.magFilter = void 0 !== l ? l : 1003;
    this.minFilter = void 0 !== m ? m : 1003;
    this.flipY = this.generateMipmaps = !1;
    this.unpackAlignment = 1;
  }

  function Va(a, b) {
    this.min = void 0 !== a ? a : new p(Infinity, Infinity, Infinity);
    this.max = void 0 !== b ? b : new p(-Infinity, -Infinity, -Infinity);
  }

  function Ea(a, b) {
    this.center = void 0 !== a ? a : new p();
    this.radius = void 0 !== b ? b : 0;
  }

  function Fa(a, b) {
    this.normal = void 0 !== a ? a : new p(1, 0, 0);
    this.constant = void 0 !== b ? b : 0;
  }

  function ld(a, b, c, d, e, f) {
    this.planes = [void 0 !== a ? a : new Fa(), void 0 !== b ? b : new Fa(), void 0 !== c ? c : new Fa(), void 0 !== d ? d : new Fa(), void 0 !== e ? e : new Fa(), void 0 !== f ? f : new Fa()];
  }

  function I(a, b, c) {
    return void 0 === b && void 0 === c ? this.set(a) : this.setRGB(a, b, c);
  }

  function yf(a) {
    function b(b, c) {
      var d = b.array,
          e = b.dynamic ? a.DYNAMIC_DRAW : a.STATIC_DRAW,
          h = a.createBuffer();
      a.bindBuffer(c, h);
      a.bufferData(c, d, e);
      b.onUploadCallback();
      c = a.FLOAT;
      d instanceof Float32Array ? c = a.FLOAT : d instanceof Float64Array ? console.warn("THREE.WebGLAttributes: Unsupported data buffer format: Float64Array.") : d instanceof Uint16Array ? c = a.UNSIGNED_SHORT : d instanceof Int16Array ? c = a.SHORT : d instanceof Uint32Array ? c = a.UNSIGNED_INT : d instanceof Int32Array ? c = a.INT : d instanceof Int8Array ? c = a.BYTE : d instanceof Uint8Array && (c = a.UNSIGNED_BYTE);
      return {
        buffer: h,
        type: c,
        bytesPerElement: d.BYTES_PER_ELEMENT,
        version: b.version
      };
    }

    var c = new _weakMap.default();
    return {
      get: function get(a) {
        a.isInterleavedBufferAttribute && (a = a.data);
        return c.get(a);
      },
      remove: function remove(b) {
        b.isInterleavedBufferAttribute && (b = b.data);
        var d = c.get(b);
        d && (a.deleteBuffer(d.buffer), c.delete(b));
      },
      update: function update(d, e) {
        d.isInterleavedBufferAttribute && (d = d.data);
        var f = c.get(d);
        if (void 0 === f) c.set(d, b(d, e));else if (f.version < d.version) {
          var g = d,
              h = g.array,
              l = g.updateRange;
          a.bindBuffer(e, f.buffer);
          !1 === g.dynamic ? a.bufferData(e, h, a.STATIC_DRAW) : -1 === l.count ? a.bufferSubData(e, 0, h) : 0 === l.count ? console.error("THREE.WebGLObjects.updateBuffer: dynamic THREE.BufferAttribute marked as needsUpdate but updateRange.count is 0, ensure you are using set methods or updating manually.") : (a.bufferSubData(e, l.offset * h.BYTES_PER_ELEMENT, h.subarray(l.offset, l.offset + l.count)), l.count = -1);
          f.version = d.version;
        }
      }
    };
  }

  function jb(a, b, c, d) {
    this._x = a || 0;
    this._y = b || 0;
    this._z = c || 0;
    this._order = d || jb.DefaultOrder;
  }

  function Sd() {
    this.mask = 1;
  }

  function A() {
    (0, _defineProperty.default)(this, "id", {
      value: zf++
    });
    this.uuid = S.generateUUID();
    this.name = "";
    this.type = "Object3D";
    this.parent = null;
    this.children = [];
    this.up = A.DefaultUp.clone();
    var a = new p(),
        b = new jb(),
        c = new ja(),
        d = new p(1, 1, 1);
    b.onChange(function () {
      c.setFromEuler(b, !1);
    });
    c.onChange(function () {
      b.setFromQuaternion(c, void 0, !1);
    });
    (0, _defineProperties.default)(this, {
      position: {
        enumerable: !0,
        value: a
      },
      rotation: {
        enumerable: !0,
        value: b
      },
      quaternion: {
        enumerable: !0,
        value: c
      },
      scale: {
        enumerable: !0,
        value: d
      },
      modelViewMatrix: {
        value: new M()
      },
      normalMatrix: {
        value: new sa()
      }
    });
    this.matrix = new M();
    this.matrixWorld = new M();
    this.matrixAutoUpdate = A.DefaultMatrixAutoUpdate;
    this.matrixWorldNeedsUpdate = !1;
    this.layers = new Sd();
    this.visible = !0;
    this.receiveShadow = this.castShadow = !1;
    this.frustumCulled = !0;
    this.renderOrder = 0;
    this.userData = {};
  }

  function Qa() {
    A.call(this);
    this.type = "Camera";
    this.matrixWorldInverse = new M();
    this.projectionMatrix = new M();
  }

  function Jb(a, b, c, d, e, f) {
    Qa.call(this);
    this.type = "OrthographicCamera";
    this.zoom = 1;
    this.view = null;
    this.left = a;
    this.right = b;
    this.top = c;
    this.bottom = d;
    this.near = void 0 !== e ? e : .1;
    this.far = void 0 !== f ? f : 2E3;
    this.updateProjectionMatrix();
  }

  function Wa(a, b, c, d, e, f) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.normal = d && d.isVector3 ? d : new p();
    this.vertexNormals = (0, _isArray.default)(d) ? d : [];
    this.color = e && e.isColor ? e : new I();
    this.vertexColors = (0, _isArray.default)(e) ? e : [];
    this.materialIndex = void 0 !== f ? f : 0;
  }

  function N() {
    (0, _defineProperty.default)(this, "id", {
      value: Af += 2
    });
    this.uuid = S.generateUUID();
    this.name = "";
    this.type = "Geometry";
    this.vertices = [];
    this.colors = [];
    this.faces = [];
    this.faceVertexUvs = [[]];
    this.morphTargets = [];
    this.morphNormals = [];
    this.skinWeights = [];
    this.skinIndices = [];
    this.lineDistances = [];
    this.boundingSphere = this.boundingBox = null;
    this.groupsNeedUpdate = this.lineDistancesNeedUpdate = this.colorsNeedUpdate = this.normalsNeedUpdate = this.uvsNeedUpdate = this.verticesNeedUpdate = this.elementsNeedUpdate = !1;
  }

  function T(a, b, c) {
    if ((0, _isArray.default)(a)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.name = "";
    this.array = a;
    this.itemSize = b;
    this.count = void 0 !== a ? a.length / b : 0;
    this.normalized = !0 === c;
    this.dynamic = !1;
    this.updateRange = {
      offset: 0,
      count: -1
    };
    this.version = 0;
  }

  function rc(a, b, c) {
    T.call(this, new Int8Array(a), b, c);
  }

  function sc(a, b, c) {
    T.call(this, new Uint8Array(a), b, c);
  }

  function tc(a, b, c) {
    T.call(this, new Uint8ClampedArray(a), b, c);
  }

  function uc(a, b, c) {
    T.call(this, new Int16Array(a), b, c);
  }

  function kb(a, b, c) {
    T.call(this, new Uint16Array(a), b, c);
  }

  function vc(a, b, c) {
    T.call(this, new Int32Array(a), b, c);
  }

  function lb(a, b, c) {
    T.call(this, new Uint32Array(a), b, c);
  }

  function z(a, b, c) {
    T.call(this, new Float32Array(a), b, c);
  }

  function wc(a, b, c) {
    T.call(this, new Float64Array(a), b, c);
  }

  function Ce() {
    this.vertices = [];
    this.normals = [];
    this.colors = [];
    this.uvs = [];
    this.uvs2 = [];
    this.groups = [];
    this.morphTargets = {};
    this.skinWeights = [];
    this.skinIndices = [];
    this.boundingSphere = this.boundingBox = null;
    this.groupsNeedUpdate = this.uvsNeedUpdate = this.colorsNeedUpdate = this.normalsNeedUpdate = this.verticesNeedUpdate = !1;
  }

  function De(a) {
    if (0 === a.length) return -Infinity;

    for (var b = a[0], c = 1, d = a.length; c < d; ++c) {
      a[c] > b && (b = a[c]);
    }

    return b;
  }

  function F() {
    (0, _defineProperty.default)(this, "id", {
      value: Bf += 2
    });
    this.uuid = S.generateUUID();
    this.name = "";
    this.type = "BufferGeometry";
    this.index = null;
    this.attributes = {};
    this.morphAttributes = {};
    this.groups = [];
    this.boundingSphere = this.boundingBox = null;
    this.drawRange = {
      start: 0,
      count: Infinity
    };
  }

  function Kb(a, b, c, d, e, f) {
    N.call(this);
    this.type = "BoxGeometry";
    this.parameters = {
      width: a,
      height: b,
      depth: c,
      widthSegments: d,
      heightSegments: e,
      depthSegments: f
    };
    this.fromBufferGeometry(new mb(a, b, c, d, e, f));
    this.mergeVertices();
  }

  function mb(a, b, c, d, e, f) {
    function g(a, b, c, d, e, f, g, k, P, H, ta) {
      var q = f / P,
          v = g / H,
          x = f / 2,
          K = g / 2,
          w = k / 2;
      g = P + 1;
      var y = H + 1,
          B = f = 0,
          G,
          C,
          z = new p();

      for (C = 0; C < y; C++) {
        var A = C * v - K;

        for (G = 0; G < g; G++) {
          z[a] = (G * q - x) * d, z[b] = A * e, z[c] = w, m.push(z.x, z.y, z.z), z[a] = 0, z[b] = 0, z[c] = 0 < k ? 1 : -1, u.push(z.x, z.y, z.z), n.push(G / P), n.push(1 - C / H), f += 1;
        }
      }

      for (C = 0; C < H; C++) {
        for (G = 0; G < P; G++) {
          a = t + G + g * (C + 1), b = t + (G + 1) + g * (C + 1), c = t + (G + 1) + g * C, l.push(t + G + g * C, a, c), l.push(a, b, c), B += 6;
        }
      }

      h.addGroup(r, B, ta);
      r += B;
      t += f;
    }

    F.call(this);
    this.type = "BoxBufferGeometry";
    this.parameters = {
      width: a,
      height: b,
      depth: c,
      widthSegments: d,
      heightSegments: e,
      depthSegments: f
    };
    var h = this;
    a = a || 1;
    b = b || 1;
    c = c || 1;
    d = Math.floor(d) || 1;
    e = Math.floor(e) || 1;
    f = Math.floor(f) || 1;
    var l = [],
        m = [],
        u = [],
        n = [],
        t = 0,
        r = 0;
    g("z", "y", "x", -1, -1, c, b, a, f, e, 0);
    g("z", "y", "x", 1, -1, c, b, -a, f, e, 1);
    g("x", "z", "y", 1, 1, a, c, b, d, f, 2);
    g("x", "z", "y", 1, -1, a, c, -b, d, f, 3);
    g("x", "y", "z", 1, -1, a, b, c, d, e, 4);
    g("x", "y", "z", -1, -1, a, b, -c, d, e, 5);
    this.setIndex(l);
    this.addAttribute("position", new z(m, 3));
    this.addAttribute("normal", new z(u, 3));
    this.addAttribute("uv", new z(n, 2));
  }

  function xc(a, b, c, d) {
    N.call(this);
    this.type = "PlaneGeometry";
    this.parameters = {
      width: a,
      height: b,
      widthSegments: c,
      heightSegments: d
    };
    this.fromBufferGeometry(new pb(a, b, c, d));
    this.mergeVertices();
  }

  function pb(a, b, c, d) {
    F.call(this);
    this.type = "PlaneBufferGeometry";
    this.parameters = {
      width: a,
      height: b,
      widthSegments: c,
      heightSegments: d
    };
    a = a || 1;
    b = b || 1;
    var e = a / 2,
        f = b / 2;
    c = Math.floor(c) || 1;
    d = Math.floor(d) || 1;
    var g = c + 1,
        h = d + 1,
        l = a / c,
        m = b / d,
        u = [],
        n = [],
        t = [],
        r = [];

    for (a = 0; a < h; a++) {
      var q = a * m - f;

      for (b = 0; b < g; b++) {
        n.push(b * l - e, -q, 0), t.push(0, 0, 1), r.push(b / c), r.push(1 - a / d);
      }
    }

    for (a = 0; a < d; a++) {
      for (b = 0; b < c; b++) {
        e = b + g * (a + 1), f = b + 1 + g * (a + 1), h = b + 1 + g * a, u.push(b + g * a, e, h), u.push(e, f, h);
      }
    }

    this.setIndex(u);
    this.addAttribute("position", new z(n, 3));
    this.addAttribute("normal", new z(t, 3));
    this.addAttribute("uv", new z(r, 2));
  }

  function O() {
    (0, _defineProperty.default)(this, "id", {
      value: Cf++
    });
    this.uuid = S.generateUUID();
    this.name = "";
    this.type = "Material";
    this.lights = this.fog = !0;
    this.blending = 1;
    this.side = 0;
    this.flatShading = !1;
    this.vertexColors = 0;
    this.opacity = 1;
    this.transparent = !1;
    this.blendSrc = 204;
    this.blendDst = 205;
    this.blendEquation = 100;
    this.blendEquationAlpha = this.blendDstAlpha = this.blendSrcAlpha = null;
    this.depthFunc = 3;
    this.depthWrite = this.depthTest = !0;
    this.clippingPlanes = null;
    this.clipShadows = this.clipIntersection = !1;
    this.shadowSide = null;
    this.colorWrite = !0;
    this.precision = null;
    this.polygonOffset = !1;
    this.polygonOffsetUnits = this.polygonOffsetFactor = 0;
    this.dithering = !1;
    this.alphaTest = 0;
    this.premultipliedAlpha = !1;
    this.overdraw = 0;
    this.visible = !0;
    this.userData = {};
    this.needsUpdate = !0;
  }

  function za(a) {
    O.call(this);
    this.type = "MeshBasicMaterial";
    this.color = new I(16777215);
    this.lightMap = this.map = null;
    this.lightMapIntensity = 1;
    this.aoMap = null;
    this.aoMapIntensity = 1;
    this.envMap = this.alphaMap = this.specularMap = null;
    this.combine = 0;
    this.reflectivity = 1;
    this.refractionRatio = .98;
    this.wireframe = !1;
    this.wireframeLinewidth = 1;
    this.wireframeLinejoin = this.wireframeLinecap = "round";
    this.lights = this.morphTargets = this.skinning = !1;
    this.setValues(a);
  }

  function va(a) {
    O.call(this);
    this.type = "ShaderMaterial";
    this.defines = {};
    this.uniforms = {};
    this.vertexShader = "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}";
    this.fragmentShader = "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}";
    this.linewidth = 1;
    this.wireframe = !1;
    this.wireframeLinewidth = 1;
    this.morphNormals = this.morphTargets = this.skinning = this.clipping = this.lights = this.fog = !1;
    this.extensions = {
      derivatives: !1,
      fragDepth: !1,
      drawBuffers: !1,
      shaderTextureLOD: !1
    };
    this.defaultAttributeValues = {
      color: [1, 1, 1],
      uv: [0, 0],
      uv2: [0, 0]
    };
    this.index0AttributeName = void 0;
    this.uniformsNeedUpdate = !1;
    void 0 !== a && (void 0 !== a.attributes && console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."), this.setValues(a));
  }

  function qb(a, b) {
    this.origin = void 0 !== a ? a : new p();
    this.direction = void 0 !== b ? b : new p();
  }

  function Lb(a, b) {
    this.start = void 0 !== a ? a : new p();
    this.end = void 0 !== b ? b : new p();
  }

  function Aa(a, b, c) {
    this.a = void 0 !== a ? a : new p();
    this.b = void 0 !== b ? b : new p();
    this.c = void 0 !== c ? c : new p();
  }

  function oa(a, b) {
    A.call(this);
    this.type = "Mesh";
    this.geometry = void 0 !== a ? a : new F();
    this.material = void 0 !== b ? b : new za({
      color: 16777215 * Math.random()
    });
    this.drawMode = 0;
    this.updateMorphTargets();
  }

  function Df(a, b, c, d) {
    function e(a, c) {
      b.buffers.color.setClear(a.r, a.g, a.b, c, d);
    }

    var f = new I(0),
        g = 0,
        h,
        l,
        m;
    return {
      getClearColor: function getClearColor() {
        return f;
      },
      setClearColor: function setClearColor(a, b) {
        f.set(a);
        g = void 0 !== b ? b : 1;
        e(f, g);
      },
      getClearAlpha: function getClearAlpha() {
        return g;
      },
      setClearAlpha: function setClearAlpha(a) {
        g = a;
        e(f, g);
      },
      render: function render(b, d, t, r) {
        d = d.background;
        null === d ? e(f, g) : d && d.isColor && (e(d, 1), r = !0);
        (a.autoClear || r) && a.clear(a.autoClearColor, a.autoClearDepth, a.autoClearStencil);
        d && d.isCubeTexture ? (void 0 === m && (m = new oa(new mb(1, 1, 1), new va({
          uniforms: rb.cube.uniforms,
          vertexShader: rb.cube.vertexShader,
          fragmentShader: rb.cube.fragmentShader,
          side: 1,
          depthTest: !0,
          depthWrite: !1,
          fog: !1
        })), m.geometry.removeAttribute("normal"), m.geometry.removeAttribute("uv"), m.onBeforeRender = function (a, b, c) {
          this.matrixWorld.copyPosition(c.matrixWorld);
        }, c.update(m.geometry)), m.material.uniforms.tCube.value = d, b.push(m, m.geometry, m.material, 0, null)) : d && d.isTexture && (void 0 === h && (h = new Jb(-1, 1, 1, -1, 0, 1), l = new oa(new pb(2, 2), new za({
          depthTest: !1,
          depthWrite: !1,
          fog: !1
        })), c.update(l.geometry)), l.material.map = d, a.renderBufferDirect(h, null, l.geometry, l.material, l, null));
      }
    };
  }

  function Ef(a, b, c) {
    var d;

    this.setMode = function (a) {
      d = a;
    };

    this.render = function (b, f) {
      a.drawArrays(d, b, f);
      c.update(f, d);
    };

    this.renderInstances = function (a, f, g) {
      var e = b.get("ANGLE_instanced_arrays");
      if (null === e) console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");else {
        var l = a.attributes.position;
        l.isInterleavedBufferAttribute ? (g = l.data.count, e.drawArraysInstancedANGLE(d, 0, g, a.maxInstancedCount)) : e.drawArraysInstancedANGLE(d, f, g, a.maxInstancedCount);
        c.update(g, d, a.maxInstancedCount);
      }
    };
  }

  function Ff(a, b, c) {
    function d(b) {
      if ("highp" === b) {
        if (0 < a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.HIGH_FLOAT).precision && 0 < a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.HIGH_FLOAT).precision) return "highp";
        b = "mediump";
      }

      return "mediump" === b && 0 < a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.MEDIUM_FLOAT).precision && 0 < a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.MEDIUM_FLOAT).precision ? "mediump" : "lowp";
    }

    var e,
        f = void 0 !== c.precision ? c.precision : "highp",
        g = d(f);
    g !== f && (console.warn("THREE.WebGLRenderer:", f, "not supported, using", g, "instead."), f = g);
    c = !0 === c.logarithmicDepthBuffer;
    g = a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS);
    var h = a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
        l = a.getParameter(a.MAX_TEXTURE_SIZE),
        m = a.getParameter(a.MAX_CUBE_MAP_TEXTURE_SIZE),
        u = a.getParameter(a.MAX_VERTEX_ATTRIBS),
        n = a.getParameter(a.MAX_VERTEX_UNIFORM_VECTORS),
        t = a.getParameter(a.MAX_VARYING_VECTORS),
        r = a.getParameter(a.MAX_FRAGMENT_UNIFORM_VECTORS),
        q = 0 < h,
        k = !!b.get("OES_texture_float");
    return {
      getMaxAnisotropy: function getMaxAnisotropy() {
        if (void 0 !== e) return e;
        var c = b.get("EXT_texture_filter_anisotropic");
        return e = null !== c ? a.getParameter(c.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0;
      },
      getMaxPrecision: d,
      precision: f,
      logarithmicDepthBuffer: c,
      maxTextures: g,
      maxVertexTextures: h,
      maxTextureSize: l,
      maxCubemapSize: m,
      maxAttributes: u,
      maxVertexUniforms: n,
      maxVaryings: t,
      maxFragmentUniforms: r,
      vertexTextures: q,
      floatFragmentTextures: k,
      floatVertexTextures: q && k
    };
  }

  function Gf() {
    function a() {
      m.value !== d && (m.value = d, m.needsUpdate = 0 < e);
      c.numPlanes = e;
      c.numIntersection = 0;
    }

    function b(a, b, d, e) {
      var f = null !== a ? a.length : 0,
          g = null;

      if (0 !== f) {
        g = m.value;

        if (!0 !== e || null === g) {
          e = d + 4 * f;
          b = b.matrixWorldInverse;
          l.getNormalMatrix(b);
          if (null === g || g.length < e) g = new Float32Array(e);

          for (e = 0; e !== f; ++e, d += 4) {
            h.copy(a[e]).applyMatrix4(b, l), h.normal.toArray(g, d), g[d + 3] = h.constant;
          }
        }

        m.value = g;
        m.needsUpdate = !0;
      }

      c.numPlanes = f;
      return g;
    }

    var c = this,
        d = null,
        e = 0,
        f = !1,
        g = !1,
        h = new Fa(),
        l = new sa(),
        m = {
      value: null,
      needsUpdate: !1
    };
    this.uniform = m;
    this.numIntersection = this.numPlanes = 0;

    this.init = function (a, c, g) {
      var h = 0 !== a.length || c || 0 !== e || f;
      f = c;
      d = b(a, g, 0);
      e = a.length;
      return h;
    };

    this.beginShadows = function () {
      g = !0;
      b(null);
    };

    this.endShadows = function () {
      g = !1;
      a();
    };

    this.setState = function (c, h, l, r, q, k) {
      if (!f || null === c || 0 === c.length || g && !l) g ? b(null) : a();else {
        l = g ? 0 : e;
        var n = 4 * l,
            u = q.clippingState || null;
        m.value = u;
        u = b(c, r, n, k);

        for (c = 0; c !== n; ++c) {
          u[c] = d[c];
        }

        q.clippingState = u;
        this.numIntersection = h ? this.numPlanes : 0;
        this.numPlanes += l;
      }
    };
  }

  function Hf(a) {
    var b = {};
    return {
      get: function get(c) {
        if (void 0 !== b[c]) return b[c];

        switch (c) {
          case "WEBGL_depth_texture":
            var d = a.getExtension("WEBGL_depth_texture") || a.getExtension("MOZ_WEBGL_depth_texture") || a.getExtension("WEBKIT_WEBGL_depth_texture");
            break;

          case "EXT_texture_filter_anisotropic":
            d = a.getExtension("EXT_texture_filter_anisotropic") || a.getExtension("MOZ_EXT_texture_filter_anisotropic") || a.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
            break;

          case "WEBGL_compressed_texture_s3tc":
            d = a.getExtension("WEBGL_compressed_texture_s3tc") || a.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || a.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
            break;

          case "WEBGL_compressed_texture_pvrtc":
            d = a.getExtension("WEBGL_compressed_texture_pvrtc") || a.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
            break;

          case "WEBGL_compressed_texture_etc1":
            d = a.getExtension("WEBGL_compressed_texture_etc1");
            break;

          default:
            d = a.getExtension(c);
        }

        null === d && console.warn("THREE.WebGLRenderer: " + c + " extension not supported.");
        return b[c] = d;
      }
    };
  }

  function If(a, b, c) {
    function d(a) {
      a = a.target;
      var g = e[a.id];
      null !== g.index && b.remove(g.index);

      for (var l in g.attributes) {
        b.remove(g.attributes[l]);
      }

      a.removeEventListener("dispose", d);
      delete e[a.id];
      if (l = f[a.id]) b.remove(l), delete f[a.id];
      if (l = f[g.id]) b.remove(l), delete f[g.id];
      c.memory.geometries--;
    }

    var e = {},
        f = {};
    return {
      get: function get(a, b) {
        var f = e[b.id];
        if (f) return f;
        b.addEventListener("dispose", d);
        b.isBufferGeometry ? f = b : b.isGeometry && (void 0 === b._bufferGeometry && (b._bufferGeometry = new F().setFromObject(a)), f = b._bufferGeometry);
        e[b.id] = f;
        c.memory.geometries++;
        return f;
      },
      update: function update(c) {
        var d = c.index,
            e = c.attributes;
        null !== d && b.update(d, a.ELEMENT_ARRAY_BUFFER);

        for (var f in e) {
          b.update(e[f], a.ARRAY_BUFFER);
        }

        c = c.morphAttributes;

        for (f in c) {
          d = c[f];
          e = 0;

          for (var g = d.length; e < g; e++) {
            b.update(d[e], a.ARRAY_BUFFER);
          }
        }
      },
      getWireframeAttribute: function getWireframeAttribute(c) {
        var d = f[c.id];
        if (d) return d;
        d = [];
        var e = c.index,
            g = c.attributes;

        if (null !== e) {
          e = e.array;
          g = 0;

          for (var u = e.length; g < u; g += 3) {
            var n = e[g + 0],
                t = e[g + 1],
                r = e[g + 2];
            d.push(n, t, t, r, r, n);
          }
        } else for (e = g.position.array, g = 0, u = e.length / 3 - 1; g < u; g += 3) {
          n = g + 0, t = g + 1, r = g + 2, d.push(n, t, t, r, r, n);
        }

        d = new (65535 < De(d) ? lb : kb)(d, 1);
        b.update(d, a.ELEMENT_ARRAY_BUFFER);
        return f[c.id] = d;
      }
    };
  }

  function Jf(a, b, c) {
    var d, e, f;

    this.setMode = function (a) {
      d = a;
    };

    this.setIndex = function (a) {
      e = a.type;
      f = a.bytesPerElement;
    };

    this.render = function (b, h) {
      a.drawElements(d, h, e, b * f);
      c.update(h, d);
    };

    this.renderInstances = function (a, h, l) {
      var g = b.get("ANGLE_instanced_arrays");
      null === g ? console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.") : (g.drawElementsInstancedANGLE(d, l, e, h * f, a.maxInstancedCount), c.update(l, d, a.maxInstancedCount));
    };
  }

  function Kf(a) {
    var b = {
      frame: 0,
      calls: 0,
      triangles: 0,
      points: 0,
      lines: 0
    };
    return {
      memory: {
        geometries: 0,
        textures: 0
      },
      render: b,
      programs: null,
      autoReset: !0,
      reset: function reset() {
        b.frame++;
        b.calls = 0;
        b.triangles = 0;
        b.points = 0;
        b.lines = 0;
      },
      update: function update(c, d, e) {
        e = e || 1;
        b.calls++;

        switch (d) {
          case a.TRIANGLES:
            b.triangles += c / 3 * e;
            break;

          case a.TRIANGLE_STRIP:
          case a.TRIANGLE_FAN:
            b.triangles += e * (c - 2);
            break;

          case a.LINES:
            b.lines += c / 2 * e;
            break;

          case a.LINE_STRIP:
            b.lines += e * (c - 1);
            break;

          case a.LINE_LOOP:
            b.lines += e * c;
            break;

          case a.POINTS:
            b.points += e * c;
            break;

          default:
            console.error("THREE.WebGLInfo: Unknown draw mode:", d);
        }
      }
    };
  }

  function Lf(a, b) {
    return Math.abs(b[1]) - Math.abs(a[1]);
  }

  function Mf(a) {
    var b = {},
        c = new Float32Array(8);
    return {
      update: function update(d, e, f, g) {
        var h = d.morphTargetInfluences,
            l = h.length;
        d = b[e.id];

        if (void 0 === d) {
          d = [];

          for (var m = 0; m < l; m++) {
            d[m] = [m, 0];
          }

          b[e.id] = d;
        }

        var u = f.morphTargets && e.morphAttributes.position;
        f = f.morphNormals && e.morphAttributes.normal;

        for (m = 0; m < l; m++) {
          var n = d[m];
          0 !== n[1] && (u && e.removeAttribute("morphTarget" + m), f && e.removeAttribute("morphNormal" + m));
        }

        for (m = 0; m < l; m++) {
          n = d[m], n[0] = m, n[1] = h[m];
        }

        d.sort(Lf);

        for (m = 0; 8 > m; m++) {
          if (n = d[m]) if (h = n[0], l = n[1]) {
            u && e.addAttribute("morphTarget" + m, u[h]);
            f && e.addAttribute("morphNormal" + m, f[h]);
            c[m] = l;
            continue;
          }
          c[m] = 0;
        }

        g.getUniforms().setValue(a, "morphTargetInfluences", c);
      }
    };
  }

  function Nf(a, b) {
    var c = {};
    return {
      update: function update(d) {
        var e = b.render.frame,
            f = d.geometry,
            g = a.get(d, f);
        c[g.id] !== e && (f.isGeometry && g.updateFromObject(d), a.update(g), c[g.id] = e);
        return g;
      },
      dispose: function dispose() {
        c = {};
      }
    };
  }

  function ab(a, b, c, d, e, f, g, h, l, m) {
    a = void 0 !== a ? a : [];
    Y.call(this, a, void 0 !== b ? b : 301, c, d, e, f, g, h, l, m);
    this.flipY = !1;
  }

  function Mb(a, b, c) {
    var d = a[0];
    if (0 >= d || 0 < d) return a;
    var e = b * c,
        f = Ee[e];
    void 0 === f && (f = new Float32Array(e), Ee[e] = f);
    if (0 !== b) for (d.toArray(f, 0), d = 1, e = 0; d !== b; ++d) {
      e += c, a[d].toArray(f, e);
    }
    return f;
  }

  function Fe(a, b) {
    var c = Ge[b];
    void 0 === c && (c = new Int32Array(b), Ge[b] = c);

    for (var d = 0; d !== b; ++d) {
      c[d] = a.allocTextureUnit();
    }

    return c;
  }

  function Of(a, b) {
    a.uniform1f(this.addr, b);
  }

  function Pf(a, b) {
    a.uniform1i(this.addr, b);
  }

  function Qf(a, b) {
    void 0 === b.x ? a.uniform2fv(this.addr, b) : a.uniform2f(this.addr, b.x, b.y);
  }

  function Rf(a, b) {
    void 0 !== b.x ? a.uniform3f(this.addr, b.x, b.y, b.z) : void 0 !== b.r ? a.uniform3f(this.addr, b.r, b.g, b.b) : a.uniform3fv(this.addr, b);
  }

  function Sf(a, b) {
    void 0 === b.x ? a.uniform4fv(this.addr, b) : a.uniform4f(this.addr, b.x, b.y, b.z, b.w);
  }

  function Tf(a, b) {
    a.uniformMatrix2fv(this.addr, !1, b.elements || b);
  }

  function Uf(a, b) {
    void 0 === b.elements ? a.uniformMatrix3fv(this.addr, !1, b) : (He.set(b.elements), a.uniformMatrix3fv(this.addr, !1, He));
  }

  function Vf(a, b) {
    void 0 === b.elements ? a.uniformMatrix4fv(this.addr, !1, b) : (Ie.set(b.elements), a.uniformMatrix4fv(this.addr, !1, Ie));
  }

  function Wf(a, b, c) {
    var d = c.allocTextureUnit();
    a.uniform1i(this.addr, d);
    c.setTexture2D(b || Je, d);
  }

  function Xf(a, b, c) {
    var d = c.allocTextureUnit();
    a.uniform1i(this.addr, d);
    c.setTextureCube(b || Ke, d);
  }

  function Le(a, b) {
    a.uniform2iv(this.addr, b);
  }

  function Me(a, b) {
    a.uniform3iv(this.addr, b);
  }

  function Ne(a, b) {
    a.uniform4iv(this.addr, b);
  }

  function Yf(a) {
    switch (a) {
      case 5126:
        return Of;

      case 35664:
        return Qf;

      case 35665:
        return Rf;

      case 35666:
        return Sf;

      case 35674:
        return Tf;

      case 35675:
        return Uf;

      case 35676:
        return Vf;

      case 35678:
      case 36198:
        return Wf;

      case 35680:
        return Xf;

      case 5124:
      case 35670:
        return Pf;

      case 35667:
      case 35671:
        return Le;

      case 35668:
      case 35672:
        return Me;

      case 35669:
      case 35673:
        return Ne;
    }
  }

  function Zf(a, b) {
    a.uniform1fv(this.addr, b);
  }

  function $f(a, b) {
    a.uniform1iv(this.addr, b);
  }

  function ag(a, b) {
    a.uniform2fv(this.addr, Mb(b, this.size, 2));
  }

  function bg(a, b) {
    a.uniform3fv(this.addr, Mb(b, this.size, 3));
  }

  function cg(a, b) {
    a.uniform4fv(this.addr, Mb(b, this.size, 4));
  }

  function dg(a, b) {
    a.uniformMatrix2fv(this.addr, !1, Mb(b, this.size, 4));
  }

  function eg(a, b) {
    a.uniformMatrix3fv(this.addr, !1, Mb(b, this.size, 9));
  }

  function fg(a, b) {
    a.uniformMatrix4fv(this.addr, !1, Mb(b, this.size, 16));
  }

  function gg(a, b, c) {
    var d = b.length,
        e = Fe(c, d);
    a.uniform1iv(this.addr, e);

    for (a = 0; a !== d; ++a) {
      c.setTexture2D(b[a] || Je, e[a]);
    }
  }

  function hg(a, b, c) {
    var d = b.length,
        e = Fe(c, d);
    a.uniform1iv(this.addr, e);

    for (a = 0; a !== d; ++a) {
      c.setTextureCube(b[a] || Ke, e[a]);
    }
  }

  function ig(a) {
    switch (a) {
      case 5126:
        return Zf;

      case 35664:
        return ag;

      case 35665:
        return bg;

      case 35666:
        return cg;

      case 35674:
        return dg;

      case 35675:
        return eg;

      case 35676:
        return fg;

      case 35678:
        return gg;

      case 35680:
        return hg;

      case 5124:
      case 35670:
        return $f;

      case 35667:
      case 35671:
        return Le;

      case 35668:
      case 35672:
        return Me;

      case 35669:
      case 35673:
        return Ne;
    }
  }

  function jg(a, b, c) {
    this.id = a;
    this.addr = c;
    this.setValue = Yf(b.type);
  }

  function kg(a, b, c) {
    this.id = a;
    this.addr = c;
    this.size = b.size;
    this.setValue = ig(b.type);
  }

  function Oe(a) {
    this.id = a;
    this.seq = [];
    this.map = {};
  }

  function bb(a, b, c) {
    this.seq = [];
    this.map = {};
    this.renderer = c;
    c = a.getProgramParameter(b, a.ACTIVE_UNIFORMS);

    for (var d = 0; d < c; ++d) {
      var e = a.getActiveUniform(b, d),
          f = a.getUniformLocation(b, e.name),
          g = this,
          h = e.name,
          l = h.length;

      for (Ud.lastIndex = 0;;) {
        var m = Ud.exec(h),
            u = Ud.lastIndex,
            n = m[1],
            t = m[3];
        "]" === m[2] && (n |= 0);

        if (void 0 === t || "[" === t && u + 2 === l) {
          h = g;
          e = void 0 === t ? new jg(n, e, f) : new kg(n, e, f);
          h.seq.push(e);
          h.map[e.id] = e;
          break;
        } else t = g.map[n], void 0 === t && (t = new Oe(n), n = g, g = t, n.seq.push(g), n.map[g.id] = g), g = t;
      }
    }
  }

  function lg(a) {
    a = a.split("\n");

    for (var b = 0; b < a.length; b++) {
      a[b] = b + 1 + ": " + a[b];
    }

    return a.join("\n");
  }

  function Pe(a, b, c) {
    var d = a.createShader(b);
    a.shaderSource(d, c);
    a.compileShader(d);
    !1 === a.getShaderParameter(d, a.COMPILE_STATUS) && console.error("THREE.WebGLShader: Shader couldn't compile.");
    "" !== a.getShaderInfoLog(d) && console.warn("THREE.WebGLShader: gl.getShaderInfoLog()", b === a.VERTEX_SHADER ? "vertex" : "fragment", a.getShaderInfoLog(d), lg(c));
    return d;
  }

  function Qe(a) {
    switch (a) {
      case 3E3:
        return ["Linear", "( value )"];

      case 3001:
        return ["sRGB", "( value )"];

      case 3002:
        return ["RGBE", "( value )"];

      case 3004:
        return ["RGBM", "( value, 7.0 )"];

      case 3005:
        return ["RGBM", "( value, 16.0 )"];

      case 3006:
        return ["RGBD", "( value, 256.0 )"];

      case 3007:
        return ["Gamma", "( value, float( GAMMA_FACTOR ) )"];

      default:
        throw Error("unsupported encoding: " + a);
    }
  }

  function Vd(a, b) {
    b = Qe(b);
    return "vec4 " + a + "( vec4 value ) { return " + b[0] + "ToLinear" + b[1] + "; }";
  }

  function mg(a, b) {
    b = Qe(b);
    return "vec4 " + a + "( vec4 value ) { return LinearTo" + b[0] + b[1] + "; }";
  }

  function ng(a, b) {
    switch (b) {
      case 1:
        b = "Linear";
        break;

      case 2:
        b = "Reinhard";
        break;

      case 3:
        b = "Uncharted2";
        break;

      case 4:
        b = "OptimizedCineon";
        break;

      default:
        throw Error("unsupported toneMapping: " + b);
    }

    return "vec3 " + a + "( vec3 color ) { return " + b + "ToneMapping( color ); }";
  }

  function og(a, b, c) {
    a = a || {};
    return [a.derivatives || b.envMapCubeUV || b.bumpMap || b.normalMap || b.flatShading ? "#extension GL_OES_standard_derivatives : enable" : "", (a.fragDepth || b.logarithmicDepthBuffer) && c.get("EXT_frag_depth") ? "#extension GL_EXT_frag_depth : enable" : "", a.drawBuffers && c.get("WEBGL_draw_buffers") ? "#extension GL_EXT_draw_buffers : require" : "", (a.shaderTextureLOD || b.envMap) && c.get("EXT_shader_texture_lod") ? "#extension GL_EXT_shader_texture_lod : enable" : ""].filter(yc).join("\n");
  }

  function pg(a) {
    var b = [],
        c;

    for (c in a) {
      var d = a[c];
      !1 !== d && b.push("#define " + c + " " + d);
    }

    return b.join("\n");
  }

  function yc(a) {
    return "" !== a;
  }

  function Re(a, b) {
    return a.replace(/NUM_DIR_LIGHTS/g, b.numDirLights).replace(/NUM_SPOT_LIGHTS/g, b.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g, b.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, b.numPointLights).replace(/NUM_HEMI_LIGHTS/g, b.numHemiLights);
  }

  function Se(a, b) {
    return a.replace(/NUM_CLIPPING_PLANES/g, b.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, b.numClippingPlanes - b.numClipIntersection);
  }

  function Wd(a) {
    return a.replace(/^[ \t]*#include +<([\w\d.]+)>/gm, function (a, c) {
      a = V[c];
      if (void 0 === a) throw Error("Can not resolve #include <" + c + ">");
      return Wd(a);
    });
  }

  function Te(a) {
    return a.replace(/#pragma unroll_loop[\s]+?for \( int i = (\d+); i < (\d+); i \+\+ \) \{([\s\S]+?)(?=\})\}/g, function (a, c, d, e) {
      a = "";

      for (c = (0, _parseInt2.default)(c); c < (0, _parseInt2.default)(d); c++) {
        a += e.replace(/\[ i \]/g, "[ " + c + " ]");
      }

      return a;
    });
  }

  function qg(a, b, c, d, e, f) {
    var g = a.context,
        h = d.defines,
        l = e.vertexShader,
        m = e.fragmentShader,
        u = "SHADOWMAP_TYPE_BASIC";
    1 === f.shadowMapType ? u = "SHADOWMAP_TYPE_PCF" : 2 === f.shadowMapType && (u = "SHADOWMAP_TYPE_PCF_SOFT");
    var n = "ENVMAP_TYPE_CUBE",
        t = "ENVMAP_MODE_REFLECTION",
        r = "ENVMAP_BLENDING_MULTIPLY";

    if (f.envMap) {
      switch (d.envMap.mapping) {
        case 301:
        case 302:
          n = "ENVMAP_TYPE_CUBE";
          break;

        case 306:
        case 307:
          n = "ENVMAP_TYPE_CUBE_UV";
          break;

        case 303:
        case 304:
          n = "ENVMAP_TYPE_EQUIREC";
          break;

        case 305:
          n = "ENVMAP_TYPE_SPHERE";
      }

      switch (d.envMap.mapping) {
        case 302:
        case 304:
          t = "ENVMAP_MODE_REFRACTION";
      }

      switch (d.combine) {
        case 0:
          r = "ENVMAP_BLENDING_MULTIPLY";
          break;

        case 1:
          r = "ENVMAP_BLENDING_MIX";
          break;

        case 2:
          r = "ENVMAP_BLENDING_ADD";
      }
    }

    var k = 0 < a.gammaFactor ? a.gammaFactor : 1,
        v = og(d.extensions, f, b),
        x = pg(h),
        p = g.createProgram();
    d.isRawShaderMaterial ? (h = [x].filter(yc).join("\n"), 0 < h.length && (h += "\n"), b = [v, x].filter(yc).join("\n"), 0 < b.length && (b += "\n")) : (h = ["precision " + f.precision + " float;", "precision " + f.precision + " int;", "#define SHADER_NAME " + e.name, x, f.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "", "#define GAMMA_FACTOR " + k, "#define MAX_BONES " + f.maxBones, f.useFog && f.fog ? "#define USE_FOG" : "", f.useFog && f.fogExp ? "#define FOG_EXP2" : "", f.map ? "#define USE_MAP" : "", f.envMap ? "#define USE_ENVMAP" : "", f.envMap ? "#define " + t : "", f.lightMap ? "#define USE_LIGHTMAP" : "", f.aoMap ? "#define USE_AOMAP" : "", f.emissiveMap ? "#define USE_EMISSIVEMAP" : "", f.bumpMap ? "#define USE_BUMPMAP" : "", f.normalMap ? "#define USE_NORMALMAP" : "", f.displacementMap && f.supportsVertexTextures ? "#define USE_DISPLACEMENTMAP" : "", f.specularMap ? "#define USE_SPECULARMAP" : "", f.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", f.metalnessMap ? "#define USE_METALNESSMAP" : "", f.alphaMap ? "#define USE_ALPHAMAP" : "", f.vertexColors ? "#define USE_COLOR" : "", f.flatShading ? "#define FLAT_SHADED" : "", f.skinning ? "#define USE_SKINNING" : "", f.useVertexTexture ? "#define BONE_TEXTURE" : "", f.morphTargets ? "#define USE_MORPHTARGETS" : "", f.morphNormals && !1 === f.flatShading ? "#define USE_MORPHNORMALS" : "", f.doubleSided ? "#define DOUBLE_SIDED" : "", f.flipSided ? "#define FLIP_SIDED" : "", f.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", f.shadowMapEnabled ? "#define " + u : "", f.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", f.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", f.logarithmicDepthBuffer && b.get("EXT_frag_depth") ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_COLOR", "\tattribute vec3 color;", "#endif", "#ifdef USE_MORPHTARGETS", "\tattribute vec3 morphTarget0;", "\tattribute vec3 morphTarget1;", "\tattribute vec3 morphTarget2;", "\tattribute vec3 morphTarget3;", "\t#ifdef USE_MORPHNORMALS", "\t\tattribute vec3 morphNormal0;", "\t\tattribute vec3 morphNormal1;", "\t\tattribute vec3 morphNormal2;", "\t\tattribute vec3 morphNormal3;", "\t#else", "\t\tattribute vec3 morphTarget4;", "\t\tattribute vec3 morphTarget5;", "\t\tattribute vec3 morphTarget6;", "\t\tattribute vec3 morphTarget7;", "\t#endif", "#endif", "#ifdef USE_SKINNING", "\tattribute vec4 skinIndex;", "\tattribute vec4 skinWeight;", "#endif", "\n"].filter(yc).join("\n"), b = [v, "precision " + f.precision + " float;", "precision " + f.precision + " int;", "#define SHADER_NAME " + e.name, x, f.alphaTest ? "#define ALPHATEST " + f.alphaTest : "", "#define GAMMA_FACTOR " + k, f.useFog && f.fog ? "#define USE_FOG" : "", f.useFog && f.fogExp ? "#define FOG_EXP2" : "", f.map ? "#define USE_MAP" : "", f.envMap ? "#define USE_ENVMAP" : "", f.envMap ? "#define " + n : "", f.envMap ? "#define " + t : "", f.envMap ? "#define " + r : "", f.lightMap ? "#define USE_LIGHTMAP" : "", f.aoMap ? "#define USE_AOMAP" : "", f.emissiveMap ? "#define USE_EMISSIVEMAP" : "", f.bumpMap ? "#define USE_BUMPMAP" : "", f.normalMap ? "#define USE_NORMALMAP" : "", f.specularMap ? "#define USE_SPECULARMAP" : "", f.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", f.metalnessMap ? "#define USE_METALNESSMAP" : "", f.alphaMap ? "#define USE_ALPHAMAP" : "", f.vertexColors ? "#define USE_COLOR" : "", f.gradientMap ? "#define USE_GRADIENTMAP" : "", f.flatShading ? "#define FLAT_SHADED" : "", f.doubleSided ? "#define DOUBLE_SIDED" : "", f.flipSided ? "#define FLIP_SIDED" : "", f.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", f.shadowMapEnabled ? "#define " + u : "", f.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", f.physicallyCorrectLights ? "#define PHYSICALLY_CORRECT_LIGHTS" : "", f.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", f.logarithmicDepthBuffer && b.get("EXT_frag_depth") ? "#define USE_LOGDEPTHBUF_EXT" : "", f.envMap && b.get("EXT_shader_texture_lod") ? "#define TEXTURE_LOD_EXT" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", 0 !== f.toneMapping ? "#define TONE_MAPPING" : "", 0 !== f.toneMapping ? V.tonemapping_pars_fragment : "", 0 !== f.toneMapping ? ng("toneMapping", f.toneMapping) : "", f.dithering ? "#define DITHERING" : "", f.outputEncoding || f.mapEncoding || f.envMapEncoding || f.emissiveMapEncoding ? V.encodings_pars_fragment : "", f.mapEncoding ? Vd("mapTexelToLinear", f.mapEncoding) : "", f.envMapEncoding ? Vd("envMapTexelToLinear", f.envMapEncoding) : "", f.emissiveMapEncoding ? Vd("emissiveMapTexelToLinear", f.emissiveMapEncoding) : "", f.outputEncoding ? mg("linearToOutputTexel", f.outputEncoding) : "", f.depthPacking ? "#define DEPTH_PACKING " + d.depthPacking : "", "\n"].filter(yc).join("\n"));
    l = Wd(l);
    l = Re(l, f);
    l = Se(l, f);
    m = Wd(m);
    m = Re(m, f);
    m = Se(m, f);
    l = Te(l);
    m = Te(m);
    m = b + m;
    l = Pe(g, g.VERTEX_SHADER, h + l);
    m = Pe(g, g.FRAGMENT_SHADER, m);
    g.attachShader(p, l);
    g.attachShader(p, m);
    void 0 !== d.index0AttributeName ? g.bindAttribLocation(p, 0, d.index0AttributeName) : !0 === f.morphTargets && g.bindAttribLocation(p, 0, "position");
    g.linkProgram(p);
    f = g.getProgramInfoLog(p).trim();
    e = g.getShaderInfoLog(l).trim();
    u = g.getShaderInfoLog(m).trim();
    t = n = !0;
    if (!1 === g.getProgramParameter(p, g.LINK_STATUS)) n = !1, console.error("THREE.WebGLProgram: shader error: ", g.getError(), "gl.VALIDATE_STATUS", g.getProgramParameter(p, g.VALIDATE_STATUS), "gl.getProgramInfoLog", f, e, u);else if ("" !== f) console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()", f);else if ("" === e || "" === u) t = !1;
    t && (this.diagnostics = {
      runnable: n,
      material: d,
      programLog: f,
      vertexShader: {
        log: e,
        prefix: h
      },
      fragmentShader: {
        log: u,
        prefix: b
      }
    });
    g.deleteShader(l);
    g.deleteShader(m);
    var w;

    this.getUniforms = function () {
      void 0 === w && (w = new bb(g, p, a));
      return w;
    };

    var B;

    this.getAttributes = function () {
      if (void 0 === B) {
        for (var a = {}, b = g.getProgramParameter(p, g.ACTIVE_ATTRIBUTES), c = 0; c < b; c++) {
          var d = g.getActiveAttrib(p, c).name;
          a[d] = g.getAttribLocation(p, d);
        }

        B = a;
      }

      return B;
    };

    this.destroy = function () {
      g.deleteProgram(p);
      this.program = void 0;
    };

    (0, _defineProperties.default)(this, {
      uniforms: {
        get: function get() {
          console.warn("THREE.WebGLProgram: .uniforms is now .getUniforms().");
          return this.getUniforms();
        }
      },
      attributes: {
        get: function get() {
          console.warn("THREE.WebGLProgram: .attributes is now .getAttributes().");
          return this.getAttributes();
        }
      }
    });
    this.id = rg++;
    this.code = c;
    this.usedTimes = 1;
    this.program = p;
    this.vertexShader = l;
    this.fragmentShader = m;
    return this;
  }

  function sg(a, b, c) {
    function d(a, b) {
      if (a) a.isTexture ? c = a.encoding : a.isWebGLRenderTarget && (console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."), c = a.texture.encoding);else var c = 3E3;
      3E3 === c && b && (c = 3007);
      return c;
    }

    var e = [],
        f = {
      MeshDepthMaterial: "depth",
      MeshDistanceMaterial: "distanceRGBA",
      MeshNormalMaterial: "normal",
      MeshBasicMaterial: "basic",
      MeshLambertMaterial: "lambert",
      MeshPhongMaterial: "phong",
      MeshToonMaterial: "phong",
      MeshStandardMaterial: "physical",
      MeshPhysicalMaterial: "physical",
      LineBasicMaterial: "basic",
      LineDashedMaterial: "dashed",
      PointsMaterial: "points",
      ShadowMaterial: "shadow"
    },
        g = "precision supportsVertexTextures map mapEncoding envMap envMapMode envMapEncoding lightMap aoMap emissiveMap emissiveMapEncoding bumpMap normalMap displacementMap specularMap roughnessMap metalnessMap gradientMap alphaMap combine vertexColors fog useFog fogExp flatShading sizeAttenuation logarithmicDepthBuffer skinning maxBones useVertexTexture morphTargets morphNormals maxMorphTargets maxMorphNormals premultipliedAlpha numDirLights numPointLights numSpotLights numHemiLights numRectAreaLights shadowMapEnabled shadowMapType toneMapping physicallyCorrectLights alphaTest doubleSided flipSided numClippingPlanes numClipIntersection depthPacking dithering".split(" ");

    this.getParameters = function (b, e, g, u, n, t, r) {
      var h = f[b.type];

      if (r.isSkinnedMesh) {
        var l = r.skeleton.bones;
        if (c.floatVertexTextures) l = 1024;else {
          var m = Math.min(Math.floor((c.maxVertexUniforms - 20) / 4), l.length);
          m < l.length ? (console.warn("THREE.WebGLRenderer: Skeleton has " + l.length + " bones. This GPU supports " + m + "."), l = 0) : l = m;
        }
      } else l = 0;

      m = c.precision;
      null !== b.precision && (m = c.getMaxPrecision(b.precision), m !== b.precision && console.warn("THREE.WebGLProgram.getParameters:", b.precision, "not supported, using", m, "instead."));
      var k = a.getRenderTarget();
      return {
        shaderID: h,
        precision: m,
        supportsVertexTextures: c.vertexTextures,
        outputEncoding: d(k ? k.texture : null, a.gammaOutput),
        map: !!b.map,
        mapEncoding: d(b.map, a.gammaInput),
        envMap: !!b.envMap,
        envMapMode: b.envMap && b.envMap.mapping,
        envMapEncoding: d(b.envMap, a.gammaInput),
        envMapCubeUV: !!b.envMap && (306 === b.envMap.mapping || 307 === b.envMap.mapping),
        lightMap: !!b.lightMap,
        aoMap: !!b.aoMap,
        emissiveMap: !!b.emissiveMap,
        emissiveMapEncoding: d(b.emissiveMap, a.gammaInput),
        bumpMap: !!b.bumpMap,
        normalMap: !!b.normalMap,
        displacementMap: !!b.displacementMap,
        roughnessMap: !!b.roughnessMap,
        metalnessMap: !!b.metalnessMap,
        specularMap: !!b.specularMap,
        alphaMap: !!b.alphaMap,
        gradientMap: !!b.gradientMap,
        combine: b.combine,
        vertexColors: b.vertexColors,
        fog: !!u,
        useFog: b.fog,
        fogExp: u && u.isFogExp2,
        flatShading: b.flatShading,
        sizeAttenuation: b.sizeAttenuation,
        logarithmicDepthBuffer: c.logarithmicDepthBuffer,
        skinning: b.skinning && 0 < l,
        maxBones: l,
        useVertexTexture: c.floatVertexTextures,
        morphTargets: b.morphTargets,
        morphNormals: b.morphNormals,
        maxMorphTargets: a.maxMorphTargets,
        maxMorphNormals: a.maxMorphNormals,
        numDirLights: e.directional.length,
        numPointLights: e.point.length,
        numSpotLights: e.spot.length,
        numRectAreaLights: e.rectArea.length,
        numHemiLights: e.hemi.length,
        numClippingPlanes: n,
        numClipIntersection: t,
        dithering: b.dithering,
        shadowMapEnabled: a.shadowMap.enabled && r.receiveShadow && 0 < g.length,
        shadowMapType: a.shadowMap.type,
        toneMapping: a.toneMapping,
        physicallyCorrectLights: a.physicallyCorrectLights,
        premultipliedAlpha: b.premultipliedAlpha,
        alphaTest: b.alphaTest,
        doubleSided: 2 === b.side,
        flipSided: 1 === b.side,
        depthPacking: void 0 !== b.depthPacking ? b.depthPacking : !1
      };
    };

    this.getProgramCode = function (b, c) {
      var d = [];
      c.shaderID ? d.push(c.shaderID) : (d.push(b.fragmentShader), d.push(b.vertexShader));
      if (void 0 !== b.defines) for (var e in b.defines) {
        d.push(e), d.push(b.defines[e]);
      }

      for (e = 0; e < g.length; e++) {
        d.push(c[g[e]]);
      }

      d.push(b.onBeforeCompile.toString());
      d.push(a.gammaOutput);
      return d.join();
    };

    this.acquireProgram = function (c, d, f, g) {
      for (var h, l = 0, m = e.length; l < m; l++) {
        var u = e[l];

        if (u.code === g) {
          h = u;
          ++h.usedTimes;
          break;
        }
      }

      void 0 === h && (h = new qg(a, b, g, c, d, f), e.push(h));
      return h;
    };

    this.releaseProgram = function (a) {
      if (0 === --a.usedTimes) {
        var b = e.indexOf(a);
        e[b] = e[e.length - 1];
        e.pop();
        a.destroy();
      }
    };

    this.programs = e;
  }

  function tg() {
    var a = new _weakMap.default();
    return {
      get: function get(b) {
        var c = a.get(b);
        void 0 === c && (c = {}, a.set(b, c));
        return c;
      },
      remove: function remove(b) {
        a.delete(b);
      },
      update: function update(b, c, d) {
        a.get(b)[c] = d;
      },
      dispose: function dispose() {
        a = new _weakMap.default();
      }
    };
  }

  function ug(a, b) {
    return a.renderOrder !== b.renderOrder ? a.renderOrder - b.renderOrder : a.program && b.program && a.program !== b.program ? a.program.id - b.program.id : a.material.id !== b.material.id ? a.material.id - b.material.id : a.z !== b.z ? a.z - b.z : a.id - b.id;
  }

  function vg(a, b) {
    return a.renderOrder !== b.renderOrder ? a.renderOrder - b.renderOrder : a.z !== b.z ? b.z - a.z : a.id - b.id;
  }

  function wg() {
    var a = [],
        b = 0,
        c = [],
        d = [];
    return {
      opaque: c,
      transparent: d,
      init: function init() {
        b = 0;
        c.length = 0;
        d.length = 0;
      },
      push: function push(e, f, g, h, l) {
        var m = a[b];
        void 0 === m ? (m = {
          id: e.id,
          object: e,
          geometry: f,
          material: g,
          program: g.program,
          renderOrder: e.renderOrder,
          z: h,
          group: l
        }, a[b] = m) : (m.id = e.id, m.object = e, m.geometry = f, m.material = g, m.program = g.program, m.renderOrder = e.renderOrder, m.z = h, m.group = l);
        (!0 === g.transparent ? d : c).push(m);
        b++;
      },
      sort: function sort() {
        1 < c.length && c.sort(ug);
        1 < d.length && d.sort(vg);
      }
    };
  }

  function xg() {
    var a = {};
    return {
      get: function get(b, c) {
        b = b.id + "," + c.id;
        c = a[b];
        void 0 === c && (c = new wg(), a[b] = c);
        return c;
      },
      dispose: function dispose() {
        a = {};
      }
    };
  }

  function yg() {
    var a = {};
    return {
      get: function get(b) {
        if (void 0 !== a[b.id]) return a[b.id];

        switch (b.type) {
          case "DirectionalLight":
            var c = {
              direction: new p(),
              color: new I(),
              shadow: !1,
              shadowBias: 0,
              shadowRadius: 1,
              shadowMapSize: new C()
            };
            break;

          case "SpotLight":
            c = {
              position: new p(),
              direction: new p(),
              color: new I(),
              distance: 0,
              coneCos: 0,
              penumbraCos: 0,
              decay: 0,
              shadow: !1,
              shadowBias: 0,
              shadowRadius: 1,
              shadowMapSize: new C()
            };
            break;

          case "PointLight":
            c = {
              position: new p(),
              color: new I(),
              distance: 0,
              decay: 0,
              shadow: !1,
              shadowBias: 0,
              shadowRadius: 1,
              shadowMapSize: new C(),
              shadowCameraNear: 1,
              shadowCameraFar: 1E3
            };
            break;

          case "HemisphereLight":
            c = {
              direction: new p(),
              skyColor: new I(),
              groundColor: new I()
            };
            break;

          case "RectAreaLight":
            c = {
              color: new I(),
              position: new p(),
              halfWidth: new p(),
              halfHeight: new p()
            };
        }

        return a[b.id] = c;
      }
    };
  }

  function zg() {
    var a = new yg(),
        b = {
      id: Ag++,
      hash: "",
      ambient: [0, 0, 0],
      directional: [],
      directionalShadowMap: [],
      directionalShadowMatrix: [],
      spot: [],
      spotShadowMap: [],
      spotShadowMatrix: [],
      rectArea: [],
      point: [],
      pointShadowMap: [],
      pointShadowMatrix: [],
      hemi: []
    },
        c = new p(),
        d = new M(),
        e = new M();
    return {
      setup: function setup(f, g, h) {
        var l = 0,
            m = 0,
            u = 0,
            n = 0,
            t = 0,
            r = 0,
            k = 0,
            v = 0;
        h = h.matrixWorldInverse;

        for (var x = 0, p = f.length; x < p; x++) {
          var w = f[x],
              B = w.color,
              G = w.intensity,
              K = w.distance,
              P = w.shadow && w.shadow.map ? w.shadow.map.texture : null;
          if (w.isAmbientLight) l += B.r * G, m += B.g * G, u += B.b * G;else if (w.isDirectionalLight) {
            var H = a.get(w);
            H.color.copy(w.color).multiplyScalar(w.intensity);
            H.direction.setFromMatrixPosition(w.matrixWorld);
            c.setFromMatrixPosition(w.target.matrixWorld);
            H.direction.sub(c);
            H.direction.transformDirection(h);
            if (H.shadow = w.castShadow) B = w.shadow, H.shadowBias = B.bias, H.shadowRadius = B.radius, H.shadowMapSize = B.mapSize;
            b.directionalShadowMap[n] = P;
            b.directionalShadowMatrix[n] = w.shadow.matrix;
            b.directional[n] = H;
            n++;
          } else if (w.isSpotLight) {
            H = a.get(w);
            H.position.setFromMatrixPosition(w.matrixWorld);
            H.position.applyMatrix4(h);
            H.color.copy(B).multiplyScalar(G);
            H.distance = K;
            H.direction.setFromMatrixPosition(w.matrixWorld);
            c.setFromMatrixPosition(w.target.matrixWorld);
            H.direction.sub(c);
            H.direction.transformDirection(h);
            H.coneCos = Math.cos(w.angle);
            H.penumbraCos = Math.cos(w.angle * (1 - w.penumbra));
            H.decay = 0 === w.distance ? 0 : w.decay;
            if (H.shadow = w.castShadow) B = w.shadow, H.shadowBias = B.bias, H.shadowRadius = B.radius, H.shadowMapSize = B.mapSize;
            b.spotShadowMap[r] = P;
            b.spotShadowMatrix[r] = w.shadow.matrix;
            b.spot[r] = H;
            r++;
          } else if (w.isRectAreaLight) H = a.get(w), H.color.copy(B).multiplyScalar(G), H.position.setFromMatrixPosition(w.matrixWorld), H.position.applyMatrix4(h), e.identity(), d.copy(w.matrixWorld), d.premultiply(h), e.extractRotation(d), H.halfWidth.set(.5 * w.width, 0, 0), H.halfHeight.set(0, .5 * w.height, 0), H.halfWidth.applyMatrix4(e), H.halfHeight.applyMatrix4(e), b.rectArea[k] = H, k++;else if (w.isPointLight) {
            H = a.get(w);
            H.position.setFromMatrixPosition(w.matrixWorld);
            H.position.applyMatrix4(h);
            H.color.copy(w.color).multiplyScalar(w.intensity);
            H.distance = w.distance;
            H.decay = 0 === w.distance ? 0 : w.decay;
            if (H.shadow = w.castShadow) B = w.shadow, H.shadowBias = B.bias, H.shadowRadius = B.radius, H.shadowMapSize = B.mapSize, H.shadowCameraNear = B.camera.near, H.shadowCameraFar = B.camera.far;
            b.pointShadowMap[t] = P;
            b.pointShadowMatrix[t] = w.shadow.matrix;
            b.point[t] = H;
            t++;
          } else w.isHemisphereLight && (H = a.get(w), H.direction.setFromMatrixPosition(w.matrixWorld), H.direction.transformDirection(h), H.direction.normalize(), H.skyColor.copy(w.color).multiplyScalar(G), H.groundColor.copy(w.groundColor).multiplyScalar(G), b.hemi[v] = H, v++);
        }

        b.ambient[0] = l;
        b.ambient[1] = m;
        b.ambient[2] = u;
        b.directional.length = n;
        b.spot.length = r;
        b.rectArea.length = k;
        b.point.length = t;
        b.hemi.length = v;
        b.hash = b.id + "," + n + "," + t + "," + r + "," + k + "," + v + "," + g.length;
      },
      state: b
    };
  }

  function Bg() {
    var a = new zg(),
        b = [],
        c = [],
        d = [];
    return {
      init: function init() {
        b.length = 0;
        c.length = 0;
        d.length = 0;
      },
      state: {
        lightsArray: b,
        shadowsArray: c,
        spritesArray: d,
        lights: a
      },
      setupLights: function setupLights(d) {
        a.setup(b, c, d);
      },
      pushLight: function pushLight(a) {
        b.push(a);
      },
      pushShadow: function pushShadow(a) {
        c.push(a);
      },
      pushSprite: function pushSprite(a) {
        d.push(a);
      }
    };
  }

  function Cg() {
    var a = {};
    return {
      get: function get(b, c) {
        b = b.id + "," + c.id;
        c = a[b];
        void 0 === c && (c = new Bg(), a[b] = c);
        return c;
      },
      dispose: function dispose() {
        a = {};
      }
    };
  }

  function cb(a) {
    O.call(this);
    this.type = "MeshDepthMaterial";
    this.depthPacking = 3200;
    this.morphTargets = this.skinning = !1;
    this.displacementMap = this.alphaMap = this.map = null;
    this.displacementScale = 1;
    this.displacementBias = 0;
    this.wireframe = !1;
    this.wireframeLinewidth = 1;
    this.lights = this.fog = !1;
    this.setValues(a);
  }

  function db(a) {
    O.call(this);
    this.type = "MeshDistanceMaterial";
    this.referencePosition = new p();
    this.nearDistance = 1;
    this.farDistance = 1E3;
    this.morphTargets = this.skinning = !1;
    this.displacementMap = this.alphaMap = this.map = null;
    this.displacementScale = 1;
    this.displacementBias = 0;
    this.lights = this.fog = !1;
    this.setValues(a);
  }

  function Ue(a, b, c) {
    function d(b, c, d, e, f, g) {
      var h = b.geometry;
      var l = n;
      var m = b.customDepthMaterial;
      d && (l = t, m = b.customDistanceMaterial);
      m ? l = m : (m = !1, c.morphTargets && (h && h.isBufferGeometry ? m = h.morphAttributes && h.morphAttributes.position && 0 < h.morphAttributes.position.length : h && h.isGeometry && (m = h.morphTargets && 0 < h.morphTargets.length)), b.isSkinnedMesh && !1 === c.skinning && console.warn("THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:", b), b = b.isSkinnedMesh && c.skinning, h = 0, m && (h |= 1), b && (h |= 2), l = l[h]);
      a.localClippingEnabled && !0 === c.clipShadows && 0 !== c.clippingPlanes.length && (h = l.uuid, m = c.uuid, b = r[h], void 0 === b && (b = {}, r[h] = b), h = b[m], void 0 === h && (h = l.clone(), b[m] = h), l = h);
      l.visible = c.visible;
      l.wireframe = c.wireframe;
      l.side = null != c.shadowSide ? c.shadowSide : k[c.side];
      l.clipShadows = c.clipShadows;
      l.clippingPlanes = c.clippingPlanes;
      l.clipIntersection = c.clipIntersection;
      l.wireframeLinewidth = c.wireframeLinewidth;
      l.linewidth = c.linewidth;
      d && l.isMeshDistanceMaterial && (l.referencePosition.copy(e), l.nearDistance = f, l.farDistance = g);
      return l;
    }

    function e(c, g, h, l) {
      if (!1 !== c.visible) {
        if (c.layers.test(g.layers) && (c.isMesh || c.isLine || c.isPoints) && c.castShadow && (!c.frustumCulled || f.intersectsObject(c))) {
          c.modelViewMatrix.multiplyMatrices(h.matrixWorldInverse, c.matrixWorld);
          var m = b.update(c),
              n = c.material;
          if ((0, _isArray.default)(n)) for (var t = m.groups, r = 0, k = t.length; r < k; r++) {
            var q = t[r],
                v = n[q.materialIndex];
            v && v.visible && (v = d(c, v, l, u, h.near, h.far), a.renderBufferDirect(h, null, m, v, c, q));
          } else n.visible && (v = d(c, n, l, u, h.near, h.far), a.renderBufferDirect(h, null, m, v, c, null));
        }

        c = c.children;
        m = 0;

        for (n = c.length; m < n; m++) {
          e(c[m], g, h, l);
        }
      }
    }

    var f = new ld(),
        g = new M(),
        h = new C(),
        l = new C(c, c),
        m = new p(),
        u = new p(),
        n = Array(4),
        t = Array(4),
        r = {},
        k = {
      0: 1,
      1: 0,
      2: 2
    },
        v = [new p(1, 0, 0), new p(-1, 0, 0), new p(0, 0, 1), new p(0, 0, -1), new p(0, 1, 0), new p(0, -1, 0)],
        x = [new p(0, 1, 0), new p(0, 1, 0), new p(0, 1, 0), new p(0, 1, 0), new p(0, 0, 1), new p(0, 0, -1)],
        y = [new ea(), new ea(), new ea(), new ea(), new ea(), new ea()];

    for (c = 0; 4 !== c; ++c) {
      var w = 0 !== (c & 1),
          B = 0 !== (c & 2),
          G = new cb({
        depthPacking: 3201,
        morphTargets: w,
        skinning: B
      });
      n[c] = G;
      w = new db({
        morphTargets: w,
        skinning: B
      });
      t[c] = w;
    }

    var K = this;
    this.enabled = !1;
    this.autoUpdate = !0;
    this.needsUpdate = !1;
    this.type = 1;

    this.render = function (b, c, d) {
      if (!1 !== K.enabled && (!1 !== K.autoUpdate || !1 !== K.needsUpdate) && 0 !== b.length) {
        var n = a.state;
        n.disable(a.context.BLEND);
        n.buffers.color.setClear(1, 1, 1, 1);
        n.buffers.depth.setTest(!0);
        n.setScissorTest(!1);

        for (var t, r = 0, k = b.length; r < k; r++) {
          var q = b[r];
          t = q.shadow;
          var p = q && q.isPointLight;
          if (void 0 === t) console.warn("THREE.WebGLShadowMap:", q, "has no shadow.");else {
            var w = t.camera;
            h.copy(t.mapSize);
            h.min(l);

            if (p) {
              var P = h.x,
                  H = h.y;
              y[0].set(2 * P, H, P, H);
              y[1].set(0, H, P, H);
              y[2].set(3 * P, H, P, H);
              y[3].set(P, H, P, H);
              y[4].set(3 * P, 0, P, H);
              y[5].set(P, 0, P, H);
              h.x *= 4;
              h.y *= 2;
            }

            null === t.map && (t.map = new hb(h.x, h.y, {
              minFilter: 1003,
              magFilter: 1003,
              format: 1023
            }), t.map.texture.name = q.name + ".shadowMap", w.updateProjectionMatrix());
            t.isSpotLightShadow && t.update(q);
            P = t.map;
            H = t.matrix;
            u.setFromMatrixPosition(q.matrixWorld);
            w.position.copy(u);
            p ? (t = 6, H.makeTranslation(-u.x, -u.y, -u.z)) : (t = 1, m.setFromMatrixPosition(q.target.matrixWorld), w.lookAt(m), w.updateMatrixWorld(), H.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), H.multiply(w.projectionMatrix), H.multiply(w.matrixWorldInverse));
            a.setRenderTarget(P);
            a.clear();

            for (q = 0; q < t; q++) {
              p && (m.copy(w.position), m.add(v[q]), w.up.copy(x[q]), w.lookAt(m), w.updateMatrixWorld(), n.viewport(y[q])), g.multiplyMatrices(w.projectionMatrix, w.matrixWorldInverse), f.setFromMatrix(g), e(c, d, w, p);
            }
          }
        }

        K.needsUpdate = !1;
      }
    };
  }

  function zc(a, b, c, d, e, f, g, h, l) {
    Y.call(this, a, b, c, d, e, f, g, h, l);
    this.needsUpdate = !0;
  }

  function Dg(a, b, c, d, e) {
    var f, g, h, l, m, u, n, t, r, k, v, x, y, w, B, G, K, P;

    function H(a, b) {
      return a.renderOrder !== b.renderOrder ? a.renderOrder - b.renderOrder : a.z !== b.z ? b.z - a.z : b.id - a.id;
    }

    var C,
        nb,
        Z,
        z,
        A = new p(),
        F = new ja(),
        I = new p();

    this.render = function (q, p, md) {
      if (0 !== q.length) {
        if (void 0 === Z) {
          var ta = new Float32Array([-.5, -.5, 0, 0, .5, -.5, 1, 0, .5, .5, 1, 1, -.5, .5, 0, 1]),
              ya = new Uint16Array([0, 1, 2, 0, 2, 3]);
          C = b.createBuffer();
          nb = b.createBuffer();
          b.bindBuffer(b.ARRAY_BUFFER, C);
          b.bufferData(b.ARRAY_BUFFER, ta, b.STATIC_DRAW);
          b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, nb);
          b.bufferData(b.ELEMENT_ARRAY_BUFFER, ya, b.STATIC_DRAW);
          ta = b.createProgram();
          ya = b.createShader(b.VERTEX_SHADER);
          var Q = b.createShader(b.FRAGMENT_SHADER);
          b.shaderSource(ya, ["precision " + e.precision + " float;", "#define SHADER_NAME SpriteMaterial\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float rotation;\nuniform vec2 center;\nuniform vec2 scale;\nuniform vec2 uvOffset;\nuniform vec2 uvScale;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvarying float fogDepth;\nvoid main() {\n\tvUV = uvOffset + uv * uvScale;\n\tvec2 alignedPosition = ( position - center ) * scale;\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tvec4 mvPosition;\n\tmvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\tmvPosition.xy += rotatedPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n\tfogDepth = - mvPosition.z;\n}"].join("\n"));
          b.shaderSource(Q, ["precision " + e.precision + " float;", "#define SHADER_NAME SpriteMaterial\nuniform vec3 color;\nuniform sampler2D map;\nuniform float opacity;\nuniform int fogType;\nuniform vec3 fogColor;\nuniform float fogDensity;\nuniform float fogNear;\nuniform float fogFar;\nuniform float alphaTest;\nvarying vec2 vUV;\nvarying float fogDepth;\nvoid main() {\n\tvec4 texture = texture2D( map, vUV );\n\tgl_FragColor = vec4( color * texture.xyz, texture.a * opacity );\n\tif ( gl_FragColor.a < alphaTest ) discard;\n\tif ( fogType > 0 ) {\n\t\tfloat fogFactor = 0.0;\n\t\tif ( fogType == 1 ) {\n\t\t\tfogFactor = smoothstep( fogNear, fogFar, fogDepth );\n\t\t} else {\n\t\t\tconst float LOG2 = 1.442695;\n\t\t\tfogFactor = exp2( - fogDensity * fogDensity * fogDepth * fogDepth * LOG2 );\n\t\t\tfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n\t\t}\n\t\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n\t}\n}"].join("\n"));
          b.compileShader(ya);
          b.compileShader(Q);
          b.attachShader(ta, ya);
          b.attachShader(ta, Q);
          b.linkProgram(ta);
          Z = ta;
          K = b.getAttribLocation(Z, "position");
          P = b.getAttribLocation(Z, "uv");
          f = b.getUniformLocation(Z, "uvOffset");
          g = b.getUniformLocation(Z, "uvScale");
          h = b.getUniformLocation(Z, "rotation");
          l = b.getUniformLocation(Z, "center");
          m = b.getUniformLocation(Z, "scale");
          u = b.getUniformLocation(Z, "color");
          n = b.getUniformLocation(Z, "map");
          t = b.getUniformLocation(Z, "opacity");
          r = b.getUniformLocation(Z, "modelViewMatrix");
          k = b.getUniformLocation(Z, "projectionMatrix");
          v = b.getUniformLocation(Z, "fogType");
          x = b.getUniformLocation(Z, "fogDensity");
          y = b.getUniformLocation(Z, "fogNear");
          w = b.getUniformLocation(Z, "fogFar");
          B = b.getUniformLocation(Z, "fogColor");
          b.getUniformLocation(Z, "fogDepth");
          G = b.getUniformLocation(Z, "alphaTest");
          ta = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
          ta.width = 8;
          ta.height = 8;
          ya = ta.getContext("2d");
          ya.fillStyle = "white";
          ya.fillRect(0, 0, 8, 8);
          z = new zc(ta);
        }

        c.useProgram(Z);
        c.initAttributes();
        c.enableAttribute(K);
        c.enableAttribute(P);
        c.disableUnusedAttributes();
        c.disable(b.CULL_FACE);
        c.enable(b.BLEND);
        b.bindBuffer(b.ARRAY_BUFFER, C);
        b.vertexAttribPointer(K, 2, b.FLOAT, !1, 16, 0);
        b.vertexAttribPointer(P, 2, b.FLOAT, !1, 16, 8);
        b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, nb);
        b.uniformMatrix4fv(k, !1, md.projectionMatrix.elements);
        c.activeTexture(b.TEXTURE0);
        b.uniform1i(n, 0);
        ya = ta = 0;
        (Q = p.fog) ? (b.uniform3f(B, Q.color.r, Q.color.g, Q.color.b), Q.isFog ? (b.uniform1f(y, Q.near), b.uniform1f(w, Q.far), b.uniform1i(v, 1), ya = ta = 1) : Q.isFogExp2 && (b.uniform1f(x, Q.density), b.uniform1i(v, 2), ya = ta = 2)) : (b.uniform1i(v, 0), ya = ta = 0);
        Q = 0;

        for (var L = q.length; Q < L; Q++) {
          var E = q[Q];
          E.modelViewMatrix.multiplyMatrices(md.matrixWorldInverse, E.matrixWorld);
          E.z = -E.modelViewMatrix.elements[14];
        }

        q.sort(H);
        var J = [],
            Td = [];
        Q = 0;

        for (L = q.length; Q < L; Q++) {
          E = q[Q];
          var R = E.material;

          if (!1 !== R.visible) {
            E.onBeforeRender(a, p, md, void 0, R, void 0);
            b.uniform1f(G, R.alphaTest);
            b.uniformMatrix4fv(r, !1, E.modelViewMatrix.elements);
            E.matrixWorld.decompose(A, F, I);
            J[0] = I.x;
            J[1] = I.y;
            Td[0] = E.center.x - .5;
            Td[1] = E.center.y - .5;
            var nd = 0;
            p.fog && R.fog && (nd = ya);
            ta !== nd && (b.uniform1i(v, nd), ta = nd);
            null !== R.map ? (b.uniform2f(f, R.map.offset.x, R.map.offset.y), b.uniform2f(g, R.map.repeat.x, R.map.repeat.y)) : (b.uniform2f(f, 0, 0), b.uniform2f(g, 1, 1));
            b.uniform1f(t, R.opacity);
            b.uniform3f(u, R.color.r, R.color.g, R.color.b);
            b.uniform1f(h, R.rotation);
            b.uniform2fv(l, Td);
            b.uniform2fv(m, J);
            c.setBlending(R.blending, R.blendEquation, R.blendSrc, R.blendDst, R.blendEquationAlpha, R.blendSrcAlpha, R.blendDstAlpha, R.premultipliedAlpha);
            c.buffers.depth.setTest(R.depthTest);
            c.buffers.depth.setMask(R.depthWrite);
            c.buffers.color.setMask(R.colorWrite);
            d.setTexture2D(R.map || z, 0);
            b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0);
            E.onAfterRender(a, p, md, void 0, R, void 0);
          }
        }

        c.enable(b.CULL_FACE);
        c.reset();
      }
    };
  }

  function Eg(a, b, c) {
    function d(b, c, d) {
      var e = new Uint8Array(4),
          f = a.createTexture();
      a.bindTexture(b, f);
      a.texParameteri(b, a.TEXTURE_MIN_FILTER, a.NEAREST);
      a.texParameteri(b, a.TEXTURE_MAG_FILTER, a.NEAREST);

      for (b = 0; b < d; b++) {
        a.texImage2D(c + b, 0, a.RGBA, 1, 1, 0, a.RGBA, a.UNSIGNED_BYTE, e);
      }

      return f;
    }

    function e(b) {
      !0 !== w[b] && (a.enable(b), w[b] = !0);
    }

    function f(b) {
      !1 !== w[b] && (a.disable(b), w[b] = !1);
    }

    function g(b, d, g, h, l, m, n, u) {
      0 !== b ? e(a.BLEND) : f(a.BLEND);

      if (5 !== b) {
        if (b !== K || u !== ya) switch (b) {
          case 2:
            u ? (a.blendEquationSeparate(a.FUNC_ADD, a.FUNC_ADD), a.blendFuncSeparate(a.ONE, a.ONE, a.ONE, a.ONE)) : (a.blendEquation(a.FUNC_ADD), a.blendFunc(a.SRC_ALPHA, a.ONE));
            break;

          case 3:
            u ? (a.blendEquationSeparate(a.FUNC_ADD, a.FUNC_ADD), a.blendFuncSeparate(a.ZERO, a.ZERO, a.ONE_MINUS_SRC_COLOR, a.ONE_MINUS_SRC_ALPHA)) : (a.blendEquation(a.FUNC_ADD), a.blendFunc(a.ZERO, a.ONE_MINUS_SRC_COLOR));
            break;

          case 4:
            u ? (a.blendEquationSeparate(a.FUNC_ADD, a.FUNC_ADD), a.blendFuncSeparate(a.ZERO, a.SRC_COLOR, a.ZERO, a.SRC_ALPHA)) : (a.blendEquation(a.FUNC_ADD), a.blendFunc(a.ZERO, a.SRC_COLOR));
            break;

          default:
            u ? (a.blendEquationSeparate(a.FUNC_ADD, a.FUNC_ADD), a.blendFuncSeparate(a.ONE, a.ONE_MINUS_SRC_ALPHA, a.ONE, a.ONE_MINUS_SRC_ALPHA)) : (a.blendEquationSeparate(a.FUNC_ADD, a.FUNC_ADD), a.blendFuncSeparate(a.SRC_ALPHA, a.ONE_MINUS_SRC_ALPHA, a.ONE, a.ONE_MINUS_SRC_ALPHA));
        }
        z = Z = nb = C = H = P = null;
      } else {
        l = l || d;
        m = m || g;
        n = n || h;
        if (d !== P || l !== nb) a.blendEquationSeparate(c.convert(d), c.convert(l)), P = d, nb = l;
        if (g !== H || h !== C || m !== Z || n !== z) a.blendFuncSeparate(c.convert(g), c.convert(h), c.convert(m), c.convert(n)), H = g, C = h, Z = m, z = n;
      }

      K = b;
      ya = u;
    }

    function h(b) {
      A !== b && (b ? a.frontFace(a.CW) : a.frontFace(a.CCW), A = b);
    }

    function l(b) {
      0 !== b ? (e(a.CULL_FACE), b !== E && (1 === b ? a.cullFace(a.BACK) : 2 === b ? a.cullFace(a.FRONT) : a.cullFace(a.FRONT_AND_BACK))) : f(a.CULL_FACE);
      E = b;
    }

    function m(b, c, d) {
      if (b) {
        if (e(a.POLYGON_OFFSET_FILL), F !== c || I !== d) a.polygonOffset(c, d), F = c, I = d;
      } else f(a.POLYGON_OFFSET_FILL);
    }

    function u(b) {
      void 0 === b && (b = a.TEXTURE0 + L - 1);
      M !== b && (a.activeTexture(b), M = b);
    }

    var n = new function () {
      var b = !1,
          c = new ea(),
          d = null,
          e = new ea(0, 0, 0, 0);
      return {
        setMask: function setMask(c) {
          d === c || b || (a.colorMask(c, c, c, c), d = c);
        },
        setLocked: function setLocked(a) {
          b = a;
        },
        setClear: function setClear(b, d, f, g, h) {
          !0 === h && (b *= g, d *= g, f *= g);
          c.set(b, d, f, g);
          !1 === e.equals(c) && (a.clearColor(b, d, f, g), e.copy(c));
        },
        reset: function reset() {
          b = !1;
          d = null;
          e.set(-1, 0, 0, 0);
        }
      };
    }(),
        t = new function () {
      var b = !1,
          c = null,
          d = null,
          g = null;
      return {
        setTest: function setTest(b) {
          b ? e(a.DEPTH_TEST) : f(a.DEPTH_TEST);
        },
        setMask: function setMask(d) {
          c === d || b || (a.depthMask(d), c = d);
        },
        setFunc: function setFunc(b) {
          if (d !== b) {
            if (b) switch (b) {
              case 0:
                a.depthFunc(a.NEVER);
                break;

              case 1:
                a.depthFunc(a.ALWAYS);
                break;

              case 2:
                a.depthFunc(a.LESS);
                break;

              case 3:
                a.depthFunc(a.LEQUAL);
                break;

              case 4:
                a.depthFunc(a.EQUAL);
                break;

              case 5:
                a.depthFunc(a.GEQUAL);
                break;

              case 6:
                a.depthFunc(a.GREATER);
                break;

              case 7:
                a.depthFunc(a.NOTEQUAL);
                break;

              default:
                a.depthFunc(a.LEQUAL);
            } else a.depthFunc(a.LEQUAL);
            d = b;
          }
        },
        setLocked: function setLocked(a) {
          b = a;
        },
        setClear: function setClear(b) {
          g !== b && (a.clearDepth(b), g = b);
        },
        reset: function reset() {
          b = !1;
          g = d = c = null;
        }
      };
    }(),
        r = new function () {
      var b = !1,
          c = null,
          d = null,
          g = null,
          h = null,
          l = null,
          m = null,
          n = null,
          u = null;
      return {
        setTest: function setTest(b) {
          b ? e(a.STENCIL_TEST) : f(a.STENCIL_TEST);
        },
        setMask: function setMask(d) {
          c === d || b || (a.stencilMask(d), c = d);
        },
        setFunc: function setFunc(b, c, e) {
          if (d !== b || g !== c || h !== e) a.stencilFunc(b, c, e), d = b, g = c, h = e;
        },
        setOp: function setOp(b, c, d) {
          if (l !== b || m !== c || n !== d) a.stencilOp(b, c, d), l = b, m = c, n = d;
        },
        setLocked: function setLocked(a) {
          b = a;
        },
        setClear: function setClear(b) {
          u !== b && (a.clearStencil(b), u = b);
        },
        reset: function reset() {
          b = !1;
          u = n = m = l = h = g = d = c = null;
        }
      };
    }(),
        k = a.getParameter(a.MAX_VERTEX_ATTRIBS),
        v = new Uint8Array(k),
        p = new Uint8Array(k),
        y = new Uint8Array(k),
        w = {},
        B = null,
        G = null,
        K = null,
        P = null,
        H = null,
        C = null,
        nb = null,
        Z = null,
        z = null,
        ya = !1,
        A = null,
        E = null,
        Q = null,
        F = null,
        I = null,
        L = a.getParameter(a.MAX_COMBINED_TEXTURE_IMAGE_UNITS),
        N = !1;
    k = 0;
    k = a.getParameter(a.VERSION);
    -1 !== k.indexOf("WebGL") ? (k = (0, _parseFloat2.default)(/^WebGL ([0-9])/.exec(k)[1]), N = 1 <= k) : -1 !== k.indexOf("OpenGL ES") && (k = (0, _parseFloat2.default)(/^OpenGL ES ([0-9])/.exec(k)[1]), N = 2 <= k);
    var M = null,
        O = {},
        T = new ea(),
        J = new ea(),
        W = {};
    W[a.TEXTURE_2D] = d(a.TEXTURE_2D, a.TEXTURE_2D, 1);
    W[a.TEXTURE_CUBE_MAP] = d(a.TEXTURE_CUBE_MAP, a.TEXTURE_CUBE_MAP_POSITIVE_X, 6);
    n.setClear(0, 0, 0, 1);
    t.setClear(1);
    r.setClear(0);
    e(a.DEPTH_TEST);
    t.setFunc(3);
    h(!1);
    l(1);
    e(a.CULL_FACE);
    e(a.BLEND);
    g(1);
    return {
      buffers: {
        color: n,
        depth: t,
        stencil: r
      },
      initAttributes: function initAttributes() {
        for (var a = 0, b = v.length; a < b; a++) {
          v[a] = 0;
        }
      },
      enableAttribute: function enableAttribute(c) {
        v[c] = 1;
        0 === p[c] && (a.enableVertexAttribArray(c), p[c] = 1);
        0 !== y[c] && (b.get("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(c, 0), y[c] = 0);
      },
      enableAttributeAndDivisor: function enableAttributeAndDivisor(c, d) {
        v[c] = 1;
        0 === p[c] && (a.enableVertexAttribArray(c), p[c] = 1);
        y[c] !== d && (b.get("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(c, d), y[c] = d);
      },
      disableUnusedAttributes: function disableUnusedAttributes() {
        for (var b = 0, c = p.length; b !== c; ++b) {
          p[b] !== v[b] && (a.disableVertexAttribArray(b), p[b] = 0);
        }
      },
      enable: e,
      disable: f,
      getCompressedTextureFormats: function getCompressedTextureFormats() {
        if (null === B && (B = [], b.get("WEBGL_compressed_texture_pvrtc") || b.get("WEBGL_compressed_texture_s3tc") || b.get("WEBGL_compressed_texture_etc1") || b.get("WEBGL_compressed_texture_astc"))) for (var c = a.getParameter(a.COMPRESSED_TEXTURE_FORMATS), d = 0; d < c.length; d++) {
          B.push(c[d]);
        }
        return B;
      },
      useProgram: function useProgram(b) {
        return G !== b ? (a.useProgram(b), G = b, !0) : !1;
      },
      setBlending: g,
      setMaterial: function setMaterial(b, c) {
        2 === b.side ? f(a.CULL_FACE) : e(a.CULL_FACE);
        var d = 1 === b.side;
        c && (d = !d);
        h(d);
        !0 === b.transparent ? g(b.blending, b.blendEquation, b.blendSrc, b.blendDst, b.blendEquationAlpha, b.blendSrcAlpha, b.blendDstAlpha, b.premultipliedAlpha) : g(0);
        t.setFunc(b.depthFunc);
        t.setTest(b.depthTest);
        t.setMask(b.depthWrite);
        n.setMask(b.colorWrite);
        m(b.polygonOffset, b.polygonOffsetFactor, b.polygonOffsetUnits);
      },
      setFlipSided: h,
      setCullFace: l,
      setLineWidth: function setLineWidth(b) {
        b !== Q && (N && a.lineWidth(b), Q = b);
      },
      setPolygonOffset: m,
      setScissorTest: function setScissorTest(b) {
        b ? e(a.SCISSOR_TEST) : f(a.SCISSOR_TEST);
      },
      activeTexture: u,
      bindTexture: function bindTexture(b, c) {
        null === M && u();
        var d = O[M];
        void 0 === d && (d = {
          type: void 0,
          texture: void 0
        }, O[M] = d);
        if (d.type !== b || d.texture !== c) a.bindTexture(b, c || W[b]), d.type = b, d.texture = c;
      },
      compressedTexImage2D: function compressedTexImage2D() {
        try {
          a.compressedTexImage2D.apply(a, arguments);
        } catch (R) {
          console.error("THREE.WebGLState:", R);
        }
      },
      texImage2D: function texImage2D() {
        try {
          a.texImage2D.apply(a, arguments);
        } catch (R) {
          console.error("THREE.WebGLState:", R);
        }
      },
      scissor: function scissor(b) {
        !1 === T.equals(b) && (a.scissor(b.x, b.y, b.z, b.w), T.copy(b));
      },
      viewport: function viewport(b) {
        !1 === J.equals(b) && (a.viewport(b.x, b.y, b.z, b.w), J.copy(b));
      },
      reset: function reset() {
        for (var b = 0; b < p.length; b++) {
          1 === p[b] && (a.disableVertexAttribArray(b), p[b] = 0);
        }

        w = {};
        M = B = null;
        O = {};
        E = A = K = G = null;
        n.reset();
        t.reset();
        r.reset();
      }
    };
  }

  function Fg(a, b, c, d, e, f, g) {
    function h(a, b) {
      if (a.width > b || a.height > b) {
        if ("data" in a) {
          console.warn("THREE.WebGLRenderer: image in DataTexture is too big (" + a.width + "x" + a.height + ").");
          return;
        }

        b /= Math.max(a.width, a.height);
        var c = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
        c.width = Math.floor(a.width * b);
        c.height = Math.floor(a.height * b);
        c.getContext("2d").drawImage(a, 0, 0, a.width, a.height, 0, 0, c.width, c.height);
        console.warn("THREE.WebGLRenderer: image is too big (" + a.width + "x" + a.height + "). Resized to " + c.width + "x" + c.height, a);
        return c;
      }

      return a;
    }

    function l(a) {
      return S.isPowerOfTwo(a.width) && S.isPowerOfTwo(a.height);
    }

    function m(a, b) {
      return a.generateMipmaps && b && 1003 !== a.minFilter && 1006 !== a.minFilter;
    }

    function u(b, c, e, f) {
      a.generateMipmap(b);
      d.get(c).__maxMipLevel = Math.log2(Math.max(e, f));
    }

    function n(b) {
      return 1003 === b || 1004 === b || 1005 === b ? a.NEAREST : a.LINEAR;
    }

    function t(b) {
      b = b.target;
      b.removeEventListener("dispose", t);

      a: {
        var c = d.get(b);
        if (b.image && c.__image__webglTextureCube) a.deleteTexture(c.__image__webglTextureCube);else {
          if (void 0 === c.__webglInit) break a;
          a.deleteTexture(c.__webglTexture);
        }
        d.remove(b);
      }

      b.isVideoTexture && delete B[b.id];
      g.memory.textures--;
    }

    function k(b) {
      b = b.target;
      b.removeEventListener("dispose", k);
      var c = d.get(b),
          e = d.get(b.texture);

      if (b) {
        void 0 !== e.__webglTexture && a.deleteTexture(e.__webglTexture);
        b.depthTexture && b.depthTexture.dispose();
        if (b.isWebGLRenderTargetCube) for (e = 0; 6 > e; e++) {
          a.deleteFramebuffer(c.__webglFramebuffer[e]), c.__webglDepthbuffer && a.deleteRenderbuffer(c.__webglDepthbuffer[e]);
        } else a.deleteFramebuffer(c.__webglFramebuffer), c.__webglDepthbuffer && a.deleteRenderbuffer(c.__webglDepthbuffer);
        d.remove(b.texture);
        d.remove(b);
      }

      g.memory.textures--;
    }

    function q(b, n) {
      var k = d.get(b);

      if (b.isVideoTexture) {
        var r = b.id,
            q = g.render.frame;
        B[r] !== q && (B[r] = q, b.update());
      }

      if (0 < b.version && k.__version !== b.version) if (r = b.image, void 0 === r) console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined", b);else if (!1 === r.complete) console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete", b);else {
        void 0 === k.__webglInit && (k.__webglInit = !0, b.addEventListener("dispose", t), k.__webglTexture = a.createTexture(), g.memory.textures++);
        c.activeTexture(a.TEXTURE0 + n);
        c.bindTexture(a.TEXTURE_2D, k.__webglTexture);
        a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, b.flipY);
        a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL, b.premultiplyAlpha);
        a.pixelStorei(a.UNPACK_ALIGNMENT, b.unpackAlignment);
        n = h(b.image, e.maxTextureSize);
        (1001 !== b.wrapS || 1001 !== b.wrapT || 1003 !== b.minFilter && 1006 !== b.minFilter) && !1 === l(n) && (n instanceof HTMLImageElement || n instanceof HTMLCanvasElement || n instanceof ImageBitmap) && (void 0 === G && (G = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas")), G.width = S.floorPowerOfTwo(n.width), G.height = S.floorPowerOfTwo(n.height), G.getContext("2d").drawImage(n, 0, 0, G.width, G.height), console.warn("THREE.WebGLRenderer: image is not power of two (" + n.width + "x" + n.height + "). Resized to " + G.width + "x" + G.height, n), n = G);
        r = l(n);
        q = f.convert(b.format);
        var p = f.convert(b.type);
        v(a.TEXTURE_2D, b, r);
        var x = b.mipmaps;

        if (b.isDepthTexture) {
          var K = a.DEPTH_COMPONENT;

          if (1015 === b.type) {
            if (!w) throw Error("Float Depth Texture only supported in WebGL2.0");
            K = a.DEPTH_COMPONENT32F;
          } else w && (K = a.DEPTH_COMPONENT16);

          1026 === b.format && K === a.DEPTH_COMPONENT && 1012 !== b.type && 1014 !== b.type && (console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."), b.type = 1012, p = f.convert(b.type));
          1027 === b.format && (K = a.DEPTH_STENCIL, 1020 !== b.type && (console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."), b.type = 1020, p = f.convert(b.type)));
          c.texImage2D(a.TEXTURE_2D, 0, K, n.width, n.height, 0, q, p, null);
        } else if (b.isDataTexture) {
          if (0 < x.length && r) {
            for (var P = 0, y = x.length; P < y; P++) {
              K = x[P], c.texImage2D(a.TEXTURE_2D, P, q, K.width, K.height, 0, q, p, K.data);
            }

            b.generateMipmaps = !1;
            k.__maxMipLevel = x.length - 1;
          } else c.texImage2D(a.TEXTURE_2D, 0, q, n.width, n.height, 0, q, p, n.data), k.__maxMipLevel = 0;
        } else if (b.isCompressedTexture) {
          P = 0;

          for (y = x.length; P < y; P++) {
            K = x[P], 1023 !== b.format && 1022 !== b.format ? -1 < c.getCompressedTextureFormats().indexOf(q) ? c.compressedTexImage2D(a.TEXTURE_2D, P, q, K.width, K.height, 0, K.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : c.texImage2D(a.TEXTURE_2D, P, q, K.width, K.height, 0, q, p, K.data);
          }

          k.__maxMipLevel = x.length - 1;
        } else if (0 < x.length && r) {
          P = 0;

          for (y = x.length; P < y; P++) {
            K = x[P], c.texImage2D(a.TEXTURE_2D, P, q, q, p, K);
          }

          b.generateMipmaps = !1;
          k.__maxMipLevel = x.length - 1;
        } else c.texImage2D(a.TEXTURE_2D, 0, q, q, p, n), k.__maxMipLevel = 0;

        m(b, r) && u(a.TEXTURE_2D, b, n.width, n.height);
        k.__version = b.version;
        if (b.onUpdate) b.onUpdate(b);
        return;
      }
      c.activeTexture(a.TEXTURE0 + n);
      c.bindTexture(a.TEXTURE_2D, k.__webglTexture);
    }

    function v(c, g, h) {
      h ? (a.texParameteri(c, a.TEXTURE_WRAP_S, f.convert(g.wrapS)), a.texParameteri(c, a.TEXTURE_WRAP_T, f.convert(g.wrapT)), a.texParameteri(c, a.TEXTURE_MAG_FILTER, f.convert(g.magFilter)), a.texParameteri(c, a.TEXTURE_MIN_FILTER, f.convert(g.minFilter))) : (a.texParameteri(c, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE), a.texParameteri(c, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE), 1001 === g.wrapS && 1001 === g.wrapT || console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.", g), a.texParameteri(c, a.TEXTURE_MAG_FILTER, n(g.magFilter)), a.texParameteri(c, a.TEXTURE_MIN_FILTER, n(g.minFilter)), 1003 !== g.minFilter && 1006 !== g.minFilter && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.", g));
      !(h = b.get("EXT_texture_filter_anisotropic")) || 1015 === g.type && null === b.get("OES_texture_float_linear") || 1016 === g.type && null === b.get("OES_texture_half_float_linear") || !(1 < g.anisotropy || d.get(g).__currentAnisotropy) || (a.texParameterf(c, h.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(g.anisotropy, e.getMaxAnisotropy())), d.get(g).__currentAnisotropy = g.anisotropy);
    }

    function p(b, e, g, h) {
      var l = f.convert(e.texture.format),
          m = f.convert(e.texture.type);
      c.texImage2D(h, 0, l, e.width, e.height, 0, l, m, null);
      a.bindFramebuffer(a.FRAMEBUFFER, b);
      a.framebufferTexture2D(a.FRAMEBUFFER, g, h, d.get(e.texture).__webglTexture, 0);
      a.bindFramebuffer(a.FRAMEBUFFER, null);
    }

    function y(b, c) {
      a.bindRenderbuffer(a.RENDERBUFFER, b);
      c.depthBuffer && !c.stencilBuffer ? (a.renderbufferStorage(a.RENDERBUFFER, a.DEPTH_COMPONENT16, c.width, c.height), a.framebufferRenderbuffer(a.FRAMEBUFFER, a.DEPTH_ATTACHMENT, a.RENDERBUFFER, b)) : c.depthBuffer && c.stencilBuffer ? (a.renderbufferStorage(a.RENDERBUFFER, a.DEPTH_STENCIL, c.width, c.height), a.framebufferRenderbuffer(a.FRAMEBUFFER, a.DEPTH_STENCIL_ATTACHMENT, a.RENDERBUFFER, b)) : a.renderbufferStorage(a.RENDERBUFFER, a.RGBA4, c.width, c.height);
      a.bindRenderbuffer(a.RENDERBUFFER, null);
    }

    var w = "undefined" !== typeof WebGL2RenderingContext && a instanceof WebGL2RenderingContext,
        B = {},
        G;
    this.setTexture2D = q;

    this.setTextureCube = function (b, n) {
      var k = d.get(b);
      if (6 === b.image.length) if (0 < b.version && k.__version !== b.version) {
        k.__image__webglTextureCube || (b.addEventListener("dispose", t), k.__image__webglTextureCube = a.createTexture(), g.memory.textures++);
        c.activeTexture(a.TEXTURE0 + n);
        c.bindTexture(a.TEXTURE_CUBE_MAP, k.__image__webglTextureCube);
        a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, b.flipY);
        n = b && b.isCompressedTexture;

        for (var r = b.image[0] && b.image[0].isDataTexture, q = [], p = 0; 6 > p; p++) {
          q[p] = n || r ? r ? b.image[p].image : b.image[p] : h(b.image[p], e.maxCubemapSize);
        }

        var x = q[0],
            w = l(x),
            K = f.convert(b.format),
            y = f.convert(b.type);
        v(a.TEXTURE_CUBE_MAP, b, w);

        for (p = 0; 6 > p; p++) {
          if (n) for (var B, G = q[p].mipmaps, P = 0, C = G.length; P < C; P++) {
            B = G[P], 1023 !== b.format && 1022 !== b.format ? -1 < c.getCompressedTextureFormats().indexOf(K) ? c.compressedTexImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X + p, P, K, B.width, B.height, 0, B.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : c.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X + p, P, K, B.width, B.height, 0, K, y, B.data);
          } else r ? c.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X + p, 0, K, q[p].width, q[p].height, 0, K, y, q[p].data) : c.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X + p, 0, K, K, y, q[p]);
        }

        k.__maxMipLevel = n ? G.length - 1 : 0;
        m(b, w) && u(a.TEXTURE_CUBE_MAP, b, x.width, x.height);
        k.__version = b.version;
        if (b.onUpdate) b.onUpdate(b);
      } else c.activeTexture(a.TEXTURE0 + n), c.bindTexture(a.TEXTURE_CUBE_MAP, k.__image__webglTextureCube);
    };

    this.setTextureCubeDynamic = function (b, e) {
      c.activeTexture(a.TEXTURE0 + e);
      c.bindTexture(a.TEXTURE_CUBE_MAP, d.get(b).__webglTexture);
    };

    this.setupRenderTarget = function (b) {
      var e = d.get(b),
          f = d.get(b.texture);
      b.addEventListener("dispose", k);
      f.__webglTexture = a.createTexture();
      g.memory.textures++;
      var h = !0 === b.isWebGLRenderTargetCube,
          n = l(b);

      if (h) {
        e.__webglFramebuffer = [];

        for (var t = 0; 6 > t; t++) {
          e.__webglFramebuffer[t] = a.createFramebuffer();
        }
      } else e.__webglFramebuffer = a.createFramebuffer();

      if (h) {
        c.bindTexture(a.TEXTURE_CUBE_MAP, f.__webglTexture);
        v(a.TEXTURE_CUBE_MAP, b.texture, n);

        for (t = 0; 6 > t; t++) {
          p(e.__webglFramebuffer[t], b, a.COLOR_ATTACHMENT0, a.TEXTURE_CUBE_MAP_POSITIVE_X + t);
        }

        m(b.texture, n) && u(a.TEXTURE_CUBE_MAP, b.texture, b.width, b.height);
        c.bindTexture(a.TEXTURE_CUBE_MAP, null);
      } else c.bindTexture(a.TEXTURE_2D, f.__webglTexture), v(a.TEXTURE_2D, b.texture, n), p(e.__webglFramebuffer, b, a.COLOR_ATTACHMENT0, a.TEXTURE_2D), m(b.texture, n) && u(a.TEXTURE_2D, b.texture, b.width, b.height), c.bindTexture(a.TEXTURE_2D, null);

      if (b.depthBuffer) {
        e = d.get(b);
        f = !0 === b.isWebGLRenderTargetCube;

        if (b.depthTexture) {
          if (f) throw Error("target.depthTexture not supported in Cube render targets");
          if (b && b.isWebGLRenderTargetCube) throw Error("Depth Texture with cube render targets is not supported");
          a.bindFramebuffer(a.FRAMEBUFFER, e.__webglFramebuffer);
          if (!b.depthTexture || !b.depthTexture.isDepthTexture) throw Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
          d.get(b.depthTexture).__webglTexture && b.depthTexture.image.width === b.width && b.depthTexture.image.height === b.height || (b.depthTexture.image.width = b.width, b.depthTexture.image.height = b.height, b.depthTexture.needsUpdate = !0);
          q(b.depthTexture, 0);
          e = d.get(b.depthTexture).__webglTexture;
          if (1026 === b.depthTexture.format) a.framebufferTexture2D(a.FRAMEBUFFER, a.DEPTH_ATTACHMENT, a.TEXTURE_2D, e, 0);else if (1027 === b.depthTexture.format) a.framebufferTexture2D(a.FRAMEBUFFER, a.DEPTH_STENCIL_ATTACHMENT, a.TEXTURE_2D, e, 0);else throw Error("Unknown depthTexture format");
        } else if (f) for (e.__webglDepthbuffer = [], f = 0; 6 > f; f++) {
          a.bindFramebuffer(a.FRAMEBUFFER, e.__webglFramebuffer[f]), e.__webglDepthbuffer[f] = a.createRenderbuffer(), y(e.__webglDepthbuffer[f], b);
        } else a.bindFramebuffer(a.FRAMEBUFFER, e.__webglFramebuffer), e.__webglDepthbuffer = a.createRenderbuffer(), y(e.__webglDepthbuffer, b);

        a.bindFramebuffer(a.FRAMEBUFFER, null);
      }
    };

    this.updateRenderTargetMipmap = function (b) {
      var e = b.texture,
          f = l(b);

      if (m(e, f)) {
        f = b.isWebGLRenderTargetCube ? a.TEXTURE_CUBE_MAP : a.TEXTURE_2D;

        var g = d.get(e).__webglTexture;

        c.bindTexture(f, g);
        u(f, e, b.width, b.height);
        c.bindTexture(f, null);
      }
    };
  }

  function Ve(a, b) {
    return {
      convert: function convert(c) {
        if (1E3 === c) return a.REPEAT;
        if (1001 === c) return a.CLAMP_TO_EDGE;
        if (1002 === c) return a.MIRRORED_REPEAT;
        if (1003 === c) return a.NEAREST;
        if (1004 === c) return a.NEAREST_MIPMAP_NEAREST;
        if (1005 === c) return a.NEAREST_MIPMAP_LINEAR;
        if (1006 === c) return a.LINEAR;
        if (1007 === c) return a.LINEAR_MIPMAP_NEAREST;
        if (1008 === c) return a.LINEAR_MIPMAP_LINEAR;
        if (1009 === c) return a.UNSIGNED_BYTE;
        if (1017 === c) return a.UNSIGNED_SHORT_4_4_4_4;
        if (1018 === c) return a.UNSIGNED_SHORT_5_5_5_1;
        if (1019 === c) return a.UNSIGNED_SHORT_5_6_5;
        if (1010 === c) return a.BYTE;
        if (1011 === c) return a.SHORT;
        if (1012 === c) return a.UNSIGNED_SHORT;
        if (1013 === c) return a.INT;
        if (1014 === c) return a.UNSIGNED_INT;
        if (1015 === c) return a.FLOAT;

        if (1016 === c) {
          var d = b.get("OES_texture_half_float");
          if (null !== d) return d.HALF_FLOAT_OES;
        }

        if (1021 === c) return a.ALPHA;
        if (1022 === c) return a.RGB;
        if (1023 === c) return a.RGBA;
        if (1024 === c) return a.LUMINANCE;
        if (1025 === c) return a.LUMINANCE_ALPHA;
        if (1026 === c) return a.DEPTH_COMPONENT;
        if (1027 === c) return a.DEPTH_STENCIL;
        if (100 === c) return a.FUNC_ADD;
        if (101 === c) return a.FUNC_SUBTRACT;
        if (102 === c) return a.FUNC_REVERSE_SUBTRACT;
        if (200 === c) return a.ZERO;
        if (201 === c) return a.ONE;
        if (202 === c) return a.SRC_COLOR;
        if (203 === c) return a.ONE_MINUS_SRC_COLOR;
        if (204 === c) return a.SRC_ALPHA;
        if (205 === c) return a.ONE_MINUS_SRC_ALPHA;
        if (206 === c) return a.DST_ALPHA;
        if (207 === c) return a.ONE_MINUS_DST_ALPHA;
        if (208 === c) return a.DST_COLOR;
        if (209 === c) return a.ONE_MINUS_DST_COLOR;
        if (210 === c) return a.SRC_ALPHA_SATURATE;
        if (33776 === c || 33777 === c || 33778 === c || 33779 === c) if (d = b.get("WEBGL_compressed_texture_s3tc"), null !== d) {
          if (33776 === c) return d.COMPRESSED_RGB_S3TC_DXT1_EXT;
          if (33777 === c) return d.COMPRESSED_RGBA_S3TC_DXT1_EXT;
          if (33778 === c) return d.COMPRESSED_RGBA_S3TC_DXT3_EXT;
          if (33779 === c) return d.COMPRESSED_RGBA_S3TC_DXT5_EXT;
        }
        if (35840 === c || 35841 === c || 35842 === c || 35843 === c) if (d = b.get("WEBGL_compressed_texture_pvrtc"), null !== d) {
          if (35840 === c) return d.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
          if (35841 === c) return d.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
          if (35842 === c) return d.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
          if (35843 === c) return d.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
        }
        if (36196 === c && (d = b.get("WEBGL_compressed_texture_etc1"), null !== d)) return d.COMPRESSED_RGB_ETC1_WEBGL;
        if (37808 === c || 37809 === c || 37810 === c || 37811 === c || 37812 === c || 37813 === c || 37814 === c || 37815 === c || 37816 === c || 37817 === c || 37818 === c || 37819 === c || 37820 === c || 37821 === c) if (d = b.get("WEBGL_compressed_texture_astc"), null !== d) return c;
        if (103 === c || 104 === c) if (d = b.get("EXT_blend_minmax"), null !== d) {
          if (103 === c) return d.MIN_EXT;
          if (104 === c) return d.MAX_EXT;
        }
        return 1020 === c && (d = b.get("WEBGL_depth_texture"), null !== d) ? d.UNSIGNED_INT_24_8_WEBGL : 0;
      }
    };
  }

  function la(a, b, c, d) {
    Qa.call(this);
    this.type = "PerspectiveCamera";
    this.fov = void 0 !== a ? a : 50;
    this.zoom = 1;
    this.near = void 0 !== c ? c : .1;
    this.far = void 0 !== d ? d : 2E3;
    this.focus = 10;
    this.aspect = void 0 !== b ? b : 1;
    this.view = null;
    this.filmGauge = 35;
    this.filmOffset = 0;
    this.updateProjectionMatrix();
  }

  function qd(a) {
    la.call(this);
    this.cameras = a || [];
  }

  function We(a) {
    function b() {
      if (null !== d && d.isPresenting) {
        var b = d.getEyeParameters("left"),
            e = b.renderWidth;
        b = b.renderHeight;
        v = a.getPixelRatio();
        q = a.getSize();
        a.setDrawingBufferSize(2 * e, b, 1);
      } else c.enabled && a.setDrawingBufferSize(q.width, q.height, v);
    }

    var c = this,
        d = null,
        e = null,
        f = null,
        g = new M(),
        h = new M();
    "undefined" !== typeof window && "VRFrameData" in window && (e = new window.VRFrameData());
    var l = new M(),
        m = new ja(),
        u = new p(),
        n = new la();
    n.bounds = new ea(0, 0, .5, 1);
    n.layers.enable(1);
    var t = new la();
    t.bounds = new ea(.5, 0, .5, 1);
    t.layers.enable(2);
    var k = new qd([n, t]);
    k.layers.enable(1);
    k.layers.enable(2);
    var q, v;
    "undefined" !== typeof window && window.addEventListener("vrdisplaypresentchange", b, !1);
    this.enabled = !1;
    this.userHeight = 1.6;

    this.getDevice = function () {
      return d;
    };

    this.setDevice = function (a) {
      void 0 !== a && (d = a);
    };

    this.setPoseTarget = function (a) {
      void 0 !== a && (f = a);
    };

    this.getCamera = function (a) {
      if (null === d) return a;
      d.depthNear = a.near;
      d.depthFar = a.far;
      d.getFrameData(e);
      var b = d.stageParameters;
      b ? g.fromArray(b.sittingToStandingTransform) : g.makeTranslation(0, c.userHeight, 0);
      b = e.pose;
      var r = null !== f ? f : a;
      r.matrix.copy(g);
      r.matrix.decompose(r.position, r.quaternion, r.scale);
      null !== b.orientation && (m.fromArray(b.orientation), r.quaternion.multiply(m));
      null !== b.position && (m.setFromRotationMatrix(g), u.fromArray(b.position), u.applyQuaternion(m), r.position.add(u));
      r.updateMatrixWorld();
      if (!1 === d.isPresenting) return a;
      n.near = a.near;
      t.near = a.near;
      n.far = a.far;
      t.far = a.far;
      k.matrixWorld.copy(a.matrixWorld);
      k.matrixWorldInverse.copy(a.matrixWorldInverse);
      n.matrixWorldInverse.fromArray(e.leftViewMatrix);
      t.matrixWorldInverse.fromArray(e.rightViewMatrix);
      h.getInverse(g);
      n.matrixWorldInverse.multiply(h);
      t.matrixWorldInverse.multiply(h);
      a = r.parent;
      null !== a && (l.getInverse(a.matrixWorld), n.matrixWorldInverse.multiply(l), t.matrixWorldInverse.multiply(l));
      n.matrixWorld.getInverse(n.matrixWorldInverse);
      t.matrixWorld.getInverse(t.matrixWorldInverse);
      n.projectionMatrix.fromArray(e.leftProjectionMatrix);
      t.projectionMatrix.fromArray(e.rightProjectionMatrix);
      k.projectionMatrix.copy(n.projectionMatrix);
      a = d.getLayers();
      a.length && (a = a[0], null !== a.leftBounds && 4 === a.leftBounds.length && n.bounds.fromArray(a.leftBounds), null !== a.rightBounds && 4 === a.rightBounds.length && t.bounds.fromArray(a.rightBounds));
      return k;
    };

    this.getStandingMatrix = function () {
      return g;
    };

    this.submitFrame = function () {
      d && d.isPresenting && d.submitFrame();
    };

    this.dispose = function () {
      "undefined" !== typeof window && window.removeEventListener("vrdisplaypresentchange", b);
    };
  }

  function Xd(a) {
    function b() {
      ka = new Hf(D);
      ka.get("WEBGL_depth_texture");
      ka.get("OES_texture_float");
      ka.get("OES_texture_float_linear");
      ka.get("OES_texture_half_float");
      ka.get("OES_texture_half_float_linear");
      ka.get("OES_standard_derivatives");
      ka.get("OES_element_index_uint");
      ka.get("ANGLE_instanced_arrays");
      ia = new Ve(D, ka);
      Ra = new Ff(D, ka, a);
      ba = new Eg(D, ka, ia);
      ba.scissor(V.copy(ca).multiplyScalar(R));
      ba.viewport(ob.copy(Y).multiplyScalar(R));
      da = new Kf(D);
      X = new tg();
      fa = new Fg(D, ka, ba, X, Ra, ia, da);
      qa = new yf(D);
      ra = new If(D, qa, da);
      sa = new Nf(ra, da);
      wa = new Mf(D);
      oa = new sg(A, ka, Ra);
      ua = new xg();
      pa = new Cg();
      ma = new Df(A, ba, ra, P);
      xa = new Ef(D, ka, da);
      za = new Jf(D, ka, da);
      Aa = new Dg(A, D, ba, fa, Ra);
      da.programs = oa.programs;
      A.context = D;
      A.capabilities = Ra;
      A.extensions = ka;
      A.properties = X;
      A.renderLists = ua;
      A.state = ba;
      A.info = da;
    }

    function c(a) {
      a.preventDefault();
      console.log("THREE.WebGLRenderer: Context Lost.");
      E = !0;
    }

    function d() {
      console.log("THREE.WebGLRenderer: Context Restored.");
      E = !1;
      b();
    }

    function e(a) {
      a = a.target;
      a.removeEventListener("dispose", e);
      f(a);
      X.remove(a);
    }

    function f(a) {
      var b = X.get(a).program;
      a.program = void 0;
      void 0 !== b && oa.releaseProgram(b);
    }

    function g(a, b, c) {
      a.render(function (a) {
        A.renderBufferImmediate(a, b, c);
      });
    }

    function h() {
      var a = na.getDevice();
      a && a.isPresenting ? a.requestAnimationFrame(l) : window.requestAnimationFrame(l);
    }

    function l(a) {
      !1 !== va && (Ba(a), h());
    }

    function m(a, b, c) {
      if (!1 !== a.visible) {
        if (a.layers.test(b.layers)) if (a.isLight) Z.pushLight(a), a.castShadow && Z.pushShadow(a);else if (a.isSprite) a.frustumCulled && !ha.intersectsSprite(a) || Z.pushSprite(a);else if (a.isImmediateRenderObject) c && Nb.setFromMatrixPosition(a.matrixWorld).applyMatrix4(pd), z.push(a, null, a.material, Nb.z, null);else if (a.isMesh || a.isLine || a.isPoints) if (a.isSkinnedMesh && a.skeleton.update(), !a.frustumCulled || ha.intersectsObject(a)) {
          c && Nb.setFromMatrixPosition(a.matrixWorld).applyMatrix4(pd);
          var d = sa.update(a),
              e = a.material;
          if ((0, _isArray.default)(e)) for (var f = d.groups, g = 0, h = f.length; g < h; g++) {
            var l = f[g],
                n = e[l.materialIndex];
            n && n.visible && z.push(a, d, n, Nb.z, l);
          } else e.visible && z.push(a, d, e, Nb.z, null);
        }
        a = a.children;
        g = 0;

        for (h = a.length; g < h; g++) {
          m(a[g], b, c);
        }
      }
    }

    function u(a, b, c, d) {
      for (var e = 0, f = a.length; e < f; e++) {
        var g = a[e],
            h = g.object,
            l = g.geometry,
            m = void 0 === d ? g.material : d;
        g = g.group;

        if (c.isArrayCamera) {
          T = c;

          for (var u = c.cameras, t = 0, k = u.length; t < k; t++) {
            var r = u[t];

            if (h.layers.test(r.layers)) {
              var q = r.bounds;
              ba.viewport(ob.set(q.x * J, q.y * W, q.z * J, q.w * W).multiplyScalar(R));
              n(h, b, r, l, m, g);
            }
          }
        } else T = null, n(h, b, c, l, m, g);
      }
    }

    function n(a, b, c, d, e, f) {
      a.onBeforeRender(A, b, c, d, e, f);
      Z = pa.get(b, T || c);
      a.modelViewMatrix.multiplyMatrices(c.matrixWorldInverse, a.matrixWorld);
      a.normalMatrix.getNormalMatrix(a.modelViewMatrix);

      if (a.isImmediateRenderObject) {
        var h = a.isMesh && 0 > a.matrixWorld.determinant();
        ba.setMaterial(e, h);
        h = k(c, b.fog, e, a);
        N = "";
        g(a, h, e);
      } else A.renderBufferDirect(c, b.fog, d, e, a, f);

      a.onAfterRender(A, b, c, d, e, f);
      Z = pa.get(b, T || c);
    }

    function t(a, b, c) {
      var d = X.get(a),
          g = Z.state.lights;
      c = oa.getParameters(a, g.state, Z.state.shadowsArray, b, Ga.numPlanes, Ga.numIntersection, c);
      var h = oa.getProgramCode(a, c),
          l = d.program,
          m = !0;
      if (void 0 === l) a.addEventListener("dispose", e);else if (l.code !== h) f(a);else {
        if (d.lightsHash !== g.state.hash) X.update(a, "lightsHash", g.state.hash);else if (void 0 !== c.shaderID) return;
        m = !1;
      }
      m && (c.shaderID ? (l = rb[c.shaderID], d.shader = {
        name: a.type,
        uniforms: Da.clone(l.uniforms),
        vertexShader: l.vertexShader,
        fragmentShader: l.fragmentShader
      }) : d.shader = {
        name: a.type,
        uniforms: a.uniforms,
        vertexShader: a.vertexShader,
        fragmentShader: a.fragmentShader
      }, a.onBeforeCompile(d.shader, A), l = oa.acquireProgram(a, d.shader, c, h), d.program = l, a.program = l);
      c = l.getAttributes();
      if (a.morphTargets) for (h = a.numSupportedMorphTargets = 0; h < A.maxMorphTargets; h++) {
        0 <= c["morphTarget" + h] && a.numSupportedMorphTargets++;
      }
      if (a.morphNormals) for (h = a.numSupportedMorphNormals = 0; h < A.maxMorphNormals; h++) {
        0 <= c["morphNormal" + h] && a.numSupportedMorphNormals++;
      }
      c = d.shader.uniforms;
      if (!a.isShaderMaterial && !a.isRawShaderMaterial || !0 === a.clipping) d.numClippingPlanes = Ga.numPlanes, d.numIntersection = Ga.numIntersection, c.clippingPlanes = Ga.uniform;
      d.fog = b;
      d.lightsHash = g.state.hash;
      a.lights && (c.ambientLightColor.value = g.state.ambient, c.directionalLights.value = g.state.directional, c.spotLights.value = g.state.spot, c.rectAreaLights.value = g.state.rectArea, c.pointLights.value = g.state.point, c.hemisphereLights.value = g.state.hemi, c.directionalShadowMap.value = g.state.directionalShadowMap, c.directionalShadowMatrix.value = g.state.directionalShadowMatrix, c.spotShadowMap.value = g.state.spotShadowMap, c.spotShadowMatrix.value = g.state.spotShadowMatrix, c.pointShadowMap.value = g.state.pointShadowMap, c.pointShadowMatrix.value = g.state.pointShadowMatrix);
      a = d.program.getUniforms();
      a = bb.seqWithValue(a.seq, c);
      d.uniformsList = a;
    }

    function k(a, b, c, d) {
      aa = 0;
      var e = X.get(c),
          f = Z.state.lights;
      od && (la || a !== O) && Ga.setState(c.clippingPlanes, c.clipIntersection, c.clipShadows, a, e, a === O && c.id === Q);
      !1 === c.needsUpdate && (void 0 === e.program ? c.needsUpdate = !0 : c.fog && e.fog !== b ? c.needsUpdate = !0 : c.lights && e.lightsHash !== f.state.hash ? c.needsUpdate = !0 : void 0 === e.numClippingPlanes || e.numClippingPlanes === Ga.numPlanes && e.numIntersection === Ga.numIntersection || (c.needsUpdate = !0));
      c.needsUpdate && (t(c, b, d), c.needsUpdate = !1);
      var g = !1,
          h = !1,
          l = !1;
      f = e.program;
      var m = f.getUniforms(),
          n = e.shader.uniforms;
      ba.useProgram(f.program) && (l = h = g = !0);
      c.id !== Q && (Q = c.id, h = !0);

      if (g || a !== O) {
        m.setValue(D, "projectionMatrix", a.projectionMatrix);
        Ra.logarithmicDepthBuffer && m.setValue(D, "logDepthBufFC", 2 / (Math.log(a.far + 1) / Math.LN2));
        O !== (T || a) && (O = T || a, l = h = !0);
        if (c.isShaderMaterial || c.isMeshPhongMaterial || c.isMeshStandardMaterial || c.envMap) g = m.map.cameraPosition, void 0 !== g && g.setValue(D, Nb.setFromMatrixPosition(a.matrixWorld));
        (c.isMeshPhongMaterial || c.isMeshLambertMaterial || c.isMeshBasicMaterial || c.isMeshStandardMaterial || c.isShaderMaterial || c.skinning) && m.setValue(D, "viewMatrix", a.matrixWorldInverse);
      }

      if (c.skinning && (m.setOptional(D, d, "bindMatrix"), m.setOptional(D, d, "bindMatrixInverse"), a = d.skeleton)) if (g = a.bones, Ra.floatVertexTextures) {
        if (void 0 === a.boneTexture) {
          g = Math.sqrt(4 * g.length);
          g = S.ceilPowerOfTwo(g);
          g = Math.max(g, 4);
          var u = new Float32Array(g * g * 4);
          u.set(a.boneMatrices);
          var k = new ib(u, g, g, 1023, 1015);
          k.needsUpdate = !0;
          a.boneMatrices = u;
          a.boneTexture = k;
          a.boneTextureSize = g;
        }

        m.setValue(D, "boneTexture", a.boneTexture);
        m.setValue(D, "boneTextureSize", a.boneTextureSize);
      } else m.setOptional(D, a, "boneMatrices");
      h && (m.setValue(D, "toneMappingExposure", A.toneMappingExposure), m.setValue(D, "toneMappingWhitePoint", A.toneMappingWhitePoint), c.lights && (h = l, n.ambientLightColor.needsUpdate = h, n.directionalLights.needsUpdate = h, n.pointLights.needsUpdate = h, n.spotLights.needsUpdate = h, n.rectAreaLights.needsUpdate = h, n.hemisphereLights.needsUpdate = h), b && c.fog && (n.fogColor.value = b.color, b.isFog ? (n.fogNear.value = b.near, n.fogFar.value = b.far) : b.isFogExp2 && (n.fogDensity.value = b.density)), c.isMeshBasicMaterial ? q(n, c) : c.isMeshLambertMaterial ? (q(n, c), c.emissiveMap && (n.emissiveMap.value = c.emissiveMap)) : c.isMeshPhongMaterial ? (q(n, c), c.isMeshToonMaterial ? (v(n, c), c.gradientMap && (n.gradientMap.value = c.gradientMap)) : v(n, c)) : c.isMeshStandardMaterial ? (q(n, c), c.isMeshPhysicalMaterial && (n.clearCoat.value = c.clearCoat, n.clearCoatRoughness.value = c.clearCoatRoughness), n.roughness.value = c.roughness, n.metalness.value = c.metalness, c.roughnessMap && (n.roughnessMap.value = c.roughnessMap), c.metalnessMap && (n.metalnessMap.value = c.metalnessMap), c.emissiveMap && (n.emissiveMap.value = c.emissiveMap), c.bumpMap && (n.bumpMap.value = c.bumpMap, n.bumpScale.value = c.bumpScale), c.normalMap && (n.normalMap.value = c.normalMap, n.normalScale.value.copy(c.normalScale)), c.displacementMap && (n.displacementMap.value = c.displacementMap, n.displacementScale.value = c.displacementScale, n.displacementBias.value = c.displacementBias), c.envMap && (n.envMapIntensity.value = c.envMapIntensity)) : c.isMeshDepthMaterial ? (q(n, c), c.displacementMap && (n.displacementMap.value = c.displacementMap, n.displacementScale.value = c.displacementScale, n.displacementBias.value = c.displacementBias)) : c.isMeshDistanceMaterial ? (q(n, c), c.displacementMap && (n.displacementMap.value = c.displacementMap, n.displacementScale.value = c.displacementScale, n.displacementBias.value = c.displacementBias), n.referencePosition.value.copy(c.referencePosition), n.nearDistance.value = c.nearDistance, n.farDistance.value = c.farDistance) : c.isMeshNormalMaterial ? (q(n, c), c.bumpMap && (n.bumpMap.value = c.bumpMap, n.bumpScale.value = c.bumpScale), c.normalMap && (n.normalMap.value = c.normalMap, n.normalScale.value.copy(c.normalScale)), c.displacementMap && (n.displacementMap.value = c.displacementMap, n.displacementScale.value = c.displacementScale, n.displacementBias.value = c.displacementBias)) : c.isLineBasicMaterial ? (n.diffuse.value = c.color, n.opacity.value = c.opacity, c.isLineDashedMaterial && (n.dashSize.value = c.dashSize, n.totalSize.value = c.dashSize + c.gapSize, n.scale.value = c.scale)) : c.isPointsMaterial ? (n.diffuse.value = c.color, n.opacity.value = c.opacity, n.size.value = c.size * R, n.scale.value = .5 * W, n.map.value = c.map, null !== c.map && (!0 === c.map.matrixAutoUpdate && (b = c.map.offset, h = c.map.repeat, l = c.map.center, c.map.matrix.setUvTransform(b.x, b.y, h.x, h.y, c.map.rotation, l.x, l.y)), n.uvTransform.value.copy(c.map.matrix))) : c.isShadowMaterial && (n.color.value = c.color, n.opacity.value = c.opacity), void 0 !== n.ltc_1 && (n.ltc_1.value = L.LTC_1), void 0 !== n.ltc_2 && (n.ltc_2.value = L.LTC_2), bb.upload(D, e.uniformsList, n, A));
      c.isShaderMaterial && !0 === c.uniformsNeedUpdate && (bb.upload(D, e.uniformsList, n, A), c.uniformsNeedUpdate = !1);
      m.setValue(D, "modelViewMatrix", d.modelViewMatrix);
      m.setValue(D, "normalMatrix", d.normalMatrix);
      m.setValue(D, "modelMatrix", d.matrixWorld);
      return f;
    }

    function q(a, b) {
      a.opacity.value = b.opacity;
      b.color && (a.diffuse.value = b.color);
      b.emissive && a.emissive.value.copy(b.emissive).multiplyScalar(b.emissiveIntensity);
      b.map && (a.map.value = b.map);
      b.alphaMap && (a.alphaMap.value = b.alphaMap);
      b.specularMap && (a.specularMap.value = b.specularMap);
      b.envMap && (a.envMap.value = b.envMap, a.flipEnvMap.value = b.envMap && b.envMap.isCubeTexture ? -1 : 1, a.reflectivity.value = b.reflectivity, a.refractionRatio.value = b.refractionRatio, a.maxMipLevel.value = X.get(b.envMap).__maxMipLevel);
      b.lightMap && (a.lightMap.value = b.lightMap, a.lightMapIntensity.value = b.lightMapIntensity);
      b.aoMap && (a.aoMap.value = b.aoMap, a.aoMapIntensity.value = b.aoMapIntensity);
      if (b.map) var c = b.map;else b.specularMap ? c = b.specularMap : b.displacementMap ? c = b.displacementMap : b.normalMap ? c = b.normalMap : b.bumpMap ? c = b.bumpMap : b.roughnessMap ? c = b.roughnessMap : b.metalnessMap ? c = b.metalnessMap : b.alphaMap ? c = b.alphaMap : b.emissiveMap && (c = b.emissiveMap);

      if (void 0 !== c) {
        c.isWebGLRenderTarget && (c = c.texture);

        if (!0 === c.matrixAutoUpdate) {
          b = c.offset;
          var d = c.repeat,
              e = c.center;
          c.matrix.setUvTransform(b.x, b.y, d.x, d.y, c.rotation, e.x, e.y);
        }

        a.uvTransform.value.copy(c.matrix);
      }
    }

    function v(a, b) {
      a.specular.value = b.specular;
      a.shininess.value = Math.max(b.shininess, 1E-4);
      b.emissiveMap && (a.emissiveMap.value = b.emissiveMap);
      b.bumpMap && (a.bumpMap.value = b.bumpMap, a.bumpScale.value = b.bumpScale);
      b.normalMap && (a.normalMap.value = b.normalMap, a.normalScale.value.copy(b.normalScale));
      b.displacementMap && (a.displacementMap.value = b.displacementMap, a.displacementScale.value = b.displacementScale, a.displacementBias.value = b.displacementBias);
    }

    console.log("THREE.WebGLRenderer", "91");
    a = a || {};
    var x = void 0 !== a.canvas ? a.canvas : document.createElementNS("http://www.w3.org/1999/xhtml", "canvas"),
        y = void 0 !== a.context ? a.context : null,
        w = void 0 !== a.alpha ? a.alpha : !1,
        B = void 0 !== a.depth ? a.depth : !0,
        G = void 0 !== a.stencil ? a.stencil : !0,
        K = void 0 !== a.antialias ? a.antialias : !1,
        P = void 0 !== a.premultipliedAlpha ? a.premultipliedAlpha : !0,
        H = void 0 !== a.preserveDrawingBuffer ? a.preserveDrawingBuffer : !1,
        C = void 0 !== a.powerPreference ? a.powerPreference : "default",
        z = null,
        Z = null;
    this.domElement = x;
    this.context = null;
    this.sortObjects = this.autoClearStencil = this.autoClearDepth = this.autoClearColor = this.autoClear = !0;
    this.clippingPlanes = [];
    this.localClippingEnabled = !1;
    this.gammaFactor = 2;
    this.physicallyCorrectLights = this.gammaOutput = this.gammaInput = !1;
    this.toneMappingWhitePoint = this.toneMappingExposure = this.toneMapping = 1;
    this.maxMorphTargets = 8;
    this.maxMorphNormals = 4;
    var A = this,
        E = !1,
        F = null,
        I = null,
        Q = -1,
        N = "",
        O = null,
        T = null,
        ob = new ea(),
        V = new ea(),
        U = null,
        aa = 0,
        J = x.width,
        W = x.height,
        R = 1,
        Y = new ea(0, 0, J, W),
        ca = new ea(0, 0, J, W),
        ja = !1,
        ha = new ld(),
        Ga = new Gf(),
        od = !1,
        la = !1,
        pd = new M(),
        Nb = new p();

    try {
      w = {
        alpha: w,
        depth: B,
        stencil: G,
        antialias: K,
        premultipliedAlpha: P,
        preserveDrawingBuffer: H,
        powerPreference: C
      };
      x.addEventListener("webglcontextlost", c, !1);
      x.addEventListener("webglcontextrestored", d, !1);
      var D = y || x.getContext("webgl", w) || x.getContext("experimental-webgl", w);

      if (null === D) {
        if (null !== x.getContext("webgl")) throw Error("Error creating WebGL context with your selected attributes.");
        throw Error("Error creating WebGL context.");
      }

      void 0 === D.getShaderPrecisionFormat && (D.getShaderPrecisionFormat = function () {
        return {
          rangeMin: 1,
          rangeMax: 1,
          precision: 1
        };
      });
    } catch (Gg) {
      console.error("THREE.WebGLRenderer: " + Gg.message);
    }

    var ka, Ra, ba, da, X, fa, qa, ra, sa, oa, ua, pa, ma, wa, xa, za, Aa, ia;
    b();
    var na = new We(A);
    this.vr = na;
    var Ca = new Ue(A, sa, Ra.maxTextureSize);
    this.shadowMap = Ca;

    this.getContext = function () {
      return D;
    };

    this.getContextAttributes = function () {
      return D.getContextAttributes();
    };

    this.forceContextLoss = function () {
      var a = ka.get("WEBGL_lose_context");
      a && a.loseContext();
    };

    this.forceContextRestore = function () {
      var a = ka.get("WEBGL_lose_context");
      a && a.restoreContext();
    };

    this.getPixelRatio = function () {
      return R;
    };

    this.setPixelRatio = function (a) {
      void 0 !== a && (R = a, this.setSize(J, W, !1));
    };

    this.getSize = function () {
      return {
        width: J,
        height: W
      };
    };

    this.setSize = function (a, b, c) {
      var d = na.getDevice();
      d && d.isPresenting ? console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.") : (J = a, W = b, x.width = a * R, x.height = b * R, !1 !== c && (x.style.width = a + "px", x.style.height = b + "px"), this.setViewport(0, 0, a, b));
    };

    this.getDrawingBufferSize = function () {
      return {
        width: J * R,
        height: W * R
      };
    };

    this.setDrawingBufferSize = function (a, b, c) {
      J = a;
      W = b;
      R = c;
      x.width = a * c;
      x.height = b * c;
      this.setViewport(0, 0, a, b);
    };

    this.getCurrentViewport = function () {
      return ob;
    };

    this.setViewport = function (a, b, c, d) {
      Y.set(a, W - b - d, c, d);
      ba.viewport(ob.copy(Y).multiplyScalar(R));
    };

    this.setScissor = function (a, b, c, d) {
      ca.set(a, W - b - d, c, d);
      ba.scissor(V.copy(ca).multiplyScalar(R));
    };

    this.setScissorTest = function (a) {
      ba.setScissorTest(ja = a);
    };

    this.getClearColor = function () {
      return ma.getClearColor();
    };

    this.setClearColor = function () {
      ma.setClearColor.apply(ma, arguments);
    };

    this.getClearAlpha = function () {
      return ma.getClearAlpha();
    };

    this.setClearAlpha = function () {
      ma.setClearAlpha.apply(ma, arguments);
    };

    this.clear = function (a, b, c) {
      var d = 0;
      if (void 0 === a || a) d |= D.COLOR_BUFFER_BIT;
      if (void 0 === b || b) d |= D.DEPTH_BUFFER_BIT;
      if (void 0 === c || c) d |= D.STENCIL_BUFFER_BIT;
      D.clear(d);
    };

    this.clearColor = function () {
      this.clear(!0, !1, !1);
    };

    this.clearDepth = function () {
      this.clear(!1, !0, !1);
    };

    this.clearStencil = function () {
      this.clear(!1, !1, !0);
    };

    this.clearTarget = function (a, b, c, d) {
      this.setRenderTarget(a);
      this.clear(b, c, d);
    };

    this.dispose = function () {
      x.removeEventListener("webglcontextlost", c, !1);
      x.removeEventListener("webglcontextrestored", d, !1);
      ua.dispose();
      pa.dispose();
      X.dispose();
      sa.dispose();
      na.dispose();
      va = !1;
    };

    this.renderBufferImmediate = function (a, b, c) {
      ba.initAttributes();
      var d = X.get(a);
      a.hasPositions && !d.position && (d.position = D.createBuffer());
      a.hasNormals && !d.normal && (d.normal = D.createBuffer());
      a.hasUvs && !d.uv && (d.uv = D.createBuffer());
      a.hasColors && !d.color && (d.color = D.createBuffer());
      b = b.getAttributes();
      a.hasPositions && (D.bindBuffer(D.ARRAY_BUFFER, d.position), D.bufferData(D.ARRAY_BUFFER, a.positionArray, D.DYNAMIC_DRAW), ba.enableAttribute(b.position), D.vertexAttribPointer(b.position, 3, D.FLOAT, !1, 0, 0));

      if (a.hasNormals) {
        D.bindBuffer(D.ARRAY_BUFFER, d.normal);
        if (!c.isMeshPhongMaterial && !c.isMeshStandardMaterial && !c.isMeshNormalMaterial && !0 === c.flatShading) for (var e = 0, f = 3 * a.count; e < f; e += 9) {
          var g = a.normalArray,
              h = (g[e + 0] + g[e + 3] + g[e + 6]) / 3,
              l = (g[e + 1] + g[e + 4] + g[e + 7]) / 3,
              m = (g[e + 2] + g[e + 5] + g[e + 8]) / 3;
          g[e + 0] = h;
          g[e + 1] = l;
          g[e + 2] = m;
          g[e + 3] = h;
          g[e + 4] = l;
          g[e + 5] = m;
          g[e + 6] = h;
          g[e + 7] = l;
          g[e + 8] = m;
        }
        D.bufferData(D.ARRAY_BUFFER, a.normalArray, D.DYNAMIC_DRAW);
        ba.enableAttribute(b.normal);
        D.vertexAttribPointer(b.normal, 3, D.FLOAT, !1, 0, 0);
      }

      a.hasUvs && c.map && (D.bindBuffer(D.ARRAY_BUFFER, d.uv), D.bufferData(D.ARRAY_BUFFER, a.uvArray, D.DYNAMIC_DRAW), ba.enableAttribute(b.uv), D.vertexAttribPointer(b.uv, 2, D.FLOAT, !1, 0, 0));
      a.hasColors && 0 !== c.vertexColors && (D.bindBuffer(D.ARRAY_BUFFER, d.color), D.bufferData(D.ARRAY_BUFFER, a.colorArray, D.DYNAMIC_DRAW), ba.enableAttribute(b.color), D.vertexAttribPointer(b.color, 3, D.FLOAT, !1, 0, 0));
      ba.disableUnusedAttributes();
      D.drawArrays(D.TRIANGLES, 0, a.count);
      a.count = 0;
    };

    this.renderBufferDirect = function (a, b, c, d, e, f) {
      var g = e.isMesh && 0 > e.matrixWorld.determinant();
      ba.setMaterial(d, g);
      var h = k(a, b, d, e);
      a = c.id + "_" + h.id + "_" + (!0 === d.wireframe);
      var l = !1;
      a !== N && (N = a, l = !0);
      e.morphTargetInfluences && (wa.update(e, c, d, h), l = !0);
      g = c.index;
      var m = c.attributes.position;
      b = 1;
      !0 === d.wireframe && (g = ra.getWireframeAttribute(c), b = 2);
      a = xa;

      if (null !== g) {
        var n = qa.get(g);
        a = za;
        a.setIndex(n);
      }

      if (l) {
        l = void 0;
        if (c && c.isInstancedBufferGeometry && null === ka.get("ANGLE_instanced_arrays")) console.error("THREE.WebGLRenderer.setupVertexAttributes: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");else {
          void 0 === l && (l = 0);
          ba.initAttributes();
          var u = c.attributes;
          h = h.getAttributes();
          var t = d.defaultAttributeValues;

          for (K in h) {
            var r = h[K];

            if (0 <= r) {
              var q = u[K];

              if (void 0 !== q) {
                var p = q.normalized,
                    v = q.itemSize,
                    x = qa.get(q);

                if (void 0 !== x) {
                  var w = x.buffer,
                      B = x.type;
                  x = x.bytesPerElement;

                  if (q.isInterleavedBufferAttribute) {
                    var y = q.data,
                        G = y.stride;
                    q = q.offset;
                    y && y.isInstancedInterleavedBuffer ? (ba.enableAttributeAndDivisor(r, y.meshPerAttribute), void 0 === c.maxInstancedCount && (c.maxInstancedCount = y.meshPerAttribute * y.count)) : ba.enableAttribute(r);
                    D.bindBuffer(D.ARRAY_BUFFER, w);
                    D.vertexAttribPointer(r, v, B, p, G * x, (l * G + q) * x);
                  } else q.isInstancedBufferAttribute ? (ba.enableAttributeAndDivisor(r, q.meshPerAttribute), void 0 === c.maxInstancedCount && (c.maxInstancedCount = q.meshPerAttribute * q.count)) : ba.enableAttribute(r), D.bindBuffer(D.ARRAY_BUFFER, w), D.vertexAttribPointer(r, v, B, p, 0, l * v * x);
                }
              } else if (void 0 !== t && (p = t[K], void 0 !== p)) switch (p.length) {
                case 2:
                  D.vertexAttrib2fv(r, p);
                  break;

                case 3:
                  D.vertexAttrib3fv(r, p);
                  break;

                case 4:
                  D.vertexAttrib4fv(r, p);
                  break;

                default:
                  D.vertexAttrib1fv(r, p);
              }
            }
          }

          ba.disableUnusedAttributes();
        }
        null !== g && D.bindBuffer(D.ELEMENT_ARRAY_BUFFER, n.buffer);
      }

      n = Infinity;
      null !== g ? n = g.count : void 0 !== m && (n = m.count);
      g = c.drawRange.start * b;
      m = null !== f ? f.start * b : 0;
      var K = Math.max(g, m);
      f = Math.max(0, Math.min(n, g + c.drawRange.count * b, m + (null !== f ? f.count * b : Infinity)) - 1 - K + 1);

      if (0 !== f) {
        if (e.isMesh) {
          if (!0 === d.wireframe) ba.setLineWidth(d.wireframeLinewidth * (null === F ? R : 1)), a.setMode(D.LINES);else switch (e.drawMode) {
            case 0:
              a.setMode(D.TRIANGLES);
              break;

            case 1:
              a.setMode(D.TRIANGLE_STRIP);
              break;

            case 2:
              a.setMode(D.TRIANGLE_FAN);
          }
        } else e.isLine ? (d = d.linewidth, void 0 === d && (d = 1), ba.setLineWidth(d * (null === F ? R : 1)), e.isLineSegments ? a.setMode(D.LINES) : e.isLineLoop ? a.setMode(D.LINE_LOOP) : a.setMode(D.LINE_STRIP)) : e.isPoints && a.setMode(D.POINTS);
        c && c.isInstancedBufferGeometry ? 0 < c.maxInstancedCount && a.renderInstances(c, K, f) : a.render(K, f);
      }
    };

    this.compile = function (a, b) {
      Z = pa.get(a, b);
      Z.init();
      a.traverse(function (a) {
        a.isLight && (Z.pushLight(a), a.castShadow && Z.pushShadow(a));
      });
      Z.setupLights(b);
      a.traverse(function (b) {
        if (b.material) if ((0, _isArray.default)(b.material)) for (var c = 0; c < b.material.length; c++) {
          t(b.material[c], a.fog, b);
        } else t(b.material, a.fog, b);
      });
    };

    var va = !1,
        Ba = null;

    this.animate = function (a) {
      Ba = a;
      null !== Ba ? va || (h(), va = !0) : va = !1;
    };

    this.render = function (a, b, c, d) {
      if (!b || !b.isCamera) console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");else if (!E) {
        N = "";
        Q = -1;
        O = null;
        !0 === a.autoUpdate && a.updateMatrixWorld();
        null === b.parent && b.updateMatrixWorld();
        na.enabled && (b = na.getCamera(b));
        Z = pa.get(a, b);
        Z.init();
        a.onBeforeRender(A, a, b, c);
        pd.multiplyMatrices(b.projectionMatrix, b.matrixWorldInverse);
        ha.setFromMatrix(pd);
        la = this.localClippingEnabled;
        od = Ga.init(this.clippingPlanes, la, b);
        z = ua.get(a, b);
        z.init();
        m(a, b, A.sortObjects);
        !0 === A.sortObjects && z.sort();
        od && Ga.beginShadows();
        Ca.render(Z.state.shadowsArray, a, b);
        Z.setupLights(b);
        od && Ga.endShadows();
        this.info.autoReset && this.info.reset();
        void 0 === c && (c = null);
        this.setRenderTarget(c);
        ma.render(z, a, b, d);
        d = z.opaque;
        var e = z.transparent;

        if (a.overrideMaterial) {
          var f = a.overrideMaterial;
          d.length && u(d, a, b, f);
          e.length && u(e, a, b, f);
        } else d.length && u(d, a, b), e.length && u(e, a, b);

        Aa.render(Z.state.spritesArray, a, b);
        c && fa.updateRenderTargetMipmap(c);
        ba.buffers.depth.setTest(!0);
        ba.buffers.depth.setMask(!0);
        ba.buffers.color.setMask(!0);
        ba.setPolygonOffset(!1);
        a.onAfterRender(A, a, b);
        na.enabled && na.submitFrame();
        Z = z = null;
      }
    };

    this.allocTextureUnit = function () {
      var a = aa;
      a >= Ra.maxTextures && console.warn("THREE.WebGLRenderer: Trying to use " + a + " texture units while this GPU supports only " + Ra.maxTextures);
      aa += 1;
      return a;
    };

    this.setTexture2D = function () {
      var a = !1;
      return function (b, c) {
        b && b.isWebGLRenderTarget && (a || (console.warn("THREE.WebGLRenderer.setTexture2D: don't use render targets as textures. Use their .texture property instead."), a = !0), b = b.texture);
        fa.setTexture2D(b, c);
      };
    }();

    this.setTexture = function () {
      var a = !1;
      return function (b, c) {
        a || (console.warn("THREE.WebGLRenderer: .setTexture is deprecated, use setTexture2D instead."), a = !0);
        fa.setTexture2D(b, c);
      };
    }();

    this.setTextureCube = function () {
      var a = !1;
      return function (b, c) {
        b && b.isWebGLRenderTargetCube && (a || (console.warn("THREE.WebGLRenderer.setTextureCube: don't use cube render targets as textures. Use their .texture property instead."), a = !0), b = b.texture);
        b && b.isCubeTexture || (0, _isArray.default)(b.image) && 6 === b.image.length ? fa.setTextureCube(b, c) : fa.setTextureCubeDynamic(b, c);
      };
    }();

    this.getRenderTarget = function () {
      return F;
    };

    this.setRenderTarget = function (a) {
      (F = a) && void 0 === X.get(a).__webglFramebuffer && fa.setupRenderTarget(a);
      var b = null,
          c = !1;
      a ? (b = X.get(a).__webglFramebuffer, a.isWebGLRenderTargetCube && (b = b[a.activeCubeFace], c = !0), ob.copy(a.viewport), V.copy(a.scissor), U = a.scissorTest) : (ob.copy(Y).multiplyScalar(R), V.copy(ca).multiplyScalar(R), U = ja);
      I !== b && (D.bindFramebuffer(D.FRAMEBUFFER, b), I = b);
      ba.viewport(ob);
      ba.scissor(V);
      ba.setScissorTest(U);
      c && (c = X.get(a.texture), D.framebufferTexture2D(D.FRAMEBUFFER, D.COLOR_ATTACHMENT0, D.TEXTURE_CUBE_MAP_POSITIVE_X + a.activeCubeFace, c.__webglTexture, a.activeMipMapLevel));
    };

    this.readRenderTargetPixels = function (a, b, c, d, e, f) {
      if (a && a.isWebGLRenderTarget) {
        var g = X.get(a).__webglFramebuffer;

        if (g) {
          var h = !1;
          g !== I && (D.bindFramebuffer(D.FRAMEBUFFER, g), h = !0);

          try {
            var l = a.texture,
                m = l.format,
                n = l.type;
            1023 !== m && ia.convert(m) !== D.getParameter(D.IMPLEMENTATION_COLOR_READ_FORMAT) ? console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.") : 1009 === n || ia.convert(n) === D.getParameter(D.IMPLEMENTATION_COLOR_READ_TYPE) || 1015 === n && (ka.get("OES_texture_float") || ka.get("WEBGL_color_buffer_float")) || 1016 === n && ka.get("EXT_color_buffer_half_float") ? D.checkFramebufferStatus(D.FRAMEBUFFER) === D.FRAMEBUFFER_COMPLETE ? 0 <= b && b <= a.width - d && 0 <= c && c <= a.height - e && D.readPixels(b, c, d, e, ia.convert(m), ia.convert(n), f) : console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.") : console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
          } finally {
            h && D.bindFramebuffer(D.FRAMEBUFFER, I);
          }
        }
      } else console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
    };

    this.copyFramebufferToTexture = function (a, b, c) {
      var d = b.image.width,
          e = b.image.height,
          f = ia.convert(b.format);
      this.setTexture2D(b, 0);
      D.copyTexImage2D(D.TEXTURE_2D, c || 0, f, a.x, a.y, d, e, 0);
    };

    this.copyTextureToTexture = function (a, b, c, d) {
      var e = b.image.width,
          f = b.image.height,
          g = ia.convert(c.format),
          h = ia.convert(c.type);
      b = b.isDataTexture ? b.image.data : b.image;
      this.setTexture2D(c, 0);
      D.texSubImage2D(D.TEXTURE_2D, d || 0, a.x, a.y, e, f, g, h, b);
    };
  }

  function Ob(a, b) {
    this.name = "";
    this.color = new I(a);
    this.density = void 0 !== b ? b : 2.5E-4;
  }

  function Pb(a, b, c) {
    this.name = "";
    this.color = new I(a);
    this.near = void 0 !== b ? b : 1;
    this.far = void 0 !== c ? c : 1E3;
  }

  function rd() {
    A.call(this);
    this.type = "Scene";
    this.overrideMaterial = this.fog = this.background = null;
    this.autoUpdate = !0;
  }

  function eb(a) {
    O.call(this);
    this.type = "SpriteMaterial";
    this.color = new I(16777215);
    this.map = null;
    this.rotation = 0;
    this.lights = this.fog = !1;
    this.setValues(a);
  }

  function Ac(a) {
    A.call(this);
    this.type = "Sprite";
    this.material = void 0 !== a ? a : new eb();
    this.center = new C(.5, .5);
  }

  function Bc() {
    A.call(this);
    this.type = "LOD";
    (0, _defineProperties.default)(this, {
      levels: {
        enumerable: !0,
        value: []
      }
    });
  }

  function Cc(a, b) {
    a = a || [];
    this.bones = a.slice(0);
    this.boneMatrices = new Float32Array(16 * this.bones.length);
    if (void 0 === b) this.calculateInverses();else if (this.bones.length === b.length) this.boneInverses = b.slice(0);else for (console.warn("THREE.Skeleton boneInverses is the wrong length."), this.boneInverses = [], a = 0, b = this.bones.length; a < b; a++) {
      this.boneInverses.push(new M());
    }
  }

  function sd() {
    A.call(this);
    this.type = "Bone";
  }

  function td(a, b) {
    oa.call(this, a, b);
    this.type = "SkinnedMesh";
    this.bindMode = "attached";
    this.bindMatrix = new M();
    this.bindMatrixInverse = new M();
    a = this.initBones();
    a = new Cc(a);
    this.bind(a, this.matrixWorld);
    this.normalizeSkinWeights();
  }

  function U(a) {
    O.call(this);
    this.type = "LineBasicMaterial";
    this.color = new I(16777215);
    this.linewidth = 1;
    this.linejoin = this.linecap = "round";
    this.lights = !1;
    this.setValues(a);
  }

  function ua(a, b, c) {
    if (1 === c) return console.warn("THREE.Line: parameter THREE.LinePieces no longer supported. Created THREE.LineSegments instead."), new aa(a, b);
    A.call(this);
    this.type = "Line";
    this.geometry = void 0 !== a ? a : new F();
    this.material = void 0 !== b ? b : new U({
      color: 16777215 * Math.random()
    });
  }

  function aa(a, b) {
    ua.call(this, a, b);
    this.type = "LineSegments";
  }

  function ud(a, b) {
    ua.call(this, a, b);
    this.type = "LineLoop";
  }

  function Ha(a) {
    O.call(this);
    this.type = "PointsMaterial";
    this.color = new I(16777215);
    this.map = null;
    this.size = 1;
    this.sizeAttenuation = !0;
    this.lights = !1;
    this.setValues(a);
  }

  function Qb(a, b) {
    A.call(this);
    this.type = "Points";
    this.geometry = void 0 !== a ? a : new F();
    this.material = void 0 !== b ? b : new Ha({
      color: 16777215 * Math.random()
    });
  }

  function vd() {
    A.call(this);
    this.type = "Group";
  }

  function Yd(a, b, c, d, e, f, g, h, l) {
    Y.call(this, a, b, c, d, e, f, g, h, l);
    this.generateMipmaps = !1;
  }

  function Rb(a, b, c, d, e, f, g, h, l, m, u, n) {
    Y.call(this, null, f, g, h, l, m, d, e, u, n);
    this.image = {
      width: b,
      height: c
    };
    this.mipmaps = a;
    this.generateMipmaps = this.flipY = !1;
  }

  function Dc(a, b, c, d, e, f, g, h, l, m) {
    m = void 0 !== m ? m : 1026;
    if (1026 !== m && 1027 !== m) throw Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    void 0 === c && 1026 === m && (c = 1012);
    void 0 === c && 1027 === m && (c = 1020);
    Y.call(this, null, d, e, f, g, h, m, c, l);
    this.image = {
      width: a,
      height: b
    };
    this.magFilter = void 0 !== g ? g : 1003;
    this.minFilter = void 0 !== h ? h : 1003;
    this.generateMipmaps = this.flipY = !1;
  }

  function Sb(a) {
    F.call(this);
    this.type = "WireframeGeometry";
    var b = [],
        c,
        d,
        e,
        f = [0, 0],
        g = {},
        h = ["a", "b", "c"];

    if (a && a.isGeometry) {
      var l = a.faces;
      var m = 0;

      for (d = l.length; m < d; m++) {
        var u = l[m];

        for (c = 0; 3 > c; c++) {
          var n = u[h[c]];
          var t = u[h[(c + 1) % 3]];
          f[0] = Math.min(n, t);
          f[1] = Math.max(n, t);
          n = f[0] + "," + f[1];
          void 0 === g[n] && (g[n] = {
            index1: f[0],
            index2: f[1]
          });
        }
      }

      for (n in g) {
        m = g[n], h = a.vertices[m.index1], b.push(h.x, h.y, h.z), h = a.vertices[m.index2], b.push(h.x, h.y, h.z);
      }
    } else if (a && a.isBufferGeometry) if (h = new p(), null !== a.index) {
      l = a.attributes.position;
      u = a.index;
      var k = a.groups;
      0 === k.length && (k = [{
        start: 0,
        count: u.count,
        materialIndex: 0
      }]);
      a = 0;

      for (e = k.length; a < e; ++a) {
        for (m = k[a], c = m.start, d = m.count, m = c, d = c + d; m < d; m += 3) {
          for (c = 0; 3 > c; c++) {
            n = u.getX(m + c), t = u.getX(m + (c + 1) % 3), f[0] = Math.min(n, t), f[1] = Math.max(n, t), n = f[0] + "," + f[1], void 0 === g[n] && (g[n] = {
              index1: f[0],
              index2: f[1]
            });
          }
        }
      }

      for (n in g) {
        m = g[n], h.fromBufferAttribute(l, m.index1), b.push(h.x, h.y, h.z), h.fromBufferAttribute(l, m.index2), b.push(h.x, h.y, h.z);
      }
    } else for (l = a.attributes.position, m = 0, d = l.count / 3; m < d; m++) {
      for (c = 0; 3 > c; c++) {
        g = 3 * m + c, h.fromBufferAttribute(l, g), b.push(h.x, h.y, h.z), g = 3 * m + (c + 1) % 3, h.fromBufferAttribute(l, g), b.push(h.x, h.y, h.z);
      }
    }

    this.addAttribute("position", new z(b, 3));
  }

  function Ec(a, b, c) {
    N.call(this);
    this.type = "ParametricGeometry";
    this.parameters = {
      func: a,
      slices: b,
      stacks: c
    };
    this.fromBufferGeometry(new Tb(a, b, c));
    this.mergeVertices();
  }

  function Tb(a, b, c) {
    F.call(this);
    this.type = "ParametricBufferGeometry";
    this.parameters = {
      func: a,
      slices: b,
      stacks: c
    };
    var d = [],
        e = [],
        f = [],
        g = [],
        h = new p(),
        l = new p(),
        m = new p(),
        u = new p(),
        n = new p(),
        t,
        k,
        q = b + 1;

    for (t = 0; t <= c; t++) {
      var v = t / c;

      for (k = 0; k <= b; k++) {
        var x = k / b;
        a(x, v, l);
        e.push(l.x, l.y, l.z);
        0 <= x - 1E-5 ? (a(x - 1E-5, v, m), u.subVectors(l, m)) : (a(x + 1E-5, v, m), u.subVectors(m, l));
        0 <= v - 1E-5 ? (a(x, v - 1E-5, m), n.subVectors(l, m)) : (a(x, v + 1E-5, m), n.subVectors(m, l));
        h.crossVectors(u, n).normalize();
        f.push(h.x, h.y, h.z);
        g.push(x, v);
      }
    }

    for (t = 0; t < c; t++) {
      for (k = 0; k < b; k++) {
        a = t * q + k + 1, h = (t + 1) * q + k + 1, l = (t + 1) * q + k, d.push(t * q + k, a, l), d.push(a, h, l);
      }
    }

    this.setIndex(d);
    this.addAttribute("position", new z(e, 3));
    this.addAttribute("normal", new z(f, 3));
    this.addAttribute("uv", new z(g, 2));
  }

  function Fc(a, b, c, d) {
    N.call(this);
    this.type = "PolyhedronGeometry";
    this.parameters = {
      vertices: a,
      indices: b,
      radius: c,
      detail: d
    };
    this.fromBufferGeometry(new pa(a, b, c, d));
    this.mergeVertices();
  }

  function pa(a, b, c, d) {
    function e(a) {
      h.push(a.x, a.y, a.z);
    }

    function f(b, c) {
      b *= 3;
      c.x = a[b + 0];
      c.y = a[b + 1];
      c.z = a[b + 2];
    }

    function g(a, b, c, d) {
      0 > d && 1 === a.x && (l[b] = a.x - 1);
      0 === c.x && 0 === c.z && (l[b] = d / 2 / Math.PI + .5);
    }

    F.call(this);
    this.type = "PolyhedronBufferGeometry";
    this.parameters = {
      vertices: a,
      indices: b,
      radius: c,
      detail: d
    };
    c = c || 1;
    d = d || 0;
    var h = [],
        l = [];

    (function (a) {
      for (var c = new p(), d = new p(), g = new p(), h = 0; h < b.length; h += 3) {
        f(b[h + 0], c);
        f(b[h + 1], d);
        f(b[h + 2], g);
        var l,
            m,
            k = c,
            y = d,
            w = g,
            B = Math.pow(2, a),
            G = [];

        for (m = 0; m <= B; m++) {
          G[m] = [];
          var K = k.clone().lerp(w, m / B),
              P = y.clone().lerp(w, m / B),
              H = B - m;

          for (l = 0; l <= H; l++) {
            G[m][l] = 0 === l && m === B ? K : K.clone().lerp(P, l / H);
          }
        }

        for (m = 0; m < B; m++) {
          for (l = 0; l < 2 * (B - m) - 1; l++) {
            k = Math.floor(l / 2), 0 === l % 2 ? (e(G[m][k + 1]), e(G[m + 1][k]), e(G[m][k])) : (e(G[m][k + 1]), e(G[m + 1][k + 1]), e(G[m + 1][k]));
          }
        }
      }
    })(d);

    (function (a) {
      for (var b = new p(), c = 0; c < h.length; c += 3) {
        b.x = h[c + 0], b.y = h[c + 1], b.z = h[c + 2], b.normalize().multiplyScalar(a), h[c + 0] = b.x, h[c + 1] = b.y, h[c + 2] = b.z;
      }
    })(c);

    (function () {
      for (var a = new p(), b = 0; b < h.length; b += 3) {
        a.x = h[b + 0], a.y = h[b + 1], a.z = h[b + 2], l.push(Math.atan2(a.z, -a.x) / 2 / Math.PI + .5, 1 - (Math.atan2(-a.y, Math.sqrt(a.x * a.x + a.z * a.z)) / Math.PI + .5));
      }

      a = new p();
      b = new p();

      for (var c = new p(), d = new p(), e = new C(), f = new C(), k = new C(), x = 0, y = 0; x < h.length; x += 9, y += 6) {
        a.set(h[x + 0], h[x + 1], h[x + 2]);
        b.set(h[x + 3], h[x + 4], h[x + 5]);
        c.set(h[x + 6], h[x + 7], h[x + 8]);
        e.set(l[y + 0], l[y + 1]);
        f.set(l[y + 2], l[y + 3]);
        k.set(l[y + 4], l[y + 5]);
        d.copy(a).add(b).add(c).divideScalar(3);
        var w = Math.atan2(d.z, -d.x);
        g(e, y + 0, a, w);
        g(f, y + 2, b, w);
        g(k, y + 4, c, w);
      }

      for (a = 0; a < l.length; a += 6) {
        b = l[a + 0], c = l[a + 2], d = l[a + 4], e = Math.min(b, c, d), .9 < Math.max(b, c, d) && .1 > e && (.2 > b && (l[a + 0] += 1), .2 > c && (l[a + 2] += 1), .2 > d && (l[a + 4] += 1));
      }
    })();

    this.addAttribute("position", new z(h, 3));
    this.addAttribute("normal", new z(h.slice(), 3));
    this.addAttribute("uv", new z(l, 2));
    0 === d ? this.computeVertexNormals() : this.normalizeNormals();
  }

  function Gc(a, b) {
    N.call(this);
    this.type = "TetrahedronGeometry";
    this.parameters = {
      radius: a,
      detail: b
    };
    this.fromBufferGeometry(new Ub(a, b));
    this.mergeVertices();
  }

  function Ub(a, b) {
    pa.call(this, [1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1], [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1], a, b);
    this.type = "TetrahedronBufferGeometry";
    this.parameters = {
      radius: a,
      detail: b
    };
  }

  function Hc(a, b) {
    N.call(this);
    this.type = "OctahedronGeometry";
    this.parameters = {
      radius: a,
      detail: b
    };
    this.fromBufferGeometry(new sb(a, b));
    this.mergeVertices();
  }

  function sb(a, b) {
    pa.call(this, [1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1], [0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2], a, b);
    this.type = "OctahedronBufferGeometry";
    this.parameters = {
      radius: a,
      detail: b
    };
  }

  function Ic(a, b) {
    N.call(this);
    this.type = "IcosahedronGeometry";
    this.parameters = {
      radius: a,
      detail: b
    };
    this.fromBufferGeometry(new Vb(a, b));
    this.mergeVertices();
  }

  function Vb(a, b) {
    var c = (1 + Math.sqrt(5)) / 2;
    pa.call(this, [-1, c, 0, 1, c, 0, -1, -c, 0, 1, -c, 0, 0, -1, c, 0, 1, c, 0, -1, -c, 0, 1, -c, c, 0, -1, c, 0, 1, -c, 0, -1, -c, 0, 1], [0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1], a, b);
    this.type = "IcosahedronBufferGeometry";
    this.parameters = {
      radius: a,
      detail: b
    };
  }

  function Jc(a, b) {
    N.call(this);
    this.type = "DodecahedronGeometry";
    this.parameters = {
      radius: a,
      detail: b
    };
    this.fromBufferGeometry(new Wb(a, b));
    this.mergeVertices();
  }

  function Wb(a, b) {
    var c = (1 + Math.sqrt(5)) / 2,
        d = 1 / c;
    pa.call(this, [-1, -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, 1, 0, -d, -c, 0, -d, c, 0, d, -c, 0, d, c, -d, -c, 0, -d, c, 0, d, -c, 0, d, c, 0, -c, 0, -d, c, 0, -d, -c, 0, d, c, 0, d], [3, 11, 7, 3, 7, 15, 3, 15, 13, 7, 19, 17, 7, 17, 6, 7, 6, 15, 17, 4, 8, 17, 8, 10, 17, 10, 6, 8, 0, 16, 8, 16, 2, 8, 2, 10, 0, 12, 1, 0, 1, 18, 0, 18, 16, 6, 10, 2, 6, 2, 13, 6, 13, 15, 2, 16, 18, 2, 18, 3, 2, 3, 13, 18, 1, 9, 18, 9, 11, 18, 11, 3, 4, 14, 12, 4, 12, 0, 4, 0, 8, 11, 9, 5, 11, 5, 19, 11, 19, 7, 19, 5, 14, 19, 14, 4, 19, 4, 17, 1, 12, 14, 1, 14, 5, 1, 5, 9], a, b);
    this.type = "DodecahedronBufferGeometry";
    this.parameters = {
      radius: a,
      detail: b
    };
  }

  function Kc(a, b, c, d, e, f) {
    N.call(this);
    this.type = "TubeGeometry";
    this.parameters = {
      path: a,
      tubularSegments: b,
      radius: c,
      radialSegments: d,
      closed: e
    };
    void 0 !== f && console.warn("THREE.TubeGeometry: taper has been removed.");
    a = new Xb(a, b, c, d, e);
    this.tangents = a.tangents;
    this.normals = a.normals;
    this.binormals = a.binormals;
    this.fromBufferGeometry(a);
    this.mergeVertices();
  }

  function Xb(a, b, c, d, e) {
    function f(e) {
      u = a.getPointAt(e / b, u);
      var f = g.normals[e];
      e = g.binormals[e];

      for (k = 0; k <= d; k++) {
        var m = k / d * Math.PI * 2,
            n = Math.sin(m);
        m = -Math.cos(m);
        l.x = m * f.x + n * e.x;
        l.y = m * f.y + n * e.y;
        l.z = m * f.z + n * e.z;
        l.normalize();
        q.push(l.x, l.y, l.z);
        h.x = u.x + c * l.x;
        h.y = u.y + c * l.y;
        h.z = u.z + c * l.z;
        r.push(h.x, h.y, h.z);
      }
    }

    F.call(this);
    this.type = "TubeBufferGeometry";
    this.parameters = {
      path: a,
      tubularSegments: b,
      radius: c,
      radialSegments: d,
      closed: e
    };
    b = b || 64;
    c = c || 1;
    d = d || 8;
    e = e || !1;
    var g = a.computeFrenetFrames(b, e);
    this.tangents = g.tangents;
    this.normals = g.normals;
    this.binormals = g.binormals;
    var h = new p(),
        l = new p(),
        m = new C(),
        u = new p(),
        n,
        k,
        r = [],
        q = [],
        v = [],
        x = [];

    for (n = 0; n < b; n++) {
      f(n);
    }

    f(!1 === e ? b : 0);

    for (n = 0; n <= b; n++) {
      for (k = 0; k <= d; k++) {
        m.x = n / b, m.y = k / d, v.push(m.x, m.y);
      }
    }

    (function () {
      for (k = 1; k <= b; k++) {
        for (n = 1; n <= d; n++) {
          var a = (d + 1) * k + (n - 1),
              c = (d + 1) * k + n,
              e = (d + 1) * (k - 1) + n;
          x.push((d + 1) * (k - 1) + (n - 1), a, e);
          x.push(a, c, e);
        }
      }
    })();

    this.setIndex(x);
    this.addAttribute("position", new z(r, 3));
    this.addAttribute("normal", new z(q, 3));
    this.addAttribute("uv", new z(v, 2));
  }

  function Lc(a, b, c, d, e, f, g) {
    N.call(this);
    this.type = "TorusKnotGeometry";
    this.parameters = {
      radius: a,
      tube: b,
      tubularSegments: c,
      radialSegments: d,
      p: e,
      q: f
    };
    void 0 !== g && console.warn("THREE.TorusKnotGeometry: heightScale has been deprecated. Use .scale( x, y, z ) instead.");
    this.fromBufferGeometry(new Yb(a, b, c, d, e, f));
    this.mergeVertices();
  }

  function Yb(a, b, c, d, e, f) {
    function g(a, b, c, d, e) {
      var f = Math.sin(a);
      b = c / b * a;
      c = Math.cos(b);
      e.x = d * (2 + c) * .5 * Math.cos(a);
      e.y = d * (2 + c) * f * .5;
      e.z = d * Math.sin(b) * .5;
    }

    F.call(this);
    this.type = "TorusKnotBufferGeometry";
    this.parameters = {
      radius: a,
      tube: b,
      tubularSegments: c,
      radialSegments: d,
      p: e,
      q: f
    };
    a = a || 1;
    b = b || .4;
    c = Math.floor(c) || 64;
    d = Math.floor(d) || 8;
    e = e || 2;
    f = f || 3;
    var h = [],
        l = [],
        m = [],
        u = [],
        n,
        k = new p(),
        r = new p(),
        q = new p(),
        v = new p(),
        x = new p(),
        y = new p(),
        w = new p();

    for (n = 0; n <= c; ++n) {
      var B = n / c * e * Math.PI * 2;
      g(B, e, f, a, q);
      g(B + .01, e, f, a, v);
      y.subVectors(v, q);
      w.addVectors(v, q);
      x.crossVectors(y, w);
      w.crossVectors(x, y);
      x.normalize();
      w.normalize();

      for (B = 0; B <= d; ++B) {
        var G = B / d * Math.PI * 2,
            K = -b * Math.cos(G);
        G = b * Math.sin(G);
        k.x = q.x + (K * w.x + G * x.x);
        k.y = q.y + (K * w.y + G * x.y);
        k.z = q.z + (K * w.z + G * x.z);
        l.push(k.x, k.y, k.z);
        r.subVectors(k, q).normalize();
        m.push(r.x, r.y, r.z);
        u.push(n / c);
        u.push(B / d);
      }
    }

    for (B = 1; B <= c; B++) {
      for (n = 1; n <= d; n++) {
        a = (d + 1) * B + (n - 1), b = (d + 1) * B + n, e = (d + 1) * (B - 1) + n, h.push((d + 1) * (B - 1) + (n - 1), a, e), h.push(a, b, e);
      }
    }

    this.setIndex(h);
    this.addAttribute("position", new z(l, 3));
    this.addAttribute("normal", new z(m, 3));
    this.addAttribute("uv", new z(u, 2));
  }

  function Mc(a, b, c, d, e) {
    N.call(this);
    this.type = "TorusGeometry";
    this.parameters = {
      radius: a,
      tube: b,
      radialSegments: c,
      tubularSegments: d,
      arc: e
    };
    this.fromBufferGeometry(new Zb(a, b, c, d, e));
    this.mergeVertices();
  }

  function Zb(a, b, c, d, e) {
    F.call(this);
    this.type = "TorusBufferGeometry";
    this.parameters = {
      radius: a,
      tube: b,
      radialSegments: c,
      tubularSegments: d,
      arc: e
    };
    a = a || 1;
    b = b || .4;
    c = Math.floor(c) || 8;
    d = Math.floor(d) || 6;
    e = e || 2 * Math.PI;
    var f = [],
        g = [],
        h = [],
        l = [],
        m = new p(),
        u = new p(),
        n = new p(),
        k,
        r;

    for (k = 0; k <= c; k++) {
      for (r = 0; r <= d; r++) {
        var q = r / d * e,
            v = k / c * Math.PI * 2;
        u.x = (a + b * Math.cos(v)) * Math.cos(q);
        u.y = (a + b * Math.cos(v)) * Math.sin(q);
        u.z = b * Math.sin(v);
        g.push(u.x, u.y, u.z);
        m.x = a * Math.cos(q);
        m.y = a * Math.sin(q);
        n.subVectors(u, m).normalize();
        h.push(n.x, n.y, n.z);
        l.push(r / d);
        l.push(k / c);
      }
    }

    for (k = 1; k <= c; k++) {
      for (r = 1; r <= d; r++) {
        a = (d + 1) * (k - 1) + r - 1, b = (d + 1) * (k - 1) + r, e = (d + 1) * k + r, f.push((d + 1) * k + r - 1, a, e), f.push(a, b, e);
      }
    }

    this.setIndex(f);
    this.addAttribute("position", new z(g, 3));
    this.addAttribute("normal", new z(h, 3));
    this.addAttribute("uv", new z(l, 2));
  }

  function Xe(a, b, c, d, e) {
    for (var f, g = 0, h = b, l = c - d; h < c; h += d) {
      g += (a[l] - a[h]) * (a[h + 1] + a[l + 1]), l = h;
    }

    if (e === 0 < g) for (e = b; e < c; e += d) {
      f = Ye(e, a[e], a[e + 1], f);
    } else for (e = c - d; e >= b; e -= d) {
      f = Ye(e, a[e], a[e + 1], f);
    }
    f && tb(f, f.next) && (Nc(f), f = f.next);
    return f;
  }

  function Oc(a, b) {
    if (!a) return a;
    b || (b = a);

    do {
      var c = !1;
      if (a.steiner || !tb(a, a.next) && 0 !== ra(a.prev, a, a.next)) a = a.next;else {
        Nc(a);
        a = b = a.prev;
        if (a === a.next) break;
        c = !0;
      }
    } while (c || a !== b);

    return b;
  }

  function Pc(a, b, c, d, e, f, g) {
    if (a) {
      if (!g && f) {
        var h = a,
            l = h;

        do {
          null === l.z && (l.z = Zd(l.x, l.y, d, e, f)), l.prevZ = l.prev, l = l.nextZ = l.next;
        } while (l !== h);

        l.prevZ.nextZ = null;
        l.prevZ = null;
        h = l;
        var m,
            u,
            n,
            k,
            r = 1;

        do {
          l = h;
          var q = h = null;

          for (u = 0; l;) {
            u++;
            var p = l;

            for (m = n = 0; m < r && (n++, p = p.nextZ, p); m++) {
              ;
            }

            for (k = r; 0 < n || 0 < k && p;) {
              0 !== n && (0 === k || !p || l.z <= p.z) ? (m = l, l = l.nextZ, n--) : (m = p, p = p.nextZ, k--), q ? q.nextZ = m : h = m, m.prevZ = q, q = m;
            }

            l = p;
          }

          q.nextZ = null;
          r *= 2;
        } while (1 < u);
      }

      for (h = a; a.prev !== a.next;) {
        l = a.prev;
        p = a.next;
        if (f) a: {
          q = a;
          k = d;
          var x = e,
              y = f;
          u = q.prev;
          n = q;
          r = q.next;
          if (0 <= ra(u, n, r)) q = !1;else {
            var w = u.x > n.x ? u.x > r.x ? u.x : r.x : n.x > r.x ? n.x : r.x,
                B = u.y > n.y ? u.y > r.y ? u.y : r.y : n.y > r.y ? n.y : r.y;
            m = Zd(u.x < n.x ? u.x < r.x ? u.x : r.x : n.x < r.x ? n.x : r.x, u.y < n.y ? u.y < r.y ? u.y : r.y : n.y < r.y ? n.y : r.y, k, x, y);
            k = Zd(w, B, k, x, y);

            for (x = q.nextZ; x && x.z <= k;) {
              if (x !== q.prev && x !== q.next && wd(u.x, u.y, n.x, n.y, r.x, r.y, x.x, x.y) && 0 <= ra(x.prev, x, x.next)) {
                q = !1;
                break a;
              }

              x = x.nextZ;
            }

            for (x = q.prevZ; x && x.z >= m;) {
              if (x !== q.prev && x !== q.next && wd(u.x, u.y, n.x, n.y, r.x, r.y, x.x, x.y) && 0 <= ra(x.prev, x, x.next)) {
                q = !1;
                break a;
              }

              x = x.prevZ;
            }

            q = !0;
          }
        } else a: if (q = a, u = q.prev, n = q, r = q.next, 0 <= ra(u, n, r)) q = !1;else {
          for (m = q.next.next; m !== q.prev;) {
            if (wd(u.x, u.y, n.x, n.y, r.x, r.y, m.x, m.y) && 0 <= ra(m.prev, m, m.next)) {
              q = !1;
              break a;
            }

            m = m.next;
          }

          q = !0;
        }
        if (q) b.push(l.i / c), b.push(a.i / c), b.push(p.i / c), Nc(a), h = a = p.next;else if (a = p, a === h) {
          if (!g) Pc(Oc(a), b, c, d, e, f, 1);else if (1 === g) {
            g = b;
            h = c;
            l = a;

            do {
              p = l.prev, q = l.next.next, !tb(p, q) && Ze(p, l, l.next, q) && Qc(p, q) && Qc(q, p) && (g.push(p.i / h), g.push(l.i / h), g.push(q.i / h), Nc(l), Nc(l.next), l = a = q), l = l.next;
            } while (l !== a);

            a = l;
            Pc(a, b, c, d, e, f, 2);
          } else if (2 === g) a: {
            g = a;

            do {
              for (h = g.next.next; h !== g.prev;) {
                if (l = g.i !== h.i) {
                  l = g;
                  p = h;

                  if (q = l.next.i !== p.i && l.prev.i !== p.i) {
                    b: {
                      q = l;

                      do {
                        if (q.i !== l.i && q.next.i !== l.i && q.i !== p.i && q.next.i !== p.i && Ze(q, q.next, l, p)) {
                          q = !0;
                          break b;
                        }

                        q = q.next;
                      } while (q !== l);

                      q = !1;
                    }

                    q = !q;
                  }

                  if (q = q && Qc(l, p) && Qc(p, l)) {
                    q = l;
                    u = !1;
                    n = (l.x + p.x) / 2;
                    p = (l.y + p.y) / 2;

                    do {
                      q.y > p !== q.next.y > p && q.next.y !== q.y && n < (q.next.x - q.x) * (p - q.y) / (q.next.y - q.y) + q.x && (u = !u), q = q.next;
                    } while (q !== l);

                    q = u;
                  }

                  l = q;
                }

                if (l) {
                  a = $e(g, h);
                  g = Oc(g, g.next);
                  a = Oc(a, a.next);
                  Pc(g, b, c, d, e, f);
                  Pc(a, b, c, d, e, f);
                  break a;
                }

                h = h.next;
              }

              g = g.next;
            } while (g !== a);
          }
          break;
        }
      }
    }
  }

  function Hg(a, b) {
    return a.x - b.x;
  }

  function Ig(a, b) {
    var c = b,
        d = a.x,
        e = a.y,
        f = -Infinity;

    do {
      if (e <= c.y && e >= c.next.y && c.next.y !== c.y) {
        var g = c.x + (e - c.y) * (c.next.x - c.x) / (c.next.y - c.y);

        if (g <= d && g > f) {
          f = g;

          if (g === d) {
            if (e === c.y) return c;
            if (e === c.next.y) return c.next;
          }

          var h = c.x < c.next.x ? c : c.next;
        }
      }

      c = c.next;
    } while (c !== b);

    if (!h) return null;
    if (d === f) return h.prev;
    b = h;
    g = h.x;
    var l = h.y,
        m = Infinity;

    for (c = h.next; c !== b;) {
      if (d >= c.x && c.x >= g && d !== c.x && wd(e < l ? d : f, e, g, l, e < l ? f : d, e, c.x, c.y)) {
        var u = Math.abs(e - c.y) / (d - c.x);
        (u < m || u === m && c.x > h.x) && Qc(c, a) && (h = c, m = u);
      }

      c = c.next;
    }

    return h;
  }

  function Zd(a, b, c, d, e) {
    a = 32767 * (a - c) * e;
    b = 32767 * (b - d) * e;
    a = (a | a << 8) & 16711935;
    a = (a | a << 4) & 252645135;
    a = (a | a << 2) & 858993459;
    b = (b | b << 8) & 16711935;
    b = (b | b << 4) & 252645135;
    b = (b | b << 2) & 858993459;
    return (a | a << 1) & 1431655765 | ((b | b << 1) & 1431655765) << 1;
  }

  function Jg(a) {
    var b = a,
        c = a;

    do {
      b.x < c.x && (c = b), b = b.next;
    } while (b !== a);

    return c;
  }

  function wd(a, b, c, d, e, f, g, h) {
    return 0 <= (e - g) * (b - h) - (a - g) * (f - h) && 0 <= (a - g) * (d - h) - (c - g) * (b - h) && 0 <= (c - g) * (f - h) - (e - g) * (d - h);
  }

  function ra(a, b, c) {
    return (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);
  }

  function tb(a, b) {
    return a.x === b.x && a.y === b.y;
  }

  function Ze(a, b, c, d) {
    return tb(a, b) && tb(c, d) || tb(a, d) && tb(c, b) ? !0 : 0 < ra(a, b, c) !== 0 < ra(a, b, d) && 0 < ra(c, d, a) !== 0 < ra(c, d, b);
  }

  function Qc(a, b) {
    return 0 > ra(a.prev, a, a.next) ? 0 <= ra(a, b, a.next) && 0 <= ra(a, a.prev, b) : 0 > ra(a, b, a.prev) || 0 > ra(a, a.next, b);
  }

  function $e(a, b) {
    var c = new $d(a.i, a.x, a.y),
        d = new $d(b.i, b.x, b.y),
        e = a.next,
        f = b.prev;
    a.next = b;
    b.prev = a;
    c.next = e;
    e.prev = c;
    d.next = c;
    c.prev = d;
    f.next = d;
    d.prev = f;
    return d;
  }

  function Ye(a, b, c, d) {
    a = new $d(a, b, c);
    d ? (a.next = d.next, a.prev = d, d.next.prev = a, d.next = a) : (a.prev = a, a.next = a);
    return a;
  }

  function Nc(a) {
    a.next.prev = a.prev;
    a.prev.next = a.next;
    a.prevZ && (a.prevZ.nextZ = a.nextZ);
    a.nextZ && (a.nextZ.prevZ = a.prevZ);
  }

  function $d(a, b, c) {
    this.i = a;
    this.x = b;
    this.y = c;
    this.nextZ = this.prevZ = this.z = this.next = this.prev = null;
    this.steiner = !1;
  }

  function af(a) {
    var b = a.length;
    2 < b && a[b - 1].equals(a[0]) && a.pop();
  }

  function bf(a, b) {
    for (var c = 0; c < b.length; c++) {
      a.push(b[c].x), a.push(b[c].y);
    }
  }

  function fb(a, b) {
    N.call(this);
    this.type = "ExtrudeGeometry";
    this.parameters = {
      shapes: a,
      options: b
    };
    this.fromBufferGeometry(new Ia(a, b));
    this.mergeVertices();
  }

  function Ia(a, b) {
    "undefined" !== typeof a && (F.call(this), this.type = "ExtrudeBufferGeometry", a = (0, _isArray.default)(a) ? a : [a], this.addShapeList(a, b), this.computeVertexNormals());
  }

  function Rc(a, b) {
    N.call(this);
    this.type = "TextGeometry";
    this.parameters = {
      text: a,
      parameters: b
    };
    this.fromBufferGeometry(new $b(a, b));
    this.mergeVertices();
  }

  function $b(a, b) {
    b = b || {};
    var c = b.font;
    if (!c || !c.isFont) return console.error("THREE.TextGeometry: font parameter is not an instance of THREE.Font."), new N();
    a = c.generateShapes(a, b.size, b.curveSegments);
    b.amount = void 0 !== b.height ? b.height : 50;
    void 0 === b.bevelThickness && (b.bevelThickness = 10);
    void 0 === b.bevelSize && (b.bevelSize = 8);
    void 0 === b.bevelEnabled && (b.bevelEnabled = !1);
    Ia.call(this, a, b);
    this.type = "TextBufferGeometry";
  }

  function Sc(a, b, c, d, e, f, g) {
    N.call(this);
    this.type = "SphereGeometry";
    this.parameters = {
      radius: a,
      widthSegments: b,
      heightSegments: c,
      phiStart: d,
      phiLength: e,
      thetaStart: f,
      thetaLength: g
    };
    this.fromBufferGeometry(new ub(a, b, c, d, e, f, g));
    this.mergeVertices();
  }

  function ub(a, b, c, d, e, f, g) {
    F.call(this);
    this.type = "SphereBufferGeometry";
    this.parameters = {
      radius: a,
      widthSegments: b,
      heightSegments: c,
      phiStart: d,
      phiLength: e,
      thetaStart: f,
      thetaLength: g
    };
    a = a || 1;
    b = Math.max(3, Math.floor(b) || 8);
    c = Math.max(2, Math.floor(c) || 6);
    d = void 0 !== d ? d : 0;
    e = void 0 !== e ? e : 2 * Math.PI;
    f = void 0 !== f ? f : 0;
    g = void 0 !== g ? g : Math.PI;
    var h = f + g,
        l,
        m,
        u = 0,
        n = [],
        k = new p(),
        r = new p(),
        q = [],
        v = [],
        x = [],
        y = [];

    for (m = 0; m <= c; m++) {
      var w = [],
          B = m / c;

      for (l = 0; l <= b; l++) {
        var G = l / b;
        k.x = -a * Math.cos(d + G * e) * Math.sin(f + B * g);
        k.y = a * Math.cos(f + B * g);
        k.z = a * Math.sin(d + G * e) * Math.sin(f + B * g);
        v.push(k.x, k.y, k.z);
        r.set(k.x, k.y, k.z).normalize();
        x.push(r.x, r.y, r.z);
        y.push(G, 1 - B);
        w.push(u++);
      }

      n.push(w);
    }

    for (m = 0; m < c; m++) {
      for (l = 0; l < b; l++) {
        a = n[m][l + 1], d = n[m][l], e = n[m + 1][l], g = n[m + 1][l + 1], (0 !== m || 0 < f) && q.push(a, d, g), (m !== c - 1 || h < Math.PI) && q.push(d, e, g);
      }
    }

    this.setIndex(q);
    this.addAttribute("position", new z(v, 3));
    this.addAttribute("normal", new z(x, 3));
    this.addAttribute("uv", new z(y, 2));
  }

  function Tc(a, b, c, d, e, f) {
    N.call(this);
    this.type = "RingGeometry";
    this.parameters = {
      innerRadius: a,
      outerRadius: b,
      thetaSegments: c,
      phiSegments: d,
      thetaStart: e,
      thetaLength: f
    };
    this.fromBufferGeometry(new ac(a, b, c, d, e, f));
    this.mergeVertices();
  }

  function ac(a, b, c, d, e, f) {
    F.call(this);
    this.type = "RingBufferGeometry";
    this.parameters = {
      innerRadius: a,
      outerRadius: b,
      thetaSegments: c,
      phiSegments: d,
      thetaStart: e,
      thetaLength: f
    };
    a = a || .5;
    b = b || 1;
    e = void 0 !== e ? e : 0;
    f = void 0 !== f ? f : 2 * Math.PI;
    c = void 0 !== c ? Math.max(3, c) : 8;
    d = void 0 !== d ? Math.max(1, d) : 1;
    var g = [],
        h = [],
        l = [],
        m = [],
        k = a,
        n = (b - a) / d,
        t = new p(),
        r = new C(),
        q,
        v;

    for (q = 0; q <= d; q++) {
      for (v = 0; v <= c; v++) {
        a = e + v / c * f, t.x = k * Math.cos(a), t.y = k * Math.sin(a), h.push(t.x, t.y, t.z), l.push(0, 0, 1), r.x = (t.x / b + 1) / 2, r.y = (t.y / b + 1) / 2, m.push(r.x, r.y);
      }

      k += n;
    }

    for (q = 0; q < d; q++) {
      for (b = q * (c + 1), v = 0; v < c; v++) {
        a = v + b, e = a + c + 1, f = a + c + 2, k = a + 1, g.push(a, e, k), g.push(e, f, k);
      }
    }

    this.setIndex(g);
    this.addAttribute("position", new z(h, 3));
    this.addAttribute("normal", new z(l, 3));
    this.addAttribute("uv", new z(m, 2));
  }

  function Uc(a, b, c, d) {
    N.call(this);
    this.type = "LatheGeometry";
    this.parameters = {
      points: a,
      segments: b,
      phiStart: c,
      phiLength: d
    };
    this.fromBufferGeometry(new bc(a, b, c, d));
    this.mergeVertices();
  }

  function bc(a, b, c, d) {
    F.call(this);
    this.type = "LatheBufferGeometry";
    this.parameters = {
      points: a,
      segments: b,
      phiStart: c,
      phiLength: d
    };
    b = Math.floor(b) || 12;
    c = c || 0;
    d = d || 2 * Math.PI;
    d = S.clamp(d, 0, 2 * Math.PI);
    var e = [],
        f = [],
        g = [],
        h = 1 / b,
        l = new p(),
        m = new C(),
        k;

    for (k = 0; k <= b; k++) {
      var n = c + k * h * d;
      var t = Math.sin(n),
          r = Math.cos(n);

      for (n = 0; n <= a.length - 1; n++) {
        l.x = a[n].x * t, l.y = a[n].y, l.z = a[n].x * r, f.push(l.x, l.y, l.z), m.x = k / b, m.y = n / (a.length - 1), g.push(m.x, m.y);
      }
    }

    for (k = 0; k < b; k++) {
      for (n = 0; n < a.length - 1; n++) {
        c = n + k * a.length, h = c + a.length, l = c + a.length + 1, m = c + 1, e.push(c, h, m), e.push(h, l, m);
      }
    }

    this.setIndex(e);
    this.addAttribute("position", new z(f, 3));
    this.addAttribute("uv", new z(g, 2));
    this.computeVertexNormals();
    if (d === 2 * Math.PI) for (d = this.attributes.normal.array, e = new p(), f = new p(), g = new p(), c = b * a.length * 3, n = k = 0; k < a.length; k++, n += 3) {
      e.x = d[n + 0], e.y = d[n + 1], e.z = d[n + 2], f.x = d[c + n + 0], f.y = d[c + n + 1], f.z = d[c + n + 2], g.addVectors(e, f).normalize(), d[n + 0] = d[c + n + 0] = g.x, d[n + 1] = d[c + n + 1] = g.y, d[n + 2] = d[c + n + 2] = g.z;
    }
  }

  function vb(a, b) {
    N.call(this);
    this.type = "ShapeGeometry";
    "object" === (0, _typeof2.default)(b) && (console.warn("THREE.ShapeGeometry: Options parameter has been removed."), b = b.curveSegments);
    this.parameters = {
      shapes: a,
      curveSegments: b
    };
    this.fromBufferGeometry(new wb(a, b));
    this.mergeVertices();
  }

  function wb(a, b) {
    function c(a) {
      var c,
          h = e.length / 3;
      a = a.extractPoints(b);
      var m = a.shape,
          k = a.holes;
      if (!1 === Xa.isClockWise(m)) for (m = m.reverse(), a = 0, c = k.length; a < c; a++) {
        var u = k[a];
        !0 === Xa.isClockWise(u) && (k[a] = u.reverse());
      }
      var p = Xa.triangulateShape(m, k);
      a = 0;

      for (c = k.length; a < c; a++) {
        u = k[a], m = m.concat(u);
      }

      a = 0;

      for (c = m.length; a < c; a++) {
        u = m[a], e.push(u.x, u.y, 0), f.push(0, 0, 1), g.push(u.x, u.y);
      }

      a = 0;

      for (c = p.length; a < c; a++) {
        m = p[a], d.push(m[0] + h, m[1] + h, m[2] + h), l += 3;
      }
    }

    F.call(this);
    this.type = "ShapeBufferGeometry";
    this.parameters = {
      shapes: a,
      curveSegments: b
    };
    b = b || 12;
    var d = [],
        e = [],
        f = [],
        g = [],
        h = 0,
        l = 0;
    if (!1 === (0, _isArray.default)(a)) c(a);else for (var m = 0; m < a.length; m++) {
      c(a[m]), this.addGroup(h, l, m), h += l, l = 0;
    }
    this.setIndex(d);
    this.addAttribute("position", new z(e, 3));
    this.addAttribute("normal", new z(f, 3));
    this.addAttribute("uv", new z(g, 2));
  }

  function cf(a, b) {
    b.shapes = [];
    if ((0, _isArray.default)(a)) for (var c = 0, d = a.length; c < d; c++) {
      b.shapes.push(a[c].uuid);
    } else b.shapes.push(a.uuid);
    return b;
  }

  function cc(a, b) {
    F.call(this);
    this.type = "EdgesGeometry";
    this.parameters = {
      thresholdAngle: b
    };
    var c = [];
    b = Math.cos(S.DEG2RAD * (void 0 !== b ? b : 1));
    var d = [0, 0],
        e = {},
        f = ["a", "b", "c"];

    if (a.isBufferGeometry) {
      var g = new N();
      g.fromBufferGeometry(a);
    } else g = a.clone();

    g.mergeVertices();
    g.computeFaceNormals();
    a = g.vertices;
    g = g.faces;

    for (var h = 0, l = g.length; h < l; h++) {
      for (var m = g[h], k = 0; 3 > k; k++) {
        var n = m[f[k]];
        var t = m[f[(k + 1) % 3]];
        d[0] = Math.min(n, t);
        d[1] = Math.max(n, t);
        n = d[0] + "," + d[1];
        void 0 === e[n] ? e[n] = {
          index1: d[0],
          index2: d[1],
          face1: h,
          face2: void 0
        } : e[n].face2 = h;
      }
    }

    for (n in e) {
      if (d = e[n], void 0 === d.face2 || g[d.face1].normal.dot(g[d.face2].normal) <= b) f = a[d.index1], c.push(f.x, f.y, f.z), f = a[d.index2], c.push(f.x, f.y, f.z);
    }

    this.addAttribute("position", new z(c, 3));
  }

  function xb(a, b, c, d, e, f, g, h) {
    N.call(this);
    this.type = "CylinderGeometry";
    this.parameters = {
      radiusTop: a,
      radiusBottom: b,
      height: c,
      radialSegments: d,
      heightSegments: e,
      openEnded: f,
      thetaStart: g,
      thetaLength: h
    };
    this.fromBufferGeometry(new Ya(a, b, c, d, e, f, g, h));
    this.mergeVertices();
  }

  function Ya(a, b, c, d, e, f, g, h) {
    function l(c) {
      var e,
          f = new C(),
          l = new p(),
          u = 0,
          v = !0 === c ? a : b,
          w = !0 === c ? 1 : -1;
      var A = q;

      for (e = 1; e <= d; e++) {
        n.push(0, x * w, 0), t.push(0, w, 0), r.push(.5, .5), q++;
      }

      var z = q;

      for (e = 0; e <= d; e++) {
        var E = e / d * h + g,
            F = Math.cos(E);
        E = Math.sin(E);
        l.x = v * E;
        l.y = x * w;
        l.z = v * F;
        n.push(l.x, l.y, l.z);
        t.push(0, w, 0);
        f.x = .5 * F + .5;
        f.y = .5 * E * w + .5;
        r.push(f.x, f.y);
        q++;
      }

      for (e = 0; e < d; e++) {
        f = A + e, l = z + e, !0 === c ? k.push(l, l + 1, f) : k.push(l + 1, l, f), u += 3;
      }

      m.addGroup(y, u, !0 === c ? 1 : 2);
      y += u;
    }

    F.call(this);
    this.type = "CylinderBufferGeometry";
    this.parameters = {
      radiusTop: a,
      radiusBottom: b,
      height: c,
      radialSegments: d,
      heightSegments: e,
      openEnded: f,
      thetaStart: g,
      thetaLength: h
    };
    var m = this;
    a = void 0 !== a ? a : 1;
    b = void 0 !== b ? b : 1;
    c = c || 1;
    d = Math.floor(d) || 8;
    e = Math.floor(e) || 1;
    f = void 0 !== f ? f : !1;
    g = void 0 !== g ? g : 0;
    h = void 0 !== h ? h : 2 * Math.PI;
    var k = [],
        n = [],
        t = [],
        r = [],
        q = 0,
        v = [],
        x = c / 2,
        y = 0;

    (function () {
      var f,
          l,
          u = new p(),
          K = new p(),
          P = 0,
          H = (b - a) / c;

      for (l = 0; l <= e; l++) {
        var C = [],
            A = l / e,
            z = A * (b - a) + a;

        for (f = 0; f <= d; f++) {
          var E = f / d,
              F = E * h + g,
              I = Math.sin(F);
          F = Math.cos(F);
          K.x = z * I;
          K.y = -A * c + x;
          K.z = z * F;
          n.push(K.x, K.y, K.z);
          u.set(I, H, F).normalize();
          t.push(u.x, u.y, u.z);
          r.push(E, 1 - A);
          C.push(q++);
        }

        v.push(C);
      }

      for (f = 0; f < d; f++) {
        for (l = 0; l < e; l++) {
          u = v[l + 1][f], K = v[l + 1][f + 1], H = v[l][f + 1], k.push(v[l][f], u, H), k.push(u, K, H), P += 6;
        }
      }

      m.addGroup(y, P, 0);
      y += P;
    })();

    !1 === f && (0 < a && l(!0), 0 < b && l(!1));
    this.setIndex(k);
    this.addAttribute("position", new z(n, 3));
    this.addAttribute("normal", new z(t, 3));
    this.addAttribute("uv", new z(r, 2));
  }

  function Vc(a, b, c, d, e, f, g) {
    xb.call(this, 0, a, b, c, d, e, f, g);
    this.type = "ConeGeometry";
    this.parameters = {
      radius: a,
      height: b,
      radialSegments: c,
      heightSegments: d,
      openEnded: e,
      thetaStart: f,
      thetaLength: g
    };
  }

  function Wc(a, b, c, d, e, f, g) {
    Ya.call(this, 0, a, b, c, d, e, f, g);
    this.type = "ConeBufferGeometry";
    this.parameters = {
      radius: a,
      height: b,
      radialSegments: c,
      heightSegments: d,
      openEnded: e,
      thetaStart: f,
      thetaLength: g
    };
  }

  function Xc(a, b, c, d) {
    N.call(this);
    this.type = "CircleGeometry";
    this.parameters = {
      radius: a,
      segments: b,
      thetaStart: c,
      thetaLength: d
    };
    this.fromBufferGeometry(new dc(a, b, c, d));
    this.mergeVertices();
  }

  function dc(a, b, c, d) {
    F.call(this);
    this.type = "CircleBufferGeometry";
    this.parameters = {
      radius: a,
      segments: b,
      thetaStart: c,
      thetaLength: d
    };
    a = a || 1;
    b = void 0 !== b ? Math.max(3, b) : 8;
    c = void 0 !== c ? c : 0;
    d = void 0 !== d ? d : 2 * Math.PI;
    var e = [],
        f = [],
        g = [],
        h = [],
        l,
        m = new p(),
        k = new C();
    f.push(0, 0, 0);
    g.push(0, 0, 1);
    h.push(.5, .5);
    var n = 0;

    for (l = 3; n <= b; n++, l += 3) {
      var t = c + n / b * d;
      m.x = a * Math.cos(t);
      m.y = a * Math.sin(t);
      f.push(m.x, m.y, m.z);
      g.push(0, 0, 1);
      k.x = (f[l] / a + 1) / 2;
      k.y = (f[l + 1] / a + 1) / 2;
      h.push(k.x, k.y);
    }

    for (l = 1; l <= b; l++) {
      e.push(l, l + 1, 0);
    }

    this.setIndex(e);
    this.addAttribute("position", new z(f, 3));
    this.addAttribute("normal", new z(g, 3));
    this.addAttribute("uv", new z(h, 2));
  }

  function yb(a) {
    O.call(this);
    this.type = "ShadowMaterial";
    this.color = new I(0);
    this.transparent = !0;
    this.setValues(a);
  }

  function ec(a) {
    va.call(this, a);
    this.type = "RawShaderMaterial";
  }

  function Sa(a) {
    O.call(this);
    this.defines = {
      STANDARD: ""
    };
    this.type = "MeshStandardMaterial";
    this.color = new I(16777215);
    this.metalness = this.roughness = .5;
    this.lightMap = this.map = null;
    this.lightMapIntensity = 1;
    this.aoMap = null;
    this.aoMapIntensity = 1;
    this.emissive = new I(0);
    this.emissiveIntensity = 1;
    this.bumpMap = this.emissiveMap = null;
    this.bumpScale = 1;
    this.normalMap = null;
    this.normalScale = new C(1, 1);
    this.displacementMap = null;
    this.displacementScale = 1;
    this.displacementBias = 0;
    this.envMap = this.alphaMap = this.metalnessMap = this.roughnessMap = null;
    this.envMapIntensity = 1;
    this.refractionRatio = .98;
    this.wireframe = !1;
    this.wireframeLinewidth = 1;
    this.wireframeLinejoin = this.wireframeLinecap = "round";
    this.morphNormals = this.morphTargets = this.skinning = !1;
    this.setValues(a);
  }

  function zb(a) {
    Sa.call(this);
    this.defines = {
      PHYSICAL: ""
    };
    this.type = "MeshPhysicalMaterial";
    this.reflectivity = .5;
    this.clearCoatRoughness = this.clearCoat = 0;
    this.setValues(a);
  }

  function Ja(a) {
    O.call(this);
    this.type = "MeshPhongMaterial";
    this.color = new I(16777215);
    this.specular = new I(1118481);
    this.shininess = 30;
    this.lightMap = this.map = null;
    this.lightMapIntensity = 1;
    this.aoMap = null;
    this.aoMapIntensity = 1;
    this.emissive = new I(0);
    this.emissiveIntensity = 1;
    this.bumpMap = this.emissiveMap = null;
    this.bumpScale = 1;
    this.normalMap = null;
    this.normalScale = new C(1, 1);
    this.displacementMap = null;
    this.displacementScale = 1;
    this.displacementBias = 0;
    this.envMap = this.alphaMap = this.specularMap = null;
    this.combine = 0;
    this.reflectivity = 1;
    this.refractionRatio = .98;
    this.wireframe = !1;
    this.wireframeLinewidth = 1;
    this.wireframeLinejoin = this.wireframeLinecap = "round";
    this.morphNormals = this.morphTargets = this.skinning = !1;
    this.setValues(a);
  }

  function Ab(a) {
    Ja.call(this);
    this.defines = {
      TOON: ""
    };
    this.type = "MeshToonMaterial";
    this.gradientMap = null;
    this.setValues(a);
  }

  function Bb(a) {
    O.call(this);
    this.type = "MeshNormalMaterial";
    this.bumpMap = null;
    this.bumpScale = 1;
    this.normalMap = null;
    this.normalScale = new C(1, 1);
    this.displacementMap = null;
    this.displacementScale = 1;
    this.displacementBias = 0;
    this.wireframe = !1;
    this.wireframeLinewidth = 1;
    this.morphNormals = this.morphTargets = this.skinning = this.lights = this.fog = !1;
    this.setValues(a);
  }

  function Cb(a) {
    O.call(this);
    this.type = "MeshLambertMaterial";
    this.color = new I(16777215);
    this.lightMap = this.map = null;
    this.lightMapIntensity = 1;
    this.aoMap = null;
    this.aoMapIntensity = 1;
    this.emissive = new I(0);
    this.emissiveIntensity = 1;
    this.envMap = this.alphaMap = this.specularMap = this.emissiveMap = null;
    this.combine = 0;
    this.reflectivity = 1;
    this.refractionRatio = .98;
    this.wireframe = !1;
    this.wireframeLinewidth = 1;
    this.wireframeLinejoin = this.wireframeLinecap = "round";
    this.morphNormals = this.morphTargets = this.skinning = !1;
    this.setValues(a);
  }

  function Db(a) {
    U.call(this);
    this.type = "LineDashedMaterial";
    this.scale = 1;
    this.dashSize = 3;
    this.gapSize = 1;
    this.setValues(a);
  }

  function ae(a, b, c) {
    var d = this,
        e = !1,
        f = 0,
        g = 0,
        h = void 0;
    this.onStart = void 0;
    this.onLoad = a;
    this.onProgress = b;
    this.onError = c;

    this.itemStart = function (a) {
      g++;
      if (!1 === e && void 0 !== d.onStart) d.onStart(a, f, g);
      e = !0;
    };

    this.itemEnd = function (a) {
      f++;
      if (void 0 !== d.onProgress) d.onProgress(a, f, g);
      if (f === g && (e = !1, void 0 !== d.onLoad)) d.onLoad();
    };

    this.itemError = function (a) {
      if (void 0 !== d.onError) d.onError(a);
    };

    this.resolveURL = function (a) {
      return h ? h(a) : a;
    };

    this.setURLModifier = function (a) {
      h = a;
      return this;
    };
  }

  function Ka(a) {
    this.manager = void 0 !== a ? a : ma;
  }

  function df(a) {
    this.manager = void 0 !== a ? a : ma;
    this._parser = null;
  }

  function be(a) {
    this.manager = void 0 !== a ? a : ma;
    this._parser = null;
  }

  function Yc(a) {
    this.manager = void 0 !== a ? a : ma;
  }

  function ce(a) {
    this.manager = void 0 !== a ? a : ma;
  }

  function xd(a) {
    this.manager = void 0 !== a ? a : ma;
  }

  function E() {
    this.type = "Curve";
    this.arcLengthDivisions = 200;
  }

  function ia(a, b, c, d, e, f, g, h) {
    E.call(this);
    this.type = "EllipseCurve";
    this.aX = a || 0;
    this.aY = b || 0;
    this.xRadius = c || 1;
    this.yRadius = d || 1;
    this.aStartAngle = e || 0;
    this.aEndAngle = f || 2 * Math.PI;
    this.aClockwise = g || !1;
    this.aRotation = h || 0;
  }

  function fc(a, b, c, d, e, f) {
    ia.call(this, a, b, c, c, d, e, f);
    this.type = "ArcCurve";
  }

  function de() {
    var a = 0,
        b = 0,
        c = 0,
        d = 0;
    return {
      initCatmullRom: function initCatmullRom(e, f, g, h, l) {
        e = l * (g - e);
        h = l * (h - f);
        a = f;
        b = e;
        c = -3 * f + 3 * g - 2 * e - h;
        d = 2 * f - 2 * g + e + h;
      },
      initNonuniformCatmullRom: function initNonuniformCatmullRom(e, f, g, h, l, m, k) {
        e = ((f - e) / l - (g - e) / (l + m) + (g - f) / m) * m;
        h = ((g - f) / m - (h - f) / (m + k) + (h - g) / k) * m;
        a = f;
        b = e;
        c = -3 * f + 3 * g - 2 * e - h;
        d = 2 * f - 2 * g + e + h;
      },
      calc: function calc(e) {
        var f = e * e;
        return a + b * e + c * f + d * f * e;
      }
    };
  }

  function X(a, b, c, d) {
    E.call(this);
    this.type = "CatmullRomCurve3";
    this.points = a || [];
    this.closed = b || !1;
    this.curveType = c || "centripetal";
    this.tension = d || .5;
  }

  function ef(a, b, c, d, e) {
    b = .5 * (d - b);
    e = .5 * (e - c);
    var f = a * a;
    return (2 * c - 2 * d + b + e) * a * f + (-3 * c + 3 * d - 2 * b - e) * f + b * a + c;
  }

  function Zc(a, b, c, d) {
    var e = 1 - a;
    return e * e * b + 2 * (1 - a) * a * c + a * a * d;
  }

  function $c(a, b, c, d, e) {
    var f = 1 - a,
        g = 1 - a;
    return f * f * f * b + 3 * g * g * a * c + 3 * (1 - a) * a * a * d + a * a * a * e;
  }

  function La(a, b, c, d) {
    E.call(this);
    this.type = "CubicBezierCurve";
    this.v0 = a || new C();
    this.v1 = b || new C();
    this.v2 = c || new C();
    this.v3 = d || new C();
  }

  function Ta(a, b, c, d) {
    E.call(this);
    this.type = "CubicBezierCurve3";
    this.v0 = a || new p();
    this.v1 = b || new p();
    this.v2 = c || new p();
    this.v3 = d || new p();
  }

  function wa(a, b) {
    E.call(this);
    this.type = "LineCurve";
    this.v1 = a || new C();
    this.v2 = b || new C();
  }

  function Ma(a, b) {
    E.call(this);
    this.type = "LineCurve3";
    this.v1 = a || new p();
    this.v2 = b || new p();
  }

  function Na(a, b, c) {
    E.call(this);
    this.type = "QuadraticBezierCurve";
    this.v0 = a || new C();
    this.v1 = b || new C();
    this.v2 = c || new C();
  }

  function Ua(a, b, c) {
    E.call(this);
    this.type = "QuadraticBezierCurve3";
    this.v0 = a || new p();
    this.v1 = b || new p();
    this.v2 = c || new p();
  }

  function Oa(a) {
    E.call(this);
    this.type = "SplineCurve";
    this.points = a || [];
  }

  function Za() {
    E.call(this);
    this.type = "CurvePath";
    this.curves = [];
    this.autoClose = !1;
  }

  function Pa(a) {
    Za.call(this);
    this.type = "Path";
    this.currentPoint = new C();
    a && this.setFromPoints(a);
  }

  function gb(a) {
    Pa.call(this, a);
    this.uuid = S.generateUUID();
    this.type = "Shape";
    this.holes = [];
  }

  function ca(a, b) {
    A.call(this);
    this.type = "Light";
    this.color = new I(a);
    this.intensity = void 0 !== b ? b : 1;
    this.receiveShadow = void 0;
  }

  function yd(a, b, c) {
    ca.call(this, a, c);
    this.type = "HemisphereLight";
    this.castShadow = void 0;
    this.position.copy(A.DefaultUp);
    this.updateMatrix();
    this.groundColor = new I(b);
  }

  function Eb(a) {
    this.camera = a;
    this.bias = 0;
    this.radius = 1;
    this.mapSize = new C(512, 512);
    this.map = null;
    this.matrix = new M();
  }

  function zd() {
    Eb.call(this, new la(50, 1, .5, 500));
  }

  function Ad(a, b, c, d, e, f) {
    ca.call(this, a, b);
    this.type = "SpotLight";
    this.position.copy(A.DefaultUp);
    this.updateMatrix();
    this.target = new A();
    (0, _defineProperty.default)(this, "power", {
      get: function get() {
        return this.intensity * Math.PI;
      },
      set: function set(a) {
        this.intensity = a / Math.PI;
      }
    });
    this.distance = void 0 !== c ? c : 0;
    this.angle = void 0 !== d ? d : Math.PI / 3;
    this.penumbra = void 0 !== e ? e : 0;
    this.decay = void 0 !== f ? f : 1;
    this.shadow = new zd();
  }

  function Bd(a, b, c, d) {
    ca.call(this, a, b);
    this.type = "PointLight";
    (0, _defineProperty.default)(this, "power", {
      get: function get() {
        return 4 * this.intensity * Math.PI;
      },
      set: function set(a) {
        this.intensity = a / (4 * Math.PI);
      }
    });
    this.distance = void 0 !== c ? c : 0;
    this.decay = void 0 !== d ? d : 1;
    this.shadow = new Eb(new la(90, 1, .5, 500));
  }

  function Cd() {
    Eb.call(this, new Jb(-5, 5, 5, -5, .5, 500));
  }

  function Dd(a, b) {
    ca.call(this, a, b);
    this.type = "DirectionalLight";
    this.position.copy(A.DefaultUp);
    this.updateMatrix();
    this.target = new A();
    this.shadow = new Cd();
  }

  function Ed(a, b) {
    ca.call(this, a, b);
    this.type = "AmbientLight";
    this.castShadow = void 0;
  }

  function Fd(a, b, c, d) {
    ca.call(this, a, b);
    this.type = "RectAreaLight";
    this.width = void 0 !== c ? c : 10;
    this.height = void 0 !== d ? d : 10;
  }

  function Gd(a, b, c, d) {
    da.call(this, a, b, c, d);
  }

  function Hd(a, b, c) {
    da.call(this, a, b, c);
  }

  function na(a, b, c, d) {
    this.parameterPositions = a;
    this._cachedIndex = 0;
    this.resultBuffer = void 0 !== d ? d : new b.constructor(c);
    this.sampleValues = b;
    this.valueSize = c;
  }

  function Id(a, b, c, d) {
    na.call(this, a, b, c, d);
  }

  function ad(a, b, c, d) {
    da.call(this, a, b, c, d);
  }

  function Jd(a, b, c, d) {
    da.call(this, a, b, c, d);
  }

  function gc(a, b, c, d) {
    da.call(this, a, b, c, d);
  }

  function Kd(a, b, c, d) {
    na.call(this, a, b, c, d);
    this._offsetNext = this._weightNext = this._offsetPrev = this._weightPrev = -0;
  }

  function bd(a, b, c, d) {
    na.call(this, a, b, c, d);
  }

  function Ld(a, b, c, d) {
    na.call(this, a, b, c, d);
  }

  function da(a, b, c, d) {
    if (void 0 === a) throw Error("THREE.KeyframeTrack: track name is undefined");
    if (void 0 === b || 0 === b.length) throw Error("THREE.KeyframeTrack: no keyframes in track named " + a);
    this.name = a;
    this.times = fa.convertArray(b, this.TimeBufferType);
    this.values = fa.convertArray(c, this.ValueBufferType);
    this.setInterpolation(d || this.DefaultInterpolation);
    this.validate();
    this.optimize();
  }

  function hc(a, b, c, d) {
    da.call(this, a, b, c, d);
  }

  function Ba(a, b, c) {
    this.name = a;
    this.tracks = c;
    this.duration = void 0 !== b ? b : -1;
    this.uuid = S.generateUUID();
    0 > this.duration && this.resetDuration();
    this.optimize();
  }

  function Md(a) {
    this.manager = void 0 !== a ? a : ma;
    this.textures = {};
  }

  function ee(a) {
    this.manager = void 0 !== a ? a : ma;
  }

  function ic() {}

  function fe(a) {
    "boolean" === typeof a && (console.warn("THREE.JSONLoader: showStatus parameter has been removed from constructor."), a = void 0);
    this.manager = void 0 !== a ? a : ma;
    this.withCredentials = !1;
  }

  function ff(a) {
    this.manager = void 0 !== a ? a : ma;
    this.texturePath = "";
  }

  function ge(a) {
    "undefined" === typeof createImageBitmap && console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported.");
    "undefined" === typeof fetch && console.warn("THREE.ImageBitmapLoader: fetch() not supported.");
    this.manager = void 0 !== a ? a : ma;
    this.options = void 0;
  }

  function he() {
    this.type = "ShapePath";
    this.subPaths = [];
    this.currentPath = null;
  }

  function ie(a) {
    this.type = "Font";
    this.data = a;
  }

  function gf(a) {
    this.manager = void 0 !== a ? a : ma;
  }

  function je(a) {
    this.manager = void 0 !== a ? a : ma;
  }

  function hf() {
    this.type = "StereoCamera";
    this.aspect = 1;
    this.eyeSep = .064;
    this.cameraL = new la();
    this.cameraL.layers.enable(1);
    this.cameraL.matrixAutoUpdate = !1;
    this.cameraR = new la();
    this.cameraR.layers.enable(2);
    this.cameraR.matrixAutoUpdate = !1;
  }

  function cd(a, b, c) {
    A.call(this);
    this.type = "CubeCamera";
    var d = new la(90, 1, a, b);
    d.up.set(0, -1, 0);
    d.lookAt(new p(1, 0, 0));
    this.add(d);
    var e = new la(90, 1, a, b);
    e.up.set(0, -1, 0);
    e.lookAt(new p(-1, 0, 0));
    this.add(e);
    var f = new la(90, 1, a, b);
    f.up.set(0, 0, 1);
    f.lookAt(new p(0, 1, 0));
    this.add(f);
    var g = new la(90, 1, a, b);
    g.up.set(0, 0, -1);
    g.lookAt(new p(0, -1, 0));
    this.add(g);
    var h = new la(90, 1, a, b);
    h.up.set(0, -1, 0);
    h.lookAt(new p(0, 0, 1));
    this.add(h);
    var l = new la(90, 1, a, b);
    l.up.set(0, -1, 0);
    l.lookAt(new p(0, 0, -1));
    this.add(l);
    this.renderTarget = new Ib(c, c, {
      format: 1022,
      magFilter: 1006,
      minFilter: 1006
    });
    this.renderTarget.texture.name = "CubeCamera";

    this.update = function (a, b) {
      null === this.parent && this.updateMatrixWorld();
      var c = this.renderTarget,
          m = c.texture.generateMipmaps;
      c.texture.generateMipmaps = !1;
      c.activeCubeFace = 0;
      a.render(b, d, c);
      c.activeCubeFace = 1;
      a.render(b, e, c);
      c.activeCubeFace = 2;
      a.render(b, f, c);
      c.activeCubeFace = 3;
      a.render(b, g, c);
      c.activeCubeFace = 4;
      a.render(b, h, c);
      c.texture.generateMipmaps = m;
      c.activeCubeFace = 5;
      a.render(b, l, c);
      a.setRenderTarget(null);
    };

    this.clear = function (a, b, c, d) {
      for (var e = this.renderTarget, f = 0; 6 > f; f++) {
        e.activeCubeFace = f, a.setRenderTarget(e), a.clear(b, c, d);
      }

      a.setRenderTarget(null);
    };
  }

  function ke() {
    A.call(this);
    this.type = "AudioListener";
    this.context = le.getContext();
    this.gain = this.context.createGain();
    this.gain.connect(this.context.destination);
    this.filter = null;
  }

  function jc(a) {
    A.call(this);
    this.type = "Audio";
    this.context = a.context;
    this.gain = this.context.createGain();
    this.gain.connect(a.getInput());
    this.autoplay = !1;
    this.buffer = null;
    this.loop = !1;
    this.offset = this.startTime = 0;
    this.playbackRate = 1;
    this.isPlaying = !1;
    this.hasPlaybackControl = !0;
    this.sourceType = "empty";
    this.filters = [];
  }

  function me(a) {
    jc.call(this, a);
    this.panner = this.context.createPanner();
    this.panner.connect(this.gain);
  }

  function ne(a, b) {
    this.analyser = a.context.createAnalyser();
    this.analyser.fftSize = void 0 !== b ? b : 2048;
    this.data = new Uint8Array(this.analyser.frequencyBinCount);
    a.getOutput().connect(this.analyser);
  }

  function oe(a, b, c) {
    this.binding = a;
    this.valueSize = c;
    a = Float64Array;

    switch (b) {
      case "quaternion":
        b = this._slerp;
        break;

      case "string":
      case "bool":
        a = Array;
        b = this._select;
        break;

      default:
        b = this._lerp;
    }

    this.buffer = new a(4 * c);
    this._mixBufferRegion = b;
    this.referenceCount = this.useCount = this.cumulativeWeight = 0;
  }

  function jf(a, b, c) {
    c = c || qa.parseTrackName(b);
    this._targetGroup = a;
    this._bindings = a.subscribe_(b, c);
  }

  function qa(a, b, c) {
    this.path = b;
    this.parsedPath = c || qa.parseTrackName(b);
    this.node = qa.findNode(a, this.parsedPath.nodeName) || a;
    this.rootNode = a;
  }

  function kf() {
    this.uuid = S.generateUUID();
    this._objects = Array.prototype.slice.call(arguments);
    this.nCachedObjects_ = 0;
    var a = {};
    this._indicesByUUID = a;

    for (var b = 0, c = arguments.length; b !== c; ++b) {
      a[arguments[b].uuid] = b;
    }

    this._paths = [];
    this._parsedPaths = [];
    this._bindings = [];
    this._bindingsIndicesByPath = {};
    var d = this;
    this.stats = {
      objects: {
        get total() {
          return d._objects.length;
        },

        get inUse() {
          return this.total - d.nCachedObjects_;
        }

      },

      get bindingsPerObject() {
        return d._bindings.length;
      }

    };
  }

  function lf(a, b, c) {
    this._mixer = a;
    this._clip = b;
    this._localRoot = c || null;
    a = b.tracks;
    b = a.length;
    c = Array(b);

    for (var d = {
      endingStart: 2400,
      endingEnd: 2400
    }, e = 0; e !== b; ++e) {
      var f = a[e].createInterpolant(null);
      c[e] = f;
      f.settings = d;
    }

    this._interpolantSettings = d;
    this._interpolants = c;
    this._propertyBindings = Array(b);
    this._weightInterpolant = this._timeScaleInterpolant = this._byClipCacheIndex = this._cacheIndex = null;
    this.loop = 2201;
    this._loopCount = -1;
    this._startTime = null;
    this.time = 0;
    this._effectiveWeight = this.weight = this._effectiveTimeScale = this.timeScale = 1;
    this.repetitions = Infinity;
    this.paused = !1;
    this.enabled = !0;
    this.clampWhenFinished = !1;
    this.zeroSlopeAtEnd = this.zeroSlopeAtStart = !0;
  }

  function pe(a) {
    this._root = a;

    this._initMemoryManager();

    this.time = this._accuIndex = 0;
    this.timeScale = 1;
  }

  function Nd(a, b) {
    "string" === typeof a && (console.warn("THREE.Uniform: Type parameter is no longer needed."), a = b);
    this.value = a;
  }

  function qe() {
    F.call(this);
    this.type = "InstancedBufferGeometry";
    this.maxInstancedCount = void 0;
  }

  function re(a, b, c, d) {
    this.data = a;
    this.itemSize = b;
    this.offset = c;
    this.normalized = !0 === d;
  }

  function kc(a, b) {
    this.array = a;
    this.stride = b;
    this.count = void 0 !== a ? a.length / b : 0;
    this.dynamic = !1;
    this.updateRange = {
      offset: 0,
      count: -1
    };
    this.version = 0;
  }

  function se(a, b, c) {
    kc.call(this, a, b);
    this.meshPerAttribute = c || 1;
  }

  function te(a, b, c) {
    T.call(this, a, b);
    this.meshPerAttribute = c || 1;
  }

  function mf(a, b, c, d) {
    this.ray = new qb(a, b);
    this.near = c || 0;
    this.far = d || Infinity;
    this.params = {
      Mesh: {},
      Line: {},
      LOD: {},
      Points: {
        threshold: 1
      },
      Sprite: {}
    };
    (0, _defineProperties.default)(this.params, {
      PointCloud: {
        get: function get() {
          console.warn("THREE.Raycaster: params.PointCloud has been renamed to params.Points.");
          return this.Points;
        }
      }
    });
  }

  function nf(a, b) {
    return a.distance - b.distance;
  }

  function ue(a, b, c, d) {
    if (!1 !== a.visible && (a.raycast(b, c), !0 === d)) {
      a = a.children;
      d = 0;

      for (var e = a.length; d < e; d++) {
        ue(a[d], b, c, !0);
      }
    }
  }

  function of(a) {
    this.autoStart = void 0 !== a ? a : !0;
    this.elapsedTime = this.oldTime = this.startTime = 0;
    this.running = !1;
  }

  function pf(a, b, c) {
    this.radius = void 0 !== a ? a : 1;
    this.phi = void 0 !== b ? b : 0;
    this.theta = void 0 !== c ? c : 0;
    return this;
  }

  function qf(a, b, c) {
    this.radius = void 0 !== a ? a : 1;
    this.theta = void 0 !== b ? b : 0;
    this.y = void 0 !== c ? c : 0;
    return this;
  }

  function ve(a, b) {
    this.min = void 0 !== a ? a : new C(Infinity, Infinity);
    this.max = void 0 !== b ? b : new C(-Infinity, -Infinity);
  }

  function dd(a) {
    A.call(this);
    this.material = a;

    this.render = function () {};
  }

  function ed(a, b, c, d) {
    this.object = a;
    this.size = void 0 !== b ? b : 1;
    a = void 0 !== c ? c : 16711680;
    d = void 0 !== d ? d : 1;
    b = 0;
    (c = this.object.geometry) && c.isGeometry ? b = 3 * c.faces.length : c && c.isBufferGeometry && (b = c.attributes.normal.count);
    c = new F();
    b = new z(6 * b, 3);
    c.addAttribute("position", b);
    aa.call(this, c, new U({
      color: a,
      linewidth: d
    }));
    this.matrixAutoUpdate = !1;
    this.update();
  }

  function lc(a, b) {
    A.call(this);
    this.light = a;
    this.light.updateMatrixWorld();
    this.matrix = a.matrixWorld;
    this.matrixAutoUpdate = !1;
    this.color = b;
    a = new F();
    b = [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, -1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, -1, 1];

    for (var c = 0, d = 1; 32 > c; c++, d++) {
      var e = c / 32 * Math.PI * 2,
          f = d / 32 * Math.PI * 2;
      b.push(Math.cos(e), Math.sin(e), 1, Math.cos(f), Math.sin(f), 1);
    }

    a.addAttribute("position", new z(b, 3));
    b = new U({
      fog: !1
    });
    this.cone = new aa(a, b);
    this.add(this.cone);
    this.update();
  }

  function rf(a) {
    var b = [];
    a && a.isBone && b.push(a);

    for (var c = 0; c < a.children.length; c++) {
      b.push.apply(b, rf(a.children[c]));
    }

    return b;
  }

  function mc(a) {
    for (var b = rf(a), c = new F(), d = [], e = [], f = new I(0, 0, 1), g = new I(0, 1, 0), h = 0; h < b.length; h++) {
      var l = b[h];
      l.parent && l.parent.isBone && (d.push(0, 0, 0), d.push(0, 0, 0), e.push(f.r, f.g, f.b), e.push(g.r, g.g, g.b));
    }

    c.addAttribute("position", new z(d, 3));
    c.addAttribute("color", new z(e, 3));
    d = new U({
      vertexColors: 2,
      depthTest: !1,
      depthWrite: !1,
      transparent: !0
    });
    aa.call(this, c, d);
    this.root = a;
    this.bones = b;
    this.matrix = a.matrixWorld;
    this.matrixAutoUpdate = !1;
  }

  function nc(a, b, c) {
    this.light = a;
    this.light.updateMatrixWorld();
    this.color = c;
    a = new ub(b, 4, 2);
    b = new za({
      wireframe: !0,
      fog: !1
    });
    oa.call(this, a, b);
    this.matrix = this.light.matrixWorld;
    this.matrixAutoUpdate = !1;
    this.update();
  }

  function oc(a, b) {
    A.call(this);
    this.light = a;
    this.light.updateMatrixWorld();
    this.matrix = a.matrixWorld;
    this.matrixAutoUpdate = !1;
    this.color = b;
    a = new U({
      fog: !1
    });
    b = new F();
    b.addAttribute("position", new T(new Float32Array(15), 3));
    this.line = new ua(b, a);
    this.add(this.line);
    this.update();
  }

  function pc(a, b, c) {
    A.call(this);
    this.light = a;
    this.light.updateMatrixWorld();
    this.matrix = a.matrixWorld;
    this.matrixAutoUpdate = !1;
    this.color = c;
    a = new sb(b);
    a.rotateY(.5 * Math.PI);
    this.material = new za({
      wireframe: !0,
      fog: !1
    });
    void 0 === this.color && (this.material.vertexColors = 2);
    b = a.getAttribute("position");
    b = new Float32Array(3 * b.count);
    a.addAttribute("color", new T(b, 3));
    this.add(new oa(a, this.material));
    this.update();
  }

  function fd(a, b, c, d) {
    a = a || 10;
    b = b || 10;
    c = new I(void 0 !== c ? c : 4473924);
    d = new I(void 0 !== d ? d : 8947848);
    var e = b / 2,
        f = a / b,
        g = a / 2;
    a = [];

    for (var h = [], l = 0, m = 0, k = -g; l <= b; l++, k += f) {
      a.push(-g, 0, k, g, 0, k);
      a.push(k, 0, -g, k, 0, g);
      var n = l === e ? c : d;
      n.toArray(h, m);
      m += 3;
      n.toArray(h, m);
      m += 3;
      n.toArray(h, m);
      m += 3;
      n.toArray(h, m);
      m += 3;
    }

    b = new F();
    b.addAttribute("position", new z(a, 3));
    b.addAttribute("color", new z(h, 3));
    c = new U({
      vertexColors: 2
    });
    aa.call(this, b, c);
  }

  function Od(a, b, c, d, e, f) {
    a = a || 10;
    b = b || 16;
    c = c || 8;
    d = d || 64;
    e = new I(void 0 !== e ? e : 4473924);
    f = new I(void 0 !== f ? f : 8947848);
    var g = [],
        h = [],
        l;

    for (l = 0; l <= b; l++) {
      var m = l / b * 2 * Math.PI;
      var k = Math.sin(m) * a;
      m = Math.cos(m) * a;
      g.push(0, 0, 0);
      g.push(k, 0, m);
      var n = l & 1 ? e : f;
      h.push(n.r, n.g, n.b);
      h.push(n.r, n.g, n.b);
    }

    for (l = 0; l <= c; l++) {
      n = l & 1 ? e : f;
      var t = a - a / c * l;

      for (b = 0; b < d; b++) {
        m = b / d * 2 * Math.PI, k = Math.sin(m) * t, m = Math.cos(m) * t, g.push(k, 0, m), h.push(n.r, n.g, n.b), m = (b + 1) / d * 2 * Math.PI, k = Math.sin(m) * t, m = Math.cos(m) * t, g.push(k, 0, m), h.push(n.r, n.g, n.b);
      }
    }

    a = new F();
    a.addAttribute("position", new z(g, 3));
    a.addAttribute("color", new z(h, 3));
    g = new U({
      vertexColors: 2
    });
    aa.call(this, a, g);
  }

  function gd(a, b, c, d) {
    this.object = a;
    this.size = void 0 !== b ? b : 1;
    a = void 0 !== c ? c : 16776960;
    d = void 0 !== d ? d : 1;
    b = 0;
    (c = this.object.geometry) && c.isGeometry ? b = c.faces.length : console.warn("THREE.FaceNormalsHelper: only THREE.Geometry is supported. Use THREE.VertexNormalsHelper, instead.");
    c = new F();
    b = new z(6 * b, 3);
    c.addAttribute("position", b);
    aa.call(this, c, new U({
      color: a,
      linewidth: d
    }));
    this.matrixAutoUpdate = !1;
    this.update();
  }

  function qc(a, b, c) {
    A.call(this);
    this.light = a;
    this.light.updateMatrixWorld();
    this.matrix = a.matrixWorld;
    this.matrixAutoUpdate = !1;
    this.color = c;
    void 0 === b && (b = 1);
    a = new F();
    a.addAttribute("position", new z([-b, b, 0, b, b, 0, b, -b, 0, -b, -b, 0, -b, b, 0], 3));
    b = new U({
      fog: !1
    });
    this.lightPlane = new ua(a, b);
    this.add(this.lightPlane);
    a = new F();
    a.addAttribute("position", new z([0, 0, 0, 0, 0, 1], 3));
    this.targetLine = new ua(a, b);
    this.add(this.targetLine);
    this.update();
  }

  function hd(a) {
    function b(a, b, d) {
      c(a, d);
      c(b, d);
    }

    function c(a, b) {
      f.push(0, 0, 0);
      g.push(b.r, b.g, b.b);
      void 0 === h[a] && (h[a] = []);
      h[a].push(f.length / 3 - 1);
    }

    var d = new F(),
        e = new U({
      color: 16777215,
      vertexColors: 1
    }),
        f = [],
        g = [],
        h = {},
        l = new I(16755200),
        m = new I(16711680),
        k = new I(43775),
        n = new I(16777215),
        t = new I(3355443);
    b("n1", "n2", l);
    b("n2", "n4", l);
    b("n4", "n3", l);
    b("n3", "n1", l);
    b("f1", "f2", l);
    b("f2", "f4", l);
    b("f4", "f3", l);
    b("f3", "f1", l);
    b("n1", "f1", l);
    b("n2", "f2", l);
    b("n3", "f3", l);
    b("n4", "f4", l);
    b("p", "n1", m);
    b("p", "n2", m);
    b("p", "n3", m);
    b("p", "n4", m);
    b("u1", "u2", k);
    b("u2", "u3", k);
    b("u3", "u1", k);
    b("c", "t", n);
    b("p", "c", t);
    b("cn1", "cn2", t);
    b("cn3", "cn4", t);
    b("cf1", "cf2", t);
    b("cf3", "cf4", t);
    d.addAttribute("position", new z(f, 3));
    d.addAttribute("color", new z(g, 3));
    aa.call(this, d, e);
    this.camera = a;
    this.camera.updateProjectionMatrix && this.camera.updateProjectionMatrix();
    this.matrix = a.matrixWorld;
    this.matrixAutoUpdate = !1;
    this.pointMap = h;
    this.update();
  }

  function Fb(a, b) {
    this.object = a;
    void 0 === b && (b = 16776960);
    a = new Uint16Array([0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7]);
    var c = new Float32Array(24),
        d = new F();
    d.setIndex(new T(a, 1));
    d.addAttribute("position", new T(c, 3));
    aa.call(this, d, new U({
      color: b
    }));
    this.matrixAutoUpdate = !1;
    this.update();
  }

  function id(a, b) {
    this.type = "Box3Helper";
    this.box = a;
    a = void 0 !== b ? b : 16776960;
    b = new Uint16Array([0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7]);
    var c = new F();
    c.setIndex(new T(b, 1));
    c.addAttribute("position", new z([1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1], 3));
    aa.call(this, c, new U({
      color: a
    }));
    this.geometry.computeBoundingSphere();
  }

  function jd(a, b, c) {
    this.type = "PlaneHelper";
    this.plane = a;
    this.size = void 0 === b ? 1 : b;
    a = void 0 !== c ? c : 16776960;
    b = new F();
    b.addAttribute("position", new z([1, -1, 1, -1, 1, 1, -1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0], 3));
    b.computeBoundingSphere();
    ua.call(this, b, new U({
      color: a
    }));
    b = new F();
    b.addAttribute("position", new z([1, 1, 1, -1, 1, 1, -1, -1, 1, 1, 1, 1, -1, -1, 1, 1, -1, 1], 3));
    b.computeBoundingSphere();
    this.add(new oa(b, new za({
      color: a,
      opacity: .2,
      transparent: !0,
      depthWrite: !1
    })));
  }

  function Gb(a, b, c, d, e, f) {
    A.call(this);
    void 0 === d && (d = 16776960);
    void 0 === c && (c = 1);
    void 0 === e && (e = .2 * c);
    void 0 === f && (f = .2 * e);
    void 0 === Pd && (Pd = new F(), Pd.addAttribute("position", new z([0, 0, 0, 0, 1, 0], 3)), we = new Ya(0, .5, 1, 5, 1), we.translate(0, -.5, 0));
    this.position.copy(b);
    this.line = new ua(Pd, new U({
      color: d
    }));
    this.line.matrixAutoUpdate = !1;
    this.add(this.line);
    this.cone = new oa(we, new za({
      color: d
    }));
    this.cone.matrixAutoUpdate = !1;
    this.add(this.cone);
    this.setDirection(a);
    this.setLength(c, e, f);
  }

  function kd(a) {
    a = a || 1;
    var b = [0, 0, 0, a, 0, 0, 0, 0, 0, 0, a, 0, 0, 0, 0, 0, 0, a];
    a = new F();
    a.addAttribute("position", new z(b, 3));
    a.addAttribute("color", new z([1, 0, 0, 1, .6, 0, 0, 1, 0, .6, 1, 0, 0, 0, 1, 0, .6, 1], 3));
    b = new U({
      vertexColors: 2
    });
    aa.call(this, a, b);
  }

  function sf(a) {
    console.warn("THREE.ClosedSplineCurve3 has been deprecated. Use THREE.CatmullRomCurve3 instead.");
    X.call(this, a);
    this.type = "catmullrom";
    this.closed = !0;
  }

  function tf(a) {
    console.warn("THREE.SplineCurve3 has been deprecated. Use THREE.CatmullRomCurve3 instead.");
    X.call(this, a);
    this.type = "catmullrom";
  }

  function xe(a) {
    console.warn("THREE.Spline has been removed. Use THREE.CatmullRomCurve3 instead.");
    X.call(this, a);
    this.type = "catmullrom";
  }

  void 0 === _epsilon.default && (Number.EPSILON = Math.pow(2, -52));
  void 0 === _isInteger.default && (Number.isInteger = function (a) {
    return "number" === typeof a && isFinite(a) && Math.floor(a) === a;
  });
  void 0 === Math.sign && (Math.sign = function (a) {
    return 0 > a ? -1 : 0 < a ? 1 : +a;
  });
  !1 === "name" in Function.prototype && (0, _defineProperty.default)(Function.prototype, "name", {
    get: function get() {
      return this.toString().match(/^\s*function\s*([^\(\s]*)/)[1];
    }
  });
  void 0 === _assign.default && function () {
    Object.assign = function (a) {
      if (void 0 === a || null === a) throw new TypeError("Cannot convert undefined or null to object");

      for (var b = Object(a), c = 1; c < arguments.length; c++) {
        var d = arguments[c];
        if (void 0 !== d && null !== d) for (var e in d) {
          Object.prototype.hasOwnProperty.call(d, e) && (b[e] = d[e]);
        }
      }

      return b;
    };
  }();
  (0, _assign.default)(xa.prototype, {
    addEventListener: function addEventListener(a, b) {
      void 0 === this._listeners && (this._listeners = {});
      var c = this._listeners;
      void 0 === c[a] && (c[a] = []);
      -1 === c[a].indexOf(b) && c[a].push(b);
    },
    hasEventListener: function hasEventListener(a, b) {
      if (void 0 === this._listeners) return !1;
      var c = this._listeners;
      return void 0 !== c[a] && -1 !== c[a].indexOf(b);
    },
    removeEventListener: function removeEventListener(a, b) {
      void 0 !== this._listeners && (a = this._listeners[a], void 0 !== a && (b = a.indexOf(b), -1 !== b && a.splice(b, 1)));
    },
    dispatchEvent: function dispatchEvent(a) {
      if (void 0 !== this._listeners) {
        var b = this._listeners[a.type];

        if (void 0 !== b) {
          a.target = this;
          b = b.slice(0);

          for (var c = 0, d = b.length; c < d; c++) {
            b[c].call(this, a);
          }
        }
      }
    }
  });
  var S = {
    DEG2RAD: Math.PI / 180,
    RAD2DEG: 180 / Math.PI,
    generateUUID: function () {
      for (var a = [], b = 0; 256 > b; b++) {
        a[b] = (16 > b ? "0" : "") + b.toString(16).toUpperCase();
      }

      return function () {
        var b = 4294967295 * Math.random() | 0,
            d = 4294967295 * Math.random() | 0,
            e = 4294967295 * Math.random() | 0,
            f = 4294967295 * Math.random() | 0;
        return a[b & 255] + a[b >> 8 & 255] + a[b >> 16 & 255] + a[b >> 24 & 255] + "-" + a[d & 255] + a[d >> 8 & 255] + "-" + a[d >> 16 & 15 | 64] + a[d >> 24 & 255] + "-" + a[e & 63 | 128] + a[e >> 8 & 255] + "-" + a[e >> 16 & 255] + a[e >> 24 & 255] + a[f & 255] + a[f >> 8 & 255] + a[f >> 16 & 255] + a[f >> 24 & 255];
      };
    }(),
    clamp: function clamp(a, b, c) {
      return Math.max(b, Math.min(c, a));
    },
    euclideanModulo: function euclideanModulo(a, b) {
      return (a % b + b) % b;
    },
    mapLinear: function mapLinear(a, b, c, d, e) {
      return d + (a - b) * (e - d) / (c - b);
    },
    lerp: function lerp(a, b, c) {
      return (1 - c) * a + c * b;
    },
    smoothstep: function smoothstep(a, b, c) {
      if (a <= b) return 0;
      if (a >= c) return 1;
      a = (a - b) / (c - b);
      return a * a * (3 - 2 * a);
    },
    smootherstep: function smootherstep(a, b, c) {
      if (a <= b) return 0;
      if (a >= c) return 1;
      a = (a - b) / (c - b);
      return a * a * a * (a * (6 * a - 15) + 10);
    },
    randInt: function randInt(a, b) {
      return a + Math.floor(Math.random() * (b - a + 1));
    },
    randFloat: function randFloat(a, b) {
      return a + Math.random() * (b - a);
    },
    randFloatSpread: function randFloatSpread(a) {
      return a * (.5 - Math.random());
    },
    degToRad: function degToRad(a) {
      return a * S.DEG2RAD;
    },
    radToDeg: function radToDeg(a) {
      return a * S.RAD2DEG;
    },
    isPowerOfTwo: function isPowerOfTwo(a) {
      return 0 === (a & a - 1) && 0 !== a;
    },
    ceilPowerOfTwo: function ceilPowerOfTwo(a) {
      return Math.pow(2, Math.ceil(Math.log(a) / Math.LN2));
    },
    floorPowerOfTwo: function floorPowerOfTwo(a) {
      return Math.pow(2, Math.floor(Math.log(a) / Math.LN2));
    }
  };
  (0, _defineProperties.default)(C.prototype, {
    width: {
      get: function get() {
        return this.x;
      },
      set: function set(a) {
        this.x = a;
      }
    },
    height: {
      get: function get() {
        return this.y;
      },
      set: function set(a) {
        this.y = a;
      }
    }
  });
  (0, _assign.default)(C.prototype, {
    isVector2: !0,
    set: function set(a, b) {
      this.x = a;
      this.y = b;
      return this;
    },
    setScalar: function setScalar(a) {
      this.y = this.x = a;
      return this;
    },
    setX: function setX(a) {
      this.x = a;
      return this;
    },
    setY: function setY(a) {
      this.y = a;
      return this;
    },
    setComponent: function setComponent(a, b) {
      switch (a) {
        case 0:
          this.x = b;
          break;

        case 1:
          this.y = b;
          break;

        default:
          throw Error("index is out of range: " + a);
      }

      return this;
    },
    getComponent: function getComponent(a) {
      switch (a) {
        case 0:
          return this.x;

        case 1:
          return this.y;

        default:
          throw Error("index is out of range: " + a);
      }
    },
    clone: function clone() {
      return new this.constructor(this.x, this.y);
    },
    copy: function copy(a) {
      this.x = a.x;
      this.y = a.y;
      return this;
    },
    add: function add(a, b) {
      if (void 0 !== b) return console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(a, b);
      this.x += a.x;
      this.y += a.y;
      return this;
    },
    addScalar: function addScalar(a) {
      this.x += a;
      this.y += a;
      return this;
    },
    addVectors: function addVectors(a, b) {
      this.x = a.x + b.x;
      this.y = a.y + b.y;
      return this;
    },
    addScaledVector: function addScaledVector(a, b) {
      this.x += a.x * b;
      this.y += a.y * b;
      return this;
    },
    sub: function sub(a, b) {
      if (void 0 !== b) return console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(a, b);
      this.x -= a.x;
      this.y -= a.y;
      return this;
    },
    subScalar: function subScalar(a) {
      this.x -= a;
      this.y -= a;
      return this;
    },
    subVectors: function subVectors(a, b) {
      this.x = a.x - b.x;
      this.y = a.y - b.y;
      return this;
    },
    multiply: function multiply(a) {
      this.x *= a.x;
      this.y *= a.y;
      return this;
    },
    multiplyScalar: function multiplyScalar(a) {
      this.x *= a;
      this.y *= a;
      return this;
    },
    divide: function divide(a) {
      this.x /= a.x;
      this.y /= a.y;
      return this;
    },
    divideScalar: function divideScalar(a) {
      return this.multiplyScalar(1 / a);
    },
    applyMatrix3: function applyMatrix3(a) {
      var b = this.x,
          c = this.y;
      a = a.elements;
      this.x = a[0] * b + a[3] * c + a[6];
      this.y = a[1] * b + a[4] * c + a[7];
      return this;
    },
    min: function min(a) {
      this.x = Math.min(this.x, a.x);
      this.y = Math.min(this.y, a.y);
      return this;
    },
    max: function max(a) {
      this.x = Math.max(this.x, a.x);
      this.y = Math.max(this.y, a.y);
      return this;
    },
    clamp: function clamp(a, b) {
      this.x = Math.max(a.x, Math.min(b.x, this.x));
      this.y = Math.max(a.y, Math.min(b.y, this.y));
      return this;
    },
    clampScalar: function () {
      var a = new C(),
          b = new C();
      return function (c, d) {
        a.set(c, c);
        b.set(d, d);
        return this.clamp(a, b);
      };
    }(),
    clampLength: function clampLength(a, b) {
      var c = this.length();
      return this.divideScalar(c || 1).multiplyScalar(Math.max(a, Math.min(b, c)));
    },
    floor: function floor() {
      this.x = Math.floor(this.x);
      this.y = Math.floor(this.y);
      return this;
    },
    ceil: function ceil() {
      this.x = Math.ceil(this.x);
      this.y = Math.ceil(this.y);
      return this;
    },
    round: function round() {
      this.x = Math.round(this.x);
      this.y = Math.round(this.y);
      return this;
    },
    roundToZero: function roundToZero() {
      this.x = 0 > this.x ? Math.ceil(this.x) : Math.floor(this.x);
      this.y = 0 > this.y ? Math.ceil(this.y) : Math.floor(this.y);
      return this;
    },
    negate: function negate() {
      this.x = -this.x;
      this.y = -this.y;
      return this;
    },
    dot: function dot(a) {
      return this.x * a.x + this.y * a.y;
    },
    lengthSq: function lengthSq() {
      return this.x * this.x + this.y * this.y;
    },
    length: function length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    manhattanLength: function manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y);
    },
    normalize: function normalize() {
      return this.divideScalar(this.length() || 1);
    },
    angle: function angle() {
      var a = Math.atan2(this.y, this.x);
      0 > a && (a += 2 * Math.PI);
      return a;
    },
    distanceTo: function distanceTo(a) {
      return Math.sqrt(this.distanceToSquared(a));
    },
    distanceToSquared: function distanceToSquared(a) {
      var b = this.x - a.x;
      a = this.y - a.y;
      return b * b + a * a;
    },
    manhattanDistanceTo: function manhattanDistanceTo(a) {
      return Math.abs(this.x - a.x) + Math.abs(this.y - a.y);
    },
    setLength: function setLength(a) {
      return this.normalize().multiplyScalar(a);
    },
    lerp: function lerp(a, b) {
      this.x += (a.x - this.x) * b;
      this.y += (a.y - this.y) * b;
      return this;
    },
    lerpVectors: function lerpVectors(a, b, c) {
      return this.subVectors(b, a).multiplyScalar(c).add(a);
    },
    equals: function equals(a) {
      return a.x === this.x && a.y === this.y;
    },
    fromArray: function fromArray(a, b) {
      void 0 === b && (b = 0);
      this.x = a[b];
      this.y = a[b + 1];
      return this;
    },
    toArray: function toArray(a, b) {
      void 0 === a && (a = []);
      void 0 === b && (b = 0);
      a[b] = this.x;
      a[b + 1] = this.y;
      return a;
    },
    fromBufferAttribute: function fromBufferAttribute(a, b, c) {
      void 0 !== c && console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute().");
      this.x = a.getX(b);
      this.y = a.getY(b);
      return this;
    },
    rotateAround: function rotateAround(a, b) {
      var c = Math.cos(b);
      b = Math.sin(b);
      var d = this.x - a.x,
          e = this.y - a.y;
      this.x = d * c - e * b + a.x;
      this.y = d * b + e * c + a.y;
      return this;
    }
  });
  (0, _assign.default)(M.prototype, {
    isMatrix4: !0,
    set: function set(a, b, c, d, e, f, g, h, l, m, k, n, t, r, q, p) {
      var u = this.elements;
      u[0] = a;
      u[4] = b;
      u[8] = c;
      u[12] = d;
      u[1] = e;
      u[5] = f;
      u[9] = g;
      u[13] = h;
      u[2] = l;
      u[6] = m;
      u[10] = k;
      u[14] = n;
      u[3] = t;
      u[7] = r;
      u[11] = q;
      u[15] = p;
      return this;
    },
    identity: function identity() {
      this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      return this;
    },
    clone: function clone() {
      return new M().fromArray(this.elements);
    },
    copy: function copy(a) {
      var b = this.elements;
      a = a.elements;
      b[0] = a[0];
      b[1] = a[1];
      b[2] = a[2];
      b[3] = a[3];
      b[4] = a[4];
      b[5] = a[5];
      b[6] = a[6];
      b[7] = a[7];
      b[8] = a[8];
      b[9] = a[9];
      b[10] = a[10];
      b[11] = a[11];
      b[12] = a[12];
      b[13] = a[13];
      b[14] = a[14];
      b[15] = a[15];
      return this;
    },
    copyPosition: function copyPosition(a) {
      var b = this.elements;
      a = a.elements;
      b[12] = a[12];
      b[13] = a[13];
      b[14] = a[14];
      return this;
    },
    extractBasis: function extractBasis(a, b, c) {
      a.setFromMatrixColumn(this, 0);
      b.setFromMatrixColumn(this, 1);
      c.setFromMatrixColumn(this, 2);
      return this;
    },
    makeBasis: function makeBasis(a, b, c) {
      this.set(a.x, b.x, c.x, 0, a.y, b.y, c.y, 0, a.z, b.z, c.z, 0, 0, 0, 0, 1);
      return this;
    },
    extractRotation: function () {
      var a = new p();
      return function (b) {
        var c = this.elements,
            d = b.elements,
            e = 1 / a.setFromMatrixColumn(b, 0).length(),
            f = 1 / a.setFromMatrixColumn(b, 1).length();
        b = 1 / a.setFromMatrixColumn(b, 2).length();
        c[0] = d[0] * e;
        c[1] = d[1] * e;
        c[2] = d[2] * e;
        c[4] = d[4] * f;
        c[5] = d[5] * f;
        c[6] = d[6] * f;
        c[8] = d[8] * b;
        c[9] = d[9] * b;
        c[10] = d[10] * b;
        return this;
      };
    }(),
    makeRotationFromEuler: function makeRotationFromEuler(a) {
      a && a.isEuler || console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
      var b = this.elements,
          c = a.x,
          d = a.y,
          e = a.z,
          f = Math.cos(c);
      c = Math.sin(c);
      var g = Math.cos(d);
      d = Math.sin(d);
      var h = Math.cos(e);
      e = Math.sin(e);

      if ("XYZ" === a.order) {
        a = f * h;
        var l = f * e,
            m = c * h,
            k = c * e;
        b[0] = g * h;
        b[4] = -g * e;
        b[8] = d;
        b[1] = l + m * d;
        b[5] = a - k * d;
        b[9] = -c * g;
        b[2] = k - a * d;
        b[6] = m + l * d;
        b[10] = f * g;
      } else "YXZ" === a.order ? (a = g * h, l = g * e, m = d * h, k = d * e, b[0] = a + k * c, b[4] = m * c - l, b[8] = f * d, b[1] = f * e, b[5] = f * h, b[9] = -c, b[2] = l * c - m, b[6] = k + a * c, b[10] = f * g) : "ZXY" === a.order ? (a = g * h, l = g * e, m = d * h, k = d * e, b[0] = a - k * c, b[4] = -f * e, b[8] = m + l * c, b[1] = l + m * c, b[5] = f * h, b[9] = k - a * c, b[2] = -f * d, b[6] = c, b[10] = f * g) : "ZYX" === a.order ? (a = f * h, l = f * e, m = c * h, k = c * e, b[0] = g * h, b[4] = m * d - l, b[8] = a * d + k, b[1] = g * e, b[5] = k * d + a, b[9] = l * d - m, b[2] = -d, b[6] = c * g, b[10] = f * g) : "YZX" === a.order ? (a = f * g, l = f * d, m = c * g, k = c * d, b[0] = g * h, b[4] = k - a * e, b[8] = m * e + l, b[1] = e, b[5] = f * h, b[9] = -c * h, b[2] = -d * h, b[6] = l * e + m, b[10] = a - k * e) : "XZY" === a.order && (a = f * g, l = f * d, m = c * g, k = c * d, b[0] = g * h, b[4] = -e, b[8] = d * h, b[1] = a * e + k, b[5] = f * h, b[9] = l * e - m, b[2] = m * e - l, b[6] = c * h, b[10] = k * e + a);

      b[3] = 0;
      b[7] = 0;
      b[11] = 0;
      b[12] = 0;
      b[13] = 0;
      b[14] = 0;
      b[15] = 1;
      return this;
    },
    makeRotationFromQuaternion: function makeRotationFromQuaternion(a) {
      var b = this.elements,
          c = a._x,
          d = a._y,
          e = a._z,
          f = a._w,
          g = c + c,
          h = d + d,
          l = e + e;
      a = c * g;
      var m = c * h;
      c *= l;
      var k = d * h;
      d *= l;
      e *= l;
      g *= f;
      h *= f;
      f *= l;
      b[0] = 1 - (k + e);
      b[4] = m - f;
      b[8] = c + h;
      b[1] = m + f;
      b[5] = 1 - (a + e);
      b[9] = d - g;
      b[2] = c - h;
      b[6] = d + g;
      b[10] = 1 - (a + k);
      b[3] = 0;
      b[7] = 0;
      b[11] = 0;
      b[12] = 0;
      b[13] = 0;
      b[14] = 0;
      b[15] = 1;
      return this;
    },
    lookAt: function () {
      var a = new p(),
          b = new p(),
          c = new p();
      return function (d, e, f) {
        var g = this.elements;
        c.subVectors(d, e);
        0 === c.lengthSq() && (c.z = 1);
        c.normalize();
        a.crossVectors(f, c);
        0 === a.lengthSq() && (1 === Math.abs(f.z) ? c.x += 1E-4 : c.z += 1E-4, c.normalize(), a.crossVectors(f, c));
        a.normalize();
        b.crossVectors(c, a);
        g[0] = a.x;
        g[4] = b.x;
        g[8] = c.x;
        g[1] = a.y;
        g[5] = b.y;
        g[9] = c.y;
        g[2] = a.z;
        g[6] = b.z;
        g[10] = c.z;
        return this;
      };
    }(),
    multiply: function multiply(a, b) {
      return void 0 !== b ? (console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."), this.multiplyMatrices(a, b)) : this.multiplyMatrices(this, a);
    },
    premultiply: function premultiply(a) {
      return this.multiplyMatrices(a, this);
    },
    multiplyMatrices: function multiplyMatrices(a, b) {
      var c = a.elements,
          d = b.elements;
      b = this.elements;
      a = c[0];
      var e = c[4],
          f = c[8],
          g = c[12],
          h = c[1],
          l = c[5],
          m = c[9],
          k = c[13],
          n = c[2],
          t = c[6],
          r = c[10],
          q = c[14],
          p = c[3],
          x = c[7],
          y = c[11];
      c = c[15];
      var w = d[0],
          B = d[4],
          G = d[8],
          K = d[12],
          P = d[1],
          H = d[5],
          C = d[9],
          A = d[13],
          z = d[2],
          E = d[6],
          F = d[10],
          I = d[14],
          L = d[3],
          Q = d[7],
          N = d[11];
      d = d[15];
      b[0] = a * w + e * P + f * z + g * L;
      b[4] = a * B + e * H + f * E + g * Q;
      b[8] = a * G + e * C + f * F + g * N;
      b[12] = a * K + e * A + f * I + g * d;
      b[1] = h * w + l * P + m * z + k * L;
      b[5] = h * B + l * H + m * E + k * Q;
      b[9] = h * G + l * C + m * F + k * N;
      b[13] = h * K + l * A + m * I + k * d;
      b[2] = n * w + t * P + r * z + q * L;
      b[6] = n * B + t * H + r * E + q * Q;
      b[10] = n * G + t * C + r * F + q * N;
      b[14] = n * K + t * A + r * I + q * d;
      b[3] = p * w + x * P + y * z + c * L;
      b[7] = p * B + x * H + y * E + c * Q;
      b[11] = p * G + x * C + y * F + c * N;
      b[15] = p * K + x * A + y * I + c * d;
      return this;
    },
    multiplyScalar: function multiplyScalar(a) {
      var b = this.elements;
      b[0] *= a;
      b[4] *= a;
      b[8] *= a;
      b[12] *= a;
      b[1] *= a;
      b[5] *= a;
      b[9] *= a;
      b[13] *= a;
      b[2] *= a;
      b[6] *= a;
      b[10] *= a;
      b[14] *= a;
      b[3] *= a;
      b[7] *= a;
      b[11] *= a;
      b[15] *= a;
      return this;
    },
    applyToBufferAttribute: function () {
      var a = new p();
      return function (b) {
        for (var c = 0, d = b.count; c < d; c++) {
          a.x = b.getX(c), a.y = b.getY(c), a.z = b.getZ(c), a.applyMatrix4(this), b.setXYZ(c, a.x, a.y, a.z);
        }

        return b;
      };
    }(),
    determinant: function determinant() {
      var a = this.elements,
          b = a[0],
          c = a[4],
          d = a[8],
          e = a[12],
          f = a[1],
          g = a[5],
          h = a[9],
          l = a[13],
          m = a[2],
          k = a[6],
          n = a[10],
          t = a[14];
      return a[3] * (+e * h * k - d * l * k - e * g * n + c * l * n + d * g * t - c * h * t) + a[7] * (+b * h * t - b * l * n + e * f * n - d * f * t + d * l * m - e * h * m) + a[11] * (+b * l * k - b * g * t - e * f * k + c * f * t + e * g * m - c * l * m) + a[15] * (-d * g * m - b * h * k + b * g * n + d * f * k - c * f * n + c * h * m);
    },
    transpose: function transpose() {
      var a = this.elements;
      var b = a[1];
      a[1] = a[4];
      a[4] = b;
      b = a[2];
      a[2] = a[8];
      a[8] = b;
      b = a[6];
      a[6] = a[9];
      a[9] = b;
      b = a[3];
      a[3] = a[12];
      a[12] = b;
      b = a[7];
      a[7] = a[13];
      a[13] = b;
      b = a[11];
      a[11] = a[14];
      a[14] = b;
      return this;
    },
    setPosition: function setPosition(a) {
      var b = this.elements;
      b[12] = a.x;
      b[13] = a.y;
      b[14] = a.z;
      return this;
    },
    getInverse: function getInverse(a, b) {
      var c = this.elements,
          d = a.elements;
      a = d[0];
      var e = d[1],
          f = d[2],
          g = d[3],
          h = d[4],
          l = d[5],
          m = d[6],
          k = d[7],
          n = d[8],
          t = d[9],
          r = d[10],
          q = d[11],
          p = d[12],
          x = d[13],
          y = d[14];
      d = d[15];
      var w = t * y * k - x * r * k + x * m * q - l * y * q - t * m * d + l * r * d,
          B = p * r * k - n * y * k - p * m * q + h * y * q + n * m * d - h * r * d,
          G = n * x * k - p * t * k + p * l * q - h * x * q - n * l * d + h * t * d,
          K = p * t * m - n * x * m - p * l * r + h * x * r + n * l * y - h * t * y,
          P = a * w + e * B + f * G + g * K;

      if (0 === P) {
        if (!0 === b) throw Error("THREE.Matrix4: .getInverse() can't invert matrix, determinant is 0");
        console.warn("THREE.Matrix4: .getInverse() can't invert matrix, determinant is 0");
        return this.identity();
      }

      b = 1 / P;
      c[0] = w * b;
      c[1] = (x * r * g - t * y * g - x * f * q + e * y * q + t * f * d - e * r * d) * b;
      c[2] = (l * y * g - x * m * g + x * f * k - e * y * k - l * f * d + e * m * d) * b;
      c[3] = (t * m * g - l * r * g - t * f * k + e * r * k + l * f * q - e * m * q) * b;
      c[4] = B * b;
      c[5] = (n * y * g - p * r * g + p * f * q - a * y * q - n * f * d + a * r * d) * b;
      c[6] = (p * m * g - h * y * g - p * f * k + a * y * k + h * f * d - a * m * d) * b;
      c[7] = (h * r * g - n * m * g + n * f * k - a * r * k - h * f * q + a * m * q) * b;
      c[8] = G * b;
      c[9] = (p * t * g - n * x * g - p * e * q + a * x * q + n * e * d - a * t * d) * b;
      c[10] = (h * x * g - p * l * g + p * e * k - a * x * k - h * e * d + a * l * d) * b;
      c[11] = (n * l * g - h * t * g - n * e * k + a * t * k + h * e * q - a * l * q) * b;
      c[12] = K * b;
      c[13] = (n * x * f - p * t * f + p * e * r - a * x * r - n * e * y + a * t * y) * b;
      c[14] = (p * l * f - h * x * f - p * e * m + a * x * m + h * e * y - a * l * y) * b;
      c[15] = (h * t * f - n * l * f + n * e * m - a * t * m - h * e * r + a * l * r) * b;
      return this;
    },
    scale: function scale(a) {
      var b = this.elements,
          c = a.x,
          d = a.y;
      a = a.z;
      b[0] *= c;
      b[4] *= d;
      b[8] *= a;
      b[1] *= c;
      b[5] *= d;
      b[9] *= a;
      b[2] *= c;
      b[6] *= d;
      b[10] *= a;
      b[3] *= c;
      b[7] *= d;
      b[11] *= a;
      return this;
    },
    getMaxScaleOnAxis: function getMaxScaleOnAxis() {
      var a = this.elements;
      return Math.sqrt(Math.max(a[0] * a[0] + a[1] * a[1] + a[2] * a[2], a[4] * a[4] + a[5] * a[5] + a[6] * a[6], a[8] * a[8] + a[9] * a[9] + a[10] * a[10]));
    },
    makeTranslation: function makeTranslation(a, b, c) {
      this.set(1, 0, 0, a, 0, 1, 0, b, 0, 0, 1, c, 0, 0, 0, 1);
      return this;
    },
    makeRotationX: function makeRotationX(a) {
      var b = Math.cos(a);
      a = Math.sin(a);
      this.set(1, 0, 0, 0, 0, b, -a, 0, 0, a, b, 0, 0, 0, 0, 1);
      return this;
    },
    makeRotationY: function makeRotationY(a) {
      var b = Math.cos(a);
      a = Math.sin(a);
      this.set(b, 0, a, 0, 0, 1, 0, 0, -a, 0, b, 0, 0, 0, 0, 1);
      return this;
    },
    makeRotationZ: function makeRotationZ(a) {
      var b = Math.cos(a);
      a = Math.sin(a);
      this.set(b, -a, 0, 0, a, b, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      return this;
    },
    makeRotationAxis: function makeRotationAxis(a, b) {
      var c = Math.cos(b);
      b = Math.sin(b);
      var d = 1 - c,
          e = a.x,
          f = a.y;
      a = a.z;
      var g = d * e,
          h = d * f;
      this.set(g * e + c, g * f - b * a, g * a + b * f, 0, g * f + b * a, h * f + c, h * a - b * e, 0, g * a - b * f, h * a + b * e, d * a * a + c, 0, 0, 0, 0, 1);
      return this;
    },
    makeScale: function makeScale(a, b, c) {
      this.set(a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 0, 0, 0, 0, 1);
      return this;
    },
    makeShear: function makeShear(a, b, c) {
      this.set(1, b, c, 0, a, 1, c, 0, a, b, 1, 0, 0, 0, 0, 1);
      return this;
    },
    compose: function compose(a, b, c) {
      this.makeRotationFromQuaternion(b);
      this.scale(c);
      this.setPosition(a);
      return this;
    },
    decompose: function () {
      var a = new p(),
          b = new M();
      return function (c, d, e) {
        var f = this.elements,
            g = a.set(f[0], f[1], f[2]).length(),
            h = a.set(f[4], f[5], f[6]).length(),
            l = a.set(f[8], f[9], f[10]).length();
        0 > this.determinant() && (g = -g);
        c.x = f[12];
        c.y = f[13];
        c.z = f[14];
        b.copy(this);
        c = 1 / g;
        f = 1 / h;
        var m = 1 / l;
        b.elements[0] *= c;
        b.elements[1] *= c;
        b.elements[2] *= c;
        b.elements[4] *= f;
        b.elements[5] *= f;
        b.elements[6] *= f;
        b.elements[8] *= m;
        b.elements[9] *= m;
        b.elements[10] *= m;
        d.setFromRotationMatrix(b);
        e.x = g;
        e.y = h;
        e.z = l;
        return this;
      };
    }(),
    makePerspective: function makePerspective(a, b, c, d, e, f) {
      void 0 === f && console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");
      var g = this.elements;
      g[0] = 2 * e / (b - a);
      g[4] = 0;
      g[8] = (b + a) / (b - a);
      g[12] = 0;
      g[1] = 0;
      g[5] = 2 * e / (c - d);
      g[9] = (c + d) / (c - d);
      g[13] = 0;
      g[2] = 0;
      g[6] = 0;
      g[10] = -(f + e) / (f - e);
      g[14] = -2 * f * e / (f - e);
      g[3] = 0;
      g[7] = 0;
      g[11] = -1;
      g[15] = 0;
      return this;
    },
    makeOrthographic: function makeOrthographic(a, b, c, d, e, f) {
      var g = this.elements,
          h = 1 / (b - a),
          l = 1 / (c - d),
          m = 1 / (f - e);
      g[0] = 2 * h;
      g[4] = 0;
      g[8] = 0;
      g[12] = -((b + a) * h);
      g[1] = 0;
      g[5] = 2 * l;
      g[9] = 0;
      g[13] = -((c + d) * l);
      g[2] = 0;
      g[6] = 0;
      g[10] = -2 * m;
      g[14] = -((f + e) * m);
      g[3] = 0;
      g[7] = 0;
      g[11] = 0;
      g[15] = 1;
      return this;
    },
    equals: function equals(a) {
      var b = this.elements;
      a = a.elements;

      for (var c = 0; 16 > c; c++) {
        if (b[c] !== a[c]) return !1;
      }

      return !0;
    },
    fromArray: function fromArray(a, b) {
      void 0 === b && (b = 0);

      for (var c = 0; 16 > c; c++) {
        this.elements[c] = a[c + b];
      }

      return this;
    },
    toArray: function toArray(a, b) {
      void 0 === a && (a = []);
      void 0 === b && (b = 0);
      var c = this.elements;
      a[b] = c[0];
      a[b + 1] = c[1];
      a[b + 2] = c[2];
      a[b + 3] = c[3];
      a[b + 4] = c[4];
      a[b + 5] = c[5];
      a[b + 6] = c[6];
      a[b + 7] = c[7];
      a[b + 8] = c[8];
      a[b + 9] = c[9];
      a[b + 10] = c[10];
      a[b + 11] = c[11];
      a[b + 12] = c[12];
      a[b + 13] = c[13];
      a[b + 14] = c[14];
      a[b + 15] = c[15];
      return a;
    }
  });
  (0, _assign.default)(ja, {
    slerp: function slerp(a, b, c, d) {
      return c.copy(a).slerp(b, d);
    },
    slerpFlat: function slerpFlat(a, b, c, d, e, f, g) {
      var h = c[d + 0],
          l = c[d + 1],
          m = c[d + 2];
      c = c[d + 3];
      d = e[f + 0];
      var k = e[f + 1],
          n = e[f + 2];
      e = e[f + 3];

      if (c !== e || h !== d || l !== k || m !== n) {
        f = 1 - g;
        var p = h * d + l * k + m * n + c * e,
            r = 0 <= p ? 1 : -1,
            q = 1 - p * p;
        q > _epsilon.default && (q = Math.sqrt(q), p = Math.atan2(q, p * r), f = Math.sin(f * p) / q, g = Math.sin(g * p) / q);
        r *= g;
        h = h * f + d * r;
        l = l * f + k * r;
        m = m * f + n * r;
        c = c * f + e * r;
        f === 1 - g && (g = 1 / Math.sqrt(h * h + l * l + m * m + c * c), h *= g, l *= g, m *= g, c *= g);
      }

      a[b] = h;
      a[b + 1] = l;
      a[b + 2] = m;
      a[b + 3] = c;
    }
  });
  (0, _defineProperties.default)(ja.prototype, {
    x: {
      get: function get() {
        return this._x;
      },
      set: function set(a) {
        this._x = a;
        this.onChangeCallback();
      }
    },
    y: {
      get: function get() {
        return this._y;
      },
      set: function set(a) {
        this._y = a;
        this.onChangeCallback();
      }
    },
    z: {
      get: function get() {
        return this._z;
      },
      set: function set(a) {
        this._z = a;
        this.onChangeCallback();
      }
    },
    w: {
      get: function get() {
        return this._w;
      },
      set: function set(a) {
        this._w = a;
        this.onChangeCallback();
      }
    }
  });
  (0, _assign.default)(ja.prototype, {
    set: function set(a, b, c, d) {
      this._x = a;
      this._y = b;
      this._z = c;
      this._w = d;
      this.onChangeCallback();
      return this;
    },
    clone: function clone() {
      return new this.constructor(this._x, this._y, this._z, this._w);
    },
    copy: function copy(a) {
      this._x = a.x;
      this._y = a.y;
      this._z = a.z;
      this._w = a.w;
      this.onChangeCallback();
      return this;
    },
    setFromEuler: function setFromEuler(a, b) {
      if (!a || !a.isEuler) throw Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");
      var c = a._x,
          d = a._y,
          e = a._z;
      a = a.order;
      var f = Math.cos,
          g = Math.sin,
          h = f(c / 2),
          l = f(d / 2);
      f = f(e / 2);
      c = g(c / 2);
      d = g(d / 2);
      e = g(e / 2);
      "XYZ" === a ? (this._x = c * l * f + h * d * e, this._y = h * d * f - c * l * e, this._z = h * l * e + c * d * f, this._w = h * l * f - c * d * e) : "YXZ" === a ? (this._x = c * l * f + h * d * e, this._y = h * d * f - c * l * e, this._z = h * l * e - c * d * f, this._w = h * l * f + c * d * e) : "ZXY" === a ? (this._x = c * l * f - h * d * e, this._y = h * d * f + c * l * e, this._z = h * l * e + c * d * f, this._w = h * l * f - c * d * e) : "ZYX" === a ? (this._x = c * l * f - h * d * e, this._y = h * d * f + c * l * e, this._z = h * l * e - c * d * f, this._w = h * l * f + c * d * e) : "YZX" === a ? (this._x = c * l * f + h * d * e, this._y = h * d * f + c * l * e, this._z = h * l * e - c * d * f, this._w = h * l * f - c * d * e) : "XZY" === a && (this._x = c * l * f - h * d * e, this._y = h * d * f - c * l * e, this._z = h * l * e + c * d * f, this._w = h * l * f + c * d * e);
      if (!1 !== b) this.onChangeCallback();
      return this;
    },
    setFromAxisAngle: function setFromAxisAngle(a, b) {
      b /= 2;
      var c = Math.sin(b);
      this._x = a.x * c;
      this._y = a.y * c;
      this._z = a.z * c;
      this._w = Math.cos(b);
      this.onChangeCallback();
      return this;
    },
    setFromRotationMatrix: function setFromRotationMatrix(a) {
      var b = a.elements,
          c = b[0];
      a = b[4];
      var d = b[8],
          e = b[1],
          f = b[5],
          g = b[9],
          h = b[2],
          l = b[6];
      b = b[10];
      var m = c + f + b;
      0 < m ? (c = .5 / Math.sqrt(m + 1), this._w = .25 / c, this._x = (l - g) * c, this._y = (d - h) * c, this._z = (e - a) * c) : c > f && c > b ? (c = 2 * Math.sqrt(1 + c - f - b), this._w = (l - g) / c, this._x = .25 * c, this._y = (a + e) / c, this._z = (d + h) / c) : f > b ? (c = 2 * Math.sqrt(1 + f - c - b), this._w = (d - h) / c, this._x = (a + e) / c, this._y = .25 * c, this._z = (g + l) / c) : (c = 2 * Math.sqrt(1 + b - c - f), this._w = (e - a) / c, this._x = (d + h) / c, this._y = (g + l) / c, this._z = .25 * c);
      this.onChangeCallback();
      return this;
    },
    setFromUnitVectors: function () {
      var a = new p(),
          b;
      return function (c, d) {
        void 0 === a && (a = new p());
        b = c.dot(d) + 1;
        1E-6 > b ? (b = 0, Math.abs(c.x) > Math.abs(c.z) ? a.set(-c.y, c.x, 0) : a.set(0, -c.z, c.y)) : a.crossVectors(c, d);
        this._x = a.x;
        this._y = a.y;
        this._z = a.z;
        this._w = b;
        return this.normalize();
      };
    }(),
    inverse: function inverse() {
      return this.conjugate();
    },
    conjugate: function conjugate() {
      this._x *= -1;
      this._y *= -1;
      this._z *= -1;
      this.onChangeCallback();
      return this;
    },
    dot: function dot(a) {
      return this._x * a._x + this._y * a._y + this._z * a._z + this._w * a._w;
    },
    lengthSq: function lengthSq() {
      return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
    },
    length: function length() {
      return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
    },
    normalize: function normalize() {
      var a = this.length();
      0 === a ? (this._z = this._y = this._x = 0, this._w = 1) : (a = 1 / a, this._x *= a, this._y *= a, this._z *= a, this._w *= a);
      this.onChangeCallback();
      return this;
    },
    multiply: function multiply(a, b) {
      return void 0 !== b ? (console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."), this.multiplyQuaternions(a, b)) : this.multiplyQuaternions(this, a);
    },
    premultiply: function premultiply(a) {
      return this.multiplyQuaternions(a, this);
    },
    multiplyQuaternions: function multiplyQuaternions(a, b) {
      var c = a._x,
          d = a._y,
          e = a._z;
      a = a._w;
      var f = b._x,
          g = b._y,
          h = b._z;
      b = b._w;
      this._x = c * b + a * f + d * h - e * g;
      this._y = d * b + a * g + e * f - c * h;
      this._z = e * b + a * h + c * g - d * f;
      this._w = a * b - c * f - d * g - e * h;
      this.onChangeCallback();
      return this;
    },
    slerp: function slerp(a, b) {
      if (0 === b) return this;
      if (1 === b) return this.copy(a);
      var c = this._x,
          d = this._y,
          e = this._z,
          f = this._w,
          g = f * a._w + c * a._x + d * a._y + e * a._z;
      0 > g ? (this._w = -a._w, this._x = -a._x, this._y = -a._y, this._z = -a._z, g = -g) : this.copy(a);
      if (1 <= g) return this._w = f, this._x = c, this._y = d, this._z = e, this;
      a = Math.sqrt(1 - g * g);
      if (.001 > Math.abs(a)) return this._w = .5 * (f + this._w), this._x = .5 * (c + this._x), this._y = .5 * (d + this._y), this._z = .5 * (e + this._z), this;
      var h = Math.atan2(a, g);
      g = Math.sin((1 - b) * h) / a;
      b = Math.sin(b * h) / a;
      this._w = f * g + this._w * b;
      this._x = c * g + this._x * b;
      this._y = d * g + this._y * b;
      this._z = e * g + this._z * b;
      this.onChangeCallback();
      return this;
    },
    equals: function equals(a) {
      return a._x === this._x && a._y === this._y && a._z === this._z && a._w === this._w;
    },
    fromArray: function fromArray(a, b) {
      void 0 === b && (b = 0);
      this._x = a[b];
      this._y = a[b + 1];
      this._z = a[b + 2];
      this._w = a[b + 3];
      this.onChangeCallback();
      return this;
    },
    toArray: function toArray(a, b) {
      void 0 === a && (a = []);
      void 0 === b && (b = 0);
      a[b] = this._x;
      a[b + 1] = this._y;
      a[b + 2] = this._z;
      a[b + 3] = this._w;
      return a;
    },
    onChange: function onChange(a) {
      this.onChangeCallback = a;
      return this;
    },
    onChangeCallback: function onChangeCallback() {}
  });
  (0, _assign.default)(p.prototype, {
    isVector3: !0,
    set: function set(a, b, c) {
      this.x = a;
      this.y = b;
      this.z = c;
      return this;
    },
    setScalar: function setScalar(a) {
      this.z = this.y = this.x = a;
      return this;
    },
    setX: function setX(a) {
      this.x = a;
      return this;
    },
    setY: function setY(a) {
      this.y = a;
      return this;
    },
    setZ: function setZ(a) {
      this.z = a;
      return this;
    },
    setComponent: function setComponent(a, b) {
      switch (a) {
        case 0:
          this.x = b;
          break;

        case 1:
          this.y = b;
          break;

        case 2:
          this.z = b;
          break;

        default:
          throw Error("index is out of range: " + a);
      }

      return this;
    },
    getComponent: function getComponent(a) {
      switch (a) {
        case 0:
          return this.x;

        case 1:
          return this.y;

        case 2:
          return this.z;

        default:
          throw Error("index is out of range: " + a);
      }
    },
    clone: function clone() {
      return new this.constructor(this.x, this.y, this.z);
    },
    copy: function copy(a) {
      this.x = a.x;
      this.y = a.y;
      this.z = a.z;
      return this;
    },
    add: function add(a, b) {
      if (void 0 !== b) return console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(a, b);
      this.x += a.x;
      this.y += a.y;
      this.z += a.z;
      return this;
    },
    addScalar: function addScalar(a) {
      this.x += a;
      this.y += a;
      this.z += a;
      return this;
    },
    addVectors: function addVectors(a, b) {
      this.x = a.x + b.x;
      this.y = a.y + b.y;
      this.z = a.z + b.z;
      return this;
    },
    addScaledVector: function addScaledVector(a, b) {
      this.x += a.x * b;
      this.y += a.y * b;
      this.z += a.z * b;
      return this;
    },
    sub: function sub(a, b) {
      if (void 0 !== b) return console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(a, b);
      this.x -= a.x;
      this.y -= a.y;
      this.z -= a.z;
      return this;
    },
    subScalar: function subScalar(a) {
      this.x -= a;
      this.y -= a;
      this.z -= a;
      return this;
    },
    subVectors: function subVectors(a, b) {
      this.x = a.x - b.x;
      this.y = a.y - b.y;
      this.z = a.z - b.z;
      return this;
    },
    multiply: function multiply(a, b) {
      if (void 0 !== b) return console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."), this.multiplyVectors(a, b);
      this.x *= a.x;
      this.y *= a.y;
      this.z *= a.z;
      return this;
    },
    multiplyScalar: function multiplyScalar(a) {
      this.x *= a;
      this.y *= a;
      this.z *= a;
      return this;
    },
    multiplyVectors: function multiplyVectors(a, b) {
      this.x = a.x * b.x;
      this.y = a.y * b.y;
      this.z = a.z * b.z;
      return this;
    },
    applyEuler: function () {
      var a = new ja();
      return function (b) {
        b && b.isEuler || console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.");
        return this.applyQuaternion(a.setFromEuler(b));
      };
    }(),
    applyAxisAngle: function () {
      var a = new ja();
      return function (b, c) {
        return this.applyQuaternion(a.setFromAxisAngle(b, c));
      };
    }(),
    applyMatrix3: function applyMatrix3(a) {
      var b = this.x,
          c = this.y,
          d = this.z;
      a = a.elements;
      this.x = a[0] * b + a[3] * c + a[6] * d;
      this.y = a[1] * b + a[4] * c + a[7] * d;
      this.z = a[2] * b + a[5] * c + a[8] * d;
      return this;
    },
    applyMatrix4: function applyMatrix4(a) {
      var b = this.x,
          c = this.y,
          d = this.z;
      a = a.elements;
      var e = 1 / (a[3] * b + a[7] * c + a[11] * d + a[15]);
      this.x = (a[0] * b + a[4] * c + a[8] * d + a[12]) * e;
      this.y = (a[1] * b + a[5] * c + a[9] * d + a[13]) * e;
      this.z = (a[2] * b + a[6] * c + a[10] * d + a[14]) * e;
      return this;
    },
    applyQuaternion: function applyQuaternion(a) {
      var b = this.x,
          c = this.y,
          d = this.z,
          e = a.x,
          f = a.y,
          g = a.z;
      a = a.w;
      var h = a * b + f * d - g * c,
          l = a * c + g * b - e * d,
          m = a * d + e * c - f * b;
      b = -e * b - f * c - g * d;
      this.x = h * a + b * -e + l * -g - m * -f;
      this.y = l * a + b * -f + m * -e - h * -g;
      this.z = m * a + b * -g + h * -f - l * -e;
      return this;
    },
    project: function () {
      var a = new M();
      return function (b) {
        a.multiplyMatrices(b.projectionMatrix, a.getInverse(b.matrixWorld));
        return this.applyMatrix4(a);
      };
    }(),
    unproject: function () {
      var a = new M();
      return function (b) {
        a.multiplyMatrices(b.matrixWorld, a.getInverse(b.projectionMatrix));
        return this.applyMatrix4(a);
      };
    }(),
    transformDirection: function transformDirection(a) {
      var b = this.x,
          c = this.y,
          d = this.z;
      a = a.elements;
      this.x = a[0] * b + a[4] * c + a[8] * d;
      this.y = a[1] * b + a[5] * c + a[9] * d;
      this.z = a[2] * b + a[6] * c + a[10] * d;
      return this.normalize();
    },
    divide: function divide(a) {
      this.x /= a.x;
      this.y /= a.y;
      this.z /= a.z;
      return this;
    },
    divideScalar: function divideScalar(a) {
      return this.multiplyScalar(1 / a);
    },
    min: function min(a) {
      this.x = Math.min(this.x, a.x);
      this.y = Math.min(this.y, a.y);
      this.z = Math.min(this.z, a.z);
      return this;
    },
    max: function max(a) {
      this.x = Math.max(this.x, a.x);
      this.y = Math.max(this.y, a.y);
      this.z = Math.max(this.z, a.z);
      return this;
    },
    clamp: function clamp(a, b) {
      this.x = Math.max(a.x, Math.min(b.x, this.x));
      this.y = Math.max(a.y, Math.min(b.y, this.y));
      this.z = Math.max(a.z, Math.min(b.z, this.z));
      return this;
    },
    clampScalar: function () {
      var a = new p(),
          b = new p();
      return function (c, d) {
        a.set(c, c, c);
        b.set(d, d, d);
        return this.clamp(a, b);
      };
    }(),
    clampLength: function clampLength(a, b) {
      var c = this.length();
      return this.divideScalar(c || 1).multiplyScalar(Math.max(a, Math.min(b, c)));
    },
    floor: function floor() {
      this.x = Math.floor(this.x);
      this.y = Math.floor(this.y);
      this.z = Math.floor(this.z);
      return this;
    },
    ceil: function ceil() {
      this.x = Math.ceil(this.x);
      this.y = Math.ceil(this.y);
      this.z = Math.ceil(this.z);
      return this;
    },
    round: function round() {
      this.x = Math.round(this.x);
      this.y = Math.round(this.y);
      this.z = Math.round(this.z);
      return this;
    },
    roundToZero: function roundToZero() {
      this.x = 0 > this.x ? Math.ceil(this.x) : Math.floor(this.x);
      this.y = 0 > this.y ? Math.ceil(this.y) : Math.floor(this.y);
      this.z = 0 > this.z ? Math.ceil(this.z) : Math.floor(this.z);
      return this;
    },
    negate: function negate() {
      this.x = -this.x;
      this.y = -this.y;
      this.z = -this.z;
      return this;
    },
    dot: function dot(a) {
      return this.x * a.x + this.y * a.y + this.z * a.z;
    },
    lengthSq: function lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    },
    length: function length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    },
    manhattanLength: function manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    },
    normalize: function normalize() {
      return this.divideScalar(this.length() || 1);
    },
    setLength: function setLength(a) {
      return this.normalize().multiplyScalar(a);
    },
    lerp: function lerp(a, b) {
      this.x += (a.x - this.x) * b;
      this.y += (a.y - this.y) * b;
      this.z += (a.z - this.z) * b;
      return this;
    },
    lerpVectors: function lerpVectors(a, b, c) {
      return this.subVectors(b, a).multiplyScalar(c).add(a);
    },
    cross: function cross(a, b) {
      return void 0 !== b ? (console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."), this.crossVectors(a, b)) : this.crossVectors(this, a);
    },
    crossVectors: function crossVectors(a, b) {
      var c = a.x,
          d = a.y;
      a = a.z;
      var e = b.x,
          f = b.y;
      b = b.z;
      this.x = d * b - a * f;
      this.y = a * e - c * b;
      this.z = c * f - d * e;
      return this;
    },
    projectOnVector: function projectOnVector(a) {
      var b = a.dot(this) / a.lengthSq();
      return this.copy(a).multiplyScalar(b);
    },
    projectOnPlane: function () {
      var a = new p();
      return function (b) {
        a.copy(this).projectOnVector(b);
        return this.sub(a);
      };
    }(),
    reflect: function () {
      var a = new p();
      return function (b) {
        return this.sub(a.copy(b).multiplyScalar(2 * this.dot(b)));
      };
    }(),
    angleTo: function angleTo(a) {
      a = this.dot(a) / Math.sqrt(this.lengthSq() * a.lengthSq());
      return Math.acos(S.clamp(a, -1, 1));
    },
    distanceTo: function distanceTo(a) {
      return Math.sqrt(this.distanceToSquared(a));
    },
    distanceToSquared: function distanceToSquared(a) {
      var b = this.x - a.x,
          c = this.y - a.y;
      a = this.z - a.z;
      return b * b + c * c + a * a;
    },
    manhattanDistanceTo: function manhattanDistanceTo(a) {
      return Math.abs(this.x - a.x) + Math.abs(this.y - a.y) + Math.abs(this.z - a.z);
    },
    setFromSpherical: function setFromSpherical(a) {
      var b = Math.sin(a.phi) * a.radius;
      this.x = b * Math.sin(a.theta);
      this.y = Math.cos(a.phi) * a.radius;
      this.z = b * Math.cos(a.theta);
      return this;
    },
    setFromCylindrical: function setFromCylindrical(a) {
      this.x = a.radius * Math.sin(a.theta);
      this.y = a.y;
      this.z = a.radius * Math.cos(a.theta);
      return this;
    },
    setFromMatrixPosition: function setFromMatrixPosition(a) {
      a = a.elements;
      this.x = a[12];
      this.y = a[13];
      this.z = a[14];
      return this;
    },
    setFromMatrixScale: function setFromMatrixScale(a) {
      var b = this.setFromMatrixColumn(a, 0).length(),
          c = this.setFromMatrixColumn(a, 1).length();
      a = this.setFromMatrixColumn(a, 2).length();
      this.x = b;
      this.y = c;
      this.z = a;
      return this;
    },
    setFromMatrixColumn: function setFromMatrixColumn(a, b) {
      return this.fromArray(a.elements, 4 * b);
    },
    equals: function equals(a) {
      return a.x === this.x && a.y === this.y && a.z === this.z;
    },
    fromArray: function fromArray(a, b) {
      void 0 === b && (b = 0);
      this.x = a[b];
      this.y = a[b + 1];
      this.z = a[b + 2];
      return this;
    },
    toArray: function toArray(a, b) {
      void 0 === a && (a = []);
      void 0 === b && (b = 0);
      a[b] = this.x;
      a[b + 1] = this.y;
      a[b + 2] = this.z;
      return a;
    },
    fromBufferAttribute: function fromBufferAttribute(a, b, c) {
      void 0 !== c && console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute().");
      this.x = a.getX(b);
      this.y = a.getY(b);
      this.z = a.getZ(b);
      return this;
    }
  });
  (0, _assign.default)(sa.prototype, {
    isMatrix3: !0,
    set: function set(a, b, c, d, e, f, g, h, l) {
      var m = this.elements;
      m[0] = a;
      m[1] = d;
      m[2] = g;
      m[3] = b;
      m[4] = e;
      m[5] = h;
      m[6] = c;
      m[7] = f;
      m[8] = l;
      return this;
    },
    identity: function identity() {
      this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
      return this;
    },
    clone: function clone() {
      return new this.constructor().fromArray(this.elements);
    },
    copy: function copy(a) {
      var b = this.elements;
      a = a.elements;
      b[0] = a[0];
      b[1] = a[1];
      b[2] = a[2];
      b[3] = a[3];
      b[4] = a[4];
      b[5] = a[5];
      b[6] = a[6];
      b[7] = a[7];
      b[8] = a[8];
      return this;
    },
    setFromMatrix4: function setFromMatrix4(a) {
      a = a.elements;
      this.set(a[0], a[4], a[8], a[1], a[5], a[9], a[2], a[6], a[10]);
      return this;
    },
    applyToBufferAttribute: function () {
      var a = new p();
      return function (b) {
        for (var c = 0, d = b.count; c < d; c++) {
          a.x = b.getX(c), a.y = b.getY(c), a.z = b.getZ(c), a.applyMatrix3(this), b.setXYZ(c, a.x, a.y, a.z);
        }

        return b;
      };
    }(),
    multiply: function multiply(a) {
      return this.multiplyMatrices(this, a);
    },
    premultiply: function premultiply(a) {
      return this.multiplyMatrices(a, this);
    },
    multiplyMatrices: function multiplyMatrices(a, b) {
      var c = a.elements,
          d = b.elements;
      b = this.elements;
      a = c[0];
      var e = c[3],
          f = c[6],
          g = c[1],
          h = c[4],
          l = c[7],
          m = c[2],
          k = c[5];
      c = c[8];
      var n = d[0],
          p = d[3],
          r = d[6],
          q = d[1],
          v = d[4],
          x = d[7],
          y = d[2],
          w = d[5];
      d = d[8];
      b[0] = a * n + e * q + f * y;
      b[3] = a * p + e * v + f * w;
      b[6] = a * r + e * x + f * d;
      b[1] = g * n + h * q + l * y;
      b[4] = g * p + h * v + l * w;
      b[7] = g * r + h * x + l * d;
      b[2] = m * n + k * q + c * y;
      b[5] = m * p + k * v + c * w;
      b[8] = m * r + k * x + c * d;
      return this;
    },
    multiplyScalar: function multiplyScalar(a) {
      var b = this.elements;
      b[0] *= a;
      b[3] *= a;
      b[6] *= a;
      b[1] *= a;
      b[4] *= a;
      b[7] *= a;
      b[2] *= a;
      b[5] *= a;
      b[8] *= a;
      return this;
    },
    determinant: function determinant() {
      var a = this.elements,
          b = a[0],
          c = a[1],
          d = a[2],
          e = a[3],
          f = a[4],
          g = a[5],
          h = a[6],
          l = a[7];
      a = a[8];
      return b * f * a - b * g * l - c * e * a + c * g * h + d * e * l - d * f * h;
    },
    getInverse: function getInverse(a, b) {
      a && a.isMatrix4 && console.error("THREE.Matrix3: .getInverse() no longer takes a Matrix4 argument.");
      var c = a.elements;
      a = this.elements;
      var d = c[0],
          e = c[1],
          f = c[2],
          g = c[3],
          h = c[4],
          l = c[5],
          m = c[6],
          k = c[7];
      c = c[8];
      var n = c * h - l * k,
          p = l * m - c * g,
          r = k * g - h * m,
          q = d * n + e * p + f * r;

      if (0 === q) {
        if (!0 === b) throw Error("THREE.Matrix3: .getInverse() can't invert matrix, determinant is 0");
        console.warn("THREE.Matrix3: .getInverse() can't invert matrix, determinant is 0");
        return this.identity();
      }

      b = 1 / q;
      a[0] = n * b;
      a[1] = (f * k - c * e) * b;
      a[2] = (l * e - f * h) * b;
      a[3] = p * b;
      a[4] = (c * d - f * m) * b;
      a[5] = (f * g - l * d) * b;
      a[6] = r * b;
      a[7] = (e * m - k * d) * b;
      a[8] = (h * d - e * g) * b;
      return this;
    },
    transpose: function transpose() {
      var a = this.elements;
      var b = a[1];
      a[1] = a[3];
      a[3] = b;
      b = a[2];
      a[2] = a[6];
      a[6] = b;
      b = a[5];
      a[5] = a[7];
      a[7] = b;
      return this;
    },
    getNormalMatrix: function getNormalMatrix(a) {
      return this.setFromMatrix4(a).getInverse(this).transpose();
    },
    transposeIntoArray: function transposeIntoArray(a) {
      var b = this.elements;
      a[0] = b[0];
      a[1] = b[3];
      a[2] = b[6];
      a[3] = b[1];
      a[4] = b[4];
      a[5] = b[7];
      a[6] = b[2];
      a[7] = b[5];
      a[8] = b[8];
      return this;
    },
    setUvTransform: function setUvTransform(a, b, c, d, e, f, g) {
      var h = Math.cos(e);
      e = Math.sin(e);
      this.set(c * h, c * e, -c * (h * f + e * g) + f + a, -d * e, d * h, -d * (-e * f + h * g) + g + b, 0, 0, 1);
    },
    scale: function scale(a, b) {
      var c = this.elements;
      c[0] *= a;
      c[3] *= a;
      c[6] *= a;
      c[1] *= b;
      c[4] *= b;
      c[7] *= b;
      return this;
    },
    rotate: function rotate(a) {
      var b = Math.cos(a);
      a = Math.sin(a);
      var c = this.elements,
          d = c[0],
          e = c[3],
          f = c[6],
          g = c[1],
          h = c[4],
          l = c[7];
      c[0] = b * d + a * g;
      c[3] = b * e + a * h;
      c[6] = b * f + a * l;
      c[1] = -a * d + b * g;
      c[4] = -a * e + b * h;
      c[7] = -a * f + b * l;
      return this;
    },
    translate: function translate(a, b) {
      var c = this.elements;
      c[0] += a * c[2];
      c[3] += a * c[5];
      c[6] += a * c[8];
      c[1] += b * c[2];
      c[4] += b * c[5];
      c[7] += b * c[8];
      return this;
    },
    equals: function equals(a) {
      var b = this.elements;
      a = a.elements;

      for (var c = 0; 9 > c; c++) {
        if (b[c] !== a[c]) return !1;
      }

      return !0;
    },
    fromArray: function fromArray(a, b) {
      void 0 === b && (b = 0);

      for (var c = 0; 9 > c; c++) {
        this.elements[c] = a[c + b];
      }

      return this;
    },
    toArray: function toArray(a, b) {
      void 0 === a && (a = []);
      void 0 === b && (b = 0);
      var c = this.elements;
      a[b] = c[0];
      a[b + 1] = c[1];
      a[b + 2] = c[2];
      a[b + 3] = c[3];
      a[b + 4] = c[4];
      a[b + 5] = c[5];
      a[b + 6] = c[6];
      a[b + 7] = c[7];
      a[b + 8] = c[8];
      return a;
    }
  });
  var xf = 0;
  Y.DEFAULT_IMAGE = void 0;
  Y.DEFAULT_MAPPING = 300;
  Y.prototype = (0, _assign.default)((0, _create.default)(xa.prototype), {
    constructor: Y,
    isTexture: !0,
    clone: function clone() {
      return new this.constructor().copy(this);
    },
    copy: function copy(a) {
      this.name = a.name;
      this.image = a.image;
      this.mipmaps = a.mipmaps.slice(0);
      this.mapping = a.mapping;
      this.wrapS = a.wrapS;
      this.wrapT = a.wrapT;
      this.magFilter = a.magFilter;
      this.minFilter = a.minFilter;
      this.anisotropy = a.anisotropy;
      this.format = a.format;
      this.type = a.type;
      this.offset.copy(a.offset);
      this.repeat.copy(a.repeat);
      this.center.copy(a.center);
      this.rotation = a.rotation;
      this.matrixAutoUpdate = a.matrixAutoUpdate;
      this.matrix.copy(a.matrix);
      this.generateMipmaps = a.generateMipmaps;
      this.premultiplyAlpha = a.premultiplyAlpha;
      this.flipY = a.flipY;
      this.unpackAlignment = a.unpackAlignment;
      this.encoding = a.encoding;
      return this;
    },
    toJSON: function toJSON(a) {
      var b = void 0 === a || "string" === typeof a;
      if (!b && void 0 !== a.textures[this.uuid]) return a.textures[this.uuid];
      var c = {
        metadata: {
          version: 4.5,
          type: "Texture",
          generator: "Texture.toJSON"
        },
        uuid: this.uuid,
        name: this.name,
        mapping: this.mapping,
        repeat: [this.repeat.x, this.repeat.y],
        offset: [this.offset.x, this.offset.y],
        center: [this.center.x, this.center.y],
        rotation: this.rotation,
        wrap: [this.wrapS, this.wrapT],
        format: this.format,
        minFilter: this.minFilter,
        magFilter: this.magFilter,
        anisotropy: this.anisotropy,
        flipY: this.flipY
      };

      if (void 0 !== this.image) {
        var d = this.image;
        void 0 === d.uuid && (d.uuid = S.generateUUID());

        if (!b && void 0 === a.images[d.uuid]) {
          var e = a.images,
              f = d.uuid,
              g = d.uuid;
          if (d instanceof HTMLCanvasElement) var h = d;else {
            h = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
            h.width = d.width;
            h.height = d.height;
            var l = h.getContext("2d");
            d instanceof ImageData ? l.putImageData(d, 0, 0) : l.drawImage(d, 0, 0, d.width, d.height);
          }
          h = 2048 < h.width || 2048 < h.height ? h.toDataURL("image/jpeg", .6) : h.toDataURL("image/png");
          e[f] = {
            uuid: g,
            url: h
          };
        }

        c.image = d.uuid;
      }

      b || (a.textures[this.uuid] = c);
      return c;
    },
    dispose: function dispose() {
      this.dispatchEvent({
        type: "dispose"
      });
    },
    transformUv: function transformUv(a) {
      if (300 === this.mapping) {
        a.applyMatrix3(this.matrix);
        if (0 > a.x || 1 < a.x) switch (this.wrapS) {
          case 1E3:
            a.x -= Math.floor(a.x);
            break;

          case 1001:
            a.x = 0 > a.x ? 0 : 1;
            break;

          case 1002:
            a.x = 1 === Math.abs(Math.floor(a.x) % 2) ? Math.ceil(a.x) - a.x : a.x - Math.floor(a.x);
        }
        if (0 > a.y || 1 < a.y) switch (this.wrapT) {
          case 1E3:
            a.y -= Math.floor(a.y);
            break;

          case 1001:
            a.y = 0 > a.y ? 0 : 1;
            break;

          case 1002:
            a.y = 1 === Math.abs(Math.floor(a.y) % 2) ? Math.ceil(a.y) - a.y : a.y - Math.floor(a.y);
        }
        this.flipY && (a.y = 1 - a.y);
      }
    }
  });
  (0, _defineProperty.default)(Y.prototype, "needsUpdate", {
    set: function set(a) {
      !0 === a && this.version++;
    }
  });
  (0, _assign.default)(ea.prototype, {
    isVector4: !0,
    set: function set(a, b, c, d) {
      this.x = a;
      this.y = b;
      this.z = c;
      this.w = d;
      return this;
    },
    setScalar: function setScalar(a) {
      this.w = this.z = this.y = this.x = a;
      return this;
    },
    setX: function setX(a) {
      this.x = a;
      return this;
    },
    setY: function setY(a) {
      this.y = a;
      return this;
    },
    setZ: function setZ(a) {
      this.z = a;
      return this;
    },
    setW: function setW(a) {
      this.w = a;
      return this;
    },
    setComponent: function setComponent(a, b) {
      switch (a) {
        case 0:
          this.x = b;
          break;

        case 1:
          this.y = b;
          break;

        case 2:
          this.z = b;
          break;

        case 3:
          this.w = b;
          break;

        default:
          throw Error("index is out of range: " + a);
      }

      return this;
    },
    getComponent: function getComponent(a) {
      switch (a) {
        case 0:
          return this.x;

        case 1:
          return this.y;

        case 2:
          return this.z;

        case 3:
          return this.w;

        default:
          throw Error("index is out of range: " + a);
      }
    },
    clone: function clone() {
      return new this.constructor(this.x, this.y, this.z, this.w);
    },
    copy: function copy(a) {
      this.x = a.x;
      this.y = a.y;
      this.z = a.z;
      this.w = void 0 !== a.w ? a.w : 1;
      return this;
    },
    add: function add(a, b) {
      if (void 0 !== b) return console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(a, b);
      this.x += a.x;
      this.y += a.y;
      this.z += a.z;
      this.w += a.w;
      return this;
    },
    addScalar: function addScalar(a) {
      this.x += a;
      this.y += a;
      this.z += a;
      this.w += a;
      return this;
    },
    addVectors: function addVectors(a, b) {
      this.x = a.x + b.x;
      this.y = a.y + b.y;
      this.z = a.z + b.z;
      this.w = a.w + b.w;
      return this;
    },
    addScaledVector: function addScaledVector(a, b) {
      this.x += a.x * b;
      this.y += a.y * b;
      this.z += a.z * b;
      this.w += a.w * b;
      return this;
    },
    sub: function sub(a, b) {
      if (void 0 !== b) return console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(a, b);
      this.x -= a.x;
      this.y -= a.y;
      this.z -= a.z;
      this.w -= a.w;
      return this;
    },
    subScalar: function subScalar(a) {
      this.x -= a;
      this.y -= a;
      this.z -= a;
      this.w -= a;
      return this;
    },
    subVectors: function subVectors(a, b) {
      this.x = a.x - b.x;
      this.y = a.y - b.y;
      this.z = a.z - b.z;
      this.w = a.w - b.w;
      return this;
    },
    multiplyScalar: function multiplyScalar(a) {
      this.x *= a;
      this.y *= a;
      this.z *= a;
      this.w *= a;
      return this;
    },
    applyMatrix4: function applyMatrix4(a) {
      var b = this.x,
          c = this.y,
          d = this.z,
          e = this.w;
      a = a.elements;
      this.x = a[0] * b + a[4] * c + a[8] * d + a[12] * e;
      this.y = a[1] * b + a[5] * c + a[9] * d + a[13] * e;
      this.z = a[2] * b + a[6] * c + a[10] * d + a[14] * e;
      this.w = a[3] * b + a[7] * c + a[11] * d + a[15] * e;
      return this;
    },
    divideScalar: function divideScalar(a) {
      return this.multiplyScalar(1 / a);
    },
    setAxisAngleFromQuaternion: function setAxisAngleFromQuaternion(a) {
      this.w = 2 * Math.acos(a.w);
      var b = Math.sqrt(1 - a.w * a.w);
      1E-4 > b ? (this.x = 1, this.z = this.y = 0) : (this.x = a.x / b, this.y = a.y / b, this.z = a.z / b);
      return this;
    },
    setAxisAngleFromRotationMatrix: function setAxisAngleFromRotationMatrix(a) {
      a = a.elements;
      var b = a[0];
      var c = a[4];
      var d = a[8],
          e = a[1],
          f = a[5],
          g = a[9];
      var h = a[2];
      var l = a[6];
      var m = a[10];

      if (.01 > Math.abs(c - e) && .01 > Math.abs(d - h) && .01 > Math.abs(g - l)) {
        if (.1 > Math.abs(c + e) && .1 > Math.abs(d + h) && .1 > Math.abs(g + l) && .1 > Math.abs(b + f + m - 3)) return this.set(1, 0, 0, 0), this;
        a = Math.PI;
        b = (b + 1) / 2;
        f = (f + 1) / 2;
        m = (m + 1) / 2;
        c = (c + e) / 4;
        d = (d + h) / 4;
        g = (g + l) / 4;
        b > f && b > m ? .01 > b ? (l = 0, c = h = .707106781) : (l = Math.sqrt(b), h = c / l, c = d / l) : f > m ? .01 > f ? (l = .707106781, h = 0, c = .707106781) : (h = Math.sqrt(f), l = c / h, c = g / h) : .01 > m ? (h = l = .707106781, c = 0) : (c = Math.sqrt(m), l = d / c, h = g / c);
        this.set(l, h, c, a);
        return this;
      }

      a = Math.sqrt((l - g) * (l - g) + (d - h) * (d - h) + (e - c) * (e - c));
      .001 > Math.abs(a) && (a = 1);
      this.x = (l - g) / a;
      this.y = (d - h) / a;
      this.z = (e - c) / a;
      this.w = Math.acos((b + f + m - 1) / 2);
      return this;
    },
    min: function min(a) {
      this.x = Math.min(this.x, a.x);
      this.y = Math.min(this.y, a.y);
      this.z = Math.min(this.z, a.z);
      this.w = Math.min(this.w, a.w);
      return this;
    },
    max: function max(a) {
      this.x = Math.max(this.x, a.x);
      this.y = Math.max(this.y, a.y);
      this.z = Math.max(this.z, a.z);
      this.w = Math.max(this.w, a.w);
      return this;
    },
    clamp: function clamp(a, b) {
      this.x = Math.max(a.x, Math.min(b.x, this.x));
      this.y = Math.max(a.y, Math.min(b.y, this.y));
      this.z = Math.max(a.z, Math.min(b.z, this.z));
      this.w = Math.max(a.w, Math.min(b.w, this.w));
      return this;
    },
    clampScalar: function () {
      var a, b;
      return function (c, d) {
        void 0 === a && (a = new ea(), b = new ea());
        a.set(c, c, c, c);
        b.set(d, d, d, d);
        return this.clamp(a, b);
      };
    }(),
    clampLength: function clampLength(a, b) {
      var c = this.length();
      return this.divideScalar(c || 1).multiplyScalar(Math.max(a, Math.min(b, c)));
    },
    floor: function floor() {
      this.x = Math.floor(this.x);
      this.y = Math.floor(this.y);
      this.z = Math.floor(this.z);
      this.w = Math.floor(this.w);
      return this;
    },
    ceil: function ceil() {
      this.x = Math.ceil(this.x);
      this.y = Math.ceil(this.y);
      this.z = Math.ceil(this.z);
      this.w = Math.ceil(this.w);
      return this;
    },
    round: function round() {
      this.x = Math.round(this.x);
      this.y = Math.round(this.y);
      this.z = Math.round(this.z);
      this.w = Math.round(this.w);
      return this;
    },
    roundToZero: function roundToZero() {
      this.x = 0 > this.x ? Math.ceil(this.x) : Math.floor(this.x);
      this.y = 0 > this.y ? Math.ceil(this.y) : Math.floor(this.y);
      this.z = 0 > this.z ? Math.ceil(this.z) : Math.floor(this.z);
      this.w = 0 > this.w ? Math.ceil(this.w) : Math.floor(this.w);
      return this;
    },
    negate: function negate() {
      this.x = -this.x;
      this.y = -this.y;
      this.z = -this.z;
      this.w = -this.w;
      return this;
    },
    dot: function dot(a) {
      return this.x * a.x + this.y * a.y + this.z * a.z + this.w * a.w;
    },
    lengthSq: function lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    },
    length: function length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    },
    manhattanLength: function manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
    },
    normalize: function normalize() {
      return this.divideScalar(this.length() || 1);
    },
    setLength: function setLength(a) {
      return this.normalize().multiplyScalar(a);
    },
    lerp: function lerp(a, b) {
      this.x += (a.x - this.x) * b;
      this.y += (a.y - this.y) * b;
      this.z += (a.z - this.z) * b;
      this.w += (a.w - this.w) * b;
      return this;
    },
    lerpVectors: function lerpVectors(a, b, c) {
      return this.subVectors(b, a).multiplyScalar(c).add(a);
    },
    equals: function equals(a) {
      return a.x === this.x && a.y === this.y && a.z === this.z && a.w === this.w;
    },
    fromArray: function fromArray(a, b) {
      void 0 === b && (b = 0);
      this.x = a[b];
      this.y = a[b + 1];
      this.z = a[b + 2];
      this.w = a[b + 3];
      return this;
    },
    toArray: function toArray(a, b) {
      void 0 === a && (a = []);
      void 0 === b && (b = 0);
      a[b] = this.x;
      a[b + 1] = this.y;
      a[b + 2] = this.z;
      a[b + 3] = this.w;
      return a;
    },
    fromBufferAttribute: function fromBufferAttribute(a, b, c) {
      void 0 !== c && console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute().");
      this.x = a.getX(b);
      this.y = a.getY(b);
      this.z = a.getZ(b);
      this.w = a.getW(b);
      return this;
    }
  });
  hb.prototype = (0, _assign.default)((0, _create.default)(xa.prototype), {
    constructor: hb,
    isWebGLRenderTarget: !0,
    setSize: function setSize(a, b) {
      if (this.width !== a || this.height !== b) this.width = a, this.height = b, this.dispose();
      this.viewport.set(0, 0, a, b);
      this.scissor.set(0, 0, a, b);
    },
    clone: function clone() {
      return new this.constructor().copy(this);
    },
    copy: function copy(a) {
      this.width = a.width;
      this.height = a.height;
      this.viewport.copy(a.viewport);
      this.texture = a.texture.clone();
      this.depthBuffer = a.depthBuffer;
      this.stencilBuffer = a.stencilBuffer;
      this.depthTexture = a.depthTexture;
      return this;
    },
    dispose: function dispose() {
      this.dispatchEvent({
        type: "dispose"
      });
    }
  });
  Ib.prototype = (0, _create.default)(hb.prototype);
  Ib.prototype.constructor = Ib;
  Ib.prototype.isWebGLRenderTargetCube = !0;
  ib.prototype = (0, _create.default)(Y.prototype);
  ib.prototype.constructor = ib;
  ib.prototype.isDataTexture = !0;
  (0, _assign.default)(Va.prototype, {
    isBox3: !0,
    set: function set(a, b) {
      this.min.copy(a);
      this.max.copy(b);
      return this;
    },
    setFromArray: function setFromArray(a) {
      for (var b = Infinity, c = Infinity, d = Infinity, e = -Infinity, f = -Infinity, g = -Infinity, h = 0, l = a.length; h < l; h += 3) {
        var m = a[h],
            k = a[h + 1],
            n = a[h + 2];
        m < b && (b = m);
        k < c && (c = k);
        n < d && (d = n);
        m > e && (e = m);
        k > f && (f = k);
        n > g && (g = n);
      }

      this.min.set(b, c, d);
      this.max.set(e, f, g);
      return this;
    },
    setFromBufferAttribute: function setFromBufferAttribute(a) {
      for (var b = Infinity, c = Infinity, d = Infinity, e = -Infinity, f = -Infinity, g = -Infinity, h = 0, l = a.count; h < l; h++) {
        var m = a.getX(h),
            k = a.getY(h),
            n = a.getZ(h);
        m < b && (b = m);
        k < c && (c = k);
        n < d && (d = n);
        m > e && (e = m);
        k > f && (f = k);
        n > g && (g = n);
      }

      this.min.set(b, c, d);
      this.max.set(e, f, g);
      return this;
    },
    setFromPoints: function setFromPoints(a) {
      this.makeEmpty();

      for (var b = 0, c = a.length; b < c; b++) {
        this.expandByPoint(a[b]);
      }

      return this;
    },
    setFromCenterAndSize: function () {
      var a = new p();
      return function (b, c) {
        c = a.copy(c).multiplyScalar(.5);
        this.min.copy(b).sub(c);
        this.max.copy(b).add(c);
        return this;
      };
    }(),
    setFromObject: function setFromObject(a) {
      this.makeEmpty();
      return this.expandByObject(a);
    },
    clone: function clone() {
      return new this.constructor().copy(this);
    },
    copy: function copy(a) {
      this.min.copy(a.min);
      this.max.copy(a.max);
      return this;
    },
    makeEmpty: function makeEmpty() {
      this.min.x = this.min.y = this.min.z = Infinity;
      this.max.x = this.max.y = this.max.z = -Infinity;
      return this;
    },
    isEmpty: function isEmpty() {
      return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
    },
    getCenter: function getCenter(a) {
      void 0 === a && (console.warn("THREE.Box3: .getCenter() target is now required"), a = new p());
      return this.isEmpty() ? a.set(0, 0, 0) : a.addVectors(this.min, this.max).multiplyScalar(.5);
    },
    getSize: function getSize(a) {
      void 0 === a && (console.warn("THREE.Box3: .getSize() target is now required"), a = new p());
      return this.isEmpty() ? a.set(0, 0, 0) : a.subVectors(this.max, this.min);
    },
    expandByPoint: function expandByPoint(a) {
      this.min.min(a);
      this.max.max(a);
      return this;
    },
    expandByVector: function expandByVector(a) {
      this.min.sub(a);
      this.max.add(a);
      return this;
    },
    expandByScalar: function expandByScalar(a) {
      this.min.addScalar(-a);
      this.max.addScalar(a);
      return this;
    },
    expandByObject: function () {
      function a(a) {
        var f = a.geometry;
        if (void 0 !== f) if (f.isGeometry) for (f = f.vertices, c = 0, d = f.length; c < d; c++) {
          e.copy(f[c]), e.applyMatrix4(a.matrixWorld), b.expandByPoint(e);
        } else if (f.isBufferGeometry && (f = f.attributes.position, void 0 !== f)) for (c = 0, d = f.count; c < d; c++) {
          e.fromBufferAttribute(f, c).applyMatrix4(a.matrixWorld), b.expandByPoint(e);
        }
      }

      var b,
          c,
          d,
          e = new p();
      return function (c) {
        b = this;
        c.updateMatrixWorld(!0);
        c.traverse(a);
        return this;
      };
    }(),
    containsPoint: function containsPoint(a) {
      return a.x < this.min.x || a.x > this.max.x || a.y < this.min.y || a.y > this.max.y || a.z < this.min.z || a.z > this.max.z ? !1 : !0;
    },
    containsBox: function containsBox(a) {
      return this.min.x <= a.min.x && a.max.x <= this.max.x && this.min.y <= a.min.y && a.max.y <= this.max.y && this.min.z <= a.min.z && a.max.z <= this.max.z;
    },
    getParameter: function getParameter(a, b) {
      void 0 === b && (console.warn("THREE.Box3: .getParameter() target is now required"), b = new p());
      return b.set((a.x - this.min.x) / (this.max.x - this.min.x), (a.y - this.min.y) / (this.max.y - this.min.y), (a.z - this.min.z) / (this.max.z - this.min.z));
    },
    intersectsBox: function intersectsBox(a) {
      return a.max.x < this.min.x || a.min.x > this.max.x || a.max.y < this.min.y || a.min.y > this.max.y || a.max.z < this.min.z || a.min.z > this.max.z ? !1 : !0;
    },
    intersectsSphere: function () {
      var a = new p();
      return function (b) {
        this.clampPoint(b.center, a);
        return a.distanceToSquared(b.center) <= b.radius * b.radius;
      };
    }(),
    intersectsPlane: function intersectsPlane(a) {
      if (0 < a.normal.x) {
        var b = a.normal.x * this.min.x;
        var c = a.normal.x * this.max.x;
      } else b = a.normal.x * this.max.x, c = a.normal.x * this.min.x;

      0 < a.normal.y ? (b += a.normal.y * this.min.y, c += a.normal.y * this.max.y) : (b += a.normal.y * this.max.y, c += a.normal.y * this.min.y);
      0 < a.normal.z ? (b += a.normal.z * this.min.z, c += a.normal.z * this.max.z) : (b += a.normal.z * this.max.z, c += a.normal.z * this.min.z);
      return b <= a.constant && c >= a.constant;
    },
    intersectsTriangle: function () {
      function a(a) {
        var e;
        var f = 0;

        for (e = a.length - 3; f <= e; f += 3) {
          h.fromArray(a, f);
          var g = m.x * Math.abs(h.x) + m.y * Math.abs(h.y) + m.z * Math.abs(h.z),
              l = b.dot(h),
              k = c.dot(h),
              n = d.dot(h);
          if (Math.max(-Math.max(l, k, n), Math.min(l, k, n)) > g) return !1;
        }

        return !0;
      }

      var b = new p(),
          c = new p(),
          d = new p(),
          e = new p(),
          f = new p(),
          g = new p(),
          h = new p(),
          l = new p(),
          m = new p(),
          k = new p();
      return function (h) {
        if (this.isEmpty()) return !1;
        this.getCenter(l);
        m.subVectors(this.max, l);
        b.subVectors(h.a, l);
        c.subVectors(h.b, l);
        d.subVectors(h.c, l);
        e.subVectors(c, b);
        f.subVectors(d, c);
        g.subVectors(b, d);
        h = [0, -e.z, e.y, 0, -f.z, f.y, 0, -g.z, g.y, e.z, 0, -e.x, f.z, 0, -f.x, g.z, 0, -g.x, -e.y, e.x, 0, -f.y, f.x, 0, -g.y, g.x, 0];
        if (!a(h)) return !1;
        h = [1, 0, 0, 0, 1, 0, 0, 0, 1];
        if (!a(h)) return !1;
        k.crossVectors(e, f);
        h = [k.x, k.y, k.z];
        return a(h);
      };
    }(),
    clampPoint: function clampPoint(a, b) {
      void 0 === b && (console.warn("THREE.Box3: .clampPoint() target is now required"), b = new p());
      return b.copy(a).clamp(this.min, this.max);
    },
    distanceToPoint: function () {
      var a = new p();
      return function (b) {
        return a.copy(b).clamp(this.min, this.max).sub(b).length();
      };
    }(),
    getBoundingSphere: function () {
      var a = new p();
      return function (b) {
        void 0 === b && (console.warn("THREE.Box3: .getBoundingSphere() target is now required"), b = new Ea());
        this.getCenter(b.center);
        b.radius = .5 * this.getSize(a).length();
        return b;
      };
    }(),
    intersect: function intersect(a) {
      this.min.max(a.min);
      this.max.min(a.max);
      this.isEmpty() && this.makeEmpty();
      return this;
    },
    union: function union(a) {
      this.min.min(a.min);
      this.max.max(a.max);
      return this;
    },
    applyMatrix4: function () {
      var a = [new p(), new p(), new p(), new p(), new p(), new p(), new p(), new p()];
      return function (b) {
        if (this.isEmpty()) return this;
        a[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(b);
        a[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(b);
        a[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(b);
        a[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(b);
        a[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(b);
        a[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(b);
        a[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(b);
        a[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(b);
        this.setFromPoints(a);
        return this;
      };
    }(),
    translate: function translate(a) {
      this.min.add(a);
      this.max.add(a);
      return this;
    },
    equals: function equals(a) {
      return a.min.equals(this.min) && a.max.equals(this.max);
    }
  });
  (0, _assign.default)(Ea.prototype, {
    set: function set(a, b) {
      this.center.copy(a);
      this.radius = b;
      return this;
    },
    setFromPoints: function () {
      var a = new Va();
      return function (b, c) {
        var d = this.center;
        void 0 !== c ? d.copy(c) : a.setFromPoints(b).getCenter(d);

        for (var e = c = 0, f = b.length; e < f; e++) {
          c = Math.max(c, d.distanceToSquared(b[e]));
        }

        this.radius = Math.sqrt(c);
        return this;
      };
    }(),
    clone: function clone() {
      return new this.constructor().copy(this);
    },
    copy: function copy(a) {
      this.center.copy(a.center);
      this.radius = a.radius;
      return this;
    },
    empty: function empty() {
      return 0 >= this.radius;
    },
    containsPoint: function containsPoint(a) {
      return a.distanceToSquared(this.center) <= this.radius * this.radius;
    },
    distanceToPoint: function distanceToPoint(a) {
      return a.distanceTo(this.center) - this.radius;
    },
    intersectsSphere: function intersectsSphere(a) {
      var b = this.radius + a.radius;
      return a.center.distanceToSquared(this.center) <= b * b;
    },
    intersectsBox: function intersectsBox(a) {
      return a.intersectsSphere(this);
    },
    intersectsPlane: function intersectsPlane(a) {
      return Math.abs(a.distanceToPoint(this.center)) <= this.radius;
    },
    clampPoint: function clampPoint(a, b) {
      var c = this.center.distanceToSquared(a);
      void 0 === b && (console.warn("THREE.Sphere: .clampPoint() target is now required"), b = new p());
      b.copy(a);
      c > this.radius * this.radius && (b.sub(this.center).normalize(), b.multiplyScalar(this.radius).add(this.center));
      return b;
    },
    getBoundingBox: function getBoundingBox(a) {
      void 0 === a && (console.warn("THREE.Sphere: .getBoundingBox() target is now required"), a = new Va());
      a.set(this.center, this.center);
      a.expandByScalar(this.radius);
      return a;
    },
    applyMatrix4: function applyMatrix4(a) {
      this.center.applyMatrix4(a);
      this.radius *= a.getMaxScaleOnAxis();
      return this;
    },
    translate: function translate(a) {
      this.center.add(a);
      return this;
    },
    equals: function equals(a) {
      return a.center.equals(this.center) && a.radius === this.radius;
    }
  });
  (0, _assign.default)(Fa.prototype, {
    set: function set(a, b) {
      this.normal.copy(a);
      this.constant = b;
      return this;
    },
    setComponents: function setComponents(a, b, c, d) {
      this.normal.set(a, b, c);
      this.constant = d;
      return this;
    },
    setFromNormalAndCoplanarPoint: function setFromNormalAndCoplanarPoint(a, b) {
      this.normal.copy(a);
      this.constant = -b.dot(this.normal);
      return this;
    },
    setFromCoplanarPoints: function () {
      var a = new p(),
          b = new p();
      return function (c, d, e) {
        d = a.subVectors(e, d).cross(b.subVectors(c, d)).normalize();
        this.setFromNormalAndCoplanarPoint(d, c);
        return this;
      };
    }(),
    clone: function clone() {
      return new this.constructor().copy(this);
    },
    copy: function copy(a) {
      this.normal.copy(a.normal);
      this.constant = a.constant;
      return this;
    },
    normalize: function normalize() {
      var a = 1 / this.normal.length();
      this.normal.multiplyScalar(a);
      this.constant *= a;
      return this;
    },
    negate: function negate() {
      this.constant *= -1;
      this.normal.negate();
      return this;
    },
    distanceToPoint: function distanceToPoint(a) {
      return this.normal.dot(a) + this.constant;
    },
    distanceToSphere: function distanceToSphere(a) {
      return this.distanceToPoint(a.center) - a.radius;
    },
    projectPoint: function projectPoint(a, b) {
      void 0 === b && (console.warn("THREE.Plane: .projectPoint() target is now required"), b = new p());
      return b.copy(this.normal).multiplyScalar(-this.distanceToPoint(a)).add(a);
    },
    intersectLine: function () {
      var a = new p();
      return function (b, c) {
        void 0 === c && (console.warn("THREE.Plane: .intersectLine() target is now required"), c = new p());
        var d = b.delta(a),
            e = this.normal.dot(d);

        if (0 === e) {
          if (0 === this.distanceToPoint(b.start)) return c.copy(b.start);
        } else if (e = -(b.start.dot(this.normal) + this.constant) / e, !(0 > e || 1 < e)) return c.copy(d).multiplyScalar(e).add(b.start);
      };
    }(),
    intersectsLine: function intersectsLine(a) {
      var b = this.distanceToPoint(a.start);
      a = this.distanceToPoint(a.end);
      return 0 > b && 0 < a || 0 > a && 0 < b;
    },
    intersectsBox: function intersectsBox(a) {
      return a.intersectsPlane(this);
    },
    intersectsSphere: function intersectsSphere(a) {
      return a.intersectsPlane(this);
    },
    coplanarPoint: function coplanarPoint(a) {
      void 0 === a && (console.warn("THREE.Plane: .coplanarPoint() target is now required"), a = new p());
      return a.copy(this.normal).multiplyScalar(-this.constant);
    },
    applyMatrix4: function () {
      var a = new p(),
          b = new sa();
      return function (c, d) {
        d = d || b.getNormalMatrix(c);
        c = this.coplanarPoint(a).applyMatrix4(c);
        d = this.normal.applyMatrix3(d).normalize();
        this.constant = -c.dot(d);
        return this;
      };
    }(),
    translate: function translate(a) {
      this.constant -= a.dot(this.normal);
      return this;
    },
    equals: function equals(a) {
      return a.normal.equals(this.normal) && a.constant === this.constant;
    }
  });
  (0, _assign.default)(ld.prototype, {
    set: function set(a, b, c, d, e, f) {
      var g = this.planes;
      g[0].copy(a);
      g[1].copy(b);
      g[2].copy(c);
      g[3].copy(d);
      g[4].copy(e);
      g[5].copy(f);
      return this;
    },
    clone: function clone() {
      return new this.constructor().copy(this);
    },
    copy: function copy(a) {
      for (var b = this.planes, c = 0; 6 > c; c++) {
        b[c].copy(a.planes[c]);
      }

      return this;
    },
    setFromMatrix: function setFromMatrix(a) {
      var b = this.planes,
          c = a.elements;
      a = c[0];
      var d = c[1],
          e = c[2],
          f = c[3],
          g = c[4],
          h = c[5],
          l = c[6],
          m = c[7],
          k = c[8],
          n = c[9],
          p = c[10],
          r = c[11],
          q = c[12],
          v = c[13],
          x = c[14];
      c = c[15];
      b[0].setComponents(f - a, m - g, r - k, c - q).normalize();
      b[1].setComponents(f + a, m + g, r + k, c + q).normalize();
      b[2].setComponents(f + d, m + h, r + n, c + v).normalize();
      b[3].setComponents(f - d, m - h, r - n, c - v).normalize();
      b[4].setComponents(f - e, m - l, r - p, c - x).normalize();
      b[5].setComponents(f + e, m + l, r + p, c + x).normalize();
      return this;
    },
    intersectsObject: function () {
      var a = new Ea();
      return function (b) {
        var c = b.geometry;
        null === c.boundingSphere && c.computeBoundingSphere();
        a.copy(c.boundingSphere).applyMatrix4(b.matrixWorld);
        return this.intersectsSphere(a);
      };
    }(),
    intersectsSprite: function () {
      var a = new Ea();
      return function (b) {
        a.center.set(0, 0, 0);
        a.radius = .7071067811865476;
        a.applyMatrix4(b.matrixWorld);
        return this.intersectsSphere(a);
      };
    }(),
    intersectsSphere: function intersectsSphere(a) {
      var b = this.planes,
          c = a.center;
      a = -a.radius;

      for (var d = 0; 6 > d; d++) {
        if (b[d].distanceToPoint(c) < a) return !1;
      }

      return !0;
    },
    intersectsBox: function () {
      var a = new p(),
          b = new p();
      return function (c) {
        for (var d = this.planes, e = 0; 6 > e; e++) {
          var f = d[e];
          a.x = 0 < f.normal.x ? c.min.x : c.max.x;
          b.x = 0 < f.normal.x ? c.max.x : c.min.x;
          a.y = 0 < f.normal.y ? c.min.y : c.max.y;
          b.y = 0 < f.normal.y ? c.max.y : c.min.y;
          a.z = 0 < f.normal.z ? c.min.z : c.max.z;
          b.z = 0 < f.normal.z ? c.max.z : c.min.z;
          var g = f.distanceToPoint(a);
          f = f.distanceToPoint(b);
          if (0 > g && 0 > f) return !1;
        }

        return !0;
      };
    }(),
    containsPoint: function containsPoint(a) {
      for (var b = this.planes, c = 0; 6 > c; c++) {
        if (0 > b[c].distanceToPoint(a)) return !1;
      }

      return !0;
    }
  });
  var V = {
    alphamap_fragment: "#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n#endif\n",
    alphamap_pars_fragment: "#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif\n",
    alphatest_fragment: "#ifdef ALPHATEST\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n#endif\n",
    aomap_fragment: "#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n\t#endif\n#endif\n",
    aomap_pars_fragment: "#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif",
    begin_vertex: "\nvec3 transformed = vec3( position );\n",
    beginnormal_vertex: "\nvec3 objectNormal = vec3( normal );\n",
    bsdfs: "float punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\tif( decayExponent > 0.0 ) {\n#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\t\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\t\tfloat maxDistanceCutoffFactor = pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t\treturn distanceFalloff * maxDistanceCutoffFactor;\n#else\n\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n#endif\n\t}\n\treturn 1.0;\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n}\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\tfloat gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\treturn 1.0 / ( gl * gv );\n}\nfloat G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNL = saturate( dot( geometry.normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( G * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE  = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS  = 0.5 / LUT_SIZE;\n\tfloat dotNV = saturate( dot( N, V ) );\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\treturn vec3( result );\n}\nvec3 BRDF_Specular_GGX_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\tvec2 AB = vec2( -1.04, 1.04 ) * a004 + r.zw;\n\treturn specularColor * AB.x + AB.y;\n}\nfloat G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n\treturn ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );\n}\nfloat BlinnExponentToGGXRoughness( const in float blinnExponent ) {\n\treturn sqrt( 2.0 / ( blinnExponent + 2.0 ) );\n}\n",
    bumpmap_pars_fragment: "#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\t\tvec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );\n\t\tvec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 );\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif\n",
    clipping_planes_fragment: "#if NUM_CLIPPING_PLANES > 0\n\tvec4 plane;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\tplane = clippingPlanes[ i ];\n\t\tif ( dot( vViewPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\t#pragma unroll_loop\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vViewPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\tif ( clipped ) discard;\n\t#endif\n#endif\n",
    clipping_planes_pars_fragment: "#if NUM_CLIPPING_PLANES > 0\n\t#if ! defined( PHYSICAL ) && ! defined( PHONG )\n\t\tvarying vec3 vViewPosition;\n\t#endif\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif\n",
    clipping_planes_pars_vertex: "#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG )\n\tvarying vec3 vViewPosition;\n#endif\n",
    clipping_planes_vertex: "#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n",
    color_fragment: "#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif",
    color_pars_fragment: "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\n",
    color_pars_vertex: "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif",
    color_vertex: "#ifdef USE_COLOR\n\tvColor.xyz = color.xyz;\n#endif",
    common: "#define PI 3.14159265359\n#define PI2 6.28318530718\n#define PI_HALF 1.5707963267949\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#define whiteCompliment(a) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract(sin(sn) * c);\n}\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\tfloat distance = dot( planeNormal, point - pointOnPlane );\n\treturn - distance * planeNormal + point;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n}\nmat3 transposeMat3( const in mat3 m ) {\n\tmat3 tmp;\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\treturn tmp;\n}\nfloat linearToRelativeLuminance( const in vec3 color ) {\n\tvec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n\treturn dot( weights, color.rgb );\n}\n",
    cube_uv_reflection_fragment: "#ifdef ENVMAP_TYPE_CUBE_UV\n#define cubeUV_textureSize (1024.0)\nint getFaceFromDirection(vec3 direction) {\n\tvec3 absDirection = abs(direction);\n\tint face = -1;\n\tif( absDirection.x > absDirection.z ) {\n\t\tif(absDirection.x > absDirection.y )\n\t\t\tface = direction.x > 0.0 ? 0 : 3;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\telse {\n\t\tif(absDirection.z > absDirection.y )\n\t\t\tface = direction.z > 0.0 ? 2 : 5;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\treturn face;\n}\n#define cubeUV_maxLods1  (log2(cubeUV_textureSize*0.25) - 1.0)\n#define cubeUV_rangeClamp (exp2((6.0 - 1.0) * 2.0))\nvec2 MipLevelInfo( vec3 vec, float roughnessLevel, float roughness ) {\n\tfloat scale = exp2(cubeUV_maxLods1 - roughnessLevel);\n\tfloat dxRoughness = dFdx(roughness);\n\tfloat dyRoughness = dFdy(roughness);\n\tvec3 dx = dFdx( vec * scale * dxRoughness );\n\tvec3 dy = dFdy( vec * scale * dyRoughness );\n\tfloat d = max( dot( dx, dx ), dot( dy, dy ) );\n\td = clamp(d, 1.0, cubeUV_rangeClamp);\n\tfloat mipLevel = 0.5 * log2(d);\n\treturn vec2(floor(mipLevel), fract(mipLevel));\n}\n#define cubeUV_maxLods2 (log2(cubeUV_textureSize*0.25) - 2.0)\n#define cubeUV_rcpTextureSize (1.0 / cubeUV_textureSize)\nvec2 getCubeUV(vec3 direction, float roughnessLevel, float mipLevel) {\n\tmipLevel = roughnessLevel > cubeUV_maxLods2 - 3.0 ? 0.0 : mipLevel;\n\tfloat a = 16.0 * cubeUV_rcpTextureSize;\n\tvec2 exp2_packed = exp2( vec2( roughnessLevel, mipLevel ) );\n\tvec2 rcp_exp2_packed = vec2( 1.0 ) / exp2_packed;\n\tfloat powScale = exp2_packed.x * exp2_packed.y;\n\tfloat scale = rcp_exp2_packed.x * rcp_exp2_packed.y * 0.25;\n\tfloat mipOffset = 0.75*(1.0 - rcp_exp2_packed.y) * rcp_exp2_packed.x;\n\tbool bRes = mipLevel == 0.0;\n\tscale =  bRes && (scale < a) ? a : scale;\n\tvec3 r;\n\tvec2 offset;\n\tint face = getFaceFromDirection(direction);\n\tfloat rcpPowScale = 1.0 / powScale;\n\tif( face == 0) {\n\t\tr = vec3(direction.x, -direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 1) {\n\t\tr = vec3(direction.y, direction.x, direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 2) {\n\t\tr = vec3(direction.z, direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 3) {\n\t\tr = vec3(direction.x, direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse if( face == 4) {\n\t\tr = vec3(direction.y, direction.x, -direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse {\n\t\tr = vec3(direction.z, -direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\tr = normalize(r);\n\tfloat texelOffset = 0.5 * cubeUV_rcpTextureSize;\n\tvec2 s = ( r.yz / abs( r.x ) + vec2( 1.0 ) ) * 0.5;\n\tvec2 base = offset + vec2( texelOffset );\n\treturn base + s * ( scale - 2.0 * texelOffset );\n}\n#define cubeUV_maxLods3 (log2(cubeUV_textureSize*0.25) - 3.0)\nvec4 textureCubeUV(vec3 reflectedDirection, float roughness ) {\n\tfloat roughnessVal = roughness* cubeUV_maxLods3;\n\tfloat r1 = floor(roughnessVal);\n\tfloat r2 = r1 + 1.0;\n\tfloat t = fract(roughnessVal);\n\tvec2 mipInfo = MipLevelInfo(reflectedDirection, r1, roughness);\n\tfloat s = mipInfo.y;\n\tfloat level0 = mipInfo.x;\n\tfloat level1 = level0 + 1.0;\n\tlevel1 = level1 > 5.0 ? 5.0 : level1;\n\tlevel0 += min( floor( s + 0.5 ), 5.0 );\n\tvec2 uv_10 = getCubeUV(reflectedDirection, r1, level0);\n\tvec4 color10 = envMapTexelToLinear(texture2D(envMap, uv_10));\n\tvec2 uv_20 = getCubeUV(reflectedDirection, r2, level0);\n\tvec4 color20 = envMapTexelToLinear(texture2D(envMap, uv_20));\n\tvec4 result = mix(color10, color20, t);\n\treturn vec4(result.rgb, 1.0);\n}\n#endif\n",
    defaultnormal_vertex: "vec3 transformedNormal = normalMatrix * objectNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n",
    displacementmap_pars_vertex: "#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif\n",
    displacementmap_vertex: "#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, uv ).x * displacementScale + displacementBias );\n#endif\n",
    emissivemap_fragment: "#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif\n",
    emissivemap_pars_fragment: "#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif\n",
    encodings_fragment: "  gl_FragColor = linearToOutputTexel( gl_FragColor );\n",
    encodings_pars_fragment: "\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.xyz, vec3( gammaFactor ) ), value.w );\n}\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.xyz, vec3( 1.0 / gammaFactor ) ), value.w );\n}\nvec4 sRGBToLinear( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.w );\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.w );\n}\nvec4 RGBEToLinear( in vec4 value ) {\n\treturn vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\nvec4 LinearToRGBE( in vec4 value ) {\n\tfloat maxComponent = max( max( value.r, value.g ), value.b );\n\tfloat fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n\treturn vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n}\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.xyz * value.w * maxRange, 1.0 );\n}\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.x, max( value.g, value.b ) );\n\tfloat M      = clamp( maxRGB / maxRange, 0.0, 1.0 );\n\tM            = ceil( M * 255.0 ) / 255.0;\n\treturn vec4( value.rgb / ( M * maxRange ), M );\n}\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.x, max( value.g, value.b ) );\n\tfloat D      = max( maxRange / maxRGB, 1.0 );\n\tD            = min( floor( D ) / 255.0, 1.0 );\n\treturn vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value )  {\n\tvec3 Xp_Y_XYZp = value.rgb * cLogLuvM;\n\tXp_Y_XYZp = max(Xp_Y_XYZp, vec3(1e-6, 1e-6, 1e-6));\n\tvec4 vResult;\n\tvResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n\tfloat Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n\tvResult.w = fract(Le);\n\tvResult.z = (Le - (floor(vResult.w*255.0))/255.0)/255.0;\n\treturn vResult;\n}\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n\tfloat Le = value.z * 255.0 + value.w;\n\tvec3 Xp_Y_XYZp;\n\tXp_Y_XYZp.y = exp2((Le - 127.0) / 2.0);\n\tXp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n\tXp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n\tvec3 vRGB = Xp_Y_XYZp.rgb * cLogLuvInverseM;\n\treturn vec4( max(vRGB, 0.0), 1.0 );\n}\n",
    envmap_fragment: "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\tvec2 sampleUV;\n\t\treflectVec = normalize( reflectVec );\n\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\tvec4 envColor = texture2D( envMap, sampleUV );\n\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\treflectVec = normalize( reflectVec );\n\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0, 0.0, 1.0 ) );\n\t\tvec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\tenvColor = envMapTexelToLinear( envColor );\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif\n",
    envmap_pars_fragment: "#if defined( USE_ENVMAP ) || defined( PHYSICAL )\n\tuniform float reflectivity;\n\tuniform float envMapIntensity;\n#endif\n#ifdef USE_ENVMAP\n\t#if ! defined( PHYSICAL ) && ( defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) )\n\t\tvarying vec3 vWorldPosition;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\tuniform float flipEnvMap;\n\tuniform int maxMipLevel;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( PHYSICAL )\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif\n",
    envmap_pars_vertex: "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif\n",
    envmap_vertex: "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif\n",
    fog_vertex: "\n#ifdef USE_FOG\nfogDepth = -mvPosition.z;\n#endif",
    fog_pars_vertex: "#ifdef USE_FOG\n  varying float fogDepth;\n#endif\n",
    fog_fragment: "#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = whiteCompliment( exp2( - fogDensity * fogDensity * fogDepth * fogDepth * LOG2 ) );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, fogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif\n",
    fog_pars_fragment: "#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float fogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif\n",
    gradientmap_pars_fragment: "#ifdef TOON\n\tuniform sampler2D gradientMap;\n\tvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\t\tfloat dotNL = dot( normal, lightDirection );\n\t\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t\t#ifdef USE_GRADIENTMAP\n\t\t\treturn texture2D( gradientMap, coord ).rgb;\n\t\t#else\n\t\t\treturn ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\t\t#endif\n\t}\n#endif\n",
    lightmap_fragment: "#ifdef USE_LIGHTMAP\n\treflectedLight.indirectDiffuse += PI * texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n#endif\n",
    lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif",
    lights_lambert_vertex: "vec3 diffuse = vec3( 1.0 );\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = normalize( -mvPosition.xyz );\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\nvLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n#endif\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\n#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tgetPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tgetSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tgetDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\tvLightFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\t\t#endif\n\t}\n#endif\n",
    lights_pars_begin: "uniform vec3 ambientLightColor;\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treturn irradiance;\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t\tfloat shadowCameraNear;\n\t\tfloat shadowCameraFar;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( angleCos > spotLight.coneCos ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltc_1;\tuniform sampler2D ltc_2;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tirradiance *= PI;\n\t\t#endif\n\t\treturn irradiance;\n\t}\n#endif\n",
    lights_pars_maps: "#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\tvec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {\n\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\tvec4 envMapColor = textureCubeUV( queryVec, 1.0 );\n\t\t#else\n\t\t\tvec4 envMapColor = vec4( 0.0 );\n\t\t#endif\n\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t}\n\tfloat getSpecularMIPLevel( const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\tfloat maxMIPLevelScalar = float( maxMIPLevel );\n\t\tfloat desiredMIPLevel = maxMIPLevelScalar + 0.79248 - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );\n\t\treturn clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\t}\n\tvec3 getLightProbeIndirectRadiance( const in GeometricContext geometry, const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( -geometry.viewDir, geometry.normal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( -geometry.viewDir, geometry.normal, refractionRatio );\n\t\t#endif\n\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\tfloat specularMIPLevel = getSpecularMIPLevel( blinnShininessExponent, maxMIPLevel );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\tvec4 envMapColor = textureCubeUV(queryReflectVec, BlinnExponentToGGXRoughness(blinnShininessExponent));\n\t\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\t\tvec2 sampleUV;\n\t\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, sampleUV, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, sampleUV, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0,0.0,1.0 ) );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#endif\n\t\treturn envMapColor.rgb * envMapIntensity;\n\t}\n#endif\n",
    lights_phong_fragment: "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;\n",
    lights_phong_pars_fragment: "varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct BlinnPhongMaterial {\n\tvec3\tdiffuseColor;\n\tvec3\tspecularColor;\n\tfloat\tspecularShininess;\n\tfloat\tspecularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifdef TOON\n\t\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\t#else\n\t\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\t\tvec3 irradiance = dotNL * directLight.color;\n\t#endif\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD( material )\t(0)\n",
    lights_physical_fragment: "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.specularRoughness = clamp( roughnessFactor, 0.04, 1.0 );\n#ifdef STANDARD\n\tmaterial.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );\n\tmaterial.clearCoat = saturate( clearCoat );\tmaterial.clearCoatRoughness = clamp( clearCoatRoughness, 0.04, 1.0 );\n#endif\n",
    lights_physical_pars_fragment: "struct PhysicalMaterial {\n\tvec3\tdiffuseColor;\n\tfloat\tspecularRoughness;\n\tvec3\tspecularColor;\n\t#ifndef STANDARD\n\t\tfloat clearCoat;\n\t\tfloat clearCoatRoughness;\n\t#endif\n};\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\nfloat clearCoatDHRApprox( const in float roughness, const in float dotNL ) {\n\treturn DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.specularRoughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos - halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos + halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos + halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos - halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(    0, 1,    0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\t#ifndef STANDARD\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\treflectedLight.directSpecular += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry, material.specularColor, material.specularRoughness );\n\treflectedLight.directDiffuse += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\t#ifndef STANDARD\n\t\treflectedLight.directSpecular += irradiance * material.clearCoat * BRDF_Specular_GGX( directLight, geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\t#endif\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 clearCoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifndef STANDARD\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\tfloat dotNL = dotNV;\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\treflectedLight.indirectSpecular += ( 1.0 - clearCoatDHR ) * radiance * BRDF_Specular_GGX_Environment( geometry, material.specularColor, material.specularRoughness );\n\t#ifndef STANDARD\n\t\treflectedLight.indirectSpecular += clearCoatRadiance * material.clearCoat * BRDF_Specular_GGX_Environment( geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\t#endif\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\n#define Material_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.specularRoughness )\n#define Material_ClearCoat_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.clearCoatRoughness )\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}\n",
    lights_fragment_begin: "\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = normalize( vViewPosition );\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointDirectLightIrradiance( pointLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( pointLight.shadow, directLight.visible ) ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( spotLight.shadow, directLight.visible ) ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( directionalLight.shadow, directLight.visible ) ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\t#pragma unroll_loop\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t}\n\t#endif\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearCoatRadiance = vec3( 0.0 );\n#endif\n",
    lights_fragment_maps: "#if defined( RE_IndirectDiffuse )\n\t#ifdef USE_LIGHTMAP\n\t\tvec3 lightMapIrradiance = texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tlightMapIrradiance *= PI;\n\t\t#endif\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tirradiance += getLightProbeIndirectIrradiance( geometry, maxMipLevel );\n\t#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tradiance += getLightProbeIndirectRadiance( geometry, Material_BlinnShininessExponent( material ), maxMipLevel );\n\t#ifndef STANDARD\n\t\tclearCoatRadiance += getLightProbeIndirectRadiance( geometry, Material_ClearCoat_BlinnShininessExponent( material ), maxMipLevel );\n\t#endif\n#endif\n",
    lights_fragment_end: "#if defined( RE_IndirectDiffuse )\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, clearCoatRadiance, geometry, material, reflectedLight );\n#endif\n",
    logdepthbuf_fragment: "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tgl_FragDepthEXT = log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif",
    logdepthbuf_pars_fragment: "#ifdef USE_LOGDEPTHBUF\n\tuniform float logDepthBufFC;\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t#endif\n#endif\n",
    logdepthbuf_pars_vertex: "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t#endif\n\tuniform float logDepthBufFC;\n#endif",
    logdepthbuf_vertex: "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t#else\n\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\t\tgl_Position.z *= gl_Position.w;\n\t#endif\n#endif\n",
    map_fragment: "#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n#endif\n",
    map_pars_fragment: "#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n",
    map_particle_fragment: "#ifdef USE_MAP\n\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n\tvec4 mapTexel = texture2D( map, uv );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n#endif\n",
    map_particle_pars_fragment: "#ifdef USE_MAP\n\tuniform mat3 uvTransform;\n\tuniform sampler2D map;\n#endif\n",
    metalnessmap_fragment: "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif\n",
    metalnessmap_pars_fragment: "#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif",
    morphnormal_vertex: "#ifdef USE_MORPHNORMALS\n\tobjectNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n\tobjectNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n\tobjectNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n\tobjectNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n#endif\n",
    morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\n\t#ifndef USE_MORPHNORMALS\n\tuniform float morphTargetInfluences[ 8 ];\n\t#else\n\tuniform float morphTargetInfluences[ 4 ];\n\t#endif\n#endif",
    morphtarget_vertex: "#ifdef USE_MORPHTARGETS\n\ttransformed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n\ttransformed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n\ttransformed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n\ttransformed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\t#ifndef USE_MORPHNORMALS\n\ttransformed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n\ttransformed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n\ttransformed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n\ttransformed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\t#endif\n#endif\n",
    normal_fragment_begin: "#ifdef FLAT_SHADED\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t#endif\n#endif\n",
    normal_fragment_maps: "#ifdef USE_NORMALMAP\n\tnormal = perturbNormal2Arb( -vViewPosition, normal );\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif\n",
    normalmap_pars_fragment: "#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n\t\tvec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n\t\tvec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n\t\tvec2 st0 = dFdx( vUv.st );\n\t\tvec2 st1 = dFdy( vUv.st );\n\t\tvec3 S = normalize( q0 * st1.t - q1 * st0.t );\n\t\tvec3 T = normalize( -q0 * st1.s + q1 * st0.s );\n\t\tvec3 N = normalize( surf_norm );\n\t\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\tmapN.xy = normalScale * mapN.xy;\n\t\tmat3 tsn = mat3( S, T, N );\n\t\treturn normalize( tsn * mapN );\n\t}\n#endif\n",
    packing: "vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256.,  256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n\treturn linearClipZ * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn (( near + viewZ ) * far ) / (( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * invClipZ - far );\n}\n",
    premultiplied_alpha_fragment: "#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif\n",
    project_vertex: "vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );\ngl_Position = projectionMatrix * mvPosition;\n",
    dithering_fragment: "#if defined( DITHERING )\n  gl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif\n",
    dithering_pars_fragment: "#if defined( DITHERING )\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif\n",
    roughnessmap_fragment: "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\troughnessFactor *= texelRoughness.g;\n#endif\n",
    roughnessmap_pars_fragment: "#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif",
    shadowmap_pars_fragment: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tfloat texture2DShadowLerp( sampler2D depths, vec2 size, vec2 uv, float compare ) {\n\t\tconst vec2 offset = vec2( 0.0, 1.0 );\n\t\tvec2 texelSize = vec2( 1.0 ) / size;\n\t\tvec2 centroidUV = floor( uv * size + 0.5 ) / size;\n\t\tfloat lb = texture2DCompare( depths, centroidUV + texelSize * offset.xx, compare );\n\t\tfloat lt = texture2DCompare( depths, centroidUV + texelSize * offset.xy, compare );\n\t\tfloat rb = texture2DCompare( depths, centroidUV + texelSize * offset.yx, compare );\n\t\tfloat rt = texture2DCompare( depths, centroidUV + texelSize * offset.yy, compare );\n\t\tvec2 f = fract( uv * size + 0.5 );\n\t\tfloat a = mix( lb, lt, f.y );\n\t\tfloat b = mix( rb, rt, f.y );\n\t\tfloat c = mix( a, b, f.x );\n\t\treturn c;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tfloat shadow = 1.0;\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\tbool frustumTest = all( frustumTestVec );\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tshadow = (\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn shadow;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );\t\tdp += shadowBias;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif\n",
    shadowmap_pars_vertex: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\t#endif\n#endif\n",
    shadowmap_vertex: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n#endif\n",
    shadowmask_pars_fragment: "float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\tDirectionalLight directionalLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tshadow *= bool( directionalLight.shadow ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\tSpotLight spotLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tshadow *= bool( spotLight.shadow ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\tPointLight pointLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tshadow *= bool( pointLight.shadow ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#endif\n\t#endif\n\treturn shadow;\n}\n",
    skinbase_vertex: "#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",
    skinning_pars_vertex: "#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\t#ifdef BONE_TEXTURE\n\t\tuniform sampler2D boneTexture;\n\t\tuniform int boneTextureSize;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\t\tfloat y = floor( j / float( boneTextureSize ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\t\tfloat dy = 1.0 / float( boneTextureSize );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif\n",
    skinning_vertex: "#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif\n",
    skinnormal_vertex: "#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n#endif\n",
    specularmap_fragment: "float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif",
    specularmap_pars_fragment: "#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif",
    tonemapping_fragment: "#if defined( TONE_MAPPING )\n  gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif\n",
    tonemapping_pars_fragment: "#ifndef saturate\n\t#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nuniform float toneMappingWhitePoint;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\n#define Uncharted2Helper( x ) max( ( ( x * ( 0.15 * x + 0.10 * 0.50 ) + 0.20 * 0.02 ) / ( x * ( 0.15 * x + 0.50 ) + 0.20 * 0.30 ) ) - 0.02 / 0.30, vec3( 0.0 ) )\nvec3 Uncharted2ToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( Uncharted2Helper( color ) / Uncharted2Helper( vec3( toneMappingWhitePoint ) ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\n",
    uv_pars_fragment: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n#endif",
    uv_pars_vertex: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n\tuniform mat3 uvTransform;\n#endif\n",
    uv_vertex: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif",
    uv2_pars_fragment: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvarying vec2 vUv2;\n#endif",
    uv2_pars_vertex: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n#endif",
    uv2_vertex: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = uv2;\n#endif",
    worldpos_vertex: "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )\n\tvec4 worldPosition = modelMatrix * vec4( transformed, 1.0 );\n#endif\n",
    cube_frag: "uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldPosition;\nvoid main() {\n\tgl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );\n\tgl_FragColor.a *= opacity;\n}\n",
    cube_vert: "varying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvWorldPosition = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}\n",
    depth_frag: "#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <logdepthbuf_fragment>\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( 1.0 - gl_FragCoord.z ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( gl_FragCoord.z );\n\t#endif\n}\n",
    depth_vert: "#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n}\n",
    distanceRGBA_frag: "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = packDepthToRGBA( dist );\n}\n",
    distanceRGBA_vert: "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}\n",
    equirect_frag: "uniform sampler2D tEquirect;\nvarying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldPosition );\n\tvec2 sampleUV;\n\tsampleUV.y = asin( clamp( direction.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\tsampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;\n\tgl_FragColor = texture2D( tEquirect, sampleUV );\n}\n",
    equirect_vert: "varying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvWorldPosition = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}\n",
    linedashed_frag: "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
    linedashed_vert: "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\tvLineDistance = scale * lineDistance;\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}\n",
    meshbasic_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\treflectedLight.indirectDiffuse += texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
    meshbasic_vert: "#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_ENVMAP\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}\n",
    meshlambert_frag: "uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_pars_maps>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\treflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );\n\t#include <lightmap_fragment>\n\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\t#else\n\t\treflectedLight.directDiffuse = vLightFront;\n\t#endif\n\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n",
    meshlambert_vert: "#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_pars_maps>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",
    meshphong_frag: "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_pars_maps>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n",
    meshphong_vert: "#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",
    meshphysical_frag: "#define PHYSICAL\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifndef STANDARD\n\tuniform float clearCoat;\n\tuniform float clearCoatRoughness;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <lights_pars_begin>\n#include <lights_pars_maps>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n",
    meshphysical_vert: "#define PHYSICAL\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",
    normal_frag: "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\nvoid main() {\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n}\n",
    normal_vert: "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}\n",
    points_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
    points_vert: "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#ifdef USE_SIZEATTENUATION\n\t\tgl_PointSize = size * ( scale / - mvPosition.z );\n\t#else\n\t\tgl_PointSize = size;\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",
    shadow_frag: "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\t#include <fog_fragment>\n}\n",
    shadow_vert: "#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n"
  },
      Da = {
    merge: function merge(a) {
      for (var b = {}, c = 0; c < a.length; c++) {
        var d = this.clone(a[c]),
            e;

        for (e in d) {
          b[e] = d[e];
        }
      }

      return b;
    },
    clone: function clone(a) {
      var b = {},
          c;

      for (c in a) {
        b[c] = {};

        for (var d in a[c]) {
          var e = a[c][d];
          e && (e.isColor || e.isMatrix3 || e.isMatrix4 || e.isVector2 || e.isVector3 || e.isVector4 || e.isTexture) ? b[c][d] = e.clone() : (0, _isArray.default)(e) ? b[c][d] = e.slice() : b[c][d] = e;
        }
      }

      return b;
    }
  },
      Kg = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
  };
  (0, _assign.default)(I.prototype, {
    isColor: !0,
    r: 1,
    g: 1,
    b: 1,
    set: function set(a) {
      a && a.isColor ? this.copy(a) : "number" === typeof a ? this.setHex(a) : "string" === typeof a && this.setStyle(a);
      return this;
    },
    setScalar: function setScalar(a) {
      this.b = this.g = this.r = a;
      return this;
    },
    setHex: function setHex(a) {
      a = Math.floor(a);
      this.r = (a >> 16 & 255) / 255;
      this.g = (a >> 8 & 255) / 255;
      this.b = (a & 255) / 255;
      return this;
    },
    setRGB: function setRGB(a, b, c) {
      this.r = a;
      this.g = b;
      this.b = c;
      return this;
    },
    setHSL: function () {
      function a(a, c, d) {
        0 > d && (d += 1);
        1 < d && --d;
        return d < 1 / 6 ? a + 6 * (c - a) * d : .5 > d ? c : d < 2 / 3 ? a + 6 * (c - a) * (2 / 3 - d) : a;
      }

      return function (b, c, d) {
        b = S.euclideanModulo(b, 1);
        c = S.clamp(c, 0, 1);
        d = S.clamp(d, 0, 1);
        0 === c ? this.r = this.g = this.b = d : (c = .5 >= d ? d * (1 + c) : d + c - d * c, d = 2 * d - c, this.r = a(d, c, b + 1 / 3), this.g = a(d, c, b), this.b = a(d, c, b - 1 / 3));
        return this;
      };
    }(),
    setStyle: function setStyle(a) {
      function b(b) {
        void 0 !== b && 1 > (0, _parseFloat2.default)(b) && console.warn("THREE.Color: Alpha component of " + a + " will be ignored.");
      }

      var c;

      if (c = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(a)) {
        var d = c[2];

        switch (c[1]) {
          case "rgb":
          case "rgba":
            if (c = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(d)) return this.r = Math.min(255, (0, _parseInt2.default)(c[1], 10)) / 255, this.g = Math.min(255, (0, _parseInt2.default)(c[2], 10)) / 255, this.b = Math.min(255, (0, _parseInt2.default)(c[3], 10)) / 255, b(c[5]), this;
            if (c = /^(\d+)%\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(d)) return this.r = Math.min(100, (0, _parseInt2.default)(c[1], 10)) / 100, this.g = Math.min(100, (0, _parseInt2.default)(c[2], 10)) / 100, this.b = Math.min(100, (0, _parseInt2.default)(c[3], 10)) / 100, b(c[5]), this;
            break;

          case "hsl":
          case "hsla":
            if (c = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(d)) {
              d = (0, _parseFloat2.default)(c[1]) / 360;
              var e = (0, _parseInt2.default)(c[2], 10) / 100,
                  f = (0, _parseInt2.default)(c[3], 10) / 100;
              b(c[5]);
              return this.setHSL(d, e, f);
            }

        }
      } else if (c = /^#([A-Fa-f0-9]+)$/.exec(a)) {
        c = c[1];
        d = c.length;
        if (3 === d) return this.r = (0, _parseInt2.default)(c.charAt(0) + c.charAt(0), 16) / 255, this.g = (0, _parseInt2.default)(c.charAt(1) + c.charAt(1), 16) / 255, this.b = (0, _parseInt2.default)(c.charAt(2) + c.charAt(2), 16) / 255, this;
        if (6 === d) return this.r = (0, _parseInt2.default)(c.charAt(0) + c.charAt(1), 16) / 255, this.g = (0, _parseInt2.default)(c.charAt(2) + c.charAt(3), 16) / 255, this.b = (0, _parseInt2.default)(c.charAt(4) + c.charAt(5), 16) / 255, this;
      }

      a && 0 < a.length && (c = Kg[a], void 0 !== c ? this.setHex(c) : console.warn("THREE.Color: Unknown color " + a));
      return this;
    },
    clone: function clone() {
      return new this.constructor(this.r, this.g, this.b);
    },
    copy: function copy(a) {
      this.r = a.r;
      this.g = a.g;
      this.b = a.b;
      return this;
    },
    copyGammaToLinear: function copyGammaToLinear(a, b) {
      void 0 === b && (b = 2);
      this.r = Math.pow(a.r, b);
      this.g = Math.pow(a.g, b);
      this.b = Math.pow(a.b, b);
      return this;
    },
    copyLinearToGamma: function copyLinearToGamma(a, b) {
      void 0 === b && (b = 2);
      b = 0 < b ? 1 / b : 1;
      this.r = Math.pow(a.r, b);
      this.g = Math.pow(a.g, b);
      this.b = Math.pow(a.b, b);
      return this;
    },
    convertGammaToLinear: function convertGammaToLinear() {
      var a = this.r,
          b = this.g,
          c = this.b;
      this.r = a * a;
      this.g = b * b;
      this.b = c * c;
      return this;
    },
    convertLinearToGamma: function convertLinearToGamma() {
      this.r = Math.sqrt(this.r);
      this.g = Math.sqrt(this.g);
      this.b = Math.sqrt(this.b);
      return this;
    },
    getHex: function getHex() {
      return 255 * this.r << 16 ^ 255 * this.g << 8 ^ 255 * this.b << 0;
    },
    getHexString: function getHexString() {
      return ("000000" + this.getHex().toString(16)).slice(-6);
    },
    getHSL: function getHSL(a) {
      void 0 === a && (console.warn("THREE.Color: .getHSL() target is now required"), a = {
        h: 0,
        s: 0,
        l: 0
      });
      var b = this.r,
          c = this.g,
          d = this.b,
          e = Math.max(b, c, d),
          f = Math.min(b, c, d),
          g,
          h = (f + e) / 2;
      if (f === e) f = g = 0;else {
        var l = e - f;
        f = .5 >= h ? l / (e + f) : l / (2 - e - f);

        switch (e) {
          case b:
            g = (c - d) / l + (c < d ? 6 : 0);
            break;

          case c:
            g = (d - b) / l + 2;
            break;

          case d:
            g = (b - c) / l + 4;
        }

        g /= 6;
      }
      a.h = g;
      a.s = f;
      a.l = h;
      return a;
    },
    getStyle: function getStyle() {
      return "rgb(" + (255 * this.r | 0) + "," + (255 * this.g | 0) + "," + (255 * this.b | 0) + ")";
    },
    offsetHSL: function () {
      var a = {};
      return function (b, c, d) {
        this.getHSL(a);
        a.h += b;
        a.s += c;
        a.l += d;
        this.setHSL(a.h, a.s, a.l);
        return this;
      };
    }(),
    add: function add(a) {
      this.r += a.r;
      this.g += a.g;
      this.b += a.b;
      return this;
    },
    addColors: function addColors(a, b) {
      this.r = a.r + b.r;
      this.g = a.g + b.g;
      this.b = a.b + b.b;
      return this;
    },
    addScalar: function addScalar(a) {
      this.r += a;
      this.g += a;
      this.b += a;
      return this;
    },
    sub: function sub(a) {
      this.r = Math.max(0, this.r - a.r);
      this.g = Math.max(0, this.g - a.g);
      this.b = Math.max(0, this.b - a.b);
      return this;
    },
    multiply: function multiply(a) {
      this.r *= a.r;
      this.g *= a.g;
      this.b *= a.b;
      return this;
    },
    multiplyScalar: function multiplyScalar(a) {
      this.r *= a;
      this.g *= a;
      this.b *= a;
      return this;
    },
    lerp: function lerp(a, b) {
      this.r += (a.r - this.r) * b;
      this.g += (a.g - this.g) * b;
      this.b += (a.b - this.b) * b;
      return this;
    },
    equals: function equals(a) {
      return a.r === this.r && a.g === this.g && a.b === this.b;
    },
    fromArray: function fromArray(a, b) {
      void 0 === b && (b = 0);
      this.r = a[b];
      this.g = a[b + 1];
      this.b = a[b + 2];
      return this;
    },
    toArray: function toArray(a, b) {
      void 0 === a && (a = []);
      void 0 === b && (b = 0);
      a[b] = this.r;
      a[b + 1] = this.g;
      a[b + 2] = this.b;
      return a;
    },
    toJSON: function toJSON() {
      return this.getHex();
    }
  });
  var L = {
    common: {
      diffuse: {
        value: new I(15658734)
      },
      opacity: {
        value: 1
      },
      map: {
        value: null
      },
      uvTransform: {
        value: new sa()
      },
      alphaMap: {
        value: null
      }
    },
    specularmap: {
      specularMap: {
        value: null
      }
    },
    envmap: {
      envMap: {
        value: null
      },
      flipEnvMap: {
        value: -1
      },
      reflectivity: {
        value: 1
      },
      refractionRatio: {
        value: .98
      },
      maxMipLevel: {
        value: 0
      }
    },
    aomap: {
      aoMap: {
        value: null
      },
      aoMapIntensity: {
        value: 1
      }
    },
    lightmap: {
      lightMap: {
        value: null
      },
      lightMapIntensity: {
        value: 1
      }
    },
    emissivemap: {
      emissiveMap: {
        value: null
      }
    },
    bumpmap: {
      bumpMap: {
        value: null
      },
      bumpScale: {
        value: 1
      }
    },
    normalmap: {
      normalMap: {
        value: null
      },
      normalScale: {
        value: new C(1, 1)
      }
    },
    displacementmap: {
      displacementMap: {
        value: null
      },
      displacementScale: {
        value: 1
      },
      displacementBias: {
        value: 0
      }
    },
    roughnessmap: {
      roughnessMap: {
        value: null
      }
    },
    metalnessmap: {
      metalnessMap: {
        value: null
      }
    },
    gradientmap: {
      gradientMap: {
        value: null
      }
    },
    fog: {
      fogDensity: {
        value: 2.5E-4
      },
      fogNear: {
        value: 1
      },
      fogFar: {
        value: 2E3
      },
      fogColor: {
        value: new I(16777215)
      }
    },
    lights: {
      ambientLightColor: {
        value: []
      },
      directionalLights: {
        value: [],
        properties: {
          direction: {},
          color: {},
          shadow: {},
          shadowBias: {},
          shadowRadius: {},
          shadowMapSize: {}
        }
      },
      directionalShadowMap: {
        value: []
      },
      directionalShadowMatrix: {
        value: []
      },
      spotLights: {
        value: [],
        properties: {
          color: {},
          position: {},
          direction: {},
          distance: {},
          coneCos: {},
          penumbraCos: {},
          decay: {},
          shadow: {},
          shadowBias: {},
          shadowRadius: {},
          shadowMapSize: {}
        }
      },
      spotShadowMap: {
        value: []
      },
      spotShadowMatrix: {
        value: []
      },
      pointLights: {
        value: [],
        properties: {
          color: {},
          position: {},
          decay: {},
          distance: {},
          shadow: {},
          shadowBias: {},
          shadowRadius: {},
          shadowMapSize: {},
          shadowCameraNear: {},
          shadowCameraFar: {}
        }
      },
      pointShadowMap: {
        value: []
      },
      pointShadowMatrix: {
        value: []
      },
      hemisphereLights: {
        value: [],
        properties: {
          direction: {},
          skyColor: {},
          groundColor: {}
        }
      },
      rectAreaLights: {
        value: [],
        properties: {
          color: {},
          position: {},
          width: {},
          height: {}
        }
      }
    },
    points: {
      diffuse: {
        value: new I(15658734)
      },
      opacity: {
        value: 1
      },
      size: {
        value: 1
      },
      scale: {
        value: 1
      },
      map: {
        value: null
      },
      uvTransform: {
        value: new sa()
      }
    }
  },
      rb = {
    basic: {
      uniforms: Da.merge([L.common, L.specularmap, L.envmap, L.aomap, L.lightmap, L.fog]),
      vertexShader: V.meshbasic_vert,
      fragmentShader: V.meshbasic_frag
    },
    lambert: {
      uniforms: Da.merge([L.common, L.specularmap, L.envmap, L.aomap, L.lightmap, L.emissivemap, L.fog, L.lights, {
        emissive: {
          value: new I(0)
        }
      }]),
      vertexShader: V.meshlambert_vert,
      fragmentShader: V.meshlambert_frag
    },
    phong: {
      uniforms: Da.merge([L.common, L.specularmap, L.envmap, L.aomap, L.lightmap, L.emissivemap, L.bumpmap, L.normalmap, L.displacementmap, L.gradientmap, L.fog, L.lights, {
        emissive: {
          value: new I(0)
        },
        specular: {
          value: new I(1118481)
        },
        shininess: {
          value: 30
        }
      }]),
      vertexShader: V.meshphong_vert,
      fragmentShader: V.meshphong_frag
    },
    standard: {
      uniforms: Da.merge([L.common, L.envmap, L.aomap, L.lightmap, L.emissivemap, L.bumpmap, L.normalmap, L.displacementmap, L.roughnessmap, L.metalnessmap, L.fog, L.lights, {
        emissive: {
          value: new I(0)
        },
        roughness: {
          value: .5
        },
        metalness: {
          value: .5
        },
        envMapIntensity: {
          value: 1
        }
      }]),
      vertexShader: V.meshphysical_vert,
      fragmentShader: V.meshphysical_frag
    },
    points: {
      uniforms: Da.merge([L.points, L.fog]),
      vertexShader: V.points_vert,
      fragmentShader: V.points_frag
    },
    dashed: {
      uniforms: Da.merge([L.common, L.fog, {
        scale: {
          value: 1
        },
        dashSize: {
          value: 1
        },
        totalSize: {
          value: 2
        }
      }]),
      vertexShader: V.linedashed_vert,
      fragmentShader: V.linedashed_frag
    },
    depth: {
      uniforms: Da.merge([L.common, L.displacementmap]),
      vertexShader: V.depth_vert,
      fragmentShader: V.depth_frag
    },
    normal: {
      uniforms: Da.merge([L.common, L.bumpmap, L.normalmap, L.displacementmap, {
        opacity: {
          value: 1
        }
      }]),
      vertexShader: V.normal_vert,
      fragmentShader: V.normal_frag
    },
    cube: {
      uniforms: {
        tCube: {
          value: null
        },
        tFlip: {
          value: -1
        },
        opacity: {
          value: 1
        }
      },
      vertexShader: V.cube_vert,
      fragmentShader: V.cube_frag
    },
    equirect: {
      uniforms: {
        tEquirect: {
          value: null
        }
      },
      vertexShader: V.equirect_vert,
      fragmentShader: V.equirect_frag
    },
    distanceRGBA: {
      uniforms: Da.merge([L.common, L.displacementmap, {
        referencePosition: {
          value: new p()
        },
        nearDistance: {
          value: 1
        },
        farDistance: {
          value: 1E3
        }
      }]),
      vertexShader: V.distanceRGBA_vert,
      fragmentShader: V.distanceRGBA_frag
    },
    shadow: {
      uniforms: Da.merge([L.lights, L.fog, {
        color: {
          value: new I(0)
        },
        opacity: {
          value: 1
        }
      }]),
      vertexShader: V.shadow_vert,
      fragmentShader: V.shadow_frag
    }
  };
  rb.physical = {
    uniforms: Da.merge([rb.standard.uniforms, {
      clearCoat: {
        value: 0
      },
      clearCoatRoughness: {
        value: 0
      }
    }]),
    vertexShader: V.meshphysical_vert,
    fragmentShader: V.meshphysical_frag
  };
  jb.RotationOrders = "XYZ YZX ZXY XZY YXZ ZYX".split(" ");
  jb.DefaultOrder = "XYZ";
  (0, _defineProperties.default)(jb.prototype, {
    x: {
      get: function get() {
        return this._x;
      },
      set: function set(a) {
        this._x = a;
        this.onChangeCallback();
      }
    },
    y: {
      get: function get() {
        return this._y;
      },
      set: function set(a) {
        this._y = a;
        this.onChangeCallback();
      }
    },
    z: {
      get: function get() {
        return this._z;
      },
      set: function set(a) {
        this._z = a;
        this.onChangeCallback();
      }
    },
    order: {
      get: function get() {
        return this._order;
      },
      set: function set(a) {
        this._order = a;
        this.onChangeCallback();
      }
    }
  });
  (0, _assign.default)(jb.prototype, {
    isEuler: !0,
    set: function set(a, b, c, d) {
      this._x = a;
      this._y = b;
      this._z = c;
      this._order = d || this._order;
      this.onChangeCallback();
      return this;
    },
    clone: function clone() {
      return new this.constructor(this._x, this._y, this._z, this._order);
    },
    copy: function copy(a) {
      this._x = a._x;
      this._y = a._y;
      this._z = a._z;
      this._order = a._order;
      this.onChangeCallback();
      return this;
    },
    setFromRotationMatrix: function setFromRotationMatrix(a, b, c) {
      var d = S.clamp,
          e = a.elements;
      a = e[0];
      var f = e[4],
          g = e[8],
          h = e[1],
          l = e[5],
          m = e[9],
          k = e[2],
          n = e[6];
      e = e[10];
      b = b || this._order;
      "XYZ" === b ? (this._y = Math.asin(d(g, -1, 1)), .99999 > Math.abs(g) ? (this._x = Math.atan2(-m, e), this._z = Math.atan2(-f, a)) : (this._x = Math.atan2(n, l), this._z = 0)) : "YXZ" === b ? (this._x = Math.asin(-d(m, -1, 1)), .99999 > Math.abs(m) ? (this._y = Math.atan2(g, e), this._z = Math.atan2(h, l)) : (this._y = Math.atan2(-k, a), this._z = 0)) : "ZXY" === b ? (this._x = Math.asin(d(n, -1, 1)), .99999 > Math.abs(n) ? (this._y = Math.atan2(-k, e), this._z = Math.atan2(-f, l)) : (this._y = 0, this._z = Math.atan2(h, a))) : "ZYX" === b ? (this._y = Math.asin(-d(k, -1, 1)), .99999 > Math.abs(k) ? (this._x = Math.atan2(n, e), this._z = Math.atan2(h, a)) : (this._x = 0, this._z = Math.atan2(-f, l))) : "YZX" === b ? (this._z = Math.asin(d(h, -1, 1)), .99999 > Math.abs(h) ? (this._x = Math.atan2(-m, l), this._y = Math.atan2(-k, a)) : (this._x = 0, this._y = Math.atan2(g, e))) : "XZY" === b ? (this._z = Math.asin(-d(f, -1, 1)), .99999 > Math.abs(f) ? (this._x = Math.atan2(n, l), this._y = Math.atan2(g, a)) : (this._x = Math.atan2(-m, e), this._y = 0)) : console.warn("THREE.Euler: .setFromRotationMatrix() given unsupported order: " + b);
      this._order = b;
      if (!1 !== c) this.onChangeCallback();
      return this;
    },
    setFromQuaternion: function () {
      var a = new M();
      return function (b, c, d) {
        a.makeRotationFromQuaternion(b);
        return this.setFromRotationMatrix(a, c, d);
      };
    }(),
    setFromVector3: function setFromVector3(a, b) {
      return this.set(a.x, a.y, a.z, b || this._order);
    },
    reorder: function () {
      var a = new ja();
      return function (b) {
        a.setFromEuler(this);
        return this.setFromQuaternion(a, b);
      };
    }(),
    equals: function equals(a) {
      return a._x === this._x && a._y === this._y && a._z === this._z && a._order === this._order;
    },
    fromArray: function fromArray(a) {
      this._x = a[0];
      this._y = a[1];
      this._z = a[2];
      void 0 !== a[3] && (this._order = a[3]);
      this.onChangeCallback();
      return this;
    },
    toArray: function toArray(a, b) {
      void 0 === a && (a = []);
      void 0 === b && (b = 0);
      a[b] = this._x;
      a[b + 1] = this._y;
      a[b + 2] = this._z;
      a[b + 3] = this._order;
      return a;
    },
    toVector3: function toVector3(a) {
      return a ? a.set(this._x, this._y, this._z) : new p(this._x, this._y, this._z);
    },
    onChange: function onChange(a) {
      this.onChangeCallback = a;
      return this;
    },
    onChangeCallback: function onChangeCallback() {}
  });
  (0, _assign.default)(Sd.prototype, {
    set: function set(a) {
      this.mask = 1 << a | 0;
    },
    enable: function enable(a) {
      this.mask = this.mask | 1 << a | 0;
    },
    toggle: function toggle(a) {
      this.mask ^= 1 << a | 0;
    },
    disable: function disable(a) {
      this.mask &= ~(1 << a | 0);
    },
    test: function test(a) {
      return 0 !== (this.mask & a.mask);
    }
  });
  var zf = 0;
  A.DefaultUp = new p(0, 1, 0);
  A.DefaultMatrixAutoUpdate = !0;
  A.prototype = (0, _assign.default)((0, _create.default)(xa.prototype), {
    constructor: A,
    isObject3D: !0,
    onBeforeRender: function onBeforeRender() {},
    onAfterRender: function onAfterRender() {},
    applyMatrix: function applyMatrix(a) {
      this.matrix.multiplyMatrices(a, this.matrix);
      this.matrix.decompose(this.position, this.quaternion, this.scale);
    },
    applyQuaternion: function applyQuaternion(a) {
      this.quaternion.premultiply(a);
      return this;
    },
    setRotationFromAxisAngle: function setRotationFromAxisAngle(a, b) {
      this.quaternion.setFromAxisAngle(a, b);
    },
    setRotationFromEuler: function setRotationFromEuler(a) {
      this.quaternion.setFromEuler(a, !0);
    },
    setRotationFromMatrix: function setRotationFromMatrix(a) {
      this.quaternion.setFromRotationMatrix(a);
    },
    setRotationFromQuaternion: function setRotationFromQuaternion(a) {
      this.quaternion.copy(a);
    },
    rotateOnAxis: function () {
      var a = new ja();
      return function (b, c) {
        a.setFromAxisAngle(b, c);
        this.quaternion.multiply(a);
        return this;
      };
    }(),
    rotateOnWorldAxis: function () {
      var a = new ja();
      return function (b, c) {
        a.setFromAxisAngle(b, c);
        this.quaternion.premultiply(a);
        return this;
      };
    }(),
    rotateX: function () {
      var a = new p(1, 0, 0);
      return function (b) {
        return this.rotateOnAxis(a, b);
      };
    }(),
    rotateY: function () {
      var a = new p(0, 1, 0);
      return function (b) {
        return this.rotateOnAxis(a, b);
      };
    }(),
    rotateZ: function () {
      var a = new p(0, 0, 1);
      return function (b) {
        return this.rotateOnAxis(a, b);
      };
    }(),
    translateOnAxis: function () {
      var a = new p();
      return function (b, c) {
        a.copy(b).applyQuaternion(this.quaternion);
        this.position.add(a.multiplyScalar(c));
        return this;
      };
    }(),
    translateX: function () {
      var a = new p(1, 0, 0);
      return function (b) {
        return this.translateOnAxis(a, b);
      };
    }(),
    translateY: function () {
      var a = new p(0, 1, 0);
      return function (b) {
        return this.translateOnAxis(a, b);
      };
    }(),
    translateZ: function () {
      var a = new p(0, 0, 1);
      return function (b) {
        return this.translateOnAxis(a, b);
      };
    }(),
    localToWorld: function localToWorld(a) {
      return a.applyMatrix4(this.matrixWorld);
    },
    worldToLocal: function () {
      var a = new M();
      return function (b) {
        return b.applyMatrix4(a.getInverse(this.matrixWorld));
      };
    }(),
    lookAt: function () {
      var a = new M(),
          b = new p();
      return function (c, d, e) {
        c.isVector3 ? b.copy(c) : b.set(c, d, e);
        this.isCamera ? a.lookAt(this.position, b, this.up) : a.lookAt(b, this.position, this.up);
        this.quaternion.setFromRotationMatrix(a);
      };
    }(),
    add: function add(a) {
      if (1 < arguments.length) {
        for (var b = 0; b < arguments.length; b++) {
          this.add(arguments[b]);
        }

        return this;
      }

      if (a === this) return console.error("THREE.Object3D.add: object can't be added as a child of itself.", a), this;
      a && a.isObject3D ? (null !== a.parent && a.parent.remove(a), a.parent = this, a.dispatchEvent({
        type: "added"
      }), this.children.push(a)) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", a);
      return this;
    },
    remove: function remove(a) {
      if (1 < arguments.length) {
        for (var b = 0; b < arguments.length; b++) {
          this.remove(arguments[b]);
        }

        return this;
      }

      b = this.children.indexOf(a);
      -1 !== b && (a.parent = null, a.dispatchEvent({
        type: "removed"
      }), this.children.splice(b, 1));
      return this;
    },
    getObjectById: function getObjectById(a) {
      return this.getObjectByProperty("id", a);
    },
    getObjectByName: function getObjectByName(a) {
      return this.getObjectByProperty("name", a);
    },
    getObjectByProperty: function getObjectByProperty(a, b) {
      if (this[a] === b) return this;

      for (var c = 0, d = this.children.length; c < d; c++) {
        var e = this.children[c].getObjectByProperty(a, b);
        if (void 0 !== e) return e;
      }
    },
    getWorldPosition: function getWorldPosition(a) {
      void 0 === a && (console.warn("THREE.Object3D: .getWorldPosition() target is now required"), a = new p());
      this.updateMatrixWorld(!0);
      return a.setFromMatrixPosition(this.matrixWorld);
    },
    getWorldQuaternion: function () {
      var a = new p(),
          b = new p();
      return function (c) {
        void 0 === c && (console.warn("THREE.Object3D: .getWorldQuaternion() target is now required"), c = new ja());
        this.updateMatrixWorld(!0);
        this.matrixWorld.decompose(a, c, b);
        return c;
      };
    }(),
    getWorldScale: function () {
      var a = new p(),
          b = new ja();
      return function (c) {
        void 0 === c && (console.warn("THREE.Object3D: .getWorldScale() target is now required"), c = new p());
        this.updateMatrixWorld(!0);
        this.matrixWorld.decompose(a, b, c);
        return c;
      };
    }(),
    getWorldDirection: function () {
      var a = new ja();
      return function (b) {
        void 0 === b && (console.warn("THREE.Object3D: .getWorldDirection() target is now required"), b = new p());
        this.getWorldQuaternion(a);
        return b.set(0, 0, 1).applyQuaternion(a);
      };
    }(),
    raycast: function raycast() {},
    traverse: function traverse(a) {
      a(this);

      for (var b = this.children, c = 0, d = b.length; c < d; c++) {
        b[c].traverse(a);
      }
    },
    traverseVisible: function traverseVisible(a) {
      if (!1 !== this.visible) {
        a(this);

        for (var b = this.children, c = 0, d = b.length; c < d; c++) {
          b[c].traverseVisible(a);
        }
      }
    },
    traverseAncestors: function traverseAncestors(a) {
      var b = this.parent;
      null !== b && (a(b), b.traverseAncestors(a));
    },
    updateMatrix: function updateMatrix() {
      this.matrix.compose(this.position, this.quaternion, this.scale);
      this.matrixWorldNeedsUpdate = !0;
    },
    updateMatrixWorld: function updateMatrixWorld(a) {
      this.matrixAutoUpdate && this.updateMatrix();
      if (this.matrixWorldNeedsUpdate || a) null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, a = !0;

      for (var b = this.children, c = 0, d = b.length; c < d; c++) {
        b[c].updateMatrixWorld(a);
      }
    },
    toJSON: function toJSON(a) {
      function b(b, c) {
        void 0 === b[c.uuid] && (b[c.uuid] = c.toJSON(a));
        return c.uuid;
      }

      function c(a) {
        var b = [],
            c;

        for (c in a) {
          var d = a[c];
          delete d.metadata;
          b.push(d);
        }

        return b;
      }

      var d = void 0 === a || "string" === typeof a,
          e = {};
      d && (a = {
        geometries: {},
        materials: {},
        textures: {},
        images: {},
        shapes: {}
      }, e.metadata = {
        version: 4.5,
        type: "Object",
        generator: "Object3D.toJSON"
      });
      var f = {};
      f.uuid = this.uuid;
      f.type = this.type;
      "" !== this.name && (f.name = this.name);
      !0 === this.castShadow && (f.castShadow = !0);
      !0 === this.receiveShadow && (f.receiveShadow = !0);
      !1 === this.visible && (f.visible = !1);
      !1 === this.frustumCulled && (f.frustumCulled = !1);
      0 !== this.renderOrder && (f.renderOrder = this.renderOrder);
      "{}" !== (0, _stringify.default)(this.userData) && (f.userData = this.userData);
      f.matrix = this.matrix.toArray();

      if (void 0 !== this.geometry) {
        f.geometry = b(a.geometries, this.geometry);
        var g = this.geometry.parameters;
        if (void 0 !== g && void 0 !== g.shapes) if (g = g.shapes, (0, _isArray.default)(g)) for (var h = 0, l = g.length; h < l; h++) {
          b(a.shapes, g[h]);
        } else b(a.shapes, g);
      }

      if (void 0 !== this.material) if ((0, _isArray.default)(this.material)) {
        g = [];
        h = 0;

        for (l = this.material.length; h < l; h++) {
          g.push(b(a.materials, this.material[h]));
        }

        f.material = g;
      } else f.material = b(a.materials, this.material);
      if (0 < this.children.length) for (f.children = [], h = 0; h < this.children.length; h++) {
        f.children.push(this.children[h].toJSON(a).object);
      }

      if (d) {
        d = c(a.geometries);
        h = c(a.materials);
        l = c(a.textures);
        var m = c(a.images);
        g = c(a.shapes);
        0 < d.length && (e.geometries = d);
        0 < h.length && (e.materials = h);
        0 < l.length && (e.textures = l);
        0 < m.length && (e.images = m);
        0 < g.length && (e.shapes = g);
      }

      e.object = f;
      return e;
    },
    clone: function clone(a) {
      return new this.constructor().copy(this, a);
    },
    copy: function copy(a, b) {
      void 0 === b && (b = !0);
      this.name = a.name;
      this.up.copy(a.up);
      this.position.copy(a.position);
      this.quaternion.copy(a.quaternion);
      this.scale.copy(a.scale);
      this.matrix.copy(a.matrix);
      this.matrixWorld.copy(a.matrixWorld);
      this.matrixAutoUpdate = a.matrixAutoUpdate;
      this.matrixWorldNeedsUpdate = a.matrixWorldNeedsUpdate;
      this.layers.mask = a.layers.mask;
      this.visible = a.visible;
      this.castShadow = a.castShadow;
      this.receiveShadow = a.receiveShadow;
      this.frustumCulled = a.frustumCulled;
      this.renderOrder = a.renderOrder;
      this.userData = JSON.parse((0, _stringify.default)(a.userData));
      if (!0 === b) for (b = 0; b < a.children.length; b++) {
        this.add(a.children[b].clone());
      }
      return this;
    }
  });
  Qa.prototype = (0, _assign.default)((0, _create.default)(A.prototype), {
    constructor: Qa,
    isCamera: !0,
    copy: function copy(a, b) {
      A.prototype.copy.call(this, a, b);
      this.matrixWorldInverse.copy(a.matrixWorldInverse);
      this.projectionMatrix.copy(a.projectionMatrix);
      return this;
    },
    getWorldDirection: function () {
      var a = new ja();
      return function (b) {
        void 0 === b && (console.warn("THREE.Camera: .getWorldDirection() target is now required"), b = new p());
        this.getWorldQuaternion(a);
        return b.set(0, 0, -1).applyQuaternion(a);
      };
    }(),
    updateMatrixWorld: function updateMatrixWorld(a) {
      A.prototype.updateMatrixWorld.call(this, a);
      this.matrixWorldInverse.getInverse(this.matrixWorld);
    },
    clone: function clone() {
      return new this.constructor().copy(this);
    }
  });
  Jb.prototype = (0, _assign.default)((0, _create.default)(Qa.prototype), {
    constructor: Jb,
    isOrthographicCamera: !0,
    copy: function copy(a, b) {
      Qa.prototype.copy.call(this, a, b);
      this.left = a.left;
      this.right = a.right;
      this.top = a.top;
      this.bottom = a.bottom;
      this.near = a.near;
      this.far = a.far;
      this.zoom = a.zoom;
      this.view = null === a.view ? null : (0, _assign.default)({}, a.view);
      return this;
    },
    setViewOffset: function setViewOffset(a, b, c, d, e, f) {
      null === this.view && (this.view = {
        enabled: !0,
        fullWidth: 1,
        fullHeight: 1,
        offsetX: 0,
        offsetY: 0,
        width: 1,
        height: 1
      });
      this.view.enabled = !0;
      this.view.fullWidth = a;
      this.view.fullHeight = b;
      this.view.offsetX = c;
      this.view.offsetY = d;
      this.view.width = e;
      this.view.height = f;
      this.updateProjectionMatrix();
    },
    clearViewOffset: function clearViewOffset() {
      null !== this.view && (this.view.enabled = !1);
      this.updateProjectionMatrix();
    },
    updateProjectionMatrix: function updateProjectionMatrix() {
      var a = (this.right - this.left) / (2 * this.zoom),
          b = (this.top - this.bottom) / (2 * this.zoom),
          c = (this.right + this.left) / 2,
          d = (this.top + this.bottom) / 2,
          e = c - a;
      c += a;
      a = d + b;
      b = d - b;

      if (null !== this.view && this.view.enabled) {
        c = this.zoom / (this.view.width / this.view.fullWidth);
        b = this.zoom / (this.view.height / this.view.fullHeight);
        var f = (this.right - this.left) / this.view.width;
        d = (this.top - this.bottom) / this.view.height;
        e += this.view.offsetX / c * f;
        c = e + this.view.width / c * f;
        a -= this.view.offsetY / b * d;
        b = a - this.view.height / b * d;
      }

      this.projectionMatrix.makeOrthographic(e, c, a, b, this.near, this.far);
    },
    toJSON: function toJSON(a) {
      a = A.prototype.toJSON.call(this, a);
      a.object.zoom = this.zoom;
      a.object.left = this.left;
      a.object.right = this.right;
      a.object.top = this.top;
      a.object.bottom = this.bottom;
      a.object.near = this.near;
      a.object.far = this.far;
      null !== this.view && (a.object.view = (0, _assign.default)({}, this.view));
      return a;
    }
  });
  (0, _assign.default)(Wa.prototype, {
    clone: function clone() {
      return new this.constructor().copy(this);
    },
    copy: function copy(a) {
      this.a = a.a;
      this.b = a.b;
      this.c = a.c;
      this.normal.copy(a.normal);
      this.color.copy(a.color);
      this.materialIndex = a.materialIndex;

      for (var b = 0, c = a.vertexNormals.length; b < c; b++) {
        this.vertexNormals[b] = a.vertexNormals[b].clone();
      }

      b = 0;

      for (c = a.vertexColors.length; b < c; b++) {
        this.vertexColors[b] = a.vertexColors[b].clone();
      }

      return this;
    }
  });
  var Af = 0;
  N.prototype = (0, _assign.default)((0, _create.default)(xa.prototype), {
    constructor: N,
    isGeometry: !0,
    applyMatrix: function applyMatrix(a) {
      for (var b = new sa().getNormalMatrix(a), c = 0, d = this.vertices.length; c < d; c++) {
        this.vertices[c].applyMatrix4(a);
      }

      c = 0;

      for (d = this.faces.length; c < d; c++) {
        a = this.faces[c];
        a.normal.applyMatrix3(b).normalize();

        for (var e = 0, f = a.vertexNormals.length; e < f; e++) {
          a.vertexNormals[e].applyMatrix3(b).normalize();
        }
      }

      null !== this.boundingBox && this.computeBoundingBox();
      null !== this.boundingSphere && this.computeBoundingSphere();
      this.normalsNeedUpdate = this.verticesNeedUpdate = !0;
      return this;
    },
    rotateX: function () {
      var a = new M();
      return function (b) {
        a.makeRotationX(b);
        this.applyMatrix(a);
        return this;
      };
    }(),
    rotateY: function () {
      var a = new M();
      return function (b) {
        a.makeRotationY(b);
        this.applyMatrix(a);
        return this;
      };
    }(),
    rotateZ: function () {
      var a = new M();
      return function (b) {
        a.makeRotationZ(b);
        this.applyMatrix(a);
        return this;
      };
    }(),
    translate: function () {
      var a = new M();
      return function (b, c, d) {
        a.makeTranslation(b, c, d);
        this.applyMatrix(a);
        return this;
      };
    }(),
    scale: function () {
      var a = new M();
      return function (b, c, d) {
        a.makeScale(b, c, d);
        this.applyMatrix(a);
        return this;
      };
    }(),
    lookAt: function () {
      var a = new A();
      return function (b) {
        a.lookAt(b);
        a.updateMatrix();
        this.applyMatrix(a.matrix);
      };
    }(),
    fromBufferGeometry: function fromBufferGeometry(a) {
      function b(a, b, d, e) {
        var f = void 0 !== g ? [k[a].clone(), k[b].clone(), k[d].clone()] : [],
            p = void 0 !== h ? [c.colors[a].clone(), c.colors[b].clone(), c.colors[d].clone()] : [];
        e = new Wa(a, b, d, f, p, e);
        c.faces.push(e);
        void 0 !== l && c.faceVertexUvs[0].push([n[a].clone(), n[b].clone(), n[d].clone()]);
        void 0 !== m && c.faceVertexUvs[1].push([t[a].clone(), t[b].clone(), t[d].clone()]);
      }

      var c = this,
          d = null !== a.index ? a.index.array : void 0,
          e = a.attributes,
          f = e.position.array,
          g = void 0 !== e.normal ? e.normal.array : void 0,
          h = void 0 !== e.color ? e.color.array : void 0,
          l = void 0 !== e.uv ? e.uv.array : void 0,
          m = void 0 !== e.uv2 ? e.uv2.array : void 0;
      void 0 !== m && (this.faceVertexUvs[1] = []);

      for (var k = [], n = [], t = [], r = e = 0; e < f.length; e += 3, r += 2) {
        c.vertices.push(new p(f[e], f[e + 1], f[e + 2])), void 0 !== g && k.push(new p(g[e], g[e + 1], g[e + 2])), void 0 !== h && c.colors.push(new I(h[e], h[e + 1], h[e + 2])), void 0 !== l && n.push(new C(l[r], l[r + 1])), void 0 !== m && t.push(new C(m[r], m[r + 1]));
      }

      var q = a.groups;
      if (0 < q.length) for (e = 0; e < q.length; e++) {
        f = q[e];
        var v = f.start,
            x = f.count;
        r = v;

        for (v += x; r < v; r += 3) {
          void 0 !== d ? b(d[r], d[r + 1], d[r + 2], f.materialIndex) : b(r, r + 1, r + 2, f.materialIndex);
        }
      } else if (void 0 !== d) for (e = 0; e < d.length; e += 3) {
        b(d[e], d[e + 1], d[e + 2]);
      } else for (e = 0; e < f.length / 3; e += 3) {
        b(e, e + 1, e + 2);
      }
      this.computeFaceNormals();
      null !== a.boundingBox && (this.boundingBox = a.boundingBox.clone());
      null !== a.boundingSphere && (this.boundingSphere = a.boundingSphere.clone());
      return this;
    },
    center: function () {
      var a = new p();
      return function () {
        this.computeBoundingBox();
        this.boundingBox.getCenter(a).negate();
        this.translate(a.x, a.y, a.z);
        return this;
      };
    }(),
    normalize: function normalize() {
      this.computeBoundingSphere();
      var a = this.boundingSphere.center,
          b = this.boundingSphere.radius;
      b = 0 === b ? 1 : 1 / b;
      var c = new M();
      c.set(b, 0, 0, -b * a.x, 0, b, 0, -b * a.y, 0, 0, b, -b * a.z, 0, 0, 0, 1);
      this.applyMatrix(c);
      return this;
    },
    computeFaceNormals: function computeFaceNormals() {
      for (var a = new p(), b = new p(), c = 0, d = this.faces.length; c < d; c++) {
        var e = this.faces[c],
            f = this.vertices[e.a],
            g = this.vertices[e.b];
        a.subVectors(this.vertices[e.c], g);
        b.subVectors(f, g);
        a.cross(b);
        a.normalize();
        e.normal.copy(a);
      }
    },
    computeVertexNormals: function computeVertexNormals(a) {
      void 0 === a && (a = !0);
      var b;
      var c = Array(this.vertices.length);
      var d = 0;

      for (b = this.vertices.length; d < b; d++) {
        c[d] = new p();
      }

      if (a) {
        var e = new p(),
            f = new p();
        a = 0;

        for (d = this.faces.length; a < d; a++) {
          b = this.faces[a];
          var g = this.vertices[b.a];
          var h = this.vertices[b.b];
          var l = this.vertices[b.c];
          e.subVectors(l, h);
          f.subVectors(g, h);
          e.cross(f);
          c[b.a].add(e);
          c[b.b].add(e);
          c[b.c].add(e);
        }
      } else for (this.computeFaceNormals(), a = 0, d = this.faces.length; a < d; a++) {
        b = this.faces[a], c[b.a].add(b.normal), c[b.b].add(b.normal), c[b.c].add(b.normal);
      }

      d = 0;

      for (b = this.vertices.length; d < b; d++) {
        c[d].normalize();
      }

      a = 0;

      for (d = this.faces.length; a < d; a++) {
        b = this.faces[a], g = b.vertexNormals, 3 === g.length ? (g[0].copy(c[b.a]), g[1].copy(c[b.b]), g[2].copy(c[b.c])) : (g[0] = c[b.a].clone(), g[1] = c[b.b].clone(), g[2] = c[b.c].clone());
      }

      0 < this.faces.length && (this.normalsNeedUpdate = !0);
    },
    computeFlatVertexNormals: function computeFlatVertexNormals() {
      var a;
      this.computeFaceNormals();
      var b = 0;

      for (a = this.faces.length; b < a; b++) {
        var c = this.faces[b];
        var d = c.vertexNormals;
        3 === d.length ? (d[0].copy(c.normal), d[1].copy(c.normal), d[2].copy(c.normal)) : (d[0] = c.normal.clone(), d[1] = c.normal.clone(), d[2] = c.normal.clone());
      }

      0 < this.faces.length && (this.normalsNeedUpdate = !0);
    },
    computeMorphNormals: function computeMorphNormals() {
      var a, b;
      var c = 0;

      for (b = this.faces.length; c < b; c++) {
        var d = this.faces[c];
        d.__originalFaceNormal ? d.__originalFaceNormal.copy(d.normal) : d.__originalFaceNormal = d.normal.clone();
        d.__originalVertexNormals || (d.__originalVertexNormals = []);
        var e = 0;

        for (a = d.vertexNormals.length; e < a; e++) {
          d.__originalVertexNormals[e] ? d.__originalVertexNormals[e].copy(d.vertexNormals[e]) : d.__originalVertexNormals[e] = d.vertexNormals[e].clone();
        }
      }

      var f = new N();
      f.faces = this.faces;
      e = 0;

      for (a = this.morphTargets.length; e < a; e++) {
        if (!this.morphNormals[e]) {
          this.morphNormals[e] = {};
          this.morphNormals[e].faceNormals = [];
          this.morphNormals[e].vertexNormals = [];
          d = this.morphNormals[e].faceNormals;
          var g = this.morphNormals[e].vertexNormals;
          c = 0;

          for (b = this.faces.length; c < b; c++) {
            var h = new p();
            var l = {
              a: new p(),
              b: new p(),
              c: new p()
            };
            d.push(h);
            g.push(l);
          }
        }

        g = this.morphNormals[e];
        f.vertices = this.morphTargets[e].vertices;
        f.computeFaceNormals();
        f.computeVertexNormals();
        c = 0;

        for (b = this.faces.length; c < b; c++) {
          d = this.faces[c], h = g.faceNormals[c], l = g.vertexNormals[c], h.copy(d.normal), l.a.copy(d.vertexNormals[0]), l.b.copy(d.vertexNormals[1]), l.c.copy(d.vertexNormals[2]);
        }
      }

      c = 0;

      for (b = this.faces.length; c < b; c++) {
        d = this.faces[c], d.normal = d.__originalFaceNormal, d.vertexNormals = d.__originalVertexNormals;
      }
    },
    computeBoundingBox: function computeBoundingBox() {
      null === this.boundingBox && (this.boundingBox = new Va());
      this.boundingBox.setFromPoints(this.vertices);
    },
    computeBoundingSphere: function computeBoundingSphere() {
      null === this.boundingSphere && (this.boundingSphere = new Ea());
      this.boundingSphere.setFromPoints(this.vertices);
    },
    merge: function merge(a, b, c) {
      if (a && a.isGeometry) {
        var d,
            e = this.vertices.length,
            f = this.vertices,
            g = a.vertices,
            h = this.faces,
            l = a.faces,
            m = this.faceVertexUvs[0],
            k = a.faceVertexUvs[0],
            n = this.colors,
            p = a.colors;
        void 0 === c && (c = 0);
        void 0 !== b && (d = new sa().getNormalMatrix(b));
        a = 0;

        for (var r = g.length; a < r; a++) {
          var q = g[a].clone();
          void 0 !== b && q.applyMatrix4(b);
          f.push(q);
        }

        a = 0;

        for (r = p.length; a < r; a++) {
          n.push(p[a].clone());
        }

        a = 0;

        for (r = l.length; a < r; a++) {
          g = l[a];
          var v = g.vertexNormals;
          p = g.vertexColors;
          n = new Wa(g.a + e, g.b + e, g.c + e);
          n.normal.copy(g.normal);
          void 0 !== d && n.normal.applyMatrix3(d).normalize();
          b = 0;

          for (f = v.length; b < f; b++) {
            q = v[b].clone(), void 0 !== d && q.applyMatrix3(d).normalize(), n.vertexNormals.push(q);
          }

          n.color.copy(g.color);
          b = 0;

          for (f = p.length; b < f; b++) {
            q = p[b], n.vertexColors.push(q.clone());
          }

          n.materialIndex = g.materialIndex + c;
          h.push(n);
        }

        a = 0;

        for (r = k.length; a < r; a++) {
          if (c = k[a], d = [], void 0 !== c) {
            b = 0;

            for (f = c.length; b < f; b++) {
              d.push(c[b].clone());
            }

            m.push(d);
          }
        }
      } else console.error("THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.", a);
    },
    mergeMesh: function mergeMesh(a) {
      a && a.isMesh ? (a.matrixAutoUpdate && a.updateMatrix(), this.merge(a.geometry, a.matrix)) : console.error("THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.", a);
    },
    mergeVertices: function mergeVertices() {
      var a = {},
          b = [],
          c = [],
          d = Math.pow(10, 4),
          e;
      var f = 0;

      for (e = this.vertices.length; f < e; f++) {
        var g = this.vertices[f];
        g = Math.round(g.x * d) + "_" + Math.round(g.y * d) + "_" + Math.round(g.z * d);
        void 0 === a[g] ? (a[g] = f, b.push(this.vertices[f]), c[f] = b.length - 1) : c[f] = c[a[g]];
      }

      a = [];
      f = 0;

      for (e = this.faces.length; f < e; f++) {
        for (d = this.faces[f], d.a = c[d.a], d.b = c[d.b], d.c = c[d.c], d = [d.a, d.b, d.c], g = 0; 3 > g; g++) {
          if (d[g] === d[(g + 1) % 3]) {
            a.push(f);
            break;
          }
        }
      }

      for (f = a.length - 1; 0 <= f; f--) {
        for (d = a[f], this.faces.splice(d, 1), c = 0, e = this.faceVertexUvs.length; c < e; c++) {
          this.faceVertexUvs[c].splice(d, 1);
        }
      }

      f = this.vertices.length - b.length;
      this.vertices = b;
      return f;
    },
    setFromPoints: function setFromPoints(a) {
      this.vertices = [];

      for (var b = 0, c = a.length; b < c; b++) {
        var d = a[b];
        this.vertices.push(new p(d.x, d.y, d.z || 0));
      }

      return this;
    },
    sortFacesByMaterialIndex: function sortFacesByMaterialIndex() {
      for (var a = this.faces, b = a.length, c = 0; c < b; c++) {
        a[c]._id = c;
      }

      a.sort(function (a, b) {
        return a.materialIndex - b.materialIndex;
      });
      var d = this.faceVertexUvs[0],
          e = this.faceVertexUvs[1],
          f,
          g;
      d && d.length === b && (f = []);
      e && e.length === b && (g = []);

      for (c = 0; c < b; c++) {
        var h = a[c]._id;
        f && f.push(d[h]);
        g && g.push(e[h]);
      }

      f && (this.faceVertexUvs[0] = f);
      g && (this.faceVertexUvs[1] = g);
    },
    toJSON: function toJSON() {
      function a(a, b, c) {
        return c ? a | 1 << b : a & ~(1 << b);
      }

      function b(a) {
        var b = a.x.toString() + a.y.toString() + a.z.toString();
        if (void 0 !== m[b]) return m[b];
        m[b] = l.length / 3;
        l.push(a.x, a.y, a.z);
        return m[b];
      }

      function c(a) {
        var b = a.r.toString() + a.g.toString() + a.b.toString();
        if (void 0 !== n[b]) return n[b];
        n[b] = k.length;
        k.push(a.getHex());
        return n[b];
      }

      function d(a) {
        var b = a.x.toString() + a.y.toString();
        if (void 0 !== r[b]) return r[b];
        r[b] = p.length / 2;
        p.push(a.x, a.y);
        return r[b];
      }

      var e = {
        metadata: {
          version: 4.5,
          type: "Geometry",
          generator: "Geometry.toJSON"
        }
      };
      e.uuid = this.uuid;
      e.type = this.type;
      "" !== this.name && (e.name = this.name);

      if (void 0 !== this.parameters) {
        var f = this.parameters,
            g;

        for (g in f) {
          void 0 !== f[g] && (e[g] = f[g]);
        }

        return e;
      }

      f = [];

      for (g = 0; g < this.vertices.length; g++) {
        var h = this.vertices[g];
        f.push(h.x, h.y, h.z);
      }

      h = [];
      var l = [],
          m = {},
          k = [],
          n = {},
          p = [],
          r = {};

      for (g = 0; g < this.faces.length; g++) {
        var q = this.faces[g],
            v = void 0 !== this.faceVertexUvs[0][g],
            x = 0 < q.normal.length(),
            y = 0 < q.vertexNormals.length,
            w = 1 !== q.color.r || 1 !== q.color.g || 1 !== q.color.b,
            B = 0 < q.vertexColors.length,
            G = 0;
        G = a(G, 0, 0);
        G = a(G, 1, !0);
        G = a(G, 2, !1);
        G = a(G, 3, v);
        G = a(G, 4, x);
        G = a(G, 5, y);
        G = a(G, 6, w);
        G = a(G, 7, B);
        h.push(G);
        h.push(q.a, q.b, q.c);
        h.push(q.materialIndex);
        v && (v = this.faceVertexUvs[0][g], h.push(d(v[0]), d(v[1]), d(v[2])));
        x && h.push(b(q.normal));
        y && (x = q.vertexNormals, h.push(b(x[0]), b(x[1]), b(x[2])));
        w && h.push(c(q.color));
        B && (q = q.vertexColors, h.push(c(q[0]), c(q[1]), c(q[2])));
      }

      e.data = {};
      e.data.vertices = f;
      e.data.normals = l;
      0 < k.length && (e.data.colors = k);
      0 < p.length && (e.data.uvs = [p]);
      e.data.faces = h;
      return e;
    },
    clone: function clone() {
      return new N().copy(this);
    },
    copy: function copy(a) {
      var b, c, d;
      this.vertices = [];
      this.colors = [];
      this.faces = [];
      this.faceVertexUvs = [[]];
      this.morphTargets = [];
      this.morphNormals = [];
      this.skinWeights = [];
      this.skinIndices = [];
      this.lineDistances = [];
      this.boundingSphere = this.boundingBox = null;
      this.name = a.name;
      var e = a.vertices;
      var f = 0;

      for (b = e.length; f < b; f++) {
        this.vertices.push(e[f].clone());
      }

      e = a.colors;
      f = 0;

      for (b = e.length; f < b; f++) {
        this.colors.push(e[f].clone());
      }

      e = a.faces;
      f = 0;

      for (b = e.length; f < b; f++) {
        this.faces.push(e[f].clone());
      }

      f = 0;

      for (b = a.faceVertexUvs.length; f < b; f++) {
        var g = a.faceVertexUvs[f];
        void 0 === this.faceVertexUvs[f] && (this.faceVertexUvs[f] = []);
        e = 0;

        for (c = g.length; e < c; e++) {
          var h = g[e],
              l = [];
          var m = 0;

          for (d = h.length; m < d; m++) {
            l.push(h[m].clone());
          }

          this.faceVertexUvs[f].push(l);
        }
      }

      m = a.morphTargets;
      f = 0;

      for (b = m.length; f < b; f++) {
        d = {};
        d.name = m[f].name;
        if (void 0 !== m[f].vertices) for (d.vertices = [], e = 0, c = m[f].vertices.length; e < c; e++) {
          d.vertices.push(m[f].vertices[e].clone());
        }
        if (void 0 !== m[f].normals) for (d.normals = [], e = 0, c = m[f].normals.length; e < c; e++) {
          d.normals.push(m[f].normals[e].clone());
        }
        this.morphTargets.push(d);
      }

      m = a.morphNormals;
      f = 0;

      for (b = m.length; f < b; f++) {
        d = {};
        if (void 0 !== m[f].vertexNormals) for (d.vertexNormals = [], e = 0, c = m[f].vertexNormals.length; e < c; e++) {
          g = m[f].vertexNormals[e], h = {}, h.a = g.a.clone(), h.b = g.b.clone(), h.c = g.c.clone(), d.vertexNormals.push(h);
        }
        if (void 0 !== m[f].faceNormals) for (d.faceNormals = [], e = 0, c = m[f].faceNormals.length; e < c; e++) {
          d.faceNormals.push(m[f].faceNormals[e].clone());
        }
        this.morphNormals.push(d);
      }

      e = a.skinWeights;
      f = 0;

      for (b = e.length; f < b; f++) {
        this.skinWeights.push(e[f].clone());
      }

      e = a.skinIndices;
      f = 0;

      for (b = e.length; f < b; f++) {
        this.skinIndices.push(e[f].clone());
      }

      e = a.lineDistances;
      f = 0;

      for (b = e.length; f < b; f++) {
        this.lineDistances.push(e[f]);
      }

      f = a.boundingBox;
      null !== f && (this.boundingBox = f.clone());
      f = a.boundingSphere;
      null !== f && (this.boundingSphere = f.clone());
      this.elementsNeedUpdate = a.elementsNeedUpdate;
      this.verticesNeedUpdate = a.verticesNeedUpdate;
      this.uvsNeedUpdate = a.uvsNeedUpdate;
      this.normalsNeedUpdate = a.normalsNeedUpdate;
      this.colorsNeedUpdate = a.colorsNeedUpdate;
      this.lineDistancesNeedUpdate = a.lineDistancesNeedUpdate;
      this.groupsNeedUpdate = a.groupsNeedUpdate;
      return this;
    },
    dispose: function dispose() {
      this.dispatchEvent({
        type: "dispose"
      });
    }
  });
  (0, _defineProperty.default)(T.prototype, "needsUpdate", {
    set: function set(a) {
      !0 === a && this.version++;
    }
  });
  (0, _assign.default)(T.prototype, {
    isBufferAttribute: !0,
    onUploadCallback: function onUploadCallback() {},
    setArray: function setArray(a) {
      if ((0, _isArray.default)(a)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
      this.count = void 0 !== a ? a.length / this.itemSize : 0;
      this.array = a;
    },
    setDynamic: function setDynamic(a) {
      this.dynamic = a;
      return this;
    },
    copy: function copy(a) {
      this.array = new a.array.constructor(a.array);
      this.itemSize = a.itemSize;
      this.count = a.count;
      this.normalized = a.normalized;
      this.dynamic = a.dynamic;
      return this;
    },
    copyAt: function copyAt(a, b, c) {
      a *= this.itemSize;
      c *= b.itemSize;

      for (var d = 0, e = this.itemSize; d < e; d++) {
        this.array[a + d] = b.array[c + d];
      }

      return this;
    },
    copyArray: function copyArray(a) {
      this.array.set(a);
      return this;
    },
    copyColorsArray: function copyColorsArray(a) {
      for (var b = this.array, c = 0, d = 0, e = a.length; d < e; d++) {
        var f = a[d];
        void 0 === f && (console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined", d), f = new I());
        b[c++] = f.r;
        b[c++] = f.g;
        b[c++] = f.b;
      }

      return this;
    },
    copyVector2sArray: function copyVector2sArray(a) {
      for (var b = this.array, c = 0, d = 0, e = a.length; d < e; d++) {
        var f = a[d];
        void 0 === f && (console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined", d), f = new C());
        b[c++] = f.x;
        b[c++] = f.y;
      }

      return this;
    },
    copyVector3sArray: function copyVector3sArray(a) {
      for (var b = this.array, c = 0, d = 0, e = a.length; d < e; d++) {
        var f = a[d];
        void 0 === f && (console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined", d), f = new p());
        b[c++] = f.x;
        b[c++] = f.y;
        b[c++] = f.z;
      }

      return this;
    },
    copyVector4sArray: function copyVector4sArray(a) {
      for (var b = this.array, c = 0, d = 0, e = a.length; d < e; d++) {
        var f = a[d];
        void 0 === f && (console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined", d), f = new ea());
        b[c++] = f.x;
        b[c++] = f.y;
        b[c++] = f.z;
        b[c++] = f.w;
      }

      return this;
    },
    set: function set(a, b) {
      void 0 === b && (b = 0);
      this.array.set(a, b);
      return this;
    },
    getX: function getX(a) {
      return this.array[a * this.itemSize];
    },
    setX: function setX(a, b) {
      this.array[a * this.itemSize] = b;
      return this;
    },
    getY: function getY(a) {
      return this.array[a * this.itemSize + 1];
    },
    setY: function setY(a, b) {
      this.array[a * this.itemSize + 1] = b;
      return this;
    },
    getZ: function getZ(a) {
      return this.array[a * this.itemSize + 2];
    },
    setZ: function setZ(a, b) {
      this.array[a * this.itemSize + 2] = b;
      return this;
    },
    getW: function getW(a) {
      return this.array[a * this.itemSize + 3];
    },
    setW: function setW(a, b) {
      this.array[a * this.itemSize + 3] = b;
      return this;
    },
    setXY: function setXY(a, b, c) {
      a *= this.itemSize;
      this.array[a + 0] = b;
      this.array[a + 1] = c;
      return this;
    },
    setXYZ: function setXYZ(a, b, c, d) {
      a *= this.itemSize;
      this.array[a + 0] = b;
      this.array[a + 1] = c;
      this.array[a + 2] = d;
      return this;
    },
    setXYZW: function setXYZW(a, b, c, d, e) {
      a *= this.itemSize;
      this.array[a + 0] = b;
      this.array[a + 1] = c;
      this.array[a + 2] = d;
      this.array[a + 3] = e;
      return this;
    },
    onUpload: function onUpload(a) {
      this.onUploadCallback = a;
      return this;
    },
    clone: function clone() {
      return new this.constructor(this.array, this.itemSize).copy(this);
    }
  });
  rc.prototype = (0, _create.default)(T.prototype);
  rc.prototype.constructor = rc;
  sc.prototype = (0, _create.default)(T.prototype);
  sc.prototype.constructor = sc;
  tc.prototype = (0, _create.default)(T.prototype);
  tc.prototype.constructor = tc;
  uc.prototype = (0, _create.default)(T.prototype);
  uc.prototype.constructor = uc;
  kb.prototype = (0, _create.default)(T.prototype);
  kb.prototype.constructor = kb;
  vc.prototype = (0, _create.default)(T.prototype);
  vc.prototype.constructor = vc;
  lb.prototype = (0, _create.default)(T.prototype);
  lb.prototype.constructor = lb;
  z.prototype = (0, _create.default)(T.prototype);
  z.prototype.constructor = z;
  wc.prototype = (0, _create.default)(T.prototype);
  wc.prototype.constructor = wc;
  (0, _assign.default)(Ce.prototype, {
    computeGroups: function computeGroups(a) {
      var b = [],
          c = void 0;
      a = a.faces;

      for (var d = 0; d < a.length; d++) {
        var e = a[d];

        if (e.materialIndex !== c) {
          c = e.materialIndex;
          void 0 !== f && (f.count = 3 * d - f.start, b.push(f));
          var f = {
            start: 3 * d,
            materialIndex: c
          };
        }
      }

      void 0 !== f && (f.count = 3 * d - f.start, b.push(f));
      this.groups = b;
    },
    fromGeometry: function fromGeometry(a) {
      var b = a.faces,
          c = a.vertices,
          d = a.faceVertexUvs,
          e = d[0] && 0 < d[0].length,
          f = d[1] && 0 < d[1].length,
          g = a.morphTargets,
          h = g.length;

      if (0 < h) {
        var l = [];

        for (var m = 0; m < h; m++) {
          l[m] = [];
        }

        this.morphTargets.position = l;
      }

      var k = a.morphNormals,
          n = k.length;

      if (0 < n) {
        var p = [];

        for (m = 0; m < n; m++) {
          p[m] = [];
        }

        this.morphTargets.normal = p;
      }

      var r = a.skinIndices,
          q = a.skinWeights,
          v = r.length === c.length,
          x = q.length === c.length;

      for (m = 0; m < b.length; m++) {
        var y = b[m];
        this.vertices.push(c[y.a], c[y.b], c[y.c]);
        var w = y.vertexNormals;
        3 === w.length ? this.normals.push(w[0], w[1], w[2]) : (w = y.normal, this.normals.push(w, w, w));
        w = y.vertexColors;
        3 === w.length ? this.colors.push(w[0], w[1], w[2]) : (w = y.color, this.colors.push(w, w, w));
        !0 === e && (w = d[0][m], void 0 !== w ? this.uvs.push(w[0], w[1], w[2]) : (console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv ", m), this.uvs.push(new C(), new C(), new C())));
        !0 === f && (w = d[1][m], void 0 !== w ? this.uvs2.push(w[0], w[1], w[2]) : (console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv2 ", m), this.uvs2.push(new C(), new C(), new C())));

        for (w = 0; w < h; w++) {
          var B = g[w].vertices;
          l[w].push(B[y.a], B[y.b], B[y.c]);
        }

        for (w = 0; w < n; w++) {
          B = k[w].vertexNormals[m], p[w].push(B.a, B.b, B.c);
        }

        v && this.skinIndices.push(r[y.a], r[y.b], r[y.c]);
        x && this.skinWeights.push(q[y.a], q[y.b], q[y.c]);
      }

      this.computeGroups(a);
      this.verticesNeedUpdate = a.verticesNeedUpdate;
      this.normalsNeedUpdate = a.normalsNeedUpdate;
      this.colorsNeedUpdate = a.colorsNeedUpdate;
      this.uvsNeedUpdate = a.uvsNeedUpdate;
      this.groupsNeedUpdate = a.groupsNeedUpdate;
      return this;
    }
  });
  var Bf = 1;
  F.prototype = (0, _assign.default)((0, _create.default)(xa.prototype), {
    constructor: F,
    isBufferGeometry: !0,
    getIndex: function getIndex() {
      return this.index;
    },
    setIndex: function setIndex(a) {
      (0, _isArray.default)(a) ? this.index = new (65535 < De(a) ? lb : kb)(a, 1) : this.index = a;
    },
    addAttribute: function addAttribute(a, b, c) {
      if (b && b.isBufferAttribute || b && b.isInterleavedBufferAttribute) {
        if ("index" === a) console.warn("THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute."), this.setIndex(b);else return this.attributes[a] = b, this;
      } else console.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."), this.addAttribute(a, new T(b, c));
    },
    getAttribute: function getAttribute(a) {
      return this.attributes[a];
    },
    removeAttribute: function removeAttribute(a) {
      delete this.attributes[a];
      return this;
    },
    addGroup: function addGroup(a, b, c) {
      this.groups.push({
        start: a,
        count: b,
        materialIndex: void 0 !== c ? c : 0
      });
    },
    clearGroups: function clearGroups() {
      this.groups = [];
    },
    setDrawRange: function setDrawRange(a, b) {
      this.drawRange.start = a;
      this.drawRange.count = b;
    },
    applyMatrix: function applyMatrix(a) {
      var b = this.attributes.position;
      void 0 !== b && (a.applyToBufferAttribute(b), b.needsUpdate = !0);
      b = this.attributes.normal;
      void 0 !== b && (new sa().getNormalMatrix(a).applyToBufferAttribute(b), b.needsUpdate = !0);
      null !== this.boundingBox && this.computeBoundingBox();
      null !== this.boundingSphere && this.computeBoundingSphere();
      return this;
    },
    rotateX: function () {
      var a = new M();
      return function (b) {
        a.makeRotationX(b);
        this.applyMatrix(a);
        return this;
      };
    }(),
    rotateY: function () {
      var a = new M();
      return function (b) {
        a.makeRotationY(b);
        this.applyMatrix(a);
        return this;
      };
    }(),
    rotateZ: function () {
      var a = new M();
      return function (b) {
        a.makeRotationZ(b);
        this.applyMatrix(a);
        return this;
      };
    }(),
    translate: function () {
      var a = new M();
      return function (b, c, d) {
        a.makeTranslation(b, c, d);
        this.applyMatrix(a);
        return this;
      };
    }(),
    scale: function () {
      var a = new M();
      return function (b, c, d) {
        a.makeScale(b, c, d);
        this.applyMatrix(a);
        return this;
      };
    }(),
    lookAt: function () {
      var a = new A();
      return function (b) {
        a.lookAt(b);
        a.updateMatrix();
        this.applyMatrix(a.matrix);
      };
    }(),
    center: function () {
      var a = new p();
      return function () {
        this.computeBoundingBox();
        this.boundingBox.getCenter(a).negate();
        this.translate(a.x, a.y, a.z);
        return this;
      };
    }(),
    setFromObject: function setFromObject(a) {
      var b = a.geometry;

      if (a.isPoints || a.isLine) {
        a = new z(3 * b.vertices.length, 3);
        var c = new z(3 * b.colors.length, 3);
        this.addAttribute("position", a.copyVector3sArray(b.vertices));
        this.addAttribute("color", c.copyColorsArray(b.colors));
        b.lineDistances && b.lineDistances.length === b.vertices.length && (a = new z(b.lineDistances.length, 1), this.addAttribute("lineDistance", a.copyArray(b.lineDistances)));
        null !== b.boundingSphere && (this.boundingSphere = b.boundingSphere.clone());
        null !== b.boundingBox && (this.boundingBox = b.boundingBox.clone());
      } else a.isMesh && b && b.isGeometry && this.fromGeometry(b);

      return this;
    },
    setFromPoints: function setFromPoints(a) {
      for (var b = [], c = 0, d = a.length; c < d; c++) {
        var e = a[c];
        b.push(e.x, e.y, e.z || 0);
      }

      this.addAttribute("position", new z(b, 3));
      return this;
    },
    updateFromObject: function updateFromObject(a) {
      var b = a.geometry;

      if (a.isMesh) {
        var c = b.__directGeometry;
        !0 === b.elementsNeedUpdate && (c = void 0, b.elementsNeedUpdate = !1);
        if (void 0 === c) return this.fromGeometry(b);
        c.verticesNeedUpdate = b.verticesNeedUpdate;
        c.normalsNeedUpdate = b.normalsNeedUpdate;
        c.colorsNeedUpdate = b.colorsNeedUpdate;
        c.uvsNeedUpdate = b.uvsNeedUpdate;
        c.groupsNeedUpdate = b.groupsNeedUpdate;
        b.verticesNeedUpdate = !1;
        b.normalsNeedUpdate = !1;
        b.colorsNeedUpdate = !1;
        b.uvsNeedUpdate = !1;
        b.groupsNeedUpdate = !1;
        b = c;
      }

      !0 === b.verticesNeedUpdate && (c = this.attributes.position, void 0 !== c && (c.copyVector3sArray(b.vertices), c.needsUpdate = !0), b.verticesNeedUpdate = !1);
      !0 === b.normalsNeedUpdate && (c = this.attributes.normal, void 0 !== c && (c.copyVector3sArray(b.normals), c.needsUpdate = !0), b.normalsNeedUpdate = !1);
      !0 === b.colorsNeedUpdate && (c = this.attributes.color, void 0 !== c && (c.copyColorsArray(b.colors), c.needsUpdate = !0), b.colorsNeedUpdate = !1);
      b.uvsNeedUpdate && (c = this.attributes.uv, void 0 !== c && (c.copyVector2sArray(b.uvs), c.needsUpdate = !0), b.uvsNeedUpdate = !1);
      b.lineDistancesNeedUpdate && (c = this.attributes.lineDistance, void 0 !== c && (c.copyArray(b.lineDistances), c.needsUpdate = !0), b.lineDistancesNeedUpdate = !1);
      b.groupsNeedUpdate && (b.computeGroups(a.geometry), this.groups = b.groups, b.groupsNeedUpdate = !1);
      return this;
    },
    fromGeometry: function fromGeometry(a) {
      a.__directGeometry = new Ce().fromGeometry(a);
      return this.fromDirectGeometry(a.__directGeometry);
    },
    fromDirectGeometry: function fromDirectGeometry(a) {
      var b = new Float32Array(3 * a.vertices.length);
      this.addAttribute("position", new T(b, 3).copyVector3sArray(a.vertices));
      0 < a.normals.length && (b = new Float32Array(3 * a.normals.length), this.addAttribute("normal", new T(b, 3).copyVector3sArray(a.normals)));
      0 < a.colors.length && (b = new Float32Array(3 * a.colors.length), this.addAttribute("color", new T(b, 3).copyColorsArray(a.colors)));
      0 < a.uvs.length && (b = new Float32Array(2 * a.uvs.length), this.addAttribute("uv", new T(b, 2).copyVector2sArray(a.uvs)));
      0 < a.uvs2.length && (b = new Float32Array(2 * a.uvs2.length), this.addAttribute("uv2", new T(b, 2).copyVector2sArray(a.uvs2)));
      this.groups = a.groups;

      for (var c in a.morphTargets) {
        b = [];

        for (var d = a.morphTargets[c], e = 0, f = d.length; e < f; e++) {
          var g = d[e],
              h = new z(3 * g.length, 3);
          b.push(h.copyVector3sArray(g));
        }

        this.morphAttributes[c] = b;
      }

      0 < a.skinIndices.length && (c = new z(4 * a.skinIndices.length, 4), this.addAttribute("skinIndex", c.copyVector4sArray(a.skinIndices)));
      0 < a.skinWeights.length && (c = new z(4 * a.skinWeights.length, 4), this.addAttribute("skinWeight", c.copyVector4sArray(a.skinWeights)));
      null !== a.boundingSphere && (this.boundingSphere = a.boundingSphere.clone());
      null !== a.boundingBox && (this.boundingBox = a.boundingBox.clone());
      return this;
    },
    computeBoundingBox: function computeBoundingBox() {
      null === this.boundingBox && (this.boundingBox = new Va());
      var a = this.attributes.position;
      void 0 !== a ? this.boundingBox.setFromBufferAttribute(a) : this.boundingBox.makeEmpty();
      (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
    },
    computeBoundingSphere: function () {
      var a = new Va(),
          b = new p();
      return function () {
        null === this.boundingSphere && (this.boundingSphere = new Ea());
        var c = this.attributes.position;

        if (c) {
          var d = this.boundingSphere.center;
          a.setFromBufferAttribute(c);
          a.getCenter(d);

          for (var e = 0, f = 0, g = c.count; f < g; f++) {
            b.x = c.getX(f), b.y = c.getY(f), b.z = c.getZ(f), e = Math.max(e, d.distanceToSquared(b));
          }

          this.boundingSphere.radius = Math.sqrt(e);
          isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
        }
      };
    }(),
    computeFaceNormals: function computeFaceNormals() {},
    computeVertexNormals: function computeVertexNormals() {
      var a = this.index,
          b = this.attributes,
          c = this.groups;

      if (b.position) {
        var d = b.position.array;
        if (void 0 === b.normal) this.addAttribute("normal", new T(new Float32Array(d.length), 3));else for (var e = b.normal.array, f = 0, g = e.length; f < g; f++) {
          e[f] = 0;
        }
        e = b.normal.array;
        var h = new p(),
            l = new p(),
            m = new p(),
            k = new p(),
            n = new p();

        if (a) {
          a = a.array;
          0 === c.length && this.addGroup(0, a.length);

          for (var t = 0, r = c.length; t < r; ++t) {
            f = c[t];
            g = f.start;
            var q = f.count;
            f = g;

            for (g += q; f < g; f += 3) {
              q = 3 * a[f + 0];
              var v = 3 * a[f + 1];
              var x = 3 * a[f + 2];
              h.fromArray(d, q);
              l.fromArray(d, v);
              m.fromArray(d, x);
              k.subVectors(m, l);
              n.subVectors(h, l);
              k.cross(n);
              e[q] += k.x;
              e[q + 1] += k.y;
              e[q + 2] += k.z;
              e[v] += k.x;
              e[v + 1] += k.y;
              e[v + 2] += k.z;
              e[x] += k.x;
              e[x + 1] += k.y;
              e[x + 2] += k.z;
            }
          }
        } else for (f = 0, g = d.length; f < g; f += 9) {
          h.fromArray(d, f), l.fromArray(d, f + 3), m.fromArray(d, f + 6), k.subVectors(m, l), n.subVectors(h, l), k.cross(n), e[f] = k.x, e[f + 1] = k.y, e[f + 2] = k.z, e[f + 3] = k.x, e[f + 4] = k.y, e[f + 5] = k.z, e[f + 6] = k.x, e[f + 7] = k.y, e[f + 8] = k.z;
        }

        this.normalizeNormals();
        b.normal.needsUpdate = !0;
      }
    },
    merge: function merge(a, b) {
      if (a && a.isBufferGeometry) {
        void 0 === b && (b = 0, console.warn("THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge."));
        var c = this.attributes,
            d;

        for (d in c) {
          if (void 0 !== a.attributes[d]) {
            var e = c[d].array,
                f = a.attributes[d],
                g = f.array,
                h = 0;

            for (f = f.itemSize * b; h < g.length; h++, f++) {
              e[f] = g[h];
            }
          }
        }

        return this;
      }

      console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.", a);
    },
    normalizeNormals: function () {
      var a = new p();
      return function () {
        for (var b = this.attributes.normal, c = 0, d = b.count; c < d; c++) {
          a.x = b.getX(c), a.y = b.getY(c), a.z = b.getZ(c), a.normalize(), b.setXYZ(c, a.x, a.y, a.z);
        }
      };
    }(),
    toNonIndexed: function toNonIndexed() {
      if (null === this.index) return console.warn("THREE.BufferGeometry.toNonIndexed(): Geometry is already non-indexed."), this;
      var a = new F(),
          b = this.index.array,
          c = this.attributes,
          d;

      for (d in c) {
        var e = c[d],
            f = e.array,
            g = e.itemSize,
            h = new f.constructor(b.length * g),
            l = 0;
        e = 0;

        for (var m = b.length; e < m; e++) {
          var k = b[e] * g;

          for (var n = 0; n < g; n++) {
            h[l++] = f[k++];
          }
        }

        a.addAttribute(d, new T(h, g));
      }

      b = this.groups;
      e = 0;

      for (m = b.length; e < m; e++) {
        c = b[e], a.addGroup(c.start, c.count, c.materialIndex);
      }

      return a;
    },
    toJSON: function toJSON() {
      var a = {
        metadata: {
          version: 4.5,
          type: "BufferGeometry",
          generator: "BufferGeometry.toJSON"
        }
      };
      a.uuid = this.uuid;
      a.type = this.type;
      "" !== this.name && (a.name = this.name);

      if (void 0 !== this.parameters) {
        var b = this.parameters;

        for (e in b) {
          void 0 !== b[e] && (a[e] = b[e]);
        }

        return a;
      }

      a.data = {
        attributes: {}
      };
      var c = this.index;
      null !== c && (b = Array.prototype.slice.call(c.array), a.data.index = {
        type: c.array.constructor.name,
        array: b
      });
      c = this.attributes;

      for (e in c) {
        var d = c[e];
        b = Array.prototype.slice.call(d.array);
        a.data.attributes[e] = {
          itemSize: d.itemSize,
          type: d.array.constructor.name,
          array: b,
          normalized: d.normalized
        };
      }

      var e = this.groups;
      0 < e.length && (a.data.groups = JSON.parse((0, _stringify.default)(e)));
      e = this.boundingSphere;
      null !== e && (a.data.boundingSphere = {
        center: e.center.toArray(),
        radius: e.radius
      });
      return a;
    },
    clone: function clone() {
      return new F().copy(this);
    },
    copy: function copy(a) {
      var b;
      this.index = null;
      this.attributes = {};
      this.morphAttributes = {};
      this.groups = [];
      this.boundingSphere = this.boundingBox = null;
      this.name = a.name;
      var c = a.index;
      null !== c && this.setIndex(c.clone());
      c = a.attributes;

      for (g in c) {
        this.addAttribute(g, c[g].clone());
      }

      var d = a.morphAttributes;

      for (g in d) {
        var e = [],
            f = d[g];
        c = 0;

        for (b = f.length; c < b; c++) {
          e.push(f[c].clone());
        }

        this.morphAttributes[g] = e;
      }

      var g = a.groups;
      c = 0;

      for (b = g.length; c < b; c++) {
        d = g[c], this.addGroup(d.start, d.count, d.materialIndex);
      }

      g = a.boundingBox;
      null !== g && (this.boundingBox = g.clone());
      g = a.boundingSphere;
      null !== g && (this.boundingSphere = g.clone());
      this.drawRange.start = a.drawRange.start;
      this.drawRange.count = a.drawRange.count;
      return this;
    },
    dispose: function dispose() {
      this.dispatchEvent({
        type: "dispose"
      });
    }
  });
  Kb.prototype = (0, _create.default)(N.prototype);
  Kb.prototype.constructor = Kb;
  mb.prototype = (0, _create.default)(F.prototype);
  mb.prototype.constructor = mb;
  xc.prototype = (0, _create.default)(N.prototype);
  xc.prototype.constructor = xc;
  pb.prototype = (0, _create.default)(F.prototype);
  pb.prototype.constructor = pb;
  var Cf = 0;
  O.prototype = (0, _assign.default)((0, _create.default)(xa.prototype), {
    constructor: O,
    isMaterial: !0,
    onBeforeCompile: function onBeforeCompile() {},
    setValues: function setValues(a) {
      if (void 0 !== a) for (var b in a) {
        var c = a[b];
        if (void 0 === c) console.warn("THREE.Material: '" + b + "' parameter is undefined.");else if ("shading" === b) console.warn("THREE." + this.type + ": .shading has been removed. Use the boolean .flatShading instead."), this.flatShading = 1 === c ? !0 : !1;else {
          var d = this[b];
          void 0 === d ? console.warn("THREE." + this.type + ": '" + b + "' is not a property of this material.") : d && d.isColor ? d.set(c) : d && d.isVector3 && c && c.isVector3 ? d.copy(c) : this[b] = "overdraw" === b ? Number(c) : c;
        }
      }
    },
    toJSON: function toJSON(a) {
      function b(a) {
        var b = [],
            c;

        for (c in a) {
          var d = a[c];
          delete d.metadata;
          b.push(d);
        }

        return b;
      }

      var c = void 0 === a || "string" === typeof a;
      c && (a = {
        textures: {},
        images: {}
      });
      var d = {
        metadata: {
          version: 4.5,
          type: "Material",
          generator: "Material.toJSON"
        }
      };
      d.uuid = this.uuid;
      d.type = this.type;
      "" !== this.name && (d.name = this.name);
      this.color && this.color.isColor && (d.color = this.color.getHex());
      void 0 !== this.roughness && (d.roughness = this.roughness);
      void 0 !== this.metalness && (d.metalness = this.metalness);
      this.emissive && this.emissive.isColor && (d.emissive = this.emissive.getHex());
      1 !== this.emissiveIntensity && (d.emissiveIntensity = this.emissiveIntensity);
      this.specular && this.specular.isColor && (d.specular = this.specular.getHex());
      void 0 !== this.shininess && (d.shininess = this.shininess);
      void 0 !== this.clearCoat && (d.clearCoat = this.clearCoat);
      void 0 !== this.clearCoatRoughness && (d.clearCoatRoughness = this.clearCoatRoughness);
      this.map && this.map.isTexture && (d.map = this.map.toJSON(a).uuid);
      this.alphaMap && this.alphaMap.isTexture && (d.alphaMap = this.alphaMap.toJSON(a).uuid);
      this.lightMap && this.lightMap.isTexture && (d.lightMap = this.lightMap.toJSON(a).uuid);
      this.bumpMap && this.bumpMap.isTexture && (d.bumpMap = this.bumpMap.toJSON(a).uuid, d.bumpScale = this.bumpScale);
      this.normalMap && this.normalMap.isTexture && (d.normalMap = this.normalMap.toJSON(a).uuid, d.normalScale = this.normalScale.toArray());
      this.displacementMap && this.displacementMap.isTexture && (d.displacementMap = this.displacementMap.toJSON(a).uuid, d.displacementScale = this.displacementScale, d.displacementBias = this.displacementBias);
      this.roughnessMap && this.roughnessMap.isTexture && (d.roughnessMap = this.roughnessMap.toJSON(a).uuid);
      this.metalnessMap && this.metalnessMap.isTexture && (d.metalnessMap = this.metalnessMap.toJSON(a).uuid);
      this.emissiveMap && this.emissiveMap.isTexture && (d.emissiveMap = this.emissiveMap.toJSON(a).uuid);
      this.specularMap && this.specularMap.isTexture && (d.specularMap = this.specularMap.toJSON(a).uuid);
      this.envMap && this.envMap.isTexture && (d.envMap = this.envMap.toJSON(a).uuid, d.reflectivity = this.reflectivity);
      this.gradientMap && this.gradientMap.isTexture && (d.gradientMap = this.gradientMap.toJSON(a).uuid);
      void 0 !== this.size && (d.size = this.size);
      void 0 !== this.sizeAttenuation && (d.sizeAttenuation = this.sizeAttenuation);
      1 !== this.blending && (d.blending = this.blending);
      !0 === this.flatShading && (d.flatShading = this.flatShading);
      0 !== this.side && (d.side = this.side);
      0 !== this.vertexColors && (d.vertexColors = this.vertexColors);
      1 > this.opacity && (d.opacity = this.opacity);
      !0 === this.transparent && (d.transparent = this.transparent);
      d.depthFunc = this.depthFunc;
      d.depthTest = this.depthTest;
      d.depthWrite = this.depthWrite;
      0 !== this.rotation && (d.rotation = this.rotation);
      1 !== this.linewidth && (d.linewidth = this.linewidth);
      void 0 !== this.dashSize && (d.dashSize = this.dashSize);
      void 0 !== this.gapSize && (d.gapSize = this.gapSize);
      void 0 !== this.scale && (d.scale = this.scale);
      !0 === this.dithering && (d.dithering = !0);
      0 < this.alphaTest && (d.alphaTest = this.alphaTest);
      !0 === this.premultipliedAlpha && (d.premultipliedAlpha = this.premultipliedAlpha);
      !0 === this.wireframe && (d.wireframe = this.wireframe);
      1 < this.wireframeLinewidth && (d.wireframeLinewidth = this.wireframeLinewidth);
      "round" !== this.wireframeLinecap && (d.wireframeLinecap = this.wireframeLinecap);
      "round" !== this.wireframeLinejoin && (d.wireframeLinejoin = this.wireframeLinejoin);
      !0 === this.morphTargets && (d.morphTargets = !0);
      !0 === this.skinning && (d.skinning = !0);
      !1 === this.visible && (d.visible = !1);
      "{}" !== (0, _stringify.default)(this.userData) && (d.userData = this.userData);
      c && (c = b(a.textures), a = b(a.images), 0 < c.length && (d.textures = c), 0 < a.length && (d.images = a));
      return d;
    },
    clone: function clone() {
      return new this.constructor().copy(this);
    },
    copy: function copy(a) {
      this.name = a.name;
      this.fog = a.fog;
      this.lights = a.lights;
      this.blending = a.blending;
      this.side = a.side;
      this.flatShading = a.flatShading;
      this.vertexColors = a.vertexColors;
      this.opacity = a.opacity;
      this.transparent = a.transparent;
      this.blendSrc = a.blendSrc;
      this.blendDst = a.blendDst;
      this.blendEquation = a.blendEquation;
      this.blendSrcAlpha = a.blendSrcAlpha;
      this.blendDstAlpha = a.blendDstAlpha;
      this.blendEquationAlpha = a.blendEquationAlpha;
      this.depthFunc = a.depthFunc;
      this.depthTest = a.depthTest;
      this.depthWrite = a.depthWrite;
      this.colorWrite = a.colorWrite;
      this.precision = a.precision;
      this.polygonOffset = a.polygonOffset;
      this.polygonOffsetFactor = a.polygonOffsetFactor;
      this.polygonOffsetUnits = a.polygonOffsetUnits;
      this.dithering = a.dithering;
      this.alphaTest = a.alphaTest;
      this.premultipliedAlpha = a.premultipliedAlpha;
      this.overdraw = a.overdraw;
      this.visible = a.visible;
      this.userData = JSON.parse((0, _stringify.default)(a.userData));
      this.clipShadows = a.clipShadows;
      this.clipIntersection = a.clipIntersection;
      var b = a.clippingPlanes,
          c = null;

      if (null !== b) {
        var d = b.length;
        c = Array(d);

        for (var e = 0; e !== d; ++e) {
          c[e] = b[e].clone();
        }
      }

      this.clippingPlanes = c;
      this.shadowSide = a.shadowSide;
      return this;
    },
    dispose: function dispose() {
      this.dispatchEvent({
        type: "dispose"
      });
    }
  });
  za.prototype = (0, _create.default)(O.prototype);
  za.prototype.constructor = za;
  za.prototype.isMeshBasicMaterial = !0;

  za.prototype.copy = function (a) {
    O.prototype.copy.call(this, a);
    this.color.copy(a.color);
    this.map = a.map;
    this.lightMap = a.lightMap;
    this.lightMapIntensity = a.lightMapIntensity;
    this.aoMap = a.aoMap;
    this.aoMapIntensity = a.aoMapIntensity;
    this.specularMap = a.specularMap;
    this.alphaMap = a.alphaMap;
    this.envMap = a.envMap;
    this.combine = a.combine;
    this.reflectivity = a.reflectivity;
    this.refractionRatio = a.refractionRatio;
    this.wireframe = a.wireframe;
    this.wireframeLinewidth = a.wireframeLinewidth;
    this.wireframeLinecap = a.wireframeLinecap;
    this.wireframeLinejoin = a.wireframeLinejoin;
    this.skinning = a.skinning;
    this.morphTargets = a.morphTargets;
    return this;
  };

  va.prototype = (0, _create.default)(O.prototype);
  va.prototype.constructor = va;
  va.prototype.isShaderMaterial = !0;

  va.prototype.copy = function (a) {
    O.prototype.copy.call(this, a);
    this.fragmentShader = a.fragmentShader;
    this.vertexShader = a.vertexShader;
    this.uniforms = Da.clone(a.uniforms);
    this.defines = a.defines;
    this.wireframe = a.wireframe;
    this.wireframeLinewidth = a.wireframeLinewidth;
    this.lights = a.lights;
    this.clipping = a.clipping;
    this.skinning = a.skinning;
    this.morphTargets = a.morphTargets;
    this.morphNormals = a.morphNormals;
    this.extensions = a.extensions;
    return this;
  };

  va.prototype.toJSON = function (a) {
    a = O.prototype.toJSON.call(this, a);
    a.uniforms = this.uniforms;
    a.vertexShader = this.vertexShader;
    a.fragmentShader = this.fragmentShader;
    return a;
  };

  (0, _assign.default)(qb.prototype, {
    set: function set(a, b) {
      this.origin.copy(a);
      this.direction.copy(b);
      return this;
    },
    clone: function clone() {
      return new this.constructor().copy(this);
    },
    copy: function copy(a) {
      this.origin.copy(a.origin);
      this.direction.copy(a.direction);
      return this;
    },
    at: function at(a, b) {
      void 0 === b && (console.warn("THREE.Ray: .at() target is now required"), b = new p());
      return b.copy(this.direction).multiplyScalar(a).add(this.origin);
    },
    lookAt: function lookAt(a) {
      this.direction.copy(a).sub(this.origin).normalize();
      return this;
    },
    recast: function () {
      var a = new p();
      return function (b) {
        this.origin.copy(this.at(b, a));
        return this;
      };
    }(),
    closestPointToPoint: function closestPointToPoint(a, b) {
      void 0 === b && (console.warn("THREE.Ray: .closestPointToPoint() target is now required"), b = new p());
      b.subVectors(a, this.origin);
      a = b.dot(this.direction);
      return 0 > a ? b.copy(this.origin) : b.copy(this.direction).multiplyScalar(a).add(this.origin);
    },
    distanceToPoint: function distanceToPoint(a) {
      return Math.sqrt(this.distanceSqToPoint(a));
    },
    distanceSqToPoint: function () {
      var a = new p();
      return function (b) {
        var c = a.subVectors(b, this.origin).dot(this.direction);
        if (0 > c) return this.origin.distanceToSquared(b);
        a.copy(this.direction).multiplyScalar(c).add(this.origin);
        return a.distanceToSquared(b);
      };
    }(),
    distanceSqToSegment: function () {
      var a = new p(),
          b = new p(),
          c = new p();
      return function (d, e, f, g) {
        a.copy(d).add(e).multiplyScalar(.5);
        b.copy(e).sub(d).normalize();
        c.copy(this.origin).sub(a);
        var h = .5 * d.distanceTo(e),
            l = -this.direction.dot(b),
            m = c.dot(this.direction),
            k = -c.dot(b),
            n = c.lengthSq(),
            p = Math.abs(1 - l * l);

        if (0 < p) {
          d = l * k - m;
          e = l * m - k;
          var r = h * p;
          0 <= d ? e >= -r ? e <= r ? (h = 1 / p, d *= h, e *= h, l = d * (d + l * e + 2 * m) + e * (l * d + e + 2 * k) + n) : (e = h, d = Math.max(0, -(l * e + m)), l = -d * d + e * (e + 2 * k) + n) : (e = -h, d = Math.max(0, -(l * e + m)), l = -d * d + e * (e + 2 * k) + n) : e <= -r ? (d = Math.max(0, -(-l * h + m)), e = 0 < d ? -h : Math.min(Math.max(-h, -k), h), l = -d * d + e * (e + 2 * k) + n) : e <= r ? (d = 0, e = Math.min(Math.max(-h, -k), h), l = e * (e + 2 * k) + n) : (d = Math.max(0, -(l * h + m)), e = 0 < d ? h : Math.min(Math.max(-h, -k), h), l = -d * d + e * (e + 2 * k) + n);
        } else e = 0 < l ? -h : h, d = Math.max(0, -(l * e + m)), l = -d * d + e * (e + 2 * k) + n;

        f && f.copy(this.direction).multiplyScalar(d).add(this.origin);
        g && g.copy(b).multiplyScalar(e).add(a);
        return l;
      };
    }(),
    intersectSphere: function () {
      var a = new p();
      return function (b, c) {
        a.subVectors(b.center, this.origin);
        var d = a.dot(this.direction),
            e = a.dot(a) - d * d;
        b = b.radius * b.radius;
        if (e > b) return null;
        b = Math.sqrt(b - e);
        e = d - b;
        d += b;
        return 0 > e && 0 > d ? null : 0 > e ? this.at(d, c) : this.at(e, c);
      };
    }(),
    intersectsSphere: function intersectsSphere(a) {
      return this.distanceToPoint(a.center) <= a.radius;
    },
    distanceToPlane: function distanceToPlane(a) {
      var b = a.normal.dot(this.direction);
      if (0 === b) return 0 === a.distanceToPoint(this.origin) ? 0 : null;
      a = -(this.origin.dot(a.normal) + a.constant) / b;
      return 0 <= a ? a : null;
    },
    intersectPlane: function intersectPlane(a, b) {
      a = this.distanceToPlane(a);
      return null === a ? null : this.at(a, b);
    },
    intersectsPlane: function intersectsPlane(a) {
      var b = a.distanceToPoint(this.origin);
      return 0 === b || 0 > a.normal.dot(this.direction) * b ? !0 : !1;
    },
    intersectBox: function intersectBox(a, b) {
      var c = 1 / this.direction.x;
      var d = 1 / this.direction.y;
      var e = 1 / this.direction.z,
          f = this.origin;

      if (0 <= c) {
        var g = (a.min.x - f.x) * c;
        c *= a.max.x - f.x;
      } else g = (a.max.x - f.x) * c, c *= a.min.x - f.x;

      if (0 <= d) {
        var h = (a.min.y - f.y) * d;
        d *= a.max.y - f.y;
      } else h = (a.max.y - f.y) * d, d *= a.min.y - f.y;

      if (g > d || h > c) return null;
      if (h > g || g !== g) g = h;
      if (d < c || c !== c) c = d;
      0 <= e ? (h = (a.min.z - f.z) * e, a = (a.max.z - f.z) * e) : (h = (a.max.z - f.z) * e, a = (a.min.z - f.z) * e);
      if (g > a || h > c) return null;
      if (h > g || g !== g) g = h;
      if (a < c || c !== c) c = a;
      return 0 > c ? null : this.at(0 <= g ? g : c, b);
    },
    intersectsBox: function () {
      var a = new p();
      return function (b) {
        return null !== this.intersectBox(b, a);
      };
    }(),
    intersectTriangle: function () {
      var a = new p(),
          b = new p(),
          c = new p(),
          d = new p();
      return function (e, f, g, h, l) {
        b.subVectors(f, e);
        c.subVectors(g, e);
        d.crossVectors(b, c);
        f = this.direction.dot(d);

        if (0 < f) {
          if (h) return null;
          h = 1;
        } else if (0 > f) h = -1, f = -f;else return null;

        a.subVectors(this.origin, e);
        e = h * this.direction.dot(c.crossVectors(a, c));
        if (0 > e) return null;
        g = h * this.direction.dot(b.cross(a));
        if (0 > g || e + g > f) return null;
        e = -h * a.dot(d);
        return 0 > e ? null : this.at(e / f, l);
      };
    }(),
    applyMatrix4: function applyMatrix4(a) {
      this.origin.applyMatrix4(a);
      this.direction.transformDirection(a);
      return this;
    },
    equals: function equals(a) {
      return a.origin.equals(this.origin) && a.direction.equals(this.direction);
    }
  });
  (0, _assign.default)(Lb.prototype, {
    set: function set(a, b) {
      this.start.copy(a);
      this.end.copy(b);
      return this;
    },
    clone: function clone() {
      return new this.constructor().copy(this);
    },
    copy: function copy(a) {
      this.start.copy(a.start);
      this.end.copy(a.end);
      return this;
    },
    getCenter: function getCenter(a) {
      void 0 === a && (console.warn("THREE.Line3: .getCenter() target is now required"), a = new p());
      return a.addVectors(this.start, this.end).multiplyScalar(.5);
    },
    delta: function delta(a) {
      void 0 === a && (console.warn("THREE.Line3: .delta() target is now required"), a = new p());
      return a.subVectors(this.end, this.start);
    },
    distanceSq: function distanceSq() {
      return this.start.distanceToSquared(this.end);
    },
    distance: function distance() {
      return this.start.distanceTo(this.end);
    },
    at: function at(a, b) {
      void 0 === b && (console.warn("THREE.Line3: .at() target is now required"), b = new p());
      return this.delta(b).multiplyScalar(a).add(this.start);
    },
    closestPointToPointParameter: function () {
      var a = new p(),
          b = new p();
      return function (c, d) {
        a.subVectors(c, this.start);
        b.subVectors(this.end, this.start);
        c = b.dot(b);
        c = b.dot(a) / c;
        d && (c = S.clamp(c, 0, 1));
        return c;
      };
    }(),
    closestPointToPoint: function closestPointToPoint(a, b, c) {
      a = this.closestPointToPointParameter(a, b);
      void 0 === c && (console.warn("THREE.Line3: .closestPointToPoint() target is now required"), c = new p());
      return this.delta(c).multiplyScalar(a).add(this.start);
    },
    applyMatrix4: function applyMatrix4(a) {
      this.start.applyMatrix4(a);
      this.end.applyMatrix4(a);
      return this;
    },
    equals: function equals(a) {
      return a.start.equals(this.start) && a.end.equals(this.end);
    }
  });
  (0, _assign.default)(Aa, {
    getNormal: function () {
      var a = new p();
      return function (b, c, d, e) {
        void 0 === e && (console.warn("THREE.Triangle: .getNormal() target is now required"), e = new p());
        e.subVectors(d, c);
        a.subVectors(b, c);
        e.cross(a);
        b = e.lengthSq();
        return 0 < b ? e.multiplyScalar(1 / Math.sqrt(b)) : e.set(0, 0, 0);
      };
    }(),
    getBarycoord: function () {
      var a = new p(),
          b = new p(),
          c = new p();
      return function (d, e, f, g, h) {
        a.subVectors(g, e);
        b.subVectors(f, e);
        c.subVectors(d, e);
        d = a.dot(a);
        e = a.dot(b);
        f = a.dot(c);
        var l = b.dot(b);
        g = b.dot(c);
        var m = d * l - e * e;
        void 0 === h && (console.warn("THREE.Triangle: .getBarycoord() target is now required"), h = new p());
        if (0 === m) return h.set(-2, -1, -1);
        m = 1 / m;
        l = (l * f - e * g) * m;
        d = (d * g - e * f) * m;
        return h.set(1 - l - d, d, l);
      };
    }(),
    containsPoint: function () {
      var a = new p();
      return function (b, c, d, e) {
        Aa.getBarycoord(b, c, d, e, a);
        return 0 <= a.x && 0 <= a.y && 1 >= a.x + a.y;
      };
    }()
  });
  (0, _assign.default)(Aa.prototype, {
    set: function set(a, b, c) {
      this.a.copy(a);
      this.b.copy(b);
      this.c.copy(c);
      return this;
    },
    setFromPointsAndIndices: function setFromPointsAndIndices(a, b, c, d) {
      this.a.copy(a[b]);
      this.b.copy(a[c]);
      this.c.copy(a[d]);
      return this;
    },
    clone: function clone() {
      return new this.constructor().copy(this);
    },
    copy: function copy(a) {
      this.a.copy(a.a);
      this.b.copy(a.b);
      this.c.copy(a.c);
      return this;
    },
    getArea: function () {
      var a = new p(),
          b = new p();
      return function () {
        a.subVectors(this.c, this.b);
        b.subVectors(this.a, this.b);
        return .5 * a.cross(b).length();
      };
    }(),
    getMidpoint: function getMidpoint(a) {
      void 0 === a && (console.warn("THREE.Triangle: .getMidpoint() target is now required"), a = new p());
      return a.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
    },
    getNormal: function getNormal(a) {
      return Aa.getNormal(this.a, this.b, this.c, a);
    },
    getPlane: function getPlane(a) {
      void 0 === a && (console.warn("THREE.Triangle: .getPlane() target is now required"), a = new p());
      return a.setFromCoplanarPoints(this.a, this.b, this.c);
    },
    getBarycoord: function getBarycoord(a, b) {
      return Aa.getBarycoord(a, this.a, this.b, this.c, b);
    },
    containsPoint: function containsPoint(a) {
      return Aa.containsPoint(a, this.a, this.b, this.c);
    },
    intersectsBox: function intersectsBox(a) {
      return a.intersectsTriangle(this);
    },
    closestPointToPoint: function () {
      var a = new Fa(),
          b = [new Lb(), new Lb(), new Lb()],
          c = new p(),
          d = new p();
      return function (e, f) {
        void 0 === f && (console.warn("THREE.Triangle: .closestPointToPoint() target is now required"), f = new p());
        var g = Infinity;
        a.setFromCoplanarPoints(this.a, this.b, this.c);
        a.projectPoint(e, c);
        if (!0 === this.containsPoint(c)) f.copy(c);else for (b[0].set(this.a, this.b), b[1].set(this.b, this.c), b[2].set(this.c, this.a), e = 0; e < b.length; e++) {
          b[e].closestPointToPoint(c, !0, d);
          var h = c.distanceToSquared(d);
          h < g && (g = h, f.copy(d));
        }
        return f;
      };
    }(),
    equals: function equals(a) {
      return a.a.equals(this.a) && a.b.equals(this.b) && a.c.equals(this.c);
    }
  });
  oa.prototype = (0, _assign.default)((0, _create.default)(A.prototype), {
    constructor: oa,
    isMesh: !0,
    setDrawMode: function setDrawMode(a) {
      this.drawMode = a;
    },
    copy: function copy(a) {
      A.prototype.copy.call(this, a);
      this.drawMode = a.drawMode;
      void 0 !== a.morphTargetInfluences && (this.morphTargetInfluences = a.morphTargetInfluences.slice());
      void 0 !== a.morphTargetDictionary && (this.morphTargetDictionary = (0, _assign.default)({}, a.morphTargetDictionary));
      return this;
    },
    updateMorphTargets: function updateMorphTargets() {
      var a = this.geometry;

      if (a.isBufferGeometry) {
        a = a.morphAttributes;
        var b = (0, _keys.default)(a);

        if (0 < b.length) {
          var c = a[b[0]];
          if (void 0 !== c) for (this.morphTargetInfluences = [], this.morphTargetDictionary = {}, a = 0, b = c.length; a < b; a++) {
            var d = c[a].name || String(a);
            this.morphTargetInfluences.push(0);
            this.morphTargetDictionary[d] = a;
          }
        }
      } else if (c = a.morphTargets, void 0 !== c && 0 < c.length) for (this.morphTargetInfluences = [], this.morphTargetDictionary = {}, a = 0, b = c.length; a < b; a++) {
        d = c[a].name || String(a), this.morphTargetInfluences.push(0), this.morphTargetDictionary[d] = a;
      }
    },
    raycast: function () {
      function a(a, b, c, d, e, f, g) {
        Aa.getBarycoord(a, b, c, d, v);
        e.multiplyScalar(v.x);
        f.multiplyScalar(v.y);
        g.multiplyScalar(v.z);
        e.add(f).add(g);
        return e.clone();
      }

      function b(a, b, c, d, e, f, g, h) {
        if (null === (1 === b.side ? d.intersectTriangle(g, f, e, !0, h) : d.intersectTriangle(e, f, g, 2 !== b.side, h))) return null;
        y.copy(h);
        y.applyMatrix4(a.matrixWorld);
        b = c.ray.origin.distanceTo(y);
        return b < c.near || b > c.far ? null : {
          distance: b,
          point: y.clone(),
          object: a
        };
      }

      function c(c, d, e, f, m, k, n, p) {
        g.fromBufferAttribute(f, k);
        h.fromBufferAttribute(f, n);
        l.fromBufferAttribute(f, p);
        if (c = b(c, c.material, d, e, g, h, l, x)) m && (t.fromBufferAttribute(m, k), r.fromBufferAttribute(m, n), q.fromBufferAttribute(m, p), c.uv = a(x, g, h, l, t, r, q)), m = new Wa(k, n, p), Aa.getNormal(g, h, l, m.normal), c.face = m, c.faceIndex = k;
        return c;
      }

      var d = new M(),
          e = new qb(),
          f = new Ea(),
          g = new p(),
          h = new p(),
          l = new p(),
          m = new p(),
          k = new p(),
          n = new p(),
          t = new C(),
          r = new C(),
          q = new C(),
          v = new p(),
          x = new p(),
          y = new p();
      return function (p, u) {
        var v = this.geometry,
            w = this.material,
            y = this.matrixWorld;

        if (void 0 !== w && (null === v.boundingSphere && v.computeBoundingSphere(), f.copy(v.boundingSphere), f.applyMatrix4(y), !1 !== p.ray.intersectsSphere(f) && (d.getInverse(y), e.copy(p.ray).applyMatrix4(d), null === v.boundingBox || !1 !== e.intersectsBox(v.boundingBox)))) {
          var B;

          if (v.isBufferGeometry) {
            w = v.index;
            var C = v.attributes.position;
            y = v.attributes.uv;
            var A;

            if (null !== w) {
              var z = 0;

              for (A = w.count; z < A; z += 3) {
                v = w.getX(z);
                var E = w.getX(z + 1);
                var F = w.getX(z + 2);
                if (B = c(this, p, e, C, y, v, E, F)) B.faceIndex = Math.floor(z / 3), u.push(B);
              }
            } else if (void 0 !== C) for (z = 0, A = C.count; z < A; z += 3) {
              if (v = z, E = z + 1, F = z + 2, B = c(this, p, e, C, y, v, E, F)) B.index = v, u.push(B);
            }
          } else if (v.isGeometry) {
            y = (0, _isArray.default)(w);
            z = v.vertices;
            A = v.faces;
            E = v.faceVertexUvs[0];
            0 < E.length && (C = E);

            for (var I = 0, L = A.length; I < L; I++) {
              var Q = A[I];
              B = y ? w[Q.materialIndex] : w;

              if (void 0 !== B) {
                E = z[Q.a];
                F = z[Q.b];
                var N = z[Q.c];

                if (!0 === B.morphTargets) {
                  var M = v.morphTargets,
                      O = this.morphTargetInfluences;
                  g.set(0, 0, 0);
                  h.set(0, 0, 0);
                  l.set(0, 0, 0);

                  for (var T = 0, S = M.length; T < S; T++) {
                    var V = O[T];

                    if (0 !== V) {
                      var X = M[T].vertices;
                      g.addScaledVector(m.subVectors(X[Q.a], E), V);
                      h.addScaledVector(k.subVectors(X[Q.b], F), V);
                      l.addScaledVector(n.subVectors(X[Q.c], N), V);
                    }
                  }

                  g.add(E);
                  h.add(F);
                  l.add(N);
                  E = g;
                  F = h;
                  N = l;
                }

                if (B = b(this, B, p, e, E, F, N, x)) C && C[I] && (M = C[I], t.copy(M[0]), r.copy(M[1]), q.copy(M[2]), B.uv = a(x, E, F, N, t, r, q)), B.face = Q, B.faceIndex = I, u.push(B);
              }
            }
          }
        }
      };
    }(),
    clone: function clone() {
      return new this.constructor(this.geometry, this.material).copy(this);
    }
  });
  ab.prototype = (0, _create.default)(Y.prototype);
  ab.prototype.constructor = ab;
  ab.prototype.isCubeTexture = !0;
  (0, _defineProperty.default)(ab.prototype, "images", {
    get: function get() {
      return this.image;
    },
    set: function set(a) {
      this.image = a;
    }
  });
  var Je = new Y(),
      Ke = new ab(),
      Ee = [],
      Ge = [],
      Ie = new Float32Array(16),
      He = new Float32Array(9);

  Oe.prototype.setValue = function (a, b) {
    for (var c = this.seq, d = 0, e = c.length; d !== e; ++d) {
      var f = c[d];
      f.setValue(a, b[f.id]);
    }
  };

  var Ud = /([\w\d_]+)(\])?(\[|\.)?/g;

  bb.prototype.setValue = function (a, b, c) {
    b = this.map[b];
    void 0 !== b && b.setValue(a, c, this.renderer);
  };

  bb.prototype.setOptional = function (a, b, c) {
    b = b[c];
    void 0 !== b && this.setValue(a, c, b);
  };

  bb.upload = function (a, b, c, d) {
    for (var e = 0, f = b.length; e !== f; ++e) {
      var g = b[e],
          h = c[g.id];
      !1 !== h.needsUpdate && g.setValue(a, h.value, d);
    }
  };

  bb.seqWithValue = function (a, b) {
    for (var c = [], d = 0, e = a.length; d !== e; ++d) {
      var f = a[d];
      f.id in b && c.push(f);
    }

    return c;
  };

  var rg = 0,
      Ag = 0;
  cb.prototype = (0, _create.default)(O.prototype);
  cb.prototype.constructor = cb;
  cb.prototype.isMeshDepthMaterial = !0;

  cb.prototype.copy = function (a) {
    O.prototype.copy.call(this, a);
    this.depthPacking = a.depthPacking;
    this.skinning = a.skinning;
    this.morphTargets = a.morphTargets;
    this.map = a.map;
    this.alphaMap = a.alphaMap;
    this.displacementMap = a.displacementMap;
    this.displacementScale = a.displacementScale;
    this.displacementBias = a.displacementBias;
    this.wireframe = a.wireframe;
    this.wireframeLinewidth = a.wireframeLinewidth;
    return this;
  };

  db.prototype = (0, _create.default)(O.prototype);
  db.prototype.constructor = db;
  db.prototype.isMeshDistanceMaterial = !0;

  db.prototype.copy = function (a) {
    O.prototype.copy.call(this, a);
    this.referencePosition.copy(a.referencePosition);
    this.nearDistance = a.nearDistance;
    this.farDistance = a.farDistance;
    this.skinning = a.skinning;
    this.morphTargets = a.morphTargets;
    this.map = a.map;
    this.alphaMap = a.alphaMap;
    this.displacementMap = a.displacementMap;
    this.displacementScale = a.displacementScale;
    this.displacementBias = a.displacementBias;
    return this;
  };

  zc.prototype = (0, _create.default)(Y.prototype);
  zc.prototype.constructor = zc;
  la.prototype = (0, _assign.default)((0, _create.default)(Qa.prototype), {
    constructor: la,
    isPerspectiveCamera: !0,
    copy: function copy(a, b) {
      Qa.prototype.copy.call(this, a, b);
      this.fov = a.fov;
      this.zoom = a.zoom;
      this.near = a.near;
      this.far = a.far;
      this.focus = a.focus;
      this.aspect = a.aspect;
      this.view = null === a.view ? null : (0, _assign.default)({}, a.view);
      this.filmGauge = a.filmGauge;
      this.filmOffset = a.filmOffset;
      return this;
    },
    setFocalLength: function setFocalLength(a) {
      a = .5 * this.getFilmHeight() / a;
      this.fov = 2 * S.RAD2DEG * Math.atan(a);
      this.updateProjectionMatrix();
    },
    getFocalLength: function getFocalLength() {
      var a = Math.tan(.5 * S.DEG2RAD * this.fov);
      return .5 * this.getFilmHeight() / a;
    },
    getEffectiveFOV: function getEffectiveFOV() {
      return 2 * S.RAD2DEG * Math.atan(Math.tan(.5 * S.DEG2RAD * this.fov) / this.zoom);
    },
    getFilmWidth: function getFilmWidth() {
      return this.filmGauge * Math.min(this.aspect, 1);
    },
    getFilmHeight: function getFilmHeight() {
      return this.filmGauge / Math.max(this.aspect, 1);
    },
    setViewOffset: function setViewOffset(a, b, c, d, e, f) {
      this.aspect = a / b;
      null === this.view && (this.view = {
        enabled: !0,
        fullWidth: 1,
        fullHeight: 1,
        offsetX: 0,
        offsetY: 0,
        width: 1,
        height: 1
      });
      this.view.enabled = !0;
      this.view.fullWidth = a;
      this.view.fullHeight = b;
      this.view.offsetX = c;
      this.view.offsetY = d;
      this.view.width = e;
      this.view.height = f;
      this.updateProjectionMatrix();
    },
    clearViewOffset: function clearViewOffset() {
      null !== this.view && (this.view.enabled = !1);
      this.updateProjectionMatrix();
    },
    updateProjectionMatrix: function updateProjectionMatrix() {
      var a = this.near,
          b = a * Math.tan(.5 * S.DEG2RAD * this.fov) / this.zoom,
          c = 2 * b,
          d = this.aspect * c,
          e = -.5 * d,
          f = this.view;

      if (null !== this.view && this.view.enabled) {
        var g = f.fullWidth,
            h = f.fullHeight;
        e += f.offsetX * d / g;
        b -= f.offsetY * c / h;
        d *= f.width / g;
        c *= f.height / h;
      }

      f = this.filmOffset;
      0 !== f && (e += a * f / this.getFilmWidth());
      this.projectionMatrix.makePerspective(e, e + d, b, b - c, a, this.far);
    },
    toJSON: function toJSON(a) {
      a = A.prototype.toJSON.call(this, a);
      a.object.fov = this.fov;
      a.object.zoom = this.zoom;
      a.object.near = this.near;
      a.object.far = this.far;
      a.object.focus = this.focus;
      a.object.aspect = this.aspect;
      null !== this.view && (a.object.view = (0, _assign.default)({}, this.view));
      a.object.filmGauge = this.filmGauge;
      a.object.filmOffset = this.filmOffset;
      return a;
    }
  });
  qd.prototype = (0, _assign.default)((0, _create.default)(la.prototype), {
    constructor: qd,
    isArrayCamera: !0
  });
  Ob.prototype.isFogExp2 = !0;

  Ob.prototype.clone = function () {
    return new Ob(this.color.getHex(), this.density);
  };

  Ob.prototype.toJSON = function () {
    return {
      type: "FogExp2",
      color: this.color.getHex(),
      density: this.density
    };
  };

  Pb.prototype.isFog = !0;

  Pb.prototype.clone = function () {
    return new Pb(this.color.getHex(), this.near, this.far);
  };

  Pb.prototype.toJSON = function () {
    return {
      type: "Fog",
      color: this.color.getHex(),
      near: this.near,
      far: this.far
    };
  };

  rd.prototype = (0, _assign.default)((0, _create.default)(A.prototype), {
    constructor: rd,
    copy: function copy(a, b) {
      A.prototype.copy.call(this, a, b);
      null !== a.background && (this.background = a.background.clone());
      null !== a.fog && (this.fog = a.fog.clone());
      null !== a.overrideMaterial && (this.overrideMaterial = a.overrideMaterial.clone());
      this.autoUpdate = a.autoUpdate;
      this.matrixAutoUpdate = a.matrixAutoUpdate;
      return this;
    },
    toJSON: function toJSON(a) {
      var b = A.prototype.toJSON.call(this, a);
      null !== this.background && (b.object.background = this.background.toJSON(a));
      null !== this.fog && (b.object.fog = this.fog.toJSON());
      return b;
    }
  });
  eb.prototype = (0, _create.default)(O.prototype);
  eb.prototype.constructor = eb;
  eb.prototype.isSpriteMaterial = !0;

  eb.prototype.copy = function (a) {
    O.prototype.copy.call(this, a);
    this.color.copy(a.color);
    this.map = a.map;
    this.rotation = a.rotation;
    return this;
  };

  Ac.prototype = (0, _assign.default)((0, _create.default)(A.prototype), {
    constructor: Ac,
    isSprite: !0,
    raycast: function () {
      var a = new p(),
          b = new p(),
          c = new p();
      return function (d, e) {
        b.setFromMatrixPosition(this.matrixWorld);
        d.ray.closestPointToPoint(b, a);
        c.setFromMatrixScale(this.matrixWorld);
        var f = c.x * c.y / 4;
        b.distanceToSquared(a) > f || (f = d.ray.origin.distanceTo(a), f < d.near || f > d.far || e.push({
          distance: f,
          point: a.clone(),
          face: null,
          object: this
        }));
      };
    }(),
    clone: function clone() {
      return new this.constructor(this.material).copy(this);
    },
    copy: function copy(a) {
      A.prototype.copy.call(this, a);
      void 0 !== a.center && this.center.copy(a.center);
      return this;
    }
  });
  Bc.prototype = (0, _assign.default)((0, _create.default)(A.prototype), {
    constructor: Bc,
    copy: function copy(a) {
      A.prototype.copy.call(this, a, !1);
      a = a.levels;

      for (var b = 0, c = a.length; b < c; b++) {
        var d = a[b];
        this.addLevel(d.object.clone(), d.distance);
      }

      return this;
    },
    addLevel: function addLevel(a, b) {
      void 0 === b && (b = 0);
      b = Math.abs(b);

      for (var c = this.levels, d = 0; d < c.length && !(b < c[d].distance); d++) {
        ;
      }

      c.splice(d, 0, {
        distance: b,
        object: a
      });
      this.add(a);
    },
    getObjectForDistance: function getObjectForDistance(a) {
      for (var b = this.levels, c = 1, d = b.length; c < d && !(a < b[c].distance); c++) {
        ;
      }

      return b[c - 1].object;
    },
    raycast: function () {
      var a = new p();
      return function (b, c) {
        a.setFromMatrixPosition(this.matrixWorld);
        var d = b.ray.origin.distanceTo(a);
        this.getObjectForDistance(d).raycast(b, c);
      };
    }(),
    update: function () {
      var a = new p(),
          b = new p();
      return function (c) {
        var d = this.levels;

        if (1 < d.length) {
          a.setFromMatrixPosition(c.matrixWorld);
          b.setFromMatrixPosition(this.matrixWorld);
          c = a.distanceTo(b);
          d[0].object.visible = !0;

          for (var e = 1, f = d.length; e < f; e++) {
            if (c >= d[e].distance) d[e - 1].object.visible = !1, d[e].object.visible = !0;else break;
          }

          for (; e < f; e++) {
            d[e].object.visible = !1;
          }
        }
      };
    }(),
    toJSON: function toJSON(a) {
      a = A.prototype.toJSON.call(this, a);
      a.object.levels = [];

      for (var b = this.levels, c = 0, d = b.length; c < d; c++) {
        var e = b[c];
        a.object.levels.push({
          object: e.object.uuid,
          distance: e.distance
        });
      }

      return a;
    }
  });
  (0, _assign.default)(Cc.prototype, {
    calculateInverses: function calculateInverses() {
      this.boneInverses = [];

      for (var a = 0, b = this.bones.length; a < b; a++) {
        var c = new M();
        this.bones[a] && c.getInverse(this.bones[a].matrixWorld);
        this.boneInverses.push(c);
      }
    },
    pose: function pose() {
      var a, b;
      var c = 0;

      for (b = this.bones.length; c < b; c++) {
        (a = this.bones[c]) && a.matrixWorld.getInverse(this.boneInverses[c]);
      }

      c = 0;

      for (b = this.bones.length; c < b; c++) {
        if (a = this.bones[c]) a.parent && a.parent.isBone ? (a.matrix.getInverse(a.parent.matrixWorld), a.matrix.multiply(a.matrixWorld)) : a.matrix.copy(a.matrixWorld), a.matrix.decompose(a.position, a.quaternion, a.scale);
      }
    },
    update: function () {
      var a = new M(),
          b = new M();
      return function () {
        for (var c = this.bones, d = this.boneInverses, e = this.boneMatrices, f = this.boneTexture, g = 0, h = c.length; g < h; g++) {
          a.multiplyMatrices(c[g] ? c[g].matrixWorld : b, d[g]), a.toArray(e, 16 * g);
        }

        void 0 !== f && (f.needsUpdate = !0);
      };
    }(),
    clone: function clone() {
      return new Cc(this.bones, this.boneInverses);
    },
    getBoneByName: function getBoneByName(a) {
      for (var b = 0, c = this.bones.length; b < c; b++) {
        var d = this.bones[b];
        if (d.name === a) return d;
      }
    }
  });
  sd.prototype = (0, _assign.default)((0, _create.default)(A.prototype), {
    constructor: sd,
    isBone: !0
  });
  td.prototype = (0, _assign.default)((0, _create.default)(oa.prototype), {
    constructor: td,
    isSkinnedMesh: !0,
    initBones: function initBones() {
      var a = [],
          b;

      if (this.geometry && void 0 !== this.geometry.bones) {
        var c = 0;

        for (b = this.geometry.bones.length; c < b; c++) {
          var d = this.geometry.bones[c];
          var e = new sd();
          a.push(e);
          e.name = d.name;
          e.position.fromArray(d.pos);
          e.quaternion.fromArray(d.rotq);
          void 0 !== d.scl && e.scale.fromArray(d.scl);
        }

        c = 0;

        for (b = this.geometry.bones.length; c < b; c++) {
          d = this.geometry.bones[c], -1 !== d.parent && null !== d.parent && void 0 !== a[d.parent] ? a[d.parent].add(a[c]) : this.add(a[c]);
        }
      }

      this.updateMatrixWorld(!0);
      return a;
    },
    bind: function bind(a, b) {
      this.skeleton = a;
      void 0 === b && (this.updateMatrixWorld(!0), this.skeleton.calculateInverses(), b = this.matrixWorld);
      this.bindMatrix.copy(b);
      this.bindMatrixInverse.getInverse(b);
    },
    pose: function pose() {
      this.skeleton.pose();
    },
    normalizeSkinWeights: function normalizeSkinWeights() {
      var a;
      if (this.geometry && this.geometry.isGeometry) for (a = 0; a < this.geometry.skinWeights.length; a++) {
        var b = this.geometry.skinWeights[a];
        var c = 1 / b.manhattanLength();
        Infinity !== c ? b.multiplyScalar(c) : b.set(1, 0, 0, 0);
      } else if (this.geometry && this.geometry.isBufferGeometry) {
        b = new ea();
        var d = this.geometry.attributes.skinWeight;

        for (a = 0; a < d.count; a++) {
          b.x = d.getX(a), b.y = d.getY(a), b.z = d.getZ(a), b.w = d.getW(a), c = 1 / b.manhattanLength(), Infinity !== c ? b.multiplyScalar(c) : b.set(1, 0, 0, 0), d.setXYZW(a, b.x, b.y, b.z, b.w);
        }
      }
    },
    updateMatrixWorld: function updateMatrixWorld(a) {
      oa.prototype.updateMatrixWorld.call(this, a);
      "attached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.matrixWorld) : "detached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.bindMatrix) : console.warn("THREE.SkinnedMesh: Unrecognized bindMode: " + this.bindMode);
    },
    clone: function clone() {
      return new this.constructor(this.geometry, this.material).copy(this);
    }
  });
  U.prototype = (0, _create.default)(O.prototype);
  U.prototype.constructor = U;
  U.prototype.isLineBasicMaterial = !0;

  U.prototype.copy = function (a) {
    O.prototype.copy.call(this, a);
    this.color.copy(a.color);
    this.linewidth = a.linewidth;
    this.linecap = a.linecap;
    this.linejoin = a.linejoin;
    return this;
  };

  ua.prototype = (0, _assign.default)((0, _create.default)(A.prototype), {
    constructor: ua,
    isLine: !0,
    computeLineDistances: function () {
      var a = new p(),
          b = new p();
      return function () {
        var c = this.geometry;
        if (c.isBufferGeometry) {
          if (null === c.index) {
            for (var d = c.attributes.position, e = [0], f = 1, g = d.count; f < g; f++) {
              a.fromBufferAttribute(d, f - 1), b.fromBufferAttribute(d, f), e[f] = e[f - 1], e[f] += a.distanceTo(b);
            }

            c.addAttribute("lineDistance", new THREE.Float32BufferAttribute(e, 1));
          } else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
        } else if (c.isGeometry) for (d = c.vertices, e = c.lineDistances, e[0] = 0, f = 1, g = d.length; f < g; f++) {
          e[f] = e[f - 1], e[f] += d[f - 1].distanceTo(d[f]);
        }
        return this;
      };
    }(),
    raycast: function () {
      var a = new M(),
          b = new qb(),
          c = new Ea();
      return function (d, e) {
        var f = d.linePrecision;
        f *= f;
        var g = this.geometry,
            h = this.matrixWorld;
        null === g.boundingSphere && g.computeBoundingSphere();
        c.copy(g.boundingSphere);
        c.applyMatrix4(h);

        if (!1 !== d.ray.intersectsSphere(c)) {
          a.getInverse(h);
          b.copy(d.ray).applyMatrix4(a);
          var l = new p(),
              m = new p();
          h = new p();
          var k = new p(),
              n = this && this.isLineSegments ? 2 : 1;

          if (g.isBufferGeometry) {
            var t = g.index,
                r = g.attributes.position.array;

            if (null !== t) {
              t = t.array;
              g = 0;

              for (var q = t.length - 1; g < q; g += n) {
                var v = t[g + 1];
                l.fromArray(r, 3 * t[g]);
                m.fromArray(r, 3 * v);
                v = b.distanceSqToSegment(l, m, k, h);
                v > f || (k.applyMatrix4(this.matrixWorld), v = d.ray.origin.distanceTo(k), v < d.near || v > d.far || e.push({
                  distance: v,
                  point: h.clone().applyMatrix4(this.matrixWorld),
                  index: g,
                  face: null,
                  faceIndex: null,
                  object: this
                }));
              }
            } else for (g = 0, q = r.length / 3 - 1; g < q; g += n) {
              l.fromArray(r, 3 * g), m.fromArray(r, 3 * g + 3), v = b.distanceSqToSegment(l, m, k, h), v > f || (k.applyMatrix4(this.matrixWorld), v = d.ray.origin.distanceTo(k), v < d.near || v > d.far || e.push({
                distance: v,
                point: h.clone().applyMatrix4(this.matrixWorld),
                index: g,
                face: null,
                faceIndex: null,
                object: this
              }));
            }
          } else if (g.isGeometry) for (l = g.vertices, m = l.length, g = 0; g < m - 1; g += n) {
            v = b.distanceSqToSegment(l[g], l[g + 1], k, h), v > f || (k.applyMatrix4(this.matrixWorld), v = d.ray.origin.distanceTo(k), v < d.near || v > d.far || e.push({
              distance: v,
              point: h.clone().applyMatrix4(this.matrixWorld),
              index: g,
              face: null,
              faceIndex: null,
              object: this
            }));
          }
        }
      };
    }(),
    clone: function clone() {
      return new this.constructor(this.geometry, this.material).copy(this);
    }
  });
  aa.prototype = (0, _assign.default)((0, _create.default)(ua.prototype), {
    constructor: aa,
    isLineSegments: !0,
    computeLineDistances: function () {
      var a = new p(),
          b = new p();
      return function () {
        var c = this.geometry;
        if (c.isBufferGeometry) {
          if (null === c.index) {
            for (var d = c.attributes.position, e = [], f = 0, g = d.count; f < g; f += 2) {
              a.fromBufferAttribute(d, f), b.fromBufferAttribute(d, f + 1), e[f] = 0 === f ? 0 : e[f - 1], e[f + 1] = e[f] + a.distanceTo(b);
            }

            c.addAttribute("lineDistance", new THREE.Float32BufferAttribute(e, 1));
          } else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
        } else if (c.isGeometry) for (d = c.vertices, e = c.lineDistances, f = 0, g = d.length; f < g; f += 2) {
          a.copy(d[f]), b.copy(d[f + 1]), e[f] = 0 === f ? 0 : e[f - 1], e[f + 1] = e[f] + a.distanceTo(b);
        }
        return this;
      };
    }()
  });
  ud.prototype = (0, _assign.default)((0, _create.default)(ua.prototype), {
    constructor: ud,
    isLineLoop: !0
  });
  Ha.prototype = (0, _create.default)(O.prototype);
  Ha.prototype.constructor = Ha;
  Ha.prototype.isPointsMaterial = !0;

  Ha.prototype.copy = function (a) {
    O.prototype.copy.call(this, a);
    this.color.copy(a.color);
    this.map = a.map;
    this.size = a.size;
    this.sizeAttenuation = a.sizeAttenuation;
    return this;
  };

  Qb.prototype = (0, _assign.default)((0, _create.default)(A.prototype), {
    constructor: Qb,
    isPoints: !0,
    raycast: function () {
      var a = new M(),
          b = new qb(),
          c = new Ea();
      return function (d, e) {
        function f(a, c) {
          var f = b.distanceSqToPoint(a);
          f < k && (b.closestPointToPoint(a, n), n.applyMatrix4(l), a = d.ray.origin.distanceTo(n), a < d.near || a > d.far || e.push({
            distance: a,
            distanceToRay: Math.sqrt(f),
            point: n.clone(),
            index: c,
            face: null,
            object: g
          }));
        }

        var g = this,
            h = this.geometry,
            l = this.matrixWorld,
            m = d.params.Points.threshold;
        null === h.boundingSphere && h.computeBoundingSphere();
        c.copy(h.boundingSphere);
        c.applyMatrix4(l);
        c.radius += m;

        if (!1 !== d.ray.intersectsSphere(c)) {
          a.getInverse(l);
          b.copy(d.ray).applyMatrix4(a);
          m /= (this.scale.x + this.scale.y + this.scale.z) / 3;
          var k = m * m;
          m = new p();
          var n = new p();

          if (h.isBufferGeometry) {
            var t = h.index;
            h = h.attributes.position.array;

            if (null !== t) {
              var r = t.array;
              t = 0;

              for (var q = r.length; t < q; t++) {
                var v = r[t];
                m.fromArray(h, 3 * v);
                f(m, v);
              }
            } else for (t = 0, r = h.length / 3; t < r; t++) {
              m.fromArray(h, 3 * t), f(m, t);
            }
          } else for (m = h.vertices, t = 0, r = m.length; t < r; t++) {
            f(m[t], t);
          }
        }
      };
    }(),
    clone: function clone() {
      return new this.constructor(this.geometry, this.material).copy(this);
    }
  });
  vd.prototype = (0, _assign.default)((0, _create.default)(A.prototype), {
    constructor: vd,
    isGroup: !0
  });
  Yd.prototype = (0, _assign.default)((0, _create.default)(Y.prototype), {
    constructor: Yd,
    isVideoTexture: !0,
    update: function update() {
      var a = this.image;
      a.readyState >= a.HAVE_CURRENT_DATA && (this.needsUpdate = !0);
    }
  });
  Rb.prototype = (0, _create.default)(Y.prototype);
  Rb.prototype.constructor = Rb;
  Rb.prototype.isCompressedTexture = !0;
  Dc.prototype = (0, _create.default)(Y.prototype);
  Dc.prototype.constructor = Dc;
  Dc.prototype.isDepthTexture = !0;
  Sb.prototype = (0, _create.default)(F.prototype);
  Sb.prototype.constructor = Sb;
  Ec.prototype = (0, _create.default)(N.prototype);
  Ec.prototype.constructor = Ec;
  Tb.prototype = (0, _create.default)(F.prototype);
  Tb.prototype.constructor = Tb;
  Fc.prototype = (0, _create.default)(N.prototype);
  Fc.prototype.constructor = Fc;
  pa.prototype = (0, _create.default)(F.prototype);
  pa.prototype.constructor = pa;
  Gc.prototype = (0, _create.default)(N.prototype);
  Gc.prototype.constructor = Gc;
  Ub.prototype = (0, _create.default)(pa.prototype);
  Ub.prototype.constructor = Ub;
  Hc.prototype = (0, _create.default)(N.prototype);
  Hc.prototype.constructor = Hc;
  sb.prototype = (0, _create.default)(pa.prototype);
  sb.prototype.constructor = sb;
  Ic.prototype = (0, _create.default)(N.prototype);
  Ic.prototype.constructor = Ic;
  Vb.prototype = (0, _create.default)(pa.prototype);
  Vb.prototype.constructor = Vb;
  Jc.prototype = (0, _create.default)(N.prototype);
  Jc.prototype.constructor = Jc;
  Wb.prototype = (0, _create.default)(pa.prototype);
  Wb.prototype.constructor = Wb;
  Kc.prototype = (0, _create.default)(N.prototype);
  Kc.prototype.constructor = Kc;
  Xb.prototype = (0, _create.default)(F.prototype);
  Xb.prototype.constructor = Xb;
  Lc.prototype = (0, _create.default)(N.prototype);
  Lc.prototype.constructor = Lc;
  Yb.prototype = (0, _create.default)(F.prototype);
  Yb.prototype.constructor = Yb;
  Mc.prototype = (0, _create.default)(N.prototype);
  Mc.prototype.constructor = Mc;
  Zb.prototype = (0, _create.default)(F.prototype);
  Zb.prototype.constructor = Zb;
  var Lg = {
    triangulate: function triangulate(a, b, c) {
      c = c || 2;
      var d = b && b.length,
          e = d ? b[0] * c : a.length,
          f = Xe(a, 0, e, c, !0),
          g = [];
      if (!f) return g;
      var h;

      if (d) {
        var l = c;
        d = [];
        var m;
        var k = 0;

        for (m = b.length; k < m; k++) {
          var n = b[k] * l;
          var p = k < m - 1 ? b[k + 1] * l : a.length;
          n = Xe(a, n, p, l, !1);
          n === n.next && (n.steiner = !0);
          d.push(Jg(n));
        }

        d.sort(Hg);

        for (k = 0; k < d.length; k++) {
          b = d[k];
          l = f;
          if (l = Ig(b, l)) b = $e(l, b), Oc(b, b.next);
          f = Oc(f, f.next);
        }
      }

      if (a.length > 80 * c) {
        var r = h = a[0];
        var q = d = a[1];

        for (l = c; l < e; l += c) {
          k = a[l], b = a[l + 1], k < r && (r = k), b < q && (q = b), k > h && (h = k), b > d && (d = b);
        }

        h = Math.max(h - r, d - q);
        h = 0 !== h ? 1 / h : 0;
      }

      Pc(f, g, c, r, q, h);
      return g;
    }
  },
      Xa = {
    area: function area(a) {
      for (var b = a.length, c = 0, d = b - 1, e = 0; e < b; d = e++) {
        c += a[d].x * a[e].y - a[e].x * a[d].y;
      }

      return .5 * c;
    },
    isClockWise: function isClockWise(a) {
      return 0 > Xa.area(a);
    },
    triangulateShape: function triangulateShape(a, b) {
      var c = [],
          d = [],
          e = [];
      af(a);
      bf(c, a);
      var f = a.length;
      b.forEach(af);

      for (a = 0; a < b.length; a++) {
        d.push(f), f += b[a].length, bf(c, b[a]);
      }

      b = Lg.triangulate(c, d);

      for (a = 0; a < b.length; a += 3) {
        e.push(b.slice(a, a + 3));
      }

      return e;
    }
  };
  fb.prototype = (0, _create.default)(N.prototype);
  fb.prototype.constructor = fb;
  Ia.prototype = (0, _create.default)(F.prototype);
  Ia.prototype.constructor = Ia;

  Ia.prototype.getArrays = function () {
    var a = this.getAttribute("position");
    a = a ? Array.prototype.slice.call(a.array) : [];
    var b = this.getAttribute("uv");
    b = b ? Array.prototype.slice.call(b.array) : [];
    var c = this.index;
    c = c ? Array.prototype.slice.call(c.array) : [];
    return {
      position: a,
      uv: b,
      index: c
    };
  };

  Ia.prototype.addShapeList = function (a, b) {
    var c = a.length;
    b.arrays = this.getArrays();

    for (var d = 0; d < c; d++) {
      this.addShape(a[d], b);
    }

    this.setIndex(b.arrays.index);
    this.addAttribute("position", new z(b.arrays.position, 3));
    this.addAttribute("uv", new z(b.arrays.uv, 2));
  };

  Ia.prototype.addShape = function (a, b) {
    function c(a, b, c) {
      b || console.error("THREE.ExtrudeGeometry: vec does not exist");
      return b.clone().multiplyScalar(c).add(a);
    }

    function d(a, b, c) {
      var d = a.x - b.x;
      var e = a.y - b.y;
      var f = c.x - a.x;
      var g = c.y - a.y,
          h = d * d + e * e;

      if (Math.abs(d * g - e * f) > _epsilon.default) {
        var l = Math.sqrt(h),
            m = Math.sqrt(f * f + g * g);
        h = b.x - e / l;
        b = b.y + d / l;
        g = ((c.x - g / m - h) * g - (c.y + f / m - b) * f) / (d * g - e * f);
        f = h + d * g - a.x;
        d = b + e * g - a.y;
        e = f * f + d * d;
        if (2 >= e) return new C(f, d);
        e = Math.sqrt(e / 2);
      } else a = !1, d > _epsilon.default ? f > _epsilon.default && (a = !0) : d < -_epsilon.default ? f < -_epsilon.default && (a = !0) : Math.sign(e) === Math.sign(g) && (a = !0), a ? (f = -e, e = Math.sqrt(h)) : (f = d, d = e, e = Math.sqrt(h / 2));

      return new C(f / e, d / e);
    }

    function e(a, b) {
      for (J = a.length; 0 <= --J;) {
        var c = J;
        var d = J - 1;
        0 > d && (d = a.length - 1);
        var e,
            f = B + 2 * x;

        for (e = 0; e < f; e++) {
          var g = aa * e,
              m = aa * (e + 1),
              n = b + d + g,
              p = b + d + m;
          m = b + c + m;
          h(b + c + g);
          h(n);
          h(m);
          h(n);
          h(p);
          h(m);
          g = k.length / 3;
          g = E.generateSideWallUV(T, k, g - 6, g - 3, g - 2, g - 1);
          l(g[0]);
          l(g[1]);
          l(g[3]);
          l(g[1]);
          l(g[2]);
          l(g[3]);
        }
      }
    }

    function f(a, b, c) {
      r.push(a);
      r.push(b);
      r.push(c);
    }

    function g(a, b, c) {
      h(a);
      h(b);
      h(c);
      a = k.length / 3;
      a = E.generateTopUV(T, k, a - 3, a - 2, a - 1);
      l(a[0]);
      l(a[1]);
      l(a[2]);
    }

    function h(a) {
      n.push(k.length / 3);
      k.push(r[3 * a]);
      k.push(r[3 * a + 1]);
      k.push(r[3 * a + 2]);
    }

    function l(a) {
      t.push(a.x);
      t.push(a.y);
    }

    var m = b.arrays ? b.arrays : this.getArrays(),
        k = m.position,
        n = m.index,
        t = m.uv,
        r = [];
    m = void 0 !== b.amount ? b.amount : 100;
    var q = void 0 !== b.bevelThickness ? b.bevelThickness : 6,
        v = void 0 !== b.bevelSize ? b.bevelSize : q - 2,
        x = void 0 !== b.bevelSegments ? b.bevelSegments : 3,
        y = void 0 !== b.bevelEnabled ? b.bevelEnabled : !0,
        w = void 0 !== b.curveSegments ? b.curveSegments : 12,
        B = void 0 !== b.steps ? b.steps : 1,
        G = b.extrudePath,
        A = !1,
        E = void 0 !== b.UVGenerator ? b.UVGenerator : fb.WorldUVGenerator;

    if (G) {
      var H = G.getSpacedPoints(B);
      A = !0;
      y = !1;
      var F = void 0 !== b.frames ? b.frames : G.computeFrenetFrames(B, !1);
      var I = new p();
      var N = new p();
      var L = new p();
    }

    y || (v = q = x = 0);
    var M,
        T = this;
    w = a.extractPoints(w);
    a = w.shape;
    var O = w.holes;

    if (!Xa.isClockWise(a)) {
      a = a.reverse();
      var Q = 0;

      for (M = O.length; Q < M; Q++) {
        var S = O[Q];
        Xa.isClockWise(S) && (O[Q] = S.reverse());
      }
    }

    var V = Xa.triangulateShape(a, O),
        X = a;
    Q = 0;

    for (M = O.length; Q < M; Q++) {
      S = O[Q], a = a.concat(S);
    }

    var U,
        aa = a.length,
        Y,
        da = V.length;
    w = [];
    var J = 0;
    var W = X.length;
    var R = W - 1;

    for (U = J + 1; J < W; J++, R++, U++) {
      R === W && (R = 0), U === W && (U = 0), w[J] = d(X[J], X[R], X[U]);
    }

    G = [];
    var ea = w.concat();
    Q = 0;

    for (M = O.length; Q < M; Q++) {
      S = O[Q];
      var ca = [];
      J = 0;
      W = S.length;
      R = W - 1;

      for (U = J + 1; J < W; J++, R++, U++) {
        R === W && (R = 0), U === W && (U = 0), ca[J] = d(S[J], S[R], S[U]);
      }

      G.push(ca);
      ea = ea.concat(ca);
    }

    for (R = 0; R < x; R++) {
      W = R / x;
      var fa = q * Math.cos(W * Math.PI / 2);
      U = v * Math.sin(W * Math.PI / 2);
      J = 0;

      for (W = X.length; J < W; J++) {
        var ha = c(X[J], w[J], U);
        f(ha.x, ha.y, -fa);
      }

      Q = 0;

      for (M = O.length; Q < M; Q++) {
        for (S = O[Q], ca = G[Q], J = 0, W = S.length; J < W; J++) {
          ha = c(S[J], ca[J], U), f(ha.x, ha.y, -fa);
        }
      }
    }

    U = v;

    for (J = 0; J < aa; J++) {
      ha = y ? c(a[J], ea[J], U) : a[J], A ? (N.copy(F.normals[0]).multiplyScalar(ha.x), I.copy(F.binormals[0]).multiplyScalar(ha.y), L.copy(H[0]).add(N).add(I), f(L.x, L.y, L.z)) : f(ha.x, ha.y, 0);
    }

    for (W = 1; W <= B; W++) {
      for (J = 0; J < aa; J++) {
        ha = y ? c(a[J], ea[J], U) : a[J], A ? (N.copy(F.normals[W]).multiplyScalar(ha.x), I.copy(F.binormals[W]).multiplyScalar(ha.y), L.copy(H[W]).add(N).add(I), f(L.x, L.y, L.z)) : f(ha.x, ha.y, m / B * W);
      }
    }

    for (R = x - 1; 0 <= R; R--) {
      W = R / x;
      fa = q * Math.cos(W * Math.PI / 2);
      U = v * Math.sin(W * Math.PI / 2);
      J = 0;

      for (W = X.length; J < W; J++) {
        ha = c(X[J], w[J], U), f(ha.x, ha.y, m + fa);
      }

      Q = 0;

      for (M = O.length; Q < M; Q++) {
        for (S = O[Q], ca = G[Q], J = 0, W = S.length; J < W; J++) {
          ha = c(S[J], ca[J], U), A ? f(ha.x, ha.y + H[B - 1].y, H[B - 1].x + fa) : f(ha.x, ha.y, m + fa);
        }
      }
    }

    (function () {
      var a = k.length / 3;

      if (y) {
        var b = 0 * aa;

        for (J = 0; J < da; J++) {
          Y = V[J], g(Y[2] + b, Y[1] + b, Y[0] + b);
        }

        b = aa * (B + 2 * x);

        for (J = 0; J < da; J++) {
          Y = V[J], g(Y[0] + b, Y[1] + b, Y[2] + b);
        }
      } else {
        for (J = 0; J < da; J++) {
          Y = V[J], g(Y[2], Y[1], Y[0]);
        }

        for (J = 0; J < da; J++) {
          Y = V[J], g(Y[0] + aa * B, Y[1] + aa * B, Y[2] + aa * B);
        }
      }

      T.addGroup(a, k.length / 3 - a, 0);
    })();

    (function () {
      var a = k.length / 3,
          b = 0;
      e(X, b);
      b += X.length;
      Q = 0;

      for (M = O.length; Q < M; Q++) {
        S = O[Q], e(S, b), b += S.length;
      }

      T.addGroup(a, k.length / 3 - a, 1);
    })();

    b.arrays || (this.setIndex(n), this.addAttribute("position", new z(k, 3)), this.addAttribute("uv", new z(t, 2)));
  };

  fb.WorldUVGenerator = {
    generateTopUV: function generateTopUV(a, b, c, d, e) {
      a = b[3 * d];
      d = b[3 * d + 1];
      var f = b[3 * e];
      e = b[3 * e + 1];
      return [new C(b[3 * c], b[3 * c + 1]), new C(a, d), new C(f, e)];
    },
    generateSideWallUV: function generateSideWallUV(a, b, c, d, e, f) {
      a = b[3 * c];
      var g = b[3 * c + 1];
      c = b[3 * c + 2];
      var h = b[3 * d],
          l = b[3 * d + 1];
      d = b[3 * d + 2];
      var m = b[3 * e],
          k = b[3 * e + 1];
      e = b[3 * e + 2];
      var n = b[3 * f],
          p = b[3 * f + 1];
      b = b[3 * f + 2];
      return .01 > Math.abs(g - l) ? [new C(a, 1 - c), new C(h, 1 - d), new C(m, 1 - e), new C(n, 1 - b)] : [new C(g, 1 - c), new C(l, 1 - d), new C(k, 1 - e), new C(p, 1 - b)];
    }
  };
  Rc.prototype = (0, _create.default)(N.prototype);
  Rc.prototype.constructor = Rc;
  $b.prototype = (0, _create.default)(Ia.prototype);
  $b.prototype.constructor = $b;
  Sc.prototype = (0, _create.default)(N.prototype);
  Sc.prototype.constructor = Sc;
  ub.prototype = (0, _create.default)(F.prototype);
  ub.prototype.constructor = ub;
  Tc.prototype = (0, _create.default)(N.prototype);
  Tc.prototype.constructor = Tc;
  ac.prototype = (0, _create.default)(F.prototype);
  ac.prototype.constructor = ac;
  Uc.prototype = (0, _create.default)(N.prototype);
  Uc.prototype.constructor = Uc;
  bc.prototype = (0, _create.default)(F.prototype);
  bc.prototype.constructor = bc;
  vb.prototype = (0, _create.default)(N.prototype);
  vb.prototype.constructor = vb;

  vb.prototype.toJSON = function () {
    var a = N.prototype.toJSON.call(this);
    return cf(this.parameters.shapes, a);
  };

  wb.prototype = (0, _create.default)(F.prototype);
  wb.prototype.constructor = wb;

  wb.prototype.toJSON = function () {
    var a = F.prototype.toJSON.call(this);
    return cf(this.parameters.shapes, a);
  };

  cc.prototype = (0, _create.default)(F.prototype);
  cc.prototype.constructor = cc;
  xb.prototype = (0, _create.default)(N.prototype);
  xb.prototype.constructor = xb;
  Ya.prototype = (0, _create.default)(F.prototype);
  Ya.prototype.constructor = Ya;
  Vc.prototype = (0, _create.default)(xb.prototype);
  Vc.prototype.constructor = Vc;
  Wc.prototype = (0, _create.default)(Ya.prototype);
  Wc.prototype.constructor = Wc;
  Xc.prototype = (0, _create.default)(N.prototype);
  Xc.prototype.constructor = Xc;
  dc.prototype = (0, _create.default)(F.prototype);
  dc.prototype.constructor = dc;
  var Ca = (0, _freeze.default)({
    WireframeGeometry: Sb,
    ParametricGeometry: Ec,
    ParametricBufferGeometry: Tb,
    TetrahedronGeometry: Gc,
    TetrahedronBufferGeometry: Ub,
    OctahedronGeometry: Hc,
    OctahedronBufferGeometry: sb,
    IcosahedronGeometry: Ic,
    IcosahedronBufferGeometry: Vb,
    DodecahedronGeometry: Jc,
    DodecahedronBufferGeometry: Wb,
    PolyhedronGeometry: Fc,
    PolyhedronBufferGeometry: pa,
    TubeGeometry: Kc,
    TubeBufferGeometry: Xb,
    TorusKnotGeometry: Lc,
    TorusKnotBufferGeometry: Yb,
    TorusGeometry: Mc,
    TorusBufferGeometry: Zb,
    TextGeometry: Rc,
    TextBufferGeometry: $b,
    SphereGeometry: Sc,
    SphereBufferGeometry: ub,
    RingGeometry: Tc,
    RingBufferGeometry: ac,
    PlaneGeometry: xc,
    PlaneBufferGeometry: pb,
    LatheGeometry: Uc,
    LatheBufferGeometry: bc,
    ShapeGeometry: vb,
    ShapeBufferGeometry: wb,
    ExtrudeGeometry: fb,
    ExtrudeBufferGeometry: Ia,
    EdgesGeometry: cc,
    ConeGeometry: Vc,
    ConeBufferGeometry: Wc,
    CylinderGeometry: xb,
    CylinderBufferGeometry: Ya,
    CircleGeometry: Xc,
    CircleBufferGeometry: dc,
    BoxGeometry: Kb,
    BoxBufferGeometry: mb
  });
  yb.prototype = (0, _create.default)(O.prototype);
  yb.prototype.constructor = yb;
  yb.prototype.isShadowMaterial = !0;

  yb.prototype.copy = function (a) {
    O.prototype.copy.call(this, a);
    this.color.copy(a.color);
    return this;
  };

  ec.prototype = (0, _create.default)(va.prototype);
  ec.prototype.constructor = ec;
  ec.prototype.isRawShaderMaterial = !0;
  Sa.prototype = (0, _create.default)(O.prototype);
  Sa.prototype.constructor = Sa;
  Sa.prototype.isMeshStandardMaterial = !0;

  Sa.prototype.copy = function (a) {
    O.prototype.copy.call(this, a);
    this.defines = {
      STANDARD: ""
    };
    this.color.copy(a.color);
    this.roughness = a.roughness;
    this.metalness = a.metalness;
    this.map = a.map;
    this.lightMap = a.lightMap;
    this.lightMapIntensity = a.lightMapIntensity;
    this.aoMap = a.aoMap;
    this.aoMapIntensity = a.aoMapIntensity;
    this.emissive.copy(a.emissive);
    this.emissiveMap = a.emissiveMap;
    this.emissiveIntensity = a.emissiveIntensity;
    this.bumpMap = a.bumpMap;
    this.bumpScale = a.bumpScale;
    this.normalMap = a.normalMap;
    this.normalScale.copy(a.normalScale);
    this.displacementMap = a.displacementMap;
    this.displacementScale = a.displacementScale;
    this.displacementBias = a.displacementBias;
    this.roughnessMap = a.roughnessMap;
    this.metalnessMap = a.metalnessMap;
    this.alphaMap = a.alphaMap;
    this.envMap = a.envMap;
    this.envMapIntensity = a.envMapIntensity;
    this.refractionRatio = a.refractionRatio;
    this.wireframe = a.wireframe;
    this.wireframeLinewidth = a.wireframeLinewidth;
    this.wireframeLinecap = a.wireframeLinecap;
    this.wireframeLinejoin = a.wireframeLinejoin;
    this.skinning = a.skinning;
    this.morphTargets = a.morphTargets;
    this.morphNormals = a.morphNormals;
    return this;
  };

  zb.prototype = (0, _create.default)(Sa.prototype);
  zb.prototype.constructor = zb;
  zb.prototype.isMeshPhysicalMaterial = !0;

  zb.prototype.copy = function (a) {
    Sa.prototype.copy.call(this, a);
    this.defines = {
      PHYSICAL: ""
    };
    this.reflectivity = a.reflectivity;
    this.clearCoat = a.clearCoat;
    this.clearCoatRoughness = a.clearCoatRoughness;
    return this;
  };

  Ja.prototype = (0, _create.default)(O.prototype);
  Ja.prototype.constructor = Ja;
  Ja.prototype.isMeshPhongMaterial = !0;

  Ja.prototype.copy = function (a) {
    O.prototype.copy.call(this, a);
    this.color.copy(a.color);
    this.specular.copy(a.specular);
    this.shininess = a.shininess;
    this.map = a.map;
    this.lightMap = a.lightMap;
    this.lightMapIntensity = a.lightMapIntensity;
    this.aoMap = a.aoMap;
    this.aoMapIntensity = a.aoMapIntensity;
    this.emissive.copy(a.emissive);
    this.emissiveMap = a.emissiveMap;
    this.emissiveIntensity = a.emissiveIntensity;
    this.bumpMap = a.bumpMap;
    this.bumpScale = a.bumpScale;
    this.normalMap = a.normalMap;
    this.normalScale.copy(a.normalScale);
    this.displacementMap = a.displacementMap;
    this.displacementScale = a.displacementScale;
    this.displacementBias = a.displacementBias;
    this.specularMap = a.specularMap;
    this.alphaMap = a.alphaMap;
    this.envMap = a.envMap;
    this.combine = a.combine;
    this.reflectivity = a.reflectivity;
    this.refractionRatio = a.refractionRatio;
    this.wireframe = a.wireframe;
    this.wireframeLinewidth = a.wireframeLinewidth;
    this.wireframeLinecap = a.wireframeLinecap;
    this.wireframeLinejoin = a.wireframeLinejoin;
    this.skinning = a.skinning;
    this.morphTargets = a.morphTargets;
    this.morphNormals = a.morphNormals;
    return this;
  };

  Ab.prototype = (0, _create.default)(Ja.prototype);
  Ab.prototype.constructor = Ab;
  Ab.prototype.isMeshToonMaterial = !0;

  Ab.prototype.copy = function (a) {
    Ja.prototype.copy.call(this, a);
    this.gradientMap = a.gradientMap;
    return this;
  };

  Bb.prototype = (0, _create.default)(O.prototype);
  Bb.prototype.constructor = Bb;
  Bb.prototype.isMeshNormalMaterial = !0;

  Bb.prototype.copy = function (a) {
    O.prototype.copy.call(this, a);
    this.bumpMap = a.bumpMap;
    this.bumpScale = a.bumpScale;
    this.normalMap = a.normalMap;
    this.normalScale.copy(a.normalScale);
    this.displacementMap = a.displacementMap;
    this.displacementScale = a.displacementScale;
    this.displacementBias = a.displacementBias;
    this.wireframe = a.wireframe;
    this.wireframeLinewidth = a.wireframeLinewidth;
    this.skinning = a.skinning;
    this.morphTargets = a.morphTargets;
    this.morphNormals = a.morphNormals;
    return this;
  };

  Cb.prototype = (0, _create.default)(O.prototype);
  Cb.prototype.constructor = Cb;
  Cb.prototype.isMeshLambertMaterial = !0;

  Cb.prototype.copy = function (a) {
    O.prototype.copy.call(this, a);
    this.color.copy(a.color);
    this.map = a.map;
    this.lightMap = a.lightMap;
    this.lightMapIntensity = a.lightMapIntensity;
    this.aoMap = a.aoMap;
    this.aoMapIntensity = a.aoMapIntensity;
    this.emissive.copy(a.emissive);
    this.emissiveMap = a.emissiveMap;
    this.emissiveIntensity = a.emissiveIntensity;
    this.specularMap = a.specularMap;
    this.alphaMap = a.alphaMap;
    this.envMap = a.envMap;
    this.combine = a.combine;
    this.reflectivity = a.reflectivity;
    this.refractionRatio = a.refractionRatio;
    this.wireframe = a.wireframe;
    this.wireframeLinewidth = a.wireframeLinewidth;
    this.wireframeLinecap = a.wireframeLinecap;
    this.wireframeLinejoin = a.wireframeLinejoin;
    this.skinning = a.skinning;
    this.morphTargets = a.morphTargets;
    this.morphNormals = a.morphNormals;
    return this;
  };

  Db.prototype = (0, _create.default)(U.prototype);
  Db.prototype.constructor = Db;
  Db.prototype.isLineDashedMaterial = !0;

  Db.prototype.copy = function (a) {
    U.prototype.copy.call(this, a);
    this.scale = a.scale;
    this.dashSize = a.dashSize;
    this.gapSize = a.gapSize;
    return this;
  };

  var Mg = (0, _freeze.default)({
    ShadowMaterial: yb,
    SpriteMaterial: eb,
    RawShaderMaterial: ec,
    ShaderMaterial: va,
    PointsMaterial: Ha,
    MeshPhysicalMaterial: zb,
    MeshStandardMaterial: Sa,
    MeshPhongMaterial: Ja,
    MeshToonMaterial: Ab,
    MeshNormalMaterial: Bb,
    MeshLambertMaterial: Cb,
    MeshDepthMaterial: cb,
    MeshDistanceMaterial: db,
    MeshBasicMaterial: za,
    LineDashedMaterial: Db,
    LineBasicMaterial: U,
    Material: O
  }),
      Hb = {
    enabled: !1,
    files: {},
    add: function add(a, b) {
      !1 !== this.enabled && (this.files[a] = b);
    },
    get: function get(a) {
      if (!1 !== this.enabled) return this.files[a];
    },
    remove: function remove(a) {
      delete this.files[a];
    },
    clear: function clear() {
      this.files = {};
    }
  },
      ma = new ae(),
      $a = {};
  (0, _assign.default)(Ka.prototype, {
    load: function load(a, b, c, d) {
      void 0 === a && (a = "");
      void 0 !== this.path && (a = this.path + a);
      a = this.manager.resolveURL(a);
      var e = this,
          f = Hb.get(a);
      if (void 0 !== f) return e.manager.itemStart(a), setTimeout(function () {
        b && b(f);
        e.manager.itemEnd(a);
      }, 0), f;
      if (void 0 !== $a[a]) $a[a].push({
        onLoad: b,
        onProgress: c,
        onError: d
      });else {
        var g = a.match(/^data:(.*?)(;base64)?,(.*)$/);

        if (g) {
          c = g[1];
          var h = !!g[2];
          g = g[3];
          g = window.decodeURIComponent(g);
          h && (g = window.atob(g));

          try {
            var l = (this.responseType || "").toLowerCase();

            switch (l) {
              case "arraybuffer":
              case "blob":
                var m = new Uint8Array(g.length);

                for (h = 0; h < g.length; h++) {
                  m[h] = g.charCodeAt(h);
                }

                var k = "blob" === l ? new Blob([m.buffer], {
                  type: c
                }) : m.buffer;
                break;

              case "document":
                k = new DOMParser().parseFromString(g, c);
                break;

              case "json":
                k = JSON.parse(g);
                break;

              default:
                k = g;
            }

            window.setTimeout(function () {
              b && b(k);
              e.manager.itemEnd(a);
            }, 0);
          } catch (t) {
            window.setTimeout(function () {
              d && d(t);
              e.manager.itemEnd(a);
              e.manager.itemError(a);
            }, 0);
          }
        } else {
          $a[a] = [];
          $a[a].push({
            onLoad: b,
            onProgress: c,
            onError: d
          });
          var n = new XMLHttpRequest();
          n.open("GET", a, !0);
          n.addEventListener("load", function (b) {
            var c = this.response;
            Hb.add(a, c);
            var d = $a[a];
            delete $a[a];

            if (200 === this.status) {
              for (var f = 0, g = d.length; f < g; f++) {
                var h = d[f];
                if (h.onLoad) h.onLoad(c);
              }

              e.manager.itemEnd(a);
            } else if (0 === this.status) {
              console.warn("THREE.FileLoader: HTTP Status 0 received.");
              f = 0;

              for (g = d.length; f < g; f++) {
                if (h = d[f], h.onLoad) h.onLoad(c);
              }

              e.manager.itemEnd(a);
            } else {
              f = 0;

              for (g = d.length; f < g; f++) {
                if (h = d[f], h.onError) h.onError(b);
              }

              e.manager.itemEnd(a);
              e.manager.itemError(a);
            }
          }, !1);
          n.addEventListener("progress", function (b) {
            for (var c = $a[a], d = 0, e = c.length; d < e; d++) {
              var f = c[d];
              if (f.onProgress) f.onProgress(b);
            }
          }, !1);
          n.addEventListener("error", function (b) {
            var c = $a[a];
            delete $a[a];

            for (var d = 0, f = c.length; d < f; d++) {
              var g = c[d];
              if (g.onError) g.onError(b);
            }

            e.manager.itemEnd(a);
            e.manager.itemError(a);
          }, !1);
          void 0 !== this.responseType && (n.responseType = this.responseType);
          void 0 !== this.withCredentials && (n.withCredentials = this.withCredentials);
          n.overrideMimeType && n.overrideMimeType(void 0 !== this.mimeType ? this.mimeType : "text/plain");

          for (h in this.requestHeader) {
            n.setRequestHeader(h, this.requestHeader[h]);
          }

          n.send(null);
        }

        e.manager.itemStart(a);
        return n;
      }
    },
    setPath: function setPath(a) {
      this.path = a;
      return this;
    },
    setResponseType: function setResponseType(a) {
      this.responseType = a;
      return this;
    },
    setWithCredentials: function setWithCredentials(a) {
      this.withCredentials = a;
      return this;
    },
    setMimeType: function setMimeType(a) {
      this.mimeType = a;
      return this;
    },
    setRequestHeader: function setRequestHeader(a) {
      this.requestHeader = a;
      return this;
    }
  });
  (0, _assign.default)(df.prototype, {
    load: function load(a, b, c, d) {
      function e(e) {
        l.load(a[e], function (a) {
          a = f._parser(a, !0);
          g[e] = {
            width: a.width,
            height: a.height,
            format: a.format,
            mipmaps: a.mipmaps
          };
          m += 1;
          6 === m && (1 === a.mipmapCount && (h.minFilter = 1006), h.format = a.format, h.needsUpdate = !0, b && b(h));
        }, c, d);
      }

      var f = this,
          g = [],
          h = new Rb();
      h.image = g;
      var l = new Ka(this.manager);
      l.setPath(this.path);
      l.setResponseType("arraybuffer");
      if ((0, _isArray.default)(a)) for (var m = 0, k = 0, n = a.length; k < n; ++k) {
        e(k);
      } else l.load(a, function (a) {
        a = f._parser(a, !0);
        if (a.isCubemap) for (var c = a.mipmaps.length / a.mipmapCount, d = 0; d < c; d++) {
          g[d] = {
            mipmaps: []
          };

          for (var e = 0; e < a.mipmapCount; e++) {
            g[d].mipmaps.push(a.mipmaps[d * a.mipmapCount + e]), g[d].format = a.format, g[d].width = a.width, g[d].height = a.height;
          }
        } else h.image.width = a.width, h.image.height = a.height, h.mipmaps = a.mipmaps;
        1 === a.mipmapCount && (h.minFilter = 1006);
        h.format = a.format;
        h.needsUpdate = !0;
        b && b(h);
      }, c, d);
      return h;
    },
    setPath: function setPath(a) {
      this.path = a;
      return this;
    }
  });
  (0, _assign.default)(be.prototype, {
    load: function load(a, b, c, d) {
      var e = this,
          f = new ib(),
          g = new Ka(this.manager);
      g.setResponseType("arraybuffer");
      g.load(a, function (a) {
        if (a = e._parser(a)) void 0 !== a.image ? f.image = a.image : void 0 !== a.data && (f.image.width = a.width, f.image.height = a.height, f.image.data = a.data), f.wrapS = void 0 !== a.wrapS ? a.wrapS : 1001, f.wrapT = void 0 !== a.wrapT ? a.wrapT : 1001, f.magFilter = void 0 !== a.magFilter ? a.magFilter : 1006, f.minFilter = void 0 !== a.minFilter ? a.minFilter : 1008, f.anisotropy = void 0 !== a.anisotropy ? a.anisotropy : 1, void 0 !== a.format && (f.format = a.format), void 0 !== a.type && (f.type = a.type), void 0 !== a.mipmaps && (f.mipmaps = a.mipmaps), 1 === a.mipmapCount && (f.minFilter = 1006), f.needsUpdate = !0, b && b(f, a);
      }, c, d);
      return f;
    }
  });
  (0, _assign.default)(Yc.prototype, {
    crossOrigin: "Anonymous",
    load: function load(a, b, c, d) {
      void 0 === a && (a = "");
      void 0 !== this.path && (a = this.path + a);
      a = this.manager.resolveURL(a);
      var e = this,
          f = Hb.get(a);
      if (void 0 !== f) return e.manager.itemStart(a), setTimeout(function () {
        b && b(f);
        e.manager.itemEnd(a);
      }, 0), f;
      c = document.createElementNS("http://www.w3.org/1999/xhtml", "img");
      c.addEventListener("load", function () {
        Hb.add(a, this);
        b && b(this);
        e.manager.itemEnd(a);
      }, !1);
      c.addEventListener("error", function (b) {
        d && d(b);
        e.manager.itemEnd(a);
        e.manager.itemError(a);
      }, !1);
      "data:" !== a.substr(0, 5) && void 0 !== this.crossOrigin && (c.crossOrigin = this.crossOrigin);
      e.manager.itemStart(a);
      c.src = a;
      return c;
    },
    setCrossOrigin: function setCrossOrigin(a) {
      this.crossOrigin = a;
      return this;
    },
    setPath: function setPath(a) {
      this.path = a;
      return this;
    }
  });
  (0, _assign.default)(ce.prototype, {
    crossOrigin: "Anonymous",
    load: function load(a, b, c, d) {
      function e(c) {
        g.load(a[c], function (a) {
          f.images[c] = a;
          h++;
          6 === h && (f.needsUpdate = !0, b && b(f));
        }, void 0, d);
      }

      var f = new ab(),
          g = new Yc(this.manager);
      g.setCrossOrigin(this.crossOrigin);
      g.setPath(this.path);
      var h = 0;

      for (c = 0; c < a.length; ++c) {
        e(c);
      }

      return f;
    },
    setCrossOrigin: function setCrossOrigin(a) {
      this.crossOrigin = a;
      return this;
    },
    setPath: function setPath(a) {
      this.path = a;
      return this;
    }
  });
  (0, _assign.default)(xd.prototype, {
    crossOrigin: "Anonymous",
    load: function load(a, b, c, d) {
      var e = new Y(),
          f = new Yc(this.manager);
      f.setCrossOrigin(this.crossOrigin);
      f.setPath(this.path);
      f.load(a, function (c) {
        e.image = c;
        c = 0 < a.search(/\.(jpg|jpeg)$/) || 0 === a.search(/^data:image\/jpeg/);
        e.format = c ? 1022 : 1023;
        e.needsUpdate = !0;
        void 0 !== b && b(e);
      }, c, d);
      return e;
    },
    setCrossOrigin: function setCrossOrigin(a) {
      this.crossOrigin = a;
      return this;
    },
    setPath: function setPath(a) {
      this.path = a;
      return this;
    }
  });
  (0, _assign.default)(E.prototype, {
    getPoint: function getPoint() {
      console.warn("THREE.Curve: .getPoint() not implemented.");
      return null;
    },
    getPointAt: function getPointAt(a, b) {
      a = this.getUtoTmapping(a);
      return this.getPoint(a, b);
    },
    getPoints: function getPoints(a) {
      void 0 === a && (a = 5);

      for (var b = [], c = 0; c <= a; c++) {
        b.push(this.getPoint(c / a));
      }

      return b;
    },
    getSpacedPoints: function getSpacedPoints(a) {
      void 0 === a && (a = 5);

      for (var b = [], c = 0; c <= a; c++) {
        b.push(this.getPointAt(c / a));
      }

      return b;
    },
    getLength: function getLength() {
      var a = this.getLengths();
      return a[a.length - 1];
    },
    getLengths: function getLengths(a) {
      void 0 === a && (a = this.arcLengthDivisions);
      if (this.cacheArcLengths && this.cacheArcLengths.length === a + 1 && !this.needsUpdate) return this.cacheArcLengths;
      this.needsUpdate = !1;
      var b = [],
          c = this.getPoint(0),
          d,
          e = 0;
      b.push(0);

      for (d = 1; d <= a; d++) {
        var f = this.getPoint(d / a);
        e += f.distanceTo(c);
        b.push(e);
        c = f;
      }

      return this.cacheArcLengths = b;
    },
    updateArcLengths: function updateArcLengths() {
      this.needsUpdate = !0;
      this.getLengths();
    },
    getUtoTmapping: function getUtoTmapping(a, b) {
      var c = this.getLengths(),
          d = c.length;
      b = b ? b : a * c[d - 1];

      for (var e = 0, f = d - 1, g; e <= f;) {
        if (a = Math.floor(e + (f - e) / 2), g = c[a] - b, 0 > g) e = a + 1;else if (0 < g) f = a - 1;else {
          f = a;
          break;
        }
      }

      a = f;
      if (c[a] === b) return a / (d - 1);
      e = c[a];
      return (a + (b - e) / (c[a + 1] - e)) / (d - 1);
    },
    getTangent: function getTangent(a) {
      var b = a - 1E-4;
      a += 1E-4;
      0 > b && (b = 0);
      1 < a && (a = 1);
      b = this.getPoint(b);
      return this.getPoint(a).clone().sub(b).normalize();
    },
    getTangentAt: function getTangentAt(a) {
      a = this.getUtoTmapping(a);
      return this.getTangent(a);
    },
    computeFrenetFrames: function computeFrenetFrames(a, b) {
      var c = new p(),
          d = [],
          e = [],
          f = [],
          g = new p(),
          h = new M(),
          l;

      for (l = 0; l <= a; l++) {
        var m = l / a;
        d[l] = this.getTangentAt(m);
        d[l].normalize();
      }

      e[0] = new p();
      f[0] = new p();
      l = Number.MAX_VALUE;
      m = Math.abs(d[0].x);
      var k = Math.abs(d[0].y),
          n = Math.abs(d[0].z);
      m <= l && (l = m, c.set(1, 0, 0));
      k <= l && (l = k, c.set(0, 1, 0));
      n <= l && c.set(0, 0, 1);
      g.crossVectors(d[0], c).normalize();
      e[0].crossVectors(d[0], g);
      f[0].crossVectors(d[0], e[0]);

      for (l = 1; l <= a; l++) {
        e[l] = e[l - 1].clone(), f[l] = f[l - 1].clone(), g.crossVectors(d[l - 1], d[l]), g.length() > _epsilon.default && (g.normalize(), c = Math.acos(S.clamp(d[l - 1].dot(d[l]), -1, 1)), e[l].applyMatrix4(h.makeRotationAxis(g, c))), f[l].crossVectors(d[l], e[l]);
      }

      if (!0 === b) for (c = Math.acos(S.clamp(e[0].dot(e[a]), -1, 1)), c /= a, 0 < d[0].dot(g.crossVectors(e[0], e[a])) && (c = -c), l = 1; l <= a; l++) {
        e[l].applyMatrix4(h.makeRotationAxis(d[l], c * l)), f[l].crossVectors(d[l], e[l]);
      }
      return {
        tangents: d,
        normals: e,
        binormals: f
      };
    },
    clone: function clone() {
      return new this.constructor().copy(this);
    },
    copy: function copy(a) {
      this.arcLengthDivisions = a.arcLengthDivisions;
      return this;
    },
    toJSON: function toJSON() {
      var a = {
        metadata: {
          version: 4.5,
          type: "Curve",
          generator: "Curve.toJSON"
        }
      };
      a.arcLengthDivisions = this.arcLengthDivisions;
      a.type = this.type;
      return a;
    },
    fromJSON: function fromJSON(a) {
      this.arcLengthDivisions = a.arcLengthDivisions;
      return this;
    }
  });
  ia.prototype = (0, _create.default)(E.prototype);
  ia.prototype.constructor = ia;
  ia.prototype.isEllipseCurve = !0;

  ia.prototype.getPoint = function (a, b) {
    b = b || new C();

    for (var c = 2 * Math.PI, d = this.aEndAngle - this.aStartAngle, e = Math.abs(d) < _epsilon.default; 0 > d;) {
      d += c;
    }

    for (; d > c;) {
      d -= c;
    }

    d < _epsilon.default && (d = e ? 0 : c);
    !0 !== this.aClockwise || e || (d = d === c ? -c : d - c);
    c = this.aStartAngle + a * d;
    a = this.aX + this.xRadius * Math.cos(c);
    var f = this.aY + this.yRadius * Math.sin(c);
    0 !== this.aRotation && (c = Math.cos(this.aRotation), d = Math.sin(this.aRotation), e = a - this.aX, f -= this.aY, a = e * c - f * d + this.aX, f = e * d + f * c + this.aY);
    return b.set(a, f);
  };

  ia.prototype.copy = function (a) {
    E.prototype.copy.call(this, a);
    this.aX = a.aX;
    this.aY = a.aY;
    this.xRadius = a.xRadius;
    this.yRadius = a.yRadius;
    this.aStartAngle = a.aStartAngle;
    this.aEndAngle = a.aEndAngle;
    this.aClockwise = a.aClockwise;
    this.aRotation = a.aRotation;
    return this;
  };

  ia.prototype.toJSON = function () {
    var a = E.prototype.toJSON.call(this);
    a.aX = this.aX;
    a.aY = this.aY;
    a.xRadius = this.xRadius;
    a.yRadius = this.yRadius;
    a.aStartAngle = this.aStartAngle;
    a.aEndAngle = this.aEndAngle;
    a.aClockwise = this.aClockwise;
    a.aRotation = this.aRotation;
    return a;
  };

  ia.prototype.fromJSON = function (a) {
    E.prototype.fromJSON.call(this, a);
    this.aX = a.aX;
    this.aY = a.aY;
    this.xRadius = a.xRadius;
    this.yRadius = a.yRadius;
    this.aStartAngle = a.aStartAngle;
    this.aEndAngle = a.aEndAngle;
    this.aClockwise = a.aClockwise;
    this.aRotation = a.aRotation;
    return this;
  };

  fc.prototype = (0, _create.default)(ia.prototype);
  fc.prototype.constructor = fc;
  fc.prototype.isArcCurve = !0;
  var Qd = new p(),
      ye = new de(),
      ze = new de(),
      Ae = new de();
  X.prototype = (0, _create.default)(E.prototype);
  X.prototype.constructor = X;
  X.prototype.isCatmullRomCurve3 = !0;

  X.prototype.getPoint = function (a, b) {
    b = b || new p();
    var c = this.points,
        d = c.length;
    a *= d - (this.closed ? 0 : 1);
    var e = Math.floor(a);
    a -= e;
    this.closed ? e += 0 < e ? 0 : (Math.floor(Math.abs(e) / c.length) + 1) * c.length : 0 === a && e === d - 1 && (e = d - 2, a = 1);
    if (this.closed || 0 < e) var f = c[(e - 1) % d];else Qd.subVectors(c[0], c[1]).add(c[0]), f = Qd;
    var g = c[e % d];
    var h = c[(e + 1) % d];
    this.closed || e + 2 < d ? c = c[(e + 2) % d] : (Qd.subVectors(c[d - 1], c[d - 2]).add(c[d - 1]), c = Qd);

    if ("centripetal" === this.curveType || "chordal" === this.curveType) {
      var l = "chordal" === this.curveType ? .5 : .25;
      d = Math.pow(f.distanceToSquared(g), l);
      e = Math.pow(g.distanceToSquared(h), l);
      l = Math.pow(h.distanceToSquared(c), l);
      1E-4 > e && (e = 1);
      1E-4 > d && (d = e);
      1E-4 > l && (l = e);
      ye.initNonuniformCatmullRom(f.x, g.x, h.x, c.x, d, e, l);
      ze.initNonuniformCatmullRom(f.y, g.y, h.y, c.y, d, e, l);
      Ae.initNonuniformCatmullRom(f.z, g.z, h.z, c.z, d, e, l);
    } else "catmullrom" === this.curveType && (ye.initCatmullRom(f.x, g.x, h.x, c.x, this.tension), ze.initCatmullRom(f.y, g.y, h.y, c.y, this.tension), Ae.initCatmullRom(f.z, g.z, h.z, c.z, this.tension));

    b.set(ye.calc(a), ze.calc(a), Ae.calc(a));
    return b;
  };

  X.prototype.copy = function (a) {
    E.prototype.copy.call(this, a);
    this.points = [];

    for (var b = 0, c = a.points.length; b < c; b++) {
      this.points.push(a.points[b].clone());
    }

    this.closed = a.closed;
    this.curveType = a.curveType;
    this.tension = a.tension;
    return this;
  };

  X.prototype.toJSON = function () {
    var a = E.prototype.toJSON.call(this);
    a.points = [];

    for (var b = 0, c = this.points.length; b < c; b++) {
      a.points.push(this.points[b].toArray());
    }

    a.closed = this.closed;
    a.curveType = this.curveType;
    a.tension = this.tension;
    return a;
  };

  X.prototype.fromJSON = function (a) {
    E.prototype.fromJSON.call(this, a);
    this.points = [];

    for (var b = 0, c = a.points.length; b < c; b++) {
      var d = a.points[b];
      this.points.push(new p().fromArray(d));
    }

    this.closed = a.closed;
    this.curveType = a.curveType;
    this.tension = a.tension;
    return this;
  };

  La.prototype = (0, _create.default)(E.prototype);
  La.prototype.constructor = La;
  La.prototype.isCubicBezierCurve = !0;

  La.prototype.getPoint = function (a, b) {
    b = b || new C();
    var c = this.v0,
        d = this.v1,
        e = this.v2,
        f = this.v3;
    b.set($c(a, c.x, d.x, e.x, f.x), $c(a, c.y, d.y, e.y, f.y));
    return b;
  };

  La.prototype.copy = function (a) {
    E.prototype.copy.call(this, a);
    this.v0.copy(a.v0);
    this.v1.copy(a.v1);
    this.v2.copy(a.v2);
    this.v3.copy(a.v3);
    return this;
  };

  La.prototype.toJSON = function () {
    var a = E.prototype.toJSON.call(this);
    a.v0 = this.v0.toArray();
    a.v1 = this.v1.toArray();
    a.v2 = this.v2.toArray();
    a.v3 = this.v3.toArray();
    return a;
  };

  La.prototype.fromJSON = function (a) {
    E.prototype.fromJSON.call(this, a);
    this.v0.fromArray(a.v0);
    this.v1.fromArray(a.v1);
    this.v2.fromArray(a.v2);
    this.v3.fromArray(a.v3);
    return this;
  };

  Ta.prototype = (0, _create.default)(E.prototype);
  Ta.prototype.constructor = Ta;
  Ta.prototype.isCubicBezierCurve3 = !0;

  Ta.prototype.getPoint = function (a, b) {
    b = b || new p();
    var c = this.v0,
        d = this.v1,
        e = this.v2,
        f = this.v3;
    b.set($c(a, c.x, d.x, e.x, f.x), $c(a, c.y, d.y, e.y, f.y), $c(a, c.z, d.z, e.z, f.z));
    return b;
  };

  Ta.prototype.copy = function (a) {
    E.prototype.copy.call(this, a);
    this.v0.copy(a.v0);
    this.v1.copy(a.v1);
    this.v2.copy(a.v2);
    this.v3.copy(a.v3);
    return this;
  };

  Ta.prototype.toJSON = function () {
    var a = E.prototype.toJSON.call(this);
    a.v0 = this.v0.toArray();
    a.v1 = this.v1.toArray();
    a.v2 = this.v2.toArray();
    a.v3 = this.v3.toArray();
    return a;
  };

  Ta.prototype.fromJSON = function (a) {
    E.prototype.fromJSON.call(this, a);
    this.v0.fromArray(a.v0);
    this.v1.fromArray(a.v1);
    this.v2.fromArray(a.v2);
    this.v3.fromArray(a.v3);
    return this;
  };

  wa.prototype = (0, _create.default)(E.prototype);
  wa.prototype.constructor = wa;
  wa.prototype.isLineCurve = !0;

  wa.prototype.getPoint = function (a, b) {
    b = b || new C();
    1 === a ? b.copy(this.v2) : (b.copy(this.v2).sub(this.v1), b.multiplyScalar(a).add(this.v1));
    return b;
  };

  wa.prototype.getPointAt = function (a, b) {
    return this.getPoint(a, b);
  };

  wa.prototype.getTangent = function () {
    return this.v2.clone().sub(this.v1).normalize();
  };

  wa.prototype.copy = function (a) {
    E.prototype.copy.call(this, a);
    this.v1.copy(a.v1);
    this.v2.copy(a.v2);
    return this;
  };

  wa.prototype.toJSON = function () {
    var a = E.prototype.toJSON.call(this);
    a.v1 = this.v1.toArray();
    a.v2 = this.v2.toArray();
    return a;
  };

  wa.prototype.fromJSON = function (a) {
    E.prototype.fromJSON.call(this, a);
    this.v1.fromArray(a.v1);
    this.v2.fromArray(a.v2);
    return this;
  };

  Ma.prototype = (0, _create.default)(E.prototype);
  Ma.prototype.constructor = Ma;
  Ma.prototype.isLineCurve3 = !0;

  Ma.prototype.getPoint = function (a, b) {
    b = b || new p();
    1 === a ? b.copy(this.v2) : (b.copy(this.v2).sub(this.v1), b.multiplyScalar(a).add(this.v1));
    return b;
  };

  Ma.prototype.getPointAt = function (a, b) {
    return this.getPoint(a, b);
  };

  Ma.prototype.copy = function (a) {
    E.prototype.copy.call(this, a);
    this.v1.copy(a.v1);
    this.v2.copy(a.v2);
    return this;
  };

  Ma.prototype.toJSON = function () {
    var a = E.prototype.toJSON.call(this);
    a.v1 = this.v1.toArray();
    a.v2 = this.v2.toArray();
    return a;
  };

  Ma.prototype.fromJSON = function (a) {
    E.prototype.fromJSON.call(this, a);
    this.v1.fromArray(a.v1);
    this.v2.fromArray(a.v2);
    return this;
  };

  Na.prototype = (0, _create.default)(E.prototype);
  Na.prototype.constructor = Na;
  Na.prototype.isQuadraticBezierCurve = !0;

  Na.prototype.getPoint = function (a, b) {
    b = b || new C();
    var c = this.v0,
        d = this.v1,
        e = this.v2;
    b.set(Zc(a, c.x, d.x, e.x), Zc(a, c.y, d.y, e.y));
    return b;
  };

  Na.prototype.copy = function (a) {
    E.prototype.copy.call(this, a);
    this.v0.copy(a.v0);
    this.v1.copy(a.v1);
    this.v2.copy(a.v2);
    return this;
  };

  Na.prototype.toJSON = function () {
    var a = E.prototype.toJSON.call(this);
    a.v0 = this.v0.toArray();
    a.v1 = this.v1.toArray();
    a.v2 = this.v2.toArray();
    return a;
  };

  Na.prototype.fromJSON = function (a) {
    E.prototype.fromJSON.call(this, a);
    this.v0.fromArray(a.v0);
    this.v1.fromArray(a.v1);
    this.v2.fromArray(a.v2);
    return this;
  };

  Ua.prototype = (0, _create.default)(E.prototype);
  Ua.prototype.constructor = Ua;
  Ua.prototype.isQuadraticBezierCurve3 = !0;

  Ua.prototype.getPoint = function (a, b) {
    b = b || new p();
    var c = this.v0,
        d = this.v1,
        e = this.v2;
    b.set(Zc(a, c.x, d.x, e.x), Zc(a, c.y, d.y, e.y), Zc(a, c.z, d.z, e.z));
    return b;
  };

  Ua.prototype.copy = function (a) {
    E.prototype.copy.call(this, a);
    this.v0.copy(a.v0);
    this.v1.copy(a.v1);
    this.v2.copy(a.v2);
    return this;
  };

  Ua.prototype.toJSON = function () {
    var a = E.prototype.toJSON.call(this);
    a.v0 = this.v0.toArray();
    a.v1 = this.v1.toArray();
    a.v2 = this.v2.toArray();
    return a;
  };

  Ua.prototype.fromJSON = function (a) {
    E.prototype.fromJSON.call(this, a);
    this.v0.fromArray(a.v0);
    this.v1.fromArray(a.v1);
    this.v2.fromArray(a.v2);
    return this;
  };

  Oa.prototype = (0, _create.default)(E.prototype);
  Oa.prototype.constructor = Oa;
  Oa.prototype.isSplineCurve = !0;

  Oa.prototype.getPoint = function (a, b) {
    b = b || new C();
    var c = this.points,
        d = (c.length - 1) * a;
    a = Math.floor(d);
    d -= a;
    var e = c[0 === a ? a : a - 1],
        f = c[a],
        g = c[a > c.length - 2 ? c.length - 1 : a + 1];
    c = c[a > c.length - 3 ? c.length - 1 : a + 2];
    b.set(ef(d, e.x, f.x, g.x, c.x), ef(d, e.y, f.y, g.y, c.y));
    return b;
  };

  Oa.prototype.copy = function (a) {
    E.prototype.copy.call(this, a);
    this.points = [];

    for (var b = 0, c = a.points.length; b < c; b++) {
      this.points.push(a.points[b].clone());
    }

    return this;
  };

  Oa.prototype.toJSON = function () {
    var a = E.prototype.toJSON.call(this);
    a.points = [];

    for (var b = 0, c = this.points.length; b < c; b++) {
      a.points.push(this.points[b].toArray());
    }

    return a;
  };

  Oa.prototype.fromJSON = function (a) {
    E.prototype.fromJSON.call(this, a);
    this.points = [];

    for (var b = 0, c = a.points.length; b < c; b++) {
      var d = a.points[b];
      this.points.push(new C().fromArray(d));
    }

    return this;
  };

  var Ng = (0, _freeze.default)({
    ArcCurve: fc,
    CatmullRomCurve3: X,
    CubicBezierCurve: La,
    CubicBezierCurve3: Ta,
    EllipseCurve: ia,
    LineCurve: wa,
    LineCurve3: Ma,
    QuadraticBezierCurve: Na,
    QuadraticBezierCurve3: Ua,
    SplineCurve: Oa
  });
  Za.prototype = (0, _assign.default)((0, _create.default)(E.prototype), {
    constructor: Za,
    add: function add(a) {
      this.curves.push(a);
    },
    closePath: function closePath() {
      var a = this.curves[0].getPoint(0),
          b = this.curves[this.curves.length - 1].getPoint(1);
      a.equals(b) || this.curves.push(new wa(b, a));
    },
    getPoint: function getPoint(a) {
      var b = a * this.getLength(),
          c = this.getCurveLengths();

      for (a = 0; a < c.length;) {
        if (c[a] >= b) return b = c[a] - b, a = this.curves[a], c = a.getLength(), a.getPointAt(0 === c ? 0 : 1 - b / c);
        a++;
      }

      return null;
    },
    getLength: function getLength() {
      var a = this.getCurveLengths();
      return a[a.length - 1];
    },
    updateArcLengths: function updateArcLengths() {
      this.needsUpdate = !0;
      this.cacheLengths = null;
      this.getCurveLengths();
    },
    getCurveLengths: function getCurveLengths() {
      if (this.cacheLengths && this.cacheLengths.length === this.curves.length) return this.cacheLengths;

      for (var a = [], b = 0, c = 0, d = this.curves.length; c < d; c++) {
        b += this.curves[c].getLength(), a.push(b);
      }

      return this.cacheLengths = a;
    },
    getSpacedPoints: function getSpacedPoints(a) {
      void 0 === a && (a = 40);

      for (var b = [], c = 0; c <= a; c++) {
        b.push(this.getPoint(c / a));
      }

      this.autoClose && b.push(b[0]);
      return b;
    },
    getPoints: function getPoints(a) {
      a = a || 12;

      for (var b = [], c, d = 0, e = this.curves; d < e.length; d++) {
        var f = e[d];
        f = f.getPoints(f && f.isEllipseCurve ? 2 * a : f && f.isLineCurve ? 1 : f && f.isSplineCurve ? a * f.points.length : a);

        for (var g = 0; g < f.length; g++) {
          var h = f[g];
          c && c.equals(h) || (b.push(h), c = h);
        }
      }

      this.autoClose && 1 < b.length && !b[b.length - 1].equals(b[0]) && b.push(b[0]);
      return b;
    },
    copy: function copy(a) {
      E.prototype.copy.call(this, a);
      this.curves = [];

      for (var b = 0, c = a.curves.length; b < c; b++) {
        this.curves.push(a.curves[b].clone());
      }

      this.autoClose = a.autoClose;
      return this;
    },
    toJSON: function toJSON() {
      var a = E.prototype.toJSON.call(this);
      a.autoClose = this.autoClose;
      a.curves = [];

      for (var b = 0, c = this.curves.length; b < c; b++) {
        a.curves.push(this.curves[b].toJSON());
      }

      return a;
    },
    fromJSON: function fromJSON(a) {
      E.prototype.fromJSON.call(this, a);
      this.autoClose = a.autoClose;
      this.curves = [];

      for (var b = 0, c = a.curves.length; b < c; b++) {
        var d = a.curves[b];
        this.curves.push(new Ng[d.type]().fromJSON(d));
      }

      return this;
    }
  });
  Pa.prototype = (0, _assign.default)((0, _create.default)(Za.prototype), {
    constructor: Pa,
    setFromPoints: function setFromPoints(a) {
      this.moveTo(a[0].x, a[0].y);

      for (var b = 1, c = a.length; b < c; b++) {
        this.lineTo(a[b].x, a[b].y);
      }
    },
    moveTo: function moveTo(a, b) {
      this.currentPoint.set(a, b);
    },
    lineTo: function lineTo(a, b) {
      var c = new wa(this.currentPoint.clone(), new C(a, b));
      this.curves.push(c);
      this.currentPoint.set(a, b);
    },
    quadraticCurveTo: function quadraticCurveTo(a, b, c, d) {
      a = new Na(this.currentPoint.clone(), new C(a, b), new C(c, d));
      this.curves.push(a);
      this.currentPoint.set(c, d);
    },
    bezierCurveTo: function bezierCurveTo(a, b, c, d, e, f) {
      a = new La(this.currentPoint.clone(), new C(a, b), new C(c, d), new C(e, f));
      this.curves.push(a);
      this.currentPoint.set(e, f);
    },
    splineThru: function splineThru(a) {
      var b = [this.currentPoint.clone()].concat(a);
      b = new Oa(b);
      this.curves.push(b);
      this.currentPoint.copy(a[a.length - 1]);
    },
    arc: function arc(a, b, c, d, e, f) {
      this.absarc(a + this.currentPoint.x, b + this.currentPoint.y, c, d, e, f);
    },
    absarc: function absarc(a, b, c, d, e, f) {
      this.absellipse(a, b, c, c, d, e, f);
    },
    ellipse: function ellipse(a, b, c, d, e, f, g, h) {
      this.absellipse(a + this.currentPoint.x, b + this.currentPoint.y, c, d, e, f, g, h);
    },
    absellipse: function absellipse(a, b, c, d, e, f, g, h) {
      a = new ia(a, b, c, d, e, f, g, h);
      0 < this.curves.length && (b = a.getPoint(0), b.equals(this.currentPoint) || this.lineTo(b.x, b.y));
      this.curves.push(a);
      a = a.getPoint(1);
      this.currentPoint.copy(a);
    },
    copy: function copy(a) {
      Za.prototype.copy.call(this, a);
      this.currentPoint.copy(a.currentPoint);
      return this;
    },
    toJSON: function toJSON() {
      var a = Za.prototype.toJSON.call(this);
      a.currentPoint = this.currentPoint.toArray();
      return a;
    },
    fromJSON: function fromJSON(a) {
      Za.prototype.fromJSON.call(this, a);
      this.currentPoint.fromArray(a.currentPoint);
      return this;
    }
  });
  gb.prototype = (0, _assign.default)((0, _create.default)(Pa.prototype), {
    constructor: gb,
    getPointsHoles: function getPointsHoles(a) {
      for (var b = [], c = 0, d = this.holes.length; c < d; c++) {
        b[c] = this.holes[c].getPoints(a);
      }

      return b;
    },
    extractPoints: function extractPoints(a) {
      return {
        shape: this.getPoints(a),
        holes: this.getPointsHoles(a)
      };
    },
    copy: function copy(a) {
      Pa.prototype.copy.call(this, a);
      this.holes = [];

      for (var b = 0, c = a.holes.length; b < c; b++) {
        this.holes.push(a.holes[b].clone());
      }

      return this;
    },
    toJSON: function toJSON() {
      var a = Pa.prototype.toJSON.call(this);
      a.uuid = this.uuid;
      a.holes = [];

      for (var b = 0, c = this.holes.length; b < c; b++) {
        a.holes.push(this.holes[b].toJSON());
      }

      return a;
    },
    fromJSON: function fromJSON(a) {
      Pa.prototype.fromJSON.call(this, a);
      this.uuid = a.uuid;
      this.holes = [];

      for (var b = 0, c = a.holes.length; b < c; b++) {
        var d = a.holes[b];
        this.holes.push(new Pa().fromJSON(d));
      }

      return this;
    }
  });
  ca.prototype = (0, _assign.default)((0, _create.default)(A.prototype), {
    constructor: ca,
    isLight: !0,
    copy: function copy(a) {
      A.prototype.copy.call(this, a);
      this.color.copy(a.color);
      this.intensity = a.intensity;
      return this;
    },
    toJSON: function toJSON(a) {
      a = A.prototype.toJSON.call(this, a);
      a.object.color = this.color.getHex();
      a.object.intensity = this.intensity;
      void 0 !== this.groundColor && (a.object.groundColor = this.groundColor.getHex());
      void 0 !== this.distance && (a.object.distance = this.distance);
      void 0 !== this.angle && (a.object.angle = this.angle);
      void 0 !== this.decay && (a.object.decay = this.decay);
      void 0 !== this.penumbra && (a.object.penumbra = this.penumbra);
      void 0 !== this.shadow && (a.object.shadow = this.shadow.toJSON());
      return a;
    }
  });
  yd.prototype = (0, _assign.default)((0, _create.default)(ca.prototype), {
    constructor: yd,
    isHemisphereLight: !0,
    copy: function copy(a) {
      ca.prototype.copy.call(this, a);
      this.groundColor.copy(a.groundColor);
      return this;
    }
  });
  (0, _assign.default)(Eb.prototype, {
    copy: function copy(a) {
      this.camera = a.camera.clone();
      this.bias = a.bias;
      this.radius = a.radius;
      this.mapSize.copy(a.mapSize);
      return this;
    },
    clone: function clone() {
      return new this.constructor().copy(this);
    },
    toJSON: function toJSON() {
      var a = {};
      0 !== this.bias && (a.bias = this.bias);
      1 !== this.radius && (a.radius = this.radius);
      if (512 !== this.mapSize.x || 512 !== this.mapSize.y) a.mapSize = this.mapSize.toArray();
      a.camera = this.camera.toJSON(!1).object;
      delete a.camera.matrix;
      return a;
    }
  });
  zd.prototype = (0, _assign.default)((0, _create.default)(Eb.prototype), {
    constructor: zd,
    isSpotLightShadow: !0,
    update: function update(a) {
      var b = this.camera,
          c = 2 * S.RAD2DEG * a.angle,
          d = this.mapSize.width / this.mapSize.height;
      a = a.distance || b.far;
      if (c !== b.fov || d !== b.aspect || a !== b.far) b.fov = c, b.aspect = d, b.far = a, b.updateProjectionMatrix();
    }
  });
  Ad.prototype = (0, _assign.default)((0, _create.default)(ca.prototype), {
    constructor: Ad,
    isSpotLight: !0,
    copy: function copy(a) {
      ca.prototype.copy.call(this, a);
      this.distance = a.distance;
      this.angle = a.angle;
      this.penumbra = a.penumbra;
      this.decay = a.decay;
      this.target = a.target.clone();
      this.shadow = a.shadow.clone();
      return this;
    }
  });
  Bd.prototype = (0, _assign.default)((0, _create.default)(ca.prototype), {
    constructor: Bd,
    isPointLight: !0,
    copy: function copy(a) {
      ca.prototype.copy.call(this, a);
      this.distance = a.distance;
      this.decay = a.decay;
      this.shadow = a.shadow.clone();
      return this;
    }
  });
  Cd.prototype = (0, _assign.default)((0, _create.default)(Eb.prototype), {
    constructor: Cd
  });
  Dd.prototype = (0, _assign.default)((0, _create.default)(ca.prototype), {
    constructor: Dd,
    isDirectionalLight: !0,
    copy: function copy(a) {
      ca.prototype.copy.call(this, a);
      this.target = a.target.clone();
      this.shadow = a.shadow.clone();
      return this;
    }
  });
  Ed.prototype = (0, _assign.default)((0, _create.default)(ca.prototype), {
    constructor: Ed,
    isAmbientLight: !0
  });
  Fd.prototype = (0, _assign.default)((0, _create.default)(ca.prototype), {
    constructor: Fd,
    isRectAreaLight: !0,
    copy: function copy(a) {
      ca.prototype.copy.call(this, a);
      this.width = a.width;
      this.height = a.height;
      return this;
    },
    toJSON: function toJSON(a) {
      a = ca.prototype.toJSON.call(this, a);
      a.object.width = this.width;
      a.object.height = this.height;
      return a;
    }
  });
  Gd.prototype = (0, _assign.default)((0, _create.default)(da.prototype), {
    constructor: Gd,
    ValueTypeName: "string",
    ValueBufferType: Array,
    DefaultInterpolation: 2300,
    InterpolantFactoryMethodLinear: void 0,
    InterpolantFactoryMethodSmooth: void 0
  });
  Hd.prototype = (0, _assign.default)((0, _create.default)(da.prototype), {
    constructor: Hd,
    ValueTypeName: "bool",
    ValueBufferType: Array,
    DefaultInterpolation: 2300,
    InterpolantFactoryMethodLinear: void 0,
    InterpolantFactoryMethodSmooth: void 0
  });
  (0, _assign.default)(na.prototype, {
    evaluate: function evaluate(a) {
      var b = this.parameterPositions,
          c = this._cachedIndex,
          d = b[c],
          e = b[c - 1];

      a: {
        b: {
          c: {
            d: if (!(a < d)) {
              for (var f = c + 2;;) {
                if (void 0 === d) {
                  if (a < e) break d;
                  this._cachedIndex = c = b.length;
                  return this.afterEnd_(c - 1, a, e);
                }

                if (c === f) break;
                e = d;
                d = b[++c];
                if (a < d) break b;
              }

              d = b.length;
              break c;
            }

            if (a >= e) break a;else {
              f = b[1];
              a < f && (c = 2, e = f);

              for (f = c - 2;;) {
                if (void 0 === e) return this._cachedIndex = 0, this.beforeStart_(0, a, d);
                if (c === f) break;
                d = e;
                e = b[--c - 1];
                if (a >= e) break b;
              }

              d = c;
              c = 0;
            }
          }

          for (; c < d;) {
            e = c + d >>> 1, a < b[e] ? d = e : c = e + 1;
          }

          d = b[c];
          e = b[c - 1];
          if (void 0 === e) return this._cachedIndex = 0, this.beforeStart_(0, a, d);
          if (void 0 === d) return this._cachedIndex = c = b.length, this.afterEnd_(c - 1, e, a);
        }

        this._cachedIndex = c;
        this.intervalChanged_(c, e, d);
      }

      return this.interpolate_(c, e, a, d);
    },
    settings: null,
    DefaultSettings_: {},
    getSettings_: function getSettings_() {
      return this.settings || this.DefaultSettings_;
    },
    copySampleValue_: function copySampleValue_(a) {
      var b = this.resultBuffer,
          c = this.sampleValues,
          d = this.valueSize;
      a *= d;

      for (var e = 0; e !== d; ++e) {
        b[e] = c[a + e];
      }

      return b;
    },
    interpolate_: function interpolate_() {
      throw Error("call to abstract method");
    },
    intervalChanged_: function intervalChanged_() {}
  });
  (0, _assign.default)(na.prototype, {
    beforeStart_: na.prototype.copySampleValue_,
    afterEnd_: na.prototype.copySampleValue_
  });
  Id.prototype = (0, _assign.default)((0, _create.default)(na.prototype), {
    constructor: Id,
    interpolate_: function interpolate_(a, b, c, d) {
      var e = this.resultBuffer,
          f = this.sampleValues,
          g = this.valueSize;
      a *= g;
      b = (c - b) / (d - b);

      for (c = a + g; a !== c; a += 4) {
        ja.slerpFlat(e, 0, f, a - g, f, a, b);
      }

      return e;
    }
  });
  ad.prototype = (0, _assign.default)((0, _create.default)(da.prototype), {
    constructor: ad,
    ValueTypeName: "quaternion",
    DefaultInterpolation: 2301,
    InterpolantFactoryMethodLinear: function InterpolantFactoryMethodLinear(a) {
      return new Id(this.times, this.values, this.getValueSize(), a);
    },
    InterpolantFactoryMethodSmooth: void 0
  });
  Jd.prototype = (0, _assign.default)((0, _create.default)(da.prototype), {
    constructor: Jd,
    ValueTypeName: "color"
  });
  gc.prototype = (0, _assign.default)((0, _create.default)(da.prototype), {
    constructor: gc,
    ValueTypeName: "number"
  });
  Kd.prototype = (0, _assign.default)((0, _create.default)(na.prototype), {
    constructor: Kd,
    DefaultSettings_: {
      endingStart: 2400,
      endingEnd: 2400
    },
    intervalChanged_: function intervalChanged_(a, b, c) {
      var d = this.parameterPositions,
          e = a - 2,
          f = a + 1,
          g = d[e],
          h = d[f];
      if (void 0 === g) switch (this.getSettings_().endingStart) {
        case 2401:
          e = a;
          g = 2 * b - c;
          break;

        case 2402:
          e = d.length - 2;
          g = b + d[e] - d[e + 1];
          break;

        default:
          e = a, g = c;
      }
      if (void 0 === h) switch (this.getSettings_().endingEnd) {
        case 2401:
          f = a;
          h = 2 * c - b;
          break;

        case 2402:
          f = 1;
          h = c + d[1] - d[0];
          break;

        default:
          f = a - 1, h = b;
      }
      a = .5 * (c - b);
      d = this.valueSize;
      this._weightPrev = a / (b - g);
      this._weightNext = a / (h - c);
      this._offsetPrev = e * d;
      this._offsetNext = f * d;
    },
    interpolate_: function interpolate_(a, b, c, d) {
      var e = this.resultBuffer,
          f = this.sampleValues,
          g = this.valueSize;
      a *= g;
      var h = a - g,
          l = this._offsetPrev,
          m = this._offsetNext,
          k = this._weightPrev,
          n = this._weightNext,
          p = (c - b) / (d - b);
      c = p * p;
      d = c * p;
      b = -k * d + 2 * k * c - k * p;
      k = (1 + k) * d + (-1.5 - 2 * k) * c + (-.5 + k) * p + 1;
      p = (-1 - n) * d + (1.5 + n) * c + .5 * p;
      n = n * d - n * c;

      for (c = 0; c !== g; ++c) {
        e[c] = b * f[l + c] + k * f[h + c] + p * f[a + c] + n * f[m + c];
      }

      return e;
    }
  });
  bd.prototype = (0, _assign.default)((0, _create.default)(na.prototype), {
    constructor: bd,
    interpolate_: function interpolate_(a, b, c, d) {
      var e = this.resultBuffer,
          f = this.sampleValues,
          g = this.valueSize;
      a *= g;
      var h = a - g;
      b = (c - b) / (d - b);
      c = 1 - b;

      for (d = 0; d !== g; ++d) {
        e[d] = f[h + d] * c + f[a + d] * b;
      }

      return e;
    }
  });
  Ld.prototype = (0, _assign.default)((0, _create.default)(na.prototype), {
    constructor: Ld,
    interpolate_: function interpolate_(a) {
      return this.copySampleValue_(a - 1);
    }
  });
  var fa = {
    arraySlice: function arraySlice(a, b, c) {
      return fa.isTypedArray(a) ? new a.constructor(a.subarray(b, void 0 !== c ? c : a.length)) : a.slice(b, c);
    },
    convertArray: function convertArray(a, b, c) {
      return !a || !c && a.constructor === b ? a : "number" === typeof b.BYTES_PER_ELEMENT ? new b(a) : Array.prototype.slice.call(a);
    },
    isTypedArray: function isTypedArray(a) {
      return ArrayBuffer.isView(a) && !(a instanceof DataView);
    },
    getKeyframeOrder: function getKeyframeOrder(a) {
      for (var b = a.length, c = Array(b), d = 0; d !== b; ++d) {
        c[d] = d;
      }

      c.sort(function (b, c) {
        return a[b] - a[c];
      });
      return c;
    },
    sortedArray: function sortedArray(a, b, c) {
      for (var d = a.length, e = new a.constructor(d), f = 0, g = 0; g !== d; ++f) {
        for (var h = c[f] * b, l = 0; l !== b; ++l) {
          e[g++] = a[h + l];
        }
      }

      return e;
    },
    flattenJSON: function flattenJSON(a, b, c, d) {
      for (var e = 1, f = a[0]; void 0 !== f && void 0 === f[d];) {
        f = a[e++];
      }

      if (void 0 !== f) {
        var g = f[d];
        if (void 0 !== g) if ((0, _isArray.default)(g)) {
          do {
            g = f[d], void 0 !== g && (b.push(f.time), c.push.apply(c, g)), f = a[e++];
          } while (void 0 !== f);
        } else if (void 0 !== g.toArray) {
          do {
            g = f[d], void 0 !== g && (b.push(f.time), g.toArray(c, c.length)), f = a[e++];
          } while (void 0 !== f);
        } else {
          do {
            g = f[d], void 0 !== g && (b.push(f.time), c.push(g)), f = a[e++];
          } while (void 0 !== f);
        }
      }
    }
  };
  (0, _assign.default)(da, {
    parse: function parse(a) {
      if (void 0 === a.type) throw Error("THREE.KeyframeTrack: track type undefined, can not parse");

      var b = da._getTrackTypeForValueTypeName(a.type);

      if (void 0 === a.times) {
        var c = [],
            d = [];
        fa.flattenJSON(a.keys, c, d, "value");
        a.times = c;
        a.values = d;
      }

      return void 0 !== b.parse ? b.parse(a) : new b(a.name, a.times, a.values, a.interpolation);
    },
    toJSON: function toJSON(a) {
      var b = a.constructor;
      if (void 0 !== b.toJSON) b = b.toJSON(a);else {
        b = {
          name: a.name,
          times: fa.convertArray(a.times, Array),
          values: fa.convertArray(a.values, Array)
        };
        var c = a.getInterpolation();
        c !== a.DefaultInterpolation && (b.interpolation = c);
      }
      b.type = a.ValueTypeName;
      return b;
    },
    _getTrackTypeForValueTypeName: function _getTrackTypeForValueTypeName(a) {
      switch (a.toLowerCase()) {
        case "scalar":
        case "double":
        case "float":
        case "number":
        case "integer":
          return gc;

        case "vector":
        case "vector2":
        case "vector3":
        case "vector4":
          return hc;

        case "color":
          return Jd;

        case "quaternion":
          return ad;

        case "bool":
        case "boolean":
          return Hd;

        case "string":
          return Gd;
      }

      throw Error("THREE.KeyframeTrack: Unsupported typeName: " + a);
    }
  });
  (0, _assign.default)(da.prototype, {
    constructor: da,
    TimeBufferType: Float32Array,
    ValueBufferType: Float32Array,
    DefaultInterpolation: 2301,
    InterpolantFactoryMethodDiscrete: function InterpolantFactoryMethodDiscrete(a) {
      return new Ld(this.times, this.values, this.getValueSize(), a);
    },
    InterpolantFactoryMethodLinear: function InterpolantFactoryMethodLinear(a) {
      return new bd(this.times, this.values, this.getValueSize(), a);
    },
    InterpolantFactoryMethodSmooth: function InterpolantFactoryMethodSmooth(a) {
      return new Kd(this.times, this.values, this.getValueSize(), a);
    },
    setInterpolation: function setInterpolation(a) {
      switch (a) {
        case 2300:
          var b = this.InterpolantFactoryMethodDiscrete;
          break;

        case 2301:
          b = this.InterpolantFactoryMethodLinear;
          break;

        case 2302:
          b = this.InterpolantFactoryMethodSmooth;
      }

      if (void 0 === b) {
        b = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
        if (void 0 === this.createInterpolant) if (a !== this.DefaultInterpolation) this.setInterpolation(this.DefaultInterpolation);else throw Error(b);
        console.warn("THREE.KeyframeTrack:", b);
      } else this.createInterpolant = b;
    },
    getInterpolation: function getInterpolation() {
      switch (this.createInterpolant) {
        case this.InterpolantFactoryMethodDiscrete:
          return 2300;

        case this.InterpolantFactoryMethodLinear:
          return 2301;

        case this.InterpolantFactoryMethodSmooth:
          return 2302;
      }
    },
    getValueSize: function getValueSize() {
      return this.values.length / this.times.length;
    },
    shift: function shift(a) {
      if (0 !== a) for (var b = this.times, c = 0, d = b.length; c !== d; ++c) {
        b[c] += a;
      }
      return this;
    },
    scale: function scale(a) {
      if (1 !== a) for (var b = this.times, c = 0, d = b.length; c !== d; ++c) {
        b[c] *= a;
      }
      return this;
    },
    trim: function trim(a, b) {
      for (var c = this.times, d = c.length, e = 0, f = d - 1; e !== d && c[e] < a;) {
        ++e;
      }

      for (; -1 !== f && c[f] > b;) {
        --f;
      }

      ++f;
      if (0 !== e || f !== d) e >= f && (f = Math.max(f, 1), e = f - 1), a = this.getValueSize(), this.times = fa.arraySlice(c, e, f), this.values = fa.arraySlice(this.values, e * a, f * a);
      return this;
    },
    validate: function validate() {
      var a = !0,
          b = this.getValueSize();
      0 !== b - Math.floor(b) && (console.error("THREE.KeyframeTrack: Invalid value size in track.", this), a = !1);
      var c = this.times;
      b = this.values;
      var d = c.length;
      0 === d && (console.error("THREE.KeyframeTrack: Track is empty.", this), a = !1);

      for (var e = null, f = 0; f !== d; f++) {
        var g = c[f];

        if ("number" === typeof g && isNaN(g)) {
          console.error("THREE.KeyframeTrack: Time is not a valid number.", this, f, g);
          a = !1;
          break;
        }

        if (null !== e && e > g) {
          console.error("THREE.KeyframeTrack: Out of order keys.", this, f, g, e);
          a = !1;
          break;
        }

        e = g;
      }

      if (void 0 !== b && fa.isTypedArray(b)) for (f = 0, c = b.length; f !== c; ++f) {
        if (d = b[f], isNaN(d)) {
          console.error("THREE.KeyframeTrack: Value is not a valid number.", this, f, d);
          a = !1;
          break;
        }
      }
      return a;
    },
    optimize: function optimize() {
      for (var a = this.times, b = this.values, c = this.getValueSize(), d = 2302 === this.getInterpolation(), e = 1, f = a.length - 1, g = 1; g < f; ++g) {
        var h = !1,
            l = a[g];
        if (l !== a[g + 1] && (1 !== g || l !== l[0])) if (d) h = !0;else {
          var k = g * c,
              p = k - c,
              n = k + c;

          for (l = 0; l !== c; ++l) {
            var t = b[k + l];

            if (t !== b[p + l] || t !== b[n + l]) {
              h = !0;
              break;
            }
          }
        }

        if (h) {
          if (g !== e) for (a[e] = a[g], h = g * c, k = e * c, l = 0; l !== c; ++l) {
            b[k + l] = b[h + l];
          }
          ++e;
        }
      }

      if (0 < f) {
        a[e] = a[f];
        h = f * c;
        k = e * c;

        for (l = 0; l !== c; ++l) {
          b[k + l] = b[h + l];
        }

        ++e;
      }

      e !== a.length && (this.times = fa.arraySlice(a, 0, e), this.values = fa.arraySlice(b, 0, e * c));
      return this;
    }
  });
  hc.prototype = (0, _assign.default)((0, _create.default)(da.prototype), {
    constructor: hc,
    ValueTypeName: "vector"
  });
  (0, _assign.default)(Ba, {
    parse: function parse(a) {
      for (var b = [], c = a.tracks, d = 1 / (a.fps || 1), e = 0, f = c.length; e !== f; ++e) {
        b.push(da.parse(c[e]).scale(d));
      }

      return new Ba(a.name, a.duration, b);
    },
    toJSON: function toJSON(a) {
      var b = [],
          c = a.tracks;
      a = {
        name: a.name,
        duration: a.duration,
        tracks: b
      };

      for (var d = 0, e = c.length; d !== e; ++d) {
        b.push(da.toJSON(c[d]));
      }

      return a;
    },
    CreateFromMorphTargetSequence: function CreateFromMorphTargetSequence(a, b, c, d) {
      for (var e = b.length, f = [], g = 0; g < e; g++) {
        var h = [],
            l = [];
        h.push((g + e - 1) % e, g, (g + 1) % e);
        l.push(0, 1, 0);
        var k = fa.getKeyframeOrder(h);
        h = fa.sortedArray(h, 1, k);
        l = fa.sortedArray(l, 1, k);
        d || 0 !== h[0] || (h.push(e), l.push(l[0]));
        f.push(new gc(".morphTargetInfluences[" + b[g].name + "]", h, l).scale(1 / c));
      }

      return new Ba(a, -1, f);
    },
    findByName: function findByName(a, b) {
      var c = a;
      (0, _isArray.default)(a) || (c = a.geometry && a.geometry.animations || a.animations);

      for (a = 0; a < c.length; a++) {
        if (c[a].name === b) return c[a];
      }

      return null;
    },
    CreateClipsFromMorphTargetSequences: function CreateClipsFromMorphTargetSequences(a, b, c) {
      for (var d = {}, e = /^([\w-]*?)([\d]+)$/, f = 0, g = a.length; f < g; f++) {
        var h = a[f],
            l = h.name.match(e);

        if (l && 1 < l.length) {
          var k = l[1];
          (l = d[k]) || (d[k] = l = []);
          l.push(h);
        }
      }

      a = [];

      for (k in d) {
        a.push(Ba.CreateFromMorphTargetSequence(k, d[k], b, c));
      }

      return a;
    },
    parseAnimation: function parseAnimation(a, b) {
      if (!a) return console.error("THREE.AnimationClip: No animation in JSONLoader data."), null;

      var c = function c(a, b, _c, d, e) {
        if (0 !== _c.length) {
          var f = [],
              g = [];
          fa.flattenJSON(_c, f, g, d);
          0 !== f.length && e.push(new a(b, f, g));
        }
      },
          d = [],
          e = a.name || "default",
          f = a.length || -1,
          g = a.fps || 30;

      a = a.hierarchy || [];

      for (var h = 0; h < a.length; h++) {
        var l = a[h].keys;
        if (l && 0 !== l.length) if (l[0].morphTargets) {
          f = {};

          for (var k = 0; k < l.length; k++) {
            if (l[k].morphTargets) for (var p = 0; p < l[k].morphTargets.length; p++) {
              f[l[k].morphTargets[p]] = -1;
            }
          }

          for (var n in f) {
            var t = [],
                r = [];

            for (p = 0; p !== l[k].morphTargets.length; ++p) {
              var q = l[k];
              t.push(q.time);
              r.push(q.morphTarget === n ? 1 : 0);
            }

            d.push(new gc(".morphTargetInfluence[" + n + "]", t, r));
          }

          f = f.length * (g || 1);
        } else k = ".bones[" + b[h].name + "]", c(hc, k + ".position", l, "pos", d), c(ad, k + ".quaternion", l, "rot", d), c(hc, k + ".scale", l, "scl", d);
      }

      return 0 === d.length ? null : new Ba(e, f, d);
    }
  });
  (0, _assign.default)(Ba.prototype, {
    resetDuration: function resetDuration() {
      for (var a = 0, b = 0, c = this.tracks.length; b !== c; ++b) {
        var d = this.tracks[b];
        a = Math.max(a, d.times[d.times.length - 1]);
      }

      this.duration = a;
    },
    trim: function trim() {
      for (var a = 0; a < this.tracks.length; a++) {
        this.tracks[a].trim(0, this.duration);
      }

      return this;
    },
    optimize: function optimize() {
      for (var a = 0; a < this.tracks.length; a++) {
        this.tracks[a].optimize();
      }

      return this;
    }
  });
  (0, _assign.default)(Md.prototype, {
    load: function load(a, b, c, d) {
      var e = this;
      new Ka(e.manager).load(a, function (a) {
        b(e.parse(JSON.parse(a)));
      }, c, d);
    },
    setTextures: function setTextures(a) {
      this.textures = a;
    },
    parse: function parse(a) {
      function b(a) {
        void 0 === c[a] && console.warn("THREE.MaterialLoader: Undefined texture", a);
        return c[a];
      }

      var c = this.textures,
          d = new Mg[a.type]();
      void 0 !== a.uuid && (d.uuid = a.uuid);
      void 0 !== a.name && (d.name = a.name);
      void 0 !== a.color && d.color.setHex(a.color);
      void 0 !== a.roughness && (d.roughness = a.roughness);
      void 0 !== a.metalness && (d.metalness = a.metalness);
      void 0 !== a.emissive && d.emissive.setHex(a.emissive);
      void 0 !== a.specular && d.specular.setHex(a.specular);
      void 0 !== a.shininess && (d.shininess = a.shininess);
      void 0 !== a.clearCoat && (d.clearCoat = a.clearCoat);
      void 0 !== a.clearCoatRoughness && (d.clearCoatRoughness = a.clearCoatRoughness);
      void 0 !== a.uniforms && (d.uniforms = a.uniforms);
      void 0 !== a.vertexShader && (d.vertexShader = a.vertexShader);
      void 0 !== a.fragmentShader && (d.fragmentShader = a.fragmentShader);
      void 0 !== a.vertexColors && (d.vertexColors = a.vertexColors);
      void 0 !== a.fog && (d.fog = a.fog);
      void 0 !== a.flatShading && (d.flatShading = a.flatShading);
      void 0 !== a.blending && (d.blending = a.blending);
      void 0 !== a.side && (d.side = a.side);
      void 0 !== a.opacity && (d.opacity = a.opacity);
      void 0 !== a.transparent && (d.transparent = a.transparent);
      void 0 !== a.alphaTest && (d.alphaTest = a.alphaTest);
      void 0 !== a.depthTest && (d.depthTest = a.depthTest);
      void 0 !== a.depthWrite && (d.depthWrite = a.depthWrite);
      void 0 !== a.colorWrite && (d.colorWrite = a.colorWrite);
      void 0 !== a.wireframe && (d.wireframe = a.wireframe);
      void 0 !== a.wireframeLinewidth && (d.wireframeLinewidth = a.wireframeLinewidth);
      void 0 !== a.wireframeLinecap && (d.wireframeLinecap = a.wireframeLinecap);
      void 0 !== a.wireframeLinejoin && (d.wireframeLinejoin = a.wireframeLinejoin);
      void 0 !== a.rotation && (d.rotation = a.rotation);
      1 !== a.linewidth && (d.linewidth = a.linewidth);
      void 0 !== a.dashSize && (d.dashSize = a.dashSize);
      void 0 !== a.gapSize && (d.gapSize = a.gapSize);
      void 0 !== a.scale && (d.scale = a.scale);
      void 0 !== a.polygonOffset && (d.polygonOffset = a.polygonOffset);
      void 0 !== a.polygonOffsetFactor && (d.polygonOffsetFactor = a.polygonOffsetFactor);
      void 0 !== a.polygonOffsetUnits && (d.polygonOffsetUnits = a.polygonOffsetUnits);
      void 0 !== a.skinning && (d.skinning = a.skinning);
      void 0 !== a.morphTargets && (d.morphTargets = a.morphTargets);
      void 0 !== a.dithering && (d.dithering = a.dithering);
      void 0 !== a.visible && (d.visible = a.visible);
      void 0 !== a.userData && (d.userData = a.userData);
      void 0 !== a.shading && (d.flatShading = 1 === a.shading);
      void 0 !== a.size && (d.size = a.size);
      void 0 !== a.sizeAttenuation && (d.sizeAttenuation = a.sizeAttenuation);
      void 0 !== a.map && (d.map = b(a.map));
      void 0 !== a.alphaMap && (d.alphaMap = b(a.alphaMap), d.transparent = !0);
      void 0 !== a.bumpMap && (d.bumpMap = b(a.bumpMap));
      void 0 !== a.bumpScale && (d.bumpScale = a.bumpScale);
      void 0 !== a.normalMap && (d.normalMap = b(a.normalMap));

      if (void 0 !== a.normalScale) {
        var e = a.normalScale;
        !1 === (0, _isArray.default)(e) && (e = [e, e]);
        d.normalScale = new C().fromArray(e);
      }

      void 0 !== a.displacementMap && (d.displacementMap = b(a.displacementMap));
      void 0 !== a.displacementScale && (d.displacementScale = a.displacementScale);
      void 0 !== a.displacementBias && (d.displacementBias = a.displacementBias);
      void 0 !== a.roughnessMap && (d.roughnessMap = b(a.roughnessMap));
      void 0 !== a.metalnessMap && (d.metalnessMap = b(a.metalnessMap));
      void 0 !== a.emissiveMap && (d.emissiveMap = b(a.emissiveMap));
      void 0 !== a.emissiveIntensity && (d.emissiveIntensity = a.emissiveIntensity);
      void 0 !== a.specularMap && (d.specularMap = b(a.specularMap));
      void 0 !== a.envMap && (d.envMap = b(a.envMap));
      void 0 !== a.reflectivity && (d.reflectivity = a.reflectivity);
      void 0 !== a.lightMap && (d.lightMap = b(a.lightMap));
      void 0 !== a.lightMapIntensity && (d.lightMapIntensity = a.lightMapIntensity);
      void 0 !== a.aoMap && (d.aoMap = b(a.aoMap));
      void 0 !== a.aoMapIntensity && (d.aoMapIntensity = a.aoMapIntensity);
      void 0 !== a.gradientMap && (d.gradientMap = b(a.gradientMap));
      return d;
    }
  });
  (0, _assign.default)(ee.prototype, {
    load: function load(a, b, c, d) {
      var e = this;
      new Ka(e.manager).load(a, function (a) {
        b(e.parse(JSON.parse(a)));
      }, c, d);
    },
    parse: function parse(a) {
      var b = new F(),
          c = a.data.index;
      void 0 !== c && (c = new uf[c.type](c.array), b.setIndex(new T(c, 1)));
      var d = a.data.attributes;

      for (f in d) {
        var e = d[f];
        c = new uf[e.type](e.array);
        b.addAttribute(f, new T(c, e.itemSize, e.normalized));
      }

      var f = a.data.groups || a.data.drawcalls || a.data.offsets;
      if (void 0 !== f) for (c = 0, d = f.length; c !== d; ++c) {
        e = f[c], b.addGroup(e.start, e.count, e.materialIndex);
      }
      a = a.data.boundingSphere;
      void 0 !== a && (f = new p(), void 0 !== a.center && f.fromArray(a.center), b.boundingSphere = new Ea(f, a.radius));
      return b;
    }
  });
  var uf = {
    Int8Array: Int8Array,
    Uint8Array: Uint8Array,
    Uint8ClampedArray: "undefined" !== typeof Uint8ClampedArray ? Uint8ClampedArray : Uint8Array,
    Int16Array: Int16Array,
    Uint16Array: Uint16Array,
    Int32Array: Int32Array,
    Uint32Array: Uint32Array,
    Float32Array: Float32Array,
    Float64Array: Float64Array
  };
  ic.Handlers = {
    handlers: [],
    add: function add(a, b) {
      this.handlers.push(a, b);
    },
    get: function get(a) {
      for (var b = this.handlers, c = 0, d = b.length; c < d; c += 2) {
        var e = b[c + 1];
        if (b[c].test(a)) return e;
      }

      return null;
    }
  };
  (0, _assign.default)(ic.prototype, {
    crossOrigin: void 0,
    onLoadStart: function onLoadStart() {},
    onLoadProgress: function onLoadProgress() {},
    onLoadComplete: function onLoadComplete() {},
    initMaterials: function initMaterials(a, b, c) {
      for (var d = [], e = 0; e < a.length; ++e) {
        d[e] = this.createMaterial(a[e], b, c);
      }

      return d;
    },
    createMaterial: function () {
      var a = {
        NoBlending: 0,
        NormalBlending: 1,
        AdditiveBlending: 2,
        SubtractiveBlending: 3,
        MultiplyBlending: 4,
        CustomBlending: 5
      },
          b = new I(),
          c = new xd(),
          d = new Md();
      return function (e, f, g) {
        function h(a, b, d, e, h) {
          a = f + a;
          var k = ic.Handlers.get(a);
          null !== k ? a = k.load(a) : (c.setCrossOrigin(g), a = c.load(a));
          void 0 !== b && (a.repeat.fromArray(b), 1 !== b[0] && (a.wrapS = 1E3), 1 !== b[1] && (a.wrapT = 1E3));
          void 0 !== d && a.offset.fromArray(d);
          void 0 !== e && ("repeat" === e[0] && (a.wrapS = 1E3), "mirror" === e[0] && (a.wrapS = 1002), "repeat" === e[1] && (a.wrapT = 1E3), "mirror" === e[1] && (a.wrapT = 1002));
          void 0 !== h && (a.anisotropy = h);
          b = S.generateUUID();
          l[b] = a;
          return b;
        }

        var l = {},
            k = {
          uuid: S.generateUUID(),
          type: "MeshLambertMaterial"
        },
            p;

        for (p in e) {
          var n = e[p];

          switch (p) {
            case "DbgColor":
            case "DbgIndex":
            case "opticalDensity":
            case "illumination":
              break;

            case "DbgName":
              k.name = n;
              break;

            case "blending":
              k.blending = a[n];
              break;

            case "colorAmbient":
            case "mapAmbient":
              console.warn("THREE.Loader.createMaterial:", p, "is no longer supported.");
              break;

            case "colorDiffuse":
              k.color = b.fromArray(n).getHex();
              break;

            case "colorSpecular":
              k.specular = b.fromArray(n).getHex();
              break;

            case "colorEmissive":
              k.emissive = b.fromArray(n).getHex();
              break;

            case "specularCoef":
              k.shininess = n;
              break;

            case "shading":
              "basic" === n.toLowerCase() && (k.type = "MeshBasicMaterial");
              "phong" === n.toLowerCase() && (k.type = "MeshPhongMaterial");
              "standard" === n.toLowerCase() && (k.type = "MeshStandardMaterial");
              break;

            case "mapDiffuse":
              k.map = h(n, e.mapDiffuseRepeat, e.mapDiffuseOffset, e.mapDiffuseWrap, e.mapDiffuseAnisotropy);
              break;

            case "mapDiffuseRepeat":
            case "mapDiffuseOffset":
            case "mapDiffuseWrap":
            case "mapDiffuseAnisotropy":
              break;

            case "mapEmissive":
              k.emissiveMap = h(n, e.mapEmissiveRepeat, e.mapEmissiveOffset, e.mapEmissiveWrap, e.mapEmissiveAnisotropy);
              break;

            case "mapEmissiveRepeat":
            case "mapEmissiveOffset":
            case "mapEmissiveWrap":
            case "mapEmissiveAnisotropy":
              break;

            case "mapLight":
              k.lightMap = h(n, e.mapLightRepeat, e.mapLightOffset, e.mapLightWrap, e.mapLightAnisotropy);
              break;

            case "mapLightRepeat":
            case "mapLightOffset":
            case "mapLightWrap":
            case "mapLightAnisotropy":
              break;

            case "mapAO":
              k.aoMap = h(n, e.mapAORepeat, e.mapAOOffset, e.mapAOWrap, e.mapAOAnisotropy);
              break;

            case "mapAORepeat":
            case "mapAOOffset":
            case "mapAOWrap":
            case "mapAOAnisotropy":
              break;

            case "mapBump":
              k.bumpMap = h(n, e.mapBumpRepeat, e.mapBumpOffset, e.mapBumpWrap, e.mapBumpAnisotropy);
              break;

            case "mapBumpScale":
              k.bumpScale = n;
              break;

            case "mapBumpRepeat":
            case "mapBumpOffset":
            case "mapBumpWrap":
            case "mapBumpAnisotropy":
              break;

            case "mapNormal":
              k.normalMap = h(n, e.mapNormalRepeat, e.mapNormalOffset, e.mapNormalWrap, e.mapNormalAnisotropy);
              break;

            case "mapNormalFactor":
              k.normalScale = n;
              break;

            case "mapNormalRepeat":
            case "mapNormalOffset":
            case "mapNormalWrap":
            case "mapNormalAnisotropy":
              break;

            case "mapSpecular":
              k.specularMap = h(n, e.mapSpecularRepeat, e.mapSpecularOffset, e.mapSpecularWrap, e.mapSpecularAnisotropy);
              break;

            case "mapSpecularRepeat":
            case "mapSpecularOffset":
            case "mapSpecularWrap":
            case "mapSpecularAnisotropy":
              break;

            case "mapMetalness":
              k.metalnessMap = h(n, e.mapMetalnessRepeat, e.mapMetalnessOffset, e.mapMetalnessWrap, e.mapMetalnessAnisotropy);
              break;

            case "mapMetalnessRepeat":
            case "mapMetalnessOffset":
            case "mapMetalnessWrap":
            case "mapMetalnessAnisotropy":
              break;

            case "mapRoughness":
              k.roughnessMap = h(n, e.mapRoughnessRepeat, e.mapRoughnessOffset, e.mapRoughnessWrap, e.mapRoughnessAnisotropy);
              break;

            case "mapRoughnessRepeat":
            case "mapRoughnessOffset":
            case "mapRoughnessWrap":
            case "mapRoughnessAnisotropy":
              break;

            case "mapAlpha":
              k.alphaMap = h(n, e.mapAlphaRepeat, e.mapAlphaOffset, e.mapAlphaWrap, e.mapAlphaAnisotropy);
              break;

            case "mapAlphaRepeat":
            case "mapAlphaOffset":
            case "mapAlphaWrap":
            case "mapAlphaAnisotropy":
              break;

            case "flipSided":
              k.side = 1;
              break;

            case "doubleSided":
              k.side = 2;
              break;

            case "transparency":
              console.warn("THREE.Loader.createMaterial: transparency has been renamed to opacity");
              k.opacity = n;
              break;

            case "depthTest":
            case "depthWrite":
            case "colorWrite":
            case "opacity":
            case "reflectivity":
            case "transparent":
            case "visible":
            case "wireframe":
              k[p] = n;
              break;

            case "vertexColors":
              !0 === n && (k.vertexColors = 2);
              "face" === n && (k.vertexColors = 1);
              break;

            default:
              console.error("THREE.Loader.createMaterial: Unsupported", p, n);
          }
        }

        "MeshBasicMaterial" === k.type && delete k.emissive;
        "MeshPhongMaterial" !== k.type && delete k.specular;
        1 > k.opacity && (k.transparent = !0);
        d.setTextures(l);
        return d.parse(k);
      };
    }()
  });
  var Be = {
    decodeText: function decodeText(a) {
      if ("undefined" !== typeof TextDecoder) return new TextDecoder().decode(a);

      for (var b = "", c = 0, d = a.length; c < d; c++) {
        b += String.fromCharCode(a[c]);
      }

      return decodeURIComponent(escape(b));
    },
    extractUrlBase: function extractUrlBase(a) {
      a = a.split("/");
      if (1 === a.length) return "./";
      a.pop();
      return a.join("/") + "/";
    }
  };
  (0, _assign.default)(fe.prototype, {
    load: function load(a, b, c, d) {
      var e = this,
          f = this.texturePath && "string" === typeof this.texturePath ? this.texturePath : Be.extractUrlBase(a),
          g = new Ka(this.manager);
      g.setWithCredentials(this.withCredentials);
      g.load(a, function (c) {
        c = JSON.parse(c);
        var d = c.metadata;

        if (void 0 !== d && (d = d.type, void 0 !== d && "object" === d.toLowerCase())) {
          console.error("THREE.JSONLoader: " + a + " should be loaded with THREE.ObjectLoader instead.");
          return;
        }

        c = e.parse(c, f);
        b(c.geometry, c.materials);
      }, c, d);
    },
    setTexturePath: function setTexturePath(a) {
      this.texturePath = a;
    },
    parse: function () {
      return function (a, b) {
        void 0 !== a.data && (a = a.data);
        a.scale = void 0 !== a.scale ? 1 / a.scale : 1;
        var c = new N(),
            d = a,
            e,
            f,
            g,
            h = d.faces;
        var l = d.vertices;
        var k = d.normals,
            u = d.colors;
        var n = d.scale;
        var t = 0;

        if (void 0 !== d.uvs) {
          for (e = 0; e < d.uvs.length; e++) {
            d.uvs[e].length && t++;
          }

          for (e = 0; e < t; e++) {
            c.faceVertexUvs[e] = [];
          }
        }

        var r = 0;

        for (g = l.length; r < g;) {
          e = new p(), e.x = l[r++] * n, e.y = l[r++] * n, e.z = l[r++] * n, c.vertices.push(e);
        }

        r = 0;

        for (g = h.length; r < g;) {
          l = h[r++];
          var q = l & 1;
          var v = l & 2;
          e = l & 8;
          var x = l & 16;
          var y = l & 32;
          n = l & 64;
          l &= 128;

          if (q) {
            q = new Wa();
            q.a = h[r];
            q.b = h[r + 1];
            q.c = h[r + 3];
            var w = new Wa();
            w.a = h[r + 1];
            w.b = h[r + 2];
            w.c = h[r + 3];
            r += 4;
            v && (v = h[r++], q.materialIndex = v, w.materialIndex = v);
            v = c.faces.length;
            if (e) for (e = 0; e < t; e++) {
              var B = d.uvs[e];
              c.faceVertexUvs[e][v] = [];
              c.faceVertexUvs[e][v + 1] = [];

              for (f = 0; 4 > f; f++) {
                var z = h[r++];
                var A = B[2 * z];
                z = B[2 * z + 1];
                A = new C(A, z);
                2 !== f && c.faceVertexUvs[e][v].push(A);
                0 !== f && c.faceVertexUvs[e][v + 1].push(A);
              }
            }
            x && (x = 3 * h[r++], q.normal.set(k[x++], k[x++], k[x]), w.normal.copy(q.normal));
            if (y) for (e = 0; 4 > e; e++) {
              x = 3 * h[r++], y = new p(k[x++], k[x++], k[x]), 2 !== e && q.vertexNormals.push(y), 0 !== e && w.vertexNormals.push(y);
            }
            n && (n = h[r++], n = u[n], q.color.setHex(n), w.color.setHex(n));
            if (l) for (e = 0; 4 > e; e++) {
              n = h[r++], n = u[n], 2 !== e && q.vertexColors.push(new I(n)), 0 !== e && w.vertexColors.push(new I(n));
            }
            c.faces.push(q);
            c.faces.push(w);
          } else {
            q = new Wa();
            q.a = h[r++];
            q.b = h[r++];
            q.c = h[r++];
            v && (v = h[r++], q.materialIndex = v);
            v = c.faces.length;
            if (e) for (e = 0; e < t; e++) {
              for (B = d.uvs[e], c.faceVertexUvs[e][v] = [], f = 0; 3 > f; f++) {
                z = h[r++], A = B[2 * z], z = B[2 * z + 1], A = new C(A, z), c.faceVertexUvs[e][v].push(A);
              }
            }
            x && (x = 3 * h[r++], q.normal.set(k[x++], k[x++], k[x]));
            if (y) for (e = 0; 3 > e; e++) {
              x = 3 * h[r++], y = new p(k[x++], k[x++], k[x]), q.vertexNormals.push(y);
            }
            n && (n = h[r++], q.color.setHex(u[n]));
            if (l) for (e = 0; 3 > e; e++) {
              n = h[r++], q.vertexColors.push(new I(u[n]));
            }
            c.faces.push(q);
          }
        }

        d = a;
        r = void 0 !== d.influencesPerVertex ? d.influencesPerVertex : 2;
        if (d.skinWeights) for (g = 0, h = d.skinWeights.length; g < h; g += r) {
          c.skinWeights.push(new ea(d.skinWeights[g], 1 < r ? d.skinWeights[g + 1] : 0, 2 < r ? d.skinWeights[g + 2] : 0, 3 < r ? d.skinWeights[g + 3] : 0));
        }
        if (d.skinIndices) for (g = 0, h = d.skinIndices.length; g < h; g += r) {
          c.skinIndices.push(new ea(d.skinIndices[g], 1 < r ? d.skinIndices[g + 1] : 0, 2 < r ? d.skinIndices[g + 2] : 0, 3 < r ? d.skinIndices[g + 3] : 0));
        }
        c.bones = d.bones;
        c.bones && 0 < c.bones.length && (c.skinWeights.length !== c.skinIndices.length || c.skinIndices.length !== c.vertices.length) && console.warn("When skinning, number of vertices (" + c.vertices.length + "), skinIndices (" + c.skinIndices.length + "), and skinWeights (" + c.skinWeights.length + ") should match.");
        g = a;
        h = g.scale;
        if (void 0 !== g.morphTargets) for (d = 0, r = g.morphTargets.length; d < r; d++) {
          for (c.morphTargets[d] = {}, c.morphTargets[d].name = g.morphTargets[d].name, c.morphTargets[d].vertices = [], k = c.morphTargets[d].vertices, u = g.morphTargets[d].vertices, t = 0, l = u.length; t < l; t += 3) {
            n = new p(), n.x = u[t] * h, n.y = u[t + 1] * h, n.z = u[t + 2] * h, k.push(n);
          }
        }
        if (void 0 !== g.morphColors && 0 < g.morphColors.length) for (console.warn('THREE.JSONLoader: "morphColors" no longer supported. Using them as face colors.'), h = c.faces, g = g.morphColors[0].colors, d = 0, r = h.length; d < r; d++) {
          h[d].color.fromArray(g, 3 * d);
        }
        g = a;
        d = [];
        r = [];
        void 0 !== g.animation && r.push(g.animation);
        void 0 !== g.animations && (g.animations.length ? r = r.concat(g.animations) : r.push(g.animations));

        for (g = 0; g < r.length; g++) {
          (h = Ba.parseAnimation(r[g], c.bones)) && d.push(h);
        }

        c.morphTargets && (r = Ba.CreateClipsFromMorphTargetSequences(c.morphTargets, 10), d = d.concat(r));
        0 < d.length && (c.animations = d);
        c.computeFaceNormals();
        c.computeBoundingSphere();
        if (void 0 === a.materials || 0 === a.materials.length) return {
          geometry: c
        };
        a = ic.prototype.initMaterials(a.materials, b, this.crossOrigin);
        return {
          geometry: c,
          materials: a
        };
      };
    }()
  });
  (0, _assign.default)(ff.prototype, {
    load: function load(a, b, c, d) {
      "" === this.texturePath && (this.texturePath = a.substring(0, a.lastIndexOf("/") + 1));
      var e = this;
      new Ka(e.manager).load(a, function (c) {
        var f = null;

        try {
          f = JSON.parse(c);
        } catch (h) {
          void 0 !== d && d(h);
          console.error("THREE:ObjectLoader: Can't parse " + a + ".", h.message);
          return;
        }

        c = f.metadata;
        void 0 === c || void 0 === c.type || "geometry" === c.type.toLowerCase() ? console.error("THREE.ObjectLoader: Can't load " + a + ". Use THREE.JSONLoader instead.") : e.parse(f, b);
      }, c, d);
    },
    setTexturePath: function setTexturePath(a) {
      this.texturePath = a;
    },
    setCrossOrigin: function setCrossOrigin(a) {
      this.crossOrigin = a;
    },
    parse: function parse(a, b) {
      var c = this.parseShape(a.shapes);
      c = this.parseGeometries(a.geometries, c);
      var d = this.parseImages(a.images, function () {
        void 0 !== b && b(e);
      });
      d = this.parseTextures(a.textures, d);
      d = this.parseMaterials(a.materials, d);
      var e = this.parseObject(a.object, c, d);
      a.animations && (e.animations = this.parseAnimations(a.animations));
      void 0 !== a.images && 0 !== a.images.length || void 0 === b || b(e);
      return e;
    },
    parseShape: function parseShape(a) {
      var b = {};
      if (void 0 !== a) for (var c = 0, d = a.length; c < d; c++) {
        var e = new gb().fromJSON(a[c]);
        b[e.uuid] = e;
      }
      return b;
    },
    parseGeometries: function parseGeometries(a, b) {
      var c = {};
      if (void 0 !== a) for (var d = new fe(), e = new ee(), f = 0, g = a.length; f < g; f++) {
        var h = a[f];

        switch (h.type) {
          case "PlaneGeometry":
          case "PlaneBufferGeometry":
            var l = new Ca[h.type](h.width, h.height, h.widthSegments, h.heightSegments);
            break;

          case "BoxGeometry":
          case "BoxBufferGeometry":
          case "CubeGeometry":
            l = new Ca[h.type](h.width, h.height, h.depth, h.widthSegments, h.heightSegments, h.depthSegments);
            break;

          case "CircleGeometry":
          case "CircleBufferGeometry":
            l = new Ca[h.type](h.radius, h.segments, h.thetaStart, h.thetaLength);
            break;

          case "CylinderGeometry":
          case "CylinderBufferGeometry":
            l = new Ca[h.type](h.radiusTop, h.radiusBottom, h.height, h.radialSegments, h.heightSegments, h.openEnded, h.thetaStart, h.thetaLength);
            break;

          case "ConeGeometry":
          case "ConeBufferGeometry":
            l = new Ca[h.type](h.radius, h.height, h.radialSegments, h.heightSegments, h.openEnded, h.thetaStart, h.thetaLength);
            break;

          case "SphereGeometry":
          case "SphereBufferGeometry":
            l = new Ca[h.type](h.radius, h.widthSegments, h.heightSegments, h.phiStart, h.phiLength, h.thetaStart, h.thetaLength);
            break;

          case "DodecahedronGeometry":
          case "DodecahedronBufferGeometry":
          case "IcosahedronGeometry":
          case "IcosahedronBufferGeometry":
          case "OctahedronGeometry":
          case "OctahedronBufferGeometry":
          case "TetrahedronGeometry":
          case "TetrahedronBufferGeometry":
            l = new Ca[h.type](h.radius, h.detail);
            break;

          case "RingGeometry":
          case "RingBufferGeometry":
            l = new Ca[h.type](h.innerRadius, h.outerRadius, h.thetaSegments, h.phiSegments, h.thetaStart, h.thetaLength);
            break;

          case "TorusGeometry":
          case "TorusBufferGeometry":
            l = new Ca[h.type](h.radius, h.tube, h.radialSegments, h.tubularSegments, h.arc);
            break;

          case "TorusKnotGeometry":
          case "TorusKnotBufferGeometry":
            l = new Ca[h.type](h.radius, h.tube, h.tubularSegments, h.radialSegments, h.p, h.q);
            break;

          case "LatheGeometry":
          case "LatheBufferGeometry":
            l = new Ca[h.type](h.points, h.segments, h.phiStart, h.phiLength);
            break;

          case "PolyhedronGeometry":
          case "PolyhedronBufferGeometry":
            l = new Ca[h.type](h.vertices, h.indices, h.radius, h.details);
            break;

          case "ShapeGeometry":
          case "ShapeBufferGeometry":
            l = [];
            f = 0;

            for (g = h.shapes.length; f < g; f++) {
              l.push(b[h.shapes[f]]);
            }

            l = new Ca[h.type](l, h.curveSegments);
            break;

          case "BufferGeometry":
            l = e.parse(h);
            break;

          case "Geometry":
            l = d.parse(h, this.texturePath).geometry;
            break;

          default:
            console.warn('THREE.ObjectLoader: Unsupported geometry type "' + h.type + '"');
            continue;
        }

        l.uuid = h.uuid;
        void 0 !== h.name && (l.name = h.name);
        c[h.uuid] = l;
      }
      return c;
    },
    parseMaterials: function parseMaterials(a, b) {
      var c = {};

      if (void 0 !== a) {
        var d = new Md();
        d.setTextures(b);
        b = 0;

        for (var e = a.length; b < e; b++) {
          var f = a[b];

          if ("MultiMaterial" === f.type) {
            for (var g = [], h = 0; h < f.materials.length; h++) {
              g.push(d.parse(f.materials[h]));
            }

            c[f.uuid] = g;
          } else c[f.uuid] = d.parse(f);
        }
      }

      return c;
    },
    parseAnimations: function parseAnimations(a) {
      for (var b = [], c = 0; c < a.length; c++) {
        var d = Ba.parse(a[c]);
        b.push(d);
      }

      return b;
    },
    parseImages: function parseImages(a, b) {
      function c(a) {
        d.manager.itemStart(a);
        return f.load(a, function () {
          d.manager.itemEnd(a);
        }, void 0, function () {
          d.manager.itemEnd(a);
          d.manager.itemError(a);
        });
      }

      var d = this,
          e = {};

      if (void 0 !== a && 0 < a.length) {
        b = new ae(b);
        var f = new Yc(b);
        f.setCrossOrigin(this.crossOrigin);
        b = 0;

        for (var g = a.length; b < g; b++) {
          var h = a[b],
              l = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(h.url) ? h.url : d.texturePath + h.url;
          e[h.uuid] = c(l);
        }
      }

      return e;
    },
    parseTextures: function parseTextures(a, b) {
      function c(a, b) {
        if ("number" === typeof a) return a;
        console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.", a);
        return b[a];
      }

      var d = {};
      if (void 0 !== a) for (var e = 0, f = a.length; e < f; e++) {
        var g = a[e];
        void 0 === g.image && console.warn('THREE.ObjectLoader: No "image" specified for', g.uuid);
        void 0 === b[g.image] && console.warn("THREE.ObjectLoader: Undefined image", g.image);
        var h = new Y(b[g.image]);
        h.needsUpdate = !0;
        h.uuid = g.uuid;
        void 0 !== g.name && (h.name = g.name);
        void 0 !== g.mapping && (h.mapping = c(g.mapping, Og));
        void 0 !== g.offset && h.offset.fromArray(g.offset);
        void 0 !== g.repeat && h.repeat.fromArray(g.repeat);
        void 0 !== g.center && h.center.fromArray(g.center);
        void 0 !== g.rotation && (h.rotation = g.rotation);
        void 0 !== g.wrap && (h.wrapS = c(g.wrap[0], vf), h.wrapT = c(g.wrap[1], vf));
        void 0 !== g.format && (h.format = g.format);
        void 0 !== g.minFilter && (h.minFilter = c(g.minFilter, wf));
        void 0 !== g.magFilter && (h.magFilter = c(g.magFilter, wf));
        void 0 !== g.anisotropy && (h.anisotropy = g.anisotropy);
        void 0 !== g.flipY && (h.flipY = g.flipY);
        d[g.uuid] = h;
      }
      return d;
    },
    parseObject: function parseObject(a, b, c) {
      function d(a) {
        void 0 === b[a] && console.warn("THREE.ObjectLoader: Undefined geometry", a);
        return b[a];
      }

      function e(a) {
        if (void 0 !== a) {
          if ((0, _isArray.default)(a)) {
            for (var b = [], d = 0, e = a.length; d < e; d++) {
              var f = a[d];
              void 0 === c[f] && console.warn("THREE.ObjectLoader: Undefined material", f);
              b.push(c[f]);
            }

            return b;
          }

          void 0 === c[a] && console.warn("THREE.ObjectLoader: Undefined material", a);
          return c[a];
        }
      }

      switch (a.type) {
        case "Scene":
          var f = new rd();
          void 0 !== a.background && (0, _isInteger.default)(a.background) && (f.background = new I(a.background));
          void 0 !== a.fog && ("Fog" === a.fog.type ? f.fog = new Pb(a.fog.color, a.fog.near, a.fog.far) : "FogExp2" === a.fog.type && (f.fog = new Ob(a.fog.color, a.fog.density)));
          break;

        case "PerspectiveCamera":
          f = new la(a.fov, a.aspect, a.near, a.far);
          void 0 !== a.focus && (f.focus = a.focus);
          void 0 !== a.zoom && (f.zoom = a.zoom);
          void 0 !== a.filmGauge && (f.filmGauge = a.filmGauge);
          void 0 !== a.filmOffset && (f.filmOffset = a.filmOffset);
          void 0 !== a.view && (f.view = (0, _assign.default)({}, a.view));
          break;

        case "OrthographicCamera":
          f = new Jb(a.left, a.right, a.top, a.bottom, a.near, a.far);
          void 0 !== a.zoom && (f.zoom = a.zoom);
          void 0 !== a.view && (f.view = (0, _assign.default)({}, a.view));
          break;

        case "AmbientLight":
          f = new Ed(a.color, a.intensity);
          break;

        case "DirectionalLight":
          f = new Dd(a.color, a.intensity);
          break;

        case "PointLight":
          f = new Bd(a.color, a.intensity, a.distance, a.decay);
          break;

        case "RectAreaLight":
          f = new Fd(a.color, a.intensity, a.width, a.height);
          break;

        case "SpotLight":
          f = new Ad(a.color, a.intensity, a.distance, a.angle, a.penumbra, a.decay);
          break;

        case "HemisphereLight":
          f = new yd(a.color, a.groundColor, a.intensity);
          break;

        case "SkinnedMesh":
          console.warn("THREE.ObjectLoader.parseObject() does not support SkinnedMesh yet.");

        case "Mesh":
          f = d(a.geometry);
          var g = e(a.material);
          f = f.bones && 0 < f.bones.length ? new td(f, g) : new oa(f, g);
          break;

        case "LOD":
          f = new Bc();
          break;

        case "Line":
          f = new ua(d(a.geometry), e(a.material), a.mode);
          break;

        case "LineLoop":
          f = new ud(d(a.geometry), e(a.material));
          break;

        case "LineSegments":
          f = new aa(d(a.geometry), e(a.material));
          break;

        case "PointCloud":
        case "Points":
          f = new Qb(d(a.geometry), e(a.material));
          break;

        case "Sprite":
          f = new Ac(e(a.material));
          break;

        case "Group":
          f = new vd();
          break;

        default:
          f = new A();
      }

      f.uuid = a.uuid;
      void 0 !== a.name && (f.name = a.name);
      void 0 !== a.matrix ? (f.matrix.fromArray(a.matrix), f.matrix.decompose(f.position, f.quaternion, f.scale)) : (void 0 !== a.position && f.position.fromArray(a.position), void 0 !== a.rotation && f.rotation.fromArray(a.rotation), void 0 !== a.quaternion && f.quaternion.fromArray(a.quaternion), void 0 !== a.scale && f.scale.fromArray(a.scale));
      void 0 !== a.castShadow && (f.castShadow = a.castShadow);
      void 0 !== a.receiveShadow && (f.receiveShadow = a.receiveShadow);
      a.shadow && (void 0 !== a.shadow.bias && (f.shadow.bias = a.shadow.bias), void 0 !== a.shadow.radius && (f.shadow.radius = a.shadow.radius), void 0 !== a.shadow.mapSize && f.shadow.mapSize.fromArray(a.shadow.mapSize), void 0 !== a.shadow.camera && (f.shadow.camera = this.parseObject(a.shadow.camera)));
      void 0 !== a.visible && (f.visible = a.visible);
      void 0 !== a.frustumCulled && (f.frustumCulled = a.frustumCulled);
      void 0 !== a.renderOrder && (f.renderOrder = a.renderOrder);
      void 0 !== a.userData && (f.userData = a.userData);

      if (void 0 !== a.children) {
        g = a.children;

        for (var h = 0; h < g.length; h++) {
          f.add(this.parseObject(g[h], b, c));
        }
      }

      if ("LOD" === a.type) for (a = a.levels, g = 0; g < a.length; g++) {
        h = a[g];
        var l = f.getObjectByProperty("uuid", h.object);
        void 0 !== l && f.addLevel(l, h.distance);
      }
      return f;
    }
  });
  var Og = {
    UVMapping: 300,
    CubeReflectionMapping: 301,
    CubeRefractionMapping: 302,
    EquirectangularReflectionMapping: 303,
    EquirectangularRefractionMapping: 304,
    SphericalReflectionMapping: 305,
    CubeUVReflectionMapping: 306,
    CubeUVRefractionMapping: 307
  },
      vf = {
    RepeatWrapping: 1E3,
    ClampToEdgeWrapping: 1001,
    MirroredRepeatWrapping: 1002
  },
      wf = {
    NearestFilter: 1003,
    NearestMipMapNearestFilter: 1004,
    NearestMipMapLinearFilter: 1005,
    LinearFilter: 1006,
    LinearMipMapNearestFilter: 1007,
    LinearMipMapLinearFilter: 1008
  };
  ge.prototype = {
    constructor: ge,
    setOptions: function setOptions(a) {
      this.options = a;
      return this;
    },
    load: function load(a, b, c, d) {
      void 0 === a && (a = "");
      void 0 !== this.path && (a = this.path + a);
      var e = this,
          f = Hb.get(a);
      if (void 0 !== f) return e.manager.itemStart(a), setTimeout(function () {
        b && b(f);
        e.manager.itemEnd(a);
      }, 0), f;
      fetch(a).then(function (a) {
        return a.blob();
      }).then(function (a) {
        return createImageBitmap(a, e.options);
      }).then(function (c) {
        Hb.add(a, c);
        b && b(c);
        e.manager.itemEnd(a);
      }).catch(function (b) {
        d && d(b);
        e.manager.itemEnd(a);
        e.manager.itemError(a);
      });
    },
    setCrossOrigin: function setCrossOrigin() {
      return this;
    },
    setPath: function setPath(a) {
      this.path = a;
      return this;
    }
  };
  (0, _assign.default)(he.prototype, {
    moveTo: function moveTo(a, b) {
      this.currentPath = new Pa();
      this.subPaths.push(this.currentPath);
      this.currentPath.moveTo(a, b);
    },
    lineTo: function lineTo(a, b) {
      this.currentPath.lineTo(a, b);
    },
    quadraticCurveTo: function quadraticCurveTo(a, b, c, d) {
      this.currentPath.quadraticCurveTo(a, b, c, d);
    },
    bezierCurveTo: function bezierCurveTo(a, b, c, d, e, f) {
      this.currentPath.bezierCurveTo(a, b, c, d, e, f);
    },
    splineThru: function splineThru(a) {
      this.currentPath.splineThru(a);
    },
    toShapes: function toShapes(a, b) {
      function c(a) {
        for (var b = [], c = 0, d = a.length; c < d; c++) {
          var e = a[c],
              f = new gb();
          f.curves = e.curves;
          b.push(f);
        }

        return b;
      }

      function d(a, b) {
        for (var c = b.length, d = !1, e = c - 1, f = 0; f < c; e = f++) {
          var g = b[e],
              h = b[f],
              l = h.x - g.x,
              k = h.y - g.y;

          if (Math.abs(k) > _epsilon.default) {
            if (0 > k && (g = b[f], l = -l, h = b[e], k = -k), !(a.y < g.y || a.y > h.y)) if (a.y === g.y) {
              if (a.x === g.x) return !0;
            } else {
              e = k * (a.x - g.x) - l * (a.y - g.y);
              if (0 === e) return !0;
              0 > e || (d = !d);
            }
          } else if (a.y === g.y && (h.x <= a.x && a.x <= g.x || g.x <= a.x && a.x <= h.x)) return !0;
        }

        return d;
      }

      var e = Xa.isClockWise,
          f = this.subPaths;
      if (0 === f.length) return [];
      if (!0 === b) return c(f);
      b = [];

      if (1 === f.length) {
        var g = f[0];
        var h = new gb();
        h.curves = g.curves;
        b.push(h);
        return b;
      }

      var l = !e(f[0].getPoints());
      l = a ? !l : l;
      h = [];
      var k = [],
          p = [],
          n = 0;
      k[n] = void 0;
      p[n] = [];

      for (var t = 0, r = f.length; t < r; t++) {
        g = f[t];
        var q = g.getPoints();
        var v = e(q);
        (v = a ? !v : v) ? (!l && k[n] && n++, k[n] = {
          s: new gb(),
          p: q
        }, k[n].s.curves = g.curves, l && n++, p[n] = []) : p[n].push({
          h: g,
          p: q[0]
        });
      }

      if (!k[0]) return c(f);

      if (1 < k.length) {
        t = !1;
        a = [];
        e = 0;

        for (f = k.length; e < f; e++) {
          h[e] = [];
        }

        e = 0;

        for (f = k.length; e < f; e++) {
          for (g = p[e], v = 0; v < g.length; v++) {
            l = g[v];
            n = !0;

            for (q = 0; q < k.length; q++) {
              d(l.p, k[q].p) && (e !== q && a.push({
                froms: e,
                tos: q,
                hole: v
              }), n ? (n = !1, h[q].push(l)) : t = !0);
            }

            n && h[e].push(l);
          }
        }

        0 < a.length && (t || (p = h));
      }

      t = 0;

      for (e = k.length; t < e; t++) {
        for (h = k[t].s, b.push(h), a = p[t], f = 0, g = a.length; f < g; f++) {
          h.holes.push(a[f].h);
        }
      }

      return b;
    }
  });
  (0, _assign.default)(ie.prototype, {
    isFont: !0,
    generateShapes: function generateShapes(a, b, c) {
      void 0 === b && (b = 100);
      c = [];
      var d = b;
      b = this.data;
      var e = String(a).split("");
      d /= b.resolution;
      var f = (b.boundingBox.yMax - b.boundingBox.yMin + b.underlineThickness) * d;
      a = [];

      for (var g = 0, h = 0, l = 0; l < e.length; l++) {
        var k = e[l];
        if ("\n" === k) g = 0, h -= f;else {
          var p = d;
          var n = g,
              t = h;

          if (k = b.glyphs[k] || b.glyphs["?"]) {
            var r = new he();
            if (k.o) for (var q = k._cachedOutline || (k._cachedOutline = k.o.split(" ")), v = 0, x = q.length; v < x;) {
              switch (q[v++]) {
                case "m":
                  var y = q[v++] * p + n;
                  var w = q[v++] * p + t;
                  r.moveTo(y, w);
                  break;

                case "l":
                  y = q[v++] * p + n;
                  w = q[v++] * p + t;
                  r.lineTo(y, w);
                  break;

                case "q":
                  var z = q[v++] * p + n;
                  var A = q[v++] * p + t;
                  var C = q[v++] * p + n;
                  var E = q[v++] * p + t;
                  r.quadraticCurveTo(C, E, z, A);
                  break;

                case "b":
                  z = q[v++] * p + n, A = q[v++] * p + t, C = q[v++] * p + n, E = q[v++] * p + t, y = q[v++] * p + n, w = q[v++] * p + t, r.bezierCurveTo(C, E, y, w, z, A);
              }
            }
            p = {
              offsetX: k.ha * p,
              path: r
            };
          } else p = void 0;

          g += p.offsetX;
          a.push(p.path);
        }
      }

      b = 0;

      for (e = a.length; b < e; b++) {
        Array.prototype.push.apply(c, a[b].toShapes());
      }

      return c;
    }
  });
  (0, _assign.default)(gf.prototype, {
    load: function load(a, b, c, d) {
      var e = this,
          f = new Ka(this.manager);
      f.setPath(this.path);
      f.load(a, function (a) {
        try {
          var c = JSON.parse(a);
        } catch (l) {
          console.warn("THREE.FontLoader: typeface.js support is being deprecated. Use typeface.json instead."), c = JSON.parse(a.substring(65, a.length - 2));
        }

        a = e.parse(c);
        b && b(a);
      }, c, d);
    },
    parse: function parse(a) {
      return new ie(a);
    },
    setPath: function setPath(a) {
      this.path = a;
      return this;
    }
  });
  var Rd,
      le = {
    getContext: function getContext() {
      void 0 === Rd && (Rd = new (window.AudioContext || window.webkitAudioContext)());
      return Rd;
    },
    setContext: function setContext(a) {
      Rd = a;
    }
  };
  (0, _assign.default)(je.prototype, {
    load: function load(a, b, c, d) {
      var e = new Ka(this.manager);
      e.setResponseType("arraybuffer");
      e.load(a, function (a) {
        le.getContext().decodeAudioData(a, function (a) {
          b(a);
        });
      }, c, d);
    }
  });
  (0, _assign.default)(hf.prototype, {
    update: function () {
      var a,
          b,
          c,
          d,
          e,
          f,
          g,
          h,
          l = new M(),
          k = new M();
      return function (m) {
        if (a !== this || b !== m.focus || c !== m.fov || d !== m.aspect * this.aspect || e !== m.near || f !== m.far || g !== m.zoom || h !== this.eyeSep) {
          a = this;
          b = m.focus;
          c = m.fov;
          d = m.aspect * this.aspect;
          e = m.near;
          f = m.far;
          g = m.zoom;
          var n = m.projectionMatrix.clone();
          h = this.eyeSep / 2;
          var p = h * e / b,
              r = e * Math.tan(S.DEG2RAD * c * .5) / g;
          k.elements[12] = -h;
          l.elements[12] = h;
          var q = -r * d + p;
          var u = r * d + p;
          n.elements[0] = 2 * e / (u - q);
          n.elements[8] = (u + q) / (u - q);
          this.cameraL.projectionMatrix.copy(n);
          q = -r * d - p;
          u = r * d - p;
          n.elements[0] = 2 * e / (u - q);
          n.elements[8] = (u + q) / (u - q);
          this.cameraR.projectionMatrix.copy(n);
        }

        this.cameraL.matrixWorld.copy(m.matrixWorld).multiply(k);
        this.cameraR.matrixWorld.copy(m.matrixWorld).multiply(l);
      };
    }()
  });
  cd.prototype = (0, _create.default)(A.prototype);
  cd.prototype.constructor = cd;
  ke.prototype = (0, _assign.default)((0, _create.default)(A.prototype), {
    constructor: ke,
    getInput: function getInput() {
      return this.gain;
    },
    removeFilter: function removeFilter() {
      null !== this.filter && (this.gain.disconnect(this.filter), this.filter.disconnect(this.context.destination), this.gain.connect(this.context.destination), this.filter = null);
    },
    getFilter: function getFilter() {
      return this.filter;
    },
    setFilter: function setFilter(a) {
      null !== this.filter ? (this.gain.disconnect(this.filter), this.filter.disconnect(this.context.destination)) : this.gain.disconnect(this.context.destination);
      this.filter = a;
      this.gain.connect(this.filter);
      this.filter.connect(this.context.destination);
    },
    getMasterVolume: function getMasterVolume() {
      return this.gain.gain.value;
    },
    setMasterVolume: function setMasterVolume(a) {
      this.gain.gain.value = a;
    },
    updateMatrixWorld: function () {
      var a = new p(),
          b = new ja(),
          c = new p(),
          d = new p();
      return function (e) {
        A.prototype.updateMatrixWorld.call(this, e);
        e = this.context.listener;
        var f = this.up;
        this.matrixWorld.decompose(a, b, c);
        d.set(0, 0, -1).applyQuaternion(b);
        e.positionX ? (e.positionX.setValueAtTime(a.x, this.context.currentTime), e.positionY.setValueAtTime(a.y, this.context.currentTime), e.positionZ.setValueAtTime(a.z, this.context.currentTime), e.forwardX.setValueAtTime(d.x, this.context.currentTime), e.forwardY.setValueAtTime(d.y, this.context.currentTime), e.forwardZ.setValueAtTime(d.z, this.context.currentTime), e.upX.setValueAtTime(f.x, this.context.currentTime), e.upY.setValueAtTime(f.y, this.context.currentTime), e.upZ.setValueAtTime(f.z, this.context.currentTime)) : (e.setPosition(a.x, a.y, a.z), e.setOrientation(d.x, d.y, d.z, f.x, f.y, f.z));
      };
    }()
  });
  jc.prototype = (0, _assign.default)((0, _create.default)(A.prototype), {
    constructor: jc,
    getOutput: function getOutput() {
      return this.gain;
    },
    setNodeSource: function setNodeSource(a) {
      this.hasPlaybackControl = !1;
      this.sourceType = "audioNode";
      this.source = a;
      this.connect();
      return this;
    },
    setBuffer: function setBuffer(a) {
      this.buffer = a;
      this.sourceType = "buffer";
      this.autoplay && this.play();
      return this;
    },
    play: function play() {
      if (!0 === this.isPlaying) console.warn("THREE.Audio: Audio is already playing.");else if (!1 === this.hasPlaybackControl) console.warn("THREE.Audio: this Audio has no playback control.");else {
        var a = this.context.createBufferSource();
        a.buffer = this.buffer;
        a.loop = this.loop;
        a.onended = this.onEnded.bind(this);
        a.playbackRate.setValueAtTime(this.playbackRate, this.startTime);
        this.startTime = this.context.currentTime;
        a.start(this.startTime, this.offset);
        this.isPlaying = !0;
        this.source = a;
        return this.connect();
      }
    },
    pause: function pause() {
      if (!1 === this.hasPlaybackControl) console.warn("THREE.Audio: this Audio has no playback control.");else return !0 === this.isPlaying && (this.source.stop(), this.offset += (this.context.currentTime - this.startTime) * this.playbackRate, this.isPlaying = !1), this;
    },
    stop: function stop() {
      if (!1 === this.hasPlaybackControl) console.warn("THREE.Audio: this Audio has no playback control.");else return this.source.stop(), this.offset = 0, this.isPlaying = !1, this;
    },
    connect: function connect() {
      if (0 < this.filters.length) {
        this.source.connect(this.filters[0]);

        for (var a = 1, b = this.filters.length; a < b; a++) {
          this.filters[a - 1].connect(this.filters[a]);
        }

        this.filters[this.filters.length - 1].connect(this.getOutput());
      } else this.source.connect(this.getOutput());

      return this;
    },
    disconnect: function disconnect() {
      if (0 < this.filters.length) {
        this.source.disconnect(this.filters[0]);

        for (var a = 1, b = this.filters.length; a < b; a++) {
          this.filters[a - 1].disconnect(this.filters[a]);
        }

        this.filters[this.filters.length - 1].disconnect(this.getOutput());
      } else this.source.disconnect(this.getOutput());

      return this;
    },
    getFilters: function getFilters() {
      return this.filters;
    },
    setFilters: function setFilters(a) {
      a || (a = []);
      !0 === this.isPlaying ? (this.disconnect(), this.filters = a, this.connect()) : this.filters = a;
      return this;
    },
    getFilter: function getFilter() {
      return this.getFilters()[0];
    },
    setFilter: function setFilter(a) {
      return this.setFilters(a ? [a] : []);
    },
    setPlaybackRate: function setPlaybackRate(a) {
      if (!1 === this.hasPlaybackControl) console.warn("THREE.Audio: this Audio has no playback control.");else return this.playbackRate = a, !0 === this.isPlaying && this.source.playbackRate.setValueAtTime(this.playbackRate, this.context.currentTime), this;
    },
    getPlaybackRate: function getPlaybackRate() {
      return this.playbackRate;
    },
    onEnded: function onEnded() {
      this.isPlaying = !1;
    },
    getLoop: function getLoop() {
      return !1 === this.hasPlaybackControl ? (console.warn("THREE.Audio: this Audio has no playback control."), !1) : this.loop;
    },
    setLoop: function setLoop(a) {
      if (!1 === this.hasPlaybackControl) console.warn("THREE.Audio: this Audio has no playback control.");else return this.loop = a, !0 === this.isPlaying && (this.source.loop = this.loop), this;
    },
    getVolume: function getVolume() {
      return this.gain.gain.value;
    },
    setVolume: function setVolume(a) {
      this.gain.gain.value = a;
      return this;
    }
  });
  me.prototype = (0, _assign.default)((0, _create.default)(jc.prototype), {
    constructor: me,
    getOutput: function getOutput() {
      return this.panner;
    },
    getRefDistance: function getRefDistance() {
      return this.panner.refDistance;
    },
    setRefDistance: function setRefDistance(a) {
      this.panner.refDistance = a;
    },
    getRolloffFactor: function getRolloffFactor() {
      return this.panner.rolloffFactor;
    },
    setRolloffFactor: function setRolloffFactor(a) {
      this.panner.rolloffFactor = a;
    },
    getDistanceModel: function getDistanceModel() {
      return this.panner.distanceModel;
    },
    setDistanceModel: function setDistanceModel(a) {
      this.panner.distanceModel = a;
    },
    getMaxDistance: function getMaxDistance() {
      return this.panner.maxDistance;
    },
    setMaxDistance: function setMaxDistance(a) {
      this.panner.maxDistance = a;
    },
    updateMatrixWorld: function () {
      var a = new p();
      return function (b) {
        A.prototype.updateMatrixWorld.call(this, b);
        a.setFromMatrixPosition(this.matrixWorld);
        this.panner.setPosition(a.x, a.y, a.z);
      };
    }()
  });
  (0, _assign.default)(ne.prototype, {
    getFrequencyData: function getFrequencyData() {
      this.analyser.getByteFrequencyData(this.data);
      return this.data;
    },
    getAverageFrequency: function getAverageFrequency() {
      for (var a = 0, b = this.getFrequencyData(), c = 0; c < b.length; c++) {
        a += b[c];
      }

      return a / b.length;
    }
  });
  (0, _assign.default)(oe.prototype, {
    accumulate: function accumulate(a, b) {
      var c = this.buffer,
          d = this.valueSize;
      a = a * d + d;
      var e = this.cumulativeWeight;

      if (0 === e) {
        for (e = 0; e !== d; ++e) {
          c[a + e] = c[e];
        }

        e = b;
      } else e += b, this._mixBufferRegion(c, a, 0, b / e, d);

      this.cumulativeWeight = e;
    },
    apply: function apply(a) {
      var b = this.valueSize,
          c = this.buffer;
      a = a * b + b;
      var d = this.cumulativeWeight,
          e = this.binding;
      this.cumulativeWeight = 0;
      1 > d && this._mixBufferRegion(c, a, 3 * b, 1 - d, b);
      d = b;

      for (var f = b + b; d !== f; ++d) {
        if (c[d] !== c[d + b]) {
          e.setValue(c, a);
          break;
        }
      }
    },
    saveOriginalState: function saveOriginalState() {
      var a = this.buffer,
          b = this.valueSize,
          c = 3 * b;
      this.binding.getValue(a, c);

      for (var d = b; d !== c; ++d) {
        a[d] = a[c + d % b];
      }

      this.cumulativeWeight = 0;
    },
    restoreOriginalState: function restoreOriginalState() {
      this.binding.setValue(this.buffer, 3 * this.valueSize);
    },
    _select: function _select(a, b, c, d, e) {
      if (.5 <= d) for (d = 0; d !== e; ++d) {
        a[b + d] = a[c + d];
      }
    },
    _slerp: function _slerp(a, b, c, d) {
      ja.slerpFlat(a, b, a, b, a, c, d);
    },
    _lerp: function _lerp(a, b, c, d, e) {
      for (var f = 1 - d, g = 0; g !== e; ++g) {
        var h = b + g;
        a[h] = a[h] * f + a[c + g] * d;
      }
    }
  });
  (0, _assign.default)(jf.prototype, {
    getValue: function getValue(a, b) {
      this.bind();
      var c = this._bindings[this._targetGroup.nCachedObjects_];
      void 0 !== c && c.getValue(a, b);
    },
    setValue: function setValue(a, b) {
      for (var c = this._bindings, d = this._targetGroup.nCachedObjects_, e = c.length; d !== e; ++d) {
        c[d].setValue(a, b);
      }
    },
    bind: function bind() {
      for (var a = this._bindings, b = this._targetGroup.nCachedObjects_, c = a.length; b !== c; ++b) {
        a[b].bind();
      }
    },
    unbind: function unbind() {
      for (var a = this._bindings, b = this._targetGroup.nCachedObjects_, c = a.length; b !== c; ++b) {
        a[b].unbind();
      }
    }
  });
  (0, _assign.default)(qa, {
    Composite: jf,
    create: function create(a, b, c) {
      return a && a.isAnimationObjectGroup ? new qa.Composite(a, b, c) : new qa(a, b, c);
    },
    sanitizeNodeName: function () {
      var a = /[\[\]\.:\/]/g;
      return function (b) {
        return b.replace(/\s/g, "_").replace(a, "");
      };
    }(),
    parseTrackName: function () {
      var a = "[^" + "\\[\\]\\.:\\/".replace("\\.", "") + "]",
          b = /((?:WC+[\/:])*)/.source.replace("WC", "[^\\[\\]\\.:\\/]");
      a = /(WCOD+)?/.source.replace("WCOD", a);
      var c = /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", "[^\\[\\]\\.:\\/]"),
          d = /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", "[^\\[\\]\\.:\\/]"),
          e = new RegExp("^" + b + a + c + d + "$"),
          f = ["material", "materials", "bones"];
      return function (a) {
        var b = e.exec(a);
        if (!b) throw Error("PropertyBinding: Cannot parse trackName: " + a);
        b = {
          nodeName: b[2],
          objectName: b[3],
          objectIndex: b[4],
          propertyName: b[5],
          propertyIndex: b[6]
        };
        var c = b.nodeName && b.nodeName.lastIndexOf(".");

        if (void 0 !== c && -1 !== c) {
          var d = b.nodeName.substring(c + 1);
          -1 !== f.indexOf(d) && (b.nodeName = b.nodeName.substring(0, c), b.objectName = d);
        }

        if (null === b.propertyName || 0 === b.propertyName.length) throw Error("PropertyBinding: can not parse propertyName from trackName: " + a);
        return b;
      };
    }(),
    findNode: function findNode(a, b) {
      if (!b || "" === b || "root" === b || "." === b || -1 === b || b === a.name || b === a.uuid) return a;

      if (a.skeleton) {
        var c = a.skeleton.getBoneByName(b);
        if (void 0 !== c) return c;
      }

      if (a.children) {
        var d = function d(a) {
          for (var c = 0; c < a.length; c++) {
            var e = a[c];
            if (e.name === b || e.uuid === b || (e = d(e.children))) return e;
          }

          return null;
        };

        if (a = d(a.children)) return a;
      }

      return null;
    }
  });
  (0, _assign.default)(qa.prototype, {
    _getValue_unavailable: function _getValue_unavailable() {},
    _setValue_unavailable: function _setValue_unavailable() {},
    BindingType: {
      Direct: 0,
      EntireArray: 1,
      ArrayElement: 2,
      HasFromToArray: 3
    },
    Versioning: {
      None: 0,
      NeedsUpdate: 1,
      MatrixWorldNeedsUpdate: 2
    },
    GetterByBindingType: [function (a, b) {
      a[b] = this.node[this.propertyName];
    }, function (a, b) {
      for (var c = this.resolvedProperty, d = 0, e = c.length; d !== e; ++d) {
        a[b++] = c[d];
      }
    }, function (a, b) {
      a[b] = this.resolvedProperty[this.propertyIndex];
    }, function (a, b) {
      this.resolvedProperty.toArray(a, b);
    }],
    SetterByBindingTypeAndVersioning: [[function (a, b) {
      this.targetObject[this.propertyName] = a[b];
    }, function (a, b) {
      this.targetObject[this.propertyName] = a[b];
      this.targetObject.needsUpdate = !0;
    }, function (a, b) {
      this.targetObject[this.propertyName] = a[b];
      this.targetObject.matrixWorldNeedsUpdate = !0;
    }], [function (a, b) {
      for (var c = this.resolvedProperty, d = 0, e = c.length; d !== e; ++d) {
        c[d] = a[b++];
      }
    }, function (a, b) {
      for (var c = this.resolvedProperty, d = 0, e = c.length; d !== e; ++d) {
        c[d] = a[b++];
      }

      this.targetObject.needsUpdate = !0;
    }, function (a, b) {
      for (var c = this.resolvedProperty, d = 0, e = c.length; d !== e; ++d) {
        c[d] = a[b++];
      }

      this.targetObject.matrixWorldNeedsUpdate = !0;
    }], [function (a, b) {
      this.resolvedProperty[this.propertyIndex] = a[b];
    }, function (a, b) {
      this.resolvedProperty[this.propertyIndex] = a[b];
      this.targetObject.needsUpdate = !0;
    }, function (a, b) {
      this.resolvedProperty[this.propertyIndex] = a[b];
      this.targetObject.matrixWorldNeedsUpdate = !0;
    }], [function (a, b) {
      this.resolvedProperty.fromArray(a, b);
    }, function (a, b) {
      this.resolvedProperty.fromArray(a, b);
      this.targetObject.needsUpdate = !0;
    }, function (a, b) {
      this.resolvedProperty.fromArray(a, b);
      this.targetObject.matrixWorldNeedsUpdate = !0;
    }]],
    getValue: function getValue(a, b) {
      this.bind();
      this.getValue(a, b);
    },
    setValue: function setValue(a, b) {
      this.bind();
      this.setValue(a, b);
    },
    bind: function bind() {
      var a = this.node,
          b = this.parsedPath,
          c = b.objectName,
          d = b.propertyName,
          e = b.propertyIndex;
      a || (this.node = a = qa.findNode(this.rootNode, b.nodeName) || this.rootNode);
      this.getValue = this._getValue_unavailable;
      this.setValue = this._setValue_unavailable;

      if (a) {
        if (c) {
          var f = b.objectIndex;

          switch (c) {
            case "materials":
              if (!a.material) {
                console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.", this);
                return;
              }

              if (!a.material.materials) {
                console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
                return;
              }

              a = a.material.materials;
              break;

            case "bones":
              if (!a.skeleton) {
                console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
                return;
              }

              a = a.skeleton.bones;

              for (c = 0; c < a.length; c++) {
                if (a[c].name === f) {
                  f = c;
                  break;
                }
              }

              break;

            default:
              if (void 0 === a[c]) {
                console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.", this);
                return;
              }

              a = a[c];
          }

          if (void 0 !== f) {
            if (void 0 === a[f]) {
              console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, a);
              return;
            }

            a = a[f];
          }
        }

        f = a[d];
        if (void 0 === f) console.error("THREE.PropertyBinding: Trying to update property for track: " + b.nodeName + "." + d + " but it wasn't found.", a);else {
          b = this.Versioning.None;
          void 0 !== a.needsUpdate ? (b = this.Versioning.NeedsUpdate, this.targetObject = a) : void 0 !== a.matrixWorldNeedsUpdate && (b = this.Versioning.MatrixWorldNeedsUpdate, this.targetObject = a);
          c = this.BindingType.Direct;

          if (void 0 !== e) {
            if ("morphTargetInfluences" === d) {
              if (!a.geometry) {
                console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
                return;
              }

              if (a.geometry.isBufferGeometry) {
                if (!a.geometry.morphAttributes) {
                  console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
                  return;
                }

                for (c = 0; c < this.node.geometry.morphAttributes.position.length; c++) {
                  if (a.geometry.morphAttributes.position[c].name === e) {
                    e = c;
                    break;
                  }
                }
              } else {
                if (!a.geometry.morphTargets) {
                  console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphTargets.", this);
                  return;
                }

                for (c = 0; c < this.node.geometry.morphTargets.length; c++) {
                  if (a.geometry.morphTargets[c].name === e) {
                    e = c;
                    break;
                  }
                }
              }
            }

            c = this.BindingType.ArrayElement;
            this.resolvedProperty = f;
            this.propertyIndex = e;
          } else void 0 !== f.fromArray && void 0 !== f.toArray ? (c = this.BindingType.HasFromToArray, this.resolvedProperty = f) : (0, _isArray.default)(f) ? (c = this.BindingType.EntireArray, this.resolvedProperty = f) : this.propertyName = d;

          this.getValue = this.GetterByBindingType[c];
          this.setValue = this.SetterByBindingTypeAndVersioning[c][b];
        }
      } else console.error("THREE.PropertyBinding: Trying to update node for track: " + this.path + " but it wasn't found.");
    },
    unbind: function unbind() {
      this.node = null;
      this.getValue = this._getValue_unbound;
      this.setValue = this._setValue_unbound;
    }
  });
  (0, _assign.default)(qa.prototype, {
    _getValue_unbound: qa.prototype.getValue,
    _setValue_unbound: qa.prototype.setValue
  });
  (0, _assign.default)(kf.prototype, {
    isAnimationObjectGroup: !0,
    add: function add() {
      for (var a = this._objects, b = a.length, c = this.nCachedObjects_, d = this._indicesByUUID, e = this._paths, f = this._parsedPaths, g = this._bindings, h = g.length, k = void 0, m = 0, p = arguments.length; m !== p; ++m) {
        var n = arguments[m],
            t = n.uuid,
            r = d[t];

        if (void 0 === r) {
          r = b++;
          d[t] = r;
          a.push(n);
          t = 0;

          for (var q = h; t !== q; ++t) {
            g[t].push(new qa(n, e[t], f[t]));
          }
        } else if (r < c) {
          k = a[r];
          var v = --c;
          q = a[v];
          d[q.uuid] = r;
          a[r] = q;
          d[t] = v;
          a[v] = n;
          t = 0;

          for (q = h; t !== q; ++t) {
            var x = g[t],
                y = x[r];
            x[r] = x[v];
            void 0 === y && (y = new qa(n, e[t], f[t]));
            x[v] = y;
          }
        } else a[r] !== k && console.error("THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.");
      }

      this.nCachedObjects_ = c;
    },
    remove: function remove() {
      for (var a = this._objects, b = this.nCachedObjects_, c = this._indicesByUUID, d = this._bindings, e = d.length, f = 0, g = arguments.length; f !== g; ++f) {
        var h = arguments[f],
            k = h.uuid,
            m = c[k];

        if (void 0 !== m && m >= b) {
          var p = b++,
              n = a[p];
          c[n.uuid] = m;
          a[m] = n;
          c[k] = p;
          a[p] = h;
          h = 0;

          for (k = e; h !== k; ++h) {
            n = d[h];
            var t = n[m];
            n[m] = n[p];
            n[p] = t;
          }
        }
      }

      this.nCachedObjects_ = b;
    },
    uncache: function uncache() {
      for (var a = this._objects, b = a.length, c = this.nCachedObjects_, d = this._indicesByUUID, e = this._bindings, f = e.length, g = 0, h = arguments.length; g !== h; ++g) {
        var k = arguments[g].uuid,
            m = d[k];
        if (void 0 !== m) if (delete d[k], m < c) {
          k = --c;
          var p = a[k],
              n = --b,
              t = a[n];
          d[p.uuid] = m;
          a[m] = p;
          d[t.uuid] = k;
          a[k] = t;
          a.pop();
          p = 0;

          for (t = f; p !== t; ++p) {
            var r = e[p],
                q = r[n];
            r[m] = r[k];
            r[k] = q;
            r.pop();
          }
        } else for (n = --b, t = a[n], d[t.uuid] = m, a[m] = t, a.pop(), p = 0, t = f; p !== t; ++p) {
          r = e[p], r[m] = r[n], r.pop();
        }
      }

      this.nCachedObjects_ = c;
    },
    subscribe_: function subscribe_(a, b) {
      var c = this._bindingsIndicesByPath,
          d = c[a],
          e = this._bindings;
      if (void 0 !== d) return e[d];
      var f = this._paths,
          g = this._parsedPaths,
          h = this._objects,
          k = this.nCachedObjects_,
          m = Array(h.length);
      d = e.length;
      c[a] = d;
      f.push(a);
      g.push(b);
      e.push(m);
      c = k;

      for (d = h.length; c !== d; ++c) {
        m[c] = new qa(h[c], a, b);
      }

      return m;
    },
    unsubscribe_: function unsubscribe_(a) {
      var b = this._bindingsIndicesByPath,
          c = b[a];

      if (void 0 !== c) {
        var d = this._paths,
            e = this._parsedPaths,
            f = this._bindings,
            g = f.length - 1,
            h = f[g];
        b[a[g]] = c;
        f[c] = h;
        f.pop();
        e[c] = e[g];
        e.pop();
        d[c] = d[g];
        d.pop();
      }
    }
  });
  (0, _assign.default)(lf.prototype, {
    play: function play() {
      this._mixer._activateAction(this);

      return this;
    },
    stop: function stop() {
      this._mixer._deactivateAction(this);

      return this.reset();
    },
    reset: function reset() {
      this.paused = !1;
      this.enabled = !0;
      this.time = 0;
      this._loopCount = -1;
      this._startTime = null;
      return this.stopFading().stopWarping();
    },
    isRunning: function isRunning() {
      return this.enabled && !this.paused && 0 !== this.timeScale && null === this._startTime && this._mixer._isActiveAction(this);
    },
    isScheduled: function isScheduled() {
      return this._mixer._isActiveAction(this);
    },
    startAt: function startAt(a) {
      this._startTime = a;
      return this;
    },
    setLoop: function setLoop(a, b) {
      this.loop = a;
      this.repetitions = b;
      return this;
    },
    setEffectiveWeight: function setEffectiveWeight(a) {
      this.weight = a;
      this._effectiveWeight = this.enabled ? a : 0;
      return this.stopFading();
    },
    getEffectiveWeight: function getEffectiveWeight() {
      return this._effectiveWeight;
    },
    fadeIn: function fadeIn(a) {
      return this._scheduleFading(a, 0, 1);
    },
    fadeOut: function fadeOut(a) {
      return this._scheduleFading(a, 1, 0);
    },
    crossFadeFrom: function crossFadeFrom(a, b, c) {
      a.fadeOut(b);
      this.fadeIn(b);

      if (c) {
        c = this._clip.duration;
        var d = a._clip.duration,
            e = c / d;
        a.warp(1, d / c, b);
        this.warp(e, 1, b);
      }

      return this;
    },
    crossFadeTo: function crossFadeTo(a, b, c) {
      return a.crossFadeFrom(this, b, c);
    },
    stopFading: function stopFading() {
      var a = this._weightInterpolant;
      null !== a && (this._weightInterpolant = null, this._mixer._takeBackControlInterpolant(a));
      return this;
    },
    setEffectiveTimeScale: function setEffectiveTimeScale(a) {
      this.timeScale = a;
      this._effectiveTimeScale = this.paused ? 0 : a;
      return this.stopWarping();
    },
    getEffectiveTimeScale: function getEffectiveTimeScale() {
      return this._effectiveTimeScale;
    },
    setDuration: function setDuration(a) {
      this.timeScale = this._clip.duration / a;
      return this.stopWarping();
    },
    syncWith: function syncWith(a) {
      this.time = a.time;
      this.timeScale = a.timeScale;
      return this.stopWarping();
    },
    halt: function halt(a) {
      return this.warp(this._effectiveTimeScale, 0, a);
    },
    warp: function warp(a, b, c) {
      var d = this._mixer,
          e = d.time,
          f = this._timeScaleInterpolant,
          g = this.timeScale;
      null === f && (this._timeScaleInterpolant = f = d._lendControlInterpolant());
      d = f.parameterPositions;
      f = f.sampleValues;
      d[0] = e;
      d[1] = e + c;
      f[0] = a / g;
      f[1] = b / g;
      return this;
    },
    stopWarping: function stopWarping() {
      var a = this._timeScaleInterpolant;
      null !== a && (this._timeScaleInterpolant = null, this._mixer._takeBackControlInterpolant(a));
      return this;
    },
    getMixer: function getMixer() {
      return this._mixer;
    },
    getClip: function getClip() {
      return this._clip;
    },
    getRoot: function getRoot() {
      return this._localRoot || this._mixer._root;
    },
    _update: function _update(a, b, c, d) {
      if (this.enabled) {
        var e = this._startTime;

        if (null !== e) {
          b = (a - e) * c;
          if (0 > b || 0 === c) return;
          this._startTime = null;
          b *= c;
        }

        b *= this._updateTimeScale(a);
        c = this._updateTime(b);
        a = this._updateWeight(a);

        if (0 < a) {
          b = this._interpolants;
          e = this._propertyBindings;

          for (var f = 0, g = b.length; f !== g; ++f) {
            b[f].evaluate(c), e[f].accumulate(d, a);
          }
        }
      } else this._updateWeight(a);
    },
    _updateWeight: function _updateWeight(a) {
      var b = 0;

      if (this.enabled) {
        b = this.weight;
        var c = this._weightInterpolant;

        if (null !== c) {
          var d = c.evaluate(a)[0];
          b *= d;
          a > c.parameterPositions[1] && (this.stopFading(), 0 === d && (this.enabled = !1));
        }
      }

      return this._effectiveWeight = b;
    },
    _updateTimeScale: function _updateTimeScale(a) {
      var b = 0;

      if (!this.paused) {
        b = this.timeScale;
        var c = this._timeScaleInterpolant;

        if (null !== c) {
          var d = c.evaluate(a)[0];
          b *= d;
          a > c.parameterPositions[1] && (this.stopWarping(), 0 === b ? this.paused = !0 : this.timeScale = b);
        }
      }

      return this._effectiveTimeScale = b;
    },
    _updateTime: function _updateTime(a) {
      var b = this.time + a;
      if (0 === a) return b;
      var c = this._clip.duration,
          d = this.loop,
          e = this._loopCount;
      if (2200 === d) a: {
        if (-1 === e && (this._loopCount = 0, this._setEndings(!0, !0, !1)), b >= c) b = c;else if (0 > b) b = 0;else break a;
        this.clampWhenFinished ? this.paused = !0 : this.enabled = !1;

        this._mixer.dispatchEvent({
          type: "finished",
          action: this,
          direction: 0 > a ? -1 : 1
        });
      } else {
        d = 2202 === d;
        -1 === e && (0 <= a ? (e = 0, this._setEndings(!0, 0 === this.repetitions, d)) : this._setEndings(0 === this.repetitions, !0, d));

        if (b >= c || 0 > b) {
          var f = Math.floor(b / c);
          b -= c * f;
          e += Math.abs(f);
          var g = this.repetitions - e;
          0 >= g ? (this.clampWhenFinished ? this.paused = !0 : this.enabled = !1, b = 0 < a ? c : 0, this._mixer.dispatchEvent({
            type: "finished",
            action: this,
            direction: 0 < a ? 1 : -1
          })) : (1 === g ? (a = 0 > a, this._setEndings(a, !a, d)) : this._setEndings(!1, !1, d), this._loopCount = e, this._mixer.dispatchEvent({
            type: "loop",
            action: this,
            loopDelta: f
          }));
        }

        if (d && 1 === (e & 1)) return this.time = b, c - b;
      }
      return this.time = b;
    },
    _setEndings: function _setEndings(a, b, c) {
      var d = this._interpolantSettings;
      c ? (d.endingStart = 2401, d.endingEnd = 2401) : (d.endingStart = a ? this.zeroSlopeAtStart ? 2401 : 2400 : 2402, d.endingEnd = b ? this.zeroSlopeAtEnd ? 2401 : 2400 : 2402);
    },
    _scheduleFading: function _scheduleFading(a, b, c) {
      var d = this._mixer,
          e = d.time,
          f = this._weightInterpolant;
      null === f && (this._weightInterpolant = f = d._lendControlInterpolant());
      d = f.parameterPositions;
      f = f.sampleValues;
      d[0] = e;
      f[0] = b;
      d[1] = e + a;
      f[1] = c;
      return this;
    }
  });
  pe.prototype = (0, _assign.default)((0, _create.default)(xa.prototype), {
    constructor: pe,
    _bindAction: function _bindAction(a, b) {
      var c = a._localRoot || this._root,
          d = a._clip.tracks,
          e = d.length,
          f = a._propertyBindings;
      a = a._interpolants;
      var g = c.uuid,
          h = this._bindingsByRootAndName,
          k = h[g];
      void 0 === k && (k = {}, h[g] = k);

      for (h = 0; h !== e; ++h) {
        var m = d[h],
            p = m.name,
            n = k[p];

        if (void 0 === n) {
          n = f[h];

          if (void 0 !== n) {
            null === n._cacheIndex && (++n.referenceCount, this._addInactiveBinding(n, g, p));
            continue;
          }

          n = new oe(qa.create(c, p, b && b._propertyBindings[h].binding.parsedPath), m.ValueTypeName, m.getValueSize());
          ++n.referenceCount;

          this._addInactiveBinding(n, g, p);
        }

        f[h] = n;
        a[h].resultBuffer = n.buffer;
      }
    },
    _activateAction: function _activateAction(a) {
      if (!this._isActiveAction(a)) {
        if (null === a._cacheIndex) {
          var b = (a._localRoot || this._root).uuid,
              c = a._clip.uuid,
              d = this._actionsByClip[c];

          this._bindAction(a, d && d.knownActions[0]);

          this._addInactiveAction(a, c, b);
        }

        b = a._propertyBindings;
        c = 0;

        for (d = b.length; c !== d; ++c) {
          var e = b[c];
          0 === e.useCount++ && (this._lendBinding(e), e.saveOriginalState());
        }

        this._lendAction(a);
      }
    },
    _deactivateAction: function _deactivateAction(a) {
      if (this._isActiveAction(a)) {
        for (var b = a._propertyBindings, c = 0, d = b.length; c !== d; ++c) {
          var e = b[c];
          0 === --e.useCount && (e.restoreOriginalState(), this._takeBackBinding(e));
        }

        this._takeBackAction(a);
      }
    },
    _initMemoryManager: function _initMemoryManager() {
      this._actions = [];
      this._nActiveActions = 0;
      this._actionsByClip = {};
      this._bindings = [];
      this._nActiveBindings = 0;
      this._bindingsByRootAndName = {};
      this._controlInterpolants = [];
      this._nActiveControlInterpolants = 0;
      var a = this;
      this.stats = {
        actions: {
          get total() {
            return a._actions.length;
          },

          get inUse() {
            return a._nActiveActions;
          }

        },
        bindings: {
          get total() {
            return a._bindings.length;
          },

          get inUse() {
            return a._nActiveBindings;
          }

        },
        controlInterpolants: {
          get total() {
            return a._controlInterpolants.length;
          },

          get inUse() {
            return a._nActiveControlInterpolants;
          }

        }
      };
    },
    _isActiveAction: function _isActiveAction(a) {
      a = a._cacheIndex;
      return null !== a && a < this._nActiveActions;
    },
    _addInactiveAction: function _addInactiveAction(a, b, c) {
      var d = this._actions,
          e = this._actionsByClip,
          f = e[b];
      void 0 === f ? (f = {
        knownActions: [a],
        actionByRoot: {}
      }, a._byClipCacheIndex = 0, e[b] = f) : (b = f.knownActions, a._byClipCacheIndex = b.length, b.push(a));
      a._cacheIndex = d.length;
      d.push(a);
      f.actionByRoot[c] = a;
    },
    _removeInactiveAction: function _removeInactiveAction(a) {
      var b = this._actions,
          c = b[b.length - 1],
          d = a._cacheIndex;
      c._cacheIndex = d;
      b[d] = c;
      b.pop();
      a._cacheIndex = null;
      b = a._clip.uuid;
      c = this._actionsByClip;
      d = c[b];
      var e = d.knownActions,
          f = e[e.length - 1],
          g = a._byClipCacheIndex;
      f._byClipCacheIndex = g;
      e[g] = f;
      e.pop();
      a._byClipCacheIndex = null;
      delete d.actionByRoot[(a._localRoot || this._root).uuid];
      0 === e.length && delete c[b];

      this._removeInactiveBindingsForAction(a);
    },
    _removeInactiveBindingsForAction: function _removeInactiveBindingsForAction(a) {
      a = a._propertyBindings;

      for (var b = 0, c = a.length; b !== c; ++b) {
        var d = a[b];
        0 === --d.referenceCount && this._removeInactiveBinding(d);
      }
    },
    _lendAction: function _lendAction(a) {
      var b = this._actions,
          c = a._cacheIndex,
          d = this._nActiveActions++,
          e = b[d];
      a._cacheIndex = d;
      b[d] = a;
      e._cacheIndex = c;
      b[c] = e;
    },
    _takeBackAction: function _takeBackAction(a) {
      var b = this._actions,
          c = a._cacheIndex,
          d = --this._nActiveActions,
          e = b[d];
      a._cacheIndex = d;
      b[d] = a;
      e._cacheIndex = c;
      b[c] = e;
    },
    _addInactiveBinding: function _addInactiveBinding(a, b, c) {
      var d = this._bindingsByRootAndName,
          e = d[b],
          f = this._bindings;
      void 0 === e && (e = {}, d[b] = e);
      e[c] = a;
      a._cacheIndex = f.length;
      f.push(a);
    },
    _removeInactiveBinding: function _removeInactiveBinding(a) {
      var b = this._bindings,
          c = a.binding,
          d = c.rootNode.uuid;
      c = c.path;
      var e = this._bindingsByRootAndName,
          f = e[d],
          g = b[b.length - 1];
      a = a._cacheIndex;
      g._cacheIndex = a;
      b[a] = g;
      b.pop();
      delete f[c];

      a: {
        for (var h in f) {
          break a;
        }

        delete e[d];
      }
    },
    _lendBinding: function _lendBinding(a) {
      var b = this._bindings,
          c = a._cacheIndex,
          d = this._nActiveBindings++,
          e = b[d];
      a._cacheIndex = d;
      b[d] = a;
      e._cacheIndex = c;
      b[c] = e;
    },
    _takeBackBinding: function _takeBackBinding(a) {
      var b = this._bindings,
          c = a._cacheIndex,
          d = --this._nActiveBindings,
          e = b[d];
      a._cacheIndex = d;
      b[d] = a;
      e._cacheIndex = c;
      b[c] = e;
    },
    _lendControlInterpolant: function _lendControlInterpolant() {
      var a = this._controlInterpolants,
          b = this._nActiveControlInterpolants++,
          c = a[b];
      void 0 === c && (c = new bd(new Float32Array(2), new Float32Array(2), 1, this._controlInterpolantsResultBuffer), c.__cacheIndex = b, a[b] = c);
      return c;
    },
    _takeBackControlInterpolant: function _takeBackControlInterpolant(a) {
      var b = this._controlInterpolants,
          c = a.__cacheIndex,
          d = --this._nActiveControlInterpolants,
          e = b[d];
      a.__cacheIndex = d;
      b[d] = a;
      e.__cacheIndex = c;
      b[c] = e;
    },
    _controlInterpolantsResultBuffer: new Float32Array(1),
    clipAction: function clipAction(a, b) {
      var c = b || this._root,
          d = c.uuid;
      c = "string" === typeof a ? Ba.findByName(c, a) : a;
      a = null !== c ? c.uuid : a;
      var e = this._actionsByClip[a],
          f = null;

      if (void 0 !== e) {
        f = e.actionByRoot[d];
        if (void 0 !== f) return f;
        f = e.knownActions[0];
        null === c && (c = f._clip);
      }

      if (null === c) return null;
      b = new lf(this, c, b);

      this._bindAction(b, f);

      this._addInactiveAction(b, a, d);

      return b;
    },
    existingAction: function existingAction(a, b) {
      var c = b || this._root;
      b = c.uuid;
      c = "string" === typeof a ? Ba.findByName(c, a) : a;
      a = this._actionsByClip[c ? c.uuid : a];
      return void 0 !== a ? a.actionByRoot[b] || null : null;
    },
    stopAllAction: function stopAllAction() {
      for (var a = this._actions, b = this._nActiveActions, c = this._bindings, d = this._nActiveBindings, e = this._nActiveBindings = this._nActiveActions = 0; e !== b; ++e) {
        a[e].reset();
      }

      for (e = 0; e !== d; ++e) {
        c[e].useCount = 0;
      }

      return this;
    },
    update: function update(a) {
      a *= this.timeScale;

      for (var b = this._actions, c = this._nActiveActions, d = this.time += a, e = Math.sign(a), f = this._accuIndex ^= 1, g = 0; g !== c; ++g) {
        b[g]._update(d, a, e, f);
      }

      a = this._bindings;
      b = this._nActiveBindings;

      for (g = 0; g !== b; ++g) {
        a[g].apply(f);
      }

      return this;
    },
    getRoot: function getRoot() {
      return this._root;
    },
    uncacheClip: function uncacheClip(a) {
      var b = this._actions;
      a = a.uuid;
      var c = this._actionsByClip,
          d = c[a];

      if (void 0 !== d) {
        d = d.knownActions;

        for (var e = 0, f = d.length; e !== f; ++e) {
          var g = d[e];

          this._deactivateAction(g);

          var h = g._cacheIndex,
              k = b[b.length - 1];
          g._cacheIndex = null;
          g._byClipCacheIndex = null;
          k._cacheIndex = h;
          b[h] = k;
          b.pop();

          this._removeInactiveBindingsForAction(g);
        }

        delete c[a];
      }
    },
    uncacheRoot: function uncacheRoot(a) {
      a = a.uuid;
      var b = this._actionsByClip;

      for (d in b) {
        var c = b[d].actionByRoot[a];
        void 0 !== c && (this._deactivateAction(c), this._removeInactiveAction(c));
      }

      var d = this._bindingsByRootAndName[a];
      if (void 0 !== d) for (var e in d) {
        a = d[e], a.restoreOriginalState(), this._removeInactiveBinding(a);
      }
    },
    uncacheAction: function uncacheAction(a, b) {
      a = this.existingAction(a, b);
      null !== a && (this._deactivateAction(a), this._removeInactiveAction(a));
    }
  });

  Nd.prototype.clone = function () {
    return new Nd(void 0 === this.value.clone ? this.value : this.value.clone());
  };

  qe.prototype = (0, _assign.default)((0, _create.default)(F.prototype), {
    constructor: qe,
    isInstancedBufferGeometry: !0,
    copy: function copy(a) {
      F.prototype.copy.call(this, a);
      this.maxInstancedCount = a.maxInstancedCount;
      return this;
    },
    clone: function clone() {
      return new this.constructor().copy(this);
    }
  });
  (0, _defineProperties.default)(re.prototype, {
    count: {
      get: function get() {
        return this.data.count;
      }
    },
    array: {
      get: function get() {
        return this.data.array;
      }
    }
  });
  (0, _assign.default)(re.prototype, {
    isInterleavedBufferAttribute: !0,
    setX: function setX(a, b) {
      this.data.array[a * this.data.stride + this.offset] = b;
      return this;
    },
    setY: function setY(a, b) {
      this.data.array[a * this.data.stride + this.offset + 1] = b;
      return this;
    },
    setZ: function setZ(a, b) {
      this.data.array[a * this.data.stride + this.offset + 2] = b;
      return this;
    },
    setW: function setW(a, b) {
      this.data.array[a * this.data.stride + this.offset + 3] = b;
      return this;
    },
    getX: function getX(a) {
      return this.data.array[a * this.data.stride + this.offset];
    },
    getY: function getY(a) {
      return this.data.array[a * this.data.stride + this.offset + 1];
    },
    getZ: function getZ(a) {
      return this.data.array[a * this.data.stride + this.offset + 2];
    },
    getW: function getW(a) {
      return this.data.array[a * this.data.stride + this.offset + 3];
    },
    setXY: function setXY(a, b, c) {
      a = a * this.data.stride + this.offset;
      this.data.array[a + 0] = b;
      this.data.array[a + 1] = c;
      return this;
    },
    setXYZ: function setXYZ(a, b, c, d) {
      a = a * this.data.stride + this.offset;
      this.data.array[a + 0] = b;
      this.data.array[a + 1] = c;
      this.data.array[a + 2] = d;
      return this;
    },
    setXYZW: function setXYZW(a, b, c, d, e) {
      a = a * this.data.stride + this.offset;
      this.data.array[a + 0] = b;
      this.data.array[a + 1] = c;
      this.data.array[a + 2] = d;
      this.data.array[a + 3] = e;
      return this;
    }
  });
  (0, _defineProperty.default)(kc.prototype, "needsUpdate", {
    set: function set(a) {
      !0 === a && this.version++;
    }
  });
  (0, _assign.default)(kc.prototype, {
    isInterleavedBuffer: !0,
    onUploadCallback: function onUploadCallback() {},
    setArray: function setArray(a) {
      if ((0, _isArray.default)(a)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
      this.count = void 0 !== a ? a.length / this.stride : 0;
      this.array = a;
    },
    setDynamic: function setDynamic(a) {
      this.dynamic = a;
      return this;
    },
    copy: function copy(a) {
      this.array = new a.array.constructor(a.array);
      this.count = a.count;
      this.stride = a.stride;
      this.dynamic = a.dynamic;
      return this;
    },
    copyAt: function copyAt(a, b, c) {
      a *= this.stride;
      c *= b.stride;

      for (var d = 0, e = this.stride; d < e; d++) {
        this.array[a + d] = b.array[c + d];
      }

      return this;
    },
    set: function set(a, b) {
      void 0 === b && (b = 0);
      this.array.set(a, b);
      return this;
    },
    clone: function clone() {
      return new this.constructor().copy(this);
    },
    onUpload: function onUpload(a) {
      this.onUploadCallback = a;
      return this;
    }
  });
  se.prototype = (0, _assign.default)((0, _create.default)(kc.prototype), {
    constructor: se,
    isInstancedInterleavedBuffer: !0,
    copy: function copy(a) {
      kc.prototype.copy.call(this, a);
      this.meshPerAttribute = a.meshPerAttribute;
      return this;
    }
  });
  te.prototype = (0, _assign.default)((0, _create.default)(T.prototype), {
    constructor: te,
    isInstancedBufferAttribute: !0,
    copy: function copy(a) {
      T.prototype.copy.call(this, a);
      this.meshPerAttribute = a.meshPerAttribute;
      return this;
    }
  });
  (0, _assign.default)(mf.prototype, {
    linePrecision: 1,
    set: function set(a, b) {
      this.ray.set(a, b);
    },
    setFromCamera: function setFromCamera(a, b) {
      b && b.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(b.matrixWorld), this.ray.direction.set(a.x, a.y, .5).unproject(b).sub(this.ray.origin).normalize()) : b && b.isOrthographicCamera ? (this.ray.origin.set(a.x, a.y, (b.near + b.far) / (b.near - b.far)).unproject(b), this.ray.direction.set(0, 0, -1).transformDirection(b.matrixWorld)) : console.error("THREE.Raycaster: Unsupported camera type.");
    },
    intersectObject: function intersectObject(a, b, c) {
      c = c || [];
      ue(a, this, c, b);
      c.sort(nf);
      return c;
    },
    intersectObjects: function intersectObjects(a, b, c) {
      c = c || [];
      if (!1 === (0, _isArray.default)(a)) return console.warn("THREE.Raycaster.intersectObjects: objects is not an Array."), c;

      for (var d = 0, e = a.length; d < e; d++) {
        ue(a[d], this, c, b);
      }

      c.sort(nf);
      return c;
    }
  });
  (0, _assign.default)(of.prototype, {
    start: function start() {
      this.oldTime = this.startTime = ("undefined" === typeof performance ? Date : performance).now();
      this.elapsedTime = 0;
      this.running = !0;
    },
    stop: function stop() {
      this.getElapsedTime();
      this.autoStart = this.running = !1;
    },
    getElapsedTime: function getElapsedTime() {
      this.getDelta();
      return this.elapsedTime;
    },
    getDelta: function getDelta() {
      var a = 0;
      if (this.autoStart && !this.running) return this.start(), 0;

      if (this.running) {
        var b = ("undefined" === typeof performance ? Date : performance).now();
        a = (b - this.oldTime) / 1E3;
        this.oldTime = b;
        this.elapsedTime += a;
      }

      return a;
    }
  });
  (0, _assign.default)(pf.prototype, {
    set: function set(a, b, c) {
      this.radius = a;
      this.phi = b;
      this.theta = c;
      return this;
    },
    clone: function clone() {
      return new this.constructor().copy(this);
    },
    copy: function copy(a) {
      this.radius = a.radius;
      this.phi = a.phi;
      this.theta = a.theta;
      return this;
    },
    makeSafe: function makeSafe() {
      this.phi = Math.max(1E-6, Math.min(Math.PI - 1E-6, this.phi));
      return this;
    },
    setFromVector3: function setFromVector3(a) {
      this.radius = a.length();
      0 === this.radius ? this.phi = this.theta = 0 : (this.theta = Math.atan2(a.x, a.z), this.phi = Math.acos(S.clamp(a.y / this.radius, -1, 1)));
      return this;
    }
  });
  (0, _assign.default)(qf.prototype, {
    set: function set(a, b, c) {
      this.radius = a;
      this.theta = b;
      this.y = c;
      return this;
    },
    clone: function clone() {
      return new this.constructor().copy(this);
    },
    copy: function copy(a) {
      this.radius = a.radius;
      this.theta = a.theta;
      this.y = a.y;
      return this;
    },
    setFromVector3: function setFromVector3(a) {
      this.radius = Math.sqrt(a.x * a.x + a.z * a.z);
      this.theta = Math.atan2(a.x, a.z);
      this.y = a.y;
      return this;
    }
  });
  (0, _assign.default)(ve.prototype, {
    set: function set(a, b) {
      this.min.copy(a);
      this.max.copy(b);
      return this;
    },
    setFromPoints: function setFromPoints(a) {
      this.makeEmpty();

      for (var b = 0, c = a.length; b < c; b++) {
        this.expandByPoint(a[b]);
      }

      return this;
    },
    setFromCenterAndSize: function () {
      var a = new C();
      return function (b, c) {
        c = a.copy(c).multiplyScalar(.5);
        this.min.copy(b).sub(c);
        this.max.copy(b).add(c);
        return this;
      };
    }(),
    clone: function clone() {
      return new this.constructor().copy(this);
    },
    copy: function copy(a) {
      this.min.copy(a.min);
      this.max.copy(a.max);
      return this;
    },
    makeEmpty: function makeEmpty() {
      this.min.x = this.min.y = Infinity;
      this.max.x = this.max.y = -Infinity;
      return this;
    },
    isEmpty: function isEmpty() {
      return this.max.x < this.min.x || this.max.y < this.min.y;
    },
    getCenter: function getCenter(a) {
      void 0 === a && (console.warn("THREE.Box2: .getCenter() target is now required"), a = new C());
      return this.isEmpty() ? a.set(0, 0) : a.addVectors(this.min, this.max).multiplyScalar(.5);
    },
    getSize: function getSize(a) {
      void 0 === a && (console.warn("THREE.Box2: .getSize() target is now required"), a = new C());
      return this.isEmpty() ? a.set(0, 0) : a.subVectors(this.max, this.min);
    },
    expandByPoint: function expandByPoint(a) {
      this.min.min(a);
      this.max.max(a);
      return this;
    },
    expandByVector: function expandByVector(a) {
      this.min.sub(a);
      this.max.add(a);
      return this;
    },
    expandByScalar: function expandByScalar(a) {
      this.min.addScalar(-a);
      this.max.addScalar(a);
      return this;
    },
    containsPoint: function containsPoint(a) {
      return a.x < this.min.x || a.x > this.max.x || a.y < this.min.y || a.y > this.max.y ? !1 : !0;
    },
    containsBox: function containsBox(a) {
      return this.min.x <= a.min.x && a.max.x <= this.max.x && this.min.y <= a.min.y && a.max.y <= this.max.y;
    },
    getParameter: function getParameter(a, b) {
      void 0 === b && (console.warn("THREE.Box2: .getParameter() target is now required"), b = new C());
      return b.set((a.x - this.min.x) / (this.max.x - this.min.x), (a.y - this.min.y) / (this.max.y - this.min.y));
    },
    intersectsBox: function intersectsBox(a) {
      return a.max.x < this.min.x || a.min.x > this.max.x || a.max.y < this.min.y || a.min.y > this.max.y ? !1 : !0;
    },
    clampPoint: function clampPoint(a, b) {
      void 0 === b && (console.warn("THREE.Box2: .clampPoint() target is now required"), b = new C());
      return b.copy(a).clamp(this.min, this.max);
    },
    distanceToPoint: function () {
      var a = new C();
      return function (b) {
        return a.copy(b).clamp(this.min, this.max).sub(b).length();
      };
    }(),
    intersect: function intersect(a) {
      this.min.max(a.min);
      this.max.min(a.max);
      return this;
    },
    union: function union(a) {
      this.min.min(a.min);
      this.max.max(a.max);
      return this;
    },
    translate: function translate(a) {
      this.min.add(a);
      this.max.add(a);
      return this;
    },
    equals: function equals(a) {
      return a.min.equals(this.min) && a.max.equals(this.max);
    }
  });
  dd.prototype = (0, _create.default)(A.prototype);
  dd.prototype.constructor = dd;
  dd.prototype.isImmediateRenderObject = !0;
  ed.prototype = (0, _create.default)(aa.prototype);
  ed.prototype.constructor = ed;

  ed.prototype.update = function () {
    var a = new p(),
        b = new p(),
        c = new sa();
    return function () {
      var d = ["a", "b", "c"];
      this.object.updateMatrixWorld(!0);
      c.getNormalMatrix(this.object.matrixWorld);
      var e = this.object.matrixWorld,
          f = this.geometry.attributes.position,
          g = this.object.geometry;
      if (g && g.isGeometry) for (var h = g.vertices, k = g.faces, m = g = 0, p = k.length; m < p; m++) {
        for (var n = k[m], t = 0, r = n.vertexNormals.length; t < r; t++) {
          var q = n.vertexNormals[t];
          a.copy(h[n[d[t]]]).applyMatrix4(e);
          b.copy(q).applyMatrix3(c).normalize().multiplyScalar(this.size).add(a);
          f.setXYZ(g, a.x, a.y, a.z);
          g += 1;
          f.setXYZ(g, b.x, b.y, b.z);
          g += 1;
        }
      } else if (g && g.isBufferGeometry) for (d = g.attributes.position, h = g.attributes.normal, t = g = 0, r = d.count; t < r; t++) {
        a.set(d.getX(t), d.getY(t), d.getZ(t)).applyMatrix4(e), b.set(h.getX(t), h.getY(t), h.getZ(t)), b.applyMatrix3(c).normalize().multiplyScalar(this.size).add(a), f.setXYZ(g, a.x, a.y, a.z), g += 1, f.setXYZ(g, b.x, b.y, b.z), g += 1;
      }
      f.needsUpdate = !0;
    };
  }();

  lc.prototype = (0, _create.default)(A.prototype);
  lc.prototype.constructor = lc;

  lc.prototype.dispose = function () {
    this.cone.geometry.dispose();
    this.cone.material.dispose();
  };

  lc.prototype.update = function () {
    var a = new p(),
        b = new p();
    return function () {
      this.light.updateMatrixWorld();
      var c = this.light.distance ? this.light.distance : 1E3,
          d = c * Math.tan(this.light.angle);
      this.cone.scale.set(d, d, c);
      a.setFromMatrixPosition(this.light.matrixWorld);
      b.setFromMatrixPosition(this.light.target.matrixWorld);
      this.cone.lookAt(b.sub(a));
      void 0 !== this.color ? this.cone.material.color.set(this.color) : this.cone.material.color.copy(this.light.color);
    };
  }();

  mc.prototype = (0, _create.default)(aa.prototype);
  mc.prototype.constructor = mc;

  mc.prototype.updateMatrixWorld = function () {
    var a = new p(),
        b = new M(),
        c = new M();
    return function (d) {
      var e = this.bones,
          f = this.geometry,
          g = f.getAttribute("position");
      c.getInverse(this.root.matrixWorld);

      for (var h = 0, k = 0; h < e.length; h++) {
        var m = e[h];
        m.parent && m.parent.isBone && (b.multiplyMatrices(c, m.matrixWorld), a.setFromMatrixPosition(b), g.setXYZ(k, a.x, a.y, a.z), b.multiplyMatrices(c, m.parent.matrixWorld), a.setFromMatrixPosition(b), g.setXYZ(k + 1, a.x, a.y, a.z), k += 2);
      }

      f.getAttribute("position").needsUpdate = !0;
      A.prototype.updateMatrixWorld.call(this, d);
    };
  }();

  nc.prototype = (0, _create.default)(oa.prototype);
  nc.prototype.constructor = nc;

  nc.prototype.dispose = function () {
    this.geometry.dispose();
    this.material.dispose();
  };

  nc.prototype.update = function () {
    void 0 !== this.color ? this.material.color.set(this.color) : this.material.color.copy(this.light.color);
  };

  oc.prototype = (0, _create.default)(A.prototype);
  oc.prototype.constructor = oc;

  oc.prototype.dispose = function () {
    this.children[0].geometry.dispose();
    this.children[0].material.dispose();
  };

  oc.prototype.update = function () {
    var a = .5 * this.light.width,
        b = .5 * this.light.height,
        c = this.line.geometry.attributes.position,
        d = c.array;
    d[0] = a;
    d[1] = -b;
    d[2] = 0;
    d[3] = a;
    d[4] = b;
    d[5] = 0;
    d[6] = -a;
    d[7] = b;
    d[8] = 0;
    d[9] = -a;
    d[10] = -b;
    d[11] = 0;
    d[12] = a;
    d[13] = -b;
    d[14] = 0;
    c.needsUpdate = !0;
    void 0 !== this.color ? this.line.material.color.set(this.color) : this.line.material.color.copy(this.light.color);
  };

  pc.prototype = (0, _create.default)(A.prototype);
  pc.prototype.constructor = pc;

  pc.prototype.dispose = function () {
    this.children[0].geometry.dispose();
    this.children[0].material.dispose();
  };

  pc.prototype.update = function () {
    var a = new p(),
        b = new I(),
        c = new I();
    return function () {
      var d = this.children[0];
      if (void 0 !== this.color) this.material.color.set(this.color);else {
        var e = d.geometry.getAttribute("color");
        b.copy(this.light.color);
        c.copy(this.light.groundColor);

        for (var f = 0, g = e.count; f < g; f++) {
          var h = f < g / 2 ? b : c;
          e.setXYZ(f, h.r, h.g, h.b);
        }

        e.needsUpdate = !0;
      }
      d.lookAt(a.setFromMatrixPosition(this.light.matrixWorld).negate());
    };
  }();

  fd.prototype = (0, _create.default)(aa.prototype);
  fd.prototype.constructor = fd;
  Od.prototype = (0, _create.default)(aa.prototype);
  Od.prototype.constructor = Od;
  gd.prototype = (0, _create.default)(aa.prototype);
  gd.prototype.constructor = gd;

  gd.prototype.update = function () {
    var a = new p(),
        b = new p(),
        c = new sa();
    return function () {
      this.object.updateMatrixWorld(!0);
      c.getNormalMatrix(this.object.matrixWorld);
      var d = this.object.matrixWorld,
          e = this.geometry.attributes.position,
          f = this.object.geometry,
          g = f.vertices;
      f = f.faces;

      for (var h = 0, k = 0, m = f.length; k < m; k++) {
        var p = f[k],
            n = p.normal;
        a.copy(g[p.a]).add(g[p.b]).add(g[p.c]).divideScalar(3).applyMatrix4(d);
        b.copy(n).applyMatrix3(c).normalize().multiplyScalar(this.size).add(a);
        e.setXYZ(h, a.x, a.y, a.z);
        h += 1;
        e.setXYZ(h, b.x, b.y, b.z);
        h += 1;
      }

      e.needsUpdate = !0;
    };
  }();

  qc.prototype = (0, _create.default)(A.prototype);
  qc.prototype.constructor = qc;

  qc.prototype.dispose = function () {
    this.lightPlane.geometry.dispose();
    this.lightPlane.material.dispose();
    this.targetLine.geometry.dispose();
    this.targetLine.material.dispose();
  };

  qc.prototype.update = function () {
    var a = new p(),
        b = new p(),
        c = new p();
    return function () {
      a.setFromMatrixPosition(this.light.matrixWorld);
      b.setFromMatrixPosition(this.light.target.matrixWorld);
      c.subVectors(b, a);
      this.lightPlane.lookAt(c);
      void 0 !== this.color ? (this.lightPlane.material.color.set(this.color), this.targetLine.material.color.set(this.color)) : (this.lightPlane.material.color.copy(this.light.color), this.targetLine.material.color.copy(this.light.color));
      this.targetLine.lookAt(c);
      this.targetLine.scale.z = c.length();
    };
  }();

  hd.prototype = (0, _create.default)(aa.prototype);
  hd.prototype.constructor = hd;

  hd.prototype.update = function () {
    function a(a, g, h, k) {
      d.set(g, h, k).unproject(e);
      a = c[a];
      if (void 0 !== a) for (g = b.getAttribute("position"), h = 0, k = a.length; h < k; h++) {
        g.setXYZ(a[h], d.x, d.y, d.z);
      }
    }

    var b,
        c,
        d = new p(),
        e = new Qa();
    return function () {
      b = this.geometry;
      c = this.pointMap;
      e.projectionMatrix.copy(this.camera.projectionMatrix);
      a("c", 0, 0, -1);
      a("t", 0, 0, 1);
      a("n1", -1, -1, -1);
      a("n2", 1, -1, -1);
      a("n3", -1, 1, -1);
      a("n4", 1, 1, -1);
      a("f1", -1, -1, 1);
      a("f2", 1, -1, 1);
      a("f3", -1, 1, 1);
      a("f4", 1, 1, 1);
      a("u1", .7, 1.1, -1);
      a("u2", -.7, 1.1, -1);
      a("u3", 0, 2, -1);
      a("cf1", -1, 0, 1);
      a("cf2", 1, 0, 1);
      a("cf3", 0, -1, 1);
      a("cf4", 0, 1, 1);
      a("cn1", -1, 0, -1);
      a("cn2", 1, 0, -1);
      a("cn3", 0, -1, -1);
      a("cn4", 0, 1, -1);
      b.getAttribute("position").needsUpdate = !0;
    };
  }();

  Fb.prototype = (0, _create.default)(aa.prototype);
  Fb.prototype.constructor = Fb;

  Fb.prototype.update = function () {
    var a = new Va();
    return function (b) {
      void 0 !== b && console.warn("THREE.BoxHelper: .update() has no longer arguments.");
      void 0 !== this.object && a.setFromObject(this.object);

      if (!a.isEmpty()) {
        b = a.min;
        var c = a.max,
            d = this.geometry.attributes.position,
            e = d.array;
        e[0] = c.x;
        e[1] = c.y;
        e[2] = c.z;
        e[3] = b.x;
        e[4] = c.y;
        e[5] = c.z;
        e[6] = b.x;
        e[7] = b.y;
        e[8] = c.z;
        e[9] = c.x;
        e[10] = b.y;
        e[11] = c.z;
        e[12] = c.x;
        e[13] = c.y;
        e[14] = b.z;
        e[15] = b.x;
        e[16] = c.y;
        e[17] = b.z;
        e[18] = b.x;
        e[19] = b.y;
        e[20] = b.z;
        e[21] = c.x;
        e[22] = b.y;
        e[23] = b.z;
        d.needsUpdate = !0;
        this.geometry.computeBoundingSphere();
      }
    };
  }();

  Fb.prototype.setFromObject = function (a) {
    this.object = a;
    this.update();
    return this;
  };

  id.prototype = (0, _create.default)(aa.prototype);
  id.prototype.constructor = id;

  id.prototype.updateMatrixWorld = function (a) {
    var b = this.box;
    b.isEmpty() || (b.getCenter(this.position), b.getSize(this.scale), this.scale.multiplyScalar(.5), A.prototype.updateMatrixWorld.call(this, a));
  };

  jd.prototype = (0, _create.default)(ua.prototype);
  jd.prototype.constructor = jd;

  jd.prototype.updateMatrixWorld = function (a) {
    var b = -this.plane.constant;
    1E-8 > Math.abs(b) && (b = 1E-8);
    this.scale.set(.5 * this.size, .5 * this.size, b);
    this.lookAt(this.plane.normal);
    A.prototype.updateMatrixWorld.call(this, a);
  };

  var Pd, we;
  Gb.prototype = (0, _create.default)(A.prototype);
  Gb.prototype.constructor = Gb;

  Gb.prototype.setDirection = function () {
    var a = new p(),
        b;
    return function (c) {
      .99999 < c.y ? this.quaternion.set(0, 0, 0, 1) : -.99999 > c.y ? this.quaternion.set(1, 0, 0, 0) : (a.set(c.z, 0, -c.x).normalize(), b = Math.acos(c.y), this.quaternion.setFromAxisAngle(a, b));
    };
  }();

  Gb.prototype.setLength = function (a, b, c) {
    void 0 === b && (b = .2 * a);
    void 0 === c && (c = .2 * b);
    this.line.scale.set(1, Math.max(0, a - b), 1);
    this.line.updateMatrix();
    this.cone.scale.set(c, b, c);
    this.cone.position.y = a;
    this.cone.updateMatrix();
  };

  Gb.prototype.setColor = function (a) {
    this.line.material.color.copy(a);
    this.cone.material.color.copy(a);
  };

  kd.prototype = (0, _create.default)(aa.prototype);
  kd.prototype.constructor = kd;

  E.create = function (a, b) {
    console.log("THREE.Curve.create() has been deprecated");
    a.prototype = (0, _create.default)(E.prototype);
    a.prototype.constructor = a;
    a.prototype.getPoint = b;
    return a;
  };

  (0, _assign.default)(Za.prototype, {
    createPointsGeometry: function createPointsGeometry(a) {
      console.warn("THREE.CurvePath: .createPointsGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead.");
      a = this.getPoints(a);
      return this.createGeometry(a);
    },
    createSpacedPointsGeometry: function createSpacedPointsGeometry(a) {
      console.warn("THREE.CurvePath: .createSpacedPointsGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead.");
      a = this.getSpacedPoints(a);
      return this.createGeometry(a);
    },
    createGeometry: function createGeometry(a) {
      console.warn("THREE.CurvePath: .createGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead.");

      for (var b = new N(), c = 0, d = a.length; c < d; c++) {
        var e = a[c];
        b.vertices.push(new p(e.x, e.y, e.z || 0));
      }

      return b;
    }
  });
  (0, _assign.default)(Pa.prototype, {
    fromPoints: function fromPoints(a) {
      console.warn("THREE.Path: .fromPoints() has been renamed to .setFromPoints().");
      this.setFromPoints(a);
    }
  });
  sf.prototype = (0, _create.default)(X.prototype);
  tf.prototype = (0, _create.default)(X.prototype);
  xe.prototype = (0, _create.default)(X.prototype);
  (0, _assign.default)(xe.prototype, {
    initFromArray: function initFromArray() {
      console.error("THREE.Spline: .initFromArray() has been removed.");
    },
    getControlPointsArray: function getControlPointsArray() {
      console.error("THREE.Spline: .getControlPointsArray() has been removed.");
    },
    reparametrizeByArcLength: function reparametrizeByArcLength() {
      console.error("THREE.Spline: .reparametrizeByArcLength() has been removed.");
    }
  });

  fd.prototype.setColors = function () {
    console.error("THREE.GridHelper: setColors() has been deprecated, pass them in the constructor instead.");
  };

  mc.prototype.update = function () {
    console.error("THREE.SkeletonHelper: update() no longer needs to be called.");
  };

  (0, _assign.default)(ic.prototype, {
    extractUrlBase: function extractUrlBase(a) {
      console.warn("THREE.Loader: .extractUrlBase() has been deprecated. Use THREE.LoaderUtils.extractUrlBase() instead.");
      return Be.extractUrlBase(a);
    }
  });
  (0, _assign.default)(ve.prototype, {
    center: function center(a) {
      console.warn("THREE.Box2: .center() has been renamed to .getCenter().");
      return this.getCenter(a);
    },
    empty: function empty() {
      console.warn("THREE.Box2: .empty() has been renamed to .isEmpty().");
      return this.isEmpty();
    },
    isIntersectionBox: function isIntersectionBox(a) {
      console.warn("THREE.Box2: .isIntersectionBox() has been renamed to .intersectsBox().");
      return this.intersectsBox(a);
    },
    size: function size(a) {
      console.warn("THREE.Box2: .size() has been renamed to .getSize().");
      return this.getSize(a);
    }
  });
  (0, _assign.default)(Va.prototype, {
    center: function center(a) {
      console.warn("THREE.Box3: .center() has been renamed to .getCenter().");
      return this.getCenter(a);
    },
    empty: function empty() {
      console.warn("THREE.Box3: .empty() has been renamed to .isEmpty().");
      return this.isEmpty();
    },
    isIntersectionBox: function isIntersectionBox(a) {
      console.warn("THREE.Box3: .isIntersectionBox() has been renamed to .intersectsBox().");
      return this.intersectsBox(a);
    },
    isIntersectionSphere: function isIntersectionSphere(a) {
      console.warn("THREE.Box3: .isIntersectionSphere() has been renamed to .intersectsSphere().");
      return this.intersectsSphere(a);
    },
    size: function size(a) {
      console.warn("THREE.Box3: .size() has been renamed to .getSize().");
      return this.getSize(a);
    }
  });

  Lb.prototype.center = function (a) {
    console.warn("THREE.Line3: .center() has been renamed to .getCenter().");
    return this.getCenter(a);
  };

  (0, _assign.default)(S, {
    random16: function random16() {
      console.warn("THREE.Math: .random16() has been deprecated. Use Math.random() instead.");
      return Math.random();
    },
    nearestPowerOfTwo: function nearestPowerOfTwo(a) {
      console.warn("THREE.Math: .nearestPowerOfTwo() has been renamed to .floorPowerOfTwo().");
      return S.floorPowerOfTwo(a);
    },
    nextPowerOfTwo: function nextPowerOfTwo(a) {
      console.warn("THREE.Math: .nextPowerOfTwo() has been renamed to .ceilPowerOfTwo().");
      return S.ceilPowerOfTwo(a);
    }
  });
  (0, _assign.default)(sa.prototype, {
    flattenToArrayOffset: function flattenToArrayOffset(a, b) {
      console.warn("THREE.Matrix3: .flattenToArrayOffset() has been deprecated. Use .toArray() instead.");
      return this.toArray(a, b);
    },
    multiplyVector3: function multiplyVector3(a) {
      console.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead.");
      return a.applyMatrix3(this);
    },
    multiplyVector3Array: function multiplyVector3Array() {
      console.error("THREE.Matrix3: .multiplyVector3Array() has been removed.");
    },
    applyToBuffer: function applyToBuffer(a) {
      console.warn("THREE.Matrix3: .applyToBuffer() has been removed. Use matrix.applyToBufferAttribute( attribute ) instead.");
      return this.applyToBufferAttribute(a);
    },
    applyToVector3Array: function applyToVector3Array() {
      console.error("THREE.Matrix3: .applyToVector3Array() has been removed.");
    }
  });
  (0, _assign.default)(M.prototype, {
    extractPosition: function extractPosition(a) {
      console.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition().");
      return this.copyPosition(a);
    },
    flattenToArrayOffset: function flattenToArrayOffset(a, b) {
      console.warn("THREE.Matrix4: .flattenToArrayOffset() has been deprecated. Use .toArray() instead.");
      return this.toArray(a, b);
    },
    getPosition: function () {
      var a;
      return function () {
        void 0 === a && (a = new p());
        console.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead.");
        return a.setFromMatrixColumn(this, 3);
      };
    }(),
    setRotationFromQuaternion: function setRotationFromQuaternion(a) {
      console.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion().");
      return this.makeRotationFromQuaternion(a);
    },
    multiplyToArray: function multiplyToArray() {
      console.warn("THREE.Matrix4: .multiplyToArray() has been removed.");
    },
    multiplyVector3: function multiplyVector3(a) {
      console.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) instead.");
      return a.applyMatrix4(this);
    },
    multiplyVector4: function multiplyVector4(a) {
      console.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead.");
      return a.applyMatrix4(this);
    },
    multiplyVector3Array: function multiplyVector3Array() {
      console.error("THREE.Matrix4: .multiplyVector3Array() has been removed.");
    },
    rotateAxis: function rotateAxis(a) {
      console.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead.");
      a.transformDirection(this);
    },
    crossVector: function crossVector(a) {
      console.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead.");
      return a.applyMatrix4(this);
    },
    translate: function translate() {
      console.error("THREE.Matrix4: .translate() has been removed.");
    },
    rotateX: function rotateX() {
      console.error("THREE.Matrix4: .rotateX() has been removed.");
    },
    rotateY: function rotateY() {
      console.error("THREE.Matrix4: .rotateY() has been removed.");
    },
    rotateZ: function rotateZ() {
      console.error("THREE.Matrix4: .rotateZ() has been removed.");
    },
    rotateByAxis: function rotateByAxis() {
      console.error("THREE.Matrix4: .rotateByAxis() has been removed.");
    },
    applyToBuffer: function applyToBuffer(a) {
      console.warn("THREE.Matrix4: .applyToBuffer() has been removed. Use matrix.applyToBufferAttribute( attribute ) instead.");
      return this.applyToBufferAttribute(a);
    },
    applyToVector3Array: function applyToVector3Array() {
      console.error("THREE.Matrix4: .applyToVector3Array() has been removed.");
    },
    makeFrustum: function makeFrustum(a, b, c, d, e, f) {
      console.warn("THREE.Matrix4: .makeFrustum() has been removed. Use .makePerspective( left, right, top, bottom, near, far ) instead.");
      return this.makePerspective(a, b, d, c, e, f);
    }
  });

  Fa.prototype.isIntersectionLine = function (a) {
    console.warn("THREE.Plane: .isIntersectionLine() has been renamed to .intersectsLine().");
    return this.intersectsLine(a);
  };

  ja.prototype.multiplyVector3 = function (a) {
    console.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead.");
    return a.applyQuaternion(this);
  };

  (0, _assign.default)(qb.prototype, {
    isIntersectionBox: function isIntersectionBox(a) {
      console.warn("THREE.Ray: .isIntersectionBox() has been renamed to .intersectsBox().");
      return this.intersectsBox(a);
    },
    isIntersectionPlane: function isIntersectionPlane(a) {
      console.warn("THREE.Ray: .isIntersectionPlane() has been renamed to .intersectsPlane().");
      return this.intersectsPlane(a);
    },
    isIntersectionSphere: function isIntersectionSphere(a) {
      console.warn("THREE.Ray: .isIntersectionSphere() has been renamed to .intersectsSphere().");
      return this.intersectsSphere(a);
    }
  });
  (0, _assign.default)(Aa.prototype, {
    area: function area() {
      console.warn("THREE.Triangle: .area() has been renamed to .getArea().");
      return this.getArea();
    },
    barycoordFromPoint: function barycoordFromPoint(a, b) {
      console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord().");
      return this.getBarycoord(a, b);
    },
    midpoint: function midpoint(a) {
      console.warn("THREE.Triangle: .midpoint() has been renamed to .getMidpoint().");
      return this.getMidpoint(a);
    },
    normal: function normal(a) {
      console.warn("THREE.Triangle: .normal() has been renamed to .getNormal().");
      return this.getNormal(a);
    },
    plane: function plane(a) {
      console.warn("THREE.Triangle: .plane() has been renamed to .getPlane().");
      return this.getPlane(a);
    }
  });
  (0, _assign.default)(Aa, {
    barycoordFromPoint: function barycoordFromPoint(a, b, c, d, e) {
      console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord().");
      return Aa.getBarycoord(a, b, c, d, e);
    },
    normal: function normal(a, b, c, d) {
      console.warn("THREE.Triangle: .normal() has been renamed to .getNormal().");
      return Aa.getNormal(a, b, c, d);
    }
  });
  (0, _assign.default)(gb.prototype, {
    extractAllPoints: function extractAllPoints(a) {
      console.warn("THREE.Shape: .extractAllPoints() has been removed. Use .extractPoints() instead.");
      return this.extractPoints(a);
    },
    extrude: function extrude(a) {
      console.warn("THREE.Shape: .extrude() has been removed. Use ExtrudeGeometry() instead.");
      return new fb(this, a);
    },
    makeGeometry: function makeGeometry(a) {
      console.warn("THREE.Shape: .makeGeometry() has been removed. Use ShapeGeometry() instead.");
      return new vb(this, a);
    }
  });
  (0, _assign.default)(C.prototype, {
    fromAttribute: function fromAttribute(a, b, c) {
      console.warn("THREE.Vector2: .fromAttribute() has been renamed to .fromBufferAttribute().");
      return this.fromBufferAttribute(a, b, c);
    },
    distanceToManhattan: function distanceToManhattan(a) {
      console.warn("THREE.Vector2: .distanceToManhattan() has been renamed to .manhattanDistanceTo().");
      return this.manhattanDistanceTo(a);
    },
    lengthManhattan: function lengthManhattan() {
      console.warn("THREE.Vector2: .lengthManhattan() has been renamed to .manhattanLength().");
      return this.manhattanLength();
    }
  });
  (0, _assign.default)(p.prototype, {
    setEulerFromRotationMatrix: function setEulerFromRotationMatrix() {
      console.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.");
    },
    setEulerFromQuaternion: function setEulerFromQuaternion() {
      console.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.");
    },
    getPositionFromMatrix: function getPositionFromMatrix(a) {
      console.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition().");
      return this.setFromMatrixPosition(a);
    },
    getScaleFromMatrix: function getScaleFromMatrix(a) {
      console.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale().");
      return this.setFromMatrixScale(a);
    },
    getColumnFromMatrix: function getColumnFromMatrix(a, b) {
      console.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn().");
      return this.setFromMatrixColumn(b, a);
    },
    applyProjection: function applyProjection(a) {
      console.warn("THREE.Vector3: .applyProjection() has been removed. Use .applyMatrix4( m ) instead.");
      return this.applyMatrix4(a);
    },
    fromAttribute: function fromAttribute(a, b, c) {
      console.warn("THREE.Vector3: .fromAttribute() has been renamed to .fromBufferAttribute().");
      return this.fromBufferAttribute(a, b, c);
    },
    distanceToManhattan: function distanceToManhattan(a) {
      console.warn("THREE.Vector3: .distanceToManhattan() has been renamed to .manhattanDistanceTo().");
      return this.manhattanDistanceTo(a);
    },
    lengthManhattan: function lengthManhattan() {
      console.warn("THREE.Vector3: .lengthManhattan() has been renamed to .manhattanLength().");
      return this.manhattanLength();
    }
  });
  (0, _assign.default)(ea.prototype, {
    fromAttribute: function fromAttribute(a, b, c) {
      console.warn("THREE.Vector4: .fromAttribute() has been renamed to .fromBufferAttribute().");
      return this.fromBufferAttribute(a, b, c);
    },
    lengthManhattan: function lengthManhattan() {
      console.warn("THREE.Vector4: .lengthManhattan() has been renamed to .manhattanLength().");
      return this.manhattanLength();
    }
  });
  (0, _assign.default)(N.prototype, {
    computeTangents: function computeTangents() {
      console.error("THREE.Geometry: .computeTangents() has been removed.");
    },
    computeLineDistances: function computeLineDistances() {
      console.error("THREE.Geometry: .computeLineDistances() has been removed. Use THREE.Line.computeLineDistances() instead.");
    }
  });
  (0, _assign.default)(A.prototype, {
    getChildByName: function getChildByName(a) {
      console.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName().");
      return this.getObjectByName(a);
    },
    renderDepth: function renderDepth() {
      console.warn("THREE.Object3D: .renderDepth has been removed. Use .renderOrder, instead.");
    },
    translate: function translate(a, b) {
      console.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead.");
      return this.translateOnAxis(b, a);
    },
    getWorldRotation: function getWorldRotation() {
      console.error("THREE.Object3D: .getWorldRotation() has been removed. Use THREE.Object3D.getWorldQuaternion( target ) instead.");
    }
  });
  (0, _defineProperties.default)(A.prototype, {
    eulerOrder: {
      get: function get() {
        console.warn("THREE.Object3D: .eulerOrder is now .rotation.order.");
        return this.rotation.order;
      },
      set: function set(a) {
        console.warn("THREE.Object3D: .eulerOrder is now .rotation.order.");
        this.rotation.order = a;
      }
    },
    useQuaternion: {
      get: function get() {
        console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.");
      },
      set: function set() {
        console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.");
      }
    }
  });
  (0, _defineProperties.default)(Bc.prototype, {
    objects: {
      get: function get() {
        console.warn("THREE.LOD: .objects has been renamed to .levels.");
        return this.levels;
      }
    }
  });
  (0, _defineProperty.default)(Cc.prototype, "useVertexTexture", {
    get: function get() {
      console.warn("THREE.Skeleton: useVertexTexture has been removed.");
    },
    set: function set() {
      console.warn("THREE.Skeleton: useVertexTexture has been removed.");
    }
  });
  (0, _defineProperty.default)(E.prototype, "__arcLengthDivisions", {
    get: function get() {
      console.warn("THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions.");
      return this.arcLengthDivisions;
    },
    set: function set(a) {
      console.warn("THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions.");
      this.arcLengthDivisions = a;
    }
  });

  la.prototype.setLens = function (a, b) {
    console.warn("THREE.PerspectiveCamera.setLens is deprecated. Use .setFocalLength and .filmGauge for a photographic setup.");
    void 0 !== b && (this.filmGauge = b);
    this.setFocalLength(a);
  };

  (0, _defineProperties.default)(ca.prototype, {
    onlyShadow: {
      set: function set() {
        console.warn("THREE.Light: .onlyShadow has been removed.");
      }
    },
    shadowCameraFov: {
      set: function set(a) {
        console.warn("THREE.Light: .shadowCameraFov is now .shadow.camera.fov.");
        this.shadow.camera.fov = a;
      }
    },
    shadowCameraLeft: {
      set: function set(a) {
        console.warn("THREE.Light: .shadowCameraLeft is now .shadow.camera.left.");
        this.shadow.camera.left = a;
      }
    },
    shadowCameraRight: {
      set: function set(a) {
        console.warn("THREE.Light: .shadowCameraRight is now .shadow.camera.right.");
        this.shadow.camera.right = a;
      }
    },
    shadowCameraTop: {
      set: function set(a) {
        console.warn("THREE.Light: .shadowCameraTop is now .shadow.camera.top.");
        this.shadow.camera.top = a;
      }
    },
    shadowCameraBottom: {
      set: function set(a) {
        console.warn("THREE.Light: .shadowCameraBottom is now .shadow.camera.bottom.");
        this.shadow.camera.bottom = a;
      }
    },
    shadowCameraNear: {
      set: function set(a) {
        console.warn("THREE.Light: .shadowCameraNear is now .shadow.camera.near.");
        this.shadow.camera.near = a;
      }
    },
    shadowCameraFar: {
      set: function set(a) {
        console.warn("THREE.Light: .shadowCameraFar is now .shadow.camera.far.");
        this.shadow.camera.far = a;
      }
    },
    shadowCameraVisible: {
      set: function set() {
        console.warn("THREE.Light: .shadowCameraVisible has been removed. Use new THREE.CameraHelper( light.shadow.camera ) instead.");
      }
    },
    shadowBias: {
      set: function set(a) {
        console.warn("THREE.Light: .shadowBias is now .shadow.bias.");
        this.shadow.bias = a;
      }
    },
    shadowDarkness: {
      set: function set() {
        console.warn("THREE.Light: .shadowDarkness has been removed.");
      }
    },
    shadowMapWidth: {
      set: function set(a) {
        console.warn("THREE.Light: .shadowMapWidth is now .shadow.mapSize.width.");
        this.shadow.mapSize.width = a;
      }
    },
    shadowMapHeight: {
      set: function set(a) {
        console.warn("THREE.Light: .shadowMapHeight is now .shadow.mapSize.height.");
        this.shadow.mapSize.height = a;
      }
    }
  });
  (0, _defineProperties.default)(T.prototype, {
    length: {
      get: function get() {
        console.warn("THREE.BufferAttribute: .length has been deprecated. Use .count instead.");
        return this.array.length;
      }
    },
    copyIndicesArray: function copyIndicesArray() {
      console.error("THREE.BufferAttribute: .copyIndicesArray() has been removed.");
    }
  });
  (0, _assign.default)(F.prototype, {
    addIndex: function addIndex(a) {
      console.warn("THREE.BufferGeometry: .addIndex() has been renamed to .setIndex().");
      this.setIndex(a);
    },
    addDrawCall: function addDrawCall(a, b, c) {
      void 0 !== c && console.warn("THREE.BufferGeometry: .addDrawCall() no longer supports indexOffset.");
      console.warn("THREE.BufferGeometry: .addDrawCall() is now .addGroup().");
      this.addGroup(a, b);
    },
    clearDrawCalls: function clearDrawCalls() {
      console.warn("THREE.BufferGeometry: .clearDrawCalls() is now .clearGroups().");
      this.clearGroups();
    },
    computeTangents: function computeTangents() {
      console.warn("THREE.BufferGeometry: .computeTangents() has been removed.");
    },
    computeOffsets: function computeOffsets() {
      console.warn("THREE.BufferGeometry: .computeOffsets() has been removed.");
    }
  });
  (0, _defineProperties.default)(F.prototype, {
    drawcalls: {
      get: function get() {
        console.error("THREE.BufferGeometry: .drawcalls has been renamed to .groups.");
        return this.groups;
      }
    },
    offsets: {
      get: function get() {
        console.warn("THREE.BufferGeometry: .offsets has been renamed to .groups.");
        return this.groups;
      }
    }
  });
  (0, _defineProperties.default)(Nd.prototype, {
    dynamic: {
      set: function set() {
        console.warn("THREE.Uniform: .dynamic has been removed. Use object.onBeforeRender() instead.");
      }
    },
    onUpdate: {
      value: function value() {
        console.warn("THREE.Uniform: .onUpdate() has been removed. Use object.onBeforeRender() instead.");
        return this;
      }
    }
  });
  (0, _defineProperties.default)(O.prototype, {
    wrapAround: {
      get: function get() {
        console.warn("THREE.Material: .wrapAround has been removed.");
      },
      set: function set() {
        console.warn("THREE.Material: .wrapAround has been removed.");
      }
    },
    wrapRGB: {
      get: function get() {
        console.warn("THREE.Material: .wrapRGB has been removed.");
        return new I();
      }
    },
    shading: {
      get: function get() {
        console.error("THREE." + this.type + ": .shading has been removed. Use the boolean .flatShading instead.");
      },
      set: function set(a) {
        console.warn("THREE." + this.type + ": .shading has been removed. Use the boolean .flatShading instead.");
        this.flatShading = 1 === a;
      }
    }
  });
  (0, _defineProperties.default)(Ja.prototype, {
    metal: {
      get: function get() {
        console.warn("THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead.");
        return !1;
      },
      set: function set() {
        console.warn("THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead");
      }
    }
  });
  (0, _defineProperties.default)(va.prototype, {
    derivatives: {
      get: function get() {
        console.warn("THREE.ShaderMaterial: .derivatives has been moved to .extensions.derivatives.");
        return this.extensions.derivatives;
      },
      set: function set(a) {
        console.warn("THREE. ShaderMaterial: .derivatives has been moved to .extensions.derivatives.");
        this.extensions.derivatives = a;
      }
    }
  });
  (0, _assign.default)(Xd.prototype, {
    getCurrentRenderTarget: function getCurrentRenderTarget() {
      console.warn("THREE.WebGLRenderer: .getCurrentRenderTarget() is now .getRenderTarget().");
      return this.getRenderTarget();
    },
    getMaxAnisotropy: function getMaxAnisotropy() {
      console.warn("THREE.WebGLRenderer: .getMaxAnisotropy() is now .capabilities.getMaxAnisotropy().");
      return this.capabilities.getMaxAnisotropy();
    },
    getPrecision: function getPrecision() {
      console.warn("THREE.WebGLRenderer: .getPrecision() is now .capabilities.precision.");
      return this.capabilities.precision;
    },
    resetGLState: function resetGLState() {
      console.warn("THREE.WebGLRenderer: .resetGLState() is now .state.reset().");
      return this.state.reset();
    },
    supportsFloatTextures: function supportsFloatTextures() {
      console.warn("THREE.WebGLRenderer: .supportsFloatTextures() is now .extensions.get( 'OES_texture_float' ).");
      return this.extensions.get("OES_texture_float");
    },
    supportsHalfFloatTextures: function supportsHalfFloatTextures() {
      console.warn("THREE.WebGLRenderer: .supportsHalfFloatTextures() is now .extensions.get( 'OES_texture_half_float' ).");
      return this.extensions.get("OES_texture_half_float");
    },
    supportsStandardDerivatives: function supportsStandardDerivatives() {
      console.warn("THREE.WebGLRenderer: .supportsStandardDerivatives() is now .extensions.get( 'OES_standard_derivatives' ).");
      return this.extensions.get("OES_standard_derivatives");
    },
    supportsCompressedTextureS3TC: function supportsCompressedTextureS3TC() {
      console.warn("THREE.WebGLRenderer: .supportsCompressedTextureS3TC() is now .extensions.get( 'WEBGL_compressed_texture_s3tc' ).");
      return this.extensions.get("WEBGL_compressed_texture_s3tc");
    },
    supportsCompressedTexturePVRTC: function supportsCompressedTexturePVRTC() {
      console.warn("THREE.WebGLRenderer: .supportsCompressedTexturePVRTC() is now .extensions.get( 'WEBGL_compressed_texture_pvrtc' ).");
      return this.extensions.get("WEBGL_compressed_texture_pvrtc");
    },
    supportsBlendMinMax: function supportsBlendMinMax() {
      console.warn("THREE.WebGLRenderer: .supportsBlendMinMax() is now .extensions.get( 'EXT_blend_minmax' ).");
      return this.extensions.get("EXT_blend_minmax");
    },
    supportsVertexTextures: function supportsVertexTextures() {
      console.warn("THREE.WebGLRenderer: .supportsVertexTextures() is now .capabilities.vertexTextures.");
      return this.capabilities.vertexTextures;
    },
    supportsInstancedArrays: function supportsInstancedArrays() {
      console.warn("THREE.WebGLRenderer: .supportsInstancedArrays() is now .extensions.get( 'ANGLE_instanced_arrays' ).");
      return this.extensions.get("ANGLE_instanced_arrays");
    },
    enableScissorTest: function enableScissorTest(a) {
      console.warn("THREE.WebGLRenderer: .enableScissorTest() is now .setScissorTest().");
      this.setScissorTest(a);
    },
    initMaterial: function initMaterial() {
      console.warn("THREE.WebGLRenderer: .initMaterial() has been removed.");
    },
    addPrePlugin: function addPrePlugin() {
      console.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.");
    },
    addPostPlugin: function addPostPlugin() {
      console.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.");
    },
    updateShadowMap: function updateShadowMap() {
      console.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.");
    },
    setFaceCulling: function setFaceCulling() {
      console.warn("THREE.WebGLRenderer: .setFaceCulling() has been removed.");
    }
  });
  (0, _defineProperties.default)(Xd.prototype, {
    shadowMapEnabled: {
      get: function get() {
        return this.shadowMap.enabled;
      },
      set: function set(a) {
        console.warn("THREE.WebGLRenderer: .shadowMapEnabled is now .shadowMap.enabled.");
        this.shadowMap.enabled = a;
      }
    },
    shadowMapType: {
      get: function get() {
        return this.shadowMap.type;
      },
      set: function set(a) {
        console.warn("THREE.WebGLRenderer: .shadowMapType is now .shadowMap.type.");
        this.shadowMap.type = a;
      }
    },
    shadowMapCullFace: {
      get: function get() {
        console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.");
      },
      set: function set() {
        console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.");
      }
    }
  });
  (0, _defineProperties.default)(Ue.prototype, {
    cullFace: {
      get: function get() {
        console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.");
      },
      set: function set() {
        console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.");
      }
    },
    renderReverseSided: {
      get: function get() {
        console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.");
      },
      set: function set() {
        console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.");
      }
    },
    renderSingleSided: {
      get: function get() {
        console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.");
      },
      set: function set() {
        console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.");
      }
    }
  });
  (0, _defineProperties.default)(hb.prototype, {
    wrapS: {
      get: function get() {
        console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS.");
        return this.texture.wrapS;
      },
      set: function set(a) {
        console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS.");
        this.texture.wrapS = a;
      }
    },
    wrapT: {
      get: function get() {
        console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT.");
        return this.texture.wrapT;
      },
      set: function set(a) {
        console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT.");
        this.texture.wrapT = a;
      }
    },
    magFilter: {
      get: function get() {
        console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter.");
        return this.texture.magFilter;
      },
      set: function set(a) {
        console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter.");
        this.texture.magFilter = a;
      }
    },
    minFilter: {
      get: function get() {
        console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter.");
        return this.texture.minFilter;
      },
      set: function set(a) {
        console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter.");
        this.texture.minFilter = a;
      }
    },
    anisotropy: {
      get: function get() {
        console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy.");
        return this.texture.anisotropy;
      },
      set: function set(a) {
        console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy.");
        this.texture.anisotropy = a;
      }
    },
    offset: {
      get: function get() {
        console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset.");
        return this.texture.offset;
      },
      set: function set(a) {
        console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset.");
        this.texture.offset = a;
      }
    },
    repeat: {
      get: function get() {
        console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat.");
        return this.texture.repeat;
      },
      set: function set(a) {
        console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat.");
        this.texture.repeat = a;
      }
    },
    format: {
      get: function get() {
        console.warn("THREE.WebGLRenderTarget: .format is now .texture.format.");
        return this.texture.format;
      },
      set: function set(a) {
        console.warn("THREE.WebGLRenderTarget: .format is now .texture.format.");
        this.texture.format = a;
      }
    },
    type: {
      get: function get() {
        console.warn("THREE.WebGLRenderTarget: .type is now .texture.type.");
        return this.texture.type;
      },
      set: function set(a) {
        console.warn("THREE.WebGLRenderTarget: .type is now .texture.type.");
        this.texture.type = a;
      }
    },
    generateMipmaps: {
      get: function get() {
        console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps.");
        return this.texture.generateMipmaps;
      },
      set: function set(a) {
        console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps.");
        this.texture.generateMipmaps = a;
      }
    }
  });
  (0, _defineProperties.default)(We.prototype, {
    standing: {
      set: function set() {
        console.warn("THREE.WebVRManager: .standing has been removed.");
      }
    }
  });

  jc.prototype.load = function (a) {
    console.warn("THREE.Audio: .load has been deprecated. Use THREE.AudioLoader instead.");
    var b = this;
    new je().load(a, function (a) {
      b.setBuffer(a);
    });
    return this;
  };

  ne.prototype.getData = function () {
    console.warn("THREE.AudioAnalyser: .getData() is now .getFrequencyData().");
    return this.getFrequencyData();
  };

  cd.prototype.updateCubeMap = function (a, b) {
    console.warn("THREE.CubeCamera: .updateCubeMap() is now .update().");
    return this.update(a, b);
  };

  k.WebGLRenderTargetCube = Ib;
  k.WebGLRenderTarget = hb;
  k.WebGLRenderer = Xd;
  k.ShaderLib = rb;
  k.UniformsLib = L;
  k.UniformsUtils = Da;
  k.ShaderChunk = V;
  k.FogExp2 = Ob;
  k.Fog = Pb;
  k.Scene = rd;
  k.Sprite = Ac;
  k.LOD = Bc;
  k.SkinnedMesh = td;
  k.Skeleton = Cc;
  k.Bone = sd;
  k.Mesh = oa;
  k.LineSegments = aa;
  k.LineLoop = ud;
  k.Line = ua;
  k.Points = Qb;
  k.Group = vd;
  k.VideoTexture = Yd;
  k.DataTexture = ib;
  k.CompressedTexture = Rb;
  k.CubeTexture = ab;
  k.CanvasTexture = zc;
  k.DepthTexture = Dc;
  k.Texture = Y;
  k.CompressedTextureLoader = df;
  k.DataTextureLoader = be;
  k.CubeTextureLoader = ce;
  k.TextureLoader = xd;
  k.ObjectLoader = ff;
  k.MaterialLoader = Md;
  k.BufferGeometryLoader = ee;
  k.DefaultLoadingManager = ma;
  k.LoadingManager = ae;
  k.JSONLoader = fe;
  k.ImageLoader = Yc;
  k.ImageBitmapLoader = ge;
  k.FontLoader = gf;
  k.FileLoader = Ka;
  k.Loader = ic;
  k.LoaderUtils = Be;
  k.Cache = Hb;
  k.AudioLoader = je;
  k.SpotLightShadow = zd;
  k.SpotLight = Ad;
  k.PointLight = Bd;
  k.RectAreaLight = Fd;
  k.HemisphereLight = yd;
  k.DirectionalLightShadow = Cd;
  k.DirectionalLight = Dd;
  k.AmbientLight = Ed;
  k.LightShadow = Eb;
  k.Light = ca;
  k.StereoCamera = hf;
  k.PerspectiveCamera = la;
  k.OrthographicCamera = Jb;
  k.CubeCamera = cd;
  k.ArrayCamera = qd;
  k.Camera = Qa;
  k.AudioListener = ke;
  k.PositionalAudio = me;
  k.AudioContext = le;
  k.AudioAnalyser = ne;
  k.Audio = jc;
  k.VectorKeyframeTrack = hc;
  k.StringKeyframeTrack = Gd;
  k.QuaternionKeyframeTrack = ad;
  k.NumberKeyframeTrack = gc;
  k.ColorKeyframeTrack = Jd;
  k.BooleanKeyframeTrack = Hd;
  k.PropertyMixer = oe;
  k.PropertyBinding = qa;
  k.KeyframeTrack = da;
  k.AnimationUtils = fa;
  k.AnimationObjectGroup = kf;
  k.AnimationMixer = pe;
  k.AnimationClip = Ba;
  k.Uniform = Nd;
  k.InstancedBufferGeometry = qe;
  k.BufferGeometry = F;
  k.Geometry = N;
  k.InterleavedBufferAttribute = re;
  k.InstancedInterleavedBuffer = se;
  k.InterleavedBuffer = kc;
  k.InstancedBufferAttribute = te;
  k.Face3 = Wa;
  k.Object3D = A;
  k.Raycaster = mf;
  k.Layers = Sd;
  k.EventDispatcher = xa;
  k.Clock = of;
  k.QuaternionLinearInterpolant = Id;
  k.LinearInterpolant = bd;
  k.DiscreteInterpolant = Ld;
  k.CubicInterpolant = Kd;
  k.Interpolant = na;
  k.Triangle = Aa;
  k.Math = S;
  k.Spherical = pf;
  k.Cylindrical = qf;
  k.Plane = Fa;
  k.Frustum = ld;
  k.Sphere = Ea;
  k.Ray = qb;
  k.Matrix4 = M;
  k.Matrix3 = sa;
  k.Box3 = Va;
  k.Box2 = ve;
  k.Line3 = Lb;
  k.Euler = jb;
  k.Vector4 = ea;
  k.Vector3 = p;
  k.Vector2 = C;
  k.Quaternion = ja;
  k.Color = I;
  k.ImmediateRenderObject = dd;
  k.VertexNormalsHelper = ed;
  k.SpotLightHelper = lc;
  k.SkeletonHelper = mc;
  k.PointLightHelper = nc;
  k.RectAreaLightHelper = oc;
  k.HemisphereLightHelper = pc;
  k.GridHelper = fd;
  k.PolarGridHelper = Od;
  k.FaceNormalsHelper = gd;
  k.DirectionalLightHelper = qc;
  k.CameraHelper = hd;
  k.BoxHelper = Fb;
  k.Box3Helper = id;
  k.PlaneHelper = jd;
  k.ArrowHelper = Gb;
  k.AxesHelper = kd;
  k.Shape = gb;
  k.Path = Pa;
  k.ShapePath = he;
  k.Font = ie;
  k.CurvePath = Za;
  k.Curve = E;
  k.ShapeUtils = Xa;
  k.WebGLUtils = Ve;
  k.WireframeGeometry = Sb;
  k.ParametricGeometry = Ec;
  k.ParametricBufferGeometry = Tb;
  k.TetrahedronGeometry = Gc;
  k.TetrahedronBufferGeometry = Ub;
  k.OctahedronGeometry = Hc;
  k.OctahedronBufferGeometry = sb;
  k.IcosahedronGeometry = Ic;
  k.IcosahedronBufferGeometry = Vb;
  k.DodecahedronGeometry = Jc;
  k.DodecahedronBufferGeometry = Wb;
  k.PolyhedronGeometry = Fc;
  k.PolyhedronBufferGeometry = pa;
  k.TubeGeometry = Kc;
  k.TubeBufferGeometry = Xb;
  k.TorusKnotGeometry = Lc;
  k.TorusKnotBufferGeometry = Yb;
  k.TorusGeometry = Mc;
  k.TorusBufferGeometry = Zb;
  k.TextGeometry = Rc;
  k.TextBufferGeometry = $b;
  k.SphereGeometry = Sc;
  k.SphereBufferGeometry = ub;
  k.RingGeometry = Tc;
  k.RingBufferGeometry = ac;
  k.PlaneGeometry = xc;
  k.PlaneBufferGeometry = pb;
  k.LatheGeometry = Uc;
  k.LatheBufferGeometry = bc;
  k.ShapeGeometry = vb;
  k.ShapeBufferGeometry = wb;
  k.ExtrudeGeometry = fb;
  k.ExtrudeBufferGeometry = Ia;
  k.EdgesGeometry = cc;
  k.ConeGeometry = Vc;
  k.ConeBufferGeometry = Wc;
  k.CylinderGeometry = xb;
  k.CylinderBufferGeometry = Ya;
  k.CircleGeometry = Xc;
  k.CircleBufferGeometry = dc;
  k.BoxGeometry = Kb;
  k.BoxBufferGeometry = mb;
  k.ShadowMaterial = yb;
  k.SpriteMaterial = eb;
  k.RawShaderMaterial = ec;
  k.ShaderMaterial = va;
  k.PointsMaterial = Ha;
  k.MeshPhysicalMaterial = zb;
  k.MeshStandardMaterial = Sa;
  k.MeshPhongMaterial = Ja;
  k.MeshToonMaterial = Ab;
  k.MeshNormalMaterial = Bb;
  k.MeshLambertMaterial = Cb;
  k.MeshDepthMaterial = cb;
  k.MeshDistanceMaterial = db;
  k.MeshBasicMaterial = za;
  k.LineDashedMaterial = Db;
  k.LineBasicMaterial = U;
  k.Material = O;
  k.Float64BufferAttribute = wc;
  k.Float32BufferAttribute = z;
  k.Uint32BufferAttribute = lb;
  k.Int32BufferAttribute = vc;
  k.Uint16BufferAttribute = kb;
  k.Int16BufferAttribute = uc;
  k.Uint8ClampedBufferAttribute = tc;
  k.Uint8BufferAttribute = sc;
  k.Int8BufferAttribute = rc;
  k.BufferAttribute = T;
  k.ArcCurve = fc;
  k.CatmullRomCurve3 = X;
  k.CubicBezierCurve = La;
  k.CubicBezierCurve3 = Ta;
  k.EllipseCurve = ia;
  k.LineCurve = wa;
  k.LineCurve3 = Ma;
  k.QuadraticBezierCurve = Na;
  k.QuadraticBezierCurve3 = Ua;
  k.SplineCurve = Oa;
  k.REVISION = "91";
  k.MOUSE = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
  };
  k.CullFaceNone = 0;
  k.CullFaceBack = 1;
  k.CullFaceFront = 2;
  k.CullFaceFrontBack = 3;
  k.FrontFaceDirectionCW = 0;
  k.FrontFaceDirectionCCW = 1;
  k.BasicShadowMap = 0;
  k.PCFShadowMap = 1;
  k.PCFSoftShadowMap = 2;
  k.FrontSide = 0;
  k.BackSide = 1;
  k.DoubleSide = 2;
  k.FlatShading = 1;
  k.SmoothShading = 2;
  k.NoColors = 0;
  k.FaceColors = 1;
  k.VertexColors = 2;
  k.NoBlending = 0;
  k.NormalBlending = 1;
  k.AdditiveBlending = 2;
  k.SubtractiveBlending = 3;
  k.MultiplyBlending = 4;
  k.CustomBlending = 5;
  k.AddEquation = 100;
  k.SubtractEquation = 101;
  k.ReverseSubtractEquation = 102;
  k.MinEquation = 103;
  k.MaxEquation = 104;
  k.ZeroFactor = 200;
  k.OneFactor = 201;
  k.SrcColorFactor = 202;
  k.OneMinusSrcColorFactor = 203;
  k.SrcAlphaFactor = 204;
  k.OneMinusSrcAlphaFactor = 205;
  k.DstAlphaFactor = 206;
  k.OneMinusDstAlphaFactor = 207;
  k.DstColorFactor = 208;
  k.OneMinusDstColorFactor = 209;
  k.SrcAlphaSaturateFactor = 210;
  k.NeverDepth = 0;
  k.AlwaysDepth = 1;
  k.LessDepth = 2;
  k.LessEqualDepth = 3;
  k.EqualDepth = 4;
  k.GreaterEqualDepth = 5;
  k.GreaterDepth = 6;
  k.NotEqualDepth = 7;
  k.MultiplyOperation = 0;
  k.MixOperation = 1;
  k.AddOperation = 2;
  k.NoToneMapping = 0;
  k.LinearToneMapping = 1;
  k.ReinhardToneMapping = 2;
  k.Uncharted2ToneMapping = 3;
  k.CineonToneMapping = 4;
  k.UVMapping = 300;
  k.CubeReflectionMapping = 301;
  k.CubeRefractionMapping = 302;
  k.EquirectangularReflectionMapping = 303;
  k.EquirectangularRefractionMapping = 304;
  k.SphericalReflectionMapping = 305;
  k.CubeUVReflectionMapping = 306;
  k.CubeUVRefractionMapping = 307;
  k.RepeatWrapping = 1E3;
  k.ClampToEdgeWrapping = 1001;
  k.MirroredRepeatWrapping = 1002;
  k.NearestFilter = 1003;
  k.NearestMipMapNearestFilter = 1004;
  k.NearestMipMapLinearFilter = 1005;
  k.LinearFilter = 1006;
  k.LinearMipMapNearestFilter = 1007;
  k.LinearMipMapLinearFilter = 1008;
  k.UnsignedByteType = 1009;
  k.ByteType = 1010;
  k.ShortType = 1011;
  k.UnsignedShortType = 1012;
  k.IntType = 1013;
  k.UnsignedIntType = 1014;
  k.FloatType = 1015;
  k.HalfFloatType = 1016;
  k.UnsignedShort4444Type = 1017;
  k.UnsignedShort5551Type = 1018;
  k.UnsignedShort565Type = 1019;
  k.UnsignedInt248Type = 1020;
  k.AlphaFormat = 1021;
  k.RGBFormat = 1022;
  k.RGBAFormat = 1023;
  k.LuminanceFormat = 1024;
  k.LuminanceAlphaFormat = 1025;
  k.RGBEFormat = 1023;
  k.DepthFormat = 1026;
  k.DepthStencilFormat = 1027;
  k.RGB_S3TC_DXT1_Format = 33776;
  k.RGBA_S3TC_DXT1_Format = 33777;
  k.RGBA_S3TC_DXT3_Format = 33778;
  k.RGBA_S3TC_DXT5_Format = 33779;
  k.RGB_PVRTC_4BPPV1_Format = 35840;
  k.RGB_PVRTC_2BPPV1_Format = 35841;
  k.RGBA_PVRTC_4BPPV1_Format = 35842;
  k.RGBA_PVRTC_2BPPV1_Format = 35843;
  k.RGB_ETC1_Format = 36196;
  k.RGBA_ASTC_4x4_Format = 37808;
  k.RGBA_ASTC_5x4_Format = 37809;
  k.RGBA_ASTC_5x5_Format = 37810;
  k.RGBA_ASTC_6x5_Format = 37811;
  k.RGBA_ASTC_6x6_Format = 37812;
  k.RGBA_ASTC_8x5_Format = 37813;
  k.RGBA_ASTC_8x6_Format = 37814;
  k.RGBA_ASTC_8x8_Format = 37815;
  k.RGBA_ASTC_10x5_Format = 37816;
  k.RGBA_ASTC_10x6_Format = 37817;
  k.RGBA_ASTC_10x8_Format = 37818;
  k.RGBA_ASTC_10x10_Format = 37819;
  k.RGBA_ASTC_12x10_Format = 37820;
  k.RGBA_ASTC_12x12_Format = 37821;
  k.LoopOnce = 2200;
  k.LoopRepeat = 2201;
  k.LoopPingPong = 2202;
  k.InterpolateDiscrete = 2300;
  k.InterpolateLinear = 2301;
  k.InterpolateSmooth = 2302;
  k.ZeroCurvatureEnding = 2400;
  k.ZeroSlopeEnding = 2401;
  k.WrapAroundEnding = 2402;
  k.TrianglesDrawMode = 0;
  k.TriangleStripDrawMode = 1;
  k.TriangleFanDrawMode = 2;
  k.LinearEncoding = 3E3;
  k.sRGBEncoding = 3001;
  k.GammaEncoding = 3007;
  k.RGBEEncoding = 3002;
  k.LogLuvEncoding = 3003;
  k.RGBM7Encoding = 3004;
  k.RGBM16Encoding = 3005;
  k.RGBDEncoding = 3006;
  k.BasicDepthPacking = 3200;
  k.RGBADepthPacking = 3201;
  k.CubeGeometry = Kb;

  k.Face4 = function (a, b, c, d, e, f, g) {
    console.warn("THREE.Face4 has been removed. A THREE.Face3 will be created instead.");
    return new Wa(a, b, c, e, f, g);
  };

  k.LineStrip = 0;
  k.LinePieces = 1;

  k.MeshFaceMaterial = function (a) {
    console.warn("THREE.MeshFaceMaterial has been removed. Use an Array instead.");
    return a;
  };

  k.MultiMaterial = function (a) {
    void 0 === a && (a = []);
    console.warn("THREE.MultiMaterial has been removed. Use an Array instead.");
    a.isMultiMaterial = !0;
    a.materials = a;

    a.clone = function () {
      return a.slice();
    };

    return a;
  };

  k.PointCloud = function (a, b) {
    console.warn("THREE.PointCloud has been renamed to THREE.Points.");
    return new Qb(a, b);
  };

  k.Particle = function (a) {
    console.warn("THREE.Particle has been renamed to THREE.Sprite.");
    return new Ac(a);
  };

  k.ParticleSystem = function (a, b) {
    console.warn("THREE.ParticleSystem has been renamed to THREE.Points.");
    return new Qb(a, b);
  };

  k.PointCloudMaterial = function (a) {
    console.warn("THREE.PointCloudMaterial has been renamed to THREE.PointsMaterial.");
    return new Ha(a);
  };

  k.ParticleBasicMaterial = function (a) {
    console.warn("THREE.ParticleBasicMaterial has been renamed to THREE.PointsMaterial.");
    return new Ha(a);
  };

  k.ParticleSystemMaterial = function (a) {
    console.warn("THREE.ParticleSystemMaterial has been renamed to THREE.PointsMaterial.");
    return new Ha(a);
  };

  k.Vertex = function (a, b, c) {
    console.warn("THREE.Vertex has been removed. Use THREE.Vector3 instead.");
    return new p(a, b, c);
  };

  k.DynamicBufferAttribute = function (a, b) {
    console.warn("THREE.DynamicBufferAttribute has been removed. Use new THREE.BufferAttribute().setDynamic( true ) instead.");
    return new T(a, b).setDynamic(!0);
  };

  k.Int8Attribute = function (a, b) {
    console.warn("THREE.Int8Attribute has been removed. Use new THREE.Int8BufferAttribute() instead.");
    return new rc(a, b);
  };

  k.Uint8Attribute = function (a, b) {
    console.warn("THREE.Uint8Attribute has been removed. Use new THREE.Uint8BufferAttribute() instead.");
    return new sc(a, b);
  };

  k.Uint8ClampedAttribute = function (a, b) {
    console.warn("THREE.Uint8ClampedAttribute has been removed. Use new THREE.Uint8ClampedBufferAttribute() instead.");
    return new tc(a, b);
  };

  k.Int16Attribute = function (a, b) {
    console.warn("THREE.Int16Attribute has been removed. Use new THREE.Int16BufferAttribute() instead.");
    return new uc(a, b);
  };

  k.Uint16Attribute = function (a, b) {
    console.warn("THREE.Uint16Attribute has been removed. Use new THREE.Uint16BufferAttribute() instead.");
    return new kb(a, b);
  };

  k.Int32Attribute = function (a, b) {
    console.warn("THREE.Int32Attribute has been removed. Use new THREE.Int32BufferAttribute() instead.");
    return new vc(a, b);
  };

  k.Uint32Attribute = function (a, b) {
    console.warn("THREE.Uint32Attribute has been removed. Use new THREE.Uint32BufferAttribute() instead.");
    return new lb(a, b);
  };

  k.Float32Attribute = function (a, b) {
    console.warn("THREE.Float32Attribute has been removed. Use new THREE.Float32BufferAttribute() instead.");
    return new z(a, b);
  };

  k.Float64Attribute = function (a, b) {
    console.warn("THREE.Float64Attribute has been removed. Use new THREE.Float64BufferAttribute() instead.");
    return new wc(a, b);
  };

  k.ClosedSplineCurve3 = sf;
  k.SplineCurve3 = tf;
  k.Spline = xe;

  k.AxisHelper = function (a) {
    console.warn("THREE.AxisHelper has been renamed to THREE.AxesHelper.");
    return new kd(a);
  };

  k.BoundingBoxHelper = function (a, b) {
    console.warn("THREE.BoundingBoxHelper has been deprecated. Creating a THREE.BoxHelper instead.");
    return new Fb(a, b);
  };

  k.EdgesHelper = function (a, b) {
    console.warn("THREE.EdgesHelper has been removed. Use THREE.EdgesGeometry instead.");
    return new aa(new cc(a.geometry), new U({
      color: void 0 !== b ? b : 16777215
    }));
  };

  k.WireframeHelper = function (a, b) {
    console.warn("THREE.WireframeHelper has been removed. Use THREE.WireframeGeometry instead.");
    return new aa(new Sb(a.geometry), new U({
      color: void 0 !== b ? b : 16777215
    }));
  };

  k.XHRLoader = function (a) {
    console.warn("THREE.XHRLoader has been renamed to THREE.FileLoader.");
    return new Ka(a);
  };

  k.BinaryTextureLoader = function (a) {
    console.warn("THREE.BinaryTextureLoader has been renamed to THREE.DataTextureLoader.");
    return new be(a);
  };

  k.GeometryUtils = {
    merge: function merge(a, b, c) {
      console.warn("THREE.GeometryUtils: .merge() has been moved to Geometry. Use geometry.merge( geometry2, matrix, materialIndexOffset ) instead.");

      if (b.isMesh) {
        b.matrixAutoUpdate && b.updateMatrix();
        var d = b.matrix;
        b = b.geometry;
      }

      a.merge(b, d, c);
    },
    center: function center(a) {
      console.warn("THREE.GeometryUtils: .center() has been moved to Geometry. Use geometry.center() instead.");
      return a.center();
    }
  };
  k.ImageUtils = {
    crossOrigin: void 0,
    loadTexture: function loadTexture(a, b, c, d) {
      console.warn("THREE.ImageUtils.loadTexture has been deprecated. Use THREE.TextureLoader() instead.");
      var e = new xd();
      e.setCrossOrigin(this.crossOrigin);
      a = e.load(a, c, void 0, d);
      b && (a.mapping = b);
      return a;
    },
    loadTextureCube: function loadTextureCube(a, b, c, d) {
      console.warn("THREE.ImageUtils.loadTextureCube has been deprecated. Use THREE.CubeTextureLoader() instead.");
      var e = new ce();
      e.setCrossOrigin(this.crossOrigin);
      a = e.load(a, c, void 0, d);
      b && (a.mapping = b);
      return a;
    },
    loadCompressedTexture: function loadCompressedTexture() {
      console.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.");
    },
    loadCompressedTextureCube: function loadCompressedTextureCube() {
      console.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.");
    }
  };

  k.Projector = function () {
    console.error("THREE.Projector has been moved to /examples/js/renderers/Projector.js.");

    this.projectVector = function (a, b) {
      console.warn("THREE.Projector: .projectVector() is now vector.project().");
      a.project(b);
    };

    this.unprojectVector = function (a, b) {
      console.warn("THREE.Projector: .unprojectVector() is now vector.unproject().");
      a.unproject(b);
    };

    this.pickingRay = function () {
      console.error("THREE.Projector: .pickingRay() is now raycaster.setFromCamera().");
    };
  };

  k.CanvasRenderer = function () {
    console.error("THREE.CanvasRenderer has been moved to /examples/js/renderers/CanvasRenderer.js");
    this.domElement = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");

    this.clear = function () {};

    this.render = function () {};

    this.setClearColor = function () {};

    this.setSize = function () {};
  };

  k.SceneUtils = {
    createMultiMaterialObject: function createMultiMaterialObject() {
      console.error("THREE.SceneUtils has been moved to /examples/js/utils/SceneUtils.js");
    },
    detach: function detach() {
      console.error("THREE.SceneUtils has been moved to /examples/js/utils/SceneUtils.js");
    },
    attach: function attach() {
      console.error("THREE.SceneUtils has been moved to /examples/js/utils/SceneUtils.js");
    }
  };

  k.LensFlare = function () {
    console.error("THREE.LensFlare has been moved to /examples/js/objects/Lensflare.js");
  };

  (0, _defineProperty.default)(k, "__esModule", {
    value: !0
  });
});
},{"@babel/runtime-corejs2/core-js/object/freeze":"../node_modules/@babel/runtime-corejs2/core-js/object/freeze.js","@babel/runtime-corejs2/core-js/object/keys":"../node_modules/@babel/runtime-corejs2/core-js/object/keys.js","@babel/runtime-corejs2/core-js/json/stringify":"../node_modules/@babel/runtime-corejs2/core-js/json/stringify.js","@babel/runtime-corejs2/core-js/object/create":"../node_modules/@babel/runtime-corejs2/core-js/object/create.js","@babel/runtime-corejs2/core-js/object/assign":"../node_modules/@babel/runtime-corejs2/core-js/object/assign.js","@babel/runtime-corejs2/core-js/number/is-integer":"../node_modules/@babel/runtime-corejs2/core-js/number/is-integer.js","@babel/runtime-corejs2/core-js/number/epsilon":"../node_modules/@babel/runtime-corejs2/core-js/number/epsilon.js","@babel/runtime-corejs2/core-js/parse-float":"../node_modules/@babel/runtime-corejs2/core-js/parse-float.js","@babel/runtime-corejs2/core-js/parse-int":"../node_modules/@babel/runtime-corejs2/core-js/parse-int.js","@babel/runtime-corejs2/core-js/array/is-array":"../node_modules/@babel/runtime-corejs2/core-js/array/is-array.js","@babel/runtime-corejs2/core-js/object/define-properties":"../node_modules/@babel/runtime-corejs2/core-js/object/define-properties.js","@babel/runtime-corejs2/core-js/weak-map":"../node_modules/@babel/runtime-corejs2/core-js/weak-map.js","@babel/runtime-corejs2/core-js/object/define-property":"../node_modules/@babel/runtime-corejs2/core-js/object/define-property.js","@babel/runtime-corejs2/helpers/typeof":"../node_modules/@babel/runtime-corejs2/helpers/typeof.js"}],"js/canvas-renderer-and-projector.min.js":[function(require,module,exports) {
"use strict";

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

var _create = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/create"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bgColor = 16777215;
THREE.SpriteCanvasMaterial = function (e) {
  THREE.Material.call(this), this.type = "SpriteCanvasMaterial", this.color = new THREE.Color(16777215), this.program = function () {}, this.setValues(e);
}, THREE.SpriteCanvasMaterial.prototype = (0, _create.default)(THREE.Material.prototype), THREE.SpriteCanvasMaterial.prototype.constructor = THREE.SpriteCanvasMaterial, THREE.SpriteCanvasMaterial.prototype.isSpriteCanvasMaterial = !0, THREE.SpriteCanvasMaterial.prototype.clone = function () {
  var e = new THREE.SpriteCanvasMaterial();
  return e.copy(this), e.color.copy(this.color), e.program = this.program, e;
}, THREE.CanvasRenderer = function (e) {
  function r() {
    me.setRGB(0, 0, 0), ve.setRGB(0, 0, 0), ye.setRGB(0, 0, 0);

    for (var e = 0, r = g.length; e < r; e++) {
      var t = g[e],
          i = t.color;
      t.isAmbientLight ? me.add(i) : t.isDirectionalLight ? ve.add(i) : t.isPointLight && ye.add(i);
    }
  }

  function t(e, r, t) {
    for (var i = 0, o = g.length; i < o; i++) {
      var n = g[i];

      if (Ee.copy(n.color), n.isDirectionalLight) {
        var a = xe.setFromMatrixPosition(n.matrixWorld).normalize(),
            s = r.dot(a);
        if (s <= 0) continue;
        s *= n.intensity, t.add(Ee.multiplyScalar(s));
      } else if (n.isPointLight) {
        var a = xe.setFromMatrixPosition(n.matrixWorld),
            s = r.dot(xe.subVectors(a, e).normalize());
        if (s <= 0) continue;
        if (0 == (s *= 0 == n.distance ? 1 : 1 - Math.min(e.distanceTo(a) / n.distance, 1))) continue;
        s *= n.intensity, t.add(Ee.multiplyScalar(s));
      }
    }
  }

  function i(e, r, t) {
    f(t.opacity), d(t.blending);
    var i = r.scale.x * U,
        o = r.scale.y * q,
        n = Math.sqrt(i * i + o * o);

    if (ue.min.set(e.x - n, e.y - n), ue.max.set(e.x + n, e.y + n), t.isSpriteMaterial) {
      var a = t.map;

      if (null !== a) {
        var s = fe[a.id];

        if (void 0 !== s && s.version === a.version || (s = c(a), fe[a.id] = s), void 0 !== s.canvas) {
          y(s.canvas);
          var l = a.image,
              p = l.width * a.offset.x,
              E = l.height * a.offset.y,
              h = l.width * a.repeat.x,
              u = l.height * a.repeat.y,
              m = i / h,
              x = o / u;
          Z.save(), Z.translate(e.x, e.y), 0 !== t.rotation && Z.rotate(t.rotation), Z.translate(-i / 2, -o / 2), Z.scale(m, x), Z.translate(-p, -E), Z.fillRect(p, E, h, u), Z.restore();
        }
      } else y(t.color.getStyle()), Z.save(), Z.translate(e.x, e.y), 0 !== t.rotation && Z.rotate(t.rotation), Z.scale(i, -o), Z.fillRect(-.5, -.5, 1, 1), Z.restore();
    } else t.isSpriteCanvasMaterial ? (v(t.color.getStyle()), y(t.color.getStyle()), Z.save(), Z.translate(e.x, e.y), 0 !== t.rotation && Z.rotate(t.rotation), Z.scale(i, o), t.program(Z), Z.restore()) : t.isPointsMaterial && (y(t.color.getStyle()), Z.save(), Z.translate(e.x, e.y), 0 !== t.rotation && Z.rotate(t.rotation), Z.scale(i * t.size, -o * t.size), Z.fillRect(-.5, -.5, 1, 1), Z.restore());
  }

  function o(e, r, t, i) {
    if (f(i.opacity), d(i.blending), Z.beginPath(), Z.moveTo(e.positionScreen.x, e.positionScreen.y), Z.lineTo(r.positionScreen.x, r.positionScreen.y), i.isLineBasicMaterial) {
      if (h(i.linewidth), u(i.linecap), m(i.linejoin), i.vertexColors !== THREE.VertexColors) v(i.color.getStyle());else {
        var o = t.vertexColors[0].getStyle(),
            n = t.vertexColors[1].getStyle();
        if (o === n) v(o);else {
          try {
            var a = Z.createLinearGradient(e.positionScreen.x, e.positionScreen.y, r.positionScreen.x, r.positionScreen.y);
            a.addColorStop(0, o), a.addColorStop(1, n);
          } catch (e) {
            a = o;
          }

          v(a);
        }
      }
      i.isLineDashedMaterial && x([i.dashSize, i.gapSize]), Z.stroke(), ue.expandByScalar(2 * i.linewidth), i.isLineDashedMaterial && x([]);
    }
  }

  function n(e, r, i, o, n, c, E, h) {
    if (A.info.render.vertices += 3, A.info.render.faces++, f(h.opacity), d(h.blending), M = e.positionScreen.x, C = e.positionScreen.y, b = r.positionScreen.x, z = r.positionScreen.y, V = i.positionScreen.x, j = i.positionScreen.y, a(M, C, b, z, V, j), (h.isMeshLambertMaterial || h.isMeshPhongMaterial || h.isMeshStandardMaterial) && null === h.map) ce.copy(h.color), pe.copy(h.emissive), h.vertexColors === THREE.FaceColors && ce.multiply(E.color), le.copy(me), Re.copy(e.positionWorld).add(r.positionWorld).add(i.positionWorld).divideScalar(3), t(Re, E.normalModel, le), le.multiply(ce).add(pe), !0 === h.wireframe ? s(le, h.wireframeLinewidth, h.wireframeLinecap, h.wireframeLinejoin) : l(le);else if (h.isMeshBasicMaterial || h.isMeshLambertMaterial || h.isMeshPhongMaterial || h.isMeshStandardMaterial) {
      if (null !== h.map) {
        var u = h.map.mapping;
        u === THREE.UVMapping && (L = E.uvs, p(M, C, b, z, V, j, L[o].x, L[o].y, L[n].x, L[n].y, L[c].x, L[c].y, h.map));
      } else null !== h.envMap ? h.envMap.mapping === THREE.SphericalReflectionMapping && (Te.copy(E.vertexNormalsModel[o]).applyMatrix3(ge), O = .5 * Te.x + .5, B = .5 * Te.y + .5, Te.copy(E.vertexNormalsModel[n]).applyMatrix3(ge), P = .5 * Te.x + .5, W = .5 * Te.y + .5, Te.copy(E.vertexNormalsModel[c]).applyMatrix3(ge), N = .5 * Te.x + .5, k = .5 * Te.y + .5, p(M, C, b, z, V, j, O, B, P, W, N, k, h.envMap)) : (le.copy(h.color), h.vertexColors === THREE.FaceColors && le.multiply(E.color), !0 === h.wireframe ? s(le, h.wireframeLinewidth, h.wireframeLinecap, h.wireframeLinejoin) : l(le));
    } else h.isMeshNormalMaterial ? (Te.copy(E.normalModel).applyMatrix3(ge), le.setRGB(Te.x, Te.y, Te.z).multiplyScalar(.5).addScalar(.5), !0 === h.wireframe ? s(le, h.wireframeLinewidth, h.wireframeLinecap, h.wireframeLinejoin) : l(le)) : (le.setRGB(1, 1, 1), !0 === h.wireframe ? s(le, h.wireframeLinewidth, h.wireframeLinecap, h.wireframeLinejoin) : l(le));
  }

  function a(e, r, t, i, o, n) {
    Z.beginPath(), Z.moveTo(e, r), Z.lineTo(t, i), Z.lineTo(o, n), Z.closePath();
  }

  function s(e, r, t, i) {
    h(r), u(t), m(i), v(e.getStyle()), Z.stroke(), ue.expandByScalar(2 * r);
  }

  function l(e) {
    y(e.getStyle()), Z.fill();
  }

  function c(e) {
    if (0 === e.version || e instanceof THREE.CompressedTexture || e instanceof THREE.DataTexture) return {
      canvas: void 0,
      version: e.version
    };
    var r = e.image;
    if (!1 === r.complete) return {
      canvas: void 0,
      version: 0
    };
    var t = e.wrapS === THREE.RepeatWrapping || e.wrapS === THREE.MirroredRepeatWrapping,
        i = e.wrapT === THREE.RepeatWrapping || e.wrapT === THREE.MirroredRepeatWrapping,
        o = e.wrapS === THREE.MirroredRepeatWrapping,
        n = e.wrapT === THREE.MirroredRepeatWrapping,
        a = document.createElement("canvas");
    a.width = r.width * (o ? 2 : 1), a.height = r.height * (n ? 2 : 1);
    var s = a.getContext("2d");
    s.setTransform(1, 0, 0, -1, 0, r.height), s.drawImage(r, 0, 0), !0 === o && (s.setTransform(-1, 0, 0, -1, r.width, r.height), s.drawImage(r, -r.width, 0)), !0 === n && (s.setTransform(1, 0, 0, 1, 0, 0), s.drawImage(r, 0, r.height)), !0 === o && !0 === n && (s.setTransform(-1, 0, 0, 1, r.width, 0), s.drawImage(r, -r.width, r.height));
    var l = "no-repeat";
    !0 === t && !0 === i ? l = "repeat" : !0 === t ? l = "repeat-x" : !0 === i && (l = "repeat-y");
    var c = Z.createPattern(a, l);
    return e.onUpdate && e.onUpdate(e), {
      canvas: c,
      version: e.version
    };
  }

  function p(e, r, t, i, o, n, a, s, l, p, E, f, d) {
    var h = fe[d.id];
    if (void 0 !== h && h.version === d.version || (h = c(d), fe[d.id] = h), void 0 === h.canvas) return y("rgba( 0, 0, 0, 1)"), void Z.fill();
    y(h.canvas);
    var u,
        m,
        v,
        x,
        R,
        T,
        g,
        S,
        H = d.offset.x / d.repeat.x,
        w = d.offset.y / d.repeat.y,
        M = d.image.width * d.repeat.x,
        C = d.image.height * d.repeat.y;
    a = (a + H) * M, s = (s + w) * C, l = (l + H) * M, p = (p + w) * C, E = (E + H) * M, f = (f + w) * C, t -= e, i -= r, o -= e, n -= r, l -= a, p -= s, E -= a, f -= s, 0 !== (g = l * f - E * p) && (S = 1 / g, u = (f * t - p * o) * S, m = (f * i - p * n) * S, v = (l * o - E * t) * S, x = (l * n - E * i) * S, R = e - u * a - v * s, T = r - m * a - x * s, Z.save(), Z.transform(u, m, v, x, R, T), Z.fill(), Z.restore());
  }

  function E(e, r, t) {
    var i,
        o = r.x - e.x,
        n = r.y - e.y,
        a = o * o + n * n;
    0 !== a && (i = t / Math.sqrt(a), o *= i, n *= i, r.x += o, r.y += n, e.x -= o, e.y -= n);
  }

  function f(e) {
    ee !== e && (Z.globalAlpha = e, ee = e);
  }

  function d(e) {
    re !== e && (e === THREE.NormalBlending ? Z.globalCompositeOperation = "source-over" : e === THREE.AdditiveBlending ? Z.globalCompositeOperation = "lighter" : e === THREE.SubtractiveBlending ? Z.globalCompositeOperation = "darker" : e === THREE.MultiplyBlending && (Z.globalCompositeOperation = "multiply"), re = e);
  }

  function h(e) {
    oe !== e && (Z.lineWidth = e, oe = e);
  }

  function u(e) {
    ne !== e && (Z.lineCap = e, ne = e);
  }

  function m(e) {
    ae !== e && (Z.lineJoin = e, ae = e);
  }

  function v(e) {
    te !== e && (Z.strokeStyle = e, te = e);
  }

  function y(e) {
    ie !== e && (Z.fillStyle = e, ie = e);
  }

  function x(e) {
    se.length !== e.length && (Z.setLineDash(e), se = e);
  }

  console.log("THREE.CanvasRenderer", THREE.REVISION), e = e || {};

  var R,
      T,
      g,
      S,
      H,
      w,
      M,
      C,
      b,
      z,
      V,
      j,
      L,
      O,
      B,
      P,
      W,
      N,
      k,
      A = this,
      F = new THREE.Projector(),
      D = void 0 !== e.canvas ? e.canvas : document.createElement("canvas"),
      G = D.width,
      I = D.height,
      U = Math.floor(G / 2),
      q = Math.floor(I / 2),
      J = 0,
      K = 0,
      Q = G,
      X = I,
      Y = 1,
      Z = D.getContext("2d", {
    alpha: !0 === e.alpha
  }),
      $ = new THREE.Color(bgColor),
      _ = !0 === e.alpha ? 0 : 1,
      ee = 1,
      re = 0,
      te = null,
      ie = null,
      oe = null,
      ne = null,
      ae = null,
      se = [],
      le = new THREE.Color(),
      ce = new THREE.Color(),
      pe = new THREE.Color(),
      Ee = new THREE.Color(),
      fe = {},
      de = new THREE.Box2(),
      he = new THREE.Box2(),
      ue = new THREE.Box2(),
      me = new THREE.Color(),
      ve = new THREE.Color(),
      ye = new THREE.Color(),
      xe = new THREE.Vector3(),
      Re = new THREE.Vector3(),
      Te = new THREE.Vector3(),
      ge = new THREE.Matrix3();

  void 0 === Z.setLineDash && (Z.setLineDash = function () {}), this.domElement = D, this.autoClear = !0, this.sortObjects = !0, this.sortElements = !0, this.info = {
    render: {
      vertices: 0,
      faces: 0
    }
  }, this.getContext = function () {
    return Z;
  }, this.getContextAttributes = function () {
    return Z.getContextAttributes();
  }, this.getPixelRatio = function () {
    return Y;
  }, this.setPixelRatio = function (e) {
    void 0 !== e && (Y = e);
  }, this.setSize = function (e, r, t) {
    G = e * Y, I = r * Y, D.width = G, D.height = I, U = Math.floor(G / 2), q = Math.floor(I / 2), !1 !== t && (D.style.width = e + "px", D.style.height = r + "px"), de.min.set(-U, -q), de.max.set(U, q), he.min.set(-U, -q), he.max.set(U, q), ee = 1, re = 0, te = null, ie = null, oe = null, ne = null, ae = null, this.setViewport(0, 0, e, r);
  }, this.setViewport = function (e, r, t, i) {
    J = e * Y, K = r * Y, Q = t * Y, X = i * Y;
  }, this.setScissor = function () {}, this.setScissorTest = function () {}, this.setClearColor = function (e, r) {
    $.set(e), _ = void 0 !== r ? r : 1, he.min.set(-U, -q), he.max.set(U, q);
  }, this.setClearColorHex = function (e, r) {
    console.warn("THREE.CanvasRenderer: .setClearColorHex() is being removed. Use .setClearColor() instead."), this.setClearColor(e, r);
  }, this.getClearColor = function () {
    return $;
  }, this.getClearAlpha = function () {
    return _;
  }, this.getMaxAnisotropy = function () {
    return 0;
  }, this.clear = function () {
    !1 === he.isEmpty() && (he.intersect(de), he.expandByScalar(2), he.min.x = he.min.x + U, he.min.y = -he.min.y + q, he.max.x = he.max.x + U, he.max.y = -he.max.y + q, _ < 1 && Z.clearRect(0 | he.min.x, 0 | he.max.y, he.max.x - he.min.x | 0, he.min.y - he.max.y | 0), _ > 0 && (f(1), d(THREE.NormalBlending), y("rgba(" + Math.floor(255 * $.r) + "," + Math.floor(255 * $.g) + "," + Math.floor(255 * $.b) + "," + _ + ")"), Z.fillRect(0 | he.min.x, 0 | he.max.y, he.max.x - he.min.x | 0, he.min.y - he.max.y | 0)), he.makeEmpty());
  }, this.clearColor = function () {}, this.clearDepth = function () {}, this.clearStencil = function () {}, this.render = function (e, t) {
    if (void 0 === t.isCamera) return void console.error("THREE.CanvasRenderer.render: camera is not an instance of THREE.Camera.");
    var a = e.background;
    a && a.isColor ? (f(1), d(THREE.NormalBlending), y(a.getStyle()), Z.fillRect(0, 0, G, I)) : !0 === this.autoClear && this.clear(), A.info.render.vertices = 0, A.info.render.faces = 0, Z.setTransform(Q / G, 0, 0, -X / I, J, I - K), Z.translate(U, q), R = F.projectScene(e, t, this.sortObjects, this.sortElements), T = R.elements, g = R.lights, ge.getNormalMatrix(t.matrixWorldInverse), r();

    for (var s = 0, l = T.length; s < l; s++) {
      var c = T[s],
          p = c.material;

      if (void 0 !== p && 0 !== p.opacity) {
        if (ue.makeEmpty(), c instanceof THREE.RenderableSprite) S = c, S.x *= U, S.y *= q, i(S, c, p);else if (c instanceof THREE.RenderableLine) S = c.v1, H = c.v2, S.positionScreen.x *= U, S.positionScreen.y *= q, H.positionScreen.x *= U, H.positionScreen.y *= q, ue.setFromPoints([S.positionScreen, H.positionScreen]), !0 === de.intersectsBox(ue) && o(S, H, c, p);else if (c instanceof THREE.RenderableFace) {
          if (S = c.v1, H = c.v2, w = c.v3, S.positionScreen.z < -1 || S.positionScreen.z > 1) continue;
          if (H.positionScreen.z < -1 || H.positionScreen.z > 1) continue;
          if (w.positionScreen.z < -1 || w.positionScreen.z > 1) continue;
          S.positionScreen.x *= U, S.positionScreen.y *= q, H.positionScreen.x *= U, H.positionScreen.y *= q, w.positionScreen.x *= U, w.positionScreen.y *= q, p.overdraw > 0 && (E(S.positionScreen, H.positionScreen, p.overdraw), E(H.positionScreen, w.positionScreen, p.overdraw), E(w.positionScreen, S.positionScreen, p.overdraw)), ue.setFromPoints([S.positionScreen, H.positionScreen, w.positionScreen]), !0 === de.intersectsBox(ue) && n(S, H, w, 0, 1, 2, c, p);
        }
        he.union(ue);
      }
    }

    Z.setTransform(1, 0, 0, 1, 0, 0);
  };
}, THREE.RenderableObject = function () {
  this.id = 0, this.object = null, this.z = 0, this.renderOrder = 0;
}, THREE.RenderableFace = function () {
  this.id = 0, this.v1 = new THREE.RenderableVertex(), this.v2 = new THREE.RenderableVertex(), this.v3 = new THREE.RenderableVertex(), this.normalModel = new THREE.Vector3(), this.vertexNormalsModel = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()], this.vertexNormalsLength = 0, this.color = new THREE.Color(), this.material = null, this.uvs = [new THREE.Vector2(), new THREE.Vector2(), new THREE.Vector2()], this.z = 0, this.renderOrder = 0;
}, THREE.RenderableVertex = function () {
  this.position = new THREE.Vector3(), this.positionWorld = new THREE.Vector3(), this.positionScreen = new THREE.Vector4(), this.visible = !0;
}, THREE.RenderableVertex.prototype.copy = function (e) {
  this.positionWorld.copy(e.positionWorld), this.positionScreen.copy(e.positionScreen);
}, THREE.RenderableLine = function () {
  this.id = 0, this.v1 = new THREE.RenderableVertex(), this.v2 = new THREE.RenderableVertex(), this.vertexColors = [new THREE.Color(), new THREE.Color()], this.material = null, this.z = 0, this.renderOrder = 0;
}, THREE.RenderableSprite = function () {
  this.id = 0, this.object = null, this.x = 0, this.y = 0, this.z = 0, this.rotation = 0, this.scale = new THREE.Vector2(), this.material = null, this.renderOrder = 0;
}, THREE.Projector = function () {
  function e(t) {
    if (!1 !== t.visible) {
      if (t instanceof THREE.Light) j.lights.push(t);else if (t instanceof THREE.Mesh || t instanceof THREE.Line || t instanceof THREE.Points) {
        if (!1 === t.material.visible) return;
        if (!0 === t.frustumCulled && !1 === D.intersectsObject(t)) return;
        r(t);
      } else if (t instanceof THREE.Sprite) {
        if (!1 === t.material.visible) return;
        if (!0 === t.frustumCulled && !1 === D.intersectsSprite(t)) return;
        r(t);
      }

      for (var i = t.children, o = 0, n = i.length; o < n; o++) {
        e(i[o]);
      }
    }
  }

  function r(e) {
    p = i(), p.id = e.id, p.object = e, L.setFromMatrixPosition(e.matrixWorld), L.applyMatrix4(k), p.z = L.z, p.renderOrder = e.renderOrder, j.objects.push(p);
  }

  function t(e, r, t) {
    var i = 1 / e.w;
    e.z *= i, e.z >= -1 && e.z <= 1 && (y = s(), y.id = r.id, y.x = e.x * i, y.y = e.y * i, y.z = e.z, y.renderOrder = r.renderOrder, y.object = r, y.rotation = r.rotation, y.scale.x = r.scale.x * Math.abs(y.x - (e.x + t.projectionMatrix.elements[0]) / (e.w + t.projectionMatrix.elements[12])), y.scale.y = r.scale.y * Math.abs(y.y - (e.y + t.projectionMatrix.elements[5]) / (e.w + t.projectionMatrix.elements[13])), y.material = r.material, j.elements.push(y));
  }

  function i() {
    if (E === g) {
      var e = new THREE.RenderableObject();
      return T.push(e), g++, E++, e;
    }

    return T[E++];
  }

  function o() {
    if (d === H) {
      var e = new THREE.RenderableVertex();
      return S.push(e), H++, d++, e;
    }

    return S[d++];
  }

  function n() {
    if (u === M) {
      var e = new THREE.RenderableFace();
      return w.push(e), M++, u++, e;
    }

    return w[u++];
  }

  function a() {
    if (v === b) {
      var e = new THREE.RenderableLine();
      return C.push(e), b++, v++, e;
    }

    return C[v++];
  }

  function s() {
    if (x === V) {
      var e = new THREE.RenderableSprite();
      return z.push(e), V++, x++, e;
    }

    return z[x++];
  }

  function l(e, r) {
    return e.renderOrder !== r.renderOrder ? e.renderOrder - r.renderOrder : e.z !== r.z ? r.z - e.z : e.id !== r.id ? e.id - r.id : 0;
  }

  function c(e, r) {
    var t = 0,
        i = 1,
        o = e.z + e.w,
        n = r.z + r.w,
        a = -e.z + e.w,
        s = -r.z + r.w;
    return o >= 0 && n >= 0 && a >= 0 && s >= 0 || !(o < 0 && n < 0 || a < 0 && s < 0) && (o < 0 ? t = Math.max(t, o / (o - n)) : n < 0 && (i = Math.min(i, o / (o - n))), a < 0 ? t = Math.max(t, a / (a - s)) : s < 0 && (i = Math.min(i, a / (a - s))), !(i < t) && (e.lerp(r, t), r.lerp(e, 1 - i), !0));
  }

  var p,
      E,
      f,
      d,
      h,
      u,
      m,
      v,
      y,
      x,
      R,
      T = [],
      g = 0,
      S = [],
      H = 0,
      w = [],
      M = 0,
      C = [],
      b = 0,
      z = [],
      V = 0,
      j = {
    objects: [],
    lights: [],
    elements: []
  },
      L = new THREE.Vector3(),
      O = new THREE.Vector4(),
      B = new THREE.Box3(new THREE.Vector3(-1, -1, -1), new THREE.Vector3(1, 1, 1)),
      P = new THREE.Box3(),
      W = new Array(3),
      N = new THREE.Matrix4(),
      k = new THREE.Matrix4(),
      A = new THREE.Matrix4(),
      F = new THREE.Matrix3(),
      D = new THREE.Frustum(),
      G = new THREE.Vector4(),
      I = new THREE.Vector4();
  this.projectVector = function (e, r) {
    console.warn("THREE.Projector: .projectVector() is now vector.project()."), e.project(r);
  }, this.unprojectVector = function (e, r) {
    console.warn("THREE.Projector: .unprojectVector() is now vector.unproject()."), e.unproject(r);
  }, this.pickingRay = function () {
    console.error("THREE.Projector: .pickingRay() is now raycaster.setFromCamera().");
  };

  var U = function U() {
    function e(e) {
      T = e, g = T.material, H.getNormalMatrix(T.matrixWorld), v.length = 0, y.length = 0, x.length = 0;
    }

    function r(e) {
      var r = e.position,
          t = e.positionWorld,
          i = e.positionScreen;
      t.copy(r).applyMatrix4(R), i.copy(t).applyMatrix4(k);
      var o = 1 / i.w;
      i.x *= o, i.y *= o, i.z *= o, e.visible = i.x >= -1 && i.x <= 1 && i.y >= -1 && i.y <= 1 && i.z >= -1 && i.z <= 1;
    }

    function t(e, t, i) {
      f = o(), f.position.set(e, t, i), r(f);
    }

    function i(e, r, t) {
      v.push(e, r, t);
    }

    function s(e, r, t) {
      y.push(e, r, t);
    }

    function l(e, r) {
      x.push(e, r);
    }

    function p(e, r, t) {
      return !0 === e.visible || !0 === r.visible || !0 === t.visible || (W[0] = e.positionScreen, W[1] = r.positionScreen, W[2] = t.positionScreen, B.intersectsBox(P.setFromPoints(W)));
    }

    function E(e, r, t) {
      return (t.positionScreen.x - e.positionScreen.x) * (r.positionScreen.y - e.positionScreen.y) - (t.positionScreen.y - e.positionScreen.y) * (r.positionScreen.x - e.positionScreen.x) < 0;
    }

    function d(e, r) {
      var t = S[e],
          i = S[r];
      t.positionScreen.copy(t.position).applyMatrix4(A), i.positionScreen.copy(i.position).applyMatrix4(A), !0 === c(t.positionScreen, i.positionScreen) && (t.positionScreen.multiplyScalar(1 / t.positionScreen.w), i.positionScreen.multiplyScalar(1 / i.positionScreen.w), m = a(), m.id = T.id, m.v1.copy(t), m.v2.copy(i), m.z = Math.max(t.positionScreen.z, i.positionScreen.z), m.renderOrder = T.renderOrder, m.material = T.material, T.material.vertexColors === THREE.VertexColors && (m.vertexColors[0].fromArray(y, 3 * e), m.vertexColors[1].fromArray(y, 3 * r)), j.elements.push(m));
    }

    function u(e, r, t) {
      var i = S[e],
          o = S[r],
          a = S[t];

      if (!1 !== p(i, o, a) && (g.side === THREE.DoubleSide || !0 === E(i, o, a))) {
        h = n(), h.id = T.id, h.v1.copy(i), h.v2.copy(o), h.v3.copy(a), h.z = (i.positionScreen.z + o.positionScreen.z + a.positionScreen.z) / 3, h.renderOrder = T.renderOrder, h.normalModel.fromArray(v, 3 * e), h.normalModel.applyMatrix3(H).normalize();

        for (var s = 0; s < 3; s++) {
          var l = h.vertexNormalsModel[s];
          l.fromArray(v, 3 * arguments[s]), l.applyMatrix3(H).normalize();
          h.uvs[s].fromArray(x, 2 * arguments[s]);
        }

        h.vertexNormalsLength = 3, h.material = T.material, j.elements.push(h);
      }
    }

    var v = [],
        y = [],
        x = [],
        T = null,
        g = null,
        H = new THREE.Matrix3();
    return {
      setObject: e,
      projectVertex: r,
      checkTriangleVisibility: p,
      checkBackfaceCulling: E,
      pushVertex: t,
      pushNormal: i,
      pushColor: s,
      pushUv: l,
      pushLine: d,
      pushTriangle: u
    };
  },
      q = new U();

  this.projectScene = function (r, i, s, p) {
    u = 0, v = 0, x = 0, j.elements.length = 0, !0 === r.autoUpdate && r.updateMatrixWorld(), null === i.parent && i.updateMatrixWorld(), N.copy(i.matrixWorldInverse), k.multiplyMatrices(i.projectionMatrix, N), D.setFromMatrix(k), E = 0, j.objects.length = 0, j.lights.length = 0, e(r), !0 === s && j.objects.sort(l);

    for (var f = j.objects, y = 0, T = f.length; y < T; y++) {
      var g = f[y].object,
          H = g.geometry;

      if (q.setObject(g), R = g.matrixWorld, d = 0, g instanceof THREE.Mesh) {
        if (H instanceof THREE.BufferGeometry) {
          var w = H.attributes,
              M = H.groups;
          if (void 0 === w.position) continue;

          for (var C = w.position.array, b = 0, z = C.length; b < z; b += 3) {
            q.pushVertex(C[b], C[b + 1], C[b + 2]);
          }

          if (void 0 !== w.normal) for (var V = w.normal.array, b = 0, z = V.length; b < z; b += 3) {
            q.pushNormal(V[b], V[b + 1], V[b + 2]);
          }
          if (void 0 !== w.uv) for (var B = w.uv.array, b = 0, z = B.length; b < z; b += 2) {
            q.pushUv(B[b], B[b + 1]);
          }

          if (null !== H.index) {
            var P = H.index.array;
            if (M.length > 0) for (var W = 0; W < M.length; W++) {
              for (var U = M[W], b = U.start, z = U.start + U.count; b < z; b += 3) {
                q.pushTriangle(P[b], P[b + 1], P[b + 2]);
              }
            } else for (var b = 0, z = P.length; b < z; b += 3) {
              q.pushTriangle(P[b], P[b + 1], P[b + 2]);
            }
          } else for (var b = 0, z = C.length / 3; b < z; b += 3) {
            q.pushTriangle(b, b + 1, b + 2);
          }
        } else if (H instanceof THREE.Geometry) {
          var J = H.vertices,
              K = H.faces,
              Q = H.faceVertexUvs[0];
          F.getNormalMatrix(R);

          for (var X = g.material, Y = (0, _isArray.default)(X), Z = 0, $ = J.length; Z < $; Z++) {
            var _ = J[Z];
            if (L.copy(_), !0 === X.morphTargets) for (var ee = H.morphTargets, re = g.morphTargetInfluences, te = 0, ie = ee.length; te < ie; te++) {
              var oe = re[te];

              if (0 !== oe) {
                var ne = ee[te],
                    ae = ne.vertices[Z];
                L.x += (ae.x - _.x) * oe, L.y += (ae.y - _.y) * oe, L.z += (ae.z - _.z) * oe;
              }
            }
            q.pushVertex(L.x, L.y, L.z);
          }

          for (var se = 0, le = K.length; se < le; se++) {
            var ce = K[se];

            if (void 0 !== (X = !0 === Y ? g.material[ce.materialIndex] : g.material)) {
              var pe = X.side,
                  Ee = S[ce.a],
                  fe = S[ce.b],
                  de = S[ce.c];

              if (!1 !== q.checkTriangleVisibility(Ee, fe, de)) {
                var he = q.checkBackfaceCulling(Ee, fe, de);

                if (pe !== THREE.DoubleSide) {
                  if (pe === THREE.FrontSide && !1 === he) continue;
                  if (pe === THREE.BackSide && !0 === he) continue;
                }

                h = n(), h.id = g.id, h.v1.copy(Ee), h.v2.copy(fe), h.v3.copy(de), h.normalModel.copy(ce.normal), !1 !== he || pe !== THREE.BackSide && pe !== THREE.DoubleSide || h.normalModel.negate(), h.normalModel.applyMatrix3(F).normalize();

                for (var ue = ce.vertexNormals, me = 0, ve = Math.min(ue.length, 3); me < ve; me++) {
                  var ye = h.vertexNormalsModel[me];
                  ye.copy(ue[me]), !1 !== he || pe !== THREE.BackSide && pe !== THREE.DoubleSide || ye.negate(), ye.applyMatrix3(F).normalize();
                }

                h.vertexNormalsLength = ue.length;
                var xe = Q[se];
                if (void 0 !== xe) for (var Re = 0; Re < 3; Re++) {
                  h.uvs[Re].copy(xe[Re]);
                }
                h.color = ce.color, h.material = X, h.z = (Ee.positionScreen.z + fe.positionScreen.z + de.positionScreen.z) / 3, h.renderOrder = g.renderOrder, j.elements.push(h);
              }
            }
          }
        }
      } else if (g instanceof THREE.Line) {
        if (A.multiplyMatrices(k, R), H instanceof THREE.BufferGeometry) {
          var w = H.attributes;

          if (void 0 !== w.position) {
            for (var C = w.position.array, b = 0, z = C.length; b < z; b += 3) {
              q.pushVertex(C[b], C[b + 1], C[b + 2]);
            }

            if (void 0 !== w.color) for (var Te = w.color.array, b = 0, z = Te.length; b < z; b += 3) {
              q.pushColor(Te[b], Te[b + 1], Te[b + 2]);
            }
            if (null !== H.index) for (var P = H.index.array, b = 0, z = P.length; b < z; b += 2) {
              q.pushLine(P[b], P[b + 1]);
            } else for (var ge = g instanceof THREE.LineSegments ? 2 : 1, b = 0, z = C.length / 3 - 1; b < z; b += ge) {
              q.pushLine(b, b + 1);
            }
          }
        } else if (H instanceof THREE.Geometry) {
          var J = g.geometry.vertices;
          if (0 === J.length) continue;
          Ee = o(), Ee.positionScreen.copy(J[0]).applyMatrix4(A);

          for (var ge = g instanceof THREE.LineSegments ? 2 : 1, Z = 1, $ = J.length; Z < $; Z++) {
            Ee = o(), Ee.positionScreen.copy(J[Z]).applyMatrix4(A), (Z + 1) % ge > 0 || (fe = S[d - 2], G.copy(Ee.positionScreen), I.copy(fe.positionScreen), !0 === c(G, I) && (G.multiplyScalar(1 / G.w), I.multiplyScalar(1 / I.w), m = a(), m.id = g.id, m.v1.positionScreen.copy(G), m.v2.positionScreen.copy(I), m.z = Math.max(G.z, I.z), m.renderOrder = g.renderOrder, m.material = g.material, g.material.vertexColors === THREE.VertexColors && (m.vertexColors[0].copy(g.geometry.colors[Z]), m.vertexColors[1].copy(g.geometry.colors[Z - 1])), j.elements.push(m)));
          }
        }
      } else if (g instanceof THREE.Points) {
        if (A.multiplyMatrices(k, R), H instanceof THREE.Geometry) for (var J = g.geometry.vertices, Z = 0, $ = J.length; Z < $; Z++) {
          var _ = J[Z];
          O.set(_.x, _.y, _.z, 1), O.applyMatrix4(A), t(O, g, i);
        } else if (H instanceof THREE.BufferGeometry) {
          var w = H.attributes;
          if (void 0 !== w.position) for (var C = w.position.array, b = 0, z = C.length; b < z; b += 3) {
            O.set(C[b], C[b + 1], C[b + 2], 1), O.applyMatrix4(A), t(O, g, i);
          }
        }
      } else g instanceof THREE.Sprite && (O.set(R.elements[12], R.elements[13], R.elements[14], 1), O.applyMatrix4(k), t(O, g, i));
    }

    return !0 === p && j.elements.sort(l), j;
  };
};
},{"@babel/runtime-corejs2/core-js/array/is-array":"../node_modules/@babel/runtime-corejs2/core-js/array/is-array.js","@babel/runtime-corejs2/core-js/object/create":"../node_modules/@babel/runtime-corejs2/core-js/object/create.js"}],"js/bg.js":[function(require,module,exports) {
// minOnSave: true, minifier: uglify-js
var canvasHeight = 500; // originally 400

var SEPARATION = 100;
var AMOUNTX = 80; // originally 80

var AMOUNTY = 10; // originally 80

var particleColor = "#3f3f3f";
var container;
var camera, scene, renderer;
var particles,
    particle,
    count = 0;
var mouseX = 0,
    mouseY = 0;
container = document.createElement('div');
container.classList.add("canvas-container");
container.classList.add("hidden");
setTimeout(function () {
  container.classList.remove("hidden");
}, 1000);
document.body.appendChild(container);

function getCanvasContainerWidth() {
  return document.querySelector(".canvas-container").clientWidth;
}

var windowHalfX = getCanvasContainerWidth() / 2;
var windowHalfY = canvasHeight / 2;
init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(75, getCanvasContainerWidth() / canvasHeight, 1, 10000);
  camera.position.z = 10000;
  scene = new THREE.Scene();
  particles = new Array();
  window.material = new THREE.SpriteCanvasMaterial({
    color: particleColor,
    program: function program(context) {
      context.beginPath();
      context.arc(0, 0, 0.5, 0, 2 * Math.PI, true);
      context.fill();
    }
  });
  var i = 0;

  for (var ix = 0; ix < AMOUNTX; ix++) {
    for (var iy = 0; iy < AMOUNTY; iy++) {
      particle = particles[i++] = new THREE.Sprite(material);
      particle.position.x = ix * SEPARATION - AMOUNTX * SEPARATION / 2;
      particle.position.z = iy * SEPARATION - AMOUNTY * SEPARATION / 2;
      scene.add(particle);
    }
  }

  renderer = new THREE.CanvasRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(getCanvasContainerWidth(), canvasHeight);
  container.appendChild(renderer.domElement);
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  var canvasContainerWidth = getCanvasContainerWidth();
  windowHalfX = canvasContainerWidth / 2;
  windowHalfY = canvasHeight / 2;
  camera.aspect = canvasContainerWidth / canvasHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvasContainerWidth, canvasHeight);
} //
//


function animate() {
  requestAnimationFrame(animate);
  render();
}

var defaultCanvasY = 0;
var defaultCameraPos = 250;
camera.position.set(0, defaultCameraPos, 1200);
container.style.transform = "translateY(".concat(defaultCanvasY - 0.1 * document.documentElement.scrollTop, "px)");
document.addEventListener('scroll', function (e) {
  var yValue = e.target.scrollingElement.scrollTop;
  camera.position.setY(defaultCameraPos + 1 * yValue);
  container.style.transform = "translateY(".concat(defaultCanvasY - 0.1 * yValue, "px)");
});

function render() {
  var i = 0;

  for (var ix = 0; ix < AMOUNTX; ix++) {
    for (var iy = 0; iy < AMOUNTY; iy++) {
      particle = particles[i++];
      particle.position.y = Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50;
      particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 4 + (Math.sin((iy + count) * 0.5) + 1) * 4;
    }
  }

  renderer.render(scene, camera);
  count += 0.1;
}
},{}],"js/index.js":[function(require,module,exports) {
window.THREE = require('./three.min.js');

require('./canvas-renderer-and-projector.min.js');

require('./bg.js'); // pages


function openPage(newPage, title) {
  if (title) document.title = title;
  var currentPageEl = document.querySelector('.page.visible');
  if (currentPageEl) currentPageEl.classList.remove('visible');
  var pageEl = document.querySelector(".page[data-page='".concat(newPage, "']"));
  pageEl.classList.add('visible');
}

var pathname = location.pathname;
if (pathname.length > 1 && pathname.endsWith('/')) pathname = pathname.slice(0, -1);
console.log({
  page: pathname
});
history.replaceState({
  page: pathname
}, document.title);
document.addEventListener('click', function (e) {
  var el = e.target;

  while (el.parentElement && el.tagName !== 'A') {
    el = el.parentElement;
  }

  if (el.tagName === 'A' && el.classList.contains('noreload') && history.pushState) {
    e.preventDefault(); // deselect current page from nav bar

    var navItems = document.querySelectorAll('.nav-bar .current');

    for (var i = 0; i < navItems.length; i++) {
      navItems[i].classList.remove('current');
    } // select new page in nav bar


    newPage = el.getAttribute('href');
    navBarItem = document.querySelector(".nav-bar a[href='".concat(newPage, "']"));

    if (navBarItem) {
      navBarItem.classList.add('current');
      var title = el.innerText + ' | KH';

      if (el.classList.contains('in-submenu')) {
        var parentNavItem = el.parentElement.parentElement;
        parentNavItem.classList.add('current');
        var parentText = parentNavItem.children[0].innerText;
        title = el.innerText + ' - ' + el.parentElement.parentElement.innerText + ' | KH';
      }

      console.log({
        page: newPage
      });
      window.history.pushState({
        page: newPage
      }, title, newPage);
      openPage(newPage, title);
    } else {
      var _title = 'KH';
      history.pushState({
        page: newPage
      }, _title, newPage);
      openPage(newPage, _title);
    }
  }
}); // window.addEventListener('onpopstate', (e) => {
//   console.log(e)
//   openPage(e.state.page)
// })

window.addEventListener('popstate', function (event) {
  console.log(event.state);
  openPage(event.state.page);
});
},{"./three.min.js":"js/three.min.js","./canvas-renderer-and-projector.min.js":"js/canvas-renderer-and-projector.min.js","./bg.js":"js/bg.js"}]},{},["js/index.js"], null)
//# sourceMappingURL=/js/index.js.map