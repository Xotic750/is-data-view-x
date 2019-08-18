import attempt from 'attempt-x';
import isObjectLike from 'is-object-like-x';
import hasToStringTag from 'has-to-string-tag-x';
import toStringTag from 'to-string-tag-x';
import isArrayBuffer from 'is-array-buffer-x';
import call from 'simple-call-x';
import getGetter from 'util-get-getter-x';

const hasDView = typeof DataView === 'function';
const dViewTag = '[object DataView]';

const getDataView = function getDataView(creator) {
  const res = attempt(creator);

  return res.threw === false && isObjectLike(res.value) && res.value;
};

export const legacyCheck1 = function legacyCheck1(object) {
  return toStringTag(object) === dViewTag;
};

export const legacyCheck2 = function legacyCheck2(object) {
  if (isObjectLike(object) === false) {
    return false;
  }

  const isByteLength = typeof object.byteLength === 'number';
  const isByteOffset = typeof object.byteOffset === 'number';
  const isGetFloat32 = typeof object.getFloat32 === 'function';
  const isSetFloat64 = typeof object.setFloat64 === 'function';

  return isByteLength && isByteOffset && isGetFloat32 && isSetFloat64 && isArrayBuffer(object.buffer);
};

const validator = function validator(value) {
  return typeof value === 'number';
};

const creator = function creator() {
  /* eslint-disable-next-line compat/compat */
  return new DataView(new ArrayBuffer(4));
};

const init = function init() {
  if (hasDView) {
    const dataView = getDataView(creator);
    const byteLength = dataView && hasToStringTag ? getGetter(dataView, 'byteLength', validator) : null;

    return {
      byteLength,
      legacyCheck: byteLength === null && legacyCheck1(dataView) ? legacyCheck1 : legacyCheck2,
    };
  }

  return {
    byteLength: null,
    legacyCheck: null,
  };
};

const {byteLength, legacyCheck} = init();

/**
 * Determine if an `object` is an `DataView`.
 *
 * @param {*} object - The object to test.
 * @returns {boolean} `true` if the `object` is a `DataView`, else `false`.
 */
const isDataView = function isDataView(object) {
  if (hasDView === false || isObjectLike(object) === false) {
    return false;
  }

  if (byteLength === null && legacyCheck) {
    return legacyCheck(object);
  }

  const result = attempt(function attemptee() {
    return call(byteLength, object);
  });

  return result.threw === false && validator(result.value);
};

export default isDataView;
