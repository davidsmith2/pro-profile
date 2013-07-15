define([
    'api-manager',
    'collections/connections',
    'models/profiles/connection',
    'models/profiles/personal',
    'router',
    'views/app', 
    'views/nav' 
], 

function (ApiManager, Connections, ConnectionProfile, PersonalProfile, Router, AppView, NavView) {

    var App = function () {

        // create models and collections
        this.models.connectionProfile = new ConnectionProfile();
        this.models.personalProfile = new PersonalProfile();
        this.collections.connections = new Connections();

        // create API manager
        this.apiManager = new ApiManager();

        // create router
        this.router = new Router(this);

        // create main views
        this.views.app = new AppView(this);
        this.views.nav = new NavView({ app: this });

        // listen out for these events
        this.apiManager.on('ready', this.onReady, this);
        this.apiManager.on('authorize', this.onLogin, this);
        this.apiManager.on('logout', this.onLogout, this);
        this.models.personalProfile.on('success', this.viewFirstPage, this);

    };

    App.prototype = {

        collections: {},
        models: {},
        router: {},
        views: {},

        onReady: function () {
            var self = this;
            Backbone.history.start();
            if (this.apiManager.isAuthorized()) {
                this.views.app.$logoutLink.show();
                this.apiManager.trigger('authorize');
            } else {
                this.views.app.$loginLink.show();
                this.apiManager.trigger('logout');
            }
        },

        onLogin: function () {
            var self = this;
            this.models.personalProfile.update();
        },

        onLogout: function () {
            this.views.nav.$el.empty();
            this.router.viewLogout();
        },

        viewFirstPage: function () {
            this.views.nav.render();
            this.router.navigate('!/people/~', { trigger: true });
        }

    };

    return App;

});
