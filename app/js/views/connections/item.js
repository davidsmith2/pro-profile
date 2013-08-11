define([
    'lib/text/text!templates/connections/item.html',
    'views/app'
],

function (template, AppView) {

    var ConnectionItemView = AppView.extend({

        tagName: 'li',
        className: 'connection-item-view',
        template: _.template(template),

        events: {
            'click': 'handleClick'
        },

        initialize: function (options) {
            this.model = options.model;
        },

        render: function () {
            var $el = $(this.el);
            $el.html(this.template(this.model.attributes));
            return this;
        },

        handleClick: function (e) {
            e.preventDefault();
            this.getProfile();
        },

        getProfile: function () {
            var url = this.model.url + this.model.get('id');
            this.model.fetch({
                data: {
                    fields: '(id,first-name,last-name,headline,industry,location,summary,positions,numConnections,pictureUrl)',
                    url: url
                },
                success: function (model, response, options) {
                    proProfile.router.navigate('!/' + url);
                    proProfile.router.viewProfile(model);
                },
                error: function (model, response, options) {
                    console.log('error getting data');
                }
            });

        }

    });

    return ConnectionItemView;

});