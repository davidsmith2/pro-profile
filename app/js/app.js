define([
    'api-manager',
    'collections/connections',
    'models/my-profile',
    'router',
    'views/app',
    'views/logout',
    'views/nav',
    'views/connections/list'
],

function (ApiManager, Connections, MyProfile, Router, AppView, LogoutView, NavView, ConnectionsView) {

    var App = function () {

        this.models.myProfile = new MyProfile();
        this.collections.connections = new Connections();
        this.apiManager = new ApiManager();
        this.views.app = new AppView();
        this.router = new Router({ app: this });

        this.models.myProfile.on('sync', function () {
            console.log('my profile synced');
        });
        this.collections.connections.on('sync', function () {
            console.log('connections synced');
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
            var myProfile = this.models.myProfile,
                connections = this.collections.connections,
                fields = myProfile.fields,
                self = this;

            myProfile.fetch({
                data: {
                    fields: fields,
                    url: myProfile.url
                },
                success: function (model, response, options) {
                    self.router.showLogout();
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
            $('#logout, #nav, #content').show();

        },

        handleLogout: function () {
            $('#nav, #content').empty();
            $('#logout, #nav, #content').hide();
            $('#login').show();
        }

    };

    return App;

});
