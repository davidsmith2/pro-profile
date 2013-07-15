define([
    'models/profiles/connection'
], 

function (ConnectionProfile) {

    var Connections = Backbone.Collection.extend({
        model: ConnectionProfile,
        url: 'people/~/connections',
    });

    return Connections;

});