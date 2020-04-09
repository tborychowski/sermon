const axios = require('axios');

const list = [
	// { name: 'DNS', url: 'http://192.168.1.10:53' },
	{ name: 'Adguard', url: 'https://ag.borychowski.net' },
	{ name: 'Monitor', url: 'https://monitor.borychowski.net' },
	{ name: 'Google', url: 'https://google.com' },
];

function pingService (service) {
	return new Promise(resolve => {
		const start = new Date();
		axios.get(service.url)
			.then(res => {
				service.running = res.status == 200;
				service.statusText = res.statusText;
				service.duration = (new Date()) - start;
				resolve(service);
			})
			.catch(e => {
				service.running = false;
				service.statusText = e.response.statusText;
				service.duration = (new Date()) - start;
				resolve(service);
			});
	});
}

async function checkAll () {
	// consecutive
	const services = [];
	for (let service of list) {
		const s = await pingService(service);
		services.push(s);
	}
	return services;
	// parallel
	// const proms = list.map(service => pingService(service));
	// return Promise.all(proms);
}

module.exports =  () => checkAll();
