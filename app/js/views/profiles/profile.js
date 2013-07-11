define([
    'config',
    'lib/mustache',
    'lib/text!templates/profiles/profile.html'
], 

function (config, mustache, template) {

    var ProfileView = Backbone.View.extend({

        el: '#profile-area',

        initialize: function (options) {
            this.app = options.app;
        },

        render: function () {
            var data, html;
            template = $(template).html();
            data = this.app.models.profile.attributes;
            html = mustache.render(template, data);
            this.$el.html(html);
            return this;
        }
        
    });

    return ProfileView;

});