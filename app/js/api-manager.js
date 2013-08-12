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
        var methods = {
            'create':   handleCreate,
            'read':     handleRead,
            'update':   handleUpdate,
            'delete':   handleDelete
        };

        methods[method]();

        function handleCreate () {}

        function handleRead () {
            Backbone.apiRequest(IN.API.Raw(options.data.url + ':' + options.data.fields), method, model, options);
        }

        function handleUpdate () {}

        function handleDelete () {}
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