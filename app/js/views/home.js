define([
    'lib/text!templates/home.html'
], 

function (template) {
    
    var HomeView = Backbone.View.extend({

        el: '#home',
        template: _.template(template),

        initialize: function () {},

        render: function () {
            this.$el.html(this.template());
            return this;
        }

    });

    return HomeView;
    
});