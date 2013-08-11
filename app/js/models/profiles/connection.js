define([
], 

function () {

    var ConnectionProfile = Backbone.Model.extend({

        url: 'people/id=',

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
            return (this.attributes.id === 'private');
        }

    });

    return ConnectionProfile;

});
