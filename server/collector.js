const {readJsonFile, writeJsonFile} = require('./lib');
const systemData = require('./system');
const pingService = require('./services');
const getServices = () => readJsonFile('config.json').services;



async function collect () {
	const system = await systemData();
	const services = await Promise.all(getServices().map(pingService));
	const data = {system, services};
	// console.log(data);
	writeJsonFile('data.json', data);
}

collect();
