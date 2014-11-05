var linearize = require('../../');
var loadsvg = require('load-svg');

loadsvg('spiral.svg', function (err, svg) {
    document.body.appendChild(svg);
    document.body.appendChild(linearize(svg));
});
