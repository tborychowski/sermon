const {tcp} = require('../lib');


function pingService (service) {
	return tcp(service.url)
		.then(res => {
			service.status = (res.status == 200 ? 'online' : 'offline');
			return service;
		});
}

module.exports = pingService;
