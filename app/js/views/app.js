define(['lib/text!templates/app.html'], function (template) {

    var AppView = Backbone.View.extend({
        el: '#main',
        template: _.template(template),

        events: {
            'click #sign-in-button': 'auth'
        },

        initialize: function (app) {
            this.app = app;
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        },

        auth: function () {
            this.app.apiManager.checkAuth();
            return false;
        }

    });

    return AppView;

});
