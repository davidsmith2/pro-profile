define([
    'views/auth/login',
    'views/auth/logout',
    'views/profile',
    'views/connections/list'
], 

function (LoginView, LogoutView, ProfileView, ConnectionsListView) {

    var Router = Backbone.Router.extend({

        routes: {
            '!/login':              'viewLogin',
            '!/logout':             'viewLogout',
            '!/people':             'viewConnections',
            '!/people/~':           'viewProfile',
            '!/people/id=:id':      'viewProfile',
        },

        initialize: function (_app) {
            this.app = _app;
            this.apiManager = this.app.apiManager;
            this.collections = this.app.collections;
            this.models = this.app.models;
            this.views = this.app.views;
        },

        viewLogin: function () {
            var view = new LoginView({ app: this.app });
            this.views.app.showView(view);
        },

        viewLogout: function () {
            var view = new LogoutView();
            this.views.app.showView(view);
        },

        viewConnections: function () {
            var view = new ConnectionsListView({
                collection: this.collections.connections
            });
            this.views.app.showView(view);
        },

        viewProfile: function (model) {
            var view = new ProfileView({ model: model });
            this.views.app.showView(view);
        }

    });

    return Router;
    
});