const express = require('express');
const api = express.Router();
const {EOL} = require('os');
const {run} = require('../lib/util');
const s = `NAME="Ubuntu"
VERSION="19.10 (Eoan Ermine)"`;

const cpuData = require('./cpu');
const memData = require('./mem');


function parseInfo (str = s) {
	const res = {};
	str.split(EOL).forEach(l => {
		const [name, value] = l.split('=');
		if (name.includes('_URL')) return;
		res[name.toLowerCase()] = value.replace(/"/g, '');
	});
	return res.name + ' ' + res.version;
}

async function systemData () {
	return run('cat /etc/*release')
		.then(parseInfo)
		.catch(() => parseInfo());
}


async function get (req, res) {
	const cpu = await cpuData();
	const mem = await memData();
	const system = await systemData();
	res.status(200).json({ ...cpu, ...mem, system });
}


api.route('/').get(get);
module.exports = api;
