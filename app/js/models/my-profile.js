define([
    'models/profile'
],

function (Profile) {

    var MyProfile = Profile.extend({
        url: 'people/~'
    });

    return MyProfile;

});