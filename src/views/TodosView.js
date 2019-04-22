const Backbone = require('backbone');
const $ = Backbone.$;
const Todo = require('../models/Todo');
const TodoView = require('./TodoView');
const TodoCollection = require('../collections/TodoCollection');
const TodosView = Backbone.View.extend({
    initialize: function(options){
        this.model = new TodoCollection();
        this.model.on('add', this.onCollectionAdd, this);
        this.model.on('remove', this.onCollectionRemove, this);
        this.model.fetch();
    },

    events: {
        'click button#addTodoBtn': 'onClickAddTodo'
    },

    onClickAddTodo: function(){
        const $titleInput = this.$el.find('input#addTodoInput');
        const newModel = new Todo({title: $titleInput.val()});
        this.model.create(newModel, {
            success: function(model){
                $titleInput.val('');
            }
        });
    },
    onCollectionAdd: function(todo){
        const todoView = new TodoView({model: todo});
        this.$el.children('ul').append(todoView.render().$el);
    },

    onCollectionRemove: function(todo) {
        const id = todo.id;
        this.$el.find(`li#${id}`).remove();
    },
    render: function() {
        const $control = $('<div><input id="addTodoInput" type="text" autofocus /><button id="addTodoBtn">Add</button></div>');
        const $ul = $('<ul id="todoList"></ul>');
        this.model.forEach((todo) => {
            const todoView = new TodoView({model: todo});
            $ul.append(todoView.render());
        });
        this.$el.append($control);
        this.$el.append($ul);
        return this;
    }
});

module.exports = TodosView;