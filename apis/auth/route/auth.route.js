const express = require('express');
const { signin, signup } = require('../controller/auth.controller');

const Router = express.Router();

Router.post('/signin', signin);

Router.post('/signup', signup);

module.exports = Router;