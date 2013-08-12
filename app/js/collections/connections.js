define([
    'models/connection'
],

function (Connection) {

    var Connections = Backbone.Collection.extend({
        model: Connection,
        url: 'people/~/connections'
    });

    return Connections;

});