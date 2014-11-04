var createElement = require('svg-create-element');
var rgb = require('rgb');
var simplify = require('simplify-geometry');
var slideways = require('slideways');

var box = document.querySelector('#box');
var upload = document.querySelector('#upload');

upload.addEventListener('change', function (ev) {
    var reader = new FileReader;
    reader.addEventListener('load', function (e) {
        var div = document.createElement('div');
        div.innerHTML = e.target.result;
        var svg = div.querySelector('svg');
        loadsvg(svg);
    });
    reader.readAsText(upload.files[0]);
});

function loadsvg (svg) {
    box.innerHTML = '';
    
    var p = svg.querySelector('path');
    var pcopy = p.cloneNode(true);
    p.parentNode.insertBefore(pcopy, p);
    p.parentNode.removeChild(p);
    
    var points = [];
    var len = p.getTotalLength();
    var segments = 100;
    for (var i = 0; i < segments; i++) {
        var pt = p.getPointAtLength(i / (segments - 1) * len);
        points.push([ pt.x, pt.y ]);
    }
    
    var slider = slideways({ min: 0, max: 10, snap: 0.5, init: 3 });
    
    var circles = [];
    var controls = document.createElement('div');
    slider.appendTo(controls);
    box.appendChild(controls);
    
    slider.element.style.width = 400;
    
    slider.on('value', function (value) {
        clear();
        
        var simplified = simplify(points, value * value);
        simplified.forEach(function (p) {
            plot(p[0], p[1], 1);
        });
        pcopy.setAttribute('d', 'M ' + simplified.join(' L '));
    });
    box.appendChild(svg);
    
    function clear () {
        circles.forEach(function (c) { c.parentNode.removeChild(c) });
        circles = [];
    }
        
    function plot (x, y) {
        var c = createElement('circle', {
            cx: x, cy: y, r: 4, stroke: 'transparent',
            fill: 'magenta'
        });
        circles.push(c);
        pcopy.parentNode.appendChild(c);
    }
    function dist (a, b) {
        var x = a[0] - b[0];
        var y = a[1] - b[1];
        return Math.sqrt(x*x + y*y);
    }
}
