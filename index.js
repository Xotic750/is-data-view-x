/**
 * @file Detect whether or not an object is a DataView.
 * @version 1.4.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-data-view-x
 */

/* global ArrayBuffer, DataView */

'use strict';

var isObjectLike = require('is-object-like-x');
var hasDView = typeof DataView === 'function';
var getByteLength;
var legacyCheck;

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
    } catch (ignore) {}
  }

  if (Boolean(getByteLength) === false) {
    var toStringTag = require('to-string-tag-x');
    var dViewTag = '[object DataView]';
    if (toStringTag(new DataView(new ArrayBuffer(4))) === dViewTag) {
      legacyCheck = function byStringTag(object) {
        return toStringTag(object) === dViewTag;
      };
    } else {
      var isArrayBuffer = require('is-array-buffer-x');
      legacyCheck = function byDuckType(object) {
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

  try {
    return typeof getByteLength.call(object) === 'number';
  } catch (ignore) {}

  return false;
};
