const Backbone = require('backbone');
const Todo = require('../models/Todo');

const TodoCollection = Backbone.Collection.extend({
    url: 'https://jsonplaceholder.typicode.com/todos',
    model: Todo
});

module.exports = TodoCollection;