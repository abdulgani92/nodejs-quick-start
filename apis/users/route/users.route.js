const express = require('express');
const { getUser, listUsers, createUser, updateUser, deleteUser } = require('../controller/users.controler');

const Router = express.Router();

Router.post('/user', createUser);
Router.get('/user/:_id', getUser);
Router.patch('/user/:_id', updateUser);
Router.delete('/user/:_id', deleteUser);
Router.get('/users', listUsers);

module.exports = Router;