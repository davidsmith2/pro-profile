define([
    'config',
    'api-manager',
    'models/profile',
    'routers/router',
    'views/app', 
    'views/auth', 
    'views/profiles/profile'
], 

function (config, ApiManager, Profile, Router, AppView, AuthView, ProfileView) {

    var App = function () {

        // views
        this.views.app = new AppView({ app: this });
        this.views.app.render();
        
        this.views.auth = new AuthView({ app: this });
        this.views.profile = new ProfileView({ app: this });

        // router
        this.router = new Router({ app: this });
        Backbone.history.start();

        //models
        this.models.profile = new Profile();

        // api
        this.connectApi();

    };

    App.prototype = {
        models: {},
        views: {},
        connectApi: function () {
            var self = this;
            this.apiManager = new ApiManager({ app: this });
            this.apiManager.on('ready', function () {
                self.views.auth.render();
                self.models.profile.getData();
                self.models.profile.on('ready', function () {
                    self.views.profile.render();
                });
                self.models.profile.on('403', function () {
                    self.views.profile.render();
                });
            });
        }
    };

    return App;

});
