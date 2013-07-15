define([
    'models/profiles/connection'
], 

function (ConnectionProfile) {

    var Connections = Backbone.Collection.extend({

        model: ConnectionProfile,
        url: 'people/~/connections',

        update: function () {
            var self = this;
            this.fetch({
                data: {
                    fields: '(id,first-name,last-name,headline,location)',
                    model: this,
                    url: this.url,
                },
                success: function () {
                    self.trigger('success');
                },
                error: function () {
                    self.trigger('success');
                }

            })
        }
    });

    return Connections;

});