const {logger} = require('./lib');
const {readJsonFile, writeJsonFile} = require('./lib');
const systemData = require('./system');
const pingService = require('./services');
const notifier = require('./notifier');
const getServices = () => readJsonFile('config.json').services || [];



async function collect () {
	try {
		const services = await Promise.all(getServices().map(pingService));
		const system = await systemData();
		const updatedAt = new Date().toJSON();
		const data = {system, services, updatedAt};
		logger.debug('data collected');
		notifier(data);
		writeJsonFile('data.json', data);
	}
	catch (e) {
		logger.error('data collection error ');
		console.log(e);
	}
}

module.exports = collect;
// collect();
