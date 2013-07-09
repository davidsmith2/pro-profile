define(['lib/text!templates/profiles/menuitem.html'], function (template) {
    var MenuItemView = Backbone.View.extend({
        tagName: 'li',
        template: _.template(template),

        events: {
            'click': 'open'
        },

        initialize: function () {
        },

        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this;
        },

        open: function () {
            return false;
        }

    });

    return MenuItemView;
});