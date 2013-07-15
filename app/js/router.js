define([
    'views/auth/login',
    'views/auth/logout',
    'views/profiles/connection',
    'views/profiles/personal',
    'views/connections/list'
], 

function (LoginView, LogoutView, PersonalProfileView, ConnectionProfileView, ConnectionsListView) {

    var Router = Backbone.Router.extend({

        routes: {
            '!/login':              'viewLogin',
            '!/logout':             'viewLogout',
            '!/people':             'viewConnections',
            '!/people/~':           'viewPersonalProfile',
            '!/people/id=:id':      'viewConnectionProfile',
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
            var view = new ConnectionsListView({ collection: this.collections.connections });
            this.views.app.showView(view);
        },

        viewConnectionProfile: function () {
            var view = new ConnectionProfileView({ model: this.models.connectionProfile });
            this.views.app.showView(view);
        },

        viewPersonalProfile: function () {
            var view = new PersonalProfileView({ model: this.models.personalProfile });
            this.views.app.showView(view);
        }

    });

    return Router;
    
});