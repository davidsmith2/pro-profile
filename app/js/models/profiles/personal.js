define([
    'models/profiles/connection'
], 

function (ConnectionProfile) {

    var PersonalProfile = ConnectionProfile.extend({
        url: 'people/~'
    });

    return PersonalProfile;

});
