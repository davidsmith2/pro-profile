define([
    'models/profile'
], 

function (Profile) {

    Backbone.Collection.prototype.parse = function (data) {
        if (_.isObject(data.values)) {
            return data.values;
        } else {
            return data;
        }
    };

    var Connections = Backbone.Collection.extend({
        model: Profile,
        url: 'people/~/connections',

        initialize: function (options) {
            this.apiManager = options.apiManager;
            this.apiManager.on('ready', this.getData, this);
        },

        getData: function () {
            var self = this;
            this.fetch({
                data: {
                    fields: '(id,first-name,last-name,headline,location)',
                },
                silent: true
            });
        }
    });

    return Connections;

});