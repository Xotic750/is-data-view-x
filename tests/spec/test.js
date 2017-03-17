/* jslint maxlen:80, es6:true, white:true */

/* jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
   freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
   nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
   es3:false, esnext:true, plusplus:true, maxparams:1, maxdepth:2,
   maxstatements:12, maxcomplexity:4 */

/* eslint strict: 1, max-lines: 1, symbol-description: 1, max-nested-callbacks: 1,
   max-statements: 1 */

/* global JSON:true,  expect, module, require, describe, xit, it,
   returnExports, DataView, ArrayBuffer, Int16Array, Int32Array,
   Uint8Array, Uint16Array, Uint32Array, Float32Array, Float64Array */

;(function () { // eslint-disable-line no-extra-semi

  'use strict';

  var isDataView;
  if (typeof module === 'object' && module.exports) {
    require('es5-shim');
    require('es5-shim/es5-sham');
    if (typeof JSON === 'undefined') {
      JSON = {};
    }
    require('json3').runInContext(null, JSON);
    require('es6-shim');
    var es7 = require('es7-shim');
    Object.keys(es7).forEach(function (key) {
      var obj = es7[key];
      if (typeof obj.shim === 'function') {
        obj.shim();
      }
    });
    isDataView = require('../../index.js');
  } else {
    isDataView = returnExports;
  }

  var ifHasDataView = typeof DataView === 'function' ? it : xit;

  describe('isDataView', function () {
    it('basic', function () {
      expect(isDataView()).toBe(false);
      expect(isDataView(undefined)).toBe(false);
      expect(isDataView(null)).toBe(false);
      expect(isDataView(1)).toBe(false);
      expect(isDataView(true)).toBe(false);
      expect(isDataView('abc')).toBe(false);
      expect(isDataView([])).toBe(false);
      expect(isDataView({})).toBe(false);
    });

    ifHasDataView('hasDataView', function () {
      expect(isDataView(new ArrayBuffer(4))).toBe(false);
      expect(isDataView(new Int16Array(4))).toBe(false);
      expect(isDataView(new Int32Array(4))).toBe(false);
      expect(isDataView(new Uint8Array(4))).toBe(false);
      expect(isDataView(new Uint16Array(4))).toBe(false);
      expect(isDataView(new Uint32Array(4))).toBe(false);
      expect(isDataView(new Float32Array(4))).toBe(false);
      expect(isDataView(new Float64Array(4))).toBe(false);
      expect(isDataView(new DataView(new ArrayBuffer(4)))).toBe(true);
    });
  });
}());
