define([
    'views/auth/login',
    'views/auth/logout',
    'views/connections/list',
    'views/profile'
], 

function (LoginView, LogoutView, ConnectionsListView, ProfileView) {

    var app, Router;

    Router = Backbone.Router.extend({

        routes: {
            '!/login':              'viewLogin',
            '!/logout':             'viewLogout',
            '!/people':             'viewConnections',
            '!/people/~':           'viewProfile',
            '!/people/id=:id':      'viewProfile',
        },

        initialize: function (_app) {
            app = _app;
            this.views = app.views;
        },

        viewLogin: function () {
            var view = new LoginView({ app: app });
            this.views.app.showView(view);
        },

        viewLogout: function () {
            var view = new LogoutView();
            this.views.app.showView(view);
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