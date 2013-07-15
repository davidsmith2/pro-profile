define([
    'lib/text!templates/nav.html'
], 

function (template) {

    var NavView = Backbone.View.extend({

        el: '#nav-menu',
        tagName: 'ul',
        template: _.template(template),

        events: {
            'click #personal-profile': 'viewPersonalProfile',
            'click #connections': 'viewConnections'
        },

        initialize: function () {},

        render: function () {
            this.$el.html(this.template());
            return this;
        },

        viewPersonalProfile: function (event) {
            event.preventDefault();
            this.model = proProfile.models.personalProfile;
            this.model.fetch({
                data: {
                    model: this.model,
                    fields: '(id,first-name,last-name,headline,location,summary,positions,numConnections,pictureUrl)'
                },
                success: function (model, response, options) {
                    proProfile.models.personalProfile = model;
                    proProfile.router.navigate('!/people/~', { trigger: true });
                },
                error: function () {
                    console.log('error');
                }
            });
        },

        viewConnections: function (event) {
            var self = this;
            event.preventDefault();
            this.collection = proProfile.collections.connections;
            this.collection.fetch({
                data: {
                    collection: this.collection,
                    fields: '(id,first-name,last-name,headline,location)'
                },
                success: function (model, response, options) {
                    proProfile.collections.connections = self.collection;
                    proProfile.router.navigate('!/people', { trigger: true });
                },
                error: function () {
                    console.log('error');
                }
            });
        }

    });

    return NavView;

});