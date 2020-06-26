const {logger} = require('./lib');
const disksData = require('./disks');
const {readJsonFile, writeJsonFile} = require('./lib');
const notifier = require('./notifier');
const getSystemData = require('./system');
const pingService = require('./services');
const getConfig = () => readJsonFile('config.json') || {};
const getServices = () => getConfig().services || [];



async function collect (isInitial = false) {
	logger.debug('collecting data');
	try {
		const system = await getSystemData();
		const disks = await disksData();
		const services = await Promise.all(getServices().map(pingService));
		const updatedAt = new Date().toJSON();
		const {hostname, hostip} = getConfig();
		const meta = {updatedAt, hostname, hostip};
		const data = {system, disks, services, meta};

		logger.debug('data collected');
		notifier(data, isInitial);
		writeJsonFile('data.json', data);
	}
	catch (e) {
		logger.error('data collection error ');
		console.log(e);
	}
}

module.exports = collect;

if (require.main === module) collect();
