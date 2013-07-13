define([
    'models/profile'
], 

function (Profile) {

    var PersonalProfile = Profile.extend({
        url: 'people/~'
    });

    return PersonalProfile;

});
