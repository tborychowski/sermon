const {logger} = require('./lib');
const {readJsonFile, writeJsonFile} = require('./lib');
const systemData = require('./system');
const pingService = require('./services');
const getServices = () => readJsonFile('config.json').services || [];



async function collect () {
	try {
		const system = await systemData();
		const services = await Promise.all(getServices().map(pingService));
		const updatedAt = new Date().toJSON();
		const data = {system, services, updatedAt};
		logger.debug('data collected');
		writeJsonFile('data.json', data);
	}
	catch (e) {
		logger.error('data collection error', e);
	}
}

module.exports = collect;
