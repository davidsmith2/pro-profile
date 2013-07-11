define([
    'config'
], 

function (config) {
    var Profile = Backbone.Model.extend({
        url: 'people/~',
        defaults: {
            id: 'Q4eR386d2y',
            firstName: 'Paul',
            lastName: 'Jones',
            headline: 'Salesperson',
            location: {
                country: 'us',
                name: 'Washington D.C. Metro Area'
            }
        },
        getData: function () {
            var self = this;
            this.fetch({
                data: {
                    fields: '(id,first-name,last-name,headline,location)'
                },
                success: function (model, response, options) {
                },
                error: function (model, response, options) {
                }
            });
        }
    });
    return Profile;
});
