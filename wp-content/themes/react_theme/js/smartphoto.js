
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SmartPhoto = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('ie-array-find-polyfill');

var _morphdom = require('morphdom');

var _morphdom2 = _interopRequireDefault(_morphdom);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var eventType = 'input paste copy click change keydown keyup keypress contextmenu mouseup mousedown mousemove touchstart touchend touchmove compositionstart compositionend focus';
var bindType = 'input change click';
var dataAction = eventType.replace(/([a-z]+)/g, '[data-action-$1],') + '[data-action]';

var aTemplate = function () {
  function aTemplate(opt) {
    var _this = this;

    _classCallCheck(this, aTemplate);

    this.atemplate = [];
    this.events = [];
    if (opt) {
      Object.keys(opt).forEach(function (key) {
        _this[key] = opt[key];
      });
    }
    if (!this.data) {
      this.data = {};
    }
    if (!this.templates) {
      this.templates = [];
    }
    var templates = this.templates;
    var length = templates.length;
    for (var i = 0, n = length; i < n; i += 1) {
      var template = this.templates[i];
      var html = (0, _util.selector)('#' + template).innerHTML;
      this.atemplate.push({ id: template, html: html, binded: false });
    }
  }

  _createClass(aTemplate, [{
    key: 'addDataBind',
    value: function addDataBind(ele) {
      var _this2 = this;

      (0, _util.on)(ele, '[data-bind]', bindType, function (e) {
        var target = e.delegateTarget;
        var data = target.getAttribute('data-bind');
        var attr = target.getAttribute('href');
        var value = target.value;
        if (attr) {
          value = value.replace('#', '');
        }
        if (target.getAttribute('type') === 'checkbox') {
          (function () {
            var arr = [];
            var items = document.querySelectorAll('[data-bind="' + data + '"]');
            [].forEach.call(items, function (item) {
              if (item.checked) {
                arr.push(item.value);
              }
            });
          })();
        } else if (target.getAttribute('type') !== 'radio') {
          _this2.updateDataByString(data, value);
        }
      });
      this.events.push({
        element: ele,
        selector: '[data-bind]',
        event: bindType
      });
    }
  }, {
    key: 'addActionBind',
    value: function addActionBind(ele) {
      var _this3 = this;

      (0, _util.on)(ele, dataAction, eventType, function (e) {
        var target = e.delegateTarget;
        var events = eventType.split(' ');
        var action = 'action';
        events.forEach(function (event) {
          if (target.getAttribute('data-action-' + event)) {
            if (e.type === event) {
              action += '-' + event;
            }
          }
        });
        var string = target.getAttribute('data-' + action);
        if (!string) {
          return;
        }
        var method = string.replace(/\(.*?\);?/, '');
        var parameter = string.replace(/(.*?)\((.*?)\);?/, '$2');
        var pts = parameter.split(','); // 引き数
        _this3.e = e;
        if (_this3.method && _this3.method[method]) {
          var _method;

          (_method = _this3.method)[method].apply(_method, _toConsumableArray(pts));
        } else if (_this3[method]) {
          _this3[method].apply(_this3, _toConsumableArray(pts));
        }
      });
      this.events.push({
        element: ele,
        selector: dataAction,
        event: bindType
      });
    }
  }, {
    key: 'removeTemplateEvents',
    value: function removeTemplateEvents() {
      this.events.forEach(function (event) {
        (0, _util.off)(event.element, event.selector, event.event);
      });
    }
  }, {
    key: 'addTemplate',
    value: function addTemplate(id, html) {
      this.atemplate.push({ id: id, html: html, binded: false });
      this.templates.push(id);
    }

    // loadHtml() {
    //   const templates = this.templates;
    //   const promises = [];
    //   templates.forEach((template) => {
    //     const d = new $.Deferred();
    //     promises.push(d);
    //     const src = selector(`#${template}`).getAttribute('src');
    //     $.ajax({
    //       url: src,
    //       type: 'GET',
    //       dataType: 'text'
    //     }).success((data) => {
    //       selector(`#${template}`).innerHTML = data;
    //       d.resolve();
    //     });
    //   });
    //   return $.when(...promises);
    // }

  }, {
    key: 'getData',
    value: function getData() {
      return JSON.parse(JSON.stringify(this.data));
    }
  }, {
    key: 'saveData',
    value: function saveData(key) {
      var data = JSON.stringify(this.data);
      localStorage.setItem(key, data);
    }
  }, {
    key: 'setData',
    value: function setData(opt) {
      var _this4 = this;

      Object.keys(opt).forEach(function (key) {
        if (typeof opt[key] !== 'function') {
          _this4.data[key] = opt[key];
        }
      });
    }
  }, {
    key: 'loadData',
    value: function loadData(key) {
      var data = JSON.parse(localStorage.getItem(key));
      if (data) {
        this.setData(data);
      }
    }
  }, {
    key: 'getRand',
    value: function getRand(a, b) {
      return ~~(Math.random() * (b - a + 1)) + a;
    }
  }, {
    key: 'getRandText',
    value: function getRandText(limit) {
      var ret = '';
      var strings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var length = strings.length;
      for (var i = 0; i < limit; i += 1) {
        ret += strings.charAt(Math.floor(this.getRand(0, length)));
      }
      return ret;
    }
  }, {
    key: 'getDataFromObj',
    value: function getDataFromObj(s, o) {
      s = s.replace(/\[([\w\-\.ぁ-んァ-ヶ亜-熙]+)\]/g, '.$1'); // convert indexes to properties
      s = s.replace(/^\./, ''); // strip leading dot
      var a = s.split('.');
      while (a.length) {
        var n = a.shift();
        if (n in o) {
          o = o[n];
        } else {
          return null;
        }
      }
      return o;
    }
  }, {
    key: 'getDataByString',
    value: function getDataByString(s) {
      var o = this.data;
      return this.getDataFromObj(s, o);
    }
  }, {
    key: 'updateDataByString',
    value: function updateDataByString(path, newValue) {
      var object = this.data;
      var stack = path.split('.');
      while (stack.length > 1) {
        object = object[stack.shift()];
      }
      object[stack.shift()] = newValue;
    }
  }, {
    key: 'removeDataByString',
    value: function removeDataByString(path) {
      var object = this.data;
      var stack = path.split('.');
      while (stack.length > 1) {
        object = object[stack.shift()];
      }
      var shift = stack.shift();
      if (shift.match(/^\d+$/)) {
        object.splice(Number(shift), 1);
      } else {
        delete object[shift];
      }
    }
  }, {
    key: 'resolveBlock',
    value: function resolveBlock(html, item, i) {
      var that = this;
      var touchs = html.match(/<!-- BEGIN ([\w\-\.ぁ-んァ-ヶ亜-熙]+):touch#([\w\-\.ぁ-んァ-ヶ亜-熙]+) -->/g);
      var touchnots = html.match(/<!-- BEGIN ([\w\-\.ぁ-んァ-ヶ亜-熙]+):touchnot#([\w\-\.ぁ-んァ-ヶ亜-熙]+) -->/g);
      var exists = html.match(/<!-- BEGIN ([\w\-\.ぁ-んァ-ヶ亜-熙]+):exist -->/g);
      var empties = html.match(/<!-- BEGIN ([\w\-\.ぁ-んァ-ヶ亜-熙]+):empty -->/g);
      /* タッチブロック解決*/
      if (touchs) {
        for (var k = 0, n = touchs.length; k < n; k += 1) {
          var start = touchs[k];
          start = start.replace(/([\w\-\.ぁ-んァ-ヶ亜-熙]+):touch#([\w\-\.ぁ-んァ-ヶ亜-熙]+)/, '($1):touch#($2)');
          var end = start.replace(/BEGIN/, 'END');
          var reg = new RegExp(start + '(([\\n\\r\\t]|.)*?)' + end, 'g');
          html = html.replace(reg, function (m, key2, val, next) {
            var itemkey = typeof item[key2] === 'function' ? item[key2].apply(that) : that.getDataFromObj(key2, item);
            if ('' + itemkey === val) {
              return next;
            }
            return '';
          });
        }
      }
      /* タッチノットブロック解決*/
      if (touchnots) {
        for (var _k = 0, _n = touchnots.length; _k < _n; _k += 1) {
          var _start = touchnots[_k];
          _start = _start.replace(/([\w\-\.ぁ-んァ-ヶ亜-熙]+):touchnot#([\w\-\.ぁ-んァ-ヶ亜-熙]+)/, '($1):touchnot#($2)');
          var _end = _start.replace(/BEGIN/, 'END');
          var _reg = new RegExp(_start + '(([\\n\\r\\t]|.)*?)' + _end, 'g');
          html = html.replace(_reg, function (m, key2, val, next) {
            var itemkey = typeof item[key2] === 'function' ? item[key2].apply(that) : that.getDataFromObj(key2, item);
            if ('' + itemkey !== val) {
              return next;
            }
            return '';
          });
        }
      }
      /* existブロックを解決*/
      if (exists) {
        for (var _k2 = 0, _n2 = exists.length; _k2 < _n2; _k2 += 1) {
          var _start2 = exists[_k2];
          _start2 = _start2.replace(/([\w\-\.ぁ-んァ-ヶ亜-熙]+):exist/, '($1):exist');
          var _end2 = _start2.replace(/BEGIN/, 'END');
          var _reg2 = new RegExp(_start2 + '(([\\n\\r\\t]|.)*?)' + _end2, 'g');
          html = html.replace(_reg2, function (m, key2, next) {
            var itemkey = typeof item[key2] === 'function' ? item[key2].apply(that) : that.getDataFromObj(key2, item);
            if (itemkey || itemkey === 0) {
              return next;
            }
            return '';
          });
        }
      }
      /* emptyブロックを解決*/
      if (empties) {
        for (var _k3 = 0, _n3 = empties.length; _k3 < _n3; _k3 += 1) {
          var _start3 = empties[_k3];
          _start3 = _start3.replace(/([\w\-\.ぁ-んァ-ヶ亜-熙]+):empty/, '($1):empty');
          var _end3 = _start3.replace(/BEGIN/, 'END');
          var empty = new RegExp(_start3 + '(([\\n\\r\\t]|.)*?)' + _end3, 'g');
          html = html.replace(empty, function (m, key2, next) {
            var itemkey = typeof item[key2] === 'function' ? item[key2].apply(that) : that.getDataFromObj(key2, item);
            if (!itemkey && itemkey !== 0) {
              return next;
            }
            return '';
          });
        }
      }
      /* 変数解決*/
      html = html.replace(/{([\w\-\.ぁ-んァ-ヶ亜-熙]+)}(\[([\w\-\.ぁ-んァ-ヶ亜-熙]+)\])*/g, function (n, key3, key4, converter) {
        var data = void 0;
        if ('' + key3 === 'i') {
          data = i;
        } else if (item[key3] || item[key3] === 0) {
          if (typeof item[key3] === 'function') {
            data = item[key3].apply(that);
          } else {
            data = item[key3];
          }
        } else {
          if (converter && that.convert && that.convert[converter]) {
            return that.convert[converter].call(that, '');
          }
          return '';
        }
        if (converter && that.convert && that.convert[converter]) {
          return that.convert[converter].call(that, data);
        }
        return data;
      });
      return html;
    }
    /* 絶対パス形式の変数を解決*/

  }, {
    key: 'resolveAbsBlock',
    value: function resolveAbsBlock(html) {
      var that = this;
      html = html.replace(/{(.*?)}/g, function (n, key3) {
        var data = that.getDataByString(key3);
        if (typeof data !== 'undefined') {
          if (typeof data === 'function') {
            return data.apply(that);
          }
          return data;
        }
        return n;
      });
      return html;
    }
  }, {
    key: 'resolveInclude',
    value: function resolveInclude(html) {
      var include = /<!-- #include id="(.*?)" -->/g;
      html = html.replace(include, function (m, key) {
        return (0, _util.selector)('#' + key).innerHTML;
      });
      return html;
    }
  }, {
    key: 'resolveWith',
    value: function resolveWith(html) {
      var width = /<!-- BEGIN ([\w\-\.ぁ-んァ-ヶ亜-熙]+):with -->(([\n\r\t]|.)*?)<!-- END ([\w\-\.ぁ-んァ-ヶ亜-熙]+):with -->/g;
      html = html.replace(width, function (m, key) {
        m = m.replace(/data\-bind=['"](.*?)['"]/g, 'data-bind=\'' + key + '.$1\'');
        return m;
      });
      return html;
    }
  }, {
    key: 'resolveLoop',
    value: function resolveLoop(html) {
      var loop = /<!-- BEGIN ([\w\-\.ぁ-んァ-ヶ亜-熙]+?):loop -->(([\n\r\t]|.)*?)<!-- END ([\w\-\.ぁ-んァ-ヶ亜-熙]+?):loop -->/g;
      var that = this;
      /* ループ文解決*/
      html = html.replace(loop, function (m, key, val) {
        var keyItem = that.getDataByString(key);
        var keys = [];
        if (typeof keyItem === 'function') {
          keys = keyItem.apply(that);
        } else {
          keys = keyItem;
        }
        var ret = '';
        if (keys instanceof Array) {
          for (var i = 0, n = keys.length; i < n; i += 1) {
            ret += that.resolveBlock(val, keys[i], i);
          }
        }
        /* エスケープ削除*/
        ret = ret.replace(/\\([^\\])/g, '$1');
        return ret;
      });
      return html;
    }
  }, {
    key: 'removeData',
    value: function removeData(arr) {
      var data = this.data;
      Object.keys(data).forEach(function (i) {
        for (var t = 0, n = arr.length; t < n; t += 1) {
          if (i === arr[t]) {
            delete data[i];
          }
        }
      });
      return this;
    }
  }, {
    key: 'hasLoop',
    value: function hasLoop(txt) {
      var loop = /<!-- BEGIN ([\w\-\.ぁ-んァ-ヶ亜-熙]+?):loop -->(([\n\r\t]|.)*?)<!-- END ([\w\-\.ぁ-んァ-ヶ亜-熙]+?):loop -->/g;
      if (txt.match(loop)) {
        return true;
      }
      return false;
    }
  }, {
    key: 'getHtml',
    value: function getHtml(query, row) {
      var template = this.atemplate.find(function (item) {
        return item.id === query;
      });
      var html = '';
      if (template && template.html) {
        html = template.html;
      }
      if (row) {
        html = query;
      }
      if (!html) {
        return '';
      }
      var data = this.data;
      /* インクルード解決*/
      html = this.resolveInclude(html);
      /* with解決*/
      html = this.resolveWith(html);
      /* ループ解決*/
      while (this.hasLoop(html)) {
        html = this.resolveLoop(html);
      }
      /* 変数解決*/
      html = this.resolveBlock(html, data);
      /* エスケープ削除*/
      html = html.replace(/\\([^\\])/g, '$1');
      /* 絶対パスで指定された変数を解決*/
      html = this.resolveAbsBlock(html);
      /* 空行削除*/
      return html.replace(/^([\t ])*\n/gm, '');
    }
  }, {
    key: 'update',
    value: function update() {
      var _this5 = this;

      var renderWay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'html';
      var part = arguments[1];

      var templates = this.templates;
      if (this.beforeUpdated) {
        this.beforeUpdated();
      }

      var _loop = function _loop(i, n) {
        var tem = templates[i];
        var query = '#' + tem;
        var html = _this5.getHtml(tem);
        var target = (0, _util.selector)('[data-id=\'' + tem + '\']');
        if (!target) {
          (0, _util.selector)(query).insertAdjacentHTML('afterend', '<div data-id="' + tem + '"></div>');
          if (renderWay === 'text') {
            (0, _util.selector)('[data-id=\'' + tem + '\']').innerText = html;
          } else {
            (0, _util.selector)('[data-id=\'' + tem + '\']').innerHTML = html;
          }
        } else if (renderWay === 'text') {
          target.innerText = html;
        } else if (part) {
          var doc = document.createElement('div');
          doc.innerHTML = html;
          var partHtml = doc.querySelector(part).outerHTML;
          (0, _morphdom2.default)(target.querySelector(part), partHtml);
        } else {
          (0, _morphdom2.default)(target, '<div data-id=\'' + tem + '\'>' + html + '</div>');
        }
        var template = _this5.atemplate.find(function (item) {
          return item.id === tem;
        });
        if (!template.binded) {
          template.binded = true;
          _this5.addDataBind((0, _util.selector)('[data-id=\'' + tem + '\']'));
          _this5.addActionBind((0, _util.selector)('[data-id=\'' + tem + '\']'));
        }
      };

      for (var i = 0, n = templates.length; i < n; i += 1) {
        _loop(i, n);
      }
      this.updateBindingData(part);
      if (this.onUpdated) {
        this.onUpdated(part);
      }
      return this;
    }
  }, {
    key: 'updateBindingData',
    value: function updateBindingData(part) {
      var _this6 = this;

      var templates = this.templates;
      for (var i = 0, n = templates.length; i < n; i += 1) {
        var temp = templates[i];
        var _template = (0, _util.selector)('[data-id=\'' + temp + '\']');
        if (part) {
          _template = _template.querySelector(part);
        }
        var binds = _template.querySelectorAll('[data-bind]');
        [].forEach.call(binds, function (item) {
          var data = _this6.getDataByString(item.getAttribute('data-bind'));
          if (item.getAttribute('type') === 'checkbox' || item.getAttribute('type') === 'radio') {
            if (data === item.value) {
              item.checked = true;
            }
          } else {
            // if(item !== document.activeElement) {
            item.value = data;
            // }
          }
        });
        var onewaybinds = _template.querySelectorAll('[data-bind-oneway]');
        [].forEach.call(onewaybinds, function (item) {
          var data = _this6.getDataByString(item.getAttribute('data-bind-oneway'));
          if (item.getAttribute('type') === 'checkbox' || item.getAttribute('type') === 'radio') {
            if (data === item.value) {
              item.checked = true;
            }
          } else {
            // if(item !== document.activeElement) {
            item.value = data;
            // }
          }
        });
      }
      return this;
    }
  }, {
    key: 'applyMethod',
    value: function applyMethod(method) {
      var _method2;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return (_method2 = this.method)[method].apply(_method2, args);
    }
  }, {
    key: 'getComputedProp',
    value: function getComputedProp(prop) {
      return this.data[prop].apply(this);
    }
  }, {
    key: 'remove',
    value: function remove(path) {
      var object = this.data;
      var stack = path.split('.');
      while (stack.length > 1) {
        object = object[stack.shift()];
      }
      var shift = stack.shift();
      if (shift.match(/^\d+$/)) {
        object.splice(Number(shift), 1);
      } else {
        delete object[shift];
      }
      return this;
    }
  }]);

  return aTemplate;
}();

exports.default = aTemplate;
module.exports = exports['default'];
},{"./util":2,"ie-array-find-polyfill":5,"morphdom":6}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var matches = exports.matches = function matches(element, query) {
  var matches = (element.document || element.ownerDocument).querySelectorAll(query);
  var i = matches.length;
  while (--i >= 0 && matches.item(i) !== element) {}
  return i > -1;
};

var selector = exports.selector = function selector(_selector) {
  return document.querySelector(_selector);
};

var findAncestor = exports.findAncestor = function findAncestor(element, selector) {
  if (typeof element.closest === 'function') {
    return element.closest(selector) || null;
  }
  while (element && element !== document) {
    if (matches(element, selector)) {
      return element;
    }
    element = element.parentElement;
  }
  return null;
};

var listenerList = [];

var on = exports.on = function on(element, query, eventNames, fn) {
  var capture = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  var events = eventNames.split(' ');
  events.forEach(function (event) {
    var listener = function listener(e) {
      var delegateTarget = findAncestor(e.target, query);
      if (delegateTarget) {
        e.delegateTarget = delegateTarget;
        fn(e);
      }
    };
    listenerList.push({ listener: listener, element: element, query: query, event: event, capture: capture });
    element.addEventListener(event, listener, capture);
  });
};

var off = exports.off = function off(element, query, eventNames) {
  var events = eventNames.split(' ');
  events.forEach(function (event) {
    listenerList.forEach(function (item, index) {
      if (item.element === element && item.query === query && item.event === event) {
        element.removeEventListener(event, item.listener, item.capture);
        listenerList.splice(index, 1);
      }
    });
  });
};
},{}],3:[function(require,module,exports){
// Polyfill for creating CustomEvents on IE9/10/11

// code pulled from:
// https://github.com/d4tocchini/customevent-polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill

try {
    var ce = new window.CustomEvent('test');
    ce.preventDefault();
    if (ce.defaultPrevented !== true) {
        // IE has problems with .preventDefault() on custom events
        // http://stackoverflow.com/questions/23349191
        throw new Error('Could not prevent default');
    }
} catch(e) {
  var CustomEvent = function(event, params) {
    var evt, origPrevent;
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined
    };

    evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    origPrevent = evt.preventDefault;
    evt.preventDefault = function () {
      origPrevent.call(this);
      try {
        Object.defineProperty(this, 'defaultPrevented', {
          get: function () {
            return true;
          }
        });
      } catch(e) {
        this.defaultPrevented = true;
      }
    };
    return evt;
  };

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent; // expose definition to window
}

},{}],4:[function(require,module,exports){
(function (global,setImmediate){
(function(global){

//
// Check for native Promise and it has correct interface
//

var NativePromise = global['Promise'];
var nativePromiseSupported =
  NativePromise &&
  // Some of these methods are missing from
  // Firefox/Chrome experimental implementations
  'resolve' in NativePromise &&
  'reject' in NativePromise &&
  'all' in NativePromise &&
  'race' in NativePromise &&
  // Older version of the spec had a resolver object
  // as the arg rather than a function
  (function(){
    var resolve;
    new NativePromise(function(r){ resolve = r; });
    return typeof resolve === 'function';
  })();


//
// export if necessary
//

if (typeof exports !== 'undefined' && exports)
{
  // node.js
  exports.Promise = nativePromiseSupported ? NativePromise : Promise;
  exports.Polyfill = Promise;
}
else
{
  // AMD
  if (typeof define == 'function' && define.amd)
  {
    define(function(){
      return nativePromiseSupported ? NativePromise : Promise;
    });
  }
  else
  {
    // in browser add to global
    if (!nativePromiseSupported)
      global['Promise'] = Promise;
  }
}


//
// Polyfill
//

var PENDING = 'pending';
var SEALED = 'sealed';
var FULFILLED = 'fulfilled';
var REJECTED = 'rejected';
var NOOP = function(){};

function isArray(value) {
  return Object.prototype.toString.call(value) === '[object Array]';
}

// async calls
var asyncSetTimer = typeof setImmediate !== 'undefined' ? setImmediate : setTimeout;
var asyncQueue = [];
var asyncTimer;

function asyncFlush(){
  // run promise callbacks
  for (var i = 0; i < asyncQueue.length; i++)
    asyncQueue[i][0](asyncQueue[i][1]);

  // reset async asyncQueue
  asyncQueue = [];
  asyncTimer = false;
}

function asyncCall(callback, arg){
  asyncQueue.push([callback, arg]);

  if (!asyncTimer)
  {
    asyncTimer = true;
    asyncSetTimer(asyncFlush, 0);
  }
}


function invokeResolver(resolver, promise) {
  function resolvePromise(value) {
    resolve(promise, value);
  }

  function rejectPromise(reason) {
    reject(promise, reason);
  }

  try {
    resolver(resolvePromise, rejectPromise);
  } catch(e) {
    rejectPromise(e);
  }
}

function invokeCallback(subscriber){
  var owner = subscriber.owner;
  var settled = owner.state_;
  var value = owner.data_;  
  var callback = subscriber[settled];
  var promise = subscriber.then;

  if (typeof callback === 'function')
  {
    settled = FULFILLED;
    try {
      value = callback(value);
    } catch(e) {
      reject(promise, e);
    }
  }

  if (!handleThenable(promise, value))
  {
    if (settled === FULFILLED)
      resolve(promise, value);

    if (settled === REJECTED)
      reject(promise, value);
  }
}

function handleThenable(promise, value) {
  var resolved;

  try {
    if (promise === value)
      throw new TypeError('A promises callback cannot return that same promise.');

    if (value && (typeof value === 'function' || typeof value === 'object'))
    {
      var then = value.then;  // then should be retrived only once

      if (typeof then === 'function')
      {
        then.call(value, function(val){
          if (!resolved)
          {
            resolved = true;

            if (value !== val)
              resolve(promise, val);
            else
              fulfill(promise, val);
          }
        }, function(reason){
          if (!resolved)
          {
            resolved = true;

            reject(promise, reason);
          }
        });

        return true;
      }
    }
  } catch (e) {
    if (!resolved)
      reject(promise, e);

    return true;
  }

  return false;
}

function resolve(promise, value){
  if (promise === value || !handleThenable(promise, value))
    fulfill(promise, value);
}

function fulfill(promise, value){
  if (promise.state_ === PENDING)
  {
    promise.state_ = SEALED;
    promise.data_ = value;

    asyncCall(publishFulfillment, promise);
  }
}

function reject(promise, reason){
  if (promise.state_ === PENDING)
  {
    promise.state_ = SEALED;
    promise.data_ = reason;

    asyncCall(publishRejection, promise);
  }
}

function publish(promise) {
  var callbacks = promise.then_;
  promise.then_ = undefined;

  for (var i = 0; i < callbacks.length; i++) {
    invokeCallback(callbacks[i]);
  }
}

function publishFulfillment(promise){
  promise.state_ = FULFILLED;
  publish(promise);
}

function publishRejection(promise){
  promise.state_ = REJECTED;
  publish(promise);
}

/**
* @class
*/
function Promise(resolver){
  if (typeof resolver !== 'function')
    throw new TypeError('Promise constructor takes a function argument');

  if (this instanceof Promise === false)
    throw new TypeError('Failed to construct \'Promise\': Please use the \'new\' operator, this object constructor cannot be called as a function.');

  this.then_ = [];

  invokeResolver(resolver, this);
}

Promise.prototype = {
  constructor: Promise,

  state_: PENDING,
  then_: null,
  data_: undefined,

  then: function(onFulfillment, onRejection){
    var subscriber = {
      owner: this,
      then: new this.constructor(NOOP),
      fulfilled: onFulfillment,
      rejected: onRejection
    };

    if (this.state_ === FULFILLED || this.state_ === REJECTED)
    {
      // already resolved, call callback async
      asyncCall(invokeCallback, subscriber);
    }
    else
    {
      // subscribe
      this.then_.push(subscriber);
    }

    return subscriber.then;
  },

  'catch': function(onRejection) {
    return this.then(null, onRejection);
  }
};

Promise.all = function(promises){
  var Class = this;

  if (!isArray(promises))
    throw new TypeError('You must pass an array to Promise.all().');

  return new Class(function(resolve, reject){
    var results = [];
    var remaining = 0;

    function resolver(index){
      remaining++;
      return function(value){
        results[index] = value;
        if (!--remaining)
          resolve(results);
      };
    }

    for (var i = 0, promise; i < promises.length; i++)
    {
      promise = promises[i];

      if (promise && typeof promise.then === 'function')
        promise.then(resolver(i), reject);
      else
        results[i] = promise;
    }

    if (!remaining)
      resolve(results);
  });
};

Promise.race = function(promises){
  var Class = this;

  if (!isArray(promises))
    throw new TypeError('You must pass an array to Promise.race().');

  return new Class(function(resolve, reject) {
    for (var i = 0, promise; i < promises.length; i++)
    {
      promise = promises[i];

      if (promise && typeof promise.then === 'function')
        promise.then(resolve, reject);
      else
        resolve(promise);
    }
  });
};

Promise.resolve = function(value){
  var Class = this;

  if (value && typeof value === 'object' && value.constructor === Class)
    return value;

  return new Class(function(resolve){
    resolve(value);
  });
};

Promise.reject = function(reason){
  var Class = this;

  return new Class(function(resolve, reject){
    reject(reason);
  });
};

})(typeof window != 'undefined' ? window : typeof global != 'undefined' ? global : typeof self != 'undefined' ? self : this);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("timers").setImmediate)
},{"timers":8}],5:[function(require,module,exports){
'use strict';
if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        value: function (predicate) {

            if (this == null) {
                throw new TypeError('this is null or not defined');
            }

            var obj = Object(this);
            var len = obj.length >>> 0;

            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            var thisArg = arguments[1];

            var index = 0;

            while (index < len) {
                var iValue = obj[index];
                if (predicate.call(thisArg, iValue, index, obj)) {
                    return iValue;
                }
                index++;
            }

            return undefined;
        }
    });
}
},{}],6:[function(require,module,exports){
'use strict';

var DOCUMENT_FRAGMENT_NODE = 11;

function morphAttrs(fromNode, toNode) {
    var toNodeAttrs = toNode.attributes;
    var attr;
    var attrName;
    var attrNamespaceURI;
    var attrValue;
    var fromValue;

    // document-fragments dont have attributes so lets not do anything
    if (toNode.nodeType === DOCUMENT_FRAGMENT_NODE || fromNode.nodeType === DOCUMENT_FRAGMENT_NODE) {
      return;
    }

    // update attributes on original DOM element
    for (var i = toNodeAttrs.length - 1; i >= 0; i--) {
        attr = toNodeAttrs[i];
        attrName = attr.name;
        attrNamespaceURI = attr.namespaceURI;
        attrValue = attr.value;

        if (attrNamespaceURI) {
            attrName = attr.localName || attrName;
            fromValue = fromNode.getAttributeNS(attrNamespaceURI, attrName);

            if (fromValue !== attrValue) {
                if (attr.prefix === 'xmlns'){
                    attrName = attr.name; // It's not allowed to set an attribute with the XMLNS namespace without specifying the `xmlns` prefix
                }
                fromNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
            }
        } else {
            fromValue = fromNode.getAttribute(attrName);

            if (fromValue !== attrValue) {
                fromNode.setAttribute(attrName, attrValue);
            }
        }
    }

    // Remove any extra attributes found on the original DOM element that
    // weren't found on the target element.
    var fromNodeAttrs = fromNode.attributes;

    for (var d = fromNodeAttrs.length - 1; d >= 0; d--) {
        attr = fromNodeAttrs[d];
        attrName = attr.name;
        attrNamespaceURI = attr.namespaceURI;

        if (attrNamespaceURI) {
            attrName = attr.localName || attrName;

            if (!toNode.hasAttributeNS(attrNamespaceURI, attrName)) {
                fromNode.removeAttributeNS(attrNamespaceURI, attrName);
            }
        } else {
            if (!toNode.hasAttribute(attrName)) {
                fromNode.removeAttribute(attrName);
            }
        }
    }
}

var range; // Create a range object for efficently rendering strings to elements.
var NS_XHTML = 'http://www.w3.org/1999/xhtml';

var doc = typeof document === 'undefined' ? undefined : document;
var HAS_TEMPLATE_SUPPORT = !!doc && 'content' in doc.createElement('template');
var HAS_RANGE_SUPPORT = !!doc && doc.createRange && 'createContextualFragment' in doc.createRange();

function createFragmentFromTemplate(str) {
    var template = doc.createElement('template');
    template.innerHTML = str;
    return template.content.childNodes[0];
}

function createFragmentFromRange(str) {
    if (!range) {
        range = doc.createRange();
        range.selectNode(doc.body);
    }

    var fragment = range.createContextualFragment(str);
    return fragment.childNodes[0];
}

function createFragmentFromWrap(str) {
    var fragment = doc.createElement('body');
    fragment.innerHTML = str;
    return fragment.childNodes[0];
}

/**
 * This is about the same
 * var html = new DOMParser().parseFromString(str, 'text/html');
 * return html.body.firstChild;
 *
 * @method toElement
 * @param {String} str
 */
function toElement(str) {
    str = str.trim();
    if (HAS_TEMPLATE_SUPPORT) {
      // avoid restrictions on content for things like `<tr><th>Hi</th></tr>` which
      // createContextualFragment doesn't support
      // <template> support not available in IE
      return createFragmentFromTemplate(str);
    } else if (HAS_RANGE_SUPPORT) {
      return createFragmentFromRange(str);
    }

    return createFragmentFromWrap(str);
}

/**
 * Returns true if two node's names are the same.
 *
 * NOTE: We don't bother checking `namespaceURI` because you will never find two HTML elements with the same
 *       nodeName and different namespace URIs.
 *
 * @param {Element} a
 * @param {Element} b The target element
 * @return {boolean}
 */
function compareNodeNames(fromEl, toEl) {
    var fromNodeName = fromEl.nodeName;
    var toNodeName = toEl.nodeName;

    if (fromNodeName === toNodeName) {
        return true;
    }

    if (toEl.actualize &&
        fromNodeName.charCodeAt(0) < 91 && /* from tag name is upper case */
        toNodeName.charCodeAt(0) > 90 /* target tag name is lower case */) {
        // If the target element is a virtual DOM node then we may need to normalize the tag name
        // before comparing. Normal HTML elements that are in the "http://www.w3.org/1999/xhtml"
        // are converted to upper case
        return fromNodeName === toNodeName.toUpperCase();
    } else {
        return false;
    }
}

/**
 * Create an element, optionally with a known namespace URI.
 *
 * @param {string} name the element name, e.g. 'div' or 'svg'
 * @param {string} [namespaceURI] the element's namespace URI, i.e. the value of
 * its `xmlns` attribute or its inferred namespace.
 *
 * @return {Element}
 */
function createElementNS(name, namespaceURI) {
    return !namespaceURI || namespaceURI === NS_XHTML ?
        doc.createElement(name) :
        doc.createElementNS(namespaceURI, name);
}

/**
 * Copies the children of one DOM element to another DOM element
 */
function moveChildren(fromEl, toEl) {
    var curChild = fromEl.firstChild;
    while (curChild) {
        var nextChild = curChild.nextSibling;
        toEl.appendChild(curChild);
        curChild = nextChild;
    }
    return toEl;
}

function syncBooleanAttrProp(fromEl, toEl, name) {
    if (fromEl[name] !== toEl[name]) {
        fromEl[name] = toEl[name];
        if (fromEl[name]) {
            fromEl.setAttribute(name, '');
        } else {
            fromEl.removeAttribute(name);
        }
    }
}

var specialElHandlers = {
    OPTION: function(fromEl, toEl) {
        var parentNode = fromEl.parentNode;
        if (parentNode) {
            var parentName = parentNode.nodeName.toUpperCase();
            if (parentName === 'OPTGROUP') {
                parentNode = parentNode.parentNode;
                parentName = parentNode && parentNode.nodeName.toUpperCase();
            }
            if (parentName === 'SELECT' && !parentNode.hasAttribute('multiple')) {
                if (fromEl.hasAttribute('selected') && !toEl.selected) {
                    // Workaround for MS Edge bug where the 'selected' attribute can only be
                    // removed if set to a non-empty value:
                    // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12087679/
                    fromEl.setAttribute('selected', 'selected');
                    fromEl.removeAttribute('selected');
                }
                // We have to reset select element's selectedIndex to -1, otherwise setting
                // fromEl.selected using the syncBooleanAttrProp below has no effect.
                // The correct selectedIndex will be set in the SELECT special handler below.
                parentNode.selectedIndex = -1;
            }
        }
        syncBooleanAttrProp(fromEl, toEl, 'selected');
    },
    /**
     * The "value" attribute is special for the <input> element since it sets
     * the initial value. Changing the "value" attribute without changing the
     * "value" property will have no effect since it is only used to the set the
     * initial value.  Similar for the "checked" attribute, and "disabled".
     */
    INPUT: function(fromEl, toEl) {
        syncBooleanAttrProp(fromEl, toEl, 'checked');
        syncBooleanAttrProp(fromEl, toEl, 'disabled');

        if (fromEl.value !== toEl.value) {
            fromEl.value = toEl.value;
        }

        if (!toEl.hasAttribute('value')) {
            fromEl.removeAttribute('value');
        }
    },

    TEXTAREA: function(fromEl, toEl) {
        var newValue = toEl.value;
        if (fromEl.value !== newValue) {
            fromEl.value = newValue;
        }

        var firstChild = fromEl.firstChild;
        if (firstChild) {
            // Needed for IE. Apparently IE sets the placeholder as the
            // node value and vise versa. This ignores an empty update.
            var oldValue = firstChild.nodeValue;

            if (oldValue == newValue || (!newValue && oldValue == fromEl.placeholder)) {
                return;
            }

            firstChild.nodeValue = newValue;
        }
    },
    SELECT: function(fromEl, toEl) {
        if (!toEl.hasAttribute('multiple')) {
            var selectedIndex = -1;
            var i = 0;
            // We have to loop through children of fromEl, not toEl since nodes can be moved
            // from toEl to fromEl directly when morphing.
            // At the time this special handler is invoked, all children have already been morphed
            // and appended to / removed from fromEl, so using fromEl here is safe and correct.
            var curChild = fromEl.firstChild;
            var optgroup;
            var nodeName;
            while(curChild) {
                nodeName = curChild.nodeName && curChild.nodeName.toUpperCase();
                if (nodeName === 'OPTGROUP') {
                    optgroup = curChild;
                    curChild = optgroup.firstChild;
                } else {
                    if (nodeName === 'OPTION') {
                        if (curChild.hasAttribute('selected')) {
                            selectedIndex = i;
                            break;
                        }
                        i++;
                    }
                    curChild = curChild.nextSibling;
                    if (!curChild && optgroup) {
                        curChild = optgroup.nextSibling;
                        optgroup = null;
                    }
                }
            }

            fromEl.selectedIndex = selectedIndex;
        }
    }
};

var ELEMENT_NODE = 1;
var DOCUMENT_FRAGMENT_NODE$1 = 11;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;

function noop() {}

function defaultGetNodeKey(node) {
  if (node) {
      return (node.getAttribute && node.getAttribute('id')) || node.id;
  }
}

function morphdomFactory(morphAttrs) {

    return function morphdom(fromNode, toNode, options) {
        if (!options) {
            options = {};
        }

        if (typeof toNode === 'string') {
            if (fromNode.nodeName === '#document' || fromNode.nodeName === 'HTML') {
                var toNodeHtml = toNode;
                toNode = doc.createElement('html');
                toNode.innerHTML = toNodeHtml;
            } else {
                toNode = toElement(toNode);
            }
        }

        var getNodeKey = options.getNodeKey || defaultGetNodeKey;
        var onBeforeNodeAdded = options.onBeforeNodeAdded || noop;
        var onNodeAdded = options.onNodeAdded || noop;
        var onBeforeElUpdated = options.onBeforeElUpdated || noop;
        var onElUpdated = options.onElUpdated || noop;
        var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop;
        var onNodeDiscarded = options.onNodeDiscarded || noop;
        var onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || noop;
        var childrenOnly = options.childrenOnly === true;

        // This object is used as a lookup to quickly find all keyed elements in the original DOM tree.
        var fromNodesLookup = Object.create(null);
        var keyedRemovalList = [];

        function addKeyedRemoval(key) {
            keyedRemovalList.push(key);
        }

        function walkDiscardedChildNodes(node, skipKeyedNodes) {
            if (node.nodeType === ELEMENT_NODE) {
                var curChild = node.firstChild;
                while (curChild) {

                    var key = undefined;

                    if (skipKeyedNodes && (key = getNodeKey(curChild))) {
                        // If we are skipping keyed nodes then we add the key
                        // to a list so that it can be handled at the very end.
                        addKeyedRemoval(key);
                    } else {
                        // Only report the node as discarded if it is not keyed. We do this because
                        // at the end we loop through all keyed elements that were unmatched
                        // and then discard them in one final pass.
                        onNodeDiscarded(curChild);
                        if (curChild.firstChild) {
                            walkDiscardedChildNodes(curChild, skipKeyedNodes);
                        }
                    }

                    curChild = curChild.nextSibling;
                }
            }
        }

        /**
         * Removes a DOM node out of the original DOM
         *
         * @param  {Node} node The node to remove
         * @param  {Node} parentNode The nodes parent
         * @param  {Boolean} skipKeyedNodes If true then elements with keys will be skipped and not discarded.
         * @return {undefined}
         */
        function removeNode(node, parentNode, skipKeyedNodes) {
            if (onBeforeNodeDiscarded(node) === false) {
                return;
            }

            if (parentNode) {
                parentNode.removeChild(node);
            }

            onNodeDiscarded(node);
            walkDiscardedChildNodes(node, skipKeyedNodes);
        }

        // // TreeWalker implementation is no faster, but keeping this around in case this changes in the future
        // function indexTree(root) {
        //     var treeWalker = document.createTreeWalker(
        //         root,
        //         NodeFilter.SHOW_ELEMENT);
        //
        //     var el;
        //     while((el = treeWalker.nextNode())) {
        //         var key = getNodeKey(el);
        //         if (key) {
        //             fromNodesLookup[key] = el;
        //         }
        //     }
        // }

        // // NodeIterator implementation is no faster, but keeping this around in case this changes in the future
        //
        // function indexTree(node) {
        //     var nodeIterator = document.createNodeIterator(node, NodeFilter.SHOW_ELEMENT);
        //     var el;
        //     while((el = nodeIterator.nextNode())) {
        //         var key = getNodeKey(el);
        //         if (key) {
        //             fromNodesLookup[key] = el;
        //         }
        //     }
        // }

        function indexTree(node) {
            if (node.nodeType === ELEMENT_NODE || node.nodeType === DOCUMENT_FRAGMENT_NODE$1) {
                var curChild = node.firstChild;
                while (curChild) {
                    var key = getNodeKey(curChild);
                    if (key) {
                        fromNodesLookup[key] = curChild;
                    }

                    // Walk recursively
                    indexTree(curChild);

                    curChild = curChild.nextSibling;
                }
            }
        }

        indexTree(fromNode);

        function handleNodeAdded(el) {
            onNodeAdded(el);

            var curChild = el.firstChild;
            while (curChild) {
                var nextSibling = curChild.nextSibling;

                var key = getNodeKey(curChild);
                if (key) {
                    var unmatchedFromEl = fromNodesLookup[key];
                    if (unmatchedFromEl && compareNodeNames(curChild, unmatchedFromEl)) {
                        curChild.parentNode.replaceChild(unmatchedFromEl, curChild);
                        morphEl(unmatchedFromEl, curChild);
                    }
                }

                handleNodeAdded(curChild);
                curChild = nextSibling;
            }
        }

        function cleanupFromEl(fromEl, curFromNodeChild, curFromNodeKey) {
            // We have processed all of the "to nodes". If curFromNodeChild is
            // non-null then we still have some from nodes left over that need
            // to be removed
            while (curFromNodeChild) {
                var fromNextSibling = curFromNodeChild.nextSibling;
                if ((curFromNodeKey = getNodeKey(curFromNodeChild))) {
                    // Since the node is keyed it might be matched up later so we defer
                    // the actual removal to later
                    addKeyedRemoval(curFromNodeKey);
                } else {
                    // NOTE: we skip nested keyed nodes from being removed since there is
                    //       still a chance they will be matched up later
                    removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                }
                curFromNodeChild = fromNextSibling;
            }
        }

        function morphEl(fromEl, toEl, childrenOnly) {
            var toElKey = getNodeKey(toEl);

            if (toElKey) {
                // If an element with an ID is being morphed then it will be in the final
                // DOM so clear it out of the saved elements collection
                delete fromNodesLookup[toElKey];
            }

            if (!childrenOnly) {
                // optional
                if (onBeforeElUpdated(fromEl, toEl) === false) {
                    return;
                }

                // update attributes on original DOM element first
                morphAttrs(fromEl, toEl);
                // optional
                onElUpdated(fromEl);

                if (onBeforeElChildrenUpdated(fromEl, toEl) === false) {
                    return;
                }
            }

            if (fromEl.nodeName !== 'TEXTAREA') {
              morphChildren(fromEl, toEl);
            } else {
              specialElHandlers.TEXTAREA(fromEl, toEl);
            }
        }

        function morphChildren(fromEl, toEl) {
            var curToNodeChild = toEl.firstChild;
            var curFromNodeChild = fromEl.firstChild;
            var curToNodeKey;
            var curFromNodeKey;

            var fromNextSibling;
            var toNextSibling;
            var matchingFromEl;

            // walk the children
            outer: while (curToNodeChild) {
                toNextSibling = curToNodeChild.nextSibling;
                curToNodeKey = getNodeKey(curToNodeChild);

                // walk the fromNode children all the way through
                while (curFromNodeChild) {
                    fromNextSibling = curFromNodeChild.nextSibling;

                    if (curToNodeChild.isSameNode && curToNodeChild.isSameNode(curFromNodeChild)) {
                        curToNodeChild = toNextSibling;
                        curFromNodeChild = fromNextSibling;
                        continue outer;
                    }

                    curFromNodeKey = getNodeKey(curFromNodeChild);

                    var curFromNodeType = curFromNodeChild.nodeType;

                    // this means if the curFromNodeChild doesnt have a match with the curToNodeChild
                    var isCompatible = undefined;

                    if (curFromNodeType === curToNodeChild.nodeType) {
                        if (curFromNodeType === ELEMENT_NODE) {
                            // Both nodes being compared are Element nodes

                            if (curToNodeKey) {
                                // The target node has a key so we want to match it up with the correct element
                                // in the original DOM tree
                                if (curToNodeKey !== curFromNodeKey) {
                                    // The current element in the original DOM tree does not have a matching key so
                                    // let's check our lookup to see if there is a matching element in the original
                                    // DOM tree
                                    if ((matchingFromEl = fromNodesLookup[curToNodeKey])) {
                                        if (fromNextSibling === matchingFromEl) {
                                            // Special case for single element removals. To avoid removing the original
                                            // DOM node out of the tree (since that can break CSS transitions, etc.),
                                            // we will instead discard the current node and wait until the next
                                            // iteration to properly match up the keyed target element with its matching
                                            // element in the original tree
                                            isCompatible = false;
                                        } else {
                                            // We found a matching keyed element somewhere in the original DOM tree.
                                            // Let's move the original DOM node into the current position and morph
                                            // it.

                                            // NOTE: We use insertBefore instead of replaceChild because we want to go through
                                            // the `removeNode()` function for the node that is being discarded so that
                                            // all lifecycle hooks are correctly invoked
                                            fromEl.insertBefore(matchingFromEl, curFromNodeChild);

                                            // fromNextSibling = curFromNodeChild.nextSibling;

                                            if (curFromNodeKey) {
                                                // Since the node is keyed it might be matched up later so we defer
                                                // the actual removal to later
                                                addKeyedRemoval(curFromNodeKey);
                                            } else {
                                                // NOTE: we skip nested keyed nodes from being removed since there is
                                                //       still a chance they will be matched up later
                                                removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                                            }

                                            curFromNodeChild = matchingFromEl;
                                        }
                                    } else {
                                        // The nodes are not compatible since the "to" node has a key and there
                                        // is no matching keyed node in the source tree
                                        isCompatible = false;
                                    }
                                }
                            } else if (curFromNodeKey) {
                                // The original has a key
                                isCompatible = false;
                            }

                            isCompatible = isCompatible !== false && compareNodeNames(curFromNodeChild, curToNodeChild);
                            if (isCompatible) {
                                // We found compatible DOM elements so transform
                                // the current "from" node to match the current
                                // target DOM node.
                                // MORPH
                                morphEl(curFromNodeChild, curToNodeChild);
                            }

                        } else if (curFromNodeType === TEXT_NODE || curFromNodeType == COMMENT_NODE) {
                            // Both nodes being compared are Text or Comment nodes
                            isCompatible = true;
                            // Simply update nodeValue on the original node to
                            // change the text value
                            if (curFromNodeChild.nodeValue !== curToNodeChild.nodeValue) {
                                curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
                            }

                        }
                    }

                    if (isCompatible) {
                        // Advance both the "to" child and the "from" child since we found a match
                        // Nothing else to do as we already recursively called morphChildren above
                        curToNodeChild = toNextSibling;
                        curFromNodeChild = fromNextSibling;
                        continue outer;
                    }

                    // No compatible match so remove the old node from the DOM and continue trying to find a
                    // match in the original DOM. However, we only do this if the from node is not keyed
                    // since it is possible that a keyed node might match up with a node somewhere else in the
                    // target tree and we don't want to discard it just yet since it still might find a
                    // home in the final DOM tree. After everything is done we will remove any keyed nodes
                    // that didn't find a home
                    if (curFromNodeKey) {
                        // Since the node is keyed it might be matched up later so we defer
                        // the actual removal to later
                        addKeyedRemoval(curFromNodeKey);
                    } else {
                        // NOTE: we skip nested keyed nodes from being removed since there is
                        //       still a chance they will be matched up later
                        removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                    }

                    curFromNodeChild = fromNextSibling;
                } // END: while(curFromNodeChild) {}

                // If we got this far then we did not find a candidate match for
                // our "to node" and we exhausted all of the children "from"
                // nodes. Therefore, we will just append the current "to" node
                // to the end
                if (curToNodeKey && (matchingFromEl = fromNodesLookup[curToNodeKey]) && compareNodeNames(matchingFromEl, curToNodeChild)) {
                    fromEl.appendChild(matchingFromEl);
                    // MORPH
                    morphEl(matchingFromEl, curToNodeChild);
                } else {
                    var onBeforeNodeAddedResult = onBeforeNodeAdded(curToNodeChild);
                    if (onBeforeNodeAddedResult !== false) {
                        if (onBeforeNodeAddedResult) {
                            curToNodeChild = onBeforeNodeAddedResult;
                        }

                        if (curToNodeChild.actualize) {
                            curToNodeChild = curToNodeChild.actualize(fromEl.ownerDocument || doc);
                        }
                        fromEl.appendChild(curToNodeChild);
                        handleNodeAdded(curToNodeChild);
                    }
                }

                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
            }

            cleanupFromEl(fromEl, curFromNodeChild, curFromNodeKey);

            var specialElHandler = specialElHandlers[fromEl.nodeName];
            if (specialElHandler) {
                specialElHandler(fromEl, toEl);
            }
        } // END: morphChildren(...)

        var morphedNode = fromNode;
        var morphedNodeType = morphedNode.nodeType;
        var toNodeType = toNode.nodeType;

        if (!childrenOnly) {
            // Handle the case where we are given two DOM nodes that are not
            // compatible (e.g. <div> --> <span> or <div> --> TEXT)
            if (morphedNodeType === ELEMENT_NODE) {
                if (toNodeType === ELEMENT_NODE) {
                    if (!compareNodeNames(fromNode, toNode)) {
                        onNodeDiscarded(fromNode);
                        morphedNode = moveChildren(fromNode, createElementNS(toNode.nodeName, toNode.namespaceURI));
                    }
                } else {
                    // Going from an element node to a text node
                    morphedNode = toNode;
                }
            } else if (morphedNodeType === TEXT_NODE || morphedNodeType === COMMENT_NODE) { // Text or comment node
                if (toNodeType === morphedNodeType) {
                    if (morphedNode.nodeValue !== toNode.nodeValue) {
                        morphedNode.nodeValue = toNode.nodeValue;
                    }

                    return morphedNode;
                } else {
                    // Text node to something else
                    morphedNode = toNode;
                }
            }
        }

        if (morphedNode === toNode) {
            // The "to node" was not compatible with the "from node" so we had to
            // toss out the "from node" and use the "to node"
            onNodeDiscarded(fromNode);
        } else {
            if (toNode.isSameNode && toNode.isSameNode(morphedNode)) {
                return;
            }

            morphEl(morphedNode, toNode, childrenOnly);

            // We now need to loop over any keyed nodes that might need to be
            // removed. We only do the removal if we know that the keyed node
            // never found a match. When a keyed node is matched up we remove
            // it out of fromNodesLookup and we use fromNodesLookup to determine
            // if a keyed node has been matched up or not
            if (keyedRemovalList) {
                for (var i=0, len=keyedRemovalList.length; i<len; i++) {
                    var elToRemove = fromNodesLookup[keyedRemovalList[i]];
                    if (elToRemove) {
                        removeNode(elToRemove, elToRemove.parentNode, false);
                    }
                }
            }
        }

        if (!childrenOnly && morphedNode !== fromNode && fromNode.parentNode) {
            if (morphedNode.actualize) {
                morphedNode = morphedNode.actualize(fromNode.ownerDocument || doc);
            }
            // If we had to swap out the from node with a new node because the old
            // node was not compatible with the target node then we need to
            // replace the old DOM node in the original DOM tree. This is only
            // possible if the original DOM node was part of a DOM tree which
            // we know is the case if it has a parent node.
            fromNode.parentNode.replaceChild(morphedNode, fromNode);
        }

        return morphedNode;
    };
}

var morphdom = morphdomFactory(morphAttrs);

module.exports = morphdom;

},{}],7:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],8:[function(require,module,exports){
(function (setImmediate,clearImmediate){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
}).call(this,require("timers").setImmediate,require("timers").clearImmediate)
},{"process/browser.js":7,"timers":8}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _aTemplate = _interopRequireDefault(require("a-template"));

require("custom-event-polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var template = "<div class=\"\\{classNames.smartPhoto\\}\"<!-- BEGIN hide:exist --> aria-hidden=\"true\"<!-- END hide:exist --><!-- BEGIN hide:empty --> aria-hidden=\"false\"<!-- END hide:empty --> role=\"dialog\">\n\t<div class=\"\\{classNames.smartPhotoBody\\}\">\n\t\t<div class=\"\\{classNames.smartPhotoInner\\}\">\n\t\t\t   <div class=\"\\{classNames.smartPhotoHeader\\}\">\n\t\t\t\t\t<span class=\"\\{classNames.smartPhotoCount\\}\">{currentIndex}[increment]/{total}</span>\n\t\t\t\t\t<span class=\"\\{classNames.smartPhotoCaption\\}\" aria-live=\"polite\" tabindex=\"-1\"><!-- BEGIN groupItems:loop --><!-- \\BEGIN currentIndex:touch#{index} -->{caption}<!-- \\END currentIndex:touch#{index} --><!-- END groupItems:loop --></span>\n\t\t\t\t\t<button class=\"\\{classNames.smartPhotoDismiss\\}\" data-action-click=\"hidePhoto()\"><span class=\"smartphoto-sr-only\">\\{message.closeDialog\\}</span></button>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"\\{classNames.smartPhotoContent\\}\"<!-- BEGIN isSmartPhone:exist --> data-action-touchstart=\"beforeDrag\" data-action-touchmove=\"onDrag\" data-action-touchend=\"afterDrag(false)\"<!-- END isSmartPhone:exist --><!-- BEGIN isSmartPhone:empty --> data-action-click=\"hidePhoto()\"<!-- END isSmartPhone:empty -->>\n\t\t\t\t</div>\n\t\t\t\t<ul style=\"transform:translate({translateX}[round]px,{translateY}[round]px);\" class=\"\\{classNames.smartPhotoList\\}<!-- BEGIN onMoveClass:exist --> \\{classNames.smartPhotoListOnMove\\}<!-- END onMoveClass:exist -->\">\n\t\t\t\t\t<!-- BEGIN groupItems:loop -->\n\t\t\t\t\t<li style=\"transform:translate({translateX}[round]px,{translateY}[round]px);\" class=\"<!-- \\BEGIN currentIndex:touch#{index} -->current<!-- \\END currentIndex:touch#{index} -->\">\n\t\t\t\t\t\t<!-- BEGIN processed:exist -->\n\t\t\t\t\t\t<div style=\"transform:translate({x}[round]px,{y}[round]px) scale({scale});\" class=\"\\\\{classNames.smartPhotoImgWrap\\\\}\"<!-- \\BEGIN isSmartPhone:empty --> data-action-mousemove=\"onDrag\" data-action-mousedown=\"beforeDrag\" data-action-mouseup=\"afterDrag\"<!-- \\END isSmartPhone:empty --><!-- \\BEGIN isSmartPhone:exist --> data-action-touchstart=\"beforeDrag\" data-action-touchmove=\"onDrag\" data-action-touchend=\"afterDrag\"<!-- \\END isSmartPhone:exist -->>\n\t\t\t\t\t\t\t<img style=\"<!-- \\BEGIN currentIndex:touch#{index} -->transform:translate(\\{photoPosX\\}[virtualPos]px,\\{photoPosY\\}[virtualPos]px) scale(\\{scaleSize\\});<!-- \\END currentIndex:touch#{index} -->width:{width}px;\" src=\"{src}\" class=\"\\\\{classNames.smartPhotoImg\\\\}<!-- \\BEGIN scale:exist -->  \\\\{classNames.smartPhotoImgOnMove\\\\}<!-- \\END scale:exist --><!-- \\BEGIN elastic:exist --> \\\\{classNames.smartPhotoImgElasticMove\\\\}<!-- \\END elastic:exist --><!-- \\BEGIN appear:exist --> active<!-- \\END appear:exist -->\" ondragstart=\"return false;\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<!-- END processed:exist -->\n\t\t\t\t\t\t<!-- BEGIN processed:empty -->\n\t\t\t\t\t\t<div class=\"\\\\{classNames.smartPhotoLoaderWrap\\\\}\">\n\t\t\t\t\t\t\t<span class=\"\\\\{classNames.smartPhotoLoader\\\\}\"></span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<!-- END processed:empty -->\n\t\t\t\t\t</li>\n\t\t\t\t\t<!-- END groupItems:loop -->\n\t\t\t\t</ul>\n\t\t\t\t<!-- BEGIN arrows:exist -->\n\t\t\t\t<ul class=\"\\{classNames.smartPhotoArrows\\}\"<!-- BEGIN hideUi:exist --> aria-hidden=\"true\"<!-- END hideUi:exist --><!-- BEGIN hideUi:exist --> aria-hidden=\"false\"<!-- END hideUi:exist -->>\n\t\t\t\t\t<li class=\"\\{classNames.smartPhotoArrowLeft\\}<!-- BEGIN isSmartPhone:exist --> \\{classNames.smartPhotoArrowHideIcon\\}<!-- END isSmartPhone:exist -->\"<!-- BEGIN showPrevArrow:empty --> aria-hidden=\"true\"<!-- END showPrevArrow:empty -->><a href=\"#\" data-action-click=\"gotoSlide({prev})\" role=\"button\"><span class=\"smartphoto-sr-only\">\\{message.gotoPrevImage\\}</span></a></li>\n\t\t\t\t\t<li class=\"\\{classNames.smartPhotoArrowRight\\}<!-- BEGIN isSmartPhone:exist --> \\{classNames.smartPhotoArrowHideIcon\\}<!-- END isSmartPhone:exist -->\"<!-- BEGIN showNextArrow:empty --> aria-hidden=\"true\"<!-- END showNextArrow:empty -->><a href=\"#\" data-action-click=\"gotoSlide({next})\" role=\"button\"><span class=\"smartphoto-sr-only\">\\{message.gotoNextImage\\}</span></a></li>\n\t\t\t\t</ul>\n\t\t\t\t<!-- END arrows:exist -->\n\t\t\t\t<!-- BEGIN nav:exist -->\n\t\t\t\t<nav class=\"\\{classNames.smartPhotoNav\\}\"<!-- BEGIN hideUi:exist --> aria-hidden=\"true\"<!-- END hideUi:exist --><!-- BEGIN hideUi:exist --> aria-hidden=\"false\"<!-- END hideUi:exist -->>\n\t\t\t\t\t<ul>\n\t\t\t\t\t\t<!-- BEGIN groupItems:loop -->\n\t\t\t\t\t\t<li><a href=\"#\" data-action-click=\"gotoSlide({index})\" class=\"<!-- \\BEGIN currentIndex:touch#{index} -->current<!-- \\END currentIndex:touch#{index} -->\" style=\"background-image:url({thumb});\" role=\"button\"><span class=\"smartphoto-sr-only\">go to {caption}</span></a></li>\n\t\t\t\t\t\t<!-- END groupItems:loop -->\n\t\t\t\t\t</ul>\n\t\t\t\t</nav>\n\t\t\t\t<!-- END nav:exist -->\n\t\t</div>\n\t\t<!-- BEGIN appearEffect:exist -->\n\t\t<img src=\\{appearEffect.img\\}\n\t\tclass=\"\\{classNames.smartPhotoImgClone\\}\"\n\t\tstyle=\"width:\\{appearEffect.width\\}px;height:\\{appearEffect.height\\}px;transform:translate(\\{appearEffect.left\\}px,\\{appearEffect.top\\}px) scale(1)\" />\n\t\t<!-- END appearEffect:exist -->\n\t</div>\n</div>\n";

var util = require('../lib/util');

var _require = require('es6-promise-polyfill'),
    Promise = _require.Promise;

var defaults = {
  classNames: {
    smartPhoto: 'smartphoto',
    smartPhotoClose: 'smartphoto-close',
    smartPhotoBody: 'smartphoto-body',
    smartPhotoInner: 'smartphoto-inner',
    smartPhotoContent: 'smartphoto-content',
    smartPhotoImg: 'smartphoto-img',
    smartPhotoImgOnMove: 'smartphoto-img-onmove',
    smartPhotoImgElasticMove: 'smartphoto-img-elasticmove',
    smartPhotoImgWrap: 'smartphoto-img-wrap',
    smartPhotoArrows: 'smartphoto-arrows',
    smartPhotoNav: 'smartphoto-nav',
    smartPhotoArrowRight: 'smartphoto-arrow-right',
    smartPhotoArrowLeft: 'smartphoto-arrow-left',
    smartPhotoArrowHideIcon: 'smartphoto-arrow-hide',
    smartPhotoImgLeft: 'smartphoto-img-left',
    smartPhotoImgRight: 'smartphoto-img-right',
    smartPhotoList: 'smartphoto-list',
    smartPhotoListOnMove: 'smartphoto-list-onmove',
    smartPhotoHeader: 'smartphoto-header',
    smartPhotoCount: 'smartphoto-count',
    smartPhotoCaption: 'smartphoto-caption',
    smartPhotoDismiss: 'smartphoto-dismiss',
    smartPhotoLoader: 'smartphoto-loader',
    smartPhotoLoaderWrap: 'smartphoto-loader-wrap',
    smartPhotoImgClone: 'smartphoto-img-clone'
  },
  message: {
    gotoNextImage: 'go to the next image',
    gotoPrevImage: 'go to the previous image',
    closeDialog: 'close the image dialog'
  },
  arrows: true,
  nav: true,
  showAnimation: true,
  verticalGravity: false,
  useOrientationApi: false,
  useHistoryApi: true,
  swipeTopToClose: false,
  swipeBottomToClose: true,
  swipeOffset: 100,
  headerHeight: 60,
  footerHeight: 60,
  forceInterval: 10,
  registance: 0.5,
  loadOffset: 2,
  resizeStyle: 'fit',
  lazyAttribute: 'data-src'
};

var SmartPhoto =
/*#__PURE__*/
function (_ATemplate) {
  _inherits(SmartPhoto, _ATemplate);

  function SmartPhoto(selector, settings) {
    var _this;

    _classCallCheck(this, SmartPhoto);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SmartPhoto).call(this));
    _this.data = util.extend({}, defaults, settings);
    _this.data.currentIndex = 0;
    _this.data.oldIndex = 0;
    _this.data.hide = true;
    _this.data.group = {};
    _this.data.scaleSize = 1;
    _this.data.scale = false;
    _this.pos = {
      x: 0,
      y: 0
    };
    _this.data.photoPosX = 0;
    _this.data.photoPosY = 0;
    _this.handlers = [];
    _this.convert = {
      increment: _this.increment,
      virtualPos: _this.virtualPos,
      round: _this.round
    };
    _this.data.groupItems = _this.groupItems;
    _this.elements = typeof selector === 'string' ? document.querySelectorAll(selector) : selector;
    var date = new Date();
    _this.tapSecond = date.getTime();
    _this.onListMove = false;
    _this.clicked = false;
    _this.id = _this._getUniqId();
    _this.vx = 0;
    _this.vy = 0;
    _this.data.appearEffect = null;

    _this.addTemplate(_this.id, template);

    _this.data.isSmartPhone = _this._isSmartPhone();
    var body = document.querySelector('body');
    util.append(body, "<div data-id='".concat(_this.id, "'></div>"));
    [].forEach.call(_this.elements, function (element) {
      _this.addNewItem(element);
    });

    _this.update();

    var currentItem = _this._getCurrentItemByHash();

    if (currentItem) {
      util.triggerEvent(currentItem.element, 'click');
    }

    _this.interval = setInterval(function () {
      _this._doAnim();
    }, _this.data.forceInterval);

    if (!_this.data.isSmartPhone) {
      var resizeHandler = function resizeHandler() {
        if (!_this.groupItems()) {
          return;
        }

        _this._resetTranslate();

        _this._setPosByCurrentIndex();

        _this._setSizeByScreen();

        _this.update();
      };

      var keydownHandler = function keydownHandler(e) {
        var code = e.keyCode || e.which;

        if (_this.data.hide === true) {
          return;
        }

        if (code === 37) {
          _this.gotoSlide(_this.data.prev);
        } else if (code === 39) {
          _this.gotoSlide(_this.data.next);
        } else if (code === 27) {
          _this.hidePhoto();
        }
      };

      window.addEventListener('resize', resizeHandler);
      window.addEventListener('keydown', keydownHandler);

      _this._registerRemoveEvent(window, 'resize', resizeHandler);

      _this._registerRemoveEvent(window, 'keydown', keydownHandler);

      return _possibleConstructorReturn(_this);
    }

    var orientationChangeHandler = function orientationChangeHandler() {
      if (!_this.groupItems()) {
        return;
      }

      _this._resetTranslate();

      _this._setPosByCurrentIndex();

      _this._setHashByCurrentIndex();

      _this._setSizeByScreen();

      _this.update();
    };

    window.addEventListener('orientationchange', orientationChangeHandler);

    _this._registerRemoveEvent(window, 'orientationchange', orientationChangeHandler);

    if (!_this.data.useOrientationApi) {
      return _possibleConstructorReturn(_this);
    }

    var deviceorientationHandler = function deviceorientationHandler(e) {
      var _window = window,
          orientation = _window.orientation;

      if (!e || !e.gamma || _this.data.appearEffect) {
        return;
      }

      if (!_this.isBeingZoomed && !_this.photoSwipable && !_this.data.elastic && _this.data.scale) {
        if (orientation === 0) {
          _this._calcGravity(e.gamma, e.beta);
        } else if (orientation === 90) {
          _this._calcGravity(e.beta, e.gamma);
        } else if (orientation === -90) {
          _this._calcGravity(-e.beta, -e.gamma);
        } else if (orientation === 180) {
          _this._calcGravity(-e.gamma, -e.beta);
        }
      }
    };

    window.addEventListener('deviceorientation', deviceorientationHandler);

    _this._registerRemoveEvent(window, 'deviceorientation', deviceorientationHandler);

    return _this;
  }

  _createClass(SmartPhoto, [{
    key: "on",
    value: function on(event, fn) {
      var photo = this._getElementByClass(this.data.classNames.smartPhoto);

      var handler = function handler(e) {
        fn.call(photo, e);
      };

      photo.addEventListener(event, handler);

      this._registerRemoveEvent(photo, event, handler);
    }
  }, {
    key: "_registerRemoveEvent",
    value: function _registerRemoveEvent(target, event, handler) {
      this.handlers.push({
        target: target,
        event: event,
        handler: handler
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.handlers.forEach(function (handler) {
        handler.target.removeEventListener(handler.event, handler.handler);
      });
      var wrapper = document.querySelector("[data-id=\"".concat(this.id, "\"]"));
      util.removeElement(wrapper);
      clearInterval(this.interval);
      this.removeTemplateEvents();
    }
  }, {
    key: "increment",
    value: function increment(item) {
      return item + 1;
    }
  }, {
    key: "round",
    value: function round(number) {
      return Math.round(number);
    }
  }, {
    key: "virtualPos",
    value: function virtualPos(pos) {
      pos = parseInt(pos, 10);

      var item = this._getSelectedItem();

      return pos / item.scale / this.data.scaleSize;
    }
  }, {
    key: "groupItems",
    value: function groupItems() {
      return this.data.group[this.data.currentGroup];
    }
  }, {
    key: "_resetTranslate",
    value: function _resetTranslate() {
      var _this2 = this;

      var items = this.groupItems();
      items.forEach(function (item, index) {
        item.translateX = _this2._getWindowWidth() * index;
      });
    }
  }, {
    key: "addNewItem",
    value: function addNewItem(element) {
      var _this3 = this;

      var groupId = element.getAttribute('data-group') || 'nogroup';
      var group = this.data.group;

      if (groupId === 'nogroup') {
        element.setAttribute('data-group', 'nogroup');
      }

      if (!group[groupId]) {
        group[groupId] = [];
      }

      var index = group[groupId].length;
      var body = document.querySelector('body');
      var src = element.getAttribute('href');
      var img = element.querySelector('img');
      var thumb = src;

      if (img) {
        if (img.getAttribute(this.data.lazyAttribute)) {
          thumb = img.getAttribute(this.data.lazyAttribute);
        } else if (img.currentSrc) {
          thumb = img.currentSrc;
        } else {
          thumb = img.src;
        }
      }

      var item = {
        src: src,
        thumb: thumb,
        caption: element.getAttribute('data-caption'),
        groupId: groupId,
        translateX: this._getWindowWidth() * index,
        index: index,
        translateY: 0,
        width: 50,
        height: 50,
        id: element.getAttribute('data-id') || index,
        loaded: false,
        processed: false,
        element: element
      };
      group[groupId].push(item);
      this.data.currentGroup = groupId;
      var id = element.getAttribute('data-id');

      if (!id) {
        element.setAttribute('data-id', index);
      }

      element.setAttribute('data-index', index);

      var clickHandler = function clickHandler(event) {
        event.preventDefault();
        _this3.data.currentGroup = element.getAttribute('data-group');
        _this3.data.currentIndex = parseInt(element.getAttribute('data-index'), 10);

        _this3._setHashByCurrentIndex();

        var currentItem = _this3._getSelectedItem();

        if (currentItem.loaded) {
          _this3._initPhoto();

          _this3.addAppearEffect(element, currentItem);

          _this3.clicked = true;

          _this3.update();

          body.style.overflow = 'hidden';

          _this3._fireEvent('open');
        } else {
          _this3._loadItem(currentItem).then(function () {
            _this3._initPhoto();

            _this3.addAppearEffect(element, currentItem);

            _this3.clicked = true;

            _this3.update();

            body.style.overflow = 'hidden';

            _this3._fireEvent('open');
          });
        }
      };

      element.addEventListener('click', clickHandler);

      this._registerRemoveEvent(element, 'click', clickHandler);
    }
  }, {
    key: "_initPhoto",
    value: function _initPhoto() {
      this.data.total = this.groupItems().length;
      this.data.hide = false;
      this.data.photoPosX = 0;
      this.data.photoPosY = 0;

      this._setPosByCurrentIndex();

      this._setSizeByScreen();

      this.setArrow();

      if (this.data.resizeStyle === 'fill' && this.data.isSmartPhone) {
        this.data.scale = true;
        this.data.hideUi = true;
        this.data.scaleSize = this._getScaleBoarder();
      }
    }
  }, {
    key: "onUpdated",
    value: function onUpdated() {
      var _this4 = this;

      if (this.data.appearEffect && this.data.appearEffect.once) {
        this.data.appearEffect.once = false;
        this.execEffect().then(function () {
          _this4.data.appearEffect = null;
          _this4.data.appear = true;

          _this4.update();
        });
      }

      if (this.clicked) {
        this.clicked = false;
        var classNames = this.data.classNames;

        var caption = this._getElementByClass(classNames.smartPhotoCaption);

        caption.focus();
      }
    }
  }, {
    key: "execEffect",
    value: function execEffect() {
      var _this5 = this;

      return new Promise(function (resolve) {
        if (util.isOldIE()) {
          resolve();
        }

        var _this5$data = _this5.data,
            appearEffect = _this5$data.appearEffect,
            classNames = _this5$data.classNames;

        var effect = _this5._getElementByClass(classNames.smartPhotoImgClone);

        var handler = function handler() {
          effect.removeEventListener('transitionend', handler, true);
          resolve();
        };

        effect.addEventListener('transitionend', handler, true);
        setTimeout(function () {
          effect.style.transform = "translate(".concat(appearEffect.afterX, "px, ").concat(appearEffect.afterY, "px) scale(").concat(appearEffect.scale, ")");
        }, 10);
      });
    }
  }, {
    key: "addAppearEffect",
    value: function addAppearEffect(element, item) {
      if (this.data.showAnimation === false) {
        this.data.appear = true;
        return;
      }

      var img = element.querySelector('img');
      var pos = util.getViewPos(img);
      var appear = {};
      var scale = 1;
      appear.width = img.offsetWidth;
      appear.height = img.offsetHeight;
      appear.top = pos.top;
      appear.left = pos.left;
      appear.once = true;

      if (img.getAttribute(this.data.lazyAttribute)) {
        appear.img = img.getAttribute(this.data.lazyAttribute);
      } else {
        appear.img = item.src;
      }

      var toX = this._getWindowWidth();

      var toY = this._getWindowHeight();

      var screenY = toY - this.data.headerHeight - this.data.footerHeight;

      if (this.data.resizeStyle === 'fill' && this.data.isSmartPhone) {
        if (img.offsetWidth > img.offsetHeight) {
          scale = toY / img.offsetHeight;
        } else {
          scale = toX / img.offsetWidth;
        }
      } else {
        if (appear.width >= appear.height) {
          if (item.height < screenY) {
            scale = item.width / appear.width;
          } else {
            scale = screenY / appear.height;
          }
        } else if (appear.height > appear.width) {
          if (item.height < screenY) {
            scale = item.height / appear.height;
          } else {
            scale = screenY / appear.height;
          }
        }

        if (appear.width * scale > toX) {
          scale = toX / appear.width;
        }
      }

      var x = (scale - 1) / 2 * img.offsetWidth + (toX - img.offsetWidth * scale) / 2;
      var y = (scale - 1) / 2 * img.offsetHeight + (toY - img.offsetHeight * scale) / 2;
      appear.afterX = x;
      appear.afterY = y;
      appear.scale = scale;
      this.data.appearEffect = appear;
    }
  }, {
    key: "hidePhoto",
    value: function hidePhoto() {
      var _this6 = this;

      var dir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'bottom';
      this.data.hide = true;
      this.data.appear = false;
      this.data.appearEffect = null;
      this.data.hideUi = false;
      this.data.scale = false;
      this.data.scaleSize = 1;
      var scrollX = window.pageXOffset !== undefined ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
      var scrollY = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
      var body = document.querySelector('body');

      if (window.location.hash) {
        this._setHash('');
      }

      window.scroll(scrollX, scrollY);

      this._doHideEffect(dir).then(function () {
        _this6.update();

        body.style.overflow = '';

        _this6._fireEvent('close');
      });
    }
  }, {
    key: "_doHideEffect",
    value: function _doHideEffect(dir) {
      var _this7 = this;

      return new Promise(function (resolve) {
        if (util.isOldIE()) {
          resolve();
        }

        var classNames = _this7.data.classNames;

        var photo = _this7._getElementByClass(classNames.smartPhoto);

        var img = _this7._getElementByQuery(".current .".concat(classNames.smartPhotoImg));

        var height = _this7._getWindowHeight();

        var handler = function handler() {
          photo.removeEventListener('transitionend', handler, true);
          resolve();
        };

        photo.style.opacity = 0;

        if (dir === 'bottom') {
          img.style.transform = "translateY(".concat(height, "px)");
        } else if (dir === 'top') {
          img.style.transform = "translateY(-".concat(height, "px)");
        }

        photo.addEventListener('transitionend', handler, true);
      });
    }
  }, {
    key: "_getElementByClass",
    value: function _getElementByClass(className) {
      return document.querySelector("[data-id=\"".concat(this.id, "\"] .").concat(className));
    }
  }, {
    key: "_getElementByQuery",
    value: function _getElementByQuery(query) {
      return document.querySelector("[data-id=\"".concat(this.id, "\"] ").concat(query));
    }
  }, {
    key: "_getTouchPos",
    value: function _getTouchPos() {
      var x = 0;
      var y = 0;
      var e = typeof event === 'undefined' ? this.e : event;

      if (this._isTouched(e)) {
        x = e.touches[0].pageX;
        y = e.touches[0].pageY;
      } else if (e.pageX) {
        x = e.pageX;
        y = e.pageY;
      }

      return {
        x: x,
        y: y
      };
    }
  }, {
    key: "_getGesturePos",
    value: function _getGesturePos(e) {
      var touches = e.touches;
      return [{
        x: touches[0].pageX,
        y: touches[0].pageY
      }, {
        x: touches[1].pageX,
        y: touches[1].pageY
      }];
    }
  }, {
    key: "_setPosByCurrentIndex",
    value: function _setPosByCurrentIndex() {
      var _this8 = this;

      var items = this.groupItems();
      var moveX = -1 * items[this.data.currentIndex].translateX;
      this.pos.x = moveX;
      setTimeout(function () {
        _this8.data.translateX = moveX;
        _this8.data.translateY = 0;

        _this8._listUpdate();
      }, 1);
    }
  }, {
    key: "_setHashByCurrentIndex",
    value: function _setHashByCurrentIndex() {
      var scrollX = window.pageXOffset !== undefined ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
      var scrollY = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
      var items = this.groupItems();
      var id = items[this.data.currentIndex].id;
      var group = this.data.currentGroup;
      var hash = "group=".concat(group, "&photo=").concat(id);

      this._setHash(hash);

      window.scroll(scrollX, scrollY);
    }
  }, {
    key: "_setHash",
    value: function _setHash(hash) {
      if (!(window.history && window.history.pushState) || !this.data.useHistoryApi) {
        return;
      }

      if (hash) {
        window.history.replaceState(null, null, "".concat(location.pathname).concat(location.search, "#").concat(hash));
      } else {
        window.history.replaceState(null, null, "".concat(location.pathname).concat(location.search));
      }
    }
  }, {
    key: "_getCurrentItemByHash",
    value: function _getCurrentItemByHash() {
      var group = this.data.group;
      var hash = location.hash.substr(1);
      var hashObj = util.parseQuery(hash);
      var currentItem = null;

      var getCurrentItem = function getCurrentItem(item) {
        if (hashObj.group === item.groupId && hashObj.photo === item.id) {
          currentItem = item;
        }
      };

      Object.keys(group).forEach(function (key) {
        group[key].forEach(getCurrentItem);
      });
      return currentItem;
    }
  }, {
    key: "_loadItem",
    value: function _loadItem(item) {
      return new Promise(function (resolve) {
        var img = new Image();

        img.onload = function () {
          item.width = img.width;
          item.height = img.height;
          item.loaded = true;
          resolve();
        };

        img.onerror = function () {
          resolve();
        };

        img.src = item.src;
      });
    }
  }, {
    key: "_getItemByIndex",
    value: function _getItemByIndex(index) {
      var data = this.data;

      if (data.group[data.currentGroup][index]) {
        return data.group[data.currentGroup][index];
      }

      return null;
    }
  }, {
    key: "_loadNeighborItems",
    value: function _loadNeighborItems() {
      var _this9 = this;

      var index = this.data.currentIndex;
      var loadOffset = this.data.loadOffset;
      var from = index - loadOffset;
      var to = index + loadOffset;
      var promises = [];

      for (var i = from; i < to; i++) {
        var item = this._getItemByIndex(i);

        if (item && !item.loaded) {
          promises.push(this._loadItem(item));
        }
      }

      if (promises.length) {
        Promise.all(promises).then(function () {
          _this9._initPhoto();

          _this9.update();
        });
      }
    }
  }, {
    key: "_setSizeByScreen",
    value: function _setSizeByScreen() {
      var windowX = this._getWindowWidth();

      var windowY = this._getWindowHeight();

      var headerHeight = this.data.headerHeight;
      var footerHeight = this.data.footerHeight;
      var screenY = windowY - (headerHeight + footerHeight);
      var items = this.groupItems();
      items.forEach(function (item) {
        if (!item.loaded) {
          return;
        }

        item.processed = true;
        item.scale = screenY / item.height;

        if (item.height < screenY) {
          item.scale = 1;
        }

        item.x = (item.scale - 1) / 2 * item.width + (windowX - item.width * item.scale) / 2;
        item.y = (item.scale - 1) / 2 * item.height + (windowY - item.height * item.scale) / 2;

        if (item.width * item.scale > windowX) {
          item.scale = windowX / item.width;
          item.x = (item.scale - 1) / 2 * item.width;
        }
      });
    }
  }, {
    key: "_slideList",
    value: function _slideList() {
      var _this10 = this;

      this.data.scaleSize = 1;
      this.isBeingZoomed = false;
      this.data.hideUi = false;
      this.data.scale = false;
      this.data.photoPosX = 0;
      this.data.photoPosY = 0;
      this.data.onMoveClass = true;

      this._setPosByCurrentIndex();

      this._setHashByCurrentIndex();

      this._setSizeByScreen();

      setTimeout(function () {
        var item = _this10._getSelectedItem();

        _this10.data.onMoveClass = false;

        _this10.setArrow();

        _this10.update();

        if (_this10.data.oldIndex !== _this10.data.currentIndex) {
          _this10._fireEvent('change');
        }

        _this10.data.oldIndex = _this10.data.currentIndex;

        _this10._loadNeighborItems();

        if (!item.loaded) {
          _this10._loadItem(item).then(function () {
            _this10._initPhoto();

            _this10.update();
          });
        }
      }, 200);
    }
  }, {
    key: "gotoSlide",
    value: function gotoSlide(index) {
      if (this.e && this.e.preventDefault) {
        this.e.preventDefault();
      }

      this.data.currentIndex = parseInt(index, 10);

      if (!this.data.currentIndex) {
        this.data.currentIndex = 0;
      }

      this._slideList();
    }
  }, {
    key: "setArrow",
    value: function setArrow() {
      var items = this.groupItems();
      var length = items.length;
      var next = this.data.currentIndex + 1;
      var prev = this.data.currentIndex - 1;
      this.data.showNextArrow = false;
      this.data.showPrevArrow = false;

      if (next !== length) {
        this.data.next = next;
        this.data.showNextArrow = true;
      }

      if (prev !== -1) {
        this.data.prev = prev;
        this.data.showPrevArrow = true;
      }
    }
  }, {
    key: "beforeDrag",
    value: function beforeDrag() {
      if (this._isGestured(this.e)) {
        this.beforeGesture();
        return;
      }

      this.isBeingZoomed = false;

      if (this.data.scale) {
        this.beforePhotoDrag();
        return;
      }

      var pos = this._getTouchPos();

      this.isSwipable = true;
      this.dragStart = true;
      this.firstPos = pos;
      this.oldPos = pos;
    }
  }, {
    key: "afterDrag",
    value: function afterDrag() {
      var items = this.groupItems();
      var date = new Date();
      var tapSecond = date.getTime();
      var offset = this.tapSecond - tapSecond;
      var swipeWidth = 0;
      var swipeHeight = 0;
      this.isSwipable = false;
      this.onListMove = false;

      if (this.oldPos) {
        swipeWidth = this.oldPos.x - this.firstPos.x;
        swipeHeight = this.oldPos.y - this.firstPos.y;
      }

      if (this.isBeingZoomed) {
        this.afterGesture();
        return;
      }

      if (this.data.scale) {
        this.afterPhotoDrag();
        return;
      } else if (!util.isSmartPhone() && swipeWidth === 0 && swipeHeight === 0) {
        this.zoomPhoto();
        return;
      }

      if (Math.abs(offset) <= 500 && swipeWidth === 0 && swipeHeight === 0) {
        this.e.preventDefault();
        this.zoomPhoto();
        return;
      }

      this.tapSecond = tapSecond;

      this._fireEvent('swipeend');

      if (this.moveDir === 'horizontal') {
        if (swipeWidth >= this.data.swipeOffset && this.data.currentIndex !== 0) {
          this.data.currentIndex -= 1;
        } else if (swipeWidth <= -this.data.swipeOffset && this.data.currentIndex !== items.length - 1) {
          this.data.currentIndex += 1;
        }

        this._slideList();
      }

      if (this.moveDir === 'vertical') {
        if (this.data.swipeBottomToClose && swipeHeight >= this.data.swipeOffset) {
          this.hidePhoto('bottom');
        } else if (this.data.swipeTopToClose && swipeHeight <= -this.data.swipeOffset) {
          this.hidePhoto('top');
        } else {
          this.data.translateY = 0;

          this._slideList();
        }
      }
    }
  }, {
    key: "onDrag",
    value: function onDrag() {
      this.e.preventDefault();

      if (this._isGestured(this.e) && this.onListMove === false) {
        this.onGesture();
        return;
      }

      if (this.isBeingZoomed) {
        return;
      }

      if (this.data.scale) {
        this.onPhotoDrag();
        return;
      }

      if (!this.isSwipable) {
        return;
      }

      var pos = this._getTouchPos();

      var x = pos.x - this.oldPos.x;
      var y = pos.y - this.firstPos.y;

      if (this.dragStart) {
        this._fireEvent('swipestart');

        this.dragStart = false;

        if (Math.abs(x) > Math.abs(y)) {
          this.moveDir = 'horizontal';
        } else {
          this.moveDir = 'vertical';
        }
      }

      if (this.moveDir === 'horizontal') {
        this.pos.x += x;
        this.data.translateX = this.pos.x;
      } else {
        this.data.translateY = y;
      }

      this.onListMove = true;
      this.oldPos = pos;

      this._listUpdate();
    }
  }, {
    key: "zoomPhoto",
    value: function zoomPhoto() {
      var _this11 = this;

      this.data.hideUi = true;
      this.data.scaleSize = this._getScaleBoarder();

      if (this.data.scaleSize <= 1) {
        return;
      }

      this.data.photoPosX = 0;
      this.data.photoPosY = 0;

      this._photoUpdate();

      setTimeout(function () {
        _this11.data.scale = true;

        _this11._photoUpdate();

        _this11._fireEvent('zoomin');
      }, 300);
    }
  }, {
    key: "zoomOutPhoto",
    value: function zoomOutPhoto() {
      this.data.scaleSize = 1;
      this.isBeingZoomed = false;
      this.data.hideUi = false;
      this.data.scale = false;
      this.data.photoPosX = 0;
      this.data.photoPosY = 0;

      this._photoUpdate();

      this._fireEvent('zoomout');
    }
  }, {
    key: "beforePhotoDrag",
    value: function beforePhotoDrag() {
      var pos = this._getTouchPos();

      this.photoSwipable = true;

      if (!this.data.photoPosX) {
        this.data.photoPosX = 0;
      }

      if (!this.data.photoPosY) {
        this.data.photoPosY = 0;
      }

      this.oldPhotoPos = pos;
      this.firstPhotoPos = pos;
    }
  }, {
    key: "onPhotoDrag",
    value: function onPhotoDrag() {
      if (!this.photoSwipable) {
        return;
      }

      this.e.preventDefault();

      var pos = this._getTouchPos();

      var x = pos.x - this.oldPhotoPos.x;
      var y = pos.y - this.oldPhotoPos.y;

      var moveX = this._round(this.data.scaleSize * x, 6);

      var moveY = this._round(this.data.scaleSize * y, 6);

      if (typeof moveX === 'number') {
        this.data.photoPosX += moveX;
        this.photoVX = moveX;
      }

      if (typeof moveY === 'number') {
        this.data.photoPosY += moveY;
        this.photoVY = moveY;
      }

      this.oldPhotoPos = pos;

      this._photoUpdate();
    }
  }, {
    key: "afterPhotoDrag",
    value: function afterPhotoDrag() {
      if (this.oldPhotoPos.x === this.firstPhotoPos.x && this.photoSwipable) {
        this.photoSwipable = false;
        this.zoomOutPhoto();
      } else {
        this.photoSwipable = false;

        var item = this._getSelectedItem();

        var bound = this._makeBound(item);

        var offset = this.data.swipeOffset * this.data.scaleSize;
        var flagX = 0;
        var flagY = 0;

        if (this.data.photoPosX > bound.maxX) {
          flagX = -1;
        } else if (this.data.photoPosX < bound.minX) {
          flagX = 1;
        }

        if (this.data.photoPosY > bound.maxY) {
          flagY = -1;
        } else if (this.data.photoPosY < bound.minY) {
          flagY = 1;
        }

        if (this.data.photoPosX - bound.maxX > offset && this.data.currentIndex !== 0) {
          this.gotoSlide(this.data.prev);
          return;
        }

        if (bound.minX - this.data.photoPosX > offset && this.data.currentIndex + 1 !== this.data.total) {
          this.gotoSlide(this.data.next);
          return;
        } // todo
        // if(this.data.photoPosY - bound.maxY > offset) {
        //   this.hidePhoto();
        //   return;
        // }


        if (flagX === 0 && flagY === 0) {
          this.vx = this.photoVX / 5;
          this.vy = this.photoVY / 5;
        } else {
          this._registerElasticForce(flagX, flagY);
        }
      }
    }
  }, {
    key: "beforeGesture",
    value: function beforeGesture() {
      this._fireEvent('gesturestart');

      var pos = this._getGesturePos(this.e);

      var distance = this._getDistance(pos[0], pos[1]);

      this.isBeingZoomed = true;
      this.oldDistance = distance;
      this.data.scale = true;
      this.e.preventDefault();
    }
  }, {
    key: "onGesture",
    value: function onGesture() {
      var pos = this._getGesturePos(this.e);

      var distance = this._getDistance(pos[0], pos[1]);

      var size = (distance - this.oldDistance) / 100;
      var oldScaleSize = this.data.scaleSize;
      var posX = this.data.photoPosX;
      var posY = this.data.photoPosY;
      this.isBeingZoomed = true;
      this.data.scaleSize += this._round(size, 6);

      if (this.data.scaleSize < 0.2) {
        this.data.scaleSize = 0.2;
      } // todo


      if (this.data.scaleSize < oldScaleSize) {
        this.data.photoPosX = (1 + this.data.scaleSize - oldScaleSize) * posX;
        this.data.photoPosY = (1 + this.data.scaleSize - oldScaleSize) * posY;
      }

      if (this.data.scaleSize < 1 || this.data.scaleSize > this._getScaleBoarder()) {
        this.data.hideUi = true;
      } else {
        this.data.hideUi = false;
      }

      this.oldDistance = distance;
      this.e.preventDefault();

      this._photoUpdate();
    }
  }, {
    key: "afterGesture",
    value: function afterGesture() {
      if (this.data.scaleSize > this._getScaleBoarder()) {
        return;
      }

      this.data.photoPosX = 0;
      this.data.photoPosY = 0;
      this.data.scale = false;
      this.data.scaleSize = 1;
      this.data.hideUi = false;

      this._fireEvent('gestureend');

      this._photoUpdate();
    }
  }, {
    key: "_getForceAndTheta",
    value: function _getForceAndTheta(vx, vy) {
      return {
        force: Math.sqrt(vx * vx + vy * vy),
        theta: Math.atan2(vy, vx)
      };
    }
  }, {
    key: "_getScaleBoarder",
    value: function _getScaleBoarder() {
      var item = this._getSelectedItem();

      var windowWidth = this._getWindowWidth();

      var windowHeight = this._getWindowHeight();

      if (!util.isSmartPhone()) {
        return 1 / item.scale;
      }

      if (item.width > item.height) {
        return windowHeight / (item.height * item.scale);
      }

      return windowWidth / (item.width * item.scale);
    }
  }, {
    key: "_makeBound",
    value: function _makeBound(item) {
      var width = item.width * item.scale * this.data.scaleSize;
      var height = item.height * item.scale * this.data.scaleSize;
      var minX;
      var minY;
      var maxX;
      var maxY;

      var windowWidth = this._getWindowWidth();

      var windowHeight = this._getWindowHeight();

      if (windowWidth > width) {
        maxX = (windowWidth - width) / 2;
        minX = -1 * maxX;
      } else {
        maxX = (width - windowWidth) / 2;
        minX = -1 * maxX;
      }

      if (windowHeight > height) {
        maxY = (windowHeight - height) / 2;
        minY = -1 * maxY;
      } else {
        maxY = (height - windowHeight) / 2;
        minY = -1 * maxY;
      }

      return {
        minX: this._round(minX, 6) * this.data.scaleSize,
        minY: this._round(minY, 6) * this.data.scaleSize,
        maxX: this._round(maxX, 6) * this.data.scaleSize,
        maxY: this._round(maxY, 6) * this.data.scaleSize
      };
    }
  }, {
    key: "_registerElasticForce",
    value: function _registerElasticForce(x, y) {
      var _this12 = this;

      var item = this._getSelectedItem();

      var bound = this._makeBound(item);

      this.data.elastic = true;

      if (x === 1) {
        this.data.photoPosX = bound.minX;
      } else if (x === -1) {
        this.data.photoPosX = bound.maxX;
      }

      if (y === 1) {
        this.data.photoPosY = bound.minY;
      } else if (y === -1) {
        this.data.photoPosY = bound.maxY;
      }

      this._photoUpdate();

      setTimeout(function () {
        _this12.data.elastic = false;

        _this12._photoUpdate();
      }, 300);
    }
  }, {
    key: "_getSelectedItem",
    value: function _getSelectedItem() {
      var data = this.data;
      var index = data.currentIndex;
      return data.group[data.currentGroup][index];
    }
  }, {
    key: "_getUniqId",
    value: function _getUniqId() {
      return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    }
  }, {
    key: "_getDistance",
    value: function _getDistance(point1, point2) {
      var x = point1.x - point2.x;
      var y = point1.y - point2.y;
      return Math.sqrt(x * x + y * y);
    }
  }, {
    key: "_round",
    value: function _round(val, precision) {
      var digit = Math.pow(10, precision);
      val *= digit;
      val = Math.round(val);
      val /= digit;
      return val;
    }
  }, {
    key: "_isTouched",
    value: function _isTouched(e) {
      if (e && e.touches) {
        return true;
      }

      return false;
    }
  }, {
    key: "_isGestured",
    value: function _isGestured(e) {
      if (e && e.touches && e.touches.length > 1) {
        return true;
      }

      return false;
    }
  }, {
    key: "_isSmartPhone",
    value: function _isSmartPhone() {
      var agent = navigator.userAgent;

      if (agent.indexOf('iPhone') > 0 || agent.indexOf('iPad') > 0 || agent.indexOf('ipod') > 0 || agent.indexOf('Android') > 0) {
        return true;
      }

      return false;
    }
  }, {
    key: "_calcGravity",
    value: function _calcGravity(gamma, beta) {
      if (gamma > 5 || gamma < -5) {
        this.vx += gamma * 0.05;
      }

      if (this.data.verticalGravity === false) {
        return;
      }

      if (beta > 5 || beta < -5) {
        this.vy += beta * 0.05;
      }
    }
  }, {
    key: "_photoUpdate",
    value: function _photoUpdate() {
      var classNames = this.data.classNames;

      var current = this._getElementByQuery('.current');

      var img = current.querySelector(".".concat(classNames.smartPhotoImg));

      var nav = this._getElementByQuery(".".concat(classNames.smartPhotoNav));

      var arrows = this._getElementByQuery(".".concat(classNames.smartPhotoArrows));

      var photoPosX = this.virtualPos(this.data.photoPosX);
      var photoPosY = this.virtualPos(this.data.photoPosY);
      var scaleSize = this.data.scaleSize;
      var transform = "translate(".concat(photoPosX, "px,").concat(photoPosY, "px) scale(").concat(scaleSize, ")");
      img.style.transform = transform;

      if (this.data.scale) {
        util.addClass(img, classNames.smartPhotoImgOnMove);
      } else {
        util.removeClass(img, classNames.smartPhotoImgOnMove);
      }

      if (this.data.elastic) {
        util.addClass(img, classNames.smartPhotoImgElasticMove);
      } else {
        util.removeClass(img, classNames.smartPhotoImgElasticMove);
      }

      if (this.data.hideUi) {
        if (nav) {
          nav.setAttribute('aria-hidden', 'true');
        }

        if (arrows) {
          arrows.setAttribute('aria-hidden', 'true');
        }
      } else {
        if (nav) {
          nav.setAttribute('aria-hidden', 'false');
        }

        if (arrows) {
          arrows.setAttribute('aria-hidden', 'false');
        }
      }
    }
  }, {
    key: "_getWindowWidth",
    value: function _getWindowWidth() {
      if (document && document.documentElement) {
        return document.documentElement.clientWidth;
      } else if (window && window.innerWidth) {
        return window.innerWidth;
      }

      return 0;
    }
  }, {
    key: "_getWindowHeight",
    value: function _getWindowHeight() {
      if (document && document.documentElement) {
        return document.documentElement.clientHeight;
      } else if (window && window.innerHeight) {
        return window.innerHeight;
      }

      return 0;
    }
  }, {
    key: "_listUpdate",
    value: function _listUpdate() {
      var classNames = this.data.classNames;

      var list = this._getElementByQuery(".".concat(classNames.smartPhotoList));

      var transform = "translate(".concat(this.data.translateX, "px,").concat(this.data.translateY, "px)");
      list.style.transform = transform; // $list

      if (this.data.onMoveClass) {
        util.addClass(list, classNames.smartPhotoListOnMove);
      } else {
        util.removeClass(list, classNames.smartPhotoListOnMove);
      }
    }
  }, {
    key: "_fireEvent",
    value: function _fireEvent(eventName) {
      var photo = this._getElementByClass(this.data.classNames.smartPhoto);

      util.triggerEvent(photo, eventName);
    }
  }, {
    key: "_doAnim",
    value: function _doAnim() {
      if (this.isBeingZoomed || this.isSwipable || this.photoSwipable || this.data.elastic || !this.data.scale) {
        return;
      }

      this.data.photoPosX += this.vx;
      this.data.photoPosY += this.vy;

      var item = this._getSelectedItem();

      var bound = this._makeBound(item);

      if (this.data.photoPosX < bound.minX) {
        this.data.photoPosX = bound.minX;
        this.vx *= -0.2;
      } else if (this.data.photoPosX > bound.maxX) {
        this.data.photoPosX = bound.maxX;
        this.vx *= -0.2;
      }

      if (this.data.photoPosY < bound.minY) {
        this.data.photoPosY = bound.minY;
        this.vy *= -0.2;
      } else if (this.data.photoPosY > bound.maxY) {
        this.data.photoPosY = bound.maxY;
        this.vy *= -0.2;
      }

      var power = this._getForceAndTheta(this.vx, this.vy);

      var force = power.force;
      var theta = power.theta;
      force -= this.data.registance;

      if (Math.abs(force) < 0.5) {
        return;
      }

      this.vx = Math.cos(theta) * force;
      this.vy = Math.sin(theta) * force;

      this._photoUpdate();
    }
  }]);

  return SmartPhoto;
}(_aTemplate["default"]);

exports["default"] = SmartPhoto;
module.exports = exports["default"];

},{"../lib/util":11,"a-template":1,"custom-event-polyfill":3,"es6-promise-polyfill":4}],10:[function(require,module,exports){
'use strict';

module.exports = require('./core/');

},{"./core/":9}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isOldIE = exports.getBrowser = exports.removeClass = exports.addClass = exports.append = exports.removeElement = exports.getViewPos = exports.parseQuery = exports.triggerEvent = exports.extend = exports.isSmartPhone = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isSmartPhone = function isSmartPhone() {
  var agent = navigator.userAgent;

  if (agent.indexOf('iPhone') > 0 || agent.indexOf('iPad') > 0 || agent.indexOf('ipod') > 0 || agent.indexOf('Android') > 0) {
    return true;
  } else {
    return false;
  }
};

exports.isSmartPhone = isSmartPhone;

function deepExtend(out) {
  out = out || {};

  for (var i = 1; i < arguments.length; i++) {
    var obj = arguments[i];

    if (!obj) {
      continue;
    }

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (_typeof(obj[key]) === 'object') out[key] = deepExtend(out[key], obj[key]);else out[key] = obj[key];
      }
    }
  }

  return out;
}

;
var extend = deepExtend;
exports.extend = extend;

var triggerEvent = function triggerEvent(el, eventName, options) {
  var event;

  if (window.CustomEvent) {
    event = new CustomEvent(eventName, {
      cancelable: true
    });
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(eventName, false, false, options);
  }

  el.dispatchEvent(event);
};

exports.triggerEvent = triggerEvent;

var parseQuery = function parseQuery(query) {
  var s = query.split('&'),
      data = {},
      i = 0,
      iz = s.length,
      param,
      key,
      value;

  for (; i < iz; i++) {
    param = s[i].split('=');

    if (param[0] !== void 0) {
      key = param[0];
      value = param[1] !== void 0 ? param.slice(1).join('=') : key;
      data[key] = decodeURIComponent(value);
    }
  }

  return data;
};

exports.parseQuery = parseQuery;

var getViewPos = function getViewPos(element) {
  return {
    left: element.getBoundingClientRect().left,
    top: element.getBoundingClientRect().top
  };
};

exports.getViewPos = getViewPos;

var removeElement = function removeElement(element) {
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
};

exports.removeElement = removeElement;

var append = function append(element, string) {
  var div = document.createElement('div');
  div.innerHTML = string;

  while (div.children.length > 0) {
    element.appendChild(div.children[0]);
  }
};

exports.append = append;

var addClass = function addClass(element, className) {
  if (element.classList) {
    element.classList.add(className);
  } else {
    element.className += " ".concat(className);
  }
};

exports.addClass = addClass;

var removeClass = function removeClass(element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else {
    element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
};

exports.removeClass = removeClass;

var getBrowser = function getBrowser() {
  var ua = window.navigator.userAgent.toLowerCase();
  var ver = window.navigator.appVersion.toLowerCase();
  var name = 'unknown';

  if (ua.indexOf('msie') != -1) {
    if (ver.indexOf('msie 6.') != -1) {
      name = 'ie6';
    } else if (ver.indexOf('msie 7.') != -1) {
      name = 'ie7';
    } else if (ver.indexOf('msie 8.') != -1) {
      name = 'ie8';
    } else if (ver.indexOf('msie 9.') != -1) {
      name = 'ie9';
    } else if (ver.indexOf('msie 10.') != -1) {
      name = 'ie10';
    } else {
      name = 'ie';
    }
  } else if (ua.indexOf('trident/7') != -1) {
    name = 'ie11';
  } else if (ua.indexOf('chrome') != -1) {
    name = 'chrome';
  } else if (ua.indexOf('safari') != -1) {
    name = 'safari';
  } else if (ua.indexOf('opera') != -1) {
    name = 'opera';
  } else if (ua.indexOf('firefox') != -1) {
    name = 'firefox';
  }

  return name;
};

exports.getBrowser = getBrowser;

var isOldIE = function isOldIE() {
  var browser = getBrowser();

  if (browser.indexOf('ie') !== -1) {
    if (parseInt(browser.replace(/[^0-9]/g, '')) <= 10) {
      return true;
    }
  }

  return false;
};

exports.isOldIE = isOldIE;

},{}]},{},[10])(10)
});
