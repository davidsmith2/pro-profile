define([
    'views/auth',
    'views/connections/list',
    'views/profile'
],

function (AuthView, ConnectionsListView, ProfileView) {

    var app, Router;

    Router = Backbone.Router.extend({

        routes: {
            '!/people':             'viewConnections',
            '!/people/~':           'viewProfile',
            '!/people/id=:id':      'viewProfile'
        },

        initialize: function (_app) {
            app = _app;
            this.views = app.views;
        },

        viewAuthMessage: function (model) {
            var view = new AuthView({ model: model });
            view.render();
            $('#auth-message-box').html(view.el);
        },

        viewConnections: function (collection) {
            var view = new ConnectionsListView({ collection: collection });
            this.views.app.showView(view);
        },

        viewProfile: function (model) {
            var view = new ProfileView({ model: model });
            this.views.app.showView(view);
        }

    });

    return Router;

});