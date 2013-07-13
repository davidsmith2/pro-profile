define([
    'views/index',
    'views/profiles/connection',
    'views/profiles/personal',
    'views/connections/list'
], 

function (IndexView, PersonalProfileView, ConnectionProfileView, ConnectionsListView) {

    var Router = Backbone.Router.extend({

        routes: {
            '!/login':              'login',
            '!/logout':             'logout',
            '!/index':              'viewIndex',
            '!/people':             'viewConnections',
            '!/people/~':           'viewPersonalProfile',
            '!/people/id=:id':      'viewConnectionProfile',
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

        viewIndex: function () {
            var view = new IndexView();
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