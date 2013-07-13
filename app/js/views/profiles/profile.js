define([
    'config',
    'lib/mustache',
    'lib/text!templates/profiles/profile.html'
], 

function (config, mustache, template) {

    var ProfileView = Backbone.View.extend({

        id: '#profile',
        tagName: 'div',

        initialize: function (options) {
            this.model = options.model;
            this.model.on('reset', this.reset, this);
        },

        render: function () {
            this.$el.html(mustache.render($(template).html(), this.model.attributes));
            return this;
        },

    });

    return ProfileView;

});