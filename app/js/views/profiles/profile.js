define([
    'config',
    'lib/mustache',
    'lib/text!templates/profiles/profile.html'
], 

function (config, mustache, template) {

    var ProfileView = Backbone.View.extend({

        id: '#profile',
        tagName: 'div',
        template: _.template(template),

        initialize: function (options) {
            this.model = options.model;
            this.model.on('reset', this.reset, this);
        },

        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this;
        },

    });

    return ProfileView;

});