const CarViewTemplate = 
  '<%= id %>: <span><%= year %></span>' + 
  '<button class="renewBtn">Renew</button>' + 
  '<button class="suspBtn">Suspend</button>' +
  '<button class="syncBtn">Details</button>' +
  '<button class="removeBtn">Remove</button>' +
  '<% if (year>2016) { %>' + 
    '<span>New Car</span>' +
  '<% } %>' + 
  '<div class="details"></div>';

module.exports = CarViewTemplate;