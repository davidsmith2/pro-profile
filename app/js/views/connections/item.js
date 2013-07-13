define([
    'lib/text!templates/connections/item.html'
], 

function (template) {

    var ConnectionView = Backbone.View.extend({

        tagName: 'li',
        template: _.template(template),

        events: {
            'click': 'viewProfile'
        },

        initialize: function () {},

        render: function () {
            var $el = $(this.el);
            $el.html(this.template(this.model.attributes));
            return this;
        },

        viewProfile: function (event) {
            event.preventDefault();
            var url, self = this;
            url = this.model.url + this.model.get('id');
            this.model.set('url', url);
            this.model.fetch({
                data: {
                    model: this.model,
                    url: this.model.get('url', url),
                    fields: '(id,first-name,last-name,headline,location,summary,positions,numConnections,pictureUrl)'
                },
                success: function (model, response, options) {
                    proProfile.models.connectionProfile = model;
                    proProfile.router.navigate('!/' + url, { trigger: true });
                },
                error: function () {
                    console.log('error');
                }
            });

        }

    });

    return ConnectionView;

});