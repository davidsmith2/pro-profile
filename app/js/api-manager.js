define([
    'config'
], 

function (config) {

    function ApiManager (_app) {
        this.app = _app;
        this.loadSystem();
    }

    _.extend(ApiManager.prototype, Backbone.Events);

    ApiManager.prototype.loadSystem = function () {

        var self = this;

        // - If the global IN object has already loaded, proceed to initialize it
        // - Asycnhronously load the global IN object
        // - Check whether the global IN object has loaded
        // - Initialize the global IN object
        // - Check whether the API object has loaded

        if (typeof IN !== 'undefined') {
            return initIN();
        }

        require(['linkedin'], function () {
            checkIN();
        });

        function checkIN () {
            if (IN) {
                initIN();
                checkAPI();
            } else {
                setTimeout(checkIN, 100);
            }
        }

        function initIN () {
            IN.init({ api_key: config.api_key, authorize: true });
        }

        function checkAPI () {
            if (IN.API) {
                self.trigger('ready');
            } else {
                setTimeout(checkAPI, 100);
            }
        }

    };

    Backbone.sync = function (method, model, options) {
        var url, request;
        options || (options = {});

        switch (method) {
            case 'create':
            break;

            case 'read':
                url = model.url + '/' + options.data.id;
                if (options.data.fields) {
                    url += ':' + options.data.fields;
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
            result = response;
            options.success(result, true, response);
        }).error(function (error) {
            options.error(error);
        });
    };

    return ApiManager;
});
