define([], function () {
    var app;

    function ApiManager (_app) {
        app = _app;
        this.loadIN();
    }

    _.extend(ApiManager.prototype, Backbone.Events);

    ApiManager.prototype.loadIN = function () {
        var self = this;

        if (typeof IN !== 'undefined') {
            return onLinkedInLoad();
        }

        require(['linkedin'], function () {
            function checkIN () {
                if (IN) {
                    onLinkedInLoad();
                } else {
                    setTimeout(checkIN, 500);
                }
            }
            checkIN();
        });

        function onLinkedInLoad () {
            IN.init({
                api_key: '3hgb50tctix0',
                authorize: true
            });

            if (typeof IN.API !== 'undefined') {
                return onLinkedInAuth();
            }

            function checkAPI () {
                if (IN.API) {
                    onLinkedInAuth();
                } else {
                    setTimeout(checkAPI, 500);
                }
            }
            checkAPI();
        }

        function onLinkedInAuth () {
            self.trigger('ready');
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
                Backbone.INRequest(request, method, model, options);
            break;

            case 'update':
            break;

            case 'delete':
            break;
        }
    };

    Backbone.INRequest = function(request, method, model, options) {
        request.result(function(response) {
            options.success(response);
        }).error(function (error) {
            options.error(error);
        });
    };

    return ApiManager;
});
