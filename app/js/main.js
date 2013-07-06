requirejs.config({
	baseUrl: 'js',
	paths: {
        'text': 'lib/text',
        'linkedin': 'http://platform.linkedin.com/in.js?async=true'
	},
	shim: {
        'lib/underscore-min': {
            exports: '_'
        },
        'lib/backbone-min': {
            exports: 'Backbone',
            deps: ['lib/underscore-min']
        },
        'app': {
            deps: [
                'lib/underscore-min', 
                'lib/backbone-min'
            ]
        }
	}
});

require(['app'], function (App) {
	window.proProfile = new App();
});
