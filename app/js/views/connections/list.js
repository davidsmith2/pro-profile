define([
    'views/app',
    'views/connections/item'
],

function (AppView, ConnectionItemView) {

    var ConnectionsListView = AppView.extend({

        tagName: 'ul',
        id: 'connections-list-view',

        initialize: function (options) {
            this.collection = options.collection;
        },

        render: function () {
            var self = this;
            this.collection.each(function (model) {
                if (!model.isPrivate() && !model.isOnPoint()) {
                    self.renderItem(model);
                }
            });
            return this;
        },

        renderItem: function (model) {
            var item = new ConnectionItemView({ model: model });
            this.$el.append(item.render().el);
            return this;
        }

    });

    return ConnectionsListView;

});