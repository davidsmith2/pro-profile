define([
    'config',
    'lib/text!templates/auth.html',
    'models/profile',
    'views/profiles/profile',
], 

function (config, template, Profile, ProfileView) {

    var AuthView = Backbone.View.extend({

        el: '#auth-area',
        template: _.template(template),

        events: {
            'click #login-button': 'login',
            'click #logout-button': 'logout'
        },

        initialize: function (options) {
            this.app = options.app;
        },

        render: function () {
            this.$el.html(this.template());
            this.auth();
            return this;
        },

        auth: function () {
            if (IN.User.isAuthorized()) {
                $('#login-button').hide();
            } else {
                $('#logout-button').hide();
            }
        },

        login: function () {
            IN.User.authorize(function () {
                $('#login-button').hide();
                $('#logout-button').show();
            });
        },

        logout: function () {
            IN.User.logout(function () {
                $('#logout-button').hide();
                $('#login-button').show();
            });
        }

    });

    return AuthView;

});