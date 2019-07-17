import isDataView from '../src/is-data-view-x';

const ifHasDataView = typeof DataView === 'function' ? it : xit;

describe('isDataView', function() {
  it('basic', function() {
    expect.assertions(8);
    expect(isDataView()).toBe(false);
    expect(isDataView(undefined)).toBe(false);
    expect(isDataView(null)).toBe(false);
    expect(isDataView(1)).toBe(false);
    expect(isDataView(true)).toBe(false);
    expect(isDataView('abc')).toBe(false);
    expect(isDataView([])).toBe(false);
    expect(isDataView({})).toBe(false);
  });

  ifHasDataView('hasDataView', function() {
    expect.assertions(9);
    expect(isDataView(new ArrayBuffer(4))).toBe(false);
    expect(isDataView(new Int16Array(4))).toBe(false);
    expect(isDataView(new Int32Array(4))).toBe(false);
    expect(isDataView(new Uint8Array(4))).toBe(false);
    expect(isDataView(new Uint16Array(4))).toBe(false);
    expect(isDataView(new Uint32Array(4))).toBe(false);
    expect(isDataView(new Float32Array(4))).toBe(false);
    expect(isDataView(new Float64Array(4))).toBe(false);
    expect(isDataView(new DataView(new ArrayBuffer(4)))).toBe(true);
  });
});
