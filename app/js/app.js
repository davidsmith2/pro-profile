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

    Backbone.View = Backbone.View.extend({
        remove: function () {
            $(this.el).empty().detach();
            return this;
        }
    });

    var App = function () {
        var self = this;
        this.router = new Router({ app: this, el: $('#content-area') });
        Backbone.history.start();
        this.views.app = new AppView(this);
        this.views.app.render();
        this.views.profile = new ProfileView({ app: this });
        this.models.profile = new Profile();
        this.connectApi();
    };

    App.prototype = {
        models: {},
        views: {},
        connectApi: function () {
            var self = this;
            this.apiManager = new ApiManager(this);
            this.apiManager.on('ready', function () {
                self.views.auth = new AuthView(self);
                self.views.auth.render();
                self.models.profile.getData();
                self.models.profile.on('ready', function () {
                    self.views.profile.render();
                });
            });
        }
    };

    return App;

});
