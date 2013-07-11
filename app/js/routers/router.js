define([
    'views/profiles/profile'
], 

function (ProfileView) {

    var Router = Backbone.Router.extend({

        routes: {
            'sign-in': 'signIn',
            'sign-out': 'signOut'
        },

        currentView: null,

        initialize: function (options) {
            this.app = options.app;
            this.el = options.el;
            this.profileView = new ProfileView({ app: this.app });
            console.log(this);
        },

        signIn: function () {
            console.log('signing in');
            this.switchView(this.profileView);
        },

        signOut: function () {
            console.log('signing out');
        },

        switchView: function (view) {
            if (this.currentView) {
                this.currentView.remove();
            }
            this.el.html(view.el);
            view.render();
            this.currentView = view;
        }

    });

    return Router;
    
});