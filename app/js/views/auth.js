define([
    'lib/mustache/mustache',
    'lib/text/text!templates/auth.html'
],

function (mustache, template) {

    var AuthView = Backbone.View.extend({

        className: 'login-message',
        tagName: 'div',

        events: {
            'click #logout-link': 'logout'
        },

        initialize: function (options) {
            this.model = options.model;
        },

        render: function () {
            this.$el.html(mustache.render($(template).html(), this.model.attributes));
            return this;
        },

        logout: function () {
            proProfile.apiManager.onLogout();
        }

    });

    return AuthView;

});