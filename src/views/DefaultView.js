const Backbone = require('backbone');
const $ = Backbone.$;
const DefaultView = Backbone.View.extend({
    render: function() {
        const content = $('<div></div>');
        content.append($('<h1>404: the page does not exist</h1>'));
        this.$el.append(content);
        return this;
    }
});

module.exports = DefaultView;