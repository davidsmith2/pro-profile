define([
],

function () {

    var User = Backbone.Model.extend({

        url: 'people/~',
        fields: '(id,first-name,last-name,headline,industry,location,summary,positions,numConnections,pictureUrl)',
        defaults: {
            id: '',
            firstName: '',
            lastName: '',
            headline: '',
            industry: '',
            location: {
                country: '',
                name: ''
            },
            summary: '',
            positions: {
                values: [
                    {
                        title: '',
                        company: {
                            name: ''
                        },
                        startDate: {
                            month: 0,
                            year: 0
                        },
                        endDate: null,
                        summary: ''
                    }
                ]
            }
        },

        isPrivate: function () {
            return this.get('id') === 'private';
        }

    });

    return User;

});