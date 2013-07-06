define(['lib/text!templates/sign-in.html'], function (template) {

    var AppView = Backbone.View.extend({
        container: '#sign-in-container',
        el: '#main',
        template: _.template(template),

        events: {
            'click #sign-in-button': 'auth'
        },

        init: function (app) {
            this.app = app;
        },

        render: function () {
            this.$el.html(this.template());
            $(this.container).show();
            return this;
        },

        auth: function () {
            this.app.apiManager.generateAuthorizationCode();
            return false;
        }

    });

    return AppView;

});
