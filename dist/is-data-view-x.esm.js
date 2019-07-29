import attempt from 'attempt-x';
import isObjectLike from 'is-object-like-x';
import hasToStringTag from 'has-to-string-tag-x';
import getOwnPropertyDescriptor from 'object-get-own-property-descriptor-x';
import toStringTag from 'to-string-tag-x';
import isArrayBuffer from 'is-array-buffer-x';
var hasDView = typeof DataView === 'function';
var dViewTag = '[object DataView]';

var getDataView = function getDataView() {
  var res = attempt(function attemptee() {
    /* eslint-disable-next-line compat/compat */
    return new DataView(new ArrayBuffer(4));
  });
  return res.threw === false && isObjectLike(res.value) && res.value;
};

var getByteLengthGetter = function getByteLengthGetter(dataView) {
  /* eslint-disable-next-line compat/compat */
  var descriptor = getOwnPropertyDescriptor(DataView.prototype, 'byteLength');

  if (descriptor && typeof descriptor.get === 'function') {
    var res = attempt.call(dataView, descriptor.get);
    return res.threw === false && typeof res.value === 'number' && descriptor.get;
  }

  return null;
};

var legacyCheck1 = function legacyCheck1(object) {
  return toStringTag(object) === dViewTag;
};

var legacyCheck2 = function legacyCheck2(object) {
  var isByteLength = typeof object.byteLength === 'number';
  var isByteOffset = typeof object.byteOffset === 'number';
  var isGetFloat32 = typeof object.getFloat32 === 'function';
  var isSetFloat64 = typeof object.setFloat64 === 'function';
  return isByteLength && isByteOffset && isGetFloat32 && isSetFloat64 && isArrayBuffer(object.buffer);
};

var init = function init(hasDataView) {
  if (hasDataView) {
    var dataView = getDataView();

    var _getByteLength = dataView && hasToStringTag ? getByteLengthGetter(dataView) : false;

    return {
      getByteLength: _getByteLength,
      legacyCheck: _getByteLength === false && toStringTag(dataView) === dViewTag ? legacyCheck1 : legacyCheck2
    };
  }

  return {
    getByteLength: false,
    legacyCheck: false
  };
};

var _init = init(hasDView),
    getByteLength = _init.getByteLength,
    legacyCheck = _init.legacyCheck;
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