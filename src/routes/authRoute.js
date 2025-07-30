const express = require('express');
const Router = express.Router();
const {register,Login,logout} = require("../controllers/Auth")

Router.post("/signUp",register),
Router.post("/Login",Login)
Router.post("/logout",logout)

module.exports = Router