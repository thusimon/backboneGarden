const TodoViewTemplate = '<input type="checkbox"' +
    '<% if (!!completed) { %>' +
    ' checked ' +
    '<% } %> </input>' + 
    '<span><%= title %></span><button>Remove</button>';

module.exports = TodoViewTemplate;