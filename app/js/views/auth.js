define([
    'lib/text!templates/auth.html',
], 

function (template) {

    var AuthView = Backbone.View.extend({

        el: '#auth',
        template: _.template(template),
        loginButton: '#login-button',
        logoutButton: '#logout-button',

        events: {
            'click #login-button': 'login',
            'click #logout-button': 'logout'
        },

        initialize: function (options) {
            this.apiManager = options.apiManager;
        },

        render: function (callback) {
            var self = this;
            this.$el.html(this.template());
            if (callback) callback();
            return this;
        },

        login: function () {
            var self = this;
            this.apiManager.authorize(function () {
                self.$loginButton.hide();
                self.$logoutButton.show();
            });
        },

        logout: function () {
            var self = this;
            this.apiManager.logout(function () {
                self.$logoutButton.hide();
                self.$loginButton.show();
            });
        },

    });

    return AuthView;

});