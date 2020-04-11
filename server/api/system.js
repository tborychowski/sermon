const express = require('express');
const api = express.Router();
const systemData = require('../system');


async function get (req, res) {
	systemData().then(vals => {
		res.status(200).json(vals);
	});
}


api.route('/').get(get);
module.exports = api;
