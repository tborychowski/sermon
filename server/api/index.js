const express = require('express');
const api = express.Router();


api.get('/proc', (req, res) => {
	res.json({ proc: '100%' });
});


api.get('/', (req, res) => res.send('Hello from API!'));

module.exports = api;
