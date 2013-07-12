define([
    'lib/text!templates/auth.html',
], 

function (template) {

    var AuthView = Backbone.View.extend({

        el: '#auth',
        template: _.template(template),

        events: {
            'click #login-button': 'login',
            'click #logout-button': 'logout'
        },

        initialize: function (options) {
            this.apiManager = options.apiManager;
        },

        render: function (authorized) {
            this.$el.html(this.template());
            if (authorized) {
                $('#login-button').hide();
            } else {
                $('#logout-button').hide();
            }
            return this;
        },

        login: function () {
            var self = this;
            this.apiManager.authorize(function () {
                $('#login-button').hide();
                $('#logout-button').show();
            });
        },

        logout: function () {
            var self = this;
            this.apiManager.logout(function () {
                $('#logout-button').hide();
                $('#login-button').show();
            });
        }

    });

    return AuthView;

});