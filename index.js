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
 * @version 1.0.2
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
  maxstatements:8, maxcomplexity:4 */

/*global module */

;(function () {
  'use strict';

  var hasDataView = typeof DataView === 'function',
    ES = require('es-abstract/es6'),
    isObjectLike = require('is-object-like-x'),
    DATAVIEW = hasDataView && DataView,
    getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor,
    getPrototypeOf = Object.getPrototypeOf,
    getByteLength;

  if (DATAVIEW) {
    try {
      getByteLength = getOwnPropertyDescriptor(
        getPrototypeOf(new DATAVIEW(new ArrayBuffer(4))),
        'byteLength'
      ).get;
      if (typeof ES.Call(getByteLength, new DATAVIEW(new ArrayBuffer(4))) !== 'number') {
        throw 'not a number';
      }
    } catch (ignore) {
      DATAVIEW = getByteLength = null;
    }
  }

  /**
   * Determine if an `object` is an `DataView`.
   *
   * @param {*} object The object to test.
   * @return {boolean} `true` if the `object` is a `DataView`,
   *  else false`
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
    if (!getByteLength || !isObjectLike(object)) {
      return false;
    }
    try {
      return typeof ES.Call(getByteLength, object) === 'number';
    } catch (ignore) {}
    return false;
  };
}());
