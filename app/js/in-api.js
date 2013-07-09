define(['config'], function (config) {

    function ApiManager (_app) {
        this.app = _app;
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
                    onLinkedInLoad()
                } else {
                    setTimeout(checkIN, 100);
                }
            }

            checkIN();

            function onLinkedInLoad () {
                IN.init({ api_key: config.api_key, authorize: true });
                function checkAPI () {
                    if (IN.API) {
                        onLinkedInAuth();
                    } else {
                        setTimeout(checkAPI, 100);
                    }
                }
                checkAPI();
            }

            function onLinkedInAuth () {
                self.app.views.auth.$el.hide();
                $('#signed-in-container').show();
                self.init();
            }

        });

    };

    ApiManager.prototype.init = function () {
        var self = this;

        this.trigger('ready');

        this.handleError = function (error) {
            if (error.status === 404) {
                $('#signed-in-container').hide();
                self.app.views.auth.$el.show();
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
