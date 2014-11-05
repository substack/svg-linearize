var linearize = require('../../');
var loadsvg = require('load-svg');

loadsvg('face.svg', function (err, svg) {
    document.body.appendChild(svg);
    document.body.appendChild(linearize(svg, { tolerance: 3 }));
});
