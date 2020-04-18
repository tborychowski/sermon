const {logger} = require('./lib');
const {readJsonFile, writeJsonFile} = require('./lib');
const systemData = require('./system');
const pingService = require('./services');
const alerter = require('./alerter');
const getServices = () => readJsonFile('config.json').services || [];



async function collect () {
	try {
		const services = await Promise.all(getServices().map(pingService));
		const system = await systemData();
		const updatedAt = new Date().toJSON();
		const data = {system, services, updatedAt};
		logger.debug('data collected');
		alerter(data);
		writeJsonFile('data.json', data);
	}
	catch (e) {
		logger.error('data collection error', e);
	}
}

module.exports = collect;
// collect();
