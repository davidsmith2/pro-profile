define([
    'models/user'
],

function (User) {

    var Connections = Backbone.Collection.extend({
        model: User,
        url: 'people/~/connections'
    });

    return Connections;

});