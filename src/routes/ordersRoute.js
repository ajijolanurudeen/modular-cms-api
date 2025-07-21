const express = require('express');
const Router = express.Router();
const {getAllOrders,getOneOrder,deleteOrder,createOrder,UpdateOrder} = require('../controllers/Orders')

Router.get('/', getAllOrders)
Router.get('/:_id',getOneOrder)
Router.post('/',createOrder)
Router.patch('/:_id',UpdateOrder)
Router.delete('/:_id',deleteOrder)

module.exports = Router;
