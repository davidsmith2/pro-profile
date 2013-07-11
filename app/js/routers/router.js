define([
    'views/profiles/profile'
], 

function (ProfileView) {

    var Router = Backbone.Router.extend({

        routes: {
            'login': 'login',
            'logout': 'logout'
        },

        initialize: function () {
        },

        login: function () {
        },

        logout: function () {
        },

    });

    return Router;
    
});