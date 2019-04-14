const Backbone = require('backbone');
const Car = require('../models/Car');

const Cars = Backbone.Collection.extend({
    model: Car
});

module.exports = Cars;