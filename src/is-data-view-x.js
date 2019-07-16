/**
 * @file Detect whether or not an object is a DataView.
 * @version 1.6.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-data-view-x
 */

/* global ArrayBuffer, DataView */

import attempt from 'attempt-x';

import isObjectLike from 'is-object-like-x';

const hasDView = typeof DataView === 'function';
let getByteLength = false;
let legacyCheck;

if (hasDView) {
  let res = attempt(function() {
    return new DataView(new ArrayBuffer(4));
  });

  const dataView = res.threw === false && isObjectLike(res.value) && res.value;

  if (dataView && require('has-to-string-tag-x')) {
    const getOwnPropertyDescriptor = require('object-get-own-property-descriptor-x');
    const descriptor = getOwnPropertyDescriptor(DataView.prototype, 'byteLength');

    if (descriptor && typeof descriptor.get === 'function') {
      res = attempt.call(dataView, descriptor.get);
      getByteLength = res.threw === false && typeof res.value === 'number' && descriptor.get;
    }
  }

  if (getByteLength === false) {
    const toStringTag = require('to-string-tag-x');
    const dViewTag = '[object DataView]';

    if (toStringTag(dataView) === dViewTag) {
      legacyCheck = function _legacyCheck(object) {
        return toStringTag(object) === dViewTag;
      };
    } else {
      const isArrayBuffer = require('is-array-buffer-x');
      legacyCheck = function _legacyCheck(object) {
        const isByteLength = typeof object.byteLength === 'number';
        const isByteOffset = typeof object.byteOffset === 'number';
        const isGetFloat32 = typeof object.getFloat32 === 'function';
        const isSetFloat64 = typeof object.setFloat64 === 'function';

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
export default function isDataView(object) {
  if (hasDView === false || isObjectLike(object) === false) {
    return false;
  }

  if (legacyCheck) {
    return legacyCheck(object);
  }

  const result = attempt.call(object, getByteLength);

  return result.threw === false && typeof result.value === 'number';
}
