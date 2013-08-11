define([
],

function () {

    function ApiManager () {
        var self = this;

        this.onAuth = function () {
            self.trigger('auth');
        };

        this.logout = function () {
            IN.User.logout(function () {
                self.trigger('logout');
            });
        };
    }

    _.extend(ApiManager.prototype, Backbone.Events);

    Backbone.sync = function (method, model, options) {
        if (!options) {
            options = {};
        }

        switch (method) {
            case 'create':
            break;

            case 'read':
                Backbone.apiRequest(IN.API.Raw(options.data.url + ':' + options.data.fields), method, model, options);
            break;

            case 'update':
            break;

            case 'delete':
            break;
        }
    };

    Backbone.apiRequest = function(request, method, model, options) {
        request.result(function(response) {
            options.success(response);
        }).error(function (error) {
            options.error(error);
        });
    };

    return ApiManager;

});