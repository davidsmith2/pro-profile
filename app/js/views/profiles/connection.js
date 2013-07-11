define([
    'lib/text!templates/profiles/connection.html'
], 

function (template) {

    var ConnectionView = Backbone.View.extend({

        tagName: 'li',
        template: _.template(template),

        initialize: function () {
            this.model.on('change', this.render, this);
        },

        render: function () {
            var $el = $(this.el);
            $el.html(this.template(this.model.attributes));
            return this;
        }

    });

    return ConnectionView;

});