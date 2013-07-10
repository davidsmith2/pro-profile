define(['views/profiles/master', 'views/profiles/detail', 'lib/text!templates/profiles/list.html', 'config'], function (MasterView, DetailView, template, config) {

    var ListView = MasterView.extend({
        el: '#list',
        template: _.template(template),

        events: {
            'click a': 'open'
        },

        initialize: function (app, collection) {
            this.views = app.views;
            this.collection = collection;
        },

        _render: function (model) {
            this.$el.append(this.template(model.attributes));
            return this;
        },

        open: function () {
            this.views.detail = new DetailView();
            this.collection.fetch({
                data: {
                    id: config.id,
                    fields: '(id,first-name,last-name,headline,location,industry,summary)'
                },
                success: function (response) {
                    console.log(response);
                },
                error: function (response, error) {
                    console.log(error);
                }
            });
        }

    });

    return ListView;

});