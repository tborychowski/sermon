const express = require('express');
const api = express.Router();
const {tcp, request, readJsonFile} = require('../lib');


function getConfig () {
	return readJsonFile('config.json').services;
}

function pingService (service) {
	return (service.type === 'tcp' ? tcp : request)(service.url)
		.then(res => {
			service.running = res.status == 200;
			service.statusText = res.statusText;
			service.duration = res.duration;
			return service;
		});
}


function healthcheck (req, res) {
	const service = getConfig().find(i => i.url === req.params.url);
	return pingService(service)
		.then(serv => res.status(200).json(serv));
}

function get (req, res) {
	if (req.params.url) healthcheck(req, res);
	else res.status(200).json(getConfig());
}


api.route('/:url*?').get(get);
module.exports = api;
