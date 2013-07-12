define([
    'views/profiles/profile'
], 

function (ProfileView) {

    var Router = Backbone.Router.extend({

        routes: {
            '!/home':       'home',
            '!/login':      'login',
            '!/logout':     'logout',
            '!/profile':    'profile'
        },

        home: function () {},

        login: function () {
            this.navigate('!/profile', { trigger: true });
        },

        logout: function () {
            this.navigate('!/home');
        },

        profile: function () {}

    });

    return Router;
    
});