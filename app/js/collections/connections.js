define([
    'models/profiles/connection'
], 

function (ConnectionProfile) {

    // overriding Backbone's native parse method for sake of LinkedIn API
    Backbone.Collection.prototype.parse = function (data) {
        if (_.isObject(data.values)) {
            return data.values;
        } else {
            return data;
        }
    };

    var Connections = Backbone.Collection.extend({
        model: ConnectionProfile,
        url: 'people/~/connections',
    });

    return Connections;

});