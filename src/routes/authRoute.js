const express = require('express');
const Router = express.Router();
const {register} = require("../controllers/Auth")

Router.post("/signUp",register)

module.exports = Router