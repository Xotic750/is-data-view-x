/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/is-data-view-x"
 * title="Travis status">
 * <img src="https://travis-ci.org/Xotic750/is-data-view-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/is-data-view-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/is-data-view-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a
 * href="https://david-dm.org/Xotic750/is-data-view-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/is-data-view-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/is-data-view-x" title="npm version">
 * <img src="https://badge.fury.io/js/is-data-view-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * isDataView module. Detect whether or not an object is a DataView.
 *
 * <h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
 * `es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
 * methods that can be faithfully emulated with a legacy JavaScript engine.
 *
 * `es5-sham.js` monkey-patches other ES5 methods as closely as possible.
 * For these methods, as closely as possible to ES5 is not very close.
 * Many of these shams are intended only to allow code to be written to ES5
 * without causing run-time errors in older engines. In many cases,
 * this means that these shams cause many ES5 methods to silently fail.
 * Decide carefully whether this is what you want. Note: es5-sham.js requires
 * es5-shim.js to be able to work properly.
 *
 * `json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.
 *
 * `es6.shim.js` provides compatibility shims so that legacy JavaScript engines
 * behave as closely as possible to ECMAScript 6 (Harmony).
 *
 * @version 1.0.9
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-data-view-x
 */

/*jslint maxlen:80, es6:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:1, maxdepth:3,
  maxstatements:17, maxcomplexity:6 */

/*global module */

;(function () {
  'use strict';

  var isObjectLike = require('is-object-like-x');
  var hasDView = typeof DataView === 'function';
  var getByteLength, legacyCheck;

  if (hasDView) {
    if (require('has-to-string-tag-x')) {
      try {
        getByteLength = Object.getOwnPropertyDescriptor(
          DataView.prototype,
          'byteLength'
        ).get;
        getByteLength = typeof getByteLength.call(
          new DataView(new ArrayBuffer(4))
        ) !== 'number' && getByteLength;
      } catch (ignore) {
        getByteLength = null;
      }
    }
    if (!getByteLength) {
      var toStringTag = require('to-string-tag-x');
      var dViewTag = '[object DataView]';
      if (toStringTag(new DataView(new ArrayBuffer(4))) === dViewTag) {
        legacyCheck = function byStringTag(object) {
          return toStringTag(object) === dViewTag;
        };
      } else {
        var isArrayBuffer = require('is-array-buffer-x');
        legacyCheck = function byDuckType(object) {
          return typeof object.byteLength === 'number' &&
            typeof object.byteOffset === 'number' &&
            typeof object.getFloat32 === 'function' &&
            typeof object.setFloat64 === 'function' &&
            isArrayBuffer(object.buffer);
        };
      }
    }
  }

  /**
   * Determine if an `object` is an `DataView`.
   *
   * @param {*} object The object to test.
   * @return {boolean} `true` if the `object` is a `DataView`, else `false`.
   * @example
   * var isDataView = require('is-data-view-x');
   * var ab = new ArrayBuffer(4);
   * var dv = new DataView(ab);
   *
   * isDataView(ab); // false
   * isDataView(true); // false
   * isDataView(dv); // true
   */
  module.exports = function isDataView(object) {
    if (!hasDView || !isObjectLike(object)) {
      return false;
    }
    if (legacyCheck) {
      return legacyCheck(object);
    }
    try {
      return typeof getByteLength.call(object) === 'number';
    } catch (ignore) {}
    return false;
  };
}());
