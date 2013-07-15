define([
    'lib/text/text!templates/app.html'
], 

function (template) {

    var AppView = Backbone.View.extend({

        currentView: null,
        el: '#app',
        loginLink: '#login-link',
        logoutLink: '#logout-link',
        template: _.template(template),

        events: {
            'click #logout-link': 'logout'
        },

        initialize: function (_app) {
            var self = this;
            this.app = _app;
            this.app.apiManager.on('authorize', this.onLogin, this);
            this.app.apiManager.on('logout', this.onLogout, this);
            this.render(function () {
                self.$loginLink = $(self.loginLink).hide();
                self.$logoutLink = $(self.logoutLink).hide();
            });
        },

        render: function (callback) {
            this.$el.html(this.template());
            callback();
            return this;
        },

        logout: function () {
            this.app.apiManager.trigger('logout');
        },

        onLogin: function () {
            this.$loginLink.hide();
            this.$logoutLink.show();
        },

        onLogout: function () {
            this.$logoutLink.hide();
            this.$loginLink.show();
            this.app.views.nav.$el.empty();
        },

        showView: function (view) {
            if (this.currentView) {
                this.currentView.close();
            }
            this.currentView = view;
            this.currentView.render();
            $('#content').html(this.currentView.el);
        },

    });

    return AppView;

});
