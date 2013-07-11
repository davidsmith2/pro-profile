define([
    'config',
    'api-manager',
    'models/profile',
    'router',
    'views/app', 
    'views/auth', 
    'views/profiles/profile'
], 

function (config, ApiManager, Profile, Router, AppView, AuthView, ProfileView) {

    var App = function () {

        //models
        this.models.profile = new Profile();

        // views
        this.views.app = new AppView({ app: this });
        this.views.app.render();

        this.views.auth = new AuthView({ app: this });
        this.views.profile = new ProfileView({ app: this });

        // api
        this.connectApi();

        // router
        this.routers.router = new Router();
        Backbone.history.start();

    };

    App.prototype = {
        models: {},
        routers: {},
        views: {},
        connectApi: function () {
            var self = this;
            this.apiManager = new ApiManager({ app: this });
            this.apiManager.on('ready', function () {
                self.views.auth.render();
                self.models.profile.getData();
/*
                self.models.profile.on('ready', function () {
                    self.views.profile.render();
                });
                self.models.profile.on('403', function () {
                    self.views.profile.render();
                });
*/
            });
        }
    };

    return App;

});
