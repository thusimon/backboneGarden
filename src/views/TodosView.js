const Backbone = require('backbone');
const _ = require('underscore');
const $ = Backbone.$;
const Todo = require('../models/Todo');
const TodoView = require('./TodoView');
const TodoCollection = require('../collections/TodoCollection');
const TodosViewTemplate = require('../templates/TodosViewTemplate');
const TodosView = Backbone.View.extend({
    initialize: function(options){
        this.model = new TodoCollection();
        this.model.on('add', this.onCollectionAdd, this);
        this.model.on('remove', this.onCollectionRemove, this);
        this.model.fetch();
    },

    events: {
        'click button#addTodoBtn': 'onClickAddTodo',
        'keyup input#addTodoInput': 'onKeyupAddTodo',
    },

    _addTodo: function() {
        const $titleInput = this.$el.find('input#addTodoInput');
        const newModel = new Todo({title: $titleInput.val()});
        this.model.create(newModel, {
            success: function(model){
                $titleInput.val('');
            }
        });
    },

    onClickAddTodo: function(){
        this._addTodo();
    },

    onKeyupAddTodo: function(e) {
        if(e.keyCode === 13){
            this._addTodo();
        }
    },

    onCollectionAdd: function(todo){
        const todoView = new TodoView({model: todo});
        this.$el.find('ul').append(todoView.render().$el);
    },

    onCollectionRemove: function(todo) {
        const id = todo.id;
        this.$el.find(`li#${id}`).remove();
    },
    render: function() {
        const htmlTemplate = _.template(TodosViewTemplate);
        this.$el.append(htmlTemplate);
        return this;
    }
});

module.exports = TodosView;