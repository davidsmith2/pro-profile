define([
    'models/profiles/connection'
],

function (ConnectionProfile) {

    var PersonalProfile = ConnectionProfile.extend({

        url: 'people/~',

        initialize: function () {}

    });

    return PersonalProfile;
    
});