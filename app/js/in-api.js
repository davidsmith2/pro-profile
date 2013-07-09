define(['config'], function (config) {

    function ApiManager (_app) {
        this.app = _app;
        this.loadIN();
    }

    _.extend(ApiManager.prototype, Backbone.Events);

    ApiManager.prototype.loadIN = function () {

        var self = this, 
            credentials = { 
                api_key: config.api_key, 
                authorize: true
            };

        if (typeof IN !== 'undefined') {
            return authorize(credentials);
        }

        require(['linkedin'], function () {
            function checkIN () {
                if (IN) {
                    authorize(credentials);
                } else {
                    setTimeout(checkIN, 100);
                }
            }
            checkIN();
        });

        function authorize (credentials) {
            IN.init(credentials);
            if (typeof IN.API !== 'undefined') {
                return onAuthorize();
            }
            function checkApi () {
                if (IN.API) {
                    onAuthorize();
                } else {
                    setTimeout(checkApi, 100);
                }
            }
            checkApi();
        }

        function onAuthorize () {
            self.init();
        }

    };

    ApiManager.prototype.init = function () {
        var self = this;

        this.trigger('ready');

        this.handleSuccess = function (response) {
            _.each(response.models, function (model) {
                console.log(model.attributes);
            });
        };

        this.handleError = function (error) {
            if (error.status === 404) {
                console.log('Please sign in with LinkedIn');
            }
        };

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
                Backbone.clientRequest(request, method, model, options);
            break;

            case 'update':
            break;

            case 'delete':
            break;
        }
    };

    Backbone.clientRequest = function(request, method, model, options) {
        request.result(function(response) {
            options.success(response);
        }).error(function (error) {
            options.error(error);
        });
    };

    return ApiManager;
});
