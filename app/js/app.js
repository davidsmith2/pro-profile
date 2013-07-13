define([
    'api-manager',
    'collections/connections',
    'models/profile',
    'router',
    'views/app', 
    'views/auth'
], 

function (ApiManager, Connections, Profile, Router, AppView, AuthView) {

    var App = function () {

        var self = this;

        this.collections.connections = new Connections();
        this.models.profile = new Profile();

        this.apiManager = new ApiManager();

        this.views.app = new AppView();
        this.views.auth = new AuthView(this);

        this.router = new Router(this);

        this.views.auth.render(function () {
            self.views.auth.$loginButton = $(self.views.auth.loginButton).hide();
            self.views.auth.$logoutButton = $(self.views.auth.logoutButton).hide();
        });

        this.apiManager.on('ready', self.init, self);
        this.apiManager.on('authorize', self.login, self);
        this.apiManager.on('logout', self.logout, self);

    };

    App.prototype = {

        collections: {},
        models: {},
        router: {},
        views: {},

        init: function () {
            var self = this;
            Backbone.history.start();
            if (this.apiManager.isAuthorized()) {
                this.views.auth.$logoutButton.show();
                this.apiManager.trigger('authorize');
            } else {
                this.views.auth.$loginButton.show();
                this.apiManager.trigger('logout');
            }
        },

        login: function () {
            var connections = this.collections.connections, self = this;
            connections.fetch({
                data: {
                    url: connections.url,
                    fields: '(id,first-name,last-name,headline,location)'
                },
                success: function (collection, response, options) {
                    self.router.navigate('!/connections', { trigger: true });
                },
                error: function () {
                    console.log('error');
                }
            });
        },

        logout: function () {
            this.router.navigate('!/home', { trigger: true });
        }

    };

    return App;

});
