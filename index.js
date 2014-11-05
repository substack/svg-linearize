var createElement = require('svg-create-element');
var simplify = require('simplify-geometry');
var defined = require('defined');

module.exports = function (svg, opts) {
    if (!opts) opts = {};
    
    var nsvg = svg.cloneNode(true);
    var paths = nsvg.querySelectorAll('path');
    
    for (var i = 0; i < paths.length; i++) {
        var p = paths[i];
        var pts = getPoints(p, defined(opts.segments, 100));
        
        var d = simplify(pts, defined(opts.tolerance, 3));
        p.setAttribute('d', 'M ' + d.join(' L '));
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
