const mongoose = require('mongoose')
const User = require('./User')
const Product = require('./Products')
const orderSchema = mongoose.Schema({
    User:{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'please enter a product '],
        ref: 'User',
    },
    orderItems:[{
        product:{
            type: mongoose.Schema.Types.ObjectId,
            required: [true,'please enter your product'],
            ref: 'Product'
        },

            name: String,
            quantity: Number,
            price: Number
        }],
        shippingAddress: {
            street: String,
            city: String,
            postalCode: String,
            country: String
        },
        paymentMethod: String,
        totalPrice: Number,
        isPaid: {
            type: Boolean,
            default: false
        },
        paidAt: Date,
        isDelivered: {
            type: Boolean,
            default: false
        },
        deliveredAt: Date
    }, { timestamps: true });
    


const Orders = mongoose.model('Orders',orderSchema)
module.exports = Orders