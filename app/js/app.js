define([
    'api-manager',
    'collections/connections',
    'router',
    'views/app', 
    'views/auth', 
    'views/profiles/connections'
], 

function (ApiManager, Connections, Router, AppView, AuthView, ConnectionsView) {

    var App = function () {
        this.viewApp();
        this.initRouter();
        this.connectApi();
    };

    App.prototype = {

        collections: {},
        models: {},
        routers: {},
        views: {},

        viewApp: function () {
            this.views.app = new AppView({ app: this });
            this.views.app.render();
        },

        initRouter: function () {
            this.routers.router = new Router();
            Backbone.history.start();
        },

        connectApi: function () {
            this.apiManager = new ApiManager({ app: this });
            this.apiManager.on('ready', this.onApiConnect, this);
        },

        onApiConnect: function () {
            this.viewAuth();
            this.getConnections();
        },

        viewAuth: function () {
            this.views.auth = new AuthView({ app: this });
            this.views.auth.render();
        },

        getConnections: function () {
            this.collections.connections = new Connections();
            this.collections.connections.getData();
            this.collections.connections.on('sync', this.viewConnections, this);
        },

        viewConnections: function (model, response, options) {
            this.views.connections = new ConnectionsView({ collection: this.collections.connections });
            this.views.connections.render(response);
        }

    };

    return App;

});
