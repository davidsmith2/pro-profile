define([
    'config'
], 

function (config) {

    function ApiManager () {

        var self = this;

        loadApi(this);

        this.isAuthorized = function () {
            self.trigger('isAuthorized');
            return IN.User.isAuthorized();
        };

        this.authorize = function (callback) {
            return IN.User.authorize(function () {
                self.trigger('authorize');
                if (callback) callback();
            });
        };

        this.logout = function (callback) {
            return IN.User.logout(function () {
                self.trigger('logout');
                if (callback) callback();
            });
        };

    }

    _.extend(ApiManager.prototype, Backbone.Events);

    function loadApi (self) {

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
            IN.init({ api_key: config.api_key, authorize: false });
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
                if (options.data) {
/*
                    if (options.data.model) {
                        model = options.data.model;
                    }
*/
                    if (options.data.url) {
                        url = options.data.url
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