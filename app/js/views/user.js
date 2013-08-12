define([
    'lib/mustache/mustache',
    'lib/text/text!templates/user.html',
    'views/app'
],

function (mustache, template, AppView) {

    var UserView = AppView.extend({

        id: 'user-view',

        events: {
            'click #logout-link': 'handleClick'
        },

        initialize: function (options) {
            this.model = options.model;
        },

        render: function () {
            var html = mustache.render($(template).html(), this.model.toJSON());
            this.$el.html(html);
            return this;
        },

        handleClick: function (e) {
            e.preventDefault();
            this.logout();
        },

        logout: function () {
            proProfile.apiManager.logout();
        }

    });

    return UserView;

});