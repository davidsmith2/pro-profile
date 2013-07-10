define([], function () {

    var MasterView = Backbone.View.extend({

        render: function () {
            var self = this;
            this.collection.each(function (model) {
                self._render(model);
            });
            return this;
        }

    });

    return MasterView;
});