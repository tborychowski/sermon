const express = require('express');
const api = express.Router();
const services = require('./services');
const cpuData = require('./cpu');
const memData = require('./mem');
const systemData = require('./system');


api.get('/system', async (req, res) => {
	const cpu = await cpuData();
	const mem = await memData();
	const system = await systemData();
	res.json({ ...cpu, ...mem, system });
});

api.get('/services', (req, res) => {
	services().then(info => res.json(info));
});

api.get('/', (req, res) => res.send('Hello from API!'));

module.exports = api;
