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

        this.apiManager = new ApiManager();
        this.views.app = new AppView();
        this.views.auth = new AuthView({ apiManager: this.apiManager });
        this.views.home = new HomeView();
        self.collections.connections = new Connections();
        this.views.connections = new ConnectionsView({ collection: self.collections.connections });
        this.router = new Router();

        this.apiManager.on('ready', onApiReady, this);
        this.apiManager.on('authorize', onApiAuthorize, this);
        this.apiManager.on('logout', onApiLogout, this);

        function onApiReady () {
            self.views.auth.render(function () {
                self.views.auth.$loginButton = $(self.views.auth.loginButton);
                self.views.auth.$logoutButton = $(self.views.auth.logoutButton);
                if (self.apiManager.isAuthorized()) {
                    self.collections.connections.update();
                    self.views.auth.$loginButton.hide();
                } else {
                    self.views.home.render();
                    self.views.auth.$logoutButton.hide();
                }
            });
        }

        function onApiAuthorize () {
            self.collections.connections.update();
            self.views.home.$el.empty();
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
