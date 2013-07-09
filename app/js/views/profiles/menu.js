define(['views/profiles/menuitem'], function (MenuItemView) {
    var MenuView = Backbone.View.extend({
        el: '#menu',

        events: {

        },

        initialize: function () {
        },

        renderMenuItem: function (model) {
            var item = new MenuItemView({ model: model });
            this.$el.append(item.render().el);
        },

        render: function () {
            var self = this;
            this.collection.each(function (item) {
                self.renderMenuItem(item);
            });
            return this;
        }

    });

    return MenuView;
});