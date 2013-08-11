define([
],

function () {

    var AppView = Backbone.View.extend({

        currentView: null,

        show: function (view) {
            if (this.currentView) {
                this.currentView.close();
            }
            this.currentView = view;
            this.currentView.render();
        }

    });

    return AppView;

});
