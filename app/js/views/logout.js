define([
    'lib/mustache/mustache',
    'lib/text/text!templates/logout.html',
    'views/app'
],

function (mustache, template, AppView) {

    var LogoutView = AppView.extend({

        el: '#logout',

        events: {
            'click #logout-link': 'handleClick'
        },

        initialize: function (options) {
            this.model = options.model;
        },

        render: function () {
            var html = mustache.render($(template).html(), this.model.attributes);
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

    return LogoutView;

});