<a name="module_is-data-view-x"></a>

## is-data-view-x
<a href="https://travis-ci.org/Xotic750/is-data-view-x"
title="Travis status">
<img src="https://travis-ci.org/Xotic750/is-data-view-x.svg?branch=master"
alt="Travis status" height="18">
</a>
<a href="https://david-dm.org/Xotic750/is-data-view-x"
title="Dependency status">
<img src="https://david-dm.org/Xotic750/is-data-view-x.svg"
alt="Dependency status" height="18"/>
</a>
<a
href="https://david-dm.org/Xotic750/is-data-view-x#info=devDependencies"
title="devDependency status">
<img src="https://david-dm.org/Xotic750/is-data-view-x/dev-status.svg"
alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/is-data-view-x" title="npm version">
<img src="https://badge.fury.io/js/is-data-view-x.svg"
alt="npm version" height="18">
</a>

Detect whether or not an object is a DataView.

Requires ES3 or above.

**Version**: 1.2.0  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  
<a name="exp_module_is-data-view-x--module.exports"></a>

### `module.exports(object)` ⇒ <code>boolean</code> ⏏
Determine if an `object` is an `DataView`.

**Kind**: Exported function  
**Returns**: <code>boolean</code> - `true` if the `object` is a `DataView`, else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>\*</code> | The object to test. |

**Example**  
```js
var isDataView = require('is-data-view-x');
var ab = new ArrayBuffer(4);
var dv = new DataView(ab);

isDataView(ab); // false
isDataView(true); // false
isDataView(dv); // true
```
