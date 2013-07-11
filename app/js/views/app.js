define([
    'lib/text!templates/app.html'
], 

function (template) {

    var AppView = Backbone.View.extend({
        el: '#app',
        template: _.template(template),

        initialize: function (options) {
            this.app = options.app;
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        }

    });

    return AppView;

});
