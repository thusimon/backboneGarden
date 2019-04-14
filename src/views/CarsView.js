const Backbone = require('backbone');
const $ = Backbone.$;
const Car = require('../models/Car');
const CarView = require('./CarView');

const CarsView = Backbone.View.extend({
    initialize: function(options){
        this.model.on('add', this.onCollectionAdd, this);
        this.model.on('remove', this.onCollectionRemove, this);
        this.ul = $('<ul></ul>')
        this.$el.append(this.ul);
        this.eventBus = options.eventBus;
        this.eventBus.on('addModel', this.onModelAdd, this);
    },

    onCollectionAdd: function(model){
        const carView = new CarView({model})
        this.ul.append(carView.render().$el);
    },

    onModelAdd: function(modalRaw){
        const car = new Car(modalRaw);
        const carView = new CarView({model: car});
        this.ul.append(carView.render().$el);
    },

    onCollectionRemove: function(model){
        const id = model.id;
        this.$(`li#${id}`).remove();
    },

    tagName: 'ul',
    render: function() {
        const self = this;
        this.model.each(function(car){
            const carView = new CarView({model: car})
            self.ul.append(carView.render().$el);
        })
    }
});

module.exports = CarsView;