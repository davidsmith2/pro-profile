define([
    'config'
], 

function (config) {
    var Profile = Backbone.Model.extend({
        url: 'people',
        defaults: {
            id: 'Q4eR386d2y',
            firstName: 'Paul',
            lastName: 'Jones',
            headline: 'Salesperson',
            location: {
                country: 'us',
                name: 'Washington D.C. Metro Area'
            },
            summary: 'Enthusiastic, driven salesperson with eight years of experience. Award-winning customer service and interpersonal skills.',
            positions: {
                values: [
                    {
                        title: 'Key Holder',
                        company: {
                            name: 'Montblanc'
                        },
                        startDate: {
                            month: 04,
                            year: 2009
                        },
                        endDate: null,
                        summary: 'Opened new specialty boutique. Place orders to restock merchandise and handled receiving of products. Manage payroll, scheduling, reports, email, inventory, and maintain clientele book and records. Integrated new register functions. Extensive work with visual standards and merchandising high-ticket items.'
                    }
                ]
            }
        },
        getData: function () {
            var self = this;
            this.fetch({
                data: {
                    id: config.id,
                    fields: '(id,first-name,last-name,headline,location,summary,positions)'
                },
                success: function (model, response, options) {
                },
                error: function (response, error) {
                    self.trigger('error');
                }
            });
        },
        handleSuccess: function () {
            this.trigger('ready');
        },
        handleError: function (error) {
            console.log(error.status);
            switch (error.status) {
                case 403:
                    this.trigger('403');
                break;

                case 404:
                break;
            }
        }
    });
    return Profile;
});
