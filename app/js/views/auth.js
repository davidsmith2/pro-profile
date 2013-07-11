define([
    'lib/text!templates/auth.html',
], 

function (template) {

    var AuthView = Backbone.View.extend({

        el: '#auth',
        template: _.template(template),

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

        events: {
            'click #login-button': 'login',
            'click #logout-button': 'logout'
        },

        login: function () {
            var self = this;
            IN.User.authorize(function () {
                $('#login-button').hide();
                $('#logout-button').show();
            });
        },

        logout: function () {
            var self = this;
            IN.User.logout(function () {
                $('#logout-button').hide();
                $('#login-button').show();
            });
        }

    });

    return AuthView;

});