define([
    'lib/text/text!templates/connections/item.html'
], 

function (template) {

    var ConnectionView = Backbone.View.extend({

        tagName: 'li',
        template: _.template(template),

        events: {
            'click': 'getConnectionProfile'
        },

        initialize: function () {
            this.model.on('success', this.viewConnectionProfile, this);
        },

        render: function () {
            var $el = $(this.el);
            $el.html(this.template(this.model.attributes));
            return this;
        },

        getConnectionProfile: function (event) {
            event.preventDefault();
            var url = (this.model.url + this.model.get('id'));
            this.model.set('url', url);
            this.model.update();
            this.model.destroy();
        },

        viewConnectionProfile: function () {
            var url = '!/' + this.model.get('url');
            proProfile.router.navigate(url, { trigger: false });
            proProfile.router.viewConnectionProfile(this.model);
        }

    });

    return ConnectionView;

});