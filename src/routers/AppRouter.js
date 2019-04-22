const Backbone = require('backbone');
const $ = Backbone.$;
const HomeView = require('../views/HomeView');
const CarsView = require('../views/CarsView');
const AddWidget = require('../views/AddWidget');
const TodosView = require('../views/TodosView');
const DefaultView = require('../views/DefaultView');

const AppRouter = Backbone.Router.extend({
    initialize: function(options){
        this.data = options.data;
        this.eventBus = options.eventBus;
    },

    routes: {
        home: 'viewHome',
        cars: 'viewCars',
        'cars/:id': 'viewCarById',
        control: 'viewControl',
        todo: 'viewTodo',
        '*other': 'defaultRoute'
    },

    viewHome: function(e) {
        $('div#container').empty();
        const view = new HomeView({el: 'div#container'});
        return view.render();
    },

    viewCars: function(e){
        $('div#container').empty();
        const carsView = new CarsView({el: 'div#container', model: this.data, eventBus: this.eventBus});
        return carsView.render();
    },

    viewCarById: function(id){
        $('div#container').empty();
        const filter = {id:id};
        const carsView = new CarsView({el: 'div#container', model: this.data, eventBus: this.eventBus});
        this.eventBus.trigger('filter', filter);
        return carsView.render();
    },

    viewControl: function() {
        $('div#container').empty();
        const addWidget = new AddWidget({el: 'div#container', params:['registrationNumber', 'year', 'color'], 
            eventBus: this.eventBus});
        return addWidget.render();
    },

    viewTodo: function() {
        $('div#container').empty();
        const todosView = new TodosView({el: 'div#container', eventBus: this.eventBus});
        return todosView.render();
    },
    defaultRoute: function(e) {
        $('div#container').empty();
        const view = new DefaultView({el: 'div#container'});
        return view.render();
    }
});

module.exports = AppRouter;