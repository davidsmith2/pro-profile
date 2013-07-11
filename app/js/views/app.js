define(['lib/text!templates/app.html'], function (template) {

    var AppView = Backbone.View.extend({
        el: 'body',
        template: _.template(template),

        initialize: function (_app) {
            this.app = _app;
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        }

    });

    return AppView;

});
