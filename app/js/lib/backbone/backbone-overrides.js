(function () {

    // collections

    Backbone.Collection.prototype.parse = function (data) {
        if (_.isObject(data.values)) {
            return data.values;
        } else {
            return data;
        }
    };


    // views

    Backbone.View.prototype.close = function () {
        if (this.beforeClose) {
            this.beforeClose();
        }
        this.remove();
        this.unbind();
        if (this.onClose) {
            this.onClose();
        }
    };

}());