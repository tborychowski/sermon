const {readJsonFile} = require('./lib');
const systemData = require('./system');
const pingService = require('./services');
const getServices = () => readJsonFile('config.json').services;


function collectServices () {
	const services = getServices().map(pingService);
	Promise.all(services).then(res => {
		console.log(res);
	});
}


function collectSystem () {
	systemData().then(res => {
		console.log(res);
	});
}


collectServices();
collectSystem();
