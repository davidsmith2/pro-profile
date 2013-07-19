define([
],

function () {

    var Session = Backbone.Model.extend({

        auth: {
            member_id: null,
            oauth_token: null
        },

        initialize: function () {
            this.load();
        },

        load: function () {
            this.auth.member_id = $.cookie('member_id');
            this.auth.oauth_token = $.cookie('oauth_token');
        },

        isAuthenticated: function () {
            return (
                (typeof $.cookie('member_id') !== 'undefined') &&
                (typeof $.cookie('oauth_token') !== 'undefined')
            );
        },

        save: function () {
            $.cookie('member_id', IN.ENV.auth['member_id']);
            $.cookie('oauth_token', IN.ENV.auth['oauth_token']);
        },

        unsave: function () {
            $.removeCookie('member_id');
            $.removeCookie('oauth_token');
        }

    });

    return Session;

});