define([
    'views/logout',
    'views/connections/list',
    'views/profile'
],

function (LogoutView, ConnectionsListView, ProfileView) {

    var app, Router;

    Router = Backbone.Router.extend({

        routes: {
            '!/people':             'viewConnections',
            '!/people/~':           'viewProfile',
            '!/people/id=:id':      'viewProfile'
        },

        viewLogout: function (model) {
            var view = new LogoutView({ model: model });
            view.show(view);
        },

        viewConnections: function (collection) {
            var view = new ConnectionsListView({ collection: collection });
            view.show(view);
        },

        viewProfile: function (model) {
            var view = new ProfileView({ model: model });
            view.show(view);
        }

    });

    return Router;

});