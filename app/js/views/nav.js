define([
    'lib/text/text!templates/nav.html'
], 

function (template) {

    var NavView = Backbone.View.extend({

        el: '#nav-menu',
        tagName: 'ul',
        template: _.template(template),

        events: {
            'click #my-profile': 'getMyProfile',
            'click #connections': 'getConnections'
        },

        initialize: function (options) {
            this.app = options.app;
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        },

        getMyProfile: function () {
            var model, url;
            model = this.app.models.personalProfile;
            url = model.url;
            model.fetch({
                data: {
                    fields: '(id,first-name,last-name,headline,location,summary,positions,numConnections,pictureUrl)',
                    url: url,
                },
                success: function (model, response, options) {
                    proProfile.router.viewProfile(model);
                    proProfile.router.navigate('!/' + url);
                },
                error: function (model, response, options) {
                    console.log(response);
                }
            });
            return false;
        },

        getConnections: function () {
            var collection, self = this;
            collection = this.app.collections.connections;
            collection.fetch({
                data: {
                    fields: '(id,first-name,last-name,headline,location)',
                    url: collection.url
                },
                success: function (collection, response, options) {
                    self.app.router.viewConnections();
                    self.app.router.navigate('!/people');
                },
                error: function (collection, response, options) {
                    console.log(response);
                }
            });
            return false;
        }

    });

    return NavView;

});