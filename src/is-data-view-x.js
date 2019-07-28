import attempt from 'attempt-x';
import isObjectLike from 'is-object-like-x';
import hasToStringTag from 'has-to-string-tag-x';
import getOwnPropertyDescriptor from 'object-get-own-property-descriptor-x';
import toStringTag from 'to-string-tag-x';
import isArrayBuffer from 'is-array-buffer-x';

const hasDView = typeof DataView === 'function';
const dViewTag = '[object DataView]';
let getByteLength = false;
let legacyCheck;

const getDataView = function getDataView() {
  const res = attempt(function attemptee() {
    /* eslint-disable-next-line compat/compat */
    return new DataView(new ArrayBuffer(4));
  });

  return res.threw === false && isObjectLike(res.value) && res.value;
};

const getByteLengthGetter = function getByteLengthGetter(dataView) {
  /* eslint-disable-next-line compat/compat */
  const descriptor = getOwnPropertyDescriptor(DataView.prototype, 'byteLength');

  if (descriptor && typeof descriptor.get === 'function') {
    const res = attempt.call(dataView, descriptor.get);

    return res.threw === false && typeof res.value === 'number' && descriptor.get;
  }

  return null;
};

const legacyCheck1 = function legacyCheck1(object) {
  return toStringTag(object) === dViewTag;
};

const legacyCheck2 = function legacyCheck2(object) {
  const isByteLength = typeof object.byteLength === 'number';
  const isByteOffset = typeof object.byteOffset === 'number';
  const isGetFloat32 = typeof object.getFloat32 === 'function';
  const isSetFloat64 = typeof object.setFloat64 === 'function';

  return isByteLength && isByteOffset && isGetFloat32 && isSetFloat64 && isArrayBuffer(object.buffer);
};

if (hasDView) {
  const dataView = getDataView();

  if (dataView && hasToStringTag) {
    getByteLength = getByteLengthGetter(dataView);
  }

  if (getByteLength === false) {
    legacyCheck = toStringTag(dataView) === dViewTag ? legacyCheck1 : legacyCheck2;
  }
}

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

  if (legacyCheck) {
    return legacyCheck(object);
  }

  const result = attempt.call(object, getByteLength);

  return result.threw === false && typeof result.value === 'number';
};

export default isDataView;
