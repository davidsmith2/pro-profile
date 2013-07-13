define([
    'lib/text!templates/profiles/connection.html'
], 

function (template) {

    var ConnectionView = Backbone.View.extend({

        className: 'connection',
        tagName: 'li',
        template: _.template(template),

        events: {
            'click .connection': 'viewProfile'
        },

        initialize: function () {
            //this.model.on('reset', this.render, this);
        },

        render: function () {
            var $el = $(this.el);
            $el.html(this.template(this.model.attributes));
            return this;
        },

        viewProfile: function (event) {
            event.preventDefault();
            var id, url, self = this;
            id = this.model.get('id');
            url = this.model.url.slice(0, this.model.url.length - 1);
            url = url + 'id=' + id;
            this.model.set('url', url);
            this.model.fetch({
                data: {
                    model: this.model,
                    url: this.model.get('url', url)
                },
                success: function (model, response, options) {
                    proProfile.models.profile = model;
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