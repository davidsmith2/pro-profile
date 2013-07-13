define([
], 

function () {

    var Profile = Backbone.Model.extend({
        url: 'people/~',
        defaults: {
            id: '',
            firstName: '',
            lastName: '',
            headline: '',
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
        }
    });

    return Profile;

});
