# svg-linearize

turn curved svg paths into paths with only line segments

``` js
var linearize = require('svg-linearize');
var loadsvg = require('load-svg');

loadsvg('face.svg', function (err, svg) {
    var nsvg = linearize(svg, { tolerance: 3 });
    document.body.appendChild(nsvg);
});
```

# methods

``` js
var linearize = require('svg-linearize')
```

## var nsvg = linearize(svg, opts)

Create a new svg, `nsvg` from an existing `svg` element.

Any curved paths in `svg` will be converted to line segment paths.

Optionally specify:

* `opts.tolerance` - tolerance to feed into
[simplify-geometry](https://npmjs.org/package/simplify-geometry), higher values
mean fewer points. Default: 3.
* `opts.segments` - number of points to sample each path. Default: 100.

# install

With [npm](https://npmjs.org) do:

```
npm install svg-linearize
```

# license

MIT
