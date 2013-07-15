define([
    'lib/text!templates/auth/login.html'
], 

function (template) {
    
    var LoginView = Backbone.View.extend({

        id: '#login',
        tagName: 'div',
        template: _.template(template),

        events: {
            'click #login-button': 'login'
        },

        initialize: function (options) {
            this.app = options.app;
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        },

        login: function () {
            this.app.apiManager.authorize();
        }

    });

    return LoginView;

});