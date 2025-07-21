const mongoose = require('mongoose')
const User = require('./User')
const orderSchema = mongoose.Schema({
    User:{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'please enter a product '],
        ref: User,
    },
    product:{
        type: String,
        required: [true,'please enter your product']
    },
    price:{
        type: Number,
        required: [true,'please enter the price of your product']
    },
    quantity:{
        type: Number,
        required: [true,'please enter the price of your product']
    },
    orderDate:{
        type: String
    }
})

const Orders = mongoose.model('Orders',orderSchema)
module.exports = Orders