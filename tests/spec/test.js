/*jslint maxlen:80, es6:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:1, maxdepth:1,
  maxstatements:11, maxcomplexity:4 */

/*global expect, module, require, describe, xit, it, returnExports */

(function () {
  'use strict';

  var isDataView, hasArrayBuffer, ifHasArrayBuffer,
    hasDataView, ifHasDataView;
  if (typeof module === 'object' && module.exports) {
    require('es5-shim');
    require('es5-shim/es5-sham.js');
    isDataView = require('../../index.js');
  } else {
    isDataView = returnExports;
  }

  hasArrayBuffer = typeof ArrayBuffer === 'function';
  ifHasArrayBuffer = hasArrayBuffer ? it : xit;
  hasDataView = hasArrayBuffer && typeof DataView === 'function';
  ifHasDataView = hasDataView ? it : xit;

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

    ifHasArrayBuffer('hasArrayBuffer', function () {
      expect(isDataView(new ArrayBuffer(4))).toBe(false);
      expect(isDataView(new Int16Array(4))).toBe(false);
      expect(isDataView(new Int32Array(4))).toBe(false);
      expect(isDataView(new Uint8Array(4))).toBe(false);
      expect(isDataView(new Uint16Array(4))).toBe(false);
      expect(isDataView(new Uint32Array(4))).toBe(false);
      expect(isDataView(new Float32Array(4))).toBe(false);
      expect(isDataView(new Float64Array(4))).toBe(false);
    });

    ifHasDataView('hasDataView', function () {
      expect(isDataView(new DataView(new ArrayBuffer(4)))).toBe(true);
    });
  });
}());
