define([
    'views/home',
    'views/profiles/profile',
    'views/profiles/connections'
], 

function (HomeView, ProfileView, ConnectionsView) {

    var Router = Backbone.Router.extend({

        routes: {
            '!/home':               'home',
            '!/login':              'login',
            '!/logout':             'logout',
            '!/people/id=:id':      'profile',
            '!/connections':        'connections'
        },

        initialize: function (_app) {
            var app = _app;
            this.apiManager = app.apiManager;
            this.collections = app.collections;
            this.models = app.models;
            this.views = app.views;
        },

        login: function () {},

        logout: function () {},

        home: function () {
            view = new HomeView();
            this.views.app.showView(view);
        },

        profile: function () {
            var view = new ProfileView({ model: this.models.profile });
            this.views.app.showView(view);
        },

        connections: function () {
            var view = new ConnectionsView({ collection: this.collections.connections });
            this.views.app.showView(view);
        }

    });

    return Router;
    
});