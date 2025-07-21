const express = require('express');
const Router = express.Router();
const {getAllProducts,getOneProduct,deleteProduct,createProduct,UpdateProduct} = require('../controllers/Products')

Router.get('/', getAllProducts)
Router.get('/:name',getOneProduct)
Router.post('/',createProduct)
Router.patch('/:name',UpdateProduct)
Router.delete('/:name',deleteProduct)

module.exports = Router;
