var createElement = require('svg-create-element');
var simplify = require('simplify-geometry');
var defined = require('defined');
var absPath = require('abs-svg-path');
var parsePath = require('parse-svg-path');
require('./path-data-polyfill');

module.exports = function (svg, opts) {
    if (!opts) opts = {};
    
    var nsvg = svg.cloneNode(true);
    var prepaths = nsvg.querySelectorAll('path');
    var paths = [];
    for (var i = 0; i < prepaths.length; i++) {
        var pre = prepaths[i];
        var d = pre.getAttribute('d');
        var t = pre.getAttribute('transform');
        if (!containsNonLinearParts(d))
            continue;
        var abs = absPath(parsePath(d)).map(unsplit).join(' ');
        var parts = abs.match(/([^z]+(?:z\s*|$))/ig);
        for (var j = 0; j < parts.length; j++) {
            var el = createElement('path');
            el.setAttribute('d', parts[j]);
            el.setAttribute('transform', t);
            pre.parentNode.appendChild(el);
            paths.push(el);
        }
        pre.parentNode.removeChild(pre);
    }
    
    for (var i = 0; i < paths.length; i++) {
        var p = paths[i];
        var numberOfPoints = defined(opts.segments, 100);
        if (opts.segmentLength !== undefined)
            numberOfPoints = p.getTotalLength() / opts.segmentLength;
        var pts = getPoints(p, numberOfPoints);
        
        var d = simplify(pts, defined(opts.tolerance, 3));
        p.setAttribute('d', 'M ' + d.join(' L '));
    }
    return nsvg;
};

function containsNonLinearParts (d) {
    return d.match(/[CcSsQqTtAa]+/) !== null;
}

function unsplit (xs) { return xs.join(' ') }

function getPoints (p, segments) {
    var len = p.getTotalLength();
    var pathData = p.getPathData();
    var points = [];
    var lastSeg = null;
    for (var i = 0; i < segments; i++) {
        var atLength = i / (segments - 1) * len;
        var seg = p.getPathSegAtLength(atLength);
        if (seg !== lastSeg) {
            lastSegData = pathData[lastSeg];
            lastSeg = seg;
            if (lastSegData != undefined && lastSegData.type === 'lineto')
                points.push([ lastSegData.values[0], lastSegData.values[1] ]);
        }
        var pt = p.getPointAtLength(atLength);
        points.push([ pt.x, pt.y ]);
    }
    return points;
}
