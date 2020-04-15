const express = require('express');
const api = express.Router();
const {readJsonFile} = require('../lib');

function getData (req, res) {
	const data = readJsonFile('data.json');
	res.status(200).json(data || {});
}

api.get('/data', getData);
api.get('/', (req, res) => res.send('Hello from API!'));

module.exports = api;
