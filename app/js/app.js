define([
    'api-manager',
    'collections/connections',
    'router',
    'views/app', 
    'views/auth', 
    'views/home', 
    'views/profiles/connections'
], 

function (ApiManager, Connections, Router, AppView, AuthView, HomeView, ConnectionsView) {

    var App = function () {

        var self = this;

        // instantiate all needed objects
        this.views.app = new AppView();
        this.views.home = new HomeView();
        this.apiManager = new ApiManager();
        this.views.auth = new AuthView({ apiManager: this.apiManager });
        this.collections.connections = new Connections();
        this.views.connections = new ConnectionsView({ collection: this.collections.connections });
        this.router = new Router();

        this.apiManager.on('ready', onApiReady, this);
        this.apiManager.on('authorize', onApiAuthorize, this);
        this.apiManager.on('logout', onApiLogout, this);

        function onApiReady () {
            var authorized = self.apiManager.isAuthorized();
            self.views.auth.render(authorized);
            self.collections.connections.getData(function () {
                if (authorized) {
                    self.views.connections.render();
                } else {
                    self.views.home.render();
                }
            });
        }

        function onApiAuthorize () {
            self.views.home.$el.empty();
            self.views.connections.render();
        }

        function onApiLogout () {
            self.views.connections.$el.empty();
            self.views.home.render();
        }

    };

    App.prototype = {
        collections: {},
        models: {},
        router: {},
        views: {},
    };

    return App;

});
