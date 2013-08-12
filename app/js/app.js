define([
    'api-manager',
    'collections/connections',
    'models/user',
    'router',
    'views/app',
    'views/user',
    'views/nav',
    'views/connections/list'
],

function (ApiManager, Connections, User, Router, AppView, UserView, NavView, ConnectionsView) {

    var App = function () {

        this.models.user = new User();
        this.collections.connections = new Connections();
        this.apiManager = new ApiManager();
        this.views.app = new AppView();
        this.router = new Router({ app: this });

        this.models.user.on('sync', function () {
            console.log('user data synced');
        });
        this.collections.connections.on('sync', function () {
            console.log('connection data synced');
        });
        this.apiManager.on('auth', this.handleLogin, this);
        this.apiManager.on('logout', this.handleLogout, this);

        Backbone.history.start();

    };

    App.prototype = {

        collections: {},
        models: {},
        router: {},
        views: {},

        handleLogin: function () {
            var fields = this.models.user.fields,
                self = this;

            this.models.user.fetch({
                data: {
                    fields: fields,
                    url: this.models.user.url
                },
                success: function (model, response, options) {
                    self.router.showUser();
                    self.router.showNav();
                },
                error: function (model, response, options) {
                    console.log('error');
                }
            });

            this.collections.connections.fetch({
                data: {
                    fields: fields,
                    url: this.collections.connections.url
                },
                success: function (collection, response, options) {
                    self.router.showConnections();
                },
                error: function (collection, response, options) {
                    console.log('error');
                }
            });

            $('#login').hide();
            $('#user, #nav, #content').show();

        },

        handleLogout: function () {
            $('#user, #nav, #content').hide();
            $('#login').show();
        }

    };

    return App;

});
