define([
    'models/profile'
],

function (Profile) {

    var Connections = Backbone.Collection.extend({
        model: Profile,
        url: 'people/~/connections'
    });

    return Connections;

});