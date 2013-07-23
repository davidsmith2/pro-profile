define([
    'lib/text/text!templates/app.html'
],

function (template) {

    var AppView = Backbone.View.extend({

        currentView: null,
        el: '#app',
        template: _.template(template),

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
        },

        showView: function (view) {
            if (this.currentView) {
                this.currentView.close();
            }
            this.currentView = view;
            this.currentView.render();
            $('#content').html(this.currentView.el);
        }

    });

    return AppView;

});
