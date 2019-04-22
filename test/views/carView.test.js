const Car = require('../../src/models/Car');
const CarView = require('../../src/views/CarView');
const $ = require('backbone').$;

describe('CarView test', () => {
    beforeEach(() => {
        this.sandBox = $('<ul id="sandbox"></ul>');
        this.model = new Car({registrationNumber: 1, year: 2000, color:'black', details:'A very good used car'});
        this.view = new CarView({el:this.sandBox, model: this.model});
        this.view.render();
    });
    it('tagName should be li', () => {
        expect(this.view.tagName).toBe('li');
    });
    it('class name should be span-car', () => {
        expect(this.view.className).toBe('span-car');
    });
    it('attribute should have aria label', () => {
        expect(this.view.$el.attr('aria-label')).toBe('car');
    });
    it('button border is red when model year less than 2000', () => {
        this.model.set('year', 1990);
        expect(this.view.$el.children('.renewBtn').css('border-color')).toBe('red');
        expect(this.view.$el.children('.renewBtn').css('border-style')).toBe('solid');
        expect(this.view.$el.children('.renewBtn').css('border-width')).toBe('2px');
    });
    it('button border is black when model year greater equal than 2000', () => {
        this.model.set('year', 2001);
        expect(this.view.$el.children('.renewBtn').css('border-color')).toBe('black');
        expect(this.view.$el.children('.renewBtn').css('border-style')).toBe('solid');
        expect(this.view.$el.children('.renewBtn').css('border-width')).toBe('1px');
    });

    describe('when clicking delete', () => {
        it('should prompt confirmation', () => {
            window.confirm = jest.fn();
            this.view.$el.find('.removeBtn').click();
            expect(window.confirm).toHaveBeenCalledWith('Are you sure?');
        });
        it('should destory model if user confirms', () => {
            window.confirm = jest.fn(()=>true);
            this.model.destory = jest.fn();
            this.view.$el.find('.removeBtn').click(); 
            expect(this.model.destory).toHaveBeenCalled();
        });
    });
    describe('when clicking details', () => {
        it('should load the details if successful', () => {
            const self = this;
            this.model.fetch = jest.fn((options) => {
                self.model.set({details:"nice car"});
                options.success();
            });
            this.view.$el.find('.syncBtn').click();
            expect(this.view.$el.children('div.details').text()).toBe('nice car');
        })
    })
})