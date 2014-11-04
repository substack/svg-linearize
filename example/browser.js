var loadsvg = require('load-svg');
var createElement = require('svg-create-element');
var rgb = require('rgb');

loadsvg('simpler.svg', function (err, svg) {
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    var p = svg.querySelector('path');
    var rpath = createElement('path', {
        fill: 'transparent',
        stroke: 'purple'
    });
    var points = [];
    
    var len = p.getTotalLength();
    var segments = 50;
    for (var i = 0; i < segments; i++) {
        var pt = p.getPointAtLength(i / (segments - 1) * len);
        points.push([ pt.x, pt.y ]);
    }
    
    var angles = [];
    for (var i = 1; i < points.length - 1; i++) {
        var pa = points[i-1], pb = points[i+1], pc = points[i];
        var a = dist(pb, pc);
        var b = dist(pa, pc);
        var c = dist(pa, pb);
        var angle = Math.acos((a*a + b*b - c*c) / 2 / a / b);
        angles.push({ angle: angle, index: i });
    }
    
    angles.sort(function (a, b) {
        return a.angle < b.angle ? -1 : 1;
    });
    
    angles.forEach(function (a, i) {
        var p = points[a.index];
        plot(p[0], p[1], i / segments);
    });
    
    rpath.setAttribute('d', 'M' + points.join('L'));
    svg.appendChild(rpath);
    
    document.body.appendChild(svg);
    
    function plot (x, y, c) {
        svg.appendChild(createElement('circle', {
            cx: x, cy: y, r: 4, stroke: 'transparent',
            fill: rgb('hsl(' + c*360/1.1 + ',100,50)')
        }));
    }
    function dist (a, b) {
        var x = a[0] - b[0];
        var y = a[1] - b[1];
        return Math.sqrt(x*x + y*y);
    }
});
