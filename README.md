<a
  href="https://travis-ci.org/Xotic750/is-data-view-x"
  title="Travis status">
<img
  src="https://travis-ci.org/Xotic750/is-data-view-x.svg?branch=master"
  alt="Travis status" height="18">
</a>
<a
  href="https://david-dm.org/Xotic750/is-data-view-x"
  title="Dependency status">
<img src="https://david-dm.org/Xotic750/is-data-view-x/status.svg"
  alt="Dependency status" height="18"/>
</a>
<a
  href="https://david-dm.org/Xotic750/is-data-view-x?type=dev"
  title="devDependency status">
<img src="https://david-dm.org/Xotic750/is-data-view-x/dev-status.svg"
  alt="devDependency status" height="18"/>
</a>
<a
  href="https://badge.fury.io/js/is-data-view-x"
  title="npm version">
<img src="https://badge.fury.io/js/is-data-view-x.svg"
  alt="npm version" height="18">
</a>
<a
  href="https://www.jsdelivr.com/package/npm/is-data-view-x"
  title="jsDelivr hits">
<img src="https://data.jsdelivr.com/v1/package/npm/is-data-view-x/badge?style=rounded"
  alt="jsDelivr hits" height="18">
</a>
<a
  href="https://bettercodehub.com/results/Xotic750/is-data-view-x"
  title="bettercodehub score">
<img src="https://bettercodehub.com/edge/badge/Xotic750/is-data-view-x?branch=master"
  alt="bettercodehub score" height="18">
</a>

<a name="module_is-data-view-x"></a>

## is-data-view-x

Detect whether or not an object is a DataView.

<a name="exp_module_is-data-view-x--module.exports"></a>

### `module.exports(object)` ⇒ <code>boolean</code> ⏏

Determine if an `object` is an `DataView`.

**Kind**: Exported function  
**Returns**: <code>boolean</code> - `true` if the `object` is a `DataView`, else `false`.

| Param  | Type            | Description         |
| ------ | --------------- | ------------------- |
| object | <code>\*</code> | The object to test. |

**Example**

```js
import isDataView from 'is-data-view-x';

const ab = new ArrayBuffer(4);
const dv = new DataView(ab);

isDataView(ab); // false
isDataView(true); // false
isDataView(dv); // true
```
