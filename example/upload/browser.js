var upload = document.querySelector('#upload');
var target = document.querySelector('#target');

var linearize = require('../../');
var nsvg;

upload.addEventListener('change', function (ev) {
    var reader = new FileReader;
    reader.addEventListener('load', function (e) {
        var div = document.createElement('div');
        div.innerHTML = e.target.result;
        var svg = div.querySelector('svg');
        
        if (nsvg) document.body.removeChild(nsvg);
        nsvg = linearize(svg);
        
        document.body.appendChild(nsvg);
    });
    reader.readAsText(upload.files[0]);
});
