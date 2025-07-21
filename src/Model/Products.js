const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'please enter a product name']
    },
    category:{
        type: String,
        required: [true,'please enter the category of your product']
    },
    price:{
        type: Number,
        required: [true,'please enter the price of your product']
    },
    quantity:{
        type: Number,
        required: [true,'please enter the price of your product']
    }
})

const Product = mongoose.model('Product',productSchema)
module.exports = Product