const Backbone = require('backbone');

const Todo = Backbone.Model.extend({
    defaults: {
        title: "",
        completed: false
    },
    urlRoot: 'https://jsonplaceholder.typicode.com/todos',
    validate: function(attributes){
        if (!attributes || !attributes.title){
            return 'missing title attribute';
        }
    }
});

module.exports = Todo;