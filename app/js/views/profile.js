define([
    'config',
    'lib/mustache/mustache',
    'lib/text/text!templates/profile.html'
], 

function (config, mustache, template) {

    var ProfileView = Backbone.View.extend({

        id: '#profile',
        tagName: 'div',

        initialize: function (options) {
            this.model = options.model;
        },

        render: function () {
            this.$el.html(mustache.render($(template).html(), this.model.attributes));
            return this;
        },

    });

    return ProfileView;

});