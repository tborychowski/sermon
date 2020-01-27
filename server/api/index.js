const express = require('express');
const api = express.Router();


api.get('/proc', require('./cpu'));
api.get('/mem', require('./mem'));

api.get('/', (req, res) => res.send('Hello from API!'));

module.exports = api;
