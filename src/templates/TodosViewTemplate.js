const TodosViewTemplate = 
  '<div id="todoView">' +
    '<header id="todoControl">' +
        '<input id="addTodoInput" type="text" placeholder="What\'s the next todo?" autofocus />' +
        '<button id="addTodoBtn">Add</button>' +
    '</header>' +
    '<ul id="todoList"></ul>' +
  '</div>';

module.exports = TodosViewTemplate;