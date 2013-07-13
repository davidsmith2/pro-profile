define([
    'api-manager',
    'collections/connections',
    'models/profiles/connection',
    'models/profiles/personal',
    'router',
    'views/app', 
    'views/auth',
    'views/nav' 
], 

function (ApiManager, Connections, ConnectionProfile, PersonalProfile, Router, AppView, AuthView, NavView) {

    var App = function () {

        var self = this;

        // models and collections
        this.models.connectionProfile = new ConnectionProfile();
        this.models.personalProfile = new PersonalProfile();
        this.collections.connections = new Connections();

        // API manager
        this.apiManager = new ApiManager();

        // Views
        this.views.app = new AppView();
        this.views.auth = new AuthView(this);
        this.views.nav = new NavView();

        // router
        this.router = new Router(this);

        // render and hide the login and logout buttons until we know which is required
        this.views.auth.render(function () {
            self.views.auth.$loginButton = $(self.views.auth.loginButton).hide();
            self.views.auth.$logoutButton = $(self.views.auth.logoutButton).hide();
        });

        // listen out for these events
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
            var self = this;
            this.views.nav.render();
            this.collections.connections.fetch({
                data: {
                    url: this.collections.connections.url,
                    fields: '(id,first-name,last-name,headline,location)'
                },
                success: function (collection, response, options) {
                    self.router.navigate('!/people', { trigger: true });
                },
                error: function () {
                    console.log('error');
                }
            });
        },

        logout: function () {
            this.views.nav.$el.empty();
            this.router.navigate('!/index', { trigger: true });
        }

    };

    return App;

});
