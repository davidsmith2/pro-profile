define([
    'models/profile'
], 

function (Profile) {

    // overriding Backbone's native parse method for sake of LinkedIn API
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
    });

    return Connections;

});