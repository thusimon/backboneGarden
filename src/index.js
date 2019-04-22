const Backbone = require('backbone');
const _ = require('underscore');
const Cars = require('./collections/carCollection');
const NavView = require('./views/NavView');
const AppRouter = require('./routers/AppRouter');
require('./style/styles.css');

var cars = new Cars([
    {registrationNumber: "AVC887", color:"Blue", year:2010},
    {registrationNumber: "T23442", color:"Black", year:2018},
    {registrationNumber: "XLI887", color:"Gray", year:2000}
]);

cars.add({registrationNumber: "ABC123", color:"Red", year:2004})

const eventBus = _.extend({}, Backbone.Events);

const options = {
    data: cars,
    eventBus
}

const appRouter = new AppRouter(options);
appRouter.navigate('home', {trigger: true});
Backbone.history.start();

const navView = new NavView({el: 'div#nav', router:appRouter});
navView.render();    