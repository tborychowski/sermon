const {tcp, http, getUrl} = require('../lib');


function pingService (service) {
	const url = getUrl(service.url);
	const fn = (url.protocol === 'tcp:' ? tcp : http);

	return fn(url)
		.then(res => {
			if (res.statusCode === 200) return res;
			return fn(url);	// retry
		})
		.then(res => {
			service.status = (res.statusCode == 200 ? 'online' : 'offline');
			service.duration = res.duration;
			return service;
		});
}

module.exports = pingService;
