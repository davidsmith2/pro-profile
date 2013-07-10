define([
    'views/profiles/master', 
    'views/profiles/detail', 
    'lib/text!templates/profiles/list.html', 
    'lib/mustache',
    'config',
], 

function (MasterView, DetailView, template, mustache, config) {

    var ListView = MasterView.extend({
        el: '#list',

        events: {
            'click a': 'open'
        },

        initialize: function (app, collection) {
            this.views = app.views;
            this.collection = collection;
        },

        _render: function (model) {
            this.$el.append(mustache.render($(template).html(), model.attributes));
            $('.view').hide();
            $('#list').show();
            return this;
        },

        open: function () {
            var self = this;
            this.views.detail = new DetailView(this.views, this.collection);
            this.collection.fetch({
                data: {
                    id: config.id,
                    fields: '(id,first-name,last-name,headline,location,summary,positions)'
                },
                success: function (response) {
                    self.views.detail.render();
                },
                error: function (response, error) {
                    console.log(error);
                }
            });
            return false;
        }

    });

    return ListView;

});