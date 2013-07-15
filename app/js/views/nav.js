define([
    'lib/text/text!templates/nav.html'
], 

function (template) {

    var NavView = Backbone.View.extend({

        el: '#nav-menu',
        tagName: 'ul',
        template: _.template(template),

        events: {
            'click #personal-profile': 'getPersonalProfile',
            'click #connections': 'getConnections'
        },

        initialize: function (options) {
            this.app = options.app;
            this.app.models.personalProfile.on('success', this.viewPersonalProfile, this);
            this.app.collections.connections.on('success', this.viewConnections, this);
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        },

        getPersonalProfile: function (event) {
            event.preventDefault();
            this.app.models.personalProfile.update();
        },

        getConnections: function (event) {
            event.preventDefault();
            this.app.collections.connections.update()
        },

        viewPersonalProfile: function () {
            this.app.router.navigate('!/people/~', { trigger: true });

        },

        viewConnections: function () {
            this.app.router.navigate('!/people', { trigger: true });
        }

    });

    return NavView;

});