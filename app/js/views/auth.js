define([
    'lib/text!templates/auth.html',
], 

function (template) {

    var app;

    var AuthView = Backbone.View.extend({

        el: '#auth',
        loginButton: '#login-button',
        logoutButton: '#logout-button',
        template: _.template(template),

        events: {
            'click #login-button': 'login',
            'click #logout-button': 'logout'
        },

        initialize: function (_app) {
            var self = this;
            this.app = _app;
            this.app.apiManager.on('authorize', this.onLogin, this);
            this.app.apiManager.on('logout', this.onLogout, this);
        },

        render: function (callback) {
            this.$el.html(this.template());
            if (callback) callback();
            return this;
        },

        login: function (event) {
            event.preventDefault();
            this.app.apiManager.authorize();
        },

        logout: function (event) {
            event.preventDefault();
            this.app.apiManager.logout();
        },

        onLogin: function () {
            this.$loginButton.hide();
            this.$logoutButton.show();
        },

        onLogout: function () {
            this.$logoutButton.hide();
            this.$loginButton.show();
        }

    });

    return AuthView;

});