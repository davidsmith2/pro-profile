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
        this.apiManager = new ApiManager();
        this.views.app = new AppView();
        this.views.auth = new AuthView({ apiManager: this.apiManager });
        this.collections.connections = new Connections({ apiManager: this.apiManager });
        this.views.connections = new ConnectionsView({ collection: this.collections.connections });
        this.router = new Router();
    };

    App.prototype = {
        collections: {},
        models: {},
        router: {},
        views: {},
    };

    return App;

});
