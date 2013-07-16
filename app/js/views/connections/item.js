define([
    'lib/text/text!templates/connections/item.html'
], 

function (template) {

    var ConnectionItemView = Backbone.View.extend({

        tagName: 'li',
        template: _.template(template),

        events: {
            'click': 'getProfile'
        },

        initialize: function (options) {
            this.model = options.model;
        },

        render: function () {
            var $el = $(this.el);
            $el.html(this.template(this.model.attributes));
            return this;
        },

        getProfile: function (event) {
            event.preventDefault();
            var url = this.model.url + this.model.get('id');
            this.model.fetch({
                data: {
                    fields: '(id,first-name,last-name,headline,location,summary,positions,numConnections,pictureUrl)',
                    url: url,
                },
                success: function (model, response, options) {
                    proProfile.router.navigate('!/' + url);
                    proProfile.router.viewProfile(model);
                },
                error: function (model, response, options) {
                    console.log('error getting data');
                }
            })

        }

    });

    return ConnectionItemView;

});