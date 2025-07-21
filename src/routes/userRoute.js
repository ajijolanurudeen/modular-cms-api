const express = require('express');
const Router = express.Router();
const {getAllUsers,getOneUser,updateUser} = require('../controllers/User')

Router.get('/', getAllUsers)
Router.get('/:name',getOneUser)
Router.patch('/:name',updateUser)

module.exports = Router;
