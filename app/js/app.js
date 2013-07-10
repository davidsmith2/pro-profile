define([
    'views/app', 
    'views/auth', 
    'views/profiles/list', 
    'collections/profiles',
    'in-api',
    'config',
], 

function (AppView, AuthView, ListView, Profiles, ApiManager, config) {
    var App = function () {
        this.views.app = new AppView(this);
        this.views.app.render();
        this.views.auth = new AuthView(this);
        this.views.auth.render();
        this.views.auth.$el.show();
        this.collections.profiles = new Profiles();
        this.views.list = new ListView(this, this.collections.profiles);
        this.connectIN();
    };

    App.prototype = {
        collections: {},
        models: {},
        views: {},
        connectIN: function () {
            var self = this;
            this.apiManager = new ApiManager(this);
            this.apiManager.on('ready', function () {
                self.collections.profiles.fetch({
                    data: {
                        id: config.id,
                        fields: '(id,first-name,last-name,headline,location)'
                    },
                    success: function (response) {
                        self.views.list.render();
                    },
                    error: function (response, error) {
                        self.apiManager.handleError(error);
                    }
                });
            });
        }
    };

    return App;
});
