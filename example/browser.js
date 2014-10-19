var loadsvg = require('load-svg');
loadsvg('spiral.svg', function (err, svg) {
    document.body.appendChild(svg);
});
