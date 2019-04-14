const Vehicle = require('./Vehicle');

const Car = Vehicle.extend({
    urlRoot:"http://localhost:5000/api/cars",
    start: function(){
        console.log(`Car with reg number ${this.id} has started`);
    },
    save: function(data, callbacks){

    }
});

module.exports = Car;