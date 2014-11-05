var createElement = require('svg-create-element');
var simplify = require('simplify-geometry');
var defined = require('defined');

module.exports = function (svg, opts) {
    if (!opts) opts = {};
    
    var nsvg = createElement('svg');
    var paths = svg.querySelectorAll('path');
    
    for (var i = 0; i < paths.length; i++) {
        var pts = getPoints(paths[i], defined(opts.segments, 100));
        var d = simplify(pts, defined(opts.tolerance, 3));
        
        nsvg.appendChild(createElement('path', {
            stroke: 'black',
            fill: 'transparent',
            d: 'M ' + d.join(' L ')
        }));
    }
    return nsvg;
};

function getPoints (p, segments) {
    var len = p.getTotalLength();
    var points = [];
    for (var i = 0; i < segments; i++) {
        var pt = p.getPointAtLength(i / (segments - 1) * len);
        points.push([ pt.x, pt.y ]);
    }
    return points;
}
