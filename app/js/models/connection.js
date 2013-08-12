define([
    'models/user'
],

function (User) {

    var Connection = User.extend({

        url: 'people/id=',

        isPrivate: function () {
            return this.get('id') === 'private';
        }

    });

    return Connection;

});