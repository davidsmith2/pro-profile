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
        },

        update: function () {
            var self = this;
            this.fetch({
                data: {
                    fields: '(id,first-name,last-name,headline,location,summary,positions,numConnections,pictureUrl)',
                    model: this,
                    url: this.get('url')
                },
                success: function (model, response, options) {
                    self.trigger('success');
                },
                error: function (model, response, options) {
                    self.trigger('error');
                }
            });
        }

    });

    return ConnectionProfile;

});
