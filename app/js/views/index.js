define([
    'lib/text!templates/index.html'
], 

function (template) {
    
    var HomeView = Backbone.View.extend({

        id: '#home',
        tagName: 'div',
        template: _.template(template),

        initialize: function () {},

        render: function () {
            this.$el.html(this.template());
            return this;
        }

    });

    return HomeView;

});