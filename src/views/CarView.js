const Backbone = require('backbone');
const _ = require('underscore');
const CarViewTemplate = require('../templates/CarViewTemplate');

const CarView = Backbone.View.extend({
    initialize: function() {
        this.model.on('change', this.modelChangeHandler, this);
    },

    modelChangeHandler: function(){
        const carYear = this.model.get('year');
        if (carYear < 2000) {
            this.$el.children('button.renewBtn').css('border','2px red solid');
        } else {
            this.$el.children('button.renewBtn').css('border','1px black solid');
        }
        this.$el.children('span').text(carYear);
    },

    events: {
        'click .renewBtn': 'onClickRenew',
        'click .suspBtn': 'onClickSuspend',
        'click .syncBtn': 'onClickSync', 
        'click .removeBtn': 'onClickRemove'
    },

    onClickRenew: function(e){
        this.$el.removeClass('carSuspend');
        this.$el.addClass('carRenew');
    },
    onClickSuspend: function(e){
        this.$el.removeClass('carRenew');
        this.$el.addClass('carSuspend');
    },

    onClickSync: function(e) {
        const self = this;
        this.model.fetch({
            success: function(){
                self.$el.children('div.details').text(self.model.get('details'));
            },
            error: function(e){
                self.$el.children('div.details').text("error: " + e.toString());
            }
        });
    },

    onClickRemove: function(e) {
        if (confirm('Are you sure?')){
            if (this.model.collection){
                this.model.collection.remove(this.model);
            } else {
                this.$el.remove();
            }
            this.model.destory();
        }
    },

    tagName: 'li',
    className: 'span-car',
    attributes: {
        'aria-label': 'car'
    },
    render: function() {
        const modelData = this.model.toJSON();
        modelData.id = this.model.id;
        const template = _.template(CarViewTemplate);
        const htmlContent = template(modelData);
        this.$el.html(htmlContent);
        this.$el.attr('id', this.model.id);
        this.$el.attr('aria-label', 'car');
        return this;
    }
});

module.exports = CarView;