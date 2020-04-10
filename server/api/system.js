const express = require('express');
const api = express.Router();

const cpuData = require('./cpu');
const memData = require('./mem');
const uptimeData = require('./uptime');
const tempData = require('./temp');
const loadData = require('./load');
const releaseData = require('./release');
const timeData = require('./time');


async function get (req, res) {
	const proms = [
		cpuData(),
		memData(),
		uptimeData(),
		releaseData(),
		tempData(),
		loadData(),
		timeData(),
	];
	Promise.all(proms).then(vals => {
		const [cpu, mem, uptime, system, temp, load, time] = vals;
		res.status(200).json({ cpu, ...mem, temp, uptime, load, system, time });
	});
}


api.route('/').get(get);
module.exports = api;
