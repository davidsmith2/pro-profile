define([
    'config'
],

function (config) {

    function ApiManager () {

        var self = this;

        this.isLoggedIn = false;

        this.onAuth = function () {
            self.isLoggedIn = true;
            self.trigger('auth');
        };

        this.onLogout = function () {
            self.trigger('logout');
        };

    }

    _.extend(ApiManager.prototype, Backbone.Events);

    Backbone.sync = function (method, model, options) {

        var url, request;
        options || (options = {});

        switch (method) {
            case 'create':
            break;

            case 'read':
                if (options.data) {
                    if (options.data.model) {
                        model = options.data.model;
                    }
                    if (options.data.url) {
                        url = options.data.url;
                    } else {
                        url = model.url;
                    }
                    if (options.data.fields) {
                        url += ':' + options.data.fields;
                    }
                }
                request = IN.API.Raw(url);
                Backbone.apiRequest(request, method, model, options);
            break;

            case 'update':
            break;

            case 'delete':
            break;
        }

    };

    Backbone.apiRequest = function(request, method, model, options) {
        var result;
        request.result(function(response) {
            options.success(response);
        }).error(function (error) {
            options.error(error);
        });
    };

    return ApiManager;

});