const Backbone = require('backbone');
const $ = Backbone.$;

const AddWidget = Backbone.View.extend({
    initialize: function(options) {
        //options.collection: the collection you want to add to
        //options.params
        //this.collection = options.collection;
        this.params = options.params;
        this.eventBus = options.eventBus;
    },

    events: {
        'click .add-widget-addBtn': 'onClickAddBtn'
    },

    onClickAddBtn: function() {
        const modalRaw = {};
        const self = this;
        this.params.forEach(function(p){
            const pVal = self.$(`input[name="${p}"]`).val();
            modalRaw[p] = pVal;
        });
        //this.collection.add(modalRaw);
        this.eventBus.trigger('addModel', modalRaw);
    },

    render: function() {
        const container = $('<div class="add-widget-container"></div>');
        this.params.forEach(function(p) {
            const field = `<div>
                <label for='${p}'>${p}</label>
                <input class='add-widget-field' name='${p}' type='text'></input>
            </div>`;
            container.append(field);
        })
        const btnGroup = $(`<div><button class="add-widget-addBtn">Add</button></div>`);
        container.append(btnGroup);
        this.$el.append(container);
    }
});

module.exports = AddWidget;