const {tcp} = require('../lib');


function pingService (service) {
	return tcp(service.url)
		.then(res => {
			service.running = res.status == 200;
			service.statusText = res.statusText;
			service.duration = res.duration;
			return service;
		});
}

module.exports = pingService;
