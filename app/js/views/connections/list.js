define([
    'views/connections/item'
], 

function (ConnectionItemView) {

    var ConnectionsListView = Backbone.View.extend({

        id: 'connections',
        tagName: 'ul',

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

        renderItem: function (model) {
            var item = new ConnectionItemView({ model: model });
            this.$el.append(item.render().el);
            return this;
        },

        onClose: function () {
            this.collection.unbind('change', this.render);
        }

    });

    return ConnectionsListView;

});