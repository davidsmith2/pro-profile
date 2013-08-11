define([
    'views/app',
    'lib/text/text!templates/nav.html'
],

function (AppView, template) {

    var NavView = AppView.extend({

        id: 'nav-menu',
        tagName: 'ul',
        template: _.template(template),

        events: {
            'click #connections': 'handleGetConnections',
            'click #personal-profile': 'handleGetPersonalProfile'
        },

        initialize: function (options) {
            this.app = options.app;
        },

        render: function () {
            var html = this.$el.html(this.template());
            $('#nav').html(html);
            return this;
        },

        handleGetConnections: function (e) {
            e.preventDefault();
            this.getConnections();
        },

        handleGetPersonalProfile: function (e) {
            e.preventDefault();
            this.getPersonalProfile();
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
                    self.app.router.navigate('!/' + collection.url);
                    self.app.router.viewConnections(collection);
                },
                error: function (collection, response, options) {
                    console.log('error');
                }
            });
        },

        getPersonalProfile: function () {
            var model, url, self = this;
            model = this.app.models.personalProfile;
            url = model.url;
            model.fetch({
                data: {
                    fields: '(id,first-name,last-name,headline,industry,location,summary,positions,numConnections,pictureUrl)',
                    url: url
                },
                success: function (model, response, options) {
                    self.app.router.navigate('!/' + url);
                    self.app.router.viewProfile(model);
                },
                error: function (model, response, options) {
                    console.log('error');
                }
            });
        }

    });

    return NavView;

});