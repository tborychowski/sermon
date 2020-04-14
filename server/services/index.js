const {tcp} = require('../lib');


function pingService (service) {
	// const url = getUrl(service.url);
	let fn = tcp;

	// if (url.protocol === 'tcp:') {
	// 	fn = tcp;
	// 	service.url = service.url.replace(/^tcp:\/\//ig, '');
	// }

	return fn(service.url)
		.then(res => {
			service.running = res.status == 200;
			service.statusText = res.statusText;
			service.duration = res.duration;
			return service;
		});
}

module.exports = pingService;
