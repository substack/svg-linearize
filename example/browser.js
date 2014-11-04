var loadsvg = require('load-svg');
var createElement = require('svg-create-element');
var rgb = require('rgb');
var simplify = require('simplify-geometry');
var slideways = require('slideways');

loadsvg('spiral.svg', function (err, svg) {
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    var p = svg.querySelector('path');
    var pcopy = p.cloneNode(true);
    p.parentNode.insertBefore(pcopy, p);
    p.parentNode.removeChild(p);
    
    var points = [];
    var len = p.getTotalLength();
    var segments = 50;
    for (var i = 0; i < segments; i++) {
        var pt = p.getPointAtLength(i / (segments - 1) * len);
        points.push([ pt.x, pt.y ]);
    }
    
    var slider = slideways({ min: 0, max: 10, snap: 1, init: 5 });
    var circles = [];
    slider.appendTo(document.body);
    
    slider.on('value', function (value) {
        clear();
        
        var simplified = simplify(points, value * value);
        simplified.forEach(function (p) {
            plot(p[0], p[1], 1);
        });
        pcopy.setAttribute('d', 'M ' + simplified.join(' L '));
    });
    document.body.appendChild(svg);
    
    function clear () {
        circles.forEach(function (c) { svg.removeChild(c) });
        circles = [];
    }
        
    function plot (x, y) {
        var c = createElement('circle', {
            cx: x, cy: y, r: 4, stroke: 'transparent',
            fill: 'magenta'
        });
        circles.push(c);
        svg.appendChild(c);
    }
    function dist (a, b) {
        var x = a[0] - b[0];
        var y = a[1] - b[1];
        return Math.sqrt(x*x + y*y);
    }
});
