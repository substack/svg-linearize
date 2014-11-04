var loadsvg = require('load-svg');
var createElement = require('svg-create-element');

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
    var segments = 5;
    for (var i = 0; i < segments; i++) {
        var pt = p.getPointAtLength(i / (segments - 1) * len);
        points.push([ pt.x, pt.y ]);
        plot(pt.x, pt.y);
    }
    rpath.setAttribute('d', 'M' + points.join('L'));
    svg.appendChild(rpath);
    
    document.body.appendChild(svg);
    
    function plot (x, y) {
        svg.appendChild(createElement('circle', {
            cx: x, cy: y, r: 2,
            fill: 'red', stroke: 'transparent'
        }));
    }
});
