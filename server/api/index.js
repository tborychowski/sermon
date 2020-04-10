const express = require('express');
const api = express.Router();

api.use('/system', require('./system'));
api.use('/services', require('./services'));
api.get('/', (req, res) => res.send('Hello from API!'));

module.exports = api;
