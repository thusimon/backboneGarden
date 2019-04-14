/*
const {JSDOM} = require("jsdom");

const markup = "<html><body></body></html>"; // Creates a default DOM.
const options = {}; // See: https://github.com/tmpvar/jsdom#how-it-works

global.document = new JSDOM(markup, options); // Creates a document object from Node.
global.window = global.document.defaultView; // Creates a window object from Node.

// Passes the window object into jQuery, so that it can create the .ajax() method:
const $ = require("jquery")(global.window) 

// This maps the dynamic .ajax method into Backbone:
const Backbone = require('Backbone');
Backbone.$.ajax = $.ajax; 
//Backbone.ajax = $.ajax;
*/
const Car = require('../../src/models/Car');

describe('Test Car model', () => {
    beforeEach(()=>{
        this.car = new Car({registrationNumber: "ABC123", color:"Blue"});
    })
    it('id is good', ()=>{
        expect(this.car.isValid()).toBe(true);
    });
    it('remove id, not good', ()=>{
        this.car.unset('registrationNumber');
        expect(this.car.isValid()).toBe(false);
        expect(this.car.validationError).toBe('missing ID');
    });
    it('start car',()=>{
        console.log = jest.fn();
        this.car.start();
        // The first argument of the first call to the function was 'hello'
        var carId = this.car.id;
        expect(console.log.mock.calls[0][0]).toBe(`Car with reg number ${carId} has started`);
    });
    /*
    it('fetch car', async (done) => {
        const result = await this.car.fetch({
            success: function(res){},
            error: function(err){}
        });
    })
    */
})