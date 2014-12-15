"use strict";
require.config({
    paths: {
        'dat.gui': 'lib/dat.gui.min',
        'jquery': 'lib/jquery-2.1.1.min',
        'three': 'lib/three.min'
    },
    shim: {
        'three': { exports: 'THREE' },
        'dat.gui': { exports: 'dat' }
    }
});

require(["app"], function(App){
    var app = new App();
    app.init();
});