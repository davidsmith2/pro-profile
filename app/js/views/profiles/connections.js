define([
    'views/profiles/connection'
], 

function (ConnectionView) {

    var ConnectionsView = Backbone.View.extend({

        el: '#connections-list',

        initialize: function () {
            this.collection.on('add', this.renderConnection, this);
        },

        render: function () {
            var $el = this.el,
                self = this;
            this.collection.each(function (connection) {
                self.renderConnection(connection);
            });
        },

        renderConnection: function (connection) {
            var connection = new ConnectionView({ model: connection });
            this.$el.append(connection.render().el);
        }

    });

    return ConnectionsView;

});