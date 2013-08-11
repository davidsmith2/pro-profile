define([
    'views/logout',
    'views/connections/list',
    'views/nav',
    'views/profile'
],

function (LogoutView, ConnectionsListView, NavView, ProfileView) {

    var app, Router;

    Router = Backbone.Router.extend({

        routes: {
            '!/people':             'viewConnections',
            '!/people/~':           'viewProfile',
            '!/people/id=:id':      'viewProfile'
        },

        viewLogout: function (model) {
            var view = new LogoutView({ model: model });
            view.showView('#logout', view);
        },

        viewNav: function (app) {
            var view = new NavView({ app: app });
            view.showView('#nav', view);
        },

        viewConnections: function (collection) {
            var view = new ConnectionsListView({ collection: collection });
            view.showView('#content', view);
        },

        viewProfile: function (model) {
            var view = new ProfileView({ model: model });
            view.showView('#content', view);
        }

    });

    return Router;

});