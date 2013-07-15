requirejs.config({
	baseUrl: 'js',
	paths: {
        'linkedin': 'http://platform.linkedin.com/in.js?async=true',
        'mustache': 'lib/mustache/mustache',
        'text': 'lib/text/text'
	},
	shim: {
        'lib/underscore/underscore-min': {
            exports: '_'
        },
        'lib/backbone/backbone-min': {
            exports: 'Backbone',
            deps: ['lib/underscore/underscore-min']
        },
        'lib/backbone/backbone-overrides': {
            deps: ['lib/backbone/backbone-min', 'lib/underscore/underscore-min']
        },
        'app': {
            deps: [
                'lib/underscore/underscore-min', 
                'lib/backbone/backbone-min',
                'lib/backbone/backbone-overrides'
            ]
        }
	}
});

require(['app'], function (App) {
	window.proProfile = new App();
});
