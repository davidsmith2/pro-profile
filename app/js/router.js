define([
    'views/logout',
    'views/connections/list',
    'views/nav',
    'views/profile'
],

function (LogoutView, ConnectionsView, NavView, ProfileView) {

    var app, Router;

    Router = Backbone.Router.extend({

        routes: {
            '!/':                        'showLogout',
            '!/connections':             'showConnections',
            '!/connections/id=:id':      'showProfile',
            '!/profile/~':               'showProfile'
        },

        initialize: function (options) {
            this.models = options.app.models;
            this.collections = options.app.collections;
        },

        showLogout: function () {
            var view = new LogoutView({ model: this.models.myProfile });
            view.show('#logout', view);
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
                profile = this.models.myProfile;
            }

            view = new ProfileView({ model: profile });
            view.show('#content', view);
        }

    });

    return Router;

});