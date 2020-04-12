const express = require('express');
const api = express.Router();
const {tcp, request, readJsonFile} = require('../lib');


function getConfig () {
	return readJsonFile('config.json').services;
}

function getUrl (url) {
	let _url;
	try { _url = new URL(url); }
	catch { _url = {}; }
	return _url;
}

function pingService (service) {
	const url = getUrl(service.url);
	let fn = request;

	if (url.protocol === 'tcp:') {
		fn = tcp;
		service.url = service.url.replace(/^tcp:\/\//ig, '');
	}

	return fn(service.url)
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
