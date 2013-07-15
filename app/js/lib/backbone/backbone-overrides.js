(function () {

    Backbone.Collection.prototype.parse = function (data) {
        if (_.isObject(data.values)) {
            return data.values;
        } else {
            return data;
        }
    };

    Backbone.View.prototype.close = function () {
        this.remove();
        this.unbind();
        if (this.onClose) {
            this.onClose();
        }
    };

}());

