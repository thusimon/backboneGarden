const Backbone = require('backbone');
const TodoViewTemplate = require('../templates/TodoViewTemplate');
const _ = require('underscore');

const TodoView = Backbone.View.extend({
    tagName:'li',
    initialize: function(options){
        if (!options || !options.model){
            throw Error('missing model');
        }
        this.model.on('change', this.onModelChange, this);
    },

    events: {
        'click input[type="checkbox"]': 'changeComplete',
        'click button': 'clickRemoveBtn'
    },

    onModelChange: function(model) {
        const id = this.model.id;
        this.$el.attr('id', id);
        const completed = this.model.get('completed');
        this.toggleCompleted(completed);
    },

    changeComplete: function(evt){
        const completed = evt.target.checked;
        this.model.set('completed', completed);
        this.model.save();
        this.toggleCompleted(completed);
    },

    clickRemoveBtn: function(evt){
        this.model.destroy();
    },

    toggleCompleted: function(completed){
        this.$el.toggleClass('completed', completed);
    },

    render: function(){
        const template = _.template(TodoViewTemplate);
        const htmlContent = template(this.model.toJSON());
        const completed = this.model.get('completed');
        const id = this.model.id;
        this.$el.html(htmlContent);
        this.toggleCompleted(completed);
        this.$el.attr('id', id);
        return this;
    }
});

module.exports = TodoView;