define(['lib/text!templates/auth.html'], function (template) {

    var AuthView = Backbone.View.extend({

        el: '#sign-in-container',
        template: _.template(template),

        events: {
            'click #sign-in-button': 'doSomething'

        },

        initialize: function (_app) {
            this.app = _app;
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        },

        doSomething: function () {
            
        }

    });

    return AuthView;

});