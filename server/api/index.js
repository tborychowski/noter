const express = require('express');
const api = express.Router();


api.use('/notes', require('./notes'));


api.get('/', (req, res) => res.send('Hello from API!'));

module.exports = api;
