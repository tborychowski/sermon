const axios = require('axios');
const path = require('path');
const configPath = path.join(process.cwd(), 'config.json');
const config = require(configPath);
const get = axios.create();
get.defaults.timeout = 2000;

function pingService (service) {
	return new Promise(resolve => {
		const start = new Date();
		get(service.url)
			.then(res => {
				service.running = res.status == 200;
				service.statusText = res.statusText;
				service.duration = (new Date()) - start;
				resolve(service);
			})
			.catch(e => {
				service.running = false;
				service.statusText = e.response && e.response.statusText || '';
				service.duration = (new Date()) - start;
				resolve(service);
			});
	});
}

async function checkAll (services) {
	// consecutive
	const res = [];
	for (let service of services) {
		const s = await pingService(service);
		res.push(s);
	}
	return res;
	// parallel
	// const proms = list.map(service => pingService(service));
	// return Promise.all(proms);
}

module.exports =  () => checkAll(config.services);
