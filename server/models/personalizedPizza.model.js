const mongoose = require('mongoose');

const PersonalizedPizzaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    size: {
        type: String,
        enum: ['large', 'medium', 'small'],
        required: true
    },
    crust: {
        type: String,
        enum: ['thinCrust', 'thickCrust'],
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    toppings: [{
        type: String,
        enum: [
            'pepperoni', 
            'proshute', 
            'ananas', 
            'chilli', 
            'sausage', 
            'kale', 
            'parmigiano', 
            'mozzarella', 
            'borzilok', 
            'vaj ulliri', 
            'kripe', 
            'kerpudha', 
            'parmesan', 
            'qepe', 
            'ullinj', 
            'salcDomate', 
            'hudher',
        ]
    }],
    price: {
        type: Number,
     
    },
    status: {
        type: String,
        enum: ['waiting', 'cooking', 'coming'],
        default: 'waiting'
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
}, { timestamps: true });

module.exports = mongoose.model('PersonalizedPizza', PersonalizedPizzaSchema);
