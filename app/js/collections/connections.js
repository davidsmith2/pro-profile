define([
    'models/profile'
], 

function (Profile) {

    var Connections = Backbone.Collection.extend({
        model: Profile,
        url: 'people/~/connections',
        getData: function () {
            var self = this;
            this.fetch({
                data: {
                    fields: '(id,first-name,last-name,headline,location)',
                },
                silent: true
            });
        },
        parse: function (response) {
            return response.values;
        }
    });

    return Connections;

});