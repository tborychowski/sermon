const {tcp, http, getUrl} = require('../lib');


function pingService (service) {
	const url = getUrl(service.url);
	const fn = (url.protocol === 'tcp:' ? tcp : http);

	return fn(url)
		.then(res => {
			service.status = (res.statusCode == 200 ? 'online' : 'offline');
			service.duration = res.duration;
			return service;
		});
}

module.exports = pingService;
