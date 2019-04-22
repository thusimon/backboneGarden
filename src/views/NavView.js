const Backbone = require('backbone');
const $ = Backbone.$;

const NavView = Backbone.View.extend({
    initialize: function(options) {
        this.navData = ['Home', 'Cars', 'Control', 'Todo'];
        this.router = options.router;
    },
    events: {
        'click li': 'onNavClick'
    },

    onNavClick: function(e){
        const navName = $(e.target).attr('name');
        this.$el.find('li').removeClass('active');
        $(e.target).addClass('active');
        this.router.navigate(navName, {trigger: true});
    },

    render: function() {
        const ul = $('<ul></ul>');
        this.navData.forEach(function(name){
            const nameL = name.toLowerCase();
            const li = $(`<li name="${nameL}" data-url="${nameL}">${name}</li>`);
            ul.append(li);
        })
        ul.children('li').first().addClass('active');
        this.$el.append(ul);
        return this;
    }
});

module.exports = NavView;