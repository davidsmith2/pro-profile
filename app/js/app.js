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
        this.apiManager.on('auth', this.login, this);
        this.apiManager.on('logout', this.logout, this);

    };

    App.prototype = {

        collections: {},
        models: {},
        router: {},
        views: {},

        login: function () {

            var model = this.models.personalProfile,
                collection = this.collections.connections,
                self = this;

            // get personal info for login message
            model.fetch({
                data: {
                    fields: '(first-name,last-name)',
                    url: model.url
                },
                success: function (model, response, options) {
                    $('#login-button-box').hide();
                    $('body').addClass('logged-in');
                    $('#header').show();
                    self.router.viewAuthMessage(model);
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
                    self.views.nav.render();
                },
                error: function (collection, response, options) {
                    console.log('error');
                }
            });

        },

        logout: function () {
            var self = this;
            IN.User.logout(function () {
                $('body').removeClass('logged-in');
                $('#header').hide();
                $('#content').empty();
                self.views.nav.$el.empty();
                $('body').addClass('guest');
                $('#login-button-box').show();
            });
        }

    };

    return App;

});
