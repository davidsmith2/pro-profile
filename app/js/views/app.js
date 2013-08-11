define([
],

function () {

    var AppView = Backbone.View.extend({

        show: function (selector, view) {
            if (this.currentView) {
                this.currentView.close();
            }
            this.currentView = view;
            this.currentView.render();
            $(selector).html(this.currentView.el);
            return view;
        }

    });

    return AppView;

});