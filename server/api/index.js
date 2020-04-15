const express = require('express');
const api = express.Router();
const {readJsonFile} = require('../lib');
const systemData = require('../system');
const pingService = require('../services');
const {services} = readJsonFile('config.json');

function getSystem (req, res) {
	systemData().then(vals => res.status(200).json(vals));
}

function getAllServices (req, res) {
	res.status(200).json(services);
}

function getService (req, res) {
	const service = services.find(i => i.url === req.params.url);
	return pingService(service).then(serv => res.status(200).json(serv));
}

api.get('/system', getSystem);
api.get('/services', getAllServices);
api.get('/services/:url', getService);
api.get('/', (req, res) => res.send('Hello from API!'));

module.exports = api;
