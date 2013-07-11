define([
    'config',
    'lib/text!templates/auth.html',
    'models/profile',
    'views/profiles/profile'
], 

function (config, template, Profile, ProfileView) {

    var AuthView = Backbone.View.extend({

        el: '#auth-area',
        template: _.template(template),

        events: {
            'click #sign-in-button': 'signIn',
            'click #sign-out-button': 'signOut'
        },

        initialize: function (_app) {
            this.app = _app;
        },

        render: function () {
            this.$el.html(this.template());
            if (IN.User.isAuthorized()) {
                $('#sign-in-button').hide();
            } else {
                $('#sign-out-button').hide();
            }
            return this;
        },

        signIn: function () {
            var self = this;
            IN.User.authorize(function () {
                $('#sign-in-button').hide();
                $('#sign-out-button').show();
                self.app.router.navigate('/');
                self.app.models.profile.getData();
            });
        },

        signOut: function () {
            var self = this;
            IN.User.logout(function () {
                $('#sign-out-button').hide();
                $('#sign-in-button').show();
                self.app.router.navigate('/');
            });
        }

    });

    return AuthView;

});