var loadsvg = require('load-svg');
var createElement = require('svg-create-element');

loadsvg('simpler.svg', function (err, svg) {
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    var p = svg.querySelector('path');
    
    var len = p.getTotalLength();
    var segments = 20;
    for (var i = 0; i < segments; i++) {
        var pt = p.getPointAtLength(i / (segments - 1) * len);
        plot(pt.x, pt.y);
    }
    document.body.appendChild(svg);
    
    function plot (x, y) {
        svg.appendChild(createElement('circle', {
            cx: x, cy: y, r: 2,
            fill: 'red', stroke: 'transparent'
        }));
    }
});
