const TodoViewTemplate = 
  '<label>' +
    '<input type="checkbox"' +
      '<% if (!!completed) { %>' +
        ' checked ' +
      '<% } %> </input>' +
    '<span><%= title %></span>' +
  '</label>' +
  '<button>Remove</button>';

module.exports = TodoViewTemplate;