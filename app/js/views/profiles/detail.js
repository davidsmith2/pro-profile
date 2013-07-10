define([
    'views/profiles/master', 
    'lib/text!templates/profiles/detail.html',
    'lib/mustache'
], 

function (MasterView, template, mustache) {

    var DetailView = MasterView.extend({

        el: '#detail',

        events: {
            'click a': 'open'
        },

        initialize: function (views, collection) {
            this.views = views;
            this.collection = collection;
        },

        _render: function (model) {

            console.log(model);
            
            this.$el.append(mustache.render($(template).html(), model.attributes));
            $('.view').hide();
            $('#detail').show();
            return this;
        }

    });

    return DetailView;

});