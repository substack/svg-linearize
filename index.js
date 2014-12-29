var createElement = require('svg-create-element');
var simplify = require('simplify-geometry');
var defined = require('defined');
var absPath = require('abs-svg-path');
var parsePath = require('parse-svg-path');

module.exports = function (svg, opts) {
    if (!opts) opts = {};
    
    var nsvg = svg.cloneNode(true);
    var prepaths = nsvg.querySelectorAll('path');
    var paths = [];
    for (var i = 0; i < prepaths.length; i++) {
        var pre = prepaths[i];
        var d = pre.getAttribute('d');
        var abs = absPath(parsePath(d)).map(unsplit).join(' ');
        var parts = abs.match(/([^z]+(?:z\s*|$))/ig);
        for (var j = 0; j < parts.length; j++) {
            var el = createElement('path');
            el.setAttribute('d', parts[j]);
            pre.parentNode.appendChild(el);
            paths.push(el);
        }
        pre.parentNode.removeChild(pre);
    }
    
    for (var i = 0; i < paths.length; i++) {
        var p = paths[i];
        var pts = getPoints(p, defined(opts.segments, 100));
        
        var d = simplify(pts, defined(opts.tolerance, 3));
        p.setAttribute('d', 'M ' + d.join(' L '));
    }
    return nsvg;
};

function unsplit (xs) { return xs.join(' ') }

function getPoints (p, segments) {
    var len = p.getTotalLength();
    var points = [];
    for (var i = 0; i < segments; i++) {
        var pt = p.getPointAtLength(i / (segments - 1) * len);
        points.push([ pt.x, pt.y ]);
    }
    return points;
}
