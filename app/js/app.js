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
            var user = this.models.user,
                connections = this.collections.connections,
                fields = user.fields,
                self = this;

            user.fetch({
                data: {
                    fields: fields,
                    url: user.url
                },
                success: function (model, response, options) {
                    self.router.showUser();
                    self.router.showNav();
                },
                error: function (model, response, options) {
                    console.log('error');
                }
            });

            connections.fetch({
                data: {
                    fields: fields,
                    url: connections.url
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
            $('#nav, #content').empty();
            $('#user, #nav, #content').hide();
            $('#login').show();
        }

    };

    return App;

});
