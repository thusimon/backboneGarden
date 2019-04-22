const Backbone = require('backbone');
const $ = Backbone.$;
const HomeView = Backbone.View.extend({
    render: function() {
        const content = $('<div></div>');
        content.append($('<h1>Welcome to DMV</h1>'));
        this.$el.append(content);
        return this;
    }
});

module.exports = HomeView;