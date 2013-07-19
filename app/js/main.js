requirejs.config({
	baseUrl: 'js',
	paths: {
        'linkedin':         'http://platform.linkedin.com/in.js?async=true',
        'mustache':         'lib/mustache/mustache',
        'text':             'lib/text/text'
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
        'lib/jquery/jquery.min': {
            exports: '$'
        },
        'lib/jquery/jquery.cookie': {
            deps: ['lib/jquery/jquery.min']
        },
        'app': {
            deps: [
                'lib/underscore/underscore-min', 
                'lib/backbone/backbone-min',
                'lib/backbone/backbone-overrides',
                'lib/jquery/jquery.min',
                'lib/jquery/jquery.cookie'
            ]
        }
	}
});

require(['app'], function (App) {
	window.proProfile = new App();
});
