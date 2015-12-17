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
 * isDataView module. Detect whether or not an object is an ES6 DataView or
 * a legacy DataView.
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
 * @version 1.0.4
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
  maxstatements:8, maxcomplexity:6 */

/*global module */

;(function () {
  'use strict';

  var ES = require('es-abstract/es6'),
    isObjectLike = require('is-object-like-x'),
    toStringTag = require('to-string-tag-x'),
    isArrayBuffer = require('is-array-buffer-x'),
    DATAVIEW = typeof DataView === 'function' && DataView,
    getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor,
    getPrototypeOf = Object.getPrototypeOf,
    getByteLength, testObject, legacyCheck;

  if (DATAVIEW) {
    try {
      testObject = new DATAVIEW(new ArrayBuffer(4));
      getByteLength = getOwnPropertyDescriptor(
        getPrototypeOf(testObject),
        'byteLength'
      ).get;
      if (typeof ES.Call(getByteLength, testObject) !== 'number') {
        throw 'not a number';
      }
    } catch (ignore) {
      getByteLength = null;
    }
    if (!getByteLength) {
      if (toStringTag(testObject) === '[object DataView]') {
        legacyCheck = function byStringTag(object) {
            return toStringTag(object) === '[object DataView]';
        };
      } else {
        legacyCheck = function byDuckType(object) {
            return toStringTag(object) === '[object Object]' &&
              typeof object.byteLength === 'number' &&
              typeof object.byteOffset === 'number' &&
              isArrayBuffer(object.buffer) &&
              ES.IsCallable(object.getFloat32) &&
              ES.IsCallable(object.setFloat64);
        };
      }
    }
  }

  /**
   * Determine if an `object` is an `DataView`.
   *
   * @param {*} object The object to test.
   * @param {boolean} [es6=false] If `true` then only ES6 DataView objects will
   * be determined `true`.
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
    if (!DATAVIEW || !isObjectLike(object) || !getByteLength && arguments[1]) {
      return false;
    }
    if (!getByteLength && !arguments[1]) {
      return legacyCheck(object);
    }
    try {
      return typeof ES.Call(getByteLength, object) === 'number';
    } catch (ignore) {}
    return false;
  };
}());
