define([
], 

function () {

    var Router = Backbone.Router.extend({

        routes: {
            '!/home':       'home',
            '!/login':      'login',
            '!/logout':     'logout',
            '!/profile':    'profile'
        },

        initialize: function () {
            Backbone.history.start();
        },

        home: function () {},

        login: function () {
            this.navigate('!/profile');
            this.trigger('login');
        },

        logout: function () {
            this.navigate('!/home');
            this.trigger('logout');
        },

        profile: function () {}

    });

    return Router;
    
});