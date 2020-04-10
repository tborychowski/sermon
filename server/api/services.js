const fs = require('fs-extra');
const express = require('express');
const api = express.Router();
const path = require('path');
const configPath = path.join(process.cwd(), 'config.json');
const {tcp, request} = require('../lib/request');
let config;

function getConfig () {
	config = config || fs.readJsonSync(configPath);
	return config.services;
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
