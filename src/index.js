const Backbone = require('backbone');
const _ = require('underscore');
const Car = require('./models/Car');
const CarsView = require('./views/CarsView');
const AddWidget = require('./views/AddWidget');
require('./style/styles.css');

var Cars = Backbone.Collection.extend({
    model: Car
});

var cars = new Cars([
    {registrationNumber: "AVC887", color:"Blue", year:2010},
    {registrationNumber: "T23442", color:"Black", year:2018},
    {registrationNumber: "XLI887", color:"Gray", year:2000}
]);

cars.add({registrationNumber: "ABC123", color:"Red", year:2004})

const eventBus = _.extend({}, Backbone.Events);

const carsView = new CarsView({el: 'div#container', model: cars, eventBus});
carsView.render();
carsView.model.at(0).set('year', 1999);

const addWidget = new AddWidget({el: 'div#container', params:['registrationNumber', 'year', 'color'], eventBus});
addWidget.render();

