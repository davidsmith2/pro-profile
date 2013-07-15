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
        this.models.personalProfile.on('success', this.viewPersonalProfile, this);

    };

    App.prototype = {

        collections: {},
        models: {},
        router: {},
        views: {},

        onReady: function () {
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
            this.models.personalProfile.update();
        },

        onLogout: function () {
            this.router.viewLogout();
            this.views.nav.$el.empty();
        },

        viewPersonalProfile: function () {
            this.router.viewPersonalProfile();
            this.views.nav.render();
        }

    };

    return App;

});
