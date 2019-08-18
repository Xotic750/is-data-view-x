import attempt from 'attempt-x';
import isObjectLike from 'is-object-like-x';
import hasToStringTag from 'has-to-string-tag-x';
import toStringTag from 'to-string-tag-x';
import isArrayBuffer from 'is-array-buffer-x';
import call from 'simple-call-x';
import getGetter from 'util-get-getter-x';
var hasDView = typeof DataView === 'function';
var dViewTag = '[object DataView]';

var getDataView = function getDataView(creator) {
  var res = attempt(creator);
  return res.threw === false && isObjectLike(res.value) && res.value;
};

export var legacyCheck1 = function legacyCheck1(object) {
  return toStringTag(object) === dViewTag;
};
export var legacyCheck2 = function legacyCheck2(object) {
  if (isObjectLike(object) === false) {
    return false;
  }

  var isByteLength = typeof object.byteLength === 'number';
  var isByteOffset = typeof object.byteOffset === 'number';
  var isGetFloat32 = typeof object.getFloat32 === 'function';
  var isSetFloat64 = typeof object.setFloat64 === 'function';
  return isByteLength && isByteOffset && isGetFloat32 && isSetFloat64 && isArrayBuffer(object.buffer);
};

var validator = function validator(value) {
  return typeof value === 'number';
};

var creator = function creator() {
  /* eslint-disable-next-line compat/compat */
  return new DataView(new ArrayBuffer(4));
};

var init = function init() {
  if (hasDView) {
    var dataView = getDataView(creator);

    var _byteLength = dataView && hasToStringTag ? getGetter(dataView, 'byteLength', validator) : null;

    return {
      byteLength: _byteLength,
      legacyCheck: _byteLength === null && legacyCheck1(dataView) ? legacyCheck1 : legacyCheck2
    };
  }

  return {
    byteLength: null,
    legacyCheck: null
  };
};

var _init = init(),
    byteLength = _init.byteLength,
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

  if (byteLength === null && legacyCheck) {
    return legacyCheck(object);
  }

  var result = attempt(function attemptee() {
    return call(byteLength, object);
  });
  return result.threw === false && validator(result.value);
};

export default isDataView;

//# sourceMappingURL=is-data-view-x.esm.js.map