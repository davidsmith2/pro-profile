define([
    'in-api', 
    'views/app', 
    'views/auth', 
    'views/profiles/menu', 
    'collections/profiles'
], 

function (ApiManager, AppView, AuthView, MenuView, Profiles) {
    var App = function () {
        this.views.app = new AppView(this);
        this.views.app.render();
        this.views.auth = new AuthView(this);
        this.views.auth.render();
        this.views.auth.$el.show();
        this.collections.profiles = new Profiles();
        this.views.menu = new MenuView({ collection: this.collections.profiles });
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
                        id: '~',
                        fields: '(id,first-name,last-name,headline,location,industry,num-connections,summary)'
                    },
                    success: function (response) {
                        self.models.activeProfile = self.collections.profiles.first();
                        self.views.menu.render();
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
