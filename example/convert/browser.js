var linearize = require('../../');
var loadsvg = require('load-svg');
var slideways = require('slideways');

loadsvg('spiral.svg', function (err, svg) {
    var slider = slideways({ min: 0, max: 10, snap: 1, init: 3 });
    var nsvg;
    slider.on('value', function (value) {
        if (nsvg) document.body.removeChild(nsvg);
        nsvg = linearize(svg, { tolerance: value });
        document.body.appendChild(nsvg);
    });
    slider.appendTo(document.querySelector('#controls'));
    document.body.appendChild(svg);
});
