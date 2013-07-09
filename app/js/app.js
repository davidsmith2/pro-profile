define([
    'in-api', 
    'views/app', 
    'collections/profiles'
], 

function (ApiManager, AppView, Profiles) {
    var App = function () {
        this.views.app = new AppView(this);
        this.views.app.render();
        this.collections.profiles = new Profiles();
        this.connectIN();
    };

    App.prototype = {
        collections: {},
        views: {},
        connectIN: function () {
            var self = this;
            this.apiManager = new ApiManager(this);
            this.apiManager.on('ready', function () {
                self.collections.profiles.fetch({
                    data: {
                        id: '~',
                        fields: '(id,first-name,last-name,headline,location,industry,num-connections,summary,positions)'
                    },
                    success: function (response) {
                        self.apiManager.handleSuccess(response);
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
