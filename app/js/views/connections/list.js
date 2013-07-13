define([
    'views/connections/item'
], 

function (ConnectionItemView) {

    var ConnectionsListView = Backbone.View.extend({

        id: 'connections',
        tagName: 'ul',

        initialize: function () {},

        render: function (collection, response, options) {
            var self = this;
            this.collection.each(function (connection) {
                if (!connection.isPrivate()) {
                    self.renderConnection(connection);
                }
            });
            return this;
        },

        renderConnection: function (connection) {
            var connection = new ConnectionItemView({ model: connection });
            this.$el.append(connection.render().el);
            return this;
        },

        onClose: function () {
            this.collection.unbind('change', this.render);
        }

    });

    return ConnectionsListView;

});