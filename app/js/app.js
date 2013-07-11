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

        // the app view must be rendered first as other views depend on it
        this.views.app = new AppView({ app: this });
        this.views.app.render();

        this.routers.router = new Router();
        Backbone.history.start();

        this.connectApi();

    };

    App.prototype = {
        collections: {},
        models: {},
        routers: {},
        views: {},

        connectApi: function () {
            this.apiManager = new ApiManager({ app: this });
            this.apiManager.on('ready', this.handleConnect, this);
        },

        handleConnect: function () {
            this.views.auth = new AuthView({ app: this });
            this.views.auth.render();
            this.collections.connections = new Connections();
            this.collections.connections.getData();
            this.collections.connections.on('sync', this.handleData, this);
        },

        handleData: function (model, response, options) {
            this.collections.connections.parse(response);
            this.views.connections = new ConnectionsView({ collection: this.collections.connections });
            this.views.connections.render(response);
        }

    };

    return App;

});
