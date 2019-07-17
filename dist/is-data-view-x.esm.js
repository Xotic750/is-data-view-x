var _this = this;

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

import attempt from 'attempt-x';
import isObjectLike from 'is-object-like-x';
import hasToStringTag from 'has-to-string-tag-x';
import getOwnPropertyDescriptor from 'object-get-own-property-descriptor-x';
import toStringTag from 'to-string-tag-x';
import isArrayBuffer from 'is-array-buffer-x';
var hasDView = typeof DataView === 'function';
var getByteLength = false;
var legacyCheck;

if (hasDView) {
  var res = attempt(function () {
    _newArrowCheck(this, _this);

    /* eslint-disable-next-line compat/compat */
    return new DataView(new ArrayBuffer(4));
  }.bind(this));
  var dataView = res.threw === false && isObjectLike(res.value) && res.value;

  if (dataView && hasToStringTag) {
    /* eslint-disable-next-line compat/compat */
    var descriptor = getOwnPropertyDescriptor(DataView.prototype, 'byteLength');

    if (descriptor && typeof descriptor.get === 'function') {
      res = attempt.call(dataView, descriptor.get);
      getByteLength = res.threw === false && typeof res.value === 'number' && descriptor.get;
    }
  }

  if (getByteLength === false) {
    var dViewTag = '[object DataView]';

    if (toStringTag(dataView) === dViewTag) {
      legacyCheck = function _legacyCheck(object) {
        return toStringTag(object) === dViewTag;
      };
    } else {
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
 */


var isDataView = function isDataView(object) {
  if (hasDView === false || isObjectLike(object) === false) {
    return false;
  }

  if (legacyCheck) {
    return legacyCheck(object);
  }

  var result = attempt.call(object, getByteLength);
  return result.threw === false && typeof result.value === 'number';
};

export default isDataView;

//# sourceMappingURL=is-data-view-x.esm.js.map