const express = require('express');
const api = express.Router();
const axios = require('axios');
const path = require('path');
const configPath = path.join(process.cwd(), 'config.json');
const config = require(configPath);
const TIMEOUT = 2000;

function pingService (service) {
	return new Promise(resolve => {
		const start = new Date();
		axios(service.url)
			.then(res => {
				service.running = res.status == 200;
				service.statusText = res.statusText;
				service.duration = (new Date()) - start;
				resolve(service);
			})
			.catch(e => {
				service.running = false;
				service.statusText = e.response && e.response.statusText || '';
				service.duration = (new Date()) - start;
				resolve(service);
			});
		// enforce timeout
		setTimeout(() => {
			service.running = false;
			service.statusText = 'Not found';
			service.duration = 0;
			resolve(service);
		}, TIMEOUT);
	});
}

//TODO: add TCP services
//https://riptutorial.com/node-js/example/22406/a-simple-tcp-client



function healthcheck (req, res) {
	return pingService({ url: req.params.url })
		.then(service => res.status(200).json(service));
}

function get (req, res) {
	if (req.params.url) {
		setTimeout(() => healthcheck(req, res), 1000);
	}
	else res.status(200).json(config.services);
}


api.route('/:url*?').get(get);
module.exports = api;
