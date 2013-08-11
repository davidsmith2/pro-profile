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
        this.views.app = new AppView();
        this.views.nav = new NavView({ app: this });

        // listen out for these events
        this.apiManager.on('auth', this.handleLogin, this);
        this.apiManager.on('logout', this.handleLogout, this);

        $('#loader').hide();

    };

    App.prototype = {

        collections: {},
        models: {},
        router: {},
        views: {},

        handleLogin: function () {
            var model = this.models.personalProfile,
                collection = this.collections.connections,
                self = this;

            $('#login').hide();
            $('#logout, #nav, #content').show();

            // get personal info for login message
            model.fetch({
                data: {
                    fields: '(first-name,last-name)',
                    url: model.url
                },
                success: function (model, response, options) {
                    self.router.viewLogout(model);
                    self.views.nav.render();

                },
                error: function (model, response, options) {
                    console.log('error');
                }
            });

            // get connections info
            collection.fetch({
                data: {
                    fields: '(id,first-name,last-name,headline,location)',
                    url: collection.url
                },
                success: function (collection, response, options) {
                    self.router.navigate('!/' + collection.url);
                    self.router.viewConnections(collection);
                },
                error: function (collection, response, options) {
                    console.log('error');
                }
            });

        },

        handleLogout: function () {
            $('#logout, #nav, #content').hide();
            $('#login').show();
        }

    };

    return App;

});
