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