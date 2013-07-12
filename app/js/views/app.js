define([
    'lib/text!templates/app.html'
], 

function (template) {

    var AppView = Backbone.View.extend({
        el: '#app',
        template: _.template(template),

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        }

    });

    return AppView;

});
