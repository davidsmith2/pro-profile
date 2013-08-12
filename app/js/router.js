define([
    'views/user',
    'views/connections/list',
    'views/nav',
    'views/profile'
],

function (UserView, ConnectionsView, NavView, ProfileView) {

    var app, Router;

    Router = Backbone.Router.extend({

        routes: {
            '!/':                        'showUser',
            '!/connections':             'showConnections',
            '!/connections/id=:id':      'showProfile',
            '!/profile/~':               'showProfile'
        },

        initialize: function (options) {
            this.models = options.app.models;
            this.collections = options.app.collections;
        },

        showUser: function () {
            var view = new UserView({ model: this.models.user });
            view.show('#user', view);
        },

        showNav: function (app) {
            var view = new NavView();
            view.show('#nav', view);
        },

        showConnections: function () {
            var view = new ConnectionsView({ collection: this.collections.connections });
            view.show('#content', view);
        },

        showProfile: function (id) {
            var profile, view;

            if (id) {
                profile = this.collections.connections.get(id);
            } else {
                profile = this.models.user;
            }

            view = new ProfileView({ model: profile });
            view.show('#content', view);
        }

    });

    return Router;

});