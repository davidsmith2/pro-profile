define([
    'lib/text!templates/auth/logout.html'
], 

function (template) {
    
    var LogoutView = Backbone.View.extend({

        id: '#logout',
        tagName: 'div',
        template: _.template(template),

        initialize: function () {},

        render: function () {
            this.$el.html(this.template());
            return this;
        }

    });

    return LogoutView;

});