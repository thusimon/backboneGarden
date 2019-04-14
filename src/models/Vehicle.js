const Backbone = require('backbone');

const Vehicle = Backbone.Model.extend({
    idAttribute: "registrationNumber",
    urlRoot:"/api/vehicles",
    start: function(){
        console.log(`${this.id} has started`);
    },
    validate:function(){
        if(!this.id){
            return "missing ID";
        }
    }
});

module.exports = Vehicle;
