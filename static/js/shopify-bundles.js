;(function () {
var loader, define, requireModule, require, requirejs;
var global = this;

(function() {
  'use strict';

  // Save off the original values of these globals, so we can restore them if someone asks us to
  var oldGlobals = {
    loader: loader,
    define: define,
    requireModule: requireModule,
    require: require,
    requirejs: requirejs
  };

  loader = {
    noConflict: function(aliases) {
      var oldName, newName;

      for (oldName in aliases) {
        if (aliases.hasOwnProperty(oldName)) {
          if (oldGlobals.hasOwnProperty(oldName)) {
            newName = aliases[oldName];

            global[newName] = global[oldName];
            global[oldName] = oldGlobals[oldName];
          }
        }
      }
    }
  };

  var _isArray;
  if (!Array.isArray) {
    _isArray = function (x) {
      return Object.prototype.toString.call(x) === '[object Array]';
    };
  } else {
    _isArray = Array.isArray;
  }

  var registry = {};
  var seen = {};
  var FAILED = false;
  var LOADED = true;

  var uuid = 0;

  function unsupportedModule(length) {
    throw new Error('an unsupported module was defined, expected `define(name, deps, module)` instead got: `' +
                    length + '` arguments to define`');
  }

  var defaultDeps = ['require', 'exports', 'module'];

  function Module(name, deps, callback) {
    this.id        = uuid++;
    this.name      = name;
    this.deps      = !deps.length && callback.length ? defaultDeps : deps;
    this.module    = { exports: {} };
    this.callback  = callback;
    this.state     = undefined;
    this._require  = undefined;
    this.finalized = false;
    this.hasExportsAsDep = false;
  }

  Module.prototype.makeDefaultExport = function() {
    var exports = this.module.exports;
    if (exports !== null &&
        (typeof exports === 'object' || typeof exports === 'function') &&
          exports['default'] === undefined) {
      exports['default'] = exports;
    }
  };

  Module.prototype.exports = function(reifiedDeps) {
    if (this.finalized) {
      return this.module.exports;
    } else {
      var result = this.callback.apply(this, reifiedDeps);
      if (!(this.hasExportsAsDep && result === undefined)) {
        this.module.exports = result;
      }
      this.makeDefaultExport();
      this.finalized = true;
      return this.module.exports;
    }
  };

  Module.prototype.unsee = function() {
    this.finalized = false;
    this.state = undefined;
    this.module = { exports: {}};
  };

  Module.prototype.reify = function() {
    var deps = this.deps;
    var length = deps.length;
    var reified = new Array(length);
    var dep;

    for (var i = 0, l = length; i < l; i++) {
      dep = deps[i];
      if (dep === 'exports') {
        this.hasExportsAsDep = true;
        reified[i] = this.module.exports;
      } else if (dep === 'require') {
        reified[i] = this.makeRequire();
      } else if (dep === 'module') {
        reified[i] = this.module;
      } else {
        reified[i] = findModule(resolve(dep, this.name), this.name).module.exports;
      }
    }

    return reified;
  };

  Module.prototype.makeRequire = function() {
    var name = this.name;

    return this._require || (this._require = function(dep) {
      return require(resolve(dep, name));
    });
  };

  Module.prototype.build = function() {
    if (this.state === FAILED) { return; }
    this.state = FAILED;
    this.exports(this.reify());
    this.state = LOADED;
  };

  define = function(name, deps, callback) {
    if (arguments.length < 2) {
      unsupportedModule(arguments.length);
    }

    if (!_isArray(deps)) {
      callback = deps;
      deps     =  [];
    }

    registry[name] = new Module(name, deps, callback);
  };

  // we don't support all of AMD
  // define.amd = {};
  // we will support petals...
  define.petal = { };

  function Alias(path) {
    this.name = path;
  }

  define.alias = function(path) {
    return new Alias(path);
  };

  function missingModule(name, referrer) {
    throw new Error('Could not find module `' + name + '` imported from `' + referrer + '`');
  }

  requirejs = require = requireModule = function(name) {
    return findModule(name, '(require)').module.exports;
  };

  function findModule(name, referrer) {
    var mod = registry[name] || registry[name + '/index'];

    while (mod && mod.callback instanceof Alias) {
      name = mod.callback.name;
      mod = registry[name];
    }

    if (!mod) { missingModule(name, referrer); }

    mod.build();
    return mod;
  }

  function resolve(child, name) {
    if (child.charAt(0) !== '.') { return child; }

    var parts = child.split('/');
    var nameParts = name.split('/');
    var parentBase = nameParts.slice(0, -1);

    for (var i = 0, l = parts.length; i < l; i++) {
      var part = parts[i];

      if (part === '..') {
        if (parentBase.length === 0) {
          throw new Error('Cannot access parent module of root');
        }
        parentBase.pop();
      } else if (part === '.') {
        continue;
      } else { parentBase.push(part); }
    }

    return parentBase.join('/');
  }

  requirejs.entries = requirejs._eak_seen = registry;
  requirejs.unsee = function(moduleName) {
    findModule(moduleName, '(unsee)').unsee();
  };

  requirejs.clear = function() {
    requirejs.entries = requirejs._eak_seen = registry = {};
    seen = {};
  };
})();

define('shopify-buy/adapters/listings-adapter', ['exports', '../ajax', '../metal/core-object'], function (exports, _ajax, _metalCoreObject) {
  'use strict';

  var _slice = Array.prototype.slice;

  var ListingsAdapter = _metalCoreObject['default'].extend(Object.defineProperties({
    ajax: _ajax['default'],

    constructor: function constructor(config) {
      this.config = config;
    },

    pathForType: function pathForType(type) {
      return '/' + type.slice(0, -1) + '_listings';
    },

    buildUrl: function buildUrl(singleOrMultiple, type, idOrQuery) {
      switch (singleOrMultiple) {
        case 'multiple':
          return this.buildMultipleUrl(type, idOrQuery);
        case 'single':
          return this.buildSingleUrl(type, idOrQuery);
        default:
          return '';
      }
    },

    buildMultipleUrl: function buildMultipleUrl(type) {
      var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var url = '' + this.baseUrl + this.pathForType(type);
      var paramNames = Object.keys(query);

      if (paramNames.length > 0) {
        var queryString = paramNames.map(function (key) {
          var value = undefined;

          if (Array.isArray(query[key])) {
            value = query[key].join(',');
          } else {
            value = query[key];
          }

          return key + '=' + encodeURIComponent(value);
        }).join('&');

        return url + '?' + queryString;
      }

      return url;
    },

    buildSingleUrl: function buildSingleUrl(type, id) {
      return '' + this.baseUrl + this.pathForType(type) + '/' + id;
    },

    fetchMultiple: function fetchMultiple() /* type, [query] */{
      var url = this.buildUrl.apply(this, ['multiple'].concat(_slice.call(arguments)));

      return this.ajax('GET', url, { headers: this.headers }).then(function (response) {
        return response.json;
      });
    },

    fetchSingle: function fetchSingle() /* type, id */{
      var url = this.buildUrl.apply(this, ['single'].concat(_slice.call(arguments)));

      return this.ajax('GET', url, { headers: this.headers }).then(function (response) {
        return response.json;
      });
    }
  }, {
    base64ApiKey: {
      get: function get() {
        return btoa(this.config.apiKey);
      },
      configurable: true,
      enumerable: true
    },
    baseUrl: {
      get: function get() {
        var _config = this.config;
        var myShopifyDomain = _config.myShopifyDomain;
        var appId = _config.appId;

        return 'https://' + myShopifyDomain + '.myshopify.com/api/apps/' + appId;
      },
      configurable: true,
      enumerable: true
    },
    headers: {
      get: function get() {
        return {
          Authorization: 'Basic ' + this.base64ApiKey,
          'Content-Type': 'application/json'
        };
      },
      configurable: true,
      enumerable: true
    }
  }));

  exports['default'] = ListingsAdapter;
});
define('shopify-buy/adapters/local-storage-adapter', ['exports', '../metal/core-object', '../metal/set-guid-for'], function (exports, _metalCoreObject, _metalSetGuidFor) {
  'use strict';

  var LocalStorageAdapter = _metalCoreObject['default'].extend({
    constructor: function constructor() {},

    idKeyForType: function idKeyForType() /* type */{
      return _metalSetGuidFor.GUID_KEY;
    },

    fetchSingle: function fetchSingle(type, id) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var stringifiedValue = localStorage.getItem(_this.localStorageKey(type, id));

        if (stringifiedValue === null) {
          reject(new Error(type + '#' + id + ' not found'));

          return;
        }

        try {
          var value = JSON.parse(stringifiedValue);

          resolve(value);
        } catch (e) {
          reject(e);
        }
      });
    },

    create: function create(type, payload) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var id = _this2.identify(payload);

        try {
          localStorage.setItem(_this2.localStorageKey(type, id), JSON.stringify(payload));
        } catch (e) {
          reject(e);
        }

        resolve(payload);
      });
    },

    update: function update(type, id, payload) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        try {
          localStorage.setItem(_this3.localStorageKey(type, id), JSON.stringify(payload));
        } catch (e) {
          reject(e);
        }

        resolve(payload);
      });
    },

    localStorageKey: function localStorageKey(type, id) {
      return type + '.' + id;
    },

    identify: function identify(payload) {
      var keys = Object.keys(payload);

      if (keys.length === 1 && typeof payload[keys[0]] === 'object') {
        return (0, _metalSetGuidFor['default'])(payload[keys[0]]);
      }

      return (0, _metalSetGuidFor['default'])(payload);
    }
  });

  exports['default'] = LocalStorageAdapter;
});
define("shopify-buy/ajax", ["exports"], function (exports) {
  "use strict";

  exports["default"] = ajax;
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    var error = new Error(response.statusText);

    error.status = response.status;
    error.response = response;
    throw error;
  }

  function parseResponse(response) {
    return response.json().then(function (json) {
      return { json: json, originalResponse: response, isJSON: true };
    })["catch"](function () {
      var responseClone = response.clone();

      return responseClone.text().then(function (text) {
        return { text: text, originalResponse: responseClone, isText: true };
      });
    });
  }

  function ajax(method, url) {
    var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    opts.method = method;

    return fetch(url, opts).then(checkStatus).then(parseResponse);
  }
});
define('shopify-buy/config', ['exports', './metal/core-object'], function (exports, _metalCoreObject) {
  'use strict';

  /**
   * @module shopify-buy
   * @submodule config
   */

  var Config = _metalCoreObject['default'].extend({
    /**
     * @class Config
     * @constructor
     * @param {Object} attrs A hash of required config data.
     * @param {String} attrs.apiKey Your api client's public token
     * @param {String} attrs.appId The app whose listings the client will be
     * using. If you are just modifying a buy button, the buy-button's app id is
     * 6. Otherwise, obtain the app id of the app you're modifying or extending.
     * @param {String} attrs.myShopifyDomain You shop's `myshopify.com` domain.
     */
    constructor: function constructor(attrs) {
      var _this = this;

      this.requiredProperties.forEach(function (key) {
        if (!attrs.hasOwnProperty(key)) {
          throw new Error('new Config() requires the option \'' + key + '\'');
        } else {
          _this[key] = attrs[key];
        }
      });
    },

    /**
     * The apiKey for authenticating against shopify. This is your api client's
     * public api token. Not the shared secret. Set during initialation.
     * @attribute requiredProperties
     * @default ['apiKey', 'appId', 'myShopifyDomain']
     * @type Array
     * @private
     */
    requiredProperties: ['apiKey', 'appId', 'myShopifyDomain'],

    /**
     * The apiKey for authenticating against shopify. This is your api client's
     * public api token. Not the shared secret. Set during initialation.
     * @attribute apiKey
     * @default ''
     * @type String
     * @public
     */
    apiKey: '',

    /**
     * @attribute appId
     * @default ''
     * @type String
     * @public
     */
    appId: '',

    /**
     * @attribute myShopifyDomain
     * @default ''
     * @type String
     * @public
     */
    myShopifyDomain: ''
  });

  exports['default'] = Config;
});
define('shopify-buy/isomorphic-btoa', ['exports'], function (exports) {
  /* global global, require, Buffer */

  'use strict';

  var globalNamespace = undefined;

  if (typeof global === 'undefined') {
    globalNamespace = window;
  } else {
    globalNamespace = global;
  }

  var btoa = globalNamespace.btoa;

  function isNode() {
    var windowAbsent = typeof window === 'undefined';
    var requirePresent = typeof require === 'function';

    return windowAbsent && requirePresent;
  }

  if (!btoa && isNode()) {
    globalNamespace.btoa = function (string) {
      return new Buffer(string).toString('base64');
    };
  }
});
define('shopify-buy/isomorphic-fetch', ['exports'], function (exports) {
  /* global global, require */

  'use strict';

  var globalNamespace = undefined;

  if (typeof global === 'undefined') {
    globalNamespace = window;
  } else {
    globalNamespace = global;
  }

  var fetch = globalNamespace.fetch;

  function isNode() {
    var windowAbsent = typeof window === 'undefined';
    var requirePresent = typeof require === 'function';

    return windowAbsent && requirePresent;
  }

  if (!fetch && isNode()) {
    globalNamespace.fetch = require('node-fetch');
    globalNamespace.Response = globalNamespace.fetch.Response;
  }
});
define('shopify-buy/metal/assign', ['exports'], function (exports) {
  /* eslint no-undefined: 0 */

  'use strict';

  var assign = undefined;

  if (typeof Object.assign === 'function') {
    assign = Object.assign;
  } else {
    assign = function (target) {
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var output = Object(target);

      var propertyObjects = [].slice.call(arguments, 1);

      if (propertyObjects.length > 0) {
        propertyObjects.forEach(function (source) {
          if (source !== undefined && source !== null) {
            var nextKey = undefined;

            for (nextKey in source) {
              if (source.hasOwnProperty(nextKey)) {
                output[nextKey] = source[nextKey];
              }
            }
          }
        });
      }

      return output;
    };
  }

  exports['default'] = assign;
});
define('shopify-buy/metal/core-object', ['exports', './create-class'], function (exports, _createClass) {
  'use strict';

  var CoreObject = (0, _createClass['default'])({
    constructor: function constructor() {},

    'static': {
      extend: function extend(subClassProps) {
        return (0, _createClass['default'])(subClassProps, this);
      }
    }
  });

  exports['default'] = CoreObject;
});
define('shopify-buy/metal/create-class', ['exports', './assign', './includes'], function (exports, _assign, _includes) {
  'use strict';

  function wrap(func, superFunc) {
    function superWrapper() {
      var originalSuper = this['super'];

      this['super'] = function () {
        return superFunc.apply(this, arguments);
      };

      var ret = func.apply(this, arguments);

      this['super'] = originalSuper;

      return ret;
    }

    superWrapper.wrappedFunction = func;

    return superWrapper;
  }

  function defineProperties(names, proto, destination) {
    var parentProto = Object.getPrototypeOf(destination);

    names.forEach(function (name) {
      var descriptor = Object.getOwnPropertyDescriptor(proto, name);
      var parentDescriptor = parentProto.hasOwnProperty(name) && Object.getOwnPropertyDescriptor(parentProto, name);

      if (typeof parentDescriptor.value === 'function' && typeof descriptor.value === 'function') {
        var wrappedFunction = wrap(descriptor.value, parentDescriptor.value);

        Object.defineProperty(destination, name, { value: wrappedFunction });
      } else {
        Object.defineProperty(destination, name, descriptor);
      }
    });
  }

  function createClass(props) {
    var parent = arguments.length <= 1 || arguments[1] === undefined ? Object : arguments[1];

    var Constructor = wrap(props.constructor, parent);
    var instancePropertyNames = Object.getOwnPropertyNames(props).filter(function (key) {
      return !(0, _includes['default'])(['constructor', 'static'], key);
    });

    (0, _assign['default'])(Constructor, parent);

    Constructor.prototype = Object.create(parent.prototype);
    defineProperties(instancePropertyNames, props, Constructor.prototype);
    Constructor.prototype.constructor = Constructor;

    var staticProps = props['static'];

    if (staticProps) {
      var staticPropertyNames = Object.getOwnPropertyNames(staticProps);

      defineProperties(staticPropertyNames, staticProps, Constructor);
    }

    return Constructor;
  }

  exports['default'] = createClass;
});
define("shopify-buy/metal/includes", ["exports"], function (exports) {
  "use strict";

  var includes = undefined;

  if (!Array.prototype.includes) {
    includes = function (array, searchElement) {
      var ObjectifiedArray = Object(array);
      var length = parseInt(ObjectifiedArray.length, 10) || 0;

      if (length === 0) {
        return false;
      }

      var startIndex = parseInt(arguments[1], 10) || 0;
      var index = undefined;

      if (startIndex >= 0) {
        index = startIndex;
      } else {
        index = length + startIndex;

        if (index < 0) {
          index = 0;
        }
      }

      while (index < length) {
        var currentElement = ObjectifiedArray[index];

        /* eslint no-self-compare:0 */
        if (searchElement === currentElement || searchElement !== searchElement && currentElement !== currentElement) {
          // NaN !== NaN
          return true;
        }
        index++;
      }

      return false;
    };
  } else {
    includes = function (array) {
      var args = [].slice.call(arguments, 1);

      return Array.prototype.includes.apply(array, args);
    };
  }

  exports["default"] = includes;
});
define('shopify-buy/metal/set-guid-for', ['exports'], function (exports) {
  /* eslint no-undefined: 0 complexity: 0 */

  'use strict';

  var GUID_KEY = 'shopify-buy-uuid';

  var GUID_PREFIX = 'shopify-buy.' + Date.now();

  var GUID_DESC = {
    writable: true,
    configurable: true,
    enumerable: true,
    value: null
  };

  var uuidSeed = 0;

  function uuid() {
    return ++uuidSeed;
  }

  var numberCache = {};
  var stringCache = {};

  function setGuidFor(obj) {
    if (obj && obj[GUID_KEY]) {
      return obj[GUID_KEY];
    }

    if (obj === undefined) {
      return '(undefined)';
    }

    if (obj === null) {
      return '(null)';
    }

    var type = typeof obj;
    var id = undefined;

    switch (type) {
      case 'number':
        id = numberCache[obj];

        if (!id) {
          id = numberCache[obj] = 'nu' + obj;
        }

        break;

      case 'string':
        id = stringCache[obj];

        if (!id) {
          id = numberCache[obj] = 'st' + uuid();
        }

        break;

      case 'boolean':
        if (obj) {
          id = '(true)';
        } else {
          id = '(false)';
        }

        break;

      default:
        if (obj === Object) {
          id = '(Object)';
          break;
        }

        if (obj === Array) {
          id = '(Array)';
          break;
        }

        id = GUID_PREFIX + '.' + uuid();

        if (obj[GUID_KEY] === null) {
          obj[GUID_KEY] = id;
        } else {
          GUID_DESC.value = id;
          Object.defineProperty(obj, GUID_KEY, GUID_DESC);
        }
    }

    return id;
  }

  exports['default'] = setGuidFor;
  exports.GUID_KEY = GUID_KEY;
});
define("shopify-buy/metal/uniq", ["exports"], function (exports) {
  "use strict";

  exports["default"] = function (array) {
    return array.reduce(function (uniqueArray, item) {
      if (uniqueArray.indexOf(item) < 0) {
        uniqueArray.push(item);
      }

      return uniqueArray;
    }, []);
  };
});
define('shopify-buy/models/base-model', ['exports', '../metal/core-object', '../metal/assign'], function (exports, _metalCoreObject, _metalAssign) {
  'use strict';

  var BaseModel = _metalCoreObject['default'].extend({
    constructor: function constructor() {
      var attrs = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var metaAttrs = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      this.attrs = attrs;

      (0, _metalAssign['default'])(this, metaAttrs);
    },
    attrs: null,
    serializer: null,
    adapter: null,
    shopClient: null
  });

  exports['default'] = BaseModel;
});
define('shopify-buy/models/cart-model', ['exports', './base-model', '../metal/assign', '../metal/set-guid-for'], function (exports, _baseModel, _metalAssign, _metalSetGuidFor) {
  'use strict';

  var _slice = Array.prototype.slice;

  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

  function objectsEqual(one, two) {
    if (one === two) {
      return true;
    }

    return Object.keys(one).every(function (key) {
      if (one[key] instanceof Date) {
        return one[key].toString() === two[key].toString();
      } else if (typeof one[key] === 'object') {
        return objectsEqual(one[key], two[key]);
      }

      return one[key] === two[key];
    });
  }

  var CartModel = _baseModel['default'].extend(Object.defineProperties({

    /**
      * Class for cart model
      * @class CartModel
      * @constructor
    */
    constructor: function constructor() {
      this['super'].apply(this, arguments);
    },

    /**
      * Add items to cart. Updates cart's `lineItems`
      * ```javascript
      * cart.addVariants({id: 123, quantity: 1}).then(cart => {
      *   // do things with the updated cart.
      * });
      * ```
      * @method addVariants
      * @param {Object} item - One or more variants
      * @param {Object} item.variant - variant hash
      * @param {Number} item.quantity - quantity
      * @param {Object} [nextItem...] - further lineItems may be passed
      * @public
      * @return {Promise|CartModel} - updated cart instance.
    */
    addVariants: function addVariants() {
      var newLineItems = [].concat(_slice.call(arguments)).map(function (item) {
        var lineItem = Object.defineProperties({
          image: item.variant.image,
          variant_id: item.variant.id,
          product_id: item.variant.productId,
          title: item.variant.productTitle,
          quantity: parseInt(item.quantity, 10),
          properties: item.properties || {},
          variant_title: item.variant.title,
          price: item.variant.price,
          compare_at_price: item.variant.compareAtPrice,

          grams: item.variant.grams
        }, {
          id: {
            get: function get() {
              return this[_metalSetGuidFor.GUID_KEY];
            },
            configurable: true,
            enumerable: true
          },
          line_price: {
            get: function get() {
              return (this.quantity * parseFloat(this.price)).toFixed(2);
            },
            configurable: true,
            enumerable: true
          }
        });

        (0, _metalSetGuidFor['default'])(lineItem);

        return lineItem;
      });
      var existingLineItems = this.lineItems;

      existingLineItems.push.apply(existingLineItems, _toConsumableArray(newLineItems));

      var dedupedLineItems = existingLineItems.reduce(function (itemAcc, item) {
        var matchingItem = itemAcc.filter(function (existingItem) {
          return existingItem.variant_id === item.variant_id && objectsEqual(existingItem.properties, item.properties);
        })[0];

        if (matchingItem) {
          matchingItem.quantity = matchingItem.quantity + item.quantity;
        } else {
          itemAcc.push(item);
        }

        return itemAcc;
      }, []);

      // Users may pass negative numbers and remove items. This ensures there's no
      // item with a quantity of zero or less.
      this.attrs.line_items = dedupedLineItems.reduce(function (itemAcc, item) {
        if (item.quantity >= 1) {
          itemAcc.push(item);
        }

        return itemAcc;
      }, []);

      return this.updateModel();
    },

    /**
      * Update line item quantity
      * ```javascript
      * cart.updateLineItem(123, 2}).then(cart => {
      *   // do things with the updated cart.
      * });
      * ```
      * @method updateLineItem
      * @param {Number} id - line item ID
      * @param {Number} quantity - new quantity for line item
      * @throws {Error} if line item with ID is not in cart.
      * @public
      * @return {Promise|CartModel} - updated cart instance
    */
    updateLineItem: function updateLineItem(id, quantity) {
      if (quantity < 1) {
        return this.removeLineItem(id);
      }

      var lineItem = this.lineItems.filter(function (item) {
        return item.id === id;
      })[0];

      if (lineItem) {
        lineItem.quantity = quantity;

        return this.updateModel();
      }

      return new Promise(function (resolve, reject) {
        reject(new Error('line item with id: ' + id + ' not found in cart#' + this.id));
      });
    },

    /**
      * Remove line item from cart
      * @method removeLineItem
      * @param {Number} id - line item ID
      * @throws {Error} if line item with ID is not in cart.
      * @public
      * @return {Promise|CartModel} - updated cart instance
    */
    removeLineItem: function removeLineItem(id) {
      var oldLength = this.lineItems.length;
      var newLineItems = this.lineItems.filter(function (item) {
        return item.id !== id;
      });
      var newLength = newLineItems.length;

      if (newLength < oldLength) {
        this.attrs.line_items = newLineItems;

        return this.updateModel();
      }

      return new Promise(function (resolve, reject) {
        reject(new Error('line item with id: ' + id + ' not found in cart#' + this.id));
      });
    },

    /**
      * Remove all line items from cart
      * @method clearLineItems
      * @public
      * @return {Promise|CartModel} - updated cart instance
    */
    clearLineItems: function clearLineItems() {
      this.attrs.line_items = [];

      return this.updateModel();
    },

    /**
      * force update of cart model on server
      * @method updateModel
      * @public
      * @return {Promise|CartModel} - updated cart instance
    */
    updateModel: function updateModel() {
      var _this = this;

      return this.shopClient.update('carts', this).then(function (updateCart) {
        (0, _metalAssign['default'])(_this.attrs, updateCart.attrs);

        return _this;
      });
    }
  }, {
    id: {
      get: function get() {
        return this.attrs[_metalSetGuidFor.GUID_KEY];
      },
      configurable: true,
      enumerable: true
    },
    lineItems: {

      /**
        * Get current line items for cart
        * @property lineItems
        * @type {Array}
      */

      get: function get() {
        return this.attrs.line_items || [];
      },
      configurable: true,
      enumerable: true
    },
    subtotal: {

      /**
        * Get current subtotal price for all line items
        * @property subtotal
        * @type {String}
      */

      get: function get() {
        var subtotal = this.lineItems.reduce(function (runningTotal, lineItem) {
          return runningTotal + parseFloat(lineItem.line_price);
        }, 0);

        return subtotal.toFixed(2);
      },
      configurable: true,
      enumerable: true
    },
    checkoutUrl: {
      get: function get() {
        var config = this.config;
        var baseUrl = 'https://' + config.myShopifyDomain + '.myshopify.com/cart';

        var variantPath = this.lineItems.map(function (item) {
          return item.variant_id + ':' + item.quantity;
        });

        var query = 'api_key=' + config.apiKey;

        return baseUrl + '/' + variantPath + '?' + query;
      },
      configurable: true,
      enumerable: true
    }
  }));

  exports['default'] = CartModel;
});
define('shopify-buy/models/product-model', ['exports', './base-model', './product-option-model', './product-variant-model', '../metal/uniq'], function (exports, _baseModel, _productOptionModel, _productVariantModel, _metalUniq) {
  'use strict';

  /**
     * Class for products returned by fetch('product')
     * @class ProductModel
     * @constructor
   */
  var ProductModel = _baseModel['default'].extend(Object.defineProperties({
    constructor: function constructor() {
      this['super'].apply(this, arguments);
    }

  }, {
    id: {
      get: function get() {
        return this.attrs.product_id;
      },
      configurable: true,
      enumerable: true
    },
    title: {
      get: function get() {
        return this.attrs.title;
      },
      configurable: true,
      enumerable: true
    },
    images: {
      get: function get() {
        return this.attrs.images;
      },
      configurable: true,
      enumerable: true
    },
    memoized: {
      get: function get() {
        this._memoized = this._memoized || {};

        return this._memoized;
      },
      configurable: true,
      enumerable: true
    },
    options: {

      /**
         *  Get array of options with nested values. Useful for creating UI for selecting options.
         *
         * ```javascript
         *  var elements = product.options.map(function(option) {
         *    return '<select name="' + option.name + '">' + option.values.map(function(value) {
         *      return '<option value="' + value + '">' + value + '</option>';
         *    }) + '</select>';
         *  });
         * ```
         *
         * @attribute options
         * @type {Array|Option}
       */

      get: function get() {
        if (this.memoized.options) {
          return this.memoized.options;
        }

        var baseOptions = this.attrs.options;
        var variants = this.variants;

        this.memoized.options = baseOptions.map(function (option) {
          var name = option.name;

          var dupedValues = variants.reduce(function (valueList, variant) {
            var optionValueForOption = variant.optionValues.filter(function (optionValue) {
              return optionValue.name === option.name;
            })[0];

            valueList.push(optionValueForOption.value);

            return valueList;
          }, []);

          var values = (0, _metalUniq['default'])(dupedValues);

          return new _productOptionModel['default']({ name: name, values: values });
        });

        return this.memoized.options;
      },
      configurable: true,
      enumerable: true
    },
    variants: {
      get: function get() {
        var _this = this;

        return this.attrs.variants.map(function (variant) {
          return new _productVariantModel['default']({ variant: variant, product: _this }, { config: _this.config });
        });
      },
      configurable: true,
      enumerable: true
    },
    selections: {

      /**
        * Retrieve currently selected option values.
        * @attribute selections
        * @type {Option}
       */

      get: function get() {
        return this.options.map(function (option) {
          return option.selected;
        });
      },
      configurable: true,
      enumerable: true
    },
    selectedVariant: {

      /**
        * Retrieve variant for currently selected options
        * @attribute selectedVariant
        * @type {Object}
      */

      get: function get() {
        var variantTitle = this.selections.join(' / ');

        return this.variants.filter(function (variant) {
          return variant.title === variantTitle;
        })[0];
      },
      configurable: true,
      enumerable: true
    },
    selectedVariantImage: {

      /**
        * Retrieve image for currently selected variantImage
        * @attribute selectedVariantImage
        * @type {Object}
      */

      get: function get() {
        return this.selectedVariant.image;
      },
      configurable: true,
      enumerable: true
    }
  }));

  exports['default'] = ProductModel;
});
define('shopify-buy/models/product-option-model', ['exports', './base-model', '../metal/includes'], function (exports, _baseModel, _metalIncludes) {
  'use strict';

  /**
    * Class for product option
    * @class Option
    * @constructor
  */
  var ProductOptionModel = _baseModel['default'].extend(Object.defineProperties({
    constructor: function constructor() {
      this['super'].apply(this, arguments);

      this.selected = this.values[0];
    }

  }, {
    name: { /**
              * name of option (ex. "Size", "Color")
              * @property name
              * @type String
            */

      get: function get() {
        return this.attrs.name;
      },
      configurable: true,
      enumerable: true
    },
    values: {

      /**
        * possible values for selection
        * @property values
        * @type Array
      */

      get: function get() {
        return this.attrs.values;
      },
      configurable: true,
      enumerable: true
    },
    selected: {

      /**
        * get/set selected option value (ex. "Large"). Setting this will update the
        * selected value on the model. Throws {Error} if setting selected to value that does not exist for option
        * @property selected
        * @type String
      */

      get: function get() {
        return this._selected;
      },
      set: function set(value) {
        if ((0, _metalIncludes['default'])(this.values, value)) {
          this._selected = value;
        } else {
          throw new Error('Invalid option selection for ' + this.name + '.');
        }

        return value;
      },
      configurable: true,
      enumerable: true
    }
  }));

  exports['default'] = ProductOptionModel;
});
define('shopify-buy/models/product-variant-model', ['exports', './base-model'], function (exports, _baseModel) {
  'use strict';

  /**
    * Model for product variant
    * @class ProductVariantModel
    * @constructor
  */
  var ProductVariantModel = _baseModel['default'].extend(Object.defineProperties({
    constructor: function constructor() {
      this['super'].apply(this, arguments);
    },

    checkoutUrl: function checkoutUrl() {
      var quantity = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

      var config = this.config;
      var baseUrl = 'https://' + config.myShopifyDomain + '.myshopify.com/cart';

      var variantPath = this.id + ':' + parseInt(quantity, 10);

      var query = 'api_key=' + config.apiKey;

      return baseUrl + '/' + variantPath + '?' + query;
    }
  }, {
    id: {
      get: function get() {
        return this.attrs.variant.id;
      },
      configurable: true,
      enumerable: true
    },
    productId: {
      get: function get() {
        return this.attrs.product.id;
      },
      configurable: true,
      enumerable: true
    },
    title: {
      get: function get() {
        return this.attrs.variant.title;
      },
      configurable: true,
      enumerable: true
    },
    productTitle: {
      get: function get() {
        return this.attrs.product.title;
      },
      configurable: true,
      enumerable: true
    },
    compareAtPrice: {
      get: function get() {
        return this.attrs.variant.compare_at_price;
      },
      configurable: true,
      enumerable: true
    },
    price: {
      get: function get() {
        return this.attrs.variant.price;
      },
      configurable: true,
      enumerable: true
    },
    grams: {
      get: function get() {
        return this.attrs.variant.grams;
      },
      configurable: true,
      enumerable: true
    },
    optionValues: {
      get: function get() {
        return this.attrs.variant.option_values;
      },
      configurable: true,
      enumerable: true
    },
    image: {
      get: function get() {
        var id = this.id;
        var images = this.attrs.product.images;

        var primaryImage = images[0];
        var variantImage = images.filter(function (image) {
          return image.variant_ids.indexOf(id) !== -1;
        })[0];

        return variantImage || primaryImage;
      },
      configurable: true,
      enumerable: true
    }
  }));

  exports['default'] = ProductVariantModel;
});
define("promise", ["exports"], function (exports) {
  "use strict";

  var RSVP = window.RSVP;
  var Promise = RSVP.Promise;

  exports.RSVP = RSVP;
  exports.Promise = Promise;
  exports["default"] = Promise;
});
define('shopify-buy/serializers/cart-serializer', ['exports', '../metal/core-object', '../metal/assign', '../models/cart-model'], function (exports, _metalCoreObject, _metalAssign, _modelsCartModel) {
  'use strict';

  var CartSerializer = _metalCoreObject['default'].extend({
    constructor: function constructor(config) {
      this.config = config;
    },

    rootKeyForType: function rootKeyForType(type) {
      return type.slice(0, -1);
    },

    modelForType: function modelForType() /* type */{
      return _modelsCartModel['default'];
    },

    deserializeSingle: function deserializeSingle(type) {
      var singlePayload = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var metaAttrs = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      var modelAttrs = singlePayload[this.rootKeyForType(type)];
      var model = this.modelFromAttrs(type, modelAttrs, metaAttrs);

      return model;
    },

    modelFromAttrs: function modelFromAttrs(type, attrs, metaAttrs) {
      var Model = this.modelForType(type);

      metaAttrs.config = this.config;

      return new Model(attrs, metaAttrs);
    },

    serialize: function serialize(type, model) {
      var root = this.rootKeyForType(type);
      var payload = {};
      var attrs = (0, _metalAssign['default'])({}, model.attrs);

      payload[root] = attrs;

      delete attrs.attributes;

      Object.keys(attrs).forEach(function (key) {
        var value = attrs[key];

        if (value === null || typeof value === 'string' && value.length === 0) {
          delete attrs[key];
        }
      });

      return payload;
    }
  });

  exports['default'] = CartSerializer;
});
define('shopify-buy/serializers/listings-serializer', ['exports', '../metal/core-object', '../models/base-model', '../models/product-model'], function (exports, _metalCoreObject, _modelsBaseModel, _modelsProductModel) {
  'use strict';

  var ListingsSerializer = _metalCoreObject['default'].extend({
    constructor: function constructor(config) {
      this.config = config;
    },

    rootKeyForType: function rootKeyForType(type) {
      return type.slice(0, -1) + '_listing';
    },

    models: {
      collections: _modelsBaseModel['default'],
      products: _modelsProductModel['default']
    },

    modelForType: function modelForType(type) {
      return this.models[type];
    },

    deserializeSingle: function deserializeSingle(type) {
      var singlePayload = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var metaAttrs = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      var modelAttrs = singlePayload[this.rootKeyForType(type)];
      var model = this.modelFromAttrs(type, modelAttrs, metaAttrs);

      return model;
    },

    deserializeMultiple: function deserializeMultiple(type) {
      var _this = this;

      var collectionPayload = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var metaAttrs = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      var models = collectionPayload[this.rootKeyForType(type) + 's'];

      return models.map(function (attrs) {
        var model = _this.modelFromAttrs(type, attrs, metaAttrs);

        return model;
      });
    },

    modelFromAttrs: function modelFromAttrs(type, attrs, metaAttrs) {
      var Model = this.modelForType(type);

      metaAttrs.config = this.config;

      return new Model(attrs, metaAttrs);
    }
  });

  exports['default'] = ListingsSerializer;
});
define('shopify-buy/shop-client', ['exports', './serializers/listings-serializer', './adapters/listings-adapter', './serializers/cart-serializer', './adapters/local-storage-adapter', './metal/core-object', './metal/assign'], function (exports, _serializersListingsSerializer, _adaptersListingsAdapter, _serializersCartSerializer, _adaptersLocalStorageAdapter, _metalCoreObject, _metalAssign) {
  'use strict';

  var _slice = Array.prototype.slice;

  /**
   * @module shopify-buy
   * @submodule shop-client
   */

  function fetchFactory(fetchType, type) {
    var func = undefined;

    switch (fetchType) {
      case 'all':
        func = function () {
          return this.fetchAll(type);
        };
        break;
      case 'one':
        func = function () {
          return this.fetch.apply(this, [type].concat(_slice.call(arguments)));
        };
        break;
      case 'query':
        func = function () {
          return this.fetchQuery.apply(this, [type].concat(_slice.call(arguments)));
        };
        break;
    }

    return func;
  }

  var ShopClient = _metalCoreObject['default'].extend(Object.defineProperties({
    /**
     * @class ShopClient
     * @constructor
     * @param {Config} [config] Config data to be used throughout all API
     * interaction
     */
    constructor: function constructor(config) {
      this.config = config;

      this.serializers = {
        products: _serializersListingsSerializer['default'],
        collections: _serializersListingsSerializer['default'],
        carts: _serializersCartSerializer['default']
      };

      this.adapters = {
        products: _adaptersListingsAdapter['default'],
        collections: _adaptersListingsAdapter['default'],
        carts: _adaptersLocalStorageAdapter['default']
      };
    },

    config: null,

    /**
     * Fetch all of a `type`, returning a promise.
     *
     * ```javascript
     * client.fetchAll('products').then(products => {
     *   // do things with products
     * });
     * ```
     *
     * @method fetchAll
     * @public
     * @param {String} type The pluralized name of the type, in lower case.
     * @return {Promise|Array} a promise resolving with an array of `type`
     */
    fetchAll: function fetchAll(type) {
      var _this = this;

      var adapter = new this.adapters[type](this.config);

      return adapter.fetchMultiple(type).then(function (payload) {
        return _this.deserialize(type, payload, adapter, null, { multiple: true });
      });
    },

    /**
     * Fetch one of a `type`, returning a promise.
     *
     * ```javascript
     * client.fetch('products', 123).then(product => {
     *   // do things with the product
     * });
     * ```
     *
     * @method fetch
     * @public
     * @param {String} type The pluralized name of the type, in lower case.
     * @param {String|Number} id a unique identifier
     * @return {Promise|BaseModel} a promise resolving with a single instance of
     * `type` expressed as a `BaseModel`.
     */
    fetch: function fetch(type, id) {
      var _this2 = this;

      var adapter = new this.adapters[type](this.config);

      return adapter.fetchSingle(type, id).then(function (payload) {
        return _this2.deserialize(type, payload, adapter, null, { single: true });
      });
    },

    /**
     * Fetch many of a `type`, that match `query`
     *
     * ```javascript
     * client.fetchQuery('products', { collection_id: 456 }).then(products => {
     *   // do things with the products
     * });
     * ```
     *
     * @method fetchQuery
     * @public
     * @param {String} type The pluralized name of the type, in lower case.
     * @param {Object} query a query sent to the api server.
     * @return {Promise|Array} a promise resolving with an array of `type`.
     */
    fetchQuery: function fetchQuery(type, query) {
      var _this3 = this;

      var adapter = new this.adapters[type](this.config);

      return adapter.fetchMultiple(type, query).then(function (payload) {
        return _this3.deserialize(type, payload, adapter, null, { multiple: true });
      });
    },

    /**
     * Create an instance of `type`, optionally including `attrs`.
     *
     * ```javascript
     * client.create('carts', { line_items: [ ... ] }).then(cart => {
     *   // do things with the cart.
     * });
     * ```
     *
     * @method create
     * @public
     * @param {String} type The pluralized name of the type, in lower case.
     * @param {Object} [modelAttr={}] attributes representing the internal state
     * of the model to be persisted to the server.
     * @return {Promise|CartModel} a promise resolving with a single instance of
     * `type`
     */
    create: function create(type) {
      var _this4 = this;

      var modelAttrs = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var adapter = new this.adapters[type](this.config);
      var serializer = new this.serializers[type](this.config);
      var Model = serializer.modelForType(type);
      var model = new Model(modelAttrs, { shopClient: this });
      var attrs = serializer.serialize(type, model);

      return adapter.create(type, attrs).then(function (payload) {
        return _this4.deserialize(type, payload, adapter, serializer, { single: true });
      });
    },

    /**
     * Create an instance of `type`, optionally including `attrs`.
     *
     * ```javascript
     * client.create('carts', { line_items: [ ... ] }).then(cart => {
     *   // do things with the cart.
     * });
     * ```
     *
     * @method update
     * @public
     * @param {String} type The pluralized name of the type, in lower case.
     * @param {BaseModel} updatedModel The model that represents new state to
     * to persist to the server.
     * @return {Promise|CartModel} a promise resolving with a single instance of
     * `type`
     */
    update: function update(type, updatedModel) {
      var _this5 = this;

      var adapter = updatedModel.adapter;
      var serializer = updatedModel.serializer;
      var serializedModel = serializer.serialize(type, updatedModel);
      var id = updatedModel.attrs[adapter.idKeyForType(type)];

      return adapter.update(type, id, serializedModel).then(function (payload) {
        return _this5.deserialize(type, payload, adapter, serializer, { single: true });
      });
    },

    /**
     * Proxy to serializer's deserialize.
     *
     * @method deserialize
     * @private
     * @param {String} type The pluralized name of the type, in lower case.
     * @param {Object} payload The raw payload returned by the adapter.
     * @param {BaseAdapter} adapter The adapter that yielded the payload.
     * @param {BaseSerializer} existingSerializer The serializer to attach. If
     * none is passed, then `this.deserialize` will create one for the type.
     * @param {Object} opts Options that determine which deserialization method to
     * use.
     * @param {Boolean} opts.multiple true when the payload represents multiple
     * models
     * @param {Boolean} opts.single true when the payload represents one model.
     * @return {BaseModel} an instance of `type` reified into a model.
     */
    deserialize: function deserialize(type, payload, adapter, existingSerializer) {
      var opts = arguments.length <= 4 || arguments[4] === undefined ? {} : arguments[4];

      var serializer = existingSerializer || new this.serializers[type](this.config);
      var meta = { shopClient: this, adapter: adapter, serializer: serializer, type: type };
      var serializedPayload = undefined;

      if (opts.multiple) {
        serializedPayload = serializer.deserializeMultiple(type, payload, meta);
      } else {
        serializedPayload = serializer.deserializeSingle(type, payload, meta);
      }

      return serializedPayload;
    },

    createCart: function createCart() {
      var userAttrs = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var baseAttrs = {
        line_items: []
      };
      var attrs = {};

      (0, _metalAssign['default'])(attrs, baseAttrs);
      (0, _metalAssign['default'])(attrs, userAttrs);

      return this.create('carts', attrs);
    },

    updateCart: function updateCart(updatedCart) {
      return this.update('carts', updatedCart);
    },

    fetchCart: fetchFactory('one', 'carts'),

    /**
     * Convenience wrapper for {{#crossLink "ShopClient/fetchAll:method"}}
     * {{/crossLink}}. Equivalent to:
     *
     * ```javascript
     * client.fetchAll('products');
     * ```
     *
     * @method fetchAllProducts
     * @public
     * @return {Promise|Array} The product models.
     */
    fetchAllProducts: fetchFactory('all', 'products'),

    /**
     * Convenience wrapper for {{#crossLink "ShopClient/fetchAll:method"}}
     * {{/crossLink}}. Equivalent to:
     *
     * ```javascript
     * client.fetchAll('collections');
     * ```
     *
     * @method fetchAllCollections
     * @public
     * @return {Promise|Array} The collection models.
     */
    fetchAllCollections: fetchFactory('all', 'collections'),

    /**
     * Convenience wrapper for {{#crossLink "ShopClient/fetch:method"}}
     * {{/crossLink}}. Equivalent to:
     *
     * ```javascript
     * client.fetch('products', 123);
     * ```
     *
     * @method fetchProduct
     * @public
     * @param {String|Number} id a unique identifier
     * @return {Promise|BaseModel} The product model.
     */
    fetchProduct: fetchFactory('one', 'products'),

    /**
     * Convenience wrapper for {{#crossLink "ShopClient/fetch:method"}}
     * {{/crossLink}}. Equivalent to:
     *
     * ```javascript
     * client.fetch('collections', 123);
     * ```
     *
     * @method fetchCollection
     * @public
     * @param {String|Number} id a unique identifier
     * @return {Promise|BaseModel} The collection model.
     */
    fetchCollection: fetchFactory('one', 'collections'),

    /**
     * Convenience wrapper for {{#crossLink "ShopClient/fetchQuery:method"}}
     * {{/crossLink}}. Equivalent to:
     *
     * ```javascript
     * client.fetchQuery('products', { query: 'options' });
     * ```
     *
     * @method fetchQueryProducts
     * @public
     * @param {Object} query a query sent to the api server.
     * @return {Promise|Array} The product models.
     */
    fetchQueryProducts: fetchFactory('query', 'products'),

    /**
     * Convenience wrapper for {{#crossLink "ShopClient/fetchQuery:method"}}
     * {{/crossLink}}. Equivalent to:
     *
     * ```javascript
     * client.fetchQuery('collections', { query: 'options' });
     * ```
     *
     * @method fetchQueryCollections
     * @public
     * @param {Object} query a query sent to the api server.
     * @return {Promise|Array} The collection models.
     */
    fetchQueryCollections: fetchFactory('query', 'collections')
  }, {
    serializers: { /**
                    * @attribute
                    * @default {
                    *  products: ListingsAdapter,
                    *  collections: ListingsAdapter,
                    *  carts: CartAdapter
                    * }
                    * @type Object
                    * @protected
                    */
      // Prevent leaky state

      get: function get() {
        return (0, _metalAssign['default'])({}, this.shadowedSerializers);
      },
      set: function set(values) {
        this.shadowedSerializers = (0, _metalAssign['default'])({}, values);
      },
      configurable: true,
      enumerable: true
    },
    adapters: {
      get: function get() {
        return (0, _metalAssign['default'])({}, this.shadowedAdapters);
      },
      set: function set(values) {
        this.shadowedAdapters = (0, _metalAssign['default'])({}, values);
      },
      configurable: true,
      enumerable: true
    }
  }));

  exports['default'] = ShopClient;
});
define('shopify-buy/shopify', ['exports', './config', './shop-client', './isomorphic-fetch', './isomorphic-btoa'], function (exports, _config, _shopClient, _isomorphicFetch, _isomorphicBtoa) {
  'use strict';

  /**
   * @module shopify-buy
   * @submodule shopify
   */

  /**
   * This namespace contains all globally accessible classes
   * @class ShopifyBuy
   * @static
   */
  var Shopify = {
    ShopClient: _shopClient['default'],
    Config: _config['default'],

    /**
     * Create a ShopClient. This is the main entry point to the SDK.
     *
     * ```javascript
     * const client = ShopifyBuy.buildClient({
     *   apiKey: 'abc123',
     *   appId: 123456,
     *   myShopifyDomain: 'myshop'
     * });
     * ```
     *
     * @method buildClient
     * @for ShopifyBuy
     * @static
     * @public
     * @param {Object} configAttrs A hash of required config data.
     * @param {String} configAttrs.apiKey Your api client's public token.
     * @param {String} configAttrs.appId The app whose listings the client will be
     * using. If you are just modifying a buy button, the buy-button's app id is
     * 6. Otherwise, obtain the app id of the app you're modifying or extending.
     * @param {String} configAttrs.myShopifyDomain You shop's `myshopify.com`
     * domain.
     * @return {ShopClient} a client for the shop using your api credentials.
     */
    buildClient: function buildClient() {
      var configAttrs = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var config = new this.Config(configAttrs);

      return new this.ShopClient(config);
    }
  };

  exports['default'] = Shopify;
});

window.ShopifyBuy = require('shopify-buy/shopify').default;
}());
