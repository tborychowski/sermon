const express = require('express');
const api = express.Router();


api.get('/system', require('./system'));
api.get('/services', require('./services'));

api.get('/', (req, res) => res.send('Hello from API!'));

module.exports = api;
