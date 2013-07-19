define([
    'api-manager',
    'collections/connections',
    'models/profiles/connection',
    'models/profiles/personal',
    'models/session',
    'router',
    'views/app',
    'views/nav'
],

function (ApiManager, Connections, ConnectionProfile, PersonalProfile, Session, Router, AppView, NavView) {

    var App = function () {

        // create models and collections
        this.collections.connections = new Connections();
        this.models.connectionProfile = new ConnectionProfile();
        this.models.personalProfile = new PersonalProfile();
        this.models.session = new Session();

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

    };

    App.prototype = {

        collections: {},
        models: {},
        router: {},
        views: {},

        onReady: function () {
            Backbone.history.start();
            if (!this.apiManager.isAuthorized()) {
                this.views.app.$loginLink.show();
                this.apiManager.trigger('logout');
            } else {
                this.views.app.$logoutLink.show();
                this.apiManager.trigger('authorize');
            }
        },

        onLogin: function () {
            var collection = this.collections.connections, self = this;
            collection.fetch({
                data: {
                    fields: '(id,first-name,last-name,headline,location)',
                    url: collection.url
                },
                success: function (collection, response, options) {
                    self.router.navigate('!/' + collection.url);
                    self.views.nav.render();
                    self.router.viewConnections(collection);
                },
                error: function (collection, response, options) {
                    console.log('error getting data');
                }
            });
        },

        onLogout: function () {
            this.router.viewLogout();
            this.views.nav.$el.empty();
        }

    };

    return App;

});
