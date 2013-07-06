define(['in-api', 'collections/profiles'], function (ApiManager, Profiles) {
    var App = function () {
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
                        _.each(response.models, function (model) {
                            console.log(model.attributes);
                        });
                    },
                    error: function () {
                        console.log('error');
                    }
                });
            });
        }
    };

    return App;
});
