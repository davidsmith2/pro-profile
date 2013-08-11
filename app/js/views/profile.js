define([
    'config',
    'lib/mustache/mustache',
    'lib/text/text!templates/profile.html',
    'views/app'
],

function (config, mustache, template, AppView) {

    var ProfileView = AppView.extend({

        id: 'profile-view',

        initialize: function (options) {
            this.model = options.model;
        },

        render: function () {
            var html = mustache.render($(template).html(), this.model.attributes);
            this.$el.html(html);
            return this;
        }

    });

    return ProfileView;

});