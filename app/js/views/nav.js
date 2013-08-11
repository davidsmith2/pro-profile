define([
    'lib/text/text!templates/nav.html',
    'views/app'
],

function (template, AppView) {

    var NavView = AppView.extend({

        tagName: 'ul',
        id: 'nav-view',
        template: _.template(template),

        events: {
            'click #connections': 'handleGetConnections',
            'click #profile': 'handleGetProfile'
        },

        initialize: function () {},

        render: function () {
            this.$el.html(this.template());
            return this;
        },

        handleGetConnections: function (e) {
            e.preventDefault();
            this.getConnections();
        },

        handleGetProfile: function (e) {
            e.preventDefault();
            this.getProfile();
        },

        getConnections: function () {
            proProfile.router.showConnections();
        },

        getProfile: function () {
            proProfile.router.showProfile();
        }

    });

    return NavView;

});