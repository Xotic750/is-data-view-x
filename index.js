/**
 * @file Detect whether or not an object is a DataView.
 * @version 1.6.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-data-view-x
 */

/* global ArrayBuffer, DataView */

'use strict';

var attempt = require('attempt-x');
var isObjectLike = require('is-object-like-x');
var hasDView = typeof DataView === 'function';
var getByteLength = false;
var legacyCheck;

if (hasDView) {
  var res = attempt(function () {
    return new DataView(new ArrayBuffer(4));
  });

  var dataView = res.threw === false && isObjectLike(res.value) && res.value;

  if (dataView && require('has-to-string-tag-x')) {
    var getOwnPropertyDescriptor = require('object-get-own-property-descriptor-x');
    var descriptor = getOwnPropertyDescriptor(DataView.prototype, 'byteLength');
    if (descriptor && typeof descriptor.get === 'function') {
      res = attempt.call(dataView, descriptor.get);
      getByteLength = res.threw === false && typeof res.value === 'number' && descriptor.get;
    }
  }

  if (getByteLength === false) {
    var toStringTag = require('to-string-tag-x');
    var dViewTag = '[object DataView]';
    if (toStringTag(dataView) === dViewTag) {
      legacyCheck = function _legacyCheck(object) {
        return toStringTag(object) === dViewTag;
      };
    } else {
      var isArrayBuffer = require('is-array-buffer-x');
      legacyCheck = function _legacyCheck(object) {
        var isByteLength = typeof object.byteLength === 'number';
        var isByteOffset = typeof object.byteOffset === 'number';
        var isGetFloat32 = typeof object.getFloat32 === 'function';
        var isSetFloat64 = typeof object.setFloat64 === 'function';
        return isByteLength && isByteOffset && isGetFloat32 && isSetFloat64 && isArrayBuffer(object.buffer);
      };
    }
  }
}

/**
 * Determine if an `object` is an `DataView`.
 *
 * @param {*} object - The object to test.
 * @returns {boolean} `true` if the `object` is a `DataView`, else `false`.
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
  if (hasDView === false || isObjectLike(object) === false) {
    return false;
  }

  if (legacyCheck) {
    return legacyCheck(object);
  }

  var result = attempt.call(object, getByteLength);
  return result.threw === false && typeof result.value === 'number';
};
