define([
    'views/app',
    'views/connections/item'
],

function (AppView, ConnectionView) {

    var ConnectionsView = AppView.extend({

        tagName: 'ul',
        id: 'connections-list-view',

        initialize: function (options) {
            this.collection = options.collection;
        },

        render: function () {
            var self = this;
            this.collection.each(function (model) {
                if (!model.isPrivate()) {
                    self.renderItem(model);
                }
            });
            return this;
        },

        renderItem: function (profile) {
            var item = new ConnectionView({ model: profile });
            this.$el.append(item.render().el);
            return this;
        }

    });

    return ConnectionsView;

});