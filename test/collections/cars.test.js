const Cars = require('../../src/collections/carCollection');
const Car = require('../../src/models/Car');

describe('car collection test', () => {
    beforeEach(()=>{
        this.cars = new Cars([
            {registrationNumber: 1, brand:"Ford", year:2000, mpg:18},
            {registrationNumber: 2, brand:"Ford", year:2017, mpg:30},
            {registrationNumber: 3, brand:"Toyota", year: 2010, mpg:32}
        ]);
    })
    it('initialize 3 cars', () => {
        expect(this.cars.length).toBe(3);
    });
    it('can add car', () => {
        this.cars.add({registrationNumber: 4, brand:"Toyota"});
        expect(this.cars.length).toBe(4);
        expect(this.cars.get(4).id).toBe(4);
    });
    it('can add car at position', () => {
        this.cars.add({registrationNumber:5, brand:'Honda'}, {at:1});
        expect(this.cars.length).toBe(4);
        expect(this.cars.at(1).id).toBe(5);
    })
    it('can remove car', () => {
        const secondCar = this.cars.at(1);
        this.cars.remove(secondCar);
        expect(this.cars.length).toBe(2);
        expect(this.cars.get(2)).toBeUndefined();
    });
    it('can find two Ford cars', () => {
        expect(this.cars.where({brand:"Ford"}).length).toBe(2)
    });
    it('can find the first Ford car', () => {
        expect(this.cars.findWhere({brand:'Ford'}).id).toBe(1);
    });
    it('can filter the cars', () => {
        expect(this.cars.filter(car => car.get('year')>2000).length).toBe(2);
    });
    it('calculate sum mpg', () => {
        let mpgSum = 0;
        this.cars.each(car => mpgSum += car.get('mpg'));
        expect(mpgSum).toBe(18+30+32);
    })
})