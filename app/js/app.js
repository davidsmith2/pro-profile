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

        this.apiManager = new ApiManager();
        this.views.app = new AppView();
        this.views.auth = new AuthView({ apiManager: this.apiManager });
        this.views.home = new HomeView();
        this.collections.connections = new Connections();
        this.views.connections = new ConnectionsView({ collection: this.collections.connections });
        this.router = new Router();

        this.apiManager.on('init', this.init, this);
        this.apiManager.on('authorize', this.authorize, this);
        this.apiManager.on('logout', this.logout, this);

    };

    App.prototype = {

        collections: {},
        models: {},
        router: {},
        views: {},

        init: function () {
            var self = this;
            this.views.auth.render(function () {
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
        },

        authorize: function () {
            this.collections.connections.update();
            this.views.home.$el.empty();
        },

        logout: function () {
            this.views.connections.$el.empty();
            this.views.home.render();
        }

    };

    return App;

});
