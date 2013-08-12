define([
    'lib/text/text!templates/connections/item.html',
    'models/connection',
    'views/app'
],

function (template, Profile, AppView) {

    var ConnectionView = AppView.extend({

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
            $el.html(this.template(this.model.toJSON()));
            return this;
        },

        handleClick: function (e) {
            e.preventDefault();
            this.getProfile();
        },

        getProfile: function () {
            proProfile.router.showProfile(this.model.get('id'));
        }

    });

    return ConnectionView;

});